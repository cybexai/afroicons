// Drapeaux des scènes (outil de génération, pas chargé par le site) : les vrais drapeaux de la collection
// (src/flags.json), aux couleurs officielles, jamais recolorés par l'ambiance.
// flag(x, y, w, iso) : coin haut gauche (côté mât) en (x, y), largeur w, hauteur w·15/22.
// Sur le site, le drapeau suit le pays de l'ambiance (Douala → Cameroun, Dakar → Sénégal…) ou le pays choisi dans la fiche :
// le repère data-flag et les commentaires <!--f--> <!--/f--> encadrent le dessin à remplacer (voir applyLook()).
import { readFileSync } from "node:fs";

const FLAGS = JSON.parse(readFileSync(new URL("../../src/flags.json", import.meta.url), "utf8"));
export const FLAG_BODY = Object.fromEntries(FLAGS.filter((x) => x.iso).map((x) => [x.iso, x.body]));
const r = (n) => Math.round(n * 1000) / 1000;
export const flag = (x, y, w, iso = "CM") =>
  `<g data-flag="${iso}" transform="translate(${r(x)} ${r(y)}) scale(${r(w / 22)})"><!--f--><g transform="translate(-1 -4.5)">${FLAG_BODY[iso]}</g><!--/f--></g>`;
