import { readFileSync, writeFileSync, existsSync } from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

// Read credentials from .env file
const envPath = ".env";
const envContent = existsSync(envPath) ? readFileSync(envPath, "utf-8") : "";

function getEnv(key) {
  const match = envContent.match(new RegExp(`^${key}=(.*)$`, "m"));
  return match ? match[1].trim() : undefined;
}

const ACCOUNT_ID = getEnv("R2_ACCOUNT_ID");
const ACCESS_KEY = getEnv("R2_ACCESS_KEY_ID");
const SECRET_KEY = getEnv("R2_SECRET_ACCESS_KEY");
const BUCKET = getEnv("R2_BUCKET");
const PUBLIC_BASE = getEnv("VITE_R2_PUBLIC_BASE_URL");

if (!ACCOUNT_ID || !ACCESS_KEY || !SECRET_KEY || !BUCKET) {
  console.error("Missing R2 credentials in .env file");
  process.exit(1);
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
});

const photos = [
  { local: "c:/Users/Faiza/Downloads/1.jpg", key: "pw/1", contentType: "image/jpeg" },
  { local: "c:/Users/Faiza/Downloads/2.jpg", key: "pw/2", contentType: "image/jpeg" },
  { local: "c:/Users/Faiza/Downloads/3.jpg", key: "pw/3", contentType: "image/jpeg" },
  { local: "c:/Users/Faiza/Downloads/4.jpg", key: "pw/4", contentType: "image/jpeg" },
];

async function compressAndUpload(photo) {
  try {
    const originalBuffer = readFileSync(photo.local);
    const originalSizeKB = (originalBuffer.length / 1024).toFixed(1);

    // Compress: resize to max 1920px, quality 72, strip metadata
    const compressedBuffer = await sharp(originalBuffer)
      .resize(1920, null, { withoutEnlargement: true, fit: "inside" })
      .jpeg({ quality: 72, mozjpeg: true, progressive: true })
      .toBuffer();

    const compressedSizeKB = (compressedBuffer.length / 1024).toFixed(1);
    const ratio = ((1 - compressedBuffer.length / originalBuffer.length) * 100).toFixed(1);

    await client.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: photo.key,
        Body: compressedBuffer,
        ContentType: "image/jpeg",
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );

    console.log(`OK ${photo.key} compressed (${originalSizeKB} KB -> ${compressedSizeKB} KB, -${ratio}%)`);
    console.log(`   URL: ${PUBLIC_BASE}/${photo.key}`);
  } catch (err) {
    console.error(`FAIL ${photo.key}: ${err.message}`);
  }
}

(async () => {
  console.log(`Compressing and uploading ${photos.length} photos to R2 bucket: ${BUCKET}\n`);
  for (const photo of photos) {
    await compressAndUpload(photo);
  }
  console.log("\nAll done!");
  process.exit(0);
})();
