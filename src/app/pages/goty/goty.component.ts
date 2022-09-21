import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/interfaces';
import { GameService } from '../../services/game.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];

  constructor( private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getNominados().subscribe( juegos => {
      console.log(juegos);
      this.juegos = juegos;
    })
  }

  votarJuego ( juego: Game) {
    this.gameService.votarJuego( juego.id )
    .subscribe((resp: any)=> {
        if ( resp.ok ) {
          Swal.fire('Gracias', resp.mensaje, 'success');
        } else {
          Swal.fire('Uppsss', resp.mensaje, 'error');
        }
      }
    )
  }

}
