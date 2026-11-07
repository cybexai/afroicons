// Scènes : la chorale du dimanche, la rupture du jeûne (Ramadan), le pique-nique aux chutes.
// Chaque objet (bâtiment, arbre, instrument, personnage et ce qu'il tient) est regroupé dans son propre <g>.
import { C, SKIN, person, frame, cloud, palm, stroke, f } from "./lib.mjs";

/** Un objet = un groupe. */
const G = (...p) => `<g>${p.join("")}</g>`;
/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${r}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");
const note = (x, y, col, s = 1, r = -10) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})" fill="${col}"><ellipse cx="0" cy="0" rx="6" ry="4.5" transform="rotate(-20)"/><rect x="4" y="-22" width="2.6" height="22"/><path d="M6.6 -22Q14 -18 13 -10Q10 -15 6.6 -15Z"/></g>`;

/**
 * Assis en tailleur, par terre (natte, pagne) : person(legs:"none") + les jambes croisées sous la robe.
 * ground = niveau du sol dans la scène ; lap = couleur (et motif) du tissu sur les genoux.
 */
const tailleur = (o, ground, lap, lapPat = null, pre = "", post = "") => {
  const s = o.s ?? 1, y = ground + 92 * s;
  const legs = cloth("M-32 -118Q-64 -114 -70 -100Q-70 -86 -44 -88H44Q70 -86 70 -100Q64 -114 32 -118Z", lap, lapPat) +
    stroke("M-58 -96Q-20 -90 0 -102Q20 -90 58 -96", "rgba(0,0,0,.18)", 3) + `<ellipse cx="-30" cy="-90" rx="13" ry="5" fill="${o.shoes ?? C.dark}"/><ellipse cx="30" cy="-90" rx="13" ry="5" fill="${o.shoes ?? C.dark}"/>`;
  return G(at(o.x, y, s, o.flip, legs + pre), person({ ...o, y, legs: "none" }), at(o.x, y, s, o.flip, post));
};
/** Voile drapé sur la tête et les épaules (dessiné derrière le personnage). */
const voile = (col, pat) => cloth("M-30 -246Q-34 -294 0 -296Q34 -294 30 -246L50 -176Q0 -166 -50 -176Z", col, pat);

/* ---------- Scène 1 : la chorale du dimanche ---------- */
function chorale() {
  const g = [];
  // Ciel du matin, nuages
  g.push(G(rect(0, 0, 800, 450, C.white), rect(0, 0, 800, 450, C.blue, ' opacity=".2"'), `<circle cx="690" cy="80" r="30" fill="${C.yellow}" opacity=".7"/>`));
  g.push(cloud(90, 70, 0.7), cloud(560, 56, 0.55));

  // Le manguier, à gauche
  g.push(G(stroke("M96 460Q90 360 100 300", C.wood2, 16), stroke("M98 360L60 320M100 330L140 300", C.wood2, 7),
    [[40, 280, 46], [96, 250, 56], [150, 282, 44], [70, 316, 36], [128, 318, 36]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.leaf2}"/>`).join(""),
    [[60, 262, 30], [110, 232, 32], [150, 270, 22]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.leaf}"/>`).join(""),
    [[70, 300], [120, 290], [146, 306]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="7" fill="${C.ocre}"/>`).join("")));
  // Le palmier, à droite
  g.push(palm(724, 450, 1.05, 12));

  // L'église de quartier : façade crépie, fronton, simple croix, porte en arc, vitraux
  g.push(G(rect(230, 184, 360, 266, C.cream), rect(230, 410, 360, 40, C.sand2, ' opacity=".7"'),
    `<path d="M212 190L410 100L608 190Z" fill="${C.sand}"/>`, rect(206, 184, 408, 10, C.sand2),
    `<circle cx="410" cy="154" r="20" fill="${C.sky}"/><circle cx="410" cy="154" r="20" fill="none" stroke="${C.sand2}" stroke-width="5"/>`,
    rect(405, 52, 10, 50, C.wood2), rect(392, 64, 36, 9, C.wood2),
    `<path d="M366 450V346Q410 300 454 346V450Z" fill="${C.wood2}"/>`, stroke("M410 330V450", C.dark, 2, ' opacity=".35"'),
    [256, 528].map((x) => `<path d="M${x} 340V270Q${x + 18} 244 ${x + 36} 270V340Z" fill="${C.blue}"/><path d="M${x} 300H${x + 36}M${x + 18} 258V340" stroke="${C.cream}" stroke-width="3"/><rect x="${x}" y="300" width="18" height="40" fill="${C.yellow}" opacity=".55"/>`).join("")));
  // Le parvis : trois marches
  g.push(G(rect(300, 446, 220, 10, C.sand2), rect(288, 456, 244, 10, C.sand), rect(276, 466, 268, 10, C.sand2)));
  // Le sol du quartier
  g.push(G(rect(0, 450, 800, 150, C.sand), rect(0, 476, 800, 124, C.terra, ' opacity=".16"'), rect(276, 466, 268, 10, C.sand2)));

  // La chorale, sur le parvis : même pagne pour tous, on chante à pleine voix
  const uni = { top: C.indigo, wax: "wax1" }, clasp = { l: [[-36, -160], [-8, -150]], r: [[36, -160], [8, -150]] };
  const book = (sk) => (hx, hy) => `<path d="M${hx - 20} ${hy - 22}L${hx} ${hy - 16}L${hx + 20} ${hy - 22}L${hx + 20} ${hy + 4}L${hx} ${hy + 10}L${hx - 20} ${hy + 4}Z" fill="${C.terra}"/><path d="M${hx - 17} ${hy - 19}L${hx} ${hy - 13}L${hx + 17} ${hy - 19}L${hx + 17} ${hy + 1}L${hx} ${hy + 7}L${hx - 17} ${hy + 1}Z" fill="${C.white}"/>` + hand(hx - 14, hy - 2, sk) + hand(hx + 14, hy - 2, sk);
  const choir = [
    { x: 332, skin: SKIN.s2, hair: { type: "foulard", color: C.indigo, wax: "wax1" }, robe: "kaba", face: "talk", arms: clasp },
    { x: 396, skin: SKIN.s4, hair: { type: "short" }, beard: true, bottom: C.dark, sleeve: "long", face: "laugh", arms: { l: [[-40, -160], [-14, -150]], r: [[40, -160], [14, -150]] }, rhand: book(SKIN.s4) },
    { x: 458, skin: SKIN.s1, hair: { type: "gele", color: C.indigo, wax: "wax1" }, robe: "kaba", face: "laugh", arms: { l: [[-40, -150], [-36, -112]], r: [[48, -206], [56, -244]] } },
    { x: 522, skin: SKIN.s3, hair: { type: "foulard", color: C.indigo, wax: "wax1" }, robe: "kaba", face: "talk", arms: clasp },
  ];
  for (const c of choir) g.push(G(person({ y: 452, s: 0.74, ...uni, ...c })));

  // Les notes qui s'envolent
  g.push(G(note(372, 236, C.terra, 0.9), note(440, 214, C.ocre, 1, 12), note(506, 230, C.terra, 0.8, -6), note(560, 262, C.ocre, 0.7, 8)));

  // Les fidèles, à gauche, qui battent des mains
  const clap = { l: [[-36, -170], [-6, -196]], r: [[36, -170], [6, -196]] };
  g.push(G(person({ x: 104, y: 500, s: 0.7, skin: SKIN.s5, hair: { type: "gele", color: C.ocre, wax: "kente" }, robe: "boubou", top: C.ocre, wax: "wax3", face: "laugh", arms: clap })));
  g.push(G(person({ x: 166, y: 510, s: 0.66, skin: SKIN.s3, hair: { type: "short" }, top: C.green, dashiki: C.ocre, bottom: C.dark, face: "laugh", arms: clap })));

  // Le chef de chœur, au premier plan, les deux bras levés
  g.push(G(`<ellipse cx="252" cy="568" rx="46" ry="6" fill="${C.wood2}" opacity=".22"/>`,
    person({ x: 252, y: 566, s: 0.96, skin: SKIN.s2, hair: { type: "short" }, robe: "boubou", top: C.white, face: "talk", shoes: C.wood2,
      arms: { l: [[-52, -218], [-50, -262]], r: [[52, -218], [50, -262]] } })));

  // Le joueur de tam-tam, assis sur un tabouret, le tambour entre les genoux
  const T = { x: 628, y: 572, s: 0.9 }, tsk = SKIN.s1;
  const stool = `<path d="M-30 -100H30L24 -88H-24Z" fill="${C.wood}"/>` + rect(-20, -88, 8, 88, C.wood2) + rect(12, -88, 8, 88, C.wood2) + rect(-22, -40, 44, 6, C.wood2);
  const drum = `<path d="M54 -126H114L106 -36L100 0H68L62 -36Z" fill="${C.wood2}"/>` + rect(58, -84, 52, 16, C.terra) + rect(58, -84, 52, 16, "url(#kente)", ' opacity=".7"') +
    `<path d="M58 -120L68 -84L78 -120L88 -84L98 -120L108 -84" fill="none" stroke="${C.sand}" stroke-width="2"/>` + `<ellipse cx="84" cy="-126" rx="31" ry="8" fill="${C.sand}"/><ellipse cx="84" cy="-126" rx="31" ry="8" fill="none" stroke="${C.wood}" stroke-width="3"/>`;
  g.push(G(`<ellipse cx="580" cy="574" rx="80" ry="7" fill="${C.wood2}" opacity=".22"/>`, at(T.x, T.y, T.s, true, stool),
    person({ ...T, flip: true, legs: "sit", skin: tsk, hair: { type: "locks" }, top: C.terra, wax: "wax2", sleeve: "short", bottom: C.dark, face: "laugh",
      arms: { l: [[24, -150], [70, -130]], r: [[62, -166], [100, -132]] } }),
    at(T.x, T.y, T.s, true, drum + hand(70, -130, tsk) + hand(100, -132, tsk))));

  // Le balafon et son joueur, debout derrière
  const B = { x: 706, y: 552, s: 0.84 }, bsk = SKIN.s4;
  const keys = [];
  for (let i = 0; i < 8; i++) {
    const x = 662 + i * 11.4, h = 16 - i * 0.9;
    keys.push(`<ellipse cx="${f(x + 5)}" cy="${f(486 + h / 2 + 12)}" rx="5.5" ry="${f(6 + (7 - i) * 0.6)}" fill="${i % 2 ? C.ocre : C.wood}"/>`);
    keys.push(rect(x, 478 - h / 2, 10, h, C.wood2, ' rx="2"'));
  }
  const malletL = stroke("M-34 -112L-50 -96", C.wood2, 3) + `<circle cx="-51" cy="-95" r="4.5" fill="${C.dark}"/>`, malletR = stroke("M34 -112L18 -96", C.wood2, 3) + `<circle cx="17" cy="-95" r="4.5" fill="${C.dark}"/>`;
  g.push(G(person({ ...B, skin: bsk, hair: { type: "nattes" }, top: C.green, wax: "kitenge", sleeve: "short", bottom: C.dark, face: "smile",
    arms: { l: [[-46, -150], [-34, -112]], r: [[40, -150], [34, -112]] } }),
    stroke("M658 478L654 552M752 478L756 552", C.wood2, 5), stroke("M656 520H754", C.wood2, 3), rect(654, 474, 104, 6, C.wood, ' rx="3"'), ...keys,
    at(B.x, B.y, B.s, false, malletL + malletR + hand(-34, -112, bsk) + hand(34, -112, bsk))));

  return frame(g.join(""), C.cream);
}

/* ---------- Scène 2 : la rupture du jeûne ---------- */
function ftour() {
  const g = [];
  g.push(`<defs><pattern id="ftour-natte" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M0 5H20M0 15H20" stroke="${C.wood}" stroke-width="2" opacity=".35"/><path d="M5 0V10M15 10V20" stroke="${C.wood}" stroke-width="2" opacity=".3"/></pattern></defs>`);
  // Ciel du couchant : jaune au ras de l'horizon, rose puis orangé vers le haut
  g.push(G(rect(0, 0, 800, 440, C.yellow), rect(0, 0, 800, 300, C.rose, ' opacity=".55"'), rect(0, 0, 800, 150, C.red, ' opacity=".35"'), rect(0, 250, 800, 120, C.white, ' opacity=".25"'),
    `<circle cx="540" cy="318" r="56" fill="${C.white}" opacity=".35"/><circle cx="540" cy="318" r="38" fill="${C.yellow}"/>`,
    [[120, 60], [260, 34], [700, 50]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="${C.white}" opacity=".8"/>`).join(""),
    stroke("M40 120H180M90 132H230M560 100H720M600 112H760", C.white, 6, ' opacity=".35"'), `<path d="M150 90A16 16 0 1 0 166 112A12 12 0 1 1 150 90Z" fill="${C.white}" opacity=".85"/>`));
  // La ville au loin, et le minaret
  g.push(G(`<path d="M0 360V312H60V296H120V320H200V306H260V330H330V300H390V324H470V340H800V360Z" fill="${C.wood}" opacity=".45"/>`));
  g.push(G(`<path d="M640 340V196H664V340Z" fill="${C.wood2}" opacity=".55"/>`, rect(634, 230, 36, 7, C.wood2, ' opacity=".55"'), `<path d="M642 196Q652 170 662 196Z" fill="${C.wood2}" opacity=".55"/>`, rect(651, 160, 2, 14, C.wood2, ' opacity=".55"'),
    rect(646, 250, 4, 10, C.yellow, ' opacity=".8"'), rect(654, 250, 4, 10, C.yellow, ' opacity=".8"')));

  // Le mur de la cour en banco, crénelé
  const cren = [...Array(20)].map((_, i) => `M${i * 42} 344L${i * 42 + 14} 328L${i * 42 + 28} 344`).join("");
  g.push(G(rect(0, 344, 800, 100, C.wood), rect(0, 344, 800, 100, C.terra, ' opacity=".3"'), `<path d="${cren}Z" fill="${C.wood}"/>`, rect(0, 344, 800, 6, C.wood2, ' opacity=".3"')));
  // La maison, à gauche : toit plat, bois du toit qui dépassent, porte et fenêtre
  g.push(G(rect(30, 232, 230, 212, C.sand2), rect(30, 232, 230, 212, C.terra, ' opacity=".18"'), rect(24, 226, 242, 12, C.wood),
    [50, 90, 130, 170, 210, 246].map((x) => rect(x, 234, 6, 14, C.wood2)).join(""),
    `<path d="M70 444V330Q100 306 130 330V444Z" fill="${C.green}"/>`, stroke("M100 320V444", C.dark, 2, ' opacity=".3"'),
    rect(172, 300, 52, 44, "#2A1E17"), `<path d="M172 300H224V344H172Z" fill="none" stroke="${C.ocre}" stroke-width="4"/>`, rect(178, 306, 40, 32, C.yellow, ' opacity=".55"')));
  // Le neem, derrière le mur à droite
  g.push(G(stroke("M748 444Q744 330 752 270", C.wood2, 14), stroke("M750 320L716 290", C.wood2, 6),
    [[714, 262, 34], [754, 236, 42], [790, 270, 30], [732, 292, 26]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.leaf2}"/>`).join(""),
    [[740, 228, 22], [700, 258, 16]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.leaf}"/>`).join("")));
  // Le sol de la cour, la natte
  g.push(G(rect(0, 440, 800, 160, C.sand), rect(0, 440, 800, 160, C.ocre, ' opacity=".15"')));
  const mat = "M118 470H682L742 582H58Z";
  g.push(G(`<path d="${mat}" fill="${C.sand2}"/>`, `<path d="${mat}" fill="url(#ftour-natte)"/>`, `<path d="M108 488H692L700 502H100ZM80 540H720L728 554H72Z" fill="${C.terra}" opacity=".75"/>`, `<path d="M96 512H704L710 524H90Z" fill="${C.green}" opacity=".7"/>`));

  // La grand-mère, au centre, qui boit sa bouillie dans une calebasse
  const gsk = SKIN.s3;
  const calebasse = (hx, hy) => `<path d="M${hx - 26} ${hy - 12}Q${hx} ${hy + 24} ${hx + 26} ${hy - 12}Z" fill="${C.ocre}"/><ellipse cx="${hx}" cy="${hy - 12}" rx="26" ry="6" fill="${C.cream}"/>` + stroke(`M${hx - 20} ${hy - 4}Q${hx} ${hy + 6} ${hx + 20} ${hy - 4}`, C.wood, 2, ' opacity=".6"') + hand(hx - 22, hy - 6, gsk) + hand(hx + 22, hy - 6, gsk);
  g.push(tailleur({ x: 400, s: 0.92, skin: gsk, hair: { type: "foulard", color: C.indigo, wax: "wax3" }, robe: "boubou", top: C.indigo, wax: "wax3", face: "calm",
    arms: { l: [[-40, -150], [-22, -148]], r: [[40, -150], [22, -148]] } }, 476, C.indigo, "wax3", voile(C.indigo, "wax3"), calebasse(0, -142)));

  // Le père, en boubou blanc et kufi, un verre de thé à la main
  const psk = SKIN.s2;
  const verre = `<path d="M30 -204H46L44 -180H32Z" fill="${C.white}" opacity=".7"/><path d="M31 -196H45L44 -180H32Z" fill="${C.wood}"/>` + hand(38, -184, psk);
  g.push(tailleur({ x: 232, s: 0.9, skin: psk, hair: { type: "short" }, beard: true, hat: { type: "kufi", color: C.terra, wax: "wax2" }, robe: "boubou", top: C.white, face: "talk",
    arms: { l: [[-44, -150], [-50, -110]], r: [[52, -160], [38, -184]] } }, 476, C.white, null, "", verre));

  // La maman, voilée, qui prend le plateau de beignets que lui tend son fils
  const msk = SKIN.s4;
  g.push(tailleur({ x: 566, s: 0.9, skin: msk, hair: { type: "foulard", color: C.green, wax: "wax1" }, robe: "boubou", top: C.green, wax: "wax1", face: "laugh",
    arms: { l: [[-44, -150], [-50, -110]], r: [[58, -170], [86, -150]] } }, 476, C.green, "wax1", voile(C.green, "wax1"), hand(86, -150, msk)));

  // Ce qui est posé sur la natte : dattes, bissap, beignets, bouillie, thé
  const plate = (x, y, rx) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * 0.32}" fill="${C.white}"/><ellipse cx="${x}" cy="${y - 1}" rx="${rx * 0.75}" ry="${rx * 0.22}" fill="${C.cream}"/>`;
  g.push(G(plate(316, 536, 34), [[302, 530], [314, 534], [326, 530], [308, 538], [322, 539], [316, 526], [332, 536]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="3.6" fill="${C.wood2}"/><ellipse cx="${x - 2}" cy="${y - 1}" rx="2" ry="1" fill="${C.wood}"/>`).join("")));
  // Le pot de bouillie et la louche
  g.push(G(`<path d="M380 532Q380 568 410 568Q440 568 440 532Z" fill="${C.wood}"/>`, `<ellipse cx="410" cy="532" rx="30" ry="8" fill="${C.cream}"/>`, stroke("M410 530L446 500", C.wood2, 4), `<ellipse cx="446" cy="499" rx="6" ry="3" fill="${C.wood2}"/>`));
  // La bassine de beignets
  g.push(G(`<path d="M466 528L474 560H534L542 528Z" fill="${C.white}"/>`, `<ellipse cx="504" cy="528" rx="38" ry="8" fill="${C.red}"/>`, [[488, 524], [502, 520], [516, 524], [494, 516], [510, 514], [524, 518]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="${C.ocre}"/><circle cx="${x - 2}" cy="${y - 2}" r="2.4" fill="${C.yellow}"/>`).join("")));
  // La théière et les petits verres
  g.push(G(`<g transform="translate(-14 0)"><path d="M606 556Q600 532 620 528H640Q660 532 654 556Z" fill="${C.steel}"/>`, `<path d="M618 528Q630 514 642 528Z" fill="${C.grey}"/>`, `<circle cx="630" cy="514" r="3" fill="${C.grey}"/>`, stroke("M654 544L672 530", C.steel, 4), stroke("M606 538Q594 540 600 552", C.grey, 3), "</g>",
    [[566, 562], [582, 566], [646, 566]].map(([x, y]) => `<path d="M${x - 6} ${y - 14}H${x + 6}L${x + 5} ${y}H${x - 5}Z" fill="${C.white}" opacity=".7"/><path d="M${x - 5.5} ${y - 9}H${x + 5.5}L${x + 5} ${y}H${x - 5}Z" fill="${C.wood}"/>`).join("")));
  // Le pichet de bissap
  g.push(G(`<path d="M150 512H184L188 560Q167 566 146 560Z" fill="${C.white}" opacity=".7"/>`, `<path d="M149 524H185L188 560Q167 566 146 560Z" fill="${C.red}"/>`, stroke("M184 520Q200 530 186 548", C.white, 4, ' opacity=".8"'),
    [[204, 566], [126, 568]].map(([x, y]) => `<path d="M${x - 8} ${y - 18}H${x + 8}L${x + 6} ${y}H${x - 6}Z" fill="${C.red}"/>`).join("")));

  // La fille, qui apporte le plateau de verres de bissap
  const F = { x: 118, y: 570, s: 0.62 }, fsk = SKIN.s5;
  const tray = rect(10, -148, 96, 8, C.steel, ' rx="3"') + [24, 44, 64, 84].map((x) => `<path d="M${x - 7} ${-168}H${x + 7}L${x + 6} ${-148}H${x - 6}Z" fill="${C.red}"/>`).join("");
  g.push(G(person({ ...F, skin: fsk, hair: { type: "foulard", color: C.terra, wax: "wax2" }, robe: "dress", top: C.terra, wax: "wax2", face: "smile",
    arms: { l: [[-6, -150], [20, -144]], r: [[56, -160], [88, -144]] } }), at(F.x, F.y, F.s, false, tray + hand(20, -144, fsk) + hand(88, -144, fsk))));

  // Le fils, en petit boubou, qui tend les beignets à sa maman
  const S = { x: 690, y: 572, s: 0.62 }, ssk = SKIN.s2;
  const dish = `<ellipse cx="-104" cy="-226" rx="34" ry="9" fill="${C.white}"/>` + [[-118, -232], [-104, -236], [-90, -232], [-110, -240], [-96, -242]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="${C.ocre}"/>`).join("");
  g.push(G(person({ ...S, skin: ssk, hair: { type: "short" }, hat: { type: "kufi", color: C.white }, robe: "boubou", top: C.blue, face: "laugh",
    arms: { l: [[-48, -196], [-82, -224]], r: [[40, -150], [38, -110]] } }), at(S.x, S.y, S.s, false, dish + hand(-82, -224, ssk))));

  return frame(g.join(""), C.sand);
}

/* ---------- Scène 3 : pique-nique aux chutes ---------- */
function cascade() {
  const g = [];
  g.push(`<defs><g id="cascade-arbre"><circle cx="0" cy="0" r="34" fill="${C.leaf2}"/><circle cx="-26" cy="16" r="26" fill="${C.leaf2}"/><circle cx="26" cy="14" r="28" fill="${C.leaf2}"/><circle cx="-8" cy="-12" r="18" fill="${C.leaf}"/></g>
  <g id="cascade-feuille"><path d="M0 0Q-30 -40 -10 -90Q10 -40 0 0Z" fill="${C.leaf}"/><path d="M0 0Q30 -30 40 -80Q4 -50 0 0Z" fill="${C.leaf2}"/></g></defs>`);
  // Ciel, au-dessus de la forêt
  g.push(G(rect(0, 0, 800, 260, C.white), rect(0, 0, 800, 260, C.blue, ' opacity=".25"')));
  // La forêt, au fond
  g.push(G(...[[30, 120, 1.1], [120, 90, 1.2], [420, 110, 1], [520, 90, 1.25], [640, 120, 1.1], [760, 96, 1.2], [700, 190, 1], [580, 200, 0.9], [470, 200, 1]].map(([x, y, s]) => `<use href="#cascade-arbre" transform="translate(${x} ${y}) scale(${s})"/>`),
    rect(0, 200, 800, 260, C.leaf2), `<path d="M0 200Q200 170 400 196Q600 166 800 190V230H0Z" fill="${C.leaf2}"/>`, `<path d="M380 250Q520 220 800 250V460H380Z" fill="${C.leaf}" opacity=".45"/>`));
  // La falaise et la chute d'eau
  g.push(G(`<path d="M20 130Q60 100 120 108Q180 84 250 104Q300 96 330 128L360 400H0V150Z" fill="${C.grey}"/>`, `<path d="M20 130Q60 100 120 108Q180 84 250 104Q300 96 330 128L360 400H0V150Z" fill="${C.wood2}" opacity=".35"/>`,
    stroke("M40 200L70 240M300 190L320 250M60 300L90 330M300 300L330 330", C.dark, 3, ' opacity=".2"'),
    `<use href="#cascade-arbre" transform="translate(60 110) scale(.8)"/>`, `<use href="#cascade-arbre" transform="translate(300 112) scale(.75)"/>`,
    `<path d="M128 108Q180 96 236 106L258 380H106Z" fill="${C.white}"/>`, `<path d="M128 108Q180 96 236 106L258 380H106Z" fill="${C.sky}" opacity=".5"/>`,
    stroke("M142 120L128 370M162 112L156 376M184 108L184 378M206 110L214 376M226 112L240 372", C.blue, 3, ' opacity=".35"'),
    stroke("M150 140L144 200M196 150L198 230M218 260L222 320", C.white, 4)));
  // Le bassin, la brume, le ruisseau qui descend à gauche
  const W = (d, op = ".45") => `<path d="${d}" fill="${C.sky}"/><path d="${d}" fill="${C.blue}" opacity="${op}"/>`;
  g.push(G(W("M0 360Q180 340 370 372Q404 404 390 440Q300 482 200 480Q230 500 215 520Q245 560 205 600H0Z"),
    [[110, 372, 26], [150, 380, 30], [196, 374, 32], [240, 380, 28], [272, 372, 20]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.white}" opacity=".85"/>`).join(""),
    stroke("M60 410H130M220 420H300M40 470H110M60 530H140M30 580H110", C.white, 3, ' opacity=".7"')));
  // Rochers au bord de l'eau
  const rock = (x, y, w, h) => `<path d="M${x - w / 2} ${y}Q${x - w / 2} ${y - h} ${x - w / 6} ${y - h}Q${x + w / 3} ${y - h * 1.1} ${x + w / 2} ${y - h * 0.4}L${x + w / 2} ${y}Z" fill="${C.grey}"/><path d="M${x - w / 6} ${y - h}Q${x + w / 3} ${y - h * 1.1} ${x + w / 2} ${y - h * 0.4}L${x + w / 2} ${y}H${x + w / 6}Z" fill="${C.dark}" opacity=".15"/>`;
  g.push(G(rock(360, 420, 80, 50)), G(rock(40, 380, 70, 36)));

  // La rive : herbe, puis le sable du bord
  g.push(G(`<path d="M212 600Q250 540 226 482Q300 470 400 440Q430 430 450 430Q560 410 800 420V600Z" fill="${C.leaf}"/>`, `<path d="M250 600Q284 540 262 492Q330 462 420 470Q600 450 800 470V600Z" fill="${C.sand2}"/>`));
  g.push(G(`<use href="#cascade-feuille" transform="translate(770 470) scale(.9)"/>`, `<use href="#cascade-feuille" transform="translate(412 440) scale(.6)"/>`));

  // L'enfant, assis sur un rocher, les pieds dans l'eau
  const E = { x: 244, y: 540, s: 0.6 }, esk = SKIN.s4;
  g.push(G(rock(246, 548, 84, 66), person({ ...E, flip: true, legs: "sit", skin: esk, hair: { type: "puffs" }, top: C.ocre, sleeve: "short", bottom: C.terra, bwax: "wax1", face: "laugh",
    arms: { l: [[-40, -150], [-40, -108]], r: [[44, -150], [40, -108]] } }),
    W("M174 526Q200 518 222 526Q224 544 198 548Q174 546 174 526Z", ".6"), stroke("M170 530Q198 520 226 530", C.white, 2.5),
    stroke("M160 558Q190 564 220 554", C.white, 2, ' opacity=".7"')));

  // Les deux amies qui posent devant la chute, debout sur une dalle de rocher
  g.push(G(`<path d="M276 456Q272 436 300 432L408 428Q432 432 430 452Q350 466 276 456Z" fill="${C.grey}"/>`, `<path d="M276 456Q350 466 430 452L428 446Q350 458 278 448Z" fill="${C.dark}" opacity=".15"/>`));
  g.push(G(person({ x: 318, y: 448, s: 0.7, skin: SKIN.s1, hair: { type: "boxbraids", beads: C.ocre }, top: C.terra, wax: "wax1", sleeve: "short", bottom: C.indigo, face: "laugh",
    arms: { l: [[-40, -150], [-36, -110]], r: [[52, -214], [56, -258]] } }),
    at(318, 448, 0.7, false, stroke("M52 -262L46 -282M58 -262L64 -282", SKIN.s1, 5) + hand(56, -258, SKIN.s1))));
  g.push(G(person({ x: 384, y: 444, s: 0.72, skin: SKIN.s3, hair: { type: "bantu" }, robe: "dress", top: C.green, wax: "wax3", face: "laugh",
    arms: { l: [[-46, -150], [-28, -118]], r: [[46, -150], [28, -118]] } })));

  // Le pagne étendu, le pique-nique dessus
  const pg = "M410 506L668 496L700 576L384 588Z";
  g.push(G(cloth(pg, C.indigo, "wax2"), stroke("M412 512L666 502", C.ocre, 4), stroke("M388 580L696 568", C.ocre, 4)));
  // Les deux amis (ou la maman et la tante) assis en tailleur sur le pagne
  const msk = SKIN.s5;
  const plat = (hx, hy) => `<ellipse cx="${hx}" cy="${hy}" rx="26" ry="7" fill="${C.white}"/>` + [[-12, -4, C.yellow], [0, -6, C.ocre], [12, -4, C.yellow]].map(([dx, dy, c]) => `<ellipse cx="${hx + dx}" cy="${hy + dy}" rx="9" ry="4" fill="${c}"/>`).join("");
  g.push(tailleur({ x: 474, s: 0.8, skin: msk, hair: { type: "gele", color: C.ocre, wax: "kente" }, robe: "kaba", top: C.ocre, wax: "wax3", face: "smile",
    arms: { l: [[-40, -150], [-20, -132]], r: [[40, -150], [20, -132]] } }, 552, C.ocre, "wax3", "", plat(0, -130) + hand(-20, -132, msk) + hand(20, -132, msk)));
  const dsk = SKIN.s2;
  const bottle = `<path d="M44 -200H52V-188L56 -178V-148H40V-178L44 -188Z" fill="${C.leaf2}" opacity=".85"/>` + rect(40, -170, 16, 10, C.yellow) + hand(48, -158, dsk);
  g.push(tailleur({ x: 584, s: 0.8, skin: dsk, hair: { type: "nattes" }, top: C.indigo, wax: "ndop", sleeve: "short", face: "talk",
    arms: { l: [[-44, -150], [-50, -110]], r: [[56, -150], [48, -158]] } }, 548, "#1C2756", "ndop", "", bottle));
  // Ananas, plantains, la glacière
  g.push(G(`<ellipse cx="530" cy="568" rx="20" ry="7" fill="${C.white}"/>`, `<path d="M518 566Q530 540 542 566Z" fill="${C.yellow}"/>`, stroke("M524 558L536 550M522 564L540 556", C.ocre, 2), `<path d="M530 546L522 528L530 536L534 524L536 538L544 530Z" fill="${C.leaf2}"/>`));
  g.push(G(`<ellipse cx="652" cy="586" rx="42" ry="6" fill="${C.dark}" opacity=".2"/>`, rect(616, 534, 72, 50, C.blue, ' rx="6"'), rect(612, 524, 80, 16, C.white, ' rx="5"'), rect(640, 516, 24, 10, C.white, ' rx="4"'), rect(624, 554, 56, 4, C.white, ' opacity=".5"')));

  // Le papa photographe, debout, qui cadre les deux amies avec son téléphone
  const P = { x: 728, y: 566, s: 0.92 }, phk = SKIN.s3;
  const phone = `<g transform="rotate(-8 70 -232)"><rect x="56" y="-256" width="30" height="46" rx="5" fill="${C.dark}"/><circle cx="64" cy="-248" r="4" fill="${C.grey}"/><circle cx="64" cy="-248" r="1.8" fill="${C.sky}"/><circle cx="74" cy="-249" r="1.6" fill="${C.yellow}"/></g>`;
  g.push(G(`<ellipse cx="728" cy="568" rx="40" ry="5" fill="${C.dark}" opacity=".2"/>`, person({ ...P, flip: true, skin: phk, hair: { type: "short" }, hat: { type: "cap", color: C.terra }, top: C.white, dashiki: C.terra, sleeve: "short", bottom: C.sand2, bwax: "bogolan", face: "smile",
    arms: { l: [[30, -172], [58, -218]], r: [[60, -194], [80, -226]] } }), at(P.x, P.y, P.s, true, phone + hand(60, -220, phk) + hand(82, -228, phk))));

  return frame(g.join(""), C.sky);
}

export default [
  { id: "chorale", fr: "La chorale du dimanche", en: "Sunday choir", tags: ["chorale", "choir", "dimanche", "sunday", "église", "church", "chant", "singing", "musique", "music", "tam-tam", "drum", "balafon", "chef de chœur", "conductor", "fidèles", "congregation", "pagne", "uniforme", "quartier", "neighbourhood"], draw: chorale },
  { id: "ftour", fr: "La rupture du jeûne", en: "Breaking the fast", tags: ["ramadan", "rupture du jeûne", "iftar", "ftour", "jeûne", "fasting", "famille", "family", "partage", "sharing", "dattes", "dates", "bouillie", "porridge", "beignets", "thé", "tea", "bissap", "natte", "mat", "Garoua", "Maroua", "Nord-Cameroun", "minaret", "coucher de soleil", "sunset"], draw: ftour },
  { id: "cascade", fr: "Pique-nique aux chutes", en: "Picnic at the falls", tags: ["pique-nique", "picnic", "cascade", "waterfall", "chutes", "falls", "Lobé", "Ekom-Nkam", "forêt", "forest", "amis", "friends", "famille", "family", "photo", "glacière", "cooler", "pagne", "loisirs", "leisure", "nature", "week-end"], draw: cascade },
];
