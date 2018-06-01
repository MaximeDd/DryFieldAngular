import {Component, OnInit} from '@angular/core';
import {GameService} from '../service/game.service';

@Component({
  selector: 'app-new-field',
  templateUrl: './new-field.component.html',
  styleUrls: ['./new-field.component.css']
})
export class NewFieldComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

  onAddField() {
    this.gameService.addField();
  }
}
