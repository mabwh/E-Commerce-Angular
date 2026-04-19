import { HttpInterceptorFn } from '@angular/common/http';
import { map } from 'rxjs/operators';

/**
 * Interceptor that unwraps the standard API response envelope.
 * The backend wraps all responses in: { statusCode, isSuccess, message, data, errors }
 * This interceptor extracts just the `data` property so services receive the payload directly.
 */
export const apiResponseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map((event: any) => {
      // Only process HttpResponse events with a body
      if (event.body && typeof event.body === 'object' && 'isSuccess' in event.body && 'data' in event.body) {
        // Clone the response with just the unwrapped data
        return event.clone({ body: event.body.data });
      }
      return event;
    })
  );
};
