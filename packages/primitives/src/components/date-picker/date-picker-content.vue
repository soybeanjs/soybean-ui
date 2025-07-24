<script setup lang="ts">
import { handleCalendarInitialFocus } from '../../date';
import { useCombinedPropsEmits, useOmitForwardProps } from '../../composables';
import { PopoverContent, PopoverPortal } from '../popover';
import type { DatePickerContentEmits, DatePickerContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'DatePickerContent',
  inheritAttrs: false
});

const props = defineProps<DatePickerContentPropsWithPrimitive>();

const emit = defineEmits<DatePickerContentEmits>();

const forwardedProps = useOmitForwardProps(props, ['portal']);

const forwarded = useCombinedPropsEmits(forwardedProps, emit);

const onOpenAutoFocus = (event: Event) => {
  emit('openAutoFocus', event);

  if (!event.defaultPrevented && event.target) {
    handleCalendarInitialFocus(event.target as HTMLElement);
    event.preventDefault();
  }
};
</script>

<template>
  <PopoverPortal v-bind="portal">
    <PopoverContent v-bind="{ ...forwarded, ...$attrs }" @open-auto-focus="onOpenAutoFocus">
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
