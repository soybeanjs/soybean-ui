<script setup lang="ts">
import { computed, useId } from 'vue';
import { useConfigProvider } from '../config-provider/context';
import { PopperRoot } from '../popper';
import type { PopperOpenChangeReason } from '../popper/types';
import { createDefaultTooltipConfig } from './shared';
import { provideTooltipProviderContext, provideTooltipRootContext, useTooltipProviderContext } from './context';
import type { TooltipRootEmits, TooltipRootProps } from './types';

defineOptions({
  name: 'TooltipRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<TooltipRootProps>(), {
  defaultOpen: false,
  open: undefined
});

const emit = defineEmits<TooltipRootEmits>();

// Without an ancestor `TooltipProvider`, fall back to a local config-only provider backed by
// the global config; the per-root hover machine inside Popper then owns the skip-delay state.
const globalConfig = useConfigProvider();
const globalTooltipConfig = computed(() => createDefaultTooltipConfig(globalConfig?.tooltip?.value));
const inheritedProvider = useTooltipProviderContext();
const provider =
  inheritedProvider ??
  provideTooltipProviderContext({
    delayDuration: computed(() => globalTooltipConfig.value.delayDuration),
    skipDelayDuration: computed(() => globalTooltipConfig.value.skipDelayDuration),
    disableHoverableContent: computed(() => globalTooltipConfig.value.disableHoverableContent),
    disableClosingTrigger: computed(() => globalTooltipConfig.value.disableClosingTrigger),
    disabled: computed(() => globalTooltipConfig.value.disabled),
    ignoreNonKeyboardFocus: computed(() => globalTooltipConfig.value.ignoreNonKeyboardFocus),
    positionerProps: computed(() => globalTooltipConfig.value.positionerProps)
  });

// Resolution chain: prop → provider (ancestor `TooltipProvider` or global config) → defaults.
provideTooltipRootContext({
  delayDuration: computed(() => props.delayDuration ?? provider.delayDuration.value),
  disableHoverableContent: computed(() => props.disableHoverableContent ?? provider.disableHoverableContent.value),
  disableClosingTrigger: computed(() => props.disableClosingTrigger ?? provider.disableClosingTrigger.value),
  disabled: computed(() => props.disabled ?? provider.disabled.value),
  ignoreNonKeyboardFocus: computed(() => props.ignoreNonKeyboardFocus ?? provider.ignoreNonKeyboardFocus.value),
  positionerProps: computed(() => props.positionerProps ?? provider.positionerProps.value),
  popupId: `soybean-tooltip-popup-${useId()}`,
  provider
});

function onUpdateOpen(value: boolean, reason?: PopperOpenChangeReason) {
  emit('update:open', value, reason);
}
</script>

<template>
  <PopperRoot
    :dir="dir"
    :modal="false"
    :disabled="props.disabled ?? provider.disabled.value"
    :open="props.open"
    :default-open="defaultOpen"
    @update:open="onUpdateOpen"
  >
    <template #default="slotProps">
      <slot v-bind="slotProps" />
    </template>
  </PopperRoot>
</template>
