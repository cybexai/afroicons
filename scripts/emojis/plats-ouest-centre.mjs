// Emojis africains originaux : plats d'Afrique de l'Ouest et du Centre (sans équivalent Unicode, char: null).
// Chaque plat a son contenant (plateau, calebasse, canari, cornet, feuille, marmite à trois pieds…) et son ingrédient
// signature en grand, pour rester reconnaissable à 24 px et propre à 16 px.
import { O, W, C, path, circle, ellipse, rect, line, g } from "./lib.mjs";

const thick = (d, col, w = 1.5) => line(d, O, w + 2 * W) + line(d, col, w);
const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const eye = (x, y, r = 0.55) => circle(x, y, r, O, false);
const steam = (xs, y = 4.6) => line(xs.map((x) => `M${x} ${y}Q${x - 0.8} ${y - 1.4} ${x} ${y - 2.6}`).join(""), C.gris, 0.8);

/* ---------- couleurs ---------- */
const THIEB = "#C8432B", THIEB_LIGHT = "#EC7B52";
const FRIED = "#A9703A", FRIED_DARK = "#7A4A22";
const CHICKEN = "#B5622B", CHICKEN_LIGHT = "#D88A45";
const ONION = "#E7B04A", ONION_LIGHT = "#F8DC8C", ONION_DARK = "#B97528";
const EGUSI = "#E9A43A", EGUSI_CURD = "#F7DC86";
const GARRI = "#F3C94F";
const OKRA = "#6E9A2E", OKRA_LIGHT = "#B6D46A";
const WAAKYE = "#6E2E2A", WAAKYE_BEAN = "#43181A";
const TILAPIA = "#68767E", TILAPIA_LIGHT = "#97A4AB";
const AKARA = "#C9782A", AKARA_LIGHT = "#E9A64A";
const MOIN = "#E2673A", MOIN_LIGHT = "#F08E5E";
const KOKI = "#E3A02C", KOKI_LIGHT = "#F2C25A";
const PASTRY = "#DC9A3C", PASTRY_LIGHT = "#F2C46A";
const KRAFT = "#D2A46C", LAMB = "#7A3C1E";
const TO = "#EFE7CF";
const RIZGRAS = "#C27530", RIZGRAS_LIGHT = "#E09A50";
const FOIL = "#D5DCE1", FOIL_DARK = "#AEB8BF";
const POND = "#2F4A1F", POND_LIGHT = "#5C8239";
const MOAMBE = "#D2461B", MOAMBE_OIL = "#F08A2E";
const TCHOBI = "#2E211B", TCHOBI_LIGHT = "#5E4232";
const CORN = "#F4C542", CORN_DARK = "#D9A12C", CHAR = "#3A2618";
const BOLI = "#E3A443", BOLI_IN = "#F6D27A";
const GLASS = "#EAF4FA", COFFEE = "#6B3B1F", FOAM = "#D9B48A";
const BANANA_LEAF = "#4FA36F", BANANA_LEAF_DARK = "#3F8F4F";
const LEAF_DARK = "#2F6B3A";

/* 1. Thiéboudienne : grand plateau métal, riz rouge, poisson entier farci, légumes. */
const thieboudienne = [
  ellipse(12, 16.8, 11, 5.4, C.grisLight),
  ellipse(12, 16.5, 9.6, 4.3, "#BFC7CD", false),
  path("M2.6 16.4Q2.2 10 7.2 8.2Q12 6.6 16.8 8.2Q21.8 10 21.4 16.4Q19 20.8 12 20.8Q5 20.8 2.6 16.4Z", THIEB),
  line("M4.4 12.6L5.2 12.2M19 12.2L19.8 12.6M3.8 15.4L4.6 15.4M20 15.6L20.8 15.4M6.6 19.4L7.4 19.6M16.6 19.6L17.4 19.4M11.6 12.6L12.4 12.8M7.6 12L8.4 12M15.4 12.4L16.2 12.2", THIEB_LIGHT, 0.8),
  // légumes : chou (vert), manioc (crème), carotte (orange), aubergine (violet)
  path("M3.8 17.2Q3.4 14 6.4 13.6Q9.2 13.8 8.8 16.8Q8.2 18.8 6 18.8Q4 18.6 3.8 17.2Z", C.vertLight),
  line("M4.8 16.8Q6.2 15.4 7.8 15.8M5.2 17.8Q6.6 16.8 8 17.2", C.vert, 0.6),
  rect(9.6, 15.6, 4.6, 3, 1.2, C.cream, { w: 0.9 }),
  g("rotate(-30 17.4 16.6)", path("M14.4 15.6H20.4Q20.8 16.6 20.4 17.6H14.4Q13.8 16.6 14.4 15.6Z", C.orange, { w: 0.9 }), line("M16 15.8V17.4M18 15.7V17.5", "#C55A18", 0.6)),
  ellipse(18.4, 12.8, 1.6, 1.1, C.violet, { w: 0.8 }),
  // poisson entier farci, posé au sommet du riz
  path("M8.6 9.6Q11.8 5 16.4 6.6Q18.2 7.4 18.8 8.8Q17.8 10.8 15 11.2Q11.2 11.6 8.6 9.6Z", FRIED),
  path("M8.8 9.6L5.4 6.8Q4.8 9.4 5.6 12.2Z", FRIED),
  line("M10.6 9.8L11.6 8M12.8 10.6L14 8.2M15 10.4L15.8 9", FRIED_DARK, 0.8),
  dots([[11.4, 9.6], [13.6, 9.8]], 0.4, C.vertLight),
  eye(16.8, 8.4, 0.5),
].join("");

/* 2. Yassa poulet : cuisse dorée sur un monticule d'oignons caramélisés, riz blanc, citron, olives. */
const onionStrand = (d) => line(d, ONION_LIGHT, 0.8);
const yassaPoulet = [
  ellipse(12, 16.4, 10.8, 5.8, C.white),
  ellipse(12, 16.2, 9.2, 4.6, "none", { c: C.ocre, w: 0.8 }),
  // riz blanc à gauche
  path("M2.6 15.8Q2.4 11.6 6.4 11Q9.6 10.8 10.4 14Q10.6 18.6 6.6 19Q3 19 2.6 15.8Z", C.cream),
  dots([[4.4, 13.4], [6.4, 12.6], [8.4, 13.4], [4.6, 16], [6.8, 15.4], [8.8, 16.6], [6, 17.8]], 0.4, C.sable),
  // monticule d'oignons
  path("M7.6 17.6Q6.6 11.4 11.6 9.6Q16.6 8.4 19.6 11.6Q22 14.6 20.6 17.6Q17 20.6 12.6 20.4Q8.6 20 7.6 17.6Z", ONION),
  onionStrand("M9 16.4Q10.6 14.4 12.6 15.6M13.4 18.4Q15.4 16.2 17.4 17.6M15.6 13.4Q17.6 12.4 19.4 14M10 12.4Q11.6 11.2 13.4 12.2M17.6 19Q19 18 20.2 16.4"),
  line("M11.2 18.6Q12.4 17.4 13.6 18.2M18 15.2Q19.2 15.4 19.8 16.4M8.8 14Q9.6 12.6 11 12.6", ONION_DARK, 0.7),
  // cuisse de poulet
  g("rotate(-24 13.6 10.4)",
    path("M8.4 10.6Q8.4 6.8 12.6 6.8Q16.8 7 17 10.2Q16.6 13.4 12.6 13.6Q8.6 13.6 8.4 10.6Z", CHICKEN),
    path("M16.6 9.4L20.4 9.2Q21.6 8.2 22.4 9.2Q22.8 10.2 21.8 10.6Q22.4 11.6 21.2 12.2Q20.4 12.2 20.2 11.4L16.4 11.6Z", C.cream),
    ellipse(11.4, 8.8, 1.8, 0.8, CHICKEN_LIGHT, false),
    line("M10.6 11.4L12 9.6M12.8 12.2L14.4 10M15 11.6L15.8 10.4", C.marron, 0.8)),
  // citron et olives
  circle(16.6, 19.4, 2.2, C.jaune),
  circle(16.6, 19.4, 1.4, "#FBE7A0", { c: C.ocre, w: 0.5 }),
  line("M16.6 18V20.8M15.2 19.4H18M15.6 18.4L17.6 20.4M17.6 18.4L15.6 20.4", C.ocre, 0.4),
  ellipse(5.2, 18.6, 1.1, 0.8, "#5E6B2A", { w: 0.8 }),
  ellipse(20.2, 14.2, 1, 0.75, "#5E6B2A", { w: 0.8 }),
].join("");

/* 3. Poulet DG : plat émaillé rectangulaire, morceaux de poulet, cubes de plantain, carottes, haricots verts. */
const cube = (x, y, s = 2.6) => rect(x - s / 2, y - s / 2, s, s, 0.6, C.orange, { w: 0.9 }) + rect(x - s / 2 + 0.5, y - s / 2 + 0.5, s - 1.2, s - 1.2, 0.3, C.ocreLight, false);
const bean = (d) => thick(d, C.vertLight, 1.1);
const pouletDg = [
  rect(1.6, 11.2, 20.8, 10.6, 3.6, C.white),
  rect(3, 12.4, 18, 8.2, 2.6, "none", { c: C.bleu, w: 1 }),
  path("M3.4 17Q2.8 11 7.4 9Q12 7.4 16.6 9Q21.2 11 20.6 17Q17.6 19.6 12 19.6Q6.4 19.6 3.4 17Z", "#C9772F"),
  // poulet
  path("M5 14.4Q4.4 10.4 8.2 9.8Q11.4 9.8 11.4 12.8Q11 15.8 8 16Q5.4 16 5 14.4Z", CHICKEN),
  ellipse(7.4, 11.6, 1.6, 0.7, CHICKEN_LIGHT, false),
  path("M12.8 11.6Q13 7 16.8 7.4Q20 8.2 19.4 11.6Q18.6 14.4 15.8 14.4Q13 14.2 12.8 11.6Z", CHICKEN),
  ellipse(15.8, 9.2, 1.5, 0.7, CHICKEN_LIGHT, false),
  // plantain, carottes, haricots
  cube(11.6, 16.2), cube(6.4, 17.4, 2.4), cube(17.4, 16.4, 2.4), cube(12, 9.2, 2.2),
  circle(14.6, 14.6, 1.1, C.orange, { w: 0.8 }), circle(9.2, 14, 1, C.orange, { w: 0.8 }), circle(19.4, 13.4, 0.9, C.orange, { w: 0.8 }),
  bean("M4.6 12.2L7 10.6"), bean("M14.6 17.8L16.8 18.6"), bean("M8.6 18.4L10.4 17.6"),
].join("");

/* 4. Soupe egusi : bol émaillé de soupe jaune-orangé grumeleuse aux feuilles vertes, boule d'igname pilée derrière. */
const leafBit = (x, y, rot) => g(`rotate(${rot} ${x} ${y})`, path(`M${x - 1.6} ${y}Q${x} ${y - 1.3} ${x + 1.6} ${y}Q${x} ${y + 1.3} ${x - 1.6} ${y}Z`, C.vert, { w: 0.7 }));
const soupeEgusi = [
  circle(16.6, 7.4, 4.6, C.cream),
  ellipse(15, 5.6, 1.6, 1, C.white, false),
  path("M1.8 12.2H22.2Q21.8 21.8 12 21.8Q2.2 21.8 1.8 12.2Z", C.bleu),
  line("M3.6 16.6Q12 18.8 20.4 16.6", C.white, 0.8),
  ellipse(12, 12.2, 10.2, 3.6, EGUSI),
  dots([[5.4, 11.8], [8.2, 10.4], [10.6, 12.8], [13.8, 10.2], [16.4, 12.6], [18.8, 11.2], [7.4, 13.6], [14.4, 14], [11.8, 9.8]], 0.7, EGUSI_CURD),
  leafBit(7, 11.6, -20), leafBit(12.6, 11.8, 15), leafBit(17.4, 13.2, -10), leafBit(15.6, 10.4, 30), leafBit(9.6, 14.2, 5),
  rect(10.4, 9.6, 2.2, 1.6, 0.6, C.marron, { w: 0.7 }),
  dots([[4.4, 13], [19.6, 12.6], [12.6, 14.6]], 0.35, C.rouge),
].join("");

/* 5. Eba : grosse boule de garri jaune sur assiette, petit bol de soupe gombo (rondelles). */
const okraRing = (x, y, r = 0.9) => circle(x, y, r, OKRA_LIGHT, { w: 0.6 }) + circle(x, y, r * 0.35, C.cream, false);
const eba = [
  ellipse(10.4, 17.8, 9.4, 4.2, C.white),
  path("M2.6 17.6Q1.8 10.2 6.6 7.6Q10.4 5.8 13.6 8.4Q17 11.6 16 17.2Q13.6 19.8 9.2 19.8Q4.2 19.6 2.6 17.6Z", GARRI),
  ellipse(7, 9.8, 2, 1.2, "#FBE59A", false),
  dots([[5.2, 13.6], [8.4, 12.4], [11.2, 14.4], [7, 16.8], [12.8, 11.2], [10, 17.4], [13.6, 15.8]], 0.3, C.ocre),
  line("M5.6 17.8Q9 19 13 17.6", C.ocre, 0.7),
  path("M12.6 15H22.6Q22.4 21.8 17.6 21.8Q12.8 21.8 12.6 15Z", C.terre),
  ellipse(17.6, 15, 5, 1.8, OKRA),
  okraRing(15.2, 14.8), okraRing(17.8, 14.4), okraRing(20, 15.2), okraRing(17, 15.8, 0.75),
].join("");

/* 6. Kedjenou : poulet étouffé dans un canari en terre, couvercle entrouvert, vapeur. */
const kedjenou = [
  path("M5.6 9.6Q2 12.4 2.6 16.6Q3.6 21.8 12 21.8Q20.4 21.8 21.4 16.6Q22 12.4 18.4 9.6Z", C.terre),
  line("M3.6 15.6Q12 18 20.4 15.6", C.terreDark, 0.8),
  line("M5 17.6L6.2 16.8L7.4 17.8L8.6 17L9.8 18L11 17.2L12.2 18.2L13.4 17.2L14.6 18L15.8 17L17 17.8L18.2 16.8L19.2 17.4", C.terreDark, 0.7),
  ellipse(12, 9.6, 6.8, 1.9, C.terreDark),
  ellipse(12, 9.6, 5.6, 1.3, "#C7792E", false),
  // cuisse qui dépasse, os vers le haut à gauche
  g("rotate(40 9.6 8.6)",
    path("M7 8.6Q7.2 6 9.8 6Q12.6 6.2 12.6 8.6Q12.4 11.2 9.8 11.2Q7.2 11.2 7 8.6Z", CHICKEN),
    path("M7.4 7.8H4.4Q3.6 7 3 7.8Q2.8 8.6 3.4 8.8Q2.8 9.6 3.4 10.2Q4 10.4 4.4 9.6H7.4Z", C.cream),
    ellipse(9.4, 7.2, 1.4, 0.6, CHICKEN_LIGHT, false)),
  // couvercle soulevé et penché
  g("rotate(18 16 6)",
    path("M10.6 6.8Q11 3.2 16 3.2Q21 3.2 21.4 6.8Z", C.terre),
    ellipse(16, 6.8, 5.4, 1, C.terreDark),
    rect(15, 1.6, 2, 1.8, 0.7, C.terreDark, { w: 0.8 })),
  steam([11.6], 7.4),
].join("");

/* 7. Waakye : sur une feuille, riz-haricots rouge sombre, spaghettis, œuf dur, shito. */
const waakye = [
  path("M1 15.6Q6 9.6 13 10.4Q20.6 11.2 23 17.4Q17 22.4 9.6 21.8Q3 21.2 1 15.6Z", BANANA_LEAF),
  line("M2.4 15.8Q12 14.8 21.8 17.6", BANANA_LEAF_DARK, 0.8),
  // riz waakye
  path("M3.8 15Q3.6 7.4 10 5.6Q15.6 4.6 17.6 9.2Q19 13.6 16 16.6Q12.6 19 8 18.6Q4.2 18 3.8 15Z", WAAKYE),
  dots([[6.6, 10.6], [9.4, 8.2], [12.8, 7.6], [15.4, 10], [8, 13.6], [11.4, 11.4], [14.2, 13.6], [6, 15.6], [10.6, 15.4]], 0.5, WAAKYE_BEAN),
  line("M7.6 8.8L8.4 8.6M11 9.8L11.8 9.6M14.6 7.8L15.2 8.2M5.4 12.6L6.2 12.4M12.6 14.6L13.4 14.4M9.2 16.6L10 16.6", "#B8706A", 0.7),
  // spaghettis
  path("M13.6 17.2Q14 14 17 13.4Q20.4 13.4 21 16.2Q20.6 19.2 17.4 19.4Q14.4 19.4 13.6 17.2Z", "#F2D47E"),
  line("M14.6 16.6Q16 14.4 17.6 16.2T20.2 16M14.8 18Q16.6 16.6 18 18.2T20.4 17.4M15.6 14.8Q17.4 13.6 19.6 14.8", "#C99A3C", 0.6),
  // œuf dur coupé
  ellipse(6.2, 18.4, 2.8, 2, C.white),
  circle(6.4, 18.4, 1.1, C.jaune, { w: 0.7 }),
  // shito
  path("M14.4 8.6Q14.6 5.6 17.6 5.8Q20.4 6.2 20 8.8Q19.2 10.8 17 10.6Q14.6 10.4 14.4 8.6Z", "#2B1610"),
  ellipse(16.6, 7.2, 1, 0.5, "#8A3A22", false),
].join("");

/* 8. Banku & tilapia : deux boules blanches, tilapia grillé gris foncé, piment rouge. */
const bankuTilapia = [
  ellipse(12, 16.4, 11, 5.6, C.white),
  ellipse(12, 16.2, 9.6, 4.5, "none", { c: C.vert, w: 0.8 }),
  // banku
  circle(6.4, 10.6, 3.8, C.cream),
  ellipse(5.2, 9, 1.3, 0.8, C.white, false),
  circle(10.8, 8.8, 3.4, C.cream),
  ellipse(9.8, 7.4, 1.2, 0.7, C.white, false),
  // piment
  path("M15.4 9.6Q15.6 6.4 18.6 6.4Q21.6 6.6 21.4 9.4Q20.8 11.4 18.4 11.4Q15.6 11.2 15.4 9.6Z", C.rouge),
  dots([[17.4, 8.4], [19.2, 8], [18.8, 9.8]], 0.35, C.ocreLight),
  // tilapia
  path("M5.4 15.6Q9.4 10.4 15.6 11.4Q19.4 12.4 20.4 15.4Q19.2 18.6 15 19.4Q9.6 20 5.4 15.6Z", TILAPIA),
  path("M5.6 15.6L2 12.6Q1.6 15.8 2.4 19Z", TILAPIA),
  path("M8.6 12.6Q11.6 9.2 16 10.8", "none", { w: 0.9 }),
  line("M9.4 15.8L11 13.4M11.6 17.6L13.6 13.2M14 18.2L15.6 14.4", O, 0.8),
  ellipse(13.4, 13.8, 1.8, 0.6, TILAPIA_LIGHT, false),
  line("M17.6 13Q16.8 15.4 17.8 17.8", "#46525A", 0.8),
  eye(18.8, 14.6),
  dots([[9, 18.4], [12.2, 19], [7.4, 14.2]], 0.35, C.rouge),
].join("");

/* 9. Akara : beignets de haricot dorés et irréguliers dans un cornet de papier journal. */
const fritter = (x, y, r = 2.8) => path(`M${x - r} ${y + 0.2}Q${x - r * 1.05} ${y - r * 0.8} ${x - r * 0.2} ${y - r * 0.95}Q${x + r * 0.5} ${y - r * 1.15} ${x + r * 0.95} ${y - r * 0.3}Q${x + r * 1.1} ${y + r * 0.7} ${x + r * 0.1} ${y + r * 0.95}Q${x - r * 0.9} ${y + r} ${x - r} ${y + 0.2}Z`, AKARA)
  + ellipse(x - r * 0.3, y - r * 0.45, r * 0.4, r * 0.24, AKARA_LIGHT, false)
  + dots([[x + r * 0.35, y + r * 0.1], [x - r * 0.4, y + r * 0.4], [x + r * 0.1, y - r * 0.5]], 0.28, "#8A4A1A");
const akara = [
  fritter(7.4, 8.6, 3.2), fritter(16.6, 8.4, 3.2), fritter(12, 5.8, 3.2), fritter(12, 10.2, 3),
  path("M2.6 10.6Q12 13.4 21.4 10.6L13.2 22.2Q12 23 10.8 22.2Z", C.grisLight),
  line("M6 13.4H12.2M7.2 15.2H15.4M8.6 17H11.6M13 17H14.6M9.8 18.8H13.4", C.gris, 0.7),
  path("M2.6 10.6Q12 13.4 21.4 10.6", "none"),
].join("");

/* 10. Moin-moin : pudding de haricot orangé, à moitié sorti de sa feuille, tranche d'œuf. */
const moinMoin = [
  // grande feuille ouverte à plat
  path("M0.8 17.2Q4 11.6 12 12Q20 11.6 23.2 17.2Q19.6 22.6 12 22.4Q4.4 22.6 0.8 17.2Z", LEAF_DARK),
  line("M2.4 17.4Q12 16 21.6 17.4M5 15.2L7.6 17M19 15.2L16.4 17M5.6 20.4L8 18M18.4 20.4L16 18", "#244F2C", 0.6),
  // pyramide de moin-moin (forme de la feuille pliée)
  path("M3.6 18.4Q4.4 15.6 10.4 5.4Q12 3.4 13.6 5.4Q19.6 15.6 20.4 18.4Q12 20.4 3.6 18.4Z", MOIN),
  path("M12 4.4Q11.6 12 12.4 19.4", "none", { c: "#C9542A", w: 0.6 }),
  ellipse(10, 9.6, 0.9, 2, MOIN_LIGHT, false),
  dots([[9.4, 14.6], [14.2, 12.4], [15.4, 16.2], [8, 17.2]], 0.35, "#C9542A"),
  // tranche coupée devant, avec un morceau d'œuf
  g("rotate(-10 16.6 19.4)", rect(12.4, 17, 8.4, 4.6, 1.4, MOIN_LIGHT), rect(12.4, 17, 8.4, 1.3, 0.6, MOIN, { w: 0.8 }), ellipse(16.6, 19.6, 1.7, 1.1, C.white, { w: 0.7 }), circle(16.6, 19.6, 0.55, C.jaune, false)),
].join("");

/* 11. Fataya : chaussons en demi-lune dorés, bords pincés, sur un plateau tressé, petite sauce. */
const fataya1 = (x, y, rot) => g(`rotate(${rot} ${x} ${y})`,
  path(`M${x - 4} ${y + 1.2}Q${x - 4} ${y - 3.6} ${x} ${y - 3.6}Q${x + 4} ${y - 3.6} ${x + 4} ${y + 1.2}Z`, PASTRY),
  ellipse(x - 1.2, y - 1.8, 1.6, 0.7, PASTRY_LIGHT, false),
  line(`M${x - 3.4} ${y + 1.2}L${x - 3} ${y + 0.4}M${x - 2} ${y + 1.2}L${x - 1.6} ${y + 0.4}M${x - 0.6} ${y + 1.2}L${x - 0.2} ${y + 0.4}M${x + 0.8} ${y + 1.2}L${x + 1.2} ${y + 0.4}M${x + 2.2} ${y + 1.2}L${x + 2.6} ${y + 0.4}`, "#A5641E", 0.7));
const fataya = [
  ellipse(12, 16.6, 11, 5.4, C.sable),
  ellipse(12, 16.4, 9.2, 4.2, "none", { c: C.bois, w: 0.8 }),
  line("M5 14.6Q12 12.2 19 14.6M4.6 18Q12 15.6 19.4 18", C.bois, 0.6),
  fataya1(8.2, 11.6, -14), fataya1(15.6, 10.6, 12), fataya1(10.6, 17.4, 4),
  // sauce oignon-tomate
  path("M15.6 17.6H22Q21.8 21.6 18.8 21.6Q15.8 21.6 15.6 17.6Z", C.white),
  ellipse(18.8, 17.6, 3.2, 1.1, C.rouge, { w: 0.8 }),
  dots([[17.8, 17.4], [19.6, 17.8]], 0.3, C.ocreLight),
].join("");

/* 12. Dibi : côtelettes d'agneau grillées sur papier kraft, oignons crus, moutarde. */
const chop = (x, y, rot) => g(`rotate(${rot} ${x} ${y})`,
  path(`M${x - 3.2} ${y}Q${x - 3.2} ${y - 2.4} ${x - 0.4} ${y - 2.4}Q${x + 2.4} ${y - 2.2} ${x + 2.4} ${y}Q${x + 2.2} ${y + 2.2} ${x - 0.4} ${y + 2.2}Q${x - 3.2} ${y + 2.2} ${x - 3.2} ${y}Z`, LAMB),
  path(`M${x + 2.2} ${y - 0.5}H${x + 4.4}Q${x + 5.2} ${y - 1.2} ${x + 5.6} ${y - 0.4}Q${x + 5.8} ${y + 0.4} ${x + 5} ${y + 0.6}H${x + 2.2}Z`, C.cream, { w: 0.8 }),
  line(`M${x - 2} ${y + 1}L${x - 0.6} ${y - 1.2}M${x - 0.2} ${y + 1.4}L${x + 1.2} ${y - 1}`, "#4A2210", 0.8),
  ellipse(x - 1.6, y - 1.2, 0.9, 0.4, "#A65A2E", false));
const onionRing = (x, y, rx = 1.6, ry = 1.1) => ellipse(x, y, rx, ry, "none", { c: O, w: 1.9 }) + ellipse(x, y, rx, ry, "none", { c: "#F3E6F0", w: 0.8 });
const dibi = [
  path("M1.6 13.4L9.4 5.2L22.6 10.2L16.6 21.4L4.2 20.8Z", KRAFT),
  line("M9.4 5.2L10.4 9.4L22.6 10.2", "#B88A52", 0.7),
  chop(6.6, 13.6, -20), chop(13.4, 10.6, 10), chop(11.6, 16.8, -5),
  onionRing(18.2, 15.2), onionRing(5.8, 18.6, 1.4, 1), onionRing(17, 18.2, 1.3, 0.9),
  line("M9.2 14.2Q11 12.8 12.6 14Q14.4 15.2 16 13.6", O, 1.9),
  line("M9.2 14.2Q11 12.8 12.6 14Q14.4 15.2 16 13.6", C.jaune, 0.9),
  circle(19.6, 11.8, 0.9, C.rouge, { w: 0.7 }),
].join("");

/* 13. Tô sauce gombo : dôme de tô dans une calebasse, nappé de sauce gombo verte et gluante. */
const toSauceGombo = [
  path("M2.2 13H21.8Q21.4 22 12 22Q2.6 22 2.2 13Z", C.ocre),
  line("M4.6 16.6Q12 18.8 19.4 16.6M6.6 19.4L8 18.2L9.4 19.4L10.8 18.2L12.2 19.4L13.6 18.2L15 19.4L16.4 18.2L17.6 19.2", C.marron, 0.7),
  ellipse(12, 13, 9.8, 2.4, "#C9862A"),
  path("M4.4 13.6Q4 5.6 12 4.6Q20 5.6 19.6 13.6Q12 15.6 4.4 13.6Z", TO),
  ellipse(7.6, 10.8, 1.2, 1.8, C.white, false),
  // sauce gombo qui coule sur le dôme
  path("M6.4 9Q7.6 4.6 12 4.6Q16.4 4.8 17.6 9Q18 11 17.2 11.8Q16.6 12.8 16.2 11.6Q15.8 10.6 15 11.2Q14.6 13.6 13.6 12.8Q13.2 11.4 12.2 11.4Q11.6 13.2 10.8 12.4Q10.4 11 9.6 11Q8.8 12.4 8.2 11.4Q7.8 10.4 7 10.8Q6.2 10.8 6.4 9Z", OKRA),
  path("M9 6.8Q11.4 5.4 14 6.2", "none", { c: "#A8CC5E", w: 0.9 }),
  dots([[9.4, 8.8], [12.8, 8.2], [15.2, 9.4], [11.2, 10.2], [14, 10.6]], 0.4, "#D6E89A"),
].join("");

/* 14. Riz gras : grosse bassine émaillée à fleurs, riz brun-orangé en dôme, viande et légumes. */
const flower = (x, y, col) => dots([[x - 0.6, y], [x + 0.6, y], [x, y - 0.6], [x, y + 0.6]], 0.45, col) + circle(x, y, 0.35, C.jaune, false);
const rizGras = [
  path("M3.4 15.2Q11.8 9 20.6 15.2Q20.4 22 12 22Q3.6 22 3.4 15.2Z", RIZGRAS),
  path("M3.6 12.4Q2.6 6.6 7.6 5Q12 3.6 16.4 5Q21.2 6.6 20.4 12.4Z", RIZGRAS),
  line("M5.4 9.4L6.2 9.2M8.6 6.4L9.4 6.4M12.6 5.4L13.4 5.6M16.2 7L17 7.4M18.4 10L19 10.4M6.8 11.6L7.6 11.6M14.8 10.4L15.6 10.6", RIZGRAS_LIGHT, 0.8),
  rect(9.6, 6.6, 3.6, 2.8, 1, C.marron, { w: 0.9 }),
  rect(14.8, 8.4, 3, 2.4, 1, C.marron, { w: 0.9 }),
  circle(7, 8.6, 1.1, C.orange, { w: 0.8 }),
  path("M10.6 10.6Q12.4 9.4 14.2 11", "none", { c: C.vertLight, w: 1.2 }),
  dots([[5.8, 11.2], [13, 9.6], [18.2, 11.6], [12.2, 4.8]], 0.45, C.vertLight),
  // bassine
  path("M1.4 12H22.6L20.6 20.6Q20.2 22 18.6 22H5.4Q3.8 22 3.4 20.6Z", C.white),
  ellipse(12, 12, 10.6, 1.6, C.rouge),
  ellipse(12, 12, 9, 0.8, RIZGRAS, false),
  flower(6.2, 16, C.rouge), flower(12, 17.4, C.vert), flower(17.8, 16, C.rouge),
  line("M4 20.4H20", C.rouge, 0.8),
].join("");

/* 15. Poisson braisé : poisson doré marqué par la grille, sur papier alu, oignons, tomate, alloco. */
const poissonBraise = [
  path("M1.2 14.8L4 10.2L9.4 11.6L14.6 9.4L20.2 11L22.8 15.6L20.4 21L12.8 19.8L7 21.6L2.6 19.4Z", FOIL),
  line("M3.6 12.4L5 13.6M20 12.8L21.6 14.8M5.6 20.4L7.4 19.6M17.6 20.4L19.6 20", FOIL_DARK, 0.6),
  g("rotate(-14 12 12.6)",
    path("M4.2 12.6Q8.8 5 16 6.6Q20.6 7.8 22 12.4Q20.6 16.8 16 17.8Q8.8 19 4.2 12.6Z", C.ocre),
    path("M4.4 12.6L1 8.8Q0.4 12.8 1.4 16.8Z", C.ocre),
    path("M8.6 8.4Q11.6 5 15.4 6.2", "none", { w: 0.9 }),
    line("M7 15L9.8 9.2M10.4 17L13.6 8.2M13.8 17.4L16.8 8.8", C.marron, 1.2),
    line("M18 8.6Q16.8 12.2 18 15.8", C.marron, 0.8),
    eye(19.6, 11.2, 0.6)),
  // oignons émincés, piment vert, tomate, alloco
  line("M8.8 14.6Q10 13.4 11.2 14.2M12.6 12.2Q13.8 11 15 11.8", "#F3E6F0", 0.9),
  thick("M15.6 14.4L17.2 13.6", C.vertLight, 0.9),
  g("rotate(-20 5.4 19.2)", ellipse(5.4, 19.2, 2.4, 1.4, C.orange, { w: 0.9 }), ellipse(5.4, 19.1, 1.5, 0.75, C.ocreLight, false)),
  g("rotate(15 18.8 19.6)", ellipse(18.8, 19.6, 2.4, 1.4, C.orange, { w: 0.9 }), ellipse(18.8, 19.5, 1.5, 0.75, C.ocreLight, false)),
  circle(12.4, 20, 1.3, C.rouge, { w: 0.8 }), dots([[12, 19.7], [12.8, 20.3]], 0.3, C.ocreLight),
].join("");

/* 16. Koki : gâteau de haricot jaune-orangé ficelé dans des feuilles de bananier, ouvert et tranché. */
const koki = [
  path("M1.4 16.4Q6 12.6 12.6 13.4Q19.6 14 22.6 18Q16 22.4 8.6 21.6Q3 21 1.4 16.4Z", C.vertLight),
  line("M3 16.6Q12 16.2 21.2 18.2", C.vert, 0.7),
  // paquet encore fermé à gauche
  rect(1.8, 7.4, 9.4, 9.6, 2.2, C.vertLight),
  line("M2.8 9.4Q6.4 8.6 10.2 9.4M2.8 15Q6.4 15.8 10.2 15", C.vert, 0.7),
  line("M6.4 7.4V17", O, 1.9), line("M6.4 7.4V17", C.cream, 0.8),
  // bloc ouvert à droite
  path("M10 8.4H19.6Q21 8.4 21 9.8V15.2Q21 16.6 19.6 16.6H10Z", KOKI),
  path("M10 8.4H19.6Q21 8.4 21 9.8V10.6H10Z", "#D77A1E", { w: 0.9 }),
  dots([[13, 12.4], [16.4, 13.6], [18.6, 11.8], [14.6, 14.8]], 0.45, C.rouge),
  ellipse(15, 12, 2, 0.6, KOKI_LIGHT, false),
  // tranche coupée
  g("rotate(-10 16 19.2)", rect(12.6, 17.6, 6.6, 3.2, 0.8, KOKI), rect(12.6, 17.6, 6.6, 1, 0.5, "#D77A1E", { w: 0.8 }), dots([[14.6, 19.6], [17.2, 19.4]], 0.4, C.rouge)),
].join("");

/* 17. Pondu : feuilles de manioc pilées vert très foncé dans une marmite noire à trois pieds. */
const pondu = [
  line("M6.4 19.4L4.6 22.4M17.6 19.4L19.4 22.4M12 20.6V23", O, 1.8),
  path("M2.6 11.4Q2.4 20.8 12 20.8Q21.6 20.8 21.4 11.4Z", "#3A3532"),
  line("M4.4 15.4Q5.4 18.6 9 19.4", C.gris, 0.8),
  path("M2.6 12.6Q0.6 12.6 0.8 14.2Q1.2 15.4 2.9 15", "none", { w: 1.4 }),
  path("M21.4 12.6Q23.4 12.6 23.2 14.2Q22.8 15.4 21.1 15", "none", { w: 1.4 }),
  ellipse(12, 11.4, 9.8, 2.6, "#3A3532"),
  // pondu bombé
  path("M3.6 11.6Q3.6 5.6 9 5Q12 3.6 15 5Q20.4 5.6 20.4 11.6Q12 14.2 3.6 11.6Z", POND),
  line("M6 9.4L7 8.6M9.6 7.4L10.6 7M13.4 6.4L14.4 6.8M16.6 8.4L17.6 9.2M8 11.2L9 10.6M12.2 9.6L13.2 9.4M15.4 11L16.4 10.6M18.4 11.2L18.8 10.4", POND_LIGHT, 0.8),
  // poisson fumé et piment
  rect(11, 7.2, 3.4, 2, 0.8, C.bois, { w: 0.8 }),
  path("M16.6 6.6Q18.8 5.6 19.6 7.4Q18.6 8.4 16.8 7.8Z", C.rouge, { w: 0.8 }),
].join("");

/* 18. Poulet moambé : poulet dans une sauce graine rouge-orangé brillante, noix de palme à côté. */
const palmNut = (x, y, rot) => g(`rotate(${rot} ${x} ${y})`, ellipse(x, y, 1.2, 1.6, "#E2541E", { w: 0.8 }), path(`M${x - 1.1} ${y - 0.5}Q${x} ${y - 2.4} ${x + 1.1} ${y - 0.5}Q${x} ${y - 1} ${x - 1.1} ${y - 0.5}Z`, "#3A1A10", { w: 0.6 }));
const pouletMoambe = [
  path("M1.6 11.6H22.4Q22 21 12 21Q2 21 1.6 11.6Z", C.white),
  ellipse(12, 11.6, 10.4, 4, C.white),
  path("M1.9 13.4Q2.6 20.6 12 21", "none", { c: C.bleu, w: 0.8 }),
  ellipse(12, 11.8, 8.8, 3.1, MOAMBE),
  ellipse(7.4, 12.6, 2, 0.6, MOAMBE_OIL, false),
  ellipse(16.6, 13.2, 1.6, 0.5, MOAMBE_OIL, false),
  dots([[10, 13.6], [13.2, 13.8], [19, 11.6]], 0.4, "#F5B04A"),
  // poulet
  g("rotate(-30 11.4 8.6)",
    path("M6.6 9.4Q6.4 5.8 10 5.6Q13.6 5.6 13.8 9Q13.4 11.8 10.2 12Q6.8 12 6.6 9.4Z", CHICKEN),
    path("M13.4 7.8H16.6Q17.6 7 18.2 7.8Q18.4 8.6 17.8 8.8Q18.4 9.6 17.6 10.2Q16.8 10.2 16.6 9.6H13.4Z", C.cream),
    ellipse(9.4, 7.4, 1.6, 0.7, CHICKEN_LIGHT, false)),
  path("M14.2 10.6Q14.4 8.2 17 8.4Q19.4 8.8 19 11Q18.2 12.6 16.4 12.4Q14.4 12.2 14.2 10.6Z", CHICKEN),
  // grappe de noix de palme, posée devant
  palmNut(17.4, 19.6, -25), palmNut(21, 19.4, 25), palmNut(19.2, 20.8, 0),
].join("");

/* 19. Chikwangue : bâton de manioc enveloppé de feuilles et ficelé, un bout déballé, rondelles coupées. */
const chikwangue = [
  g("rotate(-32 12 12)",
    // bout déballé (manioc blanc grisé)
    rect(13, 9.4, 9.6, 5.2, 2.4, "#ECE7D4"),
    ellipse(22, 12, 1.4, 2.6, "#D9D2B8", { w: 0.9 }),
    line("M15 11H19.6", C.white, 0.8),
    // feuilles
    rect(1, 9, 14.4, 6, 2.6, BANANA_LEAF_DARK),
    path("M15.4 9Q18 7.4 19.6 8.4Q17.6 9.8 15.4 10.6Z", BANANA_LEAF),
    path("M15.4 15Q18 16.6 19.6 15.6Q17.6 14.2 15.4 13.4Z", BANANA_LEAF),
    line("M3.4 9.4L5.4 14.6M6.8 9.2L8.8 14.8M10.2 9.2L12.2 14.8", "#2B6B3A", 0.7),
    line("M4.2 9V15M11.2 9V15", O, 1.8), line("M4.2 9V15M11.2 9V15", C.sable, 0.7)),
  // rondelles
  ellipse(8.4, 19.8, 2.4, 1.5, "#ECE7D4"), ellipse(8.4, 19.8, 1, 0.6, "#D9D2B8", false),
  ellipse(13.4, 20.4, 2.2, 1.4, "#ECE7D4"), ellipse(13.4, 20.4, 0.9, 0.55, "#D9D2B8", false),
].join("");

/* 20. Mbongo tchobi : sauce noire épicée dans un plat en terre, darnes de poisson, piment. */
const steak = (x, y, rot) => g(`rotate(${rot} ${x} ${y})`, path(`M${x - 2.6} ${y}Q${x - 2.6} ${y - 2} ${x} ${y - 2}Q${x + 2.6} ${y - 2} ${x + 2.6} ${y}Q${x + 2.2} ${y + 2} ${x} ${y + 1.4}Q${x - 2.4} ${y + 1.8} ${x - 2.6} ${y}Z`, "#EDE0C8"), path(`M${x - 2.6} ${y}Q${x - 2.6} ${y - 2} ${x} ${y - 2}Q${x + 2.6} ${y - 2} ${x + 2.6} ${y}`, "none", { c: "#7D8890", w: 1 }), circle(x, y - 0.2, 0.45, "#B9A88A", false));
const mbongoTchobi = [
  path("M1.4 11.4H22.6Q22.4 21.4 12 21.4Q1.6 21.4 1.4 11.4Z", C.terre),
  line("M3.2 16.2Q12 19 20.8 16.2", C.terreDark, 0.8),
  ellipse(12, 11.4, 10.6, 4.6, C.terreDark),
  ellipse(12, 11.6, 9.4, 3.8, TCHOBI),
  // poisson à moitié plongé : tête à gauche, queue à droite
  path("M4 11.8Q4.4 8.2 8 7.6Q10.4 7.6 10.8 10Q10.6 12.2 9.4 12.4Q6.4 13 4 11.8Z", "#8E9AA2"),
  path("M5.6 9.4Q6.4 8.6 7.4 9.2", "none", { c: "#5E6A72", w: 0.7 }),
  line("M9.2 8.4Q8.6 10.4 9.4 12.2", "#5E6A72", 0.7),
  eye(6.4, 10, 0.55),
  path("M15.6 11.8L19.4 8.2Q20.4 10.6 19.8 13.4Z", "#8E9AA2"),
  line("M16.8 11.4L19 9.6M17 12L19.6 11.6", "#5E6A72", 0.6),
  line("M11.4 12.4Q13.2 11.6 15 12.4M7.4 14.4Q9.6 13.6 11.6 14.6M13.4 14.6Q15.4 14 17.2 14.8", TCHOBI_LIGHT, 0.8),
  path("M11.8 9.4Q13.6 7.6 15.6 8.8Q14 10.4 11.8 9.4Z", C.rouge, { w: 0.8 }),
  dots([[12.6, 11.2], [18, 14.2], [5.4, 14], [20.2, 11.4]], 0.45, C.vertLight),
  steam([8, 12.4], 5.2),
].join("");

/* 21. Maïs grillé : épi doré marqué de noir sur une petite grille au-dessus des braises. */
const kernels = [];
for (let r = 0; r < 3; r++) for (let k = 0; k < 6; k++) kernels.push([6.6 + k * 2.2, 10.2 + r * 1.8]);
const maisGrille = [
  // braises et grille
  path("M3 19.2Q3.4 22.2 12 22.2Q20.6 22.2 21 19.2Z", "#4A3A32"),
  dots([[6.6, 20.2], [10, 20.8], [13.6, 20.4], [17.4, 20.2], [8.4, 21.4], [15.6, 21.4]], 0.7, C.orange),
  line("M2 18.6H22", O, 2.2), line("M2 18.6H22", C.gris, 1),
  g("rotate(-28 12 12.2)",
    // feuilles de l'épi
    path("M5.4 10.2Q1.4 8 0.6 11Q2.4 12 5.2 12.4Z", "#C9B26A"),
    path("M5.4 14.2Q1.6 16.8 0.8 13.8Q2.6 13 5.2 12.2Z", "#B59A4E"),
    rect(4.6, 8.6, 15.8, 7.2, 3.6, CORN),
    dots(kernels, 0.75, CORN_DARK),
    dots([[8.8, 10.2], [13.2, 12], [15.4, 10.2], [10.8, 13.8], [17.6, 12], [6.6, 12]], 0.95, CHAR),
    ellipse(11, 9.6, 3.2, 0.6, "#FBE59A", false)),
  steam([18.4, 21], 5),
].join("");

/* 22. Boli : plantains rôtis à la braise, peau dorée tachée de noir, l'un ouvert, arachides. */
const plantainCurve = (y, open) => [
  path(`M2.4 ${y}Q12 ${y - 7} 21.6 ${y}Q21.8 ${y + 1.6} 20.4 ${y + 1.8}Q12 ${y - 3} 3.6 ${y + 1.8}Q2.2 ${y + 1.6} 2.4 ${y}Z`, BOLI),
  open ? path(`M4.6 ${y + 0.2}Q12 ${y - 4.8} 19.4 ${y + 0.2}Q12 ${y - 2.8} 4.6 ${y + 0.2}Z`, BOLI_IN, { w: 0.7 }) : "",
  dots([[6, y - 1.2], [10.4, y - 3], [14.6, y - 2.8], [18.2, y - 1.4]], 0.8, CHAR),
  line(`M8.2 ${y - 1.4}L8.8 ${y - 2.4}M12.6 ${y - 3.2}L13.4 ${y - 2.6}M16.6 ${y - 1.8}L17 ${y - 2.6}`, CHAR, 0.8),
].join("");
const nut = (x, y, rot) => g(`rotate(${rot} ${x} ${y}) translate(${x} ${y}) scale(1.35) translate(${-x} ${-y})`, path(`M${x - 1.4} ${y}A0.9 0.9 0 0 1 ${x} ${y - 0.4}A0.9 0.9 0 0 1 ${x + 1.4} ${y}A0.9 0.9 0 0 1 ${x} ${y + 0.4}A0.9 0.9 0 0 1 ${x - 1.4} ${y}Z`, "#E3C08A", { w: 0.7 }));
const boli = [
  ellipse(12, 20.4, 10.6, 2.2, C.sable),
  // plantain entier, courbé, peau dorée tachée de noir
  path("M1.6 13.2Q10 2.6 22 7.4Q22.6 9.8 21 10.6Q11.2 7.2 4 15.4Q1.8 15.4 1.6 13.2Z", BOLI),
  ellipse(6.2, 10.6, 1.4, 0.8, CHAR, false), ellipse(11.4, 7.6, 1.3, 0.7, CHAR, false), ellipse(17.2, 7.4, 1.2, 0.7, CHAR, false), ellipse(14.4, 8.6, 0.6, 0.4, CHAR, false),
  line("M5.4 12.4Q11 7.4 18 8.4", "#F6D27A", 0.8),
  path("M1.6 13.2Q10 2.6 22 7.4Q22.6 9.8 21 10.6Q11.2 7.2 4 15.4Q1.8 15.4 1.6 13.2Z", "none"),
  // plantain fendu : chair jaune visible
  path("M1.6 18.2Q10.4 9.4 22.4 13.6Q22.6 16 21 16.4Q11 13.4 3.8 20Q1.6 20 1.6 18.2Z", "#9A6430"),
  path("M3.6 17.8Q11 11.6 20.8 14.4Q20.6 15.2 20 15.4Q11 13 4.4 18.6Q3.8 18.4 3.6 17.8Z", BOLI_IN, { w: 0.8 }),
  ellipse(8.4, 15.4, 0.9, 0.5, CHAR, false), ellipse(14.6, 13.4, 0.9, 0.5, CHAR, false),
  // arachides
  nut(7, 20.8, -15), nut(11.4, 21, 20), nut(15.8, 20.8, -10), nut(19.6, 20.4, 25),
].join("");

/* 23. Dégué : coupe en verre de lait caillé aux perles de mil, raisins, cuillère. */
const degue = [
  thick("M14.4 12L19.6 2.4", C.gris, 1.1),
  ellipse(19.4, 2.8, 1.1, 0.7, C.grisLight, { w: 0.8 }),
  path("M2.6 9.4H21.4Q21.2 18.4 14.4 19.8V20.6H17Q18.2 21 17 22H7Q5.8 21 7 20.6H9.6V19.8Q2.8 18.4 2.6 9.4Z", GLASS),
  path("M3.4 11.6H20.6Q19.8 17.6 12 18.4Q4.2 17.6 3.4 11.6Z", C.cream, false),
  path("M2.6 9.4H21.4Q21.2 18.4 14.4 19.8V20.6H17Q18.2 21 17 22H7Q5.8 21 7 20.6H9.6V19.8Q2.8 18.4 2.6 9.4Z", "none"),
  ellipse(12, 9.4, 9.4, 2.2, GLASS),
  path("M3.6 10Q4.6 7 12 6.8Q19.4 7 20.4 10Q12 12 3.6 10Z", C.white),
  dots([[6, 9.4], [8.4, 8.4], [10.4, 9.8], [12.6, 8.2], [15, 9.6], [17.4, 8.8], [9, 10.6], [13.8, 10.8], [16.4, 10.4], [7.4, 13], [10.6, 14.6], [14, 13.4], [16.6, 14.4], [12.2, 16.4], [5.6, 12.4], [18.4, 12.6]], 0.45, "#E2C78A"),
  dots([[11, 8.6], [16, 8.2]], 0.55, "#5A2A3A"),
  line("M5.2 12.4Q6 15.6 8.6 17", C.white, 0.8),
].join("");

/* 24. Café Touba : bouilloire alu qui verse de haut un filet de café dans un petit verre mousseux, vapeur. */
const cafeTouba = [
  // bouilloire penchée
  g("rotate(-24 7 7)",
    path("M2 5.4Q2 2.6 7 2.6Q12 2.6 12 5.4V9.4Q12 11 10.4 11H3.6Q2 11 2 9.4Z", C.grisLight),
    path("M12 6.8L15.6 5.4L16.2 6L12 8.8Z", C.grisLight, { w: 0.9 }),
    ellipse(7, 2.8, 3, 0.6, C.gris, { w: 0.8 }),
    rect(6.2, 1.2, 1.6, 1.2, 0.5, C.noir, { w: 0.7 }),
    path("M2.6 4.4Q7 -0.6 11.4 4.4", "none", { w: 1.2 }),
    line("M3.4 8.4H10.6", C.white, 0.8)),
  // filet de café
  line("M14.9 2.8Q15.3 9 15 15", O, 2.2),
  line("M14.9 2.8Q15.3 9 15 15", COFFEE, 1),
  // petit verre
  path("M10.4 14.2H19.8L18.8 21.4Q18.7 22.2 17.9 22.2H12.3Q11.5 22.2 11.4 21.4Z", GLASS),
  path("M10.8 16.6H19.4L18.7 21.2Q18.6 21.8 17.9 21.8H12.3Q11.6 21.8 11.5 21.2Z", COFFEE, false),
  path("M10.6 14.6H19.6L19.4 16.8H10.8Z", FOAM, false),
  path("M10.4 14.2H19.8L18.8 21.4Q18.7 22.2 17.9 22.2H12.3Q11.5 22.2 11.4 21.4Z", "none"),
  dots([[12.4, 15.4], [14, 15.8], [17, 15.4], [18.4, 15.8]], 0.35, C.cream),
  steam([19.6, 21.8], 12.2),
  dots([[4.6, 20.6], [6.4, 21.4], [3.6, 22], [7.4, 20.2]], 0.5, "#3A1F12"),
].join("");

const E = (slug, fr, en, tags, body) => ({ slug, fr, en, char: null, group: "nourriture", tags, tone: false, body });
export default [
  E("thieboudienne", "Thiéboudienne", "Thieboudienne", ["thiéboudienne", "thieboudienne", "ceebu jën", "sénégal", "senegal", "riz rouge", "red rice", "poisson", "fish"], thieboudienne),
  E("yassa-poulet", "Yassa poulet", "Chicken yassa", ["yassa", "poulet", "chicken", "sénégal", "senegal", "oignons", "onions", "citron", "lemon"], yassaPoulet),
  E("poulet-dg", "Poulet DG", "Poulet DG", ["poulet dg", "poulet directeur général", "cameroun", "cameroon", "plantain", "chicken", "carottes"], pouletDg),
  E("soupe-egusi", "Soupe egusi", "Egusi soup", ["egusi", "soupe", "soup", "nigeria", "graines de courge", "melon seeds", "igname pilée", "pounded yam"], soupeEgusi),
  E("eba", "Eba", "Eba", ["eba", "garri", "gari", "nigeria", "ghana", "manioc", "cassava", "gombo", "okra"], eba),
  E("kedjenou", "Kedjenou", "Kedjenou", ["kedjenou", "kédjénou", "côte d'ivoire", "ivory coast", "poulet", "chicken", "canari", "clay pot"], kedjenou),
  E("waakye", "Waakye", "Waakye", ["waakye", "ghana", "riz", "rice", "haricots", "beans", "shito", "œuf", "egg"], waakye),
  E("banku-tilapia", "Banku et tilapia", "Banku and tilapia", ["banku", "tilapia", "ghana", "poisson grillé", "grilled fish", "piment", "pepper", "maïs", "corn"], bankuTilapia),
  E("akara", "Akara", "Akara", ["akara", "accra", "koosé", "beignets de haricot", "bean fritters", "nigeria", "bénin", "benin"], akara),
  E("moin-moin", "Moin-moin", "Moin moin", ["moin-moin", "moi moi", "nigeria", "haricots", "beans", "pudding", "feuille", "leaf"], moinMoin),
  E("fataya", "Fataya", "Fataya", ["fataya", "sénégal", "senegal", "chausson", "pastry", "beignet farci", "fried", "sauce"], fataya),
  E("dibi", "Dibi", "Dibi", ["dibi", "dibiterie", "sénégal", "senegal", "agneau", "lamb", "grillade", "oignons", "moutarde"], dibi),
  E("to-sauce-gombo", "Tô sauce gombo", "Tô with okra sauce", ["tô", "to", "tuo zaafi", "mali", "burkina faso", "niger", "mil", "millet", "gombo", "okra"], toSauceGombo),
  E("riz-gras", "Riz gras", "Riz gras", ["riz gras", "fat rice", "burkina faso", "mali", "riz", "rice", "viande", "meat", "bassine"], rizGras),
  E("poisson-braise", "Poisson braisé", "Braised fish", ["poisson braisé", "braised fish", "grilled fish", "cameroun", "côte d'ivoire", "plantain", "alloco", "piment"], poissonBraise),
  E("koki", "Koki", "Koki", ["koki", "cameroun", "cameroon", "haricots", "beans", "huile de palme", "palm oil", "feuilles de bananier", "banana leaves"], koki),
  E("pondu", "Pondu", "Pondu", ["pondu", "saka-saka", "sakasaka", "rd congo", "congo", "feuilles de manioc", "cassava leaves", "marmite"], pondu),
  E("poulet-moambe", "Poulet moambé", "Moambe chicken", ["moambé", "moambe", "poulet", "chicken", "congo", "gabon", "noix de palme", "palm nut", "sauce graine"], pouletMoambe),
  E("chikwangue", "Chikwangue", "Chikwangue", ["chikwangue", "kwanga", "bâton de manioc", "cassava stick", "bobolo", "congo", "cameroun", "feuilles"], chikwangue),
  E("mbongo-tchobi", "Mbongo tchobi", "Mbongo tchobi", ["mbongo tchobi", "mbongo", "sauce noire", "black stew", "cameroun", "cameroon", "poisson", "fish"], mbongoTchobi),
  E("mais-grille", "Maïs grillé", "Grilled corn", ["maïs grillé", "maïs braisé", "grilled corn", "roasted corn", "épi", "corn cob", "street food", "braise"], maisGrille),
  E("boli", "Boli", "Boli", ["boli", "bole", "plantain rôti", "roasted plantain", "nigeria", "arachides", "groundnuts", "peanuts"], boli),
  E("degue", "Dégué", "Dégué", ["dégué", "degue", "thiakry", "mil", "millet", "lait caillé", "yogurt", "sahel", "dessert"], degue),
  E("cafe-touba", "Café Touba", "Touba coffee", ["café touba", "touba coffee", "sénégal", "senegal", "café", "coffee", "poivre de selim", "selim pepper", "djar"], cafeTouba),
];
