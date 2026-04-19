import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WishlistDto } from '../../../models/wishlist-dto';
import { WishlistService } from '../../../services/wishlist.service';

@Component({
    selector: 'app-wishlist',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './wishlist.html',
    styleUrl: './wishlist.css'
})
export class Wishlist implements OnInit {
    wishlist = signal<WishlistDto[]>([]);
    isLoading = signal(true);
    errorMessage = signal('');

    constructor(
        private wishlistService: WishlistService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadWishlist();
    }

    loadWishlist() {
        this.isLoading.set(true);
        this.wishlistService.getWishlist().subscribe({
            next: (wishlist) => {
                this.wishlist.set(wishlist);
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set('Failed to load wishlist');
                this.isLoading.set(false);
            }
        });
    }

    removeFromWishlist(productId: number) {
        this.wishlistService.removeFromWishlist(productId).subscribe({
            next: () => {
                this.loadWishlist();
            },
            error: (err) => {
                alert('Failed to remove item');
            }
        });
    }

    viewProduct(productId: number) {
        this.router.navigate(['/products', productId]);
    }
}
