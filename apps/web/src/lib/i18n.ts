// Textes de l'interface. Clé → texte. Les valeurs avec balises (<em>, &lt;) sont rendues en HTML.
export type Lang = "fr" | "en";
export const FR: Record<string, string> = {
 "nav1": "Icônes",
 "nav2": "Atelier de motifs",
 "nav5": "En situation",
 "nav3": "Utiliser",
 "nav6": "Marque",
 "nav7": "Idées",
 "newsT": "Nouveautés",
 "cmdLbl": "Rechercher une icône…",
 "h1a": "Des icônes qui racontent",
 "h1b": "l'Afrique",
 "lead": "Nos paysages, nos instruments, nos plats, nos symboles et notre quotidien, dans un système d'icônes cohérent. Personnalisez-les, copiez-les, créez vos propres motifs wax.",
 "cta1": "Explorer les icônes",
 "cta2": "Créer un motif",
 "st1": "icônes au total",
 "st2": "culturelles",
 "st3": "régions d'Afrique",
 "st4": "d'interface, compatibles Lucide",
 "k1": "01 — La bibliothèque",
 "s1": "Toutes les icônes",
 "s1p": "Ouvrez une icône pour la copier ou la télécharger. Sélectionnez-en plusieurs pour en faire un pack ou un motif.",
 "fav": "Favoris",
 "sel": "Sélection",
 "cust": "Personnaliser",
 "pStyle": "Style",
 "pCol": "Couleur",
 "pBg": "Fond de la pastille",
 "pStroke": "Épaisseur du trait",
 "pSize": "Taille d'aperçu",
 "reset": "Réinitialiser",
 "e1": "Rien trouvé… pour l'instant.",
 "e2": "Essayez « tambour », « food », « cheveux » ou changez de région.",
 "h1": "naviguer",
 "h2": "ouvrir",
 "h3": "copier le SVG",
 "h4": "favori",
 "h5": "sélectionner",
 "h6": "tous les raccourcis",
 "k2": "02 — L'atelier",
 "s2": "Créez votre propre motif",
 "s2p": "Choisissez des icônes et une palette : l'atelier compose un motif qui se répète à l'infini, comme un pagne. Pour un fond d'écran, un emballage, une affiche ou l'identité d'une marque.",
 "sp1": "Palette",
 "sp2": "Icônes",
 "sp3": "Disposition",
 "sp4": "Rotation",
 "sp5": "Densité",
 "sp6": "Trait",
 "shuf": "Mélanger",
 "scss": "Copier le CSS",
 "ssvg": "Copier la tuile SVG",
 "spng": "PNG 2400 px",
 "k5": "03 — En situation",
 "s5": "Des icônes pensées pour de vraies apps",
 "s5p": "Paiement mobile, marché, transport : voici à quoi ressemble une application africaine dessinée avec Afroicons. Changez d'ambiance en haut de page, les écrans suivent.",
 "v1": "Le quotidien, enfin dessiné",
 "v1p": "Les bibliothèques classiques n'ont ni moto-taxi, ni tontine, ni plantain. Ici, chaque écran parle à vos utilisateurs.",
 "k3": "04 — Utiliser",
 "s3": "Dans votre projet en 30 secondes",
 "u1": "Copier-coller",
 "u1p": "Chaque icône est un SVG autonome qui hérite de la couleur du texte (currentColor). Collez-la dans votre HTML, Figma ou Canva.",
 "u2": "Composant React",
 "u2p": "Un composant prêt à l'emploi par icône, avec taille, couleur et épaisseur en props.",
 "u3": "Sprite SVG",
 "u3p": "Collez le sprite une seule fois dans la page, puis appelez n'importe quelle icône avec &lt;use&gt;.",
 "u3b": "Copier le sprite complet",
 "k6": "05 — La marque",
 "s6": "Un A, une case, une porte ouverte",
 "s6p": "Le logo réunit le A d'Afroicons et la silhouette d'une case. La porte est allumée parce que la bibliothèque est ouverte à tous, et le soleil se couche sur l'horizon.",
 "b1": "Logo principal",
 "b2": "Copier le logo SVG",
 "b3": "PNG 1024 px",
 "b4": "Sur fond clair",
 "b5": "Taille minimale : 20 px",
 "b6": "Monochrome",
 "b7": "Pour le tampon, la gravure, le textile",
 "k7": "06 — La boîte à idées",
 "s7": "Quelle icône dessiner ensuite ?",
 "s7p": "Proposez une icône qui manque et votez pour vos préférées. Les plus demandées entrent dans la prochaine version.",
 "if1": "Proposer une icône",
 "if2": "Un objet, un lieu, un plat, un geste du quotidien qu'on ne trouve nulle part ailleurs.",
 "if3": "Nom de l'icône",
 "if4": "Catégorie",
 "if5": "Région",
 "if6": "Pourquoi ? (facultatif)",
 "if7": "Envoyer la proposition",
 "io1": "Populaires",
 "io2": "Récentes",
 "io3": "Dessinées",
 "k4": "07 — Manifeste",
 "m1": "Nos réalités méritent <em>leurs propres pictogrammes</em>.",
 "m2": "Les bibliothèques d'icônes du monde entier dessinent des taxis jaunes, des tasses de latte et des maisons à cheminée. Afroicons dessine la moto-taxi, la calebasse, le mobile money et la case obus : les objets que nos utilisateurs reconnaissent du premier coup d'œil.",
 "m3": "Un projet de THAFAM HOLDING SARL, ouvert à toutes les contributions.",
 "m4": "Panafricaine",
 "m4p": "Ouest, Centre, Est, Nord, Australe : chaque icône est rattachée à sa région.",
 "m5": "Un vrai système",
 "m5p": "Grille 24 px, traits arrondis, épaisseur réglable : cohérentes de 16 à 512 px.",
 "m6": "Pensée pour les produits",
 "m6p": "Paiement, transport, commerce : des icônes utiles pour les apps d'Afrique.",
 "f1": "Fait avec soin à Yaoundé",
 "f2": "Un projet soutenu par NAFA ERP",
 "tCopy": "Copier le sprite",
 "tPat": "En faire un motif",
 "tZip": "Télécharger .zip",
 "didu": "Le saviez-vous ?",
 "cSvg": "Copier SVG",
 "addFav": "Ajouter aux favoris",
 "dSvg": "Télécharger SVG",
 "dPng": "PNG 512 px",
 "ctx": "En contexte",
 "code": "Code",
 "cp": "Copier",
 "sim": "Dans la même famille",
 "cf1": "naviguer",
 "cf2": "ouvrir",
 "cf3": "copier le SVG",
 "hk": "Raccourcis clavier",
 "hk1": "Palette de recherche",
 "hk2": "Filtrer la grille",
 "hk3": "Naviguer entre les icônes",
 "hk4": "Ouvrir l'icône",
 "hk5": "Copier le SVG",
 "hk6": "Ajouter ou retirer des favoris",
 "hk7": "Sélectionner ou désélectionner",
 "hk8": "Thème clair ou sombre",
 "hk9": "Fermer",
 "remFav": "Retirer des favoris"
};
export const EN: Record<string, string> = {
 "nav1": "Icons",
 "nav2": "Pattern studio",
 "nav3": "Use",
 "nav4": "Manifesto",
 "cmdLbl": "Search an icon…",
 "h1a": "Icons that tell",
 "h1b": "Africa's story",
 "lead": "Our landscapes, instruments, dishes, symbols and everyday life, in one coherent icon system. Customise them, copy them, build your own wax patterns.",
 "cta1": "Explore the icons",
 "cta2": "Make a pattern",
 "st1": "icons in total",
 "st2": "cultural",
 "st3": "African regions",
 "st4": "interface, Lucide-compatible",
 "k1": "01 — The library",
 "s1": "All icons",
 "s1p": "Open an icon to copy or download it. Select several to build a pack or a pattern.",
 "fav": "Favourites",
 "sel": "Select",
 "cust": "Customise",
 "pStyle": "Style",
 "pCol": "Colour",
 "pBg": "Badge background",
 "pStroke": "Stroke width",
 "pSize": "Preview size",
 "reset": "Reset",
 "e1": "Nothing found… yet.",
 "e2": "Try “drum”, “food”, “hair” or switch region.",
 "h1": "navigate",
 "h2": "open",
 "h3": "copy SVG",
 "h4": "favourite",
 "h5": "select",
 "h6": "all shortcuts",
 "k2": "02 — The studio",
 "s2": "Make your own pattern",
 "s2p": "Pick icons and a palette: the studio builds an endlessly repeating pattern, like a printed cloth. For wallpapers, packaging, posters or a brand identity.",
 "sp1": "Palette",
 "sp2": "Icons",
 "sp3": "Layout",
 "sp4": "Rotation",
 "sp5": "Density",
 "sp6": "Stroke",
 "shuf": "Shuffle",
 "scss": "Copy CSS",
 "ssvg": "Copy SVG tile",
 "spng": "PNG 2400 px",
 "k3": "04 — Use",
 "s3": "In your project in 30 seconds",
 "u1": "Copy & paste",
 "u1p": "Each icon is a standalone SVG that inherits the text colour (currentColor). Paste it into HTML, Figma or Canva.",
 "u2": "React component",
 "u2p": "One ready-made component per icon, with size, colour and stroke props.",
 "u3": "SVG sprite",
 "u3p": "Paste the sprite once in your page, then call any icon with &lt;use&gt;.",
 "u3b": "Copy the full sprite",
 "k4": "07 — Manifesto",
 "m1": "Our realities deserve <em>their own pictograms</em>.",
 "m2": "Icon libraries worldwide draw yellow cabs, latte cups and chimney houses. Afroicons draws the moto-taxi, the calabash, mobile money and the Musgum hut: the things our users recognise at a glance.",
 "m3": "A THAFAM HOLDING SARL project, open to every contribution.",
 "m4": "Pan-African",
 "m4p": "West, Central, East, North, Southern: every icon is tied to its region.",
 "m5": "A real system",
 "m5p": "24 px grid, rounded strokes, adjustable weight: consistent from 16 to 512 px.",
 "m6": "Built for products",
 "m6p": "Payments, transport, retail: icons that are useful for African apps.",
 "f1": "Made with care in Yaoundé",
 "f2": "A project supported by NAFA ERP",
 "nav5": "In context",
 "nav6": "Brand",
 "nav7": "Ideas",
 "newsT": "What's new",
 "k5": "03 — In context",
 "s5": "Icons made for real apps",
 "s5p": "Mobile payments, markets, transport: this is what an African app drawn with Afroicons looks like. Change the mood at the top of the page and the screens follow.",
 "v1": "Everyday life, finally drawn",
 "v1p": "Classic libraries have no moto-taxi, no tontine, no plantain. Here, every screen speaks to your users.",
 "k6": "05 — The brand",
 "s6": "An A, a hut, an open door",
 "s6p": "The logo brings together the A of Afroicons and the outline of a hut. The door is lit because the library is open to everyone, and the sun sets on the horizon.",
 "b1": "Primary logo",
 "b2": "Copy logo SVG",
 "b3": "PNG 1024 px",
 "b4": "On light",
 "b5": "Minimum size: 20 px",
 "b6": "Monochrome",
 "b7": "For stamps, engraving, textiles",
 "k7": "06 — The idea box",
 "s7": "Which icon should we draw next?",
 "s7p": "Suggest a missing icon and vote for your favourites. The most requested ones make it into the next release.",
 "if1": "Suggest an icon",
 "if2": "An object, a place, a dish, an everyday gesture you can't find anywhere else.",
 "if3": "Icon name",
 "if4": "Category",
 "if5": "Region",
 "if6": "Why? (optional)",
 "if7": "Send suggestion",
 "io1": "Popular",
 "io2": "Recent",
 "io3": "Drawn",
 "didu": "Did you know?",
 "tCopy": "Copy sprite",
 "tPat": "Make a pattern",
 "tZip": "Download .zip",
 "cSvg": "Copy SVG",
 "addFav": "Add to favourites",
 "remFav": "Remove favourite",
 "dSvg": "Download SVG",
 "dPng": "PNG 512 px",
 "ctx": "In context",
 "code": "Code",
 "cp": "Copy",
 "sim": "Same family",
 "cf1": "navigate",
 "cf2": "open",
 "cf3": "copy SVG",
 "hk": "Keyboard shortcuts",
 "hk1": "Search palette",
 "hk2": "Filter the grid",
 "hk3": "Move between icons",
 "hk4": "Open icon",
 "hk5": "Copy SVG",
 "hk6": "Toggle favourite",
 "hk7": "Toggle selection",
 "hk8": "Light / dark theme",
 "hk9": "Close"
};
export const FACTS: Record<string, [string, string]> = {
 "baobab": [
  "Il peut vivre plus de mille ans et stocker des milliers de litres d'eau dans son tronc.",
  "It can live for over a thousand years and store thousands of litres of water in its trunk."
 ],
 "djembe": [
  "Tambour en forme de calice né en pays mandingue, il se joue à mains nues.",
  "A goblet-shaped drum from the Mande world, played with bare hands."
 ],
 "kora": [
  "Harpe-luth mandingue à 21 cordes, c'est l'instrument des griots.",
  "A 21-string Mande harp-lute, the instrument of the griots."
 ],
 "sankofa": [
  "Symbole adinkra akan : « retourne chercher ce qui est resté derrière », apprendre du passé.",
  "Akan adinkra symbol: “go back and fetch what was left behind”, learning from the past."
 ],
 "dwennimmen": [
  "Les cornes du bélier : la force alliée à l'humilité, en adinkra.",
  "The ram's horns: strength paired with humility, in adinkra."
 ],
 "adinkrahene": [
  "Le « roi des symboles adinkra », emblème de grandeur et de charisme.",
  "The “king of adinkra symbols”, an emblem of greatness and charisma."
 ],
 "kente": [
  "Tissé en bandes étroites cousues ensemble par les Ashanti et les Ewe du Ghana.",
  "Woven in narrow strips sewn together by the Ashanti and Ewe of Ghana."
 ],
 "wax": [
  "Imprimé à la cire inspiré du batik indonésien, devenu l'emblème de la mode ouest-africaine.",
  "A wax print inspired by Indonesian batik that became an icon of West African fashion."
 ],
 "cauri": [
  "Ce coquillage a servi de monnaie en Afrique de l'Ouest pendant des siècles.",
  "This shell served as currency in West Africa for centuries."
 ],
 "djenne": [
  "Le plus grand édifice en banco du monde ; on le recrépit chaque année lors d'une fête collective.",
  "The world's largest mud-brick building, re-plastered every year during a community festival."
 ],
 "musgum": [
  "Les cases obus des Mousgoum se bâtissent sans échafaudage : les reliefs servent de prises.",
  "Musgum domes are built without scaffolding: the ridges serve as footholds."
 ],
 "lalibela": [
  "Onze églises monolithes taillées dans la roche en Éthiopie, aux XIIe et XIIIe siècles.",
  "Eleven monolithic churches carved out of rock in Ethiopia in the 12th and 13th centuries."
 ],
 "zimbabwe": [
  "Cité de pierres assemblées sans mortier, le Grand Zimbabwe a donné son nom au pays.",
  "A city of stones laid without mortar, Great Zimbabwe gave the country its name."
 ],
 "pyramides": [
  "La grande pyramide de Gizeh est restée la plus haute construction humaine pendant près de 4 000 ans.",
  "The Great Pyramid of Giza remained the tallest human-made structure for nearly 4,000 years."
 ],
 "kilimandjaro": [
  "Plus haut sommet d'Afrique, il culmine à 5 895 m en Tanzanie.",
  "Africa's highest peak, rising to 5,895 m in Tanzania."
 ],
 "volcan": [
  "Le mont Cameroun est l'un des volcans les plus actifs d'Afrique.",
  "Mount Cameroon is one of Africa's most active volcanoes."
 ],
 "mobilemoney": [
  "Lancé au Kenya en 2007, M-Pesa a popularisé le paiement par téléphone sur tout le continent.",
  "Launched in Kenya in 2007, M-Pesa made phone payments popular across the continent."
 ],
 "okapi": [
  "Cousin de la girafe, il ne vit à l'état sauvage qu'en RD Congo.",
  "A relative of the giraffe, it lives in the wild only in the DR Congo."
 ],
 "pangolin": [
  "Ses écailles sont en kératine, comme nos ongles ; c'est l'un des mammifères les plus braconnés.",
  "Its scales are made of keratin, like our nails; it is one of the most poached mammals."
 ],
 "cameleon": [
  "Madagascar abrite près de la moitié des espèces de caméléons du monde.",
  "Madagascar is home to nearly half of the world's chameleon species."
 ],
 "jebena": [
  "La cafetière de la cérémonie du café éthiopienne, pays berceau de l'arabica.",
  "The pot of the Ethiopian coffee ceremony, in the birthplace of arabica."
 ],
 "awale": [
  "L'un des plus anciens jeux de stratégie du monde, joué avec des graines.",
  "One of the world's oldest strategy games, played with seeds."
 ],
 "ghanamustgo": [
  "Le sac à carreaux doit son nom à l'expulsion des immigrés ghanéens du Nigeria en 1983.",
  "The checked bag is named after the expulsion of Ghanaian migrants from Nigeria in 1983."
 ],
 "keke": [
  "Au Nigeria, on l'appelle « keke NAPEP », du nom d'un programme de lutte contre la pauvreté.",
  "In Nigeria it is called “keke NAPEP”, after a poverty-reduction programme."
 ],
 "tontine": [
  "Épargne collective : chacun cotise, et chacun reçoit la cagnotte à son tour.",
  "Rotating savings: everyone contributes, and each member takes the pot in turn."
 ],
 "ndebele": [
  "Les femmes ndebele d'Afrique du Sud peignent les façades de motifs géométriques éclatants.",
  "Ndebele women in South Africa paint house fronts with bold geometric patterns."
 ],
 "bogolan": [
  "Le motif est peint à la boue fermentée : « bogo » veut dire terre en bambara.",
  "The pattern is painted with fermented mud: “bogo” means earth in Bambara."
 ],
 "croixagadez": [
  "Chaque ville touarègue a sa croix ; celle d'Agadez est la plus célèbre.",
  "Each Tuareg town has its own cross; Agadez's is the best known."
 ],
 "vuvuzela": [
  "Elle a fait le tour du monde pendant la Coupe du monde 2010 en Afrique du Sud.",
  "It went global during the 2010 World Cup in South Africa."
 ],
 "mototaxi": [
  "Benskin au Cameroun, zémidjan au Bénin, okada au Nigeria, boda-boda en Afrique de l'Est.",
  "Benskin in Cameroon, zemidjan in Benin, okada in Nigeria, boda-boda in East Africa."
 ],
 "taxibrousse": [
  "Car rapide à Dakar, trotro à Accra, danfo à Lagos, matatu à Nairobi.",
  "Car rapide in Dakar, trotro in Accra, danfo in Lagos, matatu in Nairobi."
 ],
 "harmattan": [
  "Vent sec et poussiéreux venu du Sahara, il souffle sur l'Afrique de l'Ouest de novembre à mars.",
  "A dry, dusty Saharan wind that blows over West Africa from November to March."
 ],
 "foufou": [
  "Igname, manioc ou plantain pilés jusqu'à former une pâte, à tremper dans la sauce.",
  "Yam, cassava or plantain pounded into a dough, dipped in sauce."
 ],
 "bamileke": [
  "Dans les chefferies de l'Ouest-Cameroun, la grande case est coiffée d'un haut toit conique.",
  "In West Cameroon's chiefdoms, the great hut is crowned with a tall conical roof."
 ]
};
