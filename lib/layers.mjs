/**
 * This is the repository for layers.
 * yes, it is not required to have registry because
 * layers are more like a library witch is used.
 *
 * but it provides better monitoring and debugging
 *
 * this repository is strict, throws errors when requested resources are not available
 *
 * @author: Bernhard Lukassen
 */

import { EventEmitter}              from "/evolux.pubsub";
import { Reporter }                 from "/evolux.supervise";
import Request                      from "./request.mjs";
import Response                     from "./response.mjs";

import { ErrLayerStackExists, ErrLayerStackNotFound } from "./errors.mjs";

export default class Layers extends Reporter(EventEmitter) {

    constructor() {
        super();
        this._stacks = new Map();
    }

    /*
     * Processing implementation
     */

    async process(name, payload) {
        const stack = this.stack(name);
        const req = new Request({ payload });
        const res = new Response();
        return await stack.process()
    }

    /*
     * Repository implementation
     */

    /**
     * get the processing stack with the specified name
     * @param name
     * @return {Stack}  processing stack
     */
    stack(name) {
        if (!this.hasStack(name)) throw ErrLayerStackNotFound(name);
        return this._stacks.get(id);
    }

    /**
     * check if a layer stack is already registered
     * the stack is represented by the top element
     * @param name
     * @return {boolean}
     */
    hasStack(name) {
        return this._stacks.has(name);
    }

    /**
     * add a stack to the layer registry
     * the stack is represented by the top element
     * @param name
     * @param stack
     * @return {boolean}
     */
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
        const stack = this._stacks.get(name);
        this._stacks.delete(name);
        stack.exit();

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
            created:        'Layer Stack installed',
            dropped:        'Layer Stack uninstalled',
            installed:      'Layer installed',
            updated:        'Layer updated',
            uninstalled:    'Layer uninstalled'
        };
    }

    /*
     * lifecycle
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
