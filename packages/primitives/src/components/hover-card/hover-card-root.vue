<script setup lang="ts">
import { ref, toRefs } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { useForwardExpose } from '../../composables';
import { PopperRoot } from '../popper';
import { provideHoverCardRootContext } from './context';
import type { HoverCardRootEmits, HoverCardRootProps } from './types';

defineOptions({
  name: 'HoverCardRoot'
});

const props = withDefaults(defineProps<HoverCardRootProps>(), {
  modelValue: undefined,
  defaultOpen: false,
  open: undefined,
  openDelay: 700,
  closeDelay: 300
});

const emit = defineEmits<HoverCardRootEmits>();

const { openDelay, closeDelay } = toRefs(props);

const open = useVModel(props, 'open', emit, {
  defaultValue: props.open,
  passive: (props.open === undefined) as false
}) as Ref<boolean>;

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
