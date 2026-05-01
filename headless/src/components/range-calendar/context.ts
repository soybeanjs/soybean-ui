import { useContext, useUiContext } from '../../composables';
import type { RangeCalendarRootContext, RangeCalendarUiSlot } from './types';

export const [provideRangeCalendarRootContext, useRangeCalendarRootContext] =
  useContext<RangeCalendarRootContext>('RangeCalendarRoot');
export const [provideRangeCalendarUi, useRangeCalendarUi] = useUiContext<RangeCalendarUiSlot>('RangeCalendarUi');
