<script setup lang="ts">
import { PopoverClose } from '../popover';
import type { DateRangePickerClosePropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangePickerClose'
});

const props = defineProps<DateRangePickerClosePropsWithPrimitive>();
</script>

<template>
  <PopoverClose v-bind="props">
    <slot />
  </PopoverClose>
</template>
