import { Component, OnInit } from '@angular/core';
import { Comparativa } from '../../entities/comparativa';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../entities/producto';
import { Atributo } from '../../entities/atributo';
import { AtributoService } from '../../services/atributo.service';
import { ComparativaService } from '../../services/comparativa.service';
import { Valor } from '../../entities/valor';
import { ValorService } from '../../services/valor.service';
import { PuntuacionService } from '../../services/puntuacion.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ver-comparativa',
  templateUrl: './ver-comparativa.component.html',
  styleUrl: './ver-comparativa.component.scss'
})
export class VerComparativaComponent implements OnInit {

  
  comparativa: Comparativa;
  isEditable : boolean = false;
  productos : Producto [] = [];
  atributos : Atributo [] = [];
  columnas : string [] = [];
  productoValores : {producto: Producto, puntuacion: number, valores:string[]}[] = [];
  productoValoresArray : string[][];

  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService, private productoService: ProductoService,
    private atributosService: AtributoService, private comparativaService : ComparativaService, private valorService : ValorService, 
    private puntuacionSevice : PuntuacionService) { }
  
  ngOnInit(): void {
    this.comparativa = history.state.comparativa;
    if (!this.comparativa) {
      this.router.navigate(['/miscomparativas']);
    }
    this.usuarioService.obtenerUsuarios().subscribe((usuarios) => this.isEditable = usuarios[0].id == this.comparativa.id);
    this.comparativaService.getProductoPorComparativa(this.comparativa.id).subscribe((productos) => {
      this.productos = productos  
      this.atributosService.obtenerAtributoPorCategoria(this.productos[0].categoria).subscribe((atributos) => {
        this.atributos = atributos;
        this.columnas.push("Producto");
        atributos.forEach((atributo) => this.columnas.push(atributo.nombre));
      })
      this.productos.forEach((producto) => {
        let atributoFormat : string [] = []
        this.valorService.obtenerValorPorProducto(producto.id).subscribe((valores) => {
          this.atributos.forEach((atributo) => {

            let auxAtr = valores.find((valor) => valor.atributo == atributo.id);
            if (auxAtr) {
              atributoFormat.push(auxAtr.valor);
            } else{
            
              atributoFormat.push("");
            }
          });
  
        });
        if (producto.foto != null) 
        {
          this.productoService.obtenerFotoProducto(producto.id).subscribe(
          foto => {
            producto.fotoBlob = URL.createObjectURL(foto);

          },
          error => {
            console.error('Error al obtener la foto del producto:', error);

          }
          );
        }
        else {
          producto.fotoBlob = "assets/images/sin_imagen.jpg"
        }
        let puntuacion: number = -1;
        puntuacion = this.getPuntuacionMedia(producto);
        let pf : {producto: Producto, puntuacion: number, valores: string[]} = {producto: producto, puntuacion: puntuacion, valores: atributoFormat};
        this.productoValores.push (pf);

      }); 

    });
    
  
  }

  getPuntuacionMediaObs(producto: Producto): Observable<number> {
    
    return new Observable<number>(observer => {
      let puntuacionMedia : number = 0;
      this.puntuacionSevice.obtenerPuntuacionPorProducto(producto.id).subscribe((puntuaciones) => {

        let sumaPuntuaciones = 0;
        puntuaciones.forEach((puntuacion) => {
          sumaPuntuaciones = sumaPuntuaciones + puntuacion.valor
          puntuacionMedia = sumaPuntuaciones/puntuaciones.length;
        });
        observer.next(puntuacionMedia);
        observer.complete();
        });
      });
    }


  getPuntuacionMedia(producto: Producto): number {
    let puntuacionMedia :number = 0;
    this.puntuacionSevice.obtenerPuntuacionPorProducto(producto.id).subscribe((puntuaciones) => {
      let sumaPuntuaciones = 0;
      puntuaciones.forEach((puntuacion) => {
        sumaPuntuaciones = sumaPuntuaciones + puntuacion.valor
        puntuacionMedia = sumaPuntuaciones/puntuaciones.length;
      });
    });  
    return puntuacionMedia
    }
  
}


