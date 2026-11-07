import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  imports: [DatePipe],
  selector: 'app-clock-widget',
  styleUrl: './clock.component.scss',
  templateUrl: './clock.component.html',
})
export class ClockWidgetComponent implements OnInit, OnDestroy {
  now = signal(new Date());
  private timerId: ReturnType<typeof setInterval> | undefined;
  
  ngOnInit(): void {
    this.timerId = setInterval(() => this.now.set(new Date()), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }
}
