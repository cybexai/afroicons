import { createElement, useEffect, useMemo, useState, type ComponentType, type CSSProperties } from "react";
import { AFRO, EMOJIS, FLAGS, ICONS, UI, byId, colOf, isColor, type Collection, type Icon, type Style } from "../lib/constants";
import { store } from "../lib/platform";
import { rank } from "../lib/search";
import { highlight, pascal } from "../lib/svg";
import { useApp } from "../state";
import { zipIcons } from "./Overlays";
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
const FONTS: { id: string; n: string; css: string }[] = [
  { id: "dm", n: "DM Sans", css: '"DM Sans",system-ui,sans-serif' },
  { id: "brico", n: "Bricolage", css: '"Bricolage Grotesque","DM Sans",sans-serif' },
  { id: "sys", n: "Système", css: "system-ui,-apple-system,'Segoe UI',Roboto,sans-serif" },
  { id: "serif", n: "Serif", css: "Georgia,'Times New Roman',serif" },
  { id: "mono", n: "Mono", css: '"JetBrains Mono",ui-monospace,monospace' },
];
type View = "all" | "web" | "mobile" | "site";
type Cfg = { primary: string; dark: boolean; radius: number; size: number; stroke: number; style: Style; tint: "text" | "primary"; name: string; font: string };
const DEF: Cfg = { primary: "#C24E2A", dark: false, radius: 12, size: 20, stroke: 1.75, style: "line", tint: "text", name: "NAFA ERP", font: "dm" };
type Saved = { cfg: Cfg; slots: Slots; preset: string };

// Lien partageable : les réglages et les icônes choisies, encodés dans l'ancre de l'adresse.
const enc = (s: Saved) => btoa(unescape(encodeURIComponent(JSON.stringify({ c: s.cfg, p: s.preset, s: Object.fromEntries(Object.entries(s.slots).filter(([k, v]) => v !== BASE[k])) })))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
function dec(h: string): Saved | null {
  try {
    const o = JSON.parse(decodeURIComponent(escape(atob(h.replace(/-/g, "+").replace(/_/g, "/")))));
    const slots = { ...BASE };
    for (const [k, v] of Object.entries(o.s ?? {})) if (k in BASE && typeof v === "string" && byId[v]) slots[k] = v;
    const cfg = { ...DEF };
    for (const k of Object.keys(DEF) as (keyof Cfg)[]) if (o.c?.[k] != null && typeof o.c[k] === typeof DEF[k]) (cfg as any)[k] = o.c[k];
    if (!["line", "fill"].includes(cfg.style)) cfg.style = "line";
    cfg.name = cfg.name === "Kola" ? DEF.name : cfg.name.slice(0, 24);
    return { cfg, slots, preset: PRESETS.some((p) => p.id === o.p) ? o.p : "erp" };
  } catch { return null; }
}
const initial = (): Saved => {
  const s = dec(location.hash.slice(1)) ?? store.get<Saved | null>("playground", null) ?? { cfg: DEF, slots: { ...BASE }, preset: "erp" };
  return s.cfg?.name === "Kola" ? { ...s, cfg: { ...s.cfg, name: DEF.name } } : s;
};

export function Playground() {
  const a = useApp();
  const [init] = useState(initial);
  const [preset, setPreset] = useState(init.preset);
  const [slots, setSlots] = useState<Slots>({ ...BASE, ...init.slots });
  const [cfg, setCfg] = useState<Cfg>({ ...DEF, ...init.cfg });
  const [pick, setPick] = useState<string | null>(null);
  const [view, setView] = useState<View>("all");
  const [lucide, setLucide] = useState(false);
  const [L, setL] = useState<Record<string, ComponentType<any>> | null>(null);
  const [tab, setTab] = useState<"react" | "angular" | "html" | "css">("react");
  const set = (p: Partial<Cfg>) => setCfg((c) => ({ ...c, ...p }));
  useEffect(() => { if (cfg.style === "fill") a.needFills(); }, [cfg.style]); // eslint-disable-line react-hooks/exhaustive-deps
  // Comparaison avec Lucide : chargée seulement à la demande (paquet volumineux).
  useEffect(() => { if (lucide && !L) import("lucide-react").then((m) => setL(m as unknown as Record<string, ComponentType<any>>)).catch(() => setLucide(false)); }, [lucide, L]);
  // Les réglages restent d'une visite à l'autre ; l'ancre de l'adresse les suit (lien partageable).
  const saved: Saved = { cfg, slots, preset };
  const hash = enc(saved);
  useEffect(() => {
    store.set("playground", saved);
    try { history.replaceState(null, "", location.pathname + location.search + "#" + hash); } catch { /* bac à sable */ }
  }, [hash]); // eslint-disable-line react-hooks/exhaustive-deps
  const choosePreset = (id: string) => { setPreset(id); setSlots({ ...BASE, ...PRESETS.find((p) => p.id === id)!.slots } as Slots); };
  const reset = () => { setPreset("erp"); setSlots({ ...BASE }); setCfg(DEF); a.toast(a.tt("Réglages par défaut rétablis", "Defaults restored")); };
  const share = () => a.copy(location.origin + location.pathname + "#" + hash, a.tt("Lien copié : il ouvre le bac à sable avec vos réglages", "Link copied: it opens the playground with your settings"));
  // Une icône culturelle au hasard dans chaque emplacement « africain » (logo, paiement, vitrine, état vide).
  const surprise = () => {
    const pool = AFRO.filter((i) => i.cat !== "cartes"), r = () => pool[Math.floor(Math.random() * pool.length)].id;
    setSlots((s) => ({ ...s, logo: r(), e1: r(), f1: r(), f2: r(), f3: r() }));
  };

  const ink = cfg.dark ? "#F3EADC" : "#1F1A15", bg = cfg.dark ? "#14110E" : "#FFFFFF", surface = cfg.dark ? "#1E1915" : "#F6F2EA", muted = cfg.dark ? "#A79987" : "#73685B", line = cfg.dark ? "#2F2822" : "#E8DCC8";
  const font = (FONTS.find((f) => f.id === cfg.font) ?? FONTS[0]).css;
  const vars = { "--pp": cfg.primary, "--pink": ink, "--pbg": bg, "--psurf": surface, "--pmuted": muted, "--pline": line, "--prad": cfg.radius + "px", fontFamily: font } as CSSProperties;
  const nm = (k: string) => { const i = byId[slots[k]]; return i ? (a.lang === "en" ? i.en : i.fr) : ""; };

  /** Une icône d'emplacement : cliquable pour la remplacer. */
  const I = ({ k, s = cfg.size, c }: { k: string; s?: number; c?: string }) => {
    const i = byId[slots[k]] ?? byId[BASE[k]];
    const color = c ?? (cfg.tint === "primary" ? cfg.primary : "currentColor");
    const Lc = lucide && L && i.lucide ? L[i.lucide] : null;
    return (
      <button type="button" className={"pgi" + (pick === k ? " on" : "")} title={a.tt("Changer d'icône : ", "Change icon: ") + (a.lang === "en" ? i.en : i.fr)} aria-label={a.tt("Changer d'icône : ", "Change icon: ") + (a.lang === "en" ? i.en : i.fr)} onClick={(e) => { e.stopPropagation(); setPick(k); }} style={{ color }}>
        {Lc ? createElement(Lc, { size: s, strokeWidth: cfg.stroke }) : <Svg i={i} o={{ s, w: cfg.stroke, style: cfg.style, c: "currentColor" }} />}
      </button>
    );
  };

  /** Un bouton de maquette : cliquer n'importe où dessus change son icône. */
  const B = ({ k, ghost, wide, after, children }: { k: string; ghost?: boolean; wide?: boolean; after?: boolean; children: string }) => {
    const icon = <I k={k} s={cfg.size - 2} c={ghost ? undefined : "#fff"} />;
    return <span className={"pgbtn" + (ghost ? " ghost" : "") + (wide ? " wide" : "") + (pick === k ? " on" : "")} role="presentation" onClick={(e) => { e.stopPropagation(); setPick(k); }}>{after ? <>{children}{icon}</> : <>{icon}{children}</>}</span>;
  };

  const used = useMemo(() => [...new Set(Object.values(slots))].map((id) => byId[id]).filter(Boolean) as Icon[], [slots]);
  const code = useMemo(() => {
    const uiI = used.filter((i) => i.lucide), afro = used.filter((i) => !i.lucide);
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
      `// Les mêmes réglages partout : taille ${cfg.size}, trait ${cfg.stroke}${cfg.style === "fill" ? ", style rempli (icônes culturelles)" : ""}`,
      `const icon = { size: ${cfg.size}, strokeWidth: ${cfg.stroke} };`, "",
      ...uiI.map((i) => `<${i.lucide} {...icon} />`),
      ...afro.map((i) => `<${pascal(i.id)} ${isColor(i) ? `size={${cfg.size}}` : `{...icon}${fill}`} />`),
    ].filter((x) => x !== null).join("\n");
    if (tab === "angular") {
      const names = used.map((i) => i.lucide ?? pascal(i.id));
      return [`// npm install afroicons-angular`, wrap("import { AfroiconComponent, provideAfroicons, ", names, ' } from "afroicons-angular";'), "",
        `// app.config.ts : seules les icônes déclarées entrent dans le bundle`, wrap("providers: [provideAfroicons({ ", names, " })]"), "",
        `// composant : imports: [AfroiconComponent]`,
        ...used.map((i) => `<afroicon name="${i.lucide ?? i.id}" [size]="${cfg.size}"${isColor(i) ? "" : ` [strokeWidth]="${cfg.stroke}"`}${!i.lucide && !isColor(i) && cfg.style === "fill" ? ' variant="fill"' : ""} />`),
      ].join("\n");
    }
    if (tab === "css") return [
      `/* Le thème de cet aperçu, en variables CSS */`, `:root {`, `  --primary: ${cfg.primary};`, `  --text: ${ink};`, `  --background: ${bg};`, `  --surface: ${surface};`, `  --muted: ${muted};`, `  --border: ${line};`, `  --radius: ${cfg.radius}px;`, `  --icon-size: ${cfg.size}px;`, `  --icon-stroke: ${cfg.stroke};`, `}`, "",
      `/* Les icônes Afroicons suivent la couleur du texte (currentColor) */`, `.icon { width: var(--icon-size); height: var(--icon-size); stroke-width: var(--icon-stroke);${cfg.tint === "primary" ? " color: var(--primary);" : ""} }`,
    ].join("\n");
    return [`<!-- npm install afroicons -->`, `<script type="module">`, `  import { replace } from "afroicons";`, `  replace();`, `</script>`, "",
      ...afro.map((i) => `<i data-afroicon="${i.id}" data-size="${cfg.size}"${isColor(i) ? "" : ` data-stroke="${cfg.stroke}"`}${cfg.style === "fill" && !isColor(i) ? ' data-variant="fill"' : ""}></i>`),
      ...(uiI.length ? ["", `<!-- Icônes d'interface (${uiI.map((i) => i.lucide).join(", ")}) :`, `     afroicons-ui pour React, afroicons-angular pour Angular,`, `     ou le SVG de chaque fiche sur afroicons.org -->`] : [])].join("\n");
  }, [used, cfg, tab, ink, bg, surface, muted, line]);
  const download = () => zipIcons(used, { ...a, style: cfg.style, stroke: cfg.stroke, color: null } as typeof a, `afroicons-${cfg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "app"}-${used.length}.zip`);
  const show = (v: View) => view === "all" || view === v;

  return (
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
          <button className="pglink" onClick={surprise}>{a.tt("✦ Icônes africaines au hasard", "✦ Random African icons")}</button>
          <h3>{a.tt("Votre marque", "Your brand")}</h3>
          <label className="pgfield"><span>{a.tt("Nom", "Name")}</span><input value={cfg.name} maxLength={24} onChange={(e) => set({ name: e.target.value })} /></label>
          <div className="swat pgswat">{SWATCHES.map((c) => <button key={c} aria-label={c} className={cfg.primary.toLowerCase() === c.toLowerCase() ? "on" : ""} style={{ background: c }} onClick={() => set({ primary: c })} />)}<label className={"pgcustom" + (SWATCHES.some((c) => c.toLowerCase() === cfg.primary.toLowerCase()) ? "" : " on")} title={a.tt("Couleur libre", "Custom colour")} style={{ background: SWATCHES.some((c) => c.toLowerCase() === cfg.primary.toLowerCase()) ? undefined : cfg.primary }}><input type="color" value={cfg.primary} aria-label={a.tt("Couleur libre", "Custom colour")} onChange={(e) => set({ primary: e.target.value })} /></label></div>
          <label className="pgfield"><span>{a.tt("Police", "Font")}</span><select value={cfg.font} onChange={(e) => set({ font: e.target.value })}>{FONTS.map((f) => <option key={f.id} value={f.id}>{f.n}</option>)}</select></label>
          <div className="pgfield"><span>{a.tt("Mode", "Mode")}</span><div className="seg"><button className={!cfg.dark ? "on" : ""} onClick={() => set({ dark: false })}>{a.tt("Clair", "Light")}</button><button className={cfg.dark ? "on" : ""} onClick={() => set({ dark: true })}>{a.tt("Sombre", "Dark")}</button></div></div>
          <label className="rng"><span>{a.tt("Arrondi", "Radius")}</span><input type="range" min={0} max={24} step={2} value={cfg.radius} onChange={(e) => set({ radius: +e.target.value })} /><output>{cfg.radius}</output></label>
          <h3>{a.tt("Icônes", "Icons")}</h3>
          <label className="rng"><span>{a.tt("Taille", "Size")}</span><input type="range" min={14} max={32} step={2} value={cfg.size} onChange={(e) => set({ size: +e.target.value })} /><output>{cfg.size}</output></label>
          <label className="rng"><span>{a.tt("Trait", "Stroke")}</span><input type="range" min={1} max={2.5} step={0.25} value={cfg.stroke} onChange={(e) => set({ stroke: +e.target.value })} /><output>{cfg.stroke}</output></label>
          <div className="pgfield"><span>Style</span><div className="seg"><button className={cfg.style === "line" ? "on" : ""} onClick={() => set({ style: "line" })}>{a.tt("Trait", "Line")}</button><button className={cfg.style === "fill" ? "on" : ""} onClick={() => set({ style: "fill" })}>{a.tt("Rempli", "Filled")}</button></div></div>
          <div className="pgfield"><span>{a.tt("Couleur", "Colour")}</span><div className="seg"><button className={cfg.tint === "text" ? "on" : ""} onClick={() => set({ tint: "text" })}>{a.tt("Du texte", "Text")}</button><button className={cfg.tint === "primary" ? "on" : ""} onClick={() => set({ tint: "primary" })}>{a.tt("Principale", "Primary")}</button></div></div>
          <label className="pgsw"><input type="checkbox" checked={lucide} onChange={(e) => setLucide(e.target.checked)} />{a.tt("Comparer avec Lucide (avant / après)", "Compare with Lucide (before / after)")}</label>
          {lucide && !L && <small className="pgnote">{a.tt("Chargement de Lucide…", "Loading Lucide…")}</small>}
          {lucide && L && <small className="pgnote">{a.tt("Icônes d'interface : version Lucide d'origine. Les icônes culturelles n'ont pas d'équivalent Lucide.", "Interface icons: original Lucide version. Cultural icons have no Lucide equivalent.")}</small>}
          <div className="pgacts">
            <button className="btn" onClick={share}>{a.tt("Copier le lien", "Copy link")}</button>
            <button className="btn" onClick={reset}>{a.tt("Réinitialiser", "Reset")}</button>
          </div>
        </aside>

        <div className="pgright">
          <div className="pgviews" role="tablist" aria-label={a.tt("Maquettes", "Mockups")}>
            {([["all", a.tt("Tout", "All")], ["web", a.tt("Application web", "Web app")], ["mobile", a.tt("Mobile", "Mobile")], ["site", a.tt("Site vitrine", "Website")]] as [View, string][]).map(([v, l]) => <button key={v} role="tab" aria-selected={view === v} className={"cat" + (view === v ? " on" : "")} onClick={() => setView(v)}>{l}</button>)}
            <span className="pghint">{a.tt("Astuce : cliquez sur une icône pour la remplacer", "Tip: click an icon to swap it")}</span>
          </div>
          <div className={"pgstage v-" + view} style={vars}>
            {show("web") && <div className="pgweb">
              <header className="pgnav"><span className="pglogo"><I k="logo" s={cfg.size + 4} c={cfg.primary} />{cfg.name || DEF.name}</span>
                <span className="pgsearch"><I k="search" s={cfg.size - 2} c="var(--pmuted)" /><span>{a.tt("Rechercher…", "Search…")}</span></span>
                <span className="pgnavr"><span className="pgbadge"><I k="bell" /><i>3</i></span><I k="user" s={cfg.size + 4} /></span>
              </header>
              <div className="pgbody">
                <nav className="pgside">{(["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((k, n) => <span key={k} className={"pgitem" + (n === 0 ? " on" : "")}><I k={k} /><span>{nm(k)}</span></span>)}<span className="pgitem pgout"><I k="s7" /><span>{a.tt("Se déconnecter", "Log out")}</span></span></nav>
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
            </div>}

            {show("mobile") && <div className="pgphone">
              <div className="pgpbar"><I k="menu" /><b>{cfg.name || DEF.name}</b><span className="pgbadge"><I k="bell" /><i>3</i></span></div>
              <div className="pglist">{(["l1", "l2", "l3", "l4"] as const).map((k) => <div key={k} className="pgli"><span className="pgkic"><I k={k} c={cfg.primary} /></span><div><b>{nm(k)}</b><small>{a.tt("Il y a 2 h", "2 h ago")}</small></div></div>)}</div>
              <span className="pgfab"><I k="fab" c="#fff" s={cfg.size + 2} /></span>
              <nav className="pgtabs">{(["t1", "t2", "t3", "t4", "t5"] as const).map((k, n) => <span key={k} className={n === 0 ? "on" : ""}><I k={k} c={n === 0 ? cfg.primary : undefined} /><small>{nm(k).split(/[ ,]/)[0]}</small></span>)}</nav>
            </div>}

            {show("mobile") && <div className="pgpay">
              <b className="pgpayt">{a.tt("Paiement", "Checkout")}</b>
              <div className="pgpayam"><small>{a.tt("Total à payer", "Total due")}</small><b>15 000 FCFA</b></div>
              {([["p1", "Mobile money", "Orange · MTN · Wave"], ["p2", a.tt("Carte bancaire", "Bank card"), "Visa · Mastercard"], ["p3", a.tt("Virement", "Bank transfer"), "BICEC · Ecobank"]] as const).map(([k, t, s], n) => (
                <div key={k} className={"pgopt" + (n === 0 ? " on" : "")}><span className="pgkic"><I k={k} c={cfg.primary} /></span><div><b>{t}</b><small>{s}</small></div><i className="pgradio" /></div>
              ))}
              <B k="lock" wide>{a.tt("Payer 15 000 FCFA", "Pay 15,000 FCFA")}</B>
            </div>}

            {show("web") && <div className="pgalerts">
              {([["n1", "ok", a.tt("Paiement reçu", "Payment received"), a.tt("Awa Diallo a payé 15 000 FCFA.", "Awa Diallo paid 15,000 FCFA.")], ["n2", "wait", a.tt("Stock bas", "Low stock"), a.tt("Plus que 4 sacs de riz en réserve.", "Only 4 bags of rice left.")], ["n3", "info", a.tt("Mise à jour", "Update"), a.tt("La version 2.1 est disponible.", "Version 2.1 is available.")]] as const).map(([k, cls, t, s]) => (
                <div key={k} className={"pgalert " + cls}><I k={k} c="currentColor" /><div><b>{t}</b><small>{s}</small></div><I k="x" s={cfg.size - 4} c="var(--pmuted)" /></div>
              ))}
              <div className="pgempty"><span className="pgfic"><I k="e1" s={cfg.size + 20} c={cfg.primary} /></span><b>{a.tt("Aucune commande pour l'instant", "No orders yet")}</b><small>{a.tt("Vos premières ventes apparaîtront ici.", "Your first sales will show up here.")}</small><B k="e2">{a.tt("Créer une commande", "Create an order")}</B></div>
            </div>}

            {show("site") && <div className="pgsite">
              <div className="pghero"><span className="pglogo"><I k="logo" s={cfg.size + 4} c={cfg.primary} />{cfg.name || DEF.name}</span>
                <h3>{a.tt("La gestion simple, pensée pour l'Afrique", "Simple management, designed for Africa")}</h3>
                <p>{a.tt("Ventes, stock et paiements mobiles dans une seule application.", "Sales, stock and mobile payments in one app.")}</p>
                <B k="go" after>{a.tt("Commencer", "Get started")}</B>
              </div>
              <div className="pgfeat">{(["f1", "f2", "f3"] as const).map((k) => <div key={k}><span className="pgfic"><I k={k} s={cfg.size + 12} c={cfg.primary} /></span><b>{nm(k)}</b><small>{a.tt("Une phrase qui présente la fonctionnalité.", "A sentence introducing the feature.")}</small></div>)}</div>
            </div>}
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
      </div>

      {pick && <Picker onClose={() => setPick(null)} onPick={(id) => { setSlots((s) => ({ ...s, [pick]: id })); setPick(null); }} current={slots[pick]} />}

      <div className="code pgcode" onClick={(e) => e.stopPropagation()}>
        <div className="pgcodeh">
          <h4>{a.tt(`Code des ${used.length} icônes utilisées`, `Code for the ${used.length} icons used`)}</h4>
          {a.canDownload && <button className="btn a" onClick={download}>{a.tt(`Télécharger les ${used.length} SVG (.zip)`, `Download the ${used.length} SVGs (.zip)`)}</button>}
        </div>
        <div className="ctabs" role="tablist">{(["react", "angular", "html", "css"] as const).map((k) => <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{{ react: "React", angular: "Angular", html: "HTML / JS", css: a.tt("Thème CSS", "CSS theme") }[k]}</button>)}</div>
        <div className="codebox"><pre dangerouslySetInnerHTML={{ __html: highlight(code, true) }} /><button className="cp" onClick={() => a.copy(code)}>{a.tt("Copier", "Copy")}</button></div>
      </div>
    </section>
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
function Picker({ onClose, onPick, current }: { onClose: () => void; onPick: (id: string) => void; current: string }) {
  const a = useApp();
  const [q, setQ] = useState("");
  const [col, setCol] = useState<Collection | "all">(colOf(current));
  const list = useMemo(() => rank(COLS.find((c) => c.id === col)!.list, q).slice(0, 72), [q, col]);
  useEffect(() => { const f = (e: KeyboardEvent) => e.key === "Escape" && onClose(); addEventListener("keydown", f); return () => removeEventListener("keydown", f); }, [onClose]);
  return (
    <>
      <div className="pgveil" onClick={onClose} />
      <div className="pgpick" role="dialog" aria-modal="true" aria-label={a.tt("Choisir une icône", "Choose an icon")} onClick={(e) => e.stopPropagation()}>
        <div className="pgpickh"><label className="sbox"><ISearch s={18} /><input autoFocus value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && list[0] && onPick(list[0].id)} placeholder={a.tt("Chercher : panier, cauri, bell…", "Search: basket, cowrie, bell…")} /></label><button className="ib" aria-label={a.tt("Fermer", "Close")} onClick={onClose}><IClose /></button></div>
        <div className="pgchips pgpickc">{COLS.map((c) => <button key={c.id} className={"cat" + (col === c.id ? " on" : "")} onClick={() => setCol(c.id)}>{a.tt(c.fr, c.en)}</button>)}</div>
        <div className="pgpickg">{list.length ? list.map((i) => <button key={i.id} className={i.id === current ? "on" : ""} title={a.lang === "en" ? i.en : i.fr} onClick={() => onPick(i.id)}><Svg i={i} o={{ s: 24 }} /><small>{a.lang === "en" ? i.en : i.fr}</small></button>) : <p className="pgnote">{a.tt("Aucune icône trouvée.", "No icon found.")}</p>}</div>
      </div>
    </>
  );
}
