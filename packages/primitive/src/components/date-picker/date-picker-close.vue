<script setup lang="ts">
import { PopoverClose } from '../popover';
import type { DatePickerClosePropsWithPrimitive } from './types';

defineOptions({
  name: 'DatePickerClose'
});

const props = defineProps<DatePickerClosePropsWithPrimitive>();
</script>

<template>
  <PopoverClose v-bind="props">
    <slot />
  </PopoverClose>
</template>
