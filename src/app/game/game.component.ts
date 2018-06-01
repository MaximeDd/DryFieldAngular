import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../model/game.model';
import {GameService} from '../service/game.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  game: Game;
  gameSubscription: Subscription;

  constructor(private gameService: GameService) {
    this.gameSubscription = this.gameService.gameSubject.subscribe(
      (game: Game) => {
        this.game = game;
      }
    );
    this.gameService.emitGame();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.gameSubscription.unsubscribe();
  }
}
