<script setup lang="ts">
import { DialogOverlay } from '../dialog';
import { injectDrawerRootContext } from './context';

defineOptions({
  name: 'DrawerOverlay'
});

const { overlayRef, hasSnapPoints, isOpen, shouldFade } = injectDrawerRootContext();
</script>

<template>
  <DialogOverlay
    ref="overlayRef"
    data-soybean-overlay=""
    :data-soybean-snap-points="isOpen && hasSnapPoints ? 'true' : 'false'"
    :data-soybean-snap-points-overlay="isOpen && shouldFade ? 'true' : 'false'"
  />
</template>
