import { Upgrade } from '../../services/upgrades.service';

export const Upgrades: Upgrade[] = [
    new Upgrade('LIGHTBULBMANAGERS', 'Hire Managers to make workers more efficient', '', 30, 'currency'),
    new Upgrade('DBLCLICK', 'Double clicking power', 'doubles your clicking power', 100, 'currency'),
    new Upgrade('TRPLCLICK', 'Tripple clicking power', 'tripples your clicking power', 1000, 'currency', ['DBLCLICK'])
];
