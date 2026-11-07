// Scènes : la livraison à moto, le dimanche à la plage de Kribi, les éleveurs peuls et leurs zébus.
import { C, SKIN, person, frame, palm, cloud, bubble, check, stroke, f } from "./lib.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${r}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
/** Aplat avec un motif par-dessus. */
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");
/** Position dans la scène d'un point local (hx, hy) d'un personnage. */
const toScene = (x, y, s, flip, hx, hy) => [x + (flip ? -hx : hx) * s, y + hy * s];
/** Grappe de bougainvillier : feuilles et fleurs. */
const bougain = (x, y, s = 1) => at(x, y, s, false,
  `<circle cx="-14" cy="4" r="16" fill="${C.leaf2}"/><circle cx="12" cy="-2" r="15" fill="${C.leaf}"/>` +
  [[-20, -6, C.red], [-6, -14, C.rose], [8, -10, C.red], [20, 2, C.rose], [-10, 8, C.rose], [4, 6, C.red], [-26, 10, C.red], [14, 14, C.rose]]
    .map(([cx, cy, c]) => `<circle cx="${cx}" cy="${cy}" r="6.5" fill="${c}"/>`).join(""));

/** Poule de profil vers la droite, pattes au sol en (x,y). */
const hen = (x, y, s, flip, col) => at(x, y, s, flip, stroke("M-4 -14L-6 0M6 -14L8 0", C.ocre, 2.5) +
  `<path d="M-24 -30Q-34 -50 -20 -46Q-6 -40 4 -36Q18 -48 24 -40Q28 -30 22 -22Q10 -10 -6 -12Q-22 -14 -24 -30Z" fill="${col}"/>` +
  `<path d="M18 -46Q20 -54 24 -48Q26 -54 28 -46Z" fill="${C.red}"/><path d="M28 -40L34 -38L28 -35Z" fill="${C.ocre}"/><circle cx="23" cy="-41" r="1.6" fill="${C.dark}"/>` +
  `<path d="M-8 -30Q2 -36 10 -26Q0 -20 -8 -30Z" fill="rgba(0,0,0,.12)"/>`);

/* ---------- Scène 1 : la livraison à moto ---------- */
function livraison() {
  const g = [];
  g.push(cloud(70, 70, 0.9), cloud(420, 50, 0.7));
  // Maison de gauche : mur clair, soubassement peint, toit de tôle, fenêtre à grille
  g.push(`<path d="M-10 196L40 150H330L360 196Z" fill="${C.steel}"/>`);
  for (let x = 30; x < 350; x += 16) g.push(stroke(`M${x} 196L${x + 14} 152`, C.grey, 2, ' opacity=".5"'));
  g.push(rect(0, 196, 340, 274, C.white), rect(0, 410, 340, 60, C.ocre), rect(0, 404, 340, 8, C.terra, ' opacity=".6"'));
  g.push(rect(40, 240, 110, 100, C.sky), rect(40, 240, 110, 100, C.blue, ' opacity=".2"'), stroke("M58 240V340M76 240V340M94 240V340M112 240V340M130 240V340M40 290H150", C.dark, 3, ' opacity=".7"'), rect(32, 340, 126, 8, C.wood2));
  g.push(rect(210, 252, 80, 158, C.wood2), rect(218, 262, 64, 140, C.wood), stroke("M250 262V402", C.wood2, 3), `<circle cx="270" cy="336" r="4" fill="${C.ocre}"/>`);
  // Poteau électrique et fils
  g.push(rect(380, 120, 8, 350, C.wood2), rect(362, 136, 44, 6, C.wood2, ' rx="3"'), stroke("M0 150Q190 186 384 140Q590 186 800 150", C.dark, 2, ' opacity=".5"'));
  // Concession de la cliente : toit de tuiles derrière le mur, mur et portail
  g.push(`<path d="M520 260L640 182L800 248V270H520Z" fill="${C.terra}"/>`, rect(540, 252, 260, 30, C.cream));
  g.push(rect(470, 290, 330, 180, C.cream), rect(466, 282, 338, 12, C.terra, ' rx="3"'), rect(470, 430, 330, 40, C.sand2));
  // Le portail : un battant fermé, l'autre ouvert sur la cour
  g.push(rect(592, 262, 22, 208, C.white), rect(774, 262, 22, 208, C.white), rect(588, 254, 30, 12, C.terra, ' rx="2"'), rect(770, 254, 30, 12, C.terra, ' rx="2"'));
  g.push(rect(614, 290, 160, 180, C.sand2), rect(614, 290, 160, 60, C.leaf, ' opacity=".45"'), rect(614, 440, 160, 30, C.sand));
  // L'enfant dans la cour, qui fait coucou
  g.push(person({ x: 732, y: 470, s: 0.56, skin: SKIN.s3, hair: { type: "puffs" }, top: C.ocre, wax: "wax3", sleeve: "short", bottom: C.green, legs: "skirt", face: "laugh",
    arms: { r: [[56, -214], [58, -266]], l: [[-40, -150], [-36, -110]] } }));
  g.push(rect(614, 296, 76, 174, C.green));
  for (let x = 626; x < 690; x += 13) g.push(rect(x, 304, 5, 158, C.leaf2));
  g.push(rect(614, 300, 76, 6, C.ocre), rect(614, 376, 76, 6, C.ocre), `<circle cx="680" cy="390" r="4" fill="${C.ocre}"/>`);
  g.push(`<path d="M774 296L796 286V478L774 470Z" fill="${C.leaf2}"/>`);
  // Bougainvilliers qui débordent du mur
  for (const [bx, by, bs] of [[480, 282, 1.1], [520, 274, 1.25], [562, 280, 1.05], [490, 318, 0.9], [604, 248, 0.9], [586, 236, 0.8], [800, 250, 0.9], [484, 354, 0.7]]) g.push(bougain(bx, by, bs));
  // Rue en terre rouge, caniveau
  g.push(rect(0, 470, 800, 130, C.sand2), rect(0, 470, 800, 130, C.terra, ' opacity=".22"'), rect(0, 470, 800, 8, C.wood2, ' opacity=".45"'));
  for (const [x, y] of [[90, 520], [470, 590], [700, 520], [260, 584]]) g.push(`<ellipse cx="${x}" cy="${y}" rx="14" ry="3" fill="${C.wood2}" opacity=".3"/>`);
  // Passante au loin, bassine sur la tête
  g.push(person({ x: 70, y: 470, s: 0.5, legs: "walkskirt", skin: SKIN.s1, hair: { type: "foulard", color: C.indigo }, robe: "kaba", top: C.green, wax: "wax2", face: "smile",
    arms: { r: [[46, -250], [30, -298]], l: [[-40, -150], [-34, -112]] } }));
  g.push(at(70, 470, 0.5, false, `<path d="M-40 -304H40L32 -328H-32Z" fill="${C.ocre}"/><ellipse cx="0" cy="-328" rx="32" ry="6" fill="${C.yellow}"/>` + hand(30, -300, SKIN.s1)));

  /* La moto (repère de vie-b, sol en 560), réduite et posée sur la rue */
  const T = (x, y) => [-24 + 0.9 * x, 41 + 0.9 * y];
  const m = [];
  const BK = C.indigo;
  const wheel = ([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="40" fill="${C.dark}"/><circle cx="${cx}" cy="${cy}" r="27" fill="${C.steel}"/><circle cx="${cx}" cy="${cy}" r="9" fill="${C.grey}"/>` +
    [0, 45, 90, 135].map((a) => `<path d="M${cx} ${cy - 25}V${cy + 25}" stroke="${C.grey}" stroke-width="2" transform="rotate(${a} ${cx} ${cy})"/>`).join("");
  const R = [236, 520], F = [516, 520];
  m.push(`<ellipse cx="380" cy="562" rx="210" ry="9" fill="${C.dark}" opacity=".2"/>`, wheel(R), wheel(F));
  m.push(stroke(`M${R[0]} ${R[1]}L372 492`, C.dark, 10), stroke("M262 412L244 506", C.dark, 7));
  m.push(stroke("M186 512Q190 470 236 468Q268 468 282 486", BK, 8), stroke("M176 400H252M186 400L204 430M236 400L240 428", C.steel, 5));
  m.push(stroke("M494 398L438 462", C.dark, 12), stroke("M494 396L300 420", C.dark, 9));
  m.push(`<path d="M352 456H436L442 470Q440 500 418 506H370Q350 502 348 484Z" fill="${C.grey}"/><circle cx="380" cy="482" r="15" fill="${C.steel}"/>`);
  m.push(stroke("M430 476Q420 512 380 516H300", C.steel, 8), `<path d="M196 504H312Q320 512 312 522H196Q188 513 196 504Z" fill="${C.steel}"/>`);
  m.push(`<path d="M300 420H386L380 456H312Z" fill="${BK}"/><path d="M404 404Q408 378 446 376Q480 376 494 392L490 414Q448 424 408 420Z" fill="${BK}"/>`, stroke("M420 388Q446 380 472 384", C.white, 4, ' opacity=".5"'));
  m.push(`<path d="M196 402Q198 388 216 388H398Q414 388 412 402L404 412H210Q196 412 196 402Z" fill="${C.dark}"/>`);
  m.push(stroke(`M496 392L${F[0]} ${F[1]}`, C.steel, 9), stroke("M484 494Q496 468 522 470Q544 474 552 494", BK, 8));
  m.push(`<circle cx="514" cy="386" r="17" fill="${C.dark}"/><circle cx="518" cy="386" r="12" fill="${C.yellow}"/>`, rect(424, 497, 34, 7, C.dark, ' rx="3.5"'));
  // Caisson de livraison sur le porte-bagages (sans marque) : couvercle, bande réfléchissante, sangle
  m.push(rect(150, 290, 116, 108, C.terra, ' rx="10"'), rect(146, 282, 124, 22, C.terra, ' rx="8"'), rect(146, 296, 124, 6, C.dark, ' opacity=".25"'));
  m.push(rect(160, 336, 96, 10, C.white, ' opacity=".8"'), rect(160, 352, 96, 4, C.white, ' opacity=".5"'), rect(200, 304, 16, 10, C.dark, ' rx="2" opacity=".6"'), stroke("M150 386H266", C.dark, 5, ' opacity=".4"'));
  // Livreur casqué en gilet, assis ; main gauche au guidon, main droite tend le colis
  const dx = 372, dy = 502, dskin = SKIN.s2;
  m.push(person({ x: dx, y: dy, s: 1, skin: dskin, hair: { type: "short" }, hat: { type: "helmet", color: C.green }, top: C.yellow, bottom: C.wood2, shoes: C.dark, legs: "sit", face: "smile",
    arms: { l: [[30, -170], [96, -160]], r: [[72, -178], [118, -152]] } }));
  m.push(at(dx, dy, 1, false, rect(-28, -150, 56, 7, C.steel) + rect(-28, -128, 56, 7, C.steel) + stroke("M-4 -204V-112", C.ocre, 3, ' opacity=".7"')));
  m.push(stroke("M496 394L488 348", C.dark, 6), stroke("M462 344Q478 338 498 346", C.dark, 7), stroke("M492 346L486 306", C.dark, 3), `<ellipse cx="484" cy="302" rx="7" ry="10" fill="${C.dark}"/>`);
  m.push(hand(dx + 96, dy - 160, dskin));
  g.push(`<g transform="translate(-24 41) scale(.9)">${m.join("")}</g>`);

  // La cliente en kaba devant son portail : elle reçoit le colis, téléphone en main
  const cx = 560, cy = 568, cs = 1.05, cskin = SKIN.s4;
  g.push(person({ x: cx, y: cy, s: cs, flip: true, skin: cskin, hair: { type: "foulard", color: C.ocre, wax: "wax1" }, robe: "kaba", top: C.terra, wax: "wax1", face: "laugh",
    arms: { r: [[52, -174], [80, -200]], l: [[-48, -168], [-40, -214]] } }));
  // Le colis, tenu des deux côtés, puis les mains par-dessus
  const [rhx, rhy] = T(dx + 118, dy - 152), [chx, chy] = toScene(cx, cy, cs, true, 80, -200);
  const px0 = rhx - 2, pw = chx + 4 - px0, pyc = (rhy + chy) / 2;
  g.push(rect(px0, pyc - 26, pw, 46, C.sand2, ' rx="3"'), rect(px0, pyc - 26, pw, 46, C.wood, ' rx="3" opacity=".35"'), rect(px0 + pw / 2 - 5, pyc - 26, 10, 46, C.ocre, ' opacity=".8"'), rect(px0 + 6, pyc + 4, 16, 10, C.white, ' rx="1.5"'));
  g.push(hand(rhx, rhy, dskin, 6.8), hand(chx, chy, cskin, 7.9));
  // Son téléphone, écran tourné vers nous : la coche verte de la commande payée
  const [phx, phy] = toScene(cx, cy, cs, true, -40, -214);
  g.push(`<g transform="translate(${f(phx)} ${f(phy - 14)}) rotate(8)"><rect x="-10" y="-17" width="20" height="34" rx="4" fill="${C.dark}"/><rect x="-8" y="-14" width="16" height="27" rx="1.5" fill="${C.green}"/><g transform="scale(.5)">${check()}</g></g>`, hand(phx, phy + 2, cskin, 7.9));
  // Deux poules qui picorent au bord de la rue
  g.push(hen(690, 556, 1.1, true, C.white), hen(744, 548, 0.95, false, C.wood));
  // Bulle : livraison confirmée
  g.push(bubble(700, 150, check(), C.green), `<circle cx="660" cy="226" r="5" fill="${C.green}" opacity=".5"/><circle cx="642" cy="252" r="3.5" fill="${C.green}" opacity=".4"/>`);
  return frame(g.join(""), C.cream);
}

/* ---------- Scène 2 : le dimanche à la plage de Kribi ---------- */
function plage() {
  const g = [];
  g.push(rect(0, 0, 800, 150, C.blue, ' opacity=".18"'), rect(0, 150, 800, 90, C.blue, ' opacity=".09"'));
  g.push(`<circle cx="640" cy="90" r="40" fill="${C.yellow}" opacity=".85"/>`, cloud(90, 80, 0.9), cloud(380, 56, 0.7));
  // Côte boisée et chutes de la Lobé qui tombent dans la mer
  g.push(`<path d="M0 252V214Q40 196 90 206Q140 188 200 204Q250 194 300 210L330 252Z" fill="${C.leaf2}"/>`);
  g.push(`<path d="M222 254Q218 232 232 226Q246 214 266 218Q288 216 296 232Q306 242 304 254Z" fill="${C.grey}"/><path d="M222 254Q226 240 238 238L244 254Z" fill="${C.dark}" opacity=".25"/>`);
  g.push(`<path d="M246 222Q244 240 238 254H252Q254 238 256 222Z" fill="${C.white}" opacity=".9"/><path d="M262 220Q264 238 262 254H276Q274 236 272 220Z" fill="${C.white}" opacity=".9"/><path d="M280 224Q284 240 286 254H294Q290 238 286 226Z" fill="${C.white}" opacity=".75"/>`);
  for (const [x, r] of [[240, 6], [252, 7], [266, 8], [280, 6], [292, 5]]) g.push(`<circle cx="${x}" cy="254" r="${r}" fill="${C.white}"/>`);
  // Mer turquoise, vagues
  g.push(rect(0, 250, 800, 120, C.sky), rect(0, 250, 800, 120, C.blue, ' opacity=".55"'), rect(0, 250, 800, 120, C.leaf, ' opacity=".28"'), rect(0, 250, 800, 22, C.blue, ' opacity=".25"'));
  for (const [x, y, w] of [[80, 284, 70], [330, 300, 90], [560, 280, 60], [690, 310, 80], [180, 326, 70]]) g.push(stroke(`M${x} ${y}q${w / 4} -7 ${w / 2} 0t${w / 2} 0`, C.white, 3, ' opacity=".65"'));
  // Écume et sable
  g.push(`<path d="M0 352Q120 338 240 352T480 350T800 348V600H0Z" fill="${C.white}" opacity=".7"/>`, `<path d="M0 362Q120 348 240 362T480 360T800 358V600H0Z" fill="${C.sand2}"/>`, `<path d="M0 384Q160 370 320 384T800 380V600H0Z" fill="${C.sand}"/>`);
  // Pirogue colorée tirée sur le sable, pagaie
  g.push(`<path d="M24 366Q60 368 90 378H226Q262 372 300 360Q290 400 250 404H74Q38 400 24 366Z" fill="${C.green}"/>`);
  g.push(`<path d="M44 380Q60 382 90 386H226Q256 382 282 374L276 386Q250 392 226 394H84Q58 392 44 380Z" fill="${C.ocre}"/>`, `<path d="M64 392H262L254 400H72Z" fill="${C.terra}"/>`);
  for (const x of [110, 150, 190]) g.push(`<path d="M${x} 380l8 -8l8 8z" fill="${C.white}"/>`);
  g.push(stroke("M70 396H250", C.wood2, 4), `<ellipse cx="258" cy="396" rx="14" ry="5" fill="${C.wood}"/>`);
  // Palmiers et cocotier
  g.push(palm(30, 440, 1.25, 26), palm(772, 470, 1.4, -24));
  // Les enfants qui jouent au ballon
  g.push(person({ x: 132, y: 506, s: 0.68, legs: "walk", skin: SKIN.s3, hair: { type: "short" }, top: C.terra, sleeve: "short", bottom: C.indigo, face: "laugh",
    arms: { l: [[-50, -170], [-60, -214]], r: [[50, -172], [64, -214]] } }));
  g.push(person({ x: 330, y: 514, s: 0.7, flip: true, legs: "walkskirt", skin: SKIN.s5, hair: { type: "bantu" }, top: C.yellow, wax: "wax3", sleeve: "short", bottom: C.green, bwax: "kitenge", face: "laugh",
    arms: { l: [[-46, -160], [-58, -124]], r: [[50, -180], [70, -214]] } }));
  g.push(`<circle cx="236" cy="320" r="17" fill="${C.white}"/><path d="M236 303Q228 320 236 337" fill="none" stroke="${C.terra}" stroke-width="4"/><path d="M219 320Q236 312 253 320" fill="none" stroke="${C.indigo}" stroke-width="4"/>`);
  for (const [x, y, r] of [[200, 352, 3], [212, 340, 2.5]]) g.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${C.white}" opacity=".7"/>`);
  // Pagne étalé sous le parasol
  g.push(cloth("M368 532H716L742 588H344Z", C.green, "wax2"), `<path d="M344 588H742L736 594H350Z" fill="${C.dark}" opacity=".2"/>`);
  // Parasol en pagne
  const ox = 542, oy = 296;
  g.push(stroke(`M${ox} ${oy}L${ox - 6} 536`, C.wood2, 7), `<ellipse cx="${ox - 6}" cy="536" rx="12" ry="3" fill="${C.wood2}" opacity=".3"/>`);
  const rim = [[392, 352], [442, 360], [492, 364], [542, 366], [592, 364], [642, 360], [692, 352]];
  for (let i = 0; i < rim.length - 1; i++) {
    const [x0, y0] = rim[i], [x1, y1] = rim[i + 1];
    g.push(cloth(`M${ox} ${oy - 40}L${x0} ${y0}Q${(x0 + x1) / 2} ${Math.max(y0, y1) + 10} ${x1} ${y1}Z`, i % 2 ? C.ocre : C.terra, i % 2 ? "wax3" : "wax2"));
  }
  g.push(`<circle cx="${ox}" cy="${oy - 42}" r="6" fill="${C.wood2}"/>`);
  // La mère et le père sur leurs chaises de plage, le plat de poisson braisé posé sur le pagne entre eux
  const chair = (x, y, sc, flip, col, pat) => at(x, y, sc, flip, cloth("M-40 -98L-34 -200H34L40 -98Z", col, pat) + stroke("M-36 -98L-36 -200M36 -98L36 -200", C.wood2, 5) +
    stroke("M-30 -98L64 -4M64 -98L-30 -4", C.wood2, 6) + rect(-40, -104, 112, 10, C.wood2, ' rx="3"'));
  g.push(chair(440, 566, 0.95, false, C.green, "kente"), chair(650, 566, 1, true, C.terra, "wax3"));
  g.push(person({ x: 440, y: 566, s: 0.95, legs: "sit", skin: SKIN.s2, hair: { type: "foulard", color: C.green, wax: "kitenge" }, robe: "kaba", top: C.indigo, wax: "wax1", face: "talk",
    arms: { l: [[-40, -150], [-34, -110]], r: [[50, -152], [62, -112]] } }));
  g.push(person({ x: 650, y: 566, s: 1, legs: "sit", flip: true, skin: SKIN.s4, hair: { type: "short" }, beard: true, top: C.white, dashiki: C.terra, sleeve: "short", bottom: C.indigo, face: "laugh",
    arms: { l: [[-42, -150], [-36, -112]], r: [[54, -150], [44, -186]] },
    rhand: (hx, hy) => `<circle cx="${hx}" cy="${hy - 14}" r="15" fill="${C.leaf}"/><ellipse cx="${hx}" cy="${hy - 26}" rx="10" ry="4" fill="${C.cream}"/>` + stroke(`M${hx + 2} ${hy - 26}L${hx + 10} ${hy - 50}`, C.red, 2.5) + hand(hx, hy, SKIN.s4) }));
  g.push(`<ellipse cx="546" cy="566" rx="38" ry="9" fill="${C.white}"/><ellipse cx="546" cy="563" rx="30" ry="6" fill="${C.sand2}"/>`);
  g.push(`<path d="M520 562Q540 548 562 558L574 552L570 564L574 572L562 566Q540 574 520 562Z" fill="${C.wood2}"/><circle cx="528" cy="560" r="1.8" fill="${C.white}"/>`, stroke("M536 556V568M546 555V569M554 557V567", C.dark, 1.6, ' opacity=".5"'));
  for (const [x, y] of [[566, 570], [574, 566]]) g.push(`<ellipse cx="${x}" cy="${y}" rx="8" ry="3.5" fill="${C.ocre}"/>`);
  // Glacière à côté de la mère
  g.push(rect(362, 522, 50, 40, C.blue, ' rx="5"'), rect(358, 514, 58, 12, C.white, ' rx="4"'), stroke("M376 514V508H398V514", C.dark, 3));
  // La vendeuse de beignets, bassine sur la tête
  const vx = 726, vy = 588, vs = 0.92;
  g.push(person({ x: vx, y: vy, s: vs, flip: true, legs: "walkskirt", skin: SKIN.s1, hair: { type: "foulard", color: C.terra, wax: "wax2" }, top: C.green, wax: "wax3", sleeve: "short", bottom: C.ocre, bwax: "wax1", face: "talk",
    arms: { r: [[48, -240], [32, -292]], l: [[-44, -150], [-50, -114]] },
    lhand: (hx, hy) => `<path d="M${hx - 10} ${hy}H${hx + 10}L${hx + 12} ${hy + 28}H${hx - 12}Z" fill="${C.white}" opacity=".9"/><circle cx="${hx - 3}" cy="${hy + 18}" r="4" fill="${C.wood}"/><circle cx="${hx + 4}" cy="${hy + 12}" r="4" fill="${C.ocre}"/>` + hand(hx, hy, SKIN.s1) }));
  let basin = `<path d="M-44 -298H44L34 -322H-34Z" fill="${C.blue}"/><ellipse cx="0" cy="-322" rx="34" ry="6" fill="${C.steel}"/>`;
  for (const [bx, by, c] of [[-24, -328, C.wood], [-8, -332, C.ocre], [8, -330, C.wood], [24, -328, C.ocre], [-14, -342, C.ocre], [4, -344, C.wood], [18, -340, C.ocre]]) basin += `<circle cx="${bx}" cy="${by}" r="9" fill="${c}"/>`;
  g.push(at(vx, vy, vs, true, basin + hand(32, -294, SKIN.s1)));
  // Seau et pelle de sable au premier plan
  g.push(`<path d="M80 560H112L108 590H84Z" fill="${C.red}"/>`, stroke("M84 560Q96 546 108 560", C.dark, 2.5), stroke("M122 590L134 556", C.yellow, 4), `<ellipse cx="136" cy="552" rx="7" ry="5" fill="${C.yellow}"/>`);
  return frame(g.join(""), C.sky);
}

/* ---------- Scène 3 : les éleveurs peuls et leurs zébus ---------- */
/** Zébu de profil vers la droite (flip : vers la gauche), sabots au sol en (x,y). col robe, col2 taches et pattes du fond. */
const zebu = (x, y, s, flip, col, col2) => at(x, y, s, flip,
  stroke("M-76 -104Q-92 -70 -86 -34", col, 5) + `<ellipse cx="-86" cy="-30" rx="6" ry="10" fill="${C.dark}"/>` +
  stroke("M-48 -70L-54 -8", col2, 12) + stroke("M50 -70L56 -8", col2, 12) +
  `<path d="M-80 -98Q-84 -134 -40 -134Q10 -138 52 -130Q76 -126 78 -100Q80 -70 60 -62Q0 -54 -60 -62Q-80 -70 -80 -98Z" fill="${col}"/>` +
  `<path d="M18 -128Q26 -166 50 -162Q66 -156 66 -126Z" fill="${col}"/>` +
  `<path d="M-40 -122Q-20 -100 -54 -80Q-70 -96 -62 -118Z" fill="${col2}" opacity=".8"/>` +
  `<path d="M60 -110Q66 -64 86 -76L94 -100Z" fill="${col}"/>` +
  `<path d="M58 -132Q88 -136 102 -120L122 -88Q126 -76 114 -74L100 -76Q84 -90 64 -98Z" fill="${col}"/>` +
  `<ellipse cx="116" cy="-80" rx="9" ry="7" fill="${C.dark}" opacity=".35"/><circle cx="100" cy="-108" r="3" fill="${C.dark}"/>` +
  `<ellipse cx="86" cy="-118" rx="11" ry="5" fill="${col}" transform="rotate(-20 86 -118)"/>` +
  stroke("M100 -122Q124 -146 120 -178Q118 -192 128 -200", C.sand2, 6) + stroke("M90 -122Q66 -150 80 -184Q86 -198 98 -202", C.cream, 7) +
  stroke("M125 -197L128 -200M95 -201L98 -202", C.dark, 6) +
  stroke("M-60 -70L-62 -6", col, 13) + stroke("M38 -68L42 -6", col, 13) +
  `<ellipse cx="-62" cy="-3" rx="8" ry="4" fill="${C.dark}"/><ellipse cx="42" cy="-3" rx="8" ry="4" fill="${C.dark}"/><ellipse cx="-54" cy="-5" rx="7" ry="3.5" fill="${C.dark}"/><ellipse cx="56" cy="-5" rx="7" ry="3.5" fill="${C.dark}"/>`);
/** Turban peul enroulé, un pan qui retombe sur l'épaule (repère local d'un personnage). */
const turban = (col) => `<path d="M-23 -236Q-29 -266 -12 -278Q0 -284 12 -278Q29 -266 23 -236Q0 -258 -23 -236Z" fill="${col}"/>` +
  stroke("M-22 -250Q0 -268 23 -250M-19 -264Q0 -278 20 -264", "rgba(0,0,0,.16)", 3) +
  `<path d="M16 -246Q34 -232 30 -196L22 -198Q24 -224 12 -240Z" fill="${col}"/><path d="M16 -246Q34 -232 30 -196L22 -198Q24 -224 12 -240Z" fill="rgba(0,0,0,.12)"/>`;

function elevage() {
  const g = [];
  g.push(`<circle cx="560" cy="120" r="54" fill="${C.ocre}" opacity=".35"/><circle cx="560" cy="120" r="36" fill="${C.ocre}" opacity=".6"/>`, cloud(110, 70, 0.7));
  // Monts rocheux au loin, savane
  g.push(`<path d="M0 300L60 250L100 270L170 206L230 262L300 236L360 290L460 272L520 230L560 250L620 214L700 266L800 240V320H0Z" fill="${C.wood}" opacity=".28"/>`);
  g.push(`<path d="M0 312Q200 296 400 308T800 302V600H0Z" fill="${C.sand2}"/>`, `<path d="M0 420Q240 404 480 418T800 410V600H0Z" fill="${C.ocre}" opacity=".22"/>`);
  for (const [x, y, k] of [[40, 340, 1], [300, 330, 0.8], [470, 350, 0.9], [760, 336, 0.8], [250, 452, 1.2], [520, 560, 1.2], [60, 470, 1], [780, 500, 1.1], [420, 590, 1]]) g.push(at(x, y, k, false, stroke("M-8 0L-14 -18M-2 0L-2 -22M4 0L12 -16M8 0L18 -10", C.wood, 2.4)));
  // Acacia au houppier plat
  g.push(stroke("M170 330L164 260L130 200M164 262L210 196M168 290L120 236", C.wood2, 8));
  for (const [cx, cy, rx, ry, c] of [[110, 196, 70, 20, C.leaf2], [200, 186, 84, 22, C.leaf2], [150, 176, 90, 22, C.leaf], [240, 202, 50, 16, C.leaf]]) g.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${c}"/>`);
  // Case ronde au toit de chaume, grenier
  g.push(rect(588, 296, 120, 84, C.wood), rect(588, 296, 120, 84, C.terra, ' opacity=".25"'), `<path d="M632 380V340Q648 326 664 340V380Z" fill="${C.dark}" opacity=".75"/>`);
  g.push(`<path d="M570 302L648 214L726 302Q648 318 570 302Z" fill="${C.ocre}"/>`, stroke("M600 298L648 222M624 302L648 224M672 302L648 224M696 298L648 222", C.wood, 2.4, ' opacity=".6"'), `<circle cx="648" cy="214" r="5" fill="${C.wood2}"/>`);
  g.push(rect(726, 324, 46, 56, C.wood, ' rx="18"'), `<path d="M718 330L749 290L780 330Z" fill="${C.ocre}"/>`, stroke("M730 324L749 296L768 324", C.wood, 2, ' opacity=".5"'));
  // Le troupeau
  g.push(zebu(720, 432, 0.62, true, C.white, C.grey));
  g.push(zebu(366, 400, 0.66, true, C.cream, C.wood));
  // Le second éleveur, derrière les bêtes, bâton à la main
  const h2 = [238, 412, 0.68];
  g.push(person({ x: h2[0], y: h2[1], s: h2[2], legs: "walk", skin: SKIN.s4, hair: { type: "rase" }, robe: "boubou", top: C.terra, face: "smile",
    arms: { r: [[44, -160], [56, -128]], l: [[-40, -150], [-34, -110]] },
    rhand: (hx, hy) => stroke(`M${hx - 6} ${hy - 100}L${hx + 8} ${hy + 128}`, C.wood2, 5) + hand(hx, hy, SKIN.s4) }));
  g.push(at(...h2, false, turban(C.white)));
  g.push(zebu(556, 412, 0.7, false, C.wood2, C.dark));
  g.push(zebu(368, 520, 1.05, false, C.wood, C.wood2));
  // Le jeune bouvier, près du grand zébu
  g.push(person({ x: 556, y: 556, s: 0.7, skin: SKIN.s2, hair: { type: "rase" }, top: C.green, sleeve: "short", bottom: C.ocre, face: "laugh", flip: true,
    arms: { r: [[48, -170], [74, -200]], l: [[-40, -150], [-36, -112]] },
    lhand: (hx, hy) => stroke(`M${hx - 2} ${hy - 30}L${hx + 4} ${hy + 110}`, C.wood2, 4) + hand(hx, hy, SKIN.s2) }));
  // L'éleveur au premier plan : turban, boubou, bâton porté sur les épaules
  const h1 = [120, 574, 1.08], s1 = SKIN.s1;
  g.push(person({ x: h1[0], y: h1[1], s: h1[2], skin: s1, hair: { type: "rase" }, beard: true, robe: "boubou", top: C.indigo, face: "talk",
    arms: { l: [[-54, -166], [-60, -204]], r: [[54, -166], [60, -204]] } }));
  g.push(at(...h1, false, turban(C.ocre) + stroke("M-86 -200L90 -206", C.wood2, 6) + hand(-60, -204, s1) + hand(60, -204, s1)));
  // La femme peule : tresses fulani, boucles d'or, calebasse de lait entre les mains, une autre sur la tête
  const w = [690, 576, 1.04], ws = SKIN.s3;
  g.push(person({ x: w[0], y: w[1], s: w[2], flip: true, skin: ws, hair: { type: "fulani", beads: C.ocre }, top: C.terra, wax: "bogolan", sleeve: "short", bottom: C.indigo, bwax: "wax2", legs: "skirt", face: "smile",
    arms: { l: [[-42, -150], [-24, -132]], r: [[42, -150], [24, -132]] } }));
  g.push(at(...w, true, `<circle cx="-22" cy="-226" r="5" fill="none" stroke="${C.ocre}" stroke-width="2.5"/><circle cx="22" cy="-226" r="5" fill="none" stroke="${C.ocre}" stroke-width="2.5"/>` +
    `<path d="M-32 -140Q-30 -108 0 -106Q30 -108 32 -140Z" fill="${C.ocre}"/><ellipse cx="0" cy="-140" rx="32" ry="7" fill="${C.wood}"/><ellipse cx="0" cy="-140" rx="27" ry="5" fill="${C.white}"/>` +
    stroke("M-26 -128Q0 -120 26 -128", C.wood2, 2, ' stroke-dasharray="4 3"') + hand(-24, -132, ws) + hand(24, -132, ws) +
    `<ellipse cx="0" cy="-266" rx="20" ry="5" fill="${C.green}"/><path d="M-26 -268Q-28 -300 0 -302Q28 -300 26 -268Z" fill="${C.wood}"/>` + stroke("M-24 -284Q0 -278 24 -284", C.wood2, 2.5) + `<path d="M-22 -300Q0 -328 22 -300Z" fill="${C.terra}"/>` + stroke("M-18 -304L18 -304", C.white, 2, ' stroke-dasharray="3 3"') + `<circle cx="0" cy="-318" r="4" fill="${C.white}"/>`));
  return frame(g.join(""), C.sand);
}

export default [
  { id: "livraison", fr: "Livraison à moto", en: "Motorbike delivery",
    tags: ["livraison", "livreur", "moto", "colis", "commande", "portail", "cliente", "téléphone", "paiement", "kaba", "bougainvillier", "quartier", "delivery", "courier", "motorbike", "parcel", "order", "gate", "customer", "phone", "neighbourhood"], draw: livraison },
  { id: "plage", fr: "Dimanche à la plage", en: "Sunday at the beach",
    tags: ["plage", "Kribi", "mer", "famille", "dimanche", "parasol", "pagne", "enfants", "ballon", "beignets", "vendeuse", "pirogue", "palmier", "cocotier", "poisson braisé", "beach", "sea", "family", "sunday", "umbrella", "children", "ball", "vendor", "canoe", "palm tree"], draw: plage },
  { id: "elevage", fr: "Les éleveurs et leurs zébus", en: "Herders and their zebu",
    tags: ["élevage", "éleveurs", "Peuls", "Mbororo", "zébus", "troupeau", "Sahel", "Nord-Cameroun", "savane", "turban", "boubou", "tresses fulani", "calebasse", "lait", "case ronde", "acacia", "herders", "Fulani", "zebu", "cattle", "herd", "savanna", "calabash", "milk", "hut"], draw: elevage },
];
