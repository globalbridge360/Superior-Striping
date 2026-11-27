# Superior Striping — sitio web

Astro 7 + Tailwind CSS 4 + GSAP 3.15 (ScrollTrigger, SplitText) + Lenis + Barba.js. Sitio estático servido por Cloudflare Workers (Static Assets).

## Uso

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # build + wrangler dev (sirve dist/ como en Cloudflare)
npm run deploy   # build + wrangler deploy (despliegue manual)
```

## Estructura

| Ruta | Qué hay |
|---|---|
| `src/pages/index.astro` | Home: compone las secciones y su JSON-LD |
| `src/components/sections/` | Secciones de la home (Hero, About, Services, Process, Season, Segments, Testimonials, Projects, Faq) |
| `src/components/Media.astro` | Toda imagen de contenido: `<figure>` + `<picture>` (AVIF, WebP, JPG) + alt + `<figcaption>` |
| `src/data/images.ts` | Catálogo de imágenes con alt y descripción de cada una |
| `src/data/site.ts` | NAP, horario, ciudades, servicios, navegación y la etiqueta única del CTA |
| `src/data/pages.ts` | Registro de páginas publicadas: alimenta `sitemap.xml` y `/sitemap/` |
| `src/data/schema.ts` | JSON-LD compartido (LocalBusiness con `@id`, WebSite, FAQPage) |
| `src/scripts/app.ts` | Lenis, GSAP y Barba. Las animaciones de cada página viven en un `gsap.context` que se revierte al cambiar de página |
| `src/styles/global.css` | Tokens de marca y componentes base |
| `public/robots.txt` | Producción (copia de `../rediseno/robots.txt`) |
| `public/_headers` | Caché de `/_astro/*` y `/media/*`, cabeceras de seguridad |
| `wrangler.jsonc` | Config del Worker: sirve `dist/`, barra final automática, 404 propia |

## Despliegue (Cloudflare Workers)

Cada push a `main` despliega solo con Workers Builds (Git conectado en el panel de Cloudflare):

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Node: 22 (`.nvmrc`)

Las ramas que no son `main` generan una versión de vista previa con su propia URL. Cabeceras en `public/_headers`; redirecciones en `public/_redirects` (ambos los lee Workers Static Assets).

## Reglas que cumple cada página

Ver `../rediseno/reglas-seo-geo.md`. En corto: indexable por defecto, canonical autorreferente, URLs con barra final, un H1, imágenes en `<picture>` con alt y descripción, schema sin duplicados, y la página registrada en `src/data/pages.ts`.

## Movimiento

- Todo respeta `prefers-reduced-motion`: sin Lenis, sin Barba, sin animaciones y el video del hero queda en su póster.
- Barba solo cambia `<main data-barba="container">`; header y footer persisten. `syncHead()` reemplaza las etiquetas `[data-head]` (title, meta, canonical, OG, JSON-LD) en cada navegación.

## Modo oscuro (regla para toda página nueva)

El tema vive en `html[data-theme]` (claro u oscuro). Se fija antes de pintar en `BaseLayout.astro` (lo guardado en `localStorage`, si no el del sistema) y el botón del header lo alterna. Los tokens de `global.css` cambian de valor; las zonas ya oscuras (`.bg-asphalt`, `[data-hero]`, header sobre el hero, menú móvil) recuperan los valores claros para su subárbol.

Al crear o editar cualquier página o sección:

1. **Solo tokens de color.** Usa `bg-paper`, `bg-concrete`, `bg-white`, `bg-asphalt`, `text-ink`, `text-ink-soft`, `text-ink-muted`, `text-paper`, `border-line`, `text-orange-deep`. Nada de hex ni `rgb()` sueltos en clases o CSS; si hace falta una transparencia, `color-mix(in srgb, var(--color-ink) 35%, transparent)`.
2. **Cada superficie define su texto.** `.bg-paper`, `.bg-white` y `.bg-concrete` ponen `color: var(--color-ink)`; `.bg-asphalt` y `.bg-ink` ponen `text-paper`. No confíes en el color heredado del `<html>`: en una tarjeta clara dentro de una sección oscura (o al revés) el texto quedaría ilegible.
3. **Secciones oscuras con `bg-asphalt`.** Así heredan los valores claros y su texto `text-paper` sigue siendo claro en ambos temas.
4. **Naranja como texto:** `text-orange-deep` sobre fondos claros (el naranja normal no llega a 3:1 sobre blanco).
5. **Logos e imágenes con fondo propio** (sellos, BBB): si deben verse sobre blanco, usa `bg-[#fff]` fijo, no `bg-white` (que en oscuro es gris oscuro).
6. **Antes de publicar,** corre la auditoría de contraste en ambos temas: en `npm run dev`, abre la página, haz scroll hasta el final y en la consola ejecuta `eval(await (await fetch('/@fs' + '<ruta absoluta>/sitio/tools/contrast-audit.js')).text()); await __contrastAuditBoth()`. Debe devolver dos listas vacías. El texto sobre foto o video no se mide: revísalo a ojo.

## Pendiente

- Lista aprobada de logos de clientes (`Segments.astro`).
- Redirecciones 301 en `public/_redirects` cuando el sitio sustituya al actual (`../rediseno/redirecciones-301.csv`).
- Las páginas enlazadas desde la home (servicios, ciudades, casos) todavía no existen en este proyecto.
- Instagram: `src/data/instagram.ts` es una lista fija (capturas del perfil). Para que se actualice sola hace falta un token de la API de Instagram.
- Formulario: hoy usa atributos de Netlify Forms (`data-netlify`), que en Cloudflare no envían nada. Falta conectarlo a un webhook (n8n) o a Formspree.
- Ilustraciones: generadas con Codex; prompt y originales en `../sitio-assets/ilustraciones/`.
