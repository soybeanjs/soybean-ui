<script setup lang="ts">
import { PopoverAnchor } from '../popover';
import type { DateRangePickerAnchorPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangePickerAnchor'
});

const props = defineProps<DateRangePickerAnchorPropsWithPrimitive>();
</script>

<template>
  <PopoverAnchor v-bind="props">
    <slot />
  </PopoverAnchor>
</template>
