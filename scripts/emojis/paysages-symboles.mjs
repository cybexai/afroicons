// Emojis africains originaux : paysages (groupe « nature ») et symboles (groupe « coeurs », Cœurs et symboles).
// Paysages : vignette arrondie (comme le coucher de soleil sur la savane) ; symboles adinkra : signe plein sur un carreau de tissu.
import { O, W, C, path, circle, ellipse, rect, line, g } from "./lib.mjs";

/** Trait épais « plein » : contour brun puis couleur par-dessus. */
const thick = (d, col, w = 1.5) => line(d, O, w + 2 * W) + line(d, col, w);

/* ---------- vignette de paysage : 21 × 19, coins de rayon 4 ---------- */
const TILE = [1.5, 2.5, 21, 19, 4];
const sky = (fill) => rect(...TILE, fill, false);
const frame = () => rect(...TILE, "none");
/** Bande du bas : `top` part de « M1.5 y » et finit en x = 22.5 (y ≤ 17.5) ; la bande épouse les coins arrondis. */
const band = (top, fill, s = false) => path(`${top}V17.5A4 4 0 0 1 18.5 21.5H5.5A4 4 0 0 1 1.5 17.5Z`, fill, s);
/** Bande du haut, de y = 2.5 à y (≥ 6.5). */
const topBand = (y, fill) => path(`M1.5 ${y}V6.5A4 4 0 0 1 5.5 2.5H18.5A4 4 0 0 1 22.5 6.5V${y}Z`, fill, false);

const SKY = "#BFE0F4";
const WATER = "#2F7FB8";
const STONE = "#8C7B6B", STONE_DARK = "#6B5B4D";
const LEAF_DARK = "#2F5B2E", LEAF_MIST = "#8DB89A";
const GRASS = "#E8B84A";
const KAPOK = "#BDB3A3";

/* ---------------- paysages ---------------- */

// Chutes Victoria (Mosi-oa-Tunya) : long rideau d'eau, embruns et arc-en-ciel.
const chutesVictoria = [
  sky(SKY),
  path("M1.5 7.6Q4 6.4 6 7.2Q8 6 10.4 7Q13 6 15.4 7Q17.8 6.2 20 7Q21.6 6.6 22.5 7.4V9.2H1.5Z", C.vert, false),
  path("M1.5 8.6H22.5V18.8H1.5Z", STONE_DARK, false),
  path("M1.5 9.6H22.5V18.8H1.5Z", C.white, false),
  line("M3.6 10V16.6M6.2 10V15.4M8.8 9.6V17M11.4 9.6V15.8M14 9.6V16.8M16.6 9.6V15.2M19.2 9.6V16.4M21.2 9.6V14.8", C.eau, 0.9),
  line("M1.5 9.6H22.5", O, 0.8),
  line("M5.2 18.6A6.8 6.8 0 0 1 18.8 18.6", C.rouge, 0.9),
  line("M6.2 18.6A5.8 5.8 0 0 1 17.8 18.6", C.jaune, 0.9),
  line("M7.2 18.6A4.8 4.8 0 0 1 16.8 18.6", C.vertLight, 0.9),
  line("M8.2 18.6A3.8 3.8 0 0 1 15.8 18.6", C.bleu, 0.9),
  band("M1.5 17.4Q3.2 15.6 5 16.8Q6.6 15.4 8.4 16.8Q10.2 15.6 12 16.8Q13.8 15.4 15.6 16.8Q17.4 15.6 19 16.8Q20.8 15.6 22.5 17", C.cream, false),
  line("M1.5 17.4Q3.2 15.6 5 16.8Q6.6 15.4 8.4 16.8Q10.2 15.6 12 16.8Q13.8 15.4 15.6 16.8Q17.4 15.6 19 16.8Q20.8 15.6 22.5 17", C.gris, 0.7),
  frame(),
].join("");

// Montagne de la Table (Le Cap) : sommet plat, « nappe » de nuage, Lion's Head, mer.
const montagneTable = [
  sky(SKY),
  path("M1.5 15.6V11.4L3.8 8.6L5.6 10.2L6.6 9.2H17.6L19 11.2Q20.4 9.6 21.6 11L22.5 12.2V15.6Z", STONE),
  line("M8.4 10.4L7.8 14.6M11.2 10.4V14.8M14 10.4L14.4 14.6M16.6 10.4L17.2 14.2", STONE_DARK, 0.7),
  path("M6.4 9.4Q6.2 7.2 8.2 7.2Q9 5.6 11 6.2Q12.6 5 14.4 6.2Q16.4 5.8 17 7.4Q18.4 7.6 18 9.4Q17.8 10.6 17 10.2Q16.6 11.4 15.6 10.6Q14.8 11.6 14 10.6Q13 11.6 12 10.6Q11 11.6 10.2 10.6Q9.2 11.4 8.6 10.4Q7.6 11.2 7.2 10.2Q6.4 10.4 6.4 9.4Z", C.white),
  path("M1.5 15.6H22.5V16.8H1.5Z", C.vertLight, { w: 0.8 }),
  rect(5, 15, 1, 0.9, 0.2, C.white, { w: 0.5 }), rect(7.2, 14.8, 1, 1.1, 0.2, C.white, { w: 0.5 }), rect(16.4, 14.9, 1, 1, 0.2, C.white, { w: 0.5 }),
  band("M1.5 16.8H22.5", C.bleu, false),
  line("M4 18.6Q5 18 6 18.6M10 19.4Q11 18.8 12 19.4M16.4 18.4Q17.4 17.8 18.4 18.4", C.white, 0.8),
  line("M1.5 16.8H22.5", O, 0.8),
  frame(),
].join("");

// Silhouette de dromadaire, tournée vers la droite (environ 8 × 6 unités).
const camel = path("M0.4 3.2Q1 1.6 2.4 1.2Q3.4 0.2 4.4 1.2Q5.2 2 5.8 2.2L6.8 0.8Q7.4 0.2 8 0.6L8.4 1.2L7.6 1.4L6.6 3.6Q6.2 4.2 5.8 4.2V6.6H5.1V4.4H4.6V6.6H3.9V4.4H2.2V6.6H1.5V4.4H1.2V6.6H0.5V4Q0 3.8 0.4 3.2Z", C.noir, false);
// Dunes du Sahara : dunes orange et petite caravane.
const dunesSahara = [
  sky("#FDE7B8"),
  circle(17.6, 6.6, 2.6, C.jaune, { w: 0.9 }),
  path("M1.5 13Q6 8.4 11 11.6Q14.6 9 22.5 12.4V17.5H1.5Z", C.ocre, false),
  line("M1.5 13Q6 8.4 11 11.6Q14.6 9 22.5 12.4", O, 0.8),
  g("translate(3.4 6.6) scale(0.62)", camel),
  g("translate(6.9 7.6) scale(0.62)", camel),
  band("M1.5 17Q8 11.4 14 15.2Q18.6 12.6 22.5 14.4", C.orange, false),
  path("M14 15.2Q18.6 12.6 22.5 14.4V17.5A4 4 0 0 1 18.5 21.5H13.6Q16.4 19 14 15.2Z", C.terre, false),
  line("M1.5 17Q8 11.4 14 15.2Q18.6 12.6 22.5 14.4M14 15.2Q16.4 19 13.6 21.5", O, 0.8),
  frame(),
].join("");

// Palmier : stipe incurvé, palmes vertes (base au pied x, y ; sens d = 1 ou -1).
const palm = (x, y, d = 1, h = 9) => {
  const tx = x + 1.6 * d, ty = y - h;
  return thick(`M${x} ${y}Q${x - 0.4 * d} ${y - h / 2} ${tx} ${ty}`, C.bois, 1.1)
    + path(`M${tx} ${ty}Q${tx - 3.4} ${ty - 2.2} ${tx - 5} ${ty + 0.8}Q${tx - 2.6} ${ty - 0.8} ${tx} ${ty}Z`, C.feuille, { w: 0.8 })
    + path(`M${tx} ${ty}Q${tx + 3.4} ${ty - 2.2} ${tx + 5} ${ty + 0.8}Q${tx + 2.6} ${ty - 0.8} ${tx} ${ty}Z`, C.feuille, { w: 0.8 })
    + path(`M${tx} ${ty}Q${tx - 2.6} ${ty - 3.6} ${tx - 1.2} ${ty - 4.4}Q${tx - 1} ${ty - 2.2} ${tx} ${ty}Z`, C.vertLight, { w: 0.8 })
    + path(`M${tx} ${ty}Q${tx + 2.6} ${ty - 3.6} ${tx + 1.2} ${ty - 4.4}Q${tx + 1} ${ty - 2.2} ${tx} ${ty}Z`, C.vertLight, { w: 0.8 })
    + path(`M${tx} ${ty}Q${tx + 2 * d} ${ty + 1.2} ${tx + 3.4 * d} ${ty + 3.6}Q${tx + 1 * d} ${ty + 1.8} ${tx} ${ty}Z`, C.vert, { w: 0.8 })
    + circle(tx, ty + 0.4, 0.6, C.marron, { w: 0.6 });
};
// Oasis : palmiers autour d'une eau bleue, dans le désert.
const oasis = [
  sky(SKY),
  path("M1.5 12.6Q7 10.4 12 12Q17 10.2 22.5 12.4V17.5H1.5Z", C.ocreLight, false),
  line("M1.5 12.6Q7 10.4 12 12Q17 10.2 22.5 12.4", O, 0.8),
  band("M1.5 14.4Q12 12.6 22.5 14.4", C.sable, false),
  line("M1.5 14.4Q12 12.6 22.5 14.4", O, 0.8),
  ellipse(12, 17.6, 7.6, 2.4, C.eau),
  line("M8.6 17.4H11M13.4 18.4H15.6", C.white, 0.7),
  ellipse(4.4, 17.4, 1.4, 0.8, C.vertLight, { w: 0.7 }), ellipse(19.8, 17.6, 1.4, 0.8, C.vertLight, { w: 0.7 }),
  palm(5.4, 17, 1, 9.6),
  palm(18.8, 17.2, -1, 8.4),
  frame(),
].join("");

// Arbre de palétuvier : couronne, tronc court, racines-échasses en arches dans l'eau.
const mangroveTree = (x, s = 1) => g(`translate(${x} 0)`,
  thick(`M0 ${12.6}V${10}`, C.marron, 1.3 * s),
  thick(`M0 12.4Q-3.4 12.6 -4 17.4M0 12.4Q-1.6 13.6 -1.8 17.4M0 12.4Q1.6 13.6 1.8 17.4M0 12.4Q3.4 12.6 4 17.4M-1 12.6Q-5.2 12 -5.6 16.4`, C.marron, 0.75 * s),
  ellipse(-2.4, 7.6, 3.4, 2.6, C.vert), ellipse(2.4, 7.4, 3.4, 2.6, C.vert), ellipse(0, 5.4, 3.6, 2.6, C.vertLight),
);
const mangrove = [
  sky(SKY),
  band("M1.5 15.6H22.5", WATER, false),
  mangroveTree(7.8),
  g("translate(16.6 2.4) scale(0.82) translate(-16.6 0)", mangroveTree(16.6)),
  band("M1.5 16.4H22.5", WATER, false),
  line("M1.5 16.4H22.5", O, 0.8),
  line("M4 18.6H7M11 19.6H14M16.6 18.4H19.6", C.ciel, 0.8),
  // racines qui ressortent de l'eau (reflet sombre)
  line("M3.8 16.4V17.6M6 16.4V17.4M9.6 16.4V17.4M11.8 16.4V17.6", "#245A82", 0.8),
  frame(),
].join("");

// Forêt du Congo : canopée dense en couches de verts et brume.
const bumps = (y, r, fill, x0 = 1.5) => {
  let d = `M1.5 ${y + r}`;
  for (let x = x0; x < 22.5; x += 2 * r) d += `A${r} ${r} 0 0 1 ${Math.min(x + 2 * r, 22.5)} ${y + r}`;
  return band(`${d}`, fill, false) + line(d, O, 0.8);
};
const foretCongo = [
  sky("#E4EFE6"),
  bumps(5.2, 1.75, LEAF_MIST),
  ellipse(8, 9.6, 5.4, 0.9, C.white, false), ellipse(17, 9.2, 5, 0.8, C.white, false),
  bumps(9.4, 2.1, C.vertLight, 0.6),
  ellipse(13, 13.8, 7, 0.9, C.white, false),
  bumps(13.4, 2.35, C.vert, 1.5),
  bumps(17, 2.6, LEAF_DARK, 0.4),
  // un arbre émergent
  thick("M17.6 12V8", C.marron, 0.9),
  ellipse(17.6, 6.6, 2.8, 1.8, C.vertLight),
  frame(),
].join("");

// Savane de jour : acacia au sommet plat, herbes dorées, ciel bleu.
const savaneAcacia = [
  sky(SKY),
  circle(18.4, 6.4, 2.2, C.jaune, { w: 0.9 }),
  path("M1.5 14.4Q5 12.6 8.4 13.6Q12 12.4 16 13.4Q19.6 12.6 22.5 13.8V16H1.5Z", "#9CC48A", false),
  band("M1.5 15.2Q12 13.8 22.5 15.2", GRASS, false),
  line("M1.5 15.2Q12 13.8 22.5 15.2", O, 0.8),
  thick("M10.4 18.6Q10.8 14.6 10 11.4M10.6 15Q12.6 12.6 14.4 11.2M10.2 13Q8 11.8 6.4 11", C.marron, 0.9),
  path("M3.2 10.6Q3.6 8 7.4 8Q10 6.6 13.4 7.6Q17.2 7.4 18 9.6Q18.4 11.2 16.4 11.4H5Q3 11.4 3.2 10.6Z", C.vert),
  line("M5.6 10.2H8.2M10.6 9.6H13.6M14.6 10.6H16.6", C.vertLight, 0.8),
  line("M3.6 19.2L4.4 17.4M4.6 19.4L4.8 17.2M15.4 19.6L16 17.6M16.4 19.6L16.4 17.4M20 18.6L20.6 16.8", "#B8862A", 0.7),
  ellipse(10.4, 18.6, 3.2, 0.6, "#C99A38", false),
  frame(),
].join("");

// Fromager (kapokier) : tronc droit et clair, contreforts, branches étagées, couronne large.
const fromager = [
  ellipse(12, 21.6, 9.8, 1.3, C.sable),
  thick("M12 10L5 8.4M12 10L19 8.2M12 7L6.4 5.2M12 7L17.6 5", KAPOK, 1),
  ellipse(4.4, 8, 3.2, 1.9, C.vert), ellipse(19.6, 7.8, 3.2, 1.9, C.vert),
  ellipse(7, 5.4, 3.4, 2, C.vertLight), ellipse(17, 5.2, 3.4, 2, C.vertLight),
  ellipse(12, 3.6, 3.8, 2, C.vert), ellipse(12, 7.4, 2.6, 1.4, C.vertLight),
  path("M10.6 21.6L10.8 8.6H13.2L13.4 21.6Z", KAPOK),
  // contreforts en ailes
  path("M10.8 14.4Q10 19.2 4 21.6H10.8Z", KAPOK),
  path("M13.2 14.4Q14 19.2 20 21.6H13.2Z", KAPOK),
  path("M11 17Q9.4 20.4 7.6 21.8H12Z", "#A79C8A"),
  path("M13 17Q14.6 20.4 16.4 21.8H12Z", "#A79C8A"),
  line("M12 10.4V15M11.6 12.2H12.4", "#8F8574", 0.6),
].join("");

// Lac Victoria : grand lac, pirogue de pêcheur, papyrus.
const papyrus = (x, y, h, tilt = 0) => {
  const tx = x + tilt, ty = y - h;
  return line(`M${x} ${y}Q${x} ${y - h / 2} ${tx} ${ty}`, C.vert, 0.8)
    + path(`M${tx} ${ty}L${tx - 2} ${ty - 1.2}Q${tx} ${ty - 2.8} ${tx + 2} ${ty - 1.2}Z`, C.vertLight, { w: 0.7 })
    + line(`M${tx} ${ty}L${tx - 1} ${ty - 1.8}M${tx} ${ty}V${ty - 2.2}M${tx} ${ty}L${tx + 1} ${ty - 1.8}`, C.vert, 0.5);
};
const lacVictoria = [
  sky(SKY),
  path("M1.5 10.4Q5 9 8 9.8Q11 9.2 13 10.2H1.5Z", C.vert, { w: 0.7 }),
  band("M1.5 10.2H22.5", WATER, false),
  line("M1.5 10.2H22.5", O, 0.8),
  line("M13 12.4H16M17.6 13.6H20.6M7 19.6H10M14.6 19.4H18", C.ciel, 0.8),
  // pêcheur debout (silhouette) et perche
  line("M16.6 9.2L13.4 17.4", O, 0.8),
  path("M14.2 15.4V12.6Q14.2 11.8 15 11.8Q15.8 11.8 15.8 12.6V15.4Z", C.noir, false),
  circle(15, 10.9, 0.85, C.noir, false),
  path("M8.4 15.2H20.8L19.6 17.2Q18.8 17.8 17.6 17.8H10.8Q9.6 17.8 8.4 15.2Z", C.bois),
  line("M9.6 16.2H19.8", C.terreDark, 0.7),
  // papyrus au premier plan
  papyrus(3.6, 21.4, 9.4, -0.6), papyrus(5.6, 21.4, 11.4, 0.4), papyrus(7.4, 21.4, 7.8, 1),
  frame(),
].join("");

/* ---------------- symboles ---------------- */

// Carreau de tissu (adinkra : estampé à l'origine sur un pagne).
const CLOTH = "#EAD3A2";
const cloth = (fill = CLOTH) => rect(1.5, 1.5, 21, 21, 4, fill);
const INK = C.noir;

// Gye Nyame (« sauf Dieu ») : corps central à crans, extrémités recourbées en crochets.
const gyeNyame = [
  cloth(),
  // corps : bord gauche bombé avec pointe, bord droit à crans
  path("M12.2 5.2Q7.2 6.4 6.4 10.6L5 12L6.4 13.4Q7.2 17.6 12.2 18.8V17.2Q14.4 17.2 14.4 15.8Q14.4 14.8 13.2 14.6Q14.4 14.4 14.4 13.2Q14.4 12.2 13.2 12Q14.4 11.8 14.4 10.8Q14.4 9.6 13.2 9.4Q14.4 9.2 14.4 8.2Q14.4 6.8 12.2 6.8Z", INK, false),
  // crochets du haut et du bas, qui s'enroulent vers la droite
  line("M11.4 5.6Q13.4 3.2 16.4 3.8Q19 4.4 18.6 7Q18.2 8.8 16.6 8.4Q15.6 8 16.2 6.8", INK, 1.7),
  line("M11.4 18.4Q13.4 20.8 16.4 20.2Q19 19.6 18.6 17Q18.2 15.2 16.6 15.6Q15.6 16 16.2 17.2", INK, 1.7),
  // œil central (losange clair)
  path("M9.4 10.6L10.8 12L9.4 13.4L8 12Z", CLOTH, false),
].join("");

// Dwennimmen (cornes de bélier) : quatre spirales autour d'un axe.
const spiral = "M12 9Q10.4 4.6 6.6 4.8Q3.6 5.2 3.8 8.6Q4.2 11.2 6.8 10.8Q8.6 10.4 8.2 8.6Q7.8 7.6 6.8 7.8";
const dwennimmen = [
  cloth(),
  line(spiral, INK, 2),
  g("matrix(-1 0 0 1 24 0)", line(spiral, INK, 2)),
  g("matrix(1 0 0 -1 0 24)", line(spiral, INK, 2)),
  g("matrix(-1 0 0 -1 24 24)", line(spiral, INK, 2)),
  path("M12 8.6L14 12L12 15.4L10 12Z", INK, false),
].join("");

// Nyame Dua (autel, « arbre de Dieu ») : croix centrale dont les quatre bras se fourchent.
const fork = "M12 8.6V6.2M12 6.6Q12 4.2 9.6 3.6M12 6.6Q12 4.2 14.4 3.6";
const nyameDua = [
  cloth(),
  ...[0, 90, 180, 270].map((r) => g(`rotate(${r} 12 12)`, line(fork, INK, 1.9), circle(9.4, 3.6, 1, INK, false), circle(14.6, 3.6, 1, INK, false))),
  rect(8.4, 8.4, 7.2, 7.2, 1, INK, false),
  rect(10.6, 10.6, 2.8, 2.8, 0.4, CLOTH, false),
].join("");

// Ankh (croix de vie égyptienne), or.
const GOLD = C.ocreLight, GOLD_DARK = C.ocre;
const ankhLoop = "M12 10.4Q7.8 8 8.4 4.8Q9 2 12 2Q15 2 15.6 4.8Q16.2 8 12 10.4Z";
const ankhBody = "M12 10.6L5.4 9.4Q4.6 9.4 4.6 10.2V12.6Q4.6 13.4 5.4 13.4L10.4 12.8L9.4 21.2Q9.4 22 10.2 22H13.8Q14.6 22 14.6 21.2L13.6 12.8L18.6 13.4Q19.4 13.4 19.4 12.6V10.2Q19.4 9.4 18.6 9.4Z";
const ankh = [
  line(ankhLoop, O, 2.4 + 2 * W),
  path(ankhBody, GOLD, { w: 2 * W }),
  line(ankhLoop, GOLD, 2.4),
  path(ankhBody, GOLD, false),
  line("M12 11.4V20.6M6 11.4H10.4M13.6 11.4H18", GOLD_DARK, 0.6),
].join("");

// Œil Oudjat (œil d'Horus) : sourcil, œil, trait prolongé, larme verticale et spirale.
const LAPIS = "#1F4E9C";
const oeilOudjat = [
  rect(1.5, 1.5, 21, 21, 4, GOLD),
  thick("M3.6 6.4Q11 3.6 20.4 5.8", LAPIS, 1.4),
  path("M3.4 10.6Q8 6.6 13.4 7.6Q16.4 8.2 17.6 10.6Q12 14.2 3.4 10.6Z", C.white),
  circle(10.6, 10, 2.3, LAPIS, { w: 0.9 }),
  circle(10.6, 10, 1, C.noir, false),
  thick("M17.6 10.6H21.2", LAPIS, 1.2),
  thick("M7.6 12.4L6.8 19.4", LAPIS, 1.3),
  thick("M10.8 13Q12 16.8 15.4 17.4Q18 17.6 18 15.6Q17.8 14.2 16.4 14.6Q15.6 15 16 15.8", LAPIS, 1.3),
].join("");

// Croix copte éthiopienne de procession : bras évasés à boutons, ajours en treillis, hampe.
const SILVER = C.grisLight, SILVER_DARK = C.gris;
const arm = "M10.4 9.6L9.6 4.6H14.4L13.6 9.6Z";
const crossCopte = [
  rect(11.2, 17.6, 1.6, 4.8, 0.5, C.bois),
  ellipse(12, 18.4, 2, 1, SILVER),
  g("translate(12 10) scale(1.2) translate(-12 -9.6)",
  // anneaux en diagonale
  ...[[7.6, 5.2], [16.4, 5.2], [7.6, 14], [16.4, 14]].map(([x, y]) => circle(x, y, 1.3, SILVER, { w: 0.92 }) + circle(x, y, 0.5, SILVER_DARK, false)),
  // quatre bras (haut, droite, bas, gauche) autour du centre (12, 9.6)
  ...[0, 90, 180, 270].map((r) => g(`rotate(${r} 12 9.6)`,
    path(arm, SILVER, { w: 0.92 }),
    circle(10.2, 3.9, 0.9, SILVER, { w: 0.8 }), circle(12, 3.3, 0.9, SILVER, { w: 0.8 }), circle(13.8, 3.9, 0.9, SILVER, { w: 0.8 }),
    rect(11.4, 5.8, 1.2, 2.4, 0.3, SILVER_DARK, false))),
  // médaillon central ajouré
  rect(9.4, 7, 5.2, 5.2, 0.8, SILVER, { w: 0.92 }),
  rect(10.4, 8, 1.3, 1.3, 0.2, SILVER_DARK, false), rect(12.3, 8, 1.3, 1.3, 0.2, SILVER_DARK, false),
  rect(10.4, 9.9, 1.3, 1.3, 0.2, SILVER_DARK, false), rect(12.3, 9.9, 1.3, 1.3, 0.2, SILVER_DARK, false)),
].join("");

// Khamsa (main de Fatma) : main symétrique, deux pouces, œil au creux de la paume.
const khamsa = [
  rect(8.2, 4.6, 2.5, 10, 1.25, C.bleu),
  rect(13.3, 4.6, 2.5, 10, 1.25, C.bleu),
  rect(10.75, 3.2, 2.5, 11, 1.25, C.bleu),
  path("M8.4 15.4Q5 14.6 4.4 11.2Q4.2 9.6 5.4 9.4Q6.6 9.3 7 10.8Q7.6 12.6 9.2 12.8Z", C.bleu),
  path("M15.6 15.4Q19 14.6 19.6 11.2Q19.8 9.6 18.6 9.4Q17.4 9.3 17 10.8Q16.4 12.6 14.8 12.8Z", C.bleu),
  path("M7.8 12.4H16.2Q17.4 17.2 15.4 19.6L15.2 21.6Q15.2 22.2 14.6 22.2H9.4Q8.8 22.2 8.8 21.6L8.6 19.6Q6.6 17.2 7.8 12.4Z", C.bleu),
  path("M8.8 16.2Q12 13 15.2 16.2Q12 19.4 8.8 16.2Z", C.white, { w: 0.9 }),
  circle(12, 16.2, 1.3, C.indigo, { w: 0.6 }),
  circle(12, 16.2, 0.5, C.noir, false),
  line("M9.6 20.6Q12 21.2 14.4 20.6", C.ocreLight, 0.7),
  circle(9.45, 6.4, 0.4, C.ocreLight, false), circle(12, 5, 0.4, C.ocreLight, false), circle(14.55, 6.4, 0.4, C.ocreLight, false),
].join("");

/* ---------------- entrées ---------------- */

const E = (slug, fr, en, group, tags, body) => ({ slug, fr, en, char: null, group, tags, tone: false, body });

/** Recadrage (audit du dessin) : ces dessins débordaient de la grille 24 × 24 (ou étaient décentrés) ;
 *  ils sont réduits et décalés juste assez pour y tenir : [échelle, décalage x, décalage y]. */
const CADRE = { "ankh": [0.98, 0, 0.6] };
const cadre = (e) => { const f = CADRE[e.slug]; return f ? { ...e, body: `<g transform="translate(${Math.round((12 + f[1]) * 100) / 100} ${Math.round((12 + f[2]) * 100) / 100}) scale(${f[0]}) translate(-12 -12)">${e.body}</g>` } : e; };
export default [
  E("chutes-victoria", "Chutes Victoria", "Victoria Falls", "nature", ["chutes victoria", "victoria falls", "mosi-oa-tunya", "cascade", "waterfall", "zambèze", "zambezi", "zambie", "zambia", "zimbabwe", "arc-en-ciel", "rainbow"], chutesVictoria),
  E("montagne-de-la-table", "Montagne de la Table", "Table Mountain", "nature", ["montagne de la table", "table mountain", "le cap", "cape town", "afrique du sud", "south africa", "montagne", "mountain", "nappe", "tablecloth"], montagneTable),
  E("dunes-sahara", "Dunes du Sahara", "Sahara dunes", "nature", ["sahara", "dunes", "désert", "desert", "caravane", "caravan", "chameau", "camel", "dromadaire", "maroc", "algérie", "niger", "mali"], dunesSahara),
  E("oasis", "Oasis", "Oasis", "nature", ["oasis", "palmier", "palm tree", "dattier", "désert", "desert", "eau", "water", "sahara", "tozeur", "siwa"], oasis),
  E("mangrove", "Mangrove", "Mangrove", "nature", ["mangrove", "palétuvier", "mangrove tree", "racines", "roots", "estuaire", "estuary", "sénégal", "saloum", "casamance", "gabon"], mangrove),
  E("foret-congo", "Forêt du Congo", "Congo rainforest", "nature", ["forêt", "forest", "forêt tropicale", "rainforest", "congo", "bassin du congo", "jungle", "canopée", "canopy", "gabon", "cameroun"], foretCongo),
  E("savane-acacia", "Savane et acacia", "Savanna with acacia", "nature", ["savane", "savanna", "acacia", "safari", "serengeti", "masai mara", "kenya", "tanzanie", "tanzania", "brousse", "bush"], savaneAcacia),
  E("fromager", "Fromager", "Kapok tree", "nature", ["fromager", "kapokier", "kapok", "silk-cotton tree", "ceiba", "arbre", "tree", "côte d'ivoire", "sénégal", "arbre à palabres"], fromager),
  E("lac-victoria", "Lac Victoria", "Lake Victoria", "nature", ["lac victoria", "lake victoria", "nalubaale", "lac", "lake", "pirogue", "canoe", "pêche", "fishing", "papyrus", "ouganda", "uganda", "kenya", "tanzanie"], lacVictoria),
  E("gye-nyame", "Gye Nyame", "Gye Nyame", "coeurs", ["gye nyame", "adinkra", "sauf dieu", "except god", "suprématie de dieu", "supremacy of god", "ghana", "akan", "symbole", "symbol"], gyeNyame),
  E("dwennimmen", "Dwennimmen", "Dwennimmen", "coeurs", ["dwennimmen", "adinkra", "cornes de bélier", "ram's horns", "humilité", "humility", "force", "strength", "ghana", "akan", "symbole", "symbol"], dwennimmen),
  E("nyame-dua", "Nyame Dua", "Nyame Dua", "coeurs", ["nyame dua", "adinkra", "autel", "altar", "arbre de dieu", "tree of god", "présence de dieu", "god's presence", "ghana", "akan", "symbole", "symbol"], nyameDua),
  E("ankh", "Ânkh", "Ankh", "coeurs", ["ânkh", "ankh", "croix de vie", "key of life", "vie", "life", "égypte", "egypt", "kemet", "pharaon", "symbole", "symbol"], ankh),
  E("oeil-oudjat", "Œil Oudjat", "Eye of Horus", "coeurs", ["oudjat", "wedjat", "œil d'horus", "eye of horus", "protection", "égypte", "egypt", "kemet", "symbole", "symbol"], oeilOudjat),
  E("croix-copte", "Croix copte éthiopienne", "Ethiopian Coptic cross", "coeurs", ["croix", "cross", "copte", "coptic", "éthiopie", "ethiopia", "lalibela", "tewahedo", "meskel", "érythrée", "égypte", "symbole", "symbol"], crossCopte),
  E("main-khamsa", "Main de Fatma (khamsa)", "Hamsa hand (khamsa)", "coeurs", ["khamsa", "hamsa", "main de fatma", "hand of fatima", "protection", "mauvais œil", "evil eye", "maghreb", "maroc", "morocco", "algérie", "tunisie", "symbole", "symbol"], khamsa),
].map(cadre);
