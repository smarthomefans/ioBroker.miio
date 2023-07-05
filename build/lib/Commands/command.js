"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetDry = exports.SetVolume = exports.SetActSleep = exports.SetEyeCare = exports.SetAmbBright = exports.EnableAmb = exports.SetUsbPowerChuangmiPlugV3 = exports.SetPowerChuangmiPlugV3 = exports.SetWifiLed = exports.SetPowerPrice = exports.SetPs = exports.SetRgb = exports.SetCtAbx = exports.SetCct = exports.SetBright = exports.SetDrinkRemindTime = exports.SetDrinkRemindEnable = exports.SetTempeSetup = exports.SetLimitHum = exports.SetPoweroffTime = exports.SetAngleEnable = exports.SetSpeedLevel = exports.SetNaturalLevel = exports.SetAngle = exports.SetLedB = exports.SetNightState = exports.SetTimeState = exports.SetLevelFavorite = exports.SetBuzzer = exports.SetChildLock = exports.SetLed = exports.SetMode = exports.SetPower = exports.MiioCommand = void 0;
;
class MiioCommand {
    constructor(command, opt) {
        this.command = command;
        this.name = opt.name;
        this.desc = opt.desc || undefined;
        this.para = opt.para || [];
        this.returnType = opt.returnType || undefined;
        if (this.para.length) {
            if (opt.statePara) {
                this.statePara = opt.statePara;
            }
            else {
                this.statePara = {
                    type: this.para[0].type
                };
                if (this.para[0].min !== undefined) {
                    this.statePara.min = this.para[0].min;
                }
                if (this.para[0].max !== undefined) {
                    this.statePara.max = this.para[0].max;
                }
                if (this.para[0].unit !== undefined) {
                    this.statePara.unit = this.para[0].unit;
                }
                if (this.para[0].role !== undefined) {
                    this.statePara.role = this.para[0].role;
                }
            }
        }
    }
}
exports.MiioCommand = MiioCommand;
;
/*************************** Supported Commands *******************************/
class SetPower extends MiioCommand {
    constructor() {
        super("set_power", {
            name: "set power",
            desc: "Set power on/off",
            para: [{
                    type: "boolean",
                    vtype: "string",
                    obj: {
                        true: "on",
                        false: "off"
                    },
                    role: "switch"
                }]
        });
    }
}
exports.SetPower = SetPower;
;
class SetMode extends MiioCommand {
    constructor() {
        super("set_mode", {
            name: "set mode",
            desc: "Set mode",
            para: [{
                    type: "string",
                    enum: ["auto", "silent", "favorite", "idle", "medium", "high", "strong"]
                }]
        });
    }
}
exports.SetMode = SetMode;
;
class SetLed extends MiioCommand {
    constructor() {
        super("set_led", {
            name: "set led",
            desc: "Turn led on/off",
            para: [{
                    type: "boolean",
                    vtype: "string",
                    obj: {
                        true: "on",
                        false: "off"
                    }
                }]
        });
    }
}
exports.SetLed = SetLed;
;
class SetChildLock extends MiioCommand {
    constructor() {
        super("set_child_lock", {
            name: "set child lock",
            desc: "Set child lock on/off",
            para: [{
                    type: "boolean",
                    vtype: "string",
                    obj: {
                        true: "on",
                        false: "off"
                    }
                }]
        });
    }
}
exports.SetChildLock = SetChildLock;
;
class SetBuzzer extends MiioCommand {
    constructor() {
        super("set_buzzer", {
            name: "set buzzer",
            desc: "Set buzzer on/off",
            para: [{
                    type: "boolean",
                    vtype: "string",
                    obj: {
                        true: "on",
                        false: "off"
                    }
                }]
        });
    }
}
exports.SetBuzzer = SetBuzzer;
;
class SetLevelFavorite extends MiioCommand {
    constructor() {
        super("set_level_favorite", {
            name: "set level favorite",
            desc: "Set favorite level",
            para: [{
                    min: 0,
                    max: 17,
                    type: "number"
                }]
        });
    }
}
exports.SetLevelFavorite = SetLevelFavorite;
;
class SetTimeState extends MiioCommand {
    constructor() {
        super("set_time_state", {
            name: "set time state",
            desc: "Enable/disable displaying a clock instead the AQI",
            para: [{
                    type: "boolean",
                    vtype: "string",
                    obj: {
                        true: "on",
                        false: "off"
                    }
                }]
        });
    }
}
exports.SetTimeState = SetTimeState;
;
class SetNightState extends MiioCommand {
    constructor() {
        super("set_night_state", {
            name: "set night state",
            desc: "Decrease the brightness of the display",
            para: [{
                    type: "boolean",
                    vtype: "string",
                    obj: {
                        true: "on",
                        false: "off"
                    }
                }]
        });
    }
}
exports.SetNightState = SetNightState;
;
class SetLedB extends MiioCommand {
    constructor() {
        super("set_led_b", {
            name: "set led b",
            desc: "Set led brightness",
            para: [{
                    min: 0,
                    max: 2,
                    type: "number",
                }]
        });
    }
}
exports.SetLedB = SetLedB;
;
class SetAngle extends MiioCommand {
    constructor() {
        super("set_angle", {
            name: "set angle",
            desc: "Set the oscillation angle",
            para: [{
                    min: 0,
                    max: 120,
                    type: "number"
                }]
        });
    }
}
exports.SetAngle = SetAngle;
;
class SetNaturalLevel extends MiioCommand {
    constructor() {
        super("set_natural_level", {
            name: "set natural level",
            desc: "Set natural level",
            para: [{
                    min: 0,
                    max: 100,
                    type: "number"
                }]
        });
    }
}
exports.SetNaturalLevel = SetNaturalLevel;
;
class SetSpeedLevel extends MiioCommand {
    constructor() {
        super("set_speed_level", {
            name: "set speed level",
            desc: "Set speed of the direct mode",
            para: [{
                    min: 0,
                    max: 100,
                    type: "number"
                }]
        });
    }
}
exports.SetSpeedLevel = SetSpeedLevel;
;
class SetAngleEnable extends MiioCommand {
    constructor() {
        super("set_angle_enable", {
            name: "set angle enable",
            desc: "Set oscillate on/off",
            para: [{
                    type: "boolean",
                    vtype: "string",
                    obj: {
                        true: "on",
                        false: "off"
                    }
                }]
        });
    }
}
exports.SetAngleEnable = SetAngleEnable;
;
class SetPoweroffTime extends MiioCommand {
    constructor() {
        super("set_poweroff_time", {
            name: "set poweroff time",
            desc: "Set delay off seconds",
            para: [{
                    min: 1,
                    unit: "secs",
                    type: "number"
                }]
        });
    }
}
exports.SetPoweroffTime = SetPoweroffTime;
;
class SetLimitHum extends MiioCommand {
    constructor() {
        super("set_limit_hum", {
            name: "set limit hum",
            desc: "Set the target humidity",
            para: [{
                    type: "number",
                    enum: [30, 40, 50, 60, 70, 80]
                }]
        });
    }
}
exports.SetLimitHum = SetLimitHum;
;
class SetTempeSetup extends MiioCommand {
    constructor() {
        super("set_tempe_setup", {
            name: "set tempe setup",
            desc: "Set setup temperature",
            para: [{
                    min: 1,
                    max: 100,
                    unit: "°C",
                    type: "number",
                    role: "level"
                }]
        });
    }
}
exports.SetTempeSetup = SetTempeSetup;
;
class SetDrinkRemindEnable extends MiioCommand {
    constructor() {
        super("set_drink_remind_enable", {
            name: "set drink remind enable",
            desc: "Set setup drink reminder",
            para: [{
                    type: "boolean",
                    vtype: "number",
                    obj: {
                        true: 1,
                        false: 0
                    }
                }]
        });
    }
}
exports.SetDrinkRemindEnable = SetDrinkRemindEnable;
;
class SetDrinkRemindTime extends MiioCommand {
    constructor() {
        super("set_drink_remind_time", {
            name: "set drink remind time",
            desc: "Set setup drink reminder time",
            para: [{
                    //hours
                    unit: "hours",
                    enum: [0, 1, 2, 3, 4, 6, 8, 10, 12],
                    type: "number"
                }]
        });
    }
}
exports.SetDrinkRemindTime = SetDrinkRemindTime;
;
class SetBright extends MiioCommand {
    constructor() {
        super("set_bright", {
            name: "set bright",
            desc: "Set brightness level",
            para: [{
                    min: 0,
                    max: 100,
                    type: "number",
                    role: "level.brightness"
                }]
        });
    }
}
exports.SetBright = SetBright;
;
class SetCct extends MiioCommand {
    constructor() {
        super("set_cct", {
            name: "set cct",
            desc: "Set Correlated Color Temperature",
            para: [{
                    min: 1,
                    max: 100,
                    type: "number"
                }]
        });
    }
}
exports.SetCct = SetCct;
;
class SetCtAbx extends MiioCommand {
    constructor() {
        super("set_ct_abx", {
            name: "set ct abx",
            desc: "Set color temp in kelvin",
            para: [{
                    //kelvin
                    min: 1700,
                    max: 6500,
                    type: "number",
                    role: "level.color.temperature"
                }, {
                    //mode
                    type: "string",
                    enum: [
                        "smooth",
                        "sudden"
                    ],
                    default: "smooth"
                }, {
                    //transition
                    min: 0,
                    type: "number",
                    default: 500
                }]
        });
    }
}
exports.SetCtAbx = SetCtAbx;
;
class SetRgb extends MiioCommand {
    constructor() {
        super("set_rgb", {
            name: "set rgb",
            desc: "Set color in RGB",
            para: [{
                    type: "string",
                    role: "level.color.rgb"
                }]
        });
    }
}
exports.SetRgb = SetRgb;
;
class SetPs extends MiioCommand {
    constructor() {
        super("set_ps", {
            name: "set ps",
            desc: "Turn more function on/off",
            para: [{
                    type: "string",
                    enum: [
                        "cfg_lan_ctrl",
                        "cfg_save_state" //saving the state on changes
                    ],
                    default: "cfg_save_state"
                }, {
                    type: "boolean",
                    vtype: "string",
                    obj: {
                        true: "1",
                        false: "0"
                    }
                }],
            statePara: {
                type: "boolean"
            }
        });
    }
}
exports.SetPs = SetPs;
;
class SetPowerPrice extends MiioCommand {
    constructor() {
        super("set_power_price", {
            name: "set power price",
            desc: "Set the power price",
            para: [{
                    min: 0,
                    max: 999,
                    type: "number"
                }]
        });
    }
}
exports.SetPowerPrice = SetPowerPrice;
;
class SetWifiLed extends MiioCommand {
    constructor() {
        super("set_wifi_led", {
            name: "set wifi led",
            desc: "Set the wifi led on/off",
            para: [{
                    type: "boolean",
                    vtype: "string",
                    obj: {
                        true: "on",
                        false: "off"
                    },
                    role: "switch"
                }]
        });
    }
}
exports.SetWifiLed = SetWifiLed;
;
class SetOn extends MiioCommand {
    constructor() {
        super("set_on", {
            name: "set on",
            desc: "Power on"
        });
    }
}
;
class SetOff extends MiioCommand {
    constructor() {
        super("set_off", {
            name: "set off",
            desc: "Power off"
        });
    }
}
;
class SetPowerChuangmiPlugV3 extends MiioCommand {
    constructor() {
        super("CommandInPara", {
            name: "set power for chuangmi.plug.v3",
            desc: "set power for chuangmi.plug.v3",
            para: [{
                    type: "boolean",
                    obj: {
                        true: new SetOn(),
                        false: new SetOff()
                    },
                    role: "switch"
                }]
        });
    }
}
exports.SetPowerChuangmiPlugV3 = SetPowerChuangmiPlugV3;
;
class SetUsbOn extends MiioCommand {
    constructor() {
        super("set_usb_on", {
            name: "set usb on",
            desc: "USB Power on"
        });
    }
}
;
class SetUsbOff extends MiioCommand {
    constructor() {
        super("set_usb_off", {
            name: "set usb off",
            desc: "USB Power off"
        });
    }
}
;
class SetUsbPowerChuangmiPlugV3 extends MiioCommand {
    constructor() {
        super("CommandInPara", {
            name: "set usb power for chuangmi.plug.v3",
            desc: "set usb power for chuangmi.plug.v3",
            para: [{
                    type: "boolean",
                    obj: {
                        true: new SetUsbOn(),
                        false: new SetUsbOff()
                    },
                    role: "switch"
                }]
        });
    }
}
exports.SetUsbPowerChuangmiPlugV3 = SetUsbPowerChuangmiPlugV3;
;
class EnableAmb extends MiioCommand {
    constructor() {
        super("enable_amb", {
            name: "enable amb",
            desc: "Set ambient light",
            para: [{
                    type: "boolean",
                    vtype: "string",
                    obj: {
                        true: "on",
                        false: "off"
                    },
                    role: "switch"
                }]
        });
    }
}
exports.EnableAmb = EnableAmb;
;
class SetAmbBright extends MiioCommand {
    constructor() {
        super("set_amb_bright", {
            name: "set amb bright",
            desc: "Set the brightness of the ambient light",
            para: [{
                    min: 1,
                    max: 100,
                    type: "number",
                    role: "level.brightness"
                }]
        });
    }
}
exports.SetAmbBright = SetAmbBright;
;
class SetEyeCare extends MiioCommand {
    constructor() {
        super("set_eyecare", {
            name: "set eyecare",
            desc: "Set eyecare mode on/off",
            para: [{
                    type: "boolean",
                    vtype: "string",
                    obj: {
                        true: "on",
                        false: "off"
                    },
                    role: "switch"
                }]
        });
    }
}
exports.SetEyeCare = SetEyeCare;
;
class SetActSleep extends MiioCommand {
    constructor() {
        super("set_act_sleep", {
            name: "set act sleep",
            desc: "Set the Learn Mode on/off",
            para: [{
                    type: "boolean",
                    vtype: "string",
                    obj: {
                        true: "single",
                        false: "close"
                    }
                }]
        });
    }
}
exports.SetActSleep = SetActSleep;
;
class SetVolume extends MiioCommand {
    constructor() {
        super("set_volume", {
            name: "set volume",
            desc: "Set volume of sound notifications",
            para: [{
                    min: 0,
                    max: 100,
                    type: "number"
                }]
        });
    }
}
exports.SetVolume = SetVolume;
;
class SetDry extends MiioCommand {
    constructor() {
        super("set_dry", {
            name: "set dry",
            desc: "Set dry mode on/off",
            para: [{
                    type: "boolean",
                    vtype: "string",
                    obj: {
                        true: "on",
                        false: "off"
                    }
                }]
        });
    }
}
exports.SetDry = SetDry;
;
