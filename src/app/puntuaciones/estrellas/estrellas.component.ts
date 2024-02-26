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
    this.selectedRating = this.puntuacion;

  }

  selectStar(value: number): void{


  }

}