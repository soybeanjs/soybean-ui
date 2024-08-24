<script setup lang="ts">
import { PopoverContent, useForwardPropsEmits } from 'radix-vue';
import type { PopoverContentEmits } from 'radix-vue';
import { cn, popoverVariants } from '@soybean-unify/ui-variants';
import { computedOmit } from '../../shared';
import type { PopoverContentProps } from './types';

defineOptions({
  name: 'SPopoverContent'
});

const props = withDefaults(defineProps<PopoverContentProps>(), {
  side: 'bottom',
  sideOffset: 8,
  align: 'center',
  avoidCollisions: true,
  collisionPadding: 0,
  sticky: 'partial'
});

const delegatedProps = computedOmit(props, ['class']);

const emit = defineEmits<PopoverContentEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const { content } = popoverVariants();
</script>

<template>
  <PopoverContent v-bind="forwarded" :class="cn(content(), props.class)">
    <slot />
  </PopoverContent>
</template>

<style scoped></style>
