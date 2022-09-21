import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  juegos: any[] =[];

  constructor(private db: AngularFirestore)  { }

  ngOnInit(): void {

    this.db.collection('goty').valueChanges()
      .pipe(
        map( (resp: any[]) => {

          // ACEPTA LAS DOS FORMAS
          // return resp.map(({ name, votos }) => ({ name, value: votos }))

          return resp.map( juego => {
            return {
            name: juego.name,
            value: juego.votos
          }
          })
        })
      )
      .subscribe( juegos => {
        //console.log(juegos);
        this.juegos = juegos;
      } )

  }

}
