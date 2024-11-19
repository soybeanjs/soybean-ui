import { createContext } from '../../composables';
import type { RangeCalendarRootContext } from './types';

export const [provideRangeCalendarRootContext, injectRangeCalendarRootContext] =
  createContext<RangeCalendarRootContext>('RangeCalendarRoot');
