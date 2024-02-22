import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-comentario',
  templateUrl: './card-comentario.component.html',
  styleUrl: './card-comentario.component.scss'
})
export class CardComentarioComponent {
  @Input() puntuacion: number;
  @Input() comentario: string;
  @Input() usuario: string;
}
