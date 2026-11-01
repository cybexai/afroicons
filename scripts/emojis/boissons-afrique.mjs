// Emojis africains originaux : boissons (jus, bières, thés, tisanes), sans équivalent Unicode (char: null).
// Chaque boisson a son récipient (bouteille, sachet, calebasse, canari, flacon, verres à thé, gourde, tasse émaillée…),
// sa couleur et son ingrédient phare à côté, pour rester distinctes entre elles dès 24 px.
import { O, W, C, path, circle, ellipse, rect, line, g } from "./lib.mjs";

/** Trait épais « plein » : contour brun puis couleur par-dessus (tiges, pailles, manches). */
const thick = (d, col, w = 1.5) => line(d, O, w + 2 * W) + line(d, col, w);
const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const steam = (xs, y = 4.6) => line(xs.map((x) => `M${x} ${y}Q${x - 0.8} ${y - 1.4} ${x} ${y - 2.6}`).join(""), C.gris, 0.8);
/** Récipient transparent : verre clair, liquide sans contour, puis contour par-dessus. */
const vessel = (d, liquid, col, glass = GLASS) => path(d, glass) + path(liquid, col, false) + path(d, "none");

const GLASS = "#EAF4FA";

/* 1. Jus de gingembre : bouteille plastique réutilisée, jus jaune pâle, racine de gingembre. */
const GINGER = "#EFD66A", GINGER_LIGHT = "#F8EAA6", ROOT = "#D9A85A", ROOT_DARK = "#B07E3A";
const gingembre = [
  rect(6.6, 1.6, 3.6, 2.2, 0.5, C.bleu),
  line("M7.4 2.7H9.4", C.ciel, 0.6),
  vessel("M6.8 3.8H10V5.2Q13.4 6.2 13.4 9V20.4Q13.4 22 11.8 22H5Q3.4 22 3.4 20.4V9Q3.4 6.2 6.8 5.2Z",
    "M3.6 8.2H13.2V20.4Q13.2 21.6 11.8 21.6H5Q3.6 21.6 3.6 20.4Z", GINGER),
  rect(3.4, 11.6, 10, 4.2, 0, C.vertLight),
  line("M4.6 13.7H12.2", C.white, 0.7),
  line("M3.6 18.4H13.2", "#D8BC4A", 0.7),
  line("M5 9.6V10.6M5 17.2V20", GINGER_LIGHT, 0.9),
  // racine de gingembre
  path("M13.8 20.6Q13.4 18.4 15.4 18Q15.6 15.8 17.6 16Q18.2 13.8 20.2 14.6Q21.8 15.6 20.8 17.4Q22.6 18.4 21.8 20.4Q20.8 22.2 18.2 21.8Q15.4 22.6 13.8 20.6Z", ROOT),
  line("M15.6 18.2Q16.4 19 16.2 20.2M17.8 16.2Q18.6 17 18.4 18.4M20.4 17.6Q19.6 18.6 19.8 20", ROOT_DARK, 0.6),
  path("M19.8 14.8Q20.2 13.6 21.2 13.8Q21.4 14.8 20.6 15.2Z", "#F1D9A6", { w: 0.7 }),
].join("");

/* 2. Bouye : verre de jus de pain de singe crème, fruit du baobab ouvert (coque veloutée, pulpe blanche). */
const BOUYE = "#F3EAD2", POD = "#8C8A4E", POD_DARK = "#666437", PULP = "#FBF7EC";
const bouye = [
  vessel("M10.8 6H21.2L20 21Q19.9 22 18.9 22H13.1Q12.1 22 12 21Z", "M11.1 8.6H20.9L19.8 20.8Q19.7 21.6 18.9 21.6H13.1Q12.3 21.6 12.2 20.8Z", BOUYE),
  ellipse(16, 8.6, 4.9, 0.8, "#FFFDF6", { w: 0.6 }),
  line("M12.4 10.4L13.2 19.6", C.white, 0.8),
  // fruit du baobab
  g("rotate(-28 6 14.4)",
    ellipse(6, 14.4, 3.6, 7.2, POD),
    ellipse(6.4, 14.4, 2.4, 5.8, PULP, { w: 0.8 }),
    line("M4.4 11.4Q6.4 12.2 8.6 11.2M4.2 14.4Q6.4 15.2 8.8 14.2M4.4 17.4Q6.4 18.2 8.6 17.2", "#DCCFB0", 0.6),
    line("M3.2 10.6Q2.8 14.4 3.4 18.6", POD_DARK, 0.6),
    thick("M6 7.2L6 4.6", C.bois, 0.9)),
].join("");

/* 3. Dolo : calebasse de bière de mil brun-rouge mousseuse, devant le canari de brassage. */
const DOLO = "#9C4A2C", DOLO_FOAM = "#E2B597", CANARI = "#C2683A", CANARI_DARK = "#9A4A26", CALABASH = "#EBC77E";
const dolo = [
  // canari
  path("M4.4 3.2H11.6V4.6Q15.4 6.6 15.4 11Q15.4 15.6 11 16.6H5Q0.6 15.6 0.6 11Q0.6 6.6 4.4 4.6Z", CANARI),
  ellipse(8, 3.2, 3.6, 0.9, CANARI_DARK, { w: 0.8 }),
  line("M2 8.6Q8 10.4 14 8.6", CANARI_DARK, 0.7),
  line("M2.4 10.6L3.4 9.8L4.4 10.8L5.4 10L6.4 11L7.4 10.2L8.4 11.2L9.4 10.2L10.4 11L11.4 10L12.4 10.8L13.6 9.8", CANARI_DARK, 0.6),
  // calebasse
  path("M5.4 13.2H22.6Q22.2 21.8 14 21.8Q5.8 21.8 5.4 13.2Z", CALABASH),
  line("M7.4 16.6Q14 18.4 20.6 16.6", C.bois, 0.7),
  ellipse(14, 13.2, 8.6, 2.2, C.bois),
  ellipse(14, 13.2, 7.6, 1.6, DOLO, { w: 0.7 }),
  ellipse(11.4, 12.8, 2.6, 0.9, DOLO_FOAM, false),
  ellipse(16.6, 13.4, 2.4, 0.8, DOLO_FOAM, false),
  dots([[9.6, 13.6], [13.8, 12.4], [19, 12.8], [12.6, 13.9]], 0.4, "#F4D6C0"),
].join("");

/* 4. Tej : hydromel doré dans le berele, flacon à fond rond et long col. */
const TEJ = "#F2B42A", TEJ_LIGHT = "#F9D46B";
const tej = [
  vessel("M10.6 1.8H13.4V3Q12.9 3.2 12.9 4.2V9.6Q18.4 10.8 18.4 15.8Q18.4 22.2 12 22.2Q5.6 22.2 5.6 15.8Q5.6 10.8 11.1 9.6V4.2Q11.1 3.2 10.6 3Z",
    "M11.3 10.6H12.7Q18 11.6 18 15.8Q18 21.8 12 21.8Q6 21.8 6 15.8Q6 11.6 11.3 10.6Z", TEJ),
  ellipse(12, 10.6, 0.8, 0.3, TEJ_LIGHT, false),
  path("M7.8 14.4Q8.4 12.6 10.2 12.2", "none", { c: C.white, w: 0.9 }),
  ellipse(14.2, 17.6, 1.6, 1, TEJ_LIGHT, false),
  // abeille
  ellipse(19.4, 5.4, 1.5, 1.6, "#CFE8F5", { w: 0.6 }),
  ellipse(17.6, 7, 1.7, 1.2, C.jaune, { w: 0.8 }),
  line("M17.2 6V8M18.2 6V8", O, 0.6),
].join("");

/* 5. Kunu : tasse émaillée (blanche, bord bleu) de boisson de mil beige, épi et grains de mil. */
const KUNU = "#D8BE8A", ENAMEL = "#F6F4EE", ENAMEL_BLUE = "#2F5DA8", MILLET = "#D6A443";
const kunu = [
  path("M14 10.6H16.2A2.8 2.8 0 0 1 16.2 16.2H14", "none", { c: O, w: 3 }),
  path("M14 10.6H16.2A2.8 2.8 0 0 1 16.2 16.2H14", "none", { c: ENAMEL, w: 1.2 }),
  path("M3.2 7.4H14.6V20.2Q14.6 21.8 13 21.8H4.8Q3.2 21.8 3.2 20.2Z", ENAMEL),
  path("M3.2 19.6H14.6V20.2Q14.6 21.8 13 21.8H4.8Q3.2 21.8 3.2 20.2Z", ENAMEL_BLUE),
  ellipse(8.9, 7.4, 5.7, 2.1, ENAMEL_BLUE),
  ellipse(8.9, 7.5, 4.8, 1.5, KUNU, { w: 0.6 }),
  ellipse(7.4, 7.2, 1.6, 0.4, "#EBD9B2", false),
  ellipse(6, 15.4, 0.8, 0.6, O, false),
  line("M4.6 9.6V17", C.white, 0.9),
  // épi de mil
  thick("M20.2 22L19.6 11", C.vertLight, 0.8),
  path("M19.6 11.6Q17.6 9 18.2 4.6Q19.2 1.8 20.4 4.4Q21.6 8.6 19.6 11.6Z", MILLET),
  dots([[19.2, 5.2], [20, 6.6], [19, 7.6], [19.8, 9], [19.4, 4.2]], 0.4, "#F2CF7E"),
  dots([[16.6, 21.4], [17.8, 20.6], [22, 21.2], [17.2, 22.2]], 0.45, MILLET),
].join("");

/* 6. Ataya : deux petits verres au haut col de mousse, petite théière bleue sur le fourneau à charbon. */
const ATAYA = "#9A4B1C", ATAYA_FOAM = "#F5E6C8", POT = "#3E6FB8", POT_DARK = "#2B4F8A";
const smallGlass = (x) => vessel(`M${x} 11.4H${x + 4.4}L${x + 3.9} 21.4Q${x + 3.85} 22 ${x + 3.2} 22H${x + 1.2}Q${x + 0.55} 22 ${x + 0.5} 21.4Z`,
  `M${x + 0.1} 11.6H${x + 4.3}L${x + 3.8} 21.3Q${x + 3.75} 21.7 ${x + 3.2} 21.7H${x + 1.2}Q${x + 0.65} 21.7 ${x + 0.6} 21.3Z`, ATAYA)
  + path(`M${x + 0.1} 11.6H${x + 4.3}L${x + 4} 16.6H${x + 0.4}Z`, ATAYA_FOAM, false)
  + path(`M${x - 0.2} 11.6Q${x + 0.4} 9.4 ${x + 2.2} 9.6Q${x + 4} 9.4 ${x + 4.6} 11.6Z`, ATAYA_FOAM, { w: 0.8 })
  + path(`M${x} 11.4H${x + 4.4}L${x + 3.9} 21.4Q${x + 3.85} 22 ${x + 3.2} 22H${x + 1.2}Q${x + 0.55} 22 ${x + 0.5} 21.4Z`, "none");
const ataya = [
  // fourneau
  path("M12.8 15.6H22.2L20.8 19.6H14.2Z", "#4A4744"),
  path("M14.6 19.6H20.4L21 22H14Z", "#4A4744"),
  ellipse(17.5, 15.6, 4.7, 1, C.orange, { w: 0.8 }),
  dots([[15.2, 15.6], [17.4, 15.3], [19.6, 15.7]], 0.55, C.rouge),
  // théière
  path("M14.2 10Q12 9.4 11.2 6.8L9.6 6.6Q10 11.6 14.2 12.4Z", POT),
  path("M14 14.6Q13.2 9.4 17.4 9.2Q21.6 9.4 20.8 14.6Z", POT),
  path("M20.6 10.8Q22.6 11.2 21.4 13.8", "none", { c: O, w: 2.6 }), path("M20.6 10.8Q22.6 11.2 21.4 13.8", "none", { c: POT_DARK, w: 0.9 }),
  path("M15.4 9.4Q15.6 7.2 17.4 7.2Q19.2 7.2 19.4 9.4Z", POT_DARK),
  circle(17.4, 6.6, 0.6, POT_DARK, { w: 0.7 }),
  ellipse(15.8, 11.4, 0.8, 0.5, "#9DC0EC", false),
  // verres
  smallGlass(1.4),
  smallGlass(6.4),
].join("");

/* 7. Rooibos : thé rouge-ambré dans une tasse de porcelaine sur soucoupe, brin d'aiguilles de rooibos. */
const ROOIBOS = "#B4401F", ROOIBOS_LIGHT = "#D9683A", NEEDLE = "#5E9C3C";
const rooibos = [
  // brin de rooibos
  thick("M10.4 9.6Q13 5 19.6 1.8", C.bois, 0.7),
  line("M11.6 7.6L10.8 5.6M12.6 6.4L12.2 4.2M13.8 5.4L13.6 3.2M15 4.6L15 2.4M16.4 3.8L16.6 1.8M17.8 3.2L18.4 1.4M12 7.2L13.8 7.8M13.2 6L15.2 6.4M14.6 5L16.6 5.2M16 4.2L18 4.2M17.4 3.4L19.4 3.4M19 2.4L21 2.6", NEEDLE, 0.8),
  // soucoupe et tasse
  ellipse(11.6, 19.8, 10, 2.4, C.white),
  ellipse(11.6, 19.6, 5.4, 1.1, C.grisLight, false),
  path("M17.4 11.6H18.6A2.6 2.6 0 0 1 18.6 16.8H16.4", "none", { c: O, w: 3 }),
  path("M17.4 11.6H18.6A2.6 2.6 0 0 1 18.6 16.8H16.4", "none", { c: C.white, w: 1.2 }),
  path("M3.2 10.4H19Q19 19.2 11.1 19.2Q3.2 19.2 3.2 10.4Z", C.white),
  line("M4 13.6Q11.1 15 18.2 13.6", C.rouge, 0.9),
  ellipse(11.1, 10.4, 7.9, 1.8, C.white),
  ellipse(11.1, 10.5, 6.9, 1.2, ROOIBOS, { w: 0.6 }),
  ellipse(9, 10.3, 1.8, 0.4, ROOIBOS_LIGHT, false),
].join("");

/* 8. Umqombothi : bière de sorgho rose-beige mousseuse dans l'ukhamba, pot noir en terre. */
const UKHAMBA = "#2E2926", UKHAMBA_LINE = "#6A625B", UMQ_FOAM = "#EBCDB8", UMQ = "#D6A68C";
const umqombothi = [
  path("M4.6 9.6Q1.4 12.4 1.6 15.6Q2 21.6 12 21.8Q22 21.6 22.4 15.6Q22.6 12.4 19.4 9.6Z", UKHAMBA),
  path("M4.4 10Q4.6 4.2 12 4.4Q19.4 4.2 19.6 10Q12 11.6 4.4 10Z", UMQ_FOAM),
  ellipse(12, 9.8, 7.6, 1.3, UMQ, { w: 0.7 }),
  dots([[7.6, 6.8], [10.4, 5.8], [13.8, 6.4], [16.4, 7.2], [9, 8.4], [12.4, 8], [15.4, 8.6]], 0.5, C.white),
  line("M4 13.6Q12 15.8 20 13.6", UKHAMBA_LINE, 0.7),
  line("M5 15.4L6.2 17.4L7.4 15.6L8.6 17.8L9.8 15.9L11 18L12.2 16L13.4 18L14.6 15.9L15.8 17.8L17 15.6L18.2 17.4L19.2 15.4", UKHAMBA_LINE, 0.7),
  dots([[6, 19], [9, 19.8], [12, 20.2], [15, 19.8], [18, 19]], 0.45, UKHAMBA_LINE),
  path("M3.6 13.2Q3.2 16.4 5 18.2", "none", { c: "#4D4741", w: 0.8 }),
].join("");

/* 9. Chapman : cocktail rouge vif dans un grand verre droit, rondelles de concombre, tranche d'orange, paille. */
const CHAPMAN = "#E8452B", CHAPMAN_LIGHT = "#F27A55", CUKE = "#4F9A3A", CUKE_IN = "#CFE6A0";
const cuke = (x, y) => circle(x, y, 1.6, CUKE, { w: 0.7 }) + circle(x, y, 1, CUKE_IN, false) + dots([[x - 0.35, y - 0.2], [x + 0.35, y + 0.25]], 0.2, "#F4F8E2");
const chapman = [
  thick("M10 9L12.8 1.2", C.jaune, 1),
  vessel("M5.4 5H15.6V20.6Q15.6 22 14.2 22H6.8Q5.4 22 5.4 20.6Z", "M5.6 7.6H15.4V20.6Q15.4 21.6 14.2 21.6H6.8Q5.6 21.6 5.6 20.6Z", CHAPMAN),
  ellipse(10.5, 7.6, 4.9, 0.7, CHAPMAN_LIGHT, false),
  cuke(8.6, 12.4), cuke(12.2, 16.6), cuke(8.4, 19.2),
  line("M6.6 9.6V14", C.white, 0.8),
  // tranche d'orange sur le bord
  path("M12.6 6.4A5 5 0 0 1 22.6 6.4Z", C.orange),
  path("M13.9 6.4A3.7 3.7 0 0 1 21.3 6.4Z", "#FBB45E", { w: 0.6 }),
  line("M17.6 6.4V2.9M17.6 6.4L15.1 3.8M17.6 6.4L20.1 3.8", C.orange, 0.6),
].join("");

/* 10. Jus de tamarin (dakhar) : verre de jus brun, gousses de tamarin dont une ouverte. */
const TAMARIN = "#7E3D1C", TAMARIN_LIGHT = "#A85A2E", TPOD = "#9A6634", TPULP = "#6A2E16";
const tamarin = [
  vessel("M9.4 3.6H20.6L19.4 20.6Q19.3 21.6 18.3 21.6H11.7Q10.7 21.6 10.6 20.6Z", "M9.7 6.4H20.3L19.2 20.4Q19.1 21.2 18.3 21.2H11.7Q10.9 21.2 10.8 20.4Z", TAMARIN),
  ellipse(15, 6.4, 5.3, 0.8, TAMARIN_LIGHT, false),
  line("M11.4 8.4L12.2 18.8", "#C88A5E", 0.8),
  // gousses : longues, à peine étranglées entre les graines ; l'une ouverte sur sa pulpe brune
  g("rotate(-14 7 13.4)",
    path("M1.2 13.4Q1.2 11.8 3 11.9Q5 11.3 6.8 12.1Q8.8 11.5 10.6 12.3Q12.8 12.5 12.6 14Q12.4 15.3 10.6 14.9Q8.8 15.6 6.8 14.8Q5 15.6 3 14.9Q1.2 14.9 1.2 13.4Z", TPOD),
    line("M3.2 12.6V14.4M6.8 12.6V14.4M10.6 12.8V14.4", "#7A4B22", 0.5),
    line("M2.4 12.8Q5 12.2 7 12.8", "#C48E52", 0.6)),
  path("M2.2 19.4Q2.2 17.4 4.4 17.5Q6.6 16.8 8.6 17.5Q10.8 16.9 12.8 17.8Q14.2 18.6 13.6 19.9Q12.8 21.4 10.8 21Q8.6 21.8 6.6 21.1Q4.4 21.8 3 21Q2.2 20.6 2.2 19.4Z", TPOD),
  path("M3.2 19.4Q5.4 18.4 8.4 18.8Q11 18.4 12.8 19.4Q11 20.6 8.4 20.2Q5.4 20.6 3.2 19.4Z", TPULP, { w: 0.6 }),
  dots([[5.6, 19.4], [8.6, 19.5], [11.2, 19.4]], 0.45, "#3A1A0C"),
].join("");

/* 11. Kinkéliba : tisane vert-ambré pâle dans une chope en verre, branche de feuilles de kinkéliba. */
const KINK = "#C9B24E", KINK_LIGHT = "#E2D17E", KLEAF = "#4E8F3E", KLEAF_DARK = "#2F6630";
const kleaf = (cx, cy, rot, fill) => g(`rotate(${rot} ${cx} ${cy})`, ellipse(cx, cy, 1.7, 3, fill, { w: 0.8 }), line(`M${cx} ${cy - 2.4}V${cy + 2.4}`, KLEAF_DARK, 0.5));
const kinkeliba = [
  steam([7, 9.6, 12.2], 6),
  path("M14.2 10.6H16A2.8 2.8 0 0 1 16 16.8H14.2", "none", { c: O, w: 3 }),
  path("M14.2 10.6H16A2.8 2.8 0 0 1 16 16.8H14.2", "none", { c: GLASS, w: 1.2 }),
  vessel("M3 7.6H15V20.2Q15 21.8 13.4 21.8H4.6Q3 21.8 3 20.2Z", "M3.2 10H14.8V20.2Q14.8 21.4 13.4 21.4H4.6Q3.2 21.4 3.2 20.2Z", KINK),
  ellipse(9, 10, 5.8, 0.8, KINK_LIGHT, false),
  line("M4.6 11.6V18.6", "#F1E8B8", 0.9),
  // branche
  thick("M18.6 22L19.2 4", C.bois, 0.7),
  kleaf(21, 6.8, 40, KLEAF), kleaf(17.2, 10, -40, C.vertLight), kleaf(21.2, 13.8, 38, KLEAF), kleaf(17.6, 17.4, -36, C.vertLight),
  kleaf(19.2, 2.8, 0, C.vertLight),
].join("");

/* 12. Eau en sachet : sachet de « pure water » bleu translucide, coin mordu, une goutte qui s'échappe. */
const SACHET = "#BFE4F7", SACHET_IN = "#9ED2F0", SACHET_SEAL = "#E2F3FB";
const sachet = [
  g("rotate(-12 12 12.6)",
    path("M3.4 6.2H17.4L20.6 9.4V19.4Q20.6 20.8 19.2 20.8H4.8Q3.4 20.8 3.4 19.4Z", SACHET),
    path("M4.6 9.4H19.4V17.8H4.6Z", SACHET_IN, false),
    path("M3.4 6.2H17.4L18.2 7.6L19 7.2L19.4 8.6L20.2 8.4L20.6 9.4V19.4Q20.6 20.8 19.2 20.8H4.8Q3.4 20.8 3.4 19.4Z", "none"),
    rect(3.4, 6.2, 13.4, 1.6, 0, SACHET_SEAL, { w: 0.8 }),
    rect(3.4, 19.2, 17.2, 1.6, 0.6, SACHET_SEAL, { w: 0.8 }),
    rect(6.6, 11.2, 10.8, 4.4, 1, C.bleu, { w: 0.8 }),
    path("M8 14Q9.4 12.2 10.8 14Q12.2 15.8 13.6 14Q15 12.2 16.2 14", "none", { c: C.white, w: 0.9 }),
    line("M5.4 9.6Q5 13 5.6 16.6", C.white, 0.9)),
  path("M21 1.6Q22.8 4.2 22.4 5.2Q21.6 6.4 20.4 5.4Q19.8 4.4 21 1.6Z", C.eau, { w: 0.8 }),
  line("M18.6 4.6L19.6 3.6", C.eau, 0.8),
].join("");

/* 13. Jus de canne (asab) : verre de jus vert-jaune pâle mousseux, tronçon de canne à sucre. */
const CANE_JUICE = "#C9D86A", CANE_FOAM = "#F1F2CC", CANE = "#B9C84A", CANE_DARK = "#7E8E2A";
const canne = [
  // canne
  g("rotate(22 17.6 12)",
    rect(15.9, 1.4, 3.4, 21.2, 1, CANE),
    line("M15.9 7.4H19.3M15.9 13.4H19.3M15.9 19.2H19.3", CANE_DARK, 0.9),
    line("M17 2.6V6.4M17 8.6V12.4M17 14.6V18.2", "#DCE59A", 0.7),
    ellipse(17.6, 1.6, 1.7, 0.6, "#EEF0C2", { w: 0.7 })),
  vessel("M3.4 5.4H14.6L13.4 20.6Q13.3 21.8 12.1 21.8H5.9Q4.7 21.8 4.6 20.6Z", "M3.6 7.6H14.4L13.2 20.4Q13.1 21.4 12.1 21.4H5.9Q4.9 21.4 4.8 20.4Z", CANE_JUICE),
  path("M3.6 7.4H14.4L14.1 10.4H3.9Z", CANE_FOAM, false),
  path("M3.2 7Q4.6 3.6 9 4Q13.4 3.6 14.8 7Q9 8.4 3.2 7Z", CANE_FOAM, { w: 0.8 }),
  path("M3.4 5.4H14.6L13.4 20.6Q13.3 21.8 12.1 21.8H5.9Q4.7 21.8 4.6 20.6Z", "none"),
  line("M5.4 12L6 19", "#EEF2B8", 0.8),
].join("");

/* 14. Fura da nono : calebasse de lait caillé (nono) blanc, boules de mil (fura), louche en bois. */
const NONO = "#FFFDF5", FURA = "#D7B47C", FURA_DARK = "#B08A52", CALEB = "#F1DDA8", CALEB_DARK = "#A8763A";
const fura = [
  // louche
  thick("M14.4 10.6L20.6 1.8", C.bois, 1.3),
  path("M1.8 11.4H22.2Q21.8 21.8 12 21.8Q2.2 21.8 1.8 11.4Z", CALEB),
  line("M2.6 15.2Q12 17.6 21.4 15.2M4 18.6Q12 20.6 20 18.6", CALEB_DARK, 0.7),
  dots([[5, 16.8], [8, 17.5], [11, 17.9], [14, 17.9], [17, 17.5], [20, 16.8]], 0.45, CALEB_DARK),
  ellipse(12, 11.4, 10.2, 2.4, CALEB_DARK),
  ellipse(12, 11.4, 9.2, 1.8, NONO, { w: 0.7 }),
  ellipse(14.8, 11.2, 2.6, 0.9, C.bois, { w: 0.8 }),
  circle(7.6, 10.6, 1.8, FURA, { w: 0.8 }),
  circle(10.8, 11.6, 1.3, FURA, { w: 0.8 }),
  circle(18.2, 11.8, 1.2, FURA, { w: 0.8 }),
  dots([[7, 10.1], [8.2, 11.2], [10.6, 11.2]], 0.3, FURA_DARK),
].join("");

/* 15. Jus de corossol : grand verre de jus blanc crémeux, corossol vert hérissé de petites épines. */
const SOURSOP = "#F7F3E6", SOUR_FRUIT = "#5A9B44", SOUR_DARK = "#3A6E2E", SOUR_SPIKE = "#2F5B2E";
const corossol = [
  vessel("M11.6 3.4H21.4L20.4 20.8Q20.3 21.8 19.3 21.8H13.7Q12.7 21.8 12.6 20.8Z", "M11.8 6H21.2L20.2 20.6Q20.1 21.4 19.3 21.4H13.7Q12.9 21.4 12.8 20.6Z", SOURSOP),
  ellipse(16.5, 6, 4.7, 0.7, C.white, { w: 0.6 }),
  line("M13.2 8L14 19", C.white, 0.8),
  path("M13.2 8Q13.6 13 14 19", "none", { c: "#E4DECB", w: 0.5 }),
  // corossol
  path("M6.6 6.4Q11.4 7.2 11.2 13.6Q11 21.4 6 22Q1.4 21.4 1.4 14.4Q1.4 7 6.6 6.4Z", SOUR_FRUIT),
  line("M3 11.6Q2.6 15.6 3.6 19", "#86C26A", 0.8),
  line("M3.6 9.2L3 8.6M6.2 8.6L5.8 7.8M9 9.6L9.4 8.8M2.4 13.2L1.6 12.8M5.4 12L5 11.2M8.4 12.8L8.8 12M10.6 14.6L11.4 14.2M4.4 15.6L4 14.8M7.4 16.2L7 15.4M2.6 18L1.8 17.8M5.8 19L5.4 18.2M9 18.8L9.4 18M10.6 17.2L11.4 17", SOUR_SPIKE, 0.8),
  thick("M6.4 6.6L6.8 3.6", C.bois, 0.9),
  path("M6.8 4.4Q8.6 2.2 10.6 3.4Q9 5.4 6.8 4.4Z", C.feuille, { w: 0.8 }),
].join("");

/* 16. Bière de banane (urwagwa) : gourde ouverte de bière ambrée, paille de roseau, banane à côté. */
const URWAGWA = "#C8862E", GOURD = "#B7793A", GOURD_LIGHT = "#D6A160", BANANA = "#F4C93C", BANANA_DARK = "#C9962A";
const banane = [
  thick("M10.4 6L15.4 0.8", C.sable, 1),
  path("M7.6 6Q7.4 8 8.4 9.2Q3 11 3 15.8Q3 21.8 10 21.8Q17 21.8 17 15.8Q17 11 11.6 9.2Q12.6 8 12.4 6Z", GOURD),
  ellipse(10, 6, 2.4, 0.8, URWAGWA, { w: 0.8 }),
  path("M5.4 13.4Q4.6 17 6.4 19.6", "none", { c: GOURD_LIGHT, w: 1 }),
  line("M3.4 15.4Q10 17.4 16.6 15.4", "#8A5626", 0.8),
  // banane
  path("M15.4 12.6Q19.4 13.8 20.8 10.6L21.6 10.8Q22.4 19.6 14.8 21.6Q13.6 21.2 14.4 20.2Q19.6 18.2 15.4 12.6Z", BANANA),
  path("M20.8 10.6L21.6 10.8L21.8 9.6L21 9.4Z", C.marron, { w: 0.7 }),
  line("M20.8 12.6Q20.4 17.4 16.4 20", BANANA_DARK, 0.6),
].join("");

const E = (slug, fr, en, tags, body) => ({ slug, fr, en, char: null, group: "boissons", tags, tone: false, body });
export default [
  E("jus-de-gingembre", "Jus de gingembre", "Ginger juice", ["gnamakoudji", "jus de gingembre", "ginger juice", "gingembre", "ginger", "côte d'ivoire", "sénégal", "afrique de l'ouest", "west africa", "boisson", "drink"], gingembre),
  E("bouye", "Bouye", "Baobab juice", ["bouye", "bouy", "jus de pain de singe", "baobab", "pain de singe", "monkey bread", "sénégal", "senegal", "boisson", "drink"], bouye),
  E("dolo", "Dolo", "Dolo millet beer", ["dolo", "tchapalo", "bière de mil", "millet beer", "sorgho", "sorghum", "calebasse", "calabash", "burkina faso", "mali", "boisson", "drink"], dolo),
  E("tej", "Tej", "Tej honey wine", ["tej", "t'ej", "hydromel", "honey wine", "mead", "miel", "honey", "berele", "éthiopie", "ethiopia", "boisson", "drink"], tej),
  E("kunu", "Kounou", "Kunu", ["kunu", "kounou", "kunun zaki", "mil", "millet", "nigeria", "niger", "haoussa", "hausa", "boisson", "drink"], kunu),
  E("ataya", "Ataya", "Ataya tea", ["ataya", "attaya", "thé", "tea", "thé vert", "green tea", "mousse", "foam", "sénégal", "senegal", "gambie", "mauritanie", "fourneau", "boisson", "drink"], ataya),
  E("rooibos", "Rooibos", "Rooibos tea", ["rooibos", "redbush", "thé rouge", "red tea", "tisane", "herbal tea", "afrique du sud", "south africa", "boisson", "drink"], rooibos),
  E("umqombothi", "Umqombothi", "Umqombothi", ["umqombothi", "bière de sorgho", "sorghum beer", "ukhamba", "xhosa", "zoulou", "zulu", "afrique du sud", "south africa", "boisson", "drink"], umqombothi),
  E("chapman", "Chapman", "Chapman", ["chapman", "cocktail", "concombre", "cucumber", "orange", "nigeria", "boisson", "drink"], chapman),
  E("jus-de-tamarin", "Jus de tamarin", "Tamarind juice", ["dakhar", "daqaar", "tamarin", "tamarind", "jus de tamarin", "tamarind juice", "sénégal", "sahel", "boisson", "drink"], tamarin),
  E("kinkeliba", "Kinkéliba", "Kinkeliba tea", ["kinkéliba", "kinkeliba", "sékhéw", "tisane", "herbal tea", "infusion", "feuilles", "leaves", "sénégal", "mali", "sahel", "boisson", "drink"], kinkeliba),
  E("eau-en-sachet", "Eau en sachet", "Sachet water", ["pure water", "sachet water", "eau en sachet", "eau", "water", "sachet", "ghana", "nigeria", "boisson", "drink"], sachet),
  E("jus-de-canne", "Jus de canne", "Sugarcane juice", ["asab", "assab", "aseer asab", "jus de canne", "sugarcane juice", "canne à sucre", "sugarcane", "égypte", "egypt", "soudan", "boisson", "drink"], canne),
  E("fura-da-nono", "Fura da nono", "Fura da nono", ["fura da nono", "fura", "nono", "lait caillé", "fermented milk", "mil", "millet", "peul", "fulani", "nigeria", "niger", "calebasse", "calabash", "boisson", "drink"], fura),
  E("jus-de-corossol", "Jus de corossol", "Soursop juice", ["corossol", "soursop", "graviola", "jus de corossol", "soursop juice", "cameroun", "côte d'ivoire", "afrique centrale", "boisson", "drink"], corossol),
  E("biere-de-banane", "Bière de banane", "Banana beer", ["urwagwa", "tonto", "mbege", "bière de banane", "banana beer", "banane", "banana", "gourde", "gourd", "rwanda", "ouganda", "uganda", "burundi", "boisson", "drink"], banane),
];
