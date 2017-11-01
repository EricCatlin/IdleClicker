import { Component, Input, OnInit } from '@angular/core';
import { InventoryService, Resource } from '../inventory/inventory.service';
import { ClockService } from '../clock/clock.service';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'market-panel',
  templateUrl: `./market.component.html`
})
export class MarketComponent implements OnInit {
  constructor(private inventory: InventoryService, private clock: ClockService) {
    clock.Tick_CheckIn(this);
  }

  specials: Offer[] = [];
  offers: Offer[] = [];
  
  ngOnInit() {
    this.specials.push(new Offer('currency', 'paperclips', 100, 1000));

    this.offers.push(new Offer('currency', 'paperclips', 1, 10, 1));
    this.offers.push(new Offer('currency', 'paperclips', 10, 90, 10));
    this.offers.push(new Offer('currency', 'paperclips', 100, 800, 100));
    this.offers.push(new Offer('currency', 'paperclips', 1000, 6000, 200));
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
      if (offer.time-- < 0) {
        this.specials.splice(this.specials.indexOf(offer), 1);
      }
    });
    this.offers.forEach((offer) => {
      if (offer.cooldown > 0) {
        offer.cooldown--;
      }
    });

    if (Math.random() < (1 / ((this.specials.length + 1)  * 100))) {
      const offer = new Offer('currency', 'paperclips', getRndInteger(10, 500), getRndInteger(100, 5000), getRndInteger(35, 400));
      this.specials.push(offer);
    }
  }
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
class Offer {
  selling: string;
  buying: string;
  cost: number;
  time: number;
  cooldown: number;
  _cooldown: number;
  amount: number;
  cost_per: number;
  id: string;
  constructor(selling: string, buying: string, cost: number, amount: number, cooldown: number = 10, time: number = 100) {
    this.selling = selling;
    this.buying = buying;
    this.cost = cost;
    this.amount = amount;
    this.cost_per = cost / amount;
    this.time = time;
    this.cooldown = cooldown;
    this._cooldown = cooldown;
    this.id = Math.floor(Math.random() * 100000) + '';
  }


}