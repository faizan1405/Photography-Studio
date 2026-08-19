import { readFileSync, existsSync } from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

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
  { local: "c:/Users/Faiza/Downloads/ring/DSC01224 edit.jpg", key: "rg/1" },
  { local: "c:/Users/Faiza/Downloads/ring/DSC01340.jpg", key: "rg/2" },
  { local: "c:/Users/Faiza/Downloads/ring/DSC01390.jpg", key: "rg/3" },
  { local: "c:/Users/Faiza/Downloads/ring/DSC03023.jpg", key: "rg/4" },
  { local: "c:/Users/Faiza/Downloads/ring/DSC03037.jpg", key: "rg/5" },
  { local: "c:/Users/Faiza/Downloads/ring/DSC03675.jpg", key: "rg/6" },
  { local: "c:/Users/Faiza/Downloads/ring/DSC08464.jpg", key: "rg/7" },
  { local: "c:/Users/Faiza/Downloads/ring/DSC08691.jpg", key: "rg/8" },
  { local: "c:/Users/Faiza/Downloads/ring/DSC08859.jpg", key: "rg/9" },
  { local: "c:/Users/Faiza/Downloads/ring/IMG_9497.jpg", key: "rg/10" },
];

async function compressAndUpload(photo) {
  try {
    const originalBuffer = readFileSync(photo.local);
    const originalSizeKB = (originalBuffer.length / 1024).toFixed(1);

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

    console.log(`OK ${photo.key} (${originalSizeKB} KB -> ${compressedSizeKB} KB, -${ratio}%)`);
  } catch (err) {
    console.error(`FAIL ${photo.key}: ${err.message}`);
  }
}

(async () => {
  console.log(`Compressing and uploading ${photos.length} ring ceremony photos to R2 bucket: ${BUCKET}\n`);
  for (const photo of photos) {
    await compressAndUpload(photo);
  }
  console.log("\nAll done!");
  process.exit(0);
})();