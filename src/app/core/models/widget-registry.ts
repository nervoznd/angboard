import { Type } from "@angular/core";
import { WidgetConfig } from "./widget-config";
import { NotesWidgetComponent } from "../../widgets/notes/notes.component";
import { ClockWidgetComponent } from "../../widgets/clock/clock.component";

export const WIDGET_REGISTRY: Record<WidgetConfig['type'], Type<unknown>> = {
    notes: NotesWidgetComponent,
    clock: ClockWidgetComponent,
    weather: NotesWidgetComponent,
};