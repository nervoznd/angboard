import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { WidgetHostDirective } from '../core/directives/widget-host.directive';
import { DashboardStateService } from '../core/services/dashboard-state.service';

/**
 * Dashboard screen: renders the grid of widget cards and wires CDK drag & drop
 * to the dashboard state.
 */
@Component({
  imports: [WidgetHostDirective, CdkDrag, CdkDropList, CdkDragHandle],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  /** Public for the template, which reads `state.widgets()`. */
  protected readonly state = inject(DashboardStateService);

  /**
   * CDK reports the source and target indices after a drop. The visual order is
   * driven by the order of the `widgets` array, so it is enough to move the
   * item in the state.
   */
  onDrop(event: CdkDragDrop<unknown>): void {
    this.state.reorder(event.previousIndex, event.currentIndex);
  }
}
