import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClockService } from '../../services/clock.service';
import { InventoryService, Resource } from '../../services/inventory.service';

@Component({
  selector: 'worker-panel',
  templateUrl: `./worker.component.html`
})

export class WorkerComponent implements OnInit {
  currency: Resource;
  manager_cost: number;
  workers: Resource;
  managers: Resource;


  auto_workers_power: number;
  auto_workers_cost: number;

  tick() {
    const auto = Math.floor((this.workers.current * this.auto_workers_power) + ((this.managers.current / 10) * this.workers.current));
    this.inventory.IncrementResource('lightbulbs', auto);
  }
  constructor(private clock: ClockService, private inventory: InventoryService) {
    this.auto_workers_power = 1;
    this.auto_workers_cost = 50;

    this.manager_cost = 100;
  }
  ngOnInit(): void {
    this.clock.Tick_CheckIn(this);

    this.workers = this.inventory.resources['worker'];
    this.managers = this.inventory.resources['manager'];
    this.currency = this.inventory.resources['currency']; 

  }
  IncrementWorker() {
    if (this.inventory.Purchase('currency', this.auto_workers_cost)) {
      this.inventory.IncrementResource("worker", 1);
      this.auto_workers_cost = Math.floor(this.auto_workers_cost * 1.1);
      return;
    }
  }

  IncrementManager() {
    if (this.inventory.Purchase('currency', this.manager_cost)) {
      this.inventory.IncrementResource("manager", 1);
      this.manager_cost = Math.floor(this.manager_cost * 1.1);
      return;
    }
  }
}