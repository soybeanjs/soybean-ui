<script setup lang="ts">
import { PopperV2Trigger } from '../popper-v2';
import type { PopoverTriggerProps } from './types';

defineOptions({
  name: 'PopoverTrigger'
});

const props = withDefaults(defineProps<PopoverTriggerProps>(), {
  as: 'button'
});
</script>

<template>
  <PopperV2Trigger v-bind="props" data-soybean-popover-trigger aria-haspopup="dialog">
    <slot />
  </PopperV2Trigger>
</template>
