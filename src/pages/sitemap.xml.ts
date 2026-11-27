// /sitemap.xml: índice con un sitemap por sección (rediseno/reglas-seo-geo.md §8).
import type { APIRoute } from 'astro';
import { pages } from '../data/pages';

export const GET: APIRoute = ({ site }) => {
  const base = (site?.toString() ?? 'https://superior-striping.com/').replace(/\/$/, '');
  const sections = [...new Set(pages.map((p) => p.section))];
  const lastmodOf = (s: string) =>
    pages.filter((p) => p.section === s).map((p) => p.lastmod).sort().at(-1);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sections
  .map((s) => `  <sitemap>\n    <loc>${base}/sitemap-${s}.xml</loc>\n    <lastmod>${lastmodOf(s)}</lastmod>\n  </sitemap>`)
  .join('\n')}
</sitemapindex>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
