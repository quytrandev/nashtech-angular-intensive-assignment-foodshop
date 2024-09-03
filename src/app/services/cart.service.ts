import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class CartService {

    private cartItems: any[] = [];
    constructor(
        private router: Router,
        private http: HttpClient
    ) 
    {

    }

    addToCart(product:any){
        const existingProduct = this.cartItems.find(({id}) => id === product.id);

        if(existingProduct)
        {
            existingProduct.quantity += 1;
        }
        else
        {
            this.cartItems.push({...product,quantity: 1});

        }

        //local storage logic here
    }

    getCartItems()
    {
        return this.cartItems;
    }

    deleteCartItem(item:any)
    {
        this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
    }

    updateItemQuantity(item:any, quantity:number)
    {
        item = this.cartItems.find((i) => i.id ===item.id);
        if(item)
        {
            item.quantity = quantity;
        }
    }

    calculateItemTotal(price:number, quantity: number)
    {
        return price * quantity;
    }
}