import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClockService } from '../../services/clock.service';

@Component({
  selector: 'time-panel',
  templateUrl: `./time.component.html`
})

export class TimeComponent implements OnInit {
  tick_counter: number;
  tick_delay:number;
  clock_running:boolean;
  tick() {
    this.tick_counter += 1;
   
  }
  constructor(private clock: ClockService) {

    this.tick_counter = 0;
    this.tick_delay = 1;
    
    this.clock = clock;
    this.clock_running = false;
  }
  ngOnInit(): void {
    console.log("Hello ");
    this.clock.Tick_CheckIn(this);
    this.StartClock();
  }


  StartClock(delay = null) {
    this.tick_delay = delay || this.tick_delay;
    this.StopClock();
    this.clock.StartTicker(1000/this.tick_delay);
    this.clock_running=true;
  }
  
  StopClock() {

    this.clock.StopTicker();
    this.clock_running=false;
  }
}