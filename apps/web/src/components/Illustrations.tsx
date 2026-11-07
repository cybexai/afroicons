import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CITIES, FLAGS, type CityId } from "../lib/constants";
import { svgToPng } from "../lib/svg";
import { useApp } from "../state";
import { C, SKIN, defs, person } from "../../../../scripts/illustrations/lib.mjs";
import { IClose, INext, IPrev, ISearch, ISliders } from "./ui";
import { inert } from "./Overlays";

/** Une scène de src/illustrations.json (scripts/illustrations.mjs). */
interface Scene { id: string; cat: string; fr: string; en: string; tags: string[]; svg: string }
/** Les rubriques (voir CAT dans scripts/illustrations.mjs). */
const CATS: [string, string, string][] = [["travail", "Travail et métiers", "Work and trades"], ["savoir", "École, santé, savoir", "School, health, knowledge"], ["famille", "Famille", "Family"], ["ville", "En ville", "In town"], ["village", "Village et nature", "Village and nature"], ["fete", "Fêtes et traditions", "Celebrations and traditions"], ["loisirs", "Sport et loisirs", "Sport and leisure"]];
// Aperçu léger d'une scène dans la grille : une image (un seul élément), au lieu de milliers de formes dans la page.
const dataUri = (svg: string) => "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);

// Les 4 couleurs de marque des scènes (ambiance Douala) : remplacées par celles de l'ambiance choisie.
const BRAND = CITIES.douala.c;
const recolor = (svg: string, to: readonly string[]) => {
  const map = new Map(BRAND.map((c, k) => [c.toLowerCase(), to[k]]));
  return svg.replace(/#[0-9a-f]{6}\b/gi, (h) => map.get(h.toLowerCase()) ?? h);
};
// Plusieurs SVG dans la même page : chaque copie garde ses propres identifiants de motifs.
const scope = (svg: string, k: string) => svg.replace(/id="([\w-]+)"/g, `id="$1-${k}"`).replace(/url\(#([\w-]+)\)/g, `url(#$1-${k})`).replace(/href="#([\w-]+)"/g, `href="#$1-${k}"`);
// Rendu PNG net : le SVG reçoit la taille finale avant d'être dessiné dans le canevas.
const png = (svg: string, w: number, h: number) => svgToPng(svg.replace("<svg ", `<svg width="${w}" height="${h}" `), w, h);
/** Hook : télécharge le PNG d'un SVG, avec un message si le navigateur refuse le rendu. */
function usePng() {
  const a = useApp();
  return async (name: string, svg: string, w: number, h: number) => {
    try { a.save(name, await png(svg, w, h)); }
    catch { a.toast(a.tt("Image PNG impossible à créer dans ce navigateur : prenez le SVG", "Could not create the PNG in this browser: use the SVG")); }
  };
}
/* ---------------- Personnalisation d'une scène (comme la fiche d'une icône) ---------------- */
/** Réglages d'une scène : les 4 couleurs de marque, le fond, la peau, les coins, le miroir. */
interface Look { colors: string[]; bg: string | null; skin: number; round: boolean; flip: boolean; flag: string | null }
const lookOf = (city: CityId): Look => ({ colors: [...CITIES[city].c], bg: null, skin: 0, round: true, flip: false, flag: null });
/** Le pays de chaque ambiance : c'est son drapeau qui flotte dans les scènes (sauf pays choisi dans la fiche). */
const CITY_ISO: Record<CityId, string> = { douala: "CM", dakar: "SN", marrakech: "MA", lagos: "NG", zanzibar: "TZ", kinshasa: "CD" };
const FLAG_OF = new Map(FLAGS.filter((x) => x.iso).map((x) => [x.iso as string, x]));
const flagIso = (L: Look) => L.flag ?? CITY_ISO[cityOf(L) ?? "douala"];
const TONES = Object.values(SKIN); // du plus foncé au plus clair
const sameCols = (x: string[], y: readonly string[]) => x.every((c, k) => c.toLowerCase() === y[k].toLowerCase());
const cityOf = (L: Look) => (Object.keys(CITIES) as CityId[]).find((k) => sameCols(L.colors, CITIES[k].c)) ?? null;
const custom = (L: Look) => L.bg != null || L.skin !== 0 || !L.round || L.flip || L.flag != null || !cityOf(L);
/** Applique les réglages à une scène (dessinée aux couleurs de Douala). */
function applyLook(svg: string, L: Look) {
  const map = new Map<string, string>(BRAND.map((c, k) => [c.toLowerCase(), L.colors[k]]));
  if (L.skin) TONES.forEach((c, k) => map.set(c.toLowerCase(), TONES[Math.max(0, Math.min(TONES.length - 1, k + L.skin))]));
  let out = svg.replace(/#[0-9a-f]{6}\b/gi, (h) => map.get(h.toLowerCase()) ?? h);
  // Le cadre (voir frame() dans lib.mjs) : la découpe aux coins arrondis, le fond, puis le décor découpé.
  const rx = L.round ? 36 : 0;
  out = out.replace('<clipPath id="cadre"><rect width="800" height="600" rx="36"/>', `<clipPath id="cadre"><rect width="800" height="600" rx="${rx}"/>`);
  out = out.replace(/<\/clipPath><rect width="800" height="600" rx="36" fill="([^"]+)"\/><g clip-path="url\(#cadre\)">/, (_m, f) => `</clipPath><rect width="800" height="600" rx="${rx}" fill="${L.bg ?? f}"/><g clip-path="url(#cadre)">` + (L.flip ? '<g transform="matrix(-1 0 0 1 800 0)">' : ""));
  if (L.flip) out = out.replace(/<\/svg>\s*$/, "</g></svg>");
  // Les drapeaux (voir flag.mjs) : celui du pays voulu, couleurs officielles, jamais recolorés ; à l'endroit même en miroir.
  const fb = FLAG_OF.get(flagIso(L))?.body;
  if (fb) out = out.replace(/(<g data-flag=")[A-Z]{2}("[^>]*>)<!--f-->[\s\S]*?<!--\/f-->/g, (_m, a, b) => `${a}${flagIso(L)}${b}<!--f-->${L.flip ? '<g transform="translate(22 0) scale(-1 1)">' : ""}<g transform="translate(-1 -4.5)">${fb}</g>${L.flip ? "</g>" : ""}<!--/f-->`);
  return out;
}
const SLOTS: [string, string][] = [["Principale", "Main"], ["Accent", "Accent"], ["Profonde", "Deep"], ["Nature", "Nature"]];
const BGS: [string | null, string, string][] = [[null, "D'origine", "Original"], [C.cream, "Crème", "Cream"], [C.white, "Blanc", "White"], [C.sand, "Sable", "Sand"], [C.sky, "Vert pâle", "Pale green"], ["#DCEAF0", "Bleu ciel", "Sky blue"], [C.dark, "Nuit", "Night"], ["none", "Transparent", "Transparent"]];
const PNG_W = [800, 1600, 3200];

function Editor({ scene, base, list, open, close, applyAll }: { scene: Scene | null; base: Look; list: Scene[]; open: (s: Scene) => void; close: () => void; applyAll: (L: Look) => void }) {
  const a = useApp();
  const en = a.lang === "en";
  const [L, setL] = useState<Look>(base);
  const [pw, setPw] = useState(1600);
  const savePng = usePng();
  const panel = useRef<HTMLElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [last, setLast] = useState<Scene | null>(null);
  useEffect(() => { if (scene) setLast(scene); }, [scene]);
  // Chaque scène ouverte repart des réglages de la page.
  useEffect(() => setL(base), [scene?.id, base]);
  // La fiche vit hors de la page (portail) : la page derrière peut ainsi devenir inerte et ne plus défiler.
  useEffect(() => { a.setSheetOpen(!!scene); }, [!!scene]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => a.setSheetOpen(false), []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (scene) {
      opener.current = document.activeElement as HTMLElement | null;
      // Le focus bouge une fois la page passée inerte (ou redevenue active), sinon le navigateur le refuse.
      const t = setTimeout(() => panel.current?.querySelector<HTMLElement>(".ilclose")?.focus({ preventScroll: true }), 40);
      return () => clearTimeout(t);
    } else if (opener.current) {
      const el = opener.current; opener.current = null;
      const t = setTimeout(() => el.focus({ preventScroll: true }), 40);
      return () => clearTimeout(t);
    }
  }, [!!scene]); // eslint-disable-line react-hooks/exhaustive-deps
  const step = (d: number) => {
    if (!scene || !list.length) return;
    const k = list.findIndex((x) => x.id === scene.id);
    open(list[(k + d + list.length) % list.length]);
  };
  useEffect(() => {
    if (!scene) return;
    const f = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (tag === "INPUT" || tag === "SELECT" || e.altKey || e.metaKey || e.ctrlKey) return;
      else if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    };
    addEventListener("keydown", f);
    return () => removeEventListener("keydown", f);
  });
  const sc = scene ?? last;
  const svg = useMemo(() => (sc ? applyLook(sc.svg, L) : ""), [sc, L]);
  if (!sc) return createPortal(<><div className="scrim" /><aside className="drawer ildrawer" aria-hidden="true" {...inert(true)} /></>, document.body);
  const set = (q: Partial<Look>) => setL((x) => ({ ...x, ...q }));
  const setCol = (k: number, c: string) => set({ colors: L.colors.map((x, j) => (j === k ? c : x)) });
  const city = cityOf(L);
  const file = `afroicons-${sc.id}${custom(L) ? "-perso" : city === "douala" ? "" : "-" + city}`;
  const name = en ? sc.en : sc.fr;
  return createPortal(
    <>
      <div className={"scrim" + (scene ? " open" : "")} onClick={close} />
      <aside ref={panel} className={"drawer ildrawer" + (scene ? " open" : "")} role="dialog" aria-modal="true" aria-labelledby="ilTitle" aria-hidden={!scene} {...inert(!scene)}>
        <div className="dscroll">
          <div className="dtop">
            <div><h3 id="ilTitle">{name}</h3><div className="sub"><span>{en ? sc.fr : sc.en}</span><span className="badge">SVG 800×600</span></div></div>
            <div className="dnav">
              <button className="ib" aria-label={a.tt("Scène précédente", "Previous scene")} title={a.tt("Précédente (←)", "Previous (←)")} onClick={() => step(-1)}><IPrev w={2.2} /></button>
              <button className="ib" aria-label={a.tt("Scène suivante", "Next scene")} title={a.tt("Suivante (→)", "Next (→)")} onClick={() => step(1)}><INext w={2.2} /></button>
              <button className="ib ilclose" aria-label={a.tt("Fermer", "Close")} title={a.tt("Fermer (Échap)", "Close (Esc)")} onClick={close}><IClose w={2.2} /></button>
            </div>
          </div>
          <div className={"ilbig" + (L.bg === "none" ? " clear" : "") + (L.round ? "" : " sq")} role="img" aria-label={name} dangerouslySetInnerHTML={{ __html: scope(svg, "ed") }} />

          <div className="ilfields">
            <fieldset className="ilch"><legend>{a.tt("Ambiance", "Mood")}</legend>
              <div className="ilpals">{(Object.entries(CITIES) as [CityId, (typeof CITIES)[CityId]][]).map(([k, v]) => (
                <button key={k} type="button" aria-pressed={city === k} className={city === k ? "on" : ""} onClick={() => set({ colors: [...v.c] })} title={v.n}>
                  <span className="dots">{v.c.map((c) => <i key={c} style={{ background: c }} />)}</span><span>{v.n}</span>
                </button>
              ))}</div>
            </fieldset>
            <fieldset className="ilch"><legend>{a.tt("Couleurs", "Colours")}</legend>
              <div className="ilslots">{SLOTS.map(([fr, e], k) => (
                <label key={fr} className="ilslot"><span className="sw" style={{ background: L.colors[k] }}><input type="color" value={L.colors[k]} onChange={(ev) => setCol(k, ev.target.value.toUpperCase())} aria-label={a.tt(`Couleur ${fr.toLowerCase()}`, `${e} colour`)} /></span><span>{en ? e : fr}<small>{L.colors[k]}</small></span></label>
              ))}</div>
            </fieldset>
            <fieldset className="ilch"><legend>{a.tt("Fond", "Background")}</legend>
              <div>{BGS.map(([c, fr, e]) => (
                <button key={fr} type="button" className={"ilsw" + (c === "none" ? " clear" : c == null ? " orig" : "") + (L.bg === c ? " on" : "")} aria-pressed={L.bg === c} title={en ? e : fr} aria-label={a.tt(`Fond : ${fr}`, `Background: ${e}`)} style={c && c !== "none" ? { background: c } : undefined} onClick={() => set({ bg: c })} />
              ))}
                <label className={"ilsw pick" + (L.bg && L.bg !== "none" && !BGS.some(([c]) => c === L.bg) ? " on" : "")} title={a.tt("Couleur libre", "Custom colour")} style={L.bg && L.bg !== "none" && !BGS.some(([c]) => c === L.bg) ? { background: L.bg } : undefined}><input type="color" value={L.bg && L.bg !== "none" ? L.bg : "#F6EFE4"} aria-label={a.tt("Fond : couleur libre", "Background: custom colour")} onChange={(ev) => set({ bg: ev.target.value.toUpperCase() })} /></label>
              </div>
            </fieldset>
            {sc.svg.includes("data-flag=") && (
              <fieldset className="ilch"><legend>{a.tt("Drapeau", "Flag")}</legend>
                <div className="ilflag">
                  <span className="ilflagsw" aria-hidden="true" dangerouslySetInnerHTML={{ __html: `<svg viewBox="1 4.5 22 15">${FLAG_OF.get(flagIso(L))?.body ?? ""}</svg>` }} />
                  <select value={L.flag ?? ""} onChange={(ev) => set({ flag: ev.target.value || null })} aria-label={a.tt("Drapeau de la scène", "Flag in the scene")}>
                    <option value="">{a.tt(`Selon l'ambiance (${FLAG_OF.get(CITY_ISO[city ?? "douala"])?.country?.fr})`, `From the mood (${FLAG_OF.get(CITY_ISO[city ?? "douala"])?.country?.en})`)}</option>
                    {[...FLAG_OF.values()].sort((x, y) => (en ? x.country!.en.localeCompare(y.country!.en, "en") : x.country!.fr.localeCompare(y.country!.fr, "fr"))).map((x) => <option key={x.iso} value={x.iso}>{en ? x.country!.en : x.country!.fr}</option>)}
                  </select>
                </div>
              </fieldset>
            )}
            <fieldset className="ilch"><legend>{a.tt("Teintes de peau", "Skin tones")} · <output>{L.skin === 0 ? a.tt("comme dessinées", "as drawn") : L.skin < 0 ? a.tt(`plus foncées (${L.skin})`, `darker (${L.skin})`) : a.tt(`plus claires (+${L.skin})`, `lighter (+${L.skin})`)}</output></legend>
              <div className="rng ilrng"><span>{a.tt("Plus foncées", "Darker")}</span><input type="range" min={-2} max={2} step={1} value={L.skin} onChange={(ev) => set({ skin: +ev.target.value })} aria-label={a.tt("Teintes de peau", "Skin tones")} aria-valuetext={L.skin === 0 ? a.tt("Comme dessinées", "As drawn") : L.skin < 0 ? a.tt("Plus foncées", "Darker") : a.tt("Plus claires", "Lighter")} /><span>{a.tt("Plus claires", "Lighter")}</span></div>
            </fieldset>
            <div className="ilchecks">
              <Check on={L.round} set={(round) => set({ round })} label={a.tt("Coins arrondis", "Rounded corners")} />
              <Check on={L.flip} set={(flip) => set({ flip })} label={a.tt("Miroir", "Mirror")} />
            </div>
          </div>

          <div className="ilout">
            <div className="ilacts">
              <button className="btn p" onClick={() => a.save(file + ".svg", svg)}>{a.tt("Télécharger le SVG", "Download SVG")}</button>
              <button className="btn" onClick={() => a.copy(svg, a.tt("SVG copié", "SVG copied"))}>{a.tt("Copier le SVG", "Copy SVG")}</button>
            </div>
            <div className="ilacts">
              <select value={pw} onChange={(ev) => setPw(+ev.target.value)} aria-label={a.tt("Taille du PNG", "PNG size")}>{PNG_W.map((w) => <option key={w} value={w}>{w}×{w * 0.75}</option>)}</select>
              <button className="btn" onClick={() => savePng(file + ".png", svg, pw, pw * 0.75)}>{a.tt("Télécharger le PNG", "Download PNG")}</button>
            </div>
            <div className="ilacts">
              <button className="btn" onClick={() => { applyAll({ ...L, flip: false }); a.toast(a.tt("Réglages appliqués à toutes les scènes", "Settings applied to every scene")); }}>{a.tt("Appliquer à toutes les scènes", "Apply to every scene")}</button>
              <button className="btn" onClick={() => setL({ ...base, flip: false })}>{a.tt("Réinitialiser", "Reset")}</button>
            </div>
          </div>
        </div>
      </aside>
    </>,
    document.body,
  );
}

const nrm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/* ---------------- Atelier : composer un personnage ---------------- */
type Pose = "stand" | "walk" | "sit";
type Outfit = "pants" | "skirt" | "pagne" | "dress" | "kaba" | "boubou" | "agbada" | "dashiki" | "ndop" | "toghu" | "jacket" | "coat";
interface Perso { skin: keyof typeof SKIN; hair: string; outfit: Outfit; pose: Pose; hat: string; face: string; color: number; wax: boolean; beard: boolean }
const HAIRS: [string, string, string][] = [["short", "Court", "Short"], ["afro", "Afro", "Afro"], ["nattes", "Nattes collées", "Cornrows"], ["boxbraids", "Tresses longues", "Box braids"], ["fulani", "Tresses peules", "Fulani braids"], ["tresses", "Chignon tressé", "Braided bun"], ["bantu", "Bantu knots", "Bantu knots"], ["locks", "Locks", "Locs"], ["puffs", "Couettes", "Puffs"], ["foulard", "Foulard", "Headwrap"], ["gele", "Gele", "Gele"], ["rase", "Rasé", "Shaved"]];
const OUTFITS: [Outfit, string, string][] = [["pants", "Pantalon", "Trousers"], ["skirt", "Jupe", "Skirt"], ["pagne", "Pagne", "Wrapper"], ["dress", "Robe", "Dress"], ["kaba", "Kaba", "Kaba"], ["boubou", "Boubou", "Boubou"], ["agbada", "Agbada", "Agbada"], ["dashiki", "Dashiki", "Dashiki"], ["ndop", "Ndop", "Ndop"], ["toghu", "Toghu", "Toghu"], ["jacket", "Costume", "Suit"], ["coat", "Blouse", "Lab coat"]];
const POSES: [Pose, string, string][] = [["stand", "Debout", "Standing"], ["walk", "En marche", "Walking"], ["sit", "Assis", "Sitting"]];
const HATS: [string, string, string][] = [["", "Aucun", "None"], ["kufi", "Kufi", "Kufi"], ["ashetu", "Bonnet de notable", "Chief's cap"], ["chapeau", "Chapeau", "Hat"], ["cap", "Casquette", "Cap"], ["helmet", "Casque", "Helmet"]];
const FACES: [string, string, string][] = [["smile", "Sourire", "Smile"], ["laugh", "Rire", "Laugh"], ["talk", "Parle", "Talking"], ["calm", "Calme", "Calm"]];
const COLORS = [C.terra, C.ocre, C.indigo, C.green, C.white];
const DEF_P: Perso = { skin: "s2", hair: "gele", outfit: "kaba", pose: "stand", hat: "", face: "smile", color: 0, wax: true, beard: false };

function drawPerso(p: Perso) {
  const col = COLORS[p.color], other = col === C.indigo ? C.ocre : C.indigo;
  const o: Record<string, unknown> = {
    x: 0, y: 0, s: 1, skin: SKIN[p.skin], beard: p.beard, face: p.face, top: col, bottom: other,
    hair: p.hair === "foulard" || p.hair === "gele" ? { type: p.hair, color: p.color === 1 ? C.terra : C.ocre, wax: p.wax ? "wax1" : undefined } : { type: p.hair, beads: p.hair === "boxbraids" || p.hair === "fulani" ? C.ocre : undefined },
    wax: p.wax && p.outfit !== "jacket" && p.outfit !== "coat" ? (col === C.ocre ? "wax2" : col === C.white ? "wax3" : "wax1") : null,
    hat: p.hat ? { type: p.hat, color: p.hat === "kufi" ? other : p.hat === "ashetu" ? C.red : C.terra } : null,
  };
  // Tissus traditionnels : ndop (indigo et blanc des Grassfields), toghu (velours noir brodé du Nord-Ouest).
  if (p.outfit === "ndop") Object.assign(o, { top: "#1C2756", wax: "ndop", bottom: "#1C2756", bwax: "ndop" });
  if (p.outfit === "toghu") Object.assign(o, { top: "#15110F", wax: "toghu", bottom: C.dark });
  if (p.outfit === "dashiki") Object.assign(o, { dashiki: col === C.ocre ? C.terra : C.ocre, wax: null });
  if (p.outfit === "pagne") Object.assign(o, { bottom: col === C.ocre ? C.terra : C.ocre, bwax: "wax1", wax: null });
  if (p.outfit === "dress" || p.outfit === "boubou" || p.outfit === "kaba" || p.outfit === "agbada") o.robe = p.outfit;
  if (p.outfit === "jacket") o.jacket = { color: col === C.white ? C.indigo : col, shirt: C.white, tie: col === C.terra ? C.ocre : C.terra };
  if (p.outfit === "coat") o.coat = { inner: C.blue };
  const skirt = ["skirt", "pagne", "dress", "kaba", "boubou", "agbada"].includes(p.outfit);
  o.legs = p.pose === "sit" ? "sit" : p.pose === "walk" ? (skirt ? "walkskirt" : "walk") : skirt ? "skirt" : "stand";
  const chair = p.pose === "sit" ? `<rect x="-40" y="-200" width="12" height="200" rx="4" fill="${C.wood2}"/><rect x="-40" y="-100" width="104" height="11" rx="3" fill="${C.wood2}"/><rect x="54" y="-92" width="7" height="92" fill="${C.wood2}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-110 -330 240 345">${defs}<ellipse cx="10" cy="0" rx="90" ry="9" fill="#000" opacity=".07"/>${chair}${person(o)}</svg>`;
}

/** Case à cocher dessinée (la vraie case reste là, invisible, pour le clavier et les lecteurs d'écran). */
function Check({ on, set, label }: { on: boolean; set: (v: boolean) => void; label: string }) {
  return (
    <label className="ilck">
      <input type="checkbox" checked={on} onChange={(e) => set(e.target.checked)} />
      <span className="box" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>
      <span>{label}</span>
    </label>
  );
}

function Choice<T extends string | number>({ label, value, list, set }: { label: string; value: T; list: [T, string][]; set: (v: T) => void }) {
  return (
    <fieldset className="ilch"><legend>{label}</legend>
      <div>{list.map(([v, n]) => <button key={String(v)} type="button" aria-pressed={value === v} className={value === v ? "on" : ""} onClick={() => set(v)}>{n}</button>)}</div>
    </fieldset>
  );
}

function Composer({ colors }: { colors: string[] }) {
  const a = useApp();
  const en = a.lang === "en";
  const [p, setP] = useState<Perso>(DEF_P);
  const savePng = usePng();
  const set = (q: Partial<Perso>) => setP((x) => ({ ...x, ...q }));
  const svg = useMemo(() => recolor(drawPerso(p), colors), [p, colors]);
  const tr = <T extends string>(l: [T, string, string][]) => l.map(([v, fr, e]) => [v, en ? e : fr] as [T, string]);
  const random = () => {
    const r = <T,>(l: T[]) => l[Math.floor(Math.random() * l.length)];
    setP({ skin: r(Object.keys(SKIN) as Perso["skin"][]), hair: r(HAIRS)[0], outfit: r(OUTFITS)[0], pose: r(POSES)[0], hat: Math.random() < 0.6 ? "" : r(HATS)[0], face: r(FACES)[0], color: Math.floor(Math.random() * 5), wax: Math.random() < 0.5, beard: Math.random() < 0.3 });
  };
  return (
    <section id="composer" className="ilcomp" aria-labelledby="ilcomp-h">
      <div className="ilprev">
        <div className="ilstage" role="img" aria-label={a.tt("Aperçu de votre personnage", "Preview of your character")} dangerouslySetInnerHTML={{ __html: scope(svg, "perso") }} />
        <div className="ilacts">
          <button className="btn p" onClick={() => a.save("afroicons-personnage.svg", svg)}>SVG</button>
          <button className="btn" onClick={() => savePng("afroicons-personnage.png", svg, 960, 1380)}>PNG</button>
          <button className="btn" onClick={random}>{a.tt("Au hasard", "Shuffle")}</button>
        </div>
      </div>
      <div className="ilctl">
        <h3 id="ilcomp-h">{a.tt("Composez votre personnage", "Build your character")}</h3>
        <p>{a.tt("Les pièces des scènes, à assembler : téléchargez le résultat en SVG pour vos maquettes.", "The building blocks of the scenes: download the result as SVG for your mock-ups.")}</p>
        <fieldset className="ilch"><legend>{a.tt("Peau", "Skin")}</legend>
          <div>{(Object.keys(SKIN) as Perso["skin"][]).map((k, n) => <button key={k} type="button" className={"ilsw" + (p.skin === k ? " on" : "")} aria-pressed={p.skin === k} aria-label={a.tt(`Teinte ${n + 1}`, `Tone ${n + 1}`)} style={{ background: SKIN[k] }} onClick={() => set({ skin: k })} />)}</div>
        </fieldset>
        <Choice label={a.tt("Coiffure", "Hair")} value={p.hair} list={tr(HAIRS)} set={(hair) => set({ hair })} />
        <Choice label={a.tt("Tenue", "Outfit")} value={p.outfit} list={tr(OUTFITS)} set={(outfit) => set({ outfit })} />
        <Choice label={a.tt("Expression", "Expression")} value={p.face} list={tr(FACES)} set={(face) => set({ face })} />
        <Choice label={a.tt("Pose", "Pose")} value={p.pose} list={tr(POSES)} set={(pose) => set({ pose })} />
        <Choice label={a.tt("Couvre-chef", "Headwear")} value={p.hat} list={tr(HATS)} set={(hat) => set({ hat })} />
        <fieldset className="ilch"><legend>{a.tt("Couleur", "Colour")}</legend>
          <div>{COLORS.map((c, n) => <button key={c} type="button" className={"ilsw" + (p.color === n ? " on" : "")} aria-pressed={p.color === n} aria-label={a.tt(`Couleur ${n + 1}`, `Colour ${n + 1}`)} style={{ background: recolor(c, colors) }} onClick={() => set({ color: n })} />)}</div>
        </fieldset>
        <div className="ilchecks">
          <Check on={p.wax} set={(wax) => set({ wax })} label={a.tt("Tissu wax", "Wax print")} />
          <Check on={p.beard} set={(beard) => set({ beard })} label={a.tt("Barbe", "Beard")} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- La page ---------------- */
export function Illustrations() {
  const a = useApp();
  const [scenes, setScenes] = useState<Scene[] | null>(null);
  const [failed, setFailed] = useState(false);
  const savePng = usePng();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  // Réglages de la page (ambiance, fond, peau…) : la fiche d'une scène en part, et peut les appliquer à toutes.
  const [look, setLook] = useState<Look>(() => lookOf(a.city));
  useEffect(() => setLook(lookOf(a.city)), [a.city]);
  const city = cityOf(look) ?? "douala";
  const setCity = (k: CityId) => setLook((x) => ({ ...x, colors: [...CITIES[k].c] }));
  const [cur, setCur] = useState<Scene | null>(null);
  useEffect(() => {
    import("../../../../src/illustrations.json").then((m) => setScenes(m.default as Scene[])).catch(() => setFailed(true));
  }, []);
  // Lien direct vers une scène (#marche) : la fiche s'ouvre, et l'adresse suit la scène ouverte.
  useEffect(() => {
    if (!scenes) return;
    const fromHash = () => { const id = decodeURIComponent(location.hash.slice(1)); const s = scenes.find((x) => x.id === id); if (s) setCur(s); };
    fromHash();
    addEventListener("hashchange", fromHash);
    return () => removeEventListener("hashchange", fromHash);
  }, [scenes]);
  useEffect(() => {
    if (!scenes) return;
    const want = cur ? "#" + cur.id : "";
    if (location.hash !== want) history.replaceState(null, "", location.pathname + location.search + want);
  }, [cur, scenes]);
  const en = a.lang === "en";
  const catName = (k: string) => { const c = CATS.find((x) => x[0] === k); return c ? (en ? c[2] : c[1]) : ""; };
  const found = useMemo(() => {
    const n = nrm(q.trim());
    return (scenes ?? []).filter((s) => !n || nrm([s.fr, s.en, ...s.tags, ...(CATS.find((c) => c[0] === s.cat) ?? []).slice(1)].join(" ")).includes(n));
  }, [scenes, q]);
  const shown = useMemo(() => found.filter((s) => !cat || s.cat === cat), [found, cat]);
  const file = (s: Scene) => `afroicons-${s.id}${custom(look) ? "-perso" : city === "douala" ? "" : "-" + city}`;
  const toComposer = () => document.getElementById("composer")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });

  return (
    <section id="illustrations" className="illus">
      <div className="shead ilhead"><div>
        <div className="kick">{a.tt("Nouveau · illustrations libres", "New · free illustrations")}</div>
        <h2>{a.tt("Illustrations", "Illustrations")}</h2>
        <p>{a.tt(`${scenes?.length ?? ""} scènes de la vie africaine d'aujourd'hui, pour vos sites, présentations et réseaux sociaux. Choisissez une ambiance, ou ouvrez une scène pour la personnaliser : couleurs, fond, drapeau, teintes de peau. En SVG ou en PNG, licence MIT.`, `${scenes?.length ?? ""} scenes of everyday African life today, for your websites, slides and social posts. Pick a mood, or open a scene to customise it: colours, background, flag, skin tones. As SVG or PNG, MIT licence.`)}</p>
        <div className="ilheadacts">
          <button className="btn" onClick={toComposer}>{a.tt("Composer un personnage", "Build a character")} ↓</button>
        </div>
      </div></div>

      <div className="iltools">
        <label className="ilsearch"><ISearch s={17} /><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={a.tt("Chercher une scène : marché, école, drapeau…", "Search a scene: market, school, flag…")} aria-label={a.tt("Chercher une illustration", "Search illustrations")} /></label>
        <div className="ilrow">
          <span className="illbl">{a.tt("Ambiance", "Mood")}</span>
          <div className="ilpals" role="group" aria-label={a.tt("Couleurs des illustrations", "Illustration colours")}>
            {(Object.entries(CITIES) as [CityId, (typeof CITIES)[CityId]][]).map(([k, v]) => (
              <button key={k} type="button" aria-pressed={cityOf(look) === k} className={cityOf(look) === k ? "on" : ""} onClick={() => setCity(k)} title={v.n}>
                <span className="dots">{v.c.map((c) => <i key={c} style={{ background: c }} />)}</span><span>{v.n}</span>
              </button>
            ))}
          </div>
        </div>
        {scenes && <div className="ilrow">
          <span className="illbl">{a.tt("Rubrique", "Topic")}</span>
          <div className="ilcats" role="group" aria-label={a.tt("Rubriques", "Topics")}>
            {[["", a.tt("Toutes", "All")] as [string, string], ...CATS.map(([k]) => [k, catName(k)] as [string, string])].map(([k, n]) => {
              const c = k ? found.filter((s) => s.cat === k).length : found.length;
              return <button key={k || "all"} type="button" aria-pressed={cat === k} className={cat === k ? "on" : ""} disabled={!c && cat !== k} onClick={() => setCat(k)}>{n}<small>{c}</small></button>;
            })}
          </div>
        </div>}
        {custom(look) && <p className="ilnote" role="status">{a.tt("Vos réglages personnalisés s'appliquent à toutes les scènes.", "Your custom settings apply to every scene.")} <button className="lnk" onClick={() => setLook(lookOf(a.city))}>{a.tt("Revenir aux réglages d'origine", "Back to the original settings")}</button></p>}
      </div>

      {failed ? <p className="ilempty">{a.tt("Les illustrations n'ont pas pu se charger. Vérifiez votre connexion puis rechargez la page.", "The illustrations could not load. Check your connection, then reload the page.")}</p>
        : !scenes ? <div className="ilgrid" aria-busy="true">{[0, 1, 2, 3, 4, 5].map((k) => <div key={k} className="ilcard wait" />)}</div>
        : !shown.length ? <div className="ilempty"><p>{a.tt("Aucune scène ne correspond. Essayez « marché », « école » ou « famille ».", "No scene matches. Try “market”, “school” or “family”.")}</p><button className="btn" onClick={() => { setQ(""); setCat(""); }}>{a.tt("Tout afficher", "Show all")}</button></div>
        : <ul className="ilgrid">
          {shown.map((s) => {
            const svg = applyLook(s.svg, look);
            const name = en ? s.en : s.fr;
            return (
              <li key={s.id} className="ilcard">
                <button type="button" className={"ilimg" + (look.bg === "none" ? " clear" : "")} aria-label={a.tt(`Personnaliser « ${s.fr} »`, `Customise “${s.en}”`)} onClick={() => setCur(s)}>
                  <img src={dataUri(svg)} alt="" width={800} height={600} loading="lazy" decoding="async" />
                  <span className="ilhover" aria-hidden="true"><ISliders s={15} />{a.tt("Personnaliser", "Customise")}</span>
                </button>
                <div className="ilmeta">
                  <div className="iltitle"><h3>{name}</h3><span>{catName(s.cat)}</span></div>
                  <div className="ilacts">
                    <button className="btn p" onClick={() => a.save(file(s) + ".svg", svg)} aria-label={a.tt(`Télécharger « ${s.fr} » en SVG`, `Download “${s.en}” as SVG`)}>SVG</button>
                    <button className="btn" onClick={() => savePng(file(s) + ".png", svg, 1600, 1200)} aria-label={a.tt(`Télécharger « ${s.fr} » en PNG`, `Download “${s.en}” as PNG`)}>PNG</button>
                    <button className="btn" onClick={() => a.copy(svg, a.tt("SVG copié", "SVG copied"))} aria-label={a.tt(`Copier le code SVG de « ${s.fr} »`, `Copy the SVG code of “${s.en}”`)}>{a.tt("Copier", "Copy")}</button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>}

      <Composer colors={look.colors} />
      <Editor scene={cur} base={look} list={shown.some((x) => x.id === cur?.id) ? shown : scenes ?? []} open={setCur} close={() => setCur(null)} applyAll={setLook} />
    </section>
  );
}
