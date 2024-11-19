<script setup lang="ts">
import { PopoverArrow } from '../popover';
import type { DateRangePickerArrowPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangePickerArrow'
});

const props = defineProps<DateRangePickerArrowPropsWithPrimitive>();
</script>

<template>
  <PopoverArrow v-bind="props">
    <slot />
  </PopoverArrow>
</template>
