import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, of, switchMap } from 'rxjs';
import { CoinflipActions } from './coinflip.actions';
import { CoinSide } from './coinflip.state';

// Stands in for a real backend call - e.g. a provably-fair coin flip API.
function tossCoinRemote(): Promise<CoinSide> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(new Error('The coin rolled under the table. Try again.'));
        return;
      }
      resolve(Math.random() < 0.5 ? 'heads' : 'tails');
    }, 800);
  });
}

@Injectable()
export class CoinflipEffects {
  private readonly actions$ = inject(Actions);

  // Whenever a `flip` action fires, perform the async side effect (the "API call"),
  // then translate its outcome back into a plain action for the reducer to handle.
  flip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoinflipActions.flip),
      switchMap(({ call, wager }) =>
        from(tossCoinRemote()).pipe(
          switchMap((result) =>
            of(CoinflipActions.flipSuccess({ call, result, wager })),
          ),
          catchError((error: Error) =>
            of(CoinflipActions.flipFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
