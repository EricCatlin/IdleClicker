import { Component, Input } from '@angular/core';
import { InventoryService, Resource } from '../../services/inventory.service';
import { UpgradesService, Upgrade, IUpgradable } from '../../services/upgrades.service';
import { ClockService } from '../../services/clock.service';
import { Upgrades } from './upgrades';

@Component({
  selector: 'make-panel',
  templateUrl: `./make.component.html`
})

export class MakeComponent implements IUpgradable {
  upgrade_list: Upgrade[];


  MakeLightbulb() {
    if (this.inventory.Spend('scrap', 1)) {
      this.inventory.IncrementResource('lightbulbs', this.ClickerUpgradePowers(1)); this.AnalyzeClick();
    }
  }


  constructor(private clock: ClockService, private inventory: InventoryService, private upgrades: UpgradesService) {
    this.upgrade_list = Upgrades;
  }
  AnalyzeClick() {
    if (!this.upgrades.owned_upgrades['10LIGHTBULBS'] && this.inventory.resources['lightbulbs'].total > 10) {
      this.upgrades.owned_upgrades['10LIGHTBULBS'] = true;
    }
    if (!this.upgrades.owned_upgrades['100LIGHTBULBS'] && this.inventory.resources['lightbulbs'].total > 100) {
      this.upgrades.owned_upgrades['100LIGHTBULBS'] = true;
    }
    if (!this.upgrades.owned_upgrades['1000LIGHTBULBS'] && this.inventory.resources['lightbulbs'].total > 1000) {
      this.upgrades.owned_upgrades['1000LIGHTBULBS'] = true;
    }
  }

  ClickerUpgradePowers = function (input: number) {
    let output = input;
    if (this.upgrades.owned_upgrades['TRPLCLICK']) { output *= 3; }
    if (this.upgrades.owned_upgrades['DBLCLICK']) { output *= 2; }
    return output;
  };

}
