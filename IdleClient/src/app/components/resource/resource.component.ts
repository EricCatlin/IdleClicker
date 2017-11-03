import { Component, Input } from '@angular/core';
import { InventoryService, Resource } from '../../services/inventory.service';
import { UpgradesService, IUpgradable, Upgrade } from '../../services/upgrades.service';
import { Upgrades } from './upgrades'

@Component({
  selector: 'resource-panel',
  templateUrl: `./resource.component.html`
})
export class ResourceComponent implements IUpgradable {
  @Input() resource: Resource;
  show_chart = false;
  owned_upgrades: Object;
  upgrade_list: Upgrade[];
  
  constructor(private inventory: InventoryService, private upgrades: UpgradesService) {
    this.upgrade_list = Upgrades;
    this.owned_upgrades = {};
  }
  
  Increment(y) { this.inventory.IncrementResource(this.resource.name, this.ClickerUpgradePowers((y))); }
  
  ClickerUpgradePowers = function(input: number){
    let output = input;
    if ( this.owned_upgrades['TRPLCLICK'] ) { output *= 3;  }
    if ( this.owned_upgrades['DBLCLICK'] ) { output *= 2;  }
    return output;
  };
}
