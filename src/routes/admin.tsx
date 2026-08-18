import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Upload, FolderOpen, LogOut, Lock, User, Shield } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { brand } from "@/lib/site";
import { login, logout, checkAuth } from "@/lib/server-functions/auth";
import { listImages, uploadImage } from "@/lib/server-functions/upload";

function LoginForm({
  onSuccess,
  error,
}: {
  onSuccess: () => void;
  error: string | null;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(error);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const result = await login({ data: { username, password } });
      if (result.success) {
        onSuccess();
      } else {
        setErrorMsg(result.error);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      // Rate limit error
      if (message.includes("Too many failed attempts")) {
        setErrorMsg(message);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-md px-5">
      <div className="rounded-[2rem] border border-gold/25 bg-card/80 p-8 shadow-[var(--shadow-editorial)]">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-wine/10">
            <Lock size={24} className="text-wine" />
          </div>
          <h1 className="font-display text-2xl text-wine">Admin Access</h1>
          <p className="text-sm text-muted-foreground">{brand.name} image management</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div>
            <label htmlFor="username" className="mb-2 block text-xs uppercase tracking-[0.2em] text-foreground/70">
              Username
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                disabled={loading}
                placeholder="Enter username"
                className="h-11 w-full rounded-xl border border-gold/30 bg-transparent pl-10 pr-4 text-sm transition-colors focus:border-wine focus:outline-none disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-xs uppercase tracking-[0.2em] text-foreground/70">
              Password
            </label>
            <div className="relative">
              <Shield size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                disabled={loading}
                placeholder="Enter password"
                className="h-11 w-full rounded-xl border border-gold/30 bg-transparent pl-10 pr-4 text-sm transition-colors focus:border-wine focus:outline-none disabled:opacity-50"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-xs text-destructive">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !username || !password}
            className="h-12 w-full rounded-full bg-wine text-[0.72rem] font-medium uppercase tracking-[0.28em] text-cream transition-all duration-500 hover:bg-gold hover:text-wine disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Authenticating…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [images, setImages] = useState<
    { key: string; url: string; size: number; lastModified: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [category, setCategory] = useState("misc");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function loadImages() {
    setLoading(true);
    try {
      const result = await listImages();
      setImages(result.images);
    } catch {
      // If auth fails, logout
      onLogout();
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const result = await uploadImage({ data: { file, category } });
      if (result.success) {
        setUploadSuccess(`Uploaded: ${result.key}`);
        await loadImages();
      } else {
        setUploadError(result.error);
      }
    } catch (err) {
      if (err instanceof Error && "statusCode" in err && err.statusCode === 401) {
        onLogout();
        return;
      }
      setUploadError("Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="mx-auto mt-8 max-w-3xl px-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-wine">Image Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">Upload and manage R2 images</p>
        </div>
        <button
          onClick={async () => {
            await logout();
            onLogout();
          }}
          className="flex items-center gap-2 rounded-full border border-wine/30 px-5 py-2.5 text-[0.62rem] uppercase tracking-[0.22em] text-wine transition-colors hover:bg-wine hover:text-cream"
        >
          <LogOut size={13} /> Logout
        </button>
      </div>

      {/* Upload form */}
      <div className="mt-8 rounded-[2rem] border border-gold/25 bg-card/70 p-8">
        <div className="flex items-center gap-3">
          <Upload size={18} className="text-gold-deep" />
          <h2 className="font-display text-xl text-wine">Upload Image</h2>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleUpload}
            disabled={uploading}
            className="flex-1 rounded-xl border border-gold/30 bg-transparent px-4 py-2.5 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-wine file:px-3 file:py-1.5 file:text-[0.62rem] file:font-medium file:uppercase file:tracking-[0.2em] file:text-cream disabled:opacity-50"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={uploading}
            className="h-[42px] rounded-xl border border-gold/30 bg-transparent px-4 text-sm text-foreground disabled:opacity-50"
          >
            <option value="misc">Misc</option>
            <option value="hero">Hero</option>
            <option value="pw">Pre Wedding</option>
            <option value="sg">Sangeet</option>
            <option value="mh">Mehndi</option>
            <option value="wd">Wedding</option>
          </select>
        </div>

        {uploadSuccess && (
          <p className="mt-3 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-xs text-green-600">
            {uploadSuccess}
          </p>
        )}
        {uploadError && (
          <p className="mt-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-xs text-destructive">
            {uploadError}
          </p>
        )}

        <p className="mt-3 text-[0.7rem] text-muted-foreground">
          Max 10 MB. Supported: JPEG, PNG, WebP, GIF.
        </p>
      </div>

      {/* Image list */}
      <div className="mt-8 rounded-[2rem] border border-gold/25 bg-card/70 p-8">
        <div className="flex items-center gap-3">
          <FolderOpen size={18} className="text-gold-deep" />
          <h2 className="font-display text-xl text-wine">Images ({images.length})</h2>
        </div>

        {loading ? (
          <p className="mt-6 text-sm text-muted-foreground">Loading…</p>
        ) : images.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">No images uploaded yet.</p>
        ) : (
          <div className="mt-6 max-h-[60vh] overflow-auto rounded-xl border border-gold/15">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-card/90 text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Key</th>
                  <th className="px-4 py-3 font-medium">Size</th>
                  <th className="px-4 py-3 font-medium">Last Modified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/10">
                {images.map((img) => (
                  <tr key={img.key} className="transition-colors hover:bg-white/30">
                    <td className="max-w-[300px] truncate px-4 py-2.5 font-mono text-[0.7rem] text-foreground/80">
                      {img.key}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {(img.size / 1024).toFixed(1)} KB
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {new Date(img.lastModified).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAuth().then((result) => {
      setAuthed(result.authenticated);
      setChecking(false);
    });
  }, []);

  if (checking) {
    return (
      <PageShell floral="mixed" panels={3}>
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell floral="mixed" panels={3}>
      {authed ? (
        <AdminDashboard
          onLogout={() => {
            setAuthed(false);
          }}
        />
      ) : (
        <LoginForm
          onSuccess={() => setAuthed(true)}
          error={null}
        />
      )}
    </PageShell>
  );
}

// @ts-ignore — routeTree.gen.ts will be regenerated after adding this route
export const Route = createFileRoute("/admin")({
  component: AdminPage,
});
