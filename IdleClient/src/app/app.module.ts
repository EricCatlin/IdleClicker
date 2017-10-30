import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { HttpModule }    from '@angular/http';

import { ClockService} from  "./clock/clock.service";
import { InventoryService} from  "./inventory/inventory.service";

import { AppComponent }        from './app.component';

import { GameComponent }  from './game/game.component';
import { WorkerComponent }  from './worker/worker.component';

import { TimeComponent }  from './time/time.component';
import { InventoryComponent }  from './inventory/inventory.component';
import { ChartComponent }  from './chart/chart.component';


import { DashboardComponent }     from './dashboard/dashboard.component';
import { AppRoutingModule }     from './app-routing.module';


//PrimeNG Stuff//
import {ButtonModule} from 'primeng/primeng';
import {ToolbarModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    
    DashboardComponent,
    GameComponent,
    TimeComponent,
    InventoryComponent,
    ChartComponent,
    
    WorkerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    
    ToolbarModule,
    ButtonModule,
    ChartModule
  ],
  providers: [ClockService, InventoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
