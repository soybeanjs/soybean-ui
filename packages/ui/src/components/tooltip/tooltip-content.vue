<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { TooltipContent, TooltipPortal, useForwardPropsEmits } from 'radix-vue';
import type { TooltipContentEmits, TooltipContentProps } from 'radix-vue';
import { cn, tooltipVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';

defineOptions({
  name: 'STooltipContent',
  inheritAttrs: false
});

const props = withDefaults(defineProps<TooltipContentProps & { class?: HTMLAttributes['class'] }>(), {
  sideOffset: 8
});

const emit = defineEmits<TooltipContentEmits>();

const { content } = tooltipVariants();

const delegatedProps = computedOmit(props, ['class']);

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <TooltipPortal>
    <TooltipContent v-bind="forwarded" :class="cn(content(), props.class)">
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
