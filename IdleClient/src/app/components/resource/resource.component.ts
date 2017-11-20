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
}
