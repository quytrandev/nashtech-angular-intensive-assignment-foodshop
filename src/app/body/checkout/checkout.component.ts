import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  formCheckout!: FormGroup;
  submitted = false;
  taxFee!: number;
  taxFeeOnSubTotal: number = 0.00;
  tempGrandTotal: number = 0.00;
  tempDeliveryFee: number = 0.00;
  countries: any[] =
    [
      { value: "", name: "Choose a country", taxFee: 0.00, shippingFee: 0.00 },
      { value: "uk", name: "United Kingdom", taxFee: 11, shippingFee: 15.50 },
      { value: "vn", name: "Vietnam", taxFee: 10, shippingFee: 7.99 },
      { value: "my", name: "Malaysia", taxFee: 8, shippingFee: 9.99 },
      { value: "usa", name: "America", taxFee: 12.5, shippingFee: 25.69 },
    ];
  checkoutInfo: any;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private alertService: AlertService,
    private router: Router
  ) { }
  get formCheckoutControls() { return this.formCheckout.controls; }

  ngOnInit() {
    this.formCheckout = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      postcode: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      acceptTermConditions: [false, Validators.requiredTrue]
    });
    this.getCheckoutInfo();
    this.tempGrandTotal = this.checkoutInfo.grandTotal;    
    this.tempDeliveryFee = this.checkoutInfo.delivery;

  }
  onCheckoutSubmit() {
    this.submitted = true;
    if (this.formCheckout.invalid) {     // stop here if form is invalid
      return;
    }
    this.assignCheckoutInfo();
    this.cartService.storeOrderDetails(this.checkoutInfo).pipe(first()).subscribe({
      next: () => {
        this.router.navigateByUrl('/order');
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
    this.cartService.clearCart().pipe(first()).subscribe({});
  }

  assignCheckoutInfo()
  {
    this.checkoutInfo.firstName = this.formCheckoutControls.firstName.value;
    this.checkoutInfo.lastName = this.formCheckoutControls.lastName.value;
    this.checkoutInfo.email = this.formCheckoutControls.email.value;
    this.checkoutInfo.address = this.formCheckoutControls.address.value;
    // this.checkoutInfo.country = this.formCheckoutControls.country.value;
    this.checkoutInfo.city = this.formCheckoutControls.city.value;
    this.checkoutInfo.phone = this.formCheckoutControls.phone.value;
    this.checkoutInfo.postcode = this.formCheckoutControls.postcode.value;
    this.checkoutInfo.regionalTaxPercentage = this.taxFee;
    this.checkoutInfo.regionalTax = this.taxFeeOnSubTotal;
    this.checkoutInfo.paymentMethod = this.formCheckoutControls.paymentMethod.value;
    this.checkoutInfo.grandTotal = this.tempGrandTotal;
    this.checkoutInfo.delivery = this.tempDeliveryFee;
  }
  onCountryChange() {
    const chosenCountry = this.formCheckoutControls.country.value;
    const countryObject = this.countries.find(({ value }) => value == chosenCountry)
    this.tempGrandTotal = this.checkoutInfo.grandTotal;

    this.checkoutInfo.country = countryObject.name;
    this.tempDeliveryFee = this.checkoutInfo.delivery 
    if (this.tempDeliveryFee != countryObject.shippingFee) {
      this.tempGrandTotal = this.tempGrandTotal - this.checkoutInfo.delivery + countryObject.shippingFee;
      this.tempDeliveryFee= countryObject.shippingFee;

    }
    this.taxFee = countryObject.taxFee;
    this.taxFeeOnSubTotal = this.taxFee * this.checkoutInfo.subTotal / 100;
    
    this.tempGrandTotal += this.taxFeeOnSubTotal;
  }
  getCheckoutInfo() {
    this.cartService.getCheckoutInfo().pipe(first()).subscribe(info => this.checkoutInfo = info);

  }

}
