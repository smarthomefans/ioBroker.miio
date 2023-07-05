"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceClass = void 0;
const Fan = require("../Type/fan");
const tools_1 = require("../../tools");
const command_1 = require("../../Commands/command");
const property_1 = require("../../Properties/property");
class DeviceClass extends Fan.DeviceClass {
    get deviceName() {
        return "zhimi.fan.v2";
    }
    get deviceType() {
        return "VendorTypeVersionDevice";
    }
    get rwState() {
        return tools_1.objectExtend(super.rwState, {
            led: {
                command: new command_1.SetLed(),
                property: new property_1.Led(),
            }
        });
    }
    get roState() {
        return tools_1.objectExtend(super.roState, {
            humidity: {
                property: new property_1.Humidity(),
            },
            temperature: {
                property: new property_1.TempDec(),
            },
            battery: {
                property: new property_1.Battery(),
            },
            ChargeState: {
                property: new property_1.BatCharge(),
            },
            LastPressedButton: {
                property: new property_1.ButtonPressed(),
            },
            batteryState: {
                property: new property_1.BatState(),
            }
        });
    }
    constructor(miioDev) {
        super(miioDev);
    }
}
exports.DeviceClass = DeviceClass;
;
