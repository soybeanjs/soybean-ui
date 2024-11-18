<script setup lang="ts">
import { PopoverClose, type PopoverCloseProps } from '..';

export interface DateRangePickerCloseProps extends PopoverCloseProps {}

const props = defineProps<DateRangePickerCloseProps>();
</script>

<template>
  <PopoverClose v-bind="props">
    <slot />
  </PopoverClose>
</template>
