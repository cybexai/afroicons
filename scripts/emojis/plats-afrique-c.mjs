// Emojis africains originaux : plats d'Afrique, lot C (sans équivalent Unicode, char: null).
// Bazeen (Libye), méchoui (Maghreb, Mauritanie), calulu (São Tomé), kari zourit (Seychelles), kisra (Soudan),
// akoumé et gboma dessi (Togo). Chaque plat garde son contenant et 2 ou 3 éléments signature, lisibles à 16 px.
import { O, W, C, path, circle, ellipse, rect, line, g } from "./lib.mjs";

const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const steam = (xs, y = 4.6) => line(xs.map((x) => `M${x} ${y}Q${x - 0.8} ${y - 1.4} ${x} ${y - 2.6}`).join(""), C.gris, 0.8);

/* ---------- couleurs ---------- */
const SAUCE = "#C8341F", SAUCE_LIGHT = "#E8603A", SAUCE_DARK = "#9C2414";
const BARLEY = "#C99A62", BARLEY_SHADE = "#A5753F", BARLEY_LIGHT = "#EBCB97";
const EGG = "#FFFDF6", YOLK = "#F6C23E";
const POTATO = "#EAC36A", LAMB = "#7A3C1E";
const DISH = "#E9E1D2", DISH_SHADE = "#CFC3AE";

/* 1. Bazeen : dôme lisse et brillant de pâte d'orge au centre d'un plat creux, noyé de sauce tomate rouge, demi-œufs
 *    durs, pommes de terre et morceaux d'agneau autour. */
const halfEgg = (cx, cy) => ellipse(cx, cy, 2.1, 1.35, EGG, { w: 0.7 }) + circle(cx + 0.1, cy - 0.05, 0.85, YOLK, false);
const chunk = (x, y, w, h, fill, dark) => rect(x, y, w, h, 0.7, fill, false) + rect(x, y + h * 0.55, w, h * 0.45, 0.5, dark, false);
const bazeen = [
  ellipse(12, 21, 9.6, 1.2, "#E9DFC9", false),
  // plat creux vu de haut, petit pied
  ellipse(12, 14.4, 10.8, 5.4, DISH),
  // sauce rouge
  ellipse(12, 14.6, 9.2, 4.2, SAUCE, false),
  path("M3.6 13.8Q4.8 11.4 8.4 10.6", "none", { c: SAUCE_LIGHT, w: 0.9 }),
  path("M13.6 18.4Q17.6 18.4 20 16.4", "none", { c: SAUCE_DARK, w: 0.9 }),
  // agneau et demi-œuf au fond
  chunk(3.6, 12.2, 2.8, 2, "#8C4A26", LAMB),
  halfEgg(18.6, 12.2),
  // dôme d'orge, large et bas
  path("M6.6 15C6.2 10.4 8.6 6.8 12 6.8S17.8 10.4 17.4 15Q12 16.8 6.6 15Z", BARLEY),
  path("M14.8 7.8Q17.8 10.4 17.4 15Q15.8 15.7 14.4 15.9Q16.4 11.6 14.8 7.8Z", BARLEY_SHADE, false),
  ellipse(9.6, 9.8, 1.6, 0.9, BARLEY_LIGHT, false),
  path("M6.6 15C6.2 10.4 8.6 6.8 12 6.8S17.8 10.4 17.4 15Q12 16.8 6.6 15Z", "none"),
  // demi-œuf, pomme de terre et agneau devant
  halfEgg(5.6, 17.2),
  chunk(16.8, 16.2, 2.8, 2, POTATO, "#D3A64C"),
  chunk(11, 17.4, 2.8, 1.7, "#8C4A26", LAMB),
].join("");

/* 2. Méchoui : agneau entier rôti, doré et luisant, couché sur un grand plateau de cuivre, pattes tendues dont les os
 *    dépassent ; petit bol de cumin et de sel devant. */
const ROAST = "#C0702E", ROAST_DARK = "#8E4A1C", ROAST_LIGHT = "#E59A4E", BONE = "#F4E8CC";
const COPPER = "#D08A3A", COPPER_DARK = "#A7642A";
const bone = (x1, y1, x2, y2) => line(`M${x1} ${y1}L${x2} ${y2}`, O, 2.6) + line(`M${x1} ${y1}L${x2} ${y2}`, BONE, 1.1);
const knuckle = (x, y) => circle(x, y - 0.6, 0.9, BONE, { w: 0.8 }) + circle(x - 0.2, y + 0.7, 0.9, BONE, { w: 0.8 });
const mechoui = [
  ellipse(12, 21.2, 10.4, 1.1, "#E9DFC9", false),
  // plateau de cuivre
  path("M1.2 16.6H22.8Q22 20.2 18 20.4H6Q2 20.2 1.2 16.6Z", COPPER),
  line("M3.4 18.6Q12 19.6 20.6 18.6", COPPER_DARK, 0.8),
  // os des pattes
  bone(6.2, 13.4, 2.8, 11.6), knuckle(2.2, 11.4),
  bone(17.8, 13.4, 21.2, 11.6), knuckle(21.8, 11.4),
  // agneau rôti
  path("M4 16.8C3.6 12.8 6 9.6 9.6 9.4C11.2 9.2 12.8 9.3 14.4 9.4C18 9.6 20.4 12.8 20 16.8Z", ROAST),
  path("M5 16.6C5 15 5.6 14 6.8 13.6Q9 15.6 12 15.6Q15 15.6 17.2 13.6Q18.4 14 19 16.6Z", ROAST_DARK, false),
  path("M7.6 10.8Q10 10 12.6 10.4", "none", { c: ROAST_LIGHT, w: 1.1 }),
  line("M9.2 11.6Q8.6 14 9.2 16.2M12 11.2Q11.6 13.8 12 16.4M14.8 11.6Q14.4 14 14.8 16.2", ROAST_DARK, 0.9),
  path("M4 16.8C3.6 12.8 6 9.6 9.6 9.4C11.2 9.2 12.8 9.3 14.4 9.4C18 9.6 20.4 12.8 20 16.8Z", "none"),
  // bol de cumin et sel
  path("M15.6 18.4H21.4Q21.2 21.8 18.5 21.8Q15.8 21.8 15.6 18.4Z", C.terre),
  path("M16.2 18.4Q16.8 16.8 18.5 16.8Q20.2 16.8 20.8 18.4Z", "#8A6A3A", { w: 0.8 }),
  dots([[17.6, 17.8], [19.2, 17.6]], 0.3, C.white),
].join("");

/* 3. Calulu : marmite noire à anses pleine d'un ragoût sombre à l'huile de palme, rondelles de gombo, feuilles, queue de
 *    poisson fumé qui dépasse ; banane plantain devant. */
const POT = "#3A3532", POT_LIGHT = "#5A534E";
const STEW = "#3E2A18", STEW_OIL = "#C9561E", OKRA = "#5E9440", OKRA_IN = "#CFE0A0";
const SMOKED = "#B07A3E", SMOKED_DARK = "#7E5226";
const PLANTAIN = "#EBCB5C", PLANTAIN_DARK = "#B8902E";
const okraSlice = (x, y) => circle(x, y, 1.25, OKRA, { w: 0.7 }) + circle(x, y, 0.55, OKRA_IN, false);
const calulu = [
  ellipse(12, 21.4, 10, 1.1, "#E9DFC9", false),
  // queue de poisson fumé
  path("M11.2 9L11.8 6.2L9.6 3C11.2 3 12.4 3.8 13.1 4.8C13.8 3.8 15 3 16.6 3L14.4 6.2L14.8 9Z", SMOKED),
  line("M12.2 6.4L11.2 4.2M14 6.4L15 4.2", SMOKED_DARK, 0.6),
  // ragoût
  path("M3.2 12C3.4 9.2 6.2 7.8 9.6 7.8S15.8 9.2 16 12Z", STEW),
  ellipse(6.4, 10.6, 1.8, 0.5, STEW_OIL, false), ellipse(13.4, 10.8, 1.4, 0.45, STEW_OIL, false),
  path("M8.6 9.4Q10 8.6 11 9.6Q9.8 10.4 8.6 9.4Z", "#3F7A35", { w: 0.6 }),
  okraSlice(6.8, 9.4), okraSlice(11.6, 10.6),
  // marmite
  path("M2.6 13.4H1.2V15.8H2.8", "none", { c: O, w: 1.6 }),
  path("M16.6 13.4H18V15.4", "none", { c: O, w: 1.6 }),
  path("M2.8 12C2.2 17.2 4.6 20.4 9.6 20.4S17 17.2 16.4 12Z", POT),
  line("M4.6 14.4Q4.6 17.6 7 18.8", POT_LIGHT, 0.9),
  rect(1.8, 11.2, 15.6, 1.6, 0.8, POT_LIGHT),
  // banane plantain
  path("M11.2 20.6C15.8 23 20.8 20.8 22.6 15.2C22.8 14.2 21.8 13.8 21.2 14.6C19.4 17.8 16.2 19.4 12 18.8C11 18.8 10.4 20 11.2 20.6Z", PLANTAIN),
  line("M13 19.9Q17.6 20.6 21.2 16.4", PLANTAIN_DARK, 0.6),
  path("M21.2 14.6L21.8 13.6", "none", { c: O, w: 1.2 }),
].join("");

/* 4. Kari zourit : bol de curry de poulpe au lait de coco, sauce jaune-orangé, tentacule enroulé à ventouses qui dépasse,
 *    morceaux de poulpe ; dôme de riz blanc à côté. */
const CURRY = "#F2A33A", CURRY_LIGHT = "#FBC96A", OCTO = "#B4506A", OCTO_DARK = "#8A3550", SUCKER = "#F4CBD0";
const RICE = "#FFFDF6", RICE_SHADE = "#E4DCC8";
const karizourit = [
  ellipse(12, 21.2, 10.4, 1.1, "#E9DFC9", false),
  // dôme de riz
  path("M13.4 19.6C12.6 16.2 14.8 13.2 18.2 13.2S23.6 16.2 22.8 19.6C21.6 20.4 14.6 20.4 13.4 19.6Z", RICE),
  path("M19.8 14Q22.8 15.8 22.4 19.4Q20.6 19.9 19 19.9Q21.4 17 19.8 14Z", RICE_SHADE, false),
  line("M16 16.2L16.7 15.8M18.2 17.6L18.9 17.2M16.4 18.6L17.1 18.4M20 16.4L20.6 16", RICE_SHADE, 0.6),
  path("M13.4 19.6C12.6 16.2 14.8 13.2 18.2 13.2S23.6 16.2 22.8 19.6C21.6 20.4 14.6 20.4 13.4 19.6Z", "none"),
  // tentacule enroulé
  path("M4.2 13.2C3.4 9.4 4.8 5.2 8.8 4.2C12 3.4 14.4 5.6 13.6 8.4C13 10.2 10.6 10.6 9.8 9C9.4 8.2 9.8 7.4 10.6 7.4C11.4 7.6 11.8 7.2 11.6 6.6C11 5.4 9.2 5.6 8.2 6.6C6.8 8 6.6 10.6 7.2 13.2Z", OCTO),
  dots([[6.6, 11.2], [6.6, 9], [7.4, 7.2], [8.8, 6.2]], 0.5, SUCKER),
  // bol de curry
  path("M1.2 13H14.4Q14 20 7.8 20Q1.6 20 1.2 13Z", C.white),
  line("M2.2 15.4Q3.4 18.6 7.6 19", C.bleu, 0.9),
  ellipse(7.8, 13, 6.6, 1.5, CURRY),
  ellipse(6, 12.8, 1.6, 0.4, CURRY_LIGHT, false),
  // morceaux de tentacule dans la sauce
  path("M9.6 13.4Q10.4 11.6 12.4 12Q12.8 12.6 12.2 13.2Q11.2 13.8 9.6 13.4Z", OCTO, { w: 0.7 }),
  circle(10.8, 12.9, 0.3, SUCKER, false), circle(11.8, 12.6, 0.3, SUCKER, false),
].join("");

/* 4bis. Kisra : galettes de sorgho très fines, crème pâle, pliées et empilées (pli arrondi, bord libre ondulé), petits
 *    trous de fermentation ; bol de mullah (ragoût rouge-brun) à côté. Plus clair et plié, à l'inverse de l'injera
 *    étalée en disque gris. */
const KISRA = "#EED8AA", KISRA_SHADE = "#D6B97F", KISRA_HOLE = "#B8955A";
const MULLAH = "#8E3B1E", MULLAH_LIGHT = "#B85A2C", CALABASH = "#8A5A2E";
const sheet = (x0, x1, y0, y1) => {
  const m = (y0 + y1) / 2, h = (y1 - y0) / 2;
  return path(`M${x1} ${y0}H${x0 + h}A${h} ${h} 0 0 0 ${x0 + h} ${y1}H${x1}Q${x1 + 0.9} ${m + h / 2} ${x1} ${m}Q${x1 - 0.7} ${m - h / 2} ${x1} ${y0}Z`, KISRA)
    + line(`M${x0 + h + 0.4} ${y1 - 0.7}H${x1 - 0.4}`, KISRA_SHADE, 0.7);
};
const kisra = [
  ellipse(12, 21.2, 10.4, 1.1, "#E9DFC9", false),
  sheet(1.4, 12.4, 16.4, 20.2),
  dots([[6.2, 18], [9.6, 18.2], [8, 17.4]], 0.4, KISRA_HOLE),
  sheet(2.6, 13.2, 12.6, 16.4),
  dots([[7.8, 14.2], [11.2, 14.4], [5.6, 14.8]], 0.4, KISRA_HOLE),
  sheet(1.8, 12, 8.8, 12.6),
  dots([[6, 10.4], [9.2, 10.6], [7.6, 11.4]], 0.4, KISRA_HOLE),
  // bol de mullah, large et bas
  path("M13.4 14.6H23Q22.8 20.4 18.2 20.4Q13.6 20.4 13.4 14.6Z", CALABASH),
  ellipse(18.2, 14.6, 4.8, 1.3, MULLAH),
  ellipse(17, 14.4, 1.5, 0.4, MULLAH_LIGHT, false),
  circle(19.6, 14.7, 0.5, "#5E3A1E", false),
  line("M15 17Q15.8 19.2 17.8 19.5", "#B07A44", 0.8),
].join("");

/* 6. Akoumé et gboma dessi : dôme lisse de pâte de maïs blanc-jaune pâle sur une assiette ; devant, bol de sauce
 *    d'épinards gboma vert foncé luisante d'huile rouge, avec un poisson posé dessus. */
const AKOUME = "#F6EDC6", AKOUME_SHADE = "#DCCB95";
const GBOMA = "#2C5422", GBOMA_LIGHT = "#4F7F34", RED_OIL = "#D9481E";
const FISH = "#A0866A", FISH_DARK = "#6E5640", CLAY = "#A9542C", CLAY_DARK = "#7E3A1C";
const akoume = [
  ellipse(12, 21.6, 10.4, 1, "#E9DFC9", false),
  // assiette et dôme d'akoumé
  ellipse(7.4, 15.4, 6.6, 1.6, C.white),
  path("M1.6 15.2C1.4 10.6 4 7 7.6 7S13.8 10.6 13.6 15.2Q7.6 16.6 1.6 15.2Z", AKOUME),
  path("M10.2 7.6Q13.8 10.2 13.6 15.2Q12 15.7 10.4 15.8Q12.4 11.4 10.2 7.6Z", AKOUME_SHADE, false),
  ellipse(5, 9.8, 1.4, 1, C.white, false),
  path("M1.6 15.2C1.4 10.6 4 7 7.6 7S13.8 10.6 13.6 15.2Q7.6 16.6 1.6 15.2Z", "none"),
  // poisson
  path("M11.2 12C12.2 9.8 15.8 9 18.4 10.8L21.6 8.8V14.6L18.4 12.8C16 14.8 12 14.2 11.2 12Z", FISH),
  line("M15.4 10.2Q14.6 11.8 15.4 13.4", FISH_DARK, 0.7),
  circle(13.4, 11.4, 0.55, O, false),
  // bol de sauce gboma
  path("M9.8 15H23Q22.8 21.4 16.4 21.4Q10 21.4 9.8 15Z", CLAY),
  line("M11.6 17.4Q12.8 19.8 15.8 20.2", "#C8703E", 0.8),
  ellipse(16.4, 15, 6.6, 2, GBOMA),
  line("M12.4 15.2L13.6 14.6M17.6 15.6L18.8 15M20 14.6L21 14.2", GBOMA_LIGHT, 0.6),
  ellipse(15, 15.4, 1.6, 0.45, RED_OIL, false), ellipse(20.4, 15.4, 1, 0.35, RED_OIL, false),
].join("");

const E = (slug, fr, en, tags, body) => ({ slug, fr, en, char: null, group: "nourriture", tags, tone: false, body });
export default [
  E("akoume", "Akoumé et gboma dessi", "Akume with gboma dessi", ["akoumé", "akume", "gboma dessi", "togo", "maïs", "corn", "épinards", "spinach", "huile de palme", "palm oil", "poisson"], akoume),
  E("kisra", "Kisra", "Kisra", ["kisra", "soudan", "sudan", "soudan du sud", "south sudan", "sorgho", "sorghum", "galette", "flatbread", "mullah"], kisra),
  E("kari-zourit", "Kari zourit", "Octopus curry", ["kari zourit", "octopus curry", "seychelles", "poulpe", "octopus", "lait de coco", "coconut milk", "curry", "riz", "rice"], karizourit),
  E("calulu", "Calulu", "Calulu", ["calulu", "sao tomé-et-principe", "são tomé and príncipe", "poisson fumé", "smoked fish", "gombo", "okra", "huile de palme", "palm oil", "banane"], calulu),
  E("mechoui", "Méchoui", "Mechoui", ["méchoui", "mechoui", "mauritanie", "mauritania", "maroc", "morocco", "algérie", "algeria", "agneau", "lamb", "broche", "cumin"], mechoui),
  E("bazeen", "Bazeen", "Bazeen", ["bazeen", "libye", "libya", "orge", "barley", "agneau", "lamb", "sauce tomate", "tomato sauce", "œuf", "egg"], bazeen),
];
