// Fruits et légumes d'Afrique (dessins originaux Afroicons) : couleur à plat, contour brun foncé, reflet blanc.
import { O, W, C, path, circle, ellipse, rect, line, g } from "./lib.mjs";

const r2 = (v) => Math.round(v * 100) / 100;
const pt = (cx, cy, r, deg) => { const a = (deg * Math.PI) / 180; return [r2(cx + r * Math.cos(a)), r2(cy + r * Math.sin(a))]; };
const dots = (pts, r, fill) => pts.map(([x, y]) => circle(x, y, r, fill, false)).join("");
const poly = (pts) => `M${pts.map(([x, y]) => `${r2(x)} ${r2(y)}`).join("L")}Z`;
/** Contour fermé lissé (Catmull-Rom → Bézier) passant par les points. */
const smooth = (pts) => {
  const n = pts.length, P = (i) => pts[(i + n) % n];
  let d = `M${r2(pts[0][0])} ${r2(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const [p0, p1, p2, p3] = [P(i - 1), P(i), P(i + 1), P(i + 2)];
    d += `C${r2(p1[0] + (p2[0] - p0[0]) / 6)} ${r2(p1[1] + (p2[1] - p0[1]) / 6)} ${r2(p2[0] - (p3[0] - p1[0]) / 6)} ${r2(p2[1] - (p3[1] - p1[1]) / 6)} ${r2(p2[0])} ${r2(p2[1])}`;
  }
  return d + "Z";
};
/** Points d'une ellipse (rotation en degrés), rayon modulé par f(k). */
const ring = (cx, cy, rx, ry, rot, n, f = () => 1) => Array.from({ length: n }, (_, k) => {
  const t = (2 * Math.PI * k) / n, a = (rot * Math.PI) / 180, m = f(k);
  const x = rx * m * Math.cos(t), y = ry * m * Math.sin(t);
  return [cx + x * Math.cos(a) - y * Math.sin(a), cy + x * Math.sin(a) + y * Math.cos(a)];
});
/** Union de formes : contour commun (trait double dessous, aplats par-dessus). */
const union = (shapes, fill) => shapes.map((s) => s(fill, { w: W * 2 })).join("") + shapes.map((s) => s(fill, false)).join("");
/** Feuille en amande entre deux points, avec nervure. */
const leaf = (x1, y1, x2, y2, w, fill = C.feuille, vein = C.vertLight) => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, L = Math.hypot(x2 - x1, y2 - y1), nx = (-(y2 - y1) / L) * w, ny = ((x2 - x1) / L) * w;
  return path(`M${r2(x1)} ${r2(y1)}Q${r2(mx + nx)} ${r2(my + ny)} ${r2(x2)} ${r2(y2)}Q${r2(mx - nx)} ${r2(my - ny)} ${r2(x1)} ${r2(y1)}Z`, fill, { w: 0.9 })
    + line(`M${r2(x1 + (x2 - x1) * 0.1)} ${r2(y1 + (y2 - y1) * 0.1)}L${r2(x1 + (x2 - x1) * 0.8)} ${r2(y1 + (y2 - y1) * 0.8)}`, vein, 0.6);
};
/** Tige épaisse : trait de contour puis trait de couleur. */
const thick = (d, fill, w) => line(d, O, w + W * 2) + line(d, fill, w);
/** Découpe d'un polygone par un polygone convexe (Sutherland-Hodgman), pour les zones de couleur sans clipPath. */
const clipConvex = (pts, clip) => {
  let out = pts;
  for (let i = 0; i < clip.length && out.length; i++) {
    const [ax, ay] = clip[i], [bx, by] = clip[(i + 1) % clip.length];
    const side = ([x, y]) => (bx - ax) * (y - ay) - (by - ay) * (x - ax);
    const res = [];
    for (let j = 0; j < out.length; j++) {
      const p = out[j], q = out[(j + 1) % out.length], sp = side(p), sq = side(q);
      if (sp >= 0) res.push(p);
      if ((sp >= 0) !== (sq >= 0)) { const u = sp / (sp - sq); res.push([p[0] + u * (q[0] - p[0]), p[1] + u * (q[1] - p[1])]); }
    }
    out = res;
  }
  return out;
};
const disc = (cx, cy, r) => Array.from({ length: 48 }, (_, k) => pt(cx, cy, r, (k * 360) / 48));
const shine = (cx, cy, rx, ry, rot = 0) => g(`rotate(${rot} ${cx} ${cy})`, ellipse(cx, cy, rx, ry, C.white, false));

/* 1. Safou : prunes oblongues bleu-violet, une coupée (chair vert pâle, gros noyau rosé). */
const SAF = "#4F3F93", SAF_L = "#8E80D2";
const safou = [
  g("rotate(-28 7.6 8.6)", ellipse(7.6, 8.6, 4, 6.4, SAF), ellipse(6.3, 6.4, 0.9, 2, SAF_L, false)),
  line("M10.3 2.8L11.6 1.4", C.marron, 1.2),
  g("rotate(18 17.2 7.8)", ellipse(17.2, 7.8, 3.6, 5.6, SAF), ellipse(16, 5.8, 0.8, 1.7, SAF_L, false)),
  g("rotate(-50 13 16.2)", ellipse(13, 16.2, 5, 7.4, SAF), ellipse(13, 16.2, 4, 6.4, "#C6DE8E", { w: 0.8 }), ellipse(13, 16.4, 2, 4.1, "#E8C2C6", { w: 0.8 }), ellipse(12.4, 15, 0.5, 1.4, C.white, false)),
].join("");

/* 2. Corossol : gros fruit vert hérissé de pointes, une tranche (chair blanche, pépins noirs). */
const SOUR = "#5E9E3E", SOUR_D = "#3B6E2A";
const spiky = (cx, cy, rx, ry, rot, n, h) => poly(ring(cx, cy, rx, ry, rot, n * 2, (k) => (k % 2 ? 1 + h : 1)));
const corossol = [
  thick("M8.6 3.2L9.6 0.9", C.marron, 1.1),
  path(spiky(10, 10.6, 7.2, 8.6, -25, 22, 0.07), SOUR),
  ...[[6.4, 8], [9.2, 6], [12.2, 7.8], [5.6, 12], [8.8, 10.6], [11.6, 12.6], [7.6, 15], [10.4, 16.2], [14.2, 10.6]].map(([x, y]) => line(`M${x} ${y}q.5 -.2 .6 -1`, SOUR_D, 0.7)),
  path("M5 7.4Q6 5 8.4 4.2", "none", { c: "#9BCB6A", w: 1.1 }),
  g("rotate(-25 16.4 16.6)", path(spiky(16.4, 16.6, 5.4, 6, 0, 18, 0.07), SOUR), ellipse(16.4, 16.6, 4.4, 5, "#FBF6EA", { w: 0.8 }), line("M16.4 12.6V20.6", "#E6DBC2", 0.8),
    ...[[14.8, 14.4, -20], [18, 14.4, 20], [14.4, 17.4, -10], [18.4, 17.4, 10], [15.6, 19.8, 0], [17.2, 19.8, 0]].map(([x, y, d]) => g(`rotate(${d} ${x} ${y})`, ellipse(x, y, 0.55, 0.9, C.noir, false)))),
].join("");

/* 3. Papaye : moitié allongée, peau vert-jaune, chair orange, cavité aux pépins noirs. */
const papPts = [[2.2, 12], [3.4, 9.2], [7, 7.8], [12, 6.8], [17, 6], [21.2, 7.6], [22.6, 12], [21.2, 16.4], [17, 18], [12, 17.2], [7, 16.2], [3.4, 14.8]];
const papInner = papPts.map(([x, y]) => [13 + (x - 13) * 0.88, 12 + (y - 12) * 0.82]);
const papaye = g("translate(12.4 12) scale(1.12) rotate(-38) translate(-12.4 -12)",
  path(smooth(papPts), "#8DB33A"),
  path(smooth(papInner), C.orange, { w: 0.8 }),
  path("M4.6 11Q6 9.6 9 9.2", "none", { c: "#F7A863", w: 1 }),
  ellipse(15.6, 12, 5, 2.8, "#C9461A", { w: 0.8 }),
  dots([[11.6, 12], [12.8, 11], [12.8, 13], [14.2, 10.2], [14.2, 12], [14.2, 13.8], [15.8, 10.2], [15.8, 12], [15.8, 13.8], [17.4, 10.6], [17.4, 12.4], [17.4, 13.4], [18.8, 11.2], [18.8, 12.8], [19.8, 12]], 0.62, C.noir),
  dots([[14, 11.8], [17.2, 10.4]], 0.2, C.white),
  line("M2.2 12H0.9", C.marron, 1.3),
);

/* 4. Goyave : goyave verte entière (couronne sèche), moitié à chair rose et graines crème. */
const GUAVA = "#A9CF52", GUAVA_D = "#7DA33A";
const goyave = [
  leaf(13.4, 2.4, 20.2, 1.6, 2, C.feuille),
  g("rotate(-30 8.8 9.4)", path("M8.8 2.6Q14.6 2.6 15 9.2Q15 15.8 8.8 15.8Q2.6 15.8 2.6 9.2Q3 2.6 8.8 2.6Z", GUAVA)),
  line("M11.8 3.4L13.4 2.4", C.marron, 1.1),
  path("M3.4 13.6L4.4 13.8L4.4 14.8L5.4 15.4L4.6 16.2", "none", { c: C.marron, w: 0.9 }),
  dots([[6, 11.6], [10.6, 12.2], [8.4, 6.4], [12, 8.6]], 0.35, GUAVA_D),
  path("M4.6 8.4Q5.2 5.4 8 4.6", "none", { c: "#E3F1B2", w: 1.1 }),
  circle(15.6, 15.6, 6.4, GUAVA),
  circle(15.6, 15.6, 5.5, "#F1707F", { w: 0.7 }),
  circle(15.6, 15.6, 3.2, "#F8A7AE", false),
  ...Array.from({ length: 9 }, (_, k) => circle(...pt(15.6, 15.6, 2.3, k * 40), 0.42, "#FCE8C4", { w: 0.4 })),
  circle(15.6, 15.6, 0.5, "#FCE8C4", { w: 0.4 }),
].join("");

/* 5. Fruit de la passion : coque violette fripée, moitié à pulpe jaune et graines noires. */
const PAS = "#5A2346", PAS_L = "#94608A";
const passion = [
  thick("M9 3.2Q10 1.6 12 1.4", C.vert, 0.9),
  circle(8.6, 9.2, 6.4, PAS),
  dots([[6, 7.4], [10.6, 6.4], [12.2, 9.6], [7.6, 12.6], [10.4, 12.8], [5.2, 10.4]], 0.4, PAS_L),
  line("M4.6 8.6Q6.4 9.4 6.8 11.4M11 11.4Q12.6 11.2 13.6 12.4", "#3A1530", 0.7),
  path("M4.6 6.8Q5.6 4.4 8 3.8", "none", { c: "#B88AAE", w: 1.1 }),
  circle(15.4, 15.6, 6.6, PAS),
  circle(15.4, 15.6, 5.6, "#F7EFD6", { w: 0.6 }),
  circle(15.4, 15.6, 4.6, "#F4B21C", { w: 0.7 }),
  ...[[15.4, 15.6], ...Array.from({ length: 6 }, (_, k) => pt(15.4, 15.6, 2.1, k * 60 + 30)), ...Array.from({ length: 8 }, (_, k) => pt(15.4, 15.6, 3.6, k * 45))].map(([x, y]) => circle(x, y, 0.95, "#FBD34E", false) + circle(x, y, 0.55, C.noir, false)),
].join("");

/* 6. Pain de singe (baobab) : cabosse veloutée vert-brun, ouverte sur la pulpe blanche crayeuse. */
const BAO = "#A69E64", BAO_D = "#7E7744";
const painDeSinge = [
  g("translate(11.2 11.4) scale(1.1) rotate(-28) translate(-11.4 -11.2)",
    ellipse(11.4, 11.2, 9.2, 5, BAO),
    dots([[5, 9.4], [6.6, 14], [16.6, 8], [18.6, 13.2], [8.2, 7.6], [14.6, 15.4]], 0.32, BAO_D),
    path("M4.8 12.2L6 9.6L7.8 10.6L9.2 8.2L11 9.6L12.6 7.8L14.2 9.4L16 8.2L17.4 10.4L18.4 12.2L16.6 14.4L14.6 13.2L12.8 14.8L11 13.4L9 14.8L7 13.6Z", "#F4EFE0", { w: 0.9 }),
    line("M7.8 10.6L8.4 13.8M11 9.6V13.4M14.2 9.4L14.6 13.2M5.6 12H17.6", "#C2B9A2", 0.6),
    line("M9.6 10.8Q10.6 12 9.8 13.2M15.6 10.6Q16.2 11.8 15.6 13", "#B5513A", 0.5),
    path("M18.6 9Q20 9.4 20.4 11", "none", { c: "#C9C28E", w: 0.9 }),
    thick("M20.6 11.2Q22.2 10.8 22.4 9.2", C.marron, 1),
  ),
  rect(3.4, 17.8, 3.2, 2.8, 0.8, "#F4EFE0", { w: 0.9 }),
  rect(7.4, 19.4, 2.8, 2.4, 0.8, "#F4EFE0", { w: 0.9 }),
  rect(4.6, 21, 2.2, 1.6, 0.6, "#F4EFE0", { w: 0.8 }),
].join("");

/* 7. Tamarin : gousses brunes bosselées et courbes, une craquée sur la pulpe brune collante. */
const TAM = "#B98650", TAM_D = "#8A5A2E", PULP = "#6E3216";
const qpt = (a, b, c, t) => [r2((1 - t) ** 2 * a[0] + 2 * (1 - t) * t * b[0] + t * t * c[0]), r2((1 - t) ** 2 * a[1] + 2 * (1 - t) * t * b[1] + t * t * c[1])];
const pod = (a, b, c, n, rs) => Array.from({ length: n }, (_, k) => qpt(a, b, c, k / (n - 1))).map(([x, y], k) => (f, s) => circle(x, y, rs[k % rs.length], f, s));
const tamarin = [
  union(pod([3, 9.6], [10, 1.4], [20.6, 6], 7, [2.2, 2.5, 2.3]), TAM),
  line("M4.4 7.4Q10 2 18.6 5.2", TAM_D, 0.6),
  thick("M20.6 6L22.4 5", C.marron, 0.9),
  path("M5.6 6.4Q7.6 4 10 3.4", "none", { c: "#E2BC86", w: 1 }),
  union(pod([3.4, 18.2], [11, 10.6], [20.8, 17.6], 7, [2.4, 2.6, 2.4]), TAM),
  union(pod([6.6, 15.2], [11, 12.4], [17, 14.6], 5, [2.3, 2.5]), PULP),
  line("M7.4 16.4Q11 13.6 16 15.6M8.6 14.2L9.4 16.2M12.8 13.2L13 15.4", "#A9663A", 0.5),
  path("M8 13.6Q10 12 12.4 12", "none", { c: "#C27A4E", w: 0.9 }),
  line("M3.4 18.2L1.6 19.4", C.marron, 1),
].join("");

/* 8. Néré : longues gousses brun sombre pendant en grappe, une ouverte sur la pulpe jaune poudreuse. */
const NERE = "#5A3520", NERE_Y = "#F4C430";
const nerePods = [[[10.2, 5], [3.4, 7.6], [2, 15.6]], [[10.8, 5.6], [6.4, 11.4], [6.4, 21.4]], [[13.2, 5.6], [17.6, 11.4], [17.6, 21.4]], [[13.8, 5], [20.6, 7.6], [22, 15.6]]];
const nere = [
  thick("M12 0.8V3.6", C.marron, 1.1),
  ...nerePods.map(([a, b, c]) => union(pod(a, b, c, 11, [1.15, 1.35]), NERE)),
  union(pod([12, 5.4], [12.2, 13], [12, 22], 12, [1.75, 1.95]), NERE),
  union(pod([12, 6.6], [12.2, 13.4], [12, 20.6], 10, [1.05, 1.2]), NERE_Y),
  dots([[12.1, 8.4], [12.15, 11.4], [12.2, 14.4], [12.15, 17.4], [12.05, 20]], 0.45, "#3A2414"),
  dots([[11.7, 9.8], [11.8, 15.8]], 0.3, "#FFF0B0"),
  circle(12, 4.4, 1.8, "#7A4A2A"),
].join("");

/* 9. Karité : fruits verts en forme de prune sous les feuilles, et la noix brune à la cicatrice pâle. */
const SHEA = "#8DB04A", SHEA_L = "#C3DB86";
const karite = [
  leaf(12, 4.4, 3, 1.8, 1.7), leaf(12, 4.4, 21, 1.8, 1.7), leaf(12, 4.4, 12, 0.8, 1.2, C.vertLight, C.feuille),
  line("M12 4.4L9 7.6M12 4.4L15 6.8", C.marron, 0.9),
  g("rotate(18 8.2 11.4)", ellipse(8.2, 11.4, 3.8, 4.8, SHEA), ellipse(7, 9.6, 0.8, 1.5, SHEA_L, false)),
  g("rotate(-14 15.6 10.6)", ellipse(15.6, 10.6, 3.6, 4.6, SHEA), ellipse(14.6, 8.8, 0.75, 1.4, SHEA_L, false)),
  g("rotate(-8 12.2 17.6)", ellipse(12.2, 17.6, 5.6, 4.2, "#7A4724"), path("M8.4 17.4Q8.6 15 11 14.8Q12.6 15 12.4 17.2Q12 19.4 10.2 19.4Q8.4 19.2 8.4 17.4Z", "#D9AE72", { w: 0.7 }), ellipse(15.2, 15.8, 1.3, 0.7, "#B47A4A", false)),
].join("");

/* 10. Régime de noix de palme : grappe dense de noix rouge-orangé à pointe noire, piquants bruns. */
const nut = (x, y, rot = 0) => g(`rotate(${rot} ${x} ${y})`, ellipse(x, y, 2.1, 2.4, "#E0461C"), ellipse(x, y + 1.1, 1.3, 0.9, "#F59A2E", false), ellipse(x, y - 1.3, 1.1, 0.75, "#3A120C", false), ellipse(x - 0.8, y - 0.2, 0.35, 0.6, "#FFD2A0", false));
const regimePalme = [
  line("M12 12L3 4.6M12 12L1.4 11M12 12L21 4.6M12 12L22.6 11M12 12L12 1.2M12 12L6.6 2M12 12L17.4 2", "#4A3020", 0.9),
  thick("M12 20.6V23", "#6E4A2A", 2),
  ...[[10, 4.8, -10], [14, 4.8, 10]].map(([x, y, r]) => nut(x, y, r)),
  ...[[6.4, 8, -20], [10.2, 7.8, -5], [14, 7.8, 5], [17.8, 8, 20]].map(([x, y, r]) => nut(x, y, r)),
  ...[[4.4, 11.6, -25], [8.2, 11.4, -10], [12, 11.2, 0], [15.8, 11.4, 10], [19.6, 11.6, 25]].map(([x, y, r]) => nut(x, y, r)),
  ...[[6, 15, -15], [9.9, 14.8, -5], [14.1, 14.8, 5], [18, 15, 15]].map(([x, y, r]) => nut(x, y, r)),
  ...[[8.2, 18.4, -10], [12, 18.6, 0], [15.8, 18.4, 10]].map(([x, y, r]) => nut(x, y, r)),
].join("");

/* 11. Canne à sucre : tiges vert-jaune à nœuds, feuilles, et un tronçon coupé. */
const CANE = "#C3C94A", CANE_D = "#7E8A2E";
const stalk = (x, y1, y2, w) => [rect(x, y1, w, y2 - y1, 0.8, CANE), ...Array.from({ length: Math.floor((y2 - y1 - 2) / 4) }, (_, k) => rect(x - 0.3, y1 + 3.4 + k * 4, w + 0.6, 1, 0.5, CANE_D, { w: 0.6 })), line(`M${x + 0.8} ${y1 + 1}V${y2 - 1}`, "#E6EA9A", 0.6)].join("");
const canneASucre = [
  g("rotate(24 12 12)",
    leaf(9.2, 3.6, 4.6, 4.6, 1.5, C.feuille), leaf(9.8, 3.2, 14, 0.2, 1.2, C.vertLight, C.feuille), leaf(14, 4.8, 18.8, 5.2, 1.4, C.feuille),
    stalk(7.6, 2.6, 23.6, 3.4), stalk(12.4, 4, 21.4, 3.2),
  ),
  g("rotate(-18 16 19.6)", rect(13.4, 18.2, 7.6, 2.8, 0.6, CANE), rect(17.4, 17.9, 1, 3.4, 0.5, CANE_D, { w: 0.6 }), ellipse(13.4, 19.6, 1.1, 1.4, "#F4EDC4", { w: 0.8 }), dots([[13.3, 19.2], [13.6, 20]], 0.2, "#C8BE80")),
].join("");

/* 12. Figue de Barbarie : raquette de cactus plate et ses fruits rouges et orange sur le bord. */
const PAD = "#5E9E48";
const areole = (x, y) => circle(x, y, 0.45, "#F3E7B8", { w: 0.4 }) + line(`M${x - 0.9} ${y - 0.7}L${x - 0.3} ${y - 0.2}M${x + 0.9} ${y - 0.7}L${x + 0.3} ${y - 0.2}`, O, 0.4);
const prickly = (x, y, rot, fill) => g(`rotate(${rot} ${x} ${y})`, path(`M${x - 2.5} ${y - 2.4}Q${x} ${y - 1.6} ${x + 2.5} ${y - 2.4}Q${x + 3} ${y + 3.6} ${x} ${y + 3.6}Q${x - 3} ${y + 3.6} ${x - 2.5} ${y - 2.4}Z`, fill), ellipse(x, y - 2.1, 2.1, 0.55, "#8A2A1E", { w: 0.6 }), dots([[x - 1.2, y], [x + 1, y + 0.6], [x - 0.2, y + 2.2]], 0.3, "#FBE2A0"), ellipse(x - 1.4, y + 0.6, 0.35, 0.9, "#FFB4A8", false));
const figueBarbarie = [
  path(smooth(ring(12, 15.2, 7.6, 7.4, 0, 12, (k) => (k % 3 ? 1 : 0.97))), PAD),
  ...[[8, 12.4], [12, 11], [16, 12.4], [6.6, 16.4], [10.4, 15.4], [14, 15.6], [17.6, 16.4], [9, 19.6], [13, 19.4], [16, 20]].map(([x, y]) => areole(x, y)),
  path("M6.4 11Q7.4 9 9.6 8.4", "none", { c: "#9DCC7A", w: 1.1 }),
  prickly(6.6, 6.4, -28, C.rouge), prickly(17.4, 6.4, 28, C.orange), prickly(12, 4.4, 0, "#C9244E"),
].join("");

/* 13. Citron vert : citron vert entier aux bouts pointus et rondelle à quartiers. */
const LIME = "#6AB33A", LIME_D = "#4C8F2C";
const citronVert = [
  g("rotate(-30 9.4 9)", path("M1.6 9Q2.2 3.4 9.4 3.4Q16.6 3.4 17.2 9Q16.6 14.6 9.4 14.6Q2.2 14.6 1.6 9Z", LIME), ellipse(17.4, 9, 0.6, 0.9, LIME_D, { w: 0.7 }), path("M4.2 6.8Q6 4.8 9.4 4.6", "none", { c: "#C9EA9A", w: 1.1 })),
  dots([[6, 12], [12, 6.6], [9.4, 10.6]], 0.3, LIME_D),
  circle(15.6, 15.6, 6.6, LIME),
  circle(15.6, 15.6, 5.6, "#F1F7D6", { w: 0.6 }),
  circle(15.6, 15.6, 4.8, "#BEDE68", { w: 0.6 }),
  line(Array.from({ length: 8 }, (_, k) => { const [x, y] = pt(15.6, 15.6, 4.8, k * 45 + 22.5); return `M15.6 15.6L${x} ${y}`; }).join(""), "#F1F7D6", 0.7),
  circle(15.6, 15.6, 0.7, "#F1F7D6", false),
  ...Array.from({ length: 8 }, (_, k) => circle(...pt(15.6, 15.6, 3.1, k * 45), 0.35, "#E2F2A6", false)),
].join("");

/* 14. Pomme de cajou : faux-fruit rouge et jaune en cloche, la noix grise en rein pendue dessous. */
const cajPts = Array.from({ length: 56 }, (_, k) => {
  const t = (2 * Math.PI * k) / 56, s = Math.sin(t);
  return [12 + Math.cos(t) * 6.2 * (0.72 + 0.28 * s), 9.2 + 7 * s];
});
const zone = (cx, cy, r, fill) => path(poly(clipConvex(cajPts, disc(cx, cy, r))), fill, false);
const pommeCajou = [
  g("rotate(-14 12 19)", path("M12 17.4Q15 15 18.4 16.2Q21 18 19.4 21Q17.4 23.2 13 22.4Q12 22 11 22.4Q6.6 23.2 4.6 21Q3 18 5.6 16.2Q9 15 12 17.4Z", "#8F9670"),
    line("M6 19.4Q12 21.8 18 19.4", "#686E4A", 0.6), path("M5.2 18.2Q6 16.8 7.8 16.8", "none", { c: "#C9CCAE", w: 0.9 })),
  path(poly(cajPts), C.jaune, false),
  zone(3.4, 3.2, 11.4, C.rouge),
  zone(4, 2, 7.4, "#B5281E"),
  path(poly(cajPts), "none"),
  path("M8 6.4Q8.8 4.2 10.8 3.8", "none", { c: C.white, w: 1.1 }),
  thick("M12 2.8Q12.4 1.4 13.6 1", C.marron, 0.9),
].join("");

/* 15. Jacquier : énorme fruit vert bosselé, entaille montrant les gousses jaunes. */
const JACK = "#9DB846", JACK_D = "#6E8C2E";
const jackPts = ring(11.6, 12, 8.8, 10.4, -28, 60, (k) => (k % 2 ? 1.025 : 1));
const jackCut = [[11.6, 12.2], ...ring(11.6, 12, 8.4, 10, -28, 60).slice(2, 20)];
const jacquier = [
  thick("M16.2 2.4Q17.6 0.9 19.4 1.2", C.marron, 1.1),
  path(poly(jackPts), JACK),
  ...ring(11.2, 11.4, 5.6, 6.8, -28, 14).map(([x, y]) => circle(x, y, 0.5, JACK_D, false)),
  ...ring(11, 11, 2.6, 3.4, -28, 7).map(([x, y]) => circle(x, y, 0.5, JACK_D, false)),
  path("M5.4 8Q6.4 4.6 9.6 3.4", "none", { c: "#CFE48E", w: 1.1 }),
  path(poly(jackCut), "#F6E8B8", { w: 0.9 }),
  ...[[17, 11.8, 5], [19.2, 13.6, 20], [16.6, 15.2, 35], [18.4, 17.4, 45], [14.2, 16.6, 60], [16, 19.6, 70], [13.4, 19.8, 80]].map(([x, y, r]) => g(`rotate(${r} ${x} ${y})`, ellipse(x, y, 1.7, 1.05, "#F6B51E", { w: 0.7 }))),
].join("");

/* 16. Litchi (Madagascar) : litchis rouges grenus sur leur rameau, un pelé blanc nacré. */
const LYC = "#D7304A", LYC_D = "#9E1C36";
const lychee = (x, y, r) => path(poly(ring(x, y, r, r * 1.05, 0, 28, (k) => (k % 2 ? 1.07 : 1))), LYC) + dots(ring(x, y, r * 0.55, r * 0.58, 20, 6).concat([[x, y]]), 0.35, LYC_D) + ellipse(x - r * 0.45, y - r * 0.45, r * 0.18, r * 0.32, "#FF9AA6", false);
const litchi = [
  line("M2.4 2.6Q10 1.8 20.6 4.2", "#6E4426", 1.3),
  leaf(16.6, 3.4, 22.6, 1.4, 1.2), leaf(4.6, 2.6, 1.2, 6.4, 1),
  line("M6.4 2.4L6.8 6.2M13.4 2.6L13 5.2M10.6 2.4L9.8 12.8M17.2 3.6L16.8 12", "#6E4426", 0.8),
  lychee(6.8, 9.8, 3.8), lychee(13.4, 9, 3.8), lychee(8.8, 17.4, 3.9),
  path("M12.4 17.4L13.4 16.2L14.2 17.4L15.2 16L16.6 17.4L18 16.2L18.8 17.4L20 16.4L20.6 17.6Q20.6 22.4 16.6 22.4Q12.4 22.4 12.4 17.4Z", LYC),
  ellipse(16.6, 14.6, 3.6, 4.2, "#F7F3E6"),
  path("M14.8 13.2Q15.2 11.6 16.6 11.2", "none", { c: C.white, w: 1.1 }),
  ellipse(17.6, 16, 0.8, 1.6, "#E4DECB", false),
  line("M16.6 10.4V8.6", "#6E4426", 0.8),
].join("");

/* 17. Plantain : régime de plantains longs et anguleux, verts et un mûr jaune tacheté de noir. */
const finger = (x, y, deg, L, fill, ridge, ripe = false) => {
  const ts = [0, 0.18, 0.45, 0.75, 0.94], hw = [1.1, 2.3, 2.6, 2.2, 1.1], bend = 2;
  const yOf = (t) => -bend * 4 * t * (1 - t);
  const top = ts.map((t, i) => [t * L, yOf(t) - hw[i]]), bot = ts.map((t, i) => [t * L, yOf(t) + hw[i]]).reverse();
  const outline = poly([...top, [L + 0.6, 0.1], ...bot]);
  const mid = `M${r2(0.18 * L)} ${r2(yOf(0.18) + 0.2)}L${r2(0.45 * L)} ${r2(yOf(0.45) + 0.3)}L${r2(0.75 * L)} ${r2(yOf(0.75) + 0.2)}L${r2(0.94 * L)} ${r2(yOf(0.94))}`;
  const spots = ripe ? [[0.35, -0.6, 0.9], [0.6, 0.6, 0.7], [0.82, -0.4, 0.6], [0.5, -1, 0.4]].map(([t, dy, r]) => ellipse(t * L, yOf(t) + dy, r * 1.3, r * 0.8, "#3A2A1A", false)).join("") : "";
  return g(`translate(${x} ${y}) rotate(${deg})`, path(outline, fill), spots, line(mid, ridge, 0.7), path(poly([[0.94 * L, yOf(0.94) - 0.8], [L + 0.6, 0.1], [0.94 * L, yOf(0.94) + 0.8]]), "#3A2A1A", { w: 0.7 }));
};
const plantain = [
  finger(4, 5.2, 68, 17, "#79AE3C", "#4C8A2C"),
  finger(4, 5.2, 14, 17.6, "#6FA83A", "#4C8A2C"),
  finger(4, 5.2, 41, 18.4, C.jaune, C.jauneShade, true),
  path("M1.4 3.8L3.6 1.6L6.6 4.4L4.8 6.8Z", "#5E7A2E"),
  line("M3.6 1.6L1.8 0.9", "#5E7A2E", 1.4),
].join("");

/* 18. Igname : gros tubercule brun rugueux et chevelu, bout coupé blanc. */
const YAM = "#8A5A36", YAM_D = "#5E3A20";
const yamPts = [[2.6, 13], [3.2, 9.8], [6, 8.4], [9.6, 9.2], [13.2, 8], [17, 8.4], [20.6, 8.6], [20.6, 15.6], [17, 16], [13.2, 16.6], [9.6, 15.8], [6, 16.6], [3.4, 15.8]];
const igname = g("translate(12 12) scale(1.1 1.3) rotate(32) translate(-12 -12)",
  line("M4.6 8.4L4 7M8 8.6L7.8 7.2M12 8.1L12.2 6.7M16 8.2L16.6 6.9M5.4 16.8L5 18.2M10 16.2L10.2 17.6M14.6 16.6L15 18M18 16L18.6 17.4M2.8 11L1.4 10.4M3 14.6L1.6 15.2", YAM_D, 0.6),
  path(smooth(yamPts), YAM),
  ...[[5.6, 11], [8.6, 13.6], [11.4, 10.8], [14.4, 13.4], [17, 10.6], [6.8, 14.8], [12.6, 15]].map(([x, y]) => line(`M${x} ${y}l.9 -.3`, YAM_D, 0.6)),
  path("M5 10.2Q7.6 9.2 10 10.4", "none", { c: "#B88660", w: 0.9 }),
  ellipse(20.6, 12.1, 1.8, 3.6, "#F6F0DE", { w: 0.9 }),
  ellipse(20.6, 12.1, 1, 2.4, "#FCFAF2", false),
);

/* 19. Manioc : racines effilées à écorce brune annelée, une coupée sur la chair blanche. */
const BARK = "#6B4226", BARK_L = "#A0724A";
const root = (x, y, deg, L, h, cut) => g(`translate(${x} ${y}) rotate(${deg})`,
  path(smooth([[0, -h], [L * 0.3, -h * 1.12], [L * 0.62, -h * 0.8], [L, 0], [L * 0.62, h * 0.8], [L * 0.3, h * 1.12], [0, h]]), BARK),
  line([0.18, 0.36, 0.54, 0.72].map((t) => `M${r2(t * L)} ${r2(-h * (1.05 - t * 0.5))}Q${r2(t * L + 0.6)} 0 ${r2(t * L)} ${r2(h * (1.05 - t * 0.5))}`).join(""), BARK_L, 0.6),
  cut ? ellipse(0, 0, h * 0.55, h, "#E2B49A", { w: 0.9 }) + ellipse(0, 0, h * 0.42, h * 0.8, "#FBF8EE", false) + circle(0, 0, 0.35, "#D9C9A8", false) : ellipse(0, 0, h * 0.5, h * 0.9, "#8C6A44", { w: 0.9 }),
);
const manioc = [
  root(3, 5.4, 34, 20, 2.1, false),
  root(2.2, 10.4, 22, 20.4, 2.3, false),
  root(4.2, 14.8, 12, 18.2, 2.8, true),
].join("");

/* 20. Patate douce : tubercule rouge-violet fuselé, morceau coupé à chair orange. */
const SWP = "#A3335A", SWP_L = "#C9628A";
const patateDouce = [
  g("rotate(-30 11 10)", path(smooth([[1.4, 10.4], [5, 6.4], [11, 5.4], [17, 6.4], [21, 9.6], [17, 13.8], [11, 14.8], [5, 13.8]]), SWP), path("M6 8Q9 6.4 12.6 6.8", "none", { c: SWP_L, w: 1 }), line("M1.4 10.4L0.2 11M21 9.6L22.6 9", "#6E2240", 0.7), line("M8.6 12.6l.6 .8M14 12.6l.4 .9M10.6 7.2l.6 -.6", "#6E2240", 0.6)),
  g("rotate(-30 15.6 16.8)", path("M13.4 12.6H19.6Q22.4 16.8 19.6 21H13.4Z", SWP), ellipse(13.4, 16.8, 2.8, 4.2, C.orange, { w: 0.9 }), ellipse(13.2, 16.8, 1.6, 2.6, "#F7A84A", false), dots([[12.8, 15.6], [13.8, 18]], 0.25, "#FCD49A")),
].join("");

/* 21. Macabo (taro) : grande feuille en cœur et tubercule brun annelé. */
const TARO = "#8A603E", TARO_D = "#5A3A22";
const macabo = [
  path("M12 12.6Q6 14.6 2.6 11Q0.6 6.6 4.8 3.8Q8.4 1.6 12 0.8Q15.6 1.6 19.2 3.8Q23.4 6.6 21.4 11Q18 14.6 12 12.6Z", C.feuille),
  line("M12 12.4V1.6M12 9.4L5 5.4M12 9.4L19 5.4M12 11.4L4.4 10.4M12 11.4L19.6 10.4", C.vertLight, 0.7),
  thick("M12 12.4V14.6", "#9FC07A", 1.4),
  ellipse(18.4, 19.6, 2.4, 2.6, TARO),
  line("M16.4 19.2Q18.4 20 20.4 19.2", TARO_D, 0.6),
  ellipse(11.2, 18.2, 5.8, 4.6, TARO),
  line("M5.8 17Q11.2 18.6 16.6 17M5.8 19.6Q11.2 21.2 16.6 19.6M7.4 15Q11.2 16.2 15 15", TARO_D, 0.7),
  line("M6.4 21.4L5.6 22.4M9.6 22.6L9.4 23.4M13.6 22.4L14 23.2", TARO_D, 0.5),
  path("M7.4 16.2Q8.6 14.6 10.6 14.4", "none", { c: "#B88A62", w: 0.9 }),
].join("");

/* 22. Arachides en coque : coques beiges à étranglement et réseau de nervures, une ouverte sur deux graines rouges. */
const SHELL = "#D9B57A", SHELL_D = "#A8844C";
const shell = (x, y, deg) => g(`translate(${x} ${y}) rotate(${deg})`,
  union([(f, s) => circle(-2.6, 0, 2.6, f, s), (f, s) => circle(2.6, 0, 2.4, f, s), (f, s) => ellipse(0, 0, 2.4, 1.9, f, s)], SHELL),
  line("M-4.4 -1.2L-0.8 1.2M-4.4 1.2L-0.8 -1.2M-2.6 -2.2V2.2M1 -1.2L4.4 1.2M1 1.2L4.4 -1.2M2.6 -2V2", SHELL_D, 0.5),
  line("M4.9 0L5.6 0", SHELL_D, 0.9),
);
const arachides = [
  shell(7.8, 6.4, -30), shell(16, 7.6, 22),
  g("translate(12 17) rotate(-10)",
    union([(f, s) => circle(-3.3, 0, 3.4, f, s), (f, s) => circle(3.3, 0, 3.2, f, s), (f, s) => ellipse(0, 0, 3, 2.5, f, s)], SHELL),
    union([(f, s) => circle(-3.3, 0, 2.5, f, s), (f, s) => circle(3.3, 0, 2.3, f, s), (f, s) => ellipse(0, 0, 2.2, 1.6, f, s)], "#F2E2BA").replace(/stroke="#2B1D14" stroke-width="2.2"/g, 'stroke="#C9A468" stroke-width="1"'),
    ellipse(-3.3, 0, 2.1, 2, "#C25A3A"), ellipse(3.3, 0, 1.9, 1.8, "#C25A3A"),
    ellipse(-4, -0.7, 0.55, 0.85, "#F2A08A", false), ellipse(2.7, -0.7, 0.5, 0.8, "#F2A08A", false)),
].join("");

/* 23. Aubergine africaine (garden egg) : petites aubergines rondes blanches rayées de vert, calice vert. */
const EGGP = "#F4F1DA", STRIPE = "#9CC15E";
const gardenEgg = (x, y, r, fill = EGGP) => [
  circle(x, y, r, fill),
  line(`M${r2(x - r * 0.35)} ${r2(y - r * 0.85)}Q${r2(x - r * 0.95)} ${r2(y)} ${r2(x - r * 0.45)} ${r2(y + r * 0.6)}M${r2(x + r * 0.35)} ${r2(y - r * 0.85)}Q${r2(x + r * 0.95)} ${r2(y)} ${r2(x + r * 0.45)} ${r2(y + r * 0.6)}M${x} ${r2(y - r * 0.8)}V${r2(y + r * 0.2)}`, STRIPE, 0.8),
  path(`M${r2(x - r * 0.6)} ${r2(y - r * 0.62)}L${x} ${r2(y - r * 0.4)}L${r2(x + r * 0.6)} ${r2(y - r * 0.62)}L${r2(x + r * 0.2)} ${r2(y - r * 1.05)}L${r2(x - r * 0.2)} ${r2(y - r * 1.05)}Z`, C.feuille, { w: 0.8 }),
  line(`M${x} ${r2(y - r * 1.05)}V${r2(y - r * 1.35)}`, C.vert, 1.1),
  ellipse(x - r * 0.5, y + r * 0.05, r * 0.14, r * 0.3, C.white, false),
].join("");
const aubergineAfricaine = [gardenEgg(12, 8.6, 5), gardenEgg(6.8, 16.2, 5.4, "#EAF0C6"), gardenEgg(17.2, 16.2, 5.4)].join("");

/* 24. Gombo : gousses vertes à côtes effilées, une rondelle en étoile avec ses graines. */
const OKRA = "#5FA53A", OKRA_D = "#3E7A2A";
const okra = (x, y, deg, L) => g(`translate(${x} ${y}) rotate(${deg})`,
  path(`M-1.7 0Q-2.2 ${r2(L * 0.35)} -0.5 ${r2(L * 0.92)}L0 ${L}L0.5 ${r2(L * 0.92)}Q2.2 ${r2(L * 0.35)} 1.7 0Z`, OKRA),
  line(`M-0.7 0.6Q-0.9 ${r2(L * 0.4)} -0.2 ${r2(L * 0.85)}M0.7 0.6Q0.9 ${r2(L * 0.4)} 0.2 ${r2(L * 0.85)}`, OKRA_D, 0.6),
  line(`M-1.2 ${r2(L * 0.2)}Q-1.3 ${r2(L * 0.45)} -0.6 ${r2(L * 0.7)}`, "#A6D27A", 0.7),
  rect(-1.9, -1.6, 3.8, 1.8, 0.8, "#8DB04A", { w: 0.9 }),
  thick("M0 -1.6V-3", "#6E8C2E", 0.9),
);
const starPts = (cx, cy, r1, r0) => ring(cx, cy, r1, r1, -90, 10, (k) => (k % 2 ? r0 / r1 : 1));
const gombo = [
  okra(8.6, 5.8, 32, 15.4), okra(14.2, 4.8, -22, 13.4),
  path(smooth(starPts(16.6, 17.4, 5.2, 4.2)), OKRA),
  path(smooth(starPts(16.6, 17.4, 4, 3.1)), "#E8F2C8", { w: 0.6 }),
  ...ring(16.6, 17.4, 2.3, 2.3, -90, 5).map(([x, y]) => circle(x, y, 0.85, "#B9D67E", { w: 0.5 })),
  line(ring(16.6, 17.4, 3.6, 3.6, -54, 5).map(([x, y]) => `M16.6 17.4L${r2(x)} ${r2(y)}`).join(""), "#CFE3A0", 0.5),
].join("");

const E = (slug, fr, en, tags, body, char = null) => ({ slug, fr, en, char, group: "fruits", tags, tone: false, body });
/** Recadrage (audit du dessin) : ces dessins débordaient de la grille 24 × 24 (ou étaient décentrés) ;
 *  ils sont réduits et décalés juste assez pour y tenir : [échelle, décalage x, décalage y]. */
const CADRE = { "corossol": [0.94, 0, 0.6], "fruit-de-la-passion": [1, 0, 0.7], "tamarin": [0.93, 0, 0], "nere": [0.88, 0, -0.1], "regime-noix-de-palme": [0.94, 0, -0.9], "pomme-de-cajou": [0.93, 0, 0.3], "jacquier": [0.98, 0, 0.8], "gombo": [1, 0.6, 0.1], "papaye": [1, -0.3, 0], "igname": [1, 0.3, 0] };
const cadre = (e) => { const f = CADRE[e.slug]; return f ? { ...e, body: `<g transform="translate(${Math.round((12 + f[1]) * 100) / 100} ${Math.round((12 + f[2]) * 100) / 100}) scale(${f[0]}) translate(-12 -12)">${e.body}</g>` } : e; };
export default [
  E("safou", "Safou", "African pear (safou)", ["safou", "atanga", "prune", "african plum", "butterfruit", "dacryodes", "cameroun", "congo", "gabon"], safou),
  E("corossol", "Corossol", "Soursop", ["corossol", "soursop", "graviola", "guanabana", "fruit", "côte d'ivoire", "cameroun", "jus"], corossol),
  E("papaye", "Papaye", "Papaya", ["papaye", "papaya", "pawpaw", "fruit", "tropical", "graines", "seeds"], papaye),
  E("goyave", "Goyave", "Guava", ["goyave", "guava", "fruit", "rose", "pink", "mapera", "tropical"], goyave),
  E("fruit-de-la-passion", "Fruit de la passion", "Passion fruit", ["fruit de la passion", "passion fruit", "maracuja", "grenadille", "granadilla", "kenya", "jus"], passion),
  E("pain-de-singe", "Pain de singe", "Baobab fruit", ["pain de singe", "baobab", "bouye", "monkey bread", "baobab fruit", "sénégal", "mali", "jus"], painDeSinge),
  E("tamarin", "Tamarin", "Tamarind", ["tamarin", "tamarind", "dakhar", "tomi", "gousse", "pod", "sénégal", "jus"], tamarin),
  E("nere", "Néré", "African locust bean", ["néré", "nere", "parkia", "locust bean", "soumbala", "dawadawa", "burkina faso", "mali", "nigeria"], nere),
  E("karite", "Karité", "Shea", ["karité", "shea", "beurre de karité", "shea butter", "noix", "nut", "burkina faso", "mali", "ghana"], karite),
  E("regime-noix-de-palme", "Régime de noix de palme", "Palm nut bunch", ["noix de palme", "palm nut", "palm fruit", "régime", "huile de palme", "palm oil", "graine", "cameroun", "côte d'ivoire", "nigeria"], regimePalme),
  E("canne-a-sucre", "Canne à sucre", "Sugarcane", ["canne à sucre", "sugarcane", "sucre", "sugar", "plante", "côte d'ivoire", "cameroun", "maurice"], canneASucre),
  E("figue-de-barbarie", "Figue de Barbarie", "Prickly pear", ["figue de barbarie", "prickly pear", "cactus", "hendi", "karmous", "maroc", "tunisie", "éthiopie"], figueBarbarie),
  E("citron-vert", "Citron vert", "Lime", ["citron vert", "lime", "citron", "lemon", "agrume", "citrus", "acide"], citronVert),
  E("pomme-de-cajou", "Pomme de cajou", "Cashew apple", ["pomme de cajou", "cashew apple", "cajou", "cashew", "anacarde", "noix de cajou", "côte d'ivoire", "guinée-bissau", "bénin"], pommeCajou),
  E("jacquier", "Jacquier", "Jackfruit", ["jacquier", "jackfruit", "jaque", "fruit", "tropical", "ouganda", "madagascar"], jacquier),
  E("litchi", "Litchi", "Lychee", ["litchi", "lychee", "letchi", "madagascar", "réunion", "fruit", "noël"], litchi),
  E("plantain", "Plantain", "Plantain", ["plantain", "banane plantain", "régime", "bunch", "alloco", "dodo", "cameroun", "ghana", "nigeria"], plantain),
  E("igname", "Igname", "Yam", ["igname", "yam", "tubercule", "tuber", "foufou", "pilé", "nigeria", "côte d'ivoire", "ghana"], igname),
  E("manioc", "Manioc", "Cassava", ["manioc", "cassava", "yuca", "tapioca", "racine", "root", "attiéké", "gari", "congo", "cameroun"], manioc),
  E("patate-douce", "Patate douce", "Sweet potato", ["patate douce", "sweet potato", "tubercule", "tuber", "orange", "ouganda", "madagascar"], patateDouce, "🍠"),
  E("macabo", "Macabo", "Cocoyam", ["macabo", "taro", "cocoyam", "colocase", "malanga", "tubercule", "feuille", "cameroun", "ghana"], macabo),
  E("arachides-en-coque", "Arachides en coque", "Peanuts in shell", ["arachide", "cacahuète", "peanut", "groundnut", "coque", "shell", "sénégal", "mafé"], arachides, "🥜"),
  E("aubergine-africaine", "Aubergine africaine", "Garden egg", ["aubergine africaine", "garden egg", "africa eggplant", "garden eggs", "djakatou", "ghana", "nigeria", "côte d'ivoire"], aubergineAfricaine),
  E("gombo", "Gombo", "Okra", ["gombo", "okra", "ladyfinger", "légume", "vegetable", "sauce gombo", "bamia", "nigeria", "mali"], gombo),
].map(cadre);
