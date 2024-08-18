
import { Helper } from './helper.js';


export class CalendarObj {
  entity = String();
  image = String();
  color = String();
  name = String();
  showProfil = true;
  constructor(options) {
    Object.defineProperties(this, {
      entity: { writable: true, enumerable: true,  configurable: true },
      image: { writable: true, enumerable: true,  configurable: true },
      color: { writable: true, enumerable: true,  configurable: true },
      name: { writable: true, enumerable: true,  configurable: true }
    });

           
    this.entity = options?.entity_id || options?.entity || null;
    this.name = options?.stateObj?.attributes?.friendly_name || options?.name || null;
    this.image = options && options.image || String();
    this.color = options && options.color || String();

    if (typeof options?.showProfil == "boolean"){
      this.showProfil = options?.showProfil;
    }

    //this.showProfil = Helper.isNullOrUndefinedOrEmpty(options?.showProfil) ? true: options?.showProfil;
    //this.showProfil = options && options.showProfil || true;
  }

  static updateHelper(target, source, forceUpdate=false){
    Object.keys(source).forEach(key => {

      if (typeof source[key] == "boolean"){
        Object.defineProperty(target, key, {
          writable: true,
          enumerable: true,
          configurable: true,
        });
        target[key] = source[key];
      }
      else{
        if (!Helper.isNullOrUndefinedOrEmpty(source[key]) || forceUpdate) {

          Object.defineProperty(target, key, {
            writable: true,
            enumerable: true,
            configurable: true,
          });
          //Helper.fixReadOnlyOnObject(target)
          target[key] = source[key];
        }
      }


      
    });
    return target;
  }
  update(options) {
    this.entity = options?.entity || this.entity;
    this.image = options?.image || this.image;
    this.color = options?.color || this.color;
    this.name = options?.name || this.name;
    if (typeof options?.showProfil == "boolean"){
      this.showProfil = options?.showProfil;
    }
  }
}

export class CalendarEditorObj extends CalendarObj {
  enabled = false;
  friendly_name = String();
  constructor(options) {
    super(options);
    this.friendly_name = options?.stateObj?.attributes?.friendly_name || options?.friendly_name || null;


    if (typeof options?.enabled == "boolean"){
      this.enabled = options.enabled;
    }

    
  } 
  update(options) {
    super.update(options);
    this.enabled = options?.enabled || this.enabled;
    this.friendly_name = options?.friendly_name || this.friendly_name;
  }
}

//Object.keys(ev.detail.value).forEach(key => {
//  if (!_config.hasOwnProperty(key) || ((typeof ev.detail.value[key] !== "undefined") && (typeof ev.detail.value[key] !== "null"))) {
//      _config[key] = ev.detail.value[key];
//  }
//});



//export const CalendarEditorObj = { enabled: false, image: String(), color: String(), entity: null, friendly_name: String(), name: String()};

//export const CalendarObj = {entity: null, image: String(), color: String(), name: String()};




export const WeatherConfigObj = {entity: null, showCondition: true, showTemperature: false, showLowTemperature: false};











  //CalendarObj_d.image = "fff";
  //CalendarObj_d.image = 33;
//let _weatherConfig = {
//    entity: null,
//    showCondition: true,
//    showTemperature: false,
//    showLowTemperature: false
//};
//Object.assign(_weatherConfig, config.weather ?? {});
//let _config = Object.assign({}, WeatherConfigObj);
//export const CreateObj = {
//    WeatherConfig: Object.keys(Helper.StartingDayEnum).map((key) => ({ 'label': `${Helper.StartingDayEnum[key]}`, 'value': key})),
//    Days: Array.from({ length: 16 }, (_, index) => index + 1).map((key) => ({ 'label': key, 'value': key}))
//};


//export class CreateObj {
//    CalendarEditorObj = { enabled: false, image: null, color: null, entity: null, friendly_name: null, name: null};
//    static WeatherConfig = Object.assign({}, CalendarEditorObj);
//    //export const CalendarObj = {entity: null, image: null, color: null, name: null};
//    //export const WeatherConfigObj = {entity: null, showCondition: true, showTemperature: false, showLowTemperature: false};
//    static getWeatherConfig() {};
//}