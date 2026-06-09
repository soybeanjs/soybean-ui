<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { DateRangePickerCompact, provideDateRangePickerUi } from '@soybeanjs/headless/date-range-picker';
import { dateRangePickerVariants } from '@/styles/date-range-picker';
import CalendarRange from '../calendar-range/calendar-range.vue';
import type { DateRangePickerProps, DateRangePickerEmits } from './types.js';

defineOptions({
  name: 'SDateRangePicker'
});

const props = withDefaults(defineProps<DateRangePickerProps>(), {
  open: undefined
});

const emit = defineEmits<DateRangePickerEmits>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const ui = computed(() => dateRangePickerVariants({ size: props.size }, props.ui, { root: props.class }));

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
