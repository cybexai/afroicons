// Scènes : la réunion de tontine, les beignets-haricots du matin, le poisson braisé le soir.
import { C, SKIN, person, frame, stroke, f } from "./lib.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="7.5" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
/** Aplat avec un motif par-dessus. */
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");
/** Chaise en plastique vue de 3/4 (repère d'un personnage assis : assise à -100, genoux vers +x). */
const chair = (x, y, s, col, flip = false) => at(x, y, s, flip, `<path d="M-34 -100L-30 -196Q0 -206 30 -196L34 -100Z" fill="${col}"/><rect x="-22" y="-182" width="44" height="12" rx="6" fill="rgba(0,0,0,.12)"/><path d="M-38 -104H72L66 -92H-34Z" fill="${col}"/>` + stroke("M-32 -96L-40 0M66 -96L74 0M-10 -96L-6 -6M50 -96L46 -6", col, 7) + `<path d="M-38 -104H72L66 -92H-34Z" fill="rgba(0,0,0,.12)"/>`);
/** Petits traits d'applaudissement autour d'un point. */
const clap = (x, y, col = C.terra) => stroke(`M${x - 40} ${y - 14}L${x - 52} ${y - 22}M${x - 42} ${y}H${x - 56}M${x + 40} ${y - 14}L${x + 52} ${y - 22}M${x + 42} ${y}H${x + 56}`, col, 3.5);
/** Lunettes (repère local d'un personnage de face). */
const glasses = `<g fill="none" stroke="${C.dark}" stroke-width="1.8"><circle cx="-8" cy="-237" r="5.6"/><circle cx="8" cy="-237" r="5.6"/><path d="M-2.4 -237H2.4M-13.6 -238L-20 -240M13.6 -238L20 -240"/></g>`;
/** Enveloppe kraft. */
const env = (x, y, r = 0, s = 1) => `<g transform="translate(${f(x)} ${f(y)}) rotate(${r}) scale(${s})"><rect x="-16" y="-10" width="32" height="20" rx="2" fill="${C.sand2}"/><path d="M-16 -10L0 2L16 -10" fill="none" stroke="${C.wood}" stroke-width="1.6"/></g>`;

/* ---------- Scène 1 : la réunion de tontine (njangi) ---------- */
function tontine() {
  const g = [];
  // Salon : mur, plinthe, carrelage
  g.push(rect(0, 0, 800, 400, "#EFE3CF"), rect(0, 392, 800, 10, C.wood2), rect(0, 400, 800, 200, C.sand));
  for (let k = 0; k < 9; k++) g.push(stroke(`M${-200 + k * 150} 600L${100 + k * 100} 402`, C.sand2, 2.5));
  for (const yy of [440, 492, 556]) g.push(stroke(`M0 ${yy}H800`, C.sand2, 2.5));
  // Fenêtre aux rideaux en wax
  g.push(rect(300, 56, 200, 150, C.white, ' rx="4"'), rect(308, 64, 184, 134, "#CFE0E6"), rect(397, 64, 6, 134, C.white), rect(308, 128, 184, 5, C.white));
  g.push(`<path d="M352 150Q370 120 390 150Z" fill="${C.leaf}" opacity=".6"/><path d="M410 160Q440 110 470 160Z" fill="${C.leaf2}" opacity=".5"/>`);
  g.push(rect(284, 44, 232, 8, C.wood2, ' rx="4"'));
  g.push(cloth("M290 48H338Q330 120 344 214H290Z", C.green, "wax1"), cloth("M510 48H462Q470 120 456 214H510Z", C.green, "wax1"));
  // Portrait encadré, horloge, masque
  g.push(rect(90, 80, 92, 110, C.wood2, ' rx="3"'), rect(98, 88, 76, 94, C.cream));
  g.push(`<circle cx="136" cy="122" r="14" fill="${SKIN.s3}"/><path d="M112 182Q114 146 136 144Q158 146 160 182Z" fill="${C.indigo}"/><path d="M122 116Q120 98 136 98Q152 98 150 116Q144 106 136 108Q128 106 122 116Z" fill="${C.dark}"/>`);
  g.push(`<circle cx="730" cy="110" r="30" fill="${C.wood2}"/><circle cx="730" cy="110" r="24" fill="${C.white}"/>` + stroke("M730 110V94M730 110L742 116", C.dark, 3));
  g.push(`<g transform="translate(-480 0)">` + `<path d="M720 70Q744 70 744 104Q744 150 720 162Q696 150 696 104Q696 70 720 70Z" fill="${C.wood}"/><ellipse cx="711" cy="104" rx="6" ry="3" fill="${C.wood2}"/><ellipse cx="729" cy="104" rx="6" ry="3" fill="${C.wood2}"/>` + stroke("M720 112V130M712 142H728", C.wood2, 3) + stroke("M706 82Q720 74 734 82", C.ocre, 3) + `</g>`);
  // Membres du fond, assis en cercle
  const back1 = { x: 152, y: 446, s: 0.7 }, back2 = { x: 574, y: 446, s: 0.7 };
  g.push(chair(back1.x, back1.y, back1.s, C.red), chair(back2.x, back2.y, back2.s, C.red, true));
  const clapArms = { l: [[-36, -144], [-6, -164]], r: [[36, -144], [8, -168]] };
  g.push(person({ ...back1, legs: "sit", skin: SKIN.s4, hair: { type: "short", color: "#5B5550" }, beard: true, top: "#1C2756", wax: "ndop", robe: "boubou",
    hat: { type: "kufi", color: "#1C2756", wax: "ndop" }, face: "laugh", arms: clapArms }));
  g.push(person({ ...back2, flip: true, legs: "sit", skin: SKIN.s2, hair: { type: "bantu" }, top: C.ocre, wax: "wax3", bottom: C.indigo, bwax: "wax1", face: "laugh", arms: clapArms }));
  g.push(at(back1.x, back1.y, back1.s, false, clap(1, -166)), at(back2.x, back2.y, back2.s, true, clap(1, -166)));
  // La trésorière, derrière la table
  const tx = 400, ty = 500, ts = 0.92;
  g.push(person({ x: tx, y: ty, s: ts, legs: "none", skin: SKIN.s1, hair: { type: "foulard", color: C.terra, wax: "wax2" }, robe: "kaba", top: C.terra, wax: "wax2", face: "talk",
    arms: { l: [[-52, -150], [-86, -112]], r: [[44, -136], [40, -108]] } }));
  g.push(at(tx, ty, ts, false, glasses));
  // Table et nappe
  g.push(`<path d="M286 406H514L522 470H278Z" fill="${C.cream}"/>`, cloth("M278 470H522L516 512H284Z", C.indigo, "wax1"));
  g.push(stroke("M292 512L286 590M508 512L514 590", C.wood2, 8));
  // Cahier ouvert, stylo, caisse, pile d'enveloppes
  g.push(`<path d="M380 412L420 410L432 438L388 442Z" fill="${C.white}"/><path d="M420 410L462 414L466 440L432 438Z" fill="${C.white}"/>` + stroke("M420 410L432 438", C.sand2, 1.5));
  for (const k of [0, 1, 2, 3]) g.push(stroke(`M${385 + k * 1.4} ${419 + k * 5.5}L${421 + k * 2.6} ${417 + k * 5.5}M${428 + k * 0.8} ${418 + k * 5.5}L${459 + k} ${420 + k * 5.5}`, C.blue, 1.2, ' opacity=".7"'));
  g.push(stroke("M436 428L452 404", C.indigo, 3), at(tx, ty, ts, false, hand(40, -108, SKIN.s1)));
  g.push(`<path d="M470 384H508V418H470Z" fill="${C.green}"/><path d="M466 378H512V390H466Z" fill="${C.green}"/><path d="M466 378H512V390H466Z" fill="rgba(0,0,0,.18)"/><rect x="484" y="394" width="10" height="7" rx="2" fill="${C.ocre}"/>`);
  for (let k = 0; k < 5; k++) g.push(env(488 + (k % 2) * 3, 440 - k * 5, k % 2 ? 4 : -3, 0.9));
  // Les billets dépassent de la caisse
  g.push(`<rect x="474" y="370" width="16" height="12" fill="${C.leaf}"/><rect x="490" y="372" width="16" height="10" fill="${C.ocre}" opacity=".8"/>`, rect(466, 378, 46, 12, C.green));
  // Le membre qui remet son enveloppe
  const gx = 232, gy = 576, gs = 1.06;
  g.push(person({ x: gx, y: gy, s: gs, skin: SKIN.s3, hair: { type: "short" }, top: C.indigo, dashiki: C.ocre, bottom: C.indigo, bwax: "wax2", face: "smile",
    arms: { l: [[-40, -150], [-36, -110]], r: [[62, -170], [96, -186]] },
    rhand: (hx, hy) => `<g transform="translate(${hx + 12} ${hy - 2}) rotate(-8)"><rect x="-20" y="-12" width="40" height="24" rx="2" fill="${C.sand2}"/><path d="M-20 -12L0 2L20 -12" fill="none" stroke="${C.wood}" stroke-width="2"/></g>` + hand(hx, hy, SKIN.s3) }));
  // Main de la trésorière qui reçoit
  g.push(at(tx, ty, ts, false, hand(-86, -112, SKIN.s1)));
  // Membre de devant, assise, qui applaudit (box braids, kaba)
  const fx = 654, fy = 582, fs = 0.98;
  g.push(chair(fx, fy, fs, C.white, true));
  g.push(person({ x: fx, y: fy, s: fs, flip: true, legs: "sit", skin: SKIN.s5, hair: { type: "boxbraids", beads: C.ocre }, robe: "kaba", top: C.green, wax: "kitenge", face: "laugh", arms: clapArms }));
  g.push(at(fx, fy, fs, true, clap(1, -166)));
  // Le voisin, assis à gauche, applaudit aussi
  const lx = 56, ly = 590, ls = 0.94;
  g.push(chair(lx, ly, ls, C.white));
  g.push(person({ x: lx, y: ly, s: ls, legs: "sit", skin: SKIN.s2, hair: { type: "gele", color: C.ocre, wax: "kente" }, top: C.ocre, wax: "kente", bottom: C.terra, bwax: "wax3", face: "laugh", arms: clapArms }));
  g.push(at(lx, ly, ls, false, clap(1, -166)));
  // Bulle : l'enveloppe et les pièces
  g.push(`<circle cx="620" cy="150" r="44" fill="${C.ocre}" opacity=".2"/><circle cx="620" cy="150" r="32" fill="${C.ocre}"/>`, env(614, 148, -8, 1.1), `<circle cx="634" cy="162" r="8" fill="${C.yellow}"/><circle cx="634" cy="162" r="4.5" fill="none" stroke="${C.wood}" stroke-width="1.6"/>`);
  return frame(g.join(""), "#EFE3CF");
}

/* ---------- Scène 2 : beignets-haricots du matin ---------- */
function beignets() {
  const g = [];
  // Ciel du matin, soleil levant
  g.push(`<circle cx="660" cy="96" r="58" fill="${C.white}" opacity=".55"/><circle cx="660" cy="96" r="38" fill="${C.yellow}"/>`);
  // Façades du quartier
  const shops = [[0, 150, C.ocre, C.terra], [150, 120, C.leaf, C.green], [300, 170, C.rose, C.indigo], [470, 130, C.sand2, C.terra], [600, 200, C.blue, C.ocre]];
  for (const [sx, h, wall, door] of shops) {
    g.push(rect(sx, 330 - h - 40, 150 + 20, h + 40, wall), rect(sx - 6, 330 - h - 48, 180, 10, C.wood2));
    g.push(rect(sx + 18, 330 - h + 10, 40, 36, C.cream, ' rx="3"'), rect(sx + 18, 330 - h + 10, 40, 36, "rgba(0,0,0,.08)", ' rx="3"'));
    g.push(rect(sx + 90, 250, 46, 80, door), rect(sx + 86, 244, 54, 8, "rgba(0,0,0,.2)"));
  }
  // Route, moto-taxi au loin, trottoir en terre rouge
  g.push(rect(0, 330, 800, 76, "#6E6B68"), rect(0, 326, 800, 8, C.sand2));
  for (let k = 0; k < 8; k++) g.push(rect(20 + k * 110, 366, 52, 5, C.white, ' opacity=".7"'));
  const mx = 560, my = 396, ms = 0.5;
  g.push(at(mx, my, ms, false,
    `<circle cx="-40" cy="-30" r="28" fill="${C.dark}"/><circle cx="-40" cy="-30" r="11" fill="${C.steel}"/><circle cx="120" cy="-30" r="28" fill="${C.dark}"/><circle cx="120" cy="-30" r="11" fill="${C.steel}"/>` +
    stroke("M-40 -30L10 -70H80L120 -30", C.dark, 7) + `<path d="M-10 -90H70L84 -64H0Z" fill="${C.yellow}"/><path d="M78 -120L96 -60" stroke="${C.dark}" stroke-width="7"/>` + stroke("M70 -126H96", C.dark, 6) +
    `<path d="M84 -64Q120 -70 136 -44L120 -34Z" fill="${C.yellow}"/><rect x="-26" y="-104" width="60" height="16" rx="6" fill="${C.dark}"/>`));
  g.push(person({ x: mx + 18 * ms, y: my - 2, s: ms, legs: "sit", skin: SKIN.s2, top: C.yellow, bottom: C.indigo, hat: { type: "helmet", color: C.red },
    arms: { l: [[20, -156], [70, -124]], r: [[50, -160], [86, -126]] } }));
  g.push(rect(0, 406, 800, 194, "#D59A72"), `<path d="M0 470Q300 450 800 474V600H0Z" fill="${C.wood}" opacity=".18"/>`);
  // Grand parasol de la vendeuse
  g.push(stroke("M420 200V560", C.dark, 6));
  g.push(`<path d="M240 210Q420 120 600 210Z" fill="${C.terra}"/><path d="M300 210Q420 116 360 210Z" fill="${C.cream}"/><path d="M480 210Q420 116 540 210Z" fill="${C.cream}"/>`);
  let fr = "M240 210";
  for (let bx = 240; bx < 600; bx += 30) fr += `Q${bx + 15} 226 ${bx + 30} 210`;
  g.push(`<path d="${fr}Z" fill="${C.ocre}"/>`, `<circle cx="420" cy="160" r="6" fill="${C.dark}"/>`);
  // La vendeuse, derrière sa table (pieds de la table d'abord), tablier blanc
  g.push(stroke("M184 490L180 566M356 490L360 566", C.wood2, 8));
  const vx = 420, vy = 566, vs = 1.04;
  g.push(person({ x: vx, y: vy, s: vs, skin: SKIN.s2, hair: { type: "foulard", color: C.green, wax: "wax3" }, robe: "kaba", top: C.ocre, wax: "wax1", face: "talk",
    arms: { l: [[-56, -158], [-44, -144]], r: [[62, -154], [100, -150]] } }));
  g.push(at(vx, vy, vs, false, cloth("M-24 -150H24L28 -60H-28Z", C.white, null) + rect(-24, -150, 48, 8, C.green)));
  // Table, bassine de beignets, marmite de haricots
  g.push(rect(170, 452, 200, 12, C.wood, ' rx="3"'), rect(176, 464, 188, 26, C.wood2));
  g.push(`<path d="M242 420H370Q364 452 306 454Q248 452 242 420Z" fill="${C.green}"/>`);
  for (const [cx, cy] of [[258, 410], [282, 406], [306, 404], [330, 406], [354, 410], [270, 392], [294, 388], [318, 388], [342, 392], [306, 374]]) g.push(`<circle cx="${cx}" cy="${cy}" r="13" fill="${C.ocre}"/><circle cx="${cx - 3}" cy="${cy - 4}" r="4" fill="${C.yellow}" opacity=".7"/><circle cx="${cx + 4}" cy="${cy + 4}" r="3" fill="${C.wood}" opacity=".5"/>`);
  g.push(`<rect x="236" y="414" width="140" height="10" rx="5" fill="${C.green}"/><rect x="236" y="414" width="140" height="10" rx="5" fill="rgba(255,255,255,.2)"/>`);
  g.push(`<path d="M178 420H226Q224 452 202 452Q180 452 178 420Z" fill="${C.grey}"/><rect x="174" y="414" width="56" height="9" rx="4" fill="${C.steel}"/><ellipse cx="202" cy="416" rx="24" ry="4" fill="${C.wood2}"/>`);
  for (const [cx, cy] of [[192, 415], [202, 417], [212, 415]]) g.push(`<circle cx="${cx}" cy="${cy}" r="2.4" fill="${C.terra}"/>`);
  g.push(stroke("M214 414L226 384", C.wood, 4));
  // Main gauche de la vendeuse posée sur le bord de la bassine
  g.push(at(vx, vy, vs, false, hand(-44, -144, SKIN.s2)));
  // Le foyer : marmite d'huile sur trois pierres, le feu dessous, l'écumoire de la vendeuse
  const kx = 566;
  g.push(`<ellipse cx="${kx}" cy="566" rx="64" ry="8" fill="${C.wood2}" opacity=".5"/>`);
  for (const [fx, fh] of [[-26, 34], [0, 46], [24, 36]]) g.push(`<path d="M${kx + fx - 12} 564Q${kx + fx} ${564 - fh} ${kx + fx + 12} 564Z" fill="${C.red}"/><path d="M${kx + fx - 6} 564Q${kx + fx} ${564 - fh * 0.6} ${kx + fx + 6} 564Z" fill="${C.yellow}"/>`);
  g.push(`<path d="M${kx - 60} 470H${kx + 60}Q${kx + 56} 526 ${kx} 528Q${kx - 56} 526 ${kx - 60} 470Z" fill="${C.grey}"/><rect x="${kx - 66}" y="464" width="132" height="10" rx="5" fill="${C.steel}"/><ellipse cx="${kx}" cy="470" rx="58" ry="7" fill="${C.wood}"/>`);
  g.push(stroke(`M${kx - 66} 478Q${kx - 80} 478 ${kx - 76} 490M${kx + 66} 478Q${kx + 80} 478 ${kx + 76} 490`, C.dark, 4));
  for (const sx of [-50, 50]) g.push(`<rect x="${kx + sx - 15}" y="516" width="30" height="52" rx="12" fill="${C.wood2}"/><rect x="${kx + sx - 15}" y="516" width="12" height="52" rx="6" fill="rgba(255,255,255,.12)"/>`);
  for (const [cx, cy] of [[-30, 468], [-6, 466], [20, 468], [38, 470]]) g.push(`<ellipse cx="${kx + cx}" cy="${cy}" rx="9" ry="5" fill="${C.ocre}"/>`);
  for (const [sx, sh] of [[-30, 50], [10, 66], [40, 44]]) g.push(stroke(`M${kx + sx} 456Q${kx + sx - 10} ${456 - sh / 2} ${kx + sx + 4} ${456 - sh}`, C.white, 4, ' opacity=".55"'));
  g.push(at(vx, vy, vs, false, stroke("M100 -150L148 -94", C.steel, 4) + `<ellipse cx="150" cy="-92" rx="12" ry="5" fill="${C.steel}"/>` + hand(100, -150, SKIN.s2)));
  // L'élève en uniforme reçoit ses beignets
  const ex = 180, ey = 576, es = 0.92;
  g.push(person({ x: ex, y: ey, s: es, skin: SKIN.s4, hair: { type: "nattes" }, top: C.blue, sleeve: "short", bottom: C.indigo, legs: "skirt", face: "smile",
    arms: { r: [[52, -166], [84, -176]], l: [[-40, -150], [-38, -110]] },
    lhand: (hx, hy) => stroke(`M${hx - 2} ${hy - 4}Q${hx + 6} ${hy - 30} ${hx - 10} ${hy - 46}`, C.wood2, 3) + `<rect x="${hx - 22}" y="${hy - 8}" width="26" height="40" rx="5" fill="${C.ocre}"/><rect x="${hx - 22}" y="${hy + 2}" width="26" height="6" fill="${C.terra}"/>` + hand(hx, hy, SKIN.s4),
    rhand: (hx, hy) => `<path d="M${hx - 4} ${hy - 14}L${hx + 24} ${hy - 20}L${hx + 20} ${hy + 10}L${hx - 2} ${hy + 6}Z" fill="${C.cream}"/><circle cx="${hx + 10}" cy="${hy - 12}" r="7" fill="${C.ocre}"/>` + hand(hx, hy, SKIN.s4) }));
  // L'homme en route pour le bureau mange un beignet en marchant
  const wx = 76, wy = 590, ws = 1.06;
  g.push(person({ x: wx, y: wy, s: ws, legs: "walk", skin: SKIN.s1, hair: { type: "short" }, beard: true, top: C.green, jacket: { color: C.green, shirt: C.white, tie: C.terra }, bottom: C.dark, face: "smile",
    arms: { l: [[-40, -150], [-28, -110]], r: [[48, -158], [54, -184]] },
    lhand: (hx, hy) => `<rect x="${hx - 6}" y="${hy}" width="40" height="30" rx="4" fill="${C.wood2}"/>` + stroke(`M${hx + 4} ${hy}Q${hx + 14} ${hy - 10} ${hx + 24} ${hy}`, C.dark, 3) + hand(hx, hy, SKIN.s1),
    rhand: (hx, hy) => `<circle cx="${hx}" cy="${hy - 10}" r="9" fill="${C.ocre}"/><circle cx="${hx - 3}" cy="${hy - 13}" r="3" fill="${C.yellow}" opacity=".7"/>` + hand(hx, hy, SKIN.s1) }));
  // Petit banc : un client mange ses haricots
  g.push(rect(612, 488, 160, 12, C.wood, ' rx="3"'), stroke("M626 500V574M758 500V574", C.wood2, 7));
  const bx = 720, by = 574, bs = 0.86;
  g.push(person({ x: bx, y: by, s: bs, flip: true, legs: "sit", skin: SKIN.s3, hair: { type: "locks" }, top: C.indigo, wax: "kente", sleeve: "short", bottom: C.dark, face: "laugh",
    arms: { r: [[46, -150], [60, -128]], l: [[-10, -150], [30, -136]] },
    rhand: (hx, hy) => `<path d="M${hx - 22} ${hy - 8}H${hx + 22}Q${hx + 18} ${hy + 14} ${hx} ${hy + 14}Q${hx - 18} ${hy + 14} ${hx - 22} ${hy - 8}Z" fill="${C.white}"/><ellipse cx="${hx}" cy="${hy - 8}" rx="20" ry="4" fill="${C.wood2}"/>` + hand(hx, hy, SKIN.s3),
    lhand: (hx, hy) => stroke(`M${hx} ${hy}L${hx + 26} ${hy + 6}`, C.steel, 3) + hand(hx, hy, SKIN.s3) }));
  return frame(g.join(""), "#F4E6CF");
}

/* ---------- Scène 3 : poisson braisé le soir ---------- */
function braise() {
  const g = [];
  const sky = `<linearGradient id="braise-ciel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.indigo}"/><stop offset=".62" stop-color="${C.terra}"/><stop offset="1" stop-color="${C.ocre}"/></linearGradient>` +
    `<radialGradient id="braise-halo"><stop offset="0" stop-color="${C.yellow}" stop-opacity=".55"/><stop offset="1" stop-color="${C.yellow}" stop-opacity="0"/></radialGradient>`;
  g.push(`<rect width="800" height="600" rx="36" fill="url(#braise-ciel)"/>`);
  for (const [sx, sy] of [[80, 50], [200, 90], [330, 40], [470, 80], [600, 46], [720, 100]]) g.push(`<circle cx="${sx}" cy="${sy}" r="2" fill="${C.white}" opacity=".8"/>`);
  g.push(`<circle cx="690" cy="78" r="22" fill="${C.cream}"/><circle cx="700" cy="72" r="20" fill="${C.indigo}" opacity=".9"/>`);
  // Silhouettes du quartier, fenêtres allumées, un palmier
  g.push(`<path d="M0 300V200H90V170H170V230H260V150H340V220H440V180H530V240H620V160H700V210H800V300Z" fill="${C.dark}" opacity=".75"/>`);
  for (const [wx, wy] of [[30, 230], [120, 196], [196, 256], [286, 176], [300, 220], [380, 246], [470, 206], [560, 262], [646, 186], [740, 236], [660, 240]]) g.push(rect(wx, wy, 14, 14, C.yellow, ' opacity=".85"'));
  g.push(stroke("M560 300Q566 240 556 190", C.dark, 8), ...[[-40, 14], [-30, -16], [10, -26], [40, -8], [44, 20]].map(([dx, dy]) => `<path d="M556 190Q${556 + dx / 2} ${190 + dy - 18} ${556 + dx} ${190 + dy}Q${556 + dx / 2} ${190 + dy - 4} 556 190Z" fill="${C.dark}"/>`));
  // Terrasse : sol cimenté, muret
  g.push(rect(0, 300, 800, 300, "#BFA88C"), rect(0, 296, 800, 30, C.sand2), rect(0, 322, 800, 6, C.wood2, ' opacity=".4"'));
  for (let k = 0; k < 6; k++) g.push(stroke(`M${k * 160} 330L${k * 160 - 60} 600`, C.wood, 2, ' opacity=".2"'));
  // Guirlande d'ampoules entre deux poteaux
  g.push(stroke("M24 600V110M776 600V110", C.wood2, 9));
  const bulbs = [];
  let path = "M24 120";
  for (const [x0, x1] of [[24, 400], [400, 776]]) {
    const mid = (x0 + x1) / 2;
    path += `Q${mid} 210 ${x1} 120`;
    for (let t = 0.1; t < 1; t += 0.16) { const bx = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * mid + t * t * x1, by = (1 - t) ** 2 * 120 + 2 * (1 - t) * t * 210 + t * t * 120; bulbs.push([bx, by]); }
  }
  g.push(stroke(path, C.dark, 2.5));
  for (const [bx, by] of bulbs) g.push(`<circle cx="${f(bx)}" cy="${f(by + 14)}" r="24" fill="url(#braise-halo)"/>`, rect(bx - 3, by, 6, 6, C.dark), `<ellipse cx="${f(bx)}" cy="${f(by + 14)}" rx="7" ry="9" fill="${C.yellow}"/>`);
  // La grilleuse et son grill (fût coupé sur pieds), fumée
  const gx = 560;
  g.push(stroke(`M${gx - 60} 470L${gx - 70} 566M${gx + 60} 470L${gx + 70} 566`, C.dark, 6));
  g.push(`<path d="M${gx - 78} 420H${gx + 78}Q${gx + 74} 476 ${gx} 478Q${gx - 74} 476 ${gx - 78} 420Z" fill="${C.grey}"/><path d="M${gx - 78} 420H${gx + 78}Q${gx + 74} 476 ${gx} 478Q${gx - 74} 476 ${gx - 78} 420Z" fill="rgba(0,0,0,.2)"/>`);
  g.push(`<ellipse cx="${gx}" cy="420" rx="78" ry="9" fill="${C.red}"/><ellipse cx="${gx}" cy="420" rx="60" ry="5" fill="${C.yellow}" opacity=".8"/>`);
  for (const [px, r] of [[-36, -4], [8, 3]]) g.push(`<g transform="translate(${gx + px} 410) rotate(${r})"><ellipse rx="30" ry="9" fill="${C.wood}"/><path d="M26 0L42 -10V10Z" fill="${C.wood2}"/><circle cx="-20" cy="-2" r="2" fill="${C.dark}"/>${stroke("M-6 -7L-2 7M6 -7L10 7", C.wood2, 2.5)}</g>`);
  g.push(`<g transform="translate(${gx + 52} 412)"><rect x="-14" y="-6" width="28" height="12" rx="5" fill="${C.ocre}"/><rect x="-14" y="-6" width="28" height="12" rx="5" fill="${C.wood}" opacity=".4"/></g>`);
  g.push(stroke(`M${gx - 82} 414H${gx + 82}`, C.steel, 3));
  for (const [sx, k] of [[-40, 1], [0, -1], [40, 1]]) g.push(stroke(`M${gx + sx} 398Q${gx + sx + 20 * k} 350 ${gx + sx} 310Q${gx + sx - 20 * k} 270 ${gx + sx + 10} 220`, C.white, 10, ' opacity=".28"'));
  const ggx = 690, ggy = 572, ggs = 1.06;
  g.push(person({ x: ggx, y: ggy, s: ggs, flip: true, skin: SKIN.s3, hair: { type: "gele", color: C.indigo, wax: "wax2" }, robe: "kaba", top: C.indigo, wax: "wax2", face: "smile",
    arms: { r: [[58, -160], [96, -172]], l: [[-46, -156], [-30, -196]] },
    rhand: (hx, hy) => stroke(`M${hx} ${hy}L${hx + 40} ${hy + 16}`, C.steel, 4) + hand(hx, hy, SKIN.s3),
    lhand: (hx, hy) => `<path d="M${hx} ${hy}L${hx - 6} ${hy - 44}Q${hx + 20} ${hy - 50} ${hx + 26} ${hy - 30}Z" fill="${C.ocre}"/>` + stroke(`M${hx} ${hy}L${hx + 10} ${hy - 42}M${hx} ${hy}L${hx + 20} ${hy - 34}`, C.wood2, 1.6) + hand(hx, hy, SKIN.s3) }));
  // Table des amis : celle du fond rit, la tête en arrière
  const T = { x: 248, y: 420 };
  const mid = { x: 248, y: 502, s: 0.84 };
  g.push(person({ ...mid, legs: "none", skin: SKIN.s5, hair: { type: "fulani", beads: C.ocre }, top: C.green, wax: "kitenge", face: "laugh",
    arms: { l: [[-44, -150], [-30, -104]], r: [[46, -168], [34, -210]] } }));
  // Ami de gauche, assis, raconte
  const a = { x: 104, y: 560, s: 0.94 };
  g.push(chair(a.x, a.y, a.s, C.white));
  g.push(person({ ...a, legs: "sit", skin: SKIN.s1, hair: { type: "short" }, beard: true, top: C.ocre, dashiki: C.indigo, bottom: C.indigo, face: "talk",
    arms: { l: [[-52, -168], [-62, -204]], r: [[50, -150], [58, -146]] } }));
  // Amie de droite, assise, rit
  const b = { x: 404, y: 560, s: 0.94 };
  g.push(chair(b.x, b.y, b.s, C.white, true));
  g.push(person({ ...b, flip: true, legs: "sit", skin: SKIN.s2, hair: { type: "boxbraids" }, top: C.terra, wax: "wax3", bottom: C.dark, face: "laugh",
    arms: { l: [[-30, -150], [10, -132]], r: [[50, -154], [80, -150]] } }));
  // La table, la nappe et le repas : poisson braisé, bâtons de manioc, piment, boissons
  g.push(`<path d="M${T.x - 92} ${T.y}H${T.x + 92}L${T.x + 98} ${T.y + 28}H${T.x - 98}Z" fill="${C.white}"/>`, cloth(`M${T.x - 98} ${T.y + 28}H${T.x + 98}L${T.x + 92} ${T.y + 60}H${T.x - 92}Z`, C.terra, "wax1"));
  g.push(stroke(`M${T.x - 84} ${T.y + 60}L${T.x - 90} ${T.y + 150}M${T.x + 84} ${T.y + 60}L${T.x + 90} ${T.y + 150}`, C.white, 7));
  g.push(`<ellipse cx="${T.x}" cy="${T.y + 12}" rx="54" ry="11" fill="${C.cream}"/><g transform="translate(${T.x} ${T.y + 6})"><ellipse rx="38" ry="9" fill="${C.wood}"/><path d="M34 0L50 -10V10Z" fill="${C.wood2}"/><circle cx="-26" cy="-2" r="2" fill="${C.dark}"/>${stroke("M-8 -6L-4 6M6 -6L10 6", C.wood2, 2.5)}</g>`);
  for (const [cx] of [[T.x - 30], [T.x + 20]]) g.push(`<ellipse cx="${cx}" cy="${T.y + 4}" rx="6" ry="3" fill="${C.leaf}"/>`);
  g.push(`<path d="M${T.x - 84} ${T.y + 14}H${T.x - 58}V${T.y + 22}H${T.x - 84}Z" fill="${C.leaf2}"/><path d="M${T.x - 82} ${T.y + 8}H${T.x - 60}V${T.y + 16}H${T.x - 82}Z" fill="${C.leaf}"/>`);
  g.push(`<ellipse cx="${T.x + 70}" cy="${T.y + 16}" rx="12" ry="4" fill="${C.cream}"/><circle cx="${T.x + 66}" cy="${T.y + 13}" r="4" fill="${C.red}"/><circle cx="${T.x + 74}" cy="${T.y + 14}" r="3.5" fill="${C.red}"/>`);
  for (const [bx2, col] of [[T.x - 48, C.green], [T.x + 46, C.wood2]]) g.push(`<rect x="${bx2 - 6}" y="${T.y - 30}" width="12" height="36" rx="4" fill="${col}"/><rect x="${bx2 - 3}" y="${T.y - 42}" width="6" height="14" rx="2" fill="${col}"/><rect x="${bx2 - 6}" y="${T.y - 18}" width="12" height="10" fill="${C.cream}" opacity=".85"/>`);
  // Mains posées sur la table, par-dessus
  g.push(at(mid.x, mid.y, mid.s, false, hand(-30, -104, SKIN.s5)), at(a.x, a.y, a.s, false, hand(58, -146, SKIN.s1)), at(b.x, b.y, b.s, true, hand(10, -132, SKIN.s2)));
  // Petit chat qui attend sous la table
  g.push(`<g transform="translate(${T.x + 30} 568)"><ellipse cx="0" cy="-14" rx="22" ry="12" fill="${C.dark}"/><circle cx="-22" cy="-26" r="10" fill="${C.dark}"/><path d="M-30 -32L-28 -42L-22 -34ZM-20 -34L-14 -42L-14 -30Z" fill="${C.dark}"/>${stroke("M20 -16Q36 -26 30 -40", C.dark, 4)}<circle cx="-25" cy="-27" r="1.6" fill="${C.yellow}"/></g>`);
  return frame(`<defs>${sky}</defs>` + g.join(""), C.indigo);
}

export default [
  { id: "tontine", fr: "Réunion de tontine", en: "Savings circle meeting", tags: ["tontine", "njangi", "réunion", "épargne", "association", "trésorière", "cotisation", "enveloppe", "cahier", "applaudir", "salon", "kaba", "ndop", "gele", "savings", "savings circle", "meeting", "treasurer", "contribution", "envelope", "community", "clapping"], draw: tontine },
  { id: "beignets", fr: "Beignets-haricots du matin", en: "Morning street breakfast", tags: ["beignets", "haricots", "bouillie", "petit-déjeuner", "matin", "vendeuse", "rue", "trottoir", "parasol", "friture", "élève", "uniforme", "moto-taxi", "bendskin", "breakfast", "street food", "morning", "vendor", "fritters", "beans", "student", "street"], draw: beignets },
  { id: "braise", fr: "Poisson braisé le soir", en: "Grilled fish at night", tags: ["poisson braisé", "soya", "grillade", "braise", "soir", "nuit", "terrasse", "amis", "rire", "guirlande", "bâton de manioc", "piment", "quartier", "grilled fish", "barbecue", "evening", "night", "friends", "laughing", "string lights", "street food"], draw: braise },
];
