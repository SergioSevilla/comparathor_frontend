import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ComparativaService } from '../../services/comparativa.service';
import { subscribe } from 'diagnostics_channel';
import { Comparativa } from '../../entities/comparativa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-comparativas',
  templateUrl: './mis-comparativas.component.html',
  styleUrl: './mis-comparativas.component.scss'
})
export class MisComparativasComponent {

  usuarioId : number = 0;
  comparativas : Comparativa[] = [];

  constructor(private usuarioService: UsuarioService, private comparativaService: ComparativaService,private router: Router) {
    this.usuarioService.obtenerUsuarios().subscribe((usuario) => {
      this.usuarioId = usuario[0].id
      this.comparativaService.getComparativasPorUsuario().subscribe((comparativas) => {
        this.comparativas = comparativas.filter(comparativa => comparativa.usuario == this.usuarioId);
      })
    });
    
  }

  verDetalle(comparativa: Comparativa) {
    this.router.navigate(['/vercomparativa'], { state: { comparativa } });
  }
}
