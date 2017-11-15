import { Injectable } from '@angular/core';

@Injectable()
export class UpgradesService {
  owned_upgrades: Object;
  constructor() {
    this.owned_upgrades = {};
  }
}

export interface IUpgrade {
  name: string;
  description: string;
  cost: number;
  cost_resource_key: string;
  id: string;
}

export class Upgrade implements IUpgrade {
  name: string;
  description: string;
  cost: number;
  cost_resource_key: string;
  id: string;
  requires: string[];
  constructor(id: string, name: string, description: string, cost: number, cost_resource_key: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.cost_resource_key = cost_resource_key;
  }
}

export interface IUpgrades {
  upgrade_list: Upgrade[];
  offered_upgrades: Upgrade[];
  AddUpgrade(offer: Upgrade);
}

