/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPPORT_WHATSAPP: string;
  readonly GEMINI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
