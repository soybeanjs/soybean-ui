<script setup lang="ts">
import { PopoverAnchor, type PopoverAnchorProps } from '..';

export interface DateRangePickerAnchorProps extends PopoverAnchorProps {}

const props = defineProps<DateRangePickerAnchorProps>();
</script>

<template>
  <PopoverAnchor v-bind="props">
    <slot />
  </PopoverAnchor>
</template>
