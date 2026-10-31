// Image de partage (apps/web/public/og-image.png, 1200 × 630) : node docs/og/make.mjs, puis la capture Chrome indiquée.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const here = dirname(fileURLToPath(import.meta.url)), root = join(here, "../..");
const afro = JSON.parse(readFileSync(join(root, "packages/afroicons/icons.json"), "utf8"));
const ui = JSON.parse(readFileSync(join(root, "packages/afroicons-ui/icons.json"), "utf8"));
const by = Object.fromEntries(afro.map((i) => [i.id, i]));
const total = afro.length + ui.length, flags = afro.filter((i) => i.cat === "drapeaux").length;
const C = ["#C24E2A", "#E3A22F", "#22305C", "#2E6B4E"];
const tiles = ["baobab", "djembe", "sankofa", "mototaxi", "drapeau-cameroun", "musgum", "calebasse", "elephant", "mobilemoney", "foufou", "case", "masque"];
const svg = (i) => i.cat === "drapeaux"
  ? `<svg viewBox="0 0 24 24" width="104" height="104">${i.body}</svg>`
  : `<svg viewBox="0 0 24 24" width="84" height="84" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" color="#fff">${i.body}</svg>`;
const logo = readFileSync(join(root, "docs/logo.svg"), "utf8");
const html = `<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&family=DM+Sans:wght@500;700&family=JetBrains+Mono:wght@600&display=swap" rel="stylesheet"><style>
body{margin:0;width:1200px;height:630px;overflow:hidden;background:#FBF5EA;font-family:"DM Sans";color:#1F1A15;position:relative}
.l{position:absolute;left:64px;top:50px;width:600px}.logo svg{width:76px;height:76px}
h1{font:800 70px/1.02 "Bricolage Grotesque";letter-spacing:-.04em;margin:32px 0 22px}h1 b{color:#C24E2A}
p{font-size:25px;line-height:1.45;color:#6B6052;margin:0 0 20px}
.chips{display:flex;gap:10px}.chips span{border:2px solid #1F1A15;border-radius:99px;padding:7px 14px;font-weight:700;font-size:17px}
.url{position:absolute;left:64px;bottom:36px;font-weight:700;font-size:25px}
.g{position:absolute;right:-24px;top:-64px;display:grid;grid-template-columns:repeat(3,154px);gap:18px;transform:rotate(-6deg)}
.t{width:154px;height:154px;border-radius:30px;display:grid;place-items:center;box-shadow:0 22px 40px -18px #1F1A1566}
.t.f{background:#fff}.mit{position:absolute;right:56px;bottom:30px;background:#1F1A15;color:#FBF5EA;font:600 16px "JetBrains Mono";letter-spacing:.08em;padding:11px 16px;border-radius:10px}
</style></head><body><div class="l"><div class="logo">${logo}</div>
<h1>Des icônes qui racontent <b>l'Afrique.</b></h1>
<p>${total} icônes libres, au trait et remplies,<br>dont les ${flags} drapeaux africains.</p>
<div class="chips"><span>React</span><span>Angular</span><span>SVG</span><span>FR · EN</span></div></div>
<div class="url">afroicons.org</div>
<div class="g">${tiles.map((id, k) => `<div class="t${by[id].cat === "drapeaux" ? " f" : ""}" style="background:${by[id].cat === "drapeaux" ? "#fff" : C[k % 4]}">${svg(by[id])}</div>`).join("")}</div>
<div class="mit">OPEN SOURCE · MIT</div></body></html>`;
writeFileSync(join(here, "og-image.html"), html);
console.log(`✔ docs/og/og-image.html (${total} icônes) — capture :\n"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --virtual-time-budget=4000 --window-size=1200,630 --screenshot=apps/web/public/og-image.png docs/og/og-image.html`);
