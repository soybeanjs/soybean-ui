<script setup lang="ts">
import PopoverClose from '../popover/popover-close.vue';
import type { PopoverCloseProps } from '../popover';

defineOptions({
  name: 'DatePickerClose'
});

export interface DatePickerCloseProps extends PopoverCloseProps {}

const props = defineProps<DatePickerCloseProps>();
</script>

<template>
  <PopoverClose v-bind="props">
    <slot />
  </PopoverClose>
</template>
