// Emojis africains originaux, deuxième vague : masques, instruments, boucliers, parures, tissus et fêtes (char: null).
import { O, W, C, SKIN, SKIN_SHADE, path, circle, ellipse, rect, line, g } from "./lib.mjs";

/** Trait épais « plein » : contour brun puis couleur par-dessus (même recette que afrique-choses.mjs). */
const thick = (d, col, w = 1.5) => line(d, O, w + 2 * W) + line(d, col, w);
const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const eye = (x, y, r = 0.55) => circle(x, y, r, O, false);
/** Anneau plein (cercle extérieur dans un sens, intérieur dans l'autre : le centre reste vide). */
const ring = (cx, cy, r1, r2, fill, s) => path(
  `M${cx - r1} ${cy}A${r1} ${r1} 0 1 0 ${cx + r1} ${cy}A${r1} ${r1} 0 1 0 ${cx - r1} ${cy}Z`
  + `M${cx - r2} ${cy}A${r2} ${r2} 0 1 1 ${cx + r2} ${cy}A${r2} ${r2} 0 1 1 ${cx - r2} ${cy}Z`, fill, s);

const BRONZE = "#B9853F", BRONZE_DARK = "#8A5E28", BRONZE_LIGHT = "#D9A85E";
const SILVER = "#C9CED3";
const MUD = "#4A2E1C";
const STRAW = "#E7C47A", STRAW_DARK = "#B98A3E";
const CLAY_BLACK = "#2A2523";

/* ---------------- masques et sculptures ---------------- */

// Kanaga (Dogon) : visage rectangulaire à rainures d'yeux, superstructure en croix à double barre.
const kanaga = [
  thick("M12 14V3", C.white, 1.5),
  thick("M4.6 2.4V5H19.4V2.4", C.white, 1.4),
  thick("M4.6 12.2V9.6H19.4V12.2", C.white, 1.4),
  dots([[7.4, 5], [10, 5], [14, 5], [16.6, 5], [7.4, 9.6], [10, 9.6], [14, 9.6], [16.6, 9.6]], 0.42, C.noir),
  path("M12 0.9L13.2 3H10.8Z", C.rouge, { w: 0.8 }),
  path("M8.2 13.6Q8.2 12.8 9 12.8H15Q15.8 12.8 15.8 13.6V19.6Q15.8 21.4 12 22.2Q8.2 21.4 8.2 19.6Z", C.white),
  rect(9.3, 14.2, 1.5, 4.6, 0.7, C.noir, { w: 0.7 }),
  rect(13.2, 14.2, 1.5, 4.6, 0.7, C.noir, { w: 0.7 }),
  path("M12 14.2L12.9 19.6H11.1Z", C.rouge, { w: 0.7 }),
  line("M8.4 13.4H15.6", C.rouge, 0.9),
  line("M7.6 20L6.8 22.6M9.2 21L8.8 23M14.8 21L15.2 23M16.4 20L17.2 22.6", C.rouge, 0.9),
].join("");

// Masque éléphant bamiléké : tissu perlé, grandes oreilles rondes, longue trompe plate à triangles.
const triRow = (y, x0, n, w, h, a, b) => Array.from({ length: n }, (_, i) => {
  const x = x0 + i * w;
  return path(`M${x} ${y + h}L${x + w / 2} ${y}L${x + w} ${y + h}Z`, i % 2 ? b : a, false);
}).join("");
const masqueElephant = [
  circle(5, 8.6, 4, C.bleu),
  circle(5, 8.6, 2.5, C.rouge, { w: 0.8 }),
  dots([[5, 6.9], [6.7, 8.6], [5, 10.3], [3.3, 8.6]], 0.45, C.white),
  circle(19, 8.6, 4, C.bleu),
  circle(19, 8.6, 2.5, C.rouge, { w: 0.8 }),
  dots([[19, 6.9], [20.7, 8.6], [19, 10.3], [17.3, 8.6]], 0.45, C.white),
  path("M7.6 4Q7.6 1.6 12 1.6Q16.4 1.6 16.4 4V10.6Q16.4 12 14.6 12.4H9.4Q7.6 12 7.6 10.6Z", C.noir),
  triRow(2.6, 8.6, 6, 1.13, 1.4, C.white, C.rouge),
  circle(10, 7.4, 1.4, C.white, { w: 0.8 }), eye(10, 7.4, 0.7),
  circle(14, 7.4, 1.4, C.white, { w: 0.8 }), eye(14, 7.4, 0.7),
  path("M9.6 11.6H14.4L13.8 21.4Q12 22.8 10.2 21.4Z", C.bleu),
  triRow(12.8, 9.9, 4, 1.05, 1.5, C.white, C.rouge),
  triRow(15.6, 10.1, 4, 0.95, 1.5, C.rouge, C.white),
  triRow(18.4, 10.3, 4, 0.85, 1.5, C.white, C.rouge),
  line("M9.7 12.4H14.3M9.9 15.2H14.1M10.1 18H13.9", C.noir, 0.6),
  path("M9.6 11.6H14.4L13.8 21.4Q12 22.8 10.2 21.4Z", "none"),
].join("");

// Tête d'Ife (Yoruba) : bronze serein, fines stries verticales, couronne perlée à cimier.
const teteIfe = [
  path("M9.6 17.8V21.6Q12 22.6 14.4 21.6V17.8Z", BRONZE_DARK),
  path("M6.8 22.6Q7.6 20.6 12 20.6Q16.4 20.6 17.2 22.6Z", BRONZE_DARK),
  path("M7.6 11Q7.6 18.6 12 19.2Q16.4 18.6 16.4 11Z", BRONZE),
  line("M9 12.4V16.6M10 12.8V17.8M11 13.2V18.6M13 13.2V18.6M14 12.8V17.8M15 12.4V16.6", BRONZE_DARK, 0.45),
  path("M8.8 12.2Q9.9 11.4 11 12.2Q9.9 12.8 8.8 12.2Z", O, false),
  path("M13 12.2Q14.1 11.4 15.2 12.2Q14.1 12.8 13 12.2Z", O, false),
  path("M11.6 12.4L11.2 15.4Q12 16 12.8 15.4L12.4 12.4", BRONZE, { w: 0.8 }),
  path("M10.6 17Q12 16.3 13.4 17Q12 17.8 10.6 17Z", BRONZE_DARK, { w: 0.7 }),
  ellipse(7.4, 13.4, 0.8, 1.4, BRONZE, { w: 0.8 }),
  ellipse(16.6, 13.4, 0.8, 1.4, BRONZE, { w: 0.8 }),
  path("M6.8 11.2Q6.6 5.6 12 5.4Q17.4 5.6 17.2 11.2Z", BRONZE_LIGHT),
  line("M7 9.4H17M7.2 7.6Q12 6.6 16.8 7.6", BRONZE_DARK, 0.6),
  dots([[8.2, 10.3], [9.6, 10.3], [11, 10.3], [12.4, 10.3], [13.8, 10.3], [15.2, 10.3], [9, 8.5], [10.6, 8.3], [12.2, 8.2], [13.8, 8.3], [15.2, 8.5]], 0.35, BRONZE_DARK),
  path("M10.6 5.6L11.2 1.8Q12 1 12.8 1.8L13.4 5.6Z", BRONZE_LIGHT, { w: 0.9 }),
  circle(12, 3.6, 0.7, C.rouge, { w: 0.6 }),
  ellipse(9.6, 14.6, 0.9, 0.5, BRONZE_LIGHT, false),
].join("");

/* ---------------- boucliers et parures ---------------- */

// Bouclier massaï : cuir ovale peint (blanc, rouge, noir), lance derrière.
const bouclierMassai = [
  thick("M3 22.6L20.4 1.8", C.bois, 0.9),
  path("M20.4 1.8L22.6 0.8L21.8 3.2L19.6 4.4Z", SILVER, { w: 0.8 }),
  path("M3 22.6L4.2 20.2", "none", { c: SILVER, w: 1.4 }),
  ellipse(12, 12.2, 6.6, 10, C.cream),
  path("M12 2.6Q6.4 4.6 6 12.2Q6.4 19.8 12 21.8Q8.6 17.4 8.8 12.2Q8.6 7 12 2.6Z", C.rouge, { w: 0.8 }),
  path("M12 2.6Q17.6 4.6 18 12.2Q17.6 19.8 12 21.8Q15.4 17.4 15.2 12.2Q15.4 7 12 2.6Z", C.rouge, { w: 0.8 }),
  rect(11.1, 2.4, 1.8, 19.6, 0.9, C.noir, { w: 0.8 }),
  path("M9.4 9.4L10.6 12.2L9.4 15L8.2 12.2Z", C.noir, { w: 0.6 }),
  path("M14.6 9.4L15.8 12.2L14.6 15L13.4 12.2Z", C.noir, { w: 0.6 }),
  dots([[9.6, 5.6], [14.4, 5.6], [9.6, 18.8], [14.4, 18.8]], 0.45, C.noir),
  ellipse(12, 12.2, 6.6, 10, "none"),
].join("");

// Bouclier zoulou (isihlangu) : grand ovale en peau de vache brun et blanc, lacets centraux, bâton.
const bouclierZoulou = [
  thick("M12 0.8V23.2", C.bois, 1),
  path("M12 0.6Q10.6 1.6 11.2 3.4H12.8Q13.4 1.6 12 0.6Z", C.noir, { w: 0.8 }),
  ellipse(12, 12, 6, 10, C.white),
  path("M7 7Q8.6 5.4 10 6.8Q10.6 9.2 8.4 10.2Q6.6 9.8 7 7Z", C.marron, false),
  path("M14 3.8Q16.4 3.4 16.8 5.6Q16 7.8 14.2 7Q13.4 5.4 14 3.8Z", C.marron, false),
  path("M6.4 14Q8.4 12.6 9.6 14.6Q9.6 17.6 7.6 17.4Q6.2 16.4 6.4 14Z", C.marron, false),
  path("M14.6 12.8Q17.4 12 17.6 14.6Q17.2 17.8 15 18.6Q13.8 16 14.6 12.8Z", C.marron, false),
  path("M10 19.4Q11 18.8 11.2 20.8Q10.4 21.6 9.6 21.2Z", C.marron, false),
  ellipse(12, 12, 6, 10, "none"),
  rect(10.6, 3, 2.8, 18, 1.2, C.cream, { w: 0.8 }),
  line("M10.6 4.4L13.4 5.8M13.4 4.4L10.6 5.8M10.6 7.4L13.4 8.8M13.4 7.4L10.6 8.8M10.6 10.4L13.4 11.8M13.4 10.4L10.6 11.8M10.6 13.4L13.4 14.8M13.4 13.4L10.6 14.8M10.6 16.4L13.4 17.8M13.4 16.4L10.6 17.8M10.6 19.2L13.4 20.4M13.4 19.2L10.6 20.4", C.marron, 0.75),
].join("");

// Croix d'Agadez (Touareg) : pendentif d'argent, anneau en haut, bras pointus, losange, sur un cordon.
const croixAgadez = [
  line("M12 4.2L6.4 0.6M12 4.2L17.6 0.6", O, 1.1),
  ring(12, 7, 3, 1.4, SILVER),
  path("M12 9.8L16.4 13.6L12 22.4L7.6 13.6Z", SILVER),
  path("M4.4 13.6L7.4 12.4H16.6L19.6 13.6L16.6 14.8H7.4Z", SILVER),
  circle(4.4, 13.6, 0.9, SILVER, { w: 0.8 }),
  circle(19.6, 13.6, 0.9, SILVER, { w: 0.8 }),
  path("M12 12.4L13.8 14.6L12 18.8L10.2 14.6Z", C.grisLight, { c: C.gris, w: 0.7 }),
  line("M12 13.6V17.4M8 13.6H9.6M14.4 13.6H16", C.gris, 0.6),
  dots([[12, 20.6], [9.8, 16], [14.2, 16]], 0.32, C.gris),
  path("M10.4 6Q11 5 12 4.8", "none", { c: C.white, w: 0.7 }),
].join("");

/* ---------------- instruments ---------------- */

// Tambour parlant (dùndún) : sablier de bois, cordes de tension en cuir, baguette coudée.
const tambourParlant = [
  path("M7 4.6Q10.4 8.6 10.8 12Q10.4 15.4 7 19.4H17Q13.6 15.4 13.2 12Q13.6 8.6 17 4.6Z", C.bois),
  line("M7.4 5L10.9 12L7.4 19M9 5L11.4 12L9 19M10.6 5L11.8 12L10.6 19M13.4 5L12.2 12L13.4 19M15 5L12.6 12L15 19M16.6 5L13.1 12L16.6 19", C.cream, 0.6),
  rect(10.4, 10.8, 3.2, 2.4, 0.8, C.terre, { w: 0.8 }),
  ellipse(12, 4.6, 5.4, 1.7, C.sable),
  path("M6.6 4.8Q12 7.4 17.4 4.8", "none", { c: C.terre, w: 1 }),
  ellipse(12, 19.4, 5.4, 1.7, C.sable),
  path("M6.6 19.6Q12 22.2 17.4 19.6", "none", { c: C.terre, w: 1 }),
  thick("M15.4 10.6Q18.6 9 20 11.2Q21.4 14.2 19.4 21.4", C.bois, 1),
].join("");

// Mbira (Shona) : planche de bois à lames métalliques, posée dans une calebasse résonatrice.
const keysL = [[7.6, 7.6], [8.8, 8.8], [10, 10], [11.2, 11]];
const keysR = [[12.8, 11], [14, 10], [15.2, 8.8], [16.4, 7.6]];
const mbira = [
  path("M1.8 9.2Q2.2 22.4 12 22.4Q21.8 22.4 22.2 9.2Z", C.ocre),
  ellipse(12, 9.2, 10.2, 2.2, C.marron),
  line("M3 13.6Q12 16.4 21 13.6M3.8 16.8Q12 19.6 20.2 16.8", C.marron, 0.7),
  dots([[3.8, 9.2], [6.6, 10.8], [17.4, 10.8], [20.2, 9.2]], 0.6, SILVER),
  rect(6.4, 3, 11.2, 15.6, 1.6, C.bois),
  line("M7.4 16.2H16.6", C.marron, 0.7),
  ...[...keysL, ...keysR].map(([x, len]) => rect(x - 0.45, 4, 0.9, len, 0.4, SILVER, { w: 0.55 })),
  rect(6.8, 5, 10.4, 1.2, 0.5, C.noir, { w: 0.6 }),
  circle(12, 14.4, 0.9, C.marron, { w: 0.7 }),
].join("");

// Valiha (Madagascar) : cithare tubulaire en bambou, cordes tout autour, petits chevalets.
const valiha = g("rotate(-32 12 12)",
  rect(8.6, 0.8, 6.8, 22.4, 3.2, C.ocreLight),
  rect(8.6, 0.8, 1.6, 22.4, 0.8, C.ocre, false),
  ellipse(12, 2, 3.4, 1.2, C.ocre, { w: 0.8 }),
  ellipse(12, 22, 3.4, 1.2, C.ocre, { w: 0.8 }),
  line("M8.8 12Q12 12.9 15.2 12", STRAW_DARK, 0.9),
  line("M10 3V21M11.3 3V21M12.7 3V21M14 3V21", C.marron, 0.5),
  rect(9.6, 4.4, 0.9, 1.3, 0.3, C.terre, { w: 0.5 }), rect(12.2, 5.2, 0.9, 1.3, 0.3, C.terre, { w: 0.5 }),
  rect(10.9, 6, 0.9, 1.3, 0.3, C.terre, { w: 0.5 }), rect(13.5, 4.6, 0.9, 1.3, 0.3, C.terre, { w: 0.5 }),
  rect(9.6, 17.8, 0.9, 1.3, 0.3, C.terre, { w: 0.5 }), rect(12.2, 18.6, 0.9, 1.3, 0.3, C.terre, { w: 0.5 }),
  rect(10.9, 17, 0.9, 1.3, 0.3, C.terre, { w: 0.5 }), rect(13.5, 17.4, 0.9, 1.3, 0.3, C.terre, { w: 0.5 }),
  rect(8.6, 0.8, 6.8, 22.4, 3.2, "none"),
);

// Balafon (Mandé) : lames de bois sur un cadre, calebasses résonatrices dessous, deux mailloches.
const balaKeys = [[3.2, 6.4], [5.9, 5.8], [8.6, 5.3], [11.3, 4.8], [14, 4.4], [16.7, 4], [19.4, 3.6]];
const balafon = [
  line("M2.4 18.6L4 22M21.6 18.6L20 22", O, 1.1),
  ...balaKeys.map(([x], i) => circle(x + 1, 15.6 + i * 0.1, 2.2 - i * 0.18, C.ocre, { w: 0.8 })),
  rect(1.6, 10, 20.8, 1.6, 0.6, C.marron, { w: 0.9 }),
  rect(1.6, 13.6, 20.8, 1.4, 0.6, C.marron, { w: 0.9 }),
  ...balaKeys.map(([x, h]) => rect(x, 13.8 - h, 2.1, h, 0.5, C.bois, { w: 0.8 })),
  thick("M5.6 1.6L9.2 6.6", C.bois, 0.7),
  circle(9.6, 7.4, 1.3, C.noir, { w: 0.8 }),
  thick("M19.4 1.4L15 6", C.bois, 0.7),
  circle(14.4, 6.8, 1.3, C.noir, { w: 0.8 }),
].join("");

/* ---------------- fêtes et cérémonies ---------------- */

// Cérémonie du café éthiopienne : jebena noire (panse ronde, long col, bec, anse), tasses cini fumantes, grains.
const cini = (x, y) => path(`M${x - 1.9} ${y}H${x + 1.9}L${x + 1.3} ${y + 2.6}Q${x} ${y + 3.2} ${x - 1.3} ${y + 2.6}Z`, C.white, { w: 0.9 })
  + line(`M${x - 1.6} ${y + 1.1}H${x + 1.6}`, C.bleu, 0.6);
const ceremonieCafe = [
  line("M17.2 15.6Q16.4 14.4 17.2 13.2T17.2 10.8M20.6 16.8Q19.8 15.6 20.6 14.4T20.6 12", C.gris, 0.8),
  line("M2 22H22", O, W),
  thick("M7.4 8.6Q4 8.6 4.2 12.6Q4.4 14.6 5.6 15.6", CLAY_BLACK, 1),
  path("M13.4 15.2Q15.6 13.4 16.6 10.6L17.4 10.8Q16.8 15 14.4 17.6Z", CLAY_BLACK),
  circle(10, 16, 5.6, CLAY_BLACK),
  path("M8.6 11.4L8.8 5.2H11.2L11.4 11.4Z", CLAY_BLACK),
  path("M8.4 5.6Q8.2 3.4 10 2.6Q11.8 3.4 11.6 5.6Z", STRAW, { w: 0.9 }),
  line("M5.4 16.2Q10 18.6 14.6 16.2", C.ocre, 0.7),
  ellipse(8.2, 13.6, 1.2, 1.8, "#5A524D", false),
  cini(17.2, 17.4), cini(20.6, 18.6),
  dots([[3.4, 20.6], [4.8, 21], [15.6, 21.2]], 0.55, C.marron),
].join("");

// Cheval vu de profil, tourné vers la droite (base de la fantasia et du cavalier du durbar).
const horseBody = (fill) => path("M5 12.8Q5.4 10.4 8.6 10.6L14.8 10.4Q16.8 10.2 17.6 8.6L19 5.8Q19.8 4.6 21 5.4L22.8 8Q23.2 8.8 22.4 9.4L20.6 9.4Q19.6 11.6 18.6 13.4Q17.8 15.6 15.2 15.8L8.6 16Q5.2 15.8 5 12.8Z", fill);
const ear = (fill) => path("M19.6 5.6L19.8 3.6L20.8 5.2Z", fill, { w: 0.8 });

// Fantasia (tbourida, Maroc) : cavalier en djellaba blanche, cheval au galop, long fusil levé.
const fantasia = [
  thick("M5.4 12.2Q2.6 12.4 1.6 16.4", C.noir, 1),
  thick("M8.2 15.6L5.6 18.2L3.2 19", C.marron, 1),
  thick("M9.8 15.8L9.6 19.2L11 21", C.marron, 1),
  thick("M15.2 15.4L16.8 18.6L18.4 20", C.marron, 1),
  thick("M16.8 14.6L20 16.8L21.6 15.6", C.marron, 1),
  ear(C.marron),
  horseBody(C.marron),
  line("M18.8 6.4Q17.6 8.2 17 9.8", C.noir, 1.2),
  eye(20.4, 6.8, 0.45),
  path("M8.8 10.6H14.6L14.2 15.4H9.2Z", C.rouge, { w: 0.9 }),
  line("M9.2 14.4H14.2", C.jaune, 0.8),
  path("M10 11.6Q9.8 7 12 6.4Q14.2 7 14 11.6L14.6 14.6Q12 15.6 9.4 14.6Z", C.white),
  thick("M10.4 8L7.8 5.6M13.6 8L16 5.4", C.white, 1),
  thick("M3.6 4.6L21.4 3.4", C.bois, 0.9),
  line("M14 4.1L21.4 3.4", C.gris, 0.9),
  circle(12, 4.8, 1.5, SKIN),
  path("M10.4 4.8Q10.4 2.4 12 2.4Q13.6 2.4 13.6 4.8Q12 4 10.4 4.8Z", C.white, { w: 0.8 }),
].join("");

// Cavalier du durbar (Haoussa, Nigeria) : cheval en armure matelassée colorée, plumet, cavalier en boubou et turban.
const quilt = (x, y, w, h, fill) => rect(x, y, w, h, 0, fill, false);
const cavalierDurbar = [
  thick("M5.4 12.2Q3 13 2.6 16.2", C.noir, 1),
  thick("M8 15.4V21.4M10.4 15.6V21.4M15 15.4L15.4 21.4M17.2 14.6L17.8 21.4", C.white, 1),
  ear(C.white),
  horseBody(C.white),
  path("M17.6 8.6L19 5.8Q19.8 4.6 21 5.4L22.4 7.6Q20.4 8.2 18.6 10.8Z", C.rouge, { w: 0.8 }),
  dots([[19.6, 7], [20.8, 6.6]], 0.35, C.jaune),
  thick("M19.8 4.8Q19 2 20.6 0.8", C.rouge, 1),
  eye(21, 7.4, 0.45),
  path("M6 11.6Q6.6 10.4 8.6 10.4H17.6L18.4 13.6Q18.6 18 16.4 18.4H7.4Q5.6 18 5.6 15Z", C.jaune),
  quilt(8.6, 11, 3, 2.4, C.rouge), quilt(14.6, 11, 3, 2.4, C.vert),
  quilt(11.6, 13.4, 3, 2.4, C.rouge), quilt(5.8, 13.4, 2.8, 2.4, C.vert),
  quilt(8.6, 15.8, 3, 2.4, C.vert), quilt(14.6, 15.8, 2.8, 2.4, C.indigoLight),
  path("M6 11.6Q6.6 10.4 8.6 10.4H17.6L18.4 13.6Q18.6 18 16.4 18.4H7.4Q5.6 18 5.6 15Z", "none"),
  line("M6 13.4H18.4M6 15.8H18.4M8.6 10.6V18.2M11.6 10.6V18.2M14.6 10.6V18.2", O, 0.5),
  path("M9 11.4Q8.6 6.6 12 6.2Q15.4 6.6 15 11.4Q15.4 13.4 16.2 14.6Q12 15.8 7.8 14.6Q8.6 13.4 9 11.4Z", C.vert),
  line("M12 7V12.6", C.ocreLight, 0.8),
  circle(12, 4.4, 1.6, SKIN),
  path("M10.2 4.4Q10 1.6 12 1.4Q14 1.6 13.8 4.4Q12 3.4 10.2 4.4Z", C.white, { w: 0.9 }),
  path("M10.6 5.6Q12 7 13.4 5.6V6.6Q12 7.6 10.6 6.6Z", C.white, { w: 0.7 }),
  line("M10.6 3.6Q12 4.6 13.4 3.4", SKIN_SHADE, 0.5),
].join("");

// Mascarade egungun (Yoruba) : silhouette entièrement couverte d'étoffes en couches, filet perlé à la place du visage.
// Pans d'étoffe qui rayonnent depuis la tête et s'évasent vers le bas (pointe arrondie au bout).
const lappets = (ty, tx0, tx1, by, bx0, bx1, cols) => cols.map((col, i, a) => {
  const n = a.length, t0 = tx0 + ((tx1 - tx0) * i) / n, t1 = tx0 + ((tx1 - tx0) * (i + 1)) / n;
  const b0 = bx0 + ((bx1 - bx0) * i) / n, b1 = bx0 + ((bx1 - bx0) * (i + 1)) / n, bend = (b0 + b1) / 2 - 12;
  return path(`M${t0} ${ty}L${t1} ${ty}Q${(t1 + b1) / 2 + bend * 0.12} ${(ty + by) / 2} ${b1} ${by}Q${(b0 + b1) / 2} ${by + 1.6} ${b0} ${by}Q${(t0 + b0) / 2 + bend * 0.12} ${(ty + by) / 2} ${t0} ${ty}Z`, col, { w: 0.8 });
}).join("");
const mascaradeEgungun = [
  // longue robe de pans colorés, très évasée au sol
  lappets(8, 8.4, 15.6, 20.6, 1.6, 22.4, [C.rouge, C.indigo, C.ocreLight, C.vert, C.rouge, C.violet, C.ocreLight, C.indigo]),
  // second rang plus court par-dessus
  lappets(8, 8.8, 15.2, 14.6, 4.6, 19.4, [C.ocreLight, C.violet, C.rouge, C.vert, C.ocreLight, C.rouge]),
  dots([[6.4, 14.4], [9.2, 15.2], [12, 15.5], [14.8, 15.2], [17.6, 14.4]], 0.4, C.white),
  // tête arrondie, filet perlé à la place du visage, petite crête
  path("M8 9.6Q7.8 3.2 12 3Q16.2 3.2 16 9.6Q12 10.8 8 9.6Z", C.indigo),
  rect(9.2, 5.2, 5.6, 3.8, 1, C.noir, { w: 0.8 }),
  line("M9.6 6.4H14.4M9.6 7.7H14.4M10.6 5.4V8.8M12 5.4V8.8M13.4 5.4V8.8", C.grisLight, 0.4),
  path("M10.8 3.4Q11.2 1 12 0.9Q12.8 1 13.2 3.4Z", C.rouge, { w: 0.8 }),
].join("");

/* ---------------- objets du quotidien ---------------- */

// Tabouret ashanti : assise incurvée, pilier central ajouré, montants latéraux, socle.
const tabouretAshanti = [
  rect(3, 19.4, 18, 2.8, 0.8, C.marron),
  rect(5, 9.8, 2.2, 9.8, 0.6, C.bois, { w: 0.9 }),
  rect(16.8, 9.8, 2.2, 9.8, 0.6, C.bois, { w: 0.9 }),
  path("M9.6 10.4H14.4Q13.4 12 13.4 15Q13.4 18 14.4 19.6H9.6Q10.6 18 10.6 15Q10.6 12 9.6 10.4Z", C.bois),
  path("M12 12.6L12.9 15L12 17.4L11.1 15Z", C.marron, { w: 0.7 }),
  path("M2 4.2Q12 8.6 22 4.2L22.2 6.6Q12 12.6 1.8 6.6Z", C.bois),
  path("M2.6 5.6Q12 9.6 21.4 5.6", "none", { c: C.ocreLight, w: 0.7 }),
  path("M3 22.2H21", "none", { c: O, w: W }),
  line("M4.4 20.8H19.6", C.bois, 0.7),
].join("");

// Collier perlé massaï posé à plat : anneaux concentriques de perles colorées, franges.
const RINGS = [[10, C.rouge], [8.7, C.white], [7.4, C.bleu], [6.1, C.orange], [4.8, C.vertLight], [3.6, C.rouge]];
const ringDots = (r, n, fill, cy = 11) => dots(Array.from({ length: n }, (_, i) => {
  const a = (i / n) * 2 * Math.PI;
  return [12 + Math.cos(a) * r, cy + Math.sin(a) * r];
}), 0.34, fill);
const collierPerles = [
  line("M8 19.8V22.4M10 20.6V23.2M12 20.8V23.4M14 20.6V23.2M16 19.8V22.4", C.rouge, 0.7),
  dots([[8, 22.6], [10, 23.2], [12, 23.4], [14, 23.2], [16, 22.6]], 0.55, C.white),
  ...RINGS.map(([r, fill], i) => ring(12, 11, r, RINGS[i + 1]?.[0] ?? 2.4, fill, { w: 0.7 })),
  ringDots(9.35, 22, C.white), ringDots(8.05, 20, C.rouge), ringDots(5.45, 14, C.white),
  path("M12 2.4V5.2", "none", { c: O, w: 0.9 }),
  ring(12, 11, 10, 2.4, "none"),
].join("");

// Chapeau basotho (mokorotlo) : cône de paille tressée, nœud caractéristique au sommet.
const chapeauBasotho = [
  path("M12 5.4L21.6 18.8Q12 22.4 2.4 18.8Z", STRAW),
  line("M10.2 8Q12 8.8 13.8 8M8.4 10.6Q12 11.8 15.6 10.6M6.6 13.2Q12 14.8 17.4 13.2M4.8 15.8Q12 17.8 19.2 15.8", STRAW_DARK, 0.8),
  line("M11 6.8L10.4 8.4M13 6.8L13.6 8.4M9.6 9.4L8.8 11.2M12 9.6V11.4M14.4 9.4L15.2 11.2M8 12L7 14M10.6 12.4L10.2 14.4M13.4 12.4L13.8 14.4M16 12L17 14M6.4 14.8L5.4 16.8M9.2 15.2L8.8 17.2M12 15.4V17.4M14.8 15.2L15.2 17.2M17.6 14.8L18.6 16.8", STRAW_DARK, 0.6),
  path("M2.4 18.8Q12 22.4 21.6 18.8L22 20Q12 23.6 2 20Z", STRAW_DARK),
  ellipse(12, 5.2, 2.2, 1, STRAW, { w: 0.9 }),
  ellipse(12, 3.8, 1.6, 1, STRAW, { w: 0.9 }),
  ellipse(10.4, 2.8, 1.1, 0.9, STRAW, { w: 0.8 }),
  ellipse(13.6, 2.8, 1.1, 0.9, STRAW, { w: 0.8 }),
  ellipse(12, 1.8, 1.1, 0.9, STRAW, { w: 0.8 }),
].join("");

// Bogolan (Mali) : tissu de boue plié, brun foncé, motifs géométriques crème.
const bogoMotifs = (y) => [
  line(`M3.4 ${y + 1}L4.6 ${y}L5.8 ${y + 1}L7 ${y}L8.2 ${y + 1}`, C.cream, 0.7),
  line(`M10.6 ${y - 0.6}V${y + 1.6}M9.5 ${y + 0.5}H11.7`, C.cream, 0.7),
  rect(13.4, y - 0.6, 2.2, 2.2, 0.2, "none", { c: C.cream, w: 0.6 }),
  circle(14.5, y + 0.5, 0.35, C.cream, false),
  line(`M17.6 ${y + 1}L18.8 ${y}L20 ${y + 1}`, C.cream, 0.7),
].join("");
const tissuBogolan = [
  path("M1.8 14.6H20.4Q22.4 14.6 22.4 17.6Q22.4 20.6 20.4 20.6H4.2Q1.8 20.6 1.8 18Z", MUD),
  line("M2 16.2H22.2", C.cream, 0.6),
  dots([[4, 18.4], [6.4, 18.4], [8.8, 18.4], [11.2, 18.4], [13.6, 18.4], [16, 18.4], [18.4, 18.4], [20.6, 18.4]], 0.4, C.cream),
  line("M3 19.6H21.4", C.cream, 0.6),
  path("M1.8 3.4H20.4Q22.4 3.4 22.4 8.8Q22.4 14.2 20.4 14.2H4.2Q1.8 14.2 1.8 11.6Z", MUD),
  bogoMotifs(5.2),
  line("M2.4 8.6H22", C.cream, 0.6),
  bogoMotifs(10.4),
  line("M4.6 3.8Q3 8.8 4.6 13.8", O, 0.8),
  line("M4.6 15Q3.2 17.6 4.6 20.2", O, 0.8),
].join("");

// Kanga (Afrique de l'Est) : pagne rectangulaire imprimé, large bordure (pindo), motif central (mji).
const kangaBorderDots = [];
for (let x = 3.4; x <= 20.8; x += 2.2) kangaBorderDots.push([x, 3.7], [x, 20.3]);
for (let y = 6; y <= 18; y += 2) kangaBorderDots.push([3.4, y], [20.6, y]);
const tissuKanga = [
  rect(1.8, 2.2, 20.4, 19.6, 1.2, C.rouge),
  dots(kangaBorderDots, 0.5, C.jaune),
  rect(5, 5.4, 14, 13.2, 0.6, C.jaune, { w: 0.9 }),
  path("M12 7.4Q15.6 8.4 15.4 12Q15 15.4 12 16.6Q13.4 14 11.6 12.6Q9.4 11.4 10.4 9.2Q11 8 12 7.4Z", C.noir, { w: 0.8 }),
  circle(12.8, 10.6, 0.8, C.jaune, false),
  path("M8.6 7.2Q10.2 8.6 8.6 10Q7 8.6 8.6 7.2ZM8.6 14Q10.2 15.4 8.6 16.8Q7 15.4 8.6 14ZM16.8 14.4Q18 15.4 16.8 16.6Q15.6 15.4 16.8 14.4ZM16.8 7.4Q18 8.4 16.8 9.6Q15.6 8.4 16.8 7.4Z", C.vert, { w: 0.6 }),
  rect(6, 19.4, 12, 0.9, 0.4, C.noir, false),
].join("");

// Jarre en terre cuite (canari) : panse ronde, col étroit à lèvre, motifs incisés.
const jarrePoterie = [
  ellipse(12, 21.8, 6.4, 1.1, C.terreDark),
  path("M9.6 6.6Q9.8 8.2 8.4 8.8Q2.6 10.8 2.8 15.2Q3.2 21.6 12 21.6Q20.8 21.6 21.2 15.2Q21.4 10.8 15.6 8.8Q14.2 8.2 14.4 6.6Z", C.terre),
  ellipse(12, 5.4, 4, 1.6, C.terre),
  ellipse(12, 5.3, 2.6, 0.9, C.terreDark, { w: 0.8 }),
  line("M5 11.4Q12 13.4 19 11.4M3.6 15.4Q12 17.8 20.4 15.4", C.terreDark, 0.7),
  line("M4.4 13.6L5.6 12.4L6.8 13.8L8 12.8L9.2 14.2L10.4 13.2L11.6 14.4L12.8 13.2L14 14.2L15.2 12.8L16.4 13.8L17.6 12.4L18.8 13.4", C.sable, 0.7),
  dots([[6.6, 17.8], [8.8, 18.6], [11, 19], [13.2, 19], [15.4, 18.6], [17.6, 17.8]], 0.4, C.terreDark),
  ellipse(7.4, 11.6, 1.4, 0.6, "#D9714A", false),
].join("");

const E = (slug, fr, en, tags, body, tone = false) => ({ slug, fr, en, char: null, group: "objets", tags, tone, body });

export default [
  E("masque-kanaga", "Masque kanaga", "Kanaga mask", ["kanaga", "masque", "mask", "dogon", "mali", "dama", "danse", "dance"], kanaga),
  E("masque-elephant-bamileke", "Masque éléphant bamiléké", "Bamileke elephant mask", ["masque", "mask", "éléphant", "elephant", "bamiléké", "bamileke", "cameroun", "cameroon", "perles", "beads", "kuosi"], masqueElephant),
  E("tete-ife", "Tête d'Ife", "Ife head", ["ife", "ifè", "bronze", "laiton", "brass", "yoruba", "nigeria", "ooni", "sculpture"], teteIfe),
  E("bouclier-massai", "Bouclier massaï", "Maasai shield", ["bouclier", "shield", "massaï", "maasai", "kenya", "tanzanie", "tanzania", "lance", "spear", "elongo"], bouclierMassai),
  E("bouclier-zoulou", "Bouclier zoulou", "Zulu shield", ["bouclier", "shield", "zoulou", "zulu", "isihlangu", "afrique du sud", "south africa", "peau de vache", "cowhide"], bouclierZoulou),
  E("croix-agadez", "Croix d'Agadez", "Agadez cross", ["croix d'agadez", "agadez cross", "touareg", "tuareg", "niger", "argent", "silver", "pendentif", "pendant"], croixAgadez),
  E("tambour-parlant", "Tambour parlant", "Talking drum", ["tambour parlant", "talking drum", "dùndún", "dundun", "gangan", "yoruba", "nigeria", "tama", "musique", "music"], tambourParlant),
  E("mbira", "Mbira", "Mbira", ["mbira", "piano à pouces", "thumb piano", "shona", "zimbabwe", "kalimba", "sanza", "musique", "music"], mbira),
  E("valiha", "Valiha", "Valiha", ["valiha", "madagascar", "malgache", "malagasy", "cithare", "zither", "bambou", "bamboo", "musique", "music"], valiha),
  E("balafon", "Balafon", "Balafon", ["balafon", "bala", "xylophone", "mandingue", "mande", "mali", "guinée", "guinea", "burkina faso", "musique", "music"], balafon),
  E("ceremonie-cafe", "Cérémonie du café", "Coffee ceremony", ["cérémonie du café", "coffee ceremony", "buna", "jebena", "éthiopie", "ethiopia", "érythrée", "eritrea", "café", "coffee"], ceremonieCafe),
  E("fantasia", "Fantasia", "Fantasia", ["fantasia", "tbourida", "maroc", "morocco", "cavalier", "horseman", "cheval", "horse", "baroud"], fantasia, true),
  E("cavalier-durbar", "Cavalier du durbar", "Durbar horseman", ["durbar", "sallah", "haoussa", "hausa", "nigeria", "kano", "cavalier", "horseman", "cheval", "horse"], cavalierDurbar, true),
  E("mascarade-egungun", "Mascarade egungun", "Egungun masquerade", ["egungun", "mascarade", "masquerade", "yoruba", "nigeria", "bénin", "benin", "ancêtres", "ancestors"], mascaradeEgungun),
  E("tabouret-ashanti", "Tabouret ashanti", "Ashanti stool", ["tabouret", "stool", "ashanti", "asante", "akan", "ghana", "dwa", "bois", "wood"], tabouretAshanti),
  E("collier-perles-massai", "Collier de perles massaï", "Maasai beaded collar", ["collier", "collar", "perles", "beads", "massaï", "maasai", "kenya", "tanzanie", "tanzania", "parure"], collierPerles),
  E("chapeau-basotho", "Chapeau basotho", "Basotho hat", ["chapeau", "hat", "basotho", "mokorotlo", "lesotho", "sesotho", "paille", "straw"], chapeauBasotho),
  E("tissu-bogolan", "Bogolan", "Bogolan mud cloth", ["bogolan", "bògòlanfini", "mud cloth", "tissu", "cloth", "mali", "bambara", "bamana"], tissuBogolan),
  E("tissu-kanga", "Kanga", "Kanga", ["kanga", "leso", "khanga", "pagne", "tissu", "cloth", "kenya", "tanzanie", "tanzania", "swahili"], tissuKanga),
  E("jarre-poterie", "Jarre en terre cuite", "Clay water jar", ["jarre", "jar", "canari", "poterie", "pottery", "terre cuite", "terracotta", "eau", "water"], jarrePoterie),
];
