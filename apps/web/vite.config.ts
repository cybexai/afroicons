import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// `vite build` → site classique (afroicons.org, AWS Amplify)
// `vite build --mode single` → un seul fichier HTML autonome (aperçu hébergé sur Claude)
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === "single" ? [viteSingleFile()] : [])],
  base: "./",
  build: { outDir: mode === "single" ? "dist-single" : "dist", target: "es2020" },
}));
