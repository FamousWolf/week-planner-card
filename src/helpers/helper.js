import { DateTime, Settings as LuxonSettings, Info as LuxonInfo } from 'luxon';
import i18next, { t as translate } from 'i18next';
import backend from 'i18next-xhr-backend'; 
import { WeatherConfigObj } from './types.js';

export class Helper{
   
    static isDarkMode = false;

    static {
        this.isDarkMode = this.hass?.themes?.darkMode ?? false;
    }

    static fixReadOnlyOnObject(object, key, value = null){
        let v = null;
        if ((typeof value !== "undefined") && (typeof value !== "null")) {
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
        return obj;
    }

    static updateCalendarColor(calendar){
        if ((typeof calendar !== "undefined") && (typeof calendar !== "null")) {
            calendar = Helper.fixReadOnlyOnObject(calendar,'color');
            calendar['color'] = Helper.getCalendarColor(calendar['color']);
            
        }
        return calendar;
    }

    static getCalendarColor(color){
        if ((typeof color !== "undefined") && (typeof color !== "null")) {
            const key = color.replace("#", '');
            const arr = [Helper.darkModeCalendarColors[key], Helper.lightModeCalendarColors[key]];
            const text = arr.find(x=>x!==undefined);
            const _color = '#'+Object.keys(Helper.calendarColors).find(key => Helper.calendarColors[key] === text);
            return _color;
        }else{
            return color;
        }
    }

    //const CalendarEditorObj = { enabled: false, image: String(), color: String(), entity: null, friendly_name: String(), name: String()};

    //const CalendarObj = {entity: null, image: String(), color: String(), name: String()};
    
    //const WeatherConfigObj = {entity: null, showCondition: true, showTemperature: false, showLowTemperature: false};
    //static CreateObj() {}
    //static CreateObj = {
    //    CalendarObj: Object.create({entity: null, image: String(), color: String(), name: String()}),
    //    CalendarEditorObj: Object.create(Object.assign({},Helper.CreateObj.CalendarObj,{enabled: false,friendly_name: String()})),
    //};

    static localize(string, search = '', replace = '') {
        if (!i18next.isInitialized) {
            const lang = (localStorage.getItem('selectedLanguage') || 'en').replace(/['"]+/g, '').replace('-', '_');
            const localize_options = {
                lng: lang,
                debug: false,
                defaultNS: 'app',
                ns: ['app'],
                fallbackLng: 'en',
                backend: {
                    loadPath: '/hacsfiles/week-planner-card/locales/{{lng}}/{{ns}}.json'
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

    static calendarColors = (Helper.isDarkMode ?? false) ? Helper.darkModeCalendarColors : Helper.lightModeCalendarColors;


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



    static getWeekDayDate(currentDate, weekday) {
        const currentWeekDay = currentDate.weekday;
        if (currentWeekDay > weekday) {
            return currentDate.minus({ days: currentWeekDay - weekday })
        }
        if (currentWeekDay < weekday) {
            return currentDate.minus({ days: 7 - weekday + currentWeekDay })
        }

        return currentDate;
    }

    static getStartDate(startingDay, _hideWeekend = false) {
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
    }
}










