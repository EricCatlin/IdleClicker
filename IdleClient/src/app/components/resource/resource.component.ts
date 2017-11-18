import { Component, Input } from '@angular/core';
import { InventoryService, Resource } from '../../services/inventory.service';
import { UpgradesService, Upgrade } from '../../services/upgrades.service';
import { Upgrades } from './upgrades';

@Component({
  selector: 'resource-panel',
  templateUrl: `./resource.component.html`
})

export class ResourceComponent {
  UpgradeCallback: Function;
  @Input() resource: Resource;
  show_chart = false;
  upgrade_list: Upgrade[];

  constructor(private inventory: InventoryService, private upgrades: UpgradesService) {
    this.upgrade_list = Upgrades;
  }

  MakeLightbulb() { if(this.inventory.Spend('scrap',1) ) { this.inventory.IncrementResource('lightbulbs', this.ClickerUpgradePowers(1)); this.AnalyzeClick(); }}
  BuyScrap() { if(this.inventory.Spend('currency',1) ) { this.inventory.IncrementResource('scrap', this.ClickerUpgradePowers(100)); }}
  
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
  }

  ClickerUpgradePowers = function(input: number){
    let output = input;
    if ( this.upgrades.owned_upgrades['TRPLCLICK'] ) { output *= 3;  }
    if ( this.upgrades.owned_upgrades['DBLCLICK'] ) { output *= 2;  }
    return output;
  };
}
