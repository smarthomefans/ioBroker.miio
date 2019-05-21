"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plug_1 = require("../Type/plug");
const tools_1 = require("../../tools");
const command_1 = require("../../Commands/command");
const property_1 = require("../../Properties/property");
class MiioAdapterDeviceChuangmiPlugV1 extends plug_1.MiioAdapterDeviceTypePlug {
    get deviceName() {
        return "chuangmi.plug.v1";
    }
    get deviceType() {
        return "VendorTypeVersionDevice";
    }
    get rwState() {
        return tools_1.objectExtend(super.rwState, {
            power: {
                command: new command_1.SetPowerChuangmiPlugV3(),
                property: new property_1.On(),
            },
            usbPower: {
                command: new command_1.SetUsbPowerChuangmiPlugV3(),
                property: new property_1.UsbOn(),
            }
        });
    }
    get roState() {
        return tools_1.objectExtend(super.roState, {
            loadPower: {
                property: new property_1.GetPower()
            }
        });
    }
    constructor(miioDev) {
        super(miioDev);
    }
}
exports.MiioAdapterDeviceChuangmiPlugV1 = MiioAdapterDeviceChuangmiPlugV1;
;
