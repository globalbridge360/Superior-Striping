// Posts del blog actual (superior-striping.com) que se destacan en la home.
// Títulos, fechas y autores tomados de cada post publicado; las URLs son las finales del rediseño
// (los posts viven en la raíz, ver ../rediseno/sitemap-final.md). El primero es el destacado.
import { images, type SiteImage } from './images';

export interface PostCard {
  title: string;
  href: string;
  date: string; // ISO
  author: 'Scott Mitchell' | 'Superior Striping';
  excerpt: string;
  image: SiteImage;
}

export const featuredPosts: PostCard[] = [
  {
    title: 'How to choose a line striping company',
    href: '/how-to-choose-line-striping-company/',
    date: '2026-10-26',
    author: 'Scott Mitchell',
    excerpt:
      'Compare what each company proposes for your lot, look at jobs they have finished and get the terms in writing. These are the questions to ask before you approve a quote.',
    image: images.blogAda,
  },
  {
    title: 'Does my Boise parking lot need patching or crack filling?',
    href: '/asphalt-patching-vs-crack-filling-boise-id/',
    date: '2026-10-17',
    author: 'Scott Mitchell',
    excerpt: 'Crack filling is for single cracks. Patching is for failed sections like potholes, broken edges and sunken spots.',
    image: images.blogCrack,
  },
  {
    title: 'What happens if it rains after sealcoating your driveway?',
    href: '/rain-after-driveway-sealcoating-idaho/',
    date: '2026-06-13',
    author: 'Superior Striping',
    excerpt: 'A storm rolls off the Boise foothills right after your driveway is sealed. Here is what happens to the sealer.',
    image: images.sealcoatEdge,
  },
  {
    title: 'What affects how long parking lot striping lasts?',
    href: '/what-affects-parking-lot-line-striping-longevity-treasure-valley/',
    date: '2026-06-12',
    author: 'Superior Striping',
    excerpt: 'Snowplows and July sun both wear down lot paint. What decides how long your stripes hold up in the valley.',
    image: images.blogStriper,
  },
];
