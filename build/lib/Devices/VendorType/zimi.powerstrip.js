"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceClass = void 0;
const Powerstrip = require("../Type/powerstrip");
const tools_1 = require("../../tools");
const command_1 = require("../../Commands/command");
const property_1 = require("../../Properties/property");
class DeviceClass extends Powerstrip.DeviceClass {
    get deviceName() {
        return "zimi.powerstrip";
    }
    get deviceType() {
        return "VendorTypeDevice";
    }
    get rwState() {
        return tools_1.objectExtend(super.rwState, {
            powerPrice: {
                command: new command_1.SetPowerPrice(),
                property: new property_1.PowerPrice(),
            },
            wifiLed: {
                command: new command_1.SetWifiLed(),
                property: new property_1.WifiLed(),
            }
        });
    }
    constructor(miioDev) {
        super(miioDev);
    }
}
exports.DeviceClass = DeviceClass;
;
