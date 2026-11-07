// Scènes : le kiosque de transfert d'argent, la gare routière, l'appel vidéo avec la famille.
import { C, SKIN, person, frame, palm, plant, cloud, bubble, stroke, f } from "./lib.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="7.5" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
/** Aplat avec un motif par-dessus. */
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");
/** Pièce de monnaie (centre x,y, rayon r). */
const coin = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.ocre}"/><circle cx="${x}" cy="${y}" r="${f(r * 0.72)}" fill="none" stroke="${C.white}" stroke-width="${f(r * 0.12)}" opacity=".8"/>` + stroke(`M${x} ${f(y - r * 0.4)}V${f(y + r * 0.4)}`, C.white, f(r * 0.16));
/** Téléphone posé ou tenu (centre x,y, rotation). */
const phoneAt = (x, y, rot = 0, s = 1, screen = C.sky) => `<g transform="translate(${f(x)} ${f(y)}) rotate(${rot}) scale(${s})"><rect x="-7" y="-12" width="14" height="24" rx="3" fill="${C.dark}"/><rect x="-5" y="-9.5" width="10" height="17" rx="1.2" fill="${screen}"/></g>`;

/* ---------- Scène 1 : le kiosque de transfert d'argent ---------- */
function transfert() {
  const g = [];
  // Rue : façades au fond, trottoir de terre rouge
  g.push(rect(0, 230, 800, 240, C.sand), rect(0, 230, 800, 14, C.sand2));
  g.push(rect(520, 120, 250, 350, "#F1DFC6"), rect(520, 120, 250, 16, C.sand2), rect(560, 170, 60, 70, C.sky), rect(660, 170, 60, 70, C.sky), stroke("M590 170V240M690 170V240", C.wood2, 3));
  g.push(rect(556, 240, 68, 8, C.wood2), rect(656, 240, 68, 8, C.wood2));
  g.push(palm(40, 470, 1.05, 14), cloud(90, 70, 0.9), cloud(690, 70, 0.7));
  g.push(rect(0, 470, 800, 130, C.sand2), `<path d="M0 470H800V484H0Z" fill="${C.terra}" opacity=".25"/>`);
  // Le kiosque peint : toit de tôle rayé, bandeau de pictogrammes
  g.push(`<path d="M128 150L158 112H442L472 150Z" fill="${C.terra}"/>`);
  for (let i = 0; i < 6; i++) g.push(`<path d="M${f(160 + i * 50)} 112H${f(185 + i * 50)}L${f(176 + i * 56)} 150H${f(150 + i * 56)}Z" fill="${C.white}" opacity=".85"/>`);
  g.push(rect(126, 148, 348, 8, C.wood2, ' rx="3"'));
  g.push(rect(150, 156, 300, 314, C.green), rect(150, 156, 300, 40, C.ocre));
  // Pictogrammes du bandeau (sans texte) : téléphone, flèches, pièce
  g.push(phoneAt(232, 176, 0, 1.1, C.white), stroke("M256 170H290M282 163L290 170L282 177", C.green, 4), stroke("M290 184H256M264 177L256 184L264 191", C.terra, 4), coin(316, 176, 13), stroke("M344 176H392", C.white, 6), stroke("M350 186H382", C.white, 4, ' opacity=".6"'));
  // La fenêtre du guichet, l'intérieur
  g.push(rect(178, 210, 244, 146, C.wood2), rect(178, 210, 244, 146, C.dark, ' opacity=".25"'));
  g.push(rect(190, 224, 60, 70, C.cream, ' rx="3"'), coin(210, 246, 9), stroke("M224 246H240M200 266H240M200 278H232", C.indigo, 3));
  g.push(rect(354, 228, 56, 6, C.wood), ...[0, 1, 2, 3].map((i) => rect(358 + i * 13, 206 + 6, 10, 16, [C.terra, C.ocre, C.green, C.blue][i], ' rx="1.5"')));
  g.push(rect(354, 262, 56, 6, C.wood), ...[0, 1, 2].map((i) => rect(360 + i * 16, 240, 12, 22, [C.yellow, C.terra, C.white][i], ' rx="2"')));
  // L'agent derrière le comptoir, téléphone en main
  g.push(person({ x: 300, y: 468, s: 0.98, legs: "none", skin: SKIN.s2, hair: { type: "bantu" }, top: C.terra, wax: "wax1", sleeve: "short", face: "talk",
    phone: { rot: 8, screen: C.green }, arms: { l: [[-46, -170], [-26, -212]], r: [[44, -150], [60, -118]] } }));
  // Comptoir peint, rayures
  g.push(rect(140, 356, 320, 12, C.wood, ' rx="3"'), rect(150, 368, 300, 102, C.ocre));
  for (let i = 0; i < 6; i++) g.push(`<path d="M${150 + i * 50} 368H${175 + i * 50}L${150 + i * 50} 393Z" fill="${C.terra}"/>`);
  g.push(rect(150, 440, 300, 10, C.green), rect(150, 456, 300, 6, C.indigo));
  g.push(`<circle cx="300" cy="405" r="22" fill="${C.white}"/>`, phoneAt(292, 405, 0, 1, C.green), stroke("M300 398H312M308 394L312 398L308 402", C.terra, 2.5), coin(312, 414, 6));
  // Sur le comptoir : registre ouvert, caisse
  g.push(`<path d="M170 356L182 344H232L238 356Z" fill="${C.white}"/>`, stroke("M204 344V356", C.sand2, 2), stroke("M188 350H200M210 350H226", C.grey, 1.6));
  g.push(rect(380, 338, 50, 18, C.indigo, ' rx="3"'), rect(392, 334, 26, 6, C.steel, ' rx="2"'));
  // Main gauche de l'agent posée sur le comptoir (par-dessus le bord)
  g.push(at(300, 468, 0.98, false, hand(60, -118, SKIN.s2)));
  // La cliente aux tresses montre son téléphone
  g.push(person({ x: 530, y: 572, s: 1.08, flip: true, skin: SKIN.s4, hair: { type: "boxbraids", beads: C.ocre }, top: C.indigo, wax: "wax2", sleeve: "short", bottom: C.green, bwax: "kitenge", legs: "skirt", face: "smile",
    arms: { r: [[52, -176], [80, -206]], l: [[-40, -150], [-34, -110]] },
    rhand: (hx, hy) => `<g transform="translate(${hx} ${hy - 12}) rotate(-12)"><rect x="-8" y="-14" width="16" height="27" rx="3" fill="${C.dark}"/><rect x="-6" y="-11" width="12" height="20" rx="1.2" fill="${C.green}"/>${coin(0, -1, 4)}</g>` + hand(hx, hy, SKIN.s4) }));
  // Le monsieur en boubou, au téléphone
  g.push(person({ x: 680, y: 584, s: 1.1, flip: true, skin: SKIN.s1, hair: { type: "short" }, beard: true, hat: { type: "kufi", color: C.ocre, wax: "wax3" }, robe: "boubou", top: C.white, face: "talk",
    phone: { rot: 14 }, arms: { l: [[-44, -186], [-24, -228]], r: [[40, -150], [40, -110]] } }));
  // Le jeune qui arrive, billets à la main
  g.push(person({ x: 100, y: 578, s: 1.04, skin: SKIN.s5, hair: { type: "afro" }, top: C.green, dashiki: true, sleeve: "short", bottom: C.indigo, legs: "walk", face: "smile",
    arms: { r: [[46, -150], [72, -128]], l: [[-40, -150], [-34, -110]] },
    rhand: (hx, hy) => `<g transform="translate(${hx} ${hy - 6}) rotate(-18)"><rect x="-4" y="-12" width="26" height="14" rx="2" fill="${C.leaf}"/><rect x="0" y="-16" width="26" height="14" rx="2" fill="${C.leaf2}"/><circle cx="13" cy="-9" r="3.5" fill="${C.leaf}"/></g>` + hand(hx, hy, SKIN.s5) }));
  // Bulle : l'argent part et arrive
  const arrows = stroke("M-15 -6Q0 -20 15 -6", C.white, 4) + `<path d="M17 -12L17 -1L8 -5Z" fill="${C.white}"/>` + stroke("M15 8Q0 22 -15 8", C.white, 4) + `<path d="M-17 14L-17 3L-8 7Z" fill="${C.white}"/>` + `<circle r="7" fill="${C.ocre}"/>`;
  g.push(bubble(560, 74, arrows, C.terra));
  g.push(`<circle cx="530" cy="150" r="5" fill="${C.terra}" opacity=".5"/><circle cx="512" cy="172" r="3.5" fill="${C.terra}" opacity=".4"/>`);
  return frame(g.join(""), C.cream);
}

/* ---------- Scène 2 : la gare routière ---------- */
function gare() {
  const g = [];
  g.push(cloud(80, 70, 0.9), cloud(470, 52, 0.8), cloud(700, 96, 0.6));
  // Collines et manguier au fond
  g.push(`<path d="M0 300Q160 230 330 280T640 260T800 270V450H0Z" fill="${C.leaf}" opacity=".35"/>`);
  g.push(rect(0, 440, 800, 160, C.sand2), `<path d="M0 440H800V452H0Z" fill="${C.terra}" opacity=".3"/>`);
  // Le guichet, à gauche
  g.push(`<path d="M18 198L40 170H240L262 198Z" fill="${C.indigo}"/>`, rect(16, 196, 248, 8, C.wood2, ' rx="3"'));
  g.push(rect(34, 204, 212, 240, C.terra), rect(34, 204, 212, 30, C.ocre));
  g.push(`<rect x="110" y="208" width="60" height="22" rx="5" fill="${C.white}"/><rect x="116" y="212" width="10" height="7" fill="${C.indigo}"/><rect x="130" y="212" width="10" height="7" fill="${C.indigo}"/><rect x="144" y="212" width="10" height="7" fill="${C.indigo}"/><circle cx="122" cy="230" r="4.5" fill="${C.dark}"/><circle cx="158" cy="230" r="4.5" fill="${C.dark}"/>`, stroke("M60 219H96M184 219H220", C.terra, 4));
  g.push(rect(56, 250, 168, 100, C.wood2));
  g.push(rect(150, 260, 64, 60, C.cream, ' rx="3"'), stroke("M158 274H206M158 288H200M158 302H206", C.indigo, 3), `<path d="M164 316l8 -8 8 8z" fill="${C.green}"/>`);
  g.push(person({ x: 104, y: 438, s: 0.72, legs: "none", skin: SKIN.s3, hair: { type: "nattes" }, top: C.green, wax: "kitenge", sleeve: "short", face: "smile",
    arms: { l: [[-40, -150], [-30, -110]], r: [[46, -160], [66, -126]] } }));
  g.push(rect(46, 346, 188, 10, C.wood, ' rx="3"'), rect(46, 356, 188, 88, C.ocre), rect(46, 400, 188, 8, C.green));
  g.push(at(104, 438, 0.72, false, `<rect x="54" y="-136" width="30" height="18" rx="2" fill="${C.white}"/>` + hand(66, -126, SKIN.s3)));
  // Le car interurbain : bagages sur le toit
  const bx = 300, by = 216, bw = 450, bh = 222;
  g.push(stroke(`M${bx + 30} ${by - 4}H${bx + bw - 60}`, C.dark, 4), stroke(`M${bx + 30} ${by - 4}V${by + 4}M${bx + bw - 60} ${by - 4}V${by + 4}`, C.dark, 4));
  const bags = [
    [bx + 40, 66, 34, C.indigo, "ndop"], [bx + 110, 52, 46, C.terra, null], [bx + 166, 80, 30, C.ocre, "wax1"], [bx + 252, 60, 40, C.green, null], [bx + 318, 50, 28, C.blue, "wax2"],
  ];
  for (const [x, w, h, col, pat] of bags) g.push(cloth(`M${x} ${by - 6}V${by - 6 - h + 6}Q${x} ${by - 6 - h} ${x + 6} ${by - 6 - h}H${x + w - 6}Q${x + w} ${by - 6 - h} ${x + w} ${by - 6 - h + 6}V${by - 6}Z`, col, pat));
  g.push(rect(bx + 124, by - 62, 18, 8, C.dark, ' rx="3"'));
  // Bassines empilées et sac de jute
  g.push(`<path d="M${bx + 214} ${by - 6}L${bx + 210} ${by - 30}H${bx + 254}L${bx + 250} ${by - 6}Z" fill="${C.red}"/><ellipse cx="${bx + 232}" cy="${by - 30}" rx="24" ry="5" fill="${C.red}"/><path d="M${bx + 216} ${by - 34}L${bx + 213} ${by - 52}H${bx + 251}L${bx + 248} ${by - 34}Z" fill="${C.yellow}"/><ellipse cx="${bx + 232}" cy="${by - 52}" rx="20" ry="4.5" fill="${C.yellow}"/>`);
  g.push(`<path d="M${bx + 374} ${by - 6}Q${bx + 368} ${by - 46} ${bx + 384} ${by - 56}Q${bx + 404} ${by - 62} ${bx + 412} ${by - 40}L${bx + 414} ${by - 6}Z" fill="${C.sand}"/>`, stroke(`M${bx + 382} ${by - 54}Q${bx + 392} ${by - 46} ${bx + 404} ${by - 56}`, C.wood2, 3));
  g.push(stroke(`M${bx + 36} ${by - 40}L${bx + 160} ${by - 30}L${bx + 260} ${by - 44}L${bx + 340} ${by - 34}`, C.wood, 3));
  // Caisse du car
  g.push(`<path d="M${bx} ${by + 20}Q${bx} ${by} ${bx + 20} ${by}H${bx + bw - 40}Q${bx + bw - 6} ${by} ${bx + bw} ${by + 40}V${by + bh - 20}Q${bx + bw} ${by + bh} ${bx + bw - 20} ${by + bh}H${bx + 20}Q${bx} ${by + bh} ${bx} ${by + bh - 20}Z" fill="${C.white}"/>`);
  g.push(rect(bx, by + 128, bw, 30, C.green), rect(bx, by + 158, bw, 14, C.ocre), rect(bx, by + 172, bw, 50, C.terra, ' rx="0"'));
  g.push(`<path d="M${bx} ${by + 172}H${bx + bw}V${by + bh - 20}Q${bx + bw} ${by + bh} ${bx + bw - 20} ${by + bh}H${bx + 20}Q${bx} ${by + bh} ${bx} ${by + bh - 20}Z" fill="${C.terra}"/>`);
  for (let i = 0; i < 9; i++) g.push(`<path d="M${bx + 20 + i * 50} ${by + 128}l14 -14l14 14z" fill="${C.ocre}"/>`);
  // Vitres et voyageurs assis
  const wins = [0, 1, 2, 3, 4].map((i) => [bx + 20 + i * 70, by + 24, 58, 78]);
  g.push(`<clipPath id="gare-win">${wins.map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>`).join("")}<rect x="${bx + bw - 76}" y="${by + 24}" width="66" height="84" rx="10"/></clipPath>`);
  for (const [x, y, w, h] of wins) g.push(rect(x, y, w, h, C.sky, ' rx="6"'));
  g.push(rect(bx + bw - 76, by + 24, 66, 84, C.sky, ' rx="10"'));
  const pax = [[bx + 49, SKIN.s2, { hair: { type: "foulard", color: C.green } }], [bx + 119, SKIN.s4, { hair: { type: "short" }, hat: { type: "cap", color: C.indigo } }], [bx + 259, SKIN.s1, { hair: { type: "fulani" } }], [bx + 329, SKIN.s5, { hair: { type: "afro" } }]];
  g.push(`<g clip-path="url(#gare-win)">`);
  for (const [x, skin, o] of pax) g.push(person({ x, y: by + 200, s: 0.5, legs: "none", skin, top: [C.terra, C.ocre, C.indigo, C.green, C.white][pax.findIndex((p) => p[0] === x)], face: "smile", ...o }));
  g.push(`</g>`);
  for (const [x, y, w] of wins) g.push(rect(x, y + 34, w, 4, C.white, ' opacity=".6"'));
  // Phares, pare-chocs
  g.push(`<circle cx="${bx + bw - 14}" cy="${by + 186}" r="8" fill="${C.yellow}"/>`, rect(bx + bw - 6, by + 196, 10, 20, C.steel, ' rx="3"'));
  g.push(rect(bx - 6, by + 196, 12, 20, C.steel, ' rx="3"'));
  // Roues
  for (const wx of [bx + 90, bx + bw - 100]) g.push(`<circle cx="${wx}" cy="${by + bh}" r="34" fill="${C.dark}"/><circle cx="${wx}" cy="${by + bh}" r="14" fill="${C.steel}"/>`);
  // Le voyageur qui tire sa valise
  g.push(person({ x: 388, y: 572, s: 1.04, skin: SKIN.s4, hair: { type: "short" }, top: C.white, dashiki: C.terra, bottom: C.indigo, legs: "walk", face: "smile",
    arms: { r: [[44, -150], [64, -120]], l: [[-40, -150], [-30, -110]] },
    rhand: (hx, hy) => stroke(`M${hx} ${hy}L${hx + 36} ${hy + 46}`, C.grey, 4) + `<g transform="translate(${hx + 36} ${hy + 46}) rotate(-24)"><rect x="-6" y="0" width="56" height="74" rx="8" fill="${C.ocre}"/>${stroke("M8 8V66M36 8V66", C.wood2, 3)}<circle cx="0" cy="76" r="6" fill="${C.dark}"/></g>` + hand(hx, hy, SKIN.s4) }));
  // La voyageuse en marche, bassine sur la tête
  const wx = 230, wy = 584, ws = 1.06;
  g.push(person({ x: wx, y: wy, s: ws, legs: "walkskirt", skin: SKIN.s2, hair: { type: "foulard", color: C.terra, wax: "wax2" }, top: C.ocre, wax: "wax3", sleeve: "short", bottom: C.indigo, bwax: "wax1", face: "smile",
    arms: { l: [[-50, -232], [-32, -284]], r: [[40, -150], [44, -110]] },
    rhand: (hx, hy) => `<path d="M${hx - 12} ${hy - 2}H${hx + 12}L${hx + 10} ${hy + 30}H${hx - 10}Z" fill="${C.green}"/>` + stroke(`M${hx - 6} ${hy - 2}Q${hx} ${hy - 10} ${hx + 6} ${hy - 2}`, C.dark, 2.5) + hand(hx, hy, SKIN.s2) }));
  g.push(at(wx, wy, ws, false, `<path d="M-40 -296H40L30 -270H-30Z" fill="${C.blue}"/><ellipse cx="0" cy="-296" rx="40" ry="7" fill="${C.blue}"/>` + cloth("M-30 -300Q-20 -330 0 -332Q22 -330 32 -300Z", C.green, "wax1") + hand(-32, -284, SKIN.s2)));
  // Le vendeur ambulant : plateau sur la tête, sachet tendu
  const vx = 572, vy = 588, vs = 1.06;
  g.push(person({ x: vx, y: vy, s: vs, flip: true, skin: SKIN.s1, hair: { type: "short" }, hat: { type: "cap", color: C.green }, top: C.indigo, sleeve: "short", bottom: C.dark, bwax: null, face: "talk",
    arms: { l: [[-48, -232], [-34, -280]], r: [[54, -176], [84, -192]] },
    rhand: (hx, hy) => `<path d="M${hx - 8} ${hy - 4}H${hx + 10}L${hx + 12} ${hy + 22}H${hx - 10}Z" fill="${C.white}" opacity=".9"/><circle cx="${hx - 2}" cy="${hy + 14}" r="3" fill="${C.wood}"/><circle cx="${hx + 4}" cy="${hy + 10}" r="3" fill="${C.wood}"/>` + hand(hx, hy, SKIN.s1) }));
  let tray = `<ellipse cx="0" cy="-274" rx="50" ry="8" fill="${C.wood}"/><rect x="-50" y="-280" width="100" height="6" fill="${C.wood2}"/>`;
  for (const [cx, cy, c] of [[-34, -286, C.wood], [-18, -290, C.ocre], [0, -286, C.wood], [18, -290, C.ocre], [34, -286, C.wood], [-10, -300, C.wood], [10, -300, C.ocre]]) tray += `<circle cx="${cx}" cy="${cy}" r="9" fill="${c}"/>`;
  g.push(at(vx, vy, vs, true, tray + hand(-34, -280, SKIN.s1)));
  // La voyageuse aux tresses, sac et valise
  g.push(person({ x: 708, y: 584, s: 1.04, flip: true, skin: SKIN.s5, hair: { type: "boxbraids", beads: C.white }, robe: "kaba", top: C.green, wax: "kitenge", face: "laugh",
    arms: { l: [[-44, -150], [-50, -104]], r: [[40, -150], [42, -112]] },
    lhand: (hx, hy) => `<rect x="${hx - 22}" y="${hy + 10}" width="44" height="58" rx="6" fill="${C.indigo}"/>` + rect(hx - 22, hy + 30, 44, 6, C.ocre) + stroke(`M${hx - 8} ${hy + 10}V${hy}H${hx + 8}V${hy + 10}`, C.dark, 3) + hand(hx, hy, SKIN.s5),
    rhand: (hx, hy) => `<path d="M${hx - 16} ${hy + 6}H${hx + 16}L${hx + 20} ${hy + 46}H${hx - 20}Z" fill="${C.terra}"/>` + stroke(`M${hx - 10} ${hy + 6}Q${hx} ${hy - 8} ${hx + 10} ${hy + 6}`, C.wood2, 3) + hand(hx, hy, SKIN.s5) }));
  return frame(g.join(""), C.sky);
}

/* ---------- Scène 3 : l'appel vidéo avec la famille ---------- */
function appel() {
  const g = [];
  // Mur, sol carrelé, tapis tressé
  g.push(rect(0, 452, 800, 148, C.sand2), rect(0, 446, 800, 8, C.wood2));
  for (let i = 1; i < 8; i++) g.push(stroke(`M${i * 100} 454L${i * 100 + (i - 4) * 30} 600`, C.sand, 2));
  g.push(`<ellipse cx="380" cy="560" rx="300" ry="30" fill="${C.ocre}" opacity=".55"/><ellipse cx="380" cy="560" rx="250" ry="22" fill="none" stroke="${C.terra}" stroke-width="5" stroke-dasharray="14 8"/>`);
  // Fenêtre et rideau en wax
  g.push(rect(40, 90, 120, 160, C.sky), stroke("M100 90V250M40 170H160", C.white, 6), rect(34, 84, 132, 8, C.wood2));
  g.push(cloth("M30 84H64Q58 180 70 270H30Z", C.terra, "wax1"));
  // Tenture en ndop au-dessus du canapé
  g.push(rect(220, 60, 210, 6, C.wood2, ' rx="3"'), `<path d="M226 66H424V236L404 228L384 236L364 228L344 236L324 228L304 236L284 228L264 236L244 228L226 236Z" fill="url(#ndop)"/>`);
  // Masque accroché au mur
  g.push(`<g transform="translate(110 330)"><path d="M-22 -50Q-26 -70 0 -72Q26 -70 22 -50L18 20Q0 40 -18 20Z" fill="${C.wood}"/><path d="M-14 -40L-4 -36L-14 -32Z M14 -40L4 -36L14 -32Z" fill="${C.dark}"/><path d="M-2 -30H2L4 -8H-4Z" fill="${C.wood2}"/><ellipse cx="0" cy="6" rx="7" ry="4" fill="${C.dark}"/>${stroke("M-16 -56H16M-12 -62H12", C.white, 2)}${stroke("M0 22V44", C.wood2, 3)}<path d="M-6 44H6L0 56Z" fill="${C.terra}"/></g>`);
  // Canapé
  g.push(`<path d="M190 330Q190 312 210 312H520Q540 312 540 330V470H190Z" fill="${C.indigo}"/>`);
  g.push(rect(176, 400, 378, 70, C.indigo, ' rx="12"'), rect(200, 420, 330, 40, "rgba(255,255,255,.12)", ' rx="10"'));
  g.push(rect(166, 380, 40, 96, C.indigo, ' rx="14"'), rect(524, 380, 40, 96, C.indigo, ' rx="14"'), rect(166, 380, 40, 96, "rgba(0,0,0,.15)", ' rx="14"'), rect(524, 380, 40, 96, "rgba(0,0,0,.15)", ' rx="14"'));
  g.push(stroke("M196 476V500M534 476V500", C.wood2, 6));
  g.push(cloth("M204 344Q230 334 254 346L258 404Q232 412 208 404Z", C.ocre, "kente"));
  // Plante en pot, à droite
  g.push(plant(730, 530, 1.9));
  // Tabouret sculpté, théière et calebasse
  g.push(`<ellipse cx="110" cy="500" rx="50" ry="10" fill="${C.wood}"/><path d="M70 504H150L136 528L150 566H70L84 528Z" fill="${C.wood2}"/><path d="M92 516H128L118 540L128 556H92L102 540Z" fill="${C.wood}"/><ellipse cx="110" cy="566" rx="42" ry="7" fill="${C.wood2}"/>`);
  g.push(`<path d="M82 496Q80 470 98 468H112Q126 470 124 496Z" fill="${C.terra}"/><path d="M124 482Q134 476 138 466" stroke="${C.terra}" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="100" y="460" width="10" height="9" rx="3" fill="${C.ocre}"/>`, `<path d="M130 498Q128 478 144 478Q158 478 156 498Z" fill="${C.ocre}"/>${stroke("M132 488H154", C.wood2, 2)}`);
  // La grand-mère en kaba et gele, tablette en main
  const gx = 300, gy = 566, gs = 1.02;
  g.push(person({ x: gx, y: gy, s: gs, legs: "sit", skin: SKIN.s2, hair: { type: "gele", color: C.terra, wax: "wax2" }, robe: "kaba", top: C.ocre, wax: "wax1", face: "laugh",
    arms: { l: [[-30, -140], [30, -150]], r: [[58, -150], [86, -164]] } }));
  // La tablette (on en voit le dos), puis les mains par-dessus
  g.push(at(gx, gy, gs, false, `<g transform="rotate(-8 58 -176)"><rect x="28" y="-204" width="60" height="44" rx="6" fill="${C.dark}"/><circle cx="38" cy="-194" r="2.6" fill="${C.grey}"/></g>` + hand(30, -160, SKIN.s2) + hand(86, -170, SKIN.s2)));
  // La petite-fille aux nattes fait coucou
  const px = 468, py = 568, ps = 0.8;
  g.push(person({ x: px, y: py, s: ps, skin: SKIN.s4, hair: { type: "nattes" }, top: C.green, wax: "kitenge", sleeve: "short", bottom: C.ocre, legs: "skirt", face: "laugh",
    arms: { r: [[58, -214], [60, -268]], l: [[-40, -150], [-38, -110]] } }));
  // Le parent à l'étranger, sur grand écran d'appel
  const sx = 540, sy = 60, sw = 220, sh = 250;
  g.push(rect(sx - 10, sy - 10, sw + 20, sh + 46, C.dark, ' rx="22"'));
  g.push(`<clipPath id="appel-screen"><rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="12"/></clipPath>`);
  g.push(`<g clip-path="url(#appel-screen)">`, rect(sx, sy, sw, sh, C.sky), rect(sx, sy + 150, sw, 100, C.white, ' opacity=".5"'), rect(sx + 150, sy + 20, 50, 70, C.blue, ' opacity=".35"'), stroke(`M${sx + 175} ${sy + 20}V${sy + 90}`, C.white, 3));
  g.push(person({ x: sx + 108, y: sy + 430, s: 1.12, legs: "none", skin: SKIN.s3, hair: { type: "short" }, beard: true, jacket: { color: C.terra, shirt: C.white }, face: "talk",
    arms: { r: [[70, -180], [66, -250]], l: [[-40, -150], [-38, -108]] } }));
  g.push(`</g>`);
  // Mini-vue : la grand-mère et la petite
  g.push(rect(sx + 12, sy + 12, 58, 70, C.sand, ' rx="6"'), `<g clip-path="url(#appel-screen)"></g>`);
  g.push(`<circle cx="${sx + 30}" cy="${sy + 48}" r="10" fill="${SKIN.s2}"/><path d="M${sx + 18} ${sy + 44}Q${sx + 30} ${sy + 22} ${sx + 42} ${sy + 42}Z" fill="${C.terra}"/><circle cx="${sx + 54}" cy="${sy + 56}" r="8" fill="${SKIN.s4}"/><path d="M${sx + 46} ${sy + 54}Q${sx + 54} ${sy + 40} ${sx + 62} ${sy + 54}Z" fill="${C.dark}"/><path d="M${sx + 16} ${sy + 82}Q${sx + 30} ${sy + 60} ${sx + 44} ${sy + 82}ZM${sx + 44} ${sy + 82}Q${sx + 54} ${sy + 66} ${sx + 66} ${sy + 82}Z" fill="${C.ocre}"/>`);
  // Barre d'appel : micro, raccrocher, caméra
  g.push(`<circle cx="${sx + 70}" cy="${sy + sh + 18}" r="11" fill="${C.grey}"/><circle cx="${sx + 110}" cy="${sy + sh + 18}" r="13" fill="${C.red}"/><circle cx="${sx + 150}" cy="${sy + sh + 18}" r="11" fill="${C.grey}"/>`, stroke(`M${sx + 103} ${sy + sh + 19}Q${sx + 110} ${sy + sh + 13} ${sx + 117} ${sy + sh + 19}`, C.white, 3));
  // Ondes entre la tablette et l'écran
  for (const [cx, cy, r] of [[440, 330, 4], [470, 300, 5], [500, 272, 6]]) g.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.terra}" opacity=".6"/>`);
  return frame(g.join(""), C.sand);
}

export default [
  { id: "transfert", fr: "Kiosque de transfert d'argent", en: "Mobile money kiosk",
    tags: ["transfert d'argent", "mobile money", "kiosque", "argent", "téléphone", "paiement", "agent", "clients", "monnaie", "envoi", "tresses", "boubou", "money transfer", "kiosk", "money", "phone", "payment", "agent", "customers", "send money"], draw: transfert },
  { id: "gare", fr: "Agence de voyage", en: "Bus station",
    tags: ["gare routière", "agence de voyage", "car", "bus", "voyage", "voyageurs", "valise", "bagages", "bassine", "vendeur ambulant", "guichet", "billet", "kaba", "bus station", "travel", "travellers", "luggage", "suitcase", "street vendor", "ticket office"], draw: gare },
  { id: "appel", fr: "Appel vidéo avec la famille", en: "Video call with family",
    tags: ["appel vidéo", "visio", "famille", "grand-mère", "petite-fille", "diaspora", "tablette", "salon", "gele", "kaba", "nattes", "ndop", "masque", "video call", "family", "grandmother", "granddaughter", "diaspora", "tablet", "living room"], draw: appel },
];
