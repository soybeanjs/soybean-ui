<script setup lang="ts">
import PopoverArrow from '../popover/popover-arrow.vue';
import type { PopoverArrowProps } from '../popover';

export interface DateRangePickerArrowProps extends PopoverArrowProps {}

const props = defineProps<DateRangePickerArrowProps>();
</script>

<template>
  <PopoverArrow v-bind="props">
    <slot />
  </PopoverArrow>
</template>
