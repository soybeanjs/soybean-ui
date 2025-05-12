<script setup lang="ts">
import { useCombinedPropsEmits, useOmitForwardProps } from '../../composables';
import { PopoverContent, PopoverPortal } from '../popover';
import type { DateRangePickerContentEmits, DateRangePickerContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangePickerContent',
  inheritAttrs: false
});

const props = defineProps<DateRangePickerContentPropsWithPrimitive>();

const emit = defineEmits<DateRangePickerContentEmits>();

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
