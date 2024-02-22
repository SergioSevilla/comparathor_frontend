import { Component } from '@angular/core';
import { Producto } from '../../entities/producto';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ComentarioService } from '../../services/comentario.service';
import { PuntuacionService } from '../../services/puntuacion.service';
import { AtributoService } from '../../services/atributo.service';
import { Atributo } from '../../entities/atributo';
import { User } from '../../entities/user';
import { Comentario } from '../../entities/comentario';
import { ValorService } from '../../services/valor.service';
import { Valor } from '../../entities/valor';
import { AtributoValor } from '../../entities/atributovalor';
import { Puntuacion } from '../../entities/puntuacion';
import { ComentarioPuntuacion } from '../../entities/comentariopuntuacion';
import { PrecioService } from '../../services/precio.service';
import { Precio } from '../../entities/precio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ComentarioDialogComponent } from '../../dialogs/comentario-dialog/comentario-dialog.component';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrl: './ver-producto.component.scss'
})
export class VerProductoComponent {

  producto: Producto;
  atributos: Atributo[] = []
  comentarios: Comentario[] = []
  valores: Valor[] = [];
  puntuaciones: Puntuacion[] = []
  comentariospuntuaciones: ComentarioPuntuacion[] = [];
  atributosValores: AtributoValor[] = []
  mostrarComentariosCard: boolean = true;
  mostrarPreciosCard: boolean = false;
  usuarioActual: User;
  puntuacionMedia: number = 0;
  numeroPuntuaciones: number = 0;
  precios: Precio[] = [];

  stars = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    }
  ];

  formComentario: FormGroup;


  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService, private comentarioService: ComentarioService,
    private puntuacionSevice: PuntuacionService, private atributoService: AtributoService, private valorService: ValorService,
    private precioService: PrecioService,private dialog: MatDialog, private fbComentario: FormBuilder) {

      this.obtenerDetalleProducto();
      this.usuarioService.obtenerUsuarios().subscribe((usuarios) => {
        console.log("nombreeeee:  "+usuarios[0].nombre);
        this.usuarioActual = usuarios[0];
      })
      this.comentarioService.obtenerComentariosPorProductoId(this.producto.id).subscribe((comentarios) => {
        this.comentarios = comentarios;
        this.puntuacionSevice.obtenerPuntuacionPorProducto(this.producto.id).subscribe((puntuaciones) => {
          this.puntuaciones = puntuaciones;
          this.joinComentariosPuntuaciones(this.comentarios,this.puntuaciones);
          this.calcularPuntuacionMedia();
        })
      })
      this.atributoService.obtenerAtributoPorProducto(this.producto.id).subscribe((atributos) => {
        this.atributos = atributos;
        this.valorService.obtenerValorPorProducto(this.producto.id).subscribe((valores) => {
          this.valores = valores;
          this.joinAtributosValores(this.atributos,this.valores);
        })
      })
      this.precioService.obtenerPreciosPorProducto(this.producto.id).subscribe((precios) => {
        this.precios=precios;
      });

      this.formComentario = this.fbComentario.group({
        puntuacion: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
        comentario: ['', [Validators.required, Validators.maxLength(150)]]
      });
    }



  ngOnInit(): void {

  }

  obtenerDetalleProducto(): void {
    this.producto = history.state.producto; 
  }

  mostrarComentarios() {
    this.mostrarComentariosCard = !this.mostrarComentariosCard;
    this.mostrarPreciosCard = false;
  }

  mostrarPrecios() {
    this.mostrarPreciosCard = !this.mostrarPreciosCard;
    this.mostrarComentariosCard = false;
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

  joinComentariosPuntuaciones(comentarios: Comentario[], puntuaciones: Puntuacion[]) {
    comentarios.forEach((comentario) => {
      let puntuacion = puntuaciones.find((element) => element.usuario == comentario.usuario);
      if (puntuacion) {
        let comentarioPuntuacion = new ComentarioPuntuacion();
        comentarioPuntuacion.comentario=comentario.texto;
        comentarioPuntuacion.idcomentario=comentario.id;
        comentarioPuntuacion.puntuacion=puntuacion.valor;
        this.usuarioService.obtenerUsuariosPorId(comentario.usuario).subscribe((usuario) => {
          if (usuario) {comentarioPuntuacion.usuario = usuario.nombre;}
           else {comentarioPuntuacion.usuario = 'Anónimo';} 
          
          this.comentariospuntuaciones.push(comentarioPuntuacion);
         
        });
        
        
      }
    })
  }

  calcularPuntuacionMedia() {
    this.numeroPuntuaciones= this.puntuaciones.length;
    let suma : number = 0;
    this.puntuaciones.forEach((puntuacion) => suma = suma + puntuacion.valor);
    this.puntuacionMedia = suma/this.numeroPuntuaciones;

  }

  existeComentario():boolean {
      let existe = this.comentarios.find((comentario) => comentario.usuario == this.usuarioActual.id);
      
      if (existe) {
        console.log("existe");
        return true; }
        else {
          console.log("no existe");
          return false;
        }
    }


    addComentario() {
      console.log("pulsado Comentario!");
      const dialogRef = this.dialog.open(ComentarioDialogComponent, {
        width: '600px',
        data: { form: this.formComentario }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('El dialogo se cerró con:', result);
        if (result) {
          this.comentarioService.addNewComentario(result.comentario,this.producto.id).subscribe((resultComentario) => {
            if (resultComentario) {
              this.puntuacionSevice.addNewPuntuacion(result.puntuacion,this.producto.id).subscribe((resultPuntuacion) => {
                if (resultPuntuacion)
                {
                  this.comentariospuntuaciones = [];
                  this.comentarioService.obtenerComentariosPorProductoId(this.producto.id).subscribe((comentarios) => {
                    this.comentarios = comentarios;
                    this.puntuacionSevice.obtenerPuntuacionPorProducto(this.producto.id).subscribe((puntuaciones) => {
                      this.puntuaciones = puntuaciones;
                      this.joinComentariosPuntuaciones(this.comentarios,this.puntuaciones);
                      this.calcularPuntuacionMedia();
                    })
                  })
                }
              })
            }
          })
        }
      });
    }

    addPrecio() {
      console.log("pulsado Precios!");
    }

}

