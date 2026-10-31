# afroicons

162 icônes SVG libres qui racontent l'Afrique, au trait et remplies, et les 54 drapeaux africains aux couleurs officielles. Grille 24 px, trait 1,75, `currentColor`.

```bash
npm install afroicons
```

```js
import { toSvg, icons, names, replace } from "afroicons";
toSvg("baobab", { size: 32, color: "#C24E2A", strokeWidth: 2 });
toSvg("baobab", { variant: "fill" });   // version remplie
toSvg("drapeau-cameroun");              // drapeau, aux couleurs officielles
icons.djembe.fr;      // "Djembé"
icons.djembe.region;  // "ouest"
replace();            // remplace <i data-afroicon="kora"></i> (data-variant="fill" pour la version remplie)
icons.alloco.variantOf; // "plantain" : variante d'état
```

- `afroicons/svg/<id>.svg` — fichiers individuels, au trait
- `afroicons/svg/fill/<id>.svg` — versions remplies
- `afroicons/sprite.svg` — `<symbol id="afroicon-<id>">` à utiliser avec `<use>`
- `afroicons/icons.json` — noms FR/EN, catégories, régions, mots-clés, variantes (`variantOf`)

Variantes d'état : `plantainepluche` et `alloco` (plantain), `mangueherisson`, `ananastranche`, `cocoouverte`, `avocatcoupe`, `cacaoouvert`, `kolaouverte`, `arachidedecortiquee`, `ignamecoupee`, `marmitecouverte`, `calebassepleine`.

Site et recherche : https://afroicons.org · Licence MIT
