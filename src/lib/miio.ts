import { EventEmitter } from "node:events";
import * as miio from "miio-lite";

type ControllerDeviceMiioDevice = any;
export interface OptionDeviceDefine {
    token?: string;
    ip?: string;
    id?: string;
    name?: string;
    polling?: number;
};

interface Option {
    devicesDefined?: OptionDeviceDefine[];
    interval?: number
    autoDiscover?: boolean;
    autoDiscoverTimeout?: number;
};

interface DeviceMiioInfo {
    id: string;
    vendor: string;
    type: string;
    version: string;
    model: string;
};

export interface Device {
    miioInfo: DeviceMiioInfo;
    configData: OptionDeviceDefine;
    autoDiscovered: boolean;
    device: ControllerDeviceMiioDevice;
}

export class Controller extends EventEmitter {
    private interval: number;
    private devicesDefined: OptionDeviceDefine[];
    private autoDiscover: boolean;
    private autoDiscoverTimeout: number;
    private browser?: any;
    // TODO: fix. Only need public for test
    public deviceRegistered: Record<string, Device>;

    public constructor(options: Option) {
        super();
        options = options || {};
        this.interval = options.interval || 5000;
        this.devicesDefined = options.devicesDefined || [];
        this.autoDiscover = options.autoDiscover || false;
        this.autoDiscoverTimeout = options.autoDiscoverTimeout || 30;
        this.deviceRegistered = {};
    }

    public discoverDevices(timeoutS: number) {
        this.browser = miio.browse({
            cacheTime: 1800
        });

        this.browser.on("available", (reg: miio.RegisterInfo) => {
            if (!reg.token) {
                this.emit("info", reg.id + " token is hide");
                return;
            }
            if (!reg.id) {
                this.emit("info", "Cannot add device without Device ID");
                return;
            }
            miio.device(
                reg
            ).then((dev: miio.Device) => {
                this.registerDevice(dev, true);
            }).catch((e: string) => {
                this.emit("warning", reg.id + " can not be connected." + e);
            });
        });

        setTimeout(() => {
            this.emit("info", `discover stoped after ${timeoutS} seconds.`);
            this.browser.stop();
        }, timeoutS * 1000);
    }

    public stop() {
        for (const id in this.deviceRegistered) {
            this.deviceRegistered[id].device.miioDevice.destroy();
        }
        if (this.browser) {
            this.browser.stop();
        }
    }

    public async listen() {
        // Connect to user defined device
        for (let i = 0; i < this.devicesDefined.length; i++) {
            const dev = this.devicesDefined[i];

            await miio.device({
                address: dev.ip,
                token: dev.token
            }).then((d: miio.Device) => {
                this.emit("info", dev.ip + " added.");
                this.registerDevice(d, false);
            }).catch((e: string) => {
                this.emit("warning", dev.ip + " can not be connected." + e);
            });
        }
        this.emit("info", "All defined devices are created");

        // Discover devices
        if (this.autoDiscover) {
            this.emit("info", "Start auto discover");
            this.discoverDevices(this.autoDiscoverTimeout);
        }
        return;
    }

    public async setState(id: string, state: string, val: any) {
        if (!this.deviceRegistered[id] || !this.deviceRegistered[id].device) {
            this.emit("warning", id + " set unregistered device state");
            return;
        }
        const miioDev = this.deviceRegistered[id].device;
        const adapterState = miioDev.states[state];
        const miioCommand = miioDev.commands[state];
        if (!adapterState) {
            this.emit("warning", id + " set unsupported device state " + state);
            return;
        }
        const ret = await miioDev.invokeCommand(miioCommand, val);
        if (ret !== false) {
            this.emit("data", id, state, val);
        }
    }

    private async findBestMatchDevice(dev: miio.Device, vendor: string, type: string, version: string) {
        const versionN = version.replace(/\d+$/, "");
        let DeviceClass;

        try {
            DeviceClass = await import(`./Devices/VendorTypeVersion/${vendor}.${type}.${version}`);
            this.emit("info", `new ${vendor}.${type}.${version} device`);
        } catch(e) {
            try {
                DeviceClass = await import(`./Devices/VendorTypeVersion/${vendor}.${type}.${versionN}`);
                this.emit("info", `new ${vendor}.${type}.${versionN} device`);
            } catch(e) {
                try {
                    DeviceClass = await import(`./Devices/VendorType/${vendor}.${type}`);
                    this.emit("info", `new ${vendor}.${type} device`);
                } catch (e) {
                    try {
                        DeviceClass = await import(`./Devices/Type/${type}`);
                        this.emit("info", `new ${type} device`);
                    } catch (e) {
                        this.emit("warning", e);
                        return null;
                    }
                }
            }
        }
        return new DeviceClass.DeviceClass(dev);
    }

    private findDeviceDefineInfo(token: string) {
        for (let i = 0; i < this.devicesDefined.length; i++) {
            const dev = this.devicesDefined[i];
            if (dev.token == token) {
                return dev;
            }
        }
        return {};
    }

    private unregisterDevice(dev: miio.Device) {
        const miioID = dev.id.replace(/^miio:/, "");
        if (!miioID) {
            this.emit("warning", "Cannot remove device without Device ID");
            return;
        }
        if (!this.deviceRegistered[miioID]) {
            this.emit("warning", `${miioID} already removed.`);
            return;
        }

        this.emit("data", miioID, "connected", false);
        //this.emit("device", this.deviceRegistered[miioID], "delete");
        this.emit("info", `${miioID} becomes unavailable.`);
        //delete this.deviceRegistered[miioID];
    }

    // TODO: fix. Only need public for test
    public async registerDevice(dev: miio.Device, isAutoDiscovered: boolean) {
        const miioID = dev.id.replace(/^miio:/, "");
        if (this.deviceRegistered[miioID]) {
            this.emit("info", miioID + " Already registed.");
            return;
        }
        dev.on("thing:destroyed", () => {
            // Device becomes offline.
            this.unregisterDevice(dev);
        });
        const mgmt = dev.management;
        const miioDeviceVendor = mgmt.model.split(".")[0];
        const miioDeviceType = mgmt.model.split(".")[1];
        const miioDeviceVersion = mgmt.model.split(".")[2];
        const device = await this.findBestMatchDevice(dev, miioDeviceVendor,
            miioDeviceType, miioDeviceVersion);

        if (!device) {
            this.emit("warning", mgmt.model + " is not supported for now.");
            return;
        }
        device.on("attrUpdate", (miioId: string, state: string, val: any) => {
            this.emit("debug", `State Change ${miioId} ${state} ${JSON.stringify(val)}`);
            this.emit("data", miioId, state, val);
        });
        device.on("error", (e: string) => {
            this.emit("error", e);
        });
        device.on("warning", (e: string) => {
            this.emit("warning", e);
        });
        device.listen(device.properties);

        this.deviceRegistered[miioID] = {
            miioInfo: {
                id: miioID,
                vendor: miioDeviceVendor,
                type: miioDeviceType,
                version: miioDeviceVersion,
                model: mgmt.model,
            },
            configData: {
                name: this.findDeviceDefineInfo(mgmt.token).name || mgmt.model,
                ip: mgmt.address,
                token: mgmt.token,
                polling: this.findDeviceDefineInfo(mgmt.token).polling || device.polling,
            },
            autoDiscovered: isAutoDiscovered,
            device: device
        };
        let pollingMs = this.deviceRegistered[miioID].configData.polling;
        if (pollingMs !== undefined) {
            if (pollingMs < 3000) {
                pollingMs = 3000;
                this.deviceRegistered[miioID].configData.polling = 3000;
            }
            dev.updatePollDuration(pollingMs);
        }

        this.emit("device", this.deviceRegistered[miioID], "add");
        this.emit("data", miioID, "connected", true);
        this.emit("data", miioID, "model", this.deviceRegistered[miioID].miioInfo.model);
    }
};