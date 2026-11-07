// Scènes : le centre de santé, la récolte du cacao, le foot de quartier.
import { C, SKIN, HAIR, person, frame, palm, cloud, bubble, stroke } from "./lib.mjs";

/** Groupe dans le repère local d'un personnage (mêmes x, y, s, flip) : pour dessiner par-dessus. */
const local = (o, svg) => `<g transform="translate(${o.x} ${o.y}) scale(${o.flip ? -(o.s ?? 1) : o.s ?? 1} ${o.s ?? 1})">${svg}</g>`;
const heart = (col, k = 1) => `<path transform="scale(${k})" d="M0 12Q-16 0 -16 -8Q-16 -16 -8 -16Q-3 -16 0 -10Q3 -16 8 -16Q16 -16 16 -8Q16 0 0 12Z" fill="${col}"/>`;
const hand = (x, y, skin, r = 7.5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${skin}"/>`;
/** Peint une forme d'une couleur, avec un motif par-dessus. */
const cloth = (d, col, pat, extra = "") => `<path d="${d}" fill="${col}"${extra}/>` + (pat ? `<path d="${d}" fill="url(#${pat})"${extra}/>` : "");

/** Tête de bébé : crâne rond, cheveux courts frisés, oreille ; centre (x,y), rayon r. */
const babyHead = (x, y, r, skin, k = 1) => `<g transform="translate(${x} ${y}) scale(${k} 1)">`
  + `<ellipse cx="${-r * 0.92}" cy="${r * 0.12}" rx="${r * 0.22}" ry="${r * 0.3}" fill="${skin}"/><ellipse cx="${r * 0.92}" cy="${r * 0.12}" rx="${r * 0.22}" ry="${r * 0.3}" fill="${skin}"/>`
  + `<circle r="${r}" fill="${skin}"/>`
  + `<path d="M${-r} ${-r * 0.05}Q${-r * 1.05} ${-r * 1.08} 0 ${-r * 1.08}Q${r * 1.05} ${-r * 1.08} ${r} ${-r * 0.05}Q${r * 0.8} ${-r * 0.6} ${r * 0.3} ${-r * 0.62}Q0 ${-r * 0.45} ${-r * 0.35} ${-r * 0.62}Q${-r * 0.8} ${-r * 0.6} ${-r} ${-r * 0.05}Z" fill="${HAIR}"/>`
  + [[-0.55, -0.85], [-0.1, -1.02], [0.38, -0.9], [0.78, -0.55], [-0.85, -0.45]].map(([a, b]) => `<circle cx="${a * r}" cy="${b * r}" r="${r * 0.2}" fill="${HAIR}"/>`).join("")
  + `</g>`;

/* ---------- Scène 1 : le centre de santé ---------- */
function sante() {
  const g = [];
  // Soubassement peint, plinthe, carrelage
  g.push(`<rect y="330" width="800" height="140" fill="${C.sky}"/><rect y="326" width="800" height="8" fill="${C.white}"/><rect y="468" width="800" height="132" fill="${C.sand2}"/>`);
  for (let x = 0; x < 800; x += 80) g.push(`<rect x="${x}" y="468" width="2" height="132" fill="${C.sand}"/>`);
  g.push(`<rect y="530" width="800" height="2" fill="${C.sand}"/>`);
  // Fenêtre à persiennes (naco), un palmier dehors
  g.push(`<rect x="50" y="64" width="180" height="176" rx="8" fill="${C.white}"/><rect x="62" y="76" width="156" height="152" rx="3" fill="${C.blue}" opacity=".3"/>`);
  g.push(`<path d="M62 200Q110 186 160 196Q190 190 218 196V228H62Z" fill="${C.rose}"/>`);
  g.push(stroke("M168 210Q160 160 172 118", C.wood, 7), ...[[120, 104], [128, 140], [214, 108], [218, 146], [176, 86]].map(([px, py]) => `<path d="M172 118Q${(px + 172) / 2} ${py - 18} ${px} ${py}Q${(px + 172) / 2} ${py - 4} 172 118Z" fill="${C.leaf2}"/>`));
  for (let y = 84; y < 226; y += 16) g.push(`<rect x="62" y="${y}" width="156" height="6" fill="${C.white}" opacity=".55"/>`);
  g.push(`<rect x="137" y="76" width="6" height="152" fill="${C.white}"/>`);
  // Affiche de vaccination, sans texte : mère et bébé, seringue, calendrier coché
  g.push(`<rect x="568" y="64" width="140" height="176" rx="6" fill="${C.white}"/><rect x="580" y="76" width="116" height="96" rx="4" fill="${C.green}" opacity=".18"/>`);
  g.push(`<circle cx="616" cy="100" r="11" fill="${SKIN.s3}"/><path d="M600 150Q600 116 616 114Q632 116 632 150Z" fill="${C.terra}"/><circle cx="630" cy="124" r="7" fill="${SKIN.s3}"/><ellipse cx="626" cy="136" rx="13" ry="8" fill="${C.ocre}"/>`);
  g.push(`<g transform="translate(666 124) rotate(40)"><rect x="-5" y="-24" width="10" height="34" rx="2" fill="${C.white}"/><rect x="-5" y="-6" width="10" height="16" fill="${C.blue}"/><rect x="-9" y="-28" width="18" height="5" rx="2" fill="${C.indigo}"/><rect x="-1.5" y="-38" width="3" height="10" fill="${C.indigo}"/><rect x="-1" y="10" width="2" height="14" fill="${C.grey}"/></g>`);
  for (let i = 0; i < 4; i++) g.push(`<rect x="${584 + i * 28}" y="184" width="22" height="22" rx="4" fill="${i < 3 ? C.green : C.sand}"/>` + (i < 3 ? `<g transform="translate(${595 + i * 28} 195) scale(.5)">${stroke("M-12 0L-3 9L13 -9", C.white, 6)}</g>` : ""));
  g.push(`<rect x="584" y="216" width="70" height="7" rx="3.5" fill="${C.sand2}"/><circle cx="638" cy="64" r="5" fill="${C.terra}"/>`);
  // Ventilateur au plafond
  g.push(`<rect x="437" y="0" width="6" height="40" fill="${C.grey}"/><ellipse cx="440" cy="48" rx="16" ry="9" fill="${C.grey}"/>`);
  g.push(`<path d="M440 44Q400 34 360 40Q358 48 368 50Q404 54 440 50Z" fill="${C.wood2}"/><path d="M440 44Q480 34 520 40Q522 48 512 50Q476 54 440 50Z" fill="${C.wood2}"/><ellipse cx="440" cy="56" rx="7" ry="5" fill="${C.steel}"/>`);
  g.push(stroke("M376 62Q404 70 432 66M448 66Q476 70 504 62", C.white, 3, ' opacity=".7"'));
  // Banc d'attente et une autre maman, bébé au dos
  g.push(`<rect x="34" y="364" width="236" height="14" rx="4" fill="${C.wood2}"/><rect x="34" y="384" width="236" height="10" rx="4" fill="${C.wood2}"/>${stroke("M48 364V440M256 364V440", C.wood2, 8)}`);
  const attente = { x: 112, y: 540, s: 1, skin: SKIN.s4, hair: { type: "gele", color: C.terra, wax: "wax2" }, top: C.green, wax: "kitenge", robe: "boubou", legs: "sit",
    arms: { l: [[-40, -150], [-6, -112]], r: [[42, -150], [44, -110]] } };
  // Le bébé et le pagne, derrière la maman
  g.push(local(attente, cloth("M-48 -204Q-70 -164 -58 -124Q-40 -112 -30 -124H30Q40 -112 58 -124Q70 -164 48 -204Z", C.ocre, "wax1") + babyHead(-38, -220, 16, SKIN.s3)));
  g.push(`<rect x="30" y="440" width="244" height="14" rx="4" fill="${C.wood}"/>${stroke("M46 454V540M258 454V540", C.wood, 9)}`);
  g.push(person(attente));
  // Le nœud du pagne sur la poitrine, la petite main sur l'épaule
  g.push(local(attente, cloth("M-36 -188Q0 -176 36 -188L36 -172Q0 -160 -36 -172Z", C.ocre, "wax1") + `<path d="M-6 -178L6 -178L10 -160L0 -164L-10 -160Z" fill="${C.ocre}"/>` + hand(-28, -202, SKIN.s3, 5.5)));
  g.push(`<path d="M206 440Q218 424 232 432Q240 438 236 440Z" fill="${C.indigo}"/><ellipse cx="226" cy="436" rx="16" ry="6" fill="${C.ocre}"/>`); // sac posé sur le banc
  // Table : pèse-bébé et glacière à vaccins
  g.push(`<rect x="588" y="420" width="196" height="12" rx="4" fill="${C.wood}"/>${stroke("M602 432V556M770 432V556", C.wood2, 9)}<rect x="602" y="500" width="168" height="8" fill="${C.wood2}"/>`);
  g.push(`<rect x="604" y="386" width="100" height="34" rx="7" fill="${C.white}"/><circle cx="654" cy="403" r="11" fill="${C.cream}" stroke="${C.steel}" stroke-width="3"/>${stroke("M654 403L660 397", C.red, 2.5)}`);
  g.push(`<rect x="648" y="374" width="12" height="12" fill="${C.steel}"/><path d="M600 362Q654 386 708 362L704 376Q654 396 604 376Z" fill="${C.indigo}"/>`);
  g.push(`<rect x="718" y="370" width="58" height="50" rx="6" fill="${C.blue}"/><rect x="714" y="362" width="66" height="14" rx="5" fill="${C.white}"/>${stroke("M732 362Q747 346 762 362", C.grey, 4)}<path d="M743 386H751V394H759V402H751V410H743V402H735V394H743Z" fill="${C.white}"/>`);
  g.push(`<rect x="612" y="482" width="40" height="18" rx="3" fill="${C.white}"/><rect x="660" y="476" width="36" height="24" rx="3" fill="${C.terra}"/>`);
  // Mère en kaba et gele, bébé emmailloté dans un pagne wax
  const mere = { x: 368, y: 566, s: 1.1, skin: SKIN.s2, hair: { type: "gele", color: C.indigo, wax: "wax1" }, top: C.terra, wax: "wax2", robe: "kaba",
    arms: { l: [[-38, -158], [0, -136]], r: [[44, -160], [34, -152]] } };
  g.push(person(mere));
  const swaddle = "M-22 -128Q-40 -150 -20 -172Q6 -196 44 -184Q62 -174 56 -154Q48 -132 18 -126Q-6 -120 -22 -128Z";
  g.push(local(mere, cloth(swaddle, C.green, "wax1")
    + stroke("M-14 -140Q14 -150 46 -176", "rgba(0,0,0,.16)", 3)
    + `<path d="M22 -186Q44 -200 62 -184Q58 -170 44 -172Q30 -170 22 -186Z" fill="${C.green}"/><path d="M22 -186Q44 -200 62 -184Q58 -170 44 -172Q30 -170 22 -186Z" fill="url(#wax1)"/>`
    + babyHead(46, -200, 19, SKIN.s3)
    + stroke("M56 -172L72 -188", SKIN.s3, 7) + hand(74, -190, SKIN.s3, 5.5)
    + hand(0, -136, SKIN.s2) + hand(34, -152, SKIN.s2)));
  // Soignante en blouse, tresses, stéthoscope sur le bébé, carnet de santé dans l'autre main
  const soignante = { x: 512, y: 566, s: 1.1, flip: true, skin: SKIN.s4, hair: { type: "boxbraids", beads: C.ocre }, coat: { inner: C.green }, bottom: C.green, legs: "stand",
    arms: { r: [[56, -172], [100, -162]], l: [[-40, -150], [-24, -122]] },
    rhand: (hx, hy) => stroke(`M8 -170Q30 -130 60 -146Q80 -158 ${hx + 6} ${hy}`, C.dark, 3) + `<circle cx="${hx + 9}" cy="${hy}" r="6.5" fill="${C.steel}"/>${hand(hx, hy, SKIN.s4)}`,
    lhand: (hx, hy) => `<rect x="${hx - 10}" y="${hy - 44}" width="34" height="46" rx="3" fill="${C.ocre}"/><rect x="${hx - 6}" y="${hy - 38}" width="26" height="36" fill="${C.white}"/><rect x="${hx - 2}" y="${hy - 32}" width="18" height="4" fill="${C.sand2}"/><rect x="${hx - 2}" y="${hy - 24}" width="14" height="4" fill="${C.sand2}"/>${hand(hx, hy, SKIN.s4)}` };
  g.push(person(soignante));
  // Bulle : un cœur avec une croix
  g.push(bubble(300, 132, heart(C.white, 1.1) + `<path d="M-2 -6H2V-2H6V2H2V6H-2V2H-6V-2H-2Z" fill="${C.red}"/>`, C.terra));
  return frame(g.join(""), C.cream);
}

/* ---------- Scène 2 : la récolte du cacao ---------- */
function champ() {
  const g = [];
  g.push(`<circle cx="660" cy="100" r="40" fill="${C.ocre}" opacity=".9"/>`, cloud(110, 84, 0.9), cloud(430, 64, 0.7));
  // Collines
  g.push(`<path d="M0 360Q160 250 330 320Q480 240 640 300Q730 270 800 300V600H0Z" fill="${C.leaf}" opacity=".55"/><path d="M0 400Q200 330 400 380Q600 320 800 370V600H0Z" fill="${C.leaf}"/>`);
  // Case au toit de tôle, sur la colline
  g.push(`<rect x="606" y="360" width="118" height="72" fill="${C.rose}"/><rect x="606" y="420" width="118" height="12" fill="${C.wood}" opacity=".5"/><rect x="626" y="384" width="26" height="48" fill="${C.wood2}"/><rect x="676" y="378" width="30" height="22" fill="${C.indigo}"/>${stroke("M691 378V400", C.wood, 3)}`);
  g.push(`<path d="M594 364L622 330H710L736 364Z" fill="${C.steel}"/>`);
  for (let x = 604; x < 732; x += 10) g.push(stroke(`M${x + (x - 665) * -0.18} 334L${x} 362`, C.grey, 2, ' opacity=".6"'));
  g.push(`<path d="M594 364L622 330H710L736 364Z" fill="${C.wood}" opacity=".18"/>`);
  // Palmier à huile près de la case
  g.push(palm(586, 446, 0.85, -8));
  // Sol de terre
  g.push(`<rect y="460" width="800" height="140" fill="${C.sand2}"/><path d="M0 460Q200 448 400 462Q600 450 800 460V474H0Z" fill="${C.leaf2}" opacity=".5"/>`);
  // Cacaoyers : tronc, feuillage, cabosses accrochées au tronc
  const cacao = (x, y, s, pods) => `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<path d="M-12 0L-9 -190H9L12 0Z" fill="${C.wood2}"/>${stroke("M0 -150L-50 -210M0 -170L46 -220M0 -190L-10 -250", C.wood2, 9)}`
    + `<ellipse cx="-56" cy="-232" rx="62" ry="40" fill="${C.leaf2}"/><ellipse cx="50" cy="-244" rx="66" ry="42" fill="${C.leaf2}"/><ellipse cx="-4" cy="-274" rx="64" ry="42" fill="${C.leaf}"/><ellipse cx="-30" cy="-244" rx="30" ry="18" fill="${C.leaf}" opacity=".6"/>`
    + pods.map(([px, py, col, r]) => `<g transform="translate(${px} ${py}) rotate(${r})"><rect x="-2" y="-20" width="4" height="8" fill="${C.wood2}"/><ellipse cx="0" cy="0" rx="10" ry="17" fill="${col}"/><path d="M0 -15V15" stroke="rgba(0,0,0,.18)" stroke-width="2"/></g>`).join("") + `</g>`;
  g.push(cacao(420, 444, 0.62, [[10, -60, C.ocre, -10], [-11, -100, C.yellow, 12], [12, -130, C.terra, -8]]));
  g.push(cacao(118, 520, 1.1, [[12, -90, C.ocre, -12], [-12, -126, C.yellow, 10], [13, -160, C.terra, -10], [-12, -58, C.ocre, 14]]));
  // Claie de séchage : les fèves étalées au soleil sur un treillis surélevé
  g.push(stroke("M560 548V476M770 548V476M600 548V480M730 548V480", C.wood2, 7));
  g.push(`<path d="M546 470H786L780 484H552Z" fill="${C.wood}"/>`);
  for (let x = 556; x < 780; x += 14) g.push(stroke(`M${x} 471V483`, C.wood2, 1.5, ' opacity=".6"'));
  g.push(`<path d="M554 470Q600 458 666 460Q732 458 778 470Z" fill="${C.wood2}"/>`);
  for (let i = 0; i < 26; i++) g.push(`<ellipse cx="${562 + i * 8.6}" cy="${466 - (i % 3) * 2}" rx="4.5" ry="3" fill="${i % 2 ? C.wood : "#5E3E26"}"/>`);
  // Cabosses ouvertes posées au sol, fèves blanches visibles
  const ouverte = (x, y, r, col) => `<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="22" ry="12" fill="${col}"/><ellipse rx="17" ry="8" fill="${C.cream}"/>${[-9, -3, 3, 9].map((bx, i) => `<ellipse cx="${bx}" cy="${i % 2 ? 2 : -2}" rx="3.5" ry="3" fill="${C.white}"/>`).join("")}<ellipse rx="17" ry="8" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="2"/></g>`;
  g.push(`<g transform="translate(352 534)"><ellipse cx="10" cy="22" rx="70" ry="10" fill="${C.wood2}" opacity=".18"/>`
    + `<g transform="rotate(-14)"><ellipse cx="-20" cy="6" rx="12" ry="20" fill="${C.ocre}"/></g><g transform="rotate(20)"><ellipse cx="42" cy="-10" rx="11" ry="19" fill="${C.yellow}"/></g>`
    + ouverte(-4, 14, -8, C.terra) + ouverte(34, 18, 10, C.ocre) + `</g>`);
  // Agriculteur en dashiki : coupe une cabosse à la machette, une cabosse dans l'autre main
  const homme = { x: 262, y: 562, s: 1.12, flip: true, skin: SKIN.s2, beard: true, hair: { type: "short" }, hat: { type: "kufi", color: C.indigo, wax: "wax1" }, top: C.green, wax: "wax3", dashiki: true, sleeve: "short", bottom: C.dark, shoes: C.wood2,
    arms: { r: [[62, -178], [96, -202]], l: [[-40, -150], [-30, -112]] },
    rhand: (hx, hy) => `${stroke(`M${hx - 4} ${hy + 6}L${hx + 6} ${hy - 10}`, C.wood2, 7)}<path d="M${hx + 4} ${hy - 10}L${hx + 34} ${hy - 58}Q${hx + 42} ${hy - 56} ${hx + 36} ${hy - 42}L${hx + 10} ${hy - 4}Z" fill="${C.steel}"/>${hand(hx, hy, SKIN.s2)}`,
    lhand: (hx, hy) => `<g transform="translate(${hx - 2} ${hy + 16}) rotate(-20)"><ellipse rx="12" ry="20" fill="${C.ocre}"/><path d="M0 -18V18" stroke="rgba(0,0,0,.18)" stroke-width="2"/></g>${hand(hx, hy, SKIN.s2)}` };
  g.push(person(homme));
  // Agricultrice en pagne et foulard, panier de cabosses sur la tête
  const femme = { x: 476, y: 566, s: 1.1, skin: SKIN.s4, hair: { type: "foulard", color: C.ocre, wax: "wax2" }, top: C.terra, wax: "wax1", bottom: C.indigo, bwax: "ndop", legs: "walkskirt",
    arms: { r: [[50, -240], [44, -313]], l: [[-40, -150], [-34, -112]] } };
  g.push(person(femme));
  // Pagne noué à la taille
  g.push(local(femme, cloth("M-28 -122H28L30 -106Q0 -100 -30 -106Z", C.ocre, "kente") + `<path d="M14 -110L24 -90L8 -94Z" fill="${C.ocre}"/>`));
  // Le panier, puis la main qui le tient
  g.push(local(femme, `<g transform="translate(0 9)">` + [[-34, -352, C.yellow, -20], [-14, -358, C.ocre, 8], [8, -356, C.terra, -6], [28, -350, C.yellow, 18], [-2, -346, C.ocre, -30]].map(([px, py, c, r]) => `<ellipse cx="${px}" cy="${py}" rx="9" ry="15" fill="${c}" transform="rotate(${r} ${px} ${py})"/>`).join("")
    + `<path d="M-48 -346H48L40 -316Q0 -308 -40 -316Z" fill="${C.wood}"/>${stroke("M-45 -336H45M-42 -324H42", C.wood2, 3)}`
    + `<ellipse cx="0" cy="-311" rx="20" ry="6" fill="${C.ocre}"/>` + hand(44, -322, SKIN.s4) + `</g>`));
  return frame(g.join(""), C.sky);
}

/* ---------- Scène 3 : le foot de quartier ---------- */
function football() {
  const g = [];
  g.push(`<circle cx="120" cy="96" r="38" fill="${C.ocre}" opacity=".85"/>`, cloud(560, 70, 0.8), cloud(300, 54, 0.6));
  // Maisons du quartier : murs peints, toits de tôle ondulée
  const maison = (x, w, h, wall, roof, door) => {
    const top = 400 - h, out = [`<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/><rect x="${x}" y="${388}" width="${w}" height="12" fill="${C.wood}" opacity=".35"/>`];
    out.push(`<path d="M${x - 10} ${top + 4}L${x + 6} ${top - 26}H${x + w - 6}L${x + w + 10} ${top + 4}Z" fill="${roof}"/>`);
    for (let k = x - 2; k < x + w + 4; k += 9) out.push(stroke(`M${k + 4} ${top - 24}L${k} ${top + 2}`, C.dark, 1.5, ' opacity=".18"'));
    out.push(`<rect x="${x + w * 0.16}" y="${400 - h * 0.62}" width="${w * 0.22}" height="${h * 0.62}" fill="${door}"/><rect x="${x + w * 0.56}" y="${400 - h * 0.78}" width="${w * 0.26}" height="${h * 0.3}" fill="${C.wood2}"/>`);
    out.push(stroke(`M${x + w * 0.56} ${400 - h * 0.63}H${x + w * 0.82}`, C.white, 3));
    return out.join("");
  };
  g.push(maison(24, 150, 110, C.yellow, C.steel, C.indigo), maison(196, 104, 88, C.blue, C.wood, C.wood2), maison(560, 128, 118, C.rose, C.grey, C.green), maison(708, 92, 96, C.white, C.steel, C.terra));
  // Manguier
  g.push(`<path d="M410 400L416 270H436L442 400Z" fill="${C.wood2}"/>${stroke("M426 300L380 250M426 290L476 246", C.wood2, 10)}`);
  g.push(`<ellipse cx="430" cy="216" rx="130" ry="76" fill="${C.leaf2}"/><ellipse cx="370" cy="236" rx="64" ry="44" fill="${C.leaf}"/><ellipse cx="490" cy="232" rx="60" ry="42" fill="${C.leaf}"/><ellipse cx="432" cy="180" rx="70" ry="44" fill="${C.leaf}"/>`);
  for (const [mx, my] of [[380, 256], [460, 262], [416, 210], [504, 214], [350, 214]]) g.push(`<ellipse cx="${mx}" cy="${my}" rx="7" ry="9" fill="${C.ocre}"/>`);
  // Terrain en terre rouge
  g.push(`<rect y="400" width="800" height="200" fill="${C.rose}"/><rect y="400" width="800" height="200" fill="${C.red}" opacity=".16"/><path d="M0 400H800V410Q400 418 0 410Z" fill="${C.wood2}" opacity=".25"/>`);
  g.push(`<path d="M400 420V600" stroke="${C.white}" stroke-width="4" opacity=".35"/><ellipse cx="400" cy="510" rx="90" ry="26" fill="none" stroke="${C.white}" stroke-width="4" opacity=".35"/>`);
  for (const [px, py] of [[160, 580], [620, 440], [300, 450], [700, 586], [540, 590]]) g.push(`<ellipse cx="${px}" cy="${py}" rx="9" ry="3" fill="${C.wood2}" opacity=".35"/>`);
  // Au bord du terrain, petits car au loin : supportrice en gele et pagne, un voisin en ndop sur un banc
  g.push(`<rect x="130" y="384" width="66" height="6" fill="${C.wood}"/>${stroke("M136 390V424M190 390V424", C.wood2, 4)}`);
  g.push(person({ x: 142, y: 424, s: 0.4, skin: SKIN.s1, hair: { type: "short" }, hat: { type: "ashetu", color: C.red, color2: C.dark }, top: "#1C2756", wax: "ndop", robe: "boubou", legs: "sit", arms: { l: [[-40, -150], [-10, -112]], r: [[40, -150], [44, -110]] } }));
  g.push(person({ x: 548, y: 410, s: 0.42, skin: SKIN.s5, hair: { type: "gele", color: C.ocre, wax: "wax2" }, top: C.green, wax: "wax1", bottom: C.ocre, bwax: "wax2", legs: "skirt",
    arms: { l: [[-46, -228], [-40, -276]], r: [[46, -228], [40, -276]] } }));
  // Buts en bois
  const but = (x, k) => `<g transform="translate(${x} 0) scale(${k} 1)">${stroke("M0 548V346L52 322V470", C.wood, 8)}${stroke("M0 346L52 322", C.wood2, 8)}`
    + [0, 1, 2, 3].map((i) => stroke(`M${9 + i * 11} ${346 - i * 5}L${9 + i * 11} ${532 - i * 15}`, C.white, 1.5, ' opacity=".6"')).join("")
    + [0, 1, 2, 3, 4, 5].map((i) => stroke(`M4 ${370 + i * 30}L48 ${348 + i * 24}`, C.white, 1.5, ' opacity=".6"')).join("") + `</g>`;
  g.push(but(30, 1), but(770, -1));
  // Les joueurs (deux équipes : terra et indigo ; gardiens en ocre et en vert)
  const kid = (o, shorts) => {
    const k = { s: 0.74, legs: "walk", sleeve: "short", shoes: C.dark, ...o };
    k.bottom = k.skin;
    const d = k.legs === "walk" ? "M-27 -118H27L32 -78L6 -76L0 -96L-6 -76L-34 -80Z" : "M-27 -118H27L26 -78L4 -78L0 -94L-4 -78L-26 -78Z";
    return person(k) + local(k, `<path d="${d}" fill="${shorts}"/>`);
  };
  const run = { l: [[-46, -170], [-74, -150]], r: [[50, -176], [76, -198]] };
  const keeper = { l: [[-52, -190], [-74, -160]], r: [[52, -190], [74, -160]] };
  g.push(kid({ x: 104, y: 532, s: 0.66, skin: SKIN.s4, hair: { type: "rase" }, top: C.ocre, legs: "stand", arms: keeper }, C.dark)); // gardien de gauche
  g.push(kid({ x: 692, y: 532, s: 0.66, flip: true, skin: SKIN.s2, hair: { type: "bantu" }, top: C.green, legs: "stand", arms: keeper }, C.dark)); // gardienne de droite
  g.push(kid({ x: 590, y: 500, s: 0.68, flip: true, skin: SKIN.s3, hair: { type: "nattes" }, top: C.indigo, arms: run }, C.white));
  g.push(kid({ x: 236, y: 560, skin: SKIN.s3, hair: { type: "boxbraids", beads: C.ocre }, top: C.terra, arms: run }, C.dark));
  g.push(kid({ x: 486, y: 578, flip: true, skin: SKIN.s5, hair: { type: "short" }, top: C.indigo, arms: run }, C.white));
  g.push(kid({ x: 372, y: 534, skin: SKIN.s1, hair: { type: "puffs" }, top: C.terra, arms: { l: [[-50, -168], [-80, -158]], r: [[48, -164], [62, -128]] } }, C.dark));
  // Ballon en mouvement
  g.push(`<ellipse cx="424" cy="560" rx="12" ry="4" fill="${C.dark}" opacity=".18"/>`, stroke("M352 510H382M358 522H384M362 498H380", C.white, 3, ' opacity=".8"'));
  g.push(`<circle cx="404" cy="510" r="14" fill="${C.white}"/><path d="M404 504L410 508L408 515H400L398 508Z" fill="${C.dark}"/>${stroke("M404 504V497M410 508L417 506M408 515L412 521M400 515L396 521M398 508L391 506", C.dark, 1.6)}`);
  return frame(g.join(""), C.sand);
}

export default [
  { id: "sante", fr: "Au centre de santé", en: "At the health centre", tags: ["santé", "soignante", "infirmière", "bébé", "mère", "consultation", "vaccination", "stéthoscope", "pagne", "health", "nurse", "baby", "mother", "clinic", "vaccine"], draw: sante },
  { id: "champ", fr: "La récolte du cacao", en: "Cocoa harvest", tags: ["cacao", "agriculture", "récolte", "plantation", "cabosse", "agriculteur", "agricultrice", "séchage", "campagne", "cocoa", "farming", "harvest", "farmer", "drying"], draw: champ },
  { id: "football", fr: "Foot de quartier", en: "Street football", tags: ["football", "enfants", "jeu", "sport", "quartier", "ballon", "but", "gardien", "football", "soccer", "children", "play", "neighbourhood", "goalkeeper"], draw: football },
];
