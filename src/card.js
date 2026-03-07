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
    _calendars;
    _numberOfDays;
    _numberOfDaysIsMonth;
    _updateInterval;
    _noCardBackground;
    _eventBackground;
    _compact;
    _language;
    _weather;
    _dateFormat;
    _timeFormat;
    _multiDayTimeFormat;
    _multiDayMode;
    _locationLink;
    _startDate;
    _hideWeekend;
    _startingDay;
    _startingDayOffset;
    _weatherForecast = null;
    _showLocation;
    _hidePastEvents;
    _hideAllDayEvents;
    _hideDaysWithoutEvents;
    _hideTodayWithoutEvents;
    _filter;
    _filterText;
    _replaceTitleText;
    _combineSimilarEvents;
    _showLegend;
    _legendToggle;
    _actions;
    _columns;
    _loader;
    _showNavigation;
    _navigationOffset = 0;
    _updateEventsTimeouts = [];
    _calendarErrors = [];

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
            showWeekDayText: true,
            hideWeekend: false,
            noCardBackground: false,
            compact: false,
            weather: {
                showCondition: true,
                showTemperature: false,
                showLowTemperature: false,
                roundTemperature: false,
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
            _error: { type: String },
            _currentEventDetails: { type: Object },
            _hideCalendars: { type: Array },
            _showCreateEventDialog: { type: Object },
            _showEditEventDialog: { type: Object },
            _editFormData: { type: Object }
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

        this._numberOfDaysIsMonth = this._isNumberOfDaysMonth(config.days ?? 7);
        this._title = config.title ?? null;
        this._calendars = config.calendars;
        this._defaultCalendar = config.defaultCalendar ?? null;
        this._weather = this._getWeatherConfig(config.weather);
        this._numberOfDays = this._getNumberOfDays(config.days ?? 7);
        this._hideWeekend = config.hideWeekend ?? false;
        this._showNavigation = config.showNavigation ?? false;
        this._startingDay = config.startingDay ?? 'today';
        this._startingDayOffset = config.startingDayOffset ?? 0;
        this._showWeekDayText = config.showWeekDayText ?? true;
        this._startDate = this._getStartDate();
        this._updateInterval = config.updateInterval ?? 60;
        this._noCardBackground = config.noCardBackground ?? false;
        this._eventBackground = config.eventBackground ?? 'var(--card-background-color, inherit)';
        this._compact = config.compact ?? false;
        this._theme = config.theme ?? 'default';
        this._dayFormat = config.dayFormat ?? null;
        this._dateFormat = config.dateFormat ?? 'cccc d LLLL yyyy';
        this._timeFormat = config.timeFormat ?? 'HH:mm';
        this._multiDayTimeFormat = config._multiDayTimeFormat ?? 'd LLL HH:mm';
        this._multiDayMode = config.multiDayMode ?? 'default';
        this._locationLink = config.locationLink ?? 'https://www.google.com/maps/search/?api=1&query=';
        this._showTitle = config.showTitle ?? true;
        this._showDescription = config.showDescription ?? false;
        this._showLocation = config.showLocation ?? false;
        this._showTime = config.showTime ?? false;
        this._showDayName = config.showDayName ?? false;
        this._showDate = config.showDate ?? false;
        this._showCalendarName = config.showCalendarName ?? false;
        this._showWeather = config.showWeather ?? true;
        this._showCurrentWeather = config.showCurrentWeather ?? false;
        this._hidePastEvents = config.hidePastEvents ?? false;
        this._hideAllDayEvents = config.hideAllDayEvents ?? false;
        this._hideDaysWithoutEvents = config.hideDaysWithoutEvents ?? false;
        this._hideTodayWithoutEvents = config.hideTodayWithoutEvents ?? false;
        this._filter = config.filter ?? false;
        this._filterText = config.filterText ?? false;
        this._replaceTitleText = config.replaceTitleText ?? false;
        this._combineSimilarEvents = config.combineSimilarEvents ?? false;
        this._showLegend = config.showLegend ?? false;
        this._legendToggle = config.legendToggle ?? false;
        this._actions = config.actions ?? false;
        this._columns = config.columns ?? {};
        this._dayHeaderFontSize = config.dayHeaderFontSize ?? null;
        this._dayHeaderColor = config.dayHeaderColor ?? null;
        this._maxEvents = config.maxEvents ?? false;
        this._maxDayEvents = config.maxDayEvents ?? false;
        this._hideCalendars = (config.calendars || []).reduce((acc, calendar) => {
            if (calendar.initiallyHidden && calendar.entity) {
                acc.push(calendar.entity);
            }
            return acc;
        }, []);
        if (config.locale) {
            LuxonSettings.defaultLocale = config.locale;
        }
        this._language = Object.assign(
            {},
            {
                fullDay: 'Entire day',
                noEvents: 'No events',
                moreEvents: 'More events',
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

    _isNumberOfDaysMonth(numberOfDays) {
        return String(numberOfDays).toLowerCase().trim() === 'month';
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
            showLowTemperature: false,
            roundTemperature: false,
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
        if (!this._loader) {
            this._loader = this._getLoader();
        }

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
        if (this._theme && this._theme !== 'default') {
            cardClasses.push(this._theme);
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
        if (this._dayHeaderFontSize) {
            cardStyles.push('--day-header-font-size: ' + this._dayHeaderFontSize + ';');
        }
        if (this._dayHeaderColor) {
            cardStyles.push('--day-header-color: ' + this._dayHeaderColor + ';');
        }

        return html`
            <ha-card class="${cardClasses.join(' ')}" style="${cardStyles.join(' ')}">
                <div class="card-content">
                    ${this._error ?
                        html`<div class="errors"><ha-alert alert-type="error">${this._error}</ha-alert></div>` :
                        ''
                    }
                    ${(this._title && this._showTitle) || this._showCurrentWeather ?
                        html`<div class="card-header-row">
                            ${this._title && this._showTitle ? html`<h1 class="card-title">${this._title}</h1>` : html`<div></div>`}
                            ${this._renderCurrentWeather()}
                        </div>` :
                        ''
                    }
                    <div class="container${this._actions ? ' hasActions' : ''}" @click="${this._handleContainerClick}">
                        ${this._renderHeader()}
                        ${this._renderWeekDays()}
                        ${this._renderDays()}
                    </div>
                    ${this._renderEventDetailsDialog()}
                    ${this._renderCreateEventDialog()}
                    ${this._renderEditEventDialog()}
                    ${this._loader}
                </div>
            </ha-card>
        `;
    }

    _renderHeader() {
        if (!this._showLegend && !this._showNavigation) {
            return html``;
        }

        return html`
            <div class="header">
                ${this._renderNavigation()}
                ${this._renderLegend()}
            </div>
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
                                <li class="${calendar.icon ? 'icon' : 'noIcon'}${this._legendToggle ? ' hasToggle' : ''}${this._hideCalendars.indexOf(calendar.entity) === -1 ? '' : ' hidden'}" style="--legend-calendar-color: ${calendar.color ?? 'inherit'}" @click="${() => {
                                    this._handleLegendClick(calendar)
                                }}">
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

    _renderNavigation() {
        if (!this._showNavigation) {
            return html``;
        }

        return html`
            <div class="navigation">
                <ul>
                    <li @click="${this._handleNavigationPreviousClick}"><ha-icon icon="mdi:arrow-left"></ha-icon></li>
                    <li @click="${this._handleNavigationOriginalClick}"><ha-icon icon="mdi:circle-medium"></ha-icon></li>
                    <li @click="${this._handleNavigationNextClick}"><ha-icon icon="mdi:arrow-right"></ha-icon></li>
                </ul>
                <div class="month">${this._startDate.toFormat('MMMM yyyy')}</div>
            </div>
        `;
    }

    _renderWeekDays() {
        if (this._showWeekDayText || !this._days) {
            return html``;
        }

        if (!this._numberOfDaysIsMonth && this._numberOfDays < 7) {
            return html``;
        }

        const days = this._days.slice(0, 7);
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

        return html`
            ${days.map((day) => {
                return html`
                    <div class="day header">
                        <div class="date">
                            <span class="text">${weekDays[day.date.weekday]}</span>
                        </div>
                    </div>
                `
            })}
        `;
    }

    _renderDays() {
        if (!this._days) {
            return html``;
        }

        return html`
            ${this._days.map((day) => {
                if (day.isOutsideMonth) {
                    return html`<div class="day ${day.class}"></div>`;
                }

                if (this._hideDaysWithoutEvents && day.events.length === 0 && (this._hideTodayWithoutEvents || !this._isToday(day.date))) {
                    return html``;
                }
                return html`
                    <div class="day ${day.class}" data-date="${day.date.day}" data-weekday="${day.date.weekday}" data-month="${day.date.month}" data-year="${day.date.year}" data-week="${day.date.weekNumber}">
                        <div class="date">
                            ${this._theme === 'skylight' ?
                                html`
                                    <span class="skylight-day-header">
                                        <span class="day-label">${day.date.toFormat('ccc')} ${day.date.day}</span>
                                        <span class="add-event-text" @click="${(e) => this._handleAddEventClick(e, day)}">+ Add Event</span>
                                    </span>
                                ` :
                                (this._dayFormat ?
                                    unsafeHTML(day.date.toFormat(this._dayFormat)) :
                                    html`
                                        <span class="number">${day.date.day}</span>
                                        ${this._showDayName || (this._showWeekDayText && !this._numberOfDaysIsMonth && this._numberOfDays < 7) ?
                                            html`<span class="text">${this._getWeekDayText(day.date)}</span>` :
                                            ''
                                        }
                                    `
                                )
                            }
                        </div>
                        ${this._showWeather && day.weather ?
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
                                        this._getWeatherIcon(day.weather.state, day.weather.condition) :
                                        ''
                                    }
                                </div>
                            ` :
                            ''
                        }
                        <div class="events">
                            ${this._renderEvents(day)}
                        </div>
                        <div class="add-event" @click="${(e) => this._handleAddEventClick(e, day)}">
                            <ha-icon icon="mdi:plus"></ha-icon>
                        </div>
                    </div>
                `
            })}
        `;
    }

    _renderEvents(day) {
        const dayEvents = [];
        day.events.map((eventKey) => {
            if (!this._calendarEvents[eventKey]) {
                return;
            }

            const event = Object.assign({}, this._calendarEvents[eventKey]);

            // Remove events and colors for calendars that are hidden
            const eventCalendars = [...event.calendars];
            const colors = [...event.colors];
            let i = 0;
            while (i < eventCalendars.length) {
                if (this._hideCalendars.indexOf(eventCalendars[i]) > -1) {
                    eventCalendars.splice(i, 1);
                    colors.splice(i, 1);
                } else {
                    i++;
                }
            }

            if (eventCalendars.length === 0) {
                return;
            }

            event.calendars = eventCalendars;
            event.colors = colors;

            dayEvents.push(event);
        });

        if (dayEvents.length === 0) {
            return this._renderNoEvents();
        }

        let moreEvents = false;
        if (this._maxDayEvents > 0 && dayEvents.length > this._maxDayEvents) {
            dayEvents.splice(this._maxDayEvents);
            moreEvents = true;
        }

        return html`
            ${dayEvents.map((event) => {
                const doneColors = [event.colors[0]];
                return html`
                    <div
                        class="event ${event.class}"
                        data-entity="${event.calendars[0]}"
                        data-additional-entities="${event.calendars.join(',')}"
                        data-summary="${event.summary}"
                        data-location="${event.location ?? ''}"
                        data-start-hour="${event.start.toFormat('H')}"
                        data-start-minute="${event.start.toFormat('mm')}"
                        data-end-hour="${event.end.toFormat('H')}"
                        data-end-minute="${event.end.toFormat('mm')}"
                        style="--border-color: ${event.colors[0]}; --event-bg-tint: ${event.colors[0]}; --dot-color: ${event.colors[0]}"
                        @click="${() => {
                            this._handleEventClick(event)
                        }}"
                    >
                        ${event.colors.map((color) => {
                            if (doneColors.indexOf(color) > -1) {
                                return '';
                            }
                            doneColors.push(color);
                            return html`
                                <div
                                    class="additionalColor"
                                    style="--event-additional-color: ${color}"
                                ></div>
                            `
                        })}
                        <div class="inner">
                            ${this._theme === 'skylight' ?
                                html`
                                    <div class="title">${event.summary}</div>
                                    ${this._showTime ?
                                        html`<div class="time">${this._renderEventTime(event)}</div>` :
                                        ''
                                    }
                                ` :
                                html`
                                    ${this._showTime ?
                                        html`<div class="time">${this._renderEventTime(event)}</div>` :
                                        ''
                                    }
                                    <div class="title">${event.summary}</div>
                                `
                            }
                            ${this._showDescription ?
                                html`
                                    <div class="description">
                                        ${unsafeHTML(event.description)}
                                    </div>
                                ` :
                                ''
                            }
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
                        ${this._theme === 'skylight' ?
                            html`<div class="calendar-dot"></div>` :
                            ''
                        }
                    </div>
                `
            })}
            ${moreEvents ?
                html`
                    <div class="more">
                        ${this._language.moreEvents}
                    </div>
                ` :
                ''
            }
        `;
    }

    _renderEventTime(event) {
        if (event.multiDay && this._multiDayMode !== 'default') {
            return html`
                ${event.originalStart.toFormat(this._multiDayTimeFormat)}
                ${' - ' + event.originalEnd.toFormat(this._multiDayTimeFormat)}
            `;
        } else if (event.fullDay) {
            return html`${this._language.fullDay}`;
        } else {
            return html`
                ${event.start.toFormat(this._timeFormat)}
                ${event.end ? ' - ' + event.end.toFormat(this._timeFormat) : ''}
            `;
        }
    }

    _renderNoEvents() {
        return html`
            <div class="none">
                ${this._language.noEvents}
            </div>
        `;
    }

    _renderCurrentWeather() {
        if (!this._showCurrentWeather || !this._weather) {
            return html``;
        }

        const weatherState = this.hass?.states[this._weather.entity];
        if (!weatherState) {
            return html``;
        }

        const condition = weatherState.state;
        const temperature = this._weather.roundTemperature
            ? Math.round(weatherState.attributes.temperature)
            : weatherState.attributes.temperature;
        const formattedTemp = this.hass.formatEntityAttributeValue(weatherState, 'temperature', temperature);

        return html`
            <div class="current-weather" @click="${this._handleWeatherClick}">
                ${this._getWeatherIcon(condition, this.hass.formatEntityState(weatherState))}
                <span class="temperature">${formattedTemp}</span>
            </div>
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
                    ${this._showCalendarName ?
                        html`<div class="calendar">
                            <ha-icon icon="mdi:calendar-account"></ha-icon>
                            <div class="info">
                                ${this._currentEventDetails.calendarNames.join(', ')}
                            </div>
                        </div>` :
                        ''
                    }
                    ${this._showDate ?
                        html`<div class="datetime">
                            <ha-icon icon="mdi:calendar-clock"></ha-icon>
                            <div class="info">
                                ${this._renderEventDetailsDate()}
                            </div>
                        </div>` :
                        ''
                    }
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
                    ${this._currentEventDetails.uid ?
                        html`
                            <div class="event-actions">
                                <button class="btn btn-edit" @click="${this._handleEditEventClick}">
                                    <ha-icon icon="mdi:pencil"></ha-icon> Modifier
                                </button>
                                <button class="btn btn-delete" @click="${this._handleDeleteEvent}">
                                    <ha-icon icon="mdi:delete"></ha-icon> Supprimer
                                </button>
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

    _renderCreateEventDialog() {
        if (!this._showCreateEventDialog) {
            return html``;
        }

        const dayDate = this._showCreateEventDialog.date;
        const now = DateTime.now();
        const defaultStart = dayDate.set({
            hour: now.hour + 1,
            minute: 0,
            second: 0,
            millisecond: 0,
        });
        const defaultEnd = defaultStart.plus({ hours: 1 });
        const startValue = defaultStart.toFormat("yyyy-MM-dd'T'HH:mm");
        const endValue = defaultEnd.toFormat("yyyy-MM-dd'T'HH:mm");

        return html`
            <ha-dialog
                open
                @closed="${this._closeCreateEventDialog}"
                .heading="${this._renderCreateEventDialogHeading()}"
            >
                <div class="create-event-form">
                    <div class="form-row">
                        <label for="event-title">Titre *</label>
                        <input type="text" id="event-title" class="form-input" required placeholder="Titre de l'événement" />
                    </div>
                    <div class="form-row">
                        <label for="event-calendar">Calendrier</label>
                        <select id="event-calendar" class="form-input">
                            ${this._calendars.map((calendar) => html`
                                <option value="${calendar.entity}" ?selected="${calendar.entity === this._defaultCalendar}">${calendar.name ?? calendar.entity}</option>
                            `)}
                        </select>
                    </div>
                    <div class="form-row">
                        <label for="event-start">Début *</label>
                        <input type="datetime-local" id="event-start" class="form-input" .value="${startValue}" required />
                    </div>
                    <div class="form-row">
                        <label for="event-end">Fin</label>
                        <input type="datetime-local" id="event-end" class="form-input" .value="${endValue}" />
                    </div>
                    <div class="form-actions">
                        <button class="btn btn-cancel" @click="${this._closeCreateEventDialog}">Annuler</button>
                        <button class="btn btn-submit" @click="${this._handleCreateEvent}">Créer</button>
                    </div>
                </div>
            </ha-dialog>
        `;
    }

    _renderCreateEventDialogHeading() {
        return html`
            <div class="header_title">
                <span>Nouvel événement</span>
                <ha-icon-button
                    .label="${this.hass?.localize('ui.dialogs.generic.close') ?? 'Close'}"
                    dialogAction="close"
                    class="header_button"
                ><ha-icon icon="mdi:close"></ha-icon></ha-icon-button>
            </div>
        `;
    }

    _renderEditEventDialog() {
        if (!this._showEditEventDialog || !this._editFormData) {
            return html``;
        }

        const event = this._showEditEventDialog;
        const form = this._editFormData;

        return html`
            <ha-dialog
                open
                @closed="${this._closeEditEventDialog}"
                .heading="${this._renderEditEventDialogHeading()}"
            >
                <div class="create-event-form">
                    <div class="form-row">
                        <label for="edit-event-title">Titre *</label>
                        <input type="text" id="edit-event-title" class="form-input" required
                            .value="${form.title}"
                            @input="${(e) => { this._editFormData = { ...this._editFormData, title: e.target.value }; }}" />
                    </div>
                    <div class="form-row">
                        <label for="edit-event-calendar">Calendrier</label>
                        <select id="edit-event-calendar" class="form-input"
                            @change="${(e) => { this._editFormData = { ...this._editFormData, calendar: e.target.value }; }}">
                            ${this._calendars.map((calendar) => html`
                                <option value="${calendar.entity}" ?selected="${calendar.entity === form.calendar}">${calendar.name ?? calendar.entity}</option>
                            `)}
                        </select>
                    </div>
                    <div class="form-row">
                        <label for="edit-event-start">Début *</label>
                        <input type="datetime-local" id="edit-event-start" class="form-input" required
                            .value="${form.start}"
                            @input="${(e) => { this._editFormData = { ...this._editFormData, start: e.target.value }; }}" />
                    </div>
                    <div class="form-row">
                        <label for="edit-event-end">Fin</label>
                        <input type="datetime-local" id="edit-event-end" class="form-input"
                            .value="${form.end}"
                            @input="${(e) => { this._editFormData = { ...this._editFormData, end: e.target.value }; }}" />
                    </div>
                    <div class="form-actions">
                        <button class="btn btn-delete" @click="${this._handleDeleteEventFromEdit}">
                            <ha-icon icon="mdi:delete"></ha-icon> Supprimer
                        </button>
                        <button class="btn btn-cancel" @click="${this._closeEditEventDialog}">Annuler</button>
                        <button class="btn btn-submit" @click="${this._handleUpdateEvent}">Enregistrer</button>
                    </div>
                </div>
            </ha-dialog>
        `;
    }

    _renderEditEventDialogHeading() {
        return html`
            <div class="header_title">
                <span>Modifier l'événement</span>
                <ha-icon-button
                    .label="${this.hass?.localize('ui.dialogs.generic.close') ?? 'Close'}"
                    dialogAction="close"
                    class="header_button"
                ><ha-icon icon="mdi:close"></ha-icon></ha-icon-button>
            </div>
        `;
    }

    _getLoader() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.style.display = 'none';
        return loader;
    }

    _updateLoader() {
        if (this._loading > 0) {
            this._loader.style.display = 'inherit';
        } else {
            this._loader.style.display = 'none';
        }
    }

    _getWeatherIcon(state, condition) {
        if (!state) {
            return null;
        }

        const customWeatherIcon = getComputedStyle(this).getPropertyValue('--weather-icon-' + state).trim();
        if (customWeatherIcon !== null && ['', 'none', 'inherit'].indexOf(customWeatherIcon) === -1) {
            return html`<div class="icon" style="background-image: var(--weather-icon-${state})"></div>`;
        }

        return html`
                <div class="icon">
                    <img src="${ICONS[state]}" alt="${condition}">
                </div>
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

    _subscribeToWeatherForecast() {
        this._loading++;
        this._updateLoader();
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
        this._updateLoader();

        this._clearUpdateEventsTimeouts();

        this._events = {};
        this._calendarEvents = {};

        this._startDate = this._getStartDate();
        if (this._numberOfDaysIsMonth) {
            this._numberOfDays = this._startDate.daysInMonth;
        }
        let startDate = this._startDate;
        let endDate = this._startDate.plus({ days: this._numberOfDays });
        let now = DateTime.now();
        let runStartdate = this._startDate.toISO();

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
            if (!calendar.sorting) {
                calendar = {
                    ...calendar,
                    sorting: calendarNumber
                }
            }
            let currentCalendarNumber = calendarNumber;
            this._loading++;
            this.hass.callApi(
                'get',
                'calendars/' + calendar.entity + '?start=' + encodeURIComponent(startDate.toISO()) + '&end=' + encodeURIComponent(endDate.toISO())
            ).then(response => {
                if (this._startDate.toISO() !== runStartdate) {
                    this._loading--;
                    return;
                }

                this._calendarErrors[currentCalendarNumber] = '';

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
                        this._handleMultiDayEvent(event, startDate, endDate, calendar);
                    } else {
                        this._addEvent(event, startDate, endDate, fullDay, calendar);
                    }
                });

                this._loading--;
            }).catch(error => {
                this._calendarErrors[currentCalendarNumber] = 'Error while fetching calendar "' + calendar.entity + '": ' + (error.error ?? 'Unknown error');
                this._loading--;
            });
            calendarNumber++;
        });

        let checkLoading = window.setInterval(() => {
            if (this._loading === 0) {
                clearInterval(checkLoading);
                this._updateCard();
                this._updateLoader();

                this._updateEventsTimeouts.push(
                    window.setTimeout(() => {
                        this._updateEvents();
                    }, this._updateInterval * 1000)
                );
            }
        }, 50);

        this._loading--;
    }

    _clearUpdateEventsTimeouts() {
        this._updateEventsTimeouts.forEach(timeout => {
            clearTimeout(timeout);
        });
    }

    _isFilterEvent(event, calendarFilter) {
        return this._filter && event.summary.match(this._filter)
            || calendarFilter && event.summary.match(calendarFilter);
    }

    _addEvent(event, startDate, endDate, fullDay, calendar, multiDay) {
        multiDay = multiDay ?? false;

        if (
            this._hideWeekend && startDate.weekday >= 6
            || fullDay && this._hideAllDayEvents
        ) {
            return;
        }

        const dateKey = startDate.toISODate();
        if (!this._events.hasOwnProperty(dateKey)) {
            this._events[dateKey] = [];
        }

        const title = this._filterEventSummary(event, calendar);

        let eventKey = startDate.toISO() + '-' + endDate.toISO() + '-' + title;
        if (!this._combineSimilarEvents) {
            eventKey = startDate.toISO() + '-' + endDate.toISO() + '-' + title + '-' + calendar.entity;
        }

        if (this._calendarEvents.hasOwnProperty(eventKey)) {
            this._calendarEvents[eventKey].calendars.push(calendar.entity);
            this._calendarEvents[eventKey].colors.push(calendar.color ?? 'inherit')
            if (calendar.name && this._calendarEvents[eventKey].calendarNames.indexOf(calendar.name) === -1) {
                this._calendarEvents[eventKey].calendarNames.push(calendar.name);
            }
            if (calendar.sorting < this._calendarEvents[eventKey].calendarSorting) {
                this._calendarEvents[eventKey].calendarSorting = calendar.sorting;
            }
        } else {
            this._calendarEvents[eventKey] = {
                summary: title,
                description: event.description ?? null,
                location: event.location ?? null,
                start: startDate,
                originalStart: this._convertApiDate(event.start),
                end: endDate,
                originalEnd: this._convertApiDate(event.end),
                fullDay: fullDay,
                multiDay: multiDay,
                colors: [calendar.color ?? 'inherit'],
                icon: calendar.icon ?? null,
                calendars: [calendar.entity],
                calendarSorting: calendar.sorting,
                calendarNames: [calendar.name],
                class: this._getEventClass(startDate, endDate, fullDay, multiDay),
                uid: event.uid ?? null,
                recurrence_id: event.recurrence_id ?? null,
            }
            this._events[dateKey].push(eventKey);
        }
    }

    _filterEventSummary(event, calendar) {
        let summary = calendar.eventTitleField ? event[calendar.eventTitleField] : event.summary;

        if (!summary) {
            return '';
        }

        if (calendar.filterText) {
            summary = summary.replace(new RegExp(calendar.filterText), '');
        }

        if (this._filterText) {
            summary = summary.replace(new RegExp(this._filterText), '');
        }

        if (calendar.replaceTitleText) {
            for (const search in calendar.replaceTitleText) {
                const replace = calendar.replaceTitleText[search];
                summary = summary.replace(search, replace);
            }
        }

        if (this._replaceTitleText) {
            for (const search in this._replaceTitleText) {
                const replace = this._replaceTitleText[search];
                summary = summary.replace(search, replace);
            }
        }

        return summary;
    }

    _getEventClass(startDate, endDate, fullDay, multiDay) {
        let classes = [];
        let now = DateTime.now();
        if (fullDay) {
            classes.push('fullday');
        }
        if (multiDay) {
            classes.push('multiday');
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

    _handleMultiDayEvent(event, startDate, endDate, calendar) {
        while (startDate < endDate) {
            let eventStartDate = startDate;
            startDate = startDate.plus({ days: 1 }).startOf('day');
            let eventEndDate = startDate < endDate ? startDate : endDate;

            this._addEvent(event, eventStartDate, eventEndDate, this._isFullDay(eventStartDate, eventEndDate), calendar, true);

            if (this._multiDayMode === 'single' && eventStartDate >= this._startDate) {
                break;
            }
        }
    }

    _updateCard() {
        this._error = this._calendarErrors.join("\n").trim();

        let days = [];

        const weatherState = this._weather ? this.hass.states[this._weather.entity] : null;
        let weatherForecast = {};
        this._weatherForecast?.forEach((forecast) => {
            // Only use day time forecasts
            if (forecast.hasOwnProperty('is_daytime') && forecast.is_daytime === false) {
                return;
            }

            const dateKey = DateTime.fromISO(forecast.datetime).toISODate();
            const temperature = this._weather.roundTemperature ? Math.round(forecast.temperature) : forecast.temperature;
            const templow = this._weather.roundTemperature ? Math.round(forecast.templow) : forecast.templow;
            weatherForecast[dateKey] = {
                state: forecast.condition,
                condition: this.hass.formatEntityState(weatherState, forecast.condition),
                temperature: this.hass.formatEntityAttributeValue(weatherState, 'temperature', temperature),
                templow: this.hass.formatEntityAttributeValue(weatherState, 'templow', templow)
            };
        });

        let startDate = this._startDate;
        let endDate = this._startDate.plus({ days: this._numberOfDays });

        let targetMonth = null;
        const startingDay = String(this._startingDay).toLowerCase().trim();

        if (this._numberOfDaysIsMonth && ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].includes(startingDay)) {
            targetMonth = startDate.plus({ days: 7 }).month;

            const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
            const startWeekday = weekdays.indexOf(startingDay) + 1;
            startDate = this._getWeekDayDate(startDate, startWeekday);

            const monthEnd = this._startDate.endOf('month');
            endDate = startDate;
            while (endDate <= monthEnd) {
                endDate = endDate.plus({ days: 7 });
            }
        }

        let numberOfEvents = 0;
        while (startDate < endDate) {
            if (!this._hideWeekend || startDate.weekday < 6) {
                let events = [];
                const isOutsideMonth = targetMonth !== null && startDate.month !== targetMonth;

                const dateKey = startDate.toISODate();
                if (this._events.hasOwnProperty(dateKey) && !isOutsideMonth) {
                    events = this._events[dateKey].sort((event1, event2) => {
                        if (this._calendarEvents[event1].start.toISO() === this._calendarEvents[event2].start.toISO()) {
                            return this._calendarEvents[event1].calendarSorting < this._calendarEvents[event2].calendarSorting ? 1 : (this._calendarEvents[event1].calendarSorting > this._calendarEvents[event2].calendarSorting) ? -1 : 0;
                        }

                        return this._calendarEvents[event1].start > this._calendarEvents[event2].start ? 1 : -1;
                    });

                    const previousNumberOfEvents = numberOfEvents;
                    numberOfEvents += events.length;

                    if (this._maxEvents > 0 && numberOfEvents > this._maxEvents) {
                        events.splice(this._maxEvents - numberOfEvents);
                    }
                }

                days.push({
                    date: startDate,
                    events: events,
                    weather: isOutsideMonth ? null : (weatherForecast[dateKey] ?? null),
                    class: this._getDayClass(startDate) + (isOutsideMonth ? ' outside-month' : ''),
                    isOutsideMonth: isOutsideMonth
                });

                if (this._maxEvents > 0 && numberOfEvents >= this._maxEvents) {
                    break;
                }
            }

            startDate = startDate.plus({ days: 1 });
        }

        this._days = days;
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
        if (event.uid) {
            this._editFormData = {
                title: event.summary || '',
                calendar: event.calendars[0] || '',
                start: event.originalStart ? event.originalStart.toFormat("yyyy-MM-dd'T'HH:mm") : '',
                end: event.originalEnd ? event.originalEnd.toFormat("yyyy-MM-dd'T'HH:mm") : '',
            };
            this._showEditEventDialog = event;
        } else {
            this._currentEventDetails = event;
        }
    }

    _closeDialog() {
        this._currentEventDetails = null;
    }

    _handleAddEventClick(e, day) {
        e.stopImmediatePropagation();
        this._showCreateEventDialog = { date: day.date };
    }

    _closeCreateEventDialog() {
        this._showCreateEventDialog = null;
    }

    async _handleCreateEvent() {
        const title = this.shadowRoot.querySelector('#event-title')?.value?.trim();
        const calendar = this.shadowRoot.querySelector('#event-calendar')?.value;
        const startInput = this.shadowRoot.querySelector('#event-start')?.value;
        const endInput = this.shadowRoot.querySelector('#event-end')?.value;

        if (!title) {
            return;
        }

        if (!startInput) {
            return;
        }

        const start = DateTime.fromISO(startInput);
        const end = endInput ? DateTime.fromISO(endInput) : start.plus({ hours: 1 });

        try {
            await this.hass.callService('calendar', 'create_event', {
                entity_id: calendar,
                summary: title,
                start_date_time: start.toFormat('yyyy-MM-dd HH:mm:ss'),
                end_date_time: end.toFormat('yyyy-MM-dd HH:mm:ss'),
            });

            this._showCreateEventDialog = null;
            this._updateEvents();
        } catch (e) {
            console.error('Failed to create event:', e);
        }
    }

    async _handleDeleteEvent() {
        const event = this._currentEventDetails;
        if (!event || !event.uid) {
            return;
        }

        try {
            const wsData = {
                type: 'calendar/event/delete',
                entity_id: event.calendars[0],
                uid: event.uid,
            };
            if (event.recurrence_id) {
                wsData.recurrence_id = event.recurrence_id;
                wsData.recurrence_range = 'THISANDFUTURE';
            }

            await this.hass.callWS(wsData);
            this._currentEventDetails = null;
            this._updateEvents();
        } catch (e) {
            console.error('Failed to delete event:', e);
        }
    }

    _handleEditEventClick() {
        const event = this._currentEventDetails;
        this._currentEventDetails = null;
        this._editFormData = {
            title: event.summary || '',
            calendar: event.calendars[0] || '',
            start: event.originalStart ? event.originalStart.toFormat("yyyy-MM-dd'T'HH:mm") : '',
            end: event.originalEnd ? event.originalEnd.toFormat("yyyy-MM-dd'T'HH:mm") : '',
        };
        this._showEditEventDialog = event;
    }

    _closeEditEventDialog() {
        this._showEditEventDialog = null;
        this._editFormData = null;
    }

    async _handleDeleteEventFromEdit() {
        const event = this._showEditEventDialog;
        if (!event || !event.uid) {
            return;
        }

        try {
            const wsData = {
                type: 'calendar/event/delete',
                entity_id: event.calendars[0],
                uid: event.uid,
            };
            if (event.recurrence_id) {
                wsData.recurrence_id = event.recurrence_id;
                wsData.recurrence_range = 'THISANDFUTURE';
            }

            await this.hass.callWS(wsData);
            this._showEditEventDialog = null;
            this._editFormData = null;
            this._updateEvents();
        } catch (e) {
            console.error('Week Planner: Failed to delete event:', e);
        }
    }

    async _handleUpdateEvent() {
        const event = this._showEditEventDialog;
        const form = this._editFormData;

        if (!event || !form) {
            console.error('Week Planner: No event or form data for update');
            return;
        }

        const title = form.title?.trim();
        const calendar = form.calendar;
        const startInput = form.start;
        const endInput = form.end;

        if (!title || !startInput) {
            console.error('Week Planner: Missing required fields', { title, startInput });
            return;
        }

        const start = DateTime.fromISO(startInput);
        const end = endInput ? DateTime.fromISO(endInput) : start.plus({ hours: 1 });

        const entityId = calendar || event.calendars[0];

        try {
            // Try native update first
            if (event.uid) {
                const wsData = {
                    type: 'calendar/event/update',
                    entity_id: entityId,
                    uid: event.uid,
                    event: {
                        summary: title,
                        dtstart: start.toFormat("yyyy-MM-dd'T'HH:mm:ss"),
                        dtend: end.toFormat("yyyy-MM-dd'T'HH:mm:ss"),
                    },
                };
                if (event.recurrence_id) {
                    wsData.recurrence_id = event.recurrence_id;
                    wsData.recurrence_range = 'THISANDFUTURE';
                }
                await this.hass.callWS(wsData);
            }

            this._showEditEventDialog = null;
            this._editFormData = null;
            this._updateEvents();
        } catch (e) {
            // Fallback: delete + recreate if update not supported
            if (e.code === 'not_supported' && event.uid) {
                try {
                    const deleteData = {
                        type: 'calendar/event/delete',
                        entity_id: entityId,
                        uid: event.uid,
                    };
                    if (event.recurrence_id) {
                        deleteData.recurrence_id = event.recurrence_id;
                        deleteData.recurrence_range = 'THISANDFUTURE';
                    }
                    await this.hass.callWS(deleteData);

                    await this.hass.callService('calendar', 'create_event', {
                        entity_id: entityId,
                        summary: title,
                        start_date_time: start.toFormat('yyyy-MM-dd HH:mm:ss'),
                        end_date_time: end.toFormat('yyyy-MM-dd HH:mm:ss'),
                    });

                    this._showEditEventDialog = null;
                    this._editFormData = null;
                    this._updateEvents();
                } catch (fallbackError) {
                    console.error('Week Planner: Failed to update event (fallback):', fallbackError);
                }
            } else {
                console.error('Week Planner: Failed to update event:', e);
            }
        }
    }

    _handleLegendClick(calendar) {
        if (!this._legendToggle) {
            return;
        }

        const hideIndex = this._hideCalendars.indexOf(calendar.entity);
        const hideCalendars = [...this._hideCalendars];
        if (hideIndex > -1) {
            hideCalendars.splice(hideIndex, 1);
        } else {
            hideCalendars.push(calendar.entity);
        }
        this._hideCalendars = hideCalendars;
    }

    _handleNavigationOriginalClick() {
        this._navigationOffset = 0;
        this._updateEvents();
    }

    _handleNavigationNextClick(event) {
        this._navigationOffset++;
        this._updateEvents();
    }

    _handleNavigationPreviousClick(event) {
        this._navigationOffset--;
        this._updateEvents();
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
        if (this._numberOfDaysIsMonth) {
            numberOfDays = DateTime.now().daysInMonth;
        }

        return numberOfDays;
    }

    _getStartDate(alternativeStartingDay) {
        let startDate = DateTime.now();

        if (this._navigationOffset !== 0) {
            if (this._numberOfDaysIsMonth) {
                startDate = startDate.plus({ months: this._navigationOffset })
            } else {
                startDate = startDate.plus({ days: this._numberOfDays * this._navigationOffset })
            }
        }

        const startingDay = String(alternativeStartingDay ?? this._startingDay).toLowerCase().trim();

        const isMonthViewWithWeekdayStart = this._numberOfDaysIsMonth && ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].includes(startingDay);

        if (isMonthViewWithWeekdayStart) {
            startDate = startDate.startOf('month');
        }

        switch (startingDay) {
            case 'yesterday':
                startDate = startDate.minus({ days: 1 })
                break;
            case 'tomorrow':
                startDate = startDate.plus({ days: 1 })
                break;
            case 'sunday':
                if (!isMonthViewWithWeekdayStart) {
                    startDate = this._getWeekDayDate(startDate, 7);
                }
                break;
            case 'monday':
                if (!isMonthViewWithWeekdayStart) {
                    startDate = this._getWeekDayDate(startDate, 1);
                }
                break;
            case 'tuesday':
                if (!isMonthViewWithWeekdayStart) {
                    startDate = this._getWeekDayDate(startDate, 2);
                }
                break;
            case 'wednesday':
                if (!isMonthViewWithWeekdayStart) {
                    startDate = this._getWeekDayDate(startDate, 3);
                }
                break;
            case 'thursday':
                if (!isMonthViewWithWeekdayStart) {
                    startDate = this._getWeekDayDate(startDate, 4);
                }
                break;
            case 'friday':
                if (!isMonthViewWithWeekdayStart) {
                    startDate = this._getWeekDayDate(startDate, 5);
                }
                break;
            case 'saturday':
                if (!isMonthViewWithWeekdayStart) {
                    startDate = this._getWeekDayDate(startDate, 6);
                }
                break;
            case 'month':
                startDate = startDate.startOf('month');
                break;
        }

        if (this._startingDayOffset !== 0 && !isMonthViewWithWeekdayStart) {
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
