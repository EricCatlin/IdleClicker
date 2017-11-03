import { Component, Input, OnInit } from '@angular/core';
import { InventoryService, Resource } from '../../services/inventory.service';
import { UpgradesService, Upgrade, IUpgradable, IUpgrades } from '../../services/upgrades.service';

import { ClockService } from '../../services/clock.service';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'upgrade-panel',
  templateUrl: `./upgrade.component.html`
})

export class UpgradeComponent implements OnInit, IUpgrades {
  upgrade_list: Upgrade[];
  offered_upgrades: Upgrade[] = [];
  owned_upgrades: Object;
  @Input() upgrade_target: IUpgradable;
  ngOnInit(): void {
  }
  AddUpgrade(offer: Upgrade) {
    throw new Error("Method not implemented.");
  }
  constructor(private inventory: InventoryService, private upgrades: UpgradesService) {
    this.offered_upgrades = [];
    this.owned_upgrades = {};
    this.upgrade_list = [];
    this.owned_upgrades = [];
  }
}

