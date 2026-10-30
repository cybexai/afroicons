import { memo, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AFRO, CATS, FAMILIES, REGS, STYLES, UI, byId, isNew, lineLike, type Icon, type Style } from "../lib/constants";
import { rank } from "../lib/search";
import { svgStr } from "../lib/svg";
import { useApp, useName } from "../state";
import { ICheck, IChevron, ICopy, IHeart, ISearch, ISelect, ISliders, Svg, T } from "./ui";
import { inert } from "./Overlays";

export const exportSvg = (i: Icon, a: { style: Style; stroke: number; color: string | null; badgeBg: string }) =>
  svgStr(i, { style: a.style, w: a.stroke, bg: a.badgeBg, cls: `afroicon afroicon-${i.id}`, c: lineLike(a.style) ? "currentColor" : a.color ?? "#FFFFFF" });

/** Réglages d'icône : style, couleur, fond de pastille, épaisseur (et taille d'aperçu dans la bibliothèque). */
export type CustomValue = { style: Style; color: string | null; bg: string | null; stroke: number; size?: number };

/**
 * Champs de réglage, pilotés de l'extérieur : le menu « Personnaliser » les relie aux réglages du site,
 * la fiche d'une icône à ses propres réglages (qui ne touchent que cette icône).
 */
export function CustomizeFields({ v, set, onReset }: { v: CustomValue; set: (p: Partial<CustomValue>) => void; onReset: () => void }) {
  const a = useApp();
  const ink = v.color ?? a.theme.ink, badgeBg = v.bg ?? a.pal[0];
  const inks = [a.theme.ink, ...a.pal];
  const pickStyle = (s: Style) => {
    const p: Partial<CustomValue> = { style: s };
    if (!lineLike(s) && !v.color) p.color = "#FFFFFF";
    if (lineLike(s) && v.color?.toUpperCase() === "#FFFFFF") p.color = null;
    set(p);
  };
  return (
    <div className="cfields">
      <div className="blk"><h3><T k="pStyle" /></h3>
        <div className="styles">{STYLES.map((s) => (
          <button key={s.id} className={v.style === s.id ? "on" : ""} aria-pressed={v.style === s.id} onClick={() => pickStyle(s.id)}>
            <Svg i={byId.baobab} o={{ s: 30, style: s.id, c: lineLike(s.id) ? ink : "#fff", bg: badgeBg }} />{a.tt(s.fr, s.en)}
          </button>
        ))}</div>
      </div>
      <div className="blk"><h3><T k="pCol" /></h3>
        <div className="swat">
          {inks.map((x) => <button key={x} style={{ background: x }} aria-label={a.t("pCol") + " " + x} aria-pressed={ink === x} className={ink === x ? "on" : ""} onClick={() => set({ color: x === a.theme.ink ? null : x })} />)}
          {!lineLike(v.style) && <button style={{ background: "#fff" }} aria-label={a.t("pCol") + " #FFFFFF"} className={v.color?.toUpperCase() === "#FFFFFF" ? "on" : ""} onClick={() => set({ color: "#FFFFFF" })} />}
          <input type="color" value={ink.length === 7 ? ink : "#000000"} onChange={(e) => set({ color: e.target.value })} title={a.tt("Couleur libre", "Custom colour")} aria-label={a.tt("Couleur libre", "Custom colour")} />
        </div>
      </div>
      {!lineLike(v.style) && (
        <div className="blk"><h3><T k="pBg" /></h3>
          <div className="swat">
            {[...a.pal, a.theme.ink].map((x) => <button key={x} style={{ background: x }} aria-label={a.t("pBg") + " " + x} className={badgeBg === x ? "on" : ""} onClick={() => set({ bg: x })} />)}
            <input type="color" value={badgeBg} aria-label={a.t("pBg")} onChange={(e) => set({ bg: e.target.value })} />
          </div>
        </div>
      )}
      <div className="blk"><h3><T k="pStroke" /></h3><div className="rng"><input type="range" aria-label={a.t("pStroke")} min={1} max={2.5} step={0.25} value={v.stroke} onChange={(e) => set({ stroke: +e.target.value })} /><output>{v.stroke}</output></div></div>
      {v.size != null && <div className="blk"><h3><T k="pSize" /></h3><div className="rng"><input type="range" aria-label={a.t("pSize")} min={24} max={64} step={4} value={v.size} onChange={(e) => set({ size: +e.target.value })} /><output>{v.size}</output></div></div>}
      <button className="btn sm" onClick={onReset}><T k="reset" /></button>
    </div>
  );
}

function Customize() {
  const a = useApp();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest(".custom")) setOpen(false); };
    const esc = (e: globalThis.KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("click", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("click", close); document.removeEventListener("keydown", esc); };
  }, [open]);
  return (
    <div className="custom">
      <button className="pill" aria-label={a.t("cust")} aria-expanded={open} aria-haspopup="true" onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}>
        <span className="mic"><ISliders s={17} /></span><span className="dots"><i style={{ background: lineLike(a.style) ? a.ink : a.badgeBg }} /></span><span className="pl"><T k="cust" /></span><IChevron s={14} w={2.4} />
      </button>
      <div className={"cpop" + (open ? " open" : "")} {...inert(!open)}>
        <CustomizeFields
          v={{ style: a.style, color: a.color, bg: a.bg, stroke: a.stroke, size: a.size }}
          set={(p) => { if (p.style) a.setStyle(p.style); if ("color" in p) a.setColor(p.color ?? null); if ("bg" in p) a.setBg(p.bg ?? null); if (p.stroke != null) a.setStroke(p.stroke); if (p.size != null) a.setSize(p.size); }}
          onReset={() => { a.setColor(null); a.setBg(null); a.setStroke(1.75); a.setSize(40); a.setStyle("line"); }} />
      </div>
    </div>
  );
}

/** Icônes par page : divisible par 3, 4, 5, 6, 10 et 12 colonnes, pour remplir les rangées. */
const PER = 60;

/** Numéros de page avec ellipses : 1 … 4 5 6 … 17 */
function pageItems(page: number, pages: number): (number | "…")[] {
  const keep = new Set([0, pages - 1, page - 1, page, page + 1].filter((p) => p >= 0 && p < pages));
  const out: (number | "…")[] = [];
  [...keep].sort((x, y) => x - y).forEach((p, k, arr) => { if (k && p - arr[k - 1] > 1) out.push("…"); out.push(p); });
  return out;
}

type CardProps = { i: Icon; idx: number; focusIdx: number; fav: boolean; sel: boolean; anim: boolean; o: Parameters<typeof svgStr>[1] };
const Card = memo(function Card({ i, idx, focusIdx, fav, sel, anim, o }: CardProps) {
  const a = useApp();
  const nm = useName();
  const onClick = (e: React.MouseEvent) => {
    const act = (e.target as HTMLElement).closest<HTMLElement>("[data-act]")?.dataset.act;
    if (act === "fav") return a.toggleFav(i.id);
    if (act === "copy") return a.copy(exportSvg(i, a), a.tt("SVG copié : ", "SVG copied: ") + nm(i));
    if (act === "sel" || a.selecting || e.shiftKey || e.metaKey || e.ctrlKey) return a.toggleSel(i.id);
    a.openIcon(i.id);
  };
  return (
    <div className={"card" + (sel ? " sel" : "")} style={{ ["--i" as string]: anim ? Math.min(idx, 40) : 0, animation: anim ? undefined : "none", color: a.color ?? "var(--ink)" }} onClick={onClick}>
      <button className="hit" data-idx={idx} tabIndex={idx === Math.max(0, focusIdx) ? 0 : -1} aria-label={nm(i) + (sel ? a.tt(", sélectionnée", ", selected") : "")} />
      {isNew(i) && <span className="new" aria-hidden="true">{a.tt("NOUVEAU", "NEW")}</span>}
      <Svg className="ico" i={i} o={o} /><span className="nm" aria-hidden="true">{nm(i)}</span>
      <span className="qa">
        <button className={"fav" + (fav ? " on" : "")} data-act="fav" tabIndex={-1} aria-pressed={fav} aria-label={(fav ? a.t("remFav") : a.t("addFav")) + " : " + nm(i)} title={a.t("fav")}><IHeart s={15} on={fav} /></button>
        <button data-act="copy" tabIndex={-1} aria-label={a.t("cSvg") + " : " + nm(i)} title={a.t("cSvg")}><ICopy s={15} /></button>
      </span>
      <button className="chk" data-act="sel" tabIndex={-1} aria-pressed={sel} aria-label={a.t("sel") + " : " + nm(i)}><ICheck s={13} w={3.4} /></button>
    </div>
  );
});

export function Library() {
  const a = useApp();
  // Deux collections : les icônes culturelles, et les icônes d'interface (afroicons-ui).
  const [col, setCol] = useState<"afro" | "ui">(() => (/\/icones\/ui-|#ui-/.test(location.pathname + location.hash) ? "ui" : "afro"));
  const pool = col === "ui" ? UI : AFRO;
  const [cat, setCat] = useState("all");
  const [reg, setReg] = useState("all");
  const [q, setQ] = useState("");
  const [favOnly, setFavOnly] = useState(false);
  const [focusIdx, setFocusIdx] = useState(-1);
  const [anim, setAnim] = useState(true);
  const [page, setPage] = useState(0);
  const grid = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef<number | null>(null);

  // Permet aux tags de la fiche et à la palette de piloter la recherche.
  useEffect(() => {
    const f = (e: Event) => { const d = (e as CustomEvent).detail ?? {}; if (d.col) setCol(d.col); if (d.q != null) { setQ(d.q); setCat("all"); setReg("all"); } if (d.favOnly != null) setFavOnly(d.favOnly); };
    addEventListener("afroicons:filter", f);
    return () => removeEventListener("afroicons:filter", f);
  }, []);

  const keep = (i: Icon) => (!favOnly || a.favs.has(i.id)) && (col === "ui" ? cat === "all" || i.family === cat : (cat === "all" || i.cat === cat) && (reg === "all" || i.region === reg));
  const list = useMemo(() => rank(pool.filter(keep), q), [col, cat, reg, q, favOnly, a.favs]); // eslint-disable-line react-hooks/exhaustive-deps
  // Rien ici mais des résultats dans l'autre collection : on le signale.
  const elsewhere = useMemo(() => (q.trim() && !list.length ? rank(col === "ui" ? AFRO : UI, q).length : 0), [q, list.length, col]);
  const switchCol = (c: "afro" | "ui") => change(() => { setCol(c); setCat("all"); setReg("all"); });
  useEffect(() => { a.setList(list); }, [list]); // eslint-disable-line react-hooks/exhaustive-deps
  const pages = Math.max(1, Math.ceil(list.length / PER));
  // Nouveau filtre : retour à la première page. Liste raccourcie (favori retiré…) : on reste dans les bornes.
  useEffect(() => { setPage(0); }, [col, cat, reg, q, favOnly]);
  useEffect(() => { setPage((p) => Math.min(p, pages - 1)); }, [pages]);
  // La fiche parcourt toute la liste (← →) : la grille suit, pour que le focus revienne sur la bonne carte.
  useEffect(() => {
    const k = a.current ? list.findIndex((i) => i.id === a.current) : -1;
    if (k >= 0) setPage(Math.floor(k / PER));
    // Icône de l'autre collection (lien direct, palette) : la grille bascule pour la montrer derrière la fiche.
    else if (a.current && !q && !favOnly) { const other = a.current.startsWith("ui-") ? "ui" : "afro"; if (other !== col) { setCol(other); setCat("all"); setReg("all"); } }
  }, [a.current]); // eslint-disable-line react-hooks/exhaustive-deps
  // Focus demandé au clavier sur une carte d'une autre page : posé une fois la page affichée.
  useEffect(() => {
    if (pendingFocus.current == null) return;
    const el = grid.current?.querySelector<HTMLElement>(`.hit[data-idx="${pendingFocus.current}"]`);
    pendingFocus.current = null;
    el?.focus(); el?.scrollIntoView({ block: "nearest" });
  }, [page]);
  const start = page * PER;
  const shown = list.slice(start, start + PER);
  const goPage = (p: number) => {
    setAnim(true); setFocusIdx(-1); setPage(p);
    requestAnimationFrame(() => grid.current?.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
  };
  const change = (fn: () => void) => { setAnim(true); setFocusIdx(-1); const go = () => fn(); (document as any).startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches ? (document as any).startViewTransition(go) : go(); };
  useEffect(() => { if (anim) { const h = setTimeout(() => setAnim(false), 900); return () => clearTimeout(h); } }, [anim, list]);

  const o = { s: a.size, style: a.style, w: a.stroke, c: lineLike(a.style) ? "currentColor" : a.color ?? "#fff", bg: a.badgeBg };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const tgt = (e.target as HTMLElement).closest<HTMLElement>(".hit");
    if (!tgt || !grid.current || a.current) return;
    const k = +tgt.dataset.idx!;
    const cols = getComputedStyle(grid.current).gridTemplateColumns.split(" ").length || 1;
    const mv = ({ ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols } as Record<string, number>)[e.key];
    if (mv != null) {
      e.preventDefault();
      const n = Math.max(0, Math.min(list.length - 1, k + mv));
      setFocusIdx(n);
      const focus = () => { const el = grid.current?.querySelector<HTMLElement>(`.hit[data-idx="${n}"]`); el?.focus(); el?.scrollIntoView({ block: "nearest" }); };
      // Au bord de la page, les flèches passent à la page voisine.
      if (Math.floor(n / PER) !== page) { pendingFocus.current = n; setPage(Math.floor(n / PER)); } else focus();
      return;
    }
    const i = list[k];
    if (!i || e.metaKey || e.ctrlKey) return;
    const key = e.key.toLowerCase();
    if (e.key === "Enter") { e.preventDefault(); a.openIcon(i.id); }
    else if (key === "c") a.copy(exportSvg(i, a), a.tt("SVG copié : ", "SVG copied: ") + (a.lang === "en" ? i.en : i.fr));
    else if (key === "f") a.toggleFav(i.id);
    else if (key === "x" || e.key === " ") { e.preventDefault(); a.toggleSel(i.id); }
  };

  return (
    <section id="icones">
      <div className="shead"><div><div className="kick"><T k="k1" /></div><h2><T k="s1" /></h2><p><T k="s1p" /></p></div></div>
      <div className="tools">
        <div className="trow">
          <label className="sbox"><ISearch s={19} />
            <input id="q" type="search" aria-label={a.t("cmdLbl")} autoComplete="off" value={q} onChange={(e) => { setQ(e.target.value); setFocusIdx(-1); }} placeholder={a.tt("baobab, okada, attiéké, tresses…", "baobab, okada, fufu, braids…")} />
            <span className="cnt">{list.length}/{pool.length}</span><span className="kbd">/</span>
          </label>
          <button className={"pill" + (favOnly ? " on" : "")} aria-label={a.t("fav")} aria-pressed={favOnly} onClick={() => { change(() => setFavOnly((f) => !f)); if (!favOnly && !a.favs.size) a.toast(a.tt("Pas encore de favoris : appuyez sur F sur une icône", "No favourites yet: press F on an icon")); }}>
            <IHeart /><span className="pl"><T k="fav" /></span><small className="mono">{a.favs.size || ""}</small>
          </button>
          <button className={"pill" + (a.selecting ? " on" : "")} aria-label={a.t("sel")} aria-pressed={a.selecting} onClick={() => { if (a.selecting) a.setSel(new Set()); a.setSelecting(!a.selecting); }}><ISelect s={17} /><span className="pl"><T k="sel" /></span></button>
          <Customize />
        </div>
        <div className="trow">
          <div className="seg cols" role="tablist" aria-label={a.tt("Collections", "Collections")}>
            {([["afro", a.tt("Culturelles", "Cultural"), AFRO.length], ["ui", a.tt("Interface", "Interface"), UI.length]] as const).map(([k, l, n]) =>
              <button key={k} role="tab" aria-selected={col === k} className={col === k ? "on" : ""} onClick={() => col !== k && switchCol(k)}>{l}<small>{n}</small></button>)}
          </div>
          <div className="cats">{(col === "ui" ? [CATS[0], ...FAMILIES] : CATS.filter((c) => c.id !== "interface")).map((c) => {
            const n = c.id === "all" ? pool.length : pool.filter((i) => (col === "ui" ? i.family : i.cat) === c.id).length;
            return <button key={c.id} className={"cat" + (cat === c.id ? " on" : "")} onClick={() => change(() => setCat(c.id))}><Svg i={byId[c.ic]} o={{ s: 18, w: 2 }} />{a.tt(c.fr, c.en)}<small>{n}</small></button>;
          })}</div>
          {col === "afro" && <div className="regs">{REGS.map((r) => <button key={r.id} className={"reg" + (reg === r.id ? " on" : "")} onClick={() => change(() => setReg(r.id))}>{a.tt(r.fr, r.en)}</button>)}</div>}
        </div>
      </div>
      <div ref={grid} className={"grid" + (a.selecting || a.sel.size ? " selecting" : "")} aria-label={a.t("nav1")} style={{ ["--cell" as string]: a.size + 92 + "px" }} onKeyDown={onKey}
        onFocus={(e) => { const c = (e.target as HTMLElement).closest<HTMLElement>(".hit"); if (c) setFocusIdx(+c.dataset.idx!); }}>
        {shown.map((i, k) => <Card key={i.id} i={i} idx={start + k} focusIdx={focusIdx >= start && focusIdx < start + shown.length ? focusIdx : start} fav={a.favs.has(i.id)} sel={a.sel.has(i.id)} anim={anim} o={o} />)}
      </div>
      {pages > 1 && (
        <nav className="pager" aria-label={a.tt("Pages d'icônes", "Icon pages")}>
          <span className="rng mono">{a.tt(`${start + 1}–${start + shown.length} sur ${list.length}`, `${start + 1}–${start + shown.length} of ${list.length}`)}</span>
          <div className="pg">
            <button className="pill" disabled={page === 0} aria-label={a.tt("Page précédente", "Previous page")} onClick={() => goPage(page - 1)}><IChevron s={16} w={2.4} /></button>
            {pageItems(page, pages).map((p, k) => p === "…"
              ? <span key={"e" + k} className="gap" aria-hidden="true">…</span>
              : <button key={p} className={"pill num" + (p === page ? " on" : "")} aria-current={p === page ? "page" : undefined} aria-label={a.tt("Page ", "Page ") + (p + 1)} onClick={() => goPage(p)}>{p + 1}</button>)}
            <button className="pill" disabled={page === pages - 1} aria-label={a.tt("Page suivante", "Next page")} onClick={() => goPage(page + 1)}><IChevron s={16} w={2.4} /></button>
          </div>
        </nav>
      )}
      {!list.length && <div className="empty"><div className="big"><T k="e1" /></div>{elsewhere
        ? <button className="btn" style={{ marginTop: 12 }} onClick={() => switchCol(col === "ui" ? "afro" : "ui")}>{a.tt(`${elsewhere} résultat${elsewhere > 1 ? "s" : ""} dans ${col === "ui" ? "les icônes culturelles" : "les icônes d'interface"}`, `${elsewhere} result${elsewhere > 1 ? "s" : ""} in ${col === "ui" ? "cultural icons" : "interface icons"}`)}</button>
        : <T k="e2" />}</div>}
      <div className="hint">
        {[["←↑→↓", "h1"], [a.tt("Entrée", "Enter"), "h2"], ["C", "h3"], ["F", "h4"], ["X", "h5"], ["?", "h6"]].map(([kb, k]) => <span key={k}><span className="kbd">{kb}</span><span><T k={k} /></span></span>)}
      </div>
    </section>
  );
}
