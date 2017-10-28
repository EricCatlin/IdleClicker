import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InventoryService } from './inventory.service'
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'inventory-panel',
  templateUrl: `./inventory.component.html`
})


export class InventoryComponent implements OnInit {
  ticker;
  displayed_currency :number;
  constructor(private inventory: InventoryService) {
    this.inventory = inventory;
    this.ticker = Observable.interval(100).subscribe(x => this.Refresh());
    this.displayed_currency = 0;
  }

  Refresh(){
    
    if(this.displayed_currency > this.inventory.current){
      this.displayed_currency = this.inventory.current;
    }else{
      this.displayed_currency = Math.floor(this.lerp(this.displayed_currency, this.inventory.current , 0.1));
    }
  }

  lerp(a, b, n) {
    return (1 - n) * a + n * b;
  }

  Increment = ((x) => this.inventory.Increment(x))

  ngOnInit(){

  }
}