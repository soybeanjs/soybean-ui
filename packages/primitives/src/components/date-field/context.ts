import { createContext } from '../../composables';
import type { DateFieldRootContext } from './types';

export const [provideDateFieldRootContext, injectDateFieldRootContext] =
  createContext<DateFieldRootContext>('DateFieldRoot');
