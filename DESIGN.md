# DESIGN.md — Superior Striping

> Referencia: la home, `src/pages/index.astro`. Extraído el 2026-11-25 del código y de la página renderizada (1440 y 390 px, temas claro y oscuro). El código manda: si algo aquí no coincide con los archivos, corrige este documento.

## 1. Identidad en corto

Lectura (interpretación, no medida): un contratista de asfalto serio y cercano, con oficio a la vista.

- Títulos grandes en Bricolage Grotesque, apretados (interlineado 1, tracking negativo); texto en Inter Tight.
- Grises de concreto y papel como superficie; asfalto casi negro para las zonas oscuras; naranja de seguridad solo para la acción y el acento (botón, punto de flecha, cono de la etiqueta, raya del hero).
- Fotos reales de obra, grandes, con esquinas redondeadas de 1rem y una tarjeta de texto clara montada encima.
- Ilustraciones 3D pequeñas del oficio (conos, máquina de striping) como guiño, nunca como imagen principal.
- Texturas de fondo muy tenues (curvas de nivel, grano de asfalto) que asoman desde una esquina.
- Movimiento suave y largo (`expo.out`, ~1 s): los títulos suben línea a línea, los bloques aparecen desde abajo.

Qué no es: no hay degradados de color, ni sombras marcadas, ni iconos de colores, ni naranja como fondo de sección, ni fotos de stock presentadas como trabajos.

## 2. Stack y dónde vive cada cosa

Astro 7 (estático) + Tailwind CSS 4 + GSAP 3 (ScrollTrigger, SplitText) + Lenis + Barba. Iconos con `astro-icon` (familia Phosphor, prefijo `ph:`).

| Ruta | Qué hay |
|---|---|
| `src/styles/global.css` | Tokens (`@theme`), modo oscuro, clases base (`.site-container`, `.section-y`, `.badge`, `.btn-pill`, `.h-*`, `.lead`, `.notch`, `.link-arrow`) y estados iniciales de animación |
| `src/layouts/BaseLayout.astro` | Único layout: head, tema antes de pintar, Header, `<main data-barba="container">`, Footer, barra móvil, cortina de transición |
| `src/components/` | Piezas base (Button, Badge, Media, Pattern, Logo, Seo, EstimateForm) y el marco fijo (Header, Footer, MobileBar) |
| `src/components/sections/` | Las 16 secciones de la home |
| `src/data/site.ts` | NAP, horario, ciudades, servicios, navegación, plataformas y la etiqueta única del CTA |
| `src/data/images.ts` | Catálogo de fotos con `alt`, `description` y `location` |
| `src/data/illustrations.ts` | Catálogo de ilustraciones 3D |
| `src/data/pages.ts` | Registro de páginas publicadas: alimenta `src/pages/sitemap.xml.ts` y `src/pages/sitemap/index.astro` |
| `src/data/schema.ts` | Nodos JSON-LD compartidos (`businessNode`, `websiteNode`, `faqNode`, `BUSINESS_ID`) |
| `src/scripts/app.ts` | Todo el movimiento y la interacción |
| `src/assets/img/`, `src/assets/illustrations/` | Originales de imagen (pasan por `astro:assets`) |
| `public/patterns/` | SVG de las texturas de fondo |
| `tools/contrast-audit.js` | Auditoría de contraste en ambos temas |

Comandos: `npm run dev` (http://localhost:4321), `npm run build`, `npm run zip`. Reglas del proyecto: `README.md` (modo oscuro, movimiento), `AGENTS.md` (servidor de desarrollo) y `../rediseno/reglas-seo-geo.md` (SEO/GEO).

## 3. Tokens

### Color

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--color-concrete` | #eef0f1 | #0e1519 | Fondo de página (`html`) y de secciones `bg-concrete` |
| `--color-paper` | #f8f9f9 | #162027 | Secciones `bg-paper` y tarjetas sobre concreto |
| `--color-white` | #ffffff | #1c272e | Detalles dentro de tarjetas (`bg-white`); en oscuro es gris, no blanco |
| `--color-asphalt` | #11181d | #070b0e | Secciones oscuras, hero, footer, botón oscuro |
| `--color-ink` | #192730 | #eef2f3 | Texto principal |
| `--color-ink-soft` | #46535b | #b8c3c8 | Párrafos secundarios |
| `--color-ink-muted` | #5f6b72 | #94a1a7 | Metadatos, numeración, notas |
| `--color-line` | #d5dadd | #2b3840 | Bordes y divisores (`border-line`, `divide-line`) |
| `--color-orange` | #ee6a1f | igual | Acción y acento: botón, punto de flecha, iconos de acento, foco, selección |
| `--color-orange-deep` | #d4560f | igual | Naranja como texto sobre fondos claros |
| `--color-stripe` | #ffffff | igual | Blanco de pintura (sin uso en la home) |

Parejas permitidas: `bg-concrete` / `bg-paper` / `bg-white` con `text-ink`, `text-ink-soft`, `text-ink-muted`; `bg-asphalt` con `text-paper` y sus opacidades al 80 % o 60 % (modificador de opacidad de Tailwind sobre `text-paper`). Cada clase de superficie fija su color de texto y `bg-asphalt` restaura los valores claros para su subárbol, así que una tarjeta `bg-paper` dentro de una zona oscura sigue siendo clara en ambos temas.

**Estructura de la paleta** (medida en OKLCH con `color.py` de la skill `site-page-builder`):
- Neutros en siete escalones de claridad: 20 (asfalto), 26 (tinta), 43 y 52 (texto secundario), 89 (línea), 95 (concreto), 98 (papel). No hay grises medios entre 52 y 89.
- Todos los neutros llevan un tinte azul acero: tono ~236°, croma 0.026 como máximo. Un gris nuevo lleva ese tinte; un gris puro o cálido se nota.
- Un solo color: el naranja (tono 43–45°, croma 0.17–0.18), en dos claridades (68 y 61). No hay colores de apoyo.
- Regla para añadir un color: si no es el naranja, es un neutro con tono ~236° dentro de los escalones existentes. Un segundo color con croma por encima de 0.03 cambia la identidad y se consulta antes.
- El modo oscuro es una paleta propia (superficies 15–25 de claridad, texto 70–95) con el mismo tinte; el naranja no cambia.

Naranja: sí en botones, el círculo de la flecha, iconos de acento y la raya bajo el H1. No como fondo de sección ni de tarjeta, ni como texto normal (usa `text-orange-deep`).

### Tipografía

`--font-display` Bricolage Grotesque Variable para `h1`–`h4` y cifras grandes (peso 500; `h1` 600; interlineado 1; tracking -0.02em, `h1` -0.03em; `text-wrap: balance`). `--font-sans` Inter Tight Variable para todo lo demás (1rem / 1.5).

| Clase | Móvil → escritorio | Cuándo |
|---|---|---|
| `.h-display` | 48 → 96 px (`clamp(3rem, 6.6vw, 6rem)`) | H1 de página |
| `.h-page` | 42 → 80 px (`clamp(2.6rem, 5.4vw, 5rem)`) | H1 de página interior (lo usa PageHero) |
| `.h-section` | 38 → 64 px (`clamp(2.4rem, 4.4vw, 4rem)`) | H2 de sección. Siempre con `max-w-[11ch]`…`[18ch]` para forzar 2 o 3 líneas |
| `.h-card` | 22 → 28 px, interlineado 1.12 | Título de tarjeta (H3) |
| `.lead` | 20 px / 1.5 | Párrafo de entrada bajo un H2, con `text-ink-soft` y `max-w-[34rem]`–`[36rem]` |
| `text-lg text-ink-soft` | 18 px | Párrafo de apoyo en columnas estrechas (`max-w-sm`) |
| cuerpo | 16 px | Texto de tarjeta, con `text-ink-soft` |
| `text-sm text-ink-muted` | 14 px | Metadatos, numeración, notas |
| `.badge` | 16 px, peso 500 | Etiqueta sobre el H2 |

Sin token (ver §14): títulos intermedios de 22 px (`text-[1.375rem]`) y 24 px, cita de reseña (26 → 38 px), párrafo que se escribe (28 → 44 px), cifra grande (64 px).

### Espaciado y layout

- **Contenedor:** `.site-container`, máximo `--container-site` 1424px, márgenes laterales 20 px (móvil) y 32 px (desde 768).
- **Sección:** `.section-y`, 52 px arriba y abajo en móvil y 56 px desde 1024. Entre dos secciones quedan ~104–112 px. Los comentarios del CSS que hablan de 132 px están desfasados.
- **Dentro de una sección:** etiqueta → H2 con `mt-5`/`mt-6`; cabecera → contenido `mt-12` a `mt-16`; rejillas con `gap-5` o `gap-6`; cierre con enlace `mt-10`/`mt-12`.
- **Rejillas habituales:** cabecera a la izquierda + contenido a la derecha (`lg:grid-cols-[1fr_1.7fr]`), 3 columnas (`md:grid-cols-3`), 4 columnas (`sm:grid-cols-2 lg:grid-cols-4`), dos mitades dentro de una tarjeta grande (`lg:grid-cols-[0.9fr_1.1fr]`).
- **Escalonado:** las tarjetas de una fila bajan en escalera en escritorio (`md:mt-24`, `md:mt-48` en Process; `lg:mt-14` en las pares de Segments). Es un rasgo del sitio.
- **Breakpoints:** los de Tailwind; los que cuentan son 768 (`md`) y 1024 (`lg`).
- **Radios:** `--radius-card` 1rem para fotos y tarjetas; `--radius-pill` para botones, etiquetas y chips. Las tarjetas contenedoras grandes usan 1.5rem, 1.75rem o 2rem sueltos (§14).
- **Bordes y sombras:** borde de 1 px `border-line` en tarjetas contenedoras y divisores; borde punteado en la etiqueta. Prácticamente sin sombras: la profundidad sale del cambio de superficie (papel sobre concreto).

### Movimiento

Curvas CSS: `--ease-out-quart`, `--ease-out-expo`. En GSAP: `expo.out` para entradas (1–1.2 s, escalonado 0.08), `none` para lo ligado al scroll. Lenis suaviza el scroll (1.2 s). Detalle en §7.

## 4. Piezas base

- **Button** — `src/components/Button.astro`. Props: `href`, `label`, `variant` (`orange` por defecto, `dark`, `light`), `icon`, `class`. Píldora con texto que rueda y círculo con flecha que gira. Naranja para la acción principal; `dark` sobre tarjetas claras; `light` sobre fotos u oscuro. Uno principal por sección.
- **CTA único** — `cta` en `src/data/site.ts`: "Get a free estimate" → `/contact-us/`. Nunca se escribe otro texto para la intención de presupuesto. El teléfono va al lado como enlace con icono `ph:phone-fill`, desde `site.phone` / `site.phoneHref`.
- **Badge** — `src/components/Badge.astro`. Props: `tone` (`light` | `dark`), `class`. Etiqueta punteada con cono naranja, una o dos palabras ("Services", "Our work"). Va encima del H2; `tone="dark"` en secciones asfalto.
- **Media** — `src/components/Media.astro`. Toda imagen de contenido. Props: `image` (entrada de `src/data/images.ts`), `widths`, `sizes`, `class` (tamaño, proporción y radio van aquí), `imgClass` (encuadre), `caption` (`hidden` por defecto, `visible`, `none`), `priority` (solo la primera imagen de la pantalla), `parallax`, `fallbackFormat` (`png` para recortes transparentes). Para ilustraciones: `imgClass="!object-contain"` y `fallbackFormat="png"`.
- **Pattern** — `src/components/Pattern.astro`. Props: `kind` (`topo` | `asphalt`), `fade` (esquina o `center`), `class` (`pattern--strong` para más presencia). El padre necesita `relative isolate`. Una o dos por sección, en esquinas opuestas.
- **Enlace de texto** — clase `.link-arrow`: subrayado fino que pasa a naranja. Para el enlace de cierre de sección ("See every case study").
- **Muesca** — clase `.notch`: recorte cóncavo en la esquina inferior derecha de una foto para alojar un botón. Hay que pasarle `--notch-bg` con el color de la superficie de la sección.
- **Círculo de flecha** — patrón repetido en tarjetas enlazadas: `rounded-full bg-orange text-asphalt` de 40 px con `ph:arrow-right-bold` o `ph:arrow-up-right-bold`, que gira 45° al pasar el cursor. La tarjeta entera es clicable con `after:absolute after:inset-0` en el enlace del título.
- **EstimateForm** — `src/components/EstimateForm.astro`. Formulario de una pregunta por paso (Netlify Forms, `name="estimate"`). Sin props. Solo dentro de la sección Contact.
- **Seo** — `src/components/Seo.astro`. Lo usa el layout; no se llama desde las páginas.
- **Logo** — `src/components/Logo.astro`. Props: `class`, `priority`.
- **Marco fijo** — `src/components/Header.astro` (fijo y transparente sobre el primer bloque; navegación desde `nav` en `src/data/site.ts`), `src/components/Footer.astro` (incluye la tarjeta CTA final con foto, máquina y conos, y las columnas de enlaces) y `src/components/MobileBar.astro` (barra inferior con CTA y llamada en móvil). Los pone el layout en todas las páginas.

## 5. Catálogo de secciones

Todas viven en `src/components/sections/`. Salvo Contact, **ninguna acepta props**: el texto está escrito dentro o viene de un archivo de datos de la home. "Contenido fijo" significa que antes de reutilizarla hay que pasarla a props con los valores actuales por defecto.

### Hero — `src/components/sections/Hero.astro`
- **Para qué contenido:** frase corta de apoyo, nota de Google, H1 con segunda línea pequeña, CTA + teléfono, tarjeta de garantía.
- **Aspecto:** oscuro, video a pantalla casi completa (`100dvh` menos la franja de logos) con degradado; texto arriba y abajo; raya naranja de 7 px bajo el H1; tarjeta de cristal a la derecha en escritorio.
- **Movimiento:** `data-hero`, `data-hero-title`, `data-hero-stripe`, `data-hero-fade`, `data-hero-card`, `data-hero-media`.
- **Estado:** `firma` + `contenido fijo`. Solo en la home. Para interiores, ver "Hero interior" en §6.

### PageHero — `src/components/sections/PageHero.astro`
- **Para qué contenido:** el arranque de toda página interior. Props: `title` (H1), `lead` (1–2 frases), `crumbs` (migas; la última sin enlace), `facts` (2–4 datos cortos), `image` (foto de fondo), `position` (encuadre).
- **Aspecto:** foto a sangre detrás del texto con velo asfalto (más denso a la izquierda y abajo), ~780 px a 1440; migas, H1 con `.h-page`, raya naranja, lead, CTA único + teléfono, fila de datos con check.
- **Movimiento:** los ganchos del hero (`data-hero`, `data-hero-media`, `data-hero-title`, `data-hero-stripe`, `data-hero-fade`); la barra móvil se esconde mientras se ve.
- **Estado:** `reutilizable`. **Notas:** uno por página y siempre el primer bloque. La foto debe medir 1920 px de ancho o más (si no, la compilación falla) y verse nítida a tamaño real.

### SplitList — `src/components/sections/SplitList.astro`
- **Para qué contenido:** un párrafo de entrada y una lista de 3 a 8 ítems de una línea, con foto. "Qué incluye", requisitos, "cuándo no conviene". Props: `id`, `badge`, `title`, `intro`, `items` (`text`, `href`, `linkLabel`), `image`, `reverse`, `mark` (`check` | `x`), `surface` (`paper` | `concrete`), `link`.
- **Aspecto:** dos mitades; texto con lista separada por líneas e icono en círculo; foto 4:5 redondeada. Pattern topo en una esquina.
- **Movimiento:** `data-split`, `data-reveal`, parallax en la foto.
- **Estado:** `reutilizable`. **Notas:** se puede usar dos veces en una página alternando `reverse` y con otra sección en medio.

### Steps — `src/components/sections/Steps.astro`
- **Para qué contenido:** proceso de 4 a 8 pasos con título y 1–2 frases. Props: `id`, `badge`, `title`, `intro`, `quote` (frase destacada), `steps`.
- **Aspecto:** fondo de página con Pattern; cabecera sticky a la izquierda; filas `bg-paper` con número grande en `text-orange-deep`.
- **Movimiento:** `data-split`, `data-reveal`.
- **Estado:** `reutilizable`. **Notas:** Process queda para 3 pasos con ilustración (home).

### Features — `src/components/sections/Features.astro`
- **Para qué contenido:** 3 o 4 rasgos con ilustración 3D, título corto y una frase. Props: `id`, `badge`, `title`, `intro`, `features` (`art`, `title`, `text`), `tone` (`light` | `dark`).
- **Aspecto:** cabecera en dos columnas (H2 e intro); tarjetas en fila con las pares bajadas e ilustración arriba; en móvil, ilustración a la izquierda y texto a la derecha. En `dark` la sección va sobre `bg-asphalt` y las tarjetas siguen siendo claras (`bg-paper`), porque la losa de las ilustraciones es oscura.
- **Movimiento:** `data-split`, `data-reveal`.
- **Estado:** `reutilizable`. **Notas:** `tone="dark"` es la sección asfalto de la página: una como mucho.

### Compare — `src/components/sections/Compare.astro`
- **Para qué contenido:** tabla de 2 a 5 filas y 3 columnas (opción, cifra, cuándo conviene) y una lista opcional de factores. Props: `id`, `badge`, `title`, `intro`, `columns`, `rows`, `highlight`, `note`, `factorsTitle`, `factors`.
- **Aspecto:** `bg-paper`; cabecera a la izquierda; tabla en tarjeta con borde `border-line`; en móvil cada fila pasa a tarjeta con la etiqueta de la columna.
- **Movimiento:** `data-split`, `data-reveal`.
- **Estado:** `reutilizable`.

### LogoStrip — `src/components/sections/LogoStrip.astro`
- **Para qué contenido:** 8 a 12 logos de clientes desde `src/data/clients.ts`.
- **Aspecto:** franja `bg-paper` con borde inferior, logos en gris, cinta continua.
- **Movimiento:** `data-marquee`, `data-marquee-speed`, `data-marquee-track`.
- **Estado:** `reutilizable` tal cual (datos en archivo; el H2 oculto es genérico). **Notas:** pensada para ir pegada bajo un hero.

### About — `src/components/sections/About.astro`
- **Para qué contenido:** un párrafo manifiesto de 40–60 palabras; una cifra con su leyenda; una foto 4:3 con botón en la muesca; 3 rasgos con ilustración 3D, título y una frase.
- **Aspecto:** `bg-concrete`, etiqueta y párrafo centrados en cuerpo muy grande; debajo tres columnas (tarjeta de cifra, foto, nota de reseñas); fila de 3 rasgos con ilustración 3D a la izquierda, separada por línea.
- **Movimiento:** `data-scroll-write` en el párrafo, `data-reveal`, parallax en la foto.
- **Estado:** `contenido fijo` + `firma` (el párrafo que se escribe). **Notas:** para rasgos en otra página, usar Features.

### Services — `src/components/sections/Services.astro`
- **Para qué contenido:** 3 a 6 ítems con foto horizontal grande, título, una frase y enlace.
- **Aspecto:** `bg-paper`; etiqueta + H2 a la izquierda; tarjetas-foto de 70vh que se apilan (sticky), cada una con una tarjeta de texto clara abajo a la izquierda y círculo de flecha; párrafo de cierre con `.link-arrow`.
- **Movimiento:** `data-stack`, `data-stack-card`, `data-stack-inner`, parallax, `data-split`.
- **Estado:** `contenido fijo` + `firma`. **Notas:** ocupa mucho scroll (~3800 px con 5 tarjetas); en interiores, 3 tarjetas como máximo o usar otra sección.

### Process — `src/components/sections/Process.astro`
- **Para qué contenido:** 3 pasos numerados con ilustración, título y 1–2 frases; a la izquierda H2, una frase y un dato en chip.
- **Aspecto:** fondo de página (concreto) con dos Pattern; cabecera sticky a la izquierda; 3 tarjetas `bg-paper` altas en escalera con número arriba e ilustración 3D.
- **Movimiento:** `data-split`, `data-reveal`.
- **Estado:** `contenido fijo`. **Notas:** con 4 pasos hay que rehacer la escalera; cada paso necesita una ilustración de `src/data/illustrations.ts`.

### Work — `src/components/sections/Work.astro`
- **Para qué contenido:** 5 a 8 trabajos con foto, título, ciudad, tipo de trabajo y enlace.
- **Aspecto:** `bg-asphalt`; etiqueta oscura + H2; carrusel en perspectiva con la tarjeta activa al frente y flechas redondas; enlace de cierre centrado.
- **Movimiento:** `data-work` y sus `data-work-*`. Sin JS es una fila con scroll.
- **Estado:** `contenido fijo` + `firma`. **Notas:** es la única sección oscura a todo el ancho de la home.

### Season — `src/components/sections/Season.astro`
- **Para qué contenido:** un mensaje con título corto, un párrafo y el CTA; una foto ancha.
- **Aspecto:** foto enorme en tarjeta redondeada dentro del contenedor (640–820 px de alto), tarjeta clara arriba a la izquierda con `h-card`, texto y botón `dark`; logotipo gigante en blanco al pie.
- **Movimiento:** `data-reveal`, parallax.
- **Estado:** `reutilizable`. Props: `id`, `title`, `text`, `image`, `showLogo` (los valores por defecto son los de la home). **Notas:** es el CTA intermedio sobre foto; en interiores, `showLogo={false}` (queda más baja, sin el logotipo gigante).

### Segments — `src/components/sections/Segments.astro`
- **Para qué contenido:** 4 ítems con foto vertical 3:4, título y una frase; enlace de cierre.
- **Aspecto:** `bg-paper` con Pattern; H2 solo, sin etiqueta; 4 columnas con la tarjeta de texto `bg-concrete` montada sobre el pie de la foto; las pares bajan.
- **Movimiento:** `data-split`, `data-reveal`.
- **Estado:** `contenido fijo`. **Notas:** es el patrón de "rejilla de tarjetas con foto". Los ítems no enlazan.

### Testimonials — `src/components/sections/Testimonials.astro`
- **Para qué contenido:** 4 a 6 reseñas literales (nombre, iniciales, cita de hasta ~170 caracteres); nota de Google; fila de plataformas.
- **Aspecto:** `bg-concrete` con Pattern al centro; todo centrado; cita grande en fuente display; pestañas con iniciales; tarjeta ancha "Find us across the web" con botón `dark`.
- **Movimiento:** `data-reviews` (cambio de pestaña con temporizador), `data-reveal`.
- **Estado:** `contenido fijo` (las reseñas están en el archivo; nota y plataformas salen de `src/data/site.ts`).

### Recognition — `src/components/sections/Recognition.astro`
- **Para qué contenido:** un reconocimiento principal con imagen, H2, párrafo, CTA y 2 sellos.
- **Aspecto:** `bg-paper` con Pattern; dos columnas: texto a la izquierda, medalla a la derecha con un brillo que pasa.
- **Movimiento:** `data-split`, `data-reveal`, `@keyframes medal-shine`.
- **Estado:** `contenido fijo`. **Notas:** el sello BBB se carga de su servidor y va sobre `bg-[#fff]` fijo. La estructura texto + imagen en dos columnas sirve de modelo.

### Instagram — `src/components/sections/Instagram.astro`
- **Para qué contenido:** 8 publicaciones desde `src/data/instagram.ts`.
- **Aspecto:** `bg-paper`; etiqueta + H2 a la izquierda y chip del perfil a la derecha; rejilla de fotos cuadradas con `rounded-[var(--radius-card)]`.
- **Movimiento:** `data-split`, `data-reveal`.
- **Estado:** `reutilizable` tal cual, pero propia de la home y de About.

### ServiceAreas — `src/components/sections/ServiceAreas.astro`
- **Para qué contenido:** lista de ciudades con enlace (de `cities` en `src/data/site.ts`) y el mapa propio.
- **Aspecto:** `bg-paper`; texto y rejilla de ciudades a la izquierda; mapa dibujado en tarjeta `bg-concrete` a la derecha, con rutas punteadas desde Nampa.
- **Movimiento:** `data-areas` y sus `data-area-*`.
- **Estado:** `firma`; título y párrafo fijos. **Notas:** geografía en `src/data/areas.ts` y `src/data/areas-geo.ts`. Útil en páginas de ciudad si se parametriza el título.

### Faq — `src/components/sections/Faq.astro`
- **Para qué contenido:** 4 a 8 preguntas con respuesta de 40–60 palabras; H2, una frase y enlace a todas las preguntas.
- **Aspecto:** fondo de página con Pattern; cabecera a la izquierda, acordeón a la derecha con líneas divisorias.
- **Movimiento:** `data-faq`, `data-faq-body`, `data-split`, `data-reveal`.
- **Estado:** `reutilizable`. Props: `items` (`q`, `a`), `title`, `intro`, `link` (o `null`); por defecto usa `src/data/faq-home.ts`. **Notas:** la página debe añadir `faqNode` a su JSON-LD con los mismos ítems.

### Contact — `src/components/sections/Contact.astro`
- **Para qué contenido:** el formulario de presupuesto. Prop `headingLevel` (`h1` | `h2`).
- **Aspecto:** `bg-concrete`; etiqueta, título y lead centrados; tarjeta grande `bg-paper` con borde: foto con reseña y datos de contacto a la izquierda, formulario a la derecha, cono asomando por la esquina.
- **Movimiento:** `data-split`, `data-reveal`.
- **Estado:** `reutilizable` (título y reseña fijos). Ya se usa en `src/pages/contact-us/index.astro`. **Notas:** tiene `id="estimate"`.

### Location — `src/components/sections/Location.astro`
- **Para qué contenido:** datos del negocio y mapa de Google.
- **Aspecto:** `bg-concrete` sin espacio superior (`!pt-0`, va pegada a Contact); tarjeta `bg-paper` de 2rem con datos a la izquierda y mapa a la derecha.
- **Movimiento:** `data-reveal`.
- **Estado:** `reutilizable` tal cual (datos de `src/data/site.ts`). **Notas:** si no va después de otra sección `bg-concrete`, hay que quitarle el `!pt-0`.

### Blog — `src/components/sections/Blog.astro`
- **Para qué contenido:** 4 posts (uno destacado y tres) desde `src/data/posts.ts`: título, fecha, autor, extracto, imagen.
- **Aspecto:** `bg-concrete`; post destacado en tarjeta horizontal `bg-paper` y tres tarjetas verticales; enlace de cierre centrado.
- **Movimiento:** `data-split`, `data-reveal`.
- **Estado:** `reutilizable` tal cual (título fijo). **Notas:** las tarjetas de post son el patrón para el índice del blog.

## 6. Ritmo de página

Secuencia de la home (claro): hero oscuro con video → franja de logos (papel) → About (concreto) → Services (papel) → Process (concreto con textura) → Work (**asfalto**) → Season (foto grande sobre concreto) → Segments (papel) → Testimonials (concreto) → Recognition, Instagram y ServiceAreas (papel, tres seguidas) → Faq (concreto con textura) → Contact, Location y Blog (concreto) → tarjeta CTA oscura y footer asfalto.

- La alternancia es sutil: papel y concreto se distinguen poco. El contraste fuerte se reserva: una sola sección asfalto a todo el ancho en medio de la página, más el hero y el footer.
- Cuando dos secciones seguidas comparten superficie, cambia la estructura (centrado → dos columnas → rejilla) o aparece una textura.
- La densidad alterna: bloque de foto grande (Services, Season) seguido de bloque de texto o tarjetas pequeñas.
- El CTA aparece en: hero, header, Season, Recognition, Contact, la tarjeta final del footer y la barra móvil. Como el footer ya trae un CTA, una página no necesita cerrar con otro.
- La home es larga (~18 300 px a 1440; ~25 200 px a 390) y usa 5 secciones firma. Una página interior debería quedarse en 5–8 secciones y una firma como mucho.

**Hero interior.** Es PageHero (§5): foto a sangre con velo asfalto, migas, H1 `.h-page`, raya, lead y CTA + teléfono. Toda página interior con contenido abre con él. Las utilidades (`src/pages/404.astro`, `src/pages/thank-you/index.astro`) usan un hero oscuro simple escrito en la página, y `src/pages/contact-us/index.astro` abre con un espaciador y Contact como H1.

El header es fijo y transparente arriba, así que el primer bloque de toda página debe ser oscuro o dejar ~96–160 px libres arriba.

### Tratamientos

| Papel | Cómo lo resuelve el sitio |
|---|---|
| Hero | Foto o video **a sangre detrás del texto**, con velo asfalto; nunca una foto en recuadro al lado. Home: video a pantalla casi completa. Interiores: PageHero, ~780 px a 1440 |
| Concepto en una tarjeta (servicio, beneficio, paso, opción) | **Ilustración 3D** de `src/data/illustrations.ts` (viñeta isométrica sobre losa de asfalto). Si no existe la que hace falta, se genera con la receta de §8 |
| Iconos de interfaz (flecha, check, más, teléfono, estrella) | Phosphor: `-bold` para UI y `-fill` para acentos. Solo para la interfaz, nunca para representar un concepto |
| Fondo de sección | Plano (papel, concreto o asfalto), con Pattern tenue en una o dos esquinas |
| Foto de contenido | Redondeada con `--radius-card`, grande, a menudo con una tarjeta de texto clara montada encima |
| Calidad mínima de foto | A sangre: original de 1920 px de ancho o más (PageHero lo exige al compilar). Media columna: 1400 px. Los cuadros de video se miran a tamaño real antes de usarlos |

## 7. Sistema de movimiento

Todo se define en `src/scripts/app.ts` y se inicializa por página en `initPage()`, dentro de un `gsap.context` que se revierte al navegar. Los estados iniciales (ocultos) están al final de `src/styles/global.css` y solo aplican con JS y sin movimiento reducido.

| Gancho | Efecto | Uso en una página nueva |
|---|---|---|
| `data-split` | El título sube línea a línea con máscara al entrar (1.1 s) | En cada H2 de sección y en el H1 |
| `data-reveal` | Aparece desde 28 px abajo, en tanda escalonada (1 s) | En párrafos, tarjetas, ítems de lista y enlaces de cierre. No en el contenedor de la sección |
| `parallax` (prop de Media) | La foto se desplaza y escala con el scroll | En fotos grandes dentro de un marco con `overflow-hidden` |
| `data-pattern` | La textura aparece al entrar | Lo pone Pattern |
| `data-faq` / `data-faq-body` | Acordeón con altura animada | Sobre `<details>` |
| `data-marquee` | Cinta continua | LogoStrip |
| `data-scroll-write` | El párrafo se "escribe" con el scroll | Firma (About) |
| `data-stack*`, `data-work*`, `data-areas*`, `data-reviews`, `data-hero*` | Coreografías de una sección concreta | Solo dentro de esa sección; hay una instancia por página |

Reglas:
- Una página nueva no añade JS de animación: usa `data-split` y `data-reveal`. Si hace falta un efecto nuevo, se escribe como función en `src/scripts/app.ts`, se llama desde `initPage()` y se anota en esta tabla.
- Todo el contenido va dentro del `<slot />` del layout: Barba solo cambia `<main data-barba="container">`. Un `<script>` en la página no se vuelve a ejecutar al navegar con Barba.
- Cada página pasa un `namespace` propio al layout.
- Movimiento reducido: sin Lenis, sin Barba, sin animaciones; el contenido se ve completo. No dejes nada que dependa de una animación para ser visible.
- Transición entre páginas: cortina asfalto con línea naranja. No se toca.

## 8. Imagen e iconografía

- **Flujo:** el original va a `src/assets/img/` con nombre descriptivo; se registra en `src/data/images.ts` con `alt` (qué se ve, hasta ~125 caracteres), `description` (trabajo y ciudad) y `location`; se pinta con Media. Nunca un `<img>` suelto para contenido.
- **Fotografía:** trabajos reales del equipo, luz de día, sin filtros. Encuadres con asfalto y líneas recién pintadas. Formatos habituales: 4:3 y 573:400 horizontales, 3:4 vertical en rejillas, cuadrado en Instagram.
- **Ilustraciones 3D (recurso de firma):**
  - **Qué es:** objetos del oficio en 3D sobre fondo transparente. Dos familias: recortes fotorrealistas tipo producto (máquina de striping, conos) y viñetas isométricas mate tipo arcilla sobre una losa de asfalto flotante (servicios, tipos de propiedad, plazos).
  - **Constantes:** paleta de marca (asfalto #192730, naranja #ee6a1f, blanco, gris concreto #eef0f1); luz suave desde arriba a la izquierda; sombra de contacto muy leve; PNG con transparencia real; 1024×1024 o 1536×1024; margen generoso.
  - **Varía:** el objeto o la escena sobre la losa.
  - **Nunca:** texto, letras, logos ni marcas dentro de la imagen; fondos o suelos; otros colores saturados.
  - **Cómo se produce una nueva:** con Codex (`codex exec --skip-git-repo-check --sandbox workspace-write "<prompt>" < /dev/null`) partiendo de los prompts de `../sitio-assets/ilustraciones/PROMPT.md` (y sus variantes en esa carpeta), cambiando solo la escena. Se compara con las existentes antes de usarla.
  - **Cómo se integra:** el PNG va a `src/assets/illustrations/`, se registra en `src/data/illustrations.ts` y se pinta con Media (`imgClass="!object-contain"`, `fallbackFormat="png"`), a 130–320 px, a menudo saliéndose por una esquina de la tarjeta.
- **Procedencia de imágenes:** las fotos son de trabajos del equipo (fotos del cliente y cuadros de sus videos); las ilustraciones y la medalla se generaron con Codex; el sello BBB se carga del servidor de BBB; el mapa usa datos de OpenStreetMap con su crédito.
- **Iconos:** Phosphor por `astro-icon`, solo para la interfaz: `-bold` para UI, `-fill` para acentos (estrella, teléfono, cono). Los conceptos llevan ilustración 3D (§6, Tratamientos). Logos de marcas con `logos:` y `simple-icons:`.
- **Texturas:** `public/patterns/topo.svg` y `public/patterns/asphalt.svg`, siempre a través de Pattern.

## 9. Voz y texto

Inglés de Estados Unidos. Primera persona del plural, directo, de oficio; frases cortas con datos concretos (dos capas, goma caliente, 2 horas / 24 horas, 15 de mayo a 15 de octubre). Sin superlativos vacíos ni jerga de marketing.

- Títulos en formato oración (solo la primera mayúscula), de 4 a 9 palabras, descriptivos: "How we seal a parking lot", "Recent jobs around the valley".
- Etiquetas de una o dos palabras: "Services", "Our work", "Free estimate".
- Texto de tarjeta: una frase, dos como mucho. Ejemplo: "Every crack gets hot rubber before any sealer goes down."
- CTA: siempre "Get a free estimate". Enlaces de cierre en imperativo descriptivo: "See every case study".
- Solo datos confirmados; lo pendiente no se publica como hecho (ver `../rediseno/reglas-seo-geo.md` §2).

## 10. Reglas que toda página cumple

- **Modo oscuro** (detalle en `README.md`): solo tokens de color; cada superficie con su clase `bg-*`; secciones oscuras con `bg-asphalt`; naranja como texto con `text-orange-deep`; logos que necesiten blanco real sobre `bg-[#fff]`. Transparencias con `color-mix(in srgb, var(--color-ink) 35%, transparent)`.
- **Accesibilidad:** un solo H1; cada `<section>` con `aria-labelledby` apuntando a su título; iconos decorativos con `aria-hidden`; enlaces que abren pestaña lo anuncian en texto oculto; el foco visible global (contorno naranja) no se anula.
- **Rendimiento:** `priority` solo en la primera imagen visible; `sizes` real en cada Media; nada de librerías nuevas.
- **SEO/GEO** (detalle en `../rediseno/reglas-seo-geo.md`): indexable por defecto, canonical autorreferente (lo hace Seo), URL en minúsculas con barra final, un bloque `@graph` por página, imágenes con alt y descripción, texto en el HTML servido.

## 11. Receta de página

1. Crea `src/pages/{slug}/index.astro` (carpeta + `index.astro`; `trailingSlash: 'always'` en `astro.config.mjs`).
2. Envuelve todo en `BaseLayout` con `title` ("… | Superior Striping"), `description`, `namespace` propio y `jsonLd`. `noindex` solo para páginas de gracias o utilidades.
3. JSON-LD: un `@graph` con `businessNode(...)` y un nodo de página (`WebPage`, `Service`, etc.) con `@id` `${pageUrl}#webpage`, `isPartOf` el sitio y `about: { '@id': BUSINESS_ID }`. Si hay preguntas, `faqNode(items, pageUrl)`. Copia el arranque de `src/pages/contact-us/index.astro`.
4. Primer bloque: hero interior (§6) con el único H1 de la página.
5. Compón con secciones de §5. Cada sección nueva: `<section class="section-y bg-…" aria-labelledby="…">` → `.site-container` → Badge + `h-section` con `data-split` → contenido con `data-reveal`.
6. Imágenes nuevas: regístralas en `src/data/images.ts` y usa Media.
7. Registra la página en `src/data/pages.ts` (`path`, `title`, `section`, `lastmod`). Sin esto no entra en el sitemap.
8. Enlaces: comprueba que su URL coincide con la que ya enlazan `nav`, `services`, `cities` o `company` en `src/data/site.ts` (header y footer ya apuntan a páginas que aún no existen) y enlaza desde las secciones relacionadas.
9. Verifica: `npm run build` sin errores; en `npm run dev`, mira la página a 1440 y 390 px, en claro y oscuro, con scroll completo; corre `tools/contrast-audit.js` como indica `README.md` (dos listas vacías; si `__contrastAuditBoth()` marca texto con razón ~1 en una sección sin fondo propio, es la transición de color del `html`: repite con `__contrastAudit()` en ese tema ya asentado); vuelve a abrir la home si tocaste una sección compartida.
10. Añade la página al registro de §13 y las secciones nuevas o parametrizadas a §5.

## 12. Tipos de página

**Servicio** (primera: `src/pages/parking-lot-sealcoating/index.astro`). Contenido en un archivo propio de `src/data/` (`src/data/parking-lot-sealcoating.ts`), que la página importa y pasa por props. Secuencia: PageHero (asfalto) → SplitList "qué incluye" (papel) → Steps (concreto) → Features `dark` (asfalto) → Compare de costos (papel) → Season sin logo (concreto) → SplitList `reverse` "cuándo no" (papel) → Faq (concreto) → CTA del footer. JSON-LD: `WebPage` + `Service` + `BreadcrumbList` + `faqNode`. Para la siguiente página de servicio, copiar esta página y su archivo de datos; cuando haya tres, pasar a ruta dinámica con una colección.

Aún sin construir. Previstos por la navegación y por `PageEntry.section` en `src/data/pages.ts`: servicios, ciudades (`locations`), casos de estudio, posts y legales.

## 13. Registro de páginas

| URL | Tipo | Secciones (en orden) | Fecha |
|---|---|---|---|
| `/` | home | Hero, LogoStrip, About, Services, Process, Work, Season, Segments, Testimonials, Recognition, Instagram, ServiceAreas, Faq, Contact, Location, Blog | 2026-11-24 |
| `/parking-lot-sealcoating/` | servicio | PageHero, SplitList, Steps, Features (dark), Compare, Season (sin logo), SplitList (reverse), Faq | 2026-11-25 |
| `/contact-us/` | core | espaciador, Contact (`h1`), Location | 2026-11-24 |
| `/sitemap/` | core | lista de páginas desde `src/data/pages.ts` | 2026-11-24 |
| `/thank-you/` | utilidad (noindex) | hero oscuro simple | 2026-11-24 |
| 404 | utilidad (noindex) | hero oscuro simple + listas de enlaces | 2026-11-24 |

## 14. Reglas del cliente

Mandan sobre el resto del documento.

- **2026-11-25 — Los iconos que representan un concepto son siempre 3D.** Nada de iconos planos dentro de un círculo en tarjetas de servicio, beneficio, paso u opción. Se cumple pasando `art` (una ilustración) a Features y a los componentes equivalentes; `icon` queda solo como respaldo.
- **2026-11-25 — La foto del hero es siempre de buena calidad y cubre el fondo**, no va como un cuadro al lado. Se cumple con PageHero (foto a sangre, mínimo 1920 px de ancho; por debajo, la compilación falla).
- **2026-11-25 — Una foto buena pero de baja calidad se puede mejorar con Codex (imagegen)**, de forma natural y sin cambiar nada de lo que muestra, **solo si no tiene personas o la persona está de espaldas o no mira a la cámara**. Si mira a la cámara, no se usa imagegen: se busca otra foto. Prompt base y originales en `../sitio-assets/fotos-mejoradas/`; el resultado se compara con el original antes de usarlo.
- **2026-11-25 — Los logos de clientes se ven al cargar** en escritorio y móvil (por eso el hero de la home mide `100dvh` menos `--strip-h`).
- **2026-11-25 — La barra inferior móvil no duplica el CTA del hero:** se esconde mientras el hero está en pantalla.
- **Zips de entrega:** solo cuando el cliente lo pide.

## 15. Pendientes y decisiones abiertas

- **Móvil, home:** la auditoría del 2026-11-25 queda sin avisos tras subir a 40 px los enlaces de texto (`.link-arrow` en móvil y táctil), el teléfono del hero y las etiquetas del mapa (13 px, con zona táctil ampliada).

- **Secciones con contenido fijo** (parametrizar al reutilizar, con los valores actuales por defecto): Hero, About, Services, Process, Work, Segments, Testimonials, Recognition, y los títulos de ServiceAreas, Contact y Blog.
- **Radios sueltos:** `rounded-[1rem]` (igual a `--radius-card`), `rounded-[1.5rem]`, `rounded-[1.75rem]`, `rounded-[2rem]`, `rounded-xl`, `rounded-2xl`. Propuesta: un token `--radius-panel` para las tarjetas contenedoras grandes.
- **Tamaños de texto sueltos:** 1.375rem, 1.5rem, 1.6/2.4rem (cita), 1.75–2.75rem (párrafo de About), 4rem (cifra). Propuesta: clases `.h-sub` y `.quote`.
- **Colores sueltos:** degradado del hero con `rgb(17 24 29 / …)`, borde de `.badge[data-tone="dark"]`, sombra del chip de reseñas, colores de marca en `platforms`. `--color-white` se redefine en oscuro pero no está declarado en `@theme`.
- **Comentarios desfasados** en `src/styles/global.css` (132 px de ritmo) y en `README.md` (nombra una sección "Projects" que es `Work.astro`, y omite varias).
- El paquete `@fontsource-variable/archivo` está instalado y no se usa.
- **Dudas de identidad:** las páginas interiores abren en oscuro con PageHero (decidido al construir la primera; revisar con el cliente). ¿Las tres secciones `bg-paper` seguidas de la home son intencionales o conviene alternar? ¿El logotipo gigante de Season es un recurso repetible o exclusivo de la home?
