<script setup lang="ts">
import { transformPropsToContext } from '../../shared';
import { provideTooltipProviderContext } from './context';
import type { TooltipProviderProps } from './types';

defineOptions({
  name: 'TooltipProvider',
  inheritAttrs: false
});

const props = withDefaults(defineProps<TooltipProviderProps>(), {
  delayDuration: 150,
  skipDelayDuration: 300
});

provideTooltipProviderContext(
  transformPropsToContext(props, [
    'delayDuration',
    'skipDelayDuration',
    'disableHoverableContent',
    'disableClosingTrigger',
    'disabled',
    'ignoreNonKeyboardFocus'
  ])
);
</script>

<template>
  <slot />
</template>
