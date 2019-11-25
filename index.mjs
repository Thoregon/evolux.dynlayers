/**
 *
 *
 * @author: Bernhard Lukassen
 */

import { myevolux }     from '/evolux.universe';

//**** now define all standard exports

export { default as Layer }        from './lib/layer.js';

export const service = {
    install() {
        console.log('** layers install()');
        // myevolux().layers = new ();
    },

    uninstall() {
        console.log('** layers uninstall()');
        // delete myevolux().matter;
    },

    resolve() {
        console.log('** layers resolve()');
        // nothing to do
    },

    start() {
        console.log('** layers start()');
        // myevolux().matter;
    },

    stop() {
        console.log('** layers stop()');
        // myevolux().matter;
    },

    update() {
        console.log('** layers update()');
    }
};
