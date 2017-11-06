import { Component, Input, OnInit } from '@angular/core';
import { InventoryService, Resource } from '../../services/inventory.service';
import { UpgradesService, Upgrade, IUpgradable, IUpgrades } from '../../services/upgrades.service';

import { ClockService } from '../../services/clock.service';
import { CurrencyPipe } from '@angular/common';
import { EventEmitter } from 'events';


@Component({
  selector: 'upgrade-panel',
  templateUrl: `./upgrades.component.html`
})

export class UpgradeComponent implements IUpgrades {
  @Input() upgrade_list: Upgrade[];
  @Input() callback: IUpgradable;
  owned_upgrade_array: Upgrade[];
  offered_upgrades: Upgrade[];

  AddUpgrade(upgrade: Upgrade) {
    if (this.inventory.Purchase(upgrade.cost_resource_key, upgrade.cost)) {
      this.upgrades.owned_upgrades[upgrade.id] = true;
      this.owned_upgrade_array.push(upgrade);
      this.upgrade_list.splice(this.upgrade_list.indexOf(upgrade), 1);
      if (this.callback) { this.callback.UpgradeCallback(upgrade); }

    }
  }

  constructor(private inventory: InventoryService, private upgrades: UpgradesService) {
    this.owned_upgrade_array = [];
  }
}

