import { Injectable, signal } from '@angular/core';
import { WidgetConfig } from '../models/widget-config';

/**
 * Single source of truth for the dashboard layout.
 *
 * State is exposed as a read-only signal and can only be changed through the
 * methods below. Every update returns a new array/object ("immutable update"),
 * which lets Angular detect the change by reference. This is especially
 * important in zoneless mode, where signals are what schedule change
 * detection.
 */
@Injectable({ providedIn: 'root' })
export class DashboardStateService {
  private readonly _widgets = signal<WidgetConfig[]>([
    {
      id: '1',
      type: 'notes',
      title: 'Мои заметки',
      position: { row: 0, col: 0 },
      size: { rows: 3, cols: 4 },
    },
    {
      id: '2',
      type: 'clock',
      title: 'Часы',
      position: { row: 0, col: 4 },
      size: { rows: 3, cols: 3 },
    },
    {
      id: '3',
      type: 'weather',
      title: 'Погода',
      position: { row: 0, col: 7 },
      size: { rows: 3, cols: 3 },
    },
  ]);

  /** Read-only view of the widgets, safe to consume from templates. */
  readonly widgets = this._widgets.asReadonly();

  /** Appends a widget to the end of the dashboard. */
  addWidget(widget: WidgetConfig): void {
    this._widgets.update((current) => [...current, widget]);
  }

  /**
   * Updates the logical position of a widget.
   *
   * Kept for a future free-form placement mode. The current layout is
   * order-based and does not read `position` yet.
   */
  updatePosition(id: string, position: WidgetConfig['position']): void {
    this._widgets.update((current) =>
      current.map((widget) => (widget.id === id ? { ...widget, position } : widget)),
    );
  }

  /**
   * Moves a widget within the list. Used by CDK drag & drop.
   *
   * The array is copied before splicing so the signal receives a new reference
   * and the previous state is never mutated.
   */
  reorder(previousIndex: number, currentIndex: number): void {
    if (previousIndex === currentIndex) {
      return;
    }

    this._widgets.update((current) => {
      const isOutOfRange =
        previousIndex < 0 ||
        previousIndex >= current.length ||
        currentIndex < 0 ||
        currentIndex >= current.length;

      if (isOutOfRange) {
        return current;
      }

      const next = [...current];
      const [moved] = next.splice(previousIndex, 1);
      next.splice(currentIndex, 0, moved);
      return next;
    });
  }
}
