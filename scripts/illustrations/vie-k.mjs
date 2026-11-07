// Scènes : la bibliothèque de quartier, le potager urbain, la cuisine familiale (le ndolé).
import { C, SKIN, person, frame, palm, plant, cloud, stroke, f } from "./lib.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="7.5" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
/** Aplat avec un motif par-dessus. */
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");
/** Suite pseudo-aléatoire reproductible. */
const rng = (seed) => () => (seed = (seed * 9301 + 49297) % 233280) / 233280;

/* ---------- Scène 1 : à la bibliothèque ---------- */
const BOOKS = [C.terra, C.ocre, C.indigo, C.green, C.blue, C.red, C.yellow, C.leaf, C.rose, C.white, C.wood, C.leaf2];
/** Une rangée de livres posés sur la planche `base`, de x0 à x1 ; `gap` : [xa, xb] laissé vide. */
function books(x0, x1, base, seed, gap = null) {
  const r = rng(seed), out = [];
  let x = x0 + 4;
  while (x < x1 - 12) {
    const w = 9 + Math.floor(r() * 9), h = 48 + Math.floor(r() * 20), col = BOOKS[Math.floor(r() * BOOKS.length)];
    if (x + w > x1 - 3) break;
    if (gap && x + w > gap[0] && x < gap[1]) { x = gap[1]; continue; }
    if (r() < 0.08 && x + h * 0.4 + 14 < x1) {
      // Un livre penché contre ses voisins
      out.push(`<g transform="translate(${f(x)} ${base}) rotate(24)">${rect(0, -h, w, h, col, ' rx="1.5"')}</g>`);
      x += f(h * 0.42) + w * 0.5 + 2;
      continue;
    }
    out.push(rect(x, base - h, w, h, col, ' rx="1.5"'));
    if (r() < 0.6) out.push(rect(x + 1.5, base - h + 8, w - 3, 3, col === C.white ? C.terra : C.white, ' opacity=".55"'), rect(x + 1.5, base - 14, w - 3, 2.5, C.dark, ' opacity=".25"'));
    x += w + 1;
  }
  return out.join("");
}
/** Bibliothèque en bois : planches régulières, livres sur chaque planche. */
function bookcase(x, y, w, h, rows, seed, gaps = {}) {
  const g = [rect(x, y, w, h, C.wood2, ' rx="4"'), rect(x + 10, y + 10, w - 20, h - 24, C.wood), rect(x + 10, y + 10, w - 20, h - 24, C.dark, ' opacity=".18"')];
  const step = (h - 24) / rows;
  for (let i = 0; i < rows; i++) {
    const base = f(y + 10 + step * (i + 1));
    g.push(books(x + 10, x + w - 10, base - 4, seed + i * 17, gaps[i] ?? null));
    g.push(rect(x + 6, base - 4, w - 12, 8, C.wood2));
  }
  g.push(rect(x - 6, y - 8, w + 12, 12, C.wood2, ' rx="3"'));
  return g.join("");
}
/** Masque sculpté accroché au mur. */
const mask = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-22 -50Q-26 -70 0 -72Q26 -70 22 -50L18 20Q0 40 -18 20Z" fill="${C.wood}"/><path d="M-14 -40L-4 -36L-14 -32Z M14 -40L4 -36L14 -32Z" fill="${C.dark}"/><path d="M-2 -30H2L4 -8H-4Z" fill="${C.wood2}"/><ellipse cx="0" cy="6" rx="7" ry="4" fill="${C.dark}"/>${stroke("M-16 -56H16M-12 -62H12", C.white, 2)}${stroke("M-12 -18l-5 8M12 -18l5 8", C.ocre, 2.5)}</g>`;

function bibliotheque() {
  const g = [];
  // Mur, soubassement, parquet
  g.push(rect(0, 390, 800, 80, C.sand), rect(0, 386, 800, 6, C.wood2, ' opacity=".5"'));
  g.push(rect(0, 470, 800, 130, C.sand2));
  for (let i = 0; i < 9; i++) g.push(stroke(`M${i * 100 - 20} 470L${i * 100 - 20 + (i - 4) * 26} 600`, C.sand, 2));
  g.push(stroke("M0 520H800", C.sand, 2), stroke("M0 568H800", C.sand, 2));
  // Grande fenêtre en arc : ciel, palmier, rayons de lumière
  const win = "M266 300V150Q266 72 366 72Q466 72 466 150V300Z";
  g.push(`<clipPath id="bibliotheque-win"><path d="${win}"/></clipPath>`, `<path d="${win}" fill="${C.sky}"/>`);
  g.push(`<g clip-path="url(#bibliotheque-win)">${cloud(300, 130, 0.7)}${palm(430, 320, 0.8, -8)}${rect(266, 262, 200, 40, C.leaf, ' opacity=".45"')}</g>`);
  g.push(stroke("M366 74V300M266 196H466", C.white, 7), `<path d="${win}" fill="none" stroke="${C.white}" stroke-width="9"/>`, rect(254, 298, 224, 12, C.wood2, ' rx="3"'));
  g.push(`<path d="M268 310H464L560 470H200Z" fill="${C.white}" opacity=".28"/>`);
  // Lampes suspendues
  for (const lx of [150, 650]) g.push(stroke(`M${lx} 0V34`, C.dark, 2), `<path d="M${lx - 20} 52Q${lx - 18} 32 ${lx} 32Q${lx + 18} 32 ${lx + 20} 52Z" fill="${C.ocre}"/>`, `<ellipse cx="${lx}" cy="53" rx="8" ry="4" fill="${C.yellow}"/>`);
  // Les deux bibliothèques (un trou sur la planche basse de droite : le livre que tire l'enfant)
  g.push(plant(200, 66, 0.62), plant(600, 66, 0.62));
  g.push(bookcase(24, 90, 210, 380, 4, 11));
  g.push(bookcase(566, 90, 210, 380, 4, 53, { 3: [684, 712] }));
  // Masque et plante entre la fenêtre et la bibliothèque de droite
  g.push(mask(516, 168, 0.9));
  // Le livre tiré par l'enfant (penché hors de la planche)
  g.push(`<g transform="translate(694 452) rotate(16)">${rect(0, -60, 16, 60, C.terra, ' rx="1.5"')}${rect(1.5, -52, 13, 3, C.white, ' opacity=".6"')}</g>`);

  // La lectrice aux bantu knots, sur un pouf en wax
  const rx_ = 92, ry_ = 562, rs = 0.98;
  const seat = f(ry_ - 100 * rs);
  g.push(cloth(`M52 ${seat}V${ry_ - 14}Q100 ${ry_ + 2} 148 ${ry_ - 14}V${seat}Z`, C.indigo, "wax1"), `<ellipse cx="100" cy="${seat}" rx="48" ry="10" fill="${C.terra}"/>`, stroke(`M52 ${seat + 14}Q100 ${seat + 30} 148 ${seat + 14}`, C.terra, 4));
  g.push(person({ x: rx_, y: ry_, s: rs, legs: "sit", skin: SKIN.s4, hair: { type: "bantu" }, top: C.green, wax: "kitenge", sleeve: "short", bottom: C.terra, bwax: "wax3", face: "smile",
    arms: { l: [[-36, -142], [14, -156]], r: [[48, -140], [64, -160]] } }));
  g.push(at(rx_, ry_, rs, false, `<path d="M8 -150L38 -144L70 -150L68 -192L38 -184L10 -192Z" fill="${C.terra}"/><path d="M12 -152L38 -147L66 -152L64 -188L38 -181L14 -188Z" fill="${C.white}"/>${stroke("M38 -147V-181", C.sand2, 2)}${stroke("M18 -178L32 -175M18 -170L32 -167M44 -175L58 -178M44 -167L58 -170", C.grey, 1.5)}` + hand(14, -156, SKIN.s4) + hand(64, -160, SKIN.s4)));

  // Le jeune lecteur à la table de lecture
  const mx = 262, my = 548, ms = 1.02;
  g.push(stroke(`M${mx - 30} ${my - 196}V${my}`, C.wood2, 7), rect(mx - 32, my - 106, 74, 9, C.wood2, ' rx="3"'), stroke(`M${mx + 34} ${my - 98}V${my}`, C.wood2, 6));
  g.push(person({ x: mx, y: my, s: ms, legs: "sit", skin: SKIN.s1, hair: { type: "locks" }, top: C.white, dashiki: C.green, sleeve: "short", bottom: C.indigo, face: "calm",
    arms: { l: [[-30, -140], [30, -124]], r: [[50, -146], [70, -128]] } }));
  // La table, puis le livre ouvert et les mains
  g.push(rect(240, 420, 186, 12, C.wood, ' rx="3"'), rect(248, 432, 170, 8, C.wood2), stroke("M256 440V546M410 440V546", C.wood2, 8));
  g.push(`<path d="M286 420L300 404L320 408L340 404L352 420Z" fill="${C.indigo}"/><path d="M290 418L302 406L320 410L338 406L348 418Z" fill="${C.white}"/>`, stroke("M320 410V418", C.sand2, 1.6));
  g.push(at(mx, my, ms, false, hand(30, -124, SKIN.s1) + hand(70, -128, SKIN.s1)));
  g.push(rect(372, 404, 40, 7, C.green, ' rx="1.5"'), rect(376, 397, 34, 7, C.ocre, ' rx="1.5"'), rect(370, 390, 38, 7, C.terra, ' rx="1.5"'));

  // La bibliothécaire en kaba et gele, qui conseille un livre
  const lx = 478, ly = 566, ls = 1.06;
  g.push(person({ x: lx, y: ly, s: ls, flip: true, skin: SKIN.s2, hair: { type: "gele", color: C.green, wax: "wax1" }, robe: "kaba", top: C.terra, wax: "wax2", face: "talk",
    arms: { r: [[52, -168], [80, -184]], l: [[-44, -150], [-30, -118]] },
    rhand: (hx, hy) => `<g transform="translate(${hx} ${hy}) rotate(-8)"><path d="M-6 6L20 10L46 6L44 -30L20 -24L-4 -30Z" fill="${C.ocre}"/><path d="M-2 4L20 8L42 4L40 -26L20 -21L0 -26Z" fill="${C.white}"/>${stroke("M20 -21V8", C.sand2, 2)}<rect x="24" y="-18" width="12" height="10" fill="${C.green}" opacity=".7"/>${stroke("M4 -16H16M4 -10H16M4 -4H14", C.grey, 1.4)}</g>` + hand(hx, hy, SKIN.s2) }));

  // L'enfant aux puffs qui tire un livre
  const kx = 650, ky = 574, ks = 0.72;
  g.push(person({ x: kx, y: ky, s: ks, skin: SKIN.s3, hair: { type: "puffs" }, top: C.ocre, wax: "wax3", sleeve: "short", bottom: C.blue, legs: "skirt", face: "laugh",
    arms: { r: [[68, -196], [98, -226]], l: [[-40, -150], [-38, -110]] } }));
  // La plante en pot, au premier plan à droite
  g.push(plant(752, 556, 1.4));
  return frame(g.join(""), C.cream);
}

/* ---------- Scène 2 : au potager ---------- */
/** Plant de gombo : tige haute, grandes feuilles, gousses dressées, une fleur jaune. */
const gombo = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${stroke("M0 0V-96", C.leaf2, 4)}`
  + [[-1, -30], [1, -52], [-1, -72]].map(([k, yy]) => `<path d="M0 ${yy}Q${k * 18} ${yy - 22} ${k * 34} ${yy - 10}Q${k * 24} ${yy + 6} 0 ${yy}Z" fill="${C.leaf}"/>`).join("")
  + [[3, -40], [-3, -60], [3, -80]].map(([px, py]) => { const k = Math.sign(px); return `<path d="M${px} ${py}Q${px + k * 9} ${py - 8} ${px + k * 8} ${py - 30}Q${px + k * 1} ${py - 12} ${px} ${py}Z" fill="${C.leaf2}"/>`; }).join("")
  + `<path d="M-5 -98Q0 -108 5 -98Q0 -94 -5 -98Z" fill="${C.yellow}"/><circle cx="0" cy="-97" r="1.8" fill="${C.wood2}"/></g>`;
/** Pied de piment : petit buisson, piments rouges. */
const piment = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${stroke("M0 0V-20", C.leaf2, 3)}<circle cx="-10" cy="-26" r="11" fill="${C.leaf2}"/><circle cx="9" cy="-28" r="12" fill="${C.leaf}"/><circle cx="0" cy="-38" r="11" fill="${C.leaf}"/>`
  + [[-12, -22], [2, -24], [12, -30], [-4, -36]].map(([px, py]) => `<path d="M${px} ${py}Q${px + 4} ${py + 4} ${px + 2} ${py + 12}Q${px - 2} ${py + 6} ${px} ${py}Z" fill="${C.red}"/>`).join("") + `</g>`;
/** Pied de ndolé (vernonia) : arbuste à feuilles lancéolées. */
const ndole = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${stroke("M0 0Q-4 -30 -10 -52M0 0Q4 -34 12 -56M0 0V-60", C.wood2, 3)}`
  + [[-10, -52, -30], [12, -56, 30], [0, -60, 0], [-6, -32, -60], [7, -36, 60], [-12, -44, -15], [14, -46, 20]].map(([px, py, rot]) => `<ellipse cx="${px}" cy="${py - 6}" rx="5" ry="13" fill="${C.leaf2}" transform="rotate(${rot} ${px} ${py})"/>`).join("") + `</g>`;
/** Pied de tomate tuteuré. */
const tomate = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${stroke("M8 6V-110", C.wood, 4)}${stroke("M0 0Q-6 -50 2 -100", C.leaf2, 4)}`
  + [[-12, -30], [12, -48], [-10, -68], [12, -86], [-4, -100]].map(([px, py]) => `<ellipse cx="${px}" cy="${py}" rx="13" ry="8" fill="${C.leaf}" transform="rotate(${px > 0 ? -20 : 20} ${px} ${py})"/>`).join("")
  + [[4, -40, 8], [-6, -56, 7], [10, -66, 7.5], [0, -84, 6.5]].map(([px, py, r]) => `<circle cx="${px}" cy="${py}" r="${r}" fill="${C.red}"/>${stroke(`M${px - 2.5} ${py - r + 1}L${px} ${py - r + 3}L${px + 2.5} ${py - r + 1}`, C.leaf2, 1.6)}`).join("") + `</g>`;
/** Planche de culture (butte de terre) de x0 à x1, dessus en y. */
const bed = (x0, x1, y, h) => `<path d="M${x0} ${y + h}L${x0 + 10} ${y}H${x1 - 10}L${x1} ${y + h}Z" fill="${C.wood}"/><path d="M${x0 + 10} ${y}H${x1 - 10}L${x1 - 6} ${y + 5}H${x0 + 6}Z" fill="${C.wood2}" opacity=".5"/>`;

function potager() {
  const g = [];
  g.push(cloud(80, 70, 0.9), cloud(520, 54, 0.75), cloud(700, 110, 0.55));
  // La ville au loin
  for (const [x, w, h] of [[30, 70, 90], [110, 50, 130], [170, 90, 70], [380, 60, 110], [450, 100, 80], [600, 50, 120], [660, 110, 74]]) {
    g.push(rect(x, 290 - h, w, h, C.steel, ' opacity=".55"'));
    for (let yy = 300 - h; yy < 280; yy += 22) g.push(rect(x + 8, yy, w - 16, 7, C.white, ' opacity=".4"'));
  }
  g.push(stroke("M256 290L264 180M290 290L282 180", C.grey, 5, ' opacity=".55"'), `<path d="M244 182H302L296 136Q273 124 250 136Z" fill="${C.grey}" opacity=".55"/>`);
  // Sol : herbe, terre rouge du jardin
  g.push(rect(0, 286, 800, 40, C.leaf, ' opacity=".45"'), rect(0, 322, 800, 278, C.sand2), `<path d="M0 322H800V332H0Z" fill="${C.terra}" opacity=".2"/>`);
  // Palmier et bananier derrière la clôture
  g.push(palm(712, 318, 1.05, 12));
  g.push(stroke("M70 320Q66 260 72 210", C.leaf2, 12), `<path d="M72 214Q30 190 10 210Q40 220 72 222Z" fill="${C.leaf}"/><path d="M72 212Q112 176 140 196Q104 212 72 222Z" fill="${C.leaf2}"/><path d="M72 214Q60 160 84 140Q86 180 76 222Z" fill="${C.leaf}"/>`);
  // Clôture de bambou et grillage
  g.push(stroke("M0 268H800M0 300H800", C.wood, 5));
  for (let x = 20; x < 800; x += 64) g.push(stroke(`M${x} 250V330`, C.wood2, 8), `<circle cx="${x}" cy="250" r="4" fill="${C.wood}"/>`);
  g.push(rect(0, 270, 800, 28, "url(#potager-mesh)", ' opacity=".45"'));
  // Planche du fond : ndolé
  g.push(`<defs><g id="potager-nd">${ndole(0, 0, 0.85)}</g><g id="potager-gb">${gombo(0, 0, 1.05)}</g><g id="potager-pm">${piment(0, 0, 1)}</g><pattern id="potager-mesh" width="16" height="28" patternUnits="userSpaceOnUse">${stroke("M0 0L16 28M16 0L0 28", C.grey, 1)}</pattern></defs>`);
  const use = (id, x, y) => `<use href="#potager-${id}" x="${x}" y="${y}"/>`;
  g.push(bed(30, 770, 340, 16));
  for (let x = 60; x < 760; x += 46) g.push(use("nd", x, 344));
  // Planche du milieu : gombo à gauche, piment à droite
  g.push(bed(20, 780, 418, 22));
  for (let x = 50; x < 400; x += 54) g.push(use("gb", x, 424));
  for (let x = 430; x < 770; x += 48) g.push(use("pm", x, 424));
  // Allée, rigole d'eau
  g.push(stroke("M0 470Q400 456 800 472", C.sand, 6, ' opacity=".8"'));

  // Le jeune homme à la brouette (récolte de ndolé et de tomates)
  const jx = 136, jy = 574, js = 1.04;
  g.push(person({ x: jx, y: jy, s: js, legs: "walk", skin: SKIN.s3, hair: { type: "short" }, hat: { type: "cap", color: C.indigo }, top: C.ocre, wax: "kente", sleeve: "short", bottom: C.green, face: "laugh",
    arms: { r: [[52, -146], [80, -112]], l: [[-40, -150], [-34, -110]] } }));
  // Brouette : brancard depuis la main, caisse, roue, pied
  const hx = f(jx + 80 * js), hy = f(jy - 112 * js);
  g.push(stroke(`M${hx - 4} ${hy}L${hx + 60} ${hy + 22}`, C.dark, 6), stroke("M262 520L250 568", C.dark, 6));
  g.push(`<circle cx="362" cy="548" r="26" fill="${C.dark}"/><circle cx="362" cy="548" r="10" fill="${C.steel}"/>`, stroke("M330 506L362 548", C.dark, 6));
  // Chargement : feuilles, tomates, gombos
  g.push(`<ellipse cx="292" cy="482" rx="56" ry="20" fill="${C.leaf2}"/><ellipse cx="270" cy="474" rx="30" ry="16" fill="${C.leaf}"/>`);
  for (const [cx, cy] of [[300, 470], [318, 476], [330, 466], [312, 458]]) g.push(`<circle cx="${cx}" cy="${cy}" r="9" fill="${C.red}"/>`);
  g.push(`<path d="M234 484H352L336 526H250Z" fill="${C.green}"/>`, rect(230, 480, 126, 8, C.green, ' rx="3"'), rect(230, 480, 126, 8, C.dark, ' rx="3" opacity=".2"'));
  g.push(hand(hx, hy, SKIN.s3));

  // L'agricultrice en foulard et pagne, qui arrose les piments
  const ax = 440, ay = 570, as = 1.08;
  g.push(person({ x: ax, y: ay, s: as, legs: "skirt", skin: SKIN.s1, hair: { type: "foulard", color: C.terra, wax: "wax2" }, top: C.indigo, wax: "ndop", sleeve: "short", bottom: C.ocre, bwax: "wax1", face: "smile",
    arms: { r: [[56, -158], [66, -128]], l: [[-46, -150], [-30, -120]] } }));
  // Arrosoir tenu par la poignée, filet d'eau vers les plants de devant
  const wx = f(ax + 66 * as), wy = f(ay - 128 * as);
  g.push(`<path d="M${wx - 20} ${wy + 8}H${wx + 20}L${wx + 18} ${wy + 46}H${wx - 18}Z" fill="${C.green}"/>`, rect(wx - 22, wy + 4, 44, 7, C.green, ' rx="3"'), rect(wx - 22, wy + 4, 44, 7, C.dark, ' rx="3" opacity=".2"'));
  g.push(stroke(`M${wx + 16} ${wy + 36}L${wx + 58} ${wy + 6}`, C.green, 7), `<path d="M${wx + 54} ${wy + 2}L${wx + 66} ${wy - 4}L${wx + 70} ${wy + 10}L${wx + 60} ${wy + 12}Z" fill="${C.green}"/>`);
  g.push(stroke(`M${wx - 6} ${wy + 6}Q${wx} ${wy - 10} ${wx + 8} ${wy + 6}`, C.dark, 4), hand(wx, wy - 2, SKIN.s1));
  for (const [dx, dy] of [[66, 20], [74, 30], [62, 36], [80, 40], [70, 48], [84, 56], [66, 60], [76, 68]]) g.push(`<ellipse cx="${wx + dx}" cy="${wy + dy}" rx="3" ry="5" fill="${C.blue}"/>`);

  // Tomates tuteurées et fillette qui cueille
  g.push(`<ellipse cx="596" cy="566" rx="34" ry="6" fill="${C.wood2}" opacity=".35"/>`, tomate(598, 560, 0.9), tomate(640, 570, 1.1));
  const gx = 700, gy = 576, gs = 0.74;
  g.push(person({ x: gx, y: gy, s: gs, flip: true, skin: SKIN.s5, hair: { type: "fulani", beads: C.ocre }, top: C.green, wax: "wax1", sleeve: "short", bottom: C.terra, bwax: "wax2", legs: "skirt", face: "laugh",
    arms: { r: [[60, -156], [90, -168]], l: [[-44, -146], [-40, -112]] },
    lhand: (hx, hy) => `<path d="M${hx - 20} ${hy + 8}H${hx + 20}L${hx + 15} ${hy + 40}H${hx - 15}Z" fill="${C.ocre}"/>${stroke(`M${hx - 16} ${hy + 20}H${hx + 16}M${hx - 15} ${hy + 30}H${hx + 15}`, C.wood2, 2)}<circle cx="${hx - 8}" cy="${hy + 6}" r="6" fill="${C.red}"/><circle cx="${hx + 6}" cy="${hy + 5}" r="6.5" fill="${C.red}"/>${stroke(`M${hx - 18} ${hy + 8}Q${hx} ${hy - 22} ${hx + 18} ${hy + 8}`, C.wood2, 3)}` + hand(hx, hy, SKIN.s5),
    rhand: (hx, hy) => `<circle cx="${hx + 4}" cy="${hy - 2}" r="7.5" fill="${C.red}"/>` + hand(hx, hy + 3, SKIN.s5) }));
  return frame(g.join(""), C.sky);
}

/* ---------- Scène 3 : en cuisine, le ndolé ---------- */
/** Bassine émaillée : blanche, bord coloré, fleurs. Centre du bord en (x,y), demi-largeur w. */
const bassine = (x, y, w, col = C.blue, h = w * 0.55) => `<path d="M${x - w} ${y}L${f(x - w * 0.74)} ${f(y + h)}H${f(x + w * 0.74)}L${x + w} ${y}Z" fill="${C.white}"/><ellipse cx="${x}" cy="${y}" rx="${w}" ry="${f(w * 0.16)}" fill="${col}"/>`
  + `<circle cx="${f(x - w * 0.36)}" cy="${f(y + h * 0.5)}" r="${f(w * 0.12)}" fill="${C.red}"/><circle cx="${f(x - w * 0.36)}" cy="${f(y + h * 0.5)}" r="${f(w * 0.05)}" fill="${C.yellow}"/><circle cx="${f(x + w * 0.3)}" cy="${f(y + h * 0.56)}" r="${f(w * 0.1)}" fill="${C.green}"/>`;

function cuisine() {
  const g = [];
  // Mur, frise de carreaux, sol carrelé
  g.push(rect(0, 330, 800, 140, C.cream), rect(0, 326, 800, 6, C.terra, ' opacity=".6"'));
  for (let x = 0; x < 800; x += 40) g.push(`<path d="M${x + 20} 338L${x + 30} 348L${x + 20} 358L${x + 10} 348Z" fill="${C.terra}" opacity=".35"/>`);
  g.push(rect(0, 470, 800, 130, C.sand2));
  for (let i = 0; i < 10; i++) g.push(stroke(`M${i * 90} 470L${i * 90 + (i - 4.5) * 34} 600`, C.sand, 2));
  g.push(stroke("M0 516H800M0 566H800", C.sand, 2));
  // Fenêtre sur la cour : manguier, linge en wax, mur de la cour
  g.push(`<clipPath id="cuisine-win"><rect x="296" y="64" width="210" height="176"/></clipPath>`);
  g.push(`<g clip-path="url(#cuisine-win)">${rect(296, 64, 210, 176, C.sky)}${cloud(320, 100, 0.6)}${rect(296, 190, 210, 50, C.sand2)}${rect(296, 172, 210, 22, C.sand)}`
    + `${stroke("M462 240V150", C.wood2, 12)}<circle cx="470" cy="128" r="44" fill="${C.leaf2}"/><circle cx="436" cy="146" r="28" fill="${C.leaf}"/><circle cx="486" cy="110" r="10" fill="${C.ocre}"/><circle cx="452" cy="104" r="8" fill="${C.ocre}"/>`
    + `${stroke("M296 120Q360 132 430 118", C.dark, 1.6)}${cloth("M318 124H352V170H318Z", C.terra, "wax1")}${cloth("M362 128H394V164H362Z", C.indigo, "wax3")}</g>`);
  g.push(`<rect x="296" y="64" width="210" height="176" fill="none" stroke="${C.wood2}" stroke-width="10"/>`, stroke("M401 64V240", C.wood2, 6), rect(284, 238, 234, 12, C.wood2, ' rx="3"'));
  // Étagère de gauche : bassines émaillées empilées, bocaux, marmites
  g.push(rect(30, 160, 230, 10, C.wood2, ' rx="3"'), rect(30, 256, 230, 10, C.wood2, ' rx="3"'), stroke("M48 170L60 186M242 170L230 186M48 266L60 282M242 266L230 282", C.wood2, 5));
  g.push(bassine(86, 146, 42, C.blue, 14), bassine(86, 132, 38, C.red, 14), bassine(86, 118, 34, C.green, 14));
  g.push(rect(150, 118, 26, 42, C.white, ' rx="6" opacity=".75"'), rect(152, 128, 22, 30, C.red, ' rx="4"'), rect(150, 112, 26, 8, C.wood, ' rx="2"'));
  g.push(rect(188, 124, 26, 36, C.white, ' rx="6" opacity=".75"'), rect(190, 136, 22, 22, C.ocre, ' rx="4"'), rect(188, 118, 26, 8, C.wood, ' rx="2"'));
  g.push(`<path d="M222 160Q220 134 238 134Q254 134 252 160Z" fill="${C.wood}"/>`, stroke("M226 146H248", C.wood2, 2));
  g.push(`<path d="M50 256V222Q50 210 66 210H108Q124 210 124 222V256Z" fill="${C.steel}"/>`, rect(44, 206, 86, 8, C.grey, ' rx="4"'), `<circle cx="87" cy="202" r="5" fill="${C.grey}"/>`);
  g.push(bassine(184, 230, 44, C.indigo, 26));
  // Ustensiles suspendus, à droite
  g.push(stroke("M580 110H770", C.wood2, 6));
  for (const [ux, len] of [[606, 70], [646, 86], [722, 64]]) g.push(stroke(`M${ux} 112V${112 + len}`, C.wood, 5), `<ellipse cx="${ux}" cy="${112 + len + 8}" rx="9" ry="12" fill="${C.wood}"/>`);
  g.push(stroke("M684 112V136", C.grey, 2.5), `<circle cx="684" cy="160" r="24" fill="${C.grey}"/><circle cx="684" cy="160" r="18" fill="${C.steel}"/>`);
  g.push(stroke("M754 112V128", C.dark, 2), `<path d="M734 150Q734 126 754 126Q774 126 774 150Q774 176 754 178Q734 176 734 150Z" fill="${C.ocre}"/>`, stroke("M736 146H772", C.wood2, 2.5));
  // Bidon d'eau et seau, coin droit
  g.push(rect(714, 452, 56, 90, C.yellow, ' rx="8"'), rect(732, 440, 18, 14, C.yellow, ' rx="3"'), rect(714, 486, 56, 6, C.dark, ' opacity=".15"'));

  // Table basse : calebasse d'arachides, bassine de feuilles de ndolé
  g.push(rect(252, 446, 150, 12, C.wood, ' rx="3"'), stroke("M264 458V548M390 458V548", C.wood2, 8));
  g.push(`<path d="M262 446Q262 410 296 410Q330 410 330 446Z" fill="${C.ocre}"/>`, stroke("M266 430H326", C.wood2, 2.5));
  for (const [cx, cy] of [[280, 410], [292, 406], [304, 408], [316, 412], [288, 414], [310, 414], [298, 412]]) g.push(`<ellipse cx="${cx}" cy="${cy}" rx="5" ry="3.6" fill="${C.wood}"/>`);
  g.push(`<ellipse cx="364" cy="424" rx="30" ry="12" fill="${C.leaf2}"/>`);
  for (const [px, rot] of [[350, -30], [362, 10], [376, 40], [356, 70]]) g.push(`<ellipse cx="${px}" cy="420" rx="5" ry="12" fill="${C.leaf}" transform="rotate(${rot} ${px} 420)"/>`);
  g.push(bassine(364, 428, 32, C.red, 18));

  // Le papa, assis sur un tabouret, coupe les plantains dans une bassine posée sur ses genoux
  const px = 138, py = 562, ps = 1.02;
  g.push(`<path d="M${px - 34} ${f(py - 100 * ps)}H${px + 36}L${px + 26} ${py - 8}H${px - 24}Z" fill="${C.wood2}"/>`, rect(px - 38, f(py - 104 * ps), 78, 10, C.wood, ' rx="3"'));
  // Régime de plantains à terre
  g.push(`<g transform="translate(250 0)">`, stroke("M40 552Q52 512 84 500", C.wood2, 7));
  for (const [bx, by, r] of [[46, 520, -50], [56, 512, -30], [50, 534, -10], [62, 526, 10], [56, 548, 20], [68, 540, 34], [72, 552, 50]]) g.push(`<path d="M${bx} ${by}q24 -14 40 -2q-4 6 -10 6q-14 -4 -30 2z" fill="${C.yellow}" transform="rotate(${r} ${bx} ${by})"/>`, `<circle cx="${bx}" cy="${by}" r="3" fill="${C.wood2}"/>`);
  g.push(`</g>`);
  g.push(person({ x: px, y: py, s: ps, legs: "sit", skin: SKIN.s2, hair: { type: "short" }, beard: true, top: C.indigo, wax: "ndop", sleeve: "short", bottom: C.dark, face: "laugh",
    arms: { l: [[-20, -138], [30, -146]], r: [[52, -150], [80, -153]] } }));
  g.push(at(px, py, ps, false, bassine(52, -126, 38, C.green, 22).replace(/<ellipse/, `<ellipse`) + [[34, -128], [46, -126], [58, -129], [68, -126]].map(([cx, cy]) => `<ellipse cx="${cx}" cy="${cy}" rx="6" ry="3.4" fill="${C.yellow}"/>`).join("")
    + `<path d="M14 -148Q36 -164 62 -152Q58 -142 40 -144Q26 -144 16 -138Z" fill="${C.yellow}"/><path d="M14 -148Q6 -146 4 -138L16 -138Z" fill="${C.leaf2}"/>` + hand(30, -146, SKIN.s2)
    + `<path d="M52 -160L76 -156L76 -149L54 -152Z" fill="${C.steel}"/>${rect(74, -158, 18, 9, C.wood2, ' rx="3"')}` + hand(80, -153, SKIN.s2)));

  // Le foyer : réchaud à charbon, flammes, marmite fumante de ndolé
  const sx = 530;
  g.push(`<path d="M${sx - 54} 478H${sx + 54}L${sx + 42} 548H${sx - 42}Z" fill="${C.dark}"/>`, rect(sx - 60, 472, 120, 10, C.grey, ' rx="3"'), rect(sx - 18, 500, 36, 24, C.ocre, ' rx="4"'), rect(sx - 12, 506, 24, 14, C.red, ' rx="3"'), stroke(`M${sx - 36} 548V560M${sx + 36} 548V560`, C.dark, 6));
  g.push(`<path d="M${sx - 44} 474Q${sx - 40} 450 ${sx - 30} 462Q${sx - 24} 444 ${sx - 14} 466Q${sx} 446 ${sx + 12} 466Q${sx + 24} 444 ${sx + 30} 462Q${sx + 42} 450 ${sx + 44} 474Z" fill="${C.red}"/><path d="M${sx - 34} 474Q${sx - 28} 458 ${sx - 18} 468Q${sx} 452 ${sx + 18} 468Q${sx + 28} 458 ${sx + 34} 474Z" fill="${C.yellow}"/>`);
  g.push(`<path d="M${sx - 52} 410Q${sx - 54} 468 ${sx - 30} 470H${sx + 30}Q${sx + 54} 468 ${sx + 52} 410Z" fill="${C.steel}"/>`, rect(sx - 54, 404, 108, 10, C.grey, ' rx="4"'), stroke(`M${sx - 56} 420h-12M${sx + 56} 420h12`, C.grey, 6), `<ellipse cx="${sx}" cy="407" rx="48" ry="6" fill="${C.green}"/>`, `<ellipse cx="${sx}" cy="406" rx="40" ry="4" fill="${C.leaf}"/>`, stroke(`M${sx - 44} 436Q${sx} 446 ${sx + 44} 436`, C.white, 4, ' opacity=".5"'));
  for (const [dx, ph] of [[-22, 0], [4, 1], [28, 0]]) g.push(stroke(`M${sx + dx} 396Q${sx + dx + (ph ? 12 : -12)} 372 ${sx + dx} 350Q${sx + dx + (ph ? -12 : 12)} 326 ${sx + dx} 302`, C.white, 6, ' opacity=".75"'));

  // La fille aux tresses verse la pâte d'arachide
  const dx_ = 428, dy_ = 566, ds = 0.82;
  g.push(person({ x: dx_, y: dy_, s: ds, skin: SKIN.s4, hair: { type: "boxbraids", beads: C.white }, top: C.terra, wax: "wax2", sleeve: "short", bottom: C.green, bwax: "kitenge", legs: "skirt", face: "laugh",
    arms: { r: [[60, -196], [86, -240]], l: [[-40, -150], [-38, -110]] } }));
  const cx = f(dx_ + 86 * ds), cy = f(dy_ - 240 * ds);
  g.push(stroke(`M${cx + 30} ${cy + 2}Q${cx + 38} ${cy + 16} ${cx + 36} 406`, C.wood, 6));
  g.push(`<g transform="translate(${cx + 8} ${cy - 4}) rotate(-28)"><path d="M-20 0Q-20 22 0 22Q20 22 20 0Z" fill="${C.ocre}"/><ellipse cx="0" cy="0" rx="20" ry="5" fill="${C.wood}"/>${stroke("M-17 8H17", C.wood2, 2)}</g>`);
  g.push(hand(cx, cy, SKIN.s4));

  // La maman en kaba et foulard remue la marmite
  const mx = 640, my = 566, ms = 1.06;
  g.push(person({ x: mx, y: my, s: ms, flip: true, skin: SKIN.s3, hair: { type: "foulard", color: C.ocre, wax: "wax3" }, robe: "kaba", top: C.green, wax: "wax1", face: "talk",
    arms: { r: [[54, -150], [72, -190]], l: [[-48, -150], [-34, -116]] } }));
  const hx = f(mx - 72 * ms), hy = f(my - 190 * ms);
  g.push(stroke(`M${hx + 6} ${hy - 8}L${sx - 4} 404`, C.wood, 6), rect(sx - 52, 404, 60, 5, C.grey, ' rx="2"'), hand(hx, hy, SKIN.s3));
  return frame(g.join(""), C.sand);
}

export default [
  { id: "bibliotheque", fr: "À la bibliothèque", en: "At the library",
    tags: ["bibliothèque", "livres", "lecture", "lire", "bibliothécaire", "étagères", "jeunes", "enfant", "culture", "savoir", "kaba", "gele", "bantu knots", "pouf", "wax", "masque", "library", "books", "reading", "librarian", "shelves", "youth", "child", "knowledge"], draw: bibliotheque },
  { id: "potager", fr: "Au potager", en: "In the vegetable garden",
    tags: ["potager", "maraîchage", "agriculture urbaine", "légumes", "gombo", "piment", "ndolé", "tomates", "arrosoir", "brouette", "agricultrice", "récolte", "cueillette", "foulard", "pagne", "palmier", "vegetable garden", "urban farming", "vegetables", "okra", "chili", "watering can", "wheelbarrow", "farmer", "harvest"], draw: potager },
  { id: "cuisine", fr: "En cuisine, le ndolé", en: "Cooking ndolé",
    tags: ["cuisine", "ndolé", "famille", "maman", "fille", "papa", "plantains", "arachides", "marmite", "feu", "bassine émaillée", "calebasse", "repas", "cuisiner", "kaba", "foulard", "kitchen", "cooking", "family", "mother", "daughter", "father", "plantain", "peanuts", "pot", "enamel basin", "calabash"], draw: cuisine },
];
