import { css } from 'lit';

export default css`
    ha-card {
        --legend-spacing: 15px;
        --legend-dot-size: 10px;
        --days-spacing: 15px;
        --day-date-number-font-size: 3.5em;
        --day-date-number-line-height: 1.2em;
        --day-date-text-font-size: 1.25em;
        --events-margin-top: 10px;
        --event-spacing: 5px;
        --event-padding: 10px;
        --event-border-width: 5px;
        --event-border-radius: 5px;
        --event-font-size: 1em;
        --event-line-height: 1.2em;
        --event-icon-size: 18px;
        --weather-icon-size: 30px;
        --weather-temperature-separator: ' / ';
        --weather-temperature-font-size: 1em;
    }

    ha-card.nobackground {
        border: none !important;
        background-color: transparent !important;
        box-shadow: none !important;
    }

    ha-card.compact {
        --days-spacing: 5px;
        --day-date-number-font-size: 1.5em;
        --day-date-text-font-size: 1em;
        --events-margin-top: 5px;
        --event-spacing: 2px;
        --event-padding: 2px 5px;
        --event-border-width: 2px;
        --event-font-size: .9em;
        --event-line-height: 1.1em;
        --weather-icon-size: 20px;
        --weather-temperature-font-size: 0.8em;
    }

    .container {
        container-name: weekplanner;
        container-type: inline-size;
        display: flex;
        flex-wrap: wrap;
        gap: var(--days-spacing);
    }

    .container .legend {
        width: 100%;
    }

    .container .legend ul {
        display: flex;
        flex-wrap: wrap;
        gap: var(--legend-spacing);
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    .container .legend ul li {
        display: block;
    }

    .container .legend ul li:before {
        content: '';
        display: inline-block;
        width: var(--legend-dot-size);
        height: var(--legend-dot-size);
        background-color: var(--legend-calendar-color, var(--divider-color, #ffffff));
        border-radius: 50%;
        margin: 0 5px 0 0;
        vertical-align: middle;
    }

    .container .day {
        position: relative;
        width: calc((100% - 6 * var(--days-spacing)) / 7);
        margin: 0 0 var(--days-spacing) 0;
    }

    .container .day .date {
        position: relative;
        z-index: 1;
    }

    .container .day .date .number {
        font-size: var(--day-date-number-font-size);
        line-height: var(--day-date-number-line-height);
    }

    .container .day .date .text {
        font-size: var(--day-date-text-font-size);
    }

    .container .day .weather {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        font-size: var(--weather-temperature-font-size);
        cursor: pointer;
    }

    .container .day .weather .icon {
        display: inline-block;
        vertical-align: middle;
    }

    .container .day .weather .icon img {
        max-width: var(--weather-icon-size);
        max-height: var(--weather-icon-size);
    }

    .container .day .weather div.temperature {
        display: inline-block;
        margin: 0 5px 0 0;
        vertical-align: middle;
    }

    .container .day .weather .temperature:has(.high) .low:before {
        content: var(--weather-temperature-separator);
    }

    .container .day .events {
        margin-top: var(--events-margin-top);
    }

    .container .day .events .none,
    .container .day .events .event {
        margin-bottom: var(--event-spacing);
        padding: var(--event-padding);
        background-color: var(--event-background-color);
        border-radius: 0 var(--event-border-radius) var(--event-border-radius) 0;
        font-size: var(--event-font-size);
        line-height: var(--event-line-height);
    }

    .container .day .events .none {
        border-radius: var(--event-border-radius);
    }

    .container .day .events .event {
        border-left: var(--event-border-width) solid var(--border-color, var(--divider-color, #ffffff));
        cursor: pointer;
    }

    .container .day .events .event .time {
        color: var(--secondary-text-color, #aaaaaa);
        margin: 0 0 3px 0;
    }

    .container .day .events .event .location {
        margin: 3px 0 0 0;
        --mdc-icon-size: var(--event-icon-size);
    }

    .loader {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 40px;
        height: 40px;
    }

    .loader:after {
        content: " ";
        display: block;
        width: 24px;
        height: 24px;
        margin: 4px;
        border-radius: 50%;
        border: 3px solid var(--primary-text-color);
        border-color: var(--primary-text-color) transparent var(--primary-text-color) transparent;
        animation: loader 1.2s linear infinite;
    }

    ha-dialog .calendar,
    ha-dialog .datetime,
    ha-dialog .location {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }

    ha-dialog .calendar ha-icon,
    ha-dialog .datetime ha-icon,
    ha-dialog .location ha-icon {
        margin-right: 8px;
    }

    ha-dialog .location .info a {
        color: var(--primary-text-color);
    }

    ha-dialog .description {
        border-top: 1px solid var(--primary-text-color);
        margin-top: 16px;
        padding-top: 16px;
    }

    @keyframes loader {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @container weekplanner (width <= 1280px) {
        .container .day {
            width: calc((100% - 4 * var(--days-spacing)) / 5);
        }

        ha-card.compact .container .day {
            width: calc((100% - 6 * var(--days-spacing)) / 7);
        }
    }

    @container weekplanner (width <= 1024px) {
        .container .day {
            width: calc((100% - 2 * var(--days-spacing)) / 3);
        }

        ha-card.compact .container .day {
            width: calc((100% - 3 * var(--days-spacing)) / 4);
        }
    }

    @container weekplanner (width <= 640px) {
        .container .day {
            width: 100%;
        }

        ha-card.compact .container .day {
            width: calc((100% - var(--days-spacing)) / 2);
        }
    }
`;
