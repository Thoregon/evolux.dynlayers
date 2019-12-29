/**
 *
 *
 * @author: Bernhard Lukassen
 */

import Layer from "./layer.mjs";


export default class Step extends Layer {

    constructor() {
        super(...arguments);
        this._next  = undefined;
    }

    /*
     * setup & modification
     */


    get next() {
        return this._next;
    }

    set next(layer) {
        this._next = layer;
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
