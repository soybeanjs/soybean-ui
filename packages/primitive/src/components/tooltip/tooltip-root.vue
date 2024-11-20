<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { PopperRoot } from '../popper';
import { useForwardExpose } from '../../composables';
import type { TooltipRootPropsWithPrimitive } from './types';
import { injectTooltipProviderContext, provideTooltipRootContext } from './context';
import { TOOLTIP_OPEN } from './shared';

defineOptions({
  name: 'TooltipRoot'
});

const props = withDefaults(defineProps<TooltipRootPropsWithPrimitive>(), {
  defaultOpen: false,
  open: undefined,
  delayDuration: undefined,
  disableHoverableContent: undefined,
  disableClosingTrigger: undefined,
  disabled: undefined,
  ignoreNonKeyboardFocus: undefined
});

useForwardExpose();
const providerContext = injectTooltipProviderContext();

const disableHoverableContent = computed(
  () => props.disableHoverableContent ?? providerContext.disableHoverableContent.value
);
const disableClosingTrigger = computed(
  () => props.disableClosingTrigger ?? providerContext.disableClosingTrigger.value
);
const disableTooltip = computed(() => props.disabled ?? providerContext.disabled.value);

const delayDuration = computed(() => props.delayDuration ?? providerContext.delayDuration.value);
const ignoreNonKeyboardFocus = computed(
  () => props.ignoreNonKeyboardFocus ?? providerContext.ignoreNonKeyboardFocus.value
);

const open = defineModel<boolean>('open', { default: props.defaultOpen });

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

const wasOpenDelayedRef = ref(false);
const trigger = ref<HTMLElement>();

const stateAttribute = computed(() => {
  if (!open.value) return 'closed';
  return wasOpenDelayedRef.value ? 'delayed-open' : 'instant-open';
});

const { start: startTimer, stop: clearTimer } = useTimeoutFn(
  () => {
    wasOpenDelayedRef.value = true;
    open.value = true;
  },
  delayDuration,
  { immediate: false }
);

function handleOpen() {
  clearTimer();
  wasOpenDelayedRef.value = false;
  open.value = true;
}
function handleClose() {
  clearTimer();
  open.value = false;
}
function handleDelayedOpen() {
  startTimer();
}

provideTooltipRootContext({
  contentId: '',
  open,
  stateAttribute,
  trigger,
  onTriggerChange(el) {
    trigger.value = el;
  },
  onTriggerEnter() {
    if (providerContext.isOpenDelayed.value) handleDelayedOpen();
    else handleOpen();
  },
  onTriggerLeave() {
    if (disableHoverableContent.value) {
      handleClose();
    } else {
      // Clear the timer in case the pointer leaves the trigger before the tooltip is opened.
      clearTimer();
    }
  },
  onOpen: handleOpen,
  onClose: handleClose,
  disableHoverableContent,
  disableClosingTrigger,
  disabled: disableTooltip,
  ignoreNonKeyboardFocus
});
</script>

<template>
  <PopperRoot>
    <slot :open="open" />
  </PopperRoot>
</template>
