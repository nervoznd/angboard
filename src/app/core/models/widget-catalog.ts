import { WidgetSize, WidgetType } from './widget-config';

/**
 * User-facing description of a widget that can be added to the dashboard.
 *
 * This is deliberately separate from `WIDGET_REGISTRY`: the catalog describes
 * how a widget is presented and what defaults it gets, while the registry maps
 * the type to the component that renders it. Keeping them apart means UI
 * metadata (title, description, size) can change without touching the dynamic
 * component loading logic.
 */
export interface WidgetDefinition {
  type: WidgetType;
  title: string;
  description: string;
  size: WidgetSize;
}

/**
 * Catalog metadata keyed by widget type.
 *
 * The `Record<WidgetType, ...>` annotation makes the catalog exhaustive at
 * compile time: adding a new member to `WidgetType` without describing it here
 * becomes a TypeScript error. This mirrors `WIDGET_REGISTRY`.
 *
 * To add a widget, update this object together with `WidgetType` and
 * `WIDGET_REGISTRY`.
 */
const WIDGET_DEFINITIONS: Record<WidgetType, WidgetDefinition> = {
  notes: {
    type: 'notes',
    title: 'Заметки',
    description: 'Быстрые заметки прямо на дашборде',
    size: { rows: 3, cols: 4 },
  },
  clock: {
    type: 'clock',
    title: 'Часы',
    description: 'Текущее время с обновлением каждую секунду',
    size: { rows: 3, cols: 3 },
  },
  weather: {
    type: 'weather',
    title: 'Погода',
    description: 'Сводка погоды для выбранного города',
    size: { rows: 3, cols: 3 },
  },
};

/**
 * Ordered list of widgets offered by the "Add widget" menu.
 *
 * `Object.values` preserves the insertion order of string keys, so the order of
 * the definitions above is also the order shown to the user.
 */
export const WIDGET_CATALOG: readonly WidgetDefinition[] = Object.values(WIDGET_DEFINITIONS);

/** Returns catalog metadata for a widget type. */
export function getWidgetDefinition(type: WidgetType): WidgetDefinition {
  return WIDGET_DEFINITIONS[type];
}
