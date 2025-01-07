import { createContext } from '../../composables';
import type { DateRangeFieldRootContext } from './types';

export const [provideDateRangeFieldRootContext, injectDateRangeFieldRootContext] =
  createContext<DateRangeFieldRootContext>('DateRangeFieldRoot');
