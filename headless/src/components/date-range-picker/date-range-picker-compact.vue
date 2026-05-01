<script setup lang="ts">
import { useForwardListeners, useOmitProps } from '../../composables';
import DateRangePickerRoot from './date-range-picker-root.vue';
import DateRangePickerTrigger from './date-range-picker-trigger.vue';
import DateRangePickerPopup from './date-range-picker-popup.vue';
import type { DateRangePickerCompactEmits, DateRangePickerCompactProps, DateRangePickerCompactSlots } from './types';

defineOptions({
  name: 'DateRangePickerCompact'
});

const props = defineProps<DateRangePickerCompactProps>();

const emit = defineEmits<DateRangePickerCompactEmits>();

defineSlots<DateRangePickerCompactSlots>();

const forwardedProps = useOmitProps(props, ['triggerProps', 'popupProps']);

const listeners = useForwardListeners(emit);
</script>

<template>
  <DateRangePickerRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <DateRangePickerTrigger v-bind="triggerProps">
      <slot name="trigger" :open="slotProps.open" :model-value="slotProps.modelValue" />
    </DateRangePickerTrigger>
    <DateRangePickerPopup v-bind="popupProps">
      <slot
        name="calendar"
        :model-value="slotProps.modelValue"
        :placeholder="slotProps.placeholder"
        :set-range="slotProps.setRange"
        :set-placeholder="slotProps.setPlaceholder"
      />
    </DateRangePickerPopup>
    <slot v-bind="slotProps" />
  </DateRangePickerRoot>
</template>
