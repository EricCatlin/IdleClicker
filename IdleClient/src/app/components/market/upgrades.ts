import { Upgrade } from '../../services/upgrades.service';

export const Upgrades: Upgrade[] = [
    new Upgrade('DBLCOOL', 'Cooldowns go twice as fast', 'faster', 100, 'currency'),
    new Upgrade('TRPLCOOL', 'Cooldowns go even more fast', 'faster', 1000, 'currency'),
    new Upgrade('CONTRACT1', 'Nice Gov. Contract, they overpay and always need', 'faster', 100, 'currency')
];
