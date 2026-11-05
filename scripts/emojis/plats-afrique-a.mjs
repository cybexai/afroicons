// Emojis africains originaux : plats d'Afrique australe, centrale et des îles (sans équivalent Unicode, char: null).
// Seswaa (Botswana), isombe (Burundi, Rwanda), cachupa (Cap-Vert), ngunza et gozo (Centrafrique),
// boule et daraba (Tchad), mataba (Comores). Chaque plat garde son contenant et son ingrédient signature.
import { O, W, C, path, circle, ellipse, rect, line, g } from "./lib.mjs";

const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const steam = (xs, y = 5.6) => line(xs.map((x) => `M${x} ${y}Q${x - 0.8} ${y - 1.4} ${x} ${y - 2.6}`).join(""), C.gris, 0.8);
const shadow = (cy = 20.6, rx = 10.4) => ellipse(12, cy, rx, 1.5, "#E9DFC9", false);

/* ---------- couleurs ---------- */
const PAP = "#F7F1E1", PAP_SHADE = "#E2D6B8";
const BEEF = "#9A5A34", BEEF_LIGHT = "#C98A58", BEEF_DARK = "#6E3A1E";
const CLAY = "#B9572E", CLAY_DARK = "#8E3E1E", CLAY_LIGHT = "#D7804E";
const ISOMBE = "#2F5A2A", ISOMBE_LIGHT = "#55863F", PALM = "#E07A22";
const PLANTAIN = "#F2C14E", PLANTAIN_SHADE = "#D99A2B", PLANTAIN_TIP = "#5B3A1E";
const POT = "#3A3532", POT_LIGHT = "#9AA3AB";
const STEW = "#B8642E", HOMINY = "#F6EED6", CORN = "#F6C744", BEAN = "#5E2A1E", BEAN_LIGHT = "#8A4A36";
const SAUSAGE = "#B8322A", SAUSAGE_IN = "#E0705E", CABBAGE = "#8DBF5A";
const GOZO = "#F8F4EA", GOZO_SHADE = "#DDD5C2";
const NGUNZA = "#3E6E2E", NGUNZA_LIGHT = "#6E9E48", PEANUT = "#C9925A";
const BOULE = "#CDBB9C", BOULE_SHADE = "#AE9C7E", BOULE_LIGHT = "#E6D9C0";
const DARABA = "#B4532A", DARABA_LIGHT = "#D9743A", OKRA = "#6E9A2E", OKRA_LIGHT = "#B6D46A";
const MATABA = "#9CC46E", MATABA_LIGHT = "#C9E2A2", MATABA_DARK = "#6E9A48";
const SHELL = "#7A4A2A", SHELL_DARK = "#5A3420", COCO = "#FBF7EE";

/* 1. Seswaa : bœuf bouilli puis pilé en effilochés, en tas, sur une assiette, avec une boule de pap blanche. */
const seswaa = [
  ellipse(12, 16.8, 10.8, 4.6, C.white),
  ellipse(12, 16.6, 8.6, 3.2, "none", { c: C.bleu, w: 0.7 }),
  // pap (bogobe)
  path("M2.8 17Q2 10.8 6.4 10.2Q10.6 10 10.6 16.6Q6.8 18.2 2.8 17Z", PAP),
  path("M3.2 16.4Q6.6 17.4 10.2 16.2Q10.4 17 10.2 17.2Q6.8 18.2 3.4 17.2Z", PAP_SHADE, false),
  ellipse(5.4, 12.4, 1.2, 0.7, C.white, false),
  // tas d'effilochés
  path("M8.6 17.2C7.6 15 8.4 12.8 9.8 12.4L9.6 10.6L11.4 11.2L11.8 9.2L13.2 10.2L14.2 8L15.2 9.8L16.8 8.6L17.2 10.6L19 10.4L18.6 12L20.4 12.8L19.8 13.8C21 14.6 21.6 15.8 21.2 17.2Q15 18.8 8.6 17.2Z", BEEF),
  line("M10 16.2L12.4 12.6M11.8 16.6L14.8 11.6M14 16.8L16.6 12.4M16.4 16.6L18.6 13M18.4 16.4L19.8 14.4", BEEF_DARK, 0.6),
  line("M10.6 13.8L11.8 12.2M13.2 12.8L14.4 10.8M15.6 11.8L16.4 10.4M17.6 12.6L18.4 11.6", BEEF_LIGHT, 0.6),
].join("");

/* 2. Isombe : bol en terre sur pied, purée de feuilles de manioc vert foncé luisante d'huile de palme, plantain à côté. */
const isombe = [
  shadow(20.6, 10.6),
  // bol en terre sur pied
  path("M6.6 17L6 19.6H11.6L11 17Z", CLAY_DARK),
  path("M1.4 10.6H16.2Q15.8 17.6 8.8 17.6Q1.8 17.6 1.4 10.6Z", CLAY),
  line("M2.6 13.2Q8.8 14.8 15 13.2", CLAY_DARK, 0.8),
  line("M3.4 15.2Q5.2 16.8 8 17", CLAY_LIGHT, 0.7),
  ellipse(8.8, 10.6, 7.4, 1.6, CLAY_DARK),
  // isombe
  path("M2.6 10.8Q2.2 6.2 6 5.8Q8.8 4.2 11.6 5.8Q15.2 6.2 15 10.8Q8.8 12.4 2.6 10.8Z", ISOMBE),
  dots([[5, 8.4], [7.4, 7], [10.2, 6.6], [12.6, 8], [8.6, 9.4], [11.4, 9.8], [5.8, 10.2], [13.6, 9.8]], 0.45, ISOMBE_LIGHT),
  ellipse(7.6, 8.6, 1.4, 0.45, PALM, false), ellipse(12, 7.4, 1, 0.35, PALM, false), ellipse(10, 10.2, 1.1, 0.35, PALM, false),
  // plantain
  path("M12 20.6C17.4 22 21.6 18.4 22.4 12.6L22.8 11.6C22.2 11.4 21.2 12.2 20.8 13.2C19.6 16.4 16.8 18.2 12.6 17.6Q11 18.8 12 20.6Z", PLANTAIN),
  path("M12.8 19.8C17.2 20.6 20.6 17.8 21.8 13.6C21.4 17.4 18 20.8 12.6 20.4Z", PLANTAIN_SHADE, false),
  path("M22.4 12.6L22.8 11.6C22.2 11.4 21.2 12.2 20.8 13.2Z", PLANTAIN_TIP, { w: 0.6 }),
].join("");

/* 3. Cachupa : marmite de maïs blanc et jaune, haricots, rondelles de linguiça et chou, louche plantée. */
const kernel = (x, y, fill, rot = 0) => g(`rotate(${rot} ${x} ${y})`, rect(x - 0.7, y - 0.6, 1.4, 1.2, 0.5, fill, { w: 0.5 }));
const bean = (x, y, rot = 0) => g(`rotate(${rot} ${x} ${y})`, ellipse(x, y, 1, 0.62, BEAN, { c: "#3A140C", w: 0.45 }), ellipse(x - 0.3, y - 0.2, 0.36, 0.18, BEAN_LIGHT, false));
const slice = (x, y) => circle(x, y, 1.7, SAUSAGE, { w: 0.8 }) + circle(x, y, 1.05, SAUSAGE_IN, false) + dots([[x - 0.4, y - 0.3], [x + 0.4, y + 0.3], [x + 0.3, y - 0.4]], 0.18, C.cream);
const cachupa = [
  line("M6.2 20L5 22.2M17.8 20L19 22.2", O, 1.8),
  // louche (derrière)
  line("M15.6 8.4L21 2.4", O, 2.6), line("M15.6 8.4L21 2.4", C.bois, 1),
  path("M3 10.4V15.4Q3 20.4 12 20.4Q21 20.4 21 15.4V10.4Z", POT),
  line("M4.8 13.6Q5.2 17.4 8.6 18.6", POT_LIGHT, 0.8),
  path("M3 12.4Q0.8 12.4 1 14Q1.4 15.2 3.1 14.8", "none", { w: 1.4 }),
  path("M21 12.4Q23.2 12.4 23 14Q22.6 15.2 20.9 14.8", "none", { w: 1.4 }),
  ellipse(12, 10.4, 9.6, 2.4, POT),
  // ragoût bombé
  path("M3.6 10.6Q3.4 5.4 8.6 4.8Q12 3.4 15.4 4.8Q20.6 5.4 20.4 10.6Q12 13 3.6 10.6Z", STEW),
  path("M13.4 5.2Q16.6 4.4 18.4 6.4Q16.4 7.4 13.8 6.6Z", CABBAGE, { w: 0.6 }),
  kernel(6.2, 8.4, HOMINY, 10), kernel(11.2, 6, CORN, -10), kernel(12.6, 9.8, HOMINY, 15), kernel(17.8, 9.4, CORN, -20),
  kernel(9.6, 10.4, CORN, 0), kernel(15.2, 10.6, HOMINY, 10), kernel(5, 10.4, CORN, 0), kernel(18.8, 7.6, HOMINY, 20),
  bean(10.6, 8.2, 15), bean(15.6, 8.4, -10), bean(7.4, 6.4, -20),
  slice(8.2, 8.8), slice(14.4, 7.6),
].join("");

/* 4. Ngunza et gozo : grosse boule de pâte de manioc blanche, écuelle de sauce verte de feuilles de manioc à l'arachide. */
const ngunza = [
  shadow(20.2, 10.6),
  // gozo
  path("M10.6 17.2H3.6Q1.6 15.4 1.8 12.2Q2 6.6 7.4 6.4Q12.8 6.6 13 12.6Q12.8 16 10.6 17.2Z", GOZO),
  path("M2.6 15.4Q6.4 17 11.8 15.4Q11.4 16.6 10.6 17.2H3.6Q2.9 16.5 2.6 15.4Z", GOZO_SHADE, false),
  ellipse(5.2, 9.6, 1.4, 0.8, C.white, false),
  // écuelle émaillée
  path("M8 14H22.8Q22.4 19.8 15.4 19.8Q8.4 19.8 8 14Z", C.white),
  line("M8.6 16Q15.4 17.6 22.2 16", C.indigoLight, 0.8),
  ellipse(15.4, 14, 7.2, 1.6, C.white),
  // sauce
  path("M9.2 14.2Q9.4 10.6 15.4 10.6Q21.4 10.6 21.6 14.2Q15.4 15.6 9.2 14.2Z", NGUNZA),
  line("M11.4 12.6L12.8 13.2M14.4 11.6L15.8 12.2M17.6 12.4L19 13M12.8 14L14.2 14.4M16.4 14.2L17.8 14", NGUNZA_LIGHT, 0.7),
  dots([[13.4, 12.2], [17, 11.8], [19.4, 13.4], [11, 13.6]], 0.4, PEANUT),
].join("");

/* 5. Boule et daraba : boule de mil beige-gris moulée en dôme, dans une assiette de daraba (gombo, tomate, arachide). */
const okraRing = (x, y, r = 1.5) => circle(x, y, r, OKRA, { w: 0.7 }) + circle(x, y, r * 0.55, OKRA_LIGHT, false) + dots([[x, y - r * 0.3], [x + r * 0.28, y + r * 0.15], [x - r * 0.28, y + r * 0.15]], 0.18, OKRA);
const bouleDaraba = [
  ellipse(12, 15.8, 10.8, 5.2, C.white),
  ellipse(12, 15.8, 9.2, 4.1, DARABA, false),
  path("M5.4 18Q12 20.4 18.6 18.4", "none", { c: DARABA_LIGHT, w: 0.8 }),
  ellipse(12, 15.8, 9.2, 4.1, "none", { w: 0.6 }),
  // boule de mil
  path("M4.4 14.8Q3.8 5 9 5Q14.2 5 13.6 14.8Q9 16.6 4.4 14.8Z", BOULE),
  path("M11.2 6.6Q13.8 8.4 13.6 14.8Q12.6 15.4 11.4 15.6Q12.6 11 11.2 6.6Z", BOULE_SHADE, false),
  ellipse(7, 9, 0.9, 1.8, BOULE_LIGHT, false),
  path("M4.4 14.8Q3.8 5 9 5Q14.2 5 13.6 14.8Q9 16.6 4.4 14.8Z", "none"),
  // gombo, tomate, arachide
  okraRing(17.2, 14.2), okraRing(14.4, 17.8), okraRing(19.4, 17.2, 1.2),
  dots([[16.4, 12], [6.4, 18], [9.8, 18.6], [18.8, 12.6]], 0.42, C.rouge),
  dots([[11.6, 17.6], [16.2, 16.2], [4.8, 16.6]], 0.36, PEANUT),
].join("");

/* 6. Mataba : bol de feuilles de manioc pilées au lait de coco, vert clair crémeux, noix de coco ouverte à côté. */
const mataba = [
  shadow(20.6, 10.6),
  path("M8 17.8L7.6 19.8H13.2L12.8 17.8Z", C.bois),
  path("M1.8 9.6H19Q18.6 18.2 10.4 18.2Q2.2 18.2 1.8 9.6Z", C.bois),
  line("M3.4 12.8Q4.6 16.4 8.6 17.2", "#C68A52", 0.8),
  ellipse(10.4, 9.6, 8.6, 1.8, "#7E4E2C"),
  path("M2.8 9.8Q3.4 7.4 6.6 7.4Q8.8 6 11 7.2Q13.8 6.2 15.6 7.6Q18.2 7.8 18 9.8Q10.4 11.4 2.8 9.8Z", MATABA),
  line("M5 9.2Q7.6 7.8 10.2 8.8T15.6 8.8", MATABA_LIGHT, 0.9),
  dots([[6.8, 9.8], [13.2, 9.6], [9.4, 7.8]], 0.35, MATABA_DARK),
  steam([8.4, 12.4], 6),
  // noix de coco ouverte
  path("M13 16.4Q13 21.8 17.9 21.8Q22.8 21.8 22.8 16.4Z", SHELL),
  line("M14.6 18.4L15.2 19.4M17.6 19.6L17.8 20.8M20.6 18.6L20.2 19.6", SHELL_DARK, 0.6),
  ellipse(17.9, 16.4, 4.9, 2.2, COCO),
  ellipse(17.9, 16.5, 3.4, 1.3, "#F1E8D2", { c: "#C9B79A", w: 0.6 }),
].join("");

const E = (slug, fr, en, tags, body) => ({ slug, fr, en, char: null, group: "nourriture", tags, tone: false, body });
export default [
  E("seswaa", "Seswaa", "Seswaa", ["seswaa", "botswana", "bœuf pilé", "pounded beef", "viande", "meat", "pap", "bogobe"], seswaa),
  E("isombe", "Isombe", "Isombe", ["isombe", "burundi", "rwanda", "feuilles de manioc", "cassava leaves", "huile de palme", "palm oil", "plantain"], isombe),
  E("cachupa", "Cachupa", "Cachupa", ["cachupa", "cap-vert", "cabo verde", "maïs", "corn", "haricots", "beans", "saucisse", "sausage"], cachupa),
  E("ngunza", "Ngunza et gozo", "Ngunza with gozo", ["ngunza", "gozo", "centrafrique", "central african republic", "feuilles de manioc", "cassava leaves", "arachide", "peanut"], ngunza),
  E("boule-daraba", "Boule et daraba", "Boule with daraba", ["boule", "daraba", "tchad", "chad", "mil", "millet", "gombo", "okra", "arachide"], bouleDaraba),
  E("mataba", "Mataba", "Mataba", ["mataba", "comores", "comoros", "feuilles de manioc", "cassava leaves", "lait de coco", "coconut milk", "noix de coco"], mataba),
];
