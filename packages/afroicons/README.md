# afroicons

150 icônes SVG libres qui racontent l'Afrique. Grille 24 px, trait 1,75, `currentColor`.

```bash
npm install afroicons
```

```js
import { toSvg, icons, names, replace } from "afroicons";
toSvg("baobab", { size: 32, color: "#C24E2A", strokeWidth: 2 });
icons.djembe.fr;      // "Djembé"
icons.djembe.region;  // "ouest"
replace();            // remplace <i data-afroicon="kora"></i>
```

- `afroicons/svg/<id>.svg` — fichiers individuels
- `afroicons/sprite.svg` — `<symbol id="afroicon-<id>">` à utiliser avec `<use>`
- `afroicons/icons.json` — noms FR/EN, catégories, régions, mots-clés

Site et recherche : https://afroicons.org · Licence MIT
