"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceClass = void 0;
const device_1 = require("../device");
const command_1 = require("../../Commands/command");
const property_1 = require("../../Properties/property");
class DeviceClass extends device_1.MiioAdapterDevice {
    get deviceName() {
        return "humidifier";
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
            buzzer: {
                command: new command_1.SetBuzzer(),
                property: new property_1.Buzzer(),
            },
            ledBrightnessLevel: {
                command: new command_1.SetLedB(),
                property: new property_1.LedB(),
            },
            childLock: {
                command: new command_1.SetChildLock(),
                property: new property_1.ChildLock(),
            },
            targetHumidity: {
                command: new command_1.SetLimitHum(),
                property: new property_1.LimitHum(),
            }
        };
    }
    get roState() {
        return {
            temperature: {
                property: new property_1.TempDec(),
            },
            humidity: {
                property: new property_1.Humidity(),
            },
            hardwareVersion: {
                property: new property_1.HwVersion(),
            },
            usedTime: {
                property: new property_1.UseTime(),
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
