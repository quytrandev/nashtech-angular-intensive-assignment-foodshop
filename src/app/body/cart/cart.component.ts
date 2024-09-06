import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { AlertComponent } from "../../alert/alert.component";
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

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

  checkoutObject: any = {};
  cartSubTotal!: number;
  shippingFee: number = 0.00;
  discountObject!:any;

  discount: number = 0.00;
  discountOnSubTotal: number = 0.00;
  discountPercentage:string = "%";
  grandTotal!: number;
  invalidCouponError:string ="";

  constructor(private cartService: CartService, private formBuilder: FormBuilder, private alertService: AlertService,  private router: Router, private accountService: AccountService) {
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
      this.discountPercentage = "%";  
      this.invalidCouponError = "The entered coupon code is invalid, please try again";
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
    if(window.confirm('Are sure you want to delete this item ?')){
      this.cartService.deleteCartItem(item).pipe(first()).subscribe({});
      this.initCartItems();
    }
    
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

  storeCheckoutInfo()
  {
    if(this.accountService.userValue)
    {
      this.checkoutObject.subTotal = this.cartSubTotal;
      this.checkoutObject.delivery = this.shippingFee;
      this.checkoutObject.discount = this.discountOnSubTotal;
      this.checkoutObject.grandTotal = this.grandTotal
      this.checkoutObject.cartItems = this.cartItems;
      console.log(this.checkoutObject);
      this.cartService.storeCheckoutInfo(this.checkoutObject).pipe(first()).subscribe({
        next: () => {
          this.router.navigateByUrl('/checkout');
        },
        error: error => {
          if (error.hasOwnProperty("error")) {
            this.alertService.error(error.error.message);
          }
          else {
            this.alertService.error(error);
  
          }
        }
      });
    }
    else
    {
      this.router.navigateByUrl('/checkout');

    }
    
  }
}
