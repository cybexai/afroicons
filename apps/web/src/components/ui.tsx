import { forwardRef, memo, type CSSProperties } from "react";
import type { Icon } from "../lib/constants";
import { svgStr, type SvgOpts } from "../lib/svg";
import { useApp } from "../state";

/** Affiche une icône. Le corps SVG vient de nos propres données (jamais d'une saisie utilisateur). */
export const Svg = memo(forwardRef<HTMLSpanElement, { i: Icon; o?: SvgOpts; className?: string; style?: CSSProperties }>(function Svg({ i, o, className, style }, ref) {
  return <span ref={ref} className={className} style={{ display: className ? undefined : "contents", ...style }} dangerouslySetInnerHTML={{ __html: svgStr(i, o) }} />;
}));

/** Une chaîne SVG brute (logo, motif…), rendue telle quelle. */
export const Raw = ({ html, className, style }: { html: string; className?: string; style?: CSSProperties }) => (
  <span className={className} style={{ display: className ? undefined : "contents", ...style }} dangerouslySetInnerHTML={{ __html: html }} />
);

/** Texte traduit. Les rares textes avec balises (<em>, &lt;) sont rendus en HTML. */
export function T({ k }: { k: string }) {
  const { t } = useApp();
  const v = t(k);
  return /[<&]/.test(v) ? <span style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: v }} /> : <>{v}</>;
}

/* ---- petites icônes d'interface ---- */
type P = { s?: number; w?: number };
const ui = (d: string, fill = false) => ({ s = 18, w = 2 }: P) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: d }} />
);
export const ISearch = ui('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>');
export const IMenu = ui('<path d="M4 7h16M4 12h16M4 17h16"/>');
export const IClose = ui('<path d="M6 6l12 12M18 6L6 18"/>');
export const IPrev = ui('<path d="M15 6l-6 6 6 6"/>');
export const INext = ui('<path d="M9 6l6 6-6 6"/>');
export const IDown = ui('<path d="M12 5v14M5 12l7 7 7-7"/>');
export const IChevron = ui('<path d="M6 9l6 6 6-6"/>');
export const IHeart = ({ s = 17, on = false }: P & { on?: boolean }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={on ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} strokeLinejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
);
export const ICopy = ui('<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>');
export const ICheck = ui('<path d="M5 12.5l4.5 4.5L19 7.5"/>');
export const ISelect = ui('<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8.5 12l2.5 2.5 4.5-5"/>');
export const IGrid = ui('<path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>');
export const IReplay = ui('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>');
export const IShuffle = ui('<path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>');
export const ITrash = ui('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>');
export const IUp = ui('<path d="M12 19V5M5 12l7-7 7 7"/>');
export const ISun = ui('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>');
export const IMoon = ui('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>');
