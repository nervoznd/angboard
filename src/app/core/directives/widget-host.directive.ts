import { Directive, effect, inject, input, ViewContainerRef } from '@angular/core';
import { WidgetConfig } from '../models/widget-config';
import { WIDGET_REGISTRY } from '../models/widget-registry';

/**
 * Hosts a widget component inside a dashboard card.
 *
 * The directive receives a `WidgetConfig`, resolves the matching component
 * class from `WIDGET_REGISTRY` and creates it programmatically in the
 * `ViewContainerRef` anchor.
 */
@Directive({
  selector: '[appWidgetHost]',
})
export class WidgetHostDirective {
  /** Required input: the widget description to render. */
  readonly widget = input.required<WidgetConfig>();

  private readonly viewContainerRef = inject(ViewContainerRef);

  constructor() {
    /**
     * `effect` re-runs whenever the `widget` input changes, because reading the
     * input inside the effect registers it as a dependency.
     *
     * `clear()` destroys the previously created component and removes its DOM
     * nodes. Without it, every re-run would stack a new widget on top of the
     * old one and leak component instances.
     */
    effect(() => {
      const widget = this.widget();
      const componentType = WIDGET_REGISTRY[widget.type];

      this.viewContainerRef.clear();

      if (!componentType) {
        console.warn(
          `[WidgetHostDirective] No component registered for widget type "${widget.type}".`,
        );
        return;
      }

      // Inputs can be passed to the created component through setInput, e.g.:
      // this.viewContainerRef.createComponent(componentType).setInput('config', widget);
      this.viewContainerRef.createComponent(componentType);
    });
  }
}
