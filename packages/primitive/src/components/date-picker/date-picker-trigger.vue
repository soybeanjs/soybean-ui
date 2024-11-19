<script setup lang="ts">
import PopoverTrigger from '../popover/popover-trigger.vue';
import type { PopoverTriggerProps } from '../popover';
import { injectDatePickerRootContext } from './date-picker-root.vue';

defineOptions({
  name: 'DatePickerTrigger'
});

export interface DatePickerTriggerProps extends PopoverTriggerProps {}

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
