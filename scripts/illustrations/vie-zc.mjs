// Scènes : le studio photo du quartier, l'électricienne, la maison en construction.
// Chaque objet (meuble, outil, mur, personnage et ce qu'il tient) est regroupé dans son propre <g>.
import { C, SKIN, person, frame, cloud, palm, plant, bubble, check, stroke, f } from "./lib.mjs";

/** Un objet = un groupe. */
const G = (...p) => `<g>${p.join("")}</g>`;
/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${f(r)}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
const shadow = (x, y, rx) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(rx * 0.16)}" fill="${C.dark}" opacity=".13"/>`;
/** Position, dans la scène, d'un point du repère local d'un personnage. */
const loc = (P, lx, ly) => [P.x + (P.flip ? -lx : lx) * P.s, P.y + ly * P.s];

/* ---------- Scène 1 : le studio photo du quartier ---------- */
function photographe() {
  const g = [];
  // Mur, plinthe et parquet
  g.push(G(rect(0, 0, 800, 470, C.sand), rect(0, 0, 800, 470, C.ocre, ' opacity=".08"'), rect(0, 452, 800, 18, C.wood2, ' opacity=".35"')));
  g.push(G(rect(0, 470, 800, 130, C.wood), `<path d="${[...Array(5)].map((_, i) => `M0 ${492 + i * 24}H800`).join("")}" stroke="${C.wood2}" stroke-width="2" opacity=".35"/>`,
    `<path d="M120 470V492M300 492V516M520 470V492M680 516V540M220 540V564M460 564V588" stroke="${C.wood2}" stroke-width="2" opacity=".35"/>`));

  // Portraits encadrés au mur (silhouettes simples)
  const portrait = (id, x, y, w, h, bg, people, frameCol = C.wood2) => {
    const sil = people.map(([px, py, r, col]) => `<circle cx="${f(px)}" cy="${f(py)}" r="${f(r)}" fill="${col}"/><path d="M${f(px - r * 2.1)} ${f(y + h)}Q${f(px - r * 2)} ${f(py + r * 1.3)} ${f(px)} ${f(py + r * 1.25)}Q${f(px + r * 2)} ${f(py + r * 1.3)} ${f(px + r * 2.1)} ${f(y + h)}Z" fill="${col}"/>`).join("");
    return G(rect(x - 6, y - 6, w + 12, h + 12, frameCol, ' rx="3"'), `<clipPath id="photographe-${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>`,
      `<g clip-path="url(#photographe-${id})">${rect(x, y, w, h, bg)}${sil}</g>`);
  };
  g.push(portrait("p1", 640, 64, 54, 70, C.indigo, [[667, 92, 10, C.sand2]]));
  g.push(portrait("p2", 712, 64, 50, 70, C.terra, [[737, 94, 9, C.dark]], C.dark));
  g.push(portrait("p3", 640, 156, 122, 76, C.green, [[670, 186, 9, C.sand], [702, 180, 10, C.cream], [734, 188, 8, C.sand]], C.wood));
  g.push(portrait("p4", 44, 54, 120, 62, C.ocre, [[78, 80, 8, C.wood2], [104, 76, 9, C.dark], [132, 82, 7, C.wood2]], C.dark));

  // Toile de fond peinte sur ses deux pieds : ciel, colline, palmiers, lac ; elle se déroule au sol
  g.push(G(rect(196, 58, 8, 412, C.steel), rect(600, 58, 8, 412, C.steel), stroke("M200 470L182 476M200 470L218 476M604 470L586 476M604 470L622 476", C.steel, 5),
    rect(190, 58, 424, 12, C.dark, ' rx="6"')));
  g.push(G(`<clipPath id="photographe-toile"><rect x="210" y="70" width="388" height="400"/></clipPath>`,
    `<g clip-path="url(#photographe-toile)">${rect(210, 70, 388, 400, C.sky)}${rect(210, 70, 388, 140, C.blue, ' opacity=".35"')}<circle cx="290" cy="146" r="32" fill="${C.yellow}"/><circle cx="290" cy="146" r="48" fill="${C.yellow}" opacity=".25"/>${cloud(370, 110, 0.8)}${cloud(470, 220, 0.6)}`
    + `<path d="M210 330Q310 250 410 300Q500 240 598 290V470H210Z" fill="${C.leaf}" opacity=".7"/><path d="M210 360Q340 310 460 350Q540 330 598 345V470H210Z" fill="${C.leaf2}"/>`
    + `<path d="M210 392Q404 372 598 392V420Q404 404 210 420Z" fill="${C.blue}" opacity=".7"/>${palm(250, 380, 0.55, 12)}${palm(570, 372, 0.5, -10)}${rect(210, 420, 388, 50, C.leaf2)}</g>`,
    `<path d="M210 470H598L626 570H182Z" fill="${C.leaf2}"/><path d="M210 470H598L602 486H206Z" fill="${C.dark}" opacity=".12"/>`));

  // Parapluie de flash sur son pied, le flash qui part
  g.push(G(stroke("M164 248V552M164 552L134 566M164 552L194 566M164 552V568", C.dark, 5),
    `<path d="M112 128Q30 238 112 348Q92 238 112 128Z" fill="${C.white}"/><path d="M112 128Q60 238 112 348" fill="none" stroke="${C.steel}" stroke-width="2"/>`,
    stroke("M112 128L70 238L112 348M112 128V348", C.steel, 1.6), stroke("M78 238H182", C.dark, 4),
    rect(140, 226, 40, 26, C.dark, ' rx="4"'), rect(134, 230, 8, 18, C.yellow),
    stroke("M126 150L146 136M118 196L140 190M118 280L140 286M126 326L146 340", C.yellow, 4)));

  // Plante en pot dans le coin
  g.push(G(plant(62, 520, 1.3)));

  // La famille qui pose : les parents derrière, les enfants devant, les mains des parents sur leurs épaules
  const girl = { x: 300, y: 560, s: 0.66 }, boy = { x: 554, y: 560, s: 0.68 };
  const papa = { x: 380, y: 544, s: 0.95 }, mama = { x: 478, y: 544, s: 0.92 };
  const [gsx, gsy] = loc(girl, 20, -188), [bsx, bsy] = loc(boy, -20, -188);
  g.push(G(shadow(380, 546, 46), person({ ...papa, skin: SKIN.s2, robe: "agbada", top: C.indigo, bottom: C.indigo, hat: { type: "kufi", color: C.ocre, wax: "kente" }, beard: true, face: "smile",
    arms: { l: [[-52, -156], [(gsx - papa.x) / papa.s, (gsy - papa.y) / papa.s]], r: [[44, -150], [30, -118]] } })));
  g.push(G(shadow(478, 546, 50), person({ ...mama, skin: SKIN.s4, robe: "kaba", top: C.terra, wax: "wax2", hair: { type: "gele", color: C.ocre, wax: "wax3" }, face: "laugh",
    arms: { l: [[-40, -150], [-30, -120]], r: [[54, -156], [(bsx - mama.x) / mama.s, (bsy - mama.y) / mama.s]] } })));
  g.push(G(shadow(300, 562, 32), person({ ...girl, skin: SKIN.s3, hair: { type: "bantu" }, robe: "dress", top: C.green, wax: "kitenge", face: "laugh" }), hand(gsx, gsy, SKIN.s2, 7.1)));
  g.push(G(shadow(554, 562, 32), person({ ...boy, skin: SKIN.s1, hair: { type: "short" }, top: C.ocre, dashiki: C.indigo, bottom: C.dark, sleeve: "short", face: "smile" }), hand(bsx, bsy, SKIN.s4, 6.9)));

  // Le photographe (chemise wax) derrière son appareil sur trépied, qui fait signe de regarder l'objectif
  const P = { x: 706, y: 562, s: 1 }, psk = SKIN.s5;
  const [lhx, lhy] = loc(P, -78, -206);
  g.push(G(shadow(706, 564, 40), person({ ...P, skin: psk, hair: { type: "short" }, beard: true, top: C.terra, wax: "wax1", sleeve: "short", bottom: C.dark, face: "talk",
    arms: { l: [[-58, -168], [-78, -206]], r: [[52, -214], [48, -258]] }, point: [50, -300] }),
    G(stroke(`M632 362L594 564M632 362L634 570M632 362L670 562`, C.dark, 4.5), rect(622, 356, 20, 10, C.dark),
      rect(600, 318, 70, 42, C.dark, ' rx="6"'), `<path d="M616 318L622 306H646L652 318Z" fill="${C.dark}"/>`, rect(574, 324, 28, 30, C.grey, ' rx="4"'),
      `<ellipse cx="574" cy="339" rx="5" ry="15" fill="${C.indigo}"/><ellipse cx="573" cy="335" rx="2" ry="5" fill="${C.white}" opacity=".6"/>`, rect(656, 322, 10, 6, C.red, ' rx="2"')),
    hand(lhx, lhy, psk)));

  // Le flash qui crépite : une bulle « on sourit »
  g.push(G(bubble(560, 170, `<circle r="15" fill="${C.white}"/><path d="M-7 2Q0 10 7 2" fill="none" stroke="${C.ocre}" stroke-width="3" stroke-linecap="round"/><circle cx="-5" cy="-4" r="2" fill="${C.ocre}"/><circle cx="5" cy="-4" r="2" fill="${C.ocre}"/>`, C.ocre)));
  return frame(g.join(""), C.sand);
}

/* ---------- Scène 2 : l'électricienne ---------- */
function electricienne() {
  const g = [];
  // Ciel du soir, étoiles, lune
  g.push(G(`<linearGradient id="electricienne-ciel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.blue}"/><stop offset=".55" stop-color="${C.rose}"/><stop offset="1" stop-color="${C.yellow}"/></linearGradient>`,
    `<linearGradient id="electricienne-nuit" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.dark}" stop-opacity=".5"/><stop offset=".6" stop-color="${C.dark}" stop-opacity="0"/></linearGradient>`,
    rect(0, 0, 800, 500, "url(#electricienne-ciel)"), rect(0, 0, 800, 500, "url(#electricienne-nuit)"),
    `<path d="M560 52a20 20 0 1 0 22 26a16 16 0 1 1 -22 -26Z" fill="${C.white}" opacity=".9"/>`,
    [[60, 40], [210, 70], [300, 30], [470, 60], [760, 40], [400, 110], [240, 140]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="${C.white}" opacity=".85"/>`).join("")));
  // Quartier au loin : maisons sombres, fenêtres allumées, palmier
  g.push(G(`<path d="M0 410H70V380L110 356L150 380V410H210V392H260V500H0Z" fill="${C.indigo}" opacity=".55"/>`, rect(20, 420, 14, 14, C.yellow), rect(90, 396, 14, 16, C.yellow), rect(226, 410, 12, 14, C.yellow, ' opacity=".8"'),
    `<g opacity=".55">${palm(230, 420, 0.7, 8)}</g>`));
  // Sol de terre rouge et chemin
  g.push(G(rect(0, 496, 800, 104, C.wood), rect(0, 496, 800, 104, C.terra, ' opacity=".25"'), `<path d="M380 600Q470 540 600 520H680Q600 560 560 600Z" fill="${C.sand2}" opacity=".6"/>`));

  // Le poteau électrique en bois, ses isolateurs et les câbles
  g.push(G(rect(118, 70, 16, 440, C.wood2), rect(118, 70, 6, 440, C.dark, ' opacity=".15"'), rect(76, 96, 100, 10, C.wood2),
    [86, 116, 164].map((x) => rect(x - 4, 82, 8, 14, C.white, ' rx="3"')).join(""), stroke("M126 500L110 512M126 500L142 512", C.wood2, 6)));
  g.push(G(stroke("M-10 120Q40 130 86 84", C.dark, 2.2), stroke("M-10 132Q50 140 116 84", C.dark, 2.2), stroke("M164 84Q300 190 426 236", C.dark, 2.6), stroke("M116 84Q300 210 426 240", C.dark, 2.2, ' opacity=".7"')));

  // La maison : murs, toit de tôle, fenêtre et porte éclairées, ampoule de la véranda
  g.push(G(`<path d="M336 240L398 160H742L792 240Z" fill="${C.steel}"/><path d="${[...Array(12)].map((_, i) => `M${410 + i * 28} 162L${388 + i * 33} 238`).join("")}" stroke="${C.grey}" stroke-width="2" opacity=".6"/>`,
    rect(330, 236, 466, 8, C.grey), rect(356, 244, 420, 272, C.cream), rect(356, 244, 420, 272, C.ocre, ' opacity=".12"'), rect(356, 496, 420, 20, C.terra, ' opacity=".35"')));
  // Fenêtre allumée (la lumière reste dans le cadre)
  g.push(G(rect(470, 318, 86, 86, C.wood2), rect(476, 324, 74, 74, C.yellow), `<circle cx="513" cy="340" r="9" fill="${C.white}" opacity=".8"/>`, rect(511, 324, 4, 74, C.wood2), rect(476, 359, 74, 4, C.wood2)));
  // Porte ouverte sur l'intérieur éclairé
  g.push(G(rect(604, 292, 88, 224, C.wood2), rect(610, 298, 76, 218, C.yellow), rect(610, 298, 76, 218, C.ocre, ' opacity=".35"'), `<path d="M610 298L586 308V510L610 516Z" fill="${C.wood}"/>`));
  // Ampoule de la véranda qui vient de s'allumer
  g.push(G(`<circle cx="648" cy="268" r="30" fill="${C.yellow}" opacity=".25"/><circle cx="648" cy="268" r="18" fill="${C.yellow}" opacity=".4"/>`, stroke("M648 244V256", C.dark, 2), rect(643, 254, 10, 6, C.grey), `<circle cx="648" cy="266" r="8" fill="${C.yellow}"/><circle cx="646" cy="264" r="3" fill="${C.white}"/>`,
    stroke("M622 254L614 248M674 254L682 248M620 276L612 280M676 276L684 280", C.yellow, 3)));
  // Le compteur et sa gaine
  g.push(G(stroke("M426 238V262", C.dark, 4), rect(400, 262, 50, 60, C.white, ' rx="4"'), rect(410, 262, 50, 60, C.steel, ' rx="4" opacity=".35"'), rect(408, 272, 34, 16, C.dark, ' rx="2"'),
    `<path d="M412 276h6M422 276h6M432 276h6" stroke="${C.yellow}" stroke-width="3"/>`, `<circle cx="425" cy="304" r="7" fill="${C.green}"/>`, stroke("M425 322V356Q425 364 436 364H470", C.dark, 3)));

  // L'échelle contre le mur
  const L = { b: 532, t: 232, xl0: 312, xl1: 360, w: 38 };
  const rail = (y) => L.xl0 + ((L.b - y) / (L.b - L.t)) * (L.xl1 - L.xl0);
  const rungs = [];
  for (let y = 500; y > L.t + 10; y -= 34) rungs.push(rect(rail(y) + 2, y - 3, L.w - 4, 6, C.wood));
  g.push(G(stroke(`M${L.xl0} ${L.b}L${L.xl1} ${L.t}`, C.wood2, 7), stroke(`M${L.xl0 + L.w} ${L.b}L${L.xl1 + L.w} ${L.t}`, C.wood2, 7), rungs.join("")));

  // L'électricienne en combinaison et casque, debout sur l'échelle, qui branche le compteur
  const ry = 500 - 34 * 2; // le barreau où elle se tient
  const E = { x: rail(ry) + L.w / 2, y: ry - 2, s: 0.74 }, esk = SKIN.s2;
  const [ehx, ehy] = [414, 306];
  g.push(G(person({ ...E, skin: esk, hair: { type: "boxbraids", beads: C.ocre }, hat: { type: "helmet", color: C.yellow }, top: C.green, bottom: C.green, shoes: C.dark, face: "smile",
    arms: { l: [[-42, -150], [-36, -114]], r: [[62, -182], [(ehx - E.x) / E.s, (ehy - E.y) / E.s]] },
    lhand: (hx, hy) => `<circle cx="${hx}" cy="${hy + 14}" r="14" fill="none" stroke="${C.dark}" stroke-width="5"/><circle cx="${hx}" cy="${hy + 14}" r="8" fill="none" stroke="${C.red}" stroke-width="3"/>` + hand(hx, hy, esk) }),
    at(E.x, E.y, E.s, false, stroke("M0 -204V-120", C.dark, 2, ' opacity=".35"') + rect(-28, -124, 56, 10, C.dark) + rect(10, -122, 16, 22, C.wood, ' rx="3"') + rect(14, -134, 3, 14, C.red) + rect(19, -132, 3, 12, C.yellow) + rect(-24, -186, 14, 12, C.ocre, ' opacity=".9"')),
    `<path d="M${ehx} ${ehy}L${ehx + 8} ${ehy - 12}" stroke="${C.red}" stroke-width="4" stroke-linecap="round"/><path d="M${ehx + 8} ${ehy - 12}L${ehx + 11} ${ehy - 17}" stroke="${C.steel}" stroke-width="2.5"/>`, hand(ehx, ehy, esk, 6)));

  // L'apprenti qui tient l'échelle et la caisse à outils
  const A = { x: 268, y: 552, s: 0.77 }, ask = SKIN.s4;
  const ay = 448, [axr] = [rail(ay) + 3];
  g.push(G(shadow(266, 554, 32), person({ ...A, skin: ask, hair: { type: "short" }, hat: { type: "cap", color: C.terra }, top: C.ocre, wax: "wax3", sleeve: "short", bottom: C.indigo, face: "talk",
    arms: { l: [[-44, -150], [-46, -108]], r: [[48, -150], [(axr - A.x) / A.s, (ay - A.y) / A.s]] },
    lhand: (hx, hy) => `<g transform="translate(${hx} ${hy})">${stroke("M-10 2V-4H10V2", C.dark, 3)}${rect(-26, 2, 52, 30, C.red, ' rx="3"')}${rect(-26, 2, 52, 8, C.dark, ' opacity=".25"')}${rect(-4, 14, 8, 6, C.steel)}</g>` + hand(hx, hy, ask) })));

  // L'habitant (boubou, kufi) qui lève les bras de joie, et sa petite fille
  g.push(G(shadow(660, 552, 36), person({ x: 660, y: 548, s: 0.8, skin: SKIN.s1, robe: "boubou", top: C.indigo, wax: "ndop", hat: { type: "kufi", color: C.terra }, beard: true, face: "laugh",
    arms: { l: [[-48, -212], [-40, -256]], r: [[48, -212], [42, -256]] } })));
  g.push(G(shadow(560, 556, 24), person({ x: 560, y: 554, s: 0.5, skin: SKIN.s3, hair: { type: "puffs" }, robe: "dress", top: C.terra, wax: "wax1", face: "laugh",
    arms: { l: [[-30, -164], [-6, -184]], r: [[30, -164], [6, -184]] } })));

  // La bulle : la lumière est revenue
  g.push(G(bubble(680, 116, `<path d="M-10 -4A12 12 0 1 1 10 -4Q6 2 6 8H-6Q-6 2 -10 -4Z" fill="${C.white}"/>${rect(-6, 10, 12, 4, C.white, ' rx="1"')}${rect(-4, 16, 8, 3, C.white, ' rx="1"')}`, C.ocre)));
  return frame(g.join(""), C.rose);
}

/* ---------- Scène 3 : la maison en construction ---------- */
function chantier() {
  const g = [];
  // Ciel, nuages, soleil
  g.push(G(rect(0, 0, 800, 470, C.sky), `<circle cx="96" cy="86" r="30" fill="${C.yellow}"/><circle cx="96" cy="86" r="46" fill="${C.yellow}" opacity=".25"/>`, cloud(220, 80, 1), cloud(560, 60, 0.8)));
  // Manguier et palmier derrière le chantier
  g.push(G(rect(70, 300, 18, 180, C.wood2), `<circle cx="80" cy="280" r="62" fill="${C.leaf2}"/><circle cx="40" cy="306" r="40" fill="${C.leaf2}"/><circle cx="124" cy="300" r="42" fill="${C.leaf}"/><circle cx="84" cy="236" r="40" fill="${C.leaf}"/>`,
    [[60, 300], [110, 270], [96, 320], [50, 262]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="7" fill="${C.ocre}"/>`).join("")));
  g.push(G(palm(752, 470, 0.9, -12)));
  // Sol de terre rouge
  g.push(G(rect(0, 466, 800, 134, C.sand2), rect(0, 466, 800, 134, C.terra, ' opacity=".3"'), `<path d="M0 466H800V474Q400 482 0 474Z" fill="${C.wood2}" opacity=".2"/>`));

  // Les murs en parpaings, montés à moitié (fenêtre réservée, linteau, fers d'attente)
  const wall = "M254 470V232H430V330H742V470ZM302 300V390H382V300Z";
  g.push(G(`<pattern id="chantier-bloc" x="260" y="470" width="44" height="44" patternUnits="userSpaceOnUse"><rect width="44" height="44" fill="${C.steel}"/><path d="M0 0H44M0 22H44M0 0V22M22 22V44" stroke="${C.grey}" stroke-width="2.4"/><rect x="2" y="2" width="40" height="5" fill="${C.white}" opacity=".18"/><rect x="2" y="24" width="18" height="5" fill="${C.white}" opacity=".18"/><rect x="24" y="24" width="18" height="5" fill="${C.white}" opacity=".18"/></pattern>`,
    `<path d="${wall}" fill="url(#chantier-bloc)" fill-rule="evenodd"/>`, rect(430, 330, 312, 6, C.grey, ' opacity=".5"'), rect(294, 290, 96, 12, C.wood), rect(302, 386, 80, 4, C.grey),
    stroke("M260 232V202M424 232V200M436 330V304M736 330V302", C.grey, 4)));

  // Échafaudage en bois devant le grand pan de mur, avec un seau de mortier
  g.push(G(stroke("M270 476L274 254M414 476L410 252", C.wood2, 9), stroke("M274 300L410 420M410 300L274 420", C.wood, 5), rect(258, 286, 170, 10, C.wood), rect(258, 296, 170, 4, C.wood2),
    `<path d="M378 262H404L400 286H382Z" fill="${C.dark}"/><ellipse cx="391" cy="263" rx="13" ry="4" fill="${C.grey}"/>`, stroke("M380 262Q391 248 402 262", C.dark, 2),
    rect(286, 266, 40, 20, C.steel), rect(286, 266, 40, 20, "none", ` stroke="${C.grey}" stroke-width="2"`)));

  // Le maçon, derrière le mur, qui pose un bloc avec la truelle
  const M = { x: 490, y: 474, s: 0.9 }, msk = SKIN.s4;
  const [bhx, bhy] = loc(M, -42, -182), [thx, thy] = loc(M, 46, -176);
  g.push(G(`<clipPath id="chantier-derriere"><rect x="400" y="0" width="340" height="331"/></clipPath>`,
    `<g clip-path="url(#chantier-derriere)">${person({ ...M, skin: msk, hair: { type: "short" }, hat: { type: "helmet", color: C.yellow }, top: C.green, wax: "kitenge", sleeve: "short", bottom: C.dark, face: "smile",
      arms: { l: [[-50, -158], [-42, -182]], r: [[52, -150], [46, -176]] } })}</g>`,
    rect(442, 306, 44, 22, C.steel), rect(442, 306, 44, 22, "none", ` stroke="${C.grey}" stroke-width="2"`), rect(442, 326, 58, 5, C.grey),
    hand(bhx, bhy, msk, 6.8), `<path d="M${f(thx)} ${f(thy)}L${f(thx - 14)} ${f(thy + 14)}" stroke="${C.wood}" stroke-width="5" stroke-linecap="round"/><path d="M${f(thx - 10)} ${f(thy + 10)}L${f(thx - 38)} ${f(thy + 22)}L${f(thx - 18)} ${f(thy + 32)}Z" fill="${C.dark}"/><path d="M${f(thx - 14)} ${f(thy + 14)}L${f(thx - 32)} ${f(thy + 22)}" stroke="${C.white}" stroke-width="1.6" opacity=".5"/>`, hand(thx, thy, msk, 6.8)));

  // Tas de sable, sacs de ciment sans marque
  g.push(G(`<path d="M10 520Q30 446 92 440Q150 444 176 520Z" fill="${C.sand}"/><path d="M40 488Q80 470 120 480" stroke="${C.sand2}" stroke-width="4" fill="none"/>`, stroke("M150 460L122 520", C.wood2, 4)));
  const bag = (x, y) => `<path d="M${x} ${y}H${x + 58}Q${x + 62} ${y + 12} ${x + 58} ${y + 24}H${x}Q${x - 4} ${y + 12} ${x} ${y}Z" fill="${C.cream}"/>${rect(x + 4, y + 9, 50, 6, C.ocre, ' opacity=".6"')}`;
  g.push(G(bag(462, 452), bag(524, 452), bag(494, 428)));

  // Le gâcheur qui mélange le mortier à la pelle
  const B = { x: 156, y: 548, s: 0.95 }, bsk = SKIN.s1;
  const [p1x, p1y] = loc(B, -12, -150), [p2x, p2y] = loc(B, 26, -100);
  const dx = p2x - p1x, dy = p2y - p1y;
  g.push(G(`<path d="M190 548Q200 496 236 490Q276 492 286 548Z" fill="${C.grey}"/><path d="M206 512Q236 500 270 514" stroke="${C.steel}" stroke-width="4" fill="none"/>`, rect(272, 520, 30, 30, C.blue, ' rx="3"'), `<ellipse cx="287" cy="520" rx="15" ry="4" fill="${C.sky}"/>`));
  g.push(G(shadow(156, 550, 36), person({ ...B, skin: bsk, hair: { type: "rase" }, hat: { type: "cap", color: C.terra }, top: C.ocre, wax: "wax2", sleeve: "short", bottom: C.indigo, face: "laugh",
    arms: { l: [[-42, -160], [-12, -150]], r: [[46, -140], [26, -100]] } }),
    stroke(`M${f(p1x - dx * 0.6)} ${f(p1y - dy * 0.6)}L${f(p2x + dx * 1.5)} ${f(p2y + dy * 1.5)}`, C.wood, 5),
    `<g transform="translate(${f(p2x + dx * 1.5)} ${f(p2y + dy * 1.5)}) rotate(${f((Math.atan2(dy, dx) * 180) / Math.PI - 90)})"><path d="M-12 0H12L10 24Q0 32 -10 24Z" fill="${C.steel}"/></g>`,
    hand(p1x, p1y, bsk, 7.1), hand(p2x, p2y, bsk, 7.1)));

  // La brouette pleine de sable
  g.push(G(stroke("M338 512L300 498M342 528L304 516", C.dark, 5), `<path d="M332 500H448L434 536H348Z" fill="${C.green}"/><path d="M336 500Q390 480 444 500Z" fill="${C.sand}"/>`,
    stroke("M356 536L350 556M416 536L432 550", C.dark, 4), `<circle cx="436" cy="552" r="14" fill="${C.dark}"/><circle cx="436" cy="552" r="5" fill="${C.grey}"/>`));

  // La cheffe de chantier (casque, gilet, plan) qui explique au propriétaire
  const K = { x: 604, y: 566, s: 1, flip: true }, ksk = SKIN.s3;
  g.push(G(shadow(604, 568, 40), person({ ...K, skin: ksk, hair: { type: "fulani", beads: C.ocre }, hat: { type: "helmet", color: C.white }, top: C.indigo, wax: "wax3", bottom: C.dark, face: "talk",
    arms: { r: [[52, -188], [74, -212]], l: [[-44, -164], [-50, -150]] }, point: [124, -240],
    lhand: (hx, hy) => `<g transform="translate(${hx} ${hy}) rotate(-8)">${rect(-42, -44, 46, 60, C.blue)}${stroke("M-36 -34H-6M-36 -22H-14M-36 -10H-6M-36 2H-20", C.white, 2)}${rect(-34, 4, 16, 8, "none", ` stroke="${C.white}" stroke-width="2"`)}${rect(-44, -46, 4, 64, C.white)}</g>` + hand(hx, hy, ksk) }),
    at(K.x, K.y, K.s, true, `<path d="M-30 -184Q-30 -206 -12 -206L-4 -150V-112H-27ZM30 -184Q30 -206 12 -206L4 -150V-112H27Z" fill="${C.yellow}"/>${rect(-28, -150, 22, 6, C.white, ' opacity=".85"')}${rect(6, -150, 22, 6, C.white, ' opacity=".85"')}`)));

  // Le propriétaire, qui écoute
  g.push(G(shadow(712, 568, 40), person({ x: 712, y: 566, s: 1, skin: SKIN.s2, hair: { type: "short" }, beard: true, top: C.terra, wax: "ndop", bottom: C.sand2, shoes: C.wood2, sleeve: "short", face: "smile", hat: { type: "kufi", color: C.indigo },
    arms: { l: [[-44, -150], [-34, -120]], r: [[38, -150], [34, -112]] } })));

  // La bulle : la maison de la famille
  g.push(G(bubble(660, 110, `<path d="M-15 -1L0 -14L15 -1V14H-15Z" fill="${C.white}"/>${rect(-4, 4, 8, 10, C.green)}`, C.green)));
  return frame(g.join(""), C.sky);
}

export default [
  { id: "photographe", fr: "Le studio photo du quartier", en: "The neighbourhood photo studio", tags: ["photographe", "photographer", "studio", "photo", "famille", "family", "portrait", "agbada", "gele", "appareil", "camera"], draw: photographe },
  { id: "electricienne", fr: "L'électricienne", en: "The electrician", tags: ["électricienne", "electrician", "électricité", "electricity", "compteur", "meter", "ampoule", "light bulb", "échelle", "ladder", "soir", "evening", "apprenti", "apprentice"], draw: electricienne },
  { id: "chantier", fr: "La maison en construction", en: "Building a house", tags: ["chantier", "construction site", "maison", "house", "maçon", "mason", "parpaings", "blocks", "brouette", "wheelbarrow", "cheffe de chantier", "site manager", "ciment", "cement"], draw: chantier },
];
