import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserOrderDto } from '../../../models/user-order-dto';
import { OrdersService } from '../../../services/orders.service';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './orders.html',
    styleUrl: './orders.css'
})
export class Orders implements OnInit {
    orders = signal<UserOrderDto[]>([]);
    isLoading = signal(true);
    errorMessage = signal('');

    constructor(
        private ordersService: OrdersService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadOrders();
    }

    loadOrders() {
        this.isLoading.set(true);
        this.ordersService.getUserOrders().subscribe({
            next: (response) => {
                this.orders.set(response.items);
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set('Failed to load orders');
                this.isLoading.set(false);
            }
        });
    }

    viewOrder(id: number) {
        this.router.navigate(['/user/orders', id]);
    }
}
