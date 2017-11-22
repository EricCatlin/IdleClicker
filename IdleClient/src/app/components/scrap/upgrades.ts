import { Upgrade } from '../../services/upgrades.service';

export const Upgrades: Upgrade[] = [
    new Upgrade('Bigger Truck', 'Bigger truck, increase amount of scrap with each click', '', 20, 'currency'),
    new Upgrade('Even Bigger Truck', 'The biggest truck', '', 50, 'currency',['Bigger Truck']),
    new Upgrade('Recycling', 'Recycle broken bulbs', '', 200, 'currency'),
    new Upgrade('Recycling+', 'Upgrade Recycler', '', 2000, 'currency', ['Recycling']),
    
    
];
