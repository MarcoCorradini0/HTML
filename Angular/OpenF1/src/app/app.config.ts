import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),  // ⭐ Necessario per le animazioni PrimeNG
    providePrimeNG({           // ⭐ Configurazione PrimeNG
      theme: {
        preset: 'Aura'          // ⭐ Tema di default
      }
    }),
    provideHttpClient()        // ⭐ Necessario per HttpClient e API
  ]
};
