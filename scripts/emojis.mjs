// Génère src/emojis.json à partir des dessins de scripts/emojis/*.mjs.
//
//   node scripts/emojis.mjs            → assemble et vérifie
//   node scripts/emojis.mjs --sheet    → écrit aussi une planche de contrôle (emojis-planche.html, à la racine)
//
// Chaque fichier exporte par défaut une liste d'entrées :
//   { slug, fr, en, char, group, tags, tone, body }
// - slug : identifiant en français, minuscules et tirets (« visage-souriant ») ; l'id final est « emoji-<slug> »
// - char : l'emoji Unicode équivalent (« 😀 »), ou null pour un emoji africain original
// - group : visages, mains, personnes, coeurs, animaux, nature, fruits (fruits et légumes), nourriture, boissons, objets, lieux (villages et architectures)
// - tone : true si le dessin utilise la peau (SKIN / SKIN_SHADE) : il existe alors dans les 5 teintes Unicode
import { readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { SKIN, SKIN_LINE, SKIN_SHADE, sheet } from "./emojis/lib.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "scripts/emojis");
const GROUPS = ["visages", "mains", "personnes", "coeurs", "animaux", "nature", "fruits", "nourriture", "boissons", "objets", "lieux"];
// Boissons dessinées dans d'autres fichiers, rangées dans le groupe « boissons ».
const REGROUP = {
  "elephant": "animaux", "lion": "animaux", "girafe": "animaux", "okapi": "animaux", "pangolin": "animaux", "cameleon": "animaux", "calao": "animaux", "gorille": "animaux", "zebre": "animaux",
  "banane": "fruits", "mangue": "fruits", "ananas": "fruits", "noix-de-coco": "fruits", "avocat": "fruits", "pasteque": "fruits", "piment": "fruits", "noix-de-kola": "fruits", "dattes": "fruits",
  "sankofa": "coeurs", "bissap": "boissons", "vin-de-palme": "boissons", "cafe-touba": "boissons", "the-a-la-menthe": "boissons", "tasse-de-cafe": "boissons", "degue": "boissons" };
const all = [];
for (const f of readdirSync(dir).filter((f) => f.endsWith(".mjs") && f !== "lib.mjs").sort()) {
  const list = (await import(pathToFileURL(join(dir, f)).href)).default;
  for (const e of list) all.push({ ...e, group: REGROUP[e.slug] ?? e.group, file: f });
}
const errors = [], seen = new Set(), chars = new Set();
for (const e of all) {
  const where = `${e.file} › ${e.slug}`;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.slug ?? "")) errors.push(`${where} : slug invalide`);
  if (seen.has(e.slug)) errors.push(`${where} : slug en double`); seen.add(e.slug);
  if (!e.fr || !e.en) errors.push(`${where} : noms FR/EN`);
  if (!GROUPS.includes(e.group)) errors.push(`${where} : groupe « ${e.group} »`);
  if (!Array.isArray(e.tags) || e.tags.length < 3) errors.push(`${where} : au moins 3 mots-clés`);
  if (e.char != null) {
    if (!/\p{Extended_Pictographic}/u.test(e.char)) errors.push(`${where} : « ${e.char} » n'est pas un emoji`);
    if (chars.has(e.char)) errors.push(`${where} : emoji ${e.char} déjà dessiné`); chars.add(e.char);
  }
  const usesSkin = e.body.includes(SKIN) || e.body.includes(SKIN_SHADE) || e.body.includes(SKIN_LINE);
  if (!!e.tone !== usesSkin) errors.push(`${where} : tone=${!!e.tone} mais la peau ${usesSkin ? "est" : "n'est pas"} utilisée`);
  if (/\bid="|url\(#|<clipPath|<mask|Gradient|currentColor|<text/.test(e.body)) errors.push(`${where} : identifiant, dégradé, currentColor ou texte interdit`);
  if (/NaN|undefined|Infinity/.test(e.body)) errors.push(`${where} : coordonnée invalide (NaN, undefined)`);
  if (/<(path|circle|ellipse|rect)(?![^>]*\bstroke=)[^>]*\/>/.test(e.body)) errors.push(`${where} : chaque forme doit fixer son contour (stroke)`);
  if (/<(path|circle|ellipse|rect)(?![^>]*\bfill=)[^>]*\/>/.test(e.body)) errors.push(`${where} : chaque forme doit fixer son remplissage (fill)`);
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }

// Recadrage : ces dessins dépassaient de la grille 24 × 24 (coupés à l'affichage, mesuré au pixel lors de l'audit) ;
// ils sont réduits autour du centre juste assez pour y tenir.
const FIT = { "cameleon": 0.937, "calao": 0.956, "bouclier-massai": 0.956, "bouclier-zoulou": 0.901, "balafon": 0.956, "cavalier-durbar": 0.901,
  "guerrier-massai": 0.956, "homme-zoulou": 0.956, "danseur-dogon-kanaga": 0.947, "coeur-brise": 0.928 };
for (const e of all) if (FIT[e.slug]) e.body = `<g transform="translate(12 12) scale(${FIT[e.slug]}) translate(-12 -12)">${e.body}</g>`;
const emojis = all.map(({ slug, fr, en, char, group, tags, tone, body }) => ({
  id: `emoji-${slug}`, fr, en, char: char ?? null, cat: "emojis", group, region: "pan",
  tags: [...new Set(["emoji", ...tags.map((t) => t.toLowerCase())])], tone: !!tone, since: "0.7", body, fill: body,
}));
writeFileSync(join(root, "src/emojis.json"), JSON.stringify(emojis, null, 1) + "\n");
const afro = emojis.filter((e) => !e.char).length;
console.log(`✔ ${emojis.length} emojis (${emojis.length - afro} Unicode, ${afro} africains, ${emojis.filter((e) => e.tone).length} avec teintes de peau) → src/emojis.json`);
if (process.argv.includes("--sheet")) { await sheet(emojis, join(root, "emojis-planche.html")); console.log("✔ emojis-planche.html"); }
