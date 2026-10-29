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

/* ---------- afroicons-ui (icônes d'interface, compatibles lucide-react) ---------- */
// Mêmes noms et mêmes props que lucide-react : on remplace l'import, rien d'autre.
// Les icônes pas encore dessinées sont reprises de lucide-react (export *).
const ui = JSON.parse(readFileSync(join(root, "src/ui-icons.json"), "utf8"));
const U = join(root, "packages/afroicons-ui");
const kebab = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([a-zA-Z])(\d)/g, "$1-$2").toLowerCase();
rmSync(join(U, "svg"), { recursive: true, force: true });
mkdirSync(join(U, "svg"), { recursive: true });
for (const i of ui) writeFileSync(join(U, "svg", `${i.id}.svg`),
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round" class="afroicon afroicon-ui-${kebab(i.id)}">${i.body}</svg>\n`);
writeFileSync(join(U, "icons.json"), JSON.stringify(ui.map(({ id, fr, en, family, afro, body }) => ({ id, fr, en, family, afro, body })), null, 1));
let ujs = `// afroicons-ui v${version} — généré, ne pas modifier à la main.
import { createElement, forwardRef } from "react";
export * from "lucide-react";

const make = (name, nodes) => {
  const C = forwardRef(function Afroicon({ color = "currentColor", size = 24, strokeWidth = ${STROKE}, absoluteStrokeWidth, className = "", children, ...rest }, ref) {
    return createElement("svg", {
      ref, xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none",
      stroke: color, strokeWidth: absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth,
      strokeLinecap: "round", strokeLinejoin: "round",
      className: ["lucide", "lucide-" + name, "afroicon", className].filter(Boolean).join(" "), ...rest,
    }, ...nodes.map(([t, p], k) => createElement(t, { key: k, ...p })), ...(Array.isArray(children) ? children : [children]));
  });
  C.displayName = name;
  return C;
};
`;
let udts = `// afroicons-ui v${version} — généré, ne pas modifier à la main.
export * from "lucide-react";
import type { LucideIcon } from "lucide-react";
/** Noms des icônes redessinées par Afroicons (les autres viennent de lucide-react). */
export declare const afroiconNames: readonly string[];
`;
for (const i of ui) {
  ujs += `export const ${i.id} = make("${kebab(i.id)}", ${JSON.stringify(toJsxChildren(i.body))});\nexport { ${i.id} as ${i.id}Icon, ${i.id} as Lucide${i.id} };\n`;
  udts += `/** ${i.fr} · ${i.en}${i.afro ? ` — ${i.afro}` : ""} */\nexport declare const ${i.id}: LucideIcon;\nexport declare const ${i.id}Icon: LucideIcon;\nexport declare const Lucide${i.id}: LucideIcon;\n`;
}
ujs += `export const afroiconNames = ${JSON.stringify(ui.map((i) => i.id))};\n`;
writeFileSync(join(U, "index.js"), ujs);
writeFileSync(join(U, "index.d.ts"), udts);
console.log(`✔ ${ui.length} icônes d'interface → packages/afroicons-ui`);

/* ---------- afroicons-angular : données des icônes (le composant est écrit à la main) ---------- */
// Une constante exportée par icône, pour que le bundle ne garde que celles qui sont importées.
const NG = join(root, "packages/afroicons-angular/src/icons.ts");
const node = (name, body) => `{ name: ${JSON.stringify(name)}, nodes: ${JSON.stringify(toJsxChildren(body).map(([t, p]) => [t, Object.fromEntries(Object.entries(p).map(([k, v]) => [k.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase()), v]))]))} }`;
let ng = `// afroicons-angular v${version} — généré par scripts/build.mjs, ne pas modifier à la main.\nimport type { AfroiconNode } from "./types";\n\n// Icônes culturelles (id Afroicons)\n`;
for (const i of icons) ng += `/** ${i.fr} · ${i.en} */\nexport const ${pascal(i.id)}: AfroiconNode = ${node(i.id, i.body)};\n`;
ng += `\n// Icônes d'interface (noms Lucide, comme afroicons-ui)\n`;
for (const i of ui) ng += `/** ${i.fr} · ${i.en} */\nexport const ${i.id}: AfroiconNode = ${node(i.id, i.body)};\n`;
ng += `\n/** Toutes les icônes : provideAfroicons(afroicons). Pratique, mais tout entre dans le bundle. */\nexport const afroicons = { ${[...icons.map((i) => pascal(i.id)), ...ui.map((i) => i.id)].join(", ")} } as const;\n`;
writeFileSync(NG, ng);
console.log(`✔ ${icons.length + ui.length} icônes → packages/afroicons-angular`);
