import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';


@Component({
  selector: 'my-games',
  templateUrl: `./game.component.html`
})

export class GameComponent {
  constructor(private inventory: InventoryService){

  }
}
