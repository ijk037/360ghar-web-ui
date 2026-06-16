import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import routeManifest from './prerender-routes.json' with { type: 'json' };
import { siteMetadata } from '../src/seo/siteMetadata.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');
const require = createRequire(import.meta.url);
let puppeteer;
try {
  puppeteer = require('puppeteer');
} catch {
  console.warn('⚠ puppeteer not installed — skipping prerender step');
  process.exit(0);
}
const ROUTE_WAIT_TIMEOUT = 60000;
const BROWSER_OPTIONS = {
  headless: true,
  args: process.platform === 'linux' ? ['--no-sandbox', '--disable-setuid-sandbox'] : [],
};
export const PREVIEW_HOST = '127.0.0.1';
export const PREVIEW_PORT = 4317;
const VITE_BIN = path.join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js');
const ROUTE_MANIFEST = buildRouteManifest(routeManifest);

export function buildRouteManifest(rawRouteManifest) {
  return rawRouteManifest.map((routeConfig) => {
    if (routeConfig.route !== '/') {
      return routeConfig;
    }

    return {
      ...routeConfig,
      waitForTitle: siteMetadata.defaultTitle,
    };
  });
}

export function getPreviewServerArgs() {
  return getPreviewServerArgsForPort(PREVIEW_PORT);
}

export function getPreviewServerArgsForPort(port = PREVIEW_PORT) {
  return ['preview', '--host', PREVIEW_HOST, '--port', String(port), '--strictPort'];
}

function getPreviewBaseUrl(port = PREVIEW_PORT) {
  return `http://${PREVIEW_HOST}:${port}`;
}

function createPreviewStartError(previewProcess, port = PREVIEW_PORT) {
  const exitCode = typeof previewProcess?.exitCode === 'number' ? previewProcess.exitCode : 'unknown';
  const signalCode = previewProcess?.signalCode ? ` (signal: ${previewProcess.signalCode})` : '';

  return new Error(`vite preview failed to start on ${getPreviewBaseUrl(port)} with exit code ${exitCode}${signalCode}`);
}

function outputPathForRoute(route) {
  if (route === '/') {
    return path.join(DIST_DIR, 'index.html');
  }

  return path.join(DIST_DIR, route.replace(/^\/+/, '') + '.html');
}

// Make every stylesheet non-blocking in the prerendered capture.
//
// During prerender the headless browser loads each CSS file, which fires the async-load
// `onload` handlers authored in index.html (media="print" -> "all", rel="preload" -> "stylesheet"),
// so `page.content()` serializes them as render-blocking. Puppeteer also serializes
// `<noscript>` fallback links as real `<link>` tags, producing duplicate blocking copies.
// On top of that, Vite injects per-route component CSS (vendor-ui, Home, …) as plain
// blocking `<link rel="stylesheet">`. All of this would ship render-blocking CSS.
//
// We collapse every CSS href to a single non-blocking preload, drop the redundant
// `<noscript>` fallbacks (the prerendered page requires JS anyway), and let the preload
// swap itself to a stylesheet once loaded. Critical above-the-fold styles are inlined in
// index.html, so deferring the rest does not cause a visible flash of unstyled content.
// CSS files whose layout is required for a stable first paint on the prerendered page.
// Keep these render-blocking so the prerendered content renders in its final layout
// immediately (avoiding layout shift). Everything else (icons, below-the-fold sections)
// loads non-blocking. Tunable: keep this list minimal — only true layout CSS.
const CRITICAL_CSS = /\/(?:index-[a-zA-Z0-9_-]+|bootstrap\.min)\.css$/;

export function reDeferCss(html) {
  // 1. Collect unique CSS hrefs referenced by a stylesheet or a style preload.
  const hrefs = new Set();
  for (const match of html.matchAll(/<link\b[^>]*?>/gi)) {
    const tag = match[0];
    const isCss =
      /rel="stylesheet"/i.test(tag) ||
      (/rel="preload"/i.test(tag) && /as="style"/i.test(tag));
    if (!isCss) continue;
    const href = tag.match(/href="([^"]+\.css)"/i);
    if (href) hrefs.add(href[1]);
  }
  if (hrefs.size === 0) return html;

  // 2. Drop <noscript> blocks that contain a stylesheet link (they serialize as duplicates).
  let next = html.replace(/<noscript>[\s\S]*?<\/noscript>/gi, (block) =>
    /<link\b[^>]*?rel="stylesheet"/i.test(block) ? '' : block,
  );

  // 3. Remove every stylesheet / style-preload link tag pointing at a collected href.
  for (const href of hrefs) {
    const esc = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    next = next.replace(new RegExp(`<link\\b[^>]*?href="${esc}"[^>]*?>`, 'gi'), '');
  }

  // 4. Re-inject: critical layout CSS as a blocking stylesheet; the rest as a non-blocking
  //    preload that swaps to a stylesheet once loaded. One link per href, before </head>.
  const links = [...hrefs]
    .map((h) =>
      CRITICAL_CSS.test(h)
        ? `<link rel="stylesheet" href="${h}">`
        : `<link rel="preload" as="style" href="${h}" crossorigin onload="this.onload=null;this.rel='stylesheet'">`,
    )
    .join('\n  ');
  return next.replace('</head>', `  ${links}\n</head>`);
}

// Remove Google Maps <script> tags that get baked into the prerendered HTML.
// The @googlemaps/js-api-loader singleton fires its idle callback during the prerender wait,
// injecting the Maps API scripts into the DOM. These are only needed on the /map-location
// page, not on every prerendered page (~230 KB of unnecessary JS per page load).
function stripBakedMaps(html) {
  // Remove the initial loader script and all transitive Maps API scripts.
  return html
    .replace(/<script[^>]*id="google-maps-js"[^>]*><\/script>/g, '')
    .replace(/<script[^>]*src="https:\/\/maps\.googleapis\.com[^"]*"><\/script>/g, '');
}

function ensurePrerenderAnnotations(html) {
  let nextHtml = stripBakedMaps(reDeferCss(html));

  if (!nextHtml.includes('data-prerendered="true"')) {
    nextHtml = nextHtml.replace('<html', '<html data-prerendered="true"');
  }

  if (!nextHtml.includes('name="viewport"')) {
    nextHtml = nextHtml.replace(
      '<head>',
      '<head><meta name="viewport" content="width=device-width, initial-scale=1.0">',
    );
  }

  return nextHtml;
}

async function waitForRoute(page, routeConfig) {
  await page.waitForFunction(() => {
    const root = document.querySelector('#root');
    return Boolean(root && root.innerHTML.trim().length > 0);
  }, { timeout: ROUTE_WAIT_TIMEOUT });

  const selector = routeConfig.waitForSelector;
  if (selector) {
    await page.waitForSelector(selector, { timeout: ROUTE_WAIT_TIMEOUT });
  }

  if (routeConfig.waitForText) {
    const TEXT_WAIT_TIMEOUT = 15_000;
    await page.waitForFunction(
      (text) => Boolean(document.body && document.body.innerText.indexOf(text) !== -1),
      { timeout: TEXT_WAIT_TIMEOUT },
      routeConfig.waitForText
    ).catch(() => {
      console.warn(`[prerender:${routeConfig.route}] waitForText timed out after ${TEXT_WAIT_TIMEOUT / 1000}s — continuing without text match`);
    });
  }

  if (routeConfig.waitForTitle) {
    await page.waitForFunction(
      (expectedTitle) => document.title.trim() === expectedTitle.trim(),
      { timeout: ROUTE_WAIT_TIMEOUT },
      routeConfig.waitForTitle
    );
  }

  await page.waitForFunction(() => {
    const canonical = document.querySelector('link[rel="canonical"]');
    return Boolean(canonical && canonical.getAttribute('href'));
  }, { timeout: ROUTE_WAIT_TIMEOUT });

  // Wait for structured data to be injected by Helmet
  await page.waitForFunction(() => {
    const ldJson = document.querySelectorAll('script[type="application/ld+json"]');
    return ldJson.length > 0;
  }, { timeout: 5000 }).catch(() => {
    // Not all pages have structured data; this is non-fatal
  });
}

async function prerenderRoute(baseUrl, routeConfig, browser) {
  console.log(`Starting prerender for ${routeConfig.route}`);
  const page = await browser.newPage();

  try {
    page.on('console', (message) => {
      if (message.type() === 'error') {
        console.warn(`[prerender:${routeConfig.route}] ${message.text()}`);
      }
    });

    await page.evaluateOnNewDocument(() => {
      window.__PRERENDER_INJECTED = { isPrerendering: true };
    });

    const targetUrl = `${baseUrl}${routeConfig.route}`;
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: ROUTE_WAIT_TIMEOUT });
    await waitForRoute(page, routeConfig);

    const html = ensurePrerenderAnnotations(await page.content());
    const outputPath = outputPathForRoute(routeConfig.route);

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html, 'utf8');

    await page.close();
    console.log(`Prerendered ${routeConfig.route} -> ${path.relative(ROOT, outputPath)}`);
  } finally {
    await page.close().catch(() => {});
  }
}

export async function prerenderRoutes(baseUrl, routeConfigs, options = {}) {
  const {
    launchBrowser = () => puppeteer.launch(BROWSER_OPTIONS),
    prerenderRouteImpl = prerenderRoute,
  } = options;
  const browser = await launchBrowser();
  const failed = [];

  try {
    for (const routeConfig of routeConfigs) {
      try {
        await prerenderRouteImpl(baseUrl, routeConfig, browser);
      } catch (error) {
        failed.push({ route: routeConfig.route, error });
        console.error(`[prerender] FAILED ${routeConfig.route}: ${error.message}`);
      }
    }
  } finally {
    await browser.close().catch(() => {});
  }

  if (failed.length > 0) {
    console.warn(`\n[prerender] ${failed.length} route(s) failed:`);
    for (const { route, error } of failed) {
      console.warn(`  - ${route}: ${error.message}`);
    }
    console.warn('');
  }

  return { failed };
}

export function throwIfPrerenderFailed(failed) {
  if (!failed.length) {
    return;
  }

  const details = failed
    .map(({ route, error }) => `  - ${route}: ${error.message}`)
    .join('\n');

  throw new Error(`Prerender failed for ${failed.length} route(s):\n${details}`);
}

export async function resolvePreviewPort(preferredPort = PREVIEW_PORT) {
  const tryPort = (requestedPort) =>
    new Promise((resolve, reject) => {
      const server = net.createServer();
      server.unref();

      server.once('error', (error) => {
        server.close();
        reject(error);
      });

      server.listen(requestedPort, PREVIEW_HOST, () => {
        const address = server.address();
        const actualPort = typeof address === 'object' && address ? address.port : requestedPort;
        server.close((closeError) => {
          if (closeError) {
            reject(closeError);
            return;
          }

          resolve(actualPort);
        });
      });
    });

  try {
    return await tryPort(preferredPort);
  } catch (error) {
    if (error?.code !== 'EADDRINUSE') {
      throw error;
    }

    return tryPort(0);
  }
}

function startPreviewServer(port) {
  const child = spawn(process.execPath, [VITE_BIN, ...getPreviewServerArgsForPort(port)], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  child.stdout.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  child.stderr.on('data', (chunk) => {
    process.stderr.write(chunk);
  });

  return child;
}

async function waitForPreviewServer(baseUrl, previewProcess) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (previewProcess && previewProcess.exitCode !== null) {
      const port = Number(new URL(baseUrl).port || PREVIEW_PORT);
      throw createPreviewStartError(previewProcess, port);
    }

    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        return;
      }
    } catch {
      // Server not ready yet.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Timed out waiting for vite preview at ${baseUrl}`);
}

async function stopPreviewServer(previewProcess) {
  if (!previewProcess || previewProcess.killed) {
    return;
  }

  await new Promise((resolve) => {
    previewProcess.once('exit', resolve);
    previewProcess.kill('SIGTERM');
    setTimeout(resolve, 2000);
  });
}

async function main() {
  if (!existsSync(DIST_DIR)) {
    throw new Error('dist directory not found. Run vite build before prerendering.');
  }

  const previewPort = await resolvePreviewPort();
  const previewProcess = startPreviewServer(previewPort);
  const baseUrl = getPreviewBaseUrl(previewPort);
  await waitForPreviewServer(baseUrl, previewProcess);

  try {
    const { failed } = await prerenderRoutes(baseUrl, ROUTE_MANIFEST);
    throwIfPrerenderFailed(failed);
  } finally {
    await stopPreviewServer(previewProcess);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
