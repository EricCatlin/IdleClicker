import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClockService } from '../../services/clock.service';
import { InventoryService, Resource } from '../../services/inventory.service';
import { UpgradesService, IUpgradable, Upgrade } from '../../services/upgrades.service';
import { Upgrades } from './upgrades';

@Component({
  selector: 'worker-panel',
  templateUrl: `./worker.html`
})

export class WorkerComponent implements OnInit, IUpgradable {
  upgrade_list: Upgrade[];
  currency: Resource;
  manager_base_cost: number;
  workers: Resource;
  managers: Resource;
  auto_workers_power: number;
  auto_worker_base_cost: number;

  tick() {
    let auto = Math.floor((this.workers.current * this.auto_workers_power) + ((this.managers.current / 10) * this.workers.current));
    
    let auto_cost = this.upgrades.owned_upgrades['Recycling'] ? auto/2 : auto ;
    auto_cost = this.upgrades.owned_upgrades['Recycling+'] ? auto_cost/2 : auto_cost;
    
    //if (auto_cost > this.inventory.resources['scrap'].current) { auto_cost = this.inventory.resources['scrap']; }
    if (this.inventory.Spend('scrap', auto_cost)) { this.inventory.IncrementResource('lightbulbs', auto); }
  }
  constructor(private clock: ClockService, private inventory: InventoryService, private upgrades: UpgradesService) {
    this.auto_workers_power = 1;
    this.auto_worker_base_cost = 5;
    this.manager_base_cost = 50;
    this.upgrade_list = Upgrades;
  }

  ngOnInit(): void {
    this.clock.Tick_CheckIn(this);
    this.workers = this.inventory.resources['worker'];
    this.managers = this.inventory.resources['manager'];
    this.currency = this.inventory.resources['currency'];
  }

  AutoWorkerCostCalculator() {
    return this.auto_worker_base_cost + Math.pow(this.inventory.resources['worker'].current, 1.3);
  }

  IncrementWorker() {
    if (this.inventory.Spend('currency', this.AutoWorkerCostCalculator())) {
      this.inventory.IncrementResource('worker', 1);
      return;
    }
  }

  ManagerCostCalculator() {
    return this.manager_base_cost + (Math.pow(this.inventory.resources['manager'].current, 2));
  }

  IncrementManager() {
    if (this.inventory.Spend('currency', this.ManagerCostCalculator())) {
      this.inventory.IncrementResource('manager', 1);
      return;
    }
  }
}
