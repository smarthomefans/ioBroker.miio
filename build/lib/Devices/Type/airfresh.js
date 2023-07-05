"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceClass = void 0;
const device_1 = require("../device");
const command_1 = require("../../Commands/command");
const property_1 = require("../../Properties/property");
class DeviceClass extends device_1.MiioAdapterDevice {
    get deviceName() {
        return "airfresh";
    }
    get deviceType() {
        return "TypeDevice";
    }
    get rwState() {
        return {
            power: {
                command: new command_1.SetPower(),
                property: new property_1.Power(),
            },
            mode: {
                command: new command_1.SetMode(),
                property: new property_1.Mode(),
            },
            led: {
                command: new command_1.SetLed(),
                property: new property_1.Led(),
            },
            childLock: {
                command: new command_1.SetChildLock(),
                property: new property_1.ChildLock(),
            },
            buzzer: {
                command: new command_1.SetBuzzer(),
                property: new property_1.Buzzer(),
            },
            favoriteLevel: {
                command: new command_1.SetLevelFavorite(),
                property: new property_1.FavoriteLevel(),
            }
        };
    }
    get roState() {
        return {
            aqi: {
                property: new property_1.Aqi(),
            },
            averageAqi: {
                property: new property_1.AverageAqi(),
            },
            humidity: {
                property: new property_1.Humidity(),
            },
            Temperature: {
                property: new property_1.TempDec(),
            },
            filterLife: {
                property: new property_1.FilterLife(),
            },
            filterUsedTime: {
                property: new property_1.F1HourUsed(),
            },
            motor1Speed: {
                property: new property_1.Motor1Speed(),
            },
            usedTime: {
                property: new property_1.UseTime(),
            },
            co2: {
                property: new property_1.Co2(),
            },
            ledBrightnessLevel: {
                property: new property_1.LedLevel(),
            }
        };
    }
    get polling() {
        return 3000;
    }
    constructor(miioDev) {
        super(miioDev);
    }
}
exports.DeviceClass = DeviceClass;
;
