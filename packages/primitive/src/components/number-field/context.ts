import { createContext } from '../../composables';
import type { NumberFieldRootContext } from './types';

export const [provideNumberFieldRootContext, injectNumberFieldRootContext] =
  createContext<NumberFieldRootContext>('NumberFieldRoot');
