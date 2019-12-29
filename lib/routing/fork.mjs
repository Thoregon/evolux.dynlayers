/**
 * splits and merges processing
 * for merge - on both sides - a concentrator fn must be defined
 *
 * @author: blukassen
 */
import Layer from "./layer.mjs";

export default class Fork extends Layer {

    constructor() {
        super(...arguments);
        this._threads = [];
        this._wait4all = true;
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

