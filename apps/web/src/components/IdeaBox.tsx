import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CATS, ICONS, REGNAME, byId, catOf } from "../lib/constants";
import { connectIdeas, type Idea, type IdeaBackend, type IdeaStatus, type Profile, type Snapshot } from "../lib/ideas";
import { norm } from "../lib/search";
import { useApp } from "../state";
import { ITrash, IUp, Svg, T } from "./ui";

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
    if (!be || ro) return a.toast(a.tt("Les propositions s'ouvrent sur la page publiée.", "Suggestions open on the published page."));
    const name = form.name.trim().slice(0, 60);
    if (!name) return;
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
    ? a.tt("La boîte à idées fonctionne sur la page publiée, pour les visiteurs connectés.", "The idea box works on the published page, for signed-in visitors.")
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
          <button className="btn p" type="submit" disabled={busy}><T k="if7" /></button>
          {note && <div className="inote">{note}</div>}
        </form>
        <div>
          <div className="ibar">
            <div className="seg">{(["top", "new", "done"] as const).map((o, j) => <button key={o} className={sort === o ? "on" : ""} onClick={() => setSort(o)}><T k={"io" + (j + 1)} /></button>)}</div>
            <span className="stats">{a.lang === "en" ? `${all.length} ideas · ${voters} voters` : `${all.length} idée${all.length > 1 ? "s" : ""} · ${voters} votant${voters > 1 ? "s" : ""}`}</span>
          </div>
          <div className="ilist">
            {!shown.length && <div className="empty" style={{ padding: "50px 0" }}><div className="big">{a.tt("Pas encore d'idée ici", "No ideas here yet")}</div>{a.tt("Soyez le premier à en proposer une.", "Be the first to suggest one.")}</div>}
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
        </div>
      </div>
    </section>
  );
}
