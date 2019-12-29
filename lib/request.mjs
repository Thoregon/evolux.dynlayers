/**
 * the request object is sent down the stack for processing
 * it can me adapted by each layer
 *
 * @author: Bernhard Lukassen
 */

export default class Request {

    constructor({
                    payload,
                    meta = {},
                } = {}) {
        Object.assign(this, { payload, meta });
    }

}
