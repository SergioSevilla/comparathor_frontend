import { Component, Inject } from '@angular/core';
import { Producto } from '../../entities/producto';
import { Atributo } from '../../entities/atributo';
import { Valor } from '../../entities/valor';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoService } from '../../services/producto.service';
import { AtributoService } from '../../services/atributo.service';
import { ValorService } from '../../services/valor.service';
import { AtributoValor } from '../../entities/atributovalor';
import { CategoriaService } from '../../services/categoria.service';
import { EstadoService } from '../../services/estado.service';

@Component({
  selector: 'app-ver-producto-dialog',
  templateUrl: './ver-producto-dialog.component.html',
  styleUrl: './ver-producto-dialog.component.scss'
})
export class VerProductoDialogComponent {
  producto: Producto;
  atributos: Atributo[] =[];
  valores: Valor[] = [];
  atributosValores: AtributoValor[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private productoService: ProductoService, private atributoService: AtributoService,
    private valorService: ValorService,private categoriaService: CategoriaService, private estadoService: EstadoService) {
      this.productoService.obtenerProductoPorId(data.productoid).subscribe((producto) => {
        if (producto) { 
          this.producto=producto;
          if (this.producto.foto != null) {
            this.productoService.obtenerFotoProducto(producto.id).subscribe(
              foto => {
                this.producto.fotoBlob = URL.createObjectURL(foto);
              },
              error => {
                console.error('Error al obtener la foto del producto:', error);

              }
            );
          }
          else {
            this.producto.fotoBlob = "assets/images/sin_imagen.jpg"
          }
          
          this.categoriaService.obtenerCategoriasId(producto.categoria).subscribe((categoria) => {
            if (categoria)
            {
              this.producto.categoriaNombre = categoria.nombre;
            }
          })
          this.estadoService.obtenerEstadoPorId(producto.estado).subscribe((estado) => {
            if (estado)
            {
              this.producto.estadoNombre = estado.nombre;
            }
          })
          this.atributoService.obtenerAtributoPorProducto(this.producto.id).subscribe((atributos) => {
            this.atributos = atributos;
            this.valorService.obtenerValorPorProducto(this.producto.id).subscribe((valores) => {
              this.valores = valores;
              this.joinAtributosValores(this.atributos,this.valores);
            })
          })
        
        }
      })
      
  }

  joinAtributosValores(atributos: Atributo[], valores: Valor[]) {
    atributos.forEach((atributo) => {
      let valor = valores.find((element) => element.atributo == atributo.id);
      if (valor) {
        let atributoValor = new AtributoValor();
        atributoValor.idatributo=atributo.id;
        atributoValor.nombreAtributo=atributo.nombre;
        atributoValor.valor=valor.valor;
        this.atributosValores.push(atributoValor);
      } else {
        let atributoValor = new AtributoValor();
        atributoValor.idatributo=atributo.id;
        atributoValor.nombreAtributo=atributo.nombre;
        atributoValor.valor='';
        this.atributosValores.push(atributoValor);
      }
    })
  }

}
