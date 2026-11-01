// Emojis africains originaux : plats d'Afrique de l'Est, de la Corne, du Nord, d'Afrique australe et de Madagascar (char: null).
// Chaque plat a son contenant et sa présentation (plateau, tajine, verre, pain, grille, feuille, poêle…) pour rester
// reconnaissable à 24 px ; l'ingrédient signature est dessiné en grand.
import { O, W, C, path, circle, ellipse, rect, line, g } from "./lib.mjs";

const thick = (d, col, w = 1.5) => line(d, O, w + 2 * W) + line(d, col, w);
const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const n2 = (v) => Math.round(v * 100) / 100;

const CHAP = "#E8B562", CHAP_SPOT = "#B7702E", CHAP_EDGE = "#D69A45";
const EGG = "#F6C744", MEAT = "#7E3A1C", MEAT_CHAR = "#4A2010";
const LEAF_DARK = "#2F5B2E";

/** Assiette vue de 3/4 haut, avec un liseré de couleur (émail, faïence). */
const plate34 = (rim = C.grisLight, fill = C.white) => ellipse(12, 16, 10.6, 5.8, fill) + ellipse(12, 16, 9.2, 4.7, "none", { c: rim, w: 0.8 });
/** Quartier de citron vu de côté. */
const lemon = (x, y, rot = 0, s = 1) => g(`rotate(${rot} ${x} ${y})`,
  path(`M${x - 2.6 * s} ${y}A${2.6 * s} ${2.6 * s} 0 0 0 ${x + 2.6 * s} ${y}Z`, C.jaune, { w: 0.9 }),
  path(`M${x - 1.9 * s} ${y + 0.2 * s}A${1.9 * s} ${1.9 * s} 0 0 0 ${x + 1.9 * s} ${y + 0.2 * s}Z`, "#FBE79A", false),
  line(`M${x} ${y + 0.3 * s}V${y + 1.9 * s}M${x} ${y + 0.3 * s}L${x - 1.3 * s} ${y + 1.3 * s}M${x} ${y + 0.3 * s}L${x + 1.3 * s} ${y + 1.3 * s}`, C.jauneShade, 0.5));
/** Petit piment rouge (bird's eye) avec sa queue verte. */
const chili = (x, y, rot = 0, s = 1) => g(`rotate(${rot} ${x} ${y})`,
  path(`M${x} ${y - 0.8 * s}Q${x + 3.2 * s} ${y - 0.9 * s} ${x + 4 * s} ${y + 0.8 * s}Q${x + 2.4 * s} ${y + 0.6 * s} ${x} ${y + 0.8 * s}Z`, C.rouge, { w: 0.8 }),
  line(`M${x} ${y}L${x - 1.2 * s} ${y - 0.4 * s}`, C.vert, 1));

/* ---------------- Afrique de l'Est et Corne ---------------- */

// Ugali : bloc blanc moulé (bords nets) ; sukuma wiki : chou vert émincé ; assiette émaillée à liseré bleu.
const ugaliSukuma = [
  plate34(C.bleu),
  path("M11.6 17.6Q11 13.2 13.4 11.2Q16 9.2 19 10.2Q22 11.6 21.6 15.4Q21 18.6 17 19.2Q13 19.4 11.6 17.6Z", C.feuille),
  line("M13.2 14.4Q15 12.6 17 13.2M15.2 16.8Q17.4 14.8 20 15.4M14.6 11.8Q16.8 10.6 19 11.6M13.4 17.6Q15.6 17 17.6 18", LEAF_DARK, 0.8),
  line("M14.2 15.6Q16 14.6 18 15M16.6 12.2Q18.6 12.2 20.2 13.4", C.vertLight, 0.8),
  rect(18.2, 16.2, 1.3, 1.1, 0.3, C.rouge, { w: 0.6 }), rect(14.4, 12.8, 1.2, 1.1, 0.3, C.rouge, { w: 0.6 }), rect(19.4, 12.6, 1.1, 1, 0.3, C.rouge, { w: 0.6 }),
  path("M2.6 17.2Q2.2 10.4 5 7.6Q8.2 5 11.8 6.8Q14.8 8.6 14.6 17.4Q8.6 19.4 2.6 17.2Z", "#F7F2E4"),
  path("M11.6 7.4Q14.4 9.4 14.2 17.5Q13 17.9 12 18Q13.2 12 11.6 7.4Z", "#E4DCC6", false),
  ellipse(6.4, 9.4, 1.6, 1, C.white, false),
  line("M7.8 12.6Q9 13.6 10.4 12.8", "#D9CFB6", 0.8),
  path("M2.6 17.2Q2.2 10.4 5 7.6Q8.2 5 11.8 6.8Q14.8 8.6 14.6 17.4Q8.6 19.4 2.6 17.2Z", "none"),
].join("");

// Nyama choma : morceaux de chèvre grillés (marques de grill, os) sur une planche, kachumbari tomate-oignon.
const meat = (x, y, rx, ry, rot) => g(`rotate(${rot} ${x} ${y})`,
  ellipse(x, y, rx, ry, MEAT),
  ellipse(x - rx * 0.3, y - ry * 0.45, rx * 0.45, ry * 0.25, "#A5552C", false),
  line(`M${x - rx * 0.55} ${y - ry * 0.75}L${x - rx * 0.15} ${y + ry * 0.75}M${x} ${y - ry * 0.85}L${x + rx * 0.4} ${y + ry * 0.75}M${x + rx * 0.45} ${y - ry * 0.7}L${x + rx * 0.75} ${y + ry * 0.4}`, MEAT_CHAR, 0.9));
const nyamaChoma = [
  path("M1.4 13.2L17.6 9.4Q19.6 9 20.2 10.8L22.6 18Q23 19.8 21.2 20.2L4.6 22.6Q2.8 22.8 2.4 21Z", C.bois),
  line("M3.4 15.4L18.4 11.8M4.2 20.4L20.6 17.4", "#C98A55", 0.6),
  path("M14.6 6.4Q14.4 5 15.6 5Q16.8 5.2 16.4 6.4L15.6 9.6L14 9.4Z", C.cream, { w: 0.9 }),
  meat(11.6, 11.8, 4.4, 3.2, -10),
  meat(6.8, 16.4, 4.6, 3.4, 8),
  path("M8.8 19.4L4.4 21.6Q3.4 22.2 3 21.2Q2.8 20.2 3.8 20L8 18.4Z", C.cream, { w: 0.9 }),
  path("M13.2 17.6Q13.4 14.6 17.4 14.2Q21.4 14.4 21.4 17.4Q20.6 20 17.2 20.1Q13.6 20 13.2 17.6Z", "#E7D7C1", { w: 0.9 }),
  rect(14.4, 15.6, 1.6, 1.4, 0.4, C.rouge, { w: 0.6 }), rect(17.6, 15, 1.6, 1.4, 0.4, C.rouge, { w: 0.6 }), rect(16.2, 17.6, 1.6, 1.4, 0.4, C.rouge, { w: 0.6 }),
  rect(19, 17.2, 1.4, 1.2, 0.4, C.white, { w: 0.6 }), rect(15.4, 18.6, 1.2, 1, 0.3, C.white, { w: 0.5 }),
  dots([[16.6, 16.4], [19.2, 15.8], [14.6, 18], [18.4, 18.8]], 0.35, C.vertLight),
  chili(18.2, 7.4, 20, 0.9),
].join("");

// Pilau : dôme de riz brun aux épices, viande, bâton de cannelle et cardamome ; plat à liseré ocre.
const PILAU = "#A8652C";
const pilau = [
  plate34(C.ocre),
  path("M2.8 16.6Q3 9.4 8.6 6.2Q12 4.4 15.4 6.2Q21 9.4 21.2 16.6Q12 20.4 2.8 16.6Z", PILAU),
  line("M5.4 13.6L6.4 13.2M7.6 10L8.6 9.6M10.6 7.4L11.6 7.4M14.4 7.8L15.2 8.2M16.8 10.6L17.6 11.2M18.4 14.6L19.2 15.2M8.2 16.6L9.2 16.8M12.2 17.4L13.2 17.4M15.6 16.8L16.6 16.6M10.4 12.2L11.4 12.4M6 16L7 16.2", "#D9A562", 0.8),
  rect(5.6, 10.6, 3, 2.6, 0.9, "#5E2E14", { w: 0.9 }),
  rect(12.8, 12.6, 3.2, 2.6, 0.9, "#5E2E14", { w: 0.9 }),
  rect(8.6, 14.4, 2.8, 2.4, 0.9, "#5E2E14", { w: 0.9 }),
  g("rotate(-28 13 8.4)", rect(8.6, 7.6, 8.8, 1.6, 0.8, "#8A4A22", { w: 0.9 }), line("M9.6 8.4H16.4", "#B86E3A", 0.5), ellipse(17.2, 8.4, 0.5, 0.8, "#B86E3A", { w: 0.6 })),
  ellipse(17.8, 12.4, 1.2, 0.7, "#8DBF5A", { w: 0.7 }), ellipse(6.6, 14.6, 1.2, 0.7, "#8DBF5A", { w: 0.7 }),
  dots([[11.4, 10.8], [16.4, 15.2], [7.8, 8.6]], 0.4, C.vertLight),
].join("");

// Chapati : pile de galettes feuilletées, celle du dessus pliée en quart ; taches de cuisson.
const chapDisc = (y, col = CHAP) => ellipse(12, y, 10, 3.8, col);
const chapati = [
  chapDisc(18.2, CHAP_EDGE), chapDisc(16.4), chapDisc(14.6, CHAP_EDGE), chapDisc(12.8),
  dots([[5.4, 13.6], [17.8, 11.8], [19.2, 14], [14.4, 15.2]], 0.45, CHAP_SPOT),
  path("M4.6 13.4L8.2 3.8Q15.6 3.2 20 10.6Z", "#F0C578"),
  line("M8.2 3.8Q15.6 3.2 20 10.6", "#C98A3E", 0.6),
  line("M5.6 12.6L8.8 5.4M6.6 12.4L13.6 5.2", "#D69A45", 0.6),
  path("M4.6 13.4L8.2 3.8Q15.6 3.2 20 10.6Z", "none"),
  dots([[10.4, 6], [13.8, 7], [16.4, 8.8], [11.6, 9.2], [8.4, 9.4], [15.2, 10.6]], 0.5, CHAP_SPOT),
  ellipse(10, 7.4, 0.8, 0.5, "#FBE0A8", false),
].join("");

// Mandazi : coussinets carrés gonflés, dorés, sur un plateau tressé ; un morceau ouvert montre la mie.
const MZ = "#C9792B", MZ_TOP = "#E3A04A";
const mandaz = (x, y, rot, s = 1) => g(`rotate(${rot} ${x} ${y})`,
  path(`M${x - 3.4 * s} ${y - 1.4 * s}Q${x - 3.6 * s} ${y - 3 * s} ${x - 1.8 * s} ${y - 3 * s}H${x + 1.8 * s}Q${x + 3.6 * s} ${y - 3 * s} ${x + 3.4 * s} ${y - 1.4 * s}L${x + 3.4 * s} ${y + 1.4 * s}Q${x + 3.4 * s} ${y + 3 * s} ${x + 1.8 * s} ${y + 3 * s}H${x - 1.8 * s}Q${x - 3.4 * s} ${y + 3 * s} ${x - 3.4 * s} ${y + 1.4 * s}Z`, MZ),
  ellipse(x - 0.4 * s, y - 0.8 * s, 2.2 * s, 1.4 * s, MZ_TOP, false),
  ellipse(x - 1.2 * s, y - 1.4 * s, 0.8 * s, 0.4 * s, "#F6CE7E", false));
const mandazi = [
  ellipse(12, 17.2, 10.8, 4.8, C.ocre),
  ellipse(12, 16.8, 9, 3.6, "none", { c: C.bois, w: 0.7 }),
  line("M3.4 18.6L4.6 17.6M6.4 20.2L7.4 19.2M10.4 21L11.2 20M14.6 21L15.2 20M18.4 20L18.8 19M20.8 18L21.2 17.2", C.bois, 0.7),
  mandaz(7.6, 8.6, -12), mandaz(16.4, 8.2, 14),
  mandaz(6.6, 14.6, 10), mandaz(12.4, 12.2, -4, 1.05),
  // morceau ouvert : mie claire alvéolée
  path("M15.4 15.4Q15.4 12.8 18 12.8H19.6Q21.4 13 21.4 15.2V16.8Q21.2 18.6 19.4 18.6H17.4Q15.4 18.6 15.4 16.6Z", MZ),
  path("M16.4 15.6Q16.6 14 18.2 13.8H19.6Q20.4 14.2 20.4 15.4V16.6Q20.2 17.6 19.2 17.6H17.6Q16.4 17.4 16.4 16.4Z", "#FBE8C4", { w: 0.6 }),
  dots([[17.6, 15.2], [19.2, 15.8], [18.2, 16.8], [19.6, 14.6]], 0.3, "#E3C28A"),
].join("");

// Sambusa : deux triangles feuilletés debout, plis visibles, petit bol de chutney vert et quartier de citron.
const SAMB = "#E8B04A", SAMB_D = "#C98A2E";
const tri = (ax, ay, bx, cx, by) => [
  path(`M${ax - 0.6} ${ay + 0.8}Q${ax} ${ay - 0.4} ${ax + 0.6} ${ay + 0.8}L${cx - 0.2} ${by - 0.8}Q${cx + 0.2} ${by + 0.4} ${cx - 1} ${by + 0.4}H${bx + 1}Q${bx - 0.2} ${by + 0.4} ${bx + 0.2} ${by - 0.8}Z`, SAMB),
  path(`M${ax + 0.6} ${ay + 0.8}L${cx - 0.2} ${by - 0.8}Q${cx + 0.2} ${by + 0.4} ${cx - 1} ${by + 0.4}H${(ax + cx) / 2}Z`, SAMB_D, false),
  line(`M${ax} ${ay + 0.6}L${(ax + cx) / 2} ${by + 0.3}M${bx + 1.6} ${by - 1.2}L${(ax + bx) / 2 + 1.2} ${(ay + by) / 2 + 0.6}`, "#B37A28", 0.7),
  dots([[(ax + bx) / 2 + 0.6, by - 2.4], [ax - 0.6, ay + 5], [(ax + cx) / 2 + 1.2, by - 4]], 0.35, "#F6D58A"),
  path(`M${ax - 0.6} ${ay + 0.8}Q${ax} ${ay - 0.4} ${ax + 0.6} ${ay + 0.8}L${cx - 0.2} ${by - 0.8}Q${cx + 0.2} ${by + 0.4} ${cx - 1} ${by + 0.4}H${bx + 1}Q${bx - 0.2} ${by + 0.4} ${bx + 0.2} ${by - 0.8}Z`, "none"),
].join("");
const sambusa = [
  ellipse(12, 19.6, 10.6, 2.6, C.white),
  tri(15.4, 3.4, 9.8, 21.6, 17.8),
  tri(8.4, 4.6, 1.8, 15, 19.8),
  ellipse(18.2, 19.8, 3.4, 1.6, C.white, { w: 0.9 }),
  ellipse(18.2, 19.6, 2.6, 1, "#4FA36F", { w: 0.6 }),
  dots([[17.4, 19.6], [19, 19.4]], 0.3, LEAF_DARK),
].join("");

// Matoke : purée de bananes plantains vertes sur feuille de bananier, deux bananes vertes entières derrière.
const MATOKE = "#E9C65A";
const greenBanana = (x, y, rot) => g(`rotate(${rot} ${x} ${y})`,
  path(`M${x - 7} ${y + 0.4}Q${x} ${y - 4} ${x + 7} ${y - 0.6}Q${x + 7.6} ${y + 0.4} ${x + 6.6} ${y + 0.8}Q${x} ${y - 1.6} ${x - 6.4} ${y + 1.8}Q${x - 7.4} ${y + 1.4} ${x - 7} ${y + 0.4}Z`, C.vertLight),
  line(`M${x - 5.4} ${y + 0.6}Q${x} ${y - 2.2} ${x + 5.6} ${y - 0.2}`, C.vert, 0.6),
  circle(x + 7, y - 0.2, 0.5, MEAT_CHAR, false));
const matoke = [
  path("M0.8 15.4Q5 9.4 12.4 9.4Q19.6 9.6 23.2 15Q18.6 21.8 12 21.8Q5 21.6 0.8 15.4Z", C.feuille),
  line("M1.8 15.4Q12 14.4 22.2 15.2", LEAF_DARK, 0.9),
  line("M4.4 12.4L6.8 15M8 10.6L10 14.8M15.6 10.4L14.2 14.8M19.4 11.8L17.6 15M4.6 18.6L7.4 15.6M9.6 20.6L11 15.6M15.4 20.6L14.4 15.6M19.6 18.4L17.4 15.6", C.vertLight, 0.6),
  greenBanana(11, 6.4, -6), greenBanana(13.2, 8.4, 4),
  path("M4.8 16.4Q4.6 11.8 8.6 11Q10.4 9.6 12.6 10.2Q15.2 9.8 16.6 11.4Q19.6 12.4 19.4 16.4Q12 19.6 4.8 16.4Z", MATOKE),
  path("M6.6 13.6Q8 12 10 12.4M12.6 11.8Q14.6 11.4 16.4 12.8M9 15.6Q11 14.6 13.6 15.4", "none", { c: "#C9A23A", w: 0.8 }),
  ellipse(9.4, 12.6, 1.4, 0.6, "#F6E39A", false),
].join("");

// Rolex : chapati roulé autour d'une omelette (chou, tomate), coupé : spirale visible ; papier d'emballage.
const rolex = g("rotate(-14 12 13)",
  path("M3.6 7.2H15.4V18.8H3.6Q1.2 18.8 1.2 13Q1.2 7.2 3.6 7.2Z", CHAP),
  dots([[4.4, 9.4], [8, 8.6], [11.6, 9.6], [6.2, 11.2], [10, 11.6]], 0.45, CHAP_SPOT),
  path("M1.6 15.4L11.6 14.4L12.2 20.6L3.8 20.2Q1.6 19.8 1.6 15.4Z", C.white, { w: 0.9 }),
  line("M2.2 17.2L11.8 16.6", C.rouge, 0.8),
  ellipse(15.6, 13, 5.4, 5.8, CHAP_EDGE),
  ellipse(15.6, 13, 4.5, 4.9, EGG, { w: 0.6 }),
  ellipse(15.8, 13, 3.4, 3.7, CHAP, { w: 0.6 }),
  ellipse(15.9, 13, 2.5, 2.7, EGG, { w: 0.6 }),
  ellipse(16, 13, 1.3, 1.4, CHAP, { w: 0.6 }),
  dots([[13.2, 10.6], [18.4, 14.8], [16.6, 9.6]], 0.45, C.rouge),
  dots([[14, 15.6], [18.6, 11.2], [13.4, 12.8]], 0.45, C.vertLight),
);

// Doro wat : ragoût de poulet rouge sombre (berbéré) dans un pot en terre sur pied, œuf dur coupé, pilon.
const DORO = "#8E2216";
const doroWat = [
  path("M8.4 19.2L7.4 22H16.6L15.6 19.2Z", "#4A2A1C"),
  path("M2 11.6H22Q21.6 19.8 12 19.8Q2.4 19.8 2 11.6Z", "#5E3626"),
  line("M3.6 14.6L5 16L6.4 14.6L7.8 16L9.2 14.6L10.6 16L12 14.6L13.4 16L14.8 14.6L16.2 16L17.6 14.6L19 16L20.4 14.6", C.ocre, 0.7),
  ellipse(12, 11.6, 10, 2.8, "#4A2A1C"),
  path("M3 11.8Q3.8 6.8 12 6.6Q20.2 6.8 21 11.8Q12 14.6 3 11.8Z", DORO),
  path("M5.4 10.4Q7 8.6 9.6 8.6", "none", { c: "#C9452A", w: 0.8 }),
  dots([[17.8, 11.4], [5.8, 11.8], [14.6, 12.4]], 0.5, "#D9661F"),
  // pilon de poulet
  g("rotate(-35 16.4 8.6)", ellipse(15.6, 8.8, 3.4, 2.2, "#9A3A1E"), path("M18.6 8.2H21.4Q22.4 7.6 22.6 8.8Q22.4 10 21.4 9.4H18.6Z", C.cream, { w: 0.8 }), ellipse(14.6, 8.2, 1.4, 0.6, "#C25A30", false)),
  // œuf dur coupé
  ellipse(8.8, 9, 3.2, 2.4, C.white),
  circle(8.8, 9, 1.3, EGG, { w: 0.7 }),
  ellipse(7.6, 7.8, 0.9, 0.4, C.white, false),
  line("M10.6 4.8Q10 3.6 10.8 2.4M14 5Q13.4 3.8 14.2 2.6", C.gris, 0.8),
].join("");

/* ---------------- Afrique du Nord ---------------- */

// Couscous : dôme de semoule dans un gsaa (plat en bois), carottes, courgettes, pois chiches et viande au sommet.
const SEMOULE = "#EBC867";
const carrot = (x, y, rot, len = 4) => g(`rotate(${rot} ${x} ${y})`, path(`M${x - len} ${y}Q${x - len} ${y - 1.1} ${x - len + 1} ${y - 1.1}L${x + len} ${y - 0.3}Q${x + len + 0.4} ${y} ${x + len} ${y + 0.3}L${x - len + 1} ${y + 1.1}Q${x - len} ${y + 1.1} ${x - len} ${y}Z`, C.orange, { w: 0.8 }));
const zuc = (x, y, rot) => g(`rotate(${rot} ${x} ${y})`, ellipse(x, y, 1.9, 1.2, C.vert, { w: 0.8 }), ellipse(x, y - 0.1, 1.3, 0.7, "#CFE3A6", false));
const couscous = [
  ellipse(12, 17.6, 11.2, 4.8, C.bois),
  ellipse(12, 17.2, 9.8, 3.8, "none", { c: C.marron, w: 0.7 }),
  path("M2.6 17.4Q4.8 9.6 9.2 6.4Q12 4.6 14.8 6.4Q19.2 9.6 21.4 17.4Q12 20.6 2.6 17.4Z", SEMOULE),
  dots([[5, 15.8], [7, 13.2], [9.2, 17.4], [16.4, 17.6], [19, 15.4], [17.4, 12.4], [11, 14.6], [13.8, 16.6], [6.2, 17.2]], 0.35, "#C99A3A"),
  carrot(7.6, 11.6, -55, 3.6), carrot(16.4, 11.6, 55, 3.6), carrot(12.4, 12.8, -95, 3.4),
  zuc(8.2, 15.6, -20), zuc(16, 15.8, 20), zuc(12, 17.6, 0),
  circle(5.4, 16.6, 0.9, "#E0A24A", { w: 0.7 }), circle(18.8, 16.8, 0.9, "#E0A24A", { w: 0.7 }), circle(10.2, 10.6, 0.9, "#E0A24A", { w: 0.7 }), circle(14.2, 15, 0.9, "#E0A24A", { w: 0.7 }),
  path("M9.8 6.8Q9.6 4.4 12 4.2Q14.4 4.4 14.2 6.8Q12 8 9.8 6.8Z", MEAT),
  ellipse(11.2, 5.2, 0.9, 0.4, "#A5552C", false),
].join("");

// Tajine : couvercle conique soulevé, poulet aux olives vertes et citron confit dans le plat en terre.
const TAJ = "#C24E2A", TAJ_D = "#9A3A1E";
const tajinePlat = [
  path("M1.8 17.4Q2.6 21.8 12 21.8Q21.4 21.8 22.2 17.4Z", TAJ_D),
  ellipse(12, 17.4, 10.4, 3.4, TAJ),
  ellipse(12, 17.2, 8.6, 2.5, TAJ_D, { w: 0.7 }),
  path("M4.4 17.6Q4.8 12.8 12 12.6Q19.2 12.8 19.6 17.6Q12 19.8 4.4 17.6Z", "#D9A23E"),
  ellipse(10, 14.4, 2, 0.8, "#EFC56A", false),
  circle(7.2, 16.4, 1, C.vertLight, { w: 0.7 }), circle(16.4, 15.4, 1, C.vertLight, { w: 0.7 }), circle(12.6, 17.4, 1, C.vertLight, { w: 0.7 }),
  circle(13.4, 14, 1.5, C.jaune, { w: 0.7 }), line("M12.2 14H14.6M13.4 12.8V15.2", C.jauneShade, 0.5),
  circle(9.4, 16.8, 1.3, C.jaune, { w: 0.7 }), line("M8.4 16.8H10.4M9.4 15.8V17.8", C.jauneShade, 0.5),
  line("M8.4 11.4Q7.8 10.2 8.6 9M11.4 11Q10.8 9.8 11.6 8.6", C.gris, 0.8),
  g("rotate(16 15.6 6.6)",
    path("M9.6 10.4Q12.6 7.4 14.8 1.6Q15.6 0.8 16.4 1.6Q18.6 7.4 21.6 10.4Z", TAJ),
    path("M15.6 1.4Q17.6 6.8 21.6 10.4H18.2Q16.6 6.4 15.6 1.4Z", TAJ_D, false),
    line("M11.6 8.6H19.6M13 6.4H18.2", C.ocreLight, 0.8),
    path("M9.6 10.4Q12.6 7.4 14.8 1.6Q15.6 0.8 16.4 1.6Q18.6 7.4 21.6 10.4Z", "none"),
    ellipse(15.6, 10.4, 6.2, 1.2, TAJ_D),
    circle(15.6, 1.4, 0.9, C.ocre, { w: 0.8 })),
].join("");

// Harira : soupe tomate-lentilles dans un bol de Fès (bleu et blanc), cuillère en bois, quartier de citron.
const HARIRA = "#C9452A";
const harira = [
  path("M2.4 11.4H21.6Q21.2 19.8 12 19.8Q2.8 19.8 2.4 11.4Z", C.white),
  line("M4 14.4Q5.4 13.2 6.8 14.4T9.6 14.4T12.4 14.4T15.2 14.4T18 14.4T20.4 14.2", C.bleu, 0.9),
  dots([[5.6, 16.4], [8.4, 17.6], [12, 18], [15.6, 17.6], [18.4, 16.4]], 0.5, C.bleu),
  line("M8 21.2H16", O, W),
  ellipse(12, 11.4, 9.6, 3, HARIRA),
  ellipse(12, 11.2, 7.6, 2, "#D9603A", false),
  circle(8, 11.2, 0.75, "#E9C27A", { w: 0.6 }), circle(14.6, 12.2, 0.75, "#E9C27A", { w: 0.6 }), circle(11, 12.6, 0.75, "#E9C27A", { w: 0.6 }),
  dots([[10, 10.4], [13, 10.2], [16.6, 11], [6.4, 12], [12, 11.4]], 0.4, "#7A3A1E"),
  dots([[9.2, 12.2], [15.4, 10.4], [5.6, 10.8], [17.8, 12.2]], 0.45, C.vertLight),
  thick("M14.6 10.4L20.4 2.8", C.bois, 1.2),
  g("rotate(-52 15.2 10)", ellipse(15.2, 10, 1.9, 1.2, C.bois, { w: 0.9 })),
  line("M6.6 8.2Q6 7 6.8 5.8M10 7.8Q9.4 6.6 10.2 5.4", C.gris, 0.8),
  lemon(3.6, 20.2, -10, 0.85),
].join("");

// Msemen : deux crêpes carrées feuilletées empilées (vue de 3/4), plis en carré, filet de miel.
const MSM = "#E9B15A", MSM_D = "#C98A3E";
const square = (cx, cy, hw, hh, th) => [
  path(`M${cx - hw} ${cy}L${cx} ${cy + hh}L${cx + hw} ${cy}V${cy + th}L${cx} ${cy + hh + th}L${cx - hw} ${cy + th}Z`, MSM_D),
  line(`M${cx - hw + 0.6} ${cy + th * 0.5}L${cx} ${cy + hh + th * 0.5}L${cx + hw - 0.6} ${cy + th * 0.5}`, "#A8692A", 0.5),
  path(`M${cx} ${cy - hh}L${cx + hw} ${cy}L${cx} ${cy + hh}L${cx - hw} ${cy}Z`, MSM),
  line(`M${cx} ${cy - hh * 0.5}L${cx + hw * 0.5} ${cy}L${cx} ${cy + hh * 0.5}L${cx - hw * 0.5} ${cy}Z`, MSM_D, 0.7),
  line(`M${cx - hw * 0.5} ${cy - hh * 0.5}L${cx + hw * 0.5} ${cy + hh * 0.5}`, "#D89A48", 0.6),
].join("");
const msemen = [
  square(12.6, 15, 9.6, 5.2, 1.6),
  square(11.4, 9.6, 9.4, 5.2, 1.6),
  dots([[7.2, 9.4], [11.4, 6.6], [15, 9.8], [11.6, 12.4], [9, 11.4], [13.8, 7.6]], 0.45, "#A8692A"),
  thick("M6.4 9.4L9 8L10.4 10.6L13 8.6L14.4 11.2L16.8 9.6", "#E39A1E", 0.9),
  line("M14.4 11.2Q14.6 13.4 14.2 14.6", O, 2.6), line("M14.4 11.2Q14.6 13.4 14.2 14.6", "#E39A1E", 0.9),
].join("");

// Pastilla : tourte ronde feuilletée, dessus de sucre glace et croisillons de cannelle, amandes.
const PAST = "#D9953A";
const lattice = (() => {
  const cx = 12, cy = 10.6, rx = 8.4, ry = 3.7, out = [];
  for (const sgn of [1, -1]) for (const k of [-6, -2, 2, 6]) {
    // droite x = cx + k + t, y = cy + sgn * 0.46 * t ; intersections avec l'ellipse
    const A = 1 / rx ** 2 + (0.46 ** 2) / ry ** 2, B = 2 * k / rx ** 2, Cc = k ** 2 / rx ** 2 - 1, D = B * B - 4 * A * Cc;
    if (D <= 0) continue;
    const t1 = (-B - Math.sqrt(D)) / (2 * A), t2 = (-B + Math.sqrt(D)) / (2 * A);
    out.push(`M${n2(cx + k + t1)} ${n2(cy + sgn * 0.46 * t1)}L${n2(cx + k + t2)} ${n2(cy + sgn * 0.46 * t2)}`);
  }
  return line(out.join(""), "#8A4A22", 0.9);
})();
const pastilla = [
  ellipse(12, 17.2, 11.2, 4.4, C.white),
  ellipse(12, 17, 9.8, 3.6, "none", { c: C.bleu, w: 0.7 }),
  path("M2 10.6V14.8Q2 19.4 12 19.4Q22 19.4 22 14.8V10.6Z", PAST),
  line("M3.4 14.6Q12 18 20.6 14.6M3 12.6Q12 16 21 12.6", "#B8742E", 0.6),
  ellipse(12, 10.6, 10, 4.6, "#F3E3C4"),
  ellipse(12, 10.4, 9, 3.9, "#FFFBF2", false),
  lattice,
  dots([[12, 10.6], [8, 10.6], [16, 10.6], [12, 8.8], [12, 12.4]], 0.6, "#D9A55E"),
].join("");

// Thé à la menthe : théière en argent qui verse de haut dans un verre décoré, feuilles de menthe.
const SILVER = "#C9CED3", SILVER_D = "#9AA3AB", TEA = "#C77A22";
const theMenthe = [
  // filet de thé
  thick("M14.4 7.6Q15.6 9 15.8 13", TEA, 0.9),
  // théière
  g("rotate(10 6.6 11)",
    line("M3.4 9Q0.6 9.4 1.4 12.6Q2 14.4 3.8 13.6", O, 3), line("M3.4 9Q0.6 9.4 1.4 12.6Q2 14.4 3.8 13.6", SILVER_D, 1.1),
    thick("M9.4 13Q12.4 12.6 13.6 6.4", SILVER, 1.3),
    path("M4.2 15.2H9L9.8 16.4H3.4Z", SILVER_D),
    path("M3 11.6Q3 7.8 6.6 7.8Q10.2 7.8 10.2 11.6Q10.2 15.4 6.6 15.4Q3 15.4 3 11.6Z", SILVER),
    line("M3.4 11.2H9.8", SILVER_D, 0.7),
    ellipse(5, 10, 0.9, 0.6, C.white, false),
    path("M4.6 8.2Q4.8 5.8 6.6 4.4Q8.4 5.8 8.6 8.2Z", SILVER),
    circle(6.6, 3.8, 0.7, SILVER_D, { w: 0.7 })),
  // verre
  path("M11.4 12.4H20.6L19.6 21.4Q19.5 22.2 18.6 22.2H13.4Q12.5 22.2 12.4 21.4Z", "#EAF4FA"),
  path("M11.9 14.6H20.1L19.4 21Q19.3 21.6 18.6 21.6H13.4Q12.7 21.6 12.6 21Z", TEA, false),
  path("M11.6 13.6H20.4L20.2 15.6H11.8Z", C.ocre, { w: 0.6 }),
  dots([[13.4, 14.6], [16, 14.6], [18.6, 14.6]], 0.4, C.rouge),
  line("M13.6 17L14 20.6", "#E9A85A", 0.7),
  path("M11.4 12.4H20.6L19.6 21.4Q19.5 22.2 18.6 22.2H13.4Q12.5 22.2 12.4 21.4Z", "none"),
  // menthe
  path("M17 12.6Q17.4 9.6 20 8.8Q21 11.6 17.6 12.8Z", C.feuille, { w: 0.8 }),
  path("M18 12.6Q20.6 11.6 22.4 12.6Q21 14.4 18.2 13.2Z", C.vertLight, { w: 0.8 }),
  path("M16.6 12.6Q14.6 10.8 15 8.8Q17.4 9.8 17.2 12.4Z", C.vertLight, { w: 0.8 }),
  line("M17.4 12.6L19.4 9.6", LEAF_DARK, 0.5),
].join("");

// Koshari : riz-lentilles, macaronis, sauce tomate et oignons frits croustillants, pois chiches, en bol profond.
const KOSH = "#A0703A";
const macaroni = (x, y, rot) => g(`rotate(${rot} ${x} ${y})`, rect(x - 0.9, y - 0.5, 1.8, 1, 0.5, "#F2D48A", { w: 0.55 }), ellipse(x + 0.9, y, 0.25, 0.4, "#C99A3A", false));
const koshari = [
  path("M2.4 11.6H21.6Q21.2 20 12 20Q2.8 20 2.4 11.6Z", C.white),
  line("M2.8 14.2Q12 16.4 21.2 14.2", C.terre, 1.2),
  line("M8 21.4H16", O, W),
  path("M2.6 11.8Q3.4 7.4 12 7.2Q20.6 7.4 21.4 11.8Q12 14.6 2.6 11.8Z", KOSH),
  dots([[4.8, 11.6], [7, 12.6], [17.4, 12.6], [19.6, 11.4], [10.6, 13]], 0.35, "#E9D7B0"),
  macaroni(5.4, 10.4, 20), macaroni(8, 12.2, -30), macaroni(16.4, 12.4, 30), macaroni(18.8, 10.2, -20), macaroni(13.6, 13, 10), macaroni(7.6, 8.8, -10), macaroni(17, 8.8, 15),
  path("M8.4 10.4Q8.6 7.8 12 7.6Q15.4 7.8 15.6 10.4Q12 12.4 8.4 10.4Z", "#C9301E", { w: 0.9 }),
  ellipse(11, 8.8, 1.2, 0.5, "#E9603A", false),
  line("M9.6 8.4Q10.6 7.2 11.6 8.2M12.4 8Q13.6 6.8 14.6 8M10.8 9.8Q12 8.8 13 9.8", "#5A2A0E", 1.3),
  line("M9.6 8.4Q10.6 7.2 11.6 8.2M12.4 8Q13.6 6.8 14.6 8M10.8 9.8Q12 8.8 13 9.8", "#B86A2A", 0.5),
  circle(5.6, 12.4, 0.8, "#E3B04B", { w: 0.6 }), circle(18.2, 11.4, 0.8, "#E3B04B", { w: 0.6 }), circle(14.6, 11.4, 0.8, "#E3B04B", { w: 0.6 }),
].join("");

// Ful medames : fèves à l'huile d'olive, œuf, cumin et persil dans un bol en métal, pain baladi derrière.
const BALADI = "#D9A55E";
const fulMedames = [
  g("rotate(-14 8.6 8)",
    ellipse(8.6, 9.6, 7.4, 3.4, "#B97A3A"),
    ellipse(8.6, 8, 7.4, 3.4, BALADI),
    ellipse(8.6, 6.6, 7.2, 3.2, BALADI),
    path("M3.4 6Q6 4.2 9.6 4.4", "none", { c: "#F0C887", w: 0.9 }),
    dots([[5, 7], [7.6, 5.2], [11, 5.6], [12.6, 7.6], [9.4, 8], [6.4, 8.4]], 0.35, "#9A6A32")),
  path("M5.4 13.2H22.4Q22 21.6 13.9 21.6Q5.8 21.6 5.4 13.2Z", SILVER),
  path("M18.6 14.4Q20.8 14.8 21.2 15.4Q20.4 19.6 16.6 20.4", "none", { c: C.white, w: 0.8 }),
  ellipse(13.9, 13.2, 8.5, 2.8, SILVER_D),
  ellipse(13.9, 13.1, 7.4, 2.2, "#7A4524", { w: 0.7 }),
  ...[[8.6, 13.2], [10.8, 12.2], [16.6, 12.2], [19, 13.2], [13.6, 14.4], [17.2, 14.2], [10.6, 14.2]].map(([x, y]) => ellipse(x, y, 0.9, 0.55, "#A86234", { w: 0.5 })),
  path("M12 13Q13.8 11.4 16 12.6Q15.6 14 13.6 14Q12.2 13.8 12 13Z", "#C9B13A", { w: 0.6 }),
  ellipse(14.6, 10.8, 2.4, 1.7, C.white, { w: 0.9 }), circle(14.6, 10.8, 1, EGG, { w: 0.6 }),
  dots([[9.4, 12.8], [18.4, 12.8], [12, 14.4]], 0.4, C.vertLight),
  dots([[11, 13.2], [17.8, 13.6]], 0.3, "#5A2A0E"),
].join("");

// Brik : grand triangle de feuille de brick croustillante, jaune d'œuf coulant, citron et persil, sur assiette.
const BRIK = "#E3A43A";
const brik = [
  plate34(C.grisLight),
  path("M2.4 17Q2.4 15.6 3.8 14.8L17.2 5.2Q19.4 3.8 19.8 6.2L20.8 17.4Q20.8 19.6 18.8 19.6H5Q2.4 19.4 2.4 17Z", BRIK),
  path("M4.4 15.6L16.6 7Q17.8 6.4 18 7.6", "none", { c: "#F6D58A", w: 0.9 }),
  dots([[7.6, 15.6], [10.6, 13.2], [13.6, 11.2], [16.4, 9.4], [12.6, 16.2], [16.6, 14], [18.8, 11.8], [9, 17.8], [15.6, 17.8]], 0.55, "#C27A22"),
  dots([[9.4, 16.4], [12, 14.4], [15, 12.6], [17.6, 16.6]], 0.4, "#F6D58A"),
  path("M18.6 19.4Q19.8 17.6 21.6 18.2Q22.4 19.4 21.6 20.4Q20 21.2 18.6 19.4Z", "#F2A31A", { w: 0.9 }),
  ellipse(20.6, 19, 0.6, 0.3, "#FBD56A", false),
  lemon(5.4, 8.8, 20, 0.95),
  dots([[3.4, 19], [6, 20.2], [14, 20.4]], 0.45, C.vertLight),
].join("");

// Dattes : régime de dattes brunes brillantes sur leurs tiges orangées, palme verte.
const DATE = "#6E2F17", DATE_L = "#B0552A";
const date = (x, y, rot = 0) => g(`rotate(${rot} ${x} ${y})`, ellipse(x, y, 1.7, 2.5, DATE), ellipse(x - 0.6, y - 0.8, 0.45, 0.9, DATE_L, false));
const dattes = [
  path("M12.4 1.4Q6 1.2 1.6 5.6Q6.6 4.8 12.4 2.8Z", C.vertLight, { w: 0.9 }),
  path("M12.4 1.6Q18.4 0.8 22.6 4.4Q17.6 4.2 12.4 2.8Z", C.feuille, { w: 0.9 }),
  line("M12 2V6.6M12 6.6Q7.6 8 5.6 13.6M12 6.6Q9.4 10 9 17.4M12 6.6Q13 11 12.6 20M12 6.6Q15 10 16 17.4M12 6.6Q16.6 8 18.6 13.6", O, 2.3),
  line("M12 2V6.6M12 6.6Q7.6 8 5.6 13.6M12 6.6Q9.4 10 9 17.4M12 6.6Q13 11 12.6 20M12 6.6Q15 10 16 17.4M12 6.6Q16.6 8 18.6 13.6", C.ocre, 0.9),
  date(7.2, 10.8, 20), date(16.8, 10.8, -20),
  date(4.8, 15.2, 10), date(19.2, 15.2, -10),
  date(9.4, 13.6, 5), date(14.8, 13.6, -5),
  date(7.4, 18.4, 0), date(12.2, 17.6, 0), date(16.8, 18.6, 0),
  date(10, 21, 0), date(14.6, 21.2, 0),
].join("");

/* ---------------- Afrique australe ---------------- */

// Braai : boerewors enroulé en spirale sur une grille au-dessus des braises, piqué de deux brochettes.
const spiral = (() => {
  const pts = [];
  for (let t = 0.9; t <= 6 * Math.PI + 0.1; t += 0.25) {
    const r = 0.46 * t;
    pts.push(`${n2(12 + r * Math.cos(t))} ${n2(13.6 + r * 0.68 * Math.sin(t))}`);
  }
  return "M" + pts.join("L");
})();
const braaiBoerewors = [
  ellipse(12, 14.2, 11.2, 7.8, "#3A3532"),
  ellipse(12, 14.2, 10, 6.8, "#5A4E46", { w: 0.6 }),
  dots([[4.6, 12], [6.2, 18.4], [18.6, 18], [19.6, 11.2], [12, 20.2], [8, 8.6], [16, 8.4]], 0.6, C.orange),
  line("M2.2 11.2H21.8M1.6 14.2H22.4M2.2 17.2H21.8M4.6 8.4H19.4M4.8 20H19.2", SILVER_D, 0.6),
  line(spiral, O, 3.6),
  line(spiral, "#9A3A22", 1.6),
  line(spiral, "#C9603A", 0.4),
].join("");

// Bobotie : viande hachée épicée sous un nappage d'œuf doré, feuilles de laurier, plat en terre ; une part entamée.
const BOBO = "#F2C94C", MINCE = "#7A3E1E";
const bay = (x, y, rot) => g(`rotate(${rot} ${x} ${y})`, path(`M${x} ${y - 3}Q${x + 1.6} ${y} ${x} ${y + 3}Q${x - 1.6} ${y} ${x} ${y - 3}Z`, C.feuille, { w: 0.8 }), line(`M${x} ${y - 2.4}V${y + 2.4}`, C.vertLight, 0.5));
const bobotie = [
  path("M1.6 13V17.6Q1.6 21.6 5.6 21.6H18.4Q22.4 21.6 22.4 17.6V13Z", C.terreDark),
  rect(1.6, 6.6, 20.8, 12.4, 4, C.terre),
  rect(3.2, 8, 17.6, 9.6, 3, BOBO),
  ellipse(9, 11, 2.2, 1, "#D9973A", false), ellipse(15.6, 14.6, 2, 0.9, "#D9973A", false), ellipse(17, 10, 1.4, 0.7, "#D9973A", false), ellipse(7.6, 15.2, 1.2, 0.6, "#D9973A", false),
  path("M3.2 13.2H8.8Q10 13.2 10 14.4V17.6H5.6Q3.2 17.6 3.2 15.2Z", MINCE, { w: 0.9 }),
  path("M3.2 13.2H8.8Q10 13.2 10 14V14.4H3.2Z", BOBO, { w: 0.7 }),
  dots([[5, 15.6], [7.6, 16.4], [8.6, 15]], 0.4, "#3A1A0C"),
  dots([[6.4, 16.8], [4.4, 16.6]], 0.3, "#B86A3A"),
  bay(12.6, 9.6, 50), bay(15.6, 12, -40), bay(18.4, 15.4, 60),
].join("");

// Bunny chow : quart de pain de mie évidé et rempli de curry, mie blanche sur la face coupée.
const CURRY = "#D9661F", CRUST = "#B8722E";
const bunnyChow = [
  path("M14.8 10.4L20.8 6.8V17.4Q20.8 18.2 20.2 18.6L15.6 21.4Q14.8 21.8 14.8 20.8Z", CRUST),
  path("M3.6 10.4H14.8V20.6Q14.8 21.4 14 21.4H4.4Q3.6 21.4 3.6 20.6Z", "#F6E9C8"),
  path("M3.6 10.4H14.8V20.6Q14.8 21.4 14 21.4H4.4Q3.6 21.4 3.6 20.6Z", "none", { c: CRUST, w: 0.9 }),
  path("M3.6 10.4H14.8V20.6Q14.8 21.4 14 21.4H4.4Q3.6 21.4 3.6 20.6Z", "none"),
  dots([[5.6, 16], [8, 18.6], [11.4, 17.2], [12.6, 19.8], [6.4, 19.8], [9.6, 15.4]], 0.35, "#E3CC9C"),
  path("M3.6 10.4L9.6 6.8H20.8L14.8 10.4Z", "#C98A3E"),
  path("M4.6 10.2Q4.8 5.6 9.6 4Q13.4 2.6 16.8 4Q20.2 5.4 19.8 7.6L14.4 10.6Q9 11.4 4.6 10.2Z", CURRY),
  path("M7 10.6Q7.4 12.8 6.8 14.2Q6.2 15 5.8 14Q5.6 12.4 5.8 10.6Z", CURRY, { w: 0.8 }),
  path("M11.4 10.8V12.6Q11.2 13.6 10.6 12.8V10.8Z", CURRY, { w: 0.8 }),
  rect(8.2, 5.8, 2.8, 2.4, 0.9, "#7A3A1C", { w: 0.8 }), rect(13.4, 5.4, 2.6, 2.2, 0.9, "#7A3A1C", { w: 0.8 }),
  rect(11, 7.8, 2.4, 2, 0.7, "#F2D48A", { w: 0.7 }), rect(15.6, 7.4, 2, 1.8, 0.6, "#F2D48A", { w: 0.7 }),
  dots([[7, 8.6], [12.6, 4.6], [17.6, 6], [10.4, 9.6]], 0.4, C.vertLight),
  ellipse(10, 4.8, 1.4, 0.5, "#F09A5A", false),
].join("");

// Pap et chakalaka : deux boules lisses de pap (maïs) et relish rouge-orangé (haricots, carotte, poivron).
const PAP = "#F8F4EA", CHAKA = "#D2462A";
const papBall = (x, y, rx, ry) => ellipse(x, y, rx, ry, PAP) + path(`M${x - rx * 0.6} ${y + ry * 0.55}Q${x} ${y + ry * 0.95} ${x + rx * 0.7} ${y + ry * 0.4}`, "none", { c: "#E2D9C3", w: 0.9 }) + ellipse(x - rx * 0.35, y - ry * 0.45, rx * 0.3, ry * 0.18, C.white, false);
const papChakalaka = [
  plate34(C.terre),
  path("M11.6 16.8Q11.6 11.6 15.6 10.8Q19.4 10.2 21 12.6Q22.6 15.8 20.4 18.4Q17.4 20.4 13.8 19.6Q11.6 18.8 11.6 16.8Z", CHAKA),
  rect(14, 12.6, 1.4, 1.2, 0.4, C.orange, { w: 0.6 }), rect(18.4, 14.2, 1.4, 1.2, 0.4, C.orange, { w: 0.6 }), rect(15.2, 16.8, 1.4, 1.2, 0.4, C.orange, { w: 0.6 }),
  rect(17, 11.8, 1.4, 1.1, 0.4, C.vertLight, { w: 0.6 }), rect(13.2, 15.2, 1.3, 1.1, 0.4, C.vertLight, { w: 0.6 }), rect(19.4, 16.6, 1.2, 1, 0.4, C.vertLight, { w: 0.6 }),
  ellipse(16.8, 14.6, 0.9, 0.6, C.cream, { w: 0.5 }), ellipse(18, 18.2, 0.9, 0.6, C.cream, { w: 0.5 }), ellipse(14.2, 18, 0.9, 0.6, C.cream, { w: 0.5 }),
  papBall(9.6, 9.4, 4.4, 3.6),
  papBall(6.6, 15.2, 4.6, 3.8),
].join("");

// Poulet peri-peri : poulet grillé ouvert en crapaudine, rouge-orangé et strié, piments et citron, sur planche.
const PERI = "#D2522A", PERI_D = "#7A2A14";
const periPeri = [
  ellipse(12, 15.4, 11, 6.6, C.bois),
  ellipse(12, 15, 9.8, 5.6, "none", { c: "#C98A55", w: 0.6 }),
  // ailes
  path("M5.2 8.4Q1.6 8.2 1.6 11.6Q2.8 13 5.2 12Z", PERI), path("M18.8 8.4Q22.4 8.2 22.4 11.6Q21.2 13 18.8 12Z", PERI),
  // corps ouvert
  path("M4.6 8.6Q5.4 3.6 12 3.6Q18.6 3.6 19.4 8.6Q20 13.4 16.6 16Q12 18.2 7.4 16Q4 13.4 4.6 8.6Z", PERI),
  ellipse(9.4, 6.8, 2.4, 1.2, "#E9804A", false),
  line("M6.4 7.8L9 13.8M9.4 5.2L12.6 14.8M12.8 4.6L15.8 13.6M16.2 5.8L17.8 9.8", PERI_D, 0.9),
  // pilons, devant
  g("rotate(35 7.4 16.6)", ellipse(7.4, 16.6, 2.4, 3.4, PERI), line("M6.6 15.6L8.2 17.8", PERI_D, 0.8), path("M6.8 19.6V21.2Q6.2 21.6 6.6 22.2Q7.4 22.6 7.6 21.8Q8.4 22.4 8.6 21.6Q8.6 21 8 21.2V19.6Z", C.cream, { w: 0.7 })),
  g("rotate(-35 16.6 16.6)", ellipse(16.6, 16.6, 2.4, 3.4, PERI), line("M17.4 15.6L15.8 17.8", PERI_D, 0.8), path("M16 19.6V21.2Q15.4 21.6 15.8 22.2Q16.6 22.6 16.8 21.8Q17.6 22.4 17.8 21.6Q17.8 21 17.2 21.2V19.6Z", C.cream, { w: 0.7 })),
  chili(19.2, 19.6, -20, 0.95), chili(1.6, 19, 15, 0.9), chili(19.4, 3.4, 30, 0.85),
  lemon(4, 4.6, -25, 0.8),
].join("");

/* ---------------- Madagascar ---------------- */

// Romazava : bouillon de bœuf aux brèdes (feuilles vertes) et brèdes mafane (boutons jaunes), bol en terre.
const BROTH = "#B9B64E";
const leaf = (x, y, rot, s = 1, col = C.feuille) => g(`rotate(${rot} ${x} ${y})`, path(`M${x - 3 * s} ${y}Q${x} ${y - 2 * s} ${x + 3 * s} ${y}Q${x} ${y + 2 * s} ${x - 3 * s} ${y}Z`, col, { w: 0.8 }), line(`M${x - 2.4 * s} ${y}H${x + 2.4 * s}`, C.vertLight, 0.5));
const bud = (x, y) => circle(x, y, 1.3, C.jaune, { w: 0.8 }) + circle(x - 0.4, y - 0.4, 0.4, "#FBE79A", false) + circle(x + 0.3, y + 0.3, 0.3, C.jauneShade, false);
const romazava = [
  path("M2.2 11.4H21.8Q21.4 19.8 12 19.8Q2.6 19.8 2.2 11.4Z", C.terre),
  line("M3.6 14.6Q12 17 20.4 14.6", C.ocreLight, 0.8),
  line("M8 21.2H16", O, W),
  ellipse(12, 11.4, 9.8, 3, BROTH),
  leaf(6, 9.4, -30, 1.1), leaf(17.6, 9, 25, 1.15, LEAF_DARK), leaf(11.4, 7.8, -8, 1.2), leaf(14.8, 12, 10, 0.9),
  rect(6.6, 11, 2.6, 2.2, 0.8, MEAT, { w: 0.8 }), rect(16.6, 11.4, 2.4, 2, 0.8, MEAT, { w: 0.8 }),
  bud(9.6, 11.6), bud(13.6, 9.8), bud(19.2, 12.2), bud(4.6, 12),
  line("M6.4 6.4Q5.8 5.2 6.6 4M17.4 5.8Q16.8 4.6 17.6 3.4", C.gris, 0.8),
].join("");

// Mofo gasy : petits gâteaux de riz ronds et dorés dans leur poêle en fonte à alvéoles.
const MOFO = "#E3A43A", MOFO_D = "#B8742E";
const mofo = (x, y) => ellipse(x, y + 0.5, 2.9, 2, "#1F1A15", { w: 0.6 }) + ellipse(x, y, 2.6, 1.8, MOFO_D, { w: 0.8 }) + ellipse(x, y - 0.3, 1.9, 1.2, MOFO, false) + ellipse(x - 0.7, y - 0.7, 0.7, 0.35, "#F6CE7E", false);
const mofoGasy = [
  thick("M3.4 10L0.8 5.4", "#3A3532", 1.4),
  ellipse(12, 15, 11, 6.8, "#3A3532"),
  ellipse(12, 14.6, 10, 5.8, "#4A433E", { w: 0.6 }),
  mofo(8.4, 11.6), mofo(15.6, 11.6),
  mofo(5.4, 16), mofo(12, 16.2), mofo(18.6, 16),
  mofo(9.2, 19.4), mofo(14.8, 19.4),
  line("M6.4 3.4Q5.8 2.2 6.6 1M10 4.4Q9.4 3.2 10.2 2", C.gris, 0.8),
].join("");

/* ---------------- entrées ---------------- */

const E = (slug, fr, en, tags, body) => ({ slug, fr, en, char: null, group: "nourriture", tags, tone: false, body });

export default [
  E("ugali-sukuma", "Ugali et sukuma wiki", "Ugali and sukuma wiki", ["ugali", "sukuma wiki", "sima", "posho", "kenya", "tanzanie", "tanzania", "maïs", "maize", "chou", "collard greens"], ugaliSukuma),
  E("nyama-choma", "Nyama choma", "Nyama choma", ["nyama choma", "viande grillée", "grilled meat", "chèvre", "goat", "kenya", "tanzanie", "tanzania", "kachumbari", "braise"], nyamaChoma),
  E("pilau", "Pilau", "Pilau rice", ["pilau", "pilaf", "riz", "rice", "épices", "spices", "swahili", "zanzibar", "kenya", "tanzanie", "cannelle"], pilau),
  E("chapati", "Chapati", "Chapati", ["chapati", "galette", "flatbread", "pain", "bread", "kenya", "tanzanie", "ouganda", "uganda", "swahili"], chapati),
  E("mandazi", "Mandazi", "Mandazi", ["mandazi", "maandazi", "beignet", "doughnut", "coco", "coconut", "swahili", "kenya", "tanzanie", "tanzania"], mandazi),
  E("sambusa", "Sambusa", "Sambusa", ["sambusa", "samoussa", "samosa", "chapati", "somalie", "somalia", "éthiopie", "kenya", "tanzanie", "beignet farci"], sambusa),
  E("matoke", "Matoke", "Matoke", ["matoke", "matooke", "banane plantain", "green banana", "ouganda", "uganda", "feuille de bananier", "banana leaf", "purée"], matoke),
  E("rolex", "Rolex", "Rolex", ["rolex", "rolled eggs", "chapati", "omelette", "œuf", "egg", "ouganda", "uganda", "street food", "kampala"], rolex),
  E("doro-wat", "Doro wat", "Doro wat", ["doro wat", "doro wot", "poulet", "chicken", "berbéré", "berbere", "œuf", "egg", "éthiopie", "ethiopia", "érythrée"], doroWat),

  E("couscous", "Couscous", "Couscous", ["couscous", "seksu", "semoule", "semolina", "légumes", "vegetables", "pois chiches", "chickpeas", "maroc", "algérie", "tunisie", "maghreb", "gsaa"], couscous),
  E("tajine-plat", "Tajine", "Tagine", ["tajine", "tagine", "plat", "dish", "maroc", "morocco", "olives", "citron confit", "preserved lemon", "poulet", "maghreb"], tajinePlat),
  E("harira", "Harira", "Harira", ["harira", "soupe", "soup", "lentilles", "lentils", "tomate", "tomato", "pois chiches", "maroc", "morocco", "ramadan"], harira),
  E("msemen", "Msemen", "Msemen", ["msemen", "rghaif", "crêpe feuilletée", "layered pancake", "miel", "honey", "maroc", "algérie", "maghreb"], msemen),
  E("pastilla", "Pastilla", "Pastilla", ["pastilla", "bastilla", "bstilla", "tourte", "pie", "cannelle", "cinnamon", "amandes", "almonds", "maroc", "morocco"], pastilla),
  E("the-a-la-menthe", "Thé à la menthe", "Mint tea", ["thé à la menthe", "mint tea", "atay", "théière", "teapot", "verre", "glass", "menthe", "maroc", "maghreb", "sahel"], theMenthe),
  E("koshari", "Koshari", "Koshari", ["koshari", "kushari", "koshary", "riz", "rice", "lentilles", "lentils", "macaronis", "pasta", "égypte", "egypt", "oignons frits"], koshari),
  E("ful-medames", "Ful medames", "Ful medames", ["ful medames", "foul", "fèves", "fava beans", "pain baladi", "baladi bread", "œuf", "égypte", "egypt", "soudan", "sudan"], fulMedames),
  E("brik", "Brik", "Brik", ["brik", "brick", "feuille de brick", "œuf", "egg", "thon", "tuna", "tunisie", "tunisia", "citron", "lemon"], brik),
  E("dattes", "Dattes", "Dates", ["dattes", "dates", "palmier dattier", "date palm", "deglet nour", "ramadan", "algérie", "tunisie", "égypte", "sahara"], dattes),

  E("braai-boerewors", "Braai et boerewors", "Braai and boerewors", ["braai", "boerewors", "saucisse", "sausage", "barbecue", "grill", "afrique du sud", "south africa", "namibie"], braaiBoerewors),
  E("bobotie", "Bobotie", "Bobotie", ["bobotie", "viande hachée", "minced meat", "curry", "laurier", "bay leaf", "œuf", "afrique du sud", "south africa", "cap malais"], bobotie),
  E("bunny-chow", "Bunny chow", "Bunny chow", ["bunny chow", "bunny", "pain", "bread", "curry", "durban", "afrique du sud", "south africa", "street food"], bunnyChow),
  E("pap-chakalaka", "Pap et chakalaka", "Pap and chakalaka", ["pap", "mieliepap", "sadza", "nsima", "maïs", "maize", "chakalaka", "afrique du sud", "zimbabwe", "malawi", "zambie"], papChakalaka),
  E("poulet-peri-peri", "Poulet peri-peri", "Peri-peri chicken", ["peri-peri", "piri-piri", "poulet", "chicken", "grillé", "grilled", "piment", "chili", "mozambique", "angola"], periPeri),

  E("romazava", "Romazava", "Romazava", ["romazava", "bouillon", "broth", "brèdes", "greens", "bœuf", "beef", "brèdes mafane", "madagascar", "malagasy"], romazava),
  E("mofo-gasy", "Mofo gasy", "Mofo gasy", ["mofo gasy", "mofo", "gâteau de riz", "rice cake", "madagascar", "malagasy", "petit-déjeuner", "breakfast"], mofoGasy),
];
