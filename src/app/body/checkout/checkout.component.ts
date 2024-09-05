import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { first } from 'rxjs';

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
  taxFee!:number;
  taxFeeOnGrandTotal: number = 0.00;
  countries: any[] =
    [
      { value: "", name: "Choose a country", taxFee: 0.00, shippingFee: 0.00 },
      { value: "uk", name: "United Kingdom", taxFee: 11, shippingFee: 15.50 },
      { value: "vn", name: "Vietnam", taxFee: 10, shippingFee: 7.99  },
      { value: "my", name: "Malaysia", taxFee: 8, shippingFee: 9.99  },
      { value: "usa", name: "America", taxFee: 12.5, shippingFee: 25.69 },
    ];
    checkoutInfo:any;

  constructor(
    private formBuilder: FormBuilder,
    private cartService:CartService
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
      paymentMethod:['',Validators.required],
      acceptTermConditions: [false,Validators.requiredTrue]
    });

    this.getCheckoutInfo();
  }
  onCheckoutSubmit()
  {
    this.submitted = true;
    console.log('submitted')
    if (this.formCheckout.invalid) {     // stop here if form is invalid
      return;
    }
    console.log(this.formCheckoutControls.paymentMethod.value);
    console.log(this.formCheckoutControls.acceptTermConditions.value);

  }

  onCountryChange()
  {
    console.log('country change')
    const chosenCountry = this.formCheckoutControls.country.value;    
    const countryObject = this.countries.find(({ value }) => value == chosenCountry)
    if(this.checkoutInfo.delivery <= 0)
    {
      this.checkoutInfo.delivery = countryObject.shippingFee;
      this.checkoutInfo.grandTotal += this.checkoutInfo.delivery;
    }
    this.taxFee = countryObject.taxFee;
      this.taxFeeOnGrandTotal = this.taxFee *this.checkoutInfo.subTotal/100;

      this.checkoutInfo.grandTotal +=this.taxFeeOnGrandTotal;
  }
  getCheckoutInfo()
  {
    this.cartService.getCheckoutInfo().pipe(first()).subscribe(info => this.checkoutInfo = info);

  }

}
