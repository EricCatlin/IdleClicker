import { Component, ViewChild, Input } from '@angular/core';
import { ClockService } from '../../services/clock.service';
import { InventoryService, Resource } from '../../services/inventory.service';
import { UIChart } from 'primeng/primeng';

@Component({
    selector: 'chart-panel',
    templateUrl: './chart.component.html',
})
export class ChartComponent {
    @Input() resource: Resource;
    @ViewChild('chart') chart: UIChart;
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
                backgroundColor : 'white'
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
    tick() {
        this.data.datasets[0].data.push(this.resource.current);
        if ( this.data.datasets[0].data.length > 200 ) { this.data.datasets[0].data.splice(0, 1); }
        this.chart.refresh();
    }
    constructor(private clock: ClockService, private inventory: InventoryService) {
        clock.Tick_CheckIn(this);
    }
}
