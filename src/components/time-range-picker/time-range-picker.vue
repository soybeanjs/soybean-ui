<script setup lang="ts">
import { computed } from 'vue';

import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { TimeRangePickerPopup, TimeRangePickerRoot, TimeRangePickerTrigger, provideTimeRangePickerUi } from '@soybeanjs/headless/time-range-picker';

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
  <TimeRangePickerRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <TimeRangePickerTrigger v-bind="triggerProps">
      <slot name="trigger" :display-value="slotProps.displayValue" :model-value="slotProps.modelValue" :open="slotProps.open">
        <Icon class="size-4" icon="lucide:clock-3" />
        <span v-if="slotProps.displayValue">{{ slotProps.displayValue }}</span>
        <span v-else class="text-muted-foreground">Pick a time range</span>
      </slot>
    </TimeRangePickerTrigger>
    <TimeRangePickerPopup v-bind="popupProps">
      <template #time="popupSlotProps">
        <slot name="time" v-bind="popupSlotProps">
          {{ popupSlotProps.label }}
        </slot>
      </template>
    </TimeRangePickerPopup>
    <slot v-bind="slotProps" />
  </TimeRangePickerRoot>
</template>
