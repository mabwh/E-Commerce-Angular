import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CartDto } from '../../../models/cart-dto';
import { OrdersService } from '../../../services/orders.service';
import { CartService } from '../../../services/cart.service';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './checkout.html',
    styleUrl: './checkout.css'
})
export class Checkout implements OnInit {
    checkoutForm!: FormGroup;
    cart = signal<CartDto | null>(null);
    isLoading = signal(false);
    isLoadingCart = signal(true);
    errorMessage = signal('');

    constructor(
        private fb: FormBuilder,
        private ordersService: OrdersService,
        private cartService: CartService,
        private router: Router
    ) {
        this.initForm();
    }

    initForm() {
        this.checkoutForm = this.fb.group({
            fullName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', [Validators.required]],
            address: ['', [Validators.required]],
            city: ['', [Validators.required]],
            postalCode: ['', [Validators.required]],
            paymentMethod: ['CreditCard', [Validators.required]]
        });
    }

    ngOnInit() {
        this.loadCart();
    }

    loadCart() {
        this.cartService.getCart().subscribe({
            next: (cart) => {
                this.cart.set(cart);
                this.isLoadingCart.set(false);
            },
            error: (err) => {
                this.errorMessage.set('Failed to load cart');
                this.isLoadingCart.set(false);
            }
        });
    }

    onSubmit() {
        if (this.checkoutForm.invalid || !this.cart()) return;

        this.isLoading.set(true);
        this.errorMessage.set('');

        const orderData = {
            ...this.checkoutForm.value,
            items: this.cart()!.items
        };

        this.ordersService.placeOrder(orderData).subscribe({
            next: (response) => {
                this.router.navigate(['/cart/order-confirmation']);
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set(err.error?.message || 'Order failed');
                this.isLoading.set(false);
            }
        });
    }

    goBack() {
        this.router.navigate(['/cart']);
    }
}
