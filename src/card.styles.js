import { css } from 'lit';

export default css`
    .gui-editor .calendar-settings {
        background-color: blue !important;
    }
    #wallpanel-screensaver-image-one-container,
    #wallpanel-screensaver-image-two-container {
        height: unset;
    }
    ha-card {
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
        --secondary-text-color: var(--primary-text-color, inherit);
        --event-background-color: var(--border-color);
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
    .calendar_default_cell_inner {
        position: absolute;
        inset: 0px;
        border-right: 1px solid rgb(221, 221, 221);
        border-bottom: 1px solid rgb(221, 221, 221);
    }

    .container {
        container-name: weekplanner;
        container-type: inline-size;
        padding-top: 3em;
        display: flex;
        flex-wrap: wrap;
        gap: var(--days-spacing);
    }
    .container .button_calendar_view {
        height: 2.5em; 
        width: 2.5em; 
        position: fixed; 
        left: 1em; 
        top: 1em;
    }
    .container .clickable {
        cursor: pointer;
    }
    .container .calendar-profil-cell .label  {
        margin-top: -1em;
    }
    .container .calendar-profil-cell .label span {
        background: transparent;
        border-radius: 1em;
        padding: .2em 1em .2em 1em;
    }
    .container .calendar-profil-cell {
        padding: 0px; 
        border: 0px none;
        text-align: center;
    }
    .container .calendar-profil-picture {
        border-radius: 50%;
        height: 12em;
        border-width: thick;
        border-style: solid;
        border-color: transparent;
    }
    .container #button_calendar_add {
        position: fixed; 
        top: 1em; 
        right: 1em; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        z-index: 1024; 
        height: 3.5em; 
        display: block; 
        width: 3.5em; 
        border-radius: 50%; 
        background-color: #3498db; 
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26); 
        color: white !important; 
        text-align: center; 
        line-height: 2.6; 
        border-color: transparent; 
        cursor: pointer; 
        outline: 0;
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
        border-radius: var(--event-border-radius);
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