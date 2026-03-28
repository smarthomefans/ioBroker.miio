import { EventEmitter } from "node:events";
import { objectExtend } from "../tools";
import { MiioCommand } from "../Commands/command";
import { MiioProperty } from "../Properties/property";
import * as miio from "miio-lite";

export interface MiioAdapterRWState {
    command: MiioCommand;
    property: MiioProperty;
};

export interface MiioAdapterROState {
    property: MiioProperty;
};

export interface MiioAdapterWOState {
    command: MiioCommand;
};

export class MiioAdapterDevice extends EventEmitter {
    public get deviceName() {
        return "Device";
    }

    public get deviceType() {
        return "MiioAdapterDevice";
    }

    public get rwState(): Record<string, MiioAdapterRWState> {
        return {};
    }

    public get roState(): Record<string, MiioAdapterROState> {
        return {};
    }

    public get woState(): Record<string, MiioAdapterWOState> {
        return {};
    }

    public get states(): Record<string,ioBroker.StateCommon> {
        return objectExtend({
            connected: {
                name: "Is device connected",
                role: "indicator.reachable",
                write: false,
                read: true,
                type: "boolean",
                desc: "Will be set to false if get property failed for 5 times"
            },
            model: {
                name: "device model",
                role: "info",
                write: false,
                read: true,
                type: "string",
                desc: "show current device's MIIO model"
            }
        }, MiioAdapterDevice.transState(this.rwState, this.roState, this.woState));
    }

    public get channels(): Record<string, string[]> {
        return {};
    }

    public static transState(rw: Record<string, MiioAdapterRWState>,
                             ro: Record<string, MiioAdapterROState>,
                             wo: Record<string, MiioAdapterWOState>) {
        const states: Record<string, ioBroker.StateCommon> = {};

        for (const k in rw) {
            if (!states.hasOwnProperty(k)) {
                states[k] = {
                    write: true,
                    read: true,
                    name: k,
                    role: "state"
                };
                const command = rw[k].command;
                const prop = rw[k].property;
                if (command.statePara) {
                    states[k].type = command.statePara.type;
                } else {
                    states[k].type = prop.statePara.type;
                }
                if (command.statePara && command.statePara.hasOwnProperty("min")) {
                    states[k].min = command.statePara.min;
                } else if (prop.statePara && prop.statePara.hasOwnProperty("min")) {
                    states[k].min = prop.statePara.min;
                }
                if (command.statePara && command.statePara.hasOwnProperty("max")) {
                    states[k].max = command.statePara.max;
                } else if (prop.statePara && prop.statePara.hasOwnProperty("max")) {
                    states[k].max = prop.statePara.max;
                }
                if (command.statePara && command.statePara.hasOwnProperty("unit")) {
                    states[k].unit = command.statePara.unit;
                } else if (prop.statePara && prop.statePara.hasOwnProperty("unit")) {
                    states[k].unit = prop.statePara.unit;
                }
                if (command.statePara && command.statePara.hasOwnProperty("role")) {
                    if (command.statePara.role) {
                        states[k].role = command.statePara.role;
                    }
                } else if (prop.statePara && prop.statePara.hasOwnProperty("role")) {
                    if (prop.statePara.role) {
                        states[k].role = prop.statePara.role;
                    }
                }
            }
        }

        for (const k in ro) {
            if (!states.hasOwnProperty(k)) {
                states[k] = {
                    write: false,
                    read: true,
                    name: k,
                    role: "state"
                };
                const prop = ro[k].property;
                states[k].type = prop.statePara.type;
                if (prop.statePara && prop.statePara.hasOwnProperty("min")) {
                    states[k].min = prop.statePara.min;
                }
                if (prop.statePara && prop.statePara.hasOwnProperty("max")) {
                    states[k].max = prop.statePara.max;
                }
                if (prop.statePara && prop.statePara.hasOwnProperty("unit")) {
                    states[k].unit = prop.statePara.unit;
                }
                if (prop.statePara && prop.statePara.hasOwnProperty("role")) {
                    if (prop.statePara.role) {
                        states[k].role = prop.statePara.role;
                    }
                }
            }
        }

        for (const k in wo) {
            if (!states.hasOwnProperty(k)) {
                states[k] = {
                    write: false,
                    read: true,
                    name: k,
                    role: "state"
                };
                const command = wo[k].command;
                if (command.statePara) {
                    states[k].type = command.statePara.type;
                }
                if (command.statePara && command.statePara.hasOwnProperty("min")) {
                    states[k].min = command.statePara.min;
                }
                if (command.statePara && command.statePara.hasOwnProperty("max")) {
                    states[k].max = command.statePara.max;
                }
                if (command.statePara && command.statePara.hasOwnProperty("unit")) {
                    states[k].unit = command.statePara.unit;
                }
                if (command.statePara && command.statePara.hasOwnProperty("role")) {
                    if (command.statePara.role) {
                        states[k].role = command.statePara.role;
                    }
                }
            }
        }
        return states;
    }

    public constructor(miioDev: miio.Device) {
        super();

        this.miioDev = miioDev;
        this.miioID = miioDev.id.replace(/^miio:/, "");
        this.props = {};
        // WARNING: Hack miio lib
        this.miioDev.propertyUpdated = this.propertyUpdated.bind(this);
    }

    private miioDev: miio.Device;
    private miioID: string;
    private props: Record<string, MiioProperty>;

    // TODO: fix any
    public attributeUpdate(state: string, val: any) {
        this.emit("attrUpdate", this.miioID, state, val);
    }

    public get miioDevice() {
        return this.miioDev;
    }

    public getDeviceID() {
        return this.miioID;
    }

    public get properties() {
        const properties: Record<string, MiioProperty> = {};

        for (const k in this.rwState) {
            if (this.rwState.hasOwnProperty(k)) {
                properties[k] = this.rwState[k].property;
            }
        }

        for (const k in this.roState) {
            if (this.roState.hasOwnProperty(k)) {
                properties[k] = this.roState[k].property;
            }
        }
        return properties;
    }

    public get commands() {
        const commands: Record<string, MiioCommand> = {};

        for (const k in this.rwState) {
            if (this.rwState.hasOwnProperty(k)) {
                commands[k] = this.rwState[k].command;
            }
        }

        for (const k in this.woState) {
            if (this.woState.hasOwnProperty(k)) {
                commands[k] = this.woState[k].command;
            }
        }
        return commands;
    }

    // TODO: fix any
    public async invokeCommand(cmd: MiioCommand, val: any) {
        const cc = cmd.command;
        const cvl = [];
        const valType = typeof val;

        if (cc === "CommandInPara") {
            if (!cmd.para || (cmd.para.length !== 1)) {
                this.emit("warning", `CommandInPara command must contains one parameter.`);
                return false;
            }
            const p = cmd.para[0];
            const po = p.obj;
            if (po === undefined) {
                this.emit("warning", `CommandInPara command must contains object parameter.`);
                return false;
            }
            let realCommand;
            if (valType === "boolean") {
                if (val) {
                    // @ts-ignore
                    realCommand = po.true.command;
                } else {
                    // @ts-ignore
                    realCommand = po.false.command;
                }
            }
            // @ts-ignore
            realCommand = po[val].command;
            return this.miioDev.call(realCommand)
                .then(this.miioDev.checkOk);
        }

        if (cmd.para && (cmd.para.length !== 0)) {
            if (valType !== cmd.para[0].type) {
                this.emit("warning", `value=${JSON.stringify(val)} dose not match to command parameter type ${cmd.para[0].type}.`);
                return false;
            }
            if (cc === "set_rgb") {
                cvl.push(parseInt(val.replace(/^#/, ""), 16));
            } else {
                for (let i = 0; i < cmd.para.length; i++) {
                    const p = cmd.para[i];
    
                    if (p.default) {
                        cvl.push(p.default);
                        continue;
                    }
                    if (p.vtype && p.obj) {
                        if (valType === "boolean") {
                            if (val) {
                                cvl.push(p.obj.true);
                            } else {
                                cvl.push(p.obj.false);
                            }
                        }
                        continue;
                    }
                    cvl.push(val);
                }
            }
            return this.miioDev.call(cc, cvl)
                .then(this.miioDev.checkOk);
        }

        return this.miioDev.call(cc)
            .then(this.miioDev.checkOk);
    }

    // TODO: fix any
    public propertyUpdated(p: string, v: any) {
        this.emit("debug", `state=${p}, value=${v}`);
        for (const k in this.props) {
            if (p === this.props[k].prop) {
                const prop = this.props[k];
                let value = v;
                if (p === "rgb") {
                    let s = "000000" + parseInt(v).toString(16);
                    s = s.substr(s.length-6);
                    value = `#${s}`;
                } else if (prop.obj) {
                    value = prop.obj[v];
                } else if ((typeof v === "string") && (prop.type === "number")) {
                    value = +v;
                }

                this.attributeUpdate(k, value);
            }
        }
    }

    public listen(props: Record<string, MiioProperty>) {
        this.props = props;
        for (const k in props) {
            if (props.hasOwnProperty(k)) {
                const prop = props[k];
                let p;
                if (prop.cmd && typeof prop.cmd === "string") {
                    p = {"cmd": prop.cmd, "name": prop.prop};
                } else {
                    p = prop.prop;
                }
                if (prop.mapper && typeof prop.mapper === "function") {
                    this.miioDev.defineProperty(p, prop.mapper);
                } else {
                    this.miioDev.defineProperty(p);
                }
            }
        }
    }
};