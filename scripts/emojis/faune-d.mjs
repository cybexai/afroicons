// Emojis faune d'Afrique (lot D) : reptiles, insectes, mers et fleuves, animaux domestiques (dessins originaux Afroicons).
// Animaux vus de profil, tête à gauche (ou de dessus pour les insectes et la vipère), couleur à plat et contour brun foncé.
import { O, W, C, path, circle, ellipse, rect, line, g, tear } from "./lib.mjs";

/** Trait épais « plein » : contour brun puis couleur par-dessus (cous, queues, pattes fines). */
const thick = (d, col, w = 1.5) => line(d, O, w + 2 * W) + line(d, col, w);
const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const eye = (x, y, r = 0.55) => circle(x, y, r, O, false);
/** Patte droite arrondie, avec sabot ou pied d'une autre couleur. */
const leg = (x, top, bottom, w, fill, foot, fh = 1.2) => rect(x, top, w, bottom - top, w / 2.2, fill) + (foot ? rect(x, bottom - fh, w, fh, 0.4, foot, { w: 0.8 }) : "");
/** Miroir horizontal d'un tracé en coordonnées absolues (M L C Q H V Z) : aile droite à partir de l'aile gauche. */
const mx = (d) => d.replace(/([MLCQHV])([^MLCQHVZ]*)/g, (_, c, args) => {
  const n = args.trim().split(/[\s,]+/).filter(Boolean).map(Number);
  if (c === "V") return c + n.join(" ");
  if (c === "H") return c + n.map((v) => Math.round((24 - v) * 100) / 100).join(" ");
  return c + n.map((v, i) => (i % 2 === 0 ? Math.round((24 - v) * 100) / 100 : v)).join(" ");
});
/** Corps de serpent (ou de varan) : contour fermé d'un tube qui suit une ligne lissée, demi-largeur variable. */
const rd = (v) => Math.round(v * 100) / 100;
const crSeg = (p) => { let s = ""; for (let i = 0; i < p.length - 1; i++) { const a = p[i - 1] ?? p[i], b = p[i], c = p[i + 1], d = p[i + 2] ?? c;
  s += `C${rd(b[0] + (c[0] - a[0]) / 6)} ${rd(b[1] + (c[1] - a[1]) / 6)} ${rd(c[0] - (d[0] - b[0]) / 6)} ${rd(c[1] - (d[1] - b[1]) / 6)} ${rd(c[0])} ${rd(c[1])}`; } return s; };
const crAt = (p, i, t) => { const a = p[i - 1] ?? p[i], b = p[i], c = p[i + 1], d = p[i + 2] ?? c;
  return [0, 1].map((k) => 0.5 * (2 * b[k] + (-a[k] + c[k]) * t + (2 * a[k] - 5 * b[k] + 4 * c[k] - d[k]) * t * t + (-a[k] + 3 * b[k] - 3 * c[k] + d[k]) * t * t * t)); };
function tube(pts, ws, sub = 3) {
  const c = [], w = [];
  for (let i = 0; i < pts.length - 1; i++) for (let j = 0; j < sub; j++) { const t = j / sub; c.push(crAt(pts, i, t)); w.push(ws[i] + (ws[i + 1] - ws[i]) * t); }
  c.push(pts.at(-1)); w.push(ws.at(-1));
  const tn = c.map((p, i) => { const a = c[Math.max(0, i - 1)], b = c[Math.min(c.length - 1, i + 1)], l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1; return [(b[0] - a[0]) / l, (b[1] - a[1]) / l]; });
  const L = c.map((p, i) => [p[0] - tn[i][1] * w[i], p[1] + tn[i][0] * w[i]]), R = c.map((p, i) => [p[0] + tn[i][1] * w[i], p[1] - tn[i][0] * w[i]]);
  const n = c.length - 1, k = 1.33, cap = (A, B, t, ww) => (ww > 0.15 ? `C${rd(A[0] + t[0] * ww * k)} ${rd(A[1] + t[1] * ww * k)} ${rd(B[0] + t[0] * ww * k)} ${rd(B[1] + t[1] * ww * k)} ${rd(B[0])} ${rd(B[1])}` : "");
  return `M${rd(L[0][0])} ${rd(L[0][1])}` + crSeg(L) + cap(L[n], R[n], tn[n], w[n]) + crSeg([...R].reverse()) + cap(R[0], L[0], tn[0].map((v) => -v), w[0]) + "Z";
}

/** Patte effilée (genou ou jarret au milieu) qui s'affine vers le sabot. */
const limb = (pts, ws, fill, hoof) => path(tube(pts, ws), fill, { w: 0.95 }) + (hoof ? path(`M${rd(pts.at(-1)[0] - ws.at(-1) - 0.15)} ${rd(pts.at(-1)[1] - 0.9)}H${rd(pts.at(-1)[0] + ws.at(-1) + 0.15)}L${rd(pts.at(-1)[0] + ws.at(-1) + 0.3)} ${rd(pts.at(-1)[1] + 0.5)}H${rd(pts.at(-1)[0] - ws.at(-1) - 0.3)}Z`, hoof, { w: 0.8 }) : "");

/* ---------- mamba noir : corps fin gris olive, tête « cercueil », gueule ouverte noire ---------- */
const MAMBA = "#6F6B5C", MAMBA_BELLY = "#B9B39B", MAMBA_MOUTH = "#15100C";
const mambaNoir = [
  thick("M9.8 7.6C12.8 8.8 13.2 12.2 11.2 14.4C9.2 16.6 9.2 20 12.2 20.4C15.2 20.8 16 17 18.8 17C21 17 22 19 22.4 21.4", MAMBA, 1.8),
  line("M11.4 9.6Q12.4 11.4 11.8 13", MAMBA_BELLY, 0.6),
  // mâchoire inférieure, intérieur de la gueule noir d'encre, tête allongée
  path("M10.4 7.8L3 10.4Q2.4 11.6 3.8 11.6L9.4 10.6Q11 10 10.4 7.8Z", MAMBA_BELLY),
  path("M10.2 7.4L2.4 6.8L3.2 10.6Z", MAMBA_MOUTH, { w: 0.8 }),
  path("M11 6.6Q11.2 3.6 8 3.4L4.6 3.4Q1.8 3.6 1.8 5.8Q1.8 6.8 2.6 7.2L9.6 7.8Q11 7.8 11 6.6Z", MAMBA),
  circle(6.6, 5.1, 0.9, "#D8D2B8", { w: 0.6 }), eye(6.6, 5.1, 0.5),
].join("");

/* ---------- python de Seba : corps épais enroulé en anneau, selles brunes, cou relevé ---------- */
const PY = "#C2A46A", PY_DARK = "#5E4228", PY_EDGE = "#8A6A3E", PY_HOLE = "#7A5A34";
const pythonSeba = [
  ellipse(12.8, 16.4, 9.4, 5.4, PY),
  // tour intérieur de l'anneau
  path("M17.8 16.6C17.8 18.4 15.4 19.2 12.6 19.2C9.6 19.2 7.6 18.2 7.6 16.6C7.6 15 9.8 13.8 12.8 13.8C15.2 13.8 16.6 14.6 16.4 15.8", PY_HOLE, { w: 0.9 }),
  line("M16.4 15.8Q14.6 16.6 12.4 16.4", PY_DARK, 0.7),
  ...[[16, 11.9, 1.5, 0.9], [20.6, 14.6, 1.1, 1.3], [20, 19.4, 1.3, 1], [13.6, 21, 1.6, 0.8], [6.6, 19.6, 1.4, 1]].map(([x, y, rx, ry]) => ellipse(x, y, rx, ry, PY_DARK, { c: PY_EDGE, w: 0.5 })),
  // cou épais relevé
  path("M10.6 12.6V8.4H14.6V12.6Q12.6 13.6 10.6 12.6Z", PY),
  ellipse(12.6, 10.6, 1.3, 0.9, PY_DARK, { c: PY_EDGE, w: 0.5 }),
  line("M5.6 8H4.2M4.2 8L3.4 7.2M4.2 8L3.4 8.8", "#B95A86", 0.6),
  path("M10.6 9.4L6.6 9.2C5.2 9.1 4.8 7.6 5.9 6.9L9.6 5.2C11.8 4.4 14.6 5.2 14.6 7.6V9.4Z", PY),
  path("M6.4 7.4L11.4 6.2L13.6 7.4L11.4 8.4Z", PY_DARK, false),
  circle(10, 6.6, 0.65, C.ocreLight, { w: 0.5 }), eye(10, 6.6, 0.34),
].join("");

/* ---------- vipère du Gabon : vue de dessus, tête énorme, motif géométrique ---------- */
const VIP = "#D7C29A", VIP_DARK = "#5B3E2B", VIP_PURPLE = "#8E6E8C", VIP_HEAD = "#EFE4C8";
const vipPts = [[2.2, 6.6], [4, 6.6], [6.4, 6.6], [8.6, 6.8], [11, 6.6], [14.8, 5.8], [18.6, 7], [19.8, 10.6], [17.2, 13.2], [12.6, 14], [9, 16], [9.2, 19.4], [13.2, 21], [17.6, 20.6], [20.8, 19.2]];
const vipereGabon = [
  path(tube(vipPts, [1.2, 2.6, 3.0, 1.45, 1.85, 2.2, 2.3, 2.3, 2.3, 2.2, 2.2, 2.1, 1.8, 1.1, 0.15]), VIP),
  // sabliers bruns et losanges violacés le long du dos
  ...[[12.6, 6.4, -10], [17.4, 6.9, 20], [19.6, 10.4, 90], [15, 13.7, 170], [10.6, 15, 135], [9.4, 18.6, 70], [14.6, 21, 0]].map(([x, y, a]) =>
    g(`rotate(${a} ${x} ${y})`, path(`M${x - 1.3} ${y - 1.1}L${x + 1.3} ${y - 1.1}L${x + 0.5} ${y}L${x + 1.3} ${y + 1.1}L${x - 1.3} ${y + 1.1}L${x - 0.5} ${y}Z`, VIP_DARK, { w: 0.5 }))),
  ...[[15.1, 6.1], [19, 8.6], [17.2, 13.6], [12.6, 14], [9, 16.8], [11.6, 20.8]].map(([x, y]) => circle(x, y, 0.55, VIP_PURPLE, false)),
  // tête pâle, trait brun central, petites cornes du museau
  path("M10 1.8Q10.8 6.6 10 11.4Q5.6 10.4 2.2 7.4Q1.4 6.6 2.2 5.8Q5.6 2.8 10 1.8Z", VIP_HEAD),
  line("M3 6.6H9.4", VIP_DARK, 0.8),
  path("M9.6 3.2L6.8 4.2L9.6 5.2Z", VIP_DARK, false), path("M9.6 10L6.8 9L9.6 8Z", VIP_DARK, false),
  path("M2.6 5.8L1.6 5.4L2 6.4Z", VIP_DARK, { w: 0.5 }), path("M2.6 7.4L1.6 7.8L2 6.8Z", VIP_DARK, { w: 0.5 }),
  eye(5.4, 4.8, 0.55), eye(5.4, 8.4, 0.55),
].join("");

/* ---------- cobra cracheur rouge : capuchon déployé derrière une petite tête, corps au sol, jet de venin ---------- */
const COB = "#D8714C", COB_DARK = "#A9502F", COB_LIGHT = "#F2B08E";
const cobraCracheur = [
  path("M10.6 16.4C10.2 19 11 21 13.6 21H19.6C21.6 21 22.4 19.2 21.2 18L18.6 18.6H14.8C13.6 18.6 13.2 17.8 13.4 16.4Z", COB),
  line("M15 19.8H19.6", COB_DARK, 0.6),
  path("M12 2.4C14 2.4 14.8 3.8 14.4 5.2C17.8 4.8 20.8 6.8 20.8 9.8C20.8 12.8 17 14 13.6 16.8H10.4C7 14 3.2 12.8 3.2 9.8C3.2 6.8 6.2 4.8 9.6 5.2C9.2 3.8 10 2.4 12 2.4Z", COB),
  path("M10.4 16.4Q12 9.6 13.6 16.4Z", COB_LIGHT, false),
  // collier noir sous la gorge
  path("M9.2 13.4H14.8L14 15H10Z", C.noir, { w: 0.6 }),
  path("M9.8 6.8C9.2 4.4 10 2.6 12 2.6S14.8 4.4 14.2 6.8Q12 7.8 9.8 6.8Z", COB_DARK),
  eye(11, 4.6, 0.5), eye(13, 4.6, 0.5),
  // gouttes de venin projetées
  tear(6.8, 0.8, 0.6), tear(4.4, 1.8, 0.65), tear(2.2, 3.8, 0.55),
].join("");

/* ---------- varan du Nil : olive sombre, bandes de points jaunes, langue fourchue ---------- */
const VAR = "#556039", VAR_DARK = "#3C4528", VAR_SPOT = "#E2CC5C", VAR_TONGUE = "#B95A86";
const varanNil = [
  thick("M12 12L13 14.8H14.6", VAR_DARK, 1.1), thick("M18.2 13L19.2 15.4H20.8", VAR_DARK, 1),
  path(tube([[3.2, 9.4], [5.2, 9.4], [7.6, 10.4], [10.4, 10.8], [13.6, 10.8], [16.4, 11.2], [19.2, 12.4], [21.2, 14.4], [22.2, 17]], [0.65, 1.3, 1.0, 1.8, 1.9, 1.5, 1.05, 0.6, 0.12]), VAR),
  dots([[9.6, 10.2], [11.4, 9.7], [13.2, 9.7], [15, 10], [10.6, 11.8], [12.6, 11.8], [14.6, 12], [16.8, 11.2], [18.6, 12.2], [20.2, 13.6]], 0.42, VAR_SPOT),
  line("M3.4 10.2L1.3 9.4M2.2 9.8L1.3 10.6", VAR_TONGUE, 0.55),
  thick("M9.8 12.2L8.4 15.2H6.4", VAR, 1.25), thick("M16 12.6L17 15.6H18.8", VAR, 1.2),
  circle(5.4, 8.9, 0.75, VAR_SPOT, { w: 0.5 }), eye(5.4, 8.9, 0.4),
].join("");

/* ---------- scorpion : couleur paille, pinces, queue arquée et dard ---------- */
const SCO = "#DDA845", SCO_DARK = "#A8742A", SCO_STING = "#4E3018";
const scorpion = [
  thick("M9.8 12.4L6.6 12.6L4.8 14.6M9.8 14.4L7 15.8L6 18.2M14.2 12.4L17.4 12.6L18.6 13.8M10.4 16.2L8.8 18.6L8.8 20.6", SCO_DARK, 0.7),
  // queue segmentée qui s'enroule sur le côté
  thick("M12 17C12 19.8 14 21.4 16.8 20.8C19.8 20.2 21 17.4 20.4 14.4C20 12.4 18.6 11.2 16.8 11.4", SCO, 1.8),
  line("M13.4 20.2L14 19.2M16.4 20.8L16.4 19.6M19 19.4L18.2 18.8M20.4 16.4L19.4 16.2M20 13.4L19.2 13.8", SCO_DARK, 0.6),
  path("M16.8 10.6Q14.8 10.8 14.8 12.8L15.8 12.2Q15.8 11.6 17.2 11.8Z", SCO_STING, { w: 0.7 }),
  // bras et pinces
  thick("M10.6 10.4L7.6 8.4M13.4 10.4L16.4 8.4", SCO, 1.2),
  path("M7.6 8.6C4.8 8.4 3.4 5.6 5.2 3.2L6.4 5.4L7.8 4C9.2 5.8 9.2 8 7.6 8.6Z", SCO),
  path("M16.4 8.6C19.2 8.4 20.6 5.6 18.8 3.2L17.6 5.4L16.2 4C14.8 5.8 14.8 8 16.4 8.6Z", SCO),
  // corps
  path("M12 9.2C13.8 9.2 14.8 10.8 14.8 13.2C14.8 15.6 13.6 17.4 12 17.4C10.4 17.4 9.2 15.6 9.2 13.2C9.2 10.8 10.2 9.2 12 9.2Z", SCO),
  line("M9.6 12.4Q12 13.2 14.4 12.4M9.6 14.4Q12 15.2 14.4 14.4", SCO_DARK, 0.6),
  eye(11.3, 10.3, 0.4), eye(12.7, 10.3, 0.4),
].join("");

/* ---------- criquet pèlerin : jaune vif, ailes brunes tachetées, grande patte sauteuse ---------- */
const LOC = "#E8C232", LOC_DARK = "#B8902A", LOC_WING = "#B59A5C", LOC_SPOT = "#5E4426";
const criquet = [
  thick("M7.6 15L6.6 18.4M10 14.6L10.6 18", LOC_DARK, 0.8),
  path("M2.6 12.2C2.6 10.2 3.8 9 5.8 9C7.2 9 8.2 9.6 9 10.2L20.6 11C22 11.2 22.2 12.8 20.8 13.4L9 14.6C8.2 15 7.2 15.2 5.8 15.2C3.8 15.2 2.6 14 2.6 12.2Z", LOC),
  // aile repliée le long du dos
  path("M9.2 10.4L21.4 11.2Q22.6 12 21.2 12.6L10.6 12.8Q9 12.2 9.2 10.4Z", LOC_WING, { w: 0.8 }),
  dots([[12.2, 11.4], [14.6, 11.8], [17, 11.6], [19.4, 12]], 0.4, LOC_SPOT),
  line("M9 10.2V14.6", LOC_DARK, 0.7),
  // fémur sauteur à chevrons, tibia
  path("M10.6 13.8C12.8 11.2 15.4 8.8 18 7.6C19.2 7 20 8 19.4 9C18 11.2 14.8 13.4 11.6 14.6Z", LOC),
  line("M13.4 11.8L14.4 12.4M15.2 10.4L16.2 11M17 9L17.8 9.6", LOC_DARK, 0.6),
  thick("M19 8.4L21.2 18.6", "#C9783A", 0.8),
  line("M4.2 9.6C3.8 7 4.6 4.6 6.6 3.4", O, 0.8),
  circle(4.6, 11.4, 1.1, "#7A5A2E", { w: 0.6 }), eye(4.4, 11.4, 0.4),
].join("");

/* ---------- abeille africaine : ambrée, bandes sombres, ailes translucides ---------- */
const BEE = "#E8A53A", BEE_DARK = "#3A2A1C", WING = "#DDEEF7";
const abeille = [
  thick("M9.6 15.4L8.6 18M12.4 16L12.2 18.8M15.2 15.8L15.8 18.4", BEE_DARK, 0.6),
  path("M20.6 13.2L22.6 13.6L20.4 14.4Z", BEE_DARK, { w: 0.6 }),
  path("M9.2 12.8C9.2 10.2 12 9.4 15 9.6C19 9.8 21.4 11.4 21.4 13.2C21.2 15 19 16.4 15 16.4C12 16.4 9.2 15.6 9.2 12.8Z", BEE),
  line("M13.6 9.9V16.1M16.8 10V16.2M19.6 10.8V15.6", O, 1.2),
  ellipse(8.4, 12.6, 2.4, 2.2, "#C98A2E"),
  circle(4.8, 12.6, 2.2, BEE_DARK),
  circle(4.2, 12.2, 0.9, "#6B5A48", false),
  line("M4.6 10.6C4 8.6 3.2 7.4 2 7", O, 0.8),
  // ailes levées
  path("M9.8 10.6C8.6 7.4 9.4 3.8 11.8 3.4C14 3 14.6 6.6 11.6 10.6Z", WING, { w: 0.8 }),
  path("M11.4 10.6C12.4 7.6 14.8 5.6 17 6.2C19 6.8 17.6 9.8 13.4 11Z", WING, { w: 0.8 }),
  line("M11 9.4Q11.2 6.6 12 5M13 10.2Q14.4 8.4 16.4 7.4", "#AFC8D6", 0.5),
].join("");

/* ---------- papillon Charaxes : ailes orange bordées de brun, queues aux ailes postérieures ---------- */
const CHX = "#E5782A", CHX_EDGE = "#3A2418", CHX_SPOT = "#F6D58A";
const fore = "M11 8.8C8.4 5.4 5.2 3 1.8 2.6C1.2 6.2 2.2 9.8 5.4 11.4L11 11.4Z";
const hind = "M11.2 11.2C7.8 10.8 4.2 12.4 4.6 15.8C4.8 17.6 5.8 18.6 6.8 18.8L7.2 21.8L8.4 19.4L9.4 21.2L10 18.6C11 17.4 11.4 15.6 11.4 13.6Z";
const foreIn = "M10.4 9.2C8.2 6.6 5.6 4.8 3.2 4.4C3.2 6.8 4 8.8 6.2 10.2L10.4 10.6Z";
const hindIn = "M10.6 12C8.2 11.8 5.8 12.8 6 15.2C6.2 16.6 7 17.4 8.2 17.6C9.6 16.8 10.4 15.4 10.6 13.6Z";
const wingSpots = [[2.6, 4.4], [3.4, 6.8], [4.6, 9.2], [5.2, 13.4], [5.8, 17]];
const papillon = [
  path(fore, CHX_EDGE), path(mx(fore), CHX_EDGE), path(hind, CHX_EDGE), path(mx(hind), CHX_EDGE),
  path(foreIn, CHX, false), path(mx(foreIn), CHX, false), path(hindIn, CHX, false), path(mx(hindIn), CHX, false),
  dots(wingSpots, 0.4, CHX_SPOT), dots(wingSpots.map(([x, y]) => [24 - x, y]), 0.4, CHX_SPOT),
  circle(7.4, 7.6, 0.7, CHX_EDGE, false), circle(16.6, 7.6, 0.7, CHX_EDGE, false),
  ellipse(12, 12.6, 1.1, 4.6, "#5A3A24", { w: 0.9 }),
  line("M11.6 8.2L10 4.6M12.4 8.2L14 4.6", O, 0.7), circle(10, 4.6, 0.45, O, false), circle(14, 4.6, 0.45, O, false),
].join("");

/* ---------- mouche tsé-tsé : de profil, longue trompe droite, ailes repliées à plat qui dépassent l'abdomen ---------- */
const TSE = "#8A6A44", TSE_DARK = "#5E4630", TSE_WING = "#E2DACA", TSE_EYE = "#8E3A2A";
const tsetse = [
  thick("M10 13.2L8.6 16.8L7.2 17.8M12 13.8L12.2 18.2M13.8 13.2L15.6 17.2L17 18", TSE_DARK, 0.7),
  line("M4.6 11.2H1.4", O, 1),
  path("M14.6 12.4C16.6 11.4 19.4 11.4 20.8 12.6C21.8 13.6 21.4 15.6 19.6 16.2C17.6 16.8 15.8 16.4 14.4 15Z", TSE),
  line("M17 12V16.4M19.2 12.2V16", TSE_DARK, 0.8),
  path("M8.8 10.6C8.8 8.6 10.2 7.2 12 7.2S15.2 8.6 15.2 10.6 13.8 13.8 12 13.8 8.8 12.6 8.8 10.6Z", TSE),
  line("M10.6 8.6Q12 9.6 13.6 8.6M10.4 10.4Q12 11.4 13.8 10.4", TSE_DARK, 0.55),
  // ailes repliées l'une sur l'autre
  path("M13.4 7.6C16.8 6.2 20.4 6.2 22.4 7.2C23 7.6 22.8 8.8 22 9C19.2 9.8 16.2 9.8 14.4 9.4Z", TSE_WING, { w: 0.9 }),
  line("M15.6 8.4H21", "#A99C80", 0.5),
  path("M4.4 11.2C4.4 9.6 5.4 8.6 6.6 8.6S8.8 9.6 8.8 11.2 7.8 13.6 6.6 13.6 4.4 12.8 4.4 11.2Z", TSE_DARK),
  ellipse(6.6, 10.8, 1.5, 1.7, TSE_EYE, { w: 0.6 }),
].join("");

/* ---------- escargot géant africain : coquille conique brune à flammes sombres ---------- */
const SNAIL = "#A89684", SNAIL_DARK = "#7E6E5E", SHELL = "#C99A5A", SHELL_DARK = "#6B3E22", SHELL_TIP = "#EFE0C0";
const escargot = [
  thick("M4.4 15.6L3.2 11.4M6.2 15.4L6.6 11.2", SNAIL, 0.8), circle(3.2, 11.2, 0.8, SNAIL_DARK, { w: 0.6 }), circle(6.6, 11, 0.8, SNAIL_DARK, { w: 0.6 }),
  path("M2.4 18C2.4 16.6 3.6 15.6 5.4 15.6C7.6 15.6 8.6 16.8 11 16.8H17.8C19.8 16.8 21.6 18.6 22.6 20.6H5.6C3.8 20.6 2.4 19.6 2.4 18Z", SNAIL),
  line("M7 19.2H18", SNAIL_DARK, 0.6),
  path("M8 17.2C5.6 13.8 7 9.2 11.2 7.4C14.6 5.8 18.2 4.4 22 3.4C22.8 8.4 21.6 13.8 18 17.2Z", SHELL),
  path("M17.2 5.2Q19.6 4.2 22 3.4Q22.4 5.6 22.2 7.4Q19.4 7.6 17.2 5.2Z", SHELL_TIP, { w: 0.7 }),
  // flammes brunes
  line("M10.2 9.6L11.4 12.6M12.8 8.6L14 11.6L13.4 13.6M15.4 7.8L16.6 10.6M11.2 14.4L12.4 16.6M15 14.2L15.8 16.4M18.4 9.6L19 12.2", SHELL_DARK, 0.7),
  line("M8.4 12.4C11.6 15.2 16.4 15.6 21.6 13.4M13.8 7.4C15.8 9.8 18.8 10.6 22.4 9.6", O, 0.8),
].join("");

/* ---------- lamantin d'Afrique : gris, queue en pagaie ronde, museau à vibrisses ---------- */
const MAN = "#8E9290", MAN_LIGHT = "#B9BCB8", MAN_DARK = "#6A6E6C";
const lamantin = [
  path("M10.6 15.6C11 18 9.8 19.6 7.6 20.2Q6.8 19.2 7.6 18.4Q8.8 17.4 8.8 15.6Z", MAN_DARK),
  path("M2 13C1.8 10.4 3.6 8.8 6.2 8.4C10.4 7.6 14.4 8.6 17.4 10.6C18.6 8.2 22.4 7.8 22.8 11.2C23.2 14.2 21.6 16.8 19.2 16.2C18.2 16 17.6 15.2 17.4 14.2C14.4 16.4 9.6 17.4 5.8 16.4C3.6 16 2 14.8 2 13Z", MAN),
  path("M4.6 15.6Q10 17.4 16.6 14.6Q11.4 15 6.4 14.2Z", MAN_LIGHT, false),
  path("M2 12.8Q2.2 15.4 4.6 15.8Q5.8 15 5.4 13Q4.4 11.6 2.4 11.8Z", MAN_LIGHT, { w: 0.7 }),
  dots([[3.2, 13.4], [4.2, 14.2], [3.4, 14.8]], 0.25, O),
  eye(6.8, 11.2, 0.5),
  path("M19.2 11.2Q21 10.4 21.6 12", "none", { c: MAN_DARK, w: 0.6 }),
].join("");

/* ---------- baleine à bosse : dos ardoise, nageoires pectorales immenses et blanches, caudale levée ---------- */
const HUMP = "#3F4C60", HUMP_LIGHT = "#E8EDF1", HUMP_GROOVE = "#9AA8B6";
const baleine = [
  path("M1.4 13.2C1.4 10.4 4 9 7.8 9C11.8 9 15 10 17.2 11.4L19.2 8.6C18.4 6.4 19.4 4.2 21 3.6C21.4 5.4 22 6.4 23 6.8C22.8 8.6 21.8 9.8 20.6 10.6L19.4 13.8C17 16.2 13 17.2 8.6 17C4.4 16.8 1.4 15.4 1.4 13.2Z", HUMP),
  path("M1.8 14.2C4.2 15.8 8.6 16.4 12.6 15.8Q9 17.4 5 16.6Q2.4 15.8 1.8 14.2Z", HUMP_LIGHT, false),
  line("M3 14.8L8.6 15.6M4.4 15.8L9.6 16.4", HUMP_GROOVE, 0.5),
  // longue pectorale blanche
  path("M7.6 15.8C8.6 18.4 11.4 20.6 15.2 21.6Q16 21 15 20.2C12.6 18.8 10.6 17.4 9.6 15.6Z", HUMP_LIGHT),
  dots([[3.2, 11], [4.6, 10.2], [6.2, 9.8]], 0.35, "#7D8CA0"),
  eye(7.2, 12.6, 0.5),
  path("M16.6 10.6L17.6 9.4L18 10.8Z", HUMP, { w: 0.7 }),
].join("");

/* ---------- requin-baleine : bleu-gris, ventre pâle, damier de points blancs ---------- */
const WS = "#4F6A84", WS_LIGHT = "#E6ECF0", WS_DARK = "#3A5068";
const requin = [
  path("M9.4 15.6L12.4 19.6L13.6 15.6Z", WS_DARK),
  path("M1.4 12.4C1.4 10.4 3.2 9.4 6.2 9.2L10 9L12.6 5.4C13.2 4.6 14 4.9 14 5.8L14.2 9.2C16.2 9.6 17.8 10.2 19.2 11L22.2 5.4C23 7.8 23.2 10.6 21.8 13.2L22.4 17.8L19 13.8C15.8 15.4 11.6 16.2 7.2 16C3.6 15.8 1.4 14.6 1.4 12.4Z", WS),
  path("M1.8 13.6Q4 15.6 8 15.8Q13.4 16 18.4 14.2Q13.6 14.6 9 14.4Q4.6 14.2 1.8 13.6Z", WS_LIGHT, false),
  line("M1.6 12.8H5", O, 0.8),
  line("M7.2 10.6V13.2M8.4 10.4V13.4", WS_DARK, 0.6),
  dots([[10, 10.8], [12.6, 10.4], [15.2, 11], [17.6, 11.8], [11.2, 12.8], [13.8, 12.6], [16.4, 13.2], [10, 14.6], [12.6, 14.6], [19.8, 12.6], [5.2, 10.6], [3.6, 11], [6, 9.9]], 0.38, C.white),
  eye(4, 12, 0.4),
].join("");

/* ---------- silure (Clarias) : tête plate, longs barbillons, longue dorsale ---------- */
const CAT = "#5F5B4E", CAT_LIGHT = "#B9AE96", CAT_DARK = "#403D34";
const silure = [
  path("M8.6 9.6Q14 8.2 19.2 9.8L19.4 10.8L8.4 10.4Z", CAT_DARK, { w: 0.8 }),
  path("M9.6 14.4Q14 15.6 18.8 13.6L18.6 15.2Q14 16.4 9.8 15.4Z", CAT_DARK, { w: 0.8 }),
  path("M3.4 11.8C3.4 10 5 9.2 7.6 9.2L19.2 10.6L22.6 8.4V16.2L19.2 13.8C15 15.2 11 15.6 7.4 15C4.8 14.6 3.4 13.6 3.4 11.8Z", CAT),
  path("M3.8 12.8Q7 14.6 12 14.6Q8 15.6 5.4 14.6Q4 14 3.8 12.8Z", CAT_LIGHT, false),
  thick("M3.8 12.8C1.8 14 1.4 16.6 2.6 18.8M5 14C5.2 16 7 17.4 8.8 17.2M3.8 10.4C2 9 1.8 6.6 3.2 4.8", CAT_DARK, 0.5),
  dots([[10.4, 11.4], [13, 12.2], [15.6, 11.6], [12, 10.6], [17, 12.6]], 0.4, CAT_DARK),
  eye(6.4, 10.8, 0.5),
].join("");

/* ---------- tilapia du Nil : argent verdâtre, bandes verticales, nageoires bordées de rouge ---------- */
const TIL = "#94A58C", TIL_DARK = "#5E6F5A", TIL_FIN = "#D8644A", TIL_LIGHT = "#D9E0CF";
const tilapia = [
  path("M7.2 8.4L8.2 5.2L9.8 7L11 4.4L12.6 6.6L13.8 4.8L15 7.2L17 7L17.6 9.8Z", TIL_DARK, { w: 0.8 }),
  path("M10 16.6L12.6 19.6L15.4 16Z", TIL_DARK, { w: 0.8 }),
  path("M1.8 12.4C3.4 8.8 7 6.8 10.8 6.8C14.2 6.8 16.6 8.4 18 10.6L22 7.8V17L18 14.2C16.6 16.4 14.2 18 10.8 18C7 18 3.4 16 1.8 12.4Z", TIL),
  path("M3 13.6Q6 16.8 10.8 17.2Q14.6 17.2 17 14.6Q10 15.6 3 13.6Z", TIL_LIGHT, false),
  line("M11.4 7.4V17M14.2 8V16.4M16.4 9.4V15", TIL_DARK, 1),
  path("M19.4 10.2L21.8 8.4V16.4L19.4 14.6Z", "none", { c: TIL_FIN, w: 0.6 }),
  line("M7.6 5.6L8.2 5.2L9.8 7M11 4.4L12.6 6.6L13.8 4.8L15 7.2", TIL_FIN, 0.6),
  line("M8.2 9.4C9 11.4 9 13.4 8.2 15.4", O, 0.8),
  circle(5.4, 11.2, 1, C.ocreLight, { w: 0.6 }), eye(5.4, 11.2, 0.45),
].join("");

/* ---------- capitaine (perche du Nil) : long, front concave, bosse derrière la tête, deux dorsales, gros œil doré ---------- */
const CAP = "#C9D1D8", CAP_BACK = "#7F94A6", CAP_FIN = "#8E9EAC";
const capitaine = [
  path("M7.6 8L8.8 4.6L10.2 6.6L11.2 5L12.8 8.4Z", CAP_FIN, { w: 0.9 }),
  path("M13.4 8.8C15 7.2 17 7.8 17.6 10.4Z", CAP_FIN, { w: 0.9 }),
  path("M11.4 16.2L13 18.6L15.2 15.6Z", CAP_FIN, { w: 0.9 }),
  path("M1.6 12C2.8 11.4 3.8 10.6 4.6 9.6C6 8 7.6 7.2 9.4 7.2C12.4 7.4 15.6 9 18.2 10.6L20.4 8.6C22.2 9.2 22.8 11.2 22.8 12.4S22.2 15.6 20.4 16.2L18.2 14.2C15.4 15.8 12.4 16.6 9.4 16.4C6.4 16.2 3.8 14.8 2 13.2Z", CAP),
  path("M4.6 9.6C6 8 7.6 7.2 9.4 7.2C12.4 7.4 15.6 9 18.2 10.6Q13.4 10 8.6 10.6Q6 10.8 4.6 9.6Z", CAP_BACK, false),
  line("M1.8 12.8L4.8 12.2", O, 0.8),
  line("M8.4 9.4C9.2 11.2 9.2 13 8.2 14.8", O, 0.8),
  line("M10.6 13H18", "#9FB0BE", 0.5),
  circle(5.8, 10.8, 1.3, C.ocreLight, { w: 0.6 }), eye(5.8, 10.8, 0.6),
].join("");

/* ---------- cheval barbe : robe baie, encolure arquée, chanfrein busqué, crins et extrémités noirs ---------- */
const BAY = "#8E4F2C", BAY_DARK = "#6E3B20", MANE = "#2A1E18";
const cheval = [
  limb([[11, 15.2], [11.6, 18.4], [11.2, 21.2]], [0.9, 0.65, 0.6], BAY_DARK, MANE), limb([[17, 15.2], [17.6, 18.4], [17, 21.2]], [0.9, 0.65, 0.6], BAY_DARK, MANE),
  path("M20 10.2C22.4 10.8 22.8 14.6 22.2 18.4L21 20.8C20.8 17.6 20.6 14.6 19.8 12.6Z", MANE),
  path("M7 3.6C9.8 5 11.4 7.6 12 9.8C14.4 10 16.6 9.6 18.4 9.8C20.2 10 21 11.4 20.6 13C20.4 14.4 19.4 15.2 18.6 15.4L10.4 15.6C9 15.4 8 14.6 7.8 13.4C7.6 12 7.2 10.8 6.4 9.8C5.6 9.8 4.6 10.4 3.6 10.4C2.4 10.4 1.6 9.6 1.8 8.6Q2.6 4.6 5.6 3.6C6.2 3.4 6.6 3.4 7 3.6Z", BAY),
  limb([[8.8, 15], [8.7, 18.2], [8.6, 21.6]], [0.95, 0.7, 0.62], BAY, MANE), limb([[18.9, 14.8], [19.8, 18], [19.2, 21.6]], [1, 0.7, 0.62], BAY, MANE),
  // crinière, toupet, oreille
  path("M7.4 2.8C10.8 3.6 13.4 6.4 14.2 9.8L12 9.8C11.4 7.6 9.8 5 7 3.6Z", MANE, { w: 0.8 }),
  path("M6.2 3.8L6.8 1.6L7.8 3.8Z", BAY, { w: 0.8 }),
  path("M5.6 3.8Q4.4 4.6 4.6 6Q5.8 5.2 6.6 4.2Z", MANE, false),
  eye(5, 6, 0.5),
  ellipse(2.6, 8.6, 0.35, 0.45, O, false),
  line("M2.2 9.6Q3 10.2 3.8 10", O, 0.6),
].join("");

/* ---------- mouton peul (Ouda) : avant noir, arrière blanc, cornes en spirale, poil ras, hautes pattes ---------- */
const SH_WHITE = "#F4EFE6", SH_SHADE = "#D8D0C2", SH_DARK = "#33261E", SH_HORN = "#CDB68C", SH_FAR = "#241A14";
const mouton = [
  limb([[10.8, 14.4], [11.4, 17.6], [11, 21.2]], [0.8, 0.55, 0.5], SH_FAR, O), limb([[16.8, 14.4], [17.4, 17.4], [16.8, 21.2]], [0.8, 0.55, 0.5], SH_SHADE, O),
  thick("M20.2 11.2C21 12.2 21.2 13.8 20.8 15.6", SH_WHITE, 0.9),
  path("M7.6 7.6C8.4 8.8 9.4 9.6 11 9.8C13.6 10.2 16.4 9.6 18.4 9.8C20 10 20.8 11.2 20.4 12.6C20.2 13.6 19.4 14.2 18.6 14.4L10.4 14.6C9.2 14.4 8.4 13.6 8 12.6C7.6 11.6 7.2 10.8 6.6 10.2L4.4 10.4C3.4 10.6 2.6 10.2 2.6 9.4L3.6 6.4C4 5.4 5 4.8 6 5.2C6.8 5.6 7.4 6.6 7.6 7.6Z", SH_WHITE),
  // avant-main et tête noirs
  path("M7.6 7.6C8.4 8.8 9.4 9.6 11 9.8L13.2 10Q12.4 12.4 13.2 14.6H10.4C9.2 14.4 8.4 13.6 8 12.6C7.6 11.6 7.2 10.8 6.6 10.2L4.4 10.4C3.4 10.6 2.6 10.2 2.6 9.4L3.6 6.4C4 5.4 5 4.8 6 5.2C6.8 5.6 7.4 6.6 7.6 7.6Z", SH_DARK),
  limb([[9, 14.2], [8.9, 17.6], [8.8, 21.6]], [0.85, 0.6, 0.52], SH_DARK, O), limb([[18.8, 14], [19.6, 17.4], [19, 21.6]], [0.9, 0.6, 0.52], SH_WHITE, O),
  // corne spiralée
  thick("M6.4 5.4C7.4 3 10.6 2.6 12 4.6C13.4 6.6 12 9.2 9.8 8.8C8.4 8.6 8 7 9.2 6.4", SH_HORN, 1.3),
  line("M8 3.8L8.4 4.6M10.4 3.2L10.4 4.2M12.2 5.6L11.4 5.8", "#9C8560", 0.5),
  circle(4.6, 7.2, 0.7, "#D9CBB0", { w: 0.5 }), eye(4.6, 7.2, 0.36),
  ellipse(2.9, 9.4, 0.3, 0.4, "#8A786C", false),
].join("");

/* ---------- basenji : robe fauve, oreilles droites, front ridé, poitrail, pieds et bout de queue blancs, queue en tire-bouchon ---------- */
const BAS = "#C2652F", BAS_DARK = "#9A4C22", BAS_EAR = "#E7A5A0";
const basenji = [
  limb([[10.8, 15.4], [11.4, 18.4], [11, 21.2]], [0.75, 0.55, 0.5], BAS_DARK, C.white), limb([[16.6, 14.6], [17.2, 18.2], [16.6, 21.2]], [0.8, 0.55, 0.5], BAS_DARK, C.white),
  thick("M18.4 11.2C17.2 8.6 18.8 6.6 20.6 7C22.2 7.4 22.2 9.8 20.6 10.2C19.8 10.4 19.2 9.8 19.4 9.2", BAS, 1.4),
  circle(19.4, 9.2, 0.65, C.white, { w: 0.6 }),
  path("M7.4 8.4C8.6 10 10 10.8 12 11C14 11.2 16 10.8 17.6 11C19.2 11.2 19.8 12.6 19.4 13.8C19.2 14.4 18.6 14.8 17.8 14.8C16.4 14.8 15.4 14 14 14.2C12.6 14.4 11.8 15.6 10.4 15.6C9.2 15.4 8.4 14.6 8.2 13.6C8 12.6 7.6 11.8 7 11.2L5.4 10.4H3C2 10.4 1.8 9.4 2.6 9L4.6 7.4L5 3.4L7 5.8L8.4 3.2L8.8 6.6C8.6 7.4 8 7.8 7.4 8.4Z", BAS),
  path("M5.4 5L5.3 7L6.4 6.2Z", BAS_EAR, false), path("M8.2 4.6L7.6 6.4L8.6 6.6Z", BAS_EAR, false),
  path("M7 11.2Q7.4 13.8 8.6 15.4L10 15.4Q9.2 13.2 9.4 11.2Q8.2 10.8 7 11.2Z", C.white, false),
  limb([[8.8, 15.2], [8.7, 18.2], [8.6, 21.6]], [0.8, 0.6, 0.52], BAS, C.white), limb([[18.4, 14.4], [19.2, 17.8], [18.6, 21.6]], [0.85, 0.6, 0.52], BAS, C.white),
  line("M5.6 7.2Q6.4 6.8 7.2 7.2M5.8 8Q6.4 7.6 7 8", BAS_DARK, 0.5),
  eye(4.8, 8.4, 0.5),
  ellipse(2.2, 9.6, 0.45, 0.4, O, false),
].join("");

// Recadrage mesuré : ces dessins dépassaient un peu la zone utile 1–23 (contour compris), ils sont décalés ou réduits juste assez.
const FIT = { "mamba-noir": [-0.19, 0.65, 0.95], "vipere-du-gabon": [0.55, -0.09, 0.989],
  "escargot-geant": [-0.15, 0, 1], "lamantin": [-0.41, 0, 1], "baleine-a-bosse": [0.18, 0.39, 0.969], "requin-baleine": [0.17, 0.29, 0.977],
  "silure": [0.44, 0.3, 0.975] };
const A = (slug, fr, en, char, tags, body) => ({ slug, fr, en, char, group: "animaux", tags, tone: false,
  body: FIT[slug] ? g(`translate(${FIT[slug][0]} ${FIT[slug][1]}) scale(${FIT[slug][2]})`, body) : body });
/** Recadrage (audit du dessin) : ces dessins débordaient de la grille 24 × 24 (ou étaient décentrés) ;
 *  ils sont réduits et décalés juste assez pour y tenir : [échelle, décalage x, décalage y]. */
const CADRE = {};
const cadre = (e) => { const f = CADRE[e.slug]; return f ? { ...e, body: `<g transform="translate(${Math.round((12 + f[1]) * 100) / 100} ${Math.round((12 + f[2]) * 100) / 100}) scale(${f[0]}) translate(-12 -12)">${e.body}</g>` } : e; };
export default [
  A("mamba-noir", "Mamba noir", "Black mamba", "🐍", ["mamba noir", "black mamba", "mamba", "serpent", "snake", "koboko", "imamba", "venimeux", "venomous", "savane", "kenya", "afrique du sud"], mambaNoir),
  A("python-de-seba", "Python de Seba", "African rock python", null, ["python de seba", "african rock python", "python", "serpent", "snake", "chatu", "constricteur", "savane", "fleuve", "afrique de l'ouest"], pythonSeba),
  A("vipere-du-gabon", "Vipère du Gabon", "Gaboon viper", null, ["vipère du gabon", "gaboon viper", "vipère", "viper", "serpent", "snake", "bitis", "forêt", "forest", "gabon", "congo", "cameroun"], vipereGabon),
  A("cobra-cracheur", "Cobra cracheur", "Spitting cobra", null, ["cobra cracheur", "spitting cobra", "cobra", "serpent", "snake", "capuchon", "hood", "venin", "venom", "savane"], cobraCracheur),
  A("varan-du-nil", "Varan du Nil", "Nile monitor", "🦎", ["varan du nil", "nile monitor", "varan", "monitor lizard", "lézard", "lizard", "kenge", "likkewaan", "fleuve", "river", "nil"], varanNil),
  A("scorpion", "Scorpion", "Scorpion", "🦂", ["scorpion", "nge", "aqrab", "dard", "stinger", "désert", "desert", "sahara", "sahel", "arachnide"], scorpion),
  A("criquet-pelerin", "Criquet pèlerin", "Desert locust", "🦗", ["criquet pèlerin", "desert locust", "criquet", "locust", "sauterelle", "nzige", "jarad", "essaim", "swarm", "sahel", "corne de l'afrique"], criquet),
  A("abeille-africaine", "Abeille africaine", "African honey bee", "🐝", ["abeille africaine", "african honey bee", "abeille", "bee", "miel", "honey", "nyuki", "ruche", "hive", "pollinisation"], abeille),
  A("papillon-charaxes", "Papillon Charaxes", "Charaxes butterfly", "🦋", ["papillon charaxes", "charaxes butterfly", "papillon", "butterfly", "kipepeo", "charaxes", "forêt", "forest", "ailes", "wings"], papillon),
  A("mouche-tse-tse", "Mouche tsé-tsé", "Tsetse fly", "🪰", ["mouche tsé-tsé", "tsetse fly", "tsé-tsé", "tsetse", "mouche", "fly", "maladie du sommeil", "sleeping sickness", "savane"], tsetse),
  A("escargot-geant", "Escargot géant africain", "Giant African land snail", "🐌", ["escargot géant", "giant african land snail", "escargot", "snail", "achatina", "konokono", "forêt", "ghana", "nigeria", "côte d'ivoire"], escargot),
  A("lamantin", "Lamantin d'Afrique", "African manatee", null, ["lamantin d'afrique", "african manatee", "lamantin", "manatee", "mammifère marin", "fleuve", "river", "lagune", "lagoon", "sénégal", "gabon"], lamantin),
  A("baleine-a-bosse", "Baleine à bosse", "Humpback whale", "🐋", ["baleine à bosse", "humpback whale", "baleine", "whale", "nyangumi", "trozona", "océan", "ocean", "madagascar", "mozambique", "afrique du sud"], baleine),
  A("requin-baleine", "Requin-baleine", "Whale shark", "🦈", ["requin-baleine", "whale shark", "requin", "shark", "papa shillingi", "océan", "ocean", "djibouti", "mozambique", "tanzanie"], requin),
  A("silure", "Silure", "Catfish", null, ["silure", "catfish", "poisson-chat", "clarias", "kambale", "barbillons", "barbels", "fleuve", "river", "pêche"], silure),
  A("tilapia", "Tilapia", "Tilapia", null, ["tilapia", "poisson", "fish", "sato", "perege", "lac", "lake", "pêche", "fishing", "braisé"], tilapia),
  A("capitaine", "Capitaine", "Nile perch", null, ["capitaine", "nile perch", "perche du nil", "sangara", "lac victoria", "lake victoria", "fleuve", "pêche", "fishing"], capitaine),
  A("cheval-barbe", "Cheval barbe", "Barb horse", "🐎", ["cheval barbe", "barb horse", "cheval", "horse", "farasi", "fantasia", "cavalier", "rider", "maghreb", "sahel"], cheval),
  A("mouton-peul", "Mouton peul", "Fulani sheep", "🐑", ["mouton peul", "fulani sheep", "mouton", "sheep", "bélier", "ram", "ouda", "xar", "tabaski", "peul", "sahel"], mouton),
  A("basenji", "Basenji", "Basenji", "🐕", ["basenji", "chien", "dog", "chien du congo", "congo dog", "mbwa", "barkless", "forêt", "congo", "rdc"], basenji),
].map(cadre);
