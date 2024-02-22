import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-estrellas',
  templateUrl: './estrellas.component.html',
  styleUrl: './estrellas.component.scss'
})

export class EstrellasComponent implements OnInit {
  @Input() puntuacion: number;


  selectedRating = 0;
  stars = [
    {
      id: 1,
      icon: 'star'
    },
    {
      id: 2,
      icon: 'star'
    },
    {
      id: 3,
      icon: 'star'
    },
    {
      id: 4,
      icon: 'star'
    },
    {
      id: 5,
      icon: 'star'
    }

  ];

  constructor() {}

  ngOnInit(): void {
    console.log("entra en init con valor "+this.puntuacion);
    this.selectedRating = this.puntuacion;
    //this.selectStar(this.selectedRating);
  }

  selectStar(value: number): void{


  }

}