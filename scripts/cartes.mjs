// Génère src/cartes.json : la carte (contour) de chacun des 54 pays africains, en icône au trait et remplie.
//
//   node scripts/cartes.mjs <chemin>/ne_50m_admin_0_countries.geojson
//
// Données : Natural Earth « Admin 0 – Countries » 1:50m (domaine public, naturalearthdata.com), non incluses
// dans le dépôt. Chaque pays est projeté (équirectangulaire corrigée de la latitude moyenne), mis à l'échelle
// dans la zone 2,5–21,5 de la grille 24, puis simplifié (Douglas–Peucker) pour rester lisible à 16 px.
// Les très petites îles deviennent des points. Frontières : celles de la liste des États membres de l'ONU
// (comme les drapeaux) — le Somaliland est rattaché à la Somalie, le Sahara occidental n'est pas inclus.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = process.argv[2];
if (!src) { console.error("Usage : node scripts/cartes.mjs <ne_50m_admin_0_countries.geojson>"); process.exit(1); }
const geo = JSON.parse(readFileSync(src, "utf8"));
const flags = JSON.parse(readFileSync(join(root, "src/flags.json"), "utf8")).filter((f) => f.iso); // les 54 pays
const isoOf = (p) => (p.ISO_A2 && p.ISO_A2 !== "-99" ? p.ISO_A2 : p.ISO_A2_EH);

// Polygones (anneaux extérieurs) d'un pays, en [lon, lat].
const ringsOf = (f) => (f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates).map((p) => p[0]);
const byIso = {};
for (const f of geo.features) { const iso = isoOf(f.properties); (byIso[iso] ??= []).push(...ringsOf(f)); }
const somaliland = geo.features.find((f) => /Somaliland/.test(f.properties.NAME ?? ""));
if (somaliland) byIso.SO.push(...ringsOf(somaliland));

// Îles lointaines exclues pour garder une carte lisible (on garde l'essentiel du territoire).
const KEEP = {
  SC: ([lon, lat]) => lon > 55 && lon < 56.2 && lat > -5.2 && lat < -3.5, // Seychelles : Mahé, Praslin, La Digue
  MU: ([lon]) => lon < 58, // Maurice : île principale (sans Rodrigues ni Agaléga)
  GQ: ([, lat]) => lat > -1, // Guinée équatoriale : Rio Muni et Bioko (où est Malabo), sans Annobón
};

const ARCHIPELS = ["CV", "KM", "ST", "SC", "MU", "GQ"];
const area = (r) => { let s = 0; for (let i = 0; i < r.length; i++) { const [x1, y1] = r[i], [x2, y2] = r[(i + 1) % r.length]; s += x1 * y2 - x2 * y1; } return Math.abs(s / 2); };
function dp(pts, tol) {
  if (pts.length < 3) return pts;
  let max = 0, idx = 0; const [ax, ay] = pts[0], [bx, by] = pts[pts.length - 1];
  const L = Math.hypot(bx - ax, by - ay) || 1e-9;
  for (let i = 1; i < pts.length - 1; i++) { const d = Math.abs((bx - ax) * (ay - pts[i][1]) - (ax - pts[i][0]) * (by - ay)) / L; if (d > max) { max = d; idx = i; } }
  return max > tol ? [...dp(pts.slice(0, idx + 1), tol).slice(0, -1), ...dp(pts.slice(idx), tol)] : [pts[0], pts[pts.length - 1]];
}
const r2 = (n) => Math.round(n * 100) / 100;

function draw(iso) {
  let rings = byIso[iso];
  if (KEEP[iso]) rings = rings.filter((r) => KEEP[iso](r[0]));
  // Hors archipels : on écarte les îles lointaines (îles du Prince-Édouard pour l'Afrique du Sud…),
  // c'est-à-dire celles situées à plus de la moitié de la taille du territoire principal.
  if (!ARCHIPELS.includes(iso)) {
    const main = rings.reduce((a, b) => (area(b) > area(a) ? b : a));
    const bx = main.map((p) => p[0]), by = main.map((p) => p[1]);
    const [mx0, mx1, my0, my1] = [Math.min(...bx), Math.max(...bx), Math.min(...by), Math.max(...by)], size = Math.max(mx1 - mx0, my1 - my0);
    rings = rings.filter((r) => { const [x, y] = r[0]; return x > mx0 - 0.5 * size && x < mx1 + 0.5 * size && y > my0 - 0.5 * size && y < my1 + 0.5 * size; });
  }
  const all = rings.flat();
  const lat0 = all.reduce((s, p) => s + p[1], 0) / all.length, k = Math.cos((lat0 * Math.PI) / 180);
  const proj = rings.map((r) => r.map(([lon, lat]) => [lon * k, -lat]));
  const xs = proj.flat().map((p) => p[0]), ys = proj.flat().map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = 19 / Math.max(x1 - x0, y1 - y0), ox = 12 - ((x0 + x1) / 2) * s, oy = 12 - ((y0 + y1) / 2) * s;
  const shapes = [], dots = [];
  for (const r of proj) {
    const pts = r.map(([x, y]) => [x * s + ox, y * s + oy]);
    const a = area(pts);
    if (a < 0.6) { // petite île : un point
      const cx = pts.reduce((t, p) => t + p[0], 0) / pts.length, cy = pts.reduce((t, p) => t + p[1], 0) / pts.length;
      if (a > 0.02 || rings.length < 8) dots.push([cx, cy]);
      continue;
    }
    // Anneau fermé : on le coupe au point le plus éloigné du premier, et on simplifie chaque moitié.
    let far = 0, fd = 0; pts.forEach(([x, y], i) => { const dd = Math.hypot(x - pts[0][0], y - pts[0][1]); if (dd > fd) { fd = dd; far = i; } });
    const simple = [...dp(pts.slice(0, far + 1), 0.32).slice(0, -1), ...dp([...pts.slice(far), pts[0]], 0.32).slice(0, -1)];
    if (simple.length >= 3) shapes.push(simple);
  }
  const d = shapes.map((p) => "M" + p.map(([x, y]) => `${r2(x)} ${r2(y)}`).join("L") + "Z").join("");
  const dotSvg = (fill) => dots.map(([x, y]) => `<circle cx="${r2(x)}" cy="${r2(y)}" r="0.9" fill="${fill}" stroke="none"/>`).join("");
  const body = (d ? `<path d="${d}"/>` : "") + dotSvg("currentColor");
  // Version remplie : le territoire plein (contour arrondi compris), sans masque.
  const fill = (d ? `<path d="${d}" fill="currentColor"/>` : "") + dotSvg("currentColor");
  return { body, fill, parts: shapes.length, dots: dots.length };
}

const slug = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const de = (f) => f.fr.replace(/^Drapeau /, ""); // « du Cameroun », « de la Tunisie »…
const out = flags.map((f) => {
  const { body, fill, parts, dots } = draw(f.iso);
  return {
    id: "carte-" + slug(f.country.fr), iso: f.iso, country: f.country,
    fr: `Carte ${de(f)}`, en: `Map of ${f.en.replace(/^Flag of /, "")}`,
    cat: "cartes", region: f.region,
    tags: [...new Map(["carte", "map", "pays", "country", f.country.fr.toLowerCase(), f.country.en.toLowerCase(), f.iso, ...f.tags.filter((t) => !["drapeau", "flag"].includes(t))].map((t) => [t.toLowerCase(), t])).values()],
    since: "0.8", flag: f.id, body, fill, _parts: parts, _dots: dots,
  };
});
for (const c of out) if (!c.body) throw new Error(`carte vide : ${c.iso}`);
// Cartes retouchées à la main (audit des dessins) : elles remplacent le tracé généré.
const RETOUCHES = JSON.parse(readFileSync(join(root, "scripts/cartes-retouches.json"), "utf8"));
for (const c of out) if (RETOUCHES[c.id]) Object.assign(c, RETOUCHES[c.id]);
writeFileSync(join(root, "src/cartes.json"), JSON.stringify(out.map(({ _parts, _dots, ...c }) => c), null, 1) + "\n");
console.log(`✔ ${out.length} cartes → src/cartes.json`);
console.log(out.filter((c) => c._dots || c._parts > 1).map((c) => `${c.iso}:${c._parts}+${c._dots}·`).join(" "));
