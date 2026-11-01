// Après `vite build` : une vraie page HTML par icône (afroicons.org/icones/baobab/), une page qui les liste toutes,
// et le plan du site. Chaque page a son titre, sa description et son contenu lisible sans JavaScript ;
// l'application se charge ensuite par-dessus et ouvre la fiche de l'icône.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const web = join(here, "..");
const repo = join(web, "../..");
const dist = join(web, "dist");
const SITE = "https://afroicons.org";
const read = (p) => readFileSync(join(repo, p), "utf8");

const afro = JSON.parse(read("packages/afroicons/icons.json"));
const ui = JSON.parse(read("packages/afroicons-ui/icons.json"));
const COMPAT = JSON.parse(read("src/compat.json"));
// Noms réellement exportés par afroicons-antd (toutes les icônes Ant Design n'ont pas de variante Filled ou TwoTone).
const ANT_NAMES = Object.entries(JSON.parse(read("packages/afroicons-antd/compat.json"))).reduce((m, [n, id]) => ((m[id] ??= []).push(n), m), {});
function equivalents(id) {
  const mui = COMPAT[id]?.mui ?? [], ant = ANT_NAMES[id] ?? [];
  if (!mui.length && !ant.length) return "";
  const code = (l) => l.map((n) => `<code>${n}</code>`).join(", ");
  const parts = [];
  if (mui.length) parts.push(`Material UI (<code>afroicons-mui</code>) : ${code(mui)}, et leurs variantes Outlined, Rounded, Sharp et TwoTone.`);
  if (ant.length) parts.push(`Ant Design (<code>afroicons-antd</code>) : ${code(ant)}.`);
  const who = [mui.length && "à MUI (Material-UI SAS)", ant.length && "au groupe Ant"].filter(Boolean).join(" ni ");
  return `<h2>Équivalents ${[mui.length && "Material UI", ant.length && "Ant Design"].filter(Boolean).join(" et ")}</h2><p>${parts.join(" ")} Projet${mui.length && ant.length ? "s" : ""} indépendant${mui.length && ant.length ? "s" : ""}, non affilié${mui.length && ant.length ? "s" : ""} ${who} : les noms sont cités pour indiquer la compatibilité, les dessins sont originaux.</p>`;
}
const i18n = read("apps/web/src/lib/i18n.ts");
const factsStart = i18n.indexOf("{", i18n.indexOf("export const FACTS"));
let depth = 0, factsEnd = factsStart;
for (; factsEnd < i18n.length; factsEnd++) { if (i18n[factsEnd] === "{") depth++; if (i18n[factsEnd] === "}" && !--depth) break; }
const FACTS = JSON.parse(i18n.slice(factsStart, factsEnd + 1));

const CATS = { nature: "Nature & paysages", faune: "Faune", musique: "Musique & arts", symboles: "Symboles & textiles", cuisine: "Cuisine", vie: "Vie quotidienne", architecture: "Architecture", personnes: "Peuples et tenues", cartes: "Cartes des pays", drapeaux: "Drapeaux", emojis: "Emojis", interface: "Interface" };
const EGROUP = { visages: "visages", mains: "mains", personnes: "personnes", coeurs: "cœurs et symboles", animaux: "animaux", nature: "nature", fruits: "fruits et légumes", nourriture: "nourriture", boissons: "boissons", objets: "objets et cultures", lieux: "villages et lieux" };
const REG = { pan: "toute l'Afrique", ouest: "Afrique de l'Ouest", centre: "Afrique centrale", est: "Afrique de l'Est", nord: "Afrique du Nord", australe: "Afrique australe" };
const pascal = (id) => id.replace(/(^|[-_])(\w)/g, (_, a, b) => b.toUpperCase());
const kebab = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([a-zA-Z])(\d)/g, "$1-$2").toLowerCase();
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

// Mêmes identifiants que sur le site : id Afroicons, ou « ui- » + nom Lucide en kebab-case.
const icons = [
  ...afro.map((i) => ({ ...i, slug: i.id })),
  ...ui.map((u) => ({ slug: "ui-" + kebab(u.id), lucide: u.id, fr: u.fr, en: u.en, cat: "interface", region: null, tags: [u.family], body: u.body, afro: u.afro })),
];
const bySlug = Object.fromEntries(icons.map((i) => [i.slug, i]));
const url = (i) => `${SITE}/icones/${i.slug}/`;
const draw = (i, body, size = 120, idSuffix = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" color="currentColor" role="img" aria-label="${esc(i.fr)}">${idSuffix ? body.replaceAll(`afm-${i.slug}"`, `afm-${i.slug}${idSuffix}"`).replaceAll(`#afm-${i.slug})`, `#afm-${i.slug}${idSuffix})`) : body}</svg>`;

function describe(i) {
  if (i.cat === "emojis") return `Emoji ${i.char ? `${i.char} ` : "africain original "}« ${i.fr} » (${i.en}) en SVG, dessiné dans le style Afroicons${i.tone ? ", dans les 5 teintes de peau Unicode" : ""}. Gratuit pour React, Angular et HTML, licence MIT.`;
  if (i.cat === "cartes") return `${i.fr} (${i.iso}) : le contour du pays en icône SVG, au trait ou remplie, pour React, Angular et HTML. Tracée d'après Natural Earth (domaine public), frontières de l'ONU. Licence MIT.`;
  if (i.cat === "drapeaux") return `${i.fr} (${i.iso}) en SVG, aux couleurs officielles. Icône gratuite pour React, Angular et HTML, lisible dès 16 px. ${REG[i.region][0].toUpperCase() + REG[i.region].slice(1)}. Licence MIT.`;
  if (i.lucide) return `Icône SVG « ${i.fr} » (${i.en}) dans le style Afroicons, compatible Lucide : remplacez l'import de lucide-react par afroicons-ui.${i.afro ? " " + i.afro : ""} Libre et gratuite, licence MIT.`;
  const fact = FACTS[i.id]?.[0];
  return `Icône SVG « ${i.fr} » (${i.en}), ${CATS[i.cat].toLowerCase()}, ${REG[i.region] ?? "Afrique"}. Au trait ou remplie, pour React, Angular et HTML. Libre et gratuite, licence MIT.${fact ? " " + fact : ""}`.slice(0, 300);
}

// Les compteurs de l'accueil (description, partage) sont calculés ici : ils suivent les icônes ajoutées.
const counts = { __TOTAL__: icons.length, __FLAGS__: icons.filter((i) => i.cat === "drapeaux").length, __EMOJIS__: icons.filter((i) => i.cat === "emojis").length };
const template = readFileSync(join(dist, "index.html"), "utf8").replace(/__(TOTAL|FLAGS|EMOJIS)__/g, (m) => counts[m]);
writeFileSync(join(dist, "index.html"), template);
function page({ path, title, desc, canonical, body, app = true }) {
  const depth = path.split("/").filter(Boolean).length;
  const up = "../".repeat(depth);
  let h = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(desc)}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonical}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(desc)}">`)
    .replaceAll('="./', `="${up}`);
  // Contenu lisible sans JavaScript (et par les moteurs de recherche) ; masqué dès que l'application démarre.
  h = h.replace('<div id="root"></div>', `<script>document.documentElement.classList.add("js")</script><style>.js .seo{display:none}.seo{max-width:760px;margin:0 auto;padding:32px 20px;font:16px/1.6 system-ui,sans-serif;color:#1F1A15;background:#FBF5EA}.seo a{color:#C24E2A}.seo svg{color:#1F1A15}.seo pre{background:#1F1A15;color:#FBF5EA;padding:14px;border-radius:10px;overflow:auto}.seo ul.g{display:flex;flex-wrap:wrap;gap:6px 14px;padding:0;list-style:none}</style><div id="root"><main class="seo">${body}</main></div>`);
  // Page purement statique (la liste) : sans l'application, qui afficherait l'accueil par-dessus.
  if (!app) h = h.replace(/<script type="module"[^>]*><\/script>/g, "").replace(/<link rel="modulepreload"[^>]*>/g, "").replace('<script>document.documentElement.classList.add("js")</script>', "");
  mkdirSync(join(dist, path), { recursive: true });
  writeFileSync(join(dist, path, "index.html"), h);
}

const nav = `<nav><a href="/">Afroicons</a> › <a href="/icones/">Toutes les icônes</a> · <a href="/playground/">Bac à sable</a></nav>`;
for (const i of icons) {
  const base = i.variantOf ? bySlug[i.variantOf] : i;
  const variants = icons.filter((x) => x.slug === base.slug || x.variantOf === base.slug).filter((x) => x.slug !== i.slug);
  // Les voisins dans la famille (à partir de la position de l'icône, en boucle) : chaque fiche mène à d'autres fiches.
  const fam = icons.filter((x) => x.cat === i.cat && (i.cat !== "emojis" || x.group === i.group));
  const at = fam.findIndex((x) => x.slug === i.slug);
  const similar = [...fam.slice(at + 1), ...fam.slice(0, at)].filter((x) => !variants.includes(x)).slice(0, 12);
  // Icône ↔ emoji, drapeau ↔ carte.
  const twins = [[i.emoji, "Voir l'emoji"], [i.icon, "Voir l'icône au trait"], [i.map, "Voir la carte du pays"], [i.flag, "Voir le drapeau"]].filter(([id]) => id && bySlug[id]);
  const fact = FACTS[i.id];
  const code = i.lucide
    ? `npm install afroicons-ui lucide-react\n\nimport { ${i.lucide} } from "afroicons-ui";\n\n<${i.lucide} size={24} />`
    : `npm install afroicons-react\n\nimport { ${pascal(i.id)} } from "afroicons-react";\n\n<${pascal(i.id)} size={24} />${i.cat === "drapeaux" || i.cat === "emojis" ? "" : `\n<${pascal(i.id)} variant="fill" />`}${i.tone ? `\n<${pascal(i.id)} tone="light" />  // light, medium-light, medium, medium-dark (par défaut), dark` : ""}`;
  const links = (list) => `<ul class="g">${list.map((x) => `<li><a href="/icones/${x.slug}/">${esc(x.fr)}</a></li>`).join("")}</ul>`;
  page({
    path: `icones/${i.slug}`,
    title: i.cat === "emojis" ? `${i.char ? i.char + " " : ""}${i.fr} — emoji SVG gratuit | Afroicons` : i.cat === "drapeaux" ? `${i.fr} — SVG gratuit, couleurs officielles | Afroicons` : `${i.fr} — icône SVG gratuite${i.lucide ? " compatible Lucide" : ""} | Afroicons`,
    desc: describe(i),
    canonical: url(i),
    body: `${nav}
<h1>${esc(i.fr)}</h1>
<p>${esc(i.en)} · ${esc(CATS[i.cat])}${i.cat === "emojis" ? ` · ${EGROUP[i.group]}${i.char ? ` · ${i.char} (${[...i.char].filter((c) => c !== "\uFE0F").map((c) => "U+" + c.codePointAt(0).toString(16).toUpperCase()).join(" ")})` : " · emoji africain original"}` : i.region ? " · " + esc(REG[i.region]) : ""}${i.lucide ? ` · nom Lucide : <code>${esc(i.lucide)}</code>` : ""}</p>
<p>${draw(i, i.body)} ${i.fill && i.fill !== i.body ? draw(i, i.fill, 120, "-p") : ""}</p>
${i.afro ? `<p>${esc(i.afro)}</p>` : ""}
${fact ? `<h2>Le saviez-vous ?</h2><p>${esc(fact[0])}</p><p lang="en">${esc(fact[1])}</p>` : ""}
<p>Mots-clés : ${i.tags.map((t) => esc(t)).join(", ")}</p>
${i.lucide ? equivalents(i.lucide) : ""}
<h2>Utiliser cette icône</h2><pre><code>${esc(code)}</code></pre>
<p>Angular :</p><pre><code>${esc(`npm install afroicons-angular\n\nimport { AfroiconComponent, provideAfroicons, ${i.lucide ?? pascal(i.id)} } from "afroicons-angular";\n\nproviders: [provideAfroicons({ ${i.lucide ?? pascal(i.id)} })]\n\n<afroicon name="${i.lucide ?? i.slug}"${i.tone ? ' tone="light"' : ""} />`)}</code></pre>
<p>Icône libre et gratuite, licence MIT, utilisation commerciale comprise. <a href="/#${i.slug}">Personnaliser et télécharger sur afroicons.org</a></p>
${twins.length ? `<p>${twins.map(([id, t]) => `<a href="/icones/${bySlug[id].slug}/">${t} : ${esc(bySlug[id].fr)}</a>`).join(" · ")}</p>` : ""}
${variants.length ? `<h2>Variantes</h2>${links(variants)}` : ""}
<h2>Dans la même famille</h2>${links(similar)}`,
  });
}

// Page qui liste toutes les icônes, par catégorie : le chemin d'accès des moteurs de recherche vers chaque fiche.
const groups = Object.keys(CATS).map((c) => [c, icons.filter((i) => i.cat === c)]).filter(([, l]) => l.length);
page({
  path: "icones",
  title: `Toutes les icônes Afroicons — ${icons.length} icônes SVG gratuites`,
  desc: `Les ${icons.length} icônes Afroicons, par catégorie : nature, faune, musique, symboles adinkra, cuisine, vie quotidienne, architecture, interface, drapeaux, cartes des pays et emojis africains. SVG libres, licence MIT.`,
  canonical: `${SITE}/icones/`,
  app: false,
  body: `<nav><a href="/">Afroicons</a></nav><h1>Toutes les icônes (${icons.length})</h1>${groups.map(([c, l]) => `<h2>${esc(CATS[c])} (${l.length})</h2><ul class="g">${l.map((i) => `<li><a href="/icones/${i.slug}/">${esc(i.fr)}</a></li>`).join("")}</ul>`).join("")}`,
});

// Page « Nouveautés » : le journal des versions (CHANGELOG.md), lisible sans JavaScript ; l'application l'affiche ensuite dans le site.
const inline = (t) => esc(t).replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
function markdown(md) {
  let html = "", list = false;
  for (const line of md.split("\n")) {
    const li = line.match(/^\s*- (.*)/);
    if (li) { if (!list) { html += "<ul>"; list = true; } html += `<li>${inline(li[1])}</li>`; continue; }
    if (list) { html += "</ul>"; list = false; }
    const h = line.match(/^(#{1,3}) (.*)/);
    if (h) html += h[1].length === 1 ? "" : `<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`;
    else if (line.trim()) html += `<p>${inline(line)}</p>`;
  }
  return html + (list ? "</ul>" : "");
}
page({
  path: "nouveautes",
  title: "Nouveautés — journal des versions | Afroicons",
  desc: "Toutes les versions d'Afroicons : nouvelles icônes, style rempli, variantes, paquets React, Angular et compatibles Lucide, corrections.",
  canonical: `${SITE}/nouveautes/`,
  body: `<nav><a href="/">Afroicons</a> › <a href="/icones/">Toutes les icônes</a></nav><h1>Nouveautés</h1>${markdown(read("CHANGELOG.md"))}`,
});

// Page « Bac à sable » : l'application l'affiche ; le contenu statique la décrit pour les moteurs de recherche.
page({
  path: "playground",
  title: "Bac à sable — essayez les icônes dans votre interface | Afroicons",
  desc: "Testez les icônes Afroicons dans une application web, une application mobile et une page vitrine : couleur, taille, épaisseur du trait, mode sombre. Puis copiez le code React, Angular ou HTML.",
  canonical: `${SITE}/playground/`,
  body: `<nav><a href="/">Afroicons</a> › <a href="/icones/">Toutes les icônes</a></nav><h1>Bac à sable</h1><p>Essayez les icônes Afroicons dans des interfaces réalistes (application web, application mobile, page vitrine), réglez couleur, taille, épaisseur et mode sombre comme sur votre site, remplacez chaque icône en un clic, puis copiez le code React, Angular ou HTML des icônes utilisées.</p>`,
});

const today = new Date().toISOString().slice(0, 10);
const entry = (loc, prio) => `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><priority>${prio}</priority></url>`;
writeFileSync(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[entry(`${SITE}/`, "1.0"), entry(`${SITE}/icones/`, "0.8"), entry(`${SITE}/nouveautes/`, "0.5"), entry(`${SITE}/playground/`, "0.6"), ...icons.map((i) => entry(url(i), "0.6"))].join("\n")}\n</urlset>\n`);
console.log(`✔ ${icons.length} pages d'icônes, la liste, les nouveautés et le plan du site (${icons.length + 4} adresses)`);
