import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminUsersService } from '../../../services/admin-users.service';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './users.html',
    styleUrl: './users.css'
})
export class Users implements OnInit {
    users = signal<any[]>([]);
    isLoading = signal(true);
    errorMessage = signal('');

    constructor(private adminUsersService: AdminUsersService) { }

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.isLoading.set(true);
        this.adminUsersService.getAllUsers().subscribe({
            next: (response) => {
                this.users.set(response);
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set('Failed to load users');
                this.isLoading.set(false);
            }
        });
    }

    deactivateUser(id: string) {
        if (confirm('Are you sure you want to deactivate this user?')) {
            this.adminUsersService.deactivateUser(id).subscribe({
                next: () => {
                    this.loadUsers();
                },
                error: (err) => {
                    alert('Failed to deactivate user');
                }
            });
        }
    }
}
