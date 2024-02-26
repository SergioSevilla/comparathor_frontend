import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comparativa } from '../entities/comparativa';
import { Producto } from '../entities/producto';

@Injectable({
  providedIn: 'root'
})
export class ComparativaService {

 

  private globals = new Globals;

  constructor(private http: HttpClient) { }

  addComparativa(nombre: string): Observable<Comparativa> {
    let body : {nombre: string} = {"nombre" : nombre};
    return this.http.post<Comparativa>(this.globals.URL+'/api/v1/comparisons', body);
  }

  addComparativaProductos(comparativaId: number, productosSeleccionados: Producto[]): Observable<Comparativa> {
    let body : {id: number} [] = [];
    productosSeleccionados.forEach((producto) => body.push({id : producto.id}));
    return this.http.post<Comparativa>(this.globals.URL+'/api/v1/comparisons/'+comparativaId+'/items', body);
  }

  getComparativasPorUsuario():Observable<Comparativa[]> {
    return this.http.get<Comparativa[]>(this.globals.URL+'/api/v1/comparisons');
  }

  getProductoPorComparativa(comparativaId: number):Observable<Producto[]> {
    return this.http.get<Producto[]>(this.globals.URL+'/api/v1/comparisons/'+comparativaId+'/items');
  }
}
