<script setup lang="ts">
import { computed } from 'vue';
import { DatePickerCompact, provideDatePickerUi } from '@soybeanjs/headless/date-picker';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeVariants } from '@/theme';
import Calendar from '../calendar/calendar.vue';
import { dateFieldVariants } from '../date-field/variants';
import { datePickerVariants } from './variants';
import type { DatePickerEmits, DatePickerProps } from './types';

defineOptions({
  name: 'SDatePicker'
});

const props = withDefaults(defineProps<DatePickerProps>(), {
  open: undefined
});

const emit = defineEmits<DatePickerEmits>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = datePickerVariants({ size: props.size });
  const dateField = dateFieldVariants({ size: props.size });

  return mergeVariants(Object.assign(variants, dateField), props.ui, { root: props.class });
});

provideDatePickerUi(ui);
</script>

<template>
  <DatePickerCompact
    v-slot="{ calendarProps, close, onUpdateModelValue, onUpdatePlaceholder }"
    v-bind="forwardedProps"
    v-on="listeners"
  >
    <Calendar
      v-bind="calendarProps"
      :size="size"
      :ui="calendarUi"
      @update:model-value="
        value => {
          onUpdateModelValue(value);
          close();
        }
      "
      @update:placeholder="onUpdatePlaceholder"
    />
  </DatePickerCompact>
</template>
