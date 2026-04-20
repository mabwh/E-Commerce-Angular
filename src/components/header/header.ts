import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { Subscription } from 'rxjs';
import { AuthStateService } from '../../services/auth-state.service';

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
export class Header implements OnInit, OnDestroy {
    isLoggedIn = signal(false);
    userRoles = signal<string[]>([]);

    private subs: Subscription[] = [];

    constructor(
        private router: Router,
        private authState: AuthStateService
    ) { }

    ngOnInit() {
        this.subs.push(
            this.authState.isLoggedIn$.subscribe(val => this.isLoggedIn.set(val)),
            this.authState.userRoles$.subscribe(val => this.userRoles.set(val))
        );
    }

    ngOnDestroy() {
        this.subs.forEach(s => s.unsubscribe());
    }

    logout() {
        this.authState.clearAuth();
        this.router.navigate(['/']);
    }

    isAdmin() {
        return this.userRoles().includes('Admin');
    }

    isSeller() {
        return this.userRoles().includes('Seller');
    }
}
