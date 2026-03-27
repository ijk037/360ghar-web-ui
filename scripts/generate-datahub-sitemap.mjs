#!/usr/bin/env node
/**
 * Generates sitemap-datahub.xml for the Data Hub section.
 * Covers static data hub routes. Dynamic routes (circle-rate/:slug,
 * zone-checker/:slug, builder-reputation/:slug) would need API data
 * to enumerate — those can be added once the backend is seeded.
 */
import fs from 'fs';
import path from 'path';

const SITE_URL = process.env.SITE_URL || 'https://360ghar.com';
const outDir = path.resolve(process.cwd(), 'public');

const writeFile = (p, content) => {
  fs.writeFileSync(p, content, 'utf8');
  console.log(`Wrote ${p}`);
};

const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';

const urlTag = (loc, lastmod, changefreq, priority) =>
  `  <url>\n    <loc>${loc}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}${changefreq ? `    <changefreq>${changefreq}</changefreq>\n` : ''}${priority ? `    <priority>${priority}</priority>\n` : ''}  </url>`;

const today = new Date().toISOString().split('T')[0];

// Static data hub routes
const dataHubRoutes = [
  { path: '/circle-rates',           changefreq: 'monthly',  priority: '0.8' },
  { path: '/rera-projects',          changefreq: 'weekly',   priority: '0.8' },
  { path: '/bank-auctions',          changefreq: 'daily',    priority: '0.8' },
  { path: '/stamp-duty-calculator',  changefreq: 'monthly',  priority: '0.9' },
  { path: '/verify-ownership',       changefreq: 'monthly',  priority: '0.7' },
  { path: '/zone-checker',           changefreq: 'monthly',  priority: '0.7' },
  { path: '/regulatory-updates',     changefreq: 'daily',    priority: '0.7' },
  { path: '/builder-reputation',     changefreq: 'weekly',   priority: '0.8' },
];

const urls = dataHubRoutes.map(({ path, changefreq, priority }) =>
  urlTag(`${SITE_URL}${path}`, today, changefreq, priority)
);

const sitemap = `${xmlHeader}<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

writeFile(path.join(outDir, 'sitemap-datahub.xml'), sitemap);
console.log(`Generated ${dataHubRoutes.length} data hub URLs.`);
