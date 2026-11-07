// Scènes : les grands festivals du Cameroun — le Ngondo (Sawa, Douala), le Nguon (Bamoun, Foumban), la danse des masques.
import { C, SKIN, HAIR, person, frame, cloud, stroke, f } from "./lib.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${f(r)}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");
const EYE = "#0E0907", LIP = "#7E2F25";

/** Petit personnage du public, base du buste en (0,0), tête vers -56. up : 0, 1 ou 2 bras levés ; legs : jambes (debout, en entier). */
function mini({ skin, top, wax = null, hair = "short", hc = HAIR, up = 0, mouth = "smile", legs = null }) {
  const o = [];
  if (legs) o.push(`<path d="M-15 -2L-14 38H14L15 -2Z" fill="${legs}"/><path d="M-13 41h10M3 41h10" stroke="${C.dark}" stroke-width="6" stroke-linecap="round"/>`);
  const arms = up === 2 ? "M12 -36L24 -66M-12 -36L-24 -66" : up ? "M12 -36L24 -66" : "";
  if (up) o.push(stroke(arms, top, 7), `<path d="M25 -69m-4.2 0a4.2 4.2 0 1 0 8.4 0a4.2 4.2 0 1 0-8.4 0${up === 2 ? "M-25 -69m-4.2 0a4.2 4.2 0 1 0 8.4 0a4.2 4.2 0 1 0-8.4 0" : ""}" fill="${skin}"/>`);
  o.push(cloth("M-16 0V-30Q-16 -44 0 -44Q16 -44 16 -30V0Z", top, wax), `<path d="M-3 -42V-50H3V-42Z" fill="${skin}"/><circle cy="-56" r="11" fill="${skin}"/>`);
  const H = { gele: "M-12 -60Q-22 -78 -8 -84Q0 -92 8 -84Q22 -78 12 -60Q0 -66 -12 -60Z", foulard: "M-11.5 -57Q-13 -72 0 -73Q13 -72 11.5 -57Q0 -64 -11.5 -57Z", kufi: "M-11 -60V-70Q0 -73 11 -70V-60Q0 -63 -11 -60Z",
    bantu: "M-11 -57Q-12 -68 0 -68Q12 -68 11 -57Q0 -62 -11 -57ZM-11 -68a4 4 0 1 0 8 0a4 4 0 1 0-8 0M3 -68a4 4 0 1 0 8 0a4 4 0 1 0-8 0", short: "M-11 -56Q-12 -68 0 -68Q12 -68 11 -56Q0 -63 -11 -56Z" };
  o.push(`<path d="${H[hair]}" fill="${hc}"/>`, `<path d="M-5.5 -56a1.5 1.8 0 1 0 3 0a1.5 1.8 0 1 0-3 0M2.5 -56a1.5 1.8 0 1 0 3 0a1.5 1.8 0 1 0-3 0" fill="${EYE}"/>`);
  o.push(mouth === "laugh" ? `<path d="M-4 -50Q0 -51 4 -50Q3 -46 0 -46Q-3 -46 -4 -50Z" fill="${LIP}"/>` : stroke("M-3.5 -50Q0 -47.5 3.5 -50", LIP, 1.4));
  return o.join("");
}
/** Le public, en 6 variantes définies une fois par scène (<defs>), puis réutilisées avec <use>. */
const PUB = [[SKIN.s2, C.terra, "wax1", "gele", C.ocre, 1, C.terra], [SKIN.s4, C.indigo, null, "short", HAIR, 0, C.dark], [SKIN.s1, C.green, "kitenge", "foulard", C.terra, 2, C.green], [SKIN.s5, C.ocre, null, "bantu", HAIR, 1, C.indigo],
  [SKIN.s3, "#1C2756", "ndop", "kufi", C.white, 0, "#1C2756"], [SKIN.s1, "#15110F", "toghu", "short", HAIR, 2, C.dark]];
const pubDefs = (id, legs = false) => `<defs>${PUB.map(([skin, top, wax, hair, hc, up, lc], k) => `<g id="${id}-m${k}">${mini({ skin, top, wax, hair, hc, up, mouth: k % 3 ? "smile" : "laugh", legs: legs ? lc : null })}</g>`).join("")}</defs>`;
const use = (id, x, y, s = 1) => `<use href="#${id}" transform="translate(${f(x)} ${f(y)}) scale(${s})"/>`;
const row = (id, xs, y, s, off = 0) => xs.map((x, i) => use(`${id}-m${(i + off) % PUB.length}`, x, y, s)).join("");
/** Guirlande de fanions entre deux points. */
function bunting(x0, y0, x1, y1, sag, n, cols) {
  const P = [], o = [stroke(`M${x0} ${y0}Q${(x0 + x1) / 2} ${(y0 + y1) / 2 + sag * 2} ${x1} ${y1}`, C.dark, 1.6)];
  for (let i = 1; i < n; i++) {
    const t = i / n, x = (1 - t) ** 2 * x0 + 2 * t * (1 - t) * (x0 + x1) / 2 + t * t * x1, y = (1 - t) ** 2 * y0 + 2 * t * (1 - t) * ((y0 + y1) / 2 + sag * 2) + t * t * y1;
    (P[i % cols.length] ??= []).push(`M${f(x - 8)} ${f(y)}h16l-8 18Z`);
  }
  return o.join("") + P.map((d, k) => `<path d="${d.join("")}" fill="${cols[k]}"/>`).join("");
}

/* ---------- Scène 1 : le Ngondo, sur le Wouri ---------- */
/** Pagayeur assis (repère local, assise sur le plat-bord en 0,0) : le corps (derrière la coque) et la pagaie avec les bras (devant). */
const PH = [[-4, -36], [-14, -30]];
const paddlerBack = (skin, top, band) => cloth("M-9 0V-30Q-9 -40 0 -40Q9 -40 9 -30V0Z", top, null) +
  `<circle cx="0" cy="-48" r="8" fill="${skin}"/><path d="M-8 -50Q-8 -58 0 -58Q8 -58 8 -50Q0 -54 -8 -50Z" fill="${HAIR}"/>` + rect(-8.4, -53.5, 16.8, 4, band, ' rx="2"') +
  `<circle cx="-3" cy="-47" r="1.2" fill="${EYE}"/><circle cx="3" cy="-47" r="1.2" fill="${EYE}"/>` + stroke("M-2.5 -43Q0 -41.5 2.5 -43", LIP, 1.1);
const paddlerFront = (skin, ph) => {
  const [hx, hy] = PH[ph];
  return stroke(`M${hx + 10} ${hy - 12}L${hx - 18} 14`, C.wood2, 3) + `<ellipse cx="${hx - 18}" cy="12" rx="3.6" ry="8" fill="${C.wood2}" transform="rotate(34 ${hx - 18} 12)"/>` +
    `<ellipse cx="${hx - 20}" cy="20" rx="9" ry="2.6" fill="${C.white}" opacity=".85"/>` +
    stroke(`M-6 -34L${hx} ${hy}`, skin, 5) + stroke(`M6 -34L${hx + 8} ${hy - 10}`, skin, 5) + hand(hx, hy, skin, 3.4) + hand(hx + 8, hy - 10, skin, 3.4);
};
/** Pirogue de course, proue à gauche, ligne de flottaison en (0,0), longueur L. crew : ids des pagayeurs définis dans <defs>. */
function racer(x, y, s, L, hull, band, crew, dots) {
  const o = [], n = crew.length, step = (L - 30) / (n - 1), px = (i) => f(-L / 2 + 15 + i * step);
  const d = `M${-L / 2} -16Q${-L / 2 - 26} -18 ${-L / 2 - 44} -36Q${-L / 2 - 34} -8 ${-L / 2 + 4} 6Q0 12 ${L / 2 - 6} 6Q${L / 2 + 20} 0 ${L / 2 + 30} -24Q${L / 2 + 16} -16 ${L / 2} -16Z`;
  crew.forEach((id, i) => o.push(`<use href="#${id}b" x="${px(i)}" y="-12"/>`));
  o.push(`<path d="${d}" fill="${hull}"/>`, stroke(`M${-L / 2 - 30} -14Q0 -2 ${L / 2 + 16} -14`, band, 5), stroke(`M${-L / 2 - 20} -4Q0 6 ${L / 2 + 8} -4`, C.white, 2.5, ' opacity=".8"'));
  for (let i = 0; i < 10; i++) o.push(`<circle cx="${f(-L / 2 + 10 + i * (L - 20) / 9)}" cy="-8" r="2.6" fill="${dots}"/>`);
  crew.forEach((id, i) => o.push(`<use href="#${id}f" x="${px(i)}" y="-12"/>`));
  // Proue sculptée (tangué) et fanion
  o.push(stroke(`M${-L / 2 - 42} -34L${-L / 2 - 46} -78`, C.wood2, 3), `<path d="M${-L / 2 - 46} -78L${-L / 2 - 20} -70L${-L / 2 - 46} -60Z" fill="${band}"/>`, `<circle cx="${-L / 2 - 42}" cy="-38" r="5" fill="${dots}"/>`);
  o.push(stroke(`M${-L / 2 - 64} 10Q${-L / 2 - 44} 4 ${-L / 2 - 24} 10M${L / 2 + 14} 12Q${L / 2 + 44} 6 ${L / 2 + 74} 12`, C.white, 2.5, ' opacity=".8"'));
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${s})">${o.join("")}</g>`;
}
/** Mât et long fanion. */
const pennant = (x, y, h, col) => rect(x - 3, y - h, 6, h, C.wood2) + `<circle cx="${x}" cy="${y - h}" r="5" fill="${C.ocre}"/>` + `<path d="M${x + 3} ${y - h + 6}Q${x + 40} ${y - h + 2} ${x + 70} ${y - h + 18}Q${x + 40} ${y - h + 22} ${x + 3} ${y - h + 34}Z" fill="${col}"/>`;
function ngondo() {
  const g = [];
  // Les pagayeurs : 6 variantes (peau, tenue, bandeau, temps de la pagaie)
  const PA = [[SKIN.s2, C.terra, C.red], [SKIN.s4, C.ocre, C.red], [SKIN.s3, C.indigo, C.green], [SKIN.s5, C.white, C.green]];
  g.push(`<defs>${PA.map(([sk, top, band], k) => `<g id="ngondo-p${k}b">${paddlerBack(sk, top, band)}</g><g id="ngondo-p${k}f">${paddlerFront(sk, k < 2 ? 0 : 1)}</g>`).join("")}</defs>`, pubDefs("ngondo", true));
  // Ciel, ville au loin
  g.push(rect(0, 0, 800, 230, C.sky), cloud(90, 56, 0.8), cloud(590, 40, 0.7));
  const city = [[40, 150, 40], [86, 128, 30], [120, 160, 50], [178, 112, 34], [216, 140, 44], [268, 152, 30], [500, 146, 36], [540, 118, 28], [574, 136, 46], [626, 104, 30], [662, 150, 50], [718, 130, 36], [756, 156, 40]];
  for (const [x, y, w] of city) g.push(rect(x, y, w, 210 - y, C.steel, ' opacity=".75"'), `<path d="${[0, 1, 2].map((k) => `M${x + 6} ${y + 12 + k * 16}H${x + w - 6}`).join("")}" stroke="${C.white}" stroke-width="4" opacity=".6"/>`);
  g.push(`<path d="M300 210Q340 176 380 176Q420 176 460 210Z" fill="${C.steel}" opacity=".6"/>`);
  // Le fleuve et le pont sur le Wouri
  g.push(rect(0, 212, 800, 250, C.blue, ' opacity=".38"'));
  g.push(rect(0, 196, 800, 7, C.grey), rect(0, 192, 800, 3, C.steel), `<path d="${[...Array(16)].map((_, i) => `M${23 + i * 52} 203V218`).join("")}" stroke="${C.grey}" stroke-width="7"/>`);
  for (const [x, y, w] of [[80, 250, 60], [620, 262, 70], [380, 252, 50], [150, 330, 70], [700, 340, 60], [520, 424, 80], [60, 428, 50]]) g.push(stroke(`M${x} ${y}Q${x + w / 2} ${y - 5} ${x + w} ${y}`, C.white, 2.5, ' opacity=".55"'));
  // Les deux pirogues de course, au coude à coude
  g.push(racer(486, 290, 0.7, 420, C.wood2, C.green, ["ngondo-p2", "ngondo-p3", "ngondo-p2", "ngondo-p3", "ngondo-p2", "ngondo-p3", "ngondo-p2"], C.yellow));
  g.push(racer(420, 396, 0.92, 420, C.wood, C.red, ["ngondo-p0", "ngondo-p1", "ngondo-p0", "ngondo-p1", "ngondo-p0", "ngondo-p1", "ngondo-p0", "ngondo-p1"], C.white));
  // La rive au premier plan, la foule
  g.push(`<path d="M0 452Q200 436 400 448Q600 460 800 442V600H0Z" fill="${C.sand2}"/>`, `<path d="M0 452Q200 436 400 448Q600 460 800 442" fill="none" stroke="${C.white}" stroke-width="4" opacity=".7"/>`);
  g.push(row("ngondo", [300, 340, 380, 424, 462], 470, 0.86, 2), row("ngondo", [556], 470, 0.86, 5));
  g.push(pennant(30, 500, 170, C.green), pennant(746, 500, 160, C.terra));

  // Femme en kaba ngondo et gele, bras levés
  const A = { x: 112, y: 580, s: 0.86 };
  g.push(person({ ...A, skin: SKIN.s3, robe: "kaba", top: C.terra, wax: "wax1", hair: { type: "gele", color: C.ocre }, face: "laugh",
    arms: { l: [[-50, -214], [-60, -256]], r: [[50, -214], [60, -256]] } }));
  // Le joueur de tambour
  const T = { x: 238, y: 588, s: 0.84 }, tsk = SKIN.s1;
  g.push(person({ ...T, skin: tsk, hair: { type: "nattes" }, top: C.white, dashiki: C.indigo, bottom: C.indigo, bwax: "wax3", face: "talk",
    arms: { l: [[-38, -150], [-2, -128]], r: [[50, -172], [44, -204]] } }));
  g.push(at(T.x, T.y, T.s, false, stroke("M-24 -202L24 -124", C.wood2, 3) +
    `<path d="M-32 -136L-24 -58H18L26 -136Z" fill="${C.green}"/><path d="M-32 -136L-24 -58H18L26 -136Z" fill="url(#kente)" opacity=".4"/><ellipse cx="-3" cy="-136" rx="29" ry="7" fill="${C.cream}"/>` + stroke("M-28 -100H22", C.ocre, 4) +
    hand(-2, -132, tsk) + stroke("M44 -204L6 -142", C.wood2, 3.5) + hand(44, -204, tsk)));
  // L'enfant qui agite un fanion
  const K = { x: 500, y: 586, s: 0.56 }, ksk = SKIN.s4;
  g.push(person({ ...K, skin: ksk, hair: { type: "puffs" }, top: C.yellow, bottom: C.green, bwax: "wax1", legs: "skirt", sleeve: "short", face: "laugh",
    arms: { r: [[46, -212], [40, -262]] } }));
  g.push(at(K.x, K.y, K.s, false, stroke("M40 -246V-340", C.wood2, 4) + `<path d="M40 -340L92 -326L40 -310Z" fill="${C.terra}"/>` + hand(40, -262, ksk)));
  // Le couple en tenues assorties (même pagne)
  const M = { x: 600, y: 586, s: 0.88 };
  g.push(person({ ...M, skin: SKIN.s2, hair: { type: "short" }, beard: true, top: C.indigo, wax: "wax2", bottom: C.dark, face: "talk",
    arms: { l: [[-40, -150], [-38, -108]], r: [[48, -210], [56, -254]] } }));
  const W = { x: 700, y: 586, s: 0.86 };
  g.push(person({ ...W, skin: SKIN.s5, robe: "kaba", top: C.indigo, wax: "wax2", hair: { type: "gele", color: C.indigo, wax: "wax2" }, face: "laugh",
    arms: { l: [[-46, -170], [-12, -200]], r: [[46, -170], [12, -200]] } }));
  for (const [x, y] of [[330, 560], [420, 580], [780, 580], [20, 560]]) g.push(`<ellipse cx="${x}" cy="${y}" rx="9" ry="3" fill="${C.wood}" opacity=".3"/>`);
  for (const x of [360, 440]) g.push(stroke(`M${x} 576L${x - 6} 556M${x} 576L${x + 2} 552M${x} 576L${x + 8} 558`, C.leaf2, 3));
  return frame(g.join(""), C.sky);
}

/* ---------- Scène 2 : le Nguon, à Foumban ---------- */
/** Cheval paré, de profil, tête à gauche, sabots en (0,0). */
function horse(col, cap, pat) {
  const o = [];
  for (const [x0, x1, sh] of [[-44, -50, 0.85], [50, 60, 0.85], [-30, -34, 1], [62, 70, 1]]) o.push(stroke(`M${x0} -96L${x1} -46L${x1} -6`, col, 13, sh < 1 ? ' opacity=".75"' : ""), rect(x1 - 8, -8, 16, 8, C.dark, ' rx="2"'));
  o.push(stroke("M74 -126Q100 -110 92 -52", C.dark, 9), `<ellipse cx="10" cy="-112" rx="74" ry="34" fill="${col}"/>`);
  o.push(`<path d="M-30 -132L-64 -200L-90 -190L-62 -104Z" fill="${col}"/>`, `<path d="M-64 -204Q-84 -208 -116 -170Q-120 -158 -108 -156L-84 -166Q-76 -176 -60 -186Z" fill="${col}"/>`);
  o.push(`<path d="M-70 -200L-76 -222L-62 -206Z" fill="${col}"/>`, `<path d="M-60 -204Q-40 -170 -26 -132L-36 -130Q-52 -168 -70 -196Z" fill="${C.dark}"/>`);
  o.push(`<circle cx="-84" cy="-186" r="3" fill="${EYE}"/><circle cx="-83" cy="-187" r="1" fill="#fff"/>`);
  // Bride, plumet et collier à pompons
  o.push(stroke("M-62 -198L-100 -166M-72 -180L-98 -168", C.red, 3), stroke("M-64 -204L-62 -236", C.red, 4), `<circle cx="-62" cy="-240" r="7" fill="${C.yellow}"/>`);
  o.push(stroke("M-40 -150Q-56 -122 -52 -100", cap, 6), ...[-138, -122, -106].map((y, i) => `<circle cx="${-50 + i * 0.5}" cy="${y + 6}" r="4" fill="${i % 2 ? C.yellow : C.red}"/>`));
  // Caparaçon brodé
  o.push(cloth("M-34 -146Q10 -152 54 -142L58 -84H-38Z", cap, pat));
  for (let x = -34; x < 56; x += 11) o.push(`<path d="M${x} -84H${x + 11}L${x + 5.5} -72Z" fill="${C.yellow}"/>`);
  return o.join("");
}
/** Grand parasol royal multicolore, centre du bord en (0,0). */
function parasol(R) {
  const o = [], cols = [C.red, C.yellow, C.green, C.indigo, C.terra, C.yellow, C.red, C.green];
  const n = cols.length;
  for (let i = 0; i < n; i++) {
    const a0 = Math.PI + (i / n) * Math.PI, a1 = Math.PI + ((i + 1) / n) * Math.PI;
    o.push(`<path d="M0 ${-R * 0.62}L${f(Math.cos(a0) * R)} ${f(Math.sin(a0) * R * 0.18)}Q${f(Math.cos((a0 + a1) / 2) * R * 1.04)} ${f(Math.sin((a0 + a1) / 2) * R * 0.18 + 8)} ${f(Math.cos(a1) * R)} ${f(Math.sin(a1) * R * 0.18)}Z" fill="${cols[i]}"/>`);
  }
  // Frange et franges perlées
  o.push(`<path d="M${-R} 0Q0 ${R * 0.22} ${R} 0L${R} 10Q0 ${R * 0.22 + 10} ${-R} 10Z" fill="${C.white}"/>`);
  const fr = [[], []], bd = [[], []];
  for (let i = 0; i <= 16; i++) { const x = f(-R + (i * 2 * R) / 16), y = f(8 + R * 0.22 * (1 - (x / R) ** 2) * 0.95); fr[i % 2].push(`M${x} ${y}v14`); bd[i % 2].push(`M${f(x - 3)} ${f(y + 16)}a3 3 0 1 0 6 0a3 3 0 1 0-6 0`); }
  o.push(stroke(fr[0].join(""), C.yellow, 3), stroke(fr[1].join(""), C.red, 3), `<path d="${bd[0].join("")}" fill="${C.red}"/><path d="${bd[1].join("")}" fill="${C.yellow}"/>`);
  o.push(stroke(`M0 ${-R * 0.62}V${-R * 0.62 - 22}`, C.yellow, 4), `<circle cx="0" cy="${f(-R * 0.62 - 26)}" r="7" fill="${C.yellow}"/>`);
  return o.join("");
}
function nguon() {
  const g = [pubDefs("nguon", true)];
  g.push(cloud(660, 38, 0.8));
  // Le palais aux murs ocre : façade à arcades, tour centrale
  const wall = C.rose, dk = C.wood2;
  g.push(rect(90, 160, 620, 220, wall), rect(90, 160, 620, 14, dk, ' opacity=".5"'), rect(90, 260, 620, 10, dk, ' opacity=".4"'));
  g.push(`<path d="M80 162L120 128H680L720 162Z" fill="${C.wood}"/>`);
  g.push(rect(320, 70, 160, 120, wall), `<path d="M310 74L400 30L490 74Z" fill="${C.wood}"/>`, rect(320, 180, 160, 10, dk, ' opacity=".3"'));
  g.push(`<path d="${[...Array(7)].map((_, i) => `M${330 + i * 24} 60h12v14h-12Z`).join("")}" fill="${wall}"/>`);
  g.push(`<path d="M372 190V136Q372 112 400 112Q428 112 428 136V190Z" fill="${dk}"/>`);
  const arch = (x, y, w, h) => `M${x} ${y + h}V${y + w / 2}Q${x} ${y} ${x + w / 2} ${y}Q${x + w} ${y} ${x + w} ${y + w / 2}V${y + h}Z`;
  const ar = [];
  for (let x = 108; x < 700; x += 46) if (x < 300 || x > 480) ar.push(arch(x, 190, 26, 56));
  for (let x = 104; x < 700; x += 54) ar.push(arch(x, 286, 34, 94));
  g.push(`<path d="${ar.join("")}" fill="${dk}"/>`);
  // Frise ondulée (le serpent du palais)
  g.push(stroke("M110 266Q140 256 170 266T230 266T290 266T350 266T410 266T470 266T530 266T590 266T650 266T690 266", C.yellow, 3));
  for (const x of [330, 470]) g.push(stroke(`M${x} 60V20`, C.grey, 3), `<path d="M${x} 20L${x + 26} 28L${x} 36Z" fill="${x < 400 ? C.red : C.green}"/>`);
  // La place, la foule qui salue devant le palais
  g.push(rect(0, 380, 800, 220, C.sand2), rect(0, 380, 800, 220, C.wood, ' opacity=".22"'));
  g.push(row("nguon", [24, 62, 100, 138, 176, 214, 252, 290, 556, 594, 632, 670, 708, 746, 784], 398, 0.8, 0));
  g.push(row("nguon", [40, 200, 580, 780], 420, 0.9, 3));
  g.push(`<ellipse cx="420" cy="584" rx="390" ry="18" fill="${C.wood2}" opacity=".18"/>`);

  // Le cavalier, sur son cheval paré (à gauche), tête du cheval vers le cortège
  const H = { x: 124, y: 524, s: 0.92 };
  g.push(at(H.x, H.y, H.s, true, horse(C.white, C.indigo, "ndop")));
  const rsk = SKIN.s4, rider = { x: H.x - 10 * H.s, y: H.y - 144 * H.s + 112 * 0.7, s: 0.7 };
  const [mx, my] = [H.x + 112 * H.s, H.y - 166 * H.s];
  g.push(person({ ...rider, skin: rsk, legs: "none", robe: "boubou", top: C.green, wax: "wax1", hat: { type: "kufi", color: C.red }, hair: { type: "rase" }, face: "smile",
    arms: { l: [[-46, -170], [-54, -214]], r: [[44, -150], [64, -140]] } }));
  g.push(at(rider.x, rider.y, rider.s, false, cloth("M-34 -120H34L44 -56Q0 -46 -44 -56Z", C.green, "wax1") + stroke("M10 -60L12 -14", rsk, 12) + `<ellipse cx="18" cy="-8" rx="13" ry="6" fill="${C.dark}"/>` + hand(64, -140, rsk)));
  g.push(stroke(`M${f(rider.x + 64 * rider.s)} ${f(rider.y - 140 * rider.s)}L${f(mx)} ${f(my)}`, C.red, 2));
  // Le joueur de tambour
  const D = { x: 256, y: 592, s: 0.84 }, dsk = SKIN.s5;
  // Le notable de gauche, ndop et bonnet à boules (derrière le tambour)
  g.push(person({ x: 322, y: 552, s: 0.86, skin: SKIN.s2, robe: "boubou", top: "#1C2756", wax: "ndop", hat: { type: "kufi", color: C.white, wax: "wax3" }, hair: { type: "rase" }, beard: true, face: "smile",
    arms: { l: [[-44, -150], [-30, -112]], r: [[46, -176], [40, -216]] } }));
  g.push(person({ ...D, skin: dsk, hair: { type: "short" }, top: C.indigo, wax: "wax1", bottom: C.dark, hat: { type: "kufi", color: C.terra }, face: "laugh",
    arms: { l: [[-38, -150], [-8, -128]], r: [[50, -176], [44, -210]] } }));
  g.push(at(D.x, D.y, D.s, false, stroke("M-24 -202L24 -124", C.wood2, 3) + `<path d="M-30 -136L-20 -60H18L26 -136Z" fill="${C.wood}"/><ellipse cx="-2" cy="-136" rx="28" ry="7" fill="${C.cream}"/>` + stroke("M-28 -112L20 -82M24 -112L-24 -82", C.red, 3) +
    hand(-8, -132, dsk) + stroke("M44 -210L6 -144", C.wood2, 3.5) + hand(44, -210, dsk)));
  // Le porteur du parasol, derrière le roi : la hampe penche au-dessus du roi
  const P = { x: 534, y: 536, s: 0.84 }, psk = SKIN.s3, top = [454, 214], bot = [540, 452];
  const onPole = (y) => [top[0] + ((y - top[1]) / (bot[1] - top[1])) * (bot[0] - top[0]), y];
  const h1 = onPole(P.y - 214 * P.s), h2 = onPole(P.y - 172 * P.s), loc = ([x, y]) => [(x - P.x) / P.s, (y - P.y) / P.s];
  g.push(person({ ...P, skin: psk, robe: "boubou", top: C.ocre, hair: { type: "rase" }, hat: { type: "kufi", color: C.white }, face: "calm",
    arms: { l: [[-46, -180], loc(h1)], r: [[34, -150], loc(h2)] } }));
  g.push(stroke(`M${top[0]} ${top[1]}L${bot[0]} ${bot[1]}`, C.wood2, 6), hand(...h1, psk, 6.3), hand(...h2, psk, 6.3));
  // Le roi, en grand boubou brodé, coiffe royale et chasse-mouches
  const R = { x: 436, y: 578, s: 1.04 }, ksk = SKIN.s3;
  g.push(person({ ...R, skin: ksk, robe: "agbada", top: C.white, wax: "wax3", dashiki: C.ocre, hair: { type: "rase" }, beard: true, face: "smile",
    arms: { l: [[-52, -170], [-58, -206]], r: [[46, -150], [40, -112]] } }));
  g.push(at(R.x, R.y, R.s, false,
    cloth("M-24 -246Q-30 -300 0 -306Q30 -300 24 -246Q0 -254 -24 -246Z", C.indigo, "ndop") + `<path d="M-25 -244Q0 -254 25 -244L24 -256Q0 -264 -24 -256Z" fill="${C.yellow}"/>` + `<circle cx="0" cy="-306" r="6" fill="${C.yellow}"/>` +
    stroke("M-58 -206L-64 -250", C.wood2, 5) + `<circle cx="-64" cy="-252" r="5" fill="${C.yellow}"/>` + stroke("M-64 -254Q-80 -250 -78 -214M-64 -254Q-72 -244 -68 -210M-64 -254Q-86 -256 -86 -222", C.cream, 4) + hand(-58, -206, ksk)));
  g.push(at(top[0], top[1], 1, false, parasol(112)));
  // Le second notable
  g.push(person({ x: 628, y: 552, s: 0.86, skin: SKIN.s1, robe: "boubou", top: C.terra, wax: "wax2", hat: { type: "kufi", color: C.red }, hair: { type: "rase" }, face: "talk",
    arms: { l: [[-44, -150], [-34, -112]], r: [[40, -150], [32, -110]] } }));
  // Le joueur de trompe, la trompe levée vers le ciel
  const Tr = { x: 704, y: 590, s: 0.82 }, trs = SKIN.s4;
  g.push(person({ ...Tr, skin: trs, robe: "boubou", top: C.green, wax: "kitenge", hair: { type: "rase" }, hat: { type: "kufi", color: C.yellow }, face: "calm",
    arms: { l: [[-20, -170], [11, -240]], r: [[46, -200], [31, -288]] } }));
  // La trompe : un long cône de bois qui s'évase, cerclé de laiton
  g.push(at(Tr.x, Tr.y, Tr.s, false, `<path d="M6.8 -220.9L1.2 -223.1L32 -324.9L56 -315.1Z" fill="${C.wood}"/><ellipse cx="44" cy="-320" rx="13" ry="5" transform="rotate(22 44 -320)" fill="${C.wood2}"/>` +
    stroke("M8.4 -252.4L18.6 -248.2M20.2 -282.6L33.4 -277.2", C.yellow, 3) + hand(11, -240, trs) + hand(31, -288, trs)));
  return frame(g.join(""), C.cream);
}

/* ---------- Scène 3 : la danse des masques ---------- */
/** Raphia : franges sombres communes (jupe, collerette, chevillères), posées sur un aplat de la couleur du danseur. */
const rafDefs = () => {
  const sk = [], co = [], an = [];
  for (let i = 0; i <= 16; i += 2) { const t = -28 + i * 3.5; sk.push(`M${f(t)} -124L${f(t * 1.55)} ${-46 + (i % 3) * 5}`); }
  for (let i = 0; i <= 14; i += 2) { const t = -30 + i * (60 / 14); co.push(`M${f(t * 0.6)} -212L${f(t * 1.25)} ${-166 + (i % 4) * 2}`); }
  for (const [ax, ay] of [[-30, -24], [22, -20]]) for (let k = -2; k <= 2; k++) an.push(`M${ax + k * 4} ${ay - 12}L${ax + k * 6} ${ay + 4}`);
  const pl = [C.red, C.yellow, C.green, C.white, C.red, C.yellow, C.white].map((c, i) => { const a = (-150 + i * 20) * Math.PI / 180, r = 56, cx = Math.cos(a), sy = Math.sin(a); return `<path d="M0 -296L${f(cx * r - 5 * sy)} ${f(-296 + sy * r + 5 * cx)}Q${f(cx * r * 1.12)} ${f(-296 + sy * r * 1.12)} ${f(cx * r + 5 * sy)} ${f(-296 + sy * r - 5 * cx)}Z" fill="${c}"/>`; }).join("");
  const eyes = `<path d="M-20 -248Q-12 -256 -4 -248Q-12 -242 -20 -248ZM4 -248Q12 -256 20 -248Q12 -242 4 -248ZM-22.6 -232a2.6 2.6 0 1 0 5.2 0a2.6 2.6 0 1 0-5.2 0M17.4 -232a2.6 2.6 0 1 0 5.2 0a2.6 2.6 0 1 0-5.2 0" fill="${C.white}"/>` + stroke("M-17 -248H-7M7 -248H17", C.dark, 2) + `<path d="M-3 -246L0 -228L3 -246Z" fill="${C.dark}" opacity=".3"/>`;
  return `<defs><g id="masques-raf">${stroke(sk.join(""), C.wood, 4)}${stroke(co.join(""), C.wood, 4)}${stroke(an.join(""), C.wood, 3)}</g><g id="masques-plumes">${pl}</g><g id="masques-yeux">${eyes}</g><g id="masques-touffe"><path d="M-3 0L-16 -38Q0 -50 16 -38L3 0Z"/>${stroke("M0 0L-9 -38M0 0V-42M0 0L9 -38", C.wood, 1.6)}</g></defs>`;
};
/** Danseur masqué. col : tissu ; mc : bois du masque ; paint : motifs peints ; raf : couleur du raphia. */
function dancer(o) {
  const { x, y, s, flip = false, col, pat, mc, paint, raf = C.sand2, arms } = o;
  const g = [person({ x, y, s, flip, skin: C.dark, hair: { type: "rase" }, top: col, wax: pat, bottom: C.dark, legs: "walk", face: "none", shoes: C.dark, arms })];
  const L = [];
  // Jupe, chevillères et collerette de raphia
  L.push(`<path d="M-28 -124L-44 -46Q0 -36 44 -46L28 -124Z" fill="${raf}"/>`, rect(-30, -132, 60, 12, paint, ' rx="5"'));
  L.push(`<path d="M-38 -38L-44 -18H-16L-20 -38ZM14 -34L10 -14H36L32 -34Z" fill="${raf}"/>`);
  L.push(`<path d="M-18 -212L-38 -166Q0 -156 38 -166L18 -212Z" fill="${raf}"/>`, `<use href="#masques-raf"/>`);
  // Le masque en bois sculpté : visage stylisé, motifs peints, cimier de plumes
  L.push(`<use href="#masques-plumes"/>`, `<path d="M0 -312Q30 -306 30 -260Q30 -224 0 -204Q-30 -224 -30 -260Q-30 -306 0 -312Z" fill="${mc}"/>`);
  L.push(`<path d="M-30 -268Q0 -276 30 -268L30 -258Q0 -266 -30 -258Z" fill="${paint}"/>`, stroke("M0 -306V-282M-6 -219Q0 -215 6 -219", paint, 3.5), `<use href="#masques-yeux"/>`);
  // Touffes de raphia (chasse-mouches) dans les mains
  for (const side of ["l", "r"]) { const [, [hx, hy]] = arms[side]; L.push(`<use href="#masques-touffe" x="${hx}" y="${hy}" fill="${raf}"/>`, hand(hx, hy, C.dark)); }
  g.push(at(x, y, s, flip, L.join("")));
  return g.join("");
}
/** Case ronde au toit de chaume. */
const hut = (x, y, w, wall, roof) => rect(x - w / 2, y - w * 0.7, w, w * 0.7, wall) + `<path d="M${x - w / 2 - 14} ${f(y - w * 0.64)}L${x} ${f(y - w * 1.45)}L${x + w / 2 + 14} ${f(y - w * 0.64)}Z" fill="${roof}"/>` +
  `<path d="M${x - 10} ${y}V${f(y - w * 0.36)}Q${x} ${f(y - w * 0.46)} ${x + 10} ${f(y - w * 0.36)}V${y}Z" fill="${C.wood2}"/>` + rect(x - w / 2, y - w * 0.3, w, 4, C.dark, ' opacity=".15"');
function masques() {
  const g = [pubDefs("masques"), rafDefs()];
  g.push(cloud(560, 50, 0.8), cloud(300, 34, 0.6));
  // Grand arbre à palabres à gauche, cases au fond
  g.push(rect(72, 150, 34, 220, C.wood2), stroke("M88 210Q60 180 36 170M90 190Q120 160 156 156", C.wood2, 10));
  const disc = (l) => l.map(([cx, cy, r]) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`).join("");
  g.push(`<path d="${disc([[36, 130, 60], [214, 146, 48], [178, 52, 46]])}" fill="${C.leaf2}"/><path d="${disc([[134, 104, 72], [76, 62, 58]])}" fill="${C.leaf}"/><path d="${disc([[120, 170, 40]])}" fill="${C.leaf2}"/>`);
  g.push(`<path d="${disc([[100, 120, 5], [150, 80, 5], [60, 150, 5], [196, 132, 5], [130, 160, 5]])}" fill="${C.ocre}"/>`);
  g.push(hut(330, 362, 110, C.wood, C.yellow), hut(500, 354, 90, C.sand2, C.wood), hut(690, 364, 120, C.wood, C.yellow));
  g.push(bunting(110, 196, 780, 232, 14, 22, [C.terra, C.ocre, C.green, C.indigo, C.white]));
  // La place de terre rouge
  g.push(rect(0, 362, 800, 238, C.sand2), rect(0, 362, 800, 238, C.wood, ' opacity=".3"'), `<ellipse cx="440" cy="500" rx="260" ry="62" fill="${C.sand}" opacity=".55"/>`);
  // Le public au fond : debout, puis assis sur des bancs
  g.push(row("masques", [190, 230, 270, 600, 640, 680, 720, 760], 390, 0.85, 2));
  g.push(rect(170, 406, 140, 8, C.wood2, ' rx="3"'), rect(580, 406, 210, 8, C.wood2, ' rx="3"'));
  g.push(row("masques", [190, 236, 282, 604, 650, 696, 742], 428, 0.95, 5));
  g.push(rect(160, 428, 160, 10, C.wood, ' rx="3"'), rect(576, 428, 220, 10, C.wood, ' rx="3"'));

  // Les trois danseurs masqués
  g.push(`<ellipse cx="450" cy="546" rx="200" ry="14" fill="${C.wood2}" opacity=".2"/>`);
  g.push(dancer({ x: 326, y: 524, s: 0.8, col: C.terra, pat: "wax2", mc: C.wood, paint: C.white, arms: { l: [[-50, -196], [-58, -240]], r: [[48, -190], [44, -236]] } }));
  g.push(dancer({ x: 578, y: 524, s: 0.8, flip: true, col: C.indigo, pat: "ndop", mc: C.wood2, paint: C.yellow, raf: C.yellow, arms: { l: [[-50, -196], [-58, -240]], r: [[48, -176], [70, -194]] } }));
  g.push(dancer({ x: 452, y: 552, s: 0.92, col: C.green, pat: "kitenge", mc: C.ocre, paint: C.red, arms: { l: [[-56, -176], [-80, -194]], r: [[56, -176], [80, -194]] } }));

  // Le joueur de tambour, assis à gauche
  const T = { x: 58, y: 586, s: 0.84 }, tsk = SKIN.s2;
  g.push(person({ ...T, skin: tsk, hair: { type: "short" }, beard: true, top: "#15110F", wax: "toghu", bottom: C.dark, legs: "sit", face: "laugh",
    arms: { l: [[20, -150], [60, -160]], r: [[56, -172], [104, -170]] } }));
  g.push(at(T.x, T.y, T.s, false, `<path d="M52 -156H124L112 -62L120 -4H56L64 -62Z" fill="${C.wood}"/>` + stroke("M56 -152L88 -62L120 -152M64 -62H112", C.cream, 2.5) +
    `<ellipse cx="88" cy="-156" rx="36" ry="8" fill="${C.cream}"/><ellipse cx="88" cy="-156" rx="36" ry="8" fill="none" stroke="${C.wood2}" stroke-width="3"/>` + hand(60, -160, tsk) + hand(104, -166, tsk)));
  // La femme aux hochets (calebasses perlées)
  const Hk = { x: 214, y: 590, s: 0.84 }, hsk = SKIN.s4;
  g.push(person({ ...Hk, skin: hsk, robe: "kaba", top: C.ocre, wax: "wax1", hair: { type: "nattes" }, face: "laugh",
    arms: { l: [[-50, -176], [-56, -216]], r: [[48, -190], [52, -232]] } }));
  const gourd = (hx, hy) => stroke(`M${hx} ${hy}L${hx + 2} ${hy - 18}`, C.wood2, 4) + `<circle cx="${hx + 3}" cy="${hy - 32}" r="15" fill="${C.yellow}"/>` + stroke(`M${hx - 11} ${hy - 32}Q${hx + 3} ${hy - 22} ${hx + 17} ${hy - 32}M${hx - 8} ${hy - 41}Q${hx + 3} ${hy - 35} ${hx + 14} ${hy - 41}`, C.terra, 2.4, ' stroke-dasharray=".1 4.5"') + hand(hx, hy, hsk);
  g.push(at(Hk.x, Hk.y, Hk.s, false, gourd(52, -232) + gourd(-56, -216)));
  // Le balafoniste, debout derrière son balafon, à droite
  const B = { x: 700, y: 590, s: 0.86 }, bsk = SKIN.s5;
  g.push(person({ ...B, skin: bsk, hair: { type: "locks" }, top: C.white, dashiki: C.green, bottom: C.indigo, legs: "none", face: "smile",
    arms: { l: [[-46, -146], [-60, -128]], r: [[44, -150], [26, -126]] } }));
  const bal = [rect(-130, -120, 220, 8, C.wood2, ' rx="3"'), rect(-130, -100, 220, 6, C.wood2, ' rx="3"')];
  for (let i = 0; i < 11; i++) { const kx = -124 + i * 19.5, h = 30 - i * 1.4; bal.push(rect(kx, -124, 15, h, C.wood, ' rx="3"')); if (i % 2 === 0) bal.push(`<circle cx="${kx + 8}" cy="-78" r="${f(15 - i * 0.7)}" fill="${C.yellow}"/>`); }
  bal.push(stroke("M-124 -100L-120 0M84 -100L80 0", C.wood2, 6));
  bal.push(stroke("M-60 -128L-74 -116", C.wood2, 3), `<circle cx="-76" cy="-114" r="5" fill="${C.dark}"/>`, stroke("M26 -126L10 -116", C.wood2, 3), `<circle cx="8" cy="-114" r="5" fill="${C.dark}"/>`, hand(-60, -128, bsk), hand(26, -126, bsk));
  g.push(at(B.x, B.y, B.s, false, bal.join("")));
  // Deux enfants émerveillés, assis par terre devant
  g.push(person({ x: 532, y: 600, s: 0.44, skin: SKIN.s3, hair: { type: "bantu" }, top: C.yellow, bottom: C.terra, legs: "sit", sleeve: "short", face: "laugh",
    arms: { l: [[-34, -184], [-34, -232]], r: [[34, -184], [34, -232]] } }));
  g.push(person({ x: 372, y: 600, s: 0.44, flip: true, skin: SKIN.s1, hair: { type: "short" }, top: C.blue, bottom: C.indigo, legs: "sit", sleeve: "short", face: "laugh",
    arms: { l: [[-36, -160], [-8, -176]], r: [[36, -160], [8, -176]] } }));
  return frame(g.join(""), "#E3EDE0");
}

export default [
  { id: "ngondo", fr: "Le Ngondo", en: "The Ngondo festival", tags: ["Ngondo", "Sawa", "Douala", "Wouri", "fête de l'eau", "pirogues", "festival", "course de pirogues", "kaba", "gele", "tambour", "fanions", "pont", "fleuve", "water festival", "canoes", "canoe race", "river", "drum", "bridge", "crowd", "Cameroun", "Cameroon"], draw: ngondo },
  { id: "nguon", fr: "Le Nguon", en: "The Nguon festival", tags: ["Nguon", "Bamoun", "Foumban", "roi", "sultan", "cortège", "festival", "parasol royal", "palais", "notables", "cavalier", "cheval", "trompe", "tambour", "ndop", "king", "procession", "royal parasol", "palace", "rider", "horse", "horn", "drum", "Cameroun", "Cameroon"], draw: nguon },
  { id: "masques", fr: "La danse des masques", en: "The mask dance", tags: ["masques", "danse", "danseurs masqués", "festival", "village", "raphia", "plumes", "tambour", "balafon", "hochet", "public", "enfants", "anciens", "cases", "tradition", "masks", "mask dance", "dancers", "raffia", "feathers", "drum", "rattle", "crowd", "children", "elders", "huts", "Cameroun", "Cameroon"], draw: masques },
];
