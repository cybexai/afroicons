// Scènes : le défilé de la fête nationale, le mariage à la mairie, la visite au nouveau-né.
import { C, SKIN, person, frame, palm, plant, cloud, bubble, stroke, f } from "./lib.mjs";
import { flag } from "./flag.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${r}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
/** Aplat avec un motif par-dessus. */
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");
/** Position dans la scène d'un point local (hx, hy) d'un personnage. */
const toScene = (x, y, s, flip, hx, hy) => [x + (flip ? -hx : hx) * s, y + hy * s];
/** Guirlande de fanions entre deux points, qui pend au milieu. */
const bunting = (x0, y0, x1, y1, sag, n, cols) => {
  const out = [stroke(`M${x0} ${y0}Q${(x0 + x1) / 2} ${(y0 + y1) / 2 + sag * 2} ${x1} ${y1}`, C.wood2, 2)];
  const d = cols.map(() => "");
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n, u = 1 - t;
    const px = u * u * x0 + 2 * u * t * (x0 + x1) / 2 + t * t * x1, py = u * u * y0 + 2 * u * t * ((y0 + y1) / 2 + sag * 2) + t * t * y1;
    d[i % cols.length] += `M${Math.round(px - 10)} ${Math.round(py)}h20l-10 24Z`;
  }
  return out.join("") + cols.map((c, i) => `<path d="${d[i]}" fill="${c}"/>`).join("");
};
/** Drapeau du défilé, dessiné une fois dans les defs de la scène et réutilisé (même repère que flag()). */
const flagUse = (x, y, w) => `<use href="#defile-drapeau" transform="translate(${f(x)} ${f(y)}) scale(${f(w / 22 * 100) / 100})"/>`;
/** Spectateur en buste (léger, pour la foule) : repère local d'un person(), cache sous la barrière. */
const fan = (x, y, s, skin, hair, hcol, top, wax, up, face) => {
  const o = [];
  if (hair === "afro") o.push(`<circle cx="0" cy="-248" r="34" fill="${hcol}"/>`);
  o.push(rect(-7, -220, 14, 22, skin), cloth("M-30 -184Q-30 -206 -12 -206H12Q30 -206 30 -184L28 -100H-28Z", top, wax), `<path d="M-10 -206L0 -192L10 -206Z" fill="${skin}"/>`);
  o.push(up ? stroke("M27 -192L54 -214L60 -262", top, 15) + stroke("M-27 -192L-40 -150L-36 -112", top, 15) + hand(60, -262, skin)
    : stroke("M-27 -192L-36 -160L-6 -176M27 -192L36 -160L6 -176", top, 15) + hand(-6, -176, skin) + hand(6, -176, skin));
  o.push(`<ellipse cx="0" cy="-238" rx="21" ry="25" fill="${skin}"/>`);
  if (hair === "foulard") o.push(`<path d="M-23 -243Q-31 -270 -15 -288Q2 -305 21 -295Q34 -285 28 -262Q27 -251 23 -243Q0 -259 -23 -243Z" fill="${hcol}"/><path d="M12 -293Q29 -312 39 -298Q35 -284 22 -286Z" fill="${hcol}"/>`);
  else if (hair === "bantu") o.push(`<path d="M-22 -236Q-24 -266 0 -266Q24 -266 22 -236Q12 -252 0 -254Q-12 -252 -22 -236Z" fill="${hcol}"/>` + [[-15, -260], [0, -268], [15, -260]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="7" fill="${hcol}"/>`).join(""));
  else o.push(`<path d="M-23 -230Q-25 -268 0 -268Q25 -268 23 -230Q16 -252 0 -254Q-16 -252 -23 -230Z" fill="${hcol}"/>`);
  o.push(`<ellipse cx="-8" cy="-237" rx="2.6" ry="3.1" fill="#0E0907"/><ellipse cx="8" cy="-237" rx="2.6" ry="3.1" fill="#0E0907"/><circle cx="-7.1" cy="-238.2" r=".9" fill="#fff"/><circle cx="8.9" cy="-238.2" r=".9" fill="#fff"/>`);
  o.push(face === "laugh" ? `<path d="M-7 -223Q0 -224 7 -223Q6 -216 0 -216Q-6 -216 -7 -223Z" fill="#7E2F25"/>` : stroke("M-6 -223Q0 -218 6 -223", "#7E2F25", 2.4));
  return at(x, y, s, false, o.join(""));
};
const heart = (s = 1) => `<path transform="scale(${s})" d="M0 13C-26 -4 -17 -24 0 -12C17 -24 26 -4 0 13Z" fill="${C.white}"/>`;

/* ---------- Scène 1 : le défilé de la fête nationale ---------- */
function defile() {
  const g = [];
  g.push(rect(0, 0, 800, 300, C.blue, ' opacity=".14"'), cloud(60, 54, 0.8));
  // La ville derrière : immeubles, palmiers
  g.push(`<defs><pattern id="defile-fen" width="22" height="26" patternUnits="userSpaceOnUse"><rect x="6" y="6" width="10" height="14" fill="${C.grey}" opacity=".45"/></pattern><g id="defile-drapeau">${flag(0, 0, 22)}</g></defs>`);
  for (const [x, y, w, col, op] of [[0, 196, 120, C.sand2, 1], [110, 160, 96, C.white, 1], [196, 210, 120, C.rose, 0.55], [306, 176, 90, C.sand, 1], [386, 224, 100, C.white, 1]]) {
    g.push(rect(x, y, w, 360 - y, col, op < 1 ? ` opacity="${op}"` : ""), rect(x + 6, y + 10, w - 16, 340 - y, "url(#defile-fen)"));
  }
  g.push(palm(430, 360, 0.8, -10));
  // Guirlandes de fanions au-dessus de l'avenue
  const bc = [C.green, C.yellow, C.red, C.ocre, C.terra];
  g.push(bunting(0, 92, 486, 152, 22, 13, bc));

  /* La tribune officielle, à droite */
  g.push(rect(486, 150, 8, 240, C.wood2), rect(788, 150, 8, 240, C.wood2));
  // Mâts et drapeaux au-dessus de l'auvent
  g.push(stroke("M560 140V48", C.grey, 4), flagUse(562, 50, 54), stroke("M700 140V48", C.grey, 4), flagUse(702, 50, 54));
  g.push(`<path d="M474 150L500 118H790L806 150Z" fill="${C.terra}"/>`);
  for (const k of [0, 1]) g.push(`<path d="${[...Array(6)].map((_, i) => `M${476 + (2 * i + k) * 30} 150h30q-15 22 -30 0Z`).join("")}" fill="${k ? C.terra : C.white}"/>`);
  g.push(rect(494, 172, 296, 140, C.sand, ' opacity=".55"'));
  // Les officiels debout derrière la balustrade
  const os = 0.64;
  g.push(person({ x: 550, y: 372, s: os, legs: "none", skin: SKIN.s2, hair: { type: "rase" }, beard: true, top: C.dark, jacket: { color: C.dark, shirt: C.white, tie: C.red }, face: "smile",
    arms: { l: [[-36, -160], [-6, -178]], r: [[36, -160], [6, -178]] } }));
  g.push(person({ x: 638, y: 372, s: os, legs: "none", skin: SKIN.s3, robe: "agbada", top: C.white, hat: { type: "kufi", color: C.indigo, wax: "ndop" }, face: "laugh",
    arms: { r: [[54, -214], [62, -262]], l: [[-40, -150], [-38, -112]] } }));
  g.push(person({ x: 726, y: 372, s: os, legs: "none", skin: SKIN.s4, robe: "kaba", top: C.green, hair: { type: "gele", color: C.ocre }, face: "talk",
    arms: { l: [[-50, -212], [-58, -258]], r: [[40, -150], [38, -112]] } }));
  // Petit drapeau dans la main de la dame
  const [lfx, lfy] = toScene(726, 372, os, false, -58, -258);
  g.push(stroke(`M${f(lfx)} ${f(lfy + 4)}V${f(lfy - 34)}`, C.wood2, 2.5), flagUse(lfx + 1, lfy - 34, 22), hand(lfx, lfy, SKIN.s4, 4.8));
  // Balustrade drapée de pagne, bande de kente
  g.push(rect(480, 312, 320, 92, C.green), rect(480, 312, 320, 92, "url(#wax1)", ' opacity=".55"'), rect(480, 306, 320, 16, "url(#kente)"), rect(476, 302, 328, 6, C.wood2, ' rx="3"'));
  for (let x = 520; x < 800; x += 40) g.push(stroke(`M${x} 324V402`, C.dark, 2, ' opacity=".15"'));
  // Micro sur pied devant l'officiel
  g.push(stroke("M520 302V258", C.dark, 3), `<rect x="514" y="246" width="12" height="16" rx="6" fill="${C.dark}"/>`);

  /* La foule derrière les barrières, à gauche, qui agite des petits drapeaux */
  const crowd = [
    [30, SKIN.s2, { type: "foulard", color: C.terra }, C.ocre, null, true, "laugh"],
    [100, SKIN.s1, { type: "bantu" }, C.yellow, null, true, "laugh"],
    [170, SKIN.s3, { type: "foulard", color: C.green }, C.terra, "wax1", true, "talk"],
    [240, SKIN.s2, { type: "bantu" }, C.indigo, null, true, "smile"],
    [310, SKIN.s4, { type: "rase" }, "#15110F", "toghu", true, "laugh"],
    [380, SKIN.s3, { type: "afro" }, C.ocre, null, false, "smile"],
    [450, SKIN.s1, { type: "foulard", color: C.indigo }, C.terra, "wax2", true, "laugh"],
  ];
  const cs = 0.52, cy = 404;
  for (const [x, skin, hair, top, wax, up, face] of crowd) {
    g.push(fan(x, cy, cs, skin, hair.type, hair.color ?? "#17100D", top, wax, up, face));
    if (up) { const [hx, hy] = toScene(x, cy, cs, false, 60, -262); g.push(stroke(`M${f(hx)} ${f(hy + 4)}V${f(hy - 32)}`, C.wood2, 2.2), flagUse(hx + 1, hy - 32, 22), hand(hx, hy, skin, 4)); }
  }
  g.push(rect(0, 352, 480, 6, C.steel, ' rx="3"'), rect(0, 376, 480, 5, C.steel), rect(0, 398, 480, 6, C.steel));
  for (let x = 14; x < 480; x += 30) g.push(rect(x, 352, 4, 52, C.steel));

  /* L'avenue */
  g.push(rect(0, 404, 800, 196, C.steel), rect(0, 404, 800, 196, C.grey, ' opacity=".35"'), rect(0, 404, 800, 10, C.white, ' opacity=".8"'));
  for (let x = 20; x < 800; x += 90) g.push(rect(x, 590, 50, 6, C.white, ' opacity=".7"'));

  /* Les élèves en uniforme, au pas */
  const fwd = (side) => side === "l" ? { l: [[-46, -160], [-20, -178]], r: [[40, -150], [52, -110]] } : { r: [[46, -160], [20, -178]], l: [[-40, -150], [-52, -110]] };
  const uni = { top: C.ocre, sleeve: "short", bottom: C.indigo, shoes: C.dark };
  g.push(person({ x: 500, y: 532, s: 0.8, legs: "walk", skin: SKIN.s1, hair: { type: "short" }, ...uni, face: "smile", arms: fwd("r") }));
  // L'élève de tête porte le drapeau
  const ex = 650, ey = 540, es = 0.82;
  g.push(person({ x: ex, y: ey, s: es, legs: "walkskirt", skin: SKIN.s4, hair: { type: "nattes" }, ...uni, face: "smile",
    arms: { r: [[44, -168], [30, -196]], l: [[-34, -160], [22, -160]] } }));
  const [p1x, p1y] = toScene(ex, ey, es, false, 30, -196), [p2x, p2y] = toScene(ex, ey, es, false, 22, -160);
  g.push(stroke(`M${f(p2x + 1)} ${f(p2y + 40)}L${f(p1x - 3)} 270`, C.wood2, 4.5), `<circle cx="${f(p1x - 3)}" cy="268" r="4" fill="${C.yellow}"/>`, flagUse(p1x - 1, 272, 58));
  g.push(hand(p1x, p1y, SKIN.s4, 6.2), hand(p2x, p2y, SKIN.s4, 6.2));
  // Écharpe de kente en travers de l'uniforme
  for (const [x, y, s] of [[500, 532, 0.8], [650, 540, 0.82]]) g.push(at(x, y, s, false, `<path d="M-24 -204L-14 -206L28 -126L18 -118Z" fill="url(#kente)"/>`));

  /* La fanfare : le tambour et la trompette */
  const dx = 120, dy = 574, ds = 1, dskin = SKIN.s2;
  g.push(person({ x: dx, y: dy, s: ds, legs: "walk", skin: dskin, hair: { type: "short" }, hat: { type: "kufi", color: C.red }, top: C.white, bottom: C.indigo, face: "laugh",
    arms: { l: [[-48, -152], [-24, -170]], r: [[48, -150], [28, -178]] } }));
  g.push(at(dx, dy, ds, false,
    `<path d="M-24 -204L-14 -206L28 -126L18 -118Z" fill="url(#kente)"/>` + stroke("M-20 -200L30 -140", C.wood2, 3) +
    `<rect x="-44" y="-146" width="88" height="70" fill="${C.terra}"/><rect x="-44" y="-146" width="88" height="70" fill="url(#wax2)" opacity=".5"/>` +
    stroke("M-44 -146L-22 -76L0 -146L22 -76L44 -146", C.white, 2.5) + `<ellipse cx="0" cy="-76" rx="44" ry="9" fill="${C.wood2}"/><ellipse cx="0" cy="-146" rx="44" ry="10" fill="${C.cream}"/>` +
    `<ellipse cx="0" cy="-146" rx="44" ry="10" fill="none" stroke="${C.wood2}" stroke-width="4"/>` +
    stroke("M-24 -170L-8 -150", C.wood2, 4) + `<circle cx="-7" cy="-149" r="4" fill="${C.cream}"/>` + stroke("M28 -178L14 -156", C.wood2, 4) + `<circle cx="13" cy="-154" r="4" fill="${C.cream}"/>` +
    hand(-24, -170, dskin) + hand(28, -178, dskin)));
  const tx = 262, ty = 562, ts = 0.96, tskin = SKIN.s5;
  g.push(person({ x: tx, y: ty, s: ts, legs: "walkskirt", skin: tskin, hair: { type: "nattes" }, hat: { type: "kufi", color: C.red }, top: C.white, bottom: C.indigo, face: "calm",
    arms: { r: [[46, -176], [34, -214]], l: [[-28, -170], [14, -206]] } }));
  g.push(at(tx, ty, ts, false,
    `<path d="M-24 -204L-14 -206L28 -126L18 -118Z" fill="url(#kente)"/>` +
    // Joues gonflées de la trompettiste
    `<circle cx="-11" cy="-225" r="5" fill="${C.rose}" opacity=".45"/><circle cx="11" cy="-225" r="5" fill="${C.rose}" opacity=".45"/>` +
    // La trompette : embouchure aux lèvres, pavillon vers la droite
    `<g transform="rotate(-12 2 -222)">` + stroke("M2 -222H70", C.yellow, 5) + stroke("M22 -212H62", C.yellow, 4) + stroke("M22 -222V-212M62 -222V-212", C.yellow, 3) +
    `<path d="M68 -228L96 -240V-204L68 -216Z" fill="${C.yellow}"/><ellipse cx="96" cy="-222" rx="5" ry="18" fill="${C.ocre}"/>` +
    `<rect x="34" y="-232" width="4" height="10" fill="${C.yellow}"/><rect x="42" y="-232" width="4" height="10" fill="${C.yellow}"/><rect x="50" y="-232" width="4" height="10" fill="${C.yellow}"/>` +
    `<ellipse cx="2" cy="-222" rx="4" ry="5" fill="${C.ocre}"/></g>` + hand(34, -214, tskin) + hand(14, -206, tskin)));
  // Notes de musique
  for (const [nx, ny] of [[340, 250], [372, 222]]) g.push(`<ellipse cx="${nx}" cy="${ny}" rx="7" ry="5.5" fill="${C.indigo}"/>`, stroke(`M${nx + 6} ${ny}V${ny - 30}L${nx + 18} ${ny - 24}`, C.indigo, 3));
  return frame(g.join(""), C.sky);
}

/* ---------- Scène 2 : le mariage à la mairie ---------- */
function mairie() {
  const g = [];
  g.push(`<defs><pattern id="mairie-or" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M9 2L16 9L9 16L2 9Z" fill="none" stroke="${C.yellow}" stroke-width="1.8"/><circle cx="9" cy="9" r="2.2" fill="${C.wood}"/><circle cx="0" cy="0" r="1.6" fill="${C.yellow}"/><circle cx="18" cy="0" r="1.6" fill="${C.yellow}"/><circle cx="0" cy="18" r="1.6" fill="${C.yellow}"/><circle cx="18" cy="18" r="1.6" fill="${C.yellow}"/></pattern></defs>`);
  g.push(rect(0, 0, 800, 320, C.sky), cloud(60, 60, 0.8), cloud(640, 46, 0.7));
  /* Façade de la mairie : deux ailes, avant-corps à colonnes et fronton, drapeau */
  g.push(rect(80, 176, 640, 250, C.sand), rect(74, 166, 652, 14, C.white), rect(80, 330, 640, 8, C.white, ' opacity=".7"'));
  for (const wx of [110, 180, 570, 640]) for (const wy of [204, 270]) {
    g.push(rect(wx, wy, 46, 50, C.indigo, ' opacity=".7"'), stroke(`M${wx + 23} ${wy}V${wy + 50}M${wx} ${wy + 24}H${wx + 46}`, C.white, 2.5), rect(wx - 4, wy + 50, 54, 5, C.white));
    g.push(rect(wx - 12, wy, 12, 50, C.green), rect(wx + 46, wy, 12, 50, C.green));
  }
  g.push(rect(270, 160, 260, 266, C.cream));
  g.push(`<path d="M262 162L400 106L538 162Z" fill="${C.white}"/><path d="M290 156L400 116L510 156Z" fill="${C.sand}"/>`, `<circle cx="400" cy="140" r="11" fill="${C.white}"/><circle cx="400" cy="140" r="7" fill="${C.ocre}"/>`);
  g.push(stroke("M400 108V34", C.grey, 4), flag(402, 36, 60));
  for (const cx of [292, 340, 460, 508]) g.push(rect(cx - 9, 180, 18, 220, C.white), rect(cx - 13, 176, 26, 8, C.white), rect(cx - 13, 394, 26, 8, C.white), rect(cx + 3, 184, 4, 210, C.sand, ' opacity=".7"'));
  g.push(`<path d="M364 400V268Q364 236 400 236Q436 236 436 268V400Z" fill="${C.wood2}"/><path d="M372 400V270Q372 246 400 246Q428 246 428 270V400Z" fill="${C.wood}"/>`, stroke("M400 248V400", C.wood2, 3));
  g.push(rect(300, 196, 200, 18, C.sand, ' rx="4"'));
  for (let x = 320; x < 490; x += 22) g.push(rect(x, 202, 12, 6, C.wood, ' rx="2" opacity=".5"'));
  // Marches
  g.push(rect(250, 402, 300, 14, C.white), rect(230, 416, 340, 14, C.sand), rect(210, 430, 380, 14, C.white));
  g.push(plant(240, 400, 0.8), plant(560, 400, 0.8), palm(30, 450, 1.1, 18), palm(780, 450, 1.1, -18));
  // Parvis pavé et tapis rouge
  g.push(rect(0, 444, 800, 156, C.sand2));
  for (let y = 470; y < 600; y += 30) g.push(stroke(`M0 ${y}H800`, C.sand, 2));
  g.push(`<path d="M366 402H434L520 600H280Z" fill="${C.red}"/><path d="M366 402H434L438 410H362Z" fill="${C.dark}" opacity=".2"/>`);

  /* La famille de la mariée, en aso-ebi vert */
  const ws = 0.94;
  g.push(person({ x: 96, y: 566, s: ws, robe: "kaba", skin: SKIN.s2, top: C.green, wax: "wax1", hair: { type: "gele", color: C.green, wax: "wax1" }, face: "laugh",
    arms: { r: [[50, -206], [64, -246]], l: [[-40, -150], [-36, -112]] } }));
  g.push(person({ x: 196, y: 552, s: 0.95, robe: "agbada", skin: SKIN.s4, top: C.green, wax: "wax1", hat: { type: "kufi", color: C.green, wax: "wax1" }, beard: true, face: "laugh",
    arms: { l: [[-30, -164], [-4, -176]], r: [[30, -164], [4, -176]] } }));
  // La tante de l'autre côté, en aso-ebi terre
  g.push(person({ x: 598, y: 556, s: 0.94, flip: true, robe: "boubou", skin: SKIN.s3, top: C.terra, wax: "wax2", hair: { type: "gele", color: C.terra, wax: "wax2" }, face: "laugh",
    arms: { r: [[50, -206], [62, -248]], l: [[-40, -150], [-36, -112]] } }));

  /* Les mariés, main dans la main */
  const bx = 336, by = 566, bs = 1, bskin = SKIN.s4;
  g.push(person({ x: bx, y: by, s: bs, robe: "dress", skin: bskin, top: C.white, wax: "mairie-or", hair: { type: "gele", color: C.white, wax: "mairie-or" }, face: "laugh",
    arms: { r: [[44, -160], [56, -128]], l: [[-36, -164], [-8, -150]] } }));
  // Le bouquet de la mariée
  g.push(at(bx, by, bs, false, stroke("M-8 -150L-4 -118M-8 -150L-12 -120", C.leaf2, 3) +
    [[-20, -158, C.rose], [-6, -168, C.red], [6, -158, C.rose], [-12, -146, C.white], [2, -146, C.yellow], [-24, -146, C.red]].map(([cx, cy, c]) => `<circle cx="${cx}" cy="${cy}" r="7" fill="${c}"/>`).join("") +
    `<path d="M-28 -152Q-34 -160 -30 -166L-22 -156Z" fill="${C.leaf}"/><path d="M12 -152Q18 -160 14 -166L8 -156Z" fill="${C.leaf}"/>` + hand(-8, -140, bskin, 6)));
  const gx = 448, gy = 560, gs = 1.02, gskin = SKIN.s2;
  g.push(person({ x: gx, y: gy, s: gs, flip: true, robe: "agbada", skin: gskin, top: C.white, wax: "mairie-or", hat: { type: "kufi", color: C.white, wax: "mairie-or" }, beard: true, face: "smile",
    arms: { r: [[44, -160], [54, -128]], l: [[-50, -212], [-58, -262]] } }));
  const [bhx, bhy] = toScene(bx, by, bs, false, 56, -128);
  g.push(hand(bhx, bhy, bskin, 7.6));
  // Pétales lancés au-dessus des mariés
  const pet = [[250, 220, C.rose, 20], [290, 170, C.white, -30], [330, 200, C.red, 50], [370, 150, C.rose, 10], [410, 190, C.yellow, -40], [450, 160, C.white, 70], [500, 210, C.rose, -20],
    [530, 170, C.red, 30], [310, 250, C.yellow, 80], [470, 240, C.red, -60], [230, 270, C.white, 40], [560, 250, C.yellow, 10], [390, 230, C.white, -15], [270, 210, C.red, 60]];
  for (const [x, y, c, r] of pet) g.push(`<ellipse cx="${x}" cy="${y}" rx="6" ry="3.6" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`);
  // Panier de pétales des deux lanceuses
  for (const [x, y, s, fl] of [[96, 566, ws, false], [598, 556, 0.94, true]]) {
    const [hx, hy] = toScene(x, y, s, fl, 62, -248);
    g.push(`<ellipse cx="${f(hx)}" cy="${f(hy - 6)}" rx="5" ry="3" fill="${C.rose}"/><ellipse cx="${f(hx + (fl ? -8 : 8))}" cy="${f(hy - 12)}" rx="4" ry="2.6" fill="${C.red}"/>`);
  }

  /* Le photographe, de dos au premier plan */
  const px = 706, py = 596, ps = 1.08, pskin = SKIN.s3;
  g.push(person({ x: px, y: py, s: ps, view: "back", skin: pskin, hair: { type: "locks" }, top: C.indigo, wax: "kitenge", sleeve: "short", bottom: C.dark,
    arms: { l: [[-50, -200], [-40, -236]], r: [[48, -196], [22, -236]] } }));
  g.push(at(px, py, ps, false, stroke("M-20 -204Q0 -186 20 -204", C.dark, 3) +
    `<rect x="-58" y="-254" width="40" height="28" rx="5" fill="${C.dark}"/><rect x="-46" y="-262" width="14" height="10" rx="2" fill="${C.dark}"/><rect x="-54" y="-250" width="10" height="5" fill="${C.grey}"/>` +
    hand(-40, -236, pskin)));
  // Éclair du flash
  g.push(at(px, py, ps, false, `<g transform="translate(-48 -276)" fill="${C.yellow}"><path d="M0 -16L4 -4L16 0L4 4L0 16L-4 4L-16 0L-4 -4Z"/></g>`));
  // Bulle : alliances
  g.push(bubble(150, 120, `<circle cx="-7" cy="2" r="11" fill="none" stroke="${C.yellow}" stroke-width="4.5"/><circle cx="8" cy="2" r="11" fill="none" stroke="${C.white}" stroke-width="4.5"/>`, C.terra));
  return frame(g.join(""), C.cream);
}

/* ---------- Scène 3 : la visite au nouveau-né ---------- */
function naissance() {
  const g = [];
  // Mur, soubassement et carrelage
  g.push(rect(0, 0, 800, 440, C.cream), rect(0, 330, 800, 110, C.sand), rect(0, 326, 800, 6, C.wood, ' opacity=".6"'));
  g.push(rect(0, 440, 800, 160, C.sand2));
  for (let x = -40; x < 840; x += 80) g.push(stroke(`M${x} 440L${x + (x - 400) * 0.4} 600`, C.sand, 2));
  g.push(stroke("M0 500H800", C.sand, 2));
  // Fenêtre et rideaux en pagne
  g.push(rect(40, 80, 140, 170, C.sky), rect(40, 80, 140, 170, C.blue, ' opacity=".2"'));
  g.push(`<clipPath id="naissance-vitre"><rect x="40" y="80" width="140" height="170"/></clipPath><g clip-path="url(#naissance-vitre)">${palm(140, 290, 0.6, -10)}</g>`);
  g.push(stroke("M110 80V250M40 165H180", C.white, 4), rect(30, 250, 160, 8, C.white));
  g.push(cloth("M28 70H64Q56 160 66 262H28Z", C.terra, "wax3"), cloth("M192 70H156Q164 160 154 262H192Z", C.terra, "wax3"), rect(20, 64, 180, 8, C.wood2, ' rx="4"'));
  // Cadre au mur : la photo du mariage (le dessin reste dans le cadre)
  g.push(rect(560, 84, 130, 100, C.wood2), rect(568, 92, 114, 84, C.sky));
  g.push(`<clipPath id="naissance-photo"><rect x="568" y="92" width="114" height="84"/></clipPath><g clip-path="url(#naissance-photo)">` +
    `<circle cx="608" cy="128" r="11" fill="${SKIN.s4}"/><path d="M596 120Q608 98 622 116L620 108Q608 94 594 112Z" fill="${C.white}"/><path d="M592 176Q592 142 608 142Q624 142 624 176Z" fill="${C.white}"/>` +
    `<circle cx="642" cy="126" r="11" fill="${SKIN.s2}"/><path d="M630 122Q642 108 654 122V116Q642 106 630 116Z" fill="${C.white}"/><path d="M626 176Q626 140 642 140Q658 140 658 176Z" fill="${C.white}"/></g>`);
  // Masque sculpté
  g.push(`<ellipse cx="730" cy="132" rx="22" ry="34" fill="${C.wood}"/><ellipse cx="722" cy="124" rx="5" ry="3" fill="${C.wood2}"/><ellipse cx="738" cy="124" rx="5" ry="3" fill="${C.wood2}"/>`, stroke("M730 128V146", C.wood2, 3), `<ellipse cx="730" cy="152" rx="6" ry="3" fill="${C.wood2}"/>`, stroke("M712 106Q730 96 748 106", C.wood2, 3));

  /* Fauteuil de la grand-mère */
  g.push(rect(80, 360, 140, 110, C.ocre, ' rx="18"'), rect(80, 360, 140, 110, "url(#wax1)", ' rx="18" opacity=".4"'), rect(70, 440, 170, 40, C.ocre, ' rx="10"'), rect(80, 480, 10, 30, C.wood2), rect(220, 480, 10, 30, C.wood2));
  /* Le papa, debout derrière le canapé, filme le bébé avec son téléphone */
  const fx = 486, fy = 484, fs = 1, fskin = SKIN.s3;
  g.push(person({ x: fx, y: fy, s: fs, legs: "none", skin: fskin, hair: { type: "short" }, beard: true, top: C.indigo, wax: "ndop", dashiki: C.white, face: "laugh",
    phone: { rot: 8, screen: C.blue }, arms: { r: [[40, -160], [4, -168]], l: [[-54, -204], [-52, -246]] } }));
  /* Le canapé */
  g.push(rect(252, 334, 300, 130, C.green, ' rx="22"'), rect(236, 396, 44, 110, C.green, ' rx="14"'), rect(526, 396, 44, 110, C.green, ' rx="14"'));
  g.push(rect(270, 444, 266, 40, C.green, ' rx="8"'), rect(270, 444, 266, 40, C.dark, ' rx="8" opacity=".12"'), rect(250, 500, 10, 20, C.wood2), rect(546, 500, 10, 20, C.wood2));
  g.push(cloth("M474 396Q500 388 530 394Q538 420 532 446H472Q466 420 474 396Z", C.terra, "wax2"));

  /* La grand-mère, assise, qui bénit le bébé */
  const gx = 144, gy = 560, gs = 0.95;
  g.push(person({ x: gx, y: gy, s: gs, legs: "sit", robe: "boubou", skin: SKIN.s2, top: C.indigo, wax: "ndop", hair: { type: "foulard", color: C.indigo, wax: "ndop" }, face: "laugh",
    arms: { r: [[46, -178], [80, -198]], l: [[-38, -150], [-10, -112]] } }));
  /* La jeune maman en kaba, le bébé dans les bras */
  const mx = 360, my = 560, ms = 1, mskin = SKIN.s4;
  g.push(person({ x: mx, y: my, s: ms, legs: "sit", robe: "kaba", skin: mskin, top: C.terra, wax: "wax1", hair: { type: "foulard", color: C.ocre, wax: "wax3" }, face: "smile",
    arms: { l: [[-46, -148], [-34, -134]], r: [[42, -140], [22, -134]] } }));
  const bskin = SKIN.s5;
  g.push(at(mx, my, ms, false,
    `<path d="M-42 -152Q-46 -176 -20 -172L40 -160Q54 -150 44 -134Q20 -122 -30 -130Q-46 -136 -42 -152Z" fill="${C.cream}"/>` +
    `<path d="M-14 -170L40 -160Q54 -150 44 -134Q20 -122 -16 -128Z" fill="${C.green}"/><path d="M-14 -170L40 -160Q54 -150 44 -134Q20 -122 -16 -128Z" fill="url(#kente)" opacity=".7"/>` +
    `<circle cx="-28" cy="-158" r="13" fill="${bskin}"/><path d="M-40 -162Q-38 -176 -24 -174Q-14 -172 -16 -160Q-26 -170 -40 -162Z" fill="${C.green}"/>` +
    `<ellipse cx="-32" cy="-157" rx="1.6" ry="2" fill="#0E0907"/><ellipse cx="-24" cy="-157" rx="1.6" ry="2" fill="#0E0907"/><circle cx="-31.4" cy="-157.8" r=".6" fill="#fff"/><circle cx="-23.4" cy="-157.8" r=".6" fill="#fff"/>` +
    stroke("M-31 -151Q-28 -149 -25 -151", "#7E2F25", 1.6) +
    hand(-34, -134, mskin) + hand(22, -134, mskin)));

  /* Les amies qui apportent des cadeaux */
  // L'amie aux pagnes pliés
  const ax = 610, ay = 570, as = 1, askin = SKIN.s1;
  g.push(person({ x: ax, y: ay, s: as, flip: true, robe: "kaba", skin: askin, top: C.green, wax: "kitenge", hair: { type: "boxbraids", beads: C.yellow }, face: "talk",
    arms: { r: [[40, -150], [26, -130]], l: [[-40, -150], [-26, -130]] } }));
  g.push(at(ax, ay, as, true,
    cloth("M-34 -132H34V-118H-34Z", C.indigo, "ndop") + cloth("M-32 -146H32V-132H-32Z", C.ocre, "wax1") + cloth("M-34 -160H34V-146H-34Z", C.terra, "wax2") + cloth("M-30 -172H30V-160H-30Z", C.green, "kente") +
    stroke("M-34 -125H34", C.dark, 1, ' opacity=".2"') + `<path d="M-6 -172L0 -182L6 -172Z" fill="${C.red}"/>` + hand(26, -126, askin) + hand(-26, -126, askin)));
  // L'amie au panier de fruits
  const kx = 708, ky = 578, ks = 0.96, kskin = SKIN.s3;
  g.push(person({ x: kx, y: ky, s: ks, flip: true, robe: "dress", skin: kskin, top: C.ocre, wax: "wax2", hair: { type: "gele", color: C.terra, wax: "wax3" }, face: "laugh",
    arms: { r: [[40, -150], [28, -124]], l: [[-40, -150], [-28, -124]] } }));
  g.push(at(kx, ky, ks, true,
    // Fruits : ananas, bananes, mangues, puis la corbeille tressée devant
    `<ellipse cx="-12" cy="-160" rx="10" ry="15" fill="${C.ocre}"/><path d="M-12 -174L-20 -194M-12 -174L-12 -198M-12 -174L-4 -194" stroke="${C.leaf2}" stroke-width="4" stroke-linecap="round"/>` +
    `<path d="M2 -150Q8 -176 30 -172Q14 -166 10 -150Z" fill="${C.yellow}"/><path d="M8 -150Q16 -172 36 -164Q20 -160 16 -150Z" fill="${C.yellow}"/>` +
    `<ellipse cx="-28" cy="-148" rx="9" ry="7" fill="${C.leaf}"/><ellipse cx="22" cy="-146" rx="9" ry="7" fill="${C.red}"/><ellipse cx="-4" cy="-148" rx="8" ry="6" fill="${C.green}"/>` +
    `<path d="M-40 -148H40L32 -112H-32Z" fill="${C.wood}"/>` + stroke("M-38 -138H38M-35 -126H35", C.wood2, 2.5) + stroke("M-24 -148L-20 -112M0 -148V-112M24 -148L20 -112", C.wood2, 2) +
    hand(28, -124, kskin) + hand(-28, -124, kskin)));
  // Sac cadeau posé au sol
  g.push(`<path d="M236 548H276L271 590H241Z" fill="${C.indigo}"/>`, stroke("M246 548Q256 530 266 548", C.indigo, 3), rect(236, 558, 40, 6, C.ocre), `<path d="M256 546L246 538L248 548ZM256 546L266 538L264 548Z" fill="${C.ocre}"/>`);

  // Bulle cœur au-dessus de la maman et du bébé
  g.push(bubble(290, 170, heart(1), C.terra), `<circle cx="318" cy="246" r="6" fill="${C.terra}" opacity=".45"/><circle cx="330" cy="272" r="4" fill="${C.terra}" opacity=".35"/>`);
  return frame(g.join(""), C.cream);
}

export default [
  { id: "defile", fr: "Le défilé de la fête nationale", en: "National day parade",
    tags: ["défilé", "fête nationale", "20 mai", "élèves", "uniforme", "fanfare", "tambour", "trompette", "tribune", "officiels", "boubou", "foule", "drapeaux", "guirlandes", "kente", "parade", "national day", "pupils", "uniform", "marching band", "drum", "trumpet", "grandstand", "officials", "crowd", "flags", "bunting"], draw: defile },
  { id: "mairie", fr: "Mariage à la mairie", en: "Wedding at the town hall",
    tags: ["mariage", "mairie", "mariés", "mariée", "gele", "agbada", "aso-ebi", "famille", "pétales", "photographe", "bouquet", "alliances", "tapis rouge", "fête", "wedding", "town hall", "bride", "groom", "family", "petals", "photographer", "rings", "red carpet", "celebration"], draw: mairie },
  { id: "naissance", fr: "Visite au nouveau-né", en: "Visiting the newborn",
    tags: ["naissance", "bébé", "nouveau-né", "maman", "papa", "grand-mère", "kaba", "pagne", "cadeaux", "panier de fruits", "amies", "salon", "famille", "visite", "birth", "baby", "newborn", "mother", "father", "grandmother", "gifts", "fruit basket", "friends", "living room", "family", "visit"], draw: naissance },
];
