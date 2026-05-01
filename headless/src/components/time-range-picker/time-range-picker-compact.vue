<script setup lang="ts">
import { useForwardListeners, useOmitProps } from '../../composables';
import TimeRangePickerRoot from './time-range-picker-root.vue';
import TimeRangePickerTrigger from './time-range-picker-trigger.vue';
import TimeRangePickerPopup from './time-range-picker-popup.vue';
import type { TimeRangePickerCompactEmits, TimeRangePickerCompactProps, TimeRangePickerCompactSlots } from './types';

defineOptions({
  name: 'TimeRangePickerCompact'
});

const props = defineProps<TimeRangePickerCompactProps>();

const emit = defineEmits<TimeRangePickerCompactEmits>();

defineSlots<TimeRangePickerCompactSlots>();

const forwardedProps = useOmitProps(props, ['triggerProps', 'popupProps']);

const listeners = useForwardListeners(emit);
</script>

<template>
  <TimeRangePickerRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <TimeRangePickerTrigger v-bind="triggerProps">
      <slot name="trigger" :display-value="slotProps.displayValue" :model-value="slotProps.modelValue" :open="slotProps.open" />
    </TimeRangePickerTrigger>
    <TimeRangePickerPopup v-bind="popupProps">
      <template #time="popupSlotProps">
        <slot name="time" v-bind="popupSlotProps" />
      </template>
    </TimeRangePickerPopup>
    <slot v-bind="slotProps" />
  </TimeRangePickerRoot>
</template>
