import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InventoryService } from './inventory.service'
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'inventory-panel',
  templateUrl: `./inventory.component.html`
})


export class InventoryComponent implements OnInit {
  constructor(private inventory: InventoryService) {
    this.inventory = inventory;
  }


  IncrementResource = ((x) => this.inventory.IncrementResource(x))

  ngOnInit(){

  }
}