// Emojis faune d'Afrique, lot C : oiseaux (dessins originaux Afroicons).
// Oiseaux de profil, tête à gauche (le hibou grand-duc de face), couleur à plat et contour brun foncé, comme le flamant ou l'autruche.
import { O, W, C, path, circle, ellipse, rect, line, g } from "./lib.mjs";

/** Trait épais « plein » : contour brun puis couleur par-dessus (cous, pattes fines, becs fins, branches). */
const thick = (d, col, w = 1.5) => line(d, O, w + 2 * W) + line(d, col, w);
const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const eye = (x, y, r = 0.55) => circle(x, y, r, O, false);
const branch = (d = "M1.6 20.6H22.4") => thick(d, C.bois, 1.4);

/* ---------- grue couronnée ---------- */
const CRANE = "#8E98A2", CRANE_DARK = "#5E6670", CRANE_GOLD = "#E8B23A";
const grueCouronnee = [
  thick("M12.6 15.6L12.4 22.4M15.6 15.4L16 22.4", C.noir, 0.55),
  // corps gris, ailes blanches et dorées, queue tombante
  path("M9.4 11Q11 8.4 15 8.4Q19.6 8.6 21.6 13Q22.6 15.4 22 16.4Q19.6 15.4 17.6 15.8Q14 16.8 11.4 15.6Q8.8 14 9.4 11Z", CRANE),
  path("M12.6 11.4Q16.6 10.2 20.4 12.8Q21.4 14.2 21.2 15.2Q18.6 14.6 16.4 14.8Q13.4 14.6 12.6 11.4Z", C.white, { w: 0.8 }),
  path("M15.6 12Q18.6 12 20.6 13.6Q19.4 14.4 17.6 14.2Q16.2 13.6 15.6 12Z", "#B5652F", { w: 0.6 }),
  // long cou gris
  thick("M10.6 11.6Q7.6 10.6 7.2 7.6Q7 6.4 6.6 5.8", CRANE, 1.6),
  // tête : front noir, joue blanche à liseré rouge, caroncule rouge, bec court
  circle(6, 5.6, 2, C.noir),
  path("M5.6 5.4Q7.2 4.4 8 5.8Q8 7.4 6.6 7.6Q5.4 7.2 5.6 5.4Z", C.white, { w: 0.7 }),
  path("M5.8 5Q7 4.2 7.8 5.2", "none", { c: C.rouge, w: 0.6 }),
  path("M4.4 5.4L1.6 6.8L4.4 6.8Z", CRANE_DARK, { w: 0.8 }),
  path("M4.8 7Q4.4 8.6 5.2 8.8Q6 8.4 5.6 7.2Z", C.rouge, { w: 0.6 }),
  // couronne de plumes dorées en éventail
  line("M6.4 3.8L4.4 1.6M6.8 3.8L6.8 1.2M7.2 3.8L9 1.6M7.6 4.2L10 2.8", O, 1.5),
  line("M6.4 3.8L4.4 1.6M6.8 3.8L6.8 1.2M7.2 3.8L9 1.6M7.6 4.2L10 2.8", CRANE_GOLD, 0.7),
  eye(5.4, 5.4, 0.45),
].join("");

/* ---------- tisserin et son nid ---------- */
const WEAV = "#F2C21E", NEST = "#B49A55", NEST_DARK = "#8A7438";
const tisserin = [
  thick("M1.4 6.4Q9 5.4 22.6 6.6", C.bois, 1.4),
  // nid tissé suspendu, tube d'entrée en dessous
  thick("M15.8 6.6V8", NEST_DARK, 0.6),
  path("M14 18Q14 21.6 14.6 22.4H16.8Q17.2 21.6 17 18Z", NEST_DARK),
  path("M15.8 7.8Q20.8 8.2 21 13.6Q21 18.4 15.8 18.6Q10.8 18.4 10.8 13.6Q11 8.2 15.8 7.8Z", NEST),
  line("M11.6 11Q15.8 12.6 20.2 11M11 13.8Q15.8 15.6 20.8 13.8M11.6 16.4Q15.8 17.8 20.2 16.4", NEST_DARK, 0.7),
  line("M13.4 9.4L14.4 17.8M18 9.2L17.4 17.8", NEST_DARK, 0.6),
  // tisserin jaune à masque noir, perché sur la branche
  path("M3.6 6Q4.8 3 8.4 3.4Q10.8 3.8 11.6 5.2L13 4.4L12.4 6.6Q11 8.2 8.4 8.4Q4.8 8.6 3.6 6Z", WEAV),
  path("M3.2 4.4Q3.4 2.2 5.6 2.2Q7.4 2.4 7.4 4.4Q7 6.2 5.2 6.2Q3.4 6 3.2 4.4Z", C.noir),
  path("M3.4 3.6L1.4 4.4L3.4 5Z", C.noir, { w: 0.6 }),
  path("M8.2 4.8Q10 4.6 11.2 5.8Q9.8 6.8 8.4 6.4Z", "#C99A12", { w: 0.6 }),
  circle(5.2, 3.8, 0.6, C.rouge, false), eye(5.2, 3.8, 0.3),
].join("");

/* ---------- bec-en-sabot ---------- */
const SHOE = "#8E9EAA", SHOE_DARK = "#6C7C88", SHOE_BILL = "#CDBF97";
const becEnSabot = [
  thick("M11.6 18.4V22.4M14.6 18V22.4", "#4A4E52", 0.8),
  // corps dressé gris-bleu
  path("M10.4 9.2Q7.4 11.6 8.6 16Q9.6 19.2 13 19.2Q16.6 19 18.6 15.4Q19.8 12.6 19.2 10.4Q18.4 8.6 15.6 8.6Q12.4 8.6 10.4 9.2Z", SHOE),
  path("M11.6 11.8Q12.8 15.4 16.8 15.8Q18.6 14 18.8 11.4Q17.2 9.8 14.8 10Q12.4 10.2 11.6 11.8Z", SHOE_DARK, { w: 0.8 }),
  // grosse tête et énorme bec en sabot crochu
  circle(10.6, 5.8, 3.4, SHOE),
  path("M8 3.6L2.6 4.4Q1.4 4.8 1.6 6.2L1.8 8.2Q2.2 9.4 3 8.6L3.2 8Q6 10.4 9.6 9Q8.8 6 8 3.6Z", SHOE_BILL),
  line("M3.2 7.8Q6 8 8.8 6.8", O, 0.7),
  dots([[4.4, 5.4], [6.2, 5], [5.4, 6.4]], 0.35, "#9C8B62"),
  path("M10.6 2.6Q11.4 1.6 12.2 2.4", "none", { c: O, w: 0.8 }),
  circle(10.4, 5, 0.9, "#F2E7A6", { w: 0.6 }), eye(10.4, 5, 0.4),
].join("");

/* ---------- marabout ---------- */
const MARA = "#454C55", MARA_HEAD = "#E7AFA3", MARA_SAC = "#E8807F", MARA_BILL = "#D9CBA8";
const marabout = [
  thick("M12.6 16.4V22.4M15.8 16.4V22.4", "#D8D3CC", 0.8),
  // dos sombre voûté, ventre blanc
  path("M8.6 10.6Q9.4 5.6 15 4.8Q20.8 4.6 22 10Q22.6 14.6 18.6 16.6Q14 17.4 11 16Q8.4 14.6 8.6 10.6Z", MARA),
  path("M10 13Q12.6 13.6 15.2 16.8Q12.6 17.2 11 16.2Q9.8 15.2 10 13Z", C.white, { w: 0.8 }),
  line("M12 8.6Q16.8 7.6 20.6 11", "#2F343A", 0.7),
  // poche rose pendante, tête chauve rose tachée, bec énorme
  ellipse(9.4, 14, 1.7, 2.1, MARA_SAC),
  path("M10.2 9.4Q10.2 6.8 7.8 6.6Q5.6 6.6 5.2 8.8L1.6 16.4Q1.4 17.4 2.4 17L7.6 12Q10.2 11.6 10.2 9.4Z", MARA_HEAD),
  path("M5.4 8.4L1.6 16.4Q1.4 17.4 2.4 17L7 12.4Q5.4 11.4 5.4 8.4Z", MARA_BILL, { w: 0.9 }),
  dots([[8.2, 8], [9.2, 9.6], [7.2, 10.6]], 0.3, "#7A4A3A"),
  eye(7.2, 8.6, 0.5),
].join("");

/* ---------- vautour africain ---------- */
const VULT = "#8A6A4C", VULT_DARK = "#5E4532", VULT_RUFF = "#EDE2CC", VULT_HEAD = "#5C5752";
const vautour = [
  branch("M2.6 21.2H19.6"),
  line("M12.2 18.4V20.6M14.8 18.4V20.6", O, 1.4),
  // corps brun voûté, queue sombre
  path("M9.4 10.6Q11.2 8 14.8 8.2Q19.6 8.8 21 14.6L22.4 20.2Q19.4 19.8 17.2 18.8Q13 19.6 10.6 17.2Q8.4 14.4 9.4 10.6Z", VULT),
  path("M14 10.6Q18.6 11 20.4 16.4L21.6 19.6Q18.6 18.8 16.8 17.4Q14.4 14.6 14 10.6Z", VULT_DARK, { w: 0.8 }),
  // collerette crème
  path("M8.8 11.6Q9.4 9.4 11.6 9.6Q13.4 10 13.6 12.2L12.6 11.4L12 12.8L11 11.6L10 13L9.6 11.6Z", VULT_RUFF, { w: 0.8 }),
  // long cou nu, tête au bec crochu
  thick("M10.8 10.4Q9.4 8.6 9.4 6.6", VULT_HEAD, 1.5),
  path("M10.2 5.6Q10 3.2 7.6 3.2Q5.6 3.4 5.2 5L3.6 5.8Q2.8 6.6 3.6 7.6Q4.2 6.8 5.2 6.8Q6 8 8 8Q10.2 7.8 10.2 5.6Z", VULT_HEAD),
  path("M5.2 5L3.6 5.8Q2.8 6.6 3.6 7.6Q4.2 6.8 5.2 6.8Z", "#3A3532", { w: 0.6 }),
  eye(7.4, 5, 0.5),
].join("");

/* ---------- pygargue vocifère (aigle pêcheur) ---------- */
const EAG = "#3A2C22", EAG_BELLY = "#8C3D20", EAG_FEET = "#F0C431", FISH = "#B6C3CC";
const pygargue = [
  // grandes ailes déployées brun-noir
  path("M10.4 10.6Q7.4 6.6 1.6 6.2Q2.2 9.6 4.6 11.6Q6.8 13.4 10.2 13.6Z", EAG),
  path("M13.6 10.6Q16.6 6.6 22.4 6.2Q21.8 9.6 19.4 11.6Q17.2 13.4 13.8 13.6Z", EAG),
  line("M3.4 8.6L5 10.4M5.6 7.6L7 9.8M18.6 7.6L17 9.8M20.6 8.6L19 10.4", "#5A483A", 0.6),
  // queue blanche, ventre roux, poitrine blanche
  path("M10.6 15.6L9.8 18.4H14.2L13.4 15.6Z", C.white),
  ellipse(12, 12.4, 2.6, 3.8, EAG_BELLY),
  path("M9.6 11Q9.8 9.2 12 9Q14.2 9.2 14.4 11Q12 12.4 9.6 11Z", C.white, false),
  // pattes jaunes qui serrent un poisson
  thick("M11 16.4L10.6 18.6M13 16.4L13.4 18.6", EAG_FEET, 0.6),
  path("M7 20.6Q9.4 18.6 13 19Q15 19.4 16.4 20L18.4 18.8V22.4L16.4 21.2Q14.6 22.4 11.8 22.4Q8.6 22 7 20.6Z", FISH),
  eye(8.8, 20.4, 0.35),
  // tête blanche, bec jaune à pointe noire
  circle(12, 6.4, 2.8, C.white),
  path("M9.6 5.8L7.6 7Q7.4 8.2 8.4 8.6L9.8 7.8Z", EAG_FEET, { w: 0.8 }),
  path("M7.6 7Q7.4 8.2 8.4 8.6L8.6 7.6Z", C.noir, { w: 0.5 }),
  eye(11, 5.8, 0.5),
].join("");

/* ---------- serpentaire (messager sagittaire) ---------- */
const SEC = "#C9CED3", SEC_FACE = "#EE6A2C", SEC_LEG = "#E9C9A2";
const serpentaire = [
  // très longues pattes, culottes noires
  thick("M11.6 12.6L10.4 17.2L11.2 22.2M14 12.4L16.2 17L15.2 22.2", SEC_LEG, 0.7),
  line("M9.6 22.4H11.8M14.6 22.4H16.8", O, 0.9),
  // longue queue, corps gris clair, rémiges noires
  path("M15 9.8L22.6 12.4L22.2 13.4L15.4 12.6Z", C.noir, { w: 0.9 }),
  path("M7.8 9Q9.4 6.8 13.4 7Q17.4 7.4 19 10Q18.4 12.4 15.8 12.8Q11.8 14 9.4 12.6Q7.6 11.4 7.8 9Z", SEC),
  path("M13 8.8Q16.6 8.4 18.6 10.4Q17.4 12.2 15.4 12.4Q13.4 11.4 13 8.8Z", C.noir, { w: 0.8 }),
  path("M10.4 12.6L10.6 15H13.4L14.2 12.6Z", C.noir, { w: 0.8 }),
  // cou, tête à face orange, bec crochu, plumes « crayons » derrière la tête
  thick("M8.8 9.4Q7.4 8.2 7 6.4", SEC, 1.4),
  line("M7.4 4.2L11 2.2M7.8 5.2L11.6 4.2M7.6 6.2L11.2 6.4", O, 1.3),
  line("M7.4 4.2L11 2.2M7.8 5.2L11.6 4.2M7.6 6.2L11.2 6.4", "#3A3634", 0.5),
  circle(6, 5, 2, SEC),
  path("M4.4 4.2Q5.8 3.4 6.8 4.6Q6.8 6 5.4 6.2Q4.2 5.8 4.4 4.2Z", SEC_FACE, { w: 0.6 }),
  path("M4.2 4.6L2 5.6Q1.6 6.4 2.4 6.6L4.2 6Z", "#4A4644", { w: 0.7 }),
  eye(5.4, 4.8, 0.42),
].join("");

/* ---------- ibis sacré ---------- */
const ibis = [
  thick("M13.2 15.6V22.4M15.8 15.4L16.8 18.6L15.8 22.4", "#3A3634", 0.6),
  // corps blanc, plumes noires retombant sur la queue
  path("M9.2 11Q11 8.4 15.4 8.4Q20.4 8.8 21.6 12.8Q21 15 18.6 15.4Q15 16.8 11.6 15.6Q8.6 14.2 9.2 11Z", C.white),
  path("M17.6 12.6Q20.8 13 22.4 15.4Q22.6 17.8 21.4 19.4Q20.6 16.8 18.8 15.6Z", C.noir, { w: 0.8 }),
  line("M18.6 10.8Q20.2 11.6 21 12.6", C.grisLight, 0.6),
  // cou et tête noirs nus, long bec arqué noir
  thick("M10.4 11.6Q8 10.4 8 7.6Q8 5 6.4 4.6", C.noir, 1.5),
  circle(6.2, 5, 1.7, C.noir),
  thick("M4.8 5.6Q2.4 7 1.8 11.2", C.noir, 0.7),
  circle(6.4, 4.6, 0.45, "#7A6E66", false),
].join("");

/* ---------- pélican blanc ---------- */
const PEL = "#F7E9E6", PEL_POUCH = "#F2C14E", PEL_BILL = "#EBB38C";
const pelican = [
  // eau
  path("M1.4 19.6Q4 18.4 6.6 19.6T11.8 19.6T17 19.6T22.6 19.6V22.6H1.4Z", C.eau),
  line("M3.4 21.2Q5 20.6 6.6 21.2M13 21.4Q14.6 20.8 16.2 21.4", C.white, 0.6),
  // corps flottant, rémiges noires
  path("M8.8 14.4Q10 10.8 15.4 10.6Q20.8 10.8 22.4 14.4Q21.8 18.6 15.4 19.2Q9.4 18.8 8.8 14.4Z", PEL),
  path("M16 13.2Q19.8 12.8 22.2 14.6Q21.4 16.4 19.2 16.8Q17 15.8 16 13.2Z", C.noir, { w: 0.8 }),
  // cou en S, tête, long bec et poche jaune
  thick("M10.2 14Q8.6 11.4 10.6 8.6", PEL, 1.8),
  path("M9.4 6.6L2 9.2Q1.2 9.6 1.6 10.4Q4.4 12.8 8.2 12Q10 11.4 10.6 9.4Z", PEL_POUCH),
  path("M9.6 5.8L2 8.6Q1.2 9.2 1.8 9.6L9.8 7.6Z", PEL_BILL, { w: 0.8 }),
  circle(11, 6.2, 2.4, PEL),
  path("M9.2 5.6Q10 5 11 5.6Q10.6 6.8 9.6 6.8Z", "#F2B2A4", false),
  eye(10.4, 5.8, 0.45),
].join("");

/* ---------- touraco ---------- */
const TUR = "#2F8A4C", TUR_LIGHT = "#5DB86A", TUR_RED = "#D93A2B";
const touraco = [
  branch("M1.6 19.4H17.4"),
  // longue queue sombre
  path("M15.4 14.8L21.6 21.2L22.6 19.6L17.4 13.2Z", "#2A4A66", { w: 0.9 }),
  // corps vert, aile à rémiges rouges
  path("M6 10Q7.6 7.6 11 8Q14.6 8.8 16.6 12.4Q17.6 14.6 16.2 16.2Q13 17.6 9.6 16.4Q6.8 15.2 6 12.6Z", TUR),
  path("M10.6 11Q13.8 11.2 15.8 13.6Q16 15.4 14.6 16Q12 15.2 10.6 11Z", "#2A4A66", { w: 0.8 }),
  path("M11.2 12.2Q13 12.8 14 14.4Q13 14.8 12 14.2Z", TUR_RED, false),
  line("M9.6 16.4V19.4M11.6 16.8V19.4", O, 1),
  // tête et huppe arrondie à liseré blanc
  path("M5.2 6.4Q4.8 3.4 6.6 1.6Q9.4 2.6 9.8 6.4Z", TUR),
  path("M6.6 1.6Q8.8 2.4 9.6 5", "none", { c: C.white, w: 0.7 }),
  circle(7.2, 7.4, 2.6, TUR),
  path("M4.8 6.8L2 7.8L4.8 8.8Z", TUR_RED, { w: 0.8 }),
  line("M6.4 8.6Q7.6 9.2 9 8.8", C.white, 0.5),
  circle(6.8, 6.8, 0.9, TUR_RED, false), eye(6.8, 6.8, 0.42),
].join("");

/* ---------- martin-pêcheur huppé ---------- */
const KING = "#2F6FC4", KING_CREST = "#3FB3B8", KING_RUF = "#E8742B";
const martinPecheur = [
  thick("M4 19.8H20", C.bois, 1.4),
  // queue bleue courte
  path("M15 15.4L19.6 19.6L18.2 20.6L13.8 17.2Z", KING, { w: 0.9 }),
  // corps roux, dos bleu
  path("M8.6 11Q11.6 9.8 14.4 12Q16.4 14.2 16 16.8Q13.6 18.6 11 17.6Q8.2 16.4 8 13.4Z", KING_RUF),
  path("M10.6 10.2Q14.4 10.4 16 13.4Q16.6 15.4 15.6 16.6Q13.8 13.4 10.6 12.8Z", KING, { w: 0.8 }),
  line("M10.6 17.8V19.8M12.4 18V19.8", C.rouge, 0.8),
  // grosse tête, huppe turquoise barrée, joue rousse, gorge blanche, bec rouge en poignard
  path("M7 5.4L7.8 2.8L9.2 4.6L10.4 2.6L11.2 4.8L12.6 3.6L12.6 6.4Z", KING_CREST, { w: 0.8 }),
  circle(9.8, 7.8, 3.4, KING),
  path("M7.6 3.8Q9.8 3.6 12.2 5.6", "none", { c: "#1E4A86", w: 0.6 }),
  path("M6.4 7.6Q8.6 6.6 11 8Q12.8 9.6 12.6 10.8Q10.4 11.4 8.4 10.4Q6.6 9.4 6.4 7.6Z", KING_RUF, { w: 0.7 }),
  path("M7.6 9.6Q8.8 11 10.4 10.8Q9.4 11.6 8.4 11.4Z", C.white, false),
  path("M7 7.2L1.4 8.2Q1.2 8.6 1.6 8.8L7.2 9.4Z", C.rouge, { w: 0.8 }),
  circle(8.8, 7.4, 0.9, C.white, { w: 0.5 }), eye(8.8, 7.4, 0.45),
].join("");

/* ---------- outarde kori ---------- */
const KORI = "#B49A78", KORI_NECK = "#D7D2C8", KORI_DARK = "#6E5A44";
const outardeKori = [
  thick("M12.6 16.6L12.2 22.4M15.8 16.4L16.8 19L16 22.4", "#E6C25A", 0.8),
  // gros corps brun finement rayé, queue basse
  path("M8.4 10.6Q10.6 8 15.6 8.4Q20.6 8.8 22.4 13.4Q22.6 15.4 20.8 15.6Q19 15.8 18 16.4Q14.6 18.2 11 16.8Q8 15.4 8.4 10.6Z", KORI),
  line("M11.6 11.2Q12.4 11.8 13.2 11.2M14.4 10.6Q15.2 11.2 16 10.6M17.2 11.4Q18 12 18.8 11.4M13 14Q13.8 14.6 14.6 14M16 13.6Q16.8 14.2 17.6 13.6", KORI_DARK, 0.6),
  // liseré noir et blanc de l'aile
  path("M11 15.4Q15.6 17 20.4 14.6", "none", { c: O, w: 1.6 }),
  path("M11 15.4Q15.6 17 20.4 14.6", "none", { c: C.white, w: 0.6 }),
  // cou épais gris clair, tête et huppe noire couchée
  path("M10.6 10Q9.4 8.4 9.2 5.4L5.4 5.2Q5.4 8.8 6.6 11.4Q7.6 13.4 9.4 13.8Z", KORI_NECK),
  line("M6.6 7.6Q7.4 8 8.4 7.6M6.8 9.6Q7.8 10 8.8 9.6", "#A9A296", 0.5),
  ellipse(7.2, 4.6, 2.4, 1.9, KORI_NECK),
  path("M6.4 2.8Q9.4 2.4 11.4 4.4Q9.6 4.8 7.6 4.2Z", C.noir, { w: 0.7 }),
  path("M5 4.2L1.8 5L5 5.8Z", "#C9B98E", { w: 0.7 }),
  eye(6.4, 4.4, 0.45),
].join("");

/* ---------- francolin ---------- */
const FRAN = "#8A6646", FRAN_LIGHT = "#E9D8B4", FRAN_RED = "#D9503A";
const francolin = [
  thick("M11 17.6L10.8 21.4M15 17.8L15.2 21.4", FRAN_RED, 0.7),
  line("M9.6 21.8H11.6M14.4 21.8H16.4M15.2 19.6L16.2 19", O, 0.9),
  // corps rond brun, petite queue relevée
  path("M6.8 11Q8.4 7.6 13.4 7.8Q18.4 8 20.6 11.4L22.2 10.2Q22.8 13.4 21 15.6Q18.4 18.4 13.4 18.4Q8.8 18.2 7.2 15.4Q6.2 13.2 6.8 11Z", FRAN),
  // écailles crème
  path("M9.4 12.2L10.4 13.2L11.4 12.2M12.6 11.2L13.6 12.2L14.6 11.2M15.8 11.6L16.8 12.6L17.8 11.6M11 15L12 16L13 15M14.2 14.4L15.2 15.4L16.2 14.4M17.4 14.6L18.4 15.6L19.4 14.6", "none", { c: FRAN_LIGHT, w: 0.75 }),
  line("M12.6 9.6Q16.4 9.2 19.6 11", "#6A4C32", 0.6),
  // tête : calotte brune, sourcil clair, gorge rouge nue
  path("M8.4 11.6Q7.2 9 7.2 7.4Q7.2 5 5.2 4.8Q3.2 4.8 3 6.8L1.6 7.8L3.2 8.4Q3.6 10.6 5.4 12Q7 12.8 8.4 11.6Z", FRAN),
  path("M3.6 6.2Q5 5.4 6.8 6.4", "none", { c: FRAN_LIGHT, w: 0.6 }),
  path("M3.4 8.6Q4 10.6 5.6 11.4Q5.8 9.6 4.8 8.4Z", FRAN_RED, { w: 0.6 }),
  path("M3 6.8L1.6 7.8L3.2 8.4Z", "#C9A878", { w: 0.6 }),
  eye(4.8, 7, 0.45),
].join("");

/* ---------- guêpier carmin ---------- */
const CARM = "#D63B5C", CARM_DARK = "#A82847", CARM_HEAD = "#3D8FB8";
const guepier = [
  thick("M1.6 15.6H13.2", C.bois, 1.3),
  // longue queue en flèche
  path("M14.2 15.4L21.6 22.2L22.4 21.2L15.8 14.4Z", CARM_DARK, { w: 0.9 }),
  // corps carmin élancé
  path("M6.2 8.6Q6.4 6 9.4 6Q12.6 6.4 14.4 10Q16 13 16.4 16.2Q13.2 16 10.4 13.6Q6.4 11 6.2 8.6Z", CARM),
  path("M9.6 8.4Q12.6 8.8 14.4 12.4Q15.4 14.2 15.6 15.6Q12.8 14.4 11.4 12.4Q10 10.6 9.6 8.4Z", CARM_DARK, { w: 0.8 }),
  line("M10.6 14.2L10.6 15.4M12 15L12 15.6", O, 0.8),
  // calotte bleu-vert, masque noir, bec fin arqué
  path("M6.4 7.6Q6.4 5 9 5Q11.2 5.2 11.6 7Q9.4 6.4 6.4 7.6Z", CARM_HEAD, { w: 0.8 }),
  thick("M6.6 8Q4.2 7.6 2.4 9.2", C.noir, 0.5),
  path("M6.4 7.8Q8.4 7 10.2 8.4", "none", { c: C.noir, w: 0.9 }),
  // abeille dans le bec
  ellipse(2.8, 4.8, 1.4, 1, C.jaune, { w: 0.7 }),
  line("M2.6 3.9V5.7", O, 0.6),
  ellipse(3.2, 3.6, 0.8, 0.5, C.white, { w: 0.5 }),
  circle(8.6, 7.6, 0.5, CARM_DARK, false),
].join("");

/* ---------- rollier à longs brins ---------- */
const ROL_HEAD = "#A4B46C", ROL_BREAST = "#B98ACB", ROL_BELLY = "#55B9CB", ROL_WING = "#2F5FB8", ROL_BACK = "#A97A4E";
const rollier = [
  // brins de la queue fourchue
  thick("M12.2 16.4L12.8 22.4M13.6 16L17.2 21.8", "#1F3E7A", 0.6),
  path("M11.6 15.6L12.2 18.8H14.4L14.6 15.4Z", ROL_WING, { w: 0.8 }),
  branch("M1.6 16.2H21"),
  // corps : poitrine lilas, ventre turquoise, aile bleue, dos roux
  path("M6.6 9Q6.4 5.4 10.2 5Q13.6 5 14.4 9Q15 12.4 14.2 15.2Q12.6 17.2 10.6 16Q7.4 13.6 6.6 9Z", ROL_BELLY),
  path("M6.6 9Q6.6 7.4 8.4 7.4Q10.4 8.4 10.8 11.6Q9 12.4 7.8 11.8Q6.8 10.6 6.6 9Z", ROL_BREAST, { w: 0.7 }),
  path("M11 7.6Q14.2 8 14.6 11.4Q14.8 13.8 14.2 15.2Q12.4 13.4 11.6 10.6Z", ROL_WING, { w: 0.8 }),
  path("M11.4 7Q13.4 7.2 14 8.8Q12.6 9.6 11.4 9Z", ROL_BACK, { w: 0.6 }),
  // tête vert pâle, bec fort noir
  circle(9.4, 5.2, 2.8, ROL_HEAD),
  path("M6.8 4.4L2.2 5.4L6.8 6.6Z", C.noir, { w: 0.8 }),
  path("M7.4 4.4Q9.4 3.6 11.4 5", "none", { c: C.white, w: 0.5 }),
  line("M7.6 5.8Q9 6.2 10.4 5.6", C.noir, 0.6),
  eye(8.8, 5, 0.5),
].join("");

/* ---------- souimanga ---------- */
const SUN = "#1F9A6A", SUN_DARK = "#14684A", SUN_RED = "#D93A2B", FLOW = "#F07A2B";
const souimanga = [
  // fleur orange sur sa tige, branche où le souimanga est perché
  thick("M5.6 10.6V22.4M5.6 19.4H14.6", C.feuille, 0.8),
  path("M5.6 11Q3.6 9.6 3.2 5.6L4.6 6.6L5.6 4.2L6.8 6.6L8.2 5.6Q7.8 9.6 5.6 11Z", FLOW),
  path("M5.6 10Q4.6 8.6 4.6 7.2L5.6 8.2L6.6 7.2Q6.6 8.6 5.6 10Z", C.ocreLight, false),
  path("M5.6 15.4Q3.2 14.4 2.4 12.4Q4.8 12.4 5.6 14.2Z", C.feuille, { w: 0.8 }),
  // queue
  path("M15.4 16.6L20.4 21.2L21.6 20.2L17.2 15.2Z", SUN_DARK, { w: 0.9 }),
  // corps vert métallique, plastron rouge
  path("M12.4 8.6Q15.6 7.6 17.4 10.4Q18.6 13.6 17 16.4Q14.6 18.6 12.4 17.6Q10.6 16.4 10.8 12.8Q10.8 9.8 12.4 8.6Z", SUN),
  path("M10.8 11.6Q12 11 13.6 12Q13.8 14 13 15.8Q11.4 15.6 11 14Z", SUN_RED, { w: 0.7 }),
  path("M14.2 10.2Q16.8 10.6 17.4 13.4Q17.2 15.6 16.2 16.4Q14.4 13.8 14.2 10.2Z", SUN_DARK, { w: 0.7 }),
  line("M12.6 17.8V19.4M14.2 17.8V19.4", O, 0.8),
  // long bec arqué jusqu'à la fleur
  thick("M11.2 10.4Q9.4 9.4 7.6 10", C.noir, 0.4),
  path("M11.2 10.6Q11.8 9.4 13 9.6", "none", { c: "#4A2E8A", w: 0.7 }),
  eye(12.8, 9.8, 0.45),
].join("");

/* ---------- jabiru d'Afrique ---------- */
const JAB_BILL = "#D93A2B", JAB_SADDLE = "#F2C14E";
const jabiru = [
  // longues pattes noires, genoux et pieds rouges
  thick("M13.6 14.8V22M17.6 14.4V22", C.noir, 0.5),
  dots([[13.6, 18.4], [17.6, 18.4]], 0.55, C.rose),
  line("M12.6 22.4H14.6M16.6 22.4H18.6", C.rose, 1),
  // corps blanc, rémiges noires
  path("M10.6 9.6Q12.4 7.6 16.4 7.8Q20.8 8.2 22.2 11.8Q22.2 13.2 20.8 13.6Q18.6 14 17.4 14.8Q14 16 11.8 14.4Q10 12.4 10.6 9.6Z", C.white),
  path("M15.4 9.2Q19 8.8 21.6 11.6Q21.2 12.8 19.8 12.8Q17 12.2 15.4 9.2Z", C.noir, { w: 0.8 }),
  // long cou noir, tête noire
  thick("M11.6 10.6Q9.2 9.6 9.2 7Q9.2 4.8 7.8 4.2", C.noir, 1.5),
  circle(7.6, 4.4, 1.6, C.noir),
  // grand bec rouge à bande noire et « selle » jaune
  path("M6.6 3.4L1.3 8.4Q1.2 9 1.7 9L7.2 5.8Z", JAB_BILL, { w: 0.9 }),
  path("M3.9 5.9L2.9 6.8L4.4 7.1L5.1 6.3Z", C.noir, false),
  path("M5.4 3.6Q6.2 2.4 7.2 3L6.8 4.4Z", JAB_SADDLE, { w: 0.6 }),
  circle(8, 4.2, 0.5, JAB_SADDLE, false), eye(8, 4.2, 0.3),
].join("");

/* ---------- héron garde-bœufs (sur le dos d'un zébu) ---------- */
const ZEBU = "#B98A5E", ZEBU_DARK = "#8E643E";
const heronGardeBoeufs = [
  // dos et bosse du zébu
  path("M1.4 22.6V19.4Q1.6 16.8 4.4 16.2L6.4 14.6Q8.2 13.2 9.6 14.8L18 15.2Q22.4 15.8 22.6 19.8V22.6Z", ZEBU),
  path("M4.6 16.2L6.4 14.6Q8.2 13.2 9.6 14.8Q8.4 16.2 6.6 16.6Z", ZEBU_DARK, { w: 0.8 }),
  line("M12 18.6Q15 18 18.4 18.6", ZEBU_DARK, 0.6),
  // pattes jaunes posées sur le dos
  line("M13 13.2V15.2M15.2 13.2V15.2", "#D9A43A", 1),
  // héron blanc trapu, plumes chamois sur la tête et le dos
  path("M10 8.4Q11.6 6.4 14.6 7Q18 7.6 18.8 10.8L20.2 12.4Q17.2 14.2 13.6 13.6Q10.2 12.6 10 8.4Z", C.white),
  path("M12.6 7.4Q15.6 7.4 17.4 9.4Q15.2 9.8 13.2 9.2Z", "#F0C27A", { w: 0.7 }),
  path("M11.2 8.2Q10.4 5.6 8.4 5.4Q6.4 5.4 6.2 7.2Q6.4 9.6 9 10.2Q10.6 10.2 11.2 8.2Z", C.white),
  path("M7 5.6Q8.4 4.6 10 5.4Q9.8 6.6 8.4 6.6Z", "#F0C27A", { w: 0.6 }),
  path("M6.4 6.8L2.4 7.8L6.6 8.6Z", "#F2B230", { w: 0.8 }),
  circle(8.2, 7.2, 0.6, C.jaune, false), eye(8.2, 7.2, 0.3),
].join("");

/* ---------- manchot du Cap ---------- */
const PEN_PINK = "#F29AA8";
const manchot = [
  // pieds noirs
  ellipse(11, 21.8, 2, 0.8, C.noir, { w: 0.8 }), ellipse(14.4, 21.8, 2, 0.8, C.noir, { w: 0.8 }),
  // corps : dos noir, ventre blanc
  path("M11.4 1.8Q8.2 1.8 7.8 5L4.4 6.4L7.8 7.4Q6.2 11 6.4 15.6Q6.8 21.6 12.6 21.6Q17.8 21.4 18 16.6Q18 12.6 15.4 8.6Q15.4 1.8 11.4 1.8Z", C.noir),
  path("M8.4 8Q7.2 11.4 7.4 15.4Q7.8 20.6 12.4 20.6Q15.4 20.4 15.4 16.8Q14.4 12.6 11.8 9.6Q10.4 8.2 8.4 8Z", C.white, { w: 0.7 }),
  // bande noire en fer à cheval sur la poitrine, petites taches
  path("M7.8 11Q10 13 13 12.2", "none", { c: C.noir, w: 1 }),
  dots([[9.6, 15.4], [11.2, 17], [9, 18]], 0.35, C.noir),
  // aileron
  path("M14.6 10.2Q17.6 12.8 19.8 16.6Q19.6 17.6 18.6 17Q15.8 14.6 14 12Z", "#2E2A28", { w: 0.9 }),
  // bande blanche du visage, rose au-dessus de l'œil, bec noir
  path("M8.6 3.4Q11.8 1.8 13.8 4.4Q15 6.4 14.4 9Q13 6.6 11.8 5.8Q10.2 4.8 8.8 4.6Z", C.white, { w: 0.6 }),
  path("M9.4 3.6Q10.6 3 11.6 3.8Q10.6 4.2 9.6 4.2Z", PEN_PINK, false),
  line("M5.2 6.6L7.8 6.6", "#555", 0.5),
  eye(10.4, 5.2, 0.55),
].join("");

/* ---------- grand-duc de Verreaux ---------- */
const OWL = "#B9B3A8", OWL_DARK = "#8E877C", OWL_FACE = "#E6E1D8", OWL_LID = "#F29AB0";
const grandDuc = [
  thick("M3 21.6H21", C.bois, 1.4),
  // corps gris pâle finement barré
  path("M5.4 5.4L4 1.8Q7.6 2.2 9.2 3.8Q12 3.2 14.8 3.8Q16.4 2.2 20 1.8L18.6 5.4Q20.4 7.8 20.2 11.6Q20 18.2 15.4 20.6Q12 22 8.6 20.6Q4 18.2 3.8 11.6Q3.6 7.8 5.4 5.4Z", OWL),
  line("M7.4 15.4H9.4M10.6 16.6H12.6M14 15.4H16M8.4 18H10.4M12.6 18.4H14.6M6.2 13H7.8M16.2 13H17.8", OWL_DARK, 0.6),
  // disque facial pâle cerclé de noir
  path("M6.2 9.2Q6.2 5.6 9.4 5.8Q11 6 12 7.2Q13 6 14.6 5.8Q17.8 5.6 17.8 9.2Q17.8 13.4 12 14.4Q6.2 13.4 6.2 9.2Z", OWL_FACE),
  path("M6.2 9.2Q6.2 13.4 12 14.4Q17.8 13.4 17.8 9.2", "none", { c: C.noir, w: 0.9 }),
  // yeux sombres aux paupières roses
  circle(9.6, 9.4, 1.8, OWL_LID, { w: 0.8 }), circle(14.4, 9.4, 1.8, OWL_LID, { w: 0.8 }),
  circle(9.6, 9.6, 1.2, "#3A2A22", false), circle(14.4, 9.6, 1.2, "#3A2A22", false),
  circle(9.2, 9.2, 0.3, C.white, false), circle(13.9, 9.2, 0.3, C.white, false),
  // bec clair
  path("M11.2 11.2L12 13.2L12.8 11.2Q12 10.6 11.2 11.2Z", "#D9D2BE", { w: 0.7 }),
  // serres sur la branche
  line("M10 20.8V21.8M14 20.8V21.8", O, 1.2),
].join("");

// Recadrage mesuré : ces dessins (branches et perchoirs compris) dépassaient la zone utile 1–23, ils sont réduits et recentrés juste assez.
const FIT = { "tisserin": [1.485, 1.523, 0.876], "ibis-sacre": [0.974, -0.195, 0.951], "touraco": [1.291, 1.079, 0.927], "guepier-carmin": [1.294, 0.831, 0.935], "rollier": [1.296, 0.384, 0.939] };
const A = (slug, fr, en, char, tags, body) => ({ slug, fr, en, char, group: "animaux", tags, tone: false,
  body: FIT[slug] ? g(`translate(${FIT[slug][0]} ${FIT[slug][1]}) scale(${FIT[slug][2]})`, body) : body });
export default [
  A("grue-couronnee", "Grue couronnée", "Grey crowned crane", null, ["grue couronnée", "crowned crane", "grue", "crane", "korongo", "ngaali", "ouganda", "uganda", "kenya", "zones humides", "wetlands", "oiseau", "bird"], grueCouronnee),
  A("tisserin", "Tisserin", "Weaver bird", null, ["tisserin", "weaver", "nid", "nest", "kwezi", "sahel", "savane", "savanna", "sénégal", "oiseau", "bird"], tisserin),
  A("bec-en-sabot", "Bec-en-sabot", "Shoebill", null, ["bec-en-sabot", "shoebill", "whale-headed stork", "abu markub", "ouganda", "soudan du sud", "zambie", "marais", "swamp", "oiseau", "bird"], becEnSabot),
  A("marabout", "Marabout d'Afrique", "Marabou stork", null, ["marabout", "marabou", "cigogne", "stork", "korongo", "kenya", "ouganda", "savane", "ville", "city", "oiseau", "bird"], marabout),
  A("vautour", "Vautour africain", "White-backed vulture", null, ["vautour", "vulture", "tai", "gyps", "savane", "savanna", "charognard", "scavenger", "serengeti", "oiseau", "bird"], vautour),
  A("pygargue", "Pygargue vocifère", "African fish eagle", "🦅", ["pygargue vocifère", "fish eagle", "aigle pêcheur", "eagle", "aigle", "tai", "inkwazi", "zambie", "zimbabwe", "namibie", "soudan du sud", "lac", "lake", "oiseau", "bird"], pygargue),
  A("serpentaire", "Serpentaire", "Secretary bird", null, ["serpentaire", "secretary bird", "messager sagittaire", "sagittarius", "savane", "savanna", "soudan", "afrique du sud", "serpents", "snakes", "oiseau", "bird"], serpentaire),
  A("ibis-sacre", "Ibis sacré", "Sacred ibis", null, ["ibis sacré", "sacred ibis", "ibis", "thot", "thoth", "égypte", "egypt", "nil", "nile", "zones humides", "oiseau", "bird"], ibis),
  A("pelican", "Pélican blanc", "Great white pelican", null, ["pélican", "pelican", "mwari", "lac", "lake", "djoudj", "sénégal", "nakuru", "kenya", "poche", "pouch", "oiseau", "bird"], pelican),
  A("touraco", "Touraco", "Turaco", null, ["touraco", "turaco", "lourie", "huppe", "crest", "forêt", "forest", "ghana", "cameroun", "afrique du sud", "oiseau", "bird"], touraco),
  A("martin-pecheur", "Martin-pêcheur huppé", "Malachite kingfisher", null, ["martin-pêcheur", "kingfisher", "malachite", "huppé", "mdiria", "rivière", "river", "lac", "lake", "oiseau", "bird"], martinPecheur),
  A("outarde-kori", "Outarde kori", "Kori bustard", null, ["outarde kori", "kori bustard", "outarde", "bustard", "gompou", "botswana", "namibie", "tanzanie", "savane", "oiseau", "bird"], outardeKori),
  A("francolin", "Francolin", "Francolin", null, ["francolin", "spurfowl", "kwale", "perdrix", "partridge", "savane", "savanna", "brousse", "bush", "oiseau", "bird"], francolin),
  A("guepier-carmin", "Guêpier carmin", "Carmine bee-eater", null, ["guêpier carmin", "carmine bee-eater", "guêpier", "bee-eater", "abeille", "bee", "zambie", "okavango", "sénégal", "oiseau", "bird"], guepier),
  A("rollier", "Rollier à longs brins", "Lilac-breasted roller", null, ["rollier", "lilac-breasted roller", "roller", "kenya", "botswana", "savane", "savanna", "oiseau", "bird"], rollier),
  A("souimanga", "Souimanga", "Sunbird", null, ["souimanga", "sunbird", "nectar", "fleur", "flower", "chozi", "jardin", "garden", "kenya", "afrique du sud", "oiseau", "bird"], souimanga),
  A("jabiru", "Jabiru d'Afrique", "Saddle-billed stork", null, ["jabiru", "saddle-billed stork", "cigogne", "stork", "bec", "marais", "swamp", "okavango", "gambie", "oiseau", "bird"], jabiru),
  A("heron-garde-boeufs", "Héron garde-bœufs", "Cattle egret", null, ["héron garde-bœufs", "cattle egret", "aigrette", "egret", "zébu", "zebu", "bétail", "cattle", "village", "savane", "oiseau", "bird"], heronGardeBoeufs),
  A("manchot", "Manchot du Cap", "African penguin", "🐧", ["manchot du cap", "african penguin", "penguin", "manchot", "pingouin", "jackass penguin", "boulders beach", "afrique du sud", "namibie", "océan", "oiseau", "bird"], manchot),
  A("grand-duc", "Grand-duc de Verreaux", "Verreaux's eagle-owl", "🦉", ["grand-duc", "eagle-owl", "hibou", "owl", "chouette", "bundi", "giant eagle-owl", "savane", "nuit", "night", "oiseau", "bird"], grandDuc),
];
