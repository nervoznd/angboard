import { Directive, effect, inject, input, ViewContainerRef } from '@angular/core';
import { WidgetConfig } from '../models/widget-config';
import { WIDGET_REGISTRY } from '../models/widget-registry';

@Directive({
  selector: '[appWidgetHost]',
})
export class WidgetHostDirective {
  widget = input.required<WidgetConfig>();
  private vcr = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      const widget = this.widget();
      const componentType = WIDGET_REGISTRY[widget.type];

      this.vcr.clear();
      if (componentType) {
        this.vcr.createComponent(componentType);
      }
    });
  }
}
