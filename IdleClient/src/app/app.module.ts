import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpModule } from '@angular/http';

import { ClockService } from './services/clock.service';
import { InventoryService } from './services/inventory.service';
import { UpgradesService } from './services/upgrades.service';


import { AppComponent } from './app.component';

import { GameComponent } from './components/game/game.component';

import { ResourceComponent } from './components/resource/resource.component';


import { WorkerComponent } from './components/worker/worker';

import { TimeComponent } from './components/time/time.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ChartComponent } from './components/chart/chart.component';
import { MarketComponent } from './components/market/market.component';
import { SaveComponent } from './components/save/save.component';

import { UpgradeComponent } from './components/upgrades/upgrades.component';


import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';


// PrimeNG Stuff
import { ToolbarModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import {ProgressBarModule} from 'primeng/primeng';




// Angular Material stuff
import {MatButtonModule, MatCheckboxModule, MatButton} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GameComponent,
    ResourceComponent,
    MarketComponent,
    TimeComponent,
    InventoryComponent,
    ChartComponent,
    WorkerComponent,
    UpgradeComponent,
    SaveComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    ToolbarModule,
    ChartModule,
    PanelModule,
    ProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatExpansionModule,
    MatChipsModule  ],
  providers: [ClockService, InventoryService, UpgradesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
