// Orquestación del sitio: Lenis (scroll suave), GSAP (ScrollTrigger + SplitText) y Barba (transiciones).
// Toda animación de página vive dentro de un gsap.context por contenedor de Barba, que se revierte
// al salir, así no quedan ScrollTriggers huérfanos entre páginas.
import Lenis from 'lenis';
import barba from '@barba/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- Lenis ---------------- */
let lenis: Lenis | null = null;
if (!reduceMotion) {
  lenis = new Lenis({ duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 3), smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ---------------- Header ---------------- */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  ScrollTrigger.create({
    start: 'top -80',
    end: 'max',
    onUpdate: (self) => {
      const scrolled = self.progress > 0 || window.scrollY > 80;
      header.dataset.state = scrolled ? 'scrolled' : 'top';
      if (document.body.classList.contains('menu-open')) return;
      header.dataset.hidden = String(self.direction === 1 && window.scrollY > 400);
    },
    onLeaveBack: () => {
      header.dataset.state = 'top';
      header.dataset.hidden = 'false';
    },
  });
}

/* ---------------- Menú móvil ---------------- */
function initMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!toggle || !menu) return;

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr-only')!.textContent = open ? 'Close menu' : 'Open menu';
    document.body.classList.toggle('menu-open', open);
    if (open) {
      menu.hidden = false;
      lenis?.stop();
      if (!reduceMotion) {
        gsap.fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'expo.out' });
        gsap.fromTo(menu.querySelectorAll('.mobile-menu__link'), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: 'expo.out', delay: 0.1 });
      }
      menu.querySelector<HTMLElement>('a')?.focus();
    } else {
      lenis?.start();
      if (reduceMotion) {
        menu.hidden = true;
      } else {
        gsap.to(menu, { clipPath: 'inset(0 0 100% 0)', duration: 0.45, ease: 'expo.in', onComplete: () => { menu.hidden = true; } });
      }
    }
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('[data-menu-close]').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
}

/* ---------------- Animaciones por página ---------------- */
let pageCtx: gsap.Context | null = null;

function heroIntro(scope: Element) {
  const hero = scope.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const title = hero.querySelector<HTMLElement>('[data-hero-title]');
  const stripe = hero.querySelector<HTMLElement>('[data-hero-stripe]');
  const media = hero.querySelector<HTMLElement>('[data-hero-media]');
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  if (media) tl.fromTo(media, { scale: 1.12 }, { scale: 1, duration: 2.2 }, 0);
  if (title) {
    gsap.set(title, { visibility: 'visible' });
    SplitText.create(title, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit(self) {
        // autoSplit vuelve a partir al cargar la fuente: la animación va suelta, sincronizada con la línea de tiempo
        return gsap.from(self.lines, { yPercent: 105, duration: 1.2, stagger: 0.09, ease: 'expo.out', delay: Math.max(0, 0.25 - tl.time()) });
      },
    });
  }
  // La pasada de la máquina de striping: la raya se pinta de izquierda a derecha
  if (stripe) tl.fromTo(stripe, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'power3.inOut' }, 0.7);
  tl.to(hero.querySelectorAll('[data-hero-fade]'), { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0.9);
  tl.from(hero.querySelectorAll('[data-hero-card]'), { y: 40, opacity: 0, duration: 1.2 }, 1.1);

  if (media) {
    gsap.to(media, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }
}

function splitHeadings(scope: Element) {
  scope.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    if (el.closest('[data-hero]')) return;
    gsap.set(el, { visibility: 'visible' });
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 105,
          duration: 1.1,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      },
    });
  });
  // Los títulos del footer viven fuera del contenedor de Barba
}

function reveals(scope: Element | Document) {
  const items = gsap.utils.toArray<HTMLElement>(scope.querySelectorAll('[data-reveal]'));
  if (!items.length) return;
  ScrollTrigger.batch(items, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'expo.out' }),
  });
}

function parallaxImages(scope: Element | Document) {
  scope.querySelectorAll<HTMLElement>('[data-parallax]').forEach((img) => {
    const frame = img.closest('figure') ?? img.parentElement!;
    gsap.fromTo(
      img,
      { yPercent: -6, scale: 1.12 },
      { yPercent: 6, scale: 1.12, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } }
    );
  });
}

// Tarjetas apiladas, idénticas a Miyerd (Webflow IX, interacción i-15793cca):
// cada tarjeta es sticky a 30px con 30px de separación, y TODAS escalan de 1 a 0.9
// de forma lineal mientras la sección recorre el viewport (top bottom → bottom top),
// con scrub de 0.8 s. Sin cambio de opacidad. En todos los tamaños de pantalla.
function serviceStack(scope: Element) {
  const stack = scope.querySelector<HTMLElement>('[data-stack]');
  if (!stack) return;
  const section = stack.closest('section') ?? stack;
  const cards = gsap.utils.toArray<HTMLElement>(stack.querySelectorAll('[data-stack-inner]'));
  gsap.fromTo(
    cards,
    { scale: 1 },
    { scale: 0.9, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.8 } },
  );
}

function marquee(scope: Element) {
  scope.querySelectorAll<HTMLElement>('[data-marquee]').forEach((wrap) => {
    const track = wrap.querySelector<HTMLElement>('[data-marquee-track]');
    if (!track) return;
    const duration = Number(wrap.dataset.marqueeSpeed) || 38;
    const tween = gsap.to(track, { xPercent: -50, ease: 'none', duration, repeat: -1 });
    wrap.addEventListener('mouseenter', () => tween.timeScale(0.25));
    wrap.addEventListener('mouseleave', () => tween.timeScale(1));
  });
}

// Reseñas: rotan solas en bucle cada 3.5 s con fundido (sin pausa ni play). Los avatares saltan a una reseña y reinician el ciclo.
const REVIEW_INTERVAL = 3500;
function reviews(scope: Element) {
  const root = scope.querySelector<HTMLElement>('[data-reviews]');
  if (!root) return;
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[role="tabpanel"]'));
  let current = 0;
  let timer = 0;
  const select = (index: number, focus = false) => {
    current = index;
    tabs.forEach((t, i) => {
      const on = i === index;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      panels[i].dataset.active = String(on);
      if (on) panels[i].removeAttribute('aria-hidden');
      else panels[i].setAttribute('aria-hidden', 'true');
    });
    if (focus) tabs[index].focus();
  };
  const restart = () => {
    window.clearInterval(timer);
    timer = window.setInterval(() => {
      if (!root.isConnected) return window.clearInterval(timer);
      // Salta las reseñas cuyo avatar está oculto (en móvil solo se muestran 5)
      let next = current;
      for (let k = 0; k < tabs.length; k++) {
        next = (next + 1) % tabs.length;
        if (tabs[next].offsetParent !== null) break;
      }
      select(next);
    }, REVIEW_INTERVAL);
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      select(i);
      restart();
    });
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { select((i + 1) % tabs.length, true); restart(); }
      if (e.key === 'ArrowLeft') { select((i - 1 + tabs.length) % tabs.length, true); restart(); }
    });
  });
  restart();
}

function faq(scope: Element) {
  scope.querySelectorAll<HTMLDetailsElement>('[data-faq] details').forEach((d) => {
    const summary = d.querySelector('summary')!;
    const body = d.querySelector<HTMLElement>('[data-faq-body]')!;
    summary.addEventListener('click', (e) => {
      if (reduceMotion) return;
      e.preventDefault();
      if (d.open) {
        gsap.to(body, { height: 0, duration: 0.45, ease: 'expo.out', onComplete: () => { d.open = false; gsap.set(body, { clearProps: 'height' }); ScrollTrigger.refresh(); } });
      } else {
        d.open = true;
        gsap.fromTo(body, { height: 0 }, { height: 'auto', duration: 0.6, ease: 'expo.out', onComplete: () => ScrollTrigger.refresh() });
      }
    });
  });
}

/* Patrones de fondo: aparecen con un fundido lento al entrar la sección */
function patterns(scope: Element) {
  scope.querySelectorAll<HTMLElement>('[data-pattern]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 1, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el.parentElement, start: 'top 85%' } },
    );
  });
}

/* Texto que se "escribe" con el scroll (Canopy): cada letra pasa de tenue a sólida */
function scrollWrite(scope: Element) {
  scope.querySelectorAll<HTMLElement>('[data-scroll-write]').forEach((el) => {
    SplitText.create(el, {
      type: 'words,chars',
      autoSplit: true,
      onSplit(self) {
        // Opacidad en vez de color: funciona igual en tema claro y oscuro
        gsap.set(self.chars, { opacity: 0.22 });
        return gsap.to(self.chars, {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 42%', scrub: 0.6 },
        });
      },
    });
  });
}

/* Carrusel 3D de "Our work". Corre también con movimiento reducido (sin tween). */
function workCarousel(scope: Element) {
  const root = scope.querySelector<HTMLElement>('[data-work]');
  if (!root) return () => {};
  const stage = root.querySelector<HTMLElement>('[data-work-stage]')!;
  const track = root.querySelector<HTMLElement>('[data-work-track]')!;
  const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-work-slide]'));
  const arrows = root.querySelector<HTMLElement>('[data-work-arrows]')!;
  const n = slides.length;
  let active = 0;
  arrows.hidden = false;

  const layout = (animate: boolean) => {
    const w = slides[0].offsetWidth;
    track.style.setProperty('--work-h', `${slides[0].offsetHeight}px`);
    slides.forEach((s, i) => {
      let d = i - active;
      if (d > n / 2) d -= n;
      if (d < -n / 2) d += n;
      const ad = Math.abs(d);
      const vars = {
        x: d * w * (window.innerWidth < 768 ? 0.88 : 1.0),
        rotationY: Math.sign(d) * Math.min(ad, 1) * 22,
        scale: ad === 0 ? 1 : 0.72,
        opacity: ad <= 1 ? 1 : 0,
        zIndex: 10 - ad,
      };
      const shade = s.querySelector('[data-work-shade]');
      const link = s.querySelector('a');
      s.setAttribute('aria-hidden', ad === 0 ? 'false' : 'true');
      link?.setAttribute('tabindex', ad === 0 ? '0' : '-1');
      s.style.pointerEvents = ad <= 1 ? 'auto' : 'none';
      if (animate && !reduceMotion) {
        gsap.to(s, { ...vars, duration: 0.95, ease: 'expo.out' });
        gsap.to(shade, { opacity: ad === 0 ? 0 : 0.7, duration: 0.6 });
      } else {
        gsap.set(s, vars);
        gsap.set(shade, { opacity: ad === 0 ? 0 : 0.7 });
      }
    });
  };
  // Avance automático cada 3.5 s; cualquier interacción reinicia la cuenta.
  // Con movimiento reducido no avanza solo.
  const WORK_INTERVAL = 3500;
  let auto = 0;
  const restartAuto = () => {
    window.clearInterval(auto);
    if (reduceMotion) return;
    auto = window.setInterval(() => {
      if (!root.isConnected) return window.clearInterval(auto);
      active = (active + 1) % n;
      layout(true);
    }, WORK_INTERVAL);
  };
  const go = (i: number) => {
    active = (i + n) % n;
    layout(true);
    restartAuto();
  };
  const prev = () => go(active - 1);
  const next = () => go(active + 1);
  root.querySelector('[data-work-prev]')!.addEventListener('click', prev);
  root.querySelector('[data-work-next]')!.addEventListener('click', next);
  stage.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
  // Clic en una tarjeta lateral la trae al frente en vez de abrir el enlace
  slides.forEach((s, i) =>
    s.addEventListener('click', (e) => {
      if (i !== active) {
        e.preventDefault();
        go(i);
      }
    })
  );
  // Deslizar con el dedo o el ratón
  let startX = 0;
  let dragging = false;
  stage.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    dragging = true;
  });
  stage.addEventListener('pointerup', (e) => {
    if (!dragging) return;
    dragging = false;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  });
  stage.addEventListener('dragstart', (e) => e.preventDefault());

  layout(false);
  const onResize = () => layout(false);
  window.addEventListener('resize', onResize);
  // Las imágenes pueden cambiar la altura al cargar
  slides[0].querySelector('img')?.addEventListener('load', onResize, { once: true });
  restartAuto();
  return () => {
    window.removeEventListener('resize', onResize);
    window.clearInterval(auto);
  };
}

/* Mapa de áreas: la base aparece y las rutas salen hacia cada ciudad */
function areasMap(scope: Element) {
  const root = scope.querySelector<HTMLElement>('[data-areas]');
  if (!root) return;
  const fig = root.querySelector('figure')!;
  const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top 75%', once: true } });
  tl.from(root.querySelectorAll('[data-area-base] > span'), { scale: 0.6, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'back.out(1.7)' }, 0.2)
    .from(root.querySelectorAll('[data-area-route]'), { opacity: 0, duration: 0.6, stagger: 0.08 }, 0.5)
    .from(root.querySelectorAll('[data-area-dot]'), { scale: 0, transformOrigin: '50% 50%', duration: 0.5, stagger: 0.08, ease: 'back.out(2)' }, 0.6)
    // Solo opacidad: las etiquetas se posicionan con la propiedad CSS translate, que GSAP reiniciaría
    .from(root.querySelectorAll('[data-area-pill]'), { opacity: 0, duration: 0.6, stagger: 0.08 }, 0.7);
}

/* Formulario de presupuesto: una pregunta a la vez */
function estimateForm(scope: Element) {
  scope.querySelectorAll<HTMLFormElement>('[data-estimate]').forEach((form) => {
    const root = form.closest<HTMLElement>('[data-estimate-root]')!;
    const steps = Array.from(form.querySelectorAll<HTMLElement>('[data-step]'));
    const progress = form.querySelector<HTMLElement>('[data-progress]')!;
    const bar = form.querySelector<HTMLElement>('[data-progress-bar]')!;
    const num = form.querySelector<HTMLElement>('[data-step-num]')!;
    const back = form.querySelector<HTMLButtonElement>('[data-back]')!;
    const nextBtn = form.querySelector<HTMLButtonElement>('[data-next]')!;
    const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
    const err = form.querySelector<HTMLElement>('[data-estimate-error]')!;
    const done = root.querySelector<HTMLElement>('[data-estimate-done]')!;
    let cur = 0;
    let timer = 0;

    form.classList.add('is-stepper');
    progress.classList.remove('hidden');

    const valid = (i: number) => {
      const s = steps[i];
      if (s.querySelector('input[type="radio"]') && !s.querySelector('input[type="radio"]:checked')) return false;
      return Array.from(s.querySelectorAll<HTMLInputElement>('input[required]:not([type="radio"])')).every((f) => f.value.trim() !== '');
    };
    const showError = (msg: string) => {
      err.textContent = msg;
      err.classList.remove('hidden');
    };
    const show = (i: number, focus = true) => {
      cur = i;
      const last = i === steps.length - 1;
      steps.forEach((s, k) => s.classList.toggle('is-current', k === i));
      num.textContent = String(i + 1);
      bar.style.transform = `scaleX(${(i + 1) / steps.length})`;
      back.classList.toggle('hidden', i === 0);
      nextBtn.classList.toggle('hidden', last);
      submit.classList.toggle('hidden', !last);
      nextBtn.disabled = !valid(i);
      err.classList.add('hidden');
      if (!reduceMotion) gsap.fromTo(steps[i], { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.55, ease: 'expo.out' });
      if (focus) {
        const target = steps[i].querySelector<HTMLInputElement>('input:checked') ?? steps[i].querySelector<HTMLInputElement>('input, textarea');
        target?.focus({ preventScroll: true });
      }
    };

    form.addEventListener('change', (e) => {
      const t = e.target as HTMLInputElement;
      nextBtn.disabled = !valid(cur);
      if (t.type === 'radio' && cur < steps.length - 1 && t.name !== 'city') {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => show(cur + 1), 320);
      }
    });
    form.addEventListener('input', () => {
      nextBtn.disabled = !valid(cur);
    });
    form.addEventListener('keydown', (e) => {
      const t = e.target as HTMLElement;
      if (e.key === 'Enter' && t.tagName === 'INPUT' && cur < steps.length - 1) {
        e.preventDefault();
        if (valid(cur)) show(cur + 1);
      }
    });
    nextBtn.addEventListener('click', () => valid(cur) && show(cur + 1));
    back.addEventListener('click', () => show(cur - 1));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const missing = Array.from(form.querySelectorAll<HTMLInputElement>('input[required]:not([type="radio"])')).filter((f) => !f.value.trim());
      form.querySelectorAll('input').forEach((f) => f.removeAttribute('aria-invalid'));
      if (missing.length) {
        missing.forEach((f) => f.setAttribute('aria-invalid', 'true'));
        missing[0].focus();
        showError('Add your name and a phone number so we can call you back.');
        return;
      }
      submit.disabled = true;
      submit.setAttribute('aria-busy', 'true');
      try {
        const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
        const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
        if (!res.ok) throw new Error(String(res.status));
        form.classList.add('hidden');
        done.classList.remove('hidden');
        done.focus();
        if (!reduceMotion) gsap.from(done, { opacity: 0, y: 16, duration: 0.7, ease: 'expo.out' });
      } catch {
        showError('We couldn’t send your request. Please call or text us at (208) 249-2183.');
      } finally {
        submit.disabled = false;
        submit.removeAttribute('aria-busy');
      }
    });

    show(0, false);
  });
}

function initPage(container: Element) {
  mobileBar(container);
  pageCtx?.revert();
  estimateForm(container);
  if (reduceMotion) {
    reviews(container);
    workCarousel(container);
    return;
  }
  pageCtx = gsap.context(() => {
    heroIntro(container);
    scrollWrite(container);
    patterns(container);
    areasMap(container);
    const stopWork = workCarousel(container);
    splitHeadings(container);
    reveals(container);
    parallaxImages(container);
    serviceStack(container);
    marquee(container);
    return () => stopWork();
  }, container);
  reviews(container);
  faq(container);
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

/* Animaciones del footer (fuera del contenedor de Barba): una sola vez */
function initFooter() {
  if (reduceMotion) return;
  const footer = document.querySelector('footer');
  if (!footer) return;
  splitHeadings(footer);
  reveals(footer);
  parallaxImages(footer);
}

/* ---------------- Barba ---------------- */
function syncHead(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  document.head.querySelectorAll('[data-head]').forEach((n) => n.remove());
  doc.head.querySelectorAll('[data-head]').forEach((n) => document.head.appendChild(n.cloneNode(true)));
  // Los <script type="application/ld+json"> clonados se vuelven a evaluar como datos, no como código
}

function markCurrentNav() {
  const path = window.location.pathname;
  document.querySelectorAll<HTMLAnchorElement>('.header-link').forEach((a) => {
    if (a.getAttribute('href') === path) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

function initBarba() {
  const band = document.querySelector<HTMLElement>('.page-wipe__band');
  const line = document.querySelector<HTMLElement>('.page-wipe__line');

  barba.init({
    preventRunning: true,
    prevent: ({ el }) => el.hasAttribute('data-barba-prevent'),
    transitions: [
      {
        name: 'stripe-pass',
        async leave() {
          if (reduceMotion || !band || !line) return;
          const tl = gsap.timeline();
          tl.set([band, line], { transformOrigin: 'left center' })
            .to(line, { scaleX: 1, duration: 0.45, ease: 'power3.in' })
            .to(band, { scaleX: 1, duration: 0.55, ease: 'expo.inOut' }, 0.15);
          await tl;
        },
        async enter() {
          if (reduceMotion || !band || !line) return;
          const tl = gsap.timeline();
          tl.set([band, line], { transformOrigin: 'right center' })
            .to(band, { scaleX: 0, duration: 0.7, ease: 'expo.inOut' })
            .to(line, { scaleX: 0, duration: 0.5, ease: 'power3.out' }, 0.2);
          await tl;
        },
      },
    ],
  });

  barba.hooks.beforeLeave(() => {
    pageCtx?.revert();
    pageCtx = null;
  });
  barba.hooks.beforeEnter(({ next }) => {
    syncHead(next.html);
    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  });
  barba.hooks.after(({ next }) => {
    initPage(next.container);
    markCurrentNav();
  });
}

/* ---------------- Barra de contacto en móvil ----------------
   Se esconde mientras el hero está a la vista (ya muestra estimate y llamada).
   En páginas sin hero queda siempre visible. Se re-evalúa en cada página de Barba. */
let mobileBarObserver: IntersectionObserver | null = null;
function mobileBar(container: Element) {
  const bar = document.querySelector<HTMLElement>('[data-mobile-bar]');
  if (!bar) return;
  mobileBarObserver?.disconnect();
  const hero = container.querySelector('[data-hero]');
  if (!hero) {
    bar.dataset.hidden = 'false';
    return;
  }
  mobileBarObserver = new IntersectionObserver(
    ([entry]) => {
      // La raíz es la línea superior del viewport: mientras el hero la cruce, la barra se esconde
      bar.dataset.hidden = String(entry.isIntersecting);
    },
    { rootMargin: '0px 0px -100% 0px', threshold: 0 },
  );
  mobileBarObserver.observe(hero);
}

/* ---------------- Tema claro / oscuro ---------------- */
function initTheme() {
  const root = document.documentElement;
  const btn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  const sync = () => btn?.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
  sync();
  btn?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch {}
    sync();
  });
  // Si el visitante nunca eligió, seguimos el tema del sistema
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    let saved: string | null = null;
    try { saved = localStorage.getItem('theme'); } catch {}
    if (saved) return;
    root.dataset.theme = e.matches ? 'dark' : 'light';
    sync();
  });
}

/* ---------------- Arranque ---------------- */
initTheme();
initHeader();
initMenu();
markCurrentNav();
const first = document.querySelector('[data-barba="container"]');
if (first) initPage(first);
initFooter();
if (!reduceMotion) initBarba();
