import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthStateService } from '../../services/auth-state.service';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        RouterModule
    ],
    templateUrl: './product-card.html',
    styleUrl: './product-card.css'
})
export class ProductCard {
    @Input() product: any;

    constructor(
        private router: Router,
        private authState: AuthStateService,
        private cartService: CartService
    ) { }

    addToCart() {
        if (!this.authState.isLoggedIn) {
            this.router.navigate(['/auth/login'], {
                queryParams: { returnUrl: this.router.url }
            });
            return;
        }

        this.cartService.addToCart({
            productId: this.product.id,
            quantity: 1
        }).subscribe({
            next: () => alert('Added to cart'),
            error: () => alert('Failed to add to cart')
        });
    }
}
