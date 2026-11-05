// Emojis faune d'Afrique (lot A) : mammifères de la savane — félins, chiens sauvages, antilopes et petits fouisseurs.
// Animaux vus de profil, tête à gauche, couleur à plat et contour brun foncé, dans l'esprit du léopard :
// un cou qui relie la tête au corps, des pattes qui s'affinent (côté éloigné plus foncé), peu de motifs mais ceux de l'espèce.
import { O, W, C, path, circle, ellipse, line, g } from "./lib.mjs";

/** Trait épais « plein » : contour brun puis couleur par-dessus (queues, cornes). */
const thick = (d, col, w = 1.5) => line(d, O, w + 2 * W) + line(d, col, w);
const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const r2 = (v) => Math.round(v * 100) / 100;
/** Œil : pupille brune et petit reflet blanc. */
const eye = (x, y, r = 0.55) => circle(x, y, r, O, false) + circle(x - r * 0.3, y - r * 0.3, r * 0.3, C.white, false);
/** Patte effilée qui suit une ligne brisée (épaule → genou/jarret → pied), de la largeur w0 à w1.
 *  foot : "hoof" (sabot sombre) ou "paw" (pied rond de carnivore). Le haut remonte dans le corps. */
const limb = (pts, w0, w1, col, foot) => {
  w0 += 0.7; w1 += 0.55;
  const p = pts.map(([x, y], i) => [x, i === 0 ? y - 1.2 : y]), n = p.length, L = [], R = [];
  for (let i = 0; i < n; i++) {
    const a = p[Math.max(0, i - 1)], b = p[Math.min(n - 1, i + 1)], l = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const dx = (b[0] - a[0]) / l, dy = (b[1] - a[1]) / l, w = (w0 + ((w1 - w0) * i) / (n - 1)) / 2;
    L.push([p[i][0] - dy * w, p[i][1] + dx * w]); R.push([p[i][0] + dy * w, p[i][1] - dx * w]);
  }
  const f = (q) => `${r2(q[0])} ${r2(q[1])}`;
  const d = `M${f(L[0])}${L.slice(1).map((q) => `L${f(q)}`).join("")}${R.reverse().map((q) => `L${f(q)}`).join("")}Z`;
  const [x, y] = p[n - 1];
  const end = foot === "hoof" ? path(`M${r2(x - w1 / 2)} ${r2(y - 0.9)}H${r2(x + w1 / 2)}L${r2(x + w1 / 2)} ${y}H${r2(x - w1 / 2)}Z`, O, { w: 0.85 })
    : foot === "paw" ? ellipse(x - 0.25, y, w1 * 0.62, 0.55, col, { w: 0.85 }) : "";
  return path(d, col, { w: 0.85 }) + end;
};
const tf = (dx, dy, k = 1) => `translate(${12 + dx} ${12 + dy}) scale(${k}) translate(-12 -12)`;

/* ---------- guépard ---------- */
// Corps fin et long, petite tête, très longues pattes, ventre rentré ; taches pleines ; larmes noires de l'œil à la bouche.
const CHE = "#E8B45A", CHE_FAR = "#C98F3C", CHE_LIGHT = "#F7E3B6";
const CHE_SIL = "M7.4 8.6C10.4 9.4 15 8.8 18.4 9.2C20.2 9.4 20.8 10.8 20.4 12.2C20.2 13 19.6 13.4 19 13.6C17 12.4 14.4 12 12 12.6C10.6 13 9.4 13.4 8.4 13.2C7.4 13 6.8 12.2 6.4 11.2C6 10.4 5.4 10 4.6 10.2C3.6 10.4 2.6 10.2 2.2 9.4C1.9 8.6 2.4 7.4 3 7L3.4 6L4.2 6.6C4.8 6.4 5.4 6.4 5.8 6.6L6.4 5.8L6.8 7C7 7.6 7.2 8.2 7.4 8.6Z";
const guepard = [
  limb([[10.2, 13.2], [10.8, 17], [10.4, 21]], 1.4, 0.8, CHE_FAR, "paw"),
  limb([[16.8, 12.6], [17.8, 16.6], [16.8, 21]], 2, 0.8, CHE_FAR, "paw"),
  // longue queue : anneaux noirs et bout blanc
  thick("M20.4 10.6C22.2 11.6 22.6 14.4 22 16.8C21.8 18 22 19 22.6 19.3", CHE, 1.1),
  line("M21.5 16.6L22.6 16.9M21.6 18.2L22.6 18.6", O, 0.7), circle(22.6, 19.4, 0.62, C.white, { w: 0.8 }),
  path(CHE_SIL, CHE),
  dots([[9.6, 10.6], [11.2, 11.6], [12.4, 10.2], [13.8, 11.4], [15, 10], [16.4, 11.2], [17.6, 10], [18.8, 11.2], [19.6, 12.4], [9.4, 12.2]], 0.42, O),
  limb([[8.2, 13.1], [7.6, 17], [7.8, 21]], 1.6, 0.9, CHE, "paw"),
  limb([[19.2, 13.6], [20.2, 17.2], [19.6, 21]], 2.2, 0.9, CHE, "paw"),
  dots([[7.9, 15.4], [20.2, 15.2], [20.3, 17.4]], 0.32, O),
  ellipse(3.1, 9.5, 1.2, 0.72, CHE_LIGHT, false),
  path("M1.9 8.7Q2.5 8.3 3 8.8Q2.7 9.4 2.1 9.3Z", O, { w: 0.4 }),
  line("M3.9 8.6Q3.3 9.4 3.4 10.4", O, 0.65),
  eye(3.9, 8.1, 0.5),
  dots([[5.2, 7.4], [6.3, 8.4], [5.4, 9.2]], 0.28, O),
].join("");

/* ---------- serval ---------- */
// Pattes très hautes, oreilles immenses (dos noir, tache blanche), queue courte annelée, taches et traits sur le cou.
const SER = "#E8B85C", SER_FAR = "#C9963F", SER_LIGHT = "#F8E8C2", SER_EAR = "#3A2A1E";
const SER_SIL = "M8 9.2C10.6 9.8 14.4 9.4 17.4 9C19.2 8.8 20.2 9.8 20 11.4C19.9 12.4 19.4 13 18.8 13.4C17 12.6 14.8 12.6 12.6 13C11.2 13.2 10 13.4 9 13.2C8 12.9 7.4 12 7.1 11C6.8 10.4 6.2 10.4 5.6 10.6C4.4 11 3 10.8 2.6 9.8C2.2 8.8 2.6 7.6 3.4 7C4.4 6.2 6 6.2 7 7C7.6 7.6 7.8 8.4 8 9.2Z";
const serval = [
  limb([[11, 13.3], [11.4, 21]], 1.4, 0.9, SER_FAR, "paw"),
  limb([[16.6, 12.7], [17.6, 16.8], [16.8, 21]], 2, 0.9, SER_FAR, "paw"),
  thick("M19.8 10.4C21.2 11 21.9 12.4 22.1 14.4", SER, 1.1),
  line("M21.2 11.6L22 11.2M21.8 13.2L22.6 13", O, 0.6), circle(22.1, 14.7, 0.6, O, false),
  // oreilles géantes
  path("M3.6 6.9C2.6 5.2 2.4 3 3.6 2.6C4.8 2.2 5.4 4.4 5.2 6.4Z", SER_EAR, { w: 0.9 }), circle(3.9, 4.4, 0.42, C.white, false),
  path("M6 6.5C6 4.6 6.6 2.8 7.8 3C9 3.2 8.6 5.4 7.4 7.4Z", SER_EAR, { w: 0.9 }), circle(7.6, 4.8, 0.42, C.white, false),
  path(SER_SIL, SER),
  path("M9.6 13.1C11.4 12.7 13.2 12.5 15 12.6C13.4 12.9 11.6 13.1 9.6 13.4Z", SER_LIGHT, false),
  line("M10.2 9.9L11.4 9.8M13.4 9.8L14.8 9.6", O, 0.7),
  dots([[10, 11.2], [11.8, 12], [12.6, 10.8], [14.2, 11.8], [15.2, 10.6], [16.6, 11.6], [17.6, 10.4], [18.6, 11.8]], 0.48, O),
  limb([[9, 13.2], [8.6, 21]], 1.5, 0.95, SER, "paw"),
  limb([[18.8, 13.4], [19.8, 17], [19.4, 21]], 2.2, 0.95, SER, "paw"),
  dots([[8.8, 15.4], [9, 17.6], [19.6, 15.2], [19.8, 17.4]], 0.34, O),
  line("M6.8 8.4Q7.4 9.4 7.1 10.4", O, 0.6),
  ellipse(3.5, 9.8, 1.1, 0.7, SER_LIGHT, false),
  path("M2.5 8.8Q3 8.4 3.5 8.9Q3.2 9.4 2.7 9.3Z", O, { w: 0.4 }),
  eye(4.4, 8.3, 0.5),
].join("");

/* ---------- caracal (assis) ---------- */
// Robe rousse unie, oreilles hautes et pointues au dos noir terminées par de longs pinceaux noirs, queue courte.
const CAR = "#CB8650", CAR_SHADE = "#B06F3E", CAR_LIGHT = "#F4E3C8", CAR_DARK = "#2B1D14";
const caracal = [
  thick("M17.8 19.6C19.8 20.6 21.6 20.2 22 18.8", CAR, 1.3),
  path("M5.4 10.4C5.6 13 5.8 17 6 20.6H16.6C18 20.6 18.6 19.4 18.4 17.8C18 15 16.4 12.6 13.8 11C12 9.9 10.6 9.4 9.6 8.8C9.8 7.4 9.4 6.2 8.6 5.6L8.4 2.6L6.6 4.8C6 4.7 5.4 4.7 4.8 4.9L3.4 2.6L3.4 5.8C2.6 6.6 2.4 7.8 2.7 8.8C3 9.8 4 10.4 5.4 10.4Z", CAR),
  // poitrail clair, cuisse
  path("M5.5 10.6C6.4 11.6 7 13.4 7 16.2L6 16.4C5.8 14 5.6 12 5.5 10.6Z", CAR_LIGHT, false),
  path("M16.4 20.6C16 18 14.6 16.2 12.4 15.8C10.8 15.6 10.2 17.2 10.6 18.6C11 19.8 12 20.6 13 20.6Z", CAR_SHADE),
  limb([[8.4, 13.6], [8.6, 20.2]], 1.8, 1.3, CAR, "paw"),
  // oreilles : dos noir, pinceaux
  line("M3.4 2.8L3.5 5.4M8.4 2.8L8.5 5.2", CAR_DARK, 0.8),
  line("M3.4 2.8L3.1 1.3M8.4 2.8L8.8 1.3", CAR_DARK, 0.9),
  ellipse(3.8, 9, 1.2, 0.9, CAR_LIGHT, false),
  path("M2.6 8.2Q3.2 7.8 3.7 8.3Q3.4 8.9 2.8 8.8Z", O, { w: 0.4 }),
  line("M4.6 7.2Q4 7.8 3.4 7.9", CAR_DARK, 0.5), line("M6 6.4L6.4 5.6M7 6.6L7.6 6", CAR_DARK, 0.45),
  eye(4.9, 7.6, 0.52),
].join("");

/* ---------- lycaon (chien sauvage) ---------- */
// Grandes oreilles rondes, museau noir, pelage « peint » de taches sombres et crème, queue touffue au bout blanc.
const LY_DARK = "#3A2A1E", LY_TAN = "#C9963E", LY_CREAM = "#EDE3CF", LY_FAR = "#2E2219";
const LY_SIL = "M8 9.4C10.6 10 15 9.4 18.4 9.4C20.2 9.4 20.8 10.8 20.4 12.4C20.2 13.2 19.8 13.6 19.2 13.8C17 13.2 13.4 13.2 10.8 13.8C9.6 14 8.6 13.6 8 12.8C7.4 12 7 11.4 6.4 11.4C5.4 11.4 4.4 11.6 3.4 11.6C2.4 11.6 1.8 11 1.8 10.4C1.8 9.8 2.2 9.4 2.8 9.2C3.8 8.8 4.6 8.2 5.2 7.6C6 7 7 7.2 7.4 8C7.6 8.4 7.8 8.9 8 9.4Z";
const lycaon = [
  limb([[11, 13.8], [11.4, 21]], 1.4, 0.9, LY_FAR, "paw"),
  limb([[16.6, 13.2], [17.4, 17], [16.8, 21]], 1.9, 0.9, LY_FAR, "paw"),
  thick("M20.2 10.8C21.6 11.6 22 13.4 21.8 15.4", LY_DARK, 1.2),
  path("M21.8 15C22.7 15.9 22.9 17.9 22 19.3C21.1 18.4 20.9 16.4 21.8 15Z", LY_CREAM, { w: 0.85 }),
  path("M4.6 8C3.4 7 2.8 5 3.8 4.4C4.8 3.8 5.8 5.6 5.8 7.4Z", LY_DARK, { w: 0.9 }), ellipse(4.4, 5.8, 0.4, 0.9, "#6B5444", false),
  path("M6.8 7.4C7 5.6 7.8 4 8.8 4.4C9.8 4.8 9.2 6.8 7.8 8.4Z", LY_DARK, { w: 0.9 }), ellipse(8.3, 5.8, 0.4, 0.9, "#6B5444", false),
  path(LY_SIL, LY_TAN),
  path("M10.4 10C11.8 10.4 13.4 10.2 14.6 9.8C14.8 11.2 13.6 12.2 12 12.2C10.8 12.2 10 11.2 10.4 10Z", LY_DARK, false),
  path("M16.4 9.8C17.6 9.8 19 9.6 19.8 10.4C20 11.6 19.2 12.4 18 12.2C17 12 16.4 11 16.4 9.8Z", LY_DARK, false),
  path("M14.2 12.6C15.2 12.2 16.4 12.4 17 13.2C16 13.3 15 13.3 14.4 13.4Z", LY_CREAM, false),
  path("M8.2 11.4C8.8 11 9.8 11.2 10 12.2C9.6 12.8 8.8 12.9 8.4 12.6Z", LY_CREAM, false),
  path(LY_SIL, "none"),
  limb([[8.8, 13.6], [8.4, 21]], 1.6, 1, LY_CREAM, "paw"),
  limb([[19.2, 13.8], [20, 17.2], [19.6, 21]], 2.2, 1, LY_DARK, "paw"),
  path("M1.8 10.4C1.8 9.8 2.2 9.4 2.8 9.2C3.6 8.9 4.2 8.6 4.6 8.4C4.4 9.6 4.4 10.8 4.8 11.6C4.2 11.6 3.8 11.6 3.4 11.6C2.4 11.6 1.8 11 1.8 10.4Z", LY_DARK, { w: 0.8 }),
  ellipse(2, 9.9, 0.45, 0.4, O, false),
  eye(5.6, 9.1, 0.52),
].join("");

/* ---------- chacal à chabraque ---------- */
// Renard roux aux oreilles pointues, chabraque noire tiquetée d'argent sur le dos, gorge claire, queue touffue au bout noir.
const JA = "#C67B3C", JA_FAR = "#A5622C", JA_SADDLE = "#3A3330", JA_LIGHT = "#F2E5CD";
const JA_SIL = "M8.2 9.6C10.8 10 14.6 9.6 17.6 9.6C19.4 9.6 20.2 10.8 19.9 12.4C19.7 13.2 19.2 13.6 18.6 13.8C16.6 13.2 13.4 13.2 11 13.8C9.8 14 8.8 13.6 8.2 12.8C7.6 12 7 11.2 6.2 11C5 10.8 3.2 10.6 2 10C1.6 9.7 1.8 9.2 2.3 9C3.4 8.6 4.4 8 5 7.4L5.2 4.4L6.6 6.6L7.6 4.6L7.8 7.8C8 8.4 8.1 9 8.2 9.6Z";
const chacal = [
  limb([[11.2, 13.8], [11.6, 21]], 1.3, 0.8, JA_FAR, "paw"),
  limb([[16.4, 13.2], [17.2, 17], [16.6, 21]], 1.8, 0.8, JA_FAR, "paw"),
  path("M19.4 10.8C21.8 11.6 23 14.4 22.6 17.8C22.4 18.8 21.8 19.4 21.2 19.6C20.8 17 20.4 14.8 19.2 13Z", JA),
  path("M22.6 17.4C22.4 18.8 21.8 19.4 21.2 19.6C21 18.8 20.9 18 20.8 17.2Z", JA_SADDLE, { w: 0.7 }),
  path(JA_SIL, JA),
  path("M9.2 9.9C12 10.2 15 9.8 17.6 9.8C18.8 9.8 19.6 10.6 19.7 11.8C17.6 12 15.6 12.3 14 12.6C12.2 12.2 10.4 11.2 9.2 9.9Z", JA_SADDLE, { w: 0.7 }),
  dots([[11.4, 10.6], [13, 11.4], [14.4, 10.5], [15.8, 11.6], [17, 10.6], [18.4, 11.4]], 0.3, C.grisLight),
  path("M2.4 10.1C3.6 10.6 5 10.8 6.2 11C7 11.2 7.6 12 8 12.6C6.6 12.6 5.2 11.8 4.2 11.2C3.4 10.8 2.8 10.5 2.4 10.1Z", JA_LIGHT, false),
  limb([[9, 13.6], [8.6, 21]], 1.4, 0.85, JA, "paw"),
  limb([[18.8, 13.8], [19.6, 17.2], [19.2, 21]], 2, 0.85, JA, "paw"),
  path("M5.6 5.6L5.5 7.2L6.4 6.6Z", "#7A3E1C", false), path("M7.4 5.4L7 6.8L7.6 7.2Z", "#7A3E1C", false),
  ellipse(2.1, 9.4, 0.42, 0.36, O, false),
  eye(5.4, 8.8, 0.5),
].join("");

/* ---------- antilopes : pattes communes (épaule → genou/jarret → sabot), chaque espèce garde sa silhouette ---------- */
const farLegs = (y0, col, hw = 1.8) => limb([[11.8, y0], [12.2, 21.4]], 1.2, 0.75, col, "hoof") + limb([[16.8, y0 - 0.2], [17.8, 17.6], [17, 21.4]], hw, 0.75, col, "hoof");
const nearLegs = (y0, col, hw = 2) => limb([[9.6, y0], [9.2, 17.4], [9.6, 21.4]], 1.4, 0.8, col, "hoof") + limb([[19, y0], [20, 17.8], [19.6, 21.4]], hw, 0.8, col, "hoof");

/* ---------- grand koudou ---------- */
// Longues cornes en tire-bouchon, grandes oreilles, fines rayures blanches verticales, chevron blanc entre les yeux.
const KU = "#9C8670", KU_FAR = "#7A6654", KU_HORN = "#5A4330", KU_TIP = "#EFE4CF";
const KU_HORN_D = "M5.4 5.4C7.4 5.6 8.8 4.4 7.6 3.6C9.2 3 9.4 1.6 7.8 1.4";
const koudou = [
  farLegs(13.8, KU_FAR),
  thick("M20 10.8C21 11.6 21.4 12.6 21.3 14", KU, 0.7),
  thick(KU_HORN_D, KU_HORN, 0.65), circle(7.8, 1.4, 0.4, KU_TIP, false),
  path("M9.4 13.8C8.6 13.4 8.2 12.4 8 11.2C7.6 9.6 6.8 8.4 6 7.8C5.4 8.4 4.8 8.8 4 9C3.2 9.2 2.4 9.4 1.8 9.2C1.4 8.8 1.6 8.2 2 7.8C2.8 7 3.6 5.8 4.6 5.2C5.4 4.8 6.4 5 6.8 5.8C7.6 6.8 8.8 8.4 10.2 9.2C12.6 9.6 15.4 9.4 17.8 9.4C19.6 9.4 20.4 10.8 20.2 12.4C20 13.4 19.4 14 18.8 14.2C16.4 13.6 12.6 13.6 9.4 13.8Z", KU),
  line("M11.8 9.6L11.6 13.4M13.6 9.6L13.6 13.4M15.4 9.5L15.5 13.4M17.2 9.5L17.4 13.6M18.9 9.8L19.1 13.6", C.white, 0.45),
  line("M7.6 9.4Q7.2 10.6 7.4 11.8", KU_FAR, 0.6),
  nearLegs(13.8, KU),
  path("M6.8 6.2C7.8 5.6 9 5.6 9.6 6.2C9 7 7.8 7.2 7.2 7Z", KU, { w: 0.8 }), ellipse(8.4, 6.4, 0.7, 0.3, "#D9C9B4", false),
  line("M2.8 7.6L4.4 6.6", C.white, 0.5),
  ellipse(1.9, 8.6, 0.4, 0.35, O, false),
  eye(3.9, 7.4, 0.48),
].join("");

/* ---------- gnou bleu ---------- */
// Épaules hautes et dos fuyant, grosse tête basse à la face noire, barbe et crinière noires, cornes en crochet.
const GNU = "#727884", GNU_FAR = "#555A63", GNU_DARK = "#2F2D30";
const gnou = [
  farLegs(14, GNU_FAR),
  thick("M20.2 11.2C21.6 12.2 22 14.2 21.8 16.6", GNU_DARK, 0.6),
  path("M21.8 16C22.8 17.2 22.6 19 21.6 19.6C21 18.6 21.1 17 21.8 16Z", GNU_DARK, { w: 0.7 }),
  path("M9.6 14C8.6 13.4 8 12 7.6 10.8C7.2 10 6.6 9.8 6 10.6C5.4 11.6 4.6 12.8 3.8 13.6C3.2 14.2 2.2 14 2 13.2C1.8 12.4 2.2 11 2.8 9.6C3.4 8.2 4.4 7 5.6 6.6C7 6.2 8.2 6.6 9.4 7.2C11.4 7.4 13 8.2 15 8.8C17 9.2 19 9.4 20 10.6C20.6 11.6 20.4 13.2 19.6 14.2C17 13.6 12.8 13.6 9.6 14Z", GNU),
  line("M10.6 8.2Q11 10.8 10.6 13.6M12.4 8.4Q12.8 11 12.4 13.6M14.2 9Q14.6 11.2 14.2 13.6", GNU_FAR, 0.55),
  // crinière, barbe et face noires
  path("M6.6 6.5L7.2 5.2L8 6.4L8.8 5.4L9.4 6.8L10.4 6.1L10.8 7.4C9.6 7.2 8.6 6.8 6.6 6.5Z", GNU_DARK, { w: 0.6 }),
  path("M6.2 10.6L5.6 13.8L6.5 13.1L6.9 14.6L7.6 13.6L8.2 14.8L8.6 12.6C8 12 7.6 11.2 7.4 10.4Z", GNU_DARK, { w: 0.6 }),
  path("M2.8 9.6C2.2 11 1.8 12.4 2 13.2C2.2 14 3.2 14.2 3.8 13.6C4.2 13.2 4.6 12.6 5 12C4.6 11 4.3 9.6 4.6 7.8C3.8 8.2 3.2 8.8 2.8 9.6Z", GNU_DARK, { w: 0.6 }),
  nearLegs(14, GNU),
  thick("M5.6 7C4.2 6.6 3 6.2 2.6 5C2.4 4.4 2.6 3.8 3.2 3.6", GNU_DARK, 0.75),
  thick("M6.8 6.6C7.8 5.8 8.6 5.2 8.8 4.2C9 3.6 8.8 3 8.2 2.8", GNU_DARK, 0.75),
  ellipse(2.5, 13.4, 0.4, 0.3, C.gris, false),
  eye(5.2, 8.4, 0.5),
].join("");

/* ---------- oryx gemsbok ---------- */
// Très longues cornes droites, masque noir et blanc, bande noire sur le flanc, pattes blanches baguées de noir.
const ORX = "#C9B89C", ORX_FAR = "#A8977C";
const oryx = [
  limb([[11.8, 14], [12.2, 21.4]], 1.2, 0.75, C.grisLight, "hoof"), limb([[16.8, 13.8], [17.8, 17.6], [17, 21.4]], 1.8, 0.75, C.grisLight, "hoof"),
  line("M11.4 15.4H12.8M16.8 15.6H18.2", O, 1),
  thick("M20.3 10.8C21.6 11.8 22 14 21.8 16.6", O, 0.35), path("M21.8 16.2C22.6 17.2 22.4 19 21.6 19.4C21 18.4 21.1 17 21.8 16.2Z", O, false),
  thick("M6.2 6.8L12.4 3.2", "#2B2420", 0.55),
  path("M9.4 14C8.4 13.6 7.8 12.4 7.6 11.2C7.4 10.2 6.8 9.6 6 9.6C5 9.8 4 10.4 3 10.6C2.2 10.8 1.6 10.2 1.8 9.6C2 9 2.8 8.4 3.4 7.6C4 6.8 4.8 6.2 5.8 6.4C6.8 6.6 7.6 7.4 8.4 8.4C9 9 9.6 9.2 10.4 9.2C12.8 9.4 15.6 9.2 18 9.4C19.8 9.6 20.6 11 20.4 12.6C20.2 13.4 19.8 14 19.2 14.2C16.4 13.6 12.6 13.6 9.4 14Z", ORX),
  path("M9.6 13.9C12.6 13.5 16.4 13.5 19.2 14.1C19.9 13.8 20.3 13.2 20.4 12.6C16.8 12 12.8 12 8.6 13C8.9 13.4 9.2 13.7 9.6 13.9Z", C.white, false),
  line("M8.4 12.6C12.4 11.6 16.4 11.6 20.4 12.3", O, 0.9),
  line("M6.6 9.8Q7.4 11 7.6 12.6", O, 0.7),
  limb([[9.6, 14], [9.2, 17.4], [9.6, 21.4]], 1.4, 0.8, C.white, "hoof"), limb([[19, 14], [20, 17.8], [19.6, 21.4]], 2, 0.8, C.white, "hoof"),
  line("M8.6 15.6H10.2M19.2 15.8H20.8", O, 1),
  // masque : face blanche, bandeau noir de la corne à la joue, nez noir
  path("M6.4 9.6C5 9.8 4 10.4 3 10.6C2.2 10.8 1.6 10.2 1.8 9.6C2 9 2.8 8.4 3.4 7.6C4 6.8 4.8 6.2 5.8 6.4C6.6 6.6 7 7.2 7.2 7.8C7.2 8.8 6.8 9.4 6.4 9.6Z", C.white),
  path("M5.4 6.6C5 7.6 4.4 8.6 3.8 9.4L4.8 9.9C5.4 9 6 8 6.4 7Z", O, false),
  path("M1.9 9.5C2.1 9 2.5 8.6 2.9 8.3L3.3 10.4C2.5 10.7 1.8 10.2 1.9 9.5Z", O, false),
  thick("M5.2 6.6L10.2 1.6", "#2B2420", 0.6),
  eye(4.8, 8.2, 0.42),
].join("");

/* ---------- éland du Cap ---------- */
// Massif, bosse au garrot, fanon pendant sous le cou, petite tête, cornes droites et torsadées, fines rayures pâles.
const EL = "#C9A06E", EL_FAR = "#A98152", EL_DARK = "#6B4E33", EL_HORN = "#4A3A2C";
const eland = [
  farLegs(15, EL_FAR, 2),
  thick("M20.7 10.4C21.6 11.4 22 13 21.8 15", EL, 0.6), path("M21.8 14.6C22.7 15.6 22.5 17.4 21.6 17.8C21 16.8 21.1 15.4 21.8 14.6Z", EL_DARK, { w: 0.7 }),
  thick("M5.8 7.2L8 3", EL_HORN, 0.7), line("M6.4 5.9L7.3 6.1M6.9 4.9L7.8 5.1", "#8A7560", 0.4),
  path("M9.4 15C8.4 15 7.6 14.8 6.8 14.2C6 13.6 5.6 12.2 5.2 11C4.6 10.6 4 10.6 3.4 10.6C2.6 10.6 2 10.2 2 9.6C2 9 2.6 8.4 3.2 7.8C3.8 7.2 4.6 6.6 5.6 6.8C6.6 7 7.4 7.4 8.4 7.6C9.4 7 10.6 7 11.6 7.6C14 8.2 16.6 8.2 18.6 8.6C20.4 9 21 10.8 20.8 12.6C20.6 14 20 14.8 19.2 15.2C16 14.6 12.6 14.6 9.4 15Z", EL),
  line("M13.4 8.8L13.2 12.4M15.4 9L15.3 12.6M17.4 9.2L17.4 12.6", "#F1E3C8", 0.45),
  path("M6.4 13.9C6.9 14.5 7.5 14.9 8 15.1L7.2 15.9C6.8 15.4 6.5 14.6 6.4 13.9Z", EL_DARK, { w: 0.6 }),
  line("M8.6 7.9Q10.2 7.4 11.6 7.8", EL_DARK, 0.6),
  nearLegs(15, EL, 2.3),
  ellipse(9.3, 17.6, 0.65, 0.5, EL_DARK, false),
  thick("M4.8 7L5.6 2.6", EL_HORN, 0.75), line("M4.7 5.4L5.6 5.6M4.9 4.3L5.8 4.5", "#8A7560", 0.4),
  ellipse(2.4, 9.4, 0.4, 0.35, O, false),
  eye(3.9, 8.5, 0.46),
].join("");

/* ---------- springbok ---------- */
// Antilope fine, debout : dessus cannelle, large bande sombre sur le flanc, ventre blanc, face blanche barrée d'un trait
// brun de l'œil à la bouche, petites cornes en lyre. (Le bond « pronking » ne se lisait pas à 16 px.)
const SPR = "#CF8E52", SPR_BAND = "#6B3A22", SPR_LEG = "#F1E7D8", SPR_FAR = "#D6C6AE";
const SPR_SIL = "M9.4 13.6C8.6 13.2 8.2 12.2 8 11.2C7.6 9.8 6.8 8.6 6.2 7.8C5.6 8.2 5 8.6 4.2 8.8C3.4 9 2.6 9.2 2 9C1.6 8.6 1.8 8 2.2 7.6C3 6.8 3.8 5.6 4.8 5C5.6 4.6 6.6 4.8 7 5.6C7.8 6.8 9 8.4 10.4 9C12.6 9.4 15.2 9.2 17.6 9.2C19.4 9.2 20.4 10.2 20.4 11.8C20.4 13 19.8 13.8 18.8 14Z";
const springbok = [
  farLegs(13.6, SPR_FAR),
  thick("M20.2 10.8C21 11.6 21.3 12.4 21.2 13.6", SPR_BAND, 0.6),
  thick("M5.2 5.1C4.8 3.9 5.4 3 5 1.9", SPR_BAND, 0.5), thick("M6.2 5.3C6.2 4 6.9 3.2 6.6 2.1", SPR_BAND, 0.5),
  path(SPR_SIL, SPR),
  path("M9 12.4C12.4 11.6 16 11.6 20.3 12.3C20.2 13.2 19.8 13.8 18.8 14L9.4 13.6C9 13.2 8.9 12.8 9 12.4Z", C.white, false),
  line("M8.8 12.2C12.4 11.4 16 11.4 20.3 12.2", SPR_BAND, 1.1),
  path(SPR_SIL, "none"),
  nearLegs(13.6, SPR_LEG),
  path("M6.8 6.2C7.8 5.6 9 5.6 9.6 6.2C9 7 7.8 7.2 7.2 7Z", SPR, { w: 0.8 }),
  path("M2 9C1.6 8.6 1.8 8 2.2 7.6C3 6.8 3.8 5.6 4.8 5C5.2 6 5 7.6 4.2 8.8C3.4 9 2.6 9.2 2 9Z", C.white, { w: 0.8 }),
  line("M4.4 6.5L2.6 8.4", SPR_BAND, 0.55),
  ellipse(1.9, 8.4, 0.35, 0.3, O, false),
  eye(4.1, 6.8, 0.45),
].join("");

/* ---------- hippotrague noir ---------- */
// Robe noire luisante, ventre blanc, face rayée de blanc, crinière dressée, immenses cornes annelées en arc au-dessus du dos.
const SAB = "#2A211C", SAB_FAR = "#1C1613", SAB_HORN = "#4A3C33";
const SAB_SIL = "M9.2 14.2C8.4 13.8 8 12.8 7.8 11.6C7.6 10.4 7 9.6 6.2 9.4C5.4 9.6 4.6 10.2 3.6 10.4C2.6 10.6 1.8 10.2 2 9.4C2.2 8.8 2.8 8.2 3.4 7.4C4 6.6 4.8 6 5.8 6.2C6.8 6.4 7.6 7.2 8.6 8.2C9.4 9 10.2 9.2 11 9.2C13.4 9.4 15.8 9.2 18 9.4C19.8 9.6 20.6 11 20.4 12.6C20.2 13.6 19.6 14.2 19 14.4C16.2 13.8 12.4 13.8 9.2 14.2Z";
const hippotragueNoir = [
  farLegs(14.2, SAB_FAR),
  thick("M20.3 11C21.4 12 21.8 13.6 21.6 15.4", SAB, 0.5), path("M21.6 15C22.4 16 22.2 17.6 21.4 18C20.9 17 21 15.8 21.6 15Z", SAB, { w: 0.7 }),
  thick("M5.6 6.2C6 3.4 8.4 1.8 11 2.2C12.2 2.4 13 3.2 13.4 4.2", SAB_HORN, 0.85),
  line("M6.6 3.9L7.4 4.5M8.2 2.9L8.8 3.7M10 2.4L10.2 3.3M11.8 2.6L11.6 3.5", "#7A6A5E", 0.4),
  path("M6.8 6.8L7.4 5.6L8 6.8L8.8 5.9L9.2 7.4L10.2 6.8L10.4 8.4C9.4 8 8.4 7.4 6.8 6.8Z", SAB, { w: 0.6 }),
  path(SAB_SIL, SAB),
  path("M9.4 14.1C12.4 13.6 16.2 13.6 19 14.3C19.7 13.9 20.2 13.4 20.3 12.8C16.6 12.2 12.8 12.2 8.6 13.2C8.8 13.6 9.1 13.9 9.4 14.1Z", C.white, false),
  nearLegs(14.2, SAB),
  // face : bandes blanches
  line("M5.4 7.2Q4.4 8.2 2.6 9.2", C.white, 0.5), line("M6.2 8.6Q5 9.6 3.2 10.2", C.white, 0.5),
  ellipse(2.1, 9.4, 0.36, 0.3, C.grisLight, false),
  circle(4.6, 7.9, 0.45, "#5A4A40", false),
].join("");

/* ---------- topi ---------- */
// Dos en pente (garrot haut, croupe basse), longue face, taches sombres bleutées aux épaules et aux cuisses, bas des pattes fauve.
const TOP = "#A2552F", TOP_FAR = "#82401F", TOP_DARK = "#4B2C3A", TOP_LEG = "#D9A35C";
const topi = [
  limb([[11.8, 13.8], [12.2, 21.4]], 1.2, 0.75, TOP_LEG, "hoof"), limb([[16.8, 13.6], [17.8, 17.6], [17, 21.4]], 1.8, 0.75, TOP_FAR, "hoof"),
  limb([[17.7, 17.2], [17, 21.4]], 0.9, 0.75, TOP_LEG, "hoof"),
  thick("M20 11.4C21 12.2 21.4 13.4 21.2 15", O, 0.4),
  thick("M5.6 6C5.4 5 5.8 4.2 6.6 4C7 3.9 7.4 4.1 7.5 4.5", "#2B2420", 0.55),
  path("M9 13.8C8.2 13.4 7.8 12.4 7.6 11.4C7.4 10.4 6.8 9.4 6 8.6C5.4 9.4 4.6 10.4 3.8 11.2C3.2 11.8 2.2 11.8 2 11.2C1.8 10.6 2.4 9.6 3 8.6C3.6 7.4 4.4 6.4 5.4 6C6.4 5.8 7.4 6.4 8.4 7.4C9.6 7.6 11 7.8 12.4 8.4C14.6 9.2 17 9.6 18.6 10.2C20 10.8 20.4 12.4 19.8 13.6C19.4 14.2 18.8 14.4 18.2 14.4C15.4 13.8 12.2 13.6 9 13.8Z", TOP),
  path("M16.4 11.4C17.6 10.8 19.4 11.2 19.9 12.6C19.9 13.4 19.4 14.2 18.6 14.4C17.6 14.2 16.6 13.6 16.2 12.6Z", TOP_DARK, false),
  path("M8.2 9.8C9.2 9.6 10.6 10.2 10.8 11.6C10.8 12.8 10 13.6 9 13.8C8.2 13.4 7.8 12.4 7.6 11.4Z", TOP_DARK, false),
  path("M3.2 8.4C2.6 9.6 2.2 10.6 2.1 11.1C2.4 11.6 3.2 11.6 3.8 11.1C3.6 10.2 3.6 9.2 4.2 7.4C3.8 7.6 3.4 8 3.2 8.4Z", TOP_DARK, false),
  path("M9 13.8C8.2 13.4 7.8 12.4 7.6 11.4C7.4 10.4 6.8 9.4 6 8.6C5.4 9.4 4.6 10.4 3.8 11.2C3.2 11.8 2.2 11.8 2 11.2C1.8 10.6 2.4 9.6 3 8.6C3.6 7.4 4.4 6.4 5.4 6C6.4 5.8 7.4 6.4 8.4 7.4C9.6 7.6 11 7.8 12.4 8.4C14.6 9.2 17 9.6 18.6 10.2C20 10.8 20.4 12.4 19.8 13.6C19.4 14.2 18.8 14.4 18.2 14.4C15.4 13.8 12.2 13.6 9 13.8Z", "none"),
  limb([[9.6, 13.8], [9.2, 17.4], [9.6, 21.4]], 1.6, 0.8, TOP_DARK, "hoof"), limb([[9.3, 17], [9.6, 21.4]], 1, 0.8, TOP_LEG, "hoof"),
  limb([[19, 13.8], [20, 17.8], [19.6, 21.4]], 2, 0.8, TOP_DARK, "hoof"), limb([[19.95, 17.4], [19.6, 21.4]], 1, 0.8, TOP_LEG, "hoof"),
  path("M7.2 6.6C8 6 8.8 5.8 9.2 6C8.8 6.6 8 7.2 7.4 7.2Z", TOP, { w: 0.7 }),
  eye(4.9, 7.9, 0.45),
].join("");

/* ---------- cobe à croissant (waterbuck) ---------- */
// Trapu, pelage gris-brun hirsute, anneau blanc autour de la croupe, bavette blanche, cornes annelées recourbées vers l'avant.
const WB = "#8A7660", WB_FAR = "#6C5B48", WB_HORN = "#5A4636";
const cobe = [
  farLegs(14.2, WB_FAR, 2),
  thick("M20.5 11C21.4 11.8 21.8 13 21.6 14.6", WB, 0.6),
  thick("M6.4 6.4C7 4.8 6.8 3.2 5.8 2.2", "#463626", 0.65),
  path("M9.2 14.2C8.4 13.8 8 12.8 7.8 11.6C7.6 10.4 7 9.6 6.2 9.4C5.4 9.6 4.6 10.2 3.6 10.4C2.6 10.6 1.8 10.2 2 9.4C2.2 8.8 2.8 8.2 3.4 7.4C4 6.6 4.8 6 5.8 6.2C6.8 6.4 7.6 7.2 8.6 8C9.4 8.8 10.2 9 11 9C13.4 9.2 15.8 8.8 18 9C19.8 9.2 20.8 10.8 20.6 12.6C20.4 13.6 19.8 14.2 19.2 14.4C16.2 13.8 12.4 13.8 9.2 14.2Z", WB),
  circle(17.8, 11.8, 1.4, "none", { c: C.white, w: 0.75 }),
  line("M8.2 8.6L8.8 7.6M9.6 9.2L10.4 8.4", WB_FAR, 0.5),
  path("M6.4 9.6C6.9 10 7.2 10.6 7.4 11.2C6.8 11.2 6.2 10.8 5.9 10.2Z", C.white, false),
  nearLegs(14.2, WB, 2.3),
  thick("M5.2 6.4C5 4.8 4.2 3.6 3 3.2", WB_HORN, 0.7), line("M4.4 4.6L5.3 4.3M3.7 3.8L4.4 3.4", "#8C7A66", 0.35),
  path("M7.4 7C8.2 6.4 9 6.2 9.4 6.4C9 7 8.2 7.6 7.6 7.6Z", WB, { w: 0.7 }),
  path("M3.6 8.2C3.2 8.8 2.8 9.4 2.2 9.6", C.white, { c: C.white, w: 0.45 }),
  ellipse(2.1, 9.4, 0.4, 0.34, O, false),
  eye(4.3, 8.1, 0.46),
].join("");

/* ---------- dik-dik ---------- */
// Minuscule antilope : grosse tête, énorme œil cerclé de blanc, museau allongé et mobile, toupet, cornes en épine, pattes fines.
const DIK = "#9E8466", DIK_FAR = "#7E6650", DIK_RED = "#C27A48";
const dikdik = [
  limb([[11.8, 15], [12, 21]], 0.9, 0.55, DIK_FAR, "hoof"), limb([[16.6, 14.8], [17.4, 18], [16.8, 21]], 1.4, 0.55, DIK_FAR, "hoof"),
  path("M9.6 15C8.8 14.6 8.4 13.8 8.2 13C8 12.2 7.6 11.6 7 11.4C6.2 11.6 5.4 11.8 4.4 11.8C3.4 11.8 2.4 11.4 1.8 10.6C1.4 10.2 1.6 9.6 2.2 9.4C3 9 3.4 8.2 3.8 7.4C4.4 6.2 5.8 5.8 7 6.4C7.8 6.8 8.2 7.6 8.6 8.6C9 9.6 9.8 10.4 11 10.4C13.2 10 15.6 9.8 17.4 10.2C19.2 10.6 20 12 19.8 13.4C19.6 14.4 19 15 18.2 15.2C15.6 14.6 12.6 14.6 9.6 15Z", DIK),
  path("M10 14.9C12.6 14.6 15.6 14.6 18 15.1C17 14.2 15 13.8 13.6 13.9C12 14 10.8 14.3 10 14.9Z", "#E6D8C2", false),
  // tête rousse
  path("M7 11.4C6.2 11.6 5.4 11.8 4.4 11.8C3.4 11.8 2.4 11.4 1.8 10.6C1.4 10.2 1.6 9.6 2.2 9.4C3 9 3.4 8.2 3.8 7.4C4.4 6.2 5.8 5.8 7 6.4C7.8 6.8 8.2 7.6 8.4 8.4C8.4 9.8 7.8 10.8 7 11.4Z", DIK_RED),
  limb([[9.8, 15], [9.6, 21]], 1.1, 0.6, DIK_RED, "hoof"), limb([[18.6, 15], [19.4, 18.2], [19, 21]], 1.6, 0.6, DIK_RED, "hoof"),
  thick("M5.6 6.4L6 4", "#4A3628", 0.4),
  path("M4.6 6.4L5.2 5L5.8 6.2L6.6 5.2L6.8 6.6Z", "#B26A3A", { w: 0.6 }),
  path("M7.2 6.6C8 5.2 9.6 4.6 10.4 5C10.2 6.2 9 7.2 7.8 7.6Z", DIK, { w: 0.8 }), ellipse(9, 6, 0.7, 0.3, "#E6D8C2", false),
  circle(5.2, 8.6, 1.05, C.white, { w: 0.6 }),
  eye(5.2, 8.6, 0.62),
  ellipse(1.9, 10, 0.4, 0.34, O, false),
].join("");

/* ---------- gérénuk (debout sur ses pattes arrière) ---------- */
// Cou démesuré tendu vers une branche, dressé sur les pattes arrière, pattes avant repliées, grandes oreilles, selle rousse.
const GER = "#B5733F", GER_LIGHT = "#E2B98A", GER_FAR = "#9A5E31";
const gerenuk = [
  thick("M1.6 2.6C3 2.8 4.6 2.6 6 1.8", "#7A5234", 0.8),
  ellipse(3.4, 4, 0.55, 1, C.feuille, { w: 0.7 }), ellipse(5.2, 3.4, 0.5, 0.9, C.vertLight, { w: 0.7 }),
  limb([[12.4, 13.6], [9.4, 13.2], [8.2, 11.6]], 1.1, 0.6, GER_FAR, "hoof"),
  limb([[17, 18.4], [18.2, 20], [17.8, 21.8]], 1.6, 0.8, GER_FAR, "hoof"),
  path("M18.2 15.8C18.6 17.6 17.6 18.8 16 18.6C14.6 18.4 13.6 17.4 13 16.2C12.4 14.8 11.8 13.4 11.4 12C10.6 10 10 8 9.4 6.2C8.8 6 8 5.8 7.2 5.8C6.4 5.8 5.6 5.4 5.6 4.8C5.6 4.2 6.4 3.8 7.2 3.6C8.4 3.2 9.6 3.2 10.4 3.8C11.2 4.4 11.6 5.6 12 7C12.6 8.8 13.4 10.2 14.6 11.4C16.2 12.6 17.8 14 18.2 15.8Z", GER_LIGHT),
  path("M10.6 4.2C11.2 4.8 11.6 5.8 12 7C12.6 8.8 13.4 10.2 14.6 11.4C16.2 12.6 17.8 14 18.2 15.8C18.3 16.6 18.1 17.2 17.8 17.6C16.6 15.4 14.8 13.8 13.6 12.4C12.4 10.8 11.4 8.4 10.6 4.2Z", GER, false),
  path("M18.2 15.8C18.6 17.6 17.6 18.8 16 18.6C14.6 18.4 13.6 17.4 13 16.2C12.4 14.8 11.8 13.4 11.4 12C10.6 10 10 8 9.4 6.2C8.8 6 8 5.8 7.2 5.8C6.4 5.8 5.6 5.4 5.6 4.8C5.6 4.2 6.4 3.8 7.2 3.6C8.4 3.2 9.6 3.2 10.4 3.8C11.2 4.4 11.6 5.6 12 7C12.6 8.8 13.4 10.2 14.6 11.4C16.2 12.6 17.8 14 18.2 15.8Z", "none"),
  limb([[11.6, 11.6], [8.6, 10.6], [7.6, 8.6]], 1.2, 0.65, GER, "hoof"),
  limb([[14.6, 17.8], [15.2, 20], [14.6, 21.8]], 1.9, 0.85, GER, "hoof"),
  path("M10.8 3.8C11.6 2.8 12.8 2.6 13.6 3C13.2 3.8 12.2 4.4 11.4 4.6Z", GER, { w: 0.8 }), ellipse(12.4, 3.6, 0.6, 0.25, GER_LIGHT, false),
  ellipse(5.9, 4.7, 0.36, 0.3, O, false),
  circle(7.8, 4.6, 0.75, C.white, { w: 0.5 }), eye(7.8, 4.6, 0.45),
].join("");

/* ---------- ratel (blaireau à miel) ---------- */
// Bas et trapu, dessous noir, large cape gris argent du front à la queue, pattes courtes aux griffes claires, queue dressée.
const RAT_BK = "#211A16", RAT_GREY = "#D3D6D1";
const RAT_SIL = "M3.4 13.6C2.4 13.4 1.8 12.8 2 12.2C2.4 11.2 3.6 10.4 5 10C7 9.2 9.6 8.8 12.6 8.8C15.6 8.8 18.2 9.2 19.6 10.2C20.8 11 21 12.6 20.4 14C20 15 19.2 15.6 18.2 15.8H6.8C5.4 15.6 4.6 14.6 3.4 13.6Z";
const ratel = g(tf(0, -2.2), [
  limb([[9.6, 15.8], [9.6, 19.6], [8.4, 20]], 1.7, 1.1, "#15100D"), limb([[16, 15.8], [16.2, 19.6], [15, 20]], 1.9, 1.1, "#15100D"),
  thick("M20.2 10.4C21.2 10 21.8 9 21.8 7.8", RAT_BK, 1),
  path(RAT_SIL, RAT_GREY),
  path("M3.4 13.6C4.4 13 6 12.6 8 12.6C11.6 12.6 15.6 12.6 20.6 12.8C20.6 13.6 20.4 14.4 20 15C19.4 15.6 18.6 15.8 18.2 15.8H6.8C5.4 15.6 4.6 14.6 3.4 13.6Z", RAT_BK, false),
  line("M3.6 13.4C4.6 12.8 6 12.4 8 12.4C11.6 12.4 15.6 12.4 20.6 12.6", C.white, 0.5),
  path(RAT_SIL, "none"),
  limb([[7, 15.8], [6.8, 19.6], [5.6, 20]], 1.8, 1.1, RAT_BK), limb([[18.6, 15.6], [19, 19.6], [17.8, 20]], 2.1, 1.1, RAT_BK),
  line("M5.2 20.2L4.6 20.4M8 20.2L7.4 20.4M14.6 20.2L14 20.4M17.4 20.2L16.8 20.4", C.grisLight, 0.5),
  ellipse(2, 12.4, 0.42, 0.36, O, false),
  eye(4.8, 11.6, 0.48),
].join(""));

/* ---------- oryctérope ---------- */
// Dos très arqué, long groin tubulaire, longues oreilles dressées, grosse queue conique traînant au sol, pattes courtes.
const AAR = "#BCA392", AAR_FAR = "#957C6C", AAR_PINK = "#E0B3A6";
const orycterope = g(tf(0, -1.4), [
  limb([[12, 15.6], [12.2, 19.8], [10.8, 20.2]], 1.8, 1.2, AAR_FAR), limb([[16.6, 15.6], [16.8, 19.8], [15.4, 20.2]], 2.2, 1.2, AAR_FAR),
  path("M19.6 11.2C21.6 12.6 22.6 16 22.8 20.6C21.8 18.4 20.6 16.4 18.8 14.8Z", AAR),
  path("M6.4 12.6C5.6 12.6 4.8 13 4 13.6C3.2 14.2 2.4 14.6 1.8 14.4C1.4 14.2 1.6 13.6 2 13.2C3 12.4 4 11.4 5 10.6C6 9.8 7.2 9.4 8.4 9.6C10 7.4 12.6 6.4 15.2 6.8C18 7.2 19.8 9.2 20.2 12C20.4 13.4 20 14.8 19.2 15.6H9.4C8.4 15.4 7.8 14.8 7.4 14C7.2 13.2 6.8 12.8 6.4 12.6Z", AAR),
  line("M10.4 8.6Q12 10.8 11.6 15.2M16.4 7.4Q17.4 10.6 16.8 15.4", AAR_FAR, 0.5),
  limb([[9.8, 15.6], [9.4, 19.8], [8, 20.2]], 2, 1.3, AAR), limb([[18.8, 15.4], [19.4, 19.8], [18, 20.2]], 2.4, 1.3, AAR),
  path("M7.4 9.8C6.8 8 6.8 5.8 7.4 4C8.4 5.4 8.8 7.6 8.6 9.6Z", AAR, { w: 0.85 }), ellipse(7.7, 7, 0.35, 1.6, AAR_PINK, false),
  ellipse(1.8, 13.8, 0.5, 0.55, AAR_PINK, { w: 0.7 }),
  eye(6.4, 11.2, 0.45),
].join(""));

/* ---------- porc-épic à crête ---------- */
// Corps rond et noir, grande gerbe de piquants rayés noir et blanc dressés sur le dos, crête blanche sur la nuque.
const POR = "#2E2622", POR_FAR = "#201A17", QUILL = "#F2ECE0";
const quill = (x1, y1, x2, y2) => line(`M${x1} ${y1}L${x2} ${y2}`, O, 1.8) + line(`M${x1} ${y1}L${x2} ${y2}`, QUILL, 0.85)
  + line(`M${r2(x1 + (x2 - x1) * 0.45)} ${r2(y1 + (y2 - y1) * 0.45)}L${r2(x1 + (x2 - x1) * 0.62)} ${r2(y1 + (y2 - y1) * 0.62)}`, POR, 0.9);
const porcepic = g(tf(0, 0.6), [
  quill(8.6, 11, 6.6, 4.8), quill(10.8, 10.6, 10, 2.8), quill(13, 10.6, 13.8, 2.4), quill(15.2, 11, 17.6, 3.6), quill(17.2, 11.8, 20.8, 6), quill(19, 13.2, 22.6, 10.2),
  quill(12, 11, 11.8, 5.4), quill(16.2, 11.4, 19.2, 7),
  limb([[10, 16.4], [10.2, 19.4]], 1.4, 1.1, POR_FAR, "paw"), limb([[15.6, 16.4], [15.4, 19.4]], 1.6, 1.1, POR_FAR, "paw"),
  path("M4.4 15.8C3.4 15.6 2.6 15 2.6 14.2C2.6 13.4 3.4 12.6 4.6 12.2C5.6 11.8 6.4 11.4 7.2 11.4C8.6 10.6 10.4 10.2 12.6 10.4C16 10.6 19 12 20 14.2C20.4 15.2 19.8 16.4 18.6 16.4H6.4C5.6 16.4 5 16.2 4.4 15.8Z", POR),
  line("M9 12.4L8.4 14M11.4 11.8L11 13.6M13.8 11.8L13.8 13.6M16.2 12.4L16.6 14M18.2 13.4L18.8 14.8", QUILL, 0.5),
  limb([[7.4, 16.4], [7.2, 19.4]], 1.5, 1.1, POR, "paw"), limb([[18, 16.2], [18.4, 19.4]], 1.7, 1.1, POR, "paw"),
  thick("M6.2 11.6L5.2 9.4", QUILL, 0.5), thick("M7.2 11.2L6.8 8.8", QUILL, 0.5),
  path("M2.6 14.2C2.6 13.4 3.4 12.6 4.6 12.2C5.4 12.6 5.8 13.6 5.6 14.6C5.2 15.4 4.6 15.8 4.4 15.8C3.4 15.6 2.6 15 2.6 14.2Z", "#4A3E37", { w: 0.7 }),
  ellipse(2.7, 14, 0.36, 0.32, O, false),
  eye(4.4, 13.5, 0.42),
].join(""));

/* ---------- mangouste rayée ---------- */
// Corps long et bas, museau pointu, petites oreilles rondes, bandes sombres en travers du dos, longue queue effilée.
const MON = "#8F7D68", MON_FAR = "#6E5E4C", MON_BAND = "#4A3B2E", MON_LIGHT = "#BBA990";
const mangouste = g(tf(0, -2.4, 1.05), [
  limb([[11.6, 15.8], [11.8, 19.8]], 1.3, 0.9, MON_FAR, "paw"), limb([[15, 15.8], [15, 19.8]], 1.6, 0.9, MON_FAR, "paw"),
  path("M18.4 12.4C20.8 13 22.2 14.8 22.2 17.2C22.2 18.4 21.8 19.4 21.2 19.6C20.8 17.8 19.8 16.2 18 15.4Z", MON),
  path("M22.2 17.6C22.2 18.6 21.8 19.4 21.2 19.6C21 19 20.8 18.4 20.6 17.8Z", MON_BAND, { w: 0.7 }),
  path("M5.6 10.9C5.6 10 6.4 9.6 7.2 10Z", MON, { w: 0.8 }),
  path("M7.2 11.6C9.8 10.4 13 10.2 15.6 10.6C17.6 10.9 18.8 12 18.8 13.6C18.8 14.8 18 15.6 17 15.8H9.2C8.2 15.6 7.4 15 7 14.2C6.6 13.6 6 13.4 5.2 13.6C4.2 13.8 3 13.8 2.2 13.4C1.6 13 1.8 12.4 2.4 12.2C3.6 11.6 4.6 11 5.6 10.8C6.4 10.8 6.8 11.2 7.2 11.6Z", MON),
  path("M9.4 15.8H16.8C15.6 15 14.2 14.8 13 14.8C11.8 14.8 10.4 15 9.4 15.8Z", MON_LIGHT, false),
  line("M10.2 10.9L10.4 13.4M12.4 10.5L12.6 13.2M14.6 10.5L14.8 13.2M16.8 10.9L17 13.4", MON_BAND, 0.85),
  limb([[9.4, 15.8], [9, 19.8]], 1.4, 0.9, MON, "paw"), limb([[17.2, 15.6], [17.6, 19.8]], 1.8, 0.9, MON, "paw"),
  ellipse(2, 12.8, 0.4, 0.34, O, false),
  eye(4.6, 12.1, 0.45),
].join(""));

/* ---------- daman des rochers ---------- */
// Boule trapue sans queue, petites oreilles rondes, museau court, tache dorsale sombre, posé sur son rocher.
const HYR = "#8B735A", HYR_LIGHT = "#C4AE92", ROCK = "#A9A39A", ROCK_DARK = "#8A847C";
const daman = [
  path("M1.6 21.8L3.4 17.6L6.6 16.4L11 16.8L15.4 16.2L18.2 16.6L20.6 17.6L22.4 21.8Z", ROCK),
  line("M14.6 18.8L16.8 19.6M5 19.6L7 20.2", ROCK_DARK, 0.6),
  path("M7.2 8.6C7 7.6 7.8 7 8.6 7.4Z", HYR, { w: 0.8 }),
  path("M4.2 13.6C3 13.4 2.2 12.6 2.4 11.6C2.6 10.4 3.6 9.4 5 8.8C6.2 8.2 7.4 8.4 8.2 8.8C10 7.4 13 6.8 15.6 7.2C18.6 7.8 20.4 10 20.4 12.6C20.4 14.6 19.2 15.8 17.4 15.8H7.2C5.8 15.8 5 15 4.2 13.6Z", HYR),
  path("M7.4 15.8H17.4C16.6 14.8 15 14.4 12.4 14.4C10 14.4 8.4 14.8 7.4 15.8Z", HYR_LIGHT, false),
  ellipse(14.8, 9.6, 0.9, 0.55, "#4A3B2E", false),
  ellipse(8.2, 16.2, 1.4, 0.75, HYR, { w: 0.9 }), ellipse(16.4, 16.2, 1.4, 0.75, HYR, { w: 0.9 }),
  ellipse(2.6, 11.6, 0.42, 0.36, O, false),
  path("M3.2 12.8Q3.9 13.2 4.6 12.8", "none", { c: O, w: 0.55 }),
  eye(5.4, 10.8, 0.5),
].join("");

const A = (slug, fr, en, char, tags, body) => ({ slug, fr, en, char, group: "animaux", tags, tone: false, body });
export default [
  A("guepard", "Guépard", "Cheetah", null, ["guépard", "cheetah", "duma", "félin", "savane", "savanna", "kenya", "namibie", "larmes noires"], guepard),
  A("lycaon", "Lycaon", "African wild dog", null, ["lycaon", "african wild dog", "chien sauvage", "painted dog", "mbwa mwitu", "inkentshane", "savane", "botswana", "zimbabwe"], lycaon),
  A("chacal", "Chacal à chabraque", "Black-backed jackal", null, ["chacal", "jackal", "black-backed jackal", "chabraque", "mbweha", "rooijakkals", "savane", "kenya", "afrique du sud"], chacal),
  A("gnou", "Gnou bleu", "Blue wildebeest", null, ["gnou", "wildebeest", "gnu", "nyumbu", "inkonkoni", "migration", "serengeti", "masai mara", "savane"], gnou),
  A("oryx", "Oryx gemsbok", "Gemsbok", null, ["oryx", "gemsbok", "gemsbuck", "choroa", "kalahari", "namib", "namibie", "botswana", "désert", "antilope"], oryx),
  A("koudou", "Grand koudou", "Greater kudu", null, ["koudou", "kudu", "greater kudu", "tandala", "iqudu", "antilope", "antelope", "cornes spiralées", "savane", "zimbabwe"], koudou),
  A("eland", "Éland du Cap", "Common eland", null, ["éland", "eland", "common eland", "pofu", "impofu", "antilope", "antelope", "fanon", "savane", "afrique australe"], eland),
  A("springbok", "Springbok", "Springbok", null, ["springbok", "springbuck", "pronking", "saut", "antilope", "antelope", "kalahari", "afrique du sud", "namibie"], springbok),
  A("hippotrague-noir", "Hippotrague noir", "Sable antelope", null, ["hippotrague noir", "sable antelope", "sable", "palahala", "mbarapi", "antilope", "antelope", "cornes en cimeterre", "zimbabwe", "angola"], hippotragueNoir),
  A("topi", "Topi", "Topi", null, ["topi", "nyamera", "tsessebe", "antilope", "antelope", "termitière", "termite mound", "serengeti", "masai mara", "savane"], topi),
  A("cobe-a-croissant", "Cobe à croissant", "Waterbuck", null, ["cobe à croissant", "waterbuck", "kuro", "iphiva", "antilope", "antelope", "anneau blanc", "rivière", "savane"], cobe),
  A("dik-dik", "Dik-dik", "Dik-dik", null, ["dik-dik", "dikdik", "digidigi", "petite antilope", "antelope", "kenya", "tanzanie", "namibie", "brousse"], dikdik),
  A("gerenuk", "Gérénuk", "Gerenuk", null, ["gérénuk", "gerenuk", "swala twiga", "antilope girafe", "antelope", "somalie", "kenya", "éthiopie", "acacia"], gerenuk),
  A("serval", "Serval", "Serval", null, ["serval", "mondo", "indlozi", "félin", "chat sauvage", "wild cat", "grandes oreilles", "savane", "tanzanie"], serval),
  A("caracal", "Caracal", "Caracal", null, ["caracal", "lynx du désert", "simba mangu", "rooikat", "félin", "wild cat", "pinceaux", "sahel", "désert", "savane"], caracal),
  A("ratel", "Ratel", "Honey badger", "🦡", ["ratel", "honey badger", "blaireau", "badger", "nyegere", "insele", "savane", "miel", "honey", "afrique du sud"], ratel),
  A("orycterope", "Oryctérope", "Aardvark", null, ["oryctérope", "aardvark", "cochon de terre", "muhanga", "isambane", "termites", "nocturne", "savane", "afrique australe"], orycterope),
  A("porc-epic", "Porc-épic à crête", "Crested porcupine", null, ["porc-épic", "porcupine", "crested porcupine", "nungunungu", "ingungumbane", "piquants", "quills", "savane", "sahel"], porcepic),
  A("mangouste-rayee", "Mangouste rayée", "Banded mongoose", null, ["mangouste rayée", "banded mongoose", "mangouste", "mongoose", "nguchiro", "savane", "ouganda", "kenya"], mangouste),
  A("daman-des-rochers", "Daman des rochers", "Rock hyrax", null, ["daman des rochers", "rock hyrax", "daman", "pimbi", "imbila", "dassie", "rochers", "kopje", "afrique australe", "éthiopie"], daman),
];
