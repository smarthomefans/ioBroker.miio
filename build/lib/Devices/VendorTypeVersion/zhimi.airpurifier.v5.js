"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const airpurifier_1 = require("../Type/airpurifier");
const tools_1 = require("../../tools");
const command_1 = require("../../Commands/command");
const property_1 = require("../../Properties/property");
class MiioAdapterDeviceZhimiAirpurifierV6 extends airpurifier_1.MiioAdapterDeviceTypeAirPurifier {
    get deviceName() {
        return "zhimi.airpurifier.v6";
    }
    get deviceType() {
        return "VendorTypeVersionDevice";
    }
    get rwState() {
        return tools_1.objectExtend(super.rwState, {
            favoriteLevel: {
                command: new command_1.SetLevelFavorite(),
                property: new property_1.FavoriteLevel(),
            },
            volume: {
                command: new command_1.SetVolume(),
                property: new property_1.Volume(),
            },
            learnSleepMode: {
                command: new command_1.SetActSleep(),
                property: new property_1.ActSleep(),
            },
            buzzer: {
                delete: true,
            },
            ledBrightnessLevel: {
                delete: true,
            }
        });
    }
    get roState() {
        return tools_1.objectExtend(super.roState, {
            averageAqi: {
                property: new property_1.AverageAqi(),
            },
            humidity: {
                property: new property_1.Humidity(),
            },
            temperature: {
                property: new property_1.TempDec(),
            },
            usedTime: {
                property: new property_1.UseTime(),
            },
            motor2Speed: {
                property: new property_1.Motor2Speed(),
            },
            purifyVolume: {
                property: new property_1.PurifyVolume(),
            }
        });
    }
    constructor(miioDev) {
        super(miioDev);
    }
}
exports.MiioAdapterDeviceZhimiAirpurifierV6 = MiioAdapterDeviceZhimiAirpurifierV6;
;
