import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-forgot-password',
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
    templateUrl: './forgot-password.html',
    styleUrl: './forgot-password.css'
})
export class ForgotPassword {
    forgotForm!: FormGroup;
    isLoading = signal(false);
    errorMessage = signal('');
    successMessage = signal('');

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.initForm();
    }

    initForm() {
        this.forgotForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        if (this.forgotForm.invalid) return;

        this.isLoading.set(true);
        this.errorMessage.set('');
        this.successMessage.set('');

        this.authService.forgotPassword(this.forgotForm.value).subscribe({
            next: () => {
                this.successMessage.set('Password reset link has been sent to your email');
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set(err.error?.message || 'Request failed');
                this.isLoading.set(false);
            }
        });
    }
}
