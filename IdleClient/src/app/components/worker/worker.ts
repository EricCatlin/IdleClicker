import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClockService } from '../../services/clock.service';
import { InventoryService, Resource } from '../../services/inventory.service';
import { UpgradesService } from '../../services/upgrades.service';

@Component({
  selector: 'worker-panel',
  templateUrl: `./worker.html`
})

export class WorkerComponent implements OnInit {
  currency: Resource;
  manager_cost: number;
  workers: Resource;
  managers: Resource;


  auto_workers_power: number;
  auto_workers_cost: number;

  tick() {
    let auto = Math.floor((this.workers.current * this.auto_workers_power) + ((this.managers.current / 10) * this.workers.current));
    if (auto > this.inventory.resources['scrap'].current) { auto = this.inventory.resources['scrap']; }
    if (this.inventory.Spend('scrap', auto)) { this.inventory.IncrementResource('lightbulbs', auto); }

  }
  constructor(private clock: ClockService, private inventory: InventoryService, private upgrades: UpgradesService) {
    this.auto_workers_power = 1;
    this.auto_workers_cost = 5;
    this.manager_cost = 50;
  }

  ngOnInit(): void {
    this.clock.Tick_CheckIn(this);
    this.workers = this.inventory.resources['worker'];
    this.managers = this.inventory.resources['manager'];
    this.currency = this.inventory.resources['currency'];
  }

  IncrementWorker() {
    if (this.inventory.Spend('currency', this.auto_workers_cost)) {
      this.inventory.IncrementResource('worker', 1);
      this.auto_workers_cost = Math.floor(this.auto_workers_cost * 1.1) + 1;
      return;
    }
  }

  IncrementManager() {
    if (this.inventory.Spend('currency', this.manager_cost)) {
      this.inventory.IncrementResource('manager', 1);
      this.manager_cost = Math.floor(this.manager_cost * 1.1);
      return;
    }
  }
}
