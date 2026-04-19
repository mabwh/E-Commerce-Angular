import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PagedRequestDto } from '../../../models/paged-request-dto';
import { ProductDto } from '../../../models/product-dto';
import { SellerProductsService } from '../../../services/seller-products.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
    products = signal<ProductDto[]>([]);
    isLoading = signal(true);
    errorMessage = signal('');

    constructor(
        private sellerProductsService: SellerProductsService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts() {
        this.isLoading.set(true);
        const request: PagedRequestDto = {
            pageNumber: 1,
            pageSize: 20
        };

        this.sellerProductsService.getProducts(request).subscribe({
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

    createProduct() {
        this.router.navigate(['/seller/product/new']);
    }

    editProduct(id: number) {
        this.router.navigate(['/seller/product', id, 'edit']);
    }

    deleteProduct(id: number) {
        if (confirm('Are you sure you want to delete this product?')) {
            this.sellerProductsService.deleteProduct(id).subscribe({
                next: () => {
                    this.loadProducts();
                },
                error: (err) => {
                    alert('Failed to delete product');
                }
            });
        }
    }
}
