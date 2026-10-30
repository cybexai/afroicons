# afroicons-react

Les 162 icônes [Afroicons](https://afroicons.org) en composants React.

```bash
npm install afroicons-react
```

```jsx
import { Baobab, Mobilemoney, Mototaxi } from "afroicons-react";

<Baobab />
<Mobilemoney size={20} color="#22305C" />
<Mototaxi strokeWidth={2} title="Livraison" />
<Baobab variant="fill" />
```

Props : `size` (24), `color` (`currentColor`), `strokeWidth` (1.75), `variant` (`"line"` ou `"fill"` pour la version remplie), `title` (accessibilité), plus toutes les props SVG. Les composants transmettent `ref` et sont tree-shakables.

Nom du composant = id en PascalCase : `peigneafro` → `Peigneafro`, `taxibrousse` → `Taxibrousse`.

Variantes d'état : `Plantainepluche` et `Alloco` (plantain), `Mangueherisson`, `Ananastranche`, `Cocoouverte`, `Avocatcoupe`, `Cacaoouvert`, `Kolaouverte`, `Arachidedecortiquee`, `Ignamecoupee`, `Marmitecouverte`, `Calebassepleine`.

Licence MIT
