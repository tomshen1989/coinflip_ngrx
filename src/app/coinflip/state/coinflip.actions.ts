import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CoinSide } from './coinflip.state';

export const CoinflipActions = createActionGroup({
  source: 'Coinflip',
  events: {
    // User calls heads or tails and places their bet
    Flip: props<{ call: CoinSide; wager: number }>(),

    // The "coin" (backend/effect) landed on a side
    'Flip Success': props<{ call: CoinSide; result: CoinSide; wager: number }>(),

    // The flip service failed (e.g. simulated network error)
    'Flip Failure': props<{ error: string }>(),

    Reset: emptyProps(),
  },
});
