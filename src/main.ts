/*
 * Created with @iobroker/create-adapter v1.14.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
import * as utils from "@iobroker/adapter-core";
import * as miio from "./lib/miio";

// Load your modules here, e.g.:
// import * as fs from "fs";

// Augment the adapter.config object with the actual types
// TODO: delete this in the next version
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace ioBroker {
        interface AdapterConfig {
            // Define the shape of your options here (recommended)
            autoDiscover: boolean;
            autoDiscoverTimeout: string;
            devices: miio.OptionDeviceDefine[];
            // Or use a catch-all approach
            [key: string]: any;
        }
    }
}

class Miio extends utils.Adapter {

    public constructor(options: Partial<ioBroker.AdapterOptions> = {}) {
        super({
            ...options,
            name: "miio",
        });
        this.on("ready", this.onReady.bind(this));
        this.on("stateChange", this.onStateChange.bind(this));
        // this.on("message", this.onMessage.bind(this));
        this.on("unload", this.onUnload.bind(this));
    }

    /**
     * Save latest miio adapter objects.
     */
    private miioObjects: Record<string, ioBroker.BaseObject> = {};

    /**
     * Save objects that updated before created.
     */
    private delayed: Record<string, any> = {};

    /**
     * Save objects that needed to register.
     */
    private tasks: ioBroker.Object[] = [];

    /**
     * miio Controller
     * @type {}
     */
    private miioController: miio.Controller | null | undefined = null;

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    private async onReady(): Promise<void> {
        // Initialize your adapter here

        // Reset the connection indicator during startup
        this.setConnected(false);
        // in this template all states changes inside the adapters namespace are subscribed
        this.subscribeStates("*");

        await this.miioAdapterInit();
        this.log.debug(`Adapter init done!!!!!!`);
    }

    /**
     * Is called when adapter shuts down - callback has to be called under any circumstances!
     */
    private onUnload(callback: () => void): void {
        try {
            this.log.info("cleaned everything up...");
            this.miioAdapterStop();
            callback();
        } catch (e) {
            callback();
        }
    }

    /**
     * Is called if a subscribed state changes
     */
    private onStateChange(id: string, state: ioBroker.State | null | undefined): void {
        if (!id || !state || state.ack) {
            return;
        }
        if (!this.miioObjects[id]) {
            this.log.warn(`Unknown ID: ${id}`);
            return;
        }
        if (this.miioController) {
            const channelEnd = id.lastIndexOf(".");
            const channelId = id.substring(0, channelEnd);
            const stateName = id.substring(channelEnd + 1);

            if (this.miioObjects[channelId] && this.miioObjects[channelId].native) {
                state = state.val;
                this.log.debug(`onStateChange. state=${stateName} val=${JSON.stringify(state)}`);
                this.miioController.setState(this.miioObjects[channelId].native.id, stateName, state);
            }
        } else {
            this.log.warn(`no miio controller`);
        }
    }

    // /**
    //  * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
    //  * Using this method requires "common.message" property to be set to true in io-package.json
    //  */
    // private onMessage(obj: ioBroker.Message): void {
    // 	if (typeof obj === "object" && obj.message) {
    // 		if (obj.command === "send") {
    // 			// e.g. send email or pushover or whatever
    // 			this.log.info("send command");

    // 			// Send response in callback if required
    // 			if (obj.callback) this.sendTo(obj.from, obj.command, "Message received", obj.callback);
    // 		}
    // 	}
    // }

    /**
     * Is called to set adapter connection status
     */
    private setConnected(conn: boolean) {
        this.setState("info.connection", conn, true);
    }

    private getObjectIDPrefix() {
        return this.namespace + ".devices";
    }

    private getSelfObjectIDPrefix() {
        return "devices";
    }

    private generateChannelID(id: string) {
        return this.getObjectIDPrefix() + "." + id;
    }

    private generateSelfChannelID(id: string) {
        return this.getSelfObjectIDPrefix() + "." + id;
    }


    /**
     * Is called to find exist miio objects
     */
    private readObjects(callback: () => void) {
        this.getForeignObjects(this.getObjectIDPrefix() + ".*", (err, list) => {
            // Read miio objects in database. This maybe set in previous running status.
            // This can restore user defined object parameters.
            this.miioObjects = list;
            callback && callback();
        });
    }

    private miioAdapterUpdateState(id:string, state:string, val:any) {
        if (this.miioObjects[this.namespace + "." + id] ||
            this.miioObjects[this.namespace + "." + id + "." + state]) {
            //TODO: what if only id exist?
            this.setState(id + "." + state, val, true);
        } else {
            this.delayed[id + "." + state] = val;
        }
    }

    private miioAdapterSyncObjects(instant: Miio) {
        function isStateObject(obj: ioBroker.Object): obj is ioBroker.StateObject {
            return obj.type === "state";
        }
        function isChannelObject(obj: ioBroker.Object): obj is ioBroker.ChannelObject {
            return obj.type === "channel";
        }
        function isDeviceObject(obj: ioBroker.Object): obj is ioBroker.DeviceObject {
            return obj.type === "device";
        }

        // This obj is obj with new value
        const obj = instant.tasks.shift();
        if (obj === undefined) {
            return;
        }

        instant.getObject(obj._id, (err, oObj) => {
            if (!oObj) {
                //No obj._id data stored in database. Just set this obj
                instant.miioObjects[instant.namespace + "." + obj._id] = obj;
                instant.setObject(obj._id, obj, () => {
                    if (instant.delayed[obj._id] !== undefined) {
                        instant.setState(obj._id, instant.delayed[obj._id], true, () => {
                            delete instant.delayed[obj._id];
                            setImmediate(instant.miioAdapterSyncObjects, instant);
                        });
                    } else {
                        setImmediate(instant.miioAdapterSyncObjects, instant);
                    }
                });
            } else if (isStateObject(oObj) && isStateObject(obj)) {
                //Database contains obj._id object. Check whether update is needed.
                let changed = false;
                for (const a in obj.common) {
                    if (obj.common.hasOwnProperty(a)) {
                        if (!(<any>oObj.common)[a] ||
                            ((a != "name") && (a !== "icon") && (a !== "role") && (a !== "custom") &&
                                (<any>oObj.common)[a] !== (<any>obj.common)[a])) {
                            // object value need update.
                            changed = true;
                            (<any>oObj.common)[a] = (<any>obj.common)[a];
                        }
                    }
                }
                if (JSON.stringify(obj.native) !== JSON.stringify(oObj.native)) {
                    changed = true;
                    oObj.native = obj.native;
                }
                // The newest data is saved in oObj.
                instant.miioObjects[instant.namespace + "." + obj._id] = oObj;
                if (changed) {
                    instant.extendObject(oObj._id, oObj, () => {
                        if (instant.delayed[oObj._id] !== undefined) {
                            instant.setState(oObj._id, instant.delayed[oObj._id], true, () => {
                                delete instant.delayed[oObj._id];
                                setImmediate(instant.miioAdapterSyncObjects, instant);
                            });
                        } else {
                            setImmediate(instant.miioAdapterSyncObjects, instant);
                        }
                    });
                } else {
                    if (instant.delayed[oObj._id] !== undefined) {
                        instant.setState(oObj._id, instant.delayed[oObj._id], true, () => {
                            delete instant.delayed[oObj._id];
                            setImmediate(instant.miioAdapterSyncObjects, instant);
                        });
                    } else {
                        setImmediate(instant.miioAdapterSyncObjects, instant);
                    }
                }
            } else if ((isChannelObject(oObj) && isChannelObject(obj)) ||
                (isDeviceObject(oObj) && isDeviceObject(obj))) {
                //Database contains obj._id object. Check whether update is needed.
                let changed = false;
                for (const a in obj.common) {
                    if (obj.common.hasOwnProperty(a)) {
                        if (!(<any>oObj.common)[a] ||
                            ((a != "name") && (a !== "icon") && (a !== "custom") &&
                                (<any>oObj.common)[a] !== (<any>obj.common)[a])) {
                            // object value need update.
                            changed = true;
                            (<any>oObj.common)[a] = (<any>obj.common)[a];
                        }
                    }
                }
                // The newest data is saved in oObj.
                instant.miioObjects[instant.namespace + "." + obj._id] = oObj;
                if (changed) {
                    instant.extendObject(oObj._id, oObj, () => {
                        if (instant.delayed[oObj._id] !== undefined) {
                            instant.setState(oObj._id, instant.delayed[oObj._id], true, () => {
                                delete instant.delayed[oObj._id];
                                setImmediate(instant.miioAdapterSyncObjects, instant);
                            });
                        } else {
                            setImmediate(instant.miioAdapterSyncObjects, instant);
                        }
                    });
                } else {
                    if (instant.delayed[oObj._id] !== undefined) {
                        instant.setState(oObj._id, instant.delayed[oObj._id], true, () => {
                            delete instant.delayed[oObj._id];
                            setImmediate(instant.miioAdapterSyncObjects, instant);
                        });
                    } else {
                        setImmediate(instant.miioAdapterSyncObjects, instant);
                    }
                }
            } else {
                if (instant.delayed[oObj._id] !== undefined) {
                    instant.setState(oObj._id, instant.delayed[oObj._id], true, () => {
                        delete instant.delayed[oObj._id];
                        setImmediate(instant.miioAdapterSyncObjects, instant);
                    });
                } else {
                    setImmediate(instant.miioAdapterSyncObjects, instant);
                }
            }
        });
    }

    private miioAdapterCreateDevice(dev: miio.Device) {
        const id = this.generateSelfChannelID(dev.miioInfo.id);
        const isInitTasks = !this.tasks.length;
        const states =  dev.device.states;
        const channels =  dev.device.channels;

        for (const channel in channels) {
            if (!channels.hasOwnProperty(channel)) continue;
            if (channels[channel].length === 0) continue;
            const channelStates = channels[channel];
            for (let i = 0; i < channelStates.length; i++) {
                const channelStatesName = channelStates[i];
                if (typeof states[channelStatesName] === "undefined") continue;
                this.log.info(`Create channel state object ${id}.${channel}.${channelStatesName}`);
                this.tasks.push({
                    _id: `${id}.${channel}.${channelStatesName}`,
                    common: states[channelStatesName],
                    type: "state",
                    native: {}
                });
                delete states[channelStatesName];
            }
            this.log.info(`Create channel object ${id}.${channel}`);
            this.tasks.push({
                _id: `${id}.${channel}`,
                common: {
                    name: channel,
                },
                type: "channel",
                native: {}
            });
        }

        for (const state in states) {
            if (!states.hasOwnProperty(state)) continue;
            this.log.info(`Create state object ${id}.${state}`);
            this.tasks.push({
                _id: `${id}.${state}`,
                common: states[state],
                type: "state",
                native: {}
            });
        }

        this.tasks.push({
            _id: id,
            common: {
                name: dev.configData.name || dev.miioInfo.model,
                icon: `/icons/${dev.miioInfo.model}.png`
            },
            type: "device",
            native: {
                id: dev.miioInfo.id,
                model: dev.miioInfo.model
            }
        });

        isInitTasks && this.miioAdapterSyncObjects(this);
    }

    private miioAdapterDeleteDevice(dev: miio.Device) {
        const id = this.generateSelfChannelID(dev.miioInfo.id);
        const states =  dev.device.states;

        for (const state in states) {
            if (!states.hasOwnProperty(state)) continue;
            this.log.info(`Delete state object ${id}.${state}`);
            this.delObject(`${id}.${state}`);
        }
        this.delObject(`${id}`);
    }

    private miioAdapterStop() {
        if (this.miioController) {
            try {
                this.miioController.stop();
                this.miioController = null;
            } catch (e) {
                this.log.error(`adapter stop failed.` + e);
            }
        }
    }

    private miioAdapterUpdateConfig(configData: miio.OptionDeviceDefine) {
        for (let i = 0; i < this.config.devices.length; i++) {
            if (configData.token === this.config.devices[i].token) {
                if ((configData.ip === this.config.devices[i].ip) && (configData.polling === this.config.devices[i].polling) && (configData.id === this.config.devices[i].id)) {
                    return;
                }
                this.config.devices[i].ip = configData.ip;
                this.config.devices[i].polling = configData.polling;
                this.config.devices[i].id = configData.id;
                this.log.info(`Update Device ${configData.name}'s config: ip = ${configData.ip}, polling = ${configData.polling}, id = ${configData.id}`);
                this.updateConfig && this.updateConfig(this.config);
                return;
            }
        }
        // New discovered device
        this.config.devices.push(configData);
        this.log.info(`Update Device ${configData.name}'s config: ip = ${configData.ip}, polling = ${configData.polling}, id = ${configData.id}`);
        this.updateConfig && this.updateConfig(this.config);
    }

    private async miioAdapterInit() {
        return new Promise((resolve, reject) => {
            this.readObjects(async () => {
                this.setConnected(false);
                if (!this.config ||
                    !this.config.devices ||
                    ("[]" === JSON.stringify(this.config.devices))) {
                    if (!this.config.autoDiscover) {
                        this.log.error("No device defined and discover is also disabled.");
                    }
                }

                this.miioController = new miio.Controller({
                    devicesDefined: this.config.devices,
                    autoDiscover: this.config.autoDiscover,
                    autoDiscoverTimeout: parseInt(this.config.autoDiscoverTimeout || "30")
                });

                this.miioController.on("debug", /** @param {string} msg */ msg => this.log.debug(msg));
                this.miioController.on("info", /** @param {string} msg */ msg => this.log.info(msg));
                this.miioController.on("warning", /** @param {string} msg */ msg => this.log.warn(msg));
                this.miioController.on("error", /** @param {string} msg */ msg => {
                    this.log.error(msg);
                    this.miioAdapterStop();
                });
                // New device need add to adapter.
                this.miioController.on("device", (/** @param {AdapterMiio.ControllerDevice} dev */ dev, /** @param {string} opt */ opt) => {
                    if (opt === "add") {
                        this.getObject(this.generateSelfChannelID(dev.miioInfo.id), (err, oObj) => {
                            if (oObj && (oObj.type === "channel")) {
                                this.log.warn(`Device ${dev.miioInfo.id} objects is outdate. Delete old objects and create new objects.`);
                                this.miioAdapterDeleteDevice(dev);
                            }
                            if (!this.miioObjects[this.generateChannelID(dev.miioInfo.id)]) {
                                this.log.info(`New device: ${dev.miioInfo.model}. ID ${dev.miioInfo.id}`);
                                this.miioAdapterUpdateConfig(dev.configData);
                                this.miioAdapterCreateDevice(dev);
                            } else {
                                this.log.info(`Known device: ${dev.miioInfo.model} ${dev.miioInfo.id}`);
                            }
                        })
                    } else if (opt === "delete") {
                        if (this.miioObjects[this.generateChannelID(dev.miioInfo.id)]) {
                            this.miioAdapterDeleteDevice(dev);
                            this.log.info(`Delete device: ${dev.miioInfo.model}. ID ${dev.miioInfo.id}`);
                        } else {
                            this.log.info(`Want to delete a non-registered device: ${dev.miioInfo.model}. ID ${dev.miioInfo.id}`);
                        }
                    } else {
                        this.log.warn(`Unsupported device event operation "${opt}".`);
                    }
                });
                this.miioController.on("data",
                    (id: string, state: string, val: unknown) => {
                        this.miioAdapterUpdateState(this.generateSelfChannelID(id), state, val ?? null);
                    }
                );
                await this.miioController.listen();
                this.setConnected(true);
                resolve();
            });
        });
    }
}

if (module.parent) {
    // Export the constructor in compact mode
    module.exports = (options: Partial<ioBroker.AdapterOptions> | undefined) => new Miio(options);
} else {
    // otherwise start the instance directly
    (() => new Miio())();
}