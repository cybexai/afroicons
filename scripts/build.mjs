// Génère les paquets à partir de src/icons.json (source unique de vérité).
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const icons = JSON.parse(readFileSync(join(root, "src/icons.json"), "utf8"));
const version = JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version;
const STROKE = 1.75;
const pascal = (id) => id.replace(/(^|[-_])(\w)/g, (_, a, b) => b.toUpperCase());
const svg = (i) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round" class="afroicon afroicon-${i.id}">${i.body}</svg>\n`;

/* ---------- afroicons (vanilla) ---------- */
const A = join(root, "packages/afroicons");
rmSync(join(A, "svg"), { recursive: true, force: true });
mkdirSync(join(A, "svg"), { recursive: true });
for (const i of icons) writeFileSync(join(A, "svg", `${i.id}.svg`), svg(i));
writeFileSync(join(A, "sprite.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n${icons.map((i) => `  <symbol id="afroicon-${i.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round">${i.body}</symbol>`).join("\n")}\n</svg>\n`);
const meta = icons.map(({ id, fr, en, cat, region, tags, since, body }) => ({ id, fr, en, cat, region, tags, since, body }));
writeFileSync(join(A, "icons.json"), JSON.stringify(meta, null, 1));
writeFileSync(join(A, "index.js"),
`// afroicons v${version} — généré, ne pas modifier à la main.
export const icons = ${JSON.stringify(Object.fromEntries(meta.map((i) => [i.id, i])))};
export const names = Object.keys(icons);

/** Renvoie le SVG d'une icône sous forme de chaîne. */
export function toSvg(name, { size = 24, color = "currentColor", strokeWidth = ${STROKE}, className = "" } = {}) {
  const i = icons[name];
  if (!i) throw new Error(\`afroicons: icône inconnue « \${name} »\`);
  const cls = ("afroicon afroicon-" + name + " " + className).trim();
  return \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${color}" stroke-width="\${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="\${cls}">\${i.body}</svg>\`;
}

/** Remplace chaque <i data-afroicon="baobab"></i> de la page par son SVG. */
export function replace({ attr = "data-afroicon", root = globalThis.document } = {}) {
  if (!root) return;
  root.querySelectorAll(\`[\${attr}]\`).forEach((el) => {
    const n = el.getAttribute(attr);
    if (!icons[n]) return;
    const size = el.getAttribute("data-size") || 24;
    const sw = el.getAttribute("data-stroke") || ${STROKE};
    el.outerHTML = toSvg(n, { size, strokeWidth: sw, className: el.className || "" });
  });
}
export default { icons, names, toSvg, replace };
`);
writeFileSync(join(A, "index.d.ts"),
`export type AfroiconName =\n${icons.map((i) => `  | "${i.id}"`).join("\n")};
export type AfroiconCategory = "nature" | "faune" | "musique" | "symboles" | "cuisine" | "vie" | "architecture";
export type AfroiconRegion = "pan" | "ouest" | "centre" | "est" | "nord" | "australe";
export interface AfroiconData { id: AfroiconName; fr: string; en: string; cat: AfroiconCategory; region: AfroiconRegion; tags: string[]; since: string; body: string; }
export const icons: Record<AfroiconName, AfroiconData>;
export const names: AfroiconName[];
export interface ToSvgOptions { size?: number | string; color?: string; strokeWidth?: number | string; className?: string; }
export function toSvg(name: AfroiconName, options?: ToSvgOptions): string;
export function replace(options?: { attr?: string; root?: ParentNode }): void;
declare const _default: { icons: typeof icons; names: typeof names; toSvg: typeof toSvg; replace: typeof replace };
export default _default;
`);

/* ---------- afroicons-react ---------- */
const Rd = join(root, "packages/afroicons-react");
const toJsxChildren = (body) => {
  // Convertit le SVG interne en appels createElement.
  const out = [];
  const re = /<(\w+)([^>]*?)\/?>(?:<\/\1>)?/g;
  let m;
  while ((m = re.exec(body))) {
    const props = {};
    m[2].replace(/([\w:-]+)="([^"]*)"/g, (_, k, v) => {
      const key = k.replace(/-(\w)/g, (_, c) => c.toUpperCase());
      props[key] = v;
    });
    out.push([m[1], props]);
  }
  return out;
};
let js = `// afroicons-react v${version} — généré, ne pas modifier à la main.
import { createElement, forwardRef } from "react";

const make = (name, nodes) => {
  const C = forwardRef(function Afroicon({ size = 24, color = "currentColor", strokeWidth = ${STROKE}, className = "", title, children, ...rest }, ref) {
    return createElement("svg", {
      ref, xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none",
      stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round",
      className: ("afroicon afroicon-" + name + " " + className).trim(),
      "aria-hidden": title ? undefined : true, role: title ? "img" : undefined, ...rest,
    }, title ? createElement("title", null, title) : null,
      ...nodes.map(([t, p], k) => createElement(t, { key: k, ...p })), children);
  });
  C.displayName = ${"`"}Afroicon(${"$"}{name})${"`"};
  return C;
};
`;
let dts = `import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";
export interface AfroiconProps extends Omit<SVGProps<SVGSVGElement>, "ref"> { size?: number | string; color?: string; strokeWidth?: number | string; title?: string; }
export type Afroicon = ForwardRefExoticComponent<AfroiconProps & RefAttributes<SVGSVGElement>>;
`;
for (const i of icons) {
  js += `export const ${pascal(i.id)} = make("${i.id}", ${JSON.stringify(toJsxChildren(i.body))});\n`;
  dts += `/** ${i.fr} · ${i.en} */\nexport declare const ${pascal(i.id)}: Afroicon;\n`;
}
writeFileSync(join(Rd, "index.js"), js);
writeFileSync(join(Rd, "index.d.ts"), dts);
console.log(`✔ ${icons.length} icônes → packages/afroicons, packages/afroicons-react`);
