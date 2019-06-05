/**
 *
 *
 * @author: blukassen
 */

const EventEmitter      = require('evolux.dynlayers/lib/events');

const Stack             = require('./stack');

// **** options
const optionsdefault    = {};

class Registry extends EventEmitter {

    constructor(options) {
        super();
        this.options = Object.assign({}, this.options, optionsdefault, options);
        this.stack = new Stack();
    }

}

module.exports = Registry;
