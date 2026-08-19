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
  { local: "c:/Users/Faiza/Downloads/Haldi & mehndi/DSC00213.jpg", key: "mh/8" },
  { local: "c:/Users/Faiza/Downloads/Haldi & mehndi/DSC00451.jpg", key: "mh/9" },
  { local: "c:/Users/Faiza/Downloads/Haldi & mehndi/DSC00664.jpg", key: "mh/10" },
  { local: "c:/Users/Faiza/Downloads/Haldi & mehndi/DSC01156.jpg", key: "mh/11" },
  { local: "c:/Users/Faiza/Downloads/Haldi & mehndi/DSC01257.jpg", key: "mh/12" },
  { local: "c:/Users/Faiza/Downloads/Haldi & mehndi/DSC01375.jpg", key: "mh/13" },
  { local: "c:/Users/Faiza/Downloads/Haldi & mehndi/DSC01562.jpg", key: "mh/14" },
  { local: "c:/Users/Faiza/Downloads/Haldi & mehndi/DSC01577.jpg", key: "mh/15" },
  { local: "c:/Users/Faiza/Downloads/Haldi & mehndi/IMG_7340.jpg", key: "mh/16" },
  { local: "c:/Users/Faiza/Downloads/Haldi & mehndi/IMG_7425.jpg", key: "mh/17" },
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
  console.log(`Compressing and uploading ${photos.length} haldi/mehndi photos to R2 bucket: ${BUCKET}\n`);
  for (const photo of photos) {
    await compressAndUpload(photo);
  }
  console.log("\nAll done!");
  process.exit(0);
})();