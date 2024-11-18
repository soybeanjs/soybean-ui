import { useContext } from '../../composables';
import type { CalendarRootContext } from './types';

export const [provideCalendarRootContext, injectCalendarRootContext] = useContext(
  'CalendarRoot',
  (params: CalendarRootContext) => params
);
