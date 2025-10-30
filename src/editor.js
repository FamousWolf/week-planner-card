import { html, LitElement } from "lit";
import styles from './editor.styles';

export class WeekPlannerCardEditor extends LitElement {
    static styles = styles;

    connectedCallback() {
        super.connectedCallback();
        this.loadCustomElements();
    }

    async loadCustomElements() {
        if (!customElements.get("ha-entity-picker")) {
            await customElements.get("hui-entities-card").getConfigElement();
        }
    }

    static get properties() {
        return {
            hass: {},
            _config: {},
        };
    }

    setConfig(config) {
        this._config = config;
    }

    render() {
        if (!this.hass || !this._config) {
            return html``;
        }

        return html`
            <div style="display: flex; flex-direction: column">
                ${this.addTextField('title', 'Title')}
                ${this.addExpansionPanel(
                    'Calendars',
                    html`
                        ${this.getConfigValue('calendars').map((calendar, index) => {
                            return html`
                                ${this.addExpansionPanel(
                                    `Calendar: ${calendar.name ?? calendar.entity}`,
                                    html`
                                        ${this.addEntityPickerField('calendars.' + index + '.entity', 'Entity', ['calendar'])}
                                        ${this.addTextField('calendars.' + index + '.name', 'Name')}
                                        ${this.addTextField('calendars.' + index + '.color', 'Color')}
                                        ${this.addIconPickerField('calendars.' + index + '.icon', 'Icon')}
                                        ${this.addTextField('calendars.' + index + '.eventTitleField', 'Event title field', 'text', 'summary')}
                                        ${this.addTextField('calendars.' + index + '.filter', 'Filter events (regex)')}
                                        ${this.addTextField('calendars.' + index + '.filterText', 'Filter event text (regex)')}
                                        ${this.addBooleanField('calendars.' + index + '.hideInLegend', 'Hide in legend')}
                                        ${this.addButton('Remove calendar', 'mdi:trash-can', () => {
                                            const config = JSON.parse(JSON.stringify(this._config));
                                            if (config.calendars.length === 1) {
                                                config.calendars = [];
                                            } else {
                                                delete config.calendars[index];
                                                config.calendars = config.calendars.filter(Boolean);
                                            }
                                            this._config = config;
                                            this.dispatchConfigChangedEvent();
                                        })}
                                    `
                                )}
                            `
                        })}
                        ${this.addButton('Add calendar', 'mdi:plus', () => {
                            const index = this.getConfigValue('calendars').length;
                            this.setConfigValue('calendars.' + index, {});
                        })}
                    `
                )}
                ${this.addExpansionPanel(
                    'Days',
                    html`
                        ${this.addTextField('days', 'Days')}
                        ${this.addSelectField('startingDay', 'Starting day', [
                            {
                                value: 'today',
                                label: 'Today',
                            }, {
                                value: 'tomorrow',
                                label: 'Tomorrow',
                            }, {
                                value: 'yesterday',
                                label: 'Yesterday',
                            }, {
                                value: 'sunday',
                                label: 'Sunday',
                            }, {
                                value: 'monday',
                                label: 'Monday',
                            }, {
                                value: 'tuesday',
                                label: 'Tuesday',
                            }, {
                                value: 'wednesday',
                                label: 'Wednesday',
                            }, {
                                value: 'thursday',
                                label: 'Thursday',
                            }, {
                                value: 'friday',
                                label: 'Friday',
                            }, {
                                value: 'saturday',
                                label: 'Saturday',
                            }, {
                                value: 'month',
                                label: 'Month',
                            }
                        ], true)}
                        ${this.addTextField('startingDayOffset', 'Starting day offset', 'number')}
                        ${this.addBooleanField('hideWeekend', 'Hide weekend')}
                        ${this.addBooleanField('hideDaysWithoutEvents', 'Hide days without events except for today')}
                        ${this.addBooleanField('hideTodayWithoutEvents', 'Also hide today without events')}
                        ${this.addTextField('maxDayEvents', 'Maximum number of events per day (0 is no maximum)', 'number', 0)}
                        ${this.addBooleanField('showNavigation', 'Show navigation')}
                        ${this.addTextField('navigationLabel', 'Navigation label (literal)')}
                        ${this.addTextField('navigationLabelFormat', 'Navigation label format (Luxon)', 'text', 'MMMM')}
                        ${this.addTextField('navigationLabelTemplate', 'Navigation label template (use {start:...} and {end:...})')}
                    `
                )}
                ${this.addExpansionPanel(
                    'Events',
                    html`
                        ${this.addTextField('maxEvents', 'Maximum number of events (0 is no maximum)', 'number', 0)}
                        ${this.addBooleanField('hidePastEvents', 'Hide past events')}
                        ${this.addTextField('filter', 'Filter events (regex)')}
                        ${this.addTextField('filterText', 'Filter event text (regex)')}
                        ${this.addBooleanField('combineSimilarEvents', 'Combine similar events')}
                        ${this.addBooleanField('showTitle', 'Show title in overview', true)}
                        ${this.addBooleanField('showDescription', 'Show description in overview')}
                        ${this.addBooleanField('showLocation', 'Show location in overview')}
                        ${this.addTextField('locationLink', 'Override location link base URL')}
                    `
                )}
                ${this.addExpansionPanel(
                    'Date/time formats',
                    html`
                        <p>These formats use <a href="https://moment.github.io/luxon/#/formatting?id=table-of-tokens" target="_blank">Luxon format tokens</a></p>
                        ${this.addTextField('locale', 'Locale')}
                        ${this.addTextField('dateFormat', 'Date format')}
                        ${this.addTextField('timeFormat', 'Time format')}
                        ${this.addTextField('dayFormat', 'Override day number')}
                    `
                )}
                ${this.addExpansionPanel(
                    'Weather',
                    html`
                        ${this.addEntityPickerField('weather.entity', 'Weather entity', ['weather'])}
                        ${this.addBooleanField('weather.showCondition', 'Show condition icon')}
                        ${this.addBooleanField('weather.showTemperature', 'Show temperature')}
                        ${this.addBooleanField('weather.showLowTemperature', 'Show low temperature')}
                        ${this.addBooleanField('weather.useTwiceDaily', 'Use twice daily if entity does not support daily')}
                    `
                )}
                ${this.addExpansionPanel(
                    'Override columns',
                    html`
                        <p>The number of columns is based on the size of the card.</p>
                        ${this.addTextField('columns.extraLarge', 'Extra large (>= 1920px)', 'number')}
                        ${this.addTextField('columns.large', 'Large (>= 1280px)', 'number')}
                        ${this.addTextField('columns.medium', 'Medium (>= 1024px)', 'number')}
                        ${this.addTextField('columns.small', 'Small (>= 640px)', 'number')}
                        ${this.addTextField('columns.extraSmall', 'Extra small (< 640px)', 'number')}
                    `
                )}
                ${this.addExpansionPanel(
                    'Appearance',
                    html`
                        ${this.addBooleanField('noCardBackground', 'No card background')}
                        ${this.addTextField('eventBackground', 'Override events background color')}
                        ${this.addBooleanField('compact', 'Compact mode')}
                    `
                )}
                ${this.addExpansionPanel(
                    'Legend',
                    html`
                        ${this.addBooleanField('showLegend', 'Show legend')}
                        ${this.addBooleanField('legendToggle', 'Toggle calendars by clicking on the legend')}
                    `
                )}
                ${this.addExpansionPanel(
                    'Texts',
                    html`
                        ${this.addTextField('texts.fullDay', 'Entire day')}
                        ${this.addTextField('texts.noEvents', 'No events')}
                        ${this.addTextField('texts.moreEvents', 'More events')}
                        ${this.addTextField('texts.today', 'Today')}
                        ${this.addTextField('texts.tomorrow', 'Tomorrow')}
                        ${this.addTextField('texts.yesterday', 'Yesterday')}
                        ${this.addTextField('texts.sunday', 'Sunday')}
                        ${this.addTextField('texts.monday', 'Monday')}
                        ${this.addTextField('texts.tuesday', 'Tuesday')}
                        ${this.addTextField('texts.wednesday', 'Wednesday')}
                        ${this.addTextField('texts.thursday', 'Thursday')}
                        ${this.addTextField('texts.friday', 'Friday')}
                        ${this.addTextField('texts.saturday', 'Saturday')}
                    `
                )}
                ${this.addExpansionPanel(
                    'Miscellaneous',
                    html`
                        ${this.addTextField('updateInterval', 'Override update interval', 'number')}
                    `
                )}
            </div>
        `;
    }

    addTextField(name, label, type, defaultValue) {
        return html`
            <ha-textfield
                name="${name}"
                label="${label ?? name}"
                type="${type ?? 'text'}"
                value="${this.getConfigValue(name, defaultValue)}"
                @keyup="${this._valueChanged}"
                @change="${this._valueChanged}"
            />
        `;
    }

    addEntityPickerField(name, label, includeDomains, defaultValue) {
        return html`
            <ha-entity-picker
                .hass="${this.hass}"
                name="${name}"
                label="${label ?? name}"
                value="${this.getConfigValue(name, defaultValue)}"
                .includeDomains="${includeDomains}"
                @value-changed="${this._valueChanged}"
            />
        `;
    }

    addIconPickerField(name, label, defaultValue) {
        return html`
            <ha-icon-picker
                .hass="${this.hass}"
                name="${name}"
                label="${label ?? name}"
                value="${this.getConfigValue(name, defaultValue)}"
                @value-changed="${this._valueChanged}"
            />
        `;
    }

    addSelectField(name, label, options, clearable, defaultValue) {
        return html`
            <ha-select
                name="${name}"
                label="${label ?? name}"
                value="${this.getConfigValue(name, defaultValue)}"
                .clearable="${clearable}"
                @change="${this._valueChanged}"
                @closed="${(event) => { event.stopPropagation(); } /* Prevent a bug where the editor dialog also closes. See https://github.com/material-components/material-web/issues/1150 */}"
            >
                ${options.map((option) => {
                    return html`
                        <mwc-list-item
                            value="${option.value}"
                        >${option.label ?? option.value}</mwc-list-item>
                    `;
                })}
            </ha-select>
        `;
    }

    addBooleanField(name, label, defaultValue) {
        return html`
            <ha-formfield
                label="${label ?? name}"
            >
                <ha-switch
                    name="${name}"
                    .checked="${this.getConfigValue(name, defaultValue)}"
                    value="true"
                    @change="${this._valueChanged}"
                />
            </ha-formfield>
        `;
    }

    addExpansionPanel(header, content, expanded) {
        return html`
            <ha-expansion-panel
                header="${header}"
                .expanded="${expanded ?? false}"
                outlined="true"
            >
                <div style="display: flex; flex-direction: column">
                    ${content}
                </div>
            </ha-expansion-panel>
        `;
    }

    addButton(text, icon, clickFunction) {
        return html`
            <ha-button
                @click="${clickFunction}"
            >
                <ha-icon icon="${icon}"></ha-icon>
                ${text}
            </ha-button>
        `;
    }

    _valueChanged(event) {
        const target = event.target;
        let value = event.detail ? event.detail.value ?? target.value ?? '' : target.value ?? '';

        if (target.tagName === 'HA-SWITCH') {
            value = target.checked;
        }

        this.setConfigValue(target.attributes.name.value, value);
    }

    getConfigValue(key, defaultValue) {
        if (!this._config) {
            return '';
        }

        defaultValue = defaultValue ?? '';

        return key.split('.').reduce((o, i) => o[i] ?? defaultValue, this._config) ?? defaultValue;
    }

    setConfigValue(key, value) {
        const config = JSON.parse(JSON.stringify(this._config));
        const keyParts = key.split('.');
        const lastKeyPart = keyParts.pop();
        const lastObject = keyParts.reduce((objectPart, keyPart) => {
            if (!objectPart[keyPart]) {
                objectPart[keyPart] = {};
            }
            return objectPart[keyPart];
        }, config);
        if (value === '') {
            delete lastObject[lastKeyPart];
        } else {
            lastObject[lastKeyPart] = value;
        }
        this._config = config;

        this.dispatchConfigChangedEvent();
    }

    dispatchConfigChangedEvent() {
        const configChangedEvent = new CustomEvent("config-changed", {
            detail: { config: this._config },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(configChangedEvent);
    }
}
