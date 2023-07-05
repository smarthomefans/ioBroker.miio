"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceClass = void 0;
const PhilipsLight = require("../VendorType/philips.light");
const tools_1 = require("../../tools");
const command_1 = require("../../Commands/command");
const property_1 = require("../../Properties/property");
class DeviceClass extends PhilipsLight.DeviceClass {
    get deviceName() {
        return "philips.light.sread";
    }
    get deviceType() {
        return "VendorTypeVersionDevice";
    }
    get rwState() {
        return tools_1.objectExtend(super.rwState, {
            colorTemperature: {
                delete: true
            },
            eyeCare: {
                command: new command_1.SetEyeCare(),
                property: new property_1.EyeCare(),
            },
            secondLightPower: {
                command: new command_1.EnableAmb(),
                property: new property_1.AmbStatus(),
            },
            secondLightBrightness: {
                command: new command_1.SetAmbBright(),
                property: new property_1.AmbValue(),
            }
        });
    }
    constructor(miioDev) {
        super(miioDev);
    }
}
exports.DeviceClass = DeviceClass;
;
