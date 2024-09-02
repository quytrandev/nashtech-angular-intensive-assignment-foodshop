import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';


export function JwtInterceptor(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {

    // add auth header with jwt if user is logged in and request is to the api url
    const accountService = inject(AccountService);
    const user = accountService.userValue;
    const isLoggedIn = user && user.token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${user.token}`
            }
        });
    }

    return next(request);
}
