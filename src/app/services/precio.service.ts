import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient } from '@angular/common/http';
import { Precio } from '../entities/precio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrecioService {

  private globals = new Globals;

  constructor(private http: HttpClient) { }

  obtenerPreciosPorProducto(productoid: number): Observable<Precio[]> {
    return this.http.get<Precio[]>(this.globals.URL+'/api/v1/items/'+productoid+'/prices');
  }


}
