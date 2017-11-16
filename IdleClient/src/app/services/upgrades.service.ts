import { Injectable } from '@angular/core';

@Injectable()
export class UpgradesService {
  owned_upgrades: Object;
  constructor() {
    this.owned_upgrades = {};
  }

  // Checks if a purchase meets upgrade requirements
  canPurchase(upgrade: Upgrade): boolean {
    let to_return = true;
    to_return = this.purchaseDependenciesMet(upgrade);
    return to_return;
  }
  purchaseDependenciesMet(upgrade: Upgrade): boolean {
    let to_return = true;
    if (upgrade.requires && upgrade.requires.length > 0) {
      const keys = Object.keys(this.owned_upgrades);
      to_return = upgrade.requires.every(item => (keys.indexOf(item) !== -1));
    }
    return to_return;
  }

}




export class Upgrade implements IPurchasable {
  name: string;
  description: string;
  id: string;
  cost: number;
  cost_key: string;
  requires: string[];
  constructor(id: string, name: string, description: string, cost: number, cost_key: string, requires: string[] = null) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.cost_key = cost_key;
    this.requires = requires;
  }
}

export interface IUpgrades {
  upgrade_list: Upgrade[];
  offered_upgrades: Upgrade[];
  AddUpgrade(offer: Upgrade);
}

export interface IPurchasable {
  cost: number;
  cost_key: string;
}

