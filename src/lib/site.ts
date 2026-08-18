import heroPheras from "@/assets/hero-pheras.jpg";
import heroVarmala from "@/assets/hero-varmala.jpg";
import heroPrewedding from "@/assets/hero-prewedding.jpg";
import heroSangeet from "@/assets/hero-sangeet.jpg";
import heroMehndi from "@/assets/hero-mehndi.jpg";
import heroServices from "@/assets/hero-services.jpg";
import heroAbout from "@/assets/hero-about.jpg";
import founder from "@/assets/founder.jpg";
import pw2 from "@/assets/pw2.jpg";
import pw3 from "@/assets/pw3.jpg";
import pw4 from "@/assets/pw4.jpg";
import pw5 from "@/assets/pw5.jpg";
import sg2 from "@/assets/sg2.jpg";
import sg3 from "@/assets/sg3.jpg";
import sg4 from "@/assets/sg4.jpg";
import sg5 from "@/assets/sg5.jpg";
import mh2 from "@/assets/mh2.jpg";
import mh3 from "@/assets/mh3.jpg";
import mh4 from "@/assets/mh4.jpg";
import mh5 from "@/assets/mh5.jpg";
import wd2 from "@/assets/wd2.jpg";
import wd3 from "@/assets/wd3.jpg";
import wd4 from "@/assets/wd4.jpg";
import wd5 from "@/assets/wd5.jpg";

export const img = {
  heroPheras,
  heroVarmala,
  heroPrewedding,
  heroSangeet,
  heroMehndi,
  heroServices,
  heroAbout,
  founder,
  pw2,
  pw3,
  pw4,
  pw5,
  sg2,
  sg3,
  sg4,
  sg5,
  mh2,
  mh3,
  mh4,
  mh5,
  wd2,
  wd3,
  wd4,
  wd5,
};

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
  heroPheras,
  wd2,
  pw2,
  sg2,
  mh2,
  heroVarmala,
  pw3,
  sg3,
  mh3,
  wd4,
  heroPrewedding,
  sg4,
  mh4,
  wd5,
  pw4,
  heroSangeet,
  mh5,
  wd3,
  pw5,
  heroMehndi,
  sg5,
  heroServices,
];

export type GalleryItem = {
  src: string;
  alt: string;
  category: "Pre Wedding" | "Sangeet" | "Mehndi" | "Wedding Photography";
  tall?: boolean;
};

export const gallery: GalleryItem[] = [
  { src: heroPrewedding, alt: "Indian couple walking through a palace courtyard at golden hour", category: "Pre Wedding" },
  { src: pw2, alt: "Couple embracing in a mustard field at sunset", category: "Pre Wedding", tall: true },
  { src: pw3, alt: "Couple laughing on stone steps beside a lake", category: "Pre Wedding" },
  { src: pw4, alt: "Close portrait of a couple with foreheads touching", category: "Pre Wedding", tall: true },
  { src: pw5, alt: "Couple on a Jaipur rooftop terrace", category: "Pre Wedding" },
  { src: heroSangeet, alt: "Bride and groom dancing on the sangeet stage", category: "Sangeet" },
  { src: sg2, alt: "Dancer twirling in a shimmering lehenga on stage", category: "Sangeet", tall: true },
  { src: sg3, alt: "Family dancing together under marigold garlands", category: "Sangeet" },
  { src: sg4, alt: "Sangeet stage decor with marigold strings and lanterns", category: "Sangeet" },
  { src: sg5, alt: "Groom laughing during a family performance", category: "Sangeet", tall: true },
  { src: heroMehndi, alt: "Bride having mehndi applied to her hands", category: "Mehndi" },
  { src: mh2, alt: "Finished bridal mehndi detail with gold bangles", category: "Mehndi", tall: true },
  { src: mh3, alt: "Bride laughing with friends at her mehndi", category: "Mehndi" },
  { src: mh4, alt: "Bridal portrait in green and gold with floral jewellery", category: "Mehndi", tall: true },
  { src: mh5, alt: "Bridal jewellery and marigold petals flat lay", category: "Mehndi" },
  { src: heroVarmala, alt: "Bride and groom exchanging varmala garlands", category: "Wedding Photography" },
  { src: wd2, alt: "Bridal portrait in red and gold lehenga", category: "Wedding Photography", tall: true },
  { src: wd3, alt: "Groom portrait in ivory sherwani", category: "Wedding Photography", tall: true },
  { src: wd4, alt: "Emotional vidaai moment between bride and her mother", category: "Wedding Photography" },
  { src: wd5, alt: "Couple walking through a shower of rose petals", category: "Wedding Photography" },
];

/** Preview photograph + label shown in the page-transition frame. */
const pageImages: Record<string, { src: string; label: string }> = {
  "/": { src: heroPheras, label: "Home" },
  "/about": { src: heroAbout, label: "About" },
  "/services": { src: heroServices, label: "Services" },
  "/gallery": { src: wd5, label: "Gallery" },
  "/contact": { src: heroVarmala, label: "Contact" },
  "/pre-wedding": { src: heroPrewedding, label: "Pre Wedding" },
  "/sangeet": { src: heroSangeet, label: "Sangeet" },
  "/mehndi-photoshoots": { src: heroMehndi, label: "Mehndi" },
  "/wedding-photography": { src: heroVarmala, label: "Wedding Photography" },
};

export function pageImage(pathname: string) {
  const key = pathname.length > 1 ? pathname.replace(/\/$/, "") : "/";
  return pageImages[key] ?? pageImages["/"]!;
}
