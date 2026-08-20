import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { stat, readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const FOLDER = "C:/Users/Faiza/Downloads/wedding-/wedding/";
const BUCKET = "website-images";
const R2_PUBLIC = "https://pub-a9ee4b9e6d764ca88dc8d5f3776c28e2.r2.dev";

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

async function main() {
  const allFiles = (await readdir(FOLDER)).filter((f) =>
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  );
  console.log("Total files in folder: " + allFiles.length);

  const shuffled = [...allFiles];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const selected = shuffled.slice(0, 40);

  console.log("\nSelected 40 photos:");
  selected.forEach((f, i) => console.log("  " + (i + 1) + ". " + f));

  console.log("\nLocal file sizes (first 5):");
  for (const f of selected.slice(0, 5)) {
    const s = await stat(join(FOLDER, f));
    console.log("  " + f + ": " + formatBytes(s.size));
  }

  const existing = new Set();
  let continuationToken;
  do {
    const result = await client.send(
      new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: "wedding/",
        MaxKeys: 1000,
        ContinuationToken: continuationToken,
      })
    );
    if (result.Contents) {
      result.Contents.forEach((c) => existing.add(c.Key.replace("wedding/", "")));
    }
    continuationToken = result.IsTruncated ? result.NextContinuationToken : undefined;
  } while (continuationToken);

  console.log("\nAlready on R2 (wedding/): " + existing.size + " files");

  const missing = selected.filter((f) => !existing.has(f));
  console.log("Need to upload: " + missing.length + " files");

  const sharp = await import("sharp").catch(() => null);

  let uploaded = 0;
  for (const file of missing) {
    try {
      const r2Key = "wedding/" + file;
      const localPath = join(FOLDER, file);

      let data, size;
      if (sharp) {
        data = await sharp.default(localPath)
          .resize(1920, null, { withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toBuffer();
        size = data.length;
      } else {
        data = await readFile(localPath);
        size = data.length;
      }

      await client.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: r2Key,
          Body: data,
          ContentType: "image/jpeg",
        })
      );

      const origSize = (await stat(localPath)).size;
      const compressedStr = sharp
        ? " (" + formatBytes(origSize) + " -> " + formatBytes(size) + ")"
        : "";
      console.log("  Uploaded " + file + ": " + formatBytes(size) + compressedStr);
      uploaded++;
    } catch (e) {
      console.error("  FAILED " + file + ": " + e.message);
    }
  }
  console.log("\nUploaded " + uploaded + "/" + missing.length + " files");

  console.log("\n--- ROUTE FILE URLS ---");
  const urls = selected.map((f) => '"' + R2_PUBLIC + "/wedding/" + f + '"');
  console.log("const weddingPhotos = [\n  " + urls.join(",\n  ") + "\n];");
}

main().catch(console.error);
