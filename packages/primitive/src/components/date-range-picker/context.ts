import { createContext } from '../../composables';
import type { DateRangePickerRootContext } from './types';

export const [provideDateRangePickerRootContext, injectDateRangePickerRootContext] =
  createContext<DateRangePickerRootContext>('DateRangePickerRoot');
