<script setup lang="ts">
import { computed } from 'vue';

import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { YearPickerPopup, YearPickerRoot, YearPickerTrigger, provideYearPickerUi } from '@soybeanjs/headless/year-picker';

import { mergeSlotVariants } from '@/theme';

import Icon from '../icon/icon.vue';

import type { YearPickerEmits, YearPickerProps, YearPickerSlots } from './types';
import { yearPickerVariants } from './variants';

defineOptions({
  name: 'SYearPicker'
});

const props = defineProps<YearPickerProps>();

const emit = defineEmits<YearPickerEmits>();

defineSlots<YearPickerSlots>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'triggerProps', 'popupProps']);

const ui = computed(() => {
  const variants = yearPickerVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideYearPickerUi(ui);
</script>

<template>
  <YearPickerRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <YearPickerTrigger v-bind="triggerProps">
      <slot name="trigger" :display-value="slotProps.displayValue" :model-value="slotProps.modelValue" :open="slotProps.open">
        <Icon class="size-4" icon="lucide:calendar" />
        <span v-if="slotProps.displayValue">{{ slotProps.displayValue }}</span>
        <span v-else class="text-muted-foreground">Pick a year</span>
      </slot>
    </YearPickerTrigger>
    <YearPickerPopup v-bind="popupProps">
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
    </YearPickerPopup>
    <slot v-bind="slotProps" />
  </YearPickerRoot>
</template>
