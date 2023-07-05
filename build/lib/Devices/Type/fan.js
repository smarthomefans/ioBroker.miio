"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceClass = void 0;
const device_1 = require("../device");
const command_1 = require("../../Commands/command");
const property_1 = require("../../Properties/property");
class DeviceClass extends device_1.MiioAdapterDevice {
    get deviceName() {
        return "fan";
    }
    get deviceType() {
        return "TypeDevice";
    }
    get rwState() {
        return {
            power: {
                command: new command_1.SetPower(),
                property: new property_1.Power(),
            },
            childLock: {
                command: new command_1.SetChildLock(),
                property: new property_1.ChildLock(),
            },
            buzzer: {
                command: new command_1.SetBuzzer(),
                property: new property_1.Buzzer(),
            },
            ledBrightnessLevel: {
                command: new command_1.SetLedB(),
                property: new property_1.LedB(),
            },
            angle: {
                command: new command_1.SetAngle(),
                property: new property_1.Angle(),
            },
            naturalSpeed: {
                command: new command_1.SetNaturalLevel(),
                property: new property_1.NaturalLevel(),
            },
            directSpeed: {
                command: new command_1.SetSpeedLevel(),
                property: new property_1.SpeedLevel(),
            },
            oscillate: {
                command: new command_1.SetAngleEnable(),
                property: new property_1.AngleEnable(),
            },
            timedOff: {
                command: new command_1.SetPoweroffTime(),
                property: new property_1.PoweroffTime(),
            }
        };
    }
    get roState() {
        return {
            motorSpeed: {
                property: new property_1.Speed(),
            },
            ConnectAC: {
                property: new property_1.AcPower(),
            },
            UseTime: {
                property: new property_1.UseTime(),
            }
        };
    }
    get polling() {
        return 3000;
    }
    constructor(miioDev) {
        super(miioDev);
    }
}
exports.DeviceClass = DeviceClass;
;
