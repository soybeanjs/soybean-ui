<script setup lang="ts">
import { computed } from 'vue';

import { DateRangePickerPopup, DateRangePickerRoot, DateRangePickerTrigger, provideDateRangePickerUi } from '@soybeanjs/headless/date-range-picker';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';

import { mergeSlotVariants } from '@/theme';

import Icon from '../icon/icon.vue';

import { dateRangePickerVariants } from './variants';
import type { DateRangePickerEmits, DateRangePickerProps, DateRangePickerSlots } from './types';

defineOptions({
  name: 'SDateRangePicker'
});

const props = defineProps<DateRangePickerProps>();

const emit = defineEmits<DateRangePickerEmits>();

defineSlots<DateRangePickerSlots>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'triggerProps', 'popupProps']);

const ui = computed(() => {
  const variants = dateRangePickerVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideDateRangePickerUi(ui);

const formatDateRange = (range: { start?: any; end?: any }) => {
  if (range.start && range.end) {
    return `${range.start.toString()} – ${range.end.toString()}`;
  } else if (range.start) {
    return `${range.start.toString()} – ...`;
  }
  return undefined;
};
</script>

<template>
  <DateRangePickerRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <DateRangePickerTrigger v-bind="triggerProps">
      <slot name="trigger" :open="slotProps.open">
        <Icon class="size-4" icon="lucide:calendar" />
        <span v-if="formatDateRange(slotProps.modelValue)">{{ formatDateRange(slotProps.modelValue) }}</span>
        <span v-else class="text-muted-foreground">Pick a date range</span>
      </slot>
    </DateRangePickerTrigger>
    <DateRangePickerPopup v-bind="popupProps">
      <slot name="calendar" :model-value="slotProps.modelValue">
        <div :class="ui.calendar" data-slot="calendar">
          {{ formatDateRange(slotProps.modelValue) ?? 'Pick a start and end date' }}
        </div>
      </slot>
    </DateRangePickerPopup>
    <slot v-bind="slotProps" />
  </DateRangePickerRoot>
</template>
