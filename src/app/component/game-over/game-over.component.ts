import {Component, Input, OnInit} from '@angular/core';
import {GameService} from '../../service/game.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent implements OnInit {

  constructor(private gameService: GameService,
              private router: Router,
              public dialogRef: MatDialogRef<GameOverComponent>) {
  }

  @Input()
  pseudo: string;

  ngOnInit() {
  }

  saveScore() {
    console.log(this.pseudo + ' : ' + this.gameService.game.harvestNumber);
    this.dialogRef.close();
    this.router.navigate(['score']);
  }
}
