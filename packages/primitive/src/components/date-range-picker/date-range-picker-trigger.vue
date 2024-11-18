<script setup lang="ts">
import { PopoverTrigger, type PopoverTriggerProps } from '..';
import { injectDateRangePickerRootContext } from './date-range-picker-root.vue';

export interface DateRangePickerTriggerProps extends PopoverTriggerProps {}

const props = defineProps<DateRangePickerTriggerProps>();
const rootContext = injectDateRangePickerRootContext();
</script>

<template>
  <PopoverTrigger
    data-soybean-date-field-segment="trigger"
    v-bind="props"
    :disabled="rootContext.disabled.value"
    @focusin="
      (e: FocusEvent) => {
        rootContext.dateFieldRef.value?.setFocusedElement(e.target as HTMLElement);
      }
    "
  >
    <slot />
  </PopoverTrigger>
</template>
