import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class InventoryService {

  Increment(amount: number) {
    this.current += amount;
    this.total += amount;
  }

  IncrementWorker(amount: number) {
    this.current += amount;
    this.total += amount;
  }

  total: number;
  current: number;
  previous: number;

  constructor() {
    this.current = 10000;
    this.total = this.current;
    this.previous = 0;

  }
}