"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dry = exports.Depth = exports.BatState = exports.ButtonPressed = exports.BatCharge = exports.Motor2Speed = exports.ActSleep = exports.PurifyVolume = exports.EyeCare = exports.AmbValue = exports.AmbStatus = exports.Bri = exports.Pow = exports.GetPower = exports.UsbOn = exports.On = exports.WifiLed = exports.PowerPrice = exports.TTDS = exports.RFP = exports.RFD = exports.RCFP = exports.RCFD = exports.PFP = exports.PFD = exports.FTDS = exports.FCFP = exports.FCFD = exports.SaveState = exports.Rgb = exports.Ct = exports.ElecLeakage = exports.PowerFactor = exports.Voltage = exports.Cct = exports.ElecvalState = exports.UvState = exports.UvLife = exports.Usage = exports.Filter = exports.Volume = exports.Level = exports.State = exports.Life = exports.FilterState = exports.Filter1State = exports.PowerConsumeRate = exports.PowerstripMode = exports.Current = exports.Temperature = exports.DrinkTimeCount = exports.WorkMode = exports.DrinkRemindTime = exports.DrinkRemind = exports.MinSetTempe = exports.SetupTempe = exports.CurrTempe = exports.WaterRemainTime = exports.Tds = exports.LimitHum = exports.HwVersion = exports.PoweroffTime = exports.AcPower = exports.Speed = exports.AngleEnable = exports.SpeedLevel = exports.NaturalLevel = exports.Angle = exports.LedB = exports.Bright = exports.Filter1Life = exports.NightState = exports.TimeState = exports.UsbState = exports.Battery = exports.LedLevel = exports.Co2 = exports.FavoriteLevel = exports.UseTime = exports.Humidity = exports.TempDec = exports.Buzzer = exports.ChildLock = exports.Led = exports.Motor1Speed = exports.F1HourUsed = exports.FilterLife = exports.Mode = exports.AverageAqi = exports.Aqi = exports.Power = exports.MiioProperty = void 0;
;
;
class MiioProperty {
    constructor(prop, opt) {
        this.prop = prop;
        this.name = opt.name;
        this.desc = opt.desc || undefined;
        this.type = opt.type || "string";
        this.vtype = opt.vtype;
        this.min = opt.min;
        this.max = opt.max;
        this.unit = opt.unit;
        this.obj = opt.obj;
        this.mapper = opt.mapper;
        this.cmd = opt.cmd;
        if (opt.statePara) {
            this.statePara = opt.statePara;
        }
        else {
            this.statePara = {
                type: opt.vtype || opt.type
            };
            if (opt.min !== undefined) {
                this.statePara.min = opt.min;
            }
            if (opt.max !== undefined) {
                this.statePara.max = opt.max;
            }
            if (opt.unit !== undefined) {
                this.statePara.unit = opt.unit;
            }
            if (opt.role !== undefined) {
                this.statePara.role = opt.role;
            }
        }
    }
}
exports.MiioProperty = MiioProperty;
;
/*************************** Supported Properties *****************************/
class Power extends MiioProperty {
    constructor() {
        super("power", {
            name: "power",
            desc: "Current device power state",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
}
exports.Power = Power;
;
class Aqi extends MiioProperty {
    constructor() {
        super("aqi", {
            name: "aqi",
            desc: "Air quality index value",
            unit: "μg/m³",
            type: "number"
        });
    }
}
exports.Aqi = Aqi;
;
class AverageAqi extends MiioProperty {
    constructor() {
        super("average_aqi", {
            name: "average aqi",
            desc: "Average of the air quality index",
            unit: "μg/m³",
            type: "number"
        });
    }
}
exports.AverageAqi = AverageAqi;
;
class Mode extends MiioProperty {
    constructor() {
        super("mode", {
            name: "mode",
            desc: "Current operation mode",
            type: "string",
            enum: ["auto", "silent", "favorite", "idle", "medium", "high", "strong"]
        });
    }
}
exports.Mode = Mode;
;
class FilterLife extends MiioProperty {
    constructor() {
        super("filter_life", {
            name: "filter life",
            desc: "Time until the filter should be changed",
            unit: "days",
            type: "number"
        });
    }
}
exports.FilterLife = FilterLife;
;
class F1HourUsed extends MiioProperty {
    constructor() {
        super("f1_hour_used", {
            name: "f1 hour used",
            desc: "How long the filter has been in use",
            unit: "hours",
            type: "number"
        });
    }
}
exports.F1HourUsed = F1HourUsed;
;
class Motor1Speed extends MiioProperty {
    constructor() {
        super("motor1_speed", {
            name: "motor1 speed",
            desc: "Speed of the motor",
            type: "number"
        });
    }
}
exports.Motor1Speed = Motor1Speed;
;
class Led extends MiioProperty {
    constructor() {
        super("led", {
            name: "led",
            desc: "Current LED stste",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
}
exports.Led = Led;
;
class ChildLock extends MiioProperty {
    constructor() {
        super("child_lock", {
            name: "child lock",
            desc: "Current child lock state",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
}
exports.ChildLock = ChildLock;
;
class Buzzer extends MiioProperty {
    constructor() {
        super("buzzer", {
            name: "buzzer",
            desc: "Current buzzer state",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
}
exports.Buzzer = Buzzer;
;
class TempDec extends MiioProperty {
    constructor() {
        super("temp_dec", {
            name: "temp dec",
            desc: "Current temperature. Need divided by 10",
            unit: "°C",
            type: "number",
            role: "temperature",
            mapper: v => v / 10,
        });
    }
}
exports.TempDec = TempDec;
;
class Humidity extends MiioProperty {
    constructor() {
        super("humidity", {
            name: "humidity",
            desc: "Current humidity",
            unit: "%",
            type: "number",
            role: "humidity"
        });
    }
}
exports.Humidity = Humidity;
;
class UseTime extends MiioProperty {
    constructor() {
        super("use_time", {
            name: "use time",
            desc: "How long the device has been active in seconds",
            unit: "secs",
            type: "number"
        });
    }
}
exports.UseTime = UseTime;
;
class FavoriteLevel extends MiioProperty {
    constructor() {
        super("favorite_level", {
            name: "favorite level",
            desc: "Thw level which is used for favorite mode",
            min: 0,
            max: 17,
            type: "number"
        });
    }
}
exports.FavoriteLevel = FavoriteLevel;
;
class Co2 extends MiioProperty {
    constructor() {
        super("co2", {
            name: "co2",
            desc: "Carbon dioxide",
            unit: "ppm",
            type: "number"
        });
    }
}
exports.Co2 = Co2;
;
class LedLevel extends MiioProperty {
    constructor() {
        super("led_level", {
            name: "led level",
            desc: "Brightness of the LED",
            type: "number"
        });
    }
}
exports.LedLevel = LedLevel;
;
class Battery extends MiioProperty {
    constructor() {
        super("battery", {
            name: "battery",
            desc: "Current battery level",
            unit: "%",
            type: "number"
        });
    }
}
exports.Battery = Battery;
;
class UsbState extends MiioProperty {
    constructor() {
        super("usb_state", {
            name: "usb state",
            desc: "Device's usb connection state",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
}
exports.UsbState = UsbState;
;
class TimeState extends MiioProperty {
    constructor() {
        super("time_state", {
            name: "time state",
            desc: "Display a clock instead the AQI",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
}
exports.TimeState = TimeState;
;
class NightState extends MiioProperty {
    constructor() {
        super("night_state", {
            name: "night state",
            desc: "Device current night mode state",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
}
exports.NightState = NightState;
;
class Filter1Life extends MiioProperty {
    constructor() {
        super("filter1_life", {
            name: "filter1 life",
            desc: "Time until the filter should be changed",
            unit: "days",
            type: "number"
        });
    }
}
exports.Filter1Life = Filter1Life;
;
class Bright extends MiioProperty {
    constructor() {
        super("bright", {
            name: "bright",
            desc: "Current brightness",
            min: 0,
            max: 100,
            unit: "%",
            type: "number"
        });
    }
}
exports.Bright = Bright;
;
class LedB extends MiioProperty {
    constructor() {
        super("led_b", {
            name: "led b",
            desc: "LED brightness",
            min: 0,
            max: 2,
            type: "number"
        });
    }
}
exports.LedB = LedB;
;
class Angle extends MiioProperty {
    constructor() {
        super("angle", {
            name: "angle",
            desc: "Current angle",
            type: "number"
        });
    }
}
exports.Angle = Angle;
;
class NaturalLevel extends MiioProperty {
    constructor() {
        super("natural_level", {
            name: "natural level",
            desc: "Set natural level",
            min: 0,
            max: 100,
            unit: "%",
            type: "number"
        });
    }
}
exports.NaturalLevel = NaturalLevel;
;
class SpeedLevel extends MiioProperty {
    constructor() {
        super("speed_level", {
            name: "speed level",
            desc: "Set speed level",
            min: 0,
            max: 100,
            unit: "%",
            type: "number"
        });
    }
}
exports.SpeedLevel = SpeedLevel;
;
class AngleEnable extends MiioProperty {
    constructor() {
        super("angle_enable", {
            name: "angle enable",
            desc: "Oscillation state",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
}
exports.AngleEnable = AngleEnable;
;
class Speed extends MiioProperty {
    constructor() {
        super("speed", {
            name: "speed",
            desc: "Current fan speed",
            type: "number"
        });
    }
}
exports.Speed = Speed;
;
class AcPower extends MiioProperty {
    constructor() {
        super("ac_power", {
            name: "ac power",
            desc: "Powered by AC",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
}
exports.AcPower = AcPower;
;
class PoweroffTime extends MiioProperty {
    constructor() {
        super("poweroff_time", {
            name: "poweroff time",
            desc: "Countdown until turning off in seconds",
            unit: "secs",
            type: "number"
        });
    }
}
exports.PoweroffTime = PoweroffTime;
;
class HwVersion extends MiioProperty {
    constructor() {
        super("hw_version", {
            name: "hw version",
            desc: "The hardware version",
            type: "number"
        });
    }
}
exports.HwVersion = HwVersion;
;
class LimitHum extends MiioProperty {
    constructor() {
        super("limit_hum", {
            name: "limit hum",
            desc: "Target humidity",
            type: "number",
            unit: "%",
            enum: [30, 40, 50, 60, 70, 80]
        });
    }
}
exports.LimitHum = LimitHum;
;
class Tds extends MiioProperty {
    constructor() {
        super("tds", {
            name: "tds",
            desc: "Water TDS",
            unit: "mg/L",
            type: "number"
        });
    }
}
exports.Tds = Tds;
;
class WaterRemainTime extends MiioProperty {
    constructor() {
        super("water_remain_time", {
            name: "water remain time",
            desc: "Water Storage Time",
            unit: "Hours",
            type: "number"
        });
    }
}
exports.WaterRemainTime = WaterRemainTime;
;
class CurrTempe extends MiioProperty {
    constructor() {
        super("curr_tempe", {
            name: "curr tempe",
            desc: "Current input water temperature.",
            unit: "°C",
            type: "number"
        });
    }
}
exports.CurrTempe = CurrTempe;
;
class SetupTempe extends MiioProperty {
    constructor() {
        super("setup_tempe", {
            name: "setup tempe",
            desc: "Output water temperature",
            unit: "°C",
            type: "number"
        });
    }
}
exports.SetupTempe = SetupTempe;
;
class MinSetTempe extends MiioProperty {
    constructor() {
        super("min_set_tempe", {
            name: "min set tempe",
            desc: "Minmum setup temperature can be set",
            unit: "°C",
            type: "number"
        });
    }
}
exports.MinSetTempe = MinSetTempe;
;
class DrinkRemind extends MiioProperty {
    constructor() {
        super("drink_remind", {
            name: "drink remind",
            desc: "Enable drink reminder",
            type: "number",
            vtype: "boolean",
            obj: {
                1: true,
                0: false
            }
        });
    }
}
exports.DrinkRemind = DrinkRemind;
;
class DrinkRemindTime extends MiioProperty {
    constructor() {
        super("drink_remind_time", {
            name: "drink remind time",
            desc: "Drink reminder time duration",
            unit: "hours",
            type: "number"
        });
    }
}
exports.DrinkRemindTime = DrinkRemindTime;
;
class WorkMode extends MiioProperty {
    constructor() {
        super("work_mode", {
            name: "work mode",
            desc: "Current work mode",
            type: "number",
            vtype: "string",
            obj: {
                0: "cold water",
                1: "warm water",
                2: "boil water",
            }
        });
    }
}
exports.WorkMode = WorkMode;
;
class DrinkTimeCount extends MiioProperty {
    constructor() {
        super("drink_time_count", {
            name: "drink time count",
            desc: "Last drink time count",
            unit: "hours",
            type: "number"
        });
    }
}
exports.DrinkTimeCount = DrinkTimeCount;
;
class Temperature extends MiioProperty {
    constructor() {
        super("temperature", {
            name: "temperature",
            desc: "Current temperature.",
            unit: "°C",
            type: "number",
            role: "temperature"
        });
    }
}
exports.Temperature = Temperature;
;
class Current extends MiioProperty {
    constructor() {
        super("current", {
            name: "current",
            desc: "Current value",
            unit: "A",
            type: "number"
        });
    }
}
exports.Current = Current;
;
class PowerstripMode extends MiioProperty {
    constructor() {
        super("mode", {
            name: "mode",
            desc: "Current powerstrip mode",
            type: "string",
            enum: ["green", "normal"]
        });
    }
}
exports.PowerstripMode = PowerstripMode;
;
class PowerConsumeRate extends MiioProperty {
    constructor() {
        super("power_consume_rate", {
            name: "power consume rate",
            desc: "Current power load",
            unit: "kW",
            type: "number"
        });
    }
}
exports.PowerConsumeRate = PowerConsumeRate;
;
class Filter1State extends MiioProperty {
    constructor() {
        super("filter1_state", {
            name: "filter1 state",
            desc: "",
            type: "string"
        });
    }
}
exports.Filter1State = Filter1State;
;
class FilterState extends MiioProperty {
    constructor() {
        super("filter_state", {
            name: "filter state",
            desc: "",
            type: "string"
        });
    }
}
exports.FilterState = FilterState;
;
class Life extends MiioProperty {
    constructor() {
        super("life", {
            name: "life",
            desc: "",
            unit: "days",
            type: "number"
        });
    }
}
exports.Life = Life;
;
class State extends MiioProperty {
    constructor() {
        super("state", {
            name: "state",
            desc: "",
            type: "string"
        });
    }
}
exports.State = State;
;
class Level extends MiioProperty {
    constructor() {
        super("level", {
            name: "level",
            desc: "",
            type: "number"
        });
    }
}
exports.Level = Level;
;
class Volume extends MiioProperty {
    constructor() {
        super("volume", {
            name: "volume",
            desc: "Volume of sound notifications",
            min: 0,
            max: 100,
            unit: "%",
            type: "number"
        });
    }
}
exports.Volume = Volume;
;
class Filter extends MiioProperty {
    constructor() {
        super("filter", {
            name: "filter",
            desc: "",
            type: "string"
        });
    }
}
exports.Filter = Filter;
;
class Usage extends MiioProperty {
    constructor() {
        super("usage", {
            name: "usage",
            desc: "",
            type: "string"
        });
    }
}
exports.Usage = Usage;
;
class UvLife extends MiioProperty {
    constructor() {
        super("uv_life", {
            name: "uv life",
            desc: "",
            unit: "days",
            type: "number"
        });
    }
}
exports.UvLife = UvLife;
;
class UvState extends MiioProperty {
    constructor() {
        super("uv_state", {
            name: "uv state",
            desc: "",
            type: "string"
        });
    }
}
exports.UvState = UvState;
;
class ElecvalState extends MiioProperty {
    constructor() {
        super("elecval_state", {
            name: "elecval state",
            desc: "Current valve state",
            type: "string"
        });
    }
}
exports.ElecvalState = ElecvalState;
;
class Cct extends MiioProperty {
    constructor() {
        super("cct", {
            name: "cct",
            desc: "Current color temperature",
            type: "number",
            min: 1,
            max: 100,
            unit: "%"
        });
    }
}
exports.Cct = Cct;
;
class Voltage extends MiioProperty {
    constructor() {
        super("voltage", {
            name: "voltage",
            desc: "The voltage",
            unit: "V",
            type: "number"
        });
    }
}
exports.Voltage = Voltage;
;
class PowerFactor extends MiioProperty {
    constructor() {
        super("power_factor", {
            name: "power factor",
            desc: "The power factor",
            type: "number"
        });
    }
}
exports.PowerFactor = PowerFactor;
;
class ElecLeakage extends MiioProperty {
    constructor() {
        super("elec_leakage", {
            name: "elec leakage",
            desc: "The leakage current",
            type: "number"
        });
    }
}
exports.ElecLeakage = ElecLeakage;
;
class Ct extends MiioProperty {
    constructor() {
        super("ct", {
            name: "ct",
            desc: "Current color temperature",
            type: "number",
            min: 1700,
            max: 6500,
            unit: "K"
        });
    }
}
exports.Ct = Ct;
;
class Rgb extends MiioProperty {
    constructor() {
        super("rgb", {
            name: "rgb",
            desc: "color in RGB",
            type: "string"
        });
    }
}
exports.Rgb = Rgb;
;
class SaveState extends MiioProperty {
    constructor() {
        super("save_state", {
            name: "save state",
            desc: "Return whether the bulb state is saved on change",
            type: "string",
            vtype: "boolean",
            obj: {
                "1": true,
                "0": false
            }
        });
    }
}
exports.SaveState = SaveState;
;
class FCFD extends MiioProperty {
    constructor() {
        super("fcfd", {
            name: "Front active carbon filter",
            desc: "Front active carbon filter",
            unit: "%",
            type: "number"
        });
    }
}
exports.FCFD = FCFD;
;
class FCFP extends MiioProperty {
    constructor() {
        super("fcfp", {
            name: "Front active carbon filter day",
            desc: "Front active carbon filter day",
            unit: "days",
            type: "number"
        });
    }
}
exports.FCFP = FCFP;
;
class FTDS extends MiioProperty {
    constructor() {
        super("ftds", {
            name: "Filtered water",
            desc: "Filtered water",
            unit: "TDS",
            type: "number"
        });
    }
}
exports.FTDS = FTDS;
;
class PFD extends MiioProperty {
    constructor() {
        super("pfd", {
            name: "PP cotton filter",
            desc: "PP cotton filter",
            unit: "%",
            type: "number"
        });
    }
}
exports.PFD = PFD;
;
class PFP extends MiioProperty {
    constructor() {
        super("pfp", {
            name: "PP cotton filter day",
            desc: "PP cotton filter day",
            unit: "days",
            type: "number"
        });
    }
}
exports.PFP = PFP;
;
class RCFD extends MiioProperty {
    constructor() {
        super("rcfd", {
            name: "Rear active carbon filter",
            desc: "Rear active carbon filter",
            unit: "%",
            type: "number"
        });
    }
}
exports.RCFD = RCFD;
;
class RCFP extends MiioProperty {
    constructor() {
        super("rcfp", {
            name: "Rear active carbon filter day",
            desc: "Rear active carbon filter day",
            unit: "days",
            type: "number"
        });
    }
}
exports.RCFP = RCFP;
;
class RFD extends MiioProperty {
    constructor() {
        super("rfd", {
            name: "RO filter",
            desc: "RO filter",
            unit: "%",
            type: "number"
        });
    }
}
exports.RFD = RFD;
;
class RFP extends MiioProperty {
    constructor() {
        super("rfp", {
            name: "RO filter day",
            desc: "RO filter day",
            unit: "days",
            type: "number"
        });
    }
}
exports.RFP = RFP;
;
class TTDS extends MiioProperty {
    constructor() {
        super("ttds", {
            name: "Tap water",
            desc: "Tap water",
            unit: "TDS",
            type: "number"
        });
    }
}
exports.TTDS = TTDS;
;
class PowerPrice extends MiioProperty {
    constructor() {
        super("power_price", {
            name: "power price",
            desc: "The stored power price",
            min: 0,
            max: 999,
            unit: "/kwh",
            type: "number"
        });
    }
}
exports.PowerPrice = PowerPrice;
;
class WifiLed extends MiioProperty {
    constructor() {
        super("wifi_led", {
            name: "wifi led",
            desc: "Current device WiFi LED state",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
}
exports.WifiLed = WifiLed;
;
class On extends MiioProperty {
    constructor() {
        super("on", {
            name: "on",
            desc: "True if device is on",
            type: "boolean"
        });
    }
}
exports.On = On;
;
class UsbOn extends MiioProperty {
    constructor() {
        super("usb_on", {
            name: "usb on",
            desc: "True if device USB power is on",
            type: "boolean"
        });
    }
}
exports.UsbOn = UsbOn;
;
class GetPower extends MiioProperty {
    constructor() {
        super("get_power", {
            name: "get power",
            desc: "Get plug power",
            unit: "W",
            type: "number",
            mapper: v => v * 0.01,
            cmd: "get_power"
        });
    }
}
exports.GetPower = GetPower;
;
class Pow extends MiioProperty {
    constructor() {
        super("pow", {
            name: "pow",
            desc: "Current device power state",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
}
exports.Pow = Pow;
;
class Bri extends MiioProperty {
    constructor() {
        super("bri", {
            name: "bri",
            desc: "Current brightness",
            min: 0,
            max: 100,
            unit: "%",
            type: "number",
            role: "level.brightness"
        });
    }
}
exports.Bri = Bri;
;
class AmbStatus extends MiioProperty {
    constructor() {
        super("ambstatus", {
            name: "ambstatus",
            desc: "Ambient light state",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
}
exports.AmbStatus = AmbStatus;
;
class AmbValue extends MiioProperty {
    constructor() {
        super("ambvalue", {
            name: "ambvalue",
            desc: "Brightness of the ambient light",
            min: 1,
            max: 100,
            unit: "%",
            type: "number"
        });
    }
}
exports.AmbValue = AmbValue;
;
class EyeCare extends MiioProperty {
    constructor() {
        super("eyecare", {
            name: "eyecare",
            desc: "Current eyecare mode",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
}
exports.EyeCare = EyeCare;
;
class PurifyVolume extends MiioProperty {
    constructor() {
        super("purify_volume", {
            name: "purify volume",
            desc: "The volume of purified air in cubic meter",
            unit: "m³",
            type: "number"
        });
    }
}
exports.PurifyVolume = PurifyVolume;
;
class ActSleep extends MiioProperty {
    constructor() {
        super("act_sleep", {
            name: "act sleep",
            desc: "Learn mode state",
            type: "string",
            vtype: "boolean",
            obj: {
                single: true,
                close: false
            }
        });
    }
}
exports.ActSleep = ActSleep;
;
class Motor2Speed extends MiioProperty {
    constructor() {
        super("motor2_speed", {
            name: "motor2 speed",
            desc: "Speed of the 2nd motor",
            type: "number"
        });
    }
}
exports.Motor2Speed = Motor2Speed;
;
class BatCharge extends MiioProperty {
    constructor() {
        super("bat_charge", {
            name: "bat charge",
            desc: "State of the battery charger",
            type: "string"
        });
    }
}
exports.BatCharge = BatCharge;
;
class ButtonPressed extends MiioProperty {
    constructor() {
        super("button_pressed", {
            name: "button pressed",
            desc: "Last pressed button",
            type: "string"
        });
    }
}
exports.ButtonPressed = ButtonPressed;
;
class BatState extends MiioProperty {
    constructor() {
        super("bat_state", {
            name: "bat state",
            desc: "State of the battery",
            type: "string"
        });
    }
}
exports.BatState = BatState;
;
class Depth extends MiioProperty {
    constructor() {
        super("depth", {
            name: "depth",
            desc: "The remaining amount of water in percent",
            min: 0,
            max: 100,
            mapper: v => v / 1.2,
            unit: "%",
            type: "number"
        });
    }
}
exports.Depth = Depth;
;
class Dry extends MiioProperty {
    constructor() {
        super("dry", {
            name: "dry",
            desc: "Dry mode: The amount of water is not enough to continue to work for about 8 hours.",
            type: "string",
            vtype: "boolean",
            obj: {
                on: true,
                off: false
            }
        });
    }
}
exports.Dry = Dry;
;
