import { Component } from '@angular/core';
import { DashboardStateService } from '../core/services/dashboard-state.service';
import { NotesWidgetComponent } from '../widgets/notes/notes.component';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, NotesWidgetComponent],
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private state: DashboardStateService) {}
}
