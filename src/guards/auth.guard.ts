import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const token = localStorage.getItem('token');

    if (token) {
        return true;
    }

    router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
};
