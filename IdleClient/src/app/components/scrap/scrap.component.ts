import { Component, Input } from '@angular/core';
import { InventoryService, Resource } from '../../services/inventory.service';
import { UpgradesService, Upgrade } from '../../services/upgrades.service';
import { ClockService } from '../../services/clock.service';

@Component({
  selector: 'scrap-panel',
  templateUrl: `./scrap.component.html`
})

export class ScrapComponent {
  scrap_cost: number;
  constructor(private clock: ClockService, private inventory: InventoryService, private upgrades: UpgradesService) {
    this.scrap_cost = 5;
  }

  BuyScrap(x: number) {
    if (this.inventory.Spend('currency', this.scrap_cost)) {
      this.inventory.IncrementResource('scrap', x);
      this.scrap_cost = Math.floor(Math.random() * 5) + 5;
    }
  }
}
