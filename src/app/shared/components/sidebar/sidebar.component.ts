import { Component, Output } from '@angular/core';

import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) {}

  // como el servicio lo tengo privado, tengo que crearme un get para poder llamarlo/utilizarlo en el html

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  };

  repeatSearch(tag: string): void {
    this.gifsService.searchTag(tag)
  }

}
