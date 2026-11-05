<p align="center"><img src="docs/logo.svg" width="96" alt="Afroicons"></p>
<h1 align="center">Afroicons</h1>
<p align="center"><b>Des icônes libres qui racontent l'Afrique.</b><br>585 icônes culturelles, au trait et remplies (dont les cartes des 54 pays et 42 monnaies), + les 56 drapeaux (54 pays, l'Union africaine et le panafricain) + 483 emojis + 1557 icônes d'interface · grille 24 px · FR / EN · open source (MIT)</p>
<p align="center"><a href="https://afroicons.org"><b>afroicons.org</b></a></p>
<p align="center">
  <a href="LICENSE"><img alt="Licence MIT" src="https://img.shields.io/badge/licence-MIT-C24E2A"></a>
  <a href="https://github.com/cybexai/afroicons/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/cybexai/afroicons/actions/workflows/ci.yml/badge.svg"></a>
  <a href="CONTRIBUTING.md"><img alt="Contributions bienvenues" src="https://img.shields.io/badge/contributions-bienvenues-2E6B4E"></a>
</p>

---

🇫🇷 **Afroicons** est une bibliothèque d'icônes dessinées avec soin pour les produits africains : nos paysages, notre faune, nos instruments, nos symboles, nos plats et notre quotidien — de la moto-taxi à la tontine, de la case obus au mobile money.

🇬🇧 **Afroicons** is a carefully drawn icon library for African products: landscapes, wildlife, instruments, symbols, food and everyday life — from the moto-taxi to the tontine, from the Musgum hut to mobile money.

## Paquets · Packages

| Paquet | Usage |
| --- | --- |
| [`afroicons`](packages/afroicons) | SVG, sprite, `icons.json`, fonction `toSvg()` (JS natif) |
| [`afroicons-react`](packages/afroicons-react) | Un composant React par icône |
| [`afroicons-ui`](packages/afroicons-ui) | 1810 icônes d'interface, compatibles `lucide-react` (mêmes noms, mêmes props) |
| [`afroicons-mui`](packages/afroicons-mui) | les mêmes icônes sous les noms de `@mui/icons-material` (6 304 noms, mêmes props) |
| [`afroicons-antd`](packages/afroicons-antd) | les mêmes icônes sous les noms de `@ant-design/icons` (668 noms, mêmes props) |
| [`afroicons-angular`](packages/afroicons-angular) | Composant Angular autonome `<afroicon>`, toutes les icônes |

`afroicons-mui` et `afroicons-antd` sont des projets indépendants, non affiliés à MUI (Material-UI SAS) ni au groupe Ant ; MUI, Material UI et Ant Design sont des marques de leurs propriétaires, citées uniquement pour indiquer la compatibilité. Les dessins sont originaux.

## Démarrage rapide · Quick start

```bash
npm install afroicons          # SVG + JS
npm install afroicons-react    # React
npm install afroicons-angular  # Angular
```

### React

```jsx
import { Baobab, Djembe, Mototaxi } from "afroicons-react";

<Baobab />
<Djembe size={32} color="#C24E2A" />
<Mototaxi strokeWidth={2} title="Livraison en benskin" />
```

### JavaScript

```js
import { toSvg, replace } from "afroicons";

document.querySelector("#btn").innerHTML = toSvg("mobilemoney", { size: 20 });

// ou : <i data-afroicon="baobab" data-size="32"></i> dans le HTML, puis
replace();
```

### HTML (sprite)

```html
<!-- collez une fois node_modules/afroicons/sprite.svg dans la page -->
<svg width="24" height="24"><use href="#afroicon-kora"/></svg>
```

### Fichiers SVG

`node_modules/afroicons/svg/<id>.svg` — une icône par fichier, couleur `currentColor`.

## Les icônes

| Catégorie | Nombre | Exemples |
| --- | ---: | --- |
| Nature & paysages | 29 | baobab, kilimandjaro, chutes Victoria, forêt du Congo, mangrove |
| Faune | 116 | éléphant, okapi, pangolin, guépard, lémurien, grue couronnée, bec-en-sabot, mamba noir, tisserin, lamantin |
| Musique & arts | 42 | djembé, kora, balafon, krar, oud, guembri, mbira, kakaki |
| Symboles & textiles | 26 | sankofa, gye nyame, kente, bogolan, tête d'Ife, boucliers |
| Cuisine | 159 | thiéboudienne, jollof, attiéké, injera, couscous, ugali, ndolè, eru, achu, mafé, bissap, ataya, corossol… |
| Vie quotidienne | 67 | moto-taxi, chaise en plastique, bassine émaillée, fourneau à charbon |
| Architecture | 23 | Djenné, case obus, Lalibela, Tiébélé, Ganvié, toguna |
| Peuples et tenues | 27 | massaï, touareg, peule, habesha, ndebele, wolof, haoussa, griot |
| Cartes des pays | 54 | le contour de chaque pays africain (`carte-cameroun`), relié à son drapeau ; d'après Natural Earth (domaine public) |
| Drapeaux | 56 | les 54 États africains membres de l'ONU, aux couleurs officielles, et ceux de l'Union africaine et panafricain |
| Emojis | 465 | 138 emojis Unicode redessinés (😀 👍 ❤️ 🐘 🥭…, visages et mains dans les 5 teintes de peau) et 345 emojis africains originaux : peuples et tenues, villages, 117 plats, 22 boissons, fruits et légumes, 107 animaux, instruments de musique, vie quotidienne, paysages et symboles. Chaque emoji africain a son icône au trait équivalente (champ `emoji` / `icon`) |

Chaque icône porte un nom français et anglais, une catégorie, une région (`ouest`, `centre`, `est`, `nord`, `australe`, `pan`) et des mots-clés locaux (benskin, okada, matatu, attiéké…). Tout est dans `icons.json`.

Les **drapeaux** (`drapeau-cameroun`, `<DrapeauCameroun />`) gardent leurs couleurs officielles, en rectangle aux coins arrondis : `color`, `strokeWidth` et `variant` ne les changent pas. Ils portent aussi le code ISO du pays (`iso: "CM"`) et son nom (`country`). Leurs emblèmes sont simplifiés pour rester lisibles à 16 px.

Les **emojis** (`emoji-pouce-leve`, `<EmojiPouceLeve />`) sont en couleur, avec un contour. Chacun porte son caractère Unicode (`char: "👍"`, ou `null` pour un emoji africain original) et son groupe. Les visages et les mains existent dans les **5 teintes de peau Unicode**, foncée par défaut : `<EmojiPouceLeve tone="light" />`, `toSvg("emoji-pouce-leve", { tone: "dark" })`, `<afroicon name="emoji-pouce-leve" tone="medium">` (`light`, `medium-light`, `medium`, `medium-dark`, `dark`).

## Principes de dessin

- Grille de **24 × 24 px**, contenu dans une zone de 20 px
- Trait **1,75 px**, extrémités et angles **arrondis**
- Couleur héritée (`currentColor`), pas de remplissage sauf pour les petits points
- Lisible à **16 px**, cohérent jusqu'à 512 px
- Pas de clichés, pas de marques, pas de reproductions d'œuvres


## Développement

```bash
npm ci
npm run dev          # site React en local (http://localhost:5173)
npm test             # régénère les paquets et vérifie les icônes
npm run build:web    # compile le site pour afroicons.org (apps/web/dist)
```

Organisation du dépôt :

```
src/icons.json              ← source unique de vérité (dessins + métadonnées)
src/ui-icons.json           ← icônes d'interface (noms Lucide)
scripts/build.mjs           ← génère les paquets à partir de icons.json
packages/afroicons          ← paquet npm : SVG, sprite, toSvg()
packages/afroicons-react    ← paquet npm : composants React
packages/afroicons-ui       ← paquet npm : icônes d'interface compatibles lucide-react
packages/afroicons-angular  ← paquet npm : composant Angular (le composant est écrit à la main, les données générées)
apps/web                    ← le site afroicons.org (React + Vite + TypeScript)
  src/lib/                  ← données, SVG, recherche, motifs, i18n, boîte à idées
  src/components/           ← en-tête, bibliothèque, fiche, atelier, vitrine, marque…
  src/state.tsx             ← état global (langue, thème, ambiance, personnalisation)
```

Après le build, `apps/web/scripts/pages.mjs` génère une page HTML par icône (`/icones/<id>/`), la liste `/icones/` et `sitemap.xml`.

Le site consomme directement le paquet `afroicons` du dépôt : ajouter une icône dans `src/icons.json` la fait apparaître partout.

## Contribuer · Contributing

Afroicons est **open source** et se construit avec sa communauté. Toutes les contributions comptent, même sans savoir dessiner :

- **Proposer une icône** qui manque, depuis la [boîte à idées](https://afroicons.org/#idees) ou un [ticket](https://github.com/cybexai/afroicons/issues/new/choose)
- **Voter** avec un 👍 pour les propositions qui vous parlent
- **Partager un savoir** : nom local, signification d'un symbole, photo libre de droits
- **Dessiner** une icône, **corriger** un dessin, **améliorer** le site ou les paquets

Le [guide de contribution](CONTRIBUTING.md) explique comment dessiner et ajouter une icône. Les questions et idées ont leur place dans les [discussions](https://github.com/cybexai/afroicons/discussions). En participant, vous acceptez le [code de conduite](CODE_OF_CONDUCT.md). Pour une faille de sécurité, voir [SECURITY.md](SECURITY.md).

🇬🇧 Afroicons is open source and community-built: suggest and vote for icons, share local knowledge, draw or fix icons, or improve the site and packages. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Soutien

Afroicons est un projet indépendant et communautaire, porté par THAFAM HOLDING SARL et soutenu par [NAFA ERP](https://nafaerp.com).

## Licence

[MIT](LICENSE) © 2026 THAFAM HOLDING SARL et les contributeurs d'Afroicons. Utilisation libre, y compris commerciale ; une mention est appréciée.
