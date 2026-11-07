// Scènes : le match à la télé, la course de la montagne, l'atelier de code pour filles.
import { C, SKIN, person, frame, cloud, stroke, f } from "./lib.mjs";

/** Dessine `svg` (repère local d'un personnage) aux mêmes position, échelle et sens qu'un person(). */
const at = (x, y, s, flip, svg) => `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${svg}</g>`;
const hand = (hx, hy, skin) => `<circle cx="${f(hx)}" cy="${f(hy)}" r="7.5" fill="${skin}"/>`;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${extra}/>`;
const shadow = (x, y, rx) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(rx * 0.18)}" fill="${C.dark}" opacity=".14"/>`;
const TRI = [C.green, C.red, C.yellow];

/** Écharpe de supporter autour du cou (repère local d'un person() de face). */
const scarf = () => stroke("M-22 -202Q0 -188 22 -202", C.green, 9) + stroke("M-10 -196L-14 -150", C.red, 9) + stroke("M-6 -194L-2 -156", C.yellow, 8) +
  stroke("M-17 -150V-143M-14 -150V-142M-11 -150V-143", C.green, 1.6) + stroke("M-5 -156V-149M-2 -156V-148M1 -156V-149", C.yellow, 1.6);

/** Dossard sans texte, épinglé sur la poitrine (repère local). */
const bib = (band = C.indigo) => rect(-15, -176, 30, 24, C.white, ' rx="2"') + rect(-15, -176, 30, 6, band, ' rx="2"') +
  rect(-9, -165, 18, 3.5, C.grey, ' rx="1.5" opacity=".55"') + rect(-9, -159.5, 12, 3, C.grey, ' rx="1.5" opacity=".4"') +
  [[-12, -173], [12, -173], [-12, -155], [12, -155]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.3" fill="${C.steel}"/>`).join("");

/** Short de course par-dessus des jambes nues (repère local, jambes "walk"). */
const shorts = (col) => `<path d="M-27 -122H27L31 -82L8 -78L0 -98L-8 -76L-31 -82Z" fill="${col}"/>` + stroke("M-29 -86L-8 -80M29 -86L8 -82", C.white, 2.4, ' opacity=".7"');

/** Étoile à 5 branches (centre, rayon). */
const star = (cx, cy, r, col) => {
  const p = [];
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.42 : r; p.push(`${f(cx + rr * Math.cos(a))} ${f(cy + rr * Math.sin(a))}`); }
  return `<path d="M${p.join("L")}Z" fill="${col}"/>`;
};

/* ---------- Scène 1 : le match à la télé ---------- */
function match() {
  const g = [];
  // Mur de la terrasse : crépi crème, soubassement peint
  g.push(rect(0, 0, 800, 470, C.cream), rect(0, 340, 800, 130, C.blue, ' opacity=".3"'), rect(0, 336, 800, 6, C.wood2, ' opacity=".45"'));
  // Fenêtre sur le quartier, le soir : les lumières des voisins
  g.push(rect(552, 128, 172, 130, C.wood2, ' rx="4"'), rect(562, 138, 152, 110, C.indigo));
  for (const [x, y, w, h] of [[572, 196, 30, 52], [610, 176, 40, 72], [660, 204, 44, 44]]) g.push(rect(x, y, w, h, C.dark, ' opacity=".45"'));
  for (const [x, y] of [[580, 210], [590, 226], [620, 190], [636, 190], [620, 212], [672, 216], [690, 216]]) g.push(rect(x, y, 6, 8, C.yellow, ' opacity=".85"'));
  g.push(`<circle cx="690" cy="160" r="10" fill="${C.cream}" opacity=".9"/>`);
  // Le voisin accoudé à la fenêtre
  g.push(`<clipPath id="match-win"><rect x="562" y="138" width="152" height="110"/></clipPath><g clip-path="url(#match-win)">`);
  g.push(person({ x: 650, y: 352, s: 0.6, legs: "none", skin: SKIN.s4, hair: { type: "short" }, hat: { type: "cap", color: C.green }, top: C.yellow, sleeve: "short", face: "laugh",
    arms: { l: [[-44, -170], [-58, -214]], r: [[44, -170], [58, -214]] } }));
  g.push(`</g>`, rect(550, 248, 176, 12, C.wood, ' rx="3"'));
  // Auvent de tôle et poutre
  g.push(`<path d="M0 0H800V52L0 64Z" fill="${C.steel}"/>`);
  for (let i = 0; i < 20; i++) g.push(stroke(`M${i * 42 + 10} 0V${f(63 - i * 0.6)}`, C.grey, 3, ' opacity=".35"'));
  g.push(`<path d="M0 62L800 50V62L0 74Z" fill="${C.wood2}"/>`);
  // Guirlande de fanions vert-rouge-jaune
  for (const [y0, sag, off] of [[82, 64, 0], [78, 40, 1]]) {
    const P = (t) => [20 + 760 * t, y0 + 4 * sag * t * (1 - t)];
    const pts = []; for (let t = 0; t <= 1.001; t += 0.02) pts.push(P(t));
    g.push(`<path d="M${pts.map(([x, y]) => `${f(x)} ${f(y)}`).join("L")}" fill="none" stroke="${C.wood2}" stroke-width="2"/>`);
    if (off) continue;
    for (let i = 0; i < 18; i++) {
      const t = (i + 0.5) / 18, [x, y] = P(t), [x1, y1] = P(t + 0.012);
      g.push(`<path d="M${f(x - 12)} ${f(y - (y1 - y) * 12 / (x1 - x))}L${f(x + 12)} ${f(y + (y1 - y) * 12 / (x1 - x))}L${f(x)} ${f(y + 28)}Z" fill="${TRI[i % 3]}"/>`);
    }
  }
  // Sol carrelé
  g.push(rect(0, 470, 800, 130, C.sand2), rect(0, 466, 800, 6, C.wood2, ' opacity=".5"'));
  for (let i = 1; i < 8; i++) g.push(stroke(`M${i * 100} 472L${i * 100 + (i - 4) * 34} 600`, C.sand, 2));
  g.push(stroke("M0 530H800", C.sand, 2));
  // Meuble télé et télévision
  g.push(rect(36, 376, 248, 96, C.wood2, ' rx="4"'), rect(48, 388, 108, 70, C.wood, ' rx="2"'), rect(164, 388, 108, 70, C.wood, ' rx="2"'));
  g.push(`<circle cx="146" cy="423" r="3.5" fill="${C.ocre}"/><circle cx="174" cy="423" r="3.5" fill="${C.ocre}"/>`, cloth2("M60 376H140L132 384H68Z", C.terra, "wax2"));
  g.push(rect(140, 360, 40, 18, C.dark), stroke("M140 198L108 150M180 198L214 146", C.grey, 3), `<circle cx="108" cy="150" r="4" fill="${C.grey}"/><circle cx="214" cy="146" r="4" fill="${C.grey}"/>`, `<ellipse cx="160" cy="198" rx="16" ry="6" fill="${C.dark}"/>`);
  g.push(rect(32, 196, 256, 170, C.dark, ' rx="10"'));
  const sx = 46, sy = 208, sw = 228, sh = 142;
  g.push(`<clipPath id="match-tv"><rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="3"/></clipPath><g clip-path="url(#match-tv)">`);
  g.push(rect(sx, sy, sw, sh, C.leaf));
  for (let i = 0; i < 8; i += 2) g.push(rect(sx + i * 29, sy, 29, sh, C.leaf2, ' opacity=".35"'));
  g.push(`<path d="M${sx + 10} ${sy + 12}H${sx + sw - 10}V${sy + sh - 12}H${sx + 10}Z M${sx + sw / 2} ${sy + 12}V${sy + sh - 12} M${sx + sw - 10} ${sy + 44}H${sx + sw - 46}V${sy + sh - 44}H${sx + sw - 10}" fill="none" stroke="${C.white}" stroke-width="2" opacity=".85"/>`);
  g.push(`<circle cx="${sx + sw / 2}" cy="${sy + sh / 2}" r="20" fill="none" stroke="${C.white}" stroke-width="2" opacity=".85"/>`);
  // Le but : filet, gardien plongé, ballon au fond
  g.push(rect(sx + sw - 10, sy + 56, 8, 30, C.white, ' opacity=".9"'), stroke(`M${sx + sw - 7} ${sy + 60}V${sy + 82}M${sx + sw - 4} ${sy + 60}V${sy + 82}`, C.steel, 1));
  const mini = (x, y, col, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><circle cx="0" cy="-15" r="3.6" fill="${SKIN.s2}"/><rect x="-4" y="-11" width="8" height="10" rx="2" fill="${col}"/>${stroke("M-2 -1V6M2 -1V6", C.dark, 2.4)}</g>`;
  g.push(mini(sx + 150, sy + 90, C.green), mini(sx + 178, sy + 66, C.green), mini(sx + 120, sy + 52, C.red), mini(sx + 70, sy + 96, C.green), mini(sx + 200, sy + 84, C.yellow, -60), mini(sx + 160, sy + 120, C.red));
  g.push(`<circle cx="${sx + sw - 14}" cy="${sy + 74}" r="4.5" fill="${C.white}"/><circle cx="${sx + sw - 14}" cy="${sy + 74}" r="1.6" fill="${C.dark}"/>`);
  g.push(`<path d="M${sx} ${sy}H${sx + 90}L${sx + 30} ${sy + sh}H${sx}Z" fill="${C.white}" opacity=".07"/></g>`);
  // Éclats de joie autour de l'écran
  for (const [x1, y1, x2, y2] of [[22, 190, 8, 176], [298, 190, 312, 176], [160, 184, 160, 168], [300, 280, 318, 280], [20, 280, 6, 280]]) g.push(stroke(`M${x1} ${y1}L${x2} ${y2}`, C.ocre, 4));
  // Chaise de plastique de la grand-mère
  const gx = 360, gy = 566, gs = 1;
  g.push(rect(gx - 48, gy - 236, 96, 140, C.red, ' rx="18"'), rect(gx - 38, gy - 222, 76, 8, C.white, ' opacity=".2" rx="4"'));
  g.push(stroke(`M${gx - 40} ${gy - 96}L${gx - 46} ${gy - 4}M${gx + 66} ${gy - 96}L${gx + 74} ${gy - 4}`, C.red, 8));
  g.push(rect(gx - 50, gy - 104, 126, 14, C.red, ' rx="6"'));
  // La grand-mère applaudit
  g.push(person({ x: gx, y: gy, s: gs, legs: "sit", skin: SKIN.s1, hair: { type: "gele", color: C.green, wax: "wax1" }, robe: "kaba", top: C.yellow, wax: "wax2", face: "laugh",
    arms: { l: [[-30, -146], [2, -172]], r: [[36, -146], [14, -176]] } }));
  g.push(at(gx, gy, gs, false, stroke("M-6 -194L-12 -204M8 -198V-210M22 -194L28 -204", C.terra, 3)));
  // Le copain saute de joie, l'écharpe levée
  const mx = 484, my = 522, ms = 1.04;
  g.push(shadow(mx, 568, 44));
  g.push(person({ x: mx, y: my, s: ms, legs: "walk", skin: SKIN.s3, hair: { type: "locks" }, top: C.green, dashiki: C.yellow, sleeve: "short", bottom: C.indigo, face: "laugh",
    arms: { l: [[-46, -236], [-54, -288]], r: [[46, -236], [54, -288]] } }));
  let sc = ""; for (let i = 0; i < 9; i++) sc += rect(-54 + i * 12, -300, 12, 16, TRI[i % 3]);
  sc += stroke("M-60 -284V-272M-56 -284V-270M56 -284V-270M60 -284V-272", C.yellow, 2);
  g.push(at(mx, my, ms, false, sc + hand(-54, -288, SKIN.s3) + hand(54, -288, SKIN.s3)));
  // La voisine à la vuvuzela
  const vx = 620, vy = 562, vs = 1.02;
  g.push(person({ x: vx, y: vy, s: vs, legs: "skirt", skin: SKIN.s5, hair: { type: "boxbraids", beads: C.ocre }, top: C.yellow, wax: "wax3", sleeve: "short", bottom: C.terra, bwax: "wax1", face: "talk",
    arms: { l: [[-46, -228], [-48, -280]], r: [[50, -200], [30, -242]] } }));
  g.push(at(vx, vy, vs, false, scarf() + `<path d="M3 -226L6 -219L88 -284L74 -302Z" fill="${C.yellow}"/><path d="M74 -302L88 -284Q92 -304 74 -302Z" fill="${C.ocre}"/>` +
    `<path d="M42 -258L48 -253L54 -260L48 -265Z" fill="${C.red}"/>` + `<circle cx="4" cy="-223" r="4" fill="${C.ocre}"/>` + hand(30, -242, SKIN.s5)));
  // La petite saute aussi, un fanion à la main
  const kx = 714, ky = 528, ks = 0.78;
  g.push(shadow(kx, 568, 32));
  g.push(person({ x: kx, y: ky, s: ks, legs: "walkskirt", skin: SKIN.s2, hair: { type: "puffs" }, top: C.red, sleeve: "short", bottom: C.green, face: "laugh",
    arms: { r: [[34, -232], [40, -284]], l: [[-46, -172], [-54, -214]] } }));
  g.push(at(kx, ky, ks, false, stroke("M40 -284V-336", C.wood2, 3) + `<path d="M40 -336L-4 -326L40 -314Z" fill="${C.green}"/><path d="M40 -325L18 -320L40 -314Z" fill="${C.yellow}"/>` + hand(40, -286, SKIN.s2)));
  // Confettis
  for (const [x, y, r, c] of [[430, 150, 20, C.yellow], [470, 120, -30, C.red], [560, 110, 40, C.green], [600, 300, -10, C.yellow], [420, 260, 60, C.red], [770, 300, 20, C.green], [300, 140, -40, C.green]]) g.push(`<rect x="${x}" y="${y}" width="10" height="5" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`);
  return frame(g.join(""), C.sand);
}
/** Aplat avec un motif par-dessus. */
function cloth2(d, col, pat) { return `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : ""); }

/* ---------- Scène 2 : la course de la montagne ---------- */
/** Chemin à largeur variable le long d'une courbe (Catmull-Rom) : pts [[x,y,largeur]…]. */
function trail(pts, fill) {
  const s = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let k = 0; k < 6; k++) {
      const t = k / 6, t2 = t * t, t3 = t2 * t;
      const c = (j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3);
      s.push([c(0), c(1), p1[2] + (p2[2] - p1[2]) * t]);
    }
  }
  s.push(pts[pts.length - 1]);
  const L = [], R = [];
  for (let i = 0; i < s.length; i++) {
    const a = s[Math.max(0, i - 1)], b = s[Math.min(s.length - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy) || 1;
    const nx = -dy / n, ny = dx / n, w = s[i][2] / 2;
    L.push(`${f(s[i][0] + nx * w)} ${f(s[i][1] + ny * w)}`); R.unshift(`${f(s[i][0] - nx * w)} ${f(s[i][1] - ny * w)}`);
  }
  return `<path d="M${L.join("L")}L${R.join("L")}Z" fill="${fill}"/>`;
}
function course() {
  const g = [];
  g.push(cloud(60, 90, 0.8), cloud(190, 46, 0.6), cloud(690, 70, 0.7));
  // Le volcan au loin, cratère ébréché, nuage accroché aux flancs
  g.push(`<path d="M120 360Q300 270 410 170Q452 124 486 106L506 118L528 98L552 114L572 102Q616 124 664 180Q736 262 800 300V380H120Z" fill="${C.wood2}" opacity=".55"/>`);
  g.push(`<path d="M486 106L506 118L528 98L552 114L572 102Q560 130 540 126Q520 132 500 124Q490 118 486 106Z" fill="${C.dark}" opacity=".25"/>`);
  g.push(stroke("M470 140Q440 220 380 290M560 140Q600 220 640 290M520 130Q520 220 500 300", C.dark, 3, ' opacity=".12"'));
  g.push(cloud(380, 210, 0.9), cloud(600, 236, 0.75));
  // Collines vertes en étages
  g.push(`<path d="M0 340Q200 290 400 330T800 316V600H0Z" fill="${C.leaf}" opacity=".45"/>`);
  g.push(`<path d="M0 400Q260 346 520 380T800 366V600H0Z" fill="${C.leaf}" opacity=".75"/>`);
  g.push(`<path d="M0 440Q300 404 800 432V600H0Z" fill="${C.leaf}"/>`);
  // Petits arbres sur les pentes
  for (const [x, y, s] of [[90, 380, 0.8], [130, 372, 0.6], [690, 360, 0.7], [740, 368, 0.9], [60, 470, 1.1], [760, 470, 1.2]]) g.push(`<g transform="translate(${x} ${y}) scale(${s})">${stroke("M0 0V-22", C.wood2, 5)}<circle cx="0" cy="-34" r="18" fill="${C.leaf2}"/><circle cx="-10" cy="-26" r="12" fill="${C.leaf2}"/><circle cx="10" cy="-24" r="12" fill="${C.leaf2}"/></g>`);
  // Le sentier de terre rouge qui serpente vers le sommet
  const path = [[430, 630, 320], [412, 540, 230], [396, 480, 150], [412, 430, 90], [452, 400, 56], [490, 378, 36], [470, 352, 22], [446, 334, 14], [474, 316, 9], [504, 300, 5]];
  g.push(`<defs>${trail(path, "").replace(' fill=""', "").replace("<path ", '<path id="course-sentier" ')}</defs>`, `<use href="#course-sentier" fill="${C.sand2}"/><use href="#course-sentier" fill="${C.terra}" opacity=".28"/>`);
  for (const [x, y, r] of [[350, 560, 5], [520, 540, 4], [400, 500, 3.5], [470, 590, 4], [330, 590, 3]]) g.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${C.wood}" opacity=".5"/>`);
  // Fanions de balisage le long du sentier
  for (const [x, y, s, c] of [[300, 500, 0.9, C.terra], [560, 470, 0.8, C.ocre], [330, 440, 0.6, C.ocre], [470, 412, 0.5, C.terra], [520, 360, 0.4, C.terra]]) g.push(`<g transform="translate(${x} ${y}) scale(${s})">${stroke("M0 0V-60", C.wood2, 3)}<path d="M0 -60L26 -52L0 -42Z" fill="${c}"/></g>`);
  // Coureurs au loin, sur les lacets
  for (const [x, y, s, c, sk] of [[448, 336, 0.13, C.green, SKIN.s3], [470, 354, 0.17, C.ocre, SKIN.s1], [488, 380, 0.22, C.terra, SKIN.s4]]) g.push(person({ x, y, s, legs: "walk", skin: sk, top: c, sleeve: "short", bottom: C.dark, face: "none" }));
  // Troisième coureuse
  const r3 = { x: 436, y: 402, s: 0.4 };
  g.push(person({ ...r3, legs: "walk", skin: SKIN.s2, hair: { type: "boxbraids" }, top: C.ocre, sleeve: "short", bottom: C.indigo, shoes: C.white, face: "smile",
    arms: { l: [[-40, -160], [-22, -186]], r: [[40, -150], [56, -124]] } }));
  g.push(at(r3.x, r3.y, r3.s, false, bib(C.green)));
  // Deuxième coureur, en short
  const r2 = { x: 392, y: 456, s: 0.62 };
  g.push(person({ ...r2, legs: "walk", skin: SKIN.s1, hair: { type: "short" }, beard: true, top: C.green, sleeve: "short", bottom: SKIN.s1, shoes: C.ocre, face: "laugh",
    arms: { l: [[-42, -150], [-58, -122]], r: [[42, -160], [24, -188]] } }));
  g.push(at(r2.x, r2.y, r2.s, false, shorts(C.indigo) + bib(C.terra)));
  // Spectateurs à gauche : drapeau vert-rouge-jaune, bras levés
  const fx = 104, fy = 574, fs = 0.98;
  g.push(person({ x: fx, y: fy, s: fs, legs: "skirt", robe: "kaba", skin: SKIN.s3, hair: { type: "foulard", color: C.green, wax: "wax1" }, top: C.terra, wax: "wax3", face: "laugh",
    arms: { r: [[46, -226], [52, -282]], l: [[-46, -170], [-36, -132]] } }));
  g.push(at(fx, fy, fs, false, stroke("M52 -240V-372", C.wood2, 4) + rect(52, -372, 26, 44, C.green) + rect(78, -372, 26, 44, C.red) + rect(104, -372, 26, 44, C.yellow) + star(91, -350, 9, C.yellow) + hand(52, -282, SKIN.s3)));
  g.push(person({ x: 222, y: 564, s: 0.96, skin: SKIN.s4, hair: { type: "short" }, hat: { type: "kufi", color: C.dark, wax: "toghu" }, top: C.dark, wax: "toghu", bottom: C.indigo, face: "laugh",
    arms: { l: [[-30, -196], [-14, -222]], r: [[30, -196], [14, -222]] } }));
  // mains en porte-voix autour de la bouche
  g.push(at(222, 564, 0.96, false, hand(-14, -222, SKIN.s4) + hand(14, -222, SKIN.s4) + stroke("M30 -236L44 -240M30 -224H46M30 -212L44 -208", C.ocre, 3)));
  // Le ravitaillement : table, gobelets
  g.push(rect(640, 470, 140, 10, C.wood, ' rx="3"'), stroke("M652 480V536M768 480V536", C.wood2, 5));
  for (let i = 0; i < 6; i++) g.push(`<path d="M${652 + i * 20} 470L${650 + i * 20} 452H${664 + i * 20}L${662 + i * 20} 470Z" fill="${i % 2 ? C.white : C.sky}"/>`);
  g.push(cloth2("M640 480H780V500L760 494L740 500L720 494L700 500L680 494L660 500L640 494Z", C.indigo, "ndop"));
  // La coureuse de tête tend la main vers la bouteille
  const lx = 514, ly = 562, ls = 1.02;
  g.push(person({ x: lx, y: ly, s: ls, legs: "walk", skin: SKIN.s4, hair: { type: "nattes" }, top: C.terra, wax: null, sleeve: "short", bottom: C.dark, shoes: C.white, face: "smile",
    arms: { l: [[-40, -160], [-58, -128]], r: [[52, -184], [80, -198]] } }));
  g.push(at(lx, ly, ls, false, bib(C.indigo) + stroke("M-20 -250Q0 -258 20 -250", C.yellow, 4)));
  // La bénévole en gilet, la bouteille d'eau tendue
  const bx = 704, by = 566, bs = 1;
  g.push(person({ x: bx, y: by, s: bs, flip: true, skin: SKIN.s2, hair: { type: "bantu" }, top: C.green, sleeve: "short", bottom: C.indigo, bwax: null, face: "talk",
    arms: { r: [[60, -186], [96, -178]], l: [[-40, -150], [-36, -110]] } }));
  g.push(at(bx, by, bs, true, `<path d="M-30 -184Q-30 -206 -12 -206H-9L0 -178L9 -206H12Q30 -206 30 -184L27 -112Q0 -106 -27 -112Z" fill="${C.ocre}"/>` + rect(-29, -150, 58, 7, C.white, ' opacity=".9"') + rect(-28, -130, 56, 7, C.white, ' opacity=".9"')));
  // Bouteille entre les deux mains (repère de la scène)
  const hx = lx + 80 * ls, hy = ly - 198 * ls, vxh = bx - 96 * bs, vyh = by - 178 * bs;
  const btx = (hx + vxh) / 2;
  g.push(`<rect x="${f(btx - 8)}" y="${f(hy - 14)}" width="16" height="${f(vyh - hy + 26)}" rx="5" fill="${C.sky}"/><rect x="${f(btx - 8)}" y="${f(hy + 8)}" width="16" height="10" fill="${C.blue}"/><rect x="${f(btx - 4)}" y="${f(hy - 21)}" width="8" height="8" rx="2" fill="${C.blue}"/>`);
  g.push(hand(hx, hy, SKIN.s4), hand(vxh, vyh, SKIN.s2));
  return frame(g.join(""), C.sky);
}

/* ---------- Scène 3 : l'atelier de code ---------- */
function code() {
  const g = [];
  // Mur, plinthe, sol
  g.push(rect(0, 0, 800, 450, C.cream), rect(0, 450, 800, 150, C.sand2), rect(0, 444, 800, 8, C.wood2, ' opacity=".55"'));
  // Tenture en wax et bande de kente au mur
  g.push(rect(36, 70, 150, 6, C.wood2, ' rx="3"'), cloth2("M42 76H180V250L162 240L144 250L126 240L108 250L90 240L72 250L54 240L42 248Z", C.terra, "wax1"));
  g.push(rect(694, 60, 70, 240, "url(#kente)"), rect(690, 54, 78, 8, C.wood2, ' rx="3"'));
  g.push(`<path d="M694 300L708 316L722 300L736 316L750 300L764 316V300Z" fill="${C.ocre}"/>`);
  // Écran de projection : blocs de code abstraits
  const sx = 230, sy = 40, sw = 400, sh = 212;
  g.push(rect(sx - 12, sy - 14, sw + 24, 12, C.grey, ' rx="5"'), rect(sx, sy, sw, sh, C.white), rect(sx, sy + sh, sw, 6, C.steel));
  g.push(`<clipPath id="code-ecran"><rect x="${sx}" y="${sy}" width="${sw}" height="${sh}"/></clipPath><g clip-path="url(#code-ecran)">`);
  g.push(rect(sx, sy, sw, 20, C.indigo), ...[0, 1, 2].map((i) => `<circle cx="${sx + 14 + i * 13}" cy="${sy + 10}" r="4" fill="${[C.red, C.yellow, C.leaf][i]}"/>`));
  g.push(rect(sx, sy + 20, 22, sh - 20, C.sand));
  const lines = [[0, 70, C.terra], [1, 46, C.ocre], [2, 90, C.blue], [2, 60, C.green], [1, 30, C.ocre], [1, 80, C.terra], [2, 50, C.blue], [3, 64, C.green], [0, 40, C.terra]];
  lines.forEach(([ind, w, c], i) => {
    const y = sy + 32 + i * 19;
    g.push(rect(sx + 6, y + 2, 10, 4, C.grey, ' rx="2" opacity=".5"'), rect(sx + 32 + ind * 18, y, w, 9, c, ' rx="4.5"'));
    if (i % 3 !== 1) g.push(rect(sx + 38 + ind * 18 + w, y, 30 + (i * 13) % 40, 9, C.steel, ' rx="4.5"'));
  });
  // Aperçu du programme : un petit robot qui avance
  const px = sx + 268, py = sy + 34;
  g.push(rect(px, py, 118, 166, C.sky, ' rx="6"'), rect(px, py + 140, 118, 26, C.leaf, ' opacity=".5"'));
  g.push(rect(px + 38, py + 70, 42, 44, C.terra, ' rx="8"'), rect(px + 46, py + 80, 26, 14, C.white, ' rx="4"'), `<circle cx="${px + 54}" cy="${py + 87}" r="3" fill="${C.dark}"/><circle cx="${px + 64}" cy="${py + 87}" r="3" fill="${C.dark}"/>`);
  g.push(stroke(`M${px + 59} ${py + 70}V${py + 58}`, C.dark, 3), `<circle cx="${px + 59}" cy="${py + 55}" r="5" fill="${C.ocre}"/>`, rect(px + 42, py + 114, 12, 26, C.indigo, ' rx="3"'), rect(px + 64, py + 114, 12, 26, C.indigo, ' rx="3"'));
  g.push(star(px + 96, py + 30, 10, C.ocre), stroke(`M${px + 14} ${py + 160}H${px + 100}`, C.white, 3, ' stroke-dasharray="6 6"'));
  g.push(`</g>`);
  // Vidéoprojecteur au plafond (rayon discret)
  // Plante
  g.push(`<g transform="translate(60 450) scale(1.4)"><path d="M0 0Q-26 -30 -14 -66Q4 -40 0 0Z" fill="${C.leaf}"/><path d="M0 0Q24 -26 20 -62Q-2 -40 0 0Z" fill="${C.leaf2}"/><path d="M0 0Q-4 -50 6 -80Q14 -46 0 0Z" fill="${C.leaf}"/><path d="M-16 -4H16L12 26H-12Z" fill="${C.ocre}"/></g>`);
  // La formatrice aux nattes, qui montre l'écran
  const tx = 690, ty = 566, ts = 1.04;
  g.push(person({ x: tx, y: ty, s: ts, flip: true, skin: SKIN.s3, hair: { type: "nattes" }, top: C.green, wax: "kitenge", bottom: C.dark, face: "talk",
    arms: { r: [[52, -214], [72, -252]], l: [[-40, -150], [-30, -112]] }, point: [120, -320],
    lhand: (hx, hy) => `<rect x="${hx - 6}" y="${hy - 4}" width="12" height="22" rx="4" fill="${C.dark}"/><circle cx="${hx}" cy="${hy + 12}" r="2.5" fill="${C.red}"/>` + hand(hx, hy, SKIN.s3) }));
  // Boucles d'oreilles de la formatrice
  g.push(at(tx, ty, ts, true, `<circle cx="-21" cy="-226" r="3.5" fill="${C.ocre}"/><circle cx="21" cy="-226" r="3.5" fill="${C.ocre}"/>`));
  // Les collégiennes derrière la grande table
  const girls = [
    { x: 130, skin: SKIN.s5, hair: { type: "bantu" }, top: C.blue, dashiki: C.white, face: "calm" },
    { x: 300, skin: SKIN.s2, hair: { type: "fulani", beads: C.ocre }, top: C.ocre, wax: "wax2", face: "laugh", arms: { r: [[46, -232], [54, -290]] } },
    { x: 470, skin: SKIN.s4, hair: { type: "puffs" }, top: C.indigo, wax: "ndop", face: "calm" },
  ];
  const gy = 562, gs = 0.98;
  for (const o of girls) g.push(person({ y: gy, s: gs, legs: "none", sleeve: "short", ...o, arms: { l: [[-40, -150], [-14, -118]], r: [[40, -150], [14, -118]], ...o.arms } }));
  // Étincelles de fierté autour de la main levée
  g.push(at(300, gy, gs, false, stroke("M36 -296L22 -302M38 -278L24 -276M72 -296L86 -302M70 -278L84 -276", C.terra, 3.5)));
  // Table
  g.push(rect(40, 440, 540, 12, C.wood, ' rx="3"'), rect(52, 452, 516, 80, C.wood2), stroke("M60 532V578M560 532V578", C.wood2, 10));
  g.push(rect(52, 452, 516, 8, C.dark, ' opacity=".15"'));
  // Ordinateurs portables (on voit le dos de l'écran), autocollants
  for (const [x, c1, c2] of [[130, C.terra, C.yellow], [300, C.green, C.ocre], [470, C.indigo, C.red]]) {
    g.push(`<path d="M${x - 48} 440L${x - 44} 398Q${x - 44} 392 ${x - 38} 392H${x + 38}Q${x + 44} 392 ${x + 44} 398L${x + 48} 440Z" fill="${C.steel}"/>`);
    g.push(`<circle cx="${x}" cy="416" r="8" fill="${C.white}" opacity=".7"/>`, `<circle cx="${x - 24}" cy="404" r="5.5" fill="${c1}"/>`, rect(x + 16, 424, 14, 9, c2, ' rx="2"'));
    g.push(rect(x - 56, 436, 112, 6, C.grey, ' rx="2"'));
  }
  // Mains posées sur les claviers (derrière l'écran, on voit le bout des doigts)
  // Cahier et crayon, câble
  g.push(rect(200, 428, 40, 12, C.white, ' rx="2"'), stroke("M206 434H234", C.blue, 1.6), stroke("M370 437H402", C.yellow, 4));
  // Une carte électronique sur la table
  g.push(rect(546, 428, 30, 12, C.leaf2, ' rx="2"'), `<circle cx="554" cy="434" r="2" fill="${C.ocre}"/><circle cx="566" cy="434" r="2" fill="${C.red}"/>`);
  // Cartable au pied de la table
  g.push(`<path d="M590 578V528Q590 516 602 516H630Q642 516 642 528V578Z" fill="${C.terra}"/><path d="M590 578V528Q590 516 602 516H630Q642 516 642 528V578Z" fill="url(#wax1)" opacity=".6"/>`, rect(596, 540, 40, 22, C.indigo, ' rx="4"'), stroke("M604 516Q616 500 628 516", C.wood2, 4));
  g.push(rect(52, 462, 516, 12, C.indigo), rect(52, 462, 516, 12, "url(#wax3)"));
  return frame(g.join(""), C.cream);
}

export default [
  { id: "match", fr: "Le match à la télé", en: "Watching the match",
    tags: ["match", "football", "télévision", "supporters", "but", "vuvuzela", "écharpe", "maillot", "terrasse", "quartier", "voisins", "grand-mère", "joie", "gele", "kaba",
      "match", "football", "soccer", "television", "fans", "goal", "scarf", "jersey", "terrace", "neighbours", "grandmother", "joy", "watching"], draw: match },
  { id: "course", fr: "La course de la montagne", en: "The mountain race",
    tags: ["course", "montagne", "mont Cameroun", "volcan", "coureurs", "dossard", "sport", "trail", "spectateurs", "bénévole", "ravitaillement", "eau", "drapeau", "toghu",
      "race", "mountain", "Mount Cameroon", "volcano", "runners", "bib", "sport", "trail running", "spectators", "volunteer", "water", "flag"], draw: course },
  { id: "code", fr: "Atelier de code", en: "Coding workshop",
    tags: ["code", "programmation", "atelier", "filles", "collégiennes", "informatique", "ordinateur portable", "formatrice", "projection", "numérique", "nattes", "wax", "kente",
      "coding", "programming", "workshop", "girls", "students", "computer", "laptop", "trainer", "tech", "digital", "STEM"], draw: code },
];
