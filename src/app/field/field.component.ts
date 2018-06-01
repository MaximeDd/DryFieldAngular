import {Component, Input, OnInit} from '@angular/core';
import {Field} from '../model/field.model';
import {GameService} from '../service/game.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  @Input()
  field: Field;

  @Input()
  quickIrrigation = false;

  constructor(private gameService: GameService) {
  }

  floor(num: number) {
    const floor = Math.floor(num);
    return floor > 0 ? floor : 0;
  }

  ngOnInit() {
  }

  onIrrigate() {
    this.gameService.irrigate(this.field);
  }

  onHarvest() {
    this.gameService.harvest(this.field);
  }
}
