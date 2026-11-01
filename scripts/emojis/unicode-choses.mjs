// Emojis Unicode : nature, nourriture, objets et activités (dessins originaux Afroicons).
import { O, W, C, path, circle, ellipse, rect, line, g, bowl, cup, sparkle } from "./lib.mjs";

const r2 = (v) => Math.round(v * 100) / 100;
const pt = (cx, cy, r, deg) => { const a = (deg * Math.PI) / 180; return [r2(cx + r * Math.cos(a)), r2(cy + r * Math.sin(a))]; };
const P = (p) => `${p[0]} ${p[1]}`;

/* ---------- ballon de football ---------- */
function football() {
  const cx = 12, cy = 12, R = 10;
  const out = [circle(cx, cy, R, C.white)];
  const center = [0, 1, 2, 3, 4].map((k) => pt(cx, cy, 3.3, -90 + 72 * k));
  const seams = [];
  for (let k = 0; k < 5; k++) {
    const t = -90 + 72 * k;
    const j = pt(cx, cy, 5.6, t);
    seams.push(`M${P(center[k])}L${P(j)}L${P(pt(cx, cy, 7.9, t - 21))}M${P(j)}L${P(pt(cx, cy, 7.9, t + 21))}`);
    const f = t + 36;
    const a = pt(cx, cy, 7.9, f - 15), b = pt(cx, cy, 6.6, f), c = pt(cx, cy, 7.9, f + 15);
    const e1 = pt(cx, cy, R, f - 11), e2 = pt(cx, cy, R, f + 11);
    out.push(path(`M${P(e1)}L${P(a)}L${P(b)}L${P(c)}L${P(e2)}A${R} ${R} 0 0 0 ${P(e1)}Z`, C.noir, { w: 0.8 }));
  }
  out.push(path(`M${center.map(P).join("L")}Z`, C.noir, { w: 0.8 }));
  out.push(line(seams.join(""), O, 0.8));
  out.push(circle(cx, cy, R, "none"));
  return out.join("");
}

/* ---------- lion ---------- */
function lion() {
  const mane = [];
  for (let k = 0; k < 14; k++) { const [x, y] = pt(12, 12, 7.9, (360 / 14) * k); mane.push(circle(x, y, 2.6, C.terre)); }
  return [
    ...mane,
    circle(12, 12, 8, C.terre, false),
    circle(7.4, 7.4, 1.9, C.ocre), circle(16.6, 7.4, 1.9, C.ocre),
    circle(7.4, 7.4, 0.8, C.terreDark, false), circle(16.6, 7.4, 0.8, C.terreDark, false),
    ellipse(12, 12.6, 6, 6.2, C.ocre),
    circle(9.6, 11, 1, O, false), circle(14.4, 11, 1, O, false),
    ellipse(12, 15.6, 3.2, 2.3, C.cream),
    path("M10.6 13.6H13.4L12 15.2Z", C.marron, { w: 0.8 }),
    line("M12 15.2V16.1M11 16.6Q12 17.2 12 16.1Q12 17.2 13 16.6", O, 0.7),
  ].join("");
}

/* ---------- cotillon ---------- */
function popper() {
  return [
    line("M13.6 7.6Q14.4 4.8 13 3.2", C.rose, 1.3),
    line("M16.4 10.4Q19.2 9.6 20.8 11", C.bleu, 1.3),
    line("M15.6 8.4Q18 5.4 20.6 6.6", C.vertLight, 1.3),
    path("M2.6 21.4L7.2 9.4L14.6 16.8Z", C.ocre),
    line("M6.6 13.3L10.7 17.4M4.4 18.9L5.3 19.8", C.terre, 1.3),
    line("M5.6 16L8 18.4", C.vert, 1.3),
    g("rotate(45 10.9 13.1)", ellipse(10.9, 13.1, 5.2, 1.3, C.terreDark, { w: 0.9 })),
    rect(16.6, 2.6, 1.6, 1.6, 0.3, C.rouge, { w: 0.6 }),
    rect(19.6, 14.4, 1.6, 1.6, 0.3, C.ocreLight, { w: 0.6 }),
    circle(9.6, 4.6, 0.9, C.bleu, { w: 0.6 }),
    circle(21, 3.6, 0.8, C.vertLight, { w: 0.6 }),
    circle(17.8, 18.8, 0.9, C.rose, { w: 0.6 }),
  ].join("");
}

const list = [
  /* ===================== nature ===================== */
  {
    slug: "arbre-feuillu", fr: "Arbre feuillu", en: "Deciduous tree", char: "🌳", group: "nature",
    tags: ["arbre", "tree", "forêt", "forest", "nature", "ombre"],
    body: [
      path("M10.4 22.2L10.8 14.4L8.6 12.6L10 12.2L11.4 13.4V11.6H12.8V13.2L14.6 11.8L15.6 12.6L13.2 14.6L13.6 22.2Z", C.bois),
      path("M7 15.4Q2.8 15.2 2.8 11.6Q2.8 8.6 5.6 8Q6 3.6 10.6 3.2Q13.4 1.6 16 3.6Q19.6 4.4 19.4 8Q21.6 9.4 21.2 12.2Q20.6 15.4 17 15.4Q14.6 16.8 12 15.4Q9.4 16.8 7 15.4Z", C.feuille),
      path("M6.6 9.6Q7 6.2 10.4 5.4", "none", { c: C.vertLight, w: 1.2 }),
      path("M15.4 5.2Q17.8 6 18 8.4", "none", { c: C.vertLight, w: 1.2 }),
      line("M5.6 22.4H18.4"),
    ].join(""),
  },
  {
    slug: "palmier", fr: "Palmier", en: "Palm tree", char: "🌴", group: "nature",
    tags: ["palmier", "palm", "plage", "beach", "tropical", "cocotier"],
    body: [
      path("M4.4 22.6Q12 18.2 19.6 22.6Z", C.sable),
      path("M11.4 21.2Q13.4 15 11 9.2H12.8Q15.6 15 14 21.2Z", C.bois),
      line("M11.9 12.4H13.3M12.4 15.4H13.9M12.4 18.4H13.9", C.marron, 0.8),
      path("M12 8.8Q7 4.6 2.4 9.6Q7.4 7.8 12 8.8Z", C.feuille),
      path("M12 8.8Q17 4.6 21.6 9.6Q16.6 7.8 12 8.8Z", C.feuille),
      path("M12 8.8Q9.6 2.6 4.4 3.2Q9.2 4.8 12 8.8Z", C.vertLight),
      path("M12 8.8Q14.4 2.6 19.6 3.2Q14.8 4.8 12 8.8Z", C.vertLight),
      path("M12 8.8Q11 4.6 12.4 1.8Q13.8 5 12 8.8Z", C.feuille),
      circle(11, 9.8, 1, C.marron, { w: 0.8 }), circle(13, 10, 1, C.marron, { w: 0.8 }),
    ].join(""),
  },
  {
    slug: "cactus", fr: "Cactus", en: "Cactus", char: "🌵", group: "nature",
    tags: ["cactus", "désert", "desert", "sahara", "plante", "plant"],
    body: [
      path("M9.6 15.4H7Q4.8 15.4 4.8 13.2V8.8A1.4 1.4 0 0 1 7.6 8.8V12.6H9.6Z", C.vertLight),
      path("M14.4 12.4H16.6V6.8A1.4 1.4 0 0 1 19.4 6.8V11.4Q19.4 15 16.6 15H14.4Z", C.vertLight),
      path("M9.4 22V5.2A2.6 2.6 0 0 1 14.6 5.2V22Z", C.vertLight),
      line("M12 4.6V20.4", C.vert, 0.9),
      line("M6.2 9V13M18 7V11", C.vert, 0.8),
      line("M3.6 22.2H20.4"),
    ].join(""),
  },
  {
    slug: "fleur-de-cerisier", fr: "Fleur de cerisier", en: "Cherry blossom", char: "🌸", group: "nature",
    tags: ["fleur", "flower", "cerisier", "blossom", "printemps", "rose"],
    body: [
      ...[0, 72, 144, 216, 288].map((d) => g(`rotate(${d} 12 12.4)`, path("M12 12.4Q6.8 9 9.2 3.2L12 4.8L14.8 3.2Q17.2 9 12 12.4Z", "#F7A8C0"))),
      ...[0, 72, 144, 216, 288].map((d) => g(`rotate(${d} 12 12.4)`, line("M12 10.8V7.2", C.rose, 0.8))),
      circle(12, 12.4, 2, C.ocreLight, { w: 0.9 }),
    ].join(""),
  },
  {
    slug: "tournesol", fr: "Tournesol", en: "Sunflower", char: "🌻", group: "nature",
    tags: ["tournesol", "sunflower", "fleur", "flower", "jaune", "soleil"],
    body: [
      rect(11.3, 14, 1.4, 8.8, 0.7, C.vert, { w: 0.9 }),
      path("M12 19.4Q14.4 15.4 18.6 16.4Q16.6 20.4 12 19.4Z", C.feuille),
      path("M12 20.6Q9.4 17.6 5.8 18.6Q8 21.8 12 20.6Z", C.feuille),
      ...Array.from({ length: 12 }, (_, k) => g(`rotate(${k * 30} 12 8.6)`, ellipse(12, 3.4, 1.5, 2.6, C.jaune, { w: 0.9 }))),
      circle(12, 8.6, 3.6, C.marron),
      ...[[11, 7.6], [13, 7.6], [12, 9.2], [10.6, 9.6], [13.4, 9.6], [12, 6.4]].map(([x, y]) => circle(x, y, 0.45, C.ocre, false)),
    ].join(""),
  },
  {
    slug: "soleil", fr: "Soleil", en: "Sun", char: "☀️", group: "nature",
    tags: ["soleil", "sun", "chaleur", "beau temps", "sunny", "été"],
    body: [
      ...Array.from({ length: 8 }, (_, k) => g(`rotate(${k * 45} 12 12)`, path("M12 1.4L13.5 5H10.5Z", C.orange, { w: 0.9 }))),
      circle(12, 12, 5.6, C.jaune),
      path("M9 10.4Q9.6 8.4 11.6 8", "none", { c: C.white, w: 1.1 }),
    ].join(""),
  },
  {
    slug: "croissant-de-lune", fr: "Croissant de lune", en: "Crescent moon", char: "🌙", group: "nature",
    tags: ["lune", "moon", "nuit", "night", "croissant", "ramadan"],
    body: [
      path("M14.2 2.6A9.6 9.6 0 1 0 21.4 15.6A7.6 7.6 0 0 1 14.2 2.6Z", C.jaune),
      circle(7.6, 11.6, 1.1, C.jauneShade, false),
      circle(9.4, 16.8, 0.8, C.jauneShade, false),
      circle(13.8, 19.4, 0.7, C.jauneShade, false),
    ].join(""),
  },
  {
    slug: "nuage-de-pluie", fr: "Nuage de pluie", en: "Cloud with rain", char: "🌧️", group: "nature",
    tags: ["pluie", "rain", "nuage", "cloud", "saison des pluies", "météo"],
    body: [
      ...[[7.4, 15.6], [12, 16.8], [16.6, 15.6]].map(([x, y]) => path(`M${x} ${y}Q${x + 1.5} ${y + 2.4} ${x + 1.5} ${y + 3.6}A1.5 1.5 0 0 1 ${x - 1.5} ${y + 3.6}Q${x - 1.5} ${y + 2.4} ${x} ${y}Z`, C.eau, { w: 0.9 })),
      path("M6.4 14.4Q2.8 14.4 2.8 11.2Q2.8 8.2 6 8Q7 4.2 11 4.2Q14.8 4.2 15.8 7.4Q21.2 7.2 21.2 11Q21.2 14.4 17.6 14.4Z", C.grisLight),
      path("M6 10.2Q6.6 8.6 8.2 8.6", "none", { c: C.white, w: 1.1 }),
    ].join(""),
  },
  {
    slug: "globe-afrique-europe", fr: "Globe Afrique-Europe", en: "Globe showing Europe-Africa", char: "🌍", group: "nature",
    tags: ["globe", "terre", "earth", "monde", "world", "afrique", "africa"],
    body: [
      circle(12, 12, 10, C.eau),
      path("M8.2 7.4Q8 5.6 9.6 4.8Q10.6 3.2 12.8 3.4L15.4 3.2Q17.8 4.2 17.6 6.2Q16.2 7.2 14.8 6.8L13.2 7.6Q12 6.8 11 7.6Q9.4 8.2 8.2 7.4Z", C.feuille, { w: 0.9 }),
      path("M15.8 8.6Q17.8 8.2 19.4 9Q20 10.8 18.4 11.8Q16.8 10.6 15.8 8.6Z", C.ocreLight, { w: 0.9 }),
      path("M5.6 10Q7.4 8.4 10.2 8.8L12.6 8.6Q13.8 9.8 15.2 10L17.2 11.6Q16.8 13 15.8 13.8Q15.4 15.8 14.4 17.4Q13.4 19.6 12.2 19.8Q11.4 18.2 11.4 16.2Q11.2 14.4 10.2 13.6Q8 13.6 6.6 12.6Q5.2 11.4 5.6 10Z", C.feuille, { w: 0.9 }),
      path("M6.6 10.6Q8 9.4 10.2 9.6L12.8 9.6Q13.8 10.4 15.2 10.8Q12.4 12.2 9.4 11.8Q7.4 11.6 6.6 10.6Z", C.ocreLight, false),
      path("M5.6 10Q7.4 8.4 10.2 8.8L12.6 8.6Q13.8 9.8 15.2 10L17.2 11.6Q16.8 13 15.8 13.8Q15.4 15.8 14.4 17.4Q13.4 19.6 12.2 19.8Q11.4 18.2 11.4 16.2Q11.2 14.4 10.2 13.6Q8 13.6 6.6 12.6Q5.2 11.4 5.6 10Z", "none", { w: 0.9 }),
      ellipse(16.6, 17, 0.6, 1.3, C.feuille, { w: 0.8 }),
      circle(12, 12, 10, "none"),
    ].join(""),
  },
  {
    slug: "elephant", fr: "Éléphant", en: "Elephant", char: "🐘", group: "nature",
    tags: ["éléphant", "elephant", "savane", "savanna", "safari", "tembo"],
    body: [
      rect(16.6, 15, 2.8, 6.6, 1, C.gris), rect(10.2, 15, 2.8, 6.6, 1, C.gris),
      line("M21 11.4Q22.2 13.4 21.6 15.4"),
      ellipse(14.6, 12.2, 6.6, 5, C.gris),
      rect(13.6, 15.4, 2.8, 6.6, 1, C.gris), rect(7.2, 15.4, 2.8, 6.6, 1, C.gris),
      path("M4.4 11.4Q2.6 15 3 18.6Q3.2 20 4.6 19.6L5 19.4Q4.8 16.4 7.4 13.6Z", C.gris),
      circle(7.2, 10, 4.4, C.gris),
      path("M6 13.4Q5.6 15.4 7.4 16.2Q6.9 14.9 7.1 13.6Z", C.cream, { w: 0.9 }),
      path("M8.4 5.4Q13.4 4.6 13.6 9.8Q13.4 14.4 9.8 14.2Q8.2 12 8.4 5.4Z", "#B9C1C7"),
      circle(6.4, 9.2, 0.75, O, false),
    ].join(""),
  },
  { slug: "lion", fr: "Lion", en: "Lion", char: "🦁", group: "nature", tags: ["lion", "simba", "savane", "roi", "king", "safari"], body: lion() },
  {
    slug: "girafe", fr: "Girafe", en: "Giraffe", char: "🦒", group: "nature",
    tags: ["girafe", "giraffe", "savane", "twiga", "safari", "cou"],
    body: [
      path("M10.6 23L12.6 10.4H16.8L18.6 23Z", C.ocreLight),
      line("M16.9 11.2L18.3 22.2", C.terre, 1.2),
      path("M13.2 12.4L15.2 12.2L15 14.4L13.2 14.8Z", C.bois, false),
      path("M12.4 16.6L14.8 16.4L14.6 19L12 19.2Z", C.bois, false),
      path("M15.6 15.6L17.2 15.2L17.6 17.8L15.8 18Z", C.bois, false),
      path("M11.6 21L14.4 20.8L14.6 23H11.4Z", C.bois, false),
      path("M15.8 20.2L17.8 19.8L18.3 22.4L16 22.6Z", C.bois, false),
      line("M14.2 5.8L13.8 2.8M16.6 6.2L17.2 3.2", O, 1.1),
      circle(13.8, 2.6, 0.9, C.marron, { w: 0.8 }), circle(17.2, 3, 0.9, C.marron, { w: 0.8 }),
      ellipse(18.4, 7, 1.8, 0.9, C.ocreLight, { w: 0.9 }),
      g("rotate(-18 11.6 8.8)", ellipse(11.6, 8.8, 6.6, 3.4, C.ocreLight)),
      g("rotate(-18 6.6 10.4)", ellipse(6.6, 10.4, 2.4, 2, C.sable)),
      circle(5.8, 10, 0.4, O, false),
      circle(12.6, 7.2, 0.8, O, false),
      path("M9.6 9Q10.6 8.6 11 9.6", "none", { c: C.bois, w: 0.8 }),
    ].join(""),
  },

  /* ===================== nourriture ===================== */
  {
    slug: "banane", fr: "Banane", en: "Banana", char: "🍌", group: "nourriture",
    tags: ["banane", "banana", "fruit", "plantain", "jaune", "dessert"],
    body: [
      path("M4.6 6.4Q4.6 16 12.6 19.6Q18 21.6 21.2 18.6Q15.4 17.6 11.4 14Q7.8 10.4 6.8 5.8Z", C.jaune),
      line("M6 9Q7.6 15 12.6 17.8Q16 19.4 19 19.2", C.jauneShade, 0.9),
      path("M4.6 6.4L4.6 4.2L6.6 3.8L6.8 5.8Z", C.marron, { w: 0.9 }),
      path("M19.8 19.2L21.2 18.6L21.8 19.8Z", C.marron, { w: 0.8 }),
    ].join(""),
  },
  {
    slug: "mangue", fr: "Mangue", en: "Mango", char: "🥭", group: "nourriture",
    tags: ["mangue", "mango", "fruit", "tropical", "embe", "été"],
    body: [
      path("M7.6 6.6Q12.4 4.2 17.4 8.2Q21.4 12.6 18.8 18Q15.8 22 10.8 20.8Q4.8 19 4.2 13Q3.8 8.6 7.6 6.6Z", C.orange),
      path("M5.6 13.6Q6 18.6 11 19.8Q8 16.8 8.2 12.4Q7.6 10.4 5.6 13.6Z", C.ocreLight, false),
      path("M13.6 7Q17.6 7.6 19.2 11.6Q16.8 9.2 13.6 7Z", C.rouge, false),
      path("M7.6 6.6Q12.4 4.2 17.4 8.2Q21.4 12.6 18.8 18Q15.8 22 10.8 20.8Q4.8 19 4.2 13Q3.8 8.6 7.6 6.6Z", "none"),
      line("M8.8 6.2L8 3.4", C.marron, 1.3),
      path("M8.2 3.8Q11.4 1.2 15 3.2Q11.6 5.6 8.2 3.8Z", C.feuille),
      path("M15.6 10.6Q17.4 11.8 17.6 14", "none", { c: C.white, w: 1.1 }),
    ].join(""),
  },
  {
    slug: "ananas", fr: "Ananas", en: "Pineapple", char: "🍍", group: "nourriture",
    tags: ["ananas", "pineapple", "fruit", "tropical", "jus", "juice"],
    body: [
      path("M12 9.6Q8.8 6.6 6.8 3.2Q10.4 4.6 12 7.2Q13.6 4.6 17.2 3.2Q15.2 6.6 12 9.6Z", C.feuille),
      path("M12 9.4Q10.4 5 12 1.4Q13.6 5 12 9.4Z", C.vertLight),
      ellipse(12, 15.4, 5.6, 6.6, C.ocre),
      line("M8.2 11.2L14.8 20.4M10.6 9.6L16.8 17.8M7 14.8L11 20.8M13.6 9.2L17.4 14.2", C.terreDark, 0.8),
      line("M15.8 11.2L9.2 20.4M13.4 9.6L7.2 17.8M17 14.8L13 20.8M10.4 9.2L6.6 14.2", C.terreDark, 0.8),
      ellipse(12, 15.4, 5.6, 6.6, "none"),
    ].join(""),
  },
  {
    slug: "noix-de-coco", fr: "Noix de coco", en: "Coconut", char: "🥥", group: "nourriture",
    tags: ["coco", "coconut", "noix", "fruit", "plage", "tropical"],
    body: [
      circle(15.6, 8.4, 6, C.marron),
      circle(14.4, 6.8, 0.7, C.terreDark, false), circle(16.8, 6.8, 0.7, C.terreDark, false), circle(15.6, 8.8, 0.7, C.terreDark, false),
      circle(9.8, 14.4, 7.6, C.marron),
      circle(9.8, 14.4, 5.8, C.white),
      circle(9.8, 14.4, 3.8, "#F2EAD8", false),
    ].join(""),
  },
  {
    slug: "avocat", fr: "Avocat", en: "Avocado", char: "🥑", group: "nourriture",
    tags: ["avocat", "avocado", "fruit", "guacamole", "vert", "green"],
    body: [
      path("M12 2.2Q15.6 2.2 16.6 7.2Q20.2 11.6 19.6 16Q18.8 21.8 12 21.8Q5.2 21.8 4.4 16Q3.8 11.6 7.4 7.2Q8.4 2.2 12 2.2Z", C.vert),
      path("M12 4.2Q14.4 4.2 15.2 8.2Q18.2 12 17.6 15.8Q17 19.8 12 19.8Q7 19.8 6.4 15.8Q5.8 12 8.8 8.2Q9.6 4.2 12 4.2Z", "#CFE07E", { w: 0.8 }),
      circle(12, 14.6, 3.6, C.marron),
      path("M10.4 13.4Q11 12 12.4 11.8", "none", { c: C.bois, w: 1 }),
    ].join(""),
  },
  {
    slug: "piment", fr: "Piment", en: "Hot pepper", char: "🌶️", group: "nourriture",
    tags: ["piment", "chili", "pepper", "épicé", "spicy", "pili-pili"],
    body: [
      path("M16.4 6.8Q19.6 9 17.8 13.2Q15.2 18.8 5 21.6Q3.4 21.8 4.2 20.6Q10.4 16.6 12.2 11.2Q13 7.4 16.4 6.8Z", C.rouge),
      path("M13.6 11.8Q12.8 15.6 9 18.4", "none", { c: "#F48C7F", w: 1.1 }),
      path("M16.2 6.8Q16 3.6 18.8 2.2L19.4 3.2Q17.4 4.4 17.4 6.8Z", C.vert, { w: 0.9 }),
      path("M14 8Q16 5.6 19 7.6Q17.8 9.4 16.4 9.2Q15 9 14 8Z", C.vertLight),
    ].join(""),
  },
  {
    slug: "bol-de-riz", fr: "Bol de riz", en: "Cooked rice", char: "🍚", group: "nourriture",
    tags: ["riz", "rice", "bol", "bowl", "repas", "riz blanc"],
    body: bowl(C.terre, path("M4.6 12.6Q4.8 6.6 12 6.6Q19.2 6.6 19.4 12.6Z", C.white)
      + line("M8 9.8l.8-.4M11.4 8.6l.9.2M15 9.6l.8.4M9.8 11.4l.8-.2M13.4 11.2l.8.3M6.6 11.6l.6-.4M17.2 11.4l.6.2", C.gris, 0.7))
      + line("M5.4 15.4L6.8 16.6L8.2 15.4L9.6 16.6L11 15.4L12.4 16.6L13.8 15.4L15.2 16.6L16.6 15.4L18 16.6L18.8 15.8", C.ocreLight, 0.9),
  },
  {
    slug: "marmite-de-ragout", fr: "Marmite de ragoût", en: "Pot of food", char: "🍲", group: "nourriture",
    tags: ["marmite", "pot", "ragoût", "stew", "sauce", "soupe"],
    body: [
      line("M9 4.8Q8 3.6 9 2.4M12 4.4Q11 3.2 12 2M15 4.8Q14 3.6 15 2.4", C.gris, 1),
      rect(1.6, 11.2, 3.4, 2.2, 1.1, "#4A4038"), rect(19, 11.2, 3.4, 2.2, 1.1, "#4A4038"),
      line("M7 20L6.2 22M17 20L17.8 22"),
      path("M3.8 9.6H20.2V15.8Q20.2 20.4 15.8 20.4H8.2Q3.8 20.4 3.8 15.8Z", "#4A4038"),
      ellipse(12, 9.6, 8.6, 2.4, C.gris),
      ellipse(12, 9.4, 7, 1.6, C.terre, { w: 0.8 }),
      circle(9.2, 8.8, 1, C.ocre, { w: 0.7 }), circle(13, 8.6, 1.1, C.marron, { w: 0.7 }), circle(15.6, 9.6, 0.9, C.vertLight, { w: 0.7 }), circle(11, 10, 0.8, C.vertLight, { w: 0.7 }),
      path("M6 13Q6.2 16.6 8.4 17.6", "none", { c: C.gris, w: 1.1 }),
    ].join(""),
  },
  {
    slug: "tasse-de-cafe", fr: "Boisson chaude", en: "Hot beverage", char: "☕", group: "nourriture",
    tags: ["café", "coffee", "thé", "tea", "tasse", "chaud", "touba"],
    body: [
      line("M8.6 5.6Q7.6 4.6 8.6 3.6Q9.6 2.6 8.6 1.6M12.6 5.6Q11.6 4.6 12.6 3.6Q13.6 2.6 12.6 1.6", C.gris, 1),
      ellipse(11.4, 21, 8.4, 1.8, C.white),
      cup(C.white, C.marron),
      line("M7.2 13L8.4 14.2L9.6 13L10.8 14.2L12 13L13.2 14.2L14.4 13L15.2 13.8", C.terre, 1),
    ].join(""),
  },
  {
    slug: "pasteque", fr: "Pastèque", en: "Watermelon", char: "🍉", group: "nourriture",
    tags: ["pastèque", "watermelon", "fruit", "été", "melon", "frais"],
    body: [
      path("M2.2 8H21.8A9.8 9.8 0 0 1 2.2 8Z", C.feuille),
      path("M3.6 8H20.4A8.4 8.4 0 0 1 3.6 8Z", "#E6F1C4", false),
      path("M4.6 8H19.4A7.4 7.4 0 0 1 4.6 8Z", C.rouge, { w: 0.8 }),
      ...[[8, 10.4, -30], [12, 12.4, 0], [16, 10.4, 30], [10, 14.6, -15], [14, 14.6, 15], [12, 9.6, 0]].map(([x, y, d]) => g(`rotate(${d} ${x} ${y})`, ellipse(x, y, 0.5, 0.85, C.noir, false))),
      path("M2.2 8H21.8A9.8 9.8 0 0 1 2.2 8Z", "none"),
    ].join(""),
  },
  {
    slug: "pain", fr: "Pain", en: "Bread", char: "🍞", group: "nourriture",
    tags: ["pain", "bread", "boulangerie", "bakery", "petit-déjeuner", "breakfast"],
    body: [
      path("M4.6 12.4H19.4V19.4Q19.4 20.6 18.2 20.6H5.8Q4.6 20.6 4.6 19.4Z", C.ocreLight),
      path("M3.2 11.6Q2.6 5.4 12 5.4Q21.4 5.4 20.8 11.6Q20.6 13.2 19 13.2H5Q3.4 13.2 3.2 11.6Z", C.bois),
      line("M7.4 8.4L8.8 10.4M11.2 7.6L12.6 9.6M15 8.4L16.4 10.4", C.marron, 1),
      path("M5.8 15.6V18.6", "none", { c: C.white, w: 1.1 }),
    ].join(""),
  },
  {
    slug: "cuisse-de-poulet", fr: "Cuisse de poulet", en: "Poultry leg", char: "🍗", group: "nourriture",
    tags: ["poulet", "chicken", "cuisse", "drumstick", "braisé", "grillé"],
    body: [
      path("M10.4 12.6L5.2 17.8L6.4 19L11.6 13.8Z", C.cream, { w: 0.9 }),
      circle(4.4, 17.6, 1.5, C.cream, { w: 0.9 }), circle(6.4, 19.6, 1.5, C.cream, { w: 0.9 }),
      path("M14.4 3Q20.8 3 20.8 9.4Q20.8 13.8 16 15.4L12.4 16.4Q10.6 13.8 8.4 12.2Q9.8 9.2 9.8 7.6Q10 3 14.4 3Z", C.bois),
      path("M13.4 5.6Q16.6 4.6 18.2 7.4", "none", { c: C.ocreLight, w: 1.2 }),
      line("M12.2 9.6l.8.6M15.4 11l.6.8M17.2 8.8l.8.4", C.marron, 0.8),
    ].join(""),
  },

  /* ===================== objets ===================== */
  { slug: "cotillon", fr: "Cotillon", en: "Party popper", char: "🎉", group: "objets", tags: ["fête", "party", "célébration", "celebration", "bravo", "anniversaire"], body: popper() },
  {
    slug: "cadeau", fr: "Cadeau", en: "Wrapped gift", char: "🎁", group: "objets",
    tags: ["cadeau", "gift", "présent", "present", "anniversaire", "birthday"],
    body: [
      rect(4.8, 12, 14.4, 9.6, 1, C.terre),
      rect(3.6, 8.4, 16.8, 4, 1, C.terre),
      rect(10.6, 8.4, 2.8, 13.2, 0, C.ocreLight),
      path("M12 8.4Q8 3.2 6.4 5.4Q5.4 7.4 12 8.4Z", C.ocreLight),
      path("M12 8.4Q16 3.2 17.6 5.4Q18.6 7.4 12 8.4Z", C.ocreLight),
      line("M4.8 12.4H19.2", O, 0.9),
    ].join(""),
  },
  {
    slug: "telephone-portable", fr: "Téléphone portable", en: "Mobile phone", char: "📱", group: "objets",
    tags: ["téléphone", "phone", "portable", "mobile", "smartphone", "appel"],
    body: [
      rect(6.4, 1.6, 11.2, 20.8, 2.4, C.noir),
      rect(7.8, 4, 8.4, 15.2, 0.8, C.ciel, { w: 0.8 }),
      rect(9, 5.4, 2.4, 2.4, 0.6, C.ocre, { w: 0.6 }), rect(12.6, 5.4, 2.4, 2.4, 0.6, C.vertLight, { w: 0.6 }),
      rect(9, 9, 2.4, 2.4, 0.6, C.terre, { w: 0.6 }), rect(12.6, 9, 2.4, 2.4, 0.6, C.indigoLight, { w: 0.6 }),
      line("M10.6 20.8H13.4", C.gris, 0.9),
      line("M11 2.9H13", C.gris, 0.7),
    ].join(""),
  },
  {
    slug: "sac-d-argent", fr: "Sac d'argent", en: "Money bag", char: "💰", group: "objets",
    tags: ["argent", "money", "sac", "bag", "riche", "francs"],
    body: [
      path("M8.6 7.8Q7.4 4 9 3Q10.6 3.8 12 3Q13.4 3.8 15 3Q16.6 4 15.4 7.8Z", C.ocre),
      path("M8.8 8Q3.8 11.6 3.8 16.2Q3.8 21.6 12 21.6Q20.2 21.6 20.2 16.2Q20.2 11.6 15.2 8Z", C.ocre),
      rect(8.2, 7, 7.6, 1.9, 0.95, C.terre, { w: 0.9 }),
      line("M14 12.9Q13.4 11.9 12 11.9Q10.2 11.9 10.2 13.4Q10.2 14.7 12 15.1Q13.9 15.5 13.9 16.9Q13.9 18.4 12 18.4Q10.6 18.4 9.9 17.4M12 10.6V19.6", O, 1.2),
    ].join(""),
  },
  { slug: "ballon-de-football", fr: "Ballon de football", en: "Soccer ball", char: "⚽", group: "objets", tags: ["football", "soccer", "ballon", "ball", "sport", "can"], body: football() },
  {
    slug: "tambour-et-baguettes", fr: "Tambour", en: "Drum", char: "🥁", group: "objets",
    tags: ["tambour", "drum", "musique", "music", "rythme", "percussion"],
    body: [
      path("M3.8 9.6V17.2Q3.8 20.6 12 20.6Q20.2 20.6 20.2 17.2V9.6Z", C.terre),
      line("M4.6 12L7 19.2L9.6 12.8L12 19.8L14.4 12.8L17 19.2L19.4 12", C.ocreLight, 1),
      path("M3.8 17.2Q3.8 20.6 12 20.6Q20.2 20.6 20.2 17.2", "none"),
      ellipse(12, 9.6, 8.2, 2.8, C.cream),
      path("M3.2 3.4L4.2 2.4L12.6 9.8L11.8 10.6Z", C.bois, { w: 0.9 }), circle(3.4, 2.6, 1.1, C.bois, { w: 0.9 }),
      path("M20.8 3.4L19.8 2.4L11.4 9.8L12.2 10.6Z", C.bois, { w: 0.9 }), circle(20.6, 2.6, 1.1, C.bois, { w: 0.9 }),
    ].join(""),
  },
  {
    slug: "note-de-musique", fr: "Note de musique", en: "Musical note", char: "🎵", group: "objets",
    tags: ["musique", "music", "note", "chanson", "song", "son"],
    body: [
      path("M11.4 17.6V2.6H13.2Q13.6 6.2 16.8 7.8Q19.6 9.4 18.4 13.4Q17.6 10.4 13.2 9.4V17.6Z", C.indigo),
      g("rotate(-22 9 17.8)", ellipse(9, 17.8, 4, 3, C.indigo)),
      path("M7.2 16.6Q8 15.6 9.2 15.6", "none", { c: C.indigoLight, w: 1.1 }),
    ].join(""),
  },
  {
    slug: "maison", fr: "Maison", en: "House", char: "🏠", group: "objets",
    tags: ["maison", "house", "home", "foyer", "logement", "chez soi"],
    body: [
      rect(15.6, 4, 2.4, 5, 0.4, C.terreDark),
      rect(4.6, 10.4, 14.8, 11.2, 0.6, C.sable),
      line("M5.2 13.2L6.6 12.2L8 13.2L9.4 12.2L10.8 13.2L12.2 12.2L13.6 13.2L15 12.2L16.4 13.2L17.8 12.2L18.8 13", C.terre, 0.9),
      path("M2.2 11.4L12 2.8L21.8 11.4Q21.6 12.4 20.6 12L12 4.8L3.4 12Q2.4 12.4 2.2 11.4Z", C.terre),
      rect(10, 15, 4, 6.6, 0.6, C.bois),
      circle(13, 18.4, 0.4, O, false),
      rect(15.4, 14.6, 2.6, 2.6, 0.4, C.ciel, { w: 0.9 }),
      rect(6, 14.6, 2.6, 2.6, 0.4, C.ciel, { w: 0.9 }),
      line("M2.6 21.6H21.4"),
    ].join(""),
  },
  {
    slug: "voiture", fr: "Voiture", en: "Automobile", char: "🚗", group: "objets",
    tags: ["voiture", "car", "auto", "route", "road", "transport"],
    body: [
      path("M2.4 16.8V14Q2.4 12.2 4.2 11.8L6.8 11.2L9 7.6Q9.6 6.8 10.6 6.8H15.4Q16.4 6.8 17 7.6L19.4 11.2Q21.6 11.6 21.6 13.8V16.8Q21.6 17.8 20.6 17.8H3.4Q2.4 17.8 2.4 16.8Z", C.rouge),
      path("M8.4 11.2L10.2 8.4H12.4V11.2Z", C.ciel, { w: 0.9 }),
      path("M13.8 11.2V8.4H15.8L17.6 11.2Z", C.ciel, { w: 0.9 }),
      rect(19.8, 13, 1.8, 1.4, 0.5, C.ocreLight, { w: 0.8 }),
      line("M11 13.6H12.6", O, 0.9),
      circle(7, 17.8, 2.6, C.noir), circle(7, 17.8, 1, C.gris, { w: 0.8 }),
      circle(17, 17.8, 2.6, C.noir), circle(17, 17.8, 1, C.gris, { w: 0.8 }),
    ].join(""),
  },
  {
    slug: "avion", fr: "Avion", en: "Airplane", char: "✈️", group: "objets",
    tags: ["avion", "airplane", "plane", "voyage", "travel", "vol"],
    body: g("rotate(45 12 12)",
      path("M12 1.6Q13.4 1.6 13.4 3.8V9.4L21.2 14V16L13.4 13.6V18.4L15.8 20.2V21.8L12 20.8L8.2 21.8V20.2L10.6 18.4V13.6L2.8 16V14L10.6 9.4V3.8Q10.6 1.6 12 1.6Z", C.grisLight),
      line("M12 3.6V6", C.bleu, 1),
    ),
  },
  {
    slug: "punaise-ronde", fr: "Punaise", en: "Round pushpin", char: "📍", group: "objets",
    tags: ["punaise", "pushpin", "lieu", "location", "épingle", "ici"],
    body: [
      path("M10.4 12.6L3.4 21.6L4.2 22.2L12.6 14.6Z", C.gris, { w: 0.9 }),
      circle(14, 9.4, 6.6, C.rouge),
      ellipse(12, 7, 1.8, 1.2, "#F48C7F", false),
    ].join(""),
  },
  {
    slug: "ampoule", fr: "Ampoule", en: "Light bulb", char: "💡", group: "objets",
    tags: ["ampoule", "bulb", "idée", "idea", "lumière", "light"],
    body: [
      line("M3 8.6H1.6M22.4 8.6H21M4.4 3.2L3.4 2.2M19.6 3.2L20.6 2.2", C.ocre, 1.1),
      path("M12 2.4Q18 2.4 18 8.6Q18 11.6 15.6 13.6Q14.6 14.6 14.6 16H9.4Q9.4 14.6 8.4 13.6Q6 11.6 6 8.6Q6 2.4 12 2.4Z", C.jaune),
      line("M10.4 16V11.2L11.2 10.2L12 11.2L12.8 10.2L13.6 11.2V16", C.terre, 0.9),
      path("M8.4 6.6Q9.2 4.6 11.2 4.4", "none", { c: C.white, w: 1.1 }),
      rect(9.2, 15.6, 5.6, 4, 1, C.gris),
      line("M9.4 17.6H14.6", O, 0.8),
      path("M10.4 19.6H13.6Q13.4 21.4 12 21.4Q10.6 21.4 10.4 19.6Z", C.noir, { w: 0.9 }),
    ].join(""),
  },
  {
    slug: "toque-de-diplome", fr: "Toque de diplômé", en: "Graduation cap", char: "🎓", group: "objets",
    tags: ["diplôme", "graduation", "école", "school", "université", "étudiant"],
    body: [
      path("M6.2 11.6V16.4Q12 19.8 17.8 16.4V11.6L12 14.4Z", C.indigo),
      path("M1.8 9.4L12 4.4L22.2 9.4L12 14.4Z", C.indigo),
      path("M12 9.4L18.8 11.2V16.6", "none", { c: C.ocre, w: 1.2 }),
      path("M18 16.4H19.6L20.2 19.4H17.4Z", C.ocre, { w: 0.9 }),
      circle(12, 9.4, 0.9, C.ocre, { w: 0.8 }),
      line("M7.6 16.6Q12 18.4 16.4 16.6", C.terre, 0.9),
    ].join(""),
  },
  {
    slug: "reveil", fr: "Réveil", en: "Alarm clock", char: "⏰", group: "objets",
    tags: ["réveil", "alarm", "clock", "heure", "time", "matin"],
    body: [
      line("M7.6 19.4L5.6 22M16.4 19.4L18.4 22", O, 1.4),
      g("rotate(-38 6 5.6)", path("M2.8 7Q2.8 3.2 6 3.2Q9.2 3.2 9.2 7Z", C.ocre)),
      g("rotate(38 18 5.6)", path("M14.8 7Q14.8 3.2 18 3.2Q21.2 3.2 21.2 7Z", C.ocre)),
      circle(12, 13.2, 8, C.rouge),
      circle(12, 13.2, 6.2, C.white),
      line("M12 8.4V9.2M12 17.2V18M7.2 13.2H8M16 13.2H16.8", C.gris, 0.9),
      line("M12 13.2V9.8M12 13.2L14.6 14.8", O, 1.2),
      circle(12, 13.2, 0.6, O, false),
    ].join(""),
  },
];

export default list.map((e) => ({ tone: false, ...e }));
