<script setup lang="ts">
import { computed } from 'vue';
import { TooltipContent, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, tooltipVariants } from '@soybean-ui/variants';
import type { TooltipContentEmits, TooltipContentProps } from '../types';

defineOptions({
  name: 'STooltipContent'
});

const {
  class: cls,
  size,
  sideOffset = 8,
  avoidCollisions = true,
  ...delegatedProps
} = defineProps<TooltipContentProps>();

const emit = defineEmits<TooltipContentEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { content } = tooltipVariants({ size });

  return cn(cls, content());
});
</script>

<template>
  <TooltipContent v-bind="forwarded" :class="mergedCls" :side-offset="sideOffset" :avoid-collisions="avoidCollisions">
    <slot />
  </TooltipContent>
</template>
