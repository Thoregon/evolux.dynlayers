/**
 * splits and merges processing
 * for merge - on both sides - a concentrator fn must be defined
 *
 * @author: blukassen
 */

import Fork from "./fork.mjs";

export default class Parallel extends Fork {

    constructor() {
        super(...arguments);
        this._concentratorfn = () => {};
    }

}

