<script setup lang="ts">
import { computed } from 'vue';
import { DatePickerCompact, provideDatePickerUi } from '@soybeanjs/headless/date-picker';
import { useForwardListeners, useOmitProps, usePickProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import SCalendar from '../calendar/calendar.vue';
import { datePickerVariants } from './variants';
import type { DatePickerEmits, DatePickerProps, DatePickerSlots } from './types';

defineOptions({
  name: 'SDatePicker'
});

const props = withDefaults(defineProps<DatePickerProps>(), {
  open: undefined
});

const emit = defineEmits<DatePickerEmits>();

defineSlots<DatePickerSlots>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const calendarProps = usePickProps(props, [
  'locale',
  'dir',
  'disabled',
  'readonly',
  'minValue',
  'maxValue',
  'isDateUnavailable'
]);

const ui = computed(() => {
  const variants = datePickerVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideDatePickerUi(ui);
</script>

<template>
  <DatePickerCompact v-bind="forwardedProps" v-on="listeners">
    <template #trigger="slotProps">
      <slot name="trigger" v-bind="slotProps" />
    </template>
    <template #default="slotProps">
      <SCalendar
        v-bind="calendarProps"
        :size="size"
        :model-value="slotProps.modelValue"
        :placeholder="slotProps.placeholder"
        data-slot="calendar"
        @update:model-value="slotProps.setDate"
        @update:placeholder="slotProps.setPlaceholder"
      />
    </template>
  </DatePickerCompact>
</template>
