<script setup lang="ts">
import { TooltipContent, useForwardPropsEmits } from 'radix-vue';
import type { TooltipContentEmits } from 'radix-vue';
import { cn, tooltipVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { TooltipContentProps } from './types';

defineOptions({
  name: 'STooltipContent'
});

const props = withDefaults(defineProps<TooltipContentProps>(), {
  side: 'bottom',
  sideOffset: 8,
  align: 'center',
  avoidCollisions: true,
  collisionPadding: 0,
  sticky: 'partial'
});

const emit = defineEmits<TooltipContentEmits>();

const delegatedProps = computedOmit(props, ['class']);

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const { content } = tooltipVariants();
</script>

<template>
  <TooltipContent v-bind="forwarded" :class="cn(content(), props.class)">
    <slot />
  </TooltipContent>
</template>
