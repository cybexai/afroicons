import CHANGELOG from "../../../../CHANGELOG.md?raw";
import { useApp } from "../state";
import { T } from "./ui";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const inline = (t: string) => esc(t).replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="ul" href="$2">$1</a>');

/** Le petit sous-ensemble de Markdown utilisé par CHANGELOG.md : listes, sous-titres, gras, code, liens. */
function markdown(md: string) {
  let html = "", list = false;
  for (const line of md.split("\n")) {
    const li = line.match(/^\s*- (.*)/);
    if (li) { if (!list) { html += "<ul>"; list = true; } html += `<li>${inline(li[1])}</li>`; continue; }
    if (list) { html += "</ul>"; list = false; }
    const h = line.match(/^### (.*)/);
    if (h) html += `<h4>${inline(h[1])}</h4>`;
    else if (line.trim()) html += `<p>${inline(line)}</p>`;
  }
  return html + (list ? "</ul>" : "");
}

// Une entrée par version : « ## 0.5.0 — 30 octobre 2026 · style rempli… ».
const RELEASES = CHANGELOG.split(/^## /m).slice(1).map((chunk) => {
  const [head, ...rest] = chunk.split("\n");
  const [title, sub] = head.split(" · ");
  const [version, date] = title.split(" — ");
  return { version: version.trim(), date: date?.trim(), sub: sub?.trim(), html: markdown(rest.join("\n")) };
});

export function Changelog() {
  const a = useApp();
  return (
    <section id="nouveautes" className="news">
      <div className="shead"><div>
        <div className="kick">{a.tt("Journal des versions", "Release notes")}</div>
        <h2><T k="newsT" /></h2>
        <p>{a.tt("Chaque version d'Afroicons : nouvelles icônes, nouveaux paquets, corrections. Les paquets npm suivent les numéros de version ; le site, lui, se met à jour en continu.", "Every Afroicons release: new icons, new packages, fixes. The npm packages follow the version numbers; the website updates continuously.")}</p>
      </div></div>
      <ol className="rel">
        {RELEASES.map((r) => {
          const next = !/^\d/.test(r.version), cur = r.version === __AFROICONS_VERSION__;
          return (
            <li key={r.version} className={next ? "next" : cur ? "cur" : ""}>
              <div className="rh">
                <b>{next ? a.tt("À venir", "Coming next") : "v" + r.version}</b>
                {r.date && <span>{r.date}</span>}
                {cur && <em>{a.tt("Version actuelle", "Current version")}</em>}
                {next && <em>{a.tt("Déjà sur le site", "Already on the website")}</em>}
              </div>
              <div className="rb">
                {r.sub && <h3>{r.sub}</h3>}
                <div className="md" dangerouslySetInnerHTML={{ __html: r.html }} />
              </div>
            </li>
          );
        })}
      </ol>
      {a.lang === "en" && <p className="rnote">The release notes are written in French.</p>}
    </section>
  );
}
