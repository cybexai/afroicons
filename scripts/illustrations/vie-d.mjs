// Scènes : la jeune entreprise, la fête, le campus.
import { C, SKIN, person, frame, plant, palm, stroke, f } from "./lib.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="7.5" fill="${skin}"/>`;
/** Point d'une courbe de Bézier quadratique. */
const qb = (p0, p1, p2, t) => [0, 1].map((i) => (1 - t) ** 2 * p0[i] + 2 * (1 - t) * t * p1[i] + t * t * p2[i]);
const NDOP = "#1C2756"; // fond du ndop (couleur donnée par lib.mjs pour une tenue en ndop)

/* ---------- Scène 1 : présentation dans une jeune entreprise ---------- */
function startup() {
  const g = [];
  g.push(`<rect y="468" width="800" height="132" fill="${C.sand2}"/><rect y="462" width="800" height="8" fill="${C.wood2}"/>`);
  // Baie vitrée sur la ville aux sept collines (Yaoundé)
  g.push(`<rect x="30" y="50" width="224" height="412" rx="6" fill="${C.grey}"/><rect x="38" y="58" width="208" height="404" fill="${C.sky}"/>`);
  g.push(`<circle cx="200" cy="112" r="22" fill="${C.ocre}" opacity=".9"/>`);
  g.push(`<path d="M38 300Q80 230 130 280Q170 220 246 270V462H38Z" fill="${C.leaf}" opacity=".55"/><path d="M38 340Q110 290 170 330Q210 300 246 320V462H38Z" fill="${C.leaf}" opacity=".8"/>`);
  for (const [bx, bw, bh, c] of [[40, 34, 120, C.steel], [76, 26, 200, C.sand2], [104, 40, 150, C.steel], [146, 26, 230, C.sand2], [174, 34, 110, C.white], [210, 36, 170, C.steel]]) {
    g.push(`<rect x="${bx}" y="${462 - bh}" width="${bw}" height="${bh}" fill="${c}"/>`);
    for (let wy = 462 - bh + 12; wy < 450; wy += 18) for (let wx = bx + 6; wx < bx + bw - 5; wx += 10) g.push(`<rect x="${wx}" y="${wy}" width="4" height="8" fill="${c === C.white ? C.sand2 : C.white}" opacity=".75"/>`);
  }
  g.push(palm(62, 462, 0.42, 6), palm(232, 462, 0.36, -6));
  g.push(`<rect x="34" y="250" width="216" height="7" fill="${C.grey}"/><rect x="138" y="54" width="7" height="408" fill="${C.grey}"/>`);
  // Tissu ndop encadré au mur
  g.push(`<rect x="272" y="66" width="112" height="176" rx="4" fill="${C.wood2}"/><rect x="280" y="74" width="96" height="160" fill="${NDOP}"/><rect x="280" y="74" width="96" height="160" fill="url(#ndop)"/>`);
  g.push(`<rect x="280" y="74" width="96" height="8" fill="${C.ocre}"/><rect x="280" y="226" width="96" height="8" fill="${C.ocre}"/>`);
  // Écran de projection, graphique qui monte
  g.push(`<rect x="402" y="52" width="366" height="12" rx="6" fill="${C.dark}"/><rect x="410" y="62" width="350" height="222" fill="${C.white}"/><rect x="410" y="278" width="350" height="6" fill="${C.sand2}"/>`);
  g.push(stroke("M440 92V256H736", C.sand2, 3));
  for (const [bx, bh, c] of [[460, 40, C.indigo], [510, 66, C.green], [560, 92, C.ocre], [610, 120, C.terra], [660, 150, C.terra]]) g.push(`<rect x="${bx}" y="${254 - bh}" width="34" height="${bh}" rx="3" fill="${c}"/>`);
  g.push(stroke("M462 196L520 172L572 146L626 116L700 82", C.indigo, 5), `<path d="M708 74L688 78L702 94Z" fill="${C.indigo}"/>`);
  g.push(`<rect x="440" y="76" width="70" height="7" rx="3.5" fill="${C.sand2}"/>`);
  // Petite fusée sur l'écran
  g.push(`<circle cx="720" cy="196" r="24" fill="${C.terra}" opacity=".18"/><g transform="translate(720 196) rotate(45) scale(.9)"><path d="M-6 10Q0 26 6 10Z" fill="${C.ocre}"/><path d="M-7 -6L-14 10H-6ZM7 -6L14 10H6Z" fill="${C.indigo}"/><path d="M0 -20Q9 -10 8 10H-8Q-9 -10 0 -20Z" fill="${C.terra}"/><circle cx="0" cy="-4" r="3.5" fill="${C.white}"/></g>`);
  // Plante dans un panier tressé
  const basket = (x, y, w, h) => `<path d="M${x - w / 2} ${y - h}H${x + w / 2}L${x + w / 2 - 6} ${y}H${x - w / 2 + 6}Z" fill="${C.wood}"/>` + [0.25, 0.5, 0.75].map((k) => `<rect x="${x - w / 2 + 3}" y="${f(y - h * k)}" width="${w - 6}" height="3" fill="${C.wood2}"/>`).join("") + `<path d="M${x - w / 2 + 8} ${y - h}V${y}M${x} ${y - h}V${y}M${x + w / 2 - 8} ${y - h}V${y}" stroke="${C.ocre}" stroke-width="3" stroke-dasharray="4 5"/>`;
  g.push(`<g transform="translate(296 410)"><path d="M0 0Q-34 -40 -20 -100Q4 -60 0 0Z" fill="${C.leaf}"/><path d="M0 0Q30 -50 18 -96Q-6 -60 0 0Z" fill="${C.leaf2}"/><path d="M0 0Q-6 -70 6 -120Q16 -70 0 0Z" fill="${C.leaf}"/></g>`, basket(296, 462, 46, 54));
  // L'entrepreneure présente : veste, gele en wax
  g.push(person({ x: 186, y: 560, s: 1.1, skin: SKIN.s2, hair: { type: "gele", color: C.ocre, wax: "wax2" }, top: C.terra, jacket: { color: C.terra, shirt: C.white }, bottom: C.indigo, bwax: "wax3", legs: "skirt",
    arms: { r: [[68, -204], [104, -236]], l: [[-40, -152], [-34, -112]] }, point: [180, -250] }));
  // Collègues assis, chaises
  const chair = (x, flip) => at(x, 560, 0.95, flip, `<rect x="-36" y="-196" width="12" height="98" rx="5" fill="${C.grey}"/><rect x="-36" y="-104" width="80" height="12" rx="5" fill="${C.grey}"/><rect x="2" y="-92" width="8" height="84" fill="${C.grey}"/><rect x="-22" y="-10" width="56" height="8" rx="4" fill="${C.grey}"/>`);
  const mate = (x, flip, o) => chair(x, flip) + person({ x, y: 560, s: 0.95, flip, legs: "sit", arms: { l: [[-42, -150], [-14, -140]], r: [[42, -150], [24, -142]] }, ...o });
  g.push(mate(392, false, { skin: SKIN.s4, hair: { type: "nattes" }, beard: true, top: C.green, dashiki: C.ocre, bottom: C.dark }));
  g.push(mate(578, true, { skin: SKIN.s3, hair: { type: "boxbraids", beads: C.ocre }, top: C.indigo, wax: "kitenge", bottom: C.indigo }));
  g.push(mate(722, true, { skin: SKIN.s1, hair: { type: "short" }, top: C.dark, wax: "toghu", bottom: C.wood2 }));
  // Table avec chemin de table en kente
  g.push(`<rect x="350" y="430" width="380" height="14" rx="4" fill="${C.white}"/><rect x="350" y="442" width="380" height="5" fill="${C.steel}"/><rect x="366" y="447" width="10" height="113" fill="${C.grey}"/><rect x="704" y="447" width="10" height="113" fill="${C.grey}"/>`);
  const laptop = (x, w = 50) => `<path d="M${x} 430L${x + 6} ${430 - 34}H${x + w - 6}L${x + w} 430Z" fill="${C.steel}"/><rect x="${x - 4}" y="427" width="${w + 8}" height="4" rx="2" fill="${C.grey}"/><circle cx="${x + w / 2}" cy="${413}" r="4" fill="${C.white}" opacity=".7"/>`;
  g.push(laptop(424), laptop(502), laptop(642));
  const cup = (x, c) => `<rect x="${x}" y="410" width="16" height="20" rx="3" fill="${c}"/><path d="M${x + 16} 414Q${x + 24} 416 ${x + 22} 422Q${x + 20} 426 ${x + 16} 426" stroke="${c}" stroke-width="3" fill="none"/>`;
  g.push(cup(484, C.terra), cup(612, C.white), cup(694, C.ocre));
  return frame(g.join(""), C.cream);
}

/* ---------- Scène 2 : fête dans la cour ---------- */
function fete() {
  const g = [];
  // Ciel du soir
  g.push(`<rect x="0" y="170" width="800" height="200" fill="${C.rose}" opacity=".3"/><rect x="0" y="260" width="800" height="110" fill="${C.ocre}" opacity=".3"/>`);
  g.push(`<circle cx="300" cy="80" r="24" fill="${C.cream}"/><circle cx="311" cy="72" r="20" fill="${C.blue}"/>`);
  for (const [sx, sy] of [[200, 50], [400, 40], [450, 110], [540, 54], [620, 30], [720, 70], [380, 140], [250, 130]]) g.push(`<circle cx="${sx}" cy="${sy}" r="2.5" fill="${C.white}"/>`);
  // Palmiers au loin, mur de la concession
  g.push(`<g opacity=".45">${palm(330, 360, 0.9, 12)}${palm(520, 360, 0.75, -10)}</g>`);
  g.push(`<rect x="0" y="350" width="800" height="120" fill="${C.sand2}"/><rect x="0" y="342" width="800" height="10" fill="${C.wood}"/>`);
  for (let x = 20; x < 800; x += 60) g.push(`<path d="M${x} 380L${x + 12} 368L${x + 24} 380L${x + 12} 392Z" fill="${C.wood}" opacity=".35"/>`);
  // La case : murs de terre, toit conique de paille
  g.push(`<rect x="612" y="286" width="164" height="184" fill="${C.wood}"/><rect x="612" y="286" width="164" height="16" fill="${C.wood2}" opacity=".5"/>`);
  g.push(`<path d="M718 470V372Q742 348 766 372V470Z" fill="${C.wood2}"/><path d="M724 470V376Q742 358 760 376V470Z" fill="${C.dark}" opacity=".7"/>`);
  for (let i = 0; i < 4; i++) g.push(`<rect x="${622 + i * 24}" y="430" width="14" height="14" fill="${i % 2 ? C.ocre : C.cream}" opacity=".8"/>`);
  g.push(`<path d="M588 300L694 168L800 300Q694 322 588 300Z" fill="${C.ocre}"/>`);
  for (const k of [-0.6, -0.2, 0.2, 0.6]) g.push(stroke(`M694 172L${f(694 + k * 106)} ${f(306 + 8 * (1 - Math.abs(k)))}`, C.wood, 3));
  g.push(`<path d="M600 292Q694 312 788 292L800 300Q694 322 588 300Z" fill="${C.wood}"/>`);
  // Manguier et ses mangues
  g.push(`<path d="M40 470L48 250Q50 230 70 220L74 236Q62 246 64 260L72 470Z" fill="${C.wood2}"/>`);
  g.push(`<circle cx="30" cy="190" r="78" fill="${C.leaf2}"/><circle cx="120" cy="214" r="58" fill="${C.leaf2}"/><circle cx="96" cy="160" r="52" fill="${C.leaf}"/><circle cx="20" cy="262" r="46" fill="${C.leaf}"/>`);
  for (const [mx, my] of [[60, 250], [110, 262], [150, 236], [24, 300], [84, 206]]) g.push(stroke(`M${mx} ${my - 12}V${my - 6}`, C.wood2, 2), `<ellipse cx="${mx}" cy="${my}" rx="7" ry="9" fill="${C.ocre}"/>`);
  // Sol de terre battue
  g.push(`<rect y="468" width="800" height="132" fill="${C.sand}"/><rect y="468" width="800" height="132" fill="${C.rose}" opacity=".25"/>`);
  for (const [px, py, rx] of [[180, 552, 86], [410, 568, 60], [640, 562, 54]]) g.push(`<ellipse cx="${px}" cy="${py}" rx="${rx}" ry="6" fill="${C.wood}" opacity=".25"/>`);
  // Guirlandes de fanions et lampions
  const flags = [C.terra, C.ocre, C.green, C.indigo, C.white, C.red];
  const garland = (p0, p1, p2, n, k0) => {
    const o = [`<path d="M${p0.join(" ")}Q${p1.join(" ")} ${p2.join(" ")}" stroke="${C.dark}" stroke-width="2" fill="none"/>`];
    for (let i = 1; i < n; i++) {
      const [ax, ay] = qb(p0, p1, p2, (i - 0.35) / n), [bx, by] = qb(p0, p1, p2, (i + 0.35) / n);
      o.push(`<path d="M${f(ax)} ${f(ay)}L${f(bx)} ${f(by)}L${f((ax + bx) / 2)} ${f((ay + by) / 2 + 26)}Z" fill="${flags[(i + k0) % flags.length]}"/>`);
    }
    return o.join("");
  };
  g.push(garland([96, 200], [360, 300], [650, 236], 13, 0));
  g.push(garland([60, 140], [380, 240], [690, 180], 15, 3));
  const lamp = (x, y, c, len) => `<circle cx="${x}" cy="${y + len + 16}" r="34" fill="${C.yellow}" opacity=".22"/><path d="M${x} ${y}V${y + len}" stroke="${C.dark}" stroke-width="2"/><rect x="${x - 7}" y="${y + len}" width="14" height="5" fill="${C.dark}"/><ellipse cx="${x}" cy="${y + len + 18}" rx="16" ry="14" fill="${c}"/><path d="M${x - 15} ${y + len + 14}H${x + 15}M${x - 15} ${y + len + 22}H${x + 15}" stroke="rgba(0,0,0,.18)" stroke-width="2"/><rect x="${x - 6}" y="${y + len + 30}" width="12" height="4" fill="${C.dark}"/>`;
  for (const t of [0.3, 0.62, 0.88]) { const [lx, ly] = qb([60, 140], [380, 240], [690, 180], t); g.push(lamp(f(lx), f(ly), t === 0.62 ? C.terra : C.ocre, 16)); }
  // Le joueur de tam-tam en ndop, bonnet ashetu, sur un tabouret sculpté
  const dx = 150, dy = 548, ds = 1.06, dskin = SKIN.s2;
  g.push(at(dx, dy, ds, false, `<path d="M-34 -98H30L22 -78Q14 -50 22 -18L30 0H-34L-26 -18Q-18 -50 -26 -78Z" fill="${C.wood2}"/><path d="M-18 -76L-4 -52L-18 -28ZM14 -76L0 -52L14 -28Z" fill="${C.dark}" opacity=".55"/><ellipse cx="-2" cy="-98" rx="36" ry="7" fill="${C.wood}"/><rect x="-34" y="-8" width="64" height="8" rx="3" fill="${C.wood}"/>`));
  g.push(person({ x: dx, y: dy, s: ds, skin: dskin, hair: { type: "short" }, beard: true, top: NDOP, wax: "ndop", bottom: NDOP, bwax: "ndop", legs: "sit",
    hat: { type: "ashetu", color: C.red, color2: C.dark }, arms: { l: [[4, -148], [52, -120]], r: [[62, -156], [92, -122]] } }));
  g.push(at(dx, dy, ds, false, `<path d="M44 -118H100Q100 -84 82 -70Q80 -40 90 0H54Q64 -40 62 -70Q44 -84 44 -118Z" fill="${C.wood}"/><path d="M50 -96L94 -96M62 -70H82M58 -30L86 -30M56 -12H88" stroke="${C.wood2}" stroke-width="3"/><path d="M50 -96L66 -70L82 -96M60 -30L72 -70L84 -30" stroke="${C.terra}" stroke-width="2.5" fill="none"/><ellipse cx="72" cy="-118" rx="28" ry="6" fill="${C.cream}"/>` + hand(54, -122, dskin) + hand(90, -124, dskin)));
  // Notes de musique
  const note = (x, y, c) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="5.5" fill="${c}" transform="rotate(-20 ${x} ${y})"/>${stroke(`M${x + 6} ${y - 2}V${y - 30}L${x + 18} ${y - 24}`, c, 3.5)}`;
  g.push(note(262, 386, C.cream), note(296, 352, C.yellow), note(240, 330, C.cream));
  // La danseuse en kaba
  g.push(person({ x: 400, y: 564, s: 1.12, skin: SKIN.s4, hair: { type: "foulard", color: C.green, wax: "wax3" }, top: C.terra, wax: "wax1", robe: "kaba", legs: "walkskirt",
    arms: { l: [[-56, -224], [-38, -276]], r: [[60, -226], [70, -276]] } }));
  // Balafon posé au sol
  const bal = [];
  bal.push(`<path d="M476 528H588L580 540H484Z" fill="${C.wood2}"/>`);
  for (let i = 0; i < 9; i++) bal.push(`<rect x="${480 + i * 12}" y="${514 - (i % 2) * 2}" width="9" height="${16 - i * 0.6}" rx="2" fill="${C.wood}"/>`);
  bal.push(stroke("M476 516H588", C.wood2, 2));
  for (let i = 0; i < 5; i++) bal.push(`<ellipse cx="${488 + i * 22}" cy="${550 - i}" rx="${11 - i}" ry="${12 - i}" fill="${i % 2 ? C.ocre : C.wood}"/>`);
  bal.push(stroke("M480 540L474 566M584 540L590 566", C.wood2, 4));
  g.push(bal.join(""));
  // L'homme en toghu qui salue la danseuse
  g.push(person({ x: 650, y: 558, s: 1.08, skin: SKIN.s3, hair: { type: "short" }, top: C.dark, wax: "toghu", bottom: C.dark, bwax: "toghu", sleeve: "long", legs: "stand",
    hat: { type: "kufi", color: C.dark, wax: "toghu" }, arms: { l: [[-50, -150], [-26, -122]], r: [[62, -222], [58, -278]] } }));
  return frame(g.join(""), C.blue);
}

/* ---------- Scène 3 : campus universitaire ---------- */
function campus() {
  const g = [];
  g.push(`<defs><pattern id="campus-claustra" width="18" height="18" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="${C.cream}"/><circle cx="9" cy="9" r="5.5" fill="${C.wood2}" opacity=".55"/><path d="M9 1L17 9L9 17L1 9Z" fill="none" stroke="${C.sand2}" stroke-width="2"/></pattern></defs>`);
  g.push(`<circle cx="700" cy="80" r="30" fill="${C.ocre}" opacity=".7"/>`);
  // Palmiers derrière le bâtiment
  g.push(palm(660, 300, 1.05, 14), palm(150, 300, 0.95, -12));
  // Bâtiment universitaire, modernisme tropical : pilotis, brise-soleil, claustras, toit en pente
  g.push(`<rect x="120" y="200" width="560" height="206" fill="${C.white}"/>`);
  g.push(`<rect x="132" y="214" width="340" height="122" fill="${C.indigo}" opacity=".7"/>`);
  for (let x = 132; x <= 472; x += 17) g.push(`<rect x="${x}" y="212" width="7" height="126" fill="${C.cream}"/>`);
  g.push(`<rect x="126" y="270" width="352" height="6" fill="${C.cream}"/>`);
  g.push(`<rect x="486" y="212" width="184" height="126" fill="url(#campus-claustra)"/>`);
  g.push(`<rect x="120" y="338" width="560" height="12" fill="${C.sand2}"/><rect x="120" y="350" width="560" height="56" fill="${C.sand2}" opacity=".6"/>`);
  for (let x = 140; x <= 660; x += 58) g.push(`<rect x="${x}" y="350" width="9" height="56" fill="${C.white}"/>`);
  g.push(`<rect x="372" y="358" width="58" height="48" fill="${C.wood2}"/><rect x="399" y="358" width="4" height="48" fill="${C.wood}"/>`);
  // Toit en pente débordant
  g.push(`<path d="M96 206L704 172V190L96 216Z" fill="${C.terra}"/><path d="M96 216L704 190V196L96 222Z" fill="${C.wood2}" opacity=".6"/>`);
  // Pelouse, allée de terre rouge
  g.push(`<rect y="406" width="800" height="194" fill="${C.leaf}"/><path d="M330 406H470L640 600H160Z" fill="${C.sand}"/><path d="M330 406H470L640 600H160Z" fill="${C.rose}" opacity=".35"/>`);
  g.push(`<rect x="320" y="404" width="160" height="6" fill="${C.steel}"/>`);
  // Flamboyant en fleurs
  g.push(`<path d="M66 420L74 300Q60 270 40 262L46 254Q70 262 82 284Q92 262 120 254L124 262Q98 274 90 300L96 420Z" fill="${C.wood2}"/>`);
  g.push(`<ellipse cx="84" cy="248" rx="112" ry="40" fill="${C.leaf2}"/><ellipse cx="40" cy="232" rx="60" ry="30" fill="${C.leaf2}"/><ellipse cx="130" cy="228" rx="64" ry="28" fill="${C.leaf2}"/>`);
  for (let i = 0; i < 38; i++) { const a = i * 2.39, r = 14 + ((i * 37) % 90); g.push(`<circle cx="${f(84 + Math.cos(a) * r * 1.1)}" cy="${f(240 + Math.sin(a) * r * 0.32)}" r="${6 + (i % 3) * 2}" fill="${i % 4 ? C.red : C.terra}"/>`); }
  // Banc
  const bench = `<rect x="584" y="426" width="196" height="12" rx="4" fill="${C.wood}"/><rect x="584" y="442" width="196" height="12" rx="4" fill="${C.wood}"/>`;
  g.push(bench);
  // Étudiant vu de dos, au loin, qui monte vers l'entrée
  const b = { x: 446, y: 470, s: 0.66 };
  g.push(person({ ...b, view: "back", skin: SKIN.s2, hair: { type: "short" }, top: C.terra, bottom: C.indigo, legs: "walk",
    arms: { l: [[-42, -152], [-52, -116]], r: [[40, -150], [34, -110]] } }));
  g.push(at(b.x, b.y, b.s, false, `<rect x="-26" y="-204" width="52" height="78" rx="12" fill="${C.green}"/><rect x="-26" y="-204" width="52" height="26" rx="12" fill="${C.leaf2}"/><rect x="-16" y="-160" width="32" height="24" rx="5" fill="${C.leaf2}"/>${stroke("M-10 -208Q0 -218 10 -208", C.dark, 3)}`));
  // Étudiante assise sur le banc, bantu knots, portable ouvert sur les genoux
  const e = { x: 708, y: 568, s: 0.98, flip: true, skin: SKIN.s5 };
  g.push(person({ ...e, hair: { type: "bantu" }, top: C.green, wax: "kitenge", bottom: C.indigo, legs: "sit",
    arms: { l: [[-30, -146], [12, -114]], r: [[44, -148], [56, -114]] } }));
  g.push(at(e.x, e.y, e.s, e.flip, `<path d="M4 -112H64L60 -104H8Z" fill="${C.grey}"/><path d="M12 -170H58L62 -112H8Z" fill="${C.steel}"/><path d="M12 -170H58L58.5 -164H11.6Z" fill="${C.grey}"/><circle cx="35" cy="-142" r="4" fill="${C.white}" opacity=".8"/>` + hand(12, -114, e.skin) + hand(56, -114, e.skin)));
  g.push(`<rect x="584" y="470" width="196" height="10" rx="3" fill="${C.wood}"/><rect x="590" y="478" width="10" height="90" fill="${C.dark}"/><rect x="764" y="478" width="10" height="90" fill="${C.dark}"/><rect x="584" y="476" width="196" height="6" fill="${C.wood2}"/>`);
  // Étudiant en dashiki, en retrait, téléphone à la main
  const d = { x: 520, y: 520, s: 0.86, skin: SKIN.s3 };
  g.push(person({ ...d, hair: { type: "nattes" }, top: C.indigo, dashiki: C.ocre, bottom: C.wood2, legs: "walk",
    arms: { l: [[-30, -150], [-6, -176]], r: [[42, -150], [52, -114]] }, phone: { rot: 0, screen: C.sky } }));
  // Étudiante en jupe wax, tresses à perles, pile de livres contre elle
  const w = { x: 182, y: 566, s: 1.1, skin: SKIN.s3 };
  const books = (hx, hy) => [[C.indigo, 50, 12], [C.terra, 44, 11], [C.ocre, 54, 13], [C.green, 46, 11]].reduce((o, [c, bw, bh], i, arr) => {
    const y0 = hy - 30 + arr.slice(0, i).reduce((a, q) => a + q[2], 0), x0 = hx - 30 + (i % 2) * 4;
    return o + `<rect x="${x0}" y="${y0}" width="${bw}" height="${bh}" rx="2" fill="${c}"/><rect x="${x0 + bw - 6}" y="${y0 + 2}" width="3" height="${bh - 4}" fill="${C.cream}"/>`;
  }, "");
  g.push(person({ ...w, hair: { type: "boxbraids", beads: C.ocre }, top: C.white, sleeve: "short", bottom: C.terra, bwax: "wax1", legs: "walkskirt",
    arms: { l: [[-40, -148], [-2, -150]], r: [[42, -152], [54, -116]] },
    lhand: (hx, hy) => books(hx + 8, hy) + hand(hx, hy, w.skin) }));
  // Étudiant en chemise kente, sac à dos de face
  const k = { x: 356, y: 584, s: 1.16, skin: SKIN.s1 };
  g.push(at(k.x, k.y, k.s, false, `<rect x="-42" y="-206" width="84" height="96" rx="16" fill="${C.indigo}"/>${stroke("M-10 -208Q0 -222 10 -208", C.indigo, 4)}`));
  g.push(person({ ...k, hair: { type: "short" }, beard: true, top: C.ocre, wax: "kente", sleeve: "short", bottom: C.dark, legs: "walk",
    arms: { l: [[-46, -150], [-58, -114]], r: [[34, -160], [18, -176]] } }));
  g.push(at(k.x, k.y, k.s, false, `${stroke("M-18 -206L-22 -128", C.indigo, 7)}${stroke("M18 -206L22 -150", C.indigo, 7)}<rect x="-27" y="-160" width="10" height="8" rx="2" fill="${C.steel}"/><rect x="17" y="-162" width="10" height="8" rx="2" fill="${C.steel}"/>` + hand(18, -176, k.skin)));
  return frame(g.join(""), C.sky);
}

export default [
  { id: "startup", fr: "Présentation en start-up", en: "Startup pitch", tags: ["entreprise", "start-up", "présentation", "réunion", "croissance", "graphique", "ordinateur", "entrepreneure", "gele", "ndop", "dashiki", "toghu", "Yaoundé", "startup", "pitch", "meeting", "growth", "chart"], draw: startup },
  { id: "fete", fr: "Fête dans la cour", en: "Courtyard party", tags: ["fête", "musique", "tam-tam", "balafon", "danse", "kaba", "ndop", "toghu", "case", "manguier", "fanions", "lampions", "Cameroun", "party", "music", "dance", "drum", "celebration"], draw: fete },
  { id: "campus", fr: "Sur le campus", en: "On campus", tags: ["université", "campus", "étudiants", "livres", "sac à dos", "ordinateur portable", "flamboyant", "kente", "dashiki", "tresses", "university", "students", "books", "laptop", "backpack", "study"], draw: campus },
];
