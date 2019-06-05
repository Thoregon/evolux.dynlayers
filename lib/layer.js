/**
 *
 *
 * @author: blukassen
 */

const EventEmitter      = require('evolux.dynlayers/lib/events');

// **** options
const optionsdefault    = {};

class Layer extends EventEmitter {

    constructor(options) {
        super();
        this.options = Object.assign({}, this.options, optionsdefault, options);
    }

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

module.exports = Layer;
