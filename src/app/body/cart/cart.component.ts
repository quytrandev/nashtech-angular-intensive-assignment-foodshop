import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { AlertComponent } from "../../alert/alert.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  formCountry!: FormGroup;
  formCoupon!: FormGroup;
  isCountrySubmitted = false;
  isCouponSubmitted = false;

  cartItems: any[] = [];
  private coupons: any[] = [
    { value: "", discount: 0 },
    { value: "NASHTECH", discount: 18 },
    { value: "QTFOOD", discount: 15 },
    { value: "ANGULARINTENSIVE", discount: 20 }
  ];
  countries: any[] =
    [
      { value: "", name: "Choose a country", shippingFee: 0.00 },
      { value: "uk", name: "United Kingdom", shippingFee: 15.50 },
      { value: "vn", name: "Vietnam", shippingFee: 7.99 },
      { value: "my", name: "Malaysia", shippingFee: 9.99 },
      { value: "usa", name: "America", shippingFee: 25.69 },
    ];
  cartSubTotal!: number;
  shippingFee: number = 0.00;
  discountObject!:any;

  discount: number = 0.00;
  discountOnSubTotal: number = 0.00;
  discountPercentage:string = "%";
  grandTotal!: number;

  constructor(private cartService: CartService, private formBuilder: FormBuilder, private alertService: AlertService) {
  }
  ngOnInit(): void {
    this.cartService.getCartItems().pipe(first()).subscribe(items => this.cartItems = items);
    this.formCountry = this.formBuilder.group({
      country: ['', Validators.required]
    });
    this.formCoupon = this.formBuilder.group({
      coupon: ['',Validators.required]
    });
    this.grandTotal = this.calculateCartSubTotal();
  }
  get formCountryControls() { return this.formCountry.controls; }

  get formCouponControls() { return this.formCoupon.controls; }


  onCountrySubmit() {
    this.isCountrySubmitted = true;

    if (this.formCountry.invalid) {     // stop here if form is invalid
      return;
    }

    const chosenCountry = this.formCountryControls.country.value;    
    this.shippingFee = this.countries.find(({ value }) => value == chosenCountry).shippingFee;
  }

  onCouponSubmit() {
    this.isCouponSubmitted = true;

    this.grandTotal = 0;
    if (this.formCoupon.invalid) {     // stop here if form is invalid
      return;
    }

    const appliedCoupon = this.formCouponControls.coupon.value;
     
    this.discountObject = this.coupons.find(({ value }) => value == appliedCoupon.trim());

    if (!this.discountObject) {
      this.discount = 0;
    }
    else 
    {
      this.discountPercentage = -this.discountObject.discount+"%";
      this.discount = this.discountObject.discount;
      this.discountOnSubTotal = this.discount *this.cartSubTotal/100;
    }
  }

  initCartItems() {
    this.cartService.getCartItems().pipe(first()).subscribe(items => this.cartItems = items);
  }

  deleteCartItem(item: any) {
    this.cartService.deleteCartItem(item).pipe(first()).subscribe({});
    this.initCartItems();
  }
  updateQuantity(item: any, event: any) {
    const quantity = event.target.value;
    this.cartService.updateItemQuantity(item, quantity).pipe(first()).subscribe({});
    this.initCartItems();

  }


  calculateCartSubTotal() {
    const item = this.cartService.calculateCartSubTotal();
    this.cartSubTotal = item;
    this.discountOnSubTotal = this.discount * this.cartSubTotal / 100 ;
    this.grandTotal = this.cartSubTotal + this.shippingFee - this.discountOnSubTotal;
    return item;
  }
}
