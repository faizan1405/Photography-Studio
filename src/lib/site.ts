import { r2Url } from "@/lib/image-urls";

export const img = {
  heroPheras: r2Url("hero/pheras"),
  heroVarmala: r2Url("hero/varmala"),
  heroPrewedding: r2Url("hero/prewedding"),
  heroSangeet: r2Url("hero/sangeet"),
  heroMehndi: r2Url("hero/mehndi"),
  heroServices: r2Url("hero/services"),
  heroAbout: r2Url("hero/about"),
  founder: r2Url("founder"),
  pw2: r2Url("pw/2"),
  pw3: r2Url("pw/3"),
  pw4: r2Url("pw/4"),
  pw5: r2Url("pw/5"),
  sg2: r2Url("sg/2"),
  sg3: r2Url("sg/3"),
  sg4: r2Url("sg/4"),
  sg5: r2Url("sg/5"),
  mh2: r2Url("mh/2"),
  mh3: r2Url("mh/3"),
  mh4: r2Url("mh/4"),
  mh5: r2Url("mh/5"),
  wd2: r2Url("wd/2"),
  wd3: r2Url("wd/3"),
  wd4: r2Url("wd/4"),
  wd5: r2Url("wd/5"),
};

export const logo = r2Url("logo");

export const video = {
  heroSection: r2Url("videos/hero-section"),
  preWedding: r2Url("videos/pre-wedding"),
  sangeet: r2Url("videos/sangeet"),
  mehndi: r2Url("videos/mehndi"),
  wedding: r2Url("videos/wedding"),
} as const;

export const brand = {
  name: "Clickographers Wedding Films",
  short: "Clickographers",
  phones: ["9716284428", "8076561746"],
  whatsapp: "919716284428",
  email: "clickographersart@gmail.com",
  address: "C-32A Third Floor, Spectrum Metro Mall, Noida 201301",
};

export const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
] as const;

export const serviceLinks = [
  { label: "Haldi and Mehendi Photoshoots", to: "/mehndi-photoshoots" },
  { label: "Sangeet Photoshoots", to: "/sangeet" },
  { label: "Wedding Photoshoots", to: "/wedding-photography" },
  { label: "Pre Wedding Photoshoots", to: "/pre-wedding" },
] as const;

export const montage = [
  img.heroPheras,
  img.wd2,
  img.pw2,
  img.sg2,
  img.mh2,
  img.heroVarmala,
  img.pw3,
  img.sg3,
  img.mh3,
  img.wd4,
  img.heroPrewedding,
  img.sg4,
  img.mh4,
  img.wd5,
  img.pw4,
  img.heroSangeet,
  img.mh5,
  img.wd3,
  img.pw5,
  img.heroMehndi,
  img.sg5,
  img.heroServices,
];

export type GalleryItem = {
  src: string;
  alt: string;
  category: "Pre Wedding" | "Sangeet" | "Mehndi" | "Wedding Photography";
  tall?: boolean;
};

export const gallery: GalleryItem[] = [
  { src: img.heroPrewedding, alt: "Indian couple walking through a palace courtyard at golden hour", category: "Pre Wedding" },
  { src: img.pw2, alt: "Couple embracing in a mustard field at sunset", category: "Pre Wedding", tall: true },
  { src: img.pw3, alt: "Couple laughing on stone steps beside a lake", category: "Pre Wedding" },
  { src: img.pw4, alt: "Close portrait of a couple with foreheads touching", category: "Pre Wedding", tall: true },
  { src: img.pw5, alt: "Couple on a Jaipur rooftop terrace", category: "Pre Wedding" },
  { src: img.heroSangeet, alt: "Bride and groom dancing on the sangeet stage", category: "Sangeet" },
  { src: img.sg2, alt: "Dancer twirling in a shimmering lehenga on stage", category: "Sangeet", tall: true },
  { src: img.sg3, alt: "Family dancing together under marigold garlands", category: "Sangeet" },
  { src: img.sg4, alt: "Sangeet stage decor with marigold strings and lanterns", category: "Sangeet" },
  { src: img.sg5, alt: "Groom laughing during a family performance", category: "Sangeet", tall: true },
  { src: img.heroMehndi, alt: "Bride having mehndi applied to her hands", category: "Mehndi" },
  { src: img.mh2, alt: "Finished bridal mehndi detail with gold bangles", category: "Mehndi", tall: true },
  { src: img.mh3, alt: "Bride laughing with friends at her mehndi", category: "Mehndi" },
  { src: img.mh4, alt: "Bridal portrait in green and gold with floral jewellery", category: "Mehndi", tall: true },
  { src: img.mh5, alt: "Bridal jewellery and marigold petals flat lay", category: "Mehndi" },
  { src: img.heroVarmala, alt: "Bride and groom exchanging varmala garlands", category: "Wedding Photography" },
  { src: img.wd2, alt: "Bridal portrait in red and gold lehenga", category: "Wedding Photography", tall: true },
  { src: img.wd3, alt: "Groom portrait in ivory sherwani", category: "Wedding Photography", tall: true },
  { src: img.wd4, alt: "Emotional vidaai moment between bride and her mother", category: "Wedding Photography" },
  { src: img.wd5, alt: "Couple walking through a shower of rose petals", category: "Wedding Photography" },
];

/** Preview photograph + label shown in the page-transition frame. */
const pageImages: Record<string, { src: string; label: string }> = {
  "/": { src: img.heroPheras, label: "Home" },
  "/about": { src: img.heroAbout, label: "About" },
  "/services": { src: img.heroServices, label: "Services" },
  "/gallery": { src: img.wd5, label: "Gallery" },
  "/contact": { src: img.heroVarmala, label: "Contact" },
  "/pre-wedding": { src: img.heroPrewedding, label: "Pre Wedding" },
  "/sangeet": { src: img.heroSangeet, label: "Sangeet" },
  "/mehndi-photoshoots": { src: img.heroMehndi, label: "Mehndi" },
  "/wedding-photography": { src: img.heroVarmala, label: "Wedding Photography" },
};

export function pageImage(pathname: string) {
  const key = pathname.length > 1 ? pathname.replace(/\/$/, "") : "/";
  return pageImages[key] ?? pageImages["/"]!;
}