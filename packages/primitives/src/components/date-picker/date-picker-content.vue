<script setup lang="ts">
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
</script>

<template>
  <PopoverPortal v-bind="portal">
    <PopoverContent v-bind="{ ...forwarded, ...$attrs }">
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
