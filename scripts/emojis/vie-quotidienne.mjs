// Emojis africains originaux, vie quotidienne : maison, cuisine, transport, marché, travail (char: null sauf équivalent Unicode).
import { O, W, C, path, circle, ellipse, rect, line, g } from "./lib.mjs";

/** Trait épais « plein » : contour brun puis couleur par-dessus (même recette que afrique-choses.mjs). */
const thick = (d, col, w = 1.5) => line(d, O, w + 2 * W) + line(d, col, w);
const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const eye = (x, y, r = 0.5) => circle(x, y, r, O, false);
const wheel = (x, y, r = 3, hub = C.grisLight) => circle(x, y, r, C.noir) + circle(x, y, r * 0.45, hub, { w: 0.7 });
const spokes = (x, y, r, n, col = O, w = 0.7) => line(Array.from({ length: n }, (_, i) => {
  const t = (Math.PI * i) / n, dx = Math.cos(t) * r, dy = Math.sin(t) * r;
  return `M${x - dx} ${y - dy}L${x + dx} ${y + dy}`;
}).join(""), col, w);
const n2 = (v) => Math.round(v * 100) / 100;

const RED_DARK = "#A8261B";
const IRON = "#3A3632";
const STEEL = "#7D868D";
const GLASS = "#DDF0F8";
const COAL = "#3B2E28";
const GLOW = "#FF8A2B";
const STRAW = "#E7C47A", STRAW_DARK = "#B98A3E";
const PINK = "#E2458C", LIME = "#9BD13C";

/* ---------------- maison ---------------- */

// Chaise en plastique monobloc rouge, vue de face : dossier ajouré, accoudoirs, pieds évasés.
const chaise = [
  thick("M7.6 15L6.4 21.8M16.4 15L17.6 21.8", RED_DARK, 1.3),
  path("M5.4 3.6Q12 1.4 18.6 3.6L17.6 13.8H6.4Z", C.rouge),
  rect(8, 5.2, 8, 1.3, 0.6, RED_DARK, { w: 0.7 }),
  rect(8.2, 7.6, 7.6, 1.3, 0.6, RED_DARK, { w: 0.7 }),
  rect(8.4, 10, 7.2, 1.3, 0.6, RED_DARK, { w: 0.7 }),
  path("M6.2 8.4Q3 8.6 3 11.4V15.4H4.8V11.6Q4.8 10.2 6 10.2Z", C.rouge, { w: 0.9 }),
  path("M17.8 8.4Q21 8.6 21 11.4V15.4H19.2V11.6Q19.2 10.2 18 10.2Z", C.rouge, { w: 0.9 }),
  path("M3.2 13.4H20.8L19.4 16.6H4.6Z", C.rouge),
  line("M4.6 14.6H19.4", "#F07060", 0.7),
  path("M4.6 16.6L3 22.2H5.2L7.2 16.6Z", C.rouge, { w: 0.9 }),
  path("M19.4 16.6L21 22.2H18.8L16.8 16.6Z", C.rouge, { w: 0.9 }),
].join("");

// Bidon jaune (« Kufuor gallon ») : poignée, bouchon bleu, panneau embouti.
const bidon = [
  thick("M6.6 6.4V3.6Q6.6 2.6 7.6 2.6H12.6Q13.6 2.6 13.6 3.6V6.4", C.jaune, 1.4),
  rect(15.2, 3.8, 3.6, 2.8, 0.6, C.jaune, { w: 0.9 }),
  rect(14.8, 1.6, 4.4, 2.6, 0.8, C.bleu, { w: 0.9 }),
  line("M16 2.2V3.6M17 2.2V3.6M18 2.2V3.6", C.indigo, 0.5),
  rect(3.4, 6, 17.2, 16.2, 2.2, C.jaune),
  rect(5.6, 9, 12.8, 10.6, 1.4, C.jauneShade, { w: 0.8 }),
  line("M6.6 10L17.4 18.6M17.4 10L6.6 18.6", C.ocreLight, 1),
  line("M4.6 7.6H19.4", C.ocreLight, 0.7),
].join("");

// Bassine émaillée : blanche, bord bleu, fleurs rouges.
const flower = (x, y, r = 0.8, petal = C.rouge) => [0, 1, 2, 3, 4].map((i) => {
  const t = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
  return circle(n2(x + Math.cos(t) * r), n2(y + Math.sin(t) * r), r * 0.62, petal, { w: 0.5 });
}).join("") + circle(x, y, r * 0.5, C.jaune, { w: 0.4 });
const bassine = [
  ellipse(12, 20.4, 5.6, 1.2, C.white, { w: 0.9 }),
  path("M1.4 9.6Q2.6 20.6 12 20.6Q21.4 20.6 22.6 9.6Z", C.white),
  ellipse(6.6, 13.8, 1.4, 0.7, C.vertLight, { w: 0.5 }), ellipse(16.8, 13.4, 1.4, 0.7, C.vertLight, { w: 0.5 }),
  ellipse(11.2, 17.6, 1.3, 0.6, C.vertLight, { w: 0.5 }),
  flower(5.4, 12.6, 1), flower(12, 14.4, 1.2), flower(18.2, 12.4, 1), flower(8.6, 17.2, 0.8), flower(15.4, 17, 0.8),
  ellipse(12, 9.6, 10.8, 3.2, C.bleu),
  ellipse(12, 9.8, 9.4, 2.4, "#EAF3FA", { w: 0.8 }),
  path("M3.4 10.4Q12 13.2 20.6 10.4Q20 11.8 12 12.1Q4 11.8 3.4 10.4Z", "#C9DCEB", false),
].join("");

// Mortier en bois et long pilon.
const mortier = [
  ellipse(12, 21.8, 6.8, 0.9, C.sable, { w: 0.8 }),
  path("M4.6 9.4Q4.8 13.4 9.6 16Q10 17 9.2 18.4Q6.4 19.6 6.4 21.2Q12 22.8 17.6 21.2Q17.6 19.6 14.8 18.4Q14 17 14.4 16Q19.2 13.4 19.4 9.4Z", C.bois),
  line("M6.4 12.6Q12 14.2 17.6 12.6M9.2 18.4Q12 19.2 14.8 18.4", C.marron, 0.8),
  line("M8.6 10.6Q8.8 13 10.6 14.6", "#C98A54", 0.9),
  ellipse(12, 9.4, 7.4, 2.4, C.marron),
  ellipse(12, 9.8, 5.8, 1.6, C.cream, { w: 0.7 }),
  thick("M11.8 9.6L18.4 1.6", "#C98A54", 1.6),
  line("M15.8 4.8L16.6 5.4", C.marron, 0.6),
].join("");

// Fourneau à charbon en tôle, braises rougeoyantes, marmite dessus.
const fourneau = [
  thick("M6.4 19.4L5 22.2M17.6 19.4L19 22.2M12 20V22.4", IRON, 0.9),
  path("M4 11.6H20L18.2 20.2H5.8Z", STEEL),
  path("M8.4 20.2V16.6Q8.4 14.6 10.4 14.6H13.6Q15.6 14.6 15.6 16.6V20.2Z", COAL, { w: 0.9 }),
  dots([[10.2, 18.6], [12, 17.4], [13.8, 18.8], [11.2, 19.6], [12.8, 16.2]], 0.75, GLOW),
  dots([[10.6, 17.2], [13.2, 17.6]], 0.45, C.jaune),
  line("M5 13.4H19", C.grisLight, 0.6),
  path("M3.2 10.6H20.8V12H3.2Z", IRON, { w: 0.9 }),
  path("M7.2 10.6L8 9.2L8.8 10.6M11.2 10.6L12 9L12.8 10.6M15.2 10.6L16 9.2L16.8 10.6", GLOW, { w: 0.6 }),
  path("M5.6 9.2Q5.4 3.6 12 3.6Q18.6 3.6 18.4 9.2Z", C.noir),
  ellipse(12, 4, 5.6, 1.2, C.gris, { w: 0.9 }),
  circle(12, 2.6, 0.8, C.noir, { w: 0.7 }),
  thick("M5.4 5.6H3.6M18.6 5.6H20.4", C.noir, 0.9),
  line("M7.4 6.4Q7.4 8 8.4 8.6", C.gris, 0.7),
].join("");

// Lampe-tempête : réservoir rouge, globe de verre, flamme, tubes latéraux, anse.
const lampe = [
  line("M7.6 5Q12 -1.4 16.4 5", O, 1),
  thick("M4.6 17.6V8.4Q4.6 6.4 6.6 6.4H8M19.4 17.6V8.4Q19.4 6.4 17.4 6.4H16", C.rouge, 0.9),
  path("M7.6 7.4Q7.6 4 12 4Q16.4 4 16.4 7.4Z", C.rouge),
  circle(12, 3.4, 0.8, C.rouge, { w: 0.8 }),
  rect(8.6, 7.2, 6.8, 1.2, 0.5, RED_DARK, { w: 0.8 }),
  ellipse(12, 12.6, 5, 4.6, GLASS),
  path("M12 9Q14.6 12.2 13.8 14.4Q12 16 10.2 14.4Q9.4 12.2 12 9Z", C.orange, { w: 0.8 }),
  path("M12 11.4Q13 13.2 12.6 14.2Q12 14.8 11.4 14.2Q11 13.2 12 11.4Z", C.jaune, false),
  line("M9.4 8.8Q7.8 12.6 9.4 16.6M14.6 8.8Q16.2 12.6 14.6 16.6", STEEL, 0.6),
  line("M8.6 10.6Q9 9.8 9.8 9.4", C.white, 0.8),
  path("M3.6 18.6Q3.6 16.8 5.6 16.8H18.4Q20.4 16.8 20.4 18.6V20.6Q20.4 21.8 19.2 21.8H4.8Q3.6 21.8 3.6 20.6Z", C.rouge),
  line("M4 19.2H20", RED_DARK, 0.7),
  rect(16.6, 15.2, 2.2, 1.6, 0.5, C.ocreLight, { w: 0.7 }),
].join("");

// Radio transistor : poignée, antenne, haut-parleur, cadran.
const radio = [
  line("M17.6 8.2L21.8 1.6", O, 0.9), circle(21.8, 1.6, 0.8, C.grisLight, { w: 0.6 }),
  thick("M6 8.4V6.4Q6 5.2 7.2 5.2H13.6Q14.8 5.2 14.8 6.4V8.4", C.noir, 1.1),
  rect(1.8, 8, 20.4, 13.4, 2.4, C.terre),
  rect(3.2, 9.4, 17.6, 10.6, 1.4, C.cream, { w: 0.9 }),
  circle(8.4, 14.7, 4.2, C.noir, { w: 0.9 }),
  dots([[6.8, 13.1], [8.4, 13.1], [10, 13.1], [6, 14.7], [7.6, 14.7], [9.2, 14.7], [10.8, 14.7], [6.8, 16.3], [8.4, 16.3], [10, 16.3], [8.4, 11.5], [8.4, 17.9]], 0.42, C.gris),
  rect(13.6, 10.6, 6, 3.6, 0.6, C.ocreLight, { w: 0.8 }),
  line("M14.6 12.4H18.6", C.marron, 0.5),
  line("M16.6 10.8V14", C.rouge, 0.8),
  circle(14.8, 17.2, 1.4, C.marron, { w: 0.8 }),
  circle(18.4, 17.2, 1.4, C.marron, { w: 0.8 }),
].join("");

// Balai de nervures de palme, sans manche, lié par une ficelle.
const balai = g("rotate(-12 12 12)",
  path("M10.4 9.4L3.2 21.6Q12 23.4 20.8 21.6L13.6 9.4Z", STRAW),
  line("M11 10L5 21.8M11.6 10L8 22.2M12 10V22.4M12.4 10L16 22.2M13 10L19 21.8M11.3 10L6.6 22M12.7 10L17.4 22", STRAW_DARK, 0.55),
  path("M10.6 9.6L10.8 1.8Q12 0.8 13.2 1.8L13.4 9.6Z", STRAW),
  line("M11.4 2V9.2M12 1.6V9.2M12.6 2V9.2", STRAW_DARK, 0.5),
  rect(9.8, 7.2, 4.4, 2.8, 0.8, C.rouge, { w: 0.9 }),
  line("M10 8.6H14", C.ocreLight, 0.6),
);

// Panier tressé de Bolgatanga : bandes colorées, anse gainée de cuir.
const hw = (y) => 9 - 3.6 * ((y - 10) / 11) ** 2;
const band = (y1, y2, fill) => {
  const ys = [y1, (y1 + y2) / 2, y2];
  const L = ys.map((y) => `${n2(12 - hw(y))} ${n2(y)}`), R = ys.slice().reverse().map((y) => `${n2(12 + hw(y))} ${n2(y)}`);
  return path(`M${L.join("L")}L${R.join("L")}Z`, fill, false);
};
const zigzag = (y1, y2, k) => {
  const x0 = 12 - hw(y2) + 0.4, x1 = 12 + hw(y2) - 0.4, step = (x1 - x0) / k;
  let d = `M${n2(x0)} ${y2}`;
  for (let i = 0; i < k; i++) d += `L${n2(x0 + step * (i + 0.5))} ${y1}L${n2(x0 + step * (i + 1))} ${y2}`;
  return path(d + "Z", C.noir, false);
};
const panier = [
  thick("M4.4 10Q4 1.6 12 1.6Q20 1.6 19.6 10", C.marron, 1.5),
  line("M5.4 5.6L6.6 6.2M7.4 3.4L8.2 4.4M10.4 2.2L10.8 3.4M13.6 2.2L13.2 3.4M16.6 3.4L15.8 4.4M18.6 5.6L17.4 6.2", C.bois, 0.6),
  band(10, 21, C.sable),
  band(12.4, 14.8, C.rouge),
  band(14.8, 17.2, C.jaune), zigzag(14.8, 17.2, 5),
  band(17.2, 19.4, C.vert),
  path(`M3 10Q3.6 21 12 21.6Q20.4 21 21 10`, "none"),
  line("M3.3 12.4Q12 13.6 20.7 12.4M3.8 14.8Q12 16 20.2 14.8M4.5 17.2Q12 18.4 19.5 17.2M5.5 19.4Q12 20.4 18.5 19.4", O, 0.5),
  ellipse(12, 10, 9, 2.2, STRAW),
  ellipse(12, 10.2, 7.4, 1.4, STRAW_DARK, { w: 0.7 }),
].join("");

/* ---------------- transport ---------------- */

// Tuk-tuk (keke, bajaj) jaune, vue de côté vers la droite.
const tuktuk = [
  path("M2.4 17.6V7.4Q2.4 4 5.8 4H14.6Q17.4 4 18.6 6.6L20.8 12Q21.8 13 21.8 14.6V17.2Q21.8 18 21 18H3.2Q2.4 18 2.4 17.6Z", C.jaune),
  path("M2.4 7.6V7.4Q2.4 4 5.8 4H14.6Q17.4 4 18.6 6.6L19 7.6Z", C.vert),
  path("M6.6 8.8H17.2L19.4 13.6H14.8V15.4H6.6Z", "#4A3B32", { w: 0.9 }),
  rect(7.4, 11.8, 6.2, 2, 0.6, C.rouge, { w: 0.8 }),
  line("M7.6 11.8V9.6", C.rouge, 1),
  thick("M17 9.6L16 12.8", C.noir, 0.6),
  path("M2.4 15H21.8V16.4H2.4Z", C.vert, { w: 0.8 }),
  circle(21, 13.4, 0.8, C.white, { w: 0.6 }),
  rect(1.4, 14.4, 1.4, 2.6, 0.4, C.rouge, { w: 0.6 }),
  wheel(6.6, 18.4, 2.6), wheel(18.4, 18.4, 2.4),
].join("");

// Matatu : minibus kényan peint, art de rue, jantes chromées, aileron.
const matatu = [
  path("M3.6 4.4H8.6V5.4H3.6Z", C.noir, { w: 0.8 }),
  path("M1.8 17.4V7.6Q1.8 5.2 4.2 5.2H16.6Q18 5.2 18.8 6.4L21.8 11.6Q22.4 12.4 22.4 13.6V17.4Q22.4 18.4 21.4 18.4H2.8Q1.8 18.4 1.8 17.4Z", C.violet),
  path("M2.6 8.8H18.6L20.2 11.8H2.6Z", C.noir, { w: 0.8 }),
  line("M7 8.8V11.8M11.4 8.8V11.8M15.6 8.8V11.8", C.violet, 0.8),
  path("M1.8 14.2Q5 11.6 8.4 14.2T15 14.2T22.4 13.4V15.4Q18.6 16.6 15 15.6T8.4 15.6T1.8 15.8Z", PINK, { w: 0.7 }),
  path("M2.2 16.6Q6 15 9.6 16.6T17 16.4T22.2 16.4", "none", { c: LIME, w: 0.9 }),
  path("M10.6 12.4L12.6 12.4L11.6 13.6L13.4 13.6L10.8 16.4L11.6 14.4L10 14.4Z", C.jaune, { w: 0.6 }),
  path("M18.4 13.2L19 14.2L20.2 14.4L19.3 15.1L19.6 16.2L18.4 15.6L17.2 16.2L17.5 15.1L16.6 14.4L17.8 14.2Z", LIME, { w: 0.5 }),
  dots([[4.4, 13.6], [6.4, 12.8], [3.6, 16.8]], 0.5, C.jaune),
  circle(21.8, 14.6, 0.7, C.white, { w: 0.6 }),
  wheel(6.4, 18.6, 2.5, C.ocreLight), wheel(17.8, 18.6, 2.5, C.ocreLight),
].join("");

// Charrette à âne, vue de côté.
const DONKEY = "#9C9590", DONKEY_LIGHT = "#D8D2CC";
const charrette = [
  thick("M14.2 14.8L13.6 21.4M19 14.8L19.6 21.4", "#837C77", 1),
  path("M2 11.4L3.2 9.2H12.2L12.4 11.4Z", C.sable, { w: 0.9 }),
  ellipse(5.4, 9.6, 2.4, 1.8, C.white, { w: 0.9 }),
  ellipse(9.4, 9.8, 2.2, 1.6, C.sable, { w: 0.9 }),
  line("M4.6 8.4L6.2 10.8M8.8 8.6L10 10.8", C.bois, 0.5),
  rect(1.4, 11.2, 11.6, 2, 0.4, C.bois),
  thick("M12.4 12.4L17.4 12.6", C.marron, 0.8),
  ellipse(16.8, 12.6, 4.6, 2.8, DONKEY),
  thick("M15.4 15L15.2 21.4M20.4 14.4L20.8 21.4", DONKEY, 1),
  line("M12.4 11.6Q11.6 13.8 11.8 16.2", O, 0.8),
  path("M19 10.4L20.4 6.2L23 8.6L21.6 12.4Z", DONKEY),
  path("M20.8 4.4L19.4 1.2L21.4 2.6Z", DONKEY, { w: 0.8 }),
  path("M21.8 5.4L22.2 1.6L23.2 4.2Z", DONKEY, { w: 0.8 }),
  path("M19.2 7.2L20.6 3.6Q22.8 4 23.4 6.4L23.6 9.4Q23.4 10.8 22 10.6Z", DONKEY),
  ellipse(23, 9.6, 1, 1.2, DONKEY_LIGHT, { w: 0.7 }),
  eye(21.6, 6.6, 0.45),
  line("M17.4 10Q18.4 7.4 20 5.2", C.noir, 0.8),
  thick("M17.6 10.4V14.6", C.rouge, 0.6),
  wheel(6.8, 17.4, 4, C.bois),
  spokes(6.8, 17.4, 3.6, 4, C.bois, 0.7),
  circle(6.8, 17.4, 1.1, C.marron, { w: 0.7 }),
].join("");

// Pousse-pousse : charrette à bras, grande roue, brancards, sacs et bidon.
const pousse = [
  thick("M3.4 13.6L2.6 19.6", IRON, 0.8),
  thick("M13 12.4L21.8 10.4", C.bois, 0.9),
  thick("M21.4 9L22 12", C.noir, 0.7),
  rect(1.6, 11.6, 13.2, 2.2, 0.4, C.bois),
  line("M5 11.8V13.6M8.4 11.8V13.6M11.8 11.8V13.6", C.marron, 0.5),
  rect(10, 4.2, 4.6, 7.4, 1, C.jaune, { w: 0.9 }),
  rect(11, 3, 1.6, 1.4, 0.4, C.bleu, { w: 0.7 }),
  line("M10.8 6H13.8", C.jauneShade, 0.6),
  path("M1.8 11.6Q1.4 7.4 3.6 6.8Q6.2 6.4 6.6 7.6Q7 10 6.6 11.6Z", C.white, { w: 0.9 }),
  line("M2.2 9.2H6.8", C.bleu, 0.8),
  path("M5.8 11.6Q5.2 4.8 7.6 4Q9.8 3.8 10.2 5Q10.6 9 10.2 11.6Z", C.sable, { w: 0.9 }),
  line("M6 7.4H10.2M5.9 8.8H10.3", C.terre, 0.7),
  wheel(8.4, 17.8, 4.2, C.grisLight),
  circle(8.4, 17.8, 0.7, IRON, { w: 0.5 }),
].join("");

/* ---------------- marché et travail ---------------- */

// Étal de marché : parasol, table, pyramides de tomates et d'oignons.
const tomato = (x, y, r = 1.35) => circle(x, y, r, C.rouge, { w: 0.8 }) + line(`M${x - 0.4} ${y - r + 0.2}H${x + 0.4}`, C.feuille, 0.7);
const onion = (x, y, r = 1.3) => path(`M${x} ${y - r - 0.8}Q${x + 0.4} ${y - r} ${x + r} ${y - 0.2}Q${x + r} ${y + r} ${x} ${y + r}Q${x - r} ${y + r} ${x - r} ${y - 0.2}Q${x - 0.4} ${y - r} ${x} ${y - r - 0.8}Z`, "#A83E6E", { w: 0.8 });
const etal = [
  thick("M12 6.6V14.4", C.gris, 0.8),
  path("M1.6 8.4Q2.6 1.6 12 1.4Q21.4 1.6 22.4 8.4Z", C.rouge),
  path("M5.2 8.4Q6 3 12 1.4Q8.8 3.6 8.8 8.4ZM15.2 8.4Q15.2 3.6 12 1.4Q18 3 18.8 8.4Z", C.jaune, false),
  path("M8.8 8.4Q8.8 3.6 12 1.4Q15.2 3.6 15.2 8.4Z", C.vert, false),
  path("M1.6 8.4Q2.6 1.6 12 1.4Q21.4 1.6 22.4 8.4Z", "none"),
  line("M5.2 8.4Q6 3 12 1.4Q18 3 18.8 8.4M8.8 8.4Q8.8 3.6 12 1.4Q15.2 3.6 15.2 8.4", O, 0.6),
  path("M1.6 8.4Q2.5 9.6 3.4 8.4Q4.3 9.6 5.2 8.4Q6.1 9.6 7 8.4Q7.9 9.6 8.8 8.4Q9.7 9.6 10.6 8.4Q11.5 9.6 12.4 8.4Q13.3 9.6 14.2 8.4Q15.1 9.6 16 8.4Q16.9 9.6 17.8 8.4Q18.7 9.6 19.6 8.4Q20.5 9.6 22.4 8.4Z", C.rouge, { w: 0.8 }),
  thick("M3.8 16.4V22.2M20.2 16.4V22.2", C.marron, 0.9),
  tomato(4.4, 13.8), tomato(7.1, 13.8), tomato(9.8, 13.8), tomato(5.75, 11.4), tomato(8.45, 11.4), tomato(7.1, 9.1),
  onion(14.4, 13.8), onion(17, 13.8), onion(19.6, 13.8), onion(15.7, 11.4), onion(18.3, 11.4),
  rect(1.6, 15, 20.8, 2, 0.4, C.bois),
  path("M2 17V19.2L4 17.8L6 19.2L8 17.8L10 19.2L12 17.8L14 19.2L16 17.8L18 19.2L20 17.8L22 19.2V17Z", C.bleu, { w: 0.7 }),
].join("");

// Groupe électrogène sur châssis tubulaire.
const groupe = [
  rect(1.8, 4.4, 20.4, 16.2, 2, "none", { c: O, w: 1.8 + 2 * W }),
  rect(1.8, 4.4, 20.4, 16.2, 2, "none", { c: C.noir, w: 1.8 }),
  rect(4.6, 5.6, 13, 4, 1.8, C.rouge),
  circle(15, 5.6, 1, C.noir, { w: 0.7 }),
  path("M9.6 6.2L8.4 8H10L9 9.2", "none", { c: C.jaune, w: 0.8 }),
  rect(3.6, 10.2, 9, 8.4, 1, STEEL),
  line("M4.6 12H11.6M4.6 13.6H11.6M4.6 15.2H11.6", C.grisLight, 0.6),
  circle(6.8, 17, 0.9, C.noir, { w: 0.6 }),
  rect(13.4, 10.2, 7, 8.4, 1, C.rouge),
  rect(14.4, 11.4, 5, 3.4, 0.5, C.noir, { w: 0.7 }),
  circle(15.8, 13.1, 0.8, C.grisLight, { w: 0.5 }), circle(18, 13.1, 0.8, C.grisLight, { w: 0.5 }),
  circle(16.9, 16.8, 0.9, C.vertLight, { w: 0.6 }),
  thick("M3.4 20.6V22M20.6 20.6V22", C.noir, 0.8),
].join("");

// Seau en plastique et gobelet (pour se laver).
const seau = [
  line("M3.8 7.6Q10.6 -0.4 17.4 7.6", O, 1),
  path("M3 7.6H18.2L16.6 21.6Q16.5 22.2 15.8 22.2H5.4Q4.7 22.2 4.6 21.6Z", C.bleu),
  line("M3.6 11.4H17.6M4 15.4H17.2", C.indigoLight, 0.7),
  ellipse(10.6, 7.6, 7.6, 2, C.indigoLight),
  ellipse(10.6, 7.9, 6.4, 1.4, C.eau, { w: 0.7 }),
  path("M13.2 13.4H20.4L19.8 21.6Q19.7 22.2 19 22.2H14.6Q13.9 22.2 13.8 21.6Z", C.rouge),
  path("M20.2 15.2Q22.6 15.4 22.4 17.6Q22.2 19.6 19.8 19.6", "none", { c: O, w: 1.9 }),
  path("M20.2 15.2Q22.6 15.4 22.4 17.6Q22.2 19.6 19.8 19.6", "none", { c: C.rouge, w: 0.8 }),
  ellipse(16.8, 13.4, 3.6, 0.9, RED_DARK, { w: 0.9 }),
  line("M14.4 15.4V19.8", "#F07060", 0.7),
].join("");

// Pile de pagnes wax pliés, nouée d'un ruban : un cadeau.
const pagneFace = (y, h, fill) => path(`M3.4 ${y}H20.6Q21.6 ${y} 21.6 ${y + 1}V${y + h - 1}Q21.6 ${y + h} 20.6 ${y + h}H3.4Q2.4 ${y + h} 2.4 ${y + h - 1}V${y + 1}Q2.4 ${y} 3.4 ${y}Z`, fill);
const pagne = [
  pagneFace(17.6, 4, C.rouge),
  dots([[4.6, 19.6], [7.6, 19.6], [16.4, 19.6], [19.4, 19.6]], 0.7, C.jaune),
  pagneFace(13.6, 4, C.vert),
  path("M3.6 15.6Q5 14.2 6.4 15.6Q5 17 3.6 15.6ZM7 15.6Q8.4 14.2 9.8 15.6Q8.4 17 7 15.6ZM14.2 15.6Q15.6 14.2 17 15.6Q15.6 17 14.2 15.6ZM17.6 15.6Q19 14.2 20.4 15.6Q19 17 17.6 15.6Z", C.ocreLight, { w: 0.5 }),
  pagneFace(9.6, 4, C.indigo),
  circle(5.6, 11.6, 1.2, C.ocre, { w: 0.6 }), circle(5.6, 11.6, 0.45, C.terre, false),
  circle(17.8, 11.6, 1.2, C.ocre, { w: 0.6 }), circle(17.8, 11.6, 0.45, C.terre, false),
  path("M2.4 9.6L5.4 6.4H18.6L21.6 9.6Z", C.ocre),
  dots([[7.4, 8], [16.6, 8], [10, 7], [14, 7]], 0.5, C.terre),
  rect(10.8, 7.6, 2.4, 14, 0, C.rose, { w: 0.9 }),
  path("M12 7.8Q8.2 3 7.4 5.6Q7 8.2 12 7.8Z", C.rose, { w: 0.9 }),
  path("M12 7.8Q15.8 3 16.6 5.6Q17 8.2 12 7.8Z", C.rose, { w: 0.9 }),
  path("M11.4 8L10.2 10.6M12.6 8L13.8 10.6", "none", { c: O, w: 0.8 }),
  ellipse(12, 7.8, 1.2, 0.9, C.rose, { w: 0.9 }),
].join("");

// Machine à coudre à pédale : tête noire à filets dorés, table en bois, bâti en fonte, volant et pédale.
const machine = [
  thick("M3.6 12.6L3.2 21.8M20.4 12.6L20.8 21.8", IRON, 1),
  line("M3.6 16.6Q5.6 15 7.6 16.6M20.4 16.6Q18.6 15 17 16.6", IRON, 0.8),
  path("M5.8 20.2H15.4L14.4 22.2H6.8Z", IRON, { w: 0.9 }),
  line("M5.8 21.2H15", STEEL, 0.5),
  line("M17.4 10.4L15.4 13.6", C.marron, 0.6),
  circle(15.4, 16.6, 3, "none", { c: O, w: 1.8 }),
  spokes(15.4, 16.6, 2.6, 3, IRON, 0.6),
  circle(15.4, 16.6, 3, "none", { c: STEEL, w: 0.8 }),
  line("M15.4 16.6L11 20.8", IRON, 0.8),
  rect(1.4, 10.6, 21.2, 2.2, 0.5, C.bois),
  path("M5.2 10.6V9.2H18.4V10.6Z", C.noir, { w: 0.9 }),
  path("M16 9.2V4.6Q16 3 14.4 3H6.4Q4.8 3 4.8 4.4V6.8H6.8V5.2H14V9.2Z", C.noir),
  line("M7.2 4.1H14.4", C.ocre, 0.6),
  rect(4.4, 6.4, 2.6, 2.6, 0.5, C.noir, { w: 0.9 }),
  line("M5.4 9V10", C.grisLight, 0.6),
  ellipse(17.6, 5.6, 1.1, 2.6, STEEL, { w: 0.9 }),
  line("M11.4 3V1.8", O, 0.6),
  rect(10.4, 1, 2, 1.3, 0.3, C.rouge, { w: 0.6 }),
].join("");

/* ---------------- entrées ---------------- */

const E = (slug, fr, en, tags, body, { char = null, group = "objets" } = {}) => ({ slug, fr, en, char, group, tags, tone: false, body });

export default [
  E("chaise-plastique", "Chaise en plastique", "Plastic chair", ["chaise en plastique", "plastic chair", "monobloc", "chaise", "chair", "maquis", "fête", "party", "cérémonie"], chaise),
  E("bidon-jaune", "Bidon jaune", "Yellow jerrycan", ["bidon", "jerrycan", "jerry can", "gallon", "kufuor gallon", "eau", "water", "ghana", "corvée d'eau"], bidon),
  E("bassine-emaillee", "Bassine émaillée", "Enamel basin", ["bassine", "basin", "émail", "enamel", "cuvette", "bowl", "fleurs", "flowers", "cuisine"], bassine),
  E("mortier-pilon", "Mortier et pilon", "Mortar and pestle", ["mortier", "mortar", "pilon", "pestle", "foufou", "fufu", "igname", "yam", "piler", "pounding"], mortier),
  E("fourneau-charbon", "Fourneau à charbon", "Charcoal stove", ["fourneau", "stove", "charbon", "charcoal", "braises", "coals", "marmite", "pot", "jiko", "malgache"], fourneau),
  E("lampe-tempete", "Lampe-tempête", "Hurricane lantern", ["lampe-tempête", "hurricane lamp", "lanterne", "lantern", "lampe à pétrole", "kerosene lamp", "flamme", "délestage"], lampe),
  E("radio-transistor", "Radio transistor", "Transistor radio", ["radio", "transistor", "poste", "antenne", "antenna", "musique", "music", "informations", "news"], radio, { char: "📻" }),
  E("balai-de-nervures", "Balai de nervures", "Palm-rib broom", ["balai", "broom", "nervures de palme", "palm ribs", "balayer", "sweep", "cour", "yard"], balai),
  E("panier-tresse", "Panier tressé", "Woven basket", ["panier", "basket", "bolga", "bolgatanga", "ghana", "tressé", "woven", "paille", "straw", "marché"], panier, { char: "🧺" }),
  E("tuk-tuk", "Tuk-tuk", "Tuk-tuk", ["tuk-tuk", "keke", "keke napep", "bajaj", "tricycle", "rickshaw", "nigeria", "éthiopie", "ethiopia", "égypte", "taxi"], tuktuk, { char: "🛺" }),
  E("matatu", "Matatu", "Matatu", ["matatu", "minibus", "kenya", "nairobi", "art de rue", "street art", "nganya", "transport", "bus"], matatu),
  E("charrette-a-ane", "Charrette à âne", "Donkey cart", ["charrette", "cart", "âne", "donkey", "sahel", "mali", "burkina faso", "niger", "sénégal", "transport"], charrette),
  E("pousse-pousse", "Pousse-pousse", "Handcart", ["pousse-pousse", "handcart", "charrette à bras", "pushcart", "truck pusher", "cameroun", "marché", "market", "porteur"], pousse),
  E("etal-de-marche", "Étal de marché", "Market stall", ["étal", "stall", "marché", "market", "tomates", "tomatoes", "oignons", "onions", "parasol", "vendeuse"], etal, { group: "lieux" }),
  E("groupe-electrogene", "Groupe électrogène", "Generator", ["groupe électrogène", "generator", "gen", "i-better-pass-my-neighbour", "électricité", "electricity", "délestage", "nepa", "courant"], groupe),
  E("seau-et-gobelet", "Seau et gobelet", "Bucket and cup", ["seau", "bucket", "gobelet", "cup", "douche", "bucket shower", "toilette", "eau", "water"], seau, { char: "🪣" }),
  E("pagne-plie", "Pagnes pliés", "Folded wax cloths", ["pagne", "wax", "ankara", "cadeau", "gift", "dot", "dowry", "mariage", "wedding", "tissu"], pagne),
  E("machine-a-coudre", "Machine à coudre", "Sewing machine", ["machine à coudre", "sewing machine", "couturier", "tailor", "tailleur", "pédale", "treadle", "couture", "sewing"], machine),
];
