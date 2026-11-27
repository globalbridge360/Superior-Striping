// Datos del negocio. Fuente: kb/ (SSOT) y perfil de Google medido el 2026-11-24.
// NAP idéntico al perfil de Google. Dirección confirmada el 2026-11-26.

export const site = {
  name: 'Superior Striping',
  url: 'https://superior-striping.com',
  phone: '(208) 249-2183',
  phoneHref: 'tel:+12082492183',
  street: '2710 S Banner Ct',
  city: 'Nampa',
  region: 'ID',
  postalCode: '83686',
  owner: 'Scott Mitchell',
  googleReviewUrl: 'https://g.page/r/Cb_cbhrvRn32EBM/review',
  googleProfileUrl: 'https://maps.google.com/?cid=17761430498173705407',
  rating: { value: 4.9, count: 33 },
  hours: [
    { days: 'Monday to Friday', opens: '8:00 am', closes: '8:00 pm', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], o: '08:00', c: '20:00' },
    { days: 'Saturday', opens: '8:00 am', closes: '12:00 pm', schema: ['Saturday'], o: '08:00', c: '12:00' },
  ],
  sameAs: [
    'https://maps.google.com/?cid=17761430498173705407',
    'https://www.facebook.com/superiorstriping208',
    'https://www.instagram.com/superiorstriping_/',
  ],
} as const;

export const cities = [
  // Nampa es la sede y la home es su página (mapa v2): no existe /nampa-idaho/
  { name: 'Nampa', href: '/', wiki: 'https://en.wikipedia.org/wiki/Nampa,_Idaho' },
  { name: 'Boise', href: '/boise-idaho/', wiki: 'https://en.wikipedia.org/wiki/Boise,_Idaho' },
  { name: 'Meridian', href: '/meridian-idaho/', wiki: 'https://en.wikipedia.org/wiki/Meridian,_Idaho' },
  { name: 'Caldwell', href: '/caldwell-idaho/', wiki: 'https://en.wikipedia.org/wiki/Caldwell,_Idaho' },
  { name: 'Eagle', href: '/eagle-idaho/', wiki: 'https://en.wikipedia.org/wiki/Eagle,_Idaho' },
  { name: 'Kuna', href: '/kuna-idaho/', wiki: 'https://en.wikipedia.org/wiki/Kuna,_Idaho' },
  { name: 'Star', href: '/star-idaho/', wiki: 'https://en.wikipedia.org/wiki/Star,_Idaho' },
] as const;

export const services = [
  { name: 'Parking lot sealcoating', href: '/parking-lot-sealcoating/' },
  { name: 'Asphalt sealcoating', href: '/sealcoating/' },
  { name: 'Parking lot striping', href: '/line-striping/' },
  { name: 'Asphalt crack filling', href: '/crack-filling/' },
  { name: 'Asphalt repair & patching', href: '/asphalt-patching/' },
  { name: 'Bollards & parking blocks', href: '/bollards-parking-blocks-signage/' },
  { name: 'Rock hauling', href: '/rock-hauling/' },
  { name: 'Gravel driveway repair', href: '/gravel-driveway-repair/' },
] as const;

export const nav = [
  { label: 'Services', href: '/sealcoating/' },
  { label: 'Commercial', href: '/parking-lot-maintenance/' },
  { label: 'Areas', href: '/areas-we-serve/' },
  { label: 'Projects', href: '/case-studies/' },
  { label: 'About', href: '/about-us/' },
] as const;

export const company = [
  { label: 'About us', href: '/about-us/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'Case studies', href: '/case-studies/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact-us/' },
] as const;

export const legal = [
  { label: 'Privacy policy', href: '/privacy-policy/' },
  { label: 'Terms of service', href: '/terms-of-service/' },
  { label: 'SMS terms', href: '/sms-terms-and-conditions/' },
  { label: 'Sitemap', href: '/sitemap/' },
] as const;

// Perfiles en plataformas de reseñas. Google se midió; Yelp, Angi y HomeAdvisor salen de kb/ y del
// sitio actual, y sus páginas piden verificación anti-bot, así que no se pudo confirmar que estén activas.
export const platforms = [
  { name: 'Google', icon: 'logos:google-icon', href: 'https://maps.google.com/?cid=17761430498173705407', note: '4.9 from 33 reviews', color: '#ffffff' },
  { name: 'Yelp', icon: 'simple-icons:yelp', href: 'https://www.yelp.com/biz/superior-striping-nampa', note: 'Reviews on Yelp', color: '#d32323' },
  { name: 'Angi', icon: null, href: 'https://www.angi.com/companylist/us/id/nampa/superior-striping-llc-reviews-10941535.htm', note: 'Reviews on Angi', color: '#ff6153' },
  { name: 'HomeAdvisor', icon: 'simple-icons:homeadvisor', href: 'https://www.homeadvisor.com/rated.SuperiorStriping.91076899.html', note: 'Reviews on HomeAdvisor', color: '#f68315' },
  { name: 'Facebook', icon: 'simple-icons:facebook', href: 'https://www.facebook.com/superiorstriping208', note: 'Follow on Facebook', color: '#0866ff' },
  { name: 'Instagram', icon: 'simple-icons:instagram', href: 'https://www.instagram.com/superiorstriping_/', note: '@superiorstriping_', color: '#e1306c' },
] as const;

// Una sola etiqueta para la intención "presupuesto" en todo el sitio
export const cta = { label: 'Get a free estimate', href: '/contact-us/' } as const;
