// Vérifications minimales avant publication.
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { icons, names, toSvg } from "../packages/afroicons/index.js";

assert.ok(names.length >= 150, "au moins 150 icônes");
assert.equal(new Set(names).size, names.length, "ids uniques");
for (const n of names) {
  const i = icons[n];
  assert.match(n, /^[a-z0-9]+$/, `id valide: ${n}`);
  assert.ok(i.fr && i.en, `noms FR/EN: ${n}`);
  assert.ok(["nature","faune","musique","symboles","cuisine","vie","architecture"].includes(i.cat), `catégorie: ${n}`);
  assert.ok(i.tags.length >= 3, `mots-clés: ${n}`);
  assert.ok(toSvg(n).startsWith("<svg") && toSvg(n).endsWith("</svg>"), `svg: ${n}`);
}
assert.equal(readdirSync(new URL("../packages/afroicons/svg", import.meta.url)).length, names.length);
assert.match(toSvg("baobab", { size: 32, color: "#C24E2A" }), /width="32".*stroke="#C24E2A"/);
console.log(`✔ ${names.length} icônes vérifiées`);
