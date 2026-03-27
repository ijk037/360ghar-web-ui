#!/usr/bin/env node
/**
 * Generate the list of routes to prerender at build time.
 *
 * Outputs: scripts/prerender-routes.json
 *
 * IMPORTANT: Keep this small. Only static routes are prerendered.
 * Dynamic pages (properties, blogs, landing pages) remain SPA-rendered
 * and are covered by the sitemap for SEO discovery instead.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static routes to prerender (most important for SEO)
const staticRoutes = [
  '/',
  '/properties',
  '/about-us',
  '/contact',
  '/faq',
  '/project',
  '/blog',
  '/policies',
  '/refer-and-earn',
  '/emi-calculator',
  '/area-converter',
  '/area-calculator',
  '/loan-eligibility-calculator',
  '/capital-gains-tax-calculator',
  '/property-document-checklist',
  '/design-blueprint',
  '/vastu-checker',
  '/ai-design-studio',
  '/ai-agent',
  '/localities',
  '/for-ai',
  '/gurugram-real-estate-guide',
  '/property-investment-gurugram',
  // Comparison pages
  '/vs/nobroker',
  '/vs/magicbricks',
  '/vs/99acres',
  '/vs/housing',
  '/vs/commonfloor',
  '/vs/proptiger',
  '/vs/squareyards',
  '/vs/nestaway',
  '/vs/zolo',
  '/vs/stanza-living',
  // Truth/Expose pages
  '/truth/nobroker-listings',
  '/truth/magicbricks-spam',
  '/truth/99acres-fake',
  '/truth/nestaway-collapse',
  '/truth/zolo-issues',
];

const routes = staticRoutes;

const outFile = path.join(__dirname, 'prerender-routes.json');
fs.writeFileSync(outFile, JSON.stringify(routes, null, 2), 'utf8');
console.log(`Wrote ${routes.length} prerender routes to ${outFile}`);
