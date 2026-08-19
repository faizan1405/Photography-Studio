/**
 * Image manifest — stable keys → metadata for every image on the site.
 *
 * This replaces Vite static imports. Instead of bundling images into the
 * build, the site references them by stable string keys and the
 * corresponding public R2 URLs are resolved here.
 *
 * In production the manifest is populated from R2 (see refreshFromR2 below).
 * During initial migration, the expected keys are declared here so the
 * rest of the site can reference them before the bucket is fully populated.
 */

export interface ImageMeta {
  key: string;
  alt: string;
  category?: string;
  tall?: boolean;
}

export interface Manifest {
  images: ImageMeta[];
}

/**
 * Known image keys expected in the R2 bucket after migration.
 * Upload these to R2 with exactly these keys.
 */
export const KNOWN_KEYS = [
  // Hero images
  "hero/pheras",
  "hero/varmala",
  "hero/prewedding",
  "hero/sangeet",
  "hero/mehndi",
  "hero/services",
  "hero/about",
  // Founder
  "founder",
  // Logo
  "logo",
  // Pre Wedding
  "pw/2",
  "pw/3",
  "pw/4",
  "pw/5",
  "pw/6",
  "pw/7",
  "pw/8",
  "pw/9",
  "pw/10",
  "pw/11",
  "pw/12",
  "pw/13",
  "pw/14",
  "pw/15",
  "pw/16",
  "pw/17",
  "pw/18",
  "pw/19",
  "pw/20",
  // Sangeet
  "sg/2",
  "sg/3",
  "sg/4",
  "sg/5",
  // Mehndi
  "mh/1",
  "mh/2",
  "mh/3",
  "mh/4",
  "mh/5",
  "mh/6",
  "mh/7",
  "mh/8",
  "mh/9",
  "mh/10",
  "mh/11",
  "mh/12",
  "mh/13",
  "mh/14",
  "mh/15",
  "mh/16",
  "mh/17",
  // Wedding
  "wd/1",
  "wd/2",
  "wd/3",
  "wd/4",
  "wd/5",
  "wd/6",
  "wd/7",
  "wd/8",
  "wd/9",
  "wd/10",
  "wd/11",
  "wd/12",
  "wd/13",
  "wd/14",
  "wd/15",
  // Ring Ceremony
  "rg/1",
  "rg/2",
  "rg/3",
  "rg/4",
  "rg/5",
  "rg/6",
  "rg/7",
  "rg/8",
  "rg/9",
  "rg/10",
] as const;

export const DEFAULT_MANIFEST: Manifest = {
  images: [
    // Hero
    { key: "hero/pheras", alt: "Indian bride and groom performing pheras around the sacred fire", category: "Wedding Photography" },
    { key: "hero/varmala", alt: "Bride and groom exchanging varmala garlands", category: "Wedding Photography" },
    { key: "hero/prewedding", alt: "Indian couple walking through a palace courtyard at golden hour", category: "Pre Wedding" },
    { key: "hero/sangeet", alt: "Bride and groom dancing on the sangeet stage", category: "Sangeet" },
    { key: "hero/mehndi", alt: "Bride having mehndi applied to her hands", category: "Mehndi" },
    { key: "hero/services", alt: "Grand Indian wedding celebration scene", category: "Wedding Photography" },
    { key: "hero/about", alt: "Professional Indian wedding photography behind the scenes", category: "Wedding Photography" },
    // Founder
    { key: "founder", alt: "Founder of Clickographers Wedding Films" },
    // Logo
    { key: "logo", alt: "Clickographers Wedding Films logo" },
    // Pre Wedding
    { key: "pw/2", alt: "Couple embracing in a mustard field at sunset", category: "Pre Wedding", tall: true },
    { key: "pw/3", alt: "Couple laughing on stone steps beside a lake", category: "Pre Wedding" },
    { key: "pw/4", alt: "Close portrait of a couple with foreheads touching", category: "Pre Wedding", tall: true },
    { key: "pw/5", alt: "Couple on a Jaipur rooftop terrace", category: "Pre Wedding" },
    { key: "pw/6", alt: "Couple walking hand in hand through a sunlit corridor", category: "Pre Wedding" },
    { key: "pw/7", alt: "Couple sharing a quiet moment by a historic fountain", category: "Pre Wedding", tall: true },
    { key: "pw/8", alt: "Playful couple laughing amidst cascading flower petals", category: "Pre Wedding" },
    { key: "pw/9", alt: "Romantic silhouette of a couple at golden hour", category: "Pre Wedding", tall: true },
    { key: "pw/10", alt: "Couple sitting together on palace steps at dusk", category: "Pre Wedding" },
    { key: "pw/11", alt: "Pre-wedding - couple walking through a heritage monument", category: "Pre Wedding", tall: true },
    { key: "pw/12", alt: "Pre-wedding - couple sharing a candid laugh outdoors", category: "Pre Wedding" },
    { key: "pw/13", alt: "Pre-wedding - couple against a dramatic sunset sky", category: "Pre Wedding", tall: true },
    { key: "pw/14", alt: "Pre-wedding - couple sitting together on heritage steps", category: "Pre Wedding" },
    { key: "pw/15", alt: "Pre-wedding - bride and groom in casual moments", category: "Pre Wedding", tall: true },
    { key: "pw/16", alt: "Pre-wedding - couple walking through lush gardens", category: "Pre Wedding" },
    { key: "pw/17", alt: "Pre-wedding - couple embracing under open sky", category: "Pre Wedding", tall: true },
    { key: "pw/18", alt: "Pre-wedding - couple at a scenic lakeside location", category: "Pre Wedding" },
    { key: "pw/19", alt: "Pre-wedding - bride and groom laughing naturally", category: "Pre Wedding", tall: true },
    { key: "pw/20", alt: "Pre-wedding - couple at a historic fort backdrop", category: "Pre Wedding" },
    // Sangeet
    { key: "sg/2", alt: "Dancer twirling in a shimmering lehenga on stage", category: "Sangeet", tall: true },
    { key: "sg/3", alt: "Family dancing together under marigold garlands", category: "Sangeet" },
    { key: "sg/4", alt: "Sangeet stage decor with marigold strings and lanterns", category: "Sangeet" },
    { key: "sg/5", alt: "Groom laughing during a family performance", category: "Sangeet", tall: true },
    // Mehndi
    { key: "mh/1", alt: "Haldi ceremony - family applying turmeric to the groom", category: "Mehndi" },
    { key: "mh/2", alt: "Finished bridal mehndi detail with gold bangles", category: "Mehndi", tall: true },
    { key: "mh/3", alt: "Bride laughing with friends at her mehndi", category: "Mehndi" },
    { key: "mh/4", alt: "Bridal portrait in green and gold with floral jewellery", category: "Mehndi", tall: true },
    { key: "mh/5", alt: "Bridal jewellery and marigold petals flat lay", category: "Mehndi" },
    { key: "mh/6", alt: "Haldi ceremony - couple playing with turmeric paste", category: "Mehndi" },
    { key: "mh/7", alt: "Family celebrating during the haldi ceremony", category: "Mehndi" },
    { key: "mh/8", alt: "Haldi ceremony - bride with turmeric paste on her face", category: "Mehndi" },
    { key: "mh/9", alt: "Mehndi - intricate henna patterns on bride's hands", category: "Mehndi", tall: true },
    { key: "mh/10", alt: "Haldi - family members applying turmeric to the couple", category: "Mehndi" },
    { key: "mh/11", alt: "Mehndi - bride smiling with decorated hands", category: "Mehndi", tall: true },
    { key: "mh/12", alt: "Haldi - playful moments with friends and family", category: "Mehndi" },
    { key: "mh/13", alt: "Mehndi - close-up of detailed henna designs", category: "Mehndi", tall: true },
    { key: "mh/14", alt: "Haldi - couple laughing during the ceremony", category: "Mehndi" },
    { key: "mh/15", alt: "Haldi - family gathering around the couple", category: "Mehndi", tall: true },
    { key: "mh/16", alt: "Mehndi - bride getting mehndi applied by artist", category: "Mehndi" },
    { key: "mh/17", alt: "Haldi - couple dressed in yellow for the ceremony", category: "Mehndi", tall: true },
    // Wedding
    { key: "wd/1", alt: "Wedding ceremony - couple during the pheras", category: "Wedding Photography" },
    { key: "wd/2", alt: "Bridal portrait in red and gold lehenga", category: "Wedding Photography", tall: true },
    { key: "wd/3", alt: "Groom portrait in ivory sherwani", category: "Wedding Photography", tall: true },
    { key: "wd/4", alt: "Emotional vidaai moment between bride and her mother", category: "Wedding Photography" },
    { key: "wd/5", alt: "Couple walking through a shower of rose petals", category: "Wedding Photography" },
    { key: "wd/6", alt: "Wedding mandap decorated with flowers and lights", category: "Wedding Photography", tall: true },
    { key: "wd/7", alt: "Bride entering the ceremony hall", category: "Wedding Photography" },
    { key: "wd/8", alt: "Groom waiting at the mandap", category: "Wedding Photography" },
    { key: "wd/9", alt: "Couple exchanging rings at the ceremony", category: "Wedding Photography", tall: true },
    { key: "wd/10", alt: "First look moment between bride and groom", category: "Wedding Photography" },
    { key: "wd/11", alt: "Family portrait during the wedding reception", category: "Wedding Photography" },
    { key: "wd/12", alt: "Bride and groom cutting the wedding cake", category: "Wedding Photography", tall: true },
    { key: "wd/13", alt: "Couple's first dance at the reception", category: "Wedding Photography" },
    { key: "wd/14", alt: "Wedding decor - floral mandap and aisle", category: "Wedding Photography" },
    { key: "wd/15", alt: "Couple leaving the venue with sparklers", category: "Wedding Photography", tall: true },
    // Ring Ceremony
    { key: "rg/1", alt: "Ring ceremony - couple exchanging rings", category: "Ring Ceremony", tall: true },
    { key: "rg/2", alt: "Ring ceremony - bride and groom smiling at guests", category: "Ring Ceremony" },
    { key: "rg/3", alt: "Ring ceremony - decorated stage with the couple", category: "Ring Ceremony", tall: true },
    { key: "rg/4", alt: "Ring ceremony - close-up of ring exchange moment", category: "Ring Ceremony" },
    { key: "rg/5", alt: "Ring ceremony - couple posing with family on stage", category: "Ring Ceremony", tall: true },
    { key: "rg/6", alt: "Ring ceremony - groom placing ring on bride's finger", category: "Ring Ceremony" },
    { key: "rg/7", alt: "Ring ceremony - bride and groom portrait with floral decor", category: "Ring Ceremony", tall: true },
    { key: "rg/8", alt: "Ring ceremony - celebration moment with family cheering", category: "Ring Ceremony" },
    { key: "rg/9", alt: "Ring ceremony - couple walking together after the ceremony", category: "Ring Ceremony", tall: true },
    { key: "rg/10", alt: "Ring ceremony - decorative ring tray and floral setup", category: "Ring Ceremony" },
  ],
};
