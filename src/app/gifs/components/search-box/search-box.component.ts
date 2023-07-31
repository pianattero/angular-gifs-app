import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput') // me permite tomar una referencia local
  tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {} // aca inyecto el servicio

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = ''; // lo 'reinicio', para que se limpie la caja de texto
  }
}
