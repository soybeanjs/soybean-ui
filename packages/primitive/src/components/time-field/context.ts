import { createContext } from '../../composables';
import type { TimeFieldRootContext } from './types';

export const [provideTimeFieldRootContext, injectTimeFieldRootContext] =
  createContext<TimeFieldRootContext>('TimeFieldRoot');
