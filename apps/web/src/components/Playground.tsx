import { createElement, useEffect, useMemo, useState, type ComponentType, type CSSProperties } from "react";
import { ICONS, byId, isColor, type Icon, type Style } from "../lib/constants";
import { rank } from "../lib/search";
import { highlight, pascal } from "../lib/svg";
import { useApp } from "../state";
import { IClose, ISearch, Svg } from "./ui";

/* Bac à sable : les icônes dans des interfaces réalistes (application web, mobile, vitrine), réglées comme le
   site du développeur, avec le code des icônes utilisées. Chaque emplacement est cliquable pour changer d'icône. */

const ui = (n: string) => "ui-" + n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([a-zA-Z])(\d)/g, "$1-$2").toLowerCase();
type Slots = Record<string, string>;
const BASE: Slots = {
  logo: "case", search: ui("Search"), bell: ui("Bell"), user: ui("UserCircle"), menu: ui("Menu"),
  s1: ui("LayoutDashboard"), s2: ui("ShoppingCart"), s3: ui("Boxes"), s4: ui("Users"), s5: ui("Wallet"), s6: ui("Settings"), s7: ui("LogOut"),
  k1: ui("TrendingUp"), k2: ui("Banknote"), k3: ui("Package"),
  b1: ui("Plus"), b2: ui("Download"),
  t1: ui("Home"), t2: ui("Store"), t3: ui("Wallet"), t4: ui("MessageCircle"), t5: ui("User"),
  l1: ui("Truck"), l2: ui("Receipt"), l3: ui("Phone"), l4: ui("MapPin"), fab: ui("Plus"),
  f1: "mobilemoney", f2: "mototaxi", f3: "boutique",
};
const PRESETS: { id: string; fr: string; en: string; slots: Partial<Slots> }[] = [
  { id: "erp", fr: "Gestion (ERP)", en: "Business (ERP)", slots: {} },
  { id: "money", fr: "Mobile money", en: "Mobile money", slots: { logo: "cauri", s2: ui("Send"), s3: ui("CreditCard"), s4: ui("Landmark"), s5: ui("PiggyBank"), k1: ui("HandCoins"), k2: ui("Percent"), k3: ui("ShieldCheck"), t2: ui("Send"), t3: ui("CreditCard"), l1: ui("Landmark"), l2: ui("Receipt"), l3: ui("Smartphone"), l4: ui("ShieldCheck"), f1: "mobilemoney", f2: "tontine", f3: "cauri" } },
  { id: "shop", fr: "Boutique en ligne", en: "Online shop", slots: { logo: "panier", s2: ui("ShoppingBag"), s3: ui("Tag"), s4: ui("Truck"), s5: ui("Star"), k1: ui("ShoppingCart"), k2: ui("Tag"), k3: ui("Truck"), t2: ui("ShoppingBag"), t3: ui("ShoppingCart"), l1: ui("Package"), l2: ui("Truck"), l3: ui("MapPin"), l4: ui("CreditCard"), f1: "panier", f2: "mototaxi", f3: "etal" } },
  { id: "agri", fr: "Agriculture", en: "Farming", slots: { logo: "epimil", s2: ui("Sprout"), s3: ui("Tractor"), s4: ui("Warehouse"), s5: ui("Scale"), k1: ui("Sprout"), k2: ui("CloudOff"), k3: ui("Calendar"), t2: ui("Sprout"), t3: ui("Tractor"), l1: ui("Calendar"), l2: ui("Scale"), l3: ui("Truck"), l4: ui("MapPin"), f1: "houe", f2: "pluie", f3: "baobab" } },
  { id: "health", fr: "Santé", en: "Health", slots: { logo: "calebasse", s2: ui("Stethoscope"), s3: ui("Pill"), s4: ui("CalendarCheck"), s5: ui("FileText"), k1: ui("Activity"), k2: ui("CalendarCheck"), k3: ui("Pill"), t2: ui("Stethoscope"), t3: ui("CalendarCheck"), l1: ui("Pill"), l2: ui("FileText"), l3: ui("Phone"), l4: ui("MapPin"), f1: "calebasse", f2: "panneausolaire", f3: "taxibrousse" } },
];
const SWATCHES = ["#C24E2A", "#E3A22F", "#22305C", "#2E6B4E", "#7B4BA8", "#0F766E", "#1F1A15"];

type Cfg = { primary: string; dark: boolean; radius: number; size: number; stroke: number; style: Style; tint: "text" | "primary" };

export function Playground() {
  const a = useApp();
  const [preset, setPreset] = useState("erp");
  const [slots, setSlots] = useState<Slots>({ ...BASE });
  const [cfg, setCfg] = useState<Cfg>({ primary: "#C24E2A", dark: false, radius: 12, size: 20, stroke: 1.75, style: "line", tint: "text" });
  const [pick, setPick] = useState<string | null>(null);
  const [lucide, setLucide] = useState(false);
  const [L, setL] = useState<Record<string, ComponentType<any>> | null>(null);
  const [tab, setTab] = useState<"react" | "angular" | "html">("react");
  const set = (p: Partial<Cfg>) => setCfg((c) => ({ ...c, ...p }));
  useEffect(() => { if (cfg.style === "fill") a.needFills(); }, [cfg.style]); // eslint-disable-line react-hooks/exhaustive-deps
  // Comparaison avec Lucide : chargée seulement à la demande (paquet volumineux).
  useEffect(() => { if (lucide && !L) import("lucide-react").then((m) => setL(m as unknown as Record<string, ComponentType<any>>)); }, [lucide, L]);
  const choosePreset = (id: string) => { setPreset(id); setSlots({ ...BASE, ...PRESETS.find((p) => p.id === id)!.slots } as Slots); };

  const ink = cfg.dark ? "#F3EADC" : "#1F1A15", bg = cfg.dark ? "#14110E" : "#FFFFFF", surface = cfg.dark ? "#1E1915" : "#F6F2EA", muted = cfg.dark ? "#A79987" : "#73685B", line = cfg.dark ? "#2F2822" : "#E8DCC8";
  const vars = { "--pp": cfg.primary, "--pink": ink, "--pbg": bg, "--psurf": surface, "--pmuted": muted, "--pline": line, "--prad": cfg.radius + "px" } as CSSProperties;

  /** Une icône d'emplacement : cliquable pour la remplacer. */
  const I = ({ k, s = cfg.size, c, label }: { k: string; s?: number; c?: string; label?: string }) => {
    const i = byId[slots[k]] ?? byId[BASE[k]];
    const color = c ?? (cfg.tint === "primary" ? cfg.primary : "currentColor");
    const Lc = lucide && L && i.lucide ? L[i.lucide] : null;
    return (
      <button type="button" className={"pgi" + (pick === k ? " on" : "")} title={a.tt("Changer d'icône : ", "Change icon: ") + (a.lang === "en" ? i.en : i.fr)} aria-label={label ?? (a.lang === "en" ? i.en : i.fr)} onClick={(e) => { e.stopPropagation(); setPick(k); }} style={{ color }}>
        {Lc ? createElement(Lc, { size: s, strokeWidth: cfg.stroke }) : <Svg i={i} o={{ s, w: cfg.stroke, style: cfg.style, c: "currentColor" }} />}
      </button>
    );
  };

  const used = useMemo(() => [...new Set(Object.values(slots))].map((id) => byId[id]).filter(Boolean) as Icon[], [slots]);
  const code = useMemo(() => {
    const uiI = used.filter((i) => i.lucide), afro = used.filter((i) => !i.lucide);
    const fill = cfg.style === "fill" ? ' variant="fill"' : "";
    if (tab === "react") return [
      uiI.length && `import { ${uiI.map((i) => i.lucide).join(", ")} } from "afroicons-ui";`,
      afro.length && `import { ${afro.map((i) => pascal(i.id)).join(", ")} } from "afroicons-react";`, "",
      ...uiI.slice(0, 3).map((i) => `<${i.lucide} size={${cfg.size}} strokeWidth={${cfg.stroke}} />`),
      ...afro.slice(0, 3).map((i) => `<${pascal(i.id)} size={${cfg.size}}${isColor(i) ? "" : ` strokeWidth={${cfg.stroke}}${fill}`} />`),
    ].filter((x): x is string => typeof x === "string").join("\n");
    if (tab === "angular") return [
      `import { AfroiconComponent, provideAfroicons,`, `  ${used.map((i) => i.lucide ?? pascal(i.id)).join(", ")} } from "afroicons-angular";`, "",
      `providers: [provideAfroicons({ ${used.map((i) => i.lucide ?? pascal(i.id)).join(", ")} })]`, "",
      ...used.slice(0, 4).map((i) => `<afroicon name="${i.lucide ?? i.id}" [size]="${cfg.size}" [strokeWidth]="${cfg.stroke}"${!i.lucide && cfg.style === "fill" ? ' variant="fill"' : ""} />`),
    ].join("\n");
    return [`<!-- npm install afroicons -->`, `<script type="module">`, `  import { replace } from "afroicons";`, `  replace();`, `</script>`, "",
      ...afro.slice(0, 4).map((i) => `<i data-afroicon="${i.id}" data-size="${cfg.size}" data-stroke="${cfg.stroke}"${cfg.style === "fill" && !isColor(i) ? ' data-variant="fill"' : ""}></i>`),
      ...(uiI.length ? ["", `<!-- Icônes d'interface (${uiI.map((i) => i.lucide).join(", ")}) : afroicons-ui pour React,`, `     afroicons-angular pour Angular, ou le SVG de chaque fiche sur afroicons.org -->`] : [])].join("\n");
  }, [used, cfg, tab]);

  return (
    <section id="playground" className="pg" onClick={() => setPick(null)}>
      <div className="shead"><div>
        <div className="kick">{a.tt("Bac à sable", "Playground")}</div>
        <h2>{a.tt("Essayez les icônes dans votre interface", "Try the icons in your interface")}</h2>
        <p>{a.tt("Réglez couleurs, taille et épaisseur comme sur votre site, cliquez sur une icône pour la remplacer, puis copiez le code.", "Set colours, size and stroke like your site, click an icon to swap it, then copy the code.")}</p>
      </div></div>
      <div className="pglay">
        <aside className="pgctl" onClick={(e) => e.stopPropagation()}>
          <h3>{a.tt("Thème de départ", "Starter set")}</h3>
          <div className="pgchips">{PRESETS.map((p) => <button key={p.id} className={"cat" + (preset === p.id ? " on" : "")} onClick={() => choosePreset(p.id)}>{a.tt(p.fr, p.en)}</button>)}</div>
          <h3>{a.tt("Couleur principale", "Primary colour")}</h3>
          <div className="swat">{SWATCHES.map((c) => <button key={c} aria-label={c} className={cfg.primary === c ? "on" : ""} style={{ background: c }} onClick={() => set({ primary: c })} />)}<input type="color" value={cfg.primary} aria-label={a.tt("Couleur libre", "Custom colour")} onChange={(e) => set({ primary: e.target.value })} /></div>
          <h3>{a.tt("Apparence", "Appearance")}</h3>
          <div className="seg"><button className={!cfg.dark ? "on" : ""} onClick={() => set({ dark: false })}>{a.tt("Clair", "Light")}</button><button className={cfg.dark ? "on" : ""} onClick={() => set({ dark: true })}>{a.tt("Sombre", "Dark")}</button></div>
          <label className="rng"><span>{a.tt("Arrondi", "Radius")}</span><input type="range" min={0} max={24} step={2} value={cfg.radius} onChange={(e) => set({ radius: +e.target.value })} /><output>{cfg.radius}</output></label>
          <h3>{a.tt("Icônes", "Icons")}</h3>
          <label className="rng"><span>{a.tt("Taille", "Size")}</span><input type="range" min={14} max={32} step={2} value={cfg.size} onChange={(e) => set({ size: +e.target.value })} /><output>{cfg.size}</output></label>
          <label className="rng"><span>{a.tt("Trait", "Stroke")}</span><input type="range" min={1} max={2.5} step={0.25} value={cfg.stroke} onChange={(e) => set({ stroke: +e.target.value })} /><output>{cfg.stroke}</output></label>
          <div className="seg"><button className={cfg.style === "line" ? "on" : ""} onClick={() => set({ style: "line" })}>{a.tt("Trait", "Line")}</button><button className={cfg.style === "fill" ? "on" : ""} onClick={() => set({ style: "fill" })}>{a.tt("Rempli", "Filled")}</button></div>
          <div className="seg"><button className={cfg.tint === "text" ? "on" : ""} onClick={() => set({ tint: "text" })}>{a.tt("Couleur du texte", "Text colour")}</button><button className={cfg.tint === "primary" ? "on" : ""} onClick={() => set({ tint: "primary" })}>{a.tt("Couleur principale", "Primary")}</button></div>
          <label className="pgsw"><input type="checkbox" checked={lucide} onChange={(e) => setLucide(e.target.checked)} />{a.tt("Comparer avec Lucide (avant / après)", "Compare with Lucide (before / after)")}</label>
          {lucide && !L && <small className="pgnote">{a.tt("Chargement de Lucide…", "Loading Lucide…")}</small>}
          {lucide && L && <small className="pgnote">{a.tt("Icônes d'interface : version Lucide d'origine. Les icônes culturelles n'ont pas d'équivalent Lucide.", "Interface icons: original Lucide version. Cultural icons have no Lucide equivalent.")}</small>}
        </aside>

        <div className="pgstage" style={vars}>
          {/* Application web */}
          <div className="pgweb">
            <header className="pgnav"><span className="pglogo"><I k="logo" s={cfg.size + 4} c={cfg.primary} />Kola</span>
              <span className="pgsearch"><I k="search" s={cfg.size - 2} c="var(--pmuted)" /><span>{a.tt("Rechercher…", "Search…")}</span></span>
              <span className="pgnavr"><span className="pgbadge"><I k="bell" /><i>3</i></span><I k="user" s={cfg.size + 4} /></span>
            </header>
            <div className="pgbody">
              <nav className="pgside">{(["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((k, n) => <span key={k} className={"pgitem" + (n === 0 ? " on" : "")}><I k={k} />{a.lang === "en" ? byId[slots[k]]?.en : byId[slots[k]]?.fr}</span>)}<span className="pgitem pgout"><I k="s7" />{a.tt("Se déconnecter", "Log out")}</span></nav>
              <main className="pgmain">
                <div className="pgrow"><h4>{a.tt("Tableau de bord", "Dashboard")}</h4><span className="pgbtn ghost"><I k="b2" s={cfg.size - 2} />{a.tt("Exporter", "Export")}</span><span className="pgbtn"><I k="b1" s={cfg.size - 2} c="#fff" />{a.tt("Nouveau", "New")}</span></div>
                <div className="pgkpis">{([["k1", "2,4 M", "+12 %"], ["k2", "845 000", "FCFA"], ["k3", "128", a.tt("en cours", "pending")]] as const).map(([k, v, s]) => <div key={k} className="pgkpi"><span className="pgkic"><I k={k} c={cfg.primary} /></span><b>{v}</b><small>{s}</small></div>)}</div>
                <div className="pgform"><span className="pginput"><I k="l3" s={cfg.size - 2} c="var(--pmuted)" /><span>+237 6 70 00 00 00</span></span><span className="pginput"><I k="l4" s={cfg.size - 2} c="var(--pmuted)" /><span>Douala, Akwa</span></span></div>
              </main>
            </div>
          </div>

          {/* Application mobile */}
          <div className="pgphone">
            <div className="pgpbar"><I k="menu" /><b>Kola</b><span className="pgbadge"><I k="bell" /><i>3</i></span></div>
            <div className="pglist">{(["l1", "l2", "l3", "l4"] as const).map((k) => <div key={k} className="pgli"><span className="pgkic"><I k={k} c={cfg.primary} /></span><div><b>{a.lang === "en" ? byId[slots[k]]?.en : byId[slots[k]]?.fr}</b><small>{a.tt("Il y a 2 h", "2 h ago")}</small></div></div>)}</div>
            <span className="pgfab"><I k="fab" c="#fff" s={cfg.size + 2} /></span>
            <nav className="pgtabs">{(["t1", "t2", "t3", "t4", "t5"] as const).map((k, n) => <span key={k} className={n === 0 ? "on" : ""}><I k={k} c={n === 0 ? cfg.primary : undefined} /><small>{(a.lang === "en" ? byId[slots[k]]?.en : byId[slots[k]]?.fr)?.split(" ")[0]}</small></span>)}</nav>
          </div>

          {/* Vitrine */}
          <div className="pgfeat">{(["f1", "f2", "f3"] as const).map((k) => <div key={k}><span className="pgfic"><I k={k} s={cfg.size + 12} c={cfg.primary} /></span><b>{a.lang === "en" ? byId[slots[k]]?.en : byId[slots[k]]?.fr}</b><small>{a.tt("Une phrase qui présente la fonctionnalité.", "A sentence introducing the feature.")}</small></div>)}</div>
        </div>
      </div>

      {pick && <Picker onClose={() => setPick(null)} onPick={(id) => { setSlots((s) => ({ ...s, [pick]: id })); setPick(null); }} current={slots[pick]} />}

      <div className="code pgcode" onClick={(e) => e.stopPropagation()}>
        <h4>{a.tt(`Code des ${used.length} icônes utilisées`, `Code for the ${used.length} icons used`)}</h4>
        <div className="ctabs" role="tablist">{(["react", "angular", "html"] as const).map((k) => <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{{ react: "React", angular: "Angular", html: "HTML / JS" }[k]}</button>)}</div>
        <div className="codebox"><pre dangerouslySetInnerHTML={{ __html: highlight(code, true) }} /><button className="cp" onClick={() => a.copy(code)}>{a.tt("Copier", "Copy")}</button></div>
      </div>
    </section>
  );
}

/** Choix d'une icône pour un emplacement : recherche dans toute la bibliothèque. */
function Picker({ onClose, onPick, current }: { onClose: () => void; onPick: (id: string) => void; current: string }) {
  const a = useApp();
  const [q, setQ] = useState("");
  const list = useMemo(() => rank(ICONS, q).slice(0, 60), [q]);
  useEffect(() => { const f = (e: KeyboardEvent) => e.key === "Escape" && onClose(); addEventListener("keydown", f); return () => removeEventListener("keydown", f); }, [onClose]);
  return (
    <div className="pgpick" role="dialog" aria-label={a.tt("Choisir une icône", "Choose an icon")} onClick={(e) => e.stopPropagation()}>
      <div className="pgpickh"><label className="sbox"><ISearch s={18} /><input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={a.tt("Chercher une icône : panier, cauri, bell…", "Search an icon: basket, cowrie, bell…")} /></label><button className="ib" aria-label={a.tt("Fermer", "Close")} onClick={onClose}><IClose /></button></div>
      <div className="pgpickg">{list.map((i) => <button key={i.id} className={i.id === current ? "on" : ""} title={a.lang === "en" ? i.en : i.fr} onClick={() => onPick(i.id)}><Svg i={i} o={{ s: 24 }} /><small>{(a.lang === "en" ? i.en : i.fr).slice(0, 14)}</small></button>)}</div>
    </div>
  );
}
