# Contribuer à Afroicons

Merci de vouloir enrichir la bibliothèque ! Afroicons est un projet libre (licence MIT) : chacun peut proposer, dessiner, corriger et améliorer. *English summary at the end.*

En participant, vous acceptez le [code de conduite](CODE_OF_CONDUCT.md).

## Comment aider

| Vous voulez… | Comment |
| --- | --- |
| **Proposer une icône** | Le formulaire de la [boîte à idées](https://afroicons.org/#idees), ou un ticket [« Nouvelle icône »](https://github.com/cybexai/afroicons/issues/new/choose). |
| **Voter** | Un 👍 sur une proposition. Les plus demandées entrent dans la prochaine version. |
| **Corriger une icône** | Un ticket « Corriger une icône » : peu lisible, inexacte, nom ou région erronés, représentation maladroite. |
| **Dessiner une icône** | Suivez le guide ci-dessous et ouvrez une pull request. Les propositions les plus votées sont un bon point de départ. |
| **Améliorer le site ou les paquets** | Les tickets `good first issue` sont faits pour commencer. |
| **Partager un savoir** | Un nom local, une signification, une photo libre de droits : commentez la proposition concernée. |

Pour un changement important (nouvelle catégorie, nouveau paquet, refonte du site), ouvrez d'abord une [discussion](https://github.com/cybexai/afroicons/discussions) : on en parle avant que vous y passiez du temps.

## Installer le projet

Node.js 20 ou plus récent.

```bash
git clone https://github.com/cybexai/afroicons.git
cd afroicons
npm ci
npm run dev        # site sur http://localhost:5173
npm test           # régénère les paquets et vérifie les icônes
```

```
src/icons.json         ← icônes culturelles : la source unique de vérité
src/ui-icons.json      ← icônes d'interface (noms Lucide)
scripts/build.mjs      ← génère les paquets à partir de ces deux fichiers
packages/              ← paquets npm générés (ne pas modifier à la main)
apps/web/              ← le site afroicons.org (React + Vite + TypeScript)
```

## Guide de dessin

| Règle | Valeur |
| --- | --- |
| Grille | 24 × 24, `viewBox="0 0 24 24"` |
| Zone utile | de 2 à 22 (1 px de marge minimum) |
| Trait | 1,75, `stroke-linecap="round"`, `stroke-linejoin="round"` |
| Couleur | `currentColor` uniquement |
| Remplissage | `fill="none"` ; seuls les points (yeux, graines) utilisent `fill="currentColor" stroke="none"` |
| Éléments | `path`, `circle`, `ellipse`, `rect` — pas de texte, pas d'images, pas de dégradés |
| Lisibilité | doit se reconnaître à 16 px |

**Dans l'esprit :** une silhouette claire vaut mieux que des détails. Évitez les clichés (« tribal », animaux de safari seulement), les marques et les reproductions d'œuvres précises. Pour un symbole culturel (adinkra, croix touarègue…), dessinez la forme traditionnelle, publique, et citez sa signification dans la description.

**Dessins originaux uniquement.** Ne recopiez pas les tracés d'une autre bibliothèque, même libre.

## Ajouter une icône culturelle

1. Ajoutez une entrée dans `src/icons.json` :

```json
{
  "id": "ndole",
  "fr": "Ndolè",
  "en": "Ndolè (bitterleaf stew)",
  "cat": "cuisine",
  "region": "centre",
  "tags": ["ndolè", "cameroun", "plat", "dish", "bitterleaf"],
  "body": "<path d=\"…\"/>"
}
```

- `id` : minuscules et chiffres seulement, sans accents ni tirets
- `cat` : `nature`, `faune`, `musique`, `symboles`, `cuisine`, `vie`, `architecture`
- `region` : `ouest`, `centre`, `est`, `nord`, `australe` ou `pan`
- `tags` : au moins 3 mots-clés, en français, en anglais et en termes locaux

- `variantOf` (facultatif) : l'id de l'icône dont celle-ci est une variante d'état (`"variantOf": "plantain"` pour l'alloco)

2. `node scripts/fill.mjs` — génère la version remplie (`fill`). Vérifiez-la : si le résultat est maladroit, retouchez `fill` à la main dans `src/icons.json` (aplats en blanc et découpes en noir dans le masque, sur le modèle des icônes existantes).
3. `npm test` — le build régénère les paquets et vérifie votre entrée.
4. Ouvrez la PR avec une capture de l'icône, au trait et remplie, à 16, 24 et 48 px.

## Corriger un drapeau

Les 54 drapeaux sont décrits dans `scripts/flags.mjs` (bandes, étoiles, croissants…, en coordonnées de 0 à 1) : modifiez-y le drapeau, puis `node scripts/flags.mjs` régénère `src/flags.json`. Couleurs officielles uniquement, emblèmes simplifiés pour rester lisibles à 16 px.

## Ajouter une icône d'interface (`afroicons-ui`)

`afroicons-ui` remplace `lucide-react` sans changer le code : chaque icône garde **exactement le nom Lucide** (`Wallet`, `ShoppingCart`…). Celles qui ne sont pas encore redessinées viennent de Lucide.

Ajoutez une entrée dans `src/ui-icons.json` :

```json
{ "id": "Calculator", "fr": "Calculatrice", "en": "Calculator", "family": "Argent et paiement", "afro": null, "body": "<rect …/>" }
```

- `id` : le nom du composant Lucide, tel quel. Les tests vérifient qu'il existe dans `lucide-react`.
- `afro` : `null` si la forme reste universelle, ou une phrase qui décrit la métaphore africaine retenue (« Le panier tressé du marché, à la place du chariot »).
- Gardez la même idée que l'icône Lucide (une loupe pour chercher), mais **dessinez-la vous-même** : les tracés Lucide sont sous licence ISC.

## Relecture

- Un mainteneur relit chaque PR, en général sous une semaine.
- Une icône est acceptée si elle respecte le guide, se lit à 16 px et représente fidèlement son sujet. Pour un sujet culturel, l'avis de personnes qui le connaissent compte autant que le dessin.
- Les commits sont fusionnés sur `main`. Chaque version est publiée sur npm à partir d'un tag `v*`.

## Licence des contributions

En proposant une contribution, vous confirmez en être l'auteur (ou avoir le droit de la partager) et acceptez qu'elle soit publiée sous [licence MIT](LICENSE).

## Mainteneurs

Le projet est porté par **THAFAM HOLDING SARL**, qui en assure la maintenance et la publication.

---

## English summary

Afroicons is MIT-licensed and welcomes contributions. Suggest or vote for icons on [afroicons.org](https://afroicons.org/#idees) or in the issues; draw new icons following the guide above (24 grid, 1.75 rounded stroke, `currentColor`, readable at 16 px, original drawings only) by adding an entry to `src/icons.json` (or `src/ui-icons.json` for Lucide-compatible interface icons, keeping the exact Lucide name), then run `npm test` and open a pull request with 16/24/48 px previews. For larger changes, start a discussion first. By contributing you agree to the [code of conduct](CODE_OF_CONDUCT.md) and to release your work under the MIT license.
