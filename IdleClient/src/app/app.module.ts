import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpModule } from '@angular/http';

import { ClockService } from "./services/clock.service";
import { InventoryService } from "./services/inventory.service";
import { UpgradesService } from "./services/upgrades.service";


import { AppComponent } from './app.component';

import { GameComponent } from './components/game/game.component';

import { ResourceComponent } from './components/resource/resource.component';
import { CurrencyComponent } from './components/currency/currency.component';


import { WorkerComponent } from './components/worker/worker.component';

import { TimeComponent } from './components/time/time.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ChartComponent } from './components/chart/chart.component';
import { MarketComponent } from './components/market/market.component';

import { UpgradeComponent } from './components/upgrades/upgrades.component';


import { DashboardComponent } from './components/dashboard/dashboard.component';
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
import {DataListModule} from 'primeng/primeng';

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

    WorkerComponent,
    UpgradeComponent
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
    ProgressBarModule,
    DataListModule
  ],
  providers: [ClockService, InventoryService, MessageService, UpgradesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
