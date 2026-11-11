import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { CdkMenuModule } from '@angular/cdk/menu';
import { Component, inject } from '@angular/core';
import { WidgetHostDirective } from '../core/directives/widget-host.directive';
import { WIDGET_CATALOG } from '../core/models/widget-catalog';
import { WidgetType } from '../core/models/widget-config';
import { DashboardStateService } from '../core/services/dashboard-state.service';

/**
 * Dashboard screen: renders the grid of widget cards, offers a menu for adding
 * new widgets and wires CDK drag & drop to the dashboard state.
 */
@Component({
  imports: [WidgetHostDirective, CdkDrag, CdkDropList, CdkDragHandle, CdkMenuModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  /** Public for the template, which reads `state.widgets()`. */
  protected readonly state = inject(DashboardStateService);

  /** Widget types shown in the "Add widget" menu. */
  protected readonly widgetCatalog = WIDGET_CATALOG;

  /**
   * Creates a widget from the catalog defaults and appends it to the grid.
   *
   * CDK closes the menu automatically after a menu item is triggered, so no
   * extra "close" handling is required here.
   */
  addWidget(type: WidgetType): void {
    this.state.addWidgetOfType(type);
  }

  /**
   * CDK reports the source and target indices after a drop. The visual order is
   * driven by the order of the `widgets` array, so it is enough to move the
   * item in the state.
   */
  onDrop(event: CdkDragDrop<unknown>): void {
    this.state.reorder(event.previousIndex, event.currentIndex);
  }
}
