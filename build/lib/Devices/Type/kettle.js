"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceClass = void 0;
const device_1 = require("../device");
const command_1 = require("../../Commands/command");
const property_1 = require("../../Properties/property");
class DeviceClass extends device_1.MiioAdapterDevice {
    get deviceName() {
        return "kettle";
    }
    get deviceType() {
        return "TypeDevice";
    }
    get rwState() {
        return {
            WarmWaterTemperature: {
                command: new command_1.SetTempeSetup(),
                property: new property_1.SetupTempe(),
            },
            remindDrink: {
                command: new command_1.SetDrinkRemindEnable(),
                property: new property_1.DrinkRemind(),
            },
            remindDrinkDuration: {
                command: new command_1.SetDrinkRemindTime(),
                property: new property_1.DrinkRemindTime(),
            }
        };
    }
    get roState() {
        return {
            TDS: {
                property: new property_1.Tds(),
            },
            waterStorageTime: {
                property: new property_1.WaterRemainTime(),
            },
            currentWaterTemperature: {
                property: new property_1.CurrTempe(),
            },
            minWarmWaterTemperature: {
                property: new property_1.MinSetTempe(),
            },
            workMode: {
                property: new property_1.WorkMode(),
            },
            lastDrinkTime: {
                property: new property_1.DrinkTimeCount(),
            }
        };
    }
    constructor(miioDev) {
        super(miioDev);
    }
}
exports.DeviceClass = DeviceClass;
;
