import { useMemo } from "react";
import { ICONS, PALS, REPO, VERSION, byId } from "../lib/constants";
import { buildTile, posterSvg, tileSvg, type PatternState } from "../lib/pattern";
import { highlight, logoSvg, spriteStr, svgToPng } from "../lib/svg";
import { useApp, useName } from "../state";
import { IShuffle, Raw, Svg, T } from "./ui";

/* ---------------- Atelier de motifs ---------------- */
export function Studio() {
  const a = useApp();
  const nm = useName();
  const P = a.pattern;
  const set = (p: Partial<PatternState>) => a.setPattern({ ...P, ...p });
  const t = useMemo(() => buildTile(P), [P]);
  const picks = [...P.icons.map((id) => byId[id]).filter(Boolean), ...ICONS.filter((i) => !P.icons.includes(i.id))];
  const shuffle = () => {
    const keys = Object.keys(PALS);
    const pool = ICONS.map((i) => i.id).sort(() => Math.random() - 0.5);
    set({ seed: Math.floor(Math.random() * 1e9), pal: Math.random() < 0.5 ? keys[Math.floor(Math.random() * keys.length)] : P.pal, icons: pool.slice(0, 4 + Math.floor(Math.random() * 4)) });
  };
  const L = [["grid", "Grille", "Grid"], ["brick", "Quinconce", "Brick"], ["scatter", "Semis", "Scatter"]] as const;
  const R = [["none", "Aucune", "None"], ["tilt", "Légère", "Tilt"], ["alt", "Alternée", "Flip"], ["free", "Libre", "Free"]] as const;
  const pal = PALS[P.pal] ?? PALS.douala;

  return (
    <section id="atelier">
      <div className="shead"><div><div className="kick"><T k="k2" /></div><h2><T k="s2" /></h2><p><T k="s2p" /></p></div></div>
      <div className="studio">
        <div className="sctl">
          <div><h3><span><T k="sp1" /></span></h3>
            <div className="pal">{Object.entries(PALS).map(([k, v]) => (
              <button key={k} className={P.pal === k ? "on" : ""} onClick={() => set({ pal: k })}>
                <span className="bar"><i style={{ background: v.bg }} />{v.c.map((c, j) => <i key={j} style={{ background: c }} />)}</span>{v.n}
              </button>
            ))}</div>
          </div>
          <div><h3><span><T k="sp2" /></span><span className="mono">{P.icons.length}</span></h3>
            <div className="picks">{picks.map((i) => (
              <button key={i.id} className={P.icons.includes(i.id) ? "on" : ""} title={nm(i)} aria-label={nm(i)} aria-pressed={P.icons.includes(i.id)} onClick={() => set({ icons: P.icons.includes(i.id) ? P.icons.filter((x) => x !== i.id) : [...P.icons, i.id] })}>
                <Svg i={i} o={{ s: 20, w: 1.9 }} />
              </button>
            ))}</div>
          </div>
          <div><h3><T k="sp3" /></h3><div className="opts">{L.map(([k, f, e]) => <button key={k} className={P.lay === k ? "on" : ""} onClick={() => set({ lay: k })}>{a.tt(f, e)}</button>)}</div></div>
          <div><h3><T k="sp4" /></h3><div className="opts">{R.map(([k, f, e]) => <button key={k} className={P.rot === k ? "on" : ""} onClick={() => set({ rot: k })}>{a.tt(f, e)}</button>)}</div></div>
          <div><h3><span><T k="sp5" /></span><output className="mono">{P.den}px</output></h3><div className="rng"><input type="range" aria-label={a.t("sp5")} min={40} max={140} step={4} value={P.den} onChange={(e) => set({ den: +e.target.value })} /></div></div>
          <div><h3><span><T k="sp6" /></span><output className="mono">{P.str}</output></h3><div className="rng"><input type="range" aria-label={a.t("sp6")} min={1} max={3} step={0.25} value={P.str} onChange={(e) => set({ str: +e.target.value })} /></div></div>
        </div>
        <div className="sview">
          <svg className="pv" role="img" aria-label={a.tt("Aperçu du motif", "Pattern preview")} dangerouslySetInnerHTML={{ __html: `<defs><pattern id="afp" width="${t.W}" height="${t.H}" patternUnits="userSpaceOnUse"><rect width="${t.W}" height="${t.H}" fill="${t.bg}"/>${t.inner}</pattern></defs><rect width="100%" height="100%" fill="url(#afp)"/>` }} />
          <div className="slabel"><span className="dots">{pal.c.map((c, j) => <i key={j} style={{ background: c }} />)}</span>{pal.n} · {P.icons.length} {a.tt("icônes", "icons")}</div>
          <div className="sbar">
            <button className="btn" onClick={shuffle}><IShuffle s={17} /><T k="shuf" /></button>
            <button className="btn" onClick={() => a.copy(`background-color: ${t.bg};\nbackground-image: url("data:image/svg+xml,${encodeURIComponent(tileSvg(P))}");\nbackground-size: ${t.W}px ${t.H}px;`, a.tt("CSS copié : collez-le sur n'importe quel élément", "CSS copied: paste it into any element"))}><T k="scss" /></button>
            <button className="btn" onClick={() => a.copy(tileSvg(P), a.tt("Tuile SVG répétable copiée", "Repeating SVG tile copied"))}><T k="ssvg" /></button>
            {a.canDownload && <button className="btn p" onClick={async () => a.save(`afroicons-motif-${P.pal}.png`, await svgToPng(posterSvg(P), 2400, 2400))}><T k="spng" /></button>}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- En situation : deux écrans d'app ---------------- */
export function Showcase() {
  const a = useApp();
  const en = a.lang === "en";
  const I = (id: string, s = 20, w = 1.8, c = "currentColor") => (byId[id] ? <Svg i={byId[id]} o={{ s, w, c }} /> : null);
  const prods: [string, string, string, string][] = [["plantain", "Plantain", "1 500 F", "--a2"], ["ananas", en ? "Pineapple" : "Ananas", "800 F", "--a4"], ["poisson", "Tilapia", "3 000 F", "--a1"], ["safou", "Safou", "1 000 F", "--a3"]];
  const rides: [string, string, string, string, boolean][] = [["mototaxi", "Benskin", en ? "3 min · fastest" : "3 min · le plus rapide", "500 F", true], ["keke", "Keke", en ? "6 min · 3 seats" : "6 min · 3 places", "800 F", false], ["taxibrousse", en ? "Shared taxi" : "Taxi collectif", en ? "9 min · cheap" : "9 min · économique", "300 F", false]];
  const pts: [string, string][] = en
    ? [["mobilemoney", "Mobile money, tontine, payments"], ["etal", "Markets, shops, local produce"], ["mototaxi", "Benskin, keke, shared taxis"], ["peigneafro", "Beauty: braids, afro pick, salon dryer"]]
    : [["mobilemoney", "Mobile money, tontine, paiements"], ["etal", "Marchés, boutiques, produits locaux"], ["mototaxi", "Benskin, keke, taxis collectifs"], ["peigneafro", "Beauté : tresses, peigne afro, séchoir"]];
  const map = `<svg class="map" viewBox="0 0 280 200" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"><path d="M-10 150C60 140 90 90 150 95S240 40 300 30"/><path d="M40 -10V210M200 -10C190 80 230 140 220 210"/></g><path d="M60 140C100 130 120 96 160 96S215 64 230 52" fill="none" stroke="var(--a1)" stroke-width="4" stroke-dasharray="2 8" stroke-linecap="round"/><g opacity=".35" transform="translate(110 20) scale(1.3)" fill="none" stroke="#7a6c5a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${byId.baobab.body}</g></svg>`;

  return (
    <section id="vitrine">
      <div className="shead"><div><div className="kick"><T k="k5" /></div><h2><T k="s5" /></h2><p><T k="s5p" /></p></div></div>
      <div className="vitr">
        <div className="phone"><div className="screen">
          <div className="notch" /><div className="sb"><span>9:41</span><span>●●● 4G</span></div>
          <div className="scr">
            <div className="ahead"><div><small style={{ color: "#6B5F51" }}>{en ? "Good morning" : "Bonjour"} Awa</small><br /><b>Mboa Market</b></div><span className="av">{I("gele", 20, 1.9, "#1F1A15")}</span></div>
            <div className="bal">
              <Raw html={byId.cauri ? `<svg class="bp" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round">${byId.cauri.body}</svg>` : ""} />
              <small>{en ? "Mobile money balance" : "Solde mobile money"}</small><div className="amt">48 500 FCFA</div>
              <div className="row"><span>{I("mobilemoney", 18, 1.9, "#fff")}{en ? "Send" : "Envoyer"}</span><span>{I("tontine", 18, 1.9, "#fff")}Tontine</span><span>{I("boutique", 18, 1.9, "#fff")}{en ? "Pay" : "Payer"}</span></div>
            </div>
            <div className="chipsx"><span className="on">{I("panier", 14, 2, "#fff")}{en ? "All" : "Tout"}</span><span>{I("plantain", 14, 2)}{en ? "Fruit" : "Fruits"}</span><span>{I("poisson", 14, 2)}{en ? "Fish" : "Poisson"}</span><span>{I("piment", 14, 2)}{en ? "Spices" : "Épices"}</span></div>
            <div className="prod">{prods.map(([id, n, p, v]) => <div key={id}><div className="pi" style={{ background: `color-mix(in srgb,var(${v}) 16%,#fff)`, color: `var(${v})` }}>{I(id, 34, 1.7)}</div><b>{n}</b><small>{p}</small></div>)}</div>
          </div>
          <div className="tabb"><span className="on">{I("case", 20, 1.9)}{en ? "Home" : "Accueil"}</span><span>{I("etal", 20, 1.9)}{en ? "Market" : "Marché"}</span><span>{I("mobilemoney", 20, 1.9)}Wallet</span><span>{I("mototaxi", 20, 1.9)}{en ? "Delivery" : "Livraison"}</span></div>
        </div></div>

        <div className="vtxt"><h3><T k="v1" /></h3><p><T k="v1p" /></p><ul>{pts.map(([id, t]) => <li key={id}><i>{I(id, 18, 1.9)}</i>{t}</li>)}</ul></div>

        <div className="phone"><div className="screen">
          <div className="notch" /><div className="sb"><span>9:41</span><span>●●● 4G</span></div>
          <div className="scr">
            <div className="ahead"><div><small style={{ color: "#6B5F51" }}>{en ? "Where to?" : "On va où ?"}</small><br /><b>Benskin Go</b></div><span className="av" style={{ background: "var(--a1)", color: "#fff" }}>{I("mototaxi", 20, 1.9, "#fff")}</span></div>
            <div className="ride"><Raw html={map} />
              <span className="pin" style={{ left: 40, top: 120, background: "#1F1A15" }}>{I("case", 18, 2, "#fff")}</span>
              <span className="pin" style={{ left: 212, top: 30, background: "var(--a1)" }}>{I("etal", 18, 2, "#fff")}</span>
            </div>
            {rides.map(([id, n, d, p, on]) => <div key={id} className={"opt" + (on ? " on" : "")}><span className="oi" style={{ color: on ? "var(--a1)" : "#1F1A15" }}>{I(id, 24, 1.8)}</span><div><b>{n}</b><small>{d}</small></div><span className="pr">{p}</span></div>)}
            <div className="gobtn">{en ? "Book the benskin" : "Réserver le benskin"}</div>
          </div>
        </div></div>
      </div>
    </section>
  );
}

/* ---------------- Utiliser ---------------- */
export function Usage() {
  const a = useApp();
  const svg1 = `<span style="color:#C24E2A">\n  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" …>…</svg>\n</span>`;
  return (
    <section id="utiliser">
      <div className="shead"><div><div className="kick"><T k="k3" /></div><h2><T k="s3" /></h2></div></div>
      <div className="use">
        <div className="ucard"><span className="n">A</span><h3><T k="u1" /></h3><p><T k="u1p" /></p><pre dangerouslySetInnerHTML={{ __html: highlight(svg1) }} /></div>
        <div className="ucard"><span className="n">B</span><h3><T k="u2" /></h3><p><T k="u2p" /></p><pre dangerouslySetInnerHTML={{ __html: highlight(`// npm install afroicons-react\nimport { Djembe, Baobab } from "afroicons-react";\n\n<Djembe size={32} color="#C24E2A" />\n<Baobab strokeWidth={2} />`, true) }} /></div>
        <div className="ucard"><span className="n">C</span><h3><T k="u3" /></h3><p><T k="u3p" /></p><pre dangerouslySetInnerHTML={{ __html: highlight(`<svg width="24" height="24">\n  <use href="#afroicon-baobab"/>\n</svg>`) }} />
          <button className="btn sm" onClick={() => a.copy(spriteStr(ICONS, a.stroke), a.tt(`Sprite copié (${ICONS.length} icônes)`, `Sprite copied (${ICONS.length} icons)`))}><T k="u3b" /></button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Marque ---------------- */
export function Brand() {
  const a = useApp();
  const door = a.pal[1], sun = a.pal[0];
  const story = a.lang === "en"
    ? [["A", "The letter", "A for Africa and for Afroicons."], ["case", "The hut", "The shape of a roof that welcomes."], ["door", "The door", "Lit and open: free for everyone."], ["sun", "The sun", "Setting on the horizon, warm."]]
    : [["A", "La lettre", "A comme Afrique, A comme Afroicons."], ["case", "La case", "La silhouette d'un toit qui accueille."], ["door", "La porte", "Allumée et ouverte : libre pour tous."], ["sun", "Le soleil", "Couchant sur l'horizon, chaleureux."]];
  const ic: Record<string, string> = { A: '<path d="M5 20L12 4L19 20M8.2 14H15.8"/>', case: '<path d="M3 11L12 4L21 11M5 11V20H19V11"/>', door: '<path d="M8 21V12.5A4 4 0 0 1 16 12.5V21M4 21H20"/>', sun: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/>' };
  const names = a.lang === "en" ? ["Ink", "Accent", "Ochre", "Deep", "Leaf", "Sand"] : ["Encre", "Accent", "Ocre", "Profond", "Feuille", "Sable"];
  const sw = ["#1F1A15", ...a.pal, PALS[a.city].bg];
  const light = (h: string) => { const n = parseInt(h.slice(1), 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) > 160; };
  return (
    <section id="marque">
      <div className="shead"><div><div className="kick"><T k="k6" /></div><h2><T k="s6" /></h2><p><T k="s6p" /></p></div></div>
      <div className="brand">
        <div className="bcard" style={{ background: "#1F1A15", color: "#FBF5EA", borderColor: "#1F1A15" }}><small><T k="b1" /></small>
          <div className="lg"><Raw html={logoSvg({ s: 96, bg: "#2A231D", door, sun })} /><span className="wm">Afroicons</span></div>
          <div className="acts">
            <button className="btn sm" style={{ background: "#FBF5EA", color: "#1F1A15", borderColor: "#FBF5EA" }} onClick={() => a.copy(logoSvg({ s: 512, door, sun }), a.tt("Logo copié", "Logo copied"))}><T k="b2" /></button>
            {a.canDownload && <button className="btn sm a" onClick={async () => a.save("afroicons-logo.png", await svgToPng(logoSvg({ s: 1024, door, sun }), 1024, 1024))}><T k="b3" /></button>}
          </div>
        </div>
        <div className="bcard" style={{ background: "var(--card)" }}><small><T k="b4" /></small><div className="lg"><Raw html={logoSvg({ s: 72, door, sun })} /><span className="wm" style={{ fontSize: 36 }}>Afroicons</span></div><small><T k="b5" /></small></div>
        <div className="bcard" style={{ background: "var(--a1s)", color: "#fff", borderColor: "transparent" }}><small><T k="b6" /></small><div className="lg"><Raw html={logoSvg({ s: 72, bg: "none", fg: "#fff", door: "#fff", sun: "#fff" })} /><span className="wm" style={{ fontSize: 36 }}>Afroicons</span></div><small><T k="b7" /></small></div>
        <div className="story">{story.map(([k, b, t]) => <div key={k}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: ic[k] }} /><b>{b}</b><span>{t}</span></div>)}</div>
        <div className="swrow">{sw.map((h, k) => <button key={k} style={{ background: h, color: light(h) ? "#1F1A15" : "#fff" }} onClick={() => a.copy(h, a.tt("Couleur copiée : ", "Colour copied: ") + h)}><b>{names[k]}</b><span>{h}</span></button>)}</div>
      </div>
    </section>
  );
}

/* ---------------- Manifeste & pied de page ---------------- */
export function Manifesto() {
  return (
    <section className="manif" id="manifeste">
      <div>
        <div className="kick" style={{ color: "var(--a2)" }}><T k="k4" /></div>
        <h2><T k="m1" /></h2><p><T k="m2" /></p><p><T k="m3" /></p>
      </div>
      <ul>{[["afrique", "m4"], ["kente", "m5"], ["mobilemoney", "m6"]].map(([id, k]) => (
        <li key={k}><i><Svg i={byId[id]} o={{ s: 22, w: 1.9, c: "#fff" }} /></i><div><b><T k={k} /></b><span><T k={k + "p"} /></span></div></li>
      ))}</ul>
    </section>
  );
}

export function Footer() {
  const a = useApp();
  return (
    <>
      <footer className="wrap">
        <span>© 2026 THAFAM HOLDING SARL · <T k="f1" /> · <a className="ul" href="https://nafaerp.com"><T k="f2" /></a></span>
        <span className="fr"><a className="ul" href={REPO}>GitHub</a><span className="mono">v{VERSION} · {ICONS.length} {a.tt("icônes", "icons")}</span></span>
      </footer>
      <div className="band" />
    </>
  );
}
