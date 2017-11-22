import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { ClockService } from '../../services/clock.service';
import { UpgradesService } from '../../services/upgrades.service';

@Component({
  selector: 'save-panel',
  templateUrl: `./save.component.html`
})

export class SaveComponent {

  constructor(private inventory: InventoryService, private clock: ClockService, private upgrade: UpgradesService) {
    this.Load();
  }

  Load() {
    if (localStorage.getItem("lightbulb_save")) {
      this.inventory.resources = JSON.parse(localStorage.getItem('InventorySave'));
      this.upgrade.owned_upgrades = JSON.parse(localStorage.getItem('UpgradeSave'));
      this.clock.ticks = localStorage.getItem('ClockSave');
    }
  }

  Save() {
    localStorage.setItem("lightbulb_save", "true");
    localStorage.setItem('InventorySave', JSON.stringify(this.inventory.resources));
    localStorage.setItem('UpgradeSave', JSON.stringify(this.upgrade.owned_upgrades));
    localStorage.setItem('ClockSave', this.clock.ticks);
  }

}
