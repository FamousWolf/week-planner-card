import { html, LitElement } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { DateTime, Settings as LuxonSettings, Info as LuxonInfo } from 'luxon';
import styles from './card.styles';
import clear_night from 'data-url:./icons/clear_night.png';
import cloudy from 'data-url:./icons/cloudy.png';
import fog from 'data-url:./icons/fog.png';
import lightning from 'data-url:./icons/lightning.png';
import storm from 'data-url:./icons/storm.png';
import storm_night from 'data-url:./icons/storm_night.png';
import mostly_cloudy from 'data-url:./icons/mostly_cloudy.png';
import mostly_cloudy_night from 'data-url:./icons/mostly_cloudy_night.png';
import heavy_rain from 'data-url:./icons/heavy_rain.png';
import rainy from 'data-url:./icons/rainy.png';
import snowy from 'data-url:./icons/snowy.png';
import mixed_rain from 'data-url:./icons/mixed_rain.png';
import sunny from 'data-url:./icons/sunny.png';
import windy from 'data-url:./icons/windy.svg';

const ICONS = {
  'clear-day': sunny,
  'clear-night': clear_night,
  cloudy,
  overcast: cloudy,
  fog,
  hail: mixed_rain,
  lightning,
  'lightning-rainy': storm,
  'partly-cloudy-day': mostly_cloudy,
  'partly-cloudy-night': mostly_cloudy_night,
  partlycloudy: mostly_cloudy,
  pouring: heavy_rain,
  rain: rainy,
  rainy,
  sleet: mixed_rain,
  snow: snowy,
  snowy,
  'snowy-rainy': mixed_rain,
  sunny,
  wind: windy,
  windy,
  'windy-variant': windy
};

const ICONS_NIGHT = {
  ...ICONS,
  sunny: clear_night,
  partlycloudy: mostly_cloudy_night,
  'lightning-rainy': storm_night
};

export class WeekPlannerCard extends LitElement {
    static styles = styles;

    _initialized = false;
    _loading = 0;
    _events = {};
    _calendarEvents = {};
    _jsonDays = '';
    _calendars;
    _numberOfDays;
    _updateInterval;
    _noCardBackground;
    _eventBackground;
    _compact;
    _language;
    _weather;
    _dateFormat;
    _timeFormat;
    _locationLink;
    _startDate;
    _hideWeekend;
    _startingDay;
    _startingDayOffset;
    _weatherForecast = null;
    _showLocation;
    _hidePastEvents;
    _hideDaysWithoutEvents;
    _hideTodayWithoutEvents;
    _filter;
    _filterText;
    _combineSimilarEvents;
    _showLegend;
    _actions;
    _columns;

    /**
     * Get config element
     *
     * @returns {HTMLElement}
     */
    static getConfigElement() {
        // Create and return an editor element
        return document.createElement("week-planner-card-editor");
    }

    /**
     * Get stub config
     *
     * @returns {}
     */
    static getStubConfig() {
        return {
            calendars: [],
            days: 7,
            startingDay: 'today',
            startingDayOffset: 0,
            hideWeekend: false,
            noCardBackground: false,
            compact: false,
            weather: {
                showCondition: true,
                showTemperature: false,
                showLowTemperature: false,
                useTwiceDaily: false,
            },
            locale: 'en',
            showLocation: false,
            hidePastEvents: false,
            hideDaysWithoutEvents: false,
            hideTodayWithoutEvents: false,
            combineSimilarEvents: false,
            showLegend: false
        };
    }

    /**
     * Get properties
     *
     * @return {Object}
     */
    static get properties() {
        return {
            _days: { type: Array },
            _config: { type: Object },
            _isLoading: { type: Boolean },
            _error: { type: String },
            _currentEventDetails: { type: Object }
        }
    }

    /**
     * Set configuration
     *
     * @param {Object} config
     */
    setConfig(config) {
        this._config = config;

        if (!config.calendars) {
            throw new Error('No calendars are configured');
        }

        this._title = config.title ?? null;
        this._calendars = config.calendars;
        this._weather = this._getWeatherConfig(config.weather);
        this._numberOfDays = this._getNumberOfDays(config.days ?? 7);
        this._hideWeekend = config.hideWeekend ?? false;
        this._startingDay = config.startingDay ?? 'today';
        this._startingDayOffset = config.startingDayOffset ?? 0;
        this._startDate = this._getStartDate();
        this._updateInterval = config.updateInterval ?? 60;
        this._noCardBackground = config.noCardBackground ?? false;
        this._eventBackground = config.eventBackground ?? 'var(--card-background-color, inherit)';
        this._compact = config.compact ?? false;
        this._dayFormat = config.dayFormat ?? null;
        this._dateFormat = config.dateFormat ?? 'cccc d LLLL yyyy';
        this._timeFormat = config.timeFormat ?? 'HH:mm';
        this._locationLink = config.locationLink ?? 'https://www.google.com/maps/search/?api=1&query=';
        this._showLocation = config.showLocation ?? false;
        this._hidePastEvents = config.hidePastEvents ?? false;
        this._hideDaysWithoutEvents = config.hideDaysWithoutEvents ?? false;
        this._hideTodayWithoutEvents = config.hideTodayWithoutEvents ?? false;
        this._filter = config.filter ?? false;
        this._filterText = config.filterText ?? false;
        this._combineSimilarEvents = config.combineSimilarEvents ?? false;
        this._showLegend = config.showLegend ?? false;
        this._actions = config.actions ?? false;
        this._columns = config.columns ?? {};
        if (config.locale) {
            LuxonSettings.defaultLocale = config.locale;
        }
        this._language = Object.assign(
            {},
            {
                fullDay: 'Entire day',
                noEvents: 'No events',
                today: 'Today',
                tomorrow: 'Tomorrow',
                yesterday: 'Yesterday',
                sunday: LuxonInfo.weekdays('long')[6],
                monday: LuxonInfo.weekdays('long')[0],
                tuesday: LuxonInfo.weekdays('long')[1],
                wednesday: LuxonInfo.weekdays('long')[2],
                thursday: LuxonInfo.weekdays('long')[3],
                friday: LuxonInfo.weekdays('long')[4],
                saturday: LuxonInfo.weekdays('long')[5]
            },
            config.texts ?? {}
        );
    }

    _getWeatherConfig(weatherConfiguration) {
        if (
            !weatherConfiguration
            || typeof weatherConfiguration !== 'string'
            && typeof weatherConfiguration !== 'object'
        ) {
            return null;
        }

        let configuration = {
            entity: null,
            showCondition: true,
            showTemperature: false,
            showLowTemperature: false
        };
        if (typeof weatherConfiguration === 'string') {
            configuration.entity = weatherConfiguration;
        } else {
            Object.assign(configuration, weatherConfiguration);
        }

        if (!configuration.hasOwnProperty('entity') || configuration.entity === null) {
            return null;
        }

        return configuration;
    }

    /**
     * Render
     *
     * @return {Object}
     */
    render() {
        if (!this._initialized) {
            this._initialized = true;
            this._waitForHassAndConfig();
        }

        let cardClasses = [];
        if (this._noCardBackground) {
            cardClasses.push('nobackground');
        }
        if (this._compact) {
            cardClasses.push('compact');
        }

        const cardStyles = [
            '--event-background-color: ' + this._eventBackground + ';'
        ];
        if (this._columns.extraLarge) {
            cardStyles.push('--days-columns: ' + this._columns.extraLarge + ';');
        }
        if (this._columns.large) {
            cardStyles.push('--days-columns-lg: ' + this._columns.large + ';');
        }
        if (this._columns.medium) {
            cardStyles.push('--days-columns-md: ' + this._columns.medium + ';');
        }
        if (this._columns.small) {
            cardStyles.push('--days-columns-sm: ' + this._columns.small + ';');
        }
        if (this._columns.extraSmall) {
            cardStyles.push('--days-columns-xs: ' + this._columns.extraSmall + ';');
        }

        return html`
            <ha-card class="${cardClasses.join(' ')}" style="${cardStyles.join(' ')}">
                <div class="card-content">
                    ${this._error ?
                        html`<ha-alert alert-type="error">${this._error}</ha-alert>` :
                        ''
                    }
                    ${this._title ?
                        html`<h1 class="card-title">${this._title}</h1>` :
                        ''
                    }
                    <div class="container${this._actions ? ' hasActions' : ''}" @click="${this._handleContainerClick}">
                        ${this._renderLegend()}
                        ${this._renderDays()}
                    </div>
                    ${this._renderEventDetailsDialog()}
                    ${this._isLoading ?
                        html`<div class="loader"></div>` :
                        ''
                    }
                </div>
            </ha-card>
        `;
    }

    _renderLegend() {
        if (!this._showLegend) {
            return html``;
        }

        return html`
            <div class="legend">
                <ul>
                    ${this._calendars.map((calendar) => {
                        if (!calendar.hideInLegend) {
                            return html`
                                <li class="${calendar.icon ? 'icon' : 'noIcon'}" style="--legend-calendar-color: ${calendar.color}">
                                    ${calendar.icon ?
                                        html`<ha-icon icon="${calendar.icon}"></ha-icon>` :
                                        ''
                                    }
                                    ${calendar.name ?? calendar.entity}
                                </li>
                            `;
                        }
                    })}
                </ul>
            </div>
        `;
    }

    _renderDays() {
        if (!this._days) {
            return html``;
        }

        return html`
            ${this._days.map((day) => {
                if (this._hideDaysWithoutEvents && day.events.length === 0 && (this._hideTodayWithoutEvents || !this._isToday(day.date))) {
                    return html``;
                }
                return html`
                    <div class="day ${day.class}" data-date="${day.date.day}" data-weekday="${day.date.weekday}" data-month="${day.date.month}" data-year="${day.date.year}" data-week="${day.date.weekNumber}">
                        <div class="date">
                            ${this._dayFormat ?
                                unsafeHTML(day.date.toFormat(this._dayFormat)) :
                                html`
                                    <span class="number">${day.date.day}</span>
                                    <span class="text">${this._getWeekDayText(day.date)}</span>
                                `
                            }
                        </div>
                        ${day.weather ?
                            html`
                                <div class="weather" @click="${this._handleWeatherClick}">
                                    ${this._weather?.showTemperature || this._weather?.showLowTemperature ?
                                        html`
                                            <div class="temperature">
                                                ${this._weather?.showTemperature ?
                                                    html`
                                                        <span class="high">${day.weather.temperature}</span>
                                                    ` :
                                                    ''
                                                }
                                                ${this._weather?.showLowTemperature ?
                                                    html`
                                                            <span class="low">${day.weather.templow}</span>
                                                    ` :
                                                    ''
                                                }
                                            </div>
                                        ` :
                                        ''
                                    }
                                    ${this._weather?.showCondition ?
                                        html`
                                            <div class="icon">
                                                <img src="${day.weather.icon}" alt="${day.weather.condition}">
                                            </div>
                                        ` :
                                        ''
                                    }
                                </div>
                            ` :
                            ''
                        }
                        <div class="events">
                            ${day.events.length === 0 ?
                                html`
                                    <div class="none">
                                        ${this._language.noEvents}
                                    </div>
                                ` :
                                html`
                                    ${day.events.map((eventKey) => {
                                        const event = this._calendarEvents[eventKey];
                                        if (!event) {
                                            return html``;
                                        } else {
                                            return html`
                                                <div
                                                    class="event ${event.class}"
                                                    data-entity="${event.calendar}"
                                                    data-additional-entities="${event.otherCalendars.join(',')}"
                                                    data-summary="${event.summary}"
                                                    data-location="${event.location ?? ''}"
                                                    data-start-hour="${event.start.toFormat('H')}"
                                                    data-start-minute="${event.start.toFormat('mm')}"
                                                    data-end-hour="${event.end.toFormat('H')}"
                                                    data-end-minute="${event.end.toFormat('mm')}"
                                                    style="--border-color: ${event.color}"
                                                    @click="${() => {
                                                        this._handleEventClick(event)
                                                    }}"
                                                >
                                                    ${event.otherColors.map((color) => {
                                                        return html`
                                                            <div class="additionalColor"
                                                                 style="--event-additional-color: ${color}"></div>
                                                        `
                                                    })}
                                                    <div class="inner">
                                                        <div class="time">
                                                            ${event.fullDay ?
                                                                html`${this._language.fullDay}` :
                                                                html`
                                                                    ${event.start.toFormat(this._timeFormat)}
                                                                    ${event.end ? ' - ' + event.end.toFormat(this._timeFormat) : ''}
                                                                `
                                                            }
                                                        </div>
                                                        <div class="title">
                                                            ${event.summary}
                                                        </div>
                                                        ${this._showLocation && event.location ?
                                                            html`
                                                                <div class="location">
                                                                    <ha-icon icon="mdi:map-marker"></ha-icon>
                                                                    ${event.location}
                                                                </div>
                                                            ` :
                                                            ''
                                                        }
                                                    </div>
                                                    ${event.icon ?
                                                        html`
                                                            <div class="icon">
                                                                <ha-icon icon="${event.icon}"></ha-icon>
                                                            </div>
                                                        ` :
                                                        ''
                                                    }
                                                </div>
                                            `
                                        }
                                    })}
                                `
                            }
                        </div>
                    </div>
                `
            })}
        `;
    }

    _renderEventDetailsDialog() {
        if (!this._currentEventDetails) {
            return html``;
        }

        return html`
            <ha-dialog
                open
                @closed="${this._closeDialog}"
                .heading="${this._renderEventDetailsDialogHeading()}"
            >
                <div class="content">
                    <div class="calendar">
                        <ha-icon icon="mdi:calendar-account"></ha-icon>
                        <div class="info">
                            ${this._currentEventDetails.calendarNames.join(', ')}
                        </div>
                    </div>
                    <div class="datetime">
                        <ha-icon icon="mdi:calendar-clock"></ha-icon>
                        <div class="info">
                            ${this._renderEventDetailsDate()}
                        </div>
                    </div>
                    ${this._currentEventDetails.location ?
                        html`
                            <div class="location">
                                <ha-icon icon="mdi:map-marker"></ha-icon>
                                <div class="info">
                                    <a href="${this._locationLink}${encodeURI(this._currentEventDetails.location)}" target="_blank">${this._currentEventDetails.location}</a>
                                </div>
                            </div>
                        ` :
                        ''
                    }
                    ${this._currentEventDetails.description ?
                        html`
                            <div class="description">
                                ${unsafeHTML(this._currentEventDetails.description)}
                            </div>
                        ` :
                        ''
                    }
                </div>
            </ha-dialog>
        `;
    }

    _renderEventDetailsDialogHeading() {
        return html`
            <div class="header_title">
                <span>${this._currentEventDetails.summary}</span>
                <ha-icon-button
                    .label="${this.hass?.localize('ui.dialogs.generic.close') ?? 'Close'}"
                    dialogAction="close"
                    class="header_button"
                ><ha-icon icon="mdi:close"></ha-icon></ha-icon-button>
            </div>
        `;
    }

    _renderEventDetailsDate() {
        const start = this._currentEventDetails.originalStart;
        const end = this._currentEventDetails.originalEnd ?? null;

        if (end === null) {
            return html`
                ${start.toFormat(this._dateFormat + ' ' + this._timeFormat)}
            `;
        } else if (this._isFullDay(start, end, true)) {
            if (Math.abs(start.diff(end, 'hours').toObject().hours) <= 24) {
                return html`
                    ${start.toFormat(this._dateFormat)}
                `;
            } else {
                // End is midnight on the next day, so remove 1 second to get the correct end date
                const endMinusOneSecond = end.minus({ seconds: 1 });
                return html`
                    ${start.toFormat(this._dateFormat)} - ${endMinusOneSecond.toFormat(this._dateFormat)}
                `;
            }
        } else if (this._isSameDay(start, end)) {
            return html`
                ${start.toFormat(this._dateFormat + ' ' + this._timeFormat) + ' - ' + end.toFormat(this._timeFormat)}
            `;
        }

        return html`
            ${start.toFormat(this._dateFormat + ' ' + this._timeFormat)} - ${end.toFormat(this._dateFormat + ' ' + this._timeFormat)}
        `;
    }

    _getWeatherIcon(weatherState) {
        const condition = weatherState?.condition;
        if (!condition) {
            return null;
        }

        const state = condition.toLowerCase();
        return ICONS[state];
    }

    _waitForHassAndConfig() {
        if (!this.hass || !this._calendars) {
            window.setTimeout(() => {
                this._waitForHassAndConfig();
            }, 50)
            return;
        }

        this._updateEvents();
    }

    _subscribeToWeatherForecast() {
        this._loading++;
        let loadingWeather = true;
        this.hass.connection.subscribeMessage((event) => {
            this._weatherForecast = event.forecast ?? [];
            if (loadingWeather) {
                this._loading--;
                loadingWeather = false;
            }
        }, {
            type: 'weather/subscribe_forecast',
            forecast_type: this._weather.useTwiceDaily ? 'twice_daily' : 'daily',
            entity_id: this._weather.entity
        });
    }

    _updateEvents() {
        if (this._loading > 0) {
            return;
        }

        this._loading++;
        this._isLoading = true;
        this._error = '';
        this._events = {};
        this._calendarEvents = {};

        this._startDate = this._getStartDate();
        let startDate = this._startDate;
        let endDate = this._startDate.plus({ days: this._numberOfDays });
        let now = DateTime.now();

        if (this._weather && this._weatherForecast === null) {
            this._subscribeToWeatherForecast();
        }

        let calendarNumber = 0;
        this._calendars.forEach(calendar => {
            if (!calendar.entity || !this.hass.states[calendar.entity]) {
                return;
            }

            if (!calendar.name) {
                calendar = {
                    ...calendar,
                    name: this.hass.formatEntityAttributeValue(this.hass.states[calendar.entity], 'friendly_name')
                }
            }
            let calendarSorting = calendarNumber;
            this._loading++;
            this.hass.callApi(
                'get',
                'calendars/' + calendar.entity + '?start=' + encodeURIComponent(startDate.toISO()) + '&end=' + encodeURIComponent(endDate.toISO())
            ).then(response => {
                response.forEach(event => {
                    if (this._isFilterEvent(event, calendar.filter ?? '')) {
                        return;
                    }

                    let startDate = this._convertApiDate(event.start);
                    let endDate = this._convertApiDate(event.end);
                    if (this._hidePastEvents && endDate < now) {
                        return;
                    }
                    let fullDay = this._isFullDay(startDate, endDate);

                    if (!fullDay && !this._isSameDay(startDate, endDate)) {
                        this._handleMultiDayEvent(event, startDate, endDate, calendar, calendarSorting);
                    } else {
                        this._addEvent(event, startDate, endDate, fullDay, calendar, calendarSorting);
                    }
                });

                this._loading--;
            }).catch(error => {
                if (!error.error) {
                    console.log(error);
                }
                this._error = 'Error while fetching calendar: ' + error.error;
                this._loading = 0;
                throw new Error(this._error);
            });
            calendarNumber++;
        });

        let checkLoading = window.setInterval(() => {
            if (this._loading === 0) {
                clearInterval(checkLoading);
                if (!this._error) {
                    this._updateCard();
                }
                this._isLoading = false;

                window.setTimeout(() => {
                    this._updateEvents();
                }, this._updateInterval * 1000);
            }
        }, 50);

        this._loading--;
    }

    _isFilterEvent(event, calendarFilter) {
        return this._filter && event.summary.match(this._filter)
            || calendarFilter && event.summary.match(calendarFilter);
    }

    _addEvent(event, startDate, endDate, fullDay, calendar, calendarSorting) {
        if (this._hideWeekend && startDate.weekday >= 6) {
            return;
        }

        const dateKey = startDate.toISODate();
        if (!this._events.hasOwnProperty(dateKey)) {
            this._events[dateKey] = [];
        }

        let eventKey = startDate.toISO() + '-' + endDate.toISO() + '-' + event.summary;
        if (!this._combineSimilarEvents) {
            eventKey = startDate.toISO() + '-' + endDate.toISO() + '-' + event.summary + '-' + calendar.entity;
        }

        if (this._calendarEvents.hasOwnProperty(eventKey)) {
            this._calendarEvents[eventKey].otherCalendars.push(calendar.entity);
            if (calendar.color && this._calendarEvents[eventKey].otherColors.indexOf(calendar.color) === -1) {
                this._calendarEvents[eventKey].otherColors.push(calendar.color)
            }
            if (calendar.name && this._calendarEvents[eventKey].calendarNames.indexOf(calendar.name) === -1) {
                this._calendarEvents[eventKey].calendarNames.push(calendar.name);
            }
            if (calendarSorting < this._calendarEvents[eventKey].calendarSorting) {
                this._calendarEvents[eventKey].calendarSorting = calendarSorting;
            }
        } else {
            this._calendarEvents[eventKey] = {
                summary: this._filterEventSummary(event.summary ?? null, calendar),
                description: event.description ?? null,
                location: event.location ?? null,
                start: startDate,
                originalStart: this._convertApiDate(event.start),
                end: endDate,
                originalEnd: this._convertApiDate(event.end),
                fullDay: fullDay,
                color: calendar.color ?? 'inherit',
                icon: calendar.icon ?? null,
                otherColors: [],
                calendar: calendar.entity,
                otherCalendars: [],
                calendarSorting: calendarSorting,
                calendarNames: [calendar.name],
                class: this._getEventClass(startDate, endDate, fullDay)
            }
            this._events[dateKey].push(eventKey);
        }
    }

    _filterEventSummary(summary, calendar) {
        if (!summary) {
            return '';
        }

        if (calendar.filterText) {
            summary = summary.replace(new RegExp(calendar.filterText), '');
        }

        if (this._filterText) {
            summary = summary.replace(new RegExp(this._filterText), '');
        }

        return summary;
    }

    _getEventClass(startDate, endDate, fullDay) {
        let classes = [];
        let now = DateTime.now();
        if (fullDay) {
            classes.push('fullday');
        }
        if (endDate < now) {
            classes.push('past');
        } else if (startDate <= now && endDate > now) {
            classes.push('ongoing');
        } else {
            classes.push('future');
        }
        return classes.join(' ');
    }

    _getDayClass(startDate) {
        let classes = [];
        if (this._isToday(startDate)) {
            classes.push('today');
        } else if (this._isTomorrow(startDate)) {
            classes.push('tomorrow');
            classes.push('future');
        } else if (this._isYesterday(startDate)) {
            classes.push('yesterday');
            classes.push('past');
        } else {
            let now = DateTime.now();
            if (startDate > now) {
                classes.push('future');
            } else {
                classes.push('past');
            }
        }
        classes.push([
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday'
        ][startDate.weekday]);
        return classes.join(' ');
    }

    _handleMultiDayEvent(event, startDate, endDate, calendar, calendarSorting) {
        while (startDate < endDate) {
            let eventStartDate = startDate;
            startDate = startDate.plus({ days: 1 }).startOf('day');
            let eventEndDate = startDate < endDate ? startDate : endDate;

            this._addEvent(event, eventStartDate, eventEndDate, this._isFullDay(eventStartDate, eventEndDate), calendar, calendarSorting);
        }
    }

    _updateCard() {
        let days = [];

        const weatherState = this._weather ? this.hass.states[this._weather.entity] : null;
        let weatherForecast = {};
        this._weatherForecast?.forEach((forecast) => {
            // Only use day time forecasts
            if (forecast.hasOwnProperty('is_daytime') && forecast.is_daytime === false) {
                return;
            }

            const dateKey = DateTime.fromISO(forecast.datetime).toISODate();
            weatherForecast[dateKey] = {
                icon: this._getWeatherIcon(forecast),
                condition: this.hass.formatEntityState(weatherState, forecast.condition),
                temperature: this.hass.formatEntityAttributeValue(weatherState, 'temperature', forecast.temperature),
                templow: this.hass.formatEntityAttributeValue(weatherState, 'templow', forecast.templow)
            };
        });

        let startDate = this._startDate;
        let endDate = this._startDate.plus({ days: this._numberOfDays });

        while (startDate < endDate) {
            if (!this._hideWeekend || startDate.weekday < 6) {
                let events = [];

                const dateKey = startDate.toISODate();
                if (this._events.hasOwnProperty(dateKey)) {
                    events = this._events[dateKey].sort((event1, event2) => {
                        if (this._calendarEvents[event1].start === this._calendarEvents[event2].start) {
                            return this._calendarEvents[event1].calendarSorting < this._calendarEvents[event2].calendarSorting ? 1 : (this._calendarEvents[event1].calendarSorting > this._calendarEvents[event2].calendarSorting) ? -1 : 0;
                        }

                        return this._calendarEvents[event1].start > this._calendarEvents[event2].start ? 1 : -1;
                    });
                }

                days.push({
                    date: startDate,
                    events: events,
                    weather: weatherForecast[dateKey] ?? null,
                    class: this._getDayClass(startDate)
                });
            }

            startDate = startDate.plus({ days: 1 });
        }

        const jsonDays = JSON.stringify(days)
        if (jsonDays !== this._jsonDays) {
            this._days = days;
            this._jsonDays = jsonDays;
        }
    }

    _getWeekDayText(date) {
        if (this._language.today && this._isToday(date)) {
            return this._language.today;
        } else if (this._language.tomorrow && this._isTomorrow(date)) {
            return this._language.tomorrow;
        } else if (this._language.yesterday && this._isYesterday(date)) {
            return this._language.yesterday;
        } else {
            const weekDays = [
                this._language.sunday,
                this._language.monday,
                this._language.tuesday,
                this._language.wednesday,
                this._language.thursday,
                this._language.friday,
                this._language.saturday,
                this._language.sunday,
            ];
            const weekDay = date.weekday;
            return weekDays[weekDay];
        }
    }

    _handleContainerClick(e) {
        if (!this._actions) {
            return;
        }

        const event = new Event(
            'hass-action', {
                bubbles: true,
                composed: true,
            }
        );
        event.detail = {
            config: this._actions,
            action: 'tap',
        }
        this.dispatchEvent(event);

        e.stopImmediatePropagation();
    }

    _handleEventClick(event) {
        if (this._actions) {
            return;
        }
        this._currentEventDetails = event;
    }

    _closeDialog() {
        this._currentEventDetails = null;
    }

    _handleWeatherClick(e) {
        const event = new Event(
            'hass-more-info', {
                bubbles: true,
                composed: true,
            }
        );
        event.detail = {
            entityId: this._weather.entity
        }
        this.dispatchEvent(event);

        e.stopImmediatePropagation();
    }

    _getNumberOfDays(numberOfDays) {
        if (numberOfDays === 'month') {
            numberOfDays = DateTime.now().daysInMonth;
        }

        return numberOfDays;
    }

    _getStartDate(alternativeStartingDay) {
        let startDate = DateTime.now();

        switch (alternativeStartingDay ?? this._startingDay) {
            case 'yesterday':
                startDate = startDate.minus({ days: 1 })
                break;
            case 'tomorrow':
                startDate = startDate.plus({ days: 1 })
                break;
            case 'sunday':
                startDate = this._getWeekDayDate(startDate, 7);
                break;
            case 'monday':
                startDate = this._getWeekDayDate(startDate, 1);
                break;
            case 'tuesday':
                startDate = this._getWeekDayDate(startDate, 2);
                break;
            case 'wednesday':
                startDate = this._getWeekDayDate(startDate, 3);
                break;
            case 'thursday':
                startDate = this._getWeekDayDate(startDate, 4);
                break;
            case 'friday':
                startDate = this._getWeekDayDate(startDate, 5);
                break;
            case 'saturday':
                startDate = this._getWeekDayDate(startDate, 6);
                break;
            case 'month':
                startDate = startDate.startOf('month');
                break;
        }

        if (this._startingDayOffset !== 0) {
            startDate = startDate.plus({ days: this._startingDayOffset });
        }

        if (this._hideWeekend && startDate.weekday >= 6) {
            startDate = this._getStartDate('monday');
        }

        return startDate.startOf('day');
    }

    _getWeekDayDate(currentDate, weekday) {
        const currentWeekDay = currentDate.weekday;
        if (currentWeekDay > weekday) {
            return currentDate.minus({ days: currentWeekDay - weekday })
        }
        if (currentWeekDay < weekday) {
            return currentDate.minus({ days: 7 - weekday + currentWeekDay })
        }

        return currentDate;
    }

    _convertApiDate(apiDate) {
        let date = null;

        if (apiDate) {
            if (apiDate.dateTime) {
                date = DateTime.fromISO(apiDate.dateTime);
            } else if (apiDate.date) {
                date = DateTime.fromISO(apiDate.date);
            }
        }

        return date;
    }

    _isFullDay(startDate, endDate, multiDay) {
        if (
            startDate === null
            || endDate === null
            || startDate.hour > 0
            || startDate.minute > 0
            || startDate.second > 0
            || endDate.hour > 0
            || endDate.minute > 0
            || endDate.second > 0
        ) {
            return false;
        }

        return multiDay || Math.abs(startDate.diff(endDate, 'days').toObject().days) === 1;
    }

    _isSameDay(date1, date2) {
        if (date1 === null && date2 === null) {
            return true;
        }

        if (date1 === null || date2 === null) {
            return false;
        }

        return date1.day === date2.day
            && date1.month === date2.month
            && date1.year === date2.year
    }

    _isToday(date) {
        const today = DateTime.now().startOf('day');
        return this._isSameDay(date, today);
    }

    _isTomorrow(date) {
        const tomorrow = DateTime.now().startOf('day').plus({ days: 1 });
        return this._isSameDay(date, tomorrow);
    }

    _isYesterday(date) {
        const yesterday = DateTime.now().startOf('day').minus({ days: 1 });
        return this._isSameDay(date, yesterday);
    }
}
