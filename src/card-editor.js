import { html, LitElement } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { DateTime, Settings as LuxonSettings, Info as LuxonInfo } from 'luxon';
import styles from './card.styles';
import { Helper } from './helpers/helper.js';
import { HaFormSwitch } from './helpers/ha-form-switch.js';


customElements.define("ha-form-switch", HaFormSwitch);
// Finally we create and register the editor itself






class MyCustomCardEditor extends LitElement {
    
    static styles = styles;
    _showConfig = false;
    
    _weather;
    _calendars;
    _texts;

    /**
     * Get properties
     *
     * @return {Object}
     */
    static get properties() {
        return {
            hass: {},
            _config: {},
            _config_edit: {},
            _texts: {},
            _weather: {}
        }
    }
    firstUpdated(_changedProperties){
        
        //this._calendars = this._calendars.sort((a, b) => b.enabled - a.enabled);
        //alert("MyCustomCardEditor firstUpdated d");

        //handle_event
        
       
    }
    //themes_updated


    // setConfig works the same way as for the card itself
    setConfig(config) {
        this._config = Helper.getDefaultConfig(config, this.hass);
        Helper.isDarkMode = this.hass.themes?.darkMode ?? false;
        
        //this._config = config;
        this._config_edit = config;

        this._updateCalendarEntities();
        
    
        if((this._config.calendars ?? []).length == 0){
            this._config['hideNoEvent'] = true
        }
        
        this._weather = this._config.weather ?? {};

        

        this._texts = this._config.texts ?? {};
        this._config.texts = this._texts;

        
        
    }
  


    
    _updateCalendarColors(){

        //const obj = this._getAvailableCalendarColors(this._config['calendars'], this._calendars.length);

        //let l = Object.keys(obj)
        //let i = 0;
        for (let object of this._calendars) {

            //let obj = Helper.fixReadOnlyOnObject(object,'color', object.color ?? '')

            const key = object.color.replace("#", '');
            const arr = [Helper.darkModeCalendarColors[key], Helper.lightModeCalendarColors[key]];
            const text = arr.find(x=>x!==undefined);
            let _calendarColors = (this.hass?.themes?.darkMode ?? false) ? Helper.darkModeCalendarColors:Helper.lightModeCalendarColors;
            const _color0 = '#'+Object.keys(_calendarColors).find(key => _calendarColors[key] === text);
            object['color'] = _color0;

            //let updatedCalendar = this._config['calendars'].find(c => c.entity == object.entity);
            //if ((typeof updatedCalendar !== "undefined") && (typeof updatedCalendar !== "null")) {
            //    object.color = updatedCalendar.color ?? object.color;
            //}else{
            //    object.color = '#'+l[i];
            //    i = i+1;
            //}
        }
        
    }
 

   
    
    _updateCalendarEntities() {

       

        let checkLoading = window.setInterval(() => {
            if (!this.hass) {
                clearInterval(checkLoading);
                this._updateCalendarEntities();
                return;
            }else{
                clearInterval(checkLoading);
            }
        }, 50);



        if (!this._calendars) {
            const calendarEntities = Object.keys(this.hass.states)
            .filter((entityId) =>  entityId.startsWith('calendar.') )
            .map((entityId) => ({
                entity_id: entityId,
                stateObj: this.hass.states[entityId]
            })).filter((entity) => {
                const { stateObj } = entity;
                return (
                    (stateObj.state && stateObj.attributes && stateObj.attributes.device_class === 'calendar') ||
                    stateObj.entity_id.includes('calendar')
                )
            })

            
            this._calendars = calendarEntities.map((obj) => ({
                enabled: false,
                image: '',
                color: String(''),
                entity: obj.entity_id,
                friendly_name: obj.stateObj.attributes.friendly_name,
                name: obj.stateObj.attributes.friendly_name
            })); 

            for (let object of this._calendars) {
                let updatedCalendar = this._config['calendars'].find(c => c.entity == object.entity);
                if ((typeof updatedCalendar !== "undefined") && (typeof updatedCalendar !== "null")) {
                    object.name = updatedCalendar.name ?? '';
                    object.color = updatedCalendar.color ?? '';
                    object.image = updatedCalendar.image ?? '';
                    object.enabled = true;
                }

                const key = object.color.replace("#", '');
                const arr = [Helper.darkModeCalendarColors[key], Helper.lightModeCalendarColors[key]];
                const text = arr.find(x=>x!==undefined);
                let _calendarColors = (this.hass?.themes?.darkMode ?? false) ? Helper.darkModeCalendarColors:Helper.lightModeCalendarColors;
                object.color = '#'+Object.keys(_calendarColors).find(key => _calendarColors[key] === text);
                //object.color = Helper.updateCalendarColor(object).color ?? '';
            }

            this._updateCalendarColors();
        }
    }
    
    //_computeTextsLabel(schema) {
    //    var labelMap = {
    //        noEvents: `${Helper.localize('settings.label_text_for')} '${Helper.localize('texts.noEvents')}'`,
    //        fullDay: `${Helper.localize('settings.label_text_for')} '${Helper.localize('texts.fullDay')}'`,
    //        today: `${Helper.localize('settings.label_text_for')} '${Helper.localize('texts.today')}'`,
    //        tomorrow: `${Helper.localize('settings.label_text_for')} '${Helper.localize('texts.tomorrow')}'`,
    //        yesterday: `${Helper.localize('settings.label_text_for')} '${Helper.localize('texts.yesterday')}'`
    //    }
    //    return labelMap[schema.name];
    //}
    _computeTextsLabel(schema) {
        var labelMap = Helper.baseComputeLabel(schema.name, 'texts');
        let f = labelMap[schema.name];
        labelMap[schema.name] = `${Helper.localize('settings.label_text_for')} '${f}'`;
        return labelMap[schema.name];
    }
    //_computeCalendarLabel(schema) {
    //    var labelMap = {
    //        enabled: Helper.localize('settings.calendar.showCalendar'),
    //        name: Helper.localize('settings.calendar.name'),
    //        color: Helper.localize('settings.calendar.color'),
    //        image: Helper.localize('settings.calendar.image')
    //    }
    //    return labelMap[schema.name];
    //}
    _computeCalendarLabel(schema) {
        var labelMap = Helper.baseComputeLabel(schema.name, 'settings.calendar');
        return labelMap[schema.name];
    }
    _computeWeatherLabel(schema) { 
        var labelMap = Helper.baseComputeLabel(schema.name, 'weather');
        return labelMap[schema.name];
    }
    _computeLabel(schema) { 
        var labelMap = Helper.baseComputeLabel(schema.name, 'settings');
        return labelMap[schema.name];
    }
    //_computeWeatherLabel(schema) {
    //    var labelMap = {
    //        entity: Helper.localize('weather.entity'),
    //        showTemperature: Helper.localize('weather.showTemperature'),
    //        showLowTemperature: Helper.localize('weather.showLowTemperature'),
    //        showCondition: Helper.localize('weather.showCondition')
    //    }
    //    return labelMap[schema.name];
    //}
    //_computeLabel(schema) {
    //    var labelMap = {
    //        days: "days",
    //        locale: "locale",
    //        noCardBackground: Helper.localize('settings.show_background')
    //    }
    //    return labelMap[schema.name];
    //}

    _textsValueChanged(ev) {
        if (!this._config || !this.hass) {
          return;
        }
        if (!this._config.hasOwnProperty('type')){
            this._config['type'] = "custom:week-planner-card";
        }


        let _config = Object.assign({}, this._texts);


        Object.keys(ev.detail.value).forEach(key => {
            if (!_config.hasOwnProperty(key) || ((typeof ev.detail.value[key] !== "undefined") && (typeof ev.detail.value[key] !== "null"))) {
                _config[key] = ev.detail.value[key];
            }
        });

        this._texts = _config;
        this._config['texts'] = _config;



        const event = new CustomEvent("config-changed", {
            detail: { config: this._config },
            bubbles: true,
            composed: true,
          });
          this.dispatchEvent(event);

    }
    _weatherValueChanged(ev) {
        if (!this._config || !this.hass) {
          return;
        }
        if (!this._config.hasOwnProperty('type')){
            this._config['type'] = "custom:week-planner-card";
        }


        let configuration = {
            entity: null,
            showCondition: true,
            showTemperature: false,
            showLowTemperature: false
        };

        let _config = Object.assign(configuration, this._weather);

        Object.keys(ev.detail.value).forEach(key => {
            if (!_config.hasOwnProperty(key) || ((typeof ev.detail.value[key] !== "undefined") && (typeof ev.detail.value[key] !== "null"))) {
                _config[key] = ev.detail.value[key];
            }else{
                if (key == 'entity'){
                    _config[key] = ev.detail.value[key];
                }
            }
        });

        this._weather = _config;

        if (!_config.hasOwnProperty('entity') || ((typeof ev.detail.value['entity'] !== "undefined") && (typeof ev.detail.value['entity'] !== "null"))) {
            this._config['weather'] = _config;
        }else{
            const { weather, ...newObject } = this._config;
            this._config = newObject;
        }



        const event = new CustomEvent("config-changed", {
            detail: { config: this._config },
            bubbles: true,
            composed: true,
          });
          this.dispatchEvent(event);

    }

    _showConfigToggled(ev) {
        let t = {
            detail: {
                value: {
                    [ev.target.name] : ev.target.checked
                }
            }
        };
        this._valueChanged(t);
        //this._showConfig = ev.target.checked;
    }
    _valueChanged(ev) {
        if (!this._config || !this.hass) {
          return;
        }
        if (!this._config.hasOwnProperty('type')){
            this._config['type'] = "custom:week-planner-card";
        }

       
        if (!this._config.hasOwnProperty('updateInterval')){
            this._config['updateInterval'] = 60;
        }




        
        let _config = Object.assign({}, this._config);

        Object.keys(ev.detail.value).forEach(key => {
            if (!_config.hasOwnProperty(key) || ((typeof ev.detail.value[key] !== "undefined") && (typeof ev.detail.value[key] !== "null"))) {
                _config[key] = ev.detail.value[key];
            }
        });

        this._config = _config;

        const event = new CustomEvent("config-changed", {
            detail: { config: this._config },
            bubbles: true,
            composed: true,
          });
          this.dispatchEvent(event);

    }
    
    _removeNullUndefinedWithReduce(obj, reduce = true) {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            if ((value !== null && value !== undefined) && value !== '') {
                if(reduce){
                    acc[key] = typeof value === 'object' ? this._removeNullUndefinedWithReduce(value) : value;
                }else{
                    acc[key] = value;
                }
                
            }
            return acc;
        }, {});
    }
    _calendarValueChanged(ev) {
        if (!this._config || !this.hass) {
          return;
        }
        if (!this._config.hasOwnProperty('type')){
            this._config['type'] = "custom:week-planner-card";
        }


        let configuration = {
            enabled: false,
            entity: null,
            friendly_name: '',
            color: '',
            name: '',
            image: ''
        };

        let _calendars = this._calendars;
       
        let _updatedCalendar = _calendars.find(c => c.entity == ev.detail.value.entity);
        let updatedCalendar = this._config['calendars'].find(c => c.entity == ev.detail.value.entity);
        




        let _config = Object.assign({}, configuration, _updatedCalendar ?? {}, updatedCalendar ?? {});

        Object.keys(ev.detail.value).forEach(key => {
            if (!_config.hasOwnProperty(key) || ((typeof ev.detail.value[key] !== "undefined") && (typeof ev.detail.value[key] !== "null"))) {
                _config[key] = ev.detail.value[key];
            }
        });

        
        for (let object of this._calendars) {
            if (object.entity === _config.entity) {
                object.name = _config.name ?? object.name;
                object.color = _config.color ?? object.color;
                object.image = _config.image ?? object.image;
                object.enabled = _config.enabled;
            }
        } 

        


        _config = this._removeNullUndefinedWithReduce(_config, false);

       
        
        if ((typeof updatedCalendar !== "undefined") && (typeof updatedCalendar !== "null")) {
            for (let object of this._config['calendars']) {
                if (object.entity == _config.entity) {
                    if (_config.enabled) {
                        if (!object.hasOwnProperty('name') || ((typeof _config.name !== "undefined") && (typeof _config.name !== "null") && ( _config.name !== "") ) ) {
                            object['name'] = _config.name;
                        }
                        if (!object.hasOwnProperty('color') || ((typeof _config.color !== "undefined") && (typeof _config.color !== "null") && ( _config.color !== "") ) ) {
                            object['color'] = _config.color;
                        }
                        if (!object.hasOwnProperty('image') || ((typeof _config.image !== "undefined") && (typeof _config.image !== "null") && ( _config.image !== "") ) ) {
                            object['image'] = _config.image;
                        }
                        object.entity= _config.entity;
                    }else{
                        this._config['calendars'] = this._config['calendars'].filter(c => c.entity !== _config.entity)
                    }
                }
            }
        }else{
            if(_config.enabled){
                const { enabled, ...newObject } = _config;
                this._config['calendars'].push(newObject);
            }
            else{
                this._config['calendars'] = this._config['calendars'].filter(c => c.entity !== _config.entity)
            }
        }

        this._updateCalendarColors();
    
        const event = new CustomEvent("config-changed", {
            detail: { config: this._config },
            bubbles: true,
            composed: true,
          });
          this.dispatchEvent(event);

    }
    _renderCalendarColorOption(text,color) {
        return html`<span style="background-color: #${color}; border-radius: 50%; width: 20px; float: left; margin-right: 5px;">&nbsp;</span>${text}`;
    }

    
  

    _renderCalendarHeader(calendar) {

        return html`
        <h3><span style="background-color: ${calendar.color}; border-radius: 50%; width: 20px; float: left; margin-right: 5px;">&nbsp;</span>${calendar.name}</h3>

         <ha-form
            .hass=${this.hass}
            .data=${calendar}
            .schema=${[
                {name: "enabled", type: 'switch'}
            ]}
            .computeLabel=${this._computeCalendarLabel}
            @value-changed=${this._calendarValueChanged} 
            ></ha-form>
        `;
    }

    _renderCalendar() {
        if (!this._calendars) {
            return html``;
        }

        const _calendarColors = (this.hass?.themes?.darkMode ?? false) ? Helper.darkModeCalendarColors:Helper.lightModeCalendarColors;
        let optionsCalendarColors = Object.keys(_calendarColors).map((key) => ({ 'label': this._renderCalendarColorOption(_calendarColors[key], key), 'value': `#${key}`}));
     

        
        return html`





    


            
            ${this._calendars.map((calendar) => {
                const _optionsCalendarColors = optionsCalendarColors;
                return html` 
                
                <ha-card class="calendar-settings"> 
                    <div class="header" style="display: ruby-text;">
                        <h3><span style="background-color: ${calendar.color}; border-radius: 50%; width: 20px; float: left; margin-right: 5px;">&nbsp;</span>${this.hass.formatEntityAttributeValue(this.hass.states[calendar.entity], 'friendly_name')}</h3>
                        
                        <ha-form
                            .hass=${this.hass}
                            .data=${calendar}
                            .schema=${[
                                {name: "enabled", type: 'switch'}
                            ]}
                            .computeLabel=${this._computeCalendarLabel}
                            @value-changed=${this._calendarValueChanged} 
                            >
                        </ha-form>

                         <!--
                         ${this._renderCalendarHeader(calendar)}
                         -->

                    </div> 
                    <div class="info"> 
                            ${calendar.enabled ?
                                html`
                                    <ha-form
                                        .hass=${this.hass}
                                        .data=${calendar}
                                        .schema=${[
                                            {name: "entity"},
                                            {name: "color", disabled: !(calendar.enabled), selector: { select: { mode: "dropdown", options: _optionsCalendarColors}}},
                                            {title: Helper.localize('settings.calendar.image'), type: 'expandable', schema:[
                                                {name: "image", value: calendar.image, disabled: !(calendar.enabled), selector: { image: { original: true, crop: {round: true } }}}
                                            ]},
                                            {name: "name",  disabled: !(calendar.enabled), type: 'string'}
                                        ]}
                                        .computeLabel=${this._computeCalendarLabel}
                                        @value-changed=${this._calendarValueChanged} 
                                        ></ha-form>

                                ` :
                                html``
                            }
                    </div> 
                    <div class="footer"></div> 
                </ha-card>
                
                
                </br>`;


                
            })} 
        `;
    }

    render() {
        if (!this.hass) {
            return html``;
        }


        Helper.isDarkMode =  this.hass?.themes?.darkMode ?? false;
        

        let optionsStartingDay = Object.keys(Helper.StartingDayEnum).map((key) => ({ 'label': `${Helper.StartingDayEnum[key].startsWith('texts.') ?  Helper.localize(Helper.StartingDayEnum[key]) :  Helper.StartingDayEnum[key]}`, 'value': key}));
     
    

        return html`

        <ha-expansion-panel outlined>
            <h3 slot="header">
            ${Helper.localize('settings.calendar_title')}
            </h3>
            <div class="content">
                ${this._renderCalendar()}
            </div>
        </ha-expansion-panel></br>

        <ha-expansion-panel outlined>
            <h3 slot="header">
            ${Helper.localize('settings.calendar_options_title')}
            </h3>
            <div class="content">
                <ha-form
                    .hass=${this.hass}
                    .data=${this._config}
                    .schema=${[
                        {name: "days", type: 'integer'},
                        {name: "startingDay", selector: { select: { mode: "dropdown", options: optionsStartingDay}}},
                        {name: "hideWeekend", type: 'switch'},
                        {name: "noCardBackground",  type: 'switch'},
                        {name: "hideNoEvent",  type: 'switch'},
                        {name: "showCalendarProfil",  type: 'switch'},
                        {name: "compact",  type: 'switch'},
                        {name: "updateInterval", type: 'integer'}
                    ]}
                    .computeLabel=${this._computeLabel}
                    @value-changed=${this._valueChanged} 
                    >
                </ha-form></br>
                <ha-form
                    .hass=${this.hass}
                    .data=${this._texts}
                    .schema=${[
                        {name: "noEvents", type: 'string'},
                        {name: "fullDay", type: 'string'},
                        {name: "today", type: 'string'},
                        {name: "tomorrow", type: 'string'},
                        {name: "yesterday", type: 'string'}
                    ]}
                    .computeLabel=${this._computeTextsLabel}
                    @value-changed=${this._textsValueChanged} 
                    >
                </ha-form>
            </div>
        </ha-expansion-panel></br>



         <ha-expansion-panel outlined>
            <h3 slot="header">
            ${Helper.localize('settings.weather_title')}
            </h3>
            <div class="content">
                <ha-form
                    .hass=${this.hass}
                    .data=${this._weather}
                    .schema=${[
                            {name: "entity", selector: { entity: { domain: "weather" } }},
                            {name: "showCondition", type: 'switch'},
                            {name: "showLowTemperature", type: 'switch'},
                            {name: "showTemperature",  type: 'switch'}
                    ]}
                .computeLabel=${this._computeWeatherLabel}
                @value-changed=${this._weatherValueChanged} 
                    ></ha-form>
            </div>
        </ha-expansion-panel>
    `;

    }
  }
  
  customElements.define("my-custom-card-editor", MyCustomCardEditor);