import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoinflipState } from './coinflip.state';

export const selectCoinflipState = createFeatureSelector<CoinflipState>('coinflip');

export const selectBalance = createSelector(
  selectCoinflipState,
  (state) => state.balance,
);

export const selectFlipping = createSelector(
  selectCoinflipState,
  (state) => state.flipping,
);

export const selectError = createSelector(
  selectCoinflipState,
  (state) => state.error,
);

export const selectHistory = createSelector(
  selectCoinflipState,
  (state) => state.history,
);

export const selectLastFive = createSelector(
  selectHistory,
  (history) => history.slice(0, 5),
);

export const selectWinRate = createSelector(selectHistory, (history) => {
  if (history.length === 0) return 0;
  const wins = history.filter((flip) => flip.won).length;
  return Math.round((wins / history.length) * 100);
});

// Current win/lose streak - derived by walking history from most recent until it breaks.
export const selectStreak = createSelector(selectHistory, (history) => {
  if (history.length === 0) return 0;
  const isWinning = history[0].won;
  let streak = 0;
  for (const flip of history) {
    if (flip.won !== isWinning) break;
    streak++;
  }
  return isWinning ? streak : -streak;
});
