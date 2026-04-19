import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-rating',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './rating.html',
    styleUrl: './rating.css'
})
export class Rating {
    @Input() rating: number = 0;
    @Input() maxRating: number = 5;

    get stars() {
        return Array(this.maxRating).fill(0).map((_, i) => i + 1);
    }

    isFilledStar(star: number): boolean {
        return star <= Math.floor(this.rating);
    }

    isHalfStar(star: number): boolean {
        return star - this.rating > 0 && star - this.rating < 1;
    }
}
