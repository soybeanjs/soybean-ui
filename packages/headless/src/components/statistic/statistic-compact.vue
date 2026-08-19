<script setup lang="ts">
import { useSlots } from 'vue';
import { useOmitProps } from '../../composables';
import Icon from '../_icon/icon.vue';
import StatisticLabel from './statistic-label.vue';
import StatisticPrefix from './statistic-prefix.vue';
import StatisticRoot from './statistic-root.vue';
import StatisticSuffix from './statistic-suffix.vue';
import StatisticValueRow from './statistic-value-row.vue';
import StatisticValue from './statistic-value.vue';
import type { StatisticCompactProps, StatisticCompactSlots } from './types';

defineOptions({
  name: 'StatisticCompact'
});

const props = withDefaults(defineProps<StatisticCompactProps>(), {
  value: 0,
  groupSeparator: ',',
  decimalSeparator: '.'
});

defineSlots<StatisticCompactSlots>();

const slots = useSlots();

const forwardedProps = useOmitProps(props, [
  'label',
  'prefix',
  'suffix',
  'labelProps',
  'valueRowProps',
  'valueProps',
  'prefixProps',
  'suffixProps'
]);
</script>

<template>
  <StatisticRoot v-bind="forwardedProps">
    <StatisticLabel v-if="slots.label || label" v-bind="labelProps">
      <slot name="label">{{ label }}</slot>
    </StatisticLabel>
    <StatisticValueRow v-bind="valueRowProps">
      <StatisticPrefix v-if="slots.prefix || prefix || trend" v-bind="prefixProps">
        <slot name="prefix">
          <Icon v-if="!prefix" :icon="trend === 'down' ? 'lucide:trending-down' : 'lucide:trending-up'" />
          <template v-else>{{ prefix }}</template>
        </slot>
      </StatisticPrefix>
      <StatisticValue v-bind="valueProps">
        <slot name="value" />
      </StatisticValue>
      <StatisticSuffix v-if="slots.suffix || suffix" v-bind="suffixProps">
        <slot name="suffix">{{ suffix }}</slot>
      </StatisticSuffix>
    </StatisticValueRow>
    <slot />
  </StatisticRoot>
</template>
