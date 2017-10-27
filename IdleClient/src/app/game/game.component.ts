import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClockService } from '../clock/clock.service';




@Component({
  selector: 'my-games',
  templateUrl: `./game.component.html`
})
export class GameComponent implements OnInit {
  total: number;
  current: number;
  previous: number;


  auto_workers: number;
  auto_workers_power: number;
  auto_workers_cost: number;

  tick() {
    let auto = this.auto_workers * this.auto_workers_power;
    this.Increment(auto);
    this.previous = this.current;
  }
  constructor(private clock: ClockService) {
    this.current = 100;
    this.total = this.current;
    this.previous = 0;

    this.auto_workers = 0;
    this.auto_workers_power = 1;
    this.auto_workers_cost = 50;

    this.clock = clock;
  }
  ngOnInit(): void {
    console.log("Hello ");
    this.clock.Tick_CheckIn(this);
  }
  Increment(amount: number) {
    this.current += amount;
    this.total += amount;
  }

  
  IncrementAutoWorker(amount: number) {
    this.current -= this.auto_workers_cost;
    this.auto_workers += amount;
    this.auto_workers_cost = Math.floor(this.auto_workers_cost * 1.3);
  }

}