/**
 * Image manifest — no images currently in use.
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

export const KNOWN_KEYS: string[] = [];

export const DEFAULT_MANIFEST: Manifest = { images: [] };
