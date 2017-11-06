import { Upgrade } from '../../services/upgrades.service';

export const Upgrades: Upgrade[] = [
    new Upgrade('tutorial_offer_1', 'Mail order lightbulbs 1 at a time', 'Desc', 0, 'currency'),
    new Upgrade('tutorial_offer_2', 'Stock local gas-station with 5 bulbs per week', 'Desc', 0, 'currency'),
    new Upgrade('tutorial_offer_3', 'Stock local grocer with 50 bulbs per week', 'Desc', 0, 'currency'),
    new Upgrade('tutorial_offer_4', 'Stock local hardware-store with 200 bulbs per week', 'Desc', 0, 'currency'),
    new Upgrade('DBLCOOL', 'Cooldowns go twice as fast', 'faster', 100, 'currency'),
    new Upgrade('TRPLCOOL', 'Cooldowns go even more fast', 'faster', 1000, 'currency'),
    new Upgrade('CONTRACT1', 'Nice Gov. Contract, they overpay and always need', 'faster', 100, 'currency')
];
