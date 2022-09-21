import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../interfaces/interfaces';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private juegos: Game[] = [];

  constructor( private http: HttpClient) { }

  getNominados() {

    if(this.juegos.length > 0) {
      //no tenemos juegos
      return of(this.juegos);

    } else {
      return this.http.get<Game[]>(`${environment.url}/api/goty`).pipe(
        tap(juegos => this.juegos = juegos)
      )
    };
  }

  votarJuego( id: string ) {
    return this.http.post(`${environment.url}/api/goty/${id}`, {})
      .pipe(
        catchError( err => {
          return of(err.error);
        } )
      )
  }

}
