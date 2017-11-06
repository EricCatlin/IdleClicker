import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ClockService } from './clock.service'
@Injectable()
export class InventoryService {
  resources: {};

  IncrementResource(name: string, amount: number) {
    const resource = this.resources[name];
    if (!resource) { console.error('Resource not found'); return; }
    resource.current += amount;
    resource.total += amount;
  }

  Purchase(name: string, amount: number): boolean {
    const resource = this.resources[name];
    if (!resource) { console.error('Resource not found'); return; }
    if (resource.current >= amount) {
      resource.current -= amount;
      return true;
    } else {
      return false;
    }
  }

  tick() {
    Object.keys(this.resources).forEach(key => {
      this.tick_resource(this.resources[key]);
    });
  }

  constructor(private clock: ClockService) {
    this.resources = {};
    this.resources['currency'] = new Resource('currency', 90);
    this.resources['lightbulbs'] = new Resource('lightbulbs', 0, 'fa fa-lightbulb');
    this.resources['worker'] = new Resource('worker', 0);
    this.resources['manager'] = new Resource('manager', 0);


    clock.Tick_CheckIn(this);
  }
  tick_resource(resource: Resource) {
    resource.delta = resource.current - resource.previous;
    resource.previous = resource.current;
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
  }
}

