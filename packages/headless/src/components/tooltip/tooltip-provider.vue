<script setup lang="ts">
import { computed } from 'vue';
import { useConfigProvider } from '../config-provider/context';
import { providePopperDelayGroup } from '../popper';
import { createDefaultTooltipConfig, pickDefinedConfig } from './shared';
import { provideTooltipProviderContext, useTooltipProviderContext } from './context';
import type { TooltipProviderProps } from './types';

defineOptions({
  name: 'TooltipProvider',
  inheritAttrs: false
});

const props = defineProps<TooltipProviderProps>();

const globalConfig = useConfigProvider();
const parent = useTooltipProviderContext();

// Resolution chain: prop → ancestor provider → ConfigProvider global → defaults.
const config = computed(() => {
  const parentConfig = parent
    ? {
        delayDuration: parent.delayDuration.value,
        skipDelayDuration: parent.skipDelayDuration.value,
        disableHoverableContent: parent.disableHoverableContent.value,
        disableClosingTrigger: parent.disableClosingTrigger.value,
        disabled: parent.disabled.value,
        ignoreNonKeyboardFocus: parent.ignoreNonKeyboardFocus.value,
        positionerProps: parent.positionerProps.value
      }
    : {};

  return {
    ...createDefaultTooltipConfig(globalConfig?.tooltip?.value),
    ...pickDefinedConfig(parentConfig),
    ...pickDefinedConfig(props)
  };
});

provideTooltipProviderContext({
  delayDuration: computed(() => config.value.delayDuration),
  skipDelayDuration: computed(() => config.value.skipDelayDuration),
  disableHoverableContent: computed(() => config.value.disableHoverableContent),
  disableClosingTrigger: computed(() => config.value.disableClosingTrigger),
  disabled: computed(() => config.value.disabled),
  ignoreNonKeyboardFocus: computed(() => config.value.ignoreNonKeyboardFocus),
  positionerProps: computed(() => config.value.positionerProps)
});

// Sibling tooltips share one skip-delay window (the FloatingDelayGroup pattern); the
// per-root hover machines inside Popper read this group instead of their own state.
providePopperDelayGroup({
  skipDelayDuration: computed(() => config.value.skipDelayDuration)
});
</script>

<template>
  <slot />
</template>
