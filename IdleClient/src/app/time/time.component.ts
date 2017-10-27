import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClockService } from '../clock/clock.service';




@Component({
  selector: 'time-panel',
  templateUrl: `./time.component.html`
})
export class TimeComponent implements OnInit {
  tick_counter: number;



  tick() {
    this.tick_counter += 1;
   
  }
  constructor(private clock: ClockService) {

    this.tick_counter = 0;

    
    this.clock = clock;
  }
  ngOnInit(): void {
    console.log("Hello ");
    this.clock.Tick_CheckIn(this);
    this.StartClock();

  }


  StartClock() {
    this.clock.StartTicker(1000);
  }
  
  StopClock() {
    this.clock.StopTicker();
  }

  UltraSpeed() {
    this.StopClock();
    this.clock.StartTicker(100);
  }

  NormalSpeed(){
    this.StopClock();
    this.clock.StartTicker(1000);
  }


}