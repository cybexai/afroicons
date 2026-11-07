// Scènes : le culte des crânes (Grassfields), les funérailles, la libation aux ancêtres.
// Sujets respectés : recueillement, famille, transmission. Aucun crâne ni ossement visible (ils restent dans les jarres et la case).
import { C, SKIN, HAIR, person, frame, palm, cloud, stroke, f } from "./lib.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${r}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");
/** Position dans la scène d'un point local (hx, hy) d'un personnage. */
const toScene = (P, hx, hy) => [P.x + (P.flip ? -hx : hx) * P.s, P.y + hy * P.s];
/** Mains jointes devant soi (recueillement). */
const joined = { l: [[-30, -160], [-5, -142]], r: [[30, -160], [5, -142]] };
/** Noix de kola : petit fruit rose-brun fendu. */
const kola = (x, y, r = 5) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${r}" ry="${f(r * 0.8)}" fill="${C.rose}"/>` + stroke(`M${f(x - r * 0.6)} ${f(y)}Q${f(x)} ${f(y - 2)} ${f(x + r * 0.6)} ${f(y)}`, C.wood2, 1.2);
/** Calebasse à long col (vin de palme). */
const gourd = (x, y, s = 1) => `<g transform="translate(${f(x)} ${f(y)}) scale(${s})"><circle cx="0" cy="0" r="14" fill="${C.ocre}"/><path d="M-5 -10Q-6 -26 -3 -30H3Q6 -26 5 -10Z" fill="${C.ocre}"/><rect x="-4" y="-34" width="8" height="5" rx="2" fill="${C.wood2}"/><ellipse cx="-5" cy="-4" rx="4" ry="6" fill="${C.white}" opacity=".3"/>${stroke("M-13 3Q0 9 13 3", C.wood2, 2, ' opacity=".5"')}</g>`;

/* ---------- Scène 1 : le culte des crânes ---------- */
function cranes() {
  const g = [];
  // Ciel chaud de fin d'après-midi, soleil bas, collines des Grassfields
  g.push(rect(0, 0, 800, 380, C.ocre, ' opacity=".12"'), `<circle cx="150" cy="150" r="90" fill="${C.yellow}" opacity=".18"/><circle cx="150" cy="150" r="50" fill="${C.yellow}" opacity=".35"/>`);
  g.push(cloud(300, 80, 0.6));
  g.push(`<path d="M0 330Q120 250 260 300Q380 230 520 290Q650 240 800 300V420H0Z" fill="${C.leaf}" opacity=".45"/>`);
  g.push(`<path d="M0 370Q160 320 320 360Q480 320 640 360Q720 340 800 350V440H0Z" fill="${C.leaf2}" opacity=".5"/>`);
  // Eucalyptus et bananiers au loin
  for (const [x, h] of [[40, 130], [70, 100], [770, 120]]) g.push(stroke(`M${x} 400V${400 - h}`, C.wood2, 4), `<ellipse cx="${x}" cy="${400 - h}" rx="14" ry="34" fill="${C.leaf2}"/>`);
  const banana = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">${stroke("M0 0V-90", C.leaf2, 9)}<path d="M0 -88Q-50 -120 -70 -80Q-34 -96 0 -84Z" fill="${C.leaf}"/><path d="M0 -88Q46 -130 72 -92Q36 -100 0 -84Z" fill="${C.leaf2}"/><path d="M0 -90Q-10 -146 20 -160Q12 -120 2 -88Z" fill="${C.leaf}"/></g>`;
  g.push(banana(330, 430, 1), banana(372, 436, 0.8));
  // Sol de terre rouge de la concession
  g.push(`<path d="M0 420H800V600H0Z" fill="${C.rose}" opacity=".6"/><path d="M0 420H800V600H0Z" fill="${C.sand2}" opacity=".45"/>`);
  for (const [x, y] of [[60, 470], [740, 580], [300, 590], [460, 470]]) g.push(`<ellipse cx="${x}" cy="${y}" rx="14" ry="3" fill="${C.wood2}" opacity=".25"/>`);

  /* La petite case des crânes : murs de terre sur ossature de bambou, toit de chaume conique */
  const hx0 = 490, hx1 = 730, hy = 540, wy = 352;
  g.push(`<ellipse cx="610" cy="${hy}" rx="150" ry="12" fill="${C.wood2}" opacity=".25"/>`);
  g.push(rect(hx0, wy, hx1 - hx0, hy - wy, C.sand2), rect(hx0, wy, hx1 - hx0, hy - wy, C.rose, ' opacity=".45"'));
  g.push(`<path d="${[...Array(7)].map((_, i) => `M${hx0 + 18 + i * 34} ${wy}V${hy}`).join("")}${[...Array(5)].map((_, i) => `M${hx0} ${wy + 18 + i * 36}H${hx1}`).join("")}" stroke="${C.wood}" stroke-width="2.5" opacity=".35"/>`);
  g.push(rect(hx0, hy - 18, hx1 - hx0, 18, C.wood2, ' opacity=".35"'));
  // Porte basse, encadrement sculpté (montants à losanges, linteau à triangles)
  const dx = 610;
  g.push(rect(dx - 30, 440, 60, 100, "#2A1E17"), `<path d="M${dx - 30} 440h60v100h-60Z" fill="${C.wood2}" opacity=".35"/>`);
  for (const k of [-1, 1]) {
    const px = dx + k * 40 - 10;
    g.push(rect(px, 430, 20, 110, C.wood), `<path d="${[0, 1, 2, 3].map((i) => `M${px + 10} ${446 + i * 24}l7 10l-7 10l-7 -10Z`).join("")}" fill="${C.ocre}"/>`, `<path d="${[0, 1, 2, 3].map((i) => `M${px + 10} ${450 + i * 24}l3 6l-3 6l-3 -6Z`).join("")}" fill="${C.wood2}"/>`);
  }
  g.push(rect(dx - 56, 410, 112, 24, C.wood), `<path d="${[0, 1, 2, 3, 4, 5, 6].map((i) => `M${dx - 52 + i * 15} 430l7.5 -16l7.5 16Z`).join("")}" fill="${C.terra}"/>`, rect(dx - 56, 410, 112, 4, C.wood2));
  // Jarres de terre devant la case (couvertes) : la mémoire des ancêtres y est gardée
  const jar = (x, y, s, col) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14 -62H14L18 -54Q38 -40 36 -18Q32 0 0 2Q-32 0 -36 -18Q-38 -40 -18 -54Z" fill="${col}"/>` +
    `<path d="M-30 -34Q0 -26 30 -34" fill="none" stroke="${C.wood2}" stroke-width="3" opacity=".5"/><path d="${[-20, -10, 0, 10, 20].map((v) => `M${v} -30l3 6l-6 0Z`).join("")}" fill="${C.wood2}" opacity=".5"/>` +
    `<ellipse cx="0" cy="-62" rx="18" ry="5" fill="${C.wood2}"/><ellipse cx="0" cy="-66" rx="14" ry="6" fill="${C.wood}"/><circle cx="0" cy="-72" r="4" fill="${C.wood2}"/><ellipse cx="-16" cy="-36" rx="5" ry="10" fill="${C.white}" opacity=".18"/></g>`;
  // Dans la pénombre de la case, d'autres jarres, à peine visibles
  g.push(`<g opacity=".35">${jar(610, 536, 0.5, C.wood)}</g>`);
  g.push(jar(536, 548, 1, C.wood), jar(684, 548, 0.9, "#B8754A"));
  // Feuilles de bananier au sol avec le sel déposé, et des noix de kola
  for (const [x, y] of [[570, 560], [650, 562]]) g.push(`<path d="M${x - 26} ${y}Q${x} ${y - 14} ${x + 26} ${y}Q${x} ${y + 8} ${x - 26} ${y}Z" fill="${C.leaf}"/>`, stroke(`M${x - 24} ${y}H${x + 24}`, C.leaf2, 1.5));
  g.push(`<path d="M560 558Q570 546 580 558Z" fill="${C.white}"/>`, kola(648, 556), kola(659, 558, 4.5), kola(641, 560, 4.2));
  // Toit de chaume conique (débord au-dessus des murs)
  g.push(`<path d="M462 366L610 140L758 366Q610 384 462 366Z" fill="${C.wood}"/><path d="M462 366L610 140L758 366Q610 384 462 366Z" fill="${C.yellow}" opacity=".18"/>`);
  for (const t of [0.35, 0.58, 0.8]) { const yy = 140 + 226 * t, ww = 148 * t; g.push(stroke(`M${f(610 - ww)} ${f(yy)}Q610 ${f(yy + 12 * t)} ${f(610 + ww)} ${f(yy)}`, C.wood2, 3, ' opacity=".5"')); }
  g.push(`<path d="M462 366Q610 384 758 366L752 376Q610 394 468 376Z" fill="${C.wood2}" opacity=".6"/>`, stroke("M610 140V118", C.wood2, 5), `<circle cx="610" cy="116" r="6" fill="${C.wood2}"/>`);

  /* La famille, réunie derrière, recueillie */
  // La grand-mère en foulard, mains jointes
  g.push(person({ x: 92, y: 506, s: 0.84, skin: SKIN.s2, hair: { type: "foulard", color: C.green, wax: "wax3" }, robe: "boubou", top: "#1C2756", wax: "ndop", face: "calm", arms: joined }));
  // Le fils, en dashiki et kufi, mains jointes
  g.push(person({ x: 186, y: 504, s: 0.9, skin: SKIN.s4, hair: { type: "short" }, beard: true, hat: { type: "kufi", color: C.terra }, top: C.indigo, wax: "kitenge", dashiki: C.ocre, bottom: C.dark, face: "calm", arms: joined }));
  // La femme en ndop qui porte le panier d'offrandes (kola, calebasse de vin de palme)
  const W = { x: 280, y: 548, s: 0.96 }, wsk = SKIN.s3;
  g.push(person({ ...W, skin: wsk, hair: { type: "gele", color: C.indigo, wax: "ndop" }, robe: "kaba", top: "#1C2756", wax: "ndop", face: "calm",
    arms: { l: [[-36, -160], [-24, -128]], r: [[36, -160], [24, -128]] } }));
  g.push(at(W.x, W.y, W.s, false,
    gourd(12, -150, 0.85) + [[-18, -140], [-8, -144], [-13, -150], [-2, -140]].map(([x, y]) => kola(x, y, 5.5)).join("") +
    `<path d="M-34 -138H34Q32 -110 0 -106Q-32 -110 -34 -138Z" fill="${C.wood}"/>` + stroke("M-30 -128Q0 -120 30 -128M-24 -116Q0 -110 24 -116", C.wood2, 2.5) +
    `<path d="${[-26, -16, -6, 4, 14, 24].map((v) => `M${v} -136l4 8l4 -8`).join("")}" fill="none" stroke="${C.ocre}" stroke-width="2"/>` + rect(-36, -142, 72, 6, C.wood2, ' rx="3"') +
    hand(-30, -130, wsk) + hand(30, -130, wsk)));

  /* Le chef de famille, en toghu et bonnet ashetu, qui verse l'huile de palme rouge */
  const P = { x: 420, y: 546, s: 1.02 }, psk = SKIN.s1;
  const calab = (hx, hy) => `<g transform="translate(${hx + 10} ${hy - 6}) rotate(40)"><path d="M-24 -4Q-22 24 0 26Q22 24 24 -4Z" fill="${C.ocre}"/><path d="M-24 -4Q-22 24 0 26Q8 25 13 21Q-12 18 -16 -4Z" fill="${C.wood2}" opacity=".25"/>${stroke("M-20 8Q0 14 20 8", C.wood2, 2, ' opacity=".5"')}<ellipse cx="0" cy="-4" rx="24" ry="6" fill="${C.wood2}"/><ellipse cx="0" cy="-4" rx="19" ry="4" fill="${C.red}"/></g>` + hand(hx, hy, psk);
  g.push(person({ ...P, skin: psk, hair: { type: "short" }, beard: true, hat: { type: "ashetu", color: C.red, color2: C.dark }, robe: "boubou", top: "#15110F", wax: "toghu", face: "calm",
    arms: { r: [[58, -170], [80, -150]], l: [[-40, -150], [-30, -112]] }, rhand: calab }));
  // Le filet d'huile rouge qui coule jusqu'au sol, devant la jarre
  const [ox, oy] = toScene(P, 104, -146);
  g.push(stroke(`M${f(ox)} ${f(oy)}Q${f(ox + 6)} ${f(oy + 40)} ${f(ox + 4)} 552`, C.red, 4.5), `<ellipse cx="${f(ox + 4)}" cy="554" rx="14" ry="4" fill="${C.red}" opacity=".8"/>`);
  // Petit sachet de sel dans la main gauche
  g.push(at(P.x, P.y, P.s, false, `<path d="M-40 -116Q-30 -128 -20 -116L-22 -100Q-30 -96 -38 -100Z" fill="${C.leaf}"/><path d="M-36 -116Q-30 -124 -24 -116Z" fill="${C.white}"/>` + hand(-30, -112, psk)));

  /* Les enfants, devant, qui regardent et apprennent */
  g.push(person({ x: 150, y: 568, s: 0.58, skin: SKIN.s5, hair: { type: "bantu" }, top: C.terra, wax: "wax1", robe: "dress", face: "calm", arms: joined }));
  g.push(person({ x: 222, y: 570, s: 0.62, skin: SKIN.s3, hair: { type: "short" }, top: C.ocre, dashiki: C.green, bottom: C.indigo, face: "smile", arms: joined }));

  return frame(g.join(""), C.cream);
}

/* ---------- Scène 2 : les funérailles ---------- */
function funerailles() {
  const g = [];
  const fam = { top: C.indigo, wax: "wax1" }; // le pagne de deuil, le même pour toute la famille
  // Mur de la maison familiale au fond, toit de tôle
  g.push(rect(0, 0, 800, 300, C.sky));
  g.push(cloud(60, 60, 0.6), cloud(660, 40, 0.7));
  g.push(rect(0, 150, 800, 190, C.sand), rect(0, 150, 800, 16, C.wood, ' opacity=".35"'), `<path d="M-10 150L40 112H760L810 150Z" fill="${C.steel}"/>`);
  g.push(`<path d="${[...Array(20)].map((_, i) => `M${44 + i * 38} 114L${20 + i * 40} 150`).join("")}" stroke="${C.grey}" stroke-width="2" opacity=".5"/>`);
  for (const x of [70, 660]) g.push(rect(x, 200, 70, 70, C.indigo, ' opacity=".7"'), stroke(`M${x + 35} 200V270M${x} 235H${x + 70}`, C.white, 4), rect(x - 4, 268, 78, 6, C.white));
  // Cour de la concession
  g.push(rect(0, 330, 800, 270, C.sand2), rect(0, 330, 800, 270, C.ocre, ' opacity=".12"'));

  /* La bâche : toit rayé, lambrequin festonné, poteaux */
  const tx0 = 140, tx1 = 790, ty = 168;
  for (const x of [tx0 + 6, 460, tx1 - 16]) g.push(rect(x, ty, 7, 220, C.grey));
  g.push(`<path d="M${tx0 - 20} ${ty}L${tx0 + 30} ${ty - 56}H${tx1 - 30}L${tx1 + 20} ${ty}Z" fill="${C.white}"/>`);
  g.push(`<path d="${[...Array(14)].map((_, i) => { const x = tx0 + 36 + i * 45; return `M${x} ${ty - 56}h22l${i < 7 ? -8 : 8} 56h-24Z`; }).join("")}" fill="${C.indigo}" opacity=".85"/>`);
  g.push(`<path d="M${tx0 - 20} ${ty}${[...Array(17)].map((_, i) => `q${f(690 / 34)} 22 ${f(690 / 17)} 0`).join("")}Z" fill="${C.white}"/>`);
  g.push(stroke(`M${tx0 - 20} ${ty + 2}H${tx1 + 20}`, C.indigo, 3));

  /* Les invités assis sous la bâche (en buste, en petit) */
  const bust = (x, y, skin, top, wax, head, hc) => `<g transform="translate(${x} ${y}) scale(.5)">` +
    cloth("M-30 -184Q-30 -206 -12 -206H12Q30 -206 30 -184L28 -120H-28Z", top, wax) + rect(-7, -220, 14, 18, skin) +
    `<ellipse cx="0" cy="-238" rx="21" ry="25" fill="${skin}"/>` +
    (head === "foulard" ? `<path d="M-23 -243Q-31 -270 -15 -288Q2 -305 21 -295Q34 -285 28 -262Q27 -251 23 -243Q0 -259 -23 -243Z" fill="${hc}"/>` : `<path d="M-22 -236Q-24 -266 0 -266Q24 -266 22 -236Q12 -252 0 -254Q-12 -252 -22 -236Z" fill="${hc}"/>`) +
    `<ellipse cx="-8" cy="-237" rx="2.6" ry="3.1" fill="#0E0907"/><ellipse cx="8" cy="-237" rx="2.6" ry="3.1" fill="#0E0907"/>` + stroke("M-6 -223Q0 -218 6 -223", "#7E2F25", 2.4) + `</g>`;
  const seats = [[520, SKIN.s2, C.indigo, "wax1", "foulard", C.indigo], [570, SKIN.s4, C.terra, null, "short", HAIR], [620, SKIN.s1, C.indigo, "wax1", "short", HAIR],
    [670, SKIN.s3, C.green, "kitenge", "foulard", C.ocre], [720, SKIN.s5, C.ocre, null, "short", HAIR]];
  for (const [x, skin, top, wax, head, hc] of seats) g.push(bust(x, 372, skin, top, wax, head, hc));
  // Rangée de chaises en plastique devant eux
  for (const [x] of seats) g.push(rect(x - 18, 300, 36, 50, C.white, ' rx="6"'), rect(x - 20, 344, 40, 8, C.white, ' rx="3"'), stroke(`M${x - 16} 352V384M${x + 16} 352V384`, C.white, 4));
  g.push(rect(500, 340, 240, 4, C.steel, ' opacity=".5"'));

  /* La table d'hommage : nappe blanche, portrait encadré de l'ancien, fleurs, bougies */
  const tbx = 100, tbw = 230, tby = 330;
  g.push(rect(tbx, tby, tbw, 12, C.white), `<path d="M${tbx} ${tby + 10}H${tbx + tbw}L${tbx + tbw + 4} ${tby + 70}H${tbx - 4}Z" fill="${C.white}"/>`, `<path d="M${tbx - 4} ${tby + 62}H${tbx + tbw + 4}V${tby + 70}H${tbx - 4}Z" fill="${C.indigo}"/><path d="M${tbx - 4} ${tby + 62}H${tbx + tbw + 4}V${tby + 70}H${tbx - 4}Z" fill="url(#wax1)"/>`);
  g.push(stroke(`M${tbx + 20} ${tby + 70}V${tby + 100}M${tbx + tbw - 20} ${tby + 70}V${tby + 100}`, C.wood2, 6));
  // Le portrait : cadre doré, fond clair, l'ancien qui sourit (avec son kufi), ruban sombre en coin
  const px = 215, py = 236;
  g.push(rect(px - 46, py - 4, 92, 100, C.ocre, ' rx="4"'), rect(px - 38, py + 4, 76, 84, C.cream), `<svg x="${px - 38}" y="${py + 4}" width="76" height="84">` +
    `<path d="M6 84Q6 54 38 52Q70 54 70 84Z" fill="${C.white}"/><path d="M30 52L38 64L46 52Z" fill="${SKIN.s2}"/>` + stroke("M30 54L38 66L46 54", C.ocre, 2.5) +
    `<ellipse cx="38" cy="34" rx="15" ry="18" fill="${SKIN.s2}"/><path d="M23 26V14Q38 9 53 14V26Q38 22 23 26Z" fill="${C.terra}"/>` +
    `<ellipse cx="32" cy="34" rx="1.8" ry="2.2" fill="#0E0907"/><ellipse cx="44" cy="34" rx="1.8" ry="2.2" fill="#0E0907"/>` + stroke("M33 43Q38 47 43 43", "#7E2F25", 2) + stroke("M25 40Q26 50 38 52Q50 50 51 40", "#D8D2C8", 3) + `</svg>`);
  g.push(`<path d="M${px + 46} ${py + 14}L${px + 26} ${py - 4}H${px + 40}L${px + 46} ${py + 2}Z" fill="${C.dark}"/>`);
  // Bouquets de fleurs de part et d'autre, bougies
  const bouquet = (x, y) => `<path d="M${x - 12} ${y}H${x + 12}L${x + 8} ${y - 28}H${x - 8}Z" fill="${C.white}" opacity=".9"/>` + stroke(`M${x} ${y - 28}L${x - 16} ${y - 60}M${x} ${y - 28}L${x} ${y - 66}M${x} ${y - 28}L${x + 16} ${y - 58}`, C.leaf2, 2.5) +
    `<path d="M${x - 24} ${y - 40}Q${x - 16} ${y - 52} ${x - 8} ${y - 40}Z" fill="${C.leaf}"/><path d="M${x + 8} ${y - 42}Q${x + 18} ${y - 54} ${x + 24} ${y - 40}Z" fill="${C.leaf}"/>` +
    [[-16, -62, C.red], [0, -70, C.yellow], [16, -60, C.white], [-8, -52, C.rose], [9, -50, C.red]].map(([a, b, c]) => `<circle cx="${x + a}" cy="${y + b}" r="7" fill="${c}"/><circle cx="${x + a}" cy="${y + b}" r="2.5" fill="${C.ocre}"/>`).join("");
  g.push(bouquet(136, tby), bouquet(294, tby));
  for (const x of [172, 258]) g.push(rect(x - 3, tby - 22, 6, 22, C.white), `<path d="M${x} ${tby - 34}Q${x + 4} ${tby - 28} ${x} ${tby - 23}Q${x - 4} ${tby - 28} ${x} ${tby - 34}Z" fill="${C.yellow}"/>`);

  /* Le tambourinaire, assis à gauche */
  const T = { x: 52, y: 560, s: 0.8 }, tsk = SKIN.s1;
  g.push(person({ ...T, skin: tsk, hair: { type: "short" }, top: "#15110F", wax: "toghu", bottom: C.dark, legs: "sit", face: "laugh",
    arms: { l: [[10, -150], [62, -170]], r: [[60, -176], [104, -180]] } }));
  g.push(at(T.x, T.y, T.s, false,
    `<path d="M54 -166H126L114 -70L122 -4H58L66 -70Z" fill="${C.wood}"/><path d="M54 -166H126L114 -70L122 -4H58L66 -70Z" fill="${C.wood2}" opacity=".3"/>` +
    stroke("M58 -162L90 -70L122 -162M66 -70H114", C.cream, 2.5) + `<ellipse cx="90" cy="-166" rx="36" ry="8" fill="${C.cream}"/><ellipse cx="90" cy="-166" rx="36" ry="8" fill="none" stroke="${C.wood2}" stroke-width="3"/>` +
    hand(64, -172, tsk) + hand(104, -176, tsk)));

  /* L'invité du fond, en agbada, avec son enveloppe de soutien */
  const G2 = { x: 712, y: 476, s: 0.64 }, g2s = SKIN.s3;
  g.push(person({ ...G2, flip: true, skin: g2s, hair: { type: "rase" }, hat: { type: "kufi", color: C.white }, robe: "agbada", top: C.white, wax: "funerailles-brod", legs: "walk", face: "talk",
    arms: { l: [[-40, -150], [-32, -112]], r: [[44, -160], [60, -132]] } }));
  // Enveloppe de soutien à la famille dans la main
  g.push(at(G2.x, G2.y, G2.s, true, rect(54, -150, 26, 18, C.cream, ' rx="2"') + stroke("M54 -150L67 -140L80 -150", C.sand2, 2) + hand(60, -134, g2s)));

  /* La veuve (la famille porte le même pagne), près du portrait, qui sourit */
  g.push(person({ x: 352, y: 524, s: 0.88, skin: SKIN.s3, robe: "kaba", ...fam, hair: { type: "foulard", color: C.indigo, wax: "wax1" }, face: "smile", arms: joined }));

  /* Les danseurs de la famille, au centre */
  const D1 = { x: 462, y: 568, s: 0.96 };
  g.push(person({ ...D1, skin: SKIN.s4, robe: "kaba", ...fam, hair: { type: "gele", color: C.indigo, wax: "wax1" }, legs: "walkskirt", face: "laugh",
    arms: { l: [[-58, -200], [-74, -244]], r: [[58, -196], [80, -234]] } }));
  const D2 = { x: 578, y: 572, s: 0.98 };
  g.push(person({ ...D2, flip: true, skin: SKIN.s2, hair: { type: "short" }, ...fam, bottom: C.indigo, bwax: "wax1", legs: "walk", face: "laugh",
    arms: { l: [[-50, -178], [-66, -208]], r: [[56, -186], [70, -230]] } }));
  // Mouchoir de pagne agité dans la main levée
  g.push(at(D1.x, D1.y, D1.s, false, `<path d="M-72 -248Q-94 -270 -82 -300Q-72 -286 -58 -294Q-62 -268 -68 -242Z" fill="${C.yellow}"/><path d="M-72 -248Q-94 -270 -82 -300Q-72 -286 -58 -294Q-62 -268 -68 -242Z" fill="url(#wax3)"/>` + hand(-74, -244, SKIN.s4)));

  /* Le petit-fils, dans le même pagne, qui danse lui aussi */
  g.push(person({ x: 290, y: 576, s: 0.56, skin: SKIN.s4, hair: { type: "short" }, ...fam, bottom: C.indigo, bwax: "wax1", legs: "walk", face: "laugh",
    arms: { l: [[-56, -200], [-66, -246]], r: [[56, -200], [66, -246]] } }));

  /* Les invités qui arrivent, à droite, avec un panier de vivres */
  const G1 = { x: 690, y: 574, s: 0.84 }, g1s = SKIN.s5;
  g.push(person({ ...G1, flip: true, skin: g1s, hair: { type: "boxbraids", beads: C.ocre }, top: C.green, wax: "kitenge", robe: "dress", legs: "walkskirt", face: "smile",
    arms: { l: [[-40, -150], [-30, -110]], r: [[50, -200], [40, -270]] } }));
  g.push(at(G1.x, G1.y, G1.s, true, `<path d="M-34 -274H40Q36 -250 3 -248Q-30 -250 -34 -274Z" fill="${C.wood}"/>` + stroke("M-28 -264Q3 -256 34 -264", C.wood2, 2.5) +
    `<circle cx="-14" cy="-280" r="9" fill="${C.yellow}"/><circle cx="4" cy="-284" r="10" fill="${C.leaf}"/><circle cx="22" cy="-280" r="9" fill="${C.ocre}"/>` + hand(40, -270, g1s)));

  /* Notes de musique qui montent des tambours */
  for (const [nx, ny, c] of [[140, 440, C.terra], [176, 410, C.indigo], [214, 436, C.green]]) g.push(`<ellipse cx="${nx}" cy="${ny}" rx="7" ry="5.5" fill="${c}"/>`, stroke(`M${nx + 6} ${ny}V${ny - 28}L${nx + 17} ${ny - 22}`, c, 3));

  return frame(`<defs><pattern id="funerailles-brod" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M10 3L17 10L10 17L3 10Z" fill="none" stroke="${C.ocre}" stroke-width="1.4" opacity=".55"/></pattern></defs>` + g.join(""), C.sky);
}

/* ---------- Scène 3 : la libation aux ancêtres ---------- */
function libation() {
  const g = [];
  // Ciel du matin, soleil levant à droite, brume
  g.push(rect(0, 0, 800, 420, C.yellow, ' opacity=".1"'));
  g.push(`<circle cx="650" cy="190" r="120" fill="${C.yellow}" opacity=".14"/><circle cx="650" cy="190" r="70" fill="${C.yellow}" opacity=".22"/><circle cx="650" cy="190" r="34" fill="${C.yellow}" opacity=".7"/>`);
  for (let i = 0; i < 9; i++) { const a = (i * 22 - 88) * Math.PI / 180; g.push(stroke(`M${f(650 + Math.cos(a) * 50)} ${f(190 + Math.sin(a) * 50)}L${f(650 + Math.cos(a) * 90)} ${f(190 + Math.sin(a) * 90)}`, C.yellow, 3, ' opacity=".45"')); }
  // Le village au loin : cases au toit de chaume
  g.push(`<path d="M0 400Q200 360 420 390Q620 350 800 380V440H0Z" fill="${C.leaf}" opacity=".35"/>`);
  for (const [x, w] of [[540, 54], [612, 44], [690, 58], [760, 40]]) g.push(rect(x - w / 2, 384, w, 34, C.sand2), `<path d="M${x - w / 2 - 8} 388L${x} ${388 - w * 0.6}L${x + w / 2 + 8} 388Z" fill="${C.wood}"/>`, rect(x - 5, 400, 10, 18, C.wood2));
  g.push(palm(744, 420, 0.5, -8));
  // Brume du matin
  g.push(`<path d="M0 410Q200 396 400 412T800 408V430H0Z" fill="${C.white}" opacity=".55"/>`);
  // Herbe et sentier de terre
  g.push(rect(0, 420, 800, 180, C.leaf, ' opacity=".35"'), rect(0, 420, 800, 180, C.sand, ' opacity=".4"'));
  g.push(`<path d="M380 600Q430 520 520 470Q600 440 800 432V448Q620 456 560 486Q480 528 470 600Z" fill="${C.rose}" opacity=".35"/>`);

  /* Le grand fromager sacré, à gauche : contreforts, tronc gris, large couronne */
  const tx = 210;
  g.push(`<ellipse cx="${tx + 20}" cy="548" rx="200" ry="20" fill="${C.leaf2}" opacity=".25"/>`);
  const trunk = `M${tx - 36} 120Q${tx - 38} 300 ${tx - 56} 430Q${tx - 70} 524 ${tx - 176} 550H${tx + 214}Q${tx + 110} 524 ${tx + 96} 430Q${tx + 66} 300 ${tx + 64} 120Z`;
  g.push(`<clipPath id="libation-tronc"><path d="${trunk}"/></clipPath><path d="${trunk}" fill="#8C7A6B"/>`, `<path d="M${tx + 40} 130Q${tx + 50} 300 ${tx + 80} 440Q${tx + 66} 300 ${tx + 64} 120Z" fill="${C.white}" opacity=".1"/>`, `<path d="M${tx + 4} 550Q${tx + 8} 500 ${tx + 14} 460Q${tx + 26} 510 ${tx + 50} 550Z" fill="${C.white}" opacity=".12"/>`);
  g.push(`<path d="M${tx - 20} 548Q${tx - 30} 500 ${tx - 60} 480L${tx - 40} 470Q${tx - 6} 500 ${tx} 548Z" fill="${C.dark}" opacity=".16"/><path d="M${tx + 70} 548Q${tx + 70} 500 ${tx + 100} 478L${tx + 84} 470Q${tx + 50} 500 ${tx + 46} 548Z" fill="${C.dark}" opacity=".16"/>`);
  g.push(stroke(`M${tx - 10} 160Q${tx - 4} 300 ${tx - 20} 440M${tx + 36} 170Q${tx + 30} 300 ${tx + 44} 440`, C.dark, 3, ' opacity=".12"'));
  // Branches et couronne
  g.push(stroke(`M${tx - 30} 160Q${tx - 120} 120 ${tx - 200} 110M${tx + 50} 150Q${tx + 140} 110 ${tx + 230} 100`, "#8C7A6B", 18));
  for (const [cx, cy, rx, ry, c] of [[tx - 170, 70, 120, 60, C.leaf2], [tx + 10, 40, 160, 70, C.leaf], [tx + 210, 70, 120, 56, C.leaf2], [tx - 90, 120, 90, 40, C.leaf], [tx + 120, 116, 100, 40, C.leaf], [tx + 10, 120, 70, 34, C.leaf2]])
    g.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${c}"/>`);
  // Pagnes noués autour du tronc (offerts aux ancêtres) : un wax, un blanc, un ndop
  const band = (y, h, col, pat) => cloth(`M${tx - 52} ${y}Q${tx + 10} ${y + 12} ${tx + 72} ${y}V${y + h}Q${tx + 10} ${y + h + 12} ${tx - 52} ${y + h}Z`, col, pat);
  g.push(`<g clip-path="url(#libation-tronc)">${band(250, 30, C.terra, "wax2")}${band(300, 22, C.white, null)}${band(336, 28, "#1C2756", "ndop")}</g>`);
  g.push(`<path d="M${tx + 30} 262L${tx + 50} 300L${tx + 36} 302L${tx + 24} 270Z" fill="${C.terra}"/><path d="M${tx + 30} 262L${tx + 14} 298L${tx + 26} 300L${tx + 36} 270Z" fill="${C.terra}"/><circle cx="${tx + 30}" cy="266" r="7" fill="${C.terra}"/><circle cx="${tx + 30}" cy="266" r="7" fill="rgba(0,0,0,.18)"/>`);
  g.push(`<path d="M${tx - 12} 344L${tx - 26} 384L${tx - 14} 386L${tx - 4} 350Z" fill="#1C2756"/><circle cx="${tx - 8}" cy="348" r="7" fill="#1C2756"/>`);
  // Feuille avec les noix de kola, au pied de l'arbre ; petit tas de kolas sur la racine
  g.push(`<path d="M260 556Q300 532 344 552Q302 570 260 556Z" fill="${C.leaf2}"/>`, stroke("M264 555Q300 548 340 552", C.leaf, 1.5));
  for (const [x, y] of [[286, 548], [300, 551], [314, 548], [294, 541], [308, 542]]) g.push(kola(x, y, 6));

  /* L'ancien en boubou et kufi qui verse le vin de palme d'une corne, vers l'arbre */
  const P = { x: 430, y: 556, s: 1.04, flip: true }, psk = SKIN.s2;
  const horn = (hx, hy) => `<path d="M${hx - 28} ${hy - 46}Q${hx - 2} ${hy - 42} ${hx + 26} ${hy + 8}L${hx + 12} ${hy + 22}Q${hx - 10} ${hy - 26} ${hx - 30} ${hy - 42}Z" fill="${C.wood}"/>` +
    `<path d="M${hx - 28} ${hy - 46}Q${hx - 20} ${hy - 45} ${hx - 14} ${hy - 40}L${hx - 18} ${hy - 34}Q${hx - 24} ${hy - 39} ${hx - 30} ${hy - 42}Z" fill="${C.wood2}"/>` +
    stroke(`M${hx - 2} ${hy - 30}l-6 8M${hx + 10} ${hy - 12}l-8 7`, C.sand, 3) + `<ellipse cx="${hx + 19}" cy="${hy + 15}" rx="10" ry="4.5" fill="${C.wood2}" transform="rotate(-45 ${hx + 19} ${hy + 15})"/>` + hand(hx, hy, psk);
  g.push(person({ ...P, skin: psk, hair: { type: "rase", color: C.grey }, beard: true, robe: "boubou", top: C.white, wax: "libation-brod", hat: { type: "kufi", color: C.terra, wax: "kente" }, face: "calm",
    arms: { r: [[60, -172], [84, -154]], l: [[-40, -150], [-30, -112]] }, rhand: horn }));
  // Le filet de vin de palme, blanc laiteux, jusqu'au sol près des kolas
  const [mx, my] = toScene(P, 104, -136);
  g.push(stroke(`M${f(mx)} ${f(my)}Q${f(mx - 4)} ${f(my + 60)} ${f(mx + 2)} 548`, C.white, 4), stroke(`M${f(mx)} ${f(my)}Q${f(mx - 4)} ${f(my + 60)} ${f(mx + 2)} 548`, C.sand, 1.5, ' opacity=".6"'), `<ellipse cx="${f(mx + 2)}" cy="550" rx="12" ry="3.5" fill="${C.white}" opacity=".85"/>`);
  for (const [dx, dy] of [[-10, 544], [12, 546]]) g.push(`<circle cx="${f(mx + dx)}" cy="${dy}" r="2" fill="${C.white}"/>`);

  /* Sa femme, en kaba et foulard, mains jointes */
  g.push(person({ x: 556, y: 548, s: 0.96, flip: true, skin: SKIN.s4, robe: "kaba", top: C.terra, wax: "wax1", hair: { type: "foulard", color: C.green, wax: "kitenge" }, face: "calm", arms: joined }));

  /* La petite-fille qui tient la calebasse de vin de palme, prête à resservir le grand-père */
  const K = { x: 474, y: 572, s: 0.62, flip: true }, ksk = SKIN.s5;
  g.push(person({ ...K, skin: ksk, hair: { type: "nattes" }, top: C.indigo, wax: "kitenge", robe: "dress", face: "smile",
    arms: { l: [[-34, -160], [-18, -128]], r: [[34, -160], [18, -128]] } }));
  g.push(at(K.x, K.y, K.s, true, gourd(0, -124, 1.45) + hand(-18, -128, ksk) + hand(18, -128, ksk)));
  /* Le petit-fils, mains jointes, qui regarde le grand-père */
  g.push(person({ x: 640, y: 572, s: 0.6, flip: true, skin: SKIN.s3, hair: { type: "short" }, top: C.terra, dashiki: C.ocre, bottom: C.indigo, face: "calm", arms: joined }));

  // Oiseaux du matin
  for (const [bx, by] of [[540, 110], [570, 96], [600, 120]]) g.push(stroke(`M${bx - 8} ${by}Q${bx - 4} ${by - 5} ${bx} ${by}Q${bx + 4} ${by - 5} ${bx + 8} ${by}`, C.wood2, 2));

  return frame(`<defs><pattern id="libation-brod" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M10 3L17 10L10 17L3 10Z" fill="none" stroke="${C.terra}" stroke-width="1.4" opacity=".45"/></pattern></defs>` + g.join(""), C.sky);
}

export default [
  { id: "cranes", fr: "Le culte des crânes", en: "Honouring the ancestors' skulls", tags: ["culte des crânes", "skull cult", "ancêtres", "ancestors", "Bamiléké", "Grassfields", "tradition", "mémoire", "memory", "famille", "family", "offrande", "offering", "Cameroun", "Cameroon"], draw: cranes },
  { id: "funerailles", fr: "Les funérailles", en: "The funeral celebration", tags: ["funérailles", "funeral", "deuil", "mourning", "hommage", "tribute", "famille", "family", "tradition", "danse", "dance", "tambour", "drum"], draw: funerailles },
  { id: "libation", fr: "La libation aux ancêtres", en: "Libation to the ancestors", tags: ["libation", "ancêtres", "ancestors", "vin de palme", "palm wine", "arbre sacré", "sacred tree", "fromager", "tradition", "famille", "family"], draw: libation },
];
