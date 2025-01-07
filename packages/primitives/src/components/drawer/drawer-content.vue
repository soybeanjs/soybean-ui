<script setup lang="ts">
import { computed, watch } from 'vue';
import { DialogContent } from '../dialog';
import { injectDrawerRootContext } from './context';

defineOptions({
  name: 'DrawerContent'
});

const {
  open,
  isOpen,
  isVisible,
  snapPointsOffset,
  drawerRef,
  onPress,
  onDrag,
  onRelease,
  modal,
  emitOpenChange,
  dismissible,
  keyboardIsOpen,
  closeDrawer,
  direction
} = injectDrawerRootContext();

const snapPointHeight = computed(() => {
  if (snapPointsOffset.value && snapPointsOffset.value.length > 0) return `${snapPointsOffset.value[0]}px`;

  return '0';
});

function handlePointerDownOutside(event: Event) {
  if (!modal.value || event.defaultPrevented) {
    event.preventDefault();
    return;
  }
  if (keyboardIsOpen.value) {
    keyboardIsOpen.value = false;
  }

  event.preventDefault();

  if (dismissible.value) {
    emitOpenChange(false);
  }

  if (!dismissible.value || open.value !== undefined) return;

  closeDrawer();
}

function onEscapeKeyDown(event: Event) {
  if (dismissible.value) return;

  event.preventDefault();
}

watch(
  isOpen,
  openState => {
    if (openState) {
      setTimeout(() => {
        isVisible.value = true;
      }, 1);
    }
  },
  { immediate: true }
);
</script>

<template>
  <DialogContent
    ref="drawerRef"
    soybean-drawer=""
    :soybean-drawer-direction="direction"
    :soybean-drawer-visible="isVisible ? 'true' : 'false'"
    :style="{ '--snap-point-height': snapPointHeight }"
    @pointerdown="onPress"
    @pointermove="onDrag"
    @pointerup="onRelease"
    @pointer-down-outside="handlePointerDownOutside"
    @escape-key-down="onEscapeKeyDown"
  >
    <slot />
  </DialogContent>
</template>
