import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PagedRequestDto } from '../../../models/paged-request-dto';
import { ProductDto } from '../../../models/product-dto';
import { CategoryDto } from '../../../models/category-dto';
import { CategoriesService } from '../../../services/categories.service';

@Component({
    selector: 'app-category-details',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './category-details.html',
    styleUrl: './category-details.css'
})
export class CategoryDetails implements OnInit {
    category = signal<CategoryDto | null>(null);
    products = signal<ProductDto[]>([]);
    isLoading = signal(true);
    errorMessage = signal('');

    constructor(
        private categoriesService: CategoriesService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = params['id'];
            this.loadCategory(id);
            this.loadProducts(id);
        });
    }

    loadCategory(id: number) {
        this.categoriesService.getCategoryById(id).subscribe({
            next: (category) => {
                this.category.set(category);
            },
            error: (err) => {
                this.errorMessage.set('Failed to load category');
            }
        });
    }

    loadProducts(id: number) {
        const request: PagedRequestDto = {
            pageNumber: 1,
            pageSize: 20
        };

        this.categoriesService.getCategoryProducts(id, request).subscribe({
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

    goBack() {
        this.router.navigate(['/categories']);
    }
}
