// Registro de páginas publicadas. Alimenta sitemap.xml y el sitemap HTML (/sitemap/).
// Añadir aquí cada página nueva cuando exista. Solo páginas 200, canónicas e indexables.
export interface PageEntry {
  path: string;
  title: string;
  section: 'core' | 'services' | 'locations' | 'case-studies' | 'posts' | 'legal';
  lastmod: string; // fecha real del último cambio de contenido (YYYY-MM-DD)
  images?: string[];
}

export const pages: PageEntry[] = [
  { path: '/', title: 'Asphalt sealcoating & parking lot striping in Nampa and the Treasure Valley', section: 'core', lastmod: '2026-11-24' },
  { path: '/contact-us/', title: 'Get a free estimate', section: 'core', lastmod: '2026-11-24' },
  { path: '/parking-lot-sealcoating/', title: 'Commercial parking lot sealcoating', section: 'services', lastmod: '2026-11-25' },
  { path: '/sitemap/', title: 'Sitemap', section: 'core', lastmod: '2026-11-24' },
];
