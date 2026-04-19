<script setup lang="ts">
import { computed } from 'vue';

import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { YearRangePickerPopup, YearRangePickerRoot, YearRangePickerTrigger, provideYearRangePickerUi } from '@soybeanjs/headless/year-range-picker';

import { mergeSlotVariants } from '@/theme';

import Icon from '../icon/icon.vue';

import type { YearRangePickerEmits, YearRangePickerProps, YearRangePickerSlots } from './types';
import { yearRangePickerVariants } from './variants';

defineOptions({
  name: 'SYearRangePicker'
});

const props = defineProps<YearRangePickerProps>();

const emit = defineEmits<YearRangePickerEmits>();

defineSlots<YearRangePickerSlots>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'triggerProps', 'popupProps']);

const ui = computed(() => {
  const variants = yearRangePickerVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideYearRangePickerUi(ui);
</script>

<template>
  <YearRangePickerRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <YearRangePickerTrigger v-bind="triggerProps">
      <slot name="trigger" :display-value="slotProps.displayValue" :model-value="slotProps.modelValue" :open="slotProps.open">
        <Icon class="size-4" icon="lucide:calendar-range" />
        <span v-if="slotProps.displayValue">{{ slotProps.displayValue }}</span>
        <span v-else class="text-muted-foreground">Pick a year range</span>
      </slot>
    </YearRangePickerTrigger>
    <YearRangePickerPopup v-bind="popupProps">
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
      <template #year="popupSlotProps">
        <slot name="year" v-bind="popupSlotProps">
          {{ popupSlotProps.label }}
        </slot>
      </template>
    </YearRangePickerPopup>
    <slot v-bind="slotProps" />
  </YearRangePickerRoot>
</template>
