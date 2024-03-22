# Week Planner Card

![GitHub Release](https://img.shields.io/github/v/release/FamousWolf/week-planner-card)
![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/FamousWolf/week-planner-card/total)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/FamousWolf/week-planner-card)
![GitHub License](https://img.shields.io/github/license/FamousWolf/week-planner-card)
[![Static Badge](https://img.shields.io/badge/-buy_me_a_tea-gray?logo=buy-me-a-coffee)](https://www.buymeacoffee.com/rudygnodde)

Custom Home Assistant card displaying a responsive overview of multiple days with events from one or multiple calendars

![Example Week Planner Cards](examples/card.png)

## Table of Content

- [Installation](#installation)
  - [HACS (Recommended)](#hacs-recommended)
  - [Manual](#manual)
- [Configuration](#configuration)
  - [Main options](#main-options)
  - [Calendars](#calendars)
  - [Texts](#texts)
  - [Weather](#weather)
- [Example](#example)

## Installation

### HACS (Recommended)

1. Make sure [HACS](https://hacs.xyz) is installed and working.
2. Add this repository (https://github.com/FamousWolf/week-planner-card) via [HACS Custom repositories](https://hacs.xyz/docs/faq/custom_repositories)
3. Download and install using HACS

### Manual

1. Download and copy `eweek-planner-card.js` from the [latest release](https://github.com/FamousWolf/week-planner-card/releases/latest) into your `config/www` directory.
2. Add the resource reference to Home Assistant configuration using one of these methods:
  - **Edit your configuration.yaml**
    Add:
    ```yaml
    resources:
      - url: /local/week-planner-card.js?version=1.0.1
    type: module
    ```
  - **Using the graphical editor**
    1. Make sure advanced mode is enabled in your user profile
    2. Navigate to Configuration -> Lovelace Dashboards -> Resources Tab. Hit orange (+) icon
    3. Enter URL `/local/week-planner-card.js` and select type "JavaScript Module".
    4. Restart Home Assistant.


## Configuration

### Main Options

| Name               | Type        | Default                                            | Supported options                                                      | Description                                    |
|--------------------|-------------|----------------------------------------------------|------------------------------------------------------------------------|------------------------------------------------|
| `type`             | string      | **Required**                                       | `custom:week-planner-card`                                             | Type of the card                               |
| `days`             | number      | 7                                                  | Any positive integer number                                            | The number of days to show                     |
| `noCardBackground` | boolean     | false                                              | `false` \| `true`                                                      | Do not show default card background and border |
| `eventBackground`  | string      | `var(--card-background-color, inherit)`            | Any CSS color                                                          | Background color of the events                 |
| `updateInterval`   | number      | 60                                                 | Any positive integer number                                            | Seconds between checks for new events          |
| `calendars`        | object list | **Required**                                       | See [Calendars](#calendars)                                            | Calendars shown in this card                   |
| `texts`            | object list | {}                                                 | See [Texts](#texts)                                                    | Texts used in the card                         |
| `weather`          | object      | optional                                           | See [Weather](#weather)                                                | Configuration for optional weather forecast    |
| `dateFormat`       | string      | `dddd DD MMMM YYYY`                                | See [Moment.js format](https://momentjs.com/docs/#/displaying/format/) | Format of the date in event details            |
| `timeFormat`       | string      | `HH:mm`                                            | See [Moment.js format](https://momentjs.com/docs/#/displaying/format/) | Format of the time                             |
| `locale`           | string      | `en`                                               | Any locale string supported by Moment.js                               | Locale used for day and month texts            |
| `locationLink`     | string      | `https://www.google.com/maps/search/?api=1&query=` | Any URL                                                                | Link used for event location                   |

### Calendars

| Name           | Type        | Default      | Supported options                   | Description                                          |
|----------------|-------------|--------------|-------------------------------------|------------------------------------------------------|
| `entity`       | string      | **Required** | `calendar.my_calendar`              | Entity ID                                            |
| `color`        | string      | optional     | Any CSS color                       | Color used for events from the calendar              |

### Texts

| Name        | Type   | Default                           | Supported options | Description                                         |
|-------------|--------|-----------------------------------|-------------------|-----------------------------------------------------|
| `fullDay`   | string | `Entire day`                      | Any text          | Text shown for full day events instead of time      |
| `noEvents`  | string | `No events`                       | Any text          | Text shown when there are no events for a day       |
| `today`     | string | `Today`                           | Any text          | Text shown for the today instead of the week day    |
| `tomorrow`  | string | `Tomorrow`                        | Any text          | Text shown for the tomorrow instead of the week day |
| `sunday`    | string | Name of Sunday based on locale    | Any text          | Text used to override Sundays                       |
| `monday`    | string | Name of Monday based on locale    | Any text          | Text used to override Mondays                       |
| `tuesday`   | string | Name of Tuesday based on locale   | Any text          | Text used to override Tuesdays                      |
| `wednesday` | string | Name of Wednesday based on locale | Any text          | Text used to override Wednesdays                    |
| `thursday`  | string | Name of Thursday based on locale  | Any text          | Text used to override Thursdays                     |
| `friday`    | string | Name of Friday based on locale    | Any text          | Text used to override Fridays                       |
| `saturday`  | string | Name of Saturday based on locale  | Any text          | Text used to override Saturdays                     |

### Weather

| Name                 | Type    | Default      | Supported options            | Description          |
|----------------------|---------|--------------|------------------------------|----------------------|
| `entity`             | string  | **Required** | `weather.my_weather_service` | Entity ID            |
| `showCondition`      | boolean | true         | `false` \| `true`            | Show condition icon  |
| `showTemperature`    | boolean | false        | `false` \| `true`            | Show temperature     |
| `showLowTemperature` | boolean | false        | `false` \| `true`            | Show low temperature |

## Example

```yaml
type: custom:week-planner-card
calendars:
  - entity: calendar.my_calendar_1
    color: '#e6c229'
  - entity: calendar.my_calendar_2
    color: '#1a8fe3'
weather:
  entity: weather.my_weather_service
  showTemperature: true
  showLowTemperature: true
days: 14
noCardBackground: true
eventBackground: rgba(0, 0, 0, .75)
texts:
  noEvents: Geen activiteiten
  fullDay: Hele dag
  today: Vandaag
  sunday: Zondag
  monday: Maandag
  tuesday: Dinsdag
  wednesday: Woensdag
  thursday: Donderdag
  friday: Vrijdag
  saturday: Zaterdag
  tomorrow: Morgen
```