<script setup lang="ts">
import { PopoverArrow } from '../popover';
import type { DatePickerArrowPropsWithPrimitive } from './types';

defineOptions({
  name: 'DatePickerArrow'
});

const props = defineProps<DatePickerArrowPropsWithPrimitive>();
</script>

<template>
  <PopoverArrow v-bind="props">
    <slot />
  </PopoverArrow>
</template>
