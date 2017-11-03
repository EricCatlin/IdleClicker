import { Upgrade } from '../../services/upgrades.service';

export const Upgrades: Upgrade[] = [
    new Upgrade('DBLCLICK', 'Double clicking power', 'doubles your clicking power', 100, 'currency'),
    new Upgrade('TRPLCLICK', 'Tripple clicking power', 'tripples your clicking power', 1000, 'currency')
];