import { ICONS, REGNAME, catOf, type Icon } from "./constants";

export const norm = (s: string) => s.toLowerCase().replace(/œ/g, "oe").replace(/æ/g, "ae").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/['’-]/g, " ");

for (const i of ICONS) {
  const c = catOf(i.cat), r = REGNAME[i.region] ?? REGNAME.pan;
  i._hay = norm([i.id, i.fr, i.en, ...i.tags, c.fr, c.en, r.fr, r.en].join(" "));
  i._n = norm(i.fr + " " + i.en);
}

/** 0 = pas de correspondance ; plus le score est haut, plus la correspondance est forte. */
export function score(i: Icon, q: string) {
  if (!q.trim()) return 1;
  let sc = 0;
  for (const tk of norm(q).split(/\s+/).filter(Boolean)) {
    if (i._n!.split(" ").some((w) => w.startsWith(tk))) sc += 3;
    else if (i._hay!.split(" ").some((w) => w.startsWith(tk))) sc += 2;
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
