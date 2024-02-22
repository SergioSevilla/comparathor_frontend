import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient } from '@angular/common/http';
import { Puntuacion } from '../entities/puntuacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionService {

  private globals = new Globals;

  constructor(private http: HttpClient) { }

  obtenerPuntuacionPorProducto(productoid: number): Observable<Puntuacion[]> {
    return this.http.get<Puntuacion[]>(this.globals.URL+'/api/v1/items/'+productoid+'/scores');
  }

  addNewPuntuacion(puntuacion: number, productoid: number): Observable<Puntuacion> {
    let body : {valor: number} = {"valor" : puntuacion};
    return this.http.post<Puntuacion>(this.globals.URL+'/api/v1/items/'+productoid+"/scores", body);
  }
}
