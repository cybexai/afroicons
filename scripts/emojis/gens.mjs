// Emojis « mains » (Unicode) et « personnes » (originaux africains) d'Afroicons.
// Dessins originaux : couleur à plat, contour brun arrondi, peau en SKIN / SKIN_SHADE (5 teintes au build).
import { O, W, C, SKIN, SKIN_SHADE, path, circle, ellipse, rect, line, g, bust, handOpen } from "./lib.mjs";

/* ---------- outils locaux ---------- */
const r2 = (v) => Math.round(v * 100) / 100;
/** Doigt (ou bras) en « tube » : trait épais de peau bordé de contour. */
const tube = (d, sw = 2.3, fill = SKIN) =>
  `<path d="${d}" fill="none" stroke="${O}" stroke-width="${r2(sw + 2 * W)}" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="${d}" fill="none" stroke="${fill}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
const dot = (x, y, r = 0.6, c = O) => circle(x, y, r, c, false);
/** Poignet de vêtement en wax (petits points). */
const cuff = (x, y, w, h, fill = C.indigo, spot = C.ocre) => {
  const dots = [];
  for (let i = 0; i < Math.floor(w / 2); i++) dots.push(circle(r2(x + 1.1 + i * 2 + (w - 2 * Math.floor(w / 2)) / 2), r2(y + h / 2), 0.45, spot, false));
  return rect(x, y, w, h, 0.9, fill) + dots.join("");
};
const mirror = (...kids) => g("matrix(-1 0 0 1 24 0)", ...kids);
/** Traits de mouvement (courts). */
const motion = (...ds) => ds.map((d) => line(d, O, 1)).join("");

/* ---------- main de face (paume vers nous, pouce à gauche) ---------- */
// fingers : { index, middle, ring, pinky } → [x, y] du bout du doigt levé, ou absent = replié sur la paume.
// thumb : "out" (écarté), "across" (posé sur les doigts repliés), ou un tracé.
const BASE = { index: 8.9, middle: 11.2, ring: 13.4, pinky: 15.4 };
function front({ fingers = {}, thumb = "out", cuffColor = C.indigo, order = ["pinky", "ring", "middle", "index"] } = {}) {
  const out = [];
  for (const f of order) if (Array.isArray(fingers[f])) {
    const [x, y] = fingers[f];
    out.push(tube(`M${BASE[f]} 13.5L${x} ${y}`));
  }
  out.push(path("M7.4 12.2Q7.4 10.8 8.8 10.8H15.4Q16.8 10.8 16.8 12.2V16.4Q16.8 20.4 12.6 20.4H11.4Q7.4 20.4 7.4 16.6Z", SKIN));
  for (const f of ["index", "middle", "ring", "pinky"]) if (!fingers[f]) out.push(rect(r2(BASE[f] - 1.15), 10.2, 2.3, 4.3, 1.15, SKIN));
  if (thumb === "out") out.push(tube("M8.4 17.6L5 13.4", 2.5));
  else if (thumb === "across") out.push(tube("M8.2 18.2Q9.4 15.6 13.4 15", 2.5));
  else if (thumb) out.push(tube(thumb, 2.5));
  out.push(cuff(7.8, 19.6, 8.6, 3.2, cuffColor));
  return out.join("");
}

/* ---------- poing (dos des doigts vers nous) ---------- */
const fistPath = "M6 16V7A1.5 1.5 0 0 1 9 7A1.5 1.5 0 0 1 12 7A1.5 1.5 0 0 1 15 7A1.5 1.5 0 0 1 18 7V15.4Q18 19 14 19H10Q6 19 6 16Z";
const fist = (cuffColor = C.terre) =>
  path(fistPath, SKIN) +
  line("M9 7V10.6M12 7V10.6M15 7V10.6", O, 0.9) +
  tube("M7.4 13.6Q10.6 12.4 14.6 12.8", 2.6) +
  cuff(7.4, 18.4, 9.2, 3.6, cuffColor);

/* ---------- pouce levé (poing de profil) ---------- */
const thumbUp = (cuffColor = C.vert) =>
  tube("M10 11.5L10.8 4", 3.2) +
  path("M8 10.2H16.6A1.35 1.35 0 0 1 16.6 12.9A1.35 1.35 0 0 1 16.6 15.6A1.35 1.35 0 0 1 16.6 18.3A1.35 1.35 0 0 1 16.6 21H10Q8 21 8 19Z", SKIN) +
  line("M16.6 12.9H13.2M16.6 15.6H13.2M16.6 18.3H13.6", O, 0.9) +
  cuff(4.4, 10.6, 3.8, 10, cuffColor);

/* ---------- main « moufle » (doigts serrés) pour 👏 🙏 ---------- */
const mitten = (fill = SKIN) =>
  path("M8 13.4V6Q8 3.6 10.4 3.6H12.6Q15 3.6 15 6V15.4Q15 20.4 11.2 20.4Q8.4 20.4 7 17.8L4.9 13.9A1.25 1.25 0 0 1 7 12.6Z", fill) +
  line("M10.3 4V8.6M12.6 3.8V8.6", O, 0.8);

/* ---------- personnes : petits accessoires ---------- */
const earring = (x = 7.6, y = 12.4, c = C.ocre) => circle(x, y, 0.8, c, { w: 0.7 });
/** Rangée de perles. */
const beads = (pts, c = C.terre, r = 0.62) => pts.map(([x, y]) => circle(x, y, r, c, { w: 0.6 })).join("");
const arcPts = (cx, cy, rx, ry, a0, a1, n) => Array.from({ length: n }, (_, i) => {
  const t = ((a0 + ((a1 - a0) * i) / (n - 1)) * Math.PI) / 180;
  return [r2(cx + rx * Math.cos(t)), r2(cy + ry * Math.sin(t))];
});
/** Vêtement à épaules droites (pour poser des rayures sans découpe). */
const SHOULDERS = "M3.6 23V20.4Q3.6 17.2 8.4 16.6H15.6Q20.4 17.2 20.4 20.4V23Z";
/** Réduction avec contour d'épaisseur constante. */
const scaled = (tr, k, svg) => g(tr, svg.replace(/stroke-width="([\d.]+)"/g, (_, w) => `stroke-width="${r2(w / k)}"`));
const shrink = (k, ...kids) => g(`translate(12 23) scale(${k}) translate(-12 -23)`, ...kids);

/* ---------- mains ---------- */
const hands = [
  {
    slug: "pouce-leve", fr: "Pouce levé", en: "Thumbs up", char: "👍",
    tags: ["pouce", "thumbs up", "d'accord", "like", "bravo", "ok"],
    body: g("translate(0.6 0)", thumbUp()),
  },
  {
    slug: "pouce-baisse", fr: "Pouce baissé", en: "Thumbs down", char: "👎",
    tags: ["pouce", "thumbs down", "non", "dislike", "pas d'accord"],
    body: g("rotate(180 12 12)", g("translate(0.6 0)", thumbUp(C.terre))),
  },
  {
    slug: "applaudissements", fr: "Applaudissements", en: "Clapping hands", char: "👏",
    tags: ["applaudir", "clap", "bravo", "félicitations", "ovation"],
    body: g("translate(2.6 0.6) rotate(-24 12 20)", mirror(mitten(SKIN_SHADE))) + g("translate(-2.2 1.2) rotate(20 12 20)", mitten()) +
      motion("M7.4 3.2L6.4 1.6", "M4.8 5.4L3.2 4.6", "M17.4 2.6L18.6 1.2", "M19.6 5L21.2 4.4"),
  },
  {
    slug: "mains-jointes", fr: "Mains jointes", en: "Folded hands", char: "🙏",
    tags: ["prière", "pray", "merci", "thank you", "s'il vous plaît", "amen"],
    body: [false, true].map((m) => {
      const half = path("M12 2.6Q9.8 3.2 9.2 6.4L7.8 13.6Q7.4 15.6 6 17.2L9.4 20.4Q11.2 18.8 12 17.6Z", SKIN) +
        line("M10.6 12.2Q10.2 14.6 11.2 16.4", O, 0.8) + cuff(4.4, 17.4, 4.4, 3.4, C.indigo);
      return m ? mirror(half) : half;
    }).join(""),
  },
  {
    slug: "salut-main", fr: "Main qui salue", en: "Waving hand", char: "👋",
    tags: ["salut", "wave", "bonjour", "au revoir", "hello", "bye"],
    body: g("rotate(-20 12 20)", handOpen()) + motion("M2.6 9.4Q2 7 3 5", "M4.6 4.4Q5.6 2.6 7.4 2", "M19.8 15.6Q21.6 15 22.2 13", "M19.6 19.2Q21.8 18.8 22.6 17.4"),
  },
  {
    slug: "signe-victoire", fr: "Signe de la victoire", en: "Victory hand", char: "✌️",
    tags: ["victoire", "victory", "paix", "peace", "v"],
    body: front({ fingers: { index: [7.2, 3.6], middle: [14, 3] }, thumb: "across" }),
  },
  {
    slug: "ok-main", fr: "Main OK", en: "OK hand", char: "👌",
    tags: ["ok", "parfait", "perfect", "d'accord", "nickel"],
    body: tube("M7.4 12.6A3.4 3.4 0 1 1 10 6.4", 2.3) +
      front({ fingers: { index: "hide", middle: [11.4, 3.2], ring: [14.6, 3.8], pinky: [18, 6] }, thumb: false, order: ["middle", "ring", "pinky"] }) +
      tube("M8.2 17.4Q5.6 15.6 5.4 12.4", 2.5),
  },
  {
    slug: "biceps", fr: "Biceps", en: "Flexed biceps", char: "💪",
    tags: ["force", "strong", "muscle", "biceps", "courage", "puissance"],
    body: path("M2.6 21.4V15.6Q4.6 11.2 9.4 10.6Q12.8 10.4 13.6 13L13.4 9.6L18.6 8.6Q21 15.8 20.4 18.4Q19.8 21.4 16 21.4Z", SKIN) +
      line("M6.6 13.6Q9.6 12.4 11.8 14.4", SKIN_SHADE, 1) + line("M13.6 13Q14.2 16 13.2 17.6", O, 0.9) +
      rect(12.6, 2.2, 7.2, 8, 3, SKIN) + [3.4, 5.6, 7.8].map((y) => rect(10.8, y, 4.4, 2.2, 1.1, SKIN)).join("") + line("M15.2 2.6Q17.4 4 17.4 6.6", O, 0.9) +
      cuff(1.4, 15, 3.6, 7, C.terre),
  },
  {
    slug: "main-levee", fr: "Main levée", en: "Raised hand", char: "✋",
    tags: ["main", "stop", "hand", "lever la main", "high five"],
    body: handOpen() + cuff(7.6, 19.6, 8.8, 3.2, C.indigo),
  },
  {
    slug: "index-droite", fr: "Index vers la droite", en: "Backhand index pointing right", char: "👉",
    tags: ["index", "pointer", "droite", "right", "point", "toi"],
    body: g("rotate(90 12 12)", front({ fingers: { index: [9.4, 2.6] }, thumb: "across" })),
  },
  {
    slug: "index-leve", fr: "Index levé", en: "Index pointing up", char: "☝️",
    tags: ["index", "pointer", "attention", "un", "point up", "idée"],
    body: front({ fingers: { index: [9.4, 2.6] }, thumb: "across", cuffColor: C.vert }),
  },
  {
    slug: "doigts-croises", fr: "Doigts croisés", en: "Crossed fingers", char: "🤞",
    tags: ["chance", "luck", "espoir", "fingers crossed", "souhait"],
    body: front({ fingers: { middle: [9.8, 3.2], index: [13.6, 3.6] }, thumb: "across", order: ["middle", "index"], cuffColor: C.terre }),
  },
  {
    slug: "mains-levees", fr: "Mains levées", en: "Raising hands", char: "🙌",
    tags: ["hourra", "celebrate", "joie", "fête", "louange", "hooray"],
    body: scaled("translate(-1.8 7.4) scale(0.68)", 0.68, g("rotate(-8 12 20)", handOpen(), cuff(7.6, 19.6, 8.8, 3.2, C.indigo))) +
      scaled("translate(9.5 7.4) scale(0.68)", 0.68, mirror(g("rotate(-8 12 20)", handOpen(), cuff(7.6, 19.6, 8.8, 3.2, C.indigo)))) +
      motion("M3.6 6.4L2.6 4.8", "M6.6 5L6.8 3.2", "M9.4 6.2L10.2 4.8", "M20.4 6.4L21.4 4.8", "M17.4 5L17.2 3.2", "M14.6 6.2L13.8 4.8"),
  },
  {
    slug: "mains-coeur", fr: "Mains en cœur", en: "Heart hands", char: "🫶",
    tags: ["cœur", "heart", "amour", "love", "merci", "soutien"],
    body: [false, true].map((m) => {
      const half = tube("M5.4 15Q2 10.4 4.4 6.6Q7 3.4 10 5.4Q11.4 6.4 12 8.4", 2.4) +
        path("M3 14.6Q4.8 12.4 7.4 13.6Q9.4 14.8 8.6 18.6L7.8 21.8H3.4Z", SKIN) + tube("M7.8 17.4Q10.4 18.4 12 20.4", 2.2);
      return m ? mirror(half) : half;
    }).join("") + path("M12 16.2L9.4 13.4A1.5 1.5 0 0 1 12 11.4A1.5 1.5 0 0 1 14.6 13.4Z", C.rouge, { w: 0.8 }),
  },
  {
    slug: "poing-leve", fr: "Poing levé", en: "Raised fist", char: "✊",
    tags: ["poing", "fist", "lutte", "solidarité", "power", "résistance"],
    body: g("translate(0 0.6)", fist()),
  },
  {
    slug: "poignee-de-main", fr: "Poignée de main", en: "Handshake", char: "🤝",
    tags: ["accord", "handshake", "deal", "partenariat", "salutation", "paix"],
    body: g("translate(0 1.2)", path("M4.4 10.4L11 10Q14.6 10.2 15.8 12.6L16.8 15.4Q16.8 17.8 14 17.8L4.4 17.8Z", SKIN) +
      path("M19.6 6.8L13.2 8Q10 8.8 9.2 11.6L9 13L19.6 14.2Z", SKIN) +
      [9.6, 11.6, 13.6, 15.6].map((x, i) => tube(`M${r2(x + 0.8)} 11.8L${x} ${r2(17 - Math.abs(i - 1.5) * 0.4)}`, 1.9)).join("") +
      tube("M6.4 11.8Q8.6 9 12.4 8.8", 2.3) +
      cuff(1.2, 10, 3.4, 8.2, C.indigo) + cuff(19.4, 6.2, 3.4, 8.2, C.terre)),
  },
];

/* ---------- personnes (originaux africains) ---------- */
const WAX = (spots, c = C.terre) => spots.map(([x, y]) => circle(x, y, 0.55, c, false)).join("");
const people = [
  {
    slug: "femme-gele", fr: "Femme au gele", en: "Woman wearing a gele",
    tags: ["gele", "foulard", "head wrap", "nigeria", "yoruba", "wax", "femme"],
    body: bust({
      cloth: C.ocre,
      collar: WAX([[7, 20.4], [10, 19.2], [14, 19.2], [17, 20.4], [8.6, 22], [15.4, 22], [12, 21.6]]),
      top: path("M7 8.6Q5 4.6 7.4 2.6Q9.4 1.4 11 3.4Q12.4 0.8 15.2 1.4Q18.6 2.2 18.4 5Q20.4 5.6 19.6 8Q18.6 9.6 17 9.4Q12 6.6 7 8.6Z", C.ocre) +
        line("M8.4 7.2Q8 4.4 9.6 3.4M11.2 6.4Q11.4 3.8 13.4 2.6M14 6.6Q15.4 4.4 17.6 4.6M16.4 7.6Q18 7 19.4 7.4", C.terre, 0.9) +
        path("M6.8 8.8Q12 6 17.2 9.4L17 10.4Q12 7.8 7 9.8Z", C.terre, { w: 0.8 }) + earring(7.4, 12.6),
      extras: [],
    }),
  },
  {
    slug: "homme-agbada", fr: "Homme en agbada et fila", en: "Man in agbada and fila",
    tags: ["agbada", "boubou", "fila", "yoruba", "homme", "grand boubou", "nigeria"],
    body: bust({
      cloth: C.indigo,
      collar: path("M9.2 16.8L12 21.2L14.8 16.8", "none", { c: C.ocre, w: 1 }) + path("M7.6 17.4Q12 24 16.4 17.4", "none", { c: C.ocre, w: 0.8 }) + dot(12, 19.4, 0.5, C.ocre),
      hair: path("M7.4 10.6Q7 6 12 5.6Q17 6 16.6 10.6Z", C.noir),
      top: path("M7.2 8.6Q6.8 3.4 12.4 3.2Q17.4 3.2 19 5.8Q19.4 7.2 17.6 7.6L16.8 8.8Q12 7 7.2 8.6Z", C.ocre) +
        path("M7.2 8.6Q12 7 16.8 8.8L16.6 10Q12 8.2 7.3 9.8Z", C.terre, { w: 0.8 }) + line("M10 4.2L9.4 7.8M13.2 3.6L13 7.8M16 4.4L15.6 8", C.terre, 0.6),
    }),
  },
  {
    slug: "femme-kente", fr: "Femme en kente", en: "Woman in kente",
    tags: ["kente", "ghana", "ashanti", "tissu", "femme", "pagne", "rayures"],
    body: (() => {
      // bandes verticales de kente : polygones suivant le haut des épaules (pas de découpe SVG)
      const topY = (x) => {
        const u = x > 12 ? 24 - x : x;
        if (u >= 8.4) return 16.6;
        let best = 20.4;
        for (let t = 0; t <= 1.0001; t += 0.01) {
          const bx = (1 - t) ** 2 * 3.6 + 2 * (1 - t) * t * 3.6 + t * t * 8.4, by = (1 - t) ** 2 * 20.4 + 2 * (1 - t) * t * 17.2 + t * t * 16.6;
          if (Math.abs(bx - u) < 0.12) best = Math.min(best, by);
        }
        return best;
      };
      const band = (x0, x1, c) => {
        const pts = [];
        for (let k = 0; k <= 6; k++) { const x = x0 + ((x1 - x0) * k) / 6; pts.push(`${r2(x)} ${r2(topY(x))}`); }
        return path(`M${pts.join("L")}L${x1} 23L${x0} 23Z`, c, false);
      };
      const stripes = [[3.6, 5.2, C.vert], [6.6, 8.2, C.terre], [9.6, 11.2, C.vert], [12.8, 14.4, C.vert], [15.8, 17.4, C.terre], [18.8, 20.4, C.vert]].map(([a, b, c]) => band(a, b, c));
      return [
        path("M12 1.8A3.1 3.1 0 1 1 12 7.6A3.1 3.1 0 1 1 12 1.8Z", C.noir),
        path(SHOULDERS, C.ocre, false), stripes.join(""),
        line("M4.4 19.6H19.6M4 21.4H20", C.noir, 0.7), path(SHOULDERS, "none"),
        path("M10.2 14.6V17.2Q12 18.4 13.8 17.2V14.6Z", SKIN_SHADE, { w: 0.9 }),
        ellipse(12, 10.2, 4.6, 5.2, SKIN), path("M7.4 9.6Q7.4 5 12 5Q16.6 5 16.6 9.6Q14.6 7.4 12 7.4Q9.4 7.4 7.4 9.6Z", C.noir),
        path("M7.6 8.4Q12 5.2 16.4 8.4L16.2 9.6Q12 6.8 7.8 9.6Z", C.vert, { w: 0.8 }),
        dot(10.3, 10.6), dot(13.7, 10.6), line("M10.4 13Q12 14.2 13.6 13", O, 0.9), earring(7.5, 12.6),
      ].join("");
    })(),
  },
  {
    slug: "homme-kufi", fr: "Homme au kufi", en: "Man wearing a kufi",
    tags: ["kufi", "bonnet", "cap", "homme", "dashiki", "afrique de l'ouest"],
    body: bust({
      cloth: C.vert,
      collar: path("M9.4 16.8L12 20.2L14.6 16.8", "none", { c: C.ocreLight, w: 1.1 }) + line("M8.4 17.2L12 21.6L15.6 17.2", C.ocre, 0.7),
      top: path("M7.4 8.8V6.2Q7.4 3.4 12 3.4Q16.6 3.4 16.6 6.2V8.8Q12 7.4 7.4 8.8Z", C.cream) +
        path("M7.4 7.2Q12 5.8 16.6 7.2", "none", { c: C.terre, w: 0.8 }) + beads([[9, 5.2], [11, 4.9], [13, 4.9], [15, 5.2]], C.terre, 0.35) +
        path("M7.6 11.6Q8.2 15.6 12 15.6Q15.8 15.6 16.4 11.6Q15.6 13.8 12 14.2Q8.4 13.8 7.6 11.6Z", C.noir, { w: 0.8 }),
    }),
  },
  {
    slug: "grand-mere-foulard", fr: "Grand-mère au foulard", en: "Grandmother in a headscarf",
    tags: ["grand-mère", "grandmother", "mamie", "foulard", "headscarf", "mama", "aînée"],
    body: bust({
      cloth: C.violet,
      collar: WAX([[7.4, 20.2], [10.4, 19.4], [13.6, 19.4], [16.6, 20.2], [12, 22]], C.ocreLight),
      top: path("M7 10.4Q6.2 4.4 12 4Q17.8 4.4 17 10.4Q15.6 7.4 12 7.4Q8.4 7.4 7 10.4Z", C.terre) +
        WAX([[9.4, 5.6], [12, 5], [14.6, 5.6], [10.6, 6.8], [13.4, 6.8]], C.ocreLight) +
        path("M12 3.6Q10 1.6 9.6 3.6Q10.4 4.6 12 4.2Q13.6 4.6 14.4 3.6Q14 1.6 12 3.6Z", C.terre, { w: 0.8 }) +
        path("M7.6 10.2Q8.6 8.4 10 8.2", "none", { c: C.grisLight, w: 1.2 }) + path("M16.4 10.2Q15.4 8.4 14 8.2", "none", { c: C.grisLight, w: 1.2 }) +
        circle(10.3, 10.2, 1.3, "none", { w: 0.7 }) + circle(13.7, 10.2, 1.3, "none", { w: 0.7 }) + line("M11.6 10.2H12.4", O, 0.6),
    }),
  },
  {
    slug: "enfant-noeuds-bantous", fr: "Enfant aux nœuds bantous", en: "Child with Bantu knots",
    tags: ["enfant", "child", "bantu knots", "coiffure", "tresses", "fille"],
    body: shrink(0.9, bust({
      cloth: C.rose,
      collar: path("M9.6 17Q12 19 14.4 17", "none", { c: C.white, w: 1 }),
      hair: path("M7.2 10.4Q6.8 5 12 4.8Q17.2 5 16.8 10.4Z", C.noir),
      top: path("M7.4 9.8Q8 6 12 6Q16 6 16.6 9.8Q14.6 7.6 12 7.6Q9.4 7.6 7.4 9.8Z", C.noir, false) +
        [[7.6, 5.8], [12, 3.6], [16.4, 5.8]].map(([x, y]) => circle(x, y, 1.9, C.noir) + line(`M${x - 0.8} ${y}Q${x} ${y - 0.9} ${x + 0.7} ${y + 0.1}`, C.marron, 0.6)).join("") +
        ellipse(9, 12.4, 0.9, 0.5, C.rose, false) + ellipse(15, 12.4, 0.9, 0.5, C.rose, false),
    })),
  },
  {
    slug: "femme-bebe-au-dos", fr: "Femme portant un bébé au dos", en: "Woman carrying a baby on her back",
    tags: ["maman", "mother", "bébé", "baby", "pagne", "porter au dos", "famille"],
    body: bust({
      cloth: C.indigo,
      hair: circle(17.6, 9.6, 3, SKIN) + path("M14.8 8.4Q15.4 6.4 17.6 6.4Q19.8 6.4 20.4 8.4Q18 7.6 14.8 8.4Z", C.noir, { w: 0.8 }) + dot(18.6, 9.6, 0.45) +
        path("M14 13.6Q17.8 10.8 21 13.2Q22.2 15.8 20.8 18.4Q17 17.2 14 17.8Z", C.ocre) + WAX([[18.6, 14.2], [20.4, 16.2]], C.terre),
      collar: path("M4.6 19.4Q11 15.8 20.2 17.4L20.6 19.2Q11.6 17.6 5 21.2Z", C.ocre) + WAX([[8.4, 18.6], [12.4, 17.6], [16.6, 17.8]], C.terre) +
        path("M9.4 18.4L8.2 21.6L10 21.2L10.8 18Z", C.ocre, { w: 0.8 }),
      top: path("M7.2 9.4Q6.6 4.2 12 4Q17.4 4.2 16.8 9.4Q14.6 7.4 12 7.4Q9.4 7.4 7.2 9.4Z", C.terre) + path("M12.6 4.2Q14 2 15.6 3.2Q15.2 4.6 13.2 5Z", C.terre, { w: 0.8 }) + earring(7.4, 12.6),
    }),
  },
  {
    slug: "vendeuse-bassine", fr: "Vendeuse à la bassine", en: "Market vendor with a basin",
    tags: ["vendeuse", "vendor", "marché", "market", "bassine", "fruits", "bana bana"],
    body: shrink(0.82, bust({
      cloth: C.vert,
      collar: WAX([[7.4, 20.4], [10.6, 19.4], [13.4, 19.4], [16.6, 20.4], [12, 21.8]], C.ocreLight),
      top: path("M7.2 9.4Q6.6 4.4 12 4.2Q17.4 4.4 16.8 9.4Q14.6 7.6 12 7.6Q9.4 7.6 7.2 9.4Z", C.ocre) + earring(7.4, 12.6),
    })) +
      circle(8.4, 4.2, 2, C.orange) + circle(15.6, 4.4, 1.9, C.rouge) + path("M10.2 4.6Q11.4 0.4 15.6 1.2Q13 2 12.6 4.8Z", C.jaune) + circle(12.2, 3.6, 1.7, C.vertLight) +
      path("M3.2 4.6H20.8L19 8.4Q18.6 9.2 17.6 9.2H6.4Q5.4 9.2 5 8.4Z", C.bleu) + line("M5.6 6.6H18.4", C.white, 0.8),
  },
  {
    slug: "conducteur-moto-taxi", fr: "Conducteur de moto-taxi", en: "Motorbike taxi driver",
    tags: ["moto-taxi", "zémidjan", "okada", "benskin", "boda boda", "casque", "helmet"],
    body: bust({
      cloth: C.jaune,
      collar: path("M8 16.8V23M16 16.8V23", "none", { c: C.indigo, w: 1.4 }) + line("M4.2 20.6H8M16 20.6H19.8", C.grisLight, 1.3),
      top: line("M7.4 12Q8 15.4 10.6 15.4M16.6 12Q16 15.4 13.4 15.4", O, 0.7) +
        path("M6.2 12.8Q5.4 2.6 12 2.6Q18.6 2.6 17.8 12.8H16.6Q16.8 8.6 12 8.4Q7.2 8.6 7.4 12.8Z", C.rouge) +
        path("M6.8 7.4Q12 5 17.2 7.4L17.4 9Q12 6.8 6.6 9Z", C.indigo, { w: 0.8 }) + line("M9.6 3.6Q12.2 3 14.4 3.8", C.white, 0.9),
    }),
  },
  {
    slug: "mariee-traditionnelle", fr: "Mariée en tenue traditionnelle", en: "Bride in traditional attire",
    tags: ["mariée", "bride", "mariage", "wedding", "corail", "coral beads", "edo"],
    body: bust({
      cloth: C.ocre,
      collar: [beads(arcPts(12, 16, 4.4, 2.2, 15, 165, 9), C.orange, 0.55), beads(arcPts(12, 16.2, 5.6, 3.6, 18, 162, 11), C.terre, 0.6)].join(""),
      hair: path("M6.8 11Q6.4 3.2 12 3.2Q17.6 3.2 17.2 11Z", C.noir),
      top: path("M6.8 9.4Q6.6 3.4 12 3.2Q17.4 3.4 17.2 9.4Q12 6.8 6.8 9.4Z", C.terre) +
        beads(arcPts(12, 9.2, 5.2, 4, 196, 344, 9), C.orange, 0.55) + beads([[9.6, 4.6], [12, 3.6], [14.4, 4.6], [12, 6]], C.orange, 0.55) +
        beads([[7.2, 12.4], [7.2, 13.6], [16.8, 12.4], [16.8, 13.6]], C.orange, 0.5),
    }),
  },
  {
    slug: "chef-traditionnel", fr: "Chef traditionnel", en: "Traditional chief",
    tags: ["chef", "chief", "roi", "king", "couronne", "bâton", "kente"],
    body: (() => {
      const toga = path("M3.5 23C3.5 18.6 7 16.4 12 16.4S20.5 18.6 20.5 23Z", C.ocre);
      return [
        line("M20.6 7.4V22.6", C.marron, 1.6), line("M20.6 7.4V22.6", O, 0.3),
        bust({
          cloth: C.ocre,
          collar: path("M6 17.6L16.6 23H10.6L4.2 19.4Z", C.vert, { w: 0.9 }) + line("M7 18.6L12.6 22.4M5.6 19.2L9.6 22", C.terre, 0.7),
          top: path("M7.4 8.6L6.8 3.6Q12 0.6 17.2 3.6L16.6 8.6Q12 7.4 7.4 8.6Z", C.ocreLight) +
            line("M7.4 5.6L8.8 4.4L10.4 5.4L12 4.2L13.6 5.4L15.2 4.4L16.6 5.6", C.terre, 0.8) + beads([[8.6, 7.2], [10.3, 6.8], [12, 6.7], [13.7, 6.8], [15.4, 7.2]], C.vert, 0.45) +
            path("M7.4 8.6Q12 7.4 16.6 8.6L16.8 9.8Q12 8.4 7.2 9.8Z", C.ocre, { w: 0.8 }) + circle(12, 1.6, 0.9, C.rouge, { w: 0.6 }) +
            path("M8 11.6Q8.6 15.6 12 15.6Q15.4 15.6 16 11.6Q15 13.6 12 14Q9 13.6 8 11.6Z", C.noir, { w: 0.7 }),
        }).replace(toga, toga),
        circle(20.6, 5.6, 2, C.ocreLight), circle(20.6, 5.6, 0.7, C.terre, false),
        path("M18.6 15.6Q18.6 14.4 19.8 14.4H21.4Q22.6 14.4 22.6 15.6V17.2Q22.6 18.4 21.4 18.4H19.8Q18.6 18.4 18.6 17.2Z", SKIN),
        line("M18.8 15.8H21.2M18.8 17H21.2", O, 0.6),
      ].join("");
    })(),
  },
  {
    slug: "griot-kora", fr: "Griot avec sa kora", en: "Griot with a kora",
    tags: ["griot", "kora", "musique", "music", "conteur", "mandingue", "djeli"],
    body: [
      bust({
        cloth: C.bleu,
        collar: path("M9.2 16.8Q12 19.4 14.8 16.8", "none", { c: C.white, w: 1 }) + line("M6.6 19.4Q7.4 21.4 6.8 23", C.indigo, 0.8),
        top: path("M7.2 9.6Q6.6 4.6 12 4.4Q17.4 4.6 16.8 9.6Q15.6 6.8 12 6.8Q8.4 6.8 7.2 9.6Z", C.noir) +
          path("M7.8 12Q8.4 15.6 12 15.6Q15.6 15.6 16.2 12Q15.2 13.8 12 14.2Q8.8 13.8 7.8 12Z", C.noir, { w: 0.7 }),
      }),
      line("M17.4 18L21.2 2.8", C.bois, 1.4), line("M17.4 18L21.2 2.8", O, 0.3),
      circle(16.6, 19.2, 3.6, C.bois), path("M13.4 18.4Q16.6 16.6 19.8 18.4", "none", { c: C.cream, w: 0.9 }), circle(16.6, 20.2, 0.7, C.marron, false),
      line("M15.8 17.6L20 4.4M17.2 17.8L20.8 4.8", C.cream, 0.4),
    ].join(""),
  },
];

export default [
  ...hands.map((e) => ({ ...e, group: "mains", tone: true })),
  ...people.map((e) => ({ ...e, char: null, group: "personnes", tone: true })),
];
