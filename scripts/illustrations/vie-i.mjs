// Scènes : l'installation solaire au village, la coopérative de cacao, le laboratoire.
import { C, SKIN, HAIR, person, frame, palm, cloud, bubble, stroke, f } from "./lib.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="7.5" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const P = (p) => `${f(p[0])} ${f(p[1])}`;
/** Point d'un quadrilatère [bas-gauche, bas-droit, haut-droit, haut-gauche] en coordonnées (u, v). */
const quadPt = (q, u, v) => lerp(lerp(q[0], q[1], u), lerp(q[3], q[2], u), v);

/** Gilet haute visibilité, par-dessus le buste d'un person() (repère local). */
const vest = (col = C.ocre) => `<path d="M-30 -184Q-30 -206 -12 -206H-9L0 -176L9 -206H12Q30 -206 30 -184L27 -112Q0 -106 -27 -112Z" fill="${col}"/>` +
  rect(-29, -150, 58, 7, C.white, ' opacity=".9"') + rect(-28, -130, 56, 7, C.white, ' opacity=".9"') + stroke("M0 -176V-108", "rgba(0,0,0,.18)", 2);

/** Panneau solaire sur un quadrilatère : cadre, cellules, reflet. */
const solar = (q, nu = 4, nv = 3) => {
  const o = [`<path d="M${P(q[0])}L${P(q[1])}L${P(q[2])}L${P(q[3])}Z" fill="${C.steel}"/>`];
  const qi = [quadPt(q, 0.04, 0.06), quadPt(q, 0.96, 0.06), quadPt(q, 0.96, 0.94), quadPt(q, 0.04, 0.94)];
  o.push(`<path d="M${P(qi[0])}L${P(qi[1])}L${P(qi[2])}L${P(qi[3])}Z" fill="${C.indigo}"/>`);
  for (let i = 1; i < nu; i++) o.push(stroke(`M${P(quadPt(qi, i / nu, 0))}L${P(quadPt(qi, i / nu, 1))}`, C.blue, 1.6));
  for (let j = 1; j < nv; j++) o.push(stroke(`M${P(quadPt(qi, 0, j / nv))}L${P(quadPt(qi, 1, j / nv))}`, C.blue, 1.6));
  o.push(`<path d="M${P(quadPt(qi, 0.55, 1))}L${P(quadPt(qi, 0.8, 1))}L${P(quadPt(qi, 0.45, 0))}L${P(quadPt(qi, 0.2, 0))}Z" fill="${C.white}" opacity=".16"/>`);
  return o.join("");
};

/* ---------- Scène 1 : installation solaire ---------- */
function solaire() {
  const g = [];
  g.push(`<circle cx="120" cy="92" r="40" fill="${C.yellow}"/><circle cx="120" cy="92" r="58" fill="${C.yellow}" opacity=".25"/>`);
  g.push(cloud(440, 70, 0.9), cloud(620, 130, 0.6));
  g.push(`<path d="M0 360Q160 310 330 350Q520 300 800 346V480H0Z" fill="${C.leaf}" opacity=".3"/>`);
  g.push(palm(740, 478, 1.25, 14), palm(640, 472, 0.8, -8));
  // Terre rouge
  g.push(rect(0, 470, 800, 130, C.rose), `<path d="M0 506Q400 486 800 510V600H0Z" fill="${C.wood}" opacity=".18"/>`);
  // Maison : murs crépis, porte en wax, fenêtre
  g.push(rect(40, 300, 460, 184, C.sand), rect(40, 452, 460, 32, C.rose, ' opacity=".55"'));
  g.push(rect(330, 350, 64, 134, C.wood2), rect(337, 357, 50, 127, C.terra), rect(337, 357, 50, 127, "url(#wax1)", ' opacity=".7"'));
  g.push(rect(90, 344, 80, 62, C.wood2), rect(96, 350, 68, 50, C.green), rect(128, 350, 4, 50, C.wood2));
  // Ampoule allumée sous l'avant-toit, au-dessus de la porte
  g.push(`<circle cx="362" cy="328" r="22" fill="${C.yellow}" opacity=".35"/>`, stroke("M362 306V318", C.dark, 2), `<circle cx="362" cy="326" r="8" fill="${C.yellow}"/>`, rect(358, 314, 8, 6, C.grey));
  // Boîtier (onduleur) et câble qui descend du toit
  g.push(stroke("M470 296Q476 330 462 352", C.dark, 3), rect(440, 352, 40, 50, C.white, ' rx="4"'), rect(447, 360, 26, 12, C.sky), `<circle cx="452" cy="388" r="4" fill="${C.green}"/><circle cx="466" cy="388" r="4" fill="${C.ocre}"/>`);
  // Toit de tôle ondulée (pan avant)
  const roof = [[22, 304], [518, 304], [476, 196], [64, 196]];
  g.push(`<path d="M${P(roof[0])}L${P(roof[1])}L${P(roof[2])}L${P(roof[3])}Z" fill="${C.steel}"/>`);
  for (let i = 1; i < 32; i++) g.push(stroke(`M${P(quadPt(roof, i / 32, 0))}L${P(quadPt(roof, i / 32, 1))}`, C.grey, 1.6, ' opacity=".55"'));
  g.push(rect(16, 300, 508, 9, C.grey, ' rx="3"'), rect(60, 192, 420, 7, C.grey, ' rx="3"'));
  // Panneaux déjà posés
  for (const [u0, u1] of [[0.07, 0.27], [0.29, 0.49], [0.51, 0.71]]) g.push(solar([quadPt(roof, u0, 0.12), quadPt(roof, u1, 0.12), quadPt(roof, u1, 0.9), quadPt(roof, u0, 0.9)]));
  // Panneau en cours de pose (légèrement soulevé)
  g.push(solar([quadPt(roof, 0.74, 0.16), quadPt(roof, 0.93, 0.1), quadPt(roof, 0.94, 0.86), quadPt(roof, 0.75, 0.92)]));
  // Échelle appuyée contre l'avant-toit
  const lad = [[548, 560], [606, 560], [560, 288], [520, 288]];
  g.push(stroke(`M${P(lad[0])}L${P(lad[3])}`, C.wood2, 7), stroke(`M${P(lad[1])}L${P(lad[2])}`, C.wood2, 7));
  for (let k = 1; k < 9; k++) g.push(stroke(`M${P(quadPt(lad, 0, k / 9))}L${P(quadPt(lad, 1, k / 9))}`, C.wood, 5));
  // La technicienne, sur l'échelle : casque, gilet, nattes ; main gauche sur le panneau, visseuse à droite
  const tS = SKIN.s2, t = { x: 554, y: 446, s: 0.86 };
  g.push(person({ ...t, skin: tS, hair: { type: "boxbraids", beads: C.ocre }, hat: { type: "helmet", color: C.yellow }, top: C.green, bottom: C.indigo, bwax: "kitenge",
    arms: { l: [[-62, -168], [-104, -196]], r: [[48, -160], [44, -128]] } }));
  // Gilet, ceinture à outils ; la main droite tient le montant de l'échelle
  g.push(at(t.x, t.y, t.s, false, vest(C.ocre) + rect(-28, -116, 56, 9, C.dark, ' rx="3"') + rect(10, -112, 14, 20, C.wood2, ' rx="3"') + stroke("M-14 -110L-20 -84", C.grey, 4) + hand(-104, -196, tS)));
  { const v = (560 - t.y - 4) / 272; g.push(stroke(`M${P(quadPt(lad, 0, v))}L${P(quadPt(lad, 1, v))}`, C.wood, 5)); }
  g.push(stroke(`M${P(quadPt(lad, 1, 0.42))}L${P(quadPt(lad, 1, 0.62))}`, C.wood2, 7), hand(t.x + 44 * t.s, t.y - 128 * t.s, tS));
  // Le collègue, au sol, lui tend le panneau suivant
  const cS = SKIN.s4, c = { x: 680, y: 566, s: 1.0 };
  g.push(person({ ...c, flip: true, skin: cS, hair: { type: "short" }, beard: true, hat: { type: "helmet", color: C.white }, top: C.terra, wax: "wax3", bottom: C.dark, face: "talk",
    arms: { l: [[-44, -236], [-30, -288]], r: [[44, -232], [36, -292]] } }));
  const pq = [[-74, -280], [70, -300], [76, -322], [-70, -304]];
  g.push(at(c.x, c.y, c.s, true, vest(C.yellow) + solar(pq, 4, 2) + hand(-30, -288, cS) + hand(36, -292, cS)));
  // La famille regarde
  const gS = SKIN.s1;
  g.push(person({ x: 96, y: 566, s: 1.0, skin: gS, robe: "kaba", top: C.indigo, wax: "wax2", hair: { type: "foulard", color: C.ocre, wax: "wax1" }, face: "laugh",
    arms: { l: [[-38, -150], [-4, -140]], r: [[38, -150], [6, -144]] } }));
  g.push(person({ x: 186, y: 572, s: 0.72, skin: SKIN.s3, hair: { type: "bantu" }, top: C.yellow, robe: "dress", legs: "skirt", sleeve: "short", face: "laugh",
    arms: { r: [[42, -206], [46, -248]] }, point: [56, -340] }));
  g.push(person({ x: 276, y: 570, s: 1.02, flip: true, skin: SKIN.s3, hair: { type: "rase" }, hat: { type: "kufi", color: C.terra, wax: "kente" }, top: C.green, dashiki: true, bottom: C.dark,
    arms: { l: [[-42, -150], [-34, -110]], r: [[46, -150], [22, -118]] } }));
  // Bulle : la lumière arrive
  const bulb = `<path d="M0 -17Q13 -17 13 -4Q13 3 6 9V13H-6V9Q-13 3 -13 -4Q-13 -17 0 -17Z" fill="${C.yellow}"/>` + rect(-6, 13, 12, 6, C.cream, ' rx="2"') +
    stroke("M-22 -16L-17 -12M22 -16L17 -12M0 -26V-21", C.white, 3);
  g.push(bubble(300, 110, bulb, C.ocre));
  g.push(stroke("M300 168Q320 190 340 196", C.ocre, 3, ' stroke-dasharray="4 6" opacity=".6"'));
  return frame(g.join(""), "#DCE8EE");
}

/* ---------- Scène 2 : coopérative de cacao ---------- */
/** Cabosse : centre (x,y), longueur l, angle a, couleur. */
const pod = (x, y, l, a, col) => `<g transform="translate(${f(x)} ${f(y)}) rotate(${a})"><ellipse rx="${f(l * 0.32)}" ry="${f(l / 2)}" fill="${col}"/>` +
  stroke(`M0 ${f(-l / 2 + 3)}V${f(l / 2 - 3)}M${f(-l * 0.16)} ${f(-l * 0.4)}Q${f(-l * 0.22)} 0 ${f(-l * 0.16)} ${f(l * 0.4)}M${f(l * 0.16)} ${f(-l * 0.4)}Q${f(l * 0.22)} 0 ${f(l * 0.16)} ${f(l * 0.4)}`, "rgba(0,0,0,.14)", 1.6) + `</g>`;
/** Cacaoyer : pied du tronc en (x,y), cabosses accrochées au tronc et aux branches. */
const cacaoyer = (x, y, s = 1) => {
  const o = [stroke("M0 0Q-6 -70 4 -150", C.wood2, 20), stroke("M2 -120Q-40 -150 -64 -176", C.wood2, 10), stroke("M4 -130Q40 -160 66 -168", C.wood2, 10)];
  for (const [cx, cy, rx, ry, c] of [[-70, -200, 70, 44, C.leaf2], [70, -204, 74, 46, C.leaf2], [0, -238, 88, 52, C.leaf], [-30, -196, 60, 34, C.leaf], [40, -186, 56, 30, C.leaf2]])
    o.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${c}"/>`);
  for (const [lx, ly, a] of [[-120, -196, -30], [116, -190, 30], [-90, -156, -60], [96, -160, 60]]) o.push(`<ellipse cx="${lx}" cy="${ly}" rx="10" ry="26" transform="rotate(${a} ${lx} ${ly})" fill="${C.leaf2}"/>`);
  for (const [px, py, a, c] of [[-10, -60, 8, C.ocre], [12, -96, -10, C.yellow], [-8, -130, 12, C.terra], [-48, -164, 20, C.yellow], [50, -158, -16, C.ocre]]) o.push(stroke(`M${px} ${py - 18}V${py - 12}`, C.wood2, 3), pod(px, py, 30, a, c));
  return `<g transform="translate(${x} ${y}) scale(${s})">${o.join("")}</g>`;
};
function cacao() {
  const g = [];
  g.push(`<defs><pattern id="cacao-feves" width="16" height="11" patternUnits="userSpaceOnUse"><rect width="16" height="11" fill="${C.wood}"/><ellipse cx="4" cy="3" rx="3.6" ry="2.4" fill="${C.wood2}"/><ellipse cx="12" cy="4" rx="3.4" ry="2.3" fill="${C.dark}" opacity=".75"/><ellipse cx="8" cy="8.6" rx="3.6" ry="2.4" fill="${C.wood2}"/><ellipse cx="0" cy="8" rx="3" ry="2.2" fill="${C.dark}" opacity=".6"/><ellipse cx="16" cy="8" rx="3" ry="2.2" fill="${C.dark}" opacity=".6"/></pattern></defs>`);
  // Fond : collines boisées, cacaoyers
  g.push(`<circle cx="640" cy="86" r="36" fill="${C.yellow}" opacity=".9"/>`, cloud(110, 70, 0.8), cloud(420, 54, 0.6));
  g.push(`<path d="M0 220Q90 170 190 200Q300 150 420 196Q540 150 660 190Q740 170 800 186V470H0Z" fill="${C.leaf2}" opacity=".28"/>`);
  for (const [tx, ty, r] of [[60, 210, 46], [150, 196, 40], [270, 188, 50], [380, 200, 38], [500, 180, 46], [610, 196, 40], [740, 188, 50]]) g.push(`<circle cx="${tx}" cy="${ty}" r="${r}" fill="${C.leaf2}" opacity=".3"/>`);
  g.push(`<path d="M0 300Q140 250 300 284Q480 236 640 276Q720 258 800 270V470H0Z" fill="${C.leaf}" opacity=".4"/>`);
  g.push(cacaoyer(90, 470, 1.2), cacaoyer(400, 462, 0.95), cacaoyer(730, 470, 1.25));
  // Hangar de la coopérative, au fond à droite
  g.push(rect(520, 300, 150, 166, C.sand), `<path d="M504 306L595 262L686 306Z" fill="${C.steel}"/>`, rect(504, 302, 182, 7, C.grey), rect(568, 362, 52, 104, C.wood2), rect(534, 320, 120, 22, C.green), rect(534, 320, 120, 22, "url(#kente)", ' opacity=".5"'));
  // Sol de terre
  g.push(rect(0, 466, 800, 134, C.sand2), `<path d="M0 520Q400 500 800 524V600H0Z" fill="${C.wood}" opacity=".2"/>`);
  // Agricultrices derrière la claie : l'une remue les fèves au râteau, l'autre trie
  const aS = SKIN.s3, a = { x: 170, y: 500, s: 0.96 };
  g.push(person({ ...a, skin: aS, hair: { type: "foulard", color: C.green, wax: "wax3" }, top: C.terra, wax: "wax1", bottom: C.terra, bwax: "wax2", legs: "skirt", face: "talk",
    arms: { l: [[-10, -150], [34, -128]], r: [[50, -160], [70, -134]] } }));
  const bS = SKIN.s5, b = { x: 356, y: 500, s: 0.94 };
  g.push(person({ ...b, flip: true, skin: bS, hair: { type: "fulani", beads: C.ocre }, top: C.ocre, wax: "kente", bottom: C.indigo, bwax: "ndop", legs: "skirt", face: "laugh",
    arms: { l: [[-40, -140], [-30, -96]], r: [[40, -140], [26, -96]] } }));
  // Râteau en bois : du haut des mains jusqu'à la claie
  const [ax1, ay1] = [a.x + 34 * a.s, a.y - 128 * a.s], [ax2, ay2] = [a.x + 70 * a.s, a.y - 134 * a.s];
  const rake = stroke(`M${f(ax1 - 14)} ${f(ay1 - 6)}L272 426`, C.wood2, 5) + stroke("M246 430L300 422", C.wood2, 7);
  // Claie surélevée : fèves qui sèchent
  const top = [[36, 450], [470, 450], [440, 408], [64, 408]];
  for (const lx of [50, 160, 340, 456]) g.push(rect(lx - 4, 452, 8, 60, C.wood2));
  for (const lx of [80, 250, 430]) g.push(rect(lx - 3, 420, 6, 50, C.wood2, ' opacity=".7"'));
  g.push(`<path d="M${P(top[0])}L${P(top[1])}L${P(top[2])}L${P(top[3])}Z" fill="url(#cacao-feves)"/>`);
  g.push(stroke(`M${P(top[3])}L${P(top[2])}`, C.wood, 4), rect(32, 448, 442, 10, C.wood2, ' rx="3"'), stroke("M40 452H468", C.wood, 2));
  g.push(rake);
  for (const [hx, hy] of [[ax1, ay1], [ax2, ay2]]) g.push(hand(hx, hy, aS));
  g.push(hand(b.x + 30 * b.s, b.y - 96 * b.s, bS), hand(b.x - 26 * b.s, b.y - 96 * b.s, bS));
  // Panier de cabosses au premier plan
  g.push(`<path d="M40 528H190L176 588H54Z" fill="${C.wood}"/>` + stroke("M44 544H186M48 560H182M52 576H178", C.wood2, 2.5));
  for (const [px, py, aa, cc] of [[62, 524, 70, C.yellow], [96, 518, -60, C.ocre], [128, 522, 80, C.terra], [162, 524, -70, C.yellow], [80, 506, 30, C.ocre], [118, 502, -20, C.yellow], [150, 508, 50, C.ocre]]) g.push(pod(px, py, 36, aa, cc));
  // Une cabosse ouverte : pulpe blanche
  g.push(`<g transform="translate(238 566) rotate(-14)"><ellipse rx="26" ry="13" fill="${C.ocre}"/><ellipse rx="20" ry="8" fill="${C.cream}"/>` + [-12, -6, 0, 6, 12].map((k) => `<ellipse cx="${k}" cy="0" rx="3" ry="4" fill="${C.white}"/>`).join("") + `</g>`);
  // L'agriculteur vient de poser son sac sur la balance
  const mS = SKIN.s1, m = { x: 482, y: 576, s: 1.04 };
  g.push(person({ ...m, skin: mS, hair: { type: "short" }, beard: true, hat: { type: "cap", color: C.green }, top: C.dark, wax: "toghu", bottom: C.wood2, face: "laugh",
    arms: { l: [[-42, -150], [-36, -110]], r: [[48, -150], [62, -118]] } }));
  // Balance à plateau : colonne, cadran
  const sx = 588;
  g.push(rect(sx - 54, 556, 108, 18, C.grey, ' rx="4"'), rect(sx - 50, 552, 100, 8, C.steel, ' rx="3"'), rect(sx + 34, 430, 12, 124, C.grey));
  g.push(`<circle cx="${sx + 40}" cy="422" r="24" fill="${C.grey}"/><circle cx="${sx + 40}" cy="422" r="19" fill="${C.white}"/>`);
  for (let k = 0; k < 9; k++) { const an = Math.PI * (1.1 + k * 0.1), r1 = 16, r2 = 12; g.push(stroke(`M${f(sx + 40 + r1 * Math.cos(an))} ${f(422 + r1 * Math.sin(an))}L${f(sx + 40 + r2 * Math.cos(an))} ${f(422 + r2 * Math.sin(an))}`, C.dark, 1.4)); }
  g.push(stroke(`M${sx + 40} 422L${sx + 50} 410`, C.red, 2.4), `<circle cx="${sx + 40}" cy="422" r="2.6" fill="${C.dark}"/>`);
  // Sac de jute sur le plateau
  g.push(`<path d="M${sx - 42} 552Q${sx - 50} 500 ${sx - 30} 470Q${sx - 40} 456 ${sx - 22} 452H${sx + 14}Q${sx + 30} 456 ${sx + 20} 470Q${sx + 36} 500 ${sx + 28} 552Z" fill="${C.sand}"/>`);
  g.push(stroke(`M${sx - 30} 470H${sx + 20}`, C.wood, 4), stroke(`M${sx - 38} 500Q${sx - 8} 506 ${sx + 26} 500M${sx - 40} 528Q${sx - 8} 534 ${sx + 28} 528`, C.sand2, 3), `<circle cx="${sx - 6}" cy="512" r="9" fill="${C.wood2}" opacity=".5"/>`);
  g.push(hand(m.x + 62 * m.s, m.y - 118 * m.s, mS));
  // La responsable pèse et note sur sa tablette
  const rS = SKIN.s4, r = { x: 712, y: 578, s: 1.04 };
  g.push(person({ ...r, flip: true, skin: rS, hair: { type: "gele", color: C.indigo, wax: "wax1" }, robe: "kaba", top: C.ocre, wax: "kitenge", face: "talk",
    arms: { l: [[-30, -150], [-2, -146]], r: [[40, -150], [12, -160]] },
    lhand: (hx, hy) => `<g transform="translate(${hx} ${hy}) rotate(-8)"><rect x="-8" y="-34" width="52" height="40" rx="5" fill="${C.dark}"/><rect x="-4" y="-30" width="44" height="32" rx="2" fill="${C.sky}"/>` +
      rect(2, -12, 6, 10, C.green) + rect(12, -20, 6, 18, C.green) + rect(22, -16, 6, 14, C.green) + rect(2, -26, 26, 3, C.grey) + `</g>` + hand(hx, hy, rS),
    rhand: (hx, hy) => stroke(`M${hx} ${hy}L${hx + 8} ${hy - 16}`, C.dark, 3) + hand(hx, hy, rS) }));
  return frame(g.join(""), "#E6EDD8");
}

/* ---------- Scène 3 : au laboratoire ---------- */
/** Efface le stéthoscope de la blouse (repère local d'un person() avec coat). */
const labCoat = (inner) => stroke("M-14 -205Q-20 -170 -6 -160Q4 -156 8 -170", C.white, 5) + `<circle cx="8" cy="-170" r="5.6" fill="${C.white}"/>` + rect(-3.9, -177, 7.6, 26, inner);
const glasses = stroke("M-14 -237A6 6 0 1 0 -2 -237A6 6 0 1 0 -14 -237ZM2 -237A6 6 0 1 0 14 -237A6 6 0 1 0 2 -237ZM-2 -238H2", C.dark, 1.8);
function labo() {
  const g = [];
  // Mur : soubassement, tenture en ndop, frise en wax
  g.push(rect(0, 0, 800, 44, C.indigo), rect(0, 0, 800, 44, "url(#wax1)", ' opacity=".55"'), rect(0, 44, 800, 6, C.ocre));
  g.push(rect(30, 92, 96, 200, "#1C2756"), rect(30, 92, 96, 200, "url(#ndop)"), rect(22, 84, 112, 10, C.wood2, ' rx="4"'));
  for (let k = 0; k < 6; k++) g.push(stroke(`M${37 + k * 16.4} 292V306`, "#1C2756", 4));
  // Étagère : flacons et classeurs
  g.push(`<g transform="translate(-6 -22)">`, rect(176, 214, 228, 9, C.wood2), rect(176, 128, 228, 9, C.wood2));
  for (const [bx, w, h, c] of [[184, 16, 66, C.terra], [202, 16, 72, C.green], [220, 14, 60, C.ocre], [238, 16, 70, C.indigo]]) g.push(rect(bx, 128 - h, w, h, c, ' rx="2"'), rect(bx + 3, 128 - h + 12, w - 6, 6, C.white, ' opacity=".7"'));
  const flask = (x, y, h, liq) => `<path d="M${x - 5} ${y - h}H${x + 5}V${y - h * 0.55}L${x + h * 0.32} ${y - 4}Q${x + h * 0.34} ${y} ${x + h * 0.28} ${y}H${x - h * 0.28}Q${x - h * 0.34} ${y} ${x - h * 0.32} ${y - 4}L${x - 5} ${y - h * 0.55}Z" fill="${C.white}" opacity=".9"/>` +
    `<path d="M${f(x - h * 0.2)} ${f(y - h * 0.3)}H${f(x + h * 0.2)}L${f(x + h * 0.3)} ${y - 3}H${f(x - h * 0.3)}Z" fill="${liq}"/>`;
  g.push(flask(290, 128, 50, C.green), flask(340, 128, 40, C.ocre), flask(380, 128, 34, C.terra), flask(212, 214, 44, C.blue), flask(262, 214, 36, C.leaf));
  g.push(`<circle cx="316" cy="196" r="14" fill="${C.white}" opacity=".9"/>`, rect(311, 170, 10, 18, C.white, ' opacity=".9"'), `<path d="M303 200A14 14 0 0 0 329 200Z" fill="${C.terra}"/>`, rect(350, 176, 40, 38, C.sand, ' rx="3"'), rect(356, 186, 28, 6, C.wood2), `</g>`);
  // Écran : molécule et courbe
  g.push(`<g transform="translate(133 -6) scale(.84)">`);
  g.push(rect(438, 74, 316, 206, C.dark, ' rx="10"'), rect(450, 86, 292, 182, C.white, ' rx="4"'), rect(588, 280, 16, 26, C.grey), rect(566, 302, 60, 6, C.grey, ' rx="3"'));
  const atoms = [[500, 140, C.terra], [540, 118, C.indigo], [580, 140, C.indigo], [580, 184, C.green], [540, 206, C.indigo], [500, 184, C.ocre], [620, 118, C.terra], [460, 118, C.green]];
  for (const [i, j] of [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [2, 6], [0, 7]]) g.push(stroke(`M${atoms[i][0]} ${atoms[i][1]}L${atoms[j][0]} ${atoms[j][1]}`, C.grey, 4));
  for (const [ax, ay, c] of atoms) g.push(`<circle cx="${ax}" cy="${ay}" r="${c === C.indigo ? 11 : 9}" fill="${c}"/>`);
  g.push(stroke("M650 250V140M650 250H730", C.grey, 2), stroke("M654 236Q672 230 684 206Q696 178 708 168Q718 160 728 158", C.green, 3.5));
  for (const [bx, h] of [[660, 18], [676, 30], [692, 24], [708, 44]]) g.push(rect(bx, 248 - h, 10, h, C.ocre, ' opacity=".7"'));
  g.push(rect(460, 238, 70, 6, C.sand2, ' rx="3"'), rect(460, 250, 46, 6, C.sand2, ' rx="3"'), `</g>`);
  // La chercheuse au microscope (assise, derrière la paillasse)
  const aS = SKIN.s2, a = { x: 186, y: 566, s: 1.08 };
  g.push(person({ ...a, skin: aS, hair: { type: "boxbraids", beads: C.ocre }, coat: { inner: C.terra }, legs: "none", face: "laugh",
    arms: { l: [[-44, -150], [-30, -116]], r: [[64, -142], [100, -132]] } }));
  g.push(at(a.x, a.y, a.s, false, labCoat(C.terra)));
  // Le chercheur, debout : il lève une éprouvette et explique
  const bS = SKIN.s4, b = { x: 420, y: 560, s: 1.12 };
  g.push(person({ ...b, skin: bS, hair: { type: "short" }, beard: true, hat: { type: "kufi", color: C.green, wax: "kente" }, coat: { inner: C.ocre }, legs: "none", face: "talk",
    arms: { l: [[-48, -150], [-21, -107]], r: [[54, -214], [52, -258]] },
    rhand: (hx, hy) => `<rect x="${hx - 5}" y="${hy - 52}" width="10" height="60" rx="5" fill="${C.white}"/><rect x="${hx - 5}" y="${hy - 22}" width="10" height="30" rx="5" fill="${C.green}"/>` + rect(hx - 7, hy - 56, 14, 6, C.terra, ' rx="2"') + hand(hx, hy, bS) }));
  g.push(at(b.x, b.y, b.s, false, labCoat(C.ocre)));
  // La chercheuse, à droite, montre la courbe à l'écran
  const cS = SKIN.s3, c = { x: 690, y: 562, s: 1.1 };
  g.push(person({ ...c, flip: true, skin: cS, hair: { type: "foulard", color: C.indigo, wax: "wax2" }, coat: { inner: C.green }, legs: "none", face: "smile",
    arms: { l: [[-40, -150], [-18, -126]], r: [[52, -226], [40, -262]] }, point: [10, -380],
    lhand: (hx, hy) => `<g transform="translate(${hx} ${hy}) rotate(-10)"><rect x="-6" y="-30" width="34" height="42" rx="3" fill="${C.wood2}"/><rect x="-2" y="-26" width="26" height="34" fill="${C.white}"/>` + stroke("M2 -18H20M2 -10H20M2 -2H14", C.grey, 2) + `</g>` + hand(hx, hy, cS) }));
  g.push(at(c.x, c.y, c.s, true, labCoat(C.green) + glasses));
  // Paillasse
  g.push(rect(0, 468, 800, 18, C.sand2), rect(0, 484, 800, 6, C.wood2), rect(0, 490, 800, 110, C.steel));
  for (const dx of [20, 220, 420, 620]) g.push(rect(dx, 506, 180, 80, C.white, ' rx="6" opacity=".6"'), rect(dx + 80, 528, 20, 5, C.grey, ' rx="2"'));
  // Microscope : socle, potence à droite, platine, tube incliné vers la chercheuse
  const mx = 280;
  g.push(rect(mx - 36, 454, 70, 14, C.indigo, ' rx="4"'), stroke(`M${mx + 18} 456Q${mx + 34} 410 ${mx + 14} 366`, C.indigo, 16));
  g.push(rect(mx - 34, 418, 52, 8, C.dark, ' rx="2"'), rect(mx - 22, 412, 28, 6, C.sky), stroke(`M${mx - 4} 404L${mx + 4} 366`, C.grey, 14), rect(mx - 9, 400, 12, 14, C.grey));
  g.push(stroke(`M${mx + 4} 368L${mx - 12} 340`, C.dark, 10), `<circle cx="${mx + 20}" cy="${f(a.y - 132 * a.s)}" r="9" fill="${C.grey}"/>`);
  g.push(hand(a.x + 100 * a.s, a.y - 132 * a.s, aS));
  // Portoir d'éprouvettes
  const tx = 330;
  for (const [k, col] of [[0, C.terra], [1, C.green], [2, C.ocre], [3, C.blue]]) g.push(rect(tx + k * 16, 420, 10, 46, C.white, ' rx="5"'), rect(tx + k * 16, 442 + k * 3, 10, 24 - k * 3, col, ' rx="5"'));
  g.push(rect(tx - 6, 438, 72, 8, C.wood, ' rx="2"'), rect(tx - 6, 460, 72, 8, C.wood, ' rx="2"'), hand(b.x - 21 * b.s, b.y - 107 * b.s, bS));
  // Plante médicinale (artémisia) dans son pot, étiquetée
  const px = 566, py = 38;
  g.push(stroke(`M${px} ${390 + py}Q${px - 4} ${340 + py} ${px - 20} ${310 + py}M${px} ${390 + py}Q${px + 4} ${330 + py} ${px + 18} ${300 + py}M${px} ${390 + py}V${320 + py}`, C.leaf2, 3));
  for (const [lx, ly, rot] of [[-22, 312, -30], [-14, 334, -50], [-26, 346, -70], [18, 300, 30], [14, 326, 50], [24, 340, 70], [0, 318, 0], [-4, 346, -20], [6, 356, 20], [-30, 324, -60], [30, 318, 60]])
    g.push(`<ellipse cx="${px + lx}" cy="${ly + py}" rx="5" ry="12" transform="rotate(${rot} ${px + lx} ${ly + py})" fill="${C.leaf}"/>`);
  g.push(`<path d="M${px - 30} ${384 + py}H${px + 30}L${px + 24} 468H${px - 24}Z" fill="${C.terra}"/>`, rect(px - 34, 380 + py, 68, 10, C.terra, ' rx="3"'), rect(px - 14, 438, 28, 14, C.white, ' rx="2"'), stroke(`M${px - 9} 445H${px + 9}`, C.grey, 2));
  // Erlenmeyer à droite, carnet à gauche
  g.push(flask(762, 468, 56, C.terra), `<g transform="translate(70 458) rotate(-6)"><rect x="-30" y="-14" width="64" height="18" rx="2" fill="${C.ocre}"/><rect x="-26" y="-12" width="56" height="4" fill="${C.white}" opacity=".7"/></g>`);
  return frame(g.join(""), "#E4EAF1");
}

export default [
  { id: "solaire", fr: "Installation solaire", en: "Solar installation",
    tags: ["solaire", "panneaux solaires", "énergie", "électricité", "lumière", "ampoule", "toit de tôle", "village", "technicienne", "casque", "gilet", "famille", "solar", "solar panels", "energy", "electricity", "light", "bulb", "roof", "technician", "family"], draw: solaire },
  { id: "cacao", fr: "Coopérative de cacao", en: "Cocoa cooperative",
    tags: ["cacao", "coopérative", "fèves", "cabosses", "cacaoyer", "séchage", "claie", "balance", "pesée", "tablette", "agricultrice", "agriculteur", "plantation", "cocoa", "cooperative", "beans", "pods", "drying", "scale", "farmer", "tablet"], draw: cacao },
  { id: "labo", fr: "Au laboratoire", en: "In the lab",
    tags: ["laboratoire", "recherche", "science", "chercheuse", "chercheur", "blouse", "microscope", "éprouvette", "molécule", "plante médicinale", "pharmacopée", "ndop", "lab", "laboratory", "research", "scientist", "researcher", "test tube", "molecule", "medicinal plant"], draw: labo },
];
