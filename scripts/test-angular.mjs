// Rend afroicons-angular dans une vraie application Angular (rendu serveur), comme le ferait un projet qui l'installe.
import "@angular/compiler"; // compilation JIT des déclarations partielles du paquet
import assert from "node:assert/strict";
import { Component, enableProdMode, provideExperimentalZonelessChangeDetection } from "@angular/core";
enableProdMode();
import { bootstrapApplication } from "@angular/platform-browser";
import { provideServerRendering, renderApplication } from "@angular/platform-server";
import * as ng from "../packages/afroicons-angular/dist/fesm2022/afroicons-angular.mjs";
import { names } from "../packages/afroicons/index.js";
import { afroiconNames } from "../packages/afroicons-ui/index.js";

const { AfroiconComponent, provideAfroicons, afroicons, Baobab, Wallet, Mototaxi } = ng;
assert.equal(Object.keys(afroicons).length, names.length + afroiconNames.length, "toutes les icônes exportées");

async function render(template, providers, extra = {}) {
  class Host { constructor() { Object.assign(this, extra); } }
  Component({ selector: "app-root", standalone: true, imports: [AfroiconComponent], template })(Host);
  const html = await renderApplication(
    (ctx) => bootstrapApplication(Host, { providers: [provideExperimentalZonelessChangeDetection(), provideServerRendering(), ...providers] }, ctx),
    { document: "<!doctype html><html><body><app-root></app-root></body></html>", url: "/" },
  );
  return html.match(/<app-root[^>]*>([\s\S]*)<\/app-root>/)[1];
}

// Par nom (registre), avec props
let h = await render(`<afroicon name="baobab" [size]="32" color="#C24E2A" [strokeWidth]="2" />`, [provideAfroicons({ Baobab })]);
assert.match(h, /<svg[^>]*width="32"[^>]*stroke="#C24E2A"[^>]*stroke-width="2"/, "props appliquées");
assert.match(h, /aria-hidden="true"/, "décorative sans titre");
assert.equal((h.match(/<path/g) || []).length, Baobab.nodes.filter(([t]) => t === "path").length, "tracés du baobab");

// Icône d'interface par son nom Lucide, écrit de plusieurs façons ; titre accessible
h = await render(`<afroicon name="wallet" title="Portefeuille" /><afroicon name="Check-Circle-2" />`, [provideAfroicons(afroicons)]);
assert.match(h, /role="img"[^>]*>|<title>Portefeuille<\/title>/, "titre accessible");
assert.equal((h.match(/<svg/g) || []).length, 2, "noms normalisés");

// Objet passé directement, sans registre ; épaisseur absolue
h = await render(`<afroicon [icon]="icon" [size]="48" [absoluteStrokeWidth]="true" [strokeWidth]="2" />`, [], { icon: Mototaxi });
assert.match(h, /stroke-width="1"/, "absoluteStrokeWidth");

// Chaque icône se rend
h = await render(`@for (i of all; track i.name) { <afroicon [icon]="i" /> }`, [], { all: Object.values(afroicons) });
assert.equal((h.match(/<svg/g) || []).length, Object.keys(afroicons).length, "toutes les icônes se rendent");

// Version remplie
h = await render(`<afroicon name="baobab" variant="fill" /><afroicon name="wallet" variant="fill" />`, [provideAfroicons({ Baobab, Wallet })]);
assert.match(h, /<mask id="afm-baobab"/, "version remplie (masque)");
assert.equal((h.match(/<svg/g) || []).length, 2, "sans version remplie, l'icône reste au trait");

// Nom inconnu : rien, sans planter
h = await render(`<afroicon name="inconnue" />`, [provideAfroicons({ Wallet })]);
assert.doesNotMatch(h, /<svg/);

console.log(`✔ afroicons-angular : ${Object.keys(afroicons).length} icônes rendues dans Angular`);
