import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { coinflipReducer } from './coinflip/state/coinflip.reducer';
import { CoinflipEffects } from './coinflip/state/coinflip.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({ coinflip: coinflipReducer }),
    provideEffects(CoinflipEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ]
};
