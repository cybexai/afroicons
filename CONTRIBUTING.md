# Contribuer à Afroicons

Merci de vouloir enrichir la bibliothèque ! Deux façons d'aider :

1. **Proposer une icône** : dans la boîte à idées du site, ou en ouvrant une *issue* « Nouvelle icône » avec le nom, la catégorie, la région et l'usage visé.
2. **Dessiner une icône** : en suivant le guide ci-dessous puis en ouvrant une *pull request*.

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

**Dans l'esprit :** une silhouette claire vaut mieux que des détails. Évitez les clichés (« tribal », animaux de safari seulement), les marques, les drapeaux et les reproductions d'œuvres précises. Pour un symbole culturel (adinkra, croix touarègue…), dessinez la forme traditionnelle, publique, et citez sa signification dans la description.

## Ajouter une icône

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

2. `npm test` — le build régénère les paquets et vérifie votre entrée.
3. Ouvrez la PR avec une capture de l'icône à 16, 24 et 48 px.
