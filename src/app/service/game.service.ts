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
    this.run();
  }

  emitGame() {
    this.gameSubject.next(this.game);
  }

  run() {
    setInterval(
      () => {
        if (!this.game.gameBreak) {
          if (!this.isGameOver()) {
            this.game.time++;
            for (const field of this.game.fields) {
              field.age++;
              this.setWaterConsumption(field);
              this.growCrop(field);
            }
          } else {
            this.game.gameBreak = true;
          }
        }
      }, 1000
    );
  }

  isGameOver() {
    for (const field of this.game.fields) {
      if (field.stock + field.ripeness / 5 + this.game.money + this.game.waterStock >= 20) {
        return false;
      }
    }
    return true;
  }

  changeStateGame() {
    this.game.gameBreak = !this.game.gameBreak;
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

  irrigate(field: Field) {
    this.game.gameBreak = false;
    if (this.game.waterStock > 0) {
      this.game.waterStock--;
      field.stock++;
    }
  }

  harvest(field: Field) {
    if (field.ripeness >= 100) {
      this.game.money += 40;
      field.ripeness = 0;
      this.game.harvestNumber++;
    }
  }

  addField() {
    if (this.game.money >= 25) {
      this.game.money -= 25;
      this.game.fields.push(new Field());
    }
  }

  buyWater(selectedWaterQuantity: number) {
    if (this.game.money >= selectedWaterQuantity) {
      this.game.money -= selectedWaterQuantity;
      this.game.waterStock += selectedWaterQuantity;
    }
  }
}
