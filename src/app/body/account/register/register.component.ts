import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../../../services/account.service';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../services/alert.service';
import { AlertComponent } from "../../../alert/alert.component";
@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    AlertComponent
],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
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
            email: ['', [Validators.required, Validators.email]],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['/login'], { relativeTo: this.route });
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
