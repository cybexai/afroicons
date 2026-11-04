// Emojis africains originaux : instruments de musique (cordes, percussions, vents), char: null.
// Complète djembé, kora (afrique-choses.mjs), tambour parlant, mbira, valiha et balafon (afrique-cultures.mjs).
import { O, W, C, path, circle, ellipse, rect, line, g } from "./lib.mjs";

/** Trait épais « plein » : contour brun puis couleur par-dessus. */
const thick = (d, col, w = 1.5) => line(d, O, w + 2 * W) + line(d, col, w);
const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const METAL = "#C3CAD0", METAL_D = "#8E979F", IRON = "#7D868E", IRON_D = "#5A6168", BRASS = "#E0B04A";
const GOURD = "#C98A4B", HIDE = "#EAD9B8", LIZARD = "#A59A62";
/** Cordes : fines lignes sombres. */
const strings = (d, w = 0.45) => line(d, O, w);

/* ---------------- cordes ---------------- */

// Ngoni (Mali) : caisse de bois en pirogue tendue de peau, manche-bâton, anneaux d'accord en cuir, 4 cordes.
const ngoni = g("rotate(-38 12 12)",
  rect(11.2, 0.2, 1.6, 23.4, 0.8, C.bois),
  path("M12 9Q17.4 11.2 17.4 16.4Q17.2 21.6 12 23.4Q6.8 21.6 6.6 16.4Q6.6 11.2 12 9Z", C.marron),
  path("M12 10.5Q16.1 12.4 16.1 16.4Q15.9 20.5 12 22Q8.1 20.5 7.9 16.4Q7.9 12.4 12 10.5Z", C.sable, { w: 0.8 }),
  circle(14, 13.8, 0.65, O, false),
  ...[0, 1, 2, 3].map((i) => rect(10.8, 2 + i * 1.5, 2.4, 0.9, 0.4, C.terre, { w: 0.5 })),
  strings("M10.6 17.4L11.5 2M11.5 17.4L11.8 2M12.5 17.4L12.2 2M13.4 17.4L12.5 2M10.6 18.3L12 21M13.4 18.3L12 21"),
  rect(9.8, 17.2, 4.4, 1.1, 0.5, C.bois, { w: 0.7 }),
);

// Krar (Éthiopie) : lyre à bol couvert de peau, deux bras en V, joug, 5 cordes, rubans aux couleurs éthiopiennes.
const krarTop = [6, 9, 12, 15, 18].map((x) => [x, 4.2 - 2.4 * (1 - Math.pow((x - 12) / 10, 2)) - 0.0]);
const krar = [
  thick("M8 14.4L3.8 3.8", C.bois, 1.3), thick("M16 14.4L20.2 3.8", C.bois, 1.3),
  circle(12, 16.8, 5.8, C.bois),
  circle(12, 16.8, 4.7, C.sable),
  dots([[9.6, 14.6], [14.4, 14.6], [12, 13.4]], 0.45, O),
  strings(krarTop.map(([x, y], i) => `M${10.4 + i * 0.8} 17.9L${x} ${y + 0.6}`).join("") + "M10.4 18.9L12 21.8M13.6 18.9L12 21.8"),
  rect(9.6, 17.6, 4.8, 1.1, 0.5, C.marron, { w: 0.7 }),
  thick("M2 4.2Q12 1.8 22 4.2", C.marron, 1.2),
  path("M3 4.6L2.2 8.6L3.9 8.2Z", C.vertLight, { w: 0.6 }), path("M3.9 4.4L3.9 8.9L5.2 8.3Z", C.jaune, { w: 0.6 }),
  path("M21 4.6L21.8 8.6L20.1 8.2Z", C.rouge, { w: 0.6 }),
].join("");

// Masenqo (Éthiopie) : vièle monocorde, caisse en losange tendue de peau, long manche, grosse cheville, archet arqué.
const masenqo = [
  g("rotate(-14 10.4 12)",
    rect(9.7, 1.2, 1.4, 12, 0.7, C.bois),
    rect(7.6, 3, 5.6, 1.5, 0.75, C.marron),
    path("M10.4 10.2L16.4 16.4L10.4 22.6L4.4 16.4Z", C.marron),
    path("M10.4 12L14.6 16.4L10.4 20.8L6.2 16.4Z", C.sable, { w: 0.8 }),
    strings("M10.4 21.2V4", 0.6),
    rect(9.1, 17.6, 2.6, 1, 0.4, C.bois, { w: 0.7 }),
  ),
  line("M17.4 3.2L19.4 21", O, 0.6),
  thick("M17.4 3.2Q22.6 11.4 19.4 21", C.bois, 0.8),
].join("");

// Begena (Éthiopie) : grande lyre à caisse rectangulaire tendue de peau, bras parallèles, joug, 8 cordes (10 en vrai).
const begena = [
  thick("M6.4 13.6L5.6 3M17.6 13.6L18.4 3", C.marron, 1.6),
  path("M4.4 12.4H19.6L18.6 22.6H5.4Z", C.marron),
  path("M5.7 13.6H18.3L17.5 21.4H6.5Z", C.sable, { w: 0.8 }),
  dots([[8.2, 15], [15.8, 15]], 0.5, O),
  strings([0, 1, 2, 3, 4, 5, 6, 7].map((i) => `M${8.2 + i * 1.08} 3.6L${9.4 + i * 0.74} 19.6`).join(""), 0.4),
  rect(8.4, 18.8, 7.2, 1.1, 0.5, C.bois, { w: 0.7 }),
  rect(2.4, 1.4, 19.2, 2.2, 1.1, C.marron),
  line("M8.2 2.5H8.9M11.4 2.5H12.6M15.1 2.5H15.8", C.ocreLight, 0.7),
].join("");

// Oud (Afrique du Nord) : luth piriforme, table claire et rosace, manche court, chevillier renversé.
const oud = g("rotate(-40 12 12)",
  path("M11 4.6L15.6 1.4L16.8 2.8L13 5.6Z", C.marron),
  line("M13 3.2L13.6 4.2M14.4 2.3L15 3.3M15.8 1.4L16.4 2.4", O, 0.9),
  rect(10.7, 3.6, 2.6, 8, 0.6, C.marron),
  path("M12 8.4Q18.8 10 18.6 16.4Q18.2 22.8 12 22.8Q5.8 22.8 5.4 16.4Q5.2 10 12 8.4Z", C.ocreLight),
  path("M7.4 19.6Q8.6 21.8 12 21.9Q15.4 21.8 16.6 19.6", "none", { c: C.bois, w: 0.6 }),
  path("M11.1 3.6H12.9V11.6Q12 12.4 11.1 11.6Z", C.noir, { w: 0.7 }),
  circle(12, 14.8, 2, C.marron, { w: 0.8 }), circle(12, 14.8, 1.1, C.ocreLight, { w: 0.5 }),
  circle(8.8, 17.4, 0.7, C.marron, { w: 0.5 }), circle(15.2, 17.4, 0.7, C.marron, { w: 0.5 }),
  strings("M10.3 19.9L11.3 3.8M11.1 19.9L11.6 3.8M12 19.9V3.8M12.9 19.9L12.4 3.8M13.7 19.9L12.7 3.8", 0.35),
  rect(9.4, 19.6, 5.2, 1.1, 0.5, C.marron, { w: 0.7 }),
);

// Guembri (Gnaoua, Maroc) : caisse rectangulaire tendue de peau de chameau, manche rond, 3 cordes, plaque à sonnailles (sersera).
const guembri = g("rotate(-36 12 12)",
  rect(11, 1.2, 2, 13, 1, C.bois),
  rect(12.8, 1.6, 3.4, 2.8, 0.5, METAL, { w: 0.8 }),
  ...[13.6, 15.4].map((x) => circle(x, 5, 0.55, "none", { w: 0.6 })),
  ...[0, 1, 2].map((i) => rect(10.6, 5.2 + i * 1.5, 2.8, 0.9, 0.4, C.terre, { w: 0.5 })),
  rect(7, 11.2, 10, 12, 2, C.marron),
  rect(7.8, 12, 8.4, 10.2, 1.4, HIDE, { w: 0.8 }),
  dots([[8.6, 13], [8.6, 16], [8.6, 19], [8.6, 21.4], [15.4, 13], [15.4, 16], [15.4, 19], [15.4, 21.4]], 0.3, O),
  rect(11.2, 21.2, 1.6, 2.2, 0.7, C.bois, { w: 0.8 }),
  strings("M11.4 21.6L11.6 4.6M12 21.6V4.6M12.6 21.6L12.4 4.6", 0.45),
  rect(10.2, 18, 3.6, 1.1, 0.5, C.bois, { w: 0.7 }),
);

// Imzad (Touareg) : vièle monocorde, demi-calebasse tendue de peau peinte, manche-bâton, archet très arqué.
const imzadTri = Array.from({ length: 8 }, (_, k) => {
  const a = (k * 45 * Math.PI) / 180, r = 4.4, x = 12 + Math.cos(a) * r, y = 15.4 + Math.sin(a) * r;
  const ux = Math.cos(a), uy = Math.sin(a), px = -uy, py = ux;
  return path(`M${x + ux * 0.9} ${y + uy * 0.9}L${x - ux * 0.6 + px * 0.8} ${y - uy * 0.6 + py * 0.8}L${x - ux * 0.6 - px * 0.8} ${y - uy * 0.6 - py * 0.8}Z`, k % 2 ? C.vert : C.rouge, false);
}).join("");
const imzad = [
  rect(11.3, 1.4, 1.4, 21.4, 0.7, C.bois),
  circle(12, 15.4, 7.2, C.ocre),
  circle(12, 15.4, 6, C.cream),
  imzadTri,
  circle(12, 15.4, 2.6, "none", { c: C.terre, w: 0.5 }),
  rect(11.2, 21.4, 1.6, 1.8, 0.6, C.bois, { w: 0.8 }),
  rect(10.9, 2.4, 2.2, 1.2, 0.5, C.terre, { w: 0.6 }),
  strings("M12 21.6V3.4", 0.6),
  rect(10.6, 18, 2.8, 1, 0.4, C.bois, { w: 0.7 }),
  line("M3.4 10.8L20.6 6.4", O, 0.6),
  thick("M3.4 10.8Q9.4 0.8 20.6 6.4", C.marron, 0.8),
].join("");

// Goje (Haoussa, Sahel) : petite vièle monocorde, calebasse tendue de peau de varan (écailles), archet arqué.
const lizardScales = [];
for (let y = 12.6; y < 20.6; y += 1.5) for (let x = 8.4 + ((y * 2) % 2 ? 0.75 : 0); x < 16; x += 1.5) {
  if ((x - 12) ** 2 + (y - 16.4) ** 2 < 15) lizardScales.push([x, y]);
}
const goje = [
  g("translate(1.6 0) rotate(24 12 14)",
    rect(11.3, 1.4, 1.4, 21, 0.7, C.bois),
    circle(12, 16.4, 5.2, C.ocre),
    circle(12, 16.4, 4.3, LIZARD, { w: 0.8 }),
    dots(lizardScales, 0.32, C.marron),
    rect(10.9, 2.4, 2.2, 1.2, 0.5, C.terre, { w: 0.6 }),
    strings("M12 20.8V3.2", 0.7),
    rect(10.7, 17.6, 2.6, 1, 0.4, C.bois, { w: 0.7 }),
  ),
  line("M4.6 3L4 20.8", O, 0.6),
  thick("M4.6 3Q-0.4 12 4 20.8", C.marron, 0.8),
].join("");

// Akonting (Diola, Sénégal / Gambie) : luth à calebasse tendue de peau cloutée, manche de bambou, 2 cordes + corde de bourdon courte.
const akTacks = Array.from({ length: 12 }, (_, k) => {
  const a = (k * 30 * Math.PI) / 180;
  return [12 + Math.cos(a) * 4.4, 16.8 + Math.sin(a) * 4.4];
});
const akonting = g("rotate(-35 12 12)",
  rect(11.2, 0.4, 1.6, 17, 0.7, C.ocreLight),
  line("M11.3 5.4H12.7M11.3 10.4H12.7", C.ocre, 0.6),
  rect(9.4, 1.6, 1.9, 0.9, 0.4, C.marron, { w: 0.5 }), rect(12.7, 2.8, 1.9, 0.9, 0.4, C.marron, { w: 0.5 }),
  rect(12.7, 8.6, 2.4, 0.9, 0.4, C.marron, { w: 0.5 }),
  circle(12, 16.8, 6, C.ocre),
  circle(12, 16.8, 5, C.sable, { w: 0.8 }),
  dots(akTacks, 0.3, O),
  rect(11.3, 22, 1.4, 1.6, 0.6, C.ocreLight, { w: 0.7 }),
  strings("M11.6 22L11.6 2M12.3 22L12.3 3.2M13.3 18.8L12.8 9", 0.45),
  rect(10.4, 18.4, 3.6, 1.1, 0.5, C.bois, { w: 0.7 }),
);

// Mvet (Fang, Cameroun / Gabon) : cithare sur bâton de raphia, chevalet cranté central, cordes en toit, trois calebasses.
const mvet = g("rotate(-8 12 12)",
  line("M5.4 10.6V13M12 10.6V13M18.6 10.6V13", O, 0.6),
  circle(5.4, 15.6, 3.4, C.ocre), circle(5.4, 15.6, 1.6, C.marron, { w: 0.7 }),
  circle(18.6, 15.6, 3.4, C.ocre), circle(18.6, 15.6, 1.6, C.marron, { w: 0.7 }),
  circle(12, 16.8, 4, C.ocre), circle(12, 16.8, 1.9, C.marron, { w: 0.7 }),
  rect(1, 9.4, 22, 1.8, 0.9, C.ocreLight),
  strings([0, 1, 2, 3].map((i) => `M1.8 9.6L11.2 ${4.4 + i * 1.2}M12.8 ${4.4 + i * 1.2}L22.2 9.6`).join(""), 0.45),
  rect(11.1, 3.4, 1.8, 6.2, 0.5, C.marron),
  line("M11.1 5H11.7M11.1 6.2H11.7M11.1 7.4H11.7M12.3 5H12.9M12.3 6.2H12.9M12.3 7.4H12.9", C.ocreLight, 0.4),
);

/* ---------------- percussions ---------------- */

// Sabar (Sénégal, Wolof) : tambour haut et étroit, chevilles de bois, cordes de tension, joué à la baguette et à la main.
const sabar = [
  path("M7.4 5.4Q7.8 14 9.8 22.4H14.2Q16.2 14 16.6 5.4Z", C.marron),
  line("M8.8 15.4L9.8 16.6L10.8 15.4L11.8 16.6L12.8 15.4L13.8 16.6L14.8 15.4", C.ocreLight, 0.8),
  line("M9.2 18.8H14.8", C.rouge, 0.8),
  line("M7.6 5.8L8.8 10.4L10.4 5.9L11.6 10.6L13.2 5.9L14.6 10.5L16.2 5.8", C.cream, 0.6),
  rect(5.4, 10, 2.8, 1, 0.5, C.bois, { w: 0.7 }), rect(15.8, 10, 2.8, 1, 0.5, C.bois, { w: 0.7 }),
  ...[8.8, 11.6, 14.6].map((x) => rect(x - 0.5, 9.8, 1, 1.6, 0.4, C.bois, { w: 0.6 })),
  ellipse(12, 5.4, 4.9, 1.5, C.sable),
  path("M7.2 5.6Q12 8 16.8 5.6", "none", { c: C.terre, w: 0.9 }),
  thick("M13 5L21.4 0.9", C.bois, 0.7),
].join("");

// Dunun (Afrique de l'Ouest) : trois tambours cylindriques couchés et empilés (dununba, sangban, kenkeni), cloche en fer.
const dun = (x1, x2, y1, y2, body) => {
  const ry = (y2 - y1) / 2, rx = ry * 0.45, cy = (y1 + y2) / 2;
  const zig = [];
  for (let x = x1 + 1.4, up = true; x <= x2 - 1.2; x += 1.6, up = !up) zig.push(`${x} ${up ? y1 + 0.5 : y2 - 0.5}`);
  return path(`M${x1} ${y1}H${x2}A${rx} ${ry} 0 0 1 ${x2} ${y2}H${x1}Z`, body)
    + line(`M${zig.join("L")}`, C.cream, 0.55)
    + line(`M${x1 + 1} ${y1 + 0.2}V${y2 - 0.2}M${x2 - 0.6} ${y1 + 0.2}V${y2 - 0.2}`, C.terreDark, 0.8)
    + ellipse(x1, cy, rx, ry, C.sable);
};
const dunun = [
  dun(2.4, 19.4, 15, 22.6, C.bois),
  dun(4, 18, 9.6, 14.8, C.marron),
  dun(5.6, 16.2, 5.2, 9.2, C.bois),
  path("M16 4.8L17 1.4H20.8L22.4 4.8Q19.2 5.8 16 4.8Z", IRON),
  path("M16 4.8Q19.2 3.8 22.4 4.8Q19.2 5.8 16 4.8Z", IRON_D, { w: 0.7 }),
  thick("M18.6 5.2V6.6", IRON_D, 0.6),
].join("");

// Udu (Nigeria, Igbo) : jarre de terre cuite à col étroit et trou latéral, décor de bossettes.
const udu = [
  path("M10 2.2H14L13.6 6Q20.8 7.6 20.8 14.6Q20.8 22 12 22Q3.2 22 3.2 14.6Q3.2 7.6 10.4 6Z", C.terre),
  ellipse(7.6, 12, 1.2, 2.6, "#D9714A", false),
  ellipse(12, 2.4, 2.4, 0.8, C.terreDark, { w: 0.8 }),
  line("M10.6 6.2Q12 6.8 13.4 6.2", C.terreDark, 0.7),
  ellipse(14.8, 13.6, 2.6, 2.4, C.noir),
  path("M12.6 12.4Q14.8 10.4 17.2 12.6", "none", { c: C.terreDark, w: 0.7 }),
  dots([[5.6, 17.4], [7.8, 18.8], [10.2, 19.6], [13.8, 19.6], [16.2, 18.8], [18.4, 17.4]], 0.55, C.terreDark),
  line("M6.2 8.8Q12 7.2 17.8 8.8", C.terreDark, 0.6),
].join("");

// Ngoma (Afrique de l'Est et centrale) : grand tambour conique, peau de vache à poil, lacets de cuir jusqu'au pied.
const ngTop = [5.2, 7.8, 10.4, 13, 15.6, 18.2], ngBot = [8.4, 10.2, 12, 13.8, 15.6];
const ngoma = [
  path("M3.8 5.8Q4.6 15.4 7.8 21.8H16.2Q19.4 15.4 20.2 5.8Z", C.bois),
  line(ngTop.map((x, i) => `M${x} 8.6L${ngBot[Math.min(i, 4)]} 21.4${i > 0 ? `M${x} 8.6L${ngBot[i - 1]} 21.4` : ""}`).join(""), C.cream, 0.6),
  path("M7.8 21.8Q12 23 16.2 21.8", "none", { c: C.marron, w: 1 }),
  path("M3.8 5.8Q4 9.4 12 9.6Q20 9.4 20.2 5.8Z", C.cream),
  ellipse(12, 5.8, 8.2, 2.6, C.cream),
  ellipse(8.8, 5.4, 2.4, 1.1, C.marron, false), ellipse(15, 6.4, 1.8, 0.8, C.noir, false), ellipse(16.4, 4.6, 1.3, 0.6, C.marron, false),
  path("M5 8.4Q6.4 9.4 8.6 9.4L8.8 8.2Q6.4 8 5 8.4Z", C.marron, false),
  dots(ngTop.map((x) => [x, 8.6]), 0.35, O),
].join("");

// Atumpan (Ghana, Akan) : paire de grands tambours parlants à chevilles, ceinture de tissu, baguettes coudées.
const atu = (x, rot) => g(`rotate(${rot} ${x} 22)`,
  path(`M${x - 3.2} 5.4Q${x - 3.4} 12 ${x - 1.6} 17.4L${x - 2.6} 22.4H${x + 2.6}L${x + 1.6} 17.4Q${x + 3.4} 12 ${x + 3.2} 5.4Z`, C.marron),
  line(`M${x - 3} 5.8L${x - 1.8} 9.6L${x - 0.6} 5.9L${x + 0.6} 9.6L${x + 1.8} 5.9L${x + 3} 9.6`, C.cream, 0.55),
  rect(x - 4.4, 9.4, 1.6, 0.9, 0.4, C.bois, { w: 0.6 }), rect(x + 2.8, 9.4, 1.6, 0.9, 0.4, C.bois, { w: 0.6 }),
  path(`M${x - 3.2} 11.6Q${x} 12.4 ${x + 3.2} 11.6L${x + 2.8} 14.4Q${x} 15.2 ${x - 2.8} 14.4Z`, C.rouge, { w: 0.8 }),
  line(`M${x - 3} 13Q${x} 13.8 ${x + 3} 13`, C.noir, 0.6),
  ellipse(x, 5.4, 3.2, 1, C.sable),
);
const atumpan = [
  atu(6.6, -6), atu(17.4, 6),
  thick("M9.2 1L14.2 7.8Q14.6 8.8 13.6 8.6", C.bois, 0.7),
  thick("M14.8 1L9.8 7.8Q9.4 8.8 10.4 8.6", C.bois, 0.7),
].join("");

// Bendir (Maghreb) : grand tambour sur cadre, peau fine, timbres en boyau visibles sous la peau, trou pour le pouce.
const bendir = [
  circle(12, 12, 10.6, C.bois),
  circle(12, 12, 8.8, C.sable),
  path("M5.4 7.6Q8 5 12 4.8", "none", { c: C.cream, w: 1 }),
  line("M3.4 13.4H20.6M3.5 14.6H20.5", C.marron, 0.55),
  dots([[3.4, 14], [20.6, 14]], 0.55, C.marron),
  circle(12, 21.7, 0.6, O, false),
].join("");

// Darbouka (Afrique du Nord) : tambour en gobelet de métal, peau, panse décorée de motifs incrustés.
const darbouka = [
  path("M4.4 4.8Q3.8 10.4 9.2 13.6Q10.6 14.6 10.4 17Q10.2 20.2 7.4 22.4H16.6Q13.8 20.2 13.6 17Q13.4 14.6 14.8 13.6Q20.2 10.4 19.6 4.8Z", METAL),
  path("M6.4 21.2Q12 22.6 17.6 21.2", "none", { c: METAL_D, w: 0.7 }),
  ...[7, 9.5, 12, 14.5, 17].map((x, i) => path(`M${x} ${7.4 + (i % 2 ? 0 : 0.4)}L${x + 1} ${8.8}L${x} ${10.2 - (i % 2 ? 0 : 0.4)}L${x - 1} ${8.8}Z`, i % 2 ? C.ocre : C.indigoLight, { w: 0.5 })),
  line("M10.3 15.6H13.7M10.2 17.4H13.8", C.indigo, 0.7),
  path("M9 19.8L12 18.6L15 19.8", "none", { c: C.ocre, w: 0.7 }),
  ellipse(12, 4.8, 7.6, 2, C.cream),
  path("M4.4 5.2Q12 8.4 19.6 5.2", "none", { c: METAL_D, w: 1 }),
].join("");

// Gankogui (Ewe, Ghana / Togo) : double cloche en fer forgé, une grande et une petite, poignée commune, bâton.
const gankogui = [
  thick("M12 17V22.4", IRON_D, 1.6),
  path("M11.6 17.6L3.6 5Q7.2 2 11.6 3.4Z", IRON),
  path("M3.6 5Q7.6 6.4 11.6 3.4Q7.6 1.6 3.6 5Z", IRON_D, { w: 0.8 }),
  path("M12.4 17.6L13.2 8.8Q17.4 7.2 20.6 10.2Z", IRON),
  path("M13.2 8.8Q17.4 11 20.6 10.2Q17 6.8 13.2 8.8Z", IRON_D, { w: 0.8 }),
  line("M7.4 6.2L10.6 13", C.grisLight, 0.7),
  rect(10.6, 16.4, 2.8, 1.6, 0.6, IRON_D, { w: 0.8 }),
  thick("M15.6 22.6L21.8 15.6", C.bois, 0.9),
].join("");

// Qraqeb (Gnaoua, Maroc) : paire de crotales en fer en forme de 8, reliées à une extrémité par une lanière.
const plate = (tx, ty, rot) => g(`translate(${tx} ${ty}) rotate(${rot})`,
  circle(0, -4.6, 3.1, IRON), circle(0, 4.6, 3.1, IRON), rect(-1, -3, 2, 6, 0, IRON),
  circle(0, -4.6, 3.1, IRON, false), circle(0, 4.6, 3.1, IRON, false), rect(-1, -3.2, 2, 6.4, 0, IRON, false),
  circle(0, -4.6, 1.5, C.grisLight, { w: 0.6 }), circle(0, 4.6, 1.5, C.grisLight, { w: 0.6 }),
);
const qraqeb = [
  plate(8.4, 12.6, 20), plate(15.6, 12.6, -20),
  thick("M10 8.2Q12 2.4 14 8.2", C.terre, 0.8),
].join("");

// Shekere (Yoruba, Afrique de l'Ouest) : calebasse à col enveloppée d'un filet de perles.
const shRows = [[8.4, [10.6, 13.4]], [10.8, [6.4, 9.2, 12, 14.8, 17.6]], [13.4, [5, 7.8, 10.6, 13.4, 16.2, 19]],
  [16, [6.4, 9.2, 12, 14.8, 17.6]], [18.6, [7.8, 10.6, 13.4, 16.2]], [21, [9.2, 12, 14.8]]];
const shBeads = shRows.flatMap(([y, xs]) => xs.map((x) => [x, y]));
const shNet = [];
shRows.forEach(([y, xs], r) => {
  const next = shRows[r + 1];
  if (next) for (const x of xs) for (const nx of next[1]) if (Math.abs(nx - x) === 1.4 || Math.abs(Math.abs(nx - x) - 1.4) < 0.01) shNet.push(`M${x} ${y}L${nx} ${next[0]}`);
});
const shekere = [
  path("M10.4 2H13.6Q13.8 5.6 15.6 7.4Q20.8 10.6 20.8 15.4Q20.8 22.6 12 22.6Q3.2 22.6 3.2 15.4Q3.2 10.6 8.4 7.4Q10.2 5.6 10.4 2Z", C.ocre),
  ellipse(7.2, 13.2, 1.1, 2.4, C.ocreLight, false),
  line(shNet.join("") + "M10.6 8.4L11.2 4M13.4 8.4L12.8 4", C.cream, 0.5),
  ...shBeads.map(([x, y], i) => circle(x, y, 0.75, i % 3 === 1 ? C.rouge : C.cream, { w: 0.45 })),
  rect(10.2, 3.6, 3.6, 1.1, 0.5, C.terre, { w: 0.7 }),
].join("");

// Kayamba (Kenya, Mijikenda) : hochet plat en radeau de roseaux liés, rempli de graines.
const kayamba = g("rotate(-12 12 12)",
  rect(2, 6.2, 20, 11.6, 1, C.ocreLight),
  line(Array.from({ length: 11 }, (_, i) => `M${3.6 + i * 1.7} 6.4V17.6`).join(""), C.ocre, 0.6),
  rect(1.4, 8.2, 21.2, 1.4, 0.7, C.marron, { w: 0.9 }),
  rect(1.4, 14.4, 21.2, 1.4, 0.7, C.marron, { w: 0.9 }),
  line("M5 8.2V9.6M10 8.2V9.6M15 8.2V9.6M20 8.2V9.6M5 14.4V15.8M10 14.4V15.8M15 14.4V15.8M20 14.4V15.8", C.cream, 0.6),
  rect(2, 6.2, 20, 11.6, 1, "none"),
);

/* ---------------- vents et autres ---------------- */

// Kakaki (Haoussa) : très longue trompette de métal, tube en sections, pavillon évasé.
const kakaki = g("rotate(-45 12 12)",
  rect(-0.6, 11.1, 19.4, 1.8, 0.9, METAL),
  ...[3.6, 8.4, 13.2].map((x) => rect(x, 10.6, 1, 2.8, 0.4, METAL_D, { w: 0.7 })),
  rect(5.4, 10.7, 1.8, 2.6, 0.4, C.rouge, { w: 0.7 }),
  ellipse(-0.8, 12, 0.6, 1.3, METAL_D, { w: 0.8 }),
  path("M18.2 11.1Q21.6 10.9 24 8.8V15.2Q21.6 13.1 18.2 12.9Z", METAL),
  ellipse(24, 12, 0.9, 3.2, METAL_D),
);

// Algaita (Haoussa) : hautbois à anche double, disque à lèvres, corps de bois conique gainé de cuir, pavillon de laiton.
const algaita = g("rotate(-45 12 12)",
  rect(-0.6, 11.6, 2.4, 0.8, 0.3, C.sable, { w: 0.7 }),
  rect(1.6, 11.5, 2, 1, 0.3, BRASS, { w: 0.7 }),
  ellipse(3.4, 12, 0.6, 2.2, BRASS, { w: 0.8 }),
  path("M3.8 11.1L16.2 10.2V13.8L3.8 12.9Z", C.marron),
  rect(5, 10.9, 1.2, 2.2, 0.3, C.rouge, { w: 0.6 }), rect(14.4, 10.3, 1.2, 3.4, 0.3, C.rouge, { w: 0.6 }),
  dots([[8, 12], [10, 12], [12, 12], [13.4, 12]], 0.4, C.ocreLight),
  path("M16 10.2Q20 10 23 7.8V16.2Q20 14 16 13.8Z", BRASS),
  ellipse(23, 12, 1, 4.2, C.ocre),
);

// Timbila (Chopi, Mozambique) : xylophone sur cadre cintré, longues calebasses à mirliton scellées à la cire, mailloches à tête de caoutchouc.
const tbKeys = Array.from({ length: 8 }, (_, i) => {
  const x = 2.2 + i * 2.5, t = (x + 1 - 1.4) / 21.2, ry = 10.4 + 6 * t * (1 - t);
  return { x, ry, h: 6 - i * 0.38, L: 10.4 - i * 0.64 };
});
const timbila = [
  ...tbKeys.map(({ x, ry, L }) => ellipse(x + 1, ry + L / 2 + 0.4, 1.15 - 0.02 * x, L / 2, GOURD, { w: 0.8 })),
  ...tbKeys.map(({ x, ry }) => rect(x + 0.3, ry + 0.9, 1.4, 0.8, 0.3, C.noir, { w: 0.5 })),
  ...tbKeys.map(({ x, ry, L }) => circle(x + 1, ry + L * 0.62, 0.45, C.cream, { w: 0.5 })),
  thick("M1.6 10.4Q12 13.4 22.4 10.4", C.marron, 1.2),
  thick("M1.6 10.6Q1 8.2 2.2 6.6M22.4 10.6Q23 8.2 21.8 6.6", C.marron, 0.9),
  ...tbKeys.map(({ x, ry, h }) => rect(x, ry - h + 0.4, 2, h, 0.5, C.ocreLight, { w: 0.8 })),
  thick("M4.6 1.4L8 5", C.bois, 0.6), circle(8.5, 5.5, 1.3, C.rouge, { w: 0.8 }),
  thick("M19.4 1.4L16 5", C.bois, 0.6), circle(15.5, 5.5, 1.3, C.rouge, { w: 0.8 }),
].join("");

const E = (slug, fr, en, tags, body) => ({ slug, fr, en, char: null, group: "objets", tags: [...tags, "musique", "music", "instrument"], tone: false, body });

/** Recadrage (audit du dessin) : ces dessins débordaient de la grille 24 × 24 (ou étaient décentrés) ;
 *  ils sont réduits et décalés juste assez pour y tenir : [échelle, décalage x, décalage y]. */
const CADRE = { "sabar": [0.97, 0, 0.8], "atumpan": [0.96, 0, 0.5], "gankogui": [1, 0, -0.8], "timbila": [0.94, 0, 0], "dunun": [1, 0.3, 0] };
const cadre = (e) => { const f = CADRE[e.slug]; return f ? { ...e, body: `<g transform="translate(${Math.round((12 + f[1]) * 100) / 100} ${Math.round((12 + f[2]) * 100) / 100}) scale(${f[0]}) translate(-12 -12)">${e.body}</g>` } : e; };
export default [
  E("ngoni", "Ngoni", "Ngoni", ["ngoni", "n'goni", "kamalé ngoni", "donso ngoni", "luth", "lute", "cordes", "strings", "mali", "bambara", "griot"], ngoni),
  E("krar", "Krar", "Krar", ["krar", "kirar", "lyre", "cordes", "strings", "éthiopie", "ethiopia", "érythrée", "eritrea", "azmari"], krar),
  E("masenqo", "Masenqo", "Masenqo", ["masenqo", "masinko", "vièle", "fiddle", "archet", "bow", "cordes", "strings", "éthiopie", "ethiopia", "azmari"], g("translate(-1.6 0)", masenqo)),
  E("begena", "Begena", "Begena", ["begena", "bagana", "lyre", "harpe de david", "cordes", "strings", "éthiopie", "ethiopia", "amhara", "orthodoxe"], begena),
  E("oud", "Oud", "Oud", ["oud", "ʿūd", "luth", "lute", "cordes", "strings", "maghreb", "égypte", "egypt", "soudan", "sudan", "maroc", "morocco"], oud),
  E("guembri", "Guembri", "Guembri", ["guembri", "gimbri", "sintir", "hajhouj", "gnaoua", "gnawa", "maroc", "morocco", "luth", "lute", "cordes", "strings"], guembri),
  E("imzad", "Imzad", "Imzad", ["imzad", "anzad", "vièle", "fiddle", "touareg", "tuareg", "niger", "algérie", "algeria", "mali", "cordes", "strings"], imzad),
  E("goje", "Goje", "Goje", ["goje", "gonje", "goge", "vièle", "fiddle", "haoussa", "hausa", "nigeria", "niger", "sahel", "cordes", "strings"], g("translate(1.9 0)", goje)),
  E("akonting", "Akonting", "Akonting", ["akonting", "ekonting", "banjo", "luth", "lute", "diola", "jola", "sénégal", "senegal", "gambie", "gambia", "cordes", "strings"], akonting),
  E("mvet", "Mvet", "Mvet", ["mvet", "cithare", "zither", "fang", "beti", "cameroun", "cameroon", "gabon", "guinée équatoriale", "equatorial guinea", "cordes", "strings"], mvet),
  E("sabar", "Sabar", "Sabar", ["sabar", "nder", "mbalax", "tambour", "drum", "wolof", "sénégal", "senegal", "gambie", "gambia", "percussion"], sabar),
  E("dunun", "Dunun", "Dunun", ["dunun", "doundoun", "dununba", "sangban", "kenkeni", "cloche", "bell", "tambour", "drum", "mandingue", "mande", "guinée", "guinea", "mali", "percussion"], dunun),
  E("udu", "Udu", "Udu", ["udu", "jarre", "pot", "terre cuite", "clay", "tambour", "drum", "igbo", "nigeria", "percussion"], udu),
  E("ngoma", "Ngoma", "Ngoma", ["ngoma", "ingoma", "tambour", "drum", "peau de vache", "cowhide", "rwanda", "burundi", "tanzanie", "tanzania", "kenya", "congo", "percussion"], ngoma),
  E("atumpan", "Atumpan", "Atumpan", ["atumpan", "tambour parlant", "talking drum", "akan", "ashanti", "asante", "ghana", "tambour", "drum", "percussion"], atumpan),
  E("bendir", "Bendir", "Bendir", ["bendir", "bendhir", "tambour sur cadre", "frame drum", "maghreb", "maroc", "morocco", "algérie", "algeria", "tunisie", "tunisia", "percussion"], bendir),
  E("darbouka", "Darbouka", "Darbuka", ["darbouka", "darbuka", "derbouka", "tabla", "goblet drum", "tambour", "drum", "maghreb", "égypte", "egypt", "percussion"], darbouka),
  E("gankogui", "Gankogui", "Gankogui", ["gankogui", "gankogwe", "cloche", "bell", "double cloche", "double bell", "fer", "iron", "ewe", "ghana", "togo", "percussion"], gankogui),
  E("qraqeb", "Qraqeb", "Qraqeb", ["qraqeb", "krakeb", "crotales", "castanets", "fer", "iron", "gnaoua", "gnawa", "maroc", "morocco", "percussion"], qraqeb),
  E("shekere", "Shékéré", "Shekere", ["shékéré", "shekere", "sekere", "axatse", "calebasse", "gourd", "perles", "beads", "hochet", "rattle", "yoruba", "nigeria", "percussion"], shekere),
  E("kayamba", "Kayamba", "Kayamba", ["kayamba", "hochet", "rattle", "roseau", "reed", "mijikenda", "swahili", "kenya", "tanzanie", "tanzania", "percussion"], kayamba),
  E("kakaki", "Kakaki", "Kakaki", ["kakaki", "trompette", "trumpet", "haoussa", "hausa", "nigeria", "niger", "émir", "emir", "durbar", "vent", "wind"], kakaki),
  E("algaita", "Algaita", "Algaita", ["algaita", "alghaita", "hautbois", "oboe", "anche double", "double reed", "haoussa", "hausa", "nigeria", "niger", "vent", "wind"], algaita),
  E("timbila", "Timbila", "Timbila", ["timbila", "mbila", "xylophone", "chopi", "mozambique", "calebasse", "gourd", "percussion"], timbila),
].map(cadre);
