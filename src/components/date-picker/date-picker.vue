<script setup lang="ts">
import { computed } from 'vue';
import { DatePickerCompact, provideDatePickerUi } from '@soybeanjs/headless/date-picker';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { datePickerVariants } from '@/styles/date-picker';
import Calendar from '../calendar/calendar.vue';
import type { DatePickerProps, DatePickerEmits } from './types';

defineOptions({
  name: 'SDatePicker'
});

const props = withDefaults(defineProps<DatePickerProps>(), {
  open: undefined
});

const emit = defineEmits<DatePickerEmits>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const ui = computed(() => datePickerVariants({ size: props.size }, props.ui, { root: props.class }));

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
