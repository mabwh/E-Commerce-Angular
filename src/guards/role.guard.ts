import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const requiredRoles = route.data['roles'] as string[];

    // Get user roles from localStorage or from auth service
    const userRolesStr = localStorage.getItem('roles');
    const userRoles = userRolesStr ? JSON.parse(userRolesStr) : [];

    if (!requiredRoles || requiredRoles.length === 0) {
        return true;
    }

    const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

    if (hasRequiredRole) {
        return true;
    }

    router.navigate(['/']);
    return false;
};
