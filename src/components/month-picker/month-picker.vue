<script setup lang="ts">
import { computed } from 'vue';

import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { MonthPickerPopup, MonthPickerRoot, MonthPickerTrigger, provideMonthPickerUi } from '@soybeanjs/headless/month-picker';

import { mergeSlotVariants } from '@/theme';

import Icon from '../icon/icon.vue';

import { monthPickerVariants } from './variants';
import type { MonthPickerEmits, MonthPickerProps, MonthPickerSlots } from './types';

defineOptions({
  name: 'SMonthPicker'
});

const props = defineProps<MonthPickerProps>();

const emit = defineEmits<MonthPickerEmits>();

defineSlots<MonthPickerSlots>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'triggerProps', 'popupProps']);

const ui = computed(() => {
  const variants = monthPickerVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideMonthPickerUi(ui);
</script>

<template>
  <MonthPickerRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <MonthPickerTrigger v-bind="triggerProps">
      <slot name="trigger" :display-value="slotProps.displayValue" :model-value="slotProps.modelValue" :open="slotProps.open">
        <Icon class="size-4" icon="lucide:calendar-range" />
        <span v-if="slotProps.displayValue">{{ slotProps.displayValue }}</span>
        <span v-else class="text-muted-foreground">Pick a month</span>
      </slot>
    </MonthPickerTrigger>
    <MonthPickerPopup v-bind="popupProps">
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
    </MonthPickerPopup>
    <slot v-bind="slotProps" />
  </MonthPickerRoot>
</template>
