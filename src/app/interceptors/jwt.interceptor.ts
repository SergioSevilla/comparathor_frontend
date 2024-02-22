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
    // Obtener el token de localStorage
    
    const token = localStorage.getItem('token');

    // Clonar la solicitud y agregar el encabezado de autorización con el token JWT
    if (token) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(cloned).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // Puedes realizar acciones adicionales después de recibir una respuesta
          }
          return event;
        }),
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 403) {
            // Si la respuesta es un error 401 (no autorizado), el token puede haber expirado
            // Realizar acciones como redirigir a la página de inicio de sesión y eliminar el token
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
