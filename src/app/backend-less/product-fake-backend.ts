import { HttpRequest, HttpResponse, HttpEvent, HttpHandlerFn, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import productList from './assets/products.json';


export function ProductFakeBackendInterceptor(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    let products: any[];
    return handleRoute();

    function handleRoute() {
        switch (true) {
            case url.endsWith('/products') && method === 'GET':
                return getProducts();
            default:
                // pass through any requests not handled above
                return next(request);
        }
    }

    // route functions
    function getProducts() {
        products = productList.products.product;
        return ok(products.map(x => basicDetails(x)));        //return ok()
    }
    function ok(body?: any) {
        return of(new HttpResponse({ status: 200, body }))
            .pipe(delay(500)); // delay observable to simulate server api call
    }
    function basicDetails(product: any) {

        const { id, productName, priceBeforeSale, photoSrc, isOnSale, salePercentage, priceAfterSale } = product;
        return { id, productName, priceBeforeSale, photoSrc, isOnSale, salePercentage, priceAfterSale };
    }
}