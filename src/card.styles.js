import { css } from 'lit';

export default css`
    ha-card.nobackground {
        border: none !important;
        background-color: transparent !important;
    }
    
    div.container {
        container-name: weekplanner;
        container-type: inline-size;
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
    }

    div.container div.day {
        width: calc(100% / 7 - 15px);
        margin: 0 0 20px 0;
    }

    div.container div.day div.date {
        margin: 0 0 10px 0;
    }

    div.container div.day div.date span.number {
        font-size: 350%;
    }

    div.container div.day div.date span.text {
        font-size: 125%;
    }

    div.container div.day div.none,
    div.container div.day div.events div.event {
        margin: 0 0 5px 0;
        padding: 10px;
        background-color: var(--event-background-color);
        border-radius: 0 5px 5px 0;
    }

    div.container div.day div.none {
        border-radius: 5px;
    }

    div.container div.day div.events div.event {
        cursor: pointer;
        border-left: 5px solid var(--border-color, var(--divider-color, #ffffff));
    }

    div.container div.day div.events div.event div.time {
        color: var(--secondary-text-color, #aaaaaa);
        margin: 0 0 3px 0;
    }
    
    @container weekplanner (width <= 1280px) {
        div.container div.day {
            width: calc(100% / 5 - 15px);
        }
    }
    
    @container weekplanner (width <= 1024px) {
        div.container div.day {
            width: calc(100% / 3 - 15px);
        }
    }
    
    @container weekplanner (width <= 640px) {
        div.container div.day {
            width: 100%;
        }
    }
`;