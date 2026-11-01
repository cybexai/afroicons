// Emojis « personnes » d'Afroicons, deuxième vague : peuples, tenues et parures d'Afrique.
// Même construction que la première vague (gens.mjs) : buste de lib.mjs, couleur à plat, contour brun arrondi,
// peau en SKIN / SKIN_SHADE (5 teintes au build). Les vêtements, bijoux et coiffes racontent la personne.
import { O, W, C, SKIN, SKIN_SHADE, path, circle, ellipse, rect, line, g, bust } from "./lib.mjs";

/* ---------- outils locaux (repris de gens.mjs) ---------- */
const r2 = (v) => Math.round(v * 100) / 100;
const dot = (x, y, r = 0.6, c = O) => circle(x, y, r, c, false);
const earring = (x = 7.6, y = 12.4, c = C.ocre) => circle(x, y, 0.8, c, { w: 0.7 });
const beads = (pts, c = C.terre, r = 0.62) => pts.map(([x, y], i) => circle(x, y, r, Array.isArray(c) ? c[i % c.length] : c, { w: 0.6 })).join("");
const arcPts = (cx, cy, rx, ry, a0, a1, n) => Array.from({ length: n }, (_, i) => {
  const t = ((a0 + ((a1 - a0) * i) / (n - 1)) * Math.PI) / 180;
  return [r2(cx + rx * Math.cos(t)), r2(cy + ry * Math.sin(t))];
});
const WAX = (spots, c = C.terre, r = 0.55) => spots.map(([x, y]) => circle(x, y, r, c, false)).join("");
/** Tube : trait épais bordé de contour (bâton, tresse, lance). */
const tube = (d, sw = 1, fill = C.bois, ow = 0.8) =>
  `<path d="${d}" fill="none" stroke="${O}" stroke-width="${r2(sw + 2 * ow)}" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="${d}" fill="none" stroke="${fill}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;

/* ---------- découpes du vêtement du buste (sans clipPath) ---------- */
// Épaules de bust() : M3.5 23 C3.5 18.6 7 16.4 12 16.4 S20.5 18.6 20.5 23 Z
const CLOTH = "M3.5 23C3.5 18.6 7 16.4 12 16.4S20.5 18.6 20.5 23Z";
const SAMPLES = Array.from({ length: 401 }, (_, i) => {
  const t = i / 400, u = 1 - t;
  return [u ** 3 * 3.5 + 3 * u * u * t * 3.5 + 3 * u * t * t * 7 + t ** 3 * 12, u ** 3 * 23 + 3 * u * u * t * 18.6 + 3 * u * t * t * 16.4 + t ** 3 * 16.4];
});
/** Haut des épaules à l'abscisse x. */
const topY = (x) => {
  const u = x > 12 ? 24 - x : x;
  let best = SAMPLES[0];
  for (const s of SAMPLES) if (Math.abs(s[0] - u) < Math.abs(best[0] - u)) best = s;
  return best[1];
};
/** Bord gauche des épaules à l'ordonnée y. */
const leftX = (y) => {
  let best = SAMPLES[0];
  for (const s of SAMPLES) if (Math.abs(s[1] - y) < Math.abs(best[1] - y)) best = s;
  return best[0];
};
/** Bande horizontale du vêtement entre y0 et y1 (suit le bord des épaules). */
const bandH = (y0, y1, c) => {
  const ys = Array.from({ length: 7 }, (_, k) => y0 + ((y1 - y0) * k) / 6);
  const L = ys.map((y) => `${r2(leftX(y))} ${r2(y)}`), R = ys.slice().reverse().map((y) => `${r2(24 - leftX(y))} ${r2(y)}`);
  return path(`M${L.join("L")}L${R.join("L")}Z`, c, false);
};
/** Bande verticale du vêtement entre x0 et x1 (suit le haut des épaules). */
const bandV = (x0, x1, c) => {
  const pts = Array.from({ length: 7 }, (_, k) => { const x = x0 + ((x1 - x0) * k) / 6; return `${r2(x)} ${r2(topY(x))}`; });
  return path(`M${pts.join("L")}L${x1} 23L${x0} 23Z`, c, false);
};
const outline = path(CLOTH, "none");
/** Points d'une courbe de Bézier quadratique (pour poser des pièces le long d'un bord). */
const quadPts = (p0, p1, p2, n, dy = 0) => Array.from({ length: n }, (_, i) => {
  const t = i / (n - 1), u = 1 - t;
  return [r2(u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0]), r2(u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1] + dy)];
});
/** Petit triangle (motifs perlés, tibeb). */
const tri = (x, y, s, c, down = false) => path(down ? `M${r2(x - s)} ${y}H${r2(x + s)}L${x} ${r2(y + s * 1.4)}Z` : `M${r2(x - s)} ${r2(y + s * 1.4)}H${r2(x + s)}L${x} ${y}Z`, c, { w: 0.5 });

/* ---------- personnes ---------- */
const people = [
  {
    slug: "femme-massai", fr: "Femme massaï", en: "Maasai woman",
    tags: ["massaï", "maasai", "kenya", "tanzanie", "perles", "beads", "collier", "femme"],
    body: bust({
      cloth: C.indigoLight,
      collar: ellipse(12, 17.6, 7.6, 4.5, C.rouge, { w: 0.9 }) + ellipse(12, 17.4, 6.2, 3.6, C.white, { w: 0.7 }) +
        ellipse(12, 17.2, 4.9, 2.8, C.bleu, { w: 0.7 }) + ellipse(12, 17, 3.7, 2, C.vert, { w: 0.7 }) +
        WAX(arcPts(12, 17.6, 6.9, 4.05, 15, 165, 9), C.white, 0.35) + WAX(arcPts(12, 17.2, 4.3, 2.4, 25, 155, 5), C.ocreLight, 0.3),
      top: path("M7.5 9.4Q7.2 4.7 12 4.7Q16.8 4.7 16.5 9.4Q14.8 6.8 12 6.8Q9.2 6.8 7.5 9.4Z", C.noir) +
        beads([[7.3, 11.9], [7.2, 13.1], [7.3, 14.3]], [C.rouge, C.white, C.bleu], 0.5) +
        beads([[16.7, 11.9], [16.8, 13.1], [16.7, 14.3]], [C.rouge, C.white, C.bleu], 0.5),
    }),
  },
  {
    slug: "guerrier-massai", fr: "Guerrier massaï", en: "Maasai warrior",
    tags: ["massaï", "maasai", "moran", "guerrier", "warrior", "shuka", "lance", "spear", "kenya", "tanzanie"],
    body: [
      tube("M4.6 23V4.4", 0.9, C.bois), path("M4.6 0.9Q5.9 3 4.6 5.4Q3.3 3 4.6 0.9Z", C.grisLight, { w: 0.8 }),
      bust({
        cloth: C.rouge,
        hair: path("M7 9Q6.2 14.6 7.6 18H16.4Q17.8 14.6 17 9Z", C.orange) + line("M7.6 11.4V17M16.4 11.4V17", C.terreDark, 0.6),
        collar: [bandV(7.2, 7.8, C.noir), bandV(11.7, 12.3, C.noir), bandV(16.2, 16.8, C.noir), bandH(19.6, 20.2, C.noir), bandH(21.8, 22.4, C.noir)].join("") +
          line("M5.6 18.4L15.8 23", C.terreDark, 0.8) + outline + circle(6.2, 18, 1, C.rouge, { w: 0.8 }) +
          beads(arcPts(12, 16.4, 3.6, 2.4, 25, 155, 7), [C.white, C.bleu, C.ocreLight], 0.45),
        top: path("M7.3 9.6Q7 4.4 12 4.4Q17 4.4 16.7 9.6Q16.2 7.8 15.4 7.4Q12 6 8.6 7.4Q7.8 7.8 7.3 9.6Z", C.orange) +
          line("M9 7.2L8.8 5.2M10.6 6.7V4.7M12 6.5V4.5M13.4 6.7V4.7M15 7.2L15.2 5.2", C.terreDark, 0.6),
      }),
    ].join(""),
  },
  {
    slug: "homme-touareg", fr: "Homme touareg au tagelmust", en: "Tuareg man in a tagelmust",
    tags: ["touareg", "tuareg", "tagelmust", "chèche", "indigo", "croix d'agadez", "niger", "mali", "sahara"],
    body: bust({
      cloth: C.sable,
      collar: line("M9.6 17.2L12 18.4L14.4 17.2", O, 0.5) +
        circle(12, 19, 0.8, C.grisLight, { w: 0.6 }) + circle(12, 19, 0.3, C.sable, false) +
        rect(10.6, 19.8, 2.8, 0.8, 0.3, C.grisLight, { w: 0.6 }) + path("M12 20.4L13.1 21.5L12 22.8L10.9 21.5Z", C.grisLight, { w: 0.6 }),
      top: path("M6.8 9.2Q6.4 15 7.8 17.2Q12 18.4 16.2 17.2Q17.6 15 17.2 9.2L16.4 9.2Q16.6 11.6 12 11.8Q7.4 11.6 7.6 9.2Z", C.indigo) +
        path("M6.6 9.4Q5.6 2.4 12 2.2Q18.4 2.4 17.4 9.4Q12 8 6.6 9.4Z", C.indigo) +
        line("M7.4 6.4Q12 4.4 16.6 6.4M7.2 8Q12 6.2 16.8 8", C.indigoLight, 0.7) + line("M8.6 14.2Q12 15.4 15.4 14.2", C.indigoLight, 0.7) +
        path("M16.2 17.2Q18.6 18.6 19 22.6L17.2 22.8Q17 19.6 15 18Z", C.indigo, { w: 0.8 }),
    }),
  },
  {
    slug: "femme-peule", fr: "Femme peule", en: "Fulani woman",
    tags: ["peule", "fulani", "peul", "fula", "tresses", "braids", "ambre", "cauris", "boucles d'oreilles", "sahel"],
    body: bust({
      cloth: C.rose,
      collar: WAX([[7.2, 20.4], [10.2, 19.4], [13.8, 19.4], [16.8, 20.4], [12, 21.8]], C.ocreLight) +
        beads(arcPts(12, 16.6, 3.4, 2.2, 25, 155, 5), [C.orange, C.ocreLight], 0.5),
      hair: tube("M7.6 8.6Q6 12.6 6.8 17", 1.1, C.noir, 0.7) + tube("M16.4 8.6Q18 12.6 17.2 17", 1.1, C.noir, 0.7),
      top: path("M7.3 9.6Q7.2 4.8 12 4.8Q16.8 4.8 16.7 9.6Q14.6 7.4 12 7.4Q9.4 7.4 7.3 9.6Z", C.noir) +
        path("M10.8 5.4Q10.9 1.6 12 1.2Q13.1 1.6 13.2 5.4Z", C.noir) + beads([[12, 2.4], [12, 4]], C.orange, 0.55) +
        circle(12, 7.6, 0.55, C.ocre, { w: 0.6 }) + beads([[9.4, 5.6], [14.6, 5.6]], C.ocreLight, 0.4) +
        ellipse(6.8, 15.6, 0.45, 0.65, C.white, { w: 0.5 }) + ellipse(17.2, 15.6, 0.45, 0.65, C.white, { w: 0.5 }) +
        circle(7.2, 13.6, 1.6, "none", { w: 1.7 }) + circle(7.2, 13.6, 1.6, "none", { c: C.ocreLight, w: 0.7 }) +
        circle(16.8, 13.6, 1.6, "none", { w: 1.7 }) + circle(16.8, 13.6, 1.6, "none", { c: C.ocreLight, w: 0.7 }),
    }),
  },
  {
    slug: "femme-amazighe", fr: "Femme amazighe", en: "Amazigh woman",
    tags: ["amazighe", "amazigh", "berbère", "berber", "maroc", "algérie", "fibule", "pièces", "tatouage", "maghreb"],
    body: bust({
      cloth: C.rouge,
      hair: path("M6.6 9Q5.6 15 7 18H17Q18.4 15 17.4 9Z", C.rose),
      collar: line("M8.2 19.4Q12 23 15.8 19.4", O, 1.3) + line("M8.2 19.4Q12 23 15.8 19.4", C.grisLight, 0.6) +
        path("M6.8 18.2H9.6L8.2 20.8Z", C.grisLight, { w: 0.6 }) + path("M14.4 18.2H17.2L15.8 20.8Z", C.grisLight, { w: 0.6 }) +
        circle(12, 21.4, 0.6, C.grisLight, { w: 0.5 }),
      top: path("M6.8 10.4Q6 3.6 12 3.4Q18 3.6 17.2 10.4Q15.6 7.6 12 7.6Q8.4 7.6 6.8 10.4Z", C.rose) +
        line("M7.4 6.6Q12 3.6 16.6 6.6", C.ocreLight, 0.8) + line("M8.4 4.8Q12 3 15.6 4.8", C.vert, 0.7) +
        beads(quadPts([7.4, 10], [8.6, 7.4], [12, 7.6], 4, 0.3).concat(quadPts([12, 7.6], [15.4, 7.4], [16.6, 10], 4, 0.3).slice(1)), C.grisLight, 0.55) +
        line("M12 14.1V15", C.indigoLight, 0.5) + dot(11.2, 14.5, 0.25, C.indigoLight) + dot(12.8, 14.5, 0.25, C.indigoLight),
    }),
  },
  {
    slug: "femme-habesha", fr: "Femme en habesha kemis", en: "Woman in a habesha kemis",
    tags: ["habesha", "kemis", "netela", "tibeb", "éthiopie", "ethiopia", "érythrée", "eritrea", "shuruba", "tresses"],
    body: bust({
      cloth: C.white,
      hair: ellipse(12, 15.6, 5.4, 2.6, C.noir),
      collar: path("M9.4 16.8Q12 19 14.6 16.8L15.6 17.4Q12 20.6 8.4 17.4Z", C.vert, { w: 0.7 }) +
        rect(11.1, 19.2, 1.8, 3.8, 0, C.vert, { w: 0.7 }) +
        tri(12, 19.6, 0.5, C.ocreLight) + tri(12, 21.4, 0.5, C.rouge) +
        WAX([[9.6, 18.2], [12, 19], [14.4, 18.2]], C.ocreLight, 0.3) +
        line("M4.4 21.4Q4.8 18.6 7.6 17.4M19.6 21.4Q19.2 18.6 16.4 17.4", C.vert, 1.2) + line("M4.4 21.4Q4.8 18.6 7.6 17.4M19.6 21.4Q19.2 18.6 16.4 17.4", C.ocreLight, 0.4),
      top: path("M7.3 9.8Q7 4.6 12 4.6Q17 4.6 16.7 9.8Q14.8 7.2 12 7.2Q9.2 7.2 7.3 9.8Z", C.noir) +
        line("M8.6 8.2Q9 5.8 10.4 4.9M10.6 7.4Q11 5.4 11.6 4.7M13.4 7.4Q13 5.4 12.4 4.7M15.4 8.2Q15 5.8 13.6 4.9", C.marron, 0.6),
    }),
  },
  {
    slug: "femme-ndebele", fr: "Femme ndébélé", en: "Ndebele woman",
    tags: ["ndébélé", "ndebele", "afrique du sud", "south africa", "idzila", "anneaux", "neck rings", "perles", "couverture"],
    body: bust({
      cloth: C.bleu,
      collar: [bandH(18.6, 19.8, C.rouge), bandH(19.8, 21, C.ocreLight), bandH(21, 22.2, C.vert)].join("") +
        line("M4.6 19.8H19.4", O, 0.6) + line("M4.1 21H19.9", O, 0.6) +
        [6.4, 9.2, 12, 14.8, 17.6].map((x) => path(`M${r2(x - 0.6)} 20.9H${r2(x + 0.6)}L${x} 20Z`, C.white, false)).join("") + outline,
      top: path("M7.5 8.4Q7.3 4.7 12 4.7Q16.7 4.7 16.5 8.4Q12 6.4 7.5 8.4Z", C.noir) +
        path("M7.5 8.4Q12 6.2 16.5 8.4L16.6 9.6Q12 7.4 7.4 9.6Z", C.white, { w: 0.7 }) +
        WAX([[8.6, 8.4], [10.4, 7.7], [12, 7.5], [13.6, 7.7], [15.4, 8.4]], C.rouge, 0.3) +
        [17.6, 16.6, 15.6, 14.6].map((y, i) => rect(r2(9.6 - i * 0.2 - (i === 0 ? 1.4 : 0)), y, r2(4.8 + i * 0.4 + (i === 0 ? 2.8 : 0)), 0.95, 0.47, C.ocreLight, { w: 0.6 })).join(""),
    }),
  },
  {
    slug: "homme-zoulou", fr: "Homme zoulou", en: "Zulu man",
    tags: ["zoulou", "zulu", "afrique du sud", "south africa", "umqhele", "bouclier", "shield", "perles"],
    body: [
      bust({
        cloth: SKIN,
        collar: beads(arcPts(12, 16.4, 4.6, 2.8, 20, 160, 9), [C.white, C.rouge], 0.5) + beads(arcPts(12, 16.6, 6, 4.2, 25, 155, 9), [C.bleu, C.white], 0.5),
        top: path("M7.4 8.6Q7.3 4.7 12 4.7Q16.7 4.7 16.6 8.6Z", C.noir) +
          path("M7 7.8Q12 5.2 17 7.8L17.1 9.8Q12 7.4 6.9 9.8Z", C.ocre, { w: 0.8 }) + WAX([[8.4, 8.4], [10.2, 7.4], [12.4, 7.2], [14.4, 7.6], [15.9, 8.6]], C.marron, 0.4),
      }),
      ellipse(19.4, 15.2, 2.9, 7.6, C.white), path("M17 11Q18.6 9.6 19 12Q18.2 14 17 13.4Z", C.marron, false), path("M20.2 15.6Q22 15 21.8 17.8Q20.6 19 20 17.4Z", C.marron, false),
      path("M17.6 18.6Q18.8 18.2 19 20.4Q18 21.6 17.4 20.6Z", C.marron, false), ellipse(19.4, 15.2, 2.9, 7.6, "none"),
      tube("M19.4 6.2V23.2", 0.7, C.bois, 0.6), line("M18.6 10.4H20.2M18.6 13.4H20.2M18.6 16.4H20.2M18.6 19.4H20.2", C.marron, 0.7),
    ].join(""),
  },
  {
    slug: "femme-zouloue-isicholo", fr: "Femme zouloue à l'isicholo", en: "Zulu woman wearing an isicholo",
    tags: ["zoulou", "zulu", "isicholo", "chapeau", "hat", "mariée", "afrique du sud", "perles"],
    body: bust({
      cloth: C.indigo,
      collar: beads(arcPts(12, 16.4, 4.4, 2.6, 18, 162, 9), [C.white, C.rouge, C.white, C.bleu], 0.5) +
        beads(arcPts(12, 16.6, 6, 4, 22, 158, 11), [C.ocreLight, C.vertLight], 0.5),
      top: path("M7.2 8.6L2.8 3Q2.6 1.6 4 1.6H20Q21.4 1.6 21.2 3L16.8 8.6Q12 7.4 7.2 8.6Z", C.terre) +
        line("M4.6 3.4H19.4M5.8 5H18.2", C.terreDark, 0.6) +
        beads(quadPts([7.6, 8], [12, 6.8], [16.4, 8], 7), [C.white, C.noir], 0.45) + earring(7.4, 12.6, C.white),
    }),
  },
  {
    slug: "femme-xhosa", fr: "Femme xhosa à l'iqhiya", en: "Xhosa woman wearing an iqhiya",
    tags: ["xhosa", "iqhiya", "foulard", "head wrap", "afrique du sud", "south africa", "perles", "umbhaco"],
    body: bust({
      cloth: C.orange,
      collar: bandH(20.4, 21, C.noir) + bandH(21.7, 22.3, C.noir) + outline +
        path("M6.2 17.8Q12 24.4 17.8 17.8Q16.2 16.6 14.6 16.6Q12 19.6 9.4 16.6Q7.8 16.6 6.2 17.8Z", C.white, { w: 0.8 }) +
        WAX(arcPts(12, 17.2, 4.2, 3.6, 20, 160, 7), C.noir, 0.4) + line("M7.4 18.4L8.4 19.4M16.6 18.4L15.6 19.4", C.noir, 0.6),
      top: path("M6.6 10Q4.6 5.6 6.4 3.2Q8.8 0.8 12 1.4Q15.2 0.8 17.6 3.2Q19.4 5.6 17.4 10Q12 7 6.6 10Z", C.noir) +
        line("M7 8.4Q12 5.6 17 8.4", C.white, 0.9) + line("M7.4 4.6Q12 2.2 16.6 4.6", C.white, 0.7),
    }),
  },
  {
    slug: "homme-swahili", fr: "Homme swahili en kanzu et kofia", en: "Swahili man in kanzu and kofia",
    tags: ["swahili", "kanzu", "kofia", "kenya", "tanzanie", "zanzibar", "lamu", "homme"],
    body: bust({
      cloth: C.white,
      collar: bandV(3.5, 8.8, C.indigo) + bandV(15.2, 20.5, C.indigo) + line("M8.8 17.4V23M15.2 17.4V23", O, 0.8) + outline +
        line("M10.4 16.9Q12 18.2 13.6 16.9", C.ocre, 0.7) + line("M12 17.8V20.6", C.marron, 0.6) + ellipse(12, 21.1, 0.45, 0.65, C.marron, { w: 0.5 }),
      top: path("M7.4 8.6V4.4Q7.4 3.4 8.4 3.4H15.6Q16.6 3.4 16.6 4.4V8.6Q12 7.6 7.4 8.6Z", C.white) +
        line("M7.8 6.8L8.9 5.2L10 6.8L11.1 5.2L12.2 6.8L13.3 5.2L14.4 6.8L15.5 5.2L16.4 6.4", C.vert, 0.6) +
        WAX([[8.9, 4.3], [11.1, 4.3], [13.3, 4.3], [15.5, 4.3]], C.terre, 0.3) + line("M7.6 7.8Q12 7 16.4 7.8", C.ocre, 0.5),
    }),
  },
  {
    slug: "femme-somalie", fr: "Femme somalie au garbasaar", en: "Somali woman in a garbasaar",
    tags: ["somalie", "somali", "garbasaar", "dirac", "châle", "shawl", "djibouti", "corne de l'afrique"],
    body: bust({
      cloth: C.orange,
      collar: path("M7.2 6.8Q5.2 12 6.2 16.2Q4.4 18 4 23H9.6L11 19Q12 18.6 13 19L14.4 23H20Q19.6 18 17.8 16.2Q18.8 12 16.8 6.8Z", C.violet) +
        WAX([[6.4, 12], [5.8, 19.6], [7.4, 21.6], [17.6, 12], [18.2, 19.6], [16.6, 21.6], [6.6, 16.4], [17.4, 16.4]], C.rose, 0.4) +
        WAX([[12, 21.4]], C.ocreLight, 0.5),
      top: path("M7 10.6Q6.2 3.8 12 3.6Q17.8 3.8 17 10.6Q15.6 7.2 12 7.2Q8.4 7.2 7 10.6Z", C.violet) +
        WAX([[9.4, 5.4], [12, 4.8], [14.6, 5.4], [10.8, 6.4], [13.2, 6.4]], C.rose, 0.4) + line("M7.6 9.6Q9.4 7.6 12 7.6Q14.6 7.6 16.4 9.6", C.ocreLight, 0.5),
    }),
  },
  {
    slug: "femme-wolof", fr: "Femme wolof en grand boubou", en: "Wolof woman in a grand boubou",
    tags: ["wolof", "sénégal", "senegal", "grand boubou", "mousor", "foulard", "head wrap", "or", "gambie"],
    body: bust({
      cloth: C.bleu,
      collar: path("M8.8 16.9L12 21.4L15.2 16.9", "none", { c: C.ocreLight, w: 1.1 }) + line("M7.4 17.6L12 23M16.6 17.6L12 23", C.ocreLight, 0.6) + dot(12, 19.4, 0.45, C.ocreLight),
      top: path("M7 9.2Q6.2 5.4 8.4 3.2Q10.6 0.8 13.8 0.8Q17 1.2 17.3 4.4Q17.6 7 17 9.2Q12 7.2 7 9.2Z", C.bleu) +
        line("M8.2 7.2Q9.4 3.6 13.6 1.6M10.4 6.6Q12 3.8 16.6 3M13.2 6.8Q15 5.6 17.2 6", C.indigo, 0.7) +
        path("M7 9.2Q12 7.2 17 9.2L16.8 10.2Q12 8.4 7.2 10.2Z", C.ocreLight, { w: 0.7 }) +
        earring(7.3, 12.5, C.ocreLight) + earring(16.7, 12.5, C.ocreLight) + path("M7.3 13.3L6.8 14.6H7.8Z", C.ocreLight, { w: 0.5 }) + path("M16.7 13.3L16.2 14.6H17.2Z", C.ocreLight, { w: 0.5 }),
    }),
  },
  {
    slug: "homme-haoussa", fr: "Homme haoussa en babban riga", en: "Hausa man in babban riga",
    tags: ["haoussa", "hausa", "babban riga", "boubou", "hula", "zanna", "nigeria", "niger", "broderie"],
    body: bust({
      cloth: C.ciel,
      collar: line("M9.6 16.9Q12 18.8 14.4 16.9", C.indigo, 0.8) +
        circle(12, 20, 1.4, C.ciel, { c: C.indigo, w: 0.7 }) + circle(12, 20, 0.55, C.indigo, false) +
        line("M12 21.4V23", C.indigo, 0.7) + line("M6.4 18.6Q8.6 19.2 9.6 22.8M5 20Q7 20.6 7.6 23", C.indigo, 0.6) +
        line("M18.6 18.8L17.6 20.4L18.6 22", C.indigo, 0.6),
      top: path("M7.4 8.8V5.6Q7.6 3 10 3.2L12 4.2L14 3.2Q16.4 3 16.6 5.6V8.8Q12 7.6 7.4 8.8Z", C.terre) +
        WAX([[8.8, 5.2], [10.6, 5.6], [12, 6], [13.4, 5.6], [15.2, 5.2], [9.6, 7.2], [12, 7.2], [14.4, 7.2]], C.ocreLight, 0.32) +
        line("M7.6 6.6Q12 5.6 16.4 6.6", C.ocreLight, 0.5),
    }),
  },
  {
    slug: "femme-malgache", fr: "Femme malgache au lamba", en: "Malagasy woman in a lamba",
    tags: ["malgache", "malagasy", "madagascar", "lamba", "châle", "satroka", "chapeau", "paille"],
    body: bust({
      cloth: C.terre,
      collar: path("M3.5 23C3.5 18.8 6.6 16.8 9.8 16.6L13 21L11.6 23Z", C.white) + path("M20.5 23C20.5 18.8 17.4 16.8 14.2 16.6L12.4 19.4Q13.4 21.4 15.4 23Z", C.white) +
        line("M6 21Q7.4 19 9.6 18.6M17.8 20.8Q17 19.2 15.4 18.6", C.grisLight, 0.7),
      top: path("M7.4 9.6Q7.3 6.8 9 6.6H15Q16.7 6.8 16.6 9.6Q14.4 8 12 8Q9.6 8 7.4 9.6Z", C.noir) +
        path("M8.6 6.6Q8.2 2.2 12 2.2Q15.8 2.2 15.4 6.6Z", C.sable) + line("M9.8 3.6Q12 3 14.2 3.6M8.8 5Q12 4.4 15.2 5", C.bois, 0.5) +
        ellipse(12, 6.9, 6.4, 1.3, C.sable) + line("M8.7 6.2Q12 5.6 15.3 6.2", C.marron, 0.8),
    }),
  },
  {
    slug: "femme-congolaise-liputa", fr: "Femme congolaise en liputa", en: "Congolese woman in liputa",
    tags: ["congo", "rdc", "liputa", "pagne", "wax", "kitambala", "foulard", "kinshasa", "brazzaville"],
    body: bust({
      cloth: C.vertLight,
      collar: WAX([[8.6, 19.8], [15.4, 19.8], [12, 21.6]], C.jaune, 1) + WAX([[8.6, 19.8], [15.4, 19.8], [12, 21.6]], C.terre, 0.4) +
        ellipse(4.9, 19.9, 2, 2.6, C.vertLight) + ellipse(19.1, 19.9, 2, 2.6, C.vertLight) + WAX([[4.8, 19.4], [19.2, 19.4]], C.jaune, 0.6),
      top: path("M7 9.4Q5.6 5 8 3.2Q10 1.8 12 3Q14 1.8 16 3.2Q18.4 5 17 9.4Q12 7.2 7 9.4Z", C.vertLight) +
        ellipse(10.4, 2.4, 1.8, 1.1, C.vertLight, { w: 0.8 }) + ellipse(13.6, 2.4, 1.8, 1.1, C.vertLight, { w: 0.8 }) + circle(12, 2.8, 0.8, C.vertLight, { w: 0.8 }) +
        WAX([[9, 6], [15, 6]], C.jaune, 0.95) + WAX([[9, 6], [15, 6]], C.terre, 0.38) + WAX([[12, 5.2]], C.terre, 0.5) +
        earring(7.4, 12.6, C.ocreLight),
    }),
  },
  {
    slug: "danseur-dogon-kanaga", fr: "Danseur dogon au masque kanaga", en: "Dogon dancer with a Kanaga mask",
    tags: ["dogon", "kanaga", "masque", "mask", "mali", "danse", "dama", "bandiagara"],
    body: [
      path(CLOTH, C.indigo),
      WAX([[6.4, 21.6], [8.2, 22.2], [15.8, 22.2], [17.6, 21.6]], C.white, 0.4),
      path("M5.2 18.2Q12 14.6 18.8 18.2L18.2 20.6L17.2 19.4L16.4 21.2L15.4 19.6L14.4 21.6L13.4 19.8L12 21.8L10.6 19.8L9.6 21.6L8.6 19.6L7.6 21.2L6.8 19.4L5.8 20.6Z", C.terre),
      line("M7.6 18.6L7.6 20.4M10.6 17.8V19.6M13.4 17.8V19.6M16.4 18.6V20.4", C.ocre, 0.6),
      tube("M12 9.2V1.2M7.2 1V2.6H16.8V1M7.8 8V6.2H16.2V8", 1, C.white, 0.7),
      line("M7.2 2.6H8.6M15.4 2.6H16.8", C.rouge, 0.7),
      path("M8.4 9.6Q8.4 8.6 9.4 8.6H14.6Q15.6 8.6 15.6 9.6V16.6Q12 17.8 8.4 16.6Z", C.white),
      rect(9.3, 10, 1.6, 4.6, 0.5, C.noir, { w: 0.5 }), rect(13.1, 10, 1.6, 4.6, 0.5, C.noir, { w: 0.5 }),
      line("M12 9.6V14.4", O, 0.7), tri(12, 15.2, 0.5, C.rouge, false),
      path("M8.4 12.4L9.2 13.6L8.4 14.8Z", C.rouge, { w: 0.5 }), path("M15.6 12.4L14.8 13.6L15.6 14.8Z", C.rouge, { w: 0.5 }),
    ].join(""),
  },
  {
    slug: "danseur-elephant-bamileke", fr: "Danseur au masque éléphant bamiléké", en: "Bamileke elephant mask dancer",
    tags: ["bamiléké", "bamileke", "cameroun", "cameroon", "masque éléphant", "elephant mask", "perles", "beads", "kuosi", "ndop"],
    body: [
      path(CLOTH, C.indigo),
      line("M5.2 19.8H18.8M4.2 21.8H19.8", C.white, 0.5), line("M7.4 17.4V23M16.6 17.4V23", C.white, 0.5), outline,
      circle(4.9, 8.8, 3.5, C.noir), circle(4.9, 8.8, 2.2, C.rouge, { w: 0.6 }), circle(4.9, 8.8, 1, C.white, { w: 0.6 }),
      circle(19.1, 8.8, 3.5, C.noir), circle(19.1, 8.8, 2.2, C.rouge, { w: 0.6 }), circle(19.1, 8.8, 1, C.white, { w: 0.6 }),
      path("M7 13Q6.4 3 12 2.8Q17.6 3 17 13Q12 15.2 7 13Z", C.noir),
      [9.2, 12, 14.8].map((x) => tri(x, 3.9, 0.9, C.bleu)).join("") + [10.6, 13.4].map((x) => tri(x, 3.9, 0.9, C.rouge, true)).join(""),
      [8.2, 15.8].map((x) => tri(x, 10.8, 0.75, C.bleu) + tri(x, 6.4, 0.6, C.white)).join(""),
      circle(9.6, 8.4, 1.4, C.white, { w: 0.7 }), circle(14.4, 8.4, 1.4, C.white, { w: 0.7 }), circle(9.6, 8.4, 0.6, C.noir, false), circle(14.4, 8.4, 0.6, C.noir, false),
      path("M10.4 10.6H13.6L13.2 23H10.8Z", C.noir),
      [11.6, 15, 18.4].map((y, i) => tri(12, y, 0.95, [C.rouge, C.bleu, C.rouge][i])).join("") + [13.4, 16.8, 20.2].map((y) => tri(12, y, 0.85, C.white, true)).join(""),
    ].join(""),
  },
];

export default people.map((e) => ({ ...e, char: null, group: "personnes", tone: e.tone ?? !/^danseur-/.test(e.slug) }));
