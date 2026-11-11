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
 * Description of a single dashboard widget.
 *
 * The layout is order-based: CSS Grid auto-places the cards in the same order
 * as the `widgets` array, and drag & drop changes that order through
 * `DashboardStateService.reorder`. There is intentionally no stored position,
 * so the array remains the single source of truth.
 */
export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  size: WidgetSize;
}
