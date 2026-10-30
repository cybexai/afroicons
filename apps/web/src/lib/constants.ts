import type { AfroiconData } from "afroicons";
import AFRO_DATA from "../generated/afro.json";
import UI_ICONS from "afroicons-ui/icons.json";

/** Une icône du site : icône Afroicons, ou icône d'interface (paquet afroicons-ui, nom Lucide dans `lucide`). */
export type Icon = Omit<AfroiconData, "id" | "cat" | "region" | "fill" | "variantOf"> & { id: string; cat: string; region: string; fill?: string; variantOf?: string; lucide?: string; family?: string; _hay?: string; _n?: string };
/** Les drapeaux gardent leurs couleurs officielles : ni couleur, ni style, ni épaisseur ne s'y appliquent. */
export const isFlag = (i: Icon) => i.cat === "drapeaux";
export type Style = "line" | "fill" | "badge" | "circle";
/** Styles qui gardent la couleur du texte (trait et rempli), par opposition aux pastilles. */
export const lineLike = (s: Style) => s === "line" || s === "fill";
export type CityId = keyof typeof CITIES;

/** Version affichée (0.4 pour 0.4.0), lue dans package.json au build. */
export const VERSION = __AFROICONS_VERSION__.split(".").slice(0, 2).join(".");
const ORDER = ["nature", "faune", "musique", "symboles", "cuisine", "vie", "architecture"];
/** Les icônes culturelles (paquets afroicons et afroicons-react). */
export const AFRO: Icon[] = (AFRO_DATA as Icon[]).filter((i) => !isFlag(i)).sort((a, b) => ORDER.indexOf(a.cat) - ORDER.indexOf(b.cat));
/** Les drapeaux des 54 pays, par ordre alphabétique (même paquets ; leur version remplie est la même). */
export const FLAGS: Icon[] = (AFRO_DATA as Icon[]).filter(isFlag).map((i) => ({ ...i, fill: i.body })).sort((a, b) => a.country!.fr.localeCompare(b.country!.fr, "fr"));

/** Charge (une seule fois) les versions remplies des icônes culturelles. */
let fillsLoading: Promise<void> | null = null;
export const loadFills = () => (fillsLoading ??= import("../generated/fills.json").then((m) => {
  const f = m.default as Record<string, string>;
  for (const i of AFRO) i.fill = f[i.id];
}));
const uiId = (n: string) => "ui-" + n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([a-zA-Z])(\d)/g, "$1-$2").toLowerCase();
/** Les icônes d'interface (paquet afroicons-ui), placées dans la catégorie « Interface ». */
export const UI: Icon[] = (UI_ICONS as { id: string; fr: string; en: string; family: string; afro: string | null; body: string }[]).map((u) => ({
  id: uiId(u.id), lucide: u.id, family: u.family, fr: u.fr, en: u.en, cat: "interface", region: "pan", since: "ui", body: u.body,
  tags: [u.id, u.family, ...(u.afro ? ["afrique", ...(u.afro.toLowerCase().match(/[a-zà-ÿ]{4,}/g) ?? [])] : [])],
}));
export const ICONS: Icon[] = [...AFRO, ...FLAGS, ...UI];
export type Collection = "afro" | "flags" | "ui";
export const colOf = (id: string): Collection => (id.startsWith("ui-") ? "ui" : id.startsWith("drapeau-") ? "flags" : "afro");
export const byId: Record<string, Icon> = Object.fromEntries(ICONS.map((i) => [i.id, i]));
export const isNew = (i: Icon) => i.since === VERSION;

export const CATS = [
  { id: "all", fr: "Toutes", en: "All", ic: "afrique" },
  { id: "nature", fr: "Nature & paysages", en: "Nature", ic: "baobab" },
  { id: "faune", fr: "Faune", en: "Wildlife", ic: "elephant" },
  { id: "musique", fr: "Musique & arts", en: "Music & arts", ic: "djembe" },
  { id: "symboles", fr: "Symboles & textiles", en: "Symbols & textiles", ic: "sankofa" },
  { id: "cuisine", fr: "Cuisine", en: "Food", ic: "marmite" },
  { id: "vie", fr: "Vie quotidienne", en: "Daily life", ic: "mototaxi" },
  { id: "architecture", fr: "Architecture", en: "Architecture", ic: "case" },
  { id: "interface", fr: "Interface", en: "Interface", ic: "ui-layout-dashboard" },
  { id: "drapeaux", fr: "Drapeaux", en: "Flags", ic: "drapeau-cameroun" },
] as const;
export const catOf = (id: string) => CATS.find((c) => c.id === id) ?? CATS[0];

/** Familles des icônes d'interface : les sous-filtres de la collection « Interface ». */
export const FAMILIES = [
  { id: "Actions", fr: "Actions", en: "Actions", ic: "ui-plus" },
  { id: "Navigation", fr: "Navigation", en: "Navigation", ic: "ui-arrow-right" },
  { id: "Statuts et alertes", fr: "Statuts et alertes", en: "Status & alerts", ic: "ui-alert-triangle" },
  { id: "Documents et données", fr: "Documents et données", en: "Documents & data", ic: "ui-file-text" },
  { id: "Communication", fr: "Communication", en: "Communication", ic: "ui-message-square" },
  { id: "Personnes", fr: "Personnes", en: "People", ic: "ui-users" },
  { id: "Argent et paiement", fr: "Argent et paiement", en: "Money & payments", ic: "ui-wallet" },
  { id: "Commerce et stock", fr: "Commerce et stock", en: "Retail & stock", ic: "ui-store" },
  { id: "Thème et météo", fr: "Thème et météo", en: "Theme & weather", ic: "ui-moon" },
] as const;

export const REGS = [
  { id: "all", fr: "Toute l'Afrique", en: "All Africa" },
  { id: "ouest", fr: "Ouest", en: "West" },
  { id: "centre", fr: "Centre", en: "Central" },
  { id: "est", fr: "Est", en: "East" },
  { id: "nord", fr: "Nord", en: "North" },
  { id: "australe", fr: "Australe", en: "Southern" },
] as const;

export const REGNAME: Record<string, { fr: string; en: string }> = {
  pan: { fr: "Panafricain", en: "Pan-African" },
  ouest: { fr: "Afrique de l'Ouest", en: "West Africa" },
  centre: { fr: "Afrique centrale", en: "Central Africa" },
  est: { fr: "Afrique de l'Est", en: "East Africa" },
  nord: { fr: "Afrique du Nord", en: "North Africa" },
  australe: { fr: "Afrique australe", en: "Southern Africa" },
};

export const CITIES = {
  douala: { n: "Douala", c: ["#C24E2A", "#E3A22F", "#22305C", "#2E6B4E"], bg: "#F6EBDA" },
  dakar: { n: "Dakar", c: ["#1F5FA8", "#E8B04B", "#7A2E1F", "#0E8C7A"], bg: "#F4EEE2" },
  marrakech: { n: "Marrakech", c: ["#2E4AB0", "#E8A33D", "#8E2F4C", "#3E7D5A"], bg: "#F7ECE2" },
  lagos: { n: "Lagos", c: ["#0F8A4B", "#E2C044", "#C2326E", "#1D2B4F"], bg: "#EFF3EA" },
  zanzibar: { n: "Zanzibar", c: ["#138A8A", "#F07A55", "#26415E", "#F2C14E"], bg: "#EAF5F1" },
  kinshasa: { n: "Kinshasa", c: ["#1D8FD8", "#F5C518", "#D7262E", "#183A2B"], bg: "#EEF4FA" },
};

export const PALS: Record<string, { n: string; bg: string; c: string[] }> = {
  ...Object.fromEntries(Object.entries(CITIES).map(([k, v]) => [k, { n: v.n, bg: v.bg, c: v.c }])),
  nuit: { n: "Nuit", bg: "#14110E", c: ["#E3A22F", "#C24E2A", "#F3EADC", "#3FA37E"] },
  bogolan: { n: "Bogolan", bg: "#2B1E14", c: ["#E9DCC3", "#C9A27A", "#E9DCC3", "#8C6A4A"] },
  indigo: { n: "Adire", bg: "#1C2A4E", c: ["#DCE6F5", "#8FA9D8", "#DCE6F5", "#5E7BBE"] },
};

export const REPO = "https://github.com/cybexai/afroicons";

// Villes du titre, avec la préposition qui convient en français (du Caire, d'Abidjan…).
export const ROT_CITIES: { fr: string; en: string }[] = [
  { fr: "de Douala", en: "from Douala" },
  { fr: "de Dakar", en: "from Dakar" },
  { fr: "de Lagos", en: "from Lagos" },
  { fr: "de Nairobi", en: "from Nairobi" },
  { fr: "de Kinshasa", en: "from Kinshasa" },
  { fr: "d'Abidjan", en: "from Abidjan" },
  { fr: "du Caire", en: "from Cairo" },
  { fr: "d'Addis-Abeba", en: "from Addis Ababa" },
  { fr: "d'Accra", en: "from Accra" },
  { fr: "de Johannesburg", en: "from Johannesburg" },
  { fr: "de Marrakech", en: "from Marrakesh" },
  { fr: "de Yaoundé", en: "from Yaoundé" },
];
export const STYLES: { id: Style; fr: string; en: string }[] = [
  { id: "line", fr: "Trait", en: "Line" },
  { id: "fill", fr: "Rempli", en: "Filled" },
  { id: "badge", fr: "Pastille", en: "Badge" },
  { id: "circle", fr: "Cercle", en: "Circle" },
];
export const SHOWCASE = ["baobab", "djembe", "sankofa", "mototaxi", "case", "kora", "masque", "calebasse", "elephant", "mobilemoney", "pirogue", "djenne", "musgum", "cameleon", "ananas", "taxibrousse"].filter((id) => byId[id]);

/** Page affichée : l'accueil, ou le journal des versions (afroicons.org/nouveautes/). */
export const PAGE: "home" | "news" = /^\/nouveautes\/?$/.test(location.pathname) ? "news" : "home";
