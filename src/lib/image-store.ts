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
  // Sangeet
  "sg/2",
  "sg/3",
  "sg/4",
  "sg/5",
  // Mehndi
  "mh/2",
  "mh/3",
  "mh/4",
  "mh/5",
  // Wedding
  "wd/2",
  "wd/3",
  "wd/4",
  "wd/5",
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
    // Sangeet
    { key: "sg/2", alt: "Dancer twirling in a shimmering lehenga on stage", category: "Sangeet", tall: true },
    { key: "sg/3", alt: "Family dancing together under marigold garlands", category: "Sangeet" },
    { key: "sg/4", alt: "Sangeet stage decor with marigold strings and lanterns", category: "Sangeet" },
    { key: "sg/5", alt: "Groom laughing during a family performance", category: "Sangeet", tall: true },
    // Mehndi
    { key: "mh/2", alt: "Finished bridal mehndi detail with gold bangles", category: "Mehndi", tall: true },
    { key: "mh/3", alt: "Bride laughing with friends at her mehndi", category: "Mehndi" },
    { key: "mh/4", alt: "Bridal portrait in green and gold with floral jewellery", category: "Mehndi", tall: true },
    { key: "mh/5", alt: "Bridal jewellery and marigold petals flat lay", category: "Mehndi" },
    // Wedding
    { key: "wd/2", alt: "Bridal portrait in red and gold lehenga", category: "Wedding Photography", tall: true },
    { key: "wd/3", alt: "Groom portrait in ivory sherwani", category: "Wedding Photography", tall: true },
    { key: "wd/4", alt: "Emotional vidaai moment between bride and her mother", category: "Wedding Photography" },
    { key: "wd/5", alt: "Couple walking through a shower of rose petals", category: "Wedding Photography" },
  ],
};
