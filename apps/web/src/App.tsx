import { useEffect, useRef } from "react";
import { PAGE, byId } from "./lib/constants";
import { useApp } from "./state";
import { Hero, Marquee, Nav } from "./components/Header";
import { Library } from "./components/Library";
import { CommandPalette, Drawer, Help, Toast, ToTop, Tray, inert } from "./components/Overlays";
import { Brand, Footer, Manifesto, Showcase, Studio, Usage } from "./components/Sections";
import { IdeaBox, IdeaBoundary } from "./components/IdeaBox";
import { Changelog } from "./components/Changelog";

export default function App() {
  const a = useApp();

  // Lien direct vers une icône : afroicons.org/icones/baobab/ (ou l'ancienne forme afroicons.org/#baobab)
  useEffect(() => {
    const open = () => {
      const h = location.hash.slice(1), p = location.pathname.match(/\/icones\/([a-z0-9-]+)\/?$/)?.[1];
      if (byId[h]) a.openIcon(h); else if (p && byId[p]) a.openIcon(p);
    };
    open();
    // Arrivée depuis une autre page sur une section (afroicons.org/#atelier) : on y descend une fois la page affichée.
    const sec = location.hash.slice(1);
    if (sec && !byId[sec]) {
      const go = () => document.getElementById(sec)?.scrollIntoView({ behavior: "instant" });
      if (document.readyState === "complete") setTimeout(go, 50); else addEventListener("load", () => setTimeout(go, 50), { once: true });
    }
    addEventListener("hashchange", open);
    return () => removeEventListener("hashchange", open);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Le titre de l'onglet suit l'icône ouverte (et revient au titre du site à la fermeture).
  const siteTitle = useRef(document.title.includes("| Afroicons") && PAGE === "home" ? a.tt("Afroicons — des icônes qui racontent l'Afrique", "Afroicons — icons that tell Africa's story") : document.title);
  useEffect(() => {
    const i = a.current ? byId[a.current] : null;
    document.title = i ? `${a.lang === "en" ? i.en : i.fr} — ${i.cat === "drapeaux" ? a.tt("SVG gratuit, couleurs officielles", "free SVG, official colours") : a.tt("icône SVG gratuite", "free SVG icon")} | Afroicons` : siteTitle.current;
  }, [a.current, a.lang]); // eslint-disable-line react-hooks/exhaustive-deps

  // Pas de défilement de la page derrière une fenêtre ouverte.
  const modal = !!a.current || a.cmdOpen || a.helpOpen;
  useEffect(() => {
    document.documentElement.classList.toggle("locked", modal);
  }, [modal]);

  // Raccourcis globaux
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); a.setCmdOpen(!a.cmdOpen); return; }
      if (a.cmdOpen) { if (e.key === "Escape") a.setCmdOpen(false); return; }
      if (e.key === "Escape") {
        if (a.helpOpen) a.setHelpOpen(false);
        else if (a.current) a.openIcon(null);
        else if (typing) (e.target as HTMLElement).blur();
        return;
      }
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "/") { e.preventDefault(); const q = document.getElementById("q"); q?.focus(); q?.scrollIntoView({ block: "center" }); }
      else if (e.key === "?") a.setHelpOpen(true);
      else if (e.key.toLowerCase() === "t") a.setMode(a.mode === "dark" ? "light" : "dark");
    };
    addEventListener("keydown", f);
    return () => removeEventListener("keydown", f);
  });

  return (
    <>
      {/* Quand une fenêtre est ouverte, la page derrière devient inerte : le focus clavier y reste enfermé. */}
      <div {...inert(modal)}>
      {PAGE === "news" ? <>
        <Nav />
        <main className="wrap"><Changelog /></main>
      </> : <>
        <a className="skip" href="#icones">{a.tt("Aller aux icônes", "Skip to icons")}</a>
        <Nav />
        <Hero />
        <Marquee />
        <main className="wrap">
          <Library />
          <Studio />
          <Showcase />
          <Usage />
          <Brand />
          <IdeaBoundary><IdeaBox /></IdeaBoundary>
          <Manifesto />
        </main>
      </>}
      <Footer />
      <Tray />
      <ToTop />
      </div>
      <Drawer />
      <CommandPalette />
      <Help />
      <Toast />
    </>
  );
}
