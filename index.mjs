/**
 *
 *
 * @author: Bernhard Lukassen
 */

import { myuniverse, myevolux } from '/evolux.universe';
import Layers                   from './lib/layers.mjs';

//**** now define all standard exports
export { default as Layers }    from './lib/layers.mjs';
export { default as Step }      from './lib/routing/step.mjs';
export { default as Parallel }  from './lib/routing/parallel.mjs';
export { default as Switch }    from './lib/routing/switch.mjs';

export const service = {
    install() {
        myuniverse().logger.debug('** layers install()');
        const layers = new Layers();
        myevolux().layers = layers;
    },

    uninstall() {
        myuniverse().logger.debug('** layers uninstall()');
        const layers = myevolux().layers;
        delete myevolux().layers;
    },

    resolve() {
        myuniverse().logger.debug('** layers resolve()');
        // nothing to do
    },

    start() {
        myuniverse().logger.debug('** layers start()');
        const layers = myevolux().layers;
        layers.init();
    },

    stop() {
        myuniverse().logger.debug('** layers stop()');
        const layers = myevolux().layers;
        layers.exit();
    },

    update() {
        myuniverse().logger.debug('** layers update()');
    }
};
