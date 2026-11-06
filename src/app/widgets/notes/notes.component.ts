import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-notes-widget',
  styleUrl: './notes.component.scss',
  templateUrl: './notes.component.html',
})
export class NotesWidgetComponent {
  notes: string[] = ['Первая заметка', 'Ещё одна заметка'];
  newNote = '';

  addNote() {
    if (!this.newNote.trim()) return;
    this.notes.push(this.newNote);
    this.newNote = '';
  }
}