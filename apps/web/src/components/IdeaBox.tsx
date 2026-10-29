import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CATS, ICONS, REGNAME, REPO, byId, catOf } from "../lib/constants";
import { connectIdeas, type Idea, type IdeaBackend, type IdeaStatus, type Profile, type Snapshot } from "../lib/ideas";
import { norm } from "../lib/search";
import { useApp } from "../state";
import { ITrash, IUp, Svg, T } from "./ui";

/** Sans backend (afroicons.org), une proposition devient un ticket GitHub pré-rempli. */
const githubIssue = (f: { name: string; cat: string; region: string; desc: string }) => {
  const body = `**Nom (FR / EN) :** ${f.name}\n**Catégorie :** ${f.cat}\n**Région :** ${f.region}\n**À quoi elle servirait :** ${f.desc}\n**Références visuelles (photos libres de droits) :**\n`;
  return `${REPO}/issues/new?${new URLSearchParams({ title: `Nouvelle icône : ${f.name}`, labels: "nouvelle-icône", body })}`;
};

const ST: Record<IdeaStatus, [string, string]> = { new: ["Proposée", "Suggested"], planned: ["Planifiée", "Planned"], done: ["Dessinée", "Drawn"] };

/** Si la boîte à idées plante (données inattendues), le reste du site continue de fonctionner. */
export class IdeaBoundary extends Component<{ children: ReactNode }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() { return { err: true }; }
  render() {
    return this.state.err
      ? <section id="idees"><div className="empty"><div className="big">Boîte à idées indisponible</div>Idea box unavailable — please reload.</div></section>
      : this.props.children;
  }
}

export function IdeaBox() {
  const a = useApp();
  const [be, setBe] = useState<IdeaBackend | null>(null);
  const [ready, setReady] = useState(false);
  const [ro, setRo] = useState(true);
  const [snap, setSnap] = useState<Snapshot>({ ideas: [], votes: {}, status: {} });
  const [sort, setSort] = useState<"top" | "new" | "done">("top");
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", cat: "nature", region: "pan", desc: "" });
  const voting = useRef(false);

  useEffect(() => {
    let unsub = () => {};
    let cancelled = false;
    connectIdeas().then((b) => {
      if (cancelled) return;
      setReady(true);
      if (!b) return;
      setBe(b); setRo(b.readOnly);
      unsub = b.subscribe(setSnap);
    }).catch(() => { if (!cancelled) setReady(true); });
    return () => { cancelled = true; unsub(); };
  }, []);

  const counts = useMemo(() => { const c: Record<string, number> = {}; Object.values(snap.votes).forEach((ids) => ids.forEach((k) => (c[k] = (c[k] || 0) + 1))); return c; }, [snap.votes]);
  const mine = new Set((be?.me && snap.votes[be.me]) || []);
  const all = snap.ideas.map((i) => ({ ...i, n: counts[i.key] || 0, st: (snap.status[i.key] || "new") as IdeaStatus }));
  const voters = Object.values(snap.votes).filter((v) => v.length).length;
  const shown = all.filter((i) => (sort === "done" ? i.st === "done" : i.st !== "done"))
    .sort(sort === "new" ? (x, y) => (y.at || 0) - (x.at || 0) : (x, y) => y.n - x.n || (y.at || 0) - (x.at || 0));
  const authors = [...new Set(shown.map((i) => i.author))].join(",");
  useEffect(() => {
    if (!be || !authors) return;
    let stale = false;
    be.profiles(authors.split(",")).then((p) => { if (!stale) setProfiles((prev) => ({ ...prev, ...p })); });
    return () => { stale = true; };
  }, [be, authors]);

  const fail = (e: any) => {
    if (e?.code === "invalid_argument") setRo(true);
    else if (e?.code === "limit") a.toast(a.tt("20 propositions maximum par personne.", "20 suggestions max per person."));
    else if (e?.code === "quota_exceeded") a.toast(a.tt("La boîte à idées est pleine.", "The idea box is full."));
    else a.toast(a.tt("Échec de l'enregistrement, réessayez.", "Couldn't save, try again."));
  };
  const vote = async (i: Idea) => {
    if (!be || ro || voting.current) return;
    voting.current = true;
    try { await be.vote(i.key, !mine.has(i.key)); } catch (e) { fail(e); } finally { voting.current = false; }
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim().slice(0, 60);
    if (!name) return;
    if (!be) {
      if (ICONS.some((x) => norm(x.fr) === norm(name) || norm(x.en) === norm(name))) return a.toast(a.tt("Cette icône existe déjà.", "This icon already exists."));
      window.open(githubIssue({ ...form, name, desc: form.desc.trim() }), "_blank", "noopener");
      return;
    }
    if (ro) return a.toast(a.tt("Pour proposer, demandez un accès Contributeur.", "To suggest, ask for Contributor access."));
    if (snap.ideas.some((x) => norm(x.name) === norm(name)) || ICONS.some((x) => norm(x.fr) === norm(name) || norm(x.en) === norm(name)))
      return a.toast(a.tt("Cette icône existe déjà ou a déjà été proposée.", "This icon already exists or was suggested."));
    setBusy(true);
    try {
      await be.propose({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), name, cat: form.cat, region: form.region, desc: form.desc.trim().slice(0, 200), at: Date.now() });
      setForm({ name: "", cat: form.cat, region: form.region, desc: "" }); setSort("new");
      a.toast(a.tt("Merci ! Votre idée est en ligne.", "Thanks! Your idea is on the board."));
    } catch (err) { fail(err); } finally { setBusy(false); }
  };

  const note = !ready ? null : !be
    ? a.tt("Votre proposition s'ouvre sur GitHub, pré-remplie. Un compte GitHub gratuit suffit.", "Your suggestion opens on GitHub, pre-filled. A free GitHub account is all you need.")
    : ro ? a.tt("Vous pouvez consulter les idées. Pour proposer ou voter, demandez au propriétaire un accès Contributeur.", "You can browse the ideas. To suggest or vote, ask the owner for Contributor access.") : null;

  return (
    <section id="idees">
      <div className="shead"><div><div className="kick"><T k="k7" /></div><h2><T k="s7" /></h2><p><T k="s7p" /></p></div></div>
      <div className="ideas">
        <form className="iform" autoComplete="off" onSubmit={submit}>
          <h3><T k="if1" /></h3><p><T k="if2" /></p>
          <label><span><T k="if3" /></span><input maxLength={60} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={a.tt("Ex. Ndolè, lutteur, Gye Nyame…", "e.g. Ndolè, wrestler, Gye Nyame…")} /></label>
          <div className="two">
            <label><span><T k="if4" /></span><select value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })}>{CATS.filter((c) => c.id !== "all").map((c) => <option key={c.id} value={c.id}>{a.tt(c.fr, c.en)}</option>)}</select></label>
            <label><span><T k="if5" /></span><select value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })}>{Object.entries(REGNAME).map(([k, v]) => <option key={k} value={k}>{v[a.lang]}</option>)}</select></label>
          </div>
          <label><span><T k="if6" /></span><textarea rows={3} maxLength={200} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder={a.tt("Où l'utiliseriez-vous ?", "Where would you use it?")} /></label>
          <button className="btn p" type="submit" disabled={busy || (!!be && ro)}>{ready && !be ? a.tt("Proposer sur GitHub", "Suggest on GitHub") : <T k="if7" />}</button>
          {note && <div className="inote">{note}</div>}
        </form>
        {ready && !be ? <GitHubIdeas /> : <div>
          <div className="ibar">
            <div className="seg">{(["top", "new", "done"] as const).map((o, j) => <button key={o} className={sort === o ? "on" : ""} onClick={() => setSort(o)}><T k={"io" + (j + 1)} /></button>)}</div>
            <span className="stats">{a.lang === "en" ? `${all.length} ideas · ${voters} voters` : `${all.length} idée${all.length > 1 ? "s" : ""} · ${voters} votant${voters > 1 ? "s" : ""}`}</span>
          </div>
          <div className="ilist">
            {!shown.length && <div className="empty" style={{ padding: "50px 0" }}><div className="big">{a.tt("Pas encore d'idée ici", "No ideas here yet")}</div>{a.tt("Proposez la première !", "Suggest the first one!")}</div>}
            {shown.map((i) => {
              const cat = catOf(i.cat), pr = profiles[i.author];
              const author = i.author === "seed" ? "Afroicons" : pr?.name || a.tt("Quelqu'un", "Someone");
              return (
                <div key={i.key} className="idea">
                  <button className={"vote" + (mine.has(i.key) ? " on" : "")} disabled={ro} title={a.tt("Voter", "Vote")} onClick={() => vote(i)}><IUp s={18} w={2.6} /><span>{i.n}</span></button>
                  <div>
                    <h4>{i.name}</h4>
                    {i.desc && <p>{i.desc}</p>}
                    <div className="meta">
                      {byId[cat.ic] && <Svg i={byId[cat.ic]} o={{ s: 15, w: 2 }} />}<span>{a.tt(cat.fr, cat.en)}</span>·<span>{(REGNAME[i.region] ?? REGNAME.pan)[a.lang]}</span>·
                      {pr?.avatarUrl && i.author !== "seed" && <img alt="" src={pr.avatarUrl} />}<span>{author}</span>
                      <span className={"st " + i.st}>{(ST[i.st] ?? ST.new)[a.lang === "en" ? 1 : 0]}</span>
                    </div>
                  </div>
                  <div className="iadm">
                    {be?.owner && <select value={i.st} onChange={async (e) => { try { await be.setStatus(i.key, e.target.value as IdeaStatus); a.toast(a.tt("Statut mis à jour", "Status updated")); } catch (err) { fail(err); } }}>
                      {(Object.keys(ST) as IdeaStatus[]).map((k) => <option key={k} value={k}>{ST[k][a.lang === "en" ? 1 : 0]}</option>)}
                    </select>}
                    {be && (be.owner || i.author === be.me) && <button title={a.tt("Supprimer", "Delete")} onClick={async () => { try { await be.remove(i); a.toast(a.tt("Idée supprimée", "Idea deleted")); } catch (err) { fail(err); } }}><ITrash s={15} /></button>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>}
      </div>
    </section>
  );
}

/* ---------------- Propositions publiées sur GitHub (site statique) ---------------- */
type GhIdea = { n: number; name: string; url: string; votes: number; comments: number; at: number; cat: string; region: string; st: IdeaStatus; who: string; avatar: string };
const GH_API = REPO.replace("https://github.com/", "https://api.github.com/repos/") + "/issues?state=all&per_page=100";
const PREFIX = /^nouvelle icône\s*:\s*/i;

export async function loadGithubIdeas(): Promise<GhIdea[]> {
  try { const c = JSON.parse(sessionStorage.getItem("afroicons:gh") || "null"); if (c && Date.now() - c.t < 10 * 60e3) return c.v; } catch { /* rien */ }
  const r = await fetch(GH_API, { headers: { Accept: "application/vnd.github+json" } });
  if (!r.ok) throw new Error("github " + r.status);
  const raw: any[] = await r.json();
  const v: GhIdea[] = raw.filter((x) => !x.pull_request && typeof x.title === "string" && PREFIX.test(x.title) && !(x.state === "closed" && x.state_reason === "not_planned")).map((x) => {
    const body = typeof x.body === "string" ? x.body : "";
    const field = (k: string) => (body.match(new RegExp("\\*\\*" + k + " :\\*\\*\\s*([a-z]+)", "i"))?.[1] ?? "").toLowerCase();
    const labels: string[] = (x.labels ?? []).map((l: any) => String(l?.name ?? "").toLowerCase());
    const st: IdeaStatus = x.state === "closed" ? "done" : labels.some((l) => l.startsWith("planifi")) ? "planned" : "new";
    return { n: x.number, name: x.title.replace(PREFIX, "").slice(0, 60), url: x.html_url, votes: x.reactions?.["+1"] ?? 0, comments: x.comments ?? 0, at: Date.parse(x.created_at) || 0, cat: field("Catégorie"), region: field("Région"), st, who: x.user?.login ?? "", avatar: x.user?.avatar_url ?? "" };
  });
  try { sessionStorage.setItem("afroicons:gh", JSON.stringify({ t: Date.now(), v })); } catch { /* rien */ }
  return v;
}

function GitHubIdeas() {
  const a = useApp();
  const [items, setItems] = useState<GhIdea[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [sort, setSort] = useState<"top" | "new" | "done">("top");
  useEffect(() => { let off = false; loadGithubIdeas().then((v) => !off && setItems(v)).catch(() => !off && setFailed(true)); return () => { off = true; }; }, []);

  const steps = (
    <ol className="isteps">
      {[
        [a.tt("Proposez", "Suggest"), a.tt("Remplissez le formulaire : la proposition s'ouvre sur GitHub, déjà rédigée.", "Fill in the form: the suggestion opens on GitHub, already written.")],
        [a.tt("Votez", "Vote"), a.tt("Un 👍 sur une proposition compte comme un vote.", "A 👍 on a suggestion counts as a vote.")],
        [a.tt("On dessine", "We draw"), a.tt("Les plus demandées entrent dans la prochaine version.", "The most wanted make it into the next release.")],
      ].map(([t, d], k) => <li key={k}><b><span>{k + 1}</span>{t}</b><p>{d}</p></li>)}
    </ol>
  );
  if (failed || (items && !items.length)) return (
    <div className="ighost">
      {steps}
      <p className="inote">{failed
        ? a.tt("Les propositions n'ont pas pu être chargées depuis GitHub.", "Suggestions couldn't be loaded from GitHub.")
        : a.tt("Aucune proposition pour l'instant : la vôtre sera la première.", "No suggestions yet: yours will be the first.")}{" "}
        <a className="ul" href={`${REPO}/issues`} target="_blank" rel="noopener">{a.tt("Voir sur GitHub", "View on GitHub")}</a></p>
    </div>
  );
  if (!items) return <div className="ilist" aria-busy="true">{[0, 1, 2].map((k) => <div key={k} className="idea skel" />)}</div>;

  const voters = items.reduce((s, i) => s + i.votes, 0);
  const shown = items.filter((i) => (sort === "done" ? i.st === "done" : i.st !== "done"))
    .sort(sort === "new" ? (x, y) => y.at - x.at : (x, y) => y.votes - x.votes || y.at - x.at);
  return (
    <div>
      <div className="ibar">
        <div className="seg">{(["top", "new", "done"] as const).map((o, j) => <button key={o} className={sort === o ? "on" : ""} onClick={() => setSort(o)}><T k={"io" + (j + 1)} /></button>)}</div>
        <span className="stats">{a.lang === "en" ? `${items.length} ideas · ${voters} votes` : `${items.length} idée${items.length > 1 ? "s" : ""} · ${voters} vote${voters > 1 ? "s" : ""}`}</span>
      </div>
      <div className="ilist">
        {!shown.length && <div className="empty" style={{ padding: "40px 0" }}><div className="big">{sort === "done" ? a.tt("Rien de dessiné pour l'instant", "Nothing drawn yet") : a.tt("Tout a été dessiné !", "Everything has been drawn!")}</div></div>}
        {shown.map((i) => {
          const cat = catOf(i.cat);
          return (
            <div key={i.n} className="idea">
              <a className="vote" href={i.url} target="_blank" rel="noopener" title={a.tt("Voter avec un 👍 sur GitHub", "Vote with a 👍 on GitHub")} aria-label={a.tt(`${i.votes} votes, voter sur GitHub`, `${i.votes} votes, vote on GitHub`)}><span aria-hidden="true">👍</span><span>{i.votes}</span></a>
              <div>
                <h4><a href={i.url} target="_blank" rel="noopener">{i.name}</a></h4>
                <div className="meta">
                  {cat.id !== "all" && byId[cat.ic] && <><Svg i={byId[cat.ic]} o={{ s: 15, w: 2 }} /><span>{a.tt(cat.fr, cat.en)}</span>·</>}
                  {REGNAME[i.region] && <><span>{REGNAME[i.region][a.lang]}</span>·</>}
                  {i.avatar && <img alt="" src={i.avatar + "&s=36"} />}<span>{i.who}</span>
                  {i.comments > 0 && <span>· 💬 {i.comments}</span>}
                  <span className={"st " + i.st}>{(ST[i.st] ?? ST.new)[a.lang === "en" ? 1 : 0]}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="imore"><a className="ul" href={`${REPO}/issues`} target="_blank" rel="noopener">{a.tt("Toutes les propositions sur GitHub", "All suggestions on GitHub")} →</a></p>
    </div>
  );
}
