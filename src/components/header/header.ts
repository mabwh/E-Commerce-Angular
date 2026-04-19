import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule
    ],
    templateUrl: './header.html',
    styleUrl: './header.css'
})
export class Header implements OnInit {
    isLoggedIn = signal(false);
    userRoles = signal<string[]>([]);

    constructor(private router: Router) { }

    ngOnInit() {
        this.checkAuthStatus();
    }

    checkAuthStatus() {
        const token = localStorage.getItem('token');
        this.isLoggedIn.set(!!token);
        const roles = localStorage.getItem('roles');
        if (roles) {
            this.userRoles.set(JSON.parse(roles));
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        this.isLoggedIn.set(false);
        this.router.navigate(['/']);
    }

    isAdmin() {
        return this.userRoles().includes('Admin');
    }

    isSeller() {
        return this.userRoles().includes('Seller');
    }
}
