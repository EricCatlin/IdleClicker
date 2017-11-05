import { Injectable } from '@angular/core';

@Injectable()
export class UpgradesService {
  owned_upgrades: Object;
  constructor(){
    this.owned_upgrades = {};
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
  upgrade_list: Upgrade[];
  UpgradeCallback: Function;
}

export interface IUpgrades {
  upgrade_list: Upgrade[];
  offered_upgrades: Upgrade[];
  AddUpgrade(offer: Upgrade);
}

