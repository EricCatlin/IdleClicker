import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClockService } from '../clock/clock.service';
import { InventoryService } from '../inventory/inventory.service';

@Component({
  selector: 'worker-panel',
  templateUrl: `./worker.component.html`
})

export class WorkerComponent implements OnInit {
  manager_count: number;
  manager_cost: number;

  worker_count: number;
  auto_workers_power: number;
  auto_workers_cost: number;

  tick() {
    let auto = Math.floor((this.worker_count * this.auto_workers_power) + ((this.manager_count/10) * this.worker_count));
    this.inventory.IncrementResource(auto);
  }
  constructor(private clock: ClockService, private inventory: InventoryService) {
    this.worker_count = 0;
    this.auto_workers_power = 1;
    this.auto_workers_cost = 50;

    this.manager_count=0;
    this.manager_cost=100;

    this.clock = clock;
    this.inventory = inventory;
  }
  ngOnInit(): void {
    console.log("Hello ");
    this.clock.Tick_CheckIn(this);
  }
  IncrementWorker() {
     this.inventory.current_resource -= this.auto_workers_cost;
     this.worker_count++;
     this.auto_workers_cost = Math.floor(this.auto_workers_cost * 1.1);
   }
   
   IncrementManager() {
    this.inventory.current_resource -= this.manager_cost;
    this.manager_count++;
    this.manager_cost = Math.floor(this.manager_cost * 1.3);
  }
}