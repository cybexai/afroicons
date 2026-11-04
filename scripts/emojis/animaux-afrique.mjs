// Emojis animaux d'Afrique : faune de la savane, des fleuves et des villages (dessins originaux Afroicons).
// Animaux vus de profil (tête à gauche) ou de face, couleur à plat et contour brun foncé, comme l'éléphant, le zèbre ou l'okapi.
import { O, W, C, path, circle, ellipse, rect, line, g } from "./lib.mjs";

/** Trait épais « plein » : contour brun puis couleur par-dessus (cous, queues, pattes fines, cornes). */
const thick = (d, col, w = 1.5) => line(d, O, w + 2 * W) + line(d, col, w);
const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const eye = (x, y, r = 0.55) => circle(x, y, r, O, false);
/** Patte droite arrondie, avec sabot ou pied plus sombre. */
const leg = (x, top, bottom, w, fill, foot) => rect(x, top, w, bottom - top, w / 2.2, fill) + (foot ? rect(x, bottom - 1.2, w, 1.2, 0.4, foot, { w: 0.8 }) : "");

/* ---------- hippopotame ---------- */
const HIPPO = "#8C7B8A", HIPPO_PINK = "#E2A3A0";
const hippopotame = [
  leg(16.4, 15, 21.2, 2.6, HIPPO), leg(10.6, 15, 21.2, 2.6, HIPPO),
  line("M21.4 11.8Q22.6 12.8 22.4 14.6", O, 1),
  path("M8 9.4Q11.6 6.8 16.6 7.2Q22 7.8 22 12.8Q22 17.4 16.4 17.6H10.4Q7 17.2 7 13Z", HIPPO),
  path("M10 16.6Q14 18.2 19 16.6", "none", { c: HIPPO_PINK, w: 1 }),
  leg(18.8, 15.6, 21.6, 2.6, HIPPO), leg(8.2, 15.4, 21.6, 2.6, HIPPO),
  // grosse tête : crâne, yeux et oreilles sur le dessus, énorme museau
  path("M10.6 9Q9.6 6.4 6.6 6.6Q4.8 6.8 4.2 8.2Q1.4 8.6 1.4 12Q1.4 16.6 5 16.8Q9 16.8 10.8 13.8Z", HIPPO),
  path("M1.6 13Q3.4 14.4 6.6 13.6Q6.8 15.8 4.8 16.6Q1.6 16.2 1.6 13Z", HIPPO_PINK, { w: 0.9 }),
  path("M2.6 13.6V14.8M4.6 13.9V15.2", "none", { c: C.white, w: 0.9 }),
  ellipse(9, 6.4, 0.8, 1.2, HIPPO, { w: 0.9 }),
  circle(6.6, 7.4, 1.3, C.white, { w: 0.8 }), eye(6.4, 7.5, 0.6),
  ellipse(2.6, 9.6, 0.55, 0.4, O, false), ellipse(4.2, 9.2, 0.55, 0.4, O, false),
].join("");

/* ---------- rhinocéros ---------- */
const RHINO = "#9C958C", RHINO_DARK = "#7A736A", HORN = "#E6D7BC";
const rhinoceros = [
  leg(17, 14.6, 21.4, 2.8, RHINO_DARK), leg(11, 14.6, 21.4, 2.8, RHINO_DARK),
  thick("M21.4 11Q22.6 12.4 22.2 14.4", RHINO, 0.6),
  path("M8.2 9Q10.6 5.6 15.6 6.2Q21.8 6.6 21.8 12.2Q21.8 16.8 17 17.2H10.6Q7.4 16.6 7.4 13Z", RHINO),
  line("M10.6 10.2Q11.4 13 10.4 16.4M17.4 9Q18.6 12 17.6 16.8", RHINO_DARK, 0.8),
  leg(19.2, 15.2, 21.8, 2.8, RHINO), leg(8.4, 15.2, 21.8, 2.8, RHINO),
  // tête basse, deux cornes sur le museau, oreilles en cornet
  path("M10.4 8.6Q8.4 6.8 6.4 8.2L2.8 12Q1.4 13.6 1.6 15.2Q2 16.8 4.2 16.4Q7.8 15.8 10.6 13.8Z", RHINO),
  path("M2.4 12.8Q1.4 9.2 1.8 5.2Q3.2 8.6 4.8 11.2Z", HORN, { w: 0.9 }),
  path("M5.4 10.2Q5.4 8.4 6.4 7.2Q6.8 8.8 7 9.6Z", HORN, { w: 0.85 }),
  path("M8.4 7.4L8.6 4.6Q10.2 5.6 9.8 7.6Z", RHINO, { w: 0.9 }),
  eye(7.4, 11, 0.55),
  line("M1.8 15.2Q3.2 15.6 4.4 14.8", O, 0.8),
].join("");

/* ---------- crocodile ---------- */
const CROC = "#5F7D3A", CROC_DARK = "#43592A", CROC_BELLY = "#C9C17A";
const crocodile = [
  // pattes arrière et avant (côté lointain)
  path("M16.4 15.2L17.6 18.4L19.4 18.6", "none", { c: O, w: 2.6 }), path("M16.4 15.2L17.6 18.4L19.4 18.6", "none", { c: CROC_DARK, w: 1.2 }),
  path("M8.6 15.2L9.4 18.2L11.2 18.4", "none", { c: O, w: 2.6 }), path("M8.6 15.2L9.4 18.2L11.2 18.4", "none", { c: CROC_DARK, w: 1.2 }),
  // corps allongé, queue relevée en crochet
  path("M1.2 12.8Q1.2 11.2 3 11.2L6.4 10.8Q7.4 8.8 8.8 10.2Q13.4 9.6 17 11Q19.8 11.8 21 9.6Q21.8 8 22.4 6.2Q23.4 10.2 22 13.4Q20.2 16.4 16 16.8H9Q6.8 16.4 5.8 15L2.4 14.6Q1.2 14.4 1.2 12.8Z", CROC),
  path("M6.4 15.2Q7.6 16.6 9.6 16.8H16Q19.6 16.4 21.4 14Q18.4 15.6 15.4 15.4H9.8Q7.8 15.4 6.4 15.2Z", CROC_BELLY, { w: 0.8 }),
  // écailles dorsales
  path("M9.6 10.2L10.4 9.2L11.2 10M12 10L12.8 9.1L13.6 10.2M14.4 10.4L15.2 9.6L16 10.8M16.8 11.1L17.6 10.4L18.4 11.4M19.2 11.2L20 10.4L20.4 11", "none", { c: O, w: 0.8 }),
  line("M10.4 12.2Q14 11.8 18.8 13.4M11 13.8H16.6", CROC_DARK, 0.7),
  // gueule : dents blanches
  line("M1.6 13.4L5.8 13.6", O, 0.8),
  path("M2.4 13.4L2.8 14.2L3.2 13.4M3.8 13.5L4.2 14.3L4.6 13.5", C.white, { w: 0.5 }),
  // pattes avant et arrière (côté proche)
  path("M7.6 15.6L6.4 18.8L4.6 19", "none", { c: O, w: 2.8 }), path("M7.6 15.6L6.4 18.8L4.6 19", "none", { c: CROC, w: 1.4 }),
  path("M15 16L14.2 19.2L12.4 19.4", "none", { c: O, w: 2.8 }), path("M15 16L14.2 19.2L12.4 19.4", "none", { c: CROC, w: 1.4 }),
  circle(7.6, 10.2, 1.1, C.ocreLight, { w: 0.8 }), eye(7.7, 10.2, 0.45),
  circle(1.9, 11.7, 0.3, O, false),
].join("");

/* ---------- léopard ---------- */
const LEO = "#E8AE4C", LEO_LIGHT = "#F6DDA6", ROSE_IN = "#C98A35";
const rosette = (x, y, r = 0.85) => circle(x, y, r, ROSE_IN, { w: 0.75 });
const leopard = [
  leg(17, 15, 21.2, 2, C.ocre), leg(9.4, 15, 21.2, 2, C.ocre),
  // longue queue qui retombe puis remonte, bout noir
  thick("M20.6 12.2Q23 14 22.4 18.4Q22 20.6 20.4 20.6", LEO, 1.2),
  dots([[22.6, 15.4], [22.2, 18.2]], 0.45, O),
  path("M20 20.6Q20.4 21.2 20.8 20.4Z", O, { w: 1.2 }),
  // corps long et bas
  path("M7.6 10.2Q12.4 8.8 17.8 9.6Q21.6 10.2 21.2 13.4Q20.8 16.4 17.6 16.4H10Q6.8 16 6.8 13Z", LEO),
  path("M10 16.4H17.4Q15.4 15 12.8 15.2Q11 15.2 10 16.4Z", LEO_LIGHT, false),
  rosette(11, 11.6), rosette(14.2, 11), rosette(17.2, 11.4), rosette(19.4, 13.2), rosette(12.6, 14), rosette(15.8, 14),
  leg(19.2, 15.2, 21.6, 2, LEO), leg(11.4, 15.2, 21.6, 2, LEO),
  dots([[20.2, 18.2], [12.4, 17.8]], 0.42, O),
  // tête ronde
  path("M3 5.4L2.6 3.2L4.8 4.2Z", LEO, { w: 0.9 }), path("M8 4.2L10.2 3.2L9.8 5.6Z", LEO, { w: 0.9 }),
  circle(6.4, 8.2, 4, LEO),
  ellipse(5.8, 10.4, 2.2, 1.6, LEO_LIGHT, { w: 0.8 }),
  path("M4.6 9.2H6.8L5.7 10.3Z", C.marron, { w: 0.6 }),
  line("M5.7 10.3V11M4.8 11.4Q5.7 11.8 5.7 11Q5.7 11.8 6.6 11.4", O, 0.6),
  eye(4.6, 7.4, 0.6), eye(8, 7.4, 0.6),
  dots([[6.4, 5], [5, 5.4], [7.8, 5.4], [9.6, 8.6], [9.4, 10.4], [2.8, 8.6]], 0.4, O),
].join("");

/* ---------- dromadaire ---------- */
const CAMEL = "#D3A160", CAMEL_DARK = "#B07E42";
const dromadaire = [
  leg(16.4, 13.6, 22, 1.4, CAMEL_DARK), leg(9.8, 13.6, 22, 1.4, CAMEL_DARK),
  thick("M20.4 10.6Q21.6 12.4 21 15", CAMEL, 0.6),
  // long cou en U, tête relevée
  thick("M9.6 11.6Q5 12.6 4.4 8.6Q4.2 6.6 4.6 5.4", CAMEL, 2.2),
  path("M8.4 13.6Q7.8 10.2 10.4 9.4Q12.4 3.4 15.6 3.6Q18.8 4 19.8 9.4Q21.4 10.4 20.8 13Q20.2 15.2 17.8 15.2H10.4Q8.6 15 8.4 13.6Z", CAMEL),
  line("M12.2 7.6Q15.4 6.6 17.8 8", CAMEL_DARK, 0.7),
  leg(18.6, 14, 22.4, 1.5, CAMEL), leg(11.6, 14, 22.4, 1.5, CAMEL),
  line("M18.6 18.4H20.1M11.6 18.2H13.1", O, 0.7),
  g("rotate(-14 3.6 5)", ellipse(3.6, 5, 2.8, 1.5, CAMEL)),
  ellipse(5.8, 3.4, 0.5, 0.9, CAMEL, { w: 0.8 }),
  eye(4.4, 4.4, 0.5),
  line("M0.9 5.8Q1.6 6.4 2.4 6.2", O, 0.7),
].join("");

/* ---------- flamant rose ---------- */
const FLAM = "#F28DAA", FLAM_DARK = "#E0577E", FLAM_LEG = "#E86A8A";
const flamant = [
  // une patte tendue, l'autre repliée
  thick("M14.4 13.6V22.4", FLAM_LEG, 0.7),
  thick("M15 13.8L17.4 17L14.6 18.2", FLAM_LEG, 0.7),
  thick("M13 22.4H16", FLAM_LEG, 0.6),
  // cou en S
  thick("M11 9.6Q6.4 9.8 6.4 7Q6.4 5 7.6 3.8", FLAM, 1.5),
  // corps et ailes
  path("M9.4 9.2Q11 6.2 15.6 6.8Q21.4 7.6 22.6 11.8Q19.6 14.4 15.4 14.2Q10.4 13.8 9.4 9.2Z", FLAM),
  path("M13.4 9.2Q17.2 8.4 21.8 11.6Q18.6 12.6 15.4 12Q13.6 11.4 13.4 9.2Z", FLAM_DARK, { w: 0.8 }),
  path("M21.8 11.6L23 11.2L22.6 12.6Z", C.noir, { w: 0.7 }),
  // tête et bec coudé à pointe noire
  path("M6.8 2.4Q4 2.2 3.6 4.6Q3.4 6.4 4.2 7.4Q4.8 5.4 6.6 4.6Z", C.cream, { w: 0.8 }),
  path("M3.6 5.2Q3.5 6.6 4.2 7.4Q4.4 6.4 4.8 5.6Z", C.noir, { w: 0.6 }),
  circle(7.8, 3.4, 1.7, FLAM),
  eye(7.9, 3, 0.42),
].join("");

/* ---------- perroquet gris du Gabon ---------- */
const PGRIS = "#9AA3AB", PGRIS_DARK = "#6F7880", PGRIS_FACE = "#E3E7EA";
const perroquet = [
  // queue rouge vif
  path("M12.6 16Q14.4 20.2 17.4 22.8L19.6 21.2Q17.6 18 15.6 15Z", C.rouge),
  thick("M3.6 18.8H21.6", C.bois, 1.4),
  // corps
  g("rotate(-18 12.8 12.2)", ellipse(12.8, 12.2, 4.6, 6, PGRIS)),
  // aile plus sombre aux plumes écaillées
  path("M12.2 9.4Q17 8.6 17.6 13.6Q17.6 16.6 15.4 17.6Q12.6 16 12 12.6Z", PGRIS_DARK),
  line("M13.4 11.6Q14.6 12.4 16.2 11.6M13.4 13.8Q14.8 14.6 16.6 13.8M14 15.8Q15 16.4 16.4 15.8", PGRIS, 0.7),
  line("M9 11.8Q10 12.6 11 11.8M8.8 13.8Q9.8 14.6 10.8 13.8", PGRIS_DARK, 0.6),
  // pattes sur la branche
  line("M10 17.4L9.6 18.8M11.4 17.6L11.6 18.8", O, 1),
  // tête, masque clair, bec noir crochu
  circle(10, 6.2, 4, PGRIS),
  path("M6.4 6.6Q6.6 3.8 9.4 4.2Q11.4 4.8 11.4 7Q11 9.2 8.6 9.4Q6.4 9 6.4 6.6Z", PGRIS_FACE, { w: 0.8 }),
  path("M6.6 5.4Q3.8 5.4 3.6 8.2Q3.6 9.6 4.6 10.2Q4.8 8.4 6.4 8.4Z", C.noir),
  circle(9.2, 6.4, 1.1, C.ocreLight, { w: 0.7 }), eye(9.2, 6.4, 0.5),
].join("");

/* ---------- singe : colobe guéréza ---------- */
const COL = "#26211E";
const singe = [
  thick("M3 21.4H21", C.bois, 1.4),
  // longue queue blanche touffue
  thick("M15.2 17.4Q19.4 17.4 19.8 13Q20 10.6 20.4 9", C.white, 0.9),
  path("M20.4 12.4Q18.6 8.6 20 5Q20.6 3.2 21.8 2.4Q23.4 5.2 22.6 9Q22 11.8 20.4 12.4Z", C.white, { w: 0.9 }),
  line("M21 9.4Q20.8 6.8 21.6 4.6", C.grisLight, 0.6),
  // corps assis noir, manteau blanc sur les flancs
  path("M7.2 20.6Q6.2 14.6 8.4 11.6Q12 9.6 15.6 11.6Q17.8 14.6 16.8 20.6Z", COL),
  path("M8 12.2Q5.6 15.4 6.2 20.4L7.6 19.4L7.8 20.8L9 19.2Q8.6 15.4 9.4 12.4Z", C.white, { w: 0.9 }),
  path("M16 12.2Q18.4 15.4 17.8 20.4L16.4 19.4L16.2 20.8L15 19.2Q15.4 15.4 14.6 12.4Z", C.white, { w: 0.9 }),
  // bras et mains sur la branche
  path("M10 14.4L9.8 20.6H11.6L11.6 14.6Z", COL, { w: 0.9 }), path("M14 14.4L14.2 20.6H12.4L12.4 14.6Z", COL, { w: 0.9 }),
  // tête : couronne noire, cercle blanc, visage noir
  circle(12, 7, 4.4, C.white),
  path("M7.8 6.4Q8.2 2.4 12 2.4Q15.8 2.4 16.2 6.4Q14 4.8 12 5.6Q10 4.8 7.8 6.4Z", COL, { w: 0.9 }),
  ellipse(12, 8, 2.5, 2.8, COL, { w: 0.9 }),
  circle(11, 7.4, 0.62, C.ocre, false), circle(13, 7.4, 0.62, C.ocre, false),
  eye(11, 7.4, 0.3), eye(13, 7.4, 0.3),
  path("M11.2 9.6Q12 10.2 12.8 9.6", "none", { c: "#7A6E66", w: 0.6 }),
].join("");

/* ---------- phacochère ---------- */
const WART = "#7F6B5E", WART_DARK = "#4A3B32", WART_SKIN = "#9E8A7C";
const phacochere = [
  leg(17, 14, 21.4, 1.5, WART_DARK), leg(11.4, 14, 21.4, 1.5, WART_DARK),
  // queue dressée à toupet
  thick("M20.6 10.6L21.6 4.8", WART, 0.5),
  path("M21.6 5.6Q20.6 3.6 21.8 1.8Q23.2 3.4 22.2 5.6Z", WART_DARK, { w: 0.8 }),
  path("M8.2 9.4Q12.6 6.6 17.8 7.6Q21.6 8.6 21.2 12.4Q20.8 15.2 18 15.2H10.6Q7.8 14.8 7.8 12.4Z", WART),
  // crinière sombre le long du dos
  path("M8.6 8.8L9.6 6.4L10.4 8L11.6 5.8L12.4 7.6L13.6 5.6L14.4 7.4L15.8 5.8L16.2 7.6L17.6 6.6L17.6 8.2Q13 6.8 8.6 8.8Z", WART_DARK, { w: 0.8 }),
  leg(19.2, 14.4, 21.8, 1.6, WART), leg(9.2, 14.2, 21.8, 1.6, WART),
  // grosse tête plate, verrues, défenses recourbées
  path("M10 8.6Q7.8 6.4 5.6 7.6Q4.4 9 3.6 11.6L1.6 15.6Q1.6 17.4 3.4 17.2Q7.6 16.6 10.6 13.6Z", WART_SKIN),
  ellipse(2.4, 16.4, 1, 1.2, WART_DARK, { w: 0.8 }),
  path("M3.8 15.6Q1.6 15.2 1.6 12.2Q2.6 13.6 4.6 14.2Z", C.white, { w: 0.8 }),
  path("M5.6 14.8Q3.4 13.6 4 11.4Q4.8 12.8 6.4 13.2Z", C.white, { w: 0.8 }),
  ellipse(5.6, 11.2, 0.8, 0.6, WART, { w: 0.7 }), ellipse(7.8, 13.4, 0.7, 0.55, WART, { w: 0.7 }),
  path("M8.6 7.4L10.8 4.8L11 8.4Z", WART_SKIN, { w: 0.9 }),
  eye(7, 9.4, 0.55),
].join("");

/* ---------- buffle d'Afrique ---------- */
const BUF = "#3B3330", BUF_HORN = "#8E857C", BUF_MUZZLE = "#5E5450";
const buffle = [
  // oreilles tombantes sous les cornes
  path("M7.6 10.2Q4 9.6 2.4 11.6Q4.4 13.6 8 12.4Z", BUF), path("M16.4 10.2Q20 9.6 21.6 11.6Q19.6 13.6 16 12.4Z", BUF),
  path("M7 10.8Q4.8 10.6 3.8 11.6Q5.4 12.6 7.4 12Z", "#7A6A60", false), path("M17 10.8Q19.2 10.6 20.2 11.6Q18.6 12.6 16.6 12Z", "#7A6A60", false),
  // long visage
  path("M7.4 8Q12 6.4 16.6 8Q17.2 13.4 15.4 18.2Q14.6 21.6 12 21.6Q9.4 21.6 8.6 18.2Q6.8 13.4 7.4 8Z", BUF),
  ellipse(12, 19.2, 3, 2.4, BUF_MUZZLE),
  ellipse(10.8, 19, 0.6, 0.85, O, false), ellipse(13.2, 19, 0.6, 0.85, O, false),
  // cornes en casque (« boss ») qui se rejoignent au front puis remontent
  path("M12 4.6Q16.2 3.2 19.6 5.4Q21.4 6.8 21.2 9Q22.6 7.6 22.4 4.4Q22.2 2.8 21.2 2Q22 6 20 6Q17.6 5.4 15.6 6.6Q14 7.6 12 7.6Q10 7.6 8.4 6.6Q6.4 5.4 4 6Q2 6 2.8 2Q1.8 2.8 1.6 4.4Q1.4 7.6 2.8 9Q2.6 6.8 4.4 5.4Q7.8 3.2 12 4.6Z", BUF_HORN),
  line("M10.6 5.4Q12 6.2 13.4 5.4", "#6E665E", 0.7),
  circle(9.4, 11.6, 0.95, "#C9B8A8", { w: 0.6 }), circle(14.6, 11.6, 0.95, "#C9B8A8", { w: 0.6 }),
  eye(9.4, 11.7, 0.5), eye(14.6, 11.7, 0.5),
].join("");

/* ---------- vache Ankole ---------- */
const ANK = "#9A3A1E", ANK_DARK = "#7A2C16", ANK_HORN = "#F0E3C6", ANK_TIP = "#8A7860";
const ankoleHorn = (d) => path(d, ANK_HORN);
const vacheAnkole = [
  leg(17.2, 15, 22, 1.6, ANK_DARK, O), leg(11.4, 15, 22, 1.6, ANK_DARK, O),
  thick("M21.4 12.6Q22.6 14.6 22 18", ANK, 0.5),
  path("M21.6 17Q22.6 18.4 21.8 19.6Q21 18.6 21.6 17Z", O, { w: 0.6 }),
  path("M8 12.4Q11 10.2 16.4 10.6Q21.8 11 21.6 14.6Q21.4 17.2 18.4 17.2H10.8Q8 16.8 7.8 14.6Z", ANK),
  // petite bosse des bovins Sanga
  path("M8.8 11.6Q9.8 9.6 11.6 10.6Q10.4 11 10.2 12Z", ANK, { w: 0.9 }),
  leg(19.4, 15.4, 22.4, 1.7, ANK, O), leg(9.2, 15.2, 22.4, 1.7, ANK, O),
  // cornes immenses en lyre
  ankoleHorn("M4.6 9.6Q1.4 6.6 1.6 1.2Q2.6 0.8 3.4 1.4Q3.4 5.6 6 8.4Z"),
  ankoleHorn("M6.4 8.8Q8.4 4.4 12.6 1.4Q13.6 1.6 13.4 2.6Q10.2 5.6 7.8 9.8Z"),
  path("M1.6 1.2Q2.6 0.8 3.4 1.4L3.4 2.8Q2.4 2.4 1.6 2.8Z", ANK_TIP, { w: 0.7 }),
  path("M12.6 1.4Q13.6 1.6 13.4 2.6L12.2 3.6Q11.8 2.6 12.6 1.4Z", ANK_TIP, { w: 0.7 }),
  // tête
  path("M8.6 10.4Q7.4 8.6 5.4 8.8Q4 9.2 3.8 11L3 15Q2.8 17 4.6 17Q6.2 17 6.6 15.4Q7.4 13.4 9.8 12.8Z", ANK),
  ellipse(4.5, 16, 1.7, 1.2, "#C98A6A", { w: 0.8 }),
  ellipse(3.9, 15.9, 0.32, 0.42, O, false), ellipse(5.1, 15.9, 0.32, 0.42, O, false),
  g("rotate(20 9 10.4)", ellipse(9, 10.4, 1.8, 0.8, ANK, { w: 0.85 })),
  eye(5, 11.6, 0.5),
].join("");

/* ---------- chèvre naine d'Afrique de l'Ouest ---------- */
const GOAT = "#8A5634", GOAT_DARK = "#3A2A20", GOAT_LIGHT = "#B98256";
const chevre = [
  leg(16.8, 15, 21.4, 1.7, GOAT_DARK), leg(10.8, 15, 21.4, 1.7, GOAT_DARK),
  // petite queue dressée
  path("M20.2 10.8L21.8 7.8L22 10.4Z", GOAT_DARK, { w: 0.9 }),
  path("M8.2 11Q11.6 8.6 16.8 9.2Q21.2 9.6 21.2 13.2Q21 16.6 17.8 16.6H10.6Q8 16.2 7.8 13.6Z", GOAT),
  line("M9.4 10.2Q14.6 8.2 20.4 10.4", GOAT_DARK, 1),
  path("M10.6 16.6Q14.4 17.4 18 16.6Q16.4 15.2 14.2 15.2Q12 15.2 10.6 16.6Z", GOAT_LIGHT, false),
  leg(18.8, 15.4, 21.8, 1.8, GOAT), leg(8.8, 15.2, 21.8, 1.8, GOAT),
  line("M8.8 20.6H10.6M18.8 20.6H20.6", O, 0.7),
  // cornes courtes vers l'arrière, oreille horizontale, barbiche
  thick("M6.2 5.6Q6.8 3.4 9 3.2", C.gris, 0.7),
  path("M8.6 11.6Q8.6 7.8 6.8 5.8Q5 4.4 3.4 6.2L1.8 9.6Q1.4 11.2 2.8 11.8Q4.4 12 5.4 11.2Q6.4 12.6 8.6 11.6Z", GOAT),
  path("M1.8 9.6Q1.4 11.2 2.8 11.8Q4.2 12 5 11Q3.2 10.4 1.8 9.6Z", GOAT_DARK, { w: 0.7 }),
  path("M7 6.6Q9.6 6.2 10.6 7.4Q9.6 8.4 7.6 8.2Z", GOAT, { w: 0.9 }),
  path("M2.8 11.4Q2.6 13.6 3.6 14.8Q4 13 4.4 11.6Z", GOAT_DARK, { w: 0.8 }),
  eye(5.4, 7.2, 0.55),
].join("");

/* ---------- âne ---------- */
const DONK = "#8F969C", DONK_DARK = "#5E656B", DONK_LIGHT = "#E4E2DC";
const ane = [
  leg(16.8, 14.6, 22, 1.6, DONK_DARK, O), leg(11, 14.6, 22, 1.6, DONK_DARK, O),
  thick("M20.8 10.8Q22 13 21.6 16.4", DONK, 0.5),
  path("M21.6 15.4Q22.8 17.2 21.6 18.6Q20.8 17 21.6 15.4Z", DONK_DARK, { w: 0.7 }),
  path("M8.4 10Q11.4 8 16.6 8.6Q21.4 9 21.4 12.6Q21.2 16 18 16H10.6Q8 15.6 7.8 13.2Z", DONK),
  path("M10.6 16Q14.4 16.8 18 16Q16.4 14.6 14.2 14.6Q12 14.6 10.6 16Z", DONK_LIGHT, false),
  leg(19, 15, 22.4, 1.7, DONK, O), leg(9, 14.8, 22.4, 1.7, DONK, O),
  // cou, crinière courte, longues oreilles
  path("M9.8 9Q8.8 5.6 6.4 4.8L4.6 7.8Q7 9.6 7.8 13Z", DONK),
  path("M6.6 4.6Q8.8 4.8 10.2 9.2L9.4 9.4Q8 6.4 6.2 5.6Z", DONK_DARK, { w: 0.8 }),
  g("rotate(-25 6.4 2.6)", ellipse(6.4, 2.6, 0.9, 2.4, DONK, { w: 0.9 })),
  g("rotate(5 8 2.8)", ellipse(8, 2.8, 0.9, 2.4, DONK, { w: 0.9 })),
  path("M7 5.4Q4.8 4.4 3.6 6.6L1.6 10.6Q1.2 12.4 2.8 12.6Q4.6 12.6 5.6 11.2L7.6 8.6Z", DONK),
  path("M1.6 10.6Q1.2 12.4 2.8 12.6Q4.6 12.6 5.4 11.4Q4 10 2.4 9.4Z", DONK_LIGHT, { w: 0.8 }),
  circle(2.2, 10.6, 0.3, O, false),
  eye(5, 6.8, 0.55),
].join("");

/* ---------- hyène tachetée ---------- */
const HYE = "#C9A271", HYE_SPOT = "#6B4A2E", HYE_DARK = "#4A3524";
const hyene = [
  leg(17.2, 13.4, 21.4, 1.9, "#A8834F"), leg(9.4, 12, 21.4, 2, "#A8834F"),
  path("M20.2 11.6Q22.6 13.6 22 17.2Q20.8 16 20.2 13.6Z", HYE_DARK, { w: 0.9 }),
  // dos tombant : épaules hautes, croupe basse
  path("M7.6 8.4Q10.6 5.4 14.6 7.6Q18.6 9 20.6 11.6Q21.8 14.6 19.6 15.8H10.6Q7.4 15.4 7 11.4Z", HYE),
  path("M8.6 7.4L9.8 5.6L10.6 7L11.8 5.6L12.4 7.2L13.8 6.4L14 7.8Q11.4 6.2 8.6 7.4Z", HYE_DARK, { w: 0.8 }),
  dots([[11, 9.4], [13.4, 9.2], [15.8, 10.2], [18, 11.4], [12.2, 11.8], [14.8, 12.4], [17.4, 13.2], [10, 12.4]], 0.62, HYE_SPOT),
  leg(19.2, 13.8, 21.8, 1.9, HYE), leg(11.4, 12.4, 21.8, 2, HYE),
  dots([[20.1, 17.4], [12.4, 17], [12.4, 19.2]], 0.42, HYE_SPOT),
  // grosse tête, oreilles rondes, museau sombre
  path("M8.8 7.6Q6.8 5.8 4.4 6.8Q2.6 8 1.8 10.8Q1.4 12.6 2.6 13Q4.6 13.2 6.2 12.2Q8.6 11.6 9.4 9.6Z", HYE),
  path("M2.2 10.2Q1.4 12.6 2.6 13Q4.2 13.2 5.2 12.4Q4.6 10.6 3 9.6Z", HYE_DARK, { w: 0.8 }),
  circle(6.4, 5, 1.3, HYE, { w: 0.9 }), circle(6.4, 5.1, 0.6, HYE_DARK, false),
  dots([[6.4, 10.4], [7.8, 9.2]], 0.42, HYE_SPOT),
  eye(5, 8.4, 0.55),
].join("");

/* ---------- suricate ---------- */
const MEER = "#C8A574", MEER_LIGHT = "#EAD7B2", MEER_DARK = "#4A3524";
const suricate = [
  ellipse(12, 22, 8, 1.2, C.sable),
  // queue fine posée au sol, pointe noire
  thick("M14.4 20.6Q18.6 21.4 20 18.6Q20.8 16.6 20.4 14.6", MEER, 0.8),
  thick("M20.5 16.2Q20.6 15.2 20.4 14.6", MEER_DARK, 0.8),
  // pattes arrière
  ellipse(10, 21, 1.8, 1, MEER, { w: 0.9 }), ellipse(14, 21, 1.8, 1, MEER, { w: 0.9 }),
  // corps dressé
  path("M12 6.6Q15.8 7 15.6 12.6Q15.8 18.4 14.6 20.8H9.4Q8.2 18.4 8.4 12.6Q8.2 7 12 6.6Z", MEER),
  path("M12 10.6Q14.2 11 14 15.4Q14 19 13.4 20.6H10.6Q10 19 10 15.4Q9.8 11 12 10.6Z", MEER_LIGHT, { w: 0.8 }),
  line("M9.4 14.6L9.8 17.6M14.6 14.6L14.2 17.6", "#A6845A", 0.6),
  // pattes avant repliées sur la poitrine
  path("M9.6 10.2Q9.2 12.6 10.8 13.2Q11.2 12 10.8 10.4Z", MEER, { w: 0.85 }),
  path("M14.4 10.2Q14.8 12.6 13.2 13.2Q12.8 12 13.2 10.4Z", MEER, { w: 0.85 }),
  // tête de face : museau pointu, masques sombres autour des yeux, oreilles noires
  circle(8.6, 3.8, 0.9, MEER_DARK, { w: 0.8 }), circle(15.4, 3.8, 0.9, MEER_DARK, { w: 0.8 }),
  path("M8.2 4.8Q8.4 1.6 12 1.6Q15.6 1.6 15.8 4.8Q15.6 7.2 13.4 8.8L12.6 9.6H11.4L10.6 8.8Q8.4 7.2 8.2 4.8Z", MEER),
  path("M10.2 7.4Q11 6.6 12 6.8Q13 6.6 13.8 7.4Q13.2 9 12.6 9.6H11.4Q10.8 9 10.2 7.4Z", MEER_LIGHT, { w: 0.7 }),
  g("rotate(-25 10.2 5.2)", ellipse(10.2, 5.2, 1.3, 0.9, MEER_DARK, false)),
  g("rotate(25 13.8 5.2)", ellipse(13.8, 5.2, 1.3, 0.9, MEER_DARK, false)),
  circle(10.3, 5.1, 0.42, C.ocreLight, false), circle(13.7, 5.1, 0.42, C.ocreLight, false),
  ellipse(12, 9.3, 0.7, 0.45, O, false),
].join("");

/* ---------- pintade de Numidie ---------- */
const PINT = "#3D4250", PINT_BLUE = "#5DA9D8", PINT_CASQUE = "#C98A3A";
const pintade = [
  thick("M11.2 17.6L10.8 21.6M15 17.8L15.4 21.6", C.grisLight, 0.6),
  line("M9.8 21.8H11.6M14.6 21.8H16.6", O, 0.9),
  // corps rond et bossu, queue tombante
  path("M7.6 12.4Q8.4 6.6 14 6.4Q20.4 6.6 22 13.4Q22.6 16.2 21.2 17Q18 19.2 13 18.8Q8.2 18.4 7.6 12.4Z", PINT),
  dots([[11, 9.8], [13.6, 8.8], [16.4, 8.8], [18.8, 10.2], [9.6, 12.6], [12.2, 11.6], [15, 11.2], [17.6, 12.2], [20.2, 12.8],
    [10.8, 15], [13.4, 14], [16.2, 14], [18.8, 15], [21, 15.4], [12.4, 16.8], [15, 16.6], [17.6, 17.2]], 0.42, C.white),
  // cou fin, tête bleue nue, casque corné, barbillons rouges
  path("M9.2 11.4Q7.6 9 6.8 7.4L5 8.2Q5.6 11 7.8 13Z", PINT, { w: 0.9 }),
  path("M7.4 7.8Q7.6 4.4 5.4 4.4Q3.2 4.6 3.4 7Q3.6 9 5.4 9.2Q7 9.2 7.4 7.8Z", PINT_BLUE, { w: 0.9 }),
  path("M4.6 4.8L5.2 1.6L6.6 4.8Z", PINT_CASQUE, { w: 0.8 }),
  path("M3.6 7.2L1.6 7.8L3.6 8.4Z", C.ocreLight, { w: 0.7 }),
  path("M4 8.8Q3.6 10.4 4.6 10.6Q5.4 10.2 5 9Z", C.rouge, { w: 0.7 }),
  eye(4.8, 6.4, 0.5),
].join("");

/* ---------- impala ---------- */
const IMP = "#B8693A", IMP_LIGHT = "#E0A86C", IMP_HORN = "#4A3524";
const impala = [
  thick("M17.6 14.6L17.8 21.8M10.4 14.4L10.2 21.8", "#9A5530", 0.6),
  path("M20.6 9.8Q21.8 10.6 21.6 12.6Q20.6 12.2 20.4 10.6Z", C.white, { w: 0.8 }),
  path("M8.4 10.8Q11.4 8.6 16.8 9Q21 9.4 21 12.4Q20.8 15.2 17.8 15.2H10.6Q8 14.8 7.8 12.8Z", IMP),
  path("M8.8 13.2Q13.4 11.6 20.6 13.4Q20 15.2 17.8 15.2H10.6Q9 15 8.8 13.2Z", IMP_LIGHT, false),
  path("M10.8 15.2Q14 16 17 15.2Q15.6 14.4 14 14.4Q12.2 14.4 10.8 15.2Z", C.white, { w: 0.7 }),
  line("M20.2 11.2L19.8 14.4", O, 0.8),
  thick("M19.4 14.8L19.8 22M9.2 14.6L8.4 22", IMP, 0.7),
  line("M7.6 22H9.2M19 22H20.6", O, 0.9),
  // cou dressé, tête fine
  path("M10.4 11Q9 8.6 7.4 7L4.8 8.4Q6.6 10.4 7.8 13.2Z", IMP),
  path("M7.6 7.8Q6.4 5.4 4.2 6.4L1.6 9Q1.2 10.2 2.4 10.6Q4 10.8 5.4 9.6Z", IMP),
  path("M1.6 9Q1.2 10.2 2.4 10.6Q3.4 10.6 4 10Q2.6 9.6 1.6 9Z", C.white, { w: 0.6 }),
  // cornes en lyre (mâle), annelées
  thick("M5.4 6.6Q3.2 4.8 3.8 3Q4.4 1.8 4.2 1", IMP_HORN, 0.55),
  thick("M6.4 6.4Q8.6 4.8 8.2 2.8Q7.8 1.8 8.2 1", IMP_HORN, 0.55),
  g("rotate(35 8.2 6.6)", ellipse(8.2, 6.6, 0.7, 1.6, IMP, { w: 0.8 })),
  eye(4.8, 7.4, 0.5),
].join("");

/* ---------- autruche ---------- */
const OST_NECK = "#E8B7A0", OST_LEG = "#E09A84";
const autruche = [
  // longues pattes nues, genou marqué
  thick("M13.4 14.6L12.6 18.4L13 22", OST_LEG, 0.9),
  thick("M16 14.6L17.4 18.2L16.4 22", OST_LEG, 0.9),
  line("M11.6 22.2H13.6M15.4 22.2H17.6", O, 1),
  // cou très long
  thick("M10.6 10.4Q8.2 8 7.6 3.6", OST_NECK, 1.3),
  // plumage noir, panache blanc des ailes et de la queue
  path("M8.6 9.4Q10.8 5.8 15.4 6Q20.6 6.4 21.4 10.4Q21 14.6 16.6 15.6Q11.4 16 9.6 13.4Q8.2 11.6 8.6 9.4Z", C.noir),
  path("M20.2 7.6Q23 7.6 22.8 10.6Q22.4 13 20.4 12.6Q21.6 10.6 20.2 7.6Z", C.white),
  path("M14 8.8Q17 8.2 19.6 9.8Q18.6 12.4 15.6 12.6Q13.6 12 14 8.8Z", C.white, { w: 0.8 }),
  // petite tête, gros œil, bec plat
  ellipse(7.4, 3, 1.9, 1.5, OST_NECK),
  path("M5.8 2.6L3.4 3.4L5.8 4Z", C.ocreLight, { w: 0.7 }),
  circle(7.4, 2.6, 0.7, C.white, { w: 0.6 }), eye(7.3, 2.6, 0.42),
].join("");

const A = (slug, fr, en, char, tags, body) => ({ slug, fr, en, char, group: "animaux", tags, tone: false, body });
/** Recadrage (audit du dessin) : ces dessins débordaient de la grille 24 × 24 (ou étaient décentrés) ;
 *  ils sont réduits et décalés juste assez pour y tenir : [échelle, décalage x, décalage y]. */
const CADRE = { "leopard": [1, -0.7, 0], "ane": [0.99, 0, 0.5], "impala": [0.96, 0, 0.5], "flamant-rose": [1, 0, -0.3] };
const cadre = (e) => { const f = CADRE[e.slug]; return f ? { ...e, body: `<g transform="translate(${Math.round((12 + f[1]) * 100) / 100} ${Math.round((12 + f[2]) * 100) / 100}) scale(${f[0]}) translate(-12 -12)">${e.body}</g>` } : e; };
export default [
  A("hippopotame", "Hippopotame", "Hippopotamus", "🦛", ["hippopotame", "hippopotamus", "hippo", "kiboko", "fleuve", "river", "nil", "zambèze", "okavango"], hippopotame),
  A("rhinoceros", "Rhinocéros", "Rhinoceros", "🦏", ["rhinocéros", "rhinoceros", "rhino", "faru", "kifaru", "savane", "savanna", "kenya", "afrique du sud", "namibie"], rhinoceros),
  A("crocodile", "Crocodile du Nil", "Nile crocodile", "🐊", ["crocodile", "mamba", "ngwena", "nil", "nile", "fleuve", "river", "reptile"], crocodile),
  A("leopard", "Léopard", "Leopard", "🐆", ["léopard", "leopard", "chui", "ingwe", "panthère", "rosettes", "savane", "forêt"], leopard),
  A("dromadaire", "Dromadaire", "Dromedary camel", "🐪", ["dromadaire", "dromedary", "chameau", "camel", "ngamia", "jamal", "sahara", "désert", "desert", "touareg"], dromadaire),
  A("flamant-rose", "Flamant rose", "Flamingo", "🦩", ["flamant rose", "flamingo", "heroe", "lac nakuru", "lake natron", "kenya", "tanzanie", "oiseau", "bird"], flamant),
  A("perroquet-gris", "Perroquet gris du Gabon", "African grey parrot", "🦜", ["perroquet gris", "african grey", "parrot", "kasuku", "jaco", "gabon", "congo", "cameroun", "oiseau", "bird"], perroquet),
  A("singe", "Colobe guéréza", "Colobus monkey", "🐒", ["singe", "monkey", "colobe", "colobus", "mbega", "tumbili", "kima", "forêt", "forest", "ouganda", "éthiopie"], singe),
  A("phacochere", "Phacochère", "Warthog", "🐗", ["phacochère", "warthog", "ngiri", "pumba", "sanglier", "savane", "savanna", "défenses", "tusks"], phacochere),
  A("buffle", "Buffle d'Afrique", "African buffalo", "🐃", ["buffle", "buffalo", "cape buffalo", "nyati", "mbogo", "savane", "big five", "cornes", "horns"], buffle),
  A("vache-ankole", "Vache Ankole", "Ankole cattle", "🐄", ["vache", "cow", "ankole", "watusi", "inyambo", "ouganda", "rwanda", "burundi", "cornes", "horns", "ng'ombe"], vacheAnkole),
  A("chevre", "Chèvre naine", "West African dwarf goat", "🐐", ["chèvre", "goat", "chèvre naine", "dwarf goat", "mbuzi", "ewure", "akuko", "village", "afrique de l'ouest", "west africa"], chevre),
  A("ane", "Âne", "Donkey", "🫏", ["âne", "donkey", "punda", "baudet", "sahel", "village", "charrette", "cart"], ane),
  A("hyene", "Hyène tachetée", "Spotted hyena", null, ["hyène", "hyena", "fisi", "bouki", "savane", "savanna", "tachetée", "spotted", "serengeti"], hyene),
  A("suricate", "Suricate", "Meerkat", null, ["suricate", "meerkat", "stokstert", "kalahari", "botswana", "namibie", "afrique du sud", "désert"], suricate),
  A("pintade", "Pintade", "Guineafowl", null, ["pintade", "guineafowl", "kanga", "zabo", "oiseau", "bird", "village", "volaille", "poultry"], pintade),
  A("impala", "Impala", "Impala", null, ["impala", "swala pala", "antilope", "antelope", "savane", "savanna", "kenya", "tanzanie", "botswana"], impala),
  A("autruche", "Autruche", "Ostrich", null, ["autruche", "ostrich", "mbuni", "volstruis", "oiseau", "bird", "kalahari", "sahel", "savane"], autruche),
].map(cadre);
