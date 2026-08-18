/// <reference types="vite/client" />

declare module "*.mp4.asset.json" {
  const value: {
    version: 1;
    asset_id: string;
    project_id: string;
    url: string;
    r2_key: string;
    original_filename: string;
    size: number;
    content_type: string;
    created_at: string;
  };
  export default value;
}

interface ImportMetaEnv {
  readonly VITE_R2_PUBLIC_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
