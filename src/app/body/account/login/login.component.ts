import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet, } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { first } from 'rxjs';
import { AlertService } from '../../../services/alert.service';
import { AlertComponent } from "../../../alert/alert.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule, RouterOutlet,
    AlertComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }   // convenience getter for easy access to form fields


  onSubmit() {
    this.submitted = true;

    this.alertService.clear();        // reset alerts on submit

    if (this.form.invalid) {     // stop here if form is invalid
      return;
    }

    this.loading = true;
    this.accountService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          if (error.hasOwnProperty("error")) {
            this.alertService.error(error.error.message);
          }
          else {
            this.alertService.error(error);

          }
          this.loading = false;
        }
      });
  }
}
