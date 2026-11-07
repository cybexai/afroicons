// Génère les paquets à partir de src/icons.json et src/flags.json (sources uniques de vérité).
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
// Icônes culturelles, puis drapeaux (générés par scripts/flags.mjs ; en couleur, leur version remplie est la même).
// Icônes culturelles, drapeaux (scripts/flags.mjs) et emojis (scripts/emojis.mjs). Drapeaux et emojis sont en couleur :
// leur version remplie est la même. Les emojis à teinte de peau (tone) existent dans les 5 teintes Unicode.
const readJson = (f) => { try { return JSON.parse(readFileSync(join(root, f), "utf8")); } catch { return []; } };
// Cartes des pays (scripts/cartes.mjs, d'après Natural Earth) : icônes au trait, reliées au drapeau du pays.
// Monnaies (src/monnaies.json) : une pièce avec le symbole de chaque monnaie africaine, reliée aux pays qui l'utilisent ;
// le même dessin sert d'icône d'interface dans afroicons-ui (nom façon Lucide : Naira, Cedi, CfaFrancBeac…).
const monnaies = readJson("src/monnaies.json").map(({ ui, symbol, ...m }) => ({ ...m, cat: "monnaies", since: m.since ?? "0.9" }));
const icons = [...JSON.parse(readFileSync(join(root, "src/icons.json"), "utf8")), ...readJson("src/cartes.json"), ...monnaies, ...JSON.parse(readFileSync(join(root, "src/flags.json"), "utf8")), ...readJson("src/emojis.json")];
const { TONES, DEFAULT_TONE } = await import("./emojis/lib.mjs");
const [SK0, SK1, SK2] = TONES[DEFAULT_TONE];
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
// Lien icône ↔ emoji : une icône culturelle peut porter « emoji » (son équivalent en couleur) ; l'emoji reçoit « icon ».
const iconOf = Object.fromEntries(icons.filter((i) => i.emoji).map((i) => [i.emoji, i.id]));
const mapOf = Object.fromEntries(icons.filter((i) => i.flag).map((i) => [i.flag, i.id]));
const meta = icons.map(({ id, fr, en, cat, region, tags, since, variantOf, iso, country, flag, char, group, tone, emoji, code, countries, body, fill }) => ({ id, fr, en, cat, region, tags, since, ...(variantOf ? { variantOf } : {}), ...(iso ? { iso } : {}), ...(country ? { country } : {}), ...(code ? { code, countries } : {}), ...(flag ? { flag } : {}), ...(mapOf[id] ? { map: mapOf[id] } : {}), ...(cat === "emojis" ? { char, group, tone, ...(iconOf[id] ? { icon: iconOf[id] } : {}) } : {}), ...(emoji ? { emoji } : {}), body, fill }));
writeFileSync(join(A, "icons.json"), JSON.stringify(meta, null, 1));
// Pour le site : les versions remplies à part, chargées seulement quand on en a besoin (−17 Ko gzip au démarrage).
const G = join(root, "apps/web/src/generated");
mkdirSync(G, { recursive: true });
// Les dessins des emojis aussi (≈ 1 Mo) : la page s'affiche sans eux, ils arrivent juste après.
writeFileSync(join(G, "afro.json"), JSON.stringify(meta.map(({ fill, ...m }) => (m.cat === "emojis" ? { ...m, body: "" } : m))));
writeFileSync(join(G, "emoji-bodies.json"), JSON.stringify(Object.fromEntries(meta.filter((i) => i.cat === "emojis").map((i) => [i.id, i.body]))));
writeFileSync(join(G, "tones.json"), JSON.stringify({ tones: TONES, def: DEFAULT_TONE }));
writeFileSync(join(G, "fills.json"), JSON.stringify(Object.fromEntries(meta.filter((i) => i.fill !== i.body).map((i) => [i.id, i.fill]))));
writeFileSync(join(A, "index.js"),
`// afroicons v${version} — généré, ne pas modifier à la main.
export const icons = ${JSON.stringify(Object.fromEntries(meta.map((i) => [i.id, i.fill === i.body ? (({ fill, ...r }) => r)(i) : i])))};
for (const k in icons) icons[k].fill ??= icons[k].body; // drapeaux et emojis : version remplie identique
export const names = Object.keys(icons);
/** Teintes de peau Unicode des emojis (option tone) : [peau, ombre]. */
export const tones = ${JSON.stringify(TONES)};
export const defaultTone = "${DEFAULT_TONE}";
const skin = (s, tone) => { const t = tone && tone !== defaultTone && tones[tone]; return t ? s.replaceAll("${SK0}", t[0]).replaceAll("${SK1}", t[1]).replaceAll("${SK2}", t[2]) : s; };

/** Renvoie le SVG d'une icône sous forme de chaîne. variant : "line" (trait, par défaut) ou "fill" (rempli) ; tone : teinte de peau d'un emoji. */
export function toSvg(name, { size = 24, color = "currentColor", strokeWidth = ${STROKE}, className = "", variant = "line", tone } = {}) {
  const i = icons[name];
  if (!i) throw new Error(\`afroicons: icône inconnue « \${name} »\`);
  const cls = ("afroicon afroicon-" + name + (variant === "fill" ? " afroicon-fill " : " ") + className).trim();
  return \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${color}" stroke-width="\${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" color="\${color}" class="\${cls}">\${skin(variant === "fill" ? i.fill : i.body, i.tone && tone)}</svg>\`;
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
    el.outerHTML = toSvg(n, { size, strokeWidth: sw, variant, tone: el.getAttribute("data-tone") || undefined, className: el.className || "" });
  });
}
export default { icons, names, tones, defaultTone, toSvg, replace };
`);
writeFileSync(join(A, "index.d.ts"),
`export type AfroiconName =\n${icons.map((i) => `  | "${i.id}"`).join("\n")};
export type AfroiconCategory = "nature" | "faune" | "musique" | "symboles" | "cuisine" | "vie" | "architecture" | "personnes" | "cartes" | "monnaies" | "drapeaux" | "emojis";
/** Teinte de peau Unicode d'un emoji (🏻 à 🏿). Par défaut : "medium-dark". */
export type AfroiconTone = "light" | "medium-light" | "medium" | "medium-dark" | "dark";
export type AfroiconEmojiGroup = "visages" | "mains" | "personnes" | "coeurs" | "animaux" | "nature" | "fruits" | "nourriture" | "boissons" | "objets" | "lieux";
export type AfroiconRegion = "pan" | "ouest" | "centre" | "est" | "nord" | "australe";
export interface AfroiconData { id: AfroiconName; fr: string; en: string; cat: AfroiconCategory; region: AfroiconRegion; tags: string[]; since: string; /** Icône dont celle-ci est une variante (épluchée, coupée, ouverte…). */ variantOf?: AfroiconName; /** Drapeaux et cartes : code ISO du pays et son nom. */ iso?: string; country?: { fr: string; en: string }; /** Emojis : caractère Unicode équivalent (null pour un emoji africain original), groupe, et teinte de peau réglable. */ char?: string | null; group?: AfroiconEmojiGroup; tone?: boolean; /** Icône au trait équivalente (pour un emoji) ou emoji équivalent (pour une icône). */ icon?: AfroiconName; emoji?: AfroiconName; /** Carte d'un pays (ou icône « afrique ») : son drapeau ; drapeau : la carte du pays (ou du continent). */ flag?: AfroiconName; map?: AfroiconName; /** Monnaies : code ISO 4217 et pays (ISO 3166) qui l'utilisent. */ code?: string; countries?: string[]; /** Dessin au trait. */ body: string; /** Version remplie. */ fill: string; }
export const icons: Record<AfroiconName, AfroiconData>;
export const names: AfroiconName[];
export type AfroiconVariant = "line" | "fill";
export interface ToSvgOptions { size?: number | string; color?: string; strokeWidth?: number | string; className?: string; /** "line" (trait, par défaut) ou "fill" (rempli). */ variant?: AfroiconVariant; /** Emojis : teinte de peau. */ tone?: AfroiconTone; }
export function toSvg(name: AfroiconName, options?: ToSvgOptions): string;
export function replace(options?: { attr?: string; root?: ParentNode }): void;
/** [peau, ombre, traits de détail] de chaque teinte. */
export const tones: Record<AfroiconTone, [string, string, string]>;
export const defaultTone: AfroiconTone;
declare const _default: { icons: typeof icons; names: typeof names; tones: typeof tones; defaultTone: typeof defaultTone; toSvg: typeof toSvg; replace: typeof replace };
export default _default;
`);

/* ---------- afroicons-react ---------- */
const Rd = join(root, "packages/afroicons-react");
let js = `// afroicons-react v${version} — généré, ne pas modifier à la main.
import { createElement, forwardRef } from "react";

const el = ([t, p, c], k) => createElement(t, { key: k, ...p }, ...(c ? c.map(el) : []));
// Teintes de peau des emojis : [peau, ombre] ; le dessin utilise la teinte par défaut, remplacée à la volée.
const TONES = ${JSON.stringify(TONES)};
const recolor = (nodes, t) => nodes.map(([tag, p, c]) => [tag, Object.fromEntries(Object.entries(p).map(([k, v]) => [k, v === "${SK0}" ? t[0] : v === "${SK1}" ? t[1] : v === "${SK2}" ? t[2] : v])), c && recolor(c, t)]);
const make = (name, nodes, fill, toned) => {
  const C = forwardRef(function Afroicon({ size = 24, color = "currentColor", strokeWidth = ${STROKE}, variant = "line", tone, className = "", title, children, ...rest }, ref) {
    const fv = variant === "fill", f = fv && fill;
    const t = toned && tone && tone !== "${DEFAULT_TONE}" && TONES[tone];
    return createElement("svg", {
      ref, xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none",
      stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", color,
      className: ("afroicon afroicon-" + name + (fv ? " afroicon-fill " : " ") + className).trim(),
      "aria-hidden": title ? undefined : true, role: title ? "img" : undefined, ...rest,
    }, title ? createElement("title", null, title) : null,
      ...(t ? recolor(f ? fill : nodes, t) : f ? fill : nodes).map(el), children);
  });
  C.displayName = ${"`"}Afroicon(${"$"}{name})${"`"};
  return C;
};
`;
let dts = `import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";
export interface AfroiconProps extends Omit<SVGProps<SVGSVGElement>, "ref"> { size?: number | string; color?: string; strokeWidth?: number | string; title?: string; /** "line" (trait, par défaut) ou "fill" (rempli). */ variant?: "line" | "fill"; /** Emojis : teinte de peau Unicode (par défaut "medium-dark"). */ tone?: "light" | "medium-light" | "medium" | "medium-dark" | "dark"; }
export type Afroicon = ForwardRefExoticComponent<AfroiconProps & RefAttributes<SVGSVGElement>>;
`;
// /*#__PURE__*/ : sans lui, les bundlers gardent toutes les icônes même si on n'en importe qu'une ("sideEffects": false ne suffit pas).
for (const i of icons) {
  // Drapeaux et emojis : pas de version remplie distincte (null : le dessin lui-même).
  js += `export const ${pascal(i.id)} = /*#__PURE__*/ make("${i.id}", ${JSON.stringify(toJsxChildren(i.body))}, ${i.fill === i.body ? "null" : JSON.stringify(toJsxChildren(i.fill))}${i.tone ? ", 1" : ""});\n`;
  dts += `/** ${i.fr} · ${i.en} */\nexport declare const ${pascal(i.id)}: Afroicon;\n`;
}
writeFileSync(join(Rd, "index.js"), js);
writeFileSync(join(Rd, "index.d.ts"), dts);
console.log(`✔ ${icons.length} icônes (dont ${icons.filter((i) => i.cat === "drapeaux").length} drapeaux, ${icons.filter((i) => i.cat === "cartes").length} cartes) → packages/afroicons, packages/afroicons-react`);

/* ---------- afroicons-ui (icônes d'interface, compatibles lucide-react) ---------- */
// Mêmes noms et mêmes props que lucide-react : on remplace l'import, rien d'autre.
// Les icônes pas encore dessinées sont reprises de lucide-react (export *).
// Icônes d'interface : celles qui remplacent une icône Lucide, puis des icônes en plus, sans équivalent Lucide
// (« extra », comme les monnaies africaines) : même composant, mêmes props.
const ui = [...JSON.parse(readFileSync(join(root, "src/ui-icons.json"), "utf8")),
  ...readJson("src/monnaies.json").map((m) => ({ id: m.ui, fr: m.fr, en: m.en, family: "Monnaies", afro: null, extra: true, body: m.body }))];
const U = join(root, "packages/afroicons-ui");
const kebab = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([a-zA-Z])(\d)/g, "$1-$2").toLowerCase();
rmSync(join(U, "svg"), { recursive: true, force: true });
mkdirSync(join(U, "svg"), { recursive: true });
for (const i of ui) writeFileSync(join(U, "svg", `${i.id}.svg`),
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round" class="afroicon afroicon-ui-${kebab(i.id)}">${i.body}</svg>\n`);
writeFileSync(join(U, "icons.json"), JSON.stringify(ui.map(({ id, fr, en, family, afro, extra, body }) => ({ id, fr, en, family, afro, ...(extra ? { extra } : {}), body })), null, 1));
// Pour le site : les dessins d'interface à part (≈ 120 Ko gzip), chargés juste après le premier affichage, comme les emojis.
writeFileSync(join(G, "ui.json"), JSON.stringify(ui.map(({ id, fr, en, family, afro, extra }) => ({ id, fr, en, family, afro, ...(extra ? { extra } : {}) }))));
writeFileSync(join(G, "ui-bodies.json"), JSON.stringify(Object.fromEntries(ui.map((i) => [i.id, i.body]))));
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
// Lucide donne plusieurs noms au même dessin (CircleAlert = AlertCircle, House = Home, CircleX = XCircle…) :
// ces autres noms sont redessinés aussi, sinon `export *` les sert encore en Lucide.
const L = await import("lucide-react");
const drawnIds = new Set(ui.map((i) => i.id));
const lucideAliases = (id) => !L[id] ? [] : [...new Set(Object.keys(L).filter((k) => L[k] === L[id])
  .map((k) => k.replace(/^Lucide/, "").replace(/Icon$/, "")))].filter((k) => k && k !== id && !drawnIds.has(k) && L[k] === L[id]);
let nbAlias = 0;
for (const i of ui) {
  const names = [i.id, ...(i.extra ? [] : lucideAliases(i.id))];
  nbAlias += names.length - 1;
  ujs += `export const ${i.id} = /*#__PURE__*/ make("${kebab(i.id)}", ${JSON.stringify(toJsxChildren(i.body))});\nexport { ${names.flatMap((n) => [n === i.id ? null : `${i.id} as ${n}`, `${i.id} as ${n}Icon`, `${i.id} as Lucide${n}`]).filter(Boolean).join(", ")} };\n`;
  udts += `/** ${i.fr} · ${i.en}${i.afro ? ` — ${i.afro}` : ""} */\n` + names.map((n) => `export declare const ${n}: LucideIcon;\nexport declare const ${n}Icon: LucideIcon;\nexport declare const Lucide${n}: LucideIcon;\n`).join("");
}
ujs += `export const afroiconNames = ${JSON.stringify(ui.map((i) => i.id))};\n`;
writeFileSync(join(U, "index.js"), ujs);
writeFileSync(join(U, "index.d.ts"), udts);
console.log(`✔ ${ui.length} icônes d'interface (+ ${nbAlias} noms Lucide équivalents) → packages/afroicons-ui`);

/* ---------- afroicons-angular : données des icônes (le composant est écrit à la main) ---------- */
// Une constante exportée par icône, pour que le bundle ne garde que celles qui sont importées.
const NG = join(root, "packages/afroicons-angular/src/icons.ts");
const node = (name, body, fill, tone) => `{ name: ${JSON.stringify(name)}, nodes: ${JSON.stringify(tree(parseSvg(body)))}${fill && fill !== body ? `, fill: ${JSON.stringify(tree(parseSvg(fill)))}` : ""}${tone ? ", tone: true" : ""} }`;
let ng = `// afroicons-angular v${version} — généré par scripts/build.mjs, ne pas modifier à la main.\nimport type { AfroiconNode } from "./types";\n\n// Icônes culturelles (id Afroicons)\n`;
for (const i of icons) ng += `/** ${i.fr} · ${i.en} */\nexport const ${pascal(i.id)}: AfroiconNode = ${node(i.id, i.body, i.fill, i.tone)};\n`;
ng += `\n// Icônes d'interface (noms Lucide, comme afroicons-ui)\n`;
// Un nom d'interface déjà pris par une icône culturelle (Radio = le poste radio) est exporté et déclaré
// avec le suffixe Icon (RadioIcon, name="radio-icon") : sinon les deux se disputeraient la même clé.
const culturels = new Set(icons.map((i) => pascal(i.id)));
const ngUi = (i) => (culturels.has(i.id) ? `${i.id}Icon` : i.id);
for (const i of ui) ng += `/** ${i.fr} · ${i.en} */\nexport const ${ngUi(i)}: AfroiconNode = ${node(ngUi(i), i.body)};\n`;
ng += `\n/** Toutes les icônes : provideAfroicons(afroicons). Pratique, mais tout entre dans le bundle. */\nexport const afroicons = { ${[...icons.map((i) => pascal(i.id)), ...ui.map(ngUi)].join(", ")} } as const;\n`;
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

// Illustrations (scènes du site) : src/illustrations.json, à partir de scripts/illustrations/*.mjs.
await import("./illustrations.mjs");
