<script lang="ts">
import { PopoverTrigger, type PopoverTriggerProps } from '..';
import { injectDatePickerRootContext } from './date-picker-root.vue';

export interface DatePickerTriggerProps extends PopoverTriggerProps {}
</script>

<script setup lang="ts">
const props = defineProps<DatePickerTriggerProps>();
const rootContext = injectDatePickerRootContext();
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
