import {Injectable} from '@angular/core';
import {Game} from '../model/game.model';
import {Subject} from 'rxjs';
import {Field} from '../model/field.model';
import {ClimaticDisorder} from '../model/climaticDisorder';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  game: Game;
  gameSubject = new Subject<Game>();

  constructor() {
    this.launchGame();
  }

  private launchGame() {
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
            this.game.fields.forEach(field => {
              field.age++;
              this.setWaterConsumption(field);
              this.growCrop(field);
            });
          } else {
            this.breakOrPlay();
            this.game.gameOver = true;
          }
          this.generateClimaticDisorder();
        }
        this.emitGame();
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

  generateClimaticDisorder() {
    const nRandom = Math.floor(Math.random() * 1500);
    // const nRandom = Math.floor(Math.random() * 15);
    switch (nRandom) {
      case 1 :
        this.game.climaticDisorder = new ClimaticDisorder(
          '../../assets/images/seisme.jpg',
          'La terre a tremblée!',
          'Vous avez perdu un champs...'
        );
        this.game.fields.pop();
        this.breakOrPlay();
        break;
      case 2 :
        this.game.climaticDisorder = new ClimaticDisorder(
          '../../assets/images/circle.jpg',
          'Les ovnis vous ont rendu visite!',
          'Vous avez perdu vos cultures mais vous avez vendu les photos à CNN et gagné 25€...'
        );
        this.game.money += 25;
        this.game.fields.forEach(field => field.ripeness = 0);
        this.breakOrPlay();
        break;
      case 3 :
        this.game.climaticDisorder = new ClimaticDisorder(
          '../../assets/images/inondation.jpg',
          'L\'eau est montée!',
          'Vous avez gagné 5 litres d\'eau par champs mais vos récoltes sont perdues...'
        );
        this.game.fields.forEach(field => {
          field.ripeness = 0;
          field.stock += 5;
        });
        this.breakOrPlay();
        break;
      case 4 :
        this.game.climaticDisorder = new ClimaticDisorder(
          '../../assets/images/tornade.jpg',
          'Le blé vole!',
          'Vos récoltes sont perdues...'
        );
        this.game.fields.forEach(field => field.ripeness = 0);
        this.breakOrPlay();
        break;
      case 5 :
        this.game.climaticDisorder = new ClimaticDisorder(
          '../../assets/images/eauContaminee.jpg',
          'L\'eau est contaminée!',
          'Vous avez perdu votre stock d\'eau...'
        );
        this.game.waterStock = 0;
        this.breakOrPlay();
        break;
    }

  }

  breakOrPlay() {
    this.game.gameBreak = !this.game.gameBreak;
    if (this.game.gameOver) {
      this.launchGame();
    }
  }
}
