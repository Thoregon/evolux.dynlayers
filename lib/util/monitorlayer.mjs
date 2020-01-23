/**
 *
 *
 * @author: Bernhard Lukassen
 */

import { myuniverse }   from "/evolux.universe";
import Layer            from "../routing/layer.mjs";

const logger = myuniverse().logger;

export default class MonitorLayer extends Layer {

    constructor(name) {
        super(name);
    }


    get name() {
        return this._name;
    }

    async send(request, response) {
        logger.info(this.name, 'send    -->', `request: ${JSON.stringify(request)}`, `request: ${JSON.stringify(response)}`);
        super.send(request, response);
    }

    async receive(request, response) {
        logger.info(this.name, 'receive -->', `request: ${JSON.stringify(request)}`, `request: ${JSON.stringify(response)}`);
        super.receive(request, response);
    }

/*
    insert(layer) {
        logger.info(this.name, 'insert before', layer.name ? layer.name : layer.toString());
        super.insert(layer);
    }

    remove() {
        logger.info(this.name, 'remove');
        super.remove();
    }

    init() {
        super.init();
    }

    exit() {
        super.exit();
    }
*/
}
