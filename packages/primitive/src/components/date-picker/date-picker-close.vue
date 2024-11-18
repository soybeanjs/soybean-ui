<script setup lang="ts">
import { PopoverClose, type PopoverCloseProps } from '..';

export interface DatePickerCloseProps extends PopoverCloseProps {}

const props = defineProps<DatePickerCloseProps>();
</script>

<template>
  <PopoverClose v-bind="props">
    <slot />
  </PopoverClose>
</template>
