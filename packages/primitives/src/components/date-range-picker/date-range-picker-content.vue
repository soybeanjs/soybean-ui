<script setup lang="ts">
import { useForwardPropsEmits } from '../../composables';
import { PopoverContent, PopoverPortal } from '../popover';
import type { DateRangePickerContentEmits, DateRangePickerContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangePickerContent',
  inheritAttrs: false
});

const props = defineProps<DateRangePickerContentPropsWithPrimitive>();

const emit = defineEmits<DateRangePickerContentEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <PopoverPortal>
    <PopoverContent v-bind="{ ...forwarded, ...$attrs }">
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
