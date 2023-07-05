"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceClass = void 0;
const YeelinkLight = require("../VendorType/yeelink.light");
const tools_1 = require("../../tools");
class DeviceClass extends YeelinkLight.DeviceClass {
    get deviceName() {
        return "yeelink.light.mono";
    }
    get deviceType() {
        return "VendorTypeVersionDevice";
    }
    get rwState() {
        return tools_1.objectExtend(super.rwState, {
            colorTemperature: {
                delete: true
            },
            RGB: {
                delete: true
            }
        });
    }
    constructor(miioDev) {
        super(miioDev);
    }
}
exports.DeviceClass = DeviceClass;
;
