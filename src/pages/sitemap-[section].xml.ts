import type { APIRoute, GetStaticPaths } from 'astro';
import { pages } from '../data/pages';

export const getStaticPaths: GetStaticPaths = () =>
  [...new Set(pages.map((p) => p.section))].map((section) => ({ params: { section } }));

export const GET: APIRoute = ({ params, site }) => {
  const base = (site?.toString() ?? 'https://superior-striping.com/').replace(/\/$/, '');
  const urls = pages
    .filter((p) => p.section === params.section)
    .map((p) => {
      const imgs = (p.images ?? [])
        .map((i) => `\n    <image:image><image:loc>${base}${i}</image:loc></image:image>`)
        .join('');
      return `  <url>\n    <loc>${base}${p.path}</loc>\n    <lastmod>${p.lastmod}</lastmod>${imgs}\n  </url>`;
    })
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
