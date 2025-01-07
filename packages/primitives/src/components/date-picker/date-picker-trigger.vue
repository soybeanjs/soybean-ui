<script setup lang="ts">
import { PopoverTrigger } from '../popover';
import { injectDatePickerRootContext } from './context';
import type { DatePickerTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'DatePickerTrigger'
});

const props = defineProps<DatePickerTriggerPropsWithPrimitive>();
const rootContext = injectDatePickerRootContext();

function onFocusin(e: FocusEvent) {
  rootContext.dateFieldRef.value?.setFocusedElement(e.target as HTMLElement);
}
</script>

<template>
  <PopoverTrigger
    data-soybean-date-field-segment="trigger"
    v-bind="props"
    :disabled="rootContext.disabled.value"
    @focusin="onFocusin"
  >
    <slot />
  </PopoverTrigger>
</template>
