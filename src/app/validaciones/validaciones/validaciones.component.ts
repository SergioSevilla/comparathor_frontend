import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Globals } from '../../globals';
import { Producto } from '../../entities/producto';
import { MatDialog } from '@angular/material/dialog';
import { VerProductoComponent } from '../../productos/ver-producto/ver-producto.component';
import { VerProductoDialogComponent } from '../../dialogs/ver-producto-dialog/ver-producto-dialog.component';
import { EstadoService } from '../../services/estado.service';
import { CategoriaService } from '../../services/categoria.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-validaciones',
  templateUrl: './validaciones.component.html',
  styleUrl: './validaciones.component.scss'
})
export class ValidacionesComponent {

  displayedColumns: string[] = ['acciones', 'nombre', 'usuario', 'fechaCreacion'];
  private globals = new Globals;
  data: Producto[] = [];

  constructor(private productoService : ProductoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.productoService.obtenerProductosPorEstado(this.globals.ESTADO.PROVISIONAL).subscribe((productos) => {
      this.data = productos.filter((producto) => producto.deleted_at == null);
    })
    
  }


  visualizar(item:number): void {
    const dialogRef = this.dialog.open(VerProductoDialogComponent, {
      width: '800px',
      data: { productoid: item }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  validar(produtoId:number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: '¿Está seguro que desea validar el producto ?'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productoService.obtenerProductoPorId(produtoId).subscribe((producto) => {
          this.productoService.validarProducto(producto).subscribe((producto) => {
            this.productoService.obtenerProductosPorEstado(this.globals.ESTADO.PROVISIONAL).subscribe((productos) => {
              this.data = productos.filter((producto) => producto.deleted_at == null);
            })
          })
        })
        
      }
      else
      {

      }
    });
  }

  borrar(produtoId:number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: '¿Está seguro que desea borrar el producto ?'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productoService.obtenerProductoPorId(produtoId).subscribe((producto) => {
          this.productoService.borrarProducto(producto).subscribe((productoBorrado) => {
            this.productoService.obtenerProductosPorEstado(this.globals.ESTADO.PROVISIONAL).subscribe((productos) => {
              this.data = productos.filter((producto) => producto.deleted_at == null);
            })
          })
        })
        
      }
      else
      {

      }
    });
    
  }
}

