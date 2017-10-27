import { Injectable } from '@angular/core';

import { button } from './button';
import { buttons } from './mock-games';

@Injectable()
export class gameService {
  getgames(): Promise<button[]> {
    return Promise.resolve(buttons);
  }
  getgame(id: number): Promise<button> {
    return this.getgames()
               .then(games => games.find(game => game.id === id));
  }
}