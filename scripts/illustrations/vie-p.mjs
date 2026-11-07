// Scènes : la tisserande au métier à tisser, le cordonnier du coin, le réparateur de téléphones.
import { C, SKIN, person, frame, cloud, bubble, check, stroke, f } from "./lib.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${r}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
/** Aplat avec un motif par-dessus. */
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");
/** Position dans la scène d'un point local (hx, hy) d'un personnage. */
const toScene = (x, y, s, flip, hx, hy) => [x + (flip ? -hx : hx) * s, y + hy * s];
/** Natte tressée posée au sol (rectangle en légère perspective). */
const mat = (x, y, w, h, col = C.ocre) => {
  let s = `<path d="M${x + 14} ${y}H${x + w - 14}L${x + w} ${y + h}H${x}Z" fill="${col}"/>`;
  for (let i = 1; i < 5; i++) s += stroke(`M${f(x + 14 - (14 * i) / 5)} ${f(y + (h * i) / 5)}H${f(x + w - 14 + (14 * i) / 5)}`, C.wood, 1.6, ' opacity=".5"');
  for (let k = x + 30; k < x + w - 20; k += 26) s += stroke(`M${k} ${y}L${k - 6} ${y + h}`, C.wood2, 1.4, ' opacity=".35"');
  return s + `<path d="M${x} ${y + h}H${x + w}L${x + w - 2} ${y + h + 4}H${x + 2}Z" fill="${C.wood2}" opacity=".5"/>`;
};

/* ---------- Scène 1 : la tisserande ---------- */
/** Rouleau de tissu fini couché, vu de côté : (x,y) bas gauche. */
const roll = (x, y, w, r, col, pat) => cloth(`M${x} ${y - 2 * r}H${x + w}V${y}H${x}Z`, col, pat) + `<path d="M${x} ${y - 2 * r}H${x + w}V${y}H${x}Z" fill="rgba(0,0,0,.08)"/>` +
  `<ellipse cx="${x + w}" cy="${y - r}" rx="${r * 0.45}" ry="${r}" fill="${col}"/>` + (pat ? `<ellipse cx="${x + w}" cy="${y - r}" rx="${r * 0.45}" ry="${r}" fill="url(#${pat})"/>` : "") +
  stroke(`M${x + w} ${y - r}m-${f(r * 0.3)} 0a${f(r * 0.3)} ${f(r * 0.66)} 0 1 0 ${f(r * 0.3)} -${f(r * 0.6)}`, "rgba(0,0,0,.3)", 1.6);
/** Bobine de fil debout : (x,y) bas. */
const spool = (x, y, col, h = 26) => rect(x - 9, y - 3, 18, 3, C.wood2, ' rx="1"') + rect(x - 7, y - h + 3, 14, h - 6, col, ' rx="2"') + rect(x - 9, y - h, 18, 3, C.wood2, ' rx="1"') +
  stroke(`M${x - 7} ${y - h + 9}H${x + 7}M${x - 7} ${y - h + 15}H${x + 7}`, "rgba(0,0,0,.15)", 1.2);

function tissage() {
  const g = [];
  const STRIP = [C.ocre, C.green, C.ocre, C.terra, C.dark, C.ocre, C.green, C.yellow, C.terra, C.ocre];
  g.push(cloud(600, 70, 0.8));
  // Mur de la concession en terre, chaperon, porte en bois
  g.push(rect(0, 150, 800, 240, C.sand2), rect(0, 150, 800, 240, C.terra, ' opacity=".12"'), rect(0, 140, 800, 16, C.terra, ' opacity=".7"'));
  for (const [x, y, w] of [[60, 200, 40], [520, 230, 60], [700, 190, 36], [380, 300, 30]]) g.push(rect(x, y, w, 4, C.wood, ' rx="2" opacity=".25"'));
  g.push(rect(600, 210, 110, 180, C.wood2), rect(610, 220, 90, 170, C.wood), stroke("M655 220V390", C.wood2, 3), `<circle cx="690" cy="310" r="4" fill="${C.ocre}"/>`);
  // Pagne qui sèche sur une corde
  g.push(stroke("M500 176Q600 196 720 172", C.dark, 2, ' opacity=".6"'), cloth("M560 184L600 190V262L560 256Z", C.indigo, "ndop"), cloth("M616 190L660 190V250L616 256Z", C.green, "kitenge"));
  // Sol de la cour
  g.push(rect(0, 390, 800, 210, C.sand), rect(0, 390, 800, 6, C.wood2, ' opacity=".25"'));
  // Ombre du manguier sur la cour
  g.push(`<ellipse cx="300" cy="470" rx="320" ry="70" fill="${C.leaf2}" opacity=".12"/>`);
  for (const [x, y, rx] of [[120, 430, 50], [420, 452, 60], [260, 560, 70], [560, 420, 40]]) g.push(`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx / 4}" fill="${C.leaf2}" opacity=".1"/>`);
  // Le manguier : tronc à gauche, feuillage dense en haut
  g.push(`<path d="M50 420Q70 300 60 170L96 170Q92 300 108 420Z" fill="${C.wood2}"/>`, stroke("M76 230Q120 180 190 150M70 260Q30 220 0 200", C.wood2, 12));
  for (const [cx, cy, rx, ry, c] of [[60, 70, 140, 90, C.leaf2], [230, 40, 170, 80, C.leaf2], [420, 20, 140, 60, C.leaf2], [110, 130, 120, 50, C.leaf], [300, 100, 130, 50, C.leaf], [440, 70, 100, 40, C.leaf], [10, 160, 60, 40, C.leaf]]) g.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${c}"/>`);
  for (const [x, y] of [[150, 150], [240, 132], [330, 140], [60, 172], [420, 104], [196, 110]]) g.push(stroke(`M${x} ${y - 14}V${y - 6}`, C.leaf2, 2) + `<ellipse cx="${x}" cy="${y}" rx="7" ry="9" fill="${C.yellow}"/><ellipse cx="${x - 2}" cy="${y + 2}" rx="5" ry="6" fill="${C.ocre}" opacity=".6"/>`);

  /* Le métier à tisser en bois (métier à bandes) : cadre, poulie, lisses, chaîne tendue vers la pierre */
  const WY = 372; // hauteur de la chaîne
  // Montants et traverses du cadre (derrière la tisserande)
  g.push(stroke("M176 540L186 214M436 540L426 214M168 216H446M180 300H200", C.wood2, 9));
  g.push(stroke("M200 214L206 190M412 214L406 190", C.wood2, 6), stroke("M196 190H418", C.wood, 7));
  // Chaîne : fils tendus du tissu jusqu'à la pierre posée au sol, loin à droite
  const SX = 316, SE = 420, PX = 588, PY = 432;
  for (let i = 0; i < 9; i++) {
    const yy = WY - 13 + i * 3.2;
    g.push(stroke(`M${SE} ${f(yy)}L${PX} ${f(PY - 10 + i * 1.6)}`, STRIP[i], 1.6));
  }
  // La pierre et le traîneau qui tendent la chaîne
  g.push(`<path d="M${PX - 18} ${PY + 6}H${PX + 40}L${PX + 34} ${PY + 30}H${PX - 12}Z" fill="${C.wood}"/>`, `<ellipse cx="${PX + 12}" cy="${PY - 2}" rx="26" ry="16" fill="${C.grey}"/><ellipse cx="${PX + 6}" cy="${PY - 8}" rx="12" ry="5" fill="${C.steel}" opacity=".6"/>`, `<ellipse cx="${PX + 12}" cy="${PY + 32}" rx="40" ry="5" fill="${C.dark}" opacity=".15"/>`);
  // Cordes de la poulie et les deux lisses qui pincent la chaîne
  g.push(stroke("M380 190V262", C.dark, 2), `<path d="M370 262H390L386 284H374Z" fill="${C.wood}"/><circle cx="380" cy="272" r="6" fill="${C.wood2}"/>`);
  g.push(stroke("M374 284L364 318M386 284L396 318", C.dark, 1.6));
  for (const lx of [356, 392]) g.push(rect(lx - 6, 318, 20, 6, C.wood2, ' rx="2"'), stroke(`M${lx - 2} 324V412M${lx + 4} 324V412M${lx + 10} 324V412`, C.cream, 1.2, ' opacity=".9"'), rect(lx - 6, 410, 20, 6, C.wood2, ' rx="2"'));
  // Battant (peigne) suspendu au cadre
  g.push(stroke("M336 214V330M346 214V330", C.dark, 1.4, ' opacity=".6"'), rect(328, 330, 26, 72, C.wood, ' rx="3"'), stroke("M334 336V396M340 336V396M346 336V396", C.wood2, 1.2));
  // Cordes des pédales jusqu'aux pieds
  g.push(stroke("M360 416L318 506M398 416L338 508", C.dark, 1.6), rect(300, 504, 30, 6, C.wood2, ' rx="2"'), rect(322, 508, 30, 6, C.wood2, ' rx="2"'));

  // Le tabouret sculpté
  g.push(rect(190, 420, 92, 12, C.wood2, ' rx="4"'), `<path d="M200 432H272L262 460Q236 470 210 460Z" fill="${C.wood}"/><path d="M206 460H266L270 520H202Z" fill="${C.wood2}"/>`, stroke("M214 470L226 500M246 470L258 500", C.wood, 4));
  // La tisserande, assise au métier : la main gauche tient la bande, la droite lance la navette
  const wx = 236, wy = 520, ws = 1, wsk = SKIN.s2;
  g.push(person({ x: wx, y: wy, s: ws, skin: wsk, legs: "sit", hair: { type: "foulard", color: C.terra, wax: "wax2" }, top: C.green, wax: "wax3", sleeve: "short", bottom: C.indigo, bwax: "wax1", face: "smile",
    arms: { l: [[10, -142], [74, -150]], r: [[66, -170], [104, -156]] } }));
  // La bande de kente qui se forme : du rouleau près d'elle jusqu'aux lisses
  const [hlx] = toScene(wx, wy, ws, false, 74, -150);
  for (let i = 0, x = SX - 40; x < SE; i++, x += 14) {
    const w = Math.min(14, SE - x);
    g.push(rect(x, WY - 13, w, 28, STRIP[i % STRIP.length]));
    if (i % 2 === 0) g.push(rect(x, WY - 4, w, 4, C.dark, ' opacity=".45"'), rect(x, WY + 6, w, 3, C.white, ' opacity=".6"'));
    else g.push(rect(x + 4, WY - 9, Math.max(0, w - 8), 20, C.white, ' opacity=".25"'));
  }
  // Le tissu fini qui s'enroule sur l'ensouple, contre elle
  g.push(`<ellipse cx="${SX - 44}" cy="${WY + 1}" rx="10" ry="17" fill="${C.ocre}"/><ellipse cx="${SX - 44}" cy="${WY + 1}" rx="4" ry="8" fill="${C.wood2}"/>`);
  // La navette dans la main droite, le fil qui la suit
  const [nx, ny] = toScene(wx, wy, ws, false, 104, -156);
  g.push(stroke(`M${nx + 4} ${ny + 4}L${SE - 20} ${WY + 6}`, C.terra, 1.4), `<path d="M${nx - 14} ${ny + 2}Q${nx} ${ny - 8} ${nx + 18} ${ny + 2}Q${nx} ${ny + 10} ${nx - 14} ${ny + 2}Z" fill="${C.wood}"/>`, rect(nx - 2, ny - 1, 8, 5, C.terra, ' rx="2"'), hand(nx - 2, ny - 2, wsk));
  g.push(hand(hlx, WY - 4, wsk));
  // Le panier de bobines près du tabouret
  g.push(`<path d="M104 520H186L176 560H114Z" fill="${C.ocre}"/>`, stroke("M108 532H182M112 546H178", C.wood, 2, ' opacity=".6"'));
  for (const [x, c] of [[118, C.terra], [136, C.green], [154, C.yellow], [172, C.indigo]]) g.push(spool(x, 522, c, 22));
  g.push(`<ellipse cx="145" cy="562" rx="46" ry="5" fill="${C.dark}" opacity=".15"/>`);

  // L'apprentie, debout derrière la chaîne : elle dévide une bobine
  const ax = 506, ay = 520, as = 0.82, ask = SKIN.s4;
  g.push(person({ x: ax, y: ay, s: as, skin: ask, hair: { type: "bantu" }, top: C.yellow, wax: "wax1", sleeve: "short", bottom: C.terra, bwax: "kitenge", legs: "skirt", face: "laugh",
    arms: { l: [[-42, -156], [-23, -150]], r: [[42, -156], [23, -150]] } }));
  const [bx, by] = toScene(ax, ay, as, false, 0, -150);
  g.push(`<g transform="translate(${f(bx)} ${f(by)}) rotate(90)">${spool(0, 17, C.terra, 34)}</g>`, hand(bx - 19, by, ask, 6.2), hand(bx + 19, by, ask, 6.2));
  g.push(stroke(`M${f(bx - 4)} ${f(by + 8)}Q${f(bx - 50)} ${f(by + 30)} ${SE + 40} ${WY + 12}`, C.ocre, 1.4));

  // Rouleaux de tissus finis, sur une natte, au premier plan
  g.push(mat(372, 534, 250, 36, C.ocre));
  g.push(roll(440, 548, 80, 14, C.terra, "bogolan"), roll(392, 566, 84, 15, C.ocre, "kente"), roll(494, 566, 80, 15, C.indigo, "ndop"));

  // La cliente qui déplie une bande de kente terminée, ravie
  const cx = 680, cy = 548, cs = 0.95, csk = SKIN.s3;
  g.push(person({ x: cx, y: cy, s: cs, flip: true, skin: csk, hair: { type: "gele", color: C.ocre, wax: "wax3" }, robe: "kaba", top: C.indigo, wax: "wax1", face: "laugh",
    arms: { l: [[-50, -176], [-44, -212]], r: [[50, -176], [44, -212]] } }));
  let kt = "";
  for (let i = 0; i < 9; i++) kt += rect(-40, -212 + i * 16, 80, 16, STRIP[i % STRIP.length]) + (i % 2 ? rect(-40, -206 + i * 16, 80, 3, C.dark, ' opacity=".45"') : rect(-30, -208 + i * 16, 60, 8, C.white, ' opacity=".22"'));
  g.push(at(cx, cy, cs, true, kt + stroke("M-40 -212V-68M40 -212V-68", "rgba(0,0,0,.18)", 2) + `<path d="M-40 -68L-34 -58L-28 -68L-22 -58L-16 -68L-10 -58L-4 -68L2 -58L8 -68L14 -58L20 -68L26 -58L32 -68L38 -58L40 -68Z" fill="${C.ocre}"/>` + hand(-44, -212, csk) + hand(44, -212, csk)));
  return frame(g.join(""), C.sky);
}

/* ---------- Scène 2 : le cordonnier du coin ---------- */
/** Chaussure de ville de profil vers la droite, semelle en (x,y). */
const shoe = (x, y, s, col, flip = false) => at(x, y, s, flip, `<path d="M-22 0V-12Q-22 -20 -14 -20Q-6 -12 4 -12Q18 -12 24 -6V0Z" fill="${col}"/>` + rect(-23, -3, 48, 4, C.dark, ' rx="2"') + stroke("M-6 -14L2 -12", C.cream, 1.4, ' opacity=".7"'));
/** Sandale vue de dessus : semelle et brides. */
const sandal = (x, y, col, strap) => `<ellipse cx="${x}" cy="${y}" rx="8" ry="15" fill="${col}"/>` + stroke(`M${x - 7} ${y - 6}Q${x} ${y - 1} ${x + 7} ${y - 6}`, strap, 4) + stroke(`M${x - 6} ${y + 4}H${x + 6}`, strap, 3);

function cordonnier() {
  const g = [];
  g.push(cloud(560, 60, 0.8), cloud(300, 40, 0.6));
  // Immeuble du quartier : toit de tôle, mur peint, boutique ouverte, fenêtre à grille
  g.push(`<path d="M380 120L410 96H800V120Z" fill="${C.steel}"/>`, rect(380, 120, 420, 300, C.white), rect(380, 350, 420, 70, C.green, ' opacity=".85"'), rect(380, 344, 420, 8, C.ocre));
  g.push(rect(430, 170, 200, 180, C.dark, ' opacity=".82"'), rect(420, 160, 220, 12, C.ocre), stroke("M430 172V350M630 172V350", C.ocre, 8));
  for (const [y, items] of [[220, [C.yellow, C.red, C.blue, C.yellow, C.leaf, C.red, C.white]], [270, [C.white, C.white, C.ocre, C.ocre, C.blue, C.blue, C.red]]]) {
    g.push(rect(440, y, 180, 5, C.wood));
    items.forEach((c, i) => g.push(rect(448 + i * 24, y - 22, 14, 22, c, ' rx="2"')));
  }
  g.push(rect(438, 296, 184, 54, C.wood2), rect(438, 296, 184, 8, C.wood));
  g.push(rect(670, 180, 90, 100, C.sky), stroke("M685 180V280M700 180V280M715 180V280M730 180V280M745 180V280M670 230H760", C.dark, 3, ' opacity=".7"'), rect(662, 280, 106, 8, C.wood2));
  // Maison à gauche, plus loin : mur crème, toit de tuiles, poteau électrique
  g.push(`<path d="M0 200L120 150L250 200Z" fill="${C.terra}"/>`, rect(10, 200, 230, 220, C.sand2), rect(60, 250, 60, 70, C.wood2), rect(160, 260, 50, 50, C.sky), stroke("M185 260V310M160 285H210", C.white, 3));
  g.push(rect(330, 90, 8, 330, C.wood2), rect(312, 106, 44, 6, C.wood2, ' rx="3"'), stroke("M0 130Q170 160 334 110Q560 150 800 120", C.dark, 2, ' opacity=".5"'));
  // Trottoir en terre rouge et rue
  g.push(rect(0, 420, 800, 180, C.sand2), rect(0, 420, 800, 180, C.terra, ' opacity=".25"'), rect(0, 420, 800, 8, C.wood2, ' opacity=".4"'));
  for (const [x, y] of [[360, 470], [700, 600], [40, 590], [470, 450]]) g.push(`<ellipse cx="${x}" cy="${y}" rx="14" ry="3" fill="${C.wood2}" opacity=".3"/>`);

  // Une passante au loin, bassine de mangues sur la tête
  g.push(person({ x: 452, y: 440, s: 0.52, flip: true, legs: "walkskirt", skin: SKIN.s2, hair: { type: "foulard", color: C.terra, wax: "wax2" }, robe: "kaba", top: C.terra, wax: "wax3", face: "smile",
    arms: { r: [[46, -250], [30, -298]], l: [[-40, -150], [-34, -112]] } }));
  let bas = `<path d="M-40 -304H40L32 -326H-32Z" fill="${C.steel}"/>`;
  for (const [mx, my] of [[-20, -330], [-4, -334], [12, -332], [26, -328], [-10, -344], [8, -346]]) bas += `<ellipse cx="${mx}" cy="${my}" rx="9" ry="7" fill="${C.yellow}"/>`;
  g.push(at(452, 440, 0.52, true, bas + hand(30, -300, SKIN.s2)));
  // Le grand parasol, planté dans un seau de sable
  const ox = 220, oy = 150;
  g.push(stroke(`M${ox} ${oy}L${ox - 72} 520`, C.grey, 6), `<path d="M128 520H172L168 548H132Z" fill="${C.blue}"/><ellipse cx="150" cy="520" rx="22" ry="5" fill="${C.sand2}"/>`);
  const rim = [[40, 230], [96, 244], [156, 252], [218, 254], [280, 250], [340, 240], [396, 224]];
  for (let i = 0; i < rim.length - 1; i++) {
    const [x0, y0] = rim[i], [x1, y1] = rim[i + 1];
    g.push(`<path d="M${ox} ${oy}L${x0} ${y0}Q${(x0 + x1) / 2} ${Math.max(y0, y1) + 12} ${x1} ${y1}Z" fill="${[C.terra, C.yellow, C.green, C.white, C.indigo, C.yellow][i]}"/>`);
  }
  g.push(`<circle cx="${ox}" cy="${oy - 2}" r="6" fill="${C.dark}"/>`);
  // Ombre du parasol au sol
  g.push(`<ellipse cx="240" cy="540" rx="190" ry="22" fill="${C.dark}" opacity=".1"/>`);

  // La caisse à outils du cordonnier : cirage, brosses, pied de fer
  g.push(rect(52, 488, 74, 50, C.wood, ' rx="3"'), rect(52, 488, 74, 8, C.wood2, ' rx="2"'), stroke("M70 488V472H108V488", C.wood2, 4));
  for (const [x, c] of [[64, C.dark], [82, C.red], [100, C.wood2]]) g.push(rect(x - 7, 478, 14, 10, c, ' rx="3"'));
  g.push(rect(112, 470, 8, 20, C.wood2), rect(108, 466, 16, 8, C.dark, ' rx="2"'));
  g.push(stroke("M88 540V510", C.grey, 5), `<path d="M74 510H112Q116 502 106 498H86Q74 500 74 510Z" fill="${C.grey}"/>`, `<ellipse cx="88" cy="542" rx="16" ry="4" fill="${C.grey}"/>`);

  // Le cordonnier, assis sur sa caisse : la chaussure sur le genou, le marteau levé
  const kx = 214, ky = 540, ks = 1, ksk = SKIN.s1;
  g.push(rect(176, 440, 80, 100, C.wood2, ' rx="4"'), rect(176, 440, 80, 10, C.wood, ' rx="3"'), stroke("M184 470H248M184 506H248", C.wood, 3, ' opacity=".6"'));
  g.push(person({ x: kx, y: ky, s: ks, skin: ksk, legs: "sit", hair: { type: "short" }, beard: true, hat: { type: "kufi", color: C.ocre, wax: "kente" }, top: "#1C2756", wax: "ndop", sleeve: "short", bottom: C.green, shoes: C.dark, face: "laugh",
    arms: { l: [[12, -140], [56, -126]], r: [[64, -178], [92, -196]] } }));
  // Tablier de cuir
  g.push(at(kx, ky, ks, false, `<path d="M-20 -186H20L26 -110Q0 -104 -26 -110Z" fill="${C.wood}"/>` + stroke("M-20 -186L-12 -206M20 -186L12 -206", C.wood, 3) + stroke("M-26 -140H26", C.wood2, 3, ' opacity=".5"')));
  // La chaussure sur son genou, la main gauche dedans, par-dessus
  g.push(at(kx, ky, ks, false, `<g transform="translate(76 -116) rotate(-8)"><path d="M-30 4V-12Q-30 -24 -18 -24Q-8 -14 6 -14Q24 -14 32 -6V4Z" fill="${C.terra}"/>` + rect(-32, 1, 66, 6, C.dark, ' rx="3"') + stroke("M-10 -18L2 -14", C.cream, 2) + `</g>` + hand(56, -126, ksk)));
  // Le marteau
  g.push(at(kx, ky, ks, false, stroke("M88 -186L104 -222", C.wood, 5) + `<g transform="rotate(-24 104 -222)">${rect(92, -232, 26, 11, C.grey, ' rx="2"')}</g>` + hand(92, -196, ksk)));
  // Pot de colle et semelle neuve posés à ses pieds
  g.push(rect(312, 498, 22, 24, C.yellow, ' rx="3"'), rect(310, 494, 26, 6, C.dark, ' rx="2"'), stroke("M323 494L330 478", C.wood2, 3));
  g.push(`<path d="M344 520Q344 510 356 508H384Q396 510 392 520Z" fill="${C.dark}"/>`, stroke("M350 514H386", C.grey, 1.4, ' opacity=".7"'));

  // La natte : sandales et chaussures alignées, prêtes à être reprises
  g.push(mat(290, 526, 226, 40, C.ocre));
  g.push(sandal(316, 546, C.wood2, C.red), sandal(334, 546, C.wood2, C.red), sandal(362, 544, C.dark, C.yellow), sandal(380, 544, C.dark, C.yellow));
  g.push(shoe(420, 552, 0.85, C.dark), shoe(440, 560, 0.85, C.dark), shoe(482, 552, 0.8, C.white, true), shoe(496, 560, 0.8, C.white, true));

  // Le client, pieds nus sur le banc, qui attend sa chaussure en riant
  const cx = 604, cy = 548, cs = 1, csk = SKIN.s4;
  g.push(rect(530, 440, 150, 12, C.wood, ' rx="3"'), stroke("M546 452V548M664 452V548", C.wood2, 8));
  g.push(person({ x: cx, y: cy, s: cs, flip: true, skin: csk, legs: "sit", hair: { type: "rase" }, beard: true, top: C.white, dashiki: C.green, sleeve: "short", bottom: C.indigo, shoes: csk, face: "laugh",
    arms: { l: [[-40, -150], [-30, -112]], r: [[48, -160], [64, -114]] } }));
  // Ses orteils
  g.push(at(cx, cy, cs, true, [[70, -7], [71, -2], [86, -7], [87, -2]].map(([tx, ty]) => `<circle cx="${tx}" cy="${ty}" r="2.6" fill="${csk}"/>`).join("") + stroke("M64 -8V-2M80 -8V-2", "rgba(0,0,0,.18)", 1.2)));

  // L'écolière qui passe, sac au dos, et salue le cordonnier
  const ex = 716, ey = 566, es = 0.78, esk = SKIN.s3;
  g.push(at(ex, ey, es, true, rect(-46, -204, 26, 70, C.terra, ' rx="8"') + rect(-48, -170, 12, 24, C.ocre, ' rx="4"')));
  g.push(person({ x: ex, y: ey, s: es, flip: true, skin: esk, legs: "walkskirt", hair: { type: "nattes" }, top: C.blue, sleeve: "short", bottom: C.indigo, shoes: C.dark, face: "smile",
    arms: { r: [[48, -206], [58, -252]], l: [[-42, -150], [-36, -112]] } }));
  g.push(at(ex, ey, es, true, stroke("M-20 -204Q-24 -170 -22 -140", C.terra, 6) + `<path d="M-10 -206L0 -190L10 -206Z" fill="${C.white}"/>`));
  return frame(g.join(""), C.cream);
}

/* ---------- Scène 3 : le réparateur de téléphones ---------- */
/** Téléphone debout vu de face : (x,y) centre. */
const mobile = (x, y, w, h, body, screen) => rect(x - w / 2, y - h / 2, w, h, body, ` rx="${f(w / 6)}"`) + rect(x - w / 2 + 2.5, y - h / 2 + 4, w - 5, h - 9, screen, ` rx="${f(w / 10)}"`);
/** Chargeur : bloc blanc, câble qui pend. */
const charger = (x, y, col = C.white) => rect(x - 7, y, 14, 16, col, ' rx="2"') + stroke(`M${x - 3} ${y}V${y - 5}M${x + 3} ${y}V${y - 5}`, C.grey, 2) + stroke(`M${x} ${y + 16}Q${x + 2} ${y + 30} ${x - 4} ${y + 38}`, col, 2.2);

function telephone() {
  const g = [];
  g.push(rect(0, 0, 800, 300, C.white, ' opacity=".45"'), cloud(660, 60, 0.8), cloud(40, 90, 0.6));
  // Le quartier derrière : mur bleu, manguier à droite, poteau et fils
  g.push(rect(0, 200, 170, 230, C.blue, ' opacity=".55"'), rect(20, 240, 50, 60, C.sky), rect(100, 250, 50, 120, C.wood2));
  g.push(`<path d="M700 430Q706 330 690 260L716 260Q720 340 730 430Z" fill="${C.wood2}"/>`);
  for (const [cx, cy, rx, ry, c] of [[700, 220, 100, 60, C.leaf2], [650, 250, 60, 40, C.leaf], [760, 250, 60, 44, C.leaf]]) g.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${c}"/>`);
  g.push(rect(632, 70, 8, 360, C.wood2), rect(614, 86, 44, 6, C.wood2, ' rx="3"'), stroke("M0 110Q300 150 636 90Q720 110 800 100", C.dark, 2, ' opacity=".5"'), stroke("M636 96Q600 130 586 150", C.dark, 2.5));
  // Rue en terre
  g.push(rect(0, 430, 800, 170, C.sand2), rect(0, 430, 800, 170, C.terra, ' opacity=".2"'), rect(0, 430, 800, 6, C.wood2, ' opacity=".35"'));

  /* L'échoppe peinte : murs verts à bandes ocre, auvent de tôle, enseigne peinte (un téléphone et une clé) */
  g.push(rect(180, 150, 430, 290, C.green), rect(180, 420, 430, 20, C.wood2, ' opacity=".6"'));
  for (const y of [170, 190]) g.push(rect(180, y, 430, 6, C.ocre));
  g.push(`<path d="M160 160L196 108H600L636 160Z" fill="${C.steel}"/>`);
  for (let x = 200; x < 620; x += 18) g.push(stroke(`M${x} 158L${x + 8} 110`, C.grey, 2, ' opacity=".5"'));
  // Enseigne
  g.push(rect(330, 116, 130, 36, C.yellow, ' rx="4"'), `<g transform="translate(360 134) rotate(-12)">${mobile(0, 0, 16, 28, C.dark, C.blue)}</g>`);
  g.push(stroke("M380 126Q388 134 380 142M386 120Q398 134 386 148", C.dark, 2.5), stroke("M412 144L432 124", C.dark, 4), `<circle cx="434" cy="122" r="6" fill="none" stroke="${C.dark}" stroke-width="3"/>`, `<circle cx="410" cy="146" r="3.5" fill="${C.dark}"/>`);
  // Ouverture de l'échoppe : fond sombre, panneau perforé de coques et de chargeurs
  g.push(rect(206, 206, 378, 214, C.dark, ' opacity=".85"'), rect(222, 220, 346, 120, C.wood2));
  g.push(`<pattern id="telephone-trous" width="12" height="12" patternUnits="userSpaceOnUse" x="226" y="222"><circle cx="6" cy="6" r="1.3" fill="${C.wood}"/></pattern>`, rect(226, 222, 338, 116, "url(#telephone-trous)"));
  const cases = [C.red, C.yellow, C.blue, C.terra, C.leaf, C.white, C.ocre, C.indigo, C.rose];
  for (let i = 0; i < 9; i++) {
    const x = 240 + i * 18, y = 236 + (i % 2) * 6;
    g.push(stroke(`M${x + 6} ${y - 6}V${y}`, C.grey, 1.5), rect(x, y, 13, 24, cases[i], ' rx="3"'), `<circle cx="${x + 4}" cy="${y + 5}" r="2" fill="${C.dark}" opacity=".5"/>`);
  }
  for (const x of [424, 446, 468]) g.push(stroke(`M${x} 228V234`, C.grey, 1.5), charger(x, 234));
  for (const x of [500, 524]) g.push(stroke(`M${x} 228V236`, C.grey, 1.5), `<path d="M${x - 10} 260Q${x - 10} 238 ${x} 238Q${x + 10} 238 ${x + 10} 260" fill="none" stroke="${C.dark}" stroke-width="3"/><rect x="${x - 13}" y="254" width="7" height="12" rx="3" fill="${C.dark}"/><rect x="${x + 6}" y="254" width="7" height="12" rx="3" fill="${C.dark}"/>`);
  for (let i = 0; i < 7; i++) g.push(rect(240 + i * 24, 296, 16, 28, [C.blue, C.terra, C.white, C.yellow, C.leaf, C.red, C.indigo][i], ' rx="3"'));
  g.push(rect(420, 300, 130, 6, C.wood), rect(426, 286, 20, 14, C.grey, ' rx="2"'), rect(452, 284, 26, 16, C.dark, ' rx="2"'), rect(484, 288, 18, 12, C.white, ' rx="2"'), rect(508, 282, 34, 18, C.steel, ' rx="2"'));
  // Rampe de recharge sur le mur extérieur gauche : des téléphones branchés
  g.push(rect(190, 226, 6, 120, C.wood), rect(590, 226, 6, 120, C.wood));
  g.push(rect(110, 232, 56, 90, C.wood, ' rx="4"'), rect(116, 238, 44, 78, C.wood2));
  for (const [x, y] of [[126, 254], [148, 254], [126, 292], [148, 292]]) g.push(mobile(x, y, 14, 26, C.dark, C.sky), stroke(`M${x} ${y + 13}V${y + 20}`, C.white, 1.5));

  // Le réparateur, derrière le comptoir : loupe dans la main gauche, tournevis dans la droite
  const rx = 396, ry = 524, rs = 1.1, rsk = SKIN.s3;
  g.push(person({ x: rx, y: ry, s: rs, skin: rsk, legs: "none", hair: { type: "short" }, top: C.terra, wax: "wax2", sleeve: "short", face: "calm",
    arms: { l: [[-46, -156], [-30, -158]], r: [[46, -150], [24, -140]] } }));
  // Le comptoir : plateau, tapis de réparation, téléphone ouvert sur son support
  g.push(rect(188, 404, 414, 14, C.wood, ' rx="3"'), rect(188, 416, 414, 6, C.wood2));
  g.push(rect(330, 398, 120, 7, C.green, ' rx="2"'));
  const px = 400, py = 376;
  g.push(`<path d="M${px - 22} 399L${px - 10} 384H${px + 10}L${px + 22} 399Z" fill="${C.grey}"/>`);
  g.push(`<g transform="rotate(-4 ${px} ${py})">${rect(px - 16, py - 26, 32, 54, C.dark, ' rx="6"')}${rect(px - 12, py - 22, 24, 46, C.leaf2, ' rx="3"')}${rect(px - 10, py - 2, 20, 22, C.steel, ' rx="2"')}${rect(px - 10, py - 22, 9, 7, C.dark)}${`<circle cx="${px + 6}" cy="${py - 18}" r="4" fill="${C.dark}"/>`}${stroke(`M${px - 12} ${py - 12}H${px + 12}`, C.ocre, 1.4)}</g>`);
  // Le capot et l'écran déposés sur le tapis, les petites vis
  g.push(rect(344, 392, 34, 6, C.dark, ' rx="2"'), rect(424, 392, 30, 6, C.blue, ' rx="2"'));
  for (const x of [432, 440, 448]) g.push(`<circle cx="${x}" cy="389" r="1.8" fill="${C.steel}"/>`);
  // Le tournevis, posé sur le téléphone, puis la main
  const [tx, ty] = toScene(rx, ry, rs, false, 24, -140);
  g.push(stroke(`M${tx} ${ty}L${px + 4} ${py + 4}`, C.steel, 2.5), stroke(`M${tx + 10} ${ty + 6}L${tx - 2} ${ty - 2}`, C.yellow, 7), hand(tx, ty, rsk));
  // La loupe : manche dans la main gauche, verre devant le téléphone
  const [lx, ly] = toScene(rx, ry, rs, false, -30, -158);
  g.push(stroke(`M${lx} ${ly}L${px - 12} ${py - 16}`, C.dark, 6), `<circle cx="${px - 6}" cy="${py - 8}" r="18" fill="${C.sky}" opacity=".35"/><circle cx="${px - 6}" cy="${py - 8}" r="18" fill="none" stroke="${C.dark}" stroke-width="4"/>`, `<path d="M${px - 16} ${py - 16}Q${px - 12} ${py - 22} ${px - 4} ${py - 22}" fill="none" stroke="${C.white}" stroke-width="2.5" opacity=".8"/>`, hand(lx, ly, rsk));
  // La lampe articulée sur le comptoir
  g.push(stroke("M520 404V388L548 352L516 330", C.dark, 4), `<path d="M500 326L528 318L520 342Z" fill="${C.ocre}"/>`, rect(506, 400, 28, 6, C.dark, ' rx="2"'));
  // La vitrine sous le comptoir : coques, chargeurs, écouteurs, batteries (sans marque)
  g.push(rect(194, 422, 402, 116, C.sky), rect(194, 422, 402, 116, C.blue, ' opacity=".14"'), rect(194, 478, 402, 5, C.white, ' opacity=".9"'));
  for (let i = 0; i < 12; i++) g.push(rect(206 + i * 32, 440, 18, 32, cases[i % 9], ' rx="4"'), `<circle cx="${212 + i * 32}" cy="447" r="2.4" fill="${C.dark}" opacity=".5"/>`);
  for (let i = 0; i < 6; i++) g.push(charger(214 + i * 64, 494, i % 2 ? C.white : C.dark));
  for (let i = 0; i < 5; i++) g.push(rect(246 + i * 64, 504, 30, 18, [C.grey, C.dark, C.steel, C.red, C.grey][i], ' rx="3"'), rect(250 + i * 64, 508, 10, 4, C.yellow, ' opacity=".8"'));
  g.push(`<path d="M206 424L240 424L210 474Z" fill="${C.white}" opacity=".45"/><path d="M450 424H470L430 536H410Z" fill="${C.white}" opacity=".3"/>`, rect(188, 536, 414, 18, C.wood2, ' rx="2"'), stroke("M194 422H596V538H194Z", C.wood, 4));

  // L'enfant curieux, sur la pointe des pieds, les mains sur le bord du comptoir
  const kx = 148, ky = 566, ks = 0.72, ksk = SKIN.s2;
  g.push(person({ x: kx, y: ky, s: ks, skin: ksk, hair: { type: "short" }, top: C.yellow, sleeve: "short", bottom: C.indigo, shoes: C.red, face: "talk",
    arms: { l: [[-40, -150], [-36, -110]], r: [[52, -192], [68, -224]] } }));
  // La cliente, soulagée : elle a retrouvé son téléphone, la main sur le cœur
  const cx = 666, cy = 568, cs = 1.04, csk = SKIN.s5;
  g.push(person({ x: cx, y: cy, s: cs, flip: true, skin: csk, hair: { type: "boxbraids", beads: C.ocre }, top: C.indigo, wax: "wax1", sleeve: "short", bottom: C.ocre, bwax: "wax3", legs: "skirt", face: "laugh",
    arms: { l: [[-42, -150], [-12, -166]], r: [[54, -166], [56, -214]] }, phone: null }));
  // Son téléphone réparé dans la main droite, écran allumé
  const [qx, qy] = toScene(cx, cy, cs, true, 56, -214);
  g.push(`<g transform="translate(${f(qx)} ${f(qy - 16)}) rotate(-8)">${mobile(0, 0, 20, 36, C.dark, C.green)}<g transform="scale(.45)">${check()}</g></g>`, hand(qx, qy - 2, csk, 7.8));
  // Bulle : réparé !
  g.push(bubble(720, 170, `<rect x="-10" y="-17" width="20" height="34" rx="4" fill="${C.white}"/><rect x="-7" y="-13" width="14" height="24" rx="2" fill="${C.green}"/>` + `<g transform="translate(14 10) scale(.55)"><circle r="14" fill="${C.white}"/>${check(C.green)}</g>`, C.green), `<circle cx="690" cy="244" r="5" fill="${C.green}" opacity=".5"/><circle cx="676" cy="266" r="3.5" fill="${C.green}" opacity=".4"/>`);
  return frame(g.join(""), C.sand);
}

export default [
  { id: "tissage", fr: "La tisserande", en: "The weaver",
    tags: ["tissage", "tisserande", "métier à tisser", "kente", "ndop", "fil", "bobines", "navette", "apprentie", "tissu", "artisanat", "cour", "manguier", "weaving", "weaver", "loom", "thread", "spools", "shuttle", "apprentice", "fabric", "craft", "courtyard"], draw: tissage },
  { id: "cordonnier", fr: "Le cordonnier du coin", en: "The street shoemaker",
    tags: ["cordonnier", "chaussures", "sandales", "réparation", "parasol", "trottoir", "rue", "quartier", "marteau", "cirage", "natte", "client", "écolière", "pieds nus", "shoemaker", "cobbler", "shoes", "sandals", "repair", "umbrella", "sidewalk", "street", "hammer", "polish", "customer", "schoolgirl", "barefoot"], draw: cordonnier },
  { id: "telephone", fr: "Le réparateur de téléphones", en: "The phone repairer",
    tags: ["téléphone", "réparation", "réparateur", "échoppe", "kiosque", "portable", "smartphone", "coques", "chargeurs", "loupe", "tournevis", "vitrine", "cliente", "enfant", "quartier", "phone", "repair", "repairer", "kiosk", "mobile", "cases", "chargers", "magnifier", "screwdriver", "display case", "customer", "child"], draw: telephone },
];
