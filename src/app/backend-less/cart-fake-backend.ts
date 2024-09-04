import { HttpRequest, HttpResponse, HttpEvent, HttpHandlerFn, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import productList from './assets/products.json';

const usersKey = 'quytranfood-cart';

export function CartFakeBackendInterceptor(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    let cartItems: any[] =[];
    return handleRoute();

    function handleRoute() {
        switch (true) {
            case url.endsWith('/cart') && method === 'GET':
                return getCartItems();
            case url.endsWith('/cart/add') && method === 'POST':
                return addToCart();
            default:
                // pass through any requests not handled above
                return next(request);
        }
    }

    // route functions
    function getCartItems() {
        const jsonObject = JSON.parse(window.localStorage.getItem(usersKey) || '[]');
        return ok(jsonObject);
    }

    function addToCart() {
        cartItems = body;
        window.localStorage.setItem(usersKey, JSON.stringify(cartItems));  
        return ok();
    }

    function ok(body?: any) {
        return of(new HttpResponse({ status: 200, body })); 
    }

}