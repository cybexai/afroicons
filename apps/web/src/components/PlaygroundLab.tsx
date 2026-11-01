import { useEffect, useRef, useState, type ReactNode } from "react";
import { byId } from "../lib/constants";
import { useApp } from "../state";

/* Outils du bac à sable : équivalents africains, contraste (WCAG), simulations de vision, animations au survol,
   couleurs d'un logo importé, et la vue « Votre écran » (des icônes posées sur une capture de l'application). */

/** Icône d'interface → icône culturelle qui joue le même rôle (le panier pour le chariot, le ngongi pour la cloche…). */
const AFRICA_RAW: Record<string, string> = {
  Home: "case", LayoutDashboard: "awale", Store: "boutique", ShoppingCart: "panier", ShoppingBag: "panier",
  Wallet: "cauri", Coins: "cauri", Banknote: "sacdargent", HandCoins: "tontine", PiggyBank: "tontine", Send: "mobilemoney", CreditCard: "mobilemoney",
  Truck: "taxibrousse", Bus: "taxibrousse", Car: "mototaxi", Package: "calebassepleine", Boxes: "grenier", Warehouse: "grenier",
  Phone: "telephoneportable", Smartphone: "telephoneportable", MessageCircle: "tamaparleur", MessageSquare: "tamaparleur", Bell: "ngongi", BellRing: "ngongi",
  MapPin: "baobab", Sprout: "epimil", Tractor: "houe", Pill: "calebasse", Landmark: "djenne", Building: "ville", Building2: "ville",
  Lightbulb: "lampe", Sun: "soleil", Moon: "luneetoiles", Receipt: "ardoise", ReceiptText: "ardoise", FileText: "ardoise", BookOpen: "ardoise",
  GraduationCap: "toquedediplome", Shirt: "boubou", UtensilsCrossed: "marmite", ChefHat: "marmite", Globe: "afrique", Star: "nsoromma",
  ShieldCheck: "boucliermassai", Shield: "bouclierzoulou", Award: "adinkrahene", Crown: "adinkrahene", Fuel: "jerrycan", Palette: "wax", Layers: "kente",
  Zap: "groupeelectrogene", Users: "tamaparleur", Calendar: "luneetoiles", Clock: "soleil", Settings: "sankofa",
};
const uiId = (n: string) => "ui-" + n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([a-zA-Z])(\d)/g, "$1-$2").toLowerCase();
export const AFRICA: Record<string, string> = Object.fromEntries(Object.entries(AFRICA_RAW).map(([k, v]) => [uiId(k), v]).filter(([k, v]) => byId[k] && byId[v]));

/* ---- Contraste (WCAG 2.2) ---- */
const rgb = (h: string) => { const n = parseInt(h.replace("#", ""), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const hex = (r: number, g: number, b: number) => "#" + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("").toUpperCase();
const lum = (h: string) => { const [r, g, b] = rgb(h).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
export const ratio = (a: string, b: string) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
/** Couleur a posée à t % d'opacité sur b (les pastilles teintées des maquettes). */
export const mix = (a: string, b: string, t: number) => { const [p, q] = [rgb(a), rgb(b)]; return hex(...(p.map((v, i) => v * t + q[i] * (1 - t)) as [number, number, number])); };
const toHsl = (h: string) => {
  const [r, g, b] = rgb(h).map((v) => v / 255), mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  if (!d) return [0, 0, l];
  const s = d / (1 - Math.abs(2 * l - 1));
  const hh = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [(hh * 60 + 360) % 360, s, l];
};
const fromHsl = (h: number, s: number, l: number) => {
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return hex((r + m) * 255, (g + m) * 255, (b + m) * 255);
};
export type Pair = { id: string; fr: string; en: string; fg: string; bg: string; min: number };
/** La couleur principale la plus proche qui passe tous les contrôles (même teinte, luminosité ajustée). */
export function fixPrimary(primary: string, check: (p: string) => boolean) {
  const [h, s, l] = toHsl(primary);
  for (let d = 0; d <= 1; d += 0.01) for (const t of [l - d, l + d]) if (t > 0.04 && t < 0.96) { const c = fromHsl(h, s, t); if (check(c)) return c; }
  return null;
}

/* ---- Simulations de vision ---- */
export const VISIONS = [
  { id: "none", fr: "Normale", en: "Normal", css: "" },
  { id: "protan", fr: "Protanopie (rouge)", en: "Protanopia (red)", css: "url(#pg-protan)" },
  { id: "deutan", fr: "Deutéranopie (vert)", en: "Deuteranopia (green)", css: "url(#pg-deutan)" },
  { id: "tritan", fr: "Tritanopie (bleu)", en: "Tritanopia (blue)", css: "url(#pg-tritan)" },
  { id: "achro", fr: "Sans couleurs", en: "No colour", css: "grayscale(1)" },
  { id: "blur", fr: "Vue floue", en: "Blurred vision", css: "blur(1.4px)" },
  { id: "sun", fr: "En plein soleil", en: "In bright sunlight", css: "contrast(.5) brightness(1.3) saturate(.7)" },
] as const;
export type Vision = (typeof VISIONS)[number]["id"];
/** Les matrices de daltonisme, référencées par filter: url(#…). */
export const VisionFilters = () => (
  <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
    <filter id="pg-protan"><feColorMatrix values="0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0" /></filter>
    <filter id="pg-deutan"><feColorMatrix values="0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0" /></filter>
    <filter id="pg-tritan"><feColorMatrix values="0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0.475 0.525 0 0 0 0 0 1 0" /></filter>
  </svg>
);

/* ---- Animations au survol ---- */
export const ANIMS = [
  { id: "none", fr: "Aucune", en: "None" }, { id: "draw", fr: "Dessin", en: "Draw" }, { id: "bounce", fr: "Rebond", en: "Bounce" },
  { id: "spin", fr: "Rotation", en: "Spin" }, { id: "pulse", fr: "Pulsation", en: "Pulse" }, { id: "shake", fr: "Secousse", en: "Shake" },
] as const;
export type Anim = (typeof ANIMS)[number]["id"];
const KEYS: Record<Exclude<Anim, "none">, string> = {
  draw: "@keyframes afro-draw { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }",
  bounce: "@keyframes afro-bounce { 0%, 100% { transform: translateY(0); } 35% { transform: translateY(-22%); } 65% { transform: translateY(6%); } }",
  spin: "@keyframes afro-spin { to { transform: rotate(360deg); } }",
  pulse: "@keyframes afro-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.22); } }",
  shake: "@keyframes afro-shake { 0%, 100% { transform: rotate(0); } 20%, 60% { transform: rotate(-14deg); } 40%, 80% { transform: rotate(14deg); } }",
};
const RULE: Record<Exclude<Anim, "none">, (sel: string) => string> = {
  draw: (s) => `${s} :is(path, line, polyline, polygon, circle, ellipse, rect) {\n  stroke-dasharray: 100;\n  animation: afro-draw .8s ease both;\n}`,
  bounce: (s) => `${s} { animation: afro-bounce .6s ease; }`,
  spin: (s) => `${s} { animation: afro-spin .7s ease-in-out; }`,
  pulse: (s) => `${s} { animation: afro-pulse .5s ease; }`,
  shake: (s) => `${s} { animation: afro-shake .5s ease; transform-origin: 50% 20%; }`,
};
/** Le CSS d'une animation, pour un sélecteur donné (le bac à sable ou le code à copier). */
export const animCss = (a: Anim, sel: string) => (a === "none" ? "" : `${KEYS[a]}\n${RULE[a](sel)}`);

/* ---- Couleurs dominantes d'une image (logo importé) ---- */
export function paletteOf(url: string): Promise<string[]> {
  return new Promise((ok) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas"), n = 48; c.width = c.height = n;
      const x = c.getContext("2d", { willReadFrequently: true });
      if (!x) return ok([]);
      x.drawImage(img, 0, 0, n, n);
      const d = x.getImageData(0, 0, n, n).data, count = new Map<string, number>();
      for (let i = 0; i < d.length; i += 4) {
        if (d[i + 3] < 200) continue;
        const [r, g, b] = [d[i], d[i + 1], d[i + 2]], mx = Math.max(r, g, b), mn = Math.min(r, g, b);
        if ((mx - mn < 28 && (mx > 225 || mx < 30)) || (mn > 200 && mx - mn < 70)) continue; // fond blanc ou noir, teintes pâles d'anticrénelage
        const k = hex(Math.round(r / 24) * 24, Math.round(g / 24) * 24, Math.round(b / 24) * 24);
        count.set(k, (count.get(k) ?? 0) + 1);
      }
      const far = (a: string, b: string) => { const [p, q] = [rgb(a), rgb(b)]; return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) > 70; };
      const out: string[] = [];
      const total = [...count.values()].reduce((t, v) => t + v, 0);
      for (const [k, v] of [...count].sort((p, q) => q[1] - p[1])) { if (v < total * 0.03) break; if (out.every((o) => far(o, k))) out.push(k); if (out.length === 4) break; }
      ok(out);
    };
    img.onerror = () => ok([]);
    img.src = url;
  });
}

/* ---- Vue « Votre écran » ---- */
export type Pins = Record<string, { x: number; y: number }>;
type ScreenProps = {
  image: string | null; setImage: (f: File) => void; clear: () => void;
  pins: Pins; move: (k: string, x: number, y: number) => void; add: (x: number, y: number) => void; open: (k: string) => void;
  render: (k: string) => ReactNode; frame: (body: JSX.Element) => JSX.Element;
};
export function ScreenView({ image, setImage, clear, pins, move, add, open, render, frame }: ScreenProps) {
  const a = useApp();
  const box = useRef<HTMLDivElement>(null);
  const file = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  // Coller une capture (⌘V / Ctrl V) l'importe directement.
  useEffect(() => {
    const f = (e: ClipboardEvent) => { const it = [...(e.clipboardData?.items ?? [])].find((i) => i.type.startsWith("image/")); const fl = it?.getAsFile(); if (fl) { e.preventDefault(); setImage(fl); } };
    addEventListener("paste", f); return () => removeEventListener("paste", f);
  }, [setImage]);
  const pickFile = (fl?: File | null) => { if (fl && fl.type.startsWith("image/")) setImage(fl); };
  const at = (cx: number, cy: number) => { const r = box.current!.getBoundingClientRect(); return [Math.min(1, Math.max(0, (cx - r.left) / r.width)), Math.min(1, Math.max(0, (cy - r.top) / r.height))]; };
  const down = (e: React.PointerEvent, k: string) => {
    e.stopPropagation(); e.preventDefault();
    const sx = e.clientX, sy = e.clientY; let moved = false;
    const mv = (ev: PointerEvent) => { if (Math.hypot(ev.clientX - sx, ev.clientY - sy) > 4) moved = true; if (moved) { const [x, y] = at(ev.clientX, ev.clientY); move(k, x, y); } };
    const up = () => { removeEventListener("pointermove", mv); removeEventListener("pointerup", up); if (!moved) open(k); };
    addEventListener("pointermove", mv); addEventListener("pointerup", up);
  };
  const input = <input ref={file} type="file" accept="image/*" hidden onChange={(e) => { pickFile(e.target.files?.[0]); e.target.value = ""; }} />;
  if (!image) return (
    <div className={"pgdrop" + (over ? " over" : "")} onClick={(e) => { e.stopPropagation(); file.current?.click(); }}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={(e) => { e.preventDefault(); setOver(false); pickFile(e.dataTransfer.files[0]); }}>
      {input}
      <b>{a.tt("Testez les icônes sur votre propre application", "Try the icons on your own app")}</b>
      <p>{a.tt("Glissez ici une capture d'écran de votre site ou de votre application, collez-la (⌘V / Ctrl V) ou cliquez pour la choisir. Posez ensuite les icônes dessus, là où elles iront.", "Drop a screenshot of your site or app here, paste it (⌘V / Ctrl V) or click to choose it. Then place the icons on it, where they will go.")}</p>
      <span className="btn a">{a.tt("Choisir une capture", "Choose a screenshot")}</span>
      <small>{a.tt("L'image reste sur votre ordinateur : elle n'est envoyée nulle part.", "The image stays on your computer: it is not sent anywhere.")}</small>
    </div>
  );
  return (
    <div className="pgshot">
      {input}
      <div className="pgshoth">
        <p>{a.tt("Cliquez sur l'image pour poser une icône, faites-la glisser pour la déplacer, cliquez dessus pour la changer ou la personnaliser.", "Click the image to place an icon, drag it to move it, click it to swap or customise it.")}</p>
        <button className="btn" onClick={(e) => { e.stopPropagation(); file.current?.click(); }}>{a.tt("Changer d'image", "Change image")}</button>
        <button className="btn" onClick={(e) => { e.stopPropagation(); clear(); }}>{a.tt("Retirer", "Remove")}</button>
      </div>
      {frame(
        <div ref={box} className="pgshotimg" onClick={(e) => { e.stopPropagation(); const [x, y] = at(e.clientX, e.clientY); add(x, y); }}>
          <img src={image} alt={a.tt("Votre capture d'écran", "Your screenshot")} draggable={false} />
          {Object.entries(pins).map(([k, p]) => (
            <span key={k} className="pgpin" style={{ left: p.x * 100 + "%", top: p.y * 100 + "%" }} onPointerDown={(e) => down(e, k)} onClick={(e) => e.stopPropagation()}>{render(k)}</span>
          ))}
        </div>,
      )}
    </div>
  );
}
