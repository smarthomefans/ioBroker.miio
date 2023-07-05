"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceClass = void 0;
const device_1 = require("../device");
const command_1 = require("../../Commands/command");
const property_1 = require("../../Properties/property");
class DeviceClass extends device_1.MiioAdapterDevice {
    get deviceName() {
        return "airpurifier";
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
            ledBrightnessLevel: {
                command: new command_1.SetLedB(),
                property: new property_1.LedB(),
            }
        };
    }
    get roState() {
        return {
            aqi: {
                property: new property_1.Aqi(),
            },
            filterLife: {
                property: new property_1.Filter1Life(),
            },
            filterUsedTime: {
                property: new property_1.F1HourUsed(),
            },
            motor1Speed: {
                property: new property_1.Motor1Speed(),
            },
            illuminance: {
                property: new property_1.Bright(),
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
