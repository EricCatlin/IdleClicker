import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { InventoryService, Resource } from '../../services/inventory.service';
import { Upgrade, UpgradesService } from '../../services/upgrades.service';
import { ClockService } from '../../services/clock.service';
import { Upgrades } from './upgrades';
import { UIChart } from 'primeng/components/chart/chart';

@Component({
  selector: 'scrap-panel',
  templateUrl: `./scrap.component.html`
})

export class ScrapComponent implements OnInit {
  
  @ViewChild('chart') chart: UIChart;
  
  scrap_buy_at_cost: number;
  scrap_cost: number;
  upgrade_list: Upgrade[];

  constructor(private clock: ClockService, private inventory: InventoryService, private upgrades: UpgradesService) {
    this.scrap_cost = 5;
    this.upgrade_list = Upgrades;
  }
  ngOnInit(): void {
    this.clock.Tick_CheckIn(this);
  }
  tick() {
    this.scrap_cost = this.clamp(this.scrap_cost + this.clock.Rando - 0.5, 5, 25);

    if(this.scrap_cost < this.scrap_buy_at_cost){
      this.BuyScrap(1000);
    }
    this.data.datasets[0].data.push(this.scrap_cost);
    if ( this.data.datasets[0].data.length > 200 ) { this.data.datasets[0].data.splice(0, 1); }
    this.chart.refresh();


  }
  clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
  }

  BuyScrap(x: number) {
    if (this.inventory.Spend('currency', this.scrap_cost)) {
      if (this.upgrades.owned_upgrades["Bigger Truck"]) x *= 2;
      if (this.upgrades.owned_upgrades["Even Bigger Truck"]) x *= 2;

      this.inventory.IncrementResource('scrap', x);
      this.scrap_cost++;
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
    legend: { display: true }
  };

  data = {
    labels: new Array(200),
    datasets: [
      {
        label: 'Scrap Costs',
        data: [0]
      },
    ]
  };

}
