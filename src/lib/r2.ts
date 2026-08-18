/**
 * Server-only Cloudflare R2 client.
 *
 * CRITICAL: This file MUST only ever be imported from server-side code
 * (createServerFn handlers, src/server.ts, src/start.ts, etc.).
 * If it gets imported into a client component, the S3 SDK bundle will
 * ship to the browser AND the bucket credentials will be exposed.
 */

import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getR2Client(): S3Client {
  const accountId = getEnv("R2_ACCOUNT_ID");
  const accessKeyId = getEnv("R2_ACCESS_KEY_ID");
  const secretAccessKey = getEnv("R2_SECRET_ACCESS_KEY");

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export function getBucketName(): string {
  return getEnv("R2_BUCKET");
}

export function getPublicBaseUrl(): string {
  const url = getEnv("R2_PUBLIC_BASE_URL");
  return url.replace(/\/$/, "");
}

export interface R2Object {
  key: string;
  size: number;
  lastModified: Date;
}

export async function listBucketObjects(): Promise<R2Object[]> {
  const client = getR2Client();
  const bucket = getBucketName();

  const objects: R2Object[] = [];
  let continuationToken: string | undefined;

  do {
    const response = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        ContinuationToken: continuationToken,
      }),
    );
    if (response.Contents) {
      for (const obj of response.Contents) {
        if (obj.Key && obj.Size !== undefined && obj.LastModified) {
          objects.push({
            key: obj.Key,
            size: obj.Size,
            lastModified: obj.LastModified,
          });
        }
      }
    }
    continuationToken = response.IsTruncated ? response.NextContinuationToken ?? undefined : undefined;
  } while (continuationToken);

  return objects;
}

export function publicUrl(key: string): string {
  return `${getPublicBaseUrl()}/${key}`;
}
