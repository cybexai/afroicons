// Scènes : la saison des pluies, le marché de nuit, la séance de sport au stade.
import { C, SKIN, person, frame, cloud, stroke, f } from "./lib.mjs";
import { flag } from "./flag.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${r}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
/** Aplat avec un motif par-dessus. */
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");
/** Halo lumineux : cercles concentriques de plus en plus clairs. */
const halo = (x, y, r, col = C.yellow) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${col}" opacity=".08"/><circle cx="${x}" cy="${y}" r="${f(r * 0.66)}" fill="${col}" opacity=".12"/><circle cx="${x}" cy="${y}" r="${f(r * 0.38)}" fill="${col}" opacity=".2"/>`;

/* ---------- Scène 1 : la saison des pluies ---------- */
/** Parapluie (repère local d'un personnage) : manche tenu en (hx,hy), dôme au-dessus de la tête. */
const umbrella = (id, hx, hy, cols, r = 86, top = -350) => {
  const n = cols.length, cx = f(hx * 0.3), rim = top + 40, h = 62, out = [];
  const xs = Array.from({ length: n + 1 }, (_, i) => f(cx - r + (2 * r * i) / n));
  let dome = `M${xs[0]} ${rim}A${r} ${h} 0 0 1 ${xs[n]} ${rim}`;
  for (let i = n; i > 0; i--) dome += `Q${f((xs[i] + xs[i - 1]) / 2)} ${rim - 12} ${xs[i - 1]} ${rim}`;
  out.push(stroke(`M${hx} ${hy + 14}Q${hx + 10} ${hy + 22} ${hx + 14} ${hy + 12}`, C.dark, 4), stroke(`M${hx} ${hy + 12}L${cx} ${rim - h - 8}`, C.dark, 3.5));
  out.push(`<clipPath id="${id}"><path d="${dome}Z"/></clipPath><g clip-path="url(#${id})">`);
  for (let i = 0; i < n; i++) out.push(`<path d="M${cx} ${rim - h - 6}L${xs[i]} ${rim + 4}H${xs[i + 1]}Z" fill="${cols[i]}"/>`);
  out.push(`</g>`, stroke(`M${f(cx - r * 0.6)} ${f(rim - h * 0.62)}Q${cx} ${f(rim - h * 1.08)} ${f(cx + r * 0.2)} ${f(rim - h * 0.96)}`, C.white, 3, ' opacity=".35"'));
  out.push(`<circle cx="${cx}" cy="${rim - h - 6}" r="4" fill="${C.dark}"/>`);
  return out.join("");
};
/** Flaque : eau, reflet et ronds de pluie. */
const puddle = (x, y, rx, ry) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${C.blue}" opacity=".55"/><ellipse cx="${x - rx * 0.2}" cy="${y - ry * 0.25}" rx="${f(rx * 0.5)}" ry="${f(ry * 0.25)}" fill="${C.white}" opacity=".3"/>` +
  [[-0.45, 0.1], [0.4, -0.1], [0.1, 0.35]].map(([k, l]) => `<ellipse cx="${f(x + k * rx)}" cy="${f(y + l * ry)}" rx="${f(rx * 0.14)}" ry="${f(ry * 0.16)}" fill="none" stroke="${C.white}" stroke-width="1.5" opacity=".6"/>`).join("");
/** Moto-taxi de profil vers la droite, roues au sol en y=0. */
const motoBody = () => {
  const wheel = (cx) => `<circle cx="${cx}" cy="-28" r="28" fill="${C.dark}"/><circle cx="${cx}" cy="-28" r="17" fill="${C.steel}"/><circle cx="${cx}" cy="-28" r="6" fill="${C.grey}"/>`;
  return `<ellipse cx="14" cy="0" rx="120" ry="6" fill="${C.dark}" opacity=".25"/>` + wheel(-66) + wheel(94) +
    stroke("M-66 -28L10 -46", C.dark, 7) + stroke("M94 -28L72 -116", C.steel, 7) +
    stroke("M-96 -40Q-90 -64 -62 -64Q-40 -64 -32 -50", C.red, 6) + stroke("M70 -48Q80 -66 100 -64Q118 -60 122 -44", C.red, 6) +
    `<path d="M-14 -68H40L44 -40Q38 -24 18 -24H-6Q-20 -28 -20 -44Z" fill="${C.grey}"/><circle cx="10" cy="-44" r="10" fill="${C.steel}"/>` +
    stroke("M30 -32Q22 -16 -20 -16H-70", C.steel, 6) +
    `<path d="M-100 -82Q-100 -92 -86 -92H20Q32 -92 30 -82L26 -74H-94Q-100 -76 -100 -82Z" fill="${C.dark}"/>` +
    `<path d="M24 -94Q28 -116 54 -116Q72 -114 76 -102L72 -82Q48 -76 28 -78Z" fill="${C.red}"/>` + stroke("M34 -108Q50 -112 64 -108", C.white, 3, ' opacity=".45"') +
    stroke("M60 -126Q70 -132 84 -128", C.dark, 6) + `<circle cx="86" cy="-112" r="10" fill="${C.dark}"/><circle cx="89" cy="-112" r="6.5" fill="${C.yellow}"/>`;
};

function pluie() {
  const g = [];
  g.push(`<defs><pattern id="pluie-rain" width="46" height="70" patternUnits="userSpaceOnUse" patternTransform="rotate(14)">` +
    `<path d="M6 0V20M28 30V52M40 8V22M16 44V62" stroke="${C.white}" stroke-width="2.2" stroke-linecap="round"/></pattern></defs>`);
  // Ciel couvert, gros nuages gris
  g.push(rect(0, 0, 800, 400, C.grey, ' opacity=".35"'));
  for (const [x, y, s] of [[40, 60, 1.6], [300, 40, 1.9], [560, 70, 1.5], [700, 30, 1.3]]) g.push(`<g opacity=".55">${cloud(x, y, s).replace(`fill="${C.white}"`, `fill="${C.grey}"`)}</g>`);
  // Fond : maison à toit de tôle, boutique peinte, manguier
  g.push(`<circle cx="610" cy="250" r="70" fill="${C.leaf2}"/><circle cx="560" cy="280" r="50" fill="${C.leaf}"/><circle cx="672" cy="282" r="52" fill="${C.leaf}"/>`, rect(604, 290, 14, 110, C.wood2));
  g.push(`<path d="M-10 220L40 178H300L330 220Z" fill="${C.steel}"/>`);
  for (let x = 40; x < 320; x += 26) g.push(stroke(`M${x} 220L${x + 12} 180`, C.grey, 2, ' opacity=".5"'));
  g.push(rect(0, 220, 320, 180, C.cream), rect(0, 360, 320, 40, C.ocre, ' opacity=".7"'));
  g.push(rect(36, 250, 80, 70, C.sky), stroke("M56 250V320M76 250V320M96 250V320M36 285H116", C.dark, 3, ' opacity=".6"'));
  g.push(rect(170, 250, 110, 150, C.green), rect(180, 262, 90, 70, C.wood2), rect(180, 262, 90, 70, C.dark, ' opacity=".25"'));
  for (const [x, c] of [[190, C.yellow], [210, C.red], [230, C.white], [250, C.ocre]]) g.push(rect(x, 300, 14, 30, c, ' rx="2"'));
  // Gouttière : l'eau qui tombe du bord du toit
  for (let x = 20; x < 320; x += 34) g.push(stroke(`M${x} 224V${236 + (x % 3) * 6}`, C.blue, 2.5, ' opacity=".7"'));
  g.push(`<path d="M690 236L740 206H800V236Z" fill="${C.terra}"/>`, rect(696, 236, 104, 164, C.sand), rect(720, 270, 40, 44, C.sky), stroke("M740 270V314M720 292H760", C.dark, 3, ' opacity=".5"'), rect(696, 370, 104, 30, C.green, ' opacity=".6"'));
  g.push(`<path d="M330 264L380 236H470L500 264Z" fill="${C.steel}"/>`, rect(336, 264, 160, 136, C.white), rect(352, 290, 46, 40, C.sky), rect(420, 300, 44, 100, C.wood));
  // Rue en terre rouge mouillée
  g.push(rect(0, 398, 800, 202, C.wood), rect(0, 398, 800, 202, C.red, ' opacity=".28"'), rect(0, 398, 800, 46, C.dark, ' opacity=".12"'));
  for (const [x, y, w] of [[60, 470, 90], [520, 460, 120], [240, 590, 140], [620, 560, 80]]) g.push(stroke(`M${x} ${y}H${x + w}`, C.white, 3, ' opacity=".14"'));
  g.push(puddle(150, 432, 60, 8), puddle(690, 440, 70, 9), puddle(452, 548, 110, 20));

  // Passante au loin, parapluie jaune
  const p0 = [560, 430, 0.46];
  g.push(person({ x: p0[0], y: p0[1], s: p0[2], legs: "walkskirt", skin: SKIN.s3, hair: { type: "nattes" }, top: C.indigo, wax: "wax3", bottom: C.indigo, face: "calm",
    arms: { r: [[44, -170], [40, -236]] } }));
  g.push(at(...p0, false, umbrella("pluie-u1", 40, -236, [C.yellow, C.ocre, C.yellow, C.ocre, C.yellow], 80, -330) + hand(40, -236, SKIN.s3)));

  // Moto-taxi : le conducteur casqué, le passager sous une bâche
  const mx = 300, my = 446, ms = 0.95, ps = 0.72;
  const mo = [motoBody()];
  const pskin = SKIN.s4, dskin = SKIN.s2;
  mo.push(person({ x: -52, y: -10, s: ps, skin: pskin, hair: { type: "short" }, top: C.terra, bottom: C.indigo, legs: "sit", face: "laugh",
    arms: { l: [[-50, -250], [-40, -318]], r: [[52, -250], [46, -318]] } }));
  mo.push(person({ x: 6, y: -10, s: ps, skin: dskin, hair: { type: "short" }, hat: { type: "helmet", color: C.ocre }, top: C.yellow, bottom: C.wood2, legs: "sit", face: "smile",
    arms: { l: [[34, -170], [92, -158]], r: [[70, -176], [96, -164]] } }));
  mo.push(at(6, -10, ps, false, rect(-28, -150, 56, 7, C.steel) + rect(-28, -128, 56, 7, C.steel)));
  mo.push(stroke("M72 -116L62 -126", C.dark, 5));
  // La bâche bleue tendue au-dessus des deux têtes
  const ty = -10 - 318 * ps;
  mo.push(`<path d="M-118 ${f(ty + 10)}Q-82 ${f(ty - 14)} -20 ${f(ty - 10)}Q30 ${f(ty - 12)} 60 ${f(ty + 4)}L64 ${f(ty + 22)}Q30 ${f(ty + 8)} -20 ${f(ty + 10)}Q-80 ${f(ty + 6)} -116 ${f(ty + 30)}Z" fill="${C.blue}"/>`);
  mo.push(stroke(`M-110 ${f(ty + 22)}Q-70 ${f(ty + 2)} -20 ${f(ty + 2)}`, C.white, 2.5, ' opacity=".4"'));
  for (const x of [-112, 62]) mo.push(`<path d="M${x} ${f(ty + 30)}q-3 7 0 9q3 -2 0 -9Z" fill="${C.blue}"/>`);
  const [l2x, l2y] = [-52 - 40 * ps, -10 - 318 * ps], [r2x, r2y] = [-52 + 46 * ps, -10 - 318 * ps];
  mo.push(hand(l2x, l2y + 4, pskin, 5.4), hand(r2x, r2y + 4, pskin, 5.4), hand(6 + 92 * ps, -10 - 158 * ps, dskin, 5.4));
  g.push(at(mx, my, ms, false, mo.join("")));
  // Gerbe d'eau derrière la roue arrière
  for (const [x, y, r] of [[206, 424, 4], [194, 414, 3], [214, 412, 3], [184, 428, 2.5]]) g.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${C.white}" opacity=".7"/>`);

  // La femme qui protège sa bassine avec un pagne
  const w = [112, 584, 1.05], ws = SKIN.s1;
  g.push(person({ x: w[0], y: w[1], s: w[2], legs: "walkskirt", skin: ws, hair: { type: "foulard", color: C.green, wax: "wax3" }, robe: "kaba", top: C.terra, wax: "wax1", face: "calm",
    arms: { l: [[-50, -248], [-40, -300]], r: [[50, -248], [40, -300]] } }));
  g.push(at(...w, false, `<path d="M-48 -296H48L40 -322H-40Z" fill="${C.steel}"/><path d="M-48 -296H48L46 -302H-46Z" fill="${C.grey}"/>` +
    cloth("M-50 -310Q-54 -350 0 -354Q54 -350 50 -310Q52 -296 46 -288L38 -306Q0 -316 -38 -306L-46 -288Q-52 -296 -50 -310Z", C.indigo, "wax2") +
    stroke("M-40 -318Q0 -334 40 -318", "rgba(0,0,0,.18)", 3) + hand(-40, -300, ws) + hand(40, -300, ws)));

  // Les enfants qui sautent dans la grande flaque
  const k1 = [404, 506, 0.6], k2 = [508, 512, 0.58];
  g.push(`<ellipse cx="404" cy="548" rx="22" ry="4" fill="${C.dark}" opacity=".2"/><ellipse cx="508" cy="550" rx="22" ry="4" fill="${C.dark}" opacity=".2"/>`);
  g.push(person({ x: k1[0], y: k1[1], s: k1[2], legs: "walk", skin: SKIN.s3, hair: { type: "short" }, top: C.ocre, sleeve: "short", bottom: C.green, face: "laugh",
    arms: { l: [[-52, -214], [-66, -262]], r: [[52, -214], [66, -262]] } }));
  g.push(person({ x: k2[0], y: k2[1], s: k2[2], flip: true, legs: "walkskirt", skin: SKIN.s5, hair: { type: "puffs" }, top: C.yellow, wax: "wax3", sleeve: "short", bottom: C.terra, bwax: "wax2", face: "laugh",
    arms: { l: [[-50, -160], [-62, -124]], r: [[52, -214], [62, -264]] } }));
  // Éclaboussures
  const drop = (x, y, r, rot) => `<path d="M0 ${-r * 2}Q${r} 0 0 ${r}Q${-r} 0 0 ${-r * 2}Z" fill="${C.white}" opacity=".85" transform="translate(${x} ${y}) rotate(${rot})"/>`;
  for (const [x, y, r, rot] of [[360, 528, 5, -40], [346, 510, 4, -50], [372, 500, 3.5, -30], [440, 520, 5, 30], [456, 504, 4, 40], [478, 528, 4.5, -30], [544, 520, 5, 40], [560, 504, 4, 50], [530, 496, 3, 20], [412, 492, 3, 0]]) g.push(drop(x, y, r, rot));
  g.push(stroke("M352 548Q404 534 452 540M470 546Q510 534 560 548", C.white, 3, ' opacity=".5"'));

  // La passante au parapluie coloré, au premier plan à droite
  const u = [696, 576, 1.0], us = SKIN.s4;
  g.push(person({ x: u[0], y: u[1], s: u[2], flip: true, legs: "walk", skin: us, hair: { type: "boxbraids", beads: C.ocre }, top: C.green, wax: "kitenge", bottom: C.indigo, bwax: "wax3", shoes: C.yellow, face: "smile",
    arms: { r: [[50, -176], [44, -236]], l: [[-42, -150], [-36, -112]] },
    lhand: (hx, hy) => `<path d="M${hx - 12} ${hy}H${hx + 12}L${hx + 14} ${hy + 30}H${hx - 14}Z" fill="${C.terra}"/>` + stroke(`M${hx - 8} ${hy}Q${hx} ${hy - 12} ${hx + 8} ${hy}`, C.dark, 2.5) + hand(hx, hy, us) }));
  g.push(at(...u, true, umbrella("pluie-u2", 44, -236, [C.terra, C.ocre, C.green, C.red, C.indigo, C.yellow]) + hand(44, -236, us)));
  // La pluie, par-dessus tout
  g.push(rect(0, 0, 800, 600, "url(#pluie-rain)", ' opacity=".55"'));
  return frame(g.join(""), C.sky);
}

/* ---------- Scène 2 : le marché de nuit ---------- */
/** Ampoule suspendue avec son halo. */
const bulb = (x, y, r = 30) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.yellow}" opacity=".1"/><circle cx="${x}" cy="${y}" r="${f(r * 0.5)}" fill="${C.yellow}" opacity=".18"/>` + `<circle cx="${x}" cy="${y}" r="5" fill="${C.yellow}"/>`;
/** Lampe tempête posée (base en x,y). */
const lantern = (x, y) => halo(x, y - 18, 56) + rect(x - 10, y - 6, 20, 6, C.dark, ' rx="2"') + `<path d="M${x - 8} ${y - 6}Q${x - 12} ${y - 20} ${x - 8} ${y - 32}H${x + 8}Q${x + 12} ${y - 20} ${x + 8} ${y - 6}Z" fill="${C.yellow}" opacity=".85"/>` +
  `<ellipse cx="${x}" cy="${y - 18}" rx="3" ry="6" fill="${C.white}"/>` + rect(x - 9, y - 38, 18, 6, C.dark, ' rx="2"') + stroke(`M${x - 6} ${y - 38}Q${x} ${y - 50} ${x + 6} ${y - 38}`, C.dark, 2);

function nuit() {
  const g = [];
  g.push(rect(0, 0, 800, 600, C.blue, ' opacity=".22"'));
  // Étoiles et lune
  for (const [x, y, r] of [[60, 50, 1.8], [160, 100, 1.4], [250, 40, 2], [380, 80, 1.5], [470, 30, 1.8], [540, 110, 1.3], [760, 40, 1.5]]) g.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${C.white}" opacity=".8"/>`);
  g.push(halo(650, 80, 80, C.cream), `<circle cx="650" cy="80" r="32" fill="${C.cream}"/><circle cx="638" cy="72" r="6" fill="${C.sand2}"/><circle cx="660" cy="92" r="4" fill="${C.sand2}"/><circle cx="662" cy="68" r="3" fill="${C.sand2}"/>`);
  // Immeubles au loin, fenêtres allumées
  g.push(`<path d="M0 330V220H90V180H170V240H250V200H330V330Z" fill="${C.dark}" opacity=".7"/><path d="M470 330V230H560V190H640V250H720V210H800V330Z" fill="${C.dark}" opacity=".7"/>`);
  for (const [x, y] of [[20, 240], [110, 200], [140, 230], [190, 260], [300, 260], [490, 250], [580, 210], [660, 270], [740, 230]]) g.push(rect(x, y, 12, 14, C.yellow, ' opacity=".55"'));
  // Sol du marché
  g.push(rect(0, 330, 800, 270, C.wood2), rect(0, 330, 800, 270, C.dark, ' opacity=".35"'));
  g.push(`<ellipse cx="200" cy="500" rx="230" ry="60" fill="${C.yellow}" opacity=".1"/><ellipse cx="610" cy="500" rx="220" ry="60" fill="${C.yellow}" opacity=".1"/>`);
  // Étals au fond, petites lumières
  for (const [x, c] of [[300, C.terra], [400, C.green], [490, C.ocre]]) g.push(`<path d="M${x - 44} 300L${x - 50} 316H${x + 50}L${x + 44} 300Z" fill="${c}"/>`, rect(x - 40, 316, 80, 34, C.wood, ' opacity=".8"'), stroke(`M${x - 40} 316V360M${x + 40} 316V360`, C.wood2, 4), `<circle cx="${x}" cy="326" r="18" fill="${C.yellow}" opacity=".15"/><circle cx="${x}" cy="326" r="3.5" fill="${C.yellow}"/>`);
  // Passant au loin
  g.push(person({ x: 528, y: 372, s: 0.38, skin: SKIN.s2, hair: { type: "short" }, top: C.white, sleeve: "short", bottom: C.indigo, legs: "walk", face: "smile" }));

  // Guirlande d'ampoules entre deux poteaux
  g.push(rect(20, 110, 8, 390, C.wood2), rect(772, 110, 8, 390, C.wood2));
  g.push(stroke("M24 120Q210 196 400 140Q590 196 776 120", C.dark, 2.5));
  for (let i = 1; i < 10; i++) {
    const t = i / 10, seg = t < 0.5 ? t * 2 : (t - 0.5) * 2, x0 = t < 0.5 ? 24 : 400, x1 = t < 0.5 ? 400 : 776, cx = t < 0.5 ? 210 : 590;
    const y0 = t < 0.5 ? 120 : 140, y1 = t < 0.5 ? 140 : 120, u = seg;
    const bx = (1 - u) ** 2 * x0 + 2 * u * (1 - u) * cx + u * u * x1, by = (1 - u) ** 2 * y0 + 2 * u * (1 - u) * 196 + u * u * y1;
    g.push(stroke(`M${f(bx)} ${f(by)}V${f(by + 8)}`, C.dark, 2), bulb(f(bx), f(by + 13), 26));
  }

  // Étal de soya : toit de bâche, gril sur fût coupé, fumée
  g.push(`<path d="M40 218L60 194H330L350 218Z" fill="${C.terra}"/>`, stroke("M60 218V470M330 218V470", C.wood2, 7));
  for (let x = 60; x < 330; x += 30) g.push(`<path d="M${x} 218q15 12 30 0Z" fill="${C.terra}"/>`);
  g.push(stroke("M276 220V236", C.dark, 2), bulb(276, 244, 60));
  // Vendeuse de soya derrière le gril, éventail à la main
  const v = [176, 500, 0.95], vs = SKIN.s4;
  g.push(person({ x: v[0], y: v[1], s: v[2], skin: vs, hair: { type: "foulard", color: C.ocre, wax: "wax2" }, top: C.green, wax: "wax1", sleeve: "short", bottom: C.indigo, face: "talk",
    arms: { l: [[-52, -150], [-40, -100]], r: [[58, -184], [76, -176]] },
    lhand: (hx, hy) => stroke(`M${hx - 6} ${hy + 6}L${hx + 30} ${hy - 30}`, C.sand, 2.5) + [0, 1, 2].map((i) => `<circle cx="${hx + 11 + i * 6}" cy="${hy - 11 - i * 6}" r="4.5" fill="${i % 2 ? C.wood2 : C.wood}"/>`).join("") + hand(hx, hy, vs),
    rhand: (hx, hy) => `<path d="M${hx} ${hy}L${hx + 24} ${hy - 26}Q${hx + 38} ${hy - 6} ${hx + 26} ${hy + 10}Z" fill="${C.sand2}"/>` + stroke(`M${hx + 4} ${hy - 2}L${hx + 26} ${hy - 18}M${hx + 4} ${hy}L${hx + 30} ${hy - 4}`, C.wood, 1.6) + hand(hx, hy, vs) }));
  // Le gril : fût coupé sur pieds, braises, brochettes
  g.push(stroke("M100 470L92 506M260 470L268 506", C.dark, 6));
  g.push(`<path d="M86 430H274Q276 470 250 478H110Q84 470 86 430Z" fill="${C.grey}"/>`, rect(86, 424, 188, 10, C.dark, ' rx="3"'));
  g.push(`<path d="M94 426Q180 410 266 426" fill="none" stroke="${C.red}" stroke-width="6" opacity=".8"/>`);
  for (let i = 0; i < 6; i++) {
    const x = 104 + i * 27;
    g.push(stroke(`M${x} 432L${x + 22} 408`, C.sand, 2.2));
    for (let j = 0; j < 3; j++) g.push(`<circle cx="${f(x + 7.5 + j * 5.5)}" cy="${f(423.5 - j * 6)}" r="4" fill="${j % 2 ? C.wood2 : C.wood}"/>`);
  }
  // Fumée qui monte du gril
  for (const [x, k] of [[214, 0], [248, 1], [100, 2]]) g.push(stroke(`M${x} 404Q${x + 14} 388 ${x + 4} ${372 - k * 4}Q${x - 8} 356 ${x + 12} ${340 - k * 6}Q${x + 26} 326 ${x + 18} ${306 - k * 4}`, C.white, 9, ' opacity=".2"'));
  g.push(lantern(290, 424));
  // Plateau de brochettes prêtes, papier
  g.push(rect(40, 500, 110, 10, C.wood2), stroke("M50 510V560M140 510V560", C.wood2, 5), `<ellipse cx="95" cy="496" rx="44" ry="8" fill="${C.steel}"/>`);
  for (let i = 0; i < 4; i++) g.push(stroke(`M${64 + i * 16} 498L${82 + i * 16} 488`, C.wood2, 5), `<circle cx="${f(90 + i * 16)}" cy="${f(486)}" r="3" fill="${C.red}"/>`);

  // Étal de fruits : toit vert, lampe, pyramides de fruits
  g.push(`<path d="M470 218L490 194H760L780 218Z" fill="${C.green}"/>`, stroke("M490 218V480M760 218V480", C.wood2, 7));
  for (let x = 490; x < 760; x += 30) g.push(`<path d="M${x} 218q15 12 30 0Z" fill="${C.green}"/>`);
  g.push(stroke("M530 220V236", C.dark, 2), bulb(530, 244, 60));
  const fv = [636, 476, 0.84], fs = SKIN.s4;
  g.push(person({ x: fv[0], y: fv[1], s: fv[2], skin: fs, hair: { type: "gele", color: C.ocre, wax: "wax3" }, robe: "kaba", top: C.indigo, wax: "wax1", face: "smile",
    arms: { l: [[-48, -160], [-60, -126]], r: [[48, -168], [74, -150]] },
    rhand: (hx, hy) => `<circle cx="${hx + 6}" cy="${hy - 10}" r="12" fill="${C.ocre}"/><path d="M${hx + 6} ${hy - 22}l3 -6" stroke="${C.leaf2}" stroke-width="3"/>` + hand(hx, hy, fs) }));
  g.push(rect(480, 452, 290, 18, C.wood), rect(480, 470, 290, 70, C.wood2), stroke("M500 540V570M750 540V570", C.wood2, 7));
  for (let x = 510; x < 770; x += 52) g.push(stroke(`M${x} 476V534`, C.wood, 3, ' opacity=".5"'));
  // Oranges
  for (const [x, y] of [[504, 446], [520, 446], [536, 446], [512, 434], [528, 434], [520, 422]]) g.push(`<circle cx="${x}" cy="${y}" r="8" fill="${C.ocre}"/><circle cx="${x - 2}" cy="${y - 3}" r="2" fill="${C.yellow}" opacity=".7"/>`);
  // Ananas
  for (const x of [572, 600]) g.push(`<ellipse cx="${x}" cy="436" rx="12" ry="17" fill="${C.yellow}"/>`, stroke(`M${x - 8} 428L${x + 8} 444M${x + 8} 428L${x - 8} 444`, C.wood, 1.6, ' opacity=".6"'), `<path d="M${x} 420L${x - 12} 400L${x - 2} 412L${x} 394L${x + 3} 412L${x + 12} 400Z" fill="${C.leaf2}"/>`);
  // Mangues
  for (const [x, y] of [[654, 446], [674, 446], [664, 434]]) g.push(`<ellipse cx="${x}" cy="${y}" rx="10" ry="8" fill="${C.leaf}"/><ellipse cx="${x + 3}" cy="${y - 2}" rx="5" ry="5" fill="${C.red}" opacity=".6"/>`);
  // Régime de bananes
  for (let i = 0; i < 5; i++) g.push(`<path d="M${694 + i * 9} 450Q${686 + i * 9} 426 ${698 + i * 9} 416Q${700 + i * 9} 432 ${702 + i * 9} 450Z" fill="${C.yellow}"/>`);
  g.push(stroke("M698 416Q716 404 734 414", C.wood2, 4));
  g.push(lantern(748, 452));

  // Les clients qui flânent : un couple au milieu, une cliente qui achète du soya
  const c1 = [392, 560, 1.0], c1s = SKIN.s3;
  g.push(person({ x: c1[0], y: c1[1], s: c1[2], legs: "walk", skin: c1s, hair: { type: "short" }, beard: true, top: C.ocre, dashiki: C.indigo, sleeve: "short", bottom: C.dark, face: "laugh",
    arms: { r: [[46, -160], [58, -122]], l: [[-40, -152], [-36, -112]] } }));
  const c2 = [474, 566, 0.96], c2s = SKIN.s5;
  g.push(person({ x: c2[0], y: c2[1], s: c2[2], flip: true, legs: "walkskirt", skin: c2s, hair: { type: "boxbraids", beads: C.yellow }, top: C.terra, wax: "kente", sleeve: "short", bottom: C.green, bwax: "wax2", face: "talk",
    arms: { r: [[48, -160], [58, -124]], l: [[-44, -166], [-24, -196]] }, phone: { rot: 12, screen: C.yellow } }));
  const k = [300, 578, 0.9], ks = SKIN.s1;
  g.push(person({ x: k[0], y: k[1], s: k[2], skin: ks, hair: { type: "bantu" }, top: C.white, sleeve: "short", bottom: C.indigo, bwax: "ndop", legs: "skirt", face: "talk",
    arms: { l: [[-48, -170], [-70, -186]], r: [[42, -150], [36, -110]] },
    lhand: (hx, hy) => rect(hx - 2, hy - 18, 10, 16, C.leaf, ' rx="1.5"') + rect(hx + 1, hy - 20, 10, 16, C.leaf2, ' rx="1.5"') + hand(hx, hy, ks) }));
  return frame(g.join(""), C.dark);
}

/* ---------- Scène 3 : séance de sport au stade ---------- */
/** Bandeau en tissu sur le front (repère local d'un personnage). */
const band = (col, pat) => cloth("M-22 -252Q0 -262 22 -252L22 -244Q0 -254 -22 -244Z", col, pat) + `<path d="M20 -250L32 -238L28 -232L20 -244Z" fill="${col}"/>`;
/** Bouteille d'eau posée (base en x,y). */
const bottle = (x, y, col) => rect(x - 7, y - 34, 14, 34, C.sky, ' rx="4"') + rect(x - 7, y - 22, 14, 12, col) + rect(x - 4, y - 40, 8, 7, col, ' rx="1.5"') + rect(x - 4, y - 30, 3, 26, C.white, ' opacity=".6"');

function gym() {
  const g = [];
  g.push(`<circle cx="120" cy="96" r="60" fill="${C.yellow}" opacity=".25"/><circle cx="120" cy="96" r="38" fill="${C.yellow}" opacity=".75"/>`, cloud(260, 70, 0.8), cloud(560, 50, 0.9));
  // Projecteur
  g.push(rect(720, 60, 8, 180, C.grey), rect(696, 46, 56, 26, C.steel, ' rx="3"'));
  for (const x of [702, 716, 730]) g.push(rect(x, 52, 12, 14, C.white, ' rx="2"'));
  // Mât et drapeau en haut des gradins
  g.push(rect(396, 70, 5, 120, C.grey), `<circle cx="398.5" cy="68" r="4" fill="${C.grey}"/>`, flag(401, 76, 60, "CM"));
  // Gradins en béton, sièges colorés
  g.push(`<path d="M0 190H800V340H0Z" fill="${C.steel}"/>`);
  for (let r = 0; r < 5; r++) {
    const y = 196 + r * 28;
    g.push(rect(0, y + 18, 800, 10, C.grey, ' opacity=".45"'));
    for (let x = 8 + (r % 2) * 12; x < 800; x += 24) g.push(rect(x, y + 4, 16, 14, [C.ocre, C.green, C.terra][(r + Math.floor(x / 120)) % 3], ' rx="3"'));
  }
  g.push(stroke("M200 192V336M600 192V336", C.white, 5, ' opacity=".7"'));
  // Muret, piste et pelouse
  g.push(rect(0, 334, 800, 18, C.white), rect(0, 348, 800, 6, C.grey, ' opacity=".4"'));
  g.push(rect(0, 352, 800, 160, C.rose), rect(0, 352, 800, 160, C.red, ' opacity=".18"'));
  for (const y of [392, 432, 472]) g.push(rect(0, y, 800, 3, C.white, ' opacity=".85"'));
  g.push(rect(0, 510, 800, 90, C.leaf), rect(0, 510, 800, 6, C.white));
  for (let x = 0; x < 800; x += 80) g.push(rect(x, 516, 40, 84, C.leaf2, ' opacity=".25"'));

  // Coach : casquette, survêtement, sifflet à la bouche, bras tendu
  const c = [104, 550, 1.04], cs = SKIN.s2;
  g.push(person({ x: c[0], y: c[1], s: c[2], skin: cs, hair: { type: "short" }, beard: true, hat: { type: "cap", color: C.indigo }, top: C.terra, bottom: C.dark, shoes: C.white, face: "calm",
    arms: { r: [[62, -200], [100, -232]], l: [[-40, -160], [-14, -214]] }, point: [140, -250] }));
  g.push(at(...c, false, stroke("M-10 -206Q-14 -196 0 -184Q12 -196 10 -206", C.white, 1.6) + stroke("M-8 -206V-140M8 -206V-140", C.white, 3) +
    `<path d="M-2 -222H-20Q-26 -222 -26 -216Q-26 -210 -20 -210H-8Z" fill="${C.yellow}"/><circle cx="-18" cy="-216" r="3" fill="${C.dark}"/>` + hand(-14, -214, cs, 6.5)));

  // Femme qui s'étire, bras au-dessus de la tête (leggings wax, nattes, bandeau)
  const a = [272, 488, 0.9], as = SKIN.s4;
  g.push(`<ellipse cx="272" cy="490" rx="40" ry="6" fill="${C.dark}" opacity=".15"/>`);
  g.push(person({ x: a[0], y: a[1], s: a[2], skin: as, hair: { type: "nattes" }, top: C.indigo, sleeve: "short", bottom: C.ocre, bwax: "wax1", shoes: C.white, face: "smile",
    arms: { l: [[-40, -250], [-6, -300]], r: [[40, -250], [6, -300]] } }));
  g.push(at(...a, false, band(C.terra, "wax2") + hand(0, -302, as, 8.5)));

  // Homme qui saute, bras en V
  const j = [430, 436, 0.9], js = SKIN.s1;
  g.push(`<ellipse cx="430" cy="488" rx="34" ry="5" fill="${C.dark}" opacity=".18"/>`);
  g.push(person({ x: j[0], y: j[1], s: j[2], legs: "walk", skin: js, hair: { type: "locks" }, top: C.green, wax: "kente", sleeve: "short", bottom: C.dark, shoes: C.white, face: "laugh",
    arms: { l: [[-54, -232], [-80, -278]], r: [[54, -232], [80, -278]] } }));
  g.push(at(...j, false, band(C.yellow, null)));
  for (const [x1, y1, x2, y2] of [[372, 246, 362, 236], [488, 246, 498, 236], [400, 458, 392, 466], [462, 458, 470, 466]]) g.push(stroke(`M${x1} ${y1}L${x2} ${y2}`, C.dark, 3, ' opacity=".35"'));

  // Femme en fente avant, une main sur la hanche (leggings kitenge, foulard)
  const b = [590, 506, 0.92], bs = SKIN.s5;
  g.push(person({ x: b[0], y: b[1], s: b[2], flip: true, legs: "walk", skin: bs, hair: { type: "bantu" }, top: C.ocre, sleeve: "short", bottom: C.green, bwax: "kitenge", shoes: C.white, face: "talk",
    arms: { l: [[-50, -150], [-26, -118]], r: [[52, -250], [8, -304]] } }));
  g.push(at(...b, true, band(C.indigo, "ndop")));

  // Homme qui s'hydrate, serviette sur l'épaule
  const h = [712, 556, 1.0], hs = SKIN.s3;
  g.push(person({ x: h[0], y: h[1], s: h[2], flip: true, skin: hs, hair: { type: "rase" }, top: C.white, sleeve: "short", bottom: C.indigo, bwax: "bogolan", shoes: C.white, face: "smile",
    arms: { r: [[44, -160], [40, -112]], l: [[-46, -150], [-20, -160]] } }));
  g.push(at(...h, true, `<path d="M14 -206Q30 -210 32 -190L30 -140H20L22 -190Q20 -200 10 -200Z" fill="${C.terra}"/>` +
    rect(-28, -184, 16, 44, C.sky, ' rx="4"') + rect(-28, -170, 16, 14, C.green) + rect(-24, -192, 8, 9, C.green, ' rx="1.5"') + rect(-25, -180, 3, 34, C.white, ' opacity=".6"') + hand(-20, -160, hs)));

  // Au sol : bouteilles d'eau, sac de sport, tapis
  g.push(bottle(196, 566, C.terra), bottle(218, 570, C.green), bottle(500, 562, C.ocre));
  g.push(`<path d="M540 572Q536 538 570 536H620Q652 538 648 572Z" fill="${C.indigo}"/>`, stroke("M564 538Q594 514 624 538", C.dark, 4), rect(550, 550, 90, 6, C.ocre), `<path d="M600 572Q610 556 640 560L660 574Z" fill="${C.terra}"/>`);
  g.push(`<path d="M300 532H470L486 566H284Z" fill="${C.indigo}"/><path d="M284 566H486L484 572H286Z" fill="rgba(0,0,0,.25)"/>`, stroke("M300 549H470", C.white, 2, ' opacity=".3"'));
  return frame(g.join(""), C.sky);
}

export default [
  { id: "pluie", fr: "Saison des pluies", en: "Rainy season",
    tags: ["pluie", "saison des pluies", "averse", "parapluie", "flaque", "enfants", "moto-taxi", "bâche", "bassine", "pagne", "terre rouge", "quartier", "rain", "rainy season", "shower", "umbrella", "puddle", "children", "motorbike taxi", "tarp", "basin", "red earth"], draw: pluie },
  { id: "nuit", fr: "Le marché de nuit", en: "Night market",
    tags: ["nuit", "marché de nuit", "soya", "brochettes", "grillades", "fruits", "lampe", "guirlande", "lune", "vendeuse", "clients", "ananas", "mangues", "night", "night market", "skewers", "grill", "fruit", "lamp", "string lights", "moon", "vendor", "customers"], draw: nuit },
  { id: "gym", fr: "Sport au stade", en: "Workout at the stadium",
    tags: ["sport", "stade", "séance", "coach", "sifflet", "étirements", "saut", "piste", "gradins", "bouteille d'eau", "fitness", "matin", "drapeau", "workout", "stadium", "whistle", "stretching", "jump", "track", "stands", "water bottle", "morning", "flag"], draw: gym },
];
