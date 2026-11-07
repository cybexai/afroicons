// Scènes : la cérémonie à la chefferie, la matinée au village, les nattes sous le manguier.
import { C, SKIN, HAIR, person, frame, stroke, f } from "./lib.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="7.5" fill="${skin}"/>`;
const NDOP = "#1C2756";

/** Manguier : pied du tronc en (x,y). */
const mango = (x, y, s = 1) => {
  const o = [stroke("M0 0Q-4 -60 -2 -120", C.wood2, 26), stroke("M-2 -100Q-40 -140 -70 -150", C.wood2, 12), stroke("M-2 -110Q40 -150 74 -158", C.wood2, 12)];
  for (const [cx, cy, rx, ry, c] of [[-80, -190, 84, 62, C.leaf2], [80, -196, 90, 64, C.leaf2], [0, -246, 110, 72, C.leaf2], [-40, -214, 80, 56, C.leaf], [50, -226, 84, 56, C.leaf], [0, -170, 100, 40, C.leaf2]])
    o.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${c}"/>`);
  for (const [mx, my] of [[-96, -162], [-50, -150], [36, -146], [96, -164], [-10, -196], [70, -206], [-74, -214]])
    o.push(stroke(`M${mx} ${my - 14}V${my - 6}`, C.leaf2, 2), `<ellipse cx="${mx}" cy="${my}" rx="7" ry="10" fill="${C.yellow}"/><ellipse cx="${mx + 2}" cy="${my + 2}" rx="4" ry="6" fill="${C.ocre}"/>`);
  return `<g transform="translate(${x} ${y}) scale(${s})">${o.join("")}</g>`;
};
/** Poule : pattes en (x,y) ; flip la tourne vers la gauche. */
const hen = (x, y, s = 1, flip = false, col = C.white) => at(x, y, s, flip,
  stroke("M-4 -16L-6 0M6 -16L8 0", C.ocre, 3) +
  `<path d="M-30 -40Q-40 -64 -24 -60Q-20 -40 -10 -40Z" fill="${C.dark}"/><ellipse cx="0" cy="-30" rx="26" ry="18" fill="${col}"/><path d="M-14 -34Q0 -20 14 -30Q4 -14 -12 -22Z" fill="rgba(0,0,0,.12)"/>` +
  `<circle cx="20" cy="-48" r="10" fill="${col}"/><path d="M14 -58Q18 -66 22 -58Q26 -66 28 -56Z" fill="${C.red}"/><path d="M29 -50L37 -47L29 -44Z" fill="${C.ocre}"/><ellipse cx="24" cy="-40" rx="3" ry="4" fill="${C.red}"/><circle cx="22" cy="-50" r="1.6" fill="${C.dark}"/>`);
/** Toit de chaume conique : sommet (x, top), base de y0, demi-largeur w. */
const thatch = (x, top, y0, w, col = C.sand2) => {
  const o = [`<path d="M${x - w} ${y0}L${x} ${top}L${x + w} ${y0}Q${x} ${y0 + 22} ${x - w} ${y0}Z" fill="${col}"/>`];
  for (let i = -4; i <= 4; i++) o.push(stroke(`M${x + i * 3} ${top + 10}L${f(x + i * w / 4.4)} ${f(y0 + 8 - Math.abs(i) * 2)}`, C.wood, 2, ' opacity=".55"'));
  for (const t of [0.35, 0.62, 0.86]) { const yy = top + (y0 - top) * t, ww = w * t; o.push(stroke(`M${f(x - ww)} ${f(yy)}Q${x} ${f(yy + 14 * t)} ${f(x + ww)} ${f(yy)}`, C.wood, 4, ' opacity=".5"')); }
  return o.join("");
};

/* ---------- Scène 1 : cérémonie à la chefferie (Grassfields) ---------- */
function chefferie() {
  const g = [];
  // Collines et palmiers au loin
  g.push(`<path d="M0 330Q120 250 260 300Q400 230 560 290Q680 240 800 300V470H0Z" fill="${C.leaf}" opacity=".35"/>`);
  for (const [px, ph] of [[40, 150], [760, 170]]) {
    g.push(stroke(`M${px} 470Q${px + 8} ${470 - ph / 2} ${px + 4} ${470 - ph}`, C.wood2, 9));
    for (const [dx, dy] of [[-46, 24], [-40, -10], [0, -30], [40, -12], [48, 22]]) g.push(`<path d="M${px + 4} ${470 - ph}Q${px + 4 + dx / 2} ${470 - ph + dy - 26} ${px + 4 + dx} ${470 - ph + dy}Q${px + 4 + dx / 2} ${470 - ph + dy - 8} ${px + 4} ${470 - ph}Z" fill="${C.leaf2}"/>`);
  }
  // Cour de la chefferie : terre battue
  g.push(`<rect y="468" width="800" height="132" fill="${C.sand2}"/><path d="M0 520Q400 500 800 524V600H0Z" fill="${C.wood}" opacity=".25"/>`);
  // Case de la chefferie : murs, piliers sculptés, toit conique de chaume
  g.push(`<rect x="290" y="300" width="360" height="176" fill="${C.wood}"/>`);
  for (let bx = 296; bx < 646; bx += 12) g.push(`<rect x="${bx}" y="300" width="5" height="176" fill="${C.wood2}" opacity=".35"/>`);
  g.push(`<rect x="290" y="300" width="360" height="26" fill="url(#ndop)"/>`); // frise en tissu ndop sous l'avant-toit
  // Panneau d'honneur derrière le Fon, au cadre sculpté
  g.push(`<rect x="362" y="338" width="176" height="138" fill="${C.wood2}"/><rect x="372" y="348" width="156" height="128" fill="${C.terra}"/>`);
  for (let yy = 344; yy < 470; yy += 14) g.push(`<path d="M366 ${yy}L372 ${yy + 7}L366 ${yy + 14}M536 ${yy}L530 ${yy + 7}L536 ${yy + 14}" stroke="${C.ocre}" stroke-width="2.5" fill="none"/>`);
  // Piliers sculptés (figures superposées)
  const pillar = (px) => {
    const o = [`<rect x="${px - 13}" y="316" width="26" height="160" fill="${C.wood2}"/>`];
    for (let k = 0; k < 3; k++) {
      const yy = 336 + k * 48;
      o.push(`<ellipse cx="${px}" cy="${yy}" rx="9" ry="11" fill="${C.wood}"/><rect x="${px - 10}" y="${yy + 13}" width="20" height="24" rx="5" fill="${C.wood}"/>`, stroke(`M${px - 8} ${yy + 41}H${px + 8}`, C.ocre, 3));
    }
    return o.join("");
  };
  for (const px of [300, 380, 560, 640]) g.push(pillar(px));
  g.push(thatch(470, 40, 312, 230));
  g.push(`<path d="M470 40L462 22H478Z" fill="${C.wood2}"/><circle cx="470" cy="20" r="6" fill="${C.wood2}"/>`);
  // Masque accroché au mur (entre le porte-parasol et le Fon)
  g.push(`<g transform="translate(344 418)"><path d="M0 -56Q20 -56 20 -26Q20 4 0 16Q-20 4 -20 -26Q-20 -56 0 -56Z" fill="${C.ocre}"/><path d="M-12 -32H-4M4 -32H12" stroke="${C.dark}" stroke-width="4" stroke-linecap="round"/><path d="M-6 -12Q0 -6 6 -12" stroke="${C.dark}" stroke-width="3" fill="none" stroke-linecap="round"/>`);
  for (const [bx, by] of [[-14, -48], [-4, -54], [6, -54], [16, -46], [-18, -20], [18, -20]]) g.push(`<circle cx="${bx}" cy="${by}" r="2.6" fill="${C.terra}"/>`);
  g.push(`</g>`);
  // Estrade et peau de léopard sous les pieds du Fon
  g.push(`<rect x="330" y="512" width="220" height="30" rx="6" fill="${C.wood2}"/><rect x="330" y="512" width="220" height="8" rx="4" fill="${C.wood}"/>`);
  g.push(`<path d="M380 548Q440 534 520 548L534 566Q450 584 370 568Z" fill="${C.ocre}"/>`);
  for (const [sx, sy] of [[392, 556], [412, 550], [436, 560], [458, 548], [482, 558], [504, 552], [424, 570], [470, 572], [512, 566]]) g.push(`<circle cx="${sx}" cy="${sy}" r="3.2" fill="${C.dark}"/>`);
  // Tabouret sculpté perlé du Fon
  g.push(`<ellipse cx="430" cy="410" rx="48" ry="9" fill="${C.wood2}"/><rect x="390" y="410" width="80" height="96" fill="${C.wood2}"/><ellipse cx="430" cy="506" rx="46" ry="9" fill="${C.wood2}"/>`);
  for (let k = 0; k < 4; k++) g.push(`<path d="M${398 + k * 18} 426L${408 + k * 18} 456L${398 + k * 18} 486Z" fill="${k % 2 ? C.ocre : C.terra}"/>`);
  g.push(`<rect x="390" y="414" width="80" height="6" fill="${C.ocre}"/><rect x="390" y="496" width="80" height="6" fill="${C.ocre}"/>`);
  // Le Fon, assis, en ndop et bonnet ashetu : corne à boire et chasse-mouches
  const fon = { x: 420, y: 512, s: 1.04 };
  const fonSkin = SKIN.s2;
  const fonArms = { r: [[54, -150], [58, -180]], l: [[-46, -146], [-36, -118]] };
  g.push(person({ ...fon, skin: fonSkin, legs: "sit", robe: "boubou", top: NDOP, wax: "ndop", shoes: C.dark, beard: true,
    hat: { type: "ashetu", color: C.red, color2: C.dark }, arms: fonArms }));
  g.push(at(fon.x, fon.y, fon.s, false,
    // Corne à boire, ouverture vers le haut
    `<path d="M50 -176Q66 -184 78 -214Q86 -236 98 -244Q92 -226 92 -210Q86 -184 62 -168Z" fill="${C.sand}"/><path d="M96 -246L102 -240Q96 -236 92 -238Z" fill="${C.wood2}"/>` + stroke("M62 -176Q76 -182 84 -204", C.ocre, 3) + hand(58, -180, fonSkin) +
    // Chasse-mouches : manche perlé et queue de cheval
    `<path d="M-38 -116L-58 -168" stroke="${C.ocre}" stroke-width="6" stroke-linecap="round"/><path d="M-58 -166Q-80 -186 -78 -222Q-66 -196 -58 -192Q-60 -214 -48 -232Q-50 -200 -52 -180Z" fill="${C.white}"/>` + hand(-36, -118, fonSkin)));
  // Parasol royal, tenu par un notable en toghu
  const pSkin = SKIN.s3, pr = { x: 250, y: 556, s: 1.02 };
  g.push(person({ ...pr, skin: pSkin, top: C.dark, wax: "toghu", bottom: C.dark, bwax: "toghu", shoes: C.dark,
    hat: { type: "ashetu", color: C.ocre, color2: C.dark }, arms: { r: [[52, -214], [46, -250]], l: [[2, -168], [34, -210]] } }));
  // Mât : de (270,380) à (348,150)
  const pole = [[268, 400], [348, 148]];
  g.push(stroke(`M${pole[0].join(" ")}L${pole[1].join(" ")}`, C.wood2, 6));
  g.push(hand(pr.x + 46 * pr.s, pr.y - 250 * pr.s, pSkin), hand(pr.x + 34 * pr.s, pr.y - 210 * pr.s, pSkin));
  // Toile du parasol
  const cx = 356, cy = 150;
  g.push(`<path d="M${cx - 100} ${cy + 22}Q${cx} ${cy - 92} ${cx + 100} ${cy + 22}Z" fill="${C.terra}"/>`);
  for (const [a, b, c] of [[-100, -60, C.ocre], [-20, 20, C.green], [60, 100, C.ocre]]) g.push(`<path d="M${cx} ${cy - 56}L${cx + a} ${cy + 22}L${cx + b} ${cy + 22}Z" fill="${c}"/>`);
  for (let k = -100; k < 100; k += 10) g.push(`<path d="M${cx + k} ${cy + 20}L${cx + k + 5} ${cy + 38}L${cx + k + 10} ${cy + 20}Z" fill="${(k / 10) % 2 ? C.red : C.yellow}"/>`);
  g.push(`<rect x="${cx - 100}" y="${cy + 16}" width="200" height="8" fill="${C.indigo}"/><circle cx="${cx}" cy="${cy - 60}" r="8" fill="${C.ocre}"/>`);
  // Notables à droite : ndop et toghu
  const n1 = SKIN.s4, n2 = SKIN.s1;
  g.push(person({ x: 612, y: 560, s: 1.02, flip: true, skin: n1, robe: "agbada", top: NDOP, wax: "ndop", shoes: C.dark,
    hat: { type: "ashetu", color: C.white, color2: C.dark }, beard: true, arms: { l: [[-38, -150], [-30, -112]], r: [[44, -150], [40, -124]] },
    rhand: (hx, hy) => stroke(`M${hx} ${hy - 30}L${hx + 2} ${hy + 108}`, C.wood2, 6) + `<circle cx="${hx}" cy="${hy - 34}" r="7" fill="${C.ocre}"/>` + hand(hx, hy, n1) }));
  g.push(person({ x: 718, y: 566, s: 1.02, flip: true, skin: n2, robe: "boubou", top: C.dark, wax: "toghu", shoes: C.dark,
    hat: { type: "ashetu", color: C.terra, color2: C.yellow }, arms: { l: [[-34, -150], [-4, -132]], r: [[34, -150], [6, -128]] } }));
  // Tambours, au premier plan à gauche
  const drum = (x, y, h, w, c) => {
    const o = [`<path d="M${x - w} ${y - h}H${x + w}L${x + w * 0.7} ${y - 26}H${x - w * 0.7}Z" fill="${c}"/>`];
    o.push(`<path d="M${x - w * 0.7} ${y - 26}H${x + w * 0.7}L${x + w * 0.8} ${y}H${x - w * 0.8}Z" fill="${C.wood2}"/>`);
    for (let k = -2; k <= 2; k++) o.push(`<path d="M${x + k * w * 0.28 - 6} ${y - 26}L${x + k * w * 0.28} ${y - 8}L${x + k * w * 0.28 + 6} ${y - 26}Z" fill="${C.wood}"/>`);
    o.push(`<ellipse cx="${x}" cy="${y - h}" rx="${w}" ry="${w * 0.26}" fill="${C.sand}"/>`);
    for (let k = -3; k <= 3; k++) o.push(stroke(`M${x + k * w * 0.3} ${y - h + 6}L${x + k * w * 0.22} ${y - h + 40}`, C.sand, 2.5));
    o.push(stroke(`M${x - w * 0.96} ${y - h + 42}H${x + w * 0.96}`, C.ocre, 5));
    return o.join("");
  };
  g.push(drum(86, 572, 150, 36, C.wood), drum(160, 584, 104, 30, C.terra));
  return frame(g.join(""), "#F1E6CF");
}

/* ---------- Scène 2 : matinée au village ---------- */
function village() {
  const g = [];
  g.push(`<circle cx="120" cy="96" r="40" fill="${C.yellow}" opacity=".85"/>`);
  g.push(`<path d="M0 360Q200 320 400 350Q600 320 800 352V470H0Z" fill="${C.leaf}" opacity=".3"/>`);
  // Case au toit de tôle, à gauche
  g.push(`<rect x="20" y="276" width="200" height="190" fill="${C.wood}"/><rect x="20" y="276" width="200" height="190" fill="${C.rose}" opacity=".35"/>`);
  g.push(`<path d="M4 284L120 218L236 284Z" fill="${C.steel}"/>`);
  for (let k = 0; k < 12; k++) g.push(stroke(`M${f(14 + k * 19.5)} 280L${f(120 + (k - 5.5) * 3)} 224`, C.grey, 2, ' opacity=".6"'));
  g.push(`<rect x="0" y="282" width="240" height="8" rx="3" fill="${C.grey}"/>`);
  g.push(`<rect x="44" y="330" width="46" height="40" fill="${C.wood2}"/><rect x="48" y="334" width="38" height="32" fill="${C.green}"/><rect x="66" y="334" width="3" height="32" fill="${C.wood2}"/>`);
  g.push(`<rect x="140" y="336" width="52" height="130" fill="${C.wood2}"/><rect x="146" y="342" width="40" height="124" fill="${C.indigo}"/><rect x="146" y="342" width="40" height="124" fill="url(#wax2)" opacity=".7"/>`);
  // Case ronde au toit de paille, à droite
  g.push(`<rect x="600" y="300" width="170" height="168" fill="${C.wood}"/><rect x="600" y="300" width="170" height="168" fill="${C.rose}" opacity=".25"/><rect x="664" y="372" width="42" height="96" rx="20" fill="${C.wood2}"/>`);
  g.push(thatch(685, 176, 310, 120, C.ocre));
  // Manguier, au centre
  g.push(mango(470, 470, 1.05));
  // Terre rouge
  g.push(`<rect y="466" width="800" height="134" fill="${C.rose}"/><path d="M0 500Q300 480 800 504V600H0Z" fill="${C.wood}" opacity=".18"/>`);
  for (const [px, py, rx] of [[120, 560, 70], [470, 586, 90], [680, 566, 60]]) g.push(`<ellipse cx="${px}" cy="${py}" rx="${rx}" ry="5" fill="${C.wood}" opacity=".3"/>`);
  // Deux femmes pilent dans un mortier
  const sA = SKIN.s3, sB = SKIN.s1;
  const wA = { x: 196, y: 552, s: 1.0 }, wB = { x: 378, y: 552, s: 1.0 };
  const handsA = { l: [[2, -250], [62, -282]], r: [[56, -214], [62, -248]] };
  g.push(person({ ...wA, skin: sA, hair: { type: "foulard", color: C.terra, wax: "wax1" }, top: C.green, wax: "wax3", bottom: C.terra, bwax: "wax1", legs: "skirt", sleeve: "short", arms: handsA }));
  const handsB = { r: [[46, -160], [58, -186]], l: [[12, -146], [58, -152]] };
  g.push(person({ ...wB, flip: true, skin: sB, hair: { type: "boxbraids", beads: C.ocre }, top: C.ocre, wax: "kente", bottom: C.indigo, bwax: "wax2", legs: "skirt", sleeve: "short", arms: handsB }));
  // Mortier (entre les deux)
  const mx = 288;
  g.push(`<path d="M${mx - 34} 452H${mx + 34}L${mx + 22} 500L${mx + 32} 552H${mx - 32}L${mx - 22} 500Z" fill="${C.wood2}"/><ellipse cx="${mx}" cy="452" rx="34" ry="8" fill="${C.wood}"/><ellipse cx="${mx}" cy="453" rx="26" ry="5" fill="${C.yellow}"/>`);
  g.push(stroke(`M${mx - 26} 474H${mx + 26}`, C.wood, 3), stroke(`M${mx - 28} 530H${mx + 28}`, C.wood, 3));
  // Pilons : A lève le sien, B frappe
  const pA = wA.x + 62, pB = wB.x - 58;
  g.push(stroke(`M${pA} ${wA.y - 330}V${wA.y - 140}`, C.wood, 10), `<ellipse cx="${pA}" cy="${wA.y - 334}" rx="7" ry="10" fill="${C.wood}"/><ellipse cx="${pA}" cy="${wA.y - 136}" rx="7" ry="10" fill="${C.wood}"/>`);
  g.push(hand(pA, wA.y - 282, sA), hand(pA, wA.y - 248, sA));
  g.push(stroke(`M${pB} ${wB.y - 290}V${wB.y - 100}`, C.wood, 10), `<ellipse cx="${pB}" cy="${wB.y - 294}" rx="7" ry="10" fill="${C.wood}"/>`);
  g.push(`<ellipse cx="${mx}" cy="452" rx="34" ry="8" fill="none"/><path d="M${mx - 34} 452Q${mx} 466 ${mx + 34} 452L${mx + 34} 460Q${mx} 472 ${mx - 34} 460Z" fill="${C.wood2}"/>`);
  g.push(hand(pB, wB.y - 186, sB), hand(pB, wB.y - 152, sB));
  for (const [dx, dy] of [[-30, -10], [24, -16], [-14, -24]]) g.push(`<circle cx="${mx + dx}" cy="${438 + dy}" r="3" fill="${C.yellow}"/>`);
  // Feu de bois et marmite
  const fx = 712, fy = 560;
  g.push(`<path d="M${fx - 20} ${fy - 106}Q${fx - 44} ${fy - 150} ${fx - 14} ${fy - 178}Q${fx + 10} ${fy - 204} ${fx - 10} ${fy - 250}" stroke="${C.white}" stroke-width="18" fill="none" stroke-linecap="round" opacity=".7"/>`);
  g.push(`<path d="M${fx + 14} ${fy - 110}Q${fx + 36} ${fy - 146} ${fx + 18} ${fy - 186}" stroke="${C.white}" stroke-width="12" fill="none" stroke-linecap="round" opacity=".55"/>`);
  g.push(stroke(`M${fx - 52} ${fy - 4}L${fx + 40} ${fy - 22}M${fx - 40} ${fy - 22}L${fx + 52} ${fy - 4}`, C.wood2, 10));
  g.push(`<path d="M${fx - 26} ${fy - 14}Q${fx - 30} ${fy - 44} ${fx - 12} ${fy - 58}Q${fx - 8} ${fy - 38} ${fx} ${fy - 50}Q${fx + 8} ${fy - 68} ${fx + 4} ${fy - 82}Q${fx + 30} ${fy - 56} ${fx + 26} ${fy - 14}Z" fill="${C.ocre}"/><path d="M${fx - 12} ${fy - 14}Q${fx - 14} ${fy - 36} ${fx} ${fy - 44}Q${fx + 14} ${fy - 30} ${fx + 12} ${fy - 14}Z" fill="${C.yellow}"/>`);
  for (const k of [-46, 0, 46]) g.push(`<ellipse cx="${fx + k}" cy="${fy - 10}" rx="16" ry="12" fill="${C.grey}"/>`);
  g.push(`<path d="M${fx - 40} ${fy - 98}H${fx + 40}Q${fx + 46} ${fy - 50} ${fx} ${fy - 44}Q${fx - 46} ${fy - 50} ${fx - 40} ${fy - 98}Z" fill="${C.dark}"/><rect x="${fx - 46}" y="${fy - 104}" width="92" height="9" rx="4" fill="${C.dark}"/><rect x="${fx - 14}" y="${fy - 112}" width="28" height="7" rx="3" fill="${C.grey}"/>`);
  // Jeune femme, bassine d'eau sur la tête
  const sC = SKIN.s4, wC = { x: 560, y: 560, s: 1.02 };
  g.push(person({ ...wC, flip: true, skin: sC, hair: { type: "nattes" }, top: C.terra, wax: "wax2", bottom: C.green, bwax: "kitenge", legs: "walkskirt", sleeve: "short",
    arms: { r: [[46, -236], [34, -284]], l: [[-40, -150], [-28, -110]] } }));
  g.push(at(wC.x, wC.y, wC.s, true,
    `<ellipse cx="0" cy="-266" rx="18" ry="5" fill="${C.sand}"/>` +
    `<path d="M-48 -300H48L38 -268H-38Z" fill="${C.indigo}"/><ellipse cx="0" cy="-300" rx="48" ry="8" fill="${C.blue}"/><ellipse cx="0" cy="-300" rx="40" ry="5" fill="${C.sky}"/><rect x="-48" y="-306" width="96" height="6" rx="3" fill="${C.indigo}"/>` +
    hand(34, -284, sC)));
  // Poules
  g.push(hen(450, 560, 0.85, false), hen(520, 584, 0.75, true, C.wood), hen(96, 584, 0.8, false, C.ocre));
  return frame(g.join(""), "#DDE9EC");
}

/* ---------- Scène 3 : les nattes sous le manguier ---------- */
function nattes() {
  const g = [];
  // Cour : mur de la maison au fond
  g.push(`<rect x="440" y="196" width="360" height="274" fill="${C.sand}"/><path d="M420 204L620 150L800 196V208H420Z" fill="${C.terra}"/>`);
  g.push(`<rect x="560" y="260" width="74" height="64" rx="4" fill="${C.wood2}"/><rect x="566" y="266" width="62" height="52" fill="${C.green}"/><rect x="594" y="266" width="5" height="52" fill="${C.wood2}"/>`);
  g.push(`<rect x="680" y="270" width="70" height="200" rx="4" fill="${C.wood2}"/><rect x="688" y="278" width="54" height="192" fill="${C.ocre}"/><rect x="688" y="278" width="54" height="192" fill="url(#wax1)" opacity=".7"/>`);
  // Corde à linge : des pagnes qui sèchent
  g.push(stroke("M380 206Q560 232 760 214", C.dark, 2));
  for (const [px, w, h, c, m] of [[440, 56, 70, C.indigo, "wax1"], [510, 50, 84, C.ocre, "kente"], [574, 58, 66, C.terra, "wax2"], [646, 52, 78, C.green, "kitenge"]]) {
    const yy = 206 + 26 * Math.sin(Math.PI * (px - 380) / 380) * 0.95;
    g.push(`<rect x="${px}" y="${f(yy - 2)}" width="${w}" height="${h}" fill="${c}"/><rect x="${px}" y="${f(yy - 2)}" width="${w}" height="${h}" fill="url(#${m})"/><rect x="${px + 6}" y="${f(yy - 6)}" width="4" height="9" fill="${C.wood}"/><rect x="${px + w - 10}" y="${f(yy - 6)}" width="4" height="9" fill="${C.wood}"/>`);
  }
  // Manguier qui fait l'ombre
  g.push(`<rect y="466" width="800" height="134" fill="${C.rose}"/><rect y="466" width="800" height="134" fill="${C.sand2}" opacity=".45"/>`);
  g.push(mango(150, 470, 1.15));
  g.push(`<ellipse cx="330" cy="540" rx="250" ry="34" fill="${C.leaf2}" opacity=".16"/>`);
  // Natte tressée au sol
  g.push(`<path d="M206 512H520L556 584H170Z" fill="${C.ocre}"/>`);
  for (let k = 0; k < 7; k++) { const t = k / 7, y0 = 512 + 72 * t; g.push(`<rect x="${f(206 - 36 * t)}" y="${f(y0)}" width="${f(314 + 72 * t)}" height="5" fill="${k % 2 ? C.terra : C.wood}" opacity=".55"/>`); }
  for (let k = 0; k <= 10; k++) g.push(stroke(`M${f(206 + k * 31.4)} 512L${f(170 + k * 38.6)} 584`, C.wood, 2, ' opacity=".4"'));
  g.push(`<path d="M170 584H556L560 590H166Z" fill="${C.terra}"/>`);
  // Tabouret de la grand-mère
  const gm = { x: 330, y: 568, s: 1.06 }, gSkin = SKIN.s2;
  const loc = (lx, ly) => [gm.x + lx * gm.s, gm.y + ly * gm.s];
  // Grand-mère : gele et kaba, assise (jambes écartées), mains dans les cheveux de la fillette
  const gArms = { l: [[-58, -152], [-16, -144]], r: [[58, -156], [24, -152]] };
  g.push(at(gm.x, gm.y, gm.s, false,
    `<rect x="-40" y="-110" width="80" height="12" rx="4" fill="${C.wood2}"/><rect x="-34" y="-98" width="10" height="46" fill="${C.wood2}"/><rect x="24" y="-98" width="10" height="46" fill="${C.wood2}"/>` +
    // Jupe de la kaba posée sur les genoux, qui tombe jusqu'au sol
    `<path d="M-30 -122H30L72 -104L84 -58Q0 -48 -84 -58L-72 -104Z" fill="${C.green}"/><path d="M-30 -122H30L72 -104L84 -58Q0 -48 -84 -58L-72 -104Z" fill="url(#wax1)"/>` +
    `<path d="M-84 -58Q0 -48 84 -58L88 -48Q0 -36 -88 -48Z" fill="${C.green}"/><path d="M-84 -58Q0 -48 84 -58L88 -48Q0 -36 -88 -48Z" fill="rgba(0,0,0,.18)"/>` +
    `<ellipse cx="-62" cy="-46" rx="14" ry="6" fill="${C.dark}"/><ellipse cx="62" cy="-46" rx="14" ry="6" fill="${C.dark}"/>`));
  g.push(person({ ...gm, skin: gSkin, legs: "none", robe: "kaba", top: C.green, wax: "wax1", hair: { type: "gele", color: C.terra, wax: "wax2" }, arms: gArms }));
  // Fillette assise sur la natte, entre les genoux : moitié nattée, moitié encore en volume
  const kd = { x: 330, y: 622, s: 0.78 }, kSkin = SKIN.s4;
  g.push(at(kd.x, kd.y, kd.s, false,
    // Jambes en tailleur, pagne
    `<path d="M-30 -120H30L36 -92H-36Z" fill="${C.ocre}"/><path d="M-30 -120H30L36 -92H-36Z" fill="url(#kente)"/>` +
    `<path d="M-74 -96Q-40 -120 0 -104Q40 -120 74 -96Q78 -78 60 -74Q20 -80 0 -88Q-20 -80 -60 -74Q-78 -78 -74 -96Z" fill="${C.indigo}"/><path d="M-74 -96Q-40 -120 0 -104Q40 -120 74 -96Q78 -78 60 -74Q20 -80 0 -88Q-20 -80 -60 -74Q-78 -78 -74 -96Z" fill="url(#wax3)"/>` +
    `<ellipse cx="-20" cy="-82" rx="14" ry="7" fill="${kSkin}"/><ellipse cx="20" cy="-82" rx="14" ry="7" fill="${kSkin}"/>`));
  g.push(person({ ...kd, skin: kSkin, legs: "none", hair: { type: "rase", color: kSkin }, top: C.yellow, sleeve: "short",
    arms: { l: [[-40, -150], [-30, -116]], r: [[40, -150], [26, -124]] },
    rhand: (hx, hy) => stroke(`M${hx} ${hy}L${hx + 2} ${hy - 22}`, C.wood2, 4) + `<circle cx="${hx + 2}" cy="${hy - 34}" r="12" fill="${C.wood2}"/><circle cx="${hx + 2}" cy="${hy - 34}" r="8.5" fill="${C.sky}"/>` + hand(hx, hy, kSkin) }));
  // Coiffure de la fillette : à gauche des nattes collées (la peau visible entre les rangs), à droite les cheveux en volume
  g.push(at(kd.x, kd.y, kd.s, false,
    `<circle cx="22" cy="-266" r="22" fill="${HAIR}"/><circle cx="38" cy="-246" r="18" fill="${HAIR}"/><circle cx="6" cy="-280" r="15" fill="${HAIR}"/><circle cx="30" cy="-226" r="10" fill="${HAIR}"/>` +
    `<path d="M1 -276Q-24 -276 -23 -236Q-19 -247 -10 -252Q-4 -256 1 -257Z" fill="${HAIR}"/>` + stroke("M-22 -246Q-30 -232 -29 -212M-17 -250Q-26 -234 -24 -210", HAIR, 4) + `<circle cx="-29" cy="-210" r="3" fill="${C.ocre}"/><circle cx="-24" cy="-208" r="3" fill="${C.white}"/>` +
    ["M-20 -243Q-21 -262 -7 -274", "M-13 -250Q-13 -266 -2 -276", "M-6 -254Q-6 -268 0 -277"].map((d) => stroke(d, kSkin, 2.4)).join("")));
  // Mains de la grand-mère, au-dessus de la tête de la fillette ; une mèche tirée de la partie en volume
  const [lhx, lhy] = loc(-16, -144), [rhx, rhy] = loc(24, -152);
  g.push(stroke(`M${f(rhx - 2)} ${f(rhy + 6)}Q${f(rhx - 6)} ${f(rhy + 16)} ${f(rhx - 14)} ${f(rhy + 20)}`, HAIR, 5));
  g.push(hand(lhx, lhy, gSkin), hand(rhx, rhy, gSkin));
  // Peigne, pot de beurre de karité, perles
  g.push(`<g transform="translate(470 560) rotate(-12)"><rect x="-22" y="-6" width="44" height="10" rx="3" fill="${C.indigo}"/>${[...Array(7)].map((_, i) => `<rect x="${-20 + i * 6.2}" y="4" width="3" height="16" rx="1.5" fill="${C.indigo}"/>`).join("")}</g>`);
  g.push(`<path d="M204 530Q200 568 232 570Q264 568 260 530Z" fill="${C.terra}"/><ellipse cx="232" cy="530" rx="28" ry="8" fill="${C.wood2}"/><path d="M210 530Q232 506 254 530Z" fill="${C.cream}"/><ellipse cx="232" cy="530" rx="22" ry="5" fill="${C.cream}"/>` + stroke("M210 548Q232 556 254 548", C.ocre, 3));
  for (const [bx, c] of [[500, C.terra], [510, C.white], [520, C.ocre], [530, C.green]]) g.push(`<circle cx="${bx}" cy="${578 - (bx - 500) * 0.2}" r="4" fill="${c}"/>`);
  // L'autre fillette attend, bantu knots
  const k2 = { x: 610, y: 566, s: 0.74 }, k2Skin = SKIN.s3;
  g.push(person({ ...k2, flip: true, skin: k2Skin, hair: { type: "bantu" }, top: C.terra, wax: "wax1", robe: "dress", legs: "skirt", sleeve: "short",
    arms: { l: [[-44, -150], [-30, -112]], r: [[42, -152], [22, -122]] } }));
  // Un pagne plié et une calebasse près du mur
  g.push(`<path d="M718 560Q704 560 704 540Q704 514 730 512Q756 514 756 540Q756 560 742 560Z" fill="${C.ocre}"/><path d="M722 512Q726 498 736 502" stroke="${C.wood2}" stroke-width="4" fill="none" stroke-linecap="round"/>`);
  g.push(hen(580, 594, 0.6, true, C.wood));
  return frame(g.join(""), "#E3ECD9");
}

export default [
  { id: "chefferie", fr: "Cérémonie à la chefferie", en: "Ceremony at the chiefdom",
    tags: ["chefferie", "Fon", "chef", "notables", "ndop", "toghu", "Grassfields", "Bamiléké", "Cameroun", "tradition", "parasol", "tambours", "masque", "chiefdom", "chief", "ceremony", "Cameroon", "drums", "mask"], draw: chefferie },
  { id: "village", fr: "Matinée au village", en: "Morning in the village",
    tags: ["village", "pilon", "mortier", "piler", "bassine", "eau", "cases", "manguier", "poules", "feu de bois", "marmite", "terre rouge", "morning", "pestle", "mortar", "water", "huts", "mango tree", "hens", "fire"], draw: village },
  { id: "nattes", fr: "Les nattes sous le manguier", en: "Braiding under the mango tree",
    tags: ["nattes", "tresses", "coiffure", "grand-mère", "fillette", "gele", "kaba", "bantu knots", "manguier", "karité", "peigne", "cour", "braids", "cornrows", "hair", "grandmother", "girl", "mango tree", "shea butter", "comb"], draw: nattes },
];
