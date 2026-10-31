# Journal des versions

## 0.6.0 — 31 octobre 2026 · drapeaux africains, icônes SYSIGAPE

### Paquets
- **Les 54 drapeaux africains** (États membres de l'ONU), aux couleurs officielles, en rectangle aux coins arrondis : `toSvg("drapeau-cameroun")`, `<DrapeauCameroun />`, `<afroicon name="drapeau-cameroun">`. Code ISO (`iso`) et nom du pays (`country`) dans `icons.json`. Sans identifiant SVG : un drapeau s'affiche correctement même répété, dans un sprite caché ou un menu fermé. Emblèmes simplifiés pour rester lisibles à 16 px ; générés par `scripts/flags.mjs`
- `afroicons-ui` et `afroicons-angular` : **14 nouvelles icônes d'interface** pour SYSIGAPE, soit 177 au total : `Menu`, `PanelLeftOpen`, `PanelLeftClose`, `MoreVertical`, `Sun`, `Hourglass`, `ClipboardX`, `PiggyBank` (tirelire en terre cuite), `Folder`, `Tractor` (la daba, houe du paysan), `Building`, `UserCog`, `Quote`, `MailCheck`. Correspondance complète avec Material UI et Ant Design dans `docs/integrations/sysigape.md`

### Site
- Trois collections : **Culturelles** (162), **Drapeaux** (54) et **Interface** (177), chacune avec ses filtres (catégories et régions, régions, ou familles) ; une recherche sans résultat propose la collection qui en a ; les favoris rassemblent les trois
- Une page par icône et par drapeau (393), la liste complète et le plan du site ; nouvelle image de partage
- Page **Nouveautés** (`/nouveautes/`) au style du site, avec son lien dans le menu et sur le badge de version
- Chiffres d'usage réels (installations npm, étoiles GitHub) dans « Utiliser », mention « Utilisé par NAFA ERP »
- La fiche d'une icône a ses propres réglages ; les versions remplies se chargent en arrière-plan (démarrage plus léger)
- Packs téléchargés : le style choisi est indiqué dans le nom du fichier et le README
- Corrections : la page s'ouvre toujours en haut ; onglets des collections sur les téléphones de 320 px ; l'adresse de la page Nouveautés ne change plus quand on y ouvre une icône ; plus d'erreur en console quand on change vite de filtre
- Tests de non-régression du site à chaque build (`apps/web/scripts/check.mjs`)

## 0.5.0 — 30 octobre 2026 · style rempli, variantes, icônes P2
- **Style rempli** pour les 162 icônes culturelles : `toSvg(id, { variant: "fill" })`, `<Baobab variant="fill" />`, `<afroicon variant="fill">`, fichiers `svg/fill/`, et un style « Rempli » sur le site. Généré par `scripts/fill.mjs`, puis retouché à la main
- **12 variantes d'état** : plantain épluché, alloco, mangue en hérisson, tranche d'ananas, noix de coco ouverte, avocat coupé, cabosse ouverte, kola ouverte, arachides décortiquées, igname coupée, marmite couverte, calebasse pleine. Champ `variantOf`, et section « Variantes » dans la fiche du site
- Correctifs `afroicons-react` : l'icône Ngoni perdait sa rotation (les groupes SVG sont maintenant conservés) ; la prop `color` colore aussi les points
- Site : **une page par icône** (`afroicons.org/icones/baobab/`), avec son titre, sa description et son contenu lisibles par les moteurs de recherche, une page qui liste les 325 icônes et un plan du site complet ; l'adresse suit l'icône ouverte et se partage. Nouvelle image de partage (325 icônes, React, Angular)
- Site : la fiche d'une icône a sa section « Personnaliser » (style, couleur, fond, trait), avec aperçu immédiat ; ces réglages ne touchent que l'icône affichée
- Site : plus de défilement horizontal sur les téléphones de 421 à 520 px (grands iPhone, nombreux Android) ; la version affichée suit celle publiée sur npm
- `afroicons-ui` et `afroicons-angular` : **55 nouvelles icônes d'interface** (les P2 de NAFA ERP), soit 163 au total. Parmi elles, 3 nouvelles métaphores africaines : `Globe` centré sur l'Afrique, `ShoppingBag` en sac de raphia tressé, `PackageCheck` en colis ficelé

## 0.4.0 — 29 octobre 2026 · nouveaux paquets

### afroicons-ui et afroicons-angular
- Nouveau paquet **`afroicons-ui`** : 108 icônes d'interface redessinées (les P1 de NAFA ERP), compatibles `lucide-react` — mêmes noms, mêmes props, classes `lucide-*` conservées ; les autres icônes Lucide restent disponibles
- 15 métaphores africaines : case, panier tressé, boutique, cauri, moto de livraison, taxi-brousse, moustiquaire, dashiki, marmite, bidon, gele…
- Site : nouvelle catégorie « Interface »
- Nouveau paquet **`afroicons-angular`** : composant autonome `<afroicon>` (Angular 18+), les 150 icônes culturelles et les 108 d'interface, import sélectif (tree-shaking), SVG construit sans innerHTML

### Projet open source
- Code de conduite, politique de sécurité, guide de contribution complet (installation, icônes d'interface, relecture, licence des contributions)
- Modèles de tickets (nouvelle icône, correction d'icône, bug) et de pull request

## 0.3.1 — 29 octobre 2026 · audit
**Accessibilité (0 violation axe-core, clair / sombre / mobile)**
- Fenêtres fermées (fiche, palette, aide, sélection, menus) rendues inertes : plus de focus invisible au clavier
- Fiche et palette déclarées comme dialogues modaux ; le focus entre à l'ouverture et revient à la fermeture
- Cartes restructurées : plus de boutons imbriqués, nom accessible, actions rapides hors tabulation
- Libellés pour les curseurs, sélecteurs de couleur, pastilles, boutons d'icône ; lien « Aller aux icônes »
- Contrastes corrigés (titres de section, badges « Nouveau », écrans d'app, cartes de marque)

**Bugs**
- Mobile : débordement horizontal de la boîte à idées ; les actions invisibles des cartes captaient les touchers
- Boîte à idées : une donnée inattendue pouvait faire planter tout le site (nettoyage + garde-fou) ; un vote pouvait effacer des votes précédents ; abonnements en double ; noms d'auteurs écrasés
- Fiche : ← / → partaient au mauvais endroit depuis une icône hors filtre ; raccourcis actifs derrière l'aide
- Recherche : une espace seule masquait tout ; « coeur », « noeud », « boeuf » trouvent maintenant cœur, nœud, bœuf
- Motifs : coutures visibles sur les bords de la tuile
- Couleur blanche du sélecteur mal reconnue ; Échap ferme la palette et les menus ; le filtre favoris ne bloque plus les tags

**Performance et référencement**
- JSZip chargé seulement au premier téléchargement (-30 Ko gzip au démarrage)
- Image de partage 1200×630, robots.txt, sitemap.xml, manifeste web, balises Open Graph et Twitter

## 0.3.0 — 29 octobre 2026
- Site réécrit en **React + Vite + TypeScript** (`apps/web`), alimenté par le paquet `afroicons`
- Boîte à idées découplée de son stockage (interface `IdeaBackend`), prête pour un backend serverless
- Correctif : icônes invisibles en mode sombre dans l'application Claude
- 150 icônes (+9 : gele, kanaga, okapi, pangolin, machine à coudre, fer à charbon, étal, noix de palme, casque séchoir)
- Redessin de keke, porteuse de bébé, ngoni, awalé, façade ndebele
- Nouveau logo : le « A-case »
- Site : vitrine d'apps, page de marque, anecdotes « Le saviez-vous ? », icône du jour, boîte à idées avec votes
- Premiers paquets `afroicons` et `afroicons-react`

## 0.2.0
- 141 icônes, régions, styles trait / pastille / cercle
- Site : palette de commandes ⌘K, navigation clavier, sélection multiple, atelier de motifs, ambiances de villes, mode sombre

## 0.1.0
- 45 icônes et première version du site
