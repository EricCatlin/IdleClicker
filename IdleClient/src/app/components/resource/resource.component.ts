import { Component, Input } from '@angular/core';
import { InventoryService, Resource } from '../../services/inventory.service';
import { UpgradesService, IUpgradable, Upgrade } from '../../services/upgrades.service';
import { Upgrades } from './upgrades'

@Component({
  selector: 'resource-panel',
  templateUrl: `./resource.component.html`
})
export class ResourceComponent implements IUpgradable {
  UpgradeCallback: Function;
  @Input() resource: Resource;
  show_chart = false;
  upgrade_list: Upgrade[];

  
  constructor(private inventory: InventoryService, private upgrades: UpgradesService) {
    this.upgrade_list = Upgrades;
  }
  
  Increment(y) { this.inventory.IncrementResource(this.resource.name, this.ClickerUpgradePowers((y))); this.AnalyzeClick(); }
  
  AnalyzeClick() {
    if ( !this.upgrades.owned_upgrades['10LIGHTBULBS'] && this.inventory.resources['lightbulbs'].total > 10) {
      this.upgrades.owned_upgrades['10LIGHTBULBS'] = true;
    }
    if ( !this.upgrades.owned_upgrades['100LIGHTBULBS'] && this.inventory.resources['lightbulbs'].total > 100) {
      this.upgrades.owned_upgrades['100LIGHTBULBS'] = true;
    }
    if ( !this.upgrades.owned_upgrades['1000LIGHTBULBS'] && this.inventory.resources['lightbulbs'].total > 1000) {
      this.upgrades.owned_upgrades['1000LIGHTBULBS'] = true;
    }
    console.log(this.upgrades,this.inventory);
  }
  ClickerUpgradePowers = function(input: number){
    let output = input;
    if ( this.upgrades.owned_upgrades['TRPLCLICK'] ) { output *= 3;  }
    if ( this.upgrades.owned_upgrades['DBLCLICK'] ) { output *= 2;  }
    return output;
  };
}
