import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
const usersKey = 'nastech-angular-food-shop-users';
let users: any[] = JSON.parse(localStorage.getItem(usersKey)!) || [];

export function AccountFakeBackendInterceptor(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return handleRoute();

    function handleRoute() {
        switch (true) {
            case url.endsWith('/users/authenticate') && method === 'POST':
                return authenticate();
            case url.endsWith('/users/register') && method === 'POST':
                return register();            
                
            default:
                // pass through any requests not handled above
                return next(request);
        }    
    }

    // route functions

    function authenticate() {
        const { email, password } = body;
        const user = users.find(x => x.email === email && x.password === password);
        if (!user) return error('Email or password is incorrect');
        return ok({
            ...basicDetails(user),
            token: 'fake-jwt-token'
        })
    }

    function register() {
        const user = body

        if (users.find(x => x.email === user.email)) {
            return error('Email "' + user.email + '" is already taken')
        }

        user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
        users.push(user);
        localStorage.setItem(usersKey, JSON.stringify(users));
        return ok();
    }

    // helper functions

    function ok(body?: any) {
        return of(new HttpResponse({ status: 200, body }))
            .pipe(delay(500)); // delay observable to simulate server api call
    }

    function error(message: string) {
        return throwError(() => ({ error: { message } }))
            .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }

    function unauthorized() {
        return throwError(() => ({ status: 401, error: { message: 'Unauthorized' } }))
            .pipe(materialize(), delay(500), dematerialize());
    }

    function basicDetails(user: any) {
        const { id, email, username } = user;
        return { id, email, username };
    }

    function isLoggedIn() {
        return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

}