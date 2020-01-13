 /**
 * the response object will be sent down as well as bubbles up again
 * use to transport the state of the processed request or,
 * if not async it can transport also a result
 *
 * the response delivers a handle for state changes
 *
 * @author: Bernhard Lukassen
 */

export default class Response {

    constructor({
                    payload,
                    meta = {},
                    status = []
                } = {}) {
        Object.assign(this, { payload, meta, status });
    }

}
