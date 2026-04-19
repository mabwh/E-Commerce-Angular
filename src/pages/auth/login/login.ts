import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../services/auth.service';

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

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.initForm();
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
                localStorage.setItem('token', response.token || '');
                localStorage.setItem('roles', JSON.stringify(response.roles));
                this.router.navigate(['/']);
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set(err.error?.message || 'Login failed');
                this.isLoading.set(false);
            }
        });
    }
}
