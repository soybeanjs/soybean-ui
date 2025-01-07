<script setup lang="ts">
import { PopoverAnchor } from '../popover';
import type { DatePickerAnchorPropsWithPrimitive } from './types';

defineOptions({
  name: 'DatePickerAnchor'
});

const props = defineProps<DatePickerAnchorPropsWithPrimitive>();
</script>

<template>
  <PopoverAnchor v-bind="props">
    <slot />
  </PopoverAnchor>
</template>
