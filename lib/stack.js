/**
 *
 *
 * @author: blukassen
 */

const { className } = require('../../evolux.util');

// **** options
const optionsdefault    = {};

class Stack {

    constructor(options) {
        this.options = Object.assign({}, this.options, optionsdefault, options);
        this._layers = [];
    }


}

module.exports = Stack;
