import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { first } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CartService {

    private cartItems: any[] = [];
    private cartSubTotal!: number;
    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }


    addToCart(product: any) {
        this.initCartItems();
        const existingProduct = this.cartItems.find(({ id }) => id === product.id);


        if (existingProduct) {
            existingProduct.quantity += 1;
            if (product.isOnSale) {
                const price = product.priceAfterSale;
                existingProduct.total = price * existingProduct.quantity;

            }
            else {
                const price = product.priceBeforeSale
                existingProduct.total = price * existingProduct.quantity

            }            
        }
        else {
            if (product.isOnSale) {
                const price = product.priceAfterSale;
                this.cartItems.push({ ...product, quantity: 1, total: price});

            }
            else {
                const price = product.priceBeforeSale
                this.cartItems.push({ ...product, quantity: 1, total: price });


            }            
        }

        return this.updateCart(this.cartItems);
    }
    initCartItems() {
        this.getCartItems().pipe(first()).subscribe(items => this.cartItems = items);

    }
    updateCart(cartItems: any[]) {
        return this.http.post(`${environment.apiUrl}/cart/add`, this.cartItems);
    }
    getCartItems() {
        return this.http.get<any[]>(`${environment.apiUrl}/cart`);
    }

    deleteCartItem(item: any) {
        this.initCartItems();
        this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
        return this.updateCart(this.cartItems);
    }

    updateItemQuantity(item: any, quantity: number) {
        this.initCartItems();
        item = this.cartItems.find((i) => i.id === item.id);
        if (item) {
            item.quantity = quantity;
        }
        console.log(this.cartItems);
        return this.calculateItemTotal(item);
    }

    calculateItemTotal(item: any) {
        const itemToUpdate = this.cartItems.find(({ id }) => id === item.id);
        if (itemToUpdate) {
            itemToUpdate.quantity = item.quantity;
            if (item.isOnSale) {
                itemToUpdate.total = item.priceAfterSale * item.quantity;
            }
            else {
                itemToUpdate.total = item.priceBeforeSale * item.quantity;

            }
        }
        return this.updateCart(this.cartItems);

    }

    calculateCartSubTotal() {
        this.initCartItems();

        return this.cartItems.reduce((acc, item) => {
            if (item.isOnSale) {
                return acc + item.priceAfterSale * item.quantity;
            }
            else {
                return acc + item.priceBeforeSale * item.quantity;

            }

        }, 0)
    }

    storeCheckoutInfo(checkoutObject:any)
    {
        return this.http.post(`${environment.apiUrl}/cart/proceedCheckout`, checkoutObject);

    }
}