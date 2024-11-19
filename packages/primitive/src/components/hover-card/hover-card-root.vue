<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { PopperRoot } from '../popper';
import { useForwardExpose } from '../../composables';
import type { HoverCardRootProps } from './types';
import { provideHoverCardRootContext } from './context';

defineOptions({
  name: 'HoverCardRoot'
});

const props = withDefaults(defineProps<HoverCardRootProps>(), {
  defaultOpen: false,
  open: undefined,
  openDelay: 700,
  closeDelay: 300
});

const { openDelay, closeDelay } = toRefs(props);

const open = defineModel<boolean>('open', {
  default: props.defaultOpen
});

useForwardExpose();

const openTimerRef = ref(0);
const closeTimerRef = ref(0);
const hasSelectionRef = ref(false);
const isPointerDownOnContentRef = ref(false);
const isPointerInTransitRef = ref(false);
const triggerElement = ref<HTMLElement>();

function handleOpen() {
  clearTimeout(closeTimerRef.value);
  openTimerRef.value = window.setTimeout(() => (open.value = true), openDelay.value);
}

function handleClose() {
  clearTimeout(openTimerRef.value);
  if (!hasSelectionRef.value && !isPointerDownOnContentRef.value)
    closeTimerRef.value = window.setTimeout(() => (open.value = false), closeDelay.value);
}

function handleDismiss() {
  open.value = false;
}

provideHoverCardRootContext({
  open,
  onOpenChange(value: boolean) {
    open.value = value;
  },
  onOpen: handleOpen,
  onClose: handleClose,
  onDismiss: handleDismiss,
  hasSelectionRef,
  isPointerDownOnContentRef,
  isPointerInTransitRef,
  triggerElement
});
</script>

<template>
  <PopperRoot>
    <slot :open="open" />
  </PopperRoot>
</template>
