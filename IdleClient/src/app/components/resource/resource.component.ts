import { Component, Input } from '@angular/core';
import { InventoryService, Resource } from '../../services/inventory.service';


@Component({
  selector: 'resource-panel',
  templateUrl: `./resource.component.html`
})
export class ResourceComponent  {
  @Input() resource: Resource;
  constructor(private inventory:InventoryService){}
  show_chart=false;

  Increment(y){this.inventory.IncrementResource(this.resource.name,y)};

}