// Scènes : le grand ménage du samedi, une battle de danse au quartier, la rizière.
// Chaque objet (meuble, arbre, véhicule, personnage et ce qu'il tient) est regroupé dans son propre <g>.
import { C, SKIN, person, frame, cloud, stroke, f } from "./lib.mjs";

/** Un objet = un groupe. */
const G = (...p) => `<g>${p.join("")}</g>`;
/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${r}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");
const note = (x, y, col, s = 1, r = -10) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})" fill="${col}"><ellipse cx="0" cy="0" rx="6" ry="4.5" transform="rotate(-20)"/><rect x="4" y="-22" width="2.6" height="22"/><path d="M6.6 -22Q14 -18 13 -10Q10 -15 6.6 -15Z"/></g>`;
const hen = (x, y, s, fl, col) => G(`<g transform="translate(${x} ${y}) scale(${fl ? -s : s} ${s})"><path d="M-20 -14Q-24 -34 -6 -32Q6 -46 16 -36Q22 -24 14 -10Q0 0 -14 -4Q-24 -6 -20 -14Z" fill="${col}"/><path d="M-20 -14L-34 -30L-28 -10Z" fill="${C.dark}" opacity=".8"/><circle cx="12" cy="-38" r="8" fill="${col}"/><path d="M8 -46Q12 -52 16 -45Z" fill="${C.red}"/><path d="M19 -39L25 -37L19 -35Z" fill="${C.ocre}"/><circle cx="14" cy="-40" r="1.4" fill="${C.dark}"/>${stroke("M-4 -4L-8 6M4 -6L8 6", C.ocre, 2)}</g>`);

/* ---------- Scène 1 : le grand ménage du samedi ---------- */
function samedi() {
  const g = [];
  // Ciel, soleil, nuages
  g.push(G(rect(0, 0, 800, 420, C.sky), `<circle cx="700" cy="78" r="34" fill="${C.yellow}" opacity=".75"/>`));
  g.push(cloud(380, 70, 0.8), cloud(560, 120, 0.55));
  // Le mur de clôture et le portail, un palmier derrière
  g.push(G(stroke("M748 330Q742 250 754 170", C.wood2, 10), [[-60, -10], [-40, -50], [10, -64], [56, -40], [64, 0]].map(([dx, dy]) => `<path d="M754 170Q${754 + dx / 2} ${170 + dy - 20} ${754 + dx} ${170 + dy}Q${754 + dx / 2} ${170 + dy - 4} 754 170Z" fill="${C.leaf}"/>`).join("")));
  g.push(G(rect(300, 300, 500, 112, C.cream), rect(300, 300, 500, 10, C.sand2), rect(300, 380, 500, 32, C.terra, ' opacity=".25"'),
    rect(470, 296, 120, 116, C.green), `<path d="M476 302H584V406H476Z" fill="none" stroke="${C.dark}" stroke-width="2" opacity=".3"/>`, stroke("M530 302V406", C.dark, 2, ' opacity=".3"'),
    `<path d="${[0, 1, 2, 3, 4, 5].map((i) => `M${486 + i * 18} 312V396`).join("")}" stroke="${C.white}" stroke-width="2" opacity=".25"/>`));

  // La maison : façade peinte, toit de tôle, porte, fenêtre aux volets bleus
  g.push(G(rect(14, 186, 300, 226, C.sand), rect(14, 356, 300, 56, C.ocre, ' opacity=".45"'), rect(14, 354, 300, 4, C.wood2, ' opacity=".35"'),
    `<path d="M0 194L40 132H290L332 194Z" fill="${C.steel}"/>`, `<path d="${[...Array(11)].map((_, i) => `M${f(14 + i * 30)} 193L${f(46 + i * 24)} 133`).join("")}" stroke="${C.grey}" stroke-width="2" opacity=".5"/>`, rect(0, 190, 334, 8, C.grey),
    rect(196, 262, 62, 150, C.wood2), rect(202, 268, 50, 144, C.wood), `<circle cx="244" cy="342" r="3.5" fill="${C.dark}"/>`, rect(190, 404, 74, 10, C.sand2),
    rect(40, 236, 76, 70, "#2A1E17"), rect(26, 236, 16, 70, C.blue), rect(114, 236, 16, 70, C.blue), rect(34, 304, 88, 7, C.wood)));
  // Plante en pot sur le rebord
  g.push(G(`<path d="M62 304H94L90 290H66Z" fill="${C.terra}"/>`, `<path d="M78 290Q66 270 70 254Q80 270 78 290ZM78 290Q92 272 90 258Q80 272 78 290Z" fill="${C.leaf}"/>`));

  // Sol de la cour : terre battue
  g.push(G(rect(0, 410, 800, 190, C.sand2), rect(0, 410, 800, 190, C.terra, ' opacity=".18"'),
    [[90, 590], [420, 470], [700, 590], [300, 590], [610, 470]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="18" ry="3" fill="${C.wood2}" opacity=".22"/>`).join("")));

  // La corde à linge entre deux poteaux, avec les pagnes qui sèchent
  const ly = (x) => 200 + 200 * ((x - 310) / 350) * (1 - (x - 310) / 350); // corde de x=310 à x=660
  g.push(G(rect(304, 190, 9, 228, C.wood2), rect(656, 190, 9, 228, C.wood2), stroke(`M310 200Q485 300 660 200`, C.dark, 2)));
  const pagne = (x1, x2, h, col, pat) => {
    const y1 = ly(x1), y2 = ly(x2);
    const d = `M${x1} ${f(y1)}L${x2} ${f(y2)}L${x2 + 2} ${f(y2 + h)}Q${f((x1 + x2) / 2)} ${f((y1 + y2) / 2 + h + 8)} ${x1 - 2} ${f(y1 + h)}Z`;
    return G(cloth(d, col, pat), rect(x1 + 2, y1 - 6, 4, 12, C.wood, ' rx="1.5"'), rect(x2 - 6, y2 - 6, 4, 12, C.wood, ' rx="1.5"'));
  };
  g.push(pagne(322, 378, 118, C.green, "kitenge"), pagne(388, 450, 132, "#1C2756", "ndop"), pagne(530, 588, 126, C.terra, "wax1"), pagne(598, 648, 104, C.ocre, "kente"));

  // La voiture de la famille, côté droit, savon sur le capot
  const car = [];
  car.push(`<ellipse cx="720" cy="514" rx="120" ry="8" fill="${C.wood2}" opacity=".25"/>`);
  car.push(`<path d="M628 446Q630 426 656 422L700 418L734 380H810V508H630Z" fill="${C.blue}"/>`);
  car.push(`<path d="M742 388H810V420H716Z" fill="${C.sky}"/>`, rect(630, 470, 180, 8, "rgba(0,0,0,.15)"), rect(626, 440, 10, 14, C.yellow, ' rx="3"'));
  car.push(`<circle cx="682" cy="508" r="24" fill="${C.dark}"/><circle cx="682" cy="508" r="11" fill="${C.steel}"/>`);
  car.push([[650, 428, 7], [664, 424, 9], [680, 426, 6], [646, 446, 6], [694, 432, 5], [672, 440, 5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.white}" opacity=".92"/>`).join(""));
  car.push([[700, 452], [712, 470], [694, 482]].map(([x, y]) => stroke(`M${x} ${y}v8`, C.white, 2.5, ' opacity=".7"')).join(""));
  g.push(G(...car));

  // Le papa, qui balaie la cour avec un balai traditionnel (nervures de palme liées)
  const P = { x: 158, y: 548, s: 1 }, psk = SKIN.s2;
  const broom = [];
  for (let i = 0; i < 9; i++) broom.push(stroke(`M-38 -112Q${-60 - i * 3} -50 ${-116 + i * 7} -2`, i % 2 ? C.ocre : C.wood, 3));
  broom.push(stroke("M-14 -168L-40 -108", C.ocre, 9), stroke("M-34 -122L-44 -108", C.terra, 6, ' opacity=".9"'), stroke("M-20 -154L-30 -132", C.terra, 4));
  g.push(G(`<ellipse cx="60" cy="560" rx="40" ry="6" fill="${C.wood2}" opacity=".25"/>`, [[40, 556], [58, 552], [74, 560], [30, 548]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="3" fill="${i % 2 ? C.leaf : C.wood}" transform="rotate(${i * 30} ${x} ${y})"/>`).join(""),
    `<path d="M24 540Q40 520 70 530" fill="none" stroke="${C.sand}" stroke-width="3" stroke-linecap="round" opacity=".8"/>`,
    person({ ...P, skin: psk, beard: true, hair: { type: "short" }, top: C.indigo, dashiki: C.ocre, sleeve: "short", bottom: C.sand2, bwax: "bogolan", face: "talk",
      arms: { l: [[-52, -150], [-42, -112]], r: [[14, -152], [-20, -154]] } }),
    at(P.x, P.y, P.s, false, broom.join("") + hand(-20, -154, psk) + hand(-42, -112, psk))));

  // La radio posée sur un tabouret, qui joue
  g.push(G(`<path d="M220 540H286L280 548H226Z" fill="${C.wood}"/>`, rect(232, 548, 8, 36, C.wood2), rect(266, 548, 8, 36, C.wood2), rect(230, 566, 46, 5, C.wood2),
    stroke("M270 506L292 470", C.grey, 2.5), rect(222, 504, 62, 38, C.red, ' rx="6"'), `<circle cx="240" cy="524" r="11" fill="${C.dark}"/><circle cx="240" cy="524" r="4" fill="${C.grey}"/>`, rect(258, 512, 18, 8, C.yellow, ' rx="2"'), rect(258, 526, 18, 3, C.dark, ' opacity=".5"'), rect(258, 532, 18, 3, C.dark, ' opacity=".5"'), rect(234, 498, 38, 6, C.dark, ' rx="3"')));

  // La petite fille, qui arrose les fleurs avec son arrosoir
  const F = { x: 322, y: 556, s: 0.6 }, fsk = SKIN.s4;
  const can = `<g transform="translate(46 -132)"><path d="M-6 -6H34L30 30H-2Z" fill="${C.green}"/>${stroke("M30 0L62 -18", C.green, 6)}<path d="M60 -26L70 -14L58 -10Z" fill="${C.green}"/>${stroke("M2 -6Q14 -26 26 -6", C.green, 4)}</g>`;
  g.push(G(person({ ...F, skin: fsk, hair: { type: "bantu" }, robe: "dress", top: C.ocre, wax: "wax3", face: "laugh", arms: { l: [[-38, -156], [-34, -118]], r: [[40, -160], [48, -136]] } }),
    at(F.x, F.y, F.s, false, can + hand(48, -136, fsk))));
  g.push(G(note(290, 488, C.indigo), note(354, 424, C.terra, 0.85, 10), note(272, 444, C.green, 0.75), note(368, 456, C.ocre, 0.7, 14)));
  // Les gouttes d'eau et les fleurs en pot
  g.push(G([[372, 488], [378, 500], [368, 506], [384, 512], [374, 520]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2" ry="3.4" fill="${C.blue}"/>`).join("")));
  const flower = (x, y, col) => `${stroke(`M${x} ${y}V${y - 26}`, C.leaf2, 2.5)}<path d="M${x} ${y - 10}Q${x - 12} ${y - 16} ${x - 14} ${y - 8}Q${x - 6} ${y - 4} ${x} ${y - 10}Z" fill="${C.leaf}"/>${[0, 72, 144, 216, 288].map((a) => `<circle cx="${f(x + Math.cos((a * Math.PI) / 180) * 6)}" cy="${f(y - 30 + Math.sin((a * Math.PI) / 180) * 6)}" r="4.5" fill="${col}"/>`).join("")}<circle cx="${x}" cy="${y - 30}" r="3" fill="${C.yellow}"/>`;
  g.push(G(`<path d="M360 540H412L406 574H366Z" fill="${C.terra}"/>`, rect(356, 534, 60, 8, C.wood2), flower(370, 536, C.red), flower(386, 530, C.rose), flower(402, 536, C.white)));

  // La maman, qui étend le linge : une main épingle le pagne, l'autre tient la bassine
  const M = { x: 478, y: 524, s: 1 }, msk = SKIN.s3;
  g.push(G(person({ ...M, skin: msk, hair: { type: "boxbraids", beads: C.ocre }, robe: "kaba", top: C.indigo, wax: "wax2", face: "laugh",
    arms: { l: [[-52, -162], [-34, -136]], r: [[50, -232], [52, -276]] } }),
    at(M.x, M.y, M.s, false, `<path d="M-108 -134H-28L-36 -96Q-68 -88 -100 -96Z" fill="${C.white}"/>` + `<path d="M-104 -138Q-86 -156 -70 -140Q-56 -158 -36 -138Z" fill="${C.rose}"/><path d="M-90 -140Q-74 -150 -60 -136Z" fill="${C.yellow}"/>` + rect(-112, -140, 88, 8, C.grey, ' rx="4"') + hand(-34, -136, msk) + rect(48, -288, 5, 14, C.wood, ' rx="2"') + hand(52, -276, msk))));

  // L'ado, qui lave la voiture à l'éponge, le seau de mousse à ses pieds
  const A = { x: 592, y: 560, s: 0.92 }, ask = SKIN.s5;
  g.push(G(`<path d="M520 528H566L560 566H526Z" fill="${C.grey}"/>`, `<ellipse cx="543" cy="528" rx="23" ry="5" fill="${C.steel}"/>`, `<circle cx="532" cy="524" r="7" fill="${C.white}"/><circle cx="546" cy="521" r="8" fill="${C.white}"/><circle cx="558" cy="525" r="6" fill="${C.white}"/>`, stroke("M522 530Q543 506 564 530", C.dark, 2)));
  g.push(G(person({ ...A, skin: ask, hair: { type: "nattes" }, top: C.terra, sleeve: "short", bottom: C.dark, face: "smile",
    arms: { l: [[-42, -150], [-40, -110]], r: [[56, -180], [74, -142]] } }),
    at(A.x, A.y, A.s, false, rect(66, -156, 24, 16, C.yellow, ' rx="5"') + hand(74, -146, ask))));

  // Les poules qui passent
  g.push(hen(446, 578, 0.85, false, C.wood), hen(712, 578, 0.85, true, C.wood2), hen(200, 580, 0.7, false, C.white));

  return frame(g.join(""), C.sky);
}

/* ---------- Scène 2 : battle de danse au quartier ---------- */
function danseurs() {
  const g = [];
  // Ciel du soir et lune
  g.push(G(rect(0, 0, 800, 600, C.dark), rect(0, 0, 800, 420, C.blue, ' opacity=".4"'), rect(0, 260, 800, 160, C.rose, ' opacity=".18"'), `<circle cx="640" cy="80" r="22" fill="${C.cream}" opacity=".9"/>`,
    [[80, 50], [200, 90], [330, 40], [520, 70], [740, 140], [440, 120]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="${C.white}" opacity=".7"/>`).join("")));
  // Immeubles du quartier, fenêtres allumées
  const bld = (x, y, w, col, rows, cols) => {
    const p = [rect(x, y, w, 420 - y, col)];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if ((r * 7 + c * 3 + x) % 5 !== 0) p.push(rect(x + 12 + c * ((w - 24) / cols), y + 16 + r * 34, (w - 24) / cols - 10, 18, (r + c) % 3 ? C.yellow : C.ocre, ' opacity=".8"'));
    return G(...p);
  };
  g.push(bld(10, 190, 150, "#2A1E17", 6, 3), bld(170, 240, 120, C.wood2, 5, 2), bld(500, 210, 130, "#2A1E17", 6, 3), bld(640, 260, 150, C.wood2, 4, 3));
  g.push(G(rect(300, 300, 190, 120, C.indigo, ' opacity=".7"'), rect(300, 296, 190, 8, C.dark, ' opacity=".5"'), rect(330, 330, 40, 26, C.yellow, ' opacity=".7"'), rect(420, 330, 40, 26, C.yellow, ' opacity=".7"')));

  // Le sol du parking : bitume, lignes, cercle de lumière
  g.push(G(rect(0, 410, 800, 190, "#2A1E17"), rect(0, 410, 800, 190, C.grey, ' opacity=".35"'), rect(0, 408, 800, 6, C.grey, ' opacity=".6"'),
    `<path d="M40 600L110 430M690 600L640 430M770 600L740 430" stroke="${C.white}" stroke-width="4" opacity=".35"/>`,
    `<ellipse cx="350" cy="540" rx="280" ry="56" fill="${C.yellow}" opacity=".16"/>`));

  // Guirlande d'ampoules, entre deux poteaux
  const bulbs = [];
  bulbs.push(rect(30, 120, 8, 300, C.dark), rect(762, 110, 8, 310, C.dark));
  bulbs.push(stroke("M34 130Q220 230 400 150Q580 70 766 120", C.dark, 2));
  for (let i = 1; i < 16; i++) {
    const t = i / 16, a = t < 0.5 ? t * 2 : (t - 0.5) * 2;
    const [x0, y0, cx, cy, x1, y1] = t < 0.5 ? [34, 130, 220, 230, 400, 150] : [400, 150, 580, 70, 766, 120];
    const x = (1 - a) ** 2 * x0 + 2 * a * (1 - a) * cx + a * a * x1, y = (1 - a) ** 2 * y0 + 2 * a * (1 - a) * cy + a * a * y1;
    const col = [C.yellow, C.ocre, C.terra, C.green][i % 4];
    bulbs.push(`<circle cx="${f(x)}" cy="${f(y + 9)}" r="13" fill="${col}" opacity=".25"/>`, rect(x - 2.5, y, 5, 4, C.grey), `<ellipse cx="${f(x)}" cy="${f(y + 9)}" rx="5" ry="6.5" fill="${col}"/>`);
  }
  g.push(G(...bulbs));

  // Les enceintes et le DJ derrière ses platines
  const spk = (x, y, w, h, waves = true) => G(rect(x, y, w, h, C.dark, ' rx="6"'), `<circle cx="${x + w / 2}" cy="${y + h * 0.32}" r="${w * 0.22}" fill="#2A1E17"/><circle cx="${x + w / 2}" cy="${y + h * 0.32}" r="${w * 0.09}" fill="${C.grey}"/><circle cx="${x + w / 2}" cy="${y + h * 0.7}" r="${w * 0.34}" fill="#2A1E17"/><circle cx="${x + w / 2}" cy="${y + h * 0.7}" r="${w * 0.14}" fill="${C.grey}"/>`, waves ? stroke(`M${x - 10} ${y + 20}q-8 10 0 20M${x - 20} ${y + 14}q-12 16 0 32`, C.yellow, 2.5, ' opacity=".7"') : "");
  g.push(spk(560, 380, 56, 150, false));
  const D = { x: 678, y: 540, s: 0.95 }, dsk = SKIN.s1;
  g.push(G(person({ ...D, skin: dsk, hair: { type: "locks" }, top: C.green, wax: "kitenge", sleeve: "short", bottom: C.dark, face: "laugh",
    arms: { l: [[-46, -170], [-44, -128]], r: [[50, -216], [44, -262]] } }),
    at(D.x, D.y, D.s, false, stroke("M-26 -240Q-30 -280 0 -282Q30 -280 26 -240", C.dark, 5) + `<rect x="-31" y="-248" width="10" height="20" rx="4" fill="${C.terra}"/><rect x="21" y="-248" width="10" height="20" rx="4" fill="${C.terra}"/>`)));
  g.push(G(rect(604, 448, 150, 10, C.grey), `<path d="M610 458H748L740 536H618Z" fill="${C.dark}"/>`, rect(618, 470, 122, 22, C.terra, ' opacity=".8"'), rect(618, 470, 122, 22, "url(#kente)", ' opacity=".6"'),
    rect(612, 436, 136, 14, "#2A1E17", ' rx="3"'), `<ellipse cx="640" cy="436" rx="20" ry="5" fill="${C.grey}"/><ellipse cx="640" cy="436" rx="6" ry="2" fill="${C.terra}"/><ellipse cx="718" cy="436" rx="20" ry="5" fill="${C.grey}"/><ellipse cx="718" cy="436" rx="6" ry="2" fill="${C.ocre}"/>`,
    rect(672, 432, 14, 6, C.yellow), hand(678 - 44 * 0.95, 540 - 128 * 0.95, dsk, 7)));
  g.push(spk(730, 390, 48, 140, false));

  // Le public, au fond : on applaudit, on filme
  const clap = { l: [[-36, -170], [-6, -196]], r: [[36, -170], [6, -196]] };
  g.push(G(person({ x: 470, y: 470, s: 0.72, skin: SKIN.s3, hair: { type: "afro" }, top: C.ocre, dashiki: C.indigo, bottom: C.indigo, face: "laugh", arms: clap })));
  g.push(G(person({ x: 160, y: 468, s: 0.72, skin: SKIN.s5, hair: { type: "foulard", color: C.terra, wax: "wax1" }, top: C.green, wax: "wax3", robe: "dress", face: "laugh", arms: clap })));

  // Le danseur du rythme, au fond à droite, qui marque le temps
  g.push(G(person({ x: 528, y: 532, s: 0.88, skin: SKIN.s4, hair: { type: "short" }, hat: { type: "cap", color: C.ocre }, top: C.terra, wax: "wax2", sleeve: "short", bottom: C.indigo, legs: "walk", face: "smile",
    arms: { l: [[-44, -164], [-12, -184]], r: [[44, -164], [12, -184]] } })));

  // La spectatrice qui filme avec son téléphone, au premier plan à gauche
  const S = { x: 84, y: 570, s: 0.98, flip: true }, ssk = SKIN.s2;
  g.push(G(person({ ...S, skin: ssk, hair: { type: "boxbraids", beads: C.yellow }, top: C.indigo, wax: "ndop", bottom: C.dark, face: "smile",
    arms: { l: [[-56, -196], [-70, -238]], r: [[42, -152], [36, -112]] },
    lhand: (hx, hy) => `<rect x="${hx - 10}" y="${hy - 32}" width="20" height="34" rx="4" fill="${C.dark}"/><circle cx="${hx - 4}" cy="${hy - 25}" r="2.6" fill="${C.grey}"/><circle cx="${hx + 3}" cy="${hy - 25}" r="1.4" fill="${C.yellow}"/>` + hand(hx, hy, ssk) })));

  // La danseuse en bantu knots, qui tient la pose : genou levé, un bras au ciel
  const B = { x: 244, y: 566, s: 1 }, bsk = SKIN.s3;
  const legsB = stroke("M-10 -112L-14 -12", C.terra, 21) + stroke("M-10 -112L-14 -12", "url(#wax1)", 21) +
    stroke("M10 -110L58 -82L46 -36", C.terra, 21) + stroke("M10 -110L58 -82L46 -36", "url(#wax1)", 21) +
    cloth("M-27 -120H27L25 -96H-25Z", C.terra, "wax1") + `<ellipse cx="-18" cy="-6" rx="14" ry="7" fill="${C.ocre}"/><ellipse cx="50" cy="-30" rx="14" ry="7" fill="${C.ocre}" transform="rotate(20 50 -30)"/>`;
  g.push(G(at(B.x, B.y, B.s, false, legsB), person({ ...B, legs: "none", skin: bsk, hair: { type: "bantu" }, top: C.ocre, sleeve: "short", face: "laugh",
    arms: { l: [[-60, -224], [-70, -270]], r: [[56, -160], [26, -126]] } })));

  // Le danseur du milieu, en plein pas de coupé-décalé
  const K = { x: 398, y: 574, s: 1.06 }, ksk = SKIN.s1;
  g.push(G(`<ellipse cx="398" cy="576" rx="58" ry="8" fill="${C.dark}" opacity=".4"/>`, person({ ...K, skin: ksk, hair: { type: "nattes" }, top: C.ocre, wax: "kente", sleeve: "short", bottom: C.dark, legs: "walk", face: "laugh",
    arms: { l: [[-62, -200], [-96, -228]], r: [[58, -170], [86, -138]] } }),
    stroke("M282 318q-10 -6 -12 -20M296 312q-4 -8 -2 -18", C.yellow, 3, ' opacity=".8"')));
  g.push(G(note(330, 300, C.yellow, 0.9), note(452, 260, C.ocre, 0.8, 12), note(600, 330, C.yellow, 0.8, -4)));

  return frame(g.join(""), C.dark);
}

/* ---------- Scène 3 : la rizière ---------- */
// Repiqueuse penchée, vue de profil (vers la droite) : pieds en (0,0), dos courbé, mains dans l'eau.
function bent(o) {
  const { x, y, s = 1, flip = false, skin, top, wax = null, pagne, pwax = null, scarf, swax = null } = o;
  const p = [];
  // Bras du fond, plus sombre, tenant la botte de plants
  p.push(stroke("M52 -134L58 -84L62 -26", skin, 11), stroke("M52 -134L58 -84L62 -26", "rgba(0,0,0,.18)", 11));
  p.push(stroke("M58 -28L50 -58M62 -28L62 -62M66 -28L74 -56", C.leaf, 3), hand(62, -28, skin, 6.5));
  // Jambes nues, pagne relevé au-dessus du genou
  p.push(stroke("M-20 -100L-24 -6", skin, 12), stroke("M2 -100L8 -6", skin, 12));
  p.push(cloth("M-42 -128Q-30 -156 10 -146L22 -128L12 -74Q-14 -66 -40 -76Z", pagne, pwax), stroke("M-40 -84Q-14 -74 12 -82", "rgba(0,0,0,.2)", 3));
  // Buste penché
  p.push(stroke("M-14 -128L58 -142", top, 40), wax ? stroke("M-14 -128L58 -142", `url(#${wax})`, 40) : "");
  // Tête de profil, foulard noué
  p.push(`<ellipse cx="94" cy="-128" rx="20" ry="22" fill="${skin}"/>`, `<ellipse cx="114" cy="-124" rx="4" ry="5" fill="${skin}"/>`);
  p.push(cloth("M76 -136Q78 -158 100 -152Q114 -146 112 -138Q98 -146 84 -130Z", scarf, swax), cloth("M78 -140L60 -152L64 -136Z", scarf, swax));
  p.push(`<ellipse cx="104" cy="-128" rx="2.4" ry="3" fill="#0E0907"/><circle cx="104.8" cy="-129.2" r=".8" fill="#fff"/>`, stroke("M99 -136Q104 -138 108 -135", "#0E0907", 1.6), stroke("M104 -114Q108 -112 111 -115", "#7E2F25", 2.2));
  // Bras de devant : la main pique un plant dans l'eau
  p.push(stroke("M62 -132L82 -88L80 -20", top, 15), stroke("M78 -100L82 -88L80 -20", skin, 11), stroke("M78 -20L76 -40M82 -20L88 -38", C.leaf, 3), hand(80, -20, skin, 6.5));
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${p.join("")}</g>`;
}

function riziere() {
  const g = [];
  const W1 = C.sky, wat = (x, y, w, h, extra = "") => rect(x, y, w, h, W1, extra) + rect(x, y, w, h, C.blue, ` opacity=".28"${extra}`);
  g.push(`<defs><pattern id="riziere-pl" width="28" height="22" patternUnits="userSpaceOnUse"><path d="M7 18L3 8M7 18L7 5M7 18L11 9" stroke="${C.leaf}" stroke-width="2" stroke-linecap="round"/><path d="M21 8L17 0M21 8L21 -3M21 8L25 1M21 30L17 22M21 30L21 19M21 30L25 23" stroke="${C.leaf2}" stroke-width="1.8" stroke-linecap="round"/></pattern>
  <pattern id="riziere-pl2" href="#riziere-pl" patternTransform="scale(.6)"/></defs>`);
  // Ciel clair, soleil, nuages, oiseaux
  g.push(G(rect(0, 0, 800, 300, C.white), rect(0, 0, 800, 300, C.blue, ' opacity=".22"'), `<circle cx="140" cy="90" r="36" fill="${C.yellow}" opacity=".7"/>`));
  g.push(cloud(430, 70, 0.8), cloud(640, 110, 0.6));
  g.push(G(stroke("M520 150q8 -8 16 0q8 -8 16 0M570 130q6 -6 12 0q6 -6 12 0", C.dark, 2, ' opacity=".5"')));
  // Collines et rôniers
  g.push(G(`<path d="M0 250Q120 170 260 220Q380 150 520 210Q640 160 800 200V320H0Z" fill="${C.leaf}" opacity=".5"/>`, `<path d="M0 290Q200 240 400 280Q600 236 800 270V320H0Z" fill="${C.leaf2}" opacity=".5"/>`));
  const ronier = (x, y, s) => G(`<g transform="translate(${x} ${y}) scale(${s})">${stroke("M0 0Q4 -50 0 -100", C.wood2, 6)}<path d="M0 -100L-30 -110L-20 -96L-34 -88L0 -98L-12 -76L2 -96L18 -78L4 -98L34 -92L26 -104L36 -114Z" fill="${C.leaf2}"/></g>`);
  g.push(ronier(620, 286, 0.8), ronier(660, 290, 0.6), ronier(90, 290, 0.7));
  // Un petit village sur la colline : cases rondes au toit de paille
  const hut = (x, y, s) => G(`<g transform="translate(${x} ${y}) scale(${s})">${rect(-16, -22, 32, 22, C.sand)}${rect(-4, -14, 8, 14, C.wood2)}<path d="M-22 -20L0 -46L22 -20Z" fill="${C.ocre}"/><path d="M-22 -20L0 -46L22 -20Z" fill="${C.wood}" opacity=".3"/></g>`);
  g.push(hut(300, 262, 0.8), hut(330, 268, 0.65), hut(266, 270, 0.6));
  // Les terrasses de rizière : bandes d'eau plantées, séparées par des diguettes
  const bands = [[296, 360], [368, 440], [450, 530], [540, 610]];
  bands.forEach(([y0, y1], i) => {
    const pat = i < 2 ? "riziere-pl2" : "riziere-pl";
    g.push(G(wat(0, y0, 800, y1 - y0), rect(0, y0, 800, y1 - y0, `url(#${pat})`), stroke(`M0 ${y0}Q400 ${y0 - 8} 800 ${y0 + 2}`, C.wood, 8)));
  });
  // Une partie encore à repiquer : l'eau nue, qui reflète le ciel
  g.push(G(wat(150, 454, 520, 82), stroke("M190 476H260M320 496H420M470 482H560M220 510H290M560 520H620", C.white, 3, ' opacity=".7"')));
  g.push(G(wat(380, 372, 300, 72), stroke("M420 392H480M540 404H620M440 424H500", C.white, 2.5, ' opacity=".7"')));
  // Diguettes de devant (terre et herbe)
  g.push(G(`<path d="M0 446Q400 436 800 448V456Q400 444 0 454Z" fill="${C.wood}"/>`, `<path d="M0 536Q400 528 800 538V548Q400 538 0 546Z" fill="${C.wood}"/>`, `<path d="M0 446Q400 436 800 448" fill="none" stroke="${C.leaf}" stroke-width="3" stroke-dasharray="2 6"/>`));

  // Ondes et reflets autour des pieds
  const ripple = (x, y, w, col) => G(stroke(`M${x - w / 2} ${y + 10}H${x + w / 2}M${x - w / 3} ${y + 18}H${x + w / 3}M${x - w / 5} ${y + 25}H${x + w / 5}`, col, 4, ' opacity=".3"'), `<ellipse cx="${x}" cy="${y}" rx="${w / 2 + 6}" ry="6" fill="none" stroke="${C.white}" stroke-width="2" opacity=".8"/>`, `<ellipse cx="${x}" cy="${y}" rx="${w / 2 + 18}" ry="10" fill="none" stroke="${C.white}" stroke-width="1.5" opacity=".45"/>`);
  // Eau par-dessus les pieds
  const feet = (x, y, w) => G(wat(x - w / 2, y - 16, w, 20, ' rx="8"'));

  // La repiqueuse du fond, à droite, tournée vers la gauche
  g.push(G(bent({ x: 590, y: 430, s: 0.72, flip: true, skin: SKIN.s4, top: C.ocre, wax: "wax3", pagne: C.indigo, pwax: "ndop", scarf: C.terra, swax: "wax1" }), feet(590, 430, 60)), ripple(590, 430, 40, C.ocre));

  // Le héron blanc, dans l'eau, entre les plants
  g.push(G(`<g transform="translate(110 434)">${stroke("M-2 -40L-4 0M4 -40L7 0", C.yellow, 2.4)}<path d="M-34 -46Q-12 -72 16 -62Q26 -52 10 -42Q-14 -34 -34 -46Z" fill="${C.white}"/><path d="M-34 -46L-46 -38L-28 -42Z" fill="${C.white}"/>${stroke("M-14 -58Q2 -64 12 -54", C.steel, 2)}${stroke("M12 -60Q2 -78 14 -90Q24 -98 18 -108", C.white, 5.5)}<circle cx="20" cy="-110" r="5.5" fill="${C.white}"/><path d="M24 -112L46 -106L24 -107Z" fill="${C.yellow}"/>${stroke("M17 -113L4 -118", C.white, 1.6)}<circle cx="21" cy="-111" r="1.3" fill="${C.dark}"/><ellipse cx="2" cy="1" rx="22" ry="4" fill="none" stroke="${C.white}" stroke-width="1.5" opacity=".8"/>${stroke("M-24 10H22M-14 18H12", C.white, 3, ' opacity=".45"')}</g>`));

  // L'homme au chapeau de paille, une botte de plants dans chaque main
  const H = { x: 420, y: 516, s: 0.86 }, hsk = SKIN.s2;
  const bundle = (hx, hy) => `${stroke(`M${hx - 6} ${hy + 30}L${hx - 10} ${hy - 26}M${hx} ${hy + 32}L${hx} ${hy - 32}M${hx + 6} ${hy + 30}L${hx + 10} ${hy - 24}`, C.leaf, 4)}${stroke(`M${hx - 4} ${hy + 30}L${hx - 2} ${hy + 40}M${hx + 4} ${hy + 30}L${hx + 3} ${hy + 40}`, C.wood2, 2)}`;
  g.push(G(ripple(420, 516, 54, C.green), person({ ...H, skin: hsk, hair: { type: "short" }, hat: { type: "chapeau", color: C.yellow }, top: C.green, wax: "wax2", bottom: C.sand2, sleeve: "short", face: "smile",
    arms: { l: [[-46, -156], [-44, -116]], r: [[46, -156], [44, -116]] } }),
    at(H.x, H.y, H.s, false, stroke("M-13 -48L-13 -14M13 -48L13 -14", hsk, 14) + rect(-24, -56, 22, 10, C.sand, ' rx="4"') + rect(2, -56, 22, 10, C.sand, ' rx="4"') + bundle(-44, -116) + hand(-44, -116, hsk) + bundle(44, -116) + hand(44, -116, hsk)), feet(420, 516, 76)));

  // La repiqueuse de devant, à gauche
  g.push(G(bent({ x: 196, y: 522, s: 0.98, skin: SKIN.s1, top: C.terra, wax: "wax2", pagne: C.green, pwax: "kitenge", scarf: C.ocre, swax: "kente" }), feet(196, 522, 74)), ripple(196, 522, 60, C.terra));

  // L'enfant qui apporte de l'eau à boire, sur la diguette : bouilloire en plastique et gobelet
  const E = { x: 694, y: 546, s: 0.58 }, esk = SKIN.s3;
  g.push(G(person({ ...E, skin: esk, hair: { type: "puffs" }, robe: "dress", top: C.indigo, wax: "wax1", legs: "walkskirt", face: "laugh",
    arms: { l: [[-38, -156], [-30, -116]], r: [[42, -170], [36, -210]] } }),
    at(E.x, E.y, E.s, false, `<path d="M-50 -110H-12L-16 -64Q-31 -58 -46 -64Z" fill="${C.ocre}"/>${stroke("M-48 -108Q-31 -134 -14 -108", C.ocre, 5)}${stroke("M-14 -96L4 -112", C.ocre, 6)}<ellipse cx="-31" cy="-110" rx="19" ry="5" fill="${C.terra}"/>` + hand(-30, -116, esk) +
      `<path d="M24 -230H50L46 -206H28Z" fill="${C.wood}"/><ellipse cx="37" cy="-230" rx="13" ry="4" fill="${C.wood2}"/>` + hand(36, -210, esk))));

  return frame(g.join(""), C.sky);
}

export default [
  { id: "samedi", fr: "Le grand ménage du samedi", en: "Saturday chores", tags: ["ménage", "chores", "samedi", "saturday", "famille", "family", "cour", "yard", "balai", "broom", "linge", "laundry", "pagnes", "voiture", "car wash", "arrosoir", "watering can", "fleurs", "flowers", "radio", "musique", "music", "poules", "chickens"], draw: samedi },
  { id: "danseurs", fr: "Battle de danse", en: "Dance battle", tags: ["danse", "dance", "battle", "afrobeats", "coupé-décalé", "jeunes", "youth", "crew", "DJ", "platines", "turntables", "enceintes", "speakers", "quartier", "neighbourhood", "soir", "evening", "public", "crowd", "guirlande", "string lights"], draw: danseurs },
  { id: "riziere", fr: "La rizière", en: "The rice paddies", tags: ["rizière", "rice paddies", "riz", "rice", "repiquage", "transplanting", "agriculture", "farming", "Ndop", "Yagoua", "Nord-Cameroun", "eau", "water", "héron", "heron", "collines", "hills", "champ", "field"], draw: riziere },
];
