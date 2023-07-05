"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceClass = void 0;
const Powerstrip = require("../Type/powerstrip");
const tools_1 = require("../../tools");
const property_1 = require("../../Properties/property");
class DeviceClass extends Powerstrip.DeviceClass {
    get deviceName() {
        return "qmi.powerstrip";
    }
    get deviceType() {
        return "VendorTypeDevice";
    }
    get roState() {
        return tools_1.objectExtend(super.roState, {
            voltage: {
                property: new property_1.Voltage(),
            },
            powerFactor: {
                property: new property_1.PowerFactor(),
            },
            LeakageCurrent: {
                property: new property_1.ElecLeakage(),
            }
        });
    }
    constructor(miioDev) {
        super(miioDev);
    }
}
exports.DeviceClass = DeviceClass;
;
