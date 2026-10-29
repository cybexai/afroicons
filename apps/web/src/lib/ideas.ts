// Boîte à idées : une interface, plusieurs backends possibles.
// - ClaudeDbBackend : stockage de la page hébergée sur Claude (actuel)
// - plus tard : un backend serverless (API Gateway + Lambda + DynamoDB) pour afroicons.org

import { useCapability } from "./platform";

export type Idea = { id: string; key: string; author: string; name: string; desc?: string; cat: string; region: string; at: number };
export type IdeaStatus = "new" | "planned" | "done";
export type Snapshot = { ideas: Idea[]; votes: Record<string, string[]>; status: Record<string, IdeaStatus> };
export type Profile = { name: string; avatarUrl: string };

export interface IdeaBackend {
  me: string | null;
  owner: boolean;
  readOnly: boolean;
  subscribe(cb: (s: Snapshot) => void): () => void;
  propose(item: Omit<Idea, "key" | "author">): Promise<void>;
  vote(key: string, on: boolean): Promise<void>;
  setStatus(key: string, s: IdeaStatus): Promise<void>;
  remove(idea: Idea): Promise<void>;
  profiles(ids: string[]): Promise<Record<string, Profile>>;
}

export async function connectIdeas(): Promise<IdeaBackend | null> {
  const [db, user] = await Promise.all([useCapability("db"), useCapability("user")]);
  if (!db) return null;
  const me: string | null = user ? await user.id() : null;
  const owner: boolean = user ? await user.isOwner() : false;
  const canWrite: boolean | null = user ? await user.can("data.write") : null;
  const snap: Snapshot = { ideas: [], votes: {}, status: {} };

  const b: IdeaBackend = {
    me, owner, readOnly: !me || canWrite === false,
    subscribe(cb) {
      const emit = () => cb({ ideas: [...snap.ideas], votes: { ...snap.votes }, status: { ...snap.status } });
      const u1 = db.collection("ideas").onSnapshot((s: any) => {
        snap.ideas = [];
        s.docs.forEach((d: any) => {
          const v = d.data() ?? {};
          (Array.isArray(v.items) ? v.items : []).forEach((it: any) => {
            // Données partagées = non fiables : on ne garde que des champs du bon type.
            if (!it || typeof it.name !== "string" || typeof it.id !== "string") return;
            snap.ideas.push({
              id: it.id.slice(0, 40), key: d.id + ":" + it.id, author: d.id, name: it.name.slice(0, 60),
              desc: typeof it.desc === "string" ? it.desc.slice(0, 200) : "",
              cat: typeof it.cat === "string" ? it.cat : "vie", region: typeof it.region === "string" ? it.region : "pan",
              at: typeof it.at === "number" ? it.at : 0,
            });
          });
        });
        emit();
      }, () => {});
      const u2 = db.collection("votes").onSnapshot((s: any) => {
        snap.votes = {};
        s.docs.forEach((d: any) => { const v = d.data() ?? {}; snap.votes[d.id] = Array.isArray(v.ids) ? v.ids.filter((x: unknown) => typeof x === "string") : []; });
        emit();
      }, () => {});
      const u3 = db.doc("board/status").onSnapshot((d: any) => {
        const m = (d.exists && d.data()?.map) || {};
        snap.status = Object.fromEntries(Object.entries(m).filter(([, v]) => v === "planned" || v === "done")) as Record<string, IdeaStatus>;
        emit();
      }, () => {});
      return () => { u1(); u2(); u3(); };
    },
    async propose(item) {
      const ref = db.doc("ideas/" + me);
      const d = await ref.get();
      const items = d.exists && Array.isArray(d.data().items) ? d.data().items : [];
      if (items.length >= 20) throw Object.assign(new Error("limit"), { code: "limit" });
      await ref.set({ items: [...items, item] });
      await b.vote(me + ":" + item.id, true);
    },
    async vote(key, on) {
      // On relit le document pour ne jamais écraser des votes pas encore reçus.
      const d = await db.doc("votes/" + me).get();
      const fresh = d.exists && Array.isArray(d.data()?.ids) ? d.data().ids : snap.votes[me!] ?? [];
      const cur = new Set<string>(fresh);
      on ? cur.add(key) : cur.delete(key);
      await db.doc("votes/" + me).set({ ids: [...cur] });
      snap.votes[me!] = [...cur];
    },
    async setStatus(key, s) {
      const m = { ...snap.status };
      if (s === "new") delete m[key]; else m[key] = s;
      await db.doc("board/status").set({ map: m });
    },
    async remove(i) {
      const ref = db.doc("ideas/" + i.author);
      const d = await ref.get();
      await ref.set({ items: ((d.exists && d.data().items) || []).filter((x: any) => x.id !== i.id) });
    },
    async profiles(ids) {
      if (!user) return {};
      try { return await user.profiles(ids); } catch { return {}; }
    },
  };
  return b;
}
