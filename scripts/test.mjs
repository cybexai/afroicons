// Vérifications minimales avant publication.
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { icons, names, toSvg } from "../packages/afroicons/index.js";

assert.ok(names.length >= 150, "au moins 150 icônes");
assert.equal(new Set(names).size, names.length, "ids uniques");
for (const n of names) {
  const i = icons[n];
  assert.match(n, i.cat === "drapeaux" ? /^drapeau-[a-z0-9]+(-[a-z0-9]+)*$/ : /^[a-z0-9]+$/, `id valide: ${n}`);
  assert.ok(i.fr && i.en, `noms FR/EN: ${n}`);
  assert.ok(["nature","faune","musique","symboles","cuisine","vie","architecture","drapeaux"].includes(i.cat), `catégorie: ${n}`);
  assert.ok(i.tags.length >= 3, `mots-clés: ${n}`);
  assert.equal(new Set(i.tags.map((t) => t.toLowerCase())).size, i.tags.length, `mots-clés sans doublon: ${n}`);
  assert.ok(toSvg(n).startsWith("<svg") && toSvg(n).endsWith("</svg>"), `svg: ${n}`);
  if (i.variantOf) assert.ok(icons[i.variantOf] && !icons[i.variantOf].variantOf, `variante d'une icône de base : ${n}`);
}
assert.equal(readdirSync(new URL("../packages/afroicons/svg", import.meta.url)).filter((f) => f.endsWith(".svg")).length, names.length);
assert.equal(readdirSync(new URL("../packages/afroicons/svg/fill", import.meta.url)).length, names.length, "une version remplie par icône");
for (const n of names) {
  const f = toSvg(n, { variant: "fill", color: "#C24E2A" });
  assert.ok(icons[n].fill && f.includes('color="#C24E2A"') && f.includes("afroicon-fill"), `version remplie : ${n}`);
  if (icons[n].fill.includes("<mask")) assert.ok(icons[n].fill.includes(`id="afm-${n}"`) && icons[n].fill.includes(`url(#afm-${n})`), `masque nommé : ${n}`);
}
assert.match(toSvg("baobab", { size: 32, color: "#C24E2A" }), /width="32".*stroke="#C24E2A"/);
// Drapeaux : les 54 États membres de l'ONU, chacun avec son code ISO, sans identifiant SVG
// (un clipPath ou un masque nommé casse l'affichage quand sa première copie est cachée : sprite, menu fermé).
const flags = names.filter((n) => icons[n].cat === "drapeaux");
assert.equal(flags.length, 54, "54 drapeaux");
assert.equal(new Set(flags.map((n) => icons[n].iso)).size, 54, "codes ISO uniques");
for (const n of flags) {
  const i = icons[n];
  assert.doesNotMatch(i.body, /\bid="|url\(#|<clipPath|<mask/, `sans identifiant : ${n}`);
  for (const [, x, y] of i.body.matchAll(/[ML](-?[\d.]+) (-?[\d.]+)/g)) assert.ok(+x >= 0.99 && +x <= 23.01 && +y >= 4.49 && +y <= 19.51, `dans le cadre : ${n} (${x} ${y})`);
  assert.ok(!i.body.includes("currentColor"), `couleurs officielles : ${n}`);
  assert.equal(i.fill, i.body, `version remplie identique : ${n}`);
}
console.log(`✔ ${names.length} icônes vérifiées, au trait et remplies, dont ${flags.length} drapeaux`);

// ---------- afroicons-ui : compatibilité lucide-react ----------
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
const ui = await import("../packages/afroicons-ui/index.js");
const lucide = await import("lucide-react");
const drawn = ui.afroiconNames;
assert.ok(drawn.length >= 177, "au moins 177 icônes d'interface");
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

// ---------- afroicons-react : rendu imbriqué, version remplie, couleur ----------
const R = await import("../packages/afroicons-react/index.js");
assert.match(html(R.Ngoni), /<g transform="rotate\(-35 12 12\)"><ellipse/, "groupe transformé conservé (ngoni)");
assert.match(html(R.Arachide, { color: "#C24E2A" }), /<svg[^>]*color="#C24E2A"/, "couleur transmise aux points");
assert.match(html(R.DrapeauCameroun, { title: "Cameroun" }), /<svg[^>]*role="img"[^>]*><title>Cameroun<\/title><g stroke="none" stroke-linecap="butt"><path d="[^"]+" fill="#007A5E"/, "drapeau en React, avec titre accessible");
for (const n of names) {
  const h = html(R[n.replace(/(^|[-_])(\w)/g, (_, a, b) => b.toUpperCase())], { variant: "fill" });
  assert.ok(h.includes("afroicon-fill") && (h.includes("<mask") || h.includes('fill="currentColor"') || h.includes("stroke-width")), `React rempli : ${n}`);
}
console.log(`✔ afroicons-react : ${names.length} icônes au trait et remplies`);

// ---------- afroicons-mui et afroicons-antd : compatibilité @mui/icons-material et @ant-design/icons ----------
const M = await import("../packages/afroicons-mui/index.js"), OM = await import("@mui/icons-material");
const A = await import("../packages/afroicons-antd/index.js"), OA = await import("@ant-design/icons");
const compat = (await import("../src/compat.json", { with: { type: "json" } })).default;
for (const [mod, orig, names, label] of [[M, OM, M.afroiconNames, "Material UI"], [A, OA, A.afroiconNames, "Ant Design"]]) {
  assert.equal(new Set(names).size, names.length, `${label} : noms uniques`);
  for (const n of names) {
    assert.ok(orig[n], `${label} : nom existant ${n}`);
    assert.notEqual(mod[n], orig[n], `${label} : redessinée ${n}`);
    assert.equal((await import(`../packages/${label === "Material UI" ? "afroicons-mui" : "afroicons-antd"}/icons/${n}.js`)).default, mod[n], `${label} : import direct ${n}`);
  }
}
assert.equal(M.AcUnit, OM.AcUnit, "Material UI : les icônes non redessinées viennent de @mui/icons-material");
assert.equal(A.AlipayOutlined, OA.AlipayOutlined, "Ant Design : les icônes non redessinées viennent de @ant-design/icons");
for (const [id, v] of Object.entries(compat)) {
  assert.ok(ui.afroiconNames.includes(id), `correspondance : ${id} est une icône d'interface`);
  // Le site montre « Nom » et « NomOutlined » en exemple : ils doivent exister.
  if (v.mui[0]) assert.ok(M[v.mui[0]] !== OM[v.mui[0]] && M[v.mui[0] + "Outlined"] !== OM[v.mui[0] + "Outlined"], `exemple Material UI : ${id}`);
  if (v.antd[0]) assert.ok(A[v.antd[0] + "Outlined"] !== OA[v.antd[0] + "Outlined"], `exemple Ant Design : ${id}`);
}
// Rendu : mêmes classes et mêmes props que les originaux, trait Afroicons.
const strip = (s) => s.replace(/<style[^>]*>.*?<\/style>/g, "");
let hm = strip(html(M.DeleteOutlined, { fontSize: "small", color: "error", titleAccess: "Supprimer" }));
assert.match(hm, /<svg class="MuiSvgIcon-root MuiSvgIcon-colorError MuiSvgIcon-fontSizeSmall[^"]*"[^>]*viewBox="0 0 24 24" data-testid="DeleteOutlinedIcon"><g fill="none" stroke="currentColor" stroke-width="1.75"/, "Material UI : SvgIcon, fontSize, color");
assert.match(hm, /<title>Supprimer<\/title>/, "Material UI : titleAccess");
for (const n of M.afroiconNames) assert.match(strip(html(M[n])), new RegExp(`data-testid="${n}Icon"><g fill="none"`), `Material UI : rendu ${n}`);
let ha = html(A.PlusOutlined, { spin: true, rotate: 90, className: "x", style: { fontSize: 20 } });
assert.match(ha, /^<span role="img" aria-label="plus" style="font-size:20px" class="anticon anticon-spin anticon-plus x"><svg[^>]*class="anticon-spin" style="[^"]*rotate\(90deg\)"[^>]*viewBox="0 0 24 24" data-icon="plus"/, "Ant Design : anticon, spin, rotate, style");
for (const n of A.afroiconNames) assert.match(html(A[n]), /^<span role="img" aria-label="[a-z0-9-]+" class="anticon anticon-[a-z0-9-]+"><svg/, `Ant Design : rendu ${n}`);
assert.match(html(A.EyeFilled, { twoToneColor: "#f00" }), /aria-label="eye"/, "Ant Design : twoToneColor accepté sans attribut parasite");
assert.doesNotMatch(html(A.EyeFilled, { twoToneColor: "#f00" }), /twotonecolor|twoToneColor/i);
console.log(`✔ afroicons-mui : ${M.afroiconNames.length} noms Material UI ; afroicons-antd : ${A.afroiconNames.length} noms Ant Design`);
