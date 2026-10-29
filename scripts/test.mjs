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

// ---------- afroicons-ui : compatibilité lucide-react ----------
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
const ui = await import("../packages/afroicons-ui/index.js");
const lucide = await import("lucide-react");
const drawn = ui.afroiconNames;
assert.ok(drawn.length >= 108, "au moins 108 icônes d'interface");
assert.equal(new Set(drawn).size, drawn.length, "noms d'interface uniques");
const html = (C, p = {}) => renderToStaticMarkup(createElement(C, p));
for (const n of drawn) {
  assert.ok(lucide[n], `nom Lucide existant : ${n}`);
  assert.notEqual(ui[n], lucide[n], `redessinée : ${n}`);
  assert.equal(ui[n + "Icon"], ui[n], `alias ${n}Icon`);
  assert.equal(ui["Lucide" + n], ui[n], `alias Lucide${n}`);
  const h = html(ui[n]);
  assert.match(h, /^<svg[^>]*viewBox="0 0 24 24"[^>]*stroke-width="1.75"/, `svg : ${n}`);
  assert.ok(h.includes("lucide lucide-") && h.includes("afroicon"), `classes : ${n}`);
}
assert.match(html(ui.Plus, { size: 48, strokeWidth: 2, absoluteStrokeWidth: true, className: "x" }), /width="48".*stroke-width="1".*class="lucide lucide-plus afroicon x"/);
assert.match(html(ui.Wallet, { color: "#C24E2A" }), /stroke="#C24E2A"/);
assert.equal(ui.Underline, lucide.Underline, "les icônes non redessinées viennent de lucide-react");
assert.match(html(ui.CheckCircle2), /class="lucide lucide-check-circle-2 afroicon"/);
console.log(`✔ ${drawn.length} icônes d'interface vérifiées (compatibles lucide-react)`);
