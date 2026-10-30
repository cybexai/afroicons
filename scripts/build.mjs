// Génère les paquets à partir de src/icons.json et src/flags.json (sources uniques de vérité).
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
// Icônes culturelles, puis drapeaux (générés par scripts/flags.mjs ; en couleur, leur version remplie est la même).
const icons = [...JSON.parse(readFileSync(join(root, "src/icons.json"), "utf8")), ...JSON.parse(readFileSync(join(root, "src/flags.json"), "utf8"))];
const version = JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version;
const STROKE = 1.75;
const pascal = (id) => id.replace(/(^|[-_])(\w)/g, (_, a, b) => b.toUpperCase());
const svg = (i, body = i.body, cls = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round" class="afroicon afroicon-${i.id}${cls}">${body}</svg>\n`;

/** Analyse le SVG interne d'une icône en arbre [balise, attributs, enfants]. Gère les groupes et les masques. */
function parseSvg(body) {
  const rootNode = [null, {}, []], stack = [rootNode];
  for (const m of body.matchAll(/<(\/?)(\w+)([^>]*?)(\/?)>/g)) {
    const [, close, tag, a, self] = m;
    if (close) { stack.pop(); continue; }
    const attrs = Object.fromEntries([...a.matchAll(/([\w:-]+)="([^"]*)"/g)].map((x) => [x[1], x[2]]));
    const n = [tag, attrs, []];
    stack.at(-1)[2].push(n);
    if (!self) stack.push(n);
  }
  return rootNode[2];
}
/** Arbre compact : [balise, attributs] ou [balise, attributs, enfants]. `key` renomme les attributs (React : camelCase). */
const tree = (nodes, key = (k) => k) => nodes.map(([t, a, c]) => {
  const attrs = Object.fromEntries(Object.entries(a).map(([k, v]) => [key(k), v]));
  return c.length ? [t, attrs, tree(c, key)] : [t, attrs];
});
const camel = (k) => (k.includes("-") ? k.replace(/-(\w)/g, (_, c) => c.toUpperCase()) : k);
const toJsxChildren = (body) => tree(parseSvg(body), camel);

/* ---------- afroicons (vanilla) ---------- */
const A = join(root, "packages/afroicons");
rmSync(join(A, "svg"), { recursive: true, force: true });
mkdirSync(join(A, "svg"), { recursive: true });
mkdirSync(join(A, "svg/fill"), { recursive: true });
for (const i of icons) {
  writeFileSync(join(A, "svg", `${i.id}.svg`), svg(i));
  writeFileSync(join(A, "svg/fill", `${i.id}.svg`), svg(i, i.fill, " afroicon-fill"));
}
writeFileSync(join(A, "sprite.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n${icons.map((i) => `  <symbol id="afroicon-${i.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round">${i.body}</symbol>`).join("\n")}\n</svg>\n`);
const meta = icons.map(({ id, fr, en, cat, region, tags, since, variantOf, iso, country, body, fill }) => ({ id, fr, en, cat, region, tags, since, ...(variantOf ? { variantOf } : {}), ...(iso ? { iso, country } : {}), body, fill }));
writeFileSync(join(A, "icons.json"), JSON.stringify(meta, null, 1));
// Pour le site : les versions remplies à part, chargées seulement quand on en a besoin (−17 Ko gzip au démarrage).
const G = join(root, "apps/web/src/generated");
mkdirSync(G, { recursive: true });
writeFileSync(join(G, "afro.json"), JSON.stringify(meta.map(({ fill, ...m }) => m)));
writeFileSync(join(G, "fills.json"), JSON.stringify(Object.fromEntries(meta.filter((i) => i.fill !== i.body).map((i) => [i.id, i.fill]))));
writeFileSync(join(A, "index.js"),
`// afroicons v${version} — généré, ne pas modifier à la main.
export const icons = ${JSON.stringify(Object.fromEntries(meta.map((i) => [i.id, i])))};
export const names = Object.keys(icons);

/** Renvoie le SVG d'une icône sous forme de chaîne. variant : "line" (trait, par défaut) ou "fill" (rempli). */
export function toSvg(name, { size = 24, color = "currentColor", strokeWidth = ${STROKE}, className = "", variant = "line" } = {}) {
  const i = icons[name];
  if (!i) throw new Error(\`afroicons: icône inconnue « \${name} »\`);
  const cls = ("afroicon afroicon-" + name + (variant === "fill" ? " afroicon-fill " : " ") + className).trim();
  return \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${color}" stroke-width="\${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" color="\${color}" class="\${cls}">\${variant === "fill" ? i.fill : i.body}</svg>\`;
}

/** Remplace chaque <i data-afroicon="baobab"></i> de la page par son SVG. */
export function replace({ attr = "data-afroicon", root = globalThis.document } = {}) {
  if (!root) return;
  root.querySelectorAll(\`[\${attr}]\`).forEach((el) => {
    const n = el.getAttribute(attr);
    if (!icons[n]) return;
    const size = el.getAttribute("data-size") || 24;
    const sw = el.getAttribute("data-stroke") || ${STROKE};
    const variant = el.getAttribute("data-variant") === "fill" ? "fill" : "line";
    el.outerHTML = toSvg(n, { size, strokeWidth: sw, variant, className: el.className || "" });
  });
}
export default { icons, names, toSvg, replace };
`);
writeFileSync(join(A, "index.d.ts"),
`export type AfroiconName =\n${icons.map((i) => `  | "${i.id}"`).join("\n")};
export type AfroiconCategory = "nature" | "faune" | "musique" | "symboles" | "cuisine" | "vie" | "architecture" | "drapeaux";
export type AfroiconRegion = "pan" | "ouest" | "centre" | "est" | "nord" | "australe";
export interface AfroiconData { id: AfroiconName; fr: string; en: string; cat: AfroiconCategory; region: AfroiconRegion; tags: string[]; since: string; /** Icône dont celle-ci est une variante (épluchée, coupée, ouverte…). */ variantOf?: AfroiconName; /** Drapeaux : code ISO du pays et son nom. */ iso?: string; country?: { fr: string; en: string }; /** Dessin au trait. */ body: string; /** Version remplie. */ fill: string; }
export const icons: Record<AfroiconName, AfroiconData>;
export const names: AfroiconName[];
export type AfroiconVariant = "line" | "fill";
export interface ToSvgOptions { size?: number | string; color?: string; strokeWidth?: number | string; className?: string; /** "line" (trait, par défaut) ou "fill" (rempli). */ variant?: AfroiconVariant; }
export function toSvg(name: AfroiconName, options?: ToSvgOptions): string;
export function replace(options?: { attr?: string; root?: ParentNode }): void;
declare const _default: { icons: typeof icons; names: typeof names; toSvg: typeof toSvg; replace: typeof replace };
export default _default;
`);

/* ---------- afroicons-react ---------- */
const Rd = join(root, "packages/afroicons-react");
let js = `// afroicons-react v${version} — généré, ne pas modifier à la main.
import { createElement, forwardRef } from "react";

const el = ([t, p, c], k) => createElement(t, { key: k, ...p }, ...(c ? c.map(el) : []));
const make = (name, nodes, fill) => {
  const C = forwardRef(function Afroicon({ size = 24, color = "currentColor", strokeWidth = ${STROKE}, variant = "line", className = "", title, children, ...rest }, ref) {
    const f = variant === "fill";
    return createElement("svg", {
      ref, xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none",
      stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", color,
      className: ("afroicon afroicon-" + name + (f ? " afroicon-fill " : " ") + className).trim(),
      "aria-hidden": title ? undefined : true, role: title ? "img" : undefined, ...rest,
    }, title ? createElement("title", null, title) : null,
      ...(f ? fill : nodes).map(el), children);
  });
  C.displayName = ${"`"}Afroicon(${"$"}{name})${"`"};
  return C;
};
`;
let dts = `import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";
export interface AfroiconProps extends Omit<SVGProps<SVGSVGElement>, "ref"> { size?: number | string; color?: string; strokeWidth?: number | string; title?: string; /** "line" (trait, par défaut) ou "fill" (rempli). */ variant?: "line" | "fill"; }
export type Afroicon = ForwardRefExoticComponent<AfroiconProps & RefAttributes<SVGSVGElement>>;
`;
for (const i of icons) {
  js += `export const ${pascal(i.id)} = make("${i.id}", ${JSON.stringify(toJsxChildren(i.body))}, ${JSON.stringify(toJsxChildren(i.fill))});\n`;
  dts += `/** ${i.fr} · ${i.en} */\nexport declare const ${pascal(i.id)}: Afroicon;\n`;
}
writeFileSync(join(Rd, "index.js"), js);
writeFileSync(join(Rd, "index.d.ts"), dts);
console.log(`✔ ${icons.length} icônes (dont ${icons.filter((i) => i.iso).length} drapeaux) → packages/afroicons, packages/afroicons-react`);

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

const el = ([t, p, c], k) => createElement(t, { key: k, ...p }, ...(c ? c.map(el) : []));
const make = (name, nodes) => {
  const C = forwardRef(function Afroicon({ color = "currentColor", size = 24, strokeWidth = ${STROKE}, absoluteStrokeWidth, className = "", children, ...rest }, ref) {
    return createElement("svg", {
      ref, xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none",
      stroke: color, strokeWidth: absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth,
      strokeLinecap: "round", strokeLinejoin: "round",
      className: ["lucide", "lucide-" + name, "afroicon", className].filter(Boolean).join(" "), ...rest,
    }, ...nodes.map(el), ...(Array.isArray(children) ? children : [children]));
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
const node = (name, body, fill) => `{ name: ${JSON.stringify(name)}, nodes: ${JSON.stringify(tree(parseSvg(body)))}${fill ? `, fill: ${JSON.stringify(tree(parseSvg(fill)))}` : ""} }`;
let ng = `// afroicons-angular v${version} — généré par scripts/build.mjs, ne pas modifier à la main.\nimport type { AfroiconNode } from "./types";\n\n// Icônes culturelles (id Afroicons)\n`;
for (const i of icons) ng += `/** ${i.fr} · ${i.en} */\nexport const ${pascal(i.id)}: AfroiconNode = ${node(i.id, i.body, i.fill)};\n`;
ng += `\n// Icônes d'interface (noms Lucide, comme afroicons-ui)\n`;
for (const i of ui) ng += `/** ${i.fr} · ${i.en} */\nexport const ${i.id}: AfroiconNode = ${node(i.id, i.body)};\n`;
ng += `\n/** Toutes les icônes : provideAfroicons(afroicons). Pratique, mais tout entre dans le bundle. */\nexport const afroicons = { ${[...icons.map((i) => pascal(i.id)), ...ui.map((i) => i.id)].join(", ")} } as const;\n`;
writeFileSync(NG, ng);
console.log(`✔ ${icons.length + ui.length} icônes → packages/afroicons-angular`);
