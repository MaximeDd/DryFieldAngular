import {Injectable} from '@angular/core';
import {Game} from '../model/game.model';
import {Subject} from 'rxjs';
import {Field} from '../model/field.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  game: Game;
  gameSubject = new Subject<Game>();

  constructor() {
    this.game = new Game();
  }

  emitGame() {
    this.gameSubject.next(this.game);
  }

  startGame() {
    this.game.gameBreak = false;
    setTimeout(
      () => {
        for (const field of this.game.fields) {
          field.age++;
          this.setWaterConsumption(field);
          this.growCrop(field);
        }
      }, 1000
    );
  }

  setWaterConsumption(field: Field) {
    if (field.waterConsumption < 3) {
      field.waterConsumption = (field.age / 9000) + 1;
      field.waterConsumption = +field.waterConsumption.toFixed(3);
    }
  }

  growCrop(field: Field) {
    if (field.stock >= 1) {
      if (field.ripeness < 100) {
        field.ripeness += 5;
        field.stock -= field.waterConsumption;
      }
    } else {
      field.ripeness = 0;
      field.stock = 0;
    }
  }
}
