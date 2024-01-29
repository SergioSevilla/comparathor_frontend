import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly jwtHelper = new JwtHelperService();
  private readonly apiUrl = '/api/v1/users/login';
  private globals = new Globals;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<string> {
    return this.http.post<any>(this.globals.URL+'/api/v1/users/login', credentials).pipe(
      map((response) => {
        const token = response.token;
        localStorage.setItem('token', token);
        this.isAuthenticatedSubject.next(true); // Indica que el usuario ha iniciado sesión
        return token;
      }),
      catchError((error) => {
        console.error('Error during login:', error);
        this.isAuthenticatedSubject.next(false); // Indica que el inicio de sesión ha fallado
        return of("Error");
      })
    );
  }

  isAuthenticated(): boolean {
    console.log("entro");
    if (typeof localStorage === undefined )
    {
      return false;
    }
    else
    {
      const token = localStorage.getItem('token');
      return !this.jwtHelper.isTokenExpired(token);
    }

  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('token');
  }

}
