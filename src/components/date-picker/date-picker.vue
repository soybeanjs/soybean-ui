<script setup lang="ts">
import { computed } from 'vue';

import { DatePickerPopup, DatePickerRoot, DatePickerTrigger, provideDatePickerUi } from '@soybeanjs/headless/date-picker';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';

import { mergeSlotVariants } from '@/theme';

import Icon from '../icon/icon.vue';
import SCalendar from '../calendar/calendar.vue';

import { datePickerVariants } from './variants';
import type { DatePickerEmits, DatePickerProps, DatePickerSlots } from './types';

defineOptions({
  name: 'SDatePicker'
});

const props = defineProps<DatePickerProps>();

const emit = defineEmits<DatePickerEmits>();

defineSlots<DatePickerSlots>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'triggerProps', 'popupProps']);

const ui = computed(() => {
  const variants = datePickerVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideDatePickerUi(ui);
</script>

<template>
  <DatePickerRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <DatePickerTrigger v-bind="triggerProps">
      <slot name="trigger" :open="slotProps.open">
        <Icon class="size-4" icon="lucide:calendar" />
        <span v-if="slotProps.modelValue">{{ slotProps.modelValue.toString() }}</span>
        <span v-else class="text-muted-foreground">Pick a date</span>
      </slot>
    </DatePickerTrigger>
    <DatePickerPopup v-bind="popupProps">
      <SCalendar
        :model-value="slotProps.modelValue"
        :placeholder="forwardedProps.placeholder"
        :locale="forwardedProps.locale"
        :dir="forwardedProps.dir"
        :disabled="forwardedProps.disabled"
        :readonly="forwardedProps.readonly"
        :min-value="forwardedProps.minValue"
        :max-value="forwardedProps.maxValue"
        :is-date-unavailable="forwardedProps.isDateUnavailable"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </DatePickerPopup>
    <slot v-bind="slotProps" />
  </DatePickerRoot>
</template>
