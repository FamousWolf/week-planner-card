

export const CalendarEditorObj = { enabled: false, image: String(), color: String(), entity: null, friendly_name: String(), name: String()};

export const CalendarObj = {entity: null, image: String(), color: String(), name: String()};




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