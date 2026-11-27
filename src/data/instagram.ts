// Últimos 8 posts de instagram.com/superiorstriping_ (sin los fijados), revisados el 2026-11-24.
// Las miniaturas son capturas de la cuadrícula del perfil. Para que se actualicen solas hay que
// conectar un token de la API de Instagram (cuenta Business/Creator) y reemplazar esta lista en el build.
import type { SiteImage } from './images';
import p1 from '../assets/instagram/DgGXS_FEpWh.png';
import p2 from '../assets/instagram/Df8HdMwBZkZ.png';
import p3 from '../assets/instagram/DfqFUwRBY8Y.png';
import p4 from '../assets/instagram/DfmzGUUhpWi.png';
import p5 from '../assets/instagram/Dfk85aIyy28.png';
import p6 from '../assets/instagram/DfiXrq5j90k.png';
import p7 from '../assets/instagram/DfYCKRdyNWM.png';
import p8 from '../assets/instagram/DfTAkbmve0_.png';

export interface InstagramPost {
  url: string;
  type: 'post' | 'reel';
  caption: string;
  image: SiteImage;
}

const ig = (path: string) => `https://www.instagram.com/superiorstriping_/${path}/`;

export const instagramProfile = 'https://www.instagram.com/superiorstriping_/';
export const instagramHandle = '@superiorstriping_';

export const instagramPosts: InstagramPost[] = [
  {
    url: ig('p/DgGXS_FEpWh'),
    type: 'post',
    caption: 'Before: the old pavement is out and the base is graded. The new asphalt goes down next.',
    image: { src: p1, alt: 'Excavated driveway apron graded to bare base before new asphalt', description: 'Before photo of a driveway apron excavated and graded for new asphalt.', location: 'Treasure Valley, Idaho' },
  },
  {
    url: ig('reel/Df8HdMwBZkZ'),
    type: 'reel',
    caption: 'Word gets around, and apparently, everyone needs us at the same time.',
    image: { src: p2, alt: 'Crew member in an orange shirt working beside a yellow asphalt paver', description: 'Reel: the crew loading an asphalt paver on a busy week.', location: 'Treasure Valley, Idaho' },
  },
  {
    url: ig('reel/DfqFUwRBY8Y'),
    type: 'reel',
    caption: 'Good people, hard work, and plenty to show for it. Proud of the crew behind every job.',
    image: { src: p3, alt: 'Two crew members in orange shirts and straw hats walking across a job site', description: 'Reel: meet the Superior Striping crew.', location: 'Idaho' },
  },
  {
    url: ig('p/DfmzGUUhpWi'),
    type: 'post',
    caption: 'A legacy of service, a nation of gratitude. Happy Veterans Day from our veteran-owned crew.',
    image: { src: p4, alt: 'Veterans Day graphic with an American flag and a saluting soldier', description: 'Veterans Day post from veteran-owned Superior Striping.' },
  },
  {
    url: ig('reel/Dfk85aIyy28'),
    type: 'reel',
    caption: 'There’s no shortage of things to get done this time of year. It’s all about showing up and putting in the work.',
    image: { src: p5, alt: 'Operator in a compact track loader carrying a full bucket of asphalt mix', description: 'Reel: moving hot mix with the track loader.', location: 'Treasure Valley, Idaho' },
  },
  {
    url: ig('p/DfiXrq5j90k'),
    type: 'post',
    caption: 'Ground preparation: rock hauling, spreading and compacting in Nampa, Idaho.',
    image: { src: p6, alt: 'Crew spreading and compacting gravel for a driveway in front of a house in Nampa', description: 'Rock hauling and compacting for a residential driveway in Nampa, Idaho.', location: 'Nampa, Idaho' },
  },
  {
    url: ig('reel/DfYCKRdyNWM'),
    type: 'reel',
    caption: 'A lot goes into getting the surface ready. This is where the paving work takes center stage.',
    image: { src: p7, alt: 'Track loader filling a yellow asphalt paver with hot mix', description: 'Reel: filling the paver for an asphalt paving job.', location: 'Treasure Valley, Idaho' },
  },
  {
    url: ig('reel/DfTAkbmve0_'),
    type: 'reel',
    caption: 'This time of year keeps us moving. Plenty of work to get done and plenty of good days.',
    image: { src: p8, alt: 'Crew member running a plate compactor over fresh gravel beside a vinyl fence', description: 'Reel: compacting gravel for a rock hauling job.', location: 'Treasure Valley, Idaho' },
  },
];
