/**
 *
 *
 * @author: blukassen
 */
import { isFunction, forEach }      from "/evolux.util";
import { EventEmitter}              from "/evolux.pubsub";
import { Reporter }                 from "/evolux.supervise";
import { ErrLayerStackExists }      from "../errors.mjs";

export default class Registry extends Reporter(EventEmitter) {

    constructor() {
        super();
        this._stacks = new Map();
    }

    hasStack(id) {
        return this._stacks.has(id);
    }

    addStack(id, stack) {
        if (this.hasStack(id)) throw ErrLayerStackExists(id);
        this._stacks.set(id, stack);
    }

}
