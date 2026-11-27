// Auditoría de contraste (WCAG AA) para pegar en la consola del navegador o cargar en dev.
// Recorre todo el texto visible, calcula su fondo real (mezclando capas semitransparentes)
// y lista lo que no llega a 4.5:1 (texto normal) o 3:1 (texto grande).
// Texto sobre foto o video no se mide: revísalo a ojo.
// Uso: haz scroll hasta el final (para disparar las animaciones de entrada) y corre
//   __contrastAudit()                 -> tema actual
//   __contrastAuditBoth()             -> claro y oscuro
(() => {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  const rgba = (c) => {
    if (!c || c === 'transparent' || c === 'rgba(0, 0, 0, 0)') return { r: 0, g: 0, b: 0, a: 0 };
    let a = 1;
    const m = c.match(/\/\s*([\d.]+%?)\s*\)\s*$/);
    if (m) a = m[1].endsWith('%') ? parseFloat(m[1]) / 100 : +m[1];
    else {
      const m2 = c.match(/^rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/);
      if (m2) a = +m2[1];
    }
    cx.clearRect(0, 0, 1, 1);
    cx.fillStyle = '#000';
    cx.fillStyle = c;
    cx.fillRect(0, 0, 1, 1);
    const d = cx.getImageData(0, 0, 1, 1).data;
    return d[3] > 0 ? { r: d[0], g: d[1], b: d[2], a } : { r: 0, g: 0, b: 0, a: 0 };
  };
  const lum = ({ r, g, b }) => {
    const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const blend = (t, b) => ({ r: t.r * t.a + b.r * (1 - t.a), g: t.g * t.a + b.g * (1 - t.a), b: t.b * t.a + b.b * (1 - t.a), a: 1 });
  const bgOf = (el) => {
    const st = [];
    for (let e = el; e; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.backgroundImage !== 'none' && !cs.backgroundImage.includes('gradient')) return null;
      for (const ch of e.children) {
        if (ch !== el && !ch.contains(el) && getComputedStyle(ch).position === 'absolute' && ch.querySelector('img,video') && ch.getBoundingClientRect().width > 200) return null;
      }
      const c = rgba(cs.backgroundColor);
      if (c.a > 0) {
        st.push(c);
        if (c.a >= 0.99) break;
      }
    }
    let base = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = st.length - 1; i >= 0; i--) base = blend(st[i], base);
    return base;
  };
  window.__contrastAudit = () => {
    const out = [];
    const seen = new Set();
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      const t = w.currentNode;
      const el = t.parentElement;
      if (!el || seen.has(el) || !t.textContent.trim()) continue;
      seen.add(el);
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden') continue;
      let op = 1;
      for (let e = el; e; e = e.parentElement) op *= +getComputedStyle(e).opacity;
      if (op < 0.3) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;
      if (el.closest('.sr-only,[aria-hidden="true"],svg,[hidden],[data-scroll-write],[data-menu],script,style,noscript,.mobile-bar[data-hidden="true"]')) continue;
      const bg = bgOf(el);
      if (!bg) continue;
      const f = blend(rgba(cs.color), bg);
      const L1 = lum(f), L2 = lum(bg);
      const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      const big = parseFloat(cs.fontSize) >= 24 || (parseFloat(cs.fontSize) >= 18.66 && +cs.fontWeight >= 700);
      if (ratio < (big ? 3 : 4.5))
        out.push(`${ratio.toFixed(2)} | ${cs.fontSize} | ${el.closest('section')?.getAttribute('aria-labelledby') || el.closest('footer,header,nav')?.tagName || '?'} | ${t.textContent.trim().slice(0, 50)}`);
    }
    return out;
  };
  window.__contrastAuditBoth = async () => {
    const root = document.documentElement;
    const prev = root.dataset.theme;
    const res = {};
    for (const th of ['light', 'dark']) {
      root.dataset.theme = th;
      await new Promise((r) => setTimeout(r, 400));
      res[th] = window.__contrastAudit();
    }
    root.dataset.theme = prev;
    return res;
  };
})();
