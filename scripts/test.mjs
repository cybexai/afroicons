// Vérifications minimales avant publication.
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { icons, names, toSvg } from "../packages/afroicons/index.js";

assert.ok(names.length >= 150, "au moins 150 icônes");
assert.equal(new Set(names).size, names.length, "ids uniques");
for (const n of names) {
  const i = icons[n];
  assert.match(n, i.cat === "drapeaux" ? /^drapeau-[a-z0-9]+(-[a-z0-9]+)*$/ : i.cat === "emojis" ? /^emoji-[a-z0-9]+(-[a-z0-9]+)*$/ : i.cat === "cartes" ? /^carte-[a-z0-9]+(-[a-z0-9]+)*$/ : i.cat === "monnaies" ? /^monnaie-[a-z]{3}$/ : /^[a-z0-9]+$/, `id valide: ${n}`);
  assert.ok(i.fr && i.en, `noms FR/EN: ${n}`);
  assert.ok(["nature","faune","musique","symboles","cuisine","vie","architecture","personnes","cartes","monnaies","drapeaux","emojis"].includes(i.cat), `catégorie: ${n}`);
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
// Cartes des 54 pays, reliées à leur drapeau (et réciproquement).
{ const maps = names.filter((n) => icons[n].cat === "cartes");
  assert.equal(maps.length, 54, "54 cartes de pays");
  for (const n of maps) { const f = icons[n].flag; assert.ok(icons[f]?.cat === "drapeaux" && icons[f].iso === icons[n].iso && icons[f].map === n, `carte ↔ drapeau : ${n}`); }
  console.log(`✔ ${maps.length} cartes de pays reliées à leur drapeau`); }
// Lien icône ↔ emoji : chaque lien pointe vers un emoji existant, un emoji n'a qu'une icône, et le lien est réciproque.
{ const linked = names.filter((n) => icons[n].emoji); const seenE = new Set();
  for (const n of linked) { const e = icons[n].emoji; assert.ok(icons[e]?.cat === "emojis", `lien vers un emoji : ${n}`); assert.ok(!seenE.has(e), `un seul lien par emoji : ${e}`); seenE.add(e); assert.equal(icons[e].icon, n, `lien réciproque : ${e}`); }
  console.log(`✔ ${linked.length} icônes reliées à leur emoji`); }
// Règles de dessin des icônes au trait (audit qualité) : trait 1,75 partout, pas de petit cercle creux (il laisse un trou d'épingle).
const lineIcons = [...names.filter((n) => !["drapeaux", "emojis"].includes(icons[n].cat)).map((n) => [n, icons[n].body]), ...(await import("../src/ui-icons.json", { with: { type: "json" } })).default.map((u) => ["ui-" + u.id, u.body])];
for (const [n, b] of lineIcons) {
  assert.doesNotMatch(b, /stroke-width=/, `trait 1,75 sans épaisseur forcée : ${n}`);
  assert.doesNotMatch(b + (icons[n]?.fill ?? ""), /NaN|undefined|Infinity/, `coordonnées valides : ${n}`);
  for (const [, at] of b.matchAll(/<circle([^>]*)\/>/g)) { const r = +(/\br="([\d.]+)"/.exec(at)?.[1]); assert.ok(r >= 1.2 || /fill="currentColor"/.test(at), `cercle creux trop petit (r=${r}) : ${n}`); }
}
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
// Emojis : en couleur, sans identifiant SVG ; ceux qui ont une peau existent dans les 5 teintes Unicode.
const { tones, defaultTone } = await import("../packages/afroicons/index.js");
const emojis = names.filter((n) => icons[n].cat === "emojis");
assert.ok(emojis.length >= 140, `au moins 140 emojis (${emojis.length})`);
assert.equal(Object.keys(tones).length, 5, "5 teintes de peau");
const [d0, d1] = tones[defaultTone];
for (const n of emojis) {
  const i = icons[n];
  assert.match(n, /^emoji-[a-z0-9]+(-[a-z0-9]+)*$/, `id d'emoji : ${n}`);
  assert.doesNotMatch(i.body, /\bid="|url\(#|<clipPath|<mask|currentColor/, `emoji sans identifiant ni currentColor : ${n}`);
  assert.equal(i.fill, i.body, `emoji : version remplie identique : ${n}`);
  assert.ok(i.char === null || /\p{Extended_Pictographic}/u.test(i.char), `caractère Unicode : ${n}`);
  if (i.tone) {
    assert.ok(i.body.includes(d0), `peau par défaut : ${n}`);
    for (const [t, [c0]] of Object.entries(tones)) if (t !== defaultTone) {
      const out = toSvg(n, { tone: t });
      assert.ok(out.includes(c0) && !out.includes(d0) && !out.includes(d1), `teinte ${t} : ${n}`);
    }
  } else assert.equal(toSvg(n, { tone: "light" }), toSvg(n), `sans peau, tone sans effet : ${n}`);
}
assert.ok(new Set(emojis.map((n) => icons[n].char).filter(Boolean)).size === emojis.filter((n) => icons[n].char).length, "un seul dessin par emoji Unicode");
console.log(`✔ ${names.length} icônes vérifiées, au trait et remplies, dont ${flags.length} drapeaux et ${emojis.length} emojis (${emojis.filter((n) => icons[n].tone).length} en 5 teintes)`);

// ---------- afroicons-ui : compatibilité lucide-react ----------
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
const ui = await import("../packages/afroicons-ui/index.js");
const lucide = await import("lucide-react");
const drawn = ui.afroiconNames;
assert.ok(drawn.length >= 177, "au moins 177 icônes d'interface");
assert.equal(new Set(drawn).size, drawn.length, "noms d'interface uniques");
{ const uiData = (await import("../src/ui-icons.json", { with: { type: "json" } })).default; assert.equal(new Set(uiData.map((u) => u.fr)).size, uiData.length, "noms français d'interface uniques"); }
const html = (C, p = {}) => renderToStaticMarkup(createElement(C, p));
const extra = new Set(JSON.parse(readFileSync(new URL("../packages/afroicons-ui/icons.json", import.meta.url), "utf8")).filter((u) => u.extra).map((u) => u.id));
for (const n of drawn) {
  // Les icônes « en plus » (monnaies africaines…) n'ont pas d'équivalent Lucide.
  if (extra.has(n)) assert.ok(!lucide[n], `icône en plus, sans homonyme Lucide : ${n}`);
  else assert.ok(lucide[n], `nom Lucide existant : ${n}`);
  assert.notEqual(ui[n], lucide[n], `redessinée : ${n}`);
  assert.equal(ui[n + "Icon"], ui[n], `alias ${n}Icon`);
  assert.equal(ui["Lucide" + n], ui[n], `alias Lucide${n}`);
  const h = html(ui[n]);
  assert.match(h, /^<svg[^>]*viewBox="0 0 24 24"[^>]*stroke-width="1.75"/, `svg : ${n}`);
  assert.ok(h.includes("lucide lucide-") && h.includes("afroicon"), `classes : ${n}`);
}
assert.match(html(ui.Plus, { size: 48, strokeWidth: 2, absoluteStrokeWidth: true, className: "x" }), /width="48".*stroke-width="1".*class="lucide lucide-plus afroicon x"/);
assert.match(html(ui.Wallet, { color: "#C24E2A" }), /stroke="#C24E2A"/);
// afroicons-angular : chaque icône a sa propre clé (une icône d'interface ne doit pas masquer une icône culturelle).
{
  const ngSrc = readFileSync(new URL("../packages/afroicons-angular/src/icons.ts", import.meta.url), "utf8");
  const vues = new Map();
  for (const [, n] of ngSrc.matchAll(/name: "([^"]+)"/g)) {
    const cle = n.replace(/[-_\s]/g, "").toLowerCase();
    assert.ok(!vues.has(cle), `afroicons-angular : « ${n} » et « ${vues.get(cle)} » ont la même clé`);
    vues.set(cle, n);
  }
}
assert.equal(ui.Github, lucide.Github, "les icônes non redessinées (logos de marques) viennent de lucide-react");
// Les autres noms Lucide d'un dessin redessiné le sont aussi (sinon `export *` les sert en Lucide).
for (const [alias, id] of [["CircleAlert", "AlertCircle"], ["House", "Home"], ["CircleX", "XCircle"]]) {
  assert.equal(lucide[alias], lucide[id], `${alias} est bien un alias Lucide de ${id}`);
  assert.ok(ui[alias] === ui[id] && ui[alias + "Icon"] === ui[id] && ui["Lucide" + alias] === ui[id], `alias redessiné : ${alias}`);
}
assert.match(html(ui.CheckCircle2), /class="lucide lucide-check-circle-2 afroicon"/);
console.log(`✔ ${drawn.length} icônes d'interface vérifiées (compatibles lucide-react)`);

// ---------- afroicons-react : rendu imbriqué, version remplie, couleur ----------
const R = await import("../packages/afroicons-react/index.js");
assert.match(html(R.Goje), /<g transform="rotate\(-35 12 12\)">/, "groupe transformé conservé (goje)");
{
  const toned = emojis.find((n) => icons[n].tone), Rt = R[toned.replace(/(^|[-_])(\w)/g, (_, a, b) => b.toUpperCase())];
  const [l0] = tones.light;
  assert.ok(html(Rt).includes(d0) && html(Rt, { tone: "light" }).includes(l0) && !html(Rt, { tone: "light" }).includes(d0), "React : prop tone");
}
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
assert.match(ha, /^<span role="img" aria-label="plus" style="font-size:20px" class="anticon anticon-plus anticon-spin x"><svg[^>]*style="[^"]*rotate\(90deg\)"[^>]*viewBox="0 0 24 24" data-icon="plus"/, "Ant Design : anticon, spin, rotate, style");
assert.doesNotMatch(ha.slice(ha.indexOf("<svg")), /anticon-spin/, "Ant Design : spin sur le seul <span>, comme l'original (sinon rotation doublée)");
assert.doesNotMatch(html(A.PlusOutlined), /<svg[^>]* class=""/, "Ant Design : pas de class vide sur le <svg>");
assert.match(html(A.LoadingOutlined), /class="anticon anticon-loading anticon-spin"/, "Ant Design : « loading » tourne d'office, comme l'original");
assert.doesNotMatch(html(A.LoadingOutlined, { spin: false }), /anticon-spin/, "Ant Design : spin={false} l'arrête");
// Next.js App Router : composants client, comme les originaux ; un fichier de types par import direct.
const { readFileSync: rf, existsSync: ex } = await import("node:fs");
for (const [dir, names] of [["afroicons-mui", M.afroiconNames], ["afroicons-antd", A.afroiconNames]]) {
  assert.ok(rf(new URL(`../packages/${dir}/afro.js`, import.meta.url), "utf8").startsWith('"use client";'), `${dir} : "use client"`);
  for (const n of names) assert.ok(ex(new URL(`../packages/${dir}/icons/${n}.d.ts`, import.meta.url)), `${dir} : types de ${n}`);
}
for (const n of A.afroiconNames) assert.match(html(A[n]), /^<span role="img" aria-label="[a-z0-9-]+" class="anticon anticon-[a-z0-9-]+( anticon-spin)?"><svg/, `Ant Design : rendu ${n}`);
assert.match(html(A.EyeFilled, { twoToneColor: "#f00" }), /aria-label="eye"/, "Ant Design : twoToneColor accepté sans attribut parasite");
assert.doesNotMatch(html(A.EyeFilled, { twoToneColor: "#f00" }), /twotonecolor|twoToneColor/i);
console.log(`✔ afroicons-mui : ${M.afroiconNames.length} noms Material UI ; afroicons-antd : ${A.afroiconNames.length} noms Ant Design`);
