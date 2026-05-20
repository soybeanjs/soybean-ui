<script setup lang="ts">
import { watchEffect } from 'vue';
import { useDialogRootContext } from '../dialog/context';
import { DialogOverlay } from '../dialog';
import { useDrawerRootContext } from './context';

defineOptions({
  name: 'BottomSheetOverlay'
});

const { overlayElement } = useDialogRootContext('BottomSheetOverlay');

const { setOverlayRef, hasSnapPoints, isOpen, shouldFade } = useDrawerRootContext('BottomSheetOverlay');

watchEffect(() => {
  if (overlayElement.value) {
    setOverlayRef(overlayElement.value);
  }
});
</script>

<template>
  <DialogOverlay
    data-soybean-overlay
    :data-soybean-snap-points="isOpen && hasSnapPoints ? 'true' : 'false'"
    :data-soybean-snap-points-overlay="isOpen && shouldFade ? 'true' : 'false'"
  />
</template>
