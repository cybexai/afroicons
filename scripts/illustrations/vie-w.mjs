// Scènes : la pharmacie traditionnelle au marché, le tradipraticien, le jardin des plantes médicinales.
import { C, SKIN, person, frame, palm, cloud, bubble, stroke, f } from "./lib.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${r}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
const use = (id, x, y, fill, extra = "") => `<use href="#${id}" x="${f(x)}" y="${f(y)}"${fill ? ` fill="${fill}"` : ""}${extra}/>`;
/** Calebasse coupée (base en y) avec un petit tas de poudre ou de feuilles. */
const calebasse = (x, y, r, heap) => `<ellipse cx="${x}" cy="${y - r * 0.55}" rx="${r * 0.82}" ry="${r * 0.42}" fill="${heap}"/><path d="M${x - r * 0.95} ${y - r * 0.6}Q${x - r * 0.4} ${y - r * 1.15} ${x} ${y - r * 1.05}Q${x + r * 0.4} ${y - r * 1.15} ${x + r * 0.95} ${y - r * 0.6}Z" fill="${heap}"/><path d="M${x - r} ${y - r * 0.6}Q${x} ${y + r * 0.6} ${x + r} ${y - r * 0.6}Z" fill="${C.ocre}"/><path d="M${x - r} ${y - r * 0.6}H${x + r}" stroke="${C.wood}" stroke-width="3"/>`;
/** Botte de feuilles séchées, liée (base en y), qui pend (down) ou posée. */
const botte = (x, y, c1, c2, down = false) => {
  const k = down ? 1 : -1, o = [];
  for (const [dx, c] of [[-10, c1], [10, c1], [-4, c2], [4, c2], [0, c1]]) o.push(`<path d="M${x} ${y}Q${x + dx * 2.2} ${y + k * 22} ${x + dx * 1.6} ${y + k * 44}Q${x + dx * 0.6} ${y + k * 26} ${x} ${y}Z" fill="${c}"/>`);
  o.push(rect(x - 5, y - (down ? 2 : 6), 10, 8, C.terra, ' rx="2"'));
  return o.join("");
};

/* ---------- Scène 1 : la pharmacie traditionnelle au marché couvert ---------- */
function pharmatrad() {
  const g = [];
  const defs = `<defs><g id="pharmatrad-btl"><path d="M-7 0V-27Q-7 -33 -3 -35V-44H3V-35Q7 -33 7 -27V0Z"/><rect x="-3.5" y="-49" width="7" height="6" rx="1.5" fill="${C.wood}"/><path d="M-4 -26V-6" stroke="#fff" stroke-width="2" opacity=".35" stroke-linecap="round"/></g></defs>`;
  // Marché couvert : toit de tôle, piliers, poutre
  g.push(rect(0, 0, 800, 84, C.terra), `<path d="${[...Array(40)].map((_, i) => `M${i * 20 + 10} 0V84`).join("")}" stroke="#000" stroke-opacity=".12" stroke-width="3"/>`, rect(0, 80, 800, 10, C.wood2));
  for (const x of [24, 776]) g.push(rect(x - 9, 90, 18, 400, C.wood2));
  // Étals voisins, au fond
  for (const [x0, aw] of [[44, C.green], [624, C.indigo]]) {
    g.push(rect(x0, 300, 132, 120, C.sand2), rect(x0, 300, 132, 120, C.wood, ' opacity=".25"'));
    g.push(`<path d="M${x0 - 6} 250H${x0 + 138}L${x0 + 128} 290H${x0 + 4}Z" fill="${aw}"/>`);
    for (let i = 0; i < 6; i++) g.push(`<path d="M${x0 - 4 + i * 23} 290h23q-11.5 12 -23 0Z" fill="${i % 2 ? aw : C.cream}"/>`);
    for (const [dx, c] of [[24, C.red], [66, C.yellow], [108, C.leaf]]) g.push(`<path d="M${x0 + dx - 18} 336H${x0 + dx + 18}L${x0 + dx + 13} 350H${x0 + dx - 13}Z" fill="${C.steel}"/><ellipse cx="${x0 + dx}" cy="336" rx="15" ry="6" fill="${c}"/>`);
    g.push(rect(x0 - 4, 350, 140, 10, C.wood));
  }
  g.push(rect(0, 186, 800, 9, C.wood2));
  // Enseigne peinte (pictogrammes) : feuille, mortier et pilon
  g.push(stroke("M352 90V112M448 90V112", C.wood2, 3), rect(330, 110, 140, 62, C.cream, ' rx="8"'), rect(330, 110, 140, 62, "none", ` rx="8" stroke="${C.green}" stroke-width="5"`));
  g.push(`<path d="M352 160Q346 124 392 120Q398 160 352 160Z" fill="${C.green}"/>`, stroke("M352 160Q368 142 384 128", C.cream, 2.5));
  g.push(`<path d="M414 134H452L446 152L450 162H416L420 152Z" fill="${C.terra}"/>`, stroke("M440 120L428 140", C.wood2, 6));
  for (const x of [80, 160, 640, 720]) g.push(stroke(`M${x} 90V104`, C.wood2, 2), botte(x, 104, x % 160 ? C.leaf : C.wood, C.ocre, true));
  // Étagère de bouteilles derrière la vendeuse
  g.push(rect(196, 206, 410, 192, C.wood, ' opacity=".35"'), rect(196, 268, 410, 8, C.wood2), rect(196, 334, 410, 8, C.wood2), rect(190, 200, 10, 200, C.wood2), rect(602, 200, 10, 200, C.wood2));
  const bcol = [C.wood2, C.leaf2, C.yellow, C.wood, C.leaf, C.wood2];
  for (let i = 0; i < 18; i++) {
    const x = 214 + i * 22;
    if (x > 368 && x < 456) continue; // la tête de la vendeuse passe devant
    g.push(use("pharmatrad-btl", x, 268, bcol[i % 6]), use("pharmatrad-btl", x + 4, 334, bcol[(i + 3) % 6]));
  }
  // Bottes de plantes qui sèchent, suspendues à la poutre
  for (const [x, c1, c2] of [[230, C.leaf2, C.leaf], [300, C.wood, C.ocre], [520, C.leaf, C.leaf2], [580, C.wood2, C.wood], [120, C.leaf2, C.wood], [690, C.leaf, C.ocre]]) g.push(stroke(`M${x} 195V206`, C.wood2, 2), botte(x, 206, c1, c2, true));
  // Sol du marché
  g.push(rect(0, 470, 800, 130, C.sand2), rect(0, 470, 800, 6, C.wood, ' opacity=".3"'));
  for (let x = 0; x < 800; x += 80) g.push(stroke(`M${x} 476L${x - 40} 600`, C.wood, 2, ' opacity=".15"'));

  /* La vendeuse, derrière l'étal : gele et kaba ; elle montre une écorce */
  const V = { x: 410, y: 530, s: 0.95 }, vs = SKIN.s2;
  g.push(person({ ...V, skin: vs, hair: { type: "gele", color: C.terra, wax: "wax2" }, robe: "kaba", top: C.green, wax: "wax1", face: "talk",
    arms: { r: [[56, -150], [84, -186]], l: [[-44, -150], [-30, -130]] } }));
  // L'écorce qu'elle tend
  g.push(`<g transform="rotate(-6 490 354)">${rect(482, 347, 62, 13, C.wood2, ' rx="5"')}${rect(486, 349, 54, 4, C.wood, ' rx="2"')}</g>`, hand(490, 354, vs, 7.2));

  /* L'étal */
  g.push(`<path d="M156 398H604L620 418H140Z" fill="${C.wood}"/>`, rect(146, 418, 468, 120, C.wood2), rect(146, 418, 468, 70, C.indigo), rect(146, 418, 468, 70, "url(#wax2)"));
  g.push(`<path d="M146 488${[...Array(13)].map((_, i) => `q18 14 36 0`).join("")}V418H146Z" fill="${C.indigo}"/>`);
  for (const x of [160, 586]) g.push(rect(x, 536, 14, 22, C.wood2));
  // Bouteilles de décoctions, à gauche
  [C.wood2, C.leaf2, C.yellow, C.wood2, C.leaf, C.yellow].forEach((c, i) => g.push(use("pharmatrad-btl", 172 + i * 17, 406, c)));
  // Fagots d'écorces liés
  for (const [x0, y0, n] of [[276, 390, 4], [282, 378, 3], [290, 366, 2]]) for (let i = 0; i < n; i++) {
    const x = x0 + i * 0, y = y0, w = 76 - (4 - n) * 8;
    if (i === 0) for (let k = 0; k < n; k++) g.push(rect(x + k * (w / n), y, w / n + 1, 12, [C.wood2, C.wood, C.rose, C.wood2][(k + n) % 4], ' rx="5"'), `<ellipse cx="${f(x + k * (w / n) + 4)}" cy="${y + 6}" rx="3" ry="5" fill="${C.sand2}"/>`);
  }
  g.push(rect(296, 362, 6, 42, C.terra, ' rx="2"'), rect(332, 362, 6, 42, C.terra, ' rx="2"'));
  // Bassine de racines devant la vendeuse
  g.push(stroke("M382 386Q392 366 404 380Q414 362 428 380M394 388Q410 372 420 388", C.wood, 5));
  g.push(`<path d="M368 386H452L444 408H376Z" fill="${C.steel}"/><ellipse cx="410" cy="386" rx="42" ry="7" fill="${C.grey}"/>`, stroke("M378 386Q398 372 420 384Q432 374 442 384", C.wood2, 4));
  // Calebasses de poudres colorées
  for (const [x, c] of [[478, C.red], [520, C.yellow], [562, C.white]]) g.push(calebasse(x, 410, 18, c));
  g.push(calebasse(500, 392, 13, C.leaf), calebasse(542, 392, 13, C.wood));
  // Botte de feuilles posée
  g.push(botte(592, 404, C.leaf2, C.leaf));

  /* La cliente, à droite : box braids, wax ; elle prend l'écorce */
  const K = { x: 650, y: 572, s: 1 }, ks = SKIN.s4;
  g.push(person({ ...K, flip: true, skin: ks, hair: { type: "boxbraids", beads: C.ocre }, top: C.terra, wax: "wax3", bottom: C.terra, bwax: "wax3", legs: "skirt", face: "smile",
    arms: { r: [[60, -176], [102, -220]], l: [[-40, -150], [-38, -110]] }, lhand: (hx, hy) => `<path d="M${hx - 12} ${hy}h24l-3 34h-18Z" fill="${C.ocre}"/>` + stroke(`M${hx - 8} ${hy}Q${hx} ${hy - 14} ${hx + 8} ${hy}`, C.wood2, 2.5) + hand(hx, hy, ks) }));
  // La fillette qui l'accompagne
  g.push(person({ x: 736, y: 576, s: 0.56, flip: true, skin: SKIN.s3, hair: { type: "bantu" }, top: C.ocre, wax: "kente", robe: "dress", face: "laugh",
    arms: { r: [[36, -160], [52, -132]] } }));

  /* Le client, à gauche, qui sent une feuille */
  const M = { x: 98, y: 576, s: 1 }, ms = SKIN.s1;
  g.push(person({ ...M, skin: ms, hair: { type: "short" }, beard: true, top: C.white, dashiki: C.green, bottom: C.indigo, face: "calm",
    arms: { r: [[48, -178], [20, -226]], l: [[-40, -150], [-38, -108]] } }));
  g.push(at(M.x, M.y, M.s, false, `<path d="M18 -228Q4 -246 -4 -236Q2 -222 18 -228Z" fill="${C.leaf}"/>` + stroke("M18 -228Q8 -232 0 -236", C.leaf2, 1.4) + hand(20, -226, ms)));

  return frame(defs + g.join(""), C.sand);
}

/* ---------- Scène 2 : le tradipraticien dans sa case de consultation ---------- */
function tradipraticien() {
  const g = [];
  // Murs de terre ocre, plinthe, sol de terre battue
  g.push(rect(0, 0, 800, 440, C.sand2), rect(0, 0, 800, 440, C.ocre, ' opacity=".3"'), rect(0, 420, 800, 20, C.wood, ' opacity=".35"'));
  for (const [x, y] of [[90, 120], [520, 330], [300, 380], [700, 80], [250, 60]]) g.push(`<ellipse cx="${x}" cy="${y}" rx="18" ry="5" fill="${C.wood}" opacity=".15"/>`);
  g.push(rect(0, 440, 800, 160, C.rose, ' opacity=".5"'), rect(0, 440, 800, 160, C.wood, ' opacity=".12"'));
  // Poutre et plantes qui sèchent
  g.push(rect(0, 0, 800, 48, C.wood), `<path d="${[...Array(27)].map((_, i) => `M${i * 30 + 6} 0L${i * 30 - 4} 46`).join("")}" stroke="${C.wood2}" stroke-width="3" opacity=".45"/>`, rect(0, 46, 800, 14, C.wood2));
  for (const [x, c1, c2, l] of [[270, C.leaf2, C.leaf, 18], [330, C.wood, C.ocre, 30], [390, C.leaf, C.leaf2, 14], [450, C.wood2, C.wood, 26], [510, C.leaf2, C.ocre, 16]]) g.push(stroke(`M${x} 60V${60 + l}`, C.wood2, 2), botte(x, 60 + l, c1, c2, true));
  // Fenêtre lumineuse, à droite
  g.push(`<svg x="610" y="120" width="130" height="120"><rect width="130" height="120" fill="${C.sky}"/>${cloud(14, 30, 0.5)}${palm(96, 150, 0.6, -8)}<rect y="96" width="130" height="24" fill="${C.leaf}" opacity=".5"/></svg>`);
  g.push(`<path d="M602 112H748V248H602ZM610 120V240H740V120Z" fill="${C.wood2}" fill-rule="evenodd"/>`, stroke("M675 120V240", C.wood2, 5), rect(596, 246, 158, 9, C.wood));
  // Étagère de bocaux et de calebasses, à gauche
  g.push(rect(30, 214, 200, 9, C.wood2), rect(30, 290, 200, 9, C.wood2), rect(40, 223, 6, 14, C.wood2), rect(214, 223, 6, 14, C.wood2), rect(40, 299, 6, 14, C.wood2), rect(214, 299, 6, 14, C.wood2));
  for (const [x, y, c] of [[52, 214, C.leaf], [86, 214, C.ocre], [158, 214, C.red], [64, 290, C.wood], [134, 290, C.leaf2], [200, 290, C.yellow]]) {
    g.push(rect(x - 12, y - 38, 24, 38, C.white, ' rx="5" opacity=".6"'), rect(x - 11, y - 22, 22, 21, c, ' rx="4"'), rect(x - 13, y - 44, 26, 8, C.wood2, ' rx="3"'));
  }
  for (const [x, y, r] of [[122, 214, 16], [196, 214, 14], [100, 290, 15], [170, 290, 13]])
    g.push(`<circle cx="${x}" cy="${y - r}" r="${r}" fill="${C.ocre}"/><rect x="${x - 4}" y="${y - r * 2 - 10}" width="8" height="12" rx="3" fill="${C.ocre}"/><circle cx="${x}" cy="${y - r * 2 - 11}" r="4" fill="${C.wood2}"/><path d="M${x - r * 0.8} ${y - r}H${x + r * 0.8}" stroke="${C.wood}" stroke-width="2.5"/>`);
  // Pagne tendu au mur, derrière le banc
  g.push(rect(470, 290, 260, 110, C.indigo), rect(470, 290, 260, 110, "url(#ndop)", ' opacity=".9"'), rect(464, 284, 272, 8, C.wood2, ' rx="3"'));

  // Natte tressée au sol
  g.push(`<path d="M150 540H470L500 592H120Z" fill="${C.sand}"/>`);
  for (let x = 140; x < 500; x += 16) g.push(stroke(`M${x + 10} 542L${x} 590`, C.wood, 2, ' opacity=".3"'));
  g.push(rect(132, 562, 356, 6, C.terra, ' opacity=".6"'));

  /* L'assistant, à gauche, pile des feuilles au mortier */
  const A = { x: 96, y: 580, s: 0.9 }, as = SKIN.s4;
  g.push(person({ ...A, skin: as, hair: { type: "nattes" }, top: C.ocre, wax: "kente", sleeve: "short", bottom: C.dark, face: "smile",
    arms: { l: [[8, -150], [40, -176]], r: [[52, -136], [40, -146]] } }));
  g.push(at(A.x, A.y, A.s, false,
    stroke("M40 -214V-96", C.wood, 9) + `<ellipse cx="40" cy="-214" rx="6" ry="4" fill="${C.wood2}"/>` +
    `<path d="M10 -100H70L60 -60L66 -6H14L20 -60Z" fill="${C.wood2}"/><ellipse cx="40" cy="-100" rx="30" ry="7" fill="${C.wood}"/><ellipse cx="40" cy="-100" rx="22" ry="4" fill="${C.leaf2}"/>` +
    stroke("M18 -72H62", C.wood, 3) + `<ellipse cx="40" cy="-6" rx="28" ry="6" fill="${C.wood2}"/>` +
    hand(40, -176, as) + hand(40, -146, as)));
  g.push(`<path d="M150 482l-8 -6M158 470l2 -9M168 484l8 -4" stroke="${C.leaf}" stroke-width="3" stroke-linecap="round"/>`);

  /* Le tradipraticien, assis sur son tabouret : boubou de ndop, kufi ; il tient la préparation */
  const T = { x: 268, y: 572, s: 1 }, ts = SKIN.s2;
  g.push(at(T.x, T.y, T.s, false, `<ellipse cx="12" cy="-100" rx="46" ry="9" fill="${C.wood}"/><path d="M-24 -96H48L38 -62L50 -8H-26L-14 -62Z" fill="${C.wood2}"/><ellipse cx="12" cy="-6" rx="42" ry="8" fill="${C.wood2}"/>` +
    [-10, 10, 30].map((x) => `<path d="M${x - 6} -86L${x} -66L${x + 6} -86ZM${x - 6} -18L${x} -40L${x + 6} -18Z" fill="${C.ocre}"/>`).join("")));
  g.push(person({ ...T, skin: ts, hair: { type: "short", color: C.steel }, beard: true, hat: { type: "kufi", color: C.red, wax: "toghu" }, robe: "boubou", top: "#1C2756", wax: "ndop", legs: "sit", face: "talk",
    arms: { l: [[-10, -146], [48, -150]], r: [[60, -160], [96, -152]] } }));
  g.push(at(T.x, T.y, T.s, false, `<path d="M44 -156H102Q98 -128 73 -128Q48 -128 44 -156Z" fill="${C.wood}"/><ellipse cx="73" cy="-156" rx="29" ry="6" fill="${C.leaf2}"/><ellipse cx="66" cy="-157" rx="8" ry="2.5" fill="${C.leaf}"/>` +
    stroke("M48 -146H98", C.ocre, 3) + hand(48, -150, ts) + hand(98, -150, ts)));
  // Vapeur douce de la préparation
  g.push(stroke("M336 404Q330 392 338 382Q346 372 340 360M352 406Q346 394 354 384", C.white, 3, ' opacity=".8"'));

  /* La mère et son enfant, sur le banc */
  g.push(rect(462, 464, 290, 14, C.wood), rect(462, 476, 290, 6, C.wood2), rect(476, 482, 12, 92, C.wood2), rect(726, 482, 12, 92, C.wood2));
  const E = { x: 686, y: 532, s: 0.66 };
  g.push(person({ ...E, flip: true, skin: SKIN.s5, hair: { type: "puffs" }, top: C.green, wax: "wax3", sleeve: "short", bottom: C.indigo, legs: "sit", face: "smile",
    arms: { r: [[40, -150], [52, -112]], l: [[-40, -150], [-36, -112]] } }));
  const Mo = { x: 566, y: 572, s: 1 }, mos = SKIN.s3;
  g.push(person({ ...Mo, flip: true, skin: mos, hair: { type: "foulard", color: C.terra, wax: "wax2" }, robe: "kaba", top: C.ocre, wax: "wax1", legs: "sit", face: "calm",
    arms: { r: [[46, -142], [60, -118]], l: [[-60, -176], [-104, -170]] } }));

  /* Ce qu'il explique : une feuille, une infusion */
  g.push(bubble(390, 216, `<path d="M-14 6Q-16 -16 10 -16Q14 6 -14 6Z" fill="${C.white}"/>` + stroke("M-14 6Q-2 -4 6 -10", C.green, 2) + `<path d="M-2 4H18Q18 16 8 16Q-2 16 -2 4Z" fill="${C.white}"/>`, C.green));
  g.push(`<circle cx="334" cy="282" r="6" fill="${C.green}" opacity=".45"/><circle cx="314" cy="298" r="4" fill="${C.green}" opacity=".35"/>`);

  return frame(g.join(""), C.cream);
}

/* ---------- Scène 3 : le jardin des plantes médicinales ---------- */
const citronnelle = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${stroke("M0 0Q-18 -30 -34 -46M0 0Q-8 -40 -12 -66M0 0Q4 -44 2 -74M0 0Q12 -38 22 -62M0 0Q20 -24 38 -38", C.leaf, 4)}${stroke("M-2 0Q-14 -34 -22 -56M2 0Q10 -30 14 -50", C.leaf2, 3.5)}</g>`;
const aloes = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${[[-40, -18], [-26, -44], [-6, -58], [14, -54], [32, -36], [42, -12]].map(([a, b], i) => `<path d="M${i < 3 ? -14 : 14} 0Q${a * 0.8} ${b * 0.75} ${a} ${b}Q${a * 0.25} ${b * 0.15} ${i < 3 ? 10 : -10} 0Z" fill="${i % 2 ? C.leaf : C.leaf2}"/>`).join("")}<circle cx="-14" cy="-22" r="1.6" fill="${C.cream}"/><circle cx="16" cy="-24" r="1.6" fill="${C.cream}"/><circle cx="-4" cy="-34" r="1.6" fill="${C.cream}"/></g>`;
const etiquette = (x, y) => rect(x - 2, y - 34, 4, 34, C.wood2) + rect(x - 12, y - 46, 24, 16, C.white, ' rx="3"');

function plantes() {
  const g = [];
  const defs = `<defs><g id="plantes-kin"><circle cx="0" cy="-30" r="22" fill="${C.leaf2}"/><circle cx="-18" cy="-16" r="16" fill="${C.leaf}"/><circle cx="18" cy="-16" r="16" fill="${C.leaf}"/><ellipse cx="-6" cy="-34" rx="6" ry="4" fill="${C.leaf}" transform="rotate(-30 -6 -34)"/><ellipse cx="10" cy="-24" rx="6" ry="4" fill="${C.leaf2}" transform="rotate(20 10 -24)"/></g>` +
    `<g id="plantes-mor"><path d="M-3 0Q-4 -60 0 -120H4Q2 -60 3 0Z" fill="${C.wood}"/>${[[-30, -110], [26, -116], [-14, -140], [12, -150], [-38, -80], [34, -86], [0, -126]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="22" ry="11" fill="${C.leaf}" opacity=".9"/>`).join("")}${stroke("M0 -100L-26 -110M2 -110L24 -116M0 -80L-34 -80M2 -84L32 -86", C.wood, 2)}</g></defs>`;
  // Ciel, lisière de la forêt
  g.push(`<g opacity=".72">`);
  for (const [x, w] of [[60, 24], [220, 20], [400, 26], [580, 22], [740, 24]]) g.push(rect(x - w / 2, 150, w, 160, C.wood2));
  for (const [cx, cy, r, c] of [[20, 120, 90, C.leaf2], [130, 90, 80, C.green], [250, 120, 86, C.leaf2], [360, 80, 80, C.leaf], [470, 130, 90, C.green], [590, 90, 84, C.leaf2], [700, 120, 90, C.leaf], [800, 90, 80, C.green], [180, 200, 70, C.leaf], [540, 210, 70, C.leaf], [330, 210, 60, C.green], [720, 220, 60, C.leaf2], [50, 230, 60, C.leaf]])
    g.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}"/>`);
  g.push(`</g>`);
  // Bananier en lisière, à droite
  g.push(rect(758, 180, 12, 140, C.leaf2), `<path d="M764 190Q720 150 690 168Q722 180 764 196ZM764 186Q800 140 830 150Q800 170 766 196ZM764 184Q760 130 780 110Q776 150 768 190Z" fill="${C.leaf}"/>`);
  // Le sol, les parcelles
  g.push(rect(0, 290, 800, 310, C.sand2), rect(0, 290, 800, 8, C.leaf2, ' opacity=".4"'));
  // Rang du fond : citronnelle et moringas
  g.push(`<path d="M40 344H760L770 368H30Z" fill="${C.wood2}"/>`, rect(30, 340, 740, 6, C.wood, ' opacity=".7"'));
  for (const x of [120, 690]) g.push(use("plantes-mor", x, 344));
  for (let x = 190; x < 640; x += 58) g.push(citronnelle(x, 346, 0.7));
  for (const x of [250, 480]) g.push(etiquette(x + 22, 350));
  // Rang du milieu : kinkéliba et aloès
  g.push(`<path d="M30 446H770L784 476H16Z" fill="${C.wood2}"/>`, rect(16, 442, 768, 6, C.wood, ' opacity=".7"'));
  for (const x of [70, 150, 640, 720]) g.push(use("plantes-kin", x, 448));
  g.push(citronnelle(236, 450, 0.8), citronnelle(530, 450, 0.75), aloes(408, 452, 1.35), aloes(470, 452, 0.8));
  for (const x of [110, 352, 680]) g.push(etiquette(x, 462));
  // Allée
  g.push(`<path d="M0 500H800V600H0Z" fill="${C.sand}"/>`);
  for (const [x, y] of [[90, 590], [400, 586], [720, 590], [560, 520], [230, 530]]) g.push(`<ellipse cx="${x}" cy="${y}" rx="12" ry="3" fill="${C.wood}" opacity=".25"/>`);

  /* Panier de récolte, à gauche */
  g.push(botte(156, 528, C.leaf, C.leaf2), botte(176, 528, C.leaf2, C.leaf));
  g.push(`<path d="M130 520H210L200 566H140Z" fill="${C.ocre}"/>`, stroke("M134 534H206M137 548H203", C.wood, 2.5), stroke("M130 520Q170 486 210 520", C.wood, 4));

  /* La tradipraticienne : foulard, bogolan ; elle montre l'aloès */
  const T = { x: 290, y: 572, s: 1 }, ts = SKIN.s2;
  g.push(person({ ...T, skin: ts, hair: { type: "foulard", color: C.terra, wax: "wax3" }, robe: "boubou", top: "#5E3E26", wax: "bogolan", face: "talk",
    arms: { r: [[60, -176], [94, -158]], l: [[-40, -150], [-36, -112]] }, point: [118, -128] }));

  /* L'apprentie : box braids, wax ; elle prend des notes */
  const P = { x: 548, y: 572, s: 0.94 }, ps = SKIN.s4;
  g.push(person({ ...P, flip: true, skin: ps, hair: { type: "boxbraids", beads: C.ocre }, top: C.indigo, wax: "wax1", bottom: C.indigo, bwax: "wax1", legs: "skirt", face: "smile",
    arms: { l: [[-34, -150], [-4, -156]], r: [[44, -150], [26, -164]] } }));
  g.push(at(P.x, P.y, P.s, true, `<g transform="rotate(-12 10 -160)">${rect(-8, -184, 36, 44, C.white, ' rx="3"')}${rect(-8, -184, 6, 44, C.terra, ' rx="2"')}${stroke("M4 -172H22M4 -164H22M4 -156H18", C.grey, 1.6)}</g>` +
    hand(-4, -156, ps) + stroke("M26 -164L14 -172", C.dark, 3) + hand(26, -164, ps)));

  /* Le garçon qui apporte l'eau */
  const B = { x: 704, y: 576, s: 0.72 }, bs = SKIN.s1;
  g.push(person({ ...B, flip: true, skin: bs, hair: { type: "short" }, top: C.green, dashiki: C.ocre, bottom: C.dark, legs: "walk", face: "laugh",
    arms: { r: [[44, -150], [50, -112]] }, rhand: (hx, hy) => `<path d="M${hx - 20} ${hy + 8}H${hx + 20}L${hx + 16} ${hy + 50}H${hx - 16}Z" fill="${C.blue}"/><ellipse cx="${hx}" cy="${hy + 8}" rx="20" ry="5" fill="${C.sky}"/>` + stroke(`M${hx - 18} ${hy + 8}Q${hx} ${hy - 18} ${hx + 18} ${hy + 8}`, C.grey, 3) + hand(hx, hy - 4, bs) }));
  // Arrosoir posé au bord de l'allée
  g.push(`<path d="M54 538H94L90 576H58Z" fill="${C.green}"/>`, stroke("M92 548L116 528", C.green, 6), `<ellipse cx="118" cy="526" rx="6" ry="4" fill="${C.green}"/>`, stroke("M58 538Q74 516 90 538", C.green, 5));

  // Citronnelle au premier plan, dans les coins
  g.push(citronnelle(24, 604, 1), citronnelle(780, 604, 1));

  return frame(defs + g.join(""), C.sky);
}

export default [
  { id: "pharmatrad", fr: "La pharmacie traditionnelle", en: "Traditional medicine stall", tags: ["pharmacopée", "pharmacopoeia", "plantes", "plants", "écorces", "bark", "marché", "market", "santé", "health", "remèdes", "remedies", "tradition", "Cameroun", "Cameroon"], draw: pharmatrad },
  { id: "tradipraticien", fr: "Le tradipraticien", en: "The traditional healer", tags: ["tradipraticien", "traditional healer", "guérisseur", "healer", "santé", "health", "plantes", "plants", "consultation", "famille", "family", "tradition", "Cameroun", "Cameroon"], draw: tradipraticien },
  { id: "plantes", fr: "Le jardin des plantes médicinales", en: "The medicinal plant garden", tags: ["plantes médicinales", "medicinal plants", "jardin", "garden", "savoir", "knowledge", "transmission", "apprentie", "apprentice", "moringa", "citronnelle", "lemongrass", "aloès", "aloe", "kinkéliba"], draw: plantes },
];
