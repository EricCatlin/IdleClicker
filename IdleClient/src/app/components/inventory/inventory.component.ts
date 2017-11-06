import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Resource } from '../../services/inventory.service';

@Component({
  selector: 'inventory-panel',
  templateUrl: `./inventory.component.html`
})


export class InventoryComponent {
  @Input() resource: Resource;
}
