<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { DialogContent } from '../dialog';
import { injectDrawerRootContext } from './context';
import { useScaleBackground } from './use-scale-background';

defineOptions({
  name: 'DrawerContent'
});

const {
  isOpen,
  snapPointsOffset,
  hasSnapPoints,
  drawerRef,
  onPress,
  onDrag,
  onRelease,
  modal,
  emitOpenChange,
  dismissible,
  keyboardIsOpen,
  direction,
  handleOnly
} = injectDrawerRootContext();

useScaleBackground();

const delayedSnapPoints = ref(false);

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

  if (dismissible.value) {
    emitOpenChange(false);
  } else {
    event.preventDefault();
  }
}

function handlePointerDown(event: PointerEvent) {
  if (handleOnly.value) return;

  onPress(event);
}

function handleOnDrag(event: PointerEvent) {
  if (handleOnly.value) return;

  onDrag(event);
}

function onEscapeKeyDown(event: Event) {
  if (dismissible.value) return;

  event.preventDefault();
}

watchEffect(() => {
  if (hasSnapPoints.value) {
    window.requestAnimationFrame(() => {
      delayedSnapPoints.value = true;
    });
  }
});
</script>

<template>
  <DialogContent
    ref="drawerRef"
    data-soybean-drawer=""
    :data-soybean-drawer-direction="direction"
    :data-soybean-delayed-snap-points="delayedSnapPoints ? 'true' : 'false'"
    :data-soybean-snap-points="isOpen && hasSnapPoints ? 'true' : 'false'"
    :style="{ '--snap-point-height': snapPointHeight }"
    @pointerdown="handlePointerDown"
    @pointermove="handleOnDrag"
    @pointerup="onRelease"
    @pointer-down-outside="handlePointerDownOutside"
    @escape-key-down="onEscapeKeyDown"
    @open-auto-focus.prevent
  >
    <slot />
  </DialogContent>
</template>
