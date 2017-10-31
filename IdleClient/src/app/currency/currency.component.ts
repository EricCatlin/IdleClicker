import { Component, Input } from '@angular/core';
import { InventoryService, Resource } from '../inventory/inventory.service';


@Component({
  selector: 'currency-panel',
  templateUrl: `./currency.component.html`
})
export class CurrencyComponent  {
  @Input() resource: Resource;

  constructor(private inventory:InventoryService){}
  show_chart=false;

  Increment(y){this.inventory.IncrementResource(this.resource.name,y)};

}