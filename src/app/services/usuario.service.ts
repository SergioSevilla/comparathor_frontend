import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private globals = new Globals;

  constructor(private http: HttpClient) {}

  createUser (user = { email: '', nombre: '', password : '', direccion : '' }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<any>(this.globals.URL+'/api/v1/users/create', httpOptions)
    .pipe(
      catchError((error) => {
        console.error('Error creating user:', error);
        throw error;
      })
    );
  }
}
