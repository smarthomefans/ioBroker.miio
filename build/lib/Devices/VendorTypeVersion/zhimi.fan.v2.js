"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fan_1 = require("../Type/fan");
const tools_1 = require("../../tools");
const command_1 = require("../../Commands/command");
const property_1 = require("../../Properties/property");
class MiioAdapterDeviceZhimiFanV2 extends fan_1.MiioAdapterDeviceTypeFan {
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
exports.MiioAdapterDeviceZhimiFanV2 = MiioAdapterDeviceZhimiFanV2;
;
