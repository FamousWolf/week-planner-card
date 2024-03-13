import { WeekPlannerCard } from './card';

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
