// Emojis faune d'Afrique (lot B) : forêts, primates et Madagascar (dessins originaux Afroicons).
// Animaux de profil (tête à gauche) ou de face pour les primates, couleur à plat et contour brun foncé.
import { O, W, C, path, circle, ellipse, rect, line, g } from "./lib.mjs";

/** Trait épais « plein » : contour brun puis couleur par-dessus (queues, pattes fines, cornes). */
const thick = (d, col, w = 1.5) => line(d, O, w + 2 * W) + line(d, col, w);
const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const eye = (x, y, r = 0.55) => circle(x, y, r, O, false);
/** Patte droite arrondie, avec sabot ou pied plus sombre. */
/** Patte effilée : large en haut, plus fine en bas (sabot ou pied plus sombre en option). */
const leg = (x, top, bottom, w, fill, foot) => {
  const b = w * 0.68, l = x + (w - b) / 2 + 0.15, R = b / 2;
  const shape = path(`M${x} ${top}H${x + w}L${l + b} ${bottom - R}Q${l + b} ${bottom} ${l + R} ${bottom}Q${l} ${bottom} ${l} ${bottom - R}Z`, fill);
  return shape + (foot ? path(`M${l - 0.05} ${bottom - 1.1}H${l + b + 0.05}V${bottom - R}Q${l + b} ${bottom} ${l + R} ${bottom}Q${l} ${bottom} ${l} ${bottom - R}Z`, foot, { w: 0.8 }) : "");
};

/** Membre effilé de (x1,y1) à (x2,y2), largeur w1 en haut, w2 en bas, bout arrondi ; sabot/pied sombre en option. */
const limb = (x1, y1, x2, y2, w1, w2, fill, foot, fl = 1.1) => {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
  const P = (x, y, w, sgn) => `${Math.round((x + sgn * nx * w / 2) * 100) / 100} ${Math.round((y + sgn * ny * w / 2) * 100) / 100}`;
  const seg = (t0, wa) => `M${P(x1 + dx * t0, y1 + dy * t0, wa, 1)}L${P(x2, y2, w2, 1)}A${w2 / 2} ${w2 / 2} 0 0 0 ${P(x2, y2, w2, -1)}L${P(x1 + dx * t0, y1 + dy * t0, wa, -1)}Z`;
  const t = 1 - fl / L, wt = w1 + (w2 - w1) * t;
  return path(seg(0, w1), fill) + (foot ? path(seg(t, wt), foot, { w: 0.8 }) : "");
};
/** Anneaux sur une queue : tirets sans contour le long d'une cubique. */
const rings = (p0, c1, c2, p3, n, on, col, w) => {
  const B = (t) => [0, 1].map((k) => (1 - t) ** 3 * p0[k] + 3 * (1 - t) ** 2 * t * c1[k] + 3 * (1 - t) * t * t * c2[k] + t ** 3 * p3[k]);
  let d = "";
  for (let i = 0; i < n; i++) { const a = (i + 0.5) / n - on / (2 * n), b = a + on / n; const q = [0, 1, 2, 3].map((k) => B(a + ((b - a) * k) / 3)); d += "M" + q.map(([x, y]) => `${Math.round(x * 100) / 100} ${Math.round(y * 100) / 100}`).join("L"); }
  return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="butt"/>`;
};

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

/* ---------- babouin olive : épaules à crinière plus hautes que la croupe, museau de chien, queue « cassée » ---------- */
const BAB = "#8E8858", BAB_DARK = "#6A6542", BAB_MUZ = "#4C4640";
const babouin = [
  limb(8.8, 12.6, 8.4, 20.6, 1.6, 1.1, BAB_DARK, BAB_MUZ), limb(15.6, 13.6, 15.8, 20.6, 1.7, 1.1, BAB_DARK, BAB_MUZ),
  // queue : elle monte, se casse net, puis pend
  thick("M19.2 11C19.8 9.6 20.6 8.6 21.4 8.8C22 9.2 22.2 10.6 22.1 12.4L22.2 15.8", BAB, 1.1),
  path("M1.8 12C1.8 11.2 2.4 10.6 3.4 10.2C3.8 9 4.8 8.4 6 8.4C6.8 8.4 7.4 8.2 8 7.6C8.8 6.8 10.2 6.6 11.4 7.2C13.6 8.4 16.4 9.4 18.4 10.2C19.8 10.8 20.2 12.6 19.4 13.8C19 14.4 18.4 14.6 17.8 14.6H11C10 14.4 9.2 13.8 8.6 13.2C7.6 13.2 6.6 13.2 5.6 13.2C4.4 13.4 3.2 13.6 2.4 13.2C2 13 1.8 12.6 1.8 12Z", BAB),
  // crinière des épaules, plus sombre
  path("M8 7.6C8.8 6.8 10.2 6.6 11.4 7.2C12.6 7.8 13 9.6 12.6 11.4C12.4 12.6 11.8 13.6 11 14.2C10.2 13.8 9.4 13.4 8.8 12.8C8.8 11 8.6 9.2 8 7.6Z", BAB_DARK, { w: 0.8 }),
  path("M19.6 11.6Q20.6 12.4 20 13.6Q19.2 13.4 19.2 12.4Z", "#C98A7A", { w: 0.6 }),
  limb(11.6, 13.6, 11.8, 20.6, 1.6, 1.1, BAB, BAB_MUZ), limb(18.4, 13.4, 19, 20.6, 1.7, 1.1, BAB, BAB_MUZ),
  // long museau sombre, nez au bout
  path("M1.8 12C1.8 11.2 2.4 10.6 3.4 10.2L5.2 9.8Q5.8 11.6 5.2 13.2C4.2 13.4 3.2 13.6 2.4 13.2C2 13 1.8 12.6 1.8 12Z", BAB_MUZ, { w: 0.8 }),
  ellipse(2.1, 11.4, 0.35, 0.3, O, false), line("M2.4 12.4Q3.6 12.4 4.6 11.9", O, 0.5),
  line("M5.2 9.2Q6.2 8.8 7.2 9.2", O, 0.6),
  circle(6.2, 10.2, 0.7, "#E3A22F", { w: 0.55 }), eye(6.2, 10.25, 0.38),
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
  limb(7.4, 15.6, 7, 21.4, 1.5, 1.1, LEM_DARK, C.noir, 0.9), limb(13.4, 15.6, 13, 21.4, 1.5, 1.1, LEM_DARK, C.noir, 0.9),
  // queue dressée en crosse, anneaux noirs et blancs
  path("M14.6 14.6Q21.6 14.6 21.8 8.6Q22 3.6 17.4 2.6Q15 2.2 14.4 3.8Q14.2 5.2 16.4 5.4Q18.8 5.8 18.8 8.6Q18.6 11.4 14.6 11.6Z", C.white),
  path("M19 12.8L21 14.2Q21.8 13.2 22 12L19.6 11.6ZM18.8 8.8H21.8Q21.8 7.6 21.6 6.8L18.6 7.4ZM17.4 5.6L19.2 3.4Q18.4 2.8 17.4 2.6L16.4 5.4Z", C.noir, false),
  path("M14.6 14.6Q21.6 14.6 21.8 8.6Q22 3.6 17.4 2.6Q15 2.2 14.4 3.8Q14.2 5.2 16.4 5.4Q18.8 5.8 18.8 8.6Q18.6 11.4 14.6 11.6Z", "none"),
  path("M6.4 12.6Q10 10.8 14.4 11.6Q17.6 12.2 17.2 15Q16.8 17.4 14.4 17.4H8.4Q6 17 6 14.6Z", LEM),
  path("M7 15.6Q10 14.8 12.8 15.6Q14.4 16.2 15.6 17.4H8.4Q7.2 17.2 7 15.6Z", LEM_BELLY, false),
  limb(10, 16, 10.2, 21.8, 1.5, 1.1, LEM, C.noir, 0.9), limb(16, 16, 16.4, 21.8, 1.5, 1.1, LEM, C.noir, 0.9),
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

/* ---------- fossa : corps bas et long, petite tête ronde, queue aussi longue que le corps ---------- */
const FOS = "#A0603A", FOS_DARK = "#7E4626", FOS_LIGHT = "#C98A5E";
const fossa = [
  limb(8.4, 13.6, 8, 19.6, 1.6, 1.1, FOS_DARK), limb(14, 13.8, 13.6, 19.6, 1.6, 1.1, FOS_DARK),
  thick("M18.6 11.6C21 12 22.2 14 22.1 16.6C22 19 20.8 20.6 18.8 20.6", FOS, 1.15),
  path("M2 11.6C2.4 10.6 3.4 10 4.6 9.8C5 8.6 5.8 7.8 6.8 8C7.8 8.2 8.2 9.2 8 10.2C10.4 10.6 13.4 10.4 16 10.4C17.8 10.4 19 11.4 18.8 12.8C18.6 13.8 17.8 14.4 16.8 14.6H9.4C8.2 14.4 7.2 13.6 6.4 12.8C5.2 12.8 3.8 12.8 2.8 12.6C2.2 12.4 1.8 12 2 11.6Z", FOS),
  path("M9.6 14.4Q13 13.4 16.6 14.4Z", FOS_LIGHT, false),
  limb(11.2, 14, 11.4, 19.6, 1.6, 1.1, FOS), limb(16.8, 13.8, 17.2, 19.6, 1.6, 1.1, FOS),
  circle(6.8, 9, 0.5, FOS_DARK, false),
  path("M2 11.6C2.2 11 2.8 10.6 3.4 10.6Q3.8 11.6 3.6 12.6C3.2 12.6 2.6 12.4 2.3 12.2Q1.9 11.9 2 11.6Z", FOS_LIGHT, { w: 0.5 }),
  ellipse(2.1, 11.3, 0.38, 0.3, O, false),
  circle(4.9, 10.8, 0.62, "#E3A22F", { w: 0.5 }), eye(4.85, 10.85, 0.34),
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

/* ---------- bongo : robe rousse, fines rayures blanches, grandes cornes spiralées ---------- */
const BON = "#B4502A", BON_DARK = "#8A3A1C", BON_HORN = "#6E5A44";
const bongo = [
  limb(9.4, 14.2, 9.2, 20.8, 1.4, 0.9, BON_DARK, C.noir), limb(16, 14.4, 16.2, 20.8, 1.5, 0.9, BON_DARK, C.noir),
  thick("M20.1 11.4L21.4 14", BON, 0.6),
  path("M2.4 9.6C2 9 2.4 8.2 3.2 7.6L5 6.2C5.8 5.8 6.6 6 7.2 6.6C8 7.8 8.6 9 9.4 9.8C12 10 15 9.6 17.6 9.8C19.4 10 20.4 11.2 20.2 12.8C20 14.2 19 15 17.6 15.2H10.4C9.2 15 8.4 14.2 7.8 13.2C7 11.8 6 10.6 4.8 9.8C4 10 3 10 2.4 9.6Z", BON),
  path("M9.4 9.8C12 10 15 9.6 17.6 9.8L17.4 10.6C14.8 10.4 12 10.8 9.8 10.6Z", BON_DARK, false),
  line("M12.4 10.8V14.6M14.8 10.6V14.8M17.2 10.6V14.8", C.white, 0.7),
  path("M7.6 11.6L9 11.2L8.4 12.8Z", C.white, false),
  limb(12.2, 14.4, 12, 20.8, 1.4, 0.9, BON, C.noir), limb(18.8, 14.2, 19.2, 20.8, 1.5, 0.9, BON, C.noir),
  line("M11.6 18.2H12.6M18.6 18.2H19.6", C.white, 0.6),
  // museau sombre, joues blanches
  path("M2.4 9.6C2 9 2.4 8.2 3.2 7.6L3.8 7.2Q4.2 8.6 3.6 9.9C3.2 9.9 2.7 9.8 2.4 9.6Z", "#4A2E1E", { w: 0.6 }),
  line("M4.2 9.2Q5 9.4 5.8 8.8", C.white, 0.6),
  // cornes torsadées en lyre, pointes ivoire
  thick("M5.6 5.8C6.6 4.8 5.6 3.6 6.8 2.8C7.8 2.2 8.6 2.8 9.4 2", BON_HORN, 0.65),
  circle(9.4, 2, 0.4, C.cream, { w: 0.5 }),
  path("M6.8 6.4L9.4 5.4Q9.6 6.8 7.6 7.2Z", BON, { w: 0.8 }),
  eye(4.7, 7.5, 0.48),
].join("");

/* ---------- sitatunga : antilope des marais, croupe haute, pelage brun hirsute, pattes dans l'eau ---------- */
const SIT = "#7C6048", SIT_DARK = "#5E4634", SIT_HORN = "#5A4A3A";
const sitatunga = [
  limb(9.8, 14.4, 9.4, 19.4, 1.4, 1, SIT_DARK), limb(16.4, 14.6, 17, 19.4, 1.5, 1, SIT_DARK),
  thick("M20.2 11L21.2 12.8", SIT, 0.6),
  path("M2.6 10.6C2.2 10 2.6 9.2 3.4 8.6L5.2 7.2C6 6.8 6.8 7 7.4 7.6C8.2 8.8 8.8 9.8 9.6 10.4C12 10 14.6 8.8 17 8.8C19.2 8.8 20.6 10.4 20.4 12.4C20.2 14 19.2 15 17.6 15.2H10.6C9.4 15 8.6 14.2 8 13.2C7.2 12 6.2 11.2 5 10.8C4.2 11 3.2 11 2.6 10.6Z", SIT),
  line("M7.2 9.4L6.6 10.6M8.4 10.8L7.8 12M10.4 14.8L10.2 15.6M13 15.2L12.9 16M15.6 15.2L15.6 16", SIT_DARK, 0.6),
  dots([[13.6, 12.2], [16.4, 11.8], [18.6, 12.4]], 0.5, "#EDE3D0"),
  limb(12.6, 14.6, 12.4, 19.4, 1.4, 1, SIT), limb(19.2, 14.4, 19.8, 19.4, 1.5, 1, SIT),
  path("M4.4 8.2L5.6 8.8", "none", { c: C.white, w: 0.7 }),
  thick("M5.8 6.8C6.4 5.4 6 4.2 7.4 3.4C8.6 2.8 9.6 3 10.6 2.2", SIT_HORN, 0.6),
  circle(10.6, 2.2, 0.38, C.cream, { w: 0.5 }),
  path("M7.2 7.4L9.6 6.8Q9.8 8 7.8 8.4Z", SIT, { w: 0.8 }),
  eye(4.8, 8.6, 0.48),
  // eau du marais, roseaux
  path("M1.4 19.4Q3.2 18.4 5 19.4T9 19.4T13 19.4T17 19.4T21 19.4Q21.8 19 22.6 19.4V22.2H1.4Z", C.eau),
  line("M3 21Q5 20.2 7 21M12.4 21.2Q14.4 20.4 16.4 21.2", C.white, 0.7),
  thick("M21.6 19L21.4 14.6M22.4 19L22.6 16", C.feuille, 0.45),
].join("");

/* ---------- potamochère roux : robe orange, masque noir et blanc, oreilles pointues à long pinceau ---------- */
const POT = "#C8572C", POT_DARK = "#2B211C", POT_FACE = "#3A2E28", POT_FAR = "#A24420";
const potamochere = [
  limb(9.6, 15, 9.4, 20.2, 1.6, 1.1, "#1E1916"), limb(15.8, 15, 15.6, 20.2, 1.7, 1.1, "#1E1916"),
  thick("M20.4 11.2C21.6 11.6 22.2 12.8 21.8 14.4", POT, 0.5),
  path("M21.4 14L22.4 15.6L21.2 15.4Z", POT_DARK, { w: 0.5 }),
  path("M1.8 14.6C1.6 13.6 2.2 12.6 3.2 12L6 10.4C7.4 9.6 8.8 9.4 10 9.6C12.6 8.6 15.4 8.4 17.8 9C20 9.6 21 11.4 20.6 13.4C20.2 15 19 15.8 17.6 15.8H10.4C9.4 15.6 8.6 15 8 14.4C6.4 14.8 4.6 15.2 3.2 15.4C2.4 15.4 1.9 15.1 1.8 14.6Z", POT),
  // crête dorsale blanche
  path("M10.4 9.8C12.8 9 15.4 8.8 17.8 9.4L17.6 10C15.4 9.6 12.8 9.8 10.6 10.6Z", C.white, false),
  limb(12.4, 15.2, 12.6, 20.2, 1.6, 1.1, POT_DARK), limb(18.6, 14.8, 19, 20.2, 1.7, 1.1, POT_DARK),
  // tête noire, trait blanc sur la joue et autour de l'œil
  path("M1.8 14.6C1.6 13.6 2.2 12.6 3.2 12L6 10.4C7 9.8 8 9.6 8.8 9.6Q9.6 11.8 8.2 14.4C6.4 14.8 4.6 15.2 3.2 15.4C2.4 15.4 1.9 15.1 1.8 14.6Z", POT_FACE),
  line("M4.2 13.8L7.4 12.8", C.white, 0.7),
  circle(6.2, 11.6, 0.8, C.white, false), eye(6.15, 11.6, 0.42),
  ellipse(1.9, 14.2, 0.55, 0.85, "#5A4840", { w: 0.6 }),
  // oreille pointue et son pinceau blanc
  path("M7.6 10.4L9.4 5.8L10.8 9.6Z", POT, { w: 0.9 }),
  thick("M9.4 5.8C10.6 4.6 12.2 4.8 12.8 6.4", C.white, 0.6),
].join("");

/* ---------- hylochère : très grand porc noir, poil long hérissé sur le dos, joues renflées ---------- */
const HYL = "#2E2621", HYL_FAR = "#1E1916", HYL_SKIN = "#5E534C";
const hylochere = [
  limb(9.8, 15.6, 9.6, 21, 1.8, 1.3, HYL_FAR), limb(16, 15.8, 15.8, 21, 1.9, 1.3, HYL_FAR),
  thick("M21.2 12C22.4 12.6 22.7 13.8 22.3 15", HYL, 0.5),
  path("M1.6 15.2C1.4 14 2 13 3 12.2L5.4 10.2C6.4 9.2 7.6 8.6 8.8 8.4L9.4 6.4L11 7.8L12.2 5.6L13.8 7.2L15.2 5.4L16.4 7.2L18.2 6L18.6 8.2C20.6 9.4 21.8 11.4 21.4 13.6C21 15.4 19.6 16.4 18 16.4H10.6C9.4 16.2 8.6 15.4 8 14.6C6.6 15.2 4.8 15.8 3.2 16C2.2 16 1.7 15.7 1.6 15.2Z", HYL),
  line("M11.4 10.4L11 12.4M14 9.4L13.8 11.6M16.6 9.6L16.8 11.8M19 11L19.4 12.8", "#4A3E36", 0.6),
  limb(12.6, 15.8, 12.8, 21, 1.8, 1.3, HYL), limb(18.8, 15.4, 19.2, 21, 1.9, 1.3, HYL),
  // joue renflée nue, groin large, petite défense
  path("M4.4 13.8Q5.8 12 7.8 13.2Q7.4 14.8 5.4 15.2Q4.4 15 4.4 13.8Z", HYL_SKIN, { w: 0.7 }),
  ellipse(1.9, 14.6, 0.6, 0.9, HYL_SKIN, { w: 0.7 }),
  path("M3.4 14.8Q3 13.6 3.6 12.8Q4 13.8 4.4 14.4Z", C.cream, { w: 0.5 }),
  path("M7.6 9.8L8.4 7.8L9.8 9.4Z", HYL, { w: 0.8 }),
  circle(6.2, 11.2, 0.62, "#C9A88A", false), eye(6.2, 11.2, 0.38),
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

/* ---------- genette commune : fine et basse, taches en lignes, très longue queue annelée ---------- */
const GEN = "#DCCFB2", GEN_FAR = "#BFB094", GEN_DARK = "#2B211C";
const genette = [
  limb(7.4, 14, 7.2, 19, 1.3, 0.9, GEN_FAR, GEN_DARK, 0.9), limb(12.6, 14.2, 12.4, 19, 1.4, 0.9, GEN_FAR, GEN_DARK, 0.9),
  // très longue queue, anneaux noirs
  thick("M16.4 12.2C19 12.2 21 13.4 22.4 15.6", GEN, 1.3),
  rings([16.4, 12.2], [19, 12.2], [21, 13.4], [22.4, 15.6], 4, 0.45, GEN_DARK, 1.3),
  path("M1.6 12.6C1.8 12 2.6 11.4 3.6 11L4.6 8.6L6 10.4C7 10.4 8 10.8 9 11C11 11 13 10.8 14.6 11C16 11.2 16.8 12 16.6 13.2C16.4 14.2 15.6 14.6 14.6 14.6H8.4C7.4 14.4 6.6 13.8 6 13.4C4.8 13.4 3.4 13.4 2.4 13.2C1.8 13.1 1.5 12.9 1.6 12.6Z", GEN),
  line("M7.4 11.2Q11.6 10.6 15.8 11.4", GEN_DARK, 0.6),
  dots([[9, 12.6], [11.3, 12.4], [13.6, 12.6], [10.2, 13.8], [12.6, 13.8], [14.8, 13.4]], 0.45, GEN_DARK),
  limb(10, 14.2, 10.2, 19, 1.3, 0.9, GEN, GEN_DARK, 0.9), limb(15.2, 14, 15.6, 19, 1.4, 0.9, GEN, GEN_DARK, 0.9),
  path("M4.4 9.4L4.7 9L5.4 10.2Z", "#C9A88A", false),
  path("M2.6 11.6Q3.8 11 5.2 11.8Q4.4 12.8 3 12.6Z", "#7A6A58", false),
  ellipse(1.75, 12.6, 0.36, 0.3, O, false),
  circle(3.9, 11.9, 0.52, C.white, false), eye(3.9, 11.9, 0.34),
].join("");

/* ---------- civette africaine : massive, dos voûté à crête, masque et pattes noirs, queue épaisse ---------- */
const CIV = "#B3AA98", CIV_DARK = "#26201C";
const civette = [
  limb(10, 15.6, 9.8, 20.8, 1.7, 1.2, "#151210"), limb(15.8, 15.8, 15.6, 20.8, 1.8, 1.2, "#151210"),
  thick("M20.2 12.8C21.8 13.8 22.4 15.8 22 18.2", CIV, 1.5),
  rings([20.2, 12.8], [21.8, 13.8], [22.4, 15.8], [22, 18.2], 3, 0.42, CIV_DARK, 1.5),
  path("M1.6 14.8C1.6 14 2.2 13.4 3.2 13L5.2 11.6C6 11 7 11 7.8 11.4C9.4 9 12 7.6 15 7.8C18.4 8.2 20.6 10.6 20.4 13.6C20.2 15.6 18.8 16.4 17.4 16.4H10.4C9.2 16.2 8.4 15.4 7.8 14.8C6.4 15.2 4.8 15.6 3.4 15.6C2.4 15.6 1.7 15.3 1.6 14.8Z", CIV),
  // crête de poils noirs sur le dos
  path("M9.2 9.8C11 8.2 13 7.6 15 7.8C17 8 18.6 8.8 19.6 10.2L18.8 10.4C17.6 9.4 16.2 8.8 14.8 8.8C12.8 8.8 11 9.4 9.8 10.6Z", CIV_DARK, false),
  dots([[12.6, 11.6], [15.2, 11], [17.6, 12.2], [14.2, 13.6], [16.8, 14.4], [11.6, 13.8]], 0.6, CIV_DARK),
  path("M8.4 11.6Q10 13.2 9.8 16H8.6Q8.4 14 7.4 12.6Z", CIV_DARK, false),
  limb(12.8, 15.8, 13, 20.8, 1.7, 1.2, CIV_DARK), limb(18.6, 15.4, 19, 20.8, 1.8, 1.2, CIV_DARK),
  // masque noir, museau clair
  path("M3.2 13L5.2 11.6C6 11 7 11 7.8 11.4Q8.4 13.4 7.8 14.8C6.4 15.2 4.8 15.6 3.6 15.6Q2.8 14.4 3.2 13Z", CIV_DARK, false),
  path("M1.6 14.8C1.6 14 2.2 13.4 3.2 13Q3.6 14.4 3.4 15.6C2.4 15.6 1.7 15.3 1.6 14.8Z", "#DCD6CA", { w: 0.5 }),
  ellipse(1.75, 14.6, 0.36, 0.3, O, false),
  path("M6.4 11.2Q6.4 9.8 7.6 9.8Q8 10.8 7.6 11.4Z", "#DCD6CA", { w: 0.6 }),
  circle(5.2, 12.6, 0.55, C.ocreLight, false), eye(5.2, 12.6, 0.3),
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
  limb(9.2, 15.6, 9, 19.6, 1.4, 1, "#151210"), limb(15.6, 15.6, 15.4, 19.6, 1.4, 1, "#151210"),
  // dos hérissé
  path("M21.4 16.6Q22 13 19.8 11.4L20.4 9.4L18.6 10L18.6 7.8L17 9L16.6 6.6L15.2 8.4L14.2 6.2L13 8.2L11.6 6.4L10.8 8.6L9.2 7.4L8.8 9.6L7.2 9.2L7.4 11Q6 11.8 5 13.2L2 15.2Q1.4 16 2.2 16.6L5.6 17.2Q12.6 18.2 21.4 16.6Z", TEN),
  // rayures jaunes
  path("M8.4 11.6Q13.6 8.6 19.4 11.8", "none", { c: TEN_Y, w: 0.9 }),
  path("M7.4 13.8Q13.4 11.2 20.6 14", "none", { c: TEN_Y, w: 0.9 }),
  path("M12 8.6L12.4 10.4M15.4 8.4L15.4 10.2", "none", { c: TEN_Y, w: 0.7 }),
  limb(11.8, 16, 12, 20, 1.4, 1, TEN), limb(18, 16, 18.4, 20, 1.4, 1, TEN),
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

/* ---------- céphalophe roux : petite antilope de forêt, dos très arrondi, tête basse, toupet entre deux cornes courtes ---------- */
const CEP = "#B4502A", CEP_DARK = "#8A3A1C", CEP_TUFT = "#2B211C";
const cephalophe = [
  limb(9.4, 15, 9.2, 20.6, 1.3, 0.85, CEP_DARK, CEP_TUFT, 0.9), limb(16.2, 15.2, 16.6, 20.6, 1.4, 0.85, CEP_DARK, CEP_TUFT, 0.9),
  thick("M20.2 12.6L21.4 12", CEP, 0.5), circle(21.5, 11.95, 0.4, C.white, { w: 0.5 }),
  path("M2 15C1.8 14.2 2.4 13.6 3.2 13.2L5.4 12C6 11.6 6.6 11.4 7.2 11.6C8.8 9.8 11.4 8.6 14.4 8.6C17.6 8.8 19.8 10.6 20.2 13C20.4 14.6 19.4 15.6 17.8 15.6H10.4C9.4 15.4 8.8 14.8 8.4 14.2C7 14.8 5.2 15.6 3.6 15.8C2.6 15.8 2.1 15.5 2 15Z", CEP),
  path("M8.6 10.6C10.4 9.2 12.4 8.6 14.4 8.6C16.8 8.8 18.6 9.8 19.6 11.2L18.8 11.4C17.6 10.2 16 9.6 14.4 9.6C12.4 9.6 10.6 10.2 9.2 11.2Z", CEP_DARK, false),
  limb(12.2, 15.2, 12.4, 20.6, 1.3, 0.85, CEP, CEP_TUFT, 0.9), limb(18.8, 14.8, 19.4, 20.6, 1.4, 0.85, CEP, CEP_TUFT, 0.9),
  // cornes courtes vers l'arrière, toupet noir, oreille
  thick("M5.4 11.8L7.6 8.6", "#4A3A2E", 0.5),
  path("M5.4 11.4Q5.6 9.8 6.8 9.6Q7.6 10.6 6.8 11.6Z", CEP_TUFT, { w: 0.6 }),
  path("M7.2 12.2L10 11.2Q10 12.4 8 13Z", CEP, { w: 0.8 }),
  path("M2 15C1.8 14.2 2.4 13.6 3.2 13.2Q3.6 14.6 3.2 15.8C2.6 15.7 2.1 15.4 2 15Z", CEP_TUFT, { w: 0.5 }),
  line("M3.4 13.4L4.6 14", CEP_TUFT, 0.5),
  eye(4.1, 13.5, 0.45),
].join("");

const A = (slug, fr, en, char, tags, body) => ({ slug, fr, en, char, group: "animaux", tags, tone: false, body });
/** Recadrage (audit du dessin) : ces dessins débordaient de la grille 24 × 24 (ou étaient décentrés) ;
 *  ils sont réduits et décalés juste assez pour y tenir : [échelle, décalage x, décalage y]. */
const CADRE = { "babouin": [1, -0.3, 0] };
const cadre = (e) => { const f = CADRE[e.slug]; return f ? { ...e, body: `<g transform="translate(${Math.round((12 + f[1]) * 100) / 100} ${Math.round((12 + f[2]) * 100) / 100}) scale(${f[0]}) translate(-12 -12)">${e.body}</g>` } : e; };
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
].map(cadre);
