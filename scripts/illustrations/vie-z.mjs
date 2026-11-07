// Scènes : l'atelier de recyclage, la microfinance, le dentiste.
import { C, SKIN, person, frame, plant, cloud, bubble, check, stroke, f } from "./lib.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${r}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
const G = (...parts) => `<g>${parts.join("")}</g>`;
/** Main locale (hx, hy) d'un personnage P → point de la scène. */
const toScene = (P, hx, hy) => [P.x + (P.flip ? -hx : hx) * P.s, P.y + hy * P.s];
/** Point de la scène → repère local d'un personnage P. */
const toLocal = (P, X, Y) => [f(((X - P.x) / P.s) * (P.flip ? -1 : 1)), f((Y - P.y) / P.s)];

/** Pictogramme recyclage : trois flèches qui se suivent en cercle (centre 0,0). */
const recycleArrows = (r, col, w) => [0, 120, 240].map((rot) => {
  const a1 = (-80 * Math.PI) / 180, a2 = (10 * Math.PI) / 180;
  const p1 = [r * Math.cos(a1), r * Math.sin(a1)], p2 = [r * Math.cos(a2), r * Math.sin(a2)];
  // pointe : tangente au cercle au bout de l'arc
  const tx = -Math.sin(a2), ty = Math.cos(a2), nx = Math.cos(a2), ny = Math.sin(a2), h = w * 1.3;
  const tip = [p2[0] + tx * h * 1.4, p2[1] + ty * h * 1.4];
  return `<g transform="rotate(${rot})">${stroke(`M${f(p1[0])} ${f(p1[1])}A${r} ${r} 0 0 1 ${f(p2[0])} ${f(p2[1])}`, col, w)}<path d="M${f(p2[0] + nx * h)} ${f(p2[1] + ny * h)}L${f(tip[0])} ${f(tip[1])}L${f(p2[0] - nx * h)} ${f(p2[1] - ny * h)}Z" fill="${col}"/></g>`;
}).join("");

/* ====================================================================================
   Scène 1 : l'atelier de recyclage
   ==================================================================================== */
function recyclage() {
  const g = [];
  const defs = `<defs><path id="recyclage-btl" d="M-6 0H6Q8 0 8 -3V-20Q8 -25 3 -28V-33H-3V-28Q-8 -25 -8 -20V-3Q-8 0 -6 0Z"/>` +
    `<path id="recyclage-pave" d="M-10 -6L0 -11L10 -6V6L0 11L-10 6Z"/>` +
    `<pattern id="recyclage-tisse" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="${C.white}" opacity=".55"/><rect x="5" y="5" width="5" height="5" fill="${C.white}" opacity=".55"/></pattern>` +
    `<pattern id="recyclage-filet" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 0L8 8M8 0L0 8" stroke="${C.sand2}" stroke-width="1.2"/></pattern></defs>`;
  const btl = (x, y, col, rot = 0, s = 1) => `<use href="#recyclage-btl" fill="${col}" transform="translate(${f(x)} ${f(y)}) rotate(${rot}) scale(${s})"/>`;

  // Mur lumineux et sol en béton
  g.push(G(rect(0, 0, 800, 440, C.white), rect(0, 350, 800, 90, C.sand, ' opacity=".7"'), rect(0, 346, 800, 6, C.sand2)));
  g.push(G(rect(0, 440, 800, 160, C.sand2), rect(0, 440, 800, 160, C.white, ' opacity=".25"'), rect(0, 440, 800, 5, C.wood2, ' opacity=".25"')));
  // Grande baie vitrée à gauche : ciel, manguier et toits du quartier
  g.push(G(
    rect(36, 40, 250, 170, C.sky), cloud(70, 80, 0.6), cloud(200, 70, 0.45),
    [[44, 172, 40], [96, 180, 34], [146, 168, 44], [204, 178, 36]].map(([x, y, w]) => `<path d="M${x} ${y}h${w}v${210 - y}h-${w}Z" fill="${C.sand}"/><path d="M${x - 6} ${y}L${x + w / 2} ${y - 16}L${x + w + 6} ${y}Z" fill="${C.terra}" opacity=".8"/>`).join(""),
    stroke("M246 210V160", C.wood2, 6), `<circle cx="232" cy="140" r="26" fill="${C.leaf2}"/><circle cx="260" cy="132" r="22" fill="${C.leaf}"/>`,
    `<path d="M36 40H286V210H36ZM44 48V202H157V48ZM165 48V202H278V48Z" fill="${C.steel}" fill-rule="evenodd"/>`,
    rect(28, 206, 266, 10, C.grey),
  ));
  // Rayons de lumière
  g.push(G(`<path d="M44 216L157 216L250 440L90 440Z" fill="${C.white}" opacity=".35"/><path d="M165 216L278 216L380 440L230 440Z" fill="${C.white}" opacity=".3"/>`));
  // Affiche : le pictogramme recyclage
  g.push(G(rect(330, 50, 140, 150, C.green, ' rx="10"'), rect(338, 58, 124, 134, C.white, ' rx="6" opacity=".12"'), `<g transform="translate(400 125)">${recycleArrows(36, C.white, 11)}</g>`));
  // Étagères de produits fabriqués (à droite) : pots, bols, puis pavés colorés
  g.push(G(
    rect(520, 120, 240, 10, C.wood), rect(520, 200, 240, 10, C.wood), rect(530, 130, 8, 10, C.wood2), rect(742, 130, 8, 10, C.wood2), rect(530, 210, 8, 10, C.wood2), rect(742, 210, 8, 10, C.wood2),
    `<path d="M546 120L550 82H582L586 120Z" fill="${C.terra}"/><path d="M542 84H590V76H542Z" fill="${C.terra}"/>`,
    `<path d="M602 120Q602 96 626 96Q650 96 650 120Z" fill="${C.indigo}"/>`, `<path d="M662 120L666 90H696L700 120Z" fill="${C.ocre}"/>`, plant(681, 84, 0.4),
    `<path d="M710 120Q710 100 730 100Q750 100 750 120Z" fill="${C.green}"/>`,
    [C.terra, C.ocre, C.indigo, C.green, C.terra, C.ocre, C.indigo, C.green].map((c, i) => `<use href="#recyclage-pave" fill="${c}" transform="translate(${554 + i * 25} ${i % 2 ? 180 : 188}) scale(1.1)"/>`).join(""),
  ));
  // Sacs tissés en plastique, accrochés sous l'étagère
  for (const [x, c] of [[548, C.terra], [626, C.indigo], [704, C.ocre]]) g.push(G(
    `<circle cx="${x + 25}" cy="218" r="3" fill="${C.grey}"/>`, stroke(`M${x + 10} 234Q${x + 25} 210 ${x + 40} 234`, C.dark, 3),
    `<path d="M${x} 234H${x + 50}L${x + 54} 278Q${x + 25} 284 ${x - 4} 278Z" fill="${c}"/><path d="M${x} 234H${x + 50}L${x + 54} 278Q${x + 25} 284 ${x - 4} 278Z" fill="url(#recyclage-tisse)"/>`,
  ));

  // Sacs de collecte pleins de bouteilles (au fond à gauche)
  const sack = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">${btl(-18, -66, C.blue, -20)}${btl(0, -72, C.leaf, 6)}${btl(16, -64, C.white, 24)}${btl(-6, -60, C.rose, -4)}` +
    `<path d="M-34 -60Q-40 -20 -32 0H32Q40 -20 34 -60Q0 -50 -34 -60Z" fill="${C.white}"/><path d="M-34 -60Q-40 -20 -32 0H32Q40 -20 34 -60Q0 -50 -34 -60Z" fill="url(#recyclage-filet)"/>${stroke("M-30 -40Q0 -32 30 -40", C.terra, 3, ' opacity=".7"')}</g>`;
  g.push(G(sack(50, 452, 1)), G(sack(112, 446, 0.85)));

  // Les trois bacs de tri par couleur
  const bins = [[172, C.indigo, C.blue], [230, C.green, C.leaf], [288, C.terra, C.white]];
  for (const [x, c, bc] of bins) g.push(G(
    btl(x + 13, 474, bc, -14), btl(x + 26, 470, bc, 4), btl(x + 39, 476, bc, 18),
    `<path d="M${x} 470H${x + 52}L${x + 48} 548H${x + 4}Z" fill="${c}"/>`, rect(x - 3, 466, 58, 8, c, ' rx="3"'), rect(x - 3, 466, 58, 8, C.white, ' rx="3" opacity=".25"'),
    btl(x + 26, 524, C.white, 0, 0.7).replace('fill="', 'opacity=".75" fill="'),
  ));

  // La trieuse, box braids et wax : elle lâche une bouteille bleue dans le bac bleu
  const W = { x: 108, y: 552, s: 0.92 }, wsk = SKIN.s3;
  const [lx, ly] = toLocal(W, 194, 418);
  g.push(G(person({ ...W, skin: wsk, hair: { type: "boxbraids", beads: C.ocre }, top: C.terra, wax: "wax1", legs: "skirt", bottom: C.indigo, bwax: "wax2", face: "smile", sleeve: "short",
    arms: { r: [[60, -172], [lx, ly]], l: [[-44, -150], [-34, -116]] },
    rhand: (hx, hy) => btl(hx, hy - 6, C.blue, 180, 0.95) + hand(hx, hy, wsk),
    lhand: (hx, hy) => btl(hx, hy + 30, C.leaf, 0) + hand(hx, hy, wsk) })));

  // La broyeuse : trémie, moteur, boutons ; les paillettes tombent dans un bac
  g.push(G(
    `<ellipse cx="420" cy="556" rx="74" ry="7" fill="${C.dark}" opacity=".15"/>`,
    rect(360, 430, 120, 116, C.steel, ' rx="6"'), rect(360, 430, 120, 14, C.grey, ' rx="4"'),
    `<path d="M376 430L362 376H478L464 430Z" fill="${C.ocre}"/><path d="M362 376H478V368H362Z" fill="${C.ocre}"/><path d="M362 376H478V368H362Z" fill="${C.dark}" opacity=".18"/>`,
    btl(402, 372, C.blue, -30, 0.8), btl(430, 370, C.leaf, 20, 0.8),
    `<circle cx="394" cy="474" r="20" fill="${C.grey}"/><circle cx="394" cy="474" r="7" fill="${C.dark}"/>`, stroke("M394 454L394 494M374 474H414", C.dark, 3, ' opacity=".4"'),
    rect(440, 450, 30, 40, C.dark, ' rx="4"'), `<circle cx="455" cy="462" r="5" fill="${C.leaf}"/><circle cx="455" cy="478" r="5" fill="${C.red}"/>`,
    `<path d="M404 508H446L440 528H410Z" fill="${C.grey}"/>`,
  ));
  g.push(G(`<path d="M392 534H458L452 562H398Z" fill="${C.wood2}"/>`, rect(392, 532, 66, 5, C.wood, ' rx="2"'),
    [[400, C.blue], [408, C.leaf], [416, C.terra], [424, C.blue], [432, C.white], [440, C.leaf], [448, C.ocre], [412, C.ocre], [436, C.blue]].map(([x, c], i) => rect(x, 526 + (i % 3) * 2, 6, 5, c, ` transform="rotate(${i * 25} ${x} 528)"`)).join("")));

  // Le jeune homme en dashiki qui fait tourner la broyeuse (main sur le bouton vert)
  const M = { x: 514, y: 552, s: 0.95, flip: true }, msk = SKIN.s1;
  const [bx, by] = toLocal(M, 461, 462);
  g.push(G(person({ ...M, skin: msk, hair: { type: "short" }, top: C.green, dashiki: C.ocre, bottom: C.dark, face: "smile", sleeve: "short",
    hat: { type: "cap", color: C.indigo },
    arms: { r: [[52, -150], [bx, by]], l: [[-46, -150], [-32, -116]] },
    lhand: (hx, hy) => `<path d="M${hx - 18} ${hy}H${hx + 18}L${hx + 14} ${hy + 30}H${hx - 14}Z" fill="${C.indigo}"/>` + [[-10, C.blue], [-2, C.leaf], [6, C.terra], [12, C.ocre]].map(([dx, c]) => rect(hx + dx - 2, hy - 4, 5, 5, c)).join("") + hand(hx, hy, msk) })));

  // La vendeuse, tresses peules et kitenge, qui présente un sac tissé et les pavés
  const V = { x: 588, y: 556, s: 0.88 }, vsk = SKIN.s4;
  g.push(G(person({ ...V, skin: vsk, hair: { type: "fulani", beads: C.ocre }, robe: "dress", top: C.green, wax: "kitenge", face: "talk",
    point: toLocal(V, 650, 524),
    arms: { r: [[50, -156], [58, -128]], l: [[-46, -160], [-50, -128]] },
    lhand: (hx, hy) => stroke(`M${hx - 10} ${hy + 2}Q${hx} ${hy - 14} ${hx + 10} ${hy + 2}`, C.dark, 3) +
      `<path d="M${hx - 20} ${hy + 4}H${hx + 20}L${hx + 24} ${hy + 48}Q${hx} ${hy + 54} ${hx - 24} ${hy + 48}Z" fill="${C.ocre}"/><path d="M${hx - 20} ${hy + 4}H${hx + 20}L${hx + 24} ${hy + 48}Q${hx} ${hy + 54} ${hx - 24} ${hy + 48}Z" fill="url(#recyclage-tisse)"/>` + hand(hx, hy, vsk) })));

  // Le client en boubou et kufi, intéressé
  g.push(G(person({ x: 724, y: 558, s: 0.9, flip: true, skin: SKIN.s2, hair: { type: "short" }, beard: true, hat: { type: "kufi", color: C.terra, wax: "kente" }, robe: "boubou", top: C.indigo, wax: "wax3", face: "smile",
    arms: { l: [[-32, -150], [-26, -112]], r: [[38, -156], [20, -136]] } })));

  // Palette de pavés colorés au sol, au premier plan entre eux
  const pv = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3 - (r === 2 ? 1 : 0); c++) pv.push(`<use href="#recyclage-pave" fill="${[C.terra, C.ocre, C.indigo, C.green][(r + c) % 4]}" transform="translate(${634 + c * 18 + (r % 2) * 9 + (r === 2 ? 9 : 0)} ${542 - r * 14}) scale(.9 .7)"/>`);
  g.push(G(rect(622, 548, 62, 8, C.wood), rect(626, 556, 8, 5, C.wood2), rect(672, 556, 8, 5, C.wood2), pv.join("")));

  // Bulle : la feuille (fabriqué à partir de déchets)
  g.push(G(bubble(248, 302, `<path d="M-12 12Q-16 -14 14 -14Q16 12 -12 12Z" fill="${C.white}"/>${stroke("M-10 10L8 -8", C.green, 2.5)}`, C.green)));

  return frame(defs + g.join(""), C.sky);
}

/* ====================================================================================
   Scène 2 : à la microfinance
   ==================================================================================== */
function banque() {
  const g = [];
  const defs = `<defs><pattern id="banque-sol" width="60" height="30" patternUnits="userSpaceOnUse"><path d="M0 0H60M0 0V30" stroke="${C.wood2}" stroke-width="1.5" opacity=".2"/></pattern></defs>`;
  // Mur clair, frise, sol carrelé
  g.push(G(rect(0, 0, 800, 440, C.cream), rect(0, 372, 800, 68, C.sand, ' opacity=".8"'), rect(0, 368, 800, 6, C.ocre, ' opacity=".6"')));
  g.push(G(rect(0, 440, 800, 160, C.sand2), rect(0, 440, 800, 160, "url(#banque-sol)")));
  // Plafonniers
  for (const x of [200, 600]) g.push(G(rect(x - 60, 0, 120, 10, C.white), rect(x - 60, 10, 120, 4, C.steel)));

  // Affiches en pictogrammes : pièces, graphique qui monte, maison
  const poster = (x, inner, col) => G(rect(x, 96, 88, 104, col, ' rx="8"'), `<g transform="translate(${x + 44} 148)">${inner}</g>`);
  g.push(poster(268, [18, 6, -6].map((y, i) => `<ellipse cx="${i === 2 ? 6 : 0}" cy="${y}" rx="22" ry="8" fill="${C.yellow}"/><ellipse cx="${i === 2 ? 6 : 0}" cy="${y - 3}" rx="22" ry="8" fill="${C.ocre}"/>`).join("") + `<ellipse cx="6" cy="-9" rx="12" ry="4" fill="${C.yellow}"/>`, C.indigo));
  g.push(poster(372, rect(-28, 14, 12, 16, C.white) + rect(-10, 2, 12, 28, C.white) + rect(8, -12, 12, 42, C.white) + stroke("M-28 -2L-8 -14L6 -22L24 -34", C.yellow, 4) + `<path d="M28 -38L14 -36L24 -26Z" fill="${C.yellow}"/>`, C.green));
  g.push(poster(476, `<path d="M-26 0L0 -26L26 0Z" fill="${C.white}"/>` + rect(-18, -2, 36, 30, C.white) + rect(-6, 10, 12, 18, C.terra), C.terra));

  /* Le guichet (à gauche) : la caissière derrière la vitre */
  const K = { x: 98, y: 548, s: 0.9 }, ksk = SKIN.s4;
  const kHand = toLocal(K, 160, 398);
  g.push(G(
    rect(20, 250, 220, 190, C.white, ' opacity=".6"'),
    person({ ...K, skin: ksk, hair: { type: "bantu" }, legs: "none", top: C.indigo, wax: "wax2", face: "smile",
      arms: { l: [[-40, -150], [-30, -118]], r: [[48, -150], kHand] },
      rhand: (hx, hy) => `<g transform="translate(${hx} ${hy}) rotate(-10)">${rect(-4, -10, 30, 16, C.leaf, ' rx="2"')}${rect(0, -6, 30, 16, C.leaf2, ' rx="2"')}<circle cx="15" cy="2" r="4" fill="${C.yellow}" opacity=".7"/></g>` + hand(hx, hy, ksk) }),
    // vitre, avec le passe-documents
    rect(20, 250, 220, 160, C.blue, ' opacity=".14"'), `<path d="M40 262L80 262L40 330Z" fill="${C.white}" opacity=".5"/>`,
    rect(16, 244, 228, 8, C.steel), rect(16, 244, 8, 172, C.steel), rect(236, 244, 8, 172, C.steel),
    rect(110, 406, 80, 10, C.grey, ' rx="3"'),
    // comptoir
    rect(10, 412, 240, 14, C.wood), rect(18, 426, 224, 132, C.indigo), rect(18, 426, 224, 132, C.white, ' opacity=".06"'),
    `<g transform="translate(130 492)"><circle r="24" fill="${C.ocre}"/><circle r="15" fill="${C.indigo}"/><circle r="7" fill="${C.ocre}"/></g>`,
  ));
  // Plante sur le comptoir
  g.push(G(plant(44, 398, 0.6)));
  // Horloge murale et numéro du guichet
  g.push(G(`<circle cx="130" cy="150" r="34" fill="${C.white}"/><circle cx="130" cy="150" r="34" fill="none" stroke="${C.indigo}" stroke-width="6"/>`, stroke("M130 150V128M130 150L146 158", C.dark, 4), `<circle cx="130" cy="150" r="4" fill="${C.terra}"/>`));
  g.push(G(rect(100, 212, 60, 30, C.ocre, ' rx="6"'), stroke("M127 220L132 216V236", C.white, 4)));
  // La cliente au guichet (de trois quarts, tournée vers la vitre), foulard et pagne kente
  const Q = { x: 250, y: 566, s: 0.96, flip: true }, qsk = SKIN.s2;
  const qHand = toLocal(Q, 192, 404);
  g.push(G(person({ ...Q, skin: qsk, hair: { type: "foulard", color: C.terra, wax: "wax1" }, top: C.ocre, legs: "skirt", bottom: C.green, bwax: "kente", sleeve: "short", face: "talk",
    arms: { r: [[52, -160], qHand], l: [[-42, -150], [-36, -112]] },
    lhand: (hx, hy) => `<path d="M${hx - 12} ${hy}H${hx + 12}L${hx + 14} ${hy + 30}H${hx - 14}Z" fill="${C.dark}"/>` + hand(hx, hy, qsk) })));

  // File d'attente ordonnée : poteaux et cordon
  const post = (x) => G(rect(x - 3, 488, 6, 70, C.grey), `<ellipse cx="${x}" cy="560" rx="14" ry="4" fill="${C.grey}"/><circle cx="${x}" cy="486" r="6" fill="${C.steel}"/>`);
  g.push(G(post(282), post(380), stroke("M282 494Q331 512 380 494", C.terra, 5)));
  // Le monsieur qui attend son tour, en ndop, son livret à la main
  const A = { x: 328, y: 542, s: 0.86 }, ask = SKIN.s3;
  g.push(G(person({ ...A, skin: ask, hair: { type: "short" }, beard: true, top: "#1C2756", wax: "ndop", bottom: C.dark, face: "calm",
    arms: { l: [[-36, -156], [-14, -136]], r: [[38, -150], [36, -110]] },
    lhand: (hx, hy) => rect(hx - 4, hy - 14, 18, 24, C.green, ' rx="2"') + rect(hx + 2, hy - 8, 8, 2, C.white) + hand(hx, hy, ask) })));

  // Plante en pot
  // L'agente d'accueil, badge au cou, qui oriente la file
  const Ac = { x: 408, y: 546, s: 0.86, flip: true }, acsk = SKIN.s5;
  g.push(G(person({ ...Ac, skin: acsk, hair: { type: "boxbraids", beads: C.white }, top: C.green, sleeve: "short", legs: "skirt", bottom: C.dark, bwax: "bogolan", face: "talk",
    arms: { r: [[36, -150], [16, -136]], l: [[-36, -150], [-16, -136]] } }),
    at(Ac.x, Ac.y, Ac.s, true, stroke("M-12 -204L0 -176L12 -204", C.indigo, 2) + rect(-7, -178, 14, 17, C.white, ' rx="2"') + rect(-4, -172, 8, 3, C.indigo) +
      `<g transform="rotate(-8 0 -140)">${rect(-22, -158, 44, 30, C.dark, ' rx="4"')}${rect(-19, -155, 38, 24, C.sky, ' rx="2"')}${rect(-14, -150, 20, 3, C.green)}${rect(-14, -144, 26, 3, C.grey)}${rect(-14, -138, 16, 3, C.grey)}</g>` +
      hand(-18, -134, acsk) + hand(18, -138, acsk))));

  /* Le bureau du conseiller */
  const B = { x: 652, y: 548, s: 0.92 }, bsk = SKIN.s1;
  g.push(G(
    // chaise du conseiller
    rect(612, 370, 80, 90, C.dark, ' rx="10"'),
    person({ ...B, skin: bsk, hair: { type: "rase" }, jacket: { color: C.indigo, shirt: C.white, tie: C.terra }, legs: "none", face: "talk",
      arms: { l: [[-40, -150], toLocal(B, 590, 434)], r: [[40, -150], toLocal(B, 690, 434)] } }),
  ));
  // L'ordinateur
  g.push(G(rect(694, 364, 72, 50, C.dark, ' rx="4"'), rect(699, 369, 62, 40, C.blue, ' opacity=".55"'), stroke("M704 400L718 392L730 396L752 378", C.white, 2.5), rect(724, 414, 10, 18, C.grey), rect(712, 430, 34, 5, C.grey, ' rx="2"')));
  // Le bureau
  g.push(G(
    rect(500, 432, 290, 12, C.wood2), rect(510, 444, 270, 116, C.wood), rect(510, 444, 270, 8, C.wood2, ' opacity=".4"'),
    rect(670, 466, 90, 30, C.wood2, ' opacity=".35" rx="3"'), rect(670, 506, 90, 30, C.wood2, ' opacity=".35" rx="3"'), rect(706, 478, 18, 5, C.ocre, ' rx="2"'), rect(706, 518, 18, 5, C.ocre, ' rx="2"'),
  ));
  // Sur le bureau : le contrat, le clavier, le porte-stylos
  g.push(G(`<path d="M560 438L612 432L620 440L566 446Z" fill="${C.white}"/>`, stroke("M570 438L604 434", C.grey, 1.5), rect(664, 428, 46, 6, C.grey, ' rx="2"'), rect(768, 412, 12, 20, C.terra, ' rx="2"')));
  // Redessine les mains du conseiller sur le bureau
  g.push(G(...[[590, 434], [690, 434]].map(([x, y]) => hand(x, y, bsk, 7))));

  // La commerçante, gele et kaba, assise : elle signe
  const S = { x: 488, y: 560, s: 0.95 }, ssk = SKIN.s3;
  const sHand = toLocal(S, 574, 438);
  g.push(G(
    rect(436, 360, 14, 110, C.dark, ' rx="5"'), rect(436, 462, 74, 12, C.dark, ' rx="4"'), rect(442, 474, 6, 86, C.grey), rect(498, 474, 6, 86, C.grey),
    person({ ...S, skin: ssk, hair: { type: "gele", color: C.ocre, wax: "wax2" }, legs: "sit", robe: "kaba", top: C.terra, wax: "wax1", face: "smile",
      arms: { r: [[54, -150], sHand], l: [[-34, -150], [-6, -122]] },
      rhand: (hx, hy) => `<g transform="translate(${hx} ${hy}) rotate(30)">${rect(-2, -18, 4, 22, C.dark, ' rx="1.5"')}</g>` + hand(hx, hy, ssk) }),
  ));

  // Bulle : la boutique financée
  g.push(G(bubble(620, 244, `<path d="M-16 -4H16V14H-16Z" fill="${C.white}"/><path d="M-19 -6L-14 -16H14L19 -6Z" fill="${C.white}"/>${rect(-4, 3, 8, 11, C.ocre)}${stroke("M-18 -6H18", C.ocre, 3)}`, C.ocre)));
  g.push(G(`<circle cx="644" cy="222" r="11" fill="${C.green}"/><g transform="translate(644 222) scale(.55)">${check()}</g>`));

  return frame(defs + g.join(""), C.cream);
}

/* ====================================================================================
   Scène 3 : chez le dentiste
   ==================================================================================== */
function dentiste() {
  const g = [];
  const tooth = (s = 1, col = C.white) => `<path transform="scale(${s})" d="M-14 -14Q-14 -24 -6 -24Q0 -21 6 -24Q14 -24 14 -14Q14 -4 10 4L8 20Q6 24 4 20L2 8Q0 4 -2 8L-4 20Q-6 24 -8 20L-10 4Q-14 -4 -14 -14Z" fill="${col}"/>`;
  // Mur bleu pâle, carrelage, sol
  g.push(G(rect(0, 0, 800, 450, C.blue, ' opacity=".18"'), rect(0, 330, 800, 120, C.white, ' opacity=".7"'),
    `<path d="${[...Array(14)].map((_, i) => `M${i * 60} 330V450`).join("")}M0 370H800M0 410H800" stroke="${C.steel}" stroke-width="1.5"/>`));
  g.push(G(rect(0, 450, 800, 150, C.steel, ' opacity=".55"'), rect(0, 450, 800, 4, C.grey, ' opacity=".4"')));

  // Affiche : brosse à dents et dent qui sourit
  g.push(G(rect(48, 78, 150, 170, C.green, ' rx="10"'), rect(56, 86, 134, 154, C.white, ' rx="6" opacity=".15"'),
    `<g transform="translate(108 172)">${tooth(2.1)}<ellipse cx="-9" cy="-24" rx="3.2" ry="4" fill="${C.dark}"/><ellipse cx="9" cy="-24" rx="3.2" ry="4" fill="${C.dark}"/>${stroke("M-12 -10Q0 0 12 -10", C.terra, 3.5)}<circle cx="-18" cy="-14" r="4" fill="${C.rose}" opacity=".6"/><circle cx="18" cy="-14" r="4" fill="${C.rose}" opacity=".6"/></g>`,
    `<g transform="translate(170 160) rotate(20)">${rect(-4, -10, 8, 74, C.ocre, ' rx="4"')}${rect(-6, -32, 12, 24, C.ocre, ' rx="3"')}${[...Array(5)].map((_, i) => rect(-12, -30 + i * 4.5, 6, 3, C.white)).join("")}</g>`,
    `<path d="M150 108l3 7l7 3l-7 3l-3 7l-3 -7l-7 -3l7 -3Z" fill="${C.yellow}"/><path d="M70 120l2 5l5 2l-5 2l-2 5l-2 -5l-5 -2l5 -2Z" fill="${C.yellow}"/>`));
  // Fenêtre avec manguier
  g.push(G(rect(246, 60, 120, 110, C.sky), `<circle cx="300" cy="140" r="34" fill="${C.leaf}"/><circle cx="336" cy="128" r="26" fill="${C.leaf2}"/>`, cloud(262, 92, 0.4),
    `<path d="M246 60H366V170H246ZM252 66V164H303V66ZM309 66V164H360V66Z" fill="${C.white}" fill-rule="evenodd"/>`));

  // Le meuble de soins (à droite) : modèle de dents et gobelets
  g.push(G(rect(570, 380, 190, 168, C.white), rect(564, 372, 202, 12, C.steel), rect(580, 396, 80, 60, C.sky, ' rx="4"'), rect(670, 396, 80, 60, C.sky, ' rx="4"'), rect(580, 466, 170, 70, C.sky, ' rx="4"'),
    rect(612, 424, 18, 4, C.grey, ' rx="2"'), rect(702, 424, 18, 4, C.grey, ' rx="2"'), rect(656, 496, 20, 4, C.grey, ' rx="2"')));
  g.push(G(`<path d="M574 372Q574 338 608 336Q642 338 642 372Z" fill="${C.rose}"/>`,
    [...Array(7)].map((_, i) => { const a = Math.PI * (0.12 + i * 0.127); return `<ellipse cx="${f(608 - Math.cos(a) * 26)}" cy="${f(366 - Math.sin(a) * 22)}" rx="5" ry="6.5" fill="${C.white}"/>`; }).join("")));
  g.push(G(`<path d="M722 372L724 348H740L742 372Z" fill="${C.ocre}"/>`, rect(730, 336, 3, 16, C.terra), rect(735, 334, 3, 18, C.indigo)));

  // La lampe : bras articulé fixé au plafond
  g.push(G(rect(470, 0, 40, 10, C.grey), stroke("M490 10V110L452 200", C.grey, 8), `<circle cx="490" cy="110" r="8" fill="${C.steel}"/>`,
    `<path d="M410 214L452 186L476 222L436 248Z" fill="${C.steel}"/><path d="M418 232L460 206L436 248Z" fill="${C.yellow}"/>`,
    `<path d="M424 240L456 218L440 380L360 360Z" fill="${C.yellow}" opacity=".16"/>`));

  // Le fauteuil
  const chair = G(
    `<ellipse cx="420" cy="548" rx="70" ry="8" fill="${C.dark}" opacity=".15"/>`, rect(376, 540, 96, 10, C.grey, ' rx="4"'), rect(408, 486, 22, 56, C.steel),
    `<path d="M350 330Q346 316 360 316H384Q396 316 394 330L396 468H360Z" fill="${C.indigo}"/>`, rect(348, 312, 48, 26, C.indigo, ' rx="10"'),
    rect(356, 462, 120, 22, C.indigo, ' rx="8"'), `<path d="M450 470L496 520L486 530L440 482Z" fill="${C.indigo}"/>`,
  );
  g.push(chair);

  // L'enfant, souriant, assis dans le fauteuil ; la maman lui tient la main
  const E = { x: 404, y: 528, s: 0.7 }, esk = SKIN.s4;
  const eHand = toScene(E, -64, -124);
  g.push(G(person({ ...E, skin: esk, hair: { type: "puffs" }, legs: "sit", top: C.yellow, bottom: C.terra, sleeve: "short", face: "laugh",
    arms: { l: [[-44, -150], [-64, -124]], r: [[36, -150], [40, -116]] } }),
    // accoudoir par-dessus
    rect(418, 452, 46, 10, C.indigo, ' rx="5"'), rect(418, 452, 46, 10, C.white, ' rx="5" opacity=".15"')));

  // La dentiste, nattes et blouse, examine avec le miroir
  const D = { x: 500, y: 552, s: 0.98, flip: true }, dsk = SKIN.s2;
  const mouth = [E.x, E.y - 222 * E.s];
  const dH = toLocal(D, mouth[0] + 40, mouth[1] + 4);
  g.push(G(person({ ...D, skin: dsk, hair: { type: "nattes" }, coat: { inner: C.green }, bottom: C.indigo, face: "talk",
    arms: { r: [[58, -156], dH], l: [[-44, -150], [-36, -112]] },
    rhand: (hx, hy) => `<g transform="translate(${hx} ${hy}) rotate(-4)">${rect(0, -2, 26, 4, C.steel, ' rx="2"')}<circle cx="29" cy="0" r="5" fill="${C.steel}"/><circle cx="29" cy="0" r="3" fill="${C.white}"/></g>` + hand(hx, hy, dsk) })));

  // La maman en foulard et kitenge
  const Mo = { x: 300, y: 556, s: 0.95 }, mosk = SKIN.s3;
  const mH = toLocal(Mo, eHand[0] - 4, eHand[1] + 2);
  g.push(G(person({ ...Mo, skin: mosk, hair: { type: "foulard", color: C.terra, wax: "wax3" }, robe: "dress", top: C.green, wax: "kitenge", face: "smile",
    arms: { r: [[52, -154], mH], l: [[-40, -150], [-36, -110]] } }),
    hand(eHand[0], eHand[1], esk, 5)));

  // L'assistant avec le plateau d'instruments
  const As = { x: 680, y: 564, s: 0.94, flip: true }, assk = SKIN.s5;
  g.push(G(person({ ...As, skin: assk, hair: { type: "locks" }, beard: true, top: C.indigo, bottom: C.indigo, sleeve: "short", face: "smile",
    arms: { l: [[-38, -150], [-26, -136]], r: [[38, -150], [26, -136]] } }),
    at(As.x, As.y, As.s, true, rect(-44, -146, 88, 8, C.steel, ' rx="3"') + rect(-40, -152, 18, 6, C.white, ' rx="2"') +
      rect(-16, -150, 30, 3, C.grey, ' rx="1.5"') + `<circle cx="18" cy="-149" r="4" fill="${C.grey}"/>` + rect(24, -156, 12, 10, C.ocre, ' rx="2"') +
      hand(-26, -138, assk) + hand(26, -138, assk))));

  // Bulle : la dent qui brille
  g.push(G(bubble(560, 230, `<g transform="translate(0 0)">${tooth(0.8)}</g><path d="M14 -18l2 4l4 2l-4 2l-2 4l-2 -4l-4 -2l4 -2Z" fill="${C.yellow}"/>`, C.terra)));

  return frame(g.join(""), C.white);
}

export default [
  { id: "recyclage", fr: "L'atelier de recyclage", en: "The recycling workshop", tags: ["recyclage", "recycling", "plastique", "plastic", "déchets", "waste", "entrepreneurs", "atelier", "workshop", "environnement", "environment", "pavés", "pavers", "économie circulaire", "circular economy"], draw: recyclage },
  { id: "banque", fr: "À la microfinance", en: "At the microfinance office", tags: ["microfinance", "banque", "bank", "prêt", "loan", "crédit", "credit", "épargne", "savings", "commerçante", "trader", "guichet", "counter", "compte", "account"], draw: banque },
  { id: "dentiste", fr: "Chez le dentiste", en: "At the dentist", tags: ["dentiste", "dentist", "dents", "teeth", "santé", "health", "enfant", "child", "soins", "care", "hygiène", "hygiene", "sourire", "smile"], draw: dentiste },
];
