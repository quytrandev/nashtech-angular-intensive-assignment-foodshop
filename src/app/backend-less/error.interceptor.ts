import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';

export function ErrorInterceptor(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const accountService = inject(AccountService);

    return next(request).pipe(catchError(err => {
        if ([401, 403].includes(err.status) && accountService.userValue) {
            // auto logout if 401 or 403 response returned from api
            accountService.logout();
        }

        const error = err.error?.message || err.statusText;
        console.error(err);
        return throwError(() => error);
    }))
}
