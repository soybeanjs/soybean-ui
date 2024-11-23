<script setup lang="ts">
import { PopoverTrigger } from '../popover';
import { injectDateRangePickerRootContext } from './context';
import type { DateRangePickerTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangePickerTrigger'
});

const props = defineProps<DateRangePickerTriggerPropsWithPrimitive>();
const rootContext = injectDateRangePickerRootContext();

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
