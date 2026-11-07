// Scènes : à la maternelle, chez les grands-parents au village, une partie de jeux vidéo entre jeunes.
// Chaque objet (meuble, arbre, véhicule, personnage et ce qu'il tient) est regroupé dans son propre <g>.
import { C, SKIN, person, frame, cloud, stroke, f } from "./lib.mjs";

/** Un objet = un groupe. */
const G = (...p) => `<g>${p.join("")}</g>`;
/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${r}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");
/** Jambes croisées d'un enfant assis par terre (repère local, avec legs: "none") : le bas visible s'arrête vers -88. */
const crossLegs = (col, skin, pat = null) => cloth("M-44 -110Q-38 -124 0 -120Q38 -124 44 -110L48 -96Q24 -84 0 -92Q-24 -84 -48 -96Z", col, pat) +
  `<ellipse cx="-22" cy="-92" rx="11" ry="6" fill="${skin}"/><ellipse cx="22" cy="-92" rx="11" ry="6" fill="${skin}"/>` + stroke("M0 -118V-96", "rgba(0,0,0,.15)", 2);
/** Jambes d'une personne assise de face sur un canapé (repère local, legs: "none") : assise vers -100, pieds en 0. */
const sitLegs = (col, shoes, pat = null) => stroke("M-20 -92L-16 -14", col, 20) + stroke("M20 -92L16 -14", col, 20) +
  (pat ? stroke("M-20 -92L-16 -14", `url(#${pat})`, 20) + stroke("M20 -92L16 -14", `url(#${pat})`, 20) : "") +
  cloth("M-30 -120H30L38 -94Q0 -86 -38 -94Z", col, pat) + `<circle cx="-22" cy="-94" r="15" fill="${col}"/><circle cx="22" cy="-94" r="15" fill="${col}"/>` + (pat ? `<circle cx="-22" cy="-94" r="15" fill="url(#${pat})"/><circle cx="22" cy="-94" r="15" fill="url(#${pat})"/>` : "") + `<path d="M-30 -120H30L31 -110H-31Z" fill="rgba(0,0,0,.12)"/>` + stroke("M0 -112V-90", "rgba(0,0,0,.18)", 2) + `<ellipse cx="-19" cy="-6" rx="13" ry="6.5" fill="${shoes}"/><ellipse cx="19" cy="-6" rx="13" ry="6.5" fill="${shoes}"/>`;
const note = (x, y, col, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${col}"><ellipse cx="0" cy="0" rx="6" ry="4.5" transform="rotate(-20)"/><rect x="4" y="-22" width="2.6" height="22"/><path d="M6.6 -22Q14 -18 13 -10Q10 -15 6.6 -15Z"/></g>`;

/* ---------- Scène 1 : à la maternelle ---------- */
function maternelle() {
  const g = [];
  // Mur et sol
  g.push(G(rect(0, 0, 800, 440, C.cream), rect(0, 360, 800, 80, C.green, ' opacity=".16"'), rect(0, 356, 800, 6, C.green, ' opacity=".3"')));
  g.push(G(rect(0, 440, 800, 160, C.sand2), `<path d="${[...Array(7)].map((_, i) => `M0 ${460 + i * 22}H800`).join("")}" stroke="${C.wood}" stroke-width="1.5" opacity=".25"/>`));
  // Frise de l'alphabet : des pastilles colorées, chacune avec une petite forme simple
  const cols = [C.terra, C.ocre, C.green, C.indigo, C.red, C.yellow, C.blue, C.rose];
  const shapes = [`<circle r="4" fill="${C.white}"/>`, `<rect x="-4" y="-4" width="8" height="8" fill="${C.white}"/>`, `<path d="M0 -5L5 4H-5Z" fill="${C.white}"/>`, stroke("M-4 0H4M0 -4V4", C.white, 2.6)];
  g.push(G(stroke("M40 36H760", C.wood2, 2, ' opacity=".5"'), [...Array(21)].map((_, i) => `<g transform="translate(${60 + i * 34} 52)"><circle r="12" fill="${cols[i % 8]}"/>${shapes[(i * 3) % 4]}</g>`).join("")));
  // Dessins d'enfants punaisés : soleil, maison, arbre, famille
  const sheet = (x, y, rot, inner) => G(`<g transform="translate(${x} ${y}) rotate(${rot})">${rect(-44, -36, 88, 72, C.white)}${inner}<circle cx="0" cy="-32" r="3.5" fill="${C.red}"/></g>`);
  g.push(sheet(90, 140, -4, `<circle cx="0" cy="2" r="14" fill="${C.yellow}"/>${stroke([...Array(8)].map((_, i) => { const a = (i * Math.PI) / 4; return `M${f(Math.cos(a) * 19)} ${f(2 + Math.sin(a) * 19)}L${f(Math.cos(a) * 27)} ${f(2 + Math.sin(a) * 27)}`; }).join(""), C.ocre, 3)}`));
  g.push(sheet(200, 150, 3, `${rect(-20, -4, 40, 30, C.terra)}<path d="M-26 -2L0 -24L26 -2Z" fill="${C.indigo}"/>${rect(-6, 10, 12, 16, C.wood2)}${stroke("M-36 28H36", C.leaf, 3)}`));
  g.push(sheet(600, 145, -3, `${rect(-4, -2, 8, 28, C.wood2)}<circle cx="0" cy="-10" r="18" fill="${C.leaf}"/><circle cx="-6" cy="-14" r="3" fill="${C.red}"/><circle cx="8" cy="-6" r="3" fill="${C.red}"/>${stroke("M-36 28H36", C.leaf2, 3)}`));
  const stick = (x, c, h) => `<circle cx="${x}" cy="${-h}" r="5" fill="${C.dark}"/>` + stroke(`M${x} ${-h + 5}V${-h + 22}M${x - 7} ${-h + 10}H${x + 7}M${x} ${-h + 22}L${x - 5} ${-h + 32}M${x} ${-h + 22}L${x + 5} ${-h + 32}`, c, 2.4);
  g.push(sheet(712, 150, 4, stick(-20, C.terra, 6) + stick(0, C.green, 0) + stick(18, C.indigo, 6) + `<circle cx="26" cy="-22" r="7" fill="${C.yellow}"/>`));
  // Fenêtre : ciel, palmier et soleil, découpés dans le cadre
  g.push(G(`<clipPath id="maternelle-fen"><rect x="326" y="96" width="148" height="150"/></clipPath>`, rect(318, 88, 164, 166, C.wood), `<g clip-path="url(#maternelle-fen)">${rect(326, 96, 148, 150, C.sky)}<circle cx="440" cy="130" r="16" fill="${C.yellow}" opacity=".8"/>${stroke("M360 250Q366 200 356 170", C.wood2, 6)}<path d="M356 170Q330 160 318 182Q338 170 356 172ZM356 170Q380 150 402 168Q378 164 356 172ZM356 170Q350 146 368 132Q362 156 357 171Z" fill="${C.leaf}"/>${rect(326, 216, 148, 30, C.leaf2, ' opacity=".5"')}</g>`, rect(397, 96, 6, 150, C.wood), rect(326, 168, 148, 6, C.wood), rect(310, 252, 180, 8, C.wood2)));
  // Étagère de jouets : cubes, ballon, petit tam-tam
  g.push(G(rect(28, 300, 120, 140, C.wood), rect(36, 308, 104, 58, C.wood2, ' opacity=".55"'), rect(36, 374, 104, 58, C.wood2, ' opacity=".55"'),
    rect(44, 344, 20, 20, C.terra), rect(66, 344, 20, 20, C.ocre), rect(55, 324, 20, 20, C.green), `<circle cx="116" cy="350" r="15" fill="${C.red}"/>`, stroke("M102 348Q116 340 130 348", C.white, 3),
    `<path d="M52 386H86L82 430H56Z" fill="${C.wood}"/><ellipse cx="69" cy="386" rx="17" ry="5" fill="${C.sand}"/>${stroke("M54 392L84 424M84 392L54 424", C.wood2, 1.6)}`, rect(96, 404, 36, 26, C.indigo), rect(96, 404, 36, 26, "url(#kente)", ' opacity=".7"')));
  // Petites chaises et petite table, au fond à droite
  const chair = (x, col) => G(rect(x, 380, 6, 60, col), rect(x + 34, 404, 6, 36, col), rect(x - 2, 402, 44, 8, col), rect(x, 362, 40, 22, col, ' rx="4"'), rect(x, 362, 40, 22, "rgba(0,0,0,.12)", ' rx="4"'));
  g.push(G(rect(606, 410, 116, 8, C.wood), rect(614, 418, 6, 22, C.wood2), rect(708, 418, 6, 22, C.wood2), `<path d="M656 410L660 392H672L676 410Z" fill="${C.blue}"/>`, stroke("M662 392L658 378M666 392V376M670 392L674 380", C.red, 3)));
  g.push(chair(560, C.terra), chair(730, C.green));

  // Tapis coloré (bandes, rangée de losanges)
  g.push(G(rect(96, 446, 610, 136, C.ocre, ' rx="28"'), rect(96, 466, 610, 14, C.terra), rect(96, 548, 610, 14, C.terra), rect(96, 494, 610, 40, C.green),
    `<path d="${[...Array(20)].map((_, i) => `M${126 + i * 30} 504l10 10l-10 10l-10 -10Z`).join("")}" fill="${C.cream}"/>`, rect(96, 446, 610, 136, C.indigo, ' rx="28" opacity=".08"')));

  // Enfants du fond, assis en tailleur, qui chantent avec des gestes
  const kid = (x, spot, s, o, legCol, pat = null) => G(person({ x, y: spot + 90 * s, s, legs: "none", ...o }), at(x, spot + 90 * s, s, false, crossLegs(legCol, o.skin, pat)));
  const up = { l: [[-44, -200], [-50, -240]], r: [[44, -200], [50, -240]] };
  g.push(kid(190, 480, 0.54, { skin: SKIN.s2, hair: { type: "short" }, top: C.indigo, dashiki: C.ocre, face: "laugh", arms: up }, C.dark));
  g.push(kid(292, 470, 0.52, { skin: SKIN.s4, hair: { type: "puffs" }, top: C.terra, wax: "wax1", face: "talk", arms: { l: [[-30, -164], [-5, -182]], r: [[30, -164], [5, -182]] } }, C.terra, "wax1"));
  g.push(kid(526, 470, 0.52, { skin: SKIN.s3, hair: { type: "nattes" }, top: C.green, wax: "kitenge", face: "talk", arms: up }, C.green, "kitenge"));
  g.push(kid(618, 482, 0.54, { skin: SKIN.s5, hair: { type: "afro" }, top: C.ocre, face: "laugh", arms: { l: [[-44, -214], [-20, -258]], r: [[44, -214], [20, -258]] } }, C.indigo));

  // La maîtresse en kaba et gele, assise sur un petit tabouret sculpté, qui mène la chanson
  const T = { x: 400, y: 540, s: 0.84 }, tsk = SKIN.s3;
  const seat = T.y - 100 * T.s;
  g.push(G(`<path d="M${T.x - 34} ${seat}H${T.x + 34}L${T.x + 26} ${seat + 10}H${T.x - 26}Z" fill="${C.wood}"/>`, rect(T.x - 14, seat + 10, 28, T.y - seat - 22, C.wood2), `<path d="M${T.x - 30} ${T.y - 4}L${T.x - 20} ${T.y - 14}H${T.x + 20}L${T.x + 30} ${T.y - 4}Z" fill="${C.wood}"/>`, stroke(`M${T.x - 8} ${seat + 18}l8 10l8 -10M${T.x - 8} ${seat + 34}l8 10l8 -10`, C.ocre, 2)));
  g.push(G(person({ ...T, skin: tsk, legs: "sit", robe: "kaba", top: C.terra, wax: "wax2", hair: { type: "gele", color: C.ocre, wax: "kente" }, face: "talk",
    arms: { l: [[-50, -196], [-56, -236]], r: [[50, -196], [56, -236]] } }),
    note(T.x - 80, 300, C.indigo), note(T.x + 74, 290, C.terra, 0.9), note(T.x + 120, 330, C.green, 0.8), note(T.x - 130, 340, C.ocre, 0.8)));

  // Devant : la petite fille en bantu knots et son livre d'images
  const B = { x: 230, y: 548 + 90 * 0.58, s: 0.58 }, bsk = SKIN.s1;
  g.push(G(person({ ...B, skin: bsk, legs: "none", hair: { type: "bantu" }, top: C.ocre, wax: "wax3", face: "smile", arms: { l: [[-34, -150], [-24, -130]], r: [[34, -150], [24, -130]] } }),
    at(B.x, B.y, B.s, false, crossLegs(C.indigo, bsk) +
      `<g transform="translate(0 -128)"><path d="M0 -4L-40 -16V22L0 30Z" fill="${C.white}"/><path d="M0 -4L40 -16V22L0 30Z" fill="${C.cream}"/>${stroke("M0 -4V30", C.sand2, 2)}<circle cx="-20" cy="2" r="8" fill="${C.yellow}"/><path d="M-32 18Q-20 6 -8 18Z" fill="${C.leaf}"/><rect x="10" y="-4" width="20" height="14" fill="${C.terra}"/><path d="M8 -4L20 -14L32 -4Z" fill="${C.indigo}"/>${stroke("M10 16H30", C.blue, 2.5)}<path d="M-42 -18L0 -6L42 -18V-14L0 -2L-42 -14Z" fill="${C.green}"/></g>` +
      hand(-30, -128, bsk) + hand(30, -128, bsk))));

  // Devant : le petit garçon qui empile des cubes
  const K = { x: 572, y: 552 + 90 * 0.58, s: 0.58 }, ksk = SKIN.s4;
  const hxs = K.x + 74 * K.s, hys = K.y - 192 * K.s;
  const cube = (x, y, col) => rect(x, y, 22, 22, col, ' rx="2"') + rect(x, y, 22, 5, "rgba(255,255,255,.25)", ' rx="2"');
  g.push(G(person({ ...K, skin: ksk, legs: "none", hair: { type: "rase" }, top: C.rose, wax: "wax3", face: "smile", arms: { l: [[-38, -150], [-10, -124]], r: [[42, -178], [74, -192]] } }),
    at(K.x, K.y, K.s, false, crossLegs(C.dark, ksk)),
    cube(hxs + 4, 548, C.yellow), cube(hxs + 6, 526, C.indigo), cube(hxs + 3, 504, C.red), cube(hxs + 1, hys - 11, C.blue), hand(hxs, hys, ksk, 7.5 * K.s), cube(hxs + 40, 550, C.green)));

  return frame(g.join(""), C.cream);
}

/* ---------- Scène 2 : chez les grands-parents ---------- */
function grandsparents() {
  const g = [];
  // Ciel, collines, terre rouge
  g.push(G(rect(0, 0, 800, 430, C.white), rect(0, 0, 800, 430, C.blue, ' opacity=".2"'), `<circle cx="690" cy="90" r="34" fill="${C.yellow}" opacity=".7"/>`));
  g.push(cloud(120, 80, 0.8), cloud(520, 60, 0.6));
  g.push(G(`<path d="M0 350Q140 280 300 330Q460 270 620 320Q720 290 800 310V440H0Z" fill="${C.leaf}" opacity=".45"/>`, `<path d="M0 400Q200 360 400 390Q600 360 800 384V440H0Z" fill="${C.leaf2}" opacity=".4"/>`));
  g.push(G(rect(0, 430, 800, 170, C.rose, ' opacity=".7"'), rect(0, 430, 800, 170, C.sand2, ' opacity=".35"'), [[60, 560], [380, 590], [720, 580], [500, 470]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="16" ry="3" fill="${C.wood2}" opacity=".25"/>`).join("")));

  // La maison du village : murs de terre, toit de tôle, porte et volets
  g.push(G(`<ellipse cx="180" cy="474" rx="170" ry="10" fill="${C.wood2}" opacity=".2"/>`, rect(40, 290, 280, 182, C.sand2), rect(40, 290, 280, 182, C.terra, ' opacity=".35"'),
    rect(40, 440, 280, 32, C.wood2, ' opacity=".3"'),
    rect(140, 350, 56, 122, C.wood2), rect(146, 356, 44, 116, C.wood), `<circle cx="182" cy="414" r="3" fill="${C.dark}"/>`,
    rect(226, 340, 66, 56, "#2A1E17"), rect(214, 340, 14, 56, C.indigo), rect(290, 340, 14, 56, C.indigo), rect(222, 396, 74, 6, C.wood),
    rect(70, 340, 46, 46, "#2A1E17"), rect(66, 384, 54, 5, C.wood),
    `<path d="M18 298L64 236H296L342 298Z" fill="${C.steel}"/>`, `<path d="${[...Array(12)].map((_, i) => `M${f(30 + i * 27)} 297L${f(66 + i * 20)} 237`).join("")}" stroke="${C.grey}" stroke-width="2" opacity=".55"/>`, rect(14, 296, 332, 8, C.grey)));
  // Le banc devant la case, avec un pagne plié dessus
  g.push(G(rect(52, 444, 108, 10, C.wood), rect(58, 454, 8, 30, C.wood2), rect(146, 454, 8, 30, C.wood2), rect(60, 436, 40, 8, C.green), rect(60, 436, 40, 8, "url(#kitenge)")));
  // Le mortier et son pilon
  g.push(G(`<ellipse cx="62" cy="532" rx="30" ry="5" fill="${C.wood2}" opacity=".3"/>`, `<path d="M40 482H84L76 508Q84 520 78 530H46Q40 520 48 508Z" fill="${C.wood}"/>`, stroke("M44 496H80", C.wood2, 2.5, ' opacity=".5"'), `<ellipse cx="62" cy="482" rx="22" ry="5" fill="${C.wood2}"/>`, stroke("M58 484L84 400", C.wood2, 7)));
  // Le manguier, chargé de mangues
  g.push(G(`<path d="M462 470Q470 400 458 330L470 330Q486 400 486 470Z" fill="${C.wood2}"/>`, stroke("M466 360Q440 330 418 318M476 350Q500 320 530 310", C.wood2, 9),
    [[420, 260, 70], [500, 230, 80], [560, 280, 60], [450, 200, 60], [380, 300, 46], [530, 310, 48]].map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${i % 2 ? C.leaf : C.leaf2}"/>`).join(""),
    [[400, 312], [454, 288], [520, 300], [560, 322], [490, 262], [586, 290]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="9" fill="${C.ocre}"/><ellipse cx="${x - 2}" cy="${y - 2}" rx="2.5" ry="3.5" fill="${C.yellow}" opacity=".6"/>`).join("")));

  // La voiture de la famille, coffre ouvert, sacs de cadeaux
  const car = [];
  car.push(`<ellipse cx="690" cy="526" rx="110" ry="8" fill="${C.wood2}" opacity=".25"/>`);
  car.push(`<path d="M600 430L648 380H734L770 428Q790 432 790 452V506H596V446Q596 432 600 430Z" fill="${C.indigo}"/>`);
  car.push(`<path d="M652 388H692V428H616Z" fill="${C.sky}"/><path d="M700 388H730L758 428H700Z" fill="${C.sky}"/>`);
  car.push(rect(596, 470, 194, 8, "rgba(0,0,0,.18)"), rect(786, 448, 6, 14, C.yellow, ' rx="2"'), rect(594, 446, 8, 14, C.red, ' rx="2"'));
  // Hayon levé et coffre plein
  car.push(`<path d="M604 432L648 382L640 372L586 418Z" fill="${C.indigo}"/>`, `<path d="M600 426L640 380L634 374L592 420Z" fill="${C.sky}" opacity=".7"/>`);
  car.push(rect(600, 432, 40, 38, "#2A1E17"), rect(604, 412, 22, 24, C.red), stroke("M608 412Q615 402 622 412", C.dark, 2), rect(622, 418, 18, 18, C.yellow), rect(622, 418, 18, 18, "url(#wax2)"));
  for (const x of [632, 750]) car.push(`<circle cx="${x}" cy="506" r="22" fill="${C.dark}"/><circle cx="${x}" cy="506" r="10" fill="${C.steel}"/>`);
  g.push(`<g transform="translate(60 52.6) scale(.9)">${car.join("")}</g>`);

  // Les poules
  const hen = (x, y, s, fl, col) => G(`<g transform="translate(${x} ${y}) scale(${fl ? -s : s} ${s})"><path d="M-20 -14Q-24 -34 -6 -32Q6 -46 16 -36Q22 -24 14 -10Q0 0 -14 -4Q-24 -6 -20 -14Z" fill="${col}"/><path d="M-20 -14L-34 -30L-28 -10Z" fill="${C.dark}" opacity=".8"/><circle cx="12" cy="-38" r="8" fill="${col}"/><path d="M8 -46Q12 -52 16 -45Z" fill="${C.red}"/><path d="M19 -39L25 -37L19 -35Z" fill="${C.ocre}"/><circle cx="14" cy="-40" r="1.4" fill="${C.dark}"/>${stroke("M-4 -4V6M4 -6V6", C.ocre, 2)}</g>`);
  g.push(hen(126, 566, 1, false, C.wood), hen(178, 576, 0.85, true, C.white), hen(650, 572, 0.9, true, C.wood2));

  // Le grand-père en boubou et kufi, bras ouverts, la main sur la tête du petit-fils
  const GP = { x: 310, y: 522, s: 0.94 };
  const kidSk = SKIN.s4;
  // Le petit-fils, sac au dos, qui rit
  const PF = { x: 232, y: 540, s: 0.56 };
  g.push(G(person({ ...PF, skin: kidSk, hair: { type: "short" }, top: C.green, sleeve: "short", bottom: C.indigo, legs: "walk", face: "laugh",
    arms: { l: [[-42, -160], [-24, -140]], r: [[42, -160], [24, -140]] } }),
    at(PF.x, PF.y, PF.s, false, `<path d="M-38 -200Q-46 -170 -38 -128L-28 -128L-28 -200Z" fill="${C.terra}"/><path d="M38 -200Q46 -170 38 -128L28 -128L28 -200Z" fill="${C.terra}"/>` + stroke("M-18 -204L-22 -132M18 -204L22 -132", C.ocre, 6))));
  g.push(G(person({ ...GP, skin: SKIN.s1, beard: true, hair: { type: "short", color: C.grey }, hat: { type: "kufi", color: C.ocre, wax: "kente" }, robe: "boubou", top: C.white, wax: "wax3", face: "laugh",
    arms: { l: [[-52, -164], [-80, -138]], r: [[52, -196], [78, -232]] } })));

  // La grand-mère en foulard et pagne, qui serre sa petite-fille dans ses bras
  const GM = { x: 438, y: 524, s: 0.92 }, gsk = SKIN.s2;
  const PG = { x: 440, y: 546, s: 0.56 }, pgs = SKIN.s3;
  g.push(G(person({ ...GM, skin: gsk, hair: { type: "foulard", color: C.terra, wax: "wax1" }, top: C.ocre, wax: "wax3", bottom: C.indigo, bwax: "ndop", legs: "skirt", face: "laugh",
    arms: { l: [[-44, -150], [-4, -112]], r: [[44, -150], [6, -100]] } }),
    person({ ...PG, view: "back", skin: pgs, hair: { type: "boxbraids", beads: C.ocre }, top: C.terra, robe: "dress", wax: "wax2", arms: { l: [[-34, -170], [-12, -160]], r: [[34, -170], [12, -160]] } }),
    at(PG.x, PG.y, PG.s, false, rect(-24, -200, 48, 64, C.green, ' rx="10"') + rect(-18, -170, 36, 20, C.green, ' rx="5"') + rect(-18, -170, 36, 20, "rgba(0,0,0,.15)", ' rx="5"') + stroke("M-20 -196L-26 -204M20 -196L26 -204", C.green, 5)),
    at(GM.x, GM.y, GM.s, false, stroke("M-44 -150L-4 -112", C.ocre, 15) + stroke("M-44 -150L-4 -112", "url(#wax3)", 15) + stroke("M44 -150L6 -100", C.ocre, 15) + stroke("M44 -150L6 -100", "url(#wax3)", 15) + hand(-4, -112, gsk) + hand(6, -100, gsk))));

  // Le papa, descendu de la ville, qui sort les sacs de cadeaux du coffre
  const P = { x: 560, y: 540, s: 0.94 }, psk = SKIN.s5;
  const bag = (x, y, col, pat) => rect(x - 13, y + 10, 26, 30, col, ' rx="2"') + (pat ? rect(x - 13, y + 10, 26, 30, `url(#${pat})`, ' rx="2"') : "") + `<path d="M${x} ${y + 18}l-7 -5v10Zm0 0l7 -5v10Z" fill="${C.red}"/>` + stroke(`M${x - 7} ${y + 10}Q${x - 7} ${y} ${x} ${y}Q${x + 7} ${y} ${x + 7} ${y + 10}`, C.dark, 2.4);
  g.push(G(person({ ...P, skin: psk, hair: { type: "short" }, beard: true, top: C.terra, wax: "wax1", sleeve: "short", bottom: C.dark, face: "smile",
    arms: { l: [[-42, -156], [-40, -118]], r: [[46, -162], [57, -132]] } }),
    at(P.x, P.y, P.s, false, bag(-40, -120, C.green, "kente") + hand(-40, -118, psk))));

  return frame(g.join(""), C.cream);
}

/* ---------- Scène 3 : partie de jeux vidéo ---------- */
function jeuxvideo() {
  const g = [];
  // Mur, sol, lumière du soir
  g.push(G(rect(0, 0, 800, 430, C.sand), rect(0, 0, 800, 430, C.indigo, ' opacity=".08"')));
  g.push(G(rect(0, 430, 800, 170, C.wood), rect(0, 430, 800, 170, C.indigo, ' opacity=".18"'), `<path d="${[...Array(6)].map((_, i) => `M0 ${450 + i * 26}H800`).join("")}" stroke="${C.wood2}" stroke-width="2" opacity=".35"/>`));
  // Fenêtre au crépuscule
  g.push(G(`<clipPath id="jeuxvideo-fen"><rect x="560" y="70" width="170" height="150"/></clipPath>`, rect(552, 62, 186, 166, C.wood2),
    `<g clip-path="url(#jeuxvideo-fen)">${rect(560, 70, 170, 150, C.indigo)}${rect(560, 150, 170, 70, C.terra, ' opacity=".7"')}${rect(560, 180, 170, 40, C.ocre, ' opacity=".8"')}<circle cx="690" cy="186" r="16" fill="${C.yellow}"/>` +
    `<path d="M560 220V180H584V168H604V190H624V160H648V184H672V196H700V172H730V220Z" fill="${C.dark}" opacity=".75"/>${[[590, 176], [632, 170], [636, 186], [710, 182]].map(([x, y]) => rect(x, y, 5, 5, C.yellow)).join("")}<circle cx="600" cy="96" r="1.6" fill="${C.white}"/><circle cx="660" cy="86" r="1.4" fill="${C.white}"/></g>`,
    rect(642, 70, 6, 150, C.wood2), rect(544, 226, 202, 8, C.wood2)));
  // Lampadaire allumé et son halo
  g.push(G(`<circle cx="500" cy="236" r="80" fill="${C.yellow}" opacity=".12"/><circle cx="500" cy="236" r="40" fill="${C.yellow}" opacity=".18"/>`, rect(496, 250, 8, 20, C.dark), `<path d="M480 250L488 220H512L520 250Z" fill="${C.ocre}"/>`, rect(484, 246, 32, 6, C.yellow, ' opacity=".8"')));
  // Masque accroché au mur
  g.push(G(`<ellipse cx="410" cy="140" rx="24" ry="40" fill="${C.wood}"/>`, `<ellipse cx="400" cy="132" rx="6" ry="3" fill="${C.wood2}"/><ellipse cx="420" cy="132" rx="6" ry="3" fill="${C.wood2}"/>`, stroke("M410 140V160M402 168H418", C.wood2, 3), stroke("M390 112Q410 100 430 112", C.ocre, 3)));

  // Meuble télé et téléviseur : le match reste dans l'écran
  g.push(G(rect(30, 330, 260, 92, C.wood2), rect(38, 340, 118, 72, C.wood, ' rx="3"'), rect(164, 340, 118, 72, C.wood, ' rx="3"'), rect(40, 420, 10, 10, C.dark), rect(270, 420, 10, 10, C.dark),
    rect(84, 318, 20, 12, C.dark, ' rx="2"'), rect(110, 322, 28, 8, C.dark, ' rx="2"'), `<circle cx="141" cy="319" r="2.5" fill="${C.green}"/>`));
  const scr = [];
  scr.push(rect(48, 156, 236, 140, C.leaf2), ...[0, 2, 4].map((i) => rect(48 + i * 40, 156, 40, 140, C.leaf, ' opacity=".6"')));
  scr.push(`<g fill="none" stroke="${C.white}" stroke-width="2" opacity=".85"><rect x="56" y="176" width="220" height="110"/><path d="M166 176V286"/><circle cx="166" cy="231" r="18"/><rect x="56" y="206" width="30" height="50"/><rect x="246" y="206" width="30" height="50"/></g>`);
  scr.push(rect(276, 214, 10, 34, C.white, ' opacity=".5"'));
  const mini = (x, y, col) => `<circle cx="${x}" cy="${y - 13}" r="4" fill="${C.dark}"/>` + rect(x - 4, y - 9, 8, 9, col, ' rx="2"') + stroke(`M${x - 2} ${y}V${y + 5}M${x + 2} ${y}V${y + 5}`, C.dark, 2);
  scr.push(...[[110, 230, C.red], [150, 260, C.red], [200, 210, C.red], [236, 232, C.yellow], [190, 250, C.yellow], [262, 228, C.yellow], [76, 232, C.red]].map(([x, y, c]) => mini(x, y, c)));
  scr.push(`<circle cx="226" cy="238" r="3.5" fill="${C.white}"/>`, stroke("M206 236Q214 232 222 237", C.white, 1.5, ' opacity=".6"'));
  scr.push(rect(56, 162, 66, 12, C.dark, ' rx="2" opacity=".75"'), rect(60, 165, 10, 6, C.red), rect(74, 165, 8, 6, C.white), rect(96, 165, 8, 6, C.white), rect(108, 165, 10, 6, C.yellow));
  g.push(G(`<clipPath id="jeuxvideo-ecran"><rect x="48" y="156" width="236" height="140"/></clipPath>`, rect(36, 144, 260, 164, C.dark, ' rx="6"'),
    `<g clip-path="url(#jeuxvideo-ecran)">${scr.join("")}</g>`, rect(154, 308, 24, 10, C.dark)));
  // Reflet bleuté de l'écran sur le sol
  g.push(G(`<path d="M60 430H280L360 600H0V500Z" fill="${C.blue}" opacity=".1"/>`));

  // Le canapé et ses coussins en wax
  g.push(G(rect(330, 300, 440, 140, C.green, ' rx="22"'), rect(330, 300, 440, 140, "rgba(0,0,0,.12)", ' rx="22"'), rect(360, 420, 380, 76, C.green, ' rx="10"'), rect(360, 420, 380, 12, "rgba(255,255,255,.12)", ' rx="6"'),
    rect(320, 380, 50, 120, C.green, ' rx="18"'), rect(730, 380, 50, 120, C.green, ' rx="18"'), rect(344, 496, 12, 14, C.dark), rect(744, 496, 12, 14, C.dark)));
  g.push(G(`<g transform="rotate(-10 400 380)">${rect(370, 348, 64, 60, C.ocre, ' rx="12"')}${rect(370, 348, 64, 60, "url(#kente)", ' rx="12" opacity=".9"')}</g>`, `<g transform="rotate(8 700 380)">${rect(668, 348, 64, 60, C.terra, ' rx="12"')}${rect(668, 348, 64, 60, "url(#wax1)", ' rx="12"')}</g>`));

  // Manette (vue de face) dans le repère local d'un personnage
  const pad = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M-22 -8Q-24 -12 -14 -12H14Q24 -12 22 -8L26 8Q26 16 18 14L10 6H-10L-18 14Q-26 16 -26 8Z" fill="${C.dark}"/><circle cx="12" cy="-4" r="2.4" fill="${C.red}"/><circle cx="17" cy="0" r="2.4" fill="${C.yellow}"/>${stroke("M-16 -3H-8M-12 -7V1", C.grey, 2.4)}</g>`;
  const both = { l: [[-36, -150], [-16, -138]], r: [[36, -150], [16, -138]] };

  // La joueuse en tresses, concentrée et rieuse
  const A = { x: 470, y: 522, s: 0.8 }, ask = SKIN.s3;
  g.push(G(person({ ...A, skin: ask, legs: "none", hair: { type: "boxbraids", beads: C.ocre }, top: C.indigo, wax: "kitenge", face: "laugh", arms: both }),
    at(A.x, A.y, A.s, false, sitLegs(C.dark, C.white) + pad(0, -140) + hand(-16, -138, ask) + hand(16, -138, ask))));
  // Le garçon qui boude, bras croisés, manette posée sur les genoux
  const Bq = { x: 620, y: 522, s: 0.8 }, bsk = SKIN.s1;
  g.push(G(person({ ...Bq, skin: bsk, legs: "none", hair: { type: "nattes" }, top: C.ocre, dashiki: C.indigo, face: "calm", arms: { l: [[-34, -150], [18, -160]], r: [[34, -150], [-18, -154]] } }),
    at(Bq.x, Bq.y, Bq.s, false, sitLegs(C.indigo, C.dark, "bogolan") + pad(4, -104, 12) +
      stroke("M-12 -248Q-8 -251 -4 -246M4 -246Q8 -251 12 -248", "#0E0907", 2.2) + stroke("M-34 -150L18 -160", C.ocre, 15) + stroke("M-34 -150L18 -160", "rgba(0,0,0,.16)", 15) + stroke("M-36 -158L18 -160", "rgba(0,0,0,.25)", 2) + hand(20, -160, bsk)),
    `<g transform="translate(${Bq.x + 40} ${Bq.y - 250})"><circle r="20" fill="${C.white}" opacity=".9"/><circle cx="-16" cy="22" r="5" fill="${C.white}" opacity=".9"/>${stroke("M-10 2Q-5 -6 0 2T10 2", C.dark, 2.5)}</g>`));

  // Table basse : beignets et jus de bissap et de gingembre
  const glass = (x, col) => `<path d="M${x - 9} 468H${x + 9}L${x + 7} 500H${x - 7}Z" fill="${C.white}" opacity=".7"/><path d="M${x - 8} 476H${x + 8}L${x + 7} 498H${x - 7}Z" fill="${col}"/>`;
  g.push(G(rect(390, 500, 300, 14, C.wood2, ' rx="4"'), rect(398, 512, 284, 34, C.wood), rect(398, 512, 284, 34, "url(#bogolan)", ' opacity=".35"'), rect(400, 546, 12, 22, C.wood2), rect(668, 546, 12, 22, C.wood2), rect(390, 500, 300, 4, C.wood, ' rx="2"'),
    `<ellipse cx="490" cy="498" rx="46" ry="9" fill="${C.white}"/>`, [[466, 490], [482, 492], [498, 490], [514, 491], [474, 482], [490, 482], [506, 482], [490, 474]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${C.ocre}"/><circle cx="${x - 2}" cy="${y - 3}" r="3" fill="${C.yellow}" opacity=".6"/>`).join(""),
    `<path d="M570 450H594L598 466Q600 490 596 500H568Q564 490 566 466Z" fill="${C.white}" opacity=".6"/><path d="M567 470H597Q599 490 596 498H568Q565 490 567 470Z" fill="${C.red}"/>`,
    glass(620, C.red), glass(648, C.yellow), glass(546, C.yellow)));

  // Le garçon qui saute de joie : il vient de marquer !
  const J = { x: 318, y: 482, s: 0.86 }, jsk = SKIN.s4;
  g.push(G(`<ellipse cx="${J.x - 4}" cy="566" rx="46" ry="8" fill="${C.dark}" opacity=".3"/>`, stroke(`M${J.x - 40} 520V546M${J.x + 30} 522V548M${J.x - 6} 500V516`, C.white, 3, ' opacity=".6"'),
    person({ ...J, skin: jsk, hair: { type: "locks" }, top: C.red, wax: "wax2", sleeve: "short", bottom: C.dark, legs: "walk", shoes: C.white, face: "laugh",
      arms: { l: [[-46, -214], [-56, -260]], r: [[46, -214], [60, -262]] } }),
    at(J.x, J.y, J.s, false, pad(66, -276, -20) + hand(60, -262, jsk))));
  // La petite sœur qui regarde, un beignet à la main
  const S = { x: 722, y: 576, s: 0.54 }, ssk = SKIN.s2;
  g.push(G(person({ ...S, flip: true, skin: ssk, hair: { type: "puffs" }, top: C.rose, robe: "dress", wax: "wax3", face: "smile", arms: { l: [[-38, -160], [-30, -120]], r: [[40, -170], [20, -200]] } }),
    at(S.x, S.y, S.s, true, `<circle cx="22" cy="-210" r="9" fill="${C.ocre}"/>` + hand(20, -200, ssk))));

  return frame(g.join(""), C.sand);
}

export default [
  { id: "maternelle", fr: "À la maternelle", en: "At nursery school", tags: ["maternelle", "nursery school", "école", "school", "enfants", "children", "maîtresse", "teacher", "chanson", "song", "jeux", "play", "cubes", "blocks", "livre", "book"], draw: maternelle },
  { id: "grandsparents", fr: "Chez les grands-parents", en: "At the grandparents'", tags: ["grands-parents", "grandparents", "village", "vacances", "holidays", "famille", "family", "petits-enfants", "grandchildren", "accueil", "welcome", "manguier", "mango tree", "poules", "chickens"], draw: grandsparents },
  { id: "jeuxvideo", fr: "Partie de jeux vidéo", en: "Video game night", tags: ["jeux vidéo", "video games", "console", "manette", "controller", "jeunes", "youth", "salon", "living room", "football", "soirée", "evening", "beignets", "amis", "friends"], draw: jeuxvideo },
];
