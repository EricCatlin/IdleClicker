import { Component, Input, OnInit } from '@angular/core';
import { InventoryService, Resource } from '../../services/inventory.service';
import { ClockService } from '../../services/clock.service';
import { CurrencyPipe } from '@angular/common';
import { UpgradesService, Upgrade } from '../../services/upgrades.service';
import { Upgrades } from './upgrades';

@Component({
  selector: 'market-panel',
  templateUrl: `./market.component.html`
})
export class MarketComponent implements OnInit {
  upgrade_list: Upgrade[];
  constructor(private inventory: InventoryService, private clock: ClockService, private upgrades: UpgradesService) {
    clock.Tick_CheckIn(this);
    this.upgrade_list = Upgrades;
  }

  specials: Special[] = [];
  offers: Offer[] = [];

  ngOnInit() {
    this.specials.push(new Special('currency', 'lightbulbs', 100, 100, 10));
  }
  AcceptSpecial(offer: Offer) {
    if (this.inventory.Spend(offer.buying, offer.amount)) {
      this.inventory.IncrementResource(offer.selling, offer.cost);
      this.specials.splice(this.specials.indexOf(offer), 1);
    } else {

    }
  }

  UpgradeCallback(upgrade: Upgrade) {
    if (upgrade.id === 'tutorial_offer_1') {
      this.offers.push(new Offer('currency', 'lightbulbs', 1, 1, 0));
    }
    if (upgrade.id === 'tutorial_offer_2') {
      this.offers.push(new Offer('currency', 'lightbulbs', 10, 10, 1));
    }
    if (upgrade.id === 'tutorial_offer_3') {
      this.offers.push(new Offer('currency', 'lightbulbs', 100, 100, 10));
    }
    if (upgrade.id === 'tutorial_offer_4') {
      this.offers.push(new Offer('currency', 'lightbulbs', 1000, 1000, 100));
    }
    if (upgrade.id === 'CONTRACT1') {
      this.offers.push(new Offer('currency', 'lightbulbs', 100, 500, 1));
    }
  }
  Accept(offer: Offer) {
    if (this.inventory.Spend(offer.buying, offer.amount)) {
      this.inventory.IncrementResource(offer.selling, offer.cost);
      offer.cooldown = offer._cooldown;
    } else {

    }
  }
  RejectSpecial(offer: Offer) {
    this.specials.splice(this.specials.indexOf(offer), 1);
  }
  CalculateCooldown(): number {
    let cooldown = 1;
    if (this.upgrades.owned_upgrades['DBLCOOL']) { cooldown *= 2; }
    if (this.upgrades.owned_upgrades['TRPLCOOL']) { cooldown *= 3; }

    return cooldown;
  }

  tick() {
    this.specials.forEach((offer) => {
      if (offer.expires-- <= 0) {
        this.specials.splice(this.specials.indexOf(offer), 1);
      }
    });
    this.offers.forEach((offer) => {
      if (offer.cooldown > 0) {
        offer.cooldown -= this.CalculateCooldown();
        offer.progress = Math.floor(((offer._cooldown - offer.cooldown) / offer._cooldown) * 100);
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



export interface IOffer {
  selling: string;
  buying: string;
  cost: number;
  expires: number;
  cooldown: number;
  _cooldown: number;
  amount: number;
  cost_per: number;
  id: string;
  progress: number;
}
class Offer implements IOffer {
  selling: string;
  buying: string;
  cost: number;
  expires: number;
  cooldown: number;
  _cooldown: number;
  amount: number;
  cost_per: number;
  id: string;
  progress: number;
  constructor(selling: string, buying: string, cost: number, amount: number, cooldown: number = 10, expires: number = 100) {
    this.selling = selling;
    this.buying = buying;
    this.cost = cost;
    this.amount = amount;
    this.cost_per = cost / amount;
    this.expires = expires;
    this.cooldown = cooldown;
    this._cooldown = cooldown;
    this.id = Math.floor(Math.random() * 100000) + '';
  }
}

class Special implements IOffer {
  selling: string;
  buying: string;
  cost: number;
  expires: number;
  cooldown: number;
  _cooldown: number;
  amount: number;
  cost_per: number;
  id: string;
  progress: number;
  constructor(selling: string, buying: string, cost: number, amount: number, expires: number = 100) {
    this.selling = selling;
    this.buying = buying;
    this.cost = cost;
    this.amount = amount;
    this.cost_per = cost / amount;
    this.expires = expires;
    this.id = Math.floor(Math.random() * 100000) + '';
  }
}
