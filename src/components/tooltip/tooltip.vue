<script setup lang="ts">
import { computed } from 'vue';
import { TooltipCompact, provideTooltipUi } from '@soybeanjs/headless/tooltip';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { tooltipVariants } from './variants';
import type { TooltipEmits, TooltipProps, TooltipSlots } from './types';

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

defineSlots<TooltipSlots>();

const forwardedRootProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = tooltipVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { popup: props.class });
});

provideTooltipUi(ui);
</script>

<template>
  <TooltipCompact v-bind="forwardedRootProps" v-on="listeners">
    <template #trigger>
      <slot name="trigger" />
    </template>
    <slot />
  </TooltipCompact>
</template>
