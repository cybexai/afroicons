// Scènes : l'atelier du bronzier de Foumban, la potière, le taxi jaune de Yaoundé.
import { C, SKIN, person, frame, palm, cloud, bubble, stroke, f } from "./lib.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="7.5" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
/** Aplat avec un motif par-dessus. */
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");

/* ---------- Bronzes ---------- */
const BZ = C.wood, BZ2 = C.wood2, BZH = C.ocre;
/** Masque de bronze bamoun (centre x,y, échelle s) : joues rondes, grandes oreilles, coiffe à spirales. */
const mask = (x, y, s = 1) => `<g transform="translate(${f(x)} ${f(y)}) scale(${s})">` +
  `<circle cx="-24" cy="-2" r="8" fill="${BZ2}"/><circle cx="24" cy="-2" r="8" fill="${BZ2}"/>` +
  `<path d="M-20 -14Q-22 -36 0 -36Q22 -36 20 -14L18 14Q10 30 0 30Q-10 30 -18 14Z" fill="${BZ}"/>` +
  `<path d="M-22 -22Q0 -48 22 -22Q12 -30 0 -30Q-12 -30 -22 -22Z" fill="${BZ2}"/>` +
  [-14, -5, 5, 14].map((cx) => `<circle cx="${cx}" cy="${-36 + Math.abs(cx) * 0.4}" r="4.5" fill="${BZH}"/>`).join("") +
  `<circle cx="-10" cy="4" r="6" fill="${BZH}" opacity=".55"/><circle cx="10" cy="4" r="6" fill="${BZH}" opacity=".55"/>` +
  `<path d="M-13 -10Q-8 -14 -3 -10Q-8 -7 -13 -10ZM13 -10Q8 -14 3 -10Q8 -7 13 -10Z" fill="${C.dark}"/>` +
  `<path d="M-2 -8H2L4 6H-4Z" fill="${BZ2}"/><path d="M-8 15Q0 22 8 15Q0 18 -8 15Z" fill="${C.dark}"/></g>`;
/** Statuette de bronze debout sur son socle (pied en x,y, hauteur h). */
const statuette = (x, y, h, col = BZ) => {
  const k = h / 60;
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(k)})"><rect x="-10" y="-5" width="20" height="5" rx="1.5" fill="${BZ2}"/>` +
    `<path d="M-6 -5L-7 -24H7L6 -5Z" fill="${col}"/><path d="M-9 -24Q-10 -40 -6 -42H6Q10 -40 9 -24Z" fill="${col}"/>` +
    stroke("M-8 -38L-13 -27M8 -38L13 -27", col, 4) + `<circle cx="0" cy="-50" r="8" fill="${col}"/><path d="M-8 -54Q0 -64 8 -54Z" fill="${BZ2}"/>` +
    stroke("M-3 -46Q-4 -32 -3 -10", BZH, 1.6, ' opacity=".8"') + `</g>`;
};
/** Vase de bronze à anses (pied en x,y). */
const vase = (x, y, s = 1) => `<g transform="translate(${f(x)} ${f(y)}) scale(${s})"><path d="M-10 0Q-22 -14 -16 -30Q-10 -38 -8 -46H8Q10 -38 16 -30Q22 -14 10 0Z" fill="${BZ}"/>` +
  `<rect x="-10" y="-50" width="20" height="5" rx="2" fill="${BZ2}"/>${stroke("M-16 -30Q-26 -32 -20 -40M16 -30Q26 -32 20 -40", BZ2, 3)}${stroke("M-16 -20H16", BZH, 2)}<path d="M-6 -36Q0 -12 -2 -4" stroke="${BZH}" stroke-width="2" fill="none" opacity=".7"/></g>`;

/* ---------- Scène 1 : l'atelier du bronzier ---------- */
function bronze() {
  const g = [];
  // Mur en terre, poutre, sol de terre battue
  g.push(rect(0, 0, 800, 456, C.sand), rect(0, 24, 800, 16, C.wood2), rect(0, 420, 800, 36, C.sand2));
  g.push(rect(0, 456, 800, 144, C.sand2), `<path d="M0 456H800V470H0Z" fill="${C.wood2}" opacity=".25"/>`);
  for (const [x, y] of [[90, 520], [520, 580], [700, 500], [300, 590]]) g.push(`<ellipse cx="${x}" cy="${y}" rx="26" ry="4" fill="${C.wood}" opacity=".2"/>`);
  // Tissu ndop tendu au mur
  g.push(rect(296, 64, 236, 6, C.wood2, ' rx="3"'), `<path d="M298 70H522V222L502 214L482 222L462 214L442 222L422 214L402 222L382 214L362 222L342 214L322 222L298 214Z" fill="url(#ndop)"/>`);
  // Étagère de bronzes, à droite
  const sx = 566, sw = 200;
  g.push(rect(sx, 92, 6, 248, C.wood2), rect(sx + sw - 6, 92, 6, 248, C.wood2));
  for (const y of [168, 252, 336]) g.push(rect(sx - 6, y, sw + 12, 8, C.wood, ' rx="2"'), rect(sx - 6, y + 8, sw + 12, 3, C.wood2));
  g.push(mask(sx + 40, 132, 0.95), statuette(sx + 92, 168, 56), vase(sx + 138, 168, 1), statuette(sx + 176, 168, 44, BZ2));
  g.push(statuette(sx + 26, 252, 50, BZ2), mask(sx + 82, 216, 0.95), statuette(sx + 130, 252, 64), mask(sx + 172, 218, 0.8));
  g.push(vase(sx + 26, 336, 0.9), statuette(sx + 176, 336, 52));
  // Outils accrochés au mur, au-dessus du four
  g.push(rect(160, 100, 116, 6, C.wood2, ' rx="3"'));
  g.push(stroke("M176 106V156", C.grey, 4), `<path d="M170 156H182L176 168Z" fill="${C.grey}"/>`, stroke("M204 106V150", C.wood, 5), rect(192, 150, 24, 12, C.grey, ' rx="2"'));
  g.push(stroke("M236 106L228 166M236 106L244 166", C.dark, 3.5), stroke("M262 106V146", C.grey, 4), `<circle cx="262" cy="152" r="8" fill="none" stroke="${C.grey}" stroke-width="4"/>`);
  // Le four de terre et son foyer rougeoyant
  g.push(rect(118, 40, 26, 210, C.wood2), rect(114, 40, 34, 10, C.dark, ' opacity=".5"'));
  g.push(`<path d="M50 470Q46 330 92 268Q130 236 170 268Q216 330 212 470Z" fill="${C.wood}"/><path d="M50 470Q46 330 92 268Q104 258 116 254Q78 320 82 470Z" fill="${C.wood2}" opacity=".45"/>`);
  g.push(`<ellipse cx="131" cy="410" rx="44" ry="40" fill="${C.wood2}"/><ellipse cx="131" cy="414" rx="36" ry="32" fill="${C.red}"/><ellipse cx="131" cy="422" rx="26" ry="20" fill="${C.ocre}"/><ellipse cx="131" cy="428" rx="14" ry="10" fill="${C.yellow}"/>`);
  for (const [cx, cy] of [[110, 440], [124, 446], [142, 444], [156, 438]]) g.push(`<circle cx="${cx}" cy="${cy}" r="6" fill="${C.dark}"/>`);
  g.push(`<circle cx="131" cy="420" r="70" fill="${C.yellow}" opacity=".12"/>`);
  for (const [cx, cy, r] of [[118, 360, 2.5], [146, 350, 3], [132, 336, 2]]) g.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.ocre}"/>`);
  // Soufflet de peau au pied du four
  g.push(`<path d="M196 476Q200 446 230 448Q252 452 248 478Z" fill="${C.wood2}"/>`, stroke("M206 466L190 470", C.dark, 5));
  // L'apprenti sort le creuset du feu avec la pince
  const ax = 280, ay = 566, as = 1.02;
  g.push(person({ x: ax, y: ay, s: as, flip: true, skin: SKIN.s4, hair: { type: "nattes" }, top: C.terra, wax: "wax3", sleeve: "short", bottom: C.wood2, face: "calm",
    arms: { r: [[46, -150], [74, -140]], l: [[-6, -146], [58, -128]] } }));
  g.push(at(ax, ay, as, true, stroke("M58 -128L128 -136M74 -140L130 -142", C.dark, 4) +
    `<path d="M122 -150H156L152 -122Q139 -114 126 -122Z" fill="${C.dark}"/><path d="M125 -148H153L150 -128Q139 -122 128 -128Z" fill="${C.red}"/><ellipse cx="139" cy="-148" rx="14" ry="4" fill="${C.yellow}"/>` +
    `<circle cx="139" cy="-140" r="26" fill="${C.yellow}" opacity=".18"/>` + hand(58, -128, SKIN.s4) + hand(74, -140, SKIN.s4)));
  // Le moule qui attend, posé sur le sol
  g.push(`<path d="M300 560Q296 520 318 512H344Q366 520 362 560Z" fill="${C.rose}"/><path d="M318 512L314 498H348L344 512Z" fill="${C.wood}"/><ellipse cx="331" cy="498" rx="17" ry="4" fill="${C.dark}"/>`);
  // Le bronzier assis sur son tabouret, cisèle une statuette
  const bx = 420, by = 566, bs = 1.06;
  g.push(at(bx, by, bs, false, `<ellipse cx="0" cy="-100" rx="44" ry="8" fill="${C.wood2}"/><path d="M-36 -96H36L24 -60L36 -6H-36L-24 -60Z" fill="${C.wood}"/><path d="M-16 -86H16L8 -60L16 -20H-16L-8 -60Z" fill="${C.wood2}"/><ellipse cx="0" cy="-6" rx="40" ry="7" fill="${C.wood2}"/>`));
  g.push(person({ x: bx, y: by, s: bs, legs: "sit", skin: SKIN.s2, hair: { type: "short" }, beard: true, robe: "boubou", top: C.indigo, hat: { type: "kufi", color: C.ocre, wax: "wax3" }, face: "calm",
    arms: { l: [[-14, -140], [30, -134]], r: [[60, -148], [76, -168]] } }));
  g.push(at(bx, by, bs, false, statuette(40, -104, 58) + hand(30, -134, SKIN.s2) +
    stroke("M80 -174L54 -152", C.grey, 4) + stroke("M84 -178L76 -170", C.wood2, 6) + hand(76, -168, SKIN.s2) +
    stroke("M48 -160L42 -166M50 -150L44 -146M56 -158L58 -166", C.yellow, 2)));
  // Petite caisse d'outils et modèles en cire
  g.push(rect(500, 520, 58, 40, C.wood2, ' rx="3"'), rect(500, 520, 58, 8, C.wood), stroke("M512 520V500M530 520L540 498", C.grey, 4), `<circle cx="548" cy="510" r="6" fill="${C.yellow}" opacity=".85"/>`);
  // La cliente admirative montre la statuette
  g.push(person({ x: 660, y: 578, s: 1.04, flip: true, skin: SKIN.s5, hair: { type: "boxbraids", beads: C.ocre }, robe: "kaba", top: C.green, wax: "kitenge", face: "laugh",
    point: [150, -190], arms: { r: [[54, -176], [80, -190]], l: [[-40, -150], [-38, -110]] },
    lhand: (hx, hy) => `<path d="M${hx - 14} ${hy + 2}H${hx + 14}L${hx + 18} ${hy + 30}H${hx - 18}Z" fill="${C.terra}"/>` + stroke(`M${hx - 8} ${hy + 2}Q${hx} ${hy - 10} ${hx + 8} ${hy + 2}`, C.wood2, 3) + hand(hx, hy, SKIN.s5) }));
  return frame(g.join(""), C.cream);
}

/* ---------- Poteries ---------- */
/** Jarre (pied en x,y, largeur w, hauteur h) avec un décor incisé. */
const jar = (x, y, w, h, col = C.rose, deco = C.wood2) => {
  const r = w / 2, n = r * 0.42;
  return `<path d="M${f(x - n)} ${f(y - h)}Q${f(x - n * 0.7)} ${f(y - h * 0.85)} ${f(x - r)} ${f(y - h * 0.55)}Q${f(x - r * 1.05)} ${f(y - h * 0.1)} ${f(x - r * 0.4)} ${f(y)}H${f(x + r * 0.4)}Q${f(x + r * 1.05)} ${f(y - h * 0.1)} ${f(x + r)} ${f(y - h * 0.55)}Q${f(x + n * 0.7)} ${f(y - h * 0.85)} ${f(x + n)} ${f(y - h)}Z" fill="${col}"/>` +
    `<ellipse cx="${f(x)}" cy="${f(y - h)}" rx="${f(n * 1.25)}" ry="${f(h * 0.05 + 2)}" fill="${deco}"/>` +
    stroke(`M${f(x - r * 0.88)} ${f(y - h * 0.62)}l${f(r * 0.22)} ${f(h * 0.08)}l${f(r * 0.22)} ${f(-h * 0.08)}l${f(r * 0.22)} ${f(h * 0.08)}l${f(r * 0.22)} ${f(-h * 0.08)}l${f(r * 0.22)} ${f(h * 0.08)}l${f(r * 0.22)} ${f(-h * 0.08)}l${f(r * 0.22)} ${f(h * 0.08)}l${f(r * 0.22)} ${f(-h * 0.08)}`, deco, 2) +
    `<path d="M${f(x - r * 0.62)} ${f(y - h * 0.5)}Q${f(x - r * 0.7)} ${f(y - h * 0.22)} ${f(x - r * 0.4)} ${f(y - h * 0.1)}" stroke="${C.white}" stroke-width="3" fill="none" opacity=".25" stroke-linecap="round"/>`;
};
/** Canari : pot rond à large ouverture (pied en x,y, largeur w). */
const canari = (x, y, w, col = C.wood, deco = C.wood2) => {
  const r = w / 2, h = w * 0.78;
  return `<path d="M${f(x - r * 0.6)} ${f(y - h)}Q${f(x - r * 1.15)} ${f(y - h * 0.7)} ${f(x - r)} ${f(y - h * 0.35)}Q${f(x - r * 0.8)} ${f(y)} ${f(x)} ${f(y)}Q${f(x + r * 0.8)} ${f(y)} ${f(x + r)} ${f(y - h * 0.35)}Q${f(x + r * 1.15)} ${f(y - h * 0.7)} ${f(x + r * 0.6)} ${f(y - h)}Z" fill="${col}"/>` +
    `<ellipse cx="${f(x)}" cy="${f(y - h)}" rx="${f(r * 0.66)}" ry="${f(h * 0.08)}" fill="${deco}"/>` + stroke(`M${f(x - r * 0.9)} ${f(y - h * 0.6)}Q${f(x)} ${f(y - h * 0.5)} ${f(x + r * 0.9)} ${f(y - h * 0.6)}`, deco, 2.4) +
    [-0.5, -0.17, 0.17, 0.5].map((k) => `<circle cx="${f(x + r * k * 1.4)}" cy="${f(y - h * 0.44)}" r="2" fill="${deco}"/>`).join("");
};

/* ---------- Scène 2 : la potière ---------- */
function poterie() {
  const g = [];
  g.push(`<circle cx="690" cy="86" r="38" fill="${C.yellow}"/><circle cx="690" cy="86" r="58" fill="${C.yellow}" opacity=".25"/>`, cloud(380, 70, 0.8), cloud(560, 150, 0.55));
  g.push(`<path d="M0 340Q180 290 360 330T800 318V460H0Z" fill="${C.leaf}" opacity=".32"/>`);
  g.push(palm(300, 430, 0.95, 10), palm(770, 440, 0.8, -12));
  // Terre rouge
  g.push(rect(0, 420, 800, 180, C.rose), `<path d="M0 470Q400 450 800 476V600H0Z" fill="${C.wood}" opacity=".2"/>`);
  for (const [x, y] of [[440, 590], [620, 584], [90, 590]]) g.push(`<ellipse cx="${x}" cy="${y}" rx="30" ry="5" fill="${C.wood2}" opacity=".15"/>`);
  // La case ronde au toit de paille
  g.push(`<path d="M30 300H230V440H30Z" fill="${C.sand2}"/><path d="M30 412H230V440H30Z" fill="${C.wood}" opacity=".35"/>`);
  g.push(`<path d="M92 440V356Q92 340 108 340H124Q140 340 140 356V440Z" fill="${C.wood2}"/>`, rect(170, 350, 36, 30, C.wood2, ' rx="3"'));
  g.push(`<path d="M10 312L130 196L250 312Q130 324 10 312Z" fill="${C.ocre}"/>`, stroke("M40 300L130 206M80 306L130 210M130 310V206M180 306L130 210M220 300L130 206", C.wood, 2.4, ' opacity=".6"'), `<path d="M10 312Q130 324 250 312L246 302Q130 314 14 302Z" fill="${C.wood}" opacity=".5"/>`);
  // Planche des jarres qui sèchent au soleil
  g.push(rect(390, 452, 376, 10, C.wood, ' rx="3"'), rect(400, 462, 10, 24, C.wood2), rect(748, 462, 10, 24, C.wood2), rect(590, 462, 10, 24, C.wood2));
  g.push(jar(420, 452, 50, 84, C.wood), canari(478, 452, 54, C.rose), jar(540, 452, 46, 92, C.rose), canari(650, 452, 60, C.wood), jar(718, 452, 52, 80, C.wood2, C.dark));
  // Au sol, une jarre finie et la motte d'argile, le bol d'eau
  g.push(jar(70, 572, 64, 104, C.wood2, C.dark), canari(132, 574, 48, C.wood));
  g.push(`<path d="M500 566Q504 540 530 540Q558 540 560 566Z" fill="${C.wood}"/><path d="M512 552Q530 544 548 554" stroke="${C.wood2}" stroke-width="2" fill="none"/>`);
  g.push(`<path d="M448 568Q446 548 474 548Q500 548 498 568Z" fill="${C.indigo}"/><ellipse cx="473" cy="549" rx="25" ry="5" fill="${C.blue}"/>`);
  // La potière assise façonne une jarre sur son support
  const px = 228, py = 572, ps = 1.08;
  g.push(at(px, py, ps, false, `<ellipse cx="-2" cy="-98" rx="36" ry="7" fill="${C.wood2}"/><rect x="-30" y="-98" width="10" height="92" fill="${C.wood2}"/><rect x="20" y="-98" width="10" height="92" fill="${C.wood2}"/>`));
  g.push(person({ x: px, y: py, s: ps, legs: "sit", skin: SKIN.s3, hair: { type: "foulard", color: C.green, wax: "wax3" }, top: C.terra, wax: "wax2", sleeve: "short", bottom: C.indigo, bwax: "wax1", face: "smile",
    arms: { l: [[-2, -140], [42, -140]], r: [[66, -150], [100, -140]] } }));
  g.push(at(px, py, ps, false, `<path d="M44 0Q38 -60 58 -94H92Q112 -60 106 0Z" fill="${C.wood2}"/><ellipse cx="75" cy="-94" rx="22" ry="5" fill="${C.dark}" opacity=".4"/>` +
    jar(72, -94, 68, 86, C.rose) + `<path d="M64 -150Q72 -144 80 -152" stroke="${C.sand2}" stroke-width="2.5" fill="none" stroke-linecap="round"/>` + hand(42, -140, SKIN.s3) + hand(100, -140, SKIN.s3)));
  // Deux enfants regardent
  g.push(person({ x: 362, y: 560, s: 0.6, flip: true, skin: SKIN.s1, hair: { type: "puffs" }, top: C.ocre, wax: "wax1", sleeve: "short", bottom: C.green, legs: "skirt", face: "laugh",
    point: [120, -190], arms: { r: [[52, -170], [76, -186]], l: [[-40, -150], [-36, -110]] } }));
  g.push(person({ x: 420, y: 564, s: 0.66, flip: true, skin: SKIN.s4, hair: { type: "short" }, top: C.indigo, dashiki: C.ocre, sleeve: "short", bottom: C.wood2, face: "smile" }));
  // L'apprentie pose un canari frais sur la planche
  const ax = 590, ay = 578, as = 1.04;
  g.push(person({ x: ax, y: ay, s: as, flip: true, skin: SKIN.s5, hair: { type: "bantu" }, top: C.green, wax: "wax3", sleeve: "short", bottom: C.ocre, bwax: "kente", legs: "skirt", face: "talk",
    arms: { r: [[44, -150], [36, -118]], l: [[-44, -150], [-34, -120]] } }));
  g.push(at(ax, ay, as, true, canari(0, -96, 74, C.rose) + hand(36, -118, SKIN.s5) + hand(-34, -120, SKIN.s5)));
  // Bulle : la jarre
  g.push(bubble(470, 96, `<path d="M-8 -16Q-8 -12 -14 -4Q-18 6 -10 14H10Q18 6 14 -4Q8 -12 8 -16Z" fill="${C.white}"/><rect x="-11" y="-20" width="22" height="5" rx="2" fill="${C.white}"/>`, C.terra));
  g.push(`<circle cx="420" cy="166" r="5" fill="${C.terra}" opacity=".5"/><circle cx="398" cy="190" r="3.5" fill="${C.terra}" opacity=".4"/>`);
  return frame(g.join(""), C.sand);
}

/* ---------- Scène 3 : le taxi jaune ---------- */
function taxi() {
  const g = [];
  g.push(cloud(60, 70, 0.8), cloud(520, 54, 0.9), cloud(700, 120, 0.55));
  // Collines de Yaoundé et immeubles
  g.push(`<path d="M0 250Q120 180 260 230Q400 160 560 220Q680 180 800 210V420H0Z" fill="${C.leaf}" opacity=".35"/>`);
  const blds = [[60, 236, 46, 90, C.white], [118, 214, 38, 112, C.rose], [300, 200, 44, 130, C.white], [354, 230, 52, 96, C.sand2], [470, 178, 40, 150, C.blue], [520, 212, 56, 110, C.white], [640, 206, 44, 120, C.ocre], [700, 230, 50, 100, C.white]];
  for (const [x, y, w, h, col] of blds) {
    g.push(rect(x, y, w, h, col), rect(x, y, w, 6, C.dark, ' opacity=".12"'));
    for (let yy = y + 14; yy < y + h - 12; yy += 18) for (let xx = x + 7; xx < x + w - 8; xx += 13) g.push(rect(xx, yy, 7, 9, C.indigo, ' opacity=".35"'));
  }
  g.push(`<path d="M0 316Q160 280 330 320Q520 286 800 312V420H0Z" fill="${C.leaf2}" opacity=".45"/>`);
  g.push(palm(620, 404, 0.9, -10), palm(84, 404, 0.75, 10));
  // Trottoir du fond, chaussée, trottoir de devant
  g.push(rect(0, 396, 800, 30, C.sand2), rect(0, 424, 800, 6, C.steel));
  g.push(rect(0, 430, 800, 124, C.grey), rect(0, 430, 800, 124, C.dark, ' opacity=".15"'));
  for (let x = 20; x < 800; x += 90) g.push(rect(x, 488, 46, 5, C.white, ' opacity=".7"'));
  g.push(rect(0, 548, 800, 10, C.steel), rect(0, 558, 800, 42, C.sand2));
  // Le taxi : carrosserie jaune, vitres, roues
  g.push(`<ellipse cx="400" cy="540" rx="290" ry="12" fill="${C.dark}" opacity=".25"/>`);
  g.push(`<path d="M290 404L350 320Q356 312 366 312H540Q552 312 558 320L612 404Z" fill="${C.yellow}"/>`);
  g.push(rect(452, 300, 56, 14, C.yellow, ' rx="4"'), rect(452, 306, 56, 4, C.dark, ' opacity=".6"'));
  const winF = "M314 398L360 328H446V398Z", winR = "M460 328H534L582 398H460Z";
  g.push(`<path d="${winF}" fill="${C.sky}"/><path d="${winR}" fill="${C.sky}"/>`);
  g.push(`<clipPath id="taxi-rear"><path d="${winR}"/></clipPath><clipPath id="taxi-front"><path d="${winF}"/></clipPath>`);
  // Les passagers à l'arrière
  g.push(`<g clip-path="url(#taxi-rear)">`, rect(458, 326, 130, 74, C.dark, ' opacity=".12"'),
    person({ x: 490, y: 506, s: 0.62, legs: "none", skin: SKIN.s1, hair: { type: "gele", color: C.ocre, wax: "wax1" }, top: C.ocre, wax: "wax1", face: "smile" }),
    person({ x: 542, y: 508, s: 0.6, legs: "none", skin: SKIN.s3, hair: { type: "short" }, beard: true, top: C.white, dashiki: C.green, face: "laugh" }), `</g>`);
  // Le chauffeur, au volant
  g.push(`<g clip-path="url(#taxi-front)">`, rect(312, 326, 136, 74, C.dark, ' opacity=".12"'),
    person({ x: 404, y: 516, s: 0.7, flip: true, legs: "none", skin: SKIN.s2, hair: { type: "short" }, hat: { type: "cap", color: C.indigo }, top: C.white, face: "talk" }), `</g>`);
  // Carrosserie basse
  g.push(`<path d="M130 476Q128 422 174 414L292 400H608Q662 404 670 444L672 484Q672 504 652 504H150Q130 504 130 484Z" fill="${C.yellow}"/>`);
  g.push(`<path d="M130 476Q128 422 174 414L292 400H608Q662 404 670 444L672 470H130Z" fill="${C.white}" opacity=".12"/>`);
  for (let i = 0; i < 18; i++) g.push(rect(300 + i * 16, 444 + (i % 2) * 8, 8, 8, C.dark, ' opacity=".8"'));
  g.push(stroke("M300 404V500M452 400V500M590 404L594 496", C.dark, 2, ' opacity=".3"'), rect(424, 418, 18, 5, C.dark, ' rx="2" opacity=".55"'), rect(566, 418, 18, 5, C.dark, ' rx="2" opacity=".55"'));
  g.push(`<path d="M124 470H150V500H128Q122 500 122 494Z" fill="${C.steel}"/><path d="M652 470H676V494Q676 500 670 500H652Z" fill="${C.steel}"/>`);
  g.push(`<ellipse cx="142" cy="432" rx="10" ry="8" fill="${C.white}"/><ellipse cx="142" cy="432" rx="6" ry="5" fill="${C.yellow}"/>`, rect(658, 424, 12, 16, C.red, ' rx="3"'));
  for (const wx of [226, 560]) g.push(`<path d="M${wx - 48} 504Q${wx - 48} 452 ${wx} 452Q${wx + 48} 452 ${wx + 48} 504Z" fill="${C.dark}" opacity=".85"/><circle cx="${wx}" cy="508" r="38" fill="${C.dark}"/><circle cx="${wx}" cy="508" r="17" fill="${C.steel}"/><circle cx="${wx}" cy="508" r="6" fill="${C.grey}"/>`);
  // Rétroviseur
  g.push(`<path d="M316 392Q300 390 300 378Q302 368 314 370L322 386Z" fill="${C.dark}"/>`);
  // Le bras du chauffeur, coude à la portière, la main qui accueille
  g.push(stroke("M384 392L340 404", C.white, 11), `<circle cx="338" cy="404" r="6" fill="${C.white}"/>`, stroke("M338 404L322 384", SKIN.s2, 8.4), hand(322, 382, SKIN.s2).replace('r="7.5"', 'r="5.6"'));
  // La cliente en tailleur wax annonce sa destination
  const cx = 230, cy = 580, cs = 1.02;
  g.push(person({ x: cx, y: cy, s: cs, skin: SKIN.s4, hair: { type: "fulani", beads: C.ocre }, top: C.terra, wax: "wax1", bottom: C.terra, bwax: "wax1", legs: "skirt", shoes: C.dark, face: "talk",
    point: [140, -250], arms: { r: [[52, -184], [76, -212]], l: [[-40, -150], [-40, -112]] },
    lhand: (hx, hy) => `<path d="M${hx - 16} ${hy + 6}H${hx + 16}L${hx + 20} ${hy + 40}H${hx - 20}Z" fill="${C.indigo}"/>` + rect(hx - 20, hy + 20, 40, 5, C.ocre) + stroke(`M${hx - 10} ${hy + 6}Q${hx} ${hy - 10} ${hx + 10} ${hy + 6}`, C.dark, 3) + hand(hx, hy, SKIN.s4) }));
  // Revers du tailleur
  g.push(at(cx, cy, cs, false, `<path d="M-12 -206L-2 -160L-20 -180Z" fill="${C.white}" opacity=".85"/><path d="M12 -206L2 -160L20 -180Z" fill="${C.white}" opacity=".85"/><circle cx="0" cy="-140" r="2.5" fill="${C.dark}"/><circle cx="0" cy="-124" r="2.5" fill="${C.dark}"/>`));
  // Le vendeur de cartes de recharge sous son parasol
  g.push(stroke("M706 236V560", C.dark, 4), `<path d="M640 270Q706 200 772 270Z" fill="${C.terra}"/>`, `<path d="M678 270L706 214L734 270Z" fill="${C.white}" opacity=".85"/>`);
  g.push(rect(630, 470, 132, 10, C.wood, ' rx="2"'), rect(638, 480, 8, 92, C.wood2), rect(746, 480, 8, 92, C.wood2), rect(630, 480, 132, 40, C.green));
  for (let i = 0; i < 5; i++) g.push(rect(640 + i * 24, 456, 18, 12, [C.ocre, C.terra, C.indigo, C.white, C.yellow][i], ' rx="2"'));
  g.push(person({ x: 704, y: 584, s: 0.98, flip: true, skin: SKIN.s3, hair: { type: "locks" }, top: C.ocre, wax: "bogolan", sleeve: "short", bottom: C.indigo, face: "smile",
    arms: { r: [[52, -170], [70, -206]], l: [[-40, -150], [-36, -110]] },
    rhand: (hx, hy) => `<g transform="translate(${hx} ${hy - 10})">${[[-24, C.ocre], [-8, C.terra], [8, C.indigo]].map(([r, col]) => `<rect x="-7" y="-22" width="14" height="22" rx="2" fill="${col}" transform="rotate(${r} 0 0)"/>`).join("")}</g>` + hand(hx, hy, SKIN.s3) }));
  // Bulle : la destination
  const pin = `<path d="M0 16Q-14 0 -14 -6A14 14 0 0 1 14 -6Q14 0 0 16Z" fill="${C.white}"/><circle cx="0" cy="-6" r="5" fill="${C.indigo}"/>`;
  g.push(bubble(130, 126, pin, C.indigo));
  g.push(`<circle cx="180" cy="196" r="5" fill="${C.indigo}" opacity=".5"/><circle cx="198" cy="220" r="3.5" fill="${C.indigo}" opacity=".4"/>`);
  return frame(g.join(""), C.sky);
}

export default [
  { id: "bronze", fr: "L'atelier du bronzier", en: "The bronze caster's workshop",
    tags: ["bronze", "bronzier", "fonderie", "atelier", "artisan", "artisanat", "Foumban", "Bamoun", "masque", "statuette", "four", "creuset", "apprenti", "ndop", "boubou", "kufi", "bronze caster", "foundry", "workshop", "craft", "craftsman", "mask", "statue", "furnace", "crucible", "apprentice"], draw: bronze },
  { id: "poterie", fr: "La potière", en: "The potter",
    tags: ["poterie", "potière", "jarre", "canari", "argile", "terre", "artisanat", "apprentie", "enfants", "case", "village", "terre rouge", "foulard", "bantu knots", "pottery", "potter", "jar", "clay pot", "clay", "craft", "apprentice", "children", "hut", "village"], draw: poterie },
  { id: "taxi", fr: "Taxi jaune", en: "Yellow taxi",
    tags: ["taxi", "taxi jaune", "Yaoundé", "rue", "ville", "chauffeur", "cliente", "passagers", "destination", "transport", "wax", "tailleur", "vendeur", "carte de recharge", "crédit", "parasol", "yellow taxi", "street", "city", "driver", "passengers", "transport", "street vendor", "phone credit", "top-up card"], draw: taxi },
];
