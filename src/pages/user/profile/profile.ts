import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './profile.html',
    styleUrl: './profile.css'
})
export class Profile implements OnInit {
    profileForm!: FormGroup;
    isLoading = signal(true);
    isSaving = signal(false);
    errorMessage = signal('');
    successMessage = signal('');

    constructor(
        private fb: FormBuilder,
        private usersService: UsersService,
        private router: Router
    ) {
        this.initForm();
    }

    initForm() {
        this.profileForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['']
        });
    }

    ngOnInit() {
        this.loadProfile();
    }

    loadProfile() {
        this.usersService.getProfile().subscribe({
            next: (profile) => {
                this.profileForm.patchValue(profile);
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set('Failed to load profile');
                this.isLoading.set(false);
            }
        });
    }

    onSubmit() {
        if (this.profileForm.invalid) return;

        this.isSaving.set(true);
        this.errorMessage.set('');
        this.successMessage.set('');

        this.usersService.updateProfile(this.profileForm.value).subscribe({
            next: () => {
                this.successMessage.set('Profile updated successfully');
                this.isSaving.set(false);
            },
            error: (err) => {
                this.errorMessage.set(err.error?.message || 'Update failed');
                this.isSaving.set(false);
            }
        });
    }

    deleteAccount() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            this.usersService.deleteMe().subscribe({
                next: () => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('roles');
                    this.router.navigate(['/']);
                },
                error: (err) => {
                    alert('Failed to delete account');
                }
            });
        }
    }
}
