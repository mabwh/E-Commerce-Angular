import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule
    ],
    templateUrl: './reset-password.html',
    styleUrl: './reset-password.css'
})
export class ResetPassword {
    resetForm!: FormGroup;
    isLoading = signal(false);
    errorMessage = signal('');

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.initForm();
    }

    initForm() {
        this.resetForm = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]],
            token: ['']
        });
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.resetForm.get('token')?.setValue(params['token']);
        });
    }

    onSubmit() {
        if (this.resetForm.invalid) return;

        const { confirmPassword, ...data } = this.resetForm.value;

        if (this.resetForm.get('password')?.value !== confirmPassword) {
            this.errorMessage.set('Passwords do not match');
            return;
        }

        this.isLoading.set(true);
        this.errorMessage.set('');

        this.authService.resetPassword(data).subscribe({
            next: () => {
                this.router.navigate(['/auth/login']);
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set(err.error?.message || 'Reset failed');
                this.isLoading.set(false);
            }
        });
    }
}
