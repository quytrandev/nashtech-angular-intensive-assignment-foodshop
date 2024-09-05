import { HttpRequest, HttpResponse, HttpEvent, HttpHandlerFn, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import productList from './assets/products.json';
import { inject } from '@angular/core';
import { AccountService } from '../services/account.service';

const cartLocalStorageKey = 'quytranfood-cart';
const checkoutLocalStorageKey = 'quytranfood-cart-checkout';

export function CartFakeBackendInterceptor(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    const accountService = inject(AccountService);
    const userEmail = accountService.userValue?.email;
    let cartItems: any[] = [];
    let checkoutObject: any = {};
    return handleRoute();

    function handleRoute() {
        switch (true) {
            case url.endsWith('/cart') && method === 'GET':
                return getCartItems();
            case url.endsWith('/cart/add') && method === 'POST':
                return addToCart();
            case url.endsWith('/cart/proceedCheckout') && method === 'POST':
                return storeCheckoutInfo();
            case url.endsWith('/checkout') && method === 'GET':
                return getCheckoutInfo();

            default:
                // pass through any requests not handled above
                return next(request);
        }
    }

    // route functions
    function getCartItems() {
        if (userEmail) {
            const userCartItems = JSON.parse(window.localStorage.getItem(cartLocalStorageKey + userEmail) || '[]');
            const previousCartItems = JSON.parse(window.localStorage.getItem(cartLocalStorageKey) || '[]');

            if (userCartItems.length == 0 && previousCartItems.length>0)
            {
                //window.localStorage.removeItem(cartLocalStorageKey);
                window.localStorage.setItem(cartLocalStorageKey + userEmail, JSON.stringify(previousCartItems));

                return ok(previousCartItems)
            }

            return ok(userCartItems);

        }
        else {
            const jsonObject = JSON.parse(window.localStorage.getItem(cartLocalStorageKey) || '[]');
            return ok(jsonObject);

        }
    }

    function addToCart() {
        cartItems = body;
        if (userEmail) {
            window.localStorage.setItem(cartLocalStorageKey + userEmail, JSON.stringify(cartItems));

        }
        else {
            window.localStorage.setItem(cartLocalStorageKey, JSON.stringify(cartItems));

        }
        return ok();
    }

    function storeCheckoutInfo() {
        checkoutObject = body;
        checkoutObject.email = userEmail;

        window.localStorage.setItem(checkoutLocalStorageKey + userEmail, JSON.stringify(checkoutObject));


        return ok();

    }

    function getCheckoutInfo() {
        const jsonObject = JSON.parse(window.localStorage.getItem(checkoutLocalStorageKey+userEmail) || '[]');
        return ok(jsonObject);
    }
    function ok(body?: any) {
        return of(new HttpResponse({ status: 200, body }));
    }

}