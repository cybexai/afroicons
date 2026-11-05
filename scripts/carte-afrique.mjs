// Génère apps/web/src/data/carte-afrique.json : la carte de l'Afrique et de ses 54 pays, dans un même cadre,
// pour la carte cliquable de l'accueil.
//
//   node scripts/carte-afrique.mjs <chemin>/ne_50m_admin_0_countries.geojson
//
// Données : Natural Earth « Admin 0 – Countries » 1:50m (domaine public, naturalearthdata.com), non incluses
// dans le dépôt. Mêmes choix que les cartes de pays (scripts/cartes.mjs) : frontières de la liste des États
// membres de l'ONU, Somaliland rattaché à la Somalie. Les trous (enclaves) sont gardés : à tracer en evenodd. Le Sahara occidental est dessiné à part, en neutre et
// sans lien, pour que le continent reste entier. Projection équirectangulaire (l'Afrique est à cheval sur
// l'équateur : la déformation reste faible), simplification Douglas–Peucker.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = process.argv[2];
if (!src) { console.error("Usage : node scripts/carte-afrique.mjs <ne_50m_admin_0_countries.geojson>"); process.exit(1); }
const geo = JSON.parse(readFileSync(src, "utf8"));
const flags = JSON.parse(readFileSync(join(root, "src/flags.json"), "utf8")).filter((f) => f.iso);
const isoOf = (p) => (p.ISO_A2 && p.ISO_A2 !== "-99" ? p.ISO_A2 : p.ISO_A2_EH);
// Tous les anneaux : contours extérieurs et trous (le Lesotho, enclavé dans l'Afrique du Sud, en est un).
const ringsOf = (f) => (f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates).flat();
const byIso = {};
for (const f of geo.features) (byIso[isoOf(f.properties)] ??= []).push(...ringsOf(f));
const somaliland = geo.features.find((f) => /Somaliland/.test(f.properties.NAME ?? ""));
if (somaliland) byIso.SO.push(...ringsOf(somaliland));

// Îles lointaines laissées hors du cadre (comme sur les cartes de pays).
const KEEP = {
  SC: ([lon, lat]) => lon > 55 && lon < 56.2 && lat > -5.2 && lat < -3.5, // Mahé, Praslin, La Digue
  MU: ([lon]) => lon < 58, // île Maurice, sans Rodrigues ni Agaléga
  GQ: ([, lat]) => lat > -1, // sans Annobón
  ZA: ([, lat]) => lat > -40, // sans les îles du Prince-Édouard
};
// Petits États insulaires : un cercle cliquable autour, sinon on ne pourrait pas les viser.
const ISLANDS = ["CV", "KM", "ST", "SC", "MU"];

const LON0 = -26, LAT0 = 38, S = 11.5; // 1° = 11,5 unités
const prj = ([lon, lat]) => [(lon - LON0) * S, (LAT0 - lat) * S];
const r1 = (n) => Math.round(n * 10) / 10;
const area = (r) => { let s = 0; for (let i = 0; i < r.length; i++) { const [x1, y1] = r[i], [x2, y2] = r[(i + 1) % r.length]; s += x1 * y2 - x2 * y1; } return Math.abs(s / 2); };
function dp(pts, tol) {
  if (pts.length < 3) return pts;
  let max = 0, idx = 0; const [ax, ay] = pts[0], [bx, by] = pts[pts.length - 1];
  const L = Math.hypot(bx - ax, by - ay) || 1e-9;
  for (let i = 1; i < pts.length - 1; i++) { const d = Math.abs((bx - ax) * (ay - pts[i][1]) - (ax - pts[i][0]) * (by - ay)) / L; if (d > max) { max = d; idx = i; } }
  return max > tol ? [...dp(pts.slice(0, idx + 1), tol).slice(0, -1), ...dp(pts.slice(idx), tol)] : [pts[0], pts[pts.length - 1]];
}
function path(iso) {
  let rings = byIso[iso];
  if (!rings) throw new Error(`pays absent des données : ${iso}`);
  if (KEEP[iso]) rings = rings.filter((r) => KEEP[iso](r[0]));
  const parts = [], pts = [];
  for (const r of rings) {
    const p = r.map(prj);
    pts.push(...p);
    if (area(p) < 1.5 && !ISLANDS.includes(iso)) continue; // îlots invisibles à cette échelle
    let far = 0, fd = 0; p.forEach(([x, y], i) => { const d = Math.hypot(x - p[0][0], y - p[0][1]); if (d > fd) { fd = d; far = i; } });
    const s = [...dp(p.slice(0, far + 1), 0.7).slice(0, -1), ...dp([...p.slice(far), p[0]], 0.7).slice(0, -1)];
    if (s.length >= 3) parts.push("M" + s.map(([x, y]) => `${r1(x)} ${r1(y)}`).join("L") + "Z");
  }
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const box = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
  return { d: parts.join(""), box };
}

const countries = flags.map((f) => {
  const { d, box } = path(f.iso);
  const c = { iso: f.iso, d, flag: f.id };
  if (ISLANDS.includes(f.iso)) {
    const cx = (box[0] + box[2]) / 2, cy = (box[1] + box[3]) / 2;
    c.ring = [r1(cx), r1(cy), r1(Math.max(9, Math.hypot(box[2] - box[0], box[3] - box[1]) / 2 + 5))];
  }
  return c;
});
const other = [{ id: "EH", d: path("EH").d }];
const all = countries.flatMap((c) => c.d.match(/-?\d+(\.\d+)?/g).map(Number));
const W = Math.ceil(Math.max(...all.filter((_, i) => i % 2 === 0))) + 12, H = Math.ceil(Math.max(...all.filter((_, i) => i % 2 === 1))) + 12;
const out = { viewBox: `0 0 ${W} ${H}`, countries, other };
const file = join(root, "apps/web/src/data/carte-afrique.json");
writeFileSync(file, JSON.stringify(out) + "\n");
console.log(`✔ ${countries.length} pays → apps/web/src/data/carte-afrique.json (${(JSON.stringify(out).length / 1024).toFixed(0)} Ko, ${W}×${H})`);
