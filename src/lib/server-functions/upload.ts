/**
 * Server-only upload endpoint.
 *
 * This file is compiled by TanStack Start into a server-side API handler.
 * It is NEVER shipped to the browser.
 *
 * All R2 write operations require admin authentication (enforced server-side).
 */

import { createServerFn } from "@tanstack/react-start";
import { getR2Client, getBucketName, publicUrl } from "@/lib/r2";
import { requireAuth } from "@/lib/auth";
import { PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function sanitizeSegment(segment: string): string {
  return segment.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function generateObjectKey(category: string, filename: string, index?: number): string {
  const cat = sanitizeSegment(category) || "misc";
  const name = sanitizeSegment(filename.replace(/\.[^.]+$/, ""));
  const unique = Date.now().toString(36);
  const suffix = index !== undefined ? `-${index + 1}` : "";
  return `${cat}/${name}${suffix}-${unique}`;
}

function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.has(file.type)) {
    return `Unsupported file type: ${file.type}. Allowed: JPEG, PNG, WebP, GIF.`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return `File too large: ${(file.size / 1024 / 1024).toFixed(1)} MB. Max: 10 MB.`;
  }
  return null;
}

function getHeaders(headers: Record<string, string | string[] | undefined>): Headers {
  const result = new Headers();
  for (const [key, value] of Object.entries(headers)) {
    if (typeof value === "string") result.set(key, value);
    else if (Array.isArray(value)) value.forEach((v) => result.append(key, v));
  }
  return result;
}

// TanStack Start serverFn handlers receive a context object whose `event` property
// is not publicly typed, but it's available at runtime via the Nitro/N3 runtime.
// We cast to `any` to bypass the incomplete public type.

function getAuthHeaders(ctx: any): Headers {
  return getHeaders(ctx.event.node.req.headers);
}

function getAuthHeadersAndRes(ctx: any): [Headers, { setHeader(name: string, value: string): void }] {
  const headers = getHeaders(ctx.event.node.req.headers);
  return [headers, ctx.event.node.res];
}

export const uploadImage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    if (typeof input !== "object" || input === null) {
      throw new Error("Invalid input");
    }
    const { file, category, index } = input as {
      file?: File;
      category?: string;
      index?: number;
    };
    if (!(file instanceof File)) throw new Error("file is required");
    if (typeof category !== "string" || category.length > 100) throw new Error("category is required");
    return { file, category, index: typeof index === "number" ? index : undefined };
  })
  .handler(async (ctx) => {
    const { data } = ctx;
    const headers = getAuthHeaders(ctx);
    await requireAuth(headers);

    const { file, category, index } = data as { file: File; category: string; index?: number };
    const error = validateFile(file);
    if (error) return { success: false as const, error };

    const key = generateObjectKey(category, file.name, index);
    const bucket = getBucketName();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const client = getR2Client();
    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );

    return { success: true as const, key, url: publicUrl(key), size: file.size, contentType: file.type };
  });

export const listImages = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const headers = getAuthHeaders(ctx);
    requireAuth(headers);
    const client = getR2Client();
    const bucket = getBucketName();
    const objects = await import("@/lib/r2").then((m) => m.listBucketObjects());
    return {
      images: objects.map((o) => ({
        key: o.key,
        url: publicUrl(o.key),
        size: o.size,
        lastModified: o.lastModified.toISOString(),
      })),
    };
  });

export const checkImageExists = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    if (typeof input !== "object" || input === null) throw new Error("Invalid input");
    const { key } = input as { key?: string };
    if (typeof key !== "string") throw new Error("key is required");
    return { key };
  })
  .handler(async (ctx) => {
    const { data } = ctx;
    const headers = getAuthHeaders(ctx);
    await requireAuth(headers);
    const client = getR2Client();
    const bucket = getBucketName();
    try {
      await client.send(new HeadObjectCommand({ Bucket: bucket, Key: data.key }));
      return { exists: true };
    } catch {
      return { exists: false };
    }
  });
