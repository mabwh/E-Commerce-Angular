import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthStateService } from './auth-state.service';

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const injector = inject(Injector);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && token && !req.url.includes('/Auth/')) {
        const authService = injector.get(AuthService);
        const authState = injector.get(AuthStateService);
        const router = injector.get(Router);
        
        return handleTokenRefresh(req, next, authService, authState, router);
      }
      return throwError(() => error);
    })
  );
};

function handleTokenRefresh(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  authState: AuthStateService,
  router: Router
): Observable<HttpEvent<unknown>> {
  if (isRefreshing) {
    // Already refreshing — force re-login
    authState.clearAuth();
    router.navigate(['/auth/login']);
    return throwError(() => new Error('Session expired'));
  }

  isRefreshing = true;
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    isRefreshing = false;
    authState.clearAuth();
    router.navigate(['/auth/login']);
    return throwError(() => new Error('No refresh token'));
  }

  return authService.refreshToken({ token: refreshToken }).pipe(
    switchMap((response) => {
      isRefreshing = false;
      authState.setAuthenticated(response.token || '', response.roles);
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);
      }

      // Retry the original request with the new token
      const retryReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${response.token}`
        }
      });
      return next(retryReq);
    }),
    catchError((refreshError) => {
      isRefreshing = false;
      authState.clearAuth();
      router.navigate(['/auth/login']);
      return throwError(() => refreshError);
    })
  );
}
