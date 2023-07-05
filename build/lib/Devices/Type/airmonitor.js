"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceClass = void 0;
const device_1 = require("../device");
const command_1 = require("../../Commands/command");
const property_1 = require("../../Properties/property");
class DeviceClass extends device_1.MiioAdapterDevice {
    get deviceName() {
        return "airmonitor";
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
            displayClock: {
                command: new command_1.SetTimeState(),
                property: new property_1.TimeState(),
            },
            nightMode: {
                command: new command_1.SetNightState(),
                property: new property_1.NightState(),
            }
        };
    }
    get roState() {
        return {
            aqi: {
                property: new property_1.Aqi(),
            },
            battery: {
                property: new property_1.Battery(),
            },
            USBConnected: {
                property: new property_1.UsbState(),
            }
        };
    }
    constructor(miioDev) {
        super(miioDev);
    }
}
exports.DeviceClass = DeviceClass;
;
