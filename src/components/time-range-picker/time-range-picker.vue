<script setup lang="ts">
import { computed } from 'vue';

import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { TimeRangePickerCompact, provideTimeRangePickerUi } from '@soybeanjs/headless/time-range-picker';

import { mergeSlotVariants } from '@/theme';

import Icon from '../icon/icon.vue';

import type { TimeRangePickerEmits, TimeRangePickerProps, TimeRangePickerSlots } from './types';
import { timeRangePickerVariants } from './variants';

defineOptions({
  name: 'STimeRangePicker'
});

const props = defineProps<TimeRangePickerProps>();

const emit = defineEmits<TimeRangePickerEmits>();

defineSlots<TimeRangePickerSlots>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'triggerProps', 'popupProps']);

const ui = computed(() => {
  const variants = timeRangePickerVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideTimeRangePickerUi(ui);
</script>

<template>
  <TimeRangePickerCompact
    v-bind="{
      ...forwardedProps,
      triggerProps,
      popupProps
    }"
    v-on="listeners"
  >
    <template #trigger="slotProps">
      <slot name="trigger" v-bind="slotProps">
        <Icon class="size-4" icon="lucide:clock-3" />
        <span v-if="slotProps.displayValue">{{ slotProps.displayValue }}</span>
        <span v-else class="text-muted-foreground">Pick a time range</span>
      </slot>
    </template>
    <template #time="slotProps">
      <slot name="time" v-bind="slotProps">
        {{ slotProps.label }}
      </slot>
    </template>
    <template #default="slotProps">
      <slot v-bind="slotProps" />
    </template>
  </TimeRangePickerCompact>
</template>
