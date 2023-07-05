"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceClass = void 0;
const Plug = require("../Type/plug");
const tools_1 = require("../../tools");
const command_1 = require("../../Commands/command");
const property_1 = require("../../Properties/property");
class DeviceClass extends Plug.DeviceClass {
    get deviceName() {
        return "chuangmi.plug.v3";
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
            },
            wifiLed: {
                command: new command_1.SetWifiLed(),
                property: new property_1.WifiLed(),
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
exports.DeviceClass = DeviceClass;
;
