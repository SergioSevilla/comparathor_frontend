import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  
  constructor(private router: Router) {}
  
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(cloned).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {

          }
          return event;
        }),
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 403) {

            this.handleUnauthorizedError();
          }
          return throwError(error);
        })
      );
    }

    return next.handle(request);
  }

  private handleUnauthorizedError(): void {
     // Eliminar el token expirado
    localStorage.removeItem('token');
    
     // Redirigir a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
