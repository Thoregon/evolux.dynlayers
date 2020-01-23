/**
 * A processing layer within a layer stack
 *
 * process the payload in two directions
 * - send       ... top to bottom
 * - receive    ... bottom to top
 *
 * A Layer can stop processing with:
 * - set response to 'error'
 * - set response to 'done'
 * this works both directions, send and receive. Be careful for receive, the result will not reach the top layer!
 *
 * @author: blukassen
 */

import { EventEmitter}              from "/evolux.pubsub";
import { Reporter }                 from "/evolux.supervise";
import Request                      from "../request.mjs";
import Response                     from "../response.mjs";

export default class Layer extends Reporter(EventEmitter) {

    constructor(name) {
        super();
        this._name =    name;
        this._next  =   undefined;
        this._prev  =   undefined;
    }

    // Implement by subclass

    // name of the layer class name will be used as default
    get name() {}

    // process data 'downwards' and return the result
    async send(request, response) {}

    // process data 'upwards' and return the result
    async receive(request, response) {}

    // listen to events from registry; mainly for lifecycle
    doListen(registry) {}

    /*
     * setup & modification
     */

    set prev(layer) {
        this._prev = layer;
    }

    get prev() {
        return this._prev;
    }

    get next() {
        return this._next;
    }

    set next(layer) {
        this._next = layer;
    }

    /*
     * Data
     */

    emptyRequest({ payload, meta, opts } = {}) {
        const req = new Request({ payload, meta, opts });
        return req;
    }

    emptyResponse({ payload, meta } = {}) {
        const res = new Response({ payload, meta, status: 'init' });
        return res;
    }

    /**
     * inserts the specifies layer between this layer and the 'prev' layer
     * (insert before this)
     * does not send any lifcycle events, the caller is responsible
     * sends a config change event
     * @param layer
     */
    insert(layer) {
        const prev = this.prev;
        if (prev) {
            layer.prev = prev;
            prev.next = layer;
        }
        layer.next = this;
        this.prev = layer;
        this.emit('config', { event:'insert', next: this, previous: prev, insert: layer });
    }

    /**
     * removes this layer.
     * does not send any lifcycle events, the caller is responsible
     * sends a config change event
     */
    remove() {
        const next = this.next;
        const prev = this.prev;
        prev.next = next;
        delete this.prev;
        if (next) next.prev = prev;
        this.emit('config', { event:'remove', remove: this, previous: prev, next: next });
    }

    /*
     * implement by subclasses
     */

    /*
     * EventEmitter implementation
     */

    get publishes() {
        return {
            ready:          'Layer ready',
            exit:           'Layer exit',
            process:        'Layer processing',
            result:         'Layer finished with result',
            error:          'Layer finished with error',
            config:         'Layer config changed',
            statechange:    'Layer state changed'
        };
    }

    /*
     * lifecycle
     */

    init() {
        this.emit('ready');
    }

    exit() {
        delete this._top;
        this.emit('exit');
    }

}
