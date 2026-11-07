import { Component, signal } from '@angular/core';

/**
 * Placeholder weather widget.
 *
 * It demonstrates that a new widget type can be plugged into the dashboard
 * through `WIDGET_REGISTRY`. Replace the signal with a real data source
 * (for example an HTTP call) when the feature is implemented.
 */
@Component({
  selector: 'app-weather-widget',
  styleUrl: './weather.component.scss',
  templateUrl: './weather.component.html',
})
export class WeatherWidgetComponent {
  protected readonly temperature = signal<number | null>(null);
}
