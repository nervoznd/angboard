import { Type } from '@angular/core';
import { ClockWidgetComponent } from '../../widgets/clock/clock.component';
import { NotesWidgetComponent } from '../../widgets/notes/notes.component';
import { WeatherWidgetComponent } from '../../widgets/weather/weather.component';
import { WidgetType } from './widget-config';

/**
 * Maps every widget type to the standalone component that renders it.
 *
 * `Record<WidgetType, ...>` keeps the mapping exhaustive at compile time:
 * adding a member to `WidgetType` without registering a component here becomes
 * a TypeScript error.
 *
 * To add a widget:
 *   1. add its type to `WidgetType` in `widget-config.ts`;
 *   2. create the standalone component;
 *   3. add the matching entry below.
 */
export const WIDGET_REGISTRY: Record<WidgetType, Type<unknown>> = {
  notes: NotesWidgetComponent,
  clock: ClockWidgetComponent,
  weather: WeatherWidgetComponent,
};
