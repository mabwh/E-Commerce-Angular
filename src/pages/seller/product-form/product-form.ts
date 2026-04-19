import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { SellerProductsService } from '../../../services/seller-products.service';
import { ProductsService } from '../../../services/products.service';

@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule
    ],
    templateUrl: './product-form.html',
    styleUrl: './product-form.css'
})
export class ProductForm implements OnInit {
    productForm!: FormGroup;
    isLoading = signal(false);
    isEditing = signal(false);
    errorMessage = signal('');
    productId: number | null = null;

    constructor(
        private fb: FormBuilder,
        private sellerProductsService: SellerProductsService,
        private productsService: ProductsService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.initForm();
    }

    initForm() {
        this.productForm = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            price: ['', [Validators.required, Validators.min(0)]],
            stockQuantity: ['', [Validators.required, Validators.min(0)]],
            categoryId: ['', [Validators.required]],
            imageUrl: ['']
        });
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.isEditing.set(true);
                this.productId = params['id'];
                this.loadProduct(this.productId!);
            }
        });
    }

    loadProduct(id: number) {
        this.isLoading.set(true);
        this.productsService.getProductById(id).subscribe({
            next: (product) => {
                this.productForm.patchValue({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    stockQuantity: product.stockQuantity,
                    categoryId: product.categoryId,
                    imageUrl: product.images?.length ? product.images[0].imageUrl : ''
                });
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set('Failed to load product');
                this.isLoading.set(false);
            }
        });
    }

    onSubmit() {
        if (this.productForm.invalid) return;

        this.isLoading.set(true);
        this.errorMessage.set('');

        if (this.isEditing() && this.productId) {
            this.sellerProductsService.updateProduct(this.productId, this.productForm.value).subscribe({
                next: () => {
                    this.router.navigate(['/seller/dashboard']);
                    this.isLoading.set(false);
                },
                error: (err) => {
                    this.errorMessage.set(err.error?.message || 'Update failed');
                    this.isLoading.set(false);
                }
            });
        } else {
            this.sellerProductsService.createProduct(this.productForm.value).subscribe({
                next: () => {
                    this.router.navigate(['/seller/dashboard']);
                    this.isLoading.set(false);
                },
                error: (err) => {
                    this.errorMessage.set(err.error?.message || 'Creation failed');
                    this.isLoading.set(false);
                }
            });
        }
    }

    goBack() {
        this.router.navigate(['/seller/dashboard']);
    }
}
