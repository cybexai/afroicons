// Scènes : l'atelier de couture, l'atelier du menuisier, la pharmacie du quartier.
import { C, SKIN, person, frame, cloud, bubble, stroke, f } from "./lib.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${r}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
/** Aplat avec un motif par-dessus. */
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");
/** Position dans la scène d'un point local (hx, hy) d'un personnage. */
const toScene = (x, y, s, flip, hx, hy) => [x + (flip ? -hx : hx) * s, y + hy * s];
/** Mètre ruban autour du cou (repère local, buste de face). */
const tape = () => stroke("M-14 -206Q-22 -180 -20 -140M14 -206Q22 -184 22 -150", C.yellow, 5) + stroke("M-20 -170V-166M-20 -156V-152M22 -176V-172M22 -162V-158", C.dark, 1.2);

/* ---------- Scène 1 : l'atelier de couture ---------- */
/** Rouleau de tissu couché, vu de face : (x,y) bas gauche. */
const roll = (x, y, w, r, col, pat) => cloth(`M${x} ${y - 2 * r}H${x + w}V${y}H${x}Z`, col, pat) + rect(x, y - 2 * r, w, 2 * r, "rgba(0,0,0,.08)") +
  `<ellipse cx="${x + w}" cy="${y - r}" rx="${f(r * 0.45)}" ry="${r}" fill="${col}"/><ellipse cx="${x + w}" cy="${y - r}" rx="${f(r * 0.2)}" ry="${f(r * 0.45)}" fill="rgba(0,0,0,.25)"/>`;
/** Pile de pagnes pliés : (x,y) bas gauche. */
const stack = (x, y, w, items) => items.map(([col, pat], i) => cloth(`M${x} ${y - (i + 1) * 12}H${x + w}V${y - i * 12}H${x}Z`, col, pat) + rect(x, y - i * 12 - 3, w, 3, "rgba(0,0,0,.15)")).join("");
/** Robe modèle sur cintre : (x,y) crochet du cintre. */
const dress = (x, y, col, pat) => stroke(`M${x} ${y}V${y + 6}`, C.dark, 2) + stroke(`M${x - 18} ${y + 14}L${x} ${y + 6}L${x + 18} ${y + 14}`, C.dark, 2.4) +
  cloth(`M${x - 12} ${y + 12}H${x + 12}L${x + 22} ${y + 22}L${x + 30} ${y + 40}L${x + 21} ${y + 46}L${x + 17} ${y + 36}L${x + 26} ${y + 110}Q${x} ${y + 116} ${x - 26} ${y + 110}L${x - 17} ${y + 36}L${x - 21} ${y + 46}L${x - 30} ${y + 40}L${x - 22} ${y + 22}Z`, col, pat) +
  `<path d="M${x - 6} ${y + 12}L${x} ${y + 20}L${x + 6} ${y + 12}Z" fill="${C.sand}"/><path d="M${x - 26} ${y + 110}Q${x} ${y + 116} ${x + 26} ${y + 110}L${x + 28} ${y + 118}Q${x} ${y + 124} ${x - 28} ${y + 118}Z" fill="rgba(0,0,0,.18)"/>`;

function couturiere() {
  const g = [];
  // Mur peint, frise, sol carrelé
  g.push(rect(0, 0, 800, 440, C.sand), rect(0, 300, 800, 140, C.ocre, ' opacity=".16"'), rect(0, 296, 800, 6, C.ocre, ' opacity=".5"'));
  g.push(rect(0, 440, 800, 160, C.sand2));
  for (let x = -40; x < 820; x += 70) g.push(stroke(`M${x + 20} 440L${x - 30} 600`, C.wood, 1.4, ' opacity=".25"'));
  for (const y of [478, 530]) g.push(stroke(`M0 ${y}H800`, C.wood, 1.4, ' opacity=".25"'));
  // Étagères de tissus : rouleaux de wax en haut, pagnes pliés en dessous
  g.push(rect(30, 150, 300, 8, C.wood2), rect(30, 238, 300, 8, C.wood2), rect(36, 158, 6, 14, C.wood2), rect(318, 158, 6, 14, C.wood2), rect(36, 246, 6, 14, C.wood2), rect(318, 246, 6, 14, C.wood2));
  [[C.terra, "wax1"], [C.green, "kitenge"], [C.indigo, "ndop"], [C.ocre, "wax2"]].forEach(([c, p], i) => g.push(roll(38 + i * 70, 150, 56, 13, c, p)));
  [[C.yellow, "wax3"], [C.terra, "wax2"], [C.indigo, "wax1"]].forEach(([c, p], i) => g.push(roll(72 + i * 70, 124, 56, 13, c, p)));
  g.push(stack(40, 238, 56, [[C.green, "wax1"], [C.ocre, "kente"], [C.terra, "wax3"], [C.indigo, "wax2"]]));
  g.push(stack(108, 238, 56, [["#5E3E26", "bogolan"], [C.yellow, "wax2"], [C.green, "kitenge"]]));
  g.push(stack(176, 238, 56, [[C.terra, "wax1"], ["#1C2756", "ndop"], [C.ocre, "wax3"], [C.red, null]]));
  g.push(stack(244, 238, 56, [[C.indigo, "wax3"], [C.terra, "kente"]]));
  for (const [x, c] of [[262, C.red], [280, C.yellow], [298, C.blue]]) g.push(rect(x - 6, 196, 12, 18, c, ' rx="2"'), rect(x - 8, 194, 16, 3, C.wood2), rect(x - 8, 213, 16, 3, C.wood2));
  // Tringle des modèles de robes
  g.push(stroke("M366 92H548", C.grey, 4), stroke("M372 92V80M542 92V80", C.grey, 3));
  g.push(dress(398, 92, C.terra, "wax1"), dress(457, 92, "#15110F", "toghu"), dress(516, 92, C.green, "wax3"));
  // Fenêtre sur la rue : ciel, palmier, grille
  g.push(rect(566, 86, 96, 140, C.white), rect(574, 94, 80, 124, C.sky));
  g.push(`<path d="M600 218Q604 170 612 140" fill="none" stroke="${C.wood}" stroke-width="6"/><path d="M612 140Q580 130 574 150Q594 136 612 140ZM612 140Q640 124 654 140Q632 132 612 140ZM612 140Q606 112 620 100Q614 122 612 140Z" fill="${C.leaf}"/>`);
  g.push(stroke("M594 94V218M614 94V218M634 94V218M574 156H654", C.wood2, 3, ' opacity=".8"'), rect(560, 224, 108, 8, C.wood2));

  // Mannequin de couture avec une kaba en cours (épingles)
  g.push(rect(72, 372, 6, 150, C.wood2), stroke("M75 520L50 540M75 520L100 540M75 520V542", C.wood2, 5));
  g.push(`<circle cx="75" cy="256" r="7" fill="${C.wood2}"/>`, `<path d="M58 266H92Q114 270 112 300Q108 330 100 344Q112 360 108 378H42Q38 360 50 344Q42 330 38 300Q36 270 58 266Z" fill="${C.sand2}"/>`);
  g.push(cloth("M50 300Q75 290 100 300Q108 330 100 344Q112 360 110 388Q75 398 40 388Q38 360 50 344Q42 330 50 300Z", C.ocre, "wax2"), stroke("M50 300Q75 290 100 300", C.terra, 3));
  for (const [x, y] of [[58, 304], [92, 304], [76, 342], [56, 384], [96, 384]]) g.push(`<circle cx="${x}" cy="${y}" r="2.4" fill="${C.red}"/>`);

  // La couturière, assise derrière sa table (jambes cachées par la table)
  const kx = 270, ky = 545, ks = 0.95, ksk = SKIN.s3;
  g.push(person({ x: kx, y: ky, s: ks, skin: ksk, legs: "none", hair: { type: "boxbraids", beads: C.ocre }, top: C.green, wax: "wax1", sleeve: "short", face: "calm",
    arms: { l: [[-50, -150], [-27, -129]], r: [[44, -146], [30, -134]] } }));
  g.push(at(kx, ky, ks, false, tape()));
  // La table : plateau vu un peu d'au-dessus, façade pleine avec tiroir
  g.push(`<path d="M150 412H418L428 430H140Z" fill="${C.wood}"/>`, rect(140, 430, 288, 12, C.wood2), rect(146, 442, 276, 103, C.wood2), rect(146, 442, 276, 103, C.dark, ' opacity=".18"'));
  g.push(rect(330, 456, 70, 22, C.wood, ' rx="3"'), rect(356, 464, 18, 5, C.ocre, ' rx="2"'));
  // Le pagne qu'elle coud : sur la table, puis qui retombe devant
  g.push(cloth("M176 414H330L336 430H168Z", C.terra, "wax1"), cloth("M168 430H262Q266 480 254 520L236 512L222 526L206 512L188 522L172 510Q164 470 168 430Z", C.terra, "wax1"), stroke("M196 436Q198 480 192 516M232 436Q236 478 230 514", "rgba(0,0,0,.15)", 3));
  // La machine à coudre électrique (repère : coin bas gauche du socle)
  const mach = [rect(0, -12, 132, 12, C.dark, ' rx="3"'), `<path d="M100 -12V-64Q100 -74 110 -74H126Q134 -74 134 -64V-12Z" fill="${C.dark}"/>`,
    rect(8, -74, 124, 26, C.dark, ' rx="10"'), rect(8, -74, 30, 52, C.dark, ' rx="8"'), stroke("M26 -22V-4", C.steel, 2.4), rect(20, -24, 12, 4, C.steel),
    stroke("M44 -64H96", C.ocre, 2.4), stroke("M44 -58H82", C.ocre, 1.4, ' opacity=".7"'), `<circle cx="23" cy="-60" r="4" fill="${C.yellow}"/>`,
    `<ellipse cx="140" cy="-54" rx="7" ry="18" fill="${C.grey}"/><ellipse cx="140" cy="-54" rx="3" ry="9" fill="${C.dark}"/>`, rect(64, -86, 6, 12, C.steel), rect(56, -92, 22, 8, C.red, ' rx="3"')].join("");
  g.push(`<g transform="translate(300 416) scale(.85)">${mach}</g>`, stroke("M412 410Q440 420 432 445", C.dark, 2.4));
  // Les mains sur le tissu, de part et d'autre du pied-de-biche
  for (const [lx, ly] of [[-27, -129], [30, -134]]) { const [hx, hy] = toScene(kx, ky, ks, false, lx, ly); g.push(hand(hx, hy, ksk, 7.2)); }
  // Ciseaux et bobines sur la table
  g.push(`<g transform="translate(156 420) rotate(-12)">${stroke("M0 0L-16 -3M0 0L-16 4", C.steel, 2.6)}<circle cx="5" cy="-3" r="4" fill="none" stroke="${C.red}" stroke-width="2.4"/><circle cx="5" cy="5" r="4" fill="none" stroke="${C.red}" stroke-width="2.4"/></g>`);
  g.push(rect(146, 400, 10, 16, C.yellow, ' rx="2"'), rect(144, 398, 14, 3, C.wood2), rect(144, 414, 14, 3, C.wood2));
  // Chutes de tissu au sol
  for (const [x, y, r, c, p] of [[120, 556, 10, C.ocre, "wax3"], [330, 562, -20, C.indigo, "wax1"], [440, 566, 30, C.terra, "wax2"]]) g.push(`<g transform="translate(${x} ${y}) rotate(${r})">${cloth("M-14 -4L10 -8L16 4L-8 8Z", c, p)}</g>`);

  // Le grand miroir sur pied, avec le reflet (de dos) de la cliente
  const mirror = "M676 280Q676 244 713 244Q750 244 750 280V552H676Z";
  g.push(`<clipPath id="couturiere-miroir"><path d="${mirror}"/></clipPath>`, `<path d="${mirror}" fill="${C.sky}"/>`);
  g.push(`<g clip-path="url(#couturiere-miroir)">${person({ x: 716, y: 556, s: 0.84, view: "back", skin: SKIN.s2, robe: "kaba", top: C.terra, wax: "wax2", hair: { type: "gele", color: C.ocre, wax: "wax3" },
    arms: { l: [[-46, -160], [-52, -125]], r: [[46, -160], [52, -125]] } })}${stroke("M680 330L750 270M680 380L750 320", C.white, 8, ' opacity=".35"')}</g>`);
  g.push(`<path d="${mirror}" fill="none" stroke="${C.wood}" stroke-width="8"/>`, stroke("M684 552L678 566M742 552L748 566", C.wood2, 6));

  // L'apprenti prend le tour de hanches au mètre ruban
  const ax = 500, ay = 560, as = 0.92, ask = SKIN.s4;
  g.push(person({ x: ax, y: ay, s: as, skin: ask, hair: { type: "nattes" }, top: C.indigo, dashiki: true, sleeve: "short", bottom: C.dark, face: "smile",
    arms: { l: [[-44, -158], [-12, -146]], r: [[62, -160], [72, -112]] } }));
  // La cliente essaie sa kaba
  const cx = 600, cy = 565, cs = 1, csk = SKIN.s2;
  g.push(person({ x: cx, y: cy, s: cs, skin: csk, robe: "kaba", top: C.terra, wax: "wax2", hair: { type: "gele", color: C.ocre, wax: "wax3" }, face: "laugh",
    arms: { l: [[-48, -160], [-54, -124]], r: [[48, -160], [54, -124]] } }));
  // Le ruban autour des hanches, pincé par l'apprenti, qui pend jusqu'au rouleau
  const [rx, ry] = toScene(ax, ay, as, false, 72, -112), [lx, ly] = toScene(ax, ay, as, false, -12, -146);
  g.push(stroke(`M${f(rx)} ${f(ry)}Q600 ${f(ry + 8)} 633 ${f(ry - 2)}`, C.yellow, 5), stroke(`M${f(rx)} ${f(ry)}Q600 ${f(ry + 8)} 633 ${f(ry - 2)}`, C.dark, 1.2, ' stroke-dasharray="1 5"'));
  g.push(stroke(`M${f(rx)} ${f(ry)}Q${f(rx - 20)} ${f(ry + 50)} ${f(lx + 6)} ${f(ly + 6)}`, C.yellow, 4));
  g.push(`<circle cx="${f(lx)}" cy="${f(ly)}" r="10" fill="${C.yellow}"/><circle cx="${f(lx)}" cy="${f(ly)}" r="3.5" fill="${C.dark}"/>`, hand(lx - 4, ly + 4, ask, 6.6), hand(rx, ry, ask, 6.8));
  return frame(g.join(""), C.cream);
}

/* ---------- Scène 2 : l'atelier du menuisier ---------- */
/** Copeau en spirale (réutilisé). */
const curl = `<path d="M0 0Q-11 -9 -2 -15Q10 -18 11 -6Q11 2 3 3Q8 -3 5 -9Q0 -12 -4 -8Q-6 -4 0 0Z" fill="${C.sand}" stroke="${C.ocre}" stroke-width="1.4" stroke-linejoin="round"/>`;
/** Tabouret sculpté (de chef) : (x,y) bas centre, hauteur h. */
const stool = (x, y, h, col = C.wood2) => {
  const t = y - h;
  return `<ellipse cx="${x}" cy="${y - 4}" rx="30" ry="6" fill="${col}"/><path d="M${x - 24} ${y - 6}L${x - 12} ${t + 12}H${x + 12}L${x + 24} ${y - 6}Z" fill="${col}"/>` +
    `<path d="M${x - 8} ${y - 12}L${x} ${y - h / 2 - 2}L${x + 8} ${y - 12}Z" fill="${C.dark}" opacity=".55"/><path d="M${x - 16} ${y - 12}L${x - 12} ${y - h / 2 + 6}L${x - 8} ${y - 12}Z" fill="${C.dark}" opacity=".45"/><path d="M${x + 16} ${y - 12}L${x + 12} ${y - h / 2 + 6}L${x + 8} ${y - 12}Z" fill="${C.dark}" opacity=".45"/>` +
    stroke(`M${x - 14} ${t + 18}L${x - 7} ${t + 24}L${x} ${t + 18}L${x + 7} ${t + 24}L${x + 14} ${t + 18}`, C.ocre, 2) +
    `<ellipse cx="${x}" cy="${t + 8}" rx="31" ry="8" fill="${col}"/><ellipse cx="${x}" cy="${t + 4}" rx="31" ry="8" fill="${C.wood}"/>`;
};
/** Chaise à barreaux : (x,y) pied avant gauche au sol. */
const chair = (x, y, col = C.wood) => stroke(`M${x} ${y}V${y - 54}M${x + 46} ${y}V${y - 54}M${x + 10} ${y - 10}V${y - 120}M${x + 52} ${y - 10}V${y - 120}`, col, 6) +
  `<path d="M${x - 4} ${y - 58}H${x + 52}L${x + 56} ${y - 50}H${x - 2}Z" fill="${C.wood2}"/>` + stroke(`M${x + 10} ${y - 116}H${x + 52}M${x + 10} ${y - 98}H${x + 52}M${x + 10} ${y - 80}H${x + 52}M${x + 2} ${y - 22}H${x + 44}`, col, 5);

function menuisier() {
  const g = [];
  g.push(`<defs><g id="menuisier-copeau">${curl}</g><g id="menuisier-ciseau">${rect(-3, 0, 6, 22, C.wood2, ' rx="2"')}${rect(-2.4, 22, 4.8, 20, C.steel)}</g></defs>`);
  g.push(cloud(620, 60, 0.9), cloud(330, 40, 0.6));
  // Maison voisine : toit de tôle, mur peint, porte bleue
  g.push(`<path d="M560 196L590 176H800V196Z" fill="${C.steel}"/>`, rect(566, 196, 234, 250, C.white), rect(566, 380, 234, 66, C.ocre, ' opacity=".5"'), rect(640, 250, 56, 130, C.blue), rect(720, 240, 52, 60, C.sky), stroke("M746 240V300M720 270H772", C.white, 3));
  // Le manguier derrière l'atelier
  for (const [cx, cy, rx, ry, c] of [[500, 100, 120, 60, C.leaf2], [620, 140, 70, 40, C.leaf], [440, 130, 90, 40, C.leaf]]) g.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${c}"/>`);
  // L'atelier : mur de planches, toit de tôle, poteaux
  g.push(rect(40, 150, 520, 300, C.wood));
  for (let x = 66; x < 560; x += 28) g.push(stroke(`M${x} 150V450`, C.wood2, 2, ' opacity=".45"'));
  g.push(`<path d="M10 154L40 110H570L590 154Z" fill="${C.steel}"/>`);
  for (let x = 50; x < 580; x += 24) g.push(stroke(`M${x} 112L${x - 10} 154`, C.grey, 1.6, ' opacity=".6"'));
  g.push(rect(10, 152, 580, 6, C.grey));
  // Enseigne en pictogrammes : une chaise et une scie
  g.push(rect(236, 162, 140, 46, C.white, ' rx="6"'), rect(236, 162, 140, 46, C.green, ' rx="6" opacity=".12"'));
  g.push(`<g transform="translate(262 202) scale(.32)">${chair(0, 0, C.green)}</g>`, `<path d="M300 176H352L348 194H300Z" fill="${C.grey}"/>`, rect(288, 174, 14, 22, C.terra, ' rx="4"'));
  // Les outils au mur : scie, équerre, marteau, ciseaux à bois, maillet
  g.push(`<path d="M70 228H150L156 248H70Z" fill="${C.steel}"/>`, stroke("M74 248L78 244L82 248L86 244L90 248L94 244L98 248L102 244L106 248L110 244L114 248L118 244L122 248L126 244L130 248L134 244L138 248L142 244L146 248L150 244L154 248", C.grey, 1.4), rect(52, 224, 24, 30, C.wood2, ' rx="6"'));
  g.push(stroke("M180 222V296H218", C.steel, 6), `<circle cx="180" cy="220" r="2" fill="${C.dark}"/>`);
  g.push(rect(396, 222, 6, 60, C.wood2, ' rx="2"'), rect(384, 216, 30, 12, C.grey, ' rx="2"'));
  for (const x of [430, 446, 462, 478]) g.push(`<use href="#menuisier-ciseau" x="${x}" y="224"/>`);
  g.push(rect(420, 220, 70, 4, C.wood2));
  g.push(rect(512, 228, 6, 50, C.wood2), rect(500, 216, 30, 18, C.wood2, ' rx="4"'));
  // Planches appuyées contre le mur
  g.push(`<path d="M52 446L72 250H82L64 446Z" fill="${C.sand2}"/><path d="M68 446L94 256H106L82 446Z" fill="${C.wood}"/><path d="M86 446L104 262H116L100 446Z" fill="${C.sand2}"/>`, stroke("M70 300L86 302M90 360L100 362", C.wood2, 1.4));
  g.push(rect(34, 150, 12, 300, C.wood2), rect(554, 150, 12, 300, C.wood2));
  // Sol de l'atelier, puis rue en terre rouge
  g.push(rect(0, 446, 800, 154, C.sand2), `<path d="M0 492Q300 476 800 488V600H0Z" fill="${C.terra}" opacity=".38"/>`);
  for (const [x, y] of [[640, 560], [300, 580], [720, 520], [470, 540], [60, 570]]) g.push(`<ellipse cx="${x}" cy="${y}" rx="16" ry="3" fill="${C.wood2}" opacity=".3"/>`);
  // Sciure sous l'établi
  g.push(`<ellipse cx="250" cy="540" rx="150" ry="14" fill="${C.ocre}" opacity=".25"/>`);

  // Le menuisier rabote une planche derrière l'établi
  const mx = 240, my = 545, ms = 1, msk = SKIN.s1;
  g.push(person({ x: mx, y: my, s: ms, skin: msk, hair: { type: "rase" }, beard: true, top: C.terra, wax: "wax3", sleeve: "short", bottom: C.dark, face: "calm",
    arms: { l: [[-52, -168], [-12, -160]], r: [[58, -170], [22, -163]] } }));
  // L'établi : plateau, pieds, traverse, presse
  g.push(rect(110, 410, 270, 16, C.wood), rect(110, 422, 270, 4, C.wood2), rect(126, 426, 16, 112, C.wood2), rect(348, 426, 16, 112, C.wood2), rect(126, 494, 238, 10, C.wood2));
  g.push(rect(100, 418, 14, 34, C.wood2, ' rx="2"'), stroke("M96 438H86", C.grey, 4), `<circle cx="84" cy="438" r="4" fill="${C.grey}"/>`);
  // La planche et le rabot
  g.push(rect(130, 398, 230, 12, C.sand2), stroke("M136 404H200M260 403H352", C.wood, 1.4, ' opacity=".6"'));
  g.push(`<path d="M218 398L224 382H270L276 398Z" fill="${C.wood2}"/>`, rect(220, 394, 56, 4, C.steel), `<path d="M224 382Q226 370 236 372L240 382Z" fill="${C.wood}"/><circle cx="262" cy="378" r="6" fill="${C.wood}"/>`);
  for (const [lx, ly] of [[-12, -160], [22, -163]]) { const [hx, hy] = toScene(mx, my, ms, false, lx, ly); g.push(hand(hx, hy, msk)); }
  // Les copeaux : sortent du rabot, tombent de l'établi, jonchent le sol
  g.push(`<path d="M276 396Q296 370 312 384Q320 396 306 398Q296 390 290 398Z" fill="${C.sand}"/>`);
  for (const [x, y, r] of [[318, 394, 0], [334, 400, 50], [150, 540, 0], [190, 548, 80], [250, 552, 160], [300, 544, 30], [340, 556, 220], [96, 552, 100], [410, 548, 300], [220, 564, 260]]) g.push(`<use href="#menuisier-copeau" transform="translate(${x} ${y}) rotate(${r})"/>`);

  // L'apprenti ponce un tabouret sculpté posé sur un tréteau
  const px = 480, py = 552, ps = 0.9, psk = SKIN.s4;
  g.push(person({ x: px, y: py, s: ps, skin: psk, hair: { type: "nattes" }, top: C.green, dashiki: C.ocre, sleeve: "short", bottom: C.blue, face: "smile",
    arms: { l: [[-48, -160], [-31, -147]], r: [[50, -168], [18, -158]] } }));
  g.push(stroke("M430 476L456 552M530 476L504 552M456 476L430 552M504 476L530 552", C.wood2, 7), rect(420, 468, 120, 12, C.wood));
  g.push(stool(480, 470, 56));
  const [bx, by] = toScene(px, py, ps, false, 18, -158), [ex, ey] = toScene(px, py, ps, false, -31, -147);
  g.push(rect(bx - 12, by + 2, 26, 9, C.yellow, ' rx="2"'), rect(bx - 12, by + 8, 26, 3, C.ocre), hand(bx, by, psk), hand(ex, ey, psk));
  for (const [x, y] of [[512, 404], [520, 396], [506, 394], [526, 408]]) g.push(`<circle cx="${x}" cy="${y}" r="2" fill="${C.sand}"/>`);

  // Meubles finis devant l'atelier : tête de lit sculptée, chaise, petit tabouret
  g.push(`<g transform="translate(-16 0)"><path d="M566 520V380Q566 344 612 340Q658 344 658 380V520H646V500H578V520Z" fill="${C.wood}"/><path d="M578 384Q578 360 612 356Q646 360 646 384V490H578Z" fill="${C.wood2}"/>` +
    stroke("M586 400L600 386L612 400L624 386L638 400M586 430L600 416L612 430L624 416L638 430", C.ocre, 3) + `<circle cx="612" cy="460" r="10" fill="none" stroke="${C.ocre}" stroke-width="3"/></g>`);
  g.push(`<ellipse cx="590" cy="574" rx="40" ry="5" fill="${C.dark}" opacity=".12"/>`, chair(562, 574));
  // Le client vient chercher son lit : il montre la tête de lit et parle au menuisier
  const qx = 700, qy = 576, qs = 1, qsk = SKIN.s3;
  g.push(person({ x: qx, y: qy, s: qs, flip: true, skin: qsk, hair: { type: "short" }, hat: { type: "kufi", color: C.red }, top: "#15110F", wax: "toghu", bottom: C.dark, face: "talk",
    arms: { r: [[52, -176], [74, -196]], l: [[-40, -150], [-36, -110]] }, point: [120, -214] }));
  // La bulle du client : « mon lit est prêt ? »
  g.push(bubble(636, 252, rect(-17, -16, 6, 28, C.white, ' rx="2"') + rect(-12, -2, 30, 9, C.white, ' rx="2"') + `<ellipse cx="-4" cy="-5" rx="6" ry="3.5" fill="${C.white}"/>` + rect(14, 6, 4, 7, C.white) + rect(-17, 6, 4, 7, C.white) + stroke("M4 -14L9 -9L18 -19", C.yellow, 3.4), C.green));
  return frame(g.join(""), C.sky);
}

/* ---------- Scène 3 : à la pharmacie ---------- */
/** Petits yeux et bouche d'un bébé (tête de rayon r centrée en 0,0). */
const babyFace = (r) => `<ellipse cx="${f(-r * 0.36)}" cy="${f(-r * 0.05)}" rx="1.9" ry="2.3" fill="#0E0907"/><ellipse cx="${f(r * 0.36)}" cy="${f(-r * 0.05)}" rx="1.9" ry="2.3" fill="#0E0907"/>` +
  `<circle cx="${f(-r * 0.32)}" cy="${f(-r * 0.12)}" r=".7" fill="#fff"/><circle cx="${f(r * 0.4)}" cy="${f(-r * 0.12)}" r=".7" fill="#fff"/>` + stroke(`M${f(-r * 0.26)} ${f(r * 0.38)}Q0 ${f(r * 0.6)} ${f(r * 0.26)} ${f(r * 0.38)}`, "#7E2F25", 1.8);

function pharmacie() {
  const g = [];
  const BOX = [[C.white, C.leaf2], [C.blue, C.white], [C.yellow, C.red], [C.white, C.blue], [C.rose, C.white], [C.steel, C.leaf2], [C.white, C.red]];
  g.push(`<defs>${BOX.map(([a, b], i) => `<g id="pharmacie-b${i}">${rect(0, -30, 22, 30, a, ' rx="2"')}${rect(0, -20, 22, 7, b)}${rect(0, -30, 22, 30, "none", ' rx="2" stroke="rgba(0,0,0,.12)" stroke-width="1"')}</g>`).join("")}` +
    `<g id="pharmacie-fl">${rect(-6, -26, 12, 26, C.wood2, ' rx="3"')}${rect(-4, -32, 8, 7, C.white, ' rx="1"')}${rect(-6, -18, 12, 8, C.white)}</g></defs>`);
  // Murs : blanc en haut, soubassement vert pâle ; carrelage
  g.push(rect(0, 0, 800, 540, C.white), rect(0, 360, 800, 180, C.sky), rect(0, 356, 800, 6, C.leaf, ' opacity=".35"'));
  g.push(rect(0, 540, 800, 60, C.sand));
  for (let x = 0; x < 820; x += 60) g.push(stroke(`M${x} 540L${x - 20} 600`, C.sand2, 2));
  g.push(stroke("M0 568H800", C.sand2, 2));
  // La croix verte de la pharmacie (couleur fixe), qui brille
  g.push(`<circle cx="370" cy="70" r="40" fill="${C.leaf}" opacity=".15"/>`, `<path d="M358 40H382V58H400V82H382V100H358V82H340V58H358Z" fill="${C.leaf2}"/>`, `<path d="M363 45H377V63H395V77H377V95H363V77H345V63H363Z" fill="${C.leaf}"/>`);
  // Les étagères de boîtes sans marque, derrière le comptoir
  g.push(rect(168, 112, 404, 300, C.sand2), rect(176, 118, 388, 294, C.sand));
  for (const [y, n0] of [[190, 0], [270, 3], [350, 5]]) {
    g.push(rect(176, y, 388, 8, C.wood2));
    for (let i = 0; i < 15; i++) {
      const x = 184 + i * 25.5;
      if ((i + n0) % 6 === 4) g.push(`<use href="#pharmacie-fl" x="${f(x + 11)}" y="${y}"/>`);
      else g.push(`<use href="#pharmacie-b${(i * 3 + n0) % BOX.length}" x="${f(x)}" y="${y}"/>`);
    }
  }
  // Affiche de prévention à gauche (pictogrammes : moustiquaire, cœur)
  g.push(rect(36, 116, 100, 120, C.cream, ' rx="4"'), rect(36, 116, 100, 120, C.green, ' rx="4" opacity=".1"'));
  g.push(`<path d="M56 196V166Q86 140 116 166V196Z" fill="${C.blue}" opacity=".35"/>`, stroke("M56 196V166Q86 140 116 166V196M66 160V196M86 152V196M106 160V196", C.blue, 1.6), rect(60, 190, 52, 8, C.terra, ' rx="2"'));
  g.push(`<path d="M86 134Q80 126 74 130Q70 136 86 148Q102 136 98 130Q92 126 86 134Z" fill="${C.red}"/>`, rect(50, 210, 72, 5, C.grey, ' rx="2" opacity=".5"'), rect(58, 220, 56, 5, C.grey, ' rx="2" opacity=".5"'));
  // Fenêtre sur la rue, à droite
  g.push(rect(694, 110, 80, 200, C.sand2), rect(700, 116, 68, 188, C.sky));
  g.push(`<path d="M700 250H768V304H700Z" fill="${C.leaf}" opacity=".5"/><path d="M720 304V230Q720 210 738 210H768V304Z" fill="${C.terra}" opacity=".35"/>`, stroke("M734 116V304M700 200H768", C.white, 4));

  // Le client qui attend, assis, son téléphone en main
  const wx = 74, wy = 572, ws = 0.95, wsk = SKIN.s5;
  g.push(rect(44, 372, 10, 110, C.wood2, ' rx="3"'), rect(44, 472, 100, 12, C.wood), stroke("M52 484V572M136 484V572", C.wood2, 6));
  g.push(person({ x: wx, y: wy, s: ws, skin: wsk, legs: "sit", robe: "boubou", top: C.indigo, wax: "wax3", hat: { type: "kufi", color: C.ocre, wax: "kente" }, hair: { type: "short" }, beard: true, face: "smile",
    arms: { l: [[-44, -150], [-12, -150]], r: [[40, -150], [36, -112]] }, phone: { rot: 10, screen: C.sky } }));

  // La pharmacienne, en blouse blanche, derrière le comptoir
  const px = 370, py = 535, ps = 0.97, psk = SKIN.s2;
  g.push(person({ x: px, y: py, s: ps, skin: psk, legs: "none", hair: { type: "boxbraids", beads: C.yellow }, coat: { inner: C.terra }, top: C.terra, face: "talk",
    arms: { l: [[-54, -140], [-34, -168]], r: [[58, -148], [84, -178]] } }));
  // Elle montre la boîte d'une main, l'ordonnance de l'autre
  const [bx, by] = toScene(px, py, ps, false, -34, -168), [ox, oy] = toScene(px, py, ps, false, 84, -178);
  g.push(rect(bx - 15, by - 26, 30, 20, C.white, ' rx="2"'), rect(bx - 15, by - 20, 30, 6, C.leaf2), hand(bx, by - 4, psk, 7));
  g.push(`<g transform="translate(${f(ox)} ${f(oy)}) rotate(8)">${rect(-4, -48, 40, 52, C.white, ' rx="2"')}${rect(-4, -48, 40, 52, "none", ' rx="2" stroke="' + C.steel + '" stroke-width="1.4"')}${stroke("M3 -38H16M3 -28H30M3 -20H26M3 -12H30M18 -4H30", C.grey, 2)}${stroke("M24 -42H30M27 -45V-39", C.leaf2, 2)}</g>`, hand(ox, oy, psk, 7));
  // Le comptoir : plateau, vitrine de façade
  g.push(rect(190, 412, 390, 14, C.wood2), rect(196, 426, 378, 114, C.wood), rect(212, 440, 346, 70, C.sky), rect(212, 440, 346, 70, C.white, ' opacity=".3"'));
  for (let i = 0; i < 12; i++) g.push(`<use href="#pharmacie-b${(i * 2 + 1) % BOX.length}" x="${226 + i * 27}" y="504"/>`);
  g.push(stroke("M240 446L270 470M480 446L520 480", C.white, 6, ' opacity=".5"'), rect(212, 474, 346, 4, C.wood2, ' opacity=".5"'));
  // Sur le comptoir : terminal de paiement, bocal
  g.push(rect(254, 392, 26, 20, C.dark, ' rx="3"'), rect(258, 396, 18, 7, C.leaf), `<path d="M488 412V388Q488 380 500 380Q512 380 512 388V412Z" fill="${C.white}" opacity=".7"/>`, `<circle cx="496" cy="402" r="4" fill="${C.red}"/><circle cx="504" cy="396" r="4" fill="${C.yellow}"/><circle cx="502" cy="406" r="4" fill="${C.blue}"/>`);

  // Le sachet de médicaments préparé pour la maman
  g.push(`<path d="M526 412L528 376H560L562 412Z" fill="${C.white}"/><path d="M528 376L534 370H554L560 376Z" fill="${C.sand2}"/>`, `<path d="M540 386H548V392H554V400H548V406H540V400H534V392H540Z" fill="${C.leaf2}"/>`);
  // La maman, son bébé au dos dans un pagne, écoute la pharmacienne
  const mx = 652, my = 572, ms = 1.02, msk = SKIN.s4, bsk = SKIN.s3;
  // Le pagne porte-bébé et le bébé, derrière elle
  g.push(at(mx, my, ms, false, cloth("M18 -196Q58 -200 60 -160Q62 -126 30 -116Z", C.green, "kitenge") + `<circle cx="44" cy="-218" r="16" fill="${bsk}"/>` +
    `<path d="M30 -222Q30 -236 44 -236Q58 -236 58 -222Q52 -230 44 -229Q36 -230 30 -222Z" fill="#17100D"/><ellipse cx="30" cy="-218" rx="3" ry="4" fill="${bsk}"/>` +
    `<g transform="translate(46 -216)">${babyFace(15)}</g>` + `<circle cx="58" cy="-192" r="6" fill="${bsk}"/>`));
  g.push(person({ x: mx, y: my, s: ms, skin: msk, hair: { type: "foulard", color: C.indigo, wax: "wax1" }, top: C.ocre, wax: "wax3", sleeve: "short", legs: "skirt", bottom: C.indigo, bwax: "ndop", face: "smile",
    arms: { l: [[-60, -160], [-88, -154]], r: [[40, -150], [38, -110]] } }));
  // Les deux pans du pagne noués sur la poitrine
  g.push(at(mx, my, ms, false, cloth("M-30 -180Q0 -186 30 -184L30 -168Q0 -170 -30 -164Z", C.green, "kitenge") + `<path d="M-6 -178L4 -176L8 -160L-2 -156Z" fill="${C.green}"/><path d="M-6 -178L4 -176L8 -160L-2 -156Z" fill="rgba(0,0,0,.2)"/>`));
  // La bulle : un comprimé le matin, un le soir
  const pill = (x, y) => `<rect x="${x - 7}" y="${y - 4}" width="14" height="8" rx="4" fill="${C.white}"/><rect x="${x}" y="${y - 4}" width="7" height="8" rx="0" fill="${C.red}"/>`;
  g.push(bubble(630, 182, `<circle cx="-10" cy="-9" r="5.5" fill="${C.yellow}"/>${stroke("M-10 -18V-16M-10 -2V0M-19 -9H-17M-3 -9H-1", C.yellow, 1.8)}${pill(10, -9)}<path d="M-12 4A7 7 0 1 0 -6 15A5.5 5.5 0 1 1 -12 4Z" fill="${C.cream}"/>${pill(10, 10)}`, C.green));
  return frame(g.join(""), C.white);
}

export default [
  { id: "couturiere", fr: "L'atelier de couture", en: "The tailor's workshop", tags: ["couture", "couturière", "atelier", "machine à coudre", "pagne", "wax", "kaba", "robe", "miroir", "mètre ruban", "apprenti", "tissus", "mannequin", "cliente", "tailor", "seamstress", "sewing machine", "fabric", "dress", "mirror", "tape measure", "apprentice", "mannequin", "customer"], draw: couturiere },
  { id: "menuisier", fr: "L'atelier du menuisier", en: "The carpenter's workshop", tags: ["menuisier", "menuiserie", "atelier", "établi", "rabot", "copeaux", "bois", "outils", "apprenti", "tabouret sculpté", "lit", "chaise", "meubles", "client", "toghu", "terre rouge", "carpenter", "workshop", "workbench", "plane", "wood shavings", "tools", "carved stool", "bed", "chair", "furniture", "customer"], draw: menuisier },
  { id: "pharmacie", fr: "À la pharmacie", en: "At the pharmacy", tags: ["pharmacie", "pharmacienne", "ordonnance", "médicaments", "comptoir", "croix verte", "maman", "bébé au dos", "pagne", "santé", "client", "boîtes", "pharmacy", "pharmacist", "prescription", "medicine", "counter", "green cross", "mother", "baby", "health", "customer"], draw: pharmacie },
];
