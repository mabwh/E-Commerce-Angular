import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule
    ],
    templateUrl: './admin-dashboard.html',
    styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {
    constructor(private router: Router) { }

    navigateTo(path: string) {
        this.router.navigate([path]);
    }
}
