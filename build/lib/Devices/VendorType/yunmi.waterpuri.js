"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceClass = void 0;
const WaterPuri = require("../Type/waterpuri");
const tools_1 = require("../../tools");
const property_1 = require("../../Properties/property");
class DeviceClass extends WaterPuri.DeviceClass {
    get deviceName() {
        return "yunmi.waterpuri";
    }
    get deviceType() {
        return "VendorTypeDevice";
    }
    get rwState() {
        return tools_1.objectExtend(super.rwState, {
            power: {
                delete: true
            }
        });
    }
    get roState() {
        return tools_1.objectExtend(super.roState, {
            FrontActiveCarbonFilter: {
                property: new property_1.FCFD(),
            },
            FrontActiveCarbonFilterDay: {
                property: new property_1.FCFP(),
            },
            FilteredWaterTDS: {
                property: new property_1.FTDS(),
            },
            PPCottonFilter: {
                property: new property_1.PFD(),
            },
            PPCottonFilterDay: {
                property: new property_1.PFP(),
            },
            RearActiveCarbonFilter: {
                property: new property_1.RCFD(),
            },
            RearActiveCarbonFilterDay: {
                property: new property_1.RCFP(),
            },
            ROFilter: {
                property: new property_1.RFD(),
            },
            ROFilterDay: {
                property: new property_1.RFP(),
            },
            TapWaterTDS: {
                property: new property_1.TTDS(),
            },
            TDS: {
                delete: true
            },
            filter1Life: {
                delete: true
            },
            filter1State: {
                delete: true
            },
            filterLife: {
                delete: true
            },
            filterState: {
                delete: true
            },
            life: {
                delete: true
            },
            state: {
                delete: true
            },
            level: {
                delete: true
            },
            volume: {
                delete: true
            },
            Filter: {
                delete: true
            },
            usage: {
                delete: true
            },
            temperature: {
                delete: true
            },
            uvLife: {
                delete: true
            },
            uvState: {
                delete: true
            },
            elecvalState: {
                delete: true
            }
        });
    }
    constructor(miioDev) {
        super(miioDev);
        // WARNING: Hack miio lib
        this.miioDevice.loadProperties = this.loadProperties.bind(this);
    }
    /**
     *
     */
    loadProperties() {
        // Call get_prop to map everything
        return this.miioDevice.call("get_prop", []).then((result) => {
            const obj = {};
            // @ts-ignore
            this.miioDev._pushProperty(obj, "ttds", result[0]);
            // @ts-ignore
            this.miioDev._pushProperty(obj, "ftds", result[1]);
            const pfd = (result[11] - result[3]) / 24;
            // @ts-ignore
            this.miioDev._pushProperty(obj, "pfp", Math.floor(pfd));
            // @ts-ignore
            this.miioDev._pushProperty(obj, "pfd", Math.floor(pfd * 24 * 100 / result[11]));
            const fcfd = (result[13] - result[5]) / 24;
            // @ts-ignore
            this.miioDev._pushProperty(obj, "fcfp", Math.floor(fcfd));
            // @ts-ignore
            this.miioDev._pushProperty(obj, "fcfd", Math.floor(fcfd * 24 * 100 / result[13]));
            const rfd = (result[15] - result[7]) / 24;
            // @ts-ignore
            this.miioDev._pushProperty(obj, "rfp", Math.floor(rfd));
            // @ts-ignore
            this.miioDev._pushProperty(obj, "rfd", Math.floor(rfd * 24 * 100 / result[15]));
            const rcfd = (result[17] - result[9]) / 24;
            // @ts-ignore
            this.miioDev._pushProperty(obj, "rcfp", Math.floor(rcfd));
            // @ts-ignore
            this.miioDev._pushProperty(obj, "rcfd", Math.floor(rcfd * 24 * 100 / result[17]));
            return obj;
        });
    }
}
exports.DeviceClass = DeviceClass;
;
