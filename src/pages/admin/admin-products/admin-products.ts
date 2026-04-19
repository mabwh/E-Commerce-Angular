import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminProductsService } from '../../../services/admin-products.service';
import { ProductsService } from '../../../services/products.service';
import { ProductDto } from '../../../models/product-dto';
import { PagedRequestDto } from '../../../models/paged-request-dto';

@Component({
    selector: 'app-admin-products',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './admin-products.html',
    styleUrl: './admin-products.css'
})
export class AdminProducts implements OnInit {
    products = signal<ProductDto[]>([]);
    isLoading = signal(true);
    errorMessage = signal('');

    constructor(
        private adminProductsService: AdminProductsService,
        private productsService: ProductsService
    ) { }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts() {
        this.isLoading.set(true);
        const request: PagedRequestDto = {
            pageNumber: 1,
            pageSize: 100
        };
        this.productsService.getProducts(request).subscribe({
            next: (response) => {
                this.products.set(response.items);
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set('Failed to load products');
                this.isLoading.set(false);
            }
        });
    }

    deleteProduct(id: number) {
        if (confirm('Are you sure you want to delete this product?')) {
            this.adminProductsService.deleteProduct(id).subscribe({
                next: () => {
                    this.loadProducts();
                },
                error: (err) => {
                    alert('Failed to delete product');
                }
            });
        }
    }

    updateStock(id: number, quantity: number) {
        this.adminProductsService.updateStock(id, quantity).subscribe({
            next: () => {
                alert('Stock updated successfully');
                this.loadProducts();
            },
            error: (err) => {
                alert('Failed to update stock');
            }
        });
    }
}
