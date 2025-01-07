import { createContext } from '../../composables';
import type { PinInputRootContext } from './types';

export const [providePinInputRootContext, injectPinInputRootContext] =
  createContext<PinInputRootContext>('PinInputRoot');
