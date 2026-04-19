import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-checkout-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule
    ],
    templateUrl: './checkout-form.html',
    styleUrl: './checkout-form.css'
})
export class CheckoutForm {
    checkoutForm: FormGroup;

    paymentMethods = [
        { value: 'CreditCard', label: 'Credit Card' },
        { value: 'DebitCard', label: 'Debit Card' },
        { value: 'PayPal', label: 'PayPal' },
        { value: 'BankTransfer', label: 'Bank Transfer' }
    ];

    constructor(private fb: FormBuilder) {
        this.checkoutForm = this.fb.group({
            fullName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required]],
            address: ['', [Validators.required]],
            city: ['', [Validators.required]],
            state: ['', [Validators.required]],
            postalCode: ['', [Validators.required]],
            country: ['', [Validators.required]],
            paymentMethod: ['CreditCard', [Validators.required]]
        });
    }

    onSubmit() {
        if (this.checkoutForm.valid) {
            console.log('Form submitted:', this.checkoutForm.value);
        }
    }
}
