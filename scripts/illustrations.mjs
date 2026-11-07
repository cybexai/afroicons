// Génère src/illustrations.json à partir de scripts/illustrations/*.mjs (une liste de scènes par fichier).
//   node scripts/illustrations.mjs              → src/illustrations.json
//   node scripts/illustrations.mjs --png <dir>  → en plus, un PNG par scène dans <dir> (macOS, pour relire)
//   node scripts/illustrations.mjs --png <dir> --only bureau,marche
import { readdirSync, writeFileSync, mkdirSync, renameSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "scripts/illustrations");
const args = process.argv.slice(2), pi = args.indexOf("--png"), oi = args.indexOf("--only");
const only = oi >= 0 ? args[oi + 1].split(",") : null;
const all = [];
for (const file of readdirSync(dir).filter((f) => f.endsWith(".mjs") && f !== "lib.mjs").sort()) {
  let list;
  try { list = (await import(pathToFileURL(join(dir, file)).href + "?t=" + Date.now())).default; }
  catch (e) { if (!only) throw e; console.warn(`⚠ ${file} ignoré : ${e.message}`); continue; } // avec --only, un fichier en cours d'écriture ailleurs ne bloque pas
  for (const sc of list) {
    if (only && !only.includes(sc.id)) { all.push({ id: sc.id, skip: true }); continue; }
    if (all.some((x) => x.id === sc.id && !x.skip)) throw new Error(`illustration en double : ${sc.id}`);
    const svg = sc.draw();
    if (!/^<svg [^>]*viewBox="0 0 800 600"/.test(svg)) throw new Error(`${sc.id} : le SVG doit faire 800×600`);
    if (/NaN|undefined/.test(svg)) throw new Error(`${sc.id} : valeur invalide dans le SVG (NaN ou undefined)`);
    all.push({ id: sc.id, fr: sc.fr, en: sc.en, tags: sc.tags ?? [], svg, file });
  }
}
// Avec --only, seul le rendu PNG est fait : le JSON n'est écrit qu'avec toutes les scènes.
if (!only) writeFileSync(join(root, "src/illustrations.json"), JSON.stringify(all.map(({ file, ...x }) => x)) + "\n");
console.log(`✔ ${all.length} illustrations → src/illustrations.json (${(JSON.stringify(all).length / 1024).toFixed(0)} Ko)`);

if (pi >= 0) {
  const out = args[pi + 1]; mkdirSync(out, { recursive: true });
  for (const x of all.filter((x) => !x.skip)) {
    const svgFile = join(out, x.id + ".svg");
    writeFileSync(svgFile, x.svg.replace("<svg ", '<svg width="800" height="600" '));
    execFileSync("qlmanage", ["-t", "-s", "1200", "-o", out, svgFile], { stdio: "ignore" });
    renameSync(svgFile + ".png", join(out, x.id + ".png"));
    execFileSync("sips", ["--cropToHeightWidth", "900", "1200", "--cropOffset", "1", "1", join(out, x.id + ".png")], { stdio: "ignore" });
    rmSync(svgFile);
    console.log("  ", join(out, x.id + ".png"));
  }
}
