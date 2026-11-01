import { ICONS, REGNAME, catOf, type Icon } from "./constants";

export const norm = (s: string) => s.replace(/\uFE0F/g, "").toLowerCase().replace(/œ/g, "oe").replace(/æ/g, "ae").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/['’-]/g, " ");

for (const i of ICONS) {
  const c = catOf(i.cat), r = REGNAME[i.region] ?? REGNAME.pan;
  // Les emojis se trouvent aussi en tapant le caractère lui-même (🐘).
  i._hay = norm([i.id, i.fr, i.en, ...i.tags, c.fr, c.en, r.fr, r.en, i.char ? i.char.replace(/\uFE0F/g, "") : ""].join(" "));
  i._n = norm(i.fr + " " + i.en);
}

/** 0 = pas de correspondance ; plus le score est haut, plus la correspondance est forte. */
export function score(i: Icon, q: string) {
  if (!q.trim()) return 1;
  let sc = 0;
  for (const tk of norm(q).split(/\s+/).filter(Boolean)) {
    // Mot exact (nom, puis mots-clés) avant un début de mot : « serpent » trouve les serpents avant le serpentaire.
    const n = i._n!.split(" "), h = i._hay!.split(" ");
    if (n.includes(tk)) sc += 5;
    else if (h.includes(tk)) sc += 4;
    else if (n.some((w) => w.startsWith(tk))) sc += 3;
    else if (h.some((w) => w.startsWith(tk))) sc += 2;
    else if (i._hay!.includes(tk)) sc += 1;
    else return 0;
  }
  return sc;
}

export function rank(list: Icon[], q: string) {
  q = q.trim();
  if (!q) return list;
  return list.map((i) => [i, score(i, q)] as const).filter((x) => x[1] > 0).sort((a, b) => b[1] - a[1]).map((x) => x[0]);
}
