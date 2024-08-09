import { WeekPlannerCard } from './card';
import { version } from '../package.json';

customElements.define(
    'week-planner-card',
    WeekPlannerCard
);



window.customCards = window.customCards || [];
window.customCards.push({
    type: 'week-planner-card',
    name: 'Week Planner Card',
    description: 'Card to display events for a number of days from one or several calendars.'
});

console.info(
    `%c WEEK-PLANNER-CARD %c v${version} `,
    'color: white; background: black; font-weight: 700;',
    'color: black; background: white; font-weight: 700;',
);