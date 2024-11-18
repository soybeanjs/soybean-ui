<script setup lang="ts">
import {
  PopoverContent,
  type PopoverContentEmits,
  type PopoverContentProps,
  PopoverPortal,
  useForwardPropsEmits
} from '..';

export interface DateRangePickerContentProps extends PopoverContentProps {}
export interface DateRangePickerContentEmits extends PopoverContentEmits {}

const props = defineProps<DateRangePickerContentProps>();
const emit = defineEmits<DateRangePickerContentEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <PopoverPortal>
    <PopoverContent v-bind="{ ...forwarded, ...$attrs }">
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
