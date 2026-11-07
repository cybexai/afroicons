// Scènes : le marché des pagnes, le retour des pêcheurs, la dot.
import { C, SKIN, person, frame, palm, cloud, stroke, f } from "./lib.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="7.5" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
/** Aplat avec un motif par-dessus. */
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");

/* ---------- Scène 1 : au marché des pagnes ---------- */
function pagnes() {
  const g = [];
  // Mur de la boutique, sol
  g.push(rect(0, 0, 800, 420, "#F1DFC6"), rect(0, 420, 800, 180, C.sand2), rect(0, 414, 800, 8, C.wood2));
  // Tringle et grands pans suspendus
  g.push(rect(200, 40, 400, 9, C.wood2, ' rx="4"'));
  const pans = [[210, C.terra, "wax1", 230], [262, C.indigo, "ndop", 270], [314, C.ocre, "kente", 210], [366, C.green, "kitenge", 250], [418, "#5E3E26", "bogolan", 225], [470, C.indigo, "wax2", 260], [522, C.terra, "wax3", 215]];
  for (const [px, col, pat, h] of pans) {
    g.push(cloth(`M${px} 46H${px + 48}V${46 + h}L${px + 40} ${54 + h}L${px + 30} ${46 + h}L${px + 20} ${54 + h}L${px + 10} ${46 + h}L${px} ${54 + h}Z`, col, pat));
    g.push(rect(px, 46, 48, 10, "rgba(0,0,0,.18)"), rect(px + 44, 56, 4, h - 10, "rgba(0,0,0,.1)"));
  }
  // Étagère de pagnes pliés, à droite
  g.push(rect(616, 70, 160, 344, C.wood2, ' rx="6"'), rect(626, 80, 140, 334, C.wood));
  const folds = [["wax1", C.terra], ["ndop", C.indigo], ["kente", C.ocre], ["wax3", C.green], ["toghu", C.dark], ["bogolan", "#5E3E26"], ["wax2", C.indigo], ["kitenge", C.green]];
  let n = 0;
  for (const sy of [168, 262, 356]) {
    g.push(rect(622, sy, 148, 10, C.wood2));
    for (const sx of [632, 678, 724]) for (let k = 0; k < 5; k++) {
      const [pat, col] = folds[n++ % folds.length], yy = sy - 15 * (k + 1);
      g.push(`<rect x="${sx}" y="${yy}" width="40" height="14" rx="3" fill="${col}"/><rect x="${sx}" y="${yy}" width="40" height="14" rx="3" fill="url(#${pat})"/>`, rect(sx, yy + 11, 40, 3, "rgba(0,0,0,.18)"));
    }
  }
  // Le tailleur, au fond, à sa machine à pédale
  const tx = 92, ty = 452, ts = 0.82;
  g.push(`<rect x="${tx - 26}" y="${ty - 82}" width="56" height="8" rx="3" fill="${C.wood2}"/>`, stroke(`M${tx - 20} ${ty - 76}L${tx - 26} ${ty}M${tx + 24} ${ty - 76}L${tx + 30} ${ty}`, C.wood2, 5));
  g.push(person({ x: tx, y: ty, s: ts, legs: "sit", skin: SKIN.s1, hair: { type: "rase" }, beard: true, hat: { type: "kufi", color: C.ocre, wax: "wax3" },
    top: C.green, dashiki: true, bottom: C.dark,
    arms: { l: [[8, -150], [58, -128]], r: [[50, -152], [92, -128]] } }));
  // Mètre ruban autour du cou
  g.push(at(tx, ty, ts, false, stroke("M-14 -204Q-22 -170 -18 -140M14 -204Q22 -170 18 -142", C.yellow, 3.5)));
  // Table et machine (noire, à volant), pédale en fonte
  const ty0 = ty - 96;
  g.push(rect(132, ty0, 150, 12, C.wood, ' rx="3"'), rect(136, ty0 + 12, 142, 30, C.wood2));
  g.push(`<path d="M140 ${ty0 + 42}L150 ${ty}M274 ${ty0 + 42}L264 ${ty}M146 ${ty - 30}H268M150 ${ty - 30}L207 ${ty0 + 44}L264 ${ty - 30}M154 ${ty - 12}L190 ${ty - 30}" stroke="${C.dark}" stroke-width="5" fill="none" stroke-linecap="round"/>`);
  g.push(`<circle cx="250" cy="${ty - 58}" r="20" fill="none" stroke="${C.dark}" stroke-width="5"/><path d="M132 ${ty - 12}H176L172 ${ty - 4}H136Z" fill="${C.dark}"/>`);
  g.push(`<rect x="152" y="${ty0 - 10}" width="110" height="12" rx="3" fill="${C.dark}"/><path d="M230 ${ty0 - 10}V${ty0 - 52}Q230 ${ty0 - 64} 218 ${ty0 - 64}H170Q158 ${ty0 - 64} 158 ${ty0 - 52}V${ty0 - 30}H176V${ty0 - 46}H214V${ty0 - 10}Z" fill="${C.dark}"/>`);
  g.push(`<circle cx="242" cy="${ty0 - 44}" r="13" fill="${C.dark}"/><circle cx="242" cy="${ty0 - 44}" r="5" fill="${C.steel}"/><rect x="164" y="${ty0 - 30}" width="4" height="18" fill="${C.steel}"/>`);
  g.push(stroke(`M176 ${ty0 - 56}H206`, C.ocre, 2.5), stroke(`M180 ${ty0 - 52}H200`, C.ocre, 1.5));
  // Tissu sous l'aiguille, qui retombe de la table
  g.push(cloth(`M134 ${ty0 - 4}H190L186 ${ty0 + 2}H138L130 ${ty0 + 50}H118Z`, C.terra, "wax2"));
  // Mains du tailleur, par-dessus le tissu
  g.push(at(tx, ty, ts, false, hand(58, -128, SKIN.s1) + hand(92, -128, SKIN.s1)));
  // La vendeuse en gele déplie un pagne
  const vx = 372, vy = 566, vs = 1.12;
  const pagne = (hx, hy) => {
    const lx = 36, ly = -206, d = `M${lx - 4} ${ly}L${hx + 6} ${hy}L${hx + 12} -66Q${(lx + hx) / 2 + 6} -56 ${lx} -60Z`;
    return cloth(d, C.green, "kitenge") + stroke(`M${lx - 4} ${ly}L${hx + 6} ${hy}`, "rgba(0,0,0,.2)", 3) + stroke(`M${lx + 26} ${ly + 8}L${lx + 30} -58`, "rgba(0,0,0,.1)", 4) + hand(lx, ly, SKIN.s3) + hand(hx, hy, SKIN.s3);
  };
  g.push(person({ x: vx, y: vy, s: vs, skin: SKIN.s3, hair: { type: "gele", color: C.ocre, wax: "wax1" }, robe: "kaba", top: C.terra, wax: "wax2",
    arms: { l: [[-4, -168], [36, -206]], r: [[70, -190], [112, -212]] }, rhand: pagne }));
  // La cliente aux tresses longues touche le tissu
  g.push(person({ x: 626, y: 572, s: 1.1, flip: true, skin: SKIN.s5, hair: { type: "boxbraids", beads: C.ocre }, top: C.indigo, sleeve: "short", bottom: C.terra, bwax: "wax3", legs: "skirt",
    arms: { r: [[52, -170], [86, -186]], l: [[-42, -152], [-36, -112]] },
    lhand: (hx, hy) => `<path d="M${hx - 18} ${hy + 4}H${hx + 18}L${hx + 14} ${hy + 36}H${hx - 14}Z" fill="${C.ocre}"/>` + stroke(`M${hx - 10} ${hy + 4}Q${hx} ${hy - 12} ${hx + 10} ${hy + 4}`, C.wood2, 3) + hand(hx, hy, SKIN.s5) }));
  // Rouleaux de tissu au sol, panier
  for (const [rx, col, pat] of [[40, C.indigo, "ndop"], [74, C.terra, "wax1"], [108, C.ocre, "kente"]]) g.push(`<rect x="${rx}" y="474" width="30" height="96" rx="6" fill="${col}"/><rect x="${rx}" y="474" width="30" height="96" rx="6" fill="url(#${pat})"/><ellipse cx="${rx + 15}" cy="476" rx="15" ry="5" fill="${C.cream}"/><circle cx="${rx + 15}" cy="476" r="3" fill="${C.wood2}"/>`);
  g.push(`<path d="M150 530H240L230 576H160Z" fill="${C.wood}"/>`, stroke("M156 544H234M158 558H232", C.wood2, 3));
  for (const [i, [col, pat]] of [[C.indigo, "wax1"], [C.green, "wax3"], [C.terra, "wax2"]].entries()) g.push(`<rect x="${160 + i * 4}" y="${516 - i * 10}" width="70" height="12" rx="3" fill="${col}"/><rect x="${160 + i * 4}" y="${516 - i * 10}" width="70" height="12" rx="3" fill="url(#${pat})"/>`);
  return frame(g.join(""), "#F1DFC6");
}

/* ---------- Scène 2 : le retour des pêcheurs ---------- */
let hullN = 0;
/** Pirogue peinte : proue à droite (à gauche avec flip), quille en (x,y), longueur L, coque haute de 44 au milieu. */
function pirogue(x, y, L, s = 1, flip = false, cols = [C.ocre, C.green, C.terra]) {
  const id = `pirogues-hull-${hullN++}`;
  const d = `M0 -84Q30 -46 76 -44H${L - 76}Q${L - 30} -46 ${L} -84Q${L - 16} -12 ${L - 84} 0H84Q16 -12 0 -84Z`;
  const out = [`<clipPath id="${id}"><path d="${d}"/></clipPath>`, `<path d="${d}" fill="${C.indigo}"/>`, `<g clip-path="url(#${id})">`];
  out.push(stroke(`M0 -78Q30 -38 76 -36H${L - 76}Q${L - 30} -38 ${L} -78`, cols[0], 11));
  out.push(stroke(`M4 -70Q34 -24 80 -22H${L - 80}Q${L - 34} -24 ${L - 4} -70`, cols[1], 7));
  for (let tx = 90; tx < L - 100; tx += 24) out.push(`<path d="M${tx} -4L${tx + 10} -15L${tx + 20} -4Z" fill="${cols[2]}"/>`);
  out.push(`</g>`);
  out.push(stroke(`M2 -84Q30 -48 76 -46H${L - 76}Q${L - 30} -48 ${L - 2} -84`, C.dark, 3));
  // Œil à la proue, petit drapeau à la poupe
  out.push(`<circle cx="${L - 42}" cy="-52" r="8" fill="${C.white}"/><circle cx="${L - 40}" cy="-52" r="4" fill="${C.dark}"/>`);
  out.push(stroke("M8 -82V-124", C.wood2, 3), `<path d="M8 -124L32 -115L8 -106Z" fill="${C.terra}"/>`);
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${out.join("")}</g>`;
}
function pirogues() {
  const g = [];
  // Ciel, soleil, mer, plage
  g.push(`<circle cx="600" cy="116" r="62" fill="${C.white}" opacity=".6"/><circle cx="600" cy="116" r="44" fill="${C.ocre}" opacity=".9"/>`);
  g.push(cloud(110, 96, 0.9), cloud(400, 70, 0.7));
  g.push(`<path d="M0 236H800V372H0Z" fill="${C.blue}"/><path d="M0 236H800V256H0Z" fill="${C.indigo}" opacity=".45"/>`);
  for (const [wx, wy] of [[60, 270], [250, 262], [400, 280], [660, 266], [140, 306], [380, 316], [600, 312], [250, 340], [700, 340]]) g.push(stroke(`M${wx} ${wy}Q${wx + 14} ${wy - 8} ${wx + 28} ${wy}Q${wx + 42} ${wy - 8} ${wx + 56} ${wy}`, C.white, 3, ' opacity=".6"'));
  // Pirogue au large, avec deux pêcheurs (l'un fait signe)
  g.push(person({ x: 524, y: 322, s: 0.4, legs: "none", skin: SKIN.s2, top: C.ocre, hat: { type: "cap", color: C.terra } }));
  g.push(person({ x: 566, y: 322, s: 0.4, legs: "none", skin: SKIN.s1, top: C.white, arms: { r: [[60, -200], [70, -250]] } }));
  g.push(pirogue(476, 306, 320, 0.4, false, [C.yellow, C.red, C.white]));
  // L'écume sur le sable
  g.push(`<path d="M0 360Q100 346 200 362T400 358T600 364T800 356V600H0Z" fill="${C.white}" opacity=".7"/>`);
  g.push(`<path d="M0 372Q100 358 200 374T400 370T600 376T800 368V600H0Z" fill="${C.sand}"/>`);
  // Cocotiers
  g.push(palm(36, 412, 1.15, 18), palm(762, 404, 1.05, -16));
  g.push(`<circle cx="50" cy="214" r="8" fill="${C.wood2}"/><circle cx="62" cy="220" r="8" fill="${C.green}"/>`);
  // Grande pirogue tirée sur la plage, proue à gauche
  const px0 = 660, py0 = 478, L = 400;
  g.push(`<path d="M${px0 - L + 60} ${py0 + 2}Q${px0 - L / 2} ${py0 + 14} ${px0 - 60} ${py0 + 2}" stroke="${C.sand2}" stroke-width="12" fill="none" stroke-linecap="round"/>`);
  g.push(pirogue(px0, py0, L, 1, true, [C.ocre, C.green, C.terra]));
  // Les deux pêcheurs tirent la corde, vers la gauche
  // Corps penché en arrière (rotation autour des pieds), les deux bras tendus vers la corde, côté pirogue
  const ps = 0.92, py = 492, ang = -12, la = [[-54, -172], [-84, -160]], ra = [[0, -160], [-50, -150]];
  const lean = (x, svg) => `<g transform="rotate(${ang} ${x} ${py})">${svg}</g>`;
  const pullers = [[226, SKIN.s2, { hair: { type: "short" }, top: C.terra, bottom: C.indigo, hat: { type: "cap", color: C.ocre } }], [132, SKIN.s4, { hair: { type: "locks" }, top: C.white, bottom: C.green, bwax: "wax3" }]];
  for (const [x, skin, o] of pullers) g.push(lean(x, person({ x, y: py, s: ps, flip: true, legs: "walk", sleeve: "short", skin, arms: { l: la, r: ra }, ...o })));
  const rad = (ang * Math.PI) / 180;
  const hp = (x, [hx, hy]) => { const dx = -hx * ps, dy = hy * ps; return [x + dx * Math.cos(rad) - dy * Math.sin(rad), py + dx * Math.sin(rad) + dy * Math.cos(rad)]; };
  const [a1, b1, a2, b2] = [hp(226, la[1]), hp(226, ra[1]), hp(132, la[1]), hp(132, ra[1])];
  g.push(stroke(`M${px0 - L + 8} ${py0 - 80}L${f(a1[0])} ${f(a1[1])}L${f(b1[0])} ${f(b1[1])}L${f(a2[0])} ${f(a2[1])}L${f(b2[0])} ${f(b2[1])}Q${f(b2[0] - 30)} ${f(b2[1] + 10)} ${f(b2[0] - 40)} ${f(b2[1] + 60)}`, C.wood, 4));
  for (const [x, skin] of pullers) g.push(lean(x, at(x, py, ps, true, hand(...la[1], skin) + hand(...ra[1], skin))));
  // La marchande, bassine de poissons sur la tête
  const mx = 704, my = 590, ms = 1.08;
  g.push(person({ x: mx, y: my, s: ms, flip: true, legs: "walkskirt", skin: SKIN.s3, hair: { type: "nattes" }, top: C.ocre, sleeve: "short", bottom: C.indigo, bwax: "wax1",
    arms: { r: [[54, -232], [40, -282]], l: [[-40, -150], [-32, -112]] } }));
  const fish = [[-30, -300, -20], [-10, -306, 10], [12, -302, -8], [30, -298, 18]].map(([cx, cy, r]) => `<g transform="translate(${cx} ${cy}) rotate(${r})"><ellipse rx="13" ry="5.5" fill="${C.steel}"/><path d="M11 0L20 -6V6Z" fill="${C.grey}"/><circle cx="-7" cy="-1" r="1.5" fill="${C.dark}"/></g>`).join("");
  g.push(at(mx, my, ms, true, `<ellipse cx="0" cy="-268" rx="18" ry="5" fill="${C.terra}"/>` + fish + `<path d="M-48 -292H48Q44 -268 0 -266Q-44 -268 -48 -292Z" fill="${C.green}"/><path d="M-50 -294H50V-288H-50Z" fill="${C.green}"/><path d="M-50 -294H50V-288H-50Z" fill="rgba(0,0,0,.15)"/>` + hand(40, -282, SKIN.s3)));
  // Le pêcheur porte le filet sur l'épaule
  const nx = 540, ny = 584, ns = 1.12;
  const netD = "M18 -222Q46 -246 76 -222Q92 -186 82 -136Q72 -116 58 -128Q52 -168 36 -190Q26 -200 18 -222Z";
  g.push(at(nx, ny, ns, true, `<path d="${netD}" fill="${C.green}"/><path d="${netD}" fill="url(#pirogues-filet)"/>` +
    [[60, -126], [72, -120], [82, -138]].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="4.5" fill="${C.white}"/>`).join("")));
  g.push(person({ x: nx, y: ny, s: ns, flip: true, legs: "walk", skin: SKIN.s1, hair: { type: "nattes" }, beard: true, top: C.indigo, wax: "ndop", sleeve: "short", bottom: C.ocre,
    arms: { r: [[58, -196], [50, -226]], l: [[-40, -150], [-30, -110]] } }));
  // Coquillages
  g.push(`<circle cx="330" cy="566" r="5" fill="${C.cream}"/><circle cx="90" cy="560" r="4" fill="${C.rose}"/><circle cx="470" cy="580" r="4" fill="${C.rose}"/><circle cx="760" cy="560" r="3.5" fill="${C.cream}"/>`);
  const net = `<pattern id="pirogues-filet" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M0 0L9 9M9 0L0 9" stroke="${C.dark}" stroke-width="1.3" opacity=".55"/></pattern>`;
  return frame(`<defs>${net}</defs>` + g.join(""), "#DCEAF0");
}

/* ---------- Scène 3 : la dot ---------- */
function dot() {
  const g = [];
  // Cour en terre rouge, mur de la maison
  g.push(rect(0, 100, 800, 340, C.sand), rect(0, 430, 800, 170, "#D9A47E"));
  g.push(rect(168, 148, 116, 76, C.wood2, ' rx="4"'), rect(175, 155, 102, 62, C.cream), rect(224, 155, 4, 62, C.wood2), rect(160, 222, 132, 7, C.wood2, ' rx="3"'));
    // Bâche colorée
  g.push(stroke("M40 110V440M760 110V440", C.steel, 7));
  g.push(rect(20, 36, 760, 74, C.terra));
  for (let bx = 20; bx < 780; bx += 76) g.push(rect(bx + 38, 36, 38, 74, C.cream));
  let fr = "M20 110";
  for (let bx = 20; bx < 780; bx += 38) fr += `Q${bx + 19} 136 ${bx + 38} 110`;
  g.push(`<path d="${fr}Z" fill="${C.ocre}"/>`, rect(20, 30, 760, 10, C.indigo, ' rx="4"'));
  // Chaise en plastique (de face, vue de 3/4)
  const chair = (x, y, s, col) => at(x, y, s, false, `<path d="M-34 -100L-30 -196Q0 -206 30 -196L34 -100Z" fill="${col}"/><rect x="-22" y="-182" width="44" height="12" rx="6" fill="rgba(0,0,0,.12)"/><path d="M-38 -104H72L66 -92H-34Z" fill="${col}"/>` + stroke("M-32 -96L-40 0M66 -96L74 0M-10 -96L-6 -6M50 -96L46 -6", col, 7) + `<path d="M-38 -104H72L66 -92H-34Z" fill="rgba(0,0,0,.12)"/>`);
  // Famille de la mariée, assise, toute dans le même pagne
  const fam = { top: C.indigo, wax: "wax2", bottom: C.indigo, bwax: "wax2" };
  const seat = [[86, SKIN.s2, { type: "gele", color: C.indigo, wax: "wax2" }, { robe: "kaba" }], [180, SKIN.s4, { type: "short", color: C.grey }, { beard: true, hat: { type: "kufi", color: C.indigo, wax: "wax2" } }], [274, SKIN.s1, { type: "bantu" }, { robe: "dress" }]];
  for (const [sx, sk, hair, extra] of seat) {
    g.push(chair(sx, 440, 0.72, C.white));
    g.push(person({ x: sx, y: 440, s: 0.72, legs: "sit", skin: sk, hair, ...fam, ...extra, arms: { l: [[-30, -150], [10, -118]], r: [[40, -150], [30, -118]] } }));
  }
  g.push(chair(560, 440, 0.72, C.green));
  // L'ancien prend la parole
  const ex = 676, ey = 500, es = 1.05;
  g.push(person({ x: ex, y: ey, s: es, flip: true, skin: SKIN.s2, hair: { type: "short", color: C.grey }, beard: true, robe: "agbada", top: "#1C2756", wax: "ndop",
    hat: { type: "ashetu", color: C.red, color2: C.dark }, arms: { r: [[62, -198], [86, -236]], l: [[-46, -156], [-46, -110]] }, point: [120, -262],
    lhand: (hx, hy) => stroke(`M${hx} ${hy - 30}L${hx - 4} ${hy + 110}`, C.wood2, 6) + `<circle cx="${hx}" cy="${hy - 32}" r="7" fill="${C.wood}"/>` + hand(hx, hy, SKIN.s2) }));
  // Bulle de parole
  g.push(`<path d="M520 148H632Q648 148 648 164V200Q648 216 632 216H600L590 236L580 216H520Q504 216 504 200V164Q504 148 520 148Z" fill="${C.white}"/>`);
  for (const k of [0, 1, 2]) g.push(`<circle cx="${552 + k * 24}" cy="182" r="7" fill="${C.green}"/>`);
  // Les mariés, main dans la main
  g.push(person({ x: 384, y: 566, s: 1.1, skin: SKIN.s3, hair: { type: "gele", color: C.terra, wax: "wax1" }, robe: "kaba", top: C.terra, wax: "wax1",
    arms: { r: [[46, -150], [60, -118]], l: [[-40, -156], [-30, -114]] } }));
  g.push(person({ x: 504, y: 570, s: 1.14, skin: SKIN.s1, hair: { type: "short" }, top: "#15110F", wax: "toghu", bottom: C.dark, bwax: "toghu", hat: { type: "kufi", color: C.red },
    arms: { l: [[-42, -150], [-58, -118]], r: [[40, -152], [38, -110]] } }));
  g.push(at(384, 566, 1.1, false, hand(60, -118, SKIN.s3)));
  // Cadeaux : pagnes pliés, calebasses, bassine, casiers de boissons
  for (let k = 0; k < 6; k++) {
    const [col, pat] = [[C.terra, "wax1"], [C.indigo, "ndop"], [C.ocre, "kente"], [C.green, "kitenge"], [C.indigo, "wax2"], [C.terra, "wax3"]][k];
    g.push(`<rect x="${44 + (k % 2) * 3}" y="${560 - k * 15}" width="84" height="15" rx="3" fill="${col}"/><rect x="${44 + (k % 2) * 3}" y="${560 - k * 15}" width="84" height="15" rx="3" fill="url(#${pat})"/>`, rect(44 + (k % 2) * 3, 572 - k * 15, 84, 3, "rgba(0,0,0,.18)"));
  }
  g.push(`<path d="M140 520H252Q248 574 196 576Q144 574 140 520Z" fill="${C.green}"/><rect x="136" y="514" width="120" height="9" rx="4" fill="${C.green}"/>`);
  for (const [cx, cy, c] of [[166, 508, C.ocre], [192, 500, C.terra], [220, 506, C.ocre], [178, 492, C.cream], [208, 490, C.indigo]]) g.push(`<circle cx="${cx}" cy="${cy}" r="13" fill="${c}"/>`);
  g.push(`<path d="M206 488Q214 470 228 478" stroke="${C.wood2}" stroke-width="3" fill="none"/>`);
  // Calebasses
  for (const [cx, r] of [[250, 22], [286, 16]]) g.push(`<path d="M${cx - r} 580Q${cx - r - 6} ${580 - r * 1.6} ${cx} ${580 - r * 1.8}Q${cx + r + 6} ${580 - r * 1.6} ${cx + r} 580Z" fill="${C.ocre}"/>`, stroke(`M${cx - r + 4} ${580 - r * 0.7}Q${cx} ${580 - r * 0.9} ${cx + r - 4} ${580 - r * 0.7}`, C.wood2, 2.5));
  // Casiers de boissons, sans marque
  const crate = (x, y, col) => {
    let s = "";
    for (let i = 0; i < 4; i++) s += `<rect x="${x + 8 + i * 22}" y="${y - 30}" width="12" height="30" rx="3" fill="${C.wood2}"/><rect x="${x + 11 + i * 22}" y="${y - 42}" width="6" height="14" rx="2" fill="${C.wood2}"/><rect x="${x + 11 + i * 22}" y="${y - 44}" width="6" height="4" fill="${C.ocre}"/>`;
    return s + rect(x, y - 16, 96, 40, col, ' rx="4"') + rect(x + 8, y - 8, 22, 12, "rgba(0,0,0,.18)", ' rx="3"') + rect(x + 66, y - 8, 22, 12, "rgba(0,0,0,.18)", ' rx="3"');
  };
  g.push(crate(536, 570, C.red), crate(536, 530, C.red), crate(640, 570, C.yellow));
  return frame(g.join(""), "#E6EEDB");
}

export default [
  { id: "pagnes", fr: "Au marché des pagnes", en: "At the fabric market", tags: ["marché", "pagne", "wax", "tissu", "boutique", "vendeuse", "gele", "tailleur", "couture", "machine à coudre", "tresses", "ndop", "kente", "fabric", "market", "tailor", "sewing", "braids"], draw: pagnes },
  { id: "pirogues", fr: "Retour des pêcheurs", en: "Fishermen coming home", tags: ["pêche", "pêcheurs", "pirogue", "plage", "mer", "filet", "poissons", "marchande", "bassine", "cocotier", "Kribi", "Saint-Louis", "fishing", "fishermen", "canoe", "beach", "sea", "fish"], draw: pirogues },
  { id: "dot", fr: "La dot", en: "The bride price ceremony", tags: ["dot", "mariage", "mariage traditionnel", "mariée", "marié", "famille", "cérémonie", "kaba", "gele", "toghu", "ndop", "ancien", "cadeaux", "bride price", "wedding", "traditional wedding", "family", "ceremony", "elder", "gifts"], draw: dot },
];
