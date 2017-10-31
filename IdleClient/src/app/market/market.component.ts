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

  offers: Offer[] = [];
  ngOnInit() {
    let offer = new Offer('currency', 'paperclips', 100, 1000);
    this.offers.push(offer);
  }
  Accept(offer: Offer) {
    if (this.inventory.Purchase(offer.buying, offer.amount)) {
      this.inventory.IncrementResource(offer.selling, offer.cost);
      this.offers.splice(this.offers.indexOf(offer), 1);
    } else {

    }
  }
  Reject(offer: Offer) {

    this.offers.splice(this.offers.indexOf(offer), 1);

  }
  tick() {
    this.offers.forEach((offer) => {
      if (offer.time-- < 0) {
        this.offers.splice(this.offers.indexOf(offer), 1);
      }
    })


    if (Math.random() < (1 / (this.offers.length * 10))) {

      let offer = new Offer('currency', 'paperclips', getRndInteger(10, 500), getRndInteger(100, 5000), getRndInteger(35, 400));
      this.offers.push(offer);
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
  amount: number;
  cost_per: number;
  constructor(selling: string, buying: string, cost: number, amount: number, time: number = 100) {
    this.selling = selling;
    this.buying = buying;
    this.cost = cost;
    this.amount = amount;
    this.cost_per = cost / amount;
    this.time = time;
  }


}