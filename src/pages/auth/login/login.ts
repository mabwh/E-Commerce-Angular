import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../services/auth.service';
import { AuthStateService } from '../../../services/auth-state.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule
    ],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class Login {
    loginForm!: FormGroup;
    isLoading = signal(false);
    errorMessage = signal('');
    private returnUrl = '/';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private authState: AuthStateService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.initForm();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    initForm() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit() {
        if (this.loginForm.invalid) return;

        this.isLoading.set(true);
        this.errorMessage.set('');

        this.authService.login(this.loginForm.value).subscribe({
            next: (response) => {
                this.authState.setAuthenticated(response.token || '', response.roles, response.refreshToken);
                this.isLoading.set(false);
                this.router.navigateByUrl(this.returnUrl);
            },
            error: (err) => {
                this.errorMessage.set(err.error?.message || 'Login failed');
                this.isLoading.set(false);
            }
        });
    }
}
