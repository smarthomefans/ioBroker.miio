"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceClass = void 0;
const device_1 = require("../device");
const command_1 = require("../../Commands/command");
const property_1 = require("../../Properties/property");
class DeviceClass extends device_1.MiioAdapterDevice {
    get deviceName() {
        return "waterpuri";
    }
    get deviceType() {
        return "TypeDevice";
    }
    get rwState() {
        return {
            power: {
                command: new command_1.SetPower(),
                property: new property_1.Power(),
            }
        };
    }
    get roState() {
        return {
            TDS: {
                property: new property_1.Tds(),
            },
            filter1Life: {
                property: new property_1.Filter1Life(),
            },
            filter1State: {
                property: new property_1.Filter1State(),
            },
            filterLife: {
                property: new property_1.FilterLife(),
            },
            filterState: {
                property: new property_1.FilterState(),
            },
            life: {
                property: new property_1.Life(),
            },
            state: {
                property: new property_1.State(),
            },
            level: {
                property: new property_1.Level(),
            },
            volume: {
                property: new property_1.Volume(),
            },
            Filter: {
                property: new property_1.Filter(),
            },
            usage: {
                property: new property_1.Usage(),
            },
            temperature: {
                property: new property_1.Temperature(),
            },
            uvLife: {
                property: new property_1.UvLife(),
            },
            uvState: {
                property: new property_1.UvState(),
            },
            elecvalState: {
                property: new property_1.ElecvalState(),
            }
        };
    }
    constructor(miioDev) {
        super(miioDev);
    }
}
exports.DeviceClass = DeviceClass;
;
