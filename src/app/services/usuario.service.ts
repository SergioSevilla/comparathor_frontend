import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
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
    console.log(user);
    return this.http.post<any>(this.globals.URL+'/api/v1/users/create',user, httpOptions)
    .pipe(
      catchError((error) => {
        console.error('Error creating user:', error);
        throw error;
      })
    );
  }
  

  checkEmail (email: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log("aquiiiiii "+this.globals.URL+'/api/v1/users/checkEmail?email='+email);
    return this.http.get(this.globals.URL+'/api/v1/users/checkEmail?email='+email,httpOptions).pipe(
      map(response => true), 
      catchError(error => of(false)) 
    );
  }

}
