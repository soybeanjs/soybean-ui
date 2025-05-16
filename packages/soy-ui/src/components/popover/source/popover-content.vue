<script setup lang="ts">
import { computed } from 'vue';
import { PopoverContent, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, popoverVariants } from '@soybean-ui/variants';
import type { PopoverContentEmits, PopoverContentProps } from '../types';

defineOptions({
  name: 'SPopoverContent'
});

const {
  class: cls,
  size,
  sideOffset = 5,
  avoidCollisions = true,
  ...delegatedProps
} = defineProps<PopoverContentProps>();

const emit = defineEmits<PopoverContentEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { content } = popoverVariants({ size });

  return cn(content(), cls);
});
</script>

<template>
  <PopoverContent v-bind="forwarded" :class="mergedCls" :side-offset="sideOffset" :avoid-collisions="avoidCollisions">
    <slot />
  </PopoverContent>
</template>
