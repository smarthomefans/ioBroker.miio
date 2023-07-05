"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceClass = void 0;
const Humidifier = require("../Type/humidifier");
const tools_1 = require("../../tools");
const property_1 = require("../../Properties/property");
class DeviceClass extends Humidifier.DeviceClass {
    get deviceName() {
        return "zhimi.humidifier.v";
    }
    get deviceType() {
        return "VendorTypeVersionDevice";
    }
    get roState() {
        return tools_1.objectExtend(super.roState, {
            LastPressedButton: {
                property: new property_1.ButtonPressed(),
            }
        });
    }
    constructor(miioDev) {
        super(miioDev);
    }
}
exports.DeviceClass = DeviceClass;
;
