/**
 *
 *
 * @author: blukassen
 */

import { className }        from '/evolux.util';

// **** options
const optionsdefault    = {};

export default class Stack {

    constructor(options) {
        this.options = Object.assign({}, this.options, optionsdefault, options);
        this._layers = [];
    }


}
