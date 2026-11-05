// Histoire des pays : un fichier par pays (src/data/histoires/<ISO>.json), chargé à la demande.

/** Chaque texte est [français, anglais] ; une date de la frise, [date, texte, date, texte] en anglais. */
export interface Story {
  capitale?: [string, string]; langues?: [string, string]; independance?: [string, string]; fete?: [string, string];
  /** Repères sur mesure ([libellé, valeur], chacun en [français, anglais]), à la place des quatre ci-dessus : drapeaux du continent. */
  reperes?: [[string, string], [string, string]][];
  frise: [string, string, string, string][]; drapeau: [string, string];
}
/** Fichier d'histoire d'une icône : le code ISO pour un pays (drapeau ou carte), l'identifiant pour un drapeau du continent. */
export const storyKey = (i: { cat: string; iso?: string; id: string }) => (i.cat === "drapeaux" || i.cat === "cartes" ? i.iso ?? (i.cat === "drapeaux" ? i.id : undefined) : undefined);
const FILES = import.meta.glob<{ default: unknown }>("../data/histoires/*.json");
const cache: Record<string, Promise<Story | undefined>> = {};
// Un échec (hors ligne, version du site remplacée) n'est pas gardé en cache : on réessaiera à la prochaine ouverture.
export const loadStory = (key: string) => (cache[key] ??= FILES[`../data/histoires/${key}.json`]?.().then((m) => m.default as Story).catch(() => { delete cache[key]; return undefined; }) ?? Promise.resolve(undefined));
