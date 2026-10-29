import { PALS, byId } from "./constants";

export type PatternState = { pal: string; icons: string[]; lay: "grid" | "brick" | "scatter"; rot: "none" | "tilt" | "alt" | "free"; den: number; str: number; seed: number };

function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 10000) / 10000; };
}

/** Décalages à dessiner pour qu'un élément de rayon r centré en (x, y) se raccorde sans couture. */
function wraps(x: number, y: number, r: number, W: number, H: number): [number, number][] {
  const xs = [0], ys = [0];
  if (x - r < 0) xs.push(W); if (x + r > W) xs.push(-W);
  if (y - r < 0) ys.push(H); if (y + r > H) ys.push(-H);
  return xs.flatMap((dx) => ys.map((dy) => [dx, dy] as [number, number]));
}

/** Construit une tuile 6×6 répétable. */
export function buildTile(P: PatternState) {
  const pal = PALS[P.pal] ?? PALS.douala, cell = P.den, cols = 6, rows = 6, W = cell * cols, H = cell * rows, r = rng(P.seed);
  const ics = (P.icons.length ? P.icons : ["baobab"]).map((id) => byId[id]).filter(Boolean);
  const isz = cell * 0.5;
  let g = "";
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const off = P.lay === "brick" && y % 2 ? cell / 2 : 0;
    const ic = P.lay === "grid" ? ics[(x + y * cols) % ics.length] : ics[Math.floor(r() * ics.length)];
    const col = pal.c[(x + y * 2 + (P.lay === "grid" ? 0 : Math.floor(r() * pal.c.length))) % pal.c.length];
    let rot = 0;
    if (P.rot === "tilt") rot = r() * 30 - 15; else if (P.rot === "free") rot = r() * 360; else if (P.rot === "alt") rot = (x + y) % 2 ? 180 : 0;
    const sc = P.lay === "scatter" ? 0.75 + r() * 0.5 : 1;
    const jx = P.lay === "scatter" ? (r() - 0.5) * cell * 0.35 : 0, jy = P.lay === "scatter" ? (r() - 0.5) * cell * 0.35 : 0;
    const cx = x * cell + cell / 2 + off + jx, cy = y * cell + cell / 2 + jy, s = (isz * sc) / 24;
    const one = (dx: number, dy: number) => `<g transform="translate(${(cx + dx).toFixed(1)} ${(cy + dy).toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${s.toFixed(3)}) translate(-12 -12)" stroke="${col}" color="${col}">${ic.body}</g>`;
    // Rayon maximal de l'icône (rotation et trait compris) : si elle déborde d'un bord, on la recopie de l'autre côté.
    const R = isz * sc * 0.72 + P.str;
    for (const [dx, dy] of wraps(cx, cy, R, W, H)) g += one(dx, dy);
  }
  if (P.lay !== "scatter") for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const off = P.lay === "brick" && y % 2 ? cell / 2 : 0;
    const dx0 = x * cell + off, dy0 = y * cell, rr = cell * 0.03;
    for (const [dx, dy] of wraps(dx0, dy0, rr, W, H))
      g += `<circle cx="${(dx0 + dx).toFixed(1)}" cy="${(dy0 + dy).toFixed(1)}" r="${rr.toFixed(2)}" fill="${pal.c[(x + y) % pal.c.length]}" opacity=".7"/>`;
  }
  const inner = `<g fill="none" stroke-width="${(P.str / (isz / 24)).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round">${g}</g>`;
  return { W, H, inner, bg: pal.bg };
}

export const tileSvg = (P: PatternState) => {
  const t = buildTile(P);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${t.W}" height="${t.H}" viewBox="0 0 ${t.W} ${t.H}"><rect width="${t.W}" height="${t.H}" fill="${t.bg}"/>${t.inner}</svg>`;
};

export function posterSvg(P: PatternState, N = 2400) {
  const t = buildTile(P), reps = Math.ceil(N / t.W);
  let g = "";
  for (let y = 0; y < reps; y++) for (let x = 0; x < reps; x++) g += `<g transform="translate(${x * t.W} ${y * t.H})">${t.inner}</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${N}" height="${N}" viewBox="0 0 ${N} ${N}"><rect width="${N}" height="${N}" fill="${t.bg}"/>${g}</svg>`;
}
