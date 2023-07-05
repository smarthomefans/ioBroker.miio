"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceClass = void 0;
const Humidifier = require("../Type/humidifier");
const tools_1 = require("../../tools");
const command_1 = require("../../Commands/command");
const property_1 = require("../../Properties/property");
class DeviceClass extends Humidifier.DeviceClass {
    get deviceName() {
        return "zhimi.humidifier.v";
    }
    get deviceType() {
        return "VendorTypeVersionDevice";
    }
    get rwState() {
        return tools_1.objectExtend(super.rwState, {
            dryMode: {
                command: new command_1.SetDry(),
                property: new property_1.Dry(),
            }
        });
    }
    get roState() {
        return tools_1.objectExtend(super.roState, {
            fanSpeed: {
                property: new property_1.Speed(),
            },
            waterRemain: {
                property: new property_1.Depth(),
            }
        });
    }
    constructor(miioDev) {
        super(miioDev);
    }
}
exports.DeviceClass = DeviceClass;
;
