import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import { readFileSync } from "node:fs";

// La version affichée sur le site vient de package.json : elle suit toujours celle publiée sur npm.
const { version } = JSON.parse(readFileSync(new URL("../../package.json", import.meta.url), "utf8"));

// `vite build` → site classique (afroicons.org, AWS Amplify)
// `vite build --mode single` → un seul fichier HTML autonome (aperçu hébergé sur Claude)
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === "single" ? [viteSingleFile()] : [])],
  base: "./",
  define: { __AFROICONS_VERSION__: JSON.stringify(version) },
  build: { outDir: mode === "single" ? "dist-single" : "dist", target: "es2020" },
}));
