import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CITIES, byId, type CityId, type Icon, type Style } from "./lib/constants";
import { EN, FR, type Lang } from "./lib/i18n";
import { isHosted, saveFile, store, useCapability } from "./lib/platform";
import type { PatternState } from "./lib/pattern";

export type Mode = "light" | "dark";
const THEME = {
  light: { ink: "#1F1A15", bg: "#FBF5EA", card: "#FFFFFF" },
  dark: { ink: "#F3EADC", bg: "#14110E", card: "#1B1713" },
};

/** Adresses de la forme /icones/<id>/ : seulement sur le vrai site (pas dans l'aperçu en un seul fichier). */
const PRETTY_URLS = import.meta.env.MODE !== "single" && /^https?:$/.test(location.protocol);

const hostDark = () => {
  const h = document.documentElement;
  return h.dataset.theme === "dark" || h.classList.contains("dark") || matchMedia("(prefers-color-scheme: dark)").matches;
};

function useAppState() {
  const [lang, _setLang] = useState<Lang>(() => store.get<Lang>("lang", "fr"));
  const savedMode = store.get<Mode | null>("theme", null);
  const [mode, _setMode] = useState<Mode>(() => savedMode ?? (hostDark() ? "dark" : "light"));
  const modeLocked = useRef(!!savedMode);
  const [city, _setCity] = useState<CityId>(() => {
    const c = store.get<string>("city", "douala");
    return (c in CITIES ? c : "douala") as CityId;
  });

  // Personnalisation des icônes
  const [color, setColor] = useState<string | null>(null);
  const [bg, setBg] = useState<string | null>(null);
  const [stroke, setStroke] = useState(1.75);
  const [size, setSize] = useState(40);
  const [style, setStyle] = useState<Style>("line");

  // Collections
  const [favs, setFavs] = useState<Set<string>>(() => new Set(store.get<string[]>("fav", [])));
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [selecting, setSelecting] = useState(false);

  // Fenêtres
  const [current, setCurrent] = useState<string | null>(null);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [list, setList] = useState<Icon[]>([]); // icônes visibles dans la grille (pour ← → dans la fiche)

  const [pattern, setPattern] = useState<PatternState>({ pal: city, icons: ["baobab", "djembe", "cauri", "sankofa", "calebasse", "case"], lay: "brick", rot: "tilt", den: 76, str: 1.75, seed: 7 });

  // Capacités facultatives (Claude)
  const [downloads, setDownloads] = useState<any>(null);
  useEffect(() => { useCapability("downloads").then(setDownloads); }, []);

  const canDownload = !!downloads || !isHosted();

  // Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastT = useRef<number>();
  const toast = useCallback((m: string) => {
    setToastMsg(m);
    clearTimeout(toastT.current);
    toastT.current = window.setTimeout(() => setToastMsg(null), 1800);
  }, []);

  // Les attributs du document sont posés AVANT le rendu, pour que le CSS suive immédiatement.
  const setMode = useCallback((m: Mode, user = true) => {
    document.documentElement.dataset.mode = m;
    if (user) { store.set("theme", m); modeLocked.current = true; }
    _setMode(m);
  }, []);
  const setCity = useCallback((c: CityId) => {
    document.documentElement.dataset.city = c;
    store.set("city", c);
    _setCity(c);
    setBg(null);
    setPattern((p) => ({ ...p, pal: c }));
  }, []);
  const setLang = useCallback((l: Lang) => { document.documentElement.lang = l; store.set("lang", l); _setLang(l); }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    document.documentElement.dataset.city = city;
    document.documentElement.lang = lang;
    // Suit le thème de l'application hôte ou du système tant que l'utilisateur n'a rien choisi.
    const follow = () => { if (!modeLocked.current) setMode(hostDark() ? "dark" : "light", false); };
    const mo = new MutationObserver(follow);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    const mq = matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", follow);
    return () => { mo.disconnect(); mq.removeEventListener("change", follow); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const t = useCallback((k: string) => (lang === "en" ? EN[k] ?? FR[k] : FR[k] ?? EN[k]) ?? k, [lang]);
  const tt = useCallback((fr: string, en: string) => (lang === "en" ? en : fr), [lang]);

  const theme = THEME[mode];
  const pal = CITIES[city].c;
  const ink = color ?? theme.ink;
  const badgeBg = bg ?? pal[0];

  const copy = useCallback(async (text: string, msg?: string) => {
    try { await navigator.clipboard.writeText(text); toast(msg ?? tt("Copié dans le presse-papiers", "Copied to clipboard")); }
    catch { toast(tt("Copie bloquée par le navigateur", "Copy blocked by the browser")); }
  }, [toast, tt]);

  const save = useCallback(async (name: string, data: string | Blob) => {
    const r = await saveFile(downloads, name, data);
    if (r === "saved") toast(tt("Téléchargement prêt", "Download ready"));
    else if (r === "error") toast(tt("Téléchargement impossible", "Download failed"));
  }, [downloads, toast, tt]);

  const favsRef = useRef(favs);
  favsRef.current = favs;
  const toggleFav = useCallback((id: string) => {
    const n = new Set(favsRef.current);
    const had = n.has(id);
    had ? n.delete(id) : n.add(id);
    setFavs(n);
    store.set("fav", [...n]);
    toast(had ? tt("Retirée des favoris", "Removed from favourites") : tt("Ajoutée aux favoris", "Added to favourites"));
  }, [toast, tt]);

  const toggleSel = useCallback((id: string) => {
    setSel((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }, []);

  const openIcon = useCallback((id: string | null) => {
    if (id && !byId[id]) return;
    setCurrent(id);
    // Sur afroicons.org, chaque icône a sa propre adresse (/icones/baobab/), indexable et partageable.
    // Ailleurs (aperçu en un seul fichier, fichier local), on garde l'ancre #baobab.
    try {
      if (PRETTY_URLS) history.replaceState(null, "", id ? `/icones/${id}/` : "/" + location.search);
      else history.replaceState(null, "", id ? "#" + id : location.pathname + location.search);
    } catch { /* bac à sable */ }
  }, []);

  return {
    lang, setLang, t, tt, mode, setMode, city, setCity, theme, pal, ink, badgeBg,
    color, setColor, bg, setBg, stroke, setStroke, size, setSize, style, setStyle,
    favs, toggleFav, sel, setSel, toggleSel, selecting, setSelecting,
    current, openIcon, cmdOpen, setCmdOpen, helpOpen, setHelpOpen, list, setList,
    pattern, setPattern, downloads, canDownload, toast, toastMsg, copy, save,
  };
}

export type App = ReturnType<typeof useAppState>;
const Ctx = createContext<App | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const s = useAppState();
  return <Ctx.Provider value={s}>{children}</Ctx.Provider>;
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp hors de AppProvider");
  return v;
}

/** Nom localisé d'une icône. */
export const useName = () => {
  const { lang } = useApp();
  return useMemo(() => (i: Icon) => (lang === "en" ? i.en : i.fr), [lang]);
};
