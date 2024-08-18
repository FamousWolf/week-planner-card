import { DateTime, Settings as LuxonSettings, Info as LuxonInfo } from 'luxon';
import i18next, { t as translate } from 'i18next';
import backend from 'i18next-xhr-backend'; 

class i18nextHelper{
    static {
        
    }
    static i18next_options() {
        const lang = (localStorage.getItem('selectedLanguage') || 'en').replace(/['"]+/g, '').replace('-', '_');
        const _options = {
            lng: lang,
            debug: false,
            defaultNS: 'app',
            ns: ['app','config'],
            fallbackLng: 'en',
            backend: {
                loadPath: i18nextHelper.loadPath,
            }
        };
        return _options;
         
    }
    static loadPath(lng, namespace) {
        let path = `/hacsfiles/week-planner-card/en_app.json`;
        switch (namespace[0]) {
            case 'app':
                path = `/hacsfiles/week-planner-card/${lng[0]}_${namespace[0]}.json`;
                break;
            case 'config':
                path = `/hacsfiles/week-planner-card/custom_${namespace[0]}.json`;
                break;
            default:
                break;
        }
        return path;
    }
}



 

export class Helper{
   
    /* static isDarkMode = false;

    static {
        this.isDarkMode = this.hass?.themes?.darkMode ?? false;
    } */
    static Colors = [
        "#44739e",
        "#984ea3",
        "#ff7f00",
        "#af8d00",
        "#7f80cd",
        "#c42e60",
        "#a65628",
        "#f781bf",
        "#8dd3c7",
        "#bebada",
        "#fb8072",
        "#80b1d3",
        "#fdb462",
        "#fccde5",
        "#bc80bd",
        "#ffed6f",
        "#c4eaff",
        "#cf8c00",
        "#1b9e77",
        "#d95f02",
        "#e7298a",
        "#e6ab02",
        "#a6761d",
        "#0097ff",
        "#00d067",
        "#f43600",
        "#4ba93b",
        "#5779bb",
        "#927acc",
        "#97ee3f",
        "#bf3947",
        "#9f5b00",
        "#f48758",
        "#8caed6",
        "#f2b94f",
        "#eff26e",
        "#e43872",
        "#d9b100",
        "#9d7a00",
        "#698cff",
        "#d9d9d9",
        "#00d27e",
        "#d06800",
        "#009f82",
        "#c49200",
        "#cbe8ff",
        "#fecddf",
        "#c27eb6",
        "#8cd2ce",
        "#c4b8d9",
        "#f883b0",
        "#a49100",
        "#f48800",
        "#27d0df",
        "#00d2d5",
        "#a04a9b",
        "#b3e900"
      ];

    static getColorByIndex(index) {
        return Helper.Colors[index % Helper.Colors.length];
    }
    static getFreeColorIndex (index,calendars){
        let color = Helper.getColorByIndex(index);
        let updatedCalendar = calendars.find(c => (c?.color ?? 'A') == (color ?? 'B') );
        if ((typeof updatedCalendar !== "undefined") && (typeof updatedCalendar !== "null")) {
            return Helper.getFreeColorIndex(index+1, calendars);
        }else{
            return index;
        }

    };
    static isColor(strColor){
        let s = new Option().style;
        s.color = strColor;
        return (s.color == strColor);
    }
    static isColorV2(strColor){
        let s = new Option().style;
        s.color = strColor;
        let test1 = (s.color == strColor);
        let test2 = /^#[0-9A-F]{6}$/i.test(strColor);
        if(test1 == true || test2 == true){
          return true;
        } else{
          return false;
        }
    }

    static isNullOrUndefined(value){
        //return (value === undefined || value == null || value.length <= 0) ? true : false;
        return !((typeof value !== "undefined") && (typeof value !== "null") || (typeof value == "boolean"));
    }
    static isNullOrUndefinedOrEmpty(value){
        if (Helper.isNullOrUndefined(value)) {
            return true;
        }else{
            return ((value?.length ?? 0) <= 0);
        }
    }
    static fixReadOnlyOnObject(object, key, value = null){
        let v = null;
        if (!Helper.isNullOrUndefinedOrEmpty(value)) {
            v = value;
        }else{
            if (object.hasOwnProperty(key)){
                v = object[key];
            }
        }
        let obj = {};
        Object.defineProperty(obj, key, {
            value: v,
            writable: true,
            enumerable: true,
            configurable: true,
        });

        Object.assign(obj,  object ?? {});
        obj[key] = v;

        return obj;
    }


    static findKeyByColor(strColor, objColors){
        if (!objColors) {
            return null;
        }
        //Helper.customConfig();
        //Object.keys(objColors)
        const light = Object.keys(objColors).find(key => objColors[key]?.light === strColor);
        const dark = Object.keys(objColors).find(key => objColors[key]?.dark === strColor);
      
        if ((typeof light !== "undefined") && (typeof light !== "null")) {
            return light;
        }
        else if ((typeof dark !== "undefined") && (typeof dark !== "null")) {
            return dark;
        } else{
            return undefined;
        }
        
    }
    static getColorConfig(colorConfig, objColors) {
        if (
            !colorConfig
            || typeof colorConfig !== 'string'
            && typeof colorConfig !== 'object'
        ) {
            return null;
        }
        

        let configuration = {};
        //let configuration = {
        //    light: null,
        //    dark: null
        //};

        if (typeof colorConfig === 'string') {

            if (!objColors) {
                return colorConfig;
            }
            else if (Helper.isColor(colorConfig)){
                let key = Helper.findKeyByColor(colorConfig, objColors);
                if ((typeof key !== "undefined") && (typeof key !== "null")) {
                    configuration[key] = objColors[key];

                }else{
                    configuration['custom'] = {
                        light: colorConfig,
                        dark: colorConfig
                    };
                }
            }else{
                configuration[colorConfig] = objColors[colorConfig];
            }

           /*  const key = colorConfig;
            const arr = [this.colorConfig[key]?.light, this.colorConfig[key]?.dark];
            const text = arr.find(x=>x!==undefined);
            if ((typeof text !== "undefined") && (typeof text !== "null")) {
                configuration.light = this._calendarColors[key]?.light;
                configuration.dark = this._calendarColors[key]?.dark;
            }else{
                const light = Object.keys(this._calendarColors).find(key => this._calendarColors[key].light === calendarColor);
                const dark = Object.keys(this._calendarColors).find(key => this._calendarColors[key].dark === calendarColor);
                const arr2 = [light, dark];
                const k = arr2.find(x=>x!==undefined);
                if ((typeof k !== "undefined") && (typeof k !== "null")) {
                    configuration.light = this._calendarColors[k]?.light;
                    configuration.dark = this._calendarColors[k]?.dark;
                }
            } */


            
        } else {
            Object.assign(configuration, colorConfig);
        }

        return configuration;
    }


    /* static updateCalendarColor(calendar){
        if ((typeof calendar !== "undefined") && (typeof calendar !== "null")) {
            calendar = Helper.fixReadOnlyOnObject(calendar,'color');
            calendar['color'] = Helper.getCalendarColor(calendar['color']);
            
        }
        return calendar;
    } */

    /* static getCalendarColor(color){
        if ((typeof color !== "undefined") && (typeof color !== "null")) {
            const key = color.replace("#", '');
            const arr = [Helper.darkModeCalendarColors[key], Helper.lightModeCalendarColors[key]];
            const text = arr.find(x=>x!==undefined);
            const _color = '#'+Object.keys(Helper.calendarColors).find(key => Helper.calendarColors[key] === text);
            return _color;
        }else{
            return color;
        }
    } */

   
    static customConfig(string) {
        if (!i18next.isInitialized) {
            const event_icon_options = i18nextHelper.i18next_options();
            i18next.use(backend);
            i18next.init(event_icon_options);
        }
        return i18next.getResource(i18nextHelper.i18next_options().lng , 'config', string, i18nextHelper.i18next_options());
    }
    static localize(string, search = '', replace = '') {
        if (!i18next.isInitialized) {
            
            const localize_options = i18nextHelper.i18next_options();
            i18next.use(backend);
            i18next.init(localize_options);
        }
        return translate('app:'+string);
    }
    static localize_dddfdfdf(string, search = '', replace = '') {
        if (!i18next.isInitialized) {
            const lang = (localStorage.getItem('selectedLanguage') || 'en').replace(/['"]+/g, '').replace('-', '_');
            const localize_options = {
                lng: lang,
                debug: false,
                defaultNS: 'app',
                ns: ['app'],
                fallbackLng: 'en',
                backend: {
                    loadPath: '/hacsfiles/week-planner-card/{{lng}}_{{ns}}.json'
                }
            };
            i18next.use(backend);
            i18next.init(localize_options);
        }
        return translate('app:'+string);
    }
//    static getDefaultWeatherConfig(weatherConfiguration) {
//        if (
//            !weatherConfiguration
//            || typeof weatherConfiguration !== 'string'
//            && typeof weatherConfiguration !== 'object'
//        ) {
//            return null;
//        }
//       let configuration = {
//            entity: null,
//            showCondition: true,
//            showTemperature: false,
//            showLowTemperature: false
//        };
//        if (typeof weatherConfiguration === 'string') {
//            configuration.entity = weatherConfiguration;
//        } else {
//            Object.assign(configuration, weatherConfiguration);
//        }
//        return configuration;
//    }


    static baseComputeLabel(name, tage) { 
        let arr = [];
        arr.push(tage);
        arr.push(name);
        let filtered = arr.reduce((acc, i) => i ? [...acc, i] : acc, []);
        let t = filtered.join('.');
        return {
            [name]: Helper.localize(`${t}`)
        };
    }
    static getDefaultConfig(config) {

        let _config = Object.assign({}, config);

        if (!_config.hasOwnProperty('type')){
            _config['type'] = "custom:week-planner-card";
        }

        _config['days'] = config.days ?? 7;
        if (_config['days'] === 'month') {
            _config['days'] = DateTime.now().daysInMonth;
        }


        return Helper.getFullConfig(_config)
    }

    static getFullConfig(config) {
        let _config = Object.assign({}, config);

       

        _config['startingDay'] =config.startingDay ?? 'today';

        
        
        

        _config['hideWeekend'] = config.hideWeekend ?? false;
        _config['noCardBackground'] = config.noCardBackground ?? false; 


        _config['updateInterval'] = config.updateInterval ?? 60; 
        _config['locationLink'] = config.locationLink ?? 'https://www.google.com/maps/search/?api=1&query=';


        _config['compact'] = config.compact ?? false; 
        _config['dateFormat'] = config.dateFormat ?? 'cccc d LLLL yyyy'; 

        _config['timeFormat'] = config.timeFormat ?? 'HH:mm';

        _config['showCalendarProfil'] = config.showCalendarProfil ?? true;
        _config['showLocation'] = config.showLocation ?? false;
        _config['hidePastEvents'] = config.hidePastEvents ?? false;
        _config['hideDaysWithoutEvents'] = config.hideDaysWithoutEvents ?? false;

        let _weatherConfig = {
            entity: null,
            showCondition: true,
            showTemperature: false,
            showLowTemperature: false
        };
        Object.assign(_weatherConfig, config.weather ?? {});
        if (( _weatherConfig.entity != undefined) && ( _weatherConfig.entity != null)) {
            _config['weather'] = _weatherConfig;
        }

        //_config['eventBackground'] = config.eventBackground ?? 'var(--card-background-color, inherit)';



        const lang = (localStorage.getItem('selectedLanguage') || 'en').replace(/['"]+/g, '').replace('-', '_');
        _config['locale'] = config.locale ?? lang;
        if (_config['locale']) {
            LuxonSettings.defaultLocale = _config['locale'];
        }
        _config['texts'] = Object.assign(
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
            config.texts ?? {}
        );
        return _config;
    }
    static lightModeCalendarColors = {
        'AC725E': 'Cocoa',
        'D06B64': 'Flamingo',
        'F83A22': 'Tomato',
        'FA573C': 'Tangerine',
        'FF7537': 'Pumpkin',
        'FFAD46': 'Mango',
        '42D692': 'Eucalyptus',
        '16A765': 'Basil',
        '7BD148': 'Pistachio',
        'B3DC6C': 'Avocado',
        'FBE983': 'Citron',
        'FAD165': 'Banana',
        '92E1C0': 'Sage',
        '9FE1E7': 'Peacock',
        '9FC6E7': 'Cobalt',
        '4986E7': 'Blueberry',
        '9A9CFF': 'Lavender',
        'B99AFF': 'Wisteria',
        'C2C2C2': 'Graphite',
        'CABDBF': 'Birch',
        'CCA6AC': 'Radicchio',
        'F691B2': 'Cherry Blossom',
        'CD74E6': 'Grape',
        'A47AE2': 'Amethyst'
    }; 
    static darkModeCalendarColors = {
        '795548': 'Cocoa',
        'E67C73': 'Flamingo',
        'D50000': 'Tomato',
        'F4511E': 'Tangerine',
        'EF6C00': 'Pumpkin',
        'F09300': 'Mango',
        '009688': 'Eucalyptus',
        '0B8043': 'Basil',
        '7CB342': 'Pistachio',
        'C0CA33': 'Avocado',
        'E4C441': 'Citron',
        'F6BF26': 'Banana',
        '33B679': 'Sage',
        '039BE5': 'Peacock',
        '4285F4': 'Cobalt',
        '3F51B5': 'Blueberry',
        '7986CB': 'Lavender',
        'B39DDB': 'Wisteria',
        '616161': 'Graphite',
        'A79B8E': 'Birch',
        'AD1457': 'Radicchio',
        'D81B60': 'Cherry Blossom',
        '8E24AA': 'Grape',
        '9E69AF': 'Amethyst'
    }; 

    /* static calendarColors = (Helper.isDarkMode ?? false) ? Helper.darkModeCalendarColors : Helper.lightModeCalendarColors;

 */
    static StartingDayEnum = {
        today: `${Helper.localize('texts.today')}`,
        tomorrow: `${Helper.localize('texts.tomorrow')}`,
        yesterday: `${Helper.localize('texts.yesterday')}`,
        monday: LuxonInfo.weekdays('long')[0],
        tuesday: LuxonInfo.weekdays('long')[1],
        wednesday: LuxonInfo.weekdays('long')[2],
        thursday: LuxonInfo.weekdays('long')[3],
        friday: LuxonInfo.weekdays('long')[4],
        saturday: LuxonInfo.weekdays('long')[5],
        sunday: LuxonInfo.weekdays('long')[6],
        month: Helper.localize('month')
    };


    //CalendarColors
    //const _calendarColors = (Helper.isDarkMode ?? false) ? Helper.darkModeCalendarColors : Helper.calendarColors;

    static formOptions = {
        StartingDay: Object.keys(Helper.StartingDayEnum).map((key) => ({ 'label': `${Helper.StartingDayEnum[key]}`, 'value': key})),
        Days: Array.from({ length: 16 }, (_, index) => index + 1).map((key) => ({ 'label': key, 'value': key}))
    };



   /*  static getWeekDayDate(currentDate, weekday) {
        const currentWeekDay = currentDate.weekday;
        if (currentWeekDay > weekday) {
            return currentDate.minus({ days: currentWeekDay - weekday })
        }
        if (currentWeekDay < weekday) {
            return currentDate.minus({ days: 7 - weekday + currentWeekDay })
        }

        return currentDate;
    } */

    /* static getStartDate(startingDay, _hideWeekend = false) {
        let startDate = DateTime.now();

        switch (startingDay) {
            case 'yesterday':
                startDate = startDate.minus({ days: 1 })
                break;
            case 'tomorrow':
                startDate = startDate.plus({ days: 1 })
                break;
            case 'sunday':
                startDate = Helper.getWeekDayDate(startDate, 7);
                break;
            case 'monday':
                startDate = Helper.getWeekDayDate(startDate, 1);
                break;
            case 'tuesday':
                startDate = Helper.getWeekDayDate(startDate, 2);
                break;
            case 'wednesday':
                startDate = Helper.getWeekDayDate(startDate, 3);
                break;
            case 'thursday':
                startDate = Helper.getWeekDayDate(startDate, 4);
                break;
            case 'friday':
                startDate = Helper.getWeekDayDate(startDate, 5);
                break;
            case 'saturday':
                startDate = Helper.getWeekDayDate(startDate, 6);
                break;
            case 'month':
                startDate = startDate.startOf('month');
                break;
        }

        if (_hideWeekend && startDate.weekday >= 6) {
            startDate = Helper.getStartDate('monday');
        }

        return startDate.startOf('day');
    } */
}










