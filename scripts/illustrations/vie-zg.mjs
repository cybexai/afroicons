// Scènes : le forage du village, la transhumance dans l'Adamaoua, le carrefour aux heures de pointe.
// Chaque objet (arbre, case, pompe, véhicule, animal, personnage et ce qu'il tient) est regroupé dans son propre <g>.
import { C, SKIN, HAIR, person, frame, cloud, palm, stroke, f } from "./lib.mjs";

/** Un objet = un groupe. */
const G = (...p) => `<g>${p.join("")}</g>`;
/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${f(r)}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
const shadow = (x, y, rx) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(rx * 0.16)}" fill="${C.dark}" opacity=".14"/>`;
const use = (id, x, y, s = 1, flip = false, extra = "") => `<use href="#${id}" transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})"${extra}/>`;
/** Poule de profil vers la droite, pattes au sol en (x,y). */
const hen = (x, y, s, fl, col) => G(at(x, y, s, fl, stroke("M-4 -14L-6 0M6 -14L8 0", C.ocre, 2.5) +
  `<path d="M-24 -30Q-34 -50 -20 -46Q-6 -40 4 -36Q18 -48 24 -40Q28 -30 22 -22Q10 -10 -6 -12Q-22 -14 -24 -30Z" fill="${col}"/>` +
  `<path d="M18 -46Q20 -54 24 -48Q26 -54 28 -46Z" fill="${C.red}"/><path d="M28 -40L34 -38L28 -35Z" fill="${C.ocre}"/><circle cx="23" cy="-41" r="1.6" fill="${C.dark}"/>`));

/* ---------- Scène 1 : le forage du village ---------- */
// Bidon jaune de 20 litres, fond au sol en (0,0) : 44 de large, 66 de haut avec la poignée.
const bidon = `<g id="forage-bidon"><rect x="-22" y="-54" width="44" height="54" rx="7" fill="${C.yellow}"/><rect x="6" y="-52" width="13" height="50" rx="5" fill="#000" opacity=".1"/>` +
  `<path d="M-14 -40H10M-14 -28H10M-14 -16H10" stroke="#000" stroke-width="2" opacity=".1"/><path d="M-18 -54V-64H2V-54" fill="none" stroke="${C.yellow}" stroke-width="6" stroke-linejoin="round"/>` +
  `<rect x="7" y="-63" width="12" height="10" rx="2.5" fill="${C.blue}"/></g>`;
/** Bassine émaillée posée sur la tête (repère local d'un personnage) : fond sur le crâne, bord en haut. */
const bassine = (col, full = true) => (full ? `<path d="M-30 -304Q-14 -322 4 -308Q22 -324 36 -302Z" fill="${C.leaf}"/><circle cx="-6" cy="-306" r="8" fill="${C.ocre}"/><circle cx="14" cy="-304" r="7" fill="${C.leaf2}"/>` : "") +
  `<path d="M-44 -300L-28 -264H28L44 -300Z" fill="${C.white}"/><path d="M-40 -292L-37 -284H37L40 -292Z" fill="${col}"/>` +
  `<circle cx="0" cy="-276" r="5" fill="${C.red}"/><circle cx="-7" cy="-274" r="3" fill="${C.leaf}"/><circle cx="7" cy="-274" r="3" fill="${C.leaf}"/>` +
  `<ellipse cx="0" cy="-300" rx="46" ry="7" fill="${C.white}"/><ellipse cx="0" cy="-300" rx="46" ry="7" fill="none" stroke="${col}" stroke-width="2.5"/><ellipse cx="0" cy="-264" rx="28" ry="4" fill="${C.sand2}"/>`;

function forage() {
  const g = [];
  g.push(`<defs>${bidon}</defs>`);
  // Ciel, soleil, nuages
  g.push(G(rect(0, 0, 800, 380, C.sky), `<circle cx="110" cy="84" r="34" fill="${C.yellow}" opacity=".7"/>`), cloud(300, 70, 0.8), cloud(520, 110, 0.55));
  // Collines boisées au loin
  g.push(G(`<path d="M0 320Q120 270 250 300Q380 250 520 296Q650 262 800 290V380H0Z" fill="${C.leaf}" opacity=".45"/>`, `<path d="M0 350Q200 320 400 344Q600 318 800 340V380H0Z" fill="${C.leaf2}" opacity=".4"/>`));
  // Les cases du village : ronde au toit de paille, carrée au toit de tôle
  const hut = (x, y, s) => G(at(x, y, s, false, rect(-40, -60, 80, 60, C.sand) + rect(-40, -14, 80, 14, C.wood, ' opacity=".35"') + `<path d="M-10 0V-34Q0 -42 10 -34V0Z" fill="${C.wood2}"/>` +
    `<path d="M-54 -54L0 -118L54 -54Q0 -44 -54 -54Z" fill="${C.ocre}"/><path d="M-54 -54L0 -118L54 -54Q0 -44 -54 -54Z" fill="${C.wood}" opacity=".3"/>` + stroke("M-36 -58L0 -112M-14 -52L0 -112M14 -52L0 -112M36 -58L0 -112", C.wood2, 2, ' opacity=".4"')));
  g.push(G(palm(140, 384, 0.9, 12)), hut(70, 384, 0.8), hut(196, 380, 0.62), G(stroke("M360 120q8 -8 16 0q8 -8 16 0M396 100q6 -6 12 0q6 -6 12 0", C.dark, 2, ' opacity=".45"')));
  g.push(G(rect(250, 300, 120, 80, C.cream), rect(250, 350, 120, 30, C.terra, ' opacity=".3"'), `<path d="M240 304L262 270H358L380 304Z" fill="${C.steel}"/>`, `<path d="M262 300L280 272M290 302L304 272M318 302L328 272M346 302L350 272" stroke="${C.grey}" stroke-width="2" opacity=".6"/>`,
    rect(272, 318, 24, 22, C.blue), rect(316, 330, 26, 50, C.wood2)));
  // Le manguier, grand et touffu, chargé de mangues
  const mangues = [[560, 240], [610, 270], [690, 230], [730, 270], [650, 300], [590, 300], [710, 300], [640, 214]];
  g.push(G(`<path d="M636 386Q640 330 628 290L650 290Q648 330 662 386Z" fill="${C.wood2}"/>`, stroke("M640 300L600 262M650 296L700 258", C.wood2, 9),
    `<ellipse cx="640" cy="250" rx="140" ry="72" fill="${C.leaf2}"/><circle cx="580" cy="230" r="56" fill="${C.leaf2}"/><circle cx="700" cy="226" r="60" fill="${C.leaf2}"/><circle cx="640" cy="198" r="62" fill="${C.leaf}"/><circle cx="574" cy="268" r="40" fill="${C.leaf}"/><circle cx="716" cy="272" r="42" fill="${C.leaf}"/>`,
    mangues.map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="8" fill="${i % 3 ? C.yellow : C.ocre}" transform="rotate(-15 ${x} ${y})"/>`).join("")));
  // Sol de latérite (terre rouge), sentiers plus clairs
  g.push(G(rect(0, 376, 800, 224, C.sand2), rect(0, 376, 800, 224, C.wood, ' opacity=".42"'), `<path d="M0 600Q160 470 330 440Q200 520 140 600Z" fill="${C.sand}" opacity=".35"/>`,
    [[60, 420], [740, 430], [230, 590], [690, 590], [500, 420]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="16" ry="3" fill="${C.wood2}" opacity=".3"/>`).join("")));

  // La pompe à motricité humaine sur sa dalle de béton
  const pump = [];
  pump.push(`<ellipse cx="430" cy="500" rx="132" ry="28" fill="${C.grey}"/><ellipse cx="430" cy="496" rx="126" ry="24" fill="${C.steel}"/><ellipse cx="470" cy="500" rx="40" ry="8" fill="${C.blue}" opacity=".35"/>`);
  pump.push(rect(402, 362, 30, 136, C.blue), rect(420, 364, 9, 132, "#000", ' opacity=".12"'), rect(394, 488, 46, 9, C.grey, ' rx="2"'));
  pump.push(rect(396, 318, 42, 48, C.blue, ' rx="4"'), rect(390, 310, 54, 10, C.grey, ' rx="3"'), rect(424, 322, 8, 40, "#000", ' opacity=".12"'));
  pump.push(stroke("M432 382H468L470 396", C.blue, 11), stroke("M430 374H438", C.grey, 4));
  pump.push(stroke("M470 400L470 440", C.blue, 6, ' opacity=".55"'), `<ellipse cx="465" cy="418" rx="2" ry="3.4" fill="${C.blue}" opacity=".7"/><ellipse cx="476" cy="428" rx="2" ry="3.4" fill="${C.blue}" opacity=".7"/>`);
  pump.push(use("forage-bidon", 458, 494, 0.95));
  // Le levier : pivot sur la tête de pompe, poignée côté fillette
  pump.push(stroke("M402 326L296 392", C.grey, 9), `<circle cx="402" cy="326" r="7" fill="${C.dark}"/>`, stroke("M300 389.5L288 397", C.dark, 11));
  g.push(G(...pump));

  // Le garçon et sa brouette chargée de bidons
  const B = { x: 140, y: 526, s: 0.66 }, bsk = SKIN.s2;
  const barrow = [];
  barrow.push(stroke("M114 450L104 474M166 450L176 474", C.grey, 5));
  barrow.push(use("forage-bidon", 124, 488, 0.6), use("forage-bidon", 156, 490, 0.6));
  barrow.push(`<path d="M86 470H194L178 514Q140 524 102 514Z" fill="${C.green}"/><path d="M86 470H194L192 478H88Z" fill="#000" opacity=".15"/>`);
  barrow.push(stroke("M110 514L104 540M170 514L176 540", C.grey, 5), `<circle cx="140" cy="540" r="17" fill="${C.dark}"/><circle cx="140" cy="540" r="7" fill="${C.steel}"/>`);
  g.push(G(shadow(140, 548, 60), person({ ...B, skin: bsk, hair: { type: "rase" }, top: C.ocre, wax: "kente", sleeve: "short", bottom: C.indigo, legs: "walk", face: "smile",
    arms: { l: [[-44, -150], [-40, -114]], r: [[44, -150], [40, -114]] } }), ...barrow, hand(114, 450, bsk, 5.5), hand(166, 450, bsk, 5.5)));

  // La fillette qui actionne le levier à deux mains
  const F = { x: 256, y: 548, s: 0.7 }, fsk = SKIN.s4;
  g.push(G(shadow(256, 548, 34), person({ ...F, skin: fsk, hair: { type: "bantu" }, robe: "dress", top: C.terra, wax: "wax1", face: "laugh",
    arms: { l: [[8, -168], [63, -226]], r: [[74, -184], [89, -239]] } }),
    at(F.x, F.y, F.s, false, hand(63, -226, fsk) + hand(89, -239, fsk))));

  // Les bidons qui attendent leur tour, en file sur la dalle
  g.push(G(use("forage-bidon", 506, 518, 0.8), use("forage-bidon", 540, 522, 0.8), use("forage-bidon", 360, 520, 0.8)));

  // La maman à la bassine émaillée sur la tête, qui raconte ; un bidon à la main
  const M = { x: 576, y: 552, s: 0.98 }, msk = SKIN.s1;
  g.push(G(shadow(576, 552, 60), person({ ...M, skin: msk, hair: { type: "nattes" }, robe: "kaba", top: C.green, wax: "wax2", face: "talk",
    arms: { l: [[-46, -150], [-40, -110]], r: [[58, -234], [38, -292]] } }),
    at(M.x, M.y, M.s, false, bassine(C.indigo) + hand(38, -292, msk) + use("forage-bidon", -35, -46) + hand(-40, -110, msk))));

  // Le petit, une mangue à la main, qui tient la main de sa mère
  const K = { x: 612, y: 566, s: 0.46 }, ksk = SKIN.s3;
  g.push(G(person({ ...K, skin: ksk, hair: { type: "puffs" }, robe: "dress", top: C.ocre, wax: "wax3", face: "laugh",
    arms: { l: [[-42, -160], [-46, -124]], r: [[46, -184], [56, -164]] } }),
    at(K.x, K.y, K.s, false, `<ellipse cx="-48" cy="-130" rx="11" ry="14" fill="${C.yellow}"/><ellipse cx="-52" cy="-134" rx="4" ry="6" fill="${C.ocre}" opacity=".6"/>` + stroke("M-48 -144L-46 -152", C.leaf2, 3) + hand(-46, -124, ksk))));

  // La deuxième maman, gele en tête, qui rit ; elle tient la main du petit et son bidon
  const W = { x: 690, y: 560, s: 0.94, flip: true }, wsk = SKIN.s5;
  g.push(G(shadow(690, 560, 50), person({ ...W, skin: wsk, hair: { type: "gele", color: C.ocre, wax: "wax3" }, robe: "dress", top: C.indigo, wax: "ndop", face: "laugh",
    arms: { r: [[52, -136], [55, -74]], l: [[-42, -150], [-40, -110]] } }),
    at(W.x, W.y, W.s, true, use("forage-bidon", -35, -46) + hand(-40, -110, wsk) + hand(55, -74, wsk))));

  // Poules qui picorent
  g.push(hen(222, 578, 0.7, true, C.white), hen(744, 580, 0.6, true, C.wood));
  return frame(g.join(""), C.sky);
}

/* ---------- Scène 2 : la transhumance ---------- */
// Zébu à longues cornes en lyre, de profil vers la droite, sabots au sol en (0,0), à l'échelle d'un personnage.
// La robe suit fill (sur le <use>), les taches et la bosse suivent color.
const zebu = `<g id="transhumance-zebu"><ellipse cx="10" cy="0" rx="124" ry="9" fill="${C.wood2}" opacity=".2"/>` +
  `<path d="M-70 -102H-52L-54 -52L-44 -6H-58L-68 -52Z"/><path d="M40 -100H58L54 -50L40 -6H26L38 -50Z"/><path d="M-70 -102H-52L-54 -52L-44 -6H-58L-68 -52ZM40 -100H58L54 -50L40 -6H26L38 -50Z" fill="#000" opacity=".25"/>` +
  `<path d="M-112 -148Q-130 -112 -122 -60" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><ellipse cx="-122" cy="-54" rx="7" ry="12" fill="${C.dark}"/>` +
  `<path d="M132 -160Q158 -200 146 -242Q138 -268 156 -294" fill="none" stroke="${C.sand2}" stroke-width="9" stroke-linecap="round"/><path d="M142 -256Q140 -276 156 -294" fill="none" stroke="${C.wood2}" stroke-width="5" stroke-linecap="round"/>` +
  `<path d="M-118 -128Q-122 -164 -86 -166Q-20 -172 24 -168Q80 -166 94 -134Q102 -104 82 -94Q20 -84 -40 -88Q-102 -90 -116 -110Z"/>` +
  `<path d="M-60 -150Q-30 -160 -20 -132Q-30 -104 -66 -112Q-82 -132 -60 -150Z" fill="currentColor" opacity=".7"/>` +
  `<path d="M8 -162Q12 -210 44 -206Q70 -200 74 -158Z"/><path d="M30 -204Q56 -204 72 -170Q60 -186 34 -190Z" fill="currentColor" opacity=".35"/>` +
  `<path d="M78 -128Q84 -76 106 -88L116 -114Z"/>` +
  `<path d="M62 -174Q104 -186 130 -164L164 -114Q170 -96 154 -90L136 -92Q112 -110 80 -116Z"/>` +
  `<path d="M144 -116L164 -114Q170 -96 154 -90L136 -92Z" fill="currentColor" opacity=".75"/>` +
  `<ellipse cx="106" cy="-162" rx="18" ry="6.5" transform="rotate(-26 106 -162)"/><ellipse cx="104" cy="-161" rx="10" ry="3" fill="currentColor" opacity=".6" transform="rotate(-26 104 -161)"/><ellipse cx="157" cy="-100" rx="3.6" ry="2.8" fill="${C.dark}"/>` +
  `<circle cx="130" cy="-142" r="3.6" fill="${C.dark}"/><circle cx="131" cy="-143.4" r="1.2" fill="#fff"/>` +
  `<path d="M122 -162Q94 -204 108 -246Q118 -274 102 -300" fill="none" stroke="${C.cream}" stroke-width="10" stroke-linecap="round"/><path d="M112 -266Q116 -286 102 -300" fill="none" stroke="${C.wood2}" stroke-width="5.5" stroke-linecap="round"/>` +
  `<path d="M-98 -106H-74L-78 -54L-86 -6H-102L-96 -54Z"/><path d="M56 -106H78L80 -54L90 -6H76L64 -54Z"/>` +
  `<g fill="${C.dark}"><ellipse cx="-52" cy="-4" rx="9" ry="4"/><ellipse cx="32" cy="-4" rx="9" ry="4"/><ellipse cx="-94" cy="-4" rx="10" ry="4.5"/><ellipse cx="84" cy="-4" rx="10" ry="4.5"/></g></g>`;
/** Grand chapeau conique peul en paille, cuir au sommet, jugulaire (repère local d'un personnage). */
const cone = `<ellipse cx="0" cy="-254" rx="44" ry="9" fill="${C.sand2}"/><path d="M-24 -256L0 -322L24 -256Z" fill="${C.sand}"/>` + stroke("M-17 -274Q0 -280 17 -274M-11 -292Q0 -296 11 -292", C.wood, 3) +
  `<path d="M-6 -306L0 -322L6 -306Z" fill="${C.wood2}"/><path d="M-24 -256L-12 -268L0 -256L12 -268L24 -256Z" fill="${C.terra}"/><ellipse cx="0" cy="-254" rx="44" ry="9" fill="none" stroke="${C.wood}" stroke-width="2.5"/>` + stroke("M-20 -250Q-16 -222 0 -212", C.wood2, 1.6);
/** Acacia au houppier plat. */
const acacia = (x, y, s) => G(at(x, y, s, false, stroke("M0 0L-4 -60L-40 -110M-4 -62L36 -116M-2 -30L-48 -76", C.wood2, 8) +
  `<ellipse cx="-50" cy="-116" rx="66" ry="16" fill="${C.leaf2}"/><ellipse cx="34" cy="-124" rx="76" ry="18" fill="${C.leaf2}"/><ellipse cx="-6" cy="-132" rx="80" ry="17" fill="${C.leaf}"/><ellipse cx="60" cy="-112" rx="44" ry="12" fill="${C.leaf}"/>`));
const dust = (x, y, rx, o = 0.3) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${f(rx * 0.22)}" fill="${C.sand}" opacity="${o}"/>`;

function transhumance() {
  const g = [];
  g.push(`<defs>${zebu}</defs>`);
  // Ciel doré, soleil bas
  g.push(G(rect(0, 0, 800, 340, C.cream), rect(0, 160, 800, 180, C.ocre, ' opacity=".14"'), `<circle cx="590" cy="150" r="76" fill="${C.yellow}" opacity=".2"/><circle cx="590" cy="150" r="46" fill="${C.yellow}" opacity=".7"/>`));
  g.push(cloud(140, 80, 0.7), cloud(330, 120, 0.5));
  // Les collines de l'Adamaoua
  g.push(G(`<path d="M0 250Q80 196 170 230Q260 160 380 220Q470 180 560 226Q660 176 800 216V340H0Z" fill="${C.leaf}" opacity=".35"/>`,
    `<path d="M0 290Q150 246 300 280Q470 236 640 276Q730 258 800 266V340H0Z" fill="${C.leaf2}" opacity=".4"/>`));
  // La savane : herbe sèche dorée
  g.push(G(`<path d="M0 320Q200 306 400 316T800 312V600H0Z" fill="${C.sand2}"/>`, `<path d="M0 470Q260 454 520 468T800 460V600H0Z" fill="${C.ocre}" opacity=".2"/>`,
    [[40, 350, 1], [290, 340, 0.8], [520, 346, 0.8], [770, 350, 0.9], [60, 470, 1.2], [770, 500, 1.2], [470, 590, 1.3], [300, 596, 1]].map(([x, y, k]) => at(x, y, k, false, stroke("M-8 0L-14 -18M-2 0L-2 -24M4 0L12 -16M8 0L18 -10", C.wood, 2.4))).join("")));
  g.push(acacia(96, 342, 0.9), acacia(716, 336, 0.75));
  // Le troupeau : trois rangs de zébus mbororo, de plus en plus proches ; la poussière dorée entre eux
  const Z = (x, y, s, fill, col, fl = false) => G(use("transhumance-zebu", x, y, s, fl, ` fill="${fill}" color="${col}"`));
  g.push(Z(200, 384, 0.44, C.wood, C.wood2), Z(330, 388, 0.44, C.white, C.grey), Z(456, 384, 0.44, C.wood2, C.dark), Z(590, 390, 0.42, C.white, C.sand2));
  g.push(G(dust(260, 392, 140, 0.45), dust(520, 396, 160, 0.45), rect(0, 300, 800, 100, C.sand, ' opacity=".18"')));
  g.push(Z(250, 448, 0.6, C.wood2, C.dark), Z(540, 444, 0.6, C.wood, C.wood2));
  g.push(G(dust(300, 456, 150, 0.4), dust(560, 452, 130, 0.4)));
  g.push(Z(400, 506, 0.76, C.white, C.grey));
  // Les pique-bœufs posés sur le dos du grand zébu
  g.push(G(at(380, 378, 1, false, `<path d="M-10 0Q-12 -10 0 -12Q8 -18 12 -12L18 -12L12 -8Q8 0 -10 0Z" fill="${C.white}"/><circle cx="9" cy="-14" r="1.2" fill="${C.dark}"/>${stroke("M-2 0L-2 6M3 0L4 6", C.ocre, 1.6)}`),
    at(342, 383, 0.8, true, `<path d="M-10 0Q-12 -10 0 -12Q8 -18 12 -12L18 -12L12 -8Q8 0 -10 0Z" fill="${C.white}"/><circle cx="9" cy="-14" r="1.2" fill="${C.dark}"/>${stroke("M-2 0L-2 6M3 0L4 6", C.ocre, 1.6)}`)));
  g.push(G(dust(420, 512, 120, 0.45), dust(220, 520, 70, 0.3)));

  // La femme peule : tresses peules, créoles d'or, calebasse de lait sur la tête ; elle tient la main de l'enfant
  const W = { x: 128, y: 574, s: 0.98 }, wsk = SKIN.s4;
  g.push(G(shadow(128, 574, 50), person({ ...W, skin: wsk, hair: { type: "fulani", beads: C.yellow }, top: C.terra, wax: "wax3", sleeve: "short", bottom: C.indigo, bwax: "ndop", legs: "walkskirt", face: "smile",
    arms: { l: [[-54, -230], [-34, -282]], r: [[46, -140], [52, -92]] } }),
    at(W.x, W.y, W.s, false, `<circle cx="-22" cy="-222" r="5.5" fill="none" stroke="${C.yellow}" stroke-width="2.5"/><circle cx="22" cy="-222" r="5.5" fill="none" stroke="${C.yellow}" stroke-width="2.5"/>` +
      `<ellipse cx="0" cy="-264" rx="22" ry="5" fill="${C.green}"/><path d="M-34 -290Q-34 -264 0 -264Q34 -264 34 -290Z" fill="${C.sand2}"/>` + stroke("M-30 -278Q0 -268 30 -278", C.wood2, 2.5, ' stroke-dasharray="4 3"') +
      `<path d="M-36 -290Q-32 -322 0 -324Q32 -322 36 -290Z" fill="${C.ocre}"/>` + stroke("M-30 -300L-20 -310L-10 -300L0 -310L10 -300L20 -310L30 -300", C.white, 2.4) + `<circle cx="0" cy="-326" r="5" fill="${C.terra}"/>` + hand(-34, -282, wsk))));

  // L'enfant, son petit bâton levé, qui suit le troupeau
  const E = { x: 214, y: 574, s: 0.6 }, esk = SKIN.s2;
  g.push(G(shadow(214, 574, 28), person({ ...E, skin: esk, hair: { type: "rase" }, top: C.green, sleeve: "short", bottom: C.sand2, bwax: "bogolan", legs: "walk", face: "laugh",
    arms: { l: [[-50, -176], [-58, -150]], r: [[46, -176], [66, -214]] } }),
    at(E.x, E.y, E.s, false, stroke("M60 -170L80 -320", C.wood2, 6) + hand(66, -214, esk))));

  // Le berger mbororo : chapeau conique, boubou indigo, bâton de berger ; il appelle les bêtes
  const H = { x: 660, y: 576, s: 1.02, flip: true }, hsk = SKIN.s1;
  g.push(G(shadow(660, 576, 56), person({ ...H, skin: hsk, hair: { type: "rase" }, beard: true, robe: "boubou", top: C.indigo, legs: "walk", face: "talk",
    arms: { r: [[56, -168], [76, -206]], l: [[-46, -156], [-50, -122]] } }),
    at(H.x, H.y, H.s, true, stroke("M-56 -260L-46 -2", C.wood2, 6) + `<circle cx="-56" cy="-262" r="5" fill="${C.wood2}"/>` + hand(-50, -122, hsk) +
      stroke("M20 -204L-30 -126", C.wood, 4) + `<path d="M-46 -132H-14L-16 -100Q-30 -94 -44 -100Z" fill="${C.wood}"/>` + stroke("M-42 -124H-18", C.ocre, 3) + cone)));

  return frame(g.join(""), C.cream);
}

/* ---------- Scène 3 : le carrefour aux heures de pointe ---------- */
// Moto-taxi de profil vers la droite (repère de vie-b décalé : sol en 0, centre en 0) ; la carrosserie suit color.
const moto = `<g id="carrefour-moto"><g transform="translate(-380 -560)">` +
  `<ellipse cx="380" cy="562" rx="200" ry="8" fill="${C.dark}" opacity=".2"/>` +
  [236, 516].map((cx) => `<circle cx="${cx}" cy="520" r="40" fill="${C.dark}"/><circle cx="${cx}" cy="520" r="27" fill="${C.steel}"/><circle cx="${cx}" cy="520" r="9" fill="${C.grey}"/>`).join("") +
  `<path d="M236 520L372 492M262 412L244 506M494 398L438 462M494 396L300 420" stroke="${C.dark}" stroke-width="9" fill="none"/>` +
  `<path d="M186 512Q190 470 236 468Q268 468 282 486M484 494Q496 468 522 470Q544 474 552 494" stroke="currentColor" stroke-width="8" fill="none"/>` +
  `<path d="M352 456H436L442 470Q440 500 418 506H370Q350 502 348 484Z" fill="${C.grey}"/><circle cx="380" cy="482" r="15" fill="${C.steel}"/>` +
  `<path d="M430 476Q420 512 380 516H300" stroke="${C.steel}" stroke-width="8" fill="none"/><path d="M196 504H312Q320 512 312 522H196Q188 513 196 504Z" fill="${C.steel}"/>` +
  `<path d="M300 420H386L380 456H312Z" fill="currentColor"/><path d="M404 404Q408 378 446 376Q480 376 494 392L490 414Q448 424 408 420Z" fill="currentColor"/>` +
  `<path d="M196 402Q198 388 216 388H398Q414 388 412 402L404 412H210Q196 412 196 402Z" fill="${C.dark}"/>` +
  `<path d="M496 392L516 520" stroke="${C.steel}" stroke-width="9"/><circle cx="514" cy="386" r="17" fill="${C.dark}"/><circle cx="518" cy="386" r="12" fill="${C.yellow}"/>` +
  `<rect x="424" y="497" width="34" height="7" rx="3.5" fill="${C.dark}"/><path d="M496 394L488 348M466 346Q480 340 500 348" stroke="${C.dark}" stroke-width="6" fill="none" stroke-linecap="round"/></g></g>`;
/** Petit sachet d'eau (pure water) : coussin transparent bleuté. */
const sachetDef = `<g id="carrefour-sachet"><rect x="-9" y="-6" width="18" height="12" rx="4" fill="${C.white}" opacity=".9"/><rect x="-7" y="-4" width="14" height="8" rx="3" fill="${C.blue}" opacity=".45"/></g>`;
const sachet = (x, y, r = 0) => `<use href="#carrefour-sachet" transform="translate(${f(x)} ${f(y)}) rotate(${r})"/>`;
/** Enseigne en pictogramme sur un panneau. */
const sign = (x, y, w, h, bg, icon) => G(rect(x, y, w, h, bg, ' rx="4"'), `<g transform="translate(${f(x + w / 2)} ${f(y + h / 2)})">${icon}</g>`);

function carrefour() {
  const g = [];
  g.push(`<defs>${moto}${sachetDef}</defs>`);
  // Ciel, nuages
  g.push(G(rect(0, 0, 800, 400, C.sky), rect(0, 0, 800, 400, C.blue, ' opacity=".12"')), cloud(120, 60, 0.6), cloud(560, 50, 0.7));
  // Les immeubles du centre-ville : fenêtres, balcons, rez-de-chaussée commerçant
  const bld = (x, top, w, col, floors, cols, shade = false) => {
    const p = [rect(x, top, w, 400 - top, col), rect(x, top - 8, w, 10, C.grey, ' opacity=".5"')];
    if (shade) p.push(rect(x, top, w, 400 - top, "#000", ' opacity=".06"'));
    const cw = (w - 20) / cols;
    const win = ["", ""];
    for (let r = 0; r < floors; r++) for (let c = 0; c < cols; c++) win[(r + c + x) % 3 ? 0 : 1] += `M${f(x + 12 + c * cw)} ${top + 16 + r * 40}h${f(cw - 10)}v22h${f(10 - cw)}Z`;
    p.push(`<path d="${win[0]}" fill="${C.blue}" opacity=".55"/><path d="${win[1]}" fill="${C.dark}" opacity=".55"/>`);
    let bal = "";
    for (let r = 0; r < floors; r += 2) bal += `M${x + 6} ${top + 40 + r * 40}h${w - 12}v4h${12 - w}Z`;
    p.push(`<path d="${bal}" fill="${C.white}" opacity=".7"/>`);
    return G(...p);
  };
  g.push(bld(0, 140, 180, C.sand, 5, 3), bld(180, 80, 150, C.rose, 7, 3, true), bld(330, 170, 140, C.cream, 4, 3), bld(470, 110, 170, C.sand2, 6, 4), bld(640, 150, 160, C.ocre, 5, 3, true));
  // Rez-de-chaussée : boutiques, auvents et enseignes en pictogrammes
  g.push(G(rect(0, 344, 800, 56, C.white, ' opacity=".5"'), rect(10, 352, 70, 48, C.dark, ' opacity=".55"'), rect(196, 352, 60, 48, C.dark, ' opacity=".55"'), rect(350, 352, 100, 48, C.dark, ' opacity=".5"'), rect(660, 352, 120, 48, C.dark, ' opacity=".55"')));
  g.push(G(`<path d="M0 334H180L170 350H0Z" fill="${C.green}"/>`, `<path d="M190 334H330L322 350H198Z" fill="${C.terra}"/>`, `<path d="M640 334H800V350H648Z" fill="${C.indigo}"/>`));
  g.push(sign(90, 306, 70, 26, C.indigo, `<path d="M-14 -6Q-12 -10 -6 -8L-4 -2Q-6 0 -4 3L1 7Q4 9 6 6L12 8Q14 14 10 15Q-14 12 -14 -6Z" fill="${C.white}"/>`));
  g.push(sign(236, 300, 70, 28, C.dark, `<circle cx="-8" cy="6" r="5" fill="none" stroke="${C.white}" stroke-width="2.5"/><circle cx="8" cy="6" r="5" fill="none" stroke="${C.white}" stroke-width="2.5"/>${stroke("M-5 2L10 -10M5 2L-10 -10", C.white, 2.5)}`));
  g.push(sign(360, 304, 80, 26, C.green, `<ellipse cx="0" cy="0" rx="20" ry="7" fill="${C.ocre}"/>${stroke("M-10 -3L-6 3M-2 -4L2 3M6 -4L10 3", C.wood2, 2)}`));
  g.push(sign(680, 304, 90, 26, C.terra, `<path d="M-10 -6H10L8 8H-8Z" fill="${C.white}"/>${stroke("M10 -2Q16 -2 14 4Q12 6 9 5", C.white, 2)}${stroke("M-4 -9Q-2 -12 -4 -15M3 -9Q5 -12 3 -15", C.white, 1.6)}`));
  // Poteau électrique et fils
  g.push(G(rect(176, 70, 8, 330, C.wood2), rect(156, 80, 48, 6, C.wood2), stroke("M0 96Q90 112 160 84M200 84Q480 130 800 92M0 110Q100 124 160 96M200 96Q480 146 800 106", C.dark, 1.6, ' opacity=".6"')));
  // Feu tricolore en panne au coin
  g.push(G(rect(468, 230, 7, 170, C.dark), rect(460, 196, 23, 52, C.dark, ' rx="5"'), `<circle cx="471.5" cy="208" r="6" fill="${C.grey}"/><circle cx="471.5" cy="222" r="6" fill="${C.grey}"/><circle cx="471.5" cy="236" r="6" fill="${C.grey}"/>`));
  // Trottoir du fond, chaussée, trottoir de devant
  g.push(G(rect(0, 396, 800, 14, C.sand2), rect(0, 408, 800, 4, C.grey), rect(0, 410, 800, 174, "#4A4A4A"), rect(0, 410, 800, 174, C.grey, ' opacity=".35"'),
    `<path d="M20 494H120M200 494H300M480 494H520" stroke="${C.white}" stroke-width="5" opacity=".7"/>`, rect(0, 580, 800, 4, C.grey), rect(0, 584, 800, 16, C.sand2)));
  // Passage piéton qui traverse la chaussée
  let zebra = "";
  for (let i = 0; i < 9; i++) {
    const y0 = 416 + i * 19.4, y1 = y0 + 10, l0 = 600 - (y0 - 410) * 0.3, r0 = 720 + (y0 - 410) * 0.2, l1 = 600 - (y1 - 410) * 0.3, r1 = 720 + (y1 - 410) * 0.2;
    zebra += `M${f(l0)} ${f(y0)}H${f(r0)}L${f(r1)} ${f(y1)}H${f(l1)}Z`;
  }
  g.push(G(`<path d="${zebra}" fill="${C.white}" opacity=".85"/>`));

  // Le minibus, au fond à droite, qui attend
  g.push(G(shadow(650, 446, 160), `<path d="M500 440V320Q500 296 530 294H800V440Z" fill="${C.white}"/>`, rect(500, 396, 300, 16, C.green), rect(500, 412, 300, 6, C.green, ' opacity=".5"'),
    `<path d="M508 360V318Q510 304 528 304H546V360Z" fill="${C.blue}" opacity=".7"/>`, [556, 618, 680, 742].map((x) => rect(x, 306, 52, 40, C.blue, ' opacity=".55" rx="3"')).join(""),
    rect(500, 376, 10, 12, C.yellow, ' rx="2"'), [550, 740].map((x) => `<circle cx="${x}" cy="432" r="20" fill="${C.dark}"/><circle cx="${x}" cy="432" r="8" fill="${C.steel}"/>`).join("")));

  // Le taxi jaune, arrêté par la policière
  const taxi = [];
  taxi.push(shadow(190, 478, 150), `<path d="M44 464L46 432Q50 422 70 420L120 418L152 386Q158 380 172 380H244Q256 380 266 392L290 418L322 422Q336 424 336 438V464Z" fill="${C.yellow}"/>`);
  taxi.push(`<path d="M158 390L134 416H198V390Z" fill="${C.blue}" opacity=".65"/><path d="M206 390V416H276L258 394Q254 390 248 390Z" fill="${C.blue}" opacity=".65"/>`);
  taxi.push(`<ellipse cx="236" cy="402" rx="10" ry="11" fill="${SKIN.s3}"/><path d="M226 400Q226 389 236 389Q246 389 246 400Q240 394 226 400Z" fill="${C.dark}"/><ellipse cx="242" cy="402" rx="1.6" ry="2" fill="#0E0907"/>`);
  taxi.push(rect(46, 442, 290, 6, C.dark, ' opacity=".7"'), rect(330, 428, 8, 10, C.white, ' rx="2"'), rect(44, 428, 6, 10, C.red, ' rx="2"'), stroke("M200 420V460", C.dark, 1.6, ' opacity=".4"'));
  taxi.push([100, 282].map((x) => `<circle cx="${x}" cy="462" r="20" fill="${C.dark}"/><circle cx="${x}" cy="462" r="8" fill="${C.steel}"/>`).join(""));
  g.push(G(...taxi));

  // La moto-taxi du fond, qui attend sur le passage, tournée vers la gauche
  const m2 = { x: 528, y: 468, s: 0.42 };
  g.push(G(use("carrefour-moto", m2.x, m2.y, m2.s, true, ` color="${C.blue}"`),
    at(m2.x, m2.y, m2.s, true, person({ x: -8, y: -58, s: 1, skin: SKIN.s3, hair: { type: "short" }, hat: { type: "cap", color: C.red }, top: C.ocre, sleeve: "short", bottom: C.dark, legs: "sit", face: "smile",
      arms: { l: [[42, -176], [98, -162]], r: [[64, -170], [104, -158]] } }) + hand(90, -220, SKIN.s3) + hand(96, -216, SKIN.s3))));

  // La moto-taxi de devant : le conducteur et sa passagère attendent le signal
  const m1 = { x: 196, y: 566, s: 0.6 };
  g.push(G(use("carrefour-moto", m1.x, m1.y, m1.s, false, ` color="${C.red}"`),
    at(m1.x, m1.y, m1.s, false, person({ x: -118, y: -62, s: 0.96, skin: SKIN.s4, hair: { type: "gele", color: C.terra, wax: "wax1" }, top: C.indigo, wax: "wax2", robe: "kaba", legs: "sit", face: "smile",
      arms: { l: [[-48, -150], [-44, -108]], r: [[44, -152], [50, -114]] } }) +
      person({ x: -8, y: -58, s: 1, skin: SKIN.s1, hair: { type: "short" }, hat: { type: "cap", color: C.green }, top: C.yellow, bottom: C.indigo, legs: "sit", face: "calm",
        arms: { l: [[42, -176], [98, -162]], r: [[64, -170], [104, -158]] } }) + rect(-36, -208, 56, 8, C.steel, ' opacity=".9"') + hand(90, -220, SKIN.s1) + hand(96, -216, SKIN.s1))));

  // Le vendeur d'eau en sachets, la bassine sur la tête, qui lève un sachet
  const V = { x: 318, y: 592, s: 0.74 }, vsk = SKIN.s2;
  const pile = [[-30, -306, -8], [-12, -308, 6], [6, -306, -4], [24, -306, 10], [-20, -318, 4], [0, -320, -6], [18, -318, 8], [-8, -330, 0], [10, -330, -10]].map(([x, y, r]) => sachet(x, y, r)).join("");
  g.push(G(shadow(318, 592, 40), person({ ...V, skin: vsk, hair: { type: "short" }, top: C.green, dashiki: C.ocre, sleeve: "short", bottom: C.sand2, bwax: "wax3", face: "talk",
    arms: { l: [[-58, -180], [-78, -222]], r: [[52, -230], [40, -288]] } }),
    at(V.x, V.y, V.s, false, `<path d="M-42 -300L-28 -264H28L42 -300Z" fill="${C.blue}"/>` + pile + `<ellipse cx="0" cy="-300" rx="44" ry="6" fill="none" stroke="${C.blue}" stroke-width="4"/>` + hand(40, -288, vsk) + sachet(-80, -236, -12) + hand(-78, -224, vsk))));

  // Le podium rayé et la policière de la circulation : gants blancs, sifflet, gilet
  const P = { x: 420, y: 524, s: 0.96 }, psk = SKIN.s3;
  g.push(G(`<path d="M378 524V552Q420 564 462 552V524Z" fill="${C.white}"/><path d="M378 532Q420 542 462 532V542Q420 552 378 542Z" fill="${C.red}"/><ellipse cx="420" cy="524" rx="42" ry="9" fill="${C.red}"/><ellipse cx="420" cy="523" rx="36" ry="6" fill="${C.white}"/>`,
    person({ ...P, skin: psk, hair: { type: "nattes" }, top: C.blue, bottom: C.dark, legs: "skirt", face: "calm",
      arms: { l: [[-66, -198], [-108, -212]], r: [[54, -236], [62, -290]] } }),
    at(P.x, P.y, P.s, false,
      `<path d="M-28 -186Q-28 -204 -14 -204L-6 -168H6L14 -204Q28 -204 28 -186L26 -112Q0 -106 -26 -112Z" fill="${C.yellow}"/>` + rect(-27, -150, 54, 6, C.steel) + rect(-26, -130, 52, 6, C.steel) +
      `<circle cx="-22" cy="-246" r="9" fill="${HAIR}"/><path d="M-24 -250Q-26 -272 0 -274Q26 -272 24 -250Z" fill="${C.white}"/><rect x="-24" y="-256" width="48" height="8" fill="${C.dark}"/><path d="M-22 -248Q0 -240 24 -248L28 -244Q0 -234 -26 -244Z" fill="${C.dark}"/><circle cx="0" cy="-260" r="4" fill="${C.yellow}"/>` +
      `<rect x="-2" y="-226" width="12" height="6" rx="3" fill="${C.steel}"/>` + stroke("M8 -222Q22 -210 18 -196", C.red, 1.4) +
      `<path d="M-116 -218Q-118 -232 -112 -234Q-110 -224 -106 -224Q-106 -236 -100 -234Q-98 -222 -100 -206Q-108 -202 -114 -208Z" fill="${C.white}"/>` +
      `<path d="M56 -284Q54 -300 60 -302Q62 -292 64 -292Q66 -304 72 -300Q72 -288 70 -278Q62 -274 56 -280Z" fill="${C.white}"/>`)));

  // La passante au parapluie, qui traverse
  const U = { x: 614, y: 572, s: 0.82 }, usk = SKIN.s5;
  g.push(G(shadow(614, 572, 40), person({ ...U, skin: usk, hair: { type: "bantu" }, robe: "dress", top: C.ocre, wax: "wax1", legs: "walkskirt", face: "smile",
    arms: { l: [[-44, -150], [-40, -112]], r: [[46, -206], [30, -246]] } }),
    at(U.x, U.y, U.s, false, stroke("M30 -246L30 -360", C.dark, 4) + `<path d="M-60 -330Q-50 -392 30 -396Q110 -392 120 -330Q100 -342 80 -330Q60 -342 30 -330Q0 -342 -20 -330Q-40 -342 -60 -330Z" fill="${C.terra}"/>` +
      `<path d="M30 -396Q0 -370 -20 -330Q0 -342 30 -330Q60 -342 80 -330Q60 -370 30 -396Z" fill="${C.ocre}"/>` + `<circle cx="30" cy="-398" r="4" fill="${C.dark}"/>` + hand(30, -246, usk) +
      `<path d="M-52 -112H-28L-24 -76H-56Z" fill="${C.wood2}"/>` + stroke("M-48 -112Q-40 -126 -32 -112", C.wood2, 3) + hand(-40, -112, usk))));

  // Le passant au sac, qui traverse en parlant au téléphone
  const S = { x: 714, y: 554, s: 0.8, flip: true }, ssk = SKIN.s2;
  g.push(G(shadow(714, 554, 36), person({ ...S, skin: ssk, hair: { type: "locks" }, top: C.indigo, wax: "kitenge", bottom: C.sand2, legs: "walk", face: "talk", hat: { type: "kufi", color: C.green, wax: "kente" },
    arms: { r: [[44, -150], [40, -112]], l: [[-44, -190], [-20, -232]] }, phone: { rot: 10, screen: C.sky } }),
    at(S.x, S.y, S.s, true, `<path d="M28 -118H58L62 -72H24Z" fill="${C.sand}"/>` + stroke("M24 -100H62M26 -86H60", C.wood, 2.5) + stroke("M32 -118Q43 -134 54 -118", C.wood2, 3) + hand(40, -112, ssk))));

  return frame(g.join(""), C.cream);
}


export default [
  { id: "forage", fr: "Le forage du village", en: "The village borehole", tags: ["forage", "borehole", "pompe", "hand pump", "eau", "water", "bidons", "jerrycans", "bassine", "basin", "village", "femmes", "women", "enfants", "children", "brouette", "wheelbarrow", "manguier", "mango tree", "cases", "huts", "terre rouge", "red earth"], draw: forage },
  { id: "transhumance", fr: "La transhumance", en: "Seasonal cattle drive", tags: ["transhumance", "cattle drive", "berger", "herder", "Mbororo", "Peuls", "Fulani", "zébus", "zebu", "troupeau", "herd", "Adamaoua", "Nord-Cameroun", "savane", "savanna", "chapeau conique", "conical hat", "calebasse", "calabash", "lait", "milk", "acacia", "pique-bœufs", "egrets"], draw: transhumance },
  { id: "carrefour", fr: "Le carrefour aux heures de pointe", en: "Rush hour at the crossroads", tags: ["carrefour", "crossroads", "circulation", "traffic", "policière", "policewoman", "sifflet", "whistle", "moto-taxi", "bendskin", "taxi", "bus", "minibus", "piétons", "pedestrians", "parapluie", "umbrella", "eau en sachet", "water sachets", "vendeur", "vendor", "Douala", "Yaoundé", "ville", "city"], draw: carrefour },
];
