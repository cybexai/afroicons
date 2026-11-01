// Emojis africains originaux : nature, culture et objets, nourriture (sans équivalent Unicode, char: null).
import { O, W, C, path, circle, ellipse, rect, line, g, bowl, plate, sparkle } from "./lib.mjs";

/** Trait épais « plein » : contour brun puis couleur par-dessus (branches, queues, cordes, symboles). */
const thick = (d, col, w = 1.5) => line(d, O, w + 2 * W) + line(d, col, w);
const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const eye = (x, y, r = 0.55) => circle(x, y, r, O, false);

const SKY = "#FFF1D6";
const DEEP_RED = "#A3182E";
const LEAF_DARK = "#2F5B2E";
const RICE = "#E2622B";

/* ---------------- nature ---------------- */

const baobab = [
  ellipse(12, 21.6, 9.5, 1.3, C.sable),
  thick("M10.4 10.6L7.6 6.6L5.4 6.2M7.6 6.6L7.2 4.4", C.bois, 1.3),
  thick("M12 10L11.8 4.6", C.bois, 1.3),
  thick("M13.6 10.6L16.2 6.4L18.8 6.6M16.2 6.4L16.6 4.2", C.bois, 1.3),
  ellipse(5.2, 5.6, 2.6, 1.6, C.vertLight),
  ellipse(8.4, 3.8, 2.4, 1.5, C.vert),
  ellipse(12, 3.6, 2.4, 1.6, C.vertLight),
  ellipse(15.8, 3.6, 2.4, 1.5, C.vert),
  ellipse(19.2, 5.8, 2.6, 1.6, C.vertLight),
  path("M7 21.6C7.4 17 8.4 12.6 9.6 10H14.4C15.6 12.6 16.6 17 17 21.6Q12 22.6 7 21.6Z", C.bois),
  line("M10.6 13Q10 17 10.4 20.8M13.6 12.8Q14.4 16.6 14 20.6M12 15V21", C.marron, 0.7),
].join("");

const kilimandjaro = [
  circle(18.6, 5, 2.4, C.ocreLight),
  path("M1.5 19.5L8.4 8.6Q12 6.8 15.6 8.6L22.5 19.5Z", C.bois),
  path("M8.4 8.6Q12 6.8 15.6 8.6L17.3 11.3L15.6 10.6L14 11.9L12.4 10.6L10.8 11.9L9.2 10.7L6.8 11.2Z", C.white),
  line("M12.4 13L11.4 17.5M16.5 14.5L18 17.6M7 15L6 17.4", C.marron, 0.7),
  path("M1.5 19.5Q12 16.6 22.5 19.5V21.2Q22.5 22 21.7 22H2.3Q1.5 22 1.5 21.2Z", C.vertLight),
  path("M4.5 21V18.6M4.5 19.6L3.4 18.6M4.5 19.6L5.6 18.6", "none", { c: C.vert, w: 0.8 }),
  path("M19 21V18.4M19 19.5L17.9 18.5M19 19.5L20.1 18.5", "none", { c: C.vert, w: 0.8 }),
].join("");

const OKAPI = "#4E2A20", OKAPI_FACE = "#E9D6B8";
const okLeg = (x, top) => rect(x, top, 1.8, 21.4 - top, 0.8, C.white)
  + line(`M${x} ${top + 1.4}H${x + 1.8}M${x} ${top + 2.8}H${x + 1.8}M${x} ${top + 4.2}H${x + 1.8}`, OKAPI, 0.9)
  + rect(x, 20.2, 1.8, 1.4, 0.6, C.noir, { w: 0.8 });
const okapi = [
  okLeg(6.2, 13.6), okLeg(8.6, 14), okLeg(15.2, 14), okLeg(17.6, 13.8),
  line("M20.4 11.4Q21.8 12.6 21.4 15", O, 0.9),
  // corps velours sombre, croupe rayée de blanc à l'horizontale
  path("M5.8 9.8Q11.6 8.4 17.6 9.6Q20.8 10.4 20.6 13.2Q20.2 15.8 17.2 15.8H8Q5.4 15.6 5.4 12.6Z", OKAPI),
  line("M16.4 11.4H19.4M16 13H20M16.4 14.6H19.4", C.white, 0.9),
  // cou et tête de girafe
  path("M5.4 12.2L4 6.4L7.2 5.4L9 10Z", OKAPI),
  path("M1.6 7.8Q2.2 4.8 6.2 4.4Q7.6 4.6 7.8 6.2Q6 8.4 3.4 9.4Q1.4 9.6 1.6 7.8Z", OKAPI),
  path("M1.6 7.8Q1.4 9.6 3.4 9.4Q5.2 8.8 6.2 7.6Q4.8 6.6 3 6.4Q1.8 6.8 1.6 7.8Z", OKAPI_FACE, { w: 0.8 }),
  // ossicônes et grandes oreilles
  thick("M4.8 4.6L4.6 2.8M6 4.4L6.2 2.6", OKAPI, 0.7),
  g("rotate(35 8.2 4.2)", ellipse(8.2, 4.2, 1, 2.1, OKAPI), ellipse(8.2, 4.4, 0.45, 1.3, OKAPI_FACE, false)),
  eye(4.6, 5.9),
].join("");

const PANGO = "#A0663A", PANGO_LIGHT = "#C68A52", PANGO_SKIN = "#E3C9A6";
const plateS = (x, y, s, fill) => path(`M${x - 1.5 * s} ${y - 0.9 * s}Q${x} ${y - 1.6 * s} ${x + 1.5 * s} ${y - 0.9 * s}Q${x + 1.4 * s} ${y + 0.9 * s} ${x} ${y + 1.7 * s}Q${x - 1.4 * s} ${y + 0.9 * s} ${x - 1.5 * s} ${y - 0.9 * s}Z`, fill, { w: 0.75 });
const pangolin = [
  // longue queue effilée qui retombe au sol
  path("M14.4 9.8Q19.8 10.4 21.6 15.6Q22.6 18.6 22.6 21.4Q20.8 19.2 19 17.4Q17 15.6 14 15.8Z", PANGO),
  // petite tête pointue et pattes
  path("M6.2 11.8Q3.6 13.2 1.4 16.2Q3.8 17.4 6.8 16.2Z", PANGO_SKIN),
  rect(6.8, 15.6, 2, 4.4, 0.8, PANGO_SKIN), rect(12.2, 15.8, 2, 4.2, 0.8, PANGO_SKIN),
  line("M6.8 20.2L6.2 21M8.8 20.2L9.4 21M12.2 20.2L11.6 21M14.2 20.2L14.8 21", O, 0.8),
  // corps allongé
  path("M5 15Q5 8.8 10.4 7.6Q15 7 16.8 10.4Q18 13.2 16.8 16.4Q12.6 17.6 8 17.2Q5 16.8 5 15Z", PANGO),
  // écailles imbriquées : rangées du bas d'abord, la rangée du dessus recouvre la suivante
  ...[[7.2, 15.2], [10.2, 15.6], [13.2, 15.6], [15.8, 15]].map(([x, y]) => plateS(x, y, 0.85, PANGO)),
  ...[[6.6, 12.6], [9.6, 12.8], [12.6, 12.8], [15.4, 12.4]].map(([x, y]) => plateS(x, y, 0.95, PANGO_LIGHT)),
  ...[[8.6, 10], [11.6, 9.8], [14.4, 10]].map(([x, y]) => plateS(x, y, 0.95, PANGO)),
  ...[[17.6, 12], [19.4, 14.2], [20.6, 16.8], [21.6, 19.2]].map(([x, y], i) => plateS(x, y, 0.8 - i * 0.12, i % 2 ? PANGO : PANGO_LIGHT)),
  eye(4.2, 14.4),
].join("");

const cameleon = [
  thick("M1.5 18.6Q8 17.4 16 18.6", C.bois, 1.4),
  thick("M16.4 12.6Q20.8 12.6 20.8 16.4Q20.8 19.8 18 19.8Q15.8 19.8 15.8 17.8Q15.8 16.2 17.4 16.2Q18.6 16.2 18.6 17.4", C.vertLight, 1.6),
  thick("M8 14.6L7 17.8M13.4 14.8L14.4 18", C.vertLight, 1.2),
  path("M5.4 11.6Q6.2 6.6 11 6.4Q15.8 6.4 17 10.6Q17.4 14.6 13.4 15.4H8.4Q5.4 15 5.4 11.6Z", C.vertLight),
  line("M9 7.4L10.2 14.8M12.4 6.8L13.2 15.2", C.ocreLight, 1),
  line("M7.6 8.6Q8.4 7 9.8 6.6", C.vert, 0.8),
  path("M6.6 7.6L1.8 10.6Q2.2 13 6.2 13.4Z", C.vertLight),
  line("M2.4 11.8H4.6", O, 0.8),
  circle(5.4, 9.9, 1.6, C.ocreLight),
  eye(5.4, 9.9, 0.6),
].join("");

const calao = [
  thick("M7.4 20.2H22.4", C.bois, 1.4),
  // queue blanche barrée de noir
  path("M15.6 17.2Q17.6 20.8 20.6 22.8L22.6 21.2Q20.8 18.6 18.8 15.6Z", C.white),
  line("M18.4 20.4L20.6 18.6", O, 1.2),
  path("M12.6 10Q10.4 15.4 13 19.2Q15.8 21.2 19.2 19.6Q20.6 14.6 17.8 9.8Z", C.noir),
  // bande alaire blanche
  path("M12.2 14.2Q15.6 13 19.2 14.4L19.2 16.4Q15.6 15 12.4 16.2Z", C.white, { w: 0.9 }),
  circle(15.6, 7.8, 3.4, C.noir),
  // grand bec courbe et énorme casque par-dessus
  path("M12.8 7.8Q7.2 7.6 1.8 12.8Q7.6 10.6 13 10.6Z", C.ocreLight),
  path("M13.4 7.6Q13 2.6 8.2 2.4Q4.6 2.4 3.6 5.6Q3.6 7.4 5.4 7.8Q9.2 6.8 13 8.6Z", C.orange),
  line("M5.6 4.4Q8.8 3.4 11.6 5.2", C.terre, 0.9),
  circle(15.4, 7.6, 1.15, C.rouge, { w: 0.7 }),
  eye(15.4, 7.6, 0.5),
].join("");

const GOR = "#2E2A28", GOR_FACE = "#9A928A", GOR_CHEST = "#6E6760", GOR_NOSE = "#5A524C";
const gorille = [
  // épaules et poitrine plus claire
  path("M1.6 23Q1.6 16 7.6 15.4H16.4Q22.4 16 22.4 23Z", GOR),
  path("M8.2 23Q8.2 19 12 18.6Q15.8 19 15.8 23Z", GOR_CHEST, { w: 0.9 }),
  // tête à crête sagittale
  path("M12 1.6Q15.6 1.6 17.8 5Q20.4 7.8 19.6 11.6Q19.4 18.4 12 19Q4.6 18.4 4.4 11.6Q3.6 7.8 6.2 5Q8.4 1.6 12 1.6Z", GOR),
  ellipse(4.2, 11.4, 1.1, 1.5, GOR_FACE, { w: 0.9 }), ellipse(19.8, 11.4, 1.1, 1.5, GOR_FACE, { w: 0.9 }),
  // visage gris clair
  path("M12 7.4Q17.2 6.2 17.6 10.2Q18 13 16.4 15.4Q15.2 18.2 12 18.2Q8.8 18.2 7.6 15.4Q6 13 6.4 10.2Q6.8 6.2 12 7.4Z", GOR_FACE),
  // arcade sourcilière marquée
  path("M5.8 10.2Q8.4 6.8 12 8.8Q15.6 6.8 18.2 10.2Q15.2 9.8 12 11.2Q8.8 9.8 5.8 10.2Z", GOR),
  circle(9.4, 11.8, 0.95, C.white, { w: 0.6 }), circle(14.6, 11.8, 0.95, C.white, { w: 0.6 }),
  eye(9.5, 11.9, 0.55), eye(14.5, 11.9, 0.55),
  // gros nez et narines
  path("M9.6 15.2Q9.4 12.4 12 12.4Q14.6 12.4 14.4 15.2Q12 16.4 9.6 15.2Z", GOR_NOSE, { w: 0.9 }),
  ellipse(11, 14.6, 0.75, 0.55, O, false), ellipse(13, 14.6, 0.75, 0.55, O, false),
  line("M9.8 17Q12 17.8 14.2 17", O, 0.9),
].join("");

const zebre = [
  path("M14.6 3.4Q19.6 3 21.2 9L22.6 21.6H13.6L12.6 16.8Q9.4 19 6.2 20.6Q3.6 21.4 2.8 19.6Q2.4 17.8 4.4 16.6L11 7Q12.2 3.8 14.6 3.4Z", C.white),
  line("M10.2 9.6Q11.8 10.6 12.8 10M8.6 12Q10.8 13.6 12.8 13M6.8 14.6Q9 16.2 11.4 15.8", O, 1),
  line("M14.4 9.6Q16.8 8.6 19.2 10M14 12.6Q17 11.6 19.8 13.2M13.8 15.6Q17 14.6 20.4 16.4M14 18.6Q17.4 17.6 20.8 19.4", O, 1),
  // crinière dressée : bande lisse, rayée comme le pelage
  path("M14.4 3.2Q19.8 2 21.8 8.6L23 21.6H21.2L19.6 9.2Q18.2 5.4 14.6 4.8Z", C.noir),
  line("M17.2 3.6L16.6 4.9M19.4 5L18.4 5.9M20.9 7.6L19.6 8.2M21.6 10.8L20.2 11.2M22 14.2L20.6 14.4M22.3 17.6L20.9 17.7", C.white, 0.7),
  path("M13.4 5L12.6 1.6L15.6 4.2Z", C.white),
  path("M4.4 16.6Q2.4 17.8 2.8 19.6Q3.6 21.4 6.2 20.6Q6.4 18 4.4 16.6Z", C.noir, { w: 0.9 }),
  eye(11.6, 8.4, 0.65),
].join("");

const termitiere = [
  ellipse(12, 21.6, 9.6, 1.3, C.sable),
  path("M3.8 21.6Q5.2 17 6.2 12.6Q6.6 9.6 8.2 9L9.2 4.6Q10.4 1.8 11.8 4.2L12.6 7.4Q13.6 5.4 14.8 7.6Q15.8 10 16.2 13L17 11.4Q18.2 10.8 18.6 12.8Q19.2 17 20.2 21.6Q12 23 3.8 21.6Z", C.terre),
  line("M9.6 8Q9.2 13 8 21M12.6 9.4Q12.8 15 12.2 22M15.4 12Q16 17 16.6 21.6", C.terreDark, 0.7),
  ellipse(10.8, 14.6, 0.9, 1.2, C.terreDark, { w: 0.7 }),
  ellipse(14.2, 18, 0.8, 1, C.terreDark, { w: 0.7 }),
  path("M2.2 21.4L2.8 19M2.8 21.4L3.8 19.4M21 21.4L21.8 19.2M21.6 21.6L22.6 19.8", "none", { c: C.vert, w: 0.8 }),
].join("");

const coucherSoleil = [
  rect(1.5, 2.5, 21, 19, 4, C.orange),
  path("M1.5 9V6.5A4 4 0 0 1 5.5 2.5H18.5A4 4 0 0 1 22.5 6.5V9Z", C.terre, false),
  circle(10, 14.6, 5.2, C.jaune, false),
  circle(10, 14.6, 3.8, C.ocreLight, false),
  path("M1.5 15.4Q12 13.8 22.5 15.4V17.5A4 4 0 0 1 18.5 21.5H5.5A4 4 0 0 1 1.5 17.5Z", C.terreDark, false),
  line("M1.5 15.4Q12 13.8 22.5 15.4", O, 0.9),
  line("M17.6 15V11M17.6 11.6L15.6 9.6M17.6 11.4L19.6 9.6", O, 1),
  path("M13.4 9.4Q15.2 7.2 17.8 7.4Q20.6 7.2 22 9.4Q17.8 10.6 13.4 9.4Z", C.noir, { w: 0.8 }),
  line("M4.4 6.6Q5 6 5.6 6.6Q6.2 6 6.8 6.6M7.8 4.8Q8.3 4.3 8.8 4.8Q9.3 4.3 9.8 4.8", O, 0.7),
  rect(1.5, 2.5, 21, 19, 4, "none"),
].join("");

/* ---------------- culture et objets ---------------- */

const djembe = [
  path("M9.6 13.2Q10.2 16.4 7.8 21.4Q12 22.8 16.2 21.4Q13.8 16.4 14.4 13.2Z", C.bois),
  line("M9.2 18.6L10.4 17.4L11.6 18.6L12.8 17.4L14 18.6L14.8 17.8", C.ocreLight, 0.8),
  path("M4.8 4.6Q5 9.8 9.6 13.2H14.4Q19 9.8 19.2 4.6Z", C.bois),
  line("M5.4 6.4L8 12M8.4 6.8L10 12.8M8.4 6.8L7 11.2M11.4 7L12 13M11.4 7L10 12.8M14.6 6.8L14 13M14.6 6.8L16 11.8M17.8 6.4L16 11.8M17.8 6.4L18.4 8.4", C.cream, 0.8),
  rect(8.8, 12.4, 6.4, 1.6, 0.8, C.terre),
  ellipse(12, 4.6, 7.4, 2.2, C.sable),
  path("M4.6 4.8Q4.8 6.8 12 7.2Q19.2 6.8 19.4 4.8", "none", { c: C.terre, w: 1.2 }),
  ellipse(10.4, 4.1, 2.6, 0.7, C.cream, false),
].join("");

const tacks = Array.from({ length: 12 }, (_, k) => {
  const r = (k * 30 * Math.PI) / 180;
  return [12 + Math.cos(r) * 6.15, 16 + Math.sin(r) * 6.15];
});
// cordes : du chevalet (vu de face, encoches en ligne) jusqu'au manche, en éventail
const koraStrings = [0, 1, 2, 3, 4, 5].map((i) => `M${9.6 + i * 0.96} 14.2L${i < 3 ? 11.4 : 12.6} ${2.4 + (i < 3 ? i : 5 - i) * 2.4}`).join("");
const kora = g("rotate(-16 12 12)",
  thick("M7.8 14V8.4M16.2 14V8.4", C.bois, 0.9),
  rect(11.35, 1.2, 1.3, 12, 0.65, C.bois),
  circle(12, 16, 6.8, C.ocre),
  circle(12, 16, 5.5, C.sable),
  dots(tacks, 0.35, O),
  line(koraStrings, O, 0.5),
  rect(9, 14, 6, 1.6, 0.6, C.bois, { w: 0.9 }),
  line("M9.6 21.2Q12 22.4 14.4 21.2", O, 0.8),
);

// Masque portrait baoulé (Côte d'Ivoire) : visage allongé, coiffure à trois coques, sourcils en arc, yeux mi-clos.
const masque = [
  // coiffure en crête (trois coques striées)
  circle(7.9, 5.2, 2, C.marron), circle(16.1, 5.2, 2, C.marron), circle(12, 3.6, 2.6, C.marron),
  line("M6.6 4.4Q7.9 3.4 9.2 4.4M14.8 4.4Q16.1 3.4 17.4 4.4M10.2 2.6Q12 1.4 13.8 2.6", C.bois, 0.7),
  // visage allongé
  path("M12 5.2Q16.8 5.2 16.8 10.8Q16.6 16.4 14.2 20.2Q13.2 22.4 12 22.4Q10.8 22.4 9.8 20.2Q7.4 16.4 7.2 10.8Q7.2 5.2 12 5.2Z", C.bois),
  // front : bandeau de la coiffure
  path("M7.3 9Q7.4 5.2 12 5.2Q16.6 5.2 16.7 9Q12 7 7.3 9Z", C.marron),
  line("M8.4 7.4Q12 6 15.6 7.4", C.bois, 0.6),
  // sourcils en arc qui se rejoignent sur l'arête du nez
  line("M8 11.8Q8.8 9.4 11 10.4Q11.8 11 12 12.4M16 11.8Q15.2 9.4 13 10.4Q12.2 11 12 12.4", O, 1),
  // yeux mi-clos
  path("M8.6 12.9Q9.8 12 11 12.9Q9.8 13.6 8.6 12.9Z", O, { w: 0.6 }),
  path("M13 12.9Q14.2 12 15.4 12.9Q14.2 13.6 13 12.9Z", O, { w: 0.6 }),
  // long nez fin, petite bouche avancée
  line("M12 12.4V16.2", O, 0.9),
  path("M11 16.4Q12 15.6 13 16.4Q12 17 11 16.4Z", C.bois, { w: 0.8 }),
  ellipse(12, 18.8, 0.95, 0.8, C.terreDark, { w: 0.8 }),
  // scarifications aux tempes
  line("M8 14.2V15.4M8.9 14.6V15.8M16 14.2V15.4M15.1 14.6V15.8", C.marron, 0.7),
].join("");

const calebasse = [
  path("M10.2 7Q10 4.2 12 3.4Q14 4.2 13.8 7", C.ocre),
  line("M12 3.4Q12.4 2 13.6 1.6", C.marron, 1),
  circle(12, 14.2, 8, C.ocre),
  ellipse(8.8, 10.6, 2, 1.2, C.ocreLight, false),
  line("M4.4 12.6Q12 14.4 19.6 12.6M4.4 16Q12 17.8 19.6 16", C.marron, 0.8),
  line("M4.8 14.4L6.2 13L7.6 14.8L9 13.3L10.4 15L11.8 13.4L13.2 15.1L14.6 13.4L16 15L17.4 13.2L18.8 14.8", C.marron, 0.8),
  dots([[8, 19.2], [10.4, 20.2], [12.8, 20.3], [15.2, 19.6], [10.6, 9], [13.4, 9]], 0.45, C.marron),
].join("");

const cauri = g("rotate(-28 12 12)",
  ellipse(12, 12, 6.6, 10, C.sable),
  ellipse(12, 12.2, 4.8, 8.6, C.cream, false),
  path("M12 3.2Q10.4 12 12 20.8Q13.6 12 12 3.2Z", C.marron, { w: 0.9 }),
  line("M10.9 6.4H11.8M10.6 8.8H11.6M10.5 11.2H11.5M10.5 13.6H11.5M10.7 16H11.6M11 18.2H11.8M13.1 6.4H12.2M13.4 8.8H12.4M13.5 11.2H12.5M13.5 13.6H12.5M13.3 16H12.4M13 18.2H12.2", O, 0.6),
  ellipse(8.6, 9.4, 0.9, 2.4, C.white, false),
);

const kase = [
  ellipse(12, 21.4, 9.4, 1.4, C.sable),
  path("M5.2 12.6V20.4Q12 22.4 18.8 20.4V12.6Z", C.terre),
  line("M5.2 15.6Q12 17.2 18.8 15.6", C.ocreLight, 0.8),
  line("M5.6 17.4L6.6 16.4L7.6 17.6L8.6 16.6M15.4 16.6L16.4 17.6L17.4 16.4L18.4 17.4", C.ocreLight, 0.8),
  path("M10.2 21.6V18Q12 15.8 13.8 18V21.6Q12 21.9 10.2 21.6Z", C.marron),
  path("M12 2.2L21.8 13.4Q12 16.4 2.2 13.4Z", C.ocreLight),
  line("M12 2.6L6.6 14.4M12 2.6L9.4 15M12 2.6L12 15.2M12 2.6L14.6 15M12 2.6L17.4 14.4", C.ocre, 0.8),
  line("M3.8 13.8L4.6 15M7 14.4L7.4 15.6M10 14.8L10.2 16M14 14.8L13.8 16M17 14.4L16.6 15.6M20.2 13.8L19.4 15", C.ocre, 0.9),
  line("M12 2.2V0.9", O, 1),
].join("");

const pirogue = [
  line("M2 19Q4 17.8 6 19T10 19T14 19T18 19T22 19", C.eau, 1.2),
  line("M4 21.4Q6 20.2 8 21.4T12 21.4T16 21.4T20 21.4", C.eau, 1.2),
  thick("M15.8 5.4L12.4 17", C.bois, 0.9),
  path("M1.4 9.6Q2.6 15.4 7 16.6H17Q21.4 15.4 22.6 9.6Q19.4 12.6 16 12.6H8Q4.6 12.6 1.4 9.6Z", C.bleu),
  line("M2.8 12.6Q5 14.6 8 14.6H16Q19 14.6 21.2 12.6", C.jaune, 1.1),
  path("M8 15.4L9.2 14.9L10.4 15.4L11.6 14.9L12.8 15.4L14 14.9L15.2 15.4L16.4 14.9", "none", { c: C.rouge, w: 0.8 }),
  path("M1.4 9.6Q2 8.2 3 8.4Q3.2 10.4 4.6 11.6Q2.6 11 1.4 9.6Z", C.rouge, { w: 0.9 }),
  path("M22.6 9.6Q22 8.2 21 8.4Q20.8 10.4 19.4 11.6Q21.4 11 22.6 9.6Z", C.rouge, { w: 0.9 }),
  path("M12.4 17L11.6 19.6L13.2 19.8Z", C.bois, { w: 0.8 }),
  line("M21 8.4V4.6", O, 0.8),
  path("M21 4.6L23 5.4L21 6.2Z", C.vert, { w: 0.7 }),
].join("");

const wheel = (x, y, r = 3) => circle(x, y, r, C.noir) + circle(x, y, r * 0.42, C.grisLight, { w: 0.7 });
const motoTaxi = [
  line("M17.8 9.4L19.4 18", O, 1.4),
  wheel(5, 18), wheel(19.2, 18),
  path("M5.6 15.4L9.8 13.4H15.2L17.6 11L19.4 11.6L18.8 15.4Q17.2 16.8 15 16.8H9.2Q7 16.8 5.6 15.4Z", C.terre),
  path("M2.8 15.2Q4.6 13.2 7.2 14L6.6 15.8Q4.6 15.2 3.6 16.2Z", C.terre, { w: 0.9 }),
  circle(19.6, 12.4, 0.9, C.ocreLight, { w: 0.7 }),
  path("M10.6 13.2L12.4 16.6H14.2L13.4 12.6Z", C.indigo),
  path("M7.6 13.6Q10.2 12.2 13.6 13L13.4 13.9H7.8Z", C.noir, { w: 0.8 }),
  path("M9.6 13.2L10.2 7.8Q11.2 6.2 13.2 7L13.6 13Z", C.jaune),
  thick("M12.4 8.2L15.4 10L17.4 9.8", C.jaune, 1.1),
  circle(17.6, 9.6, 0.7, C.noir, { w: 0.6 }),
  circle(11.6, 4.6, 2.4, C.rouge),
  path("M12.4 3.6H14Q14.2 5 13.6 5.8H12.4Z", C.ciel, { w: 0.8 }),
  line("M9.4 4.8Q11 6.6 13.6 6.2", O, 0.8),
].join("");

const taxiBrousse = [
  rect(3, 5.4, 4.6, 2.8, 1, C.terre),
  line("M4.6 5.4V8.2M6 5.4V8.2", C.ocreLight, 0.7),
  ellipse(10.6, 6.4, 3, 2, C.sable),
  line("M10.6 4.4V8.4", C.bois, 0.8),
  rect(13.6, 4, 3.8, 4.2, 0.8, C.indigo),
  dots([[14.6, 5.2], [16.4, 5.2], [15.5, 6.4], [14.6, 7.4], [16.4, 7.4]], 0.4, C.ocreLight),
  line("M2.8 8.4H18", O, 1.1),
  path("M2 18V10.6Q2 9 3.6 9H17.2Q18.4 9 19.2 10.1L21.8 13.4Q22.4 14 22.4 14.8V18Q22.4 18.8 21.6 18.8H2.8Q2 18.8 2 18Z", C.jaune),
  path("M2 14.6H22.4V16.2H2Z", C.vert, { w: 0.8 }),
  rect(3.4, 10.4, 3.2, 2.8, 0.6, C.ciel, { w: 0.8 }),
  rect(7.6, 10.4, 3.2, 2.8, 0.6, C.ciel, { w: 0.8 }),
  rect(11.8, 10.4, 3.2, 2.8, 0.6, C.ciel, { w: 0.8 }),
  path("M16 10.4H18.4L20.4 13.2H16Z", C.ciel, { w: 0.8 }),
  circle(21.4, 16.8, 0.6, C.white, { w: 0.6 }),
  wheel(6.4, 18.8, 2.3), wheel(17.6, 18.8, 2.3),
].join("");

const mobileMoney = [
  rect(4.6, 1.6, 11, 20.6, 2.4, C.noir),
  rect(5.9, 3.8, 8.4, 15.2, 1, C.vertLight, { w: 0.8 }),
  circle(10.1, 20.6, 0.7, C.grisLight, { w: 0.5 }),
  thick("M7.8 9.4H12.6", C.white, 1),
  path("M11.6 7.6L13.6 9.4L11.6 11.2Z", C.white, { w: 0.8 }),
  thick("M12.4 13.6H7.6", C.ocreLight, 1),
  path("M8.6 11.8L6.6 13.6L8.6 15.4Z", C.ocreLight, { w: 0.8 }),
  circle(17.6, 16.6, 4.6, C.jaune),
  circle(17.6, 16.6, 3.2, C.ocreLight, { c: C.jauneShade, w: 0.8 }),
  path("M17.6 14.4L18.3 16L19.9 16.6L18.3 17.2L17.6 18.8L16.9 17.2L15.3 16.6L16.9 16Z", C.jauneShade, false),
  sparkle(20.6, 5.4, 1.6, C.ocreLight, { w: 0.7 }),
].join("");

const pitX = [3.9, 7.14, 10.38, 13.62, 16.86, 20.1];
const seeds = [[-0.45, -0.45], [0.45, -0.3], [-0.1, 0.5], [0.5, 0.7]];
const awale = [
  rect(1.5, 8.4, 21, 10.6, 3, C.terreDark),
  rect(1.5, 5.8, 21, 11.2, 3, C.bois),
  line("M3.6 11.4H20.4", C.marron, 0.6),
  ...[8.8, 14].flatMap((y, row) => pitX.map((x, i) => ellipse(x, y, 1.4, 1.75, C.marron, { w: 0.8 })
    + dots(seeds.slice(0, 2 + ((i + row * 2) % 3)).map(([dx, dy]) => [x + dx, y + dy]), 0.42, C.sable))),
].join("");

// Kente : bandes tissées côte à côte, blocs jaune / vert / rouge alternés, filets noirs.
const KC = [C.jaune, C.vert, C.rouge];
const kenteBlocks = [];
for (let s = 0; s < 4; s++) {
  for (let b = 0; b < 4; b++) {
    const x = 2 + s * 5, y = 2 + b * 4.5, col = KC[(s + b) % 3];
    kenteBlocks.push(rect(x, y, 5, 4.5, 0, col, false));
    if (col === C.jaune) kenteBlocks.push(line(`M${x} ${y + 1.4}H${x + 5}M${x} ${y + 2.4}H${x + 5}M${x} ${y + 3.4}H${x + 5}`, C.noir, 0.5));
    else kenteBlocks.push(rect(x + 1.6, y + 1.4, 1.8, 1.7, 0, C.jaune, false), line(`M${x + 1} ${y + 2.25}H${x + 4}`, C.noir, 0.5));
  }
}
const kente = [
  ...kenteBlocks,
  line("M7 2V20M12 2V20M17 2V20", C.noir, 0.6),
  rect(2, 2, 20, 18, 0.6, "none"),
  line("M3 20.6V22.4M5 20.6V22.4M7 20.6V22.4M9 20.6V22.4M11 20.6V22.4M13 20.6V22.4M15 20.6V22.4M17 20.6V22.4M19 20.6V22.4M21 20.6V22.4", C.ocre, 0.8),
].join("");

const waxMotif = (x, y, ring, mid, dot = C.cream) => circle(x, y, 1.7, ring, { w: 0.8 }) + circle(x, y, 0.9, mid, false) + circle(x, y, 0.35, dot, false);
const slab = (y, h, fill) => path(`M4 ${y}H20.6Q22.4 ${y} 22.4 ${y + h / 2}Q22.4 ${y + h} 20.6 ${y + h}H4Q1.8 ${y + h} 1.8 ${y + h / 2}Q1.8 ${y} 4 ${y}Z`, fill);
const fold = (y, h) => line(`M4.6 ${y + 0.4}Q3 ${y + h / 2} 4.6 ${y + h - 0.4}`, O, 0.8);
const tissuWax = [
  slab(15.6, 5.8, C.vert), fold(15.6, 5.8),
  waxMotif(9, 18.5, C.ocreLight, C.terre), waxMotif(15, 18.5, C.ocreLight, C.terre),
  dots([[6.4, 17.4], [12, 17.4], [12, 19.6], [18, 19.6], [20.4, 17.6]], 0.4, C.ocreLight),
  slab(9.8, 5.8, C.ocre), fold(9.8, 5.8),
  path("M7.4 12.7Q8.6 10.6 10.6 11.8Q9.6 14 7.4 12.7ZM14.6 12.7Q15.8 10.6 17.8 11.8Q16.8 14 14.6 12.7Z", C.vert, { w: 0.7 }),
  dots([[12.6, 11.6], [12.2, 13.8], [19.6, 12.8], [6, 13.6]], 0.45, C.terre),
  slab(2.4, 7.4, C.indigo), fold(2.4, 7.4),
  waxMotif(8.6, 6.1, C.ocre, C.terre), waxMotif(15.8, 6.1, C.ocre, C.terre),
  dots([[12.2, 4.4], [12.2, 7.8], [19.8, 4.6], [19.8, 7.6], [5.8, 7.6]], 0.45, C.ocreLight),
].join("");

const sankofa = [
  thick("M12 18.6C8 15.4 3.8 12.4 4 8.4C4.2 5.4 6.8 3.8 9.2 4.6C11.4 5.4 11.4 8.6 9.4 9C8.2 9.2 7.4 8 8.2 7.2"
    + "M12 18.6C16 15.4 20.2 12.4 20 8.4C19.8 5.4 17.2 3.8 14.8 4.6C12.6 5.4 12.6 8.6 14.6 9C15.8 9.2 16.6 8 15.8 7.2"
    + "M12 18.6Q11 21.6 9.4 21Q8.6 20.4 9.4 19.8M12 18.6Q13 21.6 14.6 21Q15.4 20.4 14.6 19.8", C.terre, 1.9),
  thick("M12 9.6V14.4", C.terre, 1.6),
  path("M12 11.2L13.4 12.6L12 14L10.6 12.6Z", C.ocre, { w: 0.8 }),
].join("");

/* ---------------- nourriture ---------------- */

// Assiette vue de 3/4 haut : la nourriture occupe presque toute la hauteur.
const plate34 = (food) => ellipse(12, 15.4, 10.4, 6.2, C.white) + ellipse(12, 15.2, 7.6, 4.2, C.grisLight, false) + food;
const grains = (pts) => dots(pts, 0.4, C.sable);
const attieke = plate34([
  path("M3.4 16.2Q2.6 9.4 7.4 6.2Q11.4 4 14.6 7Q17.4 10 16.4 14.6Q15 18.6 9.6 18.8Q4.2 18.8 3.4 16.2Z", C.cream),
  grains([[6, 9.6], [8.8, 7.6], [11.6, 8.2], [5.4, 13.2], [8, 11.6], [10.8, 11], [13.6, 10.6], [6.8, 16], [9.4, 14.4], [12.2, 13.8]]),
  g("rotate(-20 15.6 14.8)",
    path("M8.8 14.8Q11.8 11.4 17 11.8Q19.6 12.2 20.8 13.6L22.6 11.6V18L20.8 16Q19.2 17.8 16.4 18Q11.6 18.2 8.8 14.8Z", C.bois),
    path("M8.8 14.8Q14 15.4 20.8 16Q19.2 17.8 16.4 18Q11.6 18.2 8.8 14.8Z", C.ocre, false),
    path("M8.8 14.8Q11.8 11.4 17 11.8Q19.6 12.2 20.8 13.6L22.6 11.6V18L20.8 16Q19.2 17.8 16.4 18Q11.6 18.2 8.8 14.8Z", "none"),
    line("M13.2 12.4L14.4 17.4M16 12L17.2 17.4M18.6 12.6L19.4 16.4", C.marron, 0.9),
    line("M11.6 12.8Q12.4 14.8 11.6 17", O, 0.8),
    eye(10.4, 14.2, 0.55)),
].join(""));

const plantain = (x, y, rot, rx = 2.2, ry = 1.3) => g(`rotate(${rot} ${x} ${y})`, ellipse(x, y, rx, ry, C.orange, { w: 0.9 }), ellipse(x, y - 0.1, rx * 0.66, ry * 0.55, C.ocreLight, false));
const jollof = plate34([
  path("M3.4 15.8Q3 8.4 8.8 6Q13.4 4.6 16.6 8Q19.6 11.2 18.6 15.4Q16.8 18.8 11 18.8Q4.6 18.8 3.4 15.8Z", RICE),
  line("M6 11.4L6.9 11.2M8.6 8.6L9.5 8.6M11.8 7.8L12.6 8.2M14.6 9.8L15.2 10.4M7.4 14.4L8.3 14.4M10.6 11.6L11.5 11.8M13.6 12.8L14.4 13.2M5.4 16L6.3 16M10 16.4L10.9 16.2M16 15L16.6 15.4", C.ocreLight, 0.8),
  dots([[7.6, 10.6], [12.6, 10.4], [9.2, 13.6], [15.6, 12.2], [12.2, 15.8]], 0.6, C.vertLight),
  plantain(18.4, 16.6, -25, 2.8, 1.7), plantain(14.6, 18.4, -6, 2.8, 1.7),
].join(""));

const alloco = plate34([
  plantain(6.8, 16.4, 15, 3, 1.8), plantain(12, 17.2, -8, 3, 1.8), plantain(17.2, 16.2, -20, 3, 1.8),
  plantain(9.2, 13, -25, 3, 1.8), plantain(14.8, 12.8, 20, 3, 1.8),
  plantain(11.8, 9.4, 5, 3, 1.8),
].join(""));


const foufou = [
  path("M8.4 9.4H22.4Q22.2 15.6 15.4 15.6Q8.6 15.6 8.4 9.4Z", C.terre),
  ellipse(15.4, 9.4, 7, 1.9, C.rouge),
  ellipse(14.6, 9.2, 1.3, 0.7, C.marron, { w: 0.7 }),
  ellipse(18, 9.6, 1.2, 0.6, C.marron, { w: 0.7 }),
  dots([[12, 9.4], [16.4, 8.4], [19.8, 9], [13.4, 10.2]], 0.4, C.vertLight),
  line("M14.6 6.4Q14 5 14.8 3.8M17.4 6.2Q16.8 4.8 17.6 3.6", C.gris, 0.8),
  path("M1.4 19.2Q5 15.8 9.6 16.4Q14.2 17 14.6 20Q9.4 22.6 4.4 21.6Q1.8 21 1.4 19.2Z", C.feuille),
  line("M2.6 19.4Q8 18.4 13.6 19.8", C.vert, 0.7),
  ellipse(7.8, 15.6, 5, 4.4, C.cream),
  ellipse(6.2, 13.8, 1.6, 1, C.white, false),
  line("M5 18.4Q7.8 19.6 10.8 18.2", C.sable, 0.8),
].join("");


const SUYA = "#7A3A1E";
const chunk = (x, y) => rect(x - 1.4, y - 1.2, 2.8, 2.4, 0.9, SUYA, { w: 0.9 }) + dots([[x - 0.5, y - 0.4], [x + 0.6, y + 0.3], [x - 0.2, y + 0.6]], 0.28, C.orange);
const skewer = (rot, cy) => g(`rotate(${rot} 12 ${cy})`, line(`M2 ${cy}H21.6`, C.bois, 0.9), chunk(6.4, cy), chunk(9.8, cy), chunk(13.2, cy), chunk(16.6, cy));
const suya = [
  path("M3 6L20 3.6L21.6 18.4L4.2 21Z", C.sable),
  line("M5 7.6L8.6 7.1M15 6.2L18.4 5.7M6.4 19L9.4 18.6", C.bois, 0.6),
  skewer(-12, 10.6), skewer(-12, 15.4),
  ellipse(18, 19.4, 1.8, 1, "none", { c: C.violet, w: 0.9 }),
  circle(6.4, 19.6, 1.3, C.rouge, { w: 0.8 }),
  dots([[8.8, 7.8], [15.6, 12.6], [10, 18.8], [19.4, 8.6]], 0.35, C.orange),
].join("");

const INJ = "#E3CC9C", INJ_HOLE = "#C2A26E";
// Plateau d'injera vu de haut : ragoûts en couronne sur le bord, centre nu et alvéolé (sans disposition de visage).
const wat = (x, y, fill, extra = "") => path(`M${x - 2.4} ${y + 0.2}Q${x - 2.2} ${y - 2} ${x} ${y - 2}Q${x + 2.4} ${y - 1.8} ${x + 2.3} ${y + 0.4}Q${x + 2} ${y + 2} ${x - 0.2} ${y + 1.9}Q${x - 2.4} ${y + 1.8} ${x - 2.4} ${y + 0.2}Z`, fill, { w: 0.9 }) + extra;
const injera = [
  ellipse(12, 12.4, 10.6, 9.4, INJ),
  dots([[9.6, 10.2], [12.4, 9.4], [14.6, 11], [10.4, 13.2], [13.2, 12.8], [11.8, 15.4], [14.6, 14.6], [9, 15.4], [8.4, 12], [15.8, 9], [12, 6.2], [17.6, 18.4], [6.4, 6.4], [3.4, 13.4], [20.8, 10.4]], 0.4, INJ_HOLE),
  wat(9.2, 5.4, C.terreDark, ellipse(9.4, 5.2, 1, 0.75, C.white, { w: 0.6 }) + circle(9.4, 5.2, 0.38, C.jaune, false)),
  wat(17.6, 7.6, C.orange),
  wat(18.6, 14.8, C.vert, line("M17.6 14.6L18.8 13.8M18.6 15.6L19.8 14.6", C.vertLight, 0.6)),
  wat(12.6, 19.2, C.cream),
  wat(5.6, 16.6, C.ocre),
  wat(4.8, 9.6, C.terre),
].join("");

const bissap = [
  path("M5.6 3.8H17.6L16.2 20.4Q16.1 21.6 14.9 21.6H8.3Q7.1 21.6 7 20.4Z", "#EAF4FA"),
  path("M6.2 7.4H17L15.7 20Q15.6 20.9 14.7 20.9H8.5Q7.6 20.9 7.5 20Z", DEEP_RED, false),
  ellipse(11.6, 7.4, 5.4, 0.8, "#C42840", false),
  rect(8.6, 9.2, 2.6, 2.6, 0.6, "#E9A2AE", { w: 0.6 }),
  rect(12, 10.4, 2.4, 2.4, 0.6, "#E9A2AE", { w: 0.6 }),
  line("M8.2 13.6L8.8 19", C.white, 0.8),
  path("M5.6 3.8H17.6L16.2 20.4Q16.1 21.6 14.9 21.6H8.3Q7.1 21.6 7 20.4Z", "none"),
  thick("M13.2 18L17 1.6", C.white, 0.8),
  line("M15.4 8.6L15.8 7M16.2 5.2L16.6 3.6", C.rouge, 0.8),
  path("M17.6 4.4Q19.8 3.4 21 5Q19.4 6.4 17.6 5.4Z", C.vertLight, { w: 0.8 }),
  path("M18.8 19.6Q19.6 17.6 21.2 17.8Q21.8 19.8 20.2 21.2Q19 21.2 18.8 19.6Z", DEEP_RED, { w: 0.8 }),
  path("M20 21.2Q21 22.4 22.4 21.4", "none", { c: C.vert, w: 0.8 }),
].join("");

const vinPalme = [
  line("M4.6 7.2L4.4 10M6.6 5.4L6.8 8.8M8.8 4.2L9.4 7.8M11.2 3.4L12 7M13.6 3.1L14.6 6.6M16 3.2L17.2 6.6M18.4 3.8L19.6 7M20.6 4.8L21.6 7.6M6.4 5.6L4.6 4.2M8.8 4.3L7.6 2.4M11.4 3.4L10.6 1.6M14 3.1L13.8 1.4M16.6 3.2L17 1.6M19 3.9L19.8 2.4", C.vertLight, 1),
  line("M2.6 9.4Q9 2.4 21.8 5", C.vert, 1.2),
  path("M2.6 12.4H21.4Q21 21.4 12 21.4Q3 21.4 2.6 12.4Z", C.ocre),
  line("M4.4 15.6Q12 17.4 19.6 15.6", C.marron, 0.8),
  line("M5.4 17.8L6.6 16.8L7.8 18L9 17L10.2 18.2L11.4 17.2L12.6 18.2L13.8 17.2L15 18.1L16.2 17L17.4 18L18.6 16.8", C.marron, 0.7),
  ellipse(12, 12.4, 9.4, 2.2, C.marron),
  ellipse(12, 12.4, 8.2, 1.5, C.cream, { w: 0.7 }),
  dots([[8, 12.2], [13.6, 12.6], [16.6, 12], [10.6, 11.8]], 0.4, C.white),
  circle(9, 9.6, 0.7, C.white, { w: 0.6 }), circle(14.4, 9, 0.5, C.white, { w: 0.6 }), circle(11.6, 8, 0.4, C.white, { w: 0.5 }),
].join("");

const KOLA = "#D9677F", KOLA_DARK = "#A8405A", KOLA_W = "#F3E2CF";
const noixKola = [
  path("M1.6 17.6Q6 9 14 10.6Q20.4 12 22.4 18.4Q14 22.8 1.6 17.6Z", C.feuille),
  line("M3.6 17.4Q12 15.4 20.6 18.2", C.vert, 0.7),
  path("M3.8 12.4Q4 7.6 8.2 7.4Q11.6 7.8 11.4 12Q11 16 7.6 16.2Q4 16 3.8 12.4Z", KOLA),
  line("M7.6 7.6Q7 11.6 7.8 16", KOLA_DARK, 0.8),
  ellipse(5.8, 10.4, 0.8, 1.4, "#F2A0B2", false),
  path("M12.4 13.8Q12.2 9.6 15.8 9.4Q19.4 9.6 19.6 13.6Q19.2 17.2 15.8 17.2Q12.6 17 12.4 13.8Z", KOLA_W),
  path("M14 11.8Q15.8 10.6 17.8 12Q17.6 15.4 15.8 15.6Q14 15.2 14 11.8Z", "#F0C6CF", { w: 0.7 }),
  path("M9.4 18.6Q9.6 15.8 12.4 15.8Q15.2 16 15 18.6Q14.6 21 12.2 21Q9.6 20.8 9.4 18.6Z", KOLA_DARK),
  line("M10.6 17.2Q12.2 16.6 13.6 17.4", "#C9637A", 0.7),
].join("");

const puff = (x, y, r = 2.6) => circle(x, y, r, "#D98A2E") + ellipse(x - r * 0.35, y - r * 0.4, r * 0.38, r * 0.25, C.ocreLight, false) + dots([[x + r * 0.3, y - r * 0.1], [x - r * 0.1, y + r * 0.35]], 0.25, C.white);
const beignets = [
  bowl(C.bleu, [puff(8.6, 9.8), puff(15.4, 9.8), puff(12, 7.8), puff(5.6, 11.6, 2.2), puff(18.4, 11.6, 2.2), puff(12, 11.4)].join("")),
  dots([[6.6, 15], [9.2, 16.8], [12, 15.4], [14.8, 16.8], [17.4, 15], [12, 18.2]], 0.5, C.white),
  sparkle(20.4, 4.4, 1.5, C.white, { w: 0.6 }),
].join("");

const MAFE = "#C46A2A";
const peanut = (x, y, rot) => g(`rotate(${rot} ${x} ${y})`, path(`M${x - 1.8} ${y}A1.1 1.1 0 0 1 ${x} ${y - 0.5}A1.1 1.1 0 0 1 ${x + 1.8} ${y}A1.1 1.1 0 0 1 ${x} ${y + 0.5}A1.1 1.1 0 0 1 ${x - 1.8} ${y}Z`, "#D9B27A", { w: 0.7 }));
const mafe = [
  bowl(C.indigo, [
    ellipse(12, 12.5, 8.5, 2.8, MAFE),
    rect(6.6, 10.2, 2.6, 2, 0.7, C.marron, { w: 0.8 }),
    rect(13.2, 9.6, 2.4, 2, 0.7, C.marron, { w: 0.8 }),
    circle(11, 11, 1.1, C.orange, { w: 0.7 }),
    circle(17.4, 11.2, 1, C.orange, { w: 0.7 }),
    dots([[5.4, 12], [10.4, 12.2], [12.6, 10.2], [16, 12], [18.8, 12.4]], 0.4, C.ocreLight),
  ].join("")),
  line("M8.4 8.4Q7.6 6.6 8.6 5M12 7.6Q11.2 5.6 12.2 3.8M15.6 8.4Q14.8 6.6 15.8 5", C.gris, 0.8),
  line("M5 16Q12 17.6 19 16", C.ocreLight, 0.8),
  peanut(4.2, 21.2, -20), peanut(19.8, 21.2, 25),
].join("");

const shrimp = (x, y, flip = 1) => line(`M${x} ${y}q${1.6 * flip} -1.6 ${2.8 * flip} 0q0.4 1.4 -${0.6 * flip} 1.8`, O, 2.4) + line(`M${x} ${y}q${1.6 * flip} -1.6 ${2.8 * flip} 0q0.4 1.4 -${0.6 * flip} 1.8`, "#F08A5D", 1.2);
const ndole = [
  bowl(C.white, [
    // dôme de feuilles amères (vert sombre), quelques crevettes et arachides en accent
    path("M3.8 12.8Q4 8.6 7.8 8Q9.8 5.6 12.6 6.4Q15.8 5.8 17 8.2Q20.2 8.8 20.2 12.8Z", LEAF_DARK),
    line("M6 10.6L7.2 9.8M9.4 8.8L10.4 8.2M13 7.8L14.2 7.4M16.4 9.6L17.6 9.2M7.6 12L8.8 11.4M11.4 10.6L12.6 10M15 11.6L16.2 11M18.4 11.8L19.2 11.2", C.vertLight, 0.8),
    g("translate(13.4 9.4) scale(0.62)", shrimp(0, 0)),
    g("translate(8.6 11.8) scale(0.62)", shrimp(0, 0, -1)),
    dots([[10.4, 7.6], [15.2, 9.4], [6.2, 12.2], [18.6, 10.4]], 0.4, "#D9B27A"),
  ].join("")),
  line("M4.6 15.6Q12 17.2 19.4 15.6", C.bleu, 0.9),
  line("M8.6 5.2Q7.8 3.8 8.8 2.4M15.4 5.2Q14.6 3.8 15.6 2.4", C.gris, 0.8),
].join("");

/* ---------------- entrées ---------------- */

const E = (slug, fr, en, group, tags, body) => ({ slug, fr, en, char: null, group, tags, tone: false, body });

export default [
  E("baobab", "Baobab", "Baobab", "nature", ["baobab", "arbre", "tree", "sénégal", "madagascar", "savane", "adansonia"], baobab),
  E("kilimandjaro", "Kilimandjaro", "Kilimanjaro", "nature", ["kilimandjaro", "kilimanjaro", "montagne", "mountain", "tanzanie", "tanzania", "neige", "snow"], kilimandjaro),
  E("okapi", "Okapi", "Okapi", "nature", ["okapi", "animal", "rd congo", "drc", "girafe de forêt", "forest giraffe", "ituri"], okapi),
  E("pangolin", "Pangolin", "Pangolin", "nature", ["pangolin", "animal", "écailles", "scales", "forêt", "forest"], pangolin),
  E("cameleon", "Caméléon", "Chameleon", "nature", ["caméléon", "chameleon", "reptile", "lézard", "lizard", "madagascar"], cameleon),
  E("calao", "Calao", "Hornbill", "nature", ["calao", "hornbill", "oiseau", "bird", "casque", "bec", "beak"], calao),
  E("gorille", "Gorille", "Gorilla", "nature", ["gorille", "gorilla", "singe", "ape", "rwanda", "ouganda", "cameroun", "congo"], gorille),
  E("zebre", "Zèbre", "Zebra", "nature", ["zèbre", "zebra", "rayures", "stripes", "savane", "kenya", "botswana"], zebre),
  E("termitiere", "Termitière", "Termite mound", "nature", ["termitière", "termite mound", "termites", "savane", "sahel", "burkina faso"], termitiere),
  E("coucher-de-soleil-savane", "Coucher de soleil sur la savane", "Sunset over the savanna", "nature", ["coucher de soleil", "sunset", "savane", "savanna", "acacia", "safari", "serengeti"], coucherSoleil),

  E("djembe", "Djembé", "Djembe", "objets", ["djembé", "djembe", "tambour", "drum", "musique", "music", "mali", "guinée"], djembe),
  E("kora", "Kora", "Kora", "objets", ["kora", "harpe", "harp", "griot", "musique", "music", "mali", "sénégal", "gambie"], kora),
  E("masque", "Masque africain", "African mask", "objets", ["masque", "mask", "bois", "wood", "sculpture", "art", "côte d'ivoire", "gabon", "baoulé", "baule", "masque portrait", "portrait mask"], masque),
  E("calebasse", "Calebasse", "Calabash", "objets", ["calebasse", "calabash", "gourde", "gourd", "pyrogravure", "récipient"], calebasse),
  E("cauri", "Cauri", "Cowrie shell", "objets", ["cauri", "cowrie", "coquillage", "shell", "monnaie", "divination"], cauri),
  E("case", "Case", "Hut", "objets", ["case", "hut", "maison", "house", "village", "paille", "thatch", "banco"], kase),
  E("pirogue", "Pirogue", "Pirogue", "objets", ["pirogue", "canoe", "bateau", "boat", "pêche", "fishing", "sénégal", "fleuve"], pirogue),
  E("moto-taxi", "Moto-taxi", "Motorbike taxi", "objets", ["moto-taxi", "zémidjan", "zem", "okada", "boda boda", "bénin", "togo", "nigeria"], motoTaxi),
  E("taxi-brousse", "Taxi-brousse", "Bush taxi", "objets", ["taxi-brousse", "bush taxi", "minibus", "danfo", "gbaka", "car rapide", "matatu", "bagages"], taxiBrousse),
  E("mobile-money", "Mobile money", "Mobile money", "objets", ["mobile money", "argent", "money", "téléphone", "phone", "paiement", "m-pesa", "transfert"], mobileMoney),
  E("awale", "Awalé", "Oware", "objets", ["awalé", "oware", "mancala", "jeu", "game", "côte d'ivoire", "ghana", "graines"], awale),
  E("kente", "Kente", "Kente cloth", "objets", ["kente", "tissu", "cloth", "ghana", "ashanti", "ewe", "tissage", "weaving"], kente),
  E("tissu-wax", "Tissu wax", "Wax print fabric", "objets", ["wax", "pagne", "tissu", "fabric", "ankara", "imprimé", "print"], tissuWax),
  E("sankofa", "Sankofa", "Sankofa", "objets", ["sankofa", "adinkra", "ghana", "akan", "symbole", "symbol", "mémoire", "heritage"], sankofa),

  E("attieke", "Attiéké au poisson", "Attiéké with fish", "nourriture", ["attiéké", "attieke", "côte d'ivoire", "manioc", "cassava", "garba", "poisson", "fish"], attieke),
  E("jollof", "Riz jollof", "Jollof rice", "nourriture", ["jollof", "riz", "rice", "nigeria", "ghana", "sénégal", "thiéboudienne", "plantain"], jollof),
  E("foufou", "Foufou", "Fufu", "nourriture", ["foufou", "fufu", "ghana", "nigeria", "igname", "yam", "manioc", "soupe", "soup"], foufou),
  E("alloco", "Alloco", "Alloco", "nourriture", ["alloco", "plantain", "banane plantain", "fried plantain", "dodo", "côte d'ivoire", "piment"], alloco),
  E("suya", "Suya", "Suya", "nourriture", ["suya", "nigeria", "brochette", "skewer", "soya", "yaji", "grillade", "piment"], suya),
  E("injera", "Injera", "Injera", "nourriture", ["injera", "éthiopie", "ethiopia", "érythrée", "teff", "wat", "galette"], injera),
  E("bissap", "Bissap", "Bissap", "nourriture", ["bissap", "hibiscus", "zobo", "sobolo", "sénégal", "boisson", "drink", "foléré"], bissap),
  E("vin-de-palme", "Vin de palme", "Palm wine", "nourriture", ["vin de palme", "palm wine", "bangui", "nsamba", "ému", "calebasse", "boisson", "drink"], vinPalme),
  E("noix-de-kola", "Noix de kola", "Kola nuts", "nourriture", ["kola", "cola", "noix", "nuts", "goro", "hospitalité", "nigeria", "guinée"], noixKola),
  E("beignets", "Beignets", "Puff-puff", "nourriture", ["beignets", "puff-puff", "bofrot", "puff puff", "botokoin", "cameroun", "ghana", "nigeria"], beignets),
  E("mafe", "Mafé", "Maafe peanut stew", "nourriture", ["mafé", "maafe", "arachide", "peanut", "sauce", "stew", "sénégal", "mali"], mafe),
  E("ndole", "Ndolè", "Ndolé", "nourriture", ["ndolè", "ndole", "cameroun", "cameroon", "feuilles amères", "bitterleaf", "crevettes", "arachide"], ndole),
];
