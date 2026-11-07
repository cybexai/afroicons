// Scènes : les bayam-sellam au marché de gros, la récolte du café dans les Grassfields, le basket au playground du quartier.
// Chaque objet (véhicule, arbuste, meuble, tas de vivres, personnage avec ce qu'il tient) est regroupé dans son propre <g>.
import { C, SKIN, HAIR, person, frame, palm, cloud, stroke, f } from "./lib.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${f(r)}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
/** Un objet = un groupe. */
const G = (...parts) => `<g>${parts.join("")}</g>`;
const use = (id, x, y, s = 1, r = 0) => `<use href="#${id}" transform="translate(${f(x)} ${f(y)}) scale(${s})${r ? ` rotate(${r})` : ""}"/>`;

/* ================= Scène 1 : les bayam-sellam ================= */
function bayam() {
  const g = [];
  // Formes répétées : régime de plantain, ananas, tomate, macabo
  const fingers = [];
  for (let r = 0; r < 4; r++) for (let i = -2; i <= 2; i++) {
    const y = -44 + r * 13, x = i * 7.5, col = (r + i) % 3 === 0 ? C.yellow : C.leaf;
    fingers.push(`<ellipse cx="${x}" cy="${y}" rx="4.2" ry="11" transform="rotate(${i * 14} ${x} ${y})" fill="${col}"/>`);
  }
  g.push(`<defs><g id="bayam-reg">${stroke("M0 -64V10", C.wood2, 5)}${fingers.join("")}</g>` +
    `<g id="bayam-ana"><path d="M0 -18Q-12 -34 -6 -44Q0 -32 0 -20Q2 -36 8 -46Q10 -30 2 -18Z" fill="${C.leaf2}"/><ellipse cx="0" cy="0" rx="11" ry="16" fill="${C.yellow}"/>` +
    `<path d="M-9 -8L9 8M-10 4L4 14M-4 -14L10 -2M9 -8L-9 8M10 4L-4 14M4 -14L-10 -2" stroke="${C.wood}" stroke-width="1.4"/></g>` +
    `<g id="bayam-tom"><circle r="7" fill="${C.red}"/><path d="M-3 -6L0 -4L3 -6L1 -8Z" fill="${C.leaf2}"/><circle cx="-2.5" cy="-2" r="1.8" fill="${C.white}" opacity=".4"/></g>` +
    `<g id="bayam-mac"><ellipse rx="16" ry="9" fill="${C.wood2}"/><path d="M-8 -8Q-6 0 -8 8M2 -9Q4 0 2 9M10 -7Q12 0 10 7" stroke="${C.dark}" stroke-width="1.2" fill="none" opacity=".45"/></g></defs>`);

  // Ciel du petit matin, soleil levant
  g.push(G(rect(0, 0, 800, 440, C.ocre, ' opacity=".14"'), `<circle cx="640" cy="120" r="80" fill="${C.yellow}" opacity=".22"/><circle cx="640" cy="120" r="44" fill="${C.yellow}" opacity=".6"/>`));
  g.push(cloud(110, 70, 0.7), cloud(430, 50, 0.55));
  // Hangars du marché au fond : toits de tôle, poteaux, étals colorés
  const shed = (x0, w) => {
    const p = [`<path d="M${x0 - 12} 250L${x0 + 20} 220H${x0 + w - 20}L${x0 + w + 12} 250Z" fill="${C.steel}"/>`,
      `<path d="${[...Array(Math.floor(w / 22))].map((_, i) => `M${x0 + 24 + i * 22} 222L${x0 + 6 + i * 22.4} 250`).join("")}" stroke="${C.grey}" stroke-width="2" opacity=".5"/>`,
      rect(x0, 250, w, 190, C.sand, ' opacity=".8"')];
    for (let x = x0 + 4; x < x0 + w; x += 70) p.push(rect(x, 250, 8, 190, C.wood2));
    for (let x = x0 + 22; x < x0 + w - 30; x += 70) p.push(rect(x, 330, 46, 12, C.wood), rect(x + 4, 342, 6, 40, C.wood2), rect(x + 36, 342, 6, 40, C.wood2),
      `<path d="M${x + 4} 330Q${x + 12} 312 ${x + 22} 330ZM${x + 22} 330Q${x + 32} 314 ${x + 42} 330Z" fill="${[C.red, C.leaf, C.yellow][(x / 70 | 0) % 3]}"/>`);
    return G(...p);
  };
  g.push(shed(340, 230), shed(590, 230));
  // Palmiers et immeubles de la ville derrière le marché
  g.push(G(rect(380, 150, 70, 72, C.sand2), rect(460, 120, 60, 102, C.steel, ' opacity=".7"'), rect(700, 160, 70, 62, C.sand2),
    `<path d="${[[392, 166], [416, 166], [392, 192], [416, 192], [472, 136], [494, 136], [472, 166], [494, 166], [712, 176], [740, 176]].map(([x, y]) => `M${x} ${y}h14v14h-14Z`).join("")}" fill="${C.indigo}" opacity=".3"/>`));
  g.push(palm(580, 232, 0.75, 8), palm(300, 300, 0.8, -8));
  // Sol de terre battue
  g.push(G(rect(0, 430, 800, 170, C.sand2), rect(0, 430, 800, 170, C.rose, ' opacity=".35"'),
    ...[[250, 470], [620, 470], [420, 590], [90, 596]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="18" ry="3" fill="${C.wood2}" opacity=".2"/>`)));

  /* Le camion de vivres venu du village (cabine à gauche, plateau à ridelles vers le marché) */
  const truck = [];
  truck.push(`<ellipse cx="220" cy="478" rx="210" ry="10" fill="${C.dark}" opacity=".15"/>`);
  truck.push(rect(40, 430, 360, 20, C.dark));
  // Chargement : régimes et sacs qui dépassent des ridelles
  for (const [x, y, s, r] of [[170, 352, 1, -10], [200, 348, 0.95, 8], [235, 352, 1, -4], [300, 350, 0.9, 12]]) truck.push(use("bayam-reg", x, y, s, r));
  truck.push(`<path d="M252 360Q250 326 272 322H306Q326 326 324 360Z" fill="${C.sand2}"/>`, stroke("M262 330Q288 336 316 330", C.wood, 2), `<path d="M142 362Q140 334 158 330H186Q202 334 200 362Z" fill="${C.sand}"/>`);
  // Ridelles en planches
  truck.push(rect(136, 352, 264, 80, C.wood), `<path d="M136 372H400M136 392H400M136 412H400" stroke="${C.wood2}" stroke-width="2.5" opacity=".6"/>`,
    `<path d="M136 352h8v80h-8ZM264 352h8v80h-8ZM392 352h8v80h-8Z" fill="${C.wood2}"/>`);
  // Cabine
  truck.push(`<path d="M40 432V330Q40 300 66 298H132V432Z" fill="${C.green}"/>`, `<path d="M52 350V330Q52 312 70 310H120V350Z" fill="${C.sky}"/>`,
    `<path d="M70 310H86L68 350H56Z" fill="${C.white}" opacity=".45"/>`, rect(128, 298, 8, 134, C.dark, ' opacity=".25"'), rect(60, 366, 18, 5, C.dark, ' rx="2"'),
    rect(28, 410, 18, 22, C.yellow, ' rx="3"'), rect(40, 398, 92, 6, C.dark, ' opacity=".2"'));
  for (const x of [96, 330]) truck.push(`<circle cx="${x}" cy="452" r="27" fill="${C.dark}"/><circle cx="${x}" cy="452" r="11" fill="${C.grey}"/><circle cx="${x}" cy="452" r="4" fill="${C.dark}"/>`);
  g.push(G(...truck));

  /* Le chauffeur-vendeur debout sur le plateau, qui tend un régime */
  const M = { x: 330, y: 432, s: 0.78 }, msk = SKIN.s2;
  g.push(G(person({ ...M, skin: msk, hair: { type: "short" }, beard: true, hat: { type: "cap", color: C.indigo }, top: C.terra, wax: "wax2", sleeve: "short", bottom: C.dark, face: "laugh",
    arms: { l: [[2, -150], [52, -152]], r: [[48, -160], [64, -170]] } }),
    // la ridelle avant recouvre ses jambes
    rect(136, 352, 264, 80, C.wood), `<path d="M136 372H400M136 392H400M136 412H400" stroke="${C.wood2}" stroke-width="2.5" opacity=".6"/>`, `<path d="M264 352h8v80h-8ZM392 352h8v80h-8Z" fill="${C.wood2}"/>`,
    at(M.x, M.y, M.s, false, use("bayam-reg", 62, -92, 1.25) + hand(64, -170, msk) + hand(52, -152, msk))));

  /* Bayam-sellam n°2 : bassine de tomates sur la tête, pagne, elle marche vers le marché */
  const W2 = { x: 572, y: 520, s: 0.9 }, w2 = SKIN.s1;
  const bas = [];
  for (const [x, y] of [[-34, -306], [-18, -310], [-2, -311], [14, -310], [30, -306], [-26, -318], [-10, -321], [6, -321], [22, -318], [-2, -330], [-17, -328], [13, -328]]) bas.push(use("bayam-tom", x, y));
  g.push(G(person({ ...W2, skin: w2, hair: { type: "nattes" }, top: C.green, wax: "kitenge", bottom: C.terra, bwax: "wax2", legs: "walkskirt", face: "smile",
    arms: { r: [[52, -236], [44, -282]], l: [[-40, -150], [-30, -110]] } }),
    at(W2.x, W2.y, W2.s, false, `<ellipse cx="0" cy="-270" rx="18" ry="5" fill="${C.ocre}"/>` + bas.join("") +
      `<path d="M-52 -302H52L42 -276Q0 -270 -42 -276Z" fill="${C.steel}"/><rect x="-55" y="-306" width="110" height="7" rx="3.5" fill="${C.grey}"/>` + hand(44, -282, w2))));

  /* Bayam-sellam n°1 : kaba et gele, elle saisit le régime et discute le prix */
  const W1 = { x: 470, y: 540, s: 0.98 }, w1 = SKIN.s4;
  g.push(G(person({ ...W1, skin: w1, hair: { type: "gele", color: C.ocre, wax: "wax1" }, robe: "kaba", top: C.indigo, wax: "wax1", face: "talk",
    arms: { l: [[-62, -214], [-100, -204]], r: [[46, -160], [58, -196]] } }),
    at(W1.x, W1.y, W1.s, false, hand(-100, -204, w1) + `<path d="M54 -206l2 -12l4 0l1 12ZM60 -206l3 -11l4 1l-1 11Z" fill="${w1}"/>`)));

  /* Bulle : on discute le prix (billets) */
  g.push(G(`<circle cx="410" cy="170" r="34" fill="${C.white}"/><path d="M426 198L446 226L436 196Z" fill="${C.white}"/>`,
    rect(390, 156, 40, 22, C.leaf, ' rx="3"'), rect(394, 162, 40, 22, C.green, ' rx="3"'), `<circle cx="414" cy="173" r="6" fill="${C.white}" opacity=".6"/>`));

  /* Les vivres déchargés au premier plan, à gauche : régimes, tas de macabo, ananas, cuvette de tomates */
  g.push(G(`<ellipse cx="160" cy="556" rx="130" ry="10" fill="${C.dark}" opacity=".12"/>`,
    use("bayam-reg", 84, 528, 1.15, -70),
    use("bayam-reg", 96, 546, 1.15, -82)));
  g.push(G(...[[170, 548], [200, 548], [230, 548], [185, 534], [215, 534], [200, 520]].map(([x, y]) => use("bayam-mac", x, y))));
  g.push(G(...[[274, 544], [300, 548], [287, 522]].map(([x, y]) => use("bayam-ana", x, y))));
  // Bassine de tomates
  const tom = [];
  for (const [x, y] of [[-20, -4], [-6, -6], [8, -5], [22, -3], [-13, -14], [1, -15], [15, -13], [-5, -23], [9, -22]]) tom.push(use("bayam-tom", x, y));
  g.push(G(`<g transform="translate(350 554)">${tom.join("")}<path d="M-40 -4H40L30 10H-30Z" fill="${C.blue}"/><rect x="-42" y="-7" width="84" height="5" rx="2.5" fill="${C.steel}"/></g>`));

  /* Le porteur et son pousse-pousse chargé de sacs */
  const P = { x: 728, y: 578, s: 0.9 }, psk = SKIN.s3;
  const cart = [`<ellipse cx="672" cy="578" rx="80" ry="8" fill="${C.dark}" opacity=".15"/>`,
    stroke("M622 494L612 576", C.wood2, 6),
    // chargement : sacs, régime
    `<path d="M616 484Q612 440 640 436H672Q692 440 688 484Z" fill="${C.sand2}"/>`, stroke("M626 446Q656 454 684 446", C.wood, 2.5),
    `<path d="M672 484Q670 452 690 448H708Q722 452 720 484Z" fill="${C.sand}"/>`, stroke("M678 458Q698 462 716 458", C.wood2, 2),
    use("bayam-reg", 660, 430, 0.9, -75),
    rect(606, 484, 124, 13, C.wood), rect(606, 496, 124, 6, C.wood2),
    `<circle cx="668" cy="542" r="36" fill="${C.dark}"/><circle cx="668" cy="542" r="26" fill="${C.grey}"/><circle cx="668" cy="542" r="7" fill="${C.dark}"/>`,
    `<path d="M668 516V568M642 542H694M650 524L686 560M686 524L650 560" stroke="${C.dark}" stroke-width="3"/>`];
  g.push(G(`<g transform="translate(-20 0)">${cart.join("")}</g>`, person({ ...P, skin: psk, hair: { type: "short" }, hat: { type: "kufi", color: C.ocre, wax: "kente" }, top: C.indigo, dashiki: C.ocre, sleeve: "short", bottom: C.wood2, legs: "walk", face: "smile",
    arms: { l: [[-44, -146], [-26, -112]], r: [[40, -150], [44, -110]] } }), stroke("M704 492L707 478", C.wood2, 7), hand(P.x - 26 * P.s, P.y - 112 * P.s, psk)));

  return frame(g.join(""), C.cream);
}

/* ================= Scène 2 : la récolte du café ================= */
function cafe() {
  const g = [];
  // Caféier : touffe de feuilles sombres et grappes de cerises rouges, base en (0,0)
  const leaves = [[-50, -120, 34, 26], [0, -170, 40, 32], [50, -122, 34, 28], [-24, -150, 34, 26], [28, -150, 32, 26], [-40, -70, 30, 22], [42, -72, 30, 22], [0, -100, 44, 34], [0, -50, 30, 22]];
  const cher = [[-48, -112], [-30, -138], [-6, -160], [18, -128], [40, -108], [52, -70], [-38, -64], [0, -84], [24, -54], [-16, -36], [30, -158], [-56, -90]];
  g.push(`<defs><pattern id="cafe-grains" width="14" height="10" patternUnits="userSpaceOnUse"><ellipse cx="3" cy="3" rx="2.6" ry="2" fill="${C.red}"/><ellipse cx="10" cy="7" rx="2.6" ry="2" fill="${C.wood2}"/><ellipse cx="9" cy="2" rx="2.2" ry="1.7" fill="${C.wood}"/><ellipse cx="3" cy="8" rx="2.2" ry="1.7" fill="#8E2A1E"/></pattern>` +
    `<g id="cafe-bush">${stroke("M0 0V-60M0 -40L-30 -80M0 -50L32 -86", C.wood2, 6)}${leaves.map(([x, y, rx, ry], i) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${i % 2 ? C.leaf2 : C.leaf}"/>`).join("")}` +
    `${cher.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.6" fill="${C.red}"/><circle cx="${x + 6}" cy="${y + 3}" r="4.2" fill="#B0301F"/><circle cx="${x + 2}" cy="${y + 7}" r="3.6" fill="${C.red}"/>`).join("")}</g>` +
    `<g id="cafe-mini"><ellipse cx="0" cy="-12" rx="14" ry="12" fill="${C.leaf2}"/><circle cx="-4" cy="-12" r="2" fill="${C.red}"/><circle cx="5" cy="-8" r="2" fill="${C.red}"/></g></defs>`);

  // Ciel clair, collines lointaines dans la brume
  g.push(G(rect(0, 0, 800, 300, C.white, ' opacity=".5"'), `<circle cx="330" cy="96" r="56" fill="${C.yellow}" opacity=".18"/><circle cx="330" cy="96" r="30" fill="${C.yellow}" opacity=".45"/>`, cloud(90, 60, 0.7), cloud(560, 44, 0.6)));
  g.push(G(stroke("M420 120q6 -6 12 0q6 -6 12 0M462 140q5 -5 10 0q5 -5 10 0M396 150q4 -4 8 0q4 -4 8 0", C.dark, 2, ' opacity=".5"')));
  g.push(G(`<path d="M0 190Q90 130 200 170Q300 110 420 160Q540 100 660 150Q740 120 800 140V300H0Z" fill="${C.blue}" opacity=".22"/>`,
    `<path d="M0 220Q130 170 260 210Q380 160 520 205Q650 170 800 200V300H0Z" fill="${C.leaf}" opacity=".35"/>`,
    rect(0, 200, 800, 40, C.white, ' opacity=".45"'), rect(0, 178, 800, 14, C.white, ' opacity=".35"')));
  // Cases des Grassfields sur la colline au loin (murs carrés, toits de chaume coniques)
  g.push(G(...[[150, 222, 1], [188, 226, 0.8], [520, 214, 0.9]].map(([x, y, k]) => `<g transform="translate(${x} ${y}) scale(${k})"><rect x="-14" y="-18" width="28" height="18" fill="${C.rose}" opacity=".8"/><path d="M-20 -16L0 -44L20 -16Z" fill="${C.wood}" opacity=".85"/><rect x="-4" y="-11" width="8" height="11" fill="${C.wood2}"/></g>`)));
  // Eucalyptus sur la crête
  g.push(G(...[[640, 214, 70], [665, 216, 56], [700, 212, 64]].map(([x, y, h]) => stroke(`M${x} ${y}V${y - h}`, C.wood2, 3) + `<ellipse cx="${x}" cy="${y - h}" rx="9" ry="24" fill="${C.leaf2}" opacity=".8"/>`)));
  // La colline en terrasses : bandes vertes, talus plus sombres, rangs de caféiers
  const ter = [];
  const bands = [[240, 290, C.leaf, 0.55], [290, 350, C.leaf, 0.7], [350, 420, C.leaf, 0.85]];
  for (const [y0, y1, col, op] of bands) {
    ter.push(`<path d="M0 ${y0 + 10}Q200 ${y0 - 14} 400 ${y0}Q600 ${y0 + 14} 800 ${y0 - 6}V${y1 + 10}H0Z" fill="${col}" opacity="${op}"/>`);
    ter.push(stroke(`M0 ${y0 + 12}Q200 ${y0 - 12} 400 ${y0 + 2}Q600 ${y0 + 16} 800 ${y0 - 4}`, C.leaf2, 5, ' opacity=".5"'));
  }
  for (const [y, n, s] of [[262, 16, 0.75], [318, 13, 0.95], [384, 11, 1.15]]) for (let i = 0; i < n; i++) ter.push(use("cafe-mini", 20 + i * (780 / n) + (y % 2) * 10, y + Math.sin(i * 1.3) * 3, s));
  g.push(G(...ter));
  // Bananier en bord de parcelle
  g.push(G(stroke("M748 470V330", C.leaf2, 10), `<path d="M748 334Q690 300 666 340Q706 322 748 340Z" fill="${C.leaf}"/><path d="M748 334Q800 296 790 330Q768 326 748 342Z" fill="${C.leaf2}"/><path d="M748 336Q736 270 768 252Q760 296 750 336Z" fill="${C.leaf}"/>`));
  // Le sol de la parcelle au premier plan
  g.push(G(`<path d="M0 420Q400 400 800 424V600H0Z" fill="${C.leaf}" opacity=".55"/>`, `<path d="M0 470Q300 450 560 470Q700 480 800 470V600H0Z" fill="${C.sand2}" opacity=".5"/>`));

  // Les grands caféiers
  const B1 = [250, 474], B2 = [452, 478];
  g.push(G(`<ellipse cx="${B1[0]}" cy="${B1[1]}" rx="60" ry="8" fill="${C.leaf2}" opacity=".5"/>`, use("cafe-bush", B1[0], B1[1], 1.1)));
  g.push(G(`<ellipse cx="${B2[0]}" cy="${B2[1]}" rx="60" ry="8" fill="${C.leaf2}" opacity=".5"/>`, use("cafe-bush", B2[0], B2[1], 1.1)));
  g.push(G(use("cafe-bush", 40, 456, 0.8)));

  /* La mère : foulard et robe en ndop, panier à la hanche, elle cueille */
  const W = { x: 140, y: 492, s: 0.95 }, wsk = SKIN.s3;
  const panier = `<path d="M-74 -132H-22Q-24 -96 -48 -94Q-72 -96 -74 -132Z" fill="${C.wood}"/>` + stroke("M-72 -120Q-48 -112 -24 -120M-68 -106Q-48 -100 -28 -106", C.wood2, 2.4) +
    `<ellipse cx="-48" cy="-132" rx="26" ry="6" fill="${C.wood2}"/>` + [[-60, -134], [-50, -136], [-40, -134], [-55, -138], [-44, -139]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${C.red}"/>`).join("");
  g.push(G(person({ ...W, skin: wsk, hair: { type: "foulard", color: C.ocre, wax: "wax3" }, top: "#1C2756", wax: "ndop", bottom: "#1C2756", bwax: "ndop", legs: "skirt", face: "smile",
    arms: { l: [[-46, -154], [-36, -126]], r: [[58, -214], [94, -226]] } }),
    at(W.x, W.y, W.s, false, panier + hand(-36, -128, wsk) + `<circle cx="100" cy="-226" r="4.5" fill="${C.red}"/>` + hand(94, -226, wsk))));

  /* Le père : chemise bogolan, chapeau de paille ; il tient une branche et cueille de l'autre main */
  const M = { x: 352, y: 498, s: 0.98 }, msk = SKIN.s1;
  const [bx, by] = [M.x + 72 * M.s, M.y - 248 * M.s];
  g.push(G(person({ ...M, skin: msk, hair: { type: "short" }, beard: true, hat: { type: "chapeau", color: C.yellow }, top: "#5E3E26", wax: "bogolan", sleeve: "short", bottom: C.indigo, face: "laugh",
    arms: { r: [[56, -214], [72, -248]], l: [[-50, -178], [-80, -188]] } }),
    // la branche tirée vers lui
    stroke(`M${B2[0] + 22} ${B2[1] - 140}Q${f(bx + 30)} ${f(by + 14)} ${f(bx)} ${f(by)}`, C.wood2, 4.5),
    ...[[bx + 12, by + 12, 13, 6, 40], [bx + 22, by + 4, 12, 6, -30], [bx + 30, by + 30, 13, 6, 50], [bx + 42, by + 24, 12, 6, -20], [bx + 8, by - 6, 11, 5, -50]].map(([x, y, rx, ry, r]) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${rx}" ry="${ry}" transform="rotate(${r} ${f(x)} ${f(y)})" fill="${C.leaf}"/>`),
    ...[[bx + 16, by + 20], [bx + 22, by + 26], [bx + 28, by + 18], [bx + 36, by + 38], [bx + 42, by + 34]].map(([x, y]) => `<circle cx="${f(x)}" cy="${f(y)}" r="4.2" fill="${C.red}"/>`),
    hand(bx, by, msk, 7.4), hand(M.x - 80 * M.s, M.y - 188 * M.s, msk, 7.4)));

  /* L'adolescent verse les cerises du panier dans le sac de jute */
  const A = { x: 568, y: 494, s: 0.84 }, ask = SKIN.s4;
  const [sx, sy] = [668, 494];
  const ado = [];
  // sac
  ado.push(`<ellipse cx="${sx}" cy="${sy}" rx="40" ry="7" fill="${C.leaf2}" opacity=".4"/>`,
    `<path d="M${sx - 34} ${sy}Q${sx - 42} ${sy - 50} ${sx - 30} ${sy - 92}H${sx + 30}Q${sx + 42} ${sy - 50} ${sx + 34} ${sy}Z" fill="${C.sand2}"/>`,
    `<ellipse cx="${sx}" cy="${sy - 92}" rx="30" ry="8" fill="${C.wood2}"/><ellipse cx="${sx}" cy="${sy - 92}" rx="24" ry="5" fill="${C.red}"/>`,
    stroke(`M${sx - 30} ${sy - 50}H${sx + 30}M${sx - 32} ${sy - 30}H${sx + 32}`, C.wood, 1.6, ' opacity=".5"'),
    `<path d="M${sx - 30} ${sy - 92}L${sx - 40} ${sy - 100}L${sx - 26} ${sy - 98}ZM${sx + 30} ${sy - 92}L${sx + 40} ${sy - 102}L${sx + 26} ${sy - 98}Z" fill="${C.sand2}"/>`);
  // cerises qui tombent
  for (const [x, y] of [[sx - 8, sy - 112], [sx - 2, sy - 104], [sx - 12, sy - 122], [sx + 4, sy - 116], [sx - 6, sy - 128]]) ado.push(`<circle cx="${x}" cy="${y}" r="3.8" fill="${C.red}"/>`);
  ado.push(person({ ...A, skin: ask, hair: { type: "short" }, top: C.terra, wax: "wax1", sleeve: "short", bottom: C.dark, face: "smile",
    arms: { l: [[8, -150], [58, -170]], r: [[58, -158], [96, -150]] } }));
  ado.push(at(A.x, A.y, A.s, false, `<g transform="translate(84 -168) rotate(52)"><path d="M-26 -8H26Q24 22 0 24Q-24 22 -26 -8Z" fill="${C.wood}"/>` + stroke("M-24 4Q0 12 24 4", C.wood2, 2.2) +
    `<ellipse cx="0" cy="-8" rx="26" ry="6" fill="${C.wood2}"/><circle cx="14" cy="-8" r="4" fill="${C.red}"/><circle cx="20" cy="-6" r="4" fill="${C.red}"/></g>` + hand(58, -170, ask) + hand(96, -150, ask)));
  g.push(G(...ado));

  /* Au premier plan : la claie de séchage en bambou couverte de grains */
  const cl = [];
  cl.push(`<ellipse cx="420" cy="576" rx="320" ry="10" fill="${C.leaf2}" opacity=".3"/>`);
  for (const [x, y0] of [[120, 540], [720, 540], [150, 526], [690, 526]]) cl.push(stroke(`M${x} ${y0}V576`, C.wood2, 7));
  cl.push(`<path d="M140 508H700L740 544H100Z" fill="${C.sand}"/>`, `<path d="M150 510H690L726 540H114Z" fill="${C.wood}" opacity=".35"/>`, `<path d="M150 510H690L726 540H114Z" fill="url(#cafe-grains)"/>`);
  cl.push(stroke("M100 544H740", C.wood2, 6), stroke("M140 508H700", C.wood, 4), stroke("M110 556H730", C.wood2, 4, ' opacity=".6"'));
  // petit râteau de bois posé sur la claie
  cl.push(stroke("M640 524L740 496", C.wood2, 4), stroke("M632 516L648 534", C.wood2, 5));
  g.push(G(...cl));

  return frame(g.join(""), C.sky);
}

/* ================= Scène 3 : basket au playground ================= */
function basket() {
  const g = [];
  const BALL = C.rose;
  g.push(`<defs><pattern id="basket-grille" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M0 0L16 16M16 0L0 16" stroke="${C.grey}" stroke-width="1.2"/></pattern>` +
    `<g id="basket-ballon"><circle r="13" fill="${BALL}"/><path d="M-13 0H13M0 -13V13M-9 -9Q-3 0 -9 9M9 -9Q3 0 9 9" stroke="${C.dark}" stroke-width="1.6" fill="none"/></g>` +
    `<g id="basket-bouteille"><rect x="-6" y="-30" width="12" height="30" rx="4" fill="${C.blue}" opacity=".75"/><rect x="-6" y="-18" width="12" height="8" fill="${C.white}" opacity=".7"/><rect x="-3.5" y="-36" width="7" height="7" rx="1.5" fill="${C.white}"/></g></defs>`);

  // Ciel bleu pâle
  g.push(G(rect(0, 0, 800, 400, C.blue, ' opacity=".2"'), cloud(320, 60, 0.7), cloud(600, 90, 0.5)));
  // Immeubles du quartier
  const block = (x, y, w, col, rows, cols) => {
    const p = [rect(x, y, w, 400 - y, col)];
    const cw = w / cols;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const wx = x + c * cw + cw * 0.22, wy = y + 24 + r * 46;
      p.push(rect(wx, wy, cw * 0.56, 24, C.indigo, ' opacity=".55"'));
      if ((r + c) % 2 === 0) p.push(rect(wx - 4, wy + 22, cw * 0.56 + 8, 6, C.white, ' opacity=".8"'));
    }
    p.push(rect(x - 6, y - 8, w + 12, 10, C.white, ' opacity=".7"'));
    return G(...p);
  };
  g.push(block(30, 120, 170, C.sand, 6, 3), block(220, 170, 140, C.rose, 5, 3), block(600, 90, 180, C.sand2, 6, 3));
  // Château d'eau et antenne sur les toits
  g.push(G(rect(70, 84, 44, 30, C.steel, ' rx="4"'), stroke("M76 114V120M108 114V120", C.grey, 3)), G(stroke("M660 82V50M648 60H672", C.grey, 2.5)));
  g.push(palm(372, 402, 0.95, -12), palm(566, 402, 0.75, 10));
  // Grillage
  g.push(G(rect(0, 300, 800, 100, "url(#basket-grille)", ' opacity=".55"'), stroke("M0 300H800", C.grey, 3), ...[40, 290, 540, 790].map((x) => stroke(`M${x} 300V400`, C.grey, 4))));
  // Le terrain : béton, surface peinte, lignes blanches, raquette
  g.push(G(rect(0, 396, 800, 204, C.steel), `<path d="M0 410H800V600H0Z" fill="${C.blue}" opacity=".45"/>`,
    `<path d="M560 420H800V520H520Z" fill="${C.terra}" opacity=".55"/>`, stroke("M560 420H800M560 420L520 520H800", C.white, 3),
    stroke("M520 520Q440 470 470 420", C.white, 3), stroke("M0 600Q300 470 450 412", C.white, 3, ' opacity=".7"')));

  /* Le panier : poteau, planche, cercle, filet */
  g.push(G(`<ellipse cx="754" cy="474" rx="26" ry="6" fill="${C.dark}" opacity=".2"/>`, rect(746, 170, 14, 304, C.grey), rect(720, 172, 30, 10, C.grey),
    rect(612, 120, 124, 86, C.white, ' rx="4"'), `<rect x="612" y="120" width="124" height="86" rx="4" fill="none" stroke="${C.red}" stroke-width="4"/>`,
    `<rect x="652" y="160" width="44" height="34" fill="none" stroke="${C.red}" stroke-width="3"/>`,
    `<path d="M652 210L662 252H686L696 210" fill="none" stroke="${C.white}" stroke-width="2"/><path d="M652 210L670 252M663 210L680 252M674 210L662 252M685 210L674 252M696 210L686 252M658 230H690M662 242H686" stroke="${C.white}" stroke-width="1.6"/>`,
    `<ellipse cx="674" cy="210" rx="25" ry="6" fill="none" stroke="${C.red}" stroke-width="4"/>`));

  /* Le muret des copains, l'enceinte, les bouteilles */
  g.push(G(rect(24, 398, 250, 86, C.sand2), `<path d="M24 420H274M24 444H274M24 466H274" stroke="${C.wood}" stroke-width="2" opacity=".35"/>`,
    `<path d="${[0, 1, 2, 3].map((r) => [...Array(r % 2 ? 5 : 5)].map((_, i) => `M${f(49 + i * 50 - (r % 2) * 25)} ${398 + r * 22}v22`).join("")).join("")}" stroke="${C.wood}" stroke-width="2" opacity=".35"/>`, rect(20, 392, 258, 8, C.sand)));
  // Copain n°1 qui applaudit, bras levés
  const F1 = { x: 70, y: 484, s: 0.74 };
  g.push(person({ ...F1, skin: SKIN.s5, hair: { type: "locks" }, top: C.ocre, wax: "kente", sleeve: "short", bottom: C.indigo, shoes: C.white, legs: "sit", face: "laugh",
    arms: { l: [[-48, -236], [-38, -282]], r: [[48, -236], [38, -282]] } }));
  // Copine n°2 qui filme avec son téléphone
  const F2 = { x: 168, y: 484, s: 0.74 };
  g.push(person({ ...F2, skin: SKIN.s2, hair: { type: "puffs" }, top: C.green, wax: "wax3", sleeve: "short", bottom: C.terra, bwax: "wax1", shoes: C.white, legs: "sit", face: "smile",
    arms: { l: [[-30, -160], [-6, -186]], r: [[36, -160], [20, -140]] }, phone: { rot: 0, screen: C.blue } }));
  // L'enceinte et ses notes
  g.push(G(rect(222, 346, 42, 48, C.dark, ' rx="6"'), `<circle cx="243" cy="378" r="11" fill="${C.grey}"/><circle cx="243" cy="378" r="5" fill="${C.dark}"/><circle cx="243" cy="356" r="5" fill="${C.grey}"/>`,
    `<path d="M276 330v-22l12 -4v22" stroke="${C.indigo}" stroke-width="3" fill="none"/><circle cx="272" cy="332" r="5" fill="${C.indigo}"/><circle cx="284" cy="327" r="5" fill="${C.indigo}"/><path d="M256 318v-16l9 -2" stroke="${C.terra}" stroke-width="3" fill="none"/><circle cx="252" cy="320" r="4.5" fill="${C.terra}"/>`));
  g.push(G(use("basket-bouteille", 120, 394), use("basket-bouteille", 206, 394, 0.9), use("basket-bouteille", 296, 506), use("basket-bouteille", 312, 508, 0.9),
    `<ellipse cx="304" cy="508" rx="22" ry="4" fill="${C.dark}" opacity=".15"/>`));

  // Maillot sans manches et short par-dessus les jambes (aide locale)
  const kit = (P, col, trim, skin) => at(P.x, P.y, P.s, P.flip, `<path d="M-28 -122H28L31 -74H3L0 -86L-3 -74H-31Z" fill="${col}"/>` + stroke("M-28 -78H-4M4 -78H28M-27 -118H27", trim, 3) +
    `<path d="M-30 -194Q-28 -204 -20 -206L-26 -176Z" fill="${skin}"/><path d="M30 -194Q28 -204 20 -206L26 -176Z" fill="${skin}"/>` + stroke("M-12 -206L0 -190L12 -206", trim, 3));

  /* Coéquipier qui appelle la balle, au fond */
  const T = { x: 352, y: 512, s: 0.8, flip: false }, tsk = SKIN.s3;
  g.push(G(person({ ...T, skin: tsk, hair: { type: "short" }, top: C.indigo, sleeve: "short", bottom: tsk, shoes: C.white, face: "talk",
    arms: { r: [[50, -230], [58, -276]], l: [[-40, -150], [-36, -110]] } }), kit(T, C.indigo, C.white, tsk)));
  /* Adversaire sous le panier, prêt pour le rebond */
  const O = { x: 690, y: 520, s: 0.82, flip: true }, osk = SKIN.s5;
  g.push(G(person({ ...O, skin: osk, hair: { type: "nattes" }, top: C.ocre, sleeve: "short", bottom: osk, shoes: C.white, legs: "walk", face: "smile",
    arms: { r: [[48, -176], [70, -200]], l: [[-48, -176], [-70, -200]] } }), kit(O, C.ocre, C.dark, osk)));

  /* La joueuse qui saute pour tirer (bantu knots), ballon qui part vers le cercle */
  const J = { x: 468, y: 500, s: 0.92, flip: false }, jsk = SKIN.s2;
  g.push(G(`<ellipse cx="${J.x}" cy="560" rx="34" ry="6" fill="${C.dark}" opacity=".18"/>`,
    person({ ...J, skin: jsk, hair: { type: "bantu" }, top: C.indigo, sleeve: "short", bottom: jsk, shoes: C.white, legs: "walk", face: "calm",
      arms: { r: [[44, -234], [26, -280]], l: [[-40, -236], [-14, -282]] } }), kit(J, C.indigo, C.white, jsk),
    at(J.x, J.y, J.s, false, `<use href="#basket-ballon" transform="translate(12 -306) scale(1.2)"/>` + hand(26, -282, jsk) + hand(-14, -284, jsk))));
  // Trajectoire en pointillés
  g.push(G(stroke(`M${f(J.x + 22)} 200Q590 100 670 202`, C.white, 3, ' stroke-dasharray="2 9" opacity=".9"')));

  /* Le défenseur, bras levés devant elle */
  const D = { x: 574, y: 566, s: 1, flip: true }, dsk = SKIN.s4;
  g.push(G(person({ ...D, skin: dsk, hair: { type: "afro" }, top: C.ocre, sleeve: "short", bottom: dsk, shoes: C.white, face: "talk",
    arms: { r: [[48, -232], [40, -284]], l: [[-46, -236], [-50, -284]] } }), kit(D, C.ocre, C.dark, dsk)));

  return frame(g.join(""), C.white);
}

export default [
  { id: "bayam", fr: "Les bayam-sellam", en: "The bayam-sellam traders", tags: ["marché", "market", "commerçante", "trader", "camion", "truck", "plantain", "vivres", "food", "bassine", "pousse-pousse", "cart", "Cameroun", "Cameroon", "gros", "wholesale"], draw: bayam },
  { id: "cafe", fr: "La récolte du café", en: "The coffee harvest", tags: ["café", "coffee", "récolte", "harvest", "Grassfields", "Ouest", "West", "famille", "family", "agriculture", "farming", "colline", "hill", "ndop", "Cameroun", "Cameroon"], draw: cafe },
  { id: "basket", fr: "Basket au playground", en: "Streetball at the playground", tags: ["basket", "basketball", "streetball", "sport", "jeunes", "youth", "quartier", "neighbourhood", "playground", "amis", "friends", "musique", "music"], draw: basket },
];
