# afroicons-mui

Les icônes [Afroicons](https://afroicons.org) sous les noms de **`@mui/icons-material`** : mêmes noms, mêmes props. Vous remplacez l'import, rien d'autre.

```bash
npm install afroicons-mui
```

`@mui/material` et `@mui/icons-material` (version 5 ou plus) restent nécessaires : `afroicons-mui` s'appuie sur `SvgIcon`, et les icônes pas encore redessinées viennent directement de `@mui/icons-material`.

```jsx
// Avant
import { DeleteOutlined, Search } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

// Après
import { DeleteOutlined, Search } from "afroicons-mui";
import CloseIcon from "afroicons-mui/Close";

<DeleteOutlined fontSize="small" color="error" sx={{ mr: 1 }} titleAccess="Supprimer" />
```

## Ce qui change

- **1 655 noms Material UI** redessinés au trait Afroicons (1,75, arrondi), variantes comprises : `Delete`, `DeleteOutlined`, `DeleteRounded`, `DeleteSharp` et `DeleteTwoTone` donnent la même poubelle.
- Les props de `SvgIcon` sont conservées : `fontSize`, `color`, `htmlColor`, `sx`, `titleAccess`, `className`, ainsi que la classe `MuiSvgIcon-root` et le `data-testid` (`DeleteOutlinedIcon`).
- Des métaphores africaines : `Home` → la case, `ShoppingCart` → le panier tressé, `Wallet` → le portefeuille au cauri, `LocalShipping` → la moto de livraison, `Savings` → la tirelire en terre cuite, `Agriculture` → la daba…
- **Toutes les autres** icônes Material UI restent disponibles sous leur nom.

`afroiconNames` donne la liste des noms redessinés ; `afroicons-mui/compat.json` associe chaque nom à son icône Afroicons.

L'import direct (`afroicons-mui/Close`) existe pour les noms redessinés ; pour les autres, gardez `@mui/icons-material/…`.

## Licence et marques

MIT © THAFAM HOLDING SARL. Les dessins sont originaux : aucun tracé de Material UI n'est repris ; seuls les noms d'icônes le sont, pour la compatibilité.

**Projet indépendant, non affilié à MUI (Material-UI SAS) ni approuvé par elle.** MUI et Material UI sont des marques de leur propriétaire, citées uniquement pour indiquer la compatibilité.
