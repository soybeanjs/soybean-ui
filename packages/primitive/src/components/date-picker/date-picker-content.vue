<script setup lang="ts">
import { useForwardPropsEmits } from '../../composables';
import PopoverContent from '../popover/popover-content.vue';
import PopoverPortal from '../popover/popover-portal.vue';
import type { DatePickerContentEmits, DatePickerContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'DatePickerContent',
  inheritAttrs: false
});

const props = defineProps<DatePickerContentPropsWithPrimitive>();

const emit = defineEmits<DatePickerContentEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <PopoverPortal>
    <PopoverContent v-bind="{ ...forwarded, ...$attrs }">
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
