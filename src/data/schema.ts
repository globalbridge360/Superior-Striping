// JSON-LD compartido. Un solo LocalBusiness con @id; las páginas lo referencian.
import { site, cities } from './site';

export const BUSINESS_ID = `${site.url}/#business`;

export function businessNode(logoUrl: string, imageUrl: string) {
  return {
    '@type': ['LocalBusiness', 'GeneralContractor'],
    '@id': BUSINESS_ID,
    name: site.name,
    url: `${site.url}/`,
    telephone: '+1-208-249-2183',
    logo: logoUrl,
    image: imageUrl,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.street,
      addressLocality: site.city,
      addressRegion: site.region,
      postalCode: site.postalCode,
      addressCountry: 'US',
    },
    areaServed: cities.map((c) => ({ '@type': 'City', name: c.name, sameAs: c.wiki })),
    openingHoursSpecification: site.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.schema,
      opens: h.o,
      closes: h.c,
    })),
    founder: { '@type': 'Person', name: site.owner, jobTitle: 'Owner' },
    sameAs: site.sameAs,
    knowsAbout: [
      'Asphalt sealcoating',
      'Parking lot sealcoating',
      'Parking lot striping',
      'Asphalt crack filling',
      'Asphalt patching',
      'Bollard installation',
    ],
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: `${site.url}/`,
    publisher: { '@id': BUSINESS_ID },
  };
}

export function faqNode(items: { q: string; a: string }[], pageUrl: string) {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}
