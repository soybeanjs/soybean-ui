<script setup lang="ts">
import { computed } from 'vue';
import { HoverCardContent, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, popoverVariants } from '@soybean-ui/variants';
import type { HoverCardContentEmits, HoverCardContentProps } from '../types';

defineOptions({
  name: 'SHoverCardContent'
});

const {
  class: cls,
  size,
  sideOffset = 8,
  avoidCollisions = true,
  ...delegatedProps
} = defineProps<HoverCardContentProps>();

const emit = defineEmits<HoverCardContentEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { content } = popoverVariants({ size });

  return cn(content(), cls);
});
</script>

<template>
  <HoverCardContent v-bind="forwarded" :class="mergedCls" :side-offset="sideOffset" :avoid-collisions="avoidCollisions">
    <slot />
  </HoverCardContent>
</template>
