import { Component, Input } from '@angular/core';
import { InventoryService, Resource } from '../../services/inventory.service';
import { UpgradesService, IUpgradable, Upgrade } from '../../services/upgrades.service';


@Component({
  selector: 'resource-panel',
  templateUrl: `./resource.component.html`
})
export class ResourceComponent implements IUpgradable {
  @Input() resource: Resource;
  owned_upgrades: Object;
  show_chart = false;
  upgrade_list: Upgrade[];

  AddUpgrade(offer: Upgrade) {
    this.owned_upgrades[offer.id] = true;
  }
  
  constructor(private inventory: InventoryService, private upgrades: UpgradesService) {
    this.upgrade_list.push(new Upgrade('DBLCLICK', 'Double clicking power', 'doubles your clicking power', 100, 'currency'));
  }
  
  Increment(y) { this.inventory.IncrementResource(this.resource.name, this.ClickerUpgradePowers((y))); }
  
  ClickerUpgradePowers = function(input: number){
    let output = input;
    if ( this.owned_upgrades['DBLCLICK'] ) { output *= 2; }
    return output;
  };
}
