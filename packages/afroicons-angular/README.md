# afroicons-angular

Les icônes [Afroicons](https://afroicons.org) pour Angular (18 et plus) : un composant autonome `<afroicon>`, les **162 icônes culturelles** (au trait et remplies) et les **163 icônes d'interface** (noms Lucide, comme [`afroicons-ui`](https://www.npmjs.com/package/afroicons-ui)).

```bash
npm install afroicons-angular
```

## Application autonome (standalone)

Déclarez les icônes que vous utilisez, puis appelez-les par leur nom :

```ts
// main.ts
import { bootstrapApplication } from "@angular/platform-browser";
import { provideAfroicons, Baobab, Mototaxi, Wallet } from "afroicons-angular";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, {
  providers: [provideAfroicons({ Baobab, Mototaxi, Wallet })],
});
```

```ts
// app.component.ts
import { Component } from "@angular/core";
import { AfroiconComponent } from "afroicons-angular";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [AfroiconComponent],
  template: `
    <afroicon name="baobab" />
    <afroicon name="mototaxi" [size]="32" color="#C24E2A" title="Livraison" />
    <afroicon name="Wallet" [strokeWidth]="2" />
  `,
})
export class AppComponent {}
```

Seules les icônes déclarées entrent dans votre bundle. `provideAfroicons(afroicons)` les déclare toutes, au prix d'environ 80 Ko.

## Sans registre

Passez l'icône elle-même avec `[icon]` :

```ts
import { AfroiconComponent, Djembe } from "afroicons-angular";

@Component({
  standalone: true,
  imports: [AfroiconComponent],
  template: `<afroicon [icon]="djembe" [size]="24" />`,
})
export class DrumComponent { djembe = Djembe; }
```

## Avec un NgModule

Le composant est autonome : importez-le directement dans votre module.

```ts
import { NgModule } from "@angular/core";
import { AfroiconComponent, provideAfroicons, Baobab } from "afroicons-angular";

@NgModule({
  imports: [AfroiconComponent],
  providers: [provideAfroicons({ Baobab })],
})
export class SharedModule {}
```

## Propriétés

| Propriété | Défaut | Rôle |
| --- | --- | --- |
| `name` | | Id Afroicons (`baobab`, `mototaxi`) ou nom Lucide (`Wallet`, `CheckCircle2`). La casse, les tirets et les `_` sont ignorés. |
| `icon` | | L'icône importée, à la place de `name`. |
| `size` | `24` | Largeur et hauteur. |
| `color` | `currentColor` | Couleur du trait : par défaut, celle du texte. |
| `strokeWidth` | `1.75` | Épaisseur du trait. |
| `absoluteStrokeWidth` | `false` | Garde la même épaisseur visuelle quelle que soit la taille. |
| `title` | | Texte alternatif. Sans titre, l'icône est décorative (`aria-hidden`). |
| `variant` | `line` | `fill` pour la version remplie (icônes culturelles). Sans version remplie, l'icône reste au trait. |

Noms des icônes : l'id Afroicons en PascalCase pour les icônes culturelles (`Baobab`, `Peigneafro`, `Taxibrousse`), le nom Lucide pour les icônes d'interface (`Wallet`, `ShoppingCart`). La liste complète est sur [afroicons.org](https://afroicons.org).

Le SVG est construit élément par élément, sans `innerHTML`, et fonctionne avec le rendu serveur (SSR).

Licence MIT © THAFAM HOLDING SARL et les contributeurs d'Afroicons.
