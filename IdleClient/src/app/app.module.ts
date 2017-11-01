import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpModule } from '@angular/http';

import { ClockService } from "./clock/clock.service";
import { InventoryService } from "./inventory/inventory.service";

import { AppComponent } from './app.component';

import { GameComponent } from './game/game.component';

import { ResourceComponent } from './resource/resource.component';
import { CurrencyComponent } from './currency/currency.component';


import { WorkerComponent } from './worker/worker.component';

import { TimeComponent } from './time/time.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ChartComponent } from './chart/chart.component';
import { MarketComponent } from './market/market.component';



import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';


//PrimeNG Stuff//
import { ButtonModule } from 'primeng/primeng';
import { ToolbarModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
import { FieldsetModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { InputSwitchModule } from 'primeng/primeng';
import { BlockUIModule } from 'primeng/primeng';
import {ProgressBarModule} from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent,

    DashboardComponent,
    GameComponent,
    ResourceComponent,
    CurrencyComponent,

    MarketComponent,

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
    ChartModule,
    FieldsetModule,
    PanelModule,
    GrowlModule,
    InputSwitchModule,
    BlockUIModule,
    ProgressBarModule
  ],
  providers: [ClockService, InventoryService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
