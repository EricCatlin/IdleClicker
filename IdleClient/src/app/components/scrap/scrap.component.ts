import { Component, Input, OnInit } from '@angular/core';
import { InventoryService, Resource } from '../../services/inventory.service';
import { Upgrade, UpgradesService } from '../../services/upgrades.service';
import { ClockService } from '../../services/clock.service';
import { Upgrades } from './upgrades';

@Component({
  selector: 'scrap-panel',
  templateUrl: `./scrap.component.html`
})

export class ScrapComponent implements OnInit {
  scrap_cost: number;
  upgrade_list: Upgrade[];

  constructor(private clock: ClockService, private inventory: InventoryService, private upgrades: UpgradesService) {
    this.scrap_cost = 5;
    this.upgrade_list = Upgrades;
  }
  ngOnInit(): void {
    this.clock.Tick_CheckIn(this);
  }
  tick() {
    this.scrap_cost = this.clamp(this.scrap_cost + this.clock.Rando - 0.5, 5, 25);
  }
  clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
  }

  BuyScrap(x: number) {
    if (this.inventory.Spend('currency', this.scrap_cost)) {
      if (this.upgrades.owned_upgrades["Bigger Truck"]) x *= 2;
      if (this.upgrades.owned_upgrades["Even Bigger Truck"]) x *= 2;

      this.inventory.IncrementResource('scrap', x);
      this.scrap_cost++;
    }
  }
}
