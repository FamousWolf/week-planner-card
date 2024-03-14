import { html, LitElement } from 'lit';
import styles from './card.styles';
import moment from 'moment';

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
            _error: { type: String }
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
        this._numberOfDays = config.days ?? 7;
        this._updateInterval = config.updateInterval ?? 60;
        this._noCardBackground = config.noCardBackground ?? false;
        this._eventBackground = config.eventBackground ?? 'var(--card-background-color, inherit)';
        this._language = Object.assign(
            {},
            {
                fullDay: 'Entire day',
                noEvents: 'No events',
                today: 'Today',
                tomorrow: 'Tomorrow',
                sunday: 'Sunday',
                monday: 'Monday',
                tuesday: 'Tuesday',
                wednesday: 'Wednesday',
                thursday: 'Thursday',
                friday: 'Friday',
                saturday: 'Saturday'
            },
            config.texts ?? {}
        );
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
                                            <div class="event" style="--border-color: ${event.color}">
                                                <div class="time">
                                                    ${event.fullDay ?
                                                        html`${this._language.fullDay}` :
                                                        html `
                                                            ${event.start.format('HH:mm')}
                                                            ${event.end ? ' - ' + event.end.format('HH:mm') : ''}
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
            start: startDate,
            end: endDate,
            fullDay: fullDay,
            color: calendar.color ?? 'inherit'
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

        let startDate = moment().startOf('day');
        let endDate = moment().startOf('day').add(this._numberOfDays, 'days');

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
                events: events
            });
            startDate.add(1, 'days');
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

    _isFullDay(startDate, endDate) {
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

        return startDate.diff(endDate, 'days', true) === -1;
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
