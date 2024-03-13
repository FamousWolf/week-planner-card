# Week Planner Card

![GitHub Release](https://img.shields.io/github/v/release/FamousWolf/week-planner-card)
![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/FamousWolf/week-planner-card/total)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/FamousWolf/week-planner-card)
![GitHub License](https://img.shields.io/github/license/FamousWolf/week-planner-card)

Custom Home Assistant card displaying a responsive overview of multiple days with events from one of multiple calendars

![Example Week Planner Cards](examples/card.png)

## Table of Content

- [Installation](#installation)
  - [HACS (Recommended)](#hacs-recommended)
  - [Manual](#manual)
- [Configuration](#configuration)
  - [Main options](#main-options)
  - [Scores](#scores)
  - [Entities](#entities)
  - [Entity states](#entity-states)
  - [Date format](#date-format)
  - [Actions](#actions)
- [Examples](#examples)
  - [Battery charge](#battery-charge)
  - [Air quality](#air-quality)
  - [Washing machine and dryer status](#washing-machine-and-dryer-status)
  - [Garbage pickup dates](#garbage-pickup-dates)

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
      - url: /local/week-planner-card.js?version=1.0.0
    type: module
    ```
  - **Using the graphical editor**
    1. Make sure advanced mode is enabled in your user profile
    2. Navigate to Configuration -> Lovelace Dashboards -> Resources Tab. Hit orange (+) icon
    3. Enter URL `/local/week-planner-card.js` and select type "JavaScript Module".
    4. Restart Home Assistant.


## Configuration

### Main Options

| Name               | Type        | Default                                 | Supported options           | Description                                    |
|--------------------|-------------|-----------------------------------------|-----------------------------|------------------------------------------------|
| `type`             | string      | **Required**                            | `custom:week-planner-card`  | Type of the card                               |
| `days`             | number      | 7                                       | Any positive integer number | The number of days to show                     |
| `noCardBackground` | boolean     | false                                   | `false` \| `true`           | Do not show default card background and border |
| `eventBackground`  | string      | `var(--card-background-color, inherit)` | Any CSS color               | Background color of the events                 |
| `updateInterval`   | number      | 60                                      | Any positive integer number | Seconds between checks for new events          |
| `calendars`        | object list | **Required**                            | See [Calendars](#calendars) | Calendars shown in this card                   |
| `texts`            | object list | {}                                      | See [Texts](#texts)         | Texts used in the card                         |

### Calendars

| Name           | Type        | Default      | Supported options                   | Description                                          |
|----------------|-------------|--------------|-------------------------------------|------------------------------------------------------|
| `entity`       | string      | **Required** | `calendar.my_calendar`              | Entity ID                                            |
| `color`        | string      | optional     | Any CSS color                       | Color used for events from the calendar              |

### Texts

| Name        | Type   | Default      | Supported options | Description                                         |
|-------------|--------|--------------|-------------------|-----------------------------------------------------|
| `fullDay`   | string | `Entire day` | Any text          | Text shown for full day events instead of time      |
| `noEvents`  | string | `No events`  | Any text          | Text shown when there are no events for a day       |
| `today`     | string | `Today`      | Any text          | Text shown for the today instead of the week day    |
| `tomorrow`  | string | `Tomorrow`   | Any text          | Text shown for the tomorrow instead of the week day |
| `sunday`    | string | `Sunday`     | Any text          | Text shown for Sundays                              |
| `monday`    | string | `Monday`     | Any text          | Text shown for Mondays                              |
| `tuesday`   | string | `Tuesday`    | Any text          | Text shown for Tuesdays                             |
| `wednesday` | string | `Wednesday`  | Any text          | Text shown for Wednesdays                           |
| `thursday`  | string | `Thursday`   | Any text          | Text shown for Thursdays                            |
| `friday`    | string | `Friday`     | Any text          | Text shown for Fridays                              |
| `saturday`  | string | `Saturday`   | Any text          | Text shown for Saturdays                            |
