import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-order-confirmation',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule
    ],
    templateUrl: './order-confirmation.html',
    styleUrl: './order-confirmation.css'
})
export class OrderConfirmation {
    constructor(private router: Router) { }

    continueShopping() {
        this.router.navigate(['/']);
    }

    viewOrders() {
        this.router.navigate(['/user/orders']);
    }
}
