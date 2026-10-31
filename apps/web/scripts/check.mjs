// Tests de non-régression du site généré (apps/web/dist), lancés à la fin de chaque build :
// une page par icône, plan du site complet, compteurs à jour, pas de texte cassé.
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const web = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(web, "dist"), repo = join(web, "../..");
const read = (p) => readFileSync(join(dist, p), "utf8");
const afro = JSON.parse(readFileSync(join(repo, "packages/afroicons/icons.json"), "utf8"));
const ui = JSON.parse(readFileSync(join(repo, "packages/afroicons-ui/icons.json"), "utf8"));
const kebab = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([a-zA-Z])(\d)/g, "$1-$2").toLowerCase();
const slugs = [...afro.map((i) => i.id), ...ui.map((u) => "ui-" + kebab(u.id))];
const total = slugs.length, flags = afro.filter((i) => i.cat === "drapeaux").length;
const broken = /undefined|NaN|\[object |\$\{/;

// Accueil : compteurs de la description, application et image de partage.
const home = read("index.html");
assert.ok(home.includes(`${total} icônes SVG libres`), `accueil : description à ${total} icônes`);
assert.ok(home.includes(`les ${flags} drapeaux africains`), "accueil : description avec les drapeaux");
assert.match(home, /<script type="module"[^>]*src="\.\/assets\/index-[\w-]+\.js"/, "accueil : application chargée");
assert.ok(existsSync(join(dist, "og-image.png")), "image de partage");
assert.ok(home.includes('history.scrollRestoration = "manual"'), "la page s'ouvre en haut");

// Une page par icône, avec titre, description, adresse canonique, dessin et code.
for (const s of slugs) {
  const p = `icones/${s}/index.html`;
  assert.ok(existsSync(join(dist, p)), `page : ${s}`);
  const h = read(p);
  assert.match(h, /<title>[^<]+ \| Afroicons<\/title>/, `titre : ${s}`);
  assert.ok(h.includes(`<link rel="canonical" href="https://afroicons.org/icones/${s}/">`), `canonique : ${s}`);
  assert.ok(h.includes("<svg") && h.includes("<pre><code>"), `dessin et code : ${s}`);
  const main = h.slice(h.indexOf('<main class="seo">'));
  assert.doesNotMatch(main, broken, `texte cassé : ${s}`);
  assert.doesNotMatch(h.match(/<meta name="description" content="([^"]*)"/)[1], broken, `description : ${s}`);
}
const cm = read("icones/drapeau-cameroun/index.html");
assert.ok(cm.includes("Drapeau du Cameroun (CM) en SVG, aux couleurs officielles"), "drapeau : description");
assert.ok(!cm.includes('variant="fill"'), "drapeau : pas de version remplie proposée");

// Liste, nouveautés, plan du site.
const list = read("icones/index.html");
assert.ok(list.includes(`Toutes les icônes (${total})`) && list.includes(`Drapeaux (${flags})`), "liste des icônes");
assert.ok(!/<script type="module"/.test(list), "liste : page statique, sans l'application");
const news = read("nouveautes/index.html");
const versions = [...readFileSync(join(repo, "CHANGELOG.md"), "utf8").matchAll(/^## (\d+\.\d+\.\d+)/gm)].map((m) => m[1]);
for (const v of versions) assert.ok(news.includes(`<h2>${v}`), `nouveautés : ${v}`);
assert.match(news, /<script type="module"/, "nouveautés : l'application se charge par-dessus");
const locs = [...read("sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
assert.equal(locs.length, total + 3, "plan du site : toutes les pages");
assert.equal(new Set(locs).size, locs.length, "plan du site : sans doublon");
assert.ok(locs.every((l) => l.startsWith("https://afroicons.org/")), "plan du site : domaine canonique");

console.log(`✔ site : ${total} pages d'icônes (dont ${flags} drapeaux), liste, nouveautés et plan du site vérifiés`);
