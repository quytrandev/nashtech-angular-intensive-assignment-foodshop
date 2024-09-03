import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  formCountry!: FormGroup;
  cartItems: any[] = [];
  private coupons:any[] = ["NASHTECH","QTFOOD","ANGULARINTENSIVE"];
  countries: any[] = 
  [
    {value:"uk", name: "United Kingdom"},
    {value:"vn", name: "Vietnam"},
    {value:"my", name: "Malaysia"},
    {value:"usa", name: "America"},
  ];


  constructor(public cartService: CartService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.cartItems = this.getCartItems();
    this.formCountry = this.formBuilder.group({
      country:['']
    });
      
  }
  get formCountryControls() { return this.formCountry.controls; } 

  getCartItems() {
    return this.cartService.getCartItems();
  }
  deleteCartItem(item: any) {
    this.cartService.deleteCartItem(item);
    this.cartItems = this.getCartItems();
  }

  onCountrySubmit(event:any)
  {
    if (this.formCountry.invalid) {     // stop here if form is invalid
      return;
    }
     console.log(this.formCountryControls.country.value);
  }

  updateQuantity(item:any, event:any)
  {
    const quantity = event.target.value;
    this.cartService.updateItemQuantity(item, quantity);
  }

  calculateItemTotal(price:number, quantity:number){
    return this.cartService.calculateItemTotal(price,quantity);
  }
}
