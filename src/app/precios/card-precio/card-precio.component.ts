import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-precio',
  templateUrl: './card-precio.component.html',
  styleUrl: './card-precio.component.scss'
})
export class CardPrecioComponent {
  @Input() origen: number;
  @Input() precio: number;
  @Input() url: string;
  pathToImg : string ="";


  ngOnInit(): void {
    this.pathToImg = "assets/images/proveedores/"+this.origen+".png";
  }

}
