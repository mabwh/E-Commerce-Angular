import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-confirm-email',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule
    ],
    templateUrl: './confirm-email.html',
    styleUrl: './confirm-email.css'
})
export class ConfirmEmail implements OnInit {
    isLoading = signal(true);
    errorMessage = signal('');
    successMessage = signal('');

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            const userId = params['userId'];
            const token = params['token'];

            if (!userId || !token) {
                this.errorMessage.set('Invalid confirmation link');
                this.isLoading.set(false);
                return;
            }

            this.authService.confirmEmail(userId, token).subscribe({
                next: () => {
                    this.successMessage.set('Email confirmed successfully! Redirecting to login...');
                    this.isLoading.set(false);
                    setTimeout(() => this.router.navigate(['/auth/login']), 2000);
                },
                error: (err) => {
                    this.errorMessage.set(err.error?.message || 'Email confirmation failed');
                    this.isLoading.set(false);
                }
            });
        });
    }
}
