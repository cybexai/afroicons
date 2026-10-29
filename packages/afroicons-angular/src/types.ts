/** Une icône : son nom et ses éléments SVG ([balise, attributs]), dessinés sur une grille 24 × 24. */
export interface AfroiconNode {
  readonly name: string;
  readonly nodes: readonly (readonly [string, Readonly<Record<string, string>>])[];
}

/** Clé de recherche : « Check-Circle-2 », « check_circle_2 » et « CheckCircle2 » désignent la même icône. */
export const iconKey = (name: string) => name.replace(/[-_\s]/g, "").toLowerCase();
