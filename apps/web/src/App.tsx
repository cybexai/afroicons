import { useEffect } from "react";
import { byId } from "./lib/constants";
import { useApp } from "./state";
import { Hero, Marquee, Nav } from "./components/Header";
import { Library } from "./components/Library";
import { CommandPalette, Drawer, Help, Toast, Tray } from "./components/Overlays";
import { Brand, Footer, Manifesto, Showcase, Studio, Usage } from "./components/Sections";
import { IdeaBox, IdeaBoundary } from "./components/IdeaBox";

export default function App() {
  const a = useApp();

  // Lien direct vers une icône : afroicons.org/#baobab
  useEffect(() => {
    const open = () => { const h = location.hash.slice(1); if (byId[h]) a.openIcon(h); };
    open();
    addEventListener("hashchange", open);
    return () => removeEventListener("hashchange", open);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      <Footer />
      <Tray />
      <Drawer />
      <CommandPalette />
      <Help />
      <Toast />
    </>
  );
}
