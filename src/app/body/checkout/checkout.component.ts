import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  countries: any[] =
    [
      { value: "", name: "Choose a country", taxFee: 0.00 },
      { value: "uk", name: "United Kingdom", taxFee: 11 },
      { value: "vn", name: "Vietnam", taxFee: 5 },
      { value: "my", name: "Malaysia", taxFee: 8 },
      { value: "usa", name: "America", taxFee: 12.5 },
    ];
  constructor(
    private formBuilder: FormBuilder,
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

    });
  }
  onCheckoutSubmit()
  {
    this.submitted = true;
    if (this.formCheckout.invalid) {     // stop here if form is invalid
      return;
    }

    console.log(this.formCheckoutControls.firstName);
  }

}
