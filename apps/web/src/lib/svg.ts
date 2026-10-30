import type { Icon, Style } from "./constants";

export type SvgOpts = { s?: number; c?: string; w?: number; style?: Style; bg?: string; cls?: string };

/** Construit le SVG d'une icône (trait, pastille ou cercle) sous forme de chaîne. */
export function svgStr(i: Icon, o: SvgOpts = {}): string {
  const s = o.s ?? 24, c = o.c ?? "currentColor", w = o.w ?? 1.75, st = o.style ?? "line", bg = o.bg ?? "#C24E2A";
  const cls = o.cls ? ` class="${o.cls}"` : "";
  const head = `<svg xmlns="http://www.w3.org/2000/svg"${cls} width="${s}" height="${s}" viewBox="0 0 24 24" fill="none"`;
  // Trait ou rempli : la couleur passe aussi par color, pour les points et les aplats (currentColor).
  if (st === "line" || st === "fill") return `${head} stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" color="${c}">${st === "fill" ? i.fill ?? i.body : i.body}</svg>`;
  const k = 0.64;
  const shape = st === "circle" ? `<circle cx="12" cy="12" r="12" fill="${bg}"/>` : `<rect width="24" height="24" rx="6.5" fill="${bg}"/>`;
  const body = i.body.replace(/fill="currentColor"/g, `fill="${c}"`);
  return `${head}>${shape}<g transform="translate(${12 - 12 * k} ${12 - 12 * k}) scale(${k})" stroke="${c}" stroke-width="${(w / k).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round" color="${c}">${body}</g></svg>`;
}

export const pascal = (id: string) => id.replace(/(^|[-_])(\w)/g, (_, _a, b) => b.toUpperCase());

export function jsxSnippet(i: Icon, stroke: number, fill = false) {
  if (i.lucide) return `// npm install afroicons-ui lucide-react\n// Mêmes noms que lucide-react : remplacez simplement l'import.\nimport { ${i.lucide} } from "afroicons-ui";\n\n<${i.lucide} size={24} strokeWidth={${stroke}} />`;
  return `import { ${pascal(i.id)} } from "afroicons-react";\n\n<${pascal(i.id)} size={24} ${fill ? 'variant="fill"' : `strokeWidth={${stroke}}`} />\n\n// ou, sans dépendance :\nexport function ${pascal(i.id)}({ size = 24, color = "currentColor", strokeWidth = ${stroke}, ...props }) {\n  return (\n    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"\n      stroke={color} strokeWidth={strokeWidth}\n      strokeLinecap="round" strokeLinejoin="round" {...props}>\n      ${i.body.replace(/stroke-width/g, "strokeWidth")}\n    </svg>\n  );\n}`;
}

export const spriteStr = (list: Icon[], stroke: number) =>
  `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n${list
    .map((i) => `  <symbol id="afroicon-${i.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${i.body}</symbol>`)
    .join("\n")}\n</svg>`;

export const useStr = (i: Icon) => `<svg width="24" height="24"><use href="#afroicon-${i.id}"/></svg>`;

export function cssStr(i: Icon, stroke: number) {
  const u = encodeURIComponent(svgStr(i, { c: "#000", w: stroke }));
  return `.afroicon-${i.id} {\n  width: 24px; height: 24px;\n  background: currentColor;\n  -webkit-mask: url("data:image/svg+xml,${u}") center/contain no-repeat;\n          mask: url("data:image/svg+xml,${u}") center/contain no-repeat;\n}`;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
/** Coloration syntaxique minimale (balises, attributs, valeurs). */
export function highlight(code: string, plain = false) {
  const h = esc(code);
  if (plain) return h;
  return h
    .replace(/(&lt;\/?)([\w]+)/g, '$1<span class="t">$2</span>')
    .replace(/([\w-:]+)=(&quot;[^&]*&quot;|\{[^}]*\})/g, '<span class="a">$1</span>=<span class="s">$2</span>');
}

export function svgToPng(svg: string, w: number, h: number): Promise<Blob> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => {
      const cv = document.createElement("canvas");
      cv.width = w; cv.height = h;
      cv.getContext("2d")!.drawImage(img, 0, 0, w, h);
      cv.toBlob((b) => (b ? res(b) : rej(new Error("png"))), "image/png");
    };
    img.onerror = rej;
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  });
}

/** Le logo « A-case ». */
export function logoSvg(o: { s?: number; bg?: string; fg?: string; door?: string; sun?: string } = {}) {
  const s = o.s ?? 48, bg = o.bg ?? "#1F1A15", fg = o.fg ?? "#FBF5EA", door = o.door ?? "#E3A22F", sun = o.sun ?? "#C24E2A";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 48 48">${bg !== "none" ? `<rect width="48" height="48" rx="14" fill="${bg}"/>` : ""}<g fill="none" stroke="${fg}" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 37L24 9.5L38 37"/><path d="M16.2 26H31.8"/></g><path d="M21 37V33.2A3 3 0 0 1 27 33.2V37Z" fill="${door}"/><circle cx="36.5" cy="11.5" r="3.6" fill="${sun}"/></svg>`;
}

/** Anime le tracé d'un SVG déjà dans le DOM. */
export function animateDraw(el: SVGSVGElement | null) {
  if (!el) return;
  el.classList.remove("draw");
  el.querySelectorAll<SVGGeometryElement>("path,circle,ellipse,rect").forEach((p, k) => {
    if (p.getAttribute("fill") === "currentColor") return;
    let L = 60;
    try { L = Math.ceil(p.getTotalLength()) + 1; } catch { /* rien */ }
    p.style.setProperty("--len", String(L));
    p.style.setProperty("--d", k * 0.09 + "s");
  });
  void el.getBoundingClientRect();
  el.classList.add("draw");
}
