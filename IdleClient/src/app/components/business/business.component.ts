import { Component, Input, ViewChild } from '@angular/core';
import { InventoryService, Resource } from '../../services/inventory.service';
import { UpgradesService, Upgrade } from '../../services/upgrades.service';
import { ClockService } from '../../services/clock.service';
import { UIChart } from 'primeng/components/chart/chart';

@Component({
  selector: 'business-panel',
  templateUrl: `./business.component.html`
})

export class BusinessComponent {
  marketer_base_cost: number;
  @ViewChild('chart') chart: UIChart;
  sold_this_tick: number;


  auto_sell: boolean;

  demand: number;
  cost: number;

  marketer_cost: number;

  IncrementMarketing() {
    if (this.inventory.Spend('currency', this.MarketerCostCalculator())) {
      this.inventory.IncrementResource('marketer', 1);
      return;
    }
  }

  tick() {
    this.demand = (this.inventory.resources['marketer'].total / (Math.pow(this.cost * 10, 1.15)));
    if (this.auto_sell && this.clock.Rando < (this.demand)) {
      this.sellLights((this.clock.Rando * this.demand * 2));
    }

    this.data.datasets[0].data.push(this.sold_this_tick);
    if ( this.data.datasets[0].data.length > 200 ) { this.data.datasets[0].data.splice(0, 1); }
    this.chart.refresh();
  }
  sellLights(amount: number) {
    amount = Math.floor(amount);
    if (this.inventory.resources['lightbulbs'].current < amount) { amount = this.inventory.resources['lightbulbs'].current; }
    this.inventory.SpendResource('lightbulbs', amount);
    this.sold_this_tick = amount;
    this.inventory.IncrementResource('currency', amount * this.cost);
  }

  MarketerCostCalculator() {
    return this.marketer_base_cost + (Math.pow(this.inventory.resources['marketer'].current,2));
  }

  IncrementManager() {
    if (this.inventory.Spend('currency', this.MarketerCostCalculator())) {
      this.inventory.IncrementResource('marketer', 1);
      return;
    }
  }

  options = {
    responsive: false,
    maintainAspectRatio: false,
    animation: {
      duration: 100
    },
    tooltips: {
      enabled: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    elements: {
      point: {
        radius: 1,
        backgroundColor: 'white'
      }
    },
    legend: { display: false }
  };

  data = {
    labels: new Array(200),
    datasets: [
      {
        label: 'Resource',
        data: [0]
      },
    ]
  };

  constructor(private clock: ClockService, private inventory: InventoryService, private upgrades: UpgradesService) {
    this.demand = 0.5;
    this.cost = 0.1;
    this.marketer_cost = 10;
    this.auto_sell = true;
    this.marketer_base_cost = 10;
    clock.Tick_CheckIn(this);
  }

}
