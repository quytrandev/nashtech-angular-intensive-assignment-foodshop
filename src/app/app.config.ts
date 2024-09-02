import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AccountFakeBackendInterceptor } from './backend-less/account-fake-backend';
import { JwtInterceptor } from './backend-less/jwt.interceptor';
import { AccountService } from './services/account.service';
import { ErrorInterceptor } from './backend-less/error.interceptor';
import { ProductFakeBackendInterceptor } from './backend-less/product-fake-backend';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
      provideHttpClient(
        withInterceptors(
          [
            JwtInterceptor,
            ErrorInterceptor,
            AccountFakeBackendInterceptor,
            ProductFakeBackendInterceptor]),
      ),
      
    ]
      
};
