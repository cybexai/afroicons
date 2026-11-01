// Visages (smileys) et cœurs & symboles : dessins originaux Afroicons.
import { O, W, C, FACE, path, circle, ellipse, rect, line, g, face, EYES, MOUTHS, tear, heart, sparkle } from "./lib.mjs";

/* ---------- yeux et bouches locaux ---------- */
const dot = (x, y, r = 1.15) => circle(x, y, r, O, false);
const E = {
  oval: ellipse(8.6, 9.4, 1.15, 1.7, O, false) + ellipse(15.4, 9.4, 1.15, 1.7, O, false),
  squint: line("M7 8.1L10.1 9.8L7 11.5") + line("M17 8.1L13.9 9.8L17 11.5"),
  crying: line("M6.8 9.6Q8.6 11.2 10.4 9.6") + line("M13.6 9.6Q15.4 11.2 17.2 9.6") + line("M6.9 7.6L9.8 6.9") + line("M17.1 7.6L14.2 6.9"),
  pensive: line("M6.9 10.4Q8.6 11.6 10.3 10.4") + line("M13.7 10.4Q15.4 11.6 17.1 10.4") + line("M6.8 8.2L9.9 7.4") + line("M17.2 8.2L14.1 7.4"),
  crazy: circle(8.4, 9.4, 2, C.white) + dot(8.6, 9.6, 1) + line("M13.6 10.1Q15.4 8.2 17.2 10.1"),
  smug: line("M6.8 9.2H10.4") + path("M7.4 9.2H10.2Q10.2 11 8.8 11Q7.4 11 7.4 9.2Z", O, false) + line("M13.6 9.2H17.2") + path("M14.2 9.2H17Q17 11 15.6 11Q14.2 11 14.2 9.2Z", O, false) + line("M13.8 7L17 6.6"),
  think: dot(8.6, 10) + dot(15.4, 9.8) + line("M6.8 8L10 7.6") + line("M13.8 6.6Q15.6 5.4 17.4 6.8"),
  scream: circle(8.4, 9.6, 2.1, C.white) + circle(15.6, 9.6, 2.1, C.white) + dot(8.4, 9.6, 0.8) + dot(15.6, 9.6, 0.8),
};
const M = {
  beam: path("M7 13.4H17Q16.6 17.8 12 17.8Q7.4 17.8 7 13.4Z", C.white) + line("M7.3 15.2H16.7M10 13.4V17.6M14 13.4V17.6", O, 0.8),
  yum: line("M8 14.2Q12 17.4 16 14.2") + path("M13.4 15.9Q15.8 15.4 16.2 16.6Q16.4 18.2 14.8 18.2Q13.6 18 13.4 15.9Z", C.rose),
  silly: path("M7.6 13.6H16.4Q16.2 17.4 12 17.4Q7.8 17.4 7.6 13.6Z", C.terreDark) + path("M10.2 15.6H14.6V18.6A2.2 2.2 0 0 1 10.2 18.6Z", C.rose) + line("M12.4 16.2V18.4", C.terre, 0.7),
  wail: path("M7.8 17.8Q8 13.4 12 13.4Q16 13.4 16.2 17.8Q12 16.6 7.8 17.8Z", C.terreDark),
  scream: ellipse(12, 16.4, 2, 3, C.terreDark),
  ffrown: line("M8.4 16.4Q12 13.8 15.6 16.4"),
  small: line("M10 15.8Q12 15 14 15.8"),
  hmm: line("M9.2 15.6Q11.4 14.8 14.8 15.4"),
  cool: line("M8.4 14.8Q12 17.4 15.8 14.4"),
};

/* ---------- accessoires ---------- */
const handPath = "M7.2 13.4V7.6A1.2 1.2 0 0 1 9.6 7.6V11.6V5A1.2 1.2 0 0 1 12 5V11.4V5.6A1.2 1.2 0 0 1 14.4 5.6V11.8V7.8A1.2 1.2 0 0 1 16.8 7.8V15.4Q16.8 20.8 12 20.8Q8.6 20.8 7 17.6L4.6 13.2A1.2 1.2 0 0 1 6.6 12Z";
/** Petite main ouverte ocre (pas de peau : les smileys n'ont pas de teinte). */
const palm = (x, y, s, rot = 0, flip = false, fill = C.ocre) =>
  g(`translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s}) translate(-11 -13)`, path(handPath, fill, { w: W / s }));
const scale = (cx, cy, s, ...kids) => g(`translate(${cx} ${cy}) scale(${s}) translate(-12 -12)`, ...kids);
const streams = path("M7 11Q6.2 15.5 6.6 21.2H9.2Q8.4 16 9 11.4Z", C.eau, { w: 0.8 }) + path("M17 11Q17.8 15.5 17.4 21.2H14.8Q15.6 16 15 11.4Z", C.eau, { w: 0.8 });
const zz = (x, y, s, c = C.indigoLight) => line(`M${x} ${y}H${x + s}L${x} ${y + s}H${x + s}`, c, 1.1);
const ring = (cx, cy, rx, ry, c, w) => line(`M${cx - rx} ${cy}A${rx} ${ry} 0 1 0 ${cx + rx} ${cy}A${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`, c, w);

/* ---------- cœurs ---------- */
const H = "M12 20.6C7 17.4 2.6 13.8 2.6 8.9C2.6 6 4.7 3.9 7.3 3.9C9.4 3.9 11.2 5.2 12 7C12.8 5.2 14.6 3.9 16.7 3.9C19.3 3.9 21.4 6 21.4 8.9C21.4 13.8 17 17.4 12 20.6Z";
const bigHeart = (fill, shine = "rgba(255,255,255,0.55)") => path(H, fill) + line("M5.2 8.6Q5.4 6.6 7.4 6.3", shine, 1.2);

const v = (slug, fr, en, char, tags, body) => ({ slug, fr, en, char, group: "visages", tags, tone: false, body });
const h = (slug, fr, en, char, tags, body) => ({ slug, fr, en, char, group: "coeurs", tags, tone: false, body });

export default [
  v("visage-souriant", "Visage souriant", "Grinning face", "😀", ["sourire", "smile", "content", "happy", "joie"],
    face({ eyes: "dot", mouth: "grin", extras: [] }).replace(EYES.dot, E.oval)),
  v("visage-souriant-yeux-rieurs", "Visage souriant aux yeux rieurs", "Grinning face with smiling eyes", "😄", ["rire", "joie", "laugh", "happy", "yako"],
    face({ eyes: "happy", mouth: "laugh" })),
  v("visage-rayonnant", "Visage rayonnant aux yeux rieurs", "Beaming face with smiling eyes", "😁", ["dents", "grin", "rayonnant", "fier", "cheese"],
    face({ eyes: "happy", mouth: "smile" }).replace(MOUTHS.smile, M.beam)),
  v("visage-plisse-rieur", "Visage souriant aux yeux plissés", "Grinning squinting face", "😆", ["mdr", "lol", "rire", "xd", "laugh"],
    face({ eyes: "happy", mouth: "laugh" }).replace(EYES.happy, E.squint)),
  v("visage-sueur", "Visage souriant avec sueur", "Grinning face with sweat", "😅", ["ouf", "sueur", "sweat", "gêne", "relief"],
    face({ eyes: "happy", mouth: "laugh", extras: [tear(18.4, 3.4, 1.15)] })),
  v("mort-de-rire", "Mort de rire", "Rolling on the floor laughing", "🤣", ["mdr", "ptdr", "rofl", "lol", "rire"],
    g("rotate(-22 12 12)", face({ eyes: "happy", mouth: "laugh" }).replace(EYES.happy, E.squint), tear(5, 10.6, 1.05), tear(19, 10.6, 1.05))),
  v("larmes-de-joie", "Visage riant aux larmes", "Face with tears of joy", "😂", ["mdr", "lol", "larmes", "joy", "rire", "dead"],
    face({ eyes: "happy", mouth: "laugh", extras: [tear(5.6, 10.4, 1.25), tear(18.4, 10.4, 1.25)] })),
  v("visage-legerement-souriant", "Visage légèrement souriant", "Slightly smiling face", "🙂", ["sourire", "smile", "ok", "calme", "poli"],
    face({ eyes: "dot", mouth: "smile" })),
  v("clin-d-oeil", "Visage faisant un clin d'œil", "Winking face", "😉", ["clin", "wink", "complice", "taquin", "flirt"],
    face({ eyes: "wink", mouth: "smile" })),
  v("visage-rougissant", "Visage souriant aux joues roses", "Smiling face with smiling eyes", "😊", ["timide", "blush", "doux", "merci", "content"],
    face({ eyes: "happy", mouth: "smile", blush: true })),
  v("visage-aureole", "Visage souriant avec auréole", "Smiling face with halo", "😇", ["ange", "angel", "innocent", "auréole", "sage"],
    ring(12, 3.5, 6.4, 1.5, O, 2.6) + ring(12, 3.5, 6.4, 1.5, C.ciel, 1.1) + scale(12, 13.4, 0.86, face({ eyes: "happy", mouth: "smile", blush: true }))),
  v("visage-coeurs", "Visage souriant entouré de cœurs", "Smiling face with hearts", "🥰", ["amour", "love", "câlin", "chéri", "doux"],
    scale(12, 12.6, 0.88, face({ eyes: "happy", mouth: "smile", blush: true })) + heart(4, 4.2, 0.62, C.rouge, { w: 0.8 }) + heart(20.4, 7, 0.55, C.rouge, { w: 0.8 }) + heart(19.6, 19, 0.62, C.rouge, { w: 0.8 })),
  v("yeux-en-coeur", "Visage aux yeux en cœur", "Smiling face with heart-eyes", "😍", ["amour", "love", "crush", "j'adore", "wow"],
    face({ eyes: "heart", mouth: "grin" })),
  v("yeux-etoiles", "Visage aux yeux étoilés", "Star-struck", "🤩", ["star", "étoile", "wow", "fan", "génial"],
    face({ eyes: "star", mouth: "laugh" }).replace(EYES.star, path("M8.6 6.6L9.6 8.6L11.8 8.8L10.1 10.3L10.6 12.5L8.6 11.3L6.6 12.5L7.1 10.3L5.4 8.8L7.6 8.6Z", C.ocreLight, { w: 0.8 }) + path("M15.4 6.6L16.4 8.6L18.6 8.8L16.9 10.3L17.4 12.5L15.4 11.3L13.4 12.5L13.9 10.3L12.2 8.8L14.4 8.6Z", C.ocreLight, { w: 0.8 }))),
  v("bisou", "Visage envoyant un bisou", "Face blowing a kiss", "😘", ["bisou", "kiss", "mwah", "bise", "love"],
    face({ eyes: "wink", mouth: "kiss" }) + heart(17.2, 16.2, 0.62, C.rouge, { w: 0.8 })),
  v("miam", "Visage savourant", "Face savoring food", "😋", ["miam", "yum", "délicieux", "gourmand", "c'est bon"],
    face({ eyes: "happy", mouth: "smile" }).replace(MOUTHS.smile, M.yum)),
  v("langue-clin-d-oeil", "Visage tirant la langue avec un clin d'œil", "Winking face with tongue", "😜", ["langue", "tongue", "fou", "crazy", "blague"],
    face({ eyes: "dot", mouth: "smile" }).replace(EYES.dot, E.crazy).replace(MOUTHS.smile, M.silly)),
  v("calin", "Visage faisant un câlin", "Hugging face", "🤗", ["câlin", "hug", "bras ouverts", "akwaba", "bienvenue"],
    face({ eyes: "happy", mouth: "smile", blush: true }) + palm(4.8, 17.6, 0.5, -18) + palm(19.2, 17.6, 0.5, 18, true)),
  v("visage-pensif", "Visage qui réfléchit", "Thinking face", "🤔", ["réfléchir", "think", "hmm", "doute", "question"],
    face({ eyes: "dot", mouth: "smile" }).replace(EYES.dot, E.think).replace(MOUTHS.smile, M.hmm)
    + path("M6.4 21.4Q5.2 19.6 6.2 18.2Q7 17.4 8.2 17.6L11.4 18L10.8 14.8A1 1 0 0 1 12.8 14.4L13.6 18.6Q13.8 21.2 11 21.8Q8 22.4 6.4 21.4Z", C.ocre)
    + line("M8.2 19.6H11.2M7.6 21H10.6", O, 0.8)),
  v("lunettes-de-soleil", "Visage avec lunettes de soleil", "Smiling face with sunglasses", "😎", ["cool", "lunettes", "sunglasses", "style", "boss"],
    face({ eyes: "dot", mouth: "smile" }).replace(EYES.dot, "").replace(MOUTHS.smile, M.cool)
    + line("M2.4 9.2L4.4 8.6H19.6L21.6 9.2")
    + path("M4.2 8.4H10.6Q11 8.4 10.9 8.9L10.4 11.2Q10 12.6 8.4 12.6H6.6Q4.8 12.6 4.4 11Z", C.noir)
    + path("M13.4 8.4H19.8L19.6 11Q19.2 12.6 17.4 12.6H15.6Q14 12.6 13.6 11.2L13.1 8.9Q13 8.4 13.4 8.4Z", C.noir)
    + line("M10.8 8.8Q12 8.2 13.2 8.8") + line("M5.8 9.6L7 9.6", C.white, 0.8) + line("M15 9.6L16.2 9.6", C.white, 0.8)),
  v("sourire-en-coin", "Visage au sourire en coin", "Smirking face", "😏", ["malin", "smirk", "coquin", "ndem", "sûr de soi"],
    face({ eyes: "dot", mouth: "smirk" }).replace(EYES.dot, E.smug)),
  v("visage-neutre", "Visage neutre", "Neutral face", "😐", ["neutre", "neutral", "bof", "meh", "sans avis"],
    face({ eyes: "dot", mouth: "flat" })),
  v("yeux-au-ciel", "Visage roulant des yeux", "Face with rolling eyes", "🙄", ["agacé", "eye roll", "pfff", "tchip", "ennui"],
    face({ eyes: "roll", mouth: "flat" }).replace(MOUTHS.flat, M.hmm)),
  v("visage-songeur", "Visage songeur", "Pensive face", "😔", ["triste", "pensive", "déçu", "regret", "nostalgie"],
    face({ eyes: "dot", mouth: "flat" }).replace(EYES.dot, E.pensive).replace(MOUTHS.flat, M.small)),
  v("visage-en-larmes", "Visage qui pleure", "Crying face", "😢", ["triste", "sad", "larme", "cry", "chagrin"],
    face({ eyes: "sad", mouth: "frown", extras: [tear(16.6, 11.6, 1.3)] })),
  v("pleurs-bruyants", "Visage pleurant à chaudes larmes", "Loudly crying face", "😭", ["pleurer", "cry", "sob", "chagrin", "drame"],
    face({ eyes: "dot", mouth: "flat" }).replace(EYES.dot, E.crying).replace(MOUTHS.flat, streams + M.wail)),
  v("visage-furieux", "Visage furieux", "Enraged face", "😡", ["colère", "angry", "furieux", "rage", "fâché"],
    face({ eyes: "angry", mouth: "frown", color: C.terre }).replace(MOUTHS.frown, M.ffrown)),
  v("visage-horrifie", "Visage hurlant de peur", "Face screaming in fear", "😱", ["peur", "scream", "choc", "horreur", "eish"],
    face({ eyes: "dot", mouth: "o" }).replace(EYES.dot, path("M2.4 9.4A10 10 0 0 1 21.6 9.4Q12 6.6 2.4 9.4Z", C.ciel, false) + E.scream).replace(MOUTHS.o, M.scream)
    + palm(4, 17.4, 0.52, -12) + palm(20, 17.4, 0.52, 12, true)),
  v("visage-endormi", "Visage endormi", "Sleeping face", "😴", ["dormir", "sleep", "zzz", "fatigué", "dodo"],
    scale(11, 13, 0.9, face({ eyes: "closed", mouth: "o" })) + zz(16.4, 1.6, 2.8) + zz(20.2, 5.4, 2)),
  v("visage-festif", "Visage festif", "Partying face", "🥳", ["fête", "party", "anniversaire", "birthday", "ambiance"],
    scale(11.2, 13.4, 0.86, face({ eyes: "happy", mouth: "smile", blush: true }))
    + path("M9.4 6L15.6 2.4L15.6 9.2Z", C.indigoLight) + line("M11.6 6.7L15.4 4.6M13.6 7.9L15.6 6.8", C.ocreLight, 1)
    + circle(15.6, 2.4, 1, C.ocreLight, { w: 0.8 })
    + rect(19, 10, 1.6, 1.6, 0.3, C.vertLight, false) + rect(2.2, 4, 1.6, 1.6, 0.3, C.rose, false)
    + circle(20.6, 15.6, 0.9, C.ocre, false) + circle(4.6, 2.4, 0.8, C.bleu, false) + circle(20.4, 4.2, 0.8, C.rouge, false)),

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
];
