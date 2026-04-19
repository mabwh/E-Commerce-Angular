import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderDto } from '../../../models/order-dto';
import { OrdersService } from '../../../services/orders.service';

@Component({
    selector: 'app-order-details',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './order-details.html',
    styleUrl: './order-details.css'
})
export class OrderDetails implements OnInit {
    order = signal<OrderDto | null>(null);
    isLoading = signal(true);
    errorMessage = signal('');

    constructor(
        private ordersService: OrdersService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = params['id'];
            this.loadOrder(id);
        });
    }

    loadOrder(id: number) {
        this.ordersService.getOrderById(id).subscribe({
            next: (order) => {
                this.order.set(order);
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set('Failed to load order');
                this.isLoading.set(false);
            }
        });
    }

    goBack() {
        this.router.navigate(['/user/orders']);
    }
}
