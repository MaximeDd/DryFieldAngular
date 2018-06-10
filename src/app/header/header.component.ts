import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from '../service/game.service';
import {Game} from '../model/game.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
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

  onPlayGame() {
    this.gameService.breakOrPlay();
  }
}
