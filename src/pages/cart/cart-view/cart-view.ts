import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CartDto } from '../../../models/cart-dto';
import { CartService } from '../../../services/cart.service';

@Component({
    selector: 'app-cart-view',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './cart-view.html',
    styleUrl: './cart-view.css'
})
export class CartView implements OnInit {
    cart = signal<CartDto | null>(null);
    isLoading = signal(true);
    errorMessage = signal('');

    constructor(
        private cartService: CartService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadCart();
    }

    loadCart() {
        this.isLoading.set(true);
        this.cartService.getCart().subscribe({
            next: (cart) => {
                this.cart.set(cart);
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set('Failed to load cart');
                this.isLoading.set(false);
            }
        });
    }

    removeItem(productId: number) {
        this.cartService.removeCartItem(productId).subscribe({
            next: (cart) => {
                this.cart.set(cart);
            },
            error: (err) => {
                alert('Failed to remove item');
            }
        });
    }

    updateQuantity(productId: number, quantity: number) {
        if (quantity <= 0) return;
        this.cartService.updateCartItem(productId, { quantity }).subscribe({
            next: (cart) => {
                this.cart.set(cart);
            },
            error: (err) => {
                alert('Failed to update quantity');
            }
        });
    }

    clearCart() {
        if (confirm('Are you sure you want to clear your cart?')) {
            this.cartService.clearCart().subscribe({
                next: (cart) => {
                    this.cart.set(cart);
                },
                error: (err) => {
                    alert('Failed to clear cart');
                }
            });
        }
    }

    checkout() {
        if (this.cart() && this.cart()!.items.length > 0) {
            this.router.navigate(['/checkout']);
        }
    }

    continueShopping() {
        this.router.navigate(['/']);
    }
}
