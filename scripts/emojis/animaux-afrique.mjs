// Emojis animaux d'Afrique : faune de la savane, des fleuves et des villages (dessins originaux Afroicons).
// Animaux vus de profil (tête à gauche) ou de face, couleur à plat et contour brun foncé, comme l'éléphant, le zèbre ou l'okapi.
import { O, W, C, path, circle, ellipse, rect, line, g } from "./lib.mjs";

/** Trait épais « plein » : contour brun puis couleur par-dessus (cous, queues, pattes fines, cornes). */
const thick = (d, col, w = 1.5) => line(d, O, w + 2 * W) + line(d, col, w);
const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const eye = (x, y, r = 0.55) => circle(x, y, r, O, false);
/** Patte droite arrondie, avec sabot ou pied plus sombre. */
const leg = (x, top, bottom, w, fill, foot) => rect(x, top, w, bottom - top, w / 2.2, fill) + (foot ? rect(x, bottom - 1.2, w, 1.2, 0.4, foot, { w: 0.8 }) : "");

const rn = (v) => Math.round(v * 100) / 100;
/** Patte d'ongulé effilée, ouverte en haut (elle sort du corps sans trait) : large à l'épaule, fine au canon, sabot (hoof) ;
 *  dx décale le pied pour suggérer la marche. */
const shank = (x, top, bot, wt, wb, col, hoof, dx = 0) => {
  const b = x + wt / 2 + dx, m = (top + bot) / 2;
  const d = `M${rn(x)} ${rn(top)}Q${rn(x + 0.2)} ${rn(m)} ${rn(b - wb / 2)} ${rn(bot)}H${rn(b + wb / 2)}Q${rn(x + wt - 0.1)} ${rn(m)} ${rn(x + wt)} ${rn(top)}`;
  return path(d + "Z", col, false) + path(d, "none", { w: 0.95 })
    + (hoof ? path(`M${rn(b - wb / 2 - 0.04)} ${rn(bot - 0.85)}H${rn(b + wb / 2 + 0.04)}V${rn(bot)}H${rn(b - wb / 2 - 0.04)}Z`, hoof, { w: 0.7 }) : "");
};
/** Patte courte et massive (hippopotame) : bout arrondi, ongles clairs. */
const stub = (x, top, bot, w, col, nail) => path(`M${x} ${top}V${rn(bot - 0.7)}Q${x} ${bot} ${rn(x + 0.7)} ${bot}H${rn(x + w - 0.7)}Q${rn(x + w)} ${bot} ${rn(x + w)} ${rn(bot - 0.7)}V${top}Z`, col)
  + (nail ? dots([[x + 0.7, bot - 0.45], [x + w / 2, bot - 0.4], [x + w - 0.7, bot - 0.45]], 0.3, nail) : "");

/* ---------- hippopotame ---------- */
// Tonneau massif presque au sol, pattes très courtes ; énorme museau carré, yeux et petites oreilles sur le dessus du crâne.
const HIPPO = "#8C7B8A", HIPPO_DARK = "#6E5F6C", HIPPO_PINK = "#E2A3A0";
const hippopotame = [
  stub(12.4, 15.6, 20.6, 2.4, HIPPO_DARK), stub(19.4, 15.4, 20.6, 2.2, HIPPO_DARK),
  thick("M21.7 12.4Q22.7 13 22.6 14.4", HIPPO, 0.5),
  path("M1.8 11.4C1.8 10 2.8 9.2 4 9.2C4.8 9.2 5.4 9.4 5.8 9C6 8 6.8 7.4 7.6 7.6C8.2 7.8 8.4 8 8.8 7.8C10.6 6.8 13 6.6 15.4 6.8C19.2 7.2 21.8 9.2 21.8 12.8C21.8 15.8 20.4 17.4 17.8 17.4H10.6C9.2 17.4 8.2 17 7.4 16.2C6.6 16.8 5.4 17 4 17C2.6 17 1.8 16.2 1.8 14.8Z", HIPPO),
  path("M10.4 17.3Q14.2 15.9 18 17.3Z", HIPPO_PINK, false),
  line("M9.2 8.6Q8.4 11.6 9.4 14.6", HIPPO_DARK, 0.7),
  stub(9.6, 15.8, 21, 2.6, HIPPO, C.grisLight), stub(16.8, 15.8, 21, 2.6, HIPPO, C.grisLight),
  // museau : gueule rose, deux dents, naseaux sur le dessus
  path("M2 13.9Q4.2 14.6 6.6 13.4Q7 15.9 4.6 16.6Q2.4 16.9 2 15Z", HIPPO_PINK, { w: 0.8 }),
  path("M3 14.2V15.3H3.8V14.3Z", C.white, { w: 0.5 }),
  ellipse(2.8, 10.2, 0.45, 0.32, O, false), ellipse(4.2, 9.9, 0.45, 0.32, O, false),
  ellipse(9, 6.9, 0.6, 0.95, HIPPO, { w: 0.8 }),
  circle(7.4, 8.9, 1.1, C.white, { w: 0.75 }), eye(7.3, 9, 0.55),
].join("");

/* ---------- rhinocéros ---------- */
// Corps lourd à bosse d'épaule, tête basse et longue, grande corne recourbée sur le nez (et une seconde plus petite), plis de peau.
const RHINO = "#9C958C", RHINO_DARK = "#7A736A", HORN = "#E6D7BC";
const rhinoceros = [
  shank(13, 15, 21.2, 2.1, 1.7, RHINO_DARK, null, 0.2), shank(19, 14.8, 21.2, 2.1, 1.7, RHINO_DARK, null, -0.2),
  thick("M21.5 12.4Q22.6 13 22.4 14.8", RHINO, 0.5),
  path("M1.8 14.6C1.6 13.6 2 12.8 2.8 12.2L5.8 10.4C6.6 9.4 7.6 9 8.8 9.4C10 7.2 12.6 6.2 15.6 6.8C19.6 7.4 21.6 9.6 21.6 12.8C21.6 15.4 20.2 16.6 17.8 16.6H10.6C9.2 16.6 8.2 16.2 7.6 15.4C6.2 16.2 4.4 16.6 2.8 16C2.2 15.7 1.9 15.2 1.8 14.6Z", RHINO),
  line("M10.8 9.6Q11.8 12.6 11 16.2M17.8 8.2Q19 12 18.2 16.4", RHINO_DARK, 0.8),
  shank(9.6, 15, 21.6, 2.3, 1.9, RHINO, null, 0.1), shank(15.8, 15, 21.6, 2.3, 1.9, RHINO, null, -0.1),
  line("M10.4 21.6V20.9M11.4 21.6V20.9M16.6 21.6V20.9M17.6 21.6V20.9", O, 0.45),
  // cornes et oreille en cornet
  path("M2.1 12.6Q1.3 10 2.6 6.4L3.2 5.2Q3.6 8.6 5.2 11.2Z", HORN, { w: 0.9 }),
  path("M5.7 10.5Q5.7 9 6.8 7.6Q7.3 8.9 7.8 9.8Z", HORN, { w: 0.85 }),
  path("M8.6 9.5L9.1 7Q10.7 7.6 10.4 9.2Z", RHINO, { w: 0.85 }),
  eye(6.9, 12, 0.55), line("M6.2 13.1Q7.2 13.6 8.2 13.1", RHINO_DARK, 0.6),
  line("M1.9 15Q3.2 15.5 4.4 14.9", O, 0.6),
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
// Félin de profil, en marche : corps long et bas, petite tête aux oreilles rondes, longue queue au bout relevé,
// rosettes ouvertes (petits « C » autour d'un cœur plus foncé), quatre pattes distinctes.
const LEO = "#E8AE4C", LEO_LIGHT = "#F6DDA6", LEO_FAR = "#C98A35", ROSE_IN = "#C98A35";
/** Rosette ouverte : un arc brun (presque un cercle) autour d'un cœur ocre foncé. */
const rosette = (x, y, r = 0.72) => path(`M${x - r} ${y + 0.25}A${r} ${r} 0 1 1 ${x + 0.4} ${y + r - 0.05}`, ROSE_IN, { w: 0.55 });
/** Patte de félin : large à l'épaule, fine au poignet, terminée par un pied rond. */
const paw = (x, col) => path(`M${x} 13.2Q${x + 0.1} 17.2 ${x + 0.25} 20.1H${x + 2.1}Q${x + 2.2} 16.8 ${x + 2.6} 13.2Z`, col, { w: 0.95 }) + ellipse(x + 1.2, 20.6, 1.25, 0.62, col, { w: 0.9 });
const leopard = [
  // pattes du côté éloigné (plus foncées), décalées : le léopard marche
  paw(6.2, LEO_FAR), paw(14.9, LEO_FAR),
  // queue : elle retombe puis remonte en crochet, bout sombre
  thick("M19.4 11.2Q22.2 11.6 22 15.4Q21.8 17.9 22.4 18.7", LEO, 1.25),
  circle(22.4, 18.7, 0.55, O, false),
  // corps long et bas
  path("M7.6 11Q8.8 9.2 11.8 9.2H17Q20.6 9.2 20.6 12.1Q20.6 15.1 17.6 15.3H10.6Q7.6 15.1 7.2 13.1Z", LEO),
  path("M10.2 15.2Q13.8 13.9 17.4 15.2Z", LEO_LIGHT, false),
  rosette(10.6, 11.2), rosette(13.4, 10.6), rosette(16.2, 10.9), rosette(18.7, 11.8), rosette(12, 13.3), rosette(15, 13.1), rosette(17.8, 14),
  // pattes du côté proche
  paw(9.2, LEO), paw(17.8, LEO),
  // tête : petite, un peu en avant ; oreilles rondes posées bas
  circle(4.8, 6.6, 0.85, LEO, { w: 0.85 }), circle(4.8, 6.7, 0.32, ROSE_IN, false), circle(7.2, 6.7, 0.85, LEO, { w: 0.85 }), circle(7.2, 6.8, 0.32, ROSE_IN, false),
  path("M3 7.6Q4.8 5.8 7.2 6.5Q9.2 7.2 9.1 9.4Q9 11.7 6.8 12.3Q4.6 12.8 3 11.9Q1.5 11.1 1.8 9.8Q2 8.5 3 7.6Z", LEO),
  ellipse(3.5, 10.5, 1.6, 1.1, LEO_LIGHT, { w: 0.7 }),
  path("M1.7 9.5Q2.4 9.1 2.9 9.6Q2.6 10.3 2 10.2Z", O, { w: 0.4 }),
  line("M2.4 11.5Q3.4 11.9 4.4 11.4", O, 0.5),
  ellipse(4.9, 8.7, 0.62, 0.5, O, false), circle(4.75, 8.55, 0.17, C.white, false),
  line("M4.3 9.2Q3.9 9.8 3.3 9.9", O, 0.4),
  dots([[6.3, 8.2], [7.7, 8.6], [7.4, 10.3], [8.3, 10.1], [6.6, 11.1]], 0.32, O),
].join("");

/* ---------- dromadaire ---------- */
// Une seule bosse haute, long cou en col de cygne qui part bas du poitrail, tête allongée, longues pattes aux genoux marqués.
const CAMEL = "#D3A160", CAMEL_DARK = "#B07E42", CAMEL_LIGHT = "#E9C48C", CAMEL_PAD = "#8A6030";
const dromadaire = [
  shank(12.4, 13.8, 21.4, 1.5, 0.8, CAMEL_DARK, CAMEL_PAD, 0.3), shank(18.2, 13.6, 21.4, 1.5, 0.8, CAMEL_DARK, CAMEL_PAD, -0.2),
  thick("M19.8 12Q20.9 12.8 20.9 15.4", CAMEL, 0.6),
  path("M20.9 15Q21.6 16.2 20.9 17.2Q20.2 16.2 20.9 15Z", CAMEL_PAD, { w: 0.6 }),
  path("M2.2 7.6C1.6 7.2 1.6 6 2.4 5.4C3.2 4.8 4.4 4.6 5.6 4.8C6.6 5 7.2 5.8 7.8 7C8.4 8.4 9 9.6 10 10C10.8 7.4 12.2 5.4 14.2 5.4C16.4 5.4 17.6 7.4 18.6 9.6C19.6 11.2 20 12.4 19.8 13.4C19.6 14.4 18.8 14.8 17.8 14.8H10.8C9.6 14.8 8.8 14.4 8.2 13.4C7.4 11.8 6.6 10.2 5.6 8.8C5 8 4.2 7.8 3.4 7.9C2.9 7.9 2.5 7.8 2.2 7.6Z", CAMEL),
  path("M11.2 8.6Q12.8 5.6 15.2 6.2Q16.6 6.8 17.4 8.4Q14.6 7.2 11.2 8.6Z", CAMEL_LIGHT, false),
  path("M10.8 14.7Q14.4 13.6 17.8 14.7Z", CAMEL_DARK, false),
  shank(9.6, 13.8, 21.6, 1.7, 0.9, CAMEL, CAMEL_PAD, 0.2), shank(15.6, 13.8, 21.6, 1.7, 0.9, CAMEL, CAMEL_PAD, -0.3),
  line("M10 17.8H11.2M15.9 17.8H17.1", CAMEL_DARK, 0.6),
  ellipse(5.8, 4.3, 0.45, 0.8, CAMEL, { w: 0.75 }),
  eye(3.9, 6, 0.5), line("M3.3 5.5Q3.9 5.1 4.5 5.4", O, 0.4),
  circle(2.1, 6.3, 0.22, O, false), line("M1.9 7.2Q2.6 7.6 3.3 7.5", O, 0.45),
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
// Assis de face sur une branche : pelage noir, visage encadré de blanc, long manteau blanc qui pend des flancs,
// longue queue qui retombe et finit en gros plumeau blanc.
const COL = "#26211E";
const singe = [
  thick("M14.6 15Q15.4 17.8 17.8 18.8", COL, 0.8),
  path("M17.2 18.2Q20.4 17.8 22.4 19.8L21.8 20.4L22.8 21.4L21.8 21.8L22.4 22.8Q20.4 22.8 18.6 21.6Q16.8 20.2 17.2 18.2Z", C.white, { w: 0.9 }),
  line("M18.8 19.6Q20.4 20 21.4 21.4", C.grisLight, 0.5),
  thick("M2.4 16.4H21.6", C.bois, 1.4),
  path("M9.2 10Q8.2 11.4 8.4 16.2H15.6Q15.8 11.4 14.8 10Q13.2 9.2 12 9.2Q10.8 9.2 9.2 10Z", COL),
  // manteau blanc des flancs, frangé
  path("M9.2 10.2Q6.6 11.4 6 15Q5.7 17.2 6 19.2L6.8 18.3L7.4 19.6L8 18.4L8.8 19.2Q8.6 16.2 9.2 13.2Q9.6 11.2 9.2 10.2Z", C.white, { w: 0.9 }),
  path("M14.8 10.2Q17.4 11.4 18 15Q18.3 17.2 18 19.2L17.2 18.3L16.6 19.6L16 18.4L15.2 19.2Q15.4 16.2 14.8 13.2Q14.4 11.2 14.8 10.2Z", C.white, { w: 0.9 }),
  ellipse(10.7, 16.3, 1, 0.65, COL, { w: 0.8 }), ellipse(13.3, 16.3, 1, 0.65, COL, { w: 0.8 }),
  // tête : couronne noire, anneau blanc, visage noir
  circle(12, 5.8, 3.4, C.white),
  path("M8.7 5.4Q8.9 2.3 12 2.3Q15.1 2.3 15.3 5.4Q13.6 4.2 12 4.8Q10.4 4.2 8.7 5.4Z", COL, { w: 0.85 }),
  ellipse(12, 6.7, 1.9, 2.2, COL, { w: 0.85 }),
  circle(11.2, 6.2, 0.5, C.ocre, false), circle(12.8, 6.2, 0.5, C.ocre, false),
  eye(11.2, 6.2, 0.25), eye(12.8, 6.2, 0.25),
  path("M11.3 8Q12 8.5 12.7 8", "none", { c: "#7A6E66", w: 0.5 }),
].join("");

/* ---------- phacochère ---------- */
// Tête basse et plate, défenses recourbées vers le haut, verrues ; crinière sur l'échine, queue dressée en antenne à toupet,
// pattes fines.
const WART = "#7F6B5E", WART_DARK = "#4A3B32", WART_SKIN = "#9E8A7C", WART_FAR = "#66554A";
const phacochere = [
  shank(12.8, 14.2, 21, 1.4, 0.8, WART_FAR, WART_DARK, 0.3), shank(19.2, 14, 21, 1.4, 0.8, WART_FAR, WART_DARK, -0.2),
  thick("M20.6 10L21.6 5.6", WART, 0.45),
  path("M21.6 6.2Q20.6 4.4 21.6 2.6Q23 4.2 22.2 6.2Z", WART_DARK, { w: 0.75 }),
  path("M8.4 9.4C10.6 7.8 14.6 7.4 17.8 8.2C20 8.8 21 10.4 20.8 12.4C20.6 14.2 19.6 15 18 15H11C9.4 15 8.4 14.2 7.8 13.2C6.4 15 4.6 15.6 3 15.4C2 15.2 1.8 14 2.4 13.2L5 9.8C5.8 8.8 7 8.6 8.4 9.4Z", WART),
  path("M7.6 9.2L8.4 6.6L9.4 8.2L10.4 6.2L11.2 7.8L12.4 6L13 7.6L14.4 6.2L14.8 7.8L16.2 7L16.4 8.2Q12 7.4 7.6 9.2Z", WART_DARK, { w: 0.75 }),
  shank(10, 14.2, 21.2, 1.4, 0.8, WART, WART_DARK, 0.1), shank(16.4, 14.2, 21.2, 1.4, 0.8, WART, WART_DARK, -0.2),
  // groin, verrues, défenses
  ellipse(2.5, 14.4, 0.8, 1, WART_DARK, { w: 0.75 }),
  ellipse(4.9, 11.4, 0.75, 0.5, WART_SKIN, { w: 0.65 }), ellipse(6.8, 13.4, 0.65, 0.5, WART_SKIN, { w: 0.65 }),
  path("M5.6 14.4Q4 13.2 4.6 11.8Q5.2 13 6.4 13.6Z", C.cream, { w: 0.7 }),
  path("M3.8 14.8Q1.4 14.2 1.6 11.4Q1.8 10.4 2.5 10.2Q2.4 12.6 4.5 13.8Z", C.cream, { w: 0.8 }),
  path("M8 9.3L8.7 6.8L10 8.6Z", WART_SKIN, { w: 0.8 }),
  eye(6.3, 10.7, 0.55),
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
// Bovin Sanga roux : cornes immenses en lyre (plus hautes que l'animal), petite bosse au garrot, fanon, queue à touffe.
const ANK = "#9A3A1E", ANK_DARK = "#7A2C16", ANK_HORN = "#F0E3C6", ANK_TIP = "#8A7860";
const vacheAnkole = [
  shank(12.8, 14.8, 21.4, 1.6, 0.95, ANK_DARK, O, 0.3), shank(18.4, 14.6, 21.4, 1.6, 0.95, ANK_DARK, O, -0.2),
  thick("M20.6 11.4Q21.8 12.6 21.4 17", ANK, 0.5),
  path("M21.4 16.6Q22.3 18 21.5 19.4Q20.6 18 21.4 16.6Z", O, { w: 0.6 }),
  path("M5.4 8.4C6.6 8.2 7.6 8.6 8.4 9.4C9.2 8.4 10.6 8.4 11.4 9.6H18C19.8 9.8 20.6 11.2 20.6 13C20.6 14.8 19.8 15.6 18.4 15.6H10.8C9.4 15.6 8.4 15 7.8 13.8C7 14.6 6 14.8 5.2 14.6L3.4 14.8C2.6 14.8 2.2 14.2 2.4 13.4L3.6 9.8C4 9 4.6 8.6 5.4 8.4Z", ANK),
  path("M8 13.6Q8.6 15.4 10.2 15.6Q9.6 14.4 9.6 12.8Z", ANK_DARK, false),
  path("M10.8 15.5Q14.4 14.4 18.2 15.5Z", ANK_DARK, false),
  shank(9.8, 14.8, 21.6, 1.7, 1, ANK, O, 0.2), shank(15.8, 14.8, 21.6, 1.7, 1, ANK, O, -0.3),
  // cornes en lyre
  path("M4.2 8.8C2 7.6 1 5.4 1.3 2.2C2.3 4.6 3.8 6.4 5.8 7.6Z", ANK_HORN, { w: 0.9 }),
  path("M6.6 8.4C9 7.6 11.4 5.6 12.6 2C13.1 4.8 11.6 7.6 8.2 9.4Z", ANK_HORN, { w: 0.9 }),
  path("M1.3 2.2Q1.7 3.4 2.3 4.4Q1.7 4.4 1.3 4Q1.1 3 1.3 2.2Z", ANK_TIP, { w: 0.6 }),
  path("M12.6 2Q12.9 3.2 12.7 4.2Q12.2 4 11.9 3.8Q12.4 3 12.6 2Z", ANK_TIP, { w: 0.6 }),
  // tête
  g("rotate(-15 7.6 9.8)", ellipse(7.6, 9.8, 1.3, 0.6, ANK, { w: 0.8 })),
  path("M2.4 13.4Q2.2 14.8 3.4 14.8L5.2 14.6Q5.2 13.4 4.4 12.6Q3.2 12.4 2.6 12.8Z", "#C98A6A", { w: 0.7 }),
  circle(3.2, 13.6, 0.22, O, false),
  eye(5, 10.6, 0.55),
].join("");

/* ---------- chèvre naine d'Afrique de l'Ouest ---------- */
// Petite et trapue, pattes courtes ; cornes recourbées vers l'arrière, barbiche, oreille à l'horizontale, queue dressée.
const GOAT = "#8A5634", GOAT_DARK = "#3A2A20", GOAT_LIGHT = "#B98256", GOAT_FAR = "#6E4228";
const chevre = [
  shank(12.6, 14.6, 21.2, 1.6, 0.95, GOAT_FAR, GOAT_DARK, 0.3), shank(18.2, 14.4, 21.2, 1.6, 0.95, GOAT_FAR, GOAT_DARK, -0.2),
  path("M19.8 10.8L21.4 8.2L21.7 10.8Z", GOAT_DARK, { w: 0.85 }),
  path("M2.4 10C1.8 9.6 1.8 8.8 2.2 8.2L4 5.8C4.6 5 5.6 4.8 6.4 5.2C7.4 5.8 7.8 7 8.2 8.4C8.6 9.6 9.4 10 10.6 9.8H17.6C19.2 9.8 20.2 10.8 20.2 12.4C20.2 14.2 19.4 15.4 17.8 15.4H10.4C9.2 15.4 8.2 14.6 7.8 13.4C7.2 11.8 6.4 10.6 5.4 10.4C4.4 10.2 3.2 10.4 2.4 10Z", GOAT),
  line("M8.9 9.7Q9.8 10.5 11 10.4H18.4", GOAT_DARK, 0.9),
  path("M10.6 15.3Q14.2 13.9 17.8 15.3Z", GOAT_LIGHT, false),
  shank(9.8, 14.6, 21.4, 1.7, 1, GOAT, GOAT_DARK, 0.2), shank(15.8, 14.6, 21.4, 1.7, 1, GOAT, GOAT_DARK, -0.3),
  // museau sombre, barbiche, cornes, oreille
  path("M2.3 8.3Q1.7 9.2 2.3 9.9Q3.2 10.4 4.2 10.3Q3.8 9 3 8Z", GOAT_DARK, false),
  path("M2.7 10.1Q2.4 12.2 3.4 13.4Q3.8 11.8 4.4 10.4Z", GOAT_DARK, { w: 0.8 }),
  thick("M5.3 5.3Q5.8 3.4 7.6 2.8Q8.8 2.5 9.6 3.1", C.gris, 0.8),
  path("M6.8 6.1Q8.8 5.6 10 6.8Q9 7.8 7.2 7.3Z", GOAT, { w: 0.85 }),
  circle(4.8, 7.3, 0.62, C.ocreLight, { w: 0.55 }), line("M4.4 7.3H5.2", O, 0.45),
  circle(2.3, 8.6, 0.2, C.sable, false),
].join("");

/* ---------- âne ---------- */
// Grosse tête, très longues oreilles dressées (bouts noirs), crinière courte et raide, museau et ventre clairs,
// raie sombre sur le dos et la croix d'épaule, queue à touffe.
const DONK = "#8F969C", DONK_DARK = "#5E656B", DONK_LIGHT = "#E4E2DC", DONK_FAR = "#737A80";
const ane = [
  shank(12.8, 14.8, 21.4, 1.6, 1, DONK_FAR, O, 0.3), shank(18.6, 14.4, 21.4, 1.6, 1, DONK_FAR, O, -0.2),
  thick("M20.2 11Q21.3 12 21.2 15.6", DONK, 0.5),
  path("M21.2 15.2Q22.2 16.8 21.4 18.4Q20.4 17 21.2 15.2Z", O, { w: 0.6 }),
  // oreilles (derrière la tête)
  path("M5.4 6.2C4.4 4.6 4.2 2.8 4.6 1.6C5.8 2.6 6.6 4.2 6.6 5.8Z", DONK, { w: 0.9 }),
  path("M7.2 6.2C7.6 4.4 8.4 2.8 9.6 2C9.8 3.6 9.2 5.4 8.2 6.8Z", DONK, { w: 0.9 }),
  path("M4.6 1.6Q5.3 2.1 5.7 2.8L5 3.1Q4.6 2.4 4.6 1.6Z", O, { w: 0.5 }), path("M9.6 2Q9.7 2.8 9.5 3.4L8.8 3Q9.1 2.4 9.6 2Z", O, { w: 0.5 }),
  path("M2.4 12.6C1.6 12.2 1.6 11 2.2 10.2L4.6 7C5.4 6 6.6 5.8 7.4 6.4C8.4 7.2 9 8.4 9.8 9.6C10.6 9.8 11.6 9.8 12.6 9.8H17.6C19.4 9.8 20.4 11 20.4 12.6C20.4 14.4 19.6 15.6 17.8 15.6H10.8C9.6 15.6 8.8 15 8.4 14C7.8 12.6 7 11.6 5.8 11.6C4.8 11.6 4 12.2 3.4 12.6C3 12.8 2.7 12.8 2.4 12.6Z", DONK),
  path("M10.8 15.5Q14.2 14.2 17.6 15.5Z", DONK_LIGHT, false),
  line("M10.4 10.5Q14 10.3 18.2 10.6M11.6 10.5Q12 12 11.6 13.4", DONK_DARK, 0.7),
  // crinière raide
  path("M6.8 6Q8.6 5.8 9.8 7.8Q10.3 8.8 10.6 9.7L9.7 9.8Q8.9 8.2 7.3 6.9Z", DONK_DARK, { w: 0.7 }),
  shank(9.8, 14.8, 21.6, 1.7, 1.1, DONK, O, 0.2), shank(15.8, 14.8, 21.6, 1.7, 1.1, DONK, O, -0.3),
  path("M2.3 10.1Q1.6 11 2 12.1Q2.8 12.9 4 12.3Q4.4 11.2 3.8 10.2Q3 9.6 2.3 10.1Z", DONK_LIGHT, { w: 0.7 }),
  circle(2.5, 10.9, 0.25, O, false),
  circle(4.8, 8.6, 0.85, DONK_LIGHT, false), eye(4.8, 8.6, 0.5),
].join("");

/* ---------- hyène tachetée ---------- */
// Dos fuyant : épaules hautes, croupe basse ; grosse tête au museau noir, oreilles rondes, crête sur le cou,
// taches irrégulières, queue courte et touffue, pattes arrière coudées.
const HYE = "#C9A271", HYE_SPOT = "#6B4A2E", HYE_DARK = "#4A3524", HYE_FAR = "#A8834F";
const hyene = [
  shank(12.2, 14, 21.4, 1.7, 1, HYE_FAR, HYE_DARK, 0.2),
  path("M19 14L20.4 17.6L19.8 21H18.8L19.2 17.8L17.6 14.6Z", HYE_FAR, { w: 0.95 }),
  path("M20 11.4Q21.6 11.8 21.8 14.4Q21.2 15.6 20.5 14.4Q20.6 12.8 19.8 12.4Z", HYE_DARK, { w: 0.8 }),
  circle(6.9, 6.1, 1.25, HYE, { w: 0.85 }), circle(6.9, 6.2, 0.55, HYE_DARK, false),
  path("M2.4 12.4C1.6 12 1.6 11 2.2 10.4L3.8 8.6C4.6 7.6 5.8 7.2 7 7.4C8 6.8 9.4 6.6 10.6 7C13.6 8 16.8 9.4 19 10.8C20.2 11.6 20.6 12.8 20.2 14C19.8 15 19 15.4 18 15.4H11.6C10.2 15.4 9.2 15 8.6 14C8 13 7.2 12.4 6.2 12.4C5 12.4 4 12.8 3.2 12.8C2.9 12.7 2.6 12.6 2.4 12.4Z", HYE),
  path("M7.6 7.1L8.2 5.6L9 6.8L9.8 5.5L10.4 6.9L11.4 6.4L11.6 7.6Q9.6 6.6 7.6 7.1Z", HYE_DARK, { w: 0.7 }),
  dots([[11.6, 9.4], [14, 10.4], [16.6, 11.6], [12.6, 12.2], [15.2, 13.2], [18.4, 12.8], [10.2, 11.8]], 0.62, HYE_SPOT),
  shank(9.2, 14, 21.6, 1.8, 1.1, HYE, HYE_DARK, 0.1),
  path("M17 14.4L18.4 18L17.8 21.6H16.6L17 18.2L15.4 14.8Z", HYE, { w: 0.95 }),
  dots([[10.4, 17.2], [10.2, 19.2], [17.2, 17.4]], 0.4, HYE_SPOT),
  path("M1.8 11.2Q1.8 12.4 2.8 12.7Q3.8 12.8 4.4 12.5Q4.2 11 3.2 9.8L2.2 10.4Q1.8 10.8 1.8 11.2Z", HYE_DARK, false),
  circle(2.1, 10.7, 0.25, O, false),
  eye(4.9, 9.3, 0.55),
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
// Antilope fine en plein bond : pattes avant repliées, pattes arrière tendues ; longues cornes en lyre, flanc bicolore,
// ventre blanc, trait noir sur la croupe.
const IMP = "#B8693A", IMP_LIGHT = "#E0A86C", IMP_HORN = "#4A3524", IMP_FAR = "#9A5530";
const impala = [
  thick("M10.8 14.2L9.4 16.6L10.6 18.2", IMP_FAR, 0.75), thick("M16.6 14.6L18.2 18L19.4 21", IMP_FAR, 0.75),
  dots([[10.6, 18.2], [19.4, 21]], 0.5, O),
  path("M20 11Q21.4 10.2 22 10.8Q21.6 12 20.4 12Z", C.white, { w: 0.75 }),
  path("M2.2 9.4C1.8 9 2 8.4 2.6 8L4.6 6.4C5.4 5.8 6.4 5.8 7 6.4C7.6 7.4 8 8.6 8.6 9.8C10.4 9.2 12.6 9 15 9.2C17.6 9.4 19.6 10 20.2 11.4C20.8 12.8 20 14.2 18.4 14.4C15.8 14.8 12.6 14.4 10.4 14C9 13.8 8 13.2 7.4 12.2C6.8 11.2 6.2 10 5.4 9.4C4.6 9.2 3.6 9.4 2.8 9.6C2.6 9.6 2.4 9.5 2.2 9.4Z", IMP),
  path("M8.6 12.3Q13.6 11.2 20.4 12.4Q20.2 13.9 18.4 14.3Q14.4 14.8 10.4 14Q9.1 13.6 8.6 12.3Z", IMP_LIGHT, false),
  path("M10.8 14Q14.6 14.8 18.6 14.2Q15 13.4 10.8 14Z", C.white, false),
  line("M19.4 10.6Q19.9 12 19.4 13.4", O, 0.6),
  thick("M9 13.8L6.8 15.6L7.6 17.6", IMP, 0.75), thick("M18.4 14.2L20.6 17.4L22.2 19.4", IMP, 0.75),
  dots([[7.6, 17.6], [22.2, 19.4]], 0.5, O),
  // cornes en lyre, oreille, tête fine
  thick("M5.6 6.2C4.6 4.6 4.6 2.8 5.6 1.4", IMP_HORN, 0.5),
  thick("M6.8 6.4C8.2 5.2 8.8 3.4 8.4 1.6", IMP_HORN, 0.5),
  g("rotate(-20 8.2 6.8)", ellipse(8.2, 6.8, 1.3, 0.55, IMP, { w: 0.75 })),
  path("M2.2 9.4Q2.8 9.8 3.8 9.4Q3 8.8 2.4 8.4Q2 8.9 2.2 9.4Z", O, false),
  eye(4.6, 7.4, 0.5),
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
const CADRE = { "flamant-rose": [1, 0, -0.3] };
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
