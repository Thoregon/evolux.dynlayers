/**
 *
 *
 * @author: Bernhard Lukassen
 */

import { myevolux }     from '/evolux.universe';
import Layers           from './lib/layers.mjs';

//**** now define all standard exports
export { default as Layers }    from './lib/layers.mjs';
export { default as Step }      from './lib/routing/step.mjs';
export { default as Parallel }  from './lib/routing/parallel.mjs';
export { default as Switch }    from './lib/routing/switch.mjs';

export const service = {
    install() {
        console.log('** layers install()');
        const layers = new Layers();
        myevolux().layers = layers;
    },

    uninstall() {
        console.log('** layers uninstall()');
        const layers = myevolux().layers;
        delete myevolux().layers;
    },

    resolve() {
        console.log('** layers resolve()');
        // nothing to do
    },

    start() {
        console.log('** layers start()');
        const layers = myevolux().layers;
        layers.init();
    },

    stop() {
        console.log('** layers stop()');
        const layers = myevolux().layers;
        layers.exit();
    },

    update() {
        console.log('** layers update()');
    }
};
