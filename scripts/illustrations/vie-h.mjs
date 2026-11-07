// Scènes : la veillée des contes, la danse au son des tambours, la sortie d'école.
import { C, SKIN, HAIR, person, frame, palm, cloud, stroke, f } from "./lib.mjs";
import { flag } from "./flag.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="7.5" fill="${skin}"/>`;
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");
const NDOP = "#1C2756";

/** Jambes en tailleur (repère local) : pagne ou short sur les cuisses croisées, bas à -74. person() en legs "none" par-dessus. */
const crossLegs = (skin, col, pat, shoes = null) => {
  const d = "M-74 -96Q-40 -120 0 -104Q40 -120 74 -96Q78 -78 60 -74Q20 -80 0 -88Q-20 -80 -60 -74Q-78 -78 -74 -96Z";
  return cloth("M-30 -120H30L36 -92H-36Z", col, pat) + cloth(d, col, pat) + `<path d="${d}" fill="rgba(0,0,0,.12)"/>` +
    `<ellipse cx="-22" cy="-82" rx="14" ry="7" fill="${shoes ?? skin}"/><ellipse cx="22" cy="-82" rx="14" ry="7" fill="${shoes ?? skin}"/>`;
};
/** Collier de perles (repère local). */
const beadsNeck = (cols, r = 3) => [...Array(9)].map((_, i) => { const a = Math.PI * (0.15 + 0.7 * i / 8); return `<circle cx="${f(-Math.cos(a) * 15)}" cy="${f(-206 + Math.sin(a) * 16)}" r="${r}" fill="${cols[i % cols.length]}"/>`; }).join("");

/* ---------- Scène 1 : la veillée des contes ---------- */
function conte() {
  const g = [];
  // Ciel de nuit, étoiles, lune
  g.push(`<rect width="800" height="600" rx="36" fill="${C.indigo}" opacity=".75"/>`);
  for (const [sx, sy, r] of [[60, 60, 2], [130, 120, 1.6], [210, 50, 2.4], [300, 96, 1.6], [360, 40, 2], [440, 120, 1.4], [500, 62, 2.2], [560, 150, 1.6], [740, 60, 2], [770, 160, 1.6], [250, 170, 1.4], [90, 200, 1.6], [470, 200, 1.4], [700, 220, 1.6], [400, 70, 1.4], [160, 30, 1.4]])
    g.push(`<circle cx="${sx}" cy="${sy}" r="${r}" fill="${C.white}" opacity=".9"/>`);
  for (const [sx, sy] of [[330, 150], [610, 40], [40, 140]]) g.push(stroke(`M${sx - 6} ${sy}H${sx + 6}M${sx} ${sy - 6}V${sy + 6}`, C.yellow, 2));
  g.push(`<circle cx="650" cy="110" r="70" fill="${C.white}" opacity=".07"/><circle cx="650" cy="110" r="50" fill="${C.white}" opacity=".1"/><circle cx="650" cy="110" r="38" fill="${C.cream}"/>`);
  g.push(`<circle cx="638" cy="100" r="8" fill="${C.sand}" opacity=".7"/><circle cx="662" cy="124" r="6" fill="${C.sand}" opacity=".7"/><circle cx="664" cy="96" r="4" fill="${C.sand}" opacity=".7"/>`);
  // Collines et arbres sombres
  g.push(`<path d="M0 380Q140 320 300 360Q460 310 600 350Q700 320 800 346V460H0Z" fill="${C.dark}" opacity=".55"/>`);
  g.push(`<g opacity=".7">${palm(760, 440, 1, -12).replace(new RegExp(C.leaf, "g"), C.leaf2)}</g>`);
  // Case ronde au toit de chaume, porte éclairée
  g.push(`<rect x="30" y="300" width="200" height="150" fill="${C.wood2}"/><rect x="30" y="300" width="200" height="150" fill="${C.dark}" opacity=".3"/>`);
  g.push(`<rect x="104" y="350" width="48" height="100" rx="22" fill="${C.ocre}"/><rect x="110" y="358" width="36" height="92" rx="18" fill="${C.yellow}" opacity=".7"/>`);
  g.push(`<path d="M10 314L130 170L250 314Q130 340 10 314Z" fill="${C.wood}"/><path d="M10 314L130 170L250 314Q130 340 10 314Z" fill="${C.dark}" opacity=".25"/>`);
  for (const t of [0.4, 0.7, 0.92]) { const yy = 170 + 144 * t, ww = 120 * t; g.push(stroke(`M${f(130 - ww)} ${f(yy)}Q130 ${f(yy + 16 * t)} ${f(130 + ww)} ${f(yy)}`, C.wood2, 4, ' opacity=".6"')); }
  g.push(`<path d="M130 170L124 154H136Z" fill="${C.wood2}"/>`);
  // Sol de terre, lueur du feu
  g.push(`<path d="M0 440H800V564Q800 600 764 600H36Q0 600 0 564Z" fill="${C.wood2}"/><path d="M0 520Q400 500 800 524V564Q800 600 764 600H36Q0 600 0 564Z" fill="${C.dark}" opacity=".35"/>`);
  const fx = 430, fy = 548;
  g.push(`<ellipse cx="${fx}" cy="${fy - 40}" rx="330" ry="120" fill="${C.ocre}" opacity=".08"/><ellipse cx="${fx}" cy="${fy - 20}" rx="200" ry="80" fill="${C.ocre}" opacity=".16"/><ellipse cx="${fx}" cy="${fy}" rx="90" ry="22" fill="${C.yellow}" opacity=".2"/>`);
  // Bulle du conte : Kulu la tortue et le léopard
  g.push(`<path d="M318 236Q300 280 262 300Q310 290 352 254Z" fill="${C.white}" opacity=".92"/>`);
  g.push(`<ellipse cx="420" cy="196" rx="120" ry="74" fill="${C.white}" opacity=".92"/>`);
  const tor = `<g transform="translate(370 214)"><ellipse cx="-30" cy="0" rx="11" ry="8" fill="${C.leaf}"/><circle cx="-34" cy="-3" r="1.8" fill="${C.dark}"/>` +
    stroke("M-18 6V18M18 6V18M-8 8V18M8 8V18", C.leaf, 7) + `<path d="M-26 8Q-26 -34 0 -34Q26 -34 26 8Z" fill="${C.green}"/>` +
    stroke("M-14 -22L0 -28L14 -22L14 -6L0 0L-14 -6Z", C.ocre, 2.5) + stroke("M-14 -6L-24 4M14 -6L24 4M0 0V8", C.ocre, 2.5) + `</g>`;
  const leo = `<g transform="translate(470 206)"><path d="M-30 10Q-34 -18 0 -22Q30 -24 34 -4L36 10Z" fill="${C.ocre}"/>` +
    stroke("M-24 8V26M-10 10V26M18 10V26M30 8V26", C.ocre, 7) + stroke("M-30 -6Q-46 -14 -44 -34", C.ocre, 5) +
    `<circle cx="40" cy="-14" r="14" fill="${C.ocre}"/><circle cx="34" cy="-26" r="4" fill="${C.ocre}"/><circle cx="48" cy="-26" r="4" fill="${C.ocre}"/><circle cx="44" cy="-15" r="2" fill="${C.dark}"/><ellipse cx="52" cy="-8" rx="3" ry="2" fill="${C.dark}"/>` +
    [[-18, -10], [-4, -14], [10, -12], [-12, 2], [4, 0], [20, -2], [26, -12]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="${C.wood2}"/>`).join("") + `</g>`;
  g.push(tor, leo);
  // Tabouret sculpté et grand-mère qui raconte
  const gm = { x: 196, y: 566, s: 1.04 }, gSkin = SKIN.s2;
  g.push(at(gm.x, gm.y, gm.s, false,
    `<ellipse cx="12" cy="-100" rx="50" ry="9" fill="${C.wood}"/><path d="M-30 -96H54L44 -60L56 -8H-32L-20 -60Z" fill="${C.wood2}"/><ellipse cx="12" cy="-6" rx="46" ry="8" fill="${C.wood2}"/>` +
    [-14, 6, 26].map((x, i) => `<path d="M${x} -86L${x + 10} -52L${x} -18Z" fill="${i % 2 ? C.terra : C.ocre}"/>`).join("") +
    stroke("M-26 -66H50", C.ocre, 3) + `<ellipse cx="12" cy="-102" rx="50" ry="7" fill="${C.ocre}" opacity=".4"/>`));
  g.push(person({ ...gm, skin: gSkin, legs: "sit", robe: "kaba", top: C.terra, wax: "wax1", hair: { type: "foulard", color: C.ocre, wax: "wax2" }, face: "talk",
    arms: { r: [[58, -176], [84, -214]], l: [[-44, -152], [-40, -116]] },
    lhand: (hx, hy) => stroke(`M${hx - 2} ${hy - 40}L${hx - 8} 0`, C.wood, 6) + `<circle cx="${hx - 2}" cy="${hy - 42}" r="6" fill="${C.wood2}"/>` + hand(hx, hy, gSkin) }));
  g.push(at(gm.x, gm.y, gm.s, false, beadsNeck([C.white, C.ocre, C.terra])));
  // Doigts écartés de la main qui raconte
  g.push(at(gm.x, gm.y, gm.s, false, stroke("M84 -214L88 -228M84 -214L96 -222M84 -214L80 -228", gSkin, 4)));
  // Le feu : bûches, flammes, étincelles
  g.push(stroke(`M${fx - 56} ${fy}L${fx + 44} ${fy - 20}M${fx - 44} ${fy - 20}L${fx + 56} ${fy}`, C.wood, 11));
  for (const k of [-52, -26, 0, 26, 52]) g.push(`<ellipse cx="${fx + k}" cy="${fy + 6}" rx="14" ry="9" fill="${C.grey}"/>`);
  g.push(`<path d="M${fx - 32} ${fy - 10}Q${fx - 40} ${fy - 50} ${fx - 16} ${fy - 70}Q${fx - 10} ${fy - 46} ${fx} ${fy - 60}Q${fx + 10} ${fy - 88} ${fx + 4} ${fy - 104}Q${fx + 38} ${fy - 70} ${fx + 32} ${fy - 10}Z" fill="${C.terra}"/>`);
  g.push(`<path d="M${fx - 22} ${fy - 10}Q${fx - 26} ${fy - 40} ${fx - 8} ${fy - 54}Q${fx - 4} ${fy - 36} ${fx + 4} ${fy - 46}Q${fx + 22} ${fy - 30} ${fx + 22} ${fy - 10}Z" fill="${C.ocre}"/><path d="M${fx - 10} ${fy - 10}Q${fx - 10} ${fy - 30} ${fx + 2} ${fy - 36}Q${fx + 12} ${fy - 24} ${fx + 10} ${fy - 10}Z" fill="${C.yellow}"/>`);
  for (const [dx, dy, r] of [[-20, -124, 2.6], [14, -140, 2], [30, -116, 2.4], [-6, -160, 1.8]]) g.push(`<circle cx="${fx + dx}" cy="${fy + dy}" r="${r}" fill="${C.yellow}"/>`);
  // Les enfants, assis en tailleur, tournés vers la conteuse
  const kids = [
    { x: 652, g: 532, s: 0.64, skin: SKIN.s4, hair: { type: "bantu" }, top: C.green, wax: "wax3", col: C.indigo, pat: "wax1", face: "smile",
      arms: { l: [[-40, -146], [-14, -122]], r: [[40, -146], [14, -122]] } },
    { x: 560, g: 556, s: 0.68, skin: SKIN.s1, hair: { type: "short" }, top: C.ocre, dashiki: C.terra, col: C.indigo, pat: null, face: "laugh",
      arms: { l: [[-42, -148], [-30, -112]], r: [[46, -174], [40, -214]] } },
    { x: 724, g: 552, s: 0.64, skin: SKIN.s3, hair: { type: "puffs" }, top: C.terra, wax: "wax2", col: C.ocre, pat: "kente", face: "calm",
      arms: { l: [[-40, -150], [-4, -168]], r: [[40, -150], [6, -176]] } },
    { x: 336, g: 572, s: 0.62, skin: SKIN.s5, hair: { type: "nattes" }, top: C.indigo, wax: "kitenge", col: C.green, pat: "kitenge", face: "laugh",
      arms: { l: [[-38, -148], [-20, -110]], r: [[38, -148], [20, -110]] } },
  ];
  for (const k of kids) {
    const y = k.g + 74 * k.s;
    g.push(at(k.x, y, k.s, true, crossLegs(k.skin, k.col, k.pat)));
    g.push(person({ x: k.x, y, s: k.s, flip: k.x > fx, skin: k.skin, legs: "none", hair: k.hair, top: k.top, wax: k.wax, dashiki: k.dashiki, sleeve: "short", face: k.face, arms: k.arms }));
  }
  return frame(g.join(""), C.dark);
}

/* ---------- Scène 2 : la danse au son des tambours ---------- */
function danse() {
  const g = [];
  g.push(`<circle cx="660" cy="96" r="46" fill="${C.ocre}" opacity=".55"/>`, cloud(90, 90, 0.9), cloud(420, 60, 0.7));
  g.push(`<path d="M0 330Q160 280 340 312Q520 270 800 318V420H0Z" fill="${C.leaf}" opacity=".35"/>`);
  g.push(palm(40, 400, 1.05, 14), palm(770, 396, 0.95, -14));
  // Fanions tendus au-dessus de la place
  g.push(stroke("M70 150Q400 230 740 150", C.dark, 2));
  for (let i = 0; i < 13; i++) {
    const t = (i + 0.5) / 13, x = 70 + 670 * t, y = 150 + 80 * 4 * t * (1 - t) * 0.5 + 2;
    g.push(`<path d="M${f(x - 12)} ${f(y - 2)}L${f(x + 12)} ${f(y - 2)}L${f(x)} ${f(y + 24)}Z" fill="${[C.terra, C.ocre, C.green, C.indigo][i % 4]}"/>`);
  }
  // Place de terre rouge
  g.push(`<rect y="410" width="800" height="190" fill="${C.rose}"/><path d="M0 410H800V430Q400 446 0 430Z" fill="${C.terra}" opacity=".3"/>`);
  // Spectateurs au fond, qui tapent dans les mains
  const clap = { l: [[-40, -160], [-6, -184]], r: [[40, -160], [6, -190]] };
  const spec = [
    { x: 166, skin: SKIN.s3, hair: { type: "gele", color: C.green, wax: "wax3" }, robe: "kaba", top: C.ocre, wax: "wax1", face: "laugh" },
    { x: 506, skin: SKIN.s1, hair: { type: "short" }, top: C.white, dashiki: C.indigo, bottom: C.dark, hat: { type: "kufi", color: C.terra }, face: "smile" },
    { x: 646, skin: SKIN.s2, hair: { type: "rase" }, robe: "boubou", top: C.sand, wax: "wax3", beard: true, face: "smile" },
  ];
  for (const p of spec) g.push(person({ y: 430, s: 0.6, arms: clap, ...p }));
  // Poussière rouge soulevée par les pas
  const dust = (x, y, w) => `<g fill="${C.terra}" opacity=".2"><ellipse cx="${x}" cy="${y}" rx="${w}" ry="${f(w * 0.28)}"/><circle cx="${f(x - w * 0.6)}" cy="${y - 12}" r="${f(w * 0.22)}"/><circle cx="${f(x + w * 0.5)}" cy="${y - 16}" r="${f(w * 0.18)}"/></g>`;
  g.push(dust(300, 566, 70), dust(430, 576, 80), dust(560, 566, 66));
  // Danseuse en gele, chasse-mouches levé
  const d1 = { x: 262, y: 566, s: 1.0 }, s1 = SKIN.s4;
  g.push(person({ ...d1, skin: s1, hair: { type: "gele", color: C.ocre, wax: "kente" }, top: C.terra, wax: "wax2", sleeve: "short", bottom: C.indigo, bwax: "wax1", legs: "walkskirt", face: "laugh",
    arms: { l: [[-58, -214], [-66, -256]], r: [[50, -160], [32, -124]] },
    lhand: (hx, hy) => stroke(`M${hx} ${hy}L${hx - 10} ${hy - 34}`, C.wood2, 5) + `<path d="M${hx - 8} ${hy - 32}Q${hx - 20} ${hy - 72} ${hx - 48} ${hy - 76}Q${hx - 30} ${hy - 60} ${hx - 34} ${hy - 38}Q${hx - 22} ${hy - 52} ${hx - 12} ${hy - 30}Z" fill="${C.white}"/>` + hand(hx, hy, s1) }));
  g.push(at(d1.x, d1.y, d1.s, false, beadsNeck([C.ocre, C.white, C.red]) + stroke("M-36 -30L-22 -26M12 -24L26 -26", C.white, 4, ' stroke-dasharray="1 5"')));
  // Danseur en toghu et bonnet de notable, au centre
  const d2 = { x: 420, y: 578, s: 1.06 }, s2 = SKIN.s2;
  g.push(person({ ...d2, skin: s2, top: C.dark, wax: "toghu", bottom: C.dark, bwax: "toghu", legs: "walk", beard: true, face: "laugh",
    hat: { type: "ashetu", color: C.red, color2: C.yellow },
    arms: { l: [[-66, -190], [-86, -228]], r: [[60, -160], [80, -126]] },
    rhand: (hx, hy) => `<path d="M${hx - 4} ${hy - 8}L${hx + 26} ${hy - 22}L${hx + 30} ${hy - 12}L${hx} ${hy + 4}Z" fill="${C.ocre}"/>` + stroke(`M${hx + 26} ${hy - 22}L${hx + 34} ${hy - 6}`, C.wood2, 3) + hand(hx, hy, s2) }));
  g.push(at(d2.x, d2.y, d2.s, false, beadsNeck([C.ocre, C.red, C.white], 3.4)));
  // Danseuse en ndop, tresses perlées
  const d3 = { x: 574, y: 566, s: 1.0 }, s3 = SKIN.s3;
  g.push(person({ ...d3, flip: true, skin: s3, hair: { type: "fulani", beads: C.ocre }, top: NDOP, wax: "ndop", sleeve: "short", bottom: NDOP, bwax: "ndop", legs: "walkskirt", face: "smile",
    arms: { r: [[42, -150], [24, -120]], l: [[-58, -218], [-58, -264]] } }));
  g.push(at(d3.x, d3.y, d3.s, true, beadsNeck([C.white, C.terra]) + `<path d="M-34 -120H34L36 -102H-36Z" fill="${C.ocre}"/>` + stroke([...Array(9)].map((_, i) => `M${-32 + i * 8} -104L${f(-34 + i * 8.4)} -74`).join(""), C.ocre, 3)));
  // Joueur de tambour, assis à gauche
  const dr = { x: 74, y: 572, s: 0.98 }, sd = SKIN.s5;
  g.push(at(dr.x, dr.y, dr.s, false, `<rect x="-34" y="-102" width="70" height="10" rx="4" fill="${C.wood2}"/>` + stroke("M-28 -94L-32 0M30 -94L34 0", C.wood2, 7)));
  g.push(person({ ...dr, skin: sd, legs: "sit", top: C.green, wax: "kitenge", sleeve: "short", bottom: C.indigo, hat: { type: "kufi", color: C.ocre, wax: "wax3" }, face: "laugh",
    arms: { l: [[8, -150], [70, -150]], r: [[66, -170], [104, -158]] } }));
  g.push(at(dr.x, dr.y, dr.s, false,
    `<path d="M56 -150H124L108 -70L118 0H62L72 -70Z" fill="${C.wood}"/><path d="M72 -70H108L118 0H62Z" fill="${C.wood2}"/>` +
    [0, 1, 2].map((i) => `<path d="M${72 + i * 12} -70L${78 + i * 12} -30L${84 + i * 12} -70Z" fill="${C.wood}"/>`).join("") +
    stroke("M60 -126L120 -126", C.terra, 6) + stroke("M60 -126L74 -150M76 -126L90 -150M92 -126L106 -150M108 -126L120 -150", C.sand, 2.5) +
    `<ellipse cx="90" cy="-150" rx="34" ry="8" fill="${C.sand}"/>` + hand(70, -152, sd) + hand(104, -160, sd)));
  // Joueur de balafon, assis derrière son instrument, à droite
  const bp = { x: 678, y: 566, s: 0.9 }, sb = SKIN.s1;
  g.push(person({ ...bp, skin: sb, legs: "sit", robe: "boubou", top: C.indigo, wax: "wax1", hair: { type: "locks" }, face: "calm",
    arms: { l: [[-52, -150], [-34, -122]], r: [[52, -150], [40, -126]] } }));
  const mallet = (hx, hy, k) => stroke(`M${hx} ${hy}L${hx + k * 10} ${hy + 22}`, C.wood2, 3.5) + `<circle cx="${hx + k * 11}" cy="${hy + 25}" r="5" fill="${C.dark}"/>`;
  g.push(at(bp.x, bp.y, bp.s, false,
    stroke("M-58 -104L-54 0M76 -104L72 0", C.wood2, 6) + stroke("M-64 -104H82", C.wood2, 5) +
    [...Array(6)].map((_, i) => `<ellipse cx="${-42 + i * 22}" cy="${-78 + Math.abs(i - 2.5) * 3}" rx="${10 - Math.abs(i - 2.5)}" ry="${14 - Math.abs(i - 2.5) * 1.4}" fill="${C.ocre}"/>`).join("") +
    [...Array(8)].map((_, i) => `<rect x="${-62 + i * 18}" y="-112" width="14" height="${22 - i}" rx="3" fill="${i % 2 ? C.wood : C.wood2}"/>`).join("") +
    mallet(-34, -122, 1) + hand(-34, -122, sb) + mallet(40, -126, -1) + hand(40, -126, sb)));
  // Notes de musique qui s'échappent
  for (const [nx, ny] of [[170, 250], [198, 222], [700, 250]]) g.push(`<ellipse cx="${nx}" cy="${ny}" rx="7" ry="5.5" fill="${C.indigo}"/>`, stroke(`M${nx + 6} ${ny}V${ny - 30}L${nx + 18} ${ny - 24}`, C.indigo, 3));
  return frame(g.join(""), "#F4E4CC");
}

/* ---------- Scène 3 : la sortie d'école ---------- */
function ecole() {
  const g = [];
  g.push(cloud(80, 70, 0.8), cloud(600, 50, 0.9));
  // Drapeau du pays (suit l'ambiance sur le site), le mât part de derrière le toit
  g.push(stroke("M690 190V40", C.grey, 4), flag(692, 44, 66));
  // Bâtiment de l'école, toit de tôle, volets bleus
  g.push(`<rect x="150" y="196" width="600" height="230" fill="${C.cream}"/><rect x="150" y="336" width="600" height="90" fill="${C.ocre}"/><rect x="150" y="330" width="600" height="8" fill="${C.terra}"/>`);
  g.push(`<path d="M130 204L180 150H720L770 204Z" fill="${C.steel}"/>`);
  for (let k = 0; k < 24; k++) g.push(stroke(`M${f(180 + k * 23.5)} 152L${f(134 + k * 27)} 202`, C.grey, 2, ' opacity=".5"'));
  for (const wx of [190, 520, 640]) {
    g.push(`<rect x="${wx}" y="236" width="70" height="70" fill="${C.wood2}"/><rect x="${wx - 16}" y="236" width="16" height="70" fill="${C.blue}"/><rect x="${wx + 70}" y="236" width="16" height="70" fill="${C.blue}"/>`);
    for (let yy = 242; yy < 302; yy += 8) g.push(stroke(`M${wx - 14} ${yy}H${wx - 2}M${wx + 72} ${yy}H${wx + 84}`, C.indigo, 2, ' opacity=".5"'));
  }
  // Fresque peinte sur le mur : un alphabet et une carte
  g.push(`<rect x="300" y="226" width="180" height="86" rx="6" fill="${C.green}"/>`);
  for (const [i, c] of [C.yellow, C.white, C.rose, C.yellow, C.white].entries()) g.push(`<circle cx="${324 + i * 33}" cy="250" r="10" fill="${c}"/>`);
  g.push(stroke("M318 282H462M318 298H420", C.white, 4, ' opacity=".7"'));
  // Manguier à gauche
  g.push(stroke("M70 450Q66 380 72 300", C.wood2, 22), stroke("M72 330Q40 300 20 290M72 320Q110 290 136 282", C.wood2, 10));
  for (const [cx, cy, rx, ry, c] of [[30, 250, 80, 60, C.leaf2], [120, 240, 80, 58, C.leaf2], [70, 196, 90, 60, C.leaf], [140, 280, 50, 30, C.leaf], [10, 290, 50, 30, C.leaf]]) g.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${c}"/>`);
  for (const [mx, my] of [[40, 290], [120, 296], [90, 230]]) g.push(`<ellipse cx="${mx}" cy="${my}" rx="6" ry="9" fill="${C.yellow}"/>`);
  // Mur d'enceinte et portail ouvert
  g.push(`<rect x="0" y="380" width="800" height="80" fill="${C.sand}"/><rect x="0" y="372" width="800" height="10" fill="${C.terra}"/>`);
  for (let bx = 20; bx < 800; bx += 60) g.push(`<rect x="${bx}" y="398" width="34" height="14" rx="3" fill="${C.sand2}"/>`);
  g.push(`<rect x="330" y="372" width="160" height="88" fill="${C.sand2}"/><rect x="330" y="420" width="160" height="40" fill="${C.wood}" opacity=".25"/>`);
  g.push(`<rect x="362" y="336" width="96" height="90" fill="${C.wood2}"/><rect x="368" y="342" width="84" height="84" fill="${C.indigo}"/><rect x="408" y="342" width="4" height="84" fill="${C.wood2}"/>`);
  for (const px of [312, 490]) g.push(`<rect x="${px}" y="348" width="18" height="112" fill="${C.terra}"/><rect x="${px - 3}" y="340" width="24" height="12" fill="${C.ocre}"/><circle cx="${px + 9}" cy="332" r="9" fill="${C.ocre}"/>`);
  // Battants du portail, ouverts vers l'extérieur
  for (const [x0, x1] of [[330, 286], [490, 534]]) {
    g.push(`<path d="M${x0} 376L${x1} 386V466L${x0} 456Z" fill="${C.green}"/>`);
    for (let t = 0.2; t < 1; t += 0.2) { const xx = x0 + (x1 - x0) * t; g.push(stroke(`M${f(xx)} ${f(378 + 10 * t)}V${f(458 + 10 * t)}`, C.leaf2, 3)); }
  }
  // Rue de terre rouge
  g.push(`<rect y="460" width="800" height="140" fill="${C.rose}"/><path d="M0 468H800V476Q400 486 0 476Z" fill="${C.wood}" opacity=".2"/>`);
  // Vendeuse d'arachides et de bonbons, sous un parasol
  g.push(stroke("M136 200L136 470", C.wood2, 4), `<path d="M46 236Q136 150 226 236Z" fill="${C.terra}"/><path d="M136 184L92 236H116Z" fill="${C.ocre}"/><path d="M136 184L156 236H180Z" fill="${C.ocre}"/>`);
  const vd = { x: 58, y: 520, s: 0.92 }, sv = SKIN.s2;
  g.push(at(vd.x, vd.y, vd.s, false, `<rect x="-32" y="-102" width="68" height="10" rx="4" fill="${C.wood}"/>` + stroke("M-26 -94L-30 0M30 -94L34 0", C.wood2, 7)));
  g.push(person({ ...vd, skin: sv, legs: "sit", robe: "dress", top: C.indigo, wax: "wax3", hair: { type: "foulard", color: C.terra, wax: "wax1" }, face: "smile",
    arms: { l: [[-30, -150], [20, -134]], r: [[50, -160], [58, -196]] },
    rhand: (hx, hy) => `<path d="M${hx - 6} ${hy - 2}L${hx + 2} ${hy - 22}H${hx + 10}L${hx + 14} ${hy - 2}Z" fill="${C.white}" opacity=".85"/><circle cx="${hx + 4}" cy="${hy - 8}" r="3" fill="${C.wood}"/><circle cx="${hx + 9}" cy="${hy - 12}" r="3" fill="${C.wood}"/>` + hand(hx, hy, sv) }));
  // Table : bocaux de bonbons et cornets d'arachides
  g.push(`<rect x="146" y="438" width="104" height="10" rx="3" fill="${C.wood}"/>`, stroke("M154 448L150 520M242 448L246 520", C.wood2, 5));
  g.push(`<rect x="156" y="406" width="26" height="32" rx="4" fill="${C.white}" opacity=".85"/><rect x="158" y="402" width="22" height="6" rx="2" fill="${C.terra}"/>`);
  for (const [bx, by, c] of [[163, 430, C.red], [173, 428, C.yellow], [166, 420, C.green], [175, 416, C.blue], [162, 412, C.ocre]]) g.push(`<circle cx="${bx}" cy="${by}" r="3.6" fill="${c}"/>`);
  g.push(`<path d="M188 438L192 400H210L214 438Z" fill="${C.white}" opacity=".85"/><path d="M193 438L195 412H207L209 438Z" fill="${C.wood}"/>`);
  g.push(`<ellipse cx="232" cy="432" rx="18" ry="6" fill="${C.wood2}"/><path d="M216 430Q232 414 248 430Z" fill="${C.sand2}"/>`);
  for (const [px, py] of [[224, 426], [232, 422], [240, 426], [228, 418], [236, 418]]) g.push(`<ellipse cx="${px}" cy="${py}" rx="3" ry="2.2" fill="${C.wood}"/>`);
  // Sac à dos (repère local) : le corps du sac derrière, les bretelles devant
  const bagBack = (col) => `<rect x="-40" y="-204" width="80" height="96" rx="12" fill="${col}"/><rect x="-40" y="-204" width="80" height="96" rx="12" fill="rgba(0,0,0,.15)"/>`;
  const bagStraps = (col) => stroke("M-20 -204Q-26 -170 -24 -130M20 -204Q26 -170 24 -130", col, 7);
  // Papa en boubou et kufi, qui tient la main de son fils
  const pa = { x: 296, y: 572, s: 1.04 }, sp = SKIN.s1;
  g.push(person({ ...pa, skin: sp, robe: "boubou", top: C.white, wax: "wax3", beard: true, hat: { type: "kufi", color: C.indigo, wax: "wax2" }, face: "smile",
    arms: { l: [[-40, -150], [-36, -110]], r: [[48, -150], [58, -110]] } }));
  // Le fils, uniforme kaki, sac rouge
  const k1 = { x: 378, y: 574, s: 0.7 }, sk1 = SKIN.s3;
  g.push(at(k1.x, k1.y, k1.s, true, bagBack(C.terra)));
  g.push(person({ ...k1, flip: true, skin: sk1, hair: { type: "short" }, top: C.sand2, sleeve: "short", bottom: C.wood, legs: "walk", face: "talk",
    arms: { l: [[-40, -150], [-30, -110]], r: [[44, -156], [70, -170]] } }));
  g.push(at(k1.x, k1.y, k1.s, true, bagStraps(C.terra) + stroke("M-8 -196H8", C.wood, 3)));
  g.push(hand(pa.x + 58 * pa.s, pa.y - 110 * pa.s, sp));
  // Une écolière qui fait au revoir, encore au portail
  const k3 = { x: 432, y: 470, s: 0.58 }, sk3 = SKIN.s5;
  g.push(at(k3.x, k3.y, k3.s, false, bagBack(C.green)));
  g.push(person({ ...k3, skin: sk3, hair: { type: "puffs" }, robe: "dress", top: C.blue, sleeve: "short", legs: "skirt", face: "laugh",
    arms: { l: [[-40, -150], [-32, -110]], r: [[54, -200], [62, -246]] } }));
  g.push(at(k3.x, k3.y, k3.s, false, bagStraps(C.green)));
  // Maman en kaba et gele, bras ouverts
  const ma = { x: 680, y: 568, s: 1.04 }, sm = SKIN.s4;
  g.push(person({ ...ma, flip: true, skin: sm, robe: "kaba", top: C.ocre, wax: "wax1", hair: { type: "gele", color: C.terra, wax: "wax2" }, face: "laugh",
    arms: { r: [[62, -184], [94, -206]], l: [[-50, -170], [-74, -196]] } }));
  // L'écolière qui court vers sa maman : robe bleue, tresses, sac jaune
  const k2 = { x: 556, y: 580, s: 0.72 }, sk2 = SKIN.s2;
  g.push(at(k2.x, k2.y, k2.s, false, bagBack(C.ocre)));
  g.push(person({ ...k2, skin: sk2, hair: { type: "boxbraids", beads: C.white }, robe: "dress", top: C.blue, sleeve: "short", legs: "walkskirt", face: "laugh",
    arms: { l: [[-50, -170], [-70, -200]], r: [[50, -170], [72, -204]] } }));
  g.push(at(k2.x, k2.y, k2.s, false, bagStraps(C.ocre)));
  return frame(g.join(""), "#DCEAF1");
}

export default [
  { id: "conte", fr: "Veillée et contes", en: "Storytelling evening",
    tags: ["conte", "veillée", "grand-mère", "enfants", "feu", "nuit", "lune", "étoiles", "case", "tabouret sculpté", "tortue", "transmission", "storytelling", "tale", "grandmother", "children", "fire", "night", "moon", "stars", "hut", "carved stool", "tortoise"], draw: conte },
  { id: "danse", fr: "Danse au son des tambours", en: "Dancing to the drums",
    tags: ["danse", "tambour", "balafon", "musique", "ndop", "toghu", "perles", "pagne", "gele", "fête", "spectateurs", "terre rouge", "tradition", "dance", "drums", "music", "beads", "celebration", "audience", "Cameroun", "Cameroon"], draw: danse },
  { id: "ecole", fr: "Sortie d'école", en: "School's out",
    tags: ["école", "sortie", "enfants", "uniforme", "écoliers", "sac à dos", "portail", "parents", "maman", "papa", "kaba", "boubou", "vendeuse", "arachides", "bonbons", "school", "children", "uniform", "backpack", "gate", "parents", "peanuts", "sweets"], draw: ecole },
];
