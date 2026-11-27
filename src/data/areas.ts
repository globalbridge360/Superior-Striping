// Coordenadas reales (centro de cada ciudad) proyectadas a un lienzo de 760 x 590.
// Rango: longitud -116.78 a -116.14, latitud 43.42 a 43.78. x = (lon + 116.78) * 1187.5, y = (43.78 - lat) * 1638.9
export const MAP_W = 760;
export const MAP_H = 590;
const project = (lat: number, lon: number) => ({ x: +((lon + 116.78) * 1187.5).toFixed(1), y: +((43.78 - lat) * 1638.9).toFixed(1) });

export const base = { name: 'Nampa', ...project(43.5788, -116.5598) };

export const mapCities = [
  { name: 'Caldwell', href: '/caldwell-idaho/', ...project(43.6629, -116.6874), side: 'left' },
  { name: 'Star', href: '/star-idaho/', ...project(43.6921, -116.4935), side: 'top' },
  { name: 'Eagle', href: '/eagle-idaho/', ...project(43.6955, -116.354), side: 'top' },
  { name: 'Meridian', href: '/meridian-idaho/', ...project(43.6121, -116.3915), side: 'right' },
  { name: 'Boise', href: '/boise-idaho/', ...project(43.615, -116.2023), side: 'left' },
  { name: 'Kuna', href: '/kuna-idaho/', ...project(43.4918, -116.4201), side: 'right' },
] as const;

// La geografía (carreteras, agua, límites) está en areas-geo.ts, generada desde OpenStreetMap.
