import {Field} from './field.model';
import {ClimaticDisorder} from './climaticDisorder';

export class Game {
  money: number;
  harvestNumber: number;
  waterStock: number;
  gameBreak: boolean;
  fields: Field[];
  time: number;
  climaticDisorder: ClimaticDisorder;
  gameOver: boolean;

  constructor() {
    this.money = 50;
    this.harvestNumber = 0;
    this.waterStock = 3;
    // this.waterStock = 20;
    this.gameBreak = true;
    this.fields = [];
    this.fields.push(new Field());
    this.fields.push(new Field());
    this.fields.push(new Field());
    this.time = 0;
    this.gameOver = false;
  }
}
