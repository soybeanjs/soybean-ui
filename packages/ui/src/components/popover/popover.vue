<script setup lang="ts">
import { PopoverClose, PopoverPortal, PopoverRoot, PopoverTrigger } from 'radix-vue';
import SPopoverContent from './popover-content.vue';
import SPopoverArrow from './popover-arrow.vue';

defineOptions({
  name: 'SPopover'
});
</script>

<template>
  <PopoverRoot>
    <PopoverTrigger as-child>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal>
      <SPopoverContent>
        <slot />
        <SPopoverArrow />
        <PopoverClose />
      </SPopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style scoped></style>
