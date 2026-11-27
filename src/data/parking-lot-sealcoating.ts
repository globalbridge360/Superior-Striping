// Contenido de /parking-lot-sealcoating/. Cada dato sale de kb/01-services/sealcoating.md (marcado como verificado).
// Lo comercial que el dueño aún no confirmó (trabajo por fases, plazos de re-striping, casos) no se publica.

import { illustrations as ill } from './illustrations';

export const included = [
  { text: 'Edges trimmed back and the whole surface wire-broomed' },
  { text: 'Cracks cleaned out and filled with hot rubber.', href: '/crack-filling/', linkLabel: 'Asphalt crack filling' },
  { text: 'The lot blown down to bare asphalt before any sealer' },
  { text: 'Edges cut in by brush, so no sealer lands on the concrete' },
  { text: 'Two sprayed coats of commercial-grade sealer' },
  { text: 'New stall lines once the lot is sealed.', href: '/line-striping/', linkLabel: 'Parking lot striping' },
  { text: 'A 2-year written warranty' },
];

export const steps = [
  { title: 'Scratch out the edges', text: 'Grass and dirt that have crept over the asphalt get cut back, so the sealer reaches the real edge of the parking lot.' },
  { title: 'Broom the surface', text: 'Wire brooms loosen the packed dirt and grit that a blower alone leaves behind.' },
  { title: 'Clean out the cracks', text: 'Every crack is cleared of weeds and debris. Rubber only holds on clean asphalt.' },
  { title: 'Blow the lot off', text: 'Heavy-duty blowers take the parking lot down to bare asphalt, curb to curb.' },
  { title: 'Fill the cracks with hot rubber', text: 'Hot rubber goes into each crack before any sealer, so water stays out of the base.' },
  { title: 'Brush the edges, spray two coats', text: 'We cut in by brush where asphalt meets concrete, then spray the body of the lot. Both coats, on every commercial sealcoating job.' },
];

export const sealer = [
  { art: ill.sealerEmulsion, title: 'Cold-applied asphalt emulsion', text: 'A water-based commercial sealer. It is not hot tar, which is what road crews use for chip seal.' },
  { art: ill.sealerSlate, title: 'Pulverized slate, not sand', text: 'Slate lies flat in the coating. Sand rolls. That is why our sealer is filled with slate.' },
  { art: ill.sealerPlant, title: 'Mixed at the batch plant', text: 'The sealer is dialed in to spec at the plant. It is a different product from the buckets at a hardware store.' },
  { art: ill.sealerCoats, title: 'Two coats, every job', text: 'Plenty of contractors spray a single coat. Two is our standard, and we do not sell three or four.' },
];

export const costColumns = ['Option', 'Ballpark cost', 'When it is the right call'];
export const costRows = [
  ['Sealcoating', 'About $0.25 per sq ft', 'The asphalt is structurally sound and needs protecting'],
  ['Resurfacing (overlay)', 'About $3 per sq ft', 'The surface is worn but the base is still sound'],
  ['Full repave', 'About $4 per sq ft', 'The lot is alligatored or cracked beyond what sealer can do'],
];
export const costFactors = [
  'A dirty surface. Prep is the biggest part of the price.',
  'How many cracks there are, and how deep they run',
  'Grass and dirt grown over the edges',
  'A deep, pitted surface after years without sealer',
];

export const notRight = [
  { text: 'Alligatored or broken-up asphalt. It needs repair first.', href: '/asphalt-patching/', linkLabel: 'Asphalt patching' },
  { text: 'New asphalt. It has to set for 6 months to a year before its first coat.' },
  { text: 'Cold or wet weather. Below about 70°F by day or 40°F overnight, sealer flakes and will not bond.' },
];

export const faq = [
  {
    q: 'How much is sealcoating a parking lot?',
    a: 'Sealcoating runs about $0.25 per square foot, give or take. Every parking lot is quoted after we see it, because a dirty or badly cracked surface takes more prep. For comparison, an overlay is about $3 per square foot and a full repave about $4.',
  },
  {
    q: 'How often should an asphalt parking lot be resealed?',
    a: 'We recommend every 3 to 4 years. Busy lots wear faster and need it sooner. Fresh sealcoat looks its darkest for the first two years and starts to fade in years three and four, which is when the next coat is due.',
  },
  {
    q: 'How long does a parking lot stay closed after sealcoating?',
    a: 'People can walk on the sealer after about 2 hours. Vehicles should stay off for 24 hours so it cures. Shaded areas need a little longer to set up.',
  },
  {
    q: 'Do you re-stripe after sealcoating?',
    a: 'Yes. Sealer covers the old lines, so the lot is striped again after it is sealed. Our crew does both the sealcoating and the striping, so you deal with one contractor.',
  },
  {
    q: 'What is the best time of year to sealcoat a parking lot in Idaho?',
    a: 'Between May 15 and October 15. Sealer needs daytime highs near 70°F and nights no colder than 40°F. In Idaho the overnight low is usually what decides a late-season job. The schedule tends to fill in June, with a lead time of 2 to 3 weeks.',
  },
  {
    q: 'Is there a warranty on commercial sealcoating?',
    a: 'Superior Striping gives a 2-year written warranty. A written warranty is one of the first things to ask any sealcoating contractor for, along with proof of insurance.',
  },
  {
    q: 'Is sealcoating the same as hot tar or chip seal?',
    a: 'No. Chip seal uses hot tar and is a road treatment. We apply a cold, water-based asphalt emulsion that is mixed at the batch plant, and we do not do hot tar or chip seal.',
  },
];
