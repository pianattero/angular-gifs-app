import { Component, Input, OnInit } from '@angular/core';

import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  // el OnInit es un método especial de anfular que se ejecuta cuando el componente se esta inicializando. Sirve para revisar partes de nuestro componente.

  @Input()
  public gif!: Gif

  ngOnInit(): void {
    if(!this.gif) throw new Error('Gif property is required.');
  } // Dejo el curso en CardComponent y hago 'command' + '.' y clickeo en 'Implement interface OnInit' para que me lance la función en caso de haber un error, para validación.
}
