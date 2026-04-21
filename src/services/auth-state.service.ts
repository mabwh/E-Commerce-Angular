import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthStateService {
    private _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
    private _userRoles$ = new BehaviorSubject<string[]>(this.loadRoles());

    /** Observable stream – components subscribe to get live auth state */
    isLoggedIn$ = this._isLoggedIn$.asObservable();
    userRoles$ = this._userRoles$.asObservable();

    /** Synchronous snapshot for guards / quick checks */
    get isLoggedIn(): boolean {
        return this._isLoggedIn$.value;
    }

    get userRoles(): string[] {
        return this._userRoles$.value;
    }

    /** Call after successful login / register */
    setAuthenticated(token: string, roles: string[], refreshToken?: string | null) {
        localStorage.setItem('token', token);
        localStorage.setItem('roles', JSON.stringify(roles));
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }
        this._isLoggedIn$.next(true);
        this._userRoles$.next(roles);
    }

    /** Call on logout */
    clearAuth() {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        localStorage.removeItem('refreshToken');
        this._isLoggedIn$.next(false);
        this._userRoles$.next([]);
    }

    private hasToken(): boolean {
        return !!localStorage.getItem('token');
    }

    private loadRoles(): string[] {
        const stored = localStorage.getItem('roles');
        return stored ? JSON.parse(stored) : [];
    }
}
