// Boîte à outils des emojis Afroicons : palette, teintes de peau, formes de base.
// Style : couleur à plat + contour arrondi brun très foncé, grille 24 × 24 (zone utile 1 à 23).
// Règles : pas d'identifiant SVG (id, url(#…), clipPath, mask, gradient), pas de currentColor, pas de texte.
// La peau s'écrit avec SKIN / SKIN_SHADE (teinte « foncée » par défaut) : le build la remplace pour les 5 teintes Unicode.

export const O = "#2B1D14";          // contour
export const W = 1.1;                // épaisseur du contour
export const C = {
  ink: "#2B1D14", white: "#FFFFFF", cream: "#FBF5EA",
  terre: "#C24E2A", terreDark: "#9A3A1E", ocre: "#E3A22F", ocreLight: "#F2C14E", indigo: "#22305C", indigoLight: "#3E5EB9",
  vert: "#2E6B4E", vertLight: "#4FA36F", rose: "#E86A8A", rouge: "#D93A2B", bleu: "#3B82C4", ciel: "#8EC5EA",
  violet: "#7B4BA8", marron: "#7A4A2A", bois: "#A86B3C", sable: "#E9D2A6", gris: "#9AA3AB", grisLight: "#D9DEE2",
  noir: "#1F1A15", orange: "#F07A2B", jaune: "#F6C744", jauneShade: "#E3A22F", feuille: "#3F8F4F", eau: "#5BB2E0",
};
/** Visages ronds des smileys (pas de teinte de peau en Unicode) : ocre chaud. */
export const FACE = C.jaune, FACE_SHADE = C.jauneShade;
/** Peau : teinte par défaut « foncée » (Unicode medium-dark 🏾). Le build substitue ces deux couleurs exactes. */
export const SKIN = "#8D5A3B", SKIN_SHADE = "#6F4429";
/** Traits de détail posés sur la peau (doigts, nez, rides) : plus clairs que la peau sur la teinte la plus foncée, pour rester visibles. */
export const SKIN_LINE = "#5B3A26";
export const TONES = {
  light: ["#F3D0B5", "#DDAE8E", "#B07A5E"], "medium-light": ["#E2AE84", "#C78F62", "#9E6B47"], medium: ["#C08354", "#A0663B", "#7C5131"],
  "medium-dark": [SKIN, SKIN_SHADE, SKIN_LINE], dark: ["#5A3824", "#3F2617", "#9A6B4F"],
};
export const DEFAULT_TONE = "medium-dark";
export const TONE_MODIFIERS = { light: "\u{1F3FB}", "medium-light": "\u{1F3FC}", medium: "\u{1F3FD}", "medium-dark": "\u{1F3FE}", dark: "\u{1F3FF}" };

const n = (v) => Math.round(v * 100) / 100;
const a = (o) => Object.entries(o).filter(([, v]) => v !== undefined && v !== null && v !== false).map(([k, v]) => ` ${k}="${typeof v === "number" ? n(v) : v}"`).join("");
const stroke = (s) => (s === false ? { stroke: "none" } : { stroke: s?.c ?? O, "stroke-width": s?.w ?? W });

/** Formes avec remplissage et contour (s = false : sans contour ; s = { c, w } : contour personnalisé). */
export const path = (d, fill = "none", s) => `<path${a({ d, fill, ...stroke(s) })}/>`;
export const circle = (cx, cy, r, fill, s) => `<circle${a({ cx, cy, r, fill, ...stroke(s) })}/>`;
export const ellipse = (cx, cy, rx, ry, fill, s) => `<ellipse${a({ cx, cy, rx, ry, fill, ...stroke(s) })}/>`;
export const rect = (x, y, w, h, rx, fill, s) => `<rect${a({ x, y, width: w, height: h, rx, fill, ...stroke(s) })}/>`;
/** Trait seul (sans remplissage). */
export const line = (d, c = O, w = W) => `<path${a({ d, fill: "none", stroke: c, "stroke-width": w })}/>`;
/** Groupe transformé (rotation, translation, échelle). */
export const g = (transform, ...kids) => `<g transform="${transform}">${kids.join("")}</g>`;

/* ---------- visages (smileys) ---------- */
// Eyes : "dot" (points), "happy" (^ ^ fermés), "wink" (un clin d'œil), "closed" (traits), "heart", "star", "wide" (grands ronds),
//        "sad" (points + sourcils tristes), "angry" (sourcils froncés), "sleepy", "roll" (yeux au ciel), "x".
// Mouth : "smile", "grin" (dents), "laugh" (grande bouche ouverte), "open", "o", "flat", "frown", "tongue", "kiss", "smirk", "wavy".
/** Visage rond complet. extras : chaînes SVG ajoutées par-dessus (larmes, mains, lunettes…). */
export function face({ eyes = "dot", mouth = "smile", color = FACE, blush = false, extras = [] } = {}) {
  const out = [circle(12, 12, 10, color)];
  if (blush) out.push(ellipse(7, 14.2, 1.5, 0.9, C.rose, false), ellipse(17, 14.2, 1.5, 0.9, C.rose, false));
  out.push(EYES[eyes] ?? EYES.dot, MOUTHS[mouth] ?? MOUTHS.smile, ...extras);
  return out.join("");
}
const dot = (x, y, r = 1.15) => circle(x, y, r, O, false);
export const EYES = {
  dot: dot(8.6, 9.6) + dot(15.4, 9.6),
  wide: circle(8.6, 9.4, 1.9, C.white) + circle(15.4, 9.4, 1.9, C.white) + dot(8.6, 9.6, 0.9) + dot(15.4, 9.6, 0.9),
  happy: line("M6.8 10.3Q8.6 8.2 10.4 10.3") + line("M13.6 10.3Q15.4 8.2 17.2 10.3"),
  closed: line("M6.9 10H10.3") + line("M13.7 10H17.1"),
  wink: dot(8.6, 9.6) + line("M13.6 10.1Q15.4 8.4 17.2 10.1"),
  sleepy: line("M6.9 10.2Q8.6 11.4 10.3 10.2") + line("M13.7 10.2Q15.4 11.4 17.1 10.2"),
  heart: path("M8.6 11.8L6.4 9.6A1.3 1.3 0 0 1 8.6 7.9A1.3 1.3 0 0 1 10.8 9.6Z", C.rouge, { w: 0.6 }) + path("M15.4 11.8L13.2 9.6A1.3 1.3 0 0 1 15.4 7.9A1.3 1.3 0 0 1 17.6 9.6Z", C.rouge, { w: 0.6 }),
  star: path("M8.6 7.4L9.3 9L11 9.1L9.7 10.2L10.1 11.9L8.6 11L7.1 11.9L7.5 10.2L6.2 9.1L7.9 9Z", C.white, { w: 0.6 }) + path("M15.4 7.4L16.1 9L17.8 9.1L16.5 10.2L16.9 11.9L15.4 11L13.9 11.9L14.3 10.2L13 9.1L14.7 9Z", C.white, { w: 0.6 }),
  sad: dot(8.6, 10) + dot(15.4, 10) + line("M6.8 7.9L9.8 7.1") + line("M17.2 7.9L14.2 7.1"),
  angry: dot(8.8, 10.2) + dot(15.2, 10.2) + line("M6.6 7.4L10.2 8.8") + line("M17.4 7.4L13.8 8.8"),
  roll: circle(8.6, 9.6, 1.8, C.white) + circle(15.4, 9.6, 1.8, C.white) + dot(8.6, 8.5, 0.8) + dot(15.4, 8.5, 0.8),
  x: line("M7.4 8.4L9.8 10.8M9.8 8.4L7.4 10.8") + line("M14.2 8.4L16.6 10.8M16.6 8.4L14.2 10.8"),
};
export const MOUTHS = {
  smile: line("M8 14.4Q12 17.6 16 14.4"),
  grin: path("M7.6 13.6H16.4Q16.2 17.8 12 17.8Q7.8 17.8 7.6 13.6Z", C.white) + line("M7.9 15.3H16.1"),
  laugh: path("M7.2 13.2H16.8Q16.6 19 12 19Q7.4 19 7.2 13.2Z", C.terreDark) + path("M7.4 13.2H16.6Q16.5 14.6 16.2 15.2H7.8Q7.5 14.6 7.4 13.2Z", C.white, false) + path("M9.4 17.9Q12 16.4 14.6 17.9Q13.5 19 12 19Q10.5 19 9.4 17.9Z", C.rose, false) + path("M7.2 13.2H16.8Q16.6 19 12 19Q7.4 19 7.2 13.2Z", "none"),
  open: ellipse(12, 15.6, 2.4, 1.9, C.terreDark),
  o: ellipse(12, 15.8, 1.4, 1.7, C.terreDark),
  flat: line("M8.6 15.4H15.4"),
  frown: line("M8.2 16.6Q12 13.6 15.8 16.6"),
  tongue: line("M8 14.2Q12 17.2 16 14.2") + path("M11 15.6H14V17.2A1.5 1.5 0 0 1 11 17.2Z", C.rose),
  kiss: line("M11.4 13.8Q13.4 14.4 11.6 15.2Q13.4 16 11.4 16.6"),
  smirk: line("M9.4 15.4Q13 16.4 15.8 14"),
  wavy: line("M8 15.6Q9.3 14.6 10.6 15.6T13.4 15.6T16 15.6"),
};
/** Larme, goutte de sueur, petit cœur, étincelle : accessoires des visages. */
export const tear = (x, y, s = 1) => path(`M${x} ${y}Q${x + 1.4 * s} ${y + 2 * s} ${x} ${y + 2.8 * s}Q${x - 1.4 * s} ${y + 2 * s} ${x} ${y}Z`, C.eau, { w: 0.8 });
export const heart = (cx, cy, s = 1, fill = C.rouge, st) => path(`M${cx} ${cy + 3 * s}L${cx - 3.2 * s} ${cy - 0.2 * s}A${1.8 * s} ${1.8 * s} 0 0 1 ${cx} ${cy - 2.6 * s}A${1.8 * s} ${1.8 * s} 0 0 1 ${cx + 3.2 * s} ${cy - 0.2 * s}Z`, fill, st);
export const sparkle = (cx, cy, r = 2, fill = C.ocreLight, st) => path(`M${cx} ${cy - r}Q${cx + r * 0.18} ${cy - r * 0.18} ${cx + r} ${cy}Q${cx + r * 0.18} ${cy + r * 0.18} ${cx} ${cy + r}Q${cx - r * 0.18} ${cy + r * 0.18} ${cx - r} ${cy}Q${cx - r * 0.18} ${cy - r * 0.18} ${cx} ${cy - r}Z`, fill, st);

/* ---------- personnes (bustes, avec teinte de peau) ---------- */
/** Buste : tête, cou, épaules (vêtement), cheveux optionnels. hair : SVG dessiné avant la tête (chignon, tresses) ;
 *  top : SVG dessiné après (coiffe, gele, chapeau). Les yeux et la bouche sont simples, pour rester lisibles. */
export function bust({ cloth = C.terre, collar, hair = "", top = "", smile = true, extras = [] } = {}) {
  return [
    hair,
    path("M3.5 23C3.5 18.6 7 16.4 12 16.4S20.5 18.6 20.5 23Z", cloth),
    collar ?? "",
    path("M10.2 14.6V17.2Q12 18.4 13.8 17.2V14.6Z", SKIN_SHADE, { w: 0.9 }),
    ellipse(12, 10, 4.6, 5.2, SKIN),
    dot(10.3, 10, 0.6), dot(13.7, 10, 0.6),
    smile ? line("M10.4 12.6Q12 13.8 13.6 12.6", O, 0.9) : line("M10.6 13H13.4", O, 0.9),
    top,
    ...extras,
  ].join("");
}

/* ---------- mains (avec teinte de peau) ---------- */
/** Main ouverte, paume face à nous, doigts vers le haut (base de ✋ 👋 🙌). */
export const handOpen = () =>
  path("M7.2 13.4V7.6A1.2 1.2 0 0 1 9.6 7.6V11.6V5A1.2 1.2 0 0 1 12 5V11.4V5.6A1.2 1.2 0 0 1 14.4 5.6V11.8V7.8A1.2 1.2 0 0 1 16.8 7.8V15.4Q16.8 20.8 12 20.8Q8.6 20.8 7 17.6L4.6 13.2A1.2 1.2 0 0 1 6.6 12Z", SKIN)
  + line("M9.6 11.6V12.6M12 11.4V12.6M14.4 11.8V12.6", SKIN_SHADE, 0.8);

/* ---------- vaisselle et contenants ---------- */
export const bowl = (fill = C.terre, food = "") => food + path("M3.5 12.5H20.5Q20.2 19.5 12 19.5Q3.8 19.5 3.5 12.5Z", fill) + line("M8 21H16", O, W);
export const plate = (food = "", fill = C.white) => ellipse(12, 15.5, 9.5, 4.2, fill) + ellipse(12, 15.2, 6.5, 2.6, C.grisLight, false) + food;
export const cup = (fill = C.white, drink = C.marron) => path("M6 7.5H16L15 19.5Q14.9 20.5 13.9 20.5H8.1Q7.1 20.5 7 19.5Z", fill) + path("M6.4 9.5H15.6", "none") + ellipse(11, 7.6, 5, 1.2, drink, { w: 0.8 }) + path("M16 10H17.5A2.2 2.2 0 0 1 17.5 14.4H15.5", "none");

/** Planche de contrôle : écrit un HTML avec chaque emoji en 96 px et 24 px, à ouvrir ou capturer avec Chrome. */
export function sheet(list, file) {
  const svg = (b, s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">${b}</svg>`;
  const html = `<body style="margin:12px;background:#FBF5EA;font:11px sans-serif">${list.map((e) => `<div style="display:inline-flex;flex-direction:column;align-items:center;gap:4px;width:118px;margin:6px;text-align:center">${svg(e.body, 88)}<div>${svg(e.body, 24)} ${svg(e.body, 16)} <span style="font-size:22px">${e.char ?? ""}</span></div>${e.fr}</div>`).join("")}</body>`;
  return import("node:fs").then(({ writeFileSync }) => writeFileSync(file, html));
}
