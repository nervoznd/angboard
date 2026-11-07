import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';

/**
 * Displays the current time, updated once per second.
 *
 * `now` is a signal, so assigning a new `Date` schedules change detection.
 * The application runs without zone.js (zoneless): it is the signal update,
 * not `setInterval` itself, that triggers the view refresh.
 */
@Component({
  imports: [DatePipe],
  selector: 'app-clock-widget',
  styleUrl: './clock.component.scss',
  templateUrl: './clock.component.html',
})
export class ClockWidgetComponent implements OnInit, OnDestroy {
  protected readonly now = signal(new Date());

  private timerId: ReturnType<typeof setInterval> | undefined;

  ngOnInit(): void {
    this.timerId = setInterval(() => this.now.set(new Date()), 1000);
  }

  ngOnDestroy(): void {
    // Always clear timers, otherwise they keep updating a destroyed component.
    clearInterval(this.timerId);
  }
}
