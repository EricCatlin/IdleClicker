import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { HttpModule }    from '@angular/http';

import { ClockService} from  "./clock/clock.service";
import { AppComponent }        from './app.component';

import { GameComponent }  from './game/game.component';

import { DashboardComponent }     from './dashboard/dashboard.component';
import { AppRoutingModule }     from './app-routing.module';


//PrimeNG Stuff//
import {ButtonModule} from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent,
    
    DashboardComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,

    ButtonModule
  ],
  providers: [ClockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
