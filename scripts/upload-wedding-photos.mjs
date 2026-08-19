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
  { local: "c:/Users/Faiza/Downloads/wedding/031A3566.jpg", key: "wd/1" },
  { local: "c:/Users/Faiza/Downloads/wedding/031A3617.jpg", key: "wd/2" },
  { local: "c:/Users/Faiza/Downloads/wedding/DSC00217.jpg", key: "wd/3" },
  { local: "c:/Users/Faiza/Downloads/wedding/DSC01798.jpg", key: "wd/4" },
  { local: "c:/Users/Faiza/Downloads/wedding/DSC05986 new.jpg", key: "wd/5" },
  { local: "c:/Users/Faiza/Downloads/wedding/DSC06236.jpg", key: "wd/6" },
  { local: "c:/Users/Faiza/Downloads/wedding/DSC06739.jpg", key: "wd/7" },
  { local: "c:/Users/Faiza/Downloads/wedding/DSC07031.jpg", key: "wd/8" },
  { local: "c:/Users/Faiza/Downloads/wedding/DSC07245.jpg", key: "wd/9" },
  { local: "c:/Users/Faiza/Downloads/wedding/DSC07655.jpg", key: "wd/10" },
  { local: "c:/Users/Faiza/Downloads/wedding/IMG_0181.jpg", key: "wd/11" },
  { local: "c:/Users/Faiza/Downloads/wedding/IMG_2963.jpg", key: "wd/12" },
  { local: "c:/Users/Faiza/Downloads/wedding/IMG_9592.jpg", key: "wd/13" },
  { local: "c:/Users/Faiza/Downloads/wedding/_MG_9630.jpg", key: "wd/14" },
  { local: "c:/Users/Faiza/Downloads/wedding/_MG_9688.jpg", key: "wd/15" },
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
  console.log(`Compressing and uploading ${photos.length} wedding photos to R2 bucket: ${BUCKET}\n`);
  for (const photo of photos) {
    await compressAndUpload(photo);
  }
  console.log("\nAll done!");
  process.exit(0);
})();
