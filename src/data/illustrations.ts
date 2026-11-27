// Ilustraciones del nicho generadas con Codex (image_gen) el 2026-11-24, fondo transparente.
// Prompt y originales en ../sitio-assets/ilustraciones/.
import type { SiteImage } from './images';
import striper from '../assets/illustrations/cta-striper.png';
import cones from '../assets/illustrations/cta-cones.png';
import formCone from '../assets/illustrations/form-cone.png';
import sealerEmulsion from '../assets/illustrations/sealer-emulsion.png';
import sealerSlate from '../assets/illustrations/sealer-slate.png';
import sealerPlant from '../assets/illustrations/sealer-batch-plant.png';
import sealerCoats from '../assets/illustrations/sealer-two-coats.png';
import aboutCracks from '../assets/illustrations/about-cracks-first.png';
import optSeal from '../assets/illustrations/opt-sealcoating.png';
import optStripe from '../assets/illustrations/opt-striping.png';
import optCrack from '../assets/illustrations/opt-crack-filling.png';
import optPatch from '../assets/illustrations/opt-patching.png';
import optBollard from '../assets/illustrations/opt-bollards.png';
import optUnsure from '../assets/illustrations/opt-not-sure.png';
import propRetail from '../assets/illustrations/prop-retail.png';
import propIndustrial from '../assets/illustrations/prop-industrial.png';
import propChurch from '../assets/illustrations/prop-church.png';
import propHoa from '../assets/illustrations/prop-hoa.png';
import propDriveway from '../assets/illustrations/prop-driveway.png';
import propOther from '../assets/illustrations/prop-other.png';
import timeAsap from '../assets/illustrations/time-asap.png';
import timeMonth from '../assets/illustrations/time-month.png';
import timeSeason from '../assets/illustrations/time-season.png';
import timePrices from '../assets/illustrations/time-prices.png';
import mapBase from '../assets/illustrations/map-base.png';

const ill = (src: SiteImage['src'], alt: string, description: string): SiteImage => ({ src, alt, description });

export const illustrations = {
  striper: ill(striper, 'Illustration of an orange walk-behind parking lot line striping machine', 'A walk-behind line striping machine.'),
  cones: ill(cones, 'Illustration of three orange traffic cones with reflective bands', 'Traffic cones used to close off sections of a lot while sealer cures.'),
  cone: ill(formCone, 'Illustration of an orange traffic cone with white reflective bands', 'A traffic cone, the first thing our crew sets out on every job.'),
  sealcoating: ill(optSeal, 'Illustration of a squeegee spreading fresh black sealcoat on an asphalt tile', 'Sealcoating: a fresh coat of sealer spread across the asphalt.'),
  striping: ill(optStripe, 'Illustration of white stall lines painted on an asphalt tile', 'Parking lot striping: crisp new stall lines.'),
  crack: ill(optCrack, 'Illustration of hot crack filler poured into a crack in asphalt', 'Crack filling: hot rubberized filler poured into a clean crack.'),
  patching: ill(optPatch, 'Illustration of a pothole next to a fresh asphalt patch and a hand tamper', 'Asphalt repair: a pothole cut out and patched.'),
  bollards: ill(optBollard, 'Illustration of a yellow steel bollard and a concrete parking block', 'Bollards and parking blocks.'),
  unsure: ill(optUnsure, 'Illustration of a traffic cone and a clipboard on an asphalt tile', 'Not sure yet: we walk the lot and tell you what it needs.'),
  base: ill(mapBase, 'Illustration of the Superior Striping shop in Nampa with its black trailer parked beside it', 'Our home base in Nampa, Idaho.'),
  propRetail: ill(propRetail, 'Illustration of a small storefront with an orange striped awning and stall lines', 'Business or retail lot.'),
  propIndustrial: ill(propIndustrial, 'Illustration of a small warehouse with a roll-up door and a pallet', 'Industrial or warehouse lot.'),
  propChurch: ill(propChurch, 'Illustration of a small white church with a steeple', 'Church or school lot.'),
  propHoa: ill(propHoa, 'Illustration of a two-story apartment building with parking stalls', 'HOA or apartment community lot.'),
  propDriveway: ill(propDriveway, 'Illustration of a house with a freshly sealed black driveway', 'Home driveway.'),
  propOther: ill(propOther, 'Illustration of a traffic cone under a blank speech bubble', 'Something else: tell us about it.'),
  timeAsap: ill(timeAsap, 'Illustration of an orange lightning bolt and a traffic cone on an asphalt tile', 'As soon as possible.'),
  timeMonth: ill(timeMonth, 'Illustration of a desk calendar on an asphalt tile', 'Within the next month.'),
  timeSeason: ill(timeSeason, 'Illustration of the sun rising behind a striped asphalt tile', 'Before next season.'),
  timePrices: ill(timePrices, 'Illustration of a paper quote and a pencil on an asphalt tile', 'Just getting prices.'),
  // Página de sealcoating (generadas el 2026-11-25 con PROMPT-sealer.md)
  sealerEmulsion: ill(sealerEmulsion, 'Illustration of an orange drum of black asphalt sealer on an asphalt tile', 'Cold-applied asphalt emulsion sealer.'),
  sealerSlate: ill(sealerSlate, 'Illustration of a pile of pulverized slate with a small orange scoop', 'Pulverized slate, the filler in our sealer.'),
  sealerPlant: ill(sealerPlant, 'Illustration of a small batch plant with two silos and a mixing tank', 'Sealer mixed to spec at the batch plant.'),
  sealerCoats: ill(sealerCoats, 'Illustration of two coats of black sealer on an asphalt tile with a spray wand', 'Two coats of sealer on every job.'),
  cracksFirst: ill(aboutCracks, 'Illustration of a hot-rubber kettle beside a sealed crack on an asphalt tile', 'Cracks filled with hot rubber before any sealer.'),
};
