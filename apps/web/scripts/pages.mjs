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
const i18n = read("apps/web/src/lib/i18n.ts");
const factsStart = i18n.indexOf("{", i18n.indexOf("export const FACTS"));
let depth = 0, factsEnd = factsStart;
for (; factsEnd < i18n.length; factsEnd++) { if (i18n[factsEnd] === "{") depth++; if (i18n[factsEnd] === "}" && !--depth) break; }
const FACTS = JSON.parse(i18n.slice(factsStart, factsEnd + 1));

const CATS = { nature: "Nature & paysages", faune: "Faune", musique: "Musique & arts", symboles: "Symboles & textiles", cuisine: "Cuisine", vie: "Vie quotidienne", architecture: "Architecture", interface: "Interface" };
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
  if (i.lucide) return `Icône SVG « ${i.fr} » (${i.en}) dans le style Afroicons, compatible Lucide : remplacez l'import de lucide-react par afroicons-ui.${i.afro ? " " + i.afro : ""} Libre et gratuite, licence MIT.`;
  const fact = FACTS[i.id]?.[0];
  return `Icône SVG « ${i.fr} » (${i.en}), ${CATS[i.cat].toLowerCase()}, ${REG[i.region] ?? "Afrique"}. Au trait ou remplie, pour React, Angular et HTML. Libre et gratuite, licence MIT.${fact ? " " + fact : ""}`.slice(0, 300);
}

const template = readFileSync(join(dist, "index.html"), "utf8");
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

const nav = `<nav><a href="/">Afroicons</a> › <a href="/icones/">Toutes les icônes</a></nav>`;
for (const i of icons) {
  const base = i.variantOf ? bySlug[i.variantOf] : i;
  const variants = icons.filter((x) => x.slug === base.slug || x.variantOf === base.slug).filter((x) => x.slug !== i.slug);
  const similar = icons.filter((x) => x.cat === i.cat && x.slug !== i.slug && !variants.includes(x)).slice(0, 12);
  const fact = FACTS[i.id];
  const code = i.lucide
    ? `npm install afroicons-ui lucide-react\n\nimport { ${i.lucide} } from "afroicons-ui";\n\n<${i.lucide} size={24} />`
    : `npm install afroicons-react\n\nimport { ${pascal(i.id)} } from "afroicons-react";\n\n<${pascal(i.id)} size={24} />\n<${pascal(i.id)} variant="fill" />`;
  const links = (list) => `<ul class="g">${list.map((x) => `<li><a href="/icones/${x.slug}/">${esc(x.fr)}</a></li>`).join("")}</ul>`;
  page({
    path: `icones/${i.slug}`,
    title: `${i.fr} — icône SVG gratuite${i.lucide ? " compatible Lucide" : ""} | Afroicons`,
    desc: describe(i),
    canonical: url(i),
    body: `${nav}
<h1>${esc(i.fr)}</h1>
<p>${esc(i.en)} · ${esc(CATS[i.cat])}${i.region ? " · " + esc(REG[i.region]) : ""}${i.lucide ? ` · nom Lucide : <code>${esc(i.lucide)}</code>` : ""}</p>
<p>${draw(i, i.body)} ${i.fill ? draw(i, i.fill, 120, "-p") : ""}</p>
${i.afro ? `<p>${esc(i.afro)}</p>` : ""}
${fact ? `<h2>Le saviez-vous ?</h2><p>${esc(fact[0])}</p><p lang="en">${esc(fact[1])}</p>` : ""}
<p>Mots-clés : ${i.tags.map((t) => esc(t)).join(", ")}</p>
<h2>Utiliser cette icône</h2><pre><code>${esc(code)}</code></pre>
<p>Icône libre et gratuite, licence MIT, utilisation commerciale comprise. <a href="/#${i.slug}">Personnaliser et télécharger sur afroicons.org</a></p>
${variants.length ? `<h2>Variantes</h2>${links(variants)}` : ""}
<h2>Dans la même famille</h2>${links(similar)}`,
  });
}

// Page qui liste toutes les icônes, par catégorie : le chemin d'accès des moteurs de recherche vers chaque fiche.
const groups = Object.keys(CATS).map((c) => [c, icons.filter((i) => i.cat === c)]).filter(([, l]) => l.length);
page({
  path: "icones",
  title: `Toutes les icônes Afroicons — ${icons.length} icônes SVG gratuites`,
  desc: `Les ${icons.length} icônes Afroicons, par catégorie : nature, faune, musique, symboles adinkra, cuisine, vie quotidienne, architecture et interface. SVG libres, licence MIT.`,
  canonical: `${SITE}/icones/`,
  app: false,
  body: `<nav><a href="/">Afroicons</a></nav><h1>Toutes les icônes (${icons.length})</h1>${groups.map(([c, l]) => `<h2>${esc(CATS[c])} (${l.length})</h2><ul class="g">${l.map((i) => `<li><a href="/icones/${i.slug}/">${esc(i.fr)}</a></li>`).join("")}</ul>`).join("")}`,
});

// Page « Nouveautés » : le journal des versions (CHANGELOG.md) mis en page.
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
  app: false,
  body: `<nav><a href="/">Afroicons</a> › <a href="/icones/">Toutes les icônes</a></nav><h1>Nouveautés</h1>${markdown(read("CHANGELOG.md"))}`,
});

const today = new Date().toISOString().slice(0, 10);
const entry = (loc, prio) => `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><priority>${prio}</priority></url>`;
writeFileSync(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[entry(`${SITE}/`, "1.0"), entry(`${SITE}/icones/`, "0.8"), entry(`${SITE}/nouveautes/`, "0.5"), ...icons.map((i) => entry(url(i), "0.6"))].join("\n")}\n</urlset>\n`);
console.log(`✔ ${icons.length} pages d'icônes, la liste, les nouveautés et le plan du site (${icons.length + 3} adresses)`);
