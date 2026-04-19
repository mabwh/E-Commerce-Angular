import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-cart-summary',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule
    ],
    templateUrl: './cart-summary.html',
    styleUrl: './cart-summary.css'
})
export class CartSummary {
    @Input() subtotal: number = 0;
    @Input() discount: number = 0;
    @Input() total: number = 0;
    @Input() itemCount: number = 0;

    get tax() {
        return (this.subtotal - this.discount) * 0.1; // 10% tax
    }
}
