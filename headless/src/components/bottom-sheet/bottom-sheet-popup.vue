<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { DialogPopup } from '../dialog';
import { useDialogRootContext } from '../dialog/context';
import { useDrawerRootContext } from './context';
import { useScaleBackground } from './use-scale-background';

defineOptions({
  name: 'BottomSheetPopup'
});

const {
  isOpen,
  snapPointsOffset,
  hasSnapPoints,
  setDrawerRef,
  onPress,
  onDrag,
  onRelease,
  modal,
  emitOpenChange,
  dismissible,
  keyboardIsOpen,
  direction,
  handleOnly
} = useDrawerRootContext('BottomSheetPopup');

const { popupElement } = useDialogRootContext('BottomSheetPopup');

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

function handleOpenAutoFocus(event: Event) {
  event.preventDefault();

  popupElement.value?.focus({
    preventScroll: true
  });
}

watchEffect(() => {
  if (popupElement.value) {
    setDrawerRef(popupElement.value);
  }

  if (hasSnapPoints.value) {
    window.requestAnimationFrame(() => {
      delayedSnapPoints.value = true;
    });
  }
});
</script>

<template>
  <DialogPopup
    data-soybean-bottom-sheet=""
    :data-soybean-bottom-sheet-direction="direction"
    :data-soybean-delayed-snap-points="delayedSnapPoints ? 'true' : 'false'"
    :data-soybean-snap-points="isOpen && hasSnapPoints ? 'true' : 'false'"
    :style="{ '--snap-point-height': snapPointHeight }"
    @pointerdown="handlePointerDown"
    @pointermove="handleOnDrag"
    @pointerup="onRelease"
    @pointer-down-outside="handlePointerDownOutside"
    @escape-key-down="onEscapeKeyDown"
    @open-auto-focus="handleOpenAutoFocus"
  >
    <slot />
  </DialogPopup>
</template>
