/**
 * this is the registry for layers.
 * yes, it is not required to have registry because
 * layers are more like a library witch is used.
 *
 * but it provides better monitoring and debugging
 *
 * @author: Bernhard Lukassen
 */

import { EventEmitter}              from "/evolux.pubsub";
import { Reporter }                 from "/evolux.supervise";

import { ErrLayerStackExists, ErrLayerStackNotFound } from "./errors.mjs";

export default class Layers extends Reporter(EventEmitter) {

    constructor() {
        super();
        this._stacks = new Map();
    }

    /**
     * check if a layer stack is already registered
     * @param name
     * @return {boolean}
     */
    hasStack(name) {
        return this._stacks.has(name);
    }

    addStack(name, stack) {
        if (this.hasStack(name)) throw ErrLayerStackExists(name);
        stack.init();
        this._stacks.set(name, stack);

        this.logger.debug(`layer stack added: ${name}`);
        this.emit('installed', { name, stack });
        return true;
    }

    removeStack(name) {
        if (!this.hasStack(name)) throw ErrLayerStackNotFound(name);
        this._stacks.get(name).exit();
        this._stacks.delete(name);

        this.logger.debug(`layer stack removed: ${name}`);
        this.emit('uninstalled', { name, stack });
        return true;
    }

    updateStack(name, stack) {
        if (!this.hasStack(name)) throw ErrLayerStackNotFound(name);
        const oldstack = this._stacks.get(name);
        oldstack.exit();
        this._stacks.delete(name);
        stack.init();
        this._stacks.set(name, stack);

        this.logger.debug(`layer stack updated: ${name}`);
        this.emit('updated', { name, stack, oldstack });
        return true;

    }

    /*
     * EventEmitter implementation
     */

    get publishes() {
        return {
            ready:          'Layers ready',
            exit:           'Layers exit',
            installed:      'Layer Stack installed',
            updated:        'Layer Stack updated',
            uninstalled:    'Layer Stack uninstalled'
        };
    }

    /*
     * lifecylce
     */

    init() {
        if (!this._stacks) this._stacks = new Map();
        this.emit('ready');
    }

    exit() {
        this._stacks.entries().forEach(entry => {
            const name  = entry[0];
            const stack = entry[1];
            try {
                stack.exit();
            } catch (err) {
                this.logger.error(`stack didn't exit proper: ${name}`, err, name);
            }
        });
        this.emit('exit');
    }
}
