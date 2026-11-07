// Scènes : une journée de vaccination, les résultats du bac, la pause déjeuner au maquis.
// Chaque objet (meuble, arbre, tente, personnage et ce qu'il tient) est regroupé dans son propre <g>.
import { C, SKIN, person, frame, cloud, bubble, stroke, f } from "./lib.mjs";
import { flag } from "./flag.mjs";

/** Un objet = un groupe. */
const G = (...p) => `<g>${p.join("")}</g>`;
/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${r}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
const shadow = (x, y, rx) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(rx / 7)}" fill="${C.wood2}" opacity=".18"/>`;
/** Petit visage dessiné à la main (bébé) : yeux avec reflet, bouche. */
const face = (cx, cy, r) => `<ellipse cx="${f(cx - r * 0.36)}" cy="${f(cy)}" rx="${f(r * 0.13)}" ry="${f(r * 0.16)}" fill="#0E0907"/><ellipse cx="${f(cx + r * 0.36)}" cy="${f(cy)}" rx="${f(r * 0.13)}" ry="${f(r * 0.16)}" fill="#0E0907"/><circle cx="${f(cx - r * 0.32)}" cy="${f(cy - r * 0.06)}" r="${f(r * 0.05)}" fill="#fff"/><circle cx="${f(cx + r * 0.4)}" cy="${f(cy - r * 0.06)}" r="${f(r * 0.05)}" fill="#fff"/>` + stroke(`M${f(cx - r * 0.28)} ${f(cy + r * 0.42)}Q${f(cx)} ${f(cy + r * 0.65)} ${f(cx + r * 0.28)} ${f(cy + r * 0.42)}`, "#7E2F25", f(r * 0.13));
/** Bébé porté au dos (repère local d'un person() de face) : la tête dépasse derrière l'épaule. */
const babyHead = (skin) => `<ellipse cx="-31" cy="-226" rx="15" ry="16" fill="${skin}"/><path d="M-46 -230Q-46 -244 -31 -244Q-16 -244 -16 -230Q-22 -238 -31 -238Q-40 -238 -46 -230Z" fill="#17100D"/>` + face(-31, -224, 15);
/** Le pagne qui tient le bébé : une bande en travers du buste, nouée sur la poitrine, et la petite main sur l'épaule. */
const babyWrap = (col, pat, skin) => {
  const d = "M-30 -196L-24 -206L30 -150L26 -138Z";
  return `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "") + `<path d="M-32 -128Q0 -136 32 -128L32 -110Q0 -116 -32 -110Z" fill="${col}"/>` + (pat ? `<path d="M-32 -128Q0 -136 32 -128L32 -110Q0 -116 -32 -110Z" fill="url(#${pat})"/>` : "") + `<circle cx="22" cy="-146" r="6" fill="${col}"/><circle cx="22" cy="-146" r="6" fill="rgba(0,0,0,.18)"/>` + hand(-24, -206, skin, 5);
};

/* ---------- Scène 1 : journée de vaccination ---------- */
function vaccination() {
  const g = [];
  // Ciel, cour de l'école en terre battue
  g.push(G(rect(0, 0, 800, 460, C.sky), `<circle cx="700" cy="80" r="30" fill="${C.yellow}" opacity=".7"/>`));
  g.push(cloud(70, 70, 0.7), cloud(520, 50, 0.55));
  g.push(G(rect(0, 450, 800, 150, C.sand2), rect(0, 450, 800, 150, C.rose, ' opacity=".25"'), [[60, 560], [360, 588], [690, 590], [560, 470]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="18" ry="3" fill="${C.wood2}" opacity=".2"/>`).join("")));
  // L'école au fond : murs crème, véranda, fenêtres à volets, toit de tôle rouge
  const win = [...Array(7)].map((_, i) => rect(54 + i * 106, 282, 54, 64, "#2A1E17") + rect(54 + i * 106, 282, 54, 6, C.wood) + stroke(`M${81 + i * 106} 288V346`, C.wood, 3)).join("");
  g.push(G(rect(20, 236, 760, 216, C.cream), rect(20, 236, 760, 216, C.ocre, ' opacity=".22"'), rect(20, 410, 760, 42, C.terra, ' opacity=".35"'), win,
    `<path d="M6 240L46 196H754L794 240Z" fill="${C.terra}"/>`, `<path d="${[...Array(16)].map((_, i) => `M${f(20 + i * 50)} 239L${f(52 + i * 45)} 197`).join("")}" stroke="rgba(0,0,0,.18)" stroke-width="2"/>`, rect(4, 238, 792, 7, C.wood2)));
  // Le manguier de la cour, à droite
  g.push(G(`<path d="M694 452Q700 380 690 320L706 320Q716 380 716 452Z" fill="${C.wood2}"/>`,
    [[660, 260, 56], [730, 240, 62], [700, 196, 52], [770, 286, 40], [630, 300, 38]].map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${i % 2 ? C.leaf : C.leaf2}"/>`).join(""),
    [[650, 290], [720, 270], [760, 300], [690, 228]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="8" fill="${C.ocre}"/>`).join("")));

  // La tente : toit rayé, lambrequin festonné, quatre mâts
  const panels = [...Array(8)].map((_, i) => { const a = 210 + i * 42.5, b = 210 + (i + 1) * 42.5, c = 110 + (i + 1) * 65, d = 110 + i * 65; return `<path d="M${f(a)} 128L${f(b)} 128L${f(c)} 196L${f(d)} 196Z" fill="${i % 2 ? C.white : C.green}"/>`; }).join("");
  g.push(G(rect(196, 196, 6, 262, C.grey), rect(538, 196, 6, 262, C.grey), panels,
    rect(106, 194, 528, 16, C.green), [...Array(12)].map((_, i) => `<path d="M${f(106 + i * 44)} 210Q${f(128 + i * 44)} 232 ${f(150 + i * 44)} 210Z" fill="${i % 2 ? C.white : C.green}"/>`).join(""),
    rect(114, 208, 7, 298, C.steel), rect(619, 208, 7, 298, C.steel), rect(110, 502, 15, 6, C.grey, ' rx="2"'), rect(615, 502, 15, 6, C.grey, ' rx="2"')));
  // L'affiche accrochée au mât : seringue et cœur, en pictogrammes
  g.push(G(stroke("M121 236L138 248M121 236L198 248", C.grey, 1.5), `<clipPath id="vaccination-aff"><rect x="132" y="246" width="72" height="96" rx="4"/></clipPath>`,
    rect(132, 246, 72, 96, C.white, ' rx="4"'), `<g clip-path="url(#vaccination-aff)">${rect(132, 246, 72, 14, C.green)}` +
    `<g transform="translate(168 282) rotate(-30)">${rect(-16, -5, 26, 10, C.sky, ' rx="2"')}${rect(-6, -5, 16, 10, C.blue, ' rx="1" opacity=".7"')}${rect(-22, -1.5, 7, 3, C.grey)}${rect(-25, -6, 3, 12, C.grey)}${stroke("M10 0H20", C.grey, 1.6)}</g>` +
    `<path d="M168 330Q150 316 152 306Q155 298 162 299Q166 300 168 305Q170 300 174 299Q181 298 184 306Q186 316 168 330Z" fill="${C.red}"/>${stroke("M144 338H192", C.sand2, 3)}</g>`));

  // La table de l'agent de santé : nappe, glacière bleue, plateau
  // L'agent de santé, assis derrière la table, qui note dans son carnet
  const A = { x: 540, y: 532, s: 0.9 }, ask = SKIN.s1;
  g.push(G(person({ ...A, legs: "none", skin: ask, beard: true, hair: { type: "short" }, top: C.wood2, wax: "bogolan", sleeve: "short", face: "talk",
    arms: { l: [[-42, -150], [-22, -118]], r: [[44, -150], [14, -120]] } })));
  g.push(G(`<path d="M452 424H650L658 440H444Z" fill="${C.white}"/>`, rect(444, 440, 214, 44, C.white), rect(444, 460, 214, 8, C.indigo, ' opacity=".6"'),
    rect(456, 484, 8, 40, C.wood2), rect(638, 484, 8, 40, C.wood2)));
  // Carnet ouvert sous les mains de l'agent, stylo
  g.push(G(`<path d="M500 428L540 424L542 438L498 442Z" fill="${C.cream}"/><path d="M540 424L578 428L582 442L542 438Z" fill="${C.white}"/>`, stroke("M506 432L532 430M506 436L530 434M548 430L572 432", C.grey, 1.2), stroke("M540 424V438", C.sand2, 1.5),
    hand(A.x - 22 * A.s, A.y - 118 * A.s, ask, 7.5 * A.s), stroke(`M${f(A.x + 14 * A.s)} ${f(A.y - 116 * A.s)}L${f(A.x + 24 * A.s)} ${f(A.y - 134 * A.s)}`, C.indigo, 2.4), hand(A.x + 14 * A.s, A.y - 120 * A.s, ask, 7.5 * A.s)));
  // Glacière bleue (vaccins au frais) et boîte de coton
  g.push(G(rect(590, 386, 54, 44, C.blue, ' rx="5"'), rect(586, 380, 62, 12, C.white, ' rx="4"'), stroke("M604 380Q617 366 630 380", C.white, 4), stroke("M611 408H623M617 402V414", C.white, 3.5)));
  g.push(G(rect(458, 414, 28, 14, C.white, ' rx="2"'), rect(458, 414, 28, 4, C.green), `<circle cx="466" cy="412" r="5" fill="${C.white}"/><circle cx="474" cy="411" r="5" fill="${C.white}"/>`));

  // La maman, assise, l'enfant courageux sur ses genoux
  const M = { x: 252, y: 524, s: 1 }, msk = SKIN.s3;
  g.push(G(shadow(290, 526, 70), rect(210, 330, 10, 100, C.wood2, ' rx="3"'), rect(208, 420, 104, 10, C.wood, ' rx="3"'), rect(214, 430, 7, 92, C.wood2), rect(298, 430, 7, 92, C.wood2)));
  const ME = { l: [[-38, -152], [22, -130]], r: [[40, -150], [52, -128]] };
  g.push(G(person({ ...M, skin: msk, legs: "sit", robe: "kaba", top: C.ocre, wax: "wax2", hair: { type: "foulard", color: C.terra, wax: "wax3" }, face: "smile", arms: ME })));
  // L'enfant (short, chemisette en wax), le bras tendu vers l'infirmière
  const K = { x: 296, y: 460, s: 0.56 }, ksk = SKIN.s2;
  g.push(G(person({ ...K, skin: ksk, legs: "sit", hair: { type: "short" }, top: C.indigo, wax: "wax1", sleeve: "short", bottom: C.dark, shoes: C.red, face: "smile",
    arms: { l: [[-40, -150], [-24, -120]], r: [[58, -180], [92, -184]] } }),
    // Les mains de la maman par-dessus l'enfant : elle le tient par la taille
    at(M.x, M.y, M.s, false, stroke(`M-38 -152L22 -130`, msk, 12) + hand(22, -130, msk) + stroke("M40 -150L52 -128", msk, 12) + hand(52, -128, msk))));

  // L'infirmière (blouse, gele) : la main gauche soutient le bras, la droite tient une petite seringue
  const N = { x: 414, y: 530, s: 1 }, nsk = SKIN.s4;
  const syr = (hx, hy) => `<g transform="translate(${f(hx)} ${f(hy)}) rotate(14)">${rect(-12, -1.2, 6, 2.4, C.grey)}${rect(-14, -4, 2, 8, C.grey)}${rect(-6, -3.4, 18, 6.8, C.white, ' rx="1.5"')}${rect(1, -3.4, 9, 6.8, C.blue, ' opacity=".55"')}${stroke("M12 0H17", C.grey, 1.2)}</g>` + hand(hx - 1, hy + 1, nsk, 6.5);
  g.push(G(shadow(N.x, N.y, 40), person({ ...N, flip: true, skin: nsk, coat: { inner: C.green }, hair: { type: "gele", color: C.indigo, wax: "wax1" }, legs: "skirt", bottom: C.indigo, face: "smile",
    arms: { l: [[-6, -150], [66, -164]], r: [[52, -176], [86, -182]] }, rhand: syr })));

  // La file des mamans, bébés au dos
  const Q = [
    { x: 680, y: 530, s: 0.8, skin: SKIN.s5, baby: SKIN.s4, o: { robe: "kaba", top: C.green, wax: "kitenge", hair: { type: "gele", color: C.ocre, wax: "kente" }, face: "smile" }, wrap: [C.terra, "wax1"] },
    { x: 732, y: 506, s: 0.68, skin: SKIN.s2, baby: SKIN.s3, o: { robe: "dress", top: C.indigo, wax: "wax3", hair: { type: "foulard", color: C.green, wax: "wax1" }, face: "talk" }, wrap: [C.ocre, "wax2"] },
  ];
  for (const q of Q.reverse()) g.push(G(shadow(q.x, q.y, 34 * q.s / 0.8), at(q.x, q.y, q.s, true, babyHead(q.baby)), person({ x: q.x, y: q.y, s: q.s, flip: true, skin: q.skin, ...q.o }), at(q.x, q.y, q.s, true, babyWrap(q.wrap[0], q.wrap[1], q.baby))));

  return frame(g.join(""), C.sky);
}

/* ---------- Scène 2 : les résultats du bac ---------- */
function resultats() {
  const g = [];
  g.push(G(rect(0, 0, 800, 450, C.white), rect(0, 0, 800, 450, C.ocre, ' opacity=".12"')));
  g.push(cloud(470, 60, 0.6), cloud(110, 50, 0.7));
  g.push(G(rect(0, 440, 800, 160, C.sand2), rect(0, 440, 800, 160, C.rose, ' opacity=".2"'), rect(0, 440, 800, 8, C.wood2, ' opacity=".2"')));
  // Le lycée : un étage, coursive, fenêtres claustra
  const bays = [...Array(6)].map((_, i) => { const x = 372 + i * 68; return rect(x, 222, 44, 48, "#2A1E17") + rect(x, 322, 44, 48, "#2A1E17") + stroke(`M${x + 22} 222V270M${x + 22} 322V370`, C.cream, 3); }).join("");
  g.push(G(rect(350, 196, 430, 250, C.cream), rect(350, 196, 430, 250, C.green, ' opacity=".12"'), rect(350, 286, 430, 12, C.green, ' opacity=".55"'), rect(350, 400, 430, 46, C.green, ' opacity=".25"'), bays,
    `<path d="M336 200L366 170H766L796 200Z" fill="${C.terra}"/>`, rect(332, 198, 468, 7, C.wood2)));
  // Arbres de la cour
  const tree = (x, y, s) => G(`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-8 0Q-4 -60 -10 -110H10Q4 -60 8 0Z" fill="${C.wood2}"/><circle cx="-36" cy="-130" r="42" fill="${C.leaf2}"/><circle cx="30" cy="-140" r="46" fill="${C.leaf}"/><circle cx="-4" cy="-180" r="44" fill="${C.leaf2}"/><circle cx="14" cy="-112" r="30" fill="${C.leaf}"/></g>`);
  g.push(tree(330, 446, 1.05));
  // Le mât et le drapeau
  g.push(G(stroke("M596 446V44", C.grey, 5), `<circle cx="596" cy="42" r="5" fill="${C.steel}"/>`, flag(598, 50, 64), rect(584, 438, 24, 10, C.grey, ' rx="2"')));

  // Le tableau d'affichage : cadre en bois, auvent, feuilles de résultats (lignes grises, rien de lisible)
  const sheets = [];
  for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) {
    const x = 82 + c * 82, y = 222 + r * 92, rot = ((r * 3 + c) % 3 - 1) * 1.5;
    sheets.push(`<g transform="rotate(${rot} ${x + 33} ${y + 38})">${rect(x, y, 66, 78, C.white)}${rect(x + 8, y + 8, 30, 5, C.grey, ' opacity=".7"')}${[...Array(7)].map((_, i) => rect(x + 8, y + 20 + i * 7.5, 50 - ((i * 7) % 3) * 8, 2.6, C.grey, ' opacity=".4"')).join("")}<circle cx="${x + 33}" cy="${y + 4}" r="3" fill="${C.red}"/></g>`);
  }
  g.push(G(rect(70, 388, 10, 86, C.wood2), rect(324, 388, 10, 86, C.wood2), `<path d="M48 204L70 184H334L356 204Z" fill="${C.terra}"/>`, rect(58, 202, 288, 194, C.wood, ' rx="4"'), rect(68, 212, 268, 174, C.sand2),
    `<clipPath id="resultats-tab"><rect x="68" y="212" width="268" height="174"/></clipPath>`, `<g clip-path="url(#resultats-tab)">${sheets.join("")}</g>`));

  // Deux élèves de dos qui cherchent leur nom (l'un pointe une feuille du doigt)
  g.push(G(shadow(140, 546, 32), person({ x: 140, y: 546, s: 0.86, view: "back", skin: SKIN.s3, hair: { type: "short" }, top: C.white, sleeve: "short", bottom: C.indigo,
    arms: { r: [[46, -214], [58, -248]] }, point: [60, -280] })));
  g.push(G(shadow(262, 550, 34), person({ x: 262, y: 550, s: 0.86, view: "back", skin: SKIN.s5, hair: { type: "boxbraids", beads: C.ocre }, top: C.green, wax: "kitenge", legs: "skirt", bottom: C.indigo,
    arms: { l: [[-40, -160], [-24, -128]] } })));

  // La lycéenne qui saute de joie (pieds en l'air), bras levés
  const J = { x: 436, y: 500, s: 0.9 };
  g.push(G(shadow(436, 552, 38), person({ ...J, skin: SKIN.s2, hair: { type: "boxbraids", beads: C.ocre }, top: C.terra, wax: "wax1", sleeve: "short", legs: "skirt", bottom: C.indigo, face: "laugh",
    arms: { l: [[-48, -222], [-62, -262]], r: [[48, -222], [62, -262]] } })));
  // Son amie qui la prend dans ses bras
  const F = { x: 520, y: 548, s: 0.88 }, fsk = SKIN.s4;
  g.push(G(shadow(F.x, F.y, 34), person({ ...F, flip: true, skin: fsk, hair: { type: "bantu" }, top: C.ocre, wax: "wax3", sleeve: "short", robe: "dress", face: "laugh",
    arms: { l: [[10, -160], [70, -172]], r: [[50, -190], [76, -206]] } })));
  // Le garçon qui appelle sa mère, téléphone à l'oreille, l'autre poing serré de joie
  const B = { x: 612, y: 548, s: 0.92 };
  const bsk = SKIN.s4, tel = (hx, hy) => `<g transform="translate(${f(hx + 3)} ${f(hy - 2)}) rotate(-6)">${rect(-6, -26, 12, 30, C.blue, ' rx="3"')}${rect(-4, -23, 8, 20, C.sky, ' rx="1"')}</g>` + hand(hx, hy + 2, bsk, 7);
  g.push(G(shadow(B.x, B.y, 34), person({ ...B, skin: bsk, hair: { type: "short" }, top: C.indigo, dashiki: C.ocre, bottom: C.dark, face: "talk",
    arms: { l: [[-50, -190], [-28, -222]], r: [[46, -170], [52, -214]] }, lhand: tel })));
  // Le parent fier (kaba en ndop, gele), les mains jointes sur le cœur
  const P = { x: 698, y: 550, s: 0.92 };
  g.push(G(shadow(P.x, P.y, 42), person({ ...P, flip: true, skin: SKIN.s3, robe: "kaba", top: "#1C2756", wax: "ndop", hair: { type: "gele", color: C.ocre, wax: "kente" }, face: "smile",
    arms: { l: [[-34, -158], [-6, -176]], r: [[34, -158], [6, -176]] } })));

  // La bulle : une étoile au-dessus de la lycéenne, et des confettis
  const star = `<path d="M0 -15L4.4 -5.4L15 -4.6L7 2.6L9.3 13L0 7.6L-9.3 13L-7 2.6L-15 -4.6L-4.4 -5.4Z" fill="${C.white}"/>`;
  g.push(G(bubble(436, 116, star, C.ocre)));
  g.push(G([[386, 196, C.terra, 20], [494, 188, C.green, -30], [366, 150, C.indigo, 50], [510, 146, C.red, 10], [404, 70, C.green, -10], [470, 60, C.terra, 40]].map(([x, y, c, r]) => rect(x, y, 10, 5, c, ` transform="rotate(${r} ${x} ${y})"`)).join("")));

  return frame(g.join(""), C.cream);
}

/* ---------- Scène 3 : la pause au maquis ---------- */
function maquis() {
  const g = [];
  // Mur peint du maquis, carrelage du sol
  g.push(G(rect(0, 0, 800, 430, C.cream), rect(0, 120, 800, 310, C.ocre, ' opacity=".28"'), rect(0, 330, 800, 100, C.green, ' opacity=".45"'), rect(0, 326, 800, 6, C.green, ' opacity=".7"')));
  g.push(G(rect(0, 430, 800, 170, C.sand), `<path d="${[...Array(6)].map((_, i) => `M0 ${452 + i * 26}H800`).join("")}${[...Array(10)].map((_, i) => `M${40 + i * 80} 430L${f(-60 + i * 102)} 600`).join("")}" stroke="${C.sand2}" stroke-width="2"/>`));
  // Ardoise du menu : poulet, poisson, plantain, jus (pictogrammes à la craie), et des points pour les prix
  const ch = "#F4F1EA";
  g.push(G(rect(560, 154, 150, 120, C.wood, ' rx="4"'), rect(568, 162, 134, 104, C.dark), `<clipPath id="maquis-ard"><rect x="568" y="162" width="134" height="104"/></clipPath>`,
    `<g clip-path="url(#maquis-ard)" fill="none" stroke="${ch}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M588 196Q578 184 590 176Q604 172 604 186Q602 194 594 198Z"/><path d="M594 198L600 206"/><circle cx="600" cy="210" r="2.4"/><circle cx="604" cy="206" r="2.4"/>` +
    `<path d="M582 240Q596 226 612 240Q596 254 582 240ZM612 240L620 233V247Z"/>` +
    `<path d="M640 196Q652 172 670 178Q656 184 646 200Z"/>` +
    `<path d="M650 228H660L662 236V254H648V236Z"/><path d="M652 228V222H658V228"/>` +
    `<path d="M612 188H628M612 248H628M676 190H690M674 244H690" stroke="${C.yellow}" stroke-dasharray="1 5"/></g>`));
  // L'étagère du mur : piles d'assiettes, calebasses, bassine émaillée
  g.push(G(rect(280, 206, 200, 8, C.wood), stroke("M296 214L304 228M464 214L456 228", C.wood2, 4), rect(296, 186, 36, 4, C.white), rect(296, 192, 36, 4, C.sand), rect(296, 198, 36, 4, C.white), rect(296, 202, 36, 4, C.sand),
    `<path d="M346 206Q346 180 368 180Q390 180 390 206Z" fill="${C.wood}"/>${stroke("M352 194H384", C.wood2, 2)}<path d="M398 206Q398 188 414 188Q430 188 430 206Z" fill="${C.ocre}"/>`, `<path d="M436 192H474L468 206H442Z" fill="${C.blue}"/>`, stroke("M438 194H472", C.white, 2)));
  // Auvent rayé à festons et ses poteaux
  const stripes = [...Array(14)].map((_, i) => rect(i * 60, 0, 30, 104, C.white)).join("");
  g.push(G(rect(22, 100, 12, 340, C.wood2), rect(766, 100, 12, 340, C.wood2), rect(0, 0, 800, 104, C.terra), stripes,
    [...Array(20)].map((_, i) => `<path d="M${i * 40} 102Q${i * 40 + 20} 132 ${i * 40 + 40} 102Z" fill="${i % 2 ? C.white : C.terra}"/>`).join(""), rect(0, 100, 800, 6, "rgba(0,0,0,.12)")));
  // Une ampoule au fil
  g.push(G(stroke("M470 106V138", C.dark, 2), `<path d="M464 138H476L478 146H462Z" fill="${C.dark}"/><circle cx="470" cy="154" r="9" fill="${C.yellow}"/>`));

  // Le coin cuisine : grande marmite sur trois pierres, petite marmite sur un foyer à charbon
  const flames = `<path d="M70 498Q62 482 72 470Q74 482 80 484Q78 470 90 460Q92 478 100 482Q104 470 112 468Q118 484 110 498Z" fill="${C.ocre}"/><path d="M80 498Q78 488 86 480Q90 490 96 488Q98 480 104 478Q108 490 102 498Z" fill="${C.yellow}"/>`;
  const steam = (x, y) => stroke(`M${x} ${y}Q${x - 10} ${y - 16} ${x} ${y - 30}Q${x + 10} ${y - 44} ${x} ${y - 58}`, C.white, 4, ' opacity=".8"');
  g.push(G(stroke("M56 512L120 492M60 494L124 512", C.wood2, 8), flames, `<ellipse cx="62" cy="504" rx="14" ry="10" fill="${C.grey}"/><ellipse cx="128" cy="504" rx="14" ry="10" fill="${C.grey}"/><ellipse cx="96" cy="512" rx="14" ry="9" fill="${C.steel}"/>`,
    `<path d="M50 420H142Q150 460 132 476H60Q42 460 50 420Z" fill="${C.dark}"/>`, `<ellipse cx="96" cy="420" rx="48" ry="9" fill="${C.grey}"/>`, `<ellipse cx="96" cy="416" rx="40" ry="6" fill="${C.dark}"/>`, rect(90, 404, 12, 8, C.dark, ' rx="3"'),
    stroke("M44 432Q36 432 38 442M148 432Q156 432 154 442", C.dark, 4), steam(80, 396), steam(112, 390)));
  g.push(G(`<path d="M154 470H214L206 526H162Z" fill="${C.grey}"/>`, rect(158, 480, 52, 6, C.dark, ' opacity=".4"'), `<ellipse cx="184" cy="470" rx="32" ry="6" fill="${C.dark}"/>`, `<circle cx="174" cy="468" r="4" fill="${C.red}"/><circle cx="190" cy="469" r="4" fill="${C.ocre}"/>`,
    `<path d="M156 428H212Q216 456 204 466H164Q152 456 156 428Z" fill="${C.steel}"/>`, `<ellipse cx="184" cy="428" rx="30" ry="6" fill="${C.grey}"/>`, stroke("M150 438H218", C.grey, 3), steam(184, 412)));

  // Assiettes : poulet DG (morceaux dorés, plantains, carottes), ndolé (vert, crevettes), plantains frits
  const dg = (x, y, s = 1) => `<g transform="translate(${f(x)} ${f(y)}) scale(${s})"><ellipse cx="0" cy="0" rx="30" ry="8" fill="${C.white}"/><ellipse cx="0" cy="-1" rx="22" ry="5" fill="${C.sand}"/>` +
    `<path d="M-18 -2Q-16 -14 -6 -12Q0 -16 6 -10Q16 -14 18 -2Z" fill="${C.ocre}"/><ellipse cx="-8" cy="-8" rx="7" ry="5" fill="${C.wood}"/><ellipse cx="7" cy="-9" rx="6" ry="5" fill="${C.wood}"/>` +
    `<rect x="-14" y="-6" width="9" height="4" rx="2" fill="${C.yellow}"/><rect x="2" y="-5" width="9" height="4" rx="2" fill="${C.yellow}"/><circle cx="-1" cy="-12" r="2" fill="${C.red}"/><circle cx="12" cy="-4" r="2" fill="${C.terra}"/><circle cx="-14" cy="-10" r="1.8" fill="${C.leaf}"/></g>`;
  const ndole = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-24 -10H24Q22 6 0 8Q-22 6 -24 -10Z" fill="${C.white}"/><ellipse cx="0" cy="-10" rx="24" ry="6" fill="${C.leaf2}"/><circle cx="-8" cy="-11" r="2" fill="${C.rose}"/><circle cx="6" cy="-9" r="2" fill="${C.rose}"/><circle cx="-1" cy="-13" r="1.4" fill="${C.cream}"/><circle cx="12" cy="-12" r="1.4" fill="${C.cream}"/></g>`;
  const plantains = (x, y) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="0" rx="26" ry="7" fill="${C.white}"/>${[[-12, -4, -20], [-2, -6, 10], [9, -4, -10], [2, -2, 30]].map(([px, py, r]) => `<ellipse cx="${px}" cy="${py}" rx="8" ry="3.6" fill="${C.ocre}" transform="rotate(${r} ${px} ${py})"/>`).join("")}</g>`;
  const bottle = (x, y, col, s = 1) => `<g transform="translate(${f(x)} ${f(y)}) scale(${s})"><path d="M-7 0V-26Q-7 -32 -3 -36V-44H3V-36Q7 -32 7 -26V0Z" fill="${col}"/><path d="M-7 0V-26Q-7 -32 -3 -36V-44H3V-36Q7 -32 7 -26V0Z" fill="${C.white}" opacity=".18"/>${rect(-3.5, -48, 7, 5, C.grey, ' rx="1"')}${rect(-4, -24, 3, 18, C.white, ' opacity=".45" rx="1.5"')}</g>`;
  const glass = (x, y, col) => `<path d="M${x - 6} ${y - 18}H${x + 6}L${x + 5} ${y}H${x - 5}Z" fill="${C.white}" opacity=".7"/><path d="M${x - 5.6} ${y - 12}H${x + 5.6}L${x + 5} ${y}H${x - 5}Z" fill="${col}"/>`;

  // Les clients derrière la table : une femme en tailleur (nattes) et un homme en chemise wax qui raconte
  const A = { x: 384, y: 544, s: 0.9 }, ask = SKIN.s4;
  g.push(G(person({ ...A, legs: "none", skin: ask, hair: { type: "nattes" }, jacket: { color: C.indigo, shirt: C.white }, top: C.indigo, face: "laugh",
    arms: { l: [[-42, -150], [-24, -118]], r: [[44, -160], [30, -192]] }, rhand: (hx, hy) => glass(hx + 2, hy + 6, C.red) + hand(hx, hy, ask) })));
  const Bm = { x: 480, y: 544, s: 0.92 }, bsk = SKIN.s1;
  g.push(G(person({ ...Bm, legs: "none", skin: bsk, beard: true, hair: { type: "short" }, top: C.ocre, wax: "wax2", sleeve: "short", face: "talk",
    arms: { l: [[-44, -156], [-34, -118]], r: [[48, -170], [56, -214]] } })));
  // Le client assis au bout de la table, en chemise et cravate, qui rit, sur sa chaise en plastique
  const Cc = { x: 612, y: 546, s: 0.92 }, csk = SKIN.s3;
  const chair = (x, y, s, col) => G(at(x, y, s, true, `<path d="M-36 -200Q-36 -214 -22 -214H-12Q-4 -214 -4 -200L-8 -104H-32Z" fill="${col}"/><path d="M-38 -104H66L60 -92H-34Z" fill="${col}"/>${stroke("M-30 -94L-36 -2M56 -94L62 -2", col, 8)}<path d="M-38 -104H66L60 -92H-34Z" fill="rgba(0,0,0,.12)"/>`));
  g.push(shadow(Cc.x - 10, Cc.y, 50), chair(Cc.x, Cc.y, Cc.s, C.red));
  g.push(G(person({ ...Cc, flip: true, legs: "sit", skin: csk, hair: { type: "short" }, jacket: { color: C.white, shirt: C.white, tie: C.terra }, top: C.white, bottom: C.dark, face: "laugh",
    arms: { l: [[-40, -150], [-4, -160]], r: [[44, -156], [60, -170]] } })));

  // La table en plastique, nappe en wax, et le repas
  g.push(G(shadow(440, 548, 140), rect(322, 452, 8, 92, C.steel), rect(554, 452, 8, 92, C.steel), `<path d="M318 418H566L574 432H310Z" fill="${C.green}"/>`, `<path d="M318 418H566L574 432H310Z" fill="url(#wax1)"/>`,
    `<path d="M310 432H574L568 470Q442 478 316 470Z" fill="${C.green}"/>`, `<path d="M310 432H574L568 470Q442 478 316 470Z" fill="url(#wax1)"/>`, rect(310, 432, 264, 4, "rgba(0,0,0,.15)")));
  g.push(G(dg(372, 428, 0.9)), G(ndole(430, 430)), G(plantains(492, 428)), G(bottle(536, 430, C.red, 0.8), glass(552, 432, C.red)), G(bottle(456, 428, C.yellow, 0.8), glass(404, 432, C.yellow)));
  // Les mains des clients posées sur la table, par-dessus
  g.push(G(hand(A.x - 24 * A.s, A.y - 118 * A.s, ask, 7.5 * A.s), hand(Bm.x - 34 * Bm.s, Bm.y - 118 * Bm.s, bsk, 7.5 * Bm.s)));

  // La tenancière (kaba, foulard), qui pose une assiette de poulet DG sur la table
  const T = { x: 262, y: 548, s: 1 }, tsk = SKIN.s2;
  const plate = (hx, hy) => dg(hx + 6, hy - 6, 0.9) + hand(hx, hy, tsk, 7);
  g.push(G(shadow(T.x, T.y, 56), person({ ...T, skin: tsk, robe: "kaba", top: C.terra, wax: "wax3", hair: { type: "foulard", color: C.ocre, wax: "wax2" }, face: "smile",
    arms: { l: [[-42, -150], [-30, -110]], r: [[52, -160], [86, -144]] }, rhand: plate })));

  // Le serveur, plateau de jus (bissap, gingembre) levé sur la main, une bouteille dans l'autre
  const W = { x: 704, y: 552, s: 0.86 }, wsk = SKIN.s5;
  const tray = (hx, hy) => `<ellipse cx="${hx}" cy="${hy - 6}" rx="32" ry="5" fill="${C.steel}"/>` + bottle(hx - 16, hy - 8, C.red, 0.8) + bottle(hx, hy - 8, C.yellow, 0.8) + bottle(hx + 16, hy - 8, C.red, 0.8) + hand(hx, hy, wsk);
  g.push(G(shadow(W.x, W.y, 34), person({ ...W, flip: true, skin: wsk, hair: { type: "locks" }, top: C.green, dashiki: C.ocre, sleeve: "short", bottom: C.dark, legs: "walk", face: "smile",
    arms: { l: [[-44, -150], [-40, -112]], r: [[50, -206], [44, -244]] }, rhand: tray, lhand: (hx, hy) => bottle(hx, hy + 30, C.yellow, 0.8) + hand(hx, hy, wsk) })));

  return frame(g.join(""), C.cream);
}

export default [
  { id: "vaccination", fr: "Journée de vaccination", en: "Vaccination day", tags: ["vaccination", "vaccin", "vaccine", "santé", "health", "infirmière", "nurse", "enfant", "child", "mère", "mother", "bébé", "baby", "école", "school", "tente", "tent", "prévention", "prevention"], draw: vaccination },
  { id: "resultats", fr: "Les résultats du bac", en: "Exam results day", tags: ["résultats", "results", "bac", "examen", "exam", "lycée", "high school", "élèves", "students", "joie", "joy", "réussite", "success", "parents", "téléphone", "phone", "drapeau", "flag"], draw: resultats },
  { id: "maquis", fr: "La pause au maquis", en: "Lunch break at the maquis", tags: ["maquis", "restaurant", "déjeuner", "lunch", "pause", "break", "poulet DG", "plantain", "ndolé", "cuisine", "food", "collègues", "colleagues", "jus", "juice", "bissap", "rue", "street"], draw: maquis },
];
