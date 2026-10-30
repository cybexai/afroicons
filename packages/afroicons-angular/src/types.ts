/** Un élément SVG : [balise, attributs] ou [balise, attributs, enfants] (groupes, masques). */
export type AfroiconElement = readonly [string, Readonly<Record<string, string>>, (readonly AfroiconElement[])?];

/** Une icône : son nom et ses éléments SVG, dessinés sur une grille 24 × 24. `fill` : sa version remplie, si elle existe. */
export interface AfroiconNode {
  readonly name: string;
  readonly nodes: readonly AfroiconElement[];
  readonly fill?: readonly AfroiconElement[];
}

/** Style de rendu : au trait, ou rempli. */
export type AfroiconVariant = "line" | "fill";

/** Clé de recherche : « Check-Circle-2 », « check_circle_2 » et « CheckCircle2 » désignent la même icône. */
export const iconKey = (name: string) => name.replace(/[-_\s]/g, "").toLowerCase();
