/**
 *
 *
 * @author: Bernhard Lukassen
 */

import { myuniverse, tservices } from '/evolux.universe';
import Layers                   from './lib/layers.mjs';

//**** now define all standard exports
export { default as Layer }         from './lib/routing/layer.mjs';
export { default as Step }          from './lib/routing/step.mjs';
export { default as Parallel }      from './lib/routing/parallel.mjs';
export { default as Switch }        from './lib/routing/switch.mjs';

export { default as MonitorLayer }  from './lib/util/monitorlayer.mjs';

export const service = {
    install() {
        myuniverse().logger.debug('** layers install()');
        const layers = new Layers();
        tservices().layers = layers;
    },

    uninstall() {
        myuniverse().logger.debug('** layers uninstall()');
        const layers = tservices().layers;
        delete tservices().layers;
    },

    resolve() {
        myuniverse().logger.debug('** layers resolve()');
        // nothing to do
    },

    start() {
        myuniverse().logger.debug('** layers start()');
        const layers = tservices().layers;
        layers.init();
    },

    stop() {
        myuniverse().logger.debug('** layers stop()');
        const layers = tservices().layers;
        layers.exit();
    },

    update() {
        myuniverse().logger.debug('** layers update()');
    }
};
