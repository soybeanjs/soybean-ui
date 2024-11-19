<script setup lang="ts">
import { useForwardPropsEmits } from '../../composables';
import { type PopoverContentEmits, type PopoverContentProps } from '../popover';
import PopoverContent from '../popover/popover-content.vue';
import PopoverPortal from '../popover/popover-portal.vue';

defineOptions({
  name: 'DatePickerContent'
});

export interface DatePickerContentProps extends PopoverContentProps {}
export interface DatePickerContentEmits extends PopoverContentEmits {}

const props = defineProps<DatePickerContentProps>();
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
