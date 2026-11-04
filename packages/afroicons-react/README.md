# afroicons-react

Les 544 icônes [Afroicons](https://afroicons.org) (dont les cartes des 54 pays et 42 monnaies), les 54 drapeaux africains et les 452 emojis en composants React.

```bash
npm install afroicons-react
```

```jsx
import { Baobab, Mobilemoney, Mototaxi, DrapeauCameroun, CarteCameroun, EmojiPouceLeve } from "afroicons-react";
// <EmojiPouceLeve size={32} tone="light" /> : emoji, 5 teintes de peau (medium-dark par défaut)

<Baobab />
<Mobilemoney size={20} color="#22305C" />
<Mototaxi strokeWidth={2} title="Livraison" />
<Baobab variant="fill" />
<CarteCameroun variant="fill" />  {/* carte du pays */}
```

Props : `size` (24), `color` (`currentColor`), `strokeWidth` (1.75), `variant` (`"line"` ou `"fill"` pour la version remplie), `title` (accessibilité), plus toutes les props SVG. Les composants transmettent `ref` et sont tree-shakables.

Nom du composant = id en PascalCase : `peigneafro` → `Peigneafro`, `taxibrousse` → `Taxibrousse`.

Variantes d'état : `Plantainepluche` et `Alloco` (plantain), `Mangueherisson`, `Ananastranche`, `Cocoouverte`, `Avocatcoupe`, `Cacaoouvert`, `Kolaouverte`, `Arachidedecortiquee`, `Ignamecoupee`, `Marmitecouverte`, `Calebassepleine`.

Licence MIT
