"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceClass = void 0;
const Light = require("../Type/light");
const tools_1 = require("../../tools");
const command_1 = require("../../Commands/command");
const property_1 = require("../../Properties/property");
class DeviceClass extends Light.DeviceClass {
    get deviceName() {
        return "yeelink.light";
    }
    get deviceType() {
        return "VendorTypeDevice";
    }
    get rwState() {
        return tools_1.objectExtend(super.rwState, {
            colorTemperature: {
                command: new command_1.SetCtAbx(),
                property: new property_1.Ct(),
            },
            RGB: {
                command: new command_1.SetRgb(),
                property: new property_1.Rgb(),
            },
            RememberState: {
                command: new command_1.SetPs(),
                property: new property_1.SaveState(),
            }
        });
    }
    constructor(miioDev) {
        super(miioDev);
    }
}
exports.DeviceClass = DeviceClass;
;
