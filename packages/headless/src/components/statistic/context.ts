import { useContext, useUiContext } from '../../composables';
import type { StatisticRootContext, StatisticUiSlot } from './types';

export const [provideStatisticRootContext, useStatisticRootContext] = useContext(
  'StatisticRoot',
  (context: StatisticRootContext) => context
);

export const [provideStatisticUi, useStatisticUi] = useUiContext<StatisticUiSlot>('StatisticUi');
