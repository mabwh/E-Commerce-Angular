import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductDto } from '../../../models/product-dto';
import { ProductsService } from '../../../services/products.service';
import { ReviewsService } from '../../../services/reviews.service';
import { CartService } from '../../../services/cart.service';
import { AuthStateService } from '../../../services/auth-state.service';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    templateUrl: './product-details.html',
    styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
    product = signal<ProductDto | null>(null);
    isLoading = signal(true);
    errorMessage = signal('');
    reviewForm!: FormGroup;
    quantity = signal(1);

    constructor(
        private productsService: ProductsService,
        private reviewsService: ReviewsService,
        private cartService: CartService,
        private authState: AuthStateService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.initForm();
    }

    initForm() {
        this.reviewForm = this.fb.group({
            rating: [5, [Validators.required]],
            comment: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = params['id'];
            this.loadProduct(id);
        });
    }

    loadProduct(id: number) {
        this.isLoading.set(true);
        this.productsService.getProductById(id).subscribe({
            next: (product) => {
                this.product.set(product);
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set('Failed to load product');
                this.isLoading.set(false);
            }
        });
    }

    addToCart() {
        if (!this.authState.isLoggedIn) {
            this.router.navigate(['/auth/login'], {
                queryParams: { returnUrl: this.router.url }
            });
            return;
        }

        if (this.product()) {
            this.cartService.addToCart({
                productId: this.product()!.id,
                quantity: this.quantity()
            }).subscribe({
                next: () => {
                    alert('Added to cart');
                },
                error: (err) => {
                    alert('Failed to add to cart');
                }
            });
        }
    }

    addReview() {
        if (!this.authState.isLoggedIn) {
            this.router.navigate(['/auth/login'], {
                queryParams: { returnUrl: this.router.url }
            });
            return;
        }

        if (this.reviewForm.valid && this.product()) {
            this.reviewsService.createReview({
                productId: this.product()!.id,
                ...this.reviewForm.value
            }).subscribe({
                next: () => {
                    alert('Review added');
                    this.reviewForm.reset();
                },
                error: (err) => {
                    alert('Failed to add review');
                }
            });
        }
    }

    goBack() {
        this.router.navigate(['/']);
    }
}

