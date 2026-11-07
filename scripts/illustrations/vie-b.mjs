// Scènes : le moto-taxi (bendskin), le repas en famille, le salon de tresses.
import { C, SKIN, HAIR, person, frame, palm, stroke } from "./lib.mjs";

const f1 = (n) => Math.round(n * 10) / 10;
/** Dessine `inner` dans le repère local d'un personnage (mêmes x, y, s, flip que person()). */
const at = (x, y, s, flip, inner) => `<g transform="translate(${f1(x)} ${f1(y)}) scale(${flip ? -s : s} ${s})">${inner}</g>`;
/** Passe d'un point local d'un personnage au repère de la scène. */
const W = (x, y, s, flip, [lx, ly]) => [f1(x + (flip ? -lx : lx) * s), f1(y + ly * s)];
const hand = ([hx, hy], skin, r = 7.5) => `<circle cx="${hx}" cy="${hy}" r="${r}" fill="${skin}"/>`;
/** Une tresse : trait de cheveux avec un pointillé clair qui suggère le tressage. */
const braid = (d, w = 5, col = HAIR) => stroke(d, col, w) + stroke(d, "rgba(255,255,255,.28)", w * 0.35, ` stroke-dasharray="1.5 3"`);

/* ---------- Scène 1 : bendskin (moto-taxi) dans une rue de Douala ---------- */
function moto() {
  const g = [];
  const BK = C.red;
  g.push(`<circle cx="610" cy="86" r="36" fill="${C.ocre}" opacity=".8"/>`);
  // Un palmier derrière les toits
  g.push(palm(470, 300, 0.85, 12));
  // Échoppes peintes, toits de tôle, auvents sur poteaux
  const shops = [[-10, 160, 180, C.ocre], [150, 150, 200, C.green], [300, 140, 170, C.rose], [440, 150, 210, C.blue], [590, 120, 180, C.terra], [710, 110, 190, C.sand2]];
  for (const [i, [bx, bw, bh, col]] of shops.entries()) {
    const top = 440 - bh;
    g.push(`<rect x="${bx}" y="${top}" width="${bw}" height="${bh}" fill="${C.cream}"/><rect x="${bx}" y="${top}" width="${bw}" height="${bh}" fill="${col}" opacity=".62"/>`);
    g.push(`<rect x="${bx}" y="${412}" width="${bw}" height="28" fill="${col}"/>`); // soubassement peint
    // Toit de tôle ondulée
    g.push(`<path d="M${bx - 6} ${top}L${bx + 10} ${top - 22}H${bx + bw - 6}L${bx + bw + 6} ${top}Z" fill="${C.steel}"/>`);
    for (let rx = bx + 4; rx < bx + bw; rx += 9) g.push(`<path d="M${rx} ${top}L${rx + 12} ${top - 22}" stroke="${C.grey}" stroke-width="2" opacity=".6"/>`);
    // Porte ouverte avec marchandises, fenêtre à volets
    const dx = bx + bw * 0.18, dw = bw * 0.36;
    g.push(`<rect x="${f1(dx)}" y="${top + 60}" width="${f1(dw)}" height="${bh - 88}" fill="${C.dark}" opacity=".75"/>`);
    for (let k = 0; k < 3; k++) g.push(`<rect x="${f1(dx + 6 + k * dw / 3.4)}" y="${top + 70 + (k % 2) * 8}" width="${f1(dw / 4.4)}" height="12" rx="2" fill="${[C.ocre, C.white, C.leaf][(i + k) % 3]}"/>`);
    g.push(`<rect x="${f1(bx + bw * 0.62)}" y="${top + 64}" width="${f1(bw * 0.24)}" height="40" fill="${C.sky}"/><rect x="${f1(bx + bw * 0.62 - 10)}" y="${top + 64}" width="10" height="40" fill="${C.wood2}"/><rect x="${f1(bx + bw * 0.86)}" y="${top + 64}" width="10" height="40" fill="${C.wood2}"/>`);
    // Enseigne peinte sans texte
    g.push(`<rect x="${f1(bx + 12)}" y="${top + 14}" width="${f1(bw - 30)}" height="30" rx="4" fill="${C.white}"/><circle cx="${f1(bx + 30)}" cy="${top + 29}" r="9" fill="${[C.terra, C.indigo, C.green, C.ocre, C.indigo, C.terra][i]}"/><rect x="${f1(bx + 46)}" y="${top + 24}" width="${f1(bw * 0.4)}" height="10" rx="5" fill="${[C.indigo, C.terra, C.ocre, C.green, C.green, C.indigo][i]}"/>`);
  }
  // Auvents (tôle sur poteaux de bois)
  for (const [ax, aw] of [[150, 150], [590, 120]]) g.push(`<path d="M${ax - 4} 322H${ax + aw + 4}L${ax + aw + 14} 344H${ax - 14}Z" fill="${C.steel}"/><rect x="${ax - 10}" y="344" width="5" height="96" fill="${C.wood2}"/><rect x="${ax + aw + 5}" y="344" width="5" height="96" fill="${C.wood2}"/>`);
  // Poteaux électriques et fils
  for (const px of [300, 760]) g.push(`<rect x="${px - 4}" y="170" width="8" height="270" fill="${C.wood2}"/><rect x="${px - 20}" y="184" width="40" height="6" rx="3" fill="${C.wood2}"/>`);
  g.push(stroke("M0 206Q150 236 300 188Q530 238 760 188Q780 192 800 196", C.dark, 2, ' opacity=".55"'));
  // Trottoir en terre rouge, caniveau, route
  g.push(`<rect y="440" width="800" height="30" fill="${C.rose}"/><rect y="440" width="800" height="30" fill="${C.wood}" opacity=".35"/><rect y="468" width="800" height="7" fill="${C.wood2}" opacity=".6"/><rect y="475" width="800" height="125" fill="${C.grey}" opacity=".55"/>`);
  for (let x = 20; x < 800; x += 140) g.push(`<rect x="${x}" y="576" width="70" height="7" rx="3.5" fill="${C.white}" opacity=".8"/>`);

  // Call-box : parasol rayé, petite table, vendeur au téléphone
  const cbx = 86, cby = 462;
  g.push(`<rect x="${cbx - 2}" y="300" width="4" height="${cby - 300}" fill="${C.dark}"/>`);
  for (let k = 0; k < 6; k++) {
    const x0 = cbx - 84 + k * 28, x1 = x0 + 28;
    g.push(`<path d="M${cbx} 292L${x0} 338Q${x0 + 14} 346 ${x1} 338Z" fill="${k % 2 ? C.white : C.green}"/>`);
  }
  g.push(`<circle cx="${cbx}" cy="291" r="4" fill="${C.dark}"/>`);
  g.push(person({ x: cbx + 4, y: 476, s: 0.56, skin: SKIN.s3, hair: { type: "short" }, top: C.indigo, wax: "kitenge", legs: "none", sleeve: "short",
    arms: { l: [[-38, -176], [-20, -232]], r: [[40, -150], [34, -120]] }, phone: { rot: 10 } }));
  g.push(`<rect x="${cbx - 36}" y="${cby - 44}" width="72" height="8" rx="2" fill="${C.wood2}"/><rect x="${cbx - 32}" y="${cby - 36}" width="5" height="40" fill="${C.wood2}"/><rect x="${cbx + 27}" y="${cby - 36}" width="5" height="40" fill="${C.wood2}"/><rect x="${cbx - 30}" y="${cby - 56}" width="22" height="12" rx="2" fill="${C.dark}"/><rect x="${cbx - 2}" y="${cby - 52}" width="12" height="8" rx="2" fill="${C.ocre}"/><rect x="${cbx + 14}" y="${cby - 54}" width="14" height="10" rx="2" fill="${C.white}"/>`);

  // Vendeuse avec une bassine de mangues sur la tête
  const vx = 640, vy = 470, vs = 0.62;
  g.push(person({ x: vx, y: vy, s: vs, flip: true, skin: SKIN.s1, hair: { type: "foulard", color: C.terra, wax: "wax2" }, top: C.green, wax: "wax1", robe: "kaba", legs: "walkskirt",
    arms: { r: [[46, -250], [30, -300]], l: [[-40, -150], [-34, -112]] } }));
  g.push(at(vx, vy, vs, true, `<path d="M-40 -306H44L34 -330H-30Z" fill="${C.blue}"/><ellipse cx="2" cy="-330" rx="34" ry="7" fill="${C.steel}"/>` +
    [[-18, -338], [-2, -342], [14, -338], [-10, -350], [8, -351], [26, -333], [-26, -333]].map(([mx, my], i) => `<ellipse cx="${mx}" cy="${my}" rx="10" ry="8" fill="${i % 3 ? C.ocre : C.leaf}"/>`).join("") +
    `<path d="M-40 -306H44L34 -330H-30Z" fill="none"/>` + hand([30, -300], SKIN.s1)));
  g.push(palm(778, 470, 1.15, -10));

  /* La moto : 125 cc rouge, de profil vers la droite. Sol en 560. */
  const R = [236, 520], F = [516, 520];
  const wheel = ([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="40" fill="${C.dark}"/><circle cx="${cx}" cy="${cy}" r="29" fill="${C.steel}"/><circle cx="${cx}" cy="${cy}" r="25" fill="${C.grey}"/>` +
    [0, 30, 60, 90, 120, 150].map((a) => `<path d="M${cx} ${cy - 25}V${cy + 25}" stroke="${C.steel}" stroke-width="1.6" transform="rotate(${a} ${cx} ${cy})"/>`).join("") + `<circle cx="${cx}" cy="${cy}" r="8" fill="${C.steel}"/><circle cx="${cx}" cy="${cy}" r="3.5" fill="${C.dark}"/>`;
  g.push(`<ellipse cx="380" cy="562" rx="200" ry="8" fill="${C.dark}" opacity=".2"/>`);
  for (const [x1, y1, L] of [[120, 500, 60], [100, 530, 80], [140, 470, 40]]) g.push(stroke(`M${x1} ${y1}H${x1 + L}`, C.white, 5, ' opacity=".8"'));
  g.push(wheel(R), wheel(F));
  // Bras oscillant, carter de chaîne, amortisseur
  g.push(stroke(`M${R[0]} ${R[1]}L372 492`, C.dark, 10), `<path d="M244 510L366 486L370 498L250 524Z" fill="${C.dark}"/>`);
  g.push(stroke("M262 412L244 506", C.dark, 7), stroke("M260 424L248 490", C.steel, 4, ' stroke-dasharray="3 3"'));
  // Garde-boue arrière, porte-bagages tubulaire, feu arrière
  g.push(stroke("M186 512Q190 470 236 468Q268 468 282 486", BK, 8));
  g.push(stroke("M182 400H246M186 400L204 430M226 400L240 428M182 400V412", C.steel, 5), `<rect x="168" y="404" width="18" height="12" rx="3" fill="${C.dark}"/><rect x="170" y="406" width="10" height="8" rx="2" fill="${C.ocre}"/>`);
  // Cadre, moteur, échappement
  g.push(stroke("M494 398L438 462", C.dark, 12), stroke("M494 396L300 420", C.dark, 9));
  g.push(`<path d="M352 456H436L442 470Q440 500 418 506H370Q350 502 348 484Z" fill="${C.grey}"/><circle cx="380" cy="482" r="15" fill="${C.steel}"/><circle cx="380" cy="482" r="6" fill="${C.grey}"/>`);
  g.push(`<g transform="rotate(-28 428 450)"><rect x="410" y="428" width="34" height="34" rx="4" fill="${C.steel}"/>${[436, 444, 452].map((y) => `<rect x="406" y="${y}" width="42" height="3" fill="${C.grey}"/>`).join("")}</g>`);
  g.push(stroke("M430 476Q420 512 380 516H300", C.steel, 8), `<path d="M196 504H312Q320 512 312 522H196Q188 513 196 504Z" fill="${C.steel}"/><rect x="226" y="504" width="50" height="9" rx="4" fill="${C.grey}"/>`);
  // Cache latéral, réservoir, selle longue
  g.push(`<path d="M300 420H386L380 456H312Z" fill="${BK}"/><rect x="322" y="432" width="40" height="8" rx="4" fill="${C.white}" opacity=".7"/>`);
  g.push(`<path d="M404 404Q408 378 446 376Q480 376 494 392L490 414Q448 424 408 420Z" fill="${BK}"/><path d="M420 388Q446 380 472 384" stroke="${C.white}" stroke-width="4" fill="none" opacity=".55" stroke-linecap="round"/><path d="M430 400H470" stroke="${C.dark}" stroke-width="5" opacity=".35" stroke-linecap="round"/>`);
  g.push(`<path d="M196 402Q198 388 216 388H398Q414 388 412 402L404 412H210Q196 412 196 402Z" fill="${C.dark}"/><path d="M214 392H396" stroke="${C.grey}" stroke-width="2" opacity=".6"/>`);
  // Fourche télescopique, garde-boue avant, phare rond
  g.push(stroke(`M496 392L${F[0]} ${F[1]}`, C.steel, 9), stroke("M496 392L506 452", C.dark, 11));
  g.push(stroke("M484 494Q496 468 522 470Q544 474 552 494", BK, 8));
  g.push(`<circle cx="514" cy="386" r="17" fill="${C.dark}"/><circle cx="518" cy="386" r="12" fill="${C.yellow}"/><circle cx="521" cy="382" r="4" fill="${C.white}" opacity=".8"/>`);
  // Repose-pieds
  g.push(`<rect x="424" y="497" width="34" height="7" rx="3.5" fill="${C.dark}"/><rect x="282" y="500" width="28" height="7" rx="3.5" fill="${C.dark}"/>`);

  // Passagère : gele et kaba en pagne, assise derrière le conducteur ; une main au porte-bagages, l'autre tient son sac
  const px = 262, py = 498, ps = 0.96, pskin = SKIN.s4;
  g.push(person({ x: px, y: py, s: ps, skin: pskin, hair: { type: "gele", color: C.ocre, wax: "wax2" }, top: C.indigo, wax: "wax1", robe: "kaba", legs: "sit", shoes: C.wood2,
    arms: { l: [[-48, -150], [-44, -108]], r: [[44, -152], [50, -114]] } }));
  // Sac en bandoulière, posé sur sa hanche côté porte-bagages
  g.push(at(px, py, ps, false, `${stroke("M22 -200L-30 -128", C.wood2, 4)}<path d="M-46 -132H-12L-10 -104H-48Z" fill="${C.terra}"/><rect x="-34" y="-124" width="12" height="5" rx="2" fill="${C.ocre}"/>${hand([-44, -108], pskin)}`));
  // Conducteur casqué
  const dx = 372, dy = 502, ds = 1;
  g.push(person({ x: dx, y: dy, s: ds, skin: SKIN.s2, hair: { type: "short" }, hat: { type: "helmet", color: C.ocre }, top: C.yellow, bottom: C.indigo, shoes: C.dark, legs: "sit",
    arms: { l: [[42, -176], [98, -162]], r: [[64, -170], [104, -158]] } }));
  // Chasuble : bande réfléchissante sur le buste
  g.push(`<rect x="${dx - 28}" y="${dy - 150}" width="56" height="8" fill="${C.steel}" opacity=".9"/>`);
  // Guidon, rétroviseur, puis les mains par-dessus
  g.push(stroke("M496 394L488 348", C.dark, 6), stroke("M466 346Q480 340 500 348", C.dark, 7), stroke("M492 346L484 304", C.dark, 3), `<ellipse cx="482" cy="300" rx="7" ry="10" fill="${C.dark}"/>`);
  g.push(hand([dx + 98, dy - 162], SKIN.s2), hand([dx + 104, dy - 158], SKIN.s2));
  return frame(g.join(""), "#DCEAF0");
}

/* ---------- Scène 2 : le repas en famille autour du plat commun ---------- */
function repas() {
  const g = [];
  g.push(`<defs><pattern id="repas-natte" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="${C.ocre}"/><rect width="8" height="4" fill="${C.wood}" opacity=".45"/><rect x="8" y="8" width="8" height="4" fill="${C.wood}" opacity=".45"/><rect x="4" y="4" width="4" height="4" fill="${C.cream}" opacity=".35"/><rect x="12" y="12" width="4" height="4" fill="${C.cream}" opacity=".35"/></pattern></defs>`);
  // Mur à soubassement peint, sol en ciment
  g.push(`<rect y="330" width="800" height="110" fill="${C.terra}" opacity=".16"/><rect y="326" width="800" height="6" fill="${C.wood2}" opacity=".5"/>`);
  g.push(`<rect y="440" width="800" height="160" fill="${C.sand2}"/><rect y="436" width="800" height="6" fill="${C.wood2}" opacity=".6"/>`);
  // Natte tressée au sol
  g.push(`<path d="M96 476H704L760 588H40Z" fill="url(#repas-natte)"/><path d="M96 476H704L760 588H40Z" fill="none" stroke="${C.terra}" stroke-width="7"/>`, stroke("M74 530H726", C.terra, 4, ' opacity=".6"'));
  // Fenêtre et rideaux en pagne
  g.push(`<rect x="300" y="60" width="200" height="170" rx="8" fill="${C.white}"/><rect x="310" y="70" width="180" height="150" rx="3" fill="#BFD8E6"/><path d="M310 196Q350 176 390 188Q440 172 490 192V220H310Z" fill="${C.leaf}"/><rect x="396" y="70" width="8" height="150" fill="${C.white}"/>`);
  g.push(palm(450, 214, 0.42, 6).replace("<g ", '<g opacity=".9" '));
  g.push(`<rect x="290" y="52" width="220" height="8" rx="4" fill="${C.wood2}"/>`);
  for (const d of ["M292 58H350Q340 150 360 246H300Q286 150 292 58Z", "M508 58H450Q460 150 440 246H500Q514 150 508 58Z"]) g.push(`<path d="${d}" fill="${C.green}"/><path d="${d}" fill="url(#kitenge)"/>`);
  // Masque et plateau de vannerie au mur
  g.push(`<ellipse cx="150" cy="150" rx="34" ry="54" fill="${C.wood2}"/><path d="M124 124Q150 112 176 124Q172 176 150 196Q128 176 124 124Z" fill="${C.sand}"/><path d="M134 140H146M154 140H166" stroke="${C.wood2}" stroke-width="5" stroke-linecap="round"/><path d="M150 146V170" stroke="${C.wood2}" stroke-width="4"/><path d="M140 182H160" stroke="${C.wood2}" stroke-width="4" stroke-linecap="round"/>` +
    [-1, 1].map((k) => `<path d="M${150 + k * 30} 186Q${150 + k * 34} 214 ${150 + k * 26} 230" stroke="${C.ocre}" stroke-width="4" fill="none"/>`).join(""));
  g.push(`<circle cx="640" cy="130" r="46" fill="${C.ocre}"/><circle cx="640" cy="130" r="34" fill="${C.wood}" opacity=".5"/><circle cx="640" cy="130" r="22" fill="${C.terra}"/><circle cx="640" cy="130" r="10" fill="${C.ocre}"/>` +
    [0, 45, 90, 135].map((a) => `<path d="M640 86V174" stroke="${C.wood2}" stroke-width="2" opacity=".5" transform="rotate(${a} 640 130)"/>`).join(""));
  g.push(`<path d="M400 0V22" stroke="${C.dark}" stroke-width="3"/><path d="M380 40Q380 22 400 22Q420 22 420 40Z" fill="${C.ocre}"/>`);
  // Buffet avec calebasses
  g.push(`<rect x="34" y="320" width="80" height="120" rx="4" fill="${C.wood2}"/><rect x="42" y="332" width="64" height="46" rx="3" fill="${C.wood}"/><rect x="42" y="386" width="64" height="46" rx="3" fill="${C.wood}"/>`);
  const calabash = (cx, cy, r, col = C.ocre) => `<path d="M${cx - r} ${cy}A${r} ${r * 0.9} 0 0 0 ${cx + r} ${cy}Z" fill="${col}"/><path d="M${cx - r} ${cy}A${r} ${r * 0.9} 0 0 0 ${cx + r} ${cy}Z" fill="${C.wood}" opacity=".35"/><ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.22}" fill="${C.wood2}"/>${stroke(`M${cx - r * 0.8} ${cy + r * 0.35}Q${cx} ${cy + r * 0.6} ${cx + r * 0.8} ${cy + r * 0.35}`, C.wood2, 2, ' stroke-dasharray="3 3"')}`;
  g.push(`<circle cx="62" cy="300" r="20" fill="${C.ocre}"/><circle cx="62" cy="300" r="20" fill="${C.wood}" opacity=".3"/><path d="M58 282Q58 266 66 262" stroke="${C.wood2}" stroke-width="5" fill="none"/>`, calabash(94, 320, 15));
  // Tambour dans le coin
  g.push(`<path d="M702 434H758L748 500L756 548H704L712 500Z" fill="${C.wood2}"/><ellipse cx="730" cy="434" rx="28" ry="7" fill="${C.sand}"/>` + stroke("M704 440L756 470L706 500M756 440L704 470L754 500", C.ocre, 2.5));

  // Derrière le plateau : la mère (gele) et l'enfant (bantu knots)
  const mx = 400, my = 560, ms = 1;
  const mR = [[44, -160], [16, -138]];
  g.push(person({ x: mx, y: my, s: ms, skin: SKIN.s3, hair: { type: "gele", color: C.green, wax: "wax3" }, top: C.terra, wax: "wax1", legs: "none",
    arms: { l: [[-48, -158], [-52, -122]], r: mR } }));
  const cx0 = 492, cy0 = 532, cs = 0.72;
  const cR = [[44, -160], [14, -214]], cL = [[-44, -156], [-50, -128]];
  g.push(person({ x: cx0, y: cy0, s: cs, skin: SKIN.s5, hair: { type: "bantu" }, top: C.green, dashiki: true, legs: "none", sleeve: "short",
    arms: { l: cL, r: cR },
    rhand: (hx, hy) => `<g transform="rotate(-30 ${hx} ${hy})"><ellipse cx="${hx + 2}" cy="${hy - 12}" rx="6" ry="13" fill="${C.yellow}"/><ellipse cx="${hx + 2}" cy="${hy - 12}" rx="3" ry="8" fill="${C.ocre}"/></g>${hand([hx, hy], SKIN.s5)}` }));

  // Le plateau bas sculpté et le plat commun
  g.push(`<path d="M330 456H470L456 520L476 548H324L344 520Z" fill="${C.wood2}"/>` + stroke("M340 470L360 500L380 470L400 500L420 470L440 500L460 470", C.ocre, 3) + `<rect x="324" y="540" width="152" height="10" rx="3" fill="${C.wood2}"/>`);
  g.push(`<ellipse cx="400" cy="452" rx="118" ry="16" fill="${C.wood2}"/><ellipse cx="400" cy="446" rx="118" ry="16" fill="${C.wood}"/>`);
  // Poisson braisé (à gauche), ndolè (au centre), plantains (à droite), miondo (devant)
  g.push(`<ellipse cx="330" cy="444" rx="36" ry="8" fill="${C.white}"/><ellipse cx="328" cy="438" rx="26" ry="9" fill="${C.wood}"/><path d="M352 438L368 428V448Z" fill="${C.wood}"/>` + stroke("M314 434L320 442M324 432L330 442M334 432L340 442", C.wood2, 2.5) + `<circle cx="310" cy="436" r="2" fill="${C.dark}"/>` + stroke("M306 446Q314 440 322 446M332 448Q340 442 348 448", C.white, 2.5));
  g.push(`<path d="M360 446Q362 420 400 418Q438 420 440 446Z" fill="${C.white}"/><path d="M366 424Q376 400 400 398Q424 400 434 424Q400 430 366 424Z" fill="${C.leaf2}"/>`);
  for (const [lx, ly] of [[382, 412], [396, 406], [412, 412], [404, 418], [388, 420], [420, 420]]) g.push(`<circle cx="${lx}" cy="${ly}" r="3" fill="${C.leaf}"/>`);
  g.push(`<path d="M394 404q4 -6 9 -1" stroke="${C.rose}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M414 414q4 -6 9 -1" stroke="${C.rose}" stroke-width="3" fill="none" stroke-linecap="round"/>`);
  g.push(`<ellipse cx="472" cy="444" rx="34" ry="8" fill="${C.white}"/>`);
  for (const [px, py] of [[460, 438], [474, 440], [486, 437], [466, 431], [480, 431], [473, 424]]) g.push(`<ellipse cx="${px}" cy="${py}" rx="9" ry="5" fill="${C.ocre}"/><ellipse cx="${px}" cy="${py}" rx="5" ry="2.5" fill="${C.yellow}"/>`);
  // Miondo : fins bâtons de manioc sur une feuille, devant
  g.push(`<path d="M346 466Q396 444 456 456Q408 480 346 466Z" fill="${C.leaf}"/>`);
  for (const k of [0, 1, 2, 3]) g.push(`<rect x="${368 + k * 4}" y="${449 + k * 5}" width="60" height="3.6" rx="1.8" fill="${C.cream}" transform="rotate(-5 400 456)"/>`);
  g.push(stroke("M378 450L380 470M418 446L420 466", C.leaf2, 2.5));
  // La main de la mère qui puise dans le plat, celle de l'enfant qui prend un plantain
  g.push(hand(W(mx, my, ms, false, mR[1]), SKIN.s3), hand(W(cx0, cy0, cs, false, cL[1]), SKIN.s5, 5.5));

  // Grand-mère en kaba et foulard, sur un tabouret sculpté
  const stool = (x0) => `<path d="M${x0 - 34} 448H${x0 + 34}L${x0 + 28} 460H${x0 - 28}Z" fill="${C.wood2}"/><path d="M${x0 - 24} 460H${x0 + 24}L${x0 + 16} 500L${x0 + 26} 540H${x0 - 26}L${x0 - 16} 500Z" fill="${C.wood2}"/>` +
    `<path d="M${x0 - 16} 466L${x0 - 6} 490L${x0 + 4} 466ZM${x0 + 6} 466L${x0 + 14} 486L${x0 + 18} 466Z" fill="${C.dark}" opacity=".45"/><path d="M${x0 - 18} 510L${x0 - 6} 532H${x0 - 22}ZM${x0 + 18} 510L${x0 + 6} 532H${x0 + 22}Z" fill="${C.dark}" opacity=".45"/>` +
    `<rect x="${x0 - 32}" y="538" width="64" height="10" rx="3" fill="${C.wood2}"/>${stroke(`M${x0 - 30} 454H${x0 + 30}`, C.ocre, 2.5, ' stroke-dasharray="4 4"')}`;
  const gx = 196, gR = [[64, -160], [98, -118]];
  g.push(person({ x: gx, y: 548, s: 1, skin: SKIN.s2, hair: { type: "foulard", color: C.indigo, wax: "wax3" }, top: C.ocre, wax: "wax2", robe: "kaba", legs: "sit", shoes: C.wood2,
    arms: { l: [[-40, -150], [-14, -116]], r: gR } }));
  g.push(stool(gx));
  // Père en toghu et calotte assortie, un bâton de miondo à la main
  const fx = 604, fR = [[60, -150], [100, -110]];
  g.push(person({ x: fx, y: 548, s: 1.04, flip: true, skin: SKIN.s4, hair: { type: "short" }, beard: true, hat: { type: "kufi", color: C.dark, wax: "toghu" }, top: C.dark, wax: "toghu", bottom: C.dark, legs: "sit",
    arms: { l: [[-40, -150], [-26, -112]], r: fR } }));
  g.push(stool(fx));
  // Calebasse d'eau et bol pour se laver les mains, au pied de la grand-mère
  g.push(calabash(122, 540, 22), `<ellipse cx="122" cy="540" rx="17" ry="3.5" fill="${C.blue}" opacity=".7"/>`);
  return frame(g.join(""), "#F6E7D2");
}

/* ---------- Scène 3 : au salon de tresses ---------- */
function coiffure() {
  const g = [];
  g.push(`<rect y="450" width="800" height="150" fill="${C.sand}"/>`);
  g.push(stroke(Array.from({ length: 16 }, (_, i) => `M${i * 50 + 1} 450V600`).join(""), C.sand2, 2), `<rect y="440" width="800" height="12" fill="${C.wood2}"/>`);
  // Miroir et tablette (peigne, pots, mèches)
  g.push(`<rect x="40" y="90" width="150" height="210" rx="75" fill="${C.wood}"/><rect x="50" y="100" width="130" height="190" rx="65" fill="${C.steel}"/><path d="M70 150Q80 120 108 110" stroke="${C.white}" stroke-width="8" fill="none" opacity=".6" stroke-linecap="round"/><path d="M80 290Q86 236 115 236Q144 236 150 290Z" fill="${C.grey}" opacity=".5"/><circle cx="115" cy="214" r="20" fill="${C.grey}" opacity=".5"/>`);
  g.push(`<rect x="30" y="300" width="180" height="12" rx="4" fill="${C.wood2}"/>`);
  for (const [bx, h, col] of [[46, 30, C.terra], [68, 22, C.ocre]]) g.push(`<rect x="${bx}" y="${300 - h}" width="16" height="${h}" rx="4" fill="${col}"/><rect x="${bx + 4}" y="${294 - h}" width="8" height="7" fill="${C.dark}"/>`);
  g.push(`<rect x="94" y="288" width="44" height="12" rx="3" fill="${C.cream}"/>`, stroke("M100 288V276M108 288V276M116 288V276M124 288V276M132 288V276", C.dark, 3));
  // Mèches suspendues au bord de la tablette
  for (const [i, col] of [C.dark, C.wood2, C.terra].entries()) g.push(stroke(`M${156 + i * 14} 306Q${152 + i * 14} 350 ${160 + i * 14} 396`, col, 7), `<rect x="${150 + i * 14}" y="302" width="13" height="9" rx="2" fill="${C.white}"/>`);

  // Poster : quatre coiffures (nattes collées, bantu knots, tresses peules, box braids)
  const P = [236, 64, 250, 154];
  g.push(`<clipPath id="coiffure-poster"><rect x="${P[0] + 8}" y="${P[1] + 22}" width="${P[2] - 16}" height="${P[3] - 30}"/></clipPath>`);
  g.push(`<rect x="${P[0]}" y="${P[1]}" width="${P[2]}" height="${P[3]}" rx="6" fill="${C.cream}"/><rect x="${P[0]}" y="${P[1]}" width="${P[2]}" height="16" rx="6" fill="${C.terra}"/><rect x="${P[0]}" y="${P[1] + 10}" width="${P[2]}" height="6" fill="${C.terra}"/>`);
  const looks = [[{ type: "nattes" }, SKIN.s2, C.ocre], [{ type: "bantu" }, SKIN.s4, C.green], [{ type: "fulani", beads: C.ocre }, SKIN.s3, C.indigo], [{ type: "boxbraids", beads: C.terra }, SKIN.s1, C.ocre]];
  const busts = looks.map(([hair, skin, col], i) => {
    const bx = P[0] + 34 + i * 60;
    return `<circle cx="${bx}" cy="${P[1] + 72}" r="27" fill="${col}" opacity=".25"/>` + person({ x: bx, y: P[1] + 210, s: 0.52, skin, hair, top: col, sleeve: "short", legs: "none" });
  }).join("");
  g.push(`<g clip-path="url(#coiffure-poster)">${busts}</g>`);

  // Étagère : produits en haut, paquets de mèches de couleur en bas
  g.push(`<g transform="translate(0 -16)">`);
  g.push(`<rect x="560" y="120" width="200" height="10" rx="3" fill="${C.wood2}"/><rect x="560" y="200" width="200" height="10" rx="3" fill="${C.wood2}"/>`);
  for (const [bx, h, col] of [[572, 44, C.terra], [596, 34, C.ocre], [618, 50, C.green], [644, 28, C.indigo], [668, 40, C.white], [692, 46, C.terra], [716, 32, C.ocre], [738, 40, C.green]])
    g.push(`<rect x="${bx}" y="${120 - h * 0.8}" width="16" height="${h * 0.8}" rx="5" fill="${col}"/><rect x="${bx + 4}" y="${112 - h * 0.8}" width="8" height="9" fill="${C.dark}"/><rect x="${bx + 3}" y="${120 - h * 0.5}" width="10" height="8" rx="2" fill="${C.cream}" opacity=".85"/>`);
  for (const [i, col] of [HAIR, C.wood2, C.terra, C.red, C.yellow, C.indigo, HAIR].entries()) {
    const bx = 568 + i * 27;
    g.push(`<rect x="${bx}" y="136" width="22" height="64" rx="4" fill="${col}"/>` + stroke([5, 11, 17].map((k) => `M${bx + k} 152q3 20 0 44`).join(""), "rgba(255,255,255,.22)", 1.4) +
      `<rect x="${bx}" y="136" width="22" height="64" rx="4" fill="${C.white}" opacity=".18"/><rect x="${bx}" y="136" width="22" height="14" rx="3" fill="${[C.terra, C.ocre, C.green, C.indigo][i % 4]}"/><circle cx="${bx + 11}" cy="143" r="3.5" fill="${C.white}"/>`);
  }

  g.push(`</g>`);
  // Fauteuil
  g.push(`<rect x="258" y="290" width="120" height="160" rx="18" fill="${C.indigo}"/>`);
  g.push(`<rect x="252" y="436" width="130" height="18" rx="6" fill="${C.indigo}"/><rect x="306" y="454" width="12" height="80" fill="${C.steel}"/><ellipse cx="312" cy="540" rx="44" ry="8" fill="${C.steel}"/>`);
  // Coiffeuse (box braids à perles) debout derrière la cliente
  const clx = 318, cly = 540, hx = clx, hy = cly - 238;
  const cfx = 412, cfy = 522, cfs = 1.06, cfSkin = SKIN.s3;
  const grip1 = [hx + 40, hy + 46], grip2 = [hx + 44, hy + 30];
  const L = ([wx, wy]) => [f1((wx - cfx) / cfs), f1((wy - cfy) / cfs)];
  g.push(person({ x: cfx, y: cfy, s: cfs, skin: cfSkin, hair: { type: "boxbraids", beads: C.ocre }, top: C.green, wax: "kitenge", bottom: C.dark, legs: "skirt", bwax: "bogolan",
    arms: { l: [[-42, -150], L(grip1)], r: [[-2, -154], L(grip2)] } }));
  const cfArms = { l: [[-42, -150], L(grip1)], r: [[-2, -154], L(grip2)] };
  // Cliente assise, nattes collées sur la tête, cape de coiffure
  g.push(person({ x: clx, y: cly, s: 1, skin: SKIN.s2, hair: { type: "nattes" }, top: C.white, bottom: C.indigo, bwax: "ndop", legs: "sit", flip: true, shoes: C.terra,
    arms: { l: [[-40, -150], [-50, -114]], r: [[40, -150], [50, -114]] } }));
  g.push(`<path d="M${clx - 34} ${cly - 204}Q${clx} ${cly - 212} ${clx + 34} ${cly - 204}Q${clx + 56} ${cly - 160} ${clx + 58} ${cly - 108}Q${clx} ${cly - 96} ${clx - 58} ${cly - 108}Q${clx - 56} ${cly - 160} ${clx - 34} ${cly - 204}Z" fill="${C.ocre}"/>`);
  g.push(`<path d="M${clx - 9} ${cly - 207}L${clx} ${cly - 196}L${clx + 9} ${cly - 207}Z" fill="${SKIN.s2}"/>`);
  // Rangs de nattes bien marqués sur le crâne
  g.push(braid([-16, -9, -2, 5, 12].map((k) => `M${hx + k} ${hy - 14}Q${f1(hx + k * 1.15)} ${hy - 26} ${f1(hx + k * 0.7 + 3)} ${hy - 30}`).join(""), 4.2));
  // Côté gauche : les tresses longues déjà faites tombent sur la cape (perles au bout)
  const done = [[-12, -30, 104], [-15, -36, 98], [-18, -42, 90], [-20, -48, 80], [-21, -26, 108]];
  g.push(braid(done.map(([sx, ex, ey]) => `M${hx + sx} ${hy - 18}Q${hx + sx - 18} ${hy + 10} ${hx + ex} ${hy + ey}`).join(""), 5));
  for (const [, ex, ey] of done) g.push(`<circle cx="${hx + ex}" cy="${hy + ey + 3}" r="3" fill="${C.ocre}"/>`);
  // Côté droit : la tresse en cours, puis les mèches encore libres sous les mains de la coiffeuse
  g.push(braid(`M${hx + 17} ${hy - 16}Q${hx + 30} ${hy + 6} ${grip1[0]} ${grip1[1]}`, 5.5));
  g.push(stroke(`M${grip1[0]} ${grip1[1]}Q${grip1[0] + 4} ${grip1[1] + 30} ${grip1[0] - 2} ${grip1[1] + 64}M${grip1[0]} ${grip1[1]}Q${grip1[0] + 10} ${grip1[1] + 30} ${grip1[0] + 8} ${grip1[1] + 62}M${grip1[0]} ${grip1[1]}Q${grip1[0] + 16} ${grip1[1] + 26} ${grip1[0] + 18} ${grip1[1] + 56}`, HAIR, 2.6));
  g.push(stroke(`M${grip2[0]} ${grip2[1]}Q${grip2[0] + 16} ${grip2[1] + 20} ${grip2[0] + 24} ${grip2[1] + 70}`, HAIR, 2.6));
  // Avant-bras de la coiffeuse redessinés par-dessus la cliente, puis ses mains
  g.push(at(cfx, cfy, cfs, false, [cfArms.l, cfArms.r].map(([[ex, ey], [qx, qy]]) => { const d = `M${ex} ${ey}L${f1(qx + (ex - qx) * 0.25)} ${f1(qy + (ey - qy) * 0.25)}`; return stroke(d, C.green, 15) + stroke(d, "url(#kitenge)", 15); }).join("")));
  g.push(hand(grip1, cfSkin, 8), hand(grip2, cfSkin, 8));

  // Bulle de la cliente : les box braids qu'elle a choisies
  g.push(`<circle cx="530" cy="330" r="40" fill="${C.white}"/><circle cx="578" cy="312" r="7" fill="${C.white}"/><circle cx="592" cy="300" r="4" fill="${C.white}"/>`);
  g.push(`<clipPath id="coiffure-bulle"><circle cx="530" cy="330" r="36"/></clipPath><g clip-path="url(#coiffure-bulle)">${person({ x: 530, y: 452, s: 0.5, skin: SKIN.s2, hair: { type: "boxbraids", beads: C.ocre }, top: C.ocre, sleeve: "short", legs: "none" })}</g>`);
  // Deuxième cliente en gele, sur le banc, au téléphone
  g.push(`<rect x="560" y="420" width="200" height="16" rx="5" fill="${C.wood}"/><rect x="572" y="436" width="12" height="92" fill="${C.wood2}"/><rect x="736" y="436" width="12" height="92" fill="${C.wood2}"/>`);
  g.push(person({ x: 652, y: 520, s: 0.98, skin: SKIN.s4, hair: { type: "gele", color: C.terra, wax: "wax1" }, top: C.terra, wax: "wax1", robe: "kaba", legs: "sit", shoes: C.ocre,
    arms: { l: [[-26, -150], [10, -172]], r: [[40, -150], [44, -112]] }, phone: { rot: 12, screen: C.ocre } }));
  g.push(`<rect x="566" y="404" width="40" height="16" rx="4" fill="${C.indigo}"/>`, stroke("M572 404Q586 386 600 404", C.indigo, 4));
  return frame(g.join(""), "#E2EEDF");
}

export default [
  { id: "moto", fr: "Moto-taxi en ville", en: "Motorbike taxi in town", tags: ["moto", "moto-taxi", "bendskin", "benskin", "Douala", "transport", "ville", "rue", "casque", "passagère", "gele", "pagne", "call-box", "motorbike", "taxi", "city", "street", "helmet", "passenger"], draw: moto },
  { id: "repas", fr: "Repas en famille", en: "Family meal", tags: ["famille", "repas", "grand-mère", "enfant", "ndolè", "plantain", "miondo", "poisson braisé", "kaba", "toghu", "gele", "calebasse", "natte", "maison", "family", "meal", "grandmother", "child", "home", "food", "calabash"], draw: repas },
  { id: "coiffure", fr: "Au salon de tresses", en: "At the braiding salon", tags: ["coiffure", "salon", "tresses", "nattes", "box braids", "bantu knots", "tresses peules", "mèches", "coiffeuse", "cliente", "gele", "beauté", "hair", "salon", "braids", "cornrows", "hairdresser", "beauty"], draw: coiffure },
];
