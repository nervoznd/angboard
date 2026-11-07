import { Component } from '@angular/core';
import { DashboardStateService } from '../core/services/dashboard-state.service';
import { WidgetHostDirective } from '../core/directives/widget-host.directive';

@Component({
  imports: [WidgetHostDirective],
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private state: DashboardStateService) {}
}
