import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Producto } from '../entities/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  private globals = new Globals;


  constructor(private http: HttpClient) { }

  obtenerProductoPorCategoria(categoriaId: number):Observable<Producto[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<Producto[]>(this.globals.URL+'/api/v1/categories/'+categoriaId+'/items',httpOptions).pipe(
      catchError(error => {
        console.error('Error al obtener productos por categoría', error);
        return throwError('Ocurrió un error al obtener productos por categoría');
      })
    );
  }

  obtenerProductos():Observable<Producto[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<Producto[]>(this.globals.URL+'/api/v1/items',httpOptions).pipe(
      catchError(error => {
        console.error('Error al obtener productos por categoría', error);
        return throwError('Ocurrió un error al obtener productos por categoría');
      })
    );
  }

  obtenerFotoProducto(id: number): Observable<Blob> {
    return this.http.get(this.globals.URL+'/api/v1/items/'+id+'/picture', { responseType: 'blob' });
  }

  obtenerProductoPorId(idProducto: number):Observable<Producto> {
    return this.http.get<Producto>(this.globals.URL+'/api/v1/items/'+idProducto);
  }

  addProducto(producto: Producto, categoriaId : number): Observable<Producto> {
    let productoREST : { nombre: string } = { nombre : producto.nombre};
    return this.http.post<Producto>(this.globals.URL+'/api/v1/categories/'+categoriaId+'/items', productoREST);
  }

  addFoto(productoId: number, fileFoto: File): Observable<Producto> {
    const formData = new FormData();
    formData.append('image', fileFoto);

    return this.http.post<Producto>(this.globals.URL+'/api/v1/items/'+productoId+'/picture', formData);
  }

  obtenerProductosPorEstado(idEstado: number):Observable<Producto[]> {
    return this.http.get<Producto[]>(this.globals.URL+'/api/v1/items?estadoId='+idEstado);
  }

  validarProducto(producto: Producto):Observable<Producto> {
    let productoAux : {nombre:string, categoria: {id:number}, estado:{id:number}} =
    {
      nombre : producto.nombre, categoria: {id : producto.categoria}, estado : {id:2}
    };
    console.log(productoAux);

    return this.http.put<Producto>(this.globals.URL+'/api/v1/items/'+producto.id,productoAux);
  }

  borrarProducto(producto: Producto):Observable<Producto> {
    return this.http.delete<Producto>(this.globals.URL+'/api/v1/items/'+producto.id);
  }

}
