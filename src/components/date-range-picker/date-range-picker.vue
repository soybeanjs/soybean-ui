<script setup lang="ts">
import { computed } from 'vue';
import { DateRangePickerCompact, provideDateRangePickerUi } from '@soybeanjs/headless/date-range-picker';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeVariants } from '@/theme';
import CalendarRange from '../calendar-range/calendar-range.vue';
import { dateFieldVariants } from '../date-field/variants';
import { dateRangeFieldVariants } from '../date-range-field/variants';
import { datePickerVariants } from '../date-picker/variants';
import type { DateRangePickerEmits, DateRangePickerProps } from './types';

defineOptions({
  name: 'SDateRangePicker'
});

const props = withDefaults(defineProps<DateRangePickerProps>(), {
  open: undefined
});

const emit = defineEmits<DateRangePickerEmits>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = datePickerVariants({ size: props.size });
  const dateRangeField = dateRangeFieldVariants({ size: props.size });
  const dateField = dateFieldVariants({ size: props.size });

  return mergeVariants(Object.assign(variants, dateRangeField, dateField), props.ui, { root: props.class });
});

provideDateRangePickerUi(ui);
</script>

<template>
  <DateRangePickerCompact
    v-slot="{ calendarRangeProps, close, onUpdateModelValue, onUpdatePlaceholder }"
    v-bind="forwardedProps"
    v-on="listeners"
  >
    <CalendarRange
      v-bind="calendarRangeProps"
      :size="size"
      :ui="calendarRangeUi"
      @update:model-value="
        value => {
          onUpdateModelValue(value);
          if (value.start && value.end) {
            close();
          }
        }
      "
      @update:placeholder="onUpdatePlaceholder"
    />
  </DateRangePickerCompact>
</template>
