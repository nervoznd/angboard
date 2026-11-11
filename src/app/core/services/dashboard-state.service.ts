import { Injectable, signal } from '@angular/core';
import { WidgetConfig } from '../models/widget-config';

/**
 * Single source of truth for the dashboard layout.
 *
 * Layout is order-based: the position of a widget on the grid is defined by its
 * index in the `widgets` array. Drag & drop and `addWidget` only change that
 * order; no absolute coordinates are stored.
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
      size: { rows: 3, cols: 4 },
    },
    {
      id: '2',
      type: 'clock',
      title: 'Часы',
      size: { rows: 3, cols: 3 },
    },
    {
      id: '3',
      type: 'weather',
      title: 'Погода',
      size: { rows: 3, cols: 3 },
    },
    {
      id: '4',
      type: 'weather',
      title: 'Погода',
      size: { rows: 3, cols: 3 },
    },
    {
      id: '5',
      type: 'weather',
      title: 'Погода',
      size: { rows: 3, cols: 3 },
    },
    {
      id: '6',
      type: 'weather',
      title: 'Погода',
      size: { rows: 3, cols: 3 },
    },
    {
      id: '7',
      type: 'weather',
      title: 'Погода',
      size: { rows: 3, cols: 3 },
    },
  ]);

  /** Read-only view of the widgets, safe to consume from templates. */
  readonly widgets = this._widgets.asReadonly();

  /** Appends a widget to the end of the dashboard (and therefore the grid). */
  addWidget(widget: WidgetConfig): void {
    this._widgets.update((current) => [...current, widget]);
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
