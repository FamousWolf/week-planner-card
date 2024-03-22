import { html, LitElement } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'
import moment from 'moment/min/moment-with-locales';
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
    _jsonDays = '';
    _calendars;
    _numberOfDays;
    _updateInterval;
    _noCardBackground;
    _eventBackground;
    _language;
    _weather;
    _dateFormat;
    _timeFormat;
    _locationLink;

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

        this._calendars = config.calendars;
        this._weather = this._getWeatherConfig(config.weather);
        this._numberOfDays = config.days ?? 7;
        this._updateInterval = config.updateInterval ?? 60;
        this._noCardBackground = config.noCardBackground ?? false;
        this._eventBackground = config.eventBackground ?? 'var(--card-background-color, inherit)';
        this._dateFormat = config.dateFormat ?? 'dddd DD MMMM YYYY';
        this._timeFormat = config.timeFormat ?? 'HH:mm';
        this._locationLink = config.locationLink ?? 'https://www.google.com/maps/search/?api=1&query=';
        if (config.locale) {
            moment.locale(config.locale);
        }
        this._language = Object.assign(
            {},
            {
                fullDay: 'Entire day',
                noEvents: 'No events',
                today: 'Today',
                tomorrow: 'Tomorrow',
                sunday: moment().day(0).format('dddd'),
                monday: moment().day(1).format('dddd'),
                tuesday: moment().day(2).format('dddd'),
                wednesday: moment().day(3).format('dddd'),
                thursday: moment().day(4).format('dddd'),
                friday: moment().day(5).format('dddd'),
                saturday: moment().day(6).format('dddd')
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

        return html`
            <ha-card class="${this._noCardBackground ? 'nobackground' : ''}" style="--event-background-color: ${this._eventBackground}">
                <div class="card-content">
                    ${this._error ?
                        html`<ha-alert alert-type="error">${this._error}</ha-alert>` :
                        ''
                    }
                    <div class="container">
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

    _renderDays() {
        if (!this._days) {
            return html``;
        }

        return html`
            ${this._days.map((day) => {
                return html`
                    <div class="day">
                        <div class="date">
                            <span class="number">${day.date.date()}</span>
                            <span class="text">${this._getWeekDayText(day.date)}</span>
                        </div>
                        ${day.weather ?
                            html`
                                <div class="weather">
                                    ${this._weather.showTemperature || this._weather.showLowTemperature ?
                                        html`
                                            <div class="temperature">
                                                ${this._weather.showTemperature ?
                                                    html`
                                                        <span class="high">${day.weather.temperature}</span>
                                                    ` :
                                                    ''
                                                }
                                                ${this._weather.showLowTemperature ?
                                                    html`
                                                            <span class="low">${day.weather.templow}</span>
                                                    ` :
                                                    ''
                                                }
                                            </div>
                                        ` :
                                        ''
                                    }
                                    ${this._weather.showCondition ?
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
                                    ${day.events.map((event) => {
                                        return html`
                                            <div class="event" style="--border-color: ${event.color}" @click="${() => { this._handleEventClick(event) }}">
                                                <div class="time">
                                                    ${event.fullDay ?
                                                        html`${this._language.fullDay}` :
                                                        html`
                                                            ${event.start.format(this._timeFormat)}
                                                            ${event.end ? ' - ' + event.end.format(this._timeFormat) : ''}
                                                        `
                                                    }
                                                </div>
                                                <div class="title">
                                                    ${event.summary}
                                                </div>
                                            </div>
                                        `
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
                            ${this.hass.formatEntityAttributeValue(this.hass.states[this._currentEventDetails.calendar], 'friendly_name')}
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
                ${start.format(this._dateFormat + ' ' + this._timeFormat)}
            `;
        } else if (this._isFullDay(start, end, true)) {
            if (Math.abs(moment.duration(start.diff(end)).asHours()) <= 24) {
                return html`
                    ${start.format(this._dateFormat)}
                `;
            } else {
                return html`
                    ${start.format(this._dateFormat)} - ${end.format(this._dateFormat)}
                `;
            }
        } else if (this._isSameDay(start, end)) {
            return html`
                ${start.format(this._dateFormat + ' ' + this._timeFormat) + ' - ' + end.format(this._timeFormat)}
            `;
        }

        return html`
            ${start.format(this._dateFormat + ' ' + this._timeFormat)} - ${end.format(this._dateFormat + ' ' + this._timeFormat)}
        `;
    }

    _getWeatherIcon(weatherState, dayNumber) {
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

    _updateEvents() {
        if (this._loading > 0) {
            return;
        }

        this._loading++;
        this._isLoading = true;
        this._error = '';
        this._events = {};

        let startDate = moment().startOf('day');
        let endDate = moment().startOf('day').add(this._numberOfDays, 'days');

        this._calendars.forEach(calendar => {
            this._loading++;
            this.hass.callApi(
                'get',
                'calendars/' + calendar.entity + '?start=' + startDate.format('YYYY-MM-DD[T]HH:mm:ss[Z]') + '&end=' + endDate.format('YYYY-MM-DD[T]HH:mm:ss[Z]')
            ).then(response => {
                response.forEach(event => {
                    let startDate = this._convertApiDate(event.start);
                    let endDate = this._convertApiDate(event.end);
                    let fullDay = this._isFullDay(startDate, endDate);

                    if (!fullDay && !this._isSameDay(startDate, endDate)) {
                        this._handleMultiDayEvent(event, startDate, endDate, calendar);
                    } else {
                        this._addEvent(event, startDate, endDate, fullDay, calendar);
                    }
                });

                this._loading--;
            }).catch(error => {
                this._error = 'Error while fetching calendar: ' + error.error;
                this._loading = 0;
                throw new Error(this._error);
            });
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

    _addEvent(event, startDate, endDate, fullDay, calendar) {
        const dateKey = startDate.format('YYYY-MM-DD');
        if (!this._events.hasOwnProperty(dateKey)) {
            this._events[dateKey] = [];
        }

        this._events[dateKey].push({
            summary: event.summary ?? null,
            description: event.description ?? null,
            location: event.location ?? null,
            start: startDate,
            originalStart: this._convertApiDate(event.start),
            end: endDate,
            originalEnd: this._convertApiDate(event.end),
            fullDay: fullDay,
            color: calendar.color ?? 'inherit',
            calendar: calendar.entity
        });
    }

    _handleMultiDayEvent(event, startDate, endDate, calendar) {
        while (startDate < endDate) {
            let eventStartDate = moment(startDate);
            startDate.add(1, 'days');
            startDate.startOf('day');
            let eventEndDate = startDate < endDate ? moment(startDate) : moment(endDate);

            this._addEvent(event, eventStartDate, eventEndDate, this._isFullDay(eventStartDate, eventEndDate), calendar);
        }
    }

    _updateCard() {
        let days = [];

        const weatherState = this._weather ? this.hass.states[this._weather.entity] : null;

        let startDate = moment().startOf('day');
        let endDate = moment().startOf('day').add(this._numberOfDays, 'days');

        let dayNumber = 0;
        while (startDate < endDate) {
            let events = [];

            const dateKey = startDate.format('YYYY-MM-DD');
            if (this._events.hasOwnProperty(dateKey)) {
                events = this._events[dateKey].sort((event1, event2) => {
                    return event1.start > event2.start ? 1 : (event1.start < event2.start) ? -1 : 0;
                });
            }

            days.push({
                date: moment(startDate),
                events: events,
                weather: weatherState?.attributes?.forecast[dayNumber] ? {
                    icon: this._getWeatherIcon(weatherState.attributes.forecast[dayNumber], dayNumber),
                    condition: this.hass.formatEntityState(weatherState, weatherState.attributes.forecast[dayNumber].condition),
                    temperature: this.hass.formatEntityAttributeValue(weatherState, 'temperature', weatherState.attributes.forecast[dayNumber].temperature),
                    templow: this.hass.formatEntityAttributeValue(weatherState, 'templow', weatherState.attributes.forecast[dayNumber].templow)
                } : null,
            });
            startDate.add(1, 'days');
            dayNumber++;
        }

        const jsonDays = JSON.stringify(days)
        if (jsonDays !== this._jsonDays) {
            this._days = days;
            this._jsonDays = jsonDays;
        }
    }

    _getWeekDayText(date) {
        const today = moment().startOf('day');
        const tomorrow = moment().startOf('day').add(1, 'days');
        if (this._isSameDay(date, today)) {
            return this._language.today;
        } else if (this._isSameDay(date, tomorrow)) {
            return this._language.tomorrow;
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
            const weekDay = date.day();
            return weekDays[weekDay];
        }
    }
    
    _handleEventClick(event) {
        this._currentEventDetails = event;
    }

    _closeDialog() {
        this._currentEventDetails = null;
    }

    _convertApiDate(apiDate) {
        let date = null;

        if (apiDate) {
            if (apiDate.dateTime) {
                date = moment(apiDate.dateTime);
            } else if (apiDate.date) {
                date = moment(apiDate.date);
            }
        }

        return date;
    }

    _isFullDay(startDate, endDate, multiDay) {
        if (
            startDate === null
            || endDate === null
            || startDate.hour() > 0
            || startDate.minute() > 0
            || startDate.second() > 0
            || endDate.hour() > 0
            || endDate.minute() > 0
            || endDate.second() > 0
        ) {
            return false;
        }

        return multiDay || Math.abs(startDate.diff(endDate, 'days', true)) === 1;
    }

    _isSameDay(date1, date2) {
        if (date1 === null && date2 === null) {
            return true;
        }

        if (date1 === null || date2 === null) {
            return false;
        }

        return date1.date() === date2.date()
            && date1.month() === date2.month()
            && date1.year() === date2.year()
    }
}
