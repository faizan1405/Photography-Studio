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
  { local: "c:/Users/Faiza/Downloads/pre wedding (1)/DSC_0746.jpg", key: "pw/11" },
  { local: "c:/Users/Faiza/Downloads/pre wedding (1)/DSC_0791.jpg", key: "pw/12" },
  { local: "c:/Users/Faiza/Downloads/pre wedding (1)/DSC_0836.jpg", key: "pw/13" },
  { local: "c:/Users/Faiza/Downloads/pre wedding (1)/DSC_1145.jpg", key: "pw/14" },
  { local: "c:/Users/Faiza/Downloads/pre wedding (1)/DSC_1399.jpg", key: "pw/15" },
  { local: "c:/Users/Faiza/Downloads/pre wedding (1)/DSC_1499.jpg", key: "pw/16" },
  { local: "c:/Users/Faiza/Downloads/pre wedding (1)/DSC_1542.jpg", key: "pw/17" },
  { local: "c:/Users/Faiza/Downloads/pre wedding (1)/_MG_0381.jpg", key: "pw/18" },
  { local: "c:/Users/Faiza/Downloads/pre wedding (1)/_MG_0419.jpg", key: "pw/19" },
  { local: "c:/Users/Faiza/Downloads/pre wedding (1)/_MG_0435.jpg", key: "pw/20" },
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
  console.log(`Compressing and uploading ${photos.length} pre-wedding photos to R2 bucket: ${BUCKET}\n`);
  for (const photo of photos) {
    await compressAndUpload(photo);
  }
  console.log("\nAll done!");
  process.exit(0);
})();