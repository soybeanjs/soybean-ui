<script setup lang="ts">
import { PopoverArrow, type PopoverArrowProps } from '..';

export interface DatePickerArrowProps extends PopoverArrowProps {}

const props = defineProps<DatePickerArrowProps>();
</script>

<template>
  <PopoverArrow v-bind="props">
    <slot />
  </PopoverArrow>
</template>
