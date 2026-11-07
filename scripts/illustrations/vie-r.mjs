// Scènes : la ferme avicole, le fumage du poisson, le retour au pays à l'aéroport.
import { C, SKIN, person, frame, palm, cloud, bubble, check, stroke, f } from "./lib.mjs";
import { flag } from "./flag.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin, r = 7.5) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="${r}" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
const cloth = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");
/** Position dans la scène d'un point local (hx, hy) d'un personnage. */
const toScene = (x, y, s, flip, hx, hy) => [x + (flip ? -hx : hx) * s, y + hy * s];
/** Bottes en caoutchouc par-dessus un pantalon (legs "stand"), repère local. */
const boots = (col) => `<path d="M-24 -64H0V-14H-24Z" fill="${col}"/><path d="M0 -64H24V-14H0Z" fill="${col}"/>` +
  `<ellipse cx="-18" cy="-8" rx="15" ry="7.5" fill="${col}"/><ellipse cx="18" cy="-8" rx="15" ry="7.5" fill="${col}"/>` +
  `<path d="M-24 -64H0V-56H-24ZM0 -64H24V-56H0Z" fill="rgba(0,0,0,.25)"/><path d="M-33 -4H-3V0H-33ZM3 -4H33V0H3Z" fill="${C.dark}" opacity=".6"/>`;

/** Poule de profil vers la droite, pattes au sol en (x,y) ; peck : tête baissée qui picore. */
const hen = (x, y, s, flip, col, peck = false) => at(x, y, s, flip, stroke("M-4 -14L-6 0M6 -14L8 0", C.yellow, 2.5) +
  `<g${peck ? ' transform="rotate(30 0 -16)"' : ""}><path d="M-24 -30Q-34 -50 -20 -46Q-6 -40 4 -36Q18 -48 24 -40Q28 -30 22 -22Q10 -10 -6 -12Q-22 -14 -24 -30Z" fill="${col}"/>` +
  `<path d="M18 -46Q20 -54 24 -48Q26 -54 28 -46Z" fill="${C.red}"/><path d="M28 -40L34 -38L28 -35Z" fill="${C.yellow}"/><path d="M24 -34Q27 -30 25 -27Q22 -30 23 -34Z" fill="${C.red}"/><circle cx="23" cy="-41" r="1.6" fill="${C.dark}"/>` +
  `<path d="M-8 -30Q2 -36 10 -26Q0 -20 -8 -30Z" fill="rgba(0,0,0,.12)"/></g>`);

/** Poisson : centre (x,y), longueur l, rotation r. */
const fish = (x, y, l, r, col, belly) => `<g transform="translate(${f(x)} ${f(y)}) rotate(${r})"><ellipse rx="${f(l / 2)}" ry="${f(l / 5.5)}" fill="${col}"/>` +
  `<path d="M${f(l * 0.42)} 0L${f(l * 0.66)} ${f(-l / 6)}V${f(l / 6)}Z" fill="${col}"/>` + (belly ? `<path d="M${f(-l * 0.4)} ${f(l / 14)}Q0 ${f(l / 5)} ${f(l * 0.36)} ${f(l / 14)}" fill="none" stroke="${belly}" stroke-width="${f(l / 14)}" opacity=".7"/>` : "") +
  `<circle cx="${f(-l * 0.3)}" cy="${f(-l / 20)}" r="${f(Math.max(1.2, l / 22))}" fill="${C.dark}"/></g>`;

/** Poissons réutilisés (<use>) dans la scène du fumage : fumé (deux teintes) et frais ; longueur 30 à l'échelle 1. */
const FISH = { a: [C.wood, C.yellow], b: ["#B7783F", C.yellow], c: [C.steel, C.white] };
const fishDefs = `<defs>${Object.entries(FISH).map(([k, [col, belly]]) => `<g id="fumage-p${k}">${fish(0, 0, 30, 0, col, belly)}</g>`).join("")}</defs>`;
const fu = (x, y, l, r, k) => `<use href="#fumage-p${k}" transform="translate(${f(x)} ${f(y)}) rotate(${r}) scale(${f(l / 30)})"/>`;

/* ---------- Scène 1 : la ferme avicole ---------- */
function poulailler() {
  const g = [];
  // Dehors, vu à travers le grillage : ciel, bananiers, haie
  g.push(rect(0, 100, 800, 250, C.blue, ' opacity=".14"'), cloud(330, 160, 0.7), cloud(560, 140, 0.6));
  g.push(`<path d="M0 350V270Q60 246 120 262Q190 238 260 258Q340 236 420 256Q500 240 580 258Q660 242 740 256L800 250V350Z" fill="${C.leaf}"/>`);
  g.push(`<path d="M0 350V296Q100 280 200 296Q320 282 440 298Q560 284 680 298L800 292V350Z" fill="${C.leaf2}"/>`);
  for (const bx of [250, 520]) g.push(stroke(`M${bx} 300V230`, C.leaf2, 8), `<path d="M${bx} 232Q${bx - 50} 196 ${bx - 64} 222Q${bx - 30} 222 ${bx} 238Z" fill="${C.leaf}"/><path d="M${bx} 230Q${bx + 46} 190 ${bx + 62} 214Q${bx + 30} 220 ${bx} 238Z" fill="${C.leaf2}"/><path d="M${bx} 232Q${bx - 10} 186 ${bx + 6} 170Q${bx + 12} 206 ${bx} 236Z" fill="${C.leaf}"/>`);
  // Le réservoir d'eau dehors, sur son support métallique, et le tuyau qui entre dans le poulailler
  g.push(stroke("M82 236L74 346M158 236L166 346M78 290H162", C.grey, 5));
  g.push(`<path d="M66 150Q66 136 120 134Q174 136 174 150V230Q174 242 120 244Q66 242 66 230Z" fill="${C.blue}"/>`, `<ellipse cx="120" cy="146" rx="54" ry="10" fill="${C.blue}"/><ellipse cx="120" cy="146" rx="54" ry="10" fill="#fff" opacity=".2"/>`);
  g.push(stroke("M70 172Q120 182 170 172M70 206Q120 216 170 206", "rgba(0,0,0,.18)", 3), rect(108, 128, 24, 10, C.dark, ' rx="3" opacity=".7"'), rect(80, 152, 10, 70, "#fff", ' opacity=".18" rx="5"'));
  g.push(stroke("M120 244V330Q120 352 140 352H178", C.grey, 6));
  // Grillage et poteaux
  g.push(`<defs><pattern id="poulailler-grille" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M0 0L16 16M16 0L0 16" stroke="${C.grey}" stroke-width="1.3" opacity=".75"/></pattern></defs>`);
  g.push(rect(0, 100, 800, 250, "url(#poulailler-grille)"));
  for (const px of [0, 196, 400, 604, 796]) g.push(rect(px - 6, 100, 12, 250, C.steel), rect(px - 6, 100, 4, 250, "#fff", ' opacity=".35"'));
  // Toit de tôle vu de dessous, charpente métallique et lampes
  g.push(rect(0, 0, 800, 92, C.steel), rect(0, 0, 800, 92, C.grey, ' opacity=".25"'));
  for (let x = 8; x < 800; x += 22) g.push(stroke(`M${x} 0V92`, "#fff", 3, ' opacity=".25"'));
  g.push(rect(0, 88, 800, 16, C.grey), stroke("M0 92L100 40L200 92L300 40L400 92L500 40L600 92L700 40L800 92", C.grey, 5), stroke("M0 40H800", C.grey, 6));
  for (const lx of [300, 700]) g.push(stroke(`M${lx} 40V70`, C.dark, 2), `<path d="M${lx - 14} 82Q${lx} 64 ${lx + 14} 82Z" fill="${C.dark}"/><circle cx="${lx}" cy="84" r="6" fill="${C.yellow}"/><circle cx="${lx}" cy="88" r="20" fill="${C.yellow}" opacity=".15"/>`);
  // Muret en béton et sol de copeaux
  g.push(rect(0, 344, 800, 92, C.white), rect(0, 344, 800, 8, C.sand2), rect(0, 418, 800, 18, C.sand2, ' opacity=".7"'));
  g.push(stroke("M140 352H800", C.grey, 5, ' opacity=".7"'));
  // Rampe d'abreuvoirs à tétine le long du muret
  for (let x = 230; x < 590; x += 46) g.push(stroke(`M${x} 352V364`, C.grey, 3), `<circle cx="${x}" cy="366" r="3.5" fill="${C.red}"/>`);
  g.push(rect(0, 434, 800, 166, C.sand), rect(0, 434, 800, 166, C.sand2, ' opacity=".5"'));
  g.push(stroke([...Array(40)].map((_, i) => `M${(i * 157) % 790 + 6} ${448 + ((i * 53) % 148)}l9 -2`).join(""), C.wood, 2.4, ' opacity=".35"'));
  // Pondoirs en bois contre le mur, à droite : paille, œufs, une poule qui couve
  g.push(rect(586, 300, 196, 132, C.wood2, ' rx="4"'), `<path d="M578 300L594 282H774L790 300Z" fill="${C.wood}"/>`);
  for (const [r, yy] of [[0, 308], [1, 370]]) for (let k = 0; k < 4; k++) {
    const nx = 596 + k * 46;
    g.push(rect(nx, yy, 40, 52, C.dark, ' opacity=".55" rx="3"'), `<path d="M${nx} ${yy + 52}Q${nx + 20} ${yy + 32} ${nx + 40} ${yy + 52}Z" fill="${C.yellow}"/>`);
    if ((k + r) % 2 === 0) g.push(`<ellipse cx="${nx + 14}" cy="${yy + 44}" rx="5" ry="6.5" fill="${C.cream}"/><ellipse cx="${nx + 26}" cy="${yy + 46}" rx="5" ry="6.5" fill="${C.white}"/>`);
  }
  g.push(rect(586, 360, 196, 10, C.wood), rect(586, 422, 196, 10, C.wood));
  g.push(hen(640, 362, 0.8, false, C.wood));
  // Mangeoire suspendue (tube et assiette) et abreuvoir rouge
  g.push(stroke("M470 104V420", C.grey, 2), rect(456, 420, 28, 84, C.red, ' rx="4"'), `<path d="M430 520Q470 496 510 520L506 528H434Z" fill="${C.red}"/><path d="M438 512Q470 500 502 512" stroke="${C.yellow}" stroke-width="5" fill="none"/>`);
  // Sacs de grain empilés, un sac ouvert
  const sack = (x, y, w, h, band) => `<path d="M${x} ${y + 8}Q${x} ${y} ${x + 8} ${y}H${x + w - 8}Q${x + w} ${y} ${x + w} ${y + 8}V${y + h - 6}Q${x + w / 2} ${y + h + 4} ${x} ${y + h - 6}Z" fill="${C.sand2}"/><path d="M${x + 3} ${y + 9}Q${x + 3} ${y + 3} ${x + 9} ${y + 3}H${x + w - 9}Q${x + w - 3} ${y + 3} ${x + w - 3} ${y + 9}V${y + h - 8}Q${x + w / 2} ${y + h} ${x + 3} ${y + h - 8}Z" fill="${C.cream}"/>` +
    rect(x, y + h * 0.4, w, h * 0.18, band) + `<path d="M${x} ${y + 8}Q${x + w / 2} ${y + 16} ${x + w} ${y + 8}" stroke="${C.sand2}" stroke-width="3" fill="none"/>`;
  g.push(sack(30, 470, 92, 62, C.green), sack(30, 418, 92, 56, C.terra), sack(44, 370, 86, 52, C.green));
  g.push(sack(110, 500, 78, 70, C.terra), `<ellipse cx="149" cy="502" rx="38" ry="9" fill="${C.yellow}"/>`, [...Array(10)].map((_, i) => `<circle cx="${122 + i * 6}" cy="${499 + (i % 3) * 2}" r="2" fill="${C.wood}" opacity=".5"/>`).join(""));

  // L'éleveuse : foulard, bottes, seau de grain à la main gauche, elle lance le grain de la main droite
  const ex = 270, ey = 566, es = 1.02, esk = SKIN.s4;
  g.push(person({ x: ex, y: ey, s: es, skin: esk, hair: { type: "foulard", color: C.terra, wax: "wax1" }, top: C.green, wax: "wax3", bottom: C.wood2, face: "laugh",
    arms: { l: [[-42, -150], [-46, -112]], r: [[54, -176], [92, -196]] },
    lhand: (hx, hy) => `<path d="M${hx - 17} ${hy + 10}H${hx + 17}L${hx + 13} ${hy + 46}H${hx - 13}Z" fill="${C.indigo}"/><ellipse cx="${hx}" cy="${hy + 10}" rx="17" ry="4" fill="${C.yellow}"/>` +
      stroke(`M${hx - 16} ${hy + 10}Q${hx} ${hy - 12} ${hx + 16} ${hy + 10}`, C.grey, 2.5) + hand(hx, hy - 1, esk) }));
  g.push(at(ex, ey, es, false, boots(C.green) + stroke("M-30 -150H30", C.wood2, 0)));
  // Le grain qui vole
  const [gx, gy] = toScene(ex, ey, es, false, 98, -198);
  for (let i = 0; i < 22; i++) { const t = i / 21, px = gx + 6 + t * 120 + ((i * 7) % 9) - 4, py = gy - 6 + t * t * 260 - Math.sin(t * 3.14) * 36 + ((i * 11) % 13) - 6; g.push(`<circle cx="${f(px)}" cy="${f(py)}" r="${i % 3 ? 2.6 : 3.2}" fill="${i % 2 ? C.yellow : C.wood}"/>`); }
  for (let i = 0; i < 12; i++) g.push(`<ellipse cx="${330 + ((i * 37) % 110)}" cy="${544 + ((i * 13) % 26)}" rx="2.6" ry="1.8" fill="${C.yellow}"/>`);

  // La stagiaire à la tablette : elle note les chiffres de la ponte
  const tx = 540, ty = 570, tsk = SKIN.s5;
  g.push(person({ x: tx, y: ty, s: 0.98, skin: tsk, hair: { type: "bantu" }, top: C.ocre, wax: "kitenge", bottom: C.indigo, face: "talk",
    arms: { l: [[-38, -152], [-14, -148]], r: [[40, -156], [16, -170]] } }));
  g.push(at(tx, ty, 0.98, false, boots(C.dark) +
    `<g transform="rotate(-8 -6 -170)"><rect x="-38" y="-200" width="58" height="42" rx="5" fill="${C.dark}"/><rect x="-34" y="-196" width="50" height="34" rx="2" fill="${C.white}"/>` +
    [[-29, 10], [-21, 16], [-13, 13], [-5, 22], [3, 19]].map(([bx, bh]) => rect(bx, -166 - bh, 6, bh, C.green)).join("") + stroke("M-30 -178L-18 -184L-8 -180L8 -190", C.terra, 2) + `</g>` +
    hand(-14, -150, tsk) + stroke("M16 -170L4 -182", C.dark, 2.5) + hand(16, -170, tsk)));

  // Le collègue : il porte une pile de plateaux d'œufs
  const mx = 690, my = 572, ms = 1.04, msk = SKIN.s1;
  g.push(person({ x: mx, y: my, s: ms, flip: true, skin: msk, hair: { type: "short" }, beard: true, top: C.indigo, dashiki: C.ocre, bottom: C.wood2, face: "laugh",
    arms: { l: [[-44, -158], [-44, -134]], r: [[44, -158], [44, -134]] } }));
  const trays = [];
  for (let k = 0; k < 4; k++) {
    const yy = -128 - k * 12;
    trays.push(`<path d="M-50 ${yy}H50L46 ${yy + 10}H-46Z" fill="${C.sand2}"/>`);
    if (k < 3) for (let i = 0; i < 6; i++) trays.push(`<ellipse cx="${-40 + i * 16}" cy="${yy - 2}" rx="6" ry="4" fill="${i % 2 ? C.cream : C.white}"/>`);
  }
  for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) trays.push(`<ellipse cx="${-40 + i * 16 + j * 4}" cy="${-170 - j * 7}" rx="6.2" ry="7.5" fill="${(i + j) % 2 ? C.cream : C.white}"/>`);
  g.push(at(mx, my, ms, true, boots(C.dark) + trays.join("") + hand(-48, -134, msk) + hand(48, -134, msk)));

  // Les poules : elles accourent au grain
  for (const [x, y, s, fl, col, pk] of [[340, 546, 1.05, false, C.white, true], [410, 556, 1.15, true, C.wood, true], [366, 578, 1.2, false, C.ocre, false],
    [446, 580, 1.0, true, C.white, true], [214, 580, 1.1, false, C.wood, false], [616, 582, 1.0, true, C.white, true], [496, 540, 0.85, true, C.white, false], [200, 584, 0.9, true, C.white, true]])
    g.push(hen(x, y, s, fl, col, pk));
  // Bulle : la ponte du jour
  g.push(bubble(500, 196, `<ellipse cx="0" cy="2" rx="13" ry="16" fill="${C.white}"/><g transform="translate(10 10) scale(.5)">${check(C.white)}</g>`, C.green));
  return frame(g.join(""), C.cream);
}

/* ---------- Scène 2 : le fumage du poisson ---------- */
function fumage() {
  const g = [fishDefs];
  g.push(rect(0, 0, 800, 230, C.blue, ' opacity=".2"'), `<circle cx="660" cy="80" r="36" fill="${C.yellow}" opacity=".8"/>`, cloud(90, 70, 0.8), cloud(470, 50, 0.6));
  // Mer, rive lointaine et pirogues
  g.push(`<path d="M0 214Q100 200 200 210Q300 196 420 208L440 222H0Z" fill="${C.leaf2}" opacity=".7"/>`);
  g.push(rect(0, 220, 800, 110, C.sky), rect(0, 220, 800, 110, C.blue, ' opacity=".5"'), rect(0, 220, 800, 14, C.blue, ' opacity=".25"'));
  for (const [x, y, w] of [[60, 262, 60], [300, 296, 80], [600, 250, 50], [700, 300, 70]]) g.push(stroke(`M${x} ${y}q${w / 4} -6 ${w / 2} 0t${w / 2} 0`, C.white, 2.5, ' opacity=".6"'));
  const canoe = (x, y, s, col) => at(x, y, s, false, `<path d="M-60 -10Q-30 4 0 4Q30 4 60 -10Q50 8 30 10H-30Q-50 8 -60 -10Z" fill="${col}"/>` + stroke("M-44 -2H44", C.yellow, 3) +
    `<circle cx="-14" cy="-14" r="5" fill="${SKIN.s2}"/>` + stroke("M-14 -10V0", C.white, 6) + `<circle cx="18" cy="-14" r="5" fill="${SKIN.s1}"/>` + stroke("M18 -10V0", C.terra, 6) + stroke("M22 -8L40 8", C.wood2, 2));
  g.push(canoe(180, 250, 0.6, C.green), canoe(520, 268, 0.8, C.terra), canoe(700, 238, 0.45, C.indigo));
  // Plage
  g.push(`<path d="M0 322Q200 308 400 320T800 316V600H0Z" fill="${C.white}" opacity=".6"/>`, `<path d="M0 330Q200 316 400 328T800 324V600H0Z" fill="${C.sand}"/>`);
  g.push(palm(770, 360, 1.2, -20), palm(40, 330, 0.9, 16));
  // Le hangar : toit de tôle sur poteaux, à l'abri du soleil
  g.push(stroke("M70 150V420M330 150V400M560 150V410", C.wood2, 9), `<path d="M30 156L80 112H600L640 156Z" fill="${C.steel}"/>`);
  for (let k = 0; k < 22; k++) g.push(stroke(`M${f(84 + k * 24)} 114L${f(40 + k * 27)} 154`, C.grey, 2, ' opacity=".5"'));
  g.push(rect(30, 154, 610, 6, C.grey));

  // La fumée qui monte des deux fours (dessinée avant la première fumeuse, dont le visage reste dégagé)
  // Chaque colonne : des volutes fondues (un seul groupe translucide), de plus en plus larges et pâles en montant.
  const smoke = (x0, y0, drift, n) => {
    const c = [];
    for (let i = 0; i < n; i++) { const t = i / (n - 1), x = x0 + Math.sin(i * 1.3) * 12 + drift * t, y = y0 - i * 34, r = 16 + t * 22; c.push(`<g opacity="${f(0.62 - t * 0.4)}"><circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}"/><circle cx="${f(x + r * 0.7)}" cy="${f(y + 8)}" r="${f(r * 0.7)}"/></g>`); }
    return `<g fill="${C.white}">${c.join("")}</g>`;
  };
  g.push(smoke(96, 362, -40, 6), smoke(304, 362, 30, 6), smoke(430, 350, -10, 6), smoke(500, 352, 40, 5));

  // Première fumeuse, derrière le grand four : elle retourne la claie
  const ax = 200, ay = 520, as = 1, ask = SKIN.s2;
  g.push(person({ x: ax, y: ay, s: as, skin: ask, hair: { type: "gele", color: C.ocre, wax: "wax3" }, top: C.terra, wax: "wax2", legs: "none", face: "smile",
    arms: { l: [[-48, -158], [-70, -126]], r: [[48, -158], [70, -126]] } }));
  // Le grand four en terre : deux claies de poissons
  const oven = (x, y, w, h, s) => {
    const o = [];
    o.push(`<path d="M${x} ${y}H${x + w}V${y + h}H${x}Z" fill="${C.wood}"/>`, rect(x, y, w, h, C.terra, ' opacity=".25"'), rect(x - 6, y - 8, w + 12, 12, C.wood2, ' rx="3"'));
    o.push(stroke(`M${x + 14} ${y + h * 0.35}H${x + w * 0.4}M${x + w * 0.6} ${y + h * 0.7}H${x + w - 16}`, C.wood2, 2, ' opacity=".4"'));
    for (const k of [0.25, 0.75]) {
      const cx = x + w * k, mw = 26 * s, my = y + h;
      o.push(`<path d="M${cx - mw} ${my}V${my - 26 * s}Q${cx} ${my - 56 * s} ${cx + mw} ${my - 26 * s}V${my}Z" fill="${C.dark}"/>`);
      o.push(`<path d="M${cx - 18 * s} ${my}Q${cx - 16 * s} ${my - 22 * s} ${cx - 6 * s} ${my - 32 * s}Q${cx - 2 * s} ${my - 16 * s} ${cx + 4 * s} ${my - 28 * s}Q${cx + 16 * s} ${my - 16 * s} ${cx + 18 * s} ${my}Z" fill="${C.red}"/>`,
        `<path d="M${cx - 9 * s} ${my}Q${cx - 6 * s} ${my - 14 * s} ${cx} ${my - 18 * s}Q${cx + 8 * s} ${my - 10 * s} ${cx + 9 * s} ${my}Z" fill="${C.yellow}"/>`);
      o.push(stroke(`M${cx - 30 * s} ${my - 2}L${cx + 22 * s} ${my - 10 * s}`, C.wood2, 6 * s));
    }
    return o.join("");
  };
  // Claie vue un peu d'en haut : grillage, poissons couchés en rangs, cadre de bois
  const rack = (x, y, w, n, l) => {
    const o = [`<path d="M${x + 10} ${y - 26}H${x + w - 10}L${x + w} ${y}H${x}Z" fill="${C.dark}" opacity=".6"/>`];
    for (let k = 1; k < 8; k++) o.push(stroke(`M${f(x + 10 + (k * (w - 20)) / 8)} ${y - 26}L${f(x + (k * w) / 8)} ${y}`, C.grey, 1, ' opacity=".6"'));
    for (const [r, yy] of [[0, y - 19], [1, y - 8]]) for (let i = 0; i < n; i++) {
      const fx = x + 12 + r * 6 + i * ((w - 30) / (n - 1)) + (r ? 0 : 4);
      o.push(fu(fx, yy, l, (i + r) % 2 ? 8 : -6, (i + r) % 3 ? "a" : "b"));
    }
    o.push(rect(x - 4, y - 2, w + 8, 8, C.wood2, ' rx="2"'), stroke(`M${x + 10} ${y - 26}H${x + w - 10}`, C.wood2, 4));
    return o.join("");
  };
  g.push(oven(60, 404, 280, 100, 1), rack(66, 400, 268, 8, 30));
  g.push(hand(130, 394, ask), hand(270, 394, ask));

  // Le second four, derrière, qui fume aussi
  g.push(oven(370, 384, 170, 84, 0.8), rack(374, 380, 162, 6, 24));
  // Deuxième fumeuse assise sur un tabouret : elle pousse une bûche dans le foyer
  const bx = 334, by = 572, bs = 0.92, bsk = SKIN.s4;
  g.push(rect(bx - 24, by - 92 * bs, 64, 10, C.wood2, ' rx="3"'), stroke(`M${bx - 18} ${by - 84 * bs}L${bx - 22} ${by}M${bx + 34} ${by - 84 * bs}L${bx + 38} ${by}`, C.wood2, 6));
  g.push(person({ x: bx, y: by, s: bs, skin: bsk, hair: { type: "foulard", color: C.green, wax: "wax1" }, top: C.wood2, wax: "bogolan", robe: "dress", legs: "sit", face: "talk",
    arms: { l: [[-30, -150], [4, -122]], r: [[50, -152], [96, -128]] } }));
  const [lhx, lhy] = toScene(bx, by, bs, false, 96, -128);
  g.push(stroke(`M${f(lhx - 30)} ${f(lhy + 10)}L${f(lhx + 50)} ${f(lhy - 6)}`, C.wood2, 9), `<circle cx="${f(lhx + 52)}" cy="${f(lhy - 6)}" r="5" fill="${C.red}"/>`, hand(lhx, lhy, bsk, 7));
  // Bassine de poissons frais à ses pieds
  g.push(`<path d="M200 540H306L296 588H210Z" fill="${C.steel}"/><ellipse cx="253" cy="540" rx="54" ry="10" fill="${C.grey}"/>`);
  for (const [fx, fy, r] of [[226, 538, -14], [254, 534, 10], [280, 538, -6], [240, 544, 20]]) g.push(fu(fx, fy, 34, r, "c"));

  // La vendeuse derrière ses paniers de poisson fumé, elle tend un paquet à la cliente
  const vx = 574, vy = 562, vs = 1, vsk = SKIN.s3;
  g.push(person({ x: vx, y: vy, s: vs, skin: vsk, hair: { type: "nattes" }, top: C.green, wax: "kitenge", bottom: C.green, bwax: "wax2", legs: "skirt", face: "talk",
    arms: { l: [[-42, -152], [-40, -112]], r: [[52, -170], [88, -166]] } }));
  // Le paquet de poissons fumés (dans du papier) tendu entre les deux mains
  const [px, py] = toScene(vx, vy, vs, false, 88, -166);
  // La cliente, sac à main, elle prend le paquet
  const cx = 704, cy = 566, cs = 1, csk = SKIN.s5;
  g.push(person({ x: cx, y: cy, s: cs, flip: true, skin: csk, hair: { type: "boxbraids", beads: C.ocre }, top: C.terra, wax: "wax1", robe: "dress", face: "laugh",
    arms: { r: [[52, -170], [74, -168]], l: [[-42, -160], [-38, -126]] },
    lhand: (hx, hy) => `<path d="M${hx - 14} ${hy + 4}H${hx + 14}L${hx + 18} ${hy + 34}H${hx - 18}Z" fill="${C.indigo}"/>` + stroke(`M${hx - 9} ${hy + 6}Q${hx} ${hy - 10} ${hx + 9} ${hy + 6}`, C.indigo, 3) + hand(hx, hy, csk) }));
  const [qx, qy] = toScene(cx, cy, cs, true, 74, -168);
  const pm = (px + qx) / 2;
  g.push(fu(pm - 4, py - 14, 26, -14, "b"), fu(pm + 4, py - 12, 26, 10, "a"), `<path d="M${f(px - 8)} ${f(py - 14)}H${f(qx + 8)}L${f(qx + 4)} ${f(py + 16)}H${f(px - 4)}Z" fill="${C.sand2}"/><path d="M${f(px - 8)} ${f(py - 14)}L${f(pm)} ${f(py + 16)}L${f(qx + 8)} ${f(py - 14)}" stroke="${C.wood}" stroke-width="1.5" fill="none" opacity=".45"/>`,
    hand(px, py, vsk), hand(qx, qy, csk));
  // Paniers de poisson fumé au premier plan
  const basket = (x, y, w, col) => { const h = w * 0.42; return `<path d="M${x - w} ${y}A${w} ${f(h)} 0 0 0 ${x + w} ${y}Z" fill="${col}"/>` + rect(x - w - 3, y - 3, 2 * w + 6, 7, C.wood, ' rx="3"') +
    [0.3, 0.55, 0.8].map((d) => { const hw = w * Math.sqrt(1 - d * d); return stroke(`M${f(x - hw + 4)} ${f(y + d * h)}H${f(x + hw - 4)}`, C.wood2, 2, ' opacity=".45"'); }).join(""); };
  const pile = (x, y, w) => [[-0.6, -2, -14], [-0.2, -4, 10], [0.2, -4, -8], [0.6, -2, 12], [-0.4, -14, 6], [0.05, -16, -10], [0.45, -13, 4], [-0.15, -24, 14], [0.25, -25, -6]]
    .map(([dx, dy, r], i) => fu(x + dx * w, y + dy, w * 0.52, r, i % 2 ? "a" : "b")).join("");
  g.push(pile(510, 540, 56), basket(510, 536, 60, C.ocre));
  g.push(pile(112, 548, 62), basket(112, 544, 66, C.ocre));
  return frame(g.join(""), C.white);
}

/* ---------- Scène 3 : le retour au pays ---------- */
function aeroport() {
  const g = [];
  // Plafond et grande baie vitrée sur les pistes
  g.push(rect(0, 0, 800, 44, C.steel), rect(0, 40, 800, 6, C.grey));
  for (const lx of [100, 300, 500, 700]) g.push(rect(lx - 30, 18, 60, 8, C.white, ' rx="4"'));
  const W = { x: 30, y: 70, w: 590, h: 300 };
  g.push(`<clipPath id="aeroport-vitre"><rect x="${W.x}" y="${W.y}" width="${W.w}" height="${W.h}"/></clipPath>`);
  const out = [];
  out.push(rect(W.x, W.y, W.w, W.h, C.sky), rect(W.x, W.y, W.w, W.h * 0.7, C.blue, ' opacity=".25"'), cloud(90, 120, 0.8), cloud(420, 100, 0.6));
  out.push(`<path d="M30 300Q120 286 220 294Q320 282 420 292Q520 284 620 290V320H30Z" fill="${C.leaf}" opacity=".7"/>`, rect(W.x, 312, W.w, 60, C.grey), stroke("M30 340H620", C.white, 3, ' stroke-dasharray="26 18"'));
  // L'avion au sol
  const P = (svg) => `<g transform="translate(300 300)">${svg}</g>`;
  out.push(P(`<path d="M-70 4L-180 -28L-160 -36L-40 -12Z" fill="${C.steel}"/>` +
    `<path d="M-220 -40Q-226 -64 -210 -64H180Q232 -62 244 -40Q232 -20 190 -20H-200Q-216 -22 -220 -40Z" fill="${C.white}"/>` +
    `<path d="M-212 -62L-252 -126H-222L-170 -62Z" fill="${C.terra}"/><path d="M-216 -40H236" stroke="${C.terra}" stroke-width="5"/>` +
    [...Array(14)].map((_, i) => `<rect x="${-150 + i * 22}" y="-56" width="10" height="9" rx="3" fill="${C.indigo}" opacity=".7"/>`).join("") +
    `<path d="M210 -58Q228 -56 236 -46H214Z" fill="${C.indigo}"/>` +
    `<path d="M-40 -28L-120 26H-92L20 -28Z" fill="${C.steel}"/><rect x="-64" y="-4" width="40" height="16" rx="8" fill="${C.grey}"/>` +
    stroke("M-140 -20V4M150 -20V4", C.grey, 6) + rect(-152, 2, 24, 11, C.dark, ' rx="5.5"') + rect(138, 2, 24, 11, C.dark, ' rx="5.5"')));
  g.push(`<g clip-path="url(#aeroport-vitre)">${out.join("")}</g>`);
  for (const mx of [30, 177, 325, 472, 620]) g.push(rect(mx - 5, 64, 10, 312, C.grey));
  g.push(rect(25, 64, 600, 10, C.grey), rect(25, 214, 600, 6, C.grey), rect(25, 368, 600, 10, C.grey));
  // Le mur et les portes coulissantes de la zone d'arrivée, panneau pictogramme
  g.push(rect(625, 46, 175, 380, C.sand), rect(650, 150, 130, 276, C.steel), rect(654, 154, 60, 272, C.sky), rect(716, 154, 60, 272, C.sky), rect(654, 154, 122, 272, C.blue, ' opacity=".2"'));
  g.push(rect(714, 154, 2, 272, C.grey), rect(650, 116, 130, 26, C.dark, ' rx="4"'));
  g.push(`<g transform="translate(690 129) rotate(30)"><path d="M-10 0H10M0 -9L4 0L0 9M-8 -3L-10 0L-8 3" stroke="${C.yellow}" stroke-width="3" fill="none" stroke-linecap="round"/></g>`, stroke("M730 129H760M752 122L760 129L752 136", C.yellow, 3));
  // Sol brillant
  g.push(rect(0, 378, 625, 48, C.white), rect(0, 378, 625, 48, C.sand, ' opacity=".5"'));
  g.push(rect(0, 426, 800, 174, C.white), rect(0, 426, 800, 174, C.sand2, ' opacity=".55"'), rect(0, 426, 800, 6, C.grey, ' opacity=".5"'));
  for (const [x, w] of [[80, 70], [300, 120], [560, 80]]) g.push(rect(x, 440, w, 150, C.white, ' opacity=".35"'));
  // Plantes en pot et voyageur au loin
  const pot = (x, y) => `<path d="M${x - 16} ${y - 30}H${x + 16}L${x + 12} ${y}H${x - 12}Z" fill="${C.terra}"/>` +
    [[-24, -84, C.leaf], [20, -80, C.leaf2], [0, -100, C.leaf]].map(([dx, dy, c]) => `<path d="M${x} ${y - 30}Q${x + dx} ${y + dy * 0.6} ${x + dx * 0.4} ${y + dy}Q${x + dx * 0.2} ${y - 50} ${x} ${y - 30}Z" fill="${c}"/>`).join("");
  g.push(pot(60, 446));

  // Le papa en boubou, la pancarte cœur sur la poitrine
  const fx = 150, fy = 564, fs = 1.04, fsk = SKIN.s2;
  g.push(person({ x: fx, y: fy, s: fs, skin: fsk, hair: { type: "short" }, beard: true, hat: { type: "kufi", color: C.indigo, wax: "wax1" }, robe: "boubou", top: C.white, face: "laugh",
    arms: { l: [[-46, -160], [-44, -134]], r: [[46, -160], [44, -134]] } }));
  g.push(at(fx, fy, fs, false, `<rect x="-52" y="-176" width="104" height="80" rx="6" fill="${C.white}"/><rect x="-52" y="-176" width="104" height="80" rx="6" fill="none" stroke="${C.sand2}" stroke-width="3"/>` +
    `<path d="M0 -106C-34 -128 -34 -162 -16 -164Q-6 -165 0 -152Q6 -165 16 -164C34 -162 34 -128 0 -106Z" fill="${C.red}"/><path d="M-14 -152Q-8 -158 -4 -150" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>` +
    hand(-48, -136, fsk) + hand(48, -136, fsk)));
  // La maman en kaba et gele, les bras grands ouverts
  const mx = 312, my = 566, ms = 1.04;
  g.push(person({ x: mx, y: my, s: ms, skin: SKIN.s3, hair: { type: "gele", color: C.ocre, wax: "kente" }, robe: "kaba", top: C.green, wax: "wax1", face: "laugh",
    arms: { l: [[-60, -194], [-92, -222]], r: [[60, -194], [92, -222]] } }));
  // Le petit frère qui court, le drapeau à la main
  const kx = 438, ky = 572, ks = 0.64, ksk = SKIN.s4;
  g.push(person({ x: kx, y: ky, s: ks, legs: "walk", skin: ksk, hair: { type: "short" }, top: C.yellow, dashiki: C.terra, sleeve: "short", bottom: C.indigo, face: "laugh",
    arms: { r: [[44, -156], [46, -118]], l: [[-52, -196], [-60, -232]] } }));
  const [hx, hy] = toScene(kx, ky, ks, false, -60, -232);
  g.push(stroke(`M${f(hx)} ${f(hy + 8)}V${f(hy - 62)}`, C.wood2, 3), flag(hx + 1, hy - 62, 46), hand(hx, hy, ksk, 5));
  // La jeune femme qui rentre, valise à roulettes, elle ouvre le bras vers sa famille
  const wx = 606, wy = 566, ws = 1.04, wsk = SKIN.s1;
  g.push(person({ x: wx, y: wy, s: ws, flip: true, legs: "walk", skin: wsk, hair: { type: "boxbraids", beads: C.ocre }, top: C.terra, wax: "wax2", bottom: C.blue, face: "laugh",
    arms: { r: [[58, -182], [90, -200]], l: [[-42, -150], [-62, -118]] } }));
  // Sac en bandoulière
  g.push(at(wx, wy, ws, true, stroke("M-20 -204L26 -118", C.wood2, 4) + rect(16, -126, 26, 22, C.wood2, ' rx="4"')));
  const [sx, sy] = toScene(wx, wy, ws, true, -62, -118);
  // Valise : poignée télescopique depuis la main, posée sur ses roulettes au sol (wy)
  const vb = wy - 8, vt = vb - 84, vl = sx + 2;
  g.push(stroke(`M${f(sx)} ${f(sy)}L${f(sx + 6)} ${f(vt)}M${f(sx + 14)} ${f(sy)}L${f(sx + 20)} ${f(vt)}`, C.grey, 3.5), stroke(`M${f(sx - 2)} ${f(sy)}H${f(sx + 16)}`, C.dark, 5));
  g.push(`<rect x="${f(vl)}" y="${f(vt)}" width="64" height="84" rx="10" fill="${C.ocre}"/><rect x="${f(vl)}" y="${f(vt)}" width="64" height="84" rx="10" fill="url(#wax3)" opacity=".45"/>` +
    stroke(`M${f(vl + 18)} ${f(vt + 8)}V${f(vb - 8)}M${f(vl + 46)} ${f(vt + 8)}V${f(vb - 8)}`, "rgba(0,0,0,.2)", 3) + `<circle cx="${f(vl + 10)}" cy="${f(vb + 2)}" r="6" fill="${C.dark}"/><circle cx="${f(vl + 54)}" cy="${f(vb + 2)}" r="6" fill="${C.dark}"/>`);
  g.push(hand(sx, sy, wsk));
  // Petits cœurs au-dessus des retrouvailles
  const heart = (x, y, s, o) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 10C-20 -2 -20 -20 -9 -21Q-3 -21 0 -14Q3 -21 9 -21C20 -20 20 -2 0 10Z" fill="${C.red}" opacity="${o}"/>`;
  g.push(heart(440, 170, 1.2, 0.9), heart(478, 138, 0.8, 0.7), heart(410, 128, 0.6, 0.55));
  return frame(g.join(""), C.sky);
}

export default [
  { id: "poulailler", fr: "La ferme avicole", en: "The poultry farm", tags: ["poulailler", "ferme", "élevage", "volaille", "poules", "œufs", "plateaux", "grain", "éleveuse", "bottes", "tablette", "réservoir", "agriculture", "jeunes", "poultry", "farm", "hens", "chickens", "eggs", "egg trays", "feed", "farmer", "tablet", "water tank"], draw: poulailler },
  { id: "fumage", fr: "Le fumage du poisson", en: "Smoking fish", tags: ["fumage", "poisson fumé", "four", "claie", "fumée", "femmes", "marché", "cliente", "paniers", "pirogues", "plage", "mer", "pêche", "gele", "smoked fish", "smoking", "oven", "smoke", "women", "fish", "customer", "baskets", "canoes", "beach"], draw: fumage },
  { id: "aeroport", fr: "Retour au pays", en: "Coming home", tags: ["aéroport", "retour", "arrivée", "diaspora", "famille", "retrouvailles", "valise", "maman", "papa", "petit frère", "drapeau", "cœur", "avion", "kaba", "gele", "boubou", "airport", "coming home", "arrival", "family", "reunion", "suitcase", "flag", "heart", "plane"], draw: aeroport },
];
