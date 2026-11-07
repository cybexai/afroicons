/**
 * Retouche objet par objet d'une scène d'illustration (voir la fiche dans components/Illustrations.tsx).
 *
 * Chaque forme du décor reçoit un numéro (data-o) ; les retouches s'y rattachent :
 * couleurs et motifs de l'objet, position, taille, rotation, retournement, opacité, ordre, masquage, copies.
 * Les retouches s'appliquent sur la scène telle que dessinée (couleurs de Douala), AVANT l'ambiance :
 * elles survivent donc à un changement d'ambiance.
 */

/** Retouche d'un objet. cx, cy : son centre, dans le repère de son parent (pivot de la taille et de la rotation). */
export interface Obj {
  map?: Record<string, string>; // couleur ou motif d'origine → nouvelle valeur (#hex ou url(#motif))
  hide?: boolean;
  dx?: number; dy?: number;
  s?: number; r?: number; fx?: boolean; op?: number;
  cx?: number; cy?: number;
  z?: number; // déplacement dans l'ordre d'empilement (±999 : tout devant, tout derrière)
}
/** Toutes les retouches d'une scène. pal : couleurs remplacées dans toute la scène (motifs compris). */
export interface Edits { o: Record<string, Obj>; pal?: Record<string, string>; dup?: [string, string][] }
export const NO_EDITS: Edits = { o: {} };

const SVGNS = "http://www.w3.org/2000/svg";
const PAINT = ["fill", "stroke", "stop-color"];
const CONTENT = 'g[clip-path="url(#cadre)"]';
// Ce qui ne se dessine pas tout seul : on n'y numérote rien.
const SKIP = new Set(["defs", "pattern", "clipPath", "mask", "linearGradient", "radialGradient", "filter", "symbol", "title", "desc", "style"]);

const parse = (svg: string) => new DOMParser().parseFromString(svg, "image/svg+xml");
const ser = (d: Document) => new XMLSerializer().serializeToString(d);
const content = (d: Document) => d.querySelector(CONTENT);

const tagCache = new Map<string, string>();
/** Numérote les objets de la scène (dans l'ordre du dessin). Un drapeau compte pour un seul objet. */
export function tag(svg: string): string {
  const hit = tagCache.get(svg);
  if (hit) return hit;
  const d = parse(svg), root = content(d);
  if (!root) return svg;
  let n = 0;
  const walk = (el: Element) => {
    for (const c of Array.from(el.children)) {
      if (SKIP.has(c.localName)) continue;
      c.setAttribute("data-o", String(++n));
      if (c.localName === "g" && !c.hasAttribute("data-flag")) walk(c);
    }
  };
  walk(root);
  const out = ser(d);
  tagCache.set(svg, out);
  return out;
}

/** Les numéros et enveloppes de retouche disparaissent des fichiers exportés. */
export const strip = (svg: string) => svg.replace(/ data-[ow]="[^"]*"/g, "");

export const isEmpty = (e?: Edits) => !e || (!Object.keys(e.o).length && !Object.keys(e.pal ?? {}).length && !(e.dup ?? []).length);
export const count = (e?: Edits) => (e ? Object.keys(e.o).length + Object.keys(e.pal ?? {}).length : 0);

/** Transformation d'un objet retouché, autour de son centre. */
export function tf(o: Obj) {
  const cx = o.cx ?? 0, cy = o.cy ?? 0, s = o.s ?? 1, r = o.r ?? 0;
  const k = (v: number) => +v.toFixed(2);
  return `translate(${k(o.dx ?? 0)} ${k(o.dy ?? 0)}) translate(${k(cx)} ${k(cy)}) rotate(${k(r)}) scale(${k(o.fx ? -s : s)} ${k(s)}) translate(${k(-cx)} ${k(-cy)})`;
}
const moves = (o: Obj) => !!(o.dx || o.dy || (o.s ?? 1) !== 1 || o.r || o.fx);

const sel = (root: ParentNode, id: string) => root.querySelector(`[data-o="${id}"]`);

/** Applique les retouches à une scène numérotée (avant l'ambiance). */
export function applyEdits(tagged: string, e?: Edits): string {
  if (isEmpty(e)) return tagged;
  const d = parse(tagged), root = content(d);
  if (!root) return tagged;
  // 1. Les copies : clone de l'objet source (et de ses enfants, renumérotés), juste après lui.
  for (const [nid, src] of e!.dup ?? []) {
    const el = sel(root, src);
    if (!el) continue;
    const c = el.cloneNode(true) as Element;
    c.setAttribute("data-o", nid);
    c.querySelectorAll("[data-o]").forEach((x) => x.setAttribute("data-o", `${nid}.${x.getAttribute("data-o")}`));
    el.after(c);
  }
  for (const [id, o] of Object.entries(e!.o)) {
    const el = sel(root, id);
    if (!el) continue;
    // 2. Couleurs et motifs de l'objet (lui et tout ce qu'il contient).
    if (o.map && Object.keys(o.map).length) {
      const m = new Map(Object.entries(o.map).map(([k, v]) => [k.toLowerCase(), v]));
      for (const x of [el, ...Array.from(el.querySelectorAll("*"))]) for (const p of PAINT) {
        const v = x.getAttribute(p);
        const to = v && m.get(v.toLowerCase());
        if (to) x.setAttribute(p, to);
      }
    }
    if (o.hide) el.setAttribute("display", "none");
    // 3. Position, taille, rotation, opacité : une enveloppe autour de l'objet (son propre dessin ne change pas).
    if (moves(o) || (o.op ?? 1) !== 1) {
      const w = d.createElementNS(SVGNS, "g");
      w.setAttribute("data-w", id);
      if (moves(o)) w.setAttribute("transform", tf(o));
      if ((o.op ?? 1) !== 1) w.setAttribute("opacity", String(+(o.op ?? 1).toFixed(2)));
      el.before(w);
      w.append(el);
    }
  }
  // 4. L'ordre d'empilement.
  for (const [id, o] of Object.entries(e!.o)) {
    if (!o.z) continue;
    const el = sel(root, id);
    if (!el) continue;
    const node = el.parentElement?.getAttribute("data-w") === id ? el.parentElement : el;
    const par = node.parentElement!;
    const sibs = Array.from(par.children).filter((x) => !SKIP.has(x.localName));
    const k = Math.max(0, Math.min(sibs.length - 1, sibs.indexOf(node) + o.z));
    node.remove();
    const rest = Array.from(par.children).filter((x) => !SKIP.has(x.localName));
    if (k >= rest.length) par.append(node);
    else rest[k].before(node);
  }
  let out = ser(d);
  // 5. Les couleurs remplacées dans toute la scène (y compris dans les motifs de tissu).
  if (e!.pal && Object.keys(e!.pal).length) {
    const m = new Map(Object.entries(e!.pal).map(([k, v]) => [k.toLowerCase(), v]));
    out = out.replace(/#[0-9a-f]{6}\b/gi, (h) => m.get(h.toLowerCase()) ?? h);
  }
  return out;
}

/** Les couleurs (et motifs) d'origine d'objets, de la plus présente à la moins présente.
 *  `tagged` : la scène numérotée, copies comprises (applyEdits avec seulement `dup`). */
export function paintsOf(tagged: string, ids: string[]): string[] {
  const d = parse(tagged), root = content(d);
  if (!root) return [];
  const n = new Map<string, number>();
  for (const id of ids) {
    const el = sel(root, id);
    if (!el) continue;
    for (const x of [el, ...Array.from(el.querySelectorAll("*"))]) for (const p of PAINT) {
      const v = x.getAttribute(p);
      if (!v || !(/^#[0-9a-f]{6}$/i.test(v) || /^url\(#[\w-]+\)$/.test(v))) continue;
      const k = v.startsWith("#") ? v.toUpperCase() : v;
      n.set(k, (n.get(k) ?? 0) + 1);
    }
  }
  return [...n.entries()].sort((x, y) => y[1] - x[1]).map(([k]) => k);
}

/** Toutes les couleurs de la scène (décor, personnages, motifs), avec leur nombre d'emplois. */
export function paletteOf(svg: string): [string, number][] {
  const n = new Map<string, number>();
  for (const [h] of svg.matchAll(/#[0-9a-f]{6}\b/gi)) n.set(h.toUpperCase(), (n.get(h.toUpperCase()) ?? 0) + 1);
  return [...n.entries()].sort((x, y) => y[1] - x[1]);
}

/** Les motifs de tissu présents dans la scène. */
export const patternsOf = (svg: string) => [...new Set([...svg.matchAll(/<pattern id="([\w-]+)"/g)].map((m) => m[1]))];
