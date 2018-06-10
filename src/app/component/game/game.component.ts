import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../model/game.model';
import {GameService} from '../../service/game.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {GameOverComponent} from '../game-over/game-over.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  game: Game;
  gameSubscription: Subscription;
  isDialogOpen = false;

  constructor(private gameService: GameService,
              public dialog: MatDialog) {
    this.gameSubscription = this.gameService.gameSubject.subscribe(
      (game: Game) => {
        this.checkGameOver(game);
        this.checkClimaticDisorder(game);
        this.game = game;
      }
    );
    this.gameService.emitGame();

    this.dialog.afterAllClosed.subscribe(() => {
      this.isDialogOpen = false;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.gameSubscription.unsubscribe();
  }

  private checkClimaticDisorder(game: Game) {
    if (game.climaticDisorder && !this.isDialogOpen) {
      this.isDialogOpen = true;
      this.dialog.open(DialogComponent, {
        width: '50%',
        height: '80%',
        panelClass: 'custom-dialog-container',
        data: {
          scr: game.climaticDisorder.srcImage,
          title: game.climaticDisorder.title,
          text: game.climaticDisorder.text
        }
      });
    }
  }

  private checkGameOver(game: Game) {
    if (game.gameOver && !this.isDialogOpen) {
      this.isDialogOpen = true;
      this.dialog.open(GameOverComponent, {
        width: '50%',
        height: '80%',
        panelClass: 'custom-dialog-container'
      });
    }
  }
}
