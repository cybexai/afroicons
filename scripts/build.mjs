// Génère les paquets à partir de src/icons.json et src/flags.json (sources uniques de vérité).
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from "node:fs";
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
// /*#__PURE__*/ : sans lui, les bundlers gardent les 216 icônes même si on n'en importe qu'une ("sideEffects": false ne suffit pas).
for (const i of icons) {
  js += `export const ${pascal(i.id)} = /*#__PURE__*/ make("${i.id}", ${JSON.stringify(toJsxChildren(i.body))}, ${JSON.stringify(toJsxChildren(i.fill))});\n`;
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

/* ---------- afroicons-mui et afroicons-antd : remplaçants de @mui/icons-material et @ant-design/icons ---------- */
// Les icônes d'interface sous leurs noms Material UI et Ant Design (src/compat.json : noms de base ; toutes les
// variantes existantes sont ajoutées). On remplace l'import, rien d'autre ; les icônes pas encore redessinées
// viennent du paquet d'origine.
const compat = JSON.parse(readFileSync(join(root, "src/compat.json"), "utf8"));
const uiById = Object.fromEntries(ui.map((i) => [i.id, i]));
const pkgNames = (dir, re) => { try { return new Set(readdirSync(join(root, "node_modules", dir)).filter((f) => re.test(f)).map((f) => f.replace(/\.js$/, ""))); } catch { return null; } };
// Noms existants dans les paquets d'origine, installés comme dépendances de développement (npm ci).
const MUI_ALL = pkgNames("@mui/icons-material/esm", /^[A-Z]\w*\.js$/), ANT_ALL = pkgNames("@ant-design/icons/es/icons", /^[A-Z]\w*\.js$/);
if (!MUI_ALL || !ANT_ALL) throw new Error("@mui/icons-material et @ant-design/icons sont nécessaires au build (dépendances de développement) : lancez npm ci.");
function aliases(kind) {
  const out = [], seen = new Set();
  for (const [id, v] of Object.entries(compat)) for (const b of v[kind]) {
    const cands = kind === "mui" ? [b, b + "Outlined", b + "Rounded", b + "Sharp", b + "TwoTone"] : [b + "Outlined", b + "Filled", b + "TwoTone"];
    const all = kind === "mui" ? MUI_ALL : ANT_ALL;
    for (const n of cands) if (all.has(n) && !seen.has(n)) { seen.add(n); out.push([n, id]); }
  }
  return out;
}
const used = (list) => [...new Set(list.map(([, id]) => id))];
function compatPackage(dir, kind, head, makeSrc, dts) {
  const P = join(root, "packages", dir), list = aliases(kind);
  if (!list.length) throw new Error(`${dir} : aucun nom (paquet d'origine absent ?)`);
  rmSync(join(P, "icons"), { recursive: true, force: true });
  mkdirSync(join(P, "icons"), { recursive: true });
  // "use client" : ces icônes sont des composants client, comme celles des paquets d'origine (Next.js App Router).
  let afro = `"use client";\n// ${dir} v${version} — généré, ne pas modifier à la main.\n${head}\n`;
  for (const id of used(list)) afro += `const n${id} = ${JSON.stringify(toJsxChildren(uiById[id].body))};\n`;
  for (const [n, id] of list) {
    afro += `export const ${n} = /*#__PURE__*/ ${makeSrc(n, id)};\n`;
    writeFileSync(join(P, "icons", `${n}.js`), `export { ${n} as default } from "../afro.js";\n`);
    writeFileSync(join(P, "icons", `${n}.d.ts`), `export { ${n} as default } from "../index.js";\n`);
  }
  writeFileSync(join(P, "afro.js"), afro);
  const from = kind === "mui" ? "@mui/icons-material" : "@ant-design/icons";
  writeFileSync(join(P, "index.js"), `// ${dir} v${version} — généré, ne pas modifier à la main.\nexport * from "${from}";\nexport { ${list.map(([n]) => n).join(", ")} } from "./afro.js";\n` +
    (kind === "antd" ? `export { default } from "${from}";\n` : "") + `/** Noms redessinés par Afroicons (les autres viennent de ${from}). */\nexport const afroiconNames = ${JSON.stringify(list.map(([n]) => n))};\n`);
  writeFileSync(join(P, "index.d.ts"), `// ${dir} v${version} — généré, ne pas modifier à la main.\nexport * from "${from}";\n${kind === "antd" ? `export { default } from "${from}";\n` : ""}${dts}\n/** Noms redessinés par Afroicons (les autres viennent de ${from}). */\nexport declare const afroiconNames: readonly string[];\n` +
    list.map(([n, id]) => `/** ${uiById[id].fr} · ${uiById[id].en} (Afroicons ${id}) */\nexport declare const ${n}: AfroIcon;\n`).join(""));
  writeFileSync(join(P, "compat.json"), JSON.stringify(Object.fromEntries(list), null, 1) + "\n");
  console.log(`✔ ${list.length} noms ${kind === "mui" ? "Material UI" : "Ant Design"} (${used(list).length} icônes) → packages/${dir}`);
}
const svgG = `{ fill: "none", stroke: "currentColor", strokeWidth: ${STROKE}, strokeLinecap: "round", strokeLinejoin: "round" }`;
compatPackage("afroicons-mui", "mui",
  `import { createElement as h } from "react";\nimport { createSvgIcon } from "@mui/material";\nconst el = ([t, p, c], k) => h(t, { key: k, ...p }, ...(c ? c.map(el) : []));\n// Le trait Afroicons dans un SvgIcon Material UI : mêmes props (fontSize, color, htmlColor, sx, titleAccess…).\nconst make = (nodes, name) => createSvgIcon(h("g", ${svgG}, ...nodes.map(el)), name);`,
  (n, id) => `make(n${id}, ${JSON.stringify(n)})`,
  `import type { SvgIconComponent } from "@mui/icons-material";\ntype AfroIcon = SvgIconComponent;`);
compatPackage("afroicons-antd", "antd",
  `import { createElement as h, forwardRef } from "react";\nimport AntIcon from "@ant-design/icons";\n// Bundlers : le composant ; Node (module CommonJS) : l'objet du module, qui le porte en default.\nconst Icon = AntIcon && AntIcon.$$typeof ? AntIcon : AntIcon.default;\nconst el = ([t, p, c], k) => h(t, { key: k, ...p }, ...(c ? c.map(el) : []));\nconst kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();\n// Le trait Afroicons dans une icône Ant Design : mêmes props (className, style, spin, rotate, onClick…), classe anticon.\nconst make = (nodes, name) => {\n  const label = kebab(name.replace(/(Outlined|Filled|TwoTone)$/, ""));\n  const Svg = ({ className, ...p }) => h("svg", { ...p, className: className || undefined, viewBox: "0 0 24 24", "data-icon": label, ...${svgG} }, ...nodes.map(el));\n  // spin sur le seul <span>, comme les icônes d'origine (Icon le mettrait aussi sur le <svg> : rotation doublée) ; « loading » tourne d'office.\n  const C = forwardRef(function AfroIcon({ twoToneColor, className, spin = label === "loading", ...props }, ref) {\n    return h(Icon, { ref, role: "img", "aria-label": label, ...props, className: ["anticon-" + label, spin && "anticon-spin", className].filter(Boolean).join(" "), component: Svg });\n  });\n  C.displayName = name;\n  return C;\n};`,
  (n, id) => `make(n${id}, ${JSON.stringify(n)})`,
  `import type { ForwardRefExoticComponent, RefAttributes } from "react";\nimport type { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon.js";\ntype AfroIcon = ForwardRefExoticComponent<Omit<AntdIconProps, "ref"> & RefAttributes<HTMLSpanElement>>;`);
