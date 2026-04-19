import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PagedRequestDto } from '../../../models/paged-request-dto';
import { CategoryDto } from '../../../models/category-dto';
import { CategoriesService } from '../../../services/categories.service';

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './categories.html',
    styleUrl: './categories.css'
})
export class Categories implements OnInit {
    categories = signal<CategoryDto[]>([]);
    isLoading = signal(true);
    errorMessage = signal('');

    constructor(
        private categoriesService: CategoriesService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadCategories();
    }

    loadCategories() {
        this.isLoading.set(true);
        const request: PagedRequestDto = {
            pageNumber: 1,
            pageSize: 100
        };

        this.categoriesService.getCategories(request).subscribe({
            next: (response) => {
                this.categories.set(response.data);
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set('Failed to load categories');
                this.isLoading.set(false);
            }
        });
    }

    viewCategory(id: number) {
        this.router.navigate(['/categories', id]);
    }
}
