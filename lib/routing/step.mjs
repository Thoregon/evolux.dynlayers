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
