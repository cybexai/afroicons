import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { AFRO, DEFAULT_TONE, EMOJIS, FLAGS, ICONS, TONE_LIST, TONES, UI, byId, colOf, isColor, type Collection, type Icon, type Style, type Tone } from "../lib/constants";
import { IS_MAC, MOD, store } from "../lib/platform";
import { rank } from "../lib/search";
import { highlight, pascal } from "../lib/svg";
import { useApp } from "../state";
import { zipIcons } from "./Overlays";
import { AFRICA, ANIMS, ScreenView, VISIONS, VisionFilters, animCss, fixPrimary, mix, paletteOf, ratio, type Anim, type Pair, type Pins, type Vision } from "./PlaygroundLab";
import { IClose, ISearch, Svg } from "./ui";

/* Bac à sable : les icônes dans des interfaces réalistes (application web, mobile, paiement, vitrine…), réglées
   comme le site du développeur, avec le code des icônes utilisées. Chaque emplacement est cliquable pour changer
   d'icône ; les réglages se partagent par un lien (#…) et sont gardés dans ce navigateur. */

const ui = (n: string) => "ui-" + n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([a-zA-Z])(\d)/g, "$1-$2").toLowerCase();
type Slots = Record<string, string>;
const BASE: Slots = {
  logo: "case", search: ui("Search"), bell: ui("Bell"), user: ui("UserCircle"), menu: ui("Menu"),
  s1: ui("LayoutDashboard"), s2: ui("ShoppingCart"), s3: ui("Boxes"), s4: ui("Users"), s5: ui("Wallet"), s6: ui("Settings"), s7: ui("LogOut"),
  k1: ui("TrendingUp"), k2: ui("Banknote"), k3: ui("Package"),
  b1: ui("Plus"), b2: ui("Download"),
  o1: ui("CheckCircle"), o2: ui("Clock"), o3: ui("XCircle"), a1: ui("Eye"), a2: ui("Pencil"), a3: ui("Trash2"),
  t1: ui("Home"), t2: ui("Store"), t3: ui("Wallet"), t4: ui("MessageCircle"), t5: ui("User"),
  l1: ui("Truck"), l2: ui("Receipt"), l3: ui("Phone"), l4: ui("MapPin"), fab: ui("Plus"),
  p1: "mobilemoney", p2: ui("CreditCard"), p3: ui("Landmark"), lock: ui("Lock"),
  n1: ui("CheckCircle"), n2: ui("AlertTriangle"), n3: ui("Info"), x: ui("X"),
  e1: "panier", e2: ui("Plus"), f1: "mobilemoney", f2: "mototaxi", f3: "boutique", go: ui("ArrowRight"),
};
// Emplacements « mobile » : leurs libellés sont repris dans la maquette.
const PRESETS: { id: string; fr: string; en: string; slots: Partial<Slots> }[] = [
  { id: "erp", fr: "Gestion (ERP)", en: "Business (ERP)", slots: {} },
  { id: "money", fr: "Mobile money", en: "Mobile money", slots: { logo: "cauri", s2: ui("Send"), s3: ui("CreditCard"), s4: ui("Landmark"), s5: ui("PiggyBank"), k1: ui("HandCoins"), k2: ui("Percent"), k3: ui("ShieldCheck"), t2: ui("Send"), t3: ui("CreditCard"), l1: ui("Landmark"), l2: ui("Receipt"), l3: ui("Smartphone"), l4: ui("ShieldCheck"), e1: "tontine", f1: "mobilemoney", f2: "tontine", f3: "cauri" } },
  { id: "shop", fr: "Boutique en ligne", en: "Online shop", slots: { logo: "panier", s2: ui("ShoppingBag"), s3: ui("Tag"), s4: ui("Truck"), s5: ui("Star"), k1: ui("ShoppingCart"), k2: ui("Tag"), k3: ui("Truck"), t2: ui("ShoppingBag"), t3: ui("ShoppingCart"), l1: ui("Package"), l2: ui("Truck"), l3: ui("MapPin"), l4: ui("CreditCard"), e1: "panier", e2: ui("Plus"), f1: "panier", f2: "mototaxi", f3: "etal" } },
  { id: "agri", fr: "Agriculture", en: "Farming", slots: { logo: "epimil", s2: ui("Sprout"), s3: ui("Tractor"), s4: ui("Warehouse"), s5: ui("Scale"), k1: ui("Sprout"), k2: ui("CloudOff"), k3: ui("Calendar"), t2: ui("Sprout"), t3: ui("Tractor"), l1: ui("Calendar"), l2: ui("Scale"), l3: ui("Truck"), l4: ui("MapPin"), e1: "houe", f1: "houe", f2: "pluie", f3: "baobab" } },
  { id: "health", fr: "Santé", en: "Health", slots: { logo: "calebasse", s2: ui("Stethoscope"), s3: ui("Pill"), s4: ui("CalendarCheck"), s5: ui("FileText"), k1: ui("Activity"), k2: ui("CalendarCheck"), k3: ui("Pill"), t2: ui("Stethoscope"), t3: ui("CalendarCheck"), l1: ui("Pill"), l2: ui("FileText"), l3: ui("Phone"), l4: ui("MapPin"), e1: "calebasse", f1: "calebasse", f2: "panneausolaire", f3: "taxibrousse" } },
];
const SWATCHES = ["#C24E2A", "#E3A22F", "#22305C", "#2E6B4E", "#7B4BA8", "#0F766E", "#1F1A15"];
const FONTS: { id: string; n: string; en?: string; css: string }[] = [
  { id: "dm", n: "DM Sans", css: '"DM Sans",system-ui,sans-serif' },
  { id: "brico", n: "Bricolage", css: '"Bricolage Grotesque","DM Sans",sans-serif' },
  { id: "sys", n: "Système", en: "System", css: "system-ui,-apple-system,'Segoe UI',Roboto,sans-serif" },
  { id: "serif", n: "Serif", css: "Georgia,'Times New Roman',serif" },
  { id: "mono", n: "Mono", css: '"JetBrains Mono",ui-monospace,monospace' },
];
type View = "all" | "web" | "mobile" | "site" | "screen";
// Les appareils autour des maquettes : forme du téléphone, et cadre de l'application web et du site vitrine.
type Phone = "iphone" | "android" | "classic";
type Desk = "laptop" | "monitor" | "browser" | "tablet";
const PHONES: { id: Phone; fr: string; en: string }[] = [{ id: "iphone", fr: "iPhone", en: "iPhone" }, { id: "android", fr: "Android", en: "Android" }, { id: "classic", fr: "Classique", en: "Classic" }];
const DESKS: { id: Desk; fr: string; en: string }[] = [{ id: "laptop", fr: "Portable", en: "Laptop" }, { id: "monitor", fr: "Écran", en: "Monitor" }, { id: "browser", fr: "Navigateur", en: "Browser" }, { id: "tablet", fr: "Tablette", en: "Tablet" }];
type Cfg = { primary: string; dark: boolean; radius: number; size: number; stroke: number; style: Style; tint: "text" | "primary"; name: string; font: string; phone: Phone; desk: Desk; anim: Anim };
const DEF: Cfg = { primary: "#C24E2A", dark: false, radius: 12, size: 20, stroke: 1.75, style: "line", tint: "text", name: "NAFA ERP", font: "dm", phone: "iphone", desk: "laptop", anim: "none" };
/** Personnalisation d'une icône d'emplacement ; un champ absent reprend le réglage général. */
type Cust = { style?: "line" | "fill"; color?: string; scale?: number; stroke?: number; shape?: "round" | "circle"; bg?: string; rot?: number; flip?: boolean; tone?: Tone };
type Custs = Record<string, Cust>;
type Saved = { cfg: Cfg; slots: Slots; preset: string; custom?: Custs };
const HEX = /^#[0-9a-f]{6}$/i;
// Seuls les champs connus et bien formés sont repris (lien partagé ou réglages anciens).
function cleanCust(o: any): Cust | null {
  if (!o || typeof o !== "object") return null;
  const c: Cust = {};
  if (o.style === "line" || o.style === "fill") c.style = o.style;
  if (HEX.test(o.color ?? "")) c.color = o.color;
  if (typeof o.scale === "number" && o.scale >= 0.5 && o.scale <= 3) c.scale = o.scale;
  if (typeof o.stroke === "number" && o.stroke >= 0.5 && o.stroke <= 3) c.stroke = o.stroke;
  if (o.shape === "round" || o.shape === "circle") c.shape = o.shape;
  if (HEX.test(o.bg ?? "")) c.bg = o.bg;
  if ([90, 180, 270].includes(o.rot)) c.rot = o.rot;
  if (o.flip === true) c.flip = true;
  if (o.tone in TONES) c.tone = o.tone;
  return Object.keys(c).length ? c : null;
}
const cleanCusts = (o: any): Custs => Object.fromEntries(Object.entries(o ?? {}).filter(([k]) => k in BASE || isPin(k)).map(([k, v]) => [k, cleanCust(v)]).filter(([, v]) => v)) as Custs;

// Lien partageable : les réglages et les icônes choisies, encodés dans l'ancre de l'adresse.
const isPin = (k: string) => /^u\d+$/.test(k);
const strip = (s: Saved): Saved => ({ ...s, slots: Object.fromEntries(Object.entries(s.slots).filter(([k]) => !isPin(k))), custom: Object.fromEntries(Object.entries(s.custom ?? {}).filter(([k]) => !isPin(k))) });
const enc = (s: Saved) => btoa(unescape(encodeURIComponent(JSON.stringify({ c: s.cfg, p: s.preset, s: Object.fromEntries(Object.entries(s.slots).filter(([k, v]) => k in BASE && v !== BASE[k])), u: strip(s).custom })))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
function dec(h: string): Saved | null {
  try {
    const o = JSON.parse(decodeURIComponent(escape(atob(h.replace(/-/g, "+").replace(/_/g, "/")))));
    const slots = { ...BASE };
    for (const [k, v] of Object.entries(o.s ?? {})) if (k in BASE && typeof v === "string" && byId[v]) slots[k] = v;
    const cfg = { ...DEF };
    for (const k of Object.keys(DEF) as (keyof Cfg)[]) if (o.c?.[k] != null && typeof o.c[k] === typeof DEF[k]) (cfg as any)[k] = o.c[k];
    if (!["line", "fill"].includes(cfg.style)) cfg.style = "line";
    if (!PHONES.some((x) => x.id === cfg.phone)) cfg.phone = DEF.phone;
    if (!DESKS.some((x) => x.id === cfg.desk)) cfg.desk = DEF.desk;
    if (!ANIMS.some((x) => x.id === cfg.anim)) cfg.anim = DEF.anim;
    cfg.name = cfg.name === "Kola" ? DEF.name : cfg.name.slice(0, 24);
    if (!HEX.test(cfg.primary)) cfg.primary = DEF.primary;
    const clamp = (v: number, lo: number, hi: number, d: number) => (Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : d);
    cfg.size = clamp(cfg.size, 14, 32, DEF.size); cfg.radius = clamp(cfg.radius, 0, 24, DEF.radius); cfg.stroke = clamp(cfg.stroke, 1, 2.5, DEF.stroke);
    if (cfg.tint !== "text" && cfg.tint !== "primary") cfg.tint = DEF.tint;
    if (!FONTS.some((f) => f.id === cfg.font)) cfg.font = DEF.font;
    return { cfg, slots, preset: PRESETS.some((p) => p.id === o.p) ? o.p : "erp", custom: cleanCusts(o.u) };
  } catch { return null; }
}
// Le lien d'abord, sinon les réglages gardés dans ce navigateur, passés par la même validation.
const initial = (): Saved => {
  const st = store.get<Partial<Saved> | null>("playground", null);
  let kept: Saved | null = null;
  try { if (st) kept = dec(enc({ cfg: { ...DEF, ...st.cfg }, slots: { ...BASE, ...st.slots }, preset: st.preset ?? "erp", custom: st.custom })); } catch { kept = null; }
  return dec(location.hash.slice(1)) ?? kept ?? { cfg: DEF, slots: { ...BASE }, preset: "erp" };
};
const noPin = <T,>(o: Record<string, T>) => Object.fromEntries(Object.entries(o).filter(([k]) => !isPin(k)));
const onlyPin = <T,>(o: Record<string, T>) => Object.fromEntries(Object.entries(o).filter(([k]) => isPin(k)));

/* Icônes et boutons des maquettes : composants stables (pas de remontage à chaque réglage, le focus reste en place). */
type Kit = { paint: (k: string, s: number, c?: string) => JSX.Element; pick: string | null; open: (k: string) => void; custom: Custs; slots: Slots; logo: string | null; size: number };
const KitCtx = createContext<Kit | null>(null);
/** Une icône d'emplacement : cliquable pour la remplacer ou la personnaliser. */
function I({ k, s, c }: { k: string; s?: number; c?: string }) {
  const x = useContext(KitCtx)!, a = useApp(), sz = s ?? x.size;
  if (k === "logo" && x.logo) return <img className="pglogoimg" src={x.logo} alt="" style={{ height: sz + 8 }} />;
  const i = byId[x.slots[k]] ?? byId[BASE[k]];
  if (!i) return null;
  const label = a.tt("Remplacer ou personnaliser : ", "Swap or customise: ") + (a.lang === "en" ? i.en : i.fr);
  return <button type="button" className={"pgi" + (x.pick === k ? " on" : "") + (x.custom[k] ? " cu" : "")} title={label} aria-label={label} onClick={(e) => { e.stopPropagation(); x.open(k); }}>{x.paint(k, sz, c)}</button>;
}
/** Un bouton de maquette : cliquer n'importe où dessus change son icône. */
function B({ k, ghost, wide, after, children }: { k: string; ghost?: boolean; wide?: boolean; after?: boolean; children: string }) {
  const x = useContext(KitCtx)!;
  const icon = <I k={k} s={x.size - 2} c={ghost ? undefined : "#fff"} />;
  return <span className={"pgbtn" + (ghost ? " ghost" : "") + (wide ? " wide" : "") + (x.pick === k ? " on" : "")} role="presentation" onClick={(e) => { e.stopPropagation(); x.open(k); }}>{after ? <>{children}{icon}</> : <>{icon}{children}</>}</span>;
}

/** Grand écran : l'icône sélectionnée s'édite dans un panneau fixe à droite (sinon, dans une fenêtre). */
function useWide() {
  const q = "(min-width: 1280px)";
  const [w, setW] = useState(() => typeof matchMedia !== "undefined" && matchMedia(q).matches);
  useEffect(() => { const m = matchMedia(q), f = () => setW(m.matches); m.addEventListener("change", f); return () => m.removeEventListener("change", f); }, []);
  return w;
}

export function Playground() {
  const a = useApp();
  const wide = useWide();
  const [init] = useState(initial);
  const [preset, setPreset] = useState(init.preset);
  const [slots, setSlots] = useState<Slots>({ ...BASE, ...init.slots });
  const [custom, setCustom] = useState<Custs>(() => cleanCusts(init.custom));
  const [dtab, setDtab] = useState<"swap" | "edit">("swap"); // onglet de la fenêtre d'icône, gardé d'une ouverture à l'autre
  const [cfg, setCfg] = useState<Cfg>({ ...DEF, ...init.cfg });
  const [pick, setPick] = useState<string | null>(null);
  const [view, setView] = useState<View>("all");
  const [flash, setFlash] = useState(false); // « Les montrer » : entoure un instant toutes les icônes modifiables
  const [lucide, setLucide] = useState(false);
  const [L, setL] = useState<Record<string, ComponentType<any>> | null>(null);
  const [tab, setTab] = useState<"react" | "angular" | "html" | "css">("react");
  const [vision, setVision] = useState<Vision>("none");
  const [replay, setReplay] = useState(false); // « Rejouer » : anime toutes les icônes une fois
  const timers = useRef<Record<string, number>>({});
  const pulse = (k: string, on: (v: boolean) => void, ms: number) => {
    clearTimeout(timers.current[k]); on(false);
    requestAnimationFrame(() => { on(true); timers.current[k] = window.setTimeout(() => on(false), ms); });
  };
  const [logo, setLogo] = useState<{ url: string; colors: string[] } | null>(null);
  const [shot, setShot] = useState<string | null>(null);
  const [pins, setPins] = useState<Pins>({});
  const pinN = useRef(0);
  const set = (p: Partial<Cfg>) => setCfg((c) => ({ ...c, ...p }));
  const anyFill = cfg.style === "fill" || Object.values(custom).some((c) => c.style === "fill");
  useEffect(() => { if (anyFill) a.needFills(); }, [anyFill]); // eslint-disable-line react-hooks/exhaustive-deps
  // Comparaison avec Lucide : chargée seulement à la demande (paquet volumineux).
  useEffect(() => { if (lucide && !L) import("lucide-react").then((m) => setL(m as unknown as Record<string, ComponentType<any>>)).catch(() => setLucide(false)); }, [lucide, L]);
  // Les réglages restent d'une visite à l'autre ; l'ancre de l'adresse les suit (lien partageable).
  const saved: Saved = { cfg, slots, preset, custom };
  const hash = enc(saved);
  useEffect(() => {
    store.set("playground", strip(saved));
    try { history.replaceState(null, "", location.pathname + location.search + "#" + hash); } catch { /* bac à sable */ }
  }, [hash]); // eslint-disable-line react-hooks/exhaustive-deps
  // Annuler / rétablir : un instantané des réglages par changement (les glissements de curseur comptent pour un).
  const apply = (v: Saved) => { setCfg(v.cfg); setSlots((sl) => ({ ...noPin(v.slots), ...onlyPin(sl) })); setPreset(v.preset); setCustom((m) => ({ ...noPin(v.custom ?? {}), ...onlyPin(m) })); };
  const hist = useRef({ past: [] as Saved[], future: [] as Saved[], last: saved, skip: false, t: 0 });
  const cur = useRef(saved); cur.current = saved;
  const [, tick] = useState(0);
  useEffect(() => {
    const h = hist.current;
    if (h.skip) { h.skip = false; h.last = cur.current; return; }
    const prev = h.last;
    clearTimeout(h.t);
    h.t = window.setTimeout(() => { if (enc(prev) !== enc(cur.current)) { h.past.push(prev); if (h.past.length > 80) h.past.shift(); h.future = []; } h.last = cur.current; tick((n) => n + 1); }, 400);
  }, [hash]);
  const step = useCallback((back: boolean) => {
    const h = hist.current;
    clearTimeout(h.t);
    if (enc(h.last) !== enc(cur.current)) { h.past.push(h.last); h.future = []; h.last = cur.current; }
    const from = back ? h.past : h.future, to = back ? h.future : h.past, v = from.pop();
    if (!v) return;
    to.push(cur.current); h.last = v;
    if (enc(v) !== enc(cur.current)) h.skip = true;
    apply(v); tick((n) => n + 1);
  }, []);
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || /^(INPUT|TEXTAREA|SELECT)$/.test((e.target as HTMLElement).tagName)) return;
      const k = e.key.toLowerCase();
      if (k === "z") { e.preventDefault(); step(!e.shiftKey); } else if (k === "y") { e.preventDefault(); step(false); }
    };
    addEventListener("keydown", f); return () => removeEventListener("keydown", f);
  }, [step]);
  // Version 100 % africaine : chaque icône d'interface qui a un équivalent culturel le prend.
  const africanize = () => {
    const n = Object.values(slots).filter((v) => AFRICA[v]).length;
    if (!n) { a.toast(a.tt("Déjà 100 % africain", "Already 100% African")); return; }
    setSlots((sl) => Object.fromEntries(Object.entries(sl).map(([k, v]) => [k, AFRICA[v] ?? v])));
    a.toast(a.tt(`${n} icônes remplacées par leur équivalent africain (${MOD}Z pour annuler)`, `${n} icons replaced by their African counterpart (${MOD}Z to undo)`));
  };
  // Logo importé : affiché dans les maquettes ; ses couleurs deviennent une palette.
  const logoTurn = useRef(0);
  const loadLogo = (f?: File | null) => {
    if (!f || !f.type.startsWith("image/")) return;
    const url = URL.createObjectURL(f), turn = ++logoTurn.current;
    paletteOf(url).then((colors) => {
      if (turn !== logoTurn.current) { URL.revokeObjectURL(url); return; }
      setLogo((o) => { if (o) URL.revokeObjectURL(o.url); return { url, colors }; }); if (colors[0]) set({ primary: colors[0] });
    });
  };
  const urls = useRef({ logo: "", shot: "" }); urls.current = { logo: logo?.url ?? "", shot: shot ?? "" };
  useEffect(() => () => { Object.values(timers.current).forEach(clearTimeout); for (const u of Object.values(urls.current)) if (u) URL.revokeObjectURL(u); }, []);
  const loadShot = useCallback((f: File) => { setShot((o) => { if (o) URL.revokeObjectURL(o); return URL.createObjectURL(f); }); }, []);
  const clearShot = () => {
    setShot((o) => { if (o) URL.revokeObjectURL(o); return null; });
    setPins({}); setSlots((sl) => Object.fromEntries(Object.entries(sl).filter(([k]) => !isPin(k)))); setCustom((m) => Object.fromEntries(Object.entries(m).filter(([k]) => !isPin(k))));
  };
  const addPin = (x: number, y: number) => {
    const k = "u" + ++pinN.current;
    setPins((p) => ({ ...p, [k]: { x, y } })); setSlots((sl) => ({ ...sl, [k]: "baobab" })); setDtab("swap"); setPick(k);
  };
  const removePin = (k: string) => {
    setPins((p) => { const o = { ...p }; delete o[k]; return o; }); setSlots((sl) => { const o = { ...sl }; delete o[k]; return o; }); setCustom((m) => { const o = { ...m }; delete o[k]; return o; }); setPick(null);
  };
  const choosePreset = (id: string) => { setPreset(id); setSlots((sl) => ({ ...BASE, ...PRESETS.find((p) => p.id === id)!.slots, ...Object.fromEntries(Object.entries(sl).filter(([k]) => isPin(k))) }) as Slots); };
  const reset = () => { setPreset("erp"); setSlots((sl) => ({ ...BASE, ...Object.fromEntries(Object.entries(sl).filter(([k]) => isPin(k))) })); setCfg(DEF); setCustom({}); a.toast(a.tt("Réglages par défaut rétablis", "Defaults restored")); };
  const share = () => a.copy(location.origin + location.pathname + "#" + hash, a.tt("Lien copié : il ouvre le bac à sable avec vos réglages", "Link copied: it opens the playground with your settings"));
  // Une icône culturelle au hasard dans chaque emplacement « africain » (logo, paiement, vitrine, état vide).
  const surprise = () => {
    const pool = AFRO.filter((i) => i.cat !== "cartes" && i.cat !== "monnaies"), r = () => pool[Math.floor(Math.random() * pool.length)].id;
    setSlots((s) => ({ ...s, logo: r(), e1: r(), f1: r(), f2: r(), f3: r() }));
  };

  const ink = cfg.dark ? "#F3EADC" : "#1F1A15", bg = cfg.dark ? "#14110E" : "#FFFFFF", surface = cfg.dark ? "#1E1915" : "#F6F2EA", muted = cfg.dark ? "#A79987" : "#73685B", line = cfg.dark ? "#2F2822" : "#E8DCC8";
  const font = (FONTS.find((f) => f.id === cfg.font) ?? FONTS[0]).css;
  const vars = { "--pp": cfg.primary, "--pink": ink, "--pbg": bg, "--psurf": surface, "--pmuted": muted, "--pline": line, "--prad": cfg.radius + "px", fontFamily: font } as CSSProperties;
  const iconInk = cfg.tint === "primary" ? cfg.primary : ink;
  const pairs = (p: string): Pair[] => [
    { id: "icons", fr: "Icônes sur le fond", en: "Icons on the background", fg: cfg.tint === "primary" ? p : ink, bg, min: 3 },
    { id: "tint", fr: "Icônes sur pastille colorée", en: "Icons on tinted badge", fg: p, bg: mix(p, bg, 0.12), min: 3 },
    { id: "btn", fr: "Texte et icônes blancs sur bouton", en: "White text and icons on button", fg: "#FFFFFF", bg: p, min: 4.5 },
    { id: "muted", fr: "Icônes discrètes (recherche, actions)", en: "Subtle icons (search, actions)", fg: muted, bg, min: 3 },
  ];
  const report = pairs(cfg.primary).map((x) => ({ ...x, r: ratio(x.fg, x.bg) }));
  const fixable = report.some((x) => x.r < x.min && x.id !== "muted");
  const fix = () => {
    const c = fixPrimary(cfg.primary, (p) => pairs(p).every((x) => x.id === "muted" || ratio(x.fg, x.bg) >= x.min));
    if (c) { set({ primary: c }); a.toast(a.tt(`Couleur ajustée : ${c} (${MOD}Z pour annuler)`, `Colour adjusted: ${c} (${MOD}Z to undo)`)); }
    else a.toast(a.tt("Pas de nuance de cette couleur qui passe tous les contrôles : essayez-en une autre.", "No shade of this colour passes every check: try another one."));
  };
  void iconInk;
  const nm = (k: string) => { const i = byId[slots[k]]; return i ? (a.lang === "en" ? i.en : i.fr) : ""; };
  // Libellés de menu et de liste : ceux du thème de départ, même si l'icône change (« Stock » reste « Stock » avec le grenier).
  const label = (k: string) => { const i = byId[({ ...BASE, ...PRESETS.find((p) => p.id === preset)!.slots } as Slots)[k]]; return i ? (a.lang === "en" ? i.en : i.fr) : nm(k); };

  /** Le dessin d'une icône d'emplacement, avec sa personnalisation (couleur, taille, fond, rotation…). */
  const paint = (k: string, s: number, c?: string) => {
    const i = byId[slots[k]] ?? byId[BASE[k]], cu = custom[k] ?? {};
    if (!i) return <span />;
    const size = Math.round(s * (cu.scale ?? 1)), w = cu.stroke ?? cfg.stroke;
    const color = cu.color ?? c ?? (cfg.tint === "primary" ? cfg.primary : "currentColor");
    const Lc = lucide && L && i.lucide ? L[i.lucide] : null;
    const transform = [cu.rot && `rotate(${cu.rot}deg)`, cu.flip && "scaleX(-1)"].filter(Boolean).join(" ") || undefined;
    const svg = <span className="pgdraw" style={{ color, transform }}>{Lc ? createElement(Lc, { size, strokeWidth: w }) : <Svg i={i} o={{ s: size, w, style: cu.style ?? cfg.style, c: "currentColor", tone: cu.tone }} />}</span>;
    return cu.shape ? <span className="pgshape" style={{ background: cu.bg ?? cfg.primary, padding: Math.round(size * 0.28), borderRadius: cu.shape === "circle" ? "50%" : Math.round(size * 0.32) }}>{svg}</span> : svg;
  };

  /** Un téléphone (forme choisie) autour d'un écran de maquette. */
  const phone = (cls: string, body: JSX.Element) => (
    <div className={"phone pgphone ph-" + cfg.phone + " " + cls}><div className="screen pgscreen">
      {cfg.phone === "iphone" && <div className="notch" />}{cfg.phone === "android" && <div className="punch" />}
      <div className="sb">{cfg.phone === "android" ? <><span>12:30</span><span>4G ▮</span></> : <><span>9:41</span><span>●●● 4G</span></>}</div>
      {body}
    </div></div>
  );
  /** Un ordinateur, un écran, une fenêtre de navigateur ou une tablette autour d'une page web. */
  const desk = (cls: string, path: string, body: JSX.Element) => (
    <div className={"dv dv-" + cfg.desk + " " + cls}>
      <div className="dv-lid"><div className="dv-scr">
        <div className="dv-bar"><i /><i /><i /><span>🔒 {(cfg.name || DEF.name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "app"}.app{path}</span></div>
        {body}
      </div></div>
      {cfg.desk === "laptop" && <div className="dv-base" />}
      {cfg.desk === "monitor" && <div className="dv-stand"><i /><b /></div>}
    </div>
  );


  const kit: Kit = { paint, pick, open: setPick, custom, slots, logo: logo?.url ?? null, size: cfg.size };

  const used = useMemo(() => [...new Set(Object.values(slots))].map((id) => byId[id]).filter(Boolean) as Icon[], [slots]);
  const code = useMemo(() => {
    const uiI = used.filter((i) => i.lucide), afro = used.filter((i) => !i.lucide);
    const cust = Object.entries(custom).filter(([k]) => byId[slots[k]]).map(([k, cu]) => ({ k, cu, i: byId[slots[k]] }));
    const tf = (cu: Cust) => [cu.rot && `rotate(${cu.rot}deg)`, cu.flip && "scaleX(-1)"].filter(Boolean).join(" ");
    const box = (cu: Cust) => { const sz = Math.round(cfg.size * (cu.scale ?? 1)); return { pad: Math.round(sz * 0.28), rad: cu.shape === "circle" ? "50%" : Math.round(sz * 0.32) + "px", bg: cu.bg ?? cfg.primary }; };
    const jsx = ({ i, cu }: { i: Icon; cu: Cust }) => {
      const n = i.lucide ?? pascal(i.id), p = [isColor(i) ? `size={${Math.round(cfg.size * (cu.scale ?? 1))}}` : "{...icon}"];
      if (!isColor(i)) {
        if (cu.scale) p.push(`size={${Math.round(cfg.size * cu.scale)}}`);
        if (cu.stroke) p.push(`strokeWidth={${cu.stroke}}`);
        if (cu.color) p.push(`color="${cu.color}"`);
        if (!i.lucide && (cu.style ?? cfg.style) === "fill") p.push('variant="fill"');
      }
      if (cu.tone) p.push(`tone="${cu.tone}"`);
      if (tf(cu)) p.push(`style={{ transform: "${tf(cu)}" }}`);
      const el = `<${n} ${p.join(" ")} />`;
      if (!cu.shape) return [el];
      const b = box(cu);
      return [`<span style={{ display: "inline-flex", padding: ${b.pad}, borderRadius: "${b.rad}", background: "${b.bg}" }}>`, `  ${el}`, `</span>`];
    };
    const ng = ({ i, cu }: { i: Icon; cu: Cust }) => {
      const p = [`name="${i.lucide ?? i.id}"`, `[size]="${Math.round(cfg.size * (cu.scale ?? 1))}"`];
      if (!isColor(i)) {
        p.push(`[strokeWidth]="${cu.stroke ?? cfg.stroke}"`);
        if (cu.color) p.push(`color="${cu.color}"`);
        if (!i.lucide && (cu.style ?? cfg.style) === "fill") p.push('variant="fill"');
      }
      if (cu.tone) p.push(`tone="${cu.tone}"`);
      if (tf(cu)) p.push(`style="transform: ${tf(cu)}"`);
      const el = `<afroicon ${p.join(" ")} />`;
      if (!cu.shape) return [el];
      const b = box(cu);
      return [`<span style="display: inline-flex; padding: ${b.pad}px; border-radius: ${b.rad}; background: ${b.bg}">`, `  ${el}`, `</span>`];
    };
    const custLines = (f: typeof jsx) => cust.length ? ["", a.tt(`// Icônes personnalisées (${cust.length})`, `// Customised icons (${cust.length})`), ...cust.flatMap((x) => f(x))] : [];
    const fill = cfg.style === "fill" ? ' variant="fill"' : "";
    // Une ligne si elle tient, sinon plusieurs noms par ligne (≈ 72 caractères).
    const wrap = (pre: string, names: string[], post: string) => {
      const one = `${pre}${names.join(", ")}${post}`;
      if (one.length < 90) return one;
      const rows: string[] = [];
      for (const n of names) { const r = rows.length - 1; if (r >= 0 && rows[r].length + n.length < 72) rows[r] += " " + n + ","; else rows.push("  " + n + ","); }
      return `${pre.trimEnd()}\n${rows.join("\n")}\n${post.trimStart()}`;
    };
    if (tab === "react") return [
      `// npm install afroicons-react${uiI.length ? " afroicons-ui lucide-react" : ""}`,
      uiI.length ? wrap("import { ", uiI.map((i) => i.lucide!), ' } from "afroicons-ui";') : null,
      afro.length ? wrap("import { ", afro.map((i) => pascal(i.id)), ' } from "afroicons-react";') : null, "",
      a.tt(`// Les mêmes réglages partout : taille ${cfg.size}, trait ${cfg.stroke}${cfg.style === "fill" ? ", style rempli (icônes culturelles)" : ""}`, `// Same settings everywhere: size ${cfg.size}, stroke ${cfg.stroke}${cfg.style === "fill" ? ", filled style (cultural icons)" : ""}`),
      `const icon = { size: ${cfg.size}, strokeWidth: ${cfg.stroke} };`, "",
      ...uiI.map((i) => `<${i.lucide} {...icon} />`),
      ...afro.map((i) => `<${pascal(i.id)} ${isColor(i) ? `size={${cfg.size}}` : `{...icon}${fill}`} />`),
      ...custLines(jsx),
    ].filter((x) => x !== null).join("\n");
    if (tab === "angular") {
      const names = used.map((i) => i.lucide ?? pascal(i.id));
      return [`// npm install afroicons-angular`, wrap("import { AfroiconComponent, provideAfroicons, ", names, ' } from "afroicons-angular";'), "",
        a.tt("// app.config.ts : seules les icônes déclarées entrent dans le bundle", "// app.config.ts: only the declared icons go into the bundle"), wrap("providers: [provideAfroicons({ ", names, " })]"), "",
        a.tt("// composant : imports: [AfroiconComponent]", "// component: imports: [AfroiconComponent]"),
        ...used.map((i) => `<afroicon name="${i.lucide ?? i.id}" [size]="${cfg.size}"${isColor(i) ? "" : ` [strokeWidth]="${cfg.stroke}"`}${!i.lucide && !isColor(i) && cfg.style === "fill" ? ' variant="fill"' : ""} />`),
        ...custLines(ng).map((l) => l.replace(/^\/\/ (.*)$/, "<!-- $1 -->")),
      ].join("\n");
    }
    if (tab === "css") return [
      a.tt("/* Le thème de cet aperçu, en variables CSS */", "/* This preview's theme, as CSS variables */"), `:root {`, `  --primary: ${cfg.primary};`, `  --text: ${ink};`, `  --background: ${bg};`, `  --surface: ${surface};`, `  --muted: ${muted};`, `  --border: ${line};`, `  --radius: ${cfg.radius}px;`, `  --icon-size: ${cfg.size}px;`, `  --icon-stroke: ${cfg.stroke};`, `}`, "",
      a.tt("/* Les icônes Afroicons suivent la couleur du texte (currentColor) */", "/* Afroicons icons follow the text colour (currentColor) */"), `.icon { width: var(--icon-size); height: var(--icon-size); stroke-width: var(--icon-stroke);${cfg.tint === "primary" ? " color: var(--primary);" : ""} }`,
      ...(cfg.anim !== "none" ? ["", `/* ${a.tt("Animation au survol", "Hover animation")} : ${a.tt(ANIMS.find((x) => x.id === cfg.anim)!.fr, ANIMS.find((x) => x.id === cfg.anim)!.en).toLowerCase()} */`, animCss(cfg.anim, ".icon:hover")] : []),
    ].join("\n");
    return [`<!-- npm install afroicons -->`, `<script type="module">`, `  import { replace } from "afroicons";`, `  replace();`, `</script>`, "",
      ...afro.map((i) => `<i data-afroicon="${i.id}" data-size="${cfg.size}"${isColor(i) ? "" : ` data-stroke="${cfg.stroke}"`}${cfg.style === "fill" && !isColor(i) ? ' data-variant="fill"' : ""}></i>`),
      ...(() => {
        // Icônes culturelles personnalisées : teinte, variante, taille et trait ; couleur, rotation et fond en style.
        const lines = cust.filter(({ i }) => !i.lucide).flatMap(({ i, cu }) => {
          const st = [cu.color && `color: ${cu.color}`, tf(cu) && `transform: ${tf(cu)}`].filter(Boolean).join("; ");
          const el = `<i data-afroicon="${i.id}" data-size="${Math.round(cfg.size * (cu.scale ?? 1))}"${isColor(i) ? "" : ` data-stroke="${cu.stroke ?? cfg.stroke}"`}${!isColor(i) && (cu.style ?? cfg.style) === "fill" ? ' data-variant="fill"' : ""}${cu.tone ? ` data-tone="${cu.tone}"` : ""}${st ? ` style="${st}"` : ""}></i>`;
          if (!cu.shape) return [el];
          const b = box(cu);
          return [`<span style="display: inline-flex; padding: ${b.pad}px; border-radius: ${b.rad}; background: ${b.bg}">`, `  ${el}`, `</span>`];
        });
        return lines.length ? ["", a.tt(`<!-- Icônes personnalisées (${lines.length}) -->`, `<!-- Customised icons (${lines.length}) -->`), ...lines] : [];
      })(),
      ...(uiI.length ? ["", a.tt(`<!-- Icônes d'interface (${uiI.map((i) => i.lucide).join(", ")}) :`, `<!-- Interface icons (${uiI.map((i) => i.lucide).join(", ")}):`), a.tt("     afroicons-ui pour React, afroicons-angular pour Angular,", "     afroicons-ui for React, afroicons-angular for Angular,"), a.tt("     ou le SVG de chaque fiche sur afroicons.org -->", "     or the SVG from each icon page on afroicons.org -->")] : [])].join("\n");
  }, [used, cfg, tab, ink, bg, surface, muted, line, custom, slots, a.lang]); // eslint-disable-line react-hooks/exhaustive-deps
  const download = () => zipIcons(used, { ...a, style: cfg.style, stroke: cfg.stroke, color: null } as typeof a, `afroicons-${cfg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "app"}-${used.length}.zip`);
  const show = (v: View) => view === "all" || view === v;
  const picker = (pick || wide) ? <Picker key={pick ?? "aucune"} inline={wide} empty={!pick} used={used} select={(id) => { const k = Object.keys(slots).find((x) => slots[x] === id); if (k) setPick(k); }} onClose={() => setPick(null)} onPick={(id) => { if (!pick) return; setSlots((s) => ({ ...s, [pick]: id })); if (!wide) setPick(null); }} current={pick ? slots[pick] : ""}
        tab={dtab} setTab={setDtab} cfg={cfg} preview={pick ? <div className="pgprev" style={vars}>{paint(pick, 56)}</div> : <span />}
        cust={(pick && custom[pick]) || {}}
        setCust={(p) => pick && setCustom((m) => { const n = cleanCust({ ...m[pick], ...p }); const o = { ...m }; if (n) o[pick] = n; else delete o[pick]; return o; })}
        resetCust={() => pick && setCustom((m) => { const o = { ...m }; delete o[pick]; return o; })}
        total={Object.keys(custom).length}
        resetAll={() => { setCustom({}); a.toast(a.tt("Toutes les personnalisations sont effacées", "All customisations cleared")); }}
        african={pick ? AFRICA[slots[pick]] : undefined} remove={pick && isPin(pick) ? () => removePin(pick) : undefined}
        applyAll={() => { const cu = pick && custom[pick]; if (!cu) return; setCustom(Object.fromEntries(Object.keys(slots).map((k) => [k, cu]))); a.toast(a.tt("Appliqué à toutes les icônes", "Applied to every icon")); }} /> : null;

  return (
    <KitCtx.Provider value={kit}>
    <section id="playground" className="pg" onClick={() => setPick(null)}>
      <div className="shead"><div>
        <div className="kick">{a.tt("Bac à sable", "Playground")}</div>
        <h2>{a.tt("Essayez les icônes dans votre interface", "Try the icons in your interface")}</h2>
        <p>{a.tt("Réglez couleurs, police, taille et épaisseur comme sur votre site, cliquez sur n'importe quelle icône pour la remplacer, puis copiez le code ou partagez le lien.", "Set colours, font, size and stroke like your site, click any icon to swap it, then copy the code or share the link.")}</p>
      </div></div>
      <div className="pglay">
        <aside className="pgctl" onClick={(e) => e.stopPropagation()}>
          <h3>{a.tt("Thème de départ", "Starter set")}</h3>
          <div className="pgchips">{PRESETS.map((p) => <button key={p.id} className={"cat" + (preset === p.id ? " on" : "")} onClick={() => choosePreset(p.id)}>{a.tt(p.fr, p.en)}</button>)}</div>
          <div className="pglinks"><button className="pglink" onClick={africanize}>{a.tt("✦ Version 100 % africaine", "✦ 100% African version")}</button><button className="pglink" onClick={surprise}>{a.tt("✦ Au hasard", "✦ Shuffle")}</button></div>
          <h3>{a.tt("Votre marque", "Your brand")}</h3>
          <label className="pgfield"><span>{a.tt("Nom", "Name")}</span><input value={cfg.name} maxLength={24} onChange={(e) => set({ name: e.target.value })} /></label>
          <div className="swat pgswat">{SWATCHES.map((c) => <button key={c} aria-label={c} className={cfg.primary.toLowerCase() === c.toLowerCase() ? "on" : ""} style={{ background: c }} onClick={() => set({ primary: c })} />)}<label className={"pgcustom" + (SWATCHES.some((c) => c.toLowerCase() === cfg.primary.toLowerCase()) ? "" : " on")} title={a.tt("Couleur libre", "Custom colour")} style={{ background: SWATCHES.some((c) => c.toLowerCase() === cfg.primary.toLowerCase()) ? undefined : cfg.primary }}><input type="color" value={cfg.primary} aria-label={a.tt("Couleur libre", "Custom colour")} onChange={(e) => set({ primary: e.target.value })} /></label></div>
          <div className="pgfield"><span>Logo</span><div className="pglogoin">
            <label className="btn">{logo ? <img src={logo.url} alt="" /> : null}{logo ? a.tt("Changer", "Change") : a.tt("Importer votre logo", "Import your logo")}<input className="pgfile" type="file" accept="image/*" onChange={(e) => { loadLogo(e.target.files?.[0]); e.target.value = ""; }} /></label>
            {logo && <button className="ib" aria-label={a.tt("Retirer le logo", "Remove logo")} onClick={() => { URL.revokeObjectURL(logo.url); setLogo(null); }}><IClose s={16} /></button>}
          </div></div>
          {logo && logo.colors.length > 0 && <div className="pgfield"><span>{a.tt("Ses couleurs", "Its colours")}</span><div className="pgswat2">{logo.colors.map((c) => <button key={c} aria-label={c} title={c} className={cfg.primary.toLowerCase() === c.toLowerCase() ? "on" : ""} style={{ background: c }} onClick={() => set({ primary: c })} />)}</div></div>}
          <label className="pgfield"><span>{a.tt("Police", "Font")}</span><select value={cfg.font} onChange={(e) => set({ font: e.target.value })}>{FONTS.map((f) => <option key={f.id} value={f.id}>{a.lang === "en" ? f.en ?? f.n : f.n}</option>)}</select></label>
          <div className="pgfield"><span>{a.tt("Mode", "Mode")}</span><div className="seg"><button className={!cfg.dark ? "on" : ""} onClick={() => set({ dark: false })}>{a.tt("Clair", "Light")}</button><button className={cfg.dark ? "on" : ""} onClick={() => set({ dark: true })}>{a.tt("Sombre", "Dark")}</button></div></div>
          <label className="rng"><span>{a.tt("Arrondi", "Radius")}</span><input type="range" min={0} max={24} step={2} value={cfg.radius} onChange={(e) => set({ radius: +e.target.value })} /><output>{cfg.radius}</output></label>
          <h3>{a.tt("Appareils", "Devices")}</h3>
          <div className="pgfield"><span>{a.tt("Mobile", "Phone")}</span><div className="pgchips pgdesks">{PHONES.map((x) => <button key={x.id} className={"cat" + (cfg.phone === x.id ? " on" : "")} onClick={() => set({ phone: x.id })}>{a.tt(x.fr, x.en)}</button>)}</div></div>
          <div className="pgfield"><span>{a.tt("Web", "Web")}</span><div className="pgchips pgdesks">{DESKS.map((x) => <button key={x.id} className={"cat" + (cfg.desk === x.id ? " on" : "")} onClick={() => set({ desk: x.id })}>{a.tt(x.fr, x.en)}</button>)}</div></div>
          <h3>{a.tt("Icônes", "Icons")}</h3>
          <label className="rng"><span>{a.tt("Taille", "Size")}</span><input type="range" min={14} max={32} step={2} value={cfg.size} onChange={(e) => set({ size: +e.target.value })} /><output>{cfg.size}</output></label>
          <label className="rng"><span>{a.tt("Trait", "Stroke")}</span><input type="range" min={1} max={2.5} step={0.25} value={cfg.stroke} onChange={(e) => set({ stroke: +e.target.value })} /><output>{cfg.stroke}</output></label>
          <div className="pgfield"><span>Style</span><div className="seg"><button className={cfg.style === "line" ? "on" : ""} onClick={() => set({ style: "line" })}>{a.tt("Trait", "Line")}</button><button className={cfg.style === "fill" ? "on" : ""} onClick={() => set({ style: "fill" })}>{a.tt("Rempli", "Filled")}</button></div></div>
          <div className="pgfield"><span>{a.tt("Couleur", "Colour")}</span><div className="seg"><button className={cfg.tint === "text" ? "on" : ""} onClick={() => set({ tint: "text" })}>{a.tt("Du texte", "Text")}</button><button className={cfg.tint === "primary" ? "on" : ""} onClick={() => set({ tint: "primary" })}>{a.tt("Principale", "Primary")}</button></div></div>
          <div className="pgfield"><span>{a.tt("Survol", "Hover")}</span><div className="pganim">
            <select aria-label={a.tt("Animation au survol", "Hover animation")} value={cfg.anim} onChange={(e) => { set({ anim: e.target.value as Anim }); pulse("replay", setReplay, 900); }}>{ANIMS.map((x) => <option key={x.id} value={x.id}>{a.tt(x.fr, x.en)}</option>)}</select>
            <button className="btn" disabled={cfg.anim === "none"} onClick={() => pulse("replay", setReplay, 900)}>{a.tt("Rejouer", "Replay")}</button>
          </div></div>
          <h3>{a.tt("Accessibilité", "Accessibility")}</h3>
          <label className="pgfield"><span>{a.tt("Vision", "Vision")}</span><select value={vision} onChange={(e) => setVision(e.target.value as Vision)}>{VISIONS.map((v) => <option key={v.id} value={v.id}>{a.tt(v.fr, v.en)}</option>)}</select></label>
          <ul className="pgcontrast">{report.map((x) => (
            <li key={x.id} className={x.r >= x.min ? "ok" : "ko"} title={a.tt(`Minimum WCAG : ${x.min} : 1`, `WCAG minimum: ${x.min}:1`)}>
              <span className="pgcsw" style={{ background: x.bg, color: x.fg }}>Aa</span><span>{a.tt(x.fr, x.en)}</span><b>{x.r.toFixed(1)} : 1</b><i>{x.r >= x.min ? "✓" : "✕"}</i>
            </li>
          ))}</ul>
          {fixable ? <button className="btn pgfix" onClick={fix}>{a.tt("Corriger la couleur automatiquement", "Fix the colour automatically")}</button> : <small className="pgnote">{a.tt("Contrastes conformes aux règles WCAG pour les icônes (3 : 1) et le texte des boutons (4,5 : 1).", "Contrast meets WCAG rules for icons (3:1) and button text (4.5:1).")}</small>}
        </aside>

        <div className="pgright">
          {/* Barre d'actions : historique, comparaison avant / après, partage. */}
          <div className="pgbar" onClick={(e) => e.stopPropagation()}>
            <span className="pgbarg">
              <button className="ib" disabled={!hist.current.past.length} onClick={() => step(true)} title={a.tt("Annuler", "Undo") + " (" + MOD + "Z)"} aria-label={a.tt("Annuler", "Undo")}>↶</button>
              <button className="ib" disabled={!hist.current.future.length} onClick={() => step(false)} title={a.tt("Rétablir", "Redo") + " (" + (IS_MAC ? "⇧⌘Z" : "Ctrl Y") + ")"} aria-label={a.tt("Rétablir", "Redo")}>↷</button>
            </span>
            <button className={"btn pgcmp" + (lucide ? " on" : "")} aria-pressed={lucide} onClick={() => setLucide((v) => !v)}>{lucide ? a.tt("Avant : Lucide", "Before: Lucide") : a.tt("Comparer avant / après", "Compare before / after")}</button>
            <span className="pgbarsp" />
            <button className="btn" onClick={share}>{a.tt("Copier le lien", "Copy link")}</button>
            <button className="btn" onClick={reset}>{a.tt("Réinitialiser", "Reset")}</button>
          </div>
          {lucide && <small className="pgnote pgcmpn">{L ? a.tt("Avant : les icônes d'interface en version Lucide d'origine (les icônes culturelles n'ont pas d'équivalent). Recliquez pour revenir à Afroicons.", "Before: interface icons in their original Lucide version (cultural icons have no equivalent). Click again to go back to Afroicons.") : a.tt("Chargement de Lucide…", "Loading Lucide…")}</small>}
          <div className="pgviews" role="tablist" aria-label={a.tt("Maquettes", "Mockups")}>
            {([["all", a.tt("Tout", "All")], ["web", a.tt("Application web", "Web app")], ["mobile", a.tt("Mobile", "Mobile")], ["site", a.tt("Site vitrine", "Website")], ["screen", a.tt("✦ Votre écran", "✦ Your screen")]] as [View, string][]).map(([v, l]) => <button key={v} role="tab" aria-selected={view === v} className={"cat" + (view === v ? " on" : "")} onClick={() => setView(v)}>{l}</button>)}
          </div>
          <div className="pghint">
            <span className="pghic" aria-hidden="true">↻</span>
            <p><b>{a.tt("Toutes les icônes ci-dessous sont modifiables.", "Every icon below can be changed.")}</b> {a.tt("Cliquez sur une icône (dans un bouton, le menu, une liste…) pour la remplacer, ou pour la personnaliser : couleur, taille, fond, rotation…", "Click an icon (in a button, the menu, a list…) to swap it, or to customise it: colour, size, background, rotation…")}</p>
            <button className="btn" onClick={(e) => { e.stopPropagation(); pulse("flash", setFlash, 2400); }}>{a.tt("Les montrer", "Show them")}</button>
          </div>
          <VisionFilters />
          <div className={"pgstage v-" + view + (flash ? " flash" : "") + (cfg.anim !== "none" ? " an-" + cfg.anim : "") + (replay ? " an-play" : "")} style={{ ...vars, filter: VISIONS.find((v) => v.id === vision)!.css || undefined }}>
            {view === "screen" && <ScreenView image={shot} setImage={loadShot} clear={clearShot} pins={pins}
              move={(k, x, y) => setPins((p) => ({ ...p, [k]: { x, y } }))} add={addPin} open={(k) => setPick(k)}
              render={(k) => (slots[k] ? <span className={"pgi" + (pick === k ? " on" : "") + (custom[k] ? " cu" : "")}>{paint(k, cfg.size + 4, cfg.primary)}</span> : null)}
              frame={(body) => desk("dv-shot", "", body)} remove={removePin} />}
            {show("web") && desk("dv-web", "/tableau-de-bord", <div className="pgweb">
              <header className="pgnav"><span className="pglogo"><I k="logo" s={cfg.size + 4} c={cfg.primary} />{cfg.name || DEF.name}</span>
                <span className="pgsearch"><I k="search" s={cfg.size - 2} c="var(--pmuted)" /><span>{a.tt("Rechercher…", "Search…")}</span></span>
                <span className="pgnavr"><span className="pgbadge"><I k="bell" /><i>3</i></span><I k="user" s={cfg.size + 4} /></span>
              </header>
              <div className="pgbody">
                <nav className="pgside">{(["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((k, n) => <span key={k} className={"pgitem" + (n === 0 ? " on" : "")}><I k={k} /><span>{label(k)}</span></span>)}<span className="pgitem pgout"><I k="s7" /><span>{a.tt("Se déconnecter", "Log out")}</span></span></nav>
                <main className="pgmain">
                  <div className="pgrow"><h4>{a.tt("Tableau de bord", "Dashboard")}</h4><B k="b2" ghost>{a.tt("Exporter", "Export")}</B><B k="b1">{a.tt("Nouveau", "New")}</B></div>
                  <div className="pgkpis">{([["k1", "2,4 M", "+12 %"], ["k2", "845 000", "FCFA"], ["k3", "128", a.tt("en cours", "pending")]] as const).map(([k, v, s]) => <div key={k} className="pgkpi"><span className="pgkic"><I k={k} c={cfg.primary} /></span><b>{v}</b><small>{s}</small></div>)}</div>
                  <div className="pgtable">
                    <div className="pgth"><span>{a.tt("Commande", "Order")}</span><span>{a.tt("Client", "Customer")}</span><span>{a.tt("Statut", "Status")}</span><span /></div>
                    {([["#2041", "Awa Diallo", "o1", a.tt("Payée", "Paid"), "ok"], ["#2040", "Kofi Mensah", "o2", a.tt("En attente", "Pending"), "wait"], ["#2039", "Nadia Benali", "o3", a.tt("Annulée", "Cancelled"), "ko"]] as const).map(([n, c, k, s, cls]) => (
                      <div key={n} className="pgtr"><b>{n}</b><span>{c}</span><span className={"pgpill " + cls}><I k={k} s={cfg.size - 4} c="currentColor" />{s}</span><span className="pgrowa"><I k="a1" s={cfg.size - 2} c="var(--pmuted)" /><I k="a2" s={cfg.size - 2} c="var(--pmuted)" /><I k="a3" s={cfg.size - 2} c="var(--pmuted)" /></span></div>
                    ))}
                  </div>
                  <div className="pgform"><span className="pginput"><I k="l3" s={cfg.size - 2} c="var(--pmuted)" /><span>+237 6 70 00 00 00</span></span><span className="pginput"><I k="l4" s={cfg.size - 2} c="var(--pmuted)" /><span>Douala, Akwa</span></span></div>
                </main>
              </div>
            </div>)}

            {show("mobile") && phone("pg-ph1", <>
              <div className="pgpbar"><I k="menu" /><b>{cfg.name || DEF.name}</b><span className="pgbadge"><I k="bell" /><i>3</i></span></div>
              <div className="pglist">{(["l1", "l2", "l3", "l4"] as const).map((k) => <div key={k} className="pgli"><span className="pgkic"><I k={k} c={cfg.primary} /></span><div><b>{label(k)}</b><small>{a.tt("Il y a 2 h", "2 h ago")}</small></div></div>)}</div>
              <span className="pgfab"><I k="fab" c="#fff" s={cfg.size + 2} /></span>
              {/* Barre d'onglets : libellés courts fixes, comme une vraie application (le nom des icônes serait coupé). */}
              <nav className="tabb pgtabs">{(["t1", "t2", "t3", "t4", "t5"] as const).map((k, n) => <span key={k} className={n === 0 ? "on" : ""}><I k={k} c={n === 0 ? cfg.primary : undefined} />{[a.tt("Accueil", "Home"), a.tt("Ventes", "Sales"), "Wallet", "Messages", a.tt("Profil", "Profile")][n]}</span>)}</nav>
            </>)}

            {show("mobile") && phone("pg-ph2", <div className="pgpay">
              <b className="pgpayt">{a.tt("Paiement", "Checkout")}</b>
              <div className="pgpayam"><small>{a.tt("Total à payer", "Total due")}</small><b>15 000 FCFA</b></div>
              {([["p1", "Mobile money", "Orange · MTN · Wave"], ["p2", a.tt("Carte bancaire", "Bank card"), "Visa · Mastercard"], ["p3", a.tt("Virement", "Bank transfer"), "BICEC · Ecobank"]] as const).map(([k, t, s], n) => (
                <div key={k} className={"pgopt" + (n === 0 ? " on" : "")}><span className="pgkic"><I k={k} c={cfg.primary} /></span><div><b>{t}</b><small>{s}</small></div><i className="pgradio" /></div>
              ))}
              <B k="lock" wide>{a.tt("Payer 15 000 FCFA", "Pay 15,000 FCFA")}</B>
            </div>)}

            {show("web") && <div className="pgalerts">
              {([["n1", "ok", a.tt("Paiement reçu", "Payment received"), a.tt("Awa Diallo a payé 15 000 FCFA.", "Awa Diallo paid 15,000 FCFA.")], ["n2", "wait", a.tt("Stock bas", "Low stock"), a.tt("Plus que 4 sacs de riz en réserve.", "Only 4 bags of rice left.")], ["n3", "info", a.tt("Mise à jour", "Update"), a.tt("La version 2.1 est disponible.", "Version 2.1 is available.")]] as const).map(([k, cls, t, s]) => (
                <div key={k} className={"pgalert " + cls}><I k={k} c="currentColor" /><div><b>{t}</b><small>{s}</small></div><I k="x" s={cfg.size - 4} c="var(--pmuted)" /></div>
              ))}
              <div className="pgempty"><span className="pgfic"><I k="e1" s={cfg.size + 20} c={cfg.primary} /></span><b>{a.tt("Aucune commande pour l'instant", "No orders yet")}</b><small>{a.tt("Vos premières ventes apparaîtront ici.", "Your first sales will show up here.")}</small><B k="e2">{a.tt("Créer une commande", "Create an order")}</B></div>
            </div>}

            {show("site") && desk("dv-site", "", <div className="pgsite">
              <div className="pghero"><span className="pglogo"><I k="logo" s={cfg.size + 4} c={cfg.primary} />{cfg.name || DEF.name}</span>
                <h3>{a.tt("La gestion simple, pensée pour l'Afrique", "Simple management, designed for Africa")}</h3>
                <p>{a.tt("Ventes, stock et paiements mobiles dans une seule application.", "Sales, stock and mobile payments in one app.")}</p>
                <B k="go" after>{a.tt("Commencer", "Get started")}</B>
              </div>
              <div className="pgfeat">{(["f1", "f2", "f3"] as const).map((k) => <div key={k}><span className="pgfic"><I k={k} s={cfg.size + 12} c={cfg.primary} /></span><b>{nm(k)}</b><small>{a.tt("Une phrase qui présente la fonctionnalité.", "A sentence introducing the feature.")}</small></div>)}</div>
            </div>)}
          </div>

          {/* Lisibilité : les icônes utilisées aux tailles courantes, sur fond clair et sombre. */}
          <div className="pgsizes">
            <h4>{a.tt("Lisibilité aux petites tailles", "Legibility at small sizes")}</h4>
            {[false, true].map((dk) => (
              <div key={String(dk)} className={"pgsz" + (dk ? " dk" : "")}>
                {[16, 20, 24, 32].map((s) => <div key={s}><small>{s} px</small><span>{used.filter((i) => !isColor(i)).slice(0, 14).map((i) => <Svg key={i.id} i={i} o={{ s, w: cfg.stroke, style: cfg.style, c: "currentColor" }} />)}</span></div>)}
              </div>
            ))}
          </div>
        </div>
        {wide && picker}
      </div>

      {!wide && picker}

      <div className="code pgcode" onClick={(e) => e.stopPropagation()}>
        <div className="pgcodeh">
          <h4>{a.tt(`Code des ${used.length} icônes utilisées`, `Code for the ${used.length} icons used`)}</h4>
          {a.canDownload && <button className="btn a" onClick={download}>{a.tt(`Télécharger les ${used.length} SVG (.zip)`, `Download the ${used.length} SVGs (.zip)`)}</button>}
        </div>
        <div className="ctabs" role="tablist">{(["react", "angular", "html", "css"] as const).map((k) => <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{{ react: "React", angular: "Angular", html: "HTML / JS", css: a.tt("Thème CSS", "CSS theme") }[k]}</button>)}</div>
        <div className="codebox"><pre dangerouslySetInnerHTML={{ __html: highlight(code, true) }} /><button className="cp" onClick={() => a.copy(code)}>{a.tt("Copier", "Copy")}</button></div>
      </div>
    </section>
    </KitCtx.Provider>
  );
}

/** Choix d'une icône pour un emplacement : recherche dans toute la bibliothèque, par collection. */
const COLS: { id: Collection | "all"; fr: string; en: string; list: Icon[] }[] = [
  { id: "all", fr: "Tout", en: "All", list: ICONS },
  { id: "afro", fr: "Culturelles", en: "Cultural", list: AFRO },
  { id: "ui", fr: "Interface", en: "Interface", list: UI },
  { id: "emojis", fr: "Emojis", en: "Emojis", list: EMOJIS },
  { id: "flags", fr: "Drapeaux", en: "Flags", list: FLAGS },
];
type PickerProps = {
  onClose: () => void; onPick: (id: string) => void; current: string; tab: "swap" | "edit"; setTab: (t: "swap" | "edit") => void;
  cfg: Cfg; preview: JSX.Element; cust: Cust; setCust: (p: Partial<Cust>) => void; resetCust: () => void; applyAll: () => void; resetAll: () => void; total: number; african?: string; remove?: () => void;
  /** Panneau fixe à droite (grand écran) au lieu d'une fenêtre. */
  inline?: boolean;
  /** Panneau sans icône sélectionnée : on propose les icônes de la maquette. */
  empty?: boolean; used?: Icon[]; select?: (id: string) => void;
};
function Picker({ onClose, onPick, current, tab, setTab, cfg, preview, cust, setCust, resetCust, applyAll, resetAll, total, african, remove, inline, empty, used = [], select }: PickerProps) {
  const a = useApp();
  const icon = byId[current];
  const [q, setQ] = useState("");
  const [col, setCol] = useState<Collection | "all">(current ? colOf(current) : "all");
  const list = useMemo(() => rank(COLS.find((c) => c.id === col)!.list, q).slice(0, 72), [q, col]);
  const dlg = useRef<HTMLDivElement>(null);
  useEffect(() => { const f = (e: KeyboardEvent) => e.key === "Escape" && onClose(); addEventListener("keydown", f); return () => removeEventListener("keydown", f); }, [onClose]);
  // Le focus reste dans la fenêtre (Tab boucle) et revient à l'icône d'origine à la fermeture.
  useEffect(() => { if (inline) return; const back = document.activeElement as HTMLElement | null; if (!dlg.current?.contains(document.activeElement)) dlg.current?.querySelector<HTMLElement>("input, [role=tab].on")?.focus(); return () => { if (back?.isConnected) back.focus({ preventScroll: true }); }; }, [inline]);
  const trap = (e: React.KeyboardEvent) => {
    if (inline || e.key !== "Tab" || !dlg.current) return;
    const f = [...dlg.current.querySelectorAll<HTMLElement>("button:not([disabled]), input, select, [tabindex='0']")].filter((x) => x.offsetParent !== null);
    if (!f.length) return;
    const [first, last] = [f[0], f[f.length - 1]];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  if (inline && empty) return (
    <aside className="pginsp pgpick inl" onClick={(e) => e.stopPropagation()} aria-label={a.tt("Élément sélectionné", "Selected element")}>
      <div className="pgink">{a.tt("Élément sélectionné", "Selected element")}</div>
      <p className="pgnote">{a.tt("Cliquez une icône dans la maquette pour la remplacer ou la personnaliser. Ou choisissez-en une ici :", "Click an icon in the mockup to swap or customise it. Or pick one here:")}</p>
      <div className="pgpickg pgused">{used.map((i) => <button key={i.id} title={a.lang === "en" ? i.en : i.fr} onClick={() => select?.(i.id)}><Svg i={i} o={{ s: 22 }} /><small>{a.lang === "en" ? i.en : i.fr}</small></button>)}</div>
    </aside>
  );
  const Wrap = inline ? "aside" : "div";
  return (
    <>
      {!inline && <div className={"pgveil" + (tab === "edit" ? " light" : "")} onClick={onClose} />}
      <Wrap className={"pgpick" + (tab === "edit" ? " edit" : "") + (inline ? " pginsp inl" : "")} {...(inline ? { "aria-label": a.tt("Élément sélectionné", "Selected element") } : { role: "dialog", "aria-modal": "true", "aria-label": a.tt("Remplacer ou personnaliser l'icône", "Swap or customise the icon") })} ref={dlg as never} onKeyDown={trap} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        {inline && <div className="pgink">{a.tt("Élément sélectionné", "Selected element")}</div>}
        <div className="pgpickt" role="tablist">
          <button role="tab" aria-selected={tab === "swap"} className={tab === "swap" ? "on" : ""} onClick={() => setTab("swap")}>{a.tt("Remplacer", "Swap")}</button>
          <button role="tab" aria-selected={tab === "edit"} className={tab === "edit" ? "on" : ""} onClick={() => setTab("edit")}>{a.tt("Personnaliser", "Customise")}{Object.keys(cust).length ? <i className="pgdot" /> : null}</button>
          <span>{a.lang === "en" ? icon?.en : icon?.fr}</span>
          <button className="ib" aria-label={a.tt("Fermer", "Close")} onClick={onClose}><IClose /></button>
        </div>
        {tab === "edit" ? <Customize icon={icon} cfg={cfg} preview={preview} cust={cust} set={setCust} reset={resetCust} applyAll={applyAll} resetAll={resetAll} total={total} /> : <>
        <div className="pgpickh"><label className="sbox"><ISearch s={18} /><input autoFocus={!inline} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && list[0] && onPick(list[0].id)} placeholder={a.tt("Chercher : panier, cauri, bell…", "Search: basket, cowrie, bell…")} /></label></div>
        {african && <button className="pgafr" onClick={() => onPick(african)}><Svg i={byId[african]} o={{ s: 22 }} /><span>{a.tt("Équivalent africain : ", "African counterpart: ")}<b>{a.lang === "en" ? byId[african].en : byId[african].fr}</b></span><em>{a.tt("Utiliser", "Use")}</em></button>}
        {remove && <button className="pgafr del" onClick={remove}><span>{a.tt("Retirer cette icône de la capture", "Remove this icon from the screenshot")}</span></button>}
        <div className="pgchips pgpickc">{COLS.map((c) => <button key={c.id} className={"cat" + (col === c.id ? " on" : "")} onClick={() => setCol(c.id)}>{a.tt(c.fr, c.en)}</button>)}</div>
        <div className="pgpickg">{list.length ? list.map((i) => <button key={i.id} className={i.id === current ? "on" : ""} title={a.lang === "en" ? i.en : i.fr} onClick={() => onPick(i.id)}><Svg i={i} o={{ s: 24 }} /><small>{a.lang === "en" ? i.en : i.fr}</small></button>) : <p className="pgnote">{a.tt("Aucune icône trouvée.", "No icon found.")}</p>}</div>
        </>}
      </Wrap>
    </>
  );
}

/** Un nuancier : pastilles, « Auto » et couleur libre. */
function Swatch({ list, value, on, auto }: { list: string[]; value?: string; on: (v?: string) => void; auto?: string }) {
  const a = useApp();
  return (
    <div className="swat pgswat2">
      {auto && <button className={"pgauto" + (!value ? " on" : "")} onClick={() => on(undefined)}>{auto}</button>}
      {list.map((c) => <button key={c} aria-label={c} className={value?.toLowerCase() === c.toLowerCase() ? "on" : ""} style={{ background: c }} onClick={() => on(c)} />)}
      <label className={"pgcustom" + (value && !list.some((c) => c.toLowerCase() === value.toLowerCase()) ? " on" : "")} title={a.tt("Couleur libre", "Custom colour")}><input type="color" value={value ?? "#C24E2A"} aria-label={a.tt("Couleur libre", "Custom colour")} onChange={(e) => on(e.target.value)} /></label>
    </div>
  );
}

/** Réglages propres à une icône : ils s'appliquent tout de suite dans la maquette, derrière la fenêtre. */
const INKS = ["#1F1A15", "#FFFFFF", "#C24E2A", "#E3A22F", "#22305C", "#2E6B4E", "#7B4BA8", "#0F766E"];
const BGS = ["#C24E2A", "#E3A22F", "#22305C", "#2E6B4E", "#0F766E", "#1F1A15", "#F6F2EA", "#FCE9DF"];
function Customize({ icon, cfg, preview, cust, set, reset, applyAll, resetAll, total }: { icon?: Icon; cfg: Cfg; preview: JSX.Element; cust: Cust; set: (p: Partial<Cust>) => void; reset: () => void; applyAll: () => void; resetAll: () => void; total: number }) {
  const a = useApp();
  const color = !!icon && isColor(icon), n = Object.keys(cust).length;
  return (
    <div className="pgcust">
      {preview}
      <div className="pgcf">
        {!color && <div className="pgfield"><span>Style</span><div className="seg"><button className={(cust.style ?? cfg.style) === "line" ? "on" : ""} onClick={() => set({ style: "line" })}>{a.tt("Trait", "Line")}</button><button className={(cust.style ?? cfg.style) === "fill" ? "on" : ""} onClick={() => set({ style: "fill" })}>{a.tt("Rempli", "Filled")}</button></div></div>}
        {!color && <div className="pgrow2"><span>{a.tt("Couleur", "Colour")}</span><Swatch list={INKS} value={cust.color} auto={a.tt("Auto", "Auto")} on={(v) => set({ color: v })} /></div>}
        {icon?.tone && <div className="pgrow2"><span>{a.tt("Teinte", "Tone")}</span><div className="pgtones">{TONE_LIST.map((t) => <button key={t.id} title={a.tt(t.fr, t.en)} aria-label={a.tt(t.fr, t.en)} className={(cust.tone ?? DEFAULT_TONE) === t.id ? "on" : ""} style={{ background: TONES[t.id][0] }} onClick={() => set({ tone: t.id === DEFAULT_TONE ? undefined : t.id })} />)}</div></div>}
        <label className="rng"><span>{a.tt("Taille", "Size")}</span><input type="range" min={0.5} max={2.5} step={0.25} value={cust.scale ?? 1} onChange={(e) => set({ scale: +e.target.value === 1 ? undefined : +e.target.value })} /><output>{Math.round((cust.scale ?? 1) * 100)} %</output></label>
        {!color && <label className="rng"><span>{a.tt("Trait", "Stroke")}</span><input type="range" min={1} max={2.5} step={0.25} value={cust.stroke ?? cfg.stroke} onChange={(e) => set({ stroke: +e.target.value === cfg.stroke ? undefined : +e.target.value })} /><output>{cust.stroke ?? cfg.stroke}</output></label>}
        <div className="pgfield"><span>{a.tt("Fond", "Background")}</span><div className="seg">
          <button className={!cust.shape ? "on" : ""} onClick={() => set({ shape: undefined, bg: undefined, ...(cust.color?.toUpperCase() === "#FFFFFF" && { color: undefined }) })}>{a.tt("Aucun", "None")}</button>
          <button className={cust.shape === "round" ? "on" : ""} onClick={() => set({ shape: "round", ...(!cust.color && !color && { color: "#FFFFFF" }) })}>{a.tt("Carré", "Square")}</button>
          <button className={cust.shape === "circle" ? "on" : ""} onClick={() => set({ shape: "circle", ...(!cust.color && !color && { color: "#FFFFFF" }) })}>{a.tt("Rond", "Round")}</button>
        </div></div>
        {cust.shape && <div className="pgrow2"><span>{a.tt("Couleur du fond", "Background colour")}</span><Swatch list={BGS} value={cust.bg ?? cfg.primary} on={(v) => set({ bg: v })} /></div>}
        <div className="pgfield"><span>{a.tt("Rotation", "Rotate")}</span><div className="seg">
          {[0, 90, 180, 270].map((d) => <button key={d} className={(cust.rot ?? 0) === d ? "on" : ""} onClick={() => set({ rot: d || undefined })}>{d}°</button>)}
          <button className={cust.flip ? "on" : ""} aria-pressed={!!cust.flip} title={a.tt("Miroir", "Mirror")} onClick={() => set({ flip: cust.flip ? undefined : true })}>⇋</button>
        </div></div>
        <div className="pgacts">
          <button className="btn" disabled={!n} onClick={applyAll}>{a.tt("Appliquer à toutes", "Apply to all")}</button>
          <button className="btn" disabled={!n} onClick={reset}>{a.tt("Réinitialiser cette icône", "Reset this icon")}</button>
          <button className="btn pgall" disabled={!total} onClick={resetAll}>{a.tt("Tout réinitialiser : toutes les icônes", "Reset all: every icon")}</button>
        </div>
        <small className="pgnote">{a.tt("Les changements s'appliquent tout de suite dans la maquette et dans le code.", "Changes apply right away to the mockup and the code.")}</small>
      </div>
    </div>
  );
}
