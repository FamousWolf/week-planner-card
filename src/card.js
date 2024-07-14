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
import { v4 as uuidv4 } from 'uuid';


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

const VIEW_TYPE = {
    Day: 'day',
    Days: 'days',
    Week: 'week',
    WorkWeek: 'workweek',
    Resources: 'resources'
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
    _viewType;
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
    _weatherForecast = null;
    _showLocation;
    _hidePastEvents;
    _hideDaysWithoutEvents;

    
    /**
     * Get properties
     *
     * @return {Object}
     */
    static get properties() {
        return {
            _days: { type: Array },
            _hours: { type: Array },
            _config: { type: Object },
            _isLoading: { type: Boolean },
            _error: { type: String },
            _currentEventDetails: { type: Object },
            _viewType: { type: VIEW_TYPE }
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
        //this._calendars = Cell Duration
        //this._calendars = Cell Height
        this._hours = Array.from({length: 24}, (_, index) => index + 1);
        this._calendars = config.calendars;
        this._weather = this._getWeatherConfig(config.weather);
        this._numberOfDays = this._getNumberOfDays(config.days ?? 7);
        this._hideWeekend = config.hideWeekend ?? false;
        this._startDate = this._getStartDate(config.startingDay ?? 'today');
        this._updateInterval = config.updateInterval ?? 60;
        this._noCardBackground = config.noCardBackground ?? false;
        this._viewType = config.viewType ?? VIEW_TYPE.Days;


        
        this._eventBackground = config.eventBackground ?? 'var(--card-background-color, inherit)';
        this._compact = config.compact ?? false;
        this._dateFormat = config.dateFormat ?? 'cccc d LLLL yyyy';
        this._timeFormat = config.timeFormat ?? 'HH:mm';
        this._locationLink = config.locationLink ?? 'https://www.google.com/maps/search/?api=1&query=';
        this._showLocation = config.showLocation ?? false;
        this._hidePastEvents = config.hidePastEvents ?? false;
        this._hideDaysWithoutEvents = config.hideDaysWithoutEvents ?? false;
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
        
        return html`
            <ha-card class="${cardClasses.join(' ')}" style="--event-background-color: ${this._eventBackground}">
                <div class="card-content">
                    ${this._error ?
                        html`<ha-alert alert-type="error">${this._error}</ha-alert>` :
                        ''
                    }
                    <div class="container">
                        <button class="button_calendar_view" style="left: 2em;" @click="${() => {this._setViewType(VIEW_TYPE.Day) }}">${this._getViewTypeIcon(VIEW_TYPE.Day)}</button>
                        <button class="button_calendar_view" style="left: 4em;" @click="${() => {this._setViewType(VIEW_TYPE.Days) }}">${this._getViewTypeIcon(VIEW_TYPE.Days)}</button>
                        <button id="button_calendar_add" style=" " @click="${() => { this._createEvent("test 2", "2024-07-08 10:00:00","2024-07-08 14:00:00", false ,(this._calendars[0])) }}">Add</button>
                        ${this._renderCalendars()}
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
    _getViewTypeIcon(view) {

        switch (view.toLowerCase()) {
            case VIEW_TYPE.Day:
                return html`<svg preserveAspectRatio="xMidYMid meet" focusable="false" role="img" aria-hidden="true" viewBox="0 0 24 24" style=""> <g><path class="primary-path" d="M14,14H7V16H14M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M17,10H7V12H17V10Z"></path></g> </svg>`;
                break;
            case VIEW_TYPE.Days:
                return html`
                    <svg preserveAspectRatio="xMidYMid meet" focusable="false" role="img" aria-hidden="true" viewBox="0 0 24 24"> <g> <path class="primary-path" d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z"></path> </g> </svg>
                `;
                break;
            default:
                return html`
                    <svg preserveAspectRatio="xMidYMid meet" focusable="false" role="img" aria-hidden="true" viewBox="0 0 24 24"> <g> <path class="primary-path" d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z"></path> </g> </svg>
                `;
                
        }
        
        
    }
    _setViewType(view) {
        //viewType?: "Day" | "Days" | "Week" | "WorkWeek" | "Resources";
        //mdi:calendar-text -- Day
        //mdi:calendar-month -- Days
        //mdi:calendar-multiselect -- WorkWeek
        //mdi:calendar-range -- Week
        switch (view.toLowerCase()) {
            case VIEW_TYPE.Day:
                this._viewType = VIEW_TYPE.Day;
                this._loading = 0;
                this._updateEvents();
                break;
            case VIEW_TYPE.Days:
                this._viewType = VIEW_TYPE.Days;
                this._loading = 0;
                this._updateEvents();
                break;
            default:
                this._viewType = VIEW_TYPE.Days;
                this._loading = 0;
                this._updateEvents();
        }
    }
    _renderCalendars() {

        if (!this._days) {
            return html``;
        }

        if (this._viewType == VIEW_TYPE.Day) {
            return html`


            <table cellspacing="0" cellpadding="0" border="0" style="border: 0px none;width: 100%;position: unset;">
                <tbody>
                    <tr>
                        <td style="padding: 0px; border: 0px none;">
                            <table cellspacing="0" cellpadding="0" border="0" style="border: 0px none; width: 60px;">
                                <tbody>
                                ${this._hours.map((hour) => {
                                    return html`
                                    <tr style="height: 80px;">
                                        <td style="cursor: default; padding: 0px; border: 0px none;">
                                            <div class="calendar_default_rowheader" style="position: relative; width: 60px; height: 80px; overflow: hidden;">
                                                <div class="calendar_default_rowheader_inner">
                                                    <div>${hour-1}<span class="calendar_default_rowheader_minutes">00</span></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    `;
                                })}
                                </tbody>
                            </table>
                        </td>

                    ${this._calendars.map((calendar) => {
                        return html`

                        <!-- calendars length : ${(this._calendars.length)} -->
                        <td width="${((1/this._calendars.length)*100)}%" style="padding: 0px; border: 0px none;">
                            <div style="position: relative;">

                         
                                <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border: 0px none; table-layout: fixed;">
                                    <tbody>

                                    ${this._hours.map((hour) => {
                                        return html`
                                        <tr>
                                            <td style="padding: 0px; border: 0px none; vertical-align: top; height: 20px; overflow: hidden;">
                                                <div class="calendar_default_cell" style="height: 20px; position: relative;">
                                                    <div unselectable="on" class="calendar_default_cell_inner"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 0px; border: 0px none; vertical-align: top; height: 20px; overflow: hidden;">
                                                <div class="calendar_default_cell" style="height: 20px; position: relative;">
                                                    <div unselectable="on" class="calendar_default_cell_inner"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 0px; border: 0px none; vertical-align: top; height: 20px; overflow: hidden;">
                                                <div class="calendar_default_cell" style="height: 20px; position: relative;">
                                                    <div unselectable="on" class="calendar_default_cell_inner"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 0px; border: 0px none; vertical-align: top; height: 20px; overflow: hidden;">
                                                <div class="calendar_default_cell" style="height: 20px; position: relative;">
                                                    <div unselectable="on" class="calendar_default_cell_inner"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        `;
                                    })}
                                    </tbody>
                                </table>

                            </div>
                        </td>
                        `;
                    })}
                    </tr>
                </tbody>
            </table>
            `;
        }

    }
    _renderDays() {
        if (!this._days) {
            return html``;
        }
        if (this._viewType == VIEW_TYPE.Days) {
        
            return html`
                ${this._days.map((day) => {
                    if (this._hideDaysWithoutEvents && day.events.length === 0 && !this._isToday(day.date)) {
                        return html``;
                    }
                    
                    return html`
                        <div class="day ${day.class}">
                            <div class="date">
                                <span class="number">${day.date.day}</span>
                                <span class="text">${this._getWeekDayText(day.date)}</span>
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
                                        ${day.events.map((event) => {
                                            return html`
                                                <div id="${event.id}" class="event ${event.class}" style="--border-color: ${event.color}" @click="${() => { this._handleEventClick(event) }}">
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
    }

    valueChanged(ev) {
        //const newValue = ev.currentTarget.value;

        //const attributeName = ev.currentTarget.getAttribute("data-attributeName");
        //const ff = this._currentEventDetails[attributeName] = newValue;

        //const sdf = ff;
        //const entity = ev.currentTarget.getAttribute("data-entity");
        //const newValue_summary = this.shadowRoot.querySelector("#textinput_summary").value;
        //const newValue = this.shadowRoot.querySelector("#textinput_summary").value;
        //const param = {
        //  entity_id: entity,
        //  value: newValue,
        //};
        //this._hass.callService('input_text', 'set_value', param);
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

                        <button
                        class="footer_button"
                        @click="${() => { this._deleteEvent(this._currentEventDetails)}}"
                    ><ha-icon icon="mdi:close"></ha-icon></button>


                        ${this._currentEventDetails.calendar ? html`${this.hass.formatEntityAttributeValue(this.hass.states[this._currentEventDetails.calendar], 'friendly_name')}` :''}
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
                    ${this._renderEventDetailsDialogFooter()}
                </div>
            </ha-dialog>
        `;
    }

    _renderEventDetailsDialogFooter() {
        return html`
            <div class="footer">
                <button
                    class="footer_button"
                    @click="${() => { this._deleteEvent()}}"
                ><ha-icon icon="mdi:close"></ha-icon></button>
            </div>
        `;
    }
    _renderEventDetailsDialogHeading() {
        return html`
            <div class="header_title">


            <ha-textfield
            label="dddddd"
            style="width: 100%"
            value="${this._currentEventDetails.summary}"
            @change="${this.valueChanged}"
            id="textinput_summary"
            placeholder=""
            ></ha-textfield>

                <!-- <span>${this._currentEventDetails.summary}</span> -->
                
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
            forecast_type: 'daily',
            entity_id: this._weather.entity
        });
    }


    _deleteEvent(){

        if (!this._currentEventDetails) {
            return html``;
        }
        const uid = this._currentEventDetails.id;
        const entity_id = this._currentEventDetails.calendar;
        //this.hass.callWS({
        //    type: "calendar/event/delete",
        //    entity_id: entity_id,
        //    uid: uid
        //})
        //.then(response =>
        //    console.log("ssss", response))
        //.catch(error =>
        //    console.log("aaaa", error));



            
        this.hass.callService('calendar', 'delete_event', {
            "entity_id": entity_id,
            "uid": uid
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        });


    }
    _createEvent(summary, startDate,endDate,fullDay, calendar) {

     
        

        let currentTime = new Date("2024-07-08T10:00:00.000+02:00");
        
        let updatedTIme = new Date("2024-07-08T15:00:00.000+02:00");
        //const event = new Date(startDate);
        calendar = {
            "entity": this._calendars[0].entity,
            "color": this._calendars[0].color
        }
        let ff = {
            summary: summary,
            description:  null,
            location: null,
            start: currentTime,
            originalStart: this._convertApiDate({dateTime:currentTime}),
            end: updatedTIme,
            originalEnd: this._convertApiDate({dateTime:updatedTIme}),
            fullDay: fullDay ?? false,
            color: calendar.color ?? 'inherit',
            calendar: calendar.entity,
            class: this._getEventClass(currentTime, updatedTIme, fullDay)
        };

        this._currentEventDetails = ff;
        this._renderEventDetailsDialog()

        
        //this.hass.callService('calendar', 'create_event', {
        //        "entity_id": calendar,
        //        "summary": summary,
        //        "start_date_time": start_date_time,
        //        "end_date_time": end_date_time
        //    }).then(response => {
        //        console.log(response)
        //        this._updateEvents()
        //  }).catch(error => {
        //    console.log(error)
        //  });
    }
    _createEvent22(summary, start_date_time,end_date_time, calendar) {

        let ff = {
            summary: event.summary ?? null,
            description: event.description ?? null,
            location: event.location ?? null,
            start: startDate,
            originalStart: this._convertApiDate(event.start),
            end: endDate,
            originalEnd: this._convertApiDate(event.end),
            fullDay: fullDay,
            color: calendar.color ?? 'inherit',
            calendar: calendar.entity,
            class: this._getEventClass(startDate, endDate, fullDay)
        };

        this._renderEventDetailsDialog()

        
        this.hass.callService('calendar', 'create_event', {
                "entity_id": calendar,
                "summary": summary,
                "start_date_time": start_date_time,
                "end_date_time": end_date_time
            }).then(response => {
                console.log(response)
                this._updateEvents()
          }).catch(error => {
            console.log(error)
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

        let startDate = this._startDate;
        let endDate = this._startDate.plus({ days: this._numberOfDays });
        let now = DateTime.now();

        if (this._weather && this._weatherForecast === null) {
            this._subscribeToWeatherForecast();
        }

        this._calendars.forEach(calendar => {
            this._loading++;
            this.hass.callApi(
                'get',
                'calendars/' + calendar.entity + '?start=' + startDate.toFormat('yyyy-LL-dd\'T\'HH:mm:ss\'Z\'') + '&end=' + endDate.toFormat('yyyy-LL-dd\'T\'HH:mm:ss\'Z\'')
            ).then(response => {
                response.forEach(event => {
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
        if (this._hideWeekend && startDate.weekday >= 6) {
            return;
        }

        const dateKey = startDate.toISODate();
        if (!this._events.hasOwnProperty(dateKey)) {
            this._events[dateKey] = [];
        }

        this._events[dateKey].push({
            id: event.uid ?? uuidv4(),
            summary: event.summary ?? null,
            description: event.description ?? null,
            location: event.location ?? null,
            start: startDate,
            originalStart: this._convertApiDate(event.start),
            end: endDate,
            originalEnd: this._convertApiDate(event.end),
            fullDay: fullDay,
            color: calendar.color ?? 'inherit',
            calendar: calendar.entity,
            class: this._getEventClass(startDate, endDate, fullDay)
        });
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
        return classes.join(' ');
    }

    _handleMultiDayEvent(event, startDate, endDate, calendar) {
        while (startDate < endDate) {
            let eventStartDate = startDate;
            startDate = startDate.plus({ days: 1 }).startOf('day');
            let eventEndDate = startDate < endDate ? startDate : endDate;

            this._addEvent(event, eventStartDate, eventEndDate, this._isFullDay(eventStartDate, eventEndDate), calendar);
        }
    }

    _updateCard() {
        let days = [];

        const weatherState = this._weather ? this.hass.states[this._weather.entity] : null;
        let weatherForecast = {};
        this._weatherForecast?.forEach((forecast) => {
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
                        return event1.start > event2.start ? 1 : (event1.start < event2.start) ? -1 : 0;
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

   
   
    _handleEventClick(event) {
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

    _getStartDate(startingDay) {
        let startDate = DateTime.now();

        switch (startingDay) {
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
