import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService, Resource } from '../../services/inventory.service';
import { UpgradesService } from '../../services/upgrades.service';
import { ClockService } from '../../services/clock.service';

@Component({
  selector: 'my-games',
  templateUrl: `./game.component.html`
})

export class GameComponent {
  auto_sell: boolean;

  demand: number;
  cost: number;
  marketing: number;



  tick() {
    this.demand = (this.marketing / (Math.pow(this.cost * 10, 1.15))) ;
    if (this.auto_sell && Math.random() < (this.demand)) {
      this.sellLights((Math.random() * this.demand * 10));
    }
  }
  sellLights(amount: number) {
    amount = Math.floor(amount);
    if (this.inventory.resources['lightbulbs'].current < amount) { amount = this.inventory.resources['lightbulbs'].current; }
    this.inventory.SpendResource('lightbulbs', amount);
    this.inventory.IncrementResource('currency', amount * this.cost);
  }

  constructor(private clock: ClockService, private inventory: InventoryService, private upgrades: UpgradesService) {
    this.demand = 0.5;
    this.cost = 0.1;
    this.marketing = 1;
    this.auto_sell = true;
    clock.Tick_CheckIn(this);
  }
}
