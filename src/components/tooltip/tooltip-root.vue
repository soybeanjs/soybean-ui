<script setup lang="ts">
import { computed, watch } from 'vue';
import { useControllableState } from '../../composables';
import { PopperRoot } from '../popper';
import { provideTooltipRootContext, useTooltipProviderContext } from './context';
import { TOOLTIP_OPEN } from './shared';
import type { TooltipRootEmits, TooltipRootProps } from './types';

defineOptions({
  name: 'TooltipRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<TooltipRootProps>(), {
  defaultOpen: false,
  open: undefined,
  delayDuration: undefined,
  disableHoverableContent: undefined,
  disableClosingTrigger: undefined,
  disabled: undefined,
  ignoreNonKeyboardFocus: undefined
});

const emit = defineEmits<TooltipRootEmits>();

const providerContext = useTooltipProviderContext('TooltipRoot');

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value ?? false);
  },
  props.defaultOpen
);

const delayDuration = computed(() => props.delayDuration ?? providerContext.delayDuration.value ?? 700);
const disableHoverableContent = computed(
  () => props.disableHoverableContent ?? providerContext.disableHoverableContent.value ?? false
);
const disableClosingTrigger = computed(
  () => props.disableClosingTrigger ?? providerContext.disableClosingTrigger.value ?? false
);
const disabled = computed(() => props.disabled ?? providerContext.disabled.value ?? false);
const ignoreNonKeyboardFocus = computed(
  () => props.ignoreNonKeyboardFocus ?? providerContext.ignoreNonKeyboardFocus.value ?? false
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
