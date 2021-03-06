import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ClockService {
    ticks_per_second: number;
    TickList = [];
    ticker;
    clock_speed = 1000;
    ticks;
    Rando: number;
    Tick_CheckIn(tick): Promise<boolean> {
        console.log("Checking in ticker");

        this.TickList.push(tick);
        return Promise.resolve(true);
    }
    Tick() {
        this.ticks++;
        this.Rando = Math.random();
        this.TickList.forEach(ticker => {
            ticker.tick();
        });
    }
    StartTicker(delay: number) {
        console.log("Init ticker");
        if (!this.ticker) {
            this.ticker = Observable.interval(delay || this.clock_speed).subscribe(x => this.Tick());
        }
        this.ticks_per_second = Math.floor(1000 / delay);
    }

    StopTicker() {
        console.log("Uninit Unticker");
        if (this.ticker) {
            this.ticker.unsubscribe();
            this.ticker = null;
        }
    }
}