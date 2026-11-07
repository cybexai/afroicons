// Scènes : le bureau, le marché, la classe.
import { readFileSync } from "node:fs";
import { C, SKIN, person, frame, plant, palm, stroke } from "./lib.mjs";
import { fileURLToPath } from "node:url";
const repo = fileURLToPath(new URL("../../", import.meta.url));

/* ---------- Aides locales ---------- */
// Tabouret sculpté des Grassfields : assise ronde, pied ajouré de triangles. Pied au sol en (x,y).
const tabouret = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 0H30L24 -10H-24Z" fill="${C.wood2}"/><rect x="-24" y="-56" width="48" height="46" fill="${C.wood}"/>`
  + [-16, 0, 16].map((k) => `<path d="M${k - 6} -16L${k} -48L${k + 6} -16Z" fill="${C.wood2}"/>`).join("")
  + `<ellipse cx="0" cy="-58" rx="36" ry="9" fill="${C.wood2}"/><ellipse cx="0" cy="-62" rx="36" ry="8" fill="${C.wood}"/>`
  + [-20, -7, 7, 20].map((k) => `<circle cx="${k}" cy="-30" r="2.6" fill="${C.ocre}"/>`).join("") + `</g>`;
// Bassine émaillée vue de face : (cx, cy) milieu du bord, w largeur.
const bassine = (cx, cy, w, col, deco = C.white) => `<path d="M${cx - w / 2} ${cy}L${cx - w * 0.36} ${cy + w * 0.34}H${cx + w * 0.36}L${cx + w / 2} ${cy}Z" fill="${col}"/>`
  + `<rect x="${cx - w / 2 - 3}" y="${cy - 4}" width="${w + 6}" height="7" rx="3.5" fill="${C.white}"/>`
  + [-0.22, 0, 0.22].map((k) => `<circle cx="${cx + k * w}" cy="${cy + w * 0.16}" r="${w * 0.06}" fill="${deco}"/><circle cx="${cx + k * w}" cy="${cy + w * 0.16}" r="${w * 0.025}" fill="${C.yellow}"/>`).join("");
// Sac de riz posé au sol : pied en (x,y).
const sac = (x, y, w = 50, h = 70, band = C.red) => `<path d="M${x - w / 2} ${y}Q${x - w / 2 - 4} ${y - h * 0.6} ${x - w * 0.4} ${y - h}Q${x} ${y - h - 8} ${x + w * 0.4} ${y - h}Q${x + w / 2 + 4} ${y - h * 0.6} ${x + w / 2} ${y}Z" fill="${C.white}"/>`
  + `<rect x="${x - w / 2 + 2}" y="${y - h * 0.62}" width="${w - 4}" height="6" fill="${band}"/><rect x="${x - w / 2 + 2}" y="${y - h * 0.48}" width="${w - 4}" height="3" fill="${C.blue}"/>`
  + `<ellipse cx="${x}" cy="${y - h * 0.28}" rx="${w * 0.2}" ry="${h * 0.08}" fill="${C.sand2}"/>`
  + stroke(`M${x - w * 0.4} ${y - h}Q${x} ${y - h + 6} ${x + w * 0.4} ${y - h}`, C.sand2, 3);
// Régime de plantains : départ de la tige en (x,y).
const plantains = (x, y, n = 5) => Array.from({ length: n }, (_, k) => stroke(`M${x - 50 + k * 9} ${y}Q${x - 36 + k * 9} ${y - 44} ${x + 4 + k * 5} ${y - 50}`, k % 2 ? C.yellow : C.leaf, 11)).join("")
  + `<rect x="${x + 2}" y="${y - 58}" width="${12 + n * 4}" height="10" rx="3" fill="${C.wood2}"/>`;

// Allège le tracé de la carte (pas de 4 unités, soit moins d'un demi-pixel à l'échelle du tableau) pour garder la scène sous 40 Ko.
const allege = (d, q = 4) => {
  const out = [];
  for (const [, cmd, args] of d.matchAll(/([MLZ])([^MLZ]*)/g)) {
    if (cmd === "Z") { out.push("Z"); continue; }
    const [x, y] = args.trim().split(/[\s,]+/).map((n) => Math.round(Number(n) / q) * q), p = `${x} ${y}`;
    if (cmd === "L" && out.at(-1)?.slice(1) === p) continue;
    out.push(cmd + p);
  }
  return out.join("");
};

/* ---------- Scène 1 : le bureau ---------- */
function bureau() {
  const g = [];
  g.push(`<rect y="468" width="800" height="132" fill="${C.sand}"/>`);
  // Fenêtre : la ville (Douala / Yaoundé), collines vertes, palmiers
  g.push(`<rect x="62" y="62" width="216" height="200" rx="10" fill="${C.indigo}"/><rect x="72" y="72" width="196" height="180" rx="4" fill="#F3D9A4"/><circle cx="226" cy="112" r="18" fill="${C.ocre}"/>`);
  g.push(`<path d="M72 176Q110 140 150 162Q190 130 230 150Q252 140 268 150V252H72Z" fill="${C.leaf}"/><path d="M72 200Q120 176 170 194Q220 176 268 190V252H72Z" fill="${C.leaf2}"/>`);
  for (const [bx, bw, bh, col] of [[78, 26, 62, C.white], [106, 30, 96, C.terra], [138, 22, 52, C.sand2], [162, 38, 120, C.white], [202, 24, 76, C.terra], [228, 30, 56, C.sand2]]) {
    g.push(`<rect x="${bx}" y="${252 - bh}" width="${bw}" height="${bh}" fill="${col}"/><rect x="${bx}" y="${252 - bh}" width="${bw}" height="5" fill="${C.wood2}" opacity=".5"/>`);
    for (let wy = 252 - bh + 12; wy < 240; wy += 15) for (let wx = bx + 5; wx < bx + bw - 6; wx += 9) g.push(`<rect x="${wx}" y="${wy}" width="4" height="6" fill="${col === C.terra ? "#F3D9A4" : C.blue}" opacity=".75"/>`);
  }
  g.push(palm(92, 252, 0.42, 6), palm(150, 252, 0.34, -6), palm(252, 252, 0.4, -4));
  g.push(`<rect x="62" y="156" width="216" height="8" fill="${C.indigo}"/><rect x="166" y="62" width="8" height="200" fill="${C.indigo}"/>`);
  // Pagne encadré (ndop) au mur
  g.push(`<rect x="470" y="58" width="150" height="116" rx="4" fill="${C.wood2}"/><rect x="480" y="68" width="130" height="96" fill="url(#ndop)"/>`);
  // Étagères : tam-tam, livres, masque, calebasse
  g.push(`<rect x="652" y="196" width="118" height="10" rx="3" fill="${C.wood2}"/><rect x="652" y="300" width="118" height="10" rx="3" fill="${C.wood2}"/>`);
  g.push(`<path d="M662 132H704L698 160L692 196H674L668 160Z" fill="${C.wood}"/><ellipse cx="683" cy="132" rx="21" ry="6" fill="${C.sand}"/>`, stroke("M664 140L700 152M664 152L700 140", C.wood2, 2.5), `<rect x="670" y="160" width="26" height="6" fill="${C.terra}"/>`);
  g.push(`<rect x="714" y="146" width="11" height="50" fill="${C.terra}"/><rect x="727" y="140" width="9" height="56" fill="${C.ocre}"/><rect x="738" y="150" width="13" height="46" fill="${C.green}"/><rect x="753" y="136" width="8" height="60" fill="${C.indigo}"/>`);
  g.push(`<g transform="translate(682 300)"><path d="M0 -84Q20 -84 20 -52Q20 -14 0 0Q-20 -14 -20 -52Q-20 -84 0 -84Z" fill="${C.wood}"/><path d="M-12 -54H-4M4 -54H12M0 -40V-26" stroke="${C.wood2}" stroke-width="4" stroke-linecap="round"/><path d="M-14 -70H14" stroke="${C.white}" stroke-width="3" stroke-dasharray="3 4"/></g>`);
  g.push(`<path d="M736 300Q722 300 722 284Q722 262 744 260Q766 262 766 284Q766 300 752 300Z" fill="${C.ocre}"/><path d="M740 260Q744 246 752 250" stroke="${C.wood2}" stroke-width="4" fill="none" stroke-linecap="round"/>`, stroke("M726 282Q744 290 762 282", C.wood2, 2.5));
  // Tabouret sculpté et plante
  g.push(tabouret(78, 572, 1.05), plant(78, 500, 1));
  // Bureau
  g.push(`<rect x="300" y="404" width="440" height="14" rx="4" fill="${C.wood}"/><rect x="316" y="418" width="12" height="130" fill="${C.wood2}"/><rect x="712" y="418" width="12" height="130" fill="${C.wood2}"/>`);
  // Écran
  g.push(`<rect x="372" y="200" width="270" height="182" rx="10" fill="${C.dark}"/><rect x="382" y="210" width="250" height="160" rx="4" fill="${C.white}"/><rect x="496" y="382" width="22" height="16" fill="${C.dark}"/><rect x="470" y="396" width="74" height="9" rx="4" fill="${C.dark}"/>`);
  g.push(`<rect x="382" y="210" width="250" height="20" fill="${C.sand}"/><circle cx="394" cy="220" r="4" fill="${C.terra}"/><rect x="404" y="217" width="50" height="6" rx="3" fill="${C.sand2}"/>`);
  const card = (cx, cy, col, shape) => `<rect x="${cx}" y="${cy}" width="70" height="60" rx="6" fill="${C.cream}"/><g transform="translate(${cx + 35} ${cy + 26})">${shape(col)}</g><rect x="${cx + 12}" y="${cy + 46}" width="46" height="5" rx="2.5" fill="${C.sand2}"/>`;
  g.push(card(392, 240, C.terra, (c) => `<path d="M0 -16Q12 -16 12 -2Q12 12 0 18Q-12 12 -12 -2Q-12 -16 0 -16Z" fill="${c}"/>`));
  g.push(card(472, 240, C.green, (c) => `<path d="M-14 0Q-14 -16 0 -16Q14 -16 14 0Z" fill="${c}"/><rect x="-3" y="0" width="6" height="16" fill="${C.wood2}"/>`));
  g.push(card(552, 240, C.ocre, (c) => `<circle r="14" fill="${c}"/><circle r="6" fill="${C.cream}"/>`));
  g.push(`<rect x="392" y="310" width="150" height="50" rx="6" fill="url(#kente)" opacity=".9"/><rect x="552" y="310" width="70" height="50" rx="6" fill="${C.cream}"/><rect x="562" y="322" width="50" height="5" rx="2.5" fill="${C.sand2}"/><rect x="562" y="334" width="36" height="5" rx="2.5" fill="${C.sand2}"/>`);
  // Tasse, plante
  g.push(`<rect x="666" y="376" width="24" height="28" rx="4" fill="${C.terra}"/><rect x="666" y="384" width="24" height="6" fill="url(#wax2)"/><path d="M690 382Q700 384 698 392Q696 398 690 398" stroke="${C.terra}" stroke-width="4" fill="none"/>`);
  g.push(plant(334, 378, 0.8));
  // Bulle : une idée
  g.push(`<circle cx="372" cy="128" r="62" fill="${C.green}" opacity=".12"/><circle cx="372" cy="128" r="44" fill="${C.green}" opacity=".22"/><circle cx="372" cy="128" r="30" fill="${C.green}"/>`);
  g.push(`<path d="M372 110Q384 110 384 122Q384 130 377 136V140H367V136Q360 130 360 122Q360 110 372 110Z" fill="${C.ocre}"/><rect x="367" y="142" width="10" height="5" rx="2" fill="${C.cream}"/>`);
  g.push(stroke("M352 106L346 100M392 106L398 100M372 98V90", C.cream, 3));
  // Femme debout en kaba ngondo et gele, désigne l'écran
  g.push(person({ x: 236, y: 560, s: 1.16, skin: SKIN.s3, hair: { type: "gele", color: C.green, wax: "wax3" }, top: C.terra, wax: "wax1", robe: "kaba", legs: "skirt",
    arms: { r: [[78, -196], [118, -214]], l: [[-38, -150], [-30, -110]] }, point: [150, -230] }));
  // Homme assis de dos : nattes collées, chemise en toghu
  g.push(person({ x: 540, y: 610, s: 1.12, skin: SKIN.s2, hair: { type: "nattes" }, top: C.dark, wax: "toghu", view: "back", legs: "none",
    arms: { l: [[-46, -150], [-30, -126]], r: [[44, -150], [36, -126]] } }));
  g.push(`<rect x="478" y="470" width="124" height="120" rx="18" fill="${C.indigo}"/><rect x="490" y="590" width="100" height="10" fill="${C.indigo}"/>`);
  return frame(g.join(""));
}

/* ---------- Scène 2 : le marché, paiement par téléphone ---------- */
function marche() {
  const g = [];
  g.push(`<rect y="470" width="800" height="130" fill="${C.sand2}"/>`);
  // Au fond : échoppes peintes, toits de tôle, parasols, passants
  const shops = [[20, 130, C.green, C.sand], [150, 120, C.sand, C.ocre], [470, 130, C.blue, C.sand], [600, 180, C.sand, C.terra]];
  for (const [sx, sw, wall, trim] of shops) {
    g.push(`<rect x="${sx}" y="300" width="${sw}" height="170" fill="${wall}" opacity=".55"/><rect x="${sx}" y="300" width="${sw}" height="14" fill="${trim}" opacity=".7"/>`);
    g.push(`<path d="M${sx - 10} 300L${sx + 6} 278H${sx + sw - 6}L${sx + sw + 10} 300Z" fill="${C.steel}"/>`, stroke(`M${sx + 6} 300V470`, C.wood2, 4, ' opacity=".5"'));
    g.push(`<rect x="${sx + 16}" y="340" width="${sw - 32}" height="44" rx="3" fill="${C.wood2}" opacity=".35"/>`);
  }
  // Petits parasols au loin
  const para = (cx, cy, r, c1, c2) => `<rect x="${cx - 2}" y="${cy}" width="4" height="${470 - cy}" fill="${C.wood2}"/><path d="M${cx - r} ${cy + 10}Q${cx} ${cy - r * 0.7} ${cx + r} ${cy + 10}Z" fill="${c1}"/><path d="M${cx - r * 0.33} ${cy + 10}Q${cx} ${cy - r * 0.75} ${cx + r * 0.33} ${cy + 10}Z" fill="${c2}"/>`;
  g.push(para(90, 240, 64, C.ocre, C.green), para(700, 250, 70, C.green, C.ocre));
  // Passants : une femme porte une bassine sur la tête, un homme en dashiki
  g.push(person({ x: 96, y: 474, s: 0.56, skin: SKIN.s4, hair: { type: "foulard", color: C.indigo }, top: C.ocre, wax: "wax2", bottom: C.green, bwax: "wax3", legs: "walkskirt",
    arms: { r: [[34, -224], [22, -280]] } }));
  g.push(bassine(108, 316, 56, C.terra), `<circle cx="108.3" cy="317.2" r="4.2" fill="${SKIN.s4}"/>`);
  g.push(person({ x: 720, y: 474, s: 0.56, skin: SKIN.s2, hair: { type: "rase" }, top: C.white, dashiki: true, bottom: C.wood2, legs: "walk", flip: true }));
  // Sacs de riz au sol
  g.push(sac(126, 516, 52, 74, C.red), sac(170, 520, 48, 66, C.green));
  // Parasol rayé
  g.push(`<rect x="396" y="120" width="8" height="300" fill="${C.wood2}"/>`);
  g.push(`<path d="M170 196Q400 40 630 196Z" fill="${C.terra}"/>`);
  for (const [a, b] of [[170, 247], [323, 400], [477, 554]]) g.push(`<path d="M400 92L${a} 196Q${(a + b) / 2} 184 ${b} 196Z" fill="${C.cream}"/>`);
  g.push(`<path d="M170 196Q209 214 247 196Q285 214 323 196Q361 214 400 196Q439 214 477 196Q515 214 554 196Q592 214 630 196" fill="${C.terra}"/><circle cx="400" cy="92" r="7" fill="${C.wood2}"/>`);
  // Vendeuse derrière l'étal, en kaba et gele, téléphone à la main
  g.push(person({ x: 300, y: 520, s: 1.12, skin: SKIN.s2, hair: { type: "gele", color: C.green, wax: "wax2" }, top: C.terra, wax: "wax1", robe: "kaba", legs: "none",
    arms: { l: [[-46, -160], [-22, -196]], r: [[44, -152], [56, -116]] }, phone: { rot: 8, screen: C.ocre } }));
  // Étal, couvert d'un pagne
  g.push(`<rect x="170" y="392" width="300" height="16" rx="4" fill="${C.wood}"/><rect x="180" y="408" width="280" height="62" fill="${C.indigo}"/><rect x="180" y="408" width="280" height="62" fill="url(#wax2)"/><rect x="190" y="470" width="12" height="40" fill="${C.wood2}"/><rect x="438" y="470" width="12" height="40" fill="${C.wood2}"/>`);
  // Tomates en pyramide
  for (const [cx, cy] of [[194, 380], [216, 380], [238, 380], [205, 362], [227, 362], [216, 344]]) g.push(`<circle cx="${cx}" cy="${cy}" r="11" fill="${C.red}"/><path d="M${cx - 3} ${cy - 10}L${cx} ${cy - 13}L${cx + 3} ${cy - 10}" stroke="${C.leaf2}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`);
  // Bassine émaillée de safous
  for (const [cx, cy] of [[262, 360], [276, 356], [290, 360], [268, 348], [284, 347], [276, 340]]) g.push(`<ellipse cx="${cx}" cy="${cy}" rx="7" ry="10" fill="${C.indigo}"/><ellipse cx="${cx - 2}" cy="${cy - 4}" rx="2" ry="3" fill="${C.blue}"/>`);
  g.push(bassine(276, 362, 52, C.green));
  // Plantains
  g.push(plantains(350, 390, 5));
  // Bassine émaillée de piments
  for (const [cx, cy, c] of [[386, 356, C.red], [400, 350, C.leaf2], [414, 354, C.red], [428, 350, C.yellow], [442, 356, C.red], [406, 342, C.yellow], [424, 340, C.red], [394, 344, C.leaf]]) g.push(`<ellipse cx="${cx}" cy="${cy}" rx="8" ry="5" fill="${c}" transform="rotate(${(cx * 7) % 50 - 25} ${cx} ${cy})"/>`);
  g.push(bassine(414, 362, 68, C.blue, C.red));
  // Cliente : tresses longues à perles, pagne, panier et téléphone
  g.push(person({ x: 590, y: 548, s: 1.18, skin: SKIN.s4, hair: { type: "boxbraids", beads: C.ocre }, top: C.indigo, bottom: C.green, bwax: "kitenge", legs: "skirt", sleeve: "short",
    arms: { l: [[-50, -168], [-30, -204]], r: [[42, -150], [44, -112]] }, phone: { rot: -12, screen: C.ocre }, flip: true,
    rhand: (hx, hy) => `<path d="M${hx - 26} ${hy + 4}H${hx + 26}L${hx + 20} ${hy + 44}H${hx - 20}Z" fill="${C.wood}"/><path d="M${hx - 22} ${hy + 14}H${hx + 22}M${hx - 21} ${hy + 26}H${hx + 21}" stroke="${C.wood2}" stroke-width="3"/><path d="M${hx - 18} ${hy + 4}Q${hx} ${hy - 26} ${hx + 18} ${hy + 4}" stroke="${C.wood2}" stroke-width="4" fill="none"/><circle cx="${hx - 8}" cy="${hy}" r="9" fill="${C.red}"/><path d="M${hx + 4} ${hy + 2}Q${hx + 10} ${hy - 18} ${hx + 22} ${hy - 16}" stroke="${C.leaf}" stroke-width="7" stroke-linecap="round" fill="none"/><circle cx="${hx}" cy="${hy}" r="7.5" fill="${SKIN.s4}"/>` }));
  // Paiement : bulle validée entre les deux téléphones
  g.push(`<path d="M380 250Q470 196 560 250" stroke="${C.indigo}" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round" fill="none"/>`);
  g.push(`<circle cx="470" cy="222" r="40" fill="${C.green}" opacity=".18"/><circle cx="470" cy="222" r="27" fill="${C.green}"/>`, stroke("M458 222L467 231L483 213", C.white, 6));
  return frame(g.join(""), "#F4E3C3");
}

/* ---------- Scène 3 : la classe ---------- */
function classe() {
  const g = [];
  const carte = JSON.parse(readFileSync(repo + "apps/web/src/data/carte-afrique.json", "utf8"));
  g.push(`<rect y="440" width="800" height="160" fill="${C.sand2}"/><rect y="430" width="800" height="12" fill="${C.wood2}"/>`);
  // Frise au mur : triangles et losanges
  g.push(`<rect y="30" width="800" height="24" fill="${C.wood2}"/>`);
  for (let k = 0; k < 34; k++) g.push(`<path d="M${k * 24} 54L${k * 24 + 12} 32L${k * 24 + 24} 54Z" fill="${[C.terra, C.ocre, C.green][k % 3]}"/>`);
  // Tableau
  g.push(`<rect x="230" y="70" width="400" height="230" rx="8" fill="${C.wood}"/><rect x="242" y="82" width="376" height="206" rx="4" fill="#2F5A45"/><rect x="300" y="296" width="260" height="8" rx="3" fill="${C.wood2}"/><rect x="520" y="290" width="20" height="7" rx="2" fill="${C.white}"/>`);
  const chalk = "rgba(255,253,248,.85)";
  g.push(stroke("M274 160L290 122L306 160M282 146H298", chalk, 4), stroke("M324 122V160M324 122Q346 122 346 132Q346 141 324 141Q350 141 350 151Q350 160 324 160", chalk, 4), stroke("M392 126Q372 120 370 141Q372 162 392 156", chalk, 4));
  g.push(stroke("M266 190L274 184V214M288 200H314M301 187V213M330 190L338 184V214M356 196H384M356 207H384M402 188Q420 180 424 192Q424 202 402 214H428", chalk, 4));
  g.push(`<g transform="translate(476 100) scale(0.18)"><path d="${allege(carte.countries.map((c) => c.d).join(""))}" fill="${C.ocre}" fill-rule="evenodd" opacity=".9"/></g>`);
  g.push(`<circle cx="554" cy="158" r="7" fill="${C.terra}"/>`);
  // Fenêtre sur la cour : manguier, terre rouge, bâtiment de l'école
  g.push(`<rect x="652" y="74" width="122" height="170" rx="8" fill="${C.white}"/><rect x="662" y="84" width="102" height="150" rx="3" fill="${C.sky}"/>`);
  g.push(`<rect x="662" y="192" width="102" height="42" fill="${C.rose}"/><rect x="730" y="164" width="34" height="30" fill="${C.sand}"/><path d="M726 166L746 152L768 166Z" fill="${C.grey}"/>`);
  g.push(`<rect x="690" y="150" width="10" height="56" fill="${C.wood2}"/><circle cx="680" cy="132" r="22" fill="${C.leaf2}"/><circle cx="706" cy="122" r="26" fill="${C.leaf2}"/><circle cx="696" cy="146" r="22" fill="${C.leaf}"/><circle cx="720" cy="142" r="16" fill="${C.leaf}"/>`);
  for (const [mx, my] of [[684, 140], [704, 150], [716, 128], [692, 118], [724, 146]]) g.push(`<ellipse cx="${mx}" cy="${my}" rx="4" ry="5.5" fill="${C.ocre}"/>`);
  g.push(`<rect x="709" y="84" width="8" height="150" fill="${C.white}"/>`);
  // Affiche des fruits du pays (mangue, ananas, banane), bordure en ndop
  g.push(`<rect x="652" y="268" width="122" height="136" rx="6" fill="url(#ndop)"/><rect x="662" y="278" width="102" height="116" rx="3" fill="${C.cream}"/>`);
  g.push(`<ellipse cx="688" cy="312" rx="14" ry="18" fill="${C.ocre}" transform="rotate(-20 688 312)"/><path d="M692 294Q702 284 712 290Q702 298 692 294Z" fill="${C.leaf}"/>`);
  g.push(`<path d="M740 300L730 284M740 300L740 280M740 300L750 284" stroke="${C.leaf2}" stroke-width="5" stroke-linecap="round"/><ellipse cx="740" cy="318" rx="13" ry="18" fill="${C.yellow}"/>`, stroke("M730 308L750 328M730 328L750 308M728 318H752", C.wood, 2));
  g.push(stroke("M680 352Q712 380 748 350", C.yellow, 11), `<rect x="744" y="344" width="8" height="8" rx="2" fill="${C.wood2}"/>`);
  g.push(`<rect x="676" y="372" width="74" height="6" rx="3" fill="${C.sand2}"/>`);
  // Affiche à gauche : tam-tam et calebasse, bordure en kente
  g.push(`<rect x="34" y="96" width="112" height="140" rx="6" fill="url(#kente)"/><rect x="44" y="106" width="92" height="120" rx="3" fill="${C.cream}"/>`);
  g.push(`<path d="M56 130H88L84 152L80 186H64L60 152Z" fill="${C.wood}"/><ellipse cx="72" cy="130" rx="16" ry="5" fill="${C.sand}"/>`, stroke("M58 138L86 148M58 148L86 138", C.wood2, 2));
  g.push(`<path d="M106 186Q94 186 94 172Q94 152 112 150Q130 152 130 172Q130 186 118 186Z" fill="${C.ocre}"/>`, stroke("M108 150Q110 140 118 142", C.wood2, 3));
  g.push(`<rect x="54" y="200" width="72" height="7" rx="3.5" fill="${C.sand2}"/><rect x="54" y="212" width="46" height="7" rx="3.5" fill="${C.sand2}"/>`);
  // Enseignant en chemise de ndop et kufi, règle vers le tableau
  g.push(person({ x: 186, y: 470, s: 1.08, skin: SKIN.s3, hair: { type: "short" }, beard: true, top: C.indigo, wax: "ndop", bottom: C.dark, hat: { type: "kufi", color: C.indigo, wax: "ndop" },
    arms: { r: [[74, -206], [110, -236]], l: [[-40, -150], [-34, -112]] },
    rhand: (hx, hy) => stroke(`M${hx - 4} ${hy + 4}L${hx + 78} ${hy - 38}`, C.wood2, 5) + `<circle cx="${hx}" cy="${hy}" r="7.5" fill="${SKIN.s3}"/>` }));
  // Bancs et élèves de dos, en uniforme
  const pupil = (x, o) => person({ x, y: 600, s: 0.9, view: "back", legs: "none", top: C.blue, ...o });
  g.push(pupil(296, { skin: SKIN.s3, hair: { type: "nattes" } }));
  g.push(pupil(410, { skin: SKIN.s2, hair: { type: "rase" }, arms: { r: [[46, -230], [52, -290]] } }));
  g.push(pupil(528, { skin: SKIN.s4, hair: { type: "boxbraids", beads: C.ocre } }));
  g.push(pupil(646, { skin: SKIN.s1, hair: { type: "bantu" } }));
  g.push(`<rect x="230" y="500" width="480" height="22" rx="5" fill="${C.wood}"/><rect x="242" y="522" width="456" height="78" fill="${C.wood2}"/>`);
  g.push(`<rect x="266" y="486" width="46" height="14" rx="2" fill="${C.terra}"/><rect x="272" y="480" width="40" height="8" rx="2" fill="${C.ocre}"/><rect x="600" y="490" width="60" height="10" rx="2" fill="${C.white}"/><rect x="456" y="494" width="44" height="6" rx="3" fill="${C.ocre}" transform="rotate(-8 478 497)"/>`);
  return frame(g.join(""), "#EFE3CF");
}


export default [
  { id: "bureau", fr: "Au bureau", en: "At the office", tags: ["travail", "réunion", "écran", "ordinateur", "équipe", "kaba", "gele", "toghu", "nattes", "Douala", "work", "meeting", "team", "braids"], draw: bureau },
  { id: "marche", fr: "Paiement au marché", en: "Paying at the market", tags: ["marché", "vendeuse", "mobile money", "téléphone", "paiement", "plantain", "safou", "kaba", "gele", "tresses", "market", "phone", "payment", "braids"], draw: marche },
  { id: "classe", fr: "En classe", en: "In class", tags: ["école", "enseignant", "élèves", "tableau", "éducation", "carte de l'Afrique", "ndop", "nattes", "uniforme", "manguier", "school", "teacher", "pupils", "education", "braids"], draw: classe },
];
