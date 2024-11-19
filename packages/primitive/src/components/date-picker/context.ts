import { createContext } from '../../composables';
import type { DatePickerRootContext } from './types';

export const [provideDatePickerRootContext, injectDatePickerRootContext] =
  createContext<DatePickerRootContext>('DatePickerRoot');
