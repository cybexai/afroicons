# afroicons-antd

Les icônes [Afroicons](https://afroicons.org) sous les noms de **`@ant-design/icons`** : mêmes noms, mêmes props. Vous remplacez l'import, rien d'autre.

```bash
npm install afroicons-antd
```

`@ant-design/icons` (version 5 ou plus) reste nécessaire : les icônes pas encore redessinées en viennent directement.

```jsx
// Avant
import { PlusOutlined, DeleteFilled } from "@ant-design/icons";

// Après
import { PlusOutlined, DeleteFilled, SyncOutlined } from "afroicons-antd";
import EyeOutlined from "afroicons-antd/EyeOutlined";

<PlusOutlined style={{ fontSize: 16 }} />
<SyncOutlined spin />
```

## Ce qui change

- **303 noms Ant Design** redessinés au trait Afroicons (1,75, arrondi), variantes comprises : `DeleteOutlined`, `DeleteFilled` et `DeleteTwoTone` donnent la même poubelle.
- Les props sont conservées : `className`, `style`, `spin`, `rotate`, `onClick`, `tabIndex` ; le rendu garde `<span role="img" class="anticon anticon-plus">`, donc vos styles et le thème Ant Design s'appliquent.
- Des métaphores africaines : `HomeOutlined` → la case, `ShoppingCartOutlined` → le panier tressé, `ShopOutlined` → la boutique de quartier, `WalletOutlined` → le portefeuille au cauri…
- **Toutes les autres** icônes Ant Design restent disponibles sous leur nom, ainsi que le composant `Icon` (export par défaut).

`afroiconNames` donne la liste des noms redessinés ; `afroicons-antd/compat.json` associe chaque nom à son icône Afroicons. `twoToneColor` est accepté mais sans effet : les icônes Afroicons sont au trait.

## Licence et marques

MIT © THAFAM HOLDING SARL. Les dessins sont originaux : aucun tracé d'Ant Design n'est repris ; seuls les noms d'icônes le sont, pour la compatibilité.

**Projet indépendant, non affilié au groupe Ant ni approuvé par lui.** Ant Design est une marque de son propriétaire, citée uniquement pour indiquer la compatibilité.
