<script setup lang="ts">
import { computed } from 'vue';

import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { TimePickerPopup, TimePickerRoot, TimePickerTrigger, provideTimePickerUi } from '@soybeanjs/headless/time-picker';

import { mergeSlotVariants } from '@/theme';

import Icon from '../icon/icon.vue';

import type { TimePickerEmits, TimePickerProps, TimePickerSlots } from './types';
import { timePickerVariants } from './variants';

defineOptions({
  name: 'STimePicker'
});

const props = defineProps<TimePickerProps>();

const emit = defineEmits<TimePickerEmits>();

defineSlots<TimePickerSlots>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'triggerProps', 'popupProps']);

const ui = computed(() => {
  const variants = timePickerVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideTimePickerUi(ui);
</script>

<template>
  <TimePickerRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <TimePickerTrigger v-bind="triggerProps">
      <slot name="trigger" :display-value="slotProps.displayValue" :model-value="slotProps.modelValue" :open="slotProps.open">
        <Icon class="size-4" icon="lucide:clock-3" />
        <span v-if="slotProps.displayValue">{{ slotProps.displayValue }}</span>
        <span v-else class="text-muted-foreground">Pick a time</span>
      </slot>
    </TimePickerTrigger>
    <TimePickerPopup v-bind="popupProps">
      <template #time="popupSlotProps">
        <slot name="time" v-bind="popupSlotProps">
          {{ popupSlotProps.label }}
        </slot>
      </template>
    </TimePickerPopup>
    <slot v-bind="slotProps" />
  </TimePickerRoot>
</template>
