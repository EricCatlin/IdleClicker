import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ClockService } from './clock.service'
import { InventoryService, Resource } from './inventory.service'

@Injectable()
export class UpgradesService {
  upgrades: Upgrade[];
  owned: Object;

  Unlock(upgrade: Upgrade): boolean {
    if (this.inventory.Purchase(upgrade.cost_resource_key, upgrade.cost)){
      upgrade.owned = true;
      this.owned[upgrade.id] = true;
    
    }
    return this.owned[upgrade.id];
  }

  constructor(private clock: ClockService, private inventory: InventoryService) {
    this.upgrades = [];
    this.upgrades.push(new Upgrade('HLVCOOL', 'Half-Cooldowns', 'Halves the cook', 100, 'currency'));
  }
}

export interface IUpgrade {
  name: string;
  description: string;
  cost: number;
  cost_resource_key: string;
  unlocked: boolean;
  owned: boolean;
  id: string;
}
export class Upgrade implements IUpgrade {
  name: string;
  description: string;
  cost: number;
  cost_resource_key: string;
  owned: boolean;
  unlocked: boolean;
  id: string;
  constructor(id: string, name: string, description: string, cost: number, cost_resource_key: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.cost_resource_key = cost_resource_key;
    this.owned = false;
    this.unlocked = false;
  }
}
export interface IUpgradable {
  owned_upgrades: Object;
  upgrade_list: Upgrade[];
  UpgradeCallback: Function;
}

export interface IUpgrades {
  owned_upgrades: Object;
  upgrade_list: Upgrade[];
  offered_upgrades: Upgrade[];
  AddUpgrade(offer: Upgrade);
}

