import { useEffect, useMemo, useRef, useState } from "react";
import { AFRO, CATS, CITIES, REGNAME, ROT_CITIES, SHOWCASE, VERSION, byId, catOf, type CityId } from "../lib/constants";
import { animateDraw, logoSvg, svgStr } from "../lib/svg";
import { useApp, useName } from "../state";
import { IClose, IDown, IMenu, IMoon, ISearch, ISun, Raw, Svg, T } from "./ui";
import { inert } from "./Overlays";

export function Nav() {
  const a = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
  useEffect(() => {
    const f = () => setScrolled(scrollY > 8);
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    if (!cityOpen) return;
    const close = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest(".citym")) setCityOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setCityOpen(false); };
    document.addEventListener("click", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("click", close); document.removeEventListener("keydown", esc); };
  }, [cityOpen]);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest(".menum")) setMenuOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    const wide = matchMedia("(min-width: 1121px)");
    const off = () => { if (wide.matches) setMenuOpen(false); };
    document.addEventListener("click", close);
    document.addEventListener("keydown", esc);
    wide.addEventListener("change", off);
    return () => { document.removeEventListener("click", close); document.removeEventListener("keydown", esc); wide.removeEventListener("change", off); };
  }, [menuOpen]);
  // Met en avant la section visible dans le menu.
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    ["top", "icones", "atelier", "vitrine", "utiliser", "marque", "idees", "manifeste"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  const links = [["icones", "nav1"], ["atelier", "nav2"], ["vitrine", "nav5"], ["utiliser", "nav3"], ["marque", "nav6"], ["idees", "nav7"]];
  const toggleMode = () => a.setMode(a.mode === "dark" ? "light" : "dark");
  const logo = logoSvg({ s: 36, door: a.pal[1], sun: a.pal[0] });

  return (
    <nav className={"top wrap" + (scrolled ? " scrolled" : "")}>
      <a className="logo" href="#top" aria-label="Afroicons"><Raw className="mk" html={logo} /><span className="wm-t">Afroicons</span></a>
      <div className="navlinks">
        {links.map(([h, k]) => <a key={h} href={"#" + h} className={active === h ? "on" : ""} aria-current={active === h ? "location" : undefined}><T k={k} /></a>)}
      </div>
      <div className="navr">
        <button className="kbtn" onClick={() => a.setCmdOpen(true)}><ISearch s={17} /><span className="lbl"><T k="cmdLbl" /></span><span className="kbd">{isMac ? "⌘K" : "Ctrl K"}</span></button>
        <div className="citym">
          <button className="ib" title={a.tt("Ambiance", "Mood")} aria-label={a.tt("Ambiance de couleurs", "Colour mood")} aria-expanded={cityOpen} onClick={(e) => { e.stopPropagation(); setCityOpen((o) => !o); }}>
            <span className="dots">{CITIES[a.city].c.slice(0, 3).map((c) => <i key={c} style={{ background: c }} />)}</span>
          </button>
          <div className={"citypop" + (cityOpen ? " open" : "")} {...inert(!cityOpen)}>
            <div className="kick" style={{ padding: "6px 10px 2px", margin: 0 }}>{a.tt("Ambiance", "Mood")}</div>
            {(Object.entries(CITIES) as [CityId, (typeof CITIES)[CityId]][]).map(([k, v]) => (
              <button key={k} className={a.city === k ? "on" : ""} onClick={() => { a.setCity(k); setCityOpen(false); }}>
                <span className="dots">{v.c.map((c) => <i key={c} style={{ background: c }} />)}</span>{v.n}
              </button>
            ))}
          </div>
        </div>
        <button className="ib thm" title={a.tt("Thème", "Theme")} aria-label={a.mode === "dark" ? a.tt("Passer en mode clair", "Switch to light mode") : a.tt("Passer en mode sombre", "Switch to dark mode")} onClick={toggleMode}>{a.mode === "dark" ? <ISun /> : <IMoon />}</button>
        <div className="seg lang">
          {(["fr", "en"] as const).map((l) => <button key={l} aria-pressed={a.lang === l} aria-label={l === "fr" ? "FR, Français" : "EN, English"} className={a.lang === l ? "on" : ""} onClick={() => a.setLang(l)}>{l.toUpperCase()}</button>)}
        </div>
        <div className="menum">
          <button className="ib" aria-label={a.tt("Menu", "Menu")} aria-expanded={menuOpen} aria-controls="mmenu" onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}>{menuOpen ? <IClose /> : <IMenu />}</button>
          <div id="mmenu" className={"mpop" + (menuOpen ? " open" : "")} {...inert(!menuOpen)}>
            {links.map(([h, k]) => <a key={h} href={"#" + h} onClick={() => setMenuOpen(false)}><T k={k} /></a>)}
            <div className="mx">
              <button onClick={toggleMode}>{a.mode === "dark" ? <ISun /> : <IMoon />}{a.mode === "dark" ? a.tt("Mode clair", "Light mode") : a.tt("Mode sombre", "Dark mode")}</button>
              <div className="kick" style={{ padding: "10px 12px 4px", margin: 0 }}>{a.tt("Ambiance", "Mood")}</div>
              <div className="mcities">{(Object.entries(CITIES) as [CityId, (typeof CITIES)[CityId]][]).map(([k, v]) => (
                <button key={k} className={a.city === k ? "on" : ""} aria-pressed={a.city === k} onClick={() => a.setCity(k)}><span className="dots">{v.c.slice(0, 3).map((c) => <i key={c} style={{ background: c }} />)}</span>{v.n}</button>
              ))}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function iconOfTheDay() {
  const d = new Date();
  return AFRO[(d.getFullYear() * 372 + d.getMonth() * 31 + d.getDate()) % AFRO.length];
}

export function Hero() {
  const a = useApp();
  const nm = useName();
  const [rot, setRot] = useState(0);
  const [k, setK] = useState(0);
  const disc = useRef<HTMLDivElement>(null);
  const iod = useMemo(iconOfTheDay, []);

  useEffect(() => { const h = setInterval(() => setRot((r) => r + 1), 2200); return () => clearInterval(h); }, []);
  useEffect(() => { const h = setTimeout(() => setK((x) => x + 1), 3200); return () => clearTimeout(h); }, [k]);
  const cur = byId[SHOWCASE[k % SHOWCASE.length]];
  useEffect(() => { animateDraw(disc.current?.querySelector("svg") ?? null); }, [k]);

  const pattern = useMemo(() => {
    const ids = ["baobab", "cauri", "djembe", "sankofa", "case", "calebasse"].filter((id) => byId[id]);
    let g = "";
    const c = 64;
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) g += `<g transform="translate(${x * c + (y % 2 ? c / 2 : 0) + 16} ${y * c + 16}) scale(1.33)">${byId[ids[(x + y * 3) % ids.length]].body}</g>`;
    return `<svg class="pat" viewBox="0 0 512 512" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" color="#fff">${g}</g></svg>`;
  }, []);

  const N = 6, pos = k % N;
  const cat = catOf(cur.cat);
  return (
    <header className="hero wrap" id="top">
      <div>
        <span className="eyebrow"><b>v{VERSION}</b><span>{a.tt(`${AFRO.length} icônes libres · dessinées à la main`, `${AFRO.length} free icons · hand-drawn`)}</span></span>
        <button className="eyebrow iod" onClick={() => a.openIcon(iod.id)}>
          <Svg i={iod} o={{ s: 18, w: 2 }} /><span>{a.tt("Icône du jour", "Icon of the day")} : <strong style={{ color: "var(--ink)" }}>{nm(iod)}</strong></span>
        </button>
        <h1>
          <T k="h1a" /> <span className="acc"><T k="h1b" /></span>, <br />
          <span className="rot"><span key={rot}>{ROT_CITIES[rot % ROT_CITIES.length][a.lang]}</span></span>.
        </h1>
        <p className="lead"><T k="lead" /></p>
        <div className="cta">
          <a className="btn p" href="#icones"><T k="cta1" /><IDown s={18} w={2.2} /></a>
          <a className="btn" href="#atelier"><T k="cta2" /></a>
        </div>
        <div className="hstats">
          <div><b>{AFRO.length}</b><span><T k="st1" /></span></div>
          <div><b>{CATS.length - 2}</b><span><T k="st2" /></span></div>
          <div><b>5</b><span><T k="st3" /></span></div>
          <div><b>2</b><span><T k="st4" /></span></div>
        </div>
      </div>
      <div className="stage" style={{ cursor: "pointer" }} role="button" tabIndex={0} onClick={() => a.openIcon(cur.id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); a.openIcon(cur.id); } }}>
        <div className="panel">
          <Raw html={pattern} />
          <div className="disc" ref={disc}><Svg key={cur.id} i={cur} o={{ s: 200, w: 1.6 }} /></div>
          <div className="cap"><div className="n">{nm(cur)}</div><div className="s">{REGNAME[cur.region][a.lang]} · {a.lang === "en" ? cat.en : cat.fr}</div></div>
          <div className="prog">{Array.from({ length: N }, (_, j) => <i key={j + "-" + k} className={j < pos ? "done" : j === pos ? "on" : ""} />)}</div>
        </div>
        {[["f1", "djembe"], ["f2", "baobab"], ["f3", "cauri"], ["f4", "peigneafro"]].map(([c, id]) => (
          <div key={c} className={"float " + c}><Svg i={byId[id]} o={{ s: 38, w: 1.7 }} /></div>
        ))}
      </div>
    </header>
  );
}

export function Marquee() {
  const rows = useMemo(() => {
    const half = Math.ceil(AFRO.length / 2);
    const row = (L: typeof AFRO) => { const h = L.map((i) => svgStr(i, { s: 30, w: 1.6 })).join(""); return h + h; };
    return [row(AFRO.slice(0, half)), row(AFRO.slice(half))];
  }, []);
  return (
    <div className="marq" aria-hidden="true">
      <div className="mrow" dangerouslySetInnerHTML={{ __html: rows[0] }} />
      <div className="mrow rev" dangerouslySetInnerHTML={{ __html: rows[1] }} />
    </div>
  );
}
