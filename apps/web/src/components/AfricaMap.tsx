import { useEffect, useMemo, useRef, useState } from "react";
import { FLAGS, byId } from "../lib/constants";
import { loadStory, type Story } from "../lib/histoires";
import { useApp } from "../state";
import { Svg, T } from "./ui";

/** Carte de l'Afrique (scripts/carte-afrique.mjs) : un tracé par pays, dans un même cadre. */
interface MapData { viewBox: string; countries: { iso: string; d: string; flag: string; ring?: [number, number, number] }[]; other: { id: string; d: string }[] }

/* ---------------- Carte cliquable des 54 pays ---------------- */
export function AfricaMap() {
  const a = useApp();
  const sec = useRef<HTMLElement>(null);
  const [map, setMap] = useState<MapData | null>(null);
  const [cur, setCur] = useState<string | null>(null);
  const [story, setStory] = useState<{ iso: string; s: Story } | null>(null);

  // La carte (13 Ko) ne se charge qu'à l'approche de la section.
  useEffect(() => {
    const el = sec.current;
    if (!el) return;
    let done = false;
    const load = () => import("../data/carte-afrique.json").then((m) => { done = true; setMap(m.default as unknown as MapData); }).catch(() => {}); // hors ligne : nouvel essai au prochain passage
    if (!("IntersectionObserver" in window)) { load(); return; }
    const io = new IntersectionObserver((es) => { if (!done && es.some((e) => e.isIntersecting)) load(); }, { rootMargin: "600px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!cur) return;
    // Petite pause avant de charger : balayer la carte à la souris ne télécharge pas chaque pays traversé.
    let live = true;
    const t = setTimeout(() => loadStory(cur).then((s) => { if (live && s) setStory({ iso: cur, s }); }), 150);
    return () => { live = false; clearTimeout(t); };
  }, [cur]);

  const en = a.lang === "en";
  const L = (x?: [string, string]) => (x ? x[en ? 1 : 0] : "");
  const country = map?.countries.find((c) => c.iso === cur);
  const flag = country ? byId[country.flag] : null;
  const name = (id: string) => byId[id]?.country?.[a.lang] ?? "";
  const s = story && story.iso === cur ? story.s : null;
  const au = byId["drapeau-union-africaine"];
  // Pays survolé : son drapeau, mis à l'échelle pour couvrir le pays (comme « cover »), découpé à ses frontières.
  const overlay = useMemo(() => {
    if (!country || !flag) return null;
    const n = country.d.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
    const xs = n.filter((_, i) => i % 2 === 0), ys = n.filter((_, i) => i % 2 === 1);
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    // Le drapeau (x 1–23, y 4,5–19,5 de la grille 24) est étiré au cadre du pays : toutes ses bandes restent
    // visibles, même sur un pays tout en hauteur (Cameroun) ou tout en largeur. L'étirement est limité à ×2.
    let kx = ((x1 - x0) / 22) * 1.04, ky = ((y1 - y0) / 15) * 1.04;
    if (ky > kx * 2) kx = ky / 2; else if (kx > ky * 2) ky = kx / 2;
    const tx = (x0 + x1) / 2 - 12 * kx, ty = (y0 + y1) / 2 - 12 * ky;
    const body = flag.body.replace(/<rect[^>]*stroke-opacity[^>]*\/>/g, ""); // sans le liseré du drapeau
    return { d: country.d, transform: `matrix(${kx} 0 0 ${ky} ${tx} ${ty})`, body, key: country.iso };
  }, [country, flag]);
  const countries = FLAGS.filter((f) => f.iso).sort((x, y) => x.country![a.lang].localeCompare(y.country![a.lang], a.lang));

  return (
    <section id="carte" ref={sec}>
      <div className="shead"><div><div className="kick"><T k="k8" /></div><h2><T k="s8" /></h2><p><T k="s8p" /></p></div></div>
      <div className="amap">
        {/* Le panneau vient avant la carte dans le code : au clavier, la liste des pays arrive avant les 54 liens. */}
        <aside className="ampanel">
          {flag ? <>
            <Svg i={flag} o={{ s: 64 }} />
            <h3>{name(flag.id)}</h3>
            {/* Toujours présent (vide le temps du chargement) : le panneau garde sa hauteur. */}
            <dl>
              {s?.capitale && <div><dt>{a.tt("Capitale", "Capital")}</dt><dd>{L(s.capitale)}</dd></div>}
              {s?.independance && <div><dt>{a.tt("Indépendance", "Independence")}</dt><dd>{L(s.independance)}</dd></div>}
            </dl>
            <button className="btn p" onClick={() => a.openIcon(flag.id)}>{a.tt("Drapeau, monnaie et histoire", "Flag, currency and history")}</button>
          </> : <>
            {au && <Svg i={au} o={{ s: 64 }} />}
            <h3>{a.tt("54 pays, un continent", "54 countries, one continent")}</h3>
            <p>{a.tt("Survolez ou touchez un pays : sa fiche s'ouvre avec son drapeau, sa monnaie, sa carte et son histoire.", "Hover over or tap a country: its page opens with its flag, currency, map and history.")}</p>
            {au && <button className="btn" onClick={() => a.openIcon(au.id)}>{a.tt("L'Union africaine", "The African Union")}</button>}
          </>}
          {/* Au doigt ou au clavier, les petits pays sont plus simples à choisir dans une liste : le choix s'affiche
              dans le panneau (et sur la carte) ; le bouton ouvre la fiche. Changer de pays aux flèches n'ouvre rien. */}
          <label className="ampick"><span>{a.tt("Ou choisissez un pays", "Or choose a country")}</span>
            <select value={flag?.id ?? ""} onChange={(e) => { const f = byId[e.target.value]; setCur(f?.iso ?? null); }}>
              <option value="">{a.tt("Tous les pays…", "All countries…")}</option>
              {countries.map((f) => <option key={f.id} value={f.id}>{f.country![a.lang]}</option>)}
            </select>
          </label>
        </aside>
        <div className="amapsvg">
          {map ? (
            <svg viewBox={map.viewBox} role="group" aria-label={a.tt("Carte de l'Afrique : choisissez un pays", "Map of Africa: choose a country")}>
              {map.other.map((o) => <path key={o.id} className="am-other" d={o.d} aria-hidden="true" />)}
              {map.countries.map((c) => (
                <a key={c.iso} href={`/icones/${c.flag}/`} aria-label={name(c.flag)} className={cur === c.iso ? "on" : ""}
                  onMouseEnter={() => setCur(c.iso)} onFocus={() => setCur(c.iso)}
                  onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return; e.preventDefault(); setCur(c.iso); a.openIcon(c.flag); }}>
                  <title>{name(c.flag)}</title>
                  <path d={c.d} fillRule="evenodd" />
                  {c.ring && <circle className="am-ring" cx={c.ring[0]} cy={c.ring[1]} r={c.ring[2]} />}
                </a>
              ))}
              {overlay && <g key={overlay.key} className="am-flag" aria-hidden="true">
                {/* Un identifiant par pays : Chrome peut garder en cache un clipPath réutilisé sous le même nom. */}
                <clipPath id={`am-clip-${overlay.key}`}><path d={overlay.d} clipRule="evenodd" /></clipPath>
                <g clipPath={`url(#am-clip-${overlay.key})`}><g transform={overlay.transform} dangerouslySetInnerHTML={{ __html: overlay.body }} /></g>
                <path className="am-edge" d={overlay.d} />
              </g>}
            </svg>
          ) : <div className="am-wait" aria-hidden="true" />}
        </div>
      </div>
    </section>
  );
}
