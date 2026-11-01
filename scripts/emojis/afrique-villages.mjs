// Emojis africains originaux, deuxième vague : villages, architectures et lieux (char: null, groupe « lieux »).
// Même style que afrique-choses.mjs : couleur à plat, contour brun foncé, petit sol de sable.
import { O, W, C, path, circle, ellipse, rect, line } from "./lib.mjs";

/** Trait épais « plein » : contour brun puis couleur par-dessus (poteaux, branches). */
const thick = (d, col, w = 1.5) => line(d, O, w + 2 * W) + line(d, col, w);
const ground = (fill = C.sable, ry = 1.4) => ellipse(12, 21.4, 9.8, ry, fill);

const BANCO = "#C98A50";      // terre crue claire (adobe sahélien)
const BANCO_DARK = "#9C6232";
const PISE = "#D08A52";       // pisé du sud marocain
const STONE = "#B9AC92";      // granite / pierre sèche
const STONE_DARK = "#857760";
const DUNG = "#A48A6C";       // bouse et terre des manyatta
const THATCH = C.ocreLight, THATCH_LINE = C.ocre;

/* ---------------- Afrique australe ---------------- */

const maisonNdebele = [
  ground(),
  path("M2.6 20.8V9.4H6.4V6.6H17.6V9.4H21.4V20.8Z", C.white),
  // frise du pignon
  path("M8 9.4L9.6 7.6L11.2 9.4L12.8 7.6L14.4 9.4L16 7.6", "none", { c: O, w: 1 }),
  path("M8 9.4H16", "none", { c: O, w: 1 }),
  // panneaux géométriques
  rect(3.8, 10.8, 5, 8.8, 0.3, C.bleu, { w: 1.2 }),
  path("M6.3 11.8L8 15.2L6.3 18.6L4.6 15.2Z", C.jaune, { w: 1 }),
  rect(15.2, 10.8, 5, 8.8, 0.3, C.rouge, { w: 1.2 }),
  path("M17.7 11.8L19.4 15.2L17.7 18.6L16 15.2Z", C.vertLight, { w: 1 }),
  path("M10 10.8H14L12 13.4Z", C.jaune, { w: 1 }),
  rect(10.2, 14.4, 3.6, 6.4, 0.4, C.marron),
  path("M2.6 20.8V9.4H6.4V6.6H17.6V9.4H21.4V20.8Z", "none", { w: 1.2 }),
].join("");

const hutteZouloue = [
  ground(),
  path("M2.6 21Q2.2 10.4 8 6.4Q12 3.8 16 6.4Q21.8 10.4 21.4 21Q12 22.6 2.6 21Z", THATCH),
  // cordes de liage (arceaux) et tressage
  line("M4 15.4Q12 12.6 20 15.4M5.6 10.4Q12 8 18.4 10.4M3 19.2Q12 17 21 19.2", THATCH_LINE, 0.8),
  line("M8 6.6Q6.4 13 6.8 21.4M12 4.6V22M16 6.6Q17.6 13 17.2 21.4", THATCH_LINE, 0.8),
  path("M8.8 21.6V19.4Q8.8 16.4 12 16.4Q15.2 16.4 15.2 19.4V21.6Q12 22 8.8 21.6Z", C.marron),
  path("M8.2 19.6Q8.4 15.6 12 15.6Q15.6 15.6 15.8 19.6", "none", { c: C.bois, w: 1.2 }),
  circle(12, 4.4, 1, C.ocre, { w: 0.9 }),
].join("");

const rondavelBasotho = [
  ground(),
  path("M5 12.4V20.6Q12 22.4 19 20.6V12.4Z", STONE),
  line("M5 15.2Q12 16.8 19 15.2M5 18Q12 19.6 19 18", STONE_DARK, 0.8),
  line("M8 13.4V15.8M13.4 14V16.2M17 13.4V15.4M6.6 16.4V18.6M11 16.8V19M15.6 16.6V18.8M9 19.2V21.2M14 19.4V21.4", STONE_DARK, 0.8),
  path("M10.4 21.6V17.6H13.6V21.6Q12 21.9 10.4 21.6Z", C.marron),
  // toit conique de chaume
  path("M12 4.8Q16 8.6 21.4 13.2Q12 16.2 2.6 13.2Q8 8.6 12 4.8Z", THATCH),
  line("M12 5L7 14.4M12 5L9.6 15M12 5V15.2M12 5L14.4 15M12 5L17 14.4", THATCH_LINE, 0.8),
  // faîtage en forme de mokorotlo
  path("M12 0.9L14.2 5.4Q12 6.2 9.8 5.4Z", C.ocre, { w: 1 }),
  path("M10.4 4.2Q12 4.8 13.6 4.2", "none", { c: O, w: 0.8 }),
  circle(12, 1.2, 0.7, C.ocre, { w: 0.8 }),
].join("");

const grandZimbabwe = [
  ground(STONE_DARK, 1.2),
  // tour conique
  path("M8.2 14L9.8 3.4Q12 1.6 14.2 3.4L15.8 14Z", STONE),
  line("M9.6 5.4H14.4M9.2 8H14.8", STONE_DARK, 0.7),
  // mur courbe de pierres sèches, frise de chevrons au sommet
  path("M1.4 21.4V13Q12 9.4 22.6 13V21.4Q12 22.8 1.4 21.4Z", STONE),
  line("M1.4 15.2Q12 11.6 22.6 15.2", O, 0.9),
  line("M2 14.2L3.4 12.8L4.8 13.9L6.2 12.2L7.6 13.4L9 11.8L10.4 13L11.8 11.4L13.2 13L14.6 11.6L16 13.2L17.4 12L18.8 13.6L20.2 12.6L21.6 14", O, 0.8),
  line("M1.4 17.2Q12 13.6 22.6 17.2M1.4 19.8Q12 16.4 22.6 19.8", STONE_DARK, 0.8),
  line("M5 15.6V17M10 14.8V16.4M15 14.8V16.4M19.6 15.6V17M3 17.8V19.4M7.6 16.8V18.6M12.4 16.4V18.2M17.2 16.8V18.6M21.2 17.8V19.6M5.6 19.6V21.4M10.4 19V20.8M15.2 19.2V21M19.4 19.8V21.4", STONE_DARK, 0.7),
].join("");

/* ---------------- Afrique de l'Ouest ---------------- */

const grenierDogon = [
  ground(),
  // socle de pierres
  ellipse(8.6, 20.2, 1.6, 1.1, C.gris), ellipse(12, 20.4, 1.6, 1.1, C.gris), ellipse(15.4, 20.2, 1.6, 1.1, C.gris),
  path("M7.6 19.4L8.2 10.4H15.8L16.4 19.4Z", BANCO),
  line("M10 11.6Q9.6 15 10 18.6M14 11.6Q14.4 15 14 18.6", BANCO_DARK, 0.7),
  rect(10.4, 12.6, 3.2, 3.8, 0.3, C.bois),
  line("M11.2 13.6V15.4M12.8 13.6V15.4M10.4 14.5H13.6", C.marron, 0.7),
  // chapeau de paille conique
  path("M12 1.8Q14.6 5.4 19.6 11.2Q12 13.4 4.4 11.2Q9.4 5.4 12 1.8Z", THATCH),
  line("M12 2.2L8 12M12 2.2L10.6 12.4M12 2.2L13.4 12.4M12 2.2L16 12", THATCH_LINE, 0.8),
  line("M5 11.6L4.4 12.8M7.4 12.2L7 13.4M16.6 12.2L17 13.4M19 11.6L19.6 12.8", THATCH_LINE, 0.9),
].join("");

const togunaDogon = [
  ground(),
  // piliers de bois sculptés
  ...[4.4, 9.4, 14.6, 19.6].map((x) => rect(x - 1.1, 13.8, 2.2, 7.4, 0.5, C.bois)),
  line("M3.3 16.4L5.5 17.4M3.3 18.6L5.5 17.6M8.3 16H10.5M9.4 17V19.8M13.5 16.4L15.7 17.4M13.5 18.6L15.7 17.6M18.5 16H20.7M19.6 17V19.8", C.marron, 0.7),
  // toit très épais en couches de tiges de mil
  path("M1.4 14.6Q1.2 9.4 3.4 8.6Q12 6.8 20.6 8.6Q22.8 9.4 22.6 14.6Z", C.sable),
  path("M2.2 8.8Q2.6 5 5 4.6Q12 3.4 19 4.6Q21.4 5 21.8 8.8Q12 7 2.2 8.8Z", THATCH),
  line("M1.6 11.4Q12 9.6 22.4 11.4", C.bois, 0.8),
  line("M3.8 7Q12 5.4 20.2 7", THATCH_LINE, 0.8),
  line("M3 14.6L2.4 15.8M5.8 14.6L5.4 15.8M8.4 14.6V15.8M12 14.6V15.8M15.6 14.6V15.8M18.2 14.6L18.6 15.8M21 14.6L21.6 15.8", C.bois, 0.9),
  line("M4 10V14M7 9.6V14M10 9.4V14M13 9.4V14M16 9.4V14M19 9.6V14", C.ocre, 0.6),
].join("");

const maisonsTiebele = [
  ground(),
  // case ronde à droite
  path("M14 9.6V20.4Q17.6 21.8 21.2 20.4V9.6Z", C.terre),
  ellipse(17.6, 9.6, 3.6, 1.1, C.terreDark),
  line("M14 13.4Q17.6 14.6 21.2 13.4", O, 0.8),
  line("M14.2 13.4L15.2 11.4L16.4 13.8L17.6 11.6L18.8 13.8L20 11.4L21 13.4", C.white, 0.8),
  line("M14.4 17L15.6 15.6L16.8 17.2M18.4 17.2L19.6 15.6L20.8 17", C.ink, 0.8),
  // maison rectangulaire peinte au premier plan
  path("M2.6 21V9.2Q2.6 8.2 3.6 8.2H13.4Q14.4 8.2 14.4 9.2V21Z", C.terre),
  rect(2.6, 8.2, 11.8, 3.2, 1, C.ink),
  path("M3.2 11.4L4.6 8.8L6 11.4L7.4 8.8L8.8 11.4L10.2 8.8L11.6 11.4L13 8.8L13.8 10.4V11.4Z", C.white, { w: 0.7 }),
  path("M2.6 15.6H14.4V17.6H2.6Z", C.ink, { w: 0.8 }),
  line("M3.6 16.6H5M6.4 16.6H7.8M9.2 16.6H10.6M12 16.6H13.4", C.white, 0.9),
  path("M6.6 21.2V15.2Q6.6 13.4 8.5 13.4Q10.4 13.4 10.4 15.2V21.2Z", C.white, { w: 1 }),
  path("M7.6 21.2V15.6Q7.6 14.4 8.5 14.4Q9.4 14.4 9.4 15.6V21.2Z", C.marron, { w: 0.8 }),
].join("");

const mosqueeDjenne = [
  ground(),
  // œufs d'autruche au sommet des tours
  ellipse(6, 4.6, 0.7, 0.85, C.white, { w: 0.8 }),
  ellipse(12, 1.6, 0.75, 0.9, C.white, { w: 0.8 }),
  ellipse(18, 4.6, 0.7, 0.85, C.white, { w: 0.8 }),
  path("M1.6 21.2V12.4H3.6L4.6 6.4Q6 4.8 7.4 6.4L8.4 12H9.2L10.4 3.4Q12 1.8 13.6 3.4L14.8 12H15.6L16.6 6.4Q18 4.8 19.4 6.4L20.4 12.4H22.4V21.2Z", BANCO),
  // pilastres
  line("M9.2 12V21M14.8 12V21M4.4 12.6V21M19.6 12.6V21", BANCO_DARK, 0.7),
  // torons : poutres de rônier qui dépassent
  line("M10.6 6.4H11.4M12.6 6.4H13.4M10.4 9.2H11.2M12.8 9.2H13.6M5.2 8.6H6M6.8 8.6H7.6M5 11H5.8M7 11H7.8M16.4 8.6H17.2M18 8.6H18.8M16.2 11H17M18.2 11H19M2.4 14.8H3.2M6 14.8H6.8M17.2 14.8H18M20.8 14.8H21.6M10.6 14H11.4M12.6 14H13.4", C.ink, 1),
  path("M10.4 21.2V18.4Q10.4 16.4 12 16.4Q13.6 16.4 13.6 18.4V21.2Z", C.marron),
  line("M2.4 18H3.2M20.8 18H21.6M6 18H6.8M17.2 18H18", C.ink, 1),
].join("");

const tataSomba = [
  ground(),
  // mur bas et étage-terrasse
  path("M5.2 20.8V12.4H18.8V20.8Z", BANCO),
  path("M8.4 12.4V9.4H15.6V12.4Z", BANCO),
  line("M8 9.4H16", O, 1.2),
  line("M5.2 15.4H18.8M5.2 18.2H18.8", BANCO_DARK, 0.7),
  path("M10.6 20.8V17.2Q10.6 15.6 12 15.6Q13.4 15.6 13.4 17.2V20.8Z", C.marron),
  // tourelles-greniers aux chapeaux de paille
  ...[[4.6, 0], [19.4, 1]].map(([x]) =>
    path(`M${x - 2.4} 21V9.6H${x + 2.4}V21Q${x} 21.8 ${x - 2.4} 21Z`, BANCO)
    + line(`M${x - 2.4} 13.4Q${x} 14.2 ${x + 2.4} 13.4M${x - 2.4} 17.2Q${x} 18 ${x + 2.4} 17.2`, BANCO_DARK, 0.7)
    + path(`M${x} 3.6Q${x + 1.6} 6.4 ${x + 3.4} 9.8Q${x} 11 ${x - 3.4} 9.8Q${x - 1.6} 6.4 ${x} 3.6Z`, THATCH)
    + line(`M${x} 4L${x - 1.6} 10.4M${x} 4V10.6M${x} 4L${x + 1.6} 10.4`, THATCH_LINE, 0.8)),
  // petite tourelle de l'étage
  path("M10.4 9.6V6.8H13.6V9.6Z", BANCO, { w: 1 }),
  path("M12 2.8Q13.2 4.6 14.6 6.9Q12 7.8 9.4 6.9Q10.8 4.6 12 2.8Z", THATCH, { w: 1 }),
].join("");

const chefferieBamileke = [
  ground(),
  path("M4.6 20.8V12.6H19.4V20.8Z", C.bois),
  line("M6 13V20.6M7.4 13V20.6M16.6 13V20.6M18 13V20.6", C.marron, 0.6),
  // poteaux sculptés encadrant la porte
  rect(8.4, 12.6, 1.8, 8.4, 0.3, C.marron, { w: 0.9 }),
  rect(13.8, 12.6, 1.8, 8.4, 0.3, C.marron, { w: 0.9 }),
  line("M8.6 14.2L9.3 15L10 14.2M8.6 16.4L9.3 17.2L10 16.4M8.6 18.6L9.3 19.4L10 18.6M14 14.2L14.7 15L15.4 14.2M14 16.4L14.7 17.2L15.4 16.4M14 18.6L14.7 19.4L15.4 18.6", C.ocreLight, 0.7),
  path("M10.2 21V15H13.8V21Z", C.ink, { w: 0.9 }),
  circle(12, 17.2, 0.9, C.rouge, { w: 0.6 }),
  // très haut toit conique de chaume
  path("M12 1Q14.8 6.4 20.6 12.8Q12 14.4 3.4 12.8Q9.2 6.4 12 1Z", THATCH),
  line("M12 1.4L7.8 13.4M12 1.4L10.6 13.8M12 1.4L13.4 13.8M12 1.4L16.2 13.4", THATCH_LINE, 0.8),
  line("M7.4 7.6Q12 8.8 16.6 7.6", THATCH_LINE, 0.8),
  line("M4.2 13L3.6 14.2M6.8 13.6L6.4 14.8M17.2 13.6L17.6 14.8M19.8 13L20.4 14.2", THATCH_LINE, 0.9),
].join("");

const ganvie = [
  // eau
  rect(1.4, 17.4, 21.2, 4.8, 2, C.eau),
  line("M3 19.4Q4.4 18.6 5.8 19.4M9.4 20.8Q10.8 20 12.2 20.8M16.8 21Q18.2 20.2 19.6 21", C.white, 0.8),
  // pilotis
  thick("M4 13.6V19M10.4 13.6V19M14.4 14.8V19.4M20 14.8V19.4", C.bois, 0.9),
  // grande case
  rect(3, 10, 8.6, 4.2, 0.3, C.bois),
  line("M5 10.4V13.8M7.2 10.4V13.8M9.4 10.4V13.8", C.marron, 0.6),
  path("M1.8 10.6L5 5.6H9.6L12.8 10.6Z", THATCH),
  line("M4 7.6H10.6", THATCH_LINE, 0.8),
  // petite case
  rect(13.4, 11.8, 7.6, 3.4, 0.3, C.bois),
  line("M16.4 12.2V14.8M18.6 12.2V14.8", C.marron, 0.6),
  path("M12.4 12.4L15.2 8.2H19.2L22 12.4Z", THATCH),
  rect(6, 11, 1.8, 3.2, 0.2, C.marron, { w: 0.8 }),
  // pirogue
  path("M6.2 19.8H14.6Q13.8 21.6 11.6 21.6H9.2Q7 21.6 6.2 19.8Z", C.bois, { w: 1 }),
  line("M13 16L11.6 22", O, 0.9),
].join("");

/* ---------------- Afrique de l'Est ---------------- */

const manyatta = [
  ground(C.sable),
  // maisons basses et oblongues en terre et bouse, toit arrondi presque plat
  path("M2 19.4V13.6Q2 10.6 5.4 10.4H9.6Q13 10.6 13 13.6V19.4Z", DUNG),
  line("M3.2 12.8Q7.4 11.6 11.8 12.8", "#7F6850", 0.7),
  path("M5.6 19.4V16.4Q5.6 15.2 6.8 15.2Q8 15.2 8 16.4V19.4Z", C.marron, { w: 0.9 }),
  path("M12.2 19.4V14.8Q12.2 12.2 15.2 12H18.8Q22 12.2 22 14.8V19.4Z", DUNG),
  line("M13.4 14Q17 13 20.8 14", "#7F6850", 0.7),
  path("M16.4 19.4V17Q16.4 16 17.4 16Q18.4 16 18.4 17V19.4Z", C.marron, { w: 0.9 }),
  // clôture d'épineux (enkang)
  thick("M1.8 20.4Q4 18.4 6.4 20Q8.6 18.2 11 19.8Q13.4 18.2 15.8 19.8Q18.2 18.2 20.4 20Q21.6 19.4 22.2 20", C.bois, 1.2),
  line("M3.2 19.2L2.6 18.2M4.6 19L5 17.8M7.6 19.2L7.2 18M9.6 18.9L10 17.8M12.2 19.1L11.8 18M14.4 18.9L14.8 17.8M17 19.1L16.6 18M19 18.9L19.4 17.8M21.2 19.4L21.6 18.4", O, 0.8),
].join("");

const porteSwahilie = [
  rect(2.6, 21, 18.8, 1.6, 0.4, C.grisLight),
  // encadrement sculpté
  path("M3.8 21V8.4Q3.8 2 12 2Q20.2 2 20.2 8.4V21Z", C.marron),
  line("M5 20.4V8.6Q5 3.2 12 3.2Q19 3.2 19 8.6V20.4", C.ocre, 0.6),
  // imposte en arc
  path("M6.2 9.2Q6.2 4.4 12 4.4Q17.8 4.4 17.8 9.2Z", C.bois),
  line("M12 4.6V9M8.4 5.8L10.4 9M15.6 5.8L13.6 9", C.marron, 0.7),
  // battants
  rect(6.2, 9.2, 5.8, 11.8, 0.2, C.bois),
  rect(12, 9.2, 5.8, 11.8, 0.2, C.bois),
  rect(11.2, 9.2, 1.6, 11.8, 0.3, C.marron, { w: 0.9 }),
  // clous de laiton
  ...[11.6, 15, 18.4].flatMap((y) => [7.7, 10.3, 13.7, 16.3].map((x) => circle(x, y, 0.75, C.ocreLight, { w: 0.6 }))),
  circle(12, 15, 0.8, C.ocreLight, { w: 0.6 }),
].join("");

const egliseLalibela = [
  // roche environnante
  rect(1.5, 1.5, 21, 21, 4, C.terre),
  // fosse creusée
  rect(3.8, 3.8, 16.4, 16.4, 1.4, C.terreDark),
  path("M4.4 4.4H19.6L18.4 5.8H5.8V18.4L4.4 19.6Z", C.marron, false),
  // croix vue d'en haut (toit)
  path("M9.4 5.4H14.6V9.4H18.6V14.6H14.6V18.6H9.4V14.6H5.4V9.4H9.4Z", "#D9925E"),
  path("M10.4 7H13.6V10.4H17V13.6H13.6V17H10.4V13.6H7V10.4H10.4Z", "none", { c: C.terreDark, w: 0.8 }),
  path("M11.2 8.8H12.8V11.2H15.2V12.8H12.8V15.2H11.2V12.8H8.8V11.2H11.2Z", "none", { c: C.terreDark, w: 0.8 }),
  rect(1.5, 1.5, 21, 21, 4, "none"),
].join("");

/* ---------------- Afrique du Nord et Sahara ---------------- */

const ksar = [
  ground(C.sable),
  // tour gauche
  path("M2.4 21V7.2H3.6V5.6H4.8V7.2H6.6V5.6H7.8V7.2H9V21Z", PISE),
  // mur central
  path("M8.6 21V11.6H15.4V21Z", PISE),
  // tour droite, plus haute
  path("M15 21V4.4H16.2V2.8H17.4V4.4H19.2V2.8H20.4V4.4H21.6V21Z", PISE),
  // décors en relief
  line("M3 9.4L4.2 8.4L5.4 9.4L6.6 8.4L7.8 9.4L8.6 8.8M15.6 6.6L16.8 5.6L18 6.6L19.2 5.6L20.4 6.6L21 6.2", C.terreDark, 0.8),
  // petites fenêtres
  rect(4.8, 11.4, 1.4, 1.8, 0.2, C.ink, { w: 0.6 }),
  rect(4.8, 15.4, 1.4, 1.8, 0.2, C.ink, { w: 0.6 }),
  rect(17.6, 9, 1.4, 1.8, 0.2, C.ink, { w: 0.6 }),
  rect(17.6, 13, 1.4, 1.8, 0.2, C.ink, { w: 0.6 }),
  path("M10.6 21V16.6Q10.6 15 12 15Q13.4 15 13.4 16.6V21Z", C.marron),
  line("M9.2 13H10.4M13.6 13H14.8", C.terreDark, 0.8),
].join("");

const maisonNubienne = [
  ground(),
  // coupole et voûte sur le toit
  path("M12.6 10.4Q12.6 4.8 17 4.8Q21.4 4.8 21.4 10.4Z", C.sable),
  path("M3 10.4V8.6Q3 6.4 6.6 6.4Q10.2 6.4 10.2 8.6V10.4Z", C.sable),
  // façade bleue
  rect(2.4, 10.4, 19.2, 10.6, 0.4, C.ciel),
  // frise de triangles
  path("M2.4 10.4H21.6V12.4H2.4Z", C.jaune, { w: 0.9 }),
  line("M2.8 12.2L3.8 10.6L4.8 12.2L5.8 10.6L6.8 12.2L7.8 10.6L8.8 12.2L9.8 10.6L10.8 12.2L11.8 10.6L12.8 12.2L13.8 10.6L14.8 12.2L15.8 10.6L16.8 12.2L17.8 10.6L18.8 12.2L19.8 10.6L20.8 12.2", C.indigo, 0.7),
  // porte en arc, encadrement peint
  path("M8 21V16.6Q8 13.2 12 13.2Q16 13.2 16 16.6V21Z", C.jaune),
  path("M9.8 21V17Q9.8 15 12 15Q14.2 15 14.2 17V21Z", C.indigoLight),
  line("M8.6 15.2L9.6 16M15.4 15.2L14.4 16M12 13.6V14.6", C.rouge, 0.8),
  // fenêtre en moucharabieh
  rect(17.8, 14.4, 2, 2.4, 0.3, C.white, { w: 0.8 }),
  line("M18.8 14.6V16.6M18 15.6H19.6", O, 0.6),
  rect(4.2, 14.4, 2, 2.4, 0.3, C.white, { w: 0.8 }),
  line("M5.2 14.6V16.6M4.4 15.6H6", O, 0.6),
].join("");

const tenteTouaregue = [
  // dune en arrière-plan
  path("M4 11.6Q10.4 5 16.4 6.6Q20.6 7.8 22.6 12.4Z", C.ocreLight),
  line("M16.4 6.6Q18.6 8.2 18.4 10.2", C.ocre, 0.8),
  ground(C.sable),
  // poteaux de bois sculptés
  thick("M4.4 13.4V21M19.6 13.4V21M12 8.4V20.4", C.bois, 1),
  // ombre sous la tente
  path("M5 13.8H19V20.6Q12 21.6 5 20.6Z", C.marron, false),
  // nattes de palmier tendues sur un côté
  path("M14.6 14V20.8H19.2V14Z", C.sable, { w: 0.9 }),
  line("M15.8 14.4V20.6M17 14.4V20.6M18.2 14.4V20.6", C.ocre, 0.6),
  // toit de peaux cousues sur arceaux
  path("M2 14.4Q3 9.4 12 8.8Q21 9.4 22 14.4Q12 13.2 2 14.4Z", C.terre),
  line("M7.4 10Q7 12 7.2 13.8M12 9V13.4M16.6 10Q17 12 16.8 13.8", C.terreDark, 0.8),
  line("M3 14.6L2.8 15.6M5.6 14.2V15.2M8.4 14V15M11.2 13.8V14.8M14 13.8V14.8M16.8 14V15M19.6 14.2V15.2M21.4 14.6L21.6 15.6", C.ink, 0.7),
  circle(12, 8.2, 0.7, C.bois, { w: 0.8 }),
].join("");

const pyr = (x, top, half, base, fill, shade) =>
  path(`M${x - half} ${base}L${x} ${top}L${x + half} ${base}Z`, fill)
  + path(`M${x} ${top + 0.6}L${x + half - 0.6} ${base - 0.4}H${x + 0.2}Z`, shade, false)
  + path(`M${x - half} ${base}L${x} ${top}L${x + half} ${base}Z`, "none");

const pyramidesGizeh = [
  circle(18.4, 4.6, 2.6, C.jaune),
  pyr(9, 5, 7.6, 20.2, C.ocreLight, C.ocre),
  line("M9 5.6L9.4 20", O, 0.6),
  pyr(16.6, 9.2, 6, 20.2, C.ocreLight, C.ocre),
  path("M16.6 9.2L15.6 10.8Q16.6 11.4 17.6 10.8Z", C.cream, { w: 0.7 }),
  pyr(20.8, 15, 2.6, 20.2, C.ocreLight, C.ocre),
  path("M1.4 20.2Q12 18.8 22.6 20.2V21.4Q12 22.8 1.4 21.4Z", C.sable),
].join("");

const MEROE = "#B66A3E", MEROE_SHADE = "#8E4A28";
const meroe = (x, top, half, base) =>
  pyr(x, top, half, base, MEROE, MEROE_SHADE)
  // petite chapelle à pylône devant la pyramide
  + path(`M${x - 1.6} ${base}L${x - 1.3} ${base - 2.6}H${x + 1.3}L${x + 1.6} ${base}Z`, C.sable, { w: 0.9 })
  + rect(x - 0.4, base - 1.6, 0.8, 1.6, 0.2, C.marron, { w: 0.6 });

const pyramidesMeroe = [
  circle(4.4, 4.4, 1.8, C.ocreLight, { w: 0.9 }),
  meroe(12.4, 2.6, 3.2, 18.6),
  meroe(5.6, 8.4, 2.6, 19.4),
  meroe(19, 7, 2.8, 19.4),
  path("M1.4 19.4Q7 17.8 12 18.8Q17 19.8 22.6 18.6V21.2Q12 22.8 1.4 21.2Z", C.sable),
  line("M3.6 20.4Q6 19.8 8.4 20.4M15 20.6Q17.6 19.8 20.4 20.4", C.ocre, 0.7),
].join("");

const caseObus = [
  ground(),
  path("M5.4 21.2Q4.8 9.6 12 1.6Q19.2 9.6 18.6 21.2Q12 22.4 5.4 21.2Z", BANCO),
  // reliefs en V renversés (servent d'appuis pour grimper)
  ...[[12, 5.4], [12, 9], [9.2, 9.8], [14.8, 9.8], [12, 12.6], [8.4, 13.6], [15.6, 13.6], [7.8, 17.4], [16.2, 17.4]].map(([x, y]) =>
    line(`M${x - 1} ${y + 1.2}L${x} ${y}L${x + 1} ${y + 1.2}`, BANCO_DARK, 1)),
  // porte en trou de serrure
  path("M10.4 21.6L11 17.6Q10.2 16.6 10.6 15.6Q11.2 14.6 12 14.6Q12.8 14.6 13.4 15.6Q13.8 16.6 13 17.6L13.6 21.6Q12 21.9 10.4 21.6Z", C.marron),
  circle(12, 2.4, 0.6, C.marron, { w: 0.7 }),
].join("");

const E = (slug, fr, en, tags, body) => ({ slug, fr, en, char: null, group: "lieux", tags, tone: false, body });

export default [
  E("maison-ndebele", "Maison ndébélé", "Ndebele house", ["ndébélé", "ndebele", "afrique du sud", "south africa", "maison peinte", "painted house", "peinture murale", "mural"], maisonNdebele),
  E("grenier-dogon", "Grenier dogon", "Dogon granary", ["dogon", "grenier", "granary", "mali", "bandiagara", "banco", "mud", "paille", "thatch"], grenierDogon),
  E("toguna-dogon", "Toguna dogon", "Dogon toguna", ["toguna", "dogon", "mali", "bandiagara", "case à palabres", "palaver hut", "mil", "millet"], togunaDogon),
  E("case-obus-musgum", "Case obus musgum", "Musgum shell hut", ["musgum", "mousgoum", "case obus", "shell hut", "cameroun", "cameroon", "tchad", "chad", "terre", "mud"], caseObus),
  E("maisons-tiebele", "Maisons peintes de Tiébélé", "Tiébélé painted houses", ["tiébélé", "tiebele", "kassena", "burkina faso", "maisons peintes", "painted houses", "sukhala"], maisonsTiebele),
  E("mosquee-djenne", "Grande mosquée de Djenné", "Great Mosque of Djenné", ["djenné", "djenne", "mosquée", "mosque", "mali", "banco", "adobe", "unesco", "soudano-sahélien"], mosqueeDjenne),
  E("eglise-lalibela", "Église Saint-Georges de Lalibela", "Church of St George, Lalibela", ["lalibela", "bete giyorgis", "saint-georges", "st george", "éthiopie", "ethiopia", "église", "church", "rupestre", "rock-hewn"], egliseLalibela),
  E("hutte-zouloue", "Hutte zouloue", "Zulu beehive hut", ["zoulou", "zulu", "iqukwane", "indlu", "afrique du sud", "south africa", "hutte", "beehive hut"], hutteZouloue),
  E("manyatta-massai", "Manyatta massaï", "Maasai manyatta", ["massaï", "maasai", "manyatta", "enkang", "kenya", "tanzanie", "tanzania", "village", "boma"], manyatta),
  E("chefferie-bamileke", "Chefferie bamiléké", "Bamileke chiefdom house", ["bamiléké", "bamileke", "chefferie", "chiefdom", "cameroun", "cameroon", "bandjoun", "grassfields", "toit conique"], chefferieBamileke),
  E("porte-swahilie", "Porte swahilie", "Swahili carved door", ["swahili", "porte", "door", "zanzibar", "lamu", "stone town", "sculptée", "carved", "tanzanie", "kenya"], porteSwahilie),
  E("ksar-amazigh", "Ksar amazigh", "Amazigh ksar", ["ksar", "kasbah", "amazigh", "berbère", "berber", "aït-ben-haddou", "maroc", "morocco", "pisé"], ksar),
  E("grand-zimbabwe", "Grand Zimbabwe", "Great Zimbabwe", ["grand zimbabwe", "great zimbabwe", "zimbabwe", "shona", "pierre sèche", "dry stone", "tour conique", "conical tower", "unesco"], grandZimbabwe),
  E("tata-somba", "Tata somba", "Tata somba", ["tata somba", "takienta", "batammariba", "somba", "bénin", "benin", "togo", "koutammakou", "fortified house"], tataSomba),
  E("maison-nubienne", "Maison nubienne", "Nubian house", ["nubie", "nubian", "égypte", "egypt", "soudan", "sudan", "assouan", "aswan", "coupole", "dome"], maisonNubienne),
  E("ganvie-pilotis", "Village de Ganvié sur pilotis", "Ganvié stilt village", ["ganvié", "ganvie", "pilotis", "stilts", "bénin", "benin", "lac nokoué", "tofinu", "village lacustre", "lake village"], ganvie),
  E("pyramides-meroe", "Pyramides de Méroé", "Meroë pyramids", ["méroé", "meroe", "pyramides", "pyramids", "soudan", "sudan", "koush", "kush", "nubie", "désert"], pyramidesMeroe),
  E("pyramides-gizeh", "Pyramides de Gizeh", "Pyramids of Giza", ["gizeh", "giza", "pyramides", "pyramids", "égypte", "egypt", "kheops", "khufu", "désert", "desert"], pyramidesGizeh),
  E("tente-touaregue", "Tente touarègue", "Tuareg tent", ["touareg", "tuareg", "kel tamasheq", "tente", "tent", "sahara", "nomade", "nomad", "niger", "mali"], tenteTouaregue),
  E("rondavel-basotho", "Rondavel basotho", "Basotho rondavel", ["basotho", "rondavel", "mokorotlo", "lesotho", "sotho", "pierre", "stone", "chaume", "thatch"], rondavelBasotho),
];
