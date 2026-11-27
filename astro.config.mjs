// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://superior-striping.com',
  // Todas las URLs terminan en barra (ver rediseno/reglas-seo-geo.md §1)
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
