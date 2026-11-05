// Emojis africains originaux : plats d'Afrique, série B (sans équivalent Unicode, char: null).
// Skoudehkaris (Djibouti), sishwala (Eswatini), domoda (Gambie), sauce feuille (Guinée, Sierra Leone),
// papa le moroho (Lesotho), palm butter (Liberia).
// Chaque plat garde son contenant (grand plat, assiette, bol) et son ingrédient signature.
import { O, W, C, path, circle, ellipse, rect, line, g } from "./lib.mjs";

const thick = (d, col, w = 1.5) => line(d, O, w + 2 * W) + line(d, col, w);
const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const dashes = (pts, col, w = 0.6) => line(pts.map(([x, y, a = 0]) => `M${x - 0.45} ${y - a}L${x + 0.45} ${y + a}`).join(""), col, w);
const steam = (xs, y = 4.6) => line(xs.map((x) => `M${x} ${y}Q${x - 0.8} ${y - 1.4} ${x} ${y - 2.6}`).join(""), C.gris, 0.8);

/* ---------- couleurs ---------- */
const RICE = "#FBF6EA", RICE_SHADE = "#E6DCC6", RICE_GRAIN = "#D9CDB2";
const SPICED = "#E0702E", SPICED_LIGHT = "#F29A52", SPICED_DARK = "#B9531E";
const LAMB = "#7A3A1E", LAMB_LIGHT = "#A35A30", BONE = "#F3E8CF";
const CINNAMON = "#9A4E24", CINNAMON_LIGHT = "#C27A44", CARDAMOM = "#8FB04A";
const METAL = "#C9CED3", METAL_DARK = "#9AA3AB";
const MAIZE = "#F5EED7", MAIZE_SHADE = "#E2D6B4";
const STEW = "#8E3A1C", STEW_LIGHT = "#B4532A", CLAY = "#B85A30", CLAY_DARK = "#8E4122";
const PEANUT = "#B8652A", PEANUT_LIGHT = "#D88A44";
const PUMPKIN = "#F28C28", PUMPKIN_LIGHT = "#F8B45A", RIND = "#4F7A2E";
const LEAF_SAUCE = "#24401F", LEAF_SAUCE_LIGHT = "#3C6630", PALM_OIL = "#E3862A";
const SMOKED = "#B07A3A", SMOKED_DARK = "#7A4E22";
const GREENS = "#3F8F3F", GREENS_DARK = "#2C6A2E", GREENS_LIGHT = "#79BE5E";
const PALM_SOUP = "#C8461E", PALM_SOUP_LIGHT = "#E8743A", NUT = "#E2541E", NUT_TOP = "#3A1A10";

/** Assiette vue de 3/4, avec un liseré de couleur. */
const plate = (y = 16.4, rim = C.bleu, rx = 10.6, ry = 5) => ellipse(12, y, rx, ry, C.white) + ellipse(12, y, rx - 1.4, ry - 1.1, "none", { c: rim, w: 0.8 });

/* 1. Skoudehkaris : grand plat de métal, dôme de riz orangé épicé, souris d'agneau sur l'os, bâton de cannelle, cardamome. */
const skoudehkaris = [
  ellipse(12, 17.2, 10.8, 4.6, METAL),
  ellipse(12, 16.8, 9.2, 3.4, "#E3E7EA", { c: METAL_DARK, w: 0.8 }),
  // dôme de riz
  path("M3.6 16.8C3.4 11.4 7 8.4 12 8.4S20.6 11.4 20.4 16.8Q12 19.4 3.6 16.8Z", SPICED),
  path("M15.6 9.6Q19.6 11.6 19.8 16.8Q18.8 17.2 17.8 17.4Q18 12.4 15.6 9.6Z", SPICED_DARK, false),
  dashes([[6.6, 13, 0.2], [9, 11.2, -0.2], [7.2, 15.6], [11.4, 14.4, 0.3], [14.6, 16, -0.2], [17.2, 13.8, 0.2], [13.4, 11.6]], SPICED_LIGHT, 0.7),
  // bâton de cannelle roulé
  g("rotate(-30 8.4 13.4)", rect(5.2, 12.5, 6.6, 1.8, 0.8, CINNAMON, { w: 0.8 }), line("M6 13.1H10.8", CINNAMON_LIGHT, 0.5), ellipse(11.4, 13.4, 0.5, 0.9, CINNAMON_LIGHT, { w: 0.6 })),
  // gousses de cardamome
  g("rotate(30 14.4 14.4)", ellipse(14.4, 14.4, 0.95, 0.6, CARDAMOM, { w: 0.6 })),
  g("rotate(-20 17.2 15.8)", ellipse(17.2, 15.8, 0.95, 0.6, CARDAMOM, { w: 0.6 })),
  g("rotate(10 6.4 15.6)", ellipse(6.4, 15.8, 0.95, 0.6, CARDAMOM, { w: 0.6 })),
  // souris d'agneau plantée au sommet, os qui dépasse
  thick("M14.4 7.2L17.6 3.8", BONE, 1.2),
  circle(17.4, 3, 0.9, BONE, { w: 0.8 }), circle(18.4, 4, 0.9, BONE, { w: 0.8 }),
  path("M8.6 9.6C7.8 7.2 9.6 5.4 11.8 5.8C13.8 5.2 16 6.6 15.6 8.6C15.2 10 13.4 10.4 12 10.2C10.6 10.4 9.2 10.4 8.6 9.6Z", LAMB),
  path("M9.8 7.4Q10.8 6.4 12.2 6.6", "none", { c: LAMB_LIGHT, w: 0.8 }),
  // petit morceau d'agneau dans le riz
  path("M15.4 12.2Q15.6 10.8 17 11Q18.4 11.2 18.2 12.6Q17.8 13.6 16.6 13.4Q15.4 13.2 15.4 12.2Z", LAMB, { w: 0.8 }),
].join("");

/* 2. Sishwala : dôme lisse et ferme de bouillie de maïs moulée, bol de terre de ragoût de viande à côté. */
const sishwala = [
  plate(17, C.bleu, 10.8, 4.6),
  // dôme moulé, bien lisse
  path("M2.8 18Q2.4 11 5 8.4Q8 5.8 11.2 7.6Q14.6 9.8 14.6 17.6Q8.6 19.6 2.8 18Z", MAIZE),
  path("M11.6 8.2Q14.2 10.4 14.2 17.7Q13.2 18 12.2 18.1Q12.8 12 11.6 8.2Z", MAIZE_SHADE, false),
  ellipse(6.4, 10.4, 1.4, 0.9, C.white, false),
  line("M5 13.4Q5.2 11.8 6 11", C.white, 0.7),
  path("M2.8 18Q2.4 11 5 8.4Q8 5.8 11.2 7.6Q14.6 9.8 14.6 17.6Q8.6 19.6 2.8 18Z", "none"),
  // bol de ragoût
  path("M11.2 13.4H21.8Q21.6 19.4 16.5 19.4Q11.4 19.4 11.2 13.4Z", CLAY),
  line("M12 15.8Q16.5 17.2 21 15.8", CLAY_DARK, 0.7),
  ellipse(16.5, 13.4, 5.3, 1.7, STEW),
  ellipse(14.6, 13.6, 1.4, 0.4, STEW_LIGHT, false),
  // viande et os
  thick("M17.6 12L19.6 8.8", BONE, 1.1),
  circle(19.4, 8.1, 0.8, BONE, { w: 0.7 }), circle(20.4, 8.8, 0.8, BONE, { w: 0.7 }),
  path("M13.6 13.6Q13.2 11.4 15.4 11.2Q16.6 10.2 18 11Q19.6 11.4 19.2 13.4Q16.4 14.6 13.6 13.6Z", LAMB),
  path("M14.4 12.2Q15 11.6 15.8 11.8", "none", { c: LAMB_LIGHT, w: 0.7 }),
  steam([20.6], 6.4),
].join("");

/* 3. Domoda : dôme de riz blanc derrière, grand bol émaillé de ragoût d'arachide brun-orangé, quartier de courge. */
const domoda = [
  // riz
  path("M2.2 17Q1.8 9.6 5 7.4Q8 5.6 10.8 7.6Q13.4 9.6 13.4 13.6L8 17Z", RICE),
  dashes([[4.4, 11.4, 0.2], [6.8, 9.2, -0.2], [4.2, 14.6], [8.6, 11.6, 0.3], [10.6, 9.6, -0.2], [6.4, 13.2]], RICE_GRAIN, 0.7),
  path("M2.2 17Q1.8 9.6 5 7.4Q8 5.6 10.8 7.6Q13.4 9.6 13.4 13.6", "none"),
  line("M2.2 17H8", O, W),
  // bol émaillé
  path("M6.6 12.6H22Q21.8 21 14.3 21Q6.8 21 6.6 12.6Z", C.white),
  line("M7.2 16Q14.3 18.2 21.4 16", C.vert, 0.9),
  ellipse(14.3, 12.6, 7.7, 2.2, PEANUT),
  ellipse(11.4, 13.2, 2, 0.5, PEANUT_LIGHT, false), ellipse(18.6, 13.4, 1.4, 0.4, PEANUT_LIGHT, false),
  // quartier de courge (chair orange épaisse, fine écorce verte)
  path("M9.8 13.2Q10.4 6.4 15 6.4Q19.8 6.4 20 12.8Q18.6 10.6 15 10.8Q11.6 11 9.8 13.2Z", PUMPKIN),
  path("M10.6 10.4Q11.6 6.8 15 6.8Q18.8 6.8 19.6 11", "none", { c: RIND, w: 1 }),
  line("M12.4 10.2Q13.6 8.8 15.4 8.8", PUMPKIN_LIGHT, 0.7),
  path("M9.8 13.2Q10.4 6.4 15 6.4Q19.8 6.4 20 12.8Q18.6 10.6 15 10.8Q11.6 11 9.8 13.2Z", "none"),
  // morceau de viande
  path("M18.4 13.2Q18.2 11.4 19.8 11.2Q21.4 11.2 21.2 12.8Q20.8 14 19.6 13.9Q18.6 13.8 18.4 13.2Z", LAMB, { w: 0.8 }),
  dots([[13.6, 13.8], [8.6, 12.8]], 0.35, "#F5B04A"),
].join("");

/* 4. Sauce feuille : riz blanc nappé de sauce de feuilles de manioc très sombre, reflets d'huile de palme, poisson fumé. */
const sauceFeuille = [
  plate(16.6, C.grisLight, 10.8, 4.8),
  path("M3.4 16.8C3.2 11.4 7 8.2 12 8.2S20.8 11.4 20.6 16.8Q12 19.4 3.4 16.8Z", RICE),
  dashes([[6, 15.8], [9, 16.6, 0.2], [12.6, 16.8], [16, 16.4, -0.2], [18.6, 15.4]], RICE_GRAIN, 0.7),
  // nappe de sauce avec coulures
  path("M4.4 13C5.8 9.8 8.6 8.2 12 8.2S18.2 9.8 19.6 13C19 13.8 18.2 13.8 17.8 13.2C17.4 15 16 15 15.6 13.6C15 14.8 13.8 14.6 13.6 13.6C12.8 15.6 11.2 15.4 10.8 13.6C10.2 14.4 9 14.4 8.8 13.4C8.2 14.8 6.8 14.6 6.6 13.2C6 14 5 13.8 4.4 13Z", LEAF_SAUCE),
  line("M6.4 11.6Q7.4 10.4 8.8 10.2M14.4 10.4Q16 10.6 17.2 11.6", LEAF_SAUCE_LIGHT, 0.7),
  ellipse(8.4, 12.2, 1.2, 0.45, PALM_OIL, false), ellipse(15.4, 12.6, 1, 0.4, PALM_OIL, false), ellipse(12, 11.4, 0.7, 0.3, PALM_OIL, false),
  path("M3.4 16.8C3.2 11.4 7 8.2 12 8.2S20.8 11.4 20.6 16.8", "none"),
  // poisson fumé posé dessus
  path("M7.8 8.2C9.6 5.8 12.6 5.6 14.4 7L17.2 5V10.2L14.4 8.6C12.6 10 9.6 9.8 7.8 8.2Z", SMOKED),
  line("M11 6.6Q10.6 7.8 11 9.2", SMOKED_DARK, 0.6),
  circle(9.6, 7.6, 0.45, O, false),
].join("");

/* 5. Papa le moroho : deux boules lisses de papa blanc, tas de feuilles vertes (épinards, chou) dans l'assiette. */
const leaf = (x, y, rot, s = 1, col = GREENS) => g(`rotate(${rot} ${x} ${y})`,
  path(`M${x - 3.2 * s} ${y}Q${x - 0.4 * s} ${y - 3 * s} ${x + 3.2 * s} ${y}Q${x - 0.4 * s} ${y + 3 * s} ${x - 3.2 * s} ${y}Z`, col, { w: 0.8 }),
  line(`M${x - 2.6 * s} ${y}L${x + 2.4 * s} ${y}M${x - 0.6 * s} ${y}L${x + 0.6 * s} ${y - 1 * s}M${x - 0.6 * s} ${y}L${x + 0.6 * s} ${y + 1 * s}`, GREENS_LIGHT, 0.5));
const papaMoroho = [
  plate(16.4, C.vert, 11, 5.4),
  // feuilles de moroho : tas de feuilles cuites, feuilles entières dessus
  path("M11.4 16.8Q11 12.4 14.6 10.6Q18.8 8.8 21.2 11.6Q22.2 14.6 20.4 17.4Q16 18.6 11.4 16.8Z", GREENS_DARK),
  leaf(17.6, 11.8, -45, 1.1, GREENS_DARK),
  leaf(14.8, 14.6, -15, 1.05, GREENS),
  leaf(19.2, 15.2, -70, 1, GREENS),
  // papa : boule de derrière puis boule de devant
  circle(10.2, 10.4, 3.6, C.white),
  path("M12.4 7.6Q14.2 9.4 13.4 12.4Q12.4 13.6 11.2 13.9Q12.8 11 12.4 7.6Z", RICE_SHADE, false),
  ellipse(9, 8.6, 1.1, 0.7, "#FFFFFF", false),
  circle(10.2, 10.4, 3.6, "none"),
  path("M2.6 16.6Q2.4 11.2 6.4 10.8Q10.6 10.8 10.6 16.6Q6.6 18 2.6 16.6Z", C.white),
  path("M8.4 11.4Q10.4 12.8 10.2 16.7Q9.4 16.9 8.6 17Q9.4 13.8 8.4 11.4Z", RICE_SHADE, false),
  ellipse(5.2, 12.6, 1.1, 0.6, RICE, false),
  path("M2.6 16.6Q2.4 11.2 6.4 10.8Q10.6 10.8 10.6 16.6Q6.6 18 2.6 16.6Z", "none"),
].join("");

/* 6. Palm butter : bol de soupe épaisse de noix de palme rouge-orangé, poisson et viande, grappe de noix de palme. */
const palmNut = (x, y, rot) => g(`rotate(${rot} ${x} ${y})`, ellipse(x, y, 1.5, 1.9, NUT, { w: 0.8 }), path(`M${x - 0.9} ${y - 1.1}Q${x} ${y - 2.1} ${x + 0.9} ${y - 1.1}Q${x} ${y - 1.4} ${x - 0.9} ${y - 1.1}Z`, NUT_TOP, { w: 0.5 }), ellipse(x - 0.4, y + 0.1, 0.35, 0.6, "#F58A55", false));
const palmButter = [
  // bol émaillé blanc à liseré rouge
  path("M1.6 10.8H17.4Q17.2 20 9.5 20Q1.8 20 1.6 10.8Z", C.white),
  line("M2 12.8H17", C.rouge, 0.8),
  line("M2.6 15Q4 18.6 7.6 19.4", C.grisLight, 0.8),
  ellipse(9.5, 10.8, 7.9, 2.2, PALM_SOUP),
  ellipse(6.6, 11.4, 2, 0.5, PALM_SOUP_LIGHT, false), ellipse(13.4, 11.6, 1.4, 0.4, PALM_SOUP_LIGHT, false),
  // viande et queue de poisson qui dépassent
  path("M4.4 11.2Q4 8.2 6.6 7.8Q9.6 7.4 10.4 9.6Q10.6 10.8 9.6 11.4Q7 12.2 4.4 11.2Z", LAMB),
  path("M5.6 9.2Q6.4 8.4 7.6 8.5", "none", { c: LAMB_LIGHT, w: 0.7 }),
  path("M11.6 11.2Q11.6 9.4 13.4 9.2L15.8 6.6Q16.4 8.8 15.8 11Q13.6 11.8 11.6 11.2Z", SMOKED),
  line("M13.6 9.6L15 8.2", SMOKED_DARK, 0.6),
  steam([7.4, 11], 6.6),
  // grappe de noix de palme
  palmNut(19.6, 14.4, 10), palmNut(18, 19, -20), palmNut(21.2, 18.4, 20),
].join("");

const E = (slug, fr, en, tags, body) => ({ slug, fr, en, char: null, group: "nourriture", tags, tone: false, body });
export default [
  E("skoudehkaris", "Skoudehkaris", "Skoudehkaris", ["skoudehkaris", "djibouti", "riz", "rice", "agneau", "lamb", "cardamome", "cardamom", "cannelle", "cinnamon"], skoudehkaris),
  E("sishwala", "Sishwala", "Sishwala", ["sishwala", "eswatini", "swaziland", "bouillie de maïs", "maize porridge", "ragoût", "stew", "viande", "meat"], sishwala),
  E("domoda", "Domoda", "Domoda", ["domoda", "gambie", "the gambia", "gambia", "arachide", "peanut", "ragoût", "stew", "courge", "pumpkin", "riz", "rice"], domoda),
  E("sauce-feuille", "Sauce feuille", "Cassava leaf stew", ["sauce feuille", "cassava leaf", "feuilles de manioc", "guinée", "guinea", "sierra leone", "huile de palme", "palm oil", "poisson fumé", "smoked fish", "riz", "rice"], sauceFeuille),
  E("papa-moroho", "Papa le moroho", "Papa with moroho", ["papa", "moroho", "lesotho", "bouillie de maïs", "maize porridge", "épinards", "spinach", "chou", "greens"], papaMoroho),
  E("palm-butter", "Palm butter", "Palm butter soup", ["palm butter", "liberia", "noix de palme", "palm nut", "soupe", "soup", "huile de palme", "palm oil", "riz", "rice"], palmButter),
];
