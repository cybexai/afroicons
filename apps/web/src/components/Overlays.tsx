import { useEffect, useMemo, useRef, useState } from "react";
import { CITIES, ICONS, REGNAME, VERSION, byId, catOf, isNew, type CityId, type Icon } from "../lib/constants";
import { FACTS } from "../lib/i18n";
import { norm, rank } from "../lib/search";
import { animateDraw, cssStr, highlight, jsxSnippet, spriteStr, svgStr, svgToPng, useStr } from "../lib/svg";
import { useApp, useName } from "../state";
import { exportSvg } from "./Library";
import { IClose, IGrid, INext, IPrev, IReplay, ISearch, Svg, T } from "./ui";

/** Rend un élément inerte (ni focus ni lecteur d'écran) quand il est caché. */
export const inert = (on: boolean) => (on ? ({ inert: "" } as Record<string, string>) : {});

/* ---------------- Fiche d'une icône ---------------- */
export function Drawer() {
  const a = useApp();
  const nm = useName();
  const i = a.current ? byId[a.current] : null;
  const [last, setLast] = useState<Icon | null>(null);
  const [tab, setTab] = useState<"svg" | "jsx" | "use" | "css">("svg");
  const [prevBg, setPrevBg] = useState("card");
  const [grid, setGrid] = useState(true);
  const big = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  useEffect(() => { if (i) setLast(i); }, [i]);
  const ic = i ?? last;

  useEffect(() => { if (i && a.style === "line") animateDraw(big.current?.querySelector("svg") ?? null); }, [i?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  // Focus : on entre dans la fiche à l'ouverture, on revient où l'on était à la fermeture.
  useEffect(() => {
    if (i) {
      opener.current = document.activeElement as HTMLElement | null;
      scroller.current?.scrollTo(0, 0);
      requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>(".dnav .ib:last-child")?.focus({ preventScroll: true }));
    } else if (opener.current) { opener.current.focus({ preventScroll: true }); opener.current = null; }
  }, [!!i]); // eslint-disable-line react-hooks/exhaustive-deps

  const step = (d: number) => {
    if (!i) return;
    // Si l'icône n'est pas dans la liste filtrée (lien direct, icône du jour…), on parcourt toutes les icônes.
    const inList = a.list.some((x) => x.id === i.id);
    const L = inList && a.list.length ? a.list : ICONS;
    const k = L.findIndex((x) => x.id === i.id);
    a.openIcon(L[(k + d + L.length) % L.length].id);
  };
  useEffect(() => {
    if (!i) return;
    const f = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || a.cmdOpen || a.helpOpen || e.altKey) return;
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
      else if (e.key.toLowerCase() === "c" && !e.metaKey && !e.ctrlKey) a.copy(exportSvg(i, a));
      else if (e.key.toLowerCase() === "f" && !e.metaKey && !e.ctrlKey) a.toggleFav(i.id);
    };
    addEventListener("keydown", f);
    return () => removeEventListener("keydown", f);
  });

  if (!ic) return <><div className="scrim" /><aside className="drawer" aria-hidden="true" {...inert(true)} /></>;
  const cat = catOf(ic.cat);
  const line = a.style === "line";
  const bgs = ["card", ...a.pal.slice(0, 3), "ink"];
  const bgVal = prevBg === "card" ? "var(--card)" : prevBg === "ink" ? "var(--ink)" : prevBg;
  const fg = !line ? a.color ?? "#fff" : prevBg === "card" ? a.ink : prevBg === "ink" ? a.theme.bg : "#fff";
  const others = ICONS.filter((x) => x.cat === ic.cat && x.id !== ic.id);
  const fact = FACTS[ic.id];
  const code = { svg: exportSvg(ic, a), jsx: jsxSnippet(ic, a.stroke), use: `<!-- 1. ${a.tt("Collez le sprite une fois", "Paste the sprite once")} -->\n<!-- 2. ${a.tt("Puis", "Then")} : -->\n${useStr(ic)}`, css: cssStr(ic, a.stroke) }[tab];
  const mk = (o = {}) => <Svg i={ic} o={{ s: 20, w: a.stroke, ...o }} />;
  const close = () => a.openIcon(null);

  return (
    <>
      <div className={"scrim" + (i ? " open" : "")} onClick={close} />
      <aside ref={panel} className={"drawer" + (i ? " open" : "")} role="dialog" aria-modal="true" aria-labelledby="dTitle" aria-hidden={!i} {...inert(!i)}>
        <div className="dscroll" ref={scroller}>
          <div className="dtop">
            <div><h3 id="dTitle">{nm(ic)}</h3>
              <div className="sub"><span>{a.lang === "en" ? ic.fr : ic.en}</span><span className="badge">{a.tt(cat.fr, cat.en)}</span><span className="badge">{REGNAME[ic.region][a.lang]}</span>{isNew(ic) && <span className="badge" style={{ color: "var(--a1)" }}>v{VERSION}</span>}</div>
            </div>
            <div className="dnav">
              <button className="ib" aria-label={a.tt("Icône précédente", "Previous icon")} title={a.tt("Précédente (←)", "Previous (←)")} onClick={() => step(-1)}><IPrev w={2.2} /></button>
              <button className="ib" aria-label={a.tt("Icône suivante", "Next icon")} title={a.tt("Suivante (→)", "Next (→)")} onClick={() => step(1)}><INext w={2.2} /></button>
              <button className="ib" aria-label={a.tt("Fermer", "Close")} title={a.tt("Fermer (Échap)", "Close (Esc)")} onClick={close}><IClose w={2.2} /></button>
            </div>
          </div>
          <div className={"dprev" + (!grid || !line ? " nogrid" : "")} style={{ backgroundColor: bgVal }}>
            <div className="bgsel">{bgs.map((b) => <button key={b} aria-label={a.tt("Fond ", "Background ") + b} aria-pressed={prevBg === b} className={prevBg === b ? "on" : ""} style={{ background: b === "card" ? "var(--card)" : b === "ink" ? "var(--ink)" : b }} onClick={() => setPrevBg(b)} />)}</div>
            <div className="tb">
              <button title={a.tt("Grille", "Grid")} aria-label={a.tt("Grille", "Grid")} aria-pressed={grid} onClick={() => setGrid((g) => !g)}><IGrid s={16} /></button>
              <button title={a.tt("Rejouer le tracé", "Replay")} aria-label={a.tt("Rejouer le tracé", "Replay")} onClick={() => animateDraw(big.current?.querySelector("svg") ?? null)}><IReplay s={16} /></button>
            </div>
            <div id="dBig" ref={big}><Svg key={ic.id + a.style} i={ic} o={{ s: line ? 212 : 180, c: fg, style: a.style, w: a.stroke, bg: a.badgeBg }} /></div>
          </div>
          <div className="dsizes">{[16, 20, 24, 32, 48].map((s) => <div key={s} style={{ color: a.ink }}><Svg i={ic} o={{ s, style: a.style, w: a.stroke, bg: a.badgeBg, c: line ? "currentColor" : a.color ?? "#fff" }} /><small>{s}</small></div>)}</div>
          <div className="dtags">{ic.tags.map((x) => <button key={x} onClick={() => { close(); dispatchEvent(new CustomEvent("afroicons:filter", { detail: { q: x, favOnly: false } })); document.getElementById("icones")?.scrollIntoView(); }}>#{x}</button>)}</div>
          {fact && <div className="fact"><i>?</i><div><b><T k="didu" /></b><span>{fact[a.lang === "en" ? 1 : 0]}</span></div></div>}
          <div className="dacts">
            <button className="btn p" onClick={() => a.copy(exportSvg(ic, a))}><T k="cSvg" /><span className="kbd" style={{ background: "transparent", color: "inherit", borderColor: "#fff4" }}>C</span></button>
            <button className="btn" onClick={() => a.toggleFav(ic.id)}>{a.favs.has(ic.id) ? a.t("remFav") : a.t("addFav")}</button>
            {a.canDownload && <button className="btn a" onClick={() => a.save(`afroicon-${ic.id}.svg`, exportSvg(ic, a))}><T k="dSvg" /></button>}
            {a.canDownload && <button className="btn" onClick={async () => a.save(`afroicon-${ic.id}.png`, await svgToPng(svgStr(ic, { s: 512, style: a.style, w: a.stroke, bg: a.badgeBg, c: line ? a.ink : a.color ?? "#fff" }), 512, 512))}><T k="dPng" /></button>}
          </div>
          <div className="ctx"><h4><T k="ctx" /></h4>
            <div className="ctxg">
              <div><span className="mbtn">{mk({ c: "#fff", w: 2 })}{a.tt("Commander", "Order")}</span></div>
              <div><div className="tabbar">{[ic, ...others.slice(0, 3)].map((x, k) => <span key={x.id} className={k === 0 ? "on" : ""}><Svg i={x} o={{ s: 20, w: 1.9 }} />{nm(x).split(" ")[0].slice(0, 9)}</span>)}</div></div>
              <div><div className="lrow"><span className="av">{mk({ s: 22 })}</span><div><b>{nm(ic)}</b><small>{REGNAME[ic.region][a.lang]}</small></div></div></div>
              <div><span className="notif"><i>{mk({ s: 16, w: 2.2 })}</i>{a.tt("Ajouté au panier", "Added to basket")}</span></div>
            </div>
          </div>
          <div className="code"><h4><T k="code" /></h4>
            <div className="ctabs" role="tablist">{(["svg", "jsx", "use", "css"] as const).map((k) => <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{{ svg: "SVG", jsx: "React", use: "Sprite", css: "CSS" }[k]}</button>)}</div>
            <div className="codebox"><pre dangerouslySetInnerHTML={{ __html: highlight(code, tab === "css") }} /><button className="cp" onClick={() => a.copy(code)}><T k="cp" /></button></div>
          </div>
          <div className="sim"><h4><T k="sim" /></h4>
            <div className="simg">{others.slice(0, 12).map((x) => <button key={x.id} title={nm(x)} aria-label={nm(x)} style={{ color: a.ink }} onClick={() => a.openIcon(x.id)}><Svg i={x} o={{ s: 26, w: a.stroke }} /></button>)}</div>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ---------------- Barre de sélection ---------------- */
export async function zipIcons(list: Icon[], a: ReturnType<typeof useApp>, name: string) {
  const { default: JSZip } = await import("jszip");
  const z = new JSZip(), f = z.folder("afroicons")!;
  list.forEach((i) => f.file(`svg/${i.id}.svg`, exportSvg(i, a)));
  f.file("sprite.svg", spriteStr(list, a.stroke));
  f.file("icons.json", JSON.stringify(list.map(({ id, fr, en, cat, region, tags }) => ({ id, fr, en, cat, region, tags })), null, 2));
  f.file("README.md", `# Afroicons v${VERSION}\n\n${list.length} icônes SVG — grille 24 px, trait ${a.stroke}, couleur currentColor.\n\n- svg/ : une icône par fichier\n- sprite.svg : toutes les icônes en <symbol>, à utiliser avec <use href="#afroicon-ID"/>\n- icons.json : noms FR/EN, catégories, régions et mots-clés\n\nhttps://afroicons.org\n`);
  await a.save(name, await z.generateAsync({ type: "blob" }));
}

export function Tray() {
  const a = useApp();
  const ids = [...a.sel];
  const n = ids.length;
  return (
    <aside className={"tray" + (n ? " open" : "")} aria-label={a.tt("Sélection", "Selection")} {...inert(!n)}>
      <div className="th">{ids.slice(-10).map((id) => <Svg key={id} i={byId[id]} o={{ s: 22 }} />)}</div>
      <b>{a.lang === "en" ? `${n} selected` : `${n} sélectionnée${n > 1 ? "s" : ""}`}</b>
      <button className="btn" onClick={() => a.copy(spriteStr(ids.map((id) => byId[id]), a.stroke))}><span className="lg"><T k="tCopy" /></span><span className="sm">Sprite</span></button>
      <button className="btn" onClick={() => { a.setPattern((p) => ({ ...p, icons: ids })); document.getElementById("atelier")?.scrollIntoView(); a.toast(a.tt("Motif créé à partir de votre sélection", "Pattern created from your selection")); }}><span className="lg"><T k="tPat" /></span><span className="sm">{a.tt("Motif", "Pattern")}</span></button>
      {a.canDownload && <button className="btn a" onClick={() => zipIcons(ids.map((id) => byId[id]), a, `afroicons-selection-${n}.zip`)}><span className="lg"><T k="tZip" /></span><span className="sm">.zip</span></button>}
      <button className="btn" aria-label={a.tt("Vider", "Clear")} onClick={() => { a.setSel(new Set()); a.setSelecting(false); }}><IClose s={16} w={2.4} /></button>
    </aside>
  );
}

/* ---------------- Palette de commandes ---------------- */
export function CommandPalette() {
  const a = useApp();
  const nm = useName();
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const res = useRef<HTMLDivElement>(null);
  useEffect(() => { if (a.cmdOpen) { setQ(""); setIdx(0); input.current?.focus(); } }, [a.cmdOpen]);

  const actions = useMemo(() => [
    { lbl: a.t("hk8"), ic: "luneetoiles", run: () => a.setMode(a.mode === "dark" ? "light" : "dark") },
    { lbl: a.tt("Aller à l'atelier de motifs", "Go to the pattern studio"), ic: "wax", run: () => document.getElementById("atelier")?.scrollIntoView() },
    { lbl: a.tt("Voir mes favoris", "Show favourites"), ic: "sankofa", run: () => { dispatchEvent(new CustomEvent("afroicons:filter", { detail: { favOnly: true } })); document.getElementById("icones")?.scrollIntoView(); } },
    { lbl: a.tt("Copier le sprite SVG complet", "Copy the full SVG sprite"), ic: "kente", run: () => a.copy(spriteStr(ICONS, a.stroke)) },
    { lbl: a.tt("Proposer une icône", "Suggest an icon"), ic: "panier", run: () => document.getElementById("idees")?.scrollIntoView() },
    ...(Object.entries(CITIES) as [CityId, (typeof CITIES)[CityId]][]).map(([k, v]) => ({ lbl: a.tt("Ambiance : ", "Mood: ") + v.n, ic: "afrique", run: () => a.setCity(k) })),
    { lbl: a.lang === "en" ? "Passer en français" : "Switch to English", ic: "ville", run: () => a.setLang(a.lang === "en" ? "fr" : "en") },
  ], [a]);

  const icons = (q ? rank(ICONS, q) : ICONS.filter(isNew)).slice(0, 8);
  const acts = actions.filter((x) => !q || norm(x.lbl).includes(norm(q))).slice(0, q ? 4 : 3);
  const items = [...icons.map((i) => ({ type: "icon" as const, i })), ...acts.map((x) => ({ type: "act" as const, x }))];
  useEffect(() => { res.current?.querySelector(".it.on")?.scrollIntoView({ block: "nearest" }); }, [idx]);

  const run = (k: number, shift = false) => {
    const it = items[k];
    if (!it) return;
    a.setCmdOpen(false);
    if (it.type === "icon") shift ? a.copy(exportSvg(it.i, a)) : a.openIcon(it.i.id);
    else it.x.run();
  };

  return (
    <div className={"pal-scrim" + (a.cmdOpen ? " open" : "")} {...inert(!a.cmdOpen)} onClick={(e) => { if (e.target === e.currentTarget) a.setCmdOpen(false); }}>
      <div className="cmd" role="dialog" aria-modal="true" aria-label={a.tt("Recherche", "Search")}>
        <div className="in"><ISearch s={20} />
          <input ref={input} value={q} autoComplete="off" aria-label={a.tt("Chercher une icône ou une action", "Search an icon or an action")} placeholder={a.tt("Chercher une icône ou une action…", "Search an icon or an action…")} onChange={(e) => { setQ(e.target.value); setIdx(0); }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setIdx((x) => Math.min(items.length - 1, x + 1)); }
              else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((x) => Math.max(0, x - 1)); }
              else if (e.key === "Enter") { e.preventDefault(); run(idx, e.shiftKey); }
              else if (e.key === "Escape") a.setCmdOpen(false);
            }} />
          <span className="kbd">Esc</span><button className="cmdx" aria-label={a.tt("Fermer", "Close")} onClick={() => a.setCmdOpen(false)}><IClose s={18} /></button>
        </div>
        <div className="res" ref={res}>
          {!items.length && <div className="empty" style={{ padding: 30 }}><T k="e1" /></div>}
          {!!icons.length && <div className="grp">{q ? a.tt("Icônes", "Icons") : a.tt("Nouveautés v", "New in v") + VERSION}</div>}
          {icons.map((i, k) => (
            <button key={i.id} className={"it" + (idx === k ? " on" : "")} onMouseEnter={() => setIdx(k)} onClick={(e) => run(k, e.shiftKey)}>
              <span className="ic" style={{ color: a.ink }}><Svg i={i} o={{ s: 22 }} /></span><b>{nm(i)}</b><small>{a.lang === "en" ? i.fr : i.en}</small><span className="kbd k">↵</span>
            </button>
          ))}
          {!!acts.length && <div className="grp">Actions</div>}
          {acts.map((x, j) => {
            const k = icons.length + j;
            return <button key={x.lbl} className={"it" + (idx === k ? " on" : "")} onMouseEnter={() => setIdx(k)} onClick={() => run(k)}><span className="ic"><Svg i={byId[x.ic] ?? ICONS[0]} o={{ s: 20 }} /></span><b>{x.lbl}</b><span className="kbd k">↵</span></button>;
          })}
        </div>
        <div className="foot"><span><span className="kbd">↑↓</span><span><T k="cf1" /></span></span><span><span className="kbd">{a.tt("Entrée", "Enter")}</span><span><T k="cf2" /></span></span><span><span className="kbd">⇧ {a.tt("Entrée", "Enter")}</span><span><T k="cf3" /></span></span></div>
      </div>
    </div>
  );
}

export function Help() {
  const a = useApp();
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => { if (a.helpOpen) box.current?.focus(); }, [a.helpOpen]);
  const rows: [string, string][] = [["⌘K", "hk1"], ["/", "hk2"], ["←↑→↓", "hk3"], [a.tt("Entrée", "Enter"), "hk4"], ["C", "hk5"], ["F", "hk6"], ["X", "hk7"], ["T", "hk8"], ["Esc", "hk9"]];
  return (
    <div className={"help" + (a.helpOpen ? " open" : "")} {...inert(!a.helpOpen)} onClick={() => a.setHelpOpen(false)}>
      <div className="box" ref={box} tabIndex={-1} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="hkTitle"><h3 id="hkTitle"><T k="hk" /></h3><dl>{rows.map(([k, l]) => <div key={l} style={{ display: "contents" }}><dt><span className="kbd">{k}</span></dt><dd style={{ margin: 0 }}><T k={l} /></dd></div>)}</dl></div>
    </div>
  );
}

export function Toast() {
  const { toastMsg } = useApp();
  const [last, setLast] = useState("");
  useEffect(() => { if (toastMsg) setLast(toastMsg); }, [toastMsg]);
  return (
    <div className={"toast" + (toastMsg ? " show" : "")} role="status">
      <i><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></i><span>{toastMsg ?? last}</span>
    </div>
  );
}
