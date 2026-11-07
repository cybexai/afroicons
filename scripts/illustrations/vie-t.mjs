// Scènes : la radio communautaire, le concert en plein air, le cinéma en plein air.
import { C, SKIN, person, frame, stroke, f } from "./lib.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${f(r)}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");
/** Position dans la scène d'un point local (hx, hy) d'un personnage. */
const toScene = (x, y, s, flip, hx, hy) => [x + (flip ? -hx : hx) * s, y + hy * s];
/** Casque audio, en repère local d'un personnage (par-dessus la tête). */
const headset = (col = C.dark) => stroke("M-25 -236Q-28 -286 0 -286Q28 -286 25 -236", col, 5) +
  `<rect x="-31" y="-250" width="12" height="26" rx="5" fill="${col}"/><rect x="19" y="-250" width="12" height="26" rx="5" fill="${col}"/><rect x="-28" y="-246" width="5" height="18" rx="2" fill="${C.grey}"/><rect x="23" y="-246" width="5" height="18" rx="2" fill="${C.grey}"/>`;
/** Note de musique. */
const note = (x, y, s, col) => `<g transform="translate(${f(x)} ${f(y)}) scale(${s})" fill="${col}"><ellipse cx="0" cy="0" rx="7" ry="5.5" transform="rotate(-20)"/><rect x="5" y="-30" width="3" height="30"/><path d="M5 -30Q18 -24 16 -12Q14 -20 8 -22Z"/></g>`;

/* ---------- Scène 1 : la radio communautaire ---------- */
/** Micro sur bras articulé : pied posé en (bx,by) sur la table, tête du micro en (mx,my). */
const boomMic = (bx, by, mx, my, k = 1) => {
  const ex = bx + k * 20, ey = (by + my) / 2 - 30;
  return `<ellipse cx="${f(bx)}" cy="${f(by)}" rx="16" ry="4" fill="${C.dark}"/>` + stroke(`M${f(bx)} ${f(by)}L${f(ex)} ${f(ey)}L${f(mx + k * 8)} ${f(my + 12)}`, C.grey, 4) +
    `<circle cx="${f(ex)}" cy="${f(ey)}" r="4" fill="${C.dark}"/>` +
    `<g transform="translate(${f(mx)} ${f(my)}) rotate(${k * -20})"><rect x="-8" y="-16" width="16" height="30" rx="8" fill="${C.dark}"/><rect x="-6" y="-14" width="12" height="15" rx="6" fill="${C.grey}"/>${stroke("M-6 -9H6M-6 -4H6", C.dark, 1.2, ' opacity=".6"')}</g>`;
};

function radio() {
  const g = [];
  // Mur du studio : panneaux acoustiques à droite, tenture ndop, horloge
  for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) g.push(rect(560 + i * 64, 210 + j * 50, 56, 42, C.steel, ' rx="6" opacity=".55"'));
  for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) for (let k = 0; k < 3; k++) g.push(rect(566 + i * 64, 216 + j * 50 + k * 12, 44, 5, C.white, ' rx="2" opacity=".35"'));
  g.push(stroke("M590 48H726", C.wood2, 6), cloth("M596 50H720V176L700 168L680 178L658 168L638 178L616 168L596 176Z", "#1C2756", "ndop"));
  g.push(`<circle cx="530" cy="70" r="24" fill="${C.white}"/><circle cx="530" cy="70" r="24" fill="none" stroke="${C.dark}" stroke-width="4"/>`, stroke("M530 70V56M530 70L540 76", C.dark, 3));
  // Voyant « à l'antenne » : un micro et des ondes, rouge allumé
  g.push(`<circle cx="400" cy="66" r="44" fill="${C.red}" opacity=".15"/>`, rect(356, 44, 88, 44, C.dark, ' rx="10"'), rect(362, 50, 76, 32, C.red, ' rx="7"'));
  g.push(rect(395, 54, 10, 17, C.white, ' rx="5"'), stroke("M390 66Q390 76 400 76Q410 76 410 66M400 76V80", C.white, 2.4), stroke("M381 58Q376 66 381 74M419 58Q424 66 419 74", C.white, 2.4), stroke("M373 54Q366 66 373 78M427 54Q434 66 427 78", C.white, 2.4, ' opacity=".7"'));
  // La vitre de la régie, le technicien derrière
  g.push(rect(282, 110, 236, 196, C.dark, ' rx="12"'));
  const tech = [];
  tech.push(rect(290, 118, 220, 180, C.blue), rect(290, 118, 220, 180, C.indigo, ' opacity=".35"'));
  tech.push(rect(440, 140, 52, 36, C.dark, ' rx="3"'), rect(444, 144, 44, 28, C.green), stroke("M448 164L458 154L466 160L476 148L484 152", C.white, 2));
  const tx = 372, ty = 316, ts = 0.62, tsk = SKIN.s1;
  tech.push(person({ x: tx, y: ty, s: ts, skin: tsk, legs: "none", hair: { type: "short" }, beard: true, top: C.green, wax: "wax3", face: "smile",
    arms: { l: [[-46, -134], [-22, -90]], r: [[48, -176], [52, -222]] } }));
  tech.push(at(tx, ty, ts, false, headset()));
  const [px, py] = toScene(tx, ty, ts, false, 52, -222);
  // Pouce levé
  tech.push(rect(px - 1.5, py - 13, 4.5, 10, tsk, ' rx="2.2"'), hand(px, py, tsk, 5));
  tech.push(`<path d="M290 262H510V298H290Z" fill="${C.dark}"/>`, rect(300, 270, 200, 4, C.grey, ' opacity=".6"'));
  for (let i = 0; i < 9; i++) tech.push(rect(306 + i * 22, 280, 6, 10, i % 3 ? C.steel : C.ocre, ' rx="2"'));
  g.push(`<clipPath id="radio-vitre"><rect x="290" y="118" width="220" height="180" rx="6"/></clipPath><g clip-path="url(#radio-vitre)">${tech.join("")}${stroke("M300 210L380 120M330 250L440 124", C.white, 14, ' opacity=".16"')}</g>`);

  // La table du studio
  const DT = 440;
  // L'animatrice : casque, micro, la main sur les potentiomètres
  const ax = 196, as = 1.12, ay = DT + 140 * as, ask = SKIN.s3;
  g.push(person({ x: ax, y: ay, s: as, skin: ask, legs: "none", hair: { type: "boxbraids", beads: C.ocre }, top: C.terra, wax: "wax1", face: "talk",
    arms: { l: [[-46, -172], [-30, -226]], r: [[46, -156], [86, -140]] } }));
  g.push(at(ax, ay, as, false, headset(C.dark) + hand(-30, -226, ask, 7.5)));
  // L'invité : il parle, la main ouverte
  const gx = 600, gs = 1.12, gy = DT + 140 * gs, gsk = SKIN.s5;
  g.push(person({ x: gx, y: gy, s: gs, flip: true, skin: gsk, legs: "none", hair: { type: "short" }, beard: true, top: C.ocre, dashiki: C.indigo, sleeve: "long", hat: { type: "kufi", color: C.indigo, wax: "wax2" }, face: "talk",
    arms: { l: [[-54, -168], [-70, -206]], r: [[42, -156], [22, -142]] } }));
  g.push(at(gx, gy, gs, true, headset(C.grey)));
  const [ox, oy] = toScene(gx, gy, gs, true, -70, -206);
  g.push(stroke(`M${f(ox - 2)} ${f(oy - 6)}L${f(ox - 6)} ${f(oy - 15)}M${f(ox + 2)} ${f(oy - 7)}L${f(ox + 1)} ${f(oy - 17)}M${f(ox + 6)} ${f(oy - 5)}L${f(ox + 8)} ${f(oy - 14)}`, gsk, 4));

  // Plateau et façade de la table (kente sur la façade)
  g.push(rect(30, DT, 740, 16, C.wood, ' rx="4"'), rect(40, DT + 16, 720, 150, C.wood2), rect(40, DT + 60, 720, 22, C.ocre), `<rect x="40" y="${DT + 60}" width="720" height="22" fill="url(#kente)"/>`, rect(40, DT + 16, 720, 6, C.dark, ' opacity=".2"'));
  // La console de mixage
  g.push(`<path d="M296 ${DT}L310 ${DT - 34}H490L504 ${DT}Z" fill="${C.dark}"/>`);
  for (let i = 0; i < 8; i++) {
    const x = 322 + i * 21;
    g.push(stroke(`M${x} ${DT - 28}V${DT - 8}`, C.grey, 2), rect(x - 4, DT - 22 + ((i * 7) % 12), 8, 5, i === 2 ? C.terra : C.steel, ' rx="1"'), `<circle cx="${x}" cy="${DT - 30}" r="2.4" fill="${i % 2 ? C.ocre : C.white}"/>`);
  }
  for (let i = 0; i < 5; i++) g.push(rect(470, DT - 12 - i * 4, 12, 3, i < 3 ? C.leaf : i < 4 ? C.yellow : C.red));
  // La main de l'animatrice repose sur la console
  const [rx, ry] = toScene(ax, ay, as, false, 86, -140);
  g.push(hand(rx, ry, ask, 8));
  // Feuilles, tasse de l'invité, sa main sur la table
  g.push(`<path d="M150 ${DT - 2}L196 ${DT - 6}L204 ${DT}H148Z" fill="${C.white}"/>`, rect(520, DT - 22, 18, 22, C.green, ' rx="3"'), stroke(`M538 ${DT - 16}Q546 ${DT - 12} 538 ${DT - 6}`, C.green, 3));
  const [lx, ly] = toScene(gx, gy, gs, true, 22, -142);
  g.push(hand(lx, ly, gsk, 8));
  // Les deux micros
  g.push(boomMic(250, DT, 252, ay - 228 * as, 1), boomMic(546, DT, 548, gy - 228 * gs, -1));

  // En médaillon : une famille écoute l'émission sur le poste, dans son salon
  const MX = 140, MY = 160, MR = 100, RX = MX + 20;
  const fam = [];
  fam.push(rect(MX - MR, MY - MR, 2 * MR, 2 * MR, C.sand), rect(MX - MR, MY + 30, 2 * MR, 80, C.sand2));
  fam.push(rect(MX + 30, MY - 70, 50, 56, C.white), rect(MX + 34, MY - 66, 42, 48, C.sky), stroke(`M${MX + 55} ${MY - 66}V${MY - 18}`, C.white, 3));
  fam.push(`<path d="M${MX - 96} ${MY + 6}Q${MX - 96} ${MY - 14} ${MX - 76} ${MY - 14}H${MX + 76}Q${MX + 96} ${MY - 14} ${MX + 96} ${MY + 6}V${MY + 60}H${MX - 96}Z" fill="${C.green}"/>`);
  const fs = 0.44;
  fam.push(person({ x: MX - 58, y: MY + 112, s: fs, skin: SKIN.s2, legs: "none", hair: { type: "rase", color: C.grey }, beard: true, top: C.indigo, wax: "ndop", face: "smile", hat: { type: "ashetu", color: C.red, color2: C.dark },
    arms: { l: [[-40, -150], [-10, -120]], r: [[40, -150], [24, -122]] } }));
  fam.push(person({ x: MX - 8, y: MY + 112, s: fs, skin: SKIN.s4, legs: "none", hair: { type: "gele", color: C.ocre, wax: "wax2" }, top: C.terra, wax: "wax1", robe: "kaba", face: "laugh",
    arms: { l: [[-40, -150], [-20, -112]], r: [[44, -150], [70, -122]] } }));
  fam.push(person({ x: MX + 74, y: MY + 112, s: 0.36, skin: SKIN.s3, legs: "none", hair: { type: "puffs" }, top: C.yellow, face: "laugh",
    arms: { l: [[-40, -150], [-44, -110]], r: [[44, -150], [42, -110]] } }));
  // La table basse et le poste de radio, ses ondes
  fam.push(rect(MX - 86, MY + 52, 172, 10, C.wood2, ' rx="3"'));
  fam.push(rect(RX - 4, MY + 24, 50, 28, C.terra, ' rx="6"'), `<circle cx="${RX + 10}" cy="${MY + 37}" r="9" fill="${C.dark}"/><circle cx="${RX + 10}" cy="${MY + 37}" r="4" fill="${C.grey}"/>`, rect(RX + 24, MY + 30, 20, 6, C.ocre, ' rx="2"'), rect(RX + 24, MY + 40, 20, 3, C.dark, ' opacity=".5"'), stroke(`M${RX + 42} ${MY + 22}L${RX + 50} ${MY - 6}`, C.dark, 2));
  fam.push(stroke(`M${RX + 20} ${MY + 10}Q${RX + 26} ${MY} ${RX + 34} ${MY - 2}M${RX + 12} ${MY + 2}Q${RX + 22} ${MY - 12} ${RX + 38} ${MY - 14}`, C.terra, 2.4, ' opacity=".8"'));
  g.push(`<clipPath id="radio-salon"><circle cx="${MX}" cy="${MY}" r="${MR}"/></clipPath><g clip-path="url(#radio-salon)">${fam.join("")}</g>`);
  g.push(`<circle cx="${MX}" cy="${MY}" r="${MR}" fill="none" stroke="${C.white}" stroke-width="8"/>`);
  // Les ondes qui partent du studio vers le salon
  g.push(stroke(`M352 76Q290 70 ${MX + MR - 4} ${MY - 34}`, C.terra, 3, ' stroke-dasharray="2 9" opacity=".7"'));
  return frame(g.join(""), C.sky);
}

/* ---------- Scène 2 : le concert en plein air ---------- */
/** Enceinte : (x,y) coin haut gauche. */
const speaker = (x, y, w, h) => rect(x, y, w, h, C.dark, ' rx="6"') + `<circle cx="${f(x + w / 2)}" cy="${f(y + h * 0.66)}" r="${f(w * 0.32)}" fill="${C.grey}"/><circle cx="${f(x + w / 2)}" cy="${f(y + h * 0.66)}" r="${f(w * 0.14)}" fill="${C.dark}"/><circle cx="${f(x + w / 2)}" cy="${f(y + h * 0.22)}" r="${f(w * 0.13)}" fill="${C.grey}"/>`;

function concert() {
  const g = [];
  // Ciel du soir : soleil couchant, arbres et toits au loin
  g.push(`<circle cx="400" cy="170" r="150" fill="${C.ocre}" opacity=".18"/><circle cx="400" cy="170" r="96" fill="${C.ocre}" opacity=".35"/>`);
  for (const [cx, cy, r] of [[30, 300, 70], [110, 280, 60], [700, 286, 66], [780, 300, 60]]) g.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.leaf2}" opacity=".55"/>`);
  g.push(`<path d="M140 340V290L190 264L240 290V340Z" fill="${C.wood}" opacity=".45"/><path d="M560 340V296L610 272L660 296V340Z" fill="${C.wood}" opacity=".45"/>`);
  // Le sol de terre rouge
  g.push(rect(0, 340, 800, 260, C.sand2), rect(0, 340, 800, 260, C.terra, ' opacity=".22"'));
  // Toile de fond de la scène en wax, guirlande d'ampoules
  const ST = 372;
  g.push(rect(170, 118, 460, ST - 118, C.indigo), `<rect x="170" y="118" width="460" height="${ST - 118}" fill="url(#wax1)" opacity=".35"/>`);
  g.push(rect(170, 118, 460, 22, C.ocre), `<rect x="170" y="118" width="460" height="22" fill="url(#kente)"/>`);
  // Portique : montants et barre d'éclairage
  g.push(stroke(`M160 ${ST}V92M640 ${ST}V92M156 96H644`, C.grey, 10), stroke("M156 96H644", C.steel, 3));
  // Projecteurs et leurs faisceaux
  const spots = [[240, C.yellow], [330, C.rose], [470, C.yellow], [560, C.rose]];
  g.push(`<g style="mix-blend-mode:screen">${spots.map(([x, c], i) => `<path d="M${x - 8} 112L${x + (i < 2 ? 40 : -40) - 70} ${ST}H${x + (i < 2 ? 40 : -40) + 70}L${x + 8} 112Z" fill="${c}" opacity=".22"/>`).join("")}</g>`);
  for (const [x] of spots) g.push(stroke(`M${x} 96V104`, C.dark, 4), rect(x - 12, 102, 24, 16, C.dark, ' rx="4"'), `<ellipse cx="${x}" cy="118" rx="10" ry="4" fill="${C.yellow}"/>`);
  // Guirlande d'ampoules sur la barre
  g.push(`<defs><g id="concert-bulb"><circle r="5" fill="${C.yellow}"/><circle r="9" fill="${C.yellow}" opacity=".25"/></g></defs>`);
  g.push(stroke("M34 56V346M766 56V346", C.wood2, 5), stroke("M34 60Q95 96 160 74M640 74Q705 96 766 60", C.dark, 1.6, ' opacity=".6"'));
  for (const [x, y] of [[52, 72], [80, 82], [110, 84], [138, 80], [662, 80], [690, 84], [720, 82], [748, 72]]) g.push(`<use href="#concert-bulb" x="${x}" y="${y + 6}"/>`);

  // L'estrade
  g.push(rect(130, ST, 540, 12, C.wood), rect(140, ST + 12, 520, 44, C.wood2), stroke(`M140 ${ST + 34}H660`, C.wood, 2, ' opacity=".4"'));
  for (let x = 170; x < 660; x += 60) g.push(stroke(`M${x} ${ST + 14}V${ST + 54}`, C.dark, 2, ' opacity=".2"'));
  // Retours de scène au bord
  g.push(`<path d="M300 ${ST}L306 ${ST - 18}H344L350 ${ST}Z" fill="${C.dark}"/><path d="M452 ${ST}L458 ${ST - 18}H494L500 ${ST}Z" fill="${C.dark}"/>`);

  const ms = 0.8;
  // Le guitariste
  const qx = 262, qsk = SKIN.s2;
  g.push(person({ x: qx, y: ST, s: ms, skin: qsk, hair: { type: "locks" }, top: C.green, wax: "bogolan", sleeve: "short", bottom: C.dark, face: "smile",
    arms: { l: [[-42, -150], [-10, -122]], r: [[44, -164], [60, -178]] } }));
  g.push(at(qx, ST, ms, false,
    `<g transform="rotate(-28 -6 -118)"><rect x="-4" y="-124" width="96" height="10" rx="2" fill="${C.wood2}"/><rect x="86" y="-128" width="18" height="18" rx="3" fill="${C.dark}"/>` +
    `<path d="M-46 -118Q-46 -146 -24 -140Q-12 -150 0 -138Q16 -142 16 -118Q16 -94 0 -98Q-12 -88 -24 -96Q-46 -90 -46 -118Z" fill="${C.terra}"/><circle cx="-12" cy="-118" r="7" fill="${C.dark}"/>${stroke("M-40 -118H96", C.white, 1, ' opacity=".7"')}</g>` +
    hand(-10, -122, qsk) + hand(60, -178, qsk)));
  // Le batteur au tam-tam (djembé)
  const dx = 548, dsk = SKIN.s4;
  g.push(person({ x: dx, y: ST, s: ms, flip: true, skin: dsk, hair: { type: "short" }, beard: true, top: C.ocre, dashiki: C.terra, sleeve: "short", bottom: C.indigo, bwax: "wax2", hat: { type: "kufi", color: C.terra, wax: "wax2" }, face: "laugh",
    arms: { l: [[-42, -148], [-18, -128]], r: [[44, -150], [22, -138]] } }));
  g.push(at(dx, ST, ms, true,
    `<path d="M-34 -122Q-32 -88 -14 -70Q-20 -30 -22 0H22Q20 -30 14 -70Q32 -88 34 -122Z" fill="${C.wood}"/>` +
    stroke("M-30 -112L-16 -76L-26 -112M-16 -76L-2 -116L10 -76L22 -116L28 -100", C.cream, 1.6) +
    `<ellipse cx="0" cy="-122" rx="35" ry="8" fill="${C.sand}"/><ellipse cx="0" cy="-122" rx="35" ry="8" fill="none" stroke="${C.wood2}" stroke-width="3"/>` + rect(-16, -12, 32, 6, C.wood2, ' rx="2"') +
    hand(-18, -128, dsk) + hand(22, -138, dsk)));
  // La chanteuse, au centre : kaba, gele, micro à la main
  const cx = 404, csk = SKIN.s1;
  g.push(person({ x: cx, y: ST, s: 0.84, skin: csk, hair: { type: "gele", color: C.ocre, wax: "wax2" }, robe: "kaba", top: C.terra, wax: "wax1", face: "talk",
    arms: { l: [[-50, -190], [-70, -232]], r: [[36, -168], [26, -204]] } }));
  g.push(at(cx, ST, 0.84, false, stroke("M26 -200Q34 -170 20 -130", C.dark, 1.6) + `<g transform="rotate(-24 22 -214)"><rect x="18" y="-212" width="8" height="22" rx="3" fill="${C.dark}"/><circle cx="22" cy="-216" r="7" fill="${C.grey}"/></g>` + hand(26, -204, csk)));
  // Notes de musique
  g.push(note(470, 196, 0.8, C.white), note(330, 180, 0.7, C.white), note(626, 70, 0.9, C.ocre), note(170, 70, 0.8, C.terra));
  // Enceintes de chaque côté
  g.push(speaker(54, 250, 86, 120), speaker(54, 372, 86, 110), speaker(660, 250, 86, 120), speaker(660, 372, 86, 110));

  // Le public qui danse au premier plan
  const py = 582;
  g.push(person({ x: 104, y: py, s: 0.96, flip: true, skin: SKIN.s4, hair: { type: "boxbraids", beads: C.ocre }, top: C.yellow, sleeve: "short", bottom: C.terra, bwax: "wax3", legs: "walkskirt", face: "laugh",
    arms: { l: [[-48, -198], [-62, -246]], r: [[50, -196], [70, -240]] } }));
  g.push(person({ x: 226, y: py, s: 0.98, view: "back", skin: SKIN.s3, hair: { type: "bantu" }, top: C.green, wax: "kitenge", bottom: C.indigo, legs: "skirt",
    arms: { l: [[-46, -196], [-58, -248]], r: [[44, -182], [62, -160]] } }));
  g.push(person({ x: 590, y: py, s: 1, view: "back", skin: SKIN.s2, hair: { type: "short" }, top: C.indigo, wax: "ndop", bottom: C.dark,
    arms: { l: [[-44, -186], [-40, -220]], r: [[46, -198], [58, -252]] }, phone: { rot: 0, screen: C.ocre } }));
  g.push(person({ x: 706, y: py, s: 0.92, skin: SKIN.s5, hair: { type: "afro" }, top: C.terra, wax: "wax2", sleeve: "short", bottom: C.dark, legs: "walk", face: "laugh",
    arms: { l: [[-44, -176], [-30, -204]], r: [[48, -180], [36, -208]] } }));
  return frame(g.join(""), C.cream);
}

/* ---------- Scène 3 : le cinéma en plein air ---------- */
/** Jambes croisées d'un personnage assis par terre (repère local, legs: "none"). */
const crossLegs = (col, skin, pat) => cloth("M-30 -118H30Q62 -114 60 -96Q54 -82 0 -86Q-54 -82 -60 -96Q-62 -114 -30 -118Z", col, pat) + `<ellipse cx="-30" cy="-88" rx="12" ry="6" fill="${skin}"/><ellipse cx="30" cy="-88" rx="12" ry="6" fill="${skin}"/>`;
/** Banc : assise en y, de x0 à x1. */
const bench = (x0, x1, y) => rect(x0, y, x1 - x0, 10, C.wood, ' rx="3"') + rect(x0 + 10, y + 10, 8, 56, C.wood2) + rect(x1 - 18, y + 10, 8, 56, C.wood2);

function cinema() {
  const g = [];
  // Nuit : étoiles, lune
  g.push(rect(0, 0, 800, 600, C.dark, ' opacity=".45"'));
  for (const [x, y, r] of [[60, 40, 2], [140, 90, 1.5], [250, 30, 2], [330, 80, 1.4], [420, 40, 1.8], [96, 150, 1.4], [380, 140, 1.2], [210, 120, 1.6], [770, 30, 1.6]]) g.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${C.white}" opacity=".8"/>`);
  g.push(`<circle cx="300" cy="60" r="22" fill="${C.cream}"/><circle cx="310" cy="54" r="20" fill="${C.indigo}"/><circle cx="310" cy="54" r="20" fill="${C.dark}" opacity=".45"/>`);
  // Les maisons du quartier, fenêtres allumées ; un manguier
  g.push(`<path d="M0 360V250L60 220L120 250V360Z" fill="${C.dark}" opacity=".7"/><path d="M120 360V270H260V360Z" fill="${C.dark}" opacity=".6"/><path d="M110 274L190 236L270 274Z" fill="${C.dark}" opacity=".75"/><path d="M260 360V256L330 226L400 256V360Z" fill="${C.dark}" opacity=".65"/>`);
  for (const [x, y] of [[40, 270], [160, 296], [216, 296], [300, 280], [350, 280]]) g.push(rect(x, y, 22, 20, C.yellow, ' opacity=".8"'));
  g.push(rect(404, 250, 12, 110, C.wood2), `<circle cx="410" cy="214" r="50" fill="${C.leaf2}"/><circle cx="380" cy="246" r="36" fill="${C.leaf2}"/><circle cx="410" cy="214" r="50" fill="${C.dark}" opacity=".4"/><circle cx="380" cy="246" r="36" fill="${C.dark}" opacity=".4"/>`);
  // La cour en terre battue
  g.push(rect(0, 360, 800, 240, C.terra), rect(0, 360, 800, 240, C.dark, ' opacity=".5"'));

  // L'écran tendu entre deux mâts
  const SX = 446, SY = 74, SW = 284, SH = 192;
  g.push(stroke(`M${SX - 10} ${SY - 20}V372M${SX + SW + 10} ${SY - 20}V372`, C.wood2, 8), stroke(`M${SX - 10} ${SY - 16}L${SX} ${SY}M${SX + SW + 10} ${SY - 16}L${SX + SW} ${SY}M${SX - 10} ${SY + SH + 14}L${SX} ${SY + SH}M${SX + SW + 10} ${SY + SH + 14}L${SX + SW} ${SY + SH}`, C.sand, 1.6));
  g.push(rect(SX - 6, SY - 6, SW + 12, SH + 12, C.white, ' rx="3"'));
  // L'image projetée, découpée aux bords de l'écran : deux personnages au village, au coucher du soleil
  const img = [];
  img.push(rect(SX, SY, SW, SH, C.ocre), rect(SX, SY, SW, 80, C.yellow, ' opacity=".35"'), `<circle cx="${SX + 220}" cy="${SY + 70}" r="30" fill="${C.yellow}"/>`);
  img.push(`<path d="M${SX} ${SY + 130}Q${SX + 80} ${SY + 96} ${SX + 160} ${SY + 124}Q${SX + 230} ${SY + 100} ${SX + SW} ${SY + 120}V${SY + SH}H${SX}Z" fill="${C.green}"/>`);
  img.push(`<path d="M${SX + 196} ${SY + 140}V${SY + 112}L${SX + 222} ${SY + 96}L${SX + 248} ${SY + 112}V${SY + 140}Z" fill="${C.wood}"/><path d="M${SX + 188} ${SY + 114}L${SX + 222} ${SY + 84}L${SX + 256} ${SY + 114}Z" fill="${C.wood2}"/>`);
  img.push(person({ x: SX + 90, y: SY + SH + 50, s: 0.62, skin: SKIN.s2, hair: { type: "gele", color: C.indigo, wax: "wax3" }, top: C.indigo, wax: "wax1", face: "laugh", arms: { l: [[-40, -150], [-38, -108]], r: [[44, -160], [60, -196]] } }));
  img.push(person({ x: SX + 170, y: SY + SH + 50, s: 0.64, flip: true, skin: SKIN.s4, hair: { type: "short" }, top: C.terra, dashiki: true, face: "talk", hat: { type: "kufi", color: C.dark } }));
  img.push(rect(SX, SY, SW, SH, C.white, ' opacity=".12"'));
  g.push(`<clipPath id="cinema-ecran"><rect x="${SX}" y="${SY}" width="${SW}" height="${SH}"/></clipPath><g clip-path="url(#cinema-ecran)">${img.join("")}</g>`);

  // Le faisceau du projecteur vers l'écran
  const LX = 206, LY = 352;
  g.push(`<path d="M${LX} ${LY - 6}L${SX} ${SY}V${SY + SH}L${LX} ${LY + 6}Z" fill="${C.white}" opacity=".1"/><path d="M${LX} ${LY - 3}L${SX} ${SY + 40}V${SY + SH - 40}L${LX} ${LY + 3}Z" fill="${C.white}" opacity=".08"/>`);

  // Le rang du fond, sur un banc : un couple
  const BY = 462, bs = 0.7;
  g.push(bench(250, 420, BY - 100 * bs));
  g.push(person({ x: 284, y: BY, s: bs, skin: SKIN.s3, legs: "sit", hair: { type: "fulani", beads: C.ocre }, top: C.green, wax: "kitenge", robe: "dress", face: "laugh",
    arms: { l: [[-38, -150], [-20, -112]], r: [[40, -150], [52, -112]] } }));
  g.push(person({ x: 360, y: BY, s: bs, skin: SKIN.s1, legs: "sit", hair: { type: "short" }, beard: true, top: "#15110F", wax: "toghu", bottom: C.dark, face: "smile",
    arms: { l: [[-42, -150], [-30, -112]], r: [[40, -150], [58, -112]] } }));

  // Le projecteur sur sa table, et son opérateur
  const ox = 100, oy = 500, os = 0.86, osk = SKIN.s4;
  g.push(person({ x: ox, y: oy, s: os, skin: osk, legs: "stand", bottom: C.dark, hair: { type: "short" }, top: C.indigo, wax: "wax3", sleeve: "short", hat: { type: "cap", color: C.terra }, face: "smile",
    arms: { l: [[-42, -150], [-38, -108]], r: [[44, -160], [60, -186]] } }));
  g.push(rect(96, 376, 140, 10, C.wood, ' rx="3"'), rect(106, 386, 8, 110, C.wood2), rect(218, 386, 8, 110, C.wood2), rect(106, 430, 120, 6, C.wood2));
  g.push(rect(128, 330, 74, 46, C.grey, ' rx="6"'), rect(128, 362, 74, 14, C.dark, ' opacity=".25" rx="4"'), rect(196, 342, 14, 20, C.dark, ' rx="3"'), `<ellipse cx="208" cy="352" rx="4" ry="9" fill="${C.yellow}"/>`);
  for (const [x, r] of [[146, 22], [186, 18]]) g.push(`<circle cx="${x}" cy="${330 - r + 4}" r="${r}" fill="${C.dark}"/><circle cx="${x}" cy="${330 - r + 4}" r="${r * 0.35}" fill="${C.grey}"/>`, stroke(`M${x} ${330 - r + 4 - r * 0.7}V${330 - r + 4 + r * 0.7}M${x - r * 0.7} ${330 - r + 4}H${x + r * 0.7}`, C.grey, 2, ' opacity=".5"'));
  const [hx, hy] = toScene(ox, oy, os, false, 60, -186);
  g.push(hand(hx, hy, osk, 7));

  // La natte au premier plan : une maman et ses deux enfants
  const NY = 540;
  g.push(`<path d="M400 ${NY - 40}H720L750 ${NY + 36}H370Z" fill="${C.ocre}"/>`);
  for (let i = 1; i < 5; i++) g.push(stroke(`M${400 - 6 * i} ${NY - 40 + 15 * i}H${720 + 6 * i}`, C.wood, 1.6, ' opacity=".5"'));
  for (let x = 430; x < 730; x += 28) g.push(stroke(`M${x} ${NY - 40}L${x - 12} ${NY + 36}`, C.wood2, 1.4, ' opacity=".35"'));
  // La maman
  const kx = 560, ks = 0.64, ksk = SKIN.s4, ky = NY + 6 + 86 * ks;
  const mx = 470, ms = 0.82, msk = SKIN.s2, my = NY + 4 + 86 * ms;
  g.push(at(mx, my, ms, false, crossLegs(C.green, msk, "wax1")));
  g.push(person({ x: mx, y: my, s: ms, skin: msk, legs: "none", hair: { type: "foulard", color: C.terra, wax: "wax2" }, top: C.green, wax: "wax1", face: "laugh",
    arms: { l: [[-44, -150], [-34, -110]], r: [[50, -156], [86, -168]] } }));
  // Le grand frère, appuyé contre elle
    g.push(at(kx, ky, ks, false, crossLegs(C.indigo, ksk, null)));
  g.push(person({ x: kx, y: ky, s: ks, skin: ksk, legs: "none", hair: { type: "short" }, top: C.yellow, sleeve: "short", face: "laugh",
    arms: { l: [[-44, -150], [-50, -108]], r: [[44, -150], [52, -108]] } }));
  const [mhx, mhy] = toScene(mx, my, ms, false, 86, -168);
  g.push(hand(mhx, mhy, msk, 6.4));
  // La petite au sachet d'arachides grillées, elle en mange une
  const cx = 650, cs = 0.6, csk = SKIN.s3, cy = NY + 8 + 86 * cs;
  g.push(at(cx, cy, cs, false, crossLegs(C.terra, csk, "wax3")));
  g.push(person({ x: cx, y: cy, s: cs, skin: csk, legs: "none", hair: { type: "bantu" }, top: C.terra, wax: "wax3", sleeve: "short", face: "smile",
    arms: { l: [[-44, -150], [-16, -140]], r: [[44, -160], [22, -206]] } }));
  g.push(at(cx, cy, cs, false, `<path d="M-30 -150H2L-4 -104H-24Z" fill="${C.white}"/><path d="M-30 -150H2L0 -142H-29Z" fill="${C.sand2}"/>` +
    [[-24, -156], [-14, -158], [-5, -155], [-19, -150], [-9, -150]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4.4" ry="3" fill="${C.wood}"/>`).join("") +
    hand(-16, -140, csk) + `<ellipse cx="22" cy="-214" rx="4" ry="3" fill="${C.wood}"/>` + hand(22, -206, csk)));
  // Le gobelet de bissap posé sur la natte
  g.push(`<path d="M706 ${NY + 4}H720L717 ${NY + 24}H709Z" fill="${C.red}"/>`);
  return frame(g.join(""), C.indigo);
}

export default [
  { id: "radio", fr: "La radio communautaire", en: "Community radio",
    tags: ["radio", "radio communautaire", "studio", "animatrice", "micro", "casque", "console", "antenne", "invité", "technicien", "régie", "émission", "famille", "écoute", "poste", "community radio", "host", "microphone", "headphones", "mixing desk", "on air", "guest", "technician", "control room", "broadcast", "family", "listening"], draw: radio },
  { id: "concert", fr: "Le concert en plein air", en: "Open-air concert",
    tags: ["concert", "plein air", "musique", "chanteuse", "guitariste", "tam-tam", "djembé", "scène", "projecteurs", "enceintes", "public", "danse", "wax", "gele", "kaba", "fête", "open-air", "music", "singer", "guitarist", "drum", "djembe", "stage", "lights", "speakers", "crowd", "dancing", "party"], draw: concert },
  { id: "cinema", fr: "Cinéma en plein air", en: "Outdoor cinema",
    tags: ["cinéma", "plein air", "film", "écran", "projecteur", "projection", "soir", "nuit", "quartier", "cour", "famille", "banc", "natte", "enfants", "arachides", "cinema", "outdoor", "movie", "screen", "projector", "evening", "night", "neighbourhood", "courtyard", "family", "bench", "mat", "children", "peanuts"], draw: cinema },
];
