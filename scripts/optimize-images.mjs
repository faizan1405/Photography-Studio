import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { stat, readdir } from "node:fs/promises";
import { join, basename, extname } from "node:path";
import sharp from "sharp";

const R2_BUCKET = "website-images";

const client = new S3Client({
  endpoint: "https://9a1bff720bac191aa5c947f8562c919f.r2.cloudflarestorage.com",
  region: "auto",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const WIDTHS = [800, 1200, 1600];
const THUMB_WIDTHS = [400, 600, 800];
const JPG_QUALITY = 80;
const WEBP_QUALITY = 82;
const AVIF_QUALITY = 78;
const CACHE_CONTROL = "public, max-age=31536000, immutable";

function formatBytes(b: number): string {
  if (b > 1024 * 1024) return (b / 1024 / 1024).toFixed(1) + "MB";
  if (b > 1024) return (b / 1024).toFixed(0) + "KB";
  return b + "B";
}

function isThumb(relPath: string): boolean {
  const name = basename(relPath, extname(relPath)).toLowerCase();
  return /^(mh|pw|sg|wd)\d|^hero-|^logo/.test(name);
}

async function objectExists(key: string): Promise<boolean> {
  try {
    await client.send(new HeadObjectCommand({ Bucket: R2_BUCKET, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function uploadIfMissing(key: string, body: Buffer, contentType: string) {
  if (await objectExists(key)) {
    console.log(`    = ${key} (exists, skipped)`);
    return;
  }
  await client.send(new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
    CacheControl: CACHE_CONTROL,
  }));
  console.log(`    ✓ ${key} (${formatBytes(body.length)})`);
}

async function processImage(relPath: string, fullPath: string) {
  const base = relPath.replace(/\.[^.]+$/, "");
  const widths = isThumb(relPath) ? THUMB_WIDTHS : WIDTHS;
  const img = sharp(fullPath);

  for (const w of widths) {
    // JPG
    const jpgBuf = await img.clone().resize(w, null, { withoutEnlargement: true }).jpeg({ quality: JPG_QUALITY }).toBuffer();
    await uploadIfMissing(`optimized/${base}.${w}w.jpg`, jpgBuf, "image/jpeg");

    // WebP
    const webpBuf = await img.clone().resize(w, null, { withoutEnlargement: true }).webp({ quality: WEBP_QUALITY }).toBuffer();
    await uploadIfMissing(`optimized/${base}.${w}w.webp`, webpBuf, "image/webp");

    // AVIF
    const avifBuf = await img.clone().resize(w, null, { withoutEnlargement: true }).avif({ quality: AVIF_QUALITY }).toBuffer();
    await uploadIfMissing(`optimized/${base}.${w}w.avif`, avifBuf, "image/avif");
  }
}

async function walk(dir: string, folder: string): Promise<string[]> {
  const results: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relPath = folder ? `${folder}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results.push(...(await walk(fullPath, `${folder}/${entry.name}`)));
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
      results.push(relPath);
    }
  }
  return results;
}

async function main() {
  const baseDir = "c:/Users/Faiza/Downloads/clicko-magic-studio-main";

  // Walk the directories that contain images
  const dirsToWalk = [
    "public/pre-wedding",
    "public/ring",
    "public/assets/haldi-mehendi",
    "src/assets",
  ];

  let allImages: { relPath: string; fullPath: string }[] = [];

  for (const dir of dirsToWalk) {
    const fullDir = join(baseDir, dir);
    const relPaths = await walk(fullDir, dir.replace(/^public\//, "").replace(/^src\//, ""));
    for (const relPath of relPaths) {
      allImages.push({ relPath, fullPath: join(fullDir, basename(relPath)) });
    }
  }

  // Add individual files from src/assets that aren't in subdirectories
  const individualSrcFiles = [
    "src/assets/hero-about.jpg",
    "src/assets/hero-mehndi.jpg",
    "src/assets/hero-pheras.jpg",
    "src/assets/hero-prewedding.jpg",
    "src/assets/hero-sangeet.jpg",
    "src/assets/hero-services.jpg",
    "src/assets/hero-varmala.jpg",
    "src/assets/founder.jpg",
    "src/assets/logo.png",
    "src/assets/mh2.jpg", "src/assets/mh3.jpg", "src/assets/mh4.jpg", "src/assets/mh5.jpg",
    "src/assets/pw2.jpg", "src/assets/pw3.jpg", "src/assets/pw4.jpg", "src/assets/pw5.jpg",
    "src/assets/sg2.jpg", "src/assets/sg3.jpg", "src/assets/sg4.jpg", "src/assets/sg5.jpg",
    "src/assets/wd2.jpg", "src/assets/wd3.jpg", "src/assets/wd4.jpg", "src/assets/wd5.jpg",
  ];

  for (const f of individualSrcFiles) {
    const fullPath = join(baseDir, f);
    const relPath = f.replace(/^src\//, "");
    const s = await stat(fullPath).catch(() => null);
    if (s && s.size > 0) {
      allImages.push({ relPath, fullPath });
    }
  }

  // Deduplicate by relPath
  const seen = new Set<string>();
  const unique = allImages.filter(({ relPath }) => {
    if (seen.has(relPath)) return false;
    seen.add(relPath);
    return true;
  });

  console.log(`Found ${unique.length} source images to optimize\n`);

  let processed = 0;
  const startTime = Date.now();

  for (const { relPath, fullPath } of unique) {
    const s = await stat(fullPath);
    processed++;
    console.log(`\n[${processed}/${unique.length}] ${relPath} (${formatBytes(s.size)})`);
    try {
      await processImage(relPath, fullPath);
    } catch (err) {
      console.error(`  ✗ FAILED: ${(err as Error).message}`);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n\nDone! Processed ${processed} images in ${elapsed}s`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
