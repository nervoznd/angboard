export interface WidgetConfig {
    id: string;
    type: 'notes' | 'weather' | 'clock';
    title: string;
    position: { row: number; col: number };
    size: { rows: number; cols: number };    
}