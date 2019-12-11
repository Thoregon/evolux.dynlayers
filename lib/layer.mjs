/**
 *
 *
 * @author: blukassen
 */

import { isFunction, forEach }      from "/evolux.util";
import { EventEmitter}              from "/evolux.pubsub";

// **** options
const optionsdefault    = {};

export default class Layer extends EventEmitter {

    constructor(options) {
        super();
        this.options = Object.assign({}, this.options, optionsdefault, options);
    }

    /*
     * lifecycle
     */

    init() {}

    exit() {}

    // Implement by subclass

    // name of the layer class name will be used as default
    get name() {}

    // process data 'downwards' and return the result
    send(data) {}

    // process data 'upwards' and return the result
    receive(data) {}

    // listen to events from registry; mainly for lifecycle
    doListen(registry) {}
}
