import { Component, Input, OnInit } from '@angular/core';
import { InventoryService, Resource } from '../../services/inventory.service';
import { ClockService } from '../../services/clock.service';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'upgrade-panel',
  templateUrl: `./upgrade.component.html`
})

export class UpgradeComponent implements OnInit {
  constructor(private inventory: InventoryService, private clock: ClockService) {
    clock.Tick_CheckIn(this);
  }

  specials: Special[] = [];
  offers: Offer[] = [];

  ngOnInit() {
    this.specials.push(new Special('currency', 'lightbulbs', 100, 1000, 10000));

    this.offers.push(new Offer('currency', 'lightbulbs', 1, 10, 1));
    this.offers.push(new Offer('currency', 'lightbulbs', 10, 90, 10));
    this.offers.push(new Offer('currency', 'lightbulbs', 100, 800, 100));
    this.offers.push(new Offer('currency', 'lightbulbs', 1000, 6000, 200));
  }
  AcceptSpecial(offer: Offer) {
    if (this.inventory.Purchase(offer.buying, offer.amount)) {
      this.inventory.IncrementResource(offer.selling, offer.cost);
      this.specials.splice(this.specials.indexOf(offer), 1);
    } else {

    }
  }
  Accept(offer: Offer) {
    if (this.inventory.Purchase(offer.buying, offer.amount)) {
      this.inventory.IncrementResource(offer.selling, offer.cost);
      offer.cooldown = offer._cooldown;
    } else {

    }
  }
  RejectSpecial(offer: Offer) {
    this.specials.splice(this.specials.indexOf(offer), 1);
  }
  tick() {
    this.specials.forEach((offer) => {
      if (offer.expires-- <= 0) {
        this.specials.splice(this.specials.indexOf(offer), 1);
      }
    });
    this.offers.forEach((offer) => {
      if (offer.cooldown > 0) {
        offer.cooldown--;
        offer.progress = Math.floor(((offer._cooldown - offer.cooldown) / offer._cooldown) * 100)
      } else {
        offer.progress = 0;
      }
    });

    if (Math.random() < (1 / ((this.specials.length + 1) * 100))) {
      const offer = new Offer('currency', 'lightbulbs', getRndInteger(10, 500), getRndInteger(100, 5000), getRndInteger(35, 400));
      this.specials.push(offer);
    }
  }
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

}
