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
                this.authState.setAuthenticated(response.token || '', response.roles, response.refreshToken);
                this.isLoading.set(false);
                this.router.navigateByUrl(this.returnUrl);
            },
            error: (err) => {
                this.errorMessage.set(err.error?.message || 'Registration failed');
                this.isLoading.set(false);
            }
        });
    }
}

