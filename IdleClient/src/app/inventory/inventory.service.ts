import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ClockService } from '../clock/clock.service'
@Injectable()
export class InventoryService {

  IncrementResource(name: string, amount: number) {
    let resource = this.resources[name];
    if (!resource) { console.error("Resource not found"); return; }
    resource.current += amount;
    resource.total += amount;
  }

  Purchase(name: string, amount: number): boolean {
    let resource = this.resources[name];
    if (!resource) { console.error("Resource not found"); return; }
    if (resource.current >= amount) {
      resource.current -= amount;
      return true;
    }else{
      return false;
    }
  }


  resources: {};


  tick() {
    Object.keys(this.resources).forEach(key => {
      this.tick_resource(this.resources[key]);
    });
  }
  constructor(private clock: ClockService) {
    this.resources = {};
    this.resources["currency"] = new Resource("currency", 100);
    this.resources["paperclips"] = new Resource("paperclips", 1000);
    this.resources["worker"] = new Resource("worker", 0);
    this.resources["manager"] = new Resource("manager", 0);


    clock.Tick_CheckIn(this);
  }
  tick_resource(resource: Resource) {
    resource.delta = resource.current - resource.previous;
    resource.previous = resource.current;
  }
}

export class Resource {
  name: string;
  current: number;
  previous: number;
  delta: number;
  total: number;

  constructor(name: string, current: number) {
    this.name = name;
    this.current = current;
  }
}