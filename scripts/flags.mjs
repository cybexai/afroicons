// Génère src/flags.json : les drapeaux des 54 États africains membres de l'ONU, aux couleurs officielles.
//
//   node scripts/flags.mjs
//
// Chaque drapeau est décrit ici avec quelques formes (bandes, étoiles, croissants, triangles), dans un cadre
// normalisé (u, v de 0 à 1), puis converti dans la grille 24 : un rectangle 22 × 15 aux coins arrondis.
// Les formes sont découpées ici, au calcul, dans ce rectangle arrondi : pas de clipPath ni d'identifiant dans le SVG,
// donc un drapeau s'affiche correctement même répété sur une page, dans un sprite caché ou un menu fermé.
// Les emblèmes complexes (armoiries, aigles, outils) sont simplifiés pour rester lisibles à 24 px.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const X0 = 1, Y0 = 4.5, W = 22, H = 15;
const r2 = (n) => Math.round(n * 100) / 100;
const px = (u) => r2(X0 + u * W), py = (v) => r2(Y0 + v * H);
const pt = ([u, v]) => `${px(u)} ${py(v)}`;

/* ---------- découpage dans le rectangle arrondi (Sutherland–Hodgman : le rectangle arrondi est convexe) ---------- */
const RX = 2;
const FRAME = (() => {
  const out = [], k = 8, cs = [[X0 + W - RX, Y0 + RX, -90], [X0 + W - RX, Y0 + H - RX, 0], [X0 + RX, Y0 + H - RX, 90], [X0 + RX, Y0 + RX, 180]];
  for (const [cx, cy, a0] of cs) for (let j = 0; j <= k; j++) { const a = ((a0 + (90 * j) / k) * Math.PI) / 180; out.push([cx + RX * Math.cos(a), cy + RX * Math.sin(a)]); }
  return out;
})();
/** Découpe un polygone (points en px) par un polygone convexe orienté dans le sens horaire (à l'écran). */
function clipTo(poly, win = FRAME) {
  let out = poly;
  for (let e = 0; e < win.length && out.length; e++) {
    const [ax, ay] = win[e], [bx, by] = win[(e + 1) % win.length];
    const side = ([x, y]) => (bx - ax) * (y - ay) - (by - ay) * (x - ax); // ≥ 0 : à l'intérieur
    const cut = (p, q) => { const sp = side(p), sq = side(q), t = sp / (sp - sq); return [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]; };
    const inp = out; out = [];
    for (let i = 0; i < inp.length; i++) {
      const p = inp[i], q = inp[(i + 1) % inp.length], ip = side(p) >= 0, iq = side(q) >= 0;
      if (ip) out.push(p);
      if (ip !== iq) out.push(cut(p, q));
    }
  }
  return out;
}
const shape = (pts, c, win) => { const q = clipTo(pts, win); return q.length < 3 ? "" : `<path d="M${q.map(([x, y]) => `${r2(x)} ${r2(y)}`).join("L")}Z" fill="${c}"/>`; };
const P = ([u, v]) => [X0 + u * W, Y0 + v * H];

/* ---------- formes (coordonnées normalisées, tailles en px) ---------- */
const rect = (u0, v0, u1, v1, c) => shape([[u0, v0], [u1, v0], [u1, v1], [u0, v1]].map(P), c);
const poly = (pts, c) => shape(pts.map(P), c);
const fill = (c) => rect(0, 0, 1, 1, c);
/** Barre épaisse d'un point à un autre (u, v), prolongée de `ext` px à chaque bout, découpée dans le cadre. */
function bar(a, b, w, c, ext = 0) {
  const [x1, y1] = P(a), [x2, y2] = P(b), L = Math.hypot(x2 - x1, y2 - y1), dx = (x2 - x1) / L, dy = (y2 - y1) / L, nx = (-dy * w) / 2, ny = (dx * w) / 2;
  const s = [x1 - dx * ext, y1 - dy * ext], e = [x2 + dx * ext, y2 + dy * ext];
  return shape([[s[0] + nx, s[1] + ny], [e[0] + nx, e[1] + ny], [e[0] - nx, e[1] - ny], [s[0] - nx, s[1] - ny]], c);
}
const circle = (u, v, r, c) => `<circle cx="${px(u)}" cy="${py(v)}" r="${r}" fill="${c}"/>`;
const ring = (u, v, r, c, w) => `<circle cx="${px(u)}" cy="${py(v)}" r="${r}" fill="none" stroke="${c}" stroke-width="${w}"/>`;
/** Bandes horizontales (de haut en bas) ou verticales (de gauche à droite), avec des proportions facultatives. */
const bands = (dir) => (cols, ws = cols.map(() => 1)) => {
  const t = ws.reduce((a, b) => a + b, 0);
  let acc = 0;
  return cols.map((c, k) => { const a = acc / t; acc += ws[k]; const b = acc / t; return dir === "h" ? rect(0, a, 1, b, c) : rect(a, 0, b, 1, c); }).join("");
};
const hs = bands("h"), vs = bands("v");
/** Étoile à n branches (5 par défaut), pointe en haut. */
function starPts(u, v, R, { n = 5, inner = 0.382, rot = 0 } = {}) {
  const cx = X0 + u * W, cy = Y0 + v * H, pts = [];
  for (let k = 0; k < n * 2; k++) {
    const a = ((rot - 90 + (k * 180) / n) * Math.PI) / 180, r = k % 2 ? R * inner : R;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts;
}
const star = (u, v, R, c, o) => `<path d="M${starPts(u, v, R, o).map(([x, y]) => `${r2(x)} ${r2(y)}`).join("L")}Z" fill="${c}"/>`;
/** Pentagramme au trait (Maroc, Éthiopie). */
function pentagram(u, v, R, c, w) {
  const cx = X0 + u * W, cy = Y0 + v * H;
  const p = [0, 2, 4, 1, 3].map((k) => { const a = ((-90 + k * 72) * Math.PI) / 180; return `${r2(cx + R * Math.cos(a))} ${r2(cy + R * Math.sin(a))}`; });
  return `<path d="M${p.join("L")}Z" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="miter"/>`;
}
/** Croissant : disque de rayon R moins un disque de rayon r décalé de d, ouvert dans la direction `deg` (0 = vers la droite). */
function crescent(u, v, R, r, d, deg, c) {
  const cx = X0 + u * W, cy = Y0 + v * H, a = (deg * Math.PI) / 180;
  const x = (R * R - r * r + d * d) / (2 * d), y = Math.sqrt(R * R - x * x);
  const rot = ([px_, py_]) => `${r2(cx + px_ * Math.cos(a) - py_ * Math.sin(a))} ${r2(cy + px_ * Math.sin(a) + py_ * Math.cos(a))}`;
  const large = x - d > 0 ? 1 : 0;
  return `<path d="M${rot([x, -y])}A${R} ${R} 0 1 0 ${rot([x, y])}A${r} ${r} 0 ${large} 1 ${rot([x, -y])}Z" fill="${c}"/>`;
}
/** Soleil : disque et rayons (étoile à n branches). */
const sun = (u, v, R, c, n = 12, core = R * 0.6) => star(u, v, R, c, { n, inner: 0.72 }) + circle(u, v, r2(core), c);
/** Bande diagonale du coin bas-gauche au coin haut-droit, demi-largeur en px. */
const diag = (half, c) => bar([0, 1], [1, 0], half * 2, c, 3);
const upperLeft = (c) => poly([[0, 0], [1, 0], [0, 1]], c), lowerRight = (c) => poly([[1, 0], [1, 1], [0, 1]], c);
/** Triangle au mât, pointe à `tip` (fraction de la largeur). */
const hoist = (tip, c) => poly([[0, 0], [tip, 0.5], [0, 1]], c);
/** Le « Y » de l'Afrique du Sud : deux bras depuis les coins du mât, réunis au tiers, puis une bande jusqu'au battant. */
const J = [(10.5 - X0) / W, 0.5];
const ySA = (w, c, ext) => bar([0, 0], J, w, c, ext) + bar([0, 1], J, w, c, ext) + bar(J, [1, 0.5], w, c, 3);
const line = (pts, c, w) => `<path d="M${pts.map(pt).join("L")}" fill="none" stroke="${c}" stroke-width="${w}"/>`;

/* ---------- les 54 drapeaux ---------- */
// [id (iso), nom FR, nom EN, région, mots-clés, corps]
const F = [
  ["dz", "Algérie", "Algeria", "nord", ["algérien", "algerian", "dzayer"], vs(["#006233", "#FFFFFF"]) + crescent(0.5, 0.5, 3.9, 3.1, 1.3, 0, "#D21034") + star(0.6, 0.5, 1.6, "#D21034", { rot: -18 })],
  ["ao", "Angola", "Angola", "centre", ["angolais", "angolan"], hs(["#CC092F", "#000000"]) + `<path d="M${px(0.38)} ${py(0.72)}A3.6 3.6 0 1 0 ${px(0.66)} ${py(0.3)}" fill="none" stroke="#FFCB00" stroke-width="1"/>` + line([[0.38, 0.36], [0.62, 0.74]], "#FFCB00", 1) + star(0.43, 0.38, 1.3, "#FFCB00")],
  ["bj", "Bénin", "Benin", "ouest", ["béninois", "beninese"], rect(0, 0, 0.4, 1, "#008751") + rect(0.4, 0, 1, 0.5, "#FCD116") + rect(0.4, 0.5, 1, 1, "#E8112D")],
  ["bw", "Botswana", "Botswana", "australe", ["botswanais", "motswana"], hs(["#75AADB", "#FFFFFF", "#000000", "#FFFFFF", "#75AADB"], [9, 1, 4, 1, 9])],
  ["bf", "Burkina Faso", "Burkina Faso", "ouest", ["burkinabè", "burkinabe", "faso"], hs(["#EF2B2D", "#009E49"]) + star(0.5, 0.5, 2.8, "#FCD116")],
  ["bi", "Burundi", "Burundi", "est", ["burundais", "burundian"], fill("#CE1126") + poly([[0, 0], [0.5, 0.5], [0, 1]], "#1EB53A") + poly([[1, 0], [0.5, 0.5], [1, 1]], "#1EB53A") + bar([0, 0], [1, 1], 2.2, "#FFFFFF", 3) + bar([0, 1], [1, 0], 2.2, "#FFFFFF", 3) + circle(0.5, 0.5, 4, "#FFFFFF") + [[0, -1.6], [-1.45, 0.95], [1.45, 0.95]].map(([dx, dy]) => star(0.5 + dx / W, 0.5 + dy / H, 1.05, "#CE1126", { n: 6, inner: 0.5 })).join("")],
  ["cv", "Cap-Vert", "Cabo Verde", "ouest", ["cap-verdien", "cape verdean", "cabo verde"], hs(["#003893", "#FFFFFF", "#CF2027", "#FFFFFF", "#003893"], [6, 1, 1, 1, 3]) + Array.from({ length: 10 }, (_, k) => { const a = (k * 36 - 90) * Math.PI / 180; return star(0.375 + (3.6 * Math.cos(a)) / W, 0.625 + (3.6 * Math.sin(a)) / H, 0.75, "#F7D116"); }).join("")],
  ["cm", "Cameroun", "Cameroon", "centre", ["camerounais", "cameroonian", "kamerun"], vs(["#007A5E", "#CE1126", "#FCD116"]) + star(0.5, 0.5, 2.4, "#FCD116")],
  ["cf", "Centrafrique", "Central African Republic", "centre", ["centrafricain", "rca", "car"], hs(["#003082", "#FFFFFF", "#289728", "#FFCE00"]) + rect(0.42, 0, 0.58, 1, "#D21034") + star(0.16, 0.125, 1.3, "#FFCE00")],
  ["td", "Tchad", "Chad", "centre", ["tchadien", "chadian"], vs(["#002664", "#FECB00", "#C60C30"])],
  ["km", "Comores", "Comoros", "est", ["comorien", "comorian", "komori"], hs(["#FFC61E", "#FFFFFF", "#CE1126", "#3A75C4"]) + hoist(0.42, "#3D8E33") + crescent(0.14, 0.5, 3, 2.5, 1, 0, "#FFFFFF") + [0.33, 0.44, 0.56, 0.67].map((v) => star(0.205, v, 0.5, "#FFFFFF")).join("")],
  ["cg", "Congo", "Republic of the Congo", "centre", ["congolais", "brazzaville", "congolese"], upperLeft("#009543") + lowerRight("#DC241F") + diag(2.9, "#FBDE4A")],
  ["cd", "RD Congo", "DR Congo", "centre", ["congolais", "kinshasa", "rdc", "drc"], fill("#007FFF") + diag(2.6, "#F7D618") + diag(1.85, "#CE1021") + star(0.17, 0.25, 2.4, "#F7D618")],
  ["ci", "Côte d'Ivoire", "Côte d'Ivoire", "ouest", ["ivoirien", "ivorian", "ivory coast"], vs(["#F77F00", "#FFFFFF", "#009E60"])],
  ["dj", "Djibouti", "Djibouti", "est", ["djiboutien", "djiboutian"], hs(["#6AB2E7", "#12AD2B"]) + hoist(0.46, "#FFFFFF") + star(0.14, 0.5, 1.7, "#D7141A")],
  ["eg", "Égypte", "Egypt", "nord", ["égyptien", "egyptian", "misr"], hs(["#CE1126", "#FFFFFF", "#000000"]) + `<path d="M10 10.6L12 11.2L14 10.6L13.3 12.4L12.6 12.2V13.6H11.4V12.2L10.7 12.4Z" fill="#C09300"/>`],
  ["gq", "Guinée équatoriale", "Equatorial Guinea", "centre", ["équato-guinéen", "equatoguinean"], hs(["#3E9A00", "#FFFFFF", "#E32118"]) + hoist(0.22, "#0073CE") + `<path d="M11.2 10.6H12.8V12.4A.8 .8 0 0 1 11.2 12.4Z" fill="#A7A7A7"/>`],
  ["er", "Érythrée", "Eritrea", "est", ["érythréen", "eritrean"], hs(["#12AD2B", "#4189DD"]) + poly([[0, 0], [1, 0.5], [0, 1]], "#EA0437") + ring(0.22, 0.5, 2.7, "#FFC726", 0.7) + line([[0.22, 0.38], [0.22, 0.66]], "#FFC726", 0.6)],
  ["sz", "Eswatini", "Eswatini", "australe", ["swazi", "swaziland", "eswatini"], hs(["#3E5EB9", "#FFD900", "#B10C0C", "#FFD900", "#3E5EB9"], [3, 1, 8, 1, 3]) + line([[0.18, 0.5], [0.82, 0.5]], "#FFD900", 0.5) + `<ellipse cx="12" cy="12" rx="4.6" ry="2.4" fill="#FFFFFF"/><path d="M12 9.6A4.6 2.4 0 0 1 12 14.4Z" fill="#000000"/>`],
  ["et", "Éthiopie", "Ethiopia", "est", ["éthiopien", "ethiopian", "abyssinie"], hs(["#078930", "#FCDD09", "#DA121A"]) + circle(0.5, 0.5, 4.3, "#0F47AF") + pentagram(0.5, 0.52, 3, "#FCDD09", 0.6)],
  ["ga", "Gabon", "Gabon", "centre", ["gabonais", "gabonese"], hs(["#009E60", "#FCD116", "#3A75C4"])],
  ["gm", "Gambie", "The Gambia", "ouest", ["gambien", "gambian"], hs(["#CE1126", "#FFFFFF", "#0C1C8C", "#FFFFFF", "#3A7728"], [6, 1, 4, 1, 6])],
  ["gh", "Ghana", "Ghana", "ouest", ["ghanéen", "ghanaian"], hs(["#CE1126", "#FCD116", "#006B3F"]) + star(0.5, 0.5, 2.5, "#000000")],
  ["gn", "Guinée", "Guinea", "ouest", ["guinéen", "guinean", "conakry"], vs(["#CE1126", "#FCD116", "#009460"])],
  ["gw", "Guinée-Bissau", "Guinea-Bissau", "ouest", ["bissau-guinéen", "bissau-guinean"], rect(0, 0, 1 / 3, 1, "#CE1126") + rect(1 / 3, 0, 1, 0.5, "#FCD116") + rect(1 / 3, 0.5, 1, 1, "#009E49") + star(1 / 6, 0.5, 2.2, "#000000")],
  ["ke", "Kenya", "Kenya", "est", ["kényan", "kenyan", "maasai"], hs(["#000000", "#FFFFFF", "#BB0000", "#FFFFFF", "#006600"], [6, 1, 6, 1, 6]) + line([[0.38, 0.86], [0.62, 0.14]], "#FFFFFF", 0.5) + line([[0.62, 0.86], [0.38, 0.14]], "#FFFFFF", 0.5) + `<ellipse cx="12" cy="12" rx="2.1" ry="4.9" fill="#000000"/><ellipse cx="12" cy="12" rx="1.05" ry="4.9" fill="#BB0000"/><ellipse cx="12" cy="12" rx=".35" ry="1.3" fill="#FFFFFF"/>`],
  ["ls", "Lesotho", "Lesotho", "australe", ["lesothan", "basotho", "mokorotlo"], hs(["#00209F", "#FFFFFF", "#009543"], [3, 4, 3]) + `<path d="M9.3 13.3H14.7L12 9.6Z" fill="#000000"/><path d="M8.8 13.3Q12 14.4 15.2 13.3" fill="none" stroke="#000000" stroke-width=".6"/><circle cx="12" cy="9.3" r=".45" fill="#000000"/>`],
  ["lr", "Liberia", "Liberia", "ouest", ["libérien", "liberian", "lone star"], hs(Array.from({ length: 11 }, (_, k) => (k % 2 ? "#FFFFFF" : "#BF0A30"))) + rect(0, 0, (H * 5) / 11 / W, 5 / 11, "#002868") + star((H * 5) / 11 / W / 2, 2.5 / 11, 2.3, "#FFFFFF")],
  ["ly", "Libye", "Libya", "nord", ["libyen", "libyan"], hs(["#E70013", "#000000", "#239E46"], [1, 2, 1]) + crescent(0.46, 0.5, 2.7, 2.2, 0.9, 0, "#FFFFFF") + star(0.555, 0.5, 1, "#FFFFFF", { rot: -18 })],
  ["mg", "Madagascar", "Madagascar", "est", ["malgache", "malagasy"], rect(0, 0, 1 / 3, 1, "#FFFFFF") + rect(1 / 3, 0, 1, 0.5, "#FC3D32") + rect(1 / 3, 0.5, 1, 1, "#007E3A")],
  ["mw", "Malawi", "Malawi", "australe", ["malawite", "malawian"], hs(["#000000", "#CE1126", "#339E35"]) + shape(starPts(0.5, 1 / 3, 3.2, { n: 16, inner: 0.72 }), "#CE1126", [P([0, 0]), P([1, 0]), P([1, 1 / 3]), P([0, 1 / 3])]) + `<path d="M10.1 9.5A1.9 1.9 0 0 1 13.9 9.5Z" fill="#CE1126"/>`],
  ["ml", "Mali", "Mali", "ouest", ["malien", "malian"], vs(["#14B53A", "#FCD116", "#CE1126"])],
  ["mr", "Mauritanie", "Mauritania", "ouest", ["mauritanien", "mauritanian"], hs(["#D01C1F", "#00A95C", "#D01C1F"], [3, 14, 3]) + crescent(0.5, 0.55, 3.6, 3, 1.2, -90, "#FFD700") + star(0.5, 0.36, 1.3, "#FFD700")],
  ["mu", "Maurice", "Mauritius", "est", ["mauricien", "mauritian"], hs(["#EA2839", "#1A206D", "#FFD500", "#00A551"])],
  ["ma", "Maroc", "Morocco", "nord", ["marocain", "moroccan", "maghreb"], fill("#C1272D") + pentagram(0.5, 0.53, 3.6, "#006233", 0.8)],
  ["mz", "Mozambique", "Mozambique", "australe", ["mozambicain", "mozambican"], hs(["#007168", "#FFFFFF", "#000000", "#FFFFFF", "#FCE100"], [6, 1, 6, 1, 6]) + hoist(0.46, "#D21034") + star(0.155, 0.5, 2.6, "#FCE100")],
  ["na", "Namibie", "Namibia", "australe", ["namibien", "namibian"], upperLeft("#003580") + lowerRight("#009543") + diag(2.9, "#FFFFFF") + diag(2.1, "#D21034") + sun(0.2, 0.28, 2.4, "#FFCE00", 12, 1.3)],
  ["ne", "Niger", "Niger", "ouest", ["nigérien", "nigerien"], hs(["#E05206", "#FFFFFF", "#0DB02B"]) + circle(0.5, 0.5, 1.9, "#E05206")],
  ["ng", "Nigeria", "Nigeria", "ouest", ["nigérian", "nigerian", "naija"], vs(["#008751", "#FFFFFF", "#008751"])],
  ["ug", "Ouganda", "Uganda", "est", ["ougandais", "ugandan"], hs(["#000000", "#FCDC04", "#D90000", "#000000", "#FCDC04", "#D90000"]) + circle(0.5, 0.5, 3.6, "#FFFFFF") + `<path d="M11 14.4L11.6 12.6Q10.4 11.6 11.4 10.4L12.2 9.8L12.4 9" fill="none" stroke="#000000" stroke-width=".7"/><ellipse cx="12.2" cy="12.4" rx="1.1" ry="1.5" fill="#9CA6AD"/><circle cx="12.6" cy="9" r=".55" fill="#000000"/><circle cx="12.9" cy="8.4" r=".35" fill="#FCDC04"/><path d="M12.9 9.2L13.8 9.4" stroke="#D90000" stroke-width=".4"/>`],
  ["rw", "Rwanda", "Rwanda", "est", ["rwandais", "rwandan"], hs(["#00A1DE", "#FAD201", "#20603D"], [2, 1, 1]) + sun(0.86, 0.26, 2.2, "#E5BE01", 24, 1.2) + ring(0.86, 0.26, 1.15, "#00A1DE", 0.3)],
  ["st", "Sao Tomé-et-Principe", "São Tomé and Príncipe", "centre", ["santoméen", "sao tome", "principe"], hs(["#12AD2B", "#FFCE00", "#12AD2B"], [2, 3, 2]) + hoist(0.25, "#D21034") + star(0.5, 0.5, 1.7, "#000000") + star(0.73, 0.5, 1.7, "#000000")],
  ["sn", "Sénégal", "Senegal", "ouest", ["sénégalais", "senegalese", "teranga"], vs(["#00853F", "#FDEF42", "#E31B23"]) + star(0.5, 0.5, 2.2, "#00853F")],
  ["sc", "Seychelles", "Seychelles", "est", ["seychellois", "seychelles"], poly([[0, 1], [0, 0], [1 / 3, 0]], "#003F87") + poly([[0, 1], [1 / 3, 0], [2 / 3, 0]], "#FCD856") + poly([[0, 1], [2 / 3, 0], [1, 0], [1, 1 / 3]], "#D62828") + poly([[0, 1], [1, 1 / 3], [1, 2 / 3]], "#FFFFFF") + poly([[0, 1], [1, 2 / 3], [1, 1]], "#007A3D")],
  ["sl", "Sierra Leone", "Sierra Leone", "ouest", ["sierraléonais", "sierra leonean", "salone"], hs(["#1EB53A", "#FFFFFF", "#0072C6"])],
  ["so", "Somalie", "Somalia", "est", ["somalien", "somali"], fill("#4189DD") + star(0.5, 0.52, 3.6, "#FFFFFF")],
  ["za", "Afrique du Sud", "South Africa", "australe", ["sud-africain", "south african", "rainbow nation", "mzansi"], hs(["#E03C31", "#001489"]) + ySA(5.4, "#FFFFFF", 2) + ySA(3.2, "#007749", 1.2) + `<path d="M1 6.6L7.9 12L1 17.4Z" fill="#FFB81C"/><path d="M1 7.9L6.25 12L1 16.1Z" fill="#000000"/>`],
  ["ss", "Soudan du Sud", "South Sudan", "est", ["sud-soudanais", "south sudanese"], hs(["#000000", "#FFFFFF", "#DA121A", "#FFFFFF", "#078930"], [6, 1, 6, 1, 6]) + hoist(0.38, "#0F47AF") + star(0.115, 0.5, 1.8, "#FCDD09")],
  ["sd", "Soudan", "Sudan", "nord", ["soudanais", "sudanese", "khartoum"], hs(["#D21034", "#FFFFFF", "#000000"]) + hoist(1 / 3, "#007229")],
  ["tz", "Tanzanie", "Tanzania", "est", ["tanzanien", "tanzanian", "zanzibar"], upperLeft("#1EB53A") + lowerRight("#00A3DD") + diag(3.1, "#FCD116") + diag(2.2, "#000000")],
  ["tg", "Togo", "Togo", "ouest", ["togolais", "togolese"], hs(["#006A4E", "#FFCE00", "#006A4E", "#FFCE00", "#006A4E"]) + rect(0, 0, 9 / W, 0.6, "#D21034") + star(4.5 / W, 0.3, 2.6, "#FFFFFF")],
  ["tn", "Tunisie", "Tunisia", "nord", ["tunisien", "tunisian"], fill("#E70013") + circle(0.5, 0.5, 4.4, "#FFFFFF") + crescent(0.48, 0.5, 3.4, 2.75, 1.05, 0, "#E70013") + star(0.545, 0.5, 1.6, "#E70013", { rot: -18 })],
  ["zm", "Zambie", "Zambia", "australe", ["zambien", "zambian"], fill("#198A00") + rect(0.61, 0.375, 0.74, 1, "#DE2010") + rect(0.74, 0.375, 0.87, 1, "#000000") + rect(0.87, 0.375, 1, 1, "#EF7D00") + `<path d="M15.6 8.4Q17.8 9.6 19.3 8.6Q20.8 9.6 23 8.4" fill="none" stroke="#EF7D00" stroke-width=".9"/><circle cx="19.3" cy="9.3" r=".55" fill="#EF7D00"/>`],
  ["zw", "Zimbabwe", "Zimbabwe", "australe", ["zimbabwéen", "zimbabwean"], hs(["#006400", "#FFD200", "#D40000", "#000000", "#D40000", "#FFD200", "#006400"]) + hoist(0.45, "#000000") + poly([[0, 0.07], [0.405, 0.5], [0, 0.93]], "#FFFFFF") + star(0.13, 0.5, 2.1, "#D40000") + `<path d="M3.5 10.8H4.7L5.1 13.4H3.9Z" fill="#FFD200"/>`],
];

// Les drapeaux à fond blanc ou très clair gardent un fin liseré pour se détacher d'un fond clair.
const OUTLINE = `<rect x="1.25" y="4.75" width="21.5" height="14.5" rx="1.75" fill="none" stroke="#000000" stroke-opacity=".14" stroke-width=".5"/>`;
const slug = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const flags = F.map(([iso, fr, en, region, tags, shapes]) => {
  const id = "drapeau-" + slug(fr);
  const body = `<g stroke="none" stroke-linecap="butt">${shapes}</g>${OUTLINE}`;
  return { id, iso: iso.toUpperCase(), fr: `Drapeau ${de(fr)}`, en: `Flag of ${en.startsWith("The ") || /^(DR|Central|Republic|Seychelles|Comoros)/.test(en) ? "the " + en.replace(/^The /, "") : en}`, country: { fr, en }, cat: "drapeaux", region, tags: ["drapeau", "flag", fr.toLowerCase(), en.toLowerCase(), iso, ...tags], since: "0.6", body, fill: body };
});

/** « du Cameroun », « de la Tunisie », « de l'Algérie », « des Comores »… */
function de(fr) {
  const PL = ["Comores", "Seychelles"], M = ["Cameroun", "Bénin", "Botswana", "Burkina Faso", "Burundi", "Cap-Vert", "Tchad", "Congo", "Gabon", "Ghana", "Kenya", "Lesotho", "Liberia", "Malawi", "Mali", "Maroc", "Mozambique", "Niger", "Nigeria", "Rwanda", "Sénégal", "Soudan", "Soudan du Sud", "Togo", "Zimbabwe", "Swaziland", "Eswatini"];
  if (PL.includes(fr)) return "des " + fr;
  if (/^[AEÉIOUÔ]/.test(fr)) return "de l'" + fr;
  if (fr === "Centrafrique") return "de la Centrafrique";
  if (fr === "RD Congo") return "de la RD Congo";
  if (fr === "Madagascar" || fr === "Djibouti" || fr === "Sao Tomé-et-Principe" || fr === "Maurice") return "de " + fr;
  if (M.includes(fr)) return "du " + fr;
  return "de la " + fr;
}

if (flags.length !== 54 || new Set(flags.map((f) => f.id)).size !== 54) throw new Error(`54 drapeaux attendus, ${flags.length} obtenus`);
writeFileSync(join(root, "src/flags.json"), JSON.stringify(flags, null, 1) + "\n");
console.log(`✔ ${flags.length} drapeaux → src/flags.json`);
