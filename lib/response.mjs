 /**
 * the response object will be sent down as well as bubbles up again
 * use to transport the state of the processed request or,
 * if not async it can transport also a result
 *
 * the response delivers a handle for state changes
 *
 * @author: Bernhard Lukassen
 */

export const RESPONSE_STATI = {
    init:   'init',
    busy:   'busy',
    done:   'done',
    warn:   'warn',
    error:  'error'
};

export default class Response {

    constructor({
                    payload,
                    meta =  {},
                    status =    RESPONSE_STATI.init
                } = {}) {
        Object.assign(this, { payload, meta, status });
    }

    get isInit() {
        return this.status === RESPONSE_STATI.init;
    }

    get isBusy() {
        return this.status === RESPONSE_STATI.busy;
    }

    busy() {
        this.status = RESPONSE_STATI.busy;
        return this;
    }

    get isWarn() {
        return this.status === RESPONSE_STATI.warn;
    }

    warning(warn) {
        this.warn = warn;
        this.status = RESPONSE_STATI.warn;
        return this;
    }

    get isError() {
        return this.status === RESPONSE_STATI.error;
    }

    error(err) {
        this.err = err;
        this.status = RESPONSE_STATI.error;
        return this;
    }

    get isDone() {
        return this.status === RESPONSE_STATI.done;
    }

    done() {
        this.status = RESPONSE_STATI.done;
        return this;
    }
}
