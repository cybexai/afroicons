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

const okapi = [
  // pattes rayées (blanc et brun)
  ...[6.6, 8.8, 15, 17.2].map((x) => rect(x, 13.4, 1.7, 8, 0.8, C.cream) + rect(x, 20.2, 1.7, 1.6, 0.6, C.noir, { w: 0.8 })),
  line("M6.6 16.2H8.3M6.6 18.2H8.3M8.8 16.2H10.5M8.8 18.2H10.5M15 16.2H16.7M15 18.2H16.7M17.2 16.2H18.9M17.2 18.2H18.9", O, 0.8),
  path("M5.6 10Q11.5 8 18.5 9Q20.7 9.8 20.2 12.6Q19.6 15.2 16.4 15.2H8.2Q5.6 15.2 5.4 12.6Z", C.marron),
  line("M16.2 10.6V14.4M17.8 10.2V14.4M19.3 10.8V13.6", C.cream, 0.9),
  line("M20.2 10.6Q21.6 11.6 21.4 13.6", O, 0.9),
  path("M5.4 12L3.6 6.4L6.6 5.4L8.6 10.2Z", C.marron),
  path("M2.2 5.8Q3.6 3.6 6.8 4.4L7.2 6Q5.4 7.4 3.2 8.2Q1.6 8.4 1.4 7.2Q1.3 6.4 2.2 5.8Z", C.marron),
  path("M1.4 7.2Q1.6 8.4 3.2 8.2Q2.8 6.8 2.2 5.8Q1.3 6.4 1.4 7.2Z", C.sable, { w: 0.8 }),
  ellipse(6.6, 3.2, 0.9, 1.7, C.marron),
  ellipse(6.6, 3.4, 0.4, 1, C.sable, false),
  eye(4.6, 5.8),
].join("");

const scales = (y, x0, n, col) => line(`M${x0} ${y}` + "q1.5 1.9 3 0".repeat(n), col, 0.9);
const pangolin = [
  path("M3.6 15.8Q4.4 8.6 10.8 8Q16.4 7.6 18.8 11.8Q20.6 15.2 22.6 19.6Q19.8 20.4 17.6 17.8Q15.8 18.6 13.8 18.6H7.2Q4 18.6 3.6 15.8Z", C.bois),
  scales(10.6, 7.6, 3, C.marron),
  scales(13.4, 5.2, 4, C.marron),
  scales(16.2, 5.6, 4, C.marron),
  line("M18.4 13.2q1 1.4 1.6 1.2M19.6 16q0.9 1.2 1.6 1.2", C.marron, 0.9),
  line("M9 9.6q0.6 0.8 1.2 0.4M12.4 9.6q0.6 0.8 1.2 0.4", C.ocreLight, 0.7),
  path("M5 13.4Q2.4 14.2 1.4 17.4Q3.8 18.6 6 17Z", C.sable),
  eye(3.8, 15.2),
  rect(7, 17.6, 1.8, 2.8, 0.8, C.sable),
  rect(13.4, 17.6, 1.8, 2.8, 0.8, C.sable),
  line("M6 17.6Q11 18.8 17.4 17.8", O, W),
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
  thick("M8 20.2H22.4", C.bois, 1.4),
  path("M16.4 21.6L18.6 22.8L21.2 22.4L19.4 19.6Z", C.white),
  path("M12.6 9.6Q10.6 15 13.2 19.4Q16 21.4 19.6 20.2Q21 15 18 9.4Z", C.noir),
  path("M13.2 12.2Q12.6 16 14.4 18.4Q15.6 16 15.2 12Z", C.white, { w: 0.8 }),
  circle(15.2, 7, 3.6, C.noir),
  path("M12 6.4Q6.6 6 1.8 11Q7 9.8 12.2 9.4Z", C.ocreLight),
  path("M12 6.6Q9 3.6 5.2 5.8Q4.8 6.6 5.6 7Q8.8 5.8 11.8 7.6Z", C.ocre),
  line("M5.2 5.8Q4.6 7.4 6 7.6", C.terre, 0.8),
  path("M12.2 9.4Q7 9.8 1.8 11Q6.8 10.6 12 10.4", "none", { w: 0.8 }),
  circle(14.8, 6.8, 1.1, C.ocreLight, { w: 0.7 }),
  eye(14.8, 6.8, 0.5),
].join("");

const GOR = "#2E2A28", GOR_FACE = "#5E5650";
const gorille = [
  path("M12 2Q18.6 2 19.8 8.6Q21.8 10.8 20.6 14Q20 20.8 12 21.2Q4 20.8 3.4 14Q2.2 10.8 4.2 8.6Q5.4 2 12 2Z", GOR),
  ellipse(3.2, 12.4, 1.2, 1.6, GOR_FACE),
  ellipse(20.8, 12.4, 1.2, 1.6, GOR_FACE),
  path("M12 8.2Q17.4 6.6 17.8 10.6Q18.2 13.4 16.6 15.6Q15.6 19.4 12 19.4Q8.4 19.4 7.4 15.6Q5.8 13.4 6.2 10.6Q6.6 6.6 12 8.2Z", GOR_FACE),
  path("M6.6 10.2Q9 7.8 12 9.6Q15 7.8 17.4 10.2Q15 9.8 12 11Q9 9.8 6.6 10.2Z", GOR),
  circle(9.4, 11.6, 0.9, C.marron, { w: 0.6 }), circle(14.6, 11.6, 0.9, C.marron, { w: 0.6 }),
  eye(9.4, 11.7, 0.45), eye(14.6, 11.7, 0.45),
  path("M10 14.8Q10.2 12.6 12 12.6Q13.8 12.6 14 14.8Q12 15.8 10 14.8Z", "#4A433E", { w: 0.8 }),
  eye(11.1, 14.6, 0.45), eye(12.9, 14.6, 0.45),
  line("M9.6 17.2Q12 18.2 14.4 17.2", O, 0.9),
].join("");

const zebre = [
  path("M14.6 3.4Q19.6 3 21.2 9L22.6 21.6H13.6L12.6 16.8Q9.4 19 6.2 20.6Q3.6 21.4 2.8 19.6Q2.4 17.8 4.4 16.6L11 7Q12.2 3.8 14.6 3.4Z", C.white),
  line("M10.2 9.6Q11.8 10.6 12.8 10M8.6 12Q10.8 13.6 12.8 13M6.8 14.6Q9 16.2 11.4 15.8", O, 1),
  line("M14.4 9.6Q16.8 8.6 19.2 10M14 12.6Q17 11.6 19.8 13.2M13.8 15.6Q17 14.6 20.4 16.4M14 18.6Q17.4 17.6 20.8 19.4", O, 1),
  path("M14.2 3.4Q19.6 2.4 21.4 8.8L22.8 21.6H21L19.4 9.4Q18 5.6 14.4 5Z", C.noir),
  line("M15.6 3.6L16.2 2.4M17.6 4L18.6 3M19.2 5.4L20.4 4.8", O, 0.9),
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

const tacks = [0, 40, 80, 120, 160, 200, 240, 280, 320].map((a) => {
  const r = (a * Math.PI) / 180;
  return [12 + Math.cos(r) * 5.9, 16 + Math.sin(r) * 5.9];
});
const kora = g("rotate(-12 12 13)",
  thick("M8.4 11.4V8.6M15.6 11.4V8.6", C.bois, 0.8),
  rect(11.3, 0.6, 1.4, 12, 0.7, C.bois),
  line("M11.3 2.4H12.7M11.3 3.9H12.7M11.3 5.4H12.7M11.3 6.9H12.7M11.3 8.4H12.7", C.terre, 0.8),
  circle(12, 16, 6.6, C.ocre),
  circle(12, 16, 5.2, C.sable),
  dots(tacks, 0.35, O),
  line("M10.9 12.4L11.3 2.4M10.1 12.6L11.3 3.9M9.3 12.9L11.3 5.4M8.6 13.4L11.3 6.9M13.1 12.4L12.7 2.4M13.9 12.6L12.7 3.9M14.7 12.9L12.7 5.4M15.4 13.4L12.7 6.9", C.white, 0.45),
  rect(10.6, 12, 2.8, 5.6, 0.6, C.bois, { w: 0.9 }),
  line("M11.2 13.6H12.8M11.2 15H12.8M11.2 16.4H12.8", O, 0.5),
);

const masque = [
  path("M12 1.4Q18 1.8 18 9Q18 16 14.6 20.4Q13.2 22.6 12 22.6Q10.8 22.6 9.4 20.4Q6 16 6 9Q6 1.8 12 1.4Z", C.bois),
  line("M8.2 4.6L9.4 3.4L10.6 4.6L11.8 3.4L13 4.6L14.2 3.4L15.4 4.6", C.ocreLight, 0.9),
  path("M7.2 9Q9.4 6.6 12 9.4Q14.6 6.6 16.8 9Q14.6 8.6 12 10.8Q9.4 8.6 7.2 9Z", C.marron, { w: 0.8 }),
  path("M8 11.4Q9.5 10.2 11 11.4Q9.5 12.2 8 11.4Z", O, false),
  path("M13 11.4Q14.5 10.2 16 11.4Q14.5 12.2 13 11.4Z", O, false),
  path("M11.4 10.6L11 15.4Q12 16.2 13 15.4L12.6 10.6", C.bois, { w: 0.9 }),
  ellipse(12, 18.4, 1.2, 0.8, C.terreDark, { w: 0.8 }),
  line("M7.8 13.4L8.6 15.6M8.8 13.2L9.4 15M15.2 13.2L14.6 15M16.2 13.4L15.4 15.6", C.ocreLight, 0.8),
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

const grains = (pts) => dots(pts, 0.32, C.sable);
const attieke = [
  plate(),
  path("M3.4 15.4Q3.6 10.6 8 10Q11.8 9.8 12.4 13.6Q12.2 17 7.8 17.4Q3.8 17.4 3.4 15.4Z", C.cream),
  grains([[5.2, 13.6], [6.6, 12], [8.2, 11.2], [9.6, 12.6], [7.4, 14.2], [5.6, 15.6], [9, 15.4], [10.8, 14.2], [10.4, 11.8], [6.6, 16.4], [8.4, 13.2]]),
  path("M11.2 14.2Q14.2 10.4 19.4 11.4L21.6 9.4L21.4 13.8L20.4 13.4Q16 17.8 11.2 14.2Z", C.bois),
  path("M11.2 14.2Q14 13.2 20.4 13.4Q16 17.8 11.2 14.2Z", C.ocre, false),
  line("M14 11.6L15.4 15.2M16.4 11.2L17.6 14.8M18.4 11.4L19.2 13.8", C.marron, 0.8),
  eye(12.8, 13.4, 0.5),
  circle(6, 18.2, 1.8, C.rouge, { w: 0.9 }), circle(6, 18.2, 1, C.rose, false),
  ellipse(10, 18.8, 1.7, 1, "none", { c: C.violet, w: 0.8 }),
  ellipse(14, 18.4, 1.5, 0.9, "none", { c: C.violet, w: 0.8 }),
  path("M16.8 17.8L19.6 16.4", "none", { c: C.vert, w: 1.1 }),
].join("");

const plantain = (x, y, rot, rx = 2.2, ry = 1.3) => g(`rotate(${rot} ${x} ${y})`, ellipse(x, y, rx, ry, C.orange, { w: 0.9 }), ellipse(x, y - 0.1, rx * 0.66, ry * 0.55, C.ocreLight, false));
const jollof = [
  plate(),
  path("M3.6 15.6Q3.2 10.8 8.4 9.8Q13.6 9 15.2 12.8Q16 16.6 10.6 17.6Q4.6 18.2 3.6 15.6Z", RICE),
  line("M5.6 13.4L6.4 13.2M7.4 11.6L8.2 11.6M9.8 11L10.6 11.2M12.4 12L13 12.4M8.6 14.2L9.4 14.2M11.2 13.6L12 13.8M6.4 15.6L7.2 15.6M10.2 16L11 15.8M13.4 14.6L14 14.8", C.ocreLight, 0.7),
  dots([[7, 12.8], [11.4, 12.2], [9.2, 15.4], [12.8, 15.6]], 0.45, C.vertLight),
  plantain(16.6, 16.4, -25), plantain(18.4, 14.2, -40), plantain(13.8, 17.8, -10),
].join("");

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

const alloco = [
  plate(),
  plantain(6.4, 15.4, 20, 2.4, 1.5), plantain(10, 16.8, -15, 2.4, 1.5), plantain(9.2, 13.6, 35, 2.4, 1.5),
  plantain(13.4, 14, -30, 2.4, 1.5), plantain(12.6, 11.6, 10, 2.4, 1.5), plantain(7.6, 11.8, -20, 2.4, 1.5),
  ellipse(17.6, 15.6, 3, 1.8, C.white),
  ellipse(17.6, 15.3, 2.2, 1.1, C.rouge, { w: 0.7 }),
  dots([[17, 15], [18.2, 15.4]], 0.3, C.ocreLight),
  ellipse(15.8, 18.8, 1.4, 0.8, "none", { c: C.violet, w: 0.8 }),
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
const injera = [
  ellipse(12, 13.4, 10.6, 7.6, INJ),
  dots([[4.4, 12], [5.6, 15.6], [7.6, 18.2], [11, 19.6], [15.6, 19], [18.6, 17], [20, 13.6], [18.8, 9.6], [15.6, 7], [11.4, 6.6], [7.2, 7.6], [4.8, 9.6], [9.2, 15.2], [14.8, 15.6]], 0.35, INJ_HOLE),
  path("M9 9.8Q11.8 8 14.6 9.6Q15.6 12 12.6 13Q9.4 13.2 9 9.8Z", C.terreDark, { w: 0.9 }),
  ellipse(11.8, 10.6, 1.3, 0.9, C.white, { w: 0.6 }), circle(11.8, 10.6, 0.45, C.jaune, false),
  path("M5.2 12.2Q6.2 10 8.6 10.6Q9.6 12.8 7.4 13.8Q5.4 14 5.2 12.2Z", C.orange, { w: 0.9 }),
  path("M15.6 11.4Q17.6 9.6 19.4 11.2Q19.6 13.6 17.4 14Q15.4 13.6 15.6 11.4Z", C.vert, { w: 0.9 }),
  line("M16.4 12.4L17.6 11.4M17.4 13L18.6 11.8", C.vertLight, 0.6),
  path("M10.6 15Q12.2 13.8 13.8 15Q13.2 16.8 12 16.8Q10.6 16.6 10.6 15Z", C.cream, { w: 0.9 }),
  g("rotate(-8 7 18.4)", rect(4.4, 17.2, 5.4, 2.4, 1.2, INJ, { w: 0.9 }), ellipse(8.6, 18.4, 0.9, 1.1, INJ_HOLE, { w: 0.7 })),
  g("rotate(8 17 18.4)", rect(14.2, 17.2, 5.4, 2.4, 1.2, INJ, { w: 0.9 }), ellipse(15.4, 18.4, 0.9, 1.1, INJ_HOLE, { w: 0.7 })),
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
    ellipse(12, 12.5, 8.5, 2.8, LEAF_DARK),
    line("M5.4 11.8L6.8 11.2M9 12.2L10.4 11.6M12.8 12.4L14 11.8M16.4 12.2L17.8 11.6M11.4 10.4L12.4 10", C.vertLight, 0.7),
    shrimp(5.8, 11.2), shrimp(17.8, 11, -1), shrimp(10.8, 10.2),
    dots([[9.4, 12.4], [14.6, 10.8], [15.4, 12.4], [7.6, 12.4]], 0.45, "#D9B27A"),
  ].join("")),
  line("M4.6 15.6Q12 17.2 19.4 15.6", C.bleu, 0.9),
  line("M8.6 8.2Q7.8 6.4 8.8 4.8M15.4 8.2Q14.6 6.4 15.6 4.8", C.gris, 0.8),
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
  E("masque", "Masque africain", "African mask", "objets", ["masque", "mask", "bois", "wood", "sculpture", "art", "côte d'ivoire", "gabon"], masque),
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
