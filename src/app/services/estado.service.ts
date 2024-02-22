import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Estado } from '../entities/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private globals = new Globals;

  constructor(private http: HttpClient) {}

  obtenerEstadoPorId(id: number):Observable<Estado> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<Estado>(this.globals.URL+'/api/v1/statuses/'+id,httpOptions).pipe(
      catchError(error => {
        console.error('Error al obtener categoría por id', error);
        return throwError('Ocurrió un error al obtener la categoría');
      })
    );
  }
}
