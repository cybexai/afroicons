// Génère la version « remplie » de chaque icône culturelle à partir de son dessin au trait.
//
//   node scripts/fill.mjs            → ajoute `fill` aux icônes qui n'en ont pas
//   node scripts/fill.mjs --force a b → régénère les icônes a et b (écrase les retouches)
//
// Principe : les formes fermées (et les formes en U, comme des murs ou un tronc) deviennent des aplats ;
// les détails à l'intérieur (porte, yeux, nervures) sont découpés dans l'aplat grâce à un masque SVG ;
// les traits hors des formes restent des traits. Le résultat se retouche ensuite à la main dans src/icons.json.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = join(root, "src/icons.json");
const icons = JSON.parse(readFileSync(file, "utf8"));
const args = process.argv.slice(2);
const force = args[0] === "--force" ? new Set(args.slice(1)) : null;

const attrs = (s) => Object.fromEntries([...s.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const num = (v) => parseFloat(v);

/** Points le long d'un arc SVG (conversion en paramètres de centre, spécification SVG F.6.5). */
function arcPoints(x1, y1, rx, ry, rotDeg, large, sweep, x2, y2) {
  if (!rx || !ry) return [[x2, y2]];
  const phi = (rotDeg * Math.PI) / 180, cos = Math.cos(phi), sin = Math.sin(phi);
  const dx = (x1 - x2) / 2, dy = (y1 - y2) / 2;
  const x1p = cos * dx + sin * dy, y1p = -sin * dx + cos * dy;
  rx = Math.abs(rx); ry = Math.abs(ry);
  const lam = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
  if (lam > 1) { rx *= Math.sqrt(lam); ry *= Math.sqrt(lam); }
  const num = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p;
  const den = rx * rx * y1p * y1p + ry * ry * x1p * x1p;
  const co = (large === sweep ? -1 : 1) * Math.sqrt(Math.max(0, num / den));
  const cxp = (co * rx * y1p) / ry, cyp = (-co * ry * x1p) / rx;
  const cx = cos * cxp - sin * cyp + (x1 + x2) / 2, cy = sin * cxp + cos * cyp + (y1 + y2) / 2;
  const ang = (ux, uy, vx, vy) => Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
  const t1 = ang(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
  let dt = ang((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry);
  if (!sweep && dt > 0) dt -= 2 * Math.PI; else if (sweep && dt < 0) dt += 2 * Math.PI;
  const out = [];
  for (let k = 1; k <= 16; k++) {
    const t = t1 + (dt * k) / 16, ex = rx * Math.cos(t), ey = ry * Math.sin(t);
    out.push([cos * ex - sin * ey + cx, sin * ex + cos * ey + cy]);
  }
  return out;
}

/** Points d'un tracé (absolu : M L H V C S Q A Z) : extrémités et points de contrôle, pour la boîte englobante. */
function pathInfo(d) {
  const toks = d.match(/[MLHVCSQAZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) ?? [];
  const pts = [];
  let i = 0, cmd = "", x = 0, y = 0, sx = 0, sy = 0, first = null, closed = false;
  const n = () => parseFloat(toks[i++]);
  while (i < toks.length) {
    if (/[a-z]/i.test(toks[i])) cmd = toks[i++];
    switch (cmd) {
      case "M": x = n(); y = n(); sx = x; sy = y; if (!first) first = [x, y]; pts.push([x, y]); cmd = "L"; break;
      case "L": x = n(); y = n(); pts.push([x, y]); break;
      case "H": x = n(); pts.push([x, y]); break;
      case "V": y = n(); pts.push([x, y]); break;
      case "C": pts.push([n(), n()], [n(), n()]); x = n(); y = n(); pts.push([x, y]); break;
      case "S": case "Q": pts.push([n(), n()]); x = n(); y = n(); pts.push([x, y]); break;
      case "A": { const rx = n(), ry = n(), rot = n(), large = n(), sweep = n(), nx = n(), ny = n(); pts.push(...arcPoints(x, y, rx, ry, rot, large, sweep, nx, ny)); x = nx; y = ny; break; }
      case "Z": case "z": x = sx; y = sy; closed = true; break;
      default: i++;
    }
  }
  return { pts, first, last: [x, y], closed: closed && /z\s*$/i.test(d.trim()) };
}

function analyse(tag, a) {
  if (tag === "circle") { const r = num(a.r); return { box: [num(a.cx) - r, num(a.cy) - r, num(a.cx) + r, num(a.cy) + r], closed: true }; }
  if (tag === "ellipse") { const rx = num(a.rx), ry = num(a.ry); return { box: [num(a.cx) - rx, num(a.cy) - ry, num(a.cx) + rx, num(a.cy) + ry], closed: true }; }
  if (tag === "rect") { const x = num(a.x || 0), y = num(a.y || 0); return { box: [x, y, x + num(a.width), y + num(a.height)], closed: true }; }
  const p = pathInfo(a.d);
  const xs = p.pts.map((q) => q[0]), ys = p.pts.map((q) => q[1]);
  const box = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
  const w = box[2] - box[0], h = box[3] - box[1];
  // Forme en U (murs ouverts en haut, tronc ouvert en bas…) : on la ferme. Un seul sous-tracé, extrémités alignées.
  const single = (a.d.match(/M/g) || []).length === 1;
  const u = !p.closed && single && w > 3 && h > 3 && p.pts.length >= 3 &&
    (Math.abs(p.first[1] - p.last[1]) < 0.6 || Math.abs(p.first[0] - p.last[0]) < 0.6) &&
    Math.hypot(p.first[0] - p.last[0], p.first[1] - p.last[1]) > 2;
  return { box, closed: p.closed, u };
}

const inside = (a, b) => a[0] >= b[0] - 0.3 && a[1] >= b[1] - 0.3 && a[2] <= b[2] + 0.3 && a[3] <= b[3] + 0.3;
const area = (b) => (b[2] - b[0]) * (b[3] - b[1]);
const tagStr = (tag, a) => `<${tag}${Object.entries(a).map(([k, v]) => ` ${k}="${v}"`).join("")}/>`;

export function makeFill(icon) {
  if (/<g[\s>]/.test(icon.body)) return null; // groupes transformés : à faire à la main
  const els = [...icon.body.matchAll(/<(path|circle|ellipse|rect)\b([^>]*?)\/>/g)].map(([, tag, s]) => {
    const a = attrs(s);
    const dot = a.fill === "currentColor";
    const info = a.transform ? { box: [0, 0, 0, 0], closed: false, free: true } : analyse(tag, a);
    return { tag, a, dot, ...info };
  });
  const shapes = els.filter((e) => !e.dot && !e.free && (e.closed || e.u));
  for (const e of els) {
    e.depth = shapes.filter((s) => s !== e && area(s.box) > area(e.box) + 0.01 && inside(e.box, s.box)).length;
  }
  const maskItems = [], free = [];
  for (const e of els) {
    const isShape = shapes.includes(e);
    const a = { ...e.a };
    if (e.u) a.d = a.d.trim() + "Z";
    if (e.free) { free.push(tagStr(e.tag, e.a)); continue; }
    if (e.dot) {
      if (e.depth >= 1) maskItems.push([e.depth, tagStr(e.tag, { ...a, fill: "#000", stroke: "none" })]);
      else free.push(tagStr(e.tag, e.a));
      continue;
    }
    if (isShape) {
      const white = e.depth % 2 === 0;
      if (white) maskItems.push([e.depth, tagStr(e.tag, { ...a, fill: "#fff", stroke: "#fff" })]);
      // Forme en U dans une silhouette (l'espace entre les pattes) : on la découpe entièrement.
      // Forme fermée dans une silhouette (un œil, un motif) : on découpe son contour, ou tout si elle est petite.
      else maskItems.push([e.depth, tagStr(e.tag, { ...a, fill: e.u || area(e.box) < 5 ? "#000" : "none", stroke: "#000" })]);
      continue;
    }
    if (e.depth >= 1) maskItems.push([e.depth, tagStr(e.tag, { ...a, fill: "none", stroke: "#000" })]);
    else free.push(tagStr(e.tag, e.a));
  }
  if (!maskItems.some(([, s]) => s.includes('fill="#fff"'))) return null; // aucune forme à remplir
  maskItems.sort((x, y) => x[0] - y[0]);
  const id = `afm-${icon.id}`;
  return `<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">${maskItems.map(([, s]) => s).join("")}</mask>` +
    `<rect width="24" height="24" fill="currentColor" stroke="none" mask="url(#${id})"/>` + free.join("");
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const skipped = [];
  let n = 0;
  for (const i of icons) {
    if (i.fill && !(force && force.has(i.id))) continue;
    const f = makeFill(i);
    if (f) { i.fill = f; n++; } else skipped.push(i.id);
  }
  writeFileSync(file, JSON.stringify(icons, null, 1) + "\n");
  console.log(`✔ ${n} versions remplies générées`);
  if (skipped.length) console.log(`À dessiner à la main (${skipped.length}) : ${skipped.join(", ")}`);
}
