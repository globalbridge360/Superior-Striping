// Catálogo de imágenes del sitio. Cada una lleva:
//  - alt: qué se ve (≤ ~125 caracteres)
//  - description: contexto para <figcaption> y schema ImageObject (trabajo, ciudad)
// Las fotos son trabajos reales de Superior Striping tomados de su librería de medios.
import type { ImageMetadata } from 'astro';

import heroPoster from '../assets/img/hero-poster-new-striped-lot.jpg';
import owner from '../assets/img/owner-scott-mitchell.webp';
import crewTrailer from '../assets/img/crew-trailer-nampa.png';
import crewTeam from '../assets/img/crew-team-trailer.webp';
import blogAda from '../assets/img/blog-ada-stencil-striping.webp';
import blogCrack from '../assets/img/blog-crack-filler-pour.webp';
import blogStriper from '../assets/img/blog-line-striper-wheel.webp';
import contactStriping from '../assets/img/contact-crew-striping-arrow.webp';
import sealcoatCrew from '../assets/img/sealcoat-crew-nampa-lot.webp';
import sealcoatEdge from '../assets/img/sealcoat-edge-curb-nampa.webp';
import lotRestriped from '../assets/img/sealcoated-lot-restriped-boise.webp';
import svcSealcoating from '../assets/img/svc-sealcoating-wand.jpg';
import sealcoatFresh from '../assets/img/svc-sealcoating.webp';
import svcStriping from '../assets/img/svc-striping.webp';
import svcCrack from '../assets/img/svc-crack-filling.webp';
import svcPatching from '../assets/img/svc-patching.jpeg';
import svcBollards from '../assets/img/svc-bollards.webp';
import seasonLot from '../assets/img/season-lot-stall-lines.webp';
import segRetail from '../assets/img/seg-retail-striping-boise.webp';
import segIndustrial from '../assets/img/seg-industrial-eagle.webp';
import segChurch from '../assets/img/seg-church-crosswalk-boise.webp';
import segHoa from '../assets/img/seg-hoa-development.webp';
import caseEagle from '../assets/img/case-eagle-forest-products.webp';
import caseChurch from '../assets/img/case-church-boise.webp';
import caseMaverik from '../assets/img/case-maverik-boise.webp';
import footerLine from '../assets/img/footer-fresh-line.webp';

export interface SiteImage {
  src: ImageMetadata;
  alt: string;
  description: string;
  location?: string;
}

export const images = {
  contactStriping: {
    src: contactStriping,
    alt: 'Superior Striping crew member bent over a fresh parking lot, guiding the line striper next to a new yellow and white arrow',
    description: 'Painting new stall lines and a directional arrow on a freshly paved lot in the Treasure Valley, Idaho.',
    location: 'Treasure Valley, Idaho',
  },
  blogAda: {
    src: blogAda,
    alt: 'Crew member spraying a blue and white ADA accessible parking symbol through a stencil',
    description: 'Painting an ADA parking symbol through a stencil on fresh asphalt in the Treasure Valley, Idaho.',
    location: 'Treasure Valley, Idaho',
  },
  blogCrack: {
    src: blogCrack,
    alt: 'Hot rubberized crack filler being poured into an asphalt crack from a pour pot',
    description: 'Hot-pour crack filler going into a cleaned crack on a parking lot in the Treasure Valley, Idaho.',
    location: 'Treasure Valley, Idaho',
  },
  blogStriper: {
    src: blogStriper,
    alt: 'Line striping machine painting a white stall line on a parking lot',
    description: 'A walk-behind line striper laying down a fresh stall line in the Treasure Valley, Idaho.',
    location: 'Treasure Valley, Idaho',
  },
  heroPoster: {
    src: heroPoster,
    alt: 'Freshly paved parking lot with new white stall lines beside a concrete sidewalk at sunset',
    description: 'A new lot paved and striped by Superior Striping in the Treasure Valley, Idaho.',
    location: 'Treasure Valley, Idaho',
  },
  owner: {
    src: owner,
    alt: 'Scott Mitchell, owner of Superior Striping, on a job site',
    description: 'Scott Mitchell, U.S. veteran and owner of Superior Striping.',
    location: 'Nampa, Idaho',
  },
  crewTeam: {
    src: crewTeam,
    alt: 'Five Superior Striping crew members and their dog in front of the black company trailer',
    description: 'The Superior Striping crew in orange and yellow shirts with the trailer they bring to every job.',
    location: 'Nampa, Idaho',
  },
  crewTrailer: {
    src: crewTrailer,
    alt: 'Superior Striping crew and their dog in front of the company trailer',
    description: 'The Superior Striping crew with the service trailer they bring to every job.',
    location: 'Nampa, Idaho',
  },
  sealcoatCrew: {
    src: sealcoatCrew,
    alt: 'Two crew members spreading black sealcoat with squeegees on a commercial lot',
    description: 'Sealcoat being spread by hand along a commercial lot in Nampa.',
    location: 'Nampa, Idaho',
  },
  sealcoatFresh: {
    src: sealcoatFresh,
    alt: 'Fresh black sealcoat on an asphalt lot, seen from ground level in morning light',
    description: 'A lot the same day it was sealed: the surface is uniform and deep black.',
    location: 'Treasure Valley, Idaho',
  },
  sealcoatEdge: {
    src: sealcoatEdge,
    alt: 'Wet black sealcoat brushed up to the edge of a concrete curb',
    description: 'Edges are cut in by brush so no sealer lands on the concrete. Nampa, Idaho.',
    location: 'Nampa, Idaho',
  },
  lotRestriped: {
    src: lotRestriped,
    alt: 'Freshly sealcoated commercial lot with new white stall lines in Boise',
    description: 'Sealcoated and restriped commercial parking lot in Boise, Idaho.',
    location: 'Boise, Idaho',
  },
  svcSealcoating: {
    src: svcSealcoating,
    alt: 'Superior Striping crew member spraying sealcoat across a commercial parking lot with a long wand',
    description: 'Spraying sealer across the body of a commercial lot after the cracks are filled.',
    location: 'Treasure Valley, Idaho',
  },
  svcStriping: {
    src: svcStriping,
    alt: 'Line striping machine spraying a fresh yellow line on black asphalt',
    description: 'Painting a fresh yellow line on a newly sealed lot in the Treasure Valley.',
    location: 'Boise, Idaho',
  },
  svcCrack: {
    src: svcCrack,
    alt: 'Line of hot rubber crack sealant across a clean asphalt surface',
    description: 'Hot rubber crack fill, applied after the crack is cleaned and blown out.',
    location: 'Boise, Idaho',
  },
  svcPatching: {
    src: svcPatching,
    alt: 'Two crew members raking and setting fresh hot-mix asphalt in a patch',
    description: 'Fresh hot-mix asphalt patch being raked and set in Boise, Idaho.',
    location: 'Boise, Idaho',
  },
  svcBollards: {
    src: svcBollards,
    alt: 'Four yellow steel safety bollards installed along a metal building wall',
    description: 'Steel safety bollards installed to protect a commercial building in the Treasure Valley.',
    location: 'Treasure Valley, Idaho',
  },
  seasonLot: {
    src: seasonLot,
    alt: 'Wide parking lot lined with trees and crisp white stall lines',
    description: 'A sealed and striped lot, ready for the season.',
    location: 'Treasure Valley, Idaho',
  },
  segRetail: {
    src: segRetail,
    alt: 'Crew member on a ride-on striper painting stall lines in front of a retail store',
    description: 'Restriping a retail strip mall lot in Boise.',
    location: 'Boise, Idaho',
  },
  segIndustrial: {
    src: segIndustrial,
    alt: 'Freshly sealcoated commercial lot with new stall lines at an industrial business',
    description: 'Eagle Forest Products: 11,022 sq ft sealcoated with two coats and restriped.',
    location: 'Eagle, Idaho',
  },
  segChurch: {
    src: segChurch,
    alt: 'Yellow hatched crosswalk leading to a church entrance with blue accessible stalls',
    description: 'Crosswalk and stall striping at a church parking lot in Boise.',
    location: 'Boise, Idaho',
  },
  segHoa: {
    src: segHoa,
    alt: 'Aerial view of a new residential development with sealed and striped parking areas',
    description: 'Sealcoating and striping for a new residential development in Idaho.',
    location: 'Treasure Valley, Idaho',
  },
  caseEagle: {
    src: caseEagle,
    alt: 'Sealcoated and restriped commercial parking lot at Eagle Forest Products',
    description: 'Eagle Forest Products, Eagle: two coats of sealer and a full restripe.',
    location: 'Eagle, Idaho',
  },
  caseChurch: {
    src: caseChurch,
    alt: 'Church parking lot with crisp white stall lines and a landscaped island',
    description: 'Church parking lot restriped in Boise, Idaho.',
    location: 'Boise, Idaho',
  },
  caseMaverik: {
    src: caseMaverik,
    alt: 'Roller compacting a fresh asphalt patch next to the fuel pumps at a gas station',
    description: 'Asphalt patch repair at a Maverik gas station in Boise.',
    location: 'Boise, Idaho',
  },
  footerLine: {
    src: footerLine,
    alt: 'Fresh yellow line painted across newly sealed asphalt',
    description: 'A fresh yellow line on newly sealed asphalt.',
    location: 'Treasure Valley, Idaho',
  },
} satisfies Record<string, SiteImage>;
