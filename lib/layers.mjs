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
import { className }                from "/evolux.util";
import { Reporter }                 from "/evolux.supervise";
import Request                      from "./request.mjs";
import Response, { RESPONSE_STATI } from "./response.mjs";

import { ErrLayerStackExists, ErrLayerStackNotFound } from "./errors.mjs";

export default class Layers extends Reporter(EventEmitter) {

    constructor() {
        super();
        this._stacks = new Map();
    }

    /*
     * Processing implementation
     */

    async processSend(name, payload) {
        if (!this.hasStack(name)) throw ErrLayerStackNotFound(name);
        const req = new Request({ payload, meta: { name } });
        const res = new Response();
        let stack = this.stack(name);

        // each layer is isolated, minding his own business, and doesn't send requests to anywhere else
        // this controller is responsible for handing over to the next layer
        res.busy();
        this.emit('sendbusy', { name, payload });
        do {
            try {
                await stack.send(req, res, this);
                stack = stack.next;
            } catch (err) {
                res.error(err);
                this.logger.error(`processing layer send: ${className(stack)}`, err);
            }
        } while (!res.isError && !res.isDone && stack);

        if (!res.isError && !res.isWarn) res.done();

        this.emit('sendend', { name, res });

        return res;
    }

    async processReceive(name, payload) {
        if (!this.hasStack(name)) throw ErrLayerStackNotFound(name);
        // don't be confused, the request now comes from the 'bottom',
        // the response goes back to the bottom layer!
        const req = new Request({ payload, meta: { name } });
        const res = new Response();
        let stack = this._bottom(this.stack(name));

        // each layer is isolated, minding his own business, and doesn't send requests to anywhere else
        // this controller is responsible for handing over to the next layer
        res.busy();
        this.emit('receivebusy', { name, payload });
        do {
            try {
                await stack.receive(req, res, this);
                stack = stack.prev;
            } catch (err) {
                res.error(err);
            }
        } while (!res.isError && !res.isDone && stack);

        if (!res.isError && !res.isWarn)  {
            res.done();

            const cb = this.stackCb(name);
            if (cb) await cb(req.payload, res);
        }

        this.emit('receiveend', { name, res });

        return res;
    }

    _bottom(stack) {
        let next = stack;
        while (next.next) next = next.next;
        return next;
    }

    /*
     * Repository implementation
     */

    /**
     * get the processing stack with the specified name
     * @param name
     * @return {Layer}  processing stack
     */
    stack(name) {
        if (!this.hasStack(name)) throw ErrLayerStackNotFound(name);
        return this._stacks.get(name).stack;
    }

    /**
     * get the processing stack callback with the specified name
     * @param name
     * @return {Function}  processing stack
     */
    stackCb(name) {
        if (!this.hasStack(name)) throw ErrLayerStackNotFound(name);
        return this._stacks.get(name).cb;
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
    addStack(name, stack, cb) {
        if (this.hasStack(name)) throw ErrLayerStackExists(name);
        stack.init();
        this._stacks.set(name, { stack, cb });

        this.logger.debug(`layer stack added: ${name}`);
        this.emit('installed', { name, stack });
        return true;
    }

    removeStack(name) {
        if (!this.hasStack(name)) throw ErrLayerStackNotFound(name);
        const stack = this._stacks.get(name).stack;
        this._stacks.delete(name);
        stack.exit();

        this.logger.debug(`layer stack removed: ${name}`);
        this.emit('uninstalled', { name, stack });
        return true;
    }

    updateStack(name, stack, cb) {
        if (!this.hasStack(name)) throw ErrLayerStackNotFound(name);
        const oldstack = this._stacks.get(name);
        oldstack.stack.exit();
        this._stacks.delete(name);
        stack.init();
        this._stacks.set(name, { stack, cb: cb ? cb : oldstack.cb });

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
            uninstalled:    'Layer uninstalled',

            sendbusy:       'Layer stack is processing send',
            sendend:        'Layer stack send processing ended, could also be an error',

            receivebusy:    'Layer stack is processing receive',
            receiveend:     'Layer stack receive processing ended, could also be an error',
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
        this._stacks.forEach((stack, name) => {
            try {
                stack.stack.exit();
            } catch (err) {
                this.logger.error(`stack didn't exit proper: ${name}`, err, name);
            }
        });
        this.emit('exit');
    }
}
