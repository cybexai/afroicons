// Afroicons — illustrations : couleurs, motifs et personnages modulables communs à toutes les scènes.
// Une scène est un SVG 800×600, à plat (aplats sans contour, visages sans traits).
//
// Les 4 couleurs de la marque (C.terra, C.ocre, C.indigo, C.green) sont celles de l'ambiance « Douala » du site :
// le site les remplace par celles de l'ambiance choisie pour recolorer une scène. Toute autre couleur reste fixe.

export const C = {
  terra: "#C24E2A", ocre: "#E3A22F", indigo: "#22305C", green: "#2E6B4E", // recolorables
  dark: "#1F1A15", cream: "#F6EFE4", sand: "#EADBC4", sand2: "#DCC7A8", wood: "#A8693B", wood2: "#7E4A26",
  white: "#FFFDF8", sky: "#E4ECE6", leaf: "#4E8B5F", leaf2: "#2F6E48", blue: "#5B7BB5", rose: "#D9826A",
  red: "#D2412B", yellow: "#E8C33E", grey: "#8A8F94", steel: "#B9C2C8",
};
/** Teintes de peau : du plus foncé au plus clair, toutes africaines. */
export const SKIN = { s1: "#3A2118", s2: "#5C3523", s3: "#7B4A2E", s4: "#9C6542", s5: "#A9714A" };
export const HAIR = "#17100D";

export const f = (n) => Math.round(n * 10) / 10;
export const stroke = (d, c, w, extra = "") => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${extra}/>`;
const pt = ([x, y]) => `${f(x)} ${f(y)}`;

/* ---------------------------------------------------------------------------------------------
   Personnage modulable — person(o) renvoie un <g>.
   Repère local (avant échelle) : pieds en (0,0), sommet du crâne vers -263, épaules en (±27,-192), hanches vers -112.
     x, y        position des pieds dans la scène ; s échelle (1 ≈ 270 de haut) ; flip : regarde de l'autre côté
     view        "front" (de face) | "back" (de dos)
     legs        "stand" pantalon | "skirt" jupe | "walk" pantalon en marche | "walkskirt" jupe en marche
                 | "sit" assis : buste de face, jambes de profil vers la droite (flip : vers la gauche) ; pieds au sol
                   en y, assise (le haut du siège) à y-100·s, genoux vers x+60·s | "none" (caché par un meuble)
     skin        SKIN.s1…s5 ; hair { type, color?, wax?, beads? } type : short | afro | foulard | gele (foulard en éventail)
                 | tresses | puffs | rase | locks | nattes (nattes collées) | boxbraids (tresses longues, perles avec beads)
                 | fulani (tresses peules, perles) | bantu (bantu knots)
     beard       barbe courte
     top         couleur du haut ; wax : motif par-dessus (ids : "wax1", "wax2", "wax3", "kente")
     bottom      couleur du pantalon ou de la jupe ; shoes
     sleeve      "long" | "short"
     robe        "dress" robe longue | "boubou" grand boubou (manches larges, encolure brodée) | "agbada" (boubou à grands pans)
                 | "kaba" kaba ngondo (robe ample à volant, manches larges)
     bwax        motif sur le pantalon ou la jupe (pagne) ; dashiki : true (ou une couleur) pour le plastron brodé
     motifs      wax1, wax2, wax3, kente, ndop (indigo et blanc, Grassfields), toghu (velours noir brodé, Nord-Ouest),
                 bogolan (Mali), kitenge (Afrique de l'Est, recolorable)
     jacket      { color, shirt?, tie? } veste de costume (top = couleur de la veste)
     coat        { inner } blouse blanche de soignant (stéthoscope), inner = couleur dessous
     hat         { type: "cap" | "helmet" | "chapeau" | "kufi" | "ashetu" (bonnet à boules des notables), color?, color2?, wax? }
     arms        { l: [coude, main], r: [coude, main] } en repère local. Par défaut, bras le long du corps.
     point       [x,y] : la main droite tend l'index vers ce point (repère local)
     phone       { rot?, screen? } téléphone dans la main gauche
     lhand/rhand (hx, hy) => svg : objet tenu (dessiné dans le repère local, après la main)
     face        "smile" (défaut) | "calm" | "laugh" | "talk" | "none" : traits du visage (yeux, sourcils, nez, bouche)
   --------------------------------------------------------------------------------------------- */
export function person(o) {
  const { x, y, s = 1, flip = false, skin = SKIN.s3, hair = { type: "short" }, top = C.indigo, bottom = C.indigo, shoes = C.dark,
    sleeve = "long", wax = null, view = "front", beard = false, phone = null, point = null, rhand = null, lhand = null,
    jacket = null, coat = null, hat = null, bwax = null, dashiki = false, face = "smile" } = o;
  let { legs = "stand", robe = null } = o;
  if (o.dress) robe = "dress";
  const back = view === "back", agbada = robe === "agbada", boubou = robe === "boubou" || agbada, kaba = robe === "kaba";
  const walking = legs === "walk" || legs === "walkskirt";
  const defArms = walking ? { l: [[-40, -150], [-30, -110]], r: [[38, -150], [46, -112]] } : { l: [[-40, -150], [-38, -108]], r: [[40, -150], [38, -108]] };
  const arms = { ...defArms, ...o.arms };
  const hc = hair.color ?? HAIR;
  const g = [];
  const paint = (d, col, pat) => `<path d="${d}" fill="${col}"/>` + (pat ? `<path d="${d}" fill="url(#${pat})"/>` : "");
  const shoe = (cx, cy, rx = 14) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${rx / 2}" fill="${shoes}"/>`;
  const sleeveCol = coat ? C.white : jacket ? jacket.color : top;

  /* Jambes */
  const robeBottom = robe ? (boubou || kaba ? -14 : -24) : null;
  // Pantalon (et jupe) : couleur unie, avec un motif par-dessus si bwax.
  const trou = (d, w) => stroke(d, bottom, w) + (bwax ? stroke(d, `url(#${bwax})`, w) : "");
  const hips = (d) => `<path d="${d}" fill="${bottom}"/>` + (bwax ? `<path d="${d}" fill="url(#${bwax})"/>` : "");
  if (legs === "sit") {
    // Assis (buste de face, jambes de profil, genoux vers la droite ; flip pour l'autre côté) : assise à -100, pieds à 0.
    if (!robe) {
      g.push(hips("M-27 -120H27L25 -96H-25Z"));
      g.push(trou("M-8 -104L48 -100L50 -14", 22), trou("M4 -110L62 -106L66 -14", 21));
      g.push(`<ellipse cx="60" cy="-6" rx="14" ry="7" fill="${shoes}"/><ellipse cx="76" cy="-6" rx="14" ry="7" fill="${shoes}"/>`);
    } else {
      g.push(stroke("M50 -60L50 -14", skin, 12), stroke("M64 -60L66 -14", skin, 12));
      g.push(`<ellipse cx="58" cy="-6" rx="12" ry="6" fill="${shoes}"/><ellipse cx="74" cy="-6" rx="12" ry="6" fill="${shoes}"/>`);
    }
  } else if (legs === "stand" && !robe) {
    g.push(trou("M-11 -112L-13 -12", 21), trou("M11 -112L13 -12", 21), hips("M-27 -120H27L25 -96H-25Z"));
    g.push(shoe(-17, -6), shoe(17, -6));
  } else if (legs === "walk" && !robe) {
    g.push(trou("M-10 -112L-18 -62L-30 -14", 21), trou("M10 -112L18 -60L22 -12", 21), hips("M-27 -120H27L25 -96H-25Z"));
    g.push(shoe(-36, -8), shoe(28, -6));
  } else if (legs === "skirt" || legs === "walkskirt" || (robe && legs !== "none")) {
    const w = walking;
    const sk = robe ? (kaba ? "M-30 -118H30L60 -20Q0 -6 -60 -20Z" : agbada ? "M-32 -116H32L50 -12Q0 -2 -50 -12Z" : boubou ? "M-30 -116H30L46 -18Q0 -8 -46 -18Z" : "M-27 -116H27L38 -28Q0 -20 -38 -28Z") : "M-27 -116H27L38 -30Q0 -22 -38 -30Z";
    const top0 = robe ? robeBottom + 4 : -40;
    if (w) { g.push(stroke(`M-10 ${top0}L-24 -12`, skin, 12), stroke(`M10 ${top0}L18 -12`, skin, 12)); g.push(shoe(-29, -6, 12), shoe(22, -6, 12)); }
    else { g.push(stroke(`M-10 ${top0}L-11 -12`, skin, 12), stroke(`M10 ${top0}L11 -12`, skin, 12)); g.push(shoe(-14, -6, 12), shoe(14, -6, 12)); }
    const skd = w && !boubou ? sk.replace("L38 -28Q0 -20 -38 -28Z", "L44 -30Q0 -20 -34 -32Z").replace("L38 -30Q0 -22 -38 -30Z", "L44 -32Q0 -22 -34 -34Z") : sk;
    g.push(robe ? paint(skd, top, wax) : hips(skd));
    // Kaba : un volant au bas de la robe.
    if (kaba) g.push(`<path d="M-60 -20Q0 -6 60 -20L66 -6Q0 8 -66 -6Z" fill="${top}"/><path d="M-60 -20Q0 -6 60 -20L66 -6Q0 8 -66 -6Z" fill="rgba(0,0,0,.16)"/>`);
  }
  if (legs === "sit" && robe) g.push(paint(boubou || kaba ? "M-30 -118H30Q72 -122 76 -100L78 -40Q58 -34 38 -40L36 -90H-30Z" : "M-27 -116H27Q66 -120 72 -100L74 -50Q56 -44 40 -50L38 -90H-27Z", top, wax));

  /* Cheveux derrière la tête */
  if (hair.type === "afro" && !hat) g.push(`<circle cx="0" cy="-248" r="36" fill="${hc}"/>`);
  if (hair.type === "puffs") g.push(`<circle cx="-24" cy="-258" r="14" fill="${hc}"/><circle cx="24" cy="-258" r="14" fill="${hc}"/>`);
  if (hair.type === "tresses" && !back) g.push(stroke("M-17 -246Q-27 -222 -25 -190", hc, 8), stroke("M17 -246Q27 -222 25 -190", hc, 8));
  const beads = hair.beads ?? null;
  if ((hair.type === "boxbraids" || hair.type === "fulani") && !back) {
    const long = hair.type === "boxbraids" ? 1 : 0.55;
    for (const k of [-1, 1]) for (let i = 0; i < 5; i++) {
      const x0 = k * (14 + i * 2), x1 = k * (22 + i * 3.4), y1 = -246 + 92 * long + i * 4;
      g.push(stroke(`M${x0} -248Q${k * (26 + i * 3)} -222 ${x1} ${y1}`, hc, 4.6));
      if (beads) g.push(`<circle cx="${x1}" cy="${y1 + 2}" r="2.8" fill="${beads}"/>`);
    }
  }
  if (hair.type === "locks" && !back) for (const k of [-1, 1]) g.push(stroke(`M${k * 16} -250Q${k * 30} -230 ${k * 29} -196`, hc, 7), stroke(`M${k * 20} -244Q${k * 34} -226 ${k * 35} -206`, hc, 6));

  /* Bras */
  const aw = agbada ? 28 : boubou ? 24 : 15;
  const arm = ([sx, sy], [[ex, ey], [hx, hy]], side) => {
    const out = [];
    // Manche du boubou : elle s'arrête un peu avant la main.
    const dx = hx - ex, dy = hy - ey, L0 = Math.hypot(dx, dy) || 1, cut = boubou ? 9 : 0, [kx, ky] = [hx - (dx / L0) * cut, hy - (dy / L0) * cut];
    if (boubou) out.push(stroke(`M${pt([kx, ky])}L${pt([hx, hy])}`, skin, 10));
    // Kaba : manches larges jusqu'au coude.
    if (kaba) { out.push(stroke(`M${sx} ${sy}L${pt([ex, ey])}L${pt([hx, hy])}`, skin, 12)); out.push(stroke(`M${sx} ${sy}L${pt([ex, ey])}`, top, 22)); if (wax) out.push(stroke(`M${sx} ${sy}L${pt([ex, ey])}`, `url(#${wax})`, 22)); }
    else if (sleeve === "long" || coat || jacket || boubou) out.push(stroke(`M${sx} ${sy}L${pt([ex, ey])}L${pt([kx, ky])}`, sleeveCol, aw));
    else { out.push(stroke(`M${sx} ${sy}L${pt([ex, ey])}L${pt([hx, hy])}`, skin, 12)); out.push(stroke(`M${sx} ${sy}L${pt([(sx + ex) / 2, (sy + ey) / 2])}`, sleeveCol, 16)); }
    if (wax && !coat && !jacket && (sleeve === "long" || boubou)) out.push(stroke(`M${sx} ${sy}L${pt([ex, ey])}L${pt([kx, ky])}`, `url(#${wax})`, aw));
    if (side === "r" && point) { const [px, py] = point, L = Math.hypot(px - hx, py - hy); out.push(stroke(`M${pt([hx, hy])}L${pt([hx + ((px - hx) / L) * 12, hy + ((py - hy) / L) * 12])}`, skin, 5)); }
    out.push(`<circle cx="${f(hx)}" cy="${f(hy)}" r="7.5" fill="${skin}"/>`);
    if (side === "r" && rhand) out.push(rhand(hx, hy));
    if (side === "l" && lhand) out.push(lhand(hx, hy));
    if (side === "l" && phone) out.push(`<g transform="translate(${f(hx)} ${f(hy)}) rotate(${phone.rot ?? -10})"><rect x="-6" y="-17" width="12" height="21" rx="2.5" fill="${C.dark}"/><rect x="-4" y="-14.5" width="8" height="14" rx="1" fill="${phone.screen ?? C.sky}"/></g><circle cx="${f(hx)}" cy="${f(hy) + 1}" r="6" fill="${skin}"/>`);
    return out.join("");
  };

  /* Buste */
  const torso = boubou ? "M-36 -182Q-36 -206 -14 -206H14Q36 -206 36 -182L32 -110Q0 -102 -32 -110Z" : "M-30 -184Q-30 -206 -12 -206H12Q30 -206 30 -184L27 -110Q0 -104 -27 -110Z";
  g.push(`<rect x="-7" y="-220" width="14" height="22" fill="${skin}"/>`);
  if (back) g.push(arm([-27, -192], arms.l, "l"), arm([27, -192], arms.r, "r"));
  if (coat) {
    g.push(`<path d="${torso}" fill="${coat.inner ?? C.blue}"/>`);
    const coatD = "M-31 -184Q-31 -206 -12 -206H-4L-3 -60H-34ZM31 -184Q31 -206 12 -206H4L3 -60H34Z";
    if (!back) g.push(`<path d="${coatD}" fill="${C.white}"/><rect x="-26" y="-140" width="14" height="12" rx="2" fill="${C.sand}"/>`);
    else g.push(`<path d="M-31 -184Q-31 -206 -12 -206H12Q31 -206 31 -184L34 -60H-34Z" fill="${C.white}"/>`);
  } else if (jacket) {
    g.push(`<path d="${torso}" fill="${jacket.color}"/>`);
    if (!back) {
      g.push(`<path d="M-12 -206H12L4 -150H-4Z" fill="${jacket.shirt ?? C.white}"/>`);
      if (jacket.tie) g.push(`<path d="M-3 -200H3L5 -164L0 -156L-5 -164Z" fill="${jacket.tie}"/>`);
      g.push(`<path d="M-12 -206L-2 -150L-16 -176Z" fill="rgba(0,0,0,.22)"/><path d="M12 -206L2 -150L16 -176Z" fill="rgba(0,0,0,.22)"/><circle cx="0" cy="-130" r="2.5" fill="rgba(0,0,0,.35)"/>`);
    }
  } else g.push(paint(torso, top, wax));
  if (!back && !jacket) g.push(`<path d="M-10 -206L0 -191L10 -206Z" fill="${skin}"/>`);
  if (!back && boubou) g.push(stroke("M-14 -206L0 -184L14 -206", C.ocre, 4), stroke("M-5 -184V-150M5 -184V-150", C.ocre, 2.5));
  // Dashiki : plastron brodé autour de l'encolure.
  if (!back && dashiki) g.push(`<path d="M-20 -206L0 -166L20 -206L13 -206L0 -180L-13 -206Z" fill="${dashiki === true ? C.ocre : dashiki}"/>`, stroke("M-16 -200L0 -170L16 -200", C.dark, 1.6, ' stroke-dasharray="2 3"'), stroke("M0 -166V-136", dashiki === true ? C.ocre : dashiki, 4));
  if (!back && coat) g.push(stroke("M-14 -205Q-20 -170 -6 -160Q4 -156 8 -170", C.dark, 3), `<circle cx="8" cy="-170" r="4" fill="${C.steel}"/>`);
  if (agbada) for (const [side, k] of [["l", -1], ["r", 1]]) { const [, [hx, hy]] = arms[side]; g.push(paint(`M${k * 26} -200L${f(hx + k * 8)} ${f(hy + 6)}L${k * 46} -40Q${k * 30} -60 ${k * 24} -112Z`, top, wax)); }
  if (!back) g.push(arm([-27, -192], arms.l, "l"), arm([27, -192], arms.r, "r"));

  /* Tête */
  g.push(`<ellipse cx="-21" cy="-235" rx="4.5" ry="6.5" fill="${skin}"/><ellipse cx="21" cy="-235" rx="4.5" ry="6.5" fill="${skin}"/>`);
  g.push(`<ellipse cx="0" cy="-238" rx="21" ry="25" fill="${skin}"/>`);
  if (beard && !back) g.push(`<path d="M-20 -236Q-18 -213 0 -212Q18 -213 20 -236Q17 -226 10 -222Q0 -226 -10 -222Q-17 -226 -20 -236Z" fill="${hc}"/>`);
  /* Visage : yeux avec un reflet, sourcils, nez, bouche (couleur lèvres, lisible sur toutes les peaux et sur la barbe) */
  if (!back && face !== "none") {
    const ey = hat?.type === "cap" ? -233 : -237, eye = "#0E0907", lip = "#7E2F25";
    g.push(`<ellipse cx="-8" cy="${ey}" rx="2.6" ry="3.1" fill="${eye}"/><ellipse cx="8" cy="${ey}" rx="2.6" ry="3.1" fill="${eye}"/><circle cx="-7.1" cy="${ey - 1.2}" r=".9" fill="#fff"/><circle cx="8.9" cy="${ey - 1.2}" r=".9" fill="#fff"/>`);
    if (hat?.type !== "cap" && hat?.type !== "helmet") g.push(stroke(`M-12 ${ey - 7}Q-8 ${ey - 9.5} -4 ${ey - 7.5}M4 ${ey - 7.5}Q8 ${ey - 9.5} 12 ${ey - 7}`, eye, 1.7, ' opacity=".85"'));
    g.push(stroke(`M-1 ${ey + 5}Q1.5 ${ey + 9} -2 ${ey + 10}`, "rgba(0,0,0,.32)", 1.6));
    const my = ey + 15;
    if (face === "laugh") g.push(`<path d="M-7 ${my - 1}Q0 ${my - 2} 7 ${my - 1}Q6 ${my + 6} 0 ${my + 6}Q-6 ${my + 6} -7 ${my - 1}Z" fill="${lip}"/><path d="M-6 ${my - 1}Q0 ${my - 2} 6 ${my - 1}L5.5 ${my + 1}Q0 ${my} -5.5 ${my + 1}Z" fill="#fff"/>`);
    else if (face === "talk") g.push(`<ellipse cx="0" cy="${my + 1}" rx="3.6" ry="2.8" fill="${lip}"/>`);
    else if (face === "calm") g.push(stroke(`M-4 ${my}Q0 ${my + 1.6} 4 ${my}`, lip, 2.2));
    else g.push(stroke(`M-6 ${my - 1}Q0 ${my + 4} 6 ${my - 1}`, lip, 2.4));
  }

  /* Cheveux devant */
  const cap = "M-22 -236Q-24 -266 0 -266Q24 -266 22 -236Q19 -251 8 -254Q0 -251 -10 -254Q-19 -251 -22 -236Z";
  const full = `<path d="M-22 -232Q-24 -266 0 -266Q24 -266 22 -232Q22 -218 14 -214H-14Q-22 -218 -22 -232Z" fill="${hc}"/>`;
  if (!hat || hat.type === "chapeau" || hat.type === "kufi" || hat.type === "ashetu") switch (hair.type) {
    case "short": case "puffs": g.push(back ? full : `<path d="${cap}" fill="${hc}"/>`); break;
    case "rase": g.push(back ? `<path d="M-21 -236Q-22 -264 0 -264Q22 -264 21 -236Q21 -224 16 -218H-16Q-21 -224 -21 -236Z" fill="${hc}" opacity=".8"/>` : `<path d="M-21.5 -238Q-23 -265 0 -265Q23 -265 21.5 -238Q20 -254 0 -257Q-20 -254 -21.5 -238Z" fill="${hc}" opacity=".8"/>`); break;
    case "afro": g.push(back ? `<circle cx="0" cy="-245" r="35" fill="${hc}"/>` : `<path d="M-23 -230Q-27 -270 0 -272Q27 -270 23 -230Q17 -250 0 -253Q-17 -250 -23 -230Z" fill="${hc}"/>`); break;
    case "tresses":
      g.push(back ? full : `<path d="${cap}" fill="${hc}"/>`, `<circle cx="0" cy="-270" r="12" fill="${hc}"/>`);
      if (back) g.push(stroke("M-9 -222Q-12 -200 -10 -176", hc, 7), stroke("M0 -220V-172", hc, 7), stroke("M9 -222Q12 -200 10 -176", hc, 7));
      break;
    case "nattes": case "fulani": case "boxbraids": case "bantu": {
      // Nattes collées (et départ des tresses) : des rangs serrés, la peau visible entre eux.
      g.push(back ? full : `<path d="${cap}" fill="${hc}"/>`);
      const sep = (d) => stroke(d, skin, 1.5, ' opacity=".6"');
      if (hair.type !== "bantu") {
        if (back) for (const k of [-15, -8, 0, 8, 15]) g.push(sep(`M${k * 0.6} -263Q${k * 1.1} -240 ${k * 0.9} -218`));
        else for (const k of [-15, -8, 0, 8, 15]) g.push(sep(`M${k} -252Q${k * 1.05} -262 ${k * 0.55} -266`));
      }
      if (hair.type === "boxbraids" && back) for (let i = -3; i <= 3; i++) { const x1 = i * 6.5, y1 = -150 - Math.abs(i) * 3; g.push(stroke(`M${i * 4} -226Q${i * 5.5} -190 ${x1} ${y1}`, hc, 5)); if (beads) g.push(`<circle cx="${x1}" cy="${y1 + 2}" r="2.8" fill="${beads}"/>`); }
      if (hair.type === "fulani") {
        // Tresses peules : une tresse de chaque côté du visage, une au milieu du front, perles.
        const bc = beads ?? C.ocre;
        if (!back) {
          for (const k of [-1, 1]) g.push(stroke(`M${k * 19} -246Q${k * 24} -226 ${k * 22} -198`, hc, 5), `<circle cx="${k * 22}" cy="${-206}" r="3" fill="${bc}"/><circle cx="${k * 22}" cy="${-196}" r="3" fill="${C.white}"/>`);
          g.push(stroke("M0 -266V-254", hc, 4.5), `<circle cx="0" cy="-252" r="3" fill="${bc}"/>`);
        } else for (const k of [-6, 0, 6]) g.push(stroke(`M${k} -224Q${k * 1.3} -205 ${k * 1.2} -190`, hc, 5), `<circle cx="${k * 1.2}" cy="-188" r="3" fill="${bc}"/>`);
      }
      if (hair.type === "bantu") for (const [bx, by] of [[-15, -260], [0, -268], [15, -260], [-21, -246], [21, -246]].concat(back ? [[-8, -234], [8, -234]] : [])) g.push(`<circle cx="${bx}" cy="${by}" r="7" fill="${hc}"/>`, stroke(`M${bx - 3} ${by}Q${bx} ${by - 4} ${bx + 3} ${by}`, skin, 1.3, ' opacity=".5"'));
      break;
    }
    case "gele": {
      // Gele : grand foulard empesé, noué en éventail plissé qui monte d'un côté.
      const fc = hair.color ?? C.ocre;
      const d = "M-24 -242Q-30 -260 -24 -274L-44 -300Q-22 -298 -8 -318Q6 -302 26 -314Q28 -296 48 -290Q36 -276 27 -262Q26 -250 24 -242Q0 -256 -24 -242Z";
      g.push(paint(d, fc, hair.wax));
      g.push(stroke("M0 -260L-44 -300M0 -260L-8 -318M0 -260L26 -314M0 -260L48 -290", "rgba(0,0,0,.2)", 2.4));
      g.push(`<path d="M-24 -242Q0 -258 24 -242Q26 -250 25 -256Q0 -270 -25 -256Q-25 -250 -24 -242Z" fill="rgba(0,0,0,.16)"/>`);
      if (back) g.push(`<path d="M-22 -240Q0 -228 22 -240Q22 -222 14 -216H-14Q-22 -222 -22 -240Z" fill="${HAIR}"/>`);
      break;
    }
    case "locks":
      g.push(back ? full : `<path d="${cap}" fill="${hc}"/>`);
      if (back) for (const k of [-12, -4, 4, 12]) g.push(stroke(`M${k} -224Q${k * 1.3} -200 ${k * 1.2} -184`, hc, 7));
      break;
    case "foulard": {
      const fc = hair.color ?? C.ocre;
      const d = "M-23 -243Q-31 -270 -15 -288Q2 -305 21 -295Q34 -285 28 -262Q27 -251 23 -243Q0 -259 -23 -243Z";
      g.push(paint(d, fc, hair.wax));
      g.push(`<path d="M12 -293Q29 -312 39 -298Q35 -284 22 -286Z" fill="${fc}"/>`, stroke("M-23 -255Q0 -271 26 -258", "rgba(0,0,0,.18)", 3), stroke("M-19 -271Q0 -288 22 -276", "rgba(0,0,0,.14)", 3));
      if (back) g.push(`<path d="M-22 -240Q0 -228 22 -240Q22 -222 14 -216H-14Q-22 -222 -22 -240Z" fill="${HAIR}"/>`);
      break;
    }
  }
  /* Couvre-chefs */
  if (hat) {
    const hcol = hat.color ?? C.terra;
    if (hat.type === "cap") g.push(`<path d="M-22 -240Q-24 -268 0 -268Q24 -268 22 -240Z" fill="${hcol}"/>`, back ? "" : `<path d="M-4 -244Q20 -250 38 -242Q30 -236 -2 -238Z" fill="${hcol}"/><path d="M-4 -244Q20 -250 38 -242Q30 -236 -2 -238Z" fill="rgba(0,0,0,.2)"/>`);
    if (hat.type === "helmet") g.push(back ? `<path d="M-28 -224Q-32 -278 0 -280Q32 -278 28 -224Q26 -216 18 -216H-18Q-26 -216 -28 -224Z" fill="${hcol}"/>` : `<path d="M-28 -222Q-32 -278 0 -280Q32 -278 28 -222H19Q20 -246 0 -248Q-20 -246 -19 -222Z" fill="${hcol}"/><path d="M-22 -250Q0 -262 22 -250L21 -242Q0 -252 -21 -242Z" fill="${C.dark}" opacity=".85"/>`, `<path d="M-20 -270Q0 -278 20 -270" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="4" stroke-linecap="round"/>`);
    if (hat.type === "chapeau") g.push(`<ellipse cx="0" cy="-256" rx="42" ry="9" fill="${hat.color ?? C.yellow}"/><path d="M-20 -256Q-20 -284 0 -284Q20 -284 20 -256Z" fill="${hat.color ?? C.yellow}"/><path d="M-20 -260H20" stroke="${C.terra}" stroke-width="4"/><ellipse cx="0" cy="-256" rx="42" ry="9" fill="rgba(0,0,0,.08)"/>`);
    // Bonnet de notable des Grassfields (Cameroun) : tricoté, couvert de petites boules.
    if (hat.type === "ashetu") {
      const c2 = hat.color2 ?? C.dark;
      g.push(`<path d="M-23 -244Q-26 -282 0 -284Q26 -282 23 -244Q0 -252 -23 -244Z" fill="${hcol}"/>`);
      let n = 0;
      for (const [row, y0, w0] of [[0, -250, 20], [1, -259, 19], [2, -268, 16], [3, -276, 10]]) for (let bx = -w0; bx <= w0 + 0.1; bx += 6.2) g.push(`<circle cx="${f(bx + (row % 2) * 3.1)}" cy="${y0}" r="3.3" fill="${n++ % 2 ? c2 : hcol}"/>`);
      g.push(`<circle cx="0" cy="-283" r="3.3" fill="${c2}"/>`);
    }
    if (hat.type === "kufi") g.push(`<path d="M-21 -250V-270Q0 -276 21 -270V-250Q0 -256 -21 -250Z" fill="${hcol}"/>` + (hat.wax ? `<path d="M-21 -250V-270Q0 -276 21 -270V-250Q0 -256 -21 -250Z" fill="url(#${hat.wax})"/>` : ""));
  }
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${g.join("")}</g>`;
}

/* ---------- Motifs (à référencer par url(#id)) ---------- */
export const defs = `<defs>
  <pattern id="wax1" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="4.5" fill="none" stroke="${C.ocre}" stroke-width="2"/><circle cx="8" cy="8" r="1.4" fill="${C.ocre}"/><circle cx="0" cy="0" r="1.6" fill="${C.cream}"/><circle cx="16" cy="16" r="1.6" fill="${C.cream}"/><circle cx="16" cy="0" r="1.6" fill="${C.cream}"/><circle cx="0" cy="16" r="1.6" fill="${C.cream}"/></pattern>
  <pattern id="wax2" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M0 7L7 0L14 7L7 14Z" fill="none" stroke="${C.cream}" stroke-width="1.6" opacity=".8"/><circle cx="7" cy="7" r="1.8" fill="${C.terra}"/></pattern>
  <pattern id="wax3" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M0 6Q3 2 6 6T12 6" fill="none" stroke="${C.ocre}" stroke-width="1.6"/></pattern>
  <pattern id="kente" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="${C.ocre}"/><rect width="12" height="12" fill="${C.green}"/><rect x="12" y="12" width="12" height="12" fill="${C.terra}"/><rect y="5" width="24" height="2" fill="${C.dark}" opacity=".5"/><rect y="17" width="24" height="2" fill="${C.dark}" opacity=".5"/></pattern>
  <pattern id="ndop" width="28" height="28" patternUnits="userSpaceOnUse"><rect width="28" height="28" fill="#1C2756"/><g fill="none" stroke="#F4F1EA" stroke-width="1.6"><circle cx="7" cy="7" r="4"/><path d="M7 3V11M3 7H11"/><path d="M21 17L25 21L21 25L17 21Z"/><path d="M0 14L3.5 11L7 14L10.5 11L14 14L17.5 11L21 14L24.5 11L28 14"/><rect x="18" y="4" width="6" height="6"/></g><circle cx="7" cy="21" r="1.6" fill="#F4F1EA"/><circle cx="3" cy="25" r="1" fill="#F4F1EA"/><circle cx="11" cy="25" r="1" fill="#F4F1EA"/></pattern>
  <pattern id="toghu" width="26" height="26" patternUnits="userSpaceOnUse"><rect width="26" height="26" fill="#15110F"/><circle cx="13" cy="13" r="7" fill="none" stroke="#D8342A" stroke-width="2.2"/><circle cx="13" cy="13" r="3.8" fill="none" stroke="#F2C230" stroke-width="1.8"/><circle cx="13" cy="13" r="1.5" fill="#3E9B4F"/><path d="M13 2V4.5M13 21.5V24M2 13H4.5M21.5 13H24" stroke="#F2C230" stroke-width="1.6"/><circle cx="0" cy="0" r="1.6" fill="#F4F1EA"/><circle cx="26" cy="0" r="1.6" fill="#F4F1EA"/><circle cx="0" cy="26" r="1.6" fill="#F4F1EA"/><circle cx="26" cy="26" r="1.6" fill="#F4F1EA"/></pattern>
  <pattern id="bogolan" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#5E3E26"/><g stroke="#EADBC4" stroke-width="1.8" stroke-linecap="round"><path d="M6 3V9M3 6H9"/><path d="M14 4H21M14 8H21"/><path d="M3 16L7 20L11 16M13 16L17 20L21 16"/></g><circle cx="6" cy="22" r="1" fill="#EADBC4"/><circle cx="18" cy="12" r="1" fill="#EADBC4"/></pattern>
  <pattern id="kitenge" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="${C.green}"/><circle cx="15" cy="15" r="9" fill="${C.ocre}"/><circle cx="15" cy="15" r="5" fill="${C.terra}"/><circle cx="15" cy="15" r="1.8" fill="${C.cream}"/><path d="M0 0L5 5M30 0L25 5M0 30L5 25M30 30L25 25" stroke="${C.cream}" stroke-width="2"/></pattern>
</defs>`;
/** Le cadre d'une scène : fond arrondi 800×600. */
// Le décor est découpé à la forme du cadre (coins arrondis), pour que le sol et les murs ne débordent pas aux coins.
export const frame = (inner, bg = C.sky) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">${defs}<clipPath id="cadre"><rect width="800" height="600" rx="36"/></clipPath><rect width="800" height="600" rx="36" fill="${bg}"/><g clip-path="url(#cadre)">${inner}</g></svg>`;

/* ---------- Décor réutilisable ---------- */
export const plant = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0Q-26 -30 -14 -66Q4 -40 0 0Z" fill="${C.leaf}"/><path d="M0 0Q24 -26 20 -62Q-2 -40 0 0Z" fill="${C.leaf2}"/><path d="M0 0Q-4 -50 6 -80Q14 -46 0 0Z" fill="${C.leaf}"/><path d="M-16 -4H16L12 26H-12Z" fill="${C.terra}"/></g>`;
/** Palmier : pied du tronc en (x,y). */
export const palm = (x, y, s = 1, lean = 10) => `<g transform="translate(${x} ${y}) scale(${s})">${stroke(`M0 0Q${lean} -90 ${lean * 0.6} -180`, C.wood, 14)}${[[-70, -150], [-60, -200], [10, -230], [70, -205], [80, -150]].map(([px, py]) => `<path d="M${lean * 0.6} -180Q${(px + lean * 0.6) / 2} ${py - 30} ${px} ${py}Q${(px + lean * 0.6) / 2} ${py - 6} ${lean * 0.6} -180Z" fill="${C.leaf}"/>`).join("")}<circle cx="${lean * 0.6 - 6}" cy="-176" r="7" fill="${C.wood2}"/><circle cx="${lean * 0.6 + 6}" cy="-174" r="7" fill="${C.wood2}"/></g>`;
/** Petit nuage. */
export const cloud = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${C.white}" opacity=".9"><circle cx="0" cy="0" r="18"/><circle cx="22" cy="-8" r="22"/><circle cx="46" cy="2" r="16"/><rect x="0" y="0" width="46" height="16"/></g>`;
/** Bulle « événement » (cercles concentriques) avec un pictogramme au centre. */
export const bubble = (x, y, inner, col = C.green) => `<circle cx="${x}" cy="${y}" r="58" fill="${col}" opacity=".12"/><circle cx="${x}" cy="${y}" r="42" fill="${col}" opacity=".22"/><circle cx="${x}" cy="${y}" r="29" fill="${col}"/><g transform="translate(${x} ${y})">${inner}</g>`;
export const check = (col = C.white) => stroke("M-12 0L-3 9L13 -9", col, 6);
