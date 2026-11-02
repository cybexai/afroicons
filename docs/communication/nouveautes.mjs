// Affiche « Nouveautés 0.6 · 0.7 · 0.8 » pour les réseaux sociaux (1080 × 1350, rendue en 2160 × 2700) :
//   node docs/communication/nouveautes.mjs   → afroicons-nouveautes-fr.html / -en.html, puis les captures indiquées.
// Même famille que l'affiche de lancement : fond terre et motif d'icônes, étiquette crème, bandeaux.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), root = join(here, "../..");
const afro = JSON.parse(readFileSync(join(root, "packages/afroicons/icons.json"), "utf8"));
const ui = JSON.parse(readFileSync(join(root, "packages/afroicons-ui/icons.json"), "utf8"));
const by = Object.fromEntries(afro.map((i) => [i.id, i]));
const n = (f) => afro.filter(f).length;
const N = {
  total: afro.length + ui.length, emojis: n((i) => i.cat === "emojis"), flags: n((i) => i.cat === "drapeaux"), maps: n((i) => i.cat === "cartes"),
  cultural: n((i) => !["emojis", "drapeaux"].includes(i.cat)), fauna: n((i) => i.cat === "faune"), ui: ui.length,
};
const fmt = (v, lang) => v.toLocaleString(lang === "en" ? "en-US" : "fr-FR").replace(/ /g, " ");
const logo = readFileSync(join(root, "docs/logo.svg"), "utf8").replace("<svg", '<svg width="58" height="58"');

const TERRE = "#B8462A", OCRE = "#E8A93A", INDIGO = "#1F2B57", VERT = "#2E6B4E", INK = "#1F1A15", CREAM = "#FBF3E4";
const line = (i, s, c = "#fff", w = 1.8) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" color="${c}">${i.body}</svg>`;
const color = (i, s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">${i.body}</svg>`;
/** Une tuile : icône au trait en blanc sur couleur, drapeau ou emoji en couleur sur blanc. */
const tile = (id, bg) => { const i = by[id]; if (!i) throw new Error("icône inconnue : " + id); const col = i.cat === "emojis" || i.cat === "drapeaux"; return `<span style="background:${col ? "#fff" : bg}">${col ? color(i, 42) : line(i, 36)}</span>`; };

// Le motif du fond : icônes culturelles (dont les nouveaux animaux et les cartes), pastilles sombres et points ocre.
const PAT = ["gruecouronnee", "baobab", "carte-cameroun", "guepard", "djembe", "makicatta", "sankofa", "becensabot", "mototaxi", "elephant", "carte-senegal", "tisserin", "kora", "girafe", "carte-kenya", "masque", "bongo", "calebasse", "mambanoir", "case", "carte-madagascar", "pangolin", "lion", "mobilemoney"];
function pattern() {
  let s = "", k = 0;
  const cols = ["#1F2B57", "#E8A93A", "#2E6B4E", "#FBF3E4"];
  for (let r = 0; r < 12; r++) for (let c = 0; c < 9; c++) {
    const x = c * 120 + (r % 2 ? 60 : 0) + 60, y = r * 120 + 40, i = by[PAT[k++ % PAT.length]];
    if ((r + c) % 3 === 0) s += `<circle cx="${x}" cy="${y}" r="52" fill="#8E3220"/><circle cx="${x}" cy="${y}" r="52" fill="none" stroke="${OCRE}" stroke-width="2" stroke-dasharray="2 7" stroke-linecap="round"/>`;
    const col = cols[(r * 3 + c) % 4];
    s += `<g transform="translate(${x} ${y}) rotate(${((r + c) % 2 ? -8 : 8)}) scale(3.1) translate(-12 -12)" fill="none" stroke="${col}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" color="${col}">${i.body}</g>`;
    s += `<circle cx="${x + 60}" cy="${y + 60}" r="4" fill="${OCRE}" opacity=".9"/>`;
  }
  return `<svg class="pagne" width="1080" height="1350" viewBox="0 0 1080 1350">${s}</svg>`;
}

const T = {
  fr: {
    lang: "fr", top: ["AFROICONS", "NOUVEAUTÉS", "0.6 · 0.7 · 0.8", "AFROICONS.ORG"],
    stamp: ["3 VERSIONS", "2", "JOURS"], kick: "Nouveautés · 31 oct. – 1er nov. 2026",
    h1: `Trois versions,<br><em>${fmt(N.total, "fr")}</em> icônes.`,
    rel: [
      { v: "0.8", d: "1er nov.", t: `Cartes des ${N.maps} pays · ${N.fauna - 35 > 0 ? 80 : 0} animaux · bac à sable`, s: `La faune passe de 35 à ${N.fauna} espèces, en icône et en emoji. Testez les icônes dans votre propre interface.`, tiles: ["carte-cameroun", "guepard", "gruecouronnee", "makicatta", "emoji-guepard", "carte-madagascar"], hot: "Nouveau" },
      { v: "0.7", d: "1er nov.", t: "372 emojis africains et Unicode", s: "5 teintes de peau, 202 icônes culturelles en plus, paquets Material UI et Ant Design.", tiles: ["emoji-thieboudienne", "emoji-femme-wolof", "emoji-djembe", "emoji-bissap", "emoji-pouce-leve", "emoji-coeur-vert"] },
      { v: "0.6", d: "31 oct.", t: `Les ${N.flags} drapeaux africains`, s: `Aux couleurs officielles, et 14 icônes d'interface en plus (${N.ui} au total).`, tiles: ["drapeau-cameroun", "drapeau-senegal", "drapeau-nigeria", "drapeau-cote-d-ivoire", "drapeau-kenya", "drapeau-afrique-du-sud"] },
    ],
    facts: [[N.cultural, "culturelles"], [N.emojis, "emojis"], [N.flags, "drapeaux"], [N.maps, "cartes"], [N.ui, "interface"]],
    foot: ["Un projet de THAFAM HOLDING SARL", "Fait avec soin à Yaoundé"],
    bottom: ["BAC À SABLE : AFROICONS.ORG/PLAYGROUND", "REACT · ANGULAR · SVG", "MIT"],
  },
  en: {
    lang: "en", top: ["AFROICONS", "WHAT'S NEW", "0.6 · 0.7 · 0.8", "AFROICONS.ORG"],
    stamp: ["3 RELEASES", "2", "DAYS"], kick: "What's new · Oct 31 – Nov 1, 2026",
    h1: `Three releases,<br><em>${fmt(N.total, "en")}</em> icons.`,
    rel: [
      { v: "0.8", d: "Nov 1", t: `Maps of all ${N.maps} countries · 80 animals · playground`, s: `Wildlife grows from 35 to ${N.fauna} species, as icons and emojis. Try the icons in your own interface.`, tiles: ["carte-cameroun", "guepard", "gruecouronnee", "makicatta", "emoji-guepard", "carte-madagascar"], hot: "New" },
      { v: "0.7", d: "Nov 1", t: "372 African and Unicode emojis", s: "5 skin tones, 202 more cultural icons, Material UI and Ant Design packages.", tiles: ["emoji-thieboudienne", "emoji-femme-wolof", "emoji-djembe", "emoji-bissap", "emoji-pouce-leve", "emoji-coeur-vert"] },
      { v: "0.6", d: "Oct 31", t: `All ${N.flags} African flags`, s: `In their official colours, plus 14 new interface icons (${N.ui} in all).`, tiles: ["drapeau-cameroun", "drapeau-senegal", "drapeau-nigeria", "drapeau-cote-d-ivoire", "drapeau-kenya", "drapeau-afrique-du-sud"] },
    ],
    facts: [[N.cultural, "cultural"], [N.emojis, "emojis"], [N.flags, "flags"], [N.maps, "maps"], [N.ui, "interface"]],
    foot: ["A THAFAM HOLDING SARL project", "Made with care in Yaoundé"],
    bottom: ["PLAYGROUND: AFROICONS.ORG/PLAYGROUND", "REACT · ANGULAR · SVG", "MIT"],
  },
};

const TILE_BG = [TERRE, OCRE, VERT, INDIGO];
const page = (t) => `<!doctype html><html lang="${t.lang}"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800&family=DM+Sans:opsz,wght@9..40,500;9..40,700&family=JetBrains+Mono:wght@500;700&display=block" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
html,body{width:1080px;height:1350px;overflow:hidden;background:${TERRE}}
.pagne{position:absolute;inset:0}
.selv{position:absolute;left:0;right:0;height:40px;background:${INK};color:${OCRE};font:700 15px "JetBrains Mono";letter-spacing:.2em;white-space:nowrap;overflow:hidden;display:flex;align-items:center;justify-content:space-between;padding:0 30px;z-index:2}
.selv i{font-style:normal;font-size:10px;opacity:.7;letter-spacing:0}
.selv.t{top:0}.selv.b{bottom:0}
.selv::after{content:"";position:absolute;left:0;right:0;height:3px;background:repeating-linear-gradient(90deg,${OCRE} 0 10px,transparent 10px 16px)}
.selv.t::after{bottom:0}.selv.b::after{top:0}
.label{position:absolute;left:70px;right:70px;top:90px;background:${CREAM};border-radius:6px;padding:40px 52px 34px;transform:rotate(-1.2deg);box-shadow:0 40px 80px -20px #3b130899,0 2px 0 #0002}
.label::before{content:"";position:absolute;inset:12px;border:2px solid ${INK};border-radius:3px;pointer-events:none}
.label::after{content:"";position:absolute;inset:18px;border:1px solid #1F1A1555;border-radius:2px;pointer-events:none}
.brand{display:flex;align-items:center;gap:14px}
.brand b{font:800 40px "Bricolage Grotesque";letter-spacing:-.03em;color:${INK}}
.kick{margin-top:16px;font:700 15px "JetBrains Mono";letter-spacing:.14em;text-transform:uppercase;color:${TERRE}}
h1{margin-top:8px;font:800 72px/0.96 "Bricolage Grotesque";letter-spacing:-.045em;color:${INK}}
h1 em{font-style:normal;color:${TERRE}}
.rels{margin-top:22px;display:grid;gap:12px}
.rel{display:grid;grid-template-columns:118px minmax(0,1fr);gap:20px;align-items:start;padding:13px 18px;border-radius:16px;border:2px solid #1F1A1522;background:#fff6}
.rel.hot{border-color:${INK};background:#fff;box-shadow:5px 5px 0 ${INK}}
.v{display:grid;gap:6px;justify-items:start}
.v b{font:800 40px/1 "Bricolage Grotesque";letter-spacing:-.03em;color:${INK}}
.v small{font:700 13px "JetBrains Mono";letter-spacing:.1em;text-transform:uppercase;color:#6B5F51}
.v em{font:700 12px "JetBrains Mono";letter-spacing:.12em;text-transform:uppercase;font-style:normal;background:${VERT};color:#fff;padding:4px 8px;border-radius:6px}
.rel h3{font:800 24px/1.1 "Bricolage Grotesque";letter-spacing:-.02em;color:${INK}}
.rel p{margin-top:5px;font:500 16px/1.38 "DM Sans";color:#5A4E42}
.strip{display:flex;gap:8px;margin-top:10px}
.strip span{width:56px;height:56px;border-radius:15px;display:grid;place-items:center;border:1.5px solid #1F1A1514}
.facts{display:flex;margin-top:20px;border-top:2px solid ${INK};border-bottom:2px solid ${INK}}
.facts div{flex:1;padding:12px 0 10px;text-align:center}
.facts div+div{border-left:1px solid #1F1A1555}
.facts b{display:block;font:800 34px "Bricolage Grotesque";letter-spacing:-.02em;color:${INK}}
.facts small{font:700 12px "JetBrains Mono";letter-spacing:.12em;text-transform:uppercase;color:#6B5F51}
.code{margin-top:16px}
.code pre{display:block;font:500 23px "JetBrains Mono";background:${INK};color:${CREAM};padding:12px 22px;border-radius:14px}
.code pre i{font-style:normal;color:${OCRE}}
.stamp{position:absolute;right:42px;top:34px;width:142px;height:142px;border-radius:50%;border:3px solid ${VERT};color:${VERT};display:grid;place-items:center;text-align:center;transform:rotate(12deg);font:800 14px/1.15 "JetBrains Mono";letter-spacing:.08em;background:${CREAM}}
.stamp::before{content:"";position:absolute;inset:7px;border-radius:50%;border:1.5px dashed ${VERT}}
.stamp b{display:block;font:800 46px/1 "Bricolage Grotesque";letter-spacing:-.03em;margin:2px 0}
.foot{position:absolute;left:0;right:0;bottom:54px;display:flex;justify-content:space-between;align-items:flex-end;padding:0 80px;color:${CREAM};z-index:2}
.foot .url{font:800 40px "Bricolage Grotesque";letter-spacing:-.03em;background:${INK};padding:6px 22px 10px;border-radius:14px}
.foot small{font:700 15px "JetBrains Mono";letter-spacing:.1em;text-transform:uppercase;text-align:right;line-height:1.6;background:${INK};padding:10px 16px;border-radius:12px}
</style></head><body>
${pattern()}
<div class="selv t">${t.top.map((x) => `<span>${x}</span>`).join("<i>◆</i>")}</div>
<div class="label">
  <div class="stamp"><div>${t.stamp[0]}<b>${t.stamp[1]}</b>${t.stamp[2]}</div></div>
  <div class="brand">${logo}<b>Afroicons</b></div>
  <div class="kick">${t.kick}</div>
  <h1>${t.h1}</h1>
  <div class="rels">${t.rel.map((r) => `<div class="rel${r.hot ? " hot" : ""}">
    <div class="v"><b>v${r.v}</b><small>${r.d}</small>${r.hot ? `<em>${r.hot}</em>` : ""}</div>
    <div><h3>${r.t}</h3><p>${r.s}</p><div class="strip">${r.tiles.map((id, k) => tile(id, TILE_BG[k % 4])).join("")}</div></div>
  </div>`).join("")}</div>
  <div class="facts">${t.facts.map(([v, l]) => `<div><b>${fmt(v, t.lang)}</b><small>${l}</small></div>`).join("")}</div>
  <div class="code"><pre>$ npm install <i>afroicons-react</i></pre></div>
</div>
<div class="foot"><span class="url">afroicons.org</span><small>${t.foot[0]}<br>${t.foot[1]}</small></div>
<div class="selv b">${t.bottom.map((x) => `<span>${x}</span>`).join("<i>◆</i>")}</div>
<script>
// Les bandeaux tiennent sur une ligne ; l'étiquette ne descend pas sous le pied de page.
document.fonts.ready.then(() => {
  document.querySelectorAll(".selv").forEach((b) => { let f = 15; while (b.scrollWidth > b.clientWidth && f > 9) { f -= 0.5; b.style.fontSize = f + "px"; } });
  const l = document.querySelector(".label").getBoundingClientRect(), f = document.querySelector(".foot").getBoundingClientRect();
  document.body.dataset.fit = Math.round(f.top - l.bottom);
});
</script>
</body></html>`;

for (const t of Object.values(T)) writeFileSync(join(here, `afroicons-nouveautes-${t.lang}.html`), page(t));
const chrome = `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --virtual-time-budget=5000 --force-device-scale-factor=2 --window-size=1080,1350`;
console.log(`✔ affiches (${N.total} icônes, ${N.fauna} animaux, ${N.maps} cartes) — captures :\n${["fr", "en"].map((l) => `${chrome} --screenshot=docs/communication/afroicons-nouveautes-${l}.png docs/communication/afroicons-nouveautes-${l}.html`).join("\n")}`);
