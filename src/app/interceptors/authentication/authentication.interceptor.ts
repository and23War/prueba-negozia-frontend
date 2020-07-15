import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/* Services */
import { AuthService } from '@app/providers/services/auth/auth.service';

/**
 * Utils
 */
import { StorageService } from '@app/providers/utils/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        // let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          /* client-side error */
        } else {
          /* server-side error */
          this.checkInvalidToken(error);
          // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(error);
      })
    );
  }

  /**
   * Check invalid token from server side
   * @param error: Http error response object
   */
  checkInvalidToken(error: HttpErrorResponse): void {
    const errorBody = error.error;
    const token = this.storageService.getToken();
    if (token && error.status === 401 && errorBody.slug === 'invalid-token') {
      this.authService.logout();
    }
  }
}
