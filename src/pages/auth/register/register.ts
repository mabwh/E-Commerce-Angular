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
    selector: 'app-register',
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
    templateUrl: './register.html',
    styleUrl: './register.css'
})
export class Register {
    registerForm!: FormGroup;
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
        this.registerForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        });
    }

    onSubmit() {
        if (this.registerForm.invalid) return;

        const { confirmPassword, ...data } = this.registerForm.value;

        if (this.registerForm.get('password')?.value !== confirmPassword) {
            this.errorMessage.set('Passwords do not match');
            return;
        }

        this.isLoading.set(true);
        this.errorMessage.set('');

        this.authService.register(data).subscribe({
            next: (response) => {
                localStorage.setItem('token', response.token || '');
                localStorage.setItem('roles', JSON.stringify(response.roles));
                this.router.navigate(['/']);
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set(err.error?.message || 'Registration failed');
                this.isLoading.set(false);
            }
        });
    }
}
