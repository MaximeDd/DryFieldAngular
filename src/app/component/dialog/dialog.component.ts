import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GameService} from '../../service/game.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  sourceImage: string;
  title: string;
  text: string;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private gameService: GameService) {
    this.sourceImage = this.data.scr;
    this.text = this.data.text;
    this.title = this.data.title;
  }

  ngOnInit() {
  }

  onCloseDialog() {
    this.gameService.game.climaticDisorder = undefined;
    this.gameService.breakOrPlay();
    this.dialogRef.close();
  }
}
