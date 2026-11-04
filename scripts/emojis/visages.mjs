// Visages (smileys) et cœurs & symboles : dessins originaux Afroicons.
// Les visages sont africains : peau SKIN (5 teintes Unicode au build, « foncée » par défaut), pas de jaune.
// Lisibilité sur toutes les teintes : yeux en blanc d'œil + pupille, traits foncés (paupières, bouches) doublés
// d'un liseré SKIN_LINE (plus clair que la peau sur la teinte la plus foncée), sourcils et rides en SKIN_LINE.
import { O, W, C, SKIN, SKIN_LINE, path, circle, ellipse, rect, line, g, EYES, MOUTHS, tear, heart, sparkle } from "./lib.mjs";

const r2 = (v) => Math.round(v * 100) / 100;
/* ---------- traits ---------- */
/** Trait foncé doublé d'un liseré SKIN_LINE : reste visible sur la peau la plus claire comme la plus foncée. */
const ln = (d, w = W) => line(d, SKIN_LINE, r2(w + 1.5)) + line(d, O, w);
/** Sourcil, ride (SKIN_LINE). */
const brow = (d, w = 1.2) => line(d, SKIN_LINE, w);
/** Œil ouvert : blanc d'œil, pupille foncée, petit reflet. */
const eye = (x, y, { rx = 1.65, ry = 1.95, px = 0, py = 0.2, pr = 1.05 } = {}) =>
  ellipse(x, y, rx, ry, C.white, { w: 0.7 }) + circle(r2(x + px), r2(y + py), pr, O, false) + circle(r2(x + px + 0.35), r2(y + py - 0.4), 0.3, C.white, false);
const eyes2 = (o = {}, y = 9.6) => eye(8.6, y, o) + eye(15.4, y, o);

/* ---------- yeux ---------- */
const E = {
  dot: eyes2(),
  oval: eyes2({ rx: 1.6, ry: 2.1, pr: 1.1 }, 9.4),
  happy: ln("M6.8 10.3Q8.6 8.2 10.4 10.3") + ln("M13.6 10.3Q15.4 8.2 17.2 10.3"),
  squint: ln("M7 8.1L10.1 9.8L7 11.5") + ln("M17 8.1L13.9 9.8L17 11.5"),
  closed: ln("M6.9 10H10.3") + ln("M13.7 10H17.1"),
  wink: eye(8.6, 9.6) + ln("M13.6 10.1Q15.4 8.4 17.2 10.1"),
  heart: EYES.heart,
  sad: eyes2({ py: 0.4 }, 10.2) + brow("M6.6 7.7L9.8 6.7") + brow("M17.4 7.7L14.2 6.7"),
  angry: eyes2({ py: 0.2, ry: 1.5 }, 10.4) + line("M6.3 7.2L10.3 8.8", SKIN_LINE, 1.5) + line("M17.7 7.2L13.7 8.8", SKIN_LINE, 1.5),
  roll: ellipse(8.6, 9.6, 1.6, 1.9, C.white, { w: 0.7 }) + ellipse(15.4, 9.6, 1.6, 1.9, C.white, { w: 0.7 }) + circle(8.6, 8.4, 0.85, O, false) + circle(15.4, 8.4, 0.85, O, false),
  crying: ln("M6.8 9.6Q8.6 11.2 10.4 9.6") + ln("M13.6 9.6Q15.4 11.2 17.2 9.6") + brow("M6.9 7.6L9.8 6.6") + brow("M17.1 7.6L14.2 6.6"),
  pensive: ln("M6.6 11.8Q8 12.4 10.2 10.9") + ln("M17.4 11.8Q16 12.4 13.8 10.9") + brow("M6.4 8.8Q8.6 8.6 10.2 6.9") + brow("M17.6 8.8Q15.4 8.6 13.8 6.9"),
  crazy: eye(8.4, 9.4, { rx: 2, ry: 2.2, pr: 1.1, px: 0.2 }) + ln("M13.6 10.1Q15.4 8.2 17.2 10.1"),
  smug: path("M7.2 9.4H10.2Q10.2 11.2 8.7 11.2Q7.2 11.2 7.2 9.4Z", C.white, { w: 0.7 }) + circle(9.1, 10, 0.75, O, false) + ln("M6.8 9.4H10.6")
    + path("M14 9.4H17Q17 11.2 15.5 11.2Q14 11.2 14 9.4Z", C.white, { w: 0.7 }) + circle(15.9, 10, 0.75, O, false) + ln("M13.6 9.4H17.4") + brow("M13.8 7L17 6.4"),
  think: eye(8.6, 10.1) + eye(15.4, 9.9) + brow("M6.8 7.6L10 7.3") + brow("M13.8 6.6Q15.6 5.2 17.4 6.6"),
  scream: eye(8.4, 9.8, { rx: 2.1, ry: 2.4, pr: 0.75, py: 0 }) + eye(15.6, 9.8, { rx: 2.1, ry: 2.4, pr: 0.75, py: 0 }),
  stars: path("M8.6 6.6L9.6 8.6L11.8 8.8L10.1 10.3L10.6 12.5L8.6 11.3L6.6 12.5L7.1 10.3L5.4 8.8L7.6 8.6Z", C.ocreLight, { w: 0.8 }) + path("M15.4 6.6L16.4 8.6L18.6 8.8L16.9 10.3L17.4 12.5L15.4 11.3L13.4 12.5L13.9 10.3L12.2 8.8L14.4 8.6Z", C.ocreLight, { w: 0.8 }),
  none: "",
};
/* ---------- bouches ---------- */
const M = {
  smile: ln("M8 14.4Q12 17.6 16 14.4"),
  grin: MOUTHS.grin,
  laugh: MOUTHS.laugh,
  o: MOUTHS.o,
  flat: ln("M8.6 15.4H15.4"),
  frown: ln("M8.2 16.6Q12 13.6 15.8 16.6"),
  kiss: ln("M11.4 13.8Q13.4 14.4 11.6 15.2Q13.4 16 11.4 16.6"),
  smirk: ln("M9.4 15.4Q13 16.4 15.8 14"),
  beam: path("M7 13.4H17Q16.6 17.8 12 17.8Q7.4 17.8 7 13.4Z", C.white) + line("M7.3 15.2H16.7M10 13.4V17.6M14 13.4V17.6", O, 0.8),
  yum: ln("M8 14.2Q12 17.4 16 14.2") + path("M13.4 15.9Q15.8 15.4 16.2 16.6Q16.4 18.2 14.8 18.2Q13.6 18 13.4 15.9Z", C.rose),
  silly: path("M7.6 13.6H16.4Q16.2 17.4 12 17.4Q7.8 17.4 7.6 13.6Z", C.terreDark) + path("M10.2 15.6H14.6V18.6A2.2 2.2 0 0 1 10.2 18.6Z", C.rose) + line("M12.4 16.2V18.4", C.terre, 0.7),
  wail: path("M7.8 17.8Q8 13.4 12 13.4Q16 13.4 16.2 17.8Q12 16.6 7.8 17.8Z", C.terreDark),
  scream: ellipse(12, 16.4, 2, 3, C.terreDark),
  ffrown: ln("M8.4 16.4Q12 13.8 15.6 16.4"),
  pfrown: ln("M9.6 17Q12 15.2 14.4 17"),
  hmm: ln("M9.2 15.6Q11.4 14.8 14.8 15.4"),
  cool: ln("M8.4 14.8Q12 17.4 15.8 14.4"),
  none: "",
};
/** Visage rond à la peau africaine (SKIN). */
const F = ({ eyes = "dot", mouth = "smile", blush = false, extras = [], under = "" } = {}) =>
  [circle(12, 12, 10, SKIN), under,
    blush ? ellipse(6.8, 14.3, 1.8, 1.05, C.rose, false) + ellipse(17.2, 14.3, 1.8, 1.05, C.rose, false) : "",
    E[eyes], M[mouth], ...extras].join("");

/* ---------- accessoires ---------- */
const handPath = "M7.2 13.4V7.6A1.2 1.2 0 0 1 9.6 7.6V11.6V5A1.2 1.2 0 0 1 12 5V11.4V5.6A1.2 1.2 0 0 1 14.4 5.6V11.8V7.8A1.2 1.2 0 0 1 16.8 7.8V15.4Q16.8 20.8 12 20.8Q8.6 20.8 7 17.6L4.6 13.2A1.2 1.2 0 0 1 6.6 12Z";
/** Petite main ouverte à la peau SKIN (même teinte que le visage, comme les mains de gens.mjs). */
const palm = (x, y, s, rot = 0, flip = false) =>
  g(`translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s}) translate(-11 -13)`, path(handPath, SKIN, { w: r2(W / s) }),
    line("M9.6 11.6V12.8M12 11.4V12.8M14.4 11.8V12.8", SKIN_LINE, r2(0.7 / s)));
const scale = (cx, cy, s, ...kids) => g(`translate(${cx} ${cy}) scale(${s}) translate(-12 -12)`, ...kids);
const streams = path("M7 11Q6.2 15.5 6.6 21.2H9.2Q8.4 16 9 11.4Z", C.eau, { w: 0.8 }) + path("M17 11Q17.8 15.5 17.4 21.2H14.8Q15.6 16 15 11.4Z", C.eau, { w: 0.8 });
/** 😂 : deux grosses gerbes de larmes qui jaillissent du coin des yeux, hors du visage. */
const joyTears = path("M7.4 10.6Q3.4 9.8 1.4 12.6Q0.4 14.6 1.6 15.8Q3 16.8 4.6 15.4Q6.4 13.4 7.4 10.6Z", C.eau, { w: 0.9 })
  + path("M16.6 10.6Q20.6 9.8 22.6 12.6Q23.6 14.6 22.4 15.8Q21 16.8 19.4 15.4Q17.6 13.4 16.6 10.6Z", C.eau, { w: 0.9 })
  + line("M2.6 13.4Q3.4 12.4 4.8 12.2M21.4 13.4Q20.6 12.4 19.2 12.2", C.white, 0.6);
/** Tube coloré bordé de contour (doigt, langue-de-belle-mère). */
const tubeO = (d, sw, fill = SKIN) =>
  `<path d="${d}" fill="none" stroke="${O}" stroke-width="${r2(sw + 2 * W)}" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="${d}" fill="none" stroke="${fill}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
const zz = (x, y, s, c = C.indigoLight) => line(`M${x} ${y}H${x + s}L${x} ${y + s}H${x + s}`, c, 1.1);
const ring = (cx, cy, rx, ry, c, w) => line(`M${cx - rx} ${cy}A${rx} ${ry} 0 1 0 ${cx + rx} ${cy}A${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`, c, w);
const flush = "rgba(217,58,43,0.5)";
/** 💢 : marque de colère. */
const anger = (cx, cy) => {
  const d = `M${cx - 1.4} ${cy - 1.6}Q${cx - 0.4} ${cy - 1} ${cx - 0.6} ${cy - 0.4}M${cx + 0.6} ${cy - 0.4}Q${cx + 0.4} ${cy - 1} ${cx + 1.4} ${cy - 1.6}M${cx - 1.4} ${cy + 1.6}Q${cx - 0.4} ${cy + 1} ${cx - 0.6} ${cy + 0.4}M${cx + 0.6} ${cy + 0.4}Q${cx + 0.4} ${cy + 1} ${cx + 1.4} ${cy + 1.6}`;
  return line(d, O, 2.2) + line(d, C.rouge, 1.1);
};
const WAX = (spots, c, r = 0.5) => spots.map(([x, y]) => circle(x, y, r, c, false)).join("");

/* ---------- cœurs ---------- */
const H = "M12 20.6C7 17.4 2.6 13.8 2.6 8.9C2.6 6 4.7 3.9 7.3 3.9C9.4 3.9 11.2 5.2 12 7C12.8 5.2 14.6 3.9 16.7 3.9C19.3 3.9 21.4 6 21.4 8.9C21.4 13.8 17 17.4 12 20.6Z";
const bigHeart = (fill, shine = "rgba(255,255,255,0.55)") => path(H, fill) + line("M5.2 8.6Q5.4 6.6 7.4 6.3", shine, 1.2);

const v = (slug, fr, en, char, tags, body) => ({ slug, fr, en, char, group: "visages", tags, tone: true, body });
const h = (slug, fr, en, char, tags, body) => ({ slug, fr, en, char, group: "coeurs", tags, tone: false, body });

/** Recadrage (audit du dessin) : ces dessins débordaient de la grille 24 × 24 (ou étaient décentrés) ;
 *  ils sont réduits et décalés juste assez pour y tenir : [échelle, décalage x, décalage y]. */
const CADRE = { "visage-festif": [1, 0.7, -0.2], "deux-coeurs": [1, 0.3, 1.6], "visage-horrifie": [0.97, 0, 0] };
const cadre = (e) => { const f = CADRE[e.slug]; return f ? { ...e, body: `<g transform="translate(${Math.round((12 + f[1]) * 100) / 100} ${Math.round((12 + f[2]) * 100) / 100}) scale(${f[0]}) translate(-12 -12)">${e.body}</g>` } : e; };
export default [
  v("visage-souriant", "Visage souriant", "Grinning face", "😀", ["sourire", "smile", "content", "happy", "joie"],
    F({ eyes: "oval", mouth: "grin" })),
  v("visage-souriant-yeux-rieurs", "Visage souriant aux yeux rieurs", "Grinning face with smiling eyes", "😄", ["rire", "joie", "laugh", "happy", "yako"],
    F({ eyes: "happy", mouth: "laugh" })),
  v("visage-rayonnant", "Visage rayonnant aux yeux rieurs", "Beaming face with smiling eyes", "😁", ["dents", "grin", "rayonnant", "fier", "cheese"],
    F({ eyes: "happy", mouth: "beam" })),
  v("visage-plisse-rieur", "Visage souriant aux yeux plissés", "Grinning squinting face", "😆", ["mdr", "lol", "rire", "xd", "laugh"],
    F({ eyes: "squint", mouth: "laugh" })),
  v("visage-sueur", "Visage souriant avec sueur", "Grinning face with sweat", "😅", ["ouf", "sueur", "sweat", "gêne", "relief"],
    F({ eyes: "happy", mouth: "laugh", extras: [tear(18.4, 3.4, 1.15)] })),
  v("mort-de-rire", "Mort de rire", "Rolling on the floor laughing", "🤣", ["mdr", "ptdr", "rofl", "lol", "rire"],
    g("rotate(-22 12 12)", F({ eyes: "squint", mouth: "laugh" }), tear(5, 10.6, 1.05), tear(19, 10.6, 1.05))),
  v("larmes-de-joie", "Visage riant aux larmes", "Face with tears of joy", "😂", ["mdr", "lol", "larmes", "joy", "rire", "dead"],
    scale(12, 12.4, 0.9, F({ eyes: "happy", mouth: "laugh" })) + joyTears),
  v("visage-legerement-souriant", "Visage légèrement souriant", "Slightly smiling face", "🙂", ["sourire", "smile", "ok", "calme", "poli"],
    F({ eyes: "dot", mouth: "smile" })),
  v("clin-d-oeil", "Visage faisant un clin d'œil", "Winking face", "😉", ["clin", "wink", "complice", "taquin", "flirt"],
    F({ eyes: "wink", mouth: "smile" })),
  v("visage-rougissant", "Visage souriant aux joues roses", "Smiling face with smiling eyes", "😊", ["timide", "blush", "doux", "merci", "content"],
    F({ eyes: "happy", mouth: "smile", blush: true })),
  v("visage-aureole", "Visage souriant avec auréole", "Smiling face with halo", "😇", ["ange", "angel", "innocent", "auréole", "sage"],
    ring(12, 3.5, 6.4, 1.5, O, 2.6) + ring(12, 3.5, 6.4, 1.5, C.ciel, 1.1) + scale(12, 13.4, 0.86, F({ eyes: "happy", mouth: "smile", blush: true }))),
  v("visage-coeurs", "Visage souriant entouré de cœurs", "Smiling face with hearts", "🥰", ["amour", "love", "câlin", "chéri", "doux"],
    scale(12, 12.6, 0.88, F({ eyes: "happy", mouth: "smile", blush: true })) + heart(4, 4.2, 0.62, C.rouge, { w: 0.8 }) + heart(20.4, 7, 0.55, C.rouge, { w: 0.8 }) + heart(19.6, 19, 0.62, C.rouge, { w: 0.8 })),
  v("yeux-en-coeur", "Visage aux yeux en cœur", "Smiling face with heart-eyes", "😍", ["amour", "love", "crush", "j'adore", "wow"],
    F({ eyes: "heart", mouth: "grin" })),
  v("yeux-etoiles", "Visage aux yeux étoilés", "Star-struck", "🤩", ["star", "étoile", "wow", "fan", "génial"],
    F({ eyes: "stars", mouth: "laugh" })),
  v("bisou", "Visage envoyant un bisou", "Face blowing a kiss", "😘", ["bisou", "kiss", "mwah", "bise", "love"],
    F({ eyes: "wink", mouth: "kiss" }) + heart(17.2, 16.2, 0.62, C.rouge, { w: 0.8 })),
  v("miam", "Visage savourant", "Face savoring food", "😋", ["miam", "yum", "délicieux", "gourmand", "c'est bon"],
    F({ eyes: "happy", mouth: "yum" })),
  v("langue-clin-d-oeil", "Visage tirant la langue avec un clin d'œil", "Winking face with tongue", "😜", ["langue", "tongue", "fou", "crazy", "blague"],
    F({ eyes: "crazy", mouth: "silly" })),
  v("calin", "Visage faisant un câlin", "Hugging face", "🤗", ["câlin", "hug", "bras ouverts", "akwaba", "bienvenue"],
    F({ eyes: "happy", mouth: "smile", blush: true }) + palm(4.8, 17.6, 0.5, -18) + palm(19.2, 17.6, 0.5, 18, true)),
  v("visage-pensif", "Visage qui réfléchit", "Thinking face", "🤔", ["réfléchir", "think", "hmm", "doute", "question"],
    F({ eyes: "think", mouth: "hmm" })
    + tubeO("M8.6 18.8L5.4 13", 2) + path("M9.4 17.8H11.8Q13.8 17.8 13.8 19.8V20.8Q13.8 22.8 11.8 22.8H9.4Q7.4 22.8 7.4 20.8V19.8Q7.4 17.8 9.4 17.8Z", SKIN)
    + line("M8.2 19.7H12.8M8.2 21.2H12.6", SKIN_LINE, 0.7) + tubeO("M12.6 18.6Q14.4 17.6 16.2 18", 1.8)),
  v("lunettes-de-soleil", "Visage avec lunettes de soleil", "Smiling face with sunglasses", "😎", ["cool", "lunettes", "sunglasses", "style", "boss"],
    F({ eyes: "none", mouth: "cool" })
    + line("M2.4 9.2L4.4 8.6H19.6L21.6 9.2", O, 2.2) + line("M2.4 9.2L4.4 8.6H19.6L21.6 9.2", C.ocre, 1)
    + line("M3.2 8.95L3.8 8.8M20.2 8.8L20.8 8.95", C.vert, 1) + line("M11.4 8.6H12.6", C.rouge, 1)
    + path("M4.2 8.4H10.6Q11 8.4 10.9 8.9L10.4 11.2Q10 12.6 8.4 12.6H6.6Q4.8 12.6 4.4 11Z", C.noir)
    + path("M13.4 8.4H19.8L19.6 11Q19.2 12.6 17.4 12.6H15.6Q14 12.6 13.6 11.2L13.1 8.9Q13 8.4 13.4 8.4Z", C.noir)
    + line("M5.8 9.6L7 9.6", C.white, 0.8) + line("M15 9.6L16.2 9.6", C.white, 0.8)),
  v("sourire-en-coin", "Visage au sourire en coin", "Smirking face", "😏", ["malin", "smirk", "coquin", "ndem", "sûr de soi"],
    F({ eyes: "smug", mouth: "smirk" })),
  v("visage-neutre", "Visage neutre", "Neutral face", "😐", ["neutre", "neutral", "bof", "meh", "sans avis"],
    F({ eyes: "dot", mouth: "flat" })),
  v("yeux-au-ciel", "Visage roulant des yeux", "Face with rolling eyes", "🙄", ["agacé", "eye roll", "pfff", "tchip", "ennui"],
    F({ eyes: "roll", mouth: "hmm" })),
  v("visage-songeur", "Visage songeur", "Pensive face", "😔", ["triste", "pensive", "déçu", "regret", "nostalgie"],
    F({ eyes: "pensive", mouth: "pfrown" })),
  v("visage-en-larmes", "Visage qui pleure", "Crying face", "😢", ["triste", "sad", "larme", "cry", "chagrin"],
    F({ eyes: "sad", mouth: "frown", extras: [tear(16.4, 11.2, 2.1)] })),
  v("pleurs-bruyants", "Visage pleurant à chaudes larmes", "Loudly crying face", "😭", ["pleurer", "cry", "sob", "chagrin", "drame"],
    F({ eyes: "crying", mouth: "none", extras: [streams, M.wail] })),
  v("visage-furieux", "Visage furieux", "Enraged face", "😡", ["colère", "angry", "furieux", "rage", "fâché"],
    F({ eyes: "angry", mouth: "ffrown", under: ellipse(12, 5.4, 6, 2.4, flush, false)
      + ellipse(6.4, 14.4, 2.2, 1.5, flush, false) + ellipse(17.6, 14.4, 2.2, 1.5, flush, false) }) + anger(18.4, 4.4)),
  v("visage-horrifie", "Visage hurlant de peur", "Face screaming in fear", "😱", ["peur", "scream", "choc", "horreur", "eish"],
    F({ eyes: "scream", mouth: "scream", under: path("M2.4 9.4A10 10 0 0 1 21.6 9.4Q12 6.6 2.4 9.4Z", C.ciel, false) })
    + palm(4, 17.4, 0.52, -12) + palm(20, 17.4, 0.52, 12, true)),
  v("visage-endormi", "Visage endormi", "Sleeping face", "😴", ["dormir", "sleep", "zzz", "fatigué", "dodo"],
    scale(11, 13, 0.9, F({ eyes: "closed", mouth: "o" })) + zz(16.4, 1.6, 2.8) + zz(20.2, 5.4, 2)),
  v("visage-festif", "Visage festif", "Partying face", "🥳", ["fête", "party", "anniversaire", "birthday", "ambiance"],
    scale(11, 14.4, 0.8, F({ eyes: "happy", mouth: "o", blush: true }))
    + path("M12.6 5.8L19.3 2.4L18.5 9.9Q15 8.7 12.6 5.8Z", C.terre)
    + WAX([[14.6, 6], [17.4, 7.6], [16.8, 4.6], [18.6, 5.2]], C.ocreLight, 0.55) + WAX([[14.6, 6], [17.4, 7.6]], C.terreDark, 0.22) + WAX([[16, 7.4], [18.4, 3.6]], C.vertLight, 0.35)
    + circle(19.3, 2.4, 1.2, C.ocreLight, { w: 0.8 })
    + tubeO("M10.4 17.6L4 18.4", 1.5, C.rose) + line("M8.6 17.1L8.8 18.2M6.6 17.4L6.8 18.4", C.white, 0.6)
    + tubeO("M4 18.4Q1.6 18.6 1.6 20.4Q1.8 22.2 3.4 21.8Q4.6 21.2 3.8 20.2", 1.3, C.rose) + rect(10, 16.6, 1.8, 2, 0.5, C.ocre, { w: 0.8 })
    + rect(20.6, 12.4, 1.6, 1.6, 0.3, C.vertLight, false) + rect(2.2, 4, 1.6, 1.6, 0.3, C.rose, false)
    + circle(21.4, 16.6, 0.9, C.ocre, false) + circle(5.4, 2, 0.8, C.bleu, false) + circle(9, 2.4, 0.7, C.rouge, false) + circle(2.6, 9.2, 0.7, C.vertLight, false)),

  /* ---------- cœurs & symboles ---------- */
  h("coeur-rouge", "Cœur rouge", "Red heart", "❤️", ["amour", "love", "cœur", "heart", "je t'aime"], bigHeart(C.rouge)),
  h("coeur-orange", "Cœur orange", "Orange heart", "🧡", ["amour", "love", "cœur", "heart", "orange"], bigHeart(C.orange)),
  h("coeur-jaune", "Cœur jaune", "Yellow heart", "💛", ["amitié", "friendship", "cœur", "heart", "jaune"], bigHeart(C.jaune)),
  h("coeur-vert", "Cœur vert", "Green heart", "💚", ["nature", "green", "cœur", "heart", "vert"], bigHeart(C.feuille)),
  h("coeur-bleu", "Cœur bleu", "Blue heart", "💙", ["confiance", "blue", "cœur", "heart", "bleu"], bigHeart(C.bleu)),
  h("coeur-violet", "Cœur violet", "Purple heart", "💜", ["tendresse", "purple", "cœur", "heart", "violet"], bigHeart(C.violet)),
  h("coeur-noir", "Cœur noir", "Black heart", "🖤", ["deuil", "black", "cœur", "heart", "noir"], bigHeart(C.noir, "rgba(255,255,255,0.35)")),
  h("coeur-blanc", "Cœur blanc", "White heart", "🤍", ["pureté", "white", "cœur", "heart", "blanc"], path(H, C.white) + line("M5.2 8.6Q5.4 6.6 7.4 6.3", C.grisLight, 1.2)),
  h("coeur-brise", "Cœur brisé", "Broken heart", "💔", ["chagrin", "broken", "rupture", "heartbreak", "cœur brisé"],
    g("translate(-1 0.4) rotate(-8 12 20)", path("M12 20.6C7 17.4 2.6 13.8 2.6 8.9C2.6 6 4.7 3.9 7.3 3.9C9.4 3.9 11.2 5.2 12 7L10.6 10L12.8 12.6L10.8 15.6L12.6 18.2Z", C.rouge))
    + g("translate(1 0.4) rotate(8 12 20)", path("M12 7C12.8 5.2 14.6 3.9 16.7 3.9C19.3 3.9 21.4 6 21.4 8.9C21.4 13.8 17 17.4 12 20.6L12.6 18.2L10.8 15.6L12.8 12.6L10.6 10Z", C.rouge))
    + g("translate(-1 0.4) rotate(-8 12 20)", line("M5.2 8.6Q5.4 6.6 7.4 6.3", "rgba(255,255,255,0.55)", 1.2))),
  h("deux-coeurs", "Deux cœurs", "Two hearts", "💕", ["amour", "love", "couple", "cœurs", "hearts"],
    heart(8.6, 13, 1.75, C.rose) + heart(17, 6.4, 1.15, C.rose)),
  h("etincelles", "Étincelles", "Sparkles", "✨", ["brillant", "sparkles", "magie", "nouveau", "propre"],
    sparkle(9.6, 13.4, 7.4, C.ocreLight) + sparkle(18.4, 5.6, 3.4, C.ocreLight) + sparkle(18.6, 17.8, 2.6, C.ocreLight)),
  h("feu", "Feu", "Fire", "🔥", ["feu", "fire", "chaud", "lit", "ça chauffe"],
    path("M12 22Q5 22 5 15.2Q5 11 8.6 7.6Q8.6 10.4 10.4 11Q10 6 14.2 2Q14 6.4 16.6 9Q19 11.6 19 15.2Q19 22 12 22Z", C.orange)
    + path("M12 22Q8.6 22 8.6 18.4Q8.6 15.8 11 13.8Q11 16.2 12.6 16.4Q12.6 14 14.4 12.6Q15.4 15.2 15.4 18.2Q15.4 22 12 22Z", C.ocreLight, { w: 0.9 })),
  h("cent-points", "Cent points", "Hundred points", "💯", ["100", "parfait", "perfect", "validé", "total"],
    g("rotate(-8 12 12)",
      line("M3.4 7.4L5.4 5.8V14.2", C.rouge, 2.2),
      ellipse(10.4, 10, 2.4, 4.2, "none", { c: C.rouge, w: 2.2 }),
      ellipse(17.6, 10, 2.4, 4.2, "none", { c: C.rouge, w: 2.2 }),
      line("M3 17.4H21", C.rouge, 2), line("M4.6 20.4H19.4", C.rouge, 2))),
  h("coche-verte", "Case cochée", "Check mark button", "✅", ["oui", "check", "validé", "ok", "fait"],
    rect(2.4, 2.4, 19.2, 19.2, 4.4, C.feuille) + line("M7 12.4L10.6 16L17.2 8.4", C.white, 2.6)),
  h("croix-rouge", "Croix", "Cross mark", "❌", ["non", "cross", "faux", "erreur", "annuler"],
    path("M6 3.4L12 9.4L18 3.4L20.6 6L14.6 12L20.6 18L18 20.6L12 14.6L6 20.6L3.4 18L9.4 12L3.4 6Z", C.rouge)),
  h("etoile", "Étoile", "Star", "⭐", ["étoile", "star", "favori", "top", "note"],
    path("M12 2.2L14.9 8.2L21.5 9.1L16.7 13.7L17.9 20.3L12 17.1L6.1 20.3L7.3 13.7L2.5 9.1L9.1 8.2Z", C.jaune)),
].map(cadre);
