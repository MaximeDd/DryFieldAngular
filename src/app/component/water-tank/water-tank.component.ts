import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../model/game.model';
import {GameService} from '../../service/game.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-water-tank',
  templateUrl: './water-tank.component.html',
  styleUrls: ['./water-tank.component.css']
})
export class WaterTankComponent implements OnInit, OnDestroy {
  waterPopInShow = false;
  buyWaterForm: FormGroup;
  moneyBag = [];
  game: Game;
  gameSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private gameService: GameService) {
    this.gameSubscription = this.gameService.gameSubject.subscribe(
      (game: Game) => {
        this.game = game;
      }
    );
    this.gameService.emitGame();
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.buyWaterForm = this.formBuilder
      .group({
        quantity: ['1', Validators.required]
      });
  }

  ngOnDestroy(): void {
    this.gameSubscription.unsubscribe();
  }

  onCloseWaterPopIn() {
    this.waterPopInShow = false;
  }

  onOpenWaterPopIn() {
    for (let i = 1; i <= this.game.money; i++) {
      this.moneyBag.push(i);
    }
    this.waterPopInShow = true;
  }

  onBuyWater() {
    const selectedWaterQuantity = this.buyWaterForm.get('quantity').value;
    this.gameService.buyWater(+selectedWaterQuantity);
    this.onCloseWaterPopIn();
  }
}
