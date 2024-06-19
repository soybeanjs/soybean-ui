<script setup lang="ts">
import { TooltipRoot, type TooltipRootEmits, type TooltipRootProps, useForwardPropsEmits } from 'radix-vue';

const props = defineProps<TooltipRootProps>();
const emit = defineEmits<TooltipRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <TooltipRoot v-bind="forwarded">
    <slot />
  </TooltipRoot>
</template>
