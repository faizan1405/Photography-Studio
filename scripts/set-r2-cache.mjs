import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";

const R2_BUCKET = "website-images";

const client = new S3Client({
  endpoint: "https://9a1bff720bac191aa5c947f8562c919f.r2.cloudflarestorage.com",
  region: "auto",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

async function main() {
  console.log("R2 Cache Configuration Script\n");
  console.log("This script updates Cache-Control headers on all existing R2 objects.\n");
  console.log("Note: Set Cache-Control on new uploads instead (see optimize-images.mjs).\n");
  console.log("To manually configure cache headers on existing objects, use:");
  console.log(`  aws s3 cp s3://${R2_BUCKET}/ s3://${R2_BUCKET}/ --recursive --cache-control "public, max-age=31536000, immutable" --endpoint-url https://9a1bff720bac191aa5c947f8562c919f.r2.cloudflarestorage.com`);
  console.log("\nRecommended R2 bucket settings (configure in Cloudflare Dashboard):");
  console.log("  - Cache-Control on images: public, max-age=31536000, immutable");
  console.log("  - Enable CORS with max-age=31536000 for cross-origin access");
  console.log("  - Enable gzip/brotli compression for text assets");
  console.log("  - Consider enabling Cloudflare Image Resizing for on-the-fly optimization");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
