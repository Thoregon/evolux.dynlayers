/**
 * defines all errors used in dyncomponents
 *
 * @author: blukassen
 */
import { EError } from '/evolux.supervise';

export const ErrNotImplemented          = (msg)         => new EError(`Not implemented: ${msg}`, "DYLY:00001");
export const ErrLayerStackExists        = (msg)         => new EError(`Layer Stack already registered: ${msg}`, "DYLY:00002");
export const ErrIrregularLayer          = (msg, cause)  => new EError(`Layer irregular, can't be inserted: ${msg}`, "DYLY:00003", cause);
export const ErrLayerStackNotFound      = (msg)         => new EError(`Layer Stack not found: ${msg}`, "DYLY:00004");

