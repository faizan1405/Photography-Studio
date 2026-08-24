import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { stat, readFile } from "node:fs/promises";
import sharp from "sharp";

const R2_BUCKET = "website-images";
const IMAGE_PATH = "C:/Users/Faizan/Downloads/1122.jpeg";

const client = new S3Client({
  endpoint: "https://9a1bff720bac191aa5c947f8562c919f.r2.cloudflarestorage.com",
  region: "auto",
  credentials: {
    accessKeyId: "aa0eafecd704f64efba591328996e2ec",
    secretAccessKey: "023d565096b30948e869aec7ff030c61b34c4b62300125414d34e595879e1872",
  },
});

function formatBytes(b) {
  if (b > 1024 * 1024) return (b / 1024 / 1024).toFixed(1) + "MB";
  if (b > 1024) return (b / 1024).toFixed(0) + "KB";
  return b + "B";
}

async function objectExists(key) {
  try {
    await client.send(new HeadObjectCommand({ Bucket: R2_BUCKET, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function upload(key, body, contentType) {
  if (await objectExists(key)) {
    console.log(`    = ${key} (exists, skipped)`);
    return;
  }
  await client.send(new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
    CacheControl: "public, max-age=31536000, immutable",
  }));
  console.log(`    ${key} (${formatBytes(body.length)})`);
}

async function main() {
  const statData = await stat(IMAGE_PATH);
  console.log(`Image: ${IMAGE_PATH} (${formatBytes(statData.size)})`);

  const originalBuf = await readFile(IMAGE_PATH);

  const jpgBuf = await sharp(originalBuf)
    .resize(1920, null, { withoutEnlargement: true })
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toBuffer();

  const webpBuf = await sharp(originalBuf)
    .resize(1920, null, { withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  const avifBuf = await sharp(originalBuf)
    .resize(1920, null, { withoutEnlargement: true })
    .avif({ quality: 78 })
    .toBuffer();

  console.log(`\nOptimized sizes:`);
  console.log(`  Original: ${formatBytes(originalBuf.length)}`);
  console.log(`  JPG: ${formatBytes(jpgBuf.length)}`);
  console.log(`  WebP: ${formatBytes(webpBuf.length)}`);
  console.log(`  AVIF: ${formatBytes(avifBuf.length)}`);

  const baseName = "ring/1122";

  console.log(`\nUploading to R2 bucket "${R2_BUCKET}"...`);
  await upload(`${baseName}.jpg`, jpgBuf, "image/jpeg");
  await upload(`${baseName}.webp`, webpBuf, "image/webp");
  await upload(`${baseName}.avif`, avifBuf, "image/avif");

  console.log("\nDone!");
  console.log(`https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev/${baseName}.jpg`);
}

main().catch(console.error);
