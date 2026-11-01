// Emojis faune d'Afrique (lot B) : forêts, primates et Madagascar (dessins originaux Afroicons).
// Animaux de profil (tête à gauche) ou de face pour les primates, couleur à plat et contour brun foncé.
import { O, W, C, path, circle, ellipse, rect, line, g } from "./lib.mjs";

/** Trait épais « plein » : contour brun puis couleur par-dessus (queues, pattes fines, cornes). */
const thick = (d, col, w = 1.5) => line(d, O, w + 2 * W) + line(d, col, w);
const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const eye = (x, y, r = 0.55) => circle(x, y, r, O, false);
/** Patte droite arrondie, avec sabot ou pied plus sombre. */
const leg = (x, top, bottom, w, fill, foot) => rect(x, top, w, bottom - top, w / 2.2, fill) + (foot ? rect(x, bottom - 1.2, w, 1.2, 0.4, foot, { w: 0.8 }) : "");

/* ---------- chimpanzé : visage clair, grandes oreilles ---------- */
const CHIMP = "#2F2723", CHIMP_FACE = "#C9A57E", CHIMP_SHADE = "#A9845E";
const chimpanze = [
  ellipse(3.6, 12, 2.4, 2.9, CHIMP_FACE), ellipse(20.4, 12, 2.4, 2.9, CHIMP_FACE),
  ellipse(3.8, 12, 1.1, 1.6, CHIMP_SHADE, false), ellipse(20.2, 12, 1.1, 1.6, CHIMP_SHADE, false),
  path("M12 2.4Q18.4 2.4 18.6 9.4Q19 15.6 16.6 19.2Q14.8 21.6 12 21.6Q9.2 21.6 7.4 19.2Q5 15.6 5.4 9.4Q5.6 2.4 12 2.4Z", CHIMP),
  // visage nu, en cœur
  path("M12 7.6Q14.2 5.8 16.2 7.4Q17.6 9 16.8 12.4Q16.6 14.2 16.2 15.6Q15.4 20.6 12 20.6Q8.6 20.6 7.8 15.6Q7.4 14.2 7.2 12.4Q6.4 9 7.8 7.4Q9.8 5.8 12 7.6Z", CHIMP_FACE),
  line("M8.4 9.6Q10 8.6 11.4 9.6M12.6 9.6Q14 8.6 15.6 9.6", CHIMP_SHADE, 0.8),
  circle(9.9, 11, 0.95, "#6B4A2E", { w: 0.6 }), circle(14.1, 11, 0.95, "#6B4A2E", { w: 0.6 }),
  eye(9.9, 11.1, 0.5), eye(14.1, 11.1, 0.5),
  // museau proéminent
  path("M8.6 16.2Q8.6 13.2 12 13.2Q15.4 13.2 15.4 16.2Q15.2 19.4 12 19.4Q8.8 19.4 8.6 16.2Z", "#D9B993", { w: 0.9 }),
  ellipse(11.2, 14.6, 0.45, 0.35, O, false), ellipse(12.8, 14.6, 0.45, 0.35, O, false),
  line("M9.8 17.2Q12 18.2 14.2 17.2", O, 0.8),
].join("");

/* ---------- bonobo : raie au milieu, favoris, visage noir, lèvres roses ---------- */
const BONO = "#1E1A18", BONO_FACE = "#3B312C", BONO_LIP = "#E58A94";
const bonobo = [
  ellipse(4.4, 12.2, 1.4, 1.8, BONO_FACE, { w: 0.9 }), ellipse(19.6, 12.2, 1.4, 1.8, BONO_FACE, { w: 0.9 }),
  // chevelure séparée par une raie, longs favoris sur les côtés
  path("M12 4.4Q9.8 1.6 6.6 3.2Q4.4 4.8 4.8 8.4Q4.4 11.4 2 13.4Q4.6 13.8 5.4 15.6Q7 21.4 12 21.4Q17 21.4 18.6 15.6Q19.4 13.8 22 13.4Q19.6 11.4 19.2 8.4Q19.6 4.8 17.4 3.2Q14.2 1.6 12 4.4Z", BONO),
  line("M12 5V7.4", "#5A4E46", 0.8),
  path("M12 7.6Q16.2 7.2 16.6 11.2Q16.8 14.4 16 16.6Q15 20 12 20Q9 20 8 16.6Q7.2 14.4 7.4 11.2Q7.8 7.2 12 7.6Z", BONO_FACE),
  circle(10, 11.2, 0.95, "#8A5A34", { w: 0.6 }), circle(14, 11.2, 0.95, "#8A5A34", { w: 0.6 }),
  eye(10, 11.3, 0.5), eye(14, 11.3, 0.5),
  ellipse(11.3, 14, 0.42, 0.32, O, false), ellipse(12.7, 14, 0.42, 0.32, O, false),
  path("M9.6 16.4Q12 15.4 14.4 16.4Q13.8 18.4 12 18.4Q10.2 18.4 9.6 16.4Z", BONO_LIP, { w: 0.8 }),
  line("M9.8 16.6Q12 17.2 14.2 16.6", O, 0.6),
].join("");

/* ---------- babouin olive : museau de chien, queue « cassée » ---------- */
const BAB = "#8E8858", BAB_DARK = "#6A6542", BAB_MUZ = "#4C4640";
const babouin = [
  leg(16.6, 14, 21.4, 2, BAB_DARK, BAB_MUZ), leg(9.4, 13.4, 21.4, 2, BAB_DARK, BAB_MUZ),
  // queue relevée puis tombante
  thick("M19.6 13.4Q20.4 10.6 21.6 10.8Q22.4 11.4 22.2 17.4", BAB, 1.1),
  path("M7.4 9.6Q10.4 6.6 14 9.4Q17.6 11 20 12.6Q21.6 14.2 20.8 16Q20 17 18.6 17H10.4Q7.6 16.6 7 13.4Z", BAB),
  // crinière des épaules
  path("M7.4 9.6Q10.4 6.6 13.4 9Q12.6 12 13 15.4Q10.4 14.6 9.4 16.2Q8.4 14.2 7.2 13.6Z", BAB_DARK, { w: 0.9 }),
  path("M19.4 13.2Q21 13.6 20.8 15.6Q19.6 16 19 14.6Z", "#C98A7A", { w: 0.7 }),
  leg(18.6, 14.6, 21.8, 2, BAB, BAB_MUZ), leg(11.4, 14.4, 21.8, 2, BAB, BAB_MUZ),
  // tête basse, long museau sombre
  path("M9.6 9.8Q8.6 7.6 6.4 7.8Q4.6 8 4.2 9.8L1.8 13.2Q1.2 14.6 2.2 15.4Q3.4 16.2 5.6 15.4Q8.8 14.2 9.8 12Z", BAB),
  path("M3.6 11L1.8 13.2Q1.2 14.6 2.2 15.4Q3.2 16 4.8 15.4Q5 13.2 4.6 11.6Z", BAB_MUZ, { w: 0.8 }),
  ellipse(1.9, 13.7, 0.35, 0.3, O, false),
  line("M7.4 9.6Q6.2 9 5.2 9.8", O, 0.8),
  circle(6.4, 10.6, 0.75, "#E3A22F", { w: 0.6 }), eye(6.4, 10.7, 0.42),
].join("");

/* ---------- mandrill : nez rouge, joues bleues côtelées, barbe jaune ---------- */
const MAN = "#5B4C33", MAN_RED = "#D93A2B", MAN_BLUE = "#4A82C8", MAN_BEARD = "#E8B83E";
const mandrill = [
  path("M12 1.8Q18.6 1.8 19.2 8.4Q19.6 12.6 17.6 15.8L15.6 19.4Q14.2 21.6 12 21.6Q9.8 21.6 8.4 19.4L6.4 15.8Q4.4 12.6 4.8 8.4Q5.4 1.8 12 1.8Z", MAN),
  path("M6.4 15.8Q9 18 12 18Q15 18 17.6 15.8L15.6 19.4Q14.2 21.8 12 22.2Q9.8 21.8 8.4 19.4Z", MAN_BEARD, { w: 0.9 }),
  path("M7.6 4.8Q9.6 3.4 12 4.6Q14.4 3.4 16.4 4.8Q14.6 5.8 12 6.6Q9.4 5.8 7.6 4.8Z", "#3E3322", { w: 0.8 }),
  // joues bleues côtelées
  path("M10.6 8.4Q7.8 9 7.4 12.4Q7.6 15 9.8 16.6L10.8 16Z", MAN_BLUE, { w: 0.9 }),
  path("M13.4 8.4Q16.2 9 16.6 12.4Q16.4 15 14.2 16.6L13.2 16Z", MAN_BLUE, { w: 0.9 }),
  line("M9.4 10Q8.6 12.4 9.4 15M15.6 10Q15.4 12.4 14.6 15", "#2E5A96", 0.6),
  // long nez rouge
  path("M10.6 7.8Q12 7.2 13.4 7.8V16.4Q13.6 18 12 18Q10.4 18 10.6 16.4Z", MAN_RED, { w: 0.9 }),
  ellipse(11.4, 16.9, 0.4, 0.32, O, false), ellipse(12.6, 16.9, 0.4, 0.32, O, false),
  circle(9.2, 7.6, 0.9, "#E3A22F", { w: 0.6 }), circle(14.8, 7.6, 0.9, "#E3A22F", { w: 0.6 }),
  eye(9.2, 7.7, 0.45), eye(14.8, 7.7, 0.45),
].join("");

/* ---------- maki catta : queue annelée noir et blanc ---------- */
const LEM = "#A8A39B", LEM_DARK = "#86817A", LEM_BELLY = "#ECE8E1";
const makiCatta = [
  leg(14.6, 15.6, 21.4, 1.6, LEM_DARK), leg(7.4, 15.6, 21.4, 1.6, LEM_DARK),
  // queue dressée en crosse, anneaux noirs et blancs
  path("M14.6 14.6Q21.6 14.6 21.8 8.6Q22 3.6 17.4 2.6Q15 2.2 14.4 3.8Q14.2 5.2 16.4 5.4Q18.8 5.8 18.8 8.6Q18.6 11.4 14.6 11.6Z", C.white),
  path("M19 12.8L21 14.2Q21.8 13.2 22 12L19.6 11.6ZM18.8 8.8H21.8Q21.8 7.6 21.6 6.8L18.6 7.4ZM17.4 5.6L19.2 3.4Q18.4 2.8 17.4 2.6L16.4 5.4Z", C.noir, false),
  path("M14.6 14.6Q21.6 14.6 21.8 8.6Q22 3.6 17.4 2.6Q15 2.2 14.4 3.8Q14.2 5.2 16.4 5.4Q18.8 5.8 18.8 8.6Q18.6 11.4 14.6 11.6Z", "none"),
  path("M6.4 12.6Q10 10.8 14.4 11.6Q17.6 12.2 17.2 15Q16.8 17.4 14.4 17.4H8.4Q6 17 6 14.6Z", LEM),
  path("M7 15.6Q10 14.8 12.8 15.6Q14.4 16.2 15.6 17.4H8.4Q7.2 17.2 7 15.6Z", LEM_BELLY, false),
  leg(16, 16, 21.8, 1.6, LEM, C.noir), leg(8.8, 16, 21.8, 1.6, LEM, C.noir),
  // tête de renard : masque blanc, cercles noirs autour des yeux, museau noir
  path("M8.6 11.6Q7.8 9 5.4 9.2Q3.6 9.4 3.2 11L1.6 13Q1.2 14 2 14.4Q3.6 15 6 14.6Q8.6 14 8.6 11.6Z", C.white),
  path("M1.6 13Q1.2 14 2 14.4Q2.8 14.6 3.4 14.4Q3.2 13.2 2.4 12.2Z", C.noir, { w: 0.6 }),
  path("M6.4 9.4L6.8 7.4L8.4 9.6Z", LEM, { w: 0.8 }),
  path("M6.8 9.6Q8.2 10.2 8.4 12", "none", { c: LEM, w: 1.2 }),
  ellipse(4.8, 11.2, 1.1, 0.9, C.noir, false), circle(4.6, 11.1, 0.55, C.orange, false), eye(4.6, 11.1, 0.28),
].join("");

/* ---------- aye-aye : immenses oreilles, yeux ronds, long doigt ---------- */
const AYE = "#3C3430", AYE_LIGHT = "#6B605A", AYE_EAR = "#241E1B";
const ayeAye = [
  path("M9 9Q4.6 8.8 2.6 5Q1.8 3 2.6 1.6Q6.8 1.8 9.4 4.6Q10.6 6 10.6 7.6Z", AYE_EAR),
  path("M15 9Q19.4 8.8 21.4 5Q22.2 3 21.4 1.6Q17.2 1.8 14.6 4.6Q13.4 6 13.4 7.6Z", AYE_EAR),
  path("M8 8Q5.4 6.6 3.8 3.4Q6.6 3.8 8.6 5.8Z", "#4E4440", false), path("M16 8Q18.6 6.6 20.2 3.4Q17.4 3.8 15.4 5.8Z", "#4E4440", false),
  // corps hirsute
  path("M5.6 22.6Q5.6 16 12 15.6Q18.4 16 18.4 22.6Z", AYE),
  line("M8 19.4L7.4 21.2M10.6 18.6L10.4 20.4M14 18.8L14.4 20.6M16.4 19.6L17 21.2", AYE_LIGHT, 0.7),
  // tête ronde, museau clair
  path("M12 6.2Q17.2 6.2 17.2 11.4Q17.2 16.8 12 16.8Q6.8 16.8 6.8 11.4Q6.8 6.2 12 6.2Z", AYE),
  path("M12 11.4Q14.6 11.4 14.4 14.4Q13.8 16.4 12 16.4Q10.2 16.4 9.6 14.4Q9.4 11.4 12 11.4Z", "#B9AA9C", { w: 0.8 }),
  ellipse(12, 13.2, 0.7, 0.5, "#E2A3A0", { w: 0.6 }),
  circle(9.6, 10.2, 1.7, "#F2B33C", { w: 0.8 }), circle(14.4, 10.2, 1.7, "#F2B33C", { w: 0.8 }),
  eye(9.6, 10.2, 0.75), eye(14.4, 10.2, 0.75),
  circle(9.2, 9.7, 0.3, C.white, false), circle(14, 9.7, 0.3, C.white, false),
  // main levée, long doigt fin
  path("M17.4 22.4Q17 19.4 19.4 18.6Q21 18.6 21 20.4Q20.6 22.4 17.4 22.4Z", AYE),
  thick("M20 18.8Q21.2 15.6 21.2 10.4", AYE, 0.45),
  circle(21.2, 10.2, 0.45, "#B9AA9C", { w: 0.6 }),
].join("");

/* ---------- fossa : long corps roux, longue queue ---------- */
const FOS = "#A0603A", FOS_DARK = "#7E4626", FOS_LIGHT = "#C98A5E";
const fossa = [
  leg(15.6, 14.4, 21, 1.8, FOS_DARK), leg(8.4, 14.4, 21, 1.8, FOS_DARK),
  // queue presque aussi longue que le corps, recourbée
  thick("M17 13Q21.4 12.4 21.6 16.8Q21.8 20 20.4 21", FOS, 1.4),
  path("M6.6 11.8Q11 10.4 16 11Q19 11.6 18.6 14.4Q18.2 16.6 15.8 16.6H9Q6.4 16.4 6 14.4Z", FOS),
  path("M8.4 16.6H15.6Q14 15.4 12 15.4Q9.8 15.4 8.4 16.6Z", FOS_LIGHT, false),
  leg(17, 14.8, 21.6, 1.8, FOS, FOS_DARK), leg(9.8, 14.8, 21.6, 1.8, FOS, FOS_DARK),
  // petite tête ronde, oreilles rondes, museau court
  circle(6.6, 8.2, 1.2, FOS, { w: 0.9 }), circle(6.6, 8.3, 0.55, FOS_DARK, false),
  path("M8.6 11.4Q8.6 8.6 5.6 8.8Q3.8 9 3.4 10.6L1.8 12Q1.4 13.2 2.4 13.6Q5 14.2 7 13.6Q8.6 13 8.6 11.4Z", FOS),
  path("M1.8 12Q1.4 13.2 2.4 13.6Q3.6 13.8 4.4 13.4Q3.6 12.4 2.6 11.6Z", FOS_LIGHT, { w: 0.6 }),
  ellipse(1.9, 12.1, 0.4, 0.32, O, false),
  circle(5, 10.6, 0.75, "#E3A22F", { w: 0.6 }), eye(4.95, 10.65, 0.4),
].join("");

/* ---------- propithèque de Verreaux : pelage blanc, visage noir, saut dansé ---------- */
const SIF = "#F4F1EA", SIF_SHADE = "#D8D2C6", SIF_CAP = "#6A4630";
const propitheque = g("translate(12 12) scale(0.94) translate(-12.65 -12.5)", [
  thick("M14.4 15.4Q19.4 17.6 21.8 13", SIF, 1.2),
  // bras levés
  thick("M9 9.6L5.4 8L4 4.6M14.4 9.6L17.6 8.2L19.6 5", SIF, 1.5),
  // jambes repliées, grand pas de côté
  thick("M10.2 16L6.4 17.4L3.8 21.4M13.6 16L15 19L13.8 22", SIF, 1.7),
  path("M9.4 8.2Q12 7 14.4 8.4Q16 11.8 14.4 16.6Q12 17.6 9.4 16.6Q8 12 9.4 8.2Z", SIF),
  path("M10.2 10.4Q12 9.6 13.6 10.6Q14.2 13 13.4 15.6Q12 16.2 10.6 15.6Q9.8 13 10.2 10.4Z", SIF_SHADE, false),
  // tête : calotte brune, visage noir nu, yeux jaunes
  circle(11.6, 4.6, 3, SIF),
  path("M8.8 3.6Q9.6 1.4 11.6 1.6Q13.8 1.6 14.4 3.8Q12.2 2.8 8.8 3.6Z", SIF_CAP, { w: 0.8 }),
  path("M9.2 4.4Q11.4 3.6 12.8 4.8Q12.8 7.4 10.6 7.4Q8.6 7 9.2 4.4Z", C.noir, { w: 0.8 }),
  circle(10.4, 5.2, 0.6, C.jaune, false), eye(10.4, 5.2, 0.3),
  dots([[4, 4.6], [19.6, 5], [3.8, 21.4], [13.8, 22]], 0.6, C.noir),
].join(""));

/* ---------- bongo : robe rousse, rayures blanches, cornes en spirale ---------- */
const BON = "#B4502A", BON_DARK = "#8A3A1C", BON_HORN = "#6E5A44";
const bongo = [
  leg(16.8, 14.4, 21.4, 1.6, BON_DARK, C.noir), leg(9.8, 14.4, 21.4, 1.6, BON_DARK, C.noir),
  thick("M20.6 11.4Q21.8 12.8 21.6 15.4", BON, 0.6),
  path("M8 10.8Q12 8.8 17.2 9.4Q21.2 9.8 21 12.8Q20.8 15.8 17.8 15.8H10.4Q7.6 15.4 7.4 13Z", BON),
  line("M11.6 9.8V15.2M14 9.4V15.4M16.4 9.6V15.4M18.8 10V15.2", C.white, 0.75),
  path("M8.4 10.6L12 8.8L15.6 9L16 9.6Q12 9.4 8.6 11.4Z", BON_DARK, false),
  leg(18.6, 14.8, 21.8, 1.6, BON, C.noir), leg(11.6, 14.8, 21.8, 1.6, BON, C.noir),
  rect(18.6, 17.6, 1.6, 1, 0.3, C.white, { w: 0.6 }), rect(11.6, 17.6, 1.6, 1, 0.3, C.white, { w: 0.6 }),
  // cou et tête, chevron blanc, grandes oreilles
  path("M10 11.2Q8.6 8.6 6.8 7.6L4.6 9Q6.2 11 7.4 13.6Z", BON),
  path("M7.2 7.6Q6 5.6 4 6.6L1.6 9.2Q1.2 10.4 2.4 10.8Q3.8 11 5.2 9.8Z", BON),
  path("M2.2 9.4Q3 10 4.6 9.4", "none", { c: C.white, w: 0.8 }),
  path("M7.4 11.4L9 10.6L8.6 12.2Z", C.white, { w: 0.5 }),
  // cornes torsadées, pointes ivoire
  thick("M5.8 6.4Q7.4 5.8 7 4.6Q6.8 3.4 8.2 3Q9.6 2.6 9.6 1.9", BON_HORN, 0.6),
  thick("M9.4 2.4L9.6 1.9", C.cream, 0.6),
  path("M6.8 7L9.4 6.4L8 8.4Z", BON, { w: 0.8 }),
  eye(4.6, 7.8, 0.5),
].join("");

/* ---------- sitatunga : antilope des marais, pelage hirsute, dans l'eau ---------- */
const SIT = "#7C6048", SIT_DARK = "#5E4634", SIT_HORN = "#5A4A3A";
const sitatunga = [
  leg(16.6, 14.2, 19.4, 1.5, SIT_DARK), leg(9.8, 14.2, 19.4, 1.5, SIT_DARK),
  thick("M20.4 11.2Q21.6 12.6 21.4 14.8", SIT, 0.6),
  path("M8 10.6Q12 8.6 17 9.2Q21 9.6 20.8 12.6Q20.6 15.4 17.6 15.4H10.4Q7.6 15 7.4 12.8Z", SIT),
  line("M11 15.6L10.8 16.4M13.6 15.6L13.6 16.4M16.2 15.6L16.4 16.4", O, 0.7),
  dots([[12, 12], [15.4, 12.2]], 0.5, "#EDE3D0"),
  leg(18.4, 14.6, 19.8, 1.5, SIT), leg(11.6, 14.6, 19.8, 1.5, SIT),
  path("M10 11Q8.6 8.4 6.8 7.4L4.6 8.8Q6.2 10.8 7.4 13.4Z", SIT),
  path("M7.2 7.4Q6 5.4 4 6.4L1.6 9Q1.2 10.2 2.4 10.6Q3.8 10.8 5.2 9.6Z", SIT),
  path("M4.4 6.8L5.6 7.6", "none", { c: C.white, w: 0.8 }),
  thick("M5.8 6.2Q7.2 5.4 6.8 4.2Q6.6 3 8 2.6Q9.2 2.4 9.4 1.8", SIT_HORN, 0.55),
  thick("M9.1 2.3L9.4 1.8", C.cream, 0.55),
  path("M6.8 6.8L9.2 6.4L7.8 8.2Z", SIT, { w: 0.8 }),
  eye(4.6, 7.6, 0.5),
  // eau du marais, roseaux
  path("M1.4 19.2Q3.2 18.2 5 19.2T9 19.2T13 19.2T17 19.2T21 19.2Q21.8 18.8 22.6 19.2V22.4H1.4Z", C.eau),
  line("M3 21Q5 20.2 7 21M12.4 21.2Q14.4 20.4 16.4 21.2", C.white, 0.7),
  thick("M21.2 18.8L20.8 13.6M22 18.8L22.2 15", C.feuille, 0.5),
].join("");

/* ---------- potamochère roux : robe orange, oreilles à pinceaux blancs ---------- */
const POT = "#C8572C", POT_DARK = "#2B211C", POT_FACE = "#3A2E28";
const potamochere = [
  leg(16.8, 14, 21.4, 1.6, POT_DARK), leg(10.8, 14, 21.4, 1.6, POT_DARK),
  thick("M20.8 10.8Q22.2 12 21.8 14.4", POT, 0.5),
  path("M21.8 13.8L22.4 15.6L21.2 15.2Z", POT_DARK, { w: 0.6 }),
  path("M8.2 9.8Q12.6 7.4 17.8 8.2Q21.6 8.8 21.2 12.4Q20.8 15.4 18 15.4H10.6Q7.8 15 7.8 12.4Z", POT),
  // crête dorsale blanche
  path("M9.4 9Q13.6 7 18.4 8.2Q13.6 8 9.6 9.8Z", C.white, { w: 0.7 }),
  leg(18.8, 14.4, 21.8, 1.6, POT_DARK), leg(9, 14.2, 21.8, 1.6, POT_DARK),
  // tête : masque noir et blanc, groin
  path("M10.2 9.4Q7.6 8.6 5.6 9.6Q4.2 10.8 3.4 12.6L1.6 14.6Q1.4 16.6 3 16.6Q7.4 16.4 10.4 13.8Z", POT_FACE),
  path("M9.6 10.2Q7.4 10 6 10.8Q7.6 11.4 9.4 11.4Z", C.white, { w: 0.6 }),
  path("M4.8 14.6Q6.8 14.4 8.2 13.4Q7.4 15.4 5 15.6Z", C.white, { w: 0.6 }),
  ellipse(1.9, 15.6, 0.8, 1.1, "#5A4840", { w: 0.8 }),
  // oreille pointue à long pinceau blanc
  path("M8.6 9.4Q9.2 6.4 11.4 4.8Q11.8 7.6 10.6 9.8Z", POT),
  path("M10.8 5.4Q11.6 3.2 13.4 2.6Q13.2 4.6 11.4 6.2Z", C.white, { w: 0.7 }),
  circle(6.8, 11.4, 0.6, C.white, false), eye(6.7, 11.4, 0.42),
].join("");

/* ---------- hylochère : très grand porc noir hirsute ---------- */
const HYL = "#2E2621", HYL_HAIR = "#4A3E36", HYL_SKIN = "#5E534C";
const hylochere = [
  leg(16.8, 14.6, 21.4, 2, "#1E1916"), leg(10.6, 14.6, 21.4, 2, "#1E1916"),
  thick("M21 11Q22.4 12.4 22 14.6", HYL, 0.5),
  path("M7.8 8.6Q12.2 5.2 17.8 6.6Q21.8 7.8 21.4 12.4Q21 15.8 18 16.2H10.4Q7.6 15.8 7.4 12.6Z", HYL),
  // longs poils raides
  line("M10.4 8.2L9.8 6.4M12.6 7L12.4 5.2M15 6.6L15.4 4.8M17.6 7L18.4 5.4M19.8 8.2L20.8 7.2", HYL, 1.2),
  line("M11 11.6L10.6 13.8M13.6 10.4L13.4 13.2M16.2 10.6L16.4 13.4M18.6 11.4L19 13.6", HYL_HAIR, 0.7),
  path("M10.4 16.2L11 17.2L11.8 16.2L12.6 17.2L13.4 16.2L14.2 17.2L15 16.2L15.8 17.2L16.6 16.2Z", HYL, { w: 0.7 }),
  leg(18.8, 15.2, 21.8, 2, HYL), leg(8.8, 15.2, 21.8, 2, HYL),
  // grosse tête, joues renflées, groin large, petites défenses
  path("M10.4 8.6Q7.4 7.4 5.4 8.8Q3.8 10.2 3 12.2L1.4 14.4Q1.2 16.6 3 16.6Q7.6 16.8 10.8 13.6Z", HYL),
  ellipse(6.6, 13.2, 2, 1.5, HYL_SKIN, { w: 0.8 }),
  ellipse(1.8, 15.4, 0.8, 1.2, HYL_SKIN, { w: 0.8 }),
  path("M3.8 15.4Q2.8 13.8 3.4 12.6Q4 14 4.8 14.6Z", C.cream, { w: 0.6 }),
  path("M8.8 8.6L9.6 5.6L11.2 8.6Z", HYL, { w: 0.9 }),
  circle(6.6, 10.6, 0.55, "#C9A88A", false), eye(6.6, 10.6, 0.38),
].join("");

/* ---------- chat doré africain : assis, robe dorée, taches discrètes ---------- */
const CAT = "#C98A3A", CAT_DARK = "#A46C26", CAT_LIGHT = "#F3E2C0";
const chatDore = [
  // queue enroulée au sol
  thick("M16.6 21.4Q21.6 21.8 21.8 17.6", CAT, 1.4),
  circle(21.8, 17.4, 0.75, CAT_DARK, false),
  // corps assis
  path("M9.6 10Q14.4 10.6 16.6 15.4Q18 19.4 16.6 21.8H6.4L6.8 17.4Q6 14.2 6.6 11.4Z", CAT),
  path("M7.4 12.6Q9.2 13.4 9.2 16.4L9 21.8H6.6L6.9 17.4Q6.4 14.6 7.4 12.6Z", "#E0A85C", false),
  line("M9.4 16.6V21.6", O, 0.8),
  dots([[12.6, 15], [14.2, 17.4], [12.2, 18.6], [15, 14.4], [8, 19.4]], 0.5, CAT_DARK),
  rect(6.2, 20.8, 3.2, 1.2, 0.5, CAT_LIGHT, { w: 0.8 }),
  // tête de face : oreilles arrondies, front strié
  path("M4.6 5.6L4.6 2.4L7.4 3.8Z", CAT_DARK, { w: 0.9 }), path("M13 5.6L13 2.4L10.2 3.8Z", CAT_DARK, { w: 0.9 }),
  path("M8.8 3.4Q13.6 3.4 13.6 7.6Q13.6 11.8 8.8 11.8Q4 11.8 4 7.6Q4 3.4 8.8 3.4Z", CAT),
  path("M7.4 9.8Q8.8 9 10.2 9.8Q10.4 11.2 8.8 11.2Q7.2 11.2 7.4 9.8Z", CAT_LIGHT, false),
  line("M8.2 4.2V5.6M9.4 4.2V5.6", CAT_DARK, 0.6),
  path("M8.2 9.2H9.4L8.8 9.9Z", "#C9706A", { w: 0.5 }),
  circle(7, 7.6, 0.75, "#B5C24A", { w: 0.5 }), circle(10.6, 7.6, 0.75, "#B5C24A", { w: 0.5 }),
  eye(7, 7.6, 0.35), eye(10.6, 7.6, 0.35),
].join("");

/* ---------- genette commune : taches en lignes, queue annelée ---------- */
const GEN = "#DCCFB2", GEN_DARK = "#2B211C";
const genette = [
  leg(15.2, 14.6, 20.4, 1.4, "#BFB094"), leg(8.6, 14.6, 20.4, 1.4, "#BFB094"),
  // longue queue annelée
  path("M16.4 14.2Q20.6 13.4 21.6 17Q22.2 19.6 21.4 22.2Q20 22 19.8 19.4Q19.6 16.4 16.6 16.6Z", GEN),
  path("M18.4 13.9L18.9 16.5L20.2 16.6L20.4 14.4ZM21.4 17.4L19.8 17.8L19.8 19.4L21.8 19.2ZM21.8 20.6L19.9 20.6L20.4 21.6L21.4 22.2Z", GEN_DARK, false),
  path("M16.4 14.2Q20.6 13.4 21.6 17Q22.2 19.6 21.4 22.2Q20 22 19.8 19.4Q19.6 16.4 16.6 16.6Z", "none"),
  path("M6.2 12Q10.4 10.8 15.2 11.2Q18.2 11.6 17.8 14.2Q17.4 16.4 15 16.4H8.4Q5.8 16 5.6 14Z", GEN),
  line("M7.4 11.6Q11.6 10.8 16.6 11.6", GEN_DARK, 0.8),
  dots([[8.6, 13.2], [10.6, 12.8], [12.6, 12.8], [14.6, 13], [16.4, 13.4], [9.6, 14.8], [11.6, 14.6], [13.6, 14.6], [15.6, 14.8]], 0.5, GEN_DARK),
  leg(16.6, 15, 21, 1.4, GEN, GEN_DARK), leg(10, 15, 21, 1.4, GEN, GEN_DARK),
  // tête pointue, grandes oreilles, masque
  path("M4.8 9.6L5.2 6.4L7.6 8.8Z", GEN, { w: 0.9 }),
  path("M8 12Q8 9 5.4 9.2Q3.8 9.4 3.2 10.8L1.4 12.6Q1 13.6 1.8 14Q4.4 14.6 6.4 14Q8 13.4 8 12Z", GEN),
  path("M3.6 11.2Q5 10.6 6 11.6Q5.2 12.6 3.8 12.4Z", "#7A6A58", false),
  ellipse(1.6, 12.8, 0.4, 0.32, O, false),
  circle(4.8, 11.6, 0.6, C.white, false), eye(4.8, 11.6, 0.38),
].join("");

/* ---------- civette africaine : masque noir, bandes, crête dorsale ---------- */
const CIV = "#B3AA98", CIV_DARK = "#26201C";
const civette = [
  leg(15.6, 14.6, 21.4, 1.7, CIV_DARK), leg(9, 14.6, 21.4, 1.7, CIV_DARK),
  // queue épaisse annelée
  path("M17.4 13Q21.6 12.6 22.4 17Q22.6 19.4 21.6 21Q20.2 20 20.2 17.6Q20 15.4 17.4 15.6Z", CIV),
  path("M19.8 12.9L19.6 15.8L21 16.6L21.8 14.4ZM22.4 18.2L20.2 18.4L20.6 19.8L22 20Z", CIV_DARK, false),
  path("M17.4 13Q21.6 12.6 22.4 17Q22.6 19.4 21.6 21Q20.2 20 20.2 17.6Q20 15.4 17.4 15.6Z", "none"),
  // dos voûté, crête de poils noirs
  path("M6.2 11.4Q9.2 7.6 14 8.2Q18.6 9 18.6 13Q18.4 16.6 15.4 16.6H8.6Q5.8 16.2 5.8 13.8Z", CIV),
  path("M8.4 9Q12.4 6 18 9.4L17.4 7.6L16.2 8.4L15.8 6.6L14.4 7.8L13.6 6L12.4 7.6L11.4 6.2L10.6 8L9.4 7.2Z", CIV_DARK, { w: 0.6 }),
  dots([[12.4, 11.4], [14.4, 11], [16.4, 11.8], [13.4, 13.4], [15.6, 13.6], [11.6, 14.6], [17.2, 14.6]], 0.6, CIV_DARK),
  path("M8 10.8Q10.2 12.6 10 16.6H8.6Q8.6 13.6 7 12Z", CIV_DARK, { w: 0.6 }),
  leg(17, 15, 21.8, 1.7, CIV_DARK), leg(10.4, 15, 21.8, 1.7, CIV_DARK),
  // tête : museau pointu, masque noir, gorge noire
  path("M8.4 11.4Q7.4 9 5 9.4Q3.4 9.8 2.8 11.4L1.4 13.4Q1.2 14.6 2.2 14.8Q4.8 15.2 6.8 14.4Q8.6 13.6 8.4 11.4Z", "#DCD6CA"),
  path("M3.6 11Q5.2 10.2 7.2 11.4Q7.8 13.4 6.4 14.6Q4.4 14.2 3.2 12.4Z", CIV_DARK, false), ellipse(1.7, 13.6, 0.5, 0.4, O, false),
  path("M6 9.6Q6.2 7.8 7.6 7.8Q8 9.2 7.4 10.2Z", CIV_DARK, { w: 0.7 }),
  circle(5, 11.6, 0.55, C.ocreLight, false), eye(5, 11.6, 0.3),
].join("");

/* ---------- galago : immenses yeux, grandes oreilles, accroché à une branche ---------- */
const GAL = "#A48C72", GAL_LIGHT = "#D8C8B2", GAL_EAR = "#E0B8A8";
const galago = g("translate(12.35 12) scale(0.91) translate(-12.35 -12)", [
  thick("M18.6 2.2V21.8", C.bois, 2),
  // longue queue touffue
  path("M13.4 16.4Q11.2 18.8 11.6 22.6H14.2Q13.8 19.6 15.4 17.4Z", GAL),
  // corps accroché
  path("M9.4 10.4Q13.4 9.8 15.6 12.8Q17 15.6 16.4 18.2Q14 18.6 12.2 16.8Q9.6 14.4 9.4 10.4Z", GAL),
  path("M10.8 11.8Q12.6 12.6 13.4 15Q12 15.4 11.2 14.2Z", GAL_LIGHT, false),
  path("M14 12.6L18.2 11.2Q18.8 11.6 18.4 12.4L15 13.8ZM15.8 17L18.2 17.6Q18.6 18.4 18 18.8L15.4 18.4Z", GAL, { w: 0.8 }),
  // grandes oreilles
  path("M12.4 4.6Q12 1.4 14.6 1.4Q16.6 1.8 16 4.6Q15.4 6.6 13.4 6.6Z", GAL_EAR),
  path("M5.4 5Q4.2 2.2 6.4 1.6Q8.2 1.6 8.4 4.2Z", GAL_EAR),
  // tête ronde
  path("M9.6 3.4Q14.6 3.4 14.6 8Q14.6 12.4 9.6 12.4Q4.6 12.4 4.6 8Q4.6 3.4 9.6 3.4Z", GAL),
  path("M9.6 6Q10.4 8 10.2 10Q9.6 11 9 10Q8.8 8 9.6 6Z", GAL_LIGHT, false),
  circle(7.2, 7.8, 2, "#C8782A", { w: 0.8 }), circle(12, 7.8, 2, "#C8782A", { w: 0.8 }),
  eye(7.2, 7.8, 1.05), eye(12, 7.8, 1.05),
  circle(6.7, 7.3, 0.4, C.white, false), circle(11.5, 7.3, 0.4, C.white, false),
  ellipse(9.6, 10.6, 0.5, 0.35, O, false),
].join(""));

/* ---------- tenrec rayé : piquants noirs et jaunes, long museau ---------- */
const TEN = "#262019", TEN_Y = "#F0C43C";
const tenrec = [
  leg(16.4, 15.6, 19.6, 1.4, TEN), leg(9.6, 15.6, 19.6, 1.4, TEN),
  // dos hérissé
  path("M21.4 16.6Q22 13 19.8 11.4L20.4 9.4L18.6 10L18.6 7.8L17 9L16.6 6.6L15.2 8.4L14.2 6.2L13 8.2L11.6 6.4L10.8 8.6L9.2 7.4L8.8 9.6L7.2 9.2L7.4 11Q6 11.8 5 13.2L2 15.2Q1.4 16 2.2 16.6L5.6 17.2Q12.6 18.2 21.4 16.6Z", TEN),
  // rayures jaunes
  path("M8.4 11.6Q13.6 8.6 19.4 11.8", "none", { c: TEN_Y, w: 0.9 }),
  path("M7.4 13.8Q13.4 11.2 20.6 14", "none", { c: TEN_Y, w: 0.9 }),
  path("M12 8.6L12.4 10.4M15.4 8.4L15.4 10.2", "none", { c: TEN_Y, w: 0.7 }),
  leg(18, 16, 20, 1.4, TEN), leg(11.2, 16.2, 20, 1.4, TEN),
  // museau pointu jaune
  path("M7.6 12.4Q4.6 13 2 15.2Q1.4 16 2.2 16.6L5.6 17.2Q7.6 16.4 8 14.4Z", TEN_Y, { w: 0.9 }),
  ellipse(1.6, 15.8, 0.4, 0.35, O, false),
  eye(5.8, 14, 0.5),
].join("");

/* ---------- tortue radiée : dôme noir à étoiles jaunes ---------- */
const TR_SHELL = "#2A231D", TR_STAR = "#F2C94C", TR_SKIN = "#D8B24A";
const star = (x, y, r) => line(`M${x} ${y - r}V${y + r}M${x - r * 0.87} ${y - r / 2}L${x + r * 0.87} ${y + r / 2}M${x - r * 0.87} ${y + r / 2}L${x + r * 0.87} ${y - r / 2}`, TR_STAR, 0.7);
const tortueRadiee = [
  rect(6.4, 15.6, 2.8, 4.6, 1.2, TR_SKIN), rect(16, 15.6, 2.8, 4.6, 1.2, TR_SKIN),
  path("M20.6 16.4L22.4 17.6L20.8 18Z", TR_SKIN, { w: 0.8 }),
  // tête et cou
  path("M7 15.6Q5 13.4 3.4 13.6Q1.4 13.8 1.4 15.6Q1.6 17.4 3.6 17.4Q5.4 17.2 7.4 18Z", TR_SKIN),
  eye(3.2, 15, 0.5), line("M1.6 16.2Q2.4 16.6 3.2 16.4", O, 0.6),
  // dôme haut
  path("M4.8 17.6Q4.4 9.6 9.4 6.2Q12.6 4.6 15.8 6.2Q20.8 9.6 20.6 17.6Z", TR_SHELL),
  path("M4.8 17.6H20.6Q20.6 18.8 19.4 18.8H6Q4.8 18.8 4.8 17.6Z", TR_SKIN, { w: 0.9 }),
  line("M9.6 8.4Q12.6 6.8 15.6 8.4M7 12.6Q12.6 10.4 18.4 12.6M5.6 16.4Q12.6 14.8 19.8 16.4", "#4A4036", 0.6),
  star(12.6, 10.4, 1.7), star(8.6, 13.6, 1.4), star(16.6, 13.6, 1.4), star(12.6, 15.6, 1.1),
  star(7.6, 9.8, 0.9), star(17.6, 9.8, 0.9),
].join("");

/* ---------- grenouille Goliath : vue de dessus, vert olive tacheté ---------- */
const GOL = "#6B7A3A", GOL_DARK = "#4C5828";
const grenouille = [
  // pattes arrière repliées, pattes avant
  path("M7.4 14.6Q2.4 13.6 1.8 17.6Q1.8 20.2 4.6 20.6L8.6 21.2L5.8 22.4L9.8 22.6Q10.4 21.2 8.8 19.8L5.6 18.6Q5.6 16.6 8 16.6Z", GOL),
  path("M16.6 14.6Q21.6 13.6 22.2 17.6Q22.2 20.2 19.4 20.6L15.4 21.2L18.2 22.4L14.2 22.6Q13.6 21.2 15.2 19.8L18.4 18.6Q18.4 16.6 16 16.6Z", GOL),
  path("M7.6 9.8L4.4 11.2L2.6 9.4M4.4 11.2L3 12.6", "none", { c: O, w: 2.6 }), path("M7.6 9.8L4.4 11.2L2.6 9.4M4.4 11.2L3 12.6", "none", { c: GOL, w: 1.2 }),
  path("M16.4 9.8L19.6 11.2L21.4 9.4M19.6 11.2L21 12.6", "none", { c: O, w: 2.6 }), path("M16.4 9.8L19.6 11.2L21.4 9.4M19.6 11.2L21 12.6", "none", { c: GOL, w: 1.2 }),
  // corps et tête
  path("M12 3.6Q16.8 3.6 17.2 8.4Q18.2 11.4 17.6 14.6Q16.8 19.6 12 19.6Q7.2 19.6 6.4 14.6Q5.8 11.4 6.8 8.4Q7.2 3.6 12 3.6Z", GOL),
  dots([[10, 11.6], [14.2, 12], [12, 14.6], [9.4, 16.2], [14.8, 16.4], [12.2, 9.8]], 0.75, GOL_DARK),
  line("M7.4 9.4Q12 8 16.6 9.4", GOL_DARK, 0.7),
  // yeux saillants
  circle(9.2, 5.6, 1.7, GOL), circle(14.8, 5.6, 1.7, GOL),
  circle(9.2, 5.5, 1, "#D9A63A", { w: 0.5 }), circle(14.8, 5.5, 1, "#D9A63A", { w: 0.5 }),
  ellipse(9.2, 5.5, 0.8, 0.4, O, false), ellipse(14.8, 5.5, 0.8, 0.4, O, false),
].join("");

/* ---------- céphalophe roux : petite antilope de forêt, dos voûté ---------- */
const CEP = "#B4502A", CEP_DARK = "#8A3A1C";
const cephalophe = [
  thick("M17.8 15.4L18.4 21.6M10.4 15.4L9.8 21.6", CEP_DARK, 0.7),
  // dos voûté, croupe haute
  path("M8 11.4Q12.2 8.4 17.6 9.4Q21 10.4 20.4 13.6Q19.8 16 17.4 16H10.4Q7.8 15.6 7.6 13.4Z", CEP),
  path("M8.4 10.8Q12.6 8 17.6 9.4Q13 9.2 8.8 11.6Z", "#2B211C", false),
  path("M20.2 11.2L21.4 10.6L21 12Z", C.white, { w: 0.6 }),
  thick("M19.4 15.4L20.2 22M11.6 15.6L11.2 22", CEP, 0.8),
  line("M10.4 22H12M19.6 22H21.2", O, 0.9),
  // tête basse, toupet entre deux petites cornes droites
  path("M10 12.4Q8.6 10 7 9.4L5 10.8Q6.6 12.6 7.8 14.6Z", CEP),
  thick("M5.4 8.8L8 6.8M6.4 9L9.2 7.4", "#4A3A2E", 0.5),
  path("M7.8 9.6Q6.4 7.8 4.4 8.4L1.8 10.8Q1.2 12 2.4 12.6Q4.4 13.2 6.6 12Q8 11.2 7.8 9.6Z", CEP),
  path("M1.8 10.8Q1.2 12 2.4 12.6Q3.4 12.8 4 12.2Q2.6 11.6 1.8 10.8Z", "#2B211C", { w: 0.6 }),
  ellipse(6.2, 8.4, 0.9, 0.6, "#2B211C", false),
  path("M7.2 9.2Q8.8 7.6 10.4 8.2Q9.6 9.8 7.8 10.2Z", CEP, { w: 0.8 }),
  eye(4.4, 9.8, 0.45),
  line("M3.4 9.6L4.4 10.6", "#2B211C", 0.6),
].join("");

const A = (slug, fr, en, char, tags, body) => ({ slug, fr, en, char, group: "animaux", tags, tone: false, body });
export default [
  A("chimpanze", "Chimpanzé", "Chimpanzee", null, ["chimpanzé", "chimpanzee", "chimp", "sokwe", "grand singe", "great ape", "forêt", "forest", "gombe", "tanzanie", "guinée", "côte d'ivoire"], chimpanze),
  A("bonobo", "Bonobo", "Bonobo", null, ["bonobo", "chimpanzé pygmée", "pygmy chimpanzee", "grand singe", "great ape", "forêt", "forest", "rd congo", "drc", "lomami"], bonobo),
  A("babouin", "Babouin olive", "Olive baboon", null, ["babouin", "baboon", "olive baboon", "nyani", "singe", "monkey", "savane", "kenya", "éthiopie", "ouganda"], babouin),
  A("mandrill", "Mandrill", "Mandrill", null, ["mandrill", "singe", "monkey", "nez rouge", "red nose", "forêt", "forest", "gabon", "cameroun", "congo", "lopé"], mandrill),
  A("maki-catta", "Maki catta", "Ring-tailed lemur", null, ["maki catta", "ring-tailed lemur", "lémurien", "lemur", "maky", "hira", "madagascar", "queue annelée", "ringed tail", "isalo"], makiCatta),
  A("aye-aye", "Aye-aye", "Aye-aye", null, ["aye-aye", "ahay", "lémurien", "lemur", "madagascar", "nocturne", "nocturnal", "long doigt", "long finger"], ayeAye),
  A("fossa", "Fossa", "Fossa", null, ["fossa", "fosa", "cryptoprocte", "carnivore", "madagascar", "forêt", "forest", "prédateur", "predator"], fossa),
  A("propitheque", "Propithèque", "Sifaka", null, ["propithèque", "sifaka", "simpona", "sifaka de verreaux", "lémurien", "lemur", "madagascar", "danse", "dancing", "berenty"], propitheque),
  A("bongo", "Bongo", "Bongo", null, ["bongo", "antilope", "antelope", "bongo antelope", "rayures", "stripes", "forêt", "forest", "kenya", "aberdare", "congo", "gabon"], bongo),
  A("sitatunga", "Sitatunga", "Sitatunga", null, ["sitatunga", "nzohe", "antilope des marais", "marsh antelope", "marais", "swamp", "papyrus", "ouganda", "zambie", "bangweulu", "okavango"], sitatunga),
  A("potamochere", "Potamochère roux", "Red river hog", null, ["potamochère", "red river hog", "bushpig", "sanglier", "pig", "forêt", "forest", "cameroun", "gabon", "congo"], potamochere),
  A("hylochere", "Hylochère", "Giant forest hog", null, ["hylochère", "giant forest hog", "nguruwe msitu", "sanglier géant", "pig", "forêt", "forest", "kenya", "ouganda", "congo"], hylochere),
  A("chat-dore", "Chat doré africain", "African golden cat", null, ["chat doré", "golden cat", "african golden cat", "félin", "wild cat", "forêt", "forest", "gabon", "cameroun", "congo", "ouganda"], chatDore),
  A("genette", "Genette commune", "Common genet", null, ["genette", "genet", "common genet", "kanu", "taches", "spots", "queue annelée", "ringed tail", "savane", "forêt", "sénégal", "kenya"], genette),
  A("civette", "Civette africaine", "African civet", null, ["civette", "civet", "african civet", "fungo", "ngawa", "masque", "mask", "forêt", "savane", "nigeria", "éthiopie"], civette),
  A("galago", "Galago", "Bushbaby", null, ["galago", "bushbaby", "komba", "grands yeux", "big eyes", "nocturne", "nocturnal", "forêt", "savane", "kenya", "afrique du sud"], galago),
  A("tenrec", "Tenrec", "Tenrec", null, ["tenrec", "tandraka", "sora", "tenrec rayé", "streaked tenrec", "piquants", "spines", "madagascar", "forêt", "forest"], tenrec),
  A("tortue-radiee", "Tortue radiée", "Radiated tortoise", "🐢", ["tortue radiée", "radiated tortoise", "sokake", "tortue", "tortoise", "étoiles", "star pattern", "madagascar", "épineux", "spiny forest"], tortueRadiee),
  A("grenouille-goliath", "Grenouille Goliath", "Goliath frog", "🐸", ["grenouille goliath", "goliath frog", "grenouille", "frog", "plus grande grenouille", "largest frog", "cameroun", "cameroon", "guinée équatoriale", "rivière", "river"], grenouille),
  A("cephalophe", "Céphalophe", "Duiker", null, ["céphalophe", "duiker", "red forest duiker", "funo", "nsya", "antilope", "antelope", "forêt", "forest", "tanzanie", "congo", "côte d'ivoire"], cephalophe),
];
