// Emojis africains originaux : plats du Cameroun, lot A (sans équivalent Unicode, char: null).
// Chaque plat garde son contenant (bol, feuille de bananier, assiette, calebasse, marmite, plat creux) et ses
// ingrédients signature en grand, pour rester reconnaissable à 24 px et propre à 16 px.
import { O, W, C, path, circle, ellipse, rect, line, g } from "./lib.mjs";

const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const steam = (xs, y = 4.6) => line(xs.map((x) => `M${x} ${y}Q${x - 0.8} ${y - 1.4} ${x} ${y - 2.6}`).join(""), C.gris, 0.8);

/* ---------- couleurs ---------- */
const ERU = "#24401F", ERU_LIGHT = "#5E8A34";
const PALM = "#E8782A", PALM_LIGHT = "#F6A24A";
const FUFU = "#F7F3E6", FUFU_SHADE = "#DCD4BE";
const KANDA = "#C79A6A", KANDA_DARK = "#8E6238";
const TARO = "#BBA6B6", TARO_SHADE = "#9A8498", TARO_LIGHT = "#D6C7D2";
const ACHU = "#F2A11C", ACHU_LIGHT = "#FBCB4E";
const LEAF = "#4FA36F", LEAF_DARK = "#2F7A47";
const OKOK = "#4A5A22", OKOK_LIGHT = "#8C9C3E", PEANUT = "#9A7040";
const BOBOLO = "#E9E3CC", BOBOLO_SHADE = "#CFC6A8";
const SANGA = "#3D6E2A", SANGA_LIGHT = "#5E9440";
const POT = "#3A3532", KONDRE = "#9A3A1C", KONDRE_LIGHT = "#C25A2E";
const PLANTAIN = "#E7CF72", PLANTAIN_FACE = "#F6E6A6", GOAT = "#6E321A";
const EKWANG = "#3E7A3A", EKWANG_DARK = "#24532A";
const MINT = "#D2502A", MINT_FACE = "#EC7A44", STRING = "#E2C98E";

/* 1. Eru et water fufu : bol de feuilles d'eru émincées vert très sombre, luisantes d'huile de palme, morceaux de
 *    peau de vache ; boule blanche et lisse de water fufu à côté. */
const eru = [
  ellipse(12, 20.4, 10.4, 1.6, "#E9DFC9", false),
  // bol en bois
  path("M1.4 11.8H15.8Q15.4 19.6 8.6 19.6Q1.8 19.6 1.4 11.8Z", C.bois),
  line("M2.8 15.4Q4.6 18.4 8.4 18.6", "#C68A52", 0.8),
  ellipse(8.6, 11.8, 7.2, 1.7, "#7E4E2C"),
  // dôme d'eru
  path("M2.4 12Q2.2 7.4 5.6 6.8Q8.2 4.8 11 6.2Q14.8 6.8 14.8 12Q8.6 13.6 2.4 12Z", ERU),
  line("M4 10.2L5.4 9.4M6.4 8.2L7.8 7.6M9.4 7.4L10.8 7.2M12 8.6L13.4 8.2M5.2 11.6L6.6 10.8M8.6 10L10 9.4M11 11.4L12.4 10.8M13 10.4L14 10", ERU_LIGHT, 0.7),
  ellipse(7.4, 9.6, 1.4, 0.45, PALM_LIGHT, false), ellipse(11.8, 9.8, 1.1, 0.4, PALM, false), ellipse(4.6, 11.8, 1, 0.35, PALM, false),
  // peau de vache (kanda)
  rect(8.2, 10.6, 2.6, 1.6, 0.6, KANDA, { w: 0.8 }), line("M8.8 11.4H10.2", KANDA_DARK, 0.6),
  rect(4.4, 7.8, 2, 1.3, 0.5, KANDA, { w: 0.8 }),
  // boule de water fufu
  circle(18.6, 15.8, 4.2, FUFU),
  path("M15 17.8Q16.6 20.2 19.6 19.9Q21.6 19.4 22.4 17.4Q20.6 19 18 18.6Q16 18.4 15 17.8Z", FUFU_SHADE, false),
  ellipse(17.2, 13.8, 1.4, 0.8, C.white, false),
  circle(18.6, 15.8, 4.2, "none"),
].join("");

/* 2. Achu (sauce jaune) : monticule de taro pilé mauve-gris creusé d'un puits de sauce jaune-orange vif, qui déborde,
 *    sur une feuille de bananier, morceaux de viande. */
const achu = [
  // feuille de bananier en biais
  path("M0.8 19.6Q7 14.4 17.4 14.4Q21.6 14.6 23.2 16Q18.6 21.6 9 22Q3 22 0.8 19.6Z", LEAF),
  line("M1.6 19.8Q11 17.6 22.4 16.1", LEAF_DARK, 0.7),
  line("M6 21.2L7.4 19.2M11 21.4L12 18.6M16 20.2L16.8 17.8", LEAF_DARK, 0.6),
  // monticule de taro, évasé à la base
  path("M2.6 18.6Q5.2 16.8 5.6 12.4Q5.8 9.6 7.2 9Q12 7.4 16.8 9Q18.2 9.6 18.4 12.4Q18.8 16 21.4 17.4Q12 21 2.6 18.6Z", TARO),
  path("M3.6 18.6Q5.8 17.4 6.6 13.6Q7 16.8 9.6 18.8Q6 19.2 3.6 18.6Z", TARO_SHADE, false),
  line("M16.4 12.6Q16.6 15.6 18.2 17", TARO_LIGHT, 0.8),
  path("M2.6 18.6Q5.2 16.8 5.6 12.4Q5.8 9.6 7.2 9Q12 7.4 16.8 9Q18.2 9.6 18.4 12.4Q18.8 16 21.4 17.4Q12 21 2.6 18.6Z", "none"),
  // puits de sauce jaune et coulures
  ellipse(12, 10, 5.4, 2.1, TARO_SHADE),
  ellipse(12, 10.3, 4.4, 1.5, ACHU, false),
  path("M8.4 11.2Q8.2 13.4 8.9 14.2Q9.7 13.4 9.4 11.4Z", ACHU, { w: 0.8 }),
  path("M14.4 11.4Q14.6 14.4 15.4 15.2Q16.2 14.2 15.6 11.2Z", ACHU, { w: 0.8 }),
  ellipse(11, 9.9, 1.8, 0.45, ACHU_LIGHT, false),
  // viande dans la sauce
  rect(12.4, 9.2, 2.2, 1.4, 0.5, "#7A3C1E", { w: 0.7 }),
  dots([[9.6, 10.6], [15.6, 10]], 0.3, "#B5300F"),
].join("");

/* 3. Okok : lanières vertes de gnetum liées à la pâte d'arachide, sur une assiette, bâtons de manioc devant. */
const strand = (d) => line(d, OKOK_LIGHT, 0.7);
const okok = [
  ellipse(12, 14.4, 10.8, 4.4, C.white),
  ellipse(12, 14.2, 7.8, 2.8, C.grisLight, false),
  // tas d'okok
  path("M4.2 14.4Q3.8 9.6 7.6 8.4Q10 5.8 13.4 6.8Q17.6 7.4 18.8 10.6Q20.2 12.8 19.6 14.6Q12 17.2 4.2 14.4Z", OKOK),
  path("M6 13.6Q9 15 12.4 14.6Q9.2 12.6 6 13.6Z", PEANUT, false),
  path("M13.6 12.4Q16.4 13.6 18.6 12.6Q16.4 11.2 13.6 12.4Z", PEANUT, false),
  strand("M5.6 12Q7.6 9.6 10.4 10.2M7.6 9.2Q10 7.2 12.6 8.2M11 11.6Q13.6 9.6 16.6 10.4M13.2 8.4Q15.8 7.8 17.6 9.6M8.4 13Q10.6 11.8 13 12.4M15.2 12.6Q17 11.8 18.6 12.6"),
  // bâtons de manioc (bobolo)
  g("rotate(-12 13 19.8)",
    rect(3.4, 18.2, 19, 3.2, 1.6, BOBOLO),
    line("M5 20.6H20.6", BOBOLO_SHADE, 0.7),
    line("M8.4 18.2V21.4M17.2 18.2V21.4", LEAF_DARK, 1)),
].join("");

/* 4. Sanga : calebasse pleine de feuilles vertes au jus de noix de palme, constellées de grains de maïs jaunes. */
const kernel = (x, y, rot = 0) => g(`rotate(${rot} ${x} ${y})`, ellipse(x, y, 0.95, 0.75, C.jaune, { w: 0.6 }));
const sanga = [
  path("M1.6 11Q1.6 21 12 21Q22.4 21 22.4 11Z", "#C98A43"),
  line("M3.2 14.6Q4.6 19.2 10 19.8", "#E0A964", 0.8),
  line("M5.4 16.4L7 17.4M8.6 18.4L10.4 19", "#9A6128", 0.7),
  ellipse(12, 11, 10.4, 3.6, "#9A6128"),
  // purée verte bombée
  path("M2.8 11.2Q3 6.4 8.2 5.8Q12 4.6 15.8 5.8Q21 6.4 21.2 11.2Q12 14.4 2.8 11.2Z", SANGA),
  line("M4.6 9.4Q6 8 7.8 8.6M14.6 7.2Q16.6 6.6 18.2 8M9.4 11.6Q11 10.6 12.6 11.4M16.4 10.8Q18 10 19.4 10.6", SANGA_LIGHT, 0.8),
  ellipse(11.4, 8.2, 1.6, 0.5, PALM, false), ellipse(17.6, 9.4, 1.2, 0.4, PALM, false), ellipse(6, 11, 1.1, 0.4, PALM, false),
  kernel(6.4, 8.8, 20), kernel(9.8, 7.2, -10), kernel(13.8, 6.8, 15), kernel(17.4, 7.8, -20), kernel(8.2, 10.6, 0),
  kernel(12, 9.8, 30), kernel(15.4, 10.6, -15), kernel(19, 10.4, 10), kernel(4.8, 10.6, -25), kernel(11.2, 12, 0),
].join("");

/* 5. Kondrè : marmite à anses, tronçons de plantain vert mijotés dans une sauce brun-rouge épicée, viande de chèvre. */
const piece = (x, y, rot) => g(`rotate(${rot} ${x} ${y})`,
  rect(x - 2.1, y - 3.4, 4.2, 4.6, 1.2, PLANTAIN),
  line(`M${x - 1} ${y - 2.2}V${y + 0.6}`, "#F4E4A0", 0.7),
  ellipse(x, y - 3.4, 2.1, 1, PLANTAIN_FACE, { w: 0.8 }),
  ellipse(x, y - 3.4, 0.8, 0.35, "#D8BE5E", false));
const round = (x, y) => circle(x, y, 2, PLANTAIN, { w: 0.9 }) + circle(x, y, 1.2, PLANTAIN_FACE, false) + circle(x, y, 0.35, "#C9AE52", false);
const kondre = [
  // anses
  path("M3.4 12.6Q0.8 12.4 1 14.4Q1.4 15.8 3.6 15.4", "none", { w: 1.4 }),
  path("M20.6 12.6Q23.2 12.4 23 14.4Q22.6 15.8 20.4 15.4", "none", { w: 1.4 }),
  path("M2.8 11.4Q2.6 21 12 21Q21.4 21 21.2 11.4Z", POT),
  line("M4.6 15.2Q5.6 18.8 9.4 19.6", C.gris, 0.8),
  ellipse(12, 11.4, 9.8, 3, "#2A2522"),
  ellipse(12, 11.6, 8.8, 2.4, KONDRE),
  // tronçons de plantain et chèvre qui dépassent de la sauce
  piece(7.8, 11.6, -32), piece(15.8, 11.4, 28), round(11.8, 10.6),
  path("M17.6 11.4Q18.6 9.4 20.2 10.6Q20.4 11.8 19 12.2Z", GOAT, { w: 0.8 }),
  path("M3.8 11.6Q4.4 9.8 6.2 10.4Q6.4 11.6 5 12.2Z", GOAT, { w: 0.8 }),
  ellipse(12, 12.4, 3, 0.5, KONDRE_LIGHT, false),
  dots([[5.6, 12.2], [18.4, 12.4], [9.8, 12.6]], 0.3, "#E0A030"),
  steam([10, 14.4], 4.8),
].join("");

/* 6. Ekwang : rouleaux de macabo râpé enroulés dans des feuilles (verts, striés, alignés), dans une sauce à l'huile de palme. */
const roll = (x, y, len) => g(`rotate(-22 ${x} ${y})`,
  rect(x - len / 2, y - 1.25, len, 2.5, 1.25, EKWANG, { w: 0.9 }),
  line(Array.from({ length: Math.floor(len / 1.6) - 1 }, (_, k) => `M${x - len / 2 + 1.4 + k * 1.6} ${y + 1.1}L${x - len / 2 + 2.2 + k * 1.6} ${y - 1.1}`).join(""), EKWANG_DARK, 0.6));
const ekwang = [
  ellipse(12, 14.4, 11, 7.4, C.white),
  ellipse(12, 14.4, 10.2, 6.6, "none", { c: C.bleu, w: 0.7 }),
  ellipse(12, 14.5, 9.2, 5.8, PALM, { w: 0.9 }),
  ellipse(7.6, 17.6, 2, 0.6, PALM_LIGHT, false), ellipse(17, 11, 1.6, 0.5, PALM_LIGHT, false),
  roll(10.2, 11.2, 9), roll(12.4, 14.6, 11.4), roll(14, 18, 8.4),
  dots([[4.8, 13.6], [19.6, 15.6], [6.4, 11.4]], 0.4, C.rouge),
].join("");

/* 7. Mintoumba : pâte de manioc fermentée à l'huile de palme, en pain cylindrique orange-rouge, sur une feuille de bananier
 *    ouverte et ficelée. */
const mintumba = [
  // feuille ouverte
  path("M0.6 18.6Q4.6 11.4 13 11Q19.6 10.8 23.4 13Q21 20.6 12 21.6Q4.4 22 0.6 18.6Z", LEAF),
  line("M1.6 18.4Q12 15.6 22.6 13.4", LEAF_DARK, 0.7),
  line("M4.8 20.2L6.6 17.4M9.6 21.2L11 16.6M14.6 20.6L15.6 15.6M19.2 18.6L19.8 14.6", LEAF_DARK, 0.6),
  // pain cylindrique
  rect(3.4, 7.8, 15, 7.4, 3.7, MINT),
  line("M5.4 10H16.6", "#E8774A", 0.9),
  line("M5 14H17", "#A93C1E", 0.8),
  ellipse(18.2, 11.5, 2.2, 3.7, MINT_FACE),
  ellipse(18.2, 11.5, 1, 1.8, "#F49A64", false),
  dots([[7.4, 12], [11.6, 11.2], [14.4, 12.6]], 0.35, "#F49A64"),
  // ficelle
  line("M7.6 7.8V15.2M12.6 7.8V15.2", O, 1.9), line("M7.6 7.8V15.2M12.6 7.8V15.2", STRING, 0.8),
].join("");

const E = (slug, fr, en, tags, body) => ({ slug, fr, en, char: null, group: "nourriture", tags, tone: false, body });
export default [
  E("eru", "Eru et water fufu", "Eru and water fufu", ["eru", "water fufu", "cameroun", "cameroon", "sud-ouest", "south-west", "nord-ouest", "huile de palme", "palm oil", "manioc"], eru),
  E("achu", "Achu (sauce jaune)", "Achu (yellow soup)", ["achu", "sauce jaune", "yellow soup", "cameroun", "cameroon", "nord-ouest", "north-west", "taro", "cocoyam"], achu),
  E("okok", "Okok", "Okok", ["okok", "gnetum", "cameroun", "cameroon", "centre", "sud", "arachide", "peanut", "bâton de manioc", "bobolo"], okok),
  E("sanga", "Sanga", "Sanga", ["sanga", "cameroun", "cameroon", "centre", "maïs", "corn", "noix de palme", "palm nut", "morelle"], sanga),
  E("kondre", "Kondrè", "Kondre", ["kondrè", "kondre", "cameroun", "cameroon", "ouest", "bamiléké", "plantain", "chèvre", "goat"], kondre),
  E("ekwang", "Ekwang", "Ekwang", ["ekwang", "cameroun", "cameroon", "sud-ouest", "south-west", "macabo", "cocoyam", "huile de palme", "palm oil"], ekwang),
  E("mintumba", "Mintoumba", "Mintumba", ["mintoumba", "mintumba", "cameroun", "cameroon", "centre", "est", "manioc", "cassava", "huile de palme", "feuille de bananier"], mintumba),
];
