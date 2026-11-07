import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root component. It only provides the router outlet; the active screen is
 * rendered by the matched route.
 */
@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
