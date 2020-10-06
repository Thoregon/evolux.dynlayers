/**
 *
 *
 * @author: Bernhard Lukassen
 */

import { tservices }            from '/evolux.universe';
import Layers                   from './lib/layers.mjs';

// **** now define all standard exports
export { default as Layer }         from './lib/routing/layer.mjs';
export { default as Step }          from './lib/routing/step.mjs';
export { default as Parallel }      from './lib/routing/parallel.mjs';
export { default as Switch }        from './lib/routing/switch.mjs';

// **** simple monitoring layer implementation
export { default as MonitorLayer }  from './lib/util/monitorlayer.mjs';

// ****
// export { default as Request }                   from './lib/request.mjs';
// export { default as Response, RESPONSE_STATI }  from './lib/response.mjs';

export const service = {
    install() {
        universe.logger.debug('** layers install()');
        const layers = new Layers();
        tservices().layers = layers;
    },

    uninstall() {
        universe.logger.debug('** layers uninstall()');
        const layers = tservices().layers;
        delete tservices().layers;
    },

    resolve() {
        universe.logger.debug('** layers resolve()');
        // nothing to do
    },

    start() {
        universe.logger.debug('** layers start()');
        const layers = tservices().layers;
        layers.init();
    },

    stop() {
        universe.logger.debug('** layers stop()');
        const layers = tservices().layers;
        layers.exit();
    },

    update() {
        universe.logger.debug('** layers update()');
    }
};
