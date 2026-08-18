import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Coinflip } from './coinflip/coinflip';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Coinflip],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('coinflip');
}
