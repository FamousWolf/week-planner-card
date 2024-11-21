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
                                        ${this.addTextField('calendars.' + index + '.filter', 'Filter events (regex)')}
                                        ${this.addTextField('calendars.' + index + '.filterText', 'Filter event text (regex)')}
                                        ${this.addBooleanField('calendars.' + index + '.hideInLegend', 'Hide in legend')}
                                        ${this.addButton('Remove calendar', 'mdi:trash-can', () => {
                                            const config = Object.assign({}, this._config);
                                            if (config.calendars.length === 1) {
                                                config.calendars = [];
                                            } else {
                                                delete config.calendars[index];
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
                            }
                        ], true)}
                        ${this.addTextField('startingDayOffset', 'Starting day offset', 'number')}
                        ${this.addBooleanField('hideWeekend', 'Hide weekend')}
                        ${this.addBooleanField('hideDaysWithoutEvents', 'Hide days without events except for today')}
                        ${this.addBooleanField('hideTodayWithoutEvents', 'Also hide today without events')}
                    `
                )}
                ${this.addExpansionPanel(
                    'Events',
                    html`
                        ${this.addBooleanField('hidePastEvents', 'Hide past events')}
                        ${this.addTextField('filter', 'Filter events (regex)')}
                        ${this.addTextField('filterText', 'Filter event text (regex)')}
                        ${this.addBooleanField('combineSimilarEvents', 'Combine similar events')}
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
                    'Appearance',
                    html`
                        ${this.addBooleanField('showLegend', 'Show legend')}
                        ${this.addBooleanField('noCardBackground', 'No card background')}
                        ${this.addTextField('eventBackground', 'Override events background color')}
                        ${this.addBooleanField('compact', 'Compact mode')}
                    `
                )}
                ${this.addExpansionPanel(
                    'Texts',
                    html`
                        ${this.addTextField('texts.fullDay', 'Entire day')}
                        ${this.addTextField('texts.noEvents', 'No events')}
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

    addTextField(name, label, type) {
        return html`
            <ha-textfield
                name="${name}"
                label="${label ?? name}"
                type="${type ?? 'text'}"
                value="${this.getConfigValue(name)}"
                @keyup="${this._valueChanged}"
                @change="${this._valueChanged}"
            />
        `;
    }

    addEntityPickerField(name, label, includeDomains) {
        return html`
            <ha-entity-picker
                .hass="${this.hass}"
                name="${name}"
                label="${label ?? name}"
                value="${this.getConfigValue(name)}"
                .includeDomains="${includeDomains}"
                @change="${this._valueChanged}"
            />
        `;
    }

    addIconPickerField(name, label) {
        return html`
            <ha-icon-picker
                .hass="${this.hass}"
                name="${name}"
                label="${label ?? name}"
                value="${this.getConfigValue(name)}"
                @change="${this._valueChanged}"
            />
        `;
    }

    addSelectField(name, label, options, clearable) {
        return html`
            <ha-select
                name="${name}"
                label="${label ?? name}"
                value="${this.getConfigValue(name)}"
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

    addBooleanField(name, label) {
        return html`
            <ha-formfield
                label="${label ?? name}"
            >
                <ha-switch
                    name="${name}"
                    .checked="${this.getConfigValue(name)}"
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
        let value = target.value;

        if (target.tagName === 'HA-SWITCH') {
            value = target.checked;
        }

        this.setConfigValue(target.attributes.name.value, value);
    }

    getConfigValue(key) {
        if (!this._config) {
            return '';
        }

        return key.split('.').reduce((o, i) => o[i] ?? '', this._config) ?? '';
    }

    setConfigValue(key, value) {
        const config = Object.assign({}, this._config);
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
