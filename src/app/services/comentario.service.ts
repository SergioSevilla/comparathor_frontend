import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../entities/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private globals = new Globals;

  constructor(private http: HttpClient) { }

  obtenerComentariosPorProductoId(idproducto: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.globals.URL+'/api/v1/items/'+idproducto+'/comments');
  }

  addNewComentario(comentario: string, productoid: number): Observable<Comentario> {
    let body : {texto: string} = {"texto" : comentario};
    return this.http.post<Comentario>(this.globals.URL+'/api/v1/items/'+productoid+"/comments", body);
  }
  
}
