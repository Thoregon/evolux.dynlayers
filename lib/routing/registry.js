/**
 *
 *
 * @author: blukassen
 */
import { logger }                   from "/evolux.universe";
import { isFunction, forEach }      from "/evolux.util";
import { EventEmitter}              from "/evolux.pubsub";
import { Reporter }                 from "/evolux.supervise";

const Stack             = require('./stack');

// **** options
const optionsdefault    = {};

export default class Registry extends EventEmitter {

    constructor(options) {
        super();
        this.options = Object.assign({}, this.options, optionsdefault, options);
        this.stack = new Stack();
    }

}
