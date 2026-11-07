import { Component } from '@angular/core';
import { DashboardStateService } from '../core/services/dashboard-state.service';
import { WidgetHostDirective } from '../core/directives/widget-host.directive';
import { CdkDrag, CdkDropList, CdkDragHandle, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  imports: [WidgetHostDirective, CdkDrag, CdkDropList, CdkDragHandle],
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private state: DashboardStateService) {}

  onDrop(event: CdkDragDrop<unknown>) {
    this.state.reorder(event.previousIndex, event.currentIndex);
  }
}
