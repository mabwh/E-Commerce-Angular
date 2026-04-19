import { Component, Output, EventEmitter, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PagedRequestDto } from '../../models/paged-request-dto';
import { CategoryDto } from '../../models/category-dto';
import { CategoriesService } from '../../services/categories.service';

@Component({
    selector: 'app-category-filter',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule
    ],
    templateUrl: './category-filter.html',
    styleUrl: './category-filter.css'
})
export class CategoryFilter implements OnInit {
    @Output() categorySelected = new EventEmitter<number>();
    @Output() priceRangeChanged = new EventEmitter<{ min: number, max: number }>();

    categories: CategoryDto[] = [];
    selectedCategory: number | null = null;
    minPrice: number = 0;
    maxPrice: number = 10000;

  private categoriesService = inject(CategoriesService);

    ngOnInit() {
        this.loadCategories();
    }

    loadCategories() {
        const request: PagedRequestDto = {
            pageNumber: 1,
            pageSize: 100
        };

        this.categoriesService.getCategories(request).subscribe({
            next: (response) => {
                this.categories = response.data;
            },
            error: (err) => {
                console.error('Failed to load categories');
            }
        });
    }

    onCategoryChange() {
        if (this.selectedCategory) {
            this.categorySelected.emit(this.selectedCategory);
        }
    }

    onPriceChange() {
        this.priceRangeChanged.emit({
            min: this.minPrice,
            max: this.maxPrice
        });
    }

    resetFilters() {
        this.selectedCategory = null;
        this.minPrice = 0;
        this.maxPrice = 10000;
    }
}
