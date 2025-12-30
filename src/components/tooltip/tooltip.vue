<script setup lang="ts">
import { computed } from 'vue';
import {
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipRoot,
  TooltipTrigger,
  provideTooltipThemeContext
} from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { tooltipVariants } from '@/variants/tooltip';
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
  'popupProps',
  'positionerProps',
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

const positionerProps = computed(() => {
  return {
    placement: props.placement,
    ...props.positionerProps
  };
});

provideTooltipThemeContext({
  ui
});
</script>

<template>
  <TooltipRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <TooltipTrigger as-child>
      <slot name="trigger" />
    </TooltipTrigger>
    <TooltipPortal v-bind="portalProps">
      <TooltipPositioner v-bind="positionerProps" v-on="listeners">
        <TooltipPopup v-bind="popupProps">
          <slot>{{ content }}</slot>
          <TooltipArrow v-if="showArrow" v-bind="arrowProps" />
        </TooltipPopup>
      </TooltipPositioner>
    </TooltipPortal>
  </TooltipRoot>
</template>
