import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, inject, isDevMode, type OnChanges } from "@angular/core";
import { AFROICONS } from "./provide";
import { iconKey, type AfroiconNode } from "./types";

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Affiche une icône Afroicons.
 *
 * ```html
 * <afroicon name="baobab" />                       <!-- icône déclarée avec provideAfroicons() -->
 * <afroicon [icon]="Wallet" [size]="20" color="#C24E2A" />
 * <afroicon name="mototaxi" title="Livraison" />   <!-- title : icône annoncée aux lecteurs d'écran -->
 * ```
 * Le SVG est construit élément par élément (Renderer2), sans innerHTML.
 */
@Component({
  selector: "afroicon",
  standalone: true,
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: "display:inline-flex;line-height:0", "[class.afroicon]": "true" },
})
export class AfroiconComponent implements OnChanges {
  /** Nom de l'icône : id Afroicons (« baobab ») ou nom Lucide (« Wallet »). */
  @Input() name?: string;
  /** L'icône elle-même, importée depuis le paquet (prioritaire sur `name`). */
  @Input() icon?: AfroiconNode;
  @Input() size: number | string = 24;
  @Input() color = "currentColor";
  @Input() strokeWidth: number | string = 1.75;
  /** Garde la même épaisseur visuelle quelle que soit la taille. */
  @Input() absoluteStrokeWidth = false;
  /** Texte alternatif. Sans titre, l'icône est décorative (aria-hidden). */
  @Input() title?: string;

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly r = inject(Renderer2);
  private readonly registry = inject(AFROICONS, { optional: true }) ?? [];

  ngOnChanges(): void {
    const host = this.el.nativeElement;
    for (const c of Array.from(host.childNodes)) this.r.removeChild(host, c);
    const icon = this.icon ?? this.lookup(this.name);
    if (!icon) return;

    const sw = this.absoluteStrokeWidth ? (Number(this.strokeWidth) * 24) / Number(this.size) : this.strokeWidth;
    const svg = this.r.createElement("svg", SVG_NS);
    const attrs: Record<string, string> = {
      xmlns: SVG_NS, width: String(this.size), height: String(this.size), viewBox: "0 0 24 24", fill: "none",
      stroke: this.color, "stroke-width": String(sw), "stroke-linecap": "round", "stroke-linejoin": "round",
      class: "afroicon-" + iconKey(icon.name),
    };
    for (const [k, v] of Object.entries(attrs)) this.r.setAttribute(svg, k, v);
    if (this.title) {
      this.r.setAttribute(svg, "role", "img");
      const t = this.r.createElement("title", SVG_NS);
      this.r.appendChild(t, this.r.createText(this.title));
      this.r.appendChild(svg, t);
    } else this.r.setAttribute(svg, "aria-hidden", "true");
    for (const [tag, a] of icon.nodes) {
      const n = this.r.createElement(tag, SVG_NS);
      for (const [k, v] of Object.entries(a)) this.r.setAttribute(n, k, v);
      this.r.appendChild(svg, n);
    }
    this.r.appendChild(host, svg);
  }

  private lookup(name?: string): AfroiconNode | undefined {
    if (!name) return undefined;
    const k = iconKey(name);
    for (const m of this.registry) { const i = m.get(k); if (i) return i; }
    if (isDevMode()) console.warn(`afroicons-angular : icône « ${name} » introuvable. Importez-la et déclarez-la avec provideAfroicons({ … }), ou passez-la avec [icon].`);
    return undefined;
  }
}
