<script setup lang="ts">
import { computed } from 'vue';
import { chartTooltipContentVariants } from '../../styles/chart-tooltip-content';
import type { ChartTooltipContentProps } from './types';

defineOptions({
  name: 'SChartTooltipContent'
});

const props = withDefaults(defineProps<ChartTooltipContentProps>(), {
  payload: () => ({}),
  config: () => ({}),
  indicator: 'dot'
});

function toDisplayValue(value: unknown): number | string | Date {
  if (value instanceof Date || typeof value === 'number') {
    return value;
  }

  return String(value);
}

const fill = computed(() => (typeof props.payload.fill === 'string' ? props.payload.fill : undefined));

const payload = computed(() =>
  Object.entries(props.payload)
    .map(([key, value]) => {
      const itemConfig = props.config[key];
      const indicatorColor = itemConfig?.color ?? fill.value;

      return { key, value: toDisplayValue(value), itemConfig, indicatorColor };
    })
    .filter(item => item.itemConfig)
);

const nestLabel = computed(() => Object.keys(props.payload).length === 1 && props.indicator !== 'dot');

const tooltipLabel = computed(() => {
  if (props.hideLabel) {
    return undefined;
  }

  if (props.labelFormatter && props.x !== undefined) {
    return props.labelFormatter(props.x);
  }

  if (props.labelKey) {
    return props.config[props.labelKey]?.label ?? props.payload[props.labelKey];
  }

  return props.x;
});

const ui = computed(() =>
  chartTooltipContentVariants(
    { indicator: props.indicator, nestLabel: nestLabel.value },
    undefined,
    { root: props.class }
  )
);
</script>

<template>
  <div :class="ui.root">
    <slot>
      <div v-if="!nestLabel && tooltipLabel" :class="ui.label">
        {{ tooltipLabel }}
      </div>
      <div :class="ui.items">
        <div v-for="{ key, value, itemConfig, indicatorColor } in payload" :key="key" :class="ui.item">
          <component :is="itemConfig.icon" v-if="itemConfig?.icon" />
          <template v-else-if="!hideIndicator">
            <div
              :class="ui.indicator"
              :style="{ '--color-bg': indicatorColor, '--color-border': indicatorColor }"
            />
          </template>
          <div :class="ui.itemContent">
            <div :class="ui.itemLabelWrap">
              <div v-if="nestLabel" :class="ui.itemTitle">{{ tooltipLabel }}</div>
              <span :class="ui.itemLabel">{{ itemConfig?.label || value }}</span>
            </div>
            <span v-if="value" :class="ui.itemValue">{{ value.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>
