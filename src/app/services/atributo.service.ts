import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atributo } from '../entities/atributo';

@Injectable({
  providedIn: 'root'
})
export class AtributoService {

  private globals = new Globals;

  constructor(private http: HttpClient) { }

  obtenerAtributoPorCategoria(categoriaid: number): Observable<Atributo[]> {
    return this.http.get<Atributo[]>(this.globals.URL+'/api/v1/categories/'+categoriaid+'/properties');
  }

  addNewAttr(categoriaid: number,valor: string): Observable<Atributo> {

    return this.http.post<Atributo>(this.globals.URL+'/api/v1/categories/'+categoriaid+'/properties', {nombre: valor} );
  }

  obtenerAtributoPorProducto(productoid: number): Observable<Atributo[]> {
    return this.http.get<Atributo[]>(this.globals.URL+'/api/v1/items/'+productoid+'/properties');
  }

}
