import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClockService } from '../clock/clock.service';

@Component({
  selector: 'time-panel',
  templateUrl: `./time.component.html`
})

export class TimeComponent implements OnInit {
  tick_counter: number;
  tick_delay:number;
  
  tick() {
    this.tick_counter += 1;
   
  }
  constructor(private clock: ClockService) {

    this.tick_counter = 0;
    this.tick_delay = 1;
    
    this.clock = clock;
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
  }
  
  StopClock() {
    this.clock.StopTicker();
  }
}