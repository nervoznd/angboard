import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Simple notes widget.
 *
 * Notes are stored in a signal and updated immutably: `update` replaces the
 * array reference, which is what tells Angular (zoneless) to refresh the view.
 */
@Component({
  imports: [FormsModule],
  selector: 'app-notes-widget',
  styleUrl: './notes.component.scss',
  templateUrl: './notes.component.html',
})
export class NotesWidgetComponent {
  protected readonly notes = signal<string[]>(['Первая заметка', 'Ещё одна заметка']);
  protected newNote = '';

  addNote(): void {
    const text = this.newNote.trim();
    if (!text) {
      return;
    }

    this.notes.update((notes) => [...notes, text]);
    this.newNote = '';
  }
}
