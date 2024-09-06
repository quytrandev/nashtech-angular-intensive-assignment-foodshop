import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { first } from 'rxjs';
import { AlertService } from './alert.service';


@Injectable({ providedIn: 'root' })
export class CartService {
    userEmail: string = "";
    private cartItems: any[] = [];
    private wishlistItems: any[] = [];
    private cartSubTotal!: number;
    constructor(
        private http: HttpClient,
        private alertService: AlertService
    ) {

    }


    addToCart(product: any) {
        this.initCartItems();
        const existingProduct = this.cartItems.find(({ id }) => id === product.id);
        this.existingProductLogic(existingProduct,product,this.cartItems);
        return this.updateCart(this.cartItems);
    }

    existingProductLogic(existingProduct:any, product:any, itemsArray:any[])
    {
        if (existingProduct) 
        {
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
                itemsArray.push({ ...product, quantity: 1, total: price });

            }
            else {
                const price = product.priceBeforeSale
                itemsArray.push({ ...product, quantity: 1, total: price });
            }
        }
    }
    initCartItems() {
        this.getCartItems().pipe(first()).subscribe(items => this.cartItems = items);

    }
    updateCart(cartItems: any[]) {
        return this.http.post(`${environment.apiUrl}/cart/add`, cartItems);
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

    storeCheckoutInfo(checkoutObject: any) {
        return this.http.post(`${environment.apiUrl}/cart/proceedCheckout`, checkoutObject);

    }

    storeOrderDetails(checkoutObject: any) {
        return this.http.post(`${environment.apiUrl}/checkout/orderDetails`, checkoutObject);

    }
    getCheckoutInfo() {
        return this.http.get<any>(`${environment.apiUrl}/checkout`);

    }

    getOrderDetails() {
        return this.http.get<any>(`${environment.apiUrl}/order`);

    }
    clearCart() {
        return this.http.delete(`${environment.apiUrl}/cart/clear`);
    }

    getWishlistItems() {
        return this.http.get<any>(`${environment.apiUrl}/wishlist`);

    }
    addToWishlist(product: any) {
        this.getWishlistItems().pipe(first()).subscribe(products => this.wishlistItems = products);
        //
        const existingProduct = this.wishlistItems.find(({ id }) => id === product.id);
        this.existingProductLogic(existingProduct,product,this.wishlistItems);

        return this.updateWishlist(this.wishlistItems);
    }

    moveWishlistItemToCart(product: any) {
        //cart process
        this.initCartItems();
        const existingProduct = this.cartItems.find(({ id }) => id === product.id);
        this.existingProductLogic(existingProduct,product,this.cartItems);
        this.updateCart(this.cartItems).pipe(first()).subscribe();
        //wishlist process
        this.wishlistItems = this.wishlistItems.filter((i) => i.id !== product.id);
        return this.updateWishlist(this.wishlistItems);

    }

    deleteWishlistItem(product: any) {
        this.getWishlistItems().pipe(first()).subscribe(products => this.wishlistItems = products);
        this.wishlistItems = this.wishlistItems.filter((i) => i.id !== product.id);
        return this.updateWishlist(this.wishlistItems);
    }
    updateWishlist(wishlistItems: any) {
        return this.http.post(`${environment.apiUrl}/wishlist/add`, wishlistItems);

    }
}