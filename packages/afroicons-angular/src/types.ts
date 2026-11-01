/** Un élément SVG : [balise, attributs] ou [balise, attributs, enfants] (groupes, masques). */
export type AfroiconElement = readonly [string, Readonly<Record<string, string>>, (readonly AfroiconElement[])?];

/** Une icône : son nom et ses éléments SVG, dessinés sur une grille 24 × 24. `fill` : sa version remplie, si elle existe. */
export interface AfroiconNode {
  readonly name: string;
  readonly nodes: readonly AfroiconElement[];
  readonly fill?: readonly AfroiconElement[];
  /** Emojis : le dessin utilise la peau, réglable avec l'entrée `tone`. */
  readonly tone?: true;
}

/** Teinte de peau Unicode d'un emoji (🏻 à 🏿). */
export type AfroiconTone = "light" | "medium-light" | "medium" | "medium-dark" | "dark";
/** [peau, ombre] de chaque teinte ; les dessins utilisent « medium-dark ». */
export const AFROICON_TONES: Readonly<Record<AfroiconTone, readonly [string, string]>> = {light:["#F3D0B5","#DDAE8E"],"medium-light":["#E2AE84","#C78F62"],medium:["#C08354","#A0663B"],"medium-dark":["#8D5A3B","#6F4429"],dark:["#5A3824","#3F2617"]};

/** Style de rendu : au trait, ou rempli. */
export type AfroiconVariant = "line" | "fill";

/** Clé de recherche : « Check-Circle-2 », « check_circle_2 » et « CheckCircle2 » désignent la même icône. */
export const iconKey = (name: string) => name.replace(/[-_\s]/g, "").toLowerCase();
