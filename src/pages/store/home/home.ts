import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PagedRequestDto } from '../../../models/paged-request-dto';
import { ProductDto } from '../../../models/product-dto';
import { ProductsService } from '../../../services/products.service';
import { CartService } from '../../../services/cart.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './home.html',
    styleUrl: './home.css'
})
export class Home implements OnInit {
    products = signal<ProductDto[]>([]);
    isLoading = signal(true);
    errorMessage = signal('');
    currentPage = signal(1);
    pageSize = 12;

    constructor(
        private productsService: ProductsService,
        private cartService: CartService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts() {
        this.isLoading.set(true);
        const request: PagedRequestDto = {
            pageNumber: this.currentPage(),
            pageSize: this.pageSize
        };

        this.productsService.getProducts(request).subscribe({
            next: (response) => {
                this.products.set(response.data);
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set('Failed to load products');
                this.isLoading.set(false);
            }
        });
    }

    viewProduct(id: number) {
        this.router.navigate(['/products', id]);
    }

    addToCart(productId: number) {
        this.cartService.addToCart({ productId, quantity: 1 }).subscribe({
            next: () => {
                alert('Added to cart');
            },
            error: () => {
                alert('Failed to add to cart');
            }
        });
    }

    previousPage() {
        if (this.currentPage() > 1) {
            this.currentPage.set(this.currentPage() - 1);
            this.loadProducts();
        }
    }

    nextPage() {
        this.currentPage.set(this.currentPage() + 1);
        this.loadProducts();
    }
}
