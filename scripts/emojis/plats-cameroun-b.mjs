// Emojis africains originaux : plats du Cameroun, deuxième série (sans équivalent Unicode, char: null).
// Miondo, soya, beignets-haricots-bouillie, couscous de maïs sauce gombo, pepper soup, corn chaff.
// Chaque plat garde son contenant (botte ficelée, papier, bol émaillé, tasse, assiette) et son ingrédient signature.
import { O, W, C, path, circle, ellipse, rect, line, g } from "./lib.mjs";

const thick = (d, col, w = 1.5) => line(d, O, w + 2 * W) + line(d, col, w);
const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const steam = (xs, y = 4.6) => line(xs.map((x) => `M${x} ${y}Q${x - 0.8} ${y - 1.4} ${x} ${y - 2.6}`).join(""), C.gris, 0.8);

/* ---------- couleurs ---------- */
const LEAF = "#5E9E4A", LEAF_DARK = "#3F7A36", LEAF_LINE = "#8CC46E";
const CASSAVA = "#EEE8D2", CASSAVA_SHADE = "#D6CDAE";
const FIBRE = "#D8B678";
const KRAFT = "#D2A46C", KRAFT_LINE = "#B88A52";
const SUYA = "#7A341A", SUYA_LIGHT = "#9C4C26", KANKAN = "#D9471E";
const ONION_SKIN = "#F3E6F0";
const PUFF = "#D98A2E", PUFF_LIGHT = "#EDB45A", PUFF_DARK = "#A8611C";
const BEAN_SAUCE = "#B5502A", BEAN = "#5E1A14", BEAN_LIGHT = "#8A3A2C";
const BOUILLIE = "#EAD7A8", BOUILLIE_LIGHT = "#F6EBCB";
const FUFU = "#F4E4A8", FUFU_SHADE = "#E3C978";
const OKRA = "#5E8E2A", OKRA_LIGHT = "#A9CC5E", OKRA_SEED = "#E6F0C0";
const BROTH = "#B4421C", BROTH_LIGHT = "#D9662E";
const PALM = "#E3862A", CORN = "#F6C744", CORN_LIGHT = "#FBE38A", RED_BEAN = "#9A2A1E";

/* 1. Miondo : botte de fins bâtons de manioc dans leurs feuilles, ficelée ; un bout déballé. */
const stick = (y, l, r, fill) => rect(l, y, r - l, 2.6, 1.3, fill);
const miondo = [
  g("rotate(-45 12 12)",
    stick(6.8, 3.4, 20.6, LEAF_DARK),
    stick(9.4, 2.4, 21.8, LEAF),
    // bâton de devant : bout déballé (manioc)
    rect(16.6, 12, 5.6, 2.6, 1.3, CASSAVA), line("M17.6 12.9H20.8", C.white, 0.6),
    ellipse(21.8, 13.3, 0.7, 1.2, CASSAVA_SHADE, { w: 0.8 }),
    stick(12, 2.8, 17.6, LEAF),
    stick(14.6, 3.8, 20.2, LEAF_DARK),
    line("M4.6 8.1H19.4M3.8 10.7H20.4M4.2 13.3H16.4M5.2 15.9H19", LEAF_LINE, 0.5),
    // deux liens en fibre
    thick("M7.4 6.2Q6.8 11.6 7.4 17.8", FIBRE, 0.9), thick("M14.6 6.2Q14 11.6 14.6 17.8", FIBRE, 0.9),
    thick("M14.6 17.8Q16 19.2 17.6 18.6", FIBRE, 0.9)),
].join("");

/* 2. Soya : lamelles de bœuf froncées sur une pique, couvertes de kankan, sur papier kraft avec oignon et piment. */
const soya = [
  path("M2.4 9.4L16.8 4.4L21.6 17.6L7.2 22.2Z", KRAFT),
  line("M4.4 12.4L6 16.8M17.4 8.8L19 13.2", KRAFT_LINE, 0.6),
  // pique
  thick("M1.6 8.8H22.4", C.bois, 0.8),
  // viande froncée
  path("M5.6 7.2Q7.7 4.6 9.8 6.8Q11.9 4.6 14 6.8Q16.1 4.6 18.2 7.2V10.4Q16.1 13 14 10.8Q11.9 13 9.8 10.8Q7.7 13 5.6 10.4Z", SUYA),
  line("M7.7 6.2Q7.2 8.8 7.7 11.4M11.9 6.2Q11.4 8.8 11.9 11.4M16.1 6.2Q15.6 8.8 16.1 11.4", "#4E1E0E", 0.6),
  path("M6.6 7.4Q7.6 6.4 8.8 7.2", "none", { c: SUYA_LIGHT, w: 0.8 }),
  dots([[6.8, 9.4], [9.4, 8], [10.6, 10.2], [13, 8.4], [14.8, 10], [17, 8.6], [8.4, 6.6], [15.4, 6.8]], 0.36, KANKAN),
  // oignon cru et piment
  ellipse(10, 17, 2.4, 2.2, "none", { c: O, w: 2.2 }), ellipse(10, 17, 2.4, 2.2, "none", { c: ONION_SKIN, w: 1 }),
  ellipse(10, 17, 1.1, 1, "none", { c: "#C9A6C8", w: 0.6 }),
  path("M13.6 16.6C15 18 17 17.6 17.8 15.4C18 14.8 18.6 14.6 19 15C19.2 17.8 16.6 19.8 14 18.9C13.2 18.6 13.1 17.2 13.6 16.6Z", C.rouge),
  line("M19 15L19.4 13.6", C.vert, 0.9),
  dots([[6.4, 14.8], [12.8, 20.2], [16.2, 13.2], [8.6, 20.6], [19.6, 18.2]], 0.36, KANKAN),
].join("");

/* 3. Beignets-haricots-bouillie : pyramide de beignets, bol de haricots rouges en sauce, tasse de bouillie fumante. */
const puff = (x, y, r = 2.4) => circle(x, y, r, PUFF) + ellipse(x - r * 0.35, y - r * 0.4, r * 0.4, r * 0.25, PUFF_LIGHT, false) + circle(x + r * 0.3, y + r * 0.35, 0.3, PUFF_DARK, false);
const bean = (x, y, rot = 0) => g(`rotate(${rot} ${x} ${y})`, ellipse(x, y, 1.15, 0.7, BEAN, { c: "#3E0F0A", w: 0.45 }), ellipse(x - 0.35, y - 0.22, 0.42, 0.2, BEAN_LIGHT, false));
const bhb = [
  // tasse de bouillie (derrière, à droite)
  path("M15.4 9.4H21.6L20.8 19.8Q20.7 20.8 19.6 20.8H17.4Q16.3 20.8 16.2 19.8Z", C.white),
  line("M15.8 12.4H21.3", C.bleu, 0.8),
  ellipse(18.5, 9.4, 3.1, 0.9, BOUILLIE, { w: 0.9 }),
  ellipse(17.8, 9.3, 1, 0.3, BOUILLIE_LIGHT, false),
  steam([17.6, 20], 7.6),
  // beignets
  puff(5.8, 8.4), puff(10.4, 8.4), puff(8.1, 4.6),
  // bol de haricots
  path("M2.2 14.4H14.8Q14.6 20.8 8.5 20.8Q2.4 20.8 2.2 14.4Z", C.white),
  line("M2.6 16.4Q8.5 18 14.4 16.4", C.bleu, 0.8),
  path("M3 14.6Q3.4 12.4 6 12.2Q8.5 11.6 11 12.2Q13.6 12.4 14 14.6Z", BEAN_SAUCE),
  bean(5.2, 13.6, -10), bean(8.5, 13, 8), bean(11.8, 13.6, -5), bean(6.9, 14.4, 15), bean(10.2, 14.4, -15), bean(3.8, 14.3, 20), bean(13.2, 14.3, -20),
  path("M2.2 14.4H14.8", "none"),
].join("");

/* 4. Couscous de maïs, sauce gombo : boule ferme jaune pâle derrière, bol de sauce gombo verte et filante, rondelles étoilées. */
const okraSlice = (x, y, R = 1.6) => {
  const p = []; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + (k * Math.PI) / 5, q = k % 2 ? R * 0.55 : R; p.push(`${Math.round((x + q * Math.cos(a)) * 100) / 100} ${Math.round((y + q * 0.75 * Math.sin(a)) * 100) / 100}`); }
  return path(`M${p.join("L")}Z`, OKRA_LIGHT, { w: 0.6 }) + circle(x, y, R * 0.28, OKRA_SEED, false);
};
const couscousMais = [
  // boule de couscous
  circle(7.2, 9.6, 4.8, FUFU),
  path("M3.2 12.2Q5.6 14.6 9.6 13.8", "none", { c: FUFU_SHADE, w: 1.2 }),
  ellipse(5.6, 7.4, 1.5, 0.9, "#FCF3CF", false),
  // bol émaillé
  path("M9.2 13.4Q9.2 20.8 15.4 20.8Q21.6 20.8 21.6 13.4Z", C.terre),
  line("M10.2 16.6Q15.4 18.6 20.6 16.6", C.terreDark, 0.7),
  ellipse(15.4, 13.4, 6.2, 3.2, C.terreDark),
  ellipse(15.4, 13.5, 5.3, 2.5, OKRA),
  path("M11.4 13.2Q13 12 15 12.4", "none", { c: "#7FAE3E", w: 0.8 }),
  okraSlice(15.6, 13.6, 1.9), okraSlice(12.4, 14.2, 1), okraSlice(18.8, 13, 1),
  // sauce filante qui coule sur le bord
  path("M17.8 15.6Q18.6 15.8 18.8 17.4Q18.8 18.4 18.2 18.4Q17.6 18.4 17.7 17.4Z", OKRA, { w: 0.8 }),
  line("M15.4 15.4Q16.6 17.2 16.2 19", OKRA_LIGHT, 0.5),
].join("");

/* 5. Pepper soup : bol creux à pied, bouillon clair rouge-brun, viande, poisson, piment, feuilles, vapeur. */
const pepperSoup = [
  path("M8.2 19.4L7.6 21.6H16.4L15.8 19.4Z", "#E9E3D8", { w: 0.9 }),
  path("M2.4 11.2H21.6Q21.4 19.8 12 19.8Q2.6 19.8 2.4 11.2Z", "#F5F1E8"),
  line("M3.4 14.6Q4.6 18 8.4 19.2", "#D9D2C4", 0.8),
  line("M2.8 12.8H21.2", C.rouge, 0.8),
  // bouillon
  ellipse(12, 11.2, 9.6, 1.9, BROTH),
  ellipse(8.4, 11.4, 2.4, 0.5, BROTH_LIGHT, false), ellipse(16.4, 11.6, 1.6, 0.4, BROTH_LIGHT, false),
  // viande et poisson qui dépassent
  path("M4.8 11.4Q4.4 8.6 6.6 8.2Q8.6 7.2 10.2 8.6Q11.4 9.8 10.8 11.4Z", "#7A3C1E"),
  ellipse(6.8, 9.2, 1, 0.5, "#A05A30", false),
  path("M11.2 11.6Q11.6 9.4 13.6 9.6Q14.8 9.8 14.8 11.6Z", "#C9C2B4", { w: 0.9 }),
  // piment rouge planté
  path("M13.4 11.2C14.6 8.4 16.8 6.2 19.6 5.4C20.6 7.4 18.4 9.8 16.4 11.2Z", C.rouge),
  path("M15.4 9.2Q17 7.4 18.8 6.6", "none", { c: "#F07A5E", w: 0.6 }),
  line("M19.6 5.4L20.6 3.6", C.vert, 1),
  // feuilles
  g("rotate(-20 17.4 11.2)", path("M15.6 11.2Q17.4 9.8 19.2 11.2Q17.4 12.4 15.6 11.2Z", C.feuille, { w: 0.7 })),
  dots([[9.4, 11.6], [12.6, 11.9], [5.2, 11.6]], 0.3, "#F5B04A"),
  steam([6, 9.2], 6.8),
].join("");

/* 6. Corn chaff : tas de grains de maïs et de haricots rouges à l'huile de palme, dans une assiette. */
const kernel = (x, y, rot = 0) => g(`rotate(${rot} ${x} ${y})`, rect(x - 0.75, y - 0.65, 1.5, 1.3, 0.5, CORN, { w: 0.55 }), rect(x - 0.45, y - 0.45, 0.6, 0.35, 0.15, CORN_LIGHT, false));
const redBean = (x, y, rot = 0) => g(`rotate(${rot} ${x} ${y})`, path(`M${x - 1.5} ${y}C${x - 1.5} ${y - 1.15} ${x + 1.5} ${y - 1.15} ${x + 1.5} ${y}C${x + 1.5} ${y + 0.9} ${x + 0.55} ${y + 0.9} ${x} ${y + 0.4}C${x - 0.55} ${y + 0.9} ${x - 1.5} ${y + 0.9} ${x - 1.5} ${y}Z`, RED_BEAN, { w: 0.6 }), ellipse(x - 0.5, y - 0.35, 0.45, 0.2, "#C8574A", false));
const cornChaff = [
  ellipse(12, 15.6, 10.4, 5.2, C.white),
  ellipse(12, 15.2, 8.4, 3.8, "none", { c: C.bleu, w: 0.7 }),
  path("M4.4 15.6C3.6 14 4.4 12.4 5.6 12.2C5.4 10.6 6.8 9.4 8.2 9.8C8.6 8.2 10.4 7.4 11.8 8.2C13 7.2 15 7.6 15.6 9C17 8.8 18.4 10 18.2 11.6C19.6 12 20.4 13.8 19.6 15.6C14.6 17.4 9.4 17.4 4.4 15.6Z", PALM),
  ellipse(9, 10.4, 1.6, 0.6, "#F2A84A", false),
  redBean(9.4, 11.6, -15), redBean(15, 11.4, 20), redBean(12, 14.6, 0), redBean(6.8, 14.4, 25), redBean(17.4, 14.4, -20),
  kernel(12.2, 10.4, 10), kernel(7.4, 12.4, -20), kernel(16.6, 9.8, 30), kernel(10.2, 13.6, 0), kernel(14.4, 13.4, -15), kernel(18.2, 12.4, 10), kernel(11, 8.6, -10), kernel(14, 8.6, 15), kernel(9.2, 15.4, 5), kernel(15, 15.8, -5),
].join("");

const E = (slug, fr, en, tags, body) => ({ slug, fr, en, char: null, group: "nourriture", tags, tone: false, body });
export default [
  E("miondo", "Miondo", "Miondo", ["miondo", "bâtons de manioc", "cassava sticks", "cameroun", "cameroon", "littoral", "douala", "feuilles", "leaves"], miondo),
  E("soya", "Soya", "Suya skewers", ["soya", "suya", "brochettes", "skewers", "bœuf", "beef", "kankan", "piment", "cameroun", "cameroon"], soya),
  E("beignets-haricots", "Beignets-haricots-bouillie", "Puff-puff, beans and porridge", ["bhb", "beignets", "puff-puff", "haricots", "beans", "bouillie", "porridge", "petit-déjeuner", "cameroun", "cameroon"], bhb),
  E("couscous-mais", "Couscous de maïs, sauce gombo", "Corn fufu with okra soup", ["couscous de maïs", "corn fufu", "gombo", "okra", "sauce gombo", "nord", "cameroun", "cameroon"], couscousMais),
  E("pepper-soup", "Pepper soup", "Pepper soup", ["pepper soup", "soupe pimentée", "bouillon", "broth", "piment", "nord-ouest", "sud-ouest", "cameroun", "cameroon"], pepperSoup),
  E("corn-chaff", "Corn chaff", "Corn chaff", ["corn chaff", "maïs", "corn", "haricots", "beans", "huile de palme", "palm oil", "nord-ouest", "cameroun", "cameroon"], cornChaff),
];
