// Accès optionnel aux capacités de la page hébergée sur Claude (téléchargements, base de données, utilisateur).
// Sur afroicons.org (site statique), ces capacités sont absentes : chaque appel renvoie null et l'interface s'adapte.

type ClaudeRuntime = { use: (name: string) => Promise<any> };
const runtime = (): ClaudeRuntime | null => {
  const c = (window as any).claude;
  return c && typeof c.use === "function" ? c : null;
};

export async function useCapability<T = any>(name: string): Promise<T | null> {
  const r = runtime();
  if (!r) return null;
  try { return (await r.use(name)) as T; } catch { return null; }
}

export const store = {
  get<T>(k: string, d: T): T {
    try { const v = localStorage.getItem("afroicons:" + k); return v == null ? d : (JSON.parse(v) as T); } catch { return d; }
  },
  set(k: string, v: unknown) {
    try { localStorage.setItem("afroicons:" + k, JSON.stringify(v)); } catch { /* stockage indisponible */ }
  },
};

/** Télécharge un fichier : via la capacité « downloads » si présente, sinon par un lien classique. */
export async function saveFile(downloads: any, filename: string, data: string | Blob): Promise<"saved" | "declined" | "error"> {
  if (downloads) {
    try { await downloads.save({ filename, data }); return "saved"; }
    catch (e: any) { return e?.code === "declined" ? "declined" : "error"; }
  }
  try {
    const blob = typeof data === "string" ? new Blob([data], { type: filename.endsWith(".svg") ? "image/svg+xml" : "text/plain" }) : data;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    return "saved";
  } catch { return "error"; }
}

/** Sur Claude, les téléchargements passent par la capacité ; sur le site statique, un lien suffit. */
export const isHosted = () => runtime() !== null;
