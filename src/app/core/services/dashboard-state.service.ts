import { computed, Injectable, signal } from '@angular/core';
import { WidgetConfig } from '../models/widget-config';

@Injectable({ providedIn: 'root' })
export class DashboardStateService {
    widgets = signal<WidgetConfig[]>([
        {
            id: '1',
            type: 'notes',
            title: 'Мои заметки',
            position: { row: 0, col: 0},
            size: { rows: 3, cols: 4 },
        },
        {
            id: '2',
            type: 'clock',
            title: 'Часы',
            position: { row: 0, col: 4 },
            size: { rows: 3, cols: 3 },
        },
    ]);

    widgetsList = computed(() => this.widgets());

    addWidget(widget: WidgetConfig) {
        this.widgets.update(current => [...current, widget]);
    }

    updatePosition(id: string, position: { row: number; col: number }) {
        this.widgets.update(current =>
            current.map(w => (w.id === id ? { ...w, position } : w))
        );
    }
}
