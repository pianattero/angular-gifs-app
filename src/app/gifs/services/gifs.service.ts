import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'eyLUvD1RLUzq0lfnWYXXfTkPmgMOHq28';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    // lo importo para poder hacer peticiones http (en este caso, a la api de gifs)
    this.loadLocalStorage();
    // lo llamo para tomar el historial guardado en el local storage
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  };

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
      // en caso de que se mande el mismo tag más de una vez, con esto borro el primer tag buscado
    };

    this._tagsHistory.unshift(tag);
    // y con esto pongo ese mismo tag al inicio de la búsqueda (elimino el repetido viejo y solo dejo el reciente)

    this._tagsHistory = this.tagsHistory.splice(0, 10);
    // para que mi lista no se alargue mucho, que quede en máximo 10 items

    this.saveLocalStorage();
    // así guardi cualquier cambio en el local storage (no se ve reflejado en la web, pero si me voy al local storage esta la info guardada)
  };

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  };

  private loadLocalStorage():void {
    if( !localStorage.getItem('history') ) return

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!) // con el "!" le digo que siempre va a recibir esta data

    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);

  };

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)



    this.http.get<SearchResponse>(`${this.serviceUrl}/search?`, { params })
      .subscribe((res) => {

        this.gifsList = res.data
      }) // me subscribo para escuchar la respuesta, no uso .then por en este caso no es una promesa

  };

}
