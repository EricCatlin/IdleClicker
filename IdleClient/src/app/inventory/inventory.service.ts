import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ClockService } from '../clock/clock.service'
@Injectable()
export class InventoryService {

  IncrementResource(amount: number) {
    this.current_resource += amount;
    this.total_resource += amount;
  }

  total_resource: number;
  current_resource: number;
  previous_resource: number;
  delta_resource : number;
  
  tick(){
    this.delta_resource = this.current_resource - this.previous_resource;
    this.previous_resource   = this.current_resource;
  }
  constructor(private clock : ClockService) {
    this.current_resource = 10000;
    this.total_resource = this.current_resource;
    this.previous_resource = 0;
    this.delta_resource = 0;
    clock.Tick_CheckIn(this);
  }
}