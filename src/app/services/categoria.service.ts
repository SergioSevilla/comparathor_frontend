import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../entities/categoria';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private globals = new Globals;

  constructor(private http: HttpClient) { }

  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.globals.URL+'/api/v1/categories');
  }
}
