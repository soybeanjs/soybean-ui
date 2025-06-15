<script setup lang="ts">
import { computed } from 'vue';
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
  providePopoverThemeContext
} from '@headless';
import { useForwardListeners, useOmitProps } from '@headless/composables';
import { mergeSlotVariants } from '@theme';
import { tooltipVariants } from '@variants/tooltip';
import type { TooltipEmits, TooltipProps } from './types';

defineOptions({
  name: 'STooltip'
});

const props = withDefaults(defineProps<TooltipProps>(), {
  open: undefined,
  defaultOpen: false,
  avoidCollisions: true,
  showArrow: true
});

const emit = defineEmits<TooltipEmits>();

const forwardedRootProps = useOmitProps(props, [
  'size',
  'ui',
  'content',
  'showArrow',
  'contentProps',
  'triggerProps',
  'portalProps',
  'arrowProps'
]);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = tooltipVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui);
});

const contentProps = computed(() => {
  return {
    placement: props.placement,
    ...props.contentProps
  };
});

providePopoverThemeContext({
  ui
});
</script>

<template>
  <TooltipRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <TooltipTrigger as-child>
      <slot name="trigger" />
    </TooltipTrigger>
    <TooltipPortal v-bind="portalProps">
      <TooltipContent v-bind="contentProps" v-on="listeners">
        <slot>{{ content }}</slot>
        <TooltipArrow v-if="showArrow" v-bind="arrowProps" />
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>
