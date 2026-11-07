/**
 * Every widget type the dashboard knows how to render.
 *
 * Adding a new widget starts here: extend this union, create the standalone
 * component and register it in `WIDGET_REGISTRY`.
 */
export type WidgetType = 'notes' | 'weather' | 'clock';

/** Widget dimensions measured in dashboard grid cells. */
export interface WidgetSize {
  rows: number;
  cols: number;
}

/**
 * Logical position of a widget on the grid.
 *
 * The current layout is order-based: CSS Grid auto-places the cards and
 * drag & drop reorders the underlying array. `position` is intentionally kept
 * as a foundation for a future free-form placement mode, but it is not read by
 * the current layout code.
 */
export interface WidgetPosition {
  row: number;
  col: number;
}

/** Description of a single dashboard widget. */
export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  position: WidgetPosition;
  size: WidgetSize;
}
