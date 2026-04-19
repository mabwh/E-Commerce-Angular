import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminOrdersService } from '../../../services/admin-orders.service';
import { PagedRequestDto } from '../../../models/paged-request-dto';
import { OrderDto } from '../../../models/order-dto';

@Component({
    selector: 'app-admin-orders',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './admin-orders.html',
    styleUrl: './admin-orders.css'
})
export class AdminOrders implements OnInit {
    orders = signal<OrderDto[]>([]);
    isLoading = signal(true);
    errorMessage = signal('');

    constructor(private adminOrdersService: AdminOrdersService) { }

    ngOnInit() {
        this.loadOrders();
    }

    loadOrders() {
        this.isLoading.set(true);
        const request: PagedRequestDto = {
            pageNumber: 1,
            pageSize: 100
        };
        this.adminOrdersService.getOrders(request).subscribe({
            next: (response) => {
                this.orders.set(response.data);
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set('Failed to load orders');
                this.isLoading.set(false);
            }
        });
    }

    updateOrderStatus(id: number, status: string) {
        this.adminOrdersService.updateOrderStatus(id, status).subscribe({
            next: () => {
                this.loadOrders();
            },
            error: (err) => {
                alert('Failed to update order status');
            }
        });
    }
}
