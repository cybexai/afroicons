// Scènes : le garage du quartier, le pain du matin, la presse à huile de palme.
import { C, SKIN, person, frame, palm, cloud, bubble, stroke, f } from "./lib.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${r}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
/** Position dans la scène d'un point local (hx, hy) d'un personnage. */
const toScene = (x, y, s, flip, hx, hy) => [x + (flip ? -hx : hx) * s, y + hy * s];

/* ---------- Scène 1 : le garage du quartier ---------- */
/** Clé plate (centrée, longueur ~46), rotation r. */
const wrench = (x, y, r, s = 1, col = C.steel) => `<g transform="translate(${f(x)} ${f(y)}) rotate(${r}) scale(${s})" fill="${col}"><rect x="-20" y="-3" width="32" height="6" rx="3"/><path d="M10 -8H18L25 -3H19V3H25L18 8H10Z"/><circle cx="-20" cy="0" r="6"/><circle cx="-20" cy="0" r="2.4" fill="${C.grey}"/></g>`;
const garageDefs = `<defs>
<g id="garage-pneu"><rect x="-46" y="-24" width="92" height="24" rx="10" fill="${C.dark}"/><path d="M-40 -12H40" stroke="${C.grey}" stroke-width="2" opacity=".5"/><path d="M-34 -20V-4M-18 -20V-4M-2 -20V-4M14 -20V-4M30 -20V-4" stroke="#000" stroke-width="2.4" opacity=".35"/></g>
<g id="garage-bidon"><path d="M-16 0V-40Q-16 -46 -10 -46H6L16 -36V0Z"/><rect x="-14" y="-54" width="9" height="9" rx="2" fill="${C.dark}"/><path d="M2 -46H10Q16 -46 16 -40" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="4"/><rect x="-11" y="-30" width="22" height="16" rx="2" fill="#fff" opacity=".55"/><path d="M-5 -22Q0 -30 5 -22Q5 -17 0 -17Q-5 -17 -5 -22Z" fill="rgba(0,0,0,.35)"/></g>
</defs>`;

function garage() {
  const g = [garageDefs];
  // Dehors, par la grande ouverture à droite : ciel, rue en terre rouge, manguier
  g.push(rect(470, 120, 330, 350, C.blue, ' opacity=".16"'), cloud(590, 170, 0.7));
  g.push(`<ellipse cx="730" cy="300" rx="90" ry="70" fill="${C.leaf2}"/><ellipse cx="660" cy="320" rx="70" ry="50" fill="${C.leaf}"/>`, stroke("M720 330V420", C.wood2, 14));
  g.push(`<path d="M470 400Q560 392 800 404V470H470Z" fill="${C.wood}" opacity=".45"/>`);
  g.push(`<path d="M520 400H600V380H612V400H640L636 360H524Z" fill="${C.sand2}"/><rect x="540" y="374" width="16" height="14" fill="${C.indigo}" opacity=".5"/>`);
  // Mur du garage : peint en deux tons, avec la grande ouverture
  g.push(`<path d="M0 120H800V470H0Z M470 140V470H800V140Z" fill="${C.sand2}" fill-rule="evenodd"/>`, rect(0, 380, 470, 90, C.green, ' opacity=".35"'));
  g.push(rect(462, 132, 14, 338, C.grey), rect(462, 132, 338, 12, C.grey));
  // Toit de tôle ondulée
  g.push(rect(0, 70, 800, 62, C.steel));
  for (let x = 6; x < 800; x += 18) g.push(stroke(`M${x} 74V128`, "#fff", 3, ' opacity=".3"'));
  g.push(rect(0, 124, 800, 10, C.grey), rect(0, 0, 800, 70, C.sky));
  // Enseigne : pictogramme clé + roue
  g.push(stroke("M380 134V152M470 134V152", C.dark, 2.5), rect(350, 150, 150, 70, C.ocre, ' rx="10"'), rect(356, 156, 138, 58, C.dark, ' rx="7" opacity=".1"'));
  g.push(`<circle cx="400" cy="185" r="22" fill="${C.dark}"/><circle cx="400" cy="185" r="11" fill="${C.steel}"/><circle cx="400" cy="185" r="4" fill="${C.dark}"/>`, wrench(452, 185, -40, 1.25, C.white));
  // Tableau à outils
  g.push(rect(36, 170, 214, 130, C.wood, ' rx="6"'), rect(44, 178, 198, 114, C.wood2, ' rx="4" opacity=".35"'));
  for (let x = 56; x < 236; x += 16) for (let y = 188; y < 290; y += 16) g.push(`<circle cx="${x}" cy="${y}" r="1.4" fill="${C.dark}" opacity=".3"/>`);
  for (const [x, r, s] of [[70, 90, 1], [94, 90, 0.85], [116, 90, 0.7]]) g.push(wrench(x, 230, r, s));
  g.push(stroke("M146 192V262", C.dark, 4), rect(138, 192, 16, 22, C.terra, ' rx="3"'));
  g.push(stroke("M180 196V266", C.wood2, 6), rect(168, 192, 26, 14, C.grey, ' rx="2"'));
  g.push(stroke("M204 198V250", C.steel, 4), rect(198, 236, 12, 30, C.ocre, ' rx="4"'), `<circle cx="228" cy="212" r="12" fill="none" stroke="${C.dark}" stroke-width="5" opacity=".75"/>`);
  // Sol en béton, taches d'huile
  g.push(rect(0, 470, 800, 130, C.steel), rect(0, 470, 800, 6, C.grey, ' opacity=".5"'));
  g.push(`<ellipse cx="470" cy="548" rx="70" ry="10" fill="${C.dark}" opacity=".12"/><ellipse cx="200" cy="580" rx="40" ry="6" fill="${C.dark}" opacity=".08"/>`);

  // Pneus empilés à gauche
  for (let i = 0; i < 5; i++) g.push(`<use href="#garage-pneu" transform="translate(${70 + (i % 2) * 3} ${548 - i * 24})"/>`);
  g.push(`<ellipse cx="72" cy="428" rx="46" ry="10" fill="${C.dark}"/><ellipse cx="72" cy="428" rx="24" ry="5" fill="${C.grey}"/>`);

  // La cliente qui attend sur le banc, téléphone en main
  const cx0 = 160;
  g.push(rect(122, 434, 116, 12, C.wood, ' rx="4"'), stroke("M130 446V540M230 446V540", C.wood2, 7));
  g.push(person({ x: cx0, y: 540, skin: SKIN.s4, legs: "sit", robe: "kaba", top: C.indigo, wax: "wax1", hair: { type: "gele", color: C.ocre, wax: "wax2" }, face: "calm",
    arms: { l: [[-30, -150], [-4, -168]], r: [[30, -148], [8, -134]] }, phone: { rot: 14, screen: C.sky } }));
  // Bulle : l'heure qui passe
  g.push(bubble(312, 268, `<circle r="15" fill="${C.white}"/><path d="M0 -9V0L7 5" fill="none" stroke="${C.indigo}" stroke-width="3" stroke-linecap="round"/>`, C.indigo));

  // La voiture, de profil vers la droite, capot ouvert
  const X = -50;
  g.push(`<g transform="translate(${X} 0)">`);
  // Capot relevé (derrière la mécanicienne)
  g.push(`<path d="M560 432L586 296Q588 290 594 292L608 298Q612 300 610 306L582 432Z" fill="${C.terra}"/><path d="M560 432L586 296Q588 290 594 292L608 298Q612 300 610 306L582 432Z" fill="rgba(0,0,0,.28)"/>`, stroke("M650 436L604 318", C.grey, 3));
  g.push(`</g>`);
  // La mécanicienne derrière l'aile avant, penchée sur le moteur ; elle tend la main droite vers la clé
  const mx = 604, my = 540, msk = SKIN.s2;
  g.push(person({ x: mx, y: my, skin: msk, top: C.blue, bottom: C.blue, hair: { type: "nattes" }, face: "talk", sleeve: "long", legs: "none",
    arms: { l: [[-24, -150], [-4, -114]], r: [[54, -172], [80, -162]] } }));
  // Poche et traces de cambouis sur le bleu de travail
  g.push(at(mx, my, 1, false, `${rect(-20, -170, 16, 14, C.indigo, ' rx="2" opacity=".5"')}<path d="M-28 -184L-20 -188" stroke="${C.dark}" stroke-width="4" opacity=".25" stroke-linecap="round"/><path d="M10 -150Q14 -146 20 -148" stroke="${C.dark}" stroke-width="3" opacity=".25" fill="none"/>`));
  g.push(`<g transform="translate(${X} 0)">`);
  // Moteur visible dans la baie
  g.push(rect(592, 408, 26, 24, C.dark, ' rx="3"'), rect(596, 404, 6, 6, C.red), rect(626, 414, 30, 18, C.grey, ' rx="4"'), `<ellipse cx="641" cy="414" rx="15" ry="5" fill="${C.steel}"/>`);
  // Carrosserie
  g.push(`<path d="M290 500V448Q292 430 312 430H330L368 346Q373 338 384 338H508Q518 338 524 346L566 430L654 432Q674 434 676 454V492Q676 500 668 500Z" fill="${C.terra}"/>`);
  g.push(`<path d="M340 428L374 352H440V428Z" fill="${C.sky}"/><path d="M448 352H506L540 428H448Z" fill="${C.sky}"/><path d="M380 356L364 392" stroke="#fff" stroke-width="5" opacity=".5" stroke-linecap="round"/>`);
  g.push(stroke("M444 346V496M290 462H676", "rgba(0,0,0,.2)", 2.5), rect(418, 442, 18, 5, C.dark, ' rx="2" opacity=".5"'), rect(510, 442, 18, 5, C.dark, ' rx="2" opacity=".5"'));
  g.push(rect(660, 442, 16, 12, C.yellow, ' rx="3"'), rect(290, 444, 10, 12, C.red, ' rx="2"'), rect(286, 484, 22, 12, C.grey, ' rx="4"'), rect(658, 484, 24, 12, C.grey, ' rx="4"'));
  g.push(`<path d="M290 500H676V506H290Z" fill="${C.dark}" opacity=".2"/>`);
  for (const wx of [360, 600]) g.push(`<circle cx="${wx}" cy="500" r="40" fill="${C.dark}" opacity=".55"/><circle cx="${wx}" cy="502" r="33" fill="${C.dark}"/><circle cx="${wx}" cy="502" r="17" fill="${C.steel}"/><circle cx="${wx}" cy="502" r="6" fill="${C.grey}"/>`);
  g.push(`</g>`);
  g.push(`<ellipse cx="455" cy="540" rx="230" ry="8" fill="${C.dark}" opacity=".12"/>`);
  // Sa main gauche posée dans le moteur, par-dessus la baie
  const [lmx, lmy] = toScene(mx, my, 1, false, -4, -114);
  g.push(hand(lmx, lmy, msk));

  // L'apprenti tend la clé
  const ax = 726, ay = 548, as = 0.86, ask = SKIN.s4;
  g.push(person({ x: ax, y: ay, s: as, flip: true, skin: ask, top: C.green, sleeve: "short", dashiki: C.ocre, bottom: C.dark, hat: { type: "cap", color: C.ocre }, face: "smile",
    arms: { r: [[50, -158], [60, -178]], l: [[-38, -150], [-36, -108]] } }));
  const [arx, ary] = toScene(ax, ay, as, true, 60, -178), [mrx, mry] = toScene(mx, my, 1, false, 80, -162);
  g.push(wrench((arx + mrx) / 2, (ary + mry) / 2, f((Math.atan2(mry - ary, mrx - arx) * 180) / Math.PI), 1.5, C.grey), hand(arx, ary, ask, 6.8), hand(mrx, mry, msk));
  // Chiffon dans la poche de l'apprenti
  g.push(at(ax, ay, as, true, `<path d="M-20 -126L-10 -128L-8 -98L-16 -92Z" fill="${C.red}"/>`));

  // Bidons d'huile, caisse à outils et cric au premier plan
  for (const [x, col] of [[250, C.green], [286, C.ocre], [322, C.green]]) g.push(`<use href="#garage-bidon" transform="translate(${x} 570)" fill="${col}"/>`);
  g.push(rect(480, 534, 96, 36, C.red, ' rx="4"'), rect(480, 534, 96, 8, C.dark, ' opacity=".25"'), stroke("M510 534V526H546V534", C.dark, 4), rect(520, 548, 16, 6, C.steel, ' rx="2"'));
  g.push(wrench(610, 566, -12, 0.9), stroke("M390 566H448", C.grey, 6), rect(380, 558, 20, 14, C.red, ' rx="3"'));
  return frame(g.join(""), C.cream);
}

/* ---------- Scène 2 : le pain du matin ---------- */
const bread = `<defs>
<g id="boulangerie-pain"><path d="M-30 0Q-30 -8 -20 -8H20Q30 -8 30 0Q30 8 20 8H-20Q-30 8 -30 0Z" fill="#C98A45"/><path d="M-30 0Q-30 -8 -20 -8H20Q30 -8 30 0" fill="${C.wood}" opacity=".35"/><path d="M-18 -4L-10 2M-4 -4L4 2M10 -4L18 2" stroke="${C.yellow}" stroke-width="2.4" stroke-linecap="round" opacity=".9"/></g>
<g id="boulangerie-panier"><path d="M-34 -24H34L28 0H-28Z" fill="${C.ocre}"/><path d="M-32 -16H32M-30 -8H30" stroke="${C.wood}" stroke-width="2" opacity=".5"/><path d="M-20 -24V0M-6 -24V0M8 -24V0M22 -24V0" stroke="${C.wood2}" stroke-width="1.4" opacity=".35"/></g>
<g id="boulangerie-sac"><path d="M-26 0Q-30 -40 -22 -62L-16 -68H16L22 -62Q30 -40 26 0Z" fill="${C.white}"/><path d="M-16 -68L-10 -76H10L16 -68Z" fill="${C.sand2}"/><path d="M0 -50V-18M0 -44L-7 -50M0 -44L7 -50M0 -34L-7 -40M0 -34L7 -40M0 -24L-7 -30M0 -24L7 -30" stroke="${C.ocre}" stroke-width="2.4" stroke-linecap="round" fill="none"/><path d="M-26 0H26" stroke="${C.sand2}" stroke-width="4"/></g>
<pattern id="boulangerie-brique" width="28" height="16" patternUnits="userSpaceOnUse"><rect width="28" height="16" fill="${C.terra}"/><path d="M0 0H28M0 8H28M7 0V8M21 8V16" stroke="${C.wood2}" stroke-width="1.6" opacity=".55"/></pattern>
<clipPath id="boulangerie-fen"><rect x="606" y="106" width="158" height="150" rx="6"/></clipPath>
</defs>`;
/** Baguette (centre, rotation, échelle). */
const pain = (x, y, r = 0, s = 1) => `<use href="#boulangerie-pain" transform="translate(${f(x)} ${f(y)}) rotate(${f(r)}) scale(${s})"/>`;
/** Toque de boulanger, repère local. */
const toque = `<path d="M-21 -250V-266Q-34 -270 -30 -284Q-24 -298 -8 -292Q0 -306 14 -296Q30 -300 32 -284Q34 -270 21 -266V-250Q0 -256 -21 -250Z" fill="${C.white}"/><path d="M-21 -256Q0 -262 21 -256V-250Q0 -256 -21 -250Z" fill="${C.sand2}"/>`;

function boulangerie() {
  const g = [bread];
  // Mur et carrelage
  g.push(rect(0, 0, 800, 520, C.sand), rect(0, 360, 800, 160, C.white, ' opacity=".5"'));
  for (let x = 0; x < 800; x += 32) g.push(stroke(`M${x} 360V520`, C.sand2, 1.5));
  for (let y = 392; y < 520; y += 32) g.push(stroke(`M0 ${y}H800`, C.sand2, 1.5));
  // Fenêtre : le petit matin, soleil bas sur les toits
  g.push(rect(598, 98, 174, 166, C.wood2, ' rx="8"'));
  g.push(`<g clip-path="url(#boulangerie-fen)">${rect(606, 106, 158, 150, C.sky)}${rect(606, 180, 158, 76, C.yellow, ' opacity=".25"')}<circle cx="650" cy="224" r="34" fill="${C.yellow}" opacity=".35"/><circle cx="650" cy="224" r="20" fill="${C.yellow}"/>${cloud(700, 140, 0.55)}<path d="M606 256V230L630 216L654 230V238H676V222L700 210L724 222V232H744L764 220V256Z" fill="${C.wood}" opacity=".7"/><path d="M670 256V244H720V256Z" fill="${C.leaf2}" opacity=".6"/></g>`);
  g.push(stroke("M685 106V256M606 181H764", C.wood2, 6));
  // Enseigne : pictogramme baguette + épi
  g.push(stroke("M400 62V90M520 62V90", C.dark, 2), rect(380, 88, 160, 60, C.indigo, ' rx="10"'), pain(444, 118, -16, 1.15));
  g.push(stroke("M500 136V100", C.ocre, 3), ...[0, 1, 2].map((i) => `<ellipse cx="${494}" cy="${108 + i * 9}" rx="4" ry="6" fill="${C.ocre}" transform="rotate(-30 494 ${108 + i * 9})"/><ellipse cx="${506}" cy="${108 + i * 9}" rx="4" ry="6" fill="${C.ocre}" transform="rotate(30 506 ${108 + i * 9})"/>`), `<ellipse cx="500" cy="99" rx="3.5" ry="6" fill="${C.ocre}"/>`);
  // Étagères à pain derrière le comptoir
  for (const y of [222, 304]) g.push(rect(330, y, 248, 10, C.wood, ' rx="3"'), stroke(`M346 ${y + 10}L356 ${y + 24}M562 ${y + 10}L552 ${y + 24}`, C.wood2, 5));
  for (const [x, y] of [[376, 222], [454, 222], [532, 222], [376, 304], [532, 304]]) {
    for (const k of [-14, -4, 8, 16]) g.push(pain(x + k, y - 32, -74 + k * 1.4, 0.8));
    g.push(`<use href="#boulangerie-panier" transform="translate(${x} ${y})"/>`);
  }

  // Le four en briques : voûte, bouche, feu, cheminée
  g.push(rect(90, 0, 50, 140, C.grey), rect(90, 0, 50, 140, "url(#boulangerie-brique)", ' opacity=".55"'));
  g.push(`<path d="M10 520V300Q10 168 122 160Q236 168 238 300V520Z" fill="${C.terra}"/><path d="M10 520V300Q10 168 122 160Q236 168 238 300V520Z" fill="url(#boulangerie-brique)"/>`);
  g.push(`<path d="M10 300Q10 168 122 160Q236 168 238 300" fill="none" stroke="${C.wood2}" stroke-width="10" opacity=".5"/>`, rect(4, 470, 240, 14, C.wood2, ' opacity=".7"'));
  g.push(`<path d="M52 456V400Q52 352 112 350Q172 352 172 400V456Z" fill="${C.wood2}"/><path d="M60 456V402Q60 360 112 358Q164 360 164 402V456Z" fill="${C.dark}"/>`);
  g.push(`<ellipse cx="112" cy="440" rx="44" ry="14" fill="${C.ocre}" opacity=".5"/><path d="M78 452Q76 424 90 414Q90 432 100 436Q98 414 114 402Q116 428 126 432Q128 418 140 414Q150 432 146 452Z" fill="${C.red}"/><path d="M92 452Q92 436 102 430Q106 442 114 442Q114 430 126 424Q134 440 132 452Z" fill="${C.yellow}"/>`);
  g.push(`<ellipse cx="112" cy="404" rx="70" ry="50" fill="${C.yellow}" opacity=".1"/>`, rect(40, 456, 144, 10, C.wood2, ' rx="3"'));
  // Bois de chauffe sous le four
  g.push(rect(30, 486, 110, 34, C.dark, ' rx="4" opacity=".75"'));
  for (const [x, y] of [[48, 508], [76, 508], [104, 508], [62, 494], [90, 494], [118, 498]]) g.push(`<circle cx="${x}" cy="${y}" r="11" fill="${C.wood}"/><circle cx="${x}" cy="${y}" r="5.5" fill="${C.wood2}" opacity=".6"/>`);
  g.push(`<path d="M122 492H232V520H122Z" fill="${C.wood2}" opacity=".4"/>`);

  // Sol
  g.push(rect(0, 520, 800, 80, C.sand2), rect(0, 520, 800, 5, C.wood2, ' opacity=".3"'));

  // Le boulanger sort les baguettes avec la pelle
  const bx = 300, by = 548, bsk = SKIN.s1;
  g.push(person({ x: bx, y: by, flip: true, skin: bsk, hair: { type: "rase" }, top: C.white, sleeve: "short", dashiki: C.ocre, bottom: C.wood2, bwax: "bogolan", face: "smile", beard: true,
    arms: { r: [[42, -152], [66, -126]], l: [[-4, -150], [34, -122]] } }));
  g.push(at(bx, by, 1, true, `<path d="M-26 -178H26L30 -64Q0 -56 -30 -64Z" fill="${C.indigo}"/>${stroke("M-26 -178L-12 -206M26 -178L12 -206", C.indigo, 4)}${stroke("M-27 -120H27", C.indigo, 5)}${toque}`));
  const [p1x, p1y] = toScene(bx, by, 1, true, 34, -122), [p2x, p2y] = toScene(bx, by, 1, true, 66, -126);
  // Pelle : manche dans les deux mains, palette chargée de baguettes au sortir du four
  g.push(stroke(`M${f(p1x + 12)} ${f(p1y - 1)}L196 440`, C.wood, 7), `<path d="M140 438H202Q206 440 202 446H140Q134 442 140 438Z" fill="${C.wood}"/>`);
  g.push(pain(166, 430, -2, 0.95), pain(172, 421, 2, 0.95));
  g.push(hand(p1x, p1y, bsk), hand(p2x, p2y, bsk));
  for (const [x] of [[150], [176]]) g.push(stroke(`M${x} 408Q${x - 6} 398 ${x} 388Q${x + 6} 378 ${x} 368`, C.white, 2.6, ' opacity=".8"'));

  // Sacs de farine au pied du four
  g.push(`<use href="#boulangerie-sac" transform="translate(196 570)"/><use href="#boulangerie-sac" transform="translate(240 576) scale(.85)"/>`);

  // La vendeuse derrière le comptoir tend le pain chaud
  const vx = 462, vy = 548, vsk = SKIN.s3;
  g.push(person({ x: vx, y: vy, skin: vsk, top: C.green, wax: "kitenge", robe: "kaba", hair: { type: "foulard", color: C.terra, wax: "wax1" }, face: "laugh", legs: "none",
    arms: { l: [[-36, -150], [-22, -132]], r: [[40, -168], [74, -176]] } }));
  // Comptoir
  g.push(rect(350, 398, 240, 14, C.wood2, ' rx="4"'), rect(358, 412, 224, 108, C.wood), rect(368, 422, 204, 88, C.wood2, ' opacity=".3" rx="4"'));
  g.push(`<path d="M378 444L398 432L418 444L438 432L458 444L478 432L498 444L518 432L538 444L558 432" fill="none" stroke="${C.ocre}" stroke-width="4" opacity=".8"/><path d="M378 490L398 478L418 490L438 478L458 490L478 478L498 490L518 478L538 490L558 478" fill="none" stroke="${C.ocre}" stroke-width="4" opacity=".8"/>`);
  g.push(rect(360, 458, 220, 6, C.dark, ' opacity=".15"'));
  // Sur le comptoir : panier plein, caisse à monnaie
  for (const k of [-16, -6, 6, 16]) g.push(pain(400 + k, 368, -78 + k, 0.85));
  g.push(`<use href="#boulangerie-panier" transform="translate(400 398)"/>`, rect(424, 380, 30, 18, C.indigo, ' rx="3"'), rect(428, 384, 22, 4, C.sky));

  // L'écolière reçoit le pain
  const ex = 628, ey = 552, es = 0.78, esk = SKIN.s5;
  g.push(person({ x: ex, y: ey, s: es, flip: true, skin: esk, legs: "skirt", top: C.white, sleeve: "short", bottom: C.blue, shoes: C.dark, hair: { type: "bantu" }, face: "laugh",
    arms: { r: [[34, -160], [62, -176]], l: [[-38, -150], [-34, -110]] } }));
  // Bretelles et cartable de l'écolière
  g.push(at(ex, ey, es, true, `${stroke("M-20 -204L-16 -120M20 -204L16 -120", C.blue, 7)}<rect x="-44" y="-188" width="16" height="64" rx="6" fill="${C.terra}"/>`));
  const [vrx, vry] = toScene(vx, vy, 1, false, 74, -176), [erx, ery] = toScene(ex, ey, es, true, 62, -176);
  const ang = (Math.atan2(ery - vry, erx - vrx) * 180) / Math.PI;
  g.push(pain((vrx + erx) / 2, (vry + ery) / 2, ang, 1.05), hand(vrx, vry, vsk), hand(erx, ery, esk, 6));
  for (const k of [-14, 0, 14]) g.push(stroke(`M${f((vrx + erx) / 2 + k)} ${f((vry + ery) / 2 - 16)}q-5 -9 0 -18`, C.white, 2.4, ' opacity=".8"'));

  // L'homme en route pour le travail, paie par téléphone, une baguette sous le bras
  const hx = 718, hy = 556, hsk = SKIN.s3;
  g.push(person({ x: hx, y: hy, flip: true, skin: hsk, top: C.terra, wax: "wax2", bottom: C.indigo, hair: { type: "short" }, hat: { type: "kufi", color: C.indigo, wax: "ndop" }, face: "talk",
    arms: { r: [[40, -160], [30, -126]], l: [[-40, -168], [-24, -214]] }, phone: { rot: -170, screen: C.green } }));
  const [hrx, hry] = toScene(hx, hy, 1, true, 30, -126);
  g.push(pain(hrx - 4, hry - 18, -64, 1), hand(hrx, hry, hsk));
  // Sacoche
  g.push(at(hx, hy, 1, true, `${stroke("M22 -204L-28 -110", C.wood2, 5)}<rect x="-46" y="-120" width="40" height="34" rx="5" fill="${C.wood2}"/><rect x="-46" y="-120" width="40" height="10" rx="4" fill="${C.dark}" opacity=".3"/>`));
  return frame(g.join(""), C.cream);
}

/* ---------- Scène 3 : la presse à huile de palme ---------- */
const huileDefs = `<defs>
<g id="huile-regime"><path d="M-4 -30Q0 -40 6 -46" stroke="${C.wood2}" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="-12" rx="26" ry="20" fill="${C.dark}"/>${[[-16, -10], [-8, -22], [4, -24], [16, -16], [-18, -2], [-6, -8], [8, -10], [20, -4], [-10, 4], [4, 2], [14, 6], [-2, -18]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="6.5" fill="${i % 3 === 0 ? C.dark : i % 3 === 1 ? C.red : "#E2632B"}"/>`).join("")}<circle cx="-6" cy="-6" r="2" fill="#fff" opacity=".35"/><circle cx="8" cy="-12" r="2" fill="#fff" opacity=".35"/></g>
<g id="huile-noix"><circle r="5" fill="${C.red}"/><circle cx="-1.5" cy="-1.5" r="1.6" fill="#fff" opacity=".35"/></g>
<g id="huile-bidon"><path d="M-20 0V-52Q-20 -58 -14 -58H8L20 -46V0Z" fill="${C.white}" opacity=".55"/><path d="M-20 0V-30H20V0Z" fill="${C.red}"/><path d="M-20 -30H20" stroke="#E2632B" stroke-width="3"/><path d="M-20 0V-52Q-20 -58 -14 -58H8L20 -46V0Z" fill="none" stroke="${C.steel}" stroke-width="2.4"/><rect x="-17" y="-68" width="11" height="10" rx="2" fill="${C.ocre}"/><path d="M-14 -50V-36" stroke="#fff" stroke-width="3" opacity=".7" stroke-linecap="round"/></g>
</defs>`;
const regime = (x, y, s = 1, r = 0) => `<use href="#huile-regime" transform="translate(${f(x)} ${f(y)}) rotate(${r}) scale(${s})"/>`;

function huile() {
  const g = [huileDefs];
  g.push(cloud(220, 70, 0.8), cloud(600, 50, 0.6));
  // Collines et palmiers à huile
  g.push(`<path d="M0 330V260Q120 220 240 250Q360 216 480 244Q620 210 800 240V330Z" fill="${C.leaf}" opacity=".55"/>`);
  for (const [x, y, s, l] of [[70, 340, 1.25, 12], [740, 330, 1.15, -14], [600, 320, 0.85, 8]]) {
    g.push(palm(x, y, s, l));
    const [cx, cy] = [x + l * 0.6 * s, y - 172 * s];
    g.push(`<g transform="translate(${f(cx)} ${f(cy)}) scale(${f(s * 0.5)})">${regime(-12, 16)}${regime(14, 18)}</g>`);
  }
  // Case au toit de tôle en arrière-plan
  g.push(rect(470, 250, 110, 80, C.sand2), `<path d="M460 254L525 214L590 254Z" fill="${C.steel}"/>`, rect(508, 282, 24, 48, C.wood2), rect(548, 270, 20, 18, C.indigo, ' opacity=".5"'));
  // Sol de terre rouge
  g.push(rect(0, 330, 800, 270, C.sand2), rect(0, 330, 800, 270, C.wood, ' opacity=".28"'), rect(0, 330, 800, 6, C.wood2, ' opacity=".25"'));
  for (const [x, y, rx] of [[140, 420, 60], [660, 470, 80], [320, 580, 90]]) g.push(`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx / 6}" fill="${C.wood2}" opacity=".12"/>`);

  // L'abri de la coopérative : poteaux et toit de paille
  g.push(stroke("M226 196V520M574 196V520", C.wood2, 10));
  g.push(`<path d="M190 214L262 140H538L610 214Z" fill="${C.ocre}"/><path d="M190 214L262 140H538L610 214Z" fill="${C.wood}" opacity=".3"/>`);
  for (let x = 206; x < 600; x += 14) g.push(stroke(`M${x} 212L${x + 4} 226`, C.ocre, 4));
  for (const y of [166, 190]) g.push(stroke(`M${238 - (y - 166)} ${y}H${562 + (y - 166)}`, C.wood2, 2, ' opacity=".35"'));

  // Le fût sur le feu, où cuisent les noix (au fond)
  g.push(rect(268, 330, 56, 76, C.grey, ' rx="4"'), stroke("M268 352H324M268 384H324", C.steel, 3), `<ellipse cx="296" cy="330" rx="28" ry="6" fill="${C.steel}"/>`);
  g.push(`<path d="M262 418Q270 400 282 406Q290 394 298 404Q308 396 316 408Q326 404 330 418Z" fill="${C.red}"/><path d="M276 418Q284 406 296 410Q306 406 316 418Z" fill="${C.yellow}"/>`, `<ellipse cx="270" cy="420" rx="12" ry="7" fill="${C.grey}"/><ellipse cx="322" cy="420" rx="12" ry="7" fill="${C.grey}"/><ellipse cx="296" cy="424" rx="10" ry="5" fill="${C.steel}"/>`, stroke("M250 428L282 420M342 428L312 420", C.wood2, 6));
  for (const x of [284, 306]) g.push(stroke(`M${x} 322Q${x - 8} 306 ${x} 292Q${x + 8} 278 ${x} 262`, C.white, 4, ' opacity=".8"'));

  // La presse manuelle : bâti, cage, vis et barre
  const PX = 410;
  g.push(rect(PX - 80, 490, 160, 22, C.wood2, ' rx="4"'), stroke(`M${PX - 66} 512V530M${PX + 66} 512V530`, C.wood2, 10));
  g.push(stroke(`M${PX - 56} 490V318M${PX + 56} 490V318`, C.grey, 10), rect(PX - 66, 306, 132, 18, C.grey, ' rx="4"'));
  g.push(rect(PX - 46, 470, 92, 20, C.steel, ' rx="3"'), `<path d="M${PX + 46} 474H${PX + 66}L${PX + 70} 482H${PX + 46}Z" fill="${C.steel}"/>`);
  g.push(rect(PX - 38, 386, 76, 86, C.dark, ' rx="3"'));
  for (let x = PX - 34; x < PX + 38; x += 10) g.push(rect(x, 386, 5, 86, C.grey));
  g.push(stroke(`M${PX - 40} 392H${PX + 40}M${PX - 40} 466H${PX + 40}`, C.steel, 5));
  // Pulpe rouge entre les lattes
  for (let x = PX - 29; x < PX + 38; x += 10) g.push(rect(x, 420, 5, 46, C.red, ' opacity=".85"'));
  g.push(stroke(`M${PX} 324V386`, C.steel, 9), stroke(`M${PX - 4} 332L${PX + 4} 338M${PX - 4} 344L${PX + 4} 350M${PX - 4} 356L${PX + 4} 362M${PX - 4} 368L${PX + 4} 374`, C.grey, 2));
  g.push(rect(PX - 20, 380, 40, 8, C.steel, ' rx="2"'));
  // Barre en T, au-dessus du bâti
  g.push(rect(PX - 12, 286, 24, 22, C.steel, ' rx="4"'), stroke(`M${PX - 100} 296H${PX + 96}`, C.dark, 8), `<circle cx="${PX - 100}" cy="296" r="6" fill="${C.dark}"/>`);
  // L'huile rouge coule du bec dans la bassine
  g.push(`<path d="M${PX + 64} 482Q${PX + 72} 500 ${PX + 72} 520" stroke="${C.red}" stroke-width="5" fill="none" stroke-linecap="round"/>`);
  g.push(`<path d="M${PX + 40} 520H${PX + 108}L${PX + 98} 548H${PX + 50}Z" fill="${C.steel}"/><ellipse cx="${PX + 74}" cy="520" rx="34" ry="7" fill="${C.grey}"/><ellipse cx="${PX + 74}" cy="521" rx="28" ry="5" fill="${C.red}"/>`);

  // La femme qui tourne la barre
  const tx = 548, ty = 552, tsk = SKIN.s2;
  const [bx2] = toScene(tx, ty, 1, true, 54, 0);
  g.push(stroke(`M${PX + 96} 296H${f(bx2 - 4)}`, C.dark, 8));
  g.push(person({ x: tx, y: ty, flip: true, skin: tsk, top: C.green, wax: "kitenge", sleeve: "short", legs: "walkskirt", bottom: C.ocre, bwax: "wax3", hair: { type: "boxbraids", beads: C.ocre }, face: "laugh",
    arms: { r: [[34, -214], [54, -256]], l: [[0, -212], [40, -256]] } }));
  g.push(`<circle cx="${f(bx2 - 6)}" cy="296" r="6" fill="${C.dark}"/>`);
  const [t1x, t1y] = toScene(tx, ty, 1, true, 54, -256), [t2x, t2y] = toScene(tx, ty, 1, true, 40, -256);
  g.push(hand(t1x, t1y, tsk), hand(t2x, t2y, tsk));

  // La femme qui verse l'huile dans les bidons transparents
  const wx = 150, wy = 552, wsk = SKIN.s4;
  g.push(person({ x: wx, y: wy, skin: wsk, robe: "kaba", top: C.indigo, wax: "ndop", hair: { type: "foulard", color: C.terra, wax: "wax1" }, face: "smile",
    arms: { l: [[14, -152], [50, -170]], r: [[50, -150], [78, -152]] } }));
  const [w1x, w1y] = toScene(wx, wy, 1, false, 50, -170), [w2x, w2y] = toScene(wx, wy, 1, false, 78, -152);
  // Seau incliné, filet d'huile
  const sx = (w1x + w2x) / 2 + 6, sy = (w1y + w2y) / 2 - 2;
  g.push(`<g transform="translate(${f(sx)} ${f(sy)}) rotate(28)"><path d="M-22 -20H22L16 16Q0 22 -16 16Z" fill="${C.green}"/><path d="M-14 -6H14" stroke="rgba(0,0,0,.2)" stroke-width="3"/><path d="M-20 -18Q0 -46 20 -18" fill="none" stroke="${C.grey}" stroke-width="2.4"/><ellipse cx="0" cy="-20" rx="22" ry="5" fill="${C.red}"/><path d="M-22 -20H22" stroke="${C.green}" stroke-width="3"/></g>`);
  g.push(`<path d="M${f(sx + 22)} ${f(sy - 8)}Q${f(sx + 30)} ${f(sy + 30)} 245 484" stroke="${C.red}" stroke-width="5" fill="none" stroke-linecap="round"/>`);
  g.push(hand(w1x, w1y, wsk), hand(w2x, w2y, wsk));
  // Entonnoir et bidons
  for (const [x, s] of [[256, 1], [306, 0.95], [210, 0.8]]) g.push(`<use href="#huile-bidon" transform="translate(${x} ${x === 210 ? 572 : 560}) scale(${s})"/>`);
  g.push(`<path d="M232 478H258L249 492H241Z" fill="${C.ocre}"/>`);

  // La troisième apporte des régimes dans la bassine sur la tête
  const cx = 680, cy = 556, cs = 0.98, csk = SKIN.s3;
  g.push(person({ x: cx, y: cy, s: cs, flip: true, skin: csk, legs: "walkskirt", top: C.terra, sleeve: "short", bottom: C.indigo, bwax: "wax1", hair: { type: "nattes" }, face: "talk",
    arms: { r: [[36, -224], [30, -276]], l: [[-38, -150], [-30, -110]] } }));
  g.push(at(cx, cy, cs, true, `${regime(-10, -286, 0.9, -10)}${regime(14, -290, 0.9, 12)}${regime(2, -298, 0.8, 0)}<path d="M-40 -282H40L32 -262Q0 -256 -32 -262Z" fill="${C.ocre}"/><path d="M-40 -282H40" stroke="${C.wood}" stroke-width="3"/>`));
  const [crx, cry] = toScene(cx, cy, cs, true, 30, -276);
  g.push(hand(crx, cry, csk));

  // Régimes et noix au sol, au premier plan
  for (const [x, y, s, r] of [[346, 554, 1.05, -6], [404, 552, 1.05, 10], [374, 536, 0.95, 0], [744, 566, 0.9, 0], [566, 572, 0.85, 6]]) g.push(regime(x, y, s, r));
  for (const [x, y] of [[440, 576], [452, 584], [462, 572], [310, 580], [590, 580], [602, 574], [520, 584]]) g.push(`<use href="#huile-noix" transform="translate(${x} ${y})"/>`);
  // Bulle : une goutte d'huile
  g.push(bubble(420, 78, `<path d="M0 -16Q12 -2 12 6Q12 16 0 16Q-12 16 -12 6Q-12 -2 0 -16Z" fill="${C.red}"/><circle cx="-4" cy="6" r="3" fill="#fff" opacity=".6"/>`, C.green));
  return frame(g.join(""), C.sky);
}

export default [
  { id: "garage", fr: "Le garage du quartier", en: "The neighbourhood garage",
    tags: ["garage", "mécanicienne", "mécanicien", "mécanique", "voiture", "capot", "moteur", "apprenti", "clé", "outils", "pneus", "bidons", "huile", "client", "attente", "quartier", "réparation", "mechanic", "car", "hood", "engine", "apprentice", "wrench", "tools", "tyres", "oil", "customer", "waiting", "repair", "neighbourhood"], draw: garage },
  { id: "boulangerie", fr: "Le pain du matin", en: "Morning bread",
    tags: ["boulangerie", "boulanger", "pain", "baguette", "four", "four à bois", "briques", "farine", "vendeuse", "comptoir", "écolière", "matin", "petit déjeuner", "quartier", "bakery", "baker", "bread", "oven", "wood-fired", "flour", "seller", "counter", "schoolgirl", "morning", "breakfast"], draw: boulangerie },
  { id: "huile", fr: "La presse à huile de palme", en: "Palm oil pressing",
    tags: ["huile de palme", "huile rouge", "presse", "palmier à huile", "régime", "noix de palme", "coopérative", "femmes", "village", "bidons", "agriculture", "transformation", "palm oil", "red oil", "press", "oil palm", "palm fruit", "bunch", "cooperative", "women", "village", "jerrycans", "farming", "processing"], draw: huile },
];
