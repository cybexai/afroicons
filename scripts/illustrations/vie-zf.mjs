// Scènes : l'atelier de soudure, le cours d'alphabétisation du soir, les devoirs à la maison.
// Chaque objet (meuble, portail, lampe, personnage et ce qu'il tient) est regroupé dans son propre <g>.
import { C, SKIN, person, frame, cloud, palm, stroke, f } from "./lib.mjs";

/** Un objet = un groupe. */
const G = (...p) => `<g>${p.join("")}</g>`;
/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
/** Point de la scène (X, Y) exprimé dans le repère local du personnage P. */
const loc = (P, X, Y) => [f(((X - P.x) / P.s) * (P.flip ? -1 : 1)), f((Y - P.y) / P.s)];
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${r}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");
const shadow = (x, y, rx) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(rx / 7)}" fill="${C.wood2}" opacity=".2"/>`;
/** Lunettes (repère local d'un person() de face). */
const glasses = (col = C.dark) => `<circle cx="-8" cy="-237" r="6.5" fill="${C.white}" opacity=".25"/><circle cx="8" cy="-237" r="6.5" fill="${C.white}" opacity=".25"/>` + stroke("M-14.5 -237a6.5 6.5 0 1 0 13 0a6.5 6.5 0 1 0 -13 0M1.5 -237a6.5 6.5 0 1 0 13 0a6.5 6.5 0 1 0 -13 0M-1.5 -238Q0 -240 1.5 -238M-14.5 -238L-20 -240M14.5 -238L20 -240", col, 1.6);
/** Cahier ouvert, vu de dessus en léger biais : centre (x, y), largeur w. */
const cahier = (x, y, w, rot = 0, marks = true) => {
  const h = w * 0.36, p = [`<path d="M${f(-w / 2)} ${f(-h / 2)}L0 ${f(-h / 2 + 2)}L${f(w / 2)} ${f(-h / 2)}L${f(w / 2 + 3)} ${f(h / 2)}L0 ${f(h / 2 + 2)}L${f(-w / 2 - 3)} ${f(h / 2)}Z" fill="${C.white}"/>`, stroke(`M0 ${f(-h / 2 + 2)}V${f(h / 2 + 2)}`, C.sand2, 1.5)];
  if (marks) for (let i = 1; i < 4; i++) p.push(stroke(`M${f(-w / 2 + 5)} ${f(-h / 2 + i * h / 4)}H-5M5 ${f(-h / 2 + i * h / 4)}H${f(w / 2 - 6)}`, C.blue, 1, ' opacity=".45"'));
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${rot})">${p.join("")}</g>`;
};

/* ====================================================================================
   Scène 1 : l'atelier de soudure au bord de la route
   ==================================================================================== */
/** Portail en fer forgé : coin haut gauche (x, y), largeur w, hauteur h, deux battants si double. */
const gate = (x, y, w, h, col, double = true, pointes = true) => {
  const p = [], st = (d, wd = 4) => stroke(d, col, wd);
  const leaves = double ? [[x, w / 2], [x + w / 2, w / 2]] : [[x, w]];
  for (const [lx, lw] of leaves) {
    p.push(`<path d="M${f(lx + 3)} ${f(y + 3)}H${f(lx + lw - 3)}V${f(y + h - 3)}H${f(lx + 3)}Z" fill="none" stroke="${col}" stroke-width="6"/>`);
    p.push(st(`M${f(lx + 3)} ${f(y + h * 0.3)}H${f(lx + lw - 3)}M${f(lx + 3)} ${f(y + h * 0.72)}H${f(lx + lw - 3)}`, 4));
    const n = Math.max(3, Math.round(lw / 16));
    for (let i = 1; i < n; i++) {
      const bx = lx + (lw * i) / n;
      p.push(st(`M${f(bx)} ${f(y + 3)}V${f(y + h - 3)}`, 3));
      if (pointes) p.push(`<path d="M${f(bx - 4)} ${f(y + 2)}L${f(bx)} ${f(y - 10)}L${f(bx + 4)} ${f(y + 2)}Z" fill="${col}"/>`);
    }
    // Volutes et soleil au milieu du battant
    const cx = lx + lw / 2, cy = y + h * 0.51, r = Math.min(lw, h) * 0.17;
    p.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="none" stroke="${col}" stroke-width="3.5"/><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r * 0.35)}" fill="${col}"/>`);
    p.push(st(`M${f(cx - r)} ${f(cy)}Q${f(cx - r * 2)} ${f(cy - r * 1.2)} ${f(cx - r * 1.6)} ${f(cy - r * 1.8)}M${f(cx + r)} ${f(cy)}Q${f(cx + r * 2)} ${f(cy + r * 1.2)} ${f(cx + r * 1.6)} ${f(cy + r * 1.8)}`, 3));
  }
  return p.join("");
};
/** Grille de fenêtre (losanges) : coin haut gauche, w × h. */
const grille = (x, y, w, h, col) => {
  const id = `soudeur-gr${Math.round(x)}`;
  return `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath><g clip-path="url(#${id})">` +
    stroke([...Array(8)].map((_, i) => `M${f(x - h + i * w / 4)} ${y}L${f(x + i * w / 4)} ${y + h}M${f(x + i * w / 4)} ${y}L${f(x - h + i * w / 4)} ${y + h}`).join(""), col, 3) + `</g>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${col}" stroke-width="5"/>`;
};

function soudeur() {
  const g = [];
  // Ciel, nuages, palmier et immeuble voisin derrière l'atelier
  g.push(G(rect(0, 0, 800, 160, C.white), rect(0, 0, 800, 160, C.blue, ' opacity=".3"')));
  g.push(cloud(110, 50, 0.7), cloud(520, 36, 0.55));
  g.push(G(rect(600, 20, 160, 120, C.sand), rect(600, 20, 160, 8, C.sand2), ...[0, 1, 2].map((i) => rect(616 + i * 50, 40, 30, 22, C.blue, ' opacity=".55"'))));
  g.push(palm(330, 150, 0.75, 8));

  // L'atelier : mur du fond, toit de tôle sur poteaux, enseigne en pictogramme
  g.push(G(rect(0, 120, 800, 340, C.sand2), rect(0, 360, 800, 100, C.wood, ' opacity=".25"'), rect(0, 356, 800, 4, C.wood2, ' opacity=".3"'),
    `<path d="M0 448H800V460H0Z" fill="${C.wood2}" opacity=".35"/>`));
  g.push(G(`<path d="M-10 128L20 82H780L810 128Z" fill="${C.steel}"/>`, `<path d="${[...Array(27)].map((_, i) => `M${f(i * 31)} 127L${f(22 + i * 29)} 83`).join("")}" stroke="${C.grey}" stroke-width="2" opacity=".5"/>`,
    rect(0, 124, 800, 10, C.grey), rect(36, 132, 12, 330, C.wood2), rect(752, 132, 12, 330, C.wood2)));
  // Enseigne : un portail et une étincelle, sur une planche peinte
  g.push(G(rect(330, 134, 140, 52, C.ocre, ' rx="4"'), rect(336, 140, 128, 40, C.white, ' opacity=".2" rx="3"'), stroke("M350 134V128M450 134V128", C.dark, 3),
    `<g transform="translate(344 146) scale(.18)">${gate(0, 20, 300, 120, C.dark, true, true)}</g>`,
    `<path d="M430 148L435 158L446 160L437 166L440 177L430 171L420 177L423 166L414 160L425 158Z" fill="${C.red}"/>`));

  // Les barres de fer neuves, appuyées contre le poteau
  g.push(G(stroke("M66 458L56 232M74 458L60 236M82 458L66 240", C.grey, 5), stroke("M66 458L56 232", C.steel, 2)));
  // Les portails exposés contre le mur, à gauche
  g.push(G(shadow(130, 458, 90), gate(58, 266, 150, 190, C.green)));
  g.push(G(shadow(244, 458, 40), gate(212, 300, 66, 156, C.terra, false)));
  // Les grilles de fenêtre accrochées au mur, à droite, et leurs clous
  g.push(G(stroke("M612 176V170M676 176V170M690 176V170M742 176V170", C.dark, 3), grille(600, 178, 88, 72, C.indigo), grille(692, 178, 56, 72, C.terra)));
  g.push(G(grille(604, 278, 70, 56, C.green), grille(686, 278, 62, 56, C.indigo), stroke("M612 276V270M666 276V270M694 276V270M740 276V270", C.dark, 3)));

  // Sol de l'atelier : terre battue, la route devant
  g.push(G(rect(0, 460, 800, 140, C.sand), rect(0, 460, 800, 140, C.terra, ' opacity=".2"'), rect(0, 576, 800, 24, C.grey, ' opacity=".45"'),
    stroke("M60 590H130M220 590H290M380 590H450M540 590H610M700 590H770", C.white, 3, ' opacity=".7"'),
    [[320, 500], [620, 520], [110, 470], [520, 470]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="16" ry="3" fill="${C.wood2}" opacity=".2"/>`).join("")));

  // Le poste à souder, au sol à gauche, et ses câbles
  g.push(G(shadow(96, 556, 50), rect(56, 484, 82, 70, C.red, ' rx="6"'), rect(64, 492, 66, 24, C.dark, ' rx="3"'), `<circle cx="80" cy="532" r="9" fill="${C.dark}"/><circle cx="80" cy="532" r="4" fill="${C.steel}"/>`,
    rect(98, 526, 30, 4, C.dark, ' opacity=".6"'), rect(98, 536, 30, 4, C.dark, ' opacity=".6"'), rect(70, 476, 54, 8, C.dark, ' rx="4"'), rect(72, 498, 16, 12, C.yellow, ' rx="2"'), `<circle cx="116" cy="504" r="4" fill="${C.leaf}"/>`));

  // La pièce en cours : un battant de portail brut, debout sur deux cales
  g.push(G(shadow(372, 552, 90), rect(296, 534, 30, 14, C.wood), rect(420, 534, 30, 14, C.wood), gate(290, 384, 166, 152, C.grey, false, false)));
  // La pince de masse sur le cadre et le câble qui revient au poste
  g.push(G(stroke("M136 540Q220 566 300 552Q330 548 334 538", C.dark, 4), rect(326, 530, 16, 10, C.red, ' rx="2"')));

  // Le soudeur, en bleu de travail et masque de soudure, la pince porte-électrode à la main
  const S = { x: 214, y: 552, s: 1 }, ssk = SKIN.s2;
  const sH = loc(S, 300, 446);
  g.push(G(stroke(`M132 510Q170 520 190 470Q200 440 ${S.x + sH[0] - 12} ${S.y + sH[1] + 6}`, C.dark, 4),
    person({ ...S, skin: ssk, hair: { type: "short" }, top: C.indigo, bottom: C.indigo, shoes: C.wood2, face: "none",
      arms: { l: [[-40, -150], [-30, -108]], r: [[58, -150], sH] } }),
    at(S.x, S.y, S.s, false,
      // Masque de soudure rabattu sur le visage, avec sa vitre teintée
      `<path d="M-25 -258Q-26 -276 0 -276Q26 -276 25 -258L28 -214Q0 -204 -28 -214Z" fill="${C.dark}"/><path d="M-25 -258Q-26 -276 0 -276Q26 -276 25 -258" fill="none" stroke="${C.grey}" stroke-width="3"/>` +
      rect(-15, -248, 30, 14, C.leaf2, ' rx="3"') + rect(-11, -245, 10, 4, C.white, ' opacity=".35" rx="2"') + stroke("M-27 -246L-30 -230M27 -246L30 -230", C.grey, 4) +
      // Tablier de cuir
      `<path d="M-24 -184H24L28 -60Q0 -54 -28 -60Z" fill="${C.wood}"/>` + stroke("M-24 -184L-16 -204M24 -184L16 -204", C.wood2, 3) +
      // Gant à la main gauche, pince porte-électrode et électrode dans la main droite
      hand(-30, -108, C.wood2, 9) + `<g transform="translate(${sH[0]} ${sH[1]}) rotate(-20)">${rect(-16, -6, 22, 12, C.dark, ' rx="4"')}${stroke("M6 0L22 0", C.steel, 3)}</g>` + hand(sH[0], sH[1], C.wood2, 9))));
  // Étincelles et éclat de l'arc
  const sx = 322, sy = 440;
  g.push(G(`<circle cx="${sx}" cy="${sy}" r="30" fill="${C.yellow}" opacity=".25"/><circle cx="${sx}" cy="${sy}" r="14" fill="${C.yellow}" opacity=".5"/><circle cx="${sx}" cy="${sy}" r="6" fill="${C.white}"/>`,
    [[-40, -36], [-10, -48], [26, -40], [42, -8], [36, 30], [10, 46], [-30, 34], [-46, 6], [54, 18], [-20, 60]].map(([dx, dy], i) => stroke(`M${f(sx + dx * 0.35)} ${f(sy + dy * 0.35)}L${f(sx + dx)} ${f(sy + dy)}`, i % 2 ? C.yellow : C.ocre, 2.5)).join(""),
    [[60, 56], [70, 40], [-52, 64], [32, 70], [80, 64]].map(([dx, dy]) => `<circle cx="${sx + dx}" cy="${sy + dy}" r="2.2" fill="${C.ocre}"/>`).join("")));

  // L'apprenti, gants de cuir, qui tient le battant bien droit ; le marteau à la ceinture
  const A = { x: 520, y: 556, s: 0.94 }, ask = SKIN.s4;
  const aL = loc(A, 452, 470), aL2 = loc(A, 452, 420);
  g.push(G(person({ ...A, skin: ask, hair: { type: "nattes" }, top: C.ocre, wax: "kente", sleeve: "short", bottom: C.dark, face: "smile",
    arms: { l: [[-58, -150], aL], r: [[44, -150], [40, -110]] } }),
    at(A.x, A.y, A.s, false, hand(aL[0], aL[1], C.wood2, 9) + stroke("M40 -110L52 -62", C.wood2, 5) + rect(42, -70, 22, 12, C.dark, ' rx="2"') + hand(40, -110, ask) +
      `<path d="M-20 -256Q0 -262 20 -256L20 -248Q0 -252 -20 -248Z" fill="${C.dark}" opacity=".85"/>` + rect(-17, -258, 14, 9, C.leaf2, ' rx="3" opacity=".9"') + rect(3, -258, 14, 9, C.leaf2, ' rx="3" opacity=".9"'))));
  // La deuxième main de l'apprenti, posée en haut du cadre
  g.push(G(at(A.x, A.y, A.s, false, stroke(`M-26 -190L-54 -160L${aL2[0]} ${aL2[1]}`, C.ocre, 15) + stroke(`M-26 -190L-54 -160L${aL2[0]} ${aL2[1]}`, "url(#kente)", 15) + hand(aL2[0], aL2[1], C.wood2, 9))));

  // La cliente, gele et kaba, qui montre sur son téléphone le motif qu'elle veut
  const K = { x: 640, y: 560, s: 0.98, flip: true }, ksk = SKIN.s3;
  g.push(G(person({ ...K, skin: ksk, hair: { type: "gele", color: C.terra, wax: "wax1" }, robe: "kaba", top: C.green, wax: "wax3", face: "talk",
    arms: { r: [[56, -180], [72, -204]], l: [[-40, -150], [-24, -126]] }, point: [140, -206],
    lhand: (hx, hy) => `<g transform="translate(${hx} ${hy}) scale(-1 1)">${rect(-10, -30, 22, 34, C.dark, ' rx="4"')}${rect(-7, -26, 16, 25, C.white)}<circle cx="1" cy="-14" r="5" fill="none" stroke="${C.dark}" stroke-width="1.6"/>${stroke("M-6 -6H8M-6 -22H8", C.dark, 1.4)}</g>` + hand(hx, hy, ksk) })));

  // Le groupe électrogène, devant à droite, pour les jours de délestage
  g.push(G(`<g transform="translate(-14 -12)">` + shadow(730, 578, 52) + rect(688, 520, 86, 54, C.yellow, ' rx="6"') + rect(696, 528, 40, 30, C.dark, ' rx="3" opacity=".75"') + stroke("M700 534H732M700 542H732M700 550H732", C.grey, 2) +
    `<circle cx="756" cy="536" r="7" fill="${C.dark}"/><circle cx="756" cy="536" r="3" fill="${C.red}"/>` + rect(684, 512, 94, 10, C.dark, ' rx="4"') + stroke("M690 572V580M772 572V580", C.dark, 5) + `</g>`));

  return frame(g.join(""), C.sky);
}

/* ====================================================================================
   Scène 2 : le cours d'alphabétisation du soir
   ==================================================================================== */
function alphabetisation() {
  const g = [];
  // Mur de la salle de quartier, le soir : la lampe éclaire le mur
  g.push(G(rect(0, 0, 800, 470, C.sand), rect(0, 0, 800, 470, C.indigo, ' opacity=".12"'), `<ellipse cx="460" cy="250" rx="360" ry="230" fill="${C.cream}" opacity=".55"/>`,
    rect(0, 380, 800, 90, C.green, ' opacity=".22"'), rect(0, 376, 800, 5, C.wood2, ' opacity=".3"')));
  // Le sol carrelé
  g.push(G(rect(0, 468, 800, 132, C.sand2), `<path d="${[...Array(10)].map((_, i) => `M${i * 90 - 20} 600L${i * 80 + 20} 468`).join("")}M0 510H800M0 556H800" stroke="${C.wood}" stroke-width="2" opacity=".2"/>`));

  // La fenêtre : la nuit tombée sur le quartier
  g.push(G(rect(590, 70, 160, 130, C.wood2), rect(598, 78, 144, 114, C.indigo), rect(598, 78, 144, 114, C.dark, ' opacity=".35"'),
    `<circle cx="708" cy="104" r="13" fill="${C.cream}"/><circle cx="714" cy="100" r="11" fill="${C.indigo}"/>`,
    [[620, 96], [650, 120], [688, 90], [730, 140], [612, 150]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="${C.white}" opacity=".8"/>`).join(""),
    `<path d="M598 192V168L616 160V150L636 150V164L662 156V140L690 140V160L716 164V150L742 152V192Z" fill="${C.dark}" opacity=".7"/>`, rect(620, 166, 6, 6, C.yellow), rect(672, 150, 6, 6, C.yellow), rect(724, 162, 6, 6, C.yellow),
    rect(668, 78, 4, 114, C.wood2), rect(598, 132, 144, 4, C.wood2), rect(584, 198, 172, 8, C.wood)));

  // Le tableau noir, et ses lettres à la craie (tout reste dans le cadre)
  const chalk = (d, w = 4) => stroke(d, C.white, w, ' opacity=".92"');
  g.push(G(rect(132, 74, 352, 214, C.wood), rect(142, 84, 332, 194, "#2A1E17"), rect(142, 84, 332, 194, C.leaf2, ' opacity=".55"'),
    `<clipPath id="alphabetisation-tab"><rect x="142" y="84" width="332" height="194"/></clipPath><g clip-path="url(#alphabetisation-tab)">` +
    chalk("M170 168L186 114L202 168M176 150H196") + `<circle cx="226" cy="156" r="11" fill="none" stroke="${C.white}" stroke-width="4" opacity=".92"/>` + chalk("M237 144V168") + // A a
    chalk("M262 114V168M262 114H276Q290 114 290 127Q290 140 276 140H262M276 140Q294 140 294 154Q294 168 276 168H262") + chalk("M312 112V168") + `<circle cx="323" cy="157" r="11" fill="none" stroke="${C.white}" stroke-width="4" opacity=".92"/>` + // B b
    `<ellipse cx="364" cy="141" rx="17" ry="26" fill="none" stroke="${C.white}" stroke-width="4" opacity=".92"/><circle cx="408" cy="157" r="11" fill="none" stroke="${C.white}" stroke-width="4" opacity=".92"/>` + // O o
    stroke("M166 186H458", C.white, 1.5, ' opacity=".4"') +
    // Ligne de syllabes en pointillés à recopier et dessins du syllabaire
    chalk("M172 230q8 -16 16 0q8 -16 16 0M224 230q8 -16 16 0q8 -16 16 0", 3) +
    `<path d="M300 222Q318 206 336 222Q318 238 300 222ZM336 222L346 212V232Z" fill="none" stroke="${C.white}" stroke-width="3" opacity=".9"/>` +
    `<path d="M380 238V214L398 200L416 214V238ZM392 238V224H404V238" fill="none" stroke="${C.white}" stroke-width="3" opacity=".9" stroke-linejoin="round"/>` +
    `<circle cx="446" cy="222" r="12" fill="none" stroke="${C.yellow}" stroke-width="3"/>` + stroke("M446 210V204M440 206L444 210", C.leaf, 3) +
    stroke("M172 260H200M212 260H240M252 260H280", C.white, 2.5, ' stroke-dasharray="2 5" opacity=".7"') + `</g>`,
    rect(150, 278, 316, 8, C.wood2), rect(380, 272, 18, 6, C.white, ' rx="2"'), rect(410, 272, 14, 6, C.yellow, ' rx="2"')));

  // L'affiche des fruits (pictogrammes), clouée au mur
  g.push(G(rect(510, 236, 64, 90, C.white), stroke("M542 230V236", C.dark, 3),
    `<circle cx="528" cy="256" r="8" fill="${C.ocre}"/><circle cx="556" cy="256" r="8" fill="${C.red}"/>`, stroke("M556 248L560 242", C.leaf2, 2.5),
    `<path d="M520 290Q530 272 540 290Q530 296 520 290Z" fill="${C.yellow}"/><ellipse cx="556" cy="284" rx="8" ry="10" fill="${C.leaf}"/>`, stroke("M520 312H540M548 312H566", C.dark, 3, ' opacity=".5"')));

  // L'ampoule qui pend du plafond, et son halo
  g.push(G(stroke("M380 0V40", C.dark, 2), rect(374, 38, 12, 10, C.grey), `<circle cx="380" cy="58" r="44" fill="${C.yellow}" opacity=".18"/><circle cx="380" cy="58" r="12" fill="${C.yellow}"/><circle cx="377" cy="55" r="4" fill="${C.white}" opacity=".8"/>`));

  // La formatrice, au tableau, la craie à la main
  const T = { x: 106, y: 560, s: 1 }, tsk = SKIN.s4;
  const tH = loc(T, 172, 274);
  g.push(G(person({ ...T, skin: tsk, hair: { type: "boxbraids", beads: C.ocre }, top: C.green, wax: "kitenge", sleeve: "short", legs: "skirt", bottom: C.indigo, bwax: "wax2", face: "talk",
    arms: { r: [[52, -236], tH], l: [[-40, -150], [-10, -134]] }, point: [tH[0] + 14, tH[1] - 40] }),
    at(T.x, T.y, T.s, false, `<g transform="translate(-14 -134) rotate(-8)">${rect(-26, -14, 34, 26, C.terra, ' rx="2"')}${rect(-24, -12, 30, 22, C.white, ' opacity=".2"')}</g>` + hand(-10, -134, tsk) + rect(tH[0] + 2, tH[1] - 12, 5, 12, C.white, ' rx="2"') + hand(tH[0], tH[1], tsk, 6.5))));

  // Les apprenants, assis derrière la grande table (on dessine la table après eux)
  const Y = 574, s = 0.86, top = 458;
  const L1 = { x: 380, y: Y, s }, L2 = { x: 494, y: Y - 6, s: 0.9 }, L3 = { x: 606, y: Y, s }, L4 = { x: 716, y: Y, s };
  // 1. La commerçante en gele : elle écrit, appliquée
  const w1 = loc(L1, 398, top - 2), w1b = loc(L1, 352, top - 2);
  g.push(G(person({ ...L1, legs: "none", skin: SKIN.s2, hair: { type: "gele", color: C.ocre, wax: "wax2" }, robe: "kaba", top: C.terra, wax: "wax1", face: "calm",
    arms: { r: [[46, -150], w1], l: [[-46, -150], w1b] } })));
  // 2. Le papa, boubou de ndop et kufi : il trace ses lettres
  const w2 = loc(L2, 514, top - 2), w2b = loc(L2, 468, top - 2);
  g.push(G(person({ ...L2, legs: "none", skin: SKIN.s3, beard: true, hair: { type: "short" }, hat: { type: "kufi", color: C.ocre, wax: "kente" }, robe: "boubou", top: "#1C2756", wax: "ndop", face: "smile",
    arms: { r: [[48, -150], w2], l: [[-48, -150], w2b] } })));
  // 3. La deuxième commerçante, toute fière, montre son cahier
  const h3a = loc(L3, 576, 436), h3b = loc(L3, 642, 436);
  g.push(G(person({ ...L3, legs: "none", skin: SKIN.s4, hair: { type: "foulard", color: C.green, wax: "wax3" }, top: C.ocre, wax: "wax2", face: "laugh",
    arms: { l: [[-50, -160], h3a], r: [[50, -160], h3b] } }),
    `<g transform="translate(609 428) rotate(-4)">${rect(-36, -24, 72, 44, C.white)}${stroke("M0 -24V20", C.sand2, 1.5)}${stroke("M-30 -8l6 -12l6 12M-28 -12h8M-12 -4a4 4 0 1 0 .1 0", C.indigo, 2.2)}${stroke("M8 -20V-2M8 -20h6q6 0 6 5t-6 4h-6m6 0q7 0 7 5t-7 4h-6", C.indigo, 2)}${stroke("M-30 10H-6M6 10H30", C.blue, 1, ' opacity=".5"')}</g>`,
    hand(576, 436, SKIN.s4, 6.5), hand(642, 436, SKIN.s4, 6.5)));
  // 4. La grand-mère, lunettes au nez, qui montre son ardoise
  const h4a = loc(L4, 688, 440), h4b = loc(L4, 744, 440);
  g.push(G(person({ ...L4, legs: "none", skin: SKIN.s5, hair: { type: "foulard", color: C.white, wax: "wax2" }, robe: "boubou", top: C.indigo, wax: "bogolan", face: "laugh",
    arms: { l: [[-52, -150], h4a], r: [[52, -150], h4b] } }),
    at(L4.x, L4.y, L4.s, false, glasses()),
    `<g transform="translate(0 22)">` + rect(686, 384, 62, 44, C.wood, ' rx="4"') + rect(692, 390, 50, 32, C.dark) + stroke("M700 414l6 -18l6 18M702 408h8M724 398v16M724 398h6q5 0 5 4t-5 4h-6", C.white, 2) + `</g>`,
    hand(688, 440, SKIN.s5, 6.5), hand(744, 440, SKIN.s5, 6.5)));

  // La table, les cahiers et les crayons
  g.push(G(rect(326, top, 450, 12, C.wood2), rect(334, top + 12, 434, 80, C.wood), rect(334, top + 12, 434, 6, C.wood2, ' opacity=".4"'), rect(340, top + 92, 14, 40, C.wood2), rect(748, top + 92, 14, 40, C.wood2)));
  g.push(G(cahier(374, top + 2, 64, 0), cahier(492, top + 2, 64, 0)));
  // Mains qui écrivent, par-dessus les cahiers, avec le crayon
  const pen = (x, y) => `<g transform="translate(${x} ${y}) rotate(30)">${rect(-2, -20, 4, 22, C.yellow, ' rx="1.5"')}${rect(-2, -20, 4, 4, C.red)}</g>`;
  g.push(G(pen(L1.x + w1[0] * s, top - 2), hand(L1.x + w1[0] * s, top - 2, SKIN.s2, 6.5), hand(L1.x + w1b[0] * s, top - 2, SKIN.s2, 6.5)));
  g.push(G(pen(L2.x + w2[0] * 0.9, top - 2), hand(L2.x + w2[0] * 0.9, top - 2, SKIN.s3, 6.8), hand(L2.x + w2b[0] * 0.9, top - 2, SKIN.s3, 6.8)));
  // La lampe solaire posée sur la table, entre les apprenants
  g.push(G(`<circle cx="432" cy="${top - 26}" r="30" fill="${C.yellow}" opacity=".25"/>`, rect(418, top - 8, 28, 8, C.dark, ' rx="2"'), rect(422, top - 36, 20, 28, C.yellow, ' rx="4"'), rect(426, top - 32, 12, 20, C.white, ' opacity=".6" rx="3"'), stroke(`M424 ${top - 36}Q432 ${top - 50} 440 ${top - 36}`, C.dark, 3), rect(416, top - 44, 32, 5, C.dark, ' rx="2"')));

  // Devant, la bassine de la commerçante, tomates et piments
  g.push(G(shadow(286, 572, 46), `<path d="M240 538H332L320 570H252Z" fill="${C.blue}"/>`, `<ellipse cx="286" cy="538" rx="46" ry="8" fill="${C.steel}"/>`,
    [[262, 532], [280, 528], [298, 532], [314, 534], [272, 536], [290, 536], [306, 538]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="8" fill="${i % 3 === 2 ? C.leaf : C.red}"/>`).join("")));

  return frame(g.join(""), C.sand);
}

/* ====================================================================================
   Scène 3 : les devoirs à la maison, en fin de journée
   ==================================================================================== */
function devoirs() {
  const g = [];
  // Le salon : mur vert pâle, plinthe, carrelage
  g.push(G(rect(0, 0, 800, 450, C.sky), rect(0, 0, 800, 450, C.leaf, ' opacity=".14"'), rect(0, 440, 800, 10, C.wood2, ' opacity=".35"')));
  g.push(G(rect(0, 450, 800, 150, C.sand), `<path d="${[...Array(11)].map((_, i) => `M${i * 96 - 60} 600L${i * 84 - 20} 450`).join("")}M0 496H800M0 546H800" stroke="${C.wood}" stroke-width="2" opacity=".2"/>`));

  // La fenêtre sur la cour : ciel du soir, manguier, mur de la concession
  g.push(G(rect(52, 96, 190, 176, C.wood),
    `<clipPath id="devoirs-fen"><rect x="62" y="106" width="170" height="156"/></clipPath><g clip-path="url(#devoirs-fen)">` +
    rect(62, 106, 170, 156, C.ocre) + rect(62, 106, 170, 70, C.rose, ' opacity=".55"') + `<circle cx="196" cy="200" r="18" fill="${C.yellow}"/>` +
    rect(62, 216, 170, 46, C.sand2) + rect(62, 212, 170, 6, C.wood) +
    stroke("M104 262V196", C.wood2, 9) + `<circle cx="90" cy="176" r="26" fill="${C.leaf2}"/><circle cx="120" cy="166" r="28" fill="${C.leaf}"/><circle cx="106" cy="192" r="20" fill="${C.leaf2}"/>` +
    `<ellipse cx="112" cy="184" rx="4" ry="5.5" fill="${C.ocre}"/><ellipse cx="128" cy="178" rx="4" ry="5.5" fill="${C.yellow}"/>` + `</g>`,
    rect(144, 106, 6, 156, C.wood), rect(62, 182, 170, 5, C.wood), rect(44, 270, 206, 10, C.wood2)));
  // Rideaux en pagne
  g.push(G(cloth("M30 84H74Q66 180 78 296H36Z", C.terra, "wax1"), cloth("M220 84H264V296H222Q234 180 220 84Z", C.terra, "wax1"), rect(24, 78, 248, 8, C.wood2, ' rx="4"')));

  // L'horloge et la photo de famille
  g.push(G(`<circle cx="372" cy="120" r="30" fill="${C.white}"/><circle cx="372" cy="120" r="30" fill="none" stroke="${C.wood2}" stroke-width="5"/>`, stroke("M372 120V102M372 120L384 128", C.dark, 3), `<circle cx="372" cy="120" r="3" fill="${C.dark}"/>`));
  g.push(G(rect(440, 92, 92, 70, C.wood2), rect(446, 98, 80, 58, C.blue, ' opacity=".5"'),
    `<clipPath id="devoirs-ph"><rect x="446" y="98" width="80" height="58"/></clipPath><g clip-path="url(#devoirs-ph)">` +
    [[468, SKIN.s2, 14], [490, SKIN.s4, 12], [508, SKIN.s3, 10]].map(([x, sk, r]) => `<circle cx="${x}" cy="${130 - r}" r="${r * 0.6}" fill="${sk}"/><path d="M${x - r} 160Q${x - r} ${136 - r * 0.2} ${x} ${136 - r * 0.2}Q${x + r} ${136 - r * 0.2} ${x + r} 160Z" fill="${C.ocre}"/>`).join("") + `</g>`));

  // Le meuble télé, la télé éteinte et la plante
  g.push(G(rect(588, 360, 170, 86, C.wood2), rect(596, 370, 74, 66, C.wood, ' rx="3"'), rect(678, 370, 72, 66, C.wood, ' rx="3"'), `<circle cx="660" cy="404" r="3" fill="${C.dark}"/><circle cx="688" cy="404" r="3" fill="${C.dark}"/>`,
    rect(596, 446, 10, 8, C.dark), rect(740, 446, 10, 8, C.dark)));
  g.push(G(rect(596, 222, 150, 126, C.dark, ' rx="6"'), rect(604, 230, 134, 106, "#2A1E17"), `<path d="M614 240L664 240L624 326H614Z" fill="${C.white}" opacity=".07"/>`, rect(656, 348, 30, 10, C.dark), rect(640, 356, 62, 5, C.dark, ' rx="2"')));
  g.push(G(`<path d="M716 334Q702 300 710 278Q722 300 724 334ZM724 334Q736 296 752 286Q748 314 732 336Z" fill="${C.leaf}"/>`, `<path d="M714 334H744L740 360H718Z" fill="${C.terra}"/>`));

  // Les enfants et la famille, derrière la table
  const top = 422;
  // Le papa, assis au bout de la table, qui montre la ligne du cahier
  const P = { x: 214, y: 572, s: 0.95 }, psk = SKIN.s2;
  const pR = loc(P, 300, top - 6);
  g.push(G(person({ ...P, legs: "none", skin: psk, beard: true, hair: { type: "short" }, top: C.green, wax: "kitenge", sleeve: "short", face: "talk",
    arms: { r: [[58, -150], pR], l: [[-52, -140], loc(P, 181, 408)] }, point: [pR[0] + 30, pR[1] + 2] })));
  // La petite, en bantu knots, qui écrit dans son cahier
  const E1 = { x: 350, y: 522, s: 0.7 }, e1 = SKIN.s4;
  const e1r = loc(E1, 368, top - 2), e1l = loc(E1, 322, top - 2);
  g.push(G(person({ ...E1, legs: "none", skin: e1, hair: { type: "bantu" }, top: C.yellow, sleeve: "short", face: "calm",
    arms: { r: [[46, -150], e1r], l: [[-46, -150], e1l] } })));
  // La grande sœur, debout derrière son petit frère, qui corrige l'ardoise
  const S = { x: 568, y: 530, s: 0.86, flip: true }, ssk = SKIN.s3;
  const sR = loc(S, 512, 384);
  g.push(G(person({ ...S, skin: ssk, hair: { type: "boxbraids", beads: C.yellow }, top: C.indigo, wax: "ndop", sleeve: "short", legs: "skirt", bottom: C.terra, bwax: "wax2", face: "laugh",
    arms: { r: [[62, -170], sR], l: [[-42, -150], [-30, -112]] }, point: [sR[0] + 22, sR[1] + 18] })));
  // Le petit frère, qui montre fièrement son ardoise
  const E2 = { x: 470, y: 522, s: 0.7 }, e2 = SKIN.s1;
  const e2a = loc(E2, 433, 402), e2b = loc(E2, 507, 402);
  g.push(G(person({ ...E2, legs: "none", skin: e2, hair: { type: "rase" }, top: C.blue, sleeve: "short", face: "laugh",
    arms: { l: [[-44, -150], e2a], r: [[44, -150], e2b] } }),
    G(rect(432, 380, 76, 44, C.wood, ' rx="4"'), rect(438, 386, 64, 32, C.dark), stroke("M448 392v18M458 392h8v8h-8v10h8M476 392h8l-6 8q8 0 6 6q-2 5 -8 4", C.white, 2)),
    hand(433, 402, e2, 6.5), hand(507, 402, e2, 6.5)));

  // La natte tressée au sol et les sandales des enfants
  g.push(G(`<path d="M30 520H210L222 584H18Z" fill="${C.ocre}"/>`, `<path d="M30 520H210L222 584H18Z" fill="url(#kente)" opacity=".35"/>`, stroke("M26 536H214M23 552H217M20 568H220", C.wood, 2, ' opacity=".5"'), rect(16, 582, 208, 5, C.wood2, ' opacity=".5"')));
  g.push(G(`<ellipse cx="88" cy="566" rx="13" ry="5" fill="${C.blue}"/><ellipse cx="114" cy="568" rx="13" ry="5" fill="${C.blue}"/>`, stroke("M82 564q6 -6 12 0M108 566q6 -6 12 0", C.dark, 2.5)));
  // La table du salon, avec la nappe en pagne
  g.push(G(rect(160, top, 450, 12, C.wood2), cloth(`M166 ${top + 12}H604L598 ${top + 74}Q384 ${top + 84} 172 ${top + 74}Z`, C.ocre, "kente"),
    rect(180, top + 74, 14, 90, C.wood2), rect(576, top + 74, 14, 90, C.wood2)));
  // Sur la table : le cahier, les crayons, l'assiette de beignets, le verre de bissap
  g.push(G(cahier(346, top + 2, 66, 0)));
  const pen = `<g transform="translate(${f(E1.x + e1r[0] * E1.s)} ${top - 2}) rotate(30)">${rect(-1.6, -15, 3.2, 17, C.red, ' rx="1.2"')}</g>`;
  g.push(G(pen, hand(E1.x + e1r[0] * E1.s, top - 2, e1, 6), hand(E1.x + e1l[0] * E1.s, top - 2, e1, 6)));
  g.push(G(hand(P.x + pR[0] * P.s, top - 6, psk, 7)));
  g.push(G(`<defs><circle id="devoirs-bg" r="9" fill="${C.ocre}"/></defs>`, `<ellipse cx="258" cy="${top}" rx="34" ry="7" fill="${C.white}"/><ellipse cx="258" cy="${top - 1}" rx="26" ry="4" fill="${C.sand}"/>`,
    ...[[244, -8], [260, -9], [274, -7], [252, -18], [268, -17], [260, -26]].map(([x, dy]) => `<use href="#devoirs-bg" x="${x}" y="${top + dy}"/>`), `<circle cx="256" cy="${top - 20}" r="2.5" fill="${C.yellow}" opacity=".7"/>`));
  g.push(G(rect(172, 390, 18, 30, C.white, ' opacity=".7" rx="3"'), rect(174, 398, 14, 20, C.red, ' rx="2"'), hand(181, 408, psk, 7)));
  g.push(G(rect(392, top - 6, 30, 6, C.green, ' rx="2"'), rect(400, top - 10, 18, 4, C.yellow, ' rx="2"')));

  // Le cartable posé au pied de la table
  g.push(G(shadow(648, 576, 46), `<path d="M612 506Q612 492 626 492H674Q688 492 688 506V570H612Z" fill="${C.terra}"/>`, `<path d="M612 506Q612 492 626 492H674Q688 492 688 506V522H612Z" fill="${C.dark}" opacity=".18"/>`,
    rect(640, 514, 20, 10, C.yellow, ' rx="2"'), stroke("M630 492Q630 474 650 474Q670 474 670 492", C.dark, 5), rect(620, 536, 60, 26, C.ocre, ' rx="4"'), rect(616, 534, 8, 30, C.dark, ' opacity=".3"')));
  // L'ardoise de rechange et les livres par terre
  g.push(G(rect(694, 548, 64, 10, C.blue, ' rx="2"'), rect(698, 538, 56, 10, C.green, ' rx="2"'), rect(702, 530, 50, 8, C.yellow, ' rx="2"')));

  return frame(g.join(""), C.sky);
}

export default [
  { id: "soudeur", fr: "L'atelier de soudure", en: "The welding workshop", tags: ["soudure", "welding", "soudeur", "welder", "atelier", "workshop", "portail", "gate", "fer forgé", "wrought iron", "apprenti", "apprentice", "métier", "trade", "artisan", "étincelles", "sparks", "groupe électrogène", "generator", "bord de route", "roadside"], draw: soudeur },
  { id: "alphabetisation", fr: "Le cours d'alphabétisation", en: "The literacy class", tags: ["alphabétisation", "literacy", "lire", "read", "écrire", "write", "adultes", "adults", "cours du soir", "evening class", "tableau", "blackboard", "cahier", "notebook", "ardoise", "slate", "formatrice", "teacher", "grand-mère", "grandmother", "fierté", "pride", "quartier", "neighbourhood"], draw: alphabetisation },
  { id: "devoirs", fr: "Les devoirs à la maison", en: "Homework at home", tags: ["devoirs", "homework", "école", "school", "famille", "family", "papa", "father", "grande sœur", "big sister", "enfants", "children", "cahier", "notebook", "ardoise", "slate", "cartable", "schoolbag", "beignets", "salon", "living room", "soir", "evening"], draw: devoirs },
];
