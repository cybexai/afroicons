// Scènes : la partie d'awalé sous le manguier, la lutte traditionnelle, l'anniversaire.
import { C, SKIN, HAIR, person, frame, palm, cloud, stroke, f } from "./lib.mjs";
import { flag } from "./flag.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${r}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");
/** Position dans la scène d'un point local (hx, hy) d'un personnage (avec une rotation éventuelle autour des pieds). */
const toScene = (P, hx, hy) => {
  const a = ((P.rot ?? 0) * Math.PI) / 180, lx = (P.flip ? -hx : hx) * P.s, ly = hy * P.s;
  return [P.x + lx * Math.cos(a) - ly * Math.sin(a), P.y + lx * Math.sin(a) + ly * Math.cos(a)];
};
/** Inverse : point de la scène → repère local du personnage. */
const toLocal = (P, sx, sy) => {
  const a = (-(P.rot ?? 0) * Math.PI) / 180, dx = sx - P.x, dy = sy - P.y;
  const lx = (dx * Math.cos(a) - dy * Math.sin(a)) / P.s, ly = (dx * Math.sin(a) + dy * Math.cos(a)) / P.s;
  return [P.flip ? -lx : lx, ly];
};
/** Bras vers une main donnée en repère local : coude au milieu, décalé de `bend` (perpendiculaire). */
const armTo = (side, [hx, hy], bend = 18) => {
  const sx = side === "l" ? -27 : 27, sy = -192, mx = (sx + hx) / 2, my = (sy + hy) / 2, L = Math.hypot(hx - sx, hy - sy) || 1;
  return [[f(mx + ((hy - sy) / L) * bend), f(my - ((hx - sx) / L) * bend)], [f(hx), f(hy)]];
};
const yeux = (y = -237) => `<ellipse cx="-8" cy="${y}" rx="2.6" ry="3.1" fill="#0E0907"/><ellipse cx="8" cy="${y}" rx="2.6" ry="3.1" fill="#0E0907"/><circle cx="-7.1" cy="${y - 1.2}" r=".9" fill="#fff"/><circle cx="8.9" cy="${y - 1.2}" r=".9" fill="#fff"/>`;
/** Spectateur en buste (léger, pour la foule) en repère local d'un person() ; `up` : un bras levé, sinon il applaudit. */
const fan = (skin, hair, hcol, top, wax, up, face) => {
  const o = [];
  if (hair === "afro") o.push(`<circle cx="0" cy="-248" r="34" fill="${hcol}"/>`);
  o.push(rect(-7, -220, 14, 22, skin), cloth("M-30 -184Q-30 -206 -12 -206H12Q30 -206 30 -184L28 -100H-28Z", top, wax), `<path d="M-10 -206L0 -192L10 -206Z" fill="${skin}"/>`);
  o.push(up ? stroke("M27 -192L54 -214L60 -262", top, 15) + stroke("M-27 -192L-40 -150L-36 -112", top, 15) + hand(60, -262, skin)
    : stroke("M-27 -192L-36 -160L-6 -176M27 -192L36 -160L6 -176", top, 15) + hand(-6, -176, skin) + hand(6, -176, skin));
  o.push(`<ellipse cx="0" cy="-238" rx="21" ry="25" fill="${skin}"/>`);
  if (hair === "foulard") o.push(`<path d="M-23 -243Q-31 -270 -15 -288Q2 -305 21 -295Q34 -285 28 -262Q27 -251 23 -243Q0 -259 -23 -243Z" fill="${hcol}"/><path d="M12 -293Q29 -312 39 -298Q35 -284 22 -286Z" fill="${hcol}"/>`);
  else if (hair === "bantu") o.push(`<path d="M-22 -236Q-24 -266 0 -266Q24 -266 22 -236Q12 -252 0 -254Q-12 -252 -22 -236Z" fill="${hcol}"/>` + [[-15, -260], [0, -268], [15, -260]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="7" fill="${hcol}"/>`).join(""));
  else if (hair === "cap") o.push(`<path d="M-22 -240Q-24 -268 0 -268Q24 -268 22 -240Z" fill="${hcol}"/><path d="M-4 -244Q20 -250 38 -242Q30 -236 -2 -238Z" fill="${hcol}"/>`);
  else o.push(`<path d="M-23 -230Q-25 -268 0 -268Q25 -268 23 -230Q16 -252 0 -254Q-16 -252 -23 -230Z" fill="${hcol}"/>`);
  o.push(yeux(hair === "cap" ? -233 : -237));
  const my = hair === "cap" ? -218 : -222;
  o.push(face === "laugh" ? `<path d="M-7 ${my - 1}Q0 ${my - 2} 7 ${my - 1}Q6 ${my + 6} 0 ${my + 6}Q-6 ${my + 6} -7 ${my - 1}Z" fill="#7E2F25"/>`
    : face === "talk" ? `<ellipse cx="0" cy="${my + 1}" rx="3.8" ry="3.2" fill="#7E2F25"/>` : stroke(`M-6 ${my - 1}Q0 ${my + 4} 6 ${my - 1}`, "#7E2F25", 2.4));
  return o.join("");
};
/** Tabouret sculpté (assise à -100, en repère local d'un personnage assis). */
const tabouret = (c1, c2) => `<ellipse cx="12" cy="-100" rx="46" ry="9" fill="${C.wood}"/><path d="M-24 -96H48L38 -62L50 -8H-26L-14 -62Z" fill="${C.wood2}"/><ellipse cx="12" cy="-6" rx="42" ry="8" fill="${C.wood2}"/>` +
  [-10, 10, 30].map((x, i) => `<path d="M${x - 6} -86L${x} -66L${x + 6} -86ZM${x - 6} -18L${x} -40L${x + 6} -18Z" fill="${i % 2 ? c2 : c1}"/>`).join("") +
  stroke("M-18 -62H44", c1, 3) + `<ellipse cx="12" cy="-102" rx="46" ry="6" fill="${c1}" opacity=".35"/>`;

/* ---------- Scène 1 : la partie d'awalé sous le manguier ---------- */
function awale() {
  const g = [];
  // Ciel, cour de terre, mur de la concession
  g.push(rect(0, 0, 800, 330, C.white, ' opacity=".5"'), cloud(560, 70, 0.7), cloud(690, 120, 0.55));
  g.push(rect(0, 250, 800, 120, C.sand2), rect(0, 250, 800, 12, C.wood, ' opacity=".5"'), rect(0, 300, 800, 10, C.terra, ' opacity=".55"'));
  for (let x = 18; x < 800; x += 64) g.push(`<path d="M${x} 318l10 -6l10 6l-10 6Z" fill="${C.wood2}" opacity=".35"/>`);
  // Case à toit de chaume, derrière le mur, à droite
  g.push(rect(600, 196, 170, 174, C.sand), rect(600, 196, 170, 174, C.wood, ' opacity=".25"'));
  g.push(`<path d="M666 370V286Q666 266 686 266Q706 266 706 286V370Z" fill="${C.wood2}"/>`, `<path d="M580 210L685 120L790 210Q685 228 580 210Z" fill="${C.wood}"/>`);
  for (const t of [0.45, 0.75]) { const yy = 120 + 90 * t, ww = 105 * t; g.push(stroke(`M${f(685 - ww)} ${f(yy)}Q685 ${f(yy + 10)} ${f(685 + ww)} ${f(yy)}`, C.wood2, 3, ' opacity=".55"')); }
  // Le sol de terre battue
  g.push(`<path d="M0 360H800V600H0Z" fill="${C.rose}" opacity=".55"/><path d="M0 360H800V372H0Z" fill="${C.wood}" opacity=".3"/>`);
  for (const [x, y] of [[60, 420], [720, 450], [600, 580], [90, 560], [760, 540]]) g.push(`<ellipse cx="${x}" cy="${y}" rx="14" ry="3" fill="${C.wood2}" opacity=".25"/>`);
  // Le manguier : tronc, ombre, feuillage, mangues
  g.push(`<ellipse cx="380" cy="530" rx="360" ry="50" fill="${C.leaf2}" opacity=".18"/>`);
  g.push(`<path d="M206 400Q214 300 196 210L232 214Q232 300 244 400Z" fill="${C.wood2}"/>`, stroke("M212 250Q170 200 140 170M224 240Q262 200 300 180", C.wood2, 12));
  const can = [[60, 110, 80, C.leaf2], [170, 70, 90, C.leaf], [300, 80, 88, C.leaf2], [420, 60, 80, C.leaf], [120, 170, 70, C.leaf], [250, 160, 80, C.leaf2], [380, 150, 70, C.leaf], [480, 120, 60, C.leaf2], [-10, 190, 70, C.leaf2]];
  for (const [cx, cy, r, c] of can) g.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}"/>`);
  for (const [mx, my] of [[110, 190], [180, 150], [300, 200], [400, 180], [260, 120], [470, 150], [40, 230]]) g.push(stroke(`M${mx} ${my - 14}V${my - 6}`, C.leaf2, 2), `<ellipse cx="${mx}" cy="${my}" rx="7" ry="10" fill="${C.ocre}"/><ellipse cx="${mx - 2}" cy="${my - 3}" rx="3" ry="4" fill="${C.yellow}" opacity=".7"/>`);
  // Natte tressée sous les joueurs
  g.push(`<path d="M150 548L650 548L690 590L110 590Z" fill="${C.sand}"/>`);
  for (let x = 130; x < 680; x += 18) g.push(stroke(`M${x + 10} 550L${x} 588`, C.wood, 2, ' opacity=".35"'));
  g.push(rect(130, 566, 540, 6, C.terra, ' opacity=".6"'));

  /* Les spectateurs, debout derrière */
  // Jeune femme en box braids, qui rit, la main devant la bouche
  const jf = { x: 118, y: 500, s: 0.9 };
  g.push(person({ ...jf, skin: SKIN.s4, hair: { type: "boxbraids", beads: C.ocre }, top: C.indigo, wax: "kitenge", bottom: C.indigo, bwax: "kitenge", legs: "skirt", face: "laugh",
    arms: { r: [[44, -166], [14, -214]], l: [[-40, -150], [-36, -112]] } }));
  // Jeune homme au milieu, qui commente en montrant le plateau
  const jh = { x: 436, y: 446, s: 0.82 };
  g.push(person({ ...jh, flip: true, skin: SKIN.s1, hair: { type: "short" }, top: C.ocre, dashiki: C.terra, bottom: C.dark, face: "talk",
    arms: { r: [[50, -152], [62, -112]], l: [[-40, -150], [-36, -110]] }, point: [40, 30] }));
  // Jeune homme en locks, à droite, bras croisés, qui réfléchit
  const jl = { x: 690, y: 500, s: 0.88 };
  g.push(person({ ...jl, flip: true, skin: SKIN.s3, hair: { type: "locks" }, top: C.green, wax: "bogolan", bottom: C.indigo, face: "calm",
    arms: { r: [[34, -156], [-14, -160]], l: [[-34, -156], [12, -150]] } }));

  /* Les deux anciens sur leurs tabourets */
  const A = { x: 248, y: 556, s: 1 }, B = { x: 552, y: 556, s: 1, flip: true };
  g.push(at(A.x, A.y, A.s, false, tabouret(C.ocre, C.terra)), at(B.x, B.y, B.s, true, tabouret(C.terra, C.ocre)));
  // A : boubou en ndop, ashetu ; il rit et joue
  const aMain = toLocal(A, 356, 456);
  g.push(person({ ...A, skin: SKIN.s2, hair: { type: "short" }, beard: true, hat: { type: "ashetu", color: C.red, color2: C.dark }, robe: "boubou", top: "#1C2756", wax: "ndop", legs: "sit", face: "laugh",
    arms: { r: armTo("r", aMain, -14), l: [[-40, -150], [-10, -112]] } }));
  // B : agbada blanc, kufi en toghu ; il réfléchit, la main au menton
  g.push(person({ ...B, skin: SKIN.s4, hair: { type: "rase" }, beard: true, hat: { type: "kufi", color: C.dark, wax: "toghu" }, robe: "boubou", top: C.white, wax: "awale-brod", legs: "sit", face: "calm",
    arms: { r: [[48, -150], [10, -208]], l: [[-40, -150], [-4, -112]] } }));
  // Index de B posé sur la joue
  g.push(at(B.x, B.y, B.s, true, stroke("M10 -208L6 -226", SKIN.s4, 4.5)));

  /* Le plateau d'awalé sur son support */
  const bx = 400, by = 468;
  g.push(`<path d="M${bx - 34} ${by + 18}L${bx - 44} ${by + 84}H${bx + 44}L${bx + 34} ${by + 18}Z" fill="${C.wood2}"/>`, `<ellipse cx="${bx}" cy="${by + 84}" rx="50" ry="7" fill="${C.wood2}"/>`);
  g.push(`<path d="M${bx - 30} ${by + 40}H${bx + 30}" stroke="${C.ocre}" stroke-width="3"/>`, `<path d="M${bx - 10} ${by + 50}L${bx} ${by + 70}L${bx + 10} ${by + 50}Z" fill="${C.ocre}"/>`);
  g.push(rect(bx - 74, by - 6, 148, 30, C.wood, ' rx="12"'), rect(bx - 74, by + 14, 148, 10, C.wood2, ' rx="5" opacity=".6"'));
  const seed = (x, y) => `<circle cx="${f(x)}" cy="${f(y)}" r="2.4" fill="${C.dark}"/><circle cx="${f(x + 3.5)}" cy="${f(y + 1)}" r="2.4" fill="${C.cream}"/>`;
  g.push(`<ellipse cx="${bx - 64}" cy="${by + 8}" rx="7" ry="12" fill="${C.wood2}"/><ellipse cx="${bx + 64}" cy="${by + 8}" rx="7" ry="12" fill="${C.wood2}"/>`, seed(bx - 66, by + 4), seed(bx + 62, by + 8), seed(bx - 66, by + 11));
  for (let i = 0; i < 6; i++) for (const r of [0, 1]) {
    const cx = bx - 45 + i * 18, cy = by + 2 + r * 12;
    g.push(`<ellipse cx="${cx}" cy="${cy}" rx="7.5" ry="5" fill="${C.wood2}"/>`);
    if ((i + r) % 3 !== 2) g.push(seed(cx - 2.5, cy - 0.5));
  }
  // La main de A qui sème une graine
  const [ahx, ahy] = toScene(A, ...aMain);
  g.push(`<circle cx="${f(ahx + 2)}" cy="${f(ahy + 10)}" r="2.6" fill="${C.cream}"/>`, hand(ahx, ahy, SKIN.s2));

  /* L'enfant, devant à droite, qui tient la calebasse de graines */
  const E = { x: 668, y: 572, s: 0.6 };
  g.push(person({ ...E, flip: true, skin: SKIN.s5, hair: { type: "bantu" }, top: C.terra, wax: "wax1", robe: "dress", face: "laugh",
    arms: { r: [[34, -160], [10, -136]], l: [[-34, -160], [-10, -136]] } }));
  g.push(at(E.x, E.y, E.s, true, `<path d="M-34 -146Q0 -94 34 -146Z" fill="${C.ocre}"/><path d="M-34 -146H34" stroke="${C.wood}" stroke-width="5"/>` + seed(-14, -151) + seed(0, -152) + seed(12, -151) + hand(-14, -140, SKIN.s5) + hand(14, -140, SKIN.s5)));

  /* Bulle de réflexion de B : les deux rangées et une graine en suspens */
  g.push(`<circle cx="610" cy="236" r="6" fill="${C.white}"/><circle cx="626" cy="212" r="9" fill="${C.white}"/>`);
  g.push(`<ellipse cx="672" cy="166" rx="66" ry="42" fill="${C.white}"/>`);
  for (let i = 0; i < 4; i++) for (const r of [0, 1]) g.push(`<ellipse cx="${636 + i * 24}" cy="${166 + r * 16}" rx="9" ry="6" fill="${C.wood}"/>`);
  g.push(stroke("M656 150Q672 130 690 150", C.terra, 3), `<path d="M686 146l8 6l-10 2Z" fill="${C.terra}"/>`, `<circle cx="672" cy="134" r="4" fill="${C.dark}"/>`);
  // Éclats de rire au-dessus de A
  g.push(stroke("M196 266L186 254M222 258V244M248 266L258 254", C.ocre, 4));

  return frame(`<defs><pattern id="awale-brod" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M10 3L17 10L10 17L3 10Z" fill="none" stroke="${C.indigo}" stroke-width="1.4" opacity=".45"/></pattern></defs>` + g.join(""), C.sky);
}

/* ---------- Scène 2 : la lutte traditionnelle ---------- */
function lutte() {
  const g = [];
  g.push(rect(0, 0, 800, 300, C.blue, ' opacity=".16"'), cloud(80, 60, 0.8), cloud(610, 44, 0.7));
  // Tribune de bois et palmiers au fond
  g.push(palm(40, 300, 1, 14), palm(770, 300, 1.05, -14));
  g.push(rect(110, 180, 580, 130, C.wood), rect(110, 180, 580, 130, C.dark, ' opacity=".15"'), `<path d="M96 180L130 140H670L704 180Z" fill="${C.terra}"/>`);
  for (let i = 0; i < 9; i++) g.push(`<path d="M${100 + i * 66} 180h66q-33 22 -66 0Z" fill="${i % 2 ? C.ocre : C.cream}"/>`);
  g.push(stroke("M400 140V64", C.grey, 4), flag(402, 66, 52));
  // Le public de la tribune, en petit
  const tri = [[150, SKIN.s2, "foulard", C.ocre, C.green, null, true], [200, SKIN.s4, "short", HAIR, C.terra, null, false], [250, SKIN.s1, "cap", C.indigo, C.white, null, true],
    [300, SKIN.s3, "bantu", HAIR, C.ocre, "wax3", false], [500, SKIN.s5, "short", HAIR, C.green, "wax1", true], [550, SKIN.s2, "foulard", C.terra, C.indigo, null, false],
    [600, SKIN.s3, "afro", HAIR, C.yellow, null, true], [650, SKIN.s1, "cap", C.red, C.indigo, "ndop", false], [350, SKIN.s5, "short", HAIR, C.indigo, "wax2", true], [450, SKIN.s4, "foulard", C.green, C.terra, "wax1", false]];
  for (const [x, skin, h, hc, top, , up] of tri) {
    g.push(`<path d="M${x - 11} 270V236Q${x - 11} 226 ${x} 226Q${x + 11} 226 ${x + 11} 236V270Z" fill="${top}"/><circle cx="${x}" cy="214" r="9" fill="${skin}"/>`);
    g.push(h === "foulard" ? `<path d="M${x - 9} 212Q${x - 10} 198 ${x} 197Q${x + 11} 198 ${x + 9} 212Z" fill="${hc}"/>` : h === "afro" ? `<path d="M${x - 10} 214Q${x - 13} 198 ${x} 197Q${x + 13} 198 ${x + 10} 214Q${x} 204 ${x - 10} 214Z" fill="${hc}"/>` : `<path d="M${x - 9} 212Q${x - 9} 203 ${x} 203Q${x + 9} 203 ${x + 9} 212Q${x} 206 ${x - 9} 212Z" fill="${hc}"/>`);
    g.push(`<circle cx="${x - 3}" cy="214" r="1.2" fill="#0E0907"/><circle cx="${x + 3}" cy="214" r="1.2" fill="#0E0907"/>`, up ? stroke(`M${x + 9} 234L${x + 18} 212`, top, 5) + `<circle cx="${x + 18}" cy="210" r="3" fill="${skin}"/>` : "");
  }
  g.push(rect(110, 262, 580, 48, C.wood2), rect(110, 262, 580, 6, C.wood, ' opacity=".7"'));
  // L'arène : sable, ring
  g.push(rect(0, 310, 800, 290, C.sand2));
  g.push(`<ellipse cx="400" cy="500" rx="330" ry="86" fill="${C.sand}"/><ellipse cx="400" cy="500" rx="330" ry="86" fill="none" stroke="${C.white}" stroke-width="5" opacity=".8"/>`);
  for (const [x, y] of [[120, 560], [690, 440], [600, 580], [210, 440], [500, 430]]) g.push(`<ellipse cx="${x}" cy="${y}" rx="10" ry="2.5" fill="${C.wood}" opacity=".3"/>`);
  // Le public debout derrière la corde
  const fans = [[40, SKIN.s3, "foulard", C.indigo, C.ocre, "wax2", true, "laugh"], [96, SKIN.s1, "short", HAIR, C.terra, null, false, "smile"], [150, SKIN.s4, "bantu", HAIR, C.green, "kitenge", true, "talk"],
    [206, SKIN.s2, "cap", C.ocre, C.indigo, null, true, "laugh"], [600, SKIN.s5, "afro", HAIR, C.ocre, null, true, "laugh"], [656, SKIN.s2, "foulard", C.green, C.terra, "wax1", false, "smile"],
    [712, SKIN.s3, "short", HAIR, "#15110F", "toghu", true, "talk"], [766, SKIN.s1, "bantu", HAIR, C.indigo, "wax3", true, "laugh"]];
  for (const [x, skin, h, hc, top, wax, up, face] of fans) g.push(at(x, 404, 0.5, false, fan(skin, h, hc, top, wax, up, face)));
  // Palissade de secco tressé
  g.push(rect(0, 344, 254, 68, C.wood), rect(546, 344, 254, 68, C.wood), rect(0, 344, 254, 68, C.sand, ' opacity=".35"'), rect(546, 344, 254, 68, C.sand, ' opacity=".35"'));
  g.push(`<path d="${[...Array(52)].map((_, i) => `M${i * 10 + (i > 25 ? 286 : 0) + 4} 346V410`).join("")}" stroke="${C.wood2}" stroke-width="2.5" opacity=".5"/>`);
  // Poteaux et corde
  for (const x of [20, 250, 550, 780]) g.push(rect(x - 4, 326, 8, 90, C.wood2), `<circle cx="${x}" cy="326" r="6" fill="${C.ocre}"/>`);
  g.push(stroke("M20 336Q135 354 250 336M550 336Q665 354 780 336", C.ocre, 4));

  /* Les percussionnistes, à gauche */
  // Le batteur assis, tambour entre les genoux
  const T = { x: 74, y: 570, s: 0.82 }, tsk = SKIN.s1;
  g.push(at(T.x, T.y, T.s, false, tabouret(C.ocre, C.terra)));
  g.push(person({ ...T, skin: tsk, hair: { type: "short" }, top: C.ocre, wax: "wax3", dashiki: C.indigo, bottom: C.indigo, legs: "sit", face: "laugh",
    arms: { l: [[-20, -150], [52, -158]], r: [[54, -168], [96, -172]] } }));
  g.push(at(T.x, T.y, T.s, false,
    `<path d="M50 -154H122L110 -60L118 -4H54L62 -60Z" fill="${C.terra}"/><path d="M50 -154H122L110 -60L118 -4H54L62 -60Z" fill="url(#kente)" opacity=".35"/>` +
    stroke("M54 -150L86 -60L118 -150M62 -60H110", C.cream, 2.5) + `<ellipse cx="86" cy="-154" rx="36" ry="8" fill="${C.cream}"/><ellipse cx="86" cy="-154" rx="36" ry="8" fill="none" stroke="${C.wood2}" stroke-width="3"/>` +
    hand(52, -158, tsk) + hand(96, -164, tsk)));
  // Le batteur debout, sabar en bandoulière, baguette
  const U = { x: 240, y: 586, s: 0.86 }, usk = SKIN.s4;
  g.push(person({ ...U, skin: usk, hair: { type: "rase" }, hat: { type: "kufi", color: C.indigo, wax: "ndop" }, robe: "boubou", top: C.green, wax: "wax1", face: "talk",
    arms: { l: [[-38, -150], [-6, -124]], r: [[50, -176], [42, -214]] } }));
  g.push(at(U.x, U.y, U.s, false, stroke("M-26 -200L26 -124", C.wood2, 3) +
    `<path d="M-32 -134L-24 -60H18L26 -134Z" fill="${C.wood}"/><ellipse cx="-3" cy="-134" rx="29" ry="7" fill="${C.cream}"/>` + stroke("M-28 -100H22", C.ocre, 4) +
    hand(-6, -128, usk) + stroke("M42 -214L4 -150", C.wood2, 3.5) + hand(42, -214, usk)));

  /* Les deux lutteurs qui s'empoignent */
  const Ls = 1.04, A = { x: 318, y: 548, s: Ls, rot: 16 }, B = { x: 518, y: 548, s: Ls, rot: -16, flip: true };
  const sA = SKIN.s2, sB = SKIN.s4;
  // Saisies : chacun tient la nuque de l'autre, et son bras
  const aR = toLocal(A, ...toScene(B, 16, -206)), bR = toLocal(B, ...toScene(A, 16, -206));
  const aL = toLocal(A, ...toScene(B, 44, -150)), bL = toLocal(B, ...toScene(A, 44, -150));
  const wrestler = (P, skin, pagne, pat, cord, armR, armL) => {
    const o = [];
    o.push(person({ ...P, rot: undefined, x: 0, y: 0, skin, hair: { type: "rase" }, top: skin, sleeve: "short", bottom: skin, shoes: skin, legs: "walk", face: P.face,
      arms: { r: armTo("r", armR, -16), l: armTo("l", armL, 22) } }));
    return `<g transform="translate(${P.x} ${P.y}) rotate(${P.rot})">${o.join("")}</g>`;
  };
  // Pagne noué, gris-gris et cordelettes (en repère local, par-dessus le corps)
  const deco = (P, skin, pagne, pat, cord) => `<g transform="translate(${P.x} ${P.y}) rotate(${P.rot})">` + at(0, 0, P.s, P.flip,
    stroke("M-12 -196Q-6 -180 0 -176Q6 -180 12 -196", "rgba(0,0,0,.18)", 2) + stroke("M-14 -168Q-6 -160 -2 -166M14 -168Q6 -160 2 -166", "rgba(0,0,0,.18)", 2) +
    stroke("M-14 -205Q0 -176 14 -205", cord, 2.5) + rect(-6, -182, 12, 14, C.wood2, ' rx="3"') +
    cloth("M-30 -126H30L36 -76Q20 -64 4 -82L0 -70L-4 -82Q-20 -64 -36 -76Z", pagne, pat) + `<path d="M18 -124L34 -128L30 -112Z" fill="${pagne}"/><path d="M26 -116L40 -82L28 -84Z" fill="${pagne}"/>` +
    rect(-30, -130, 60, 9, cord, ' rx="3"') + [-18, -2, 14].map((x) => rect(x, -122, 8, 12, C.wood2, ' rx="2"')).join("")
  ) + `</g>`;
  g.push(`<ellipse cx="418" cy="552" rx="120" ry="12" fill="${C.wood}" opacity=".25"/>`);
  g.push(wrestler({ ...A, face: "calm" }, sA, null, null, null, aR, aL));
  g.push(deco(A, sA, C.terra, "wax2", C.dark));
  g.push(wrestler({ ...B, face: "talk" }, sB, null, null, null, bR, bL));
  g.push(deco(B, sB, C.indigo, "ndop", C.cream));
  // Brassards de gris-gris sur les biceps, mains redessinées par-dessus l'autre lutteur
  for (const [P, skin, arm, cord] of [[A, sA, aR, C.dark], [B, sB, bR, C.cream]]) {
    const [[ex, ey]] = armTo("r", arm, -16);
    g.push(`<g transform="translate(${P.x} ${P.y}) rotate(${P.rot})">` + at(0, 0, P.s, P.flip, stroke(`M27 -192L${ex} ${ey}L${f(arm[0])} ${f(arm[1])}`, skin, 12) + stroke(`M27 -192L${f((27 + ex) / 2)} ${f((-192 + ey) / 2)}`, skin, 16) +
      stroke(`M${f((27 + ex) / 2 - 2)} ${f((-192 + ey) / 2 - 7)}l4 14`, cord, 4) + hand(arm[0], arm[1], skin)) + `</g>`);
  }
  // Poussière de sable soulevée
  for (const [x, y, r] of [[318, 540, 6], [304, 532, 4], [528, 542, 5], [542, 530, 3.5], [418, 546, 4]]) g.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${C.sand2}"/>`);

  /* L'arbitre, à droite, qui suit le combat */
  const R = { x: 680, y: 560, s: 0.94 };
  g.push(person({ ...R, flip: true, skin: SKIN.s3, hair: { type: "short" }, hat: { type: "cap", color: C.dark }, top: C.white, sleeve: "short", bottom: C.dark, face: "talk",
    arms: { r: [[52, -200], [80, -232]], l: [[-40, -150], [-36, -110]] } }));
  g.push(at(R.x, R.y, R.s, true, stroke("M-6 -206L0 -170L6 -206", C.dark, 1.6) + `<rect x="-5" y="-172" width="10" height="7" rx="2" fill="${C.grey}"/>` + rect(-30, -150, 60, 6, C.dark, ' opacity=".6"') +
    stroke("M80 -232L84 -250", SKIN.s3, 4.5)));

  return frame(g.join(""), C.cream);
}

/* ---------- Scène 3 : l'anniversaire ---------- */
function anniversaire() {
  const g = [];
  // Mur du salon et bande décorative
  g.push(rect(0, 0, 800, 430, C.rose, ' opacity=".18"'), rect(0, 300, 800, 130, C.white, ' opacity=".45"'), rect(0, 296, 800, 10, C.ocre, ' opacity=".7"'));
  // Fenêtre et rideaux de pagne
  g.push(rect(560, 70, 170, 160, C.sky), rect(560, 70, 170, 160, C.blue, ' opacity=".25"'));
  g.push(`<svg x="560" y="70" width="170" height="160">${palm(130, 200, 0.75, -10)}${cloud(10, 46, 0.6)}</svg>`);
  g.push(stroke("M645 70V230M560 150H730", C.white, 6), rect(552, 228, 186, 10, C.white));
  g.push(cloth("M548 60H590Q580 150 596 238H548Z", C.green, "wax1"), cloth("M742 60H700Q710 150 694 238H742Z", C.green, "wax1"), rect(540, 54, 210, 8, C.wood2, ' rx="4"'));
  // Cadre photo au mur (silhouettes dedans)
  g.push(rect(80, 110, 120, 96, C.wood2, ' rx="4"'), rect(90, 120, 100, 76, C.cream));
  g.push(`<circle cx="124" cy="148" r="10" fill="${SKIN.s3}"/><path d="M106 196Q106 164 124 164Q142 164 142 196Z" fill="${C.terra}"/><circle cx="158" cy="150" r="9" fill="${SKIN.s4}"/><path d="M142 196Q142 168 158 168Q174 168 174 196Z" fill="${C.indigo}"/>`);
  // Guirlande de fanions
  const bunt = (x0, y0, x1, y1, sag, n) => {
    const cols = [C.terra, C.ocre, C.green, C.indigo, C.yellow], d = cols.map(() => "");
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n, u = 1 - t, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2 + sag * 2;
      const px = u * u * x0 + 2 * u * t * cx + t * t * x1, py = u * u * y0 + 2 * u * t * cy + t * t * y1;
      d[i % 5] += `M${Math.round(px - 11)} ${Math.round(py)}h22l-11 26Z`;
    }
    return stroke(`M${x0} ${y0}Q${(x0 + x1) / 2} ${(y0 + y1) / 2 + sag * 2} ${x1} ${y1}`, C.wood2, 2) + cols.map((c, i) => `<path d="${d[i]}" fill="${c}"/>`).join("");
  };
  g.push(bunt(0, 30, 400, 40, 26, 11), bunt(400, 40, 800, 26, 26, 11));
  // Grappe de ballons accrochée au coin du mur
  const bal = (x, y, c, r = 26) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${f(r * 1.2)}" fill="${c}"/><ellipse cx="${x - r * 0.35}" cy="${y - r * 0.4}" rx="${f(r * 0.22)}" ry="${f(r * 0.34)}" fill="${C.white}" opacity=".45"/><path d="M${x - 4} ${f(y + r * 1.2 + 6)}L${x} ${f(y + r * 1.2 - 1)}L${x + 4} ${f(y + r * 1.2 + 6)}Z" fill="${c}"/>`;
  g.push(stroke("M40 300Q46 240 54 186M40 300Q70 240 100 164M40 300Q26 250 24 210", C.grey, 1.5));
  g.push(bal(54, 160, C.ocre), bal(100, 136, C.terra), bal(24, 186, C.indigo, 22), `<circle cx="40" cy="300" r="5" fill="${C.wood2}"/>`);
  // Plancher
  g.push(rect(0, 430, 800, 170, C.wood), rect(0, 430, 800, 170, C.dark, ' opacity=".08"'));
  for (let y = 462; y < 600; y += 34) g.push(stroke(`M0 ${y}H800`, C.wood2, 2, ' opacity=".35"'));
  g.push(`<ellipse cx="400" cy="560" rx="330" ry="40" fill="${C.terra}" opacity=".5"/>`);

  /* La famille et les amis */
  // La maman en kaba et gele, qui applaudit
  const clap = { l: [[-36, -160], [-6, -180]], r: [[36, -160], [6, -184]] };
  g.push(person({ x: 186, y: 556, s: 1.02, skin: SKIN.s3, robe: "kaba", top: C.terra, wax: "wax1", hair: { type: "gele", color: C.ocre, wax: "wax2" }, face: "laugh", arms: clap }));
  // Le papa en dashiki, qui tient le cadeau
  const P = { x: 616, y: 556, s: 1.04 }, psk = SKIN.s1;
  g.push(person({ ...P, flip: true, skin: psk, hair: { type: "short" }, beard: true, top: C.indigo, wax: "kitenge", dashiki: C.ocre, bottom: C.dark, face: "talk",
    arms: { l: [[-40, -150], [-22, -128]], r: [[40, -150], [22, -128]] } }));
  g.push(at(P.x, P.y, P.s, true, rect(-30, -150, 60, 48, C.terra, ' rx="3"') + rect(-4, -150, 8, 48, C.yellow) + rect(-30, -130, 60, 8, C.yellow) +
    `<path d="M0 -150Q-18 -170 -16 -152ZM0 -150Q18 -170 16 -152Z" fill="${C.yellow}"/>` + hand(-26, -126, psk) + hand(26, -126, psk)));

  /* La table, le gâteau, les beignets et le jus */
  const G = { x: 400, y: 500, s: 0.9 }, gsk = SKIN.s4;
  g.push(person({ ...G, legs: "none", skin: gsk, hair: { type: "bantu" }, top: C.green, wax: "wax3", face: "talk",
    arms: { l: [[-54, -208], [-64, -246]], r: [[54, -208], [64, -246]] } }));
  // Joues gonflées : elle souffle les bougies, et la couronne de papier
  g.push(at(G.x, G.y, G.s, false, `<circle cx="-12" cy="-226" r="5" fill="${C.rose}" opacity=".5"/><circle cx="12" cy="-226" r="5" fill="${C.rose}" opacity=".5"/>` +
    `<path d="M-20 -262L-22 -288L-10 -274L0 -294L10 -274L22 -288L20 -262Z" fill="${C.yellow}"/><circle cx="0" cy="-294" r="3" fill="${C.red}"/><circle cx="-22" cy="-288" r="3" fill="${C.red}"/><circle cx="22" cy="-288" r="3" fill="${C.red}"/>`));
  g.push(stroke("M392 306Q396 310 392 314M404 306Q400 310 404 314", C.white, 2));
  const tx = 270, tw = 260, ty = 430;
  g.push(rect(tx - 6, ty, tw + 12, 12, C.wood2, ' rx="4"'), cloth(`M${tx} ${ty + 8}H${tx + tw}L${tx + tw + 6} ${ty + 86}H${tx - 6}Z`, C.indigo, "wax1"), rect(tx - 6, ty + 80, tw + 12, 10, C.ocre));
  g.push(rect(tx + 20, ty + 90, 10, 50, C.wood2), rect(tx + tw - 30, ty + 90, 10, 50, C.wood2));
  // Le gâteau
  const cx = 400;
  g.push(`<ellipse cx="${cx}" cy="${ty + 2}" rx="62" ry="8" fill="${C.white}"/>`, rect(cx - 50, ty - 46, 100, 46, C.cream, ' rx="6"'), rect(cx - 50, ty - 30, 100, 10, C.terra));
  g.push(`<path d="M${cx - 50} ${ty - 40}Q${cx - 40} ${ty - 30} ${cx - 30} ${ty - 40}T${cx - 10} ${ty - 40}T${cx + 10} ${ty - 40}T${cx + 30} ${ty - 40}T${cx + 50} ${ty - 40}V${ty - 46}H${cx - 50}Z" fill="${C.rose}"/>`);
  g.push(rect(cx - 34, ty - 76, 68, 32, C.white, ' rx="6"'), `<path d="M${cx - 34} ${ty - 70}Q${cx - 26} ${ty - 62} ${cx - 17} ${ty - 70}T${cx} ${ty - 70}T${cx + 17} ${ty - 70}T${cx + 34} ${ty - 70}V${ty - 76}H${cx - 34}Z" fill="${C.ocre}"/>`);
  for (const [dx, c] of [[-22, C.white], [-8, C.red], [8, C.indigo], [22, C.white]]) {
    g.push(rect(cx + dx - 2.5, ty - 96, 5, 20, c), `<path d="M${cx + dx} ${ty - 110}Q${cx + dx + 5} ${ty - 102} ${cx + dx} ${ty - 97}Q${cx + dx - 5} ${ty - 102} ${cx + dx} ${ty - 110}Z" fill="${C.yellow}"/>`);
  }
  // Beignets à gauche, verres de jus à droite
  g.push(`<ellipse cx="310" cy="${ty - 2}" rx="34" ry="8" fill="${C.white}"/>`);
  for (const [bx, by] of [[294, -10], [310, -12], [326, -10], [302, -22], [318, -22], [310, -32]]) g.push(`<circle cx="${bx}" cy="${ty + by}" r="9" fill="${C.wood}"/><circle cx="${bx - 3}" cy="${ty + by - 3}" r="3" fill="${C.ocre}" opacity=".6"/>`);
  for (const [gx, c] of [[478, C.ocre], [500, C.red], [522, C.ocre]]) g.push(`<path d="M${gx - 8} ${ty - 34}H${gx + 8}L${gx + 6} ${ty}H${gx - 6}Z" fill="${C.white}" opacity=".8"/><path d="M${gx - 7} ${ty - 24}H${gx + 7}L${gx + 6} ${ty - 1}H${gx - 6}Z" fill="${c}"/>`);

  /* Les enfants invités, devant */
  // La copine aux puffs, qui applaudit
  g.push(person({ x: 104, y: 580, s: 0.66, skin: SKIN.s2, hair: { type: "puffs" }, top: C.green, wax: "kitenge", robe: "dress", face: "laugh", arms: clap }));
  // Le petit garçon au chapeau pointu, qui tient un ballon
  const K = { x: 724, y: 584, s: 0.64 }, ksk = SKIN.s5;
  g.push(stroke(`M${f(toScene(K, -46, -224)[0])} ${f(toScene(K, -46, -224)[1])}Q700 300 690 250`, C.grey, 1.5), bal(690, 226, C.terra, 22));
  g.push(person({ ...K, skin: ksk, hair: { type: "short" }, top: C.ocre, dashiki: C.green, bottom: C.indigo, face: "laugh",
    arms: { l: [[-50, -196], [-46, -224]], r: [[40, -150], [38, -110]] } }));
  g.push(at(K.x, K.y, K.s, false, `<path d="M-16 -258L4 -312L18 -258Z" fill="${C.indigo}"/>` + stroke("M-10 -272L12 -276M-4 -290L10 -292", C.yellow, 3) + `<circle cx="4" cy="-312" r="5" fill="${C.yellow}"/>`));
  // Cadeaux au pied de la table
  g.push(rect(238, 520, 44, 40, C.ocre, ' rx="3"'), rect(256, 520, 8, 40, C.red), rect(238, 534, 44, 7, C.red));
  g.push(rect(540, 530, 52, 34, C.indigo, ' rx="3"'), rect(540, 530, 52, 34, "url(#wax1)", ' opacity=".6"'), rect(562, 530, 8, 34, C.yellow), `<path d="M566 530Q550 512 552 528ZM566 530Q582 512 580 528Z" fill="${C.yellow}"/>`);
  // Notes de la chanson et confettis
  for (const [nx, ny, c] of [[250, 250, C.indigo], [282, 226, C.terra], [530, 240, C.green]]) g.push(`<ellipse cx="${nx}" cy="${ny}" rx="7" ry="5.5" fill="${c}"/>`, stroke(`M${nx + 6} ${ny}V${ny - 30}L${nx + 18} ${ny - 24}`, c, 3));
  for (const [x, y, c, r] of [[330, 110, C.terra, 20], [460, 90, C.green, -30], [380, 150, C.ocre, 50], [520, 160, C.indigo, 10], [250, 150, C.yellow, -40], [300, 190, C.green, 60], [470, 200, C.terra, -20]])
    g.push(`<rect x="${x}" y="${y}" width="10" height="5" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`);

  return frame(g.join(""), C.cream);
}

export default [
  { id: "awale", fr: "Partie d'awalé", en: "A game of awale", tags: ["awalé", "awale", "jeu", "game", "anciens", "elders", "arbre", "tree", "village", "graines", "seeds", "manguier", "mango tree"], draw: awale },
  { id: "lutte", fr: "La lutte traditionnelle", en: "Traditional wrestling", tags: ["lutte", "wrestling", "sport", "arène", "arena", "tambour", "drum", "public", "crowd", "tradition", "Sénégal", "Senegal"], draw: lutte },
  { id: "anniversaire", fr: "L'anniversaire", en: "The birthday party", tags: ["anniversaire", "birthday", "fête", "party", "gâteau", "cake", "famille", "family", "enfants", "children", "ballons", "balloons", "cadeaux", "gifts"], draw: anniversaire },
];
