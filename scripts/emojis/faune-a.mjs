// Emojis faune d'Afrique (lot A) : mammifères de la savane — félins, chiens sauvages, antilopes et petits fouisseurs.
// Animaux vus de profil, tête à gauche, couleur à plat et contour brun foncé, dans l'esprit de l'impala et de l'hyène.
import { O, W, C, path, circle, ellipse, rect, line, g } from "./lib.mjs";

/** Trait épais « plein » : contour brun puis couleur par-dessus (cous, queues, pattes fines, cornes). */
const thick = (d, col, w = 1.5) => line(d, O, w + 2 * W) + line(d, col, w);
const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const eye = (x, y, r = 0.55) => circle(x, y, r, O, false);
/** Patte droite arrondie, avec pied plus sombre. */
const leg = (x, top, bottom, w, fill, foot) => rect(x, top, w, bottom - top, w / 2.2, fill) + (foot ? rect(x, bottom - 1.2, w, 1.2, 0.4, foot, { w: 0.8 }) : "");
/** Oreille ovale inclinée, intérieur plus clair. */
const ear = (x, y, rx, ry, a, col, inner) => g(`rotate(${a} ${x} ${y})`, ellipse(x, y, rx, ry, col, { w: 0.85 }), inner ? ellipse(x, y + ry * 0.12, rx * 0.5, ry * 0.62, inner, false) : "");

/* Silhouette commune des antilopes (corps, cou, tête fine), reprise de l'impala. */
const anteBody = (col) => path("M8.4 10.8Q11.4 8.6 16.8 9Q21 9.4 21 12.4Q20.8 15.2 17.8 15.2H10.6Q8 14.8 7.8 12.8Z", col);
const anteNeck = (col) => path("M10.4 11Q9 8.6 7.4 7L4.8 8.4Q6.6 10.4 7.8 13.2Z", col);
const anteHead = (col) => path("M7.6 7.8Q6.4 5.4 4.2 6.4L1.6 9Q1.2 10.2 2.4 10.6Q4 10.8 5.4 9.6Z", col);
const farLegs = (col, w = 0.6) => thick("M17.6 14.6L17.8 21.8M10.4 14.4L10.2 21.8", col, w);
const nearLegs = (col, w = 0.7) => thick("M19.4 14.8L19.8 22M9.2 14.6L8.4 22", col, w);
const hooves = line("M7.6 22H9.2M19 22H20.6", O, 0.9);

/* ---------- guépard ---------- */
const CHE = "#E3AE55", CHE_LIGHT = "#F6E2B4";
const guepard = [
  leg(16.8, 14.2, 21.4, 1.5, "#C8923F"), leg(9.6, 14, 21.4, 1.5, "#C8923F"),
  // longue queue annelée à bout blanc
  thick("M20.4 11.8Q22.2 13.8 21.6 18Q21.2 20.4 21.8 21.2", CHE, 1),
  line("M21.9 15.4L21 15.6M21.7 17.6L20.7 17.6", O, 0.7),
  // corps svelte, ventre rentré
  path("M8 10.2Q12.8 9 17.6 9.6Q21.2 10.2 21 12.8Q20.8 15 18 15.2Q14 14.2 10.2 15.4Q7.4 15 7.2 12.6Z", CHE),
  path("M10.4 15.2Q14 14 17.8 15Q15.6 13.6 13.6 13.8Q11.6 14 10.4 15.2Z", CHE_LIGHT, false),
  dots([[10.2, 11.4], [12.4, 10.8], [14.6, 11], [16.8, 10.8], [19, 11.6], [11.4, 13.2], [13.6, 12.6], [15.8, 12.8], [18, 13.4], [20, 13.4]], 0.48, O),
  leg(18.8, 14.4, 21.8, 1.5, CHE), leg(11.4, 14.6, 21.8, 1.5, CHE),
  dots([[19.5, 17.4], [12.1, 17.8], [19.6, 19.6]], 0.36, O),
  // petite tête ronde, larmes noires de l'œil à la bouche
  circle(4.4, 5.6, 1.1, CHE, { w: 0.85 }), circle(8, 5.4, 1.1, CHE, { w: 0.85 }),
  circle(6.2, 8.4, 3.4, CHE),
  ellipse(5.6, 10.6, 1.4, 1.1, CHE_LIGHT, { w: 0.6 }),
  path("M4.9 9.6H6.3L5.6 10.3Z", O, { w: 0.5 }),
  line("M4.4 8.2Q3.6 9.6 4.2 11.4M7.6 8.2Q8 9.8 7.2 11.4", O, 1),
  eye(4.4, 7.6, 0.55), eye(7.6, 7.6, 0.55),
  dots([[6, 5.6], [5, 6.2], [7.2, 6.2]], 0.32, O),
].join("");

/* ---------- lycaon (chien sauvage) ---------- */
const LY_DARK = "#3A2A1E", LY_TAN = "#C9963E", LY_CREAM = "#EDE3CF";
const lycaon = [
  leg(16.8, 13.6, 21.4, 1.6, LY_DARK), leg(9.8, 13.4, 21.4, 1.6, LY_TAN),
  // queue touffue à bout blanc
  thick("M20.4 11.8Q22 13.4 21.8 17.4", LY_DARK, 1.3),
  path("M21 16.6Q22.4 16.6 22.4 18.4Q22.4 20.4 21.4 21Q20.4 19.4 21 16.6Z", LY_CREAM, { w: 0.85 }),
  path("M8 10.4Q12.6 9 17.8 9.6Q21.2 10.2 21 13Q20.8 15.4 18 15.4H10.4Q7.4 15 7.2 12.6Z", LY_TAN),
  // pelage « peint » : taches sombres et crème
  path("M11 9.8Q13 10.6 14.4 9.6Q15.4 11.8 13.2 12.4Q11.2 12.8 10.2 11.4Z", LY_DARK, false),
  path("M16.2 10.2Q18.6 9.8 20.2 11.4Q19.6 13.2 17.6 12.6Q16.4 12 16.2 10.2Z", LY_DARK, false),
  path("M14.6 13Q16.4 12.6 17.6 14Q16.8 15.4 14.8 15.2Q13.8 14.2 14.6 13Z", LY_CREAM, false),
  path("M8.6 13.2Q10 12.8 11.6 13.8Q11 15.2 9.4 15Q8.2 14.4 8.6 13.2Z", LY_DARK, false),
  path("M8 10.4Q12.6 9 17.8 9.6Q21.2 10.2 21 13Q20.8 15.4 18 15.4H10.4Q7.4 15 7.2 12.6Z", "none"),
  leg(18.8, 14, 21.8, 1.6, LY_CREAM), leg(11.6, 14, 21.8, 1.6, LY_DARK),
  // tête au museau noir, grandes oreilles rondes
  ear(5.4, 4.2, 1.7, 2.4, -12, LY_DARK, "#6B5444"), ear(8.6, 4.4, 1.7, 2.4, 14, LY_DARK, "#6B5444"),
  path("M9.8 8.6Q9 5.6 6.6 5.8Q4.6 6 3.8 7.8L1.6 9.6Q1 10.8 2.2 11.2L4.4 11.6Q7.6 12 9.6 10.6Z", LY_TAN),
  path("M1.6 9.6Q1 10.8 2.2 11.2L4.4 11.6Q5.4 11 4.8 9.6Q4.6 8.2 3.8 7.8Z", LY_DARK, { w: 0.8 }),
  ellipse(1.8, 9.8, 0.5, 0.4, O, false),
  eye(6.4, 7.8, 0.55),
].join("");

/* ---------- chacal à chabraque ---------- */
const JA = "#C47A3C", JA_SADDLE = "#3A3330", JA_LIGHT = "#F1E4CC";
const chacal = [
  leg(17, 13.8, 21.4, 1.4, "#A9652E"), leg(10, 13.6, 21.4, 1.4, "#A9652E"),
  // queue touffue, bout noir
  path("M20.2 11.6Q23 12.6 22.8 17.6Q22.4 19.4 21.4 19.8Q20.4 16.6 19.4 13.6Z", JA),
  path("M22.8 17.4Q22.6 19.4 21.4 19.8Q21 18.8 20.8 17.8Z", JA_SADDLE, { w: 0.8 }),
  path("M8 10.6Q12.6 9.4 17.8 9.8Q21 10.2 20.8 13Q20.6 15.2 18 15.2H10.4Q7.4 14.8 7.2 12.6Z", JA),
  // chabraque : selle noire tiquetée d'argent sur le dos
  path("M9 10.2Q13.6 9 18 9.8Q20.6 10.4 20.6 12.2Q17.6 13.6 14.6 13.2Q11.6 12.8 9 10.2Z", JA_SADDLE, { w: 0.8 }),
  dots([[11.6, 10.6], [13.4, 11.4], [15.2, 10.6], [16.6, 11.8], [18.2, 11], [19.6, 12]], 0.32, C.grisLight),
  leg(18.8, 14, 21.8, 1.4, JA), leg(11.8, 14, 21.8, 1.4, JA),
  // tête de renard, oreilles pointues, gorge claire
  path("M5.4 6.6L4.8 2.2L7.6 5Z", JA, { w: 0.9 }), path("M7.6 5.8L9.2 1.8L10.2 6.4Z", JA, { w: 0.9 }),
  path("M8.2 3.6L9 2.4L9.4 5.2Z", "#7A4A2A", false),
  path("M10 9Q9.4 5.4 6.4 5.6Q4.6 5.8 3.8 7.4L1.4 9.4Q0.9 10.6 2 10.8L4.6 11.2Q7.6 11.8 9.8 10.6Z", JA),
  path("M4.6 11.2Q7.6 11.8 9.6 10.6Q9 12.6 7.4 13.4Q5.4 12.6 4.6 11.2Z", JA_LIGHT, { w: 0.8 }),
  ellipse(1.6, 9.7, 0.5, 0.4, O, false),
  eye(5.6, 7.8, 0.55),
].join("");

/* ---------- gnou bleu ---------- */
const GNU = "#6E737C", GNU_DARK = "#3B3A3D", GNU_HORN = "#2F2B2A";
const gnou = [
  leg(17, 14.6, 21.4, 1.5, GNU_DARK), leg(10.4, 14.6, 21.4, 1.5, GNU_DARK),
  thick("M20.6 12Q21.8 13.4 21.6 17.4", GNU, 0.5),
  path("M21 16.4Q22.6 18 21.8 20.4Q20.8 18.6 21 16.4Z", O, { w: 0.6 }),
  // épaules hautes, dos fuyant
  path("M8.4 9Q11.6 6.6 15.4 8.2Q20.6 9.6 21 12.6Q21 15.6 18 15.6H10.8Q7.8 15.2 7.4 12.4Z", GNU),
  line("M10 9.6Q10.4 12 10 14.4M11.8 8.8Q12.4 11.4 12 14.6M13.6 8.6Q14.2 11.4 13.8 14.8", GNU_DARK, 0.6),
  // crinière noire sur le cou
  path("M8.6 8.8L9.4 6.4L10.2 7.8L11 5.8L11.6 7.6L12.6 6.2L12.8 8Q10.6 7.6 8.6 8.8Z", GNU_DARK, { w: 0.8 }),
  leg(19, 14.8, 21.8, 1.5, GNU), leg(8.8, 14.6, 21.8, 1.5, GNU),
  line("M8.6 21.8H10.4M18.8 21.8H20.6", O, 0.9),
  // grosse tête basse, face noire, barbe
  path("M10.2 9.2Q8.6 6.6 6 7.2Q4.6 7.6 4 9.2L1.8 13.8Q1.4 15.6 3 15.8Q5.4 16 6.8 14.2Q9.4 12.6 10.2 9.2Z", GNU),
  path("M4 9.2L1.8 13.8Q1.4 15.6 3 15.8Q4.4 15.8 5.2 14.8Q4.8 11.8 5.4 9Q4.6 8.6 4 9.2Z", GNU_DARK, { w: 0.8 }),
  path("M6.2 14.4Q6.6 17.6 7.8 18.6Q8.2 16.6 9.2 16.8Q8.8 14.6 9.6 12.6Z", GNU_DARK, { w: 0.8 }),
  // cornes en crochet, vers l'extérieur puis vers le haut
  thick("M7.6 7.2Q4.6 6.8 4 5.6Q3.6 4.4 4.6 3.4", GNU_HORN, 0.7),
  ellipse(8.6, 7, 0.6, 1, GNU, { w: 0.8 }),
  ellipse(2.4, 14.6, 0.45, 0.35, C.gris, false),
  eye(6.4, 9.8, 0.55),
].join("");

/* ---------- oryx gemsbok ---------- */
const ORX = "#C9B89E", ORX_HORN = "#2B2420";
const oryx = [
  thick("M17.6 14.6L17.8 21.8M10.4 14.4L10.2 21.8", C.white, 0.6),
  line("M16.8 16.2H18.8M9.4 16.2H11.4", O, 1.4),
  // longue queue noire
  thick("M20.8 11.4Q21.8 13.4 21.6 17", O, 0.4),
  anteBody(ORX),
  path("M8.8 13.2Q13.4 11.6 20.6 13.4Q20 15.2 17.8 15.2H10.6Q9 15 8.8 13.2Z", C.white, false),
  line("M8.6 12.8Q13.6 11.4 20.8 12.8", O, 1.1),
  anteBody("none"),
  thick("M19.4 14.8L19.8 22M9.2 14.6L8.4 22", C.white, 0.7),
  line("M18.6 16.4H20.6M8.2 16.4H10.2", O, 1.4),
  hooves,
  anteNeck(ORX),
  line("M5.6 8.6Q7.4 10.6 8.2 12.6", O, 0.9),
  // longues cornes droites
  thick("M5.2 6.6L8.2 1.4", ORX_HORN, 0.55), thick("M6.2 6.6L10.6 1.8", ORX_HORN, 0.55),
  // masque noir et blanc
  anteHead(C.white),
  path("M7.2 7.2Q5.6 6.4 4.4 7.2L4.2 8.4Q5.6 8.6 7.4 8.4Z", O, false),
  path("M3.2 8.2L1.6 9Q1.2 10.2 2.4 10.6Q3.6 10.6 4 10Z", O, false),
  anteHead("none"),
  g("rotate(35 8.2 6.6)", ellipse(8.2, 6.6, 0.7, 1.6, ORX, { w: 0.8 })),
  circle(5.2, 7.6, 0.5, C.white, false),
].join("");

/* ---------- grand koudou ---------- */
const KU = "#9A8470", KU_DARK = "#6F5D4C", KU_HORN = "#5A4330";
const koudou = [
  farLegs(KU_DARK),
  thick("M20.8 11.2Q21.8 12.4 21.4 14.4", KU, 0.5),
  anteBody(KU),
  // fines rayures blanches verticales
  line("M11.6 9.8Q11.8 12 11.4 14.8M13.6 9.4Q13.8 12 13.4 15M15.6 9.2Q15.8 12 15.4 15.2M17.6 9.4Q17.8 12 17.4 15.2M19.4 10Q19.6 12 19.2 14.6", C.white, 0.55),
  line("M9 9.6Q13 8.4 19.6 9.6", KU_DARK, 0.6),
  anteBody("none"),
  nearLegs(KU), hooves,
  anteNeck(KU),
  line("M5.4 9.6Q6.6 11.4 7.4 13", KU_DARK, 0.7),
  // cornes en longue spirale
  thick("M5.8 6.6Q8.6 6.2 7.4 4.8Q6.2 3.6 7.8 2.8Q9.4 2.2 8.6 1.2", KU_HORN, 0.55),
  thick("M6.4 6.8Q9.4 6.6 9 5Q8.6 3.6 10.2 3.2Q11.6 2.8 11.2 1.6", KU_HORN, 0.55),
  circle(8.6, 1.2, 0.35, C.cream, false), circle(11.2, 1.6, 0.35, C.cream, false),
  anteHead(KU),
  line("M3.6 7.6L5.6 8.2L4.8 6.8", C.white, 0.6),
  // grandes oreilles rondes
  g("rotate(55 9.2 6.6)", ellipse(9.2, 6.6, 1.1, 2, KU, { w: 0.85 }), ellipse(9.2, 6.8, 0.5, 1.2, "#C8B49E", false)),
  eye(5, 7.4, 0.5),
].join("");

/* ---------- éland du Cap ---------- */
const EL = "#C49A6C", EL_DARK = "#8A6744", EL_HORN = "#4A3A2C";
const eland = [
  leg(17.2, 14.4, 21.4, 1.6, EL_DARK), leg(10.4, 14.4, 21.4, 1.6, EL_DARK),
  thick("M21 12Q22 13.6 21.6 17", EL, 0.5),
  path("M21.2 16.2Q22.4 17.6 21.6 19.6Q20.8 18 21.2 16.2Z", O, { w: 0.6 }),
  // grand corps lourd, bosse à l'épaule
  path("M8.2 10.8Q9.4 7.8 12 8.4Q16 8.6 18.4 9.2Q21.4 10 21.2 13Q21 15.8 18.2 15.8H10.6Q7.8 15.4 7.6 12.8Z", EL),
  line("M12.6 9.4Q12.8 11.6 12.4 13.6M14.6 9.4Q14.8 11.6 14.4 13.6M16.6 9.6Q16.8 11.6 16.4 13.6", "#E8D2B0", 0.5),
  leg(19.2, 14.6, 21.8, 1.6, EL), leg(8.8, 14.4, 21.8, 1.6, EL),
  line("M8.6 21.8H10.6M19 21.8H21", O, 0.9),
  // cou à grand fanon pendant, touffe sombre
  path("M5.4 14.6Q5.8 16.8 7.6 17Q7.2 16 7.4 15Z", EL_DARK, { w: 0.7 }),
  path("M10.8 10.4Q9.4 8 7.4 7L4.8 8.4Q4.2 12.4 5.6 14.8Q7 16.4 8.6 15.4Q8.6 13.4 9.4 12.2Z", EL),
  path("M7.6 7.8Q6.4 5.4 4.2 6.4L1.6 9Q1.2 10.2 2.4 10.6Q4 10.8 5.4 9.6Z", EL),
  path("M6.6 6.4Q5.6 6.2 5.2 7Q6 7.6 6.8 7.4Z", EL_DARK, false),
  // cornes droites torsadées, vers l'arrière
  thick("M5.8 6.4L8.2 2.2", EL_HORN, 0.7),
  line("M6.4 5.2L7.2 5.6M6.9 4.3L7.7 4.7M7.4 3.4L8.2 3.8", "#7A6650", 0.4),
  g("rotate(40 8.6 6.8)", ellipse(8.6, 6.8, 0.7, 1.4, EL, { w: 0.8 })),
  eye(4.8, 7.6, 0.5),
].join("");

/* ---------- springbok (en plein saut, « pronking ») ---------- */
const SPR = "#C98A4E", SPR_STRIPE = "#6B3A22";
const springbok = [
  ellipse(13.6, 22, 6.4, 0.9, C.sable, false),
  // pattes raides, groupées sous le corps
  thick("M10.8 13.8L12 19.6M16.6 14L15.6 19.6", "#E9DCC6", 0.6),
  path("M20 11.2Q22 10.4 22.6 8.8Q22 11.6 20.6 12.6Z", C.white, { w: 0.7 }),
  // dos arqué
  path("M8.4 11.4Q12.2 7.6 17.6 9Q21.2 10.2 20.8 13Q20.4 15.4 17.6 15.4H11Q8.2 15 8 13Z", SPR),
  path("M8.6 13.4Q13.6 12.4 20.6 13.4Q20 15.4 17.6 15.4H11Q9 15 8.6 13.4Z", C.white, false),
  line("M8.4 13.2Q13.8 11.8 20.8 13.2", SPR_STRIPE, 1.1),
  // éventail dorsal blanc dressé
  path("M12.4 9.2Q14.2 6.6 16.8 7.2Q17.6 7.8 17.4 9Q15 8.4 12.4 9.2Z", C.white, { w: 0.8 }),
  path("M8.4 11.4Q12.2 7.6 17.6 9Q21.2 10.2 20.8 13Q20.4 15.4 17.6 15.4H11Q8.2 15 8 13Z", "none"),
  thick("M9.6 14L10.8 19.8M18.6 14.2L17.6 19.8", C.white, 0.7),
  line("M10.2 20H11.6M17 20H18.4", O, 0.9),
  // tête basse, face blanche à raie brune
  path("M10.4 11.6Q9 9.2 7.4 8L4.8 9.6Q6.6 11.4 7.8 13.6Z", SPR),
  path("M7.6 8.8Q6.4 6.6 4.2 7.6L2 10.4Q1.6 11.6 2.8 11.8Q4.4 11.8 5.6 10.6Z", C.white),
  line("M6.6 8.2Q4.6 9.4 2.8 11.2", SPR_STRIPE, 0.7),
  // cornes en lyre, courtes
  line("M5.2 7.8Q3.6 5.8 4.6 3.6M6.6 7.8Q7.4 5.4 9.2 4.8", O, 1.1),
  g("rotate(40 8.4 7.8)", ellipse(8.4, 7.8, 0.7, 1.5, SPR, { w: 0.8 })),
  eye(5.4, 8.8, 0.5),
].join("");

/* ---------- hippotrague noir ---------- */
const SAB = "#2A211C", SAB_MANE = "#3E302A", SAB_HORN = "#3A2E28";
const hippotragueNoir = [
  farLegs("#1E1814"),
  thick("M20.8 11.2Q22 13.2 21.6 16.6", SAB, 0.5),
  path("M8.4 10.8Q11.4 8.6 16.8 9Q21 9.4 21 12.4Q20.8 15.2 17.8 15.2H10.6Q8 14.8 7.8 12.8Z", SAB),
  path("M9 13.8Q13.4 12.8 20.4 14Q19.8 15.2 17.8 15.2H10.6Q9.2 15 9 13.8Z", C.white, false),
  anteBody("none"),
  nearLegs(SAB), hooves,
  anteNeck(SAB),
  // crinière dressée
  path("M9.6 10.2L9.4 8.4L8.6 8.8L8.6 7.4L7.6 7.6L7.6 6.6Q9.4 7.4 10.4 10.4Z", SAB_MANE, { w: 0.7 }),
  // immenses cornes en cimeterre, annelées
  thick("M6 6.6Q6.4 2.2 11.4 1.6Q15.6 1.4 17.6 4", SAB_HORN, 0.7),
  line("M7.1 4.1L6.4 3.8M8.4 2.6L8 2M10 1.9L9.9 1.3M11.8 1.7L12 1.1", "#7A6A5E", 0.4),
  anteHead(SAB),
  // face rayée de blanc
  line("M7 7.4Q5 7.6 3.4 9.6", C.white, 0.7),
  path("M1.6 9Q1.2 10.2 2.4 10.6Q3.6 10.8 4.6 10.2Q3.2 9.6 2.6 8.4Z", C.white, { w: 0.6 }),
  g("rotate(35 8.2 6.6)", ellipse(8.2, 6.6, 0.7, 1.6, SAB, { w: 0.8 })),
  circle(5, 7.8, 0.45, "#8A6A4E", false),
].join("");

/* ---------- topi (sur sa termitière) ---------- */
const TOP = "#9C4F2E", TOP_DARK = "#4B2C3A", TOP_LEG = "#D9A35C", MOUND = "#B5673C";
const topi = [
  path("M3.2 22.6Q3.6 17.4 7.6 16.6Q9.4 14.6 12.8 15.6Q16.6 14.8 18.8 16.8Q21.6 18.4 21.6 22.6Z", MOUND),
  line("M7 19.2Q8 18.4 9.4 18.8M13.2 18.2Q14.6 17.6 16 18.4M10.4 21.2Q11.8 20.4 13.2 21", "#8E4C2A", 0.6),
  thick("M17.2 12.6L17.6 16.6M10.4 12.4L10.2 16.6", TOP_LEG, 0.6),
  thick("M20.4 9.8Q21.4 11 21 12.8", TOP, 0.45),
  // dos fuyant
  path("M8.4 8.4Q11.8 6.4 16.4 7.4Q20.8 8.2 20.8 10.6Q20.6 13.2 17.6 13.2H10.6Q8 12.8 7.8 10.8Z", TOP),
  // taches sombres à l'épaule et à la cuisse
  path("M8.2 9.4Q9.6 8.4 11 9.4Q11.4 11.6 10.4 13H9Q8 12 8.2 9.4Z", TOP_DARK, false),
  path("M17 8.6Q19.6 8.6 20.6 10.2Q20.4 12.6 18.6 13.2Q16.8 11.6 17 8.6Z", TOP_DARK, false),
  path("M8.4 8.4Q11.8 6.4 16.4 7.4Q20.8 8.2 20.8 10.6Q20.6 13.2 17.6 13.2H10.6Q8 12.8 7.8 10.8Z", "none"),
  thick("M19.2 12.8L19.6 17M9.2 12.6L8.6 17", TOP_LEG, 0.7),
  line("M8 17H9.4M19 17.2H20.4", O, 0.9),
  // longue tête, face sombre
  path("M10.4 9Q9 6.4 7.4 5L4.8 6.6Q6.6 8.6 7.8 11.2Z", TOP),
  path("M7.6 5.8Q6.4 3.4 4.2 4.4L1.6 7.4Q1.2 8.6 2.4 8.8Q4 8.8 5.4 7.6Z", TOP),
  path("M5.8 4.2Q4.8 4 4.2 4.4L1.6 7.4Q1.2 8.6 2.4 8.8Q3.4 8.6 4.2 7.4Z", TOP_DARK, { w: 0.6 }),
  // cornes annelées en accolade
  line("M5.4 4.6Q4.4 2.8 5.4 1.2M6.6 4.8Q7.2 2.6 9 2.2", O, 1.2),
  g("rotate(40 8.2 4.8)", ellipse(8.2, 4.8, 0.7, 1.5, TOP, { w: 0.8 })),
  eye(4.8, 5.6, 0.5),
].join("");

/* ---------- cobe à croissant (waterbuck) ---------- */
const WB = "#8A7660", WB_DARK = "#5E4E3E", WB_HORN = "#5A4636";
const cobe = [
  farLegs(WB_DARK, 0.7),
  thick("M20.8 11.6Q21.6 12.8 21.4 14.6", WB, 0.5),
  anteBody(WB),
  // anneau blanc sur la croupe
  path("M19.4 9.8Q17.2 10.8 17.2 12.6Q17.4 14.6 19.6 15", "none", { c: C.white, w: 0.9 }),
  line("M9.6 10.4Q10.4 9.8 11.2 10.4M12.4 9.6Q13.2 9 14 9.6", WB_DARK, 0.5),
  anteBody("none"),
  nearLegs(WB, 0.8), hooves,
  anteNeck(WB),
  // bavette blanche et poil hirsute du cou
  path("M6.6 10.6Q7.6 11 8.2 12.2Q7.4 12.4 6.8 11.8Z", C.white, { w: 0.6 }),
  line("M8.6 8.8L9.6 8.2M9.4 10.2L10.4 9.8", WB_DARK, 0.5),
  // cornes annelées, en arrière puis vers l'avant
  thick("M5.4 6.6Q6.4 4.6 5 2.8Q4.4 2 3.8 1.8", WB_HORN, 0.4),
  thick("M6.6 6.8Q9.2 5.2 8.8 3Q8.6 2 7.8 1.6", WB_HORN, 0.4),
  anteHead(WB),
  path("M1.6 9Q1.2 10.2 2.4 10.6Q3.4 10.6 4 10Q2.6 9.6 1.6 9Z", C.white, { w: 0.6 }),
  line("M4.4 6.8Q5.2 6.6 5.8 7", C.white, 0.5),
  g("rotate(35 8.2 6.6)", ellipse(8.2, 6.6, 0.8, 1.6, WB, { w: 0.8 }), ellipse(8.2, 6.8, 0.35, 0.9, "#C4B4A0", false)),
  eye(4.8, 7.6, 0.5),
].join("");

/* ---------- dik-dik ---------- */
const DIK = "#A88A66", DIK_RED = "#C27A48", DIK_LEG = "#B9774A";
const dikdik = [
  thick("M17.2 15.8L17.4 21.8M11.4 15.6L11.2 21.8", DIK_LEG, 0.45),
  // petit corps voûté
  path("M10 12.4Q12.6 10.2 16.8 10.8Q20.6 11.6 20.2 14.6Q19.8 16.6 17.4 16.6H12Q9.6 16.2 9.6 14.2Z", DIK),
  path("M12 16.6H17.4Q16 15.6 14.4 15.6Q12.8 15.6 12 16.6Z", "#E8D9C2", false),
  path("M19.6 12.4Q20.8 12.2 21 13Q20.4 13.6 19.8 13.4Z", DIK, { w: 0.7 }),
  thick("M18.8 15.6L19.2 22M10.6 15.4L10 22", DIK_LEG, 0.5),
  line("M9.4 22H10.6M18.6 22H19.8", O, 0.8),
  // grosse tête : long museau mobile, grand œil cerclé de blanc, toupet
  path("M11.4 12.6Q10.4 10 9.4 8.8L6.6 9.6Q8.4 11.6 9.6 14.6Z", DIK),
  path("M9.8 9.6Q9.4 6 6.4 6.2Q4.6 6.4 3.8 8L1.4 10.2Q0.9 11.2 1.8 11.6L3.6 11.8Q6.2 12.2 8 11.4Q9.6 10.8 9.8 9.6Z", DIK_RED),
  path("M1.4 10.2Q0.9 11.2 1.8 11.6Q2.6 11.6 2.8 10.8Q2.4 10.2 1.4 10.2Z", O, false),
  path("M6.6 6.4L7 4.4L7.8 6Z", O, { w: 0.6 }),
  path("M7.2 6.4Q7.4 4.4 9 4.2Q8.8 5.6 8.2 6.6Z", DIK_RED, { w: 0.7 }),
  g("rotate(60 10.4 6.8)", ellipse(10.4, 6.8, 1.2, 2.2, DIK, { w: 0.85 }), ellipse(10.4, 7, 0.55, 1.3, "#E8D9C2", false)),
  circle(5.8, 8.4, 1.35, C.white, { w: 0.6 }), eye(5.7, 8.5, 0.75),
  circle(5.4, 8.1, 0.22, C.white, false),
].join("");

/* ---------- gérénuk (debout sur ses pattes arrière) ---------- */
const GER = "#B5733F", GER_LIGHT = "#E2B98A";
const gerenuk = g("translate(11.6 12) scale(0.95) translate(-10.75 -12.3)", [
  // branche d'acacia
  thick("M1.8 9.6Q3 6.6 2.8 2.8", C.bois, 0.6),
  ellipse(2.4, 2.4, 1.2, 0.8, C.feuille, { w: 0.7 }), ellipse(2.2, 6.2, 0.6, 0.9, C.feuille, { w: 0.7 }), ellipse(3.8, 4.8, 0.9, 0.6, C.feuille, { w: 0.7 }),
  // pattes arrière dressées
  thick("M16.4 16.6L15.6 22M18.8 16L19.6 22", "#9A5C30", 0.6),
  line("M14.8 22.2H16.4M19 22.2H20.6", O, 0.9),
  path("M18.6 13Q20 14 20.4 15.6Q19.6 15.6 18.8 14.6Z", O, { w: 0.6 }),
  // corps incliné, selle plus sombre
  path("M13.2 9.4Q16.8 9.6 18.6 12.8Q19.8 15.6 18.2 17.2Q16.4 18.4 14.6 17Q12.4 15 12 12.2Z", GER_LIGHT),
  path("M13.2 9.4Q16.8 9.6 18.6 12.8Q19.4 14.4 19.2 15.6Q16 15 14.2 13Q12.8 11.6 13.2 9.4Z", GER, false),
  path("M13.2 9.4Q16.8 9.6 18.6 12.8Q19.8 15.6 18.2 17.2Q16.4 18.4 14.6 17Q12.4 15 12 12.2Z", "none"),
  // pattes avant posées sur la branche
  thick("M12.8 12.4L9.8 12.4L8.6 10.4", GER_LIGHT, 0.55),
  // très long cou dressé
  path("M14.2 10.4L9.6 5L7.2 6L11.8 12.6Z", GER),
  path("M9.6 5L7.2 6L10.6 11Z", GER_LIGHT, false),
  path("M14.2 10.4L9.6 5L7.2 6L11.8 12.6Z", "none"),
  // petite tête fine, grandes oreilles
  g("rotate(60 10.8 3.6)", ellipse(10.8, 3.6, 0.9, 1.9, GER, { w: 0.8 }), ellipse(10.8, 3.8, 0.4, 1.2, GER_LIGHT, false)),
  path("M10.2 5Q9.8 2.6 7.6 2.8L5 4.2Q4.2 4.8 4.6 5.6Q6.2 6.4 8 6.4Q9.8 6.2 10.2 5Z", GER),
  path("M5 4.2Q4.2 4.8 4.6 5.6Q5.4 6 6 5.6Q5.8 4.6 5 4.2Z", "#7A4A2A", { w: 0.5 }),
  circle(7.6, 4.3, 0.85, C.white, { w: 0.5 }), eye(7.5, 4.3, 0.45),
].join(""));

/* ---------- serval ---------- */
const SER = "#E5B455", SER_LIGHT = "#F7E6BE";
const serval = [
  leg(16.8, 13.8, 21.4, 1.6, "#C9953F"), leg(9.8, 13.8, 21.4, 1.6, "#C9953F"),
  // queue courte annelée
  thick("M20.4 11.6Q22 12.6 22 15.2", SER, 1),
  line("M22.2 13.6L21.2 13.8", O, 0.7), circle(22, 15.4, 0.5, O, false),
  path("M8 10.2Q12.6 9.2 17.6 9.6Q21 10.2 20.8 12.8Q20.6 15.2 17.8 15.2H10.4Q7.4 14.8 7.2 12.6Z", SER),
  path("M10.4 15.2H17.6Q15.6 13.8 13.8 13.8Q11.6 13.8 10.4 15.2Z", SER_LIGHT, false),
  line("M9.4 10.6L11.2 10.4M12.6 10H14.8", O, 0.7),
  dots([[16.6, 10.8], [18.8, 11.4], [10.2, 12.4], [12.6, 12.2], [15, 12.4], [17.4, 12.8], [19.6, 13.4], [11.6, 14], [14, 14.2]], 0.5, O),
  leg(18.8, 14, 21.8, 1.6, SER), leg(11.6, 14, 21.8, 1.6, SER),
  dots([[19.6, 17], [12.4, 17.4], [19.6, 19.4], [12.4, 19.6]], 0.36, O),
  // très grandes oreilles, dos noir à tache blanche
  path("M4.4 6.2Q3 3 4.2 1.4Q6 1.6 6.8 5Z", O, { w: 0.9 }),
  path("M7.4 5.2Q7.4 1.8 9.4 1Q10.8 2.4 9.8 6Z", O, { w: 0.9 }),
  ellipse(9.1, 3, 0.4, 0.6, C.white, false),
  circle(6.4, 8.4, 3.2, SER),
  ellipse(5.2, 10.2, 1.9, 1.3, SER_LIGHT, { w: 0.7 }),
  path("M4.2 9.2H6L5.1 10.1Z", O, { w: 0.5 }),
  line("M6.2 5.4V6.8M7.4 5.6L7.2 6.8", O, 0.6),
  eye(4.6, 7.8, 0.55), eye(7.8, 7.8, 0.55),
].join("");

/* ---------- caracal (assis) ---------- */
const CAR = "#C7884E", CAR_LIGHT = "#F1DEC2", CAR_DARK = "#2B1D14";
const caracal = [
  // queue posée au sol
  thick("M14.8 21.6Q19.6 22.2 21 19.4", CAR, 1.1),
  // corps assis : poitrail droit, cuisse ronde
  path("M7.2 10.4Q10.4 10.4 13.8 13.4Q17.6 16.4 17 20.4Q16.6 22 14.6 22H7Q6 22 6.2 20.4Q6.8 15.4 6 12Z", CAR),
  path("M13.4 15.6Q16.4 16.6 16.4 19.4Q16.2 21.2 14.4 21.4Q12.2 21 12.2 18.4Q12.2 16.4 13.4 15.6Z", "#B87A44", { w: 0.8 }),
  path("M6.6 13Q8.2 13.6 8.6 16.4Q8.4 19 7.8 22H7Q6 22 6.2 20.4Q6.8 16 6.6 13Z", CAR_LIGHT, false),
  path("M7.2 10.4Q10.4 10.4 13.8 13.4Q17.6 16.4 17 20.4Q16.6 22 14.6 22H7Q6 22 6.2 20.4Q6.8 15.4 6 12Z", "none"),
  // pattes avant droites
  rect(8.6, 14.4, 1.7, 7.6, 0.8, CAR), line("M8.4 22H10.6", O, 0.9),
  // oreilles noires à longs pinceaux
  path("M3.6 5.8L3.4 1.4L6 4.6Z", CAR_DARK, { w: 0.9 }),
  path("M7.4 4.6L9.8 1.2L9.6 6Z", CAR_DARK, { w: 0.9 }),
  line("M3.4 1.4L3.2 0.8M9.8 1.2L10.2 0.6", CAR_DARK, 0.8),
  circle(6.4, 7.6, 3.2, CAR),
  ellipse(5, 9.4, 1.9, 1.3, CAR_LIGHT, { w: 0.7 }),
  path("M3.6 8.4H5.4L4.5 9.3Z", "#8A4E36", { w: 0.5 }),
  line("M5.8 6.2L6 4.8M6.8 6.2L7.2 4.9", CAR_DARK, 0.5),
  eye(4.4, 7, 0.55), eye(7.6, 7, 0.55),
].join("");

/* ---------- ratel (blaireau à miel) ---------- */
const RAT_BK = "#211A16", RAT_GREY = "#D3D6D1";
const ratel = g("translate(12 15.45) scale(0.96) translate(-12.4 -15.45)", [
  leg(16.6, 15, 20.6, 1.8, RAT_BK), leg(10, 15, 20.6, 1.8, RAT_BK),
  thick("M20.8 12.6L22.2 10.2", RAT_GREY, 0.8),
  // corps bas et trapu, noir
  path("M6.6 13Q9.6 9.8 15.6 9.8Q21 9.8 21.2 13.6Q21.4 17.2 18 17.2H9.4Q6.4 16.8 6.4 14.6Z", RAT_BK),
  // manteau gris-blanc du front à la queue
  path("M6.2 13.2Q9.6 9.6 15.6 9.6Q20.8 9.6 21.2 13Q18 14.2 15 14Q11.4 13.6 9 14.4Q7.6 14.4 6.2 13.2Z", RAT_GREY),
  leg(18.8, 15.2, 21.2, 1.9, RAT_BK), leg(8.4, 15.2, 21.2, 1.9, RAT_BK),
  line("M7.8 21.4L7.2 21.8M9 21.4L8.6 21.9M18.2 21.4L17.6 21.8M19.4 21.4L19 21.9", O, 0.6),
  // tête plate, museau noir
  path("M9.4 12Q7.6 10.6 5.4 11.2L2 13.6Q1.2 14.6 2.2 15.2L4.6 15.8Q7.6 16.2 9.4 14.8Z", RAT_BK),
  path("M9.2 12.4Q7.4 10.6 5.4 11.2L2.4 13.2Q4.8 13.4 6.6 13.8Q8 13.6 9.2 12.4Z", RAT_GREY, { w: 0.7 }),
  ellipse(1.8, 14.2, 0.5, 0.4, "#5A4E48", false),
  circle(6.6, 14, 0.6, "#F2E8DA", false), circle(6.6, 14, 0.3, O, false),
].join(""));

/* ---------- oryctérope ---------- */
const AAR = "#B9A08E", AAR_DARK = "#8A7262", AAR_PINK = "#D9B4A6";
const orycterope = [
  leg(16.6, 15.6, 21.4, 1.9, AAR_DARK), leg(10.6, 15.8, 21.4, 1.9, AAR_DARK),
  // queue épaisse qui s'effile
  path("M18.4 12.6Q22 14.4 22.8 21.6Q21.6 21.4 20.6 19.2Q19.6 17 17.6 16Z", AAR),
  // dos voûté
  path("M8.4 12.6Q10.6 8.4 15 8.8Q19.6 9.4 20 14Q20.2 17.6 17 17.6H10.6Q8 17.2 7.8 14.8Z", AAR),
  line("M10.6 10.6Q11.2 13 10.8 15.6M13.6 9.6Q14 12.6 13.6 15.8", AAR_DARK, 0.5),
  leg(18.4, 16, 21.8, 2, AAR), leg(8.8, 15.6, 21.8, 2, AAR),
  line("M8.4 21.8L8 22.4M9.4 21.8L9.2 22.4M18 21.8L17.6 22.4M19.2 21.8L19 22.4", O, 0.6),
  // longues oreilles de lapin, long groin tubulaire
  g("rotate(15 9 6.6)", ellipse(9, 6.6, 1.2, 3.4, AAR, { w: 0.85 }), ellipse(9, 6.8, 0.55, 2.4, AAR_PINK, false)),
  path("M10 11.8Q9 9.4 6.6 10.2L2.4 13.8Q1.2 14.8 1.6 15.8Q2.2 16.4 3.4 15.6L6.6 14.4Q9 14.2 10 11.8Z", AAR),
  ellipse(1.9, 15.2, 0.75, 0.95, AAR_PINK, { w: 0.7 }),
  circle(1.9, 15.2, 0.25, O, false),
  g("rotate(-20 10.6 7.4)", ellipse(10.6, 7.4, 1.1, 3, AAR, { w: 0.85 })),
  eye(7.2, 11.6, 0.5),
].join("");

/* ---------- porc-épic à crête ---------- */
const POR = "#2E2622", QUILL = "#F2ECE0";
const quill = (x1, y1, x2, y2) => line(`M${x1} ${y1}L${x2} ${y2}`, O, 1.7) + line(`M${x1} ${y1}L${x2} ${y2}`, QUILL, 0.8)
  + line(`M${x1 + (x2 - x1) * 0.35} ${y1 + (y2 - y1) * 0.35}L${x1 + (x2 - x1) * 0.55} ${y1 + (y2 - y1) * 0.55}`, POR, 0.8);
const porcepic = [
  // éventail de longs piquants rayés noir et blanc
  quill(8.8, 13, 5.4, 6.4), quill(11, 12, 9.6, 3.6), quill(13.4, 11.6, 13.8, 2.8), quill(15.8, 12, 18.2, 4),
  quill(17.6, 13.2, 21.4, 7.6), quill(18.8, 15, 22.6, 12.2), quill(12.2, 12, 11.4, 5.4), quill(14.6, 12, 16.2, 5.2),
  // corps sombre
  path("M4.6 17.4Q5.2 12.6 11.4 11.6Q17.4 11 19.8 15.2Q21 18.4 19 19.8H7Q4.4 19.6 4.6 17.4Z", POR),
  line("M8 13.8L8.8 15.4M10.6 12.8L11 14.6M13.4 12.4L13.4 14.4M16 12.8L15.6 14.6M18.2 14.2L17.4 15.6", QUILL, 0.5),
  leg(7.4, 18.6, 21.6, 1.7, POR), leg(16.2, 18.6, 21.6, 1.7, POR),
  // museau rond
  path("M7.4 14.6Q4.4 14 2.6 16.4Q1.6 18 2.8 18.8Q5.4 19.6 7.8 18.6Z", "#4A3C34"),
  ellipse(2.3, 17.8, 0.45, 0.4, O, false),
  circle(5, 15.6, 0.6, O, false),
  ellipse(6.6, 14.4, 0.6, 0.45, "#6B5A4E", { w: 0.6 }),
].join("");

/* ---------- mangouste rayée ---------- */
const MON = "#8C7A66", MON_BAND = "#4A3B2E", MON_LIGHT = "#B8A68E";
const mangouste = [
  leg(16.4, 14.6, 19.4, 1.5, MON_BAND), leg(9.6, 14.6, 19.4, 1.5, MON_BAND),
  // longue queue effilée, bout sombre
  path("M18.4 12.4Q22.2 13.4 22.6 18.6Q22.6 20 22 20.6Q21.2 17.6 19.6 16Q18.6 15.2 17.6 15.4Z", MON),
  path("M22.6 18.4Q22.6 20 22 20.6Q21.6 19.6 21.2 18.8Z", MON_BAND, { w: 0.7 }),
  // corps long et bas, bandes sombres en travers du dos
  path("M7.4 12.2Q10.6 10.2 15.6 10.6Q19.6 11 19.6 13.6Q19.4 15.8 16.8 15.8H9.4Q6.8 15.4 6.8 13.6Z", MON),
  path("M9.4 15.8H16.8Q15.4 14.8 13 14.8Q10.6 14.8 9.4 15.8Z", MON_LIGHT, false),
  line("M10.4 10.8Q10.8 12.6 10.4 14.4M12.4 10.4Q12.8 12.4 12.4 14.4M14.4 10.4Q14.8 12.4 14.4 14.6M16.4 10.6Q16.8 12.4 16.4 14.6M18.2 11.2Q18.6 12.8 18.2 14.4", MON_BAND, 0.8),
  path("M7.4 12.2Q10.6 10.2 15.6 10.6Q19.6 11 19.6 13.6Q19.4 15.8 16.8 15.8H9.4Q6.8 15.4 6.8 13.6Z", "none"),
  leg(18, 14.8, 19.8, 1.5, MON), leg(8, 14.6, 19.8, 1.5, MON),
  line("M7.8 19.8H9.6M17.8 19.8H19.6", O, 0.8),
  // petite tête pointue, oreilles rondes
  circle(8, 10.6, 1, MON, { w: 0.85 }),
  path("M9.6 11.8Q8.6 10.4 6.6 10.6L2.4 12.6Q1.4 13.2 2 14Q2.6 14.4 4.4 14.4Q7.4 14.6 9 13.8Z", MON),
  ellipse(1.9, 13.2, 0.5, 0.4, O, false),
  eye(5.6, 12, 0.5),
].join("");

/* ---------- daman des rochers ---------- */
const HYR = "#8B735A", HYR_LIGHT = "#C4AE92", ROCK = "#A9A39A", ROCK_DARK = "#8A847C";
const daman = [
  path("M1.4 22.4L2.6 17.6L6.2 15.8L10 16.6L13.6 15.4L18.4 16L21.4 18.2L22.6 22.4Z", ROCK),
  line("M6.2 15.8L7 18.8M13.6 15.4L14.6 18.2L17 19.4M4 20.6L6.4 21", ROCK_DARK, 0.7),
  // corps rond, sans queue
  path("M5.6 10.2Q8 6.4 13.6 6.8Q19.6 7.4 20 12.4Q20.2 15.8 17 16H8.2Q5.2 15.8 5.2 13.2Z", HYR),
  path("M8.4 16H16.4Q15 14.4 12.4 14.4Q9.8 14.4 8.4 16Z", HYR_LIGHT, false),
  ellipse(15.4, 9.6, 0.9, 0.6, "#4A3B2E", false),
  // pattes posées sur le rocher
  ellipse(8.4, 16.2, 1.5, 0.8, HYR, { w: 0.9 }), ellipse(16.6, 16.2, 1.5, 0.8, HYR, { w: 0.9 }),
  // tête ronde, petites oreilles, museau court
  ellipse(7.8, 7, 0.9, 0.8, HYR, { w: 0.85 }),
  path("M8.8 8.8Q7.8 6.8 5.2 7.4Q3 8 2.2 10.4Q2 12 3.4 12.4Q6.4 12.8 8.4 11.6Z", HYR),
  ellipse(2.4, 10.6, 0.45, 0.4, O, false),
  path("M3.2 11.8Q4 12.2 4.8 11.8", "none", { c: O, w: 0.6 }),
  circle(5.4, 9, 0.75, HYR_LIGHT, false), eye(5.4, 9, 0.5),
].join("");

const A = (slug, fr, en, char, tags, body) => ({ slug, fr, en, char, group: "animaux", tags, tone: false, body });
export default [
  A("guepard", "Guépard", "Cheetah", null, ["guépard", "cheetah", "duma", "félin", "savane", "savanna", "kenya", "namibie", "larmes noires"], guepard),
  A("lycaon", "Lycaon", "African wild dog", null, ["lycaon", "african wild dog", "chien sauvage", "painted dog", "mbwa mwitu", "inkentshane", "savane", "botswana", "zimbabwe"], lycaon),
  A("chacal", "Chacal à chabraque", "Black-backed jackal", null, ["chacal", "jackal", "black-backed jackal", "chabraque", "mbweha", "rooijakkals", "savane", "kenya", "afrique du sud"], chacal),
  A("gnou", "Gnou bleu", "Blue wildebeest", null, ["gnou", "wildebeest", "gnu", "nyumbu", "inkonkoni", "migration", "serengeti", "masai mara", "savane"], gnou),
  A("oryx", "Oryx gemsbok", "Gemsbok", null, ["oryx", "gemsbok", "gemsbuck", "choroa", "kalahari", "namib", "namibie", "botswana", "désert", "antilope"], oryx),
  A("koudou", "Grand koudou", "Greater kudu", null, ["koudou", "kudu", "greater kudu", "tandala", "iqudu", "antilope", "antelope", "cornes spiralées", "savane", "zimbabwe"], koudou),
  A("eland", "Éland du Cap", "Common eland", null, ["éland", "eland", "common eland", "pofu", "impofu", "antilope", "antelope", "fanon", "savane", "afrique australe"], eland),
  A("springbok", "Springbok", "Springbok", null, ["springbok", "springbuck", "pronking", "saut", "antilope", "antelope", "kalahari", "afrique du sud", "namibie"], springbok),
  A("hippotrague-noir", "Hippotrague noir", "Sable antelope", null, ["hippotrague noir", "sable antelope", "sable", "palahala", "mbarapi", "antilope", "antelope", "cornes en cimeterre", "zimbabwe", "angola"], hippotragueNoir),
  A("topi", "Topi", "Topi", null, ["topi", "nyamera", "tsessebe", "antilope", "antelope", "termitière", "termite mound", "serengeti", "masai mara", "savane"], topi),
  A("cobe-a-croissant", "Cobe à croissant", "Waterbuck", null, ["cobe à croissant", "waterbuck", "kuro", "iphiva", "antilope", "antelope", "anneau blanc", "rivière", "savane"], cobe),
  A("dik-dik", "Dik-dik", "Dik-dik", null, ["dik-dik", "dikdik", "digidigi", "petite antilope", "antelope", "kenya", "tanzanie", "namibie", "brousse"], dikdik),
  A("gerenuk", "Gérénuk", "Gerenuk", null, ["gérénuk", "gerenuk", "swala twiga", "antilope girafe", "antelope", "somalie", "kenya", "éthiopie", "acacia"], gerenuk),
  A("serval", "Serval", "Serval", null, ["serval", "mondo", "indlozi", "félin", "chat sauvage", "wild cat", "grandes oreilles", "savane", "tanzanie"], serval),
  A("caracal", "Caracal", "Caracal", null, ["caracal", "lynx du désert", "simba mangu", "rooikat", "félin", "wild cat", "pinceaux", "sahel", "désert", "savane"], caracal),
  A("ratel", "Ratel", "Honey badger", "🦡", ["ratel", "honey badger", "blaireau", "badger", "nyegere", "insele", "savane", "miel", "honey", "afrique du sud"], ratel),
  A("orycterope", "Oryctérope", "Aardvark", null, ["oryctérope", "aardvark", "cochon de terre", "muhanga", "isambane", "termites", "nocturne", "savane", "afrique australe"], orycterope),
  A("porc-epic", "Porc-épic à crête", "Crested porcupine", null, ["porc-épic", "porcupine", "crested porcupine", "nungunungu", "ingungumbane", "piquants", "quills", "savane", "sahel"], porcepic),
  A("mangouste-rayee", "Mangouste rayée", "Banded mongoose", null, ["mangouste rayée", "banded mongoose", "mangouste", "mongoose", "nguchiro", "savane", "ouganda", "kenya"], mangouste),
  A("daman-des-rochers", "Daman des rochers", "Rock hyrax", null, ["daman des rochers", "rock hyrax", "daman", "pimbi", "imbila", "dassie", "rochers", "kopje", "afrique australe", "éthiopie"], daman),
];
