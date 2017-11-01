import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Resource } from '../../services/inventory.service'
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'inventory-panel',
  templateUrl: `./inventory.component.html`
})


export class InventoryComponent implements OnInit {
  @Input() resource: Resource;

  constructor() {

  }



  ngOnInit(){

  }
}