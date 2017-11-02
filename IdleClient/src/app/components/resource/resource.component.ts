import { Component, Input } from '@angular/core';
import { InventoryService, Resource } from '../../services/inventory.service';
import { UpgradesService } from '../../services/upgrades.service';


@Component({
  selector: 'resource-panel',
  templateUrl: `./resource.component.html`
})
export class ResourceComponent  {
  @Input() resource: Resource;
  constructor(private inventory: InventoryService, private upgrades: UpgradesService) {}
  show_chart = false;
  Increment(y) { this.inventory.IncrementResource(this.resource.name, this.ClickerUpgradePowers((y))); }
  ClickerUpgradePowers = function(input: number){
    let output = input;
    if ( this.upgrades.owned['DBLCLICK'] ) { output *= 2; }
    return output;
  };
}
