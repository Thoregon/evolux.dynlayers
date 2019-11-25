/**
 * defines all errors used in dyncomponents
 *
 * @author: blukassen
 */
import { EError } from '/evolux.supervise';

export const ErrNotImplemented          = (msg)         => new EError(`Not implemented: ${msg}`, "DYLY:00001");
export const ErrIrregularLayer          = (msg, cause)  => new EError(`Layer irregular, can't be inserted: ${msg}`, "DYLY:00002", cause);

