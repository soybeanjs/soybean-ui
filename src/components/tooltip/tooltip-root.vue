<script setup lang="ts">
import { computed, watch } from 'vue';
import { useControllableState } from '../../composables';
import { useConfigProvider } from '../config-provider/context';
import { PopperRoot } from '../popper';
import { provideTooltipOpenDelayedContext, provideTooltipRootContext } from './context';
import { TOOLTIP_OPEN, createDefaultTooltipConfig } from './shared';
import type { TooltipRootEmits, TooltipRootProps } from './types';

defineOptions({
  name: 'TooltipRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<TooltipRootProps>(), {
  defaultOpen: false,
  open: undefined,
  avoidCollisions: true
});

const emit = defineEmits<TooltipRootEmits>();

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value ?? false);
  },
  props.defaultOpen
);

const globalConfig = useConfigProvider();
const tooltipConfig = computed(() => createDefaultTooltipConfig(globalConfig?.tooltip?.value));

const providerContext = provideTooltipOpenDelayedContext({
  skipDelayDuration: computed(() => tooltipConfig.value.skipDelayDuration)
});

const delayDuration = computed(() => props.delayDuration ?? tooltipConfig.value.delayDuration);
const disableHoverableContent = computed(
  () => props.disableHoverableContent ?? tooltipConfig.value.disableHoverableContent
);
const disableClosingTrigger = computed(() => props.disableClosingTrigger ?? tooltipConfig.value.disableClosingTrigger);
const disabled = computed(() => props.disabled ?? tooltipConfig.value.disabled);
const ignoreNonKeyboardFocus = computed(
  () => props.ignoreNonKeyboardFocus ?? tooltipConfig.value.ignoreNonKeyboardFocus
);

provideTooltipRootContext({
  open,
  delayDuration,
  disableHoverableContent,
  disableClosingTrigger,
  disabled,
  ignoreNonKeyboardFocus,
  isOpenDelayed: providerContext.isOpenDelayed
});

watch(open, isOpen => {
  if (!providerContext.onClose) return;
  if (isOpen) {
    providerContext.onOpen();
    // as `onChange` is called within a lifecycle method we
    // avoid dispatching via `dispatchDiscreteCustomEvent`.
    document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN));
  } else {
    providerContext.onClose();
  }
});
</script>

<template>
  <PopperRoot>
    <slot :open="open" />
  </PopperRoot>
</template>
