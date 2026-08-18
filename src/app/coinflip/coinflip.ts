import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoinflipActions } from './state/coinflip.actions';
import { CoinSide } from './state/coinflip.state';
import {
  selectBalance,
  selectError,
  selectFlipping,
  selectLastFive,
  selectStreak,
  selectWinRate,
} from './state/coinflip.selectors';

@Component({
  selector: 'app-coinflip',
  imports: [],
  templateUrl: './coinflip.html',
  styleUrl: './coinflip.scss',
})
export class Coinflip {
  private readonly store = inject(Store);

  protected readonly wager = signal(10);

  protected readonly balance = this.store.selectSignal(selectBalance);
  protected readonly flipping = this.store.selectSignal(selectFlipping);
  protected readonly error = this.store.selectSignal(selectError);
  protected readonly lastFive = this.store.selectSignal(selectLastFive);
  protected readonly winRate = this.store.selectSignal(selectWinRate);
  protected readonly streak = this.store.selectSignal(selectStreak);

  call(call: CoinSide): void {
    this.store.dispatch(CoinflipActions.flip({ call, wager: this.wager() }));
  }

  reset(): void {
    this.store.dispatch(CoinflipActions.reset());
  }
}
