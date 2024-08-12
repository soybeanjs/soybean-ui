<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { PopoverContent, useForwardPropsEmits } from 'radix-vue';
import type { PopoverContentEmits } from 'radix-vue';
import { cn, popoverVariants } from '@soybean-unify/ui-variants';
import type { PopoverContentProps } from './types';

defineOptions({
  name: 'SPopoverContent'
});

const props = withDefaults(defineProps<PopoverContentProps>(), {
  side: 'bottom',
  sideOffset: 6,
  align: 'center',
  avoidCollisions: true,
  collisionPadding: 0,
  sticky: 'partial'
});

const delegatedProps = reactiveOmit(props, ['class']);

const emit = defineEmits<PopoverContentEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <PopoverContent v-bind="forwarded" :class="cn(popoverVariants(), props.class)">
    <slot />
  </PopoverContent>
</template>

<style scoped></style>
