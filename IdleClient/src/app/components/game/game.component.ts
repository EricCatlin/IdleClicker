import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService, Resource } from '../../services/inventory.service';
import { UpgradesService } from '../../services/upgrades.service';

@Component({
  selector: 'my-games',
  templateUrl: `./game.component.html`
})
export class GameComponent implements OnInit {
  ngOnInit(): void {

  }
  constructor(private inventory: InventoryService, private upgrades: UpgradesService) {}
}