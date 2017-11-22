import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ClockService } from './clock.service';
@Injectable()
export class InventoryService {
  resources: {};
  resource_keys: string[];

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

  Spend(name: string, amount: number): boolean {
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
    this.resources['currency'] = new Resource('currency', 5);
    this.resources['lightbulbs'] = new Resource('lightbulbs', 0);
    this.resources['scrap'] = new Resource('scrap', 5000);
    this.resources['worker'] = new Resource('worker', 0);
    this.resources['manager'] = new Resource('manager', 0);
    this.resources['marketer'] = new Resource('marketer', 1);
    
    this.resource_keys = Object.keys(this.resources);

    clock.Tick_CheckIn(this);
  }
  tick_resource(resource: Resource) {
    resource.delta = resource.current - resource.previous;
    resource.previous = resource.current;
    if (resource.price_history.length > this.clock.ticks_per_second) {
      resource.price_history.splice(0,  resource.price_history.length- this.clock.ticks_per_second   );
    }
    else {
      resource.price_history.push(resource.delta);
      resource.rolling_average = (resource.price_history.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
      }) / this.clock.ticks_per_second);

    }
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

export interface IPurchasable {
  cost: number;
  cost_key: string;
}