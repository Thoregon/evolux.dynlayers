/**
 *
 *
 * @author: blukassen
 */

import { EventEmitter}              from "/evolux.pubsub";
import { Reporter }                 from "/evolux.supervise";


export default class Layer extends Reporter(EventEmitter) {

    constructor() {
        super(...arguments);
        this._prev  = undefined;
    }

    // Implement by subclass

    // name of the layer class name will be used as default
    get name() {}

    // process data 'downwards' and return the result
    send(request, response) {}

    // process data 'upwards' and return the result
    receive(request, response) {}

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

    /**
     * inserts the specifies layer between this layer and the 'prev' layer
     * (insert before this)
     * does not send any lifcycle events, the caller is responsible
     * sends a config change event
     * @param layer
     */
    insert(layer) {
        const prev = this.prev;
        layer.prev = prev;
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

    get next() {}

    set next(layer) {}

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
