export { default as StatisticRoot } from './statistic-root.vue';
export { default as StatisticLabel } from './statistic-label.vue';
export { default as StatisticValueRow } from './statistic-value-row.vue';
export { default as StatisticValue } from './statistic-value.vue';
export { default as StatisticPrefix } from './statistic-prefix.vue';
export { default as StatisticSuffix } from './statistic-suffix.vue';
export { default as StatisticCompact } from './statistic-compact.vue';

export { provideStatisticUi } from './context';

export type {
  StatisticTrend,
  StatisticRootProps,
  StatisticRootEmits,
  StatisticLabelProps,
  StatisticValueRowProps,
  StatisticValueProps,
  StatisticPrefixProps,
  StatisticSuffixProps,
  StatisticRootContext,
  StatisticUiSlot,
  StatisticUi,
  StatisticCompactProps,
  StatisticCompactEmits,
  StatisticCompactSlots
} from './types';
