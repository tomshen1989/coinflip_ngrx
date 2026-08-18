import { createReducer, on } from '@ngrx/store';
import { CoinflipActions } from './coinflip.actions';
import { CoinflipState, initialCoinflipState } from './coinflip.state';

export const coinflipReducer = createReducer(
  initialCoinflipState,

  // Flip is in flight: lock the UI, clear stale errors. No coin result yet — that's async.
  on(CoinflipActions.flip, (state): CoinflipState => ({
    ...state,
    flipping: true,
    error: null,
  })),

  // The coin landed. Pure math: settle the wager and append to history.
  on(CoinflipActions.flipSuccess, (state, { call, result, wager }): CoinflipState => {
    const won = call === result;
    return {
      ...state,
      flipping: false,
      balance: state.balance + (won ? wager : -wager),
      history: [
        { id: state.history.length + 1, call, result, won },
        ...state.history,
      ],
    };
  }),

  on(CoinflipActions.flipFailure, (state, { error }): CoinflipState => ({
    ...state,
    flipping: false,
    error,
  })),

  on(CoinflipActions.reset, (): CoinflipState => initialCoinflipState),
);
