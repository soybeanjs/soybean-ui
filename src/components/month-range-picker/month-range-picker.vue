<script setup lang="ts">
import { computed } from 'vue';

import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { MonthRangePickerPopup, MonthRangePickerRoot, MonthRangePickerTrigger, provideMonthRangePickerUi } from '@soybeanjs/headless/month-range-picker';

import { mergeSlotVariants } from '@/theme';

import Icon from '../icon/icon.vue';

import type { MonthRangePickerEmits, MonthRangePickerProps, MonthRangePickerSlots } from './types';
import { monthRangePickerVariants } from './variants';

defineOptions({
  name: 'SMonthRangePicker'
});

const props = defineProps<MonthRangePickerProps>();

const emit = defineEmits<MonthRangePickerEmits>();

defineSlots<MonthRangePickerSlots>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'triggerProps', 'popupProps']);

const ui = computed(() => {
  const variants = monthRangePickerVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideMonthRangePickerUi(ui);
</script>

<template>
  <MonthRangePickerRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <MonthRangePickerTrigger v-bind="triggerProps">
      <slot name="trigger" :display-value="slotProps.displayValue" :model-value="slotProps.modelValue" :open="slotProps.open">
        <Icon class="size-4" icon="lucide:calendar-range" />
        <span v-if="slotProps.displayValue">{{ slotProps.displayValue }}</span>
        <span v-else class="text-muted-foreground">Pick a month range</span>
      </slot>
    </MonthRangePickerTrigger>
    <MonthRangePickerPopup v-bind="popupProps">
      <template #heading="popupSlotProps">
        <slot name="heading" v-bind="popupSlotProps">
          {{ popupSlotProps.headingValue }}
        </slot>
      </template>
      <template #prev="popupSlotProps">
        <slot name="prev" v-bind="popupSlotProps">
          <Icon class="size-4 rtl:rotate-180" icon="lucide:chevron-left" />
        </slot>
      </template>
      <template #next="popupSlotProps">
        <slot name="next" v-bind="popupSlotProps">
          <Icon class="size-4 rtl:rotate-180" icon="lucide:chevron-right" />
        </slot>
      </template>
      <template #month="popupSlotProps">
        <slot name="month" v-bind="popupSlotProps">
          {{ popupSlotProps.label }}
        </slot>
      </template>
    </MonthRangePickerPopup>
    <slot v-bind="slotProps" />
  </MonthRangePickerRoot>
</template>
