import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ClockService } from './clock.service';
import { IPurchasable } from './upgrades.service';
@Injectable()
export class InventoryService {
  resources: {};

  SpendResource(name: string, amount: number) {
    const resource = this.resources[name];
    if (!resource) { console.error('Resource not found'); return; }
    resource.current -= amount;
  }

  IncrementResource(name: string, amount: number) {
    const resource = this.resources[name];
    if (!resource) { console.error('Resource not found'); return; }
    resource.current += amount;
    resource.total += amount;
  }

  Purchase(name: string, amount: number): boolean {
    amount = Math.floor(amount);

    const resource = this.resources[name];
    if (!resource) { console.error('Resource not found'); return; }
    if (resource.current >= amount) {
      resource.current -= amount;
      return true;
    } else {
      return false;
    }
  }

  purchaseCostMet(purchasable: IPurchasable): boolean {
    if (purchasable.cost && purchasable.cost_key) {
      if (!this.resources[purchasable.cost_key]) { return false; } // do not yet own that type of resource
      if (this.resources[purchasable.cost_key].current < purchasable.cost) { return false; } // do not own enough of that resource
    }
    return true;
  }

  tick() {
    Object.keys(this.resources).forEach(key => {
      this.tick_resource(this.resources[key]);
    });
  }

  constructor(private clock: ClockService) {
    this.resources = {};
    this.resources['currency'] = new Resource('currency', 400);
    this.resources['lightbulbs'] = new Resource('lightbulbs', 400);
    this.resources['glass'] = new Resource('glass', 400);
    this.resources['wire'] = new Resource('wire', 400);
    this.resources['worker'] = new Resource('worker', 0);
    this.resources['manager'] = new Resource('manager', 0);


    clock.Tick_CheckIn(this);
  }
  tick_resource(resource: Resource) {
    resource.delta = resource.current - resource.previous;
    resource.previous = resource.current;
    resource.price_history.push(resource.delta);
    if (resource.price_history.length > 60) { resource.price_history.splice(0, 1); }
    resource.rolling_average = (resource.price_history.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }) / 60);
  }
}

export interface IResource {
  name: string;
  current: number;
  previous: number;
  delta: number;
  total: number;
  icon: string;
}
export class Resource implements IResource {
  rolling_average: number;
  price_history: number[];
  name: string;
  current: number;
  previous: number;
  delta: number;
  total: number;
  icon: string;

  constructor(name: string, current: number, icon: string = '') {
    this.name = name;
    this.current = current;
    this.icon = icon;
    this.total = current;
    this.price_history = [];
  }
}

