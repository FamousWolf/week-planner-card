import { html, LitElement } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { DateTime, Settings as LuxonSettings, Info as LuxonInfo } from 'luxon';
import { styles } from './card.styles';
import { Helper } from './helpers/helper.js';
import { CalendarObj, CalendarEditorObj } from './helpers/types.js';
import { HaFormSwitch, HaFormLabel } from './helpers/ha-form-switch.js';


if(!customElements.get("ha-form-label")){
    customElements.define("ha-form-label", HaFormLabel);
}
if(!customElements.get("ha-form-switch")){
    customElements.define("ha-form-switch", HaFormSwitch);
}

// Finally we create and register the editor itself






class MyCustomCardEditor extends LitElement {
    
    static styles = [styles];
    _showConfig = false;
    _initialized = false;
    _sortCalendar = false;
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
            _texts: {},
            _weather: {}
        }
    }
    firstUpdated(_changedProperties){
    }
    disconnectedCallback(){
        if(this._sortCalendar){
            this._calendars.sort((a, b) => b.enabled - a.enabled)
            this._sortCalendar = false;
        }
        this._updateCalendarColors();
    }

    // setConfig works the same way as for the card itself
    setConfig(config) {
        this.config = config;

        this._config = Helper.getDefaultConfig(config, this.hass);

        //let _texts = Object.keys(this._config.texts ?? {}).map((key) => ({ [key]: { 'value': this._config.texts[key], 'enabled': true} }));

        //this._config['texts'] = Object.keys(texts).filter((key) =>  { const k = (key.startsWith('show_') ? key : 'show_'+key) ; return ( key.startsWith('show_') ? false : texts[k].value ) });
        this._texts = Object.assign(
            {},
            {
                fullDay: Helper.localize('texts.fullDay'),
                noEvents: Helper.localize('texts.noEvents'),
                today: Helper.localize('texts.today'),
                tomorrow: Helper.localize('texts.tomorrow'),
                yesterday: Helper.localize('texts.yesterday'),
                monday: LuxonInfo.weekdays('long')[0],
                tuesday: LuxonInfo.weekdays('long')[1],
                wednesday: LuxonInfo.weekdays('long')[2],
                thursday: LuxonInfo.weekdays('long')[3],
                friday: LuxonInfo.weekdays('long')[4],
                saturday: LuxonInfo.weekdays('long')[5],
                sunday: LuxonInfo.weekdays('long')[6]
            },
            this._texts ?? {},
            this._config['texts'] ?? {}
        );

        
        Object.keys(this._texts)
            .filter((key) => !key.startsWith('show_'))
            .forEach(key => {
                const _key = 'show_'+key;
                if (!(this._texts ?? {}).hasOwnProperty(_key) ){
                    this._texts[_key] = false;
                }
            });
        
        Object.keys(this._texts)
            .filter((key) => !key.startsWith('show_'))
            .forEach(key => {
                if ((typeof (this._texts ?? {})[key] == "undefined") || (typeof (this._texts ?? {})[key] == "null") && ((this._texts ?? {})[key].trim() == "")) {
                    const _key = 'show_'+key;
                    this._texts[_key] = false;
                }
            });

        this._config['texts'] = Object.keys(this._texts)
            .filter((key) => key.startsWith('show_'))
            .filter((key) =>  this._texts[key] )
            .reduce((obj, key) => {
                const _key = key.replace('show_','');
                return this._texts[_key];
            }, {});


        //this._config['texts'] = Object.keys(this._texts).filter((key) =>  { const k = (key.startsWith('show_') ? key : 'show_'+key) ; return ( key.startsWith('show_') ? false : this._texts[k] ) });
        //this._config.texts = Object.keys(this._texts).filter((key) =>  this._texts[key].enabled ?? false ).map((key) => ({ [key]: this._texts[key].value}));


        
        //let _texts = Object.keys(texts)
        //    .filter((key) =>  { const k = (key.startsWith('show_') ? key : 'show_'+key) ; return ( key.startsWith('show_') ? false : texts[k] ) })
        //    .reduce((obj, key) => {
        //            obj[key] = texts[key];
        //            return obj;
        //        }, {});
        //this._config['texts'] =  Object.assign({}, this._config['texts'] ?? {}, _texts );



        this._updateCalendarEntities();
        if((this._config.calendars ?? []).length == 0){
            this._config['hideNoEvent'] = true
        }
        this._weather = this._config.weather ?? {};




         /*
        const dvdvd = Object.keys(this.hass.states)
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
        */

        
        //let _texts = this._config.texts ?? {};


        
        //_texts = _texts.map((key) => ({ key: this._texts[key]}

                
          //      entity_id: entityId,
           //     stateObj: this.hass.states[entityId]
           // ));


        //.filter((entityId) =>  entityId.startsWith('calendar.') )

        
        //const optionsCalendarColors = Object.keys(this._calendarColors).map((key) => ({ 'label': this._renderCalendarColorOption(key, (this._calendarColors[key])[colorMode]), 'value':key}));

        
        
        //this._texts = this._config.texts ?? {};
        //this._config.texts = this._texts;
    }
  
    
    
    _updateCalendarColors(){
        let i = 0;
        let _calendars = [];
        for (let object of (this._config?.calendars ?? [])) {
            if (!(object.hasOwnProperty('color') && !Helper.isNullOrUndefinedOrEmpty(object['color']))) {
                let updatedCalendar = this._calendars.find(c => c.entity == object.entity);
                if (!Helper.isNullOrUndefined(updatedCalendar)) {
                    if (updatedCalendar.hasOwnProperty('color') && !Helper.isNullOrUndefinedOrEmpty(updatedCalendar['color'])) {
                        object = Helper.fixReadOnlyOnObject(object,'color', updatedCalendar['color']);
                        i=i+1;
                    }
                }
            }
            if (Object.keys(object).length > 0){
                _calendars.push(object);
            }
        }
        if(i>0){
            this._config = Helper.fixReadOnlyOnObject(this._config,'calendars');
            this._config.calendars = _calendars;
            const event = new CustomEvent("config-changed", {
                detail: { config: this._config },
                bubbles: true,
                composed: true,
              });
              this.dispatchEvent(event);
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

            //let gg = calendarEntities.map((obj) => (new CalendarEditorObj(obj)));
           /*  const gg = calendarEntities.map((obj) => (new CalendarEditorObj({
                enabled: false,
                image: '',
                color: '',
                entity: obj.entity_id,
                friendly_name: obj.stateObj.attributes.friendly_name,
                name: obj.stateObj.attributes.friendly_name
            })));

            console.log(gg) */

            //const ddd = calendarEntities.map((obj) => (new CalendarEditorObj(obj)));
            //console.log(ddd)
          /*   this._calendars = calendarEntities.map((obj) => ({
                enabled: false,
                image: '',
                color: '',
                entity: obj.entity_id,
                friendly_name: obj.stateObj.attributes.friendly_name,
                name: obj.stateObj.attributes.friendly_name
            }));  */
            this._calendars= calendarEntities.map((obj) => (new CalendarEditorObj(obj)));


            let tmp_calendar_colors = (JSON.parse(localStorage.getItem('calendar_colors')) || []);


            let i = 0;
            for (let object of this._calendars) {

                

                let updatedCalendar = this._config['calendars']?.find(c => c.entity == object.entity);
                if (Helper.isNullOrUndefined(updatedCalendar)) {
                    i = Helper.getFreeColorIndex(i,this._config['calendars']);
                    object.color = Helper.getColorByIndex(i);
                    i = i+1;
                }else{
                    

                    if (updatedCalendar.hasOwnProperty('color') && !Helper.isNullOrUndefinedOrEmpty(updatedCalendar['color'])) {
                        object['color'] = updatedCalendar['color'];
                    }else{
                        let tmp = tmp_calendar_colors.find(c => c.entity == object.entity);
                        if (Helper.isNullOrUndefined(tmp)) {
                            i = Helper.getFreeColorIndex(i,this._config['calendars']);
                            object.color = Helper.getColorByIndex(i);
                            i = i+1;
                        }else{
                            object['color'] = tmp['color'];
                        }
                        
                    }
                    
                    object.image = updatedCalendar.image ?? '';
                    object.name = updatedCalendar.name ?? '';
                    object['showProfil'] = (new CalendarEditorObj(updatedCalendar)).showProfil;
                    object.enabled = true;
                }
            }
            if (!Helper.isNullOrUndefined(localStorage.getItem('calendar_colors'))) {
                localStorage.removeItem('calendar_colors');
            }
            
            //getNextIndex

            /* for (let object of this._calendars) {
                object.color = Helper.getColorByIndex(i);
                let updatedCalendar = this._config['calendars'].find(c => c.entity == object.entity);
                if ((typeof updatedCalendar !== "undefined") && (typeof updatedCalendar !== "null")) {
                    object.name = updatedCalendar.name ?? '';
                    object.color = updatedCalendar.color ?? Helper.getColorByIndex(i);
                    object.image = updatedCalendar.image ?? '';
                    object.enabled = true;
                }
                i = i+1;

                
                //const key = object.color.replace("#", '');
                //const arr = [Helper.darkModeCalendarColors[key], Helper.lightModeCalendarColors[key]];
                //const text = arr.find(x=>x!==undefined);
                //let _calendarColors = (this.hass?.themes?.darkMode ?? false) ? Helper.darkModeCalendarColors:Helper.lightModeCalendarColors;
                //object.color = '#'+Object.keys(_calendarColors).find(key => _calendarColors[key] === text);
                //object.color = Helper.updateCalendarColor(object).color ?? '';
            } */
            this._calendars.sort((a, b) => b.enabled - a.enabled)
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
            this._config['type'] = "custom:family-week-planner-card";
        }

        let texts = Object.assign({}, this._texts);
        //let texts = Object.assign({}, this._texts, Object.keys(this._config.texts ?? {}).map((key) => ({ [key]: { 'value': this._config.texts[key], 'enabled': true} }) ));

        //let texts = Object.assign({}, Object.keys(this._texts).map((key) => ({ [key]: this._texts[key].value})), this._config.texts ?? {} );




        //let texts = Object.assign({}, Object.keys(this._config.texts ?? {}).map((key) => ({ [key]: { 'value': this._config.texts[key], 'enabled': true} })));
        //let texts = Object.keys(this._texts).map((key) => ({ [key]: this._texts[key].value}));
        //this._config.texts = Object.keys(this._texts).filter((key) =>  this._texts[key].enabled ?? false ).map((key) => ({ [key]: this._texts[key].value}));
        //let texts = Object.assign({}, this._texts);

        Object.keys(ev.detail.value).forEach(key => {
            if (!texts.hasOwnProperty(key) || ((typeof ev.detail.value[key] !== "undefined") && (typeof ev.detail.value[key] !== "null"))) {
                texts[key] = ev.detail.value[key];
            }
        });





        Object.keys(texts).filter((key) => !key.startsWith('show_')).forEach(key => {
            if ((typeof (texts ?? {})[key] == "undefined") || (typeof (texts ?? {})[key] == "null") && ((texts ?? {})[key].trim() == "")) {
                const _key = 'show_'+key;
                texts[_key] = false;
            }
        });

        this._config['texts'] = Object.keys(texts)
            .filter((key) => key.startsWith('show_'))
            .filter((key) =>  texts[key] )
            .reduce((obj, key) => {
                    const _key = key.replace('show_','');
                    return texts[_key];
                }, {});

        this._texts = texts;
      

        //this._config['texts'] = Object.entries(obj).filter((key) =>  { const k = (key.startsWith('show_') ? key : 'show_'+key) ; return ( key.startsWith('show_') ? false : texts[k] ) });
        //this._config['texts'] = Object.entries(obj).reduce((acc, [key, value]) => {
            
        //    if ((value !== null && value !== undefined) && value !== '') {
        //        acc[key] = value;
        //    }
        //    return acc;
        //}, {});


        //this._config['texts'] = Object.keys(texts).filter((key) =>  { const k = (key.startsWith('show_') ? key : 'show_'+key) ; return ( key.startsWith('show_') ? false : texts[k] ) });

        //this._texts = texts;
        //this._config['texts'] = texts;
        
        //this._config['texts'] = Object.keys(texts).filter((key) =>  texts[key].enabled ?? false ).map((key) => ({ [key]: texts[key].value}));


        //${Object.assign({}, Object.keys(this._texts).map((key) => ({ [key]: this._texts[key].value})), Object.keys(this._texts).map((key) => { const k = 'show_'+key; return ({ [k]: this._texts[key].enabled}) }) )};

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
            this._config['type'] = "custom:family-week-planner-card";
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
            this._config['type'] = "custom:family-week-planner-card";
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
            this._config['type'] = "custom:family-week-planner-card";
        }
        if (!this._config.hasOwnProperty('locale')){
            this._config['locale'] = "en";
        }
        

        /* let configuration = {
            enabled: false,
            entity: null,
            friendly_name: '',
            color: '',
            name: '',
            image: ''
        }; */
        let configuration = new CalendarEditorObj();
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
                //object = CalendarEditorObj.updateHelper(object,_config)

                object.name = _config.name ?? object.name;
                object.color = _config.color ?? object.color;
                object.image = _config.image ?? object.image;
                object.enabled = _config.enabled;
                object['showProfil'] = _config.showProfil;
            }
        } 

        /* for (let object of this._calendars) {
            if (object.entity === _config.entity) {
                object.name = _config.name ?? object.name;
                object.color = _config.color ?? object.color;
                object.image = _config.image ?? object.image;
                object.enabled = _config.enabled;
            }
        }  */

        


        _config = this._removeNullUndefinedWithReduce(_config, false);

      /*   if ((typeof updatedCalendar !== "undefined") && (typeof updatedCalendar !== "null")) {
            for (let object of this._config['calendars']) {
                if (object.entity == _config.entity) {
                    if (_config.enabled) {
                        //object = new CalendarObj(_config);
                        object = Helper.fixReadOnlyOnObject(object,'showProfil');
                        object = CalendarObj.updateHelper(object,_config);
                        //object.entity= _config.entity;
                    }else{
                        this._config['calendars'] = this._config['calendars'].filter(c => c.entity !== _config.entity)
                    }
                }
            }
        }else{
            if(_config.enabled){
                this._config['calendars'].push(new CalendarObj(_config));
            }
            else{
                this._config['calendars'] = this._config['calendars'].filter(c => c.entity !== _config.entity)
            }
        } */
        
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
                        object['showProfil'] = _config.showProfil;
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

        
    
        this._sortCalendar = true;

        const event = new CustomEvent("config-changed", {
            detail: { config: this._config },
            bubbles: true,
            composed: true,
          });
          this.dispatchEvent(event);

    }
    _renderCalendarColorOption(text,color) {
        return html`<span style="background-color: ${color}; border-radius: 50%; width: 20px; float: left; margin-right: 5px;">&nbsp;</span>${text}`;
    }

    
  

    _renderCalendar() {
        if (!this._calendars) {
            return html``;
        }
        //let colorMode = (this.hass?.themes?.darkMode ?? false) ? "dark" : "light";
        //const optionsCalendarColors = Object.keys(this._calendarColors).map((key) => ({ 'label': this._renderCalendarColorOption(key, (this._calendarColors[key])[colorMode]), 'value':key}));


        //Helper.Colors
        
        
        let optionsCalendarColors = Helper.Colors.map((color) => ({ 'label': this._renderCalendarColorOption(color, color), 'value': color}));
     

        
        return html`

            ${this._calendars.map((calendar) => {
                const _optionsCalendarColors = optionsCalendarColors;
                return html` 
                
                <ha-expansion-panel outlined>
                    <h3 slot="header">
                    <ha-icon style=${calendar.color ? `color: ${calendar.color}` : ""} icon=${calendar.enabled ? "mdi:check-circle" : "mdi:circle"}></ha-icon>
                    ${calendar.name}
                    </h3>
                    <div class="content">
                            ${calendar.enabled ?
                                html`
                                    <ha-form
                                        .hass=${this.hass}
                                        .data=${calendar}
                                        .schema=${[
                                            {name: "entity"},
                                            {name: "enabled", type: 'boolean'},
                                            {name: "color", disabled: !(calendar.enabled), selector: { select: { mode: "dropdown", options: _optionsCalendarColors}}},
                                            {name: "showProfil", disabled: !(calendar.enabled), type: 'boolean'},
                                            {disabled: !(calendar.enabled), title: Helper.localize('settings.calendar.image'), type: 'expandable', schema:[
                                                {name: "image", value: calendar.image, selector: { image: { original: true, crop: {round: true } }}}
                                            ]},
                                            {label: this.hass.formatEntityAttributeValue(this.hass.states[calendar.entity], 'friendly_name'), type: 'label'},
                                            {name: "name", disabled: !(calendar.enabled), type: 'string'}
                                        ]}
                                        .computeLabel=${this._computeCalendarLabel}
                                        @value-changed=${this._calendarValueChanged} 
                                        >
                                    </ha-form>
                                ` :
                                html`
                                    <ha-form
                                        .hass=${this.hass}
                                        .data=${calendar}
                                        .schema=${[
                                            {name: "entity"},
                                            {name: "enabled", type: 'boolean'}
                                        ]}
                                        .computeLabel=${this._computeCalendarLabel}
                                        @value-changed=${this._calendarValueChanged} 
                                        >
                                    </ha-form>`
                            }
                    </div>
                </ha-expansion-panel></br>










                <!--
                <ha-card class="calendar-settings"> 
                    <div class="header" style="display: ruby-text;">
                        <h3><span style="background-color: ${calendar.color}; border-radius: 50%; width: 20px; float: left; margin-right: 5px;">&nbsp;</span>${calendar.name}</h3>
                        <ha-form
                            .hass=${this.hass}
                            .data=${calendar}
                            .schema=${[
                                {name: "enabled", type: 'boolean'}
                            ]}
                            .computeLabel=${this._computeCalendarLabel}
                            @value-changed=${this._calendarValueChanged} 
                            >
                        </ha-form>
                    </div> 
                    <div class="info"> 
                            ${calendar.enabled ?
                                html`
                                    <ha-form
                                        .hass=${this.hass}
                                        .data=${calendar}
                                        .schema=${[
                                            {name: "entity"},
                                            {label: this.hass.formatEntityAttributeValue(this.hass.states[calendar.entity], 'friendly_name'),  disabled: !(calendar.enabled), type: 'label'},
                                            {name: "showProfil",  disabled: !(calendar.enabled), type: 'boolean'},
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
                
                
                </br>
                -->
                `;


                
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

    }
    render() {
        if (!this._initialized) {
            this._initialized = true;
            this._waitForHassAndConfig();
        }

        //Helper.isDarkMode =  this.hass?.themes?.darkMode ?? false;
        

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
                        {name: "hideWeekend", type: 'boolean'},
                        {name: "noCardBackground",  type: 'boolean'},
                        {name: "hideNoEvent",  type: 'boolean'},
                        {name: "showCalendarProfil",  type: 'boolean'},
                        {name: "compact",  type: 'boolean'},
                        {name: "updateInterval", type: 'integer'}
                    ]}
                    .computeLabel=${this._computeLabel}
                    @value-changed=${this._valueChanged} 
                    >
                </ha-form></br>

                <ha-form
                    .hass=${this.hass}
                    .data=${this._texts};
                    .schema=${[
                        {name: "show_noEvents", type: 'boolean'},
                        {name: "noEvents", type: 'string'},
                        {name: "show_fullDay", type: 'boolean'},
                        {name: "fullDay", type: 'string'},
                        {name: "show_today", type: 'boolean'},
                        {name: "today", type: 'string'},
                        {name: "show_tomorrow", type: 'boolean'},
                        {name: "tomorrow", type: 'string'},
                        {name: "show_yesterday", type: 'boolean'},
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
                            {name: "showCondition", type: 'boolean'},
                            {name: "showLowTemperature", type: 'boolean'},
                            {name: "showTemperature",  type: 'boolean'}
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