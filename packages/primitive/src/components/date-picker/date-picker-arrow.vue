<script setup lang="ts">
import PopoverArrow from '../popover/popover-arrow.vue';
import type { PopoverArrowProps } from '../popover';

defineOptions({
  name: 'DatePickerArrow'
});

export interface DatePickerArrowProps extends PopoverArrowProps {}

const props = defineProps<DatePickerArrowProps>();
</script>

<template>
  <PopoverArrow v-bind="props">
    <slot />
  </PopoverArrow>
</template>
