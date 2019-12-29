/**
 *
 *
 * @author: Bernhard Lukassen
 */

import Fork from "./fork.mjs";

export default class Switch extends Fork {

    constructor() {
        super(...arguments);
    }

    addThread(condition, layer) {

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
