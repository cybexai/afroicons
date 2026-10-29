# afroicons-ui

Les icônes d'interface [Afroicons](https://afroicons.org), **compatibles `lucide-react`** : mêmes noms de composants, mêmes props.

```bash
npm install afroicons-ui lucide-react
```

```diff
- import { Plus, Wallet, ShoppingCart } from "lucide-react";
+ import { Plus, Wallet, ShoppingCart } from "afroicons-ui";
```

Ou, sans toucher aux imports, avec un alias (Vite) :

```js
// vite.config.js
resolve: { alias: { "lucide-react": "afroicons-ui" } }
```

Avec l'alias, `afroicons-ui` doit lui-même pouvoir importer le vrai `lucide-react`. Préférez donc le remplacement des imports, ou un alias limité à votre code source.

## Ce qui change

- **108 icônes redessinées** (les plus utilisées par NAFA ERP) : trait 1,75 arrondi, grille 24 × 24.
- **15 métaphores africaines** : `Home` → la case, `ShoppingCart` → le panier tressé, `Store` → la boutique de quartier, `Wallet` → un portefeuille fermé par un cauri, `DollarSign` → le cauri, `Truck` → la moto de livraison, `Bus` → le taxi-brousse, `BedDouble` → le lit sous moustiquaire, `Shirt` → le dashiki, `UtensilsCrossed` → la marmite, `Fuel` → le bidon, `Users` → deux personnes dont une coiffée d'un gele…
- **Toutes les autres** icônes Lucide restent disponibles sous leur nom : elles viennent directement de `lucide-react`.

`afroiconNames` donne la liste des icônes redessinées.

## Props

Comme Lucide : `size` (24), `color` (`currentColor`), `strokeWidth` (**1,75** au lieu de 2), `absoluteStrokeWidth`, `className`, plus toutes les props SVG. Les classes `lucide lucide-<nom>` sont conservées, avec `afroicon` en plus. Les alias `PlusIcon` et `LucidePlus` existent aussi, et le type `LucideIcon` vient de `lucide-react`.

Les SVG sont aussi fournis à part : `afroicons-ui/svg/Wallet.svg`.

Licence MIT. Les icônes reprises de Lucide restent sous licence ISC.
