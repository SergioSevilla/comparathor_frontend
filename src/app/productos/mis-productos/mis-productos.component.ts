import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { EstadoService } from '../../services/estado.service';
import { Producto } from '../../entities/producto';
import { Globals } from '../../globals';
import { Categoria } from '../../entities/categoria';
import { Estado } from '../../entities/estado';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrl: './mis-productos.component.scss'
})
export class MisProductosComponent {

  productos : Producto[] = []
  productosDefinitivos : Producto[] = []
  productosProvisionales : Producto[] = []
  globals = new Globals();

  constructor( private productoService: ProductoService, private categoriaService: CategoriaService
    ,private estadoService: EstadoService, private router: Router, private usuarioService : UsuarioService) {



  this.productoService.obtenerProductos().subscribe(
    (productos) => {
      
      this.usuarioService.obtenerUsuarios().subscribe((usuarios) => {
        let usuario : string = '';
        usuario = usuarios[0].email;
        this.productos = productos;
        this.productos=this.productos.filter((producto) => producto.usuario==usuario);

        this.productos.forEach((producto) => {
          this.categoriaService.obtenerCategoriasId(producto.categoria).subscribe(
            (categoria: Categoria) => {
              producto.categoriaNombre = categoria.nombre;
          });
          this.estadoService.obtenerEstadoPorId(producto.estado).subscribe(
            (estado: Estado) => {
              producto.estadoNombre = estado.nombre;
            });
          if (producto.foto != null) 
          {
            this.productoService.obtenerFotoProducto(producto.id).subscribe(
              foto => {
                producto.fotoBlob = URL.createObjectURL(foto);
                console.log(producto.fotoBlob);
              },
              error => {
                console.error('Error al obtener la foto del producto:', error);
              }
            );
          }
          else {
            producto.fotoBlob = "assets/images/sin_imagen.jpg"
          }
        });

        this.productos.forEach((item) => {
          console.log(item.categoria+" - "+this.globals.ESTADO.DEFINITIVO)
          if (item.estado == this.globals.ESTADO.DEFINITIVO) this.productosDefinitivos.push(item); else this.productosProvisionales.push(item);
        })
        console.log("definitivos:");
        console.log(this.productosDefinitivos);
        console.log("provisionles:");
        console.log(this.productosProvisionales);
      })

      
    },
    error => {
      console.error('Error al obtener productos:', error);
      // Aquí puedes manejar el error como desees, por ejemplo, mostrando un mensaje al usuario
    }
  );
  }

  verDetalle(producto: Producto): void {
    this.router.navigate(['/producto'], { state: { producto } }); // Navega a la nueva ruta con el ID del producto
  }
}
