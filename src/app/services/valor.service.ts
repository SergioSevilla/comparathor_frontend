import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient } from '@angular/common/http';
import { Valor } from '../entities/valor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValorService {


  private globals = new Globals;

  constructor(private http: HttpClient) { }


  obtenerValorPorProducto(productoid: number): Observable<Valor[]> {
    return this.http.get<Valor[]>(this.globals.URL+'/api/v1/items/'+productoid+'/values');
  }

  addValor(idAtributo: number, idProducto : number ,valorAtr: string):Observable<Valor> {
    let valorREST : { atributo : {id: number}, producto : {id: number}, valor : string} = {
      atributo: { id: idAtributo }, 
      producto: { id: idProducto}, 
      valor: valorAtr };
    console.log(valorREST);
    return this.http.post<Valor>(this.globals.URL+'/api/v1/values', valorREST);
  
  }
}
