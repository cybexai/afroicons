import { InjectionToken, makeEnvironmentProviders, type EnvironmentProviders } from "@angular/core";
import { iconKey, type AfroiconNode } from "./types";

/** Registre des icônes utilisables par leur nom dans `<afroicon name="…">`. */
export const AFROICONS = new InjectionToken<ReadonlyMap<string, AfroiconNode>[]>("AFROICONS");

const toMap = (icons: Record<string, AfroiconNode> | readonly AfroiconNode[]) =>
  new Map((Array.isArray(icons) ? icons : Object.values(icons)).map((i) => [iconKey(i.name), i] as const));

/**
 * Déclare les icônes disponibles par leur nom.
 *
 * ```ts
 * import { provideAfroicons, Baobab, Wallet } from "afroicons-angular";
 * bootstrapApplication(App, { providers: [provideAfroicons({ Baobab, Wallet })] });
 * ```
 * Seules les icônes listées entrent dans votre bundle. `provideAfroicons(afroicons)` les déclare toutes.
 * Peut être appelé à plusieurs endroits (application, routes paresseuses) : les registres s'additionnent.
 */
export function provideAfroicons(icons: Record<string, AfroiconNode> | readonly AfroiconNode[]): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: AFROICONS, multi: true, useValue: toMap(icons) }]);
}
