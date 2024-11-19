<script setup lang="ts">
import PopoverAnchor from '../popover/popover-anchor.vue';
import type { PopoverAnchorProps } from '../popover';

defineOptions({
  name: 'DatePickerAnchor'
});

export interface DatePickerAnchorProps extends PopoverAnchorProps {}

const props = defineProps<DatePickerAnchorProps>();
</script>

<template>
  <PopoverAnchor v-bind="props">
    <slot />
  </PopoverAnchor>
</template>
